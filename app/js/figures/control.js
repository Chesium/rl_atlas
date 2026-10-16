/* Figures of Part 12, exploration and regularization: exploration noise of four colors driving continuous Mountain
   Car with no policy at all, one episode each, and how often each reaches the flag over many episodes. */
(function (RL) {
  "use strict";
  const lab = RL.lab, NS = "http://www.w3.org/2000/svg";
  const T = 999, M = Math.floor(T / 2) + 1; // an episode, and the frequencies of its noise
  const COS = Float64Array.from({ length: T }, (_, m) => Math.cos((2 * Math.PI * m) / T)), SIN = Float64Array.from({ length: T }, (_, m) => Math.sin((2 * Math.PI * m) / T));

  // Colored noise as the trainer draws it (lab/deep/nn.js, after Timmer & König): a normal per frequency f, scaled by
  // f^(−β/2), back to time by an inverse Fourier transform, with a spread of 1. T is odd: no Nyquist term.
  function colored(beta, rng) {
    const s = Float64Array.from({ length: M }, (_, k) => (beta ? (Math.max(k, 1) / T) ** (-beta / 2) : 1));
    let w2 = 0;
    for (let k = 1; k < M; k++) { const w = k === M - 1 ? s[k] * (1 + (T % 2)) / 2 : s[k]; w2 += w * w; }
    const sigma = (2 * Math.sqrt(w2)) / T, re = Float64Array.from(s, (x) => x * rng.normal()), im = Float64Array.from(s, (x) => x * rng.normal());
    re[0] *= Math.SQRT2;
    const y = new Float64Array(T);
    for (let n = 0; n < T; n++) {
      let acc = re[0];
      for (let k = 1; k < M; k++) { const q = (k * n) % T; acc += 2 * (re[k] * COS[q] - im[k] * SIN[q]); }
      y[n] = acc / T / sigma;
    }
    return y;
  }
  // Ornstein–Uhlenbeck noise as Baselines and Stable-Baselines3 draw it (θ = 0.15, Δt = 0.01), from 0, settled spread 1.
  const RHO = 1 - 0.15 * 0.01, NEW = Math.sqrt(1 - RHO * RHO);
  function ou(rng) { const y = new Float64Array(T); let x = 0; for (let t = 0; t < T; t++) { x = RHO * x + NEW * rng.normal(); y[t] = x; } return y; }
  const KINDS = [
    { name: "white", draw: (r) => colored(0, r) },
    { name: "Ornstein–Uhlenbeck", draw: ou },
    { name: "pink", draw: (r) => colored(1, r) },
    { name: "red", draw: (r) => colored(2, r) },
  ];

  // Gymnasium's MountainCarContinuous-v0, driven by the noise alone: the positions, and the step it reached the flag.
  function drive(noise, sigma, x0) {
    let x = x0, v = 0;
    const xs = [x];
    for (let t = 0; t < T; t++) {
      const f = Math.max(-1, Math.min(1, sigma * noise[t]));
      v = Math.max(-0.07, Math.min(0.07, v + f * 0.0015 - 0.0025 * Math.cos(3 * x)));
      x = Math.max(-1.2, Math.min(0.6, x + v));
      if (x === -1.2 && v < 0) v = 0;
      xs.push(x);
      if (x >= 0.45 && v >= 0) return { xs, flag: t + 1 };
    }
    return { xs, flag: 0 };
  }

  RL.demos["noise-colors"] = function (host) {
    const W = 640, RH = 92, TOP = 26, L = 150, GAP = 22, PW = (W - L - GAP - 8) / 2, H = TOP + KINDS.length * RH + 62;
    const st = { sigma: 0.5, seed: 1, job: 0 };
    host.innerHTML = `<svg class="fig" viewBox="0 0 ${W} ${H}" role="img" aria-label="Four kinds of exploration noise over one episode, and the car's position under each"></svg>
      <div class="fig-buttons"><div class="seg" role="group" aria-label="The noise's spread">${[0.3, 0.5, 1].map((s) => `<button type="button" data-sigma="${s}"${s === st.sigma ? ' class="on"' : ""}>σ = ${s}</button>`).join("")}</div>
      <button class="pill" type="button" data-again="1">New episodes</button></div>
      <p class="fig-status"></p>`;
    const svg = host.querySelector("svg"), status = host.querySelector(".fig-status");
    const xN = (t) => L + (t / T) * PW, xC = (t) => L + PW + GAP + (t / T) * PW;
    const yN = (row, v) => TOP + row * RH + RH / 2 - 6 - (Math.max(-1, Math.min(1, v)) * (RH - 30)) / 2;
    const yC = (row, x) => TOP + row * RH + RH - 18 - ((x + 1.2) / 1.8) * (RH - 30);
    const path = (vals, fx, fy) => { let d = ""; for (let i = 0; i < vals.length; i += i < 50 ? 1 : 2) d += `${d ? "L" : "M"}${fx(i).toFixed(1)} ${fy(vals[i]).toFixed(1)}`; return d; };
    function draw() {
      const rng = lab.rng(st.seed);
      let g = `<text class="note" x="${L}" y="14">the noise, σ·ε (clipped to the range, ±1)</text><text class="note" x="${L + PW + GAP}" y="14">the car's position, noise only</text>`;
      KINDS.forEach((k, row) => {
        const noise = k.draw(rng), run = drive(noise, st.sigma, -0.6 + 0.2 * rng.next()), y0 = TOP + row * RH;
        const high = Math.max(...run.xs);
        g += `<text class="curve-name" x="${L - 10}" y="${y0 + RH / 2 - 4}" text-anchor="end">${k.name}</text>
          <text class="tick" x="${L - 10}" y="${y0 + RH / 2 + 14}" text-anchor="end">${run.flag ? `flag at step ${run.flag}` : `highest ${high < 0 ? "−" : ""}${Math.abs(high).toFixed(2)}`}</text>
          <line class="gridline" x1="${L}" x2="${L + PW}" y1="${yN(row, 0)}" y2="${yN(row, 0)}"/>
          <path class="curve light" style="stroke-width:1" d="${path(noise.map((v) => st.sigma * v), xN, (v) => yN(row, v))}"/>
          <line class="ref-line" x1="${L + PW + GAP}" x2="${L + 2 * PW + GAP}" y1="${yC(row, 0.45)}" y2="${yC(row, 0.45)}"/>
          <line class="gridline" x1="${L + PW + GAP}" x2="${L + 2 * PW + GAP}" y1="${yC(row, -0.52)}" y2="${yC(row, -0.52)}"/>
          <path class="curve" d="${path(run.xs, xC, (x) => yC(row, x))}"/>`;
      });
      const yb = TOP + KINDS.length * RH;
      // the reference lines' legend, under the car's panel, where no path can cross it
      const xl = L + PW + GAP, yl = yb + 26;
      g += `<line class="ref-line" x1="${xl}" x2="${xl + 18}" y1="${yl - 4}" y2="${yl - 4}"/><text class="tick" x="${xl + 24}" y="${yl}">the flag (x = 0.45)</text>
        <line class="gridline" x1="${xl}" x2="${xl + 18}" y1="${yl + 10}" y2="${yl + 10}"/><text class="tick" x="${xl + 24}" y="${yl + 14}">the valley's bottom (x = −0.52)</text>
        <text class="tick" x="${L}" y="${yb + 6}">step 0</text><text class="tick" x="${L + PW}" y="${yb + 6}" text-anchor="end">999</text>
        <text class="tick" x="${L + PW + GAP}" y="${yb + 6}">step 0</text><text class="tick" x="${L + 2 * PW + GAP}" y="${yb + 6}" text-anchor="end">999</text>`;
      svg.innerHTML = g;
      count();
    }
    // How often each kind reaches the flag over many episodes, filled in a slice at a time.
    function count() {
      const job = ++st.job, N = 200, rng = lab.rng(1000 + st.seed), hits = KINDS.map(() => 0);
      let done = 0;
      const chunk = () => {
        if (job !== st.job || !host.isConnected) return;
        const t0 = performance.now();
        while (done < N && performance.now() - t0 < 12) {
          KINDS.forEach((k, i) => { if (drive(k.draw(rng), st.sigma, -0.6 + 0.2 * rng.next()).flag) hits[i]++; });
          done++;
        }
        status.textContent = `Over ${done} episode${done > 1 ? "s" : ""} of each, the noise alone reached the flag in ${KINDS.map((k, i) => `${Math.round((100 * hits[i]) / done)}% (${k.name})`).join(", ")}${done < N ? "…" : "."}`;
        if (done < N) setTimeout(chunk, 0);
      };
      chunk();
    }
    host.querySelector(".fig-buttons").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.sigma) { st.sigma = +b.dataset.sigma; host.querySelectorAll("[data-sigma]").forEach((x) => x.classList.toggle("on", x === b)); }
      else st.seed++;
      draw();
    });
    draw();
  };
})(globalThis.RL = globalThis.RL || {});
