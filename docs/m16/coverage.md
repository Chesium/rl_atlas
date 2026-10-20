# M16 station coverage

The Phase 0 inventory remains [route-contract.md](route-contract.md), covering
37 stations. This ledger records delivered reader-task and review evidence;
planned examples alone do not pass a station. Phase 2/3 acceptance is recorded in
[phase2-3-review.md](phase2-3-review.md), with candidate hashes in the independent
reports. Phases 4–6 remain pending except for their three accepted pilot lessons.

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

## Remaining rollout

Part 18 (10 stations) remains Phase 5. Its `boffi-thm-4-2` pilot lesson has the bounded
acceptance scope in [pilot-review.md](pilot-review.md), plus the Phase 4 integration
edits recorded in [phase4-review.md](phase4-review.md). The other nine Part 18 lessons
remain unaccepted for M16. Phase 6 must reconcile all 37 lessons and every
destination route, including matrix, kernel and adapted Figure 1 branches.
Source records remain `located`; none of these agent reviews alone upgrades
source status or supplies human review.
