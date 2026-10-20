# P1-S statistics writer report

Writer: subagent `writer-S2` (Claude Code), role P1-S statistics pilot writer, coordinated by the main session. Not a reviewer of this slice; no self-acceptance is claimed. Contract: route-contract v1.

Current status: **accepted after independent reviews**, at raw SHA-256 `a95c06b57e77a573fcce0562e4962582d371802d02fe0e845a2199b94fb1b0b0`. B1 Recheck 3 and M1 Recheck 2 cover this version; see [pilot-review.md](pilot-review.md). The initial output hash, writer-only checks and patch history below are historical checkpoints, not pending acceptance work.

## Files and hashes

| File | Input raw SHA-256 | Output raw SHA-256 |
| --- | --- | --- |
| `content/17-learning-theory/rademacher-complexity.md` | `f02f29ae6c467ed16809936ab1580569db9bc59bd1e538c2ca1b39ea16dcb1e8` | `1f52aee078da43f29b37a9a5c0db6e1ebc0d31afd32921bac8fb72873c397050` |

The file is LF-only UTF-8, so the raw and Python text-normalized hashes coincide for the output. Read-only inputs consulted at: `risk-erm.md` raw `518350eb98fc42e3cf5056ec903a3d707ab3804a65c382b6ad47ba1d745f2795`, `uniform-convergence.md` raw `ab17238854164dee9659d235cdeb7aaa029d89042c82a9926cec97ac55528dcb`. Also read: `concentration.md`, `covering-dudley.md`, `rademacher-properties.md`, `18-certificates/boffi-lemma-4-1.md`, `app/js/flows.js` (learning demo, lines 128–143), `app/js/math.js`, `lab/core.js`, `build.py` parser, `content/map.toml` (station kind: concept, so the Card requires `idea`).

## What the lesson now contains

Front matter preserved (ID, prereqs, time, source with `review = "located"`); summary lightly rewritten. Textbook sections, in order: `motivation` (new), `statement`, `toy` (new), `symmetrization` (new), `reasoning`, `assumptions`, `experiment`, `exercises` (new), `uses`. All five contract anchors kept. Native blocks: 2 definitions, 2 theorems with full proofs, 1 example, 1 remark, 1 figure wrapping `{{learning signs}}`, 7 Textbook questions (1 prediction prompt plus 6 exercises), 7 numbered equations. Card sections: `idea`, `toy`, `linear`, `conventions`, `pitfalls`, `check` (3 questions), `uses`; Card uses no Textbook paragraphs verbatim. Required links `[[covering-dudley]]`, `[[rademacher-properties]]`, `[[boffi-lemma-4-1]]` kept in both views.

## Concepts

Consumed (recalled locally, not merely linked): independent sample $Z_{1:n}$ (n counts independent draws; trajectories link), loss class from hypothesis class, $Pf$ and $P_nf$ (tied to $R(h)$, $\widehat R_n(h)$ of risk-erm), uniform deviation, ERM $2\epsilon$ decomposition (shown in one line), Hoeffding/McDiarmid by name and link only.

Introduced: supremum vs maximum; Rademacher signs; signed empirical complexity $\widehat{\mathfrak R}_n(F;Z_{1:n})$; expected version written out as $\mathbb E_Z\widehat{\mathfrak R}_n$ (no new symbol); absolute variant $\widehat{\mathfrak R}^{|\cdot|}_n$; worst-case absolute $\mathfrak R_n$ (plain symbol reserved for the Boffi convention, consistent with `boffi-lemma-4-1` and `covering-dudley`); symmetric class; linear ball $F_B$ with $B,R$; ghost sample.

## Claims: derived, recalled, deferred

Derived in the lesson (full consequential steps):
- Order-of-operations remark: $\sup_f\mathbb E_\sigma[\cdot]=0$ for every class.
- Memorizing class: complexity $1/2$ for every $n$ on distinct points.
- Two-point toy, richer square, singleton (signed and absolute).
- Symmetrization $\mathbb E\sup_f(Pf-P_nf)\le2\mathbb E_Z\widehat{\mathfrak R}_n(F)$: four-step ghost-sample proof (I chose to derive it, citing UML Lemma 26.2 for provenance). Corollaries for $-F$ and for absolute values are stated with a one-line justification.
- Linear-ball theorem, including the exact identity $\widehat{\mathfrak R}_n=\frac Bn\mathbb E\lVert\sum\sigma_iz_i\rVert$ (Cauchy–Schwarz plus equality case), the Jensen step proved via nonnegative variance, cross-term cancellation, radius step; tightness for orthonormal points.
- Convention ordering (a) ≤ (a′) ≤ (c), (b) ≤ (c); signed = absolute for symmetric classes; hence $\mathfrak R_n(F_B)\le BR/\sqrt n$ over the radius-R ball.
- Demo: the 17-weight grid maximum equals the interval maximum draw by draw (linearity in w, endpoints ±1 in the grid).

Recalled with locator, not reproved: UML Theorem 26.5(1) high-probability bound (proof via McDiarmid). Boffi Lemma 4.1 is named only as consuming convention (c); its proof is explicitly not claimed.

Deferred: Lipschitz composition from linear class to loss classes ([[rademacher-properties]]); measurability of suprema for general classes (assumed, stated). The CLT heuristic for the demo's ratio (about 0.46) was computed but deliberately not put in the lesson; the lesson explains the gap qualitatively ($\mathbb Ex^2=1/3$ and the Jensen loss).

## Source locators (consulted locally)

- Shalev-Shwartz and Ben-David, *Understanding Machine Learning*, 2014, local `course/ese6180/learning.pdf`. PDF page = printed page + 18 (checked: printed 352 at PDF 370). Chapter 26 opens at printed p. 325 (PDF 343). Definition (26.4) and Lemma 26.2 (symmetrization; one-sided representativeness, no absolute value): printed p. 326, proof pp. 326–327. Theorem 26.5: printed p. 328 (proof p. 329). §26.2 and Lemma 26.10 (linear class, $\lVert w\rVert_2\le1$, bound $\max_i\lVert x_i\rVert_2/\sqrt m$; Cauchy–Schwarz, Jensen, independence): printed p. 332, continuing to p. 333. UML writes $m$ for sample size; the lesson uses $n$.
- Boffi, Tu, Matni, Slotine, Sindhwani, *Learning Stability Certificates from Data*, arXiv:2008.05952v2, p. 6, inside the statement of Lemma 4.1 (corrected per M1 L2-1): $R_n(\mathcal V):=\sup_{\xi_1..\xi_n\in X}\mathbb E_{\varepsilon}\sup_{V}\frac1n|\sum\varepsilon_ih(\xi_i,V)|$. Checked in `course/ese6180/boffi-v2.pdf` (pdftotext page 6) and `tmp/m16-source-pages.txt`.
- No private payload copied; prose is original. Source metadata unchanged (`located`).

## Computations (scratch dir `C:\Users\chesi\AppData\Local\Temp\claude\C--C-rl-atlas\40ac566d-4011-4145-8e00-f14ff8c6b81f\scratchpad\p1s\`)

1. `PYTHONIOENCODING=utf-8 python toys.py` (exact Fractions, sup over a 129-point grid of [−1,1] containing the endpoints):
   - toy (w,w): sups 1,0,0,1, avg 1/2; absolute avg 1/2.
   - square: sups 1,1,1,1, avg 1. Singleton (1,1): signed sups 1,0,0,−1 avg 0; absolute 1,0,0,1 avg 1/2.
   - sup_w E_σ = 0.
   - (w,…,w): n=1: 1; n=2: 1/2; n=3: 1/2; n=4: 3/8 (vs 1/√n = 1, .7071, .5774, .5).
   - two-function class {(1,1),(1,−1)}: signed sups 1,1,0,0 avg 1/2; absolute 1,1,1,1 avg 1.
   - Jensen: orthogonal e1,e2 exact .7071 = bound .7071; equal points exact .5 vs bound .7071.
   - n with 2·3/√n ≤ 0.1: 3600. (CLT heuristic √(2/π)·√(1/3) = .4607, not used in lesson.)
2. `node demo.js`: reruns the demo's exact loop from `app/js/flows.js` with `RL.lab.rng` loaded by `require('C:/C/rl_atlas/lab/node')`:

   | n | readout | exact E\|Σσx\|/n same sample | √Σx²/n | 1/√n |
   | --- | --- | --- | --- | --- |
   | 4 | 0.3420 | 0.3508 (exact) | 0.4175 | 0.5000 |
   | 8 | 0.1701 | 0.1795 (exact) | 0.2202 | 0.3536 |
   | 16 | 0.1073 | 0.1099 (exact) | 0.1362 | 0.2500 |
   | 32 | 0.0832 | 0.0799 (2e5-draw MC, seed 12345; not printed in lesson) | 0.0995 | 0.1768 |
   | 64 | 0.0578 | 0.0581 (MC, not printed) | 0.0725 | 0.1250 |
   | 128 | 0.0439 | 0.0419 (MC, not printed) | 0.0525 | 0.0884 |

   Grid max vs |S| at n=32 over all 400 draws: max difference 0. n=4 sample: −0.9766, −0.8761, 0.9538, 0.3981.
3. `node se.js`: Monte Carlo standard errors (sd/√400): .0110, .0061, .0038, .0030, .0022, .0016 for n = 4…128 (lesson rounds to 3 decimals).

Every number printed in the lesson comes from these runs or from exact hand-checkable enumeration.

## Checks run

- `python build.py` (from `C:\C\rl_atlas`): `140 stations, 140 written … 0 warning(s)`, no errors; wrote `rl_atlas.html` and `app/content.js` (generated files owned by the coordinator; rebuild expected).
- `node katexcheck.js vendor/katex/katex.min.js` over every `$…$`/`$$…$$` in the file with `throwOnError:true`: 448 segments, 0 errors.
- Grep of `app/content.js` confirms `\ref` targets resolved (§6, Example 1, (5), (7)).
- Not run: `node --test`, browser/guarantees checks, rendered visual inspection (assigned to coordinator).

## Known weaknesses / open items for reviewers

- Length: ~4,900 words in the file; Textbook is long for one station. Reviewers may judge whether `symmetrization` should move partly to `rademacher-properties` later (contract had marked full symmetrization as deferred to properties; I derived it here because the objective requires the reason the quantity matters).
- Letter collision: $R$ is the data-norm radius (contract) while risk-erm writes risk as $R(h)$; the lesson writes $Pf$ and mentions $R(h)$ once. Also $\widehat R_n(h)$ (empirical risk) vs $\widehat{\mathfrak R}_n$ (complexity) differ only by font.
- $\epsilon$ in the ERM recall is the uniform-deviation tolerance (plain `\epsilon`; no RL macros used). Boffi's signs $\varepsilon$ are mentioned only in prose.
- The demo varies the sample with n (prefix of one stream), so readouts across n are not on a common sample; explained in the lesson.
- Theorem 26.5 is recalled, not proved; McDiarmid's bounded-difference constant is not discussed.

## Requested shared changes (coordinator)

1. `content/notation.toml`: add entries for $\widehat{\mathfrak R}_n(F;Z_{1:n})$ (signed empirical), $\widehat{\mathfrak R}^{|\cdot|}_n$, and $\mathfrak R_n$ (worst-case absolute, Boffi), $\sigma_i$ (Rademacher signs), $B,R$ (norm bounds), $Pf,P_nf$.
2. `app/js/flows.js` learning demo: the SVG `aria-label` says "the selected linear predictor" but no predictor is drawn; either draw the selected sign of w or change the label to "Random signs on the pinned sample". Optional: show n's Monte Carlo standard error in the readout. No engine change is required for the lesson.
3. Rollout (risk-erm / uniform-convergence): their Textbooks still use $R(h)$ and $\sup_h$ in compressed form; when rewritten, adopt $Pf/P_nf$ or note the R collision.

## Patch for B1

Review: `docs/m16/beginner-review.md` (B1, reviewed hash `1f52aee0…`). Input raw SHA-256 `1f52aee078da43f29b37a9a5c0db6e1ebc0d31afd32921bac8fb72873c397050`; output raw SHA-256 `8c81cea6ec772f44d272a8642a2293f87fe3daadca23331f9190e7b3a10d9014` (LF-only).

| Finding | Disposition | Change |
| --- | --- | --- |
| #1 (moderate, L2 part) R both risk and radius; h hypothesis vs Part 18 residual; ln/log | Patched | `#motivation`: hypotheses are now $g\in G$ with loss class $f_g(z)=\ell(g,z)$, plus a one-line note that risk-erm writes $h$ and Part 18 reserves $h$ for the certificate residual. Risk is written only as $Pf_g$, $P_nf_g$; one sentence says risk-erm writes $R(h)$, $\widehat R_n(h)$ and that here $R$ is the data-length bound. The lesson's only logarithm (Theorem 26.5) is $\ln$, now declared "the natural logarithm". No other $R(h)$ or $h$-as-hypothesis remains. |
| #22 (minor) McDiarmid wording | Patched | "We recall only Theorem 26.5's statement. Its proof applies McDiarmid's inequality, which is stated in [[concentration]], to the uniform deviation." |
| #23 (minor) absolute-value bullet | Patched | Bullet now names $|\mathbb E X|\le\mathbb E|X|$ (Step 2) and the triangle inequality $|a_f+b_f|\le|a_f|+|b_f|$ before the suprema (Step 4). |
| #24 (record only) | No change | Table numbers are those in the Computations section above (`demo.js`, `se.js`); for the numerical reviewer. |

Checks rerun after patch: `python build.py` 0 errors / 0 warnings; KaTeX strict check 458 segments, 0 errors. Not run: `node --test`, browser checks.

Remaining cross-lesson notation request (coordinator): `risk-erm` and `uniform-convergence` still use $h$ and $R(h)$; adopt the same disambiguation when they are rewritten, and record in notation.toml that $R$ in Part 17 is a data-norm radius.

## Patch for M1

Reviews: `docs/m16/math-review.md` (M1, reviewed `8c81cea6…`: 0 critical, 0 moderate, 2 minor for this lesson), beginner recheck N3, and the coordinator's mobile-layout gate. Input raw SHA-256 `8c81cea6ec772f44d272a8642a2293f87fe3daadca23331f9190e7b3a10d9014`; output raw SHA-256 `a95c06b57e77a573fcce0562e4962582d371802d02fe0e845a2199b94fb1b0b0` (LF-only).

| Finding | Disposition | Change |
| --- | --- | --- |
| M1 L2-1 (minor) Boffi locator | Patched | `#assumptions`: the convention is "defined inside the statement of their Lemma 4.1" (p. 6). Source-locator line above corrected too. |
| M1 L2-2 (minor) SE precision; "near half" scope | Patched | Standard errors now printed to two significant figures (0.011, 0.0061, 0.0038, 0.0030, 0.0022, 0.0016, from `se.js`). Prediction answer now says "For $n\ge8$ the readout stays near half the radius bound (at $n=4$ it is $0.68$ of it)"; ratio 0.3420/0.5 = 0.684. |
| Beginner recheck N3 (minor) g collides with Part 18 parametrization / Part 15 map | Patched | Hypotheses are now $\psi\in\Psi$, loss $f_\psi(z)=\ell(\psi,z)$, risks $Pf_\psi$, $P_nf_\psi$. The note says the certificate chapters use $h$ for a residual and $g$ for a parametrization. The dummy member in symmetrization Step 2 renamed from $g$ to $\tilde f$. $\psi$/$\Psi$ do not occur in the other pilot lessons or Part 17 (grep count 0). |
| Mobile math overflow at 390 px (blocking product gate) | Patched | Symmetrization Step 3: introduced $d_i(f)=f(Z'_i)-f(Z_i)$ so the display is one short line; Step 4 display split into a three-line `aligned`. Conventions table replaced by a four-item list (content unchanged). Experiment table split into two four-column tables with word headers ("std. error", "exact"; "sample bound", "radius bound"), the bound formulas moved into the preceding sentence. Numbers unchanged. |

Checks rerun: `python build.py` 0 errors, 0 warnings; KaTeX strict check 466 segments, 0 errors; coordinator's `overflow.js` at 390 px: `rademacher-complexity textbook {"page":false,"err":0,"math":[]}` and card `math:[]`. Not run: `node --test`, full Chrome/Edge guarantees check.

Process note: one intermediate patch script lost backslashes in a shell heredoc (`\frac`, `\ref`, `\` line breaks). All instances were found by the KaTeX check, the overflow check and line inspection, and repaired; the final file has no control characters and every `\ref` resolves in the build.
