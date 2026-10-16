/* Off-policy actor-critics for continuous actions: DDPG, TD3 and SAC. The JavaScript port of recorder/ac.py, same
   settings and same defaults.

   All three keep a replay memory and critics that learn Q(s, a) from targets computed by slowly following copies of
   the networks. The actor climbs the critic: DDPG and TD3 have a deterministic actor, a = high · tanh(net(s)), and
   follow the critic's gradient with respect to the action; SAC has a squashed Gaussian, a = high · tanh(μ + σ ε), and
   climbs the critic plus an entropy bonus through the same reparameterization. TD3 adds twin critics (the smaller
   target wins), delayed actor updates and noise on the target action; SAC uses twin critics and tunes the bonus's
   weight α so that the policy's entropy stays near a target.

   The tools of Part 12, each off by default (with them off, a run is exactly what it was before them):
   - the color of the exploration noise: white (a fresh normal every step), Ornstein–Uhlenbeck, pink or red (one
     sequence per episode); for SAC, the colored numbers replace the normals its actions are drawn with;
   - parameter noise (DDPG, TD3): the actor's weights perturbed once per episode, by an amount that adapts until the
     actions move by the noise's spread (Plappert et al., 2018);
   - gSDE (SAC): the noise is a function of the actor's last hidden layer, drawn anew every few steps (Raffin et al.,
     2021);
   - CAPS (DDPG, TD3): the actor is also pulled toward the same action in the next state and in nearby states
     (Mysore et al., 2021);
   - observation normalization, and weight decay on the critics. */
(function (RL) {
  "use strict";
  const D = RL.dmath, deep = (RL.deep = RL.deep || {});
  const LOG_STD = [-5, 2], LOG_2PI = 1.8378770664093453; // SAC: the log spread is kept in this range
  // Ornstein–Uhlenbeck noise with θ = 0.15 and a time step of 0.01, as OpenAI Baselines and Stable-Baselines3 have it:
  // each step keeps 99.85% of the noise, and new noise keeps its settled spread at 1 (then times the noise knob).
  const OU_RHO = 1 - 0.15 * 0.01, OU_NEW = Math.sqrt(1 - OU_RHO * OU_RHO);
  const BETA = { pink: 1, red: 2 }; // colored noise: its power falls with frequency as 1/f^β

  deep.AC_DEFAULTS = {
    algo: "td3", lr_actor: 1e-3, lr_critic: 1e-3, gamma: 0.99, tau: 0.005, batch: 128, buffer: 100000, start: 1000,
    noise: 0.1, policy_noise: 0.2, noise_clip: 0.5, delay: 2, alpha: 0.2, auto_alpha: true, lr_alpha: 3e-4,
    depth: 2, width: 64, act: "relu", reward_scale: 1,
    noise_kind: "white", param_noise: false, sde: false, sde_freq: 8, log_std0: -3, caps_t: 0, caps_s: 0, caps_sigma: 0.05,
    obs_norm: false, weight_decay: 0,
  };
  const clip = (x, lo, hi) => Math.max(lo, Math.min(hi, x));

  class AC {
    constructor(dim, world, config, rng, total) {
      const cfg = (this.cfg = { ...deep.AC_DEFAULTS, ...config }), hidden = deep.hiddenOf(cfg), sac = cfg.algo === "sac";
      const sde = (this.sde = sac && !!cfg.sde);
      this.rng = rng; this.total = total; this.t = 0; this.updates = 0;
      this.dim = dim; this.ad = world.act; this.high = world.hi; this.L = world.maxSteps; this.k = 0;
      const X = dim + this.ad;
      this.actor = new deep.MLP([dim, ...hidden, (sac && !sde ? 2 : 1) * this.ad], rng, cfg.act, 0.1);
      this.critics = Array.from({ length: cfg.algo === "ddpg" ? 1 : 2 }, () => new deep.MLP([X, ...hidden, 1], rng, cfg.act));
      this.criticTargets = this.critics.map(() => new deep.MLP([X, ...hidden, 1], rng, cfg.act));
      this.criticTargets.forEach((ct, i) => ct.copyFrom(this.critics[i]));
      if (!sac) { this.actorTarget = new deep.MLP([dim, ...hidden, this.ad], rng, cfg.act); this.actorTarget.copyFrom(this.actor); }
      // gSDE: a log spread for each pair of the actor's last hidden units and action dimensions
      this.width = hidden[hidden.length - 1];
      if (sde) this.logStdMat = new Float64Array(this.width * this.ad).fill(cfg.log_std0);
      this.optActor = new deep.Adam(sde ? [...this.actor.params, this.logStdMat] : this.actor.params, cfg.lr_actor);
      this.optCritics = this.critics.map((c) => new deep.Adam(c.params, cfg.lr_critic, 0, cfg.weight_decay));
      this.logAlpha = D.log(cfg.alpha); this.am = 0; this.av = 0; this.ab1 = 1; this.ab2 = 1;
      const C = cfg.buffer;
      this.mem = { S: new Float64Array(C * dim), S2: new Float64Array(C * dim), A: new Float64Array(C * this.ad), R: new Float64Array(C), D: new Float64Array(C), size: 0, at: 0, C };
      this.log = { q: [], loss: [], alpha: [] };
      this.norm = cfg.obs_norm ? new deep.RunningNorm(dim) : null;
      // exploration drawn one episode at a time: colored or Ornstein–Uhlenbeck noise, perturbed weights, gSDE's matrix
      this.explore = cfg.noise_kind !== "white" || (!!cfg.param_noise && !sac) || sde;
      if (cfg.param_noise && !sac) {
        this.pert = new deep.MLP([dim, ...hidden, this.ad], rng, cfg.act); // the actor the agent acts with
        this.probe = new deep.MLP([dim, ...hidden, this.ad], rng, cfg.act); // a second perturbation, to measure its effect
        this.pSigma = 0.1;
      }
    }
    // The network's inputs: the observations, or normalized by their running mean and spread.
    inp(x, B) { return this.norm ? this.norm.apply(x, B) : x; }
    // ---- the actor ----
    // SAC's parts for states x (B of them): mean, clipped log spread, raw log spread, spread, and u = μ + σ ε.
    sacParts(x, B, eps) {
      const out = this.actor.forward(x, B), d = this.ad, mu = new Float64Array(B * d), ls = new Float64Array(B * d), raw = new Float64Array(B * d), sd = new Float64Array(B * d), u = new Float64Array(B * d);
      for (let r = 0; r < B; r++) for (let j = 0; j < d; j++) {
        const k = r * d + j;
        mu[k] = out[r * 2 * d + j]; raw[k] = out[r * 2 * d + d + j]; ls[k] = clip(raw[k], LOG_STD[0], LOG_STD[1]); sd[k] = D.exp(ls[k]);
        u[k] = mu[k] + sd[k] * (eps ? eps[k] : 0);
      }
      return { mu, ls, raw, sd, u };
    }
    // log π(a | s) of a = high · tanh(u), u = μ + σ ε: the Gaussian's, minus the log of the squashing's slope.
    sacLogp(eps, ls, u, B) {
      const d = this.ad, out = new Float64Array(B);
      for (let r = 0; r < B; r++) {
        let s = 0;
        for (let j = 0; j < d; j++) { const k = r * d + j, t = D.tanh(u[k]); s += -0.5 * eps[k] * eps[k] - ls[k] - 0.5 * LOG_2PI - D.log(this.high * (1 - t * t) + 1e-6); }
        out[r] = s;
      }
      return out;
    }
    // gSDE's noise matrix, one number per pair (last hidden unit, action dimension): unit normals (to learn with), or
    // times the current spreads σ_ij (to act with, kept until the next draw).
    sdeMatrix(scaled) {
      const n = this.width * this.ad, m = new Float64Array(n);
      for (let q = 0; q < n; q++) m[q] = (scaled ? D.exp(this.logStdMat[q]) : 1) * this.rng.normal();
      return m;
    }
    // gSDE's parts for states x (B of them): the mean μ, the last hidden layer z, the spreads σ_ij, the action's spread
    // σ̂_j(s) = √(Σ_i (z_i σ_ij)² + 10⁻⁶), the noise n_j = Σ_i z_i E_ij (E = mat when scaled, else σ ⊙ mat), u = μ + n.
    sdeParts(x, B, mat, scaled = false) {
      const d = this.ad, w = this.width, net = this.actor, mu = net.forward(x, B).slice(), z = net.h[net.L - 2].slice(0, B * w);
      const sig = Float64Array.from(this.logStdMat, (l) => D.exp(l)), sd = new Float64Array(B * d), n = new Float64Array(B * d), u = new Float64Array(B * d);
      for (let r = 0; r < B; r++) for (let j = 0; j < d; j++) {
        let v = 0, e = 0;
        for (let i = 0; i < w; i++) {
          const zi = z[r * w + i], zs = zi * sig[i * d + j];
          v += zs * zs;
          if (mat) e += zi * (scaled ? mat[i * d + j] : sig[i * d + j] * mat[i * d + j]);
        }
        const k = r * d + j;
        sd[k] = Math.sqrt(v + 1e-6); n[k] = e; u[k] = mu[k] + e;
      }
      return { mu, z, sig, sd, n, u };
    }
    // log π(a | s) under gSDE: a Gaussian of spread σ̂(s) around μ(s), squashed by tanh as SAC's.
    sdeLogp(p, B) {
      const d = this.ad, out = new Float64Array(B);
      for (let r = 0; r < B; r++) {
        let s = 0;
        for (let j = 0; j < d; j++) { const k = r * d + j, t = D.tanh(p.u[k]), q = p.n[k] / p.sd[k]; s += -0.5 * q * q - D.log(p.sd[k]) - 0.5 * LOG_2PI - D.log(this.high * (1 - t * t) + 1e-6); }
        out[r] = s;
      }
      return out;
    }
    normals(n, rng = this.rng) { return Float64Array.from({ length: n }, () => rng.normal()); }
    // Actions for states x (B × ad): the deterministic actor (plus white noise when exploring), or SAC's sample (its
    // mean when greedy). Noise drawn one episode at a time goes through exploreAct instead.
    policy(x, B, greedy = false, rng = this.rng) {
      const d = this.ad, h = this.high;
      x = this.inp(x, B);
      if (this.sde) return Float64Array.from(this.actor.forward(x, B), (v) => h * D.tanh(v)); // the mean
      if (this.cfg.algo === "sac") {
        const { u } = this.sacParts(x, B, greedy ? null : this.normals(B * d, rng));
        return Float64Array.from(u, (v) => h * D.tanh(v));
      }
      const a = Float64Array.from(this.actor.forward(x, B), (z) => h * D.tanh(z));
      if (!greedy) for (let k = 0; k < a.length; k++) a[k] += this.cfg.noise * h * rng.normal();
      return a.map((v) => clip(v, -h, h));
    }
    // How widely the policy tries actions around its choice: SAC's σ carried through the squashing's slope at the
    // mean (action units), or the exploration noise (parameter noise: the spread it is adapted to).
    spread(x, B) {
      if (this.cfg.algo !== "sac") return new Float64Array(B).fill(this.cfg.noise * this.high);
      x = this.inp(x, B);
      const { mu, sd } = this.sde ? this.sdeParts(x, B, null) : this.sacParts(x, B, null), d = this.ad;
      return Float64Array.from({ length: B }, (_, r) => { const t = D.tanh(mu[r * d]); return this.high * sd[r * d] * (1 - t * t); });
    }
    join(x, a, B) { const d = this.dim, ad = this.ad, X = new Float64Array(B * (d + ad)); for (let r = 0; r < B; r++) { X.set(x.subarray(r * d, r * d + d), r * (d + ad)); X.set(a.subarray(r * ad, r * ad + ad), r * (d + ad) + d); } return X; }
    // Q(s, the greedy action) by the first critic: what the agent thinks a state is worth.
    value(x, B) { const a = this.policy(x, B, true); return this.critics[0].forward(this.join(this.inp(x, B), a, B), B).slice(); }
    // ---- acting and learning ----
    act(s) {
      if (this.t < this.cfg.start) return Array.from({ length: this.ad }, () => -this.high + 2 * this.high * this.rng.next());
      if (this.explore) return this.exploreAct(Float64Array.from(s));
      return Array.from(this.policy(Float64Array.from(s), 1));
    }
    // A new episode: noise drawn one episode at a time starts afresh, as do gSDE's matrix and the perturbed actor.
    episodeStart() {
      this.k = 0;
      if (!this.explore) return;
      const cfg = this.cfg, beta = BETA[cfg.noise_kind];
      if (this.pert) this.perturb(this.pert, this.pSigma);
      else if (this.sde) this.exploreMat = this.sdeMatrix(true);
      else if (cfg.noise_kind === "ou") this.ou = new Float64Array(this.ad);
      else if (beta !== undefined) this.seq = Array.from({ length: this.ad }, () => deep.colored(this.L, beta, this.rng));
    }
    exploreAct(x) {
      const cfg = this.cfg, d = this.ad, h = this.high, xn = this.inp(x, 1);
      if (this.pert) return Array.from(this.pert.forward(xn, 1), (z) => clip(h * D.tanh(z), -h, h));
      if (this.sde) {
        if (cfg.sde_freq > 0 && this.k > 0 && this.k % cfg.sde_freq === 0) this.exploreMat = this.sdeMatrix(true);
        return Array.from(this.sdeParts(xn, 1, this.exploreMat, true).u, (v) => h * D.tanh(v));
      }
      const eps = new Float64Array(d), k = Math.min(this.k, this.L - 1);
      if (cfg.noise_kind === "ou") for (let j = 0; j < d; j++) eps[j] = this.ou[j] = OU_RHO * this.ou[j] + OU_NEW * this.rng.normal();
      else for (let j = 0; j < d; j++) eps[j] = this.seq[j][k];
      if (cfg.algo === "sac") return Array.from(this.sacParts(xn, 1, eps).u, (v) => h * D.tanh(v));
      return Array.from(this.actor.forward(xn, 1), (z, j) => clip(h * D.tanh(z) + cfg.noise * h * eps[j], -h, h));
    }
    // Parameter noise: a copy of the actor with every weight moved by a normal of spread sigma.
    perturb(net, sigma) {
      net.copyFrom(this.actor);
      for (const p of net.params) for (let k = 0; k < p.length; k++) p[k] += sigma * this.rng.normal();
    }
    // Every 50 steps: perturb a second copy as much, and measure how far its actions are from the actor's on a batch of
    // the memory, in units of the largest action. Too little: perturb more (×1.01); too much: less (÷1.01).
    adaptParamNoise() {
      const B = this.cfg.batch, m = this.mem, dim = this.dim, S = new Float64Array(B * dim);
      for (let k = 0; k < B; k++) { const i = this.rng.int(m.size); S.set(m.S.subarray(i * dim, i * dim + dim), k * dim); }
      const x = this.inp(S, B), a = this.actor.forward(x, B).slice();
      this.perturb(this.probe, this.pSigma);
      const b = this.probe.forward(x, B);
      let s = 0;
      for (let k = 0; k < a.length; k++) { const e = D.tanh(a[k]) - D.tanh(b[k]); s += e * e; }
      this.pSigma = Math.sqrt(s / a.length) < this.cfg.noise ? this.pSigma * 1.01 : this.pSigma / 1.01;
    }
    observe(s, a, r, s2, done) {
      const m = this.mem, i = m.at;
      m.S.set(s, i * this.dim); m.S2.set(s2, i * this.dim); m.A.set(a, i * this.ad); m.R[i] = r * this.cfg.reward_scale; m.D[i] = done ? 1 : 0;
      m.at = (i + 1) % m.C; m.size = Math.min(m.size + 1, m.C);
      if (this.norm) this.norm.update(Float64Array.from(s), 1);
      this.t++; this.k++;
      if (this.t >= this.cfg.start) {
        this.learn();
        if (this.pert && this.t % 50 === 0) this.adaptParamNoise();
      }
    }
    learn() {
      const cfg = this.cfg, B = cfg.batch, m = this.mem, dim = this.dim, ad = this.ad, h = this.high;
      let S = new Float64Array(B * dim), S2 = new Float64Array(B * dim);
      const A = new Float64Array(B * ad), R = new Float64Array(B), Dn = new Float64Array(B);
      for (let k = 0; k < B; k++) {
        const i = this.rng.int(m.size);
        S.set(m.S.subarray(i * dim, i * dim + dim), k * dim); S2.set(m.S2.subarray(i * dim, i * dim + dim), k * dim);
        A.set(m.A.subarray(i * ad, i * ad + ad), k * ad); R[k] = m.R[i]; Dn[k] = m.D[i];
      }
      if (this.norm) { S = this.norm.apply(S, B); S2 = this.norm.apply(S2, B); }
      this.updates++;
      const alpha = D.exp(this.logAlpha), eps = this.sde ? this.sdeMatrix(false) : null; // gSDE: one matrix per update
      // the targets, from the slowly following copies
      let A2, logp2;
      if (this.sde) {
        const p = this.sdeParts(S2, B, eps);
        A2 = Float64Array.from(p.u, (v) => h * D.tanh(v)); logp2 = this.sdeLogp(p, B);
      } else if (cfg.algo === "sac") {
        const eps2 = this.normals(B * ad), p = this.sacParts(S2, B, eps2);
        A2 = Float64Array.from(p.u, (v) => h * D.tanh(v)); logp2 = this.sacLogp(eps2, p.ls, p.u, B);
      } else {
        A2 = Float64Array.from(this.actorTarget.forward(S2, B), (z) => h * D.tanh(z));
        if (cfg.algo === "td3") for (let k = 0; k < A2.length; k++) { // smooth the target: nearby actions should be worth about the same
          const noise = clip(cfg.policy_noise * h * this.rng.normal(), -cfg.noise_clip * h, cfg.noise_clip * h);
          A2[k] = clip(A2[k] + noise, -h, h);
        }
      }
      const X2 = this.join(S2, A2, B), q2 = this.criticTargets.map((ct) => ct.forward(X2, B).slice()), y = new Float64Array(B);
      for (let k = 0; k < B; k++) {
        let q = q2[0][k];
        for (let c = 1; c < q2.length; c++) q = Math.min(q, q2[c][k]);
        if (cfg.algo === "sac") q -= alpha * logp2[k];
        y[k] = R[k] + cfg.gamma * (1 - Dn[k]) * q;
      }
      // the critics: a regression step toward the targets
      const X = this.join(S, A, B);
      let loss = 0;
      this.critics.forEach((c, ci) => {
        const out = c.forward(X, B), err = new Float64Array(B);
        let sq = 0;
        for (let k = 0; k < B; k++) { const e = out[k] - y[k]; sq += e * e; err[k] = e / B; }
        loss += sq / B;
        c.backward(err);
        this.optCritics[ci].step(c.grads);
      });
      this.log.loss.push(loss / this.critics.length);
      let ys = 0;
      for (const v of y) ys += v;
      this.log.q.push(ys / B);
      // the actor, and the targets with it (TD3: every `delay` critic updates)
      if (cfg.algo === "td3" && this.updates % cfg.delay) return;
      if (this.sde) this.actorStepSde(S, B, alpha, eps);
      else if (cfg.algo === "sac") this.actorStepSac(S, B, alpha);
      else { this.actorStepDet(S, B, S2); this.actorTarget.softUpdate(this.actor, cfg.tau); }
      this.criticTargets.forEach((ct, i) => ct.softUpdate(this.critics[i], cfg.tau));
    }
    // dQ/da of critic c at (S, a) for B rows
    dqda(c, X, B) {
      c.forward(X, B);
      const gx = c.backward(new Float64Array(B).fill(1)), w = this.dim + this.ad, out = new Float64Array(B * this.ad);
      for (let r = 0; r < B; r++) for (let j = 0; j < this.ad; j++) out[r * this.ad + j] = gx[r * w + this.dim + j];
      return out;
    }
    // Climb Q(s, μ(s)): the critic's gradient with respect to the action, carried back through tanh and the actor.
    actorStepDet(S, B, S2) {
      if (this.cfg.caps_t || this.cfg.caps_s) return this.actorStepCaps(S, B, S2);
      const h = this.high, z = this.actor.forward(S, B).slice(), a = Float64Array.from(z, (v) => h * D.tanh(v));
      const g = this.dqda(this.critics[0], this.join(S, a, B), B), dz = new Float64Array(z.length);
      for (let k = 0; k < z.length; k++) { const t = D.tanh(z[k]); dz[k] = (-g[k] * h * (1 - t * t)) / B; } // loss = −mean Q
      this.actor.forward(S, B); // the actor's own inputs again, for its backward pass
      this.actor.backward(dz);
      this.optActor.step(this.actor.grads);
    }
    // The same step with CAPS's two terms (Mysore et al., 2021): loss = −mean Q(s, μ(s)) + λ_T mean ‖μ(s) − μ(s')‖
    // + λ_S mean ‖μ(s) − μ(s̄)‖, s' the next state of each transition and s̄ = s plus normal noise of spread σ_S, in
    // one pass of the actor over the batches the terms need.
    actorStepCaps(S, B, S2) {
      const cfg = this.cfg, terms = [];
      if (cfg.caps_t) terms.push([cfg.caps_t, S2]);
      if (cfg.caps_s) terms.push([cfg.caps_s, Float64Array.from(S, (v) => v + cfg.caps_sigma * this.rng.normal())]);
      this.optActor.step(this.capsGrads(S, B, terms));
    }
    // That loss's gradient with respect to the actor's parameters, for terms [[λ, the states each row is compared
    // with], …].
    capsGrads(S, B, terms) {
      const h = this.high, dim = this.dim, ad = this.ad, n = B * dim;
      const rows = (1 + terms.length) * B, X = new Float64Array(rows * dim);
      X.set(S, 0);
      terms.forEach(([, Y], i) => X.set(Y, (i + 1) * n));
      const z = this.actor.forward(X, rows).slice(), t = Float64Array.from(z, (v) => D.tanh(v)), a = Float64Array.from(t, (v) => h * v);
      const g = this.dqda(this.critics[0], this.join(S, a.subarray(0, B * ad), B), B), da = new Float64Array(rows * ad);
      for (let k = 0; k < B * ad; k++) da[k] = -g[k] / B;
      for (let i = 0; i < terms.length; i++) {
        const lam = terms[i][0], at = (i + 1) * B;
        for (let r = 0; r < B; r++) {
          let s = 0;
          for (let j = 0; j < ad; j++) { const e = a[r * ad + j] - a[(at + r) * ad + j]; s += e * e; }
          const norm = Math.sqrt(s);
          if (norm < 1e-12) continue;
          for (let j = 0; j < ad; j++) {
            const gj = (lam * (a[r * ad + j] - a[(at + r) * ad + j])) / norm / B;
            da[r * ad + j] += gj; da[(at + r) * ad + j] -= gj;
          }
        }
      }
      const dz = Float64Array.from(da, (v, k) => v * h * (1 - t[k] * t[k]));
      this.actor.forward(X, rows);
      this.actor.backward(dz);
      return this.actor.grads;
    }
    // Climb min(Q1, Q2)(s, a) − α log π(a | s), a = high · tanh(μ + σ ε), through the sample (reparameterization).
    actorStepSac(S, B, alpha) {
      const ad = this.ad, h = this.high, eps = this.normals(B * ad), p = this.sacParts(S, B, eps);
      const t = Float64Array.from(p.u, (v) => D.tanh(v)), a = Float64Array.from(t, (v) => h * v), X = this.join(S, a, B);
      const qs = this.critics.map((c) => c.forward(X, B).slice()), grads = this.critics.map((c) => this.dqda(c, X, B));
      const dl = new Float64Array(B * 2 * ad);
      for (let r = 0; r < B; r++) {
        let pick = 0; // the gradient of the min is the gradient of whichever critic is smaller
        for (let c = 1; c < qs.length; c++) if (qs[c][r] < qs[pick][r]) pick = c;
        for (let j = 0; j < ad; j++) {
          const k = r * ad + j, du = (alpha * 2 * t[k] - grads[pick][k] * h * (1 - t[k] * t[k])) / B;
          // loss = mean(α log π − min Q); log π depends on u through the squashing (d/du of −log(1 − tanh²) is 2 tanh)
          dl[r * 2 * ad + j] = du;
          dl[r * 2 * ad + ad + j] = p.raw[k] > LOG_STD[0] && p.raw[k] < LOG_STD[1] ? du * p.sd[k] * eps[k] - alpha / B : 0;
        }
      }
      this.actor.forward(S, B);
      this.actor.backward(dl);
      this.optActor.step(this.actor.grads);
      if (this.cfg.auto_alpha) this.tuneAlpha(this.sacLogp(eps, p.ls, p.u, B), B);
      this.log.alpha.push(D.exp(this.logAlpha));
    }
    // α rises when the policy is less random than the target entropy, and falls when more (Adam on log α).
    tuneAlpha(logp, B) {
      const ad = this.ad;
      let g = 0;
      for (const v of logp) g += v - ad;
      g = -g / B; // d/d(log α) of −log α · (log π + target), target = −(action dimensions)
      this.am = 0.9 * this.am + 0.1 * g; this.av = 0.999 * this.av + 0.001 * g * g;
      this.ab1 *= 0.9; this.ab2 *= 0.999;
      this.logAlpha -= (this.cfg.lr_alpha * (this.am / (1 - this.ab1))) / (Math.sqrt(this.av / (1 - this.ab2)) + 1e-8);
    }
    // SAC with gSDE: the same loss, the sample a = high · tanh(μ(s) + Σ_i z_i(s) σ_ij ε_ij) with one matrix ε for the
    // whole batch. The mean learns through the network; the spreads σ_ij through the noise and the Gaussian's density
    // (the features z are held fixed there, as in Stable-Baselines3).
    actorStepSde(S, B, alpha, eps) {
      const { grads, p } = this.sdeGrads(S, B, alpha, eps);
      this.optActor.step(grads);
      if (this.cfg.auto_alpha) this.tuneAlpha(this.sdeLogp(p, B), B);
      this.log.alpha.push(D.exp(this.logAlpha));
    }
    // That loss's gradient with respect to the actor's parameters and the log spreads (and the parts it was taken at).
    sdeGrads(S, B, alpha, eps) {
      const ad = this.ad, h = this.high, w = this.width, p = this.sdeParts(S, B, eps);
      const t = Float64Array.from(p.u, (v) => D.tanh(v)), a = Float64Array.from(t, (v) => h * v), X = this.join(S, a, B);
      const qs = this.critics.map((c) => c.forward(X, B).slice()), grads = this.critics.map((c) => this.dqda(c, X, B));
      const dmu = new Float64Array(B * ad), dls = new Float64Array(w * ad);
      for (let r = 0; r < B; r++) {
        let pick = 0;
        for (let c = 1; c < qs.length; c++) if (qs[c][r] < qs[pick][r]) pick = c;
        for (let j = 0; j < ad; j++) {
          const k = r * ad + j, c = alpha * 2 * t[k] - grads[pick][k] * h * (1 - t[k] * t[k]), sd2 = p.sd[k] * p.sd[k], nn = p.n[k];
          dmu[k] = c / B;
          for (let i = 0; i < w; i++) {
            const zs = p.z[r * w + i] * p.sig[i * ad + j], dn = zs * eps[i * ad + j], dv = (zs * zs) / sd2; // ∂n/∂ln σ_ij, (∂σ̂/∂ln σ_ij)/σ̂
            dls[i * ad + j] += (alpha * (-(nn / sd2) * dn + ((nn * nn) / sd2 - 1) * dv) + c * dn) / B;
          }
        }
      }
      this.actor.forward(S, B);
      this.actor.backward(dmu);
      return { grads: [...this.actor.grads, dls], p };
    }
  }
  deep.AC = AC;
})(globalThis.RL = globalThis.RL || {});
