# M16 Phase 5 independent beginner review (Part 18)

Reviewer: `reviewer-P5B`, assignment P5-B (independent beginner reviewer, Part 18).
I authored none of the reviewed material. This is an **agent perspective**, not
evidence from actual beginner students, and not a source/proof audit (that is
P5-M's role). Review date 2026-10-20 (UTC).

Persona: basic calculus, linear algebra, elementary probability, possibly
introductory RL; no control or learning-theory background beyond the declared
prerequisite lessons (`content/15-dynamics/`, `content/16-contraction/`,
`content/17-learning-theory/`, and the accepted pilot `boffi-thm-4-2`).

## Candidate hashes reviewed (raw SHA-256, verified with Git Bash `sha256sum`; all match the packets)

| File | Writer | SHA-256 |
| --- | --- | --- |
| `content/18-certificates/learning-certificates.md` | writer-P5A | `0f811201dcd2f93ea002e4560264d701b2ac926fd97986a9748354f069f5faeb` |
| `content/18-certificates/certificate-classes.md` | writer-P5A | `5fe77b1ded922c5273fe2b15c467d781bf34fdf7c068fd8a8f8baea6d6acc7fe` |
| `content/18-certificates/boffi-lemma-4-1.md` | writer-P5A | `3457177043745d6703e74b5b7612385904f339634af7d87a33485fd329132f62` |
| `content/18-certificates/boffi-thm-4-2.md` (diff only) | writer-P5A | `223c63e00ce08c8032892843e9390d5bca9f704ad9dbbe44818ad641a3a838e4` |
| `content/18-certificates/boffi-thm-4-3.md` | writer-P5A | `7407b7813171df90b0325ac1e87c09baaa551e78cc59e71bd976a1513caa9b26` |
| `content/18-certificates/boffi-thm-4-4.md` | writer-P5A | `05caabba98940061ba8121e6b9d81116180606681a34435fc673ff18c820b065` |
| `content/18-certificates/certificates-in-practice.md` | writer-P5B | `cf4e61c69c2578a1395c10a52c533ed1012f3b026df21be21d553b159ff16862` |
| `content/18-certificates/boffi-thm-5-1.md` | writer-P5B | `d898e060a7c03a41c2228fc2c8c1bad6e5474b32e87a5dc64df94da5b4344d0e` |
| `content/18-certificates/boffi-thm-5-2.md` | writer-P5B | `b77adb06bb24f5ba7a812bc7791c6996385521972fee800d5e107a528303a22e` |
| `content/18-certificates/vdp-certificates.md` | writer-P5B | `a8f6d88a1d382ba7ca2c01d64e1f9c4361f3a23f1d9692f231bebf9590cca098` |

## Procedure and evidence limits

- Route order read: `learning-certificates` → `certificate-classes` →
  `boffi-lemma-4-1` → `boffi-thm-4-2` (consistency diff only) → `boffi-thm-4-3` →
  `boffi-thm-4-4` → `certificates-in-practice` → `boffi-thm-5-1` → `boffi-thm-5-2` →
  `vdp-certificates`. (`certificates-in-practice` was read first, during batch 1,
  before batch 2 was released. It was then reconsidered in route position; that
  changed no finding.) Each Textbook was read in full before its Card.
- Answers were hidden on the first pass by a scratch script (scratchpad
  `hide.py`, outside the repo). It printed each lesson with the text between `---`
  and the closing `:::` of every `::: question` block replaced by `[ANSWER HIDDEN]`.
  I attempted every reader task and exercise before revealing the answers.
- Every worked number was recomputed with throwaway Python. This included exact
  binomial limits, the Calafiore threshold, the eigenvalues and cones, a 7200-direction
  simulation of `err(I)≈0.77`, the sine-perturbation maxima, the 10-monomial `B_m`,
  `B_{Dm}` and split integral, the cosine-feature constants, `sup‖e^{At}‖`, `r_b`
  and `u_ξ(3)`, the bump-metric `ν(Z_b)≈0.0167` and the Van der Pol Hessian bound.
  **I found no numerical error.** Agreement is reported at the lesson's printed
  precision.
- The writer reports `docs/m16/writer-phase5a.md` and `writer-phase5b.md` were not
  read. The writer-P5B handoff was printed in the same command as the workflow
  file at session start, so I saw its three-line "open issues" list before
  reviewing. Those issues (5.1 added hypotheses, the 5.2 rate and radius) are also
  stated openly in the lessons themselves. They did not determine any finding.
- Layout: I did not run the browser check, because it writes outside my owned
  paths. The coordinator reports a passed mobile gate for this candidate: build
  with 0 warnings, and a clean Part 18 quick check of 20 views. Visual inspection
  remains a coordinator gate.
- Card vs Textbook: all ten Cards are short references (statement or idea,
  intuition and one example, assumptions, proof sketch where schema requires),
  distinct from the developed Textbooks.

## Per-station ledger

### learning-certificates

Passages checked: #statement, #setting, #residual (def-lyap-residual), #positivity,
#reasoning (def-traj, def-problem, empirical margin loss), #err (def-err, three
readings, holdout limit), #example (all three settings), the near-equilibrium
Cauchy–Schwarz argument, the relative-margin paragraph, #nonnormal, #experiment
in-text question, #assumptions, all four exercises, and the Card.

Reader tasks:
- `ẋ=-x`, `V=x²`: residual `-x²`, `H_V(ξ)=-ξ²e^{-2t_max}`. A fixed γ>0 is
  feasible for every sample only when 𝒟 avoids a neighborhood of 0 and the horizon
  is finite. With 𝒟 covering 0 the feasibility probability is `0.864^n`→0, and on
  `[0,∞)` the problem is never feasible. **Pass.**
- Positivity is separate from residual feasibility. `x²-1` and `V≡-1` pass decrease
  without being positive. **Pass.**
- `err` is the probability that a fresh trajectory has a positive residual at some
  time; it counts trajectories, not time fractions. **Pass.**
- `n` counts independent trajectories (exercise 3: n=10, not 10 000). **Pass.**

Exercises: all four attempted before the answers and all agreed (γ≤0.092; `3x²-0.5`
not a certificate, residual −0.5 at 0; n=10; residual 0.2 at 45° and −1.8 at (1,0)).

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-1 | #setting "each followed over the same time interval $T$ that starts at 0"; #example `T=[0,t_max]` | minor | Here `T` is an interval. The prerequisite `trajectories-as-samples` uses a number `T` with interval `[0,T]`, and its bridge example writes `T=1`. A reader moving between the two may read `T=[0,0.5]` and "T=1" inconsistently. | One clause: "(unlike [[trajectories-as-samples]], where $T$ is the endpoint, $T$ here names the interval itself)". | Fixed (writer-P5A). Convention sentence in #setting maps prereq "T=1" to t_max=1. Rechecked: interval reading of all examples consistent. **Closed.** |
| B5-2 | #experiment in-text question answer "and does not bound the class's radius" | minor | "Radius" is undefined at this point; the radius premise belongs to Theorems 4.2/4.3. | Say "and its fit has no fixed parameter bound, which the class-based theorems need ([[boffi-thm-4-3]] #lab)", or drop the clause. | Fixed. Answer now says the fit "has no fixed bound on the size of P" (link 4.3); no undefined term. **Closed.** |

### certificate-classes

Passages checked: #statement, def-reach, def-joint, #values (ex-sine and perturbed
residual), #lipschitz (def-bounded, `B_h`, `L_h`, Lyapunov `L_h`), lem-traj and its
proof, #reasoning (`L_g`, `L_{∇g}`, operator norm, lem-param and its proof, the
Assumption 4.2 consequence), #example (ex-quadratic with the nearby-certificate check
and the shared-system residual constants), #failure (three cases), #assumptions,
the four exercises, and the Card.

Reader tasks:
- Why `sin(mx)/m` is small in value but not in the joint norm: the stacked-vector
  length is 1 at `x=0` for every m. The perturbed residual reaches 0.073/0.249/0.250,
  and I reproduced these values. **Pass.**
- Three-parameter quadratic: `L_g=√(3/2)B_S²` (via `2x₁²x₂²≤½‖x‖⁴`),
  `L_{∇g}=√6 B_S` (via the eigenvalue of `MMᵀ`). With `B_S=2.03` and `B_θ=2` the
  numbers are 5.05, 4.97, 10.09 and 9.94. **Pass.**
- Parameter-Lipschitz step: FTC along the segment, Cauchy–Schwarz, then the
  operator-norm bound on the mixed derivative and `√(a²+b²)≤a+b`. **Pass.**

Exercises: all four agreed (4, 4, 4, 4, √5; "nothing useful without gradients";
0.0136; `3B_V²`).

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-3 | #reasoning and lem-param proof, "the mixed derivative ... $M$", "let $M(s)$ be the mixed matrix"; #example `M(x)=[[2x_1,2x_2,0],[0,2x_1,2x_2]]` | minor | `M(x)` is the contraction metric throughout Part 16 and in the later Part 18 stations. Reusing `M(x)` for a `p×k` derivative matrix, in a lesson whose prerequisites include the metric, invites confusion. | Rename it (for example `G(x,θ)`, or `D_θ∇_x g`). | Fixed. Mixed derivative is G(x,θ) in definition, proof (G(s)) and ex-quadratic (G, GGᵀ); note on M reserved. No stray M remains. Constants re-derived unchanged. **Closed.** |
| B5-4 | #exercises Q3 "how far apart can two parameters be ... according to lem-param?" vs answer "... $\le0.0136$ suffices" | minor | The question reads as asking for a maximum separation, but the lemma gives only a sufficient one. | Reword: "How close must two parameters be to guarantee ...". | Fixed. Question asks "how close must…"; answer says sufficient, not maximal. **Closed.** |

### boffi-lemma-4-1

Passages checked: #question, #objects (complexity convention and the three changes,
the constant-residual example), #statement (lem-41) and the "well defined", "which
solution" and "provenance" remarks, #mechanism, #reasoning (recipe, ex-interface with
scaling, concrete class, confidence term), #confidence, #premises, #failure (Massart
comparison), the four exercises, and the Card.

Reader tasks:
- Premises and exact printed form: δ∈(0,1); Assumptions 4.1–4.2; feasibility of
  (3.2); class and γ fixed in advance; i.i.d. initial states. Bound
  `K(log³n R_n²/γ² + 2log(log(4B_h/γ)/δ)/n)`, with worst-sample absolute complexity
  of the residual class. **Pass.**
- Leading term for `R_n²=3C/n`: `3KC log³n/(γ²n)`. I reproduced the scalings 0.330/0.220/0.143,
  ×0.666 and ×0.433, C≈2.39×10⁷, 7.2×10⁹ and the confidence term 10.2. **Pass.**
- Invoked rather than proved: the lemma itself (adapted from Srebro–Sridharan–Tewari
  Thm 5, unchecked); the fast-rate mechanism is a sketch only. **Pass.**

Exercises: all four agreed (15.6 and 0.0012, crossing near 1.9×10⁷; three violated
premises; 1.38 vs −0.80; ½ and 0).

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-5 | #reasoning ex-interface, "A concrete class": "$I\approx1.353$ is an entropy integral, provided the class contains a certificate with identically zero residual" | minor | The worked case uses `I`, `24I` and the zero-residual hypothesis, which are developed only in the *next* station (`boffi-thm-4-2`). They are labeled as coming from there, but a route-order reader cannot check them yet. The arithmetic is still reproducible as given. | Add "(derived in [[boffi-thm-4-2]] Step 3–4; take it as given here)", or define `I=∫_0^1√log(1+2/u)du` inline. | Fixed. I defined inline; points to Step 5 of boffi-thm-4-2, which I confirmed contains the integral and the zero-residual member. **Closed.** |

### boffi-thm-4-2 (consistency diff only)

Passages checked: the full `git diff` (two added cross-link sentences in #setting and
Step 1). For continuity, I grepped the accepted lesson for the constants that
`boffi-lemma-4-1` quotes (`I≈1.353`, `24I`, `151`, `4B_h` confidence form). They
agree. The interval notation `T=[0,t_max]` agrees with `learning-certificates`.
No meaning change. **No findings.**

### boffi-thm-4-3

Passages checked: #question, #class (three features, θ coordinates), #statement and
the four remarks, #reasoning Steps 1–6 and the entry-count comparison, #example
(ex-ten), the growth paragraph, #lab, #failure, #assumptions, the four exercises,
and the Card.

Reader tasks:
- `d(d+1)/2` vs `d log²d` at d=10: 55 vs 53.0, so there is no real saving. I
  reproduced the d=100 and d=1000 comparisons and that the ratio first reaches 2 at
  d=73. **Pass.**
- The split of the entropy integral: volume below `a`, Sudakov above it. With
  `a=1/√d` the two parts are 5.34 and 3.64 (total 8.98); the best split near 0.205
  gives 8.72, and the crossing near 0.21. I followed the integration-by-parts bound
  using the recall from `dual-sudakov`. **Pass.**

Exercises: all four agreed (21 vs 19.3; first row/column zero, so effectively d=9;
same order `√d log d`; radius chosen after data, with two repairs).

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-6 | #reasoning Step 1 "with $m=m(x)$ and $J=Dm(x)$" | minor | `J` is the Jacobian of `f` in Part 16, `certificates-in-practice` and Theorem 5.2. Here it silently means the feature Jacobian. | Write `Dm` directly, or use another letter. | Fixed. Step 1 uses the feature Jacobian Dm throughout (both display lines), labeled as not the Jacobian of f. **Closed.** |

### boffi-thm-4-4

Passages checked: #question, #class (features, class (4.5), Assumption 4.2 check),
#statement and "Reading the bound", #reasoning Steps 1–9, #example (ex-cosine),
#dictionary, #density, #assumptions, the five exercises, and the Card.

Reader tasks:
- Error terms: the finite-class complexity term at `K≍κ` features; the confidence
  term (in the lemma's form, with `8B_h/γ+2`, related to the printed one for
  δ≤½); the feature-failure probability `2/n²` (printed `1/n²`); and the extra
  `γ/(4√n)` from the shift, which is absorbed. Features are drawn **before and
  independently of** the trajectories, are used only in the analysis, and are
  conditioned on in Step 6. **Pass.**
- Changing the dictionary after fitting makes the final class depend on the data,
  so Lemma 4.1's fixed-class premise fails. The repairs are a pre-declared list
  with δ/M, or fresh trajectories. **Pass.**

Exercises: all five agreed (γ/8 change, either shift works; the implication chain;
×16 vs ×4; dictionary chosen by data; `B_θ=√(4+π²)`, `B_{∇V}≈7.45`, loose). I
recomputed the worked constants: 3.30, 18.5, 1806, κ≈3.09×10⁶, 3.0×10¹⁰, a≈0.0044,
374.7/√K, K≥7.2×10⁹ and 9.3×10⁷, max residual −0.118, c≈2.98×10³, ratio 3.32 and
`𝔼β²=4`.

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-7 | #exercises Q5 answer | minor | The question asks whether the bound is tight "for $V(x)=-\sin(2x)/(2x)$". The answer improves the general bound to 4 but never gives that member's actual largest slope (about 0.87), so the comparison the question invites is left undone. | Add one line: `sup|V'|≈0.87` (at `2x≈2.08`), so even 4 is loose by about ×4.6. | Fixed. Answer gives 0.87 near 2x≈2.08 (I re-verified 0.8724 at 2x=2.0816), ×8.5 and ×4.6. **Closed.** |
| B5-8 | Step 3 `a=γ/(8√2L_h)`, Step 2 coefficients `c_j` vs Step 3 constant `c≈2.98×10³`; #class feature distribution `ν` | minor | One lesson uses `c` for both the coefficient vector and a numeric constant. Across adjacent stations, `a` is the split point in 4.3 and `ν` is the uniform measure in 5.1 and 5.2. Each is local and defined, but the stacking adds friction. | Rename the constant to `c_0`; optionally note "ν here is the feature distribution, not the uniform measure of [[boffi-thm-5-1]]". | Partly fixed: constant renamed c₀ (Step 3, Card), ν clarified as feature distribution. Rename of `a` declined (locally defined; matches kernels-random-features). **Accepted**; no objection. **Closed.** |

### certificates-in-practice

Passages checked: #statement (three kinds of claim), #gram (definition, ex-gram,
exactness for `(1,x)`, non-uniqueness, Motzkin, the Lab's metric), #reasoning
(affine residual, convex feasible set, Dykstra, the two outcomes), #approximation,
#holdout (bound derivation, ex-holdout, the four "read it no further" bullets,
Calafiore), #assumptions, the five exercises, and the Card.

Reader tasks:
- `m=(1,x)`: `mᵀQm=a+2bx+cx²`. PSD Q gives `p(x)=zᵀQz≥0` with `z=m(x)`. The
  counterexample `[[1,2],[2,1]]` gives −3 at x=−2. **Pass.**
- A convex fit on sampled constraints plus a holdout pass is evidence, not a
  certificate. It establishes a finite-list fact plus a Monte Carlo estimate of the
  checked-time violation probability for one frozen metric. It says nothing between
  grid times, about unsampled states or about the support of 𝒟, and it checks no
  fixed margin. **Pass.**
- Hoeffding holdout statement counting trajectories:
  `err≤K/m+√(log(1/δ)/(2m))`, with m=100 trajectories (not 15 100 states). For
  K=6, δ=0.05 the limit is 0.182. **Pass.**

Exercises: all five agreed (`[[4,−2],[−2,1]]`, PSD with eigenvalues 0 and 5; the
conclusion is wrong because a PSD Gram exists; affine vs cone; 0.10 and the selection
caveat; "unresolved" ≠ infeasible). I recomputed the exact binomial limits 0.829,
0.115 and 0.0295, the Calafiore ε≈0.0988 at n=1000, d=78, β=0.01, and the
selection-adjusted 0.173 and 0.058.

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-9 | #gram `m(x)` (monomial vector) vs #holdout `m` (holdout count); Card #intuition uses both in consecutive sentences; Ex 4 answer "the $J$ candidates" vs Jacobian `J` | minor | Within one lesson, `m` is both a monomial vector and a sample count, and `J` is both the Jacobian and a number of candidates. Context disambiguates, but the Card puts `m=(1,x)` and "among $m$ ... trajectories" side by side. | Use `N_{ho}` (or `m_{ho}`) for the holdout count, and another letter for the candidate count. | Fixed (writer-P5B). Holdout count is N throughout text, bound, example, exercise and Card, with an explicit note; candidate count N_c. Note: prerequisites trajectories-as-samples/learning-certificates still call the holdout count m, but the local note makes the switch explicit; acceptable. **Closed.** |
| B5-10 | #reasoning "$c_{x,u}(Q)=u^{\mathsf T}(J^{\mathsf T}M+MJ+\dot M+2\alpha M)(x)u$" and "$\langle A_{x,u},Q\rangle-b_{x,u}$" | minor | `J` is not recalled locally; it comes from the linked [[contraction-metrics]]. The matrix inner product `⟨A,Q⟩` and the symbols `A_{x,u}`, `b_{x,u}` are used without definition. A beginner has not seen a trace inner product. | Add "($J=Df$, the Jacobian)" and "where $\langle A,Q\rangle=\operatorname{tr}(A^{\mathsf T}Q)=\sum_{ij}A_{ij}Q_{ij}$ and $A_{x,u}$, $b_{x,u}$ collect the coefficients". | Fixed. J=Df recalled; ⟨A,Q⟩=Σ A_ij Q_ij = tr(AᵀQ) defined; A_{x,u}, b_{x,u} described. **Closed.** |
| B5-11 | #holdout "Draw $m$ fresh initial states independently from $\mathcal D$"; the "radius-two disk" first appears in the bullet list after ex-holdout | minor | The lesson never says what 𝒟 is for the Lab (uniform on the radius-two disk) before the confidence statement relies on it. 𝒟 itself is recalled only implicitly. | In #statement or #holdout: "initial states are drawn from $\mathcal D$, uniform on the disk of radius 2 in the Lab ([[trajectories-as-samples]])". | Fixed. 𝒟 named as initial-state distribution, uniform on the radius-2 disk in the Lab, before the bound. **Closed.** |
| B5-12 | #reasoning residual with "target norm rate $\alpha$" vs #holdout bullet "The Lab fits with ... norm rate $\alpha+0.05$, and tests at $\alpha$" | minor | The sampled-constraint section presents the fitted residual at rate α. Only later does the reader learn that the *fit* uses α+0.05 and α is the *test* rate. On a first read, the halfspaces seem to be built at α. | In #reasoning, write the constraint at the training rate `α+0.05` (or say "at the training rate, which the Lab sets to α+0.05"), keeping α for the test. | Fixed. #reasoning distinguishes test α and α_fit=α+0.05; residual and Ex 3 answer written at α_fit; holdout bullet consistent. Re-read the convexity argument: unchanged and correct. **Closed.** |

### boffi-thm-5-1

Passages checked: #question, #setting (full-dimensional X, ν, balls, S, q, def-viol
and the sign remark, convex-domain gradient constants, def-incr, radius, eroded
sets), #statement (i)–(iii) and "Reading the conclusions", #reasoning Steps 1–6 with
lem-noball and the strictness remark, the equilibrium-ball paragraph, #example
(ex-shared), the scaling paragraph, the (iii) computation, #from-err (three cautions),
#failure, #assumptions, the five exercises, and the Card.

Reader tasks:
- A small-measure violation set cannot contain a ball of radius r(ε): the ball's
  ν-measure is exactly ε by the choice of r, so containment contradicts ν(X_b)<ε.
  **Pass.**
- Nearby good point → transport → absorption: the eroded state's ball lies in X
  and contains a good ξ′; `β(r,t)` bounds the separation; the Lipschitz transfer
  gives the additive error `Eβ(r,t)`; outside `r_b` it is absorbed by `ηλμr_b²`.
  **Pass.**
- Unit-disk p=2 worked case: `r=√ε`. I reproduced `r_b²≈183.6r`,
  `r_b≈13.55ε^{1/4}`, the values 4.28, 1.36 and 0.43, the threshold 3.0×10⁻⁹ and
  `u_ξ(3)≈0.230`. I independently checked `sup‖e^{At}‖≈1.0119`, the eigenvalues
  of P, the norm rate 0.382 and the prefactor 2.618. **Pass.**
- What it does NOT give: no certificate inside `𝔹(0,r_b)` or outside `S̃`, and
  nothing valid everywhere. The added hypotheses enter at Step 2 (strict
  `ν(X_b)<ε`) and Step 4 (gradient bounds over a convex set, used as Lipschitz
  constants). **Pass.**

Exercises: all five agreed (r=0.05, X̃=[−0.95,0.95]; ε/16 and 16× trajectories;
trivial at 0, absorption fails near 0 for every η; truncated Gaussian via a density
lower bound; Step 5 fails without μ).

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-13 | #reasoning remark "for small $\delta>0$ the slightly larger ball $\mathbb B(\xi,r+\delta)$ ... within $r+\delta$" | minor | `δ` is reserved for the failure probability on this route (it appears with that meaning in #from-err of this same lesson). Here it is a radius increment. | Use `s` or `\epsilon'` for the increment. | Fixed. Increment is τ with a note on the paper's δ; δ now only failure probability in 5.1. **Closed.** |
| B5-14 | #example "eigenvalues of $P$ are $m$ and $L$"; def-incr exponential case `β(s,t)=Ce^{-at}s` vs Step 4 "Write $a=\phi_t(\xi)$ and $b=\phi_t(\xi')$" | minor | `a` is an exponential rate in one paragraph and a state in the proof. `m` and `L` (eigenvalues) collide with the earlier `m` (holdout count / monomials) and the many `L_\*` Lipschitz constants. These are small but cumulative. | Use `x_a, x_b` (or `y, y'`) in Step 4, and `λ_min(P), λ_max(P)` in the example. | Fixed. Steps 4–5 use y, y′; example uses λ_min(P), λ_max(P) consistently (decrease, β prefactor, gradients, μ, closing paragraph). Numbers unchanged and re-verified. **Closed.** |
| B5-15 | #exercises Q3 "why can conclusion (ii) not be extended to $x=0$ by choosing a smaller $\eta$?" | minor | At `x=0` itself (ii) holds trivially, as the answer concedes. The real point concerns a *neighborhood* of 0. As phrased, the question invites a wrong "it can" answer. | "... not be extended to a neighborhood of $x=0$ ...". | Fixed. Question now asks about a whole neighborhood of 0 and notes (ii) holds trivially at 0; answer aligned. **Closed.** |

### boffi-thm-5-2

Passages checked: #question, the three-contractions paragraph, #setting
(variational transport, def-prolonged, V and q-form, Rates paragraph, def-true and
the rate-letter remark, measure on pairs, Z_b, cap radius, B_H, regions),
#statement and its rate remark, "Reading it", #reasoning Steps 1–5, #radius (two
problems, rescaling check, rb-repaired), #example (linear case, ex-bump), the Van der
Pol Hessian paragraph, #assumptions, the five exercises, and the Card.

Reader tasks:
- Assumed vs learned: true contraction of the *real* dynamics in an unknown `M_⋆`
  (norm rate `λ_⋆`) is assumed and never tested. The learned `M` and its small
  violation measure on state–direction pairs are what the data supply. **Pass.**
- Energy vs norm rate: the proof gives `⪯-(1-η)λM`, energy rate `(1-η)λ` and norm
  rate half of it. The paper's final line `-2(1-η)λM` claims twice the norm rate.
  Exercise 1 confirms 0.5 vs 0.25. **Pass.**
- Three meanings of contraction: Bellman/value, dynamical/trajectory,
  statistical/complexity. Only the dynamical one is used. **Pass.**
- Linear-f worked case and the flagged radius discrepancy: with `B_H=0` the
  printed `r_b=0`. The bump metric (I reproduced `w≈1.607`, `xᵀ∇w≈−22.05`,
  `q≈+18.8`, and `ν(Z_b)≈0.0167` by simulation with `T=[0,∞)`, `r≈0.398`)
  violates at `x̂` inside the claimed region. The time-rescaling check that the
  printed `r_b²` scales by `k` is reproducible on its own. **Pass with help:** the
  Step 1 derivation behind the "missing rate" diagnosis could not be reproduced
  from the declared prerequisites (see B5-16). I accepted the diagnosis through the
  independent rescaling check instead.

Exercises: all five agreed (0.25 vs claimed 0.5; r≈0.398 vs 0.141, cap factor <1;
block-diagonal Jacobian, `κ=√(L/m)` survives; the bump is interior, so the radius
must grow with `B_{∇q}`; (a) Bellman, (b) dynamical assumed for `M_⋆` and concluded
in weaker form for `M`, (c) statistical).

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-16 | #reasoning Step 1 "Write $M_\star=\Theta^{\mathsf T}\Theta$, so that $F=(\Theta J+\dot\Theta)\Theta^{-1}$ has symmetric part at most $-\lambda_\star I$ (this is def-true in the coordinates $\Theta\delta x$)"; "In its coordinates the coupling becomes $s\,\Theta H\Theta^{-1}$ ... For a vector $(y,z)$" | **moderate** | This is the consequential step: the lesson's "missing rate" correction to the printed radius rests on it. A route reader cannot reproduce it. `Θ̇` (derivative of `Θ(x)` along the flow), the generalized Jacobian `F`, "symmetric part", and the coordinates `(y,z)` are undefined. The prerequisite `contraction-metrics` never introduces a factorization `M=ΘᵀΘ` or `F` (I checked: no `Θ` or `F` there). The equivalence "metric inequality ⇔ sym(F)⪯−λ_⋆I" is asserted rather than shown. | Add a short bridge. Set `δz=Θ(x)δx`, so `d/dt‖δz‖² = δxᵀ(JᵀM_⋆+M_⋆J+Ṁ_⋆)δx ≤ −2λ_⋆‖δz‖²`, which is the same as `δzᵀF δz ≤ −λ_⋆‖δz‖²` with `F=(ΘJ+Θ̇)Θ^{-1}` and `Θ̇=Σ_i f_i∂Θ/∂x_i`. Then define `y=Θ Δx`, `z=sΘ Δδx` for the prolonged pair, and state that the off-diagonal block is `sΘHΘ^{-1}` with norm at most `s√(L/m)B_H‖δx‖`. If any piece is taken from the source without proof, label it so. | Fixed. Redid the reader task **without help** from Step 1a/1b alone: derived δż=Θ̇δx+ΘJδx=Fδz, d/dt‖δz‖²=2δzᵀFδz, and the equivalence with def-true (Θ invertible, so every δz arises; steps reverse). Multiplied out diag(Θ,ϑΘ)·[[J,0],[H,J]] + diag(Θ̇,ϑΘ̇) times diag(Θ⁻¹,Θ⁻¹/ϑ) to get F′ with coupling ϑΘHΘ⁻¹, bounded by ϑ√(L/m)B_H‖δx‖; the quadratic-form bound −(λ⋆−ϑκ_H/2) follows. The missing-rate bullet now rests on Step 1b and I can follow it; the rescaling check remains consistent (τ). Smoothness of Θ is stated as an assumption (Step 1a, assumptions list). **Closed; task now pass.** |
| B5-17 | #example ex-bump: "A $1200\times1200$ grid gives $\nu(Z_b)\approx0.017$"; "so $r_b\gtrsim53$" | minor | The horizon `T` is not stated (the 0.017 figure needs rays to run to the origin, i.e. `T=[0,∞)` or long enough). `r_b≳53` needs a value of η; I obtain 53 only with η=½ (η→1 gives ≈37.5). Both conclusions survive, but the numbers cannot be reproduced without guessing. | State "$T=[0,\infty)$" in the setup and "(with $\eta=\tfrac12$; any $\eta<1$ gives $r_b>37$)". | Fixed. T=[0,∞) stated; η=½ for 53 and >37 for any η<1. **Closed.** |
| B5-18 | #statement "suppose $\nu(Z_b)\le\varepsilon$" vs Step 3 "(strictly, this needs $\nu(Z_b)<\varepsilon$ ...)" | minor | [[boffi-thm-5-1]] puts the strict inequality into its theorem statement as an added condition. Here the theorem keeps `≤` and mentions strictness only in a parenthesis within the proof. A reader comparing the two statements sees an inconsistency. | Either state `<ε` in thm-52 as an added condition (as in 5.1), or add it to the theorem's title line "with the proof's sign and rate" → "..., rate and strict measure condition". | Fixed. Theorem now assumes ν(Z_b)<ε as added strict condition (title, Step 3, assumptions, Card), matching 5.1. **Closed.** |
| B5-19 | Rates paragraph "$q\le-cV$ ... energy rate $c$" vs Step 1 "$c=\sqrt{L/m}\,B_H\sup\|\delta x\|$"; #setting radius uses `s` as cap/ball radius vs Step 1 weight `s` | minor | Two letters each carry two meanings within one lesson, and the proof is already the hardest passage in Part 18. | Rename the coupling constant (for example `κ_H`) and the weight (for example `w` or `σ`). | Fixed. Coupling constant κ_H, weight ϑ, reconstructed factor C_M, rescaling factor τ; s is only a radius, c only the generic rate. No stale κ/s/k found by grep. **Closed.** |
| B5-20 | #exercises Q5 (a) "$\|Tv-Tw\|_\infty\le\gamma\|v-w\|_\infty$" | minor | γ is the fixed margin throughout Part 18; here it is the RL discount, without comment. The rubric's convention is "γ margin, not discount". | Write "(γ here is the discount factor)", or use `γ_{disc}`. | Fixed. Ex 5(a) states γ is the RL discount, not a margin. **Closed.** |

### vdp-certificates

Passages checked: the Story (four steps; byte-identical to HEAD, read for
consistency only), #statement, #system (dynamics, Jacobian, origin eigenvalues),
#reasoning (energy `x²+y²`, Euclidean metric), #measure, #predict, #adaptation,
#experiment, #assumptions, the four exercises, and the Card.

Reader tasks:
- `d/dt(x²+y²) = 2xy+2y(−(x²+1)y−x) = −2(x²+1)y²`. This is ≤0 everywhere and zero
  on the whole axis `y=0`, so decrease is not strict there. The rate test at α=0.1
  fails at every `(x,0)`, x≠0. **Pass.**
- Prediction of fresh-trajectory violation rates: (1) more trajectories usually
  give fewer violations, with per-seed exceptions and unresolved fits; (2) a lower
  test rate on a *fixed* metric can only shrink the set. But the Lab's α change also
  moves the training rate α+0.05, so the observed change mixes two effects. My
  prediction matched the lesson, including the refit caveat. **Pass.**
- Separation: this is an adapted finite experiment (different integration,
  constraints, derivatives, solver, rate and scale), not a reproduction of Figure 1,
  and not a proof (true contraction is untested, and the 5.2 radius needs
  correction). **Pass.**

Exercises: all four agreed (−2 holds, 0 fails; direction (1,0), with `J₁₁=0` so the
displacement rotates rather than shrinks; no without refit, yes with refit; this
seed only, and 0/100 does not confirm 5.2). I recomputed the values −0.45, −0.04,
−0.202, the Hoeffding radius 0.122 with the 0.638 and 0.182 limits, and the origin
eigenvalues.

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-21 | #system "$\ddot x+a(x^2+k)\dot x+\omega^2x=0$ with $a=k=\omega=1$" vs #predict "suggests a rate of order $k/n$" | minor | Within one lesson, `k` is first a damping constant and then the parameter count. Also, "order k/n" drops the `log³n` and `1/γ²` factors that `boffi-thm-4-2` and `boffi-thm-5-1` #from-err take care to keep. | Write "order $k\log^3n/(\gamma^2n)$, roughly $k/n$ up to logarithms". Optionally rename the damping constant `k₀`, or note the reuse. | Fixed. Damping constant k₀ (paper's α, k renamed, with note); #predict gives k log³n/(γ²n), roughly k/n up to logs and constants. **Closed.** |
| B5-22 | Story step 4 "test rate 0.1, training rate 0.15" | minor (optional) | The Story says "rate" without "norm". The Textbook makes the norm/energy distinction carefully, and a Story-first reader might take 0.1 as an energy rate. The Story was intentionally kept byte-identical; this is noted for the coordinator, not required. | If the Story is ever touched: "test norm rate 0.1, training norm rate 0.15". | Declined (Story kept byte-identical to HEAD; verified). Request forwarded to coordinator in writer report. **Accepted**; optional item, no objection. **Closed.** |

## Cross-station notation check (against prerequisites and the rubric)

- **γ** = fixed margin everywhere in Part 18 except 5.2 Ex 5(a) (B5-20); the
  discount is disavowed explicitly in `learning-certificates` #reasoning. OK
  otherwise.
- **δ** = failure probability everywhere except the 5.1 strictness remark (B5-13).
  The `δx`, `δξ` displacement notation is inherited from Part 16 and is fine.
- **α** = norm rate with the energy-rate factor 2, stated in `learning-certificates`,
  `certificates-in-practice` and `vdp-certificates`. 5.1 and 5.2 use **λ** as an
  explicitly labeled *energy* rate (5.2 also uses `λ_⋆` as a norm rate, also labeled).
  Other uses of α are flagged in place: the coefficient density (4.4) and the
  damping coefficient (vdp). Consistent.
- **n** counts independent trajectories in every station. The 12 000 / 15 000 /
  15 100 counterexamples are present and correct.
- Letter reuse across adjacent stations (`ν`, `M`, `J`, `m`, `a`, `c`, `θ/Θ`) is
  the main residual friction for a beginner; see B5-3, B5-6, B5-8, B5-9, B5-14,
  B5-19. None changes a conclusion.

## Severity summary (first pass; see Recheck below for current status)

| Station | Critical | Moderate | Minor | Reader tasks |
| --- | --- | --- | --- | --- |
| learning-certificates | 0 | 0 | 2 | 4/4 pass |
| certificate-classes | 0 | 0 | 2 | 3/3 pass |
| boffi-lemma-4-1 | 0 | 0 | 1 | 3/3 pass |
| boffi-thm-4-2 (diff) | 0 | 0 | 0 | continuity check pass |
| boffi-thm-4-3 | 0 | 0 | 1 | 2/2 pass |
| boffi-thm-4-4 | 0 | 0 | 2 | 2/2 pass |
| certificates-in-practice | 0 | 0 | 4 | 3/3 pass |
| boffi-thm-5-1 | 0 | 0 | 3 | 4/4 pass |
| boffi-thm-5-2 | 0 | 1 (B5-16) | 4 | 3 pass, 1 pass with help |
| vdp-certificates | 0 | 0 | 2 (1 optional) | 3/3 pass |

Teaching gate (beginner perspective): every station answers its opening question,
computes and interprets its worked example, includes a failure or non-example, states
its scope, and has exercises with solutions that test the objective. Its Card is
distinct from its Textbook. B5-16 must be closed before `boffi-thm-5-2` passes
gate 1. The minors should be recorded with dispositions.

## Recheck (2026-10-20, writer patches)

Hashes verified with `sha256sum`; all match the coordinator's recheck packet. The
"Beginner patch" sections of `writer-phase5a.md` and `writer-phase5b.md` were read
for dispositions only. For each finding I re-read the whole section that carried the
reasoning, not only the patched line, and re-ran the affected calculations:
`0.8724` slope, the 5.1 example constants, and the hand derivation of `F` and `F′`.
`boffi-thm-4-2` is unchanged (`223c63e0…38e4`). Its Step 5 contains the integral
`I` and the zero-residual member, as the patched lemma 4.1 now says. The vdp Story
(lines 1–35) is still byte-identical to HEAD. I did not rerun the build or browser
checks. The writers report a build with 0 warnings, a clean strict KaTeX scan, and
a clean Part 18 quick check of 20 views at these hashes.

**B5-16 reader task, redone without help.** From Step 1a alone:
- `δż = Θ̇δx + ΘJδx = (ΘJ+Θ̇)Θ⁻¹δz = Fδz`, so `d/dt‖δz‖² = 2δzᵀFδz`.
- Comparing this with the metric-energy derivative gives def-true ⇔ `δzᵀFδz ≤ −λ⋆‖δz‖²`, i.e. sym(F) ⪯ −λ⋆I. This uses the invertibility of Θ.

From Step 1b:
- The block product gives `F′ = [[F,0],[ϑΘHΘ⁻¹,F]]`, with coupling at most `ϑκ_H`. The bound `−(λ⋆−ϑκ_H/2)` follows, and so does the admissible weight `ϑ ≤ 2(1−ω)λ⋆/κ_H`.
- The paper's `−λ⋆(1−ϑκ_H/2)` agrees only at λ⋆=1, which is the missing rate.

The task result is now **pass** (previously pass with help).

Declined or partial items: B5-8 (`a` not renamed) and B5-22 (Story unchanged) are
**accepted**. Both are minor, defined locally or optional, and the reasons given are
sound.

New findings (none critical or moderate):

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-23 | `boffi-thm-5-2` Card #statement "Assume the true dynamics contract in $M_\star$ ($mI\preceq M_\star\preceq LI$, rate $\lambda$)" | minor | This text predates the patch; I missed it on the first pass. The Card does not say that this λ is the true system's **norm** rate, while the same Card uses λ as the learned metric's **energy** rate in `q≤−λV`. The Textbook separates `λ⋆` (norm) from `λ` (energy) and notes that the printed theorem sets them equal. A Card-only reader cannot see this. | "contract in $M_\star$ (..., norm rate $\lambda_\star=\lambda$, as printed)". | Second recheck at `a95c8f9c…ba236`: the Card now reads "at norm rate $\lambda_\star$ (the metric inequality $\preceq-2\lambda_\star M_\star$; the paper takes $\lambda_\star=\lambda$)", and the learned condition is called "the energy-rate condition $q\le-\lambda V$". **Closed.** |

Patch-introduced issues: none found. I grepped for stale `M(s)`/mixed `M`, `J` in 4.3
Step 1, holdout `m`, `δ` in the 5.1 remark, `a,b` in 5.1 Steps 4–5, and `c`, `s`, `κ`,
`k` in 5.2, and found no leftovers. Step 1b's block coordinate `z` sits next to Step 1a's `δz`. Each is
defined where it is used, and I did not count this as a finding. The holdout count is now `N` in
`certificates-in-practice` but `m` in the prerequisites `trajectories-as-samples` and
`learning-certificates`. The lesson flags the switch explicitly, which I find adequate.

## Final status (first recheck; superseded below)

| File | Rechecked hash | Findings | Status |
| --- | --- | --- | --- |
| learning-certificates.md | `0b6efa06…429a9` | B5-1, B5-2 closed | **pass** |
| certificate-classes.md | `344efbd7…0f5e2` | B5-3, B5-4 closed | **pass** |
| boffi-lemma-4-1.md | `7e87e66a…fe1935` | B5-5 closed | **pass** |
| boffi-thm-4-2.md (diff) | `223c63e0…38e4` (unchanged) | none | **pass** (consistency diff) |
| boffi-thm-4-3.md | `7874c6e7…40d7f` | B5-6 closed | **pass** |
| boffi-thm-4-4.md | `3b187510…dc583` | B5-7 closed; B5-8 partial, accepted | **pass** |
| certificates-in-practice.md | `75b44bd2…f4097` | B5-9 to B5-12 closed | **pass** |
| boffi-thm-5-1.md | `eb5bf636…59d446` | B5-13 to B5-15 closed | **pass** |
| boffi-thm-5-2.md | `ce72ed1d…619ac5` | B5-16 (moderate) closed; B5-17 to B5-20 closed; B5-23 minor open | **pass** (gate 1, beginner view); B5-23 to be dispositioned |
| vdp-certificates.md | `36eb0507…f0539` | B5-21 closed; B5-22 declined, accepted | **pass** |

## Second recheck (2026-10-20, after the mathematical-review patches)

**Scope.** The coordinator announced meaning changes to `boffi-thm-5-1`
(`48e3e204…caf71c`) and `boffi-thm-5-2` (`a95c8f9c…ba236`), and edits to
`vdp-certificates` (`e78c2971…cd3fd6d`) and the Step 9 of `boffi-thm-4-4`
(`b5b5b20a…c175391e`). I verified all four hashes. I attempted the reader tasks
before opening `docs/m16/math-phase5.md`, then read it for context only.

**Unannounced hash changes.** `boffi-lemma-4-1` (`c2a13ed5…b868d1`), `boffi-thm-4-2`
(`98de2abe…19774d9`) and `boffi-thm-4-3` (`672ef036…a78fde6`) also differ from my
first recheck. They are the writer-P5A patches for M5-3 and M5-8, recorded in
`writer-phase5a.md`. I checked those edits for readability:
- `C→C_{\mathcal V}` in the lemma example and Card, with a sentence on how it differs from the universal $C$.
- `M(s)→G(s)` in the pilot's `lem-param` proof, which matches `certificate-classes`.
- In 4.3, "among $d\ge3$ … first reaches 2 at $d=73$" with the $d=2$ caveat.

All three are clearer and introduce no new symbol issue. No beginner finding.

### boffi-thm-5-1: reader task redone without help

Task: which conditions must hold before Theorem 4.2's `err` can feed Theorem 5.1,
and why (3.2) does not supply them. My attempt, before reading #from-err:
- **Residual and measure.** The residual must be the Lyapunov residual with $\rho(v)=\lambda v$, so the error event is exactly $X_b$. 𝒟 must be uniform on $X$, or have a density bounded below.
- **Learned certificate.** $\widehat V_n$ must be $C^2$, satisfy $\widehat V_n\ge\mu\|x\|^2$ on $S$, and have gradient bounds for $V$ and $q$ on a convex set containing $S$.
- **Dynamics.** They must be $C^1$ and incrementally stable.
- **Why (3.2) does not supply them.** Problem (3.2) only imposes sampled decrease with a margin. It says nothing about positivity, smoothness or bounds off $S$. The quadratic class of Theorem 4.2 contains $\theta=0$ and indefinite $P$.

The patched #from-err lists exactly these, including the $\theta=0$ and
indefinite-matrix point. It also explains why data-dependent constants are harmless,
since 5.1 is deterministic in the $V$ it receives. **Pass.** The new strictness
remark (the second repair, reading $\mathbb B(\xi,r)\subseteq\operatorname{int}X$)
is clear.

### boffi-thm-5-2: reader task redone without help

- **The printed claim.** Assume true contraction with $\lambda_\star=\lambda$, a learned $M\succeq\mu I$ and $\nu(Z_b)<\varepsilon$. Then $J^{\mathsf T}M+MJ+\dot M\preceq-(1-\eta)\lambda M$ on $\widetilde S(r_b)$, with $r_b$ proportional to $\sqrt{B_H}$.
- **Why it is false.** For linear $f$, $B_H=0$ gives $r_b=0$. In `ex-bump` every premise holds ($f=-x$ contracts with $M_\star=I$; smooth $M\succeq I$; $\nu(Z_b)\approx0.017<0.02$). Yet $q\approx+18.8\|\delta x\|^2$ at $\hat x\approx(0.514,0)$, which lies in $\widetilde X\subseteq\widetilde S(0)$.
- **What the reconstruction gives instead.** The same conclusion, with $\lambda_\star$ free, gradient bounds of $V$ and $q$ over a convex set containing the reachable pairs, and the radius $r_b^2=\sqrt2\,rEC_M/(\eta\lambda\mu)$, where $C_M=\max\{\sqrt{L/m},(L/m)^{3/2}B_H/\lambda_\star\}$. That radius never vanishes, and in the bump example it makes the conclusion vacuous rather than false.

**Following every step from the declared prerequisites.**
- Steps 1a/1b: as in the first recheck.
- Step 2: with $\omega=\tfrac12$, $\vartheta=\min\{1,\lambda_\star/\kappa_H\}$ gives $\sqrt{L'/m'}\le\sqrt{L/m}/\vartheta=C_M$, because $\kappa_H=(L/m)B_H$.
- Steps 3–4: $\beta(\sqrt2r,0)=\sqrt2rC_M$, and absorption needs $\eta\lambda\mu r_b^2\ge E\sqrt2rC_M$, which is exactly `rb-repaired`.
- Step 5: Liouville's formula is not in the prerequisites, but its statement is given in place and is enough to see invertibility.
- The square-root smoothness fact is recalled without proof and labelled as such.

**Pass.**

**Card vs Textbook.** These agree: the norm rate $\lambda_\star$ is kept separate
from the paper's tie, the printed radius is "false for linear $f$", the
reconstructed radius and $C_M$ match, the convex-domain bounds are marked as added,
and the energy/norm rates match. B5-23 is closed (above).

### vdp-certificates and boffi-thm-4-4 Step 9

- **vdp.** The #adaptation "Rate" bullet now explains that A.5 prints the test without $M$ on the right and reads it as $\preceq-2\eta\lambda M$. The measured quantity counts an eigenvalue "above the engine's tolerance $10^{-5}$". Both read clearly and are consistent with `certificates-in-practice` (tolerance $10^{-5}$). The Story is still byte-identical to HEAD. No finding.
- **4.4 Step 9.** This is readable. It separates the atlas's reading (probability over the data alone, $1-\delta-2/n^2$) from the paper's joint-probability route and its gap. One inference stays implicit; see B5-27.

### New findings

| ID | Location | Severity | Diagnosis | Suggested repair | Disposition / recheck |
| --- | --- | --- | --- | --- | --- |
| B5-24 | `boffi-thm-5-1` thm-51 title "with the proof's sign and two added conditions", the following paragraph "The two conditions added here are …", #assumptions, and the Card #assumptions | minor | #setting now labels $f\in C^1$ as **added** (the paper's §3 asks only for continuity), so the lesson has three added conditions. The title, the paragraph after the theorem, the assumptions list and the Card still count two and do not mark $f\in C^1$ as added. The Card's strictness bullet also says the printed $\le$ "needs a boundary argument that fails", but the Textbook now offers a second repair: the interior reading. | Say "three added conditions" (or list them) in the title and paragraph. Mark "$f\in C^1$ (added)" in both assumption lists. In the Card, add "or read the ball as lying in $\operatorname{int}X$". | open |
| B5-25 | `boffi-thm-5-2` thm-52 "Let $r_b$ be given by \ref{rb-repaired} below" | minor | The theorem's central quantity is defined only two sections later, after the proof. A reader of the statement cannot see the radius without jumping ahead, while the printed (false) radius is displayed just above it. This invites using the wrong formula. | Display $r_b^2=\sqrt2\,r(B_{\nabla q}+\lambda B_{\nabla V})C_M/(\eta\lambda\mu)$ and $C_M$ inside the theorem, and keep the label where it is derived, or move the label into the theorem. | open |
| B5-26 | `boffi-thm-5-2` status wording: the note after thm-52 ("The mathematical reviewer recomputed it … agent check"), #radius ("it has not been independently audited"), #assumptions ("pending independent review"), Card proof ("an independent proof audit has not been recorded") | minor | The status is stated four ways. "Pending independent review" is now stale, because an independent agent review has recomputed it. "Not independently audited" can be read as contradicting "the mathematical reviewer recomputed it". A beginner cannot tell what has and has not been checked. Also, the Step 5 parenthesis quotes Lemma C.3's "$\exp\int_0^tA$" without saying that $A(s)$ is the paper's name for $J(\phi_s(\xi))$. | Use one phrase everywhere, e.g. "agent-checked by the independent mathematical reviewer; no human proof audit", and drop "pending independent review". Add "($A(s)=J(\phi_s(\xi))$ in the paper's notation)". | open |
| B5-27 | `boffi-thm-4-4` Step 9 "But $\operatorname{err}(\widehat V_n)$ depends on the data only … So, with probability at least $1-\delta-2/n^2$ over the data alone" | minor | The key inference is left implicit. The event $\{\operatorname{err}\le\text{bound}\}$ depends only on the data and contains $E\cap G$, so its probability (over the data, which equals its joint probability) is at least $\Pr(E\cap G)\ge1-\delta-2/n^2$. "Depends on the data only" is the reason, but a beginner may not see why that licenses dropping the features. | Add one sentence stating the containment and the equality of the data-only and joint probabilities for a data-only event. | open |

None of B5-24 to B5-27 blocks gate 1. The reader tasks are reproducible as written.

## Final status (second recheck; current)

| File | Current hash | Findings | Status |
| --- | --- | --- | --- |
| learning-certificates.md | `0b6efa06…429a9` | B5-1, B5-2 closed | **pass** |
| certificate-classes.md | `344efbd7…0f5e2` | B5-3, B5-4 closed | **pass** |
| boffi-lemma-4-1.md | `c2a13ed5…b868d1` | B5-5 closed; M5-8 rename read, no issue | **pass** |
| boffi-thm-4-2.md | `98de2abe…19774d9` | none; M5-8 rename read, no issue | **pass** |
| boffi-thm-4-3.md | `672ef036…a78fde6` | B5-6 closed; M5-3 edit read, no issue | **pass** |
| boffi-thm-4-4.md | `b5b5b20a…c175391e` | B5-7 closed; B5-8 accepted; B5-27 minor open | **pass** (B5-27 non-blocking) |
| certificates-in-practice.md | `75b44bd2…f4097` | B5-9 to B5-12 closed | **pass** |
| boffi-thm-5-1.md | `48e3e204…caf71c` | B5-13 to B5-15 closed; B5-24 minor open | **pass** (B5-24 non-blocking) |
| boffi-thm-5-2.md | `a95c8f9c…ba236` | B5-16 to B5-20 and B5-23 closed; B5-25, B5-26 minor open | **pass** (minors non-blocking) |
| vdp-certificates.md | `e78c2971…cd3fd6d` | B5-21 closed; B5-22 accepted | **pass** |
