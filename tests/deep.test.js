// The deep trainer (lab/deep/): its math, its gradients, and runs that a seed reproduces exactly.
const test = require("node:test");
const assert = require("node:assert/strict");
const deep = require("../lab/deep/node.js");
const D = globalThis.RL.dmath;

test("deterministic math: within a few ulps of Math's", () => {
  const r = deep.rng(1), rel = (a, b) => (a === b ? 0 : Math.abs(a - b) / Math.abs(b));
  for (let i = 0; i < 20000; i++) {
    const x = -30 + 60 * r.next(), y = 1e-6 + 50 * r.next();
    assert.ok(rel(D.exp(x), Math.exp(x)) < 2e-15, `exp(${x})`);
    assert.ok(rel(D.log(y), Math.log(y)) < 2e-15 || Math.abs(D.log(y) - Math.log(y)) < 1e-16, `log(${y})`);
    assert.ok(rel(D.tanh(x / 10), Math.tanh(x / 10)) < 2e-15, `tanh(${x / 10})`);
    assert.ok(Math.abs(D.sin(x) - Math.sin(x)) < 1e-15 && Math.abs(D.cos(x) - Math.cos(x)) < 1e-15, `sin/cos(${x})`);
  }
  assert.equal(D.exp(0), 1); assert.equal(D.log(1), 0); assert.equal(D.sin(0), 0); assert.equal(D.cos(0), 1);
});

test("networks: gradients match finite differences; a state's values are the same alone or in a batch", () => {
  for (const act of ["relu", "tanh"]) {
    const r = deep.rng(3), net = new deep.MLP([3, 6, 5, 2], r, act), B = 3, x = Float64Array.from({ length: 9 }, () => r.normal());
    const loss = () => { const y = net.forward(x, B); let s = 0; for (let i = 0; i < y.length; i++) s += 0.5 * y[i] * y[i] * (i + 1); return s; };
    const y = net.forward(x, B), gx = net.backward(Float64Array.from(y, (v, i) => v * (i + 1))).slice();
    const numeric = (arr, k) => { const o = arr[k]; arr[k] = o + 1e-6; const a = loss(); arr[k] = o - 1e-6; const b = loss(); arr[k] = o; return (a - b) / 2e-6; };
    net.params.forEach((p, i) => { for (let k = 0; k < p.length; k++) assert.ok(Math.abs(numeric(p, k) - net.grads[i][k]) < 1e-7, `${act} param ${i}[${k}]`); });
    for (let k = 0; k < x.length; k++) assert.ok(Math.abs(numeric(x, k) - gx[k]) < 1e-7, `${act} input ${k}`);
  }
  const r = deep.rng(5), net = new deep.MLP([4, 64, 64, 2], r), B = 7, x = Float64Array.from({ length: 28 }, () => r.normal());
  const batch = net.forward(x, B).slice();
  for (let i = 0; i < B; i++) assert.deepEqual(Array.from(net.forward(x.subarray(i * 4, i * 4 + 4), 1)), Array.from(batch.subarray(i * 2, i * 2 + 2)));
});

test("DQN on CartPole: a seed is the same run every time, and the network learns", () => {
  const spec = { world: "cartpole", learner: "dqn", steps: 10000, block: 2500, seeds: [4], cfg: { lr: 5e-4, buffer: 10000, batch: 128, train_every: 4, target_every: 500, eps: [1, 0.05, 20000], huber: false } };
  const a = deep.run(spec, 4, { snapshots: true }), b = deep.run(spec, 4, { snapshots: true });
  assert.deepEqual(a, b);
  assert.ok(a.test.at(-1) > 100, `test returns ${a.test}`);
  const rec = deep.recording("t", spec, [a]);
  assert.equal(rec.snapshots.length, 5);
  assert.equal(rec.snapshots[4].test.steps, a.test.at(-1));
  for (const v of [{ double: true }, { dueling: true }, { prioritized: true }, { target_every: 0 }, { buffer: 128 }]) {
    const out = deep.run({ ...spec, steps: 2500, cfg: { ...spec.cfg, ...v } }, 1);
    assert.equal(out.test.length, 1, JSON.stringify(v));
  }
});

test("policy gradients and actor-critics: every algorithm runs, and a seed is the same run every time", () => {
  const pg = (algo, extra) => ({ world: "cartpole", learner: "pg", steps: 2000, block: 1000, seeds: [1], cfg: { algo, workers: 4, steps: 50, minibatch: 50, ...extra } });
  const ac = (algo) => ({ world: "pendulum", learner: "ac", steps: 1300, block: 650, seeds: [1], cfg: { algo, start: 1000, batch: 32, reward_scale: 0.1 } });
  for (const spec of [pg("a2c"), pg("ppo", { epochs: 2 }), pg("trpo", { v_epochs: 2 }), { ...pg("ppo", { epochs: 2 }), world: "pendulum", block: 800, steps: 1600 }, ac("ddpg"), ac("td3"), ac("sac")]) {
    const a = deep.run(spec, 2, { snapshots: true }), b = deep.run(spec, 2, { snapshots: true }), label = `${spec.cfg.algo} on ${spec.world}`;
    assert.deepEqual(a, b, label);
    assert.equal(a.test.length, 2, label);
    assert.equal(a.snapshots.length, 3, label);
    assert.ok(a.test.every(Number.isFinite), label);
  }
});

test("Pendulum and continuous Mountain Car follow Gymnasium's physics step for step", () => {
  // tests/gym-control.json: Gymnasium's own trajectories (observations in 32-bit floats) from a fixed start under a
  // fixed list of actions, some beyond the action range
  const ref = require("./gym-control.json");
  for (const [name, id] of [["Pendulum-v1", "pendulum"], ["MountainCarContinuous-v0", "mountain-car-continuous"]]) {
    const world = deep.worlds[id], { start, acts, traj } = ref[name];
    let s = start;
    acts.forEach((a, t) => {
      const o = world.step(s, a), obs = world.observe(o.s2), want = traj[t], n = obs.length;
      obs.forEach((v, i) => assert.ok(Math.abs(v - want[i]) < 1e-6, `${name} step ${t + 1}, observation ${i}: ${v} vs ${want[i]}`));
      assert.ok(Math.abs(o.r - want[n]) < 1e-9, `${name} step ${t + 1}: reward ${o.r} vs ${want[n]}`);
      assert.equal(o.term, want[n + 1] ?? false, `${name} step ${t + 1}: the end`);
      s = o.s2;
    });
  }
  // Mountain Car: full force toward the goal is too weak; pushing along the velocity swings the car up
  const car = deep.worlds["mountain-car-continuous"], play = (policy) => {
    let s = car.reset(deep.rng(1)), t = 0, o = { term: false };
    while (!o.term && t < car.maxSteps) { o = car.step(s, policy(s)); s = o.s2; t++; }
    return { t, term: o.term };
  };
  assert.deepEqual(play(() => 1), { t: 999, term: false });
  assert.ok(play((s) => (s[1] >= 0 ? 1 : -1)).t < 150);
});

test("colored noise: a spread near 1, and the redder the color the slower it moves", () => {
  // white: independent numbers; pink and red: most of the power at low frequencies, so consecutive numbers are close.
  // (The ensemble variance is 1 plus the share of the constant term, as in the colorednoise package: 1.07 pink, 1.29 red.)
  const r = deep.rng(9), L = 999, stats = (beta) => {
    let v = 0, c = 0;
    for (let k = 0; k < 60; k++) { const y = deep.colored(L, beta, r); for (let i = 0; i < L; i++) { v += y[i] * y[i]; if (i) c += y[i] * y[i - 1]; } }
    return { v: v / (60 * L), lag: c / v };
  };
  const white = stats(0), pink = stats(1), red = stats(2);
  assert.ok(Math.abs(white.v - 1) < 0.03 && Math.abs(white.lag) < 0.02, JSON.stringify(white));
  assert.ok(Math.abs(pink.v - 1.07) < 0.1 && pink.lag > 0.7 && pink.lag < 0.85, JSON.stringify(pink));
  assert.ok(Math.abs(red.v - 1.29) < 0.3 && red.lag > 0.99, JSON.stringify(red));
  assert.deepEqual(Array.from(deep.colored(200, 1, deep.rng(3))), Array.from(deep.colored(200, 1, deep.rng(3))));
  assert.equal(deep.colored(201, 2, deep.rng(4)).length, 201);
});

test("running normalization: the inputs' mean and spread, batch after batch", () => {
  const r = deep.rng(6), norm = new deep.RunningNorm(2);
  for (let k = 0; k < 50; k++) norm.update(Float64Array.from({ length: 40 }, (_, i) => (i % 2 ? 0.01 * r.normal() : 3 + 2 * r.normal())), 20);
  assert.ok(Math.abs(norm.mean[0] - 3) < 0.15 && Math.abs(Math.sqrt(norm.var[0]) - 2) < 0.1, `${norm.mean[0]} ± ${Math.sqrt(norm.var[0])}`);
  assert.ok(Math.abs(norm.mean[1]) < 0.002 && Math.abs(Math.sqrt(norm.var[1]) - 0.01) < 0.001);
  assert.deepEqual(Array.from(norm.apply(Float64Array.of(3, 1), 1)).map((v) => Math.round(v * 10) / 10 + 0), [0, 10]); // clipped at 10
});

// The gradient a learner computes against a central difference of the loss it means, parameter entry by entry.
const fd = (loss, arr, k, h = 1e-6) => { const o = arr[k]; arr[k] = o + h; const a = loss(); arr[k] = o - h; const b = loss(); arr[k] = o; return (a - b) / (2 * h); };
const close = (a, b, label) => assert.ok(Math.abs(a - b) <= 1e-6 + 1e-4 * Math.abs(b), `${label}: ${a} vs ${b}`);

test("gSDE's gradients match finite differences: PPO's log-likelihood and SAC's actor loss", () => {
  const world = deep.worlds.pendulum, r = deep.rng(4), B = 5, beta = 0.3;
  // PPO: Σ w ln π(a | s) + β Σ H, through the mean (the output layer) and the log spreads σ_ij
  const agent = new deep.PG(3, world, { sde: true, log_std0: -1, width: 8 }, r), pi = agent.pi, L = pi.net.L;
  const x = Float64Array.from({ length: B * 3 }, () => r.normal()), a = Array.from({ length: B }, () => [r.normal()]), w = Float64Array.from({ length: B }, () => r.normal());
  const objective = () => {
    const lp = pi.logProb(x, a, B), d = pi.dist(x, B);
    let s = 0;
    for (let k = 0; k < B; k++) s += w[k] * lp[k] + beta * (0.5 * (1.8378770664093453 + 1) + D.log(d.sd[k]));
    return s;
  };
  const g = pi.grad(x, a, w, B, beta);
  for (const i of [L - 1, 2 * L - 1]) pi.net.params[i].forEach((_, k) => close(g[i][k], fd(objective, pi.net.params[i], k), `PPO output layer ${i}[${k}]`));
  pi.logStd.forEach((_, k) => close(g.at(-1)[k], fd(objective, pi.logStd, k), `PPO log spread ${k}`));
  // SAC: mean(α log π − min Q) of a = high · tanh(μ + Σ_i z_i σ_ij ε_ij), one matrix ε for the batch
  const ac = new deep.AC(3, world, { algo: "sac", sde: true, log_std0: -1, width: 8 }, r, 1000), alpha = 0.3;
  const S = Float64Array.from({ length: B * 3 }, () => r.normal()), eps = ac.sdeMatrix(false);
  const loss = () => {
    const p = ac.sdeParts(S, B, eps), lp = ac.sdeLogp(p, B), act = Float64Array.from(p.u, (v) => ac.high * D.tanh(v)), X = ac.join(S, act, B);
    const qs = ac.critics.map((c) => c.forward(X, B).slice());
    let s = 0;
    for (let k = 0; k < B; k++) s += alpha * lp[k] - Math.min(qs[0][k], qs[1][k]);
    return s / B;
  };
  const { grads } = ac.sdeGrads(S, B, alpha, eps), G = grads.map((q) => q.slice()), AL = ac.actor.L;
  for (const i of [AL - 1, 2 * AL - 1]) ac.actor.params[i].forEach((_, k) => close(G[i][k], fd(loss, ac.actor.params[i], k), `SAC output layer ${i}[${k}]`));
  ac.logStdMat.forEach((_, k) => close(G.at(-1)[k], fd(loss, ac.logStdMat, k), `SAC log spread ${k}`));
});

test("CAPS's gradient matches finite differences", () => {
  // −mean Q(s, μ(s)) + λ_T mean ‖μ(s) − μ(s')‖ + λ_S mean ‖μ(s) − μ(s̄)‖, every parameter of the actor
  const r = deep.rng(8), B = 4, ac = new deep.AC(3, deep.worlds.pendulum, { algo: "td3", caps_t: 0.5, caps_s: 0.2, act: "tanh" }, r, 1000);
  const rand = () => Float64Array.from({ length: B * 3 }, () => r.normal()), S = rand(), terms = [[0.5, rand()], [0.2, rand()]];
  const act = (Y) => Float64Array.from(ac.actor.forward(Y, B), (z) => ac.high * D.tanh(z));
  const loss = () => {
    const a0 = act(S), q = ac.critics[0].forward(ac.join(S, a0, B), B).slice();
    let s = 0;
    for (let k = 0; k < B; k++) s -= q[k];
    for (const [lam, Y] of terms) { const a1 = act(Y); for (let k = 0; k < B; k++) s += lam * Math.abs(a0[k] - a1[k]); }
    return s / B;
  };
  const g = ac.capsGrads(S, B, terms).map((q) => q.slice());
  ac.actor.params.forEach((p, i) => p.forEach((_, k) => close(g[i][k], fd(loss, p, k), `actor ${i}[${k}]`)));
});

test("Part 12's tools: every option runs, and a seed is the same run every time", () => {
  const car = (cfg) => ({ world: "mountain-car-continuous", learner: "ac", steps: 1400, block: 700, seeds: [1], jitter: true, cfg: { start: 1000, batch: 32, ...cfg } });
  const pend = (cfg) => ({ world: "pendulum", learner: "ac", steps: 1300, block: 650, seeds: [1], jitter: true, cfg: { start: 1000, batch: 32, reward_scale: 0.1, ...cfg } });
  const pg = (cfg) => ({ world: "pendulum", learner: "pg", steps: 1600, block: 800, seeds: [1], jitter: true, cfg: { algo: "ppo", workers: 4, steps: 50, minibatch: 50, epochs: 2, ...cfg } });
  const specs = [
    car({ algo: "td3", noise_kind: "ou" }), car({ algo: "td3", noise_kind: "pink" }), car({ algo: "ddpg", noise_kind: "red", noise: 0.5 }),
    car({ algo: "ddpg", param_noise: true, noise: 0.2 }), car({ algo: "sac", sde: true }), car({ algo: "sac", noise_kind: "pink" }),
    pend({ algo: "sac", sde: true, sde_freq: -1 }), pend({ algo: "td3", caps_t: 1, caps_s: 0.5 }), pend({ algo: "ddpg", obs_norm: true, weight_decay: 1e-2 }),
    pg({ sde: true }), pg({ sde: true, sde_freq: 4, squash: true }), pg({ algo: "a2c", sde: true, obs_norm: true, steps: 5, minibatch: 20 }), pg({ squash: true, obs_norm: true }),
  ];
  for (const spec of specs) {
    const label = `${spec.cfg.algo} on ${spec.world} with ${JSON.stringify(spec.cfg)}`, a = deep.run(spec, 2, { snapshots: true }), b = deep.run(spec, 2, { snapshots: true });
    assert.deepEqual(a, b, label);
    assert.equal(a.test.length, 2, label);
    assert.ok(a.test.every(Number.isFinite), label);
    assert.equal(a.jitter.length, 2, label);
    assert.ok([...a.jitter, ...a.jitterTrain].every((j) => j >= 0 && j <= 100), `${label}: jitter ${a.jitter} ${a.jitterTrain}`);
    const rec = deep.recording("t", spec, [a]);
    assert.deepEqual(rec.curves[0].jitter, a.jitter, label);
  }
  assert.throws(() => new deep.PG(3, deep.worlds.pendulum, { algo: "trpo", sde: true }, deep.rng(1)), /TRPO/);
  // the colors as exploration sees them: the redder, the smaller the jumps between consecutive actions
  const jumps = ["white", "pink", "red"].map((kind) => deep.run(car({ algo: "td3", noise_kind: kind, noise: 0.5, start: 0, batch: 8 }), 1).jitterTrain[0]);
  assert.ok(jumps[0] > jumps[1] && jumps[1] > jumps[2], `white ${jumps[0]}, pink ${jumps[1]}, red ${jumps[2]}`);
});
