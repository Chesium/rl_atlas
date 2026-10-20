# P1-D dynamics writer report: `lyapunov-functions`

Writer: P1-D dynamics pilot writer (resumed assignment, 2026-10-19). Coordinator: main session.
Current status: **accepted after independent reviews**, at raw SHA-256 `c29da439ff5ae7863910b01f0042398207d169f26870ea238c00eb833d86a4c9`. B1 Recheck 3 and M1 Recheck 2 cover this version; see [pilot-review.md](pilot-review.md). The writer did not accept its own work. The first-draft report and patch history below retain the evidence available at each earlier checkpoint.
This report replaces the interrupted-preparation report of the earlier P1-D run.

## Edited file and hashes

| File | Input raw SHA-256 | Output raw SHA-256 |
| --- | --- | --- |
| `content/15-dynamics/lyapunov-functions.md` | `aa47d1422692ecd054596a4a0af4636a7dbc6ea392bb5c118c617f2ed870608b` | `6c9dcd34ae47949e83c8e210816e1f60cc3c27a94d57e74b58d971590ba3e75b` |

Read-only dependencies used (unchanged): `stability.md` raw `ca4347a1…5b21`, `dynamical-systems.md` raw `aa44aa09…390c`, `lyapunov-equation.md`, `comparison-functions.md`, `time-dictionary.md`, `two-values.md`, `app/js/flows.js`, `lab/flows.js`, `content/notation.toml`, `app/js/math.js`, `build.py`. Source PDF `course/ese6180/khalil.pdf` (raw `36e14dfa…1da2`, per predecessor).

## What was preserved

- Station ID, `prereqs = ["stability"]`, `time = "both"`, the Khalil source entry with `review = "located"` and its locator `3rd edition, 2002, §§4.1–4.2`. The summary was lightly sharpened ("…can prove stability and attraction…").
- `[story]` settings `scene="flow"`, `world="linear"`, `metric=false`, and all four steps at `at = 0, 25, 75, 150`. Step prose was rewritten. The numbers it now uses are engine facts: the initial radius 2 (`F.initial`), the matrix and its eigenvalues, contour levels 0.5/1/2/4/8 (`picture()` in `app/js/flows.js`), `P` from `F.lyapunov([-1,3,0,-2])` = `[0.5,0.5,0.5,1]`, seed 1, RK4 0.02, 3 s. The statement "hard to see among these eight paths" was checked against the engine: only one of the eight scene trajectories grows in norm at all, from 0.995 to 0.997 (command below). No run number was invented.
- Textbook anchors `{#statement}`, `{#reasoning}`, `{#assumptions}`, `{#experiment}`, `{#uses}`; the `{{flow linear}}` demo (now inside a `::: figure {#fig-flow}` with a caption) and the Lab link; uses links `[[lyapunov-equation]]`, `[[learning-certificates]]`, `[[two-values]]`.
- Card anchors `{#idea}`, `{#intuition}`, `{#assumptions}`, `{#uses}`. The concept schema in `build.py` requires only `idea`.

## Structure delivered

Textbook (14 numbered sections, about 23 reading minutes per the build):
1 `motivation`: the obstacle (no solution formula; finitely many simulations), the energy analogy, and the question.
2 `setting`: local recall of the state in R^p, f on an open U, the continuation fact (recalled), the flow, equilibrium; Definition 1 (stability / attraction / asymptotic / global); Example 1 (decay vs rotation, solved).
3 `lie-derivative`: gradient, Definition 2 (positive definite), chain-rule derivation of d/dt V(phi_t) = grad V^T f, geometry; Example 2 (scalar and rotation).
4 `statement`: Theorem 1 (Khalil Thm 4.1) with the roles of positivity/decrease and a local-claim warning.
5 `reasoning`: sublevel set Omega_c in a ball with c < m_r; Lemma 1 (trapping) with proof; why the ball and bounded set matter (with a non-example); proof of part 1 (epsilon-delta); proof of part 2 (V converges, contradiction on compact shell with margin m, V -> 0 implies x -> 0); where compactness and strictness enter; region-of-attraction remark.
6 `rates`: sandwich/decrease constants, Steps 1–3 with the integrating factor, norm-rate formula, energy vs norm factor two, scalar check.
7 `nonnormal`: A=[-1,3;0,-2]; d/dt|x|^2 = 0.16 > 0 at (0.8,0.6); exact trajectory peak; Lyapunov equation solved entry by entry; P, completed square, eigenvalues, c1/c2/c3, check at (0.8,0.6), ellipse extents, rates and conservativeness.
8 `failures`: rotation (stable, not attractive); damped oscillator (true but unproven by this V, LaSalle pointer, deferred); positivity failure (xdot=x, V=-x^2; zero function); unbounded sublevel sets.
9 `assumptions`: checklist; local vs global; Theorem 2 (Khalil Thm 4.2) with proof idea; non-example and Khalil Exercise 4.8 pointer; why quadratic V is global.
10 `discrete`: Delta V; x/2 example with ratio 1/4 and norm 1/2; the grad V^T g mistake; discrete theorem recalled, not proved.
11 `experiment`: Figure 1 (`{{flow linear}}`) caption stating the fit/test margins (0.15 / alpha = 0.1, from `F.experiment` and the Lab method text) and that it is finite evidence; Lab link.
12 `scope`: proven vs not proven; certificate vs RL value (`\val{v_\pi}` vs `\cert{V}`, `[[two-values]]`).
13 `exercises`: six native `::: question` blocks with worked answers (Lie derivative + rates; stability vs attraction diagnosis; rate conversion; Euler discretization check; asymptotic-but-not-exponential assumption check; positive-definiteness classification).
14 `uses`.

Card: `idea` (statement with conditions), `intuition` (mechanism and key formulas as a list), `assumptions` (checklist), `pitfalls` (new), `check` (new; four `::: question` blocks distinct from the Textbook exercises), `uses`. No Textbook paragraph is copied into the Card.

## Concepts

Consumed (recalled locally, not relied on from compressed upstream prose): autonomous ODE and fixed controller (`dynamical-systems`), flow phi_t(xi), equilibrium, epsilon–delta stability and attraction (`stability`, restated as Definition 1), existence/continuation of solutions (recalled from Khalil §3.1, Theorem 3.3; linked `[[ode-sensitivity]]`).

Introduced: open set U, compact set (as closed and bounded), gradient, positive definite function, derivative along trajectories / Lie derivative V̇ = ∇V^T f, Lyapunov function/certificate, sublevel set Omega_c, trapping, region-of-attraction estimate, c1/c2/c3 sandwich constants, energy rate c3/c2 vs norm rate alpha = c3/(2 c2) and prefactor sqrt(c2/c1), radial unboundedness, Lyapunov equation (used, developed in `[[lyapunov-equation]]`), nonnormal matrix, one-step decrease Delta V.

Notation: state dimension p; xi initial state; phi_t(xi) flow; Euclidean norm; `\cert{V}` used sparingly (Story step 3, Theorem 1, scope paragraph, Card idea/pitfall); alpha is a norm rate (plain `\alpha`, not the `\alp` step-size macro); no `\gam`. Matrix entries are written p_11, p_12, p_22 to avoid colliding with the dimension p. The domain is called U rather than D, because the contract reserves D for the initial distribution in Part 18. The limit of V along a trajectory is V_infinity; m_r, m_a, m are positive margins.

## Example computations (all verified)

Scripts are in `C:\Users\chesi\AppData\Local\Temp\claude\C--C-rl-atlas\40ac566d-4011-4145-8e00-f14ff8c6b81f\scratchpad\p1d\` (`checks.py`, `checks2.py`, `katex_check.js`).

`PYTHONIOENCODING=utf-8 python checks.py` (key output):

```
== 1. scalar xdot=-x, V=x^2
t=1.0: x=0.625395 V=0.391119 e^-2t*xi^2=0.391119 Vdot=-2x^2=-0.782238 -2V=-0.782238
== 2. Lyapunov equation A^T P + P A = -I, A=[-1,3;0,-2]
P = [[1/2, 1/2], [1/2, 1]]            (exact Fractions)
A^T P + P A = [[-1, 0], [0, -1]]
trace 3/2 det 1/4
eig(P) 0.19098300562505255 1.3090169943749475  (= (3-sqrt5)/4, (3+sqrt5)/4)
energy rate c3/c2 = 0.7639320225002103  (= 3-sqrt5)
norm rate c3/(2c2)= 0.38196601125010515 (= (3-sqrt5)/2)
sqrt(c2/c1)= 2.618033988749895          (= (3+sqrt5)/2)
== 3. Euclidean distance derivative at x=(0.8,0.6)
f(x)= (1.0, -1.2) d|x|^2/dt = 2 x.f = 0.16 ; x^T(A+A^T)x = 0.16
max eig(A+A^T)= -3+sqrt10 = 0.16227766016837952
V(x)= 1.16 gradV= (1.4, 2.0) Vdot=gradV.f= -1.0 -|x|^2= -1.0
== 4. exact trajectory from xi=(0.8,0.6)
max |x(t)| = 1.0077213018595468 at t= 0.1431  V monotone: True
t=1.0: x=(0.7129,0.0812) |x|=0.7175 V=0.3186 Vbound=0.5404 |x|bound=1.7869
max_t ||e^{At}|| = (1.011928844303947, 0.223)
== 5. Story levels: sublevel ellipse extents
c=1: |x| in [0.874,2.288]
== 6. rotation f=(-x2,x1), V=|x|^2: Vdot=0.0
== 7. discrete x_{k+1}=x_k/2, V=x^2: V(g)-V = -0.75 x^2, ratio=0.25 each step
== 8. indefinite V=x1^2-x2^2 at (0,1): V=-1, Vdot=4   (computed, not used in the lesson)
```

`PYTHONIOENCODING=utf-8 python checks2.py` (key output):

```
Ex1 f=(-x1+x2,-x1-x2): Vdot equals -2|x|^2 at 5 random points
Ex2 damped oscillator: Vdot equals -2 x2^2 at 5 random points; eig = -0.5 ± 0.8660254j
Ex3 (c1,c2,c3)=(2,8,4): energy 0.5, norm 0.25, prefactor 2.0
Ex4 Euler (1-h): h=0.5 -> DeltaV/x^2=-0.75, ratio 0.25; h=2 -> 0, 1; h=2.5 -> 1.25, ratio 2.25
Ex5 x=xi/sqrt(1+2xi^2 t) satisfies xdot=-x^3 (finite difference -0.239672878155 vs -0.239672878128 at t=1); x*sqrt(2t) -> 0.986 at t=10
Rotation formula satisfies f=(-x2,x1), norm preserved (0.80622577 both)
AA^T=[[10,-6],[-6,4]] != A^TA=[[1,-3],[-3,13]]; A(3,-1)=(-6,2)=-2(3,-1)
exact nonnormal trajectory satisfies the ODE (finite difference matches)
Card: x-x^3 gives Vdot = 2x^2(1-x^2) > 0 at 0.1, 0.5, 0.9; map 0.9x: DeltaV/x^2=-0.19, ratios 0.81 / 0.9
xdot=x, V=-x^2: Vdot = -2x^2
V=x1^2/(1+x1^2)+x2^2 on x1-axis: 0.5, 0.990, 0.999999 (< 1)
```

Engine checks (`node -e` from repo root, using `lab/node` and `RL.flows`):

```
engine P [0.5, 0.5, 0.5, 1]                     (F.lyapunov([-1,3,0,-2]))
scene trajectories (rng(1), 8 x F.initial): only #7 grows in norm, 0.995 -> 0.997; |x| at at=150 between 0.030 and 0.255
residual at (0.8,0.6), rate 0.1, quadratic P: -0.768  (no violation squares drawn in the Story)
F.experiment({name:'linear',metric:false,seed:1,samples:4,holdout:20}): bad=0/20, feasible=true, rate=0.1, trainingRate=0.15
```

The demo caption in the lesson does not repeat the 0/20 count; the demo prints it itself.

## Source locators consulted (Khalil, *Nonlinear Systems*, 3rd ed., 2002; PDF page = printed + 16)

- §4.1, Definition 4.1, printed p. 112: stability, asymptotic stability.
- p. 113: implicit global existence requirement; the energy motivation (pendulum).
- p. 114: derivative along trajectories; Theorem 4.1 statement.
- pp. 115–116: proof of Theorem 4.1 (ball B_r, alpha = min on sphere, Omega_beta, trapping, delta, shell contradiction with gamma). The lesson's proof follows this structure in original prose. It adds an explicit Step 3 (V -> 0 implies x -> 0 via the shell minimum), which Khalil covers by "repetition of previous arguments".
- p. 117: positive (semi)definite terminology; quadratic forms.
- p. 123: the unbounded-sublevel-set example V = x1²/(1+x1²) + x2², radial unboundedness.
- p. 124: Theorem 4.2 (Barbashin–Krasovskii) and its proof; pointer to Exercise 4.8.
- p. 182: Exercise 4.8 (system for which that V has negative derivative but the origin is not GAS). Pointer only; the system is not reproduced or verified in the lesson.
- §4.2, pp. 127–128: positive limit sets, invariance; Theorem 4.4 (LaSalle) and Corollary 4.1. Pointer only, deferred.
- §3.1, Theorem 3.3, printed p. 94: continuation of solutions in a compact set. Recalled, not proved.
- §4.5, Theorem 4.10, printed p. 154: exponential stability from k1|x|^a ≤ V ≤ k2|x|^a, V̇ ≤ -k3|x|^a. The lesson's rate derivation is the a = 2 case, derived locally; the text cites it as "§4.5, printed p. 154". This is outside the front-matter locator §§4.1–4.2. Front matter was not changed (see requested changes).

No private PDF text was copied; the prose and examples are original.

## Claims: derived locally / recalled / deferred

Derived here: the chain rule for V̇; Lemma 1 (trapping) and its use for global existence; Theorem 1 part 1 and part 2 in full (given the recalled continuation fact and standard calculus facts: extreme value theorem, monotone convergence, intermediate value, fundamental theorem of calculus); exponential comparison and the norm bound with the factor two; all worked examples and exercise answers; the P matrix, its positivity, eigenvalues and rates; the distance-growth point; the rotation, damped-oscillator V̇, xdot=x, -x³ and discrete examples.

Recalled without proof: existence, uniqueness and continuation for C¹ vector fields (Khalil §3.1, Thm 3.3); the symmetric-matrix eigenvalue sandwich (one-line justification given); existence/uniqueness/positivity of Lyapunov-equation solutions for Hurwitz A (`[[lyapunov-equation]]`); the discrete-time Lyapunov theorem (stated as holding for continuous g; proof not given).

Deferred: LaSalle's invariance principle (Khalil Thm 4.4, Cor 4.1), only stated informally; the Exercise 4.8 counterexample system (pointer only); Theorem 2 has only a proof idea (the reduction to the bounded set {V ≤ V(xi)}, then "Steps 1–3 run unchanged").

## Known weaknesses and uncertainties (for reviewers)

1. The Theorem 2 proof idea asserts the attraction steps "run unchanged" with Omega = {V ≤ V(xi)}. Step 3 there uses min V on {a ≤ |x| ≤ r} with that r, which works, but the reviewer should confirm the reduction is stated clearly enough. Global stability itself follows from part 1 because the hypotheses hold on U = R^p.
2. The statement that the discrete-time analogue "holds for continuous g" is recalled, not proved, and not sourced to a printed page in Khalil §§4.1–4.2. The math reviewer should check it, or ask for a softer wording or a source (e.g., Khalil's discrete-time exercises or another text).
3. Section length: the Textbook is about 23 reading minutes. The proof section is the densest part; the beginner reviewer should check that Steps 1–3 can be reproduced.
4. "hard to see among these eight paths" in Story step 2 is an engine-checked qualitative claim, not a pinned test number. If the scene RNG or engine changes, the coordinator should recheck it.
5. Theorem 1's hypothesis "f continuously differentiable" is stronger than Khalil's "locally Lipschitz". This was chosen for the audience; it is a stated, sufficient specialization.
6. The definition of attraction given here (a neighborhood whose points converge) matches Khalil's asymptotic-stability clause. "Attractive" as a stand-alone term is our wording.
7. The `[[ode-sensitivity]]` and `[[time-dictionary]]` links point to stations whose current prose is compressed. The lesson does not rely on them for any inference.

## Requested shared changes (coordinator-owned; none blocking)

- Optional: add Khalil §4.5 Theorem 4.10 (printed p. 154) to the source locator if the coordinator wants the rate derivation's citation in metadata, e.g. `locator = "3rd edition, 2002, §§4.1–4.2, Theorem 4.10 (§4.5)"`. Status remains `located`.
- Optional: `content/routes.toml` link `lyapunov-functions -> stability` has `at = "Positive definite function with strict decrease, invariant domain and forward existence"`. It still fits; the coordinator might mention the bounded trapped sublevel set.
- `notation.toml`: no change needed. The lesson uses the existing `\cert{V(x)}` symbol entry.
- The Story prose changed. No engine, scene or fingerprint changed, so no recompute of story curves is needed.

## Checks actually run

- `python build.py` (from repo root): `140 stations, 140 written … 0 warning(s)`; wrote `app/content.js`, `rl_atlas.html` (generated; the coordinator owns and rebuilds them). Other writers' files were also built without error.
- KaTeX: `node katex_check.js C:/C/rl_atlas content/15-dynamics/lyapunov-functions.md` rendered all 620 math spans with the vendored KaTeX and the atlas macros: 0 errors.
- Compiled-structure inspection (`node -e` on `app/content.js`): 14 sections in order; Definitions 1–2, Examples 1–2, Theorems 1–2, Lemma 1 numbered; all `\ref` targets resolve (§, equation, Theorem, Lemma links); 6 Textbook questions, 4 Card questions; Card ids `idea,intuition,assumptions,pitfalls,check,uses`; lists render as `<ul>/<ol>`.
- `node --test tests/flows.test.js tests/routes.test.js`: 14/14 pass.
- Not run: the full `node --test`, browser checks, and visual inspection at desktop/mobile sizes in both themes. These belong to the coordinator.

An authoring bug was found and fixed during drafting. A `sed` replacement containing `\ref` inserted carriage returns (GNU sed reads `\r` as CR). This truncated two proof titles and four sentences. They were repaired with exact edits, and the proof titles no longer contain `\ref`: the block-title parser does not resolve it.

## Patch for B1 (beginner review `docs/m16/beginner-review.md`, reviewed hash `6c9dcd34…e75b`)

Patched file: `content/15-dynamics/lyapunov-functions.md`, raw SHA-256 `6c9dcd34…e75b` became `234bf79145ecf6b297781c6255a49f18f00431faddac4bf39543d093d3379659`.

| Finding | Disposition | Change |
| --- | --- | --- |
| #1 (moderate) cross-lesson notation | Fixed (lyapunov part) | The Euler step `h` is renamed `\Delta t` in exercise 4 and its answer: `x_{j+1}=(1-\Delta t)x_j`, `\Delta V=\Delta t(\Delta t-2)x^2`. The discrete index `k` became `j` (`j=0,1,2,…`) in `#discrete`, the Card intuition and the Card check question. `#setting` gains a clause after the quantifier paragraph saying that δ is a radius in state space here and a failure probability in the learning-theory lessons. `\phi_t` is kept. |
| #2 (minor) symmetric-matrix bridge | Fixed | In `#nonnormal`: a positive definite matrix is defined via Definition 2. The 2×2 eigenvalues come from the trace and determinant (tr P = 3/2, det P = 1/4). A labelled Rayleigh bound `\label{rayleigh}`, equation (9), is derived via orthonormal eigenvectors. P is positive definite iff all its eigenvalues are positive. A new "Operator norm" paragraph (also in `#nonnormal`) gives ‖M‖ = max_{‖u‖=1}‖Mu‖, ‖Mv‖ ≤ ‖M‖‖v‖ and ‖M‖² = λ_max(MᵀM) from the Rayleigh bound. The example AᵀA = [[1,−3],[−3,13]] gives λ_max = 7+3√5 ≈ 13.708 and ‖A‖ ≈ 3.702 (checked: `python -c` printed 13.70820393249937, 3.7024591736438324). The 1.012 growth factor is identified as the largest operator norm of ξ ↦ φ_t(ξ). Anchor for the Theorem 4.2 lesson: `[[lyapunov-functions]]` §`#nonnormal` (section 7). |
| #3 (minor) strict inequality in `lem-trap` | Fixed | The proof now says "starts strictly below r (because Ω_c does not touch the sphere)". |
| #4 (minor) global stability clause | Fixed | The `thm-global` proof idea now adds: "…so φ_t(ξ) → 0. Stability is part 1 of Theorem 1 with U = ℝᵖ. Together these give global asymptotic stability." |
| #5 (minor) name exponential stability | Fixed | After `norm-rate` in `#rates`, a new paragraph defines (global) exponential stability as ‖φ_t(ξ)‖ ≤ Ce^{−αt}‖ξ‖ on a region, and notes that it implies asymptotic stability (δ = ε/C). |
| #6 (record only) | No change | The discrete-time theorem stays deferred. Its destination is for the coordinator's Phase 2 coverage ledger. |
| Coordinator: Theorem 4.10 locator | Done | The same source entry's locator string is now `3rd edition, 2002, §§4.1–4.2, 4.5`. `review = "located"` is unchanged. The prose already cites Theorem 4.10 (§4.5, printed p. 154). |

Checks rerun after the patch:
- `python build.py`: 0 warnings.
- KaTeX: 667 spans, 0 errors.
- Compiled refs resolve, including Definition 2 and equation (9). The section order and anchors are unchanged.
- `node --test tests/flows.test.js tests/routes.test.js`: 14/14 pass.
- `grep` finds no remaining `h` step or `k` index.

No browser checks were run. Meaning changed only by additions (definitions and clauses); no existing claim was altered. The mathematical review should use the new hash.

## Patch for M1 (math review `docs/m16/math-review.md`, reviewed hash `234bf791…9659`)

Patched file: `content/15-dynamics/lyapunov-functions.md`, raw SHA-256 `234bf791…9659` became `199abd2ca520923195bbaec538c34f461062dab8fad9dddb03def9450eae8029`.

| Finding | Disposition | Change |
| --- | --- | --- |
| L1-1 (minor) non-conservative rounding | Fixed | The `#nonnormal` displayed bounds now use exact constants: V(φ_t(ξ)) ≤ e^{−(3−√5)t}V(ξ) and ‖φ_t(ξ)‖ ≤ ((3+√5)/2)e^{−((3−√5)/2)t}‖ξ‖. A sentence says decimals must be rounded in the safe direction, e.g. 2.619e^{−0.381t}. The Card bullet now gives the exact norm bound, then "rounded conservatively: 2.619e^{−0.381t}". The ≈0.764 / ≈0.382 / ≈2.618 decimals stay only as approximate values of the exact constants, not inside inequalities. The t = 1 comparison values (0.540, 1.787) were computed with exact constants and are unchanged. |
| L1-2 (minor) maximal interval in `lem-trap` | Fixed | The proof now works on the maximal existence interval [0, t*). It shows the first-exit contradiction within that interval, concludes the trajectory stays in Ω_c on [0, t*), and then uses the continuation fact to get t* = ∞. |
| L1-3 (minor) overstatement; ∇V ≠ 0 | Fixed | In `#failures`, "can never yield convergence" became "cannot establish convergence". In `#lie-derivative`, the gradient-direction sentence starts "Where ∇V(x) ≠ 0, …" and the obtuse-angle sentence says "at a state where ∇V(x) ≠ 0". |
| L1-4 (minor) C¹ labelling | Fixed | `#setting` now says C¹ is a convenient sufficient condition, not a necessary one: Khalil assumes only local Lipschitz continuity, and later lessons state their own weaker assumptions. The Card assumptions bullet adds "(a convenient sufficient condition; local Lipschitz continuity is enough)". |

Nothing else changed. Checks rerun:
- `python build.py`: 0 warnings.
- KaTeX: 678 spans, 0 errors.
- `node --test tests/flows.test.js tests/routes.test.js`: 14/14 pass.
- `grep` confirms that no rounded decimal remains inside an inequality.

No browser checks were run. The edits change wording and precision but not any conclusion. The coordinator may want M1 to recheck L1-1 and L1-2 against the new hash.

## Patch for beginner recheck 2 (N7)

The `#setting` aside now defines "locally Lipschitz" inline: near each point there is a constant L with ‖f(x)−f(y)‖ ≤ L‖x−y‖ for nearby x, y, and every C¹ f has this property. Nothing else changed. New raw SHA-256: `c29da439ff5ae7863910b01f0042398207d169f26870ea238c00eb833d86a4c9` (previous `199abd2c…8029`). `python build.py` gives 0 warnings, and KaTeX renders all spans with 0 errors.
