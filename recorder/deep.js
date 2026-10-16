/* Record training runs for RL Atlas with the JavaScript trainer (lab/deep/), the one the page also trains with.

     node recorder/deep.js                  # every recording in the catalog
     node recorder/deep.js dqn-cartpole     # some of them
     node recorder/deep.js --sweep [names]  # the sweeps: each recording's knobs over several values, curves only

   Writes content/recordings/<name>.json and content/recordings/sweeps/<name>.json, as recorder/record.py did, or to
   $RECORDINGS_OUT to compare before replacing. Seeds run in parallel, one thread per core. Each finished run is kept
   in recorder/.cache, so an interrupted job resumes where it stopped (delete the folder after changing the trainer). */
"use strict";
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const fs = require("fs"), path = require("path"), os = require("os"), crypto = require("crypto");

if (!isMainThread) { // a worker: train the runs it is sent
  const deep = require("../lab/deep/node.js");
  parentPort.on("message", ({ id, spec, seed, snapshots }) => parentPort.postMessage({ id, result: deep.run(spec, seed, { snapshots }) }));
  return;
}

const ROOT = path.resolve(__dirname, ".."), OUT = process.env.RECORDINGS_OUT || path.join(ROOT, "content", "recordings");
const CACHE = path.join(__dirname, ".cache");
const SEEDS = Array.from({ length: 20 }, (_, i) => i + 1);
const SNAPSHOT_FORMAT = 2; // 2: each snapshot counts how often the network's hidden units fire

// DQN on CartPole: tuned until most seeds balance for the full 500 steps. A squared loss, not Huber's: CartPole's values
// run up to 1/(1 − γ) = 100, and clipped errors learn them too slowly. Each comparison of Part 9 changes one thing.
const DQN_CARTPOLE = { lr: 5e-4, buffer: 10000, batch: 128, train_every: 4, target_every: 500, eps: [1, 0.05, 20000], huber: false };
const CARTPOLE = { world: "cartpole", learner: "dqn", steps: 200000, block: 5000, seeds: SEEDS };
const CATALOG = {
  "dqn-cartpole": { ...CARTPOLE, cfg: DQN_CARTPOLE, station: "dqn", title: "DQN" },
  "dqn-cartpole-no-replay": { ...CARTPOLE, cfg: { ...DQN_CARTPOLE, buffer: 128 }, station: "dqn", title: "DQN without replay" },
  "dqn-cartpole-no-target": { ...CARTPOLE, cfg: { ...DQN_CARTPOLE, target_every: 0 }, station: "dqn", title: "DQN without a target network" },
  "double-dqn-cartpole": { ...CARTPOLE, cfg: { ...DQN_CARTPOLE, double: true }, station: "dqn-extensions", title: "Double DQN" },
  "dueling-dqn-cartpole": { ...CARTPOLE, cfg: { ...DQN_CARTPOLE, dueling: true }, station: "dqn-extensions", title: "Dueling DQN" },
  "prioritized-dqn-cartpole": { ...CARTPOLE, cfg: { ...DQN_CARTPOLE, prioritized: true }, station: "dqn-extensions", title: "Prioritized replay" },
  // Policy gradients with networks, the deep versions of Part 10's methods
  "a2c-cartpole": { world: "cartpole", learner: "pg", station: "a2c", title: "A2C", steps: 120000, block: 3000, seeds: SEEDS,
    cfg: { algo: "a2c", workers: 8, steps: 5, lr: 1e-3, lam: 1.0, v_epochs: 1, minibatch: 40, lr_v: 1e-3 } },
  "ppo-cartpole": { world: "cartpole", learner: "pg", station: "ppo", title: "PPO", steps: 100000, block: 2500, seeds: SEEDS,
    cfg: { algo: "ppo", workers: 8, steps: 128, epochs: 10, minibatch: 64, lr: 3e-4, clip: 0.2, lam: 0.95 } },
  "trpo-cartpole": { world: "cartpole", learner: "pg", station: "trpo", title: "TRPO", steps: 100000, block: 2500, seeds: SEEDS,
    cfg: { algo: "trpo", workers: 8, steps: 256, delta: 0.01, lam: 0.95, v_epochs: 10, minibatch: 64 } },
  "ppo-pendulum": { world: "pendulum", learner: "pg", station: "ppo", title: "PPO", steps: 200000, block: 5000, seeds: SEEDS, sweepSeeds: SEEDS.slice(0, 10), shown: 2, jitter: true, // the typical seed (seed 1 fails)
    cfg: { algo: "ppo", workers: 4, steps: 512, epochs: 10, minibatch: 64, lr: 1e-3, gamma: 0.9, lam: 0.95, reward_scale: 0.1 } },
  // Off-policy actor-critics for continuous actions (Part 11)
  "ddpg-pendulum": { world: "pendulum", learner: "ac", station: "ddpg", title: "DDPG", steps: 60000, block: 1500, seeds: SEEDS, sweepSeeds: SEEDS.slice(0, 10), cfg: { algo: "ddpg", reward_scale: 0.1 } },
  "td3-pendulum": { world: "pendulum", learner: "ac", station: "td3", title: "TD3", steps: 60000, block: 1500, seeds: SEEDS, sweepSeeds: SEEDS.slice(0, 10), jitter: true, cfg: { algo: "td3", reward_scale: 0.1 } },
  "sac-pendulum": { world: "pendulum", learner: "ac", station: "sac", title: "SAC", steps: 60000, block: 1500, seeds: SEEDS, sweepSeeds: SEEDS.slice(0, 10), cfg: { algo: "sac", reward_scale: 0.1 } },
  // The tools of continuous control (Part 12). jitter: every seed also keeps how much its actions jump from step to step.
  // TD3 on continuous Mountain Car with exploration noise of four colors, all with the same spread, half the force.
  ...Object.fromEntries([["white", "white noise"], ["ou", "Ornstein–Uhlenbeck noise"], ["pink", "pink noise"], ["red", "red noise"]].map(([kind, name]) => [`td3-car-${kind}-noise`,
    { world: "mountain-car-continuous", learner: "ac", station: "action-noise", title: `TD3, ${name}`, steps: 40000, block: 1000, seeds: SEEDS, sweepSeeds: SEEDS.slice(0, 10), jitter: true,
      cfg: { algo: "td3", noise: 0.5, ...(kind === "white" ? {} : { noise_kind: kind }) } }])),
  // SAC on the same car: its samples are white noise, unless pink noise replaces the normals, or gSDE makes the noise a
  // function of the state (a new matrix every 8 steps).
  ...Object.fromEntries([["sac-car", "sac", "SAC", {}], ["sac-car-pink-noise", "sac", "SAC, pink noise", { noise_kind: "pink" }], ["sac-car-gsde", "gsde", "SAC with gSDE", { sde: true }]].map(([name, station, title, cfg]) => [name,
    { world: "mountain-car-continuous", learner: "ac", station, title, steps: 30000, block: 750, seeds: SEEDS, sweepSeeds: SEEDS.slice(0, 10), jitter: true, cfg: { algo: "sac", ...cfg } }])),
  // TD3 on the car with noise in its weights (Plappert et al., 2018): the perturbation adapts until the actions move by 0.5,
  // the white noise's spread. Unnormalized, the speed (never beyond ±0.07, while the position ranges over 1.8) barely
  // moves a perturbed actor; with the observations normalized, as in the paper, it can find the swing.
  ...Object.fromEntries([["td3-car-param-noise", "TD3, noise in the weights", {}], ["td3-car-param-noise-norm", "TD3, noise in the weights, normalized inputs", { obs_norm: true }]].map(([name, title, cfg]) => [name,
    { world: "mountain-car-continuous", learner: "ac", station: "parameter-noise", title, steps: 40000, block: 1000, seeds: SEEDS, sweepSeeds: SEEDS.slice(0, 10), jitter: true,
      cfg: { algo: "td3", noise: 0.5, param_noise: true, ...cfg } }])),
  // TD3 on Pendulum with CAPS's two terms. The temporal weight 0.1 and the spatial 0.3 (σ = 0.05): in trials, a temporal
  // weight of 0.3 or a spatial one of 1 froze some seeds at the start (every torque at one end of tanh), and a spatial
  // weight of 0.05 smoothed less.
  // Shown at seed 6, as is TD3 without CAPS below: there plain TD3 holds the pendulum up, then comes to flip its torque
  // between the ends of the range at almost every step, while CAPS stays calm (TD3's own recording shows seed 1, smooth).
  "td3-pendulum-caps": { world: "pendulum", learner: "ac", station: "smooth-policies", title: "TD3 with CAPS", steps: 60000, block: 1500, seeds: SEEDS, sweepSeeds: SEEDS.slice(0, 10), shown: 6, jitter: true,
    cfg: { algo: "td3", reward_scale: 0.1, caps_t: 0.1, caps_s: 0.3 } },
  // TD3 on Pendulum again for that race: the same runs as td3-pendulum, shown at seed 6.
  "td3-pendulum-jitter": { world: "pendulum", learner: "ac", station: "td3", title: "TD3", steps: 60000, block: 1500, seeds: SEEDS, sweepSeeds: SEEDS.slice(0, 10), shown: 6, jitter: true,
    cfg: { algo: "td3", reward_scale: 0.1 } },
};
// PPO on Pendulum from a narrower and a wider starting spread (Gaussian policies in practice): ln σ₀ = −1 and 1 around
// the recording's 0, shown at its seed. Their first 10 seeds are the PPO sweep's runs, cached.
for (const [kind, v, how] of [["narrow", -1, "a narrow start"], ["wide", 1, "a wide start"]])
  CATALOG[`ppo-pendulum-${kind}`] = { ...CATALOG["ppo-pendulum"], title: `PPO, ${how}`, cfg: { ...CATALOG["ppo-pendulum"].cfg, log_std0: v } };
// The knobs each recording's sweep tries, its own value among them. target_every = 0: no target network; buffer = 128
// (the batch size): no replay, each batch is the latest experience.
const SWEEPS = {
  "dqn-cartpole": { lr: [1e-4, 2.5e-4, 5e-4, 1e-3, 2.5e-3], target_every: [0, 100, 500, 2000], buffer: [128, 1000, 10000, 100000], huber: [0, 1],
    depth: [1, 2, 3], width: [16, 32, 64, 128], act: ["relu", "tanh"] },
  "a2c-cartpole": { lr: [3e-4, 1e-3, 3e-3, 1e-2], steps: [1, 5, 20] },
  "ppo-cartpole": { clip: [0.0, 0.1, 0.2, 0.3, 0.5], epochs: [1, 4, 10, 30], lr: [1e-4, 3e-4, 1e-3, 3e-3, 1e-2, 3e-2] },
  "trpo-cartpole": { delta: [0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1.0] },
  "ppo-pendulum": { lr: [3e-4, 1e-3, 3e-3], gamma: [0.9, 0.95, 0.99], clip: [0.0, 0.1, 0.2, 0.3, 0.5], epochs: [1, 4, 10, 30],
    log_std0: [-1, 0, 1], squash: [0, 1], obs_norm: [0, 1], sde: [0, 1] },
  "ddpg-pendulum": { tau: [0.001, 0.005, 0.02, 0.1], noise: [0.0, 0.1, 0.3, 0.6], reward_scale: [0.01, 0.1, 1.0], weight_decay: [0, 0.001, 0.01] },
  "td3-pendulum": { delay: [1, 2, 4, 8], policy_noise: [0.0, 0.2, 0.5, 1.0] },
  "td3-pendulum-jitter": { delay: [1, 2, 4, 8], policy_noise: [0.0, 0.2, 0.5, 1.0] }, // td3-pendulum's runs, cached
  "sac-pendulum": { alpha: ["auto", 0.01, 0.05, 0.2, 1.0], tau: [0.001, 0.005, 0.02, 0.1] },
  // Part 12: the colors are the recordings themselves (their first 10 seeds), so only the spreads train anew
  "td3-car-white-noise": { noise_kind: ["white", "ou", "pink", "red"], noise: [0.2, 0.5, 1.0], obs_norm: [0, 1] },
  "td3-car-pink-noise": { noise: [0.2, 0.5, 1.0] },
  // SAC's gSDE on the car: how long each noise matrix is held (8, the recording's, as in Raffin et al.)
  "sac-car-gsde": { sde_freq: [1, 4, 8, 32, 128] },
  // CAPS on Pendulum: each term alone (0 turns it off), and each stronger than the recording's
  "td3-pendulum-caps": { caps_t: [0, 0.1, 0.3], caps_s: [0, 0.3, 1.0] },
};
// Sweep values that set more than one knob: SAC's α is either tuned ("auto") or fixed.
const SWEEP_AS = { alpha: (v) => (v === "auto" ? { auto_alpha: true } : { alpha: v, auto_alpha: false }) };
const { DQN_DEFAULTS, PG_DEFAULTS, AC_DEFAULTS } = require("../lab/deep/node.js"), DEFAULTS = { dqn: DQN_DEFAULTS, pg: PG_DEFAULTS, ac: AC_DEFAULTS };

// ---- a pool of threads, with every finished run cached on disk ----
function pool(jobs, label) {
  fs.mkdirSync(CACHE, { recursive: true });
  // a run with snapshots is kept under the snapshots' format too: a new format retrains only the shown seeds
  const keyOf = (j) => crypto.createHash("sha1").update(JSON.stringify([j.spec.world, j.spec.learner, j.spec.steps, j.spec.block, j.spec.cfg, j.seed, j.snapshots && SNAPSHOT_FORMAT])).digest("hex");
  const results = new Array(jobs.length), todo = [];
  jobs.forEach((j, i) => { const f = path.join(CACHE, `${keyOf(j)}.json`); if (fs.existsSync(f)) results[i] = JSON.parse(fs.readFileSync(f, "utf8")); else todo.push(i); });
  if (!todo.length) return Promise.resolve(results);
  const t0 = Date.now(), n = Math.min(os.cpus().length, todo.length);
  let done = 0;
  return new Promise((resolve, reject) => {
    for (let w = 0; w < n; w++) {
      const worker = new Worker(__filename);
      const next = () => { const i = todo.shift(); if (i === undefined) return worker.terminate(); worker.postMessage({ id: i, ...jobs[i] }); };
      worker.on("message", ({ id, result }) => {
        fs.writeFileSync(path.join(CACHE, `${keyOf(jobs[id])}.json`), JSON.stringify(result));
        results[id] = result; done++;
        const left = jobs.length - results.filter(Boolean).length;
        process.stdout.write(`\r${label}: ${done} run${done > 1 ? "s" : ""} trained, ${left} to go, ${Math.round((Date.now() - t0) / 1000)} s   `);
        if (!left) { process.stdout.write("\n"); resolve(results); }
        next();
      });
      worker.on("error", reject);
      next();
    }
  });
}

const write = (file, data) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(data)); return Math.round(fs.statSync(file).size / 1024); };

async function record(name) {
  const deep = require("../lab/deep/node.js"), spec = CATALOG[name], shown = spec.shown ?? spec.seeds[0];
  const results = await pool(spec.seeds.map((seed) => ({ spec, seed, snapshots: seed === shown })), name);
  const kb = write(path.join(OUT, `${name}.json`), deep.recording(name, spec, results));
  const ends = results.map((r) => r.test.at(-1));
  console.log(`${name}: ${kb} KB; final test returns ${ends.join(" ")}`);
}

// The recording's own value of a knob: its setting, or the learner's default (a switch is swept as 0 and 1).
function current(spec, knob) {
  const cfg = { ...DEFAULTS[spec.learner], ...spec.cfg };
  if (knob === "alpha" && cfg.auto_alpha) return "auto";
  const v = cfg[knob];
  return typeof v === "boolean" ? +v : v;
}

async function sweep(name) {
  const spec = CATALOG[name], knobs = SWEEPS[name], seeds = spec.sweepSeeds || spec.seeds;
  const jobs = Object.entries(knobs).flatMap(([knob, values]) => values.flatMap((v) => seeds.map((seed) => ({ knob, v, seed }))));
  const setting = (knob, v) => (SWEEP_AS[knob] ? SWEEP_AS[knob](v) : { [knob]: typeof DEFAULTS[spec.learner][knob] === "boolean" ? !!v : v });
  // the recording's own value of a knob trains the recording's own settings: those runs are cached already
  const specFor = (knob, v) => (v === current(spec, knob) ? spec : { ...spec, cfg: { ...spec.cfg, ...setting(knob, v) } });
  const results = await pool(jobs.map(({ knob, v, seed }) => ({ spec: specFor(knob, v), seed, snapshots: false })), `${name} sweep`);
  const at = (knob, v, seed) => results[jobs.findIndex((j) => j.knob === knob && j.v === v && j.seed === seed)];
  const out = {
    name, world: spec.world, steps: spec.steps, block: spec.block, seeds, config: spec.cfg, trainer: "lab/deep",
    knobs: Object.fromEntries(Object.entries(knobs).map(([knob, values]) => [knob, {
      values, current: current(spec, knob),
      train: values.map((v) => seeds.map((s) => at(knob, v, s).train)),
      test: values.map((v) => seeds.map((s) => at(knob, v, s).test)),
      // how much the actions jump from step to step, in the tests and the training episodes (recordings that keep it)
      ...(spec.jitter && values.every((v) => seeds.every((s) => at(knob, v, s).jitter)) ? { jitter: values.map((v) => seeds.map((s) => at(knob, v, s).jitter)), jitterTrain: values.map((v) => seeds.map((s) => at(knob, v, s).jitterTrain)) } : {}),
    }])),
  };
  console.log(`${name} sweep: ${write(path.join(OUT, "sweeps", `${name}.json`), out)} KB`);
}

(async () => {
  const args = process.argv.slice(2), isSweep = args.includes("--sweep"), names = args.filter((a) => !a.startsWith("--"));
  const known = isSweep ? SWEEPS : CATALOG, unknown = names.filter((n) => !(n in known));
  if (unknown.length) { console.error(`unknown ${isSweep ? "sweeps" : "recordings"}: ${unknown.join(", ")} (known: ${Object.keys(known).join(", ")})`); process.exit(1); }
  for (const name of names.length ? names : Object.keys(known)) await (isSweep ? sweep(name) : record(name));
})();
