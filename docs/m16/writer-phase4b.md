# M16 Phase 4B writer report (complexity slice)

Assignment P4-WB, writer identity `writer-P4B` (Claude Code subagent), 2026-10-20. Input revision `4aea067`; route contract v1 (Part 17 records, audience/notation, pilot closure), accepted pilot `rademacher-complexity.md` at `a95c06b5…`, accepted `boffi-thm-4-2.md`, `pilot-review.md`, `math-review.md` (L3-1), `beginner-review.md` (#15, N6) and `math-phase2-3.md` (M23-2) were read before drafting. This is an authoring report, not an independent acceptance review. No commit, publication or nested agent.

## Delivered draft

Every owned Textbook now develops its argument separately from a concise Card. Station IDs, TOML front matter (summary, prereqs, time, sources, `review = "located"`) and the existing anchors (`statement`, `reasoning`, `assumptions`, `uses` in both views; `idea`, `intuition` in Cards) are unchanged. New Textbook anchors were added only inside each file. `covering-dudley` is mainline for Theorem 4.2; the other four remain optional structured/kernel branches and say so.

| Station | Developed argument | Computed worked case | Failure / non-example | Solved questions |
| --- | --- | --- | --- | --- |
| covering-dudley | Recalls value set, $S_\sigma$, conventions. Proves the normalized Cauchy–Schwarz bound and shift invariance; Massart's lemma in full (exponential, Jensen for log, independence, $\cosh x\le e^{x^2/2}$ by series comparison, choice of $\lambda$; absolute version via $A\cup(-A)$, i.e. $N\to2N$). Defines covers with explicit distances (empirical $L_2$, sup, parameter) and external centers; interval and diagonal counts; parameter-cover transfer; one-scale bound $\epsilon+(D+\epsilon)\sqrt{2\log N/n}$. Full chaining proof (UML Lemma 27.4 normalized): halving scales, $\sigma$-dependent chain, fixed link sets, Massart per level, sum $\to$ integral with constant 12, truncation at radius. Absolute/worst-case: Lemma "From signed to absolute" ($\le\lVert a_0\rVert_n/\sqrt n+2\widehat{\mathfrak R}$), sup-norm covers, worst-case bound with constant 24; reproduces Boffi (B.1) under the zero-residual hypothesis, else $+B_h/\sqrt n$. | Massart on toy endpoints (0.833 vs exact 1/2); diagonal class at $n=16,100,10^4$: exact, one-scale, chaining $12J/\sqrt n$ with $J\approx0.658$; finite-$M$ chain at $n=100$; parameter ball $12I\,LB\sqrt{k/n}$, $I\approx1.3526$. | Singleton under absolute values; divergent integral without truncation; memorizing class ($\log N(1/4)\ge0.13n$); value-only covers. | 4 |
| rademacher-properties | Signed rules (monotone, translation, scaling $|c|$, sums, convex hull) with proofs; absolute counterparts; shift cost $\lVert b\rVert_n/\sqrt n$; zero-member factor 2. Full coordinate-replacement proof of UML Lemma 26.9 for the signed convention with general $L$ (Lipschitz needed only on the value range), offsets free. Absolute convention: failure with offset, derived $2L$ version when $\ell_i(0)=0$ and $0\in A$; Ledoux–Talagrand cited as invoked by Boffi. Vector-valued composition: why the scalar proof fails; Maurer (2016) invoked with source, $\sqrt2$, not checked. Symmetrization recalled with a precise pointer to the pilot proof (ghost sample developed there, not duplicated); McDiarmid bounded-difference derivation of UML Thm 26.5 part 1; data-dependent version (constant 3 from this argument; UML prints 4). | Toy: $3F$, $F+(1,1)$, singleton (signed 0, absolute 1/2, $E|\sum\sigma|/n$ for $n=2,4,100$), contractions $2t$, $|t|$, $t^2$, $2t+5$ (signed 1, absolute 3.5 exactly explained by offset split), one-coordinate intermediate; confidence term 0.272. | Absolute contraction with offset; vector maps coordinatewise. | 5 |
| covering-properties | External/internal/packing definitions; theorem $N\le N^{in}\le M$, $M(2\epsilon)\le N$, $N^{in}(2\epsilon)\le N$ with proofs and integral consequence (factor 2). Subset monotonicity (external only) with counterexample. Transfer theorem (scaling/translation, Lipschitz images external/internal, products in max and Euclidean combination, norm comparison) with proofs. Volume upper and lower bounds in any norm. Operator vs Frobenius norms. Joint value-gradient covers: parameter route vs product route (external pairs need not be gradients). | Interval packing at $\epsilon=0.5$; $\theta x$ on $[0,2]$ ($\le7$); square in max (4) and Euclidean (9); toy in normalized vs unnormalized norm; volume at $k=3,\epsilon=0.1$ (1000 vs 9261). | Internal subset counterexample; UML Lemma 27.2 misprint (verified counterexample); silent norm switch; data-dependent class. | 3 |
| kernels-random-features | Ridge features, kernel as feature average, PSD Gram proof (UML Lemma 16.2 interface), density-constrained class rewritten with $\beta=\alpha/\nu$; RKHS-ball containment and density recalled. Random-feature construction ($c_k=\beta(\theta_k)/K$, $\lVert c\rVert_1\le B_\alpha$, unbiased, pointwise Hoeffding); uniform approximation explained as a uniform deviation with roles exchanged; Lemma B.1 (B.5)–(B.7) recalled with structure (offset handled separately, vector contraction for gradients). Derivatives needed: explicit residual counterexample. Bounded vs unbounded frequency (Gaussian kernel via Bochner: value bound finite, gradient bound and Thm 4.4 vacuous). Independent dictionary, $1/n^2$ event, shifted margin, $\ell_1$-ball Lipschitz cover giving $\sqrt{K/n}$. Remark: offset $\gamma/4$ cost and Massart value-class bound (atlas observations, labeled). | Sinc kernel and certificate derived in closed form, MC check; random-feature sup errors for $W=1,10$, $K=10..10^4$ (median of 20 dictionaries); (B.5)/(B.7) right sides at $W=1,K=10^4$ (0.30, 2.43). | $\sin(m^2x)/m$ destroys a 0.45 margin (increase 9.74 at $m=10$); unbounded frequencies. | 4 |
| dual-sudakov | SOS class (4.3), $k=d(d+1)/2$, Thm 4.3 (4.4) recalled. Lemma: operator-norm Lipschitz bound $(B_m^2+2B_{Dm}B_m)$ with proof (also for nonsymmetric differences). Subset to the full $d^2$-dim Frobenius ball (external centers). Volume estimate; dual Sudakov recalled with exact normalization (Euclidean unit ball, standard Gaussian, natural log), Vershynin Thm 2.2 as cited; $\mathbb E\lVert G\rVert_{op}\le2\sqrt d$ recalled; why op-norm helps. Full split-integral bound $\sqrt d(\sqrt{\log(3\sqrt d)}+0.48+\tfrac{\sqrt c}2\log d)$; assembly to (B.2) with zero member $Q=0$. | Rate comparison with logs kept, $d=2..1000$; ratio minimum near $d=9$, reaches 2 at $d=73$; illustrative integrals with $c=1$; MC of $\mathbb E\lVert G\rVert_{op}$. | Sudakov alone diverges; Frobenius norm gives nothing; no numerical sample size. | 3 |

## Computations

All printed numbers were produced by `tmp/m16-phase4b-calculations.py` (git-ignored; numpy only, no scipy available; integrals by dense trapezoid on a geometric grid, step-function integral $J$ by exact series). Output saved at `tmp/m16-phase4b-calculations.out`. Key outputs: toy signed/absolute 0.5/0.5; $3F$ 1.5; $F+(1,1)$ 0.5/1.0; singleton 0/0.5; $E|\sum\sigma|/n$ = 0.5, 0.375, 0.2461, 0.0796, 0.0252 ($n=2,4,10,100,1000$); contractions $|t|$ 0.25, $t^2$ 0.25, $2t+5$ 1.0/3.5, ramp 0.25; $3w-1$ 1.5/2.0; McDiarmid term 0.2716; $n=400,\delta=.01$ term 0.1628; Massart toy 0.8326, three functions exact 0.75 bound 1.048; $J=0.658021$; $12J=7.896$; diagonal exact/one-scale/chaining: $n=16$ 0.1964/0.6867/1.9741, $n=100$ 0.0796/0.3028/0.7896, $n=10^4$ 0.00798/0.0372/0.0790; finite-$M$ chain $n=100$: 0.7498, 0.6764, 0.6595, 0.6631 ($M=5$), 0.6723 ($M=10$); $I=1.352581$, $12I=16.23$, $24I=32.46$; memorizing cube bound $(1-H(1/4))=0.1887$; packing/cover counts as printed; UML 27.2 check 2 vs 1; sinc kernel MC 0.4484 vs 0.4483; random-feature medians as printed; (B.5) 0.301, (B.7) 2.428, $B_\theta=3.297$; residual increases 9.7393 ($m=10$), 99.9914 ($m=100$); Gaussian tail $P(|w|>4)=6.33\times10^{-5}$; dual-Sudakov ratios and integrals as printed; $\mathbb E\lVert G\rVert_{op}$ MC 5.572 ($d=10$), 19.561 ($d=100$); split-integral inequality checked at $a=0.5,0.1,0.01$; crossing scale 0.05219. A random search over small sets found no case with absolute complexity of $\ell\circ A$ above $L$ times that of $A$ when $\ell(0)=0$ and $0\in A$, so the lesson does not claim the factor 2 is necessary.

## Sources consulted (edition-specific)

- Shalev-Shwartz and Ben-David, *Understanding Machine Learning* (2014), local `course/ese6180/learning.pdf` and `tmp/uml.txt`; PDF page = printed + 18 (rechecked at printed 337/338/181). Lemma 26.2 pp.326–327; Lemma 26.4 (McDiarmid) p.328; Theorem 26.5 pp.328–329; Lemmas 26.6–26.7 pp.329–330; Lemma 26.8 (Massart) pp.330–331; Lemma 26.9 (contraction) pp.331–332; Definition 27.1 and Example 27.1 p.337; Lemmas 27.2–27.3 p.338; Lemma 27.4 pp.338–339; Lemma 27.5 and Example 27.2 p.339; §27.3 p.340; §16.2 p.181; Lemma 16.2 p.186. Chapter 27 pages were read as rendered images (PDF 355–358).
- Boffi, Tu, Matni, Slotine and Sindhwani, arXiv:2008.05952v2, local `course/ese6180/boffi-v2.pdf` and `tmp/boffi-v2.txt`; formulas read from rendered pages 6–7 and 18–23: p.6 Lemma 4.1, $\mathfrak R_n$, unnumbered Dudley estimate citing [51] Wainwright; p.7 (4.1)–(4.5), Theorems 4.2–4.4; p.18 (B.1); p.19 B.1 proof, B.2 Lipschitz calculation, dual-Sudakov minimum, (B.2); pp.20–23 (B.3)–(B.8), Lemma B.1 and proof, Theorem 4.4 proof; references [25], [34], [35], [36], [50], [51].
- Not available locally, recalled only and labeled as such: Vershynin (2019) Theorem 2.2; Gordon-type bound $\mathbb E\lVert G\rVert_{op}\le2\sqrt d$; Maurer (2016) vector contraction; Ledoux–Talagrand (1991) Theorem 4.12; Rahimi–Recht (2008) and RKHS/Bochner facts; the binomial-entropy estimate. All source records stay `located`.

## Deferred arguments and destinations

- Lemma B.1 proof: in the source (Boffi App. B.3); assembly of Theorem 4.4: [[boffi-thm-4-4]] (Phase 5).
- Dual Sudakov proof: optional extension, not developed (Vershynin as cited).
- Maurer's and Ledoux–Talagrand's inequalities: invoked with sources; the atlas derives its own absolute-convention factor-2 contraction under $\ell(0)=0$, $0\in A$.
- Symmetrization: developed in the accepted pilot `rademacher-complexity` (Theorem "Symmetrization"); `rademacher-properties` recalls it and develops the McDiarmid step.

## Exact pilot edits (`rademacher-complexity.md`)

Hash before `a95c06b57e77a573fcce0562e4962582d371802d02fe0e845a2199b94fb1b0b0`, after `019d9519031f16e34b8aeebc93f88057c7e3a4260eed7e0fd7419bbeada50a8d`. Six one-line changes:

1. Line 106, \ref{sym}: same inequality, split into a two-line `aligned` display.
2. Line 150, \ref{lin-mid}: same equality and inequality, split after the equality.
3. Line 178, the $\lVert v_\sigma\rVert_2^2$ expansion: same two equalities, split after the first.
4. Line 204, \ref{rad-wc}: same definition; line break after $\sup_{f\in F}$ inside $\Bigl[\ \Bigr]$ (independent `\Bigl`/`\Bigr` delimiters).
5. Line 214: `§\ref{toy}` → `\ref{toy}` (the renderer already prints "§", so the text read "§§3").
6. Line 135: appended forward pointer "; [[rademacher-properties]] carries out that step." to the sentence about Theorem 26.5's McDiarmid proof.

None changes mathematical meaning; item 6 adds a link only. Labels, numbering and anchors are unchanged. Renewed review is needed only to confirm the layout.

## Requested shared changes (coordinator)

1. `content/16-contraction/three-contractions.md` line 66: "[[rademacher-properties]] is the related atlas station, whose fuller Phase 4 development remains pending." The full signed-convention proof of UML Lemma 26.9 is now in `rademacher-properties` §"The scalar contraction lemma" (`#reasoning`), with offsets, the absolute convention and vector maps treated separately. Reword after Phase 4 acceptance.
2. `content/18-certificates/boffi-thm-4-2.md` Step 5 (Phase 5): "We use it without proof; its development belongs to [[covering-dudley]]" and "we take its constant 24 from the source without checking it" can now point to `covering-dudley` (Massart, chaining, §"Absolute values and the worst sample"), where the constant 24 is derived under the same zero-residual hypothesis. Card step 5 likewise.
3. Repo-wide rendering issue (not in my files): `\ref` already prints its kind ("Lemma 1", "§4", "Theorem 2"), so source text "Lemma \ref{…}" renders "Lemma Lemma 1" and "§\ref{…}" renders "§§n". Instances include `boffi-thm-4-2.md` (lines 57, 106, 120, 126, 179, 180, 190, 212), `lyapunov-functions.md`, `mdp.md`, `value-error.md` and several Part 17 files owned by writer-P4A (`concentration`, `finite-classes`, `risk-erm`, `uniform-convergence`, `margin-bounds`, `trajectories-as-samples`). I removed every instance from my six files.
4. Optional `notation.toml`: covering number $N(\epsilon;T,\rho)$, empirical norm $\lVert\cdot\rVert_n$, packing $M(\epsilon)$; and the README could note the `\ref` prefix behavior.
5. No prereq, source or route edits requested. If the coordinator wants `boffi-thm-4-4` to list `rademacher-properties` (vector contraction) or `covering-dudley`, that is a metadata decision for Phase 5.

## Checks run

- `python build.py`: 140 stations, 0 warnings, every `\ref` resolved (final run after all edits).
- `node tools/m16-lesson-check.js chrome --quick --parts=17`: 24 views (12 stations × Textbook/Card, 390 px, light, answers expanded); zero badMath, pageOverflow, refs, terms, math errors, unresolved text or page errors across all views, including writer-P4A's.
- `git diff --check` on the six files: clean. Control-character scan: none.
- Not run: full desktop/dark-theme screenshots, Edge, `node --test`, guarantees browser checks (coordinator gates).

## Final raw SHA-256 (`sha256sum`)

- `content/17-learning-theory/rademacher-properties.md` `2ef9800fe5aed654a717b56c1832be293f65df724705f243dd681d9ba121c3d5`
- `content/17-learning-theory/covering-dudley.md` `95aea25ad712d2fd8c9588a79910810bd1ff9d0747587f1291ce39d7550df773`
- `content/17-learning-theory/covering-properties.md` `6ea7b91fb8c0d568e2420e2fdabbb47e87a66ffb66a24302f1e38cd5a506fac1`
- `content/17-learning-theory/kernels-random-features.md` `5bd176d275d9388cf179f5c3428070fb7ed664ff7e5b7c782b30b7bb171df3e0`
- `content/17-learning-theory/dual-sudakov.md` `34b6f2613aae7923561bca7a34a3e883de49feff283e8901eb9a3434503ede50`
- `content/17-learning-theory/rademacher-complexity.md` `019d9519031f16e34b8aeebc93f88057c7e3a4260eed7e0fd7419bbeada50a8d`

## Open issues for reviewers

- Reader tasks to attempt: Massart by hand; transfer a cover; choose the Dudley reference; reproduce the chaining Steps 0–7; compute toy scalings/offsets/contractions; one-coordinate step; confidence term; packing counts; joint covers; random-feature coefficients; residual counterexample; op-norm Lipschitz factor; split integral.
- Mathematical reviewer should recompute: chaining constants (6, 12) against UML 27.4 normalization; the absolute lemma and worst-case 24; the claim that it reproduces (B.1) only under the zero-member hypothesis; UML 27.2 misprint; the $\gamma/8$ vs $\gamma/4$ remark; the data-dependent constant 3 vs UML's 4.
- Recalled external results remain unchecked (listed above).

## Beginner review patch (B4-21 … B4-33), 2026-10-20

Input: `docs/m16/beginner-phase4.md` "Slice B" and coordinator decisions. All edits made with the Edit tool. None changes a theorem, constant or conclusion; renewed math review should confirm the B4-25 and B4-30 sentences.

| Finding | Disposition |
| --- | --- |
| B4-21 | **Fixed.** `rademacher-properties` now writes the signed set complexity $\widehat{\mathfrak R}(A)$ and the absolute one $\widehat{\mathfrak R}^{|\cdot|}(A)$ throughout (40 occurrences), with one sentence: the hat marks a fixed sample as in `covering-dudley`, and plain $\mathfrak R_n$ stays reserved for the worst-case convention. Logarithms: slice A and my other files use `\log`, so `\ln` → `\log` in `rademacher-properties` (9) and `kernels-random-features` (1), and "log is the natural logarithm" is stated once in `rademacher-properties` (it was already stated in `covering-dudley`). **Declined for the pilot** `rademacher-complexity.md`, which uses `\ln` twice and defines it locally ("$\ln$ is the natural logarithm"): it is an accepted file, and my mandate there is layout/consistency only; the coordinator may change it in integration if wanted. |
| B4-22 | **Fixed.** The shift $A=(A-a_0)+a_0$, the use of \ref{zero-member} on $A-a_0\ni0$, rule 2 and \ref{abs-shift} are now spelled out. |
| B4-23 | **Fixed.** Card `uses` lists [[covering-dudley]]. |
| B4-24 | **Fixed.** `covering-dudley` gives the three-line packing/volume argument locally and cites `covering-properties` (Theorem "Volume bounds in any norm") for the full proof; the Part 18 link remains only as a use. |
| B4-25 | **Fixed.** Added: reference $f_0=f_{\theta=0}$ in the class, $\lVert f_\theta-f_0\rVert_\infty\le LB$, so $N(\epsilon)=1$ for $\epsilon\ge LB$ and the integral stops at $u=1$. |
| B4-26 | **Fixed.** "Connection to the paper" is labeled a preview for [[boffi-thm-4-2]], states that nothing else depends on it, and glosses certificate, trajectory residual, $\lVert\cdot\rVert_{\mathcal V}$, $L_h$, $B_h$. |
| B4-27 | **Fixed.** Chaining levels are indexed by $j$ ($\epsilon_j=D2^{-j}$, $C_j$, $c_j$, $\mathcal L_j$); $k$ is now only the parameter dimension. Added a note that $T$ and $\rho$ are local names, unrelated to the Part 18 horizon and rate function. |
| B4-28 | **Fixed.** `covering-properties` #joint opens with a preview note glossing certificate, $S$, $V_\theta$, $L_g$, $L_{\nabla g}$. |
| B4-29 | **Fixed.** Features are indexed by $j$ ($\theta_j$, $c_j$, $b_j$); $k(x,y)$ is only the kernel; the parameter count is "written $k$ there" (Theorem 4.2) and "Theorem 4.2's parameter count"; one sentence says $K$ is the feature count, not Lemma 4.1's universal constant. |
| B4-30 | **Fixed.** Now "$\le-7\gamma/8$, and in particular $\le-3\gamma/4$, the value the source carries forward". |
| B4-31 | **Fixed** per coordinator decision: a one-paragraph reading note at the top of `kernels-random-features` and `dual-sudakov` names the Part 18 objects used and says they are defined in [[boffi-thm-4-2]]. No prereq change; no metadata requested (the coordinator may add a route `at` hint if desired). |
| B4-32 | **Fixed.** $B_{Dm}$ uses $\lVert\cdot\rVert_{\mathrm{op}}$. |
| B4-33 | **Fixed.** New seeded Monte Carlo in `tmp/m16-phase4b-calculations.py` (numpy `default_rng`, seed 6180 with $10^5$ draws for $d=10$; seed 6181 with $4000$ draws for $d=100$): $5.6373\pm0.0017$ and $19.5939\pm0.0058$ (one standard error). Text now prints $5.637\pm0.002$ and $19.594\pm0.006$ with draw counts. The earlier 5.57 came from only 200 draws. |

Checks after the patch: `python build.py` 140 stations, 0 warnings; `node tmp/m16-p4b-katex-scan.js` on the six files (throwOnError true): 0 errors in 2227 segments; `node tools/m16-lesson-check.js chrome --quick --parts=17` (strengthened): 24 views, no badMath, overflow, refs, terms, unknown macros, doubled labels, math errors or page errors; `git diff --check` clean.

Raw SHA-256 after the patch:

- `rademacher-properties.md` `23dbe32e3847aa8686308ee36910c721a6c2c275f1d0885a5eb255ce204605bc`
- `covering-dudley.md` `133e615338dfab38e530b9403d1c08706548a674b8818d89fe22f2548b7f5407`
- `covering-properties.md` `5a8e788e3ba547b2a75e2f897e33e042e9626ff486125583352cd0da51f83d5e`
- `kernels-random-features.md` `92f98128ffbec572682fe4bac8167264113881e0c649a2504d564e5555933057`
- `dual-sudakov.md` `e9b9b02c63b7c8158a268cf95732878c398497c71bac884771a5ef116fabd06f`
- `rademacher-complexity.md` (pilot, unchanged by this patch) `019d9519031f16e34b8aeebc93f88057c7e3a4260eed7e0fd7419bbeada50a8d`

Coordinator decisions recorded: three-contractions rewording done by coordinator; `boffi-thm-4-2` Step 5 pointer is Phase 5; doubled-label fix done repo-wide; notation entries deferred to Phase 6.

## Math review patch (M4-8, M4-10 … M4-13), 2026-10-20

Input: `docs/m16/math-phase4.md` "Slice B" (reviewer-P4M) and coordinator decisions. Edits made with the Edit tool. M4-9 (`boffi-thm-4-2` line 126) is coordinator-owned and was not touched; no Part 18 file was edited.

| Finding | Disposition |
| --- | --- |
| M4-8 | **Fixed.** `covering-dudley` #conventions, Card #assumptions and the scope bullet now qualify the (B.1) reproduction: constant 24 when the covers of the class have centers that are certificates in the class (internal covers, as the parameter transfer provides); constant 48 with arbitrary centers, via $N^{\mathrm{in}}(2\epsilon)\le N(\epsilon)$ of `covering-properties`. The lesson notes that the source does not say which covering number it means. |
| M4-10 | **Fixed.** The 2t+5 toy now says the exact 3.5 comes from the triangle-inequality step inside the proof of \ref{abs-shift}, with the exact offset term 2.5, and that the displayed bound uses $5/\sqrt2\approx3.54$ and gives about 4.54 (valid, not tight). |
| M4-11 | **Fixed.** `dual-sudakov`: the external-centers parenthesis now says external matrix centers are fine for covering $\mathcal V$, but the residual step needs $L_h$ at certificates within the class's bounds, so it uses internal centers (factor 2 in scale) or $L_h$ on an enlarged set. After (B.2): the 24 assumes in-class centers, and otherwise doubles; both factors are absorbed in $O(1)$. |
| M4-12 | **(a) Fixed, with a correction to the suggested locator.** The PDF text shows §16.2.2 starting on p. 185 (PDF 203) and Lemma 16.2 itself at the top of p. 186 (PDF 204; checked with `pdftotext`). The text now gives both locators. **(b) Fixed:** "with $W=1$", with the closed form $\tfrac12\sin(0.8)/0.8\approx0.448$. **(c) Fixed:** "cited by Boffi et al. via Rahimi and Recht (2007), their reference [35]". |
| M4-13 | **Fixed (authorized metadata).** In `covering-dudley` and `kernels-random-features`, the Boffi locators were moved out of the SSBD record into their own paper record (`kind = "paper"`, url `https://arxiv.org/abs/2008.05952v2`, `review = "located"`). Locators: `covering-dudley` "arXiv:2008.05952v2, September 2020, Appendix B, pp.18–19; p.6"; `kernels-random-features` "arXiv:2008.05952v2, September 2020, §4.2 and Theorem 4.4, p.7; Appendix B.3, pp.20–23". The SSBD records keep "2014, Chapter 27" and "2014, Chapter 16". No prerequisite changes. |

Final wording of the (B.1) reproduction claim in `covering-dudley` (bullet "With a zero-residual member"):

> If some certificate in the class has trajectory residual identically zero, take it as $f_0$. The first term of \ref{dudley-wc} vanishes, and our derivation gives (B.1) with constant $24$ when $N(\epsilon;\mathcal V,\lVert\cdot\rVert_{\mathcal V})$ counts covers whose centers are certificates in the class (internal covers, as the parameter transfer provides). The source does not say which covering number it means. With arbitrary centers, the comparison $N^{\mathrm{in}}(2\epsilon)\le N(\epsilon)$ of [[covering-properties]] doubles the scale and gives constant $48$. This is the hypothesis that [[boffi-thm-4-2]] adds explicitly. We cannot tell from the source whether the authors' constant arises the same way.

Card: "With a member that is zero everywhere and covers whose centers lie in the class, this reproduces Boffi's (B.1) with constant $24$ (arbitrary centers: $48$); otherwise add $B_h/\sqrt n$."

Checks after the patch: `python build.py` 140 stations, 0 warnings; strict KaTeX scan (`tmp/m16-p4b-katex-scan.js`, throwOnError) 0 errors on all six files; `node tools/m16-lesson-check.js chrome --quick --parts=17`: 24 views, no badMath, overflow, refs, terms, unknown macros, doubled labels, math or page errors; `git diff --check` clean.

Raw SHA-256 after the math patch:

- `rademacher-properties.md` `bd9311c56347f9e5149a2fcf77832cf0be462b7ce0f668db957a84afb002db04`
- `covering-dudley.md` `03a6f06464c70c1b7a29b9935996afe449ff6fbeb0fb05095c6c201573a43072`
- `covering-properties.md` `5a8e788e3ba547b2a75e2f897e33e042e9626ff486125583352cd0da51f83d5e` (unchanged by this patch)
- `kernels-random-features.md` `73573ea594a45b22205c2a845c7b718f07de14c19e1f8d783dadeee5995ebecb`
- `dual-sudakov.md` `17748420812b8cdcd32130e1252451864c89fc75064d3e16d382a428dc5b68c4`
- `rademacher-complexity.md` (pilot, unchanged) `019d9519031f16e34b8aeebc93f88057c7e3a4260eed7e0fd7419bbeada50a8d`

## Recheck nit, 2026-10-20

`covering-dudley`, bullet "With a zero-residual member": "This is the hypothesis that [[boffi-thm-4-2]] adds explicitly" → "The zero-residual member is the hypothesis that [[boffi-thm-4-2]] adds explicitly", so the referent no longer reads as the constant-48 sentence. No other change. Build 0 warnings; strict KaTeX scan 0 errors; `git diff --check` clean. New raw SHA-256: `covering-dudley.md` `54f20740b4f5ff12f46af735455c8bab2c8611728415ce27a5e13250fcfb8fa8`. Other files unchanged from the math-patch hashes.

## Rendering fix (layout only), 2026-10-20

`covering-dudley` #motivation: the four-item recall list contained indented display math, which the renderer does not support inside list items, so it collapsed into one paragraph with literal "- " markers. The items are now bold-led paragraphs ("**Sample and class.**", "**Value set.**", "**Signs.**", "**Signed empirical complexity.**"), and their three displays are ordinary unindented `$$` blocks. The wording is unchanged and these displays carried no `\label`. Layout only; no mathematical change.

Scan of all six owned files: no other list item is continued by a display, a `:::` block or a second paragraph, and no indented `$$` or `:::` lines remain. The lists inside `def-centers` and `thm-transfer` in `covering-properties` end at the closing `:::`; the built HTML renders them as `<ul>`/`<ol>`. The built `rl_atlas.html` contains no paragraph beginning with "- " (count 0).

Checks: build 0 warnings; strict KaTeX scan 0 errors (six files); `node tools/m16-lesson-check.js chrome --quick --parts=17` 24 views clean; `git diff --check` clean. New raw SHA-256: `covering-dudley.md` `78afb59ded9b86739f063c03a648e9f6200412096b1076d42eb49b119e63605d`. Other files unchanged.
