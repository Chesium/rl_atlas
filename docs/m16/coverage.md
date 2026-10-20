# M16 station coverage

The Phase 0 inventory remains [route-contract.md](route-contract.md), covering
37 stations. This ledger records delivered reader-task and review evidence;
planned examples alone do not pass a station. Phase 2/3 acceptance is recorded in
[phase2-3-review.md](phase2-3-review.md), with candidate hashes in the independent
reports. Phase 4 is accepted below. Phase 5's saved reviews and final integration
are recorded below; Phase 6 whole-track acceptance remains separate.

## Phases 2 and 3

All fifteen tasks below passed the final beginner and mathematical rechecks. Beginner
review must attempt the tasks before consulting exercise answers. Mathematical
review separately checks definitions, assumptions, consequential proofs and
primary-source fidelity. Integration also checks Cards, existing Stories and Lab
instructions. An agent beginner perspective does not measure student learning.

| Station | Reader task / teaching target | Beginner | Mathematics | Integration |
| --- | --- | --- | --- | --- |
| dynamical-systems | Close F(x,u)=x+u with pi=-2x, solve the resulting flow and distinguish an integrator | Pass B | Pass M | Pass |
| stability | Use epsilon/delta order; classify decay and rotation; separate attraction and stability | Pass B | Pass M | Pass |
| lyapunov-functions | Compute a Lie derivative and explain trapping, attraction and energy/norm rates | Pass B, supplemental task | Pass M, rounding recheck | Pass |
| lyapunov-equation | Derive product rule, verify the shared P, and explain integral positivity/endpoints | Pass B | Pass M | Pass |
| comparison-functions | Integrate Vdot <= -2V+1, interpret the floor and K/KL bounds | Pass B | Pass M | Pass |
| ode-sensitivity | Construct the integral equation; derive sensitivity and identify finite escape | Pass B | Pass M | Pass |
| converse-iss | Separate existence from representability; derive forced decay and the ISS gain | Pass B | Pass M | Pass |
| time-dictionary | Prove discrete decrease consequences and derive Euler's step-size range and squared metric factors | Pass B | Pass M | Pass |
| two-values | Derive time-shift cost identity and diagnose the discounted decrease obstruction | Pass B | Pass M | Pass |
| controller-or-certificate | Distinguish policy/model/witness learning and diagnose a failed candidate | Pass B | Pass M | Pass |
| incremental-stability | Form the doubled system, quantify uniform pairs and derive scalar input mismatch | Pass B | Pass M | Pass |
| variational-dynamics | Differentiate the flow, compare tangent and finite displacements, test Jacobian geometry | Pass B | Pass M | Pass |
| contraction-metrics | Differentiate metric energy and transport a path to bound finite distance | Pass B | Pass M | Pass |
| three-contractions | Identify each space, operator, norm and constant; explain why no physical guarantee follows from Bellman contraction | Pass B | Pass M | Pass |
| imitation-deployment | Unroll the visited-state recurrence, compute e3=.175 and floor .2, reject an average-loss substitution | Pass B | Pass M | Pass |

## Phase 4

All twelve tasks below passed the final beginner (`reviewer-P4B`) and mathematical
(`reviewer-P4M`) rechecks at the hashes in [beginner-phase4.md](beginner-phase4.md)
and [math-phase4.md](math-phase4.md), with the one layout-only exception recorded in
[phase4-review.md](phase4-review.md). Integration passes the build, Node tests,
guarantees regression, the full desktop/mobile, both-theme Chrome/Edge sweep and
screenshot inspection.

| Station | Reader task / teaching target | Beginner | Mathematics | Integration |
| --- | --- | --- | --- | --- |
| risk-erm | Compute empirical/population loss on the two-state memorizer; derive the ERM 2ε decomposition | Pass B | Pass M | Pass |
| concentration | Prove Hoeffding via the MGF lemma; apply it with the right range (n=100, ε=.2 gives 2e^{-8}) | Pass B | Pass M | Pass |
| finite-classes | Derive (1−ε)^n, the union bound and both rates; H=2, δ=.05 gives log(40)/n | Pass B | Pass M | Pass |
| uniform-convergence | Explain why one common event covers a data-selected model; two-model example | Pass B | Pass M | Pass |
| rademacher-complexity (pilot) | Layout/consistency edits only; accepted argument unchanged | Pass B (diff) | Pass M (diff) | Pass |
| rademacher-properties | Use the calculation rules in both conventions; reproduce a contraction-lemma coordinate step | Pass B | Pass M | Pass |
| covering-dudley | Prove Massart; follow chaining with truncation; signed-to-absolute conversion, constant 24 versus 48 | Pass B | Pass M | Pass, layout fix after review |
| margin-bounds | Ramp sandwich and slow bound; read the general-class Lemma 4.1 reading; fixed-margin failure | Pass B | Pass M | Pass |
| trajectories-as-samples | Count 20 trajectories, not 12000 points; apply the Lipschitz grid bridge; scalar margin threshold | Pass B | Pass M | Pass |
| covering-properties | Build image/product covers with explicit norms; internal versus external centers; Lemma 27.2 correction | Pass B | Pass M | Pass |
| kernels-random-features | Explain why value approximation alone does not transfer a certificate; bounded-frequency features | Pass B | Pass M | Pass |
| dual-sudakov | Compare d(d+1)/2 entry counting with structured dimension d, keeping logs and the normalization | Pass B | Pass M | Pass |

## Phase 5: Part 18

The original independent beginner and mathematical reports cover all ten lessons
at their recorded final hashes. Final minor changes are separately reviewed in
the continuation reports linked from [phase5-review.md](phase5-review.md).
All ten stations are accepted within the checked scope in
[phase5-review.md](phase5-review.md). Final minor repairs and the analytic
counterexample measure bound (M5-R1) passed both distinct continuation reviews.
Build, 97 tests, Chrome/Edge guarantees regressions and desktop/mobile light/dark
view checks pass. Source status remains `located`.

| Station | Reader task / teaching target | Beginner | Mathematics | Integration |
| --- | --- | --- | --- | --- |
| learning-certificates | Compute a trajectory residual and binomial holdout bound; explain fixed-margin infeasibility near equilibrium | Pass B | Pass M | Pass |
| certificate-classes | Compute value-and-gradient bounds for the quadratic class; explain why value-only control fails | Pass B | Pass M | Pass |
| boffi-lemma-4-1 | Assemble the fast margin bound, factor 2 and 4B_h; count independent trajectories | Pass B | Pass M, external theorem recalled | Pass |
| boffi-thm-4-2 (pilot) | Follow parameter cover to derivative-aware residual cover to complexity and margin bound; check feasible annulus | Pass B, consistency diff | Pass M, consistency diff | Pass |
| boffi-thm-4-3 | Compare matrix dimension and parametric dimension; derive product-rule transfer and cover split | Pass B | Pass M | Pass |
| boffi-thm-4-4 | Transfer value and derivative approximation; explain shifted margin and data-only probability | Pass B + BR | Pass M + MR | Pass |
| boffi-thm-5-1 | Transport nearby-good-point decrease; compute epsilon^(1/4) radius; identify extra assumptions for the 4.2 chain | Pass B + BR | Pass M + MR | Pass |
| boffi-thm-5-2 | Reproduce prolonged block-metric reasoning; distinguish printed false claim from reconstruction and energy/norm rates | Pass B + BR, including analytic measure bound | Pass M + MR, including M5-R1 | Pass |
| certificates-in-practice | Explain Gram positivity, sampled feasibility, independent holdout and selection corrections | Pass B | Pass M | Pass |
| vdp-certificates | Derive energy/Jacobian checks and predict interventions; interpret 76/6/0 finite holdout failures | Pass B | Pass M | Pass |

The one-sentence `kernels-random-features` consistency correction tracks the
feature event 2/n² and is independently checked in `math-phase5.md`.

## Phase 6 cross-route integration

The independent [beginner audit](beginner-phase6.md) records inspection and raw
hashes for all 37 station rows above, cross-route reader tasks and repair rechecks.
P6-B1–B5 are closed: matrix/kernel prerequisite order, fixed-margin dictionary
selection, metric tangent slack, risk notation and residual-class conventions.
The [writer report](writer-phase6.md) records the three owned lesson repairs;
the coordinator owns the other two. The independent
[mathematical integration audit](math-phase6.md) accepts all five repairs and
records current hashes for all 37 stations, with no new findings. All five routes
pass their relevant gates in [rewrite-review.md](rewrite-review.md).

The 37 station rows retain their earlier independent proof/teaching scope;
Phase 6 adds whole-route continuity evidence rather than upgrading source status.
Product checks and final route acceptance are recorded in the final review.

## Historical rollout boundary

Phase 5 was accepted before Phase 6 reconciled all 37 lessons and every
destination route, including matrix, kernel and adapted Figure 1 branches.
Source records remain `located`; none of these agent reviews alone upgrades
source status or supplies human review.
