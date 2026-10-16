/* Training runs as recordings: what the Lab and the stories play back (lab/recorded.js), in the format
   recorder/record.py wrote. For every seed, the average return of the training episodes in each block of steps and
   the return of one test episode after each block (always from the same start); for the seed shown, a snapshot after
   every block: what the network thinks of a grid of states (values, and the action it prefers), one test episode
   played with it, and the block's statistics.

   The same code trains offline (recorder/deep.js, in Node) and in the page (a Worker): same seed, same settings,
   same run. Offline, numbers are packed to 8 bits in base64; in the page (raw), they stay arrays. */
(function (RL) {
  "use strict";
  const deep = (RL.deep = RL.deep || {});
  const TEST_SEED = 2024; // every test episode starts from the same state, so snapshots compare like with like
  const round = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;
  const mean = (xs) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : null);

  // Numbers quantized to 8 or 16 bits between lo and hi, in base64 (the inverse of lab.unpack); raw: kept as they are.
  deep.pack = function (values, lo, hi, bits = 8, raw = false) {
    const v = Float64Array.from(values);
    if (raw) return v;
    if (lo === undefined) { lo = Infinity; hi = -Infinity; for (const x of v) { lo = Math.min(lo, x); hi = Math.max(hi, x); } }
    if (hi - lo < 1e-9) hi = lo + 1;
    const top = 2 ** bits - 1, q = bits === 16 ? new Uint16Array(v.length) : new Uint8Array(v.length);
    for (let i = 0; i < v.length; i++) q[i] = Math.round(((Math.min(hi, Math.max(lo, v[i])) - lo) / (hi - lo)) * top);
    const bytes = new Uint8Array(q.buffer);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return { lo: round(lo, 6), hi: round(hi, 6), bits, data: btoa(bin) };
  };

  // How much the actions jump from one step to the next: gSDE's continuity cost (Raffin et al., 2021), 100 times the
  // mean of ((a_t+1 − a_t) / the width of the action range)² (0: a constant action; 100: from one end of the range to
  // the other at every step). Continuous actions only (null for actions picked from a list).
  const jitter = (world, sum, n) => (world.act && n ? round((100 * sum) / n, 3) : null);
  const jumps = (world, actions) => { let s = 0; for (let i = 1; i < actions.length; i++) { const e = (actions[i] - actions[i - 1]) / (world.hi - world.lo); s += e * e; } return jitter(world, s, actions.length - 1); };

  // One episode from the test start; choose(obs) gives the action and the numbers kept for that step; seen, if given,
  // is shown the actions played.
  function testEpisode(world, choose, raw, seen) {
    const r = deep.rng(TEST_SEED);
    let s = world.reset(r), ret = 0, done = false;
    const states = [], actions = [], extra = [];
    while (!done) {
      const [a, numbers] = choose(world.observe(s));
      states.push(world.state(s)); actions.push(a); extra.push(numbers);
      const o = world.step(s, a);
      s = o.s2; ret += o.r;
      done = o.term || actions.length >= world.maxSteps;
    }
    states.push(world.state(s));
    seen?.(actions);
    const cols = extra[0].map((_, j) => extra.map((x) => x[j]));
    return {
      steps: actions.length, return: round(ret),
      s: world.ranges.map(([lo, hi], j) => deep.pack(states.map((x) => x[j]), lo, hi, 8, raw)),
      a: deep.pack(actions, undefined, undefined, 8, raw),
      x: cols.map((c) => deep.pack(c, undefined, undefined, 8, raw)), // each column on its own scale
    };
  }

  // How often each hidden unit fires over the map's states, layer by layer: for ReLU, the share of states where it is
  // above zero (0: a dead unit); for tanh, the share where it is saturated (|h| > 0.97, where its slope is nearly 0).
  function unitStats(net, grid, raw, prep = (x) => x) {
    const n = grid.length, d = grid[0].length, x = new Float64Array(n * d), out = [];
    grid.forEach((s, i) => x.set(s, i * d));
    net.forward(prep(x, n), n); // prep: what the network sees of the states (normalized observations)
    for (let i = 0; i < net.L - 1; i++) {
      const w = net.sizes[i + 1], h = net.h[i], f = new Float64Array(w);
      for (let r = 0; r < n; r++) for (let j = 0; j < w; j++) { const v = h[r * w + j]; if (net.act === "relu" ? v > 0 : Math.abs(v) > 0.97) f[j]++; }
      out.push(deep.pack(f.map((c) => c / n), 0, 1, 8, raw));
    }
    return out;
  }
  const netOf = (net, of) => ({ sizes: net.sizes, act: net.act, of });

  // ---- DQN ----
  function snapshotDQN(agent, world, raw) {
    const q = agent.valuesOf(world.grid()), nA = agent.nA, n = q.length / nA, v = new Float64Array(n), act = new Float64Array(n);
    for (let i = 0; i < n; i++) { let b = 0; for (let a = 1; a < nA; a++) if (q[i * nA + a] > q[i * nA + b]) b = a; v[i] = q[i * nA + b]; act[i] = b; }
    const test = testEpisode(world, (o) => { const x = agent.values(o); let b = 0; for (let a = 1; a < nA; a++) if (x[a] > x[b]) b = a; return [b, Array.from(x)]; }, raw);
    return { v: deep.pack(v, undefined, undefined, 8, raw), act: deep.pack(act, 0, nA - 1, 8, raw), test, eps: round(agent.epsilon(), 4), units: unitStats(agent.q.net, world.grid(), raw) };
  }

  function runDQN(spec, seed, { snapshots = false, raw = false, onBlock } = {}) {
    const world = deep.worlds[spec.world], rng = deep.rng(seed), envRng = deep.rng(seed + 7777);
    const agent = new deep.DQN(world.obs, world.nA, spec.cfg, rng, spec.steps);
    const block = spec.block, blocks = Math.floor(spec.steps / block);
    const perBlock = Array.from({ length: blocks }, () => []), qs = [], tests = [], shots = snapshots ? [snapshotDQN(agent, world, raw)] : [];
    let s = world.reset(envRng), len = 0, ret = 0;
    for (let t = 0; t < spec.steps; t++) {
      const o0 = world.observe(s), a = agent.act(o0), o = world.step(s, a);
      agent.observe(o0, a, o.r, world.observe(o.s2), o.term);
      s = o.s2; ret += o.r; len++;
      if (o.term || len >= world.maxSteps) { perBlock[Math.floor(t / block)].push(ret); s = world.reset(envRng); len = 0; ret = 0; }
      if ((t + 1) % block === 0) {
        const L = agent.log, k = (t + 1) / block;
        qs.push(L.q.length ? round(mean(L.q)) : null); // every seed: overestimation shows here
        let test;
        if (snapshots) {
          const shot = snapshotDQN(agent, world, raw);
          shot.stats = { loss: round(mean(L.loss) ?? 0, 4), td: round(mean(L.td) ?? 0, 4), q: round(mean(L.q) ?? 0, 4) };
          shots.push(shot); test = shot.test.return;
        } else test = testEpisode(world, (ob) => [agent.act(ob, true), []], true).return;
        tests.push(test);
        agent.log = { loss: [], td: [], q: [] };
        onBlock?.(k, { train: perBlock[k - 1].length ? round(mean(perBlock[k - 1])) : null, test, shot: shots[shots.length - 1] });
      }
    }
    return { seed, train: perBlock.map((b) => (b.length ? round(mean(b)) : null)), episodes: perBlock.map((b) => b.length), q: qs, test: tests, snapshots: shots, net: netOf(agent.q.net, "the Q-network") };
  }

  // ---- policy gradients (A2C, PPO, TRPO) ----
  // A test episode with actions drawn from the policy, keeping per step its probability of the last action (two
  // actions: the other is its complement) or its mean and spread, and the critic's value. With gSDE, the episode
  // draws its own noise matrix, again every sde_freq steps if that is set.
  function testPG(agent, world, rng, raw, seen) {
    const pi = agent.pi, one = new Float64Array(world.obs), freq = agent.cfg.sde_freq;
    let mats = null, k = 0;
    return testEpisode(world, (o) => {
      one.set(o);
      const x = agent.input(one, 1);
      if (pi.sde && (k === 0 || (freq > 0 && k % freq === 0))) mats = pi.noise(1, rng);
      k++;
      const a = pi.sample(x, 1, rng, mats)[0], v = agent.value(x, 1)[0], d = pi.dist(x, 1);
      return pi.discrete ? [a, [d.p[d.p.length - 1], v]] : [pi.forEnv(a)[0], [...pi.shown(d), v]];
    }, raw, seen);
  }
  // The critic's values over the grid, the policy's choice there (the probability of the last action, or the mean
  // action), and a test episode.
  function snapshotPG(agent, world, rng, raw, seen) {
    const g = world.grid(), n = g.length, x0 = new Float64Array(n * world.obs);
    g.forEach((s, i) => x0.set(s, i * world.obs));
    const x = agent.input(x0, n), v = agent.value(x, n), d = agent.pi.dist(x, n), k = agent.pi.out;
    const choice = agent.pi.discrete ? Float64Array.from({ length: n }, (_, i) => d.p[i * k + k - 1]) : Float64Array.from({ length: n }, (_, i) => agent.pi.shown(d, i)[0]);
    return { v: deep.pack(v, undefined, undefined, 8, raw), mean: deep.pack(choice, undefined, undefined, 8, raw), test: testPG(agent, world, rng, raw, seen), units: unitStats(agent.pi.net, g, raw, (y, B) => agent.input(y, B)) };
  }

  function runPG(spec, seed, { snapshots = false, raw = false, onBlock } = {}) {
    const world = deep.worlds[spec.world], rng = deep.rng(seed), envRng = deep.rng(seed + 7777), dim = world.obs;
    const agent = new deep.PG(dim, world, spec.cfg, rng), cfg = agent.cfg, N = cfg.workers, T = cfg.steps;
    const block = spec.block, blocks = Math.floor(spec.steps / block);
    const perBlock = Array.from({ length: blocks }, () => []), tests = [], shots = snapshots ? [snapshotPG(agent, world, deep.rng(seed + 10000), raw)] : [];
    let stats = [];
    const states = Array.from({ length: N }, () => world.reset(envRng)), lens = new Int32Array(N), ep = new Float64Array(N);
    // the jumps between consecutive actions of the training episodes, block by block, and of each test episode
    const jumpSum = new Float64Array(blocks), jumpN = new Float64Array(blocks), last = new Float64Array(N), jits = [];
    let t = 0;
    while (t < spec.steps) {
      const S = new Float64Array(T * N * dim), A = [], R = new Float64Array(T * N), V = new Float64Array(T * N), VN = new Float64Array(T * N), Dn = new Float64Array(T * N), C = new Float64Array(T * N);
      for (let k = 0; k < T; k++) {
        const raw0 = new Float64Array(N * dim);
        states.forEach((st, i) => raw0.set(world.observe(st), i * dim));
        const obs = agent.input(raw0, N, true);
        // gSDE: new noise matrices at the start of each batch of steps, and every sde_freq steps if that is set
        if (agent.pi.sde && (k === 0 || (cfg.sde_freq > 0 && k % cfg.sde_freq === 0))) agent.pi.mats = agent.pi.noise(N, rng);
        const a = agent.pi.sample(obs, N, rng);
        S.set(obs, k * N * dim); V.set(agent.value(obs, N), k * N); A.push(...a);
        const nxt = new Float64Array(N * dim);
        for (let i = 0; i < N; i++) {
          const act = agent.pi.discrete ? a[i] : agent.pi.forEnv(a[i])[0], o = world.step(states[i], act), bk = Math.floor(t / block);
          if (world.act && lens[i] && bk < blocks) { const e = (act - last[i]) / (world.hi - world.lo); jumpSum[bk] += e * e; jumpN[bk]++; }
          last[i] = act;
          lens[i]++;
          const cut = !o.term && lens[i] >= world.maxSteps;
          R[k * N + i] = o.r * cfg.reward_scale; Dn[k * N + i] = o.term ? 1 : 0; C[k * N + i] = cut ? 1 : 0;
          states[i] = o.s2; nxt.set(world.observe(o.s2), i * dim); ep[i] += o.r;
          if (o.term || cut) { if (Math.floor(t / block) < blocks) perBlock[Math.floor(t / block)].push(ep[i]); ep[i] = 0; }
        }
        VN.set(agent.value(agent.input(nxt, N), N), k * N); // the value of the state each step led to, before any reset: for cut episodes
        for (let i = 0; i < N; i++) if (Dn[k * N + i] || C[k * N + i]) { states[i] = world.reset(envRng); lens[i] = 0; }
        t += N;
        const b = Math.floor(t / block);
        const seen = (acts) => jits.push(jumps(world, acts));
        if (t % block < N && b <= blocks && snapshots && shots.length <= b) {
          const shot = snapshotPG(agent, world, deep.rng(seed + 10000 + b), raw, seen);
          shot.stats = stats.length ? Object.fromEntries(Object.keys(stats[0]).map((key) => [key, round(mean(stats.map((x) => x[key])), 4)])) : {};
          shots.push(shot); stats = [];
        }
        if (t % block < N && b <= blocks && tests.length < b) {
          tests.push(snapshots ? shots[shots.length - 1].test.return : testPG(agent, world, deep.rng(seed + 10000 + b), true, seen).return);
          onBlock?.(b, { train: perBlock[b - 1].length ? round(mean(perBlock[b - 1])) : null, test: tests[tests.length - 1], shot: shots[shots.length - 1], jitter: jits.at(-1), jitterTrain: jitter(world, jumpSum[b - 1], jumpN[b - 1]) });
        }
      }
      const { adv, ret } = deep.gae(R, V, VN, Dn, C, T, N, cfg.gamma, cfg.lam);
      agent.update(S, A, adv, ret);
      stats.push({ ...agent.stats });
    }
    return {
      seed, train: perBlock.map((b) => (b.length ? round(mean(b)) : null)), episodes: perBlock.map((b) => b.length), test: tests, snapshots: shots, net: netOf(agent.pi.net, "the policy network"),
      ...(world.act ? { jitter: jits.slice(0, tests.length), jitterTrain: Array.from(jumpSum, (s, i) => jitter(world, s, jumpN[i])) } : {}),
    };
  }

  // ---- off-policy actor-critics (DDPG, TD3, SAC) ----
  // A test episode played greedily, keeping per step the action, the spread the policy explores with, and the value.
  function testAC(agent, world, raw, seen) {
    const one = new Float64Array(world.obs);
    return testEpisode(world, (o) => { one.set(o); const a = agent.policy(one, 1, true)[0]; return [a, [a, agent.spread(one, 1)[0], agent.value(one, 1)[0]]]; }, raw, seen);
  }
  // What the critic thinks of the grid (Q of the greedy action), the actor's greedy action there, and a test episode.
  function snapshotAC(agent, world, raw, seen) {
    const g = world.grid(), n = g.length, x = new Float64Array(n * world.obs);
    g.forEach((s, i) => x.set(s, i * world.obs));
    const v = agent.value(x, n), a = agent.policy(x, n, true), ad = agent.ad;
    const test = testAC(agent, world, raw, seen); // (the actor's units: counted last, after the critic's passes)
    return { v: deep.pack(v, undefined, undefined, 8, raw), mean: deep.pack(Float64Array.from({ length: n }, (_, i) => a[i * ad]), undefined, undefined, 8, raw), test, units: unitStats(agent.actor, g, raw, (y, B) => agent.inp(y, B)) };
  }

  function runAC(spec, seed, { snapshots = false, raw = false, onBlock } = {}) {
    const world = deep.worlds[spec.world], rng = deep.rng(seed), envRng = deep.rng(seed + 7777);
    const agent = new deep.AC(world.obs, world, spec.cfg, rng, spec.steps), cfg = agent.cfg;
    const block = spec.block, blocks = Math.floor(spec.steps / block);
    const perBlock = Array.from({ length: blocks }, () => []), qs = [], tests = [], shots = snapshots ? [snapshotAC(agent, world, raw)] : [];
    const jumpSum = new Float64Array(blocks), jumpN = new Float64Array(blocks), jits = [], seen = (acts) => jits.push(jumps(world, acts));
    let s = world.reset(envRng), len = 0, ret = 0, last = 0;
    agent.episodeStart();
    for (let t = 0; t < spec.steps; t++) {
      const o0 = world.observe(s), a = agent.act(o0), o = world.step(s, a[0]);
      agent.observe(o0, a, o.r, world.observe(o.s2), o.term);
      if (len) { const e = (a[0] - last) / (world.hi - world.lo); jumpSum[Math.floor(t / block)] += e * e; jumpN[Math.floor(t / block)]++; }
      last = a[0];
      s = o.s2; ret += o.r; len++;
      if (o.term || len >= world.maxSteps) { perBlock[Math.floor(t / block)].push(ret); s = world.reset(envRng); len = 0; ret = 0; agent.episodeStart(); }
      if ((t + 1) % block === 0) {
        const L = agent.log, k = (t + 1) / block;
        qs.push(L.q.length ? round(mean(L.q) / cfg.reward_scale) : null); // in the reward's own units
        let test;
        if (snapshots) {
          const shot = snapshotAC(agent, world, raw, seen);
          shot.stats = { q: qs[qs.length - 1] ?? 0, loss: round(mean(L.loss) ?? 0, 4), ...(L.alpha.length ? { alpha: round(L.alpha[L.alpha.length - 1], 4) } : {}) };
          shots.push(shot); test = shot.test.return;
        } else test = testAC(agent, world, true, seen).return;
        tests.push(test);
        agent.log = { q: [], loss: [], alpha: [] };
        onBlock?.(k, { train: perBlock[k - 1].length ? round(mean(perBlock[k - 1])) : null, test, shot: shots[shots.length - 1], jitter: jits.at(-1), jitterTrain: jitter(world, jumpSum[k - 1], jumpN[k - 1]) });
      }
    }
    return {
      seed, train: perBlock.map((b) => (b.length ? round(mean(b)) : null)), episodes: perBlock.map((b) => b.length), q: qs, test: tests, snapshots: shots, net: netOf(agent.actor, "the actor"),
      jitter: jits, jitterTrain: Array.from(jumpSum, (x, i) => jitter(world, x, jumpN[i])),
    };
  }

  deep.runners = { dqn: runDQN, pg: runPG, ac: runAC };
  deep.run = (spec, seed, opts) => deep.runners[spec.learner](spec, seed, opts);

  // A recording from its runs (the shown seed's carrying the snapshots).
  deep.recording = function (name, spec, results) {
    const world = deep.worlds[spec.world], shown = spec.shown ?? spec.seeds[0], main = results.find((r) => r.seed === shown);
    return {
      name, title: spec.title, station: spec.station, world: spec.world, learner: spec.learner, trainer: "lab/deep",
      config: { ...spec.cfg }, steps: spec.steps, block: spec.block, seeds: spec.seeds, shown,
      grid: { x: [...world.x, deep.GRID], y: [...world.y, deep.GRID] },
      curves: results.map((r) => ({ seed: r.seed, train: r.train, test: r.test, episodes: r.episodes, ...(r.q ? { q: r.q } : {}), ...(spec.jitter ? { jitter: r.jitter, jitterTrain: r.jitterTrain } : {}) })),
      snapshots: main ? main.snapshots : [],
      ...(main?.net ? { net: main.net } : {}),
    };
  };
})(globalThis.RL = globalThis.RL || {});
