# M16 Phase 4A writer report (foundations)

Assignment P4-WA; author agent `writer-P4A` (Claude Code subagent). Draft checkpoint 2026-10-20 05:49 UTC. Baseline HEAD `4aea067`. This is an authoring and calculation report, not independent acceptance. Only the six owned Part 17 lessons, this report and the writer handoff were edited. No TOML front matter key, prerequisite, source entry or `review` status was changed. No shared metadata, app/tool code, PLAN.md, coordinator file or other writer's file was edited. `python build.py` regenerated `rl_atlas.html` and `app/content.js` for validation only; they were not hand-edited and remain coordinator-owned. No commit, push, publication or nested agent.

## Inputs read

- AGENTS.md, `.agents/skills/atlas-writing/SKILL.md`, `references/rewrite-workflow.md` including "Lessons from the pilot".
- `docs/m16/route-contract.md`: audience/notation, routes and pilot closure, Part 17 records for the six stations and the pilot, Part 18 records for `boffi-lemma-4-1` and `boffi-thm-4-2`.
- Accepted pilot `content/17-learning-theory/rademacher-complexity.md`, SHA-256 `a95c06b57e77a573fcce0562e4962582d371802d02fe0e845a2199b94fb1b0b0` (verified unchanged at checkpoint).
- `content/15-dynamics/dynamical-systems.md` (`157d87fd…`), `content/18-certificates/boffi-thm-4-2.md` (`04ce6e41…`), `content/16-contraction/imitation-deployment.md` (format), README authoring syntax, `app/js/flows.js` (to describe the `learning rates` demo and the Lab's holdout/grid settings accurately).

## Shared notation applied

Hypothesis $\psi\in\Psi$, loss $\ell(\psi,z)$, loss function $f_\psi$, loss class $F$, $Pf=\mathbb Ef(Z)$, $P_nf$. Risks written $Pf_\psi$, $P_nf_\psi$; $R(h)$, $\widehat R_n(h)$ and UML's $L_{\mathcal D},L_S$ are mentioned only as alternative names (risk-erm). $R$ unused except through the pilot's linear-ball bound $BR/\sqrt n$. $|\Psi|$ for class size (the contract's "H" avoided because of the trajectory maximum). $h$ only for the certificate residual; trajectory maximum $H_V(\xi)=\max_{t\in[0,T]}h(\phi_t(\xi),f(\phi_t(\xi)),V,\nabla V)$ with Boffi's $h(\xi,V)$ noted as the paper's name. $\gamma$ a fixed positive margin; $\delta$ a failure probability; $n$ independent examples/trajectories; natural logarithms. Signed empirical complexity $\widehat{\mathfrak R}_n$ and worst-case absolute $\mathfrak R_n$ as in the pilot, the latter redefined at use in margin-bounds. Fixed versus relative margin kept explicit (margin-bounds, trajectories-as-samples).

## Per-station work

### risk-erm (`6f943407…`)
Taught: i.i.d. examples (product definition), expectation/indicator refresher, hypothesis vs loss class, $Pf$/$P_nf$, ERM over a class fixed in advance, why a fixed hypothesis concentrates but ERM's does not. Worked case: two equally likely inputs, label always 1, four-function class; memorizer at $n=1$ has empirical risk 0 and risk 1/2; probability $2^{1-n}$ for general $n$ (1/512 at $n=10$); continuum memorizing class (UML eq. (2.3)) never rescued. Derived the three-term excess-risk identity, the term-by-term $2\epsilon$ bound, approximate ERM ($2\epsilon+\epsilon_{\rm opt}$, $0.11$ example). Scope: class fixed, distribution shift, measurability, approximation gap silent. Two solved questions (n=2 enumeration; numeric decomposition 0.065). Card: definitions, decomposition, example.

### concentration (`2ef9adb8…`)
Taught: Markov with proof; Chebyshev with variance-of-average derivation; Hoeffding's lemma **fully proved** (convex chord, $L(u)$ rewrite, $L(0)=L'(0)=0$, $L''\le1/4$, Taylor); Hoeffding's inequality proved (Markov on exponential, independence factorization, optimize $\lambda=4\epsilon/(b-a)^2$, two sides by union); inversion; range sensitivity; McDiarmid (equal constants) **stated and invoked** with coordinate replacement explained for averages and for the uniform deviation (sup moves by at most the largest change), recovery of Hoeffding, the sup-deviation consequence; non-example $\max_iZ_i$ ($c=1$); dependence failure (copies of one coin; one trajectory's time samples). Computations: $2e^{-8}\approx6.7\times10^{-4}$, Chebyshev $0.0625$, Markov $0.71$, exact binomial $7.85\times10^{-5}$ (ratio 8.5), $\lambda=0.8$, radius $0.136$, wrong-range $1.85$/$1.36$, two-point MGF check at $\lambda=0.5$ ($1.575\le1.649$). Two solved questions ($n=1060$; distinct-values McDiarmid $0.068$).

### finite-classes (`edc3082e…`)
Taught: union bound with proof; Theorem (finite-class uniform deviation) with proof; ERM sample size; zero-error theorem for every zero-error member with full proof ($(1-Pf)^n\le(1-\epsilon)^n\le e^{-n\epsilon}$, tangent-line inequality, union over the fixed bad set); realizability's role (ERM returns a zero-error member) versus the statement itself; extension to $[0,1]$-valued losses ($Pf\le\Pr(f>0)$); variance explanation of the two rates; discretization-trick bridge to $k/n$ (UML Remark 4.1). Worked: $|\Psi|=2$, $\delta=0.05$: $\log40/n$, $0.0369$ vs $0.148$/$0.296$ at $n=100$; $369$ vs $21{,}911$ examples for $0.01$; concrete check $0.9^{50}=0.0052\le e^{-5}=0.0067$; $k=3$ discretized $0.136$. Failure: data-built one-member class (memorizer) claims $0.03$ but has risk 1/2; several classes; independence; infinite classes. Two solved questions ($231$/$2442$/$9765$; no zero-error member).

### uniform-convergence (`8398921c…`)
Taught: pointwise vs uniform quantifier order, common event, equivalence with a bound on the uniform deviation; UML Definition 4.3 paraphrased (distribution-free $\epsilon$). Worked case: two equally likely inputs, two models each perfect on a different input, $n=2$, all four samples listed: fixed model unbiased and perfect w.p. 1/4; selected model perfect w.p. 1/2 with expected optimism 1/4; union exact (disjoint). $M$-model, $n=1$ extension: every fixed model fine w.p. $1-1/M$, selected never. Lemma (deterministic: any selection bounded by the sup) with proof; one-sided sufficiency for ERM (UML Thm 26.5 part 3); finite vs infinite classes (memorizing class fails; linear ball converges). Route: McDiarmid step (bounded differences $1/n$) and ghost-sample/symmetrization **pointed to the pilot's complete proof** (symmetrization theorem of `rademacher-complexity`, its inequality (4), UML Lemma 26.2) with an intuitive sketch; assembled bound $Pf\le P_nf+2\mathbb E\widehat{\mathfrak R}_n+\sqrt{\log(2/\delta)/(2n)}$ (UML Thm 26.5 part 1 shape) and numeric $0.143$. Rate $1/\sqrt n$; fast margin route explicitly not a consequence. Two solved questions (third model, expected gap still 1/4; pointwise-to-$\hat w$ fallacy).

### margin-bounds (`dfc967dd…`)
Taught: residual/violation/margin error/zero margin errors; certificate instance (Boffi (3.2)). Ramp loss with sandwich proof and $(1/\gamma)$-Lipschitz, mapped to UML §15.2.3. Slow route derived: uniform bound on ramp class + contraction lemma (UML Lemma 26.9, invoked) gives $\frac2\gamma\mathbb E\widehat{\mathfrak R}_n+\sqrt{\log(2/\delta)/(2n)}$ (UML Thm 26.13 structure); explained why zero errors do not speed it up (UML Remark 26.1 paraphrased). Fast route: finite-class zero-loss bound applied to ramp losses; variance mechanism ($\operatorname{Var}\le p$); illustrative algebra $p\le\sqrt{pA}+A\Rightarrow p\le2.618A$ labeled as mechanism only. **Boffi Lemma 4.1 recalled exactly** (printed factor 2, $4B_h$, $\log^3n/\gamma^2$, worst-case absolute $\mathfrak R_n$, $K$ unspecified, Assumptions 4.1–4.2, feasibility) as invoked, not proved (neither by the atlas nor by the paper, which adapts Srebro–Sridharan–Tewari Thm 5); $B_h\ge\gamma$ remark. Rate reading with honest log-factor crossing ($\approx2.4\times10^7$; ratio 2.6 at $10^6$). Scaling invariance worked ($0.04$ before/after, slow term $0.4$). `{{learning rates}}` experiment kept and described from `flows.js` ($|H|=16$, $\delta=0.05$; $31.8\%/18.0\%$ at $n=32$, $15.9\%/4.5\%$ at 128, reversal $63.5\%/72.1\%$ at 8, crossing between 8 and 12) with a predict question. Failures: one margin error, fixed vs relative margin (equilibrium residual $\rho(0)=0$; Lab's relative margin not the premise), data-chosen margin (UML Thm 26.14 grid repair), small average hinge loss. Three solved questions.

### trajectories-as-samples (`7c1ed2f8…`)
Taught: flow recall; residual as "should be $\le0$" with chain-rule reading and Boffi (3.1); definition of trajectory residual $H_V(\xi)$ and $\operatorname{err}(V)$ (Boffi (3.3), finite horizon); dictionary to risk-erm; independence of trajectories as functions of independent initial states. Worked: $20\times600$ gives $n=20$; overclaim $0.184$ vs $0.00031$ (600×); scalar coin copies. Non-examples: restarts (composition rule), segments. Holdout: $1-0.05^{1/100}=0.0295$ (vs $\log20/100=0.0300$), tied to the Lab readout and its separate stream, with relative-margin caveat. Time-grid gap: oscillating illustration (grid $-0.1$, true $0.2$; bridge $0.371$ correctly refuses); Lipschitz-in-time bridge lemma with proof; computed example $\dot x=-x$, $V=x^2$, $\rho(v)=v$, $1\le|\xi|\le2$, $T=1$: $L_t=8$, $\Delta=0.01$, bridge $0.04$, certified $-0.095$, margin $0.09$; why the fixed margin is feasible here and not near the equilibrium; Lab trains on every tenth point (0.2 s) without a bridge; integration error noted. Two solved questions ($n=8$; bridge $-0.02$, $\Delta\le0.01$).

## Sources consulted (local copies)

1. Shalev-Shwartz and Ben-David, *Understanding Machine Learning*, 2014; local `course/ese6180/learning.pdf` (SHA-256 `a31cf1fa…0bc0199`), extracted `tmp/uml.txt`. Printed→PDF offset +18 verified on PDF pp. 51 and 394. Locators used: §2.2.1 eq. (2.3) pp. 15–16; §2.3 ERM p. 16; Definition 2.1 p. 17; §2.3.1 eqs. (2.5)–(2.9), Lemma 2.2, Corollary 2.3 pp. 18–20; §3.2.2 eqs. (3.3)–(3.4) pp. 26–27; Remark 3.1 p. 27; Definition 4.1, Lemma 4.2 pp. 31–32; Definition 4.3 p. 32; eqs. (4.1)–(4.2), Lemma 4.5, Corollary 4.6, Remark 4.1 pp. 32–34; §15.2.3 ramp loss p. 174; Lemma 26.2 p. 326; Lemma 26.4 and Theorem 26.5 pp. 328–329; Lemma 26.9 pp. 331–332; Theorem 26.13 p. 334; Remark 26.1, Theorem 26.14 p. 335 (checked on PDF p. 353); Appendix B eqs. (B.3)–(B.4), Lemma B.2 pp. 372–373; Lemma B.6 p. 375; Lemma B.7 p. 376 (checked on PDF p. 394). Note UML states McDiarmid (Lemma 26.4) without proof and with an equal constant; the lesson says so.
2. Boffi, Tu, Matni, Slotine and Sindhwani, arXiv:2008.05952v2; local `course/ese6180/boffi-v2.pdf` (SHA-256 `9f3084e1…57d7`), extracted `tmp/boffi-v2.txt`. Printed page = PDF page (checked p. 6). Used: §3.1 eqs. (3.1)–(3.2) p. 4, (3.3) p. 5, exact-derivative assumption p. 4; Assumptions 4.1–4.2, $B_h,L_h$, $h(\xi,V)$ shorthand, Lemma 4.1 and its $\mathcal R_n$ definition p. 6. Confirmed the paper contains no proof of Lemma 4.1 (only applications at Theorems 4.2/4.3 and §5).
3. Srebro, Sridharan and Tewari (NeurIPS 2010), Theorem 5: **not consulted**; named only as the paper's stated origin of Lemma 4.1.

All source entries remain `review = "located"`. No private course notes were used as a public prerequisite.

## Deferred arguments and destinations

- McDiarmid's inequality: invoked from UML Lemma 26.4 (stated without proof there); proof idea sketched only. No atlas proof.
- Symmetrization: complete proof already in the accepted pilot `rademacher-complexity` (symmetrization theorem, inequality (4)); further development assigned to P4B's `rademacher-properties`.
- Contraction (Lipschitz composition) lemma: invoked from UML Lemma 26.9; assigned to `rademacher-properties`.
- Boffi Lemma 4.1 / Srebro et al. Theorem 5: invoked external result; no proof in the atlas or the paper.
- Localized/optimistic fast-rate bounds: mechanism only, explicitly labeled.

## Requested shared changes (coordinator)

None required. Optional: (a) the `margin-bounds` source entry text names UML and Boffi in one entry with a UML URL; a separate Boffi entry with its arXiv URL would be cleaner metadata. (b) If P4B's consistency edits renumber the pilot, update "its inequality (4)" in `uniform-convergence` §route (I will patch on request). (c) `uniform-convergence` and `concentration` say `rademacher-properties` develops symmetrization / the complexity side and `margin-bounds` says it treats the contraction lemma; confirm against P4B's final lesson.

## Checks actually run

- `python tmp/m16-phase4a-calculations.py` (stdlib; every printed number reproduced, including exact binomial, Fraction enumerations of the two-state and two-model examples, bridge brute force on 200 random $\xi$).
- `python tmp/m16-phase4a-filecheck.py`: 0 control characters, every `\ref` resolves locally, all original section anchors present (Textbook statement/reasoning/assumptions/uses, margin-bounds experiment; Card idea/intuition/assumptions/uses).
- `python build.py`: 140 stations, 0 warnings, no errors.
- `node tools/m16-lesson-check.js chrome --quick --parts=17`: all 12 views of the six owned stations (Textbook and Card, light, 390 px) report mathErrors 0, pageOverflow false, badMath 0, refs 0, terms 0, unresolvedText false. One initial badMath (Lemma 4.1 display in margin-bounds) was fixed by splitting the display. The only remaining report error is `covering-dudley` (P4B-owned).
- `git diff --check` on the six files: clean.
- Not run: full (non-quick) lesson check, dark theme/desktop screenshots, Edge, `node --test`. These are coordinator gates.

## Final raw SHA-256 (draft for review)

```
6f943407d166c08a4884104fcd7b652297f2079361916726c20dba4be6d88598  content/17-learning-theory/risk-erm.md
2ef9adb826bf423f4bf0b9baf370aab02244b67b39bc09171c92aef62de2d82f  content/17-learning-theory/concentration.md
edc3082e2eccbb72a5736d2b7e002a273f727fa725f3ab05610c98eedf1d3cd4  content/17-learning-theory/finite-classes.md
8398921cd47700e6587f30fcfff937cd819ae695925faa9e2da34ea77190e118  content/17-learning-theory/uniform-convergence.md
dfc967dda1484c9f0fa70ea653da8357175e9b230b64b21704797e05326c3971  content/17-learning-theory/margin-bounds.md
7c1ed2f89d3f24e58ba449cfe5dccf7b8246718c609b3544bc6f60ab13549501  content/17-learning-theory/trajectories-as-samples.md
```

## Beginner review patch (2026-10-20 05:59 UTC)

Source: `docs/m16/beginner-phase4.md` (reviewer-P4B), slice A at the draft hashes above. All edits made with the Edit tool. No prerequisite, route, source or status change.

| Finding | Sev. | Disposition |
| --- | --- | --- |
| B4-1 | moderate | Fixed. margin-bounds now states the fast-margin bound (`lem-boffi`, label kept, equation label `lemma41` kept) in the lesson's own objects: i.i.d. $Z_i$, a residual class $F$ fixed in advance with range bound $\lvert f\rvert\le B$, fixed $\gamma>0$, any member with zero margin errors, the worst-case absolute $\mathfrak R_n(F)$ defined locally, the printed factor 2 and $4B$, unspecified $K$. A "Provenance and status" paragraph says that Boffi et al. state it for certificate residuals, adapting it from Srebro–Sridharan–Tewari Thm 5 (not checked here), and that neither the atlas nor the paper proves it. A labelled "In the certificate chapters" list maps $Z_i\to\xi_i$, $f\to h(\xi,V)$, $F\to\mathcal V$, zero margin errors $\to$ feasibility of (3.2), $B\to B_h$ (Assumptions 4.1–4.2), linking forward to trajectories-as-samples, learning-certificates and boffi-lemma-4-1 and saying the lesson does not depend on them. The #statement certificate paragraph was replaced with an abstract-first pointer. Scaling, exercise and Card use $B$. `lem-boffi`/`lemma41` are referenced nowhere outside this file (grep). |
| B4-2 | minor | Fixed. Ramp renamed $r_\gamma$; Lipschitz constant renamed $L$. The flow $\phi_t$ no longer appears in margin-bounds. $\rho$ remains only as the decrease function in the failure bullet, now described there. |
| B4-3 | minor | Fixed. Notation note added at the dictionary ($f$ = vector field, $f_V$ = loss, $X$ = initial-state set). Grid count renamed $N$; $m$ is now only the holdout count. |
| B4-4 | minor | Fixed. The concentration notation paragraph says $Z_i$ is a real number here and a loss value in learning. |
| B4-5 | minor | Fixed. concentration defines variance, standard deviation (fair coin: $\tfrac14$, $\tfrac12$) and the product rule for independent variables. finite-classes points to that definition. margin-bounds defines variance inline, because concentration is not its declared prerequisite. |
| B4-6 | minor | Fixed. Step 2 is labelled as a sketch. It defines exchangeable and $\mathbb E_Z$/$\mathbb E_\sigma$, and names the sup-of-average step. |
| B4-7 | minor | Fixed. Retitled "Selection makes unbiased models look perfect". The $M=10$ pointwise claim now states $\epsilon\in[0.1,0.9)$ with the reason (checked in the script). |
| B4-8 | minor | Fixed. "the memorizer of that sample from the uniform-interval example of risk-erm". |
| B4-9 | minor | Fixed. The premise that the finer grid's residuals are still at most $-0.05$ is in the question, with the reason it must be rechecked. |
| B4-10 | minor | Fixed. The opening now gives $(\log n)^3\mathfrak R_n^2/\gamma^2$, which is $(\log n)^3/(\gamma^2n)$ when the complexity is order $1/\sqrt n$. |
| B4-11 | minor | Fixed. "only ratios of the margin to the class's complexity and range bound matter". |
| B4-12 | minor | Fixed. The parenthetical distinguishes Lipschitz-composition "contraction" from Part 16 dynamics and from Bellman contraction. |
| B4-13 | minor | Fixed. The crossing is derived: $n=2(\log320)^2/\log640\approx10.3$ (already in the script). |
| B4-14 | minor | Fixed. One sentence explains why solving $(1-q)^m=0.05$ gives the confidence limit. |
| B4-15 | minor | Fixed. "for every finite set of points, each given any label". |
| B4-16 | minor | Fixed. "a trajectory recorded at 600 times, as in the example of trajectories-as-samples". |

None declined. Numbers: no printed value changed. The new $M=10$ pointwise claim was added to `tmp/m16-phase4a-calculations.py`, which reran cleanly.

Checks rerun: `python build.py` (0 warnings); file check (0 control characters, all refs resolve); `node tools/m16-lesson-check.js chrome --quick --parts=17`: all 12 owned views clean (the report's errors are only P4B-owned `covering-dudley` and `kernels-random-features`); `git diff --check` clean.

New raw SHA-256 (all six files changed):

```
82210fc2b4a2ed7cd4eeae457654eea88c6a2aa0bc02e562d3e131f706a3d455  content/17-learning-theory/risk-erm.md
819fd8c0ce5bd6f5856697de5236504b7f532d55ed9848b0433133e22357b324  content/17-learning-theory/concentration.md
d7ca77130d5598161a42cca2d3454d26b8cd08fe46c588748498908fceecc6b9  content/17-learning-theory/finite-classes.md
ed61ac51742eb6b44fffdf0f07cedda1ef5e86f82b34d83a2645b3e3b2026fdd  content/17-learning-theory/uniform-convergence.md
a3d3b44fc26c5e191800cf17b87c6eb3bf6c09fba841fbd75c75907ab3185be3  content/17-learning-theory/margin-bounds.md
964f9b691df82094a4bb519062afb7568407ace477224404af4690d06f027551  content/17-learning-theory/trajectories-as-samples.md
```

## Second patch (2026-10-20 06:04 UTC)

Source: `docs/m16/beginner-phase4.md`, "Slice A recheck", and the coordinator's REF_TEXT note. All edits were made with the Edit tool and are mechanical; no meaning changed.

| Finding | Sev. | Disposition |
| --- | --- | --- |
| B4-17 | critical | Fixed. The two `\ler_\gamma` became `\le r_\gamma` (ramp sandwich display and Card). I scanned all six files for other fused macros with a strict KaTeX parse of every math segment (`tmp/m16-p4b-katex-scan.js`, `throwOnError: true`): 0 errors in 1,323 segments. None remain. |
| B4-18 | moderate (tooling) | Coordinator-owned. The rerun used the strengthened `m16-lesson-check.js`, which adds the `unknown` and `doubled` fields: all 12 owned views are empty on both. |
| B4-19 | minor | Fixed. Dropped the duplicate trailing link in concentration #assumptions. |
| B4-20 | minor | Declined. The time residual `r(t)` in trajectories-as-samples appears about 15 times, inside displays and proofs. Renaming it is the same kind of substitution that caused B4-17. As the reviewer noted, neither lesson uses both objects, and the subscript γ and the argument t tell them apart. Recorded as an accepted notation choice. |
| REF_TEXT doubling | — | Removed the kind word before every `\ref` to a numbered block or section. risk-erm: 2 × "Example". concentration: 2 × "Lemma". finite-classes: 6 × "Theorem". uniform-convergence: 2 × "Example", 1 × "Lemma". margin-bounds: 1 × "§". trajectories-as-samples: 1 × "Lemma". The checker's `doubled` field is empty for all owned views. |

Checks: `python build.py` reported 0 warnings. The strict KaTeX scan found 0 errors (risk-erm 192 segments, concentration 257, finite-classes 179, uniform-convergence 198, margin-bounds 282, trajectories-as-samples 215). The file check found no control characters and every ref resolves. `node tools/m16-lesson-check.js chrome --quick --parts=17` is clean on all 12 owned views: mathErrors 0, unknown 0, doubled 0, no overflow, badMath, refs or terms. Its only remaining errors are on the P4B-owned `rademacher-complexity`. `git diff --check` is clean. No number changed.

New raw SHA-256:

```
12716d0f827cbe5b52de7255b621f048494208593003554dcbc9e37b94a07389  content/17-learning-theory/risk-erm.md
d66d448788f402f09abb61424aa2f8cc6423dc16b4c6ab7c717681375bdff5ba  content/17-learning-theory/concentration.md
7c22f23842c92d06fc7bda23f9bbe49a0b6d2a07e32c642b7a610685c48ca504  content/17-learning-theory/finite-classes.md
dd55fdaedcca17b547b672018680098319b7f76537114f8fa2bb752df49be05b  content/17-learning-theory/uniform-convergence.md
81b8ed8a04d9a75656b8e33f50026becd25092cfa93c0e3122eae30b17479405  content/17-learning-theory/margin-bounds.md
e500de60b2aa17853ec3dc735b83ead989e927cfc1fe7d5e192fe5dea4c51411  content/17-learning-theory/trajectories-as-samples.md
```

## Math review patch (2026-10-20 10:46 UTC)

Source: `docs/m16/math-phase4.md` (reviewer-P4M). The review passed all six stations and left seven minor findings. All edits were made with the Edit tool. Part 18 files are untouched.

| Finding | Disposition |
| --- | --- |
| M4-1 | Fixed. The `lem-boffi` title now reads "atlas restatement of Boffi et al., Lemma 4.1, p. 6, which is stated there for certificate residuals only". The provenance paragraph says no checked source states the general-class form. The Card bullet calls it "the atlas's general-class reading … the general form is unchecked". Constants and premises are unchanged. |
| M4-2 | Fixed, under the coordinator's authorization. (a) risk-erm ERM locator is now "§2.3, eq. (2.4), pp. 16–17 / PDF pp. 34–35". (b) risk-erm front-matter locator is now "2014, Chapters 2–4". (c) finite-classes locator is now "2014, §2.3.1 and Chapter 4". (d) margin-bounds sources are split into two records: UML "2014, §15.2.3, Chapter 26" (textbook, UML URL), and Boffi et al. "arXiv:2008.05952v2, September 2020, Lemma 4.1, p.6" (paper, https://arxiv.org/abs/2008.05952v2). Both are `review = "located"`. No prerequisite changed. |
| M4-3 | Fixed. uniform-convergence "Assembled" now says the bound is re-derived for $[0,1]$ losses (range width 1, constant $1/n$). It states SSBD's $\lvert\ell\rvert\le c$ form with constant $2c/n$ and term $c\sqrt{2\log(2/\delta)/n}$, notes that this is twice ours at $c=1$ (script: ratio 2.0), and says this is why the pilot shows a different constant. Locator widened to pp. 328–329. The Card already qualifies "[0,1] losses". |
| M4-4 | Fixed. risk-erm attributes only the per-loss requirement to Remark 3.1. The supremum condition is now an explicit assumption: it holds for countable classes, or when the supremum reduces to a countable subfamily (e.g. $f_\theta(z)$ continuous in θ), and is assumed for indicator losses. uniform-convergence #route and #assumptions are rephrased the same way. |
| M4-5 | Fixed. Step 2 of the symmetrization sketch now says that the supremum of the sum splits into one supremum per sample, each with expectation equal to the expected Rademacher complexity, which gives the factor 2. |
| M4-6 | Fixed. finite-classes "Counting parameters" and #uses now say "$k/n$ … up to a $\log^3n$ factor and class constants". The Card makes no $k/n$ claim. |
| M4-7 | Fixed. The margin-bounds #failure bullet now argues at the population level: every candidate's residual is near 0 near the equilibrium, so a positive fraction of trajectories violates a fixed γ when the distribution charges a neighborhood of 0, and feasibility on all n trajectories becomes unlikely as n grows. On an unbounded horizon it fails on every trajectory. A post-hoc small γ is not a fixed margin. Card: "trajectories that come near the equilibrium … unattainable as n grows". In trajectories-as-samples (after `ex-bridge`), the scalar case is made explicit: trajectories with $\xi^2<\gamma e^2$ violate (script: $\lvert\xi\rvert<0.860$ for $\gamma=0.1$), so the all-n feasibility probability shrinks; on an unbounded horizon every trajectory fails. |

Checks: `python build.py` reported 0 warnings. The strict KaTeX scan found 0 errors (196, 257, 181, 207, 287, 219 segments). The file check found no control characters and every ref resolves. `node tools/m16-lesson-check.js chrome --quick --parts=17` is clean on all 12 owned views (unknown and doubled included), and its report lists no errors. `git diff --check` is clean. `tmp/m16-phase4a-calculations.py` was extended for M4-3 and M4-7 and reruns cleanly.

New raw SHA-256 (concentration unchanged):

```
79a0d9138bc473f74f9dbb1eff7a8901dc8b89284ca4cb00b12e5f761609b352  content/17-learning-theory/risk-erm.md
d66d448788f402f09abb61424aa2f8cc6423dc16b4c6ab7c717681375bdff5ba  content/17-learning-theory/concentration.md
2e77adc13fbcf6d54a7451ad779c0bd5a51785479c943133e1a90c3a8800724d  content/17-learning-theory/finite-classes.md
f07c4a11ab15341fdc69644f5d31f1ce4554dbb1e19059aa84f7efba515e6170  content/17-learning-theory/uniform-convergence.md
b949d90b905456eabf0780f5492df79051800b2ef324049206b9731c458e8c69  content/17-learning-theory/margin-bounds.md
b12bb7f4e37695a53594123028383f9e516ab52e0329c24f3dad18eb0f402e66  content/17-learning-theory/trajectories-as-samples.md
```

## M4-14 patch (2026-10-20 10:56 UTC)

- M4-14(a), fixed. concentration #uses now says uniform-convergence applies McDiarmid to the uniform deviation, that rademacher-properties proves that step within its high-probability bound, and that rademacher-complexity only quotes the resulting textbook theorem.
- M4-14(b), fixed. uniform-convergence #route now says rademacher-properties *recalls* the symmetrization inequality, whose proof is in the pilot rademacher-complexity (inequality (4)), and that it develops the rules for transformed classes.
- Nit, fixed. "attained along a countable subfamily" now reads "equals the supremum over a countable subfamily".
- margin-bounds' claim that rademacher-properties treats the contraction lemma was checked against the current file (its `thm-contraction`) and left unchanged.

Checks: `python build.py` reported 0 warnings. The strict KaTeX scan found 0 errors. The file check is clean. The Part 17 quick check flagged none of the 12 owned views and listed no errors. `git diff --check` is clean.

New raw SHA-256 (only these two files changed; the other four are as in the math review patch):

```
4e2a4c823042e3dea2d08370a098cacaecdd5009e9c093e97aa5a57e730a727d  content/17-learning-theory/concentration.md
e9c01b793323f348dbcdddde9981e48b43d097dce29460ee1ea2a89a6be16490  content/17-learning-theory/uniform-convergence.md
```

## B4-34 patch (2026-10-20 15:31 UTC)

- B4-34, fixed. margin-bounds #failure now reads "positive probability to every neighborhood of the equilibrium". The Card's matching clause now reads "when every neighborhood of it has positive probability of containing an initial state". This matches trajectories-as-samples.

Checks: `python build.py` reported 0 warnings. The strict KaTeX scan of margin-bounds found 0 errors in 287 segments. `git diff --check` is clean.

New raw SHA-256 (only this file changed):

```
da81acff72b9ebba962d2ae0aa8b2fcf291724c5b072d7917f87b409f31c1f26  content/17-learning-theory/margin-bounds.md
```

Final hashes of all six owned files: risk-erm `79a0d913…b352`, concentration `4e2a4c82…727d`, finite-classes `2e77adc1…724d`, uniform-convergence `e9c01b79…6490`, margin-bounds `da81acff…1f26`, trajectories-as-samples `b12bb7f4…2e66`.
