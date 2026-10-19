/* Autonomous flows and convex certificate fitting. No DOM. Seeds count independent initial conditions.
   The optimizer projects onto the PSD cone and sampled affine halfspaces; its reported residual, not its
   iteration count, decides feasibility. All transcendental dynamics use the atlas's deterministic math. */
(function (RL) {
  "use strict";
  const D = RL.dmath, rng = (s) => RL.lab.rng(s);
  const dot = (a, b) => a.reduce((v, x, i) => v + x * b[i], 0);
  const norm = (x) => Math.sqrt(dot(x, x));
  const zeros = (n) => Array(n).fill(0);
  const eye = (n) => Array.from({ length: n * n }, (_, i) => i % (n + 1) === 0 ? 1 : 0);
  function eigen(A, n) {
    const a = A.slice(), v = eye(n);
    for (let sweep = 0; sweep < 60; sweep++) {
      let largest = 0;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        const apq = a[p * n + q]; largest = Math.max(largest, Math.abs(apq));
        if (Math.abs(apq) < 1e-13) continue;
        const tau = (a[q * n + q] - a[p * n + p]) / (2 * apq);
        const t = (tau >= 0 ? 1 : -1) / (Math.abs(tau) + Math.sqrt(1 + tau * tau));
        const c = 1 / Math.sqrt(1 + t * t), s = t * c;
        a[p * n + p] -= t * apq; a[q * n + q] += t * apq;
        a[p * n + q] = a[q * n + p] = 0;
        for (let k = 0; k < n; k++) {
          if (k !== p && k !== q) {
            const u = a[k * n + p], w = a[k * n + q];
            a[k * n + p] = a[p * n + k] = c * u - s * w;
            a[k * n + q] = a[q * n + k] = s * u + c * w;
          }
          const u = v[k * n + p], w = v[k * n + q];
          v[k * n + p] = c * u - s * w; v[k * n + q] = s * u + c * w;
        }
      }
      if (largest < 1e-12) break;
    }
    return { values: Array.from({ length: n }, (_, i) => a[i * n + i]), vectors: v };
  }
  function psd(A, n, floor = 0) {
    const { values, vectors: v } = eigen(A, n), out = zeros(n * n);
    for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++)
      out[i * n + j] += Math.max(floor, values[k]) * v[i * n + k] * v[j * n + k];
    return out;
  }
  function world(name = "linear", matrix = [-1, 3, 0, -2]) {
    if (name === "linear") return { name, time: "continuous", f: ([x, y]) => [matrix[0] * x + matrix[1] * y, matrix[2] * x + matrix[3] * y], jac: () => matrix.slice() };
    if (name === "discrete") return { name, time: "discrete", f: ([x, y]) => [matrix[0] * x + matrix[1] * y, matrix[2] * x + matrix[3] * y], jac: () => matrix.slice() };
    if (name === "pendulum") return { name, time: "continuous", f: ([x, y]) => [y, -9.81 * D.sin(x) - 2 * y], jac: ([x]) => [0, 1, -9.81 * D.cos(x), -2] };
    if (name === "vdp") return { name, time: "continuous", f: ([x, y]) => [y, -(x * x + 1) * y - x], jac: ([x, y]) => [0, 1, -2 * x * y - 1, -(x * x + 1)] };
    throw new Error(`Unknown flow ${name}`);
  }
  function rk4(f, x, dt = 0.02) {
    if (!(dt > 0) || !Number.isFinite(dt)) throw new Error("Step must be finite and positive");
    const add = (a, b, t) => a.map((v, i) => v + t * b[i]);
    const a = f(x), b = f(add(x, a, dt / 2)), c = f(add(x, b, dt / 2)), d = f(add(x, c, dt));
    return x.map((v, i) => v + dt * (a[i] + 2 * b[i] + 2 * c[i] + d[i]) / 6);
  }
  function trajectory(w, initial, { dt = 0.02, steps = 150 } = {}) {
    const states = [initial.slice()];
    for (let t = 0; t < steps; t++) {
      const x = w.time === "discrete" ? w.f(states[t]) : rk4(w.f, states[t], dt);
      if (!x.every(Number.isFinite) || norm(x) > 1e6) throw new Error("Flow left the numerical domain");
      states.push(x);
    }
    return states;
  }
  function initial(random, radius = 2) {
    const r = radius * Math.sqrt(random.next()), theta = 2 * Math.PI * random.next();
    return [r * D.cos(theta), r * D.sin(theta)];
  }
  const quad = (P, x) => P[0] * x[0] ** 2 + 2 * P[1] * x[0] * x[1] + P[3] * x[1] ** 2;
  // Solve a 2x2 continuous-time Lyapunov equation A'P+PA=-I; no stability is silently assumed.
  function lyapunov(A) {
    const [a, b, c, d] = A, rows = [[2 * a, 2 * c, 0, -1], [b, a + d, c, 0], [0, 2 * b, 2 * d, -1]];
    for (let k = 0; k < 3; k++) {
      let pivot = k;
      for (let i = k + 1; i < 3; i++) if (Math.abs(rows[i][k]) > Math.abs(rows[pivot][k])) pivot = i;
      [rows[k], rows[pivot]] = [rows[pivot], rows[k]];
      if (Math.abs(rows[k][k]) < 1e-12) throw new Error("Singular Lyapunov equation");
      const scale = rows[k][k]; for (let j = k; j <= 3; j++) rows[k][j] /= scale;
      for (let i = 0; i < 3; i++) if (i !== k) { const s = rows[i][k]; for (let j = k; j <= 3; j++) rows[i][j] -= s * rows[k][j]; }
    }
    return [rows[0][3], rows[1][3], rows[1][3], rows[2][3]];
  }
  // Scalar quadratic: x'Px. Metric: I + B(x)' Q B(x), B uses [1,x,y] per coordinate.
  // Q >= 0 makes the polynomial matrix >= I everywhere, independent of the sampled constraints.
  function features(x, f, metric) {
    if (!metric) return { n: 2, z: x, dz: f };
    return { n: 12, b: [1, x[0], x[1], x[0] ** 2, x[0] * x[1], x[1] ** 2],
      db: [0, f[0], f[1], 2 * x[0] * f[0], f[0] * x[1] + x[0] * f[1], 2 * x[1] * f[1]] };
  }
  function metricAt(Q, x) {
    const { b } = features(x, [0, 0], true), M = [1, 0, 0, 1], m = b.length, n = 2 * m;
    for (let u = 0; u < 2; u++) for (let v = 0; v < 2; v++) for (let i = 0; i < m; i++) for (let j = 0; j < m; j++)
      M[u * 2 + v] += b[i] * Q[(u * m + i) * n + v * m + j] * b[j];
    return M;
  }
  function constraint(w, x, direction, rate, metric) {
    const f = w.f(x), spec = features(x, f, metric), n = spec.n;
    let z, dz, base = 0;
    if (metric) {
      const J = w.jac(x), u = direction, du = [J[0] * u[0] + J[1] * u[1], J[2] * u[0] + J[3] * u[1]];
      z = u.flatMap((v) => spec.b.map((b) => v * b));
      dz = u.flatMap((v, k) => spec.b.map((b, i) => du[k] * b + v * spec.db[i]));
      base = 2 * dot(u, du) + 2 * rate * dot(u, u);
    } else { z = x; dz = f; }
    const a = zeros(n * n);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      a[i * n + j] = w.time === "discrete" && !metric ? f[i] * f[j] - (1 - 2 * rate) * x[i] * x[j]
        : dz[i] * z[j] + z[i] * dz[j] + 2 * rate * z[i] * z[j];
    }
    return { a, b: -base, norm2: dot(a, a) };
  }
  function residualMatrix(w, Q, x, rate) {
    const c0 = constraint(w, x, [1, 0], rate, true), c1 = constraint(w, x, [0, 1], rate, true), cs = constraint(w, x, [1, 1], rate, true);
    const a = dot(c0.a, Q) - c0.b, d = dot(c1.a, Q) - c1.b, b = (dot(cs.a, Q) - cs.b - a - d) / 2;
    return [a, b, b, d];
  }
  function residual(w, Q, x, rate = 0.1, metric = false) {
    if (!metric) { const c = constraint(w, x, null, rate, false); return dot(c.a, Q); }
    const [a, b, , d] = residualMatrix(w, Q, x, rate);
    return (a + d + Math.sqrt((a - d) ** 2 + 4 * b * b)) / 2;
  }
  function fit(w, trajectories, { metric = false, rate = 0.1, iterations = 250, tolerance = 1e-5 } = {}) {
    if (metric && w.time === "discrete") throw new Error("Polynomial metrics currently use continuous time");
    const n = metric ? 12 : 2, constraints = [], points = [];
    for (const states of trajectories) for (let t = 0; t < states.length; t += 10) {
      const x = states[t];
      points.push(x);
      if (metric) for (const u of [[1, 0], [0, 1], [Math.SQRT1_2, Math.SQRT1_2], [Math.SQRT1_2, -Math.SQRT1_2]]) constraints.push(constraint(w, x, u, rate, true));
      else if (norm(x) > 1e-8) constraints.push(constraint(w, x, null, rate, false));
    }
    if (!constraints.length) throw new Error("No nonzero training states");
    // Dykstra projections find the nearest feasible matrix to I (quadratic) or zero (Gram metric).
    // Each halfspace's correction is a scalar times its normal; the cone keeps one matrix correction.
    let Q = metric ? zeros(n * n) : eye(n), cone = zeros(n * n), corrections = zeros(constraints.length), used = 0;
    for (; used < iterations; used++) {
      for (let k = 0; k < constraints.length; k++) {
        const c = constraints[k], y = Q.map((v, i) => v + corrections[k] * c.a[i]);
        const shift = c.norm2 > 1e-24 ? Math.max(0, (dot(c.a, y) - c.b) / c.norm2) : 0;
        Q = y.map((v, i) => v - shift * c.a[i]); corrections[k] = shift;
      }
      const y = Q.map((v, i) => v + cone[i]), next = psd(y, n, metric ? 0 : 1);
      cone = y.map((v, i) => v - next[i]); Q = next;
      const affineOK = Math.max(...constraints.map((c) => dot(c.a, Q) - c.b)) <= tolerance;
      let matrixOK = true;
      if (metric && (used % 10 === 0 || affineOK)) for (const x of points) {
        const e = eigen(residualMatrix(w, Q, x, rate), 2), k = e.values[0] > e.values[1] ? 0 : 1;
        if (e.values[k] > tolerance) {
          constraints.push(constraint(w, x, [e.vectors[k], e.vectors[2 + k]], rate, true));
          corrections.push(0); matrixOK = false;
        }
      }
      if (affineOK && matrixOK) { used++; break; }
    }
    const maxResidual = Math.max(...constraints.map((c) => dot(c.a, Q) - c.b));
    // Directional constraints approximate an LMI; evaluate the full sampled matrix before reporting feasibility.
    const matrixResidual = metric ? Math.max(...trajectories.flatMap((states) => states.filter((_, i) => i % 10 === 0).map((x) => residual(w, Q, x, rate, true)))) : maxResidual;
    return { Q, n, metric, rate, iterations: used, maxResidual: Math.max(maxResidual, matrixResidual), feasible: Math.max(maxResidual, matrixResidual) <= tolerance, constraints: constraints.length };
  }
  function experiment({ name = "linear", matrix, seed = 1, samples = 8, metric = false, rate = 0.1, holdout = 100, iterations = 250 } = {}) {
    if (!Number.isInteger(samples) || samples < 1 || samples > 128 || !Number.isInteger(holdout) || holdout < 1 || holdout > 10000 || !(rate >= 0 && rate < .5)) throw new Error("Invalid flow experiment settings");
    const w = world(name, matrix), random = rng(seed), train = Array.from({ length: samples }, () => trajectory(w, initial(random)));
    const learned = fit(w, train, { metric, rate: rate + 0.05, iterations });
    // Separate stream, fixed across n so sweeps use the same holdout population sample.
    const test = rng((seed + 0x9e3779b9) >>> 0);
    let bad = 0;
    for (let k = 0; k < holdout; k++) {
      const states = trajectory(w, initial(test));
      if (states.some((x) => residual(w, learned.Q, x, rate, metric) > 1e-5)) bad++;
    }
    return { ...learned, trainingRate: rate + 0.05, rate, seed, samples, train, violation: bad / holdout, bad, holdout };
  }
  RL.flows = { world, rk4, trajectory, initial, eigen, psd, lyapunov, quad, metricAt, constraint, residual, fit, experiment };
})(globalThis.RL = globalThis.RL || {});
