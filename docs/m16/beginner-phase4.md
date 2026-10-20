# M16 Phase 4 independent beginner review

Reviewer: `reviewer-P4B`, assignment P4-B (beginner reviewer, Part 17). I authored
none of the reviewed material. This is an agent perspective, not evidence from
actual beginner students, and not a source/proof audit (that is P4-M's role).

Persona: basic calculus, vectors/matrices, elementary probability (expectation,
independence, events), possibly introductory RL; no prior concentration,
uniform convergence or complexity bounds. Only declared prerequisites were used.

## Wave 1, slice A

Review date 2026-10-20 (UTC). Route order read: `risk-erm` -> `concentration` ->
`finite-classes` -> `uniform-convergence` -> `margin-bounds` ->
`trajectories-as-samples`.

### Hashes reviewed (raw SHA-256, verified with `sha256sum`; all match the packet)

| File | SHA-256 |
| --- | --- |
| `content/17-learning-theory/risk-erm.md` | `6f943407d166c08a4884104fcd7b652297f2079361916726c20dba4be6d88598` |
| `content/17-learning-theory/concentration.md` | `2ef9adb826bf423f4bf0b9baf370aab02244b67b39bc09171c92aef62de2d82f` |
| `content/17-learning-theory/finite-classes.md` | `edc3082e2eccbb72a5736d2b7e002a273f727fa725f3ab05610c98eedf1d3cd4` |
| `content/17-learning-theory/uniform-convergence.md` | `8398921cd47700e6587f30fcfff937cd819ae695925faa9e2da34ea77190e118` |
| `content/17-learning-theory/margin-bounds.md` | `dfc967dda1484c9f0fa70ea653da8357175e9b230b64b21704797e05326c3971` |
| `content/17-learning-theory/trajectories-as-samples.md` | `7c1ed2f89d3f24e58ba449cfe5dccf7b8246718c609b3544bc6f60ab13549501` |

Declared prerequisites consulted: `content/15-dynamics/dynamical-systems.md`
`157d87fd…2068` (flow, composition rule, `f` as vector field), pilot
`content/17-learning-theory/rademacher-complexity.md` `a95c06b5…b0b0` (only the
symmetrization inequality \ref{sym} = (4) and its four-step proof, as cited by
`uniform-convergence` #route). `boffi-thm-4-2.md` was not read.

### Procedure and evidence limitations

- Answers were suppressed on first pass with `tmp/m16-p4b-hide-answers.py`, which
  prints each lesson with the text between `---` and the closing `:::` of every
  `::: question` block replaced by `[ANSWER HIDDEN]` (front matter has no answer
  fields). Every exercise and reader task below was attempted before revealing the
  answers. No answer was accidentally exposed.
- The route contract's Part 17 objectives were read before the lessons. The
  writer report `docs/m16/writer-phase4a.md` was not read. The writer handoff
  `docs/handoffs/m16-phase-4/agents/writer-p4a.md` was skimmed only after all
  first-pass attempts and comparisons were recorded (to locate existing check
  output); it did not change any finding.
- Every worked number in slice A was recomputed by `tmp/m16-p4b-slice-a-numbers.py`
  (output in `tmp/m16-p4b-slice-a-numbers.log`). All agree with the lessons to the
  printed precision; no numerical error was found.
- Layout: I did not run the browser check (it writes outside my owned paths). The
  existing quick-check output `browser-check-results/m16-parts-17-chrome-quick/report.json`
  records the same six hashes and reports, for every slice-A Textbook and Card at
  390 px, `mathErrors: 0`, `pageOverflow: false`, empty `badMath`. I found no source
  display that I would expect to overflow beyond that; full visual inspection
  remains a coordinator gate.
- Card vs Textbook: all six Cards are short references (statement, proof route,
  one example, assumptions) and are distinct from the developed Textbooks.

## Per-station ledger

### risk-erm — reader task: compute empirical/population loss; derive the ERM 2ε bound

**Outcome: pass.** Reproduced the two-state example: memorizer after `X1=a` has
empirical risk 0 and risk ½. With n examples it has risk ½ exactly when all show
the same input, probability 2^(1-n) (1, 0.5, 0.00195). Derived the three-term
identity by adding and subtracting `P_n f̂` and `P_n f*`; term 1 ≤ sup, term 2 ≤ 0,
term 3 ≤ ε gives `P f̂ ≤ P f* + 2ε`; approximate ERM gives `+ε_opt` (0.11 checked).
Uniform-interval memorizing class: sup deviation exactly ½ (|Pf−P_nf| ≤ ½ since
Pf=½ and P_nf ∈ [0,1]) — consistent with the text.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Q1 n=2 samples | (a,a): ψ1 and ψ(a)=1,ψ(b)=0, memorizer risk ½; (b,b) symmetric; mixed: only ψ1, memorizer=ψ1, risk 0; probability ½ | same | yes |
| Q2 excess risk | 2(0.03)+0.005 = 0.065; one-hypothesis concentration fails for term 1 | same | yes |

Passages checked: #statement (examples/i.i.d./expectation/indicator/hypothesis/loss
class/def-risk/ERM), #memorize, #reasoning, #assumptions, #questions, Card.
Findings: B4-15 (minor).

### concentration — reader task: apply a bounded independent-data tail bound with the right range

**Outcome: pass.** Followed Markov (pointwise comparison), Chebyshev, Hoeffding's
lemma (chord, reparametrization, L'' = r(1−r) ≤ ¼ verified by differentiating
r = qe^u/(1−q+qe^u)), and the four-step Hoeffding proof including λ = 4ε/(b−a)².
Recomputed: Markov 0.714; Chebyshev 0.0625; Hoeffding 2e^-8 = 6.71e-4; exact
binomial tail 7.85e-5 (ratio 8.55); lemma check 1.575 < 1.649; radius 0.1358;
range-10 values 1.846 and 1.358; McDiarmid fluctuation 0.136. Range-matters and
non-example (max, c=1) understood.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Q1 sample size | n ≥ log200/0.005 = 1059.7 → 1060 | 1060 | yes |
| Q2 distinct-value fraction | c = 1/n; radius √(log40/800) = 0.068 | same | yes |

Passages checked: #question, #elementary, #statement (theorem, lemma and both
proofs), #reasoning, #mcdiarmid, #assumptions, #questions, Card.
Findings: B4-4, B4-5, B4-16 (minor).

### finite-classes — reader task: derive a finite uniform bound and the zero-error improvement

**Outcome: pass.** Union bound + Hoeffding gives ε = √(log(2|Ψ|/δ)/(2n)); zero-error
proof via bad set fixed by the distribution, (1−ε)^n ≤ e^{−nε}, union over bad
members. Recomputed: 0.0369, 0.148, 0.296, 369, 21,911, 0.0738, 0.9^50 = 0.0052,
e^-5 = 0.0067, 64 log 2 = 44.36, (133.1+3.0)/1000 = 0.136, log(1/δ)/n = 0.030,
agnostic n ≥ 2log(2|Ψ|/δ)/ε0². The [0,1]-valued extension (Pf ≤ Pr(f>0)) checked.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Q1 (a)(b)(c) | 231; 2442; 9765 | same | yes |
| Q2 3 errors in 100 | Thm zero says nothing; use uniform bound 0.03 + √(log(2|Ψ|/δ)/200) | same | yes |

Passages checked: #statement (recall, union bound, theorem), #reasoning,
#zero-error, #example, discretization paragraph, #assumptions, #questions, Card.
Findings: B4-8 (minor); B4-5 also touches "standard deviation" in "Why the two
rates differ".

### uniform-convergence — reader task: explain why a common event covers a data-selected model

**Outcome: pass.** Could state pointwise vs uniform quantifier order, reproduce the
two-model table (selected gap ½,0,0,½, mean ¼; fixed model unbiased) and the
M-model case, prove Lemma `lem-select` (deterministic, sample by sample), and
explain that one-sided sup suffices for ERM. Symmetrization sketch followed only
with the pilot's four-step proof of (4) open (declared and allowed); the pilot
reference resolves to the right inequality. Assembled example 0.10 + 0.043 = 0.143
recomputed.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Q1 third model ψ3 | (a,a)→ψ1 gap ½; mixed→ψ3 gap 0; (b,b)→ψ2 gap ½; mean ¼ | same | yes |
| Q2 gradient-descent ŵ | pointwise statement; ŵ data-selected; need uniform sup bound on one event, then lemma | same | yes |

Passages checked: #statement, #example, #reasoning, #route (steps 1–2, assembled,
rate), #assumptions, #questions, Card.
Findings: B4-6, B4-7 (minor).

### margin-bounds — reader task: explain why positive margin plus zero errors changes the available rate

**Outcome: pass for the stated objective; fail for reading the recalled Lemma 4.1
from the declared prerequisites (B4-1).** I could check the ramp sandwich and
Lipschitz constant, derive the slow bound from the uniform bound + contraction
statement + ramp facts, explain why zero empirical loss leaves the deviation terms
at order 1/√n, reproduce the variance ≤ p mechanism and the golden-ratio algebra
(p ≤ 2.618A), the crossover n ≈ 2.4×10^7 and ratio 2.64 at 10^6, the scaling
invariance (0.04, 0.4), and the demo values 31.8% / 18.0%. I could not interpret
the Lemma 4.1 premises (Assumptions 4.1/4.2, compact X and S, ∇V, B_h, "problem
(3.2)", "any solution") from `uniform-convergence` and `finite-classes`.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Demo prediction | slow ÷2, fast ÷4; at small n the fast bar is larger (n=4: capped 100% vs 89.9%; n=8: 72.1% vs 63.5%); crossover n ≈ 10.3 | same (crossover between 8 and 12) | yes |
| Q1 scaling c=4 | 0.0225 and 100 before and after; neither term changes | same | yes |
| Q2 10^6→10^8 | (a) 10; (b) 100·(0.75)^3 = 42.2 | same | yes |

Passages checked: #statement, #ramp, #reasoning, #fast (finite case, mechanism,
lemma, reading the rate), #scaling, #experiment, #failure, #assumptions,
#questions, Card.
Findings: B4-1 (moderate); B4-2, B4-10, B4-11, B4-12, B4-13 (minor).

### trajectories-as-samples — reader task: count independent trajectories and distinguish time-grid accuracy

**Outcome: pass.** Dictionary example = ξ, loss 1{H_V>0}, n = number of
independent initial states understood; independence of functions of independent
states explained. Recomputed: log40/20 = 0.184, log40/12000 = 0.00031;
holdout 1 − 0.05^{1/100} = 0.0295 and log20/100 = 0.0300; oscillating residual
midpoint 0.2 and bridge −0.1 + 0.15π = 0.371; scalar bridge r = −ξ²e^{−2t},
max −e^{−2} = −0.1353, L_t = 8, +0.04 → −0.095, γ = 0.09 certified;
|x(t)| ≥ e^{−1}. Lemma `lem-bridge` proof reproduced.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Q1 counting | 8 | 8 | yes |
| Q2 bridge | −0.05 + 0.03 = −0.02; Δ ≤ 0.01 for −0.035 (assuming the finer grid's residuals are still ≤ −0.05) | same, without the assumption stated | yes (B4-9) |

Passages checked: #statement (recalls, certificate condition), #reasoning
(definition, dictionary, count, ex-count, finer recording, holdout), #time-grid
(grid miss, lemma, ex-bridge, equilibrium remark, Lab note), #assumptions,
#questions, Card.
Findings: B4-3, B4-9, B4-14 (minor).

## Cross-lesson notation check

Pilot conventions held: ψ/Ψ hypotheses, f_ψ loss functions, Pf and P_nf, R only
for data-vector length (`uniform-convergence` linear example), h as certificate
residual (with H_V / Boffi's h(ξ,V) disambiguated), γ margin, δ failure
probability, n independent examples/trajectories, signed vs worst-case absolute
complexity named at each use. Collisions found are B4-2, B4-3, B4-4, B4-12.

## Findings

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- |
| B4-1 | `margin-bounds` #statement ("Boffi et al. write it $h(\xi,V)$. Zero margin errors is then their feasibility requirement (3.2)") and #fast ("Assumption 4.1 asks for a compact set $S$ … Assumption 4.2 asks for uniform bounds on $\|V\|$ and $\|\nabla V\|$ … $B_h$ bounds the size of the residual"; lemma `lem-boffi`: "problem (3.2) is feasible … Let $\widehat V_n$ be any solution") | moderate | The station's declared prerequisites are `uniform-convergence` and `finite-classes`, and in route order it precedes `trajectories-as-samples` and all of Part 18. The recalled Lemma 4.1 uses certificate V, class 𝒱, trajectory residual h(ξ,V), flow φ_t, gradient ∇V, horizon T, compact X and S, "problem (3.2)" and "solution" — none defined from the declared material, and "in the notation of [[boffi-thm-4-2]]" points downstream. B_h is described only as "bounds the size of the residual over that region". A beginner can follow the rate mechanism but cannot check which premises a situation satisfies, which is the lesson's own stated use ("recall the second exactly"). | Either (a) state the fast-rate result first in this lesson's own abstract objects (residual class F of functions of an example, i.i.d. Z_i, a bound B on \|f\|, zero margin errors, worst-case absolute complexity) and then give a short labelled mapping to Boffi's symbols, deferring Assumptions 4.1–4.2 to [[boffi-lemma-4-1]]; or (b) keep the Boffi statement but define each symbol in one line here (V certificate candidate, 𝒱 class, h(ξ,V) = trajectory residual of [[trajectories-as-samples]], (3.2) = "find V ∈ 𝒱 with h(ξ_i,V) ≤ −γ for all i", "solution" = any such V, B_h = sup of \|h\| over the class and region) and move the station after `trajectories-as-samples` in the reading order or add it as a declared prerequisite (coordinator metadata). | see Slice A recheck |
| B4-2 | `margin-bounds` #ramp ("$\phi_\gamma(u)$") vs #fast ("every trajectory point $\phi_t(\xi)$"); #reasoning ("a $\rho$-Lipschitz function … with $\rho=1/\gamma$") vs #failure ("$\nabla V(x)^{\mathsf T}\dot x+\rho(V(x))$") | minor | φ means both the ramp loss and the flow, and ρ both a Lipschitz constant and the decrease function, inside one lesson. | Rename the Lipschitz constant (e.g. L) and either rename the ramp (e.g. ramp_γ) or add a one-line disambiguation at the flow's use. | see Slice A recheck |
| B4-3 | `trajectories-as-samples` #reasoning: definition `def-traj-max` uses the vector field "$f(\phi_t(\xi))$" while the dictionary uses the loss "$f_V(\xi)=\mathbf 1\{H_V(\xi)>0\}$"; "$m$ holdout initial states" (#reasoning) vs grid "$j=0,1,\dots,m$" (#time-grid); "a set $X\subset\mathbb R^p$" of initial states vs input X in `risk-erm` | minor | This is where the Part 15 dynamics `f` meets the Part 17 loss `f_ψ`; the two appear lines apart. m has two meanings in one lesson. | Add one sentence: "Here f is the closed-loop vector field; the loss function of [[risk-erm]] is written f_V with a subscript." Rename the grid count (e.g. N). | see Slice A recheck |
| B4-4 | `concentration` #question Notation: "$Z_1,\dots,Z_n$ are independent real random variables" | minor | In `risk-erm` Z_i is an example in 𝒵 (possibly a pair or trajectory); here Z_i is a real number. The bridge is given only later (#reasoning "apply it to the loss values"). | Say at the notation paragraph that in learning the Z_i of this station are loss values f(Z_i) of the examples, or use another letter. | see Slice A recheck |
| B4-5 | `concentration` #elementary ("$\operatorname{Var}\bar Z$", "A coin toss has variance $\tfrac14$"); `finite-classes` #zero-error "Why the two rates differ" ("standard deviation"); `margin-bounds` #fast ("its variance is at most") | minor | Variance and standard deviation are outside the declared persona (expectation, independence, events) and are never defined; the product rule E[XY]=E[X]E[Y] for independent variables is used without being recalled. Chebyshev is not on the main line, but the variance argument is the stated reason for the fast rate. | Define Var Y = E(Y−EY)² and SD = √Var once in `concentration` (and show ¼ for a fair coin), and recall the product rule for independent variables there. | see Slice A recheck |
| B4-6 | `uniform-convergence` #route Step 2 ("so $\mathbb EG$ is at most the expected largest gap … Each pair $(Z_i,Z'_i)$ is exchangeable … $\mathbb E_Z$") | minor | "Exchangeable" and the subscripted expectation E_Z are undefined, and the "is at most" step (sup of an average ≤ average of sup) is unexplained here. The pilot's proof of (4) supplies all of it, so the reader can recover. | Label the paragraph as a sketch, define exchangeable in a phrase ("(Z_i,Z'_i) and (Z'_i,Z_i) have the same distribution") and E_Z/E_σ ("average over the sample / over the signs"), and name the sup–average step. | see Slice A recheck |
| B4-7 | `uniform-convergence` #example title "Selection makes an accurate pair look perfect"; "for $M=10$, the pointwise statement holds with $\delta=0.1$ for every model" | minor | Both models have risk ½, so "accurate" misleads (they are unbiased, not accurate). The M-model pointwise claim omits ε (it holds for ε ∈ [0.1, 0.9)). | Retitle (e.g. "Selection makes unbiased models look perfect"); state the ε. | see Slice A recheck |
| B4-8 | `finite-classes` #assumptions ("puts the single memorizer of [[risk-erm]] into a one-member class … the memorizer has risk $\tfrac12$ on every sample") | minor | `risk-erm` has two memorizers; in the two-state example the memorizer has risk 0 on mixed samples, so "every sample" is true only for the uniform-interval class. | Say "the memorizer of the uniform-interval example of [[risk-erm]]". | see Slice A recheck |
| B4-9 | `trajectories-as-samples` #questions Q2 ("What spacing would certify … $-0.035$?") and its answer ("$\Delta\le0.01$") | minor | The answer silently assumes the grid residuals at the new spacing are still ≤ −0.05; a finer grid can only raise the grid maximum, so this is an extra premise. | Add "assuming the grid residuals at the finer spacing are still at most −0.05" to the question or answer. | see Slice A recheck |
| B4-10 | `margin-bounds` #statement ("a sharper theorem gives order $(\log n)^3/(\gamma^2n)$, times a squared complexity") | minor | Reads as double counting: the 1/n already comes from the squared complexity being of order 1/n. | "gives order (log n)³ 𝔯_n²/γ² (𝔯_n the worst-case absolute complexity), which is (log n)³/(γ² n) when the complexity is of order 1/√n." | see Slice A recheck |
| B4-11 | `margin-bounds` #scaling ("Only the ratio of margin to complexity matters.") | minor | The same paragraph shows B_h/γ also enters; the sentence understates the invariance. | "Only ratios of the margin to the class's scale (complexity and B_h) matter." | see Slice A recheck |
| B4-12 | `margin-bounds` #reasoning ("The **contraction lemma** of Shalev-Shwartz and Ben-David") | minor | SKILL requires distinguishing the meanings of "contraction"; a reader coming from Part 16 meets a fourth, unrelated meaning without a warning. | Add "(composition with a Lipschitz function; unrelated to contraction of dynamics in Part 16)". | see Slice A recheck |
| B4-13 | `margin-bounds` #experiment question answer ("because $\log320\approx5.77$ is larger than the constant in the square-root bound") | minor | The explanation is vague; the reader cannot reproduce the crossover from it. | Compare log320/n with √(log640/(2n)) directly; crossover n = 2(log320)²/log640 ≈ 10.3. | see Slice A recheck |
| B4-14 | `trajectories-as-samples` #reasoning Holdout ("Setting $(1-q)^m=0.05$ gives the one-sided $95\%$ upper limit") | minor | Why solving this equation yields a confidence limit is not stated; the beginner must reconstruct the zero-error argument. | One sentence: "if the violation probability exceeded this q, seeing no violation in m independent tries would have probability below 0.05." | see Slice A recheck |
| B4-15 | `risk-erm` #memorize ("for every finite set of labelled points, the rule that repeats those labels") | minor | It is unclear whether the labels are the true labels or arbitrary; the risk-½ claim holds either way but the reader pauses. | "for every finite set of points with any labels" (or "with their true labels"). | see Slice A recheck |
| B4-16 | `concentration` #assumptions ("its $600$ recorded points are functions of one random draw") | minor | "its" and the 600-point trajectory refer to an example introduced only in a later station. | "A trajectory recorded at 600 times, as in [[trajectories-as-samples]], …". | see Slice A recheck |

No critical findings. One moderate finding (B4-1). McDiarmid's inequality is
recalled without proof in `concentration` #mcdiarmid with its source and a stated
deferral; the route contract permits citing the proof machinery, so this is
recorded here as checked and not as a finding.

## Slice A recheck

Recheck date 2026-10-20 (UTC), after writer-P4A's patch. The table above is
kept as the first-pass record; its disposition column now points here.

### Hashes rechecked (raw SHA-256, verified with `sha256sum`; all match the coordinator's message)

| File | SHA-256 |
| --- | --- |
| `risk-erm.md` | `82210fc2b4a2ed7cd4eeae457654eea88c6a2aa0bc02e562d3e131f706a3d455` |
| `concentration.md` | `819fd8c0ce5bd6f5856697de5236504b7f532d55ed9848b0433133e22357b324` |
| `finite-classes.md` | `d7ca77130d5598161a42cca2d3454d26b8cd08fe46c588748498908fceecc6b9` |
| `uniform-convergence.md` | `ed61ac51742eb6b44fffdf0f07cedda1ef5e86f82b34d83a2645b3e3b2026fdd` |
| `margin-bounds.md` | `a3d3b44fc26c5e191800cf17b87c6eb3bf6c09fba841fbd75c75907ab3185be3` |
| `trajectories-as-samples.md` | `964f9b691df82094a4bb519062afb7568407ace477224404af4690d06f027551` |

### Procedure

- I had no saved copy of the first-pass drafts, and HEAD holds the pre-writer
  baseline, so I did not diff. I re-read every passage named in a finding against
  my first-pass notes. I re-read `margin-bounds` in full with answers hidden
  (`tmp/m16-p4b-hide-answers.py`), and the patched questions in
  `trajectories-as-samples` and `margin-bounds` after that.
- I ran every math segment of the six files through the vendored KaTeX with
  `throwOnError: true` (`tmp/m16-p4b-katex-scan.js`). `\label{…}` was stripped and
  `\ref` was stubbed. The only errors are the two in B4-17.
- The writer's "Beginner review patch" table in `docs/m16/writer-phase4a.md` was
  read only after this recheck. It matches what I found, except that its claim of a
  clean quick check misses B4-17 (see B4-18).
- Printed numbers are unchanged. The new M = 10 pointwise claim in
  `uniform-convergence` is checked: a fixed model's empirical risk is 0 with
  probability 0.1 (deviation 0.9) and 1 otherwise (deviation 0.1). So
  |P_n f − P f| ≤ ε has probability 0.9 for every ε in [0.1, 0.9).

### margin-bounds reader task, re-attempted (B4-1)

**Outcome: pass, using only the declared prerequisites (`uniform-convergence`,
`finite-classes`) and the lesson itself.** Lemma `lem-boffi` is now stated in the
lesson's own objects:
- i.i.d. Z_i;
- a class F fixed in advance, with range bound |f(z)| ≤ B for every z;
- a margin γ and confidence δ fixed in advance;
- a member with zero margin errors, and f̂ any such member;
- 𝔯_n(F), the worst-case absolute complexity, defined locally with E_σ and the
  outer supremum over all samples.

The left side is explained as a probability over a fresh Z with f̂ held fixed. I
could list each premise and say what fails if it is dropped: one margin error, a
margin chosen from the data, or an unbounded class. I could check B ≥ γ, and I
could redo the scaling question with B in place of B_h. The certificate mapping is
a labelled side list. Its symbols (V, 𝒱, h(ξ,V), (3.2), B_h, Assumptions
4.1–4.2) are defined downstream and are explicitly not needed. The objective,
explaining why a positive margin plus zero errors changes the rate, still passes.

**Referral to P4-M (not a beginner finding).** The abstract restatement applies
Boffi's certificate-specific Lemma 4.1 to a general class F with range bound B. I
cannot judge, as a beginner, whether the source's hypotheses carry over to that
general form. The lesson labels it "in abstract form; recalled, not proved", and
says the Srebro–Sridharan–Tewari source was not checked.

### Dispositions of B4-1 … B4-16

| ID | Disposition | Evidence at recheck hash |
| --- | --- | --- |
| B4-1 | closed | Abstract statement and local 𝔯_n definition in #fast. The Boffi mapping is moved to a side list that says reading the lesson does not require it. #statement now says nothing depends on the certificate correspondence. Reader task passed. |
| B4-2 | closed (rename introduced B4-17) | Ramp renamed r_γ and Lipschitz constant L. No φ_t remains, and ρ appears only as the described decrease-rate function in #failure. The text substitution left `\ler_\gamma` in two places; see B4-17. |
| B4-3 | closed | Notation note at the dictionary: f is the vector field, f_V the loss, X the initial-state set. Grid count renamed N; m is now only the holdout count. |
| B4-4 | closed | The concentration notation paragraph says Z_i is a real number here and a loss value in learning. |
| B4-5 | closed | Variance, standard deviation (fair coin ¼ and ½) and the product rule are defined in concentration #elementary. finite-classes points there. margin-bounds defines variance inline. |
| B4-6 | closed | Step 2 is labelled "(sketch)". It names the sup-of-average step, defines exchangeable, and defines E_Z and E_σ. |
| B4-7 | closed | Retitled "Selection makes unbiased models look perfect". The ε range and its reason are stated. |
| B4-8 | closed | finite-classes now says "the memorizer of that sample from the uniform-interval example of [[risk-erm]]". |
| B4-9 | closed | The premise and its reason are in the question. |
| B4-10 | closed | The opening gives (log n)³𝔯_n²/γ², and (log n)³/(γ²n) when the complexity is of order 1/√n. |
| B4-11 | closed | "only ratios of the margin to the class's complexity and range bound matter". |
| B4-12 | closed | A parenthetical separates Lipschitz-composition "contraction" from Part 16 dynamics and from Bellman contraction. |
| B4-13 | closed | The demo answer derives n = 2(log 320)²/log 640 ≈ 10.3. |
| B4-14 | closed | The confidence-limit sentence is added. |
| B4-15 | closed | "for every finite set of points, each given any label". |
| B4-16 | closed (patch introduced B4-19) | Concentration names the 600-time trajectory as the example of [[trajectories-as-samples]]. |

### New findings from the patch

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- |
| B4-17 | `margin-bounds` #ramp, display `sandwich`: `$$\mathbf 1\{u>0\}\ler_\gamma(u)\le\mathbf 1\{u>-\gamma\}. \label{sandwich}$$`; and Card #idea, same expression | critical | Renaming φ_γ to r_γ turned `\le\phi_\gamma` into `\ler_\gamma`, an undefined control sequence. With the vendored KaTeX and `throwOnError: true` this is a parse error ("Undefined control sequence: \ler"). In the app (`app/js/math.js`: `throwOnError: false`, `strict: "ignore"`) it renders as the literal red text `\ler` (`<span class="mord" style="color:#cc0000;">\ler</span>`). The lesson's defining inequality, in both Textbook and Card, therefore shows no ramp and no first ≤. The same string is present in the built `rl_atlas.html`. | Write `\le r_\gamma(u)` (with a space) in both places, rebuild, and rerun the KaTeX scan. A file-wide search for `\\le[a-z]` and other letter-fused commands is advisable after any scripted rename (the pilot lesson on shell edits applies). | open |
| B4-18 | `tools/m16-lesson-check.js` line 56 (`mathErrors: host.querySelectorAll('.katex-error').length`); coordinator-owned | moderate (validation tooling) | With `throwOnError: false`, KaTeX renders an undefined command as a colored `mord` span, not `.katex-error`. The quick check therefore reported `mathErrors: 0` for margin-bounds at this exact hash (`browser-check-results/m16-parts-17-chrome-quick/report.json`). The writer's "quick check clean" evidence does not cover this error class. | Also count elements whose inline style uses KaTeX's `errorColor` (`#cc0000`), or set a distinctive `errorColor` and search for it. Alternatively, run a build-time KaTeX parse with `throwOnError: true` on all authored math, as `tmp/m16-p4b-katex-scan.js` does. Rerun Part 17 (and Parts 15–16, 18) after the fix. | open |
| B4-19 | `concentration` #assumptions: "so a trajectory recorded at $600$ times, as in the example of [[trajectories-as-samples]], gives $600$ functions of one random draw, not $600$ independent draws ([[trajectories-as-samples]])" | minor | The same link appears twice in one sentence. | Drop the trailing parenthetical link. | open |
| B4-20 | `margin-bounds` ramp r_γ vs `trajectories-as-samples` #time-grid residual r(t) | minor | Two adjacent Part 17 stations use r for different residual-related objects: a ramp loss of a residual, and a residual along time. The confusion is low because the subscript γ and argument t differ, and neither lesson uses both. | Optional: mention the distinction in one lesson, or leave as is and record the decision. | open |

**Recheck summary.** All sixteen first-pass findings are closed. One new critical
finding (B4-17, a broken render of the ramp sandwich) and one new moderate
validation-tooling finding (B4-18) are open, with two new minor findings (B4-19,
B4-20). Slice A should not be accepted until B4-17 is fixed and rechecked at the
new hash.

## Slice A recheck 2

Recheck date 2026-10-20 (UTC), after writer-P4A's second patch. I read the
writer's patch table rows for B4-17 to B4-20 and for the doubled-label removal
after my own checks below.

### Hashes rechecked (raw SHA-256, verified with `sha256sum`; all match the coordinator's message)

| File | SHA-256 |
| --- | --- |
| `risk-erm.md` | `12716d0f827cbe5b52de7255b621f048494208593003554dcbc9e37b94a07389` |
| `concentration.md` | `d66d448788f402f09abb61424aa2f8cc6423dc16b4c6ab7c717681375bdff5ba` |
| `finite-classes.md` | `7c22f23842c92d06fc7bda23f9bbe49a0b6d2a07e32c642b7a610685c48ca504` |
| `uniform-convergence.md` | `dd55fdaedcca17b547b672018680098319b7f76537114f8fa2bb752df49be05b` |
| `margin-bounds.md` | `81b8ed8a04d9a75656b8e33f50026becd25092cfa93c0e3122eae30b17479405` |
| `trajectories-as-samples.md` | `e500de60b2aa17853ec3dc735b83ead989e927cfc1fe7d5e192fe5dea4c51411` |

### Checks run

- **KaTeX scan.** `tmp/m16-p4b-katex-scan.js` (vendored KaTeX,
  `throwOnError: true`) finds 0 errors in all six files: 192, 257, 179, 198, 282
  and 215 segments.
- **Bundle.** The built `rl_atlas.html` (newer than every edited source) has
  `\le r_\gamma(u)` in the `sandwich` display.
- **Browser check.** `node tools/m16-lesson-check.js chrome --quick --parts=17`
  (log `tmp/m16-p4b-quick17.log`; report in
  `browser-check-results/m16-parts-17-chrome-quick/`) ran with no page errors and
  no external requests. For every slice-A Textbook and Card at 390 px, at the
  hashes above, it reports:
  - `mathErrors` 0 and `unknown` empty;
  - no page overflow and empty `badMath`;
  - no unresolved refs and `doubled` empty.
  Slice-B views were not judged here.
- **Doubled-label removal.** Every `\ref` in the six files was read in context.
  None is preceded by a kind word (`Lemma`, `Theorem`, `Example`, `§`, …). Every
  edited sentence reads correctly with the kind supplied by the renderer, for
  example:
  - "In \ref{ex-two-states} it equals ½";
  - "By \ref{lem-hoeffding}, each factor is at most …";
  - "\ref{thm-zero} only separates risk 0 …";
  - "In \ref{ex-two-models} the lemma holds with equality";
  - "the short mapping at the end of \ref{fast}";
  - "What does \ref{lem-bridge} certify?".
  Equation references ("\ref{eps-rep} never holds", "\ref{traj-max} is their
  equation (3.3)") were not edited and still read as equation numbers.

### Dispositions

| ID | Disposition | Evidence / judgement |
| --- | --- | --- |
| B4-17 | closed | Both the `sandwich` display (line 25) and the Card read `\mathbf 1\{u>0\}\le r_\gamma(u)\le\mathbf 1\{u>-\gamma\}`. The strict KaTeX parse passes and the browser check shows no unknown-command spans. |
| B4-18 | closed | `tools/m16-lesson-check.js` now adds `.katex [style*="#cc0000"]` spans to `mathErrors`. This is exactly the span KaTeX emitted for `\ler` (`<span class="mord" style="color:#cc0000;">`). It also flags repeated kind words (`Lemma Lemma 1`). Dropping the `§§` pattern is reasonable, since locators use it legitimately. The one residual gap: a stray `§\ref{…}` would render as "§§n" and is no longer detected in the DOM. A source-level search for a kind word or `§` directly before `\ref` covers it (none found now). Recorded as advice, not a reopened finding. |
| B4-19 | closed | concentration #assumptions now has the single link "as in the example of [[trajectories-as-samples]]"; the trailing duplicate is gone. |
| B4-20 | closed (declined; decline accepted) | The writer kept r(t) in trajectories-as-samples. Their reasons: about 15 uses inside displays and proofs; a rename risks another B4-17-style substitution error; the two lessons never use both objects; and the subscript γ and argument t distinguish them. I agree. The collision is cross-lesson, low-risk and now documented as an accepted notation choice. |

**Recheck 2 summary.** All slice-A findings (B4-1 … B4-20) are closed at the
hashes above. No new findings. From the beginner-review side, slice A has no open
critical or moderate items. Mathematical review (P4-M) and the coordinator's
remaining product gates are separate.

## Slice B

Author: writer-P4B (I authored none of it). Review date 2026-10-20 (UTC).
Route order read: `rademacher-complexity` (pilot, edits only) ->
`rademacher-properties` -> `covering-dudley` -> `covering-properties` ->
`kernels-random-features` -> `dual-sudakov`. `covering-dudley` is mainline for
Theorem 4.2; the other four new stations are optional branches.

### Hashes reviewed (raw SHA-256, verified with `sha256sum`; all match the packet)

| File | SHA-256 |
| --- | --- |
| `rademacher-complexity.md` | `019d9519031f16e34b8aeebc93f88057c7e3a4260eed7e0fd7419bbeada50a8d` |
| `rademacher-properties.md` | `2ef9800fe5aed654a717b56c1832be293f65df724705f243dd681d9ba121c3d5` |
| `covering-dudley.md` | `95aea25ad712d2fd8c9588a79910810bd1ff9d0747587f1291ce39d7550df773` |
| `covering-properties.md` | `6ea7b91fb8c0d568e2420e2fdabbb47e87a66ffb66a24302f1e38cd5a506fac1` |
| `kernels-random-features.md` | `5bd176d275d9388cf179f5c3428070fb7ed664ff7e5b7c782b30b7bb171df3e0` |
| `dual-sudakov.md` | `34b6f2613aae7923561bca7a34a3e883de49feff283e8901eb9a3434503ede50` |

Declared prerequisites used: the six TOML `prereqs` (pilot, `concentration`
from slice A, and the slice-B chain).

### Procedure and evidence limitations

- **Answers hidden.** I hid answers with `tmp/m16-p4b-hide2.py` (same rule as
  slice A). I attempted all 19 exercises and every reader task, and then revealed
  the answers. No answer was exposed early. `docs/m16/writer-phase4b.md` and its
  handoff were not read.
- **Recomputation.** `tmp/m16-p4b-slice-b-numbers.py` (output
  `tmp/m16-p4b-slice-b-numbers.log`) recomputes every worked number. The local
  Python has no SciPy, so integrals use a log-spaced midpoint rule. Deterministic
  values all agree with the lessons; the Monte Carlo exceptions are below.
- **Math rendering.** `tmp/m16-p4b-katex-scan.js` (vendored KaTeX,
  `throwOnError: true`) finds 0 errors in all six files.
- **Doubled reference words.** A search for a kind word written before `\ref`
  (`Lemma|Theorem|Example|Definition|Figure|Rule|Section|§|Remark|Proof|equation`)
  finds none in the six slice-B files. It also finds none in the six slice-A
  files on disk at the time of this search.
- **Quick-check output.** The existing
  `browser-check-results/m16-parts-17-chrome-quick/report.json` carries these six
  hashes. It shows no math errors, unknown commands or overflow for any slice-B
  view. Its `doubled: ["§§"]` for the pilot comes from the legitimate source
  locator "Chapter 26, §§26.1–26.3". The report was written two seconds before the
  current `tools/m16-lesson-check.js`, whose doubled-label pattern matches only
  repeated kind words, so it is not a content finding. I did not rerun the
  browser check.

### Pilot `rademacher-complexity` (edits only)

`git diff` against HEAD shows the following changes; HEAD's copy hashes to the
accepted `a95c06b5…b0b0`.
- **Layout:** four displays (`sym`, `lin-mid`, the cross-term expansion and
  `rad-wc`) are split into `aligned` lines with identical mathematics.
- **Doubled section mark:** `§\ref{toy}` becomes `\ref{toy}`.
- **One added clause:** "; [[rademacher-properties]] carries out that step" in
  "High probability". This is true at the reviewed hash: `rademacher-properties`
  #high-probability proves Theorem 26.5 part 1 via McDiarmid.

**Outcome: no meaning change.** I did not re-review the unchanged argument.

### rademacher-properties — reader task: use scaling/composition without silently changing convention; reproduce one contraction step

**Outcome: pass.**
- **Rules and shifts.** Reproduced rules 1–5 and their absolute variants. Derived
  \ref{abs-shift}: E|S_σ(b)| ≤ √(Σb²)/n = ‖b‖_n/√n.
- **Fixed nonzero function** (the route-contract case). Signed complexity 0;
  absolute E|Σσ|/n = 0.5, 0.375, 0.0796 at n = 2, 4, 100, against √(2/(πn)) =
  0.0798 and 1/√n.
- **Zero-member inequality** reproduced, including the shift by −a_0 that the
  text leaves implicit.
- **Contraction lemma, one coordinate.** Reproduced every move: average over σ_j,
  merge the two suprema into one over pairs, apply the Lipschitz bound, relabel
  the pair to drop |·|, split again. The intermediate set {(|w|, w)} has values
  1, 0, 1, 0 and average ½.
- **Example checks.** |t| → ¼; t² → ¼; 2t+5 → 1 signed and 3.5 absolute; the
  abs-shift decomposition 1 + 2.5 = 3.5.
- **High-probability bound.** Confidence term 0.272; the sample-based 3c form
  re-derived.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Scaling and offset | signed 1.5; absolute 2 (values 4,0,0,4); abs-shift 1.5 + 0.707 = 2.21 ≥ 2 | same | yes |
| A ramp max{t,0} | L = 1; ≤ ½; exact ¼ | same | yes |
| Absolute proof breaks | the relabelling step; diagonal class with ℓ(t) = t+5 gives 3 > ½ | same step; example t+1 gives 1 > ½ | yes |
| Confidence term | √(2 ln 200/400) = 0.163; independence fails | same | yes |
| Vector maps | ℓ mixes coordinates; not one scalar map per entry | same, plus Maurer | yes |

Passages checked: #motivation, #statement (`thm-rules`, proof, fixed function,
zero member), #reasoning (`thm-contraction`, proof, offsets, `ex-contraction`),
#absolute, #vector, #high-probability, #assumptions, #exercises, Card.
Findings: B4-21, B4-22, B4-23.

### covering-dudley (mainline) — reader task: transfer a parameter cover, explain the entropy integral; follow Massart, chaining with truncation, signed-to-absolute

**Outcome: pass.**
- **Massart's lemma.** Followed all five steps. The optimal λ gives
  r√(2n log N). Checked: million-member constant 5.26; endpoint example
  √(log 2) = 0.833.
- **Covers.** Interval: ⌈B/ε⌉ = 7 against 14.3 from the volume bound.
- **Parameter transfer.** Followed; it lets the reader do the cover transfer
  themselves.
- **One-scale bound.** Followed, including discarding centers far from A.
- **Chaining.** Followed: 3ε_k link length, ≤ N(ε_k)² links, constant 6 from
  3√(4 log N), and 12 from ε_k ≤ 2∫. Truncation at D/2 is explained, as is the
  divergence of the untruncated volume bound.
- **Signed to absolute.** `lem-abs` followed, giving the constant 24 in
  \ref{dudley-wc}.
- **Recomputed:** I = 1.3526 (12I = 16.23); J = 0.6580 (12J = 7.90);
  one-scale minima 0.687, 0.303 (ε ≈ 0.030), 0.0372; exact 0.196, 0.0796, 0.00798;
  finite chain sums 0.750, 0.676, 0.660; binomial estimate 1 − H(¼) = 0.1887 and
  log N ≥ 0.131n.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Massart by hand | maxima 1,1,0,1 → ¾; bound √(log 3) = 1.048 | same | yes |
| Transferring a cover | L = 2; N(0.25) ≤ ⌈1/0.125⌉ = 8 | same | yes |
| Choosing the reference | w = 0: 1.707 (or 1.5 with the first form); w = −1: 1, exact; zero member better | same | yes |
| Why stop the integral | integrand ~ √(2/ε) at large ε diverges; integrate only to half the radius, where N = 1 | same | yes |

Passages checked: #motivation, #massart, #covers (`def-cover`, `ex-interval`,
transfer, one-scale), #statement, #reasoning (proof Steps 0–7, level costs,
truncation, parameter ball), #conventions (`lem-abs`, `dudley-wc`, connection to
the paper, remark), #examples, #failure, #assumptions, #exercises, Card.
Findings: B4-24, B4-25, B4-26, B4-27.

### covering-properties — reader task: construct image and product covers with explicit norms

**Outcome: pass.**
- **Comparisons.** Followed all three lines of `thm-packing` and the factor-2
  integral substitution. Checked the subset counterexample:
  N^in(1; {−1, 1}) = 2 > 1.
- **Rules 1–4 and volume.** Followed all four rules. Followed the volume-bound
  proof in any norm (J(ε/2)^k ≤ (1+ε/2)^k): 1000 and 9261 centers, logs 6.91 and
  9.13.
- **Misprint example.** The Lemma 27.2 counterexample reproduced:
  N(1; [−2, 2]) = 2 > N(2; [−1, 1]) = 1.
- **Worked cases.** Interval packing M(0.5) = 4, M(1) = 2; image 7; product 4 and 9
  (side 0.354 → 3); the √2 norm change.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Packing on [0,3] | N(1) = 2, M(1) = 3, M(2) = 2; N^in(1) = 2, N^in(2) = 1; all inequalities hold | same | yes |
| Scaling | N(ε; 5A+3) = ⌈5/ε⌉; N(1; 5A) = 5 > N(5; A) = 1 | same | yes |
| Joint cover | N_val(ε/√2)·N_grad(ε/√2); external pairs, G need not be ∇u | same | yes |

Passages checked: all sections and Card. Findings: B4-28.

### kernels-random-features (optional) — reader task: explain why value approximation alone does not transfer the certificate

**Outcome: pass.**
- **Value-only failure explained.** h = −1.8x² ≤ −0.45 on [0.5, 1]. Perturbing by
  g_m changes the residual by up to 9.74 (m = 10) and 99.997 (m = 100), while
  the values change only by 1/m. The perturbed residual reaches about +8.03.
- **Gram matrix.** PSD argument reproduced.
- **Sinc example.** k(0.3, −0.5) = 0.4483; sup|V′| = 0.301 (W = 1) and 4.36
  (W = 10).
- **Bound evaluation.** Lemma B.1 at W = 1, K = 10⁴, δ = 0.05 gives 0.300 and
  2.43, with B_θ = 3.297.
- **Gaussian tail.** P(|w| > 4) = 6.33×10⁻⁵.
- **Margin bookkeeping.** a = γ/(8√2 L_h) gives γ/8, and the shifted-margin
  bookkeeping checks.
- **Monte Carlo** (own seed, 20 dictionaries, medians). W = 1: values
  0.231/0.078/0.021/0.0065, derivatives 0.136/0.058/0.014/0.0068. W = 10:
  0.53/0.19/0.052/0.017 and 3.39/0.92/0.32/0.093. The lesson's numbers are within
  the run-to-run variation one expects. The derivative ratio W = 10 : W = 1 is
  14–25 here, against 13–23 printed; the qualitative claims hold.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| A valid kernel | cᵀGc = E[(Σc_iφ(x_i;θ))²] ≥ 0 | same | yes |
| Coefficients | \|c_k\| = 2\|cos b_k\|/K ≤ 2/K, so ‖c‖₁ ≤ 2 for every draw | same | yes |
| Value-close, residual-far | not feasible (residual ≈ +8 near x ≈ 0.974); a value guarantee says nothing about ∇V | same | yes |
| Choosing among dictionaries | yes, via a union bound over ten pre-drawn dictionaries at δ/10 | same | yes |

Passages checked: all sections, remark and Card. Findings: B4-29, B4-30, B4-31.

### dual-sudakov (optional) — reader task: identify how structured entropy improves a matrix-class bound

**Outcome: pass.**
- **Operator-norm Lipschitz bound.** `lem-op` reproduced: J^T(Δ+Δ^T)m and the
  2B_{Dm}B_m factor.
- **Why the norm matters.** Explained that the gain is E‖G‖_op ≈ 2√d against
  E‖G‖_F ≈ d.
- **Integral split.** Small-scale integration by parts checked
  (1/(2√(log 3)) = 0.477). Moderate part (√c/2)√d log d.
- **Comparisons.** k against d log²d: 0.96, 53.0, 347, 2121 (2.38×), 47717
  (10.49×). Minimum ratio 1.036 at d = 9; first ≥ 2 at d = 73. With c = 1, the
  minimum-of-two integrals are 8.72, 40.74, 169.1 against dI = 13.5, 135, 1353.
- **Monte Carlo** E‖G‖_op: see B4-33.

| Exercise | My answer (blind) | Given | Match |
| --- | --- | --- | --- |
| Quadratic case | B_m = B_S, B_Dm = 1, factor B_S² + 2B_S = 8.18 | same | yes |
| Which estimate where | crossing ≈ 0.052; volume at 0.01 (5.3×10⁴ vs 10⁶); Sudakov at 0.5 (400 vs 1.6×10⁴) | same | yes |
| When does structure pay | 1.04, 1.67, 2.38; only d = 100 | same | yes |

Passages checked: all sections and Card. Findings: B4-31, B4-32, B4-33.

### Slice B findings

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- |
| B4-21 | `rademacher-properties` #motivation ("**Signed:** $\mathfrak R(A)=\mathbb E_\sigma\sup_{a\in A}S_\sigma(a)$"); also `ln` in this lesson and the pilot against `log` in `concentration`, `finite-classes`, `covering-dudley` | minor | The pilot reserves the plain fraktur R (with subscript n) for the worst-case absolute convention. Here plain 𝔯(A) without n means the *signed* complexity, while `covering-dudley`, the next station, writes the same quantity \widehat{\mathfrak R}_n(F; z). The local definition is clear, but a reader moving between stations meets two names for one quantity, very close to the reserved symbol. Natural log is also written two ways across Part 17. | Use \widehat{\mathfrak R}(A) (hat, no n) for the signed set version and \widehat{\mathfrak R}^{\|\cdot\|}(A) for the absolute one, or add one sentence contrasting 𝔯(A) with 𝔯_n. Pick one of `log` / `ln` for Part 17 (coordinator notation decision). | open |
| B4-22 | `rademacher-properties` #statement, after \ref{zero-member}: "Combined with \ref{abs-shift}, any member $a_0$ of $A$ gives $\mathfrak R^{\|\cdot\|}(A)\le\lVert a_0\rVert_n/\sqrt n+2\mathfrak R(A)$." | minor | The step needs A = (A − a_0) + a_0, with A − a_0 ∋ 0 and rule 2 for the signed part. The shift by −a_0 is not stated, so the reader must find it (`covering-dudley` `lem-abs` later does it in full). | Add: "apply it to A − a_0, which contains 0, and use rule 2". | open |
| B4-23 | `rademacher-properties` Card #uses ("[[three-contractions]], [[kernels-random-features]]") vs Textbook #uses (also [[covering-dudley]]) | minor | The Card omits the mainline consumer, `covering-dudley`, which uses the shift rule and \ref{zero-member}. | Add [[covering-dudley]] to the Card's uses. | open |
| B4-24 | `covering-dudley` #covers, after \ref{transfer}: "The last step is the volume comparison proved in [[boffi-thm-4-2]] (Lemma "Volume comparison", Step 4)" | minor | A mainline Part 17 step points for its proof to a downstream Part 18 lesson. The next station, `covering-properties` `thm-volume`, proves the same bound in any norm. | Cite [[covering-properties]] (`thm-volume`) as the proof, keeping the Part 18 link as a use, or give the three-line packing argument here. | open |
| B4-25 | `covering-dudley` #reasoning "A parameter ball": "$\int_0^\infty\sqrt{\log N(\epsilon)}\,d\epsilon\le LB\sqrt k\int_0^1\sqrt{\log(1+2/u)}\,du$" | minor | The truncation that makes the upper limit 1 is not justified at this display. It needs a reference member (f_{θ=0}, in the ball) and the radius bound ‖f_θ − f_0‖_∞ ≤ LB, so that N(ε) = 1 for ε ≥ LB. Truncation is a named reader task, and the preceding paragraph explains the principle, so the reader can supply it, but must guess the radius. | Add: "Every f_θ is within LB of f_0 in sup distance, so N(ε) = 1 for ε ≥ LB, and the integral stops at ε = LB, i.e. u = 1". Optionally start the integral at the Dudley limit D/2. | open |
| B4-26 | `covering-dudley` #conventions "Connection to the paper" ("the class is the set of trajectory residuals $\xi\mapsto h(\xi,V)$, and $\lVert\cdot\rVert_{\mathcal V}$ is the joint value-and-gradient norm of [[certificate-classes]] … $L_h$") and its two bullets | minor | Same pattern as B4-1, but as an aside: Part 18 objects (h(ξ,V), ‖·‖_𝒱, L_h, B_h, "zero-residual certificate") are used without definition in a mainline lesson whose only prerequisite is the pilot. \ref{dudley-wc} itself is fully stated in this lesson's terms, so no premise of the station depends on them. | Label the paragraph as a preview for [[boffi-thm-4-2]]. State that nothing else in the lesson depends on it, and give one-phrase glosses (residual = worst violation along a trajectory; ‖·‖_𝒱 = sup of value and gradient size). | open |
| B4-27 | `covering-dudley` #statement/#reasoning (levels ε_k, k = 0, 1, 2, …) vs #covers and "What each level costs" ("For a $k$-parameter class"); `def-cover` uses ρ for a distance and T for a set | minor | k is both the chaining level and the parameter dimension, inside one paragraph ("Level k pays … For a k-parameter class"). ρ and T have other meanings on the route (decrease rate; horizon). | Index levels by j (ε_j = D2^{−j}), or rename the dimension. Optionally note that ρ and T are local here. | open |
| B4-28 | `covering-properties` #joint ("over the reachable set $S$ ([[certificate-classes]])", "$(L_g+L_{\nabla g})$", "certificates $V_{\theta_c}$") | minor | The section uses the Part 18 joint norm, reachable set S, gradient Lipschitz constants and "certificate" without local glosses. The prerequisite is only `covering-dudley`. Exercise 3 is answerable from the text, so the reader task is unaffected. | Mark it as a preview and gloss S (a set containing all trajectory points) and L_g, L_∇g (Lipschitz constants of value and gradient in θ) in a phrase each. | open |
| B4-29 | `kernels-random-features` #statement ("$k(x,y)=\mathbb E_{\theta\sim\nu}[\dots]$"), #reasoning ("$\sum_{k=1}^Kc_k\phi(x;\theta_k)$"), #motivation / #independence ("number of parameters $k$", "with $K$ in place of $k$"); K against the universal constant K of [[margin-bounds]] Lemma 4.1 | minor | In one lesson k is the kernel, the feature index and the parameter count, and K (feature count) collides with Lemma 4.1's universal constant, which this lesson invokes. | Index features by j; write the kernel as k(·,·) only; add one note that K here is the feature count, not Lemma 4.1's constant. | open |
| B4-30 | `kernels-random-features` #derivatives: "every residual changes by at most $\gamma/8$; the source records the weaker $\gamma/4$. A feasible $V$ … gives $h(\xi_i,\widehat V)\le-3\gamma/4$" | minor | The text derives γ/8 and then concludes −3γ/4, which follows from the source's γ/4 rather than its own γ/8 (−7γ/8). The conclusion is valid but the reader pauses. | "…so it is at most −7γ/8, and in particular at most −3γ/4, the value the source carries forward." | open |
| B4-31 | `kernels-random-features` #derivatives / #independence (Lemma 4.1 with "shifted residual … bound $B_h+\gamma/4$", "$\kappa$ in Theorem 4.4", $L_h$, $S$); `dual-sudakov` #motivation ("$L_h$, $\gamma$, $B_h$ and $\delta$ are as in [[boffi-thm-4-2]]") and "Assembling the complexity" | minor | Both optional stations read like companions to Part 18. Their assembly paragraphs rely on Part 18 objects and on Lemma 4.1, which their declared prerequisite chains do not include (no `margin-bounds`, `trajectories-as-samples` or Part 18). Their reader tasks pass without these paragraphs. | Either declare the intended reading position (after `boffi-thm-4-2`) in the opening lines or the route metadata, or add one-line recalls (Lemma 4.1 in its abstract form from [[margin-bounds]], L_h, B_h, S). This is a coordinator decision on route ordering. | open |
| B4-32 | `dual-sudakov` #motivation: "$B_{Dm}=\sup_{x\in S}\lVert\partial m/\partial x(x)\rVert$"; proof uses $\lVert J\rVert_{\mathrm{op}}$ | minor | The lesson insists on naming norms, but B_Dm's norm is left implicit; the proof needs the operator norm. | Write ‖∂m/∂x(x)‖_op. | open |
| B4-33 | `dual-sudakov` #statement: "$\mathbb E\lVert G\rVert_{\mathrm{op}}\approx5.57$ for $d=10$ and $19.56$ for $d=100$" | minor | My Monte Carlo gives 5.634 ± 0.003 (40,000 draws) and 19.59 ± 0.012 (1,000 draws). The printed d = 10 value is about 1% low, outside the standard error, presumably from a small run. The conclusion (below 2√d) is unaffected. | Recompute with a stated number of draws (e.g. 5.63, 19.59) or say "about". | open |

**Slice B summary.** No critical or moderate findings. All six reader tasks pass,
including the pilot carry-over tasks: Massart, chaining with truncation,
signed-to-absolute conversion, and one contraction coordinate step. 13 minor
findings (B4-21 … B4-33), all open. These are agent perspectives, not student
evidence.

## Final status

Final recheck 2026-10-20 (UTC) by reviewer-P4B, after three changes:
- the slice-B beginner patch (`docs/m16/writer-phase4b.md`, "Beginner review
  patch");
- the math-review patches M4-1 … M4-15 (`docs/m16/math-phase4.md`);
- coordinator edits to `boffi-thm-4-2` (Step 5, lines ~120 and 126) and to
  `three-contractions` (one sentence).

I read the patch tables only to locate the changed passages. I then re-read each
passage myself in the files at the hashes below.

### Final hashes (raw SHA-256, verified with `sha256sum`; all match the coordinator's prefixes)

| File | SHA-256 |
| --- | --- |
| `17-learning-theory/risk-erm.md` | `79a0d9138bc473f74f9dbb1eff7a8901dc8b89284ca4cb00b12e5f761609b352` |
| `17-learning-theory/concentration.md` | `4e2a4c823042e3dea2d08370a098cacaecdd5009e9c093e97aa5a57e730a727d` |
| `17-learning-theory/finite-classes.md` | `2e77adc13fbcf6d54a7451ad779c0bd5a51785479c943133e1a90c3a8800724d` |
| `17-learning-theory/uniform-convergence.md` | `e9c01b793323f348dbcdddde9981e48b43d097dce29460ee1ea2a89a6be16490` |
| `17-learning-theory/rademacher-complexity.md` | `019d9519031f16e34b8aeebc93f88057c7e3a4260eed7e0fd7419bbeada50a8d` |
| `17-learning-theory/rademacher-properties.md` | `bd9311c56347f9e5149a2fcf77832cf0be462b7ce0f668db957a84afb002db04` |
| `17-learning-theory/covering-dudley.md` | `54f20740b4f5ff12f46af735455c8bab2c8611728415ce27a5e13250fcfb8fa8` |
| `17-learning-theory/covering-properties.md` | `5a8e788e3ba547b2a75e2f897e33e042e9626ff486125583352cd0da51f83d5e` |
| `17-learning-theory/kernels-random-features.md` | `73573ea594a45b22205c2a845c7b718f07de14c19e1f8d783dadeee5995ebecb` |
| `17-learning-theory/dual-sudakov.md` | `17748420812b8cdcd32130e1252451864c89fc75064d3e16d382a428dc5b68c4` |
| `17-learning-theory/margin-bounds.md` | `da81acff72b9ebba962d2ae0aa8b2fcf291724c5b072d7917f87b409f31c1f26` (B4-34 patch; was `b949d90b…8c69`) |
| `17-learning-theory/trajectories-as-samples.md` | `b12bb7f4e37695a53594123028383f9e516ab52e0329c24f3dad18eb0f402e66` |
| `16-contraction/three-contractions.md` | `4c454424deb3f2eaf444c27232fa157fb5857a6a5fa66ae37cb8ae6b73a844b4` |
| `18-certificates/boffi-thm-4-2.md` | `77a427a9cd16dd37c36bdd75b9453eac59c5a3109a9e4e9f9fe618e6cfb295a0` |

### Checks run

- **Strict KaTeX scan.** `tmp/m16-p4b-katex-scan.js` (`throwOnError: true`)
  finds 0 errors in all 14 files: 257, 503, 330, 266, 181, 316, 287, 466, 362,
  196, 219, 207, 89 and 561 segments.
- **Browser check.** `node tools/m16-lesson-check.js chrome --quick --parts=16,17,18`
  (log `tmp/m16-p4b-quick-final.log`, report
  `browser-check-results/m16-parts-16-17-18-chrome-quick/`) checked 54 views at
  these hashes. Every Part 17 view and both edited Part 16/18 lessons are clean:
  no math errors, no unknown-command spans, no overflow or `badMath`, no
  unresolved refs or terms, and no doubled labels. The run exited 1 because of one
  view outside this review: `incremental-stability` Textbook at 390 px reports a
  `badMath` overflow in its aligned difference/integral display. That file is
  unmodified relative to HEAD (Phase 2/3 accepted). This is passed to the
  coordinator, not recorded as a Part 17 finding.

### Changed passages re-read for new beginner problems

- **`margin-bounds` #failure (population-level fixed-margin argument).** Readable
  and convincing. Its chain:
  - V(0)=0 and ρ(0)=0, with bounded gradients and continuous dynamics, put every
    candidate's residual near 0 close to the equilibrium;
  - so trajectories starting there violate a fixed γ;
  - so the probability that all n sampled trajectories meet the margin tends to 0;
  - the parenthetical about a γ chosen after the sample is helpful.

  One wording slip → B4-34.
- **`trajectories-as-samples` after `ex-bridge` (scalar threshold).** Checked:
  H_V(ξ) = −ξ²e^{−2} > −γ exactly when ξ² < γe², and "positive probability to
  every neighborhood of 0" is the right premise. Readable.
- **`uniform-convergence` "Assembled" (constant remark).** The [0,1]-loss constant
  1/n against SSBD's 2c/n is explained, and so is why the pilot shows a constant
  twice as large. This resolves a discrepancy a beginner would otherwise notice
  between the two lessons. The added split sentence (M4-5) now explains the
  symmetrization factor 2.
- **`covering-dudley` #conventions (24 / 48 qualification).**
  - The preview label and glosses (B4-26) make the paragraph readable.
  - Why in-class centers matter is stated: the residual's Lipschitz step needs
    certificates at the centers.
  - The 48 follows from the factor-2 scale comparison of [[covering-properties]],
    a labelled forward link to the next station whose one-line substitution is
    given there. Acceptable.
- **`dual-sudakov` #norm and after (B.2) (center caveat).** The text separates
  covering 𝒱 (any matrix centers) from the residual step (L_h only at in-class
  certificates), and gives the factor 2 or the enlarged set. Readable.
- **`rademacher-properties` #absolute "A failure" (2t+5 toy).** Now explains that
  the exact 3.5 comes from the triangle-inequality step, with exact offset 2.5,
  while the displayed \ref{abs-shift} gives 1 + 5/√2 ≈ 4.54. Recomputed. This
  removes a real beginner trap: my first-pass check had used the exact offset
  without noticing that the displayed bound is looser.
- **Coordinator edits.**
  - `boffi-thm-4-2` Step 5 now says the cover centers are picked inside the ball,
    so they are certificates, and points to [[covering-dudley]] for the
    24 / 48 derivation. This is consistent with `covering-dudley`.
  - `three-contractions` now says [[rademacher-properties]] proves the signed
    lemma and treats offsets and vector composition separately. That is true at
    the hash above.
- **Other math-patch sentences read in passing:** M4-1 lemma title; M4-3/M4-4
  measurability wording; M4-6 "k/n up to log³n"; M4-12 W = 1 in the sinc check;
  M4-14 pointers. No new beginner problem found.

### Reader tasks re-attempted

- **margin-bounds: pass.**
  - Restated the abstract fast-margin lemma's premises (i.i.d. Z_i, fixed F with
    |f| ≤ B, fixed γ and δ, a zero-margin-error f̂, worst-case absolute
    complexity).
  - Explained why the squared complexity turns 1/√n into 1/n.
  - Explained why a fixed γ fails for Lyapunov residuals near the equilibrium,
    using the new population argument.
- **covering-dudley: pass.**
  - Followed the chaining proof with j-indexed levels (link length 3ε_j, at most
    N(ε_j)² links, constants 6 → 12).
  - Truncation at the radius is now explicit for the parameter ball
    (f_0 = f_{θ=0}, N = 1 for ε ≥ LB, u = 1).
  - The local three-line volume argument is now given.
  - Signed → absolute is via `lem-abs` (24, or 48 with arbitrary centers).

### Dispositions of B4-21 … B4-33

| ID | Disposition | Evidence at final hash |
| --- | --- | --- |
| B4-21 | closed; pilot part declined, decline accepted | `rademacher-properties` uses the hatted set complexities, with the sentence that the hat marks a fixed sample and plain 𝔯_n stays reserved; `log` is used throughout and stated as natural; `kernels` uses `log`. The pilot keeps `ln`, defined locally, as an accepted file under a layout-only mandate. That is a harmless cross-lesson spelling difference; the coordinator may harmonize it. |
| B4-22 | closed | The A = (A−a_0)+a_0 step, `zero-member` on A−a_0, rule 2 and `abs-shift` are spelled out. |
| B4-23 | closed | Card #uses lists [[covering-dudley]]. |
| B4-24 | closed | A local packing/volume argument plus a pointer to `covering-properties` `thm-volume`; Part 18 kept only as a use. |
| B4-25 | closed | Reference f_0 = f_{θ=0} and radius LB justify the cutoff u = 1. |
| B4-26 | closed | Labelled a preview, with "Nothing else in this lesson depends on this paragraph", and glosses for certificate, trajectory residual, ‖·‖_𝒱, L_h and B_h. |
| B4-27 | closed | Levels indexed by j, with no leftover ε_k, C_k or ℒ_k; local-name note for T and ρ. |
| B4-28 | closed | The preview sentence glosses certificate, S, V_θ, L_g and L_∇g. |
| B4-29 | closed | Features indexed by j (no θ_k or c_k left); K stated as the feature count, not Lemma 4.1's constant; "Theorem 4.2's parameter count". |
| B4-30 | closed | "≤ −7γ/8, and in particular ≤ −3γ/4, the value the source carries forward". |
| B4-31 | closed | Reading notes at the top of `kernels-random-features` and `dual-sudakov` name the Part 18 objects and recommend reading after [[boffi-thm-4-2]]; the core constructions need only the declared prerequisites. |
| B4-32 | closed | B_Dm uses ‖·‖_op. |
| B4-33 | closed | Seeded values 5.637 ± 0.002 (10⁵ draws) and 19.594 ± 0.006 (4000 draws) agree with my 5.634 ± 0.003 and 19.59 ± 0.012. |

### New finding

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- |
| B4-34 | `margin-bounds` #failure: "If the initial-state distribution gives positive probability to a neighborhood of the equilibrium, a margin $\gamma>0$ fixed in advance is therefore violated on a positive fraction of trajectories by every candidate" | minor | The neighborhood on which every residual exceeds −γ shrinks with γ. So the premise must be positive probability for *every* neighborhood (as `trajectories-as-samples` correctly says), not for *a* neighborhood. A careful reader can repair it; a literal reader could think one fixed neighborhood suffices. | "gives positive probability to every neighborhood of the equilibrium". | closed at `da81acff…1f26`: Textbook #failure and Card #assumptions both say "every neighborhood"; no "a neighborhood" remains; strict KaTeX scan 0 errors (287 segments) |

### Summary of all dispositions

- **Slice A:** B4-1 … B4-20 closed (B4-20 by an accepted decline). B4-34 closed.
- **Slice B:** B4-21 … B4-33 closed (the B4-21 pilot part by an accepted decline).
- **Per station:**

| Station | Reader task |
| --- | --- |
| risk-erm | pass |
| concentration | pass |
| finite-classes | pass |
| uniform-convergence | pass |
| margin-bounds | pass |
| trajectories-as-samples | pass |
| rademacher-complexity (pilot, edits only) | no meaning change |
| rademacher-properties | pass |
| covering-dudley | pass |
| covering-properties | pass |
| kernels-random-features | pass |
| dual-sudakov | pass |

- **Gate:** no critical or moderate beginner finding is open in Part 17. From the
  beginner-review side, gate 1 (Teaching) is met for all twelve stations, with
  no open beginner findings.
- **Evidence scope:** this is an agent perspective, not evidence of actual student
  learning, and it is not a mathematical or source audit.

### Final addendum

- **B4-34:** closed at `margin-bounds.md` `da81acff72b9ebba962d2ae0aa8b2fcf291724c5b072d7917f87b409f31c1f26`.
  I read both patched passages and ran the strict KaTeX scan (0 errors).
- **`incremental-stability` 390 px flag:** closed; not a content defect. Per the
  coordinator, it was a checker race: the layout was still settling at the first
  measurement. A settle wait was added to `tools/m16-lesson-check.js`, and two
  clean Parts 16–18 reruns were reported by the coordinator. I did not rerun it.
- **Result:** all B4 findings are closed. Every Part 17 station passes the
  beginner reader-task gate (agent perspective only).
