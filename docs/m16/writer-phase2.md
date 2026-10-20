# M16 Phase 2 writer report

Assignment P2-W, writer identity `/root/writer_dynamics`, 2026-10-19. Input revision `9764c85`; route contract and accepted pilot record read before drafting. This is an authoring report, not an independent acceptance review.

## Delivered draft

All nine nonpilot Part 15 Textbooks now develop their argument separately from their concise Cards. Existing IDs, anchors, prerequisites, time fields, source editions and `located` statuses are preserved. The accepted `lyapunov-functions.md` pilot's developed argument is retained; after initial byte-for-byte preservation, the coordinator authorized one numerical rounding repair described below. Its deferred discrete theorem is supplied in `time-dictionary.md`.

| Station | Developed argument and worked reader task |
| --- | --- |
| dynamical-systems | State/input/closed-loop construction; scalar feedback substitution; solve and verify flow; composition rule; equilibrium; maps versus exact sampling and Euler; finite escape. Solved question changes feedback to produce stationary states. |
| stability | Quantifier order; stability versus attraction; scalar decay, rotation and unstable growth; exponential implies both; nonexponential cubic decay; nonnormal transient and local/global scope. Solved question chooses a tolerance radius from an exponential estimate. |
| lyapunov-equation | Product rule; Hurwitz and positive-definite definitions; integral convergence, equation endpoints, positivity, uniqueness and converse exponential estimate; every entry of shared nonnormal P; diagonal check and unstable negative-P failure. Solved scalar equation checks energy/norm rates. Existing flow demo retained. |
| comparison-functions | Integrating-factor proof with residual; floor-to-norm conversion; K/K-infinity/KL definitions and checked examples; differentiable scalar comparison proof by perturbation and first contact. Solved question computes an ultimate norm bound. |
| ode-sensitivity | Integral equation; local successive-approximation construction; explicit Gronwall proof; uniqueness and finite-horizon dependence; sensitivity equation and its differentiation justification; exact finite-difference remainder for xdot=x^2; continuation and numerical limits. Solved question separates generic Lipschitz growth bound from exact decay. |
| converse-iss | Autonomous exponential converse with finite-horizon flow-integral proof, both quadratic comparisons, derivative endpoints and gradient bound; ISS definition, exact forced scalar case, certificate-based quadratic ISS proof, zero-input-stable finite-escape counterexample. Solved question compares exact and conservative rates. |
| time-dictionary | Full local nonlinear discrete Lyapunov proof including a continuity/annulus trap that prevents jumps; strict-decrease limit argument and global extension; matrix identities and discrete series existence/uniqueness; rates; exact versus Euler map; differential-energy dictionary with regularity assumptions. Solved scalar discrete equation. |
| two-values | Distinguish reward value, cost J and certificate V; split-and-shift undiscounted identity; verified stable cost; discounted identity; finite positive proper discounted value for an unstable system; discrete Bellman difference and counterexample. Solved discounted unstable map. |
| controller-or-certificate | Separate policy, model and witness; scalar gain/certificate calculation; fixed-dynamics sampled residual, positivity and fixed-margin feasibility; representation/solver failure versus instability; derivative-error residual bound. Solved question checks what survives policy retraining. |

The common notation is state dimension p, initial state xi, flow phi_t(xi), J=Df, sensitivity Phi=D_xi phi, and the existing A=[[-1,3],[0,-2]], P=[[1/2,1/2],[1/2,1]]. A continuous norm rate alpha corresponds to energy rate 2alpha. Discrete maps are called g and a discrete linear matrix B where needed to avoid treating a velocity as a next state.

## Sources actually consulted

Public primary-source text was read from the existing local PDF extractions, not private course payload. The source PDFs are in `course/ese6180/`.

- Khalil, *Nonlinear Systems*, 3rd ed. (2002): §§1.1 and 3.1 for models and local existence; Theorems 3.1–3.3 and finite escape/continuation; §§3.2–3.3 for continuous dependence and sensitivity (printed pp.95–101); §3.4, Lemma 3.4 and its worked comparison examples (pp.102–104); §4.1 for stability distinctions; §4.7, Theorem 4.14 and its proof (pp.162–165) for the finite-horizon exponential converse; Theorem 4.17 (p.167; Appendix C.8) as an explicitly deferred optional asymptotic converse; §4.9, Definition 4.7 (p.175) and Theorem 4.19 (p.176) for ISS. The atlas proves its narrower quadratic sufficient ISS condition directly rather than silently claiming the whole general theorem was proved.
- Hespanha, *Linear Systems Theory*, 2nd ed. (2018): §§8.2–8.5, especially Theorem 8.2 and the four construction steps (printed pp.91–95); §8.6 for discrete eigenvalue and Lyapunov statements, series construction, and the nonlinear discrete analogue. The local discrete trapping argument is written in full rather than copied from the continuous proof. Matrix-exponential and Jordan facts are explained at the interface and attributed to §8.3; a full Jordan normal-form derivation is outside the route.
- Boffi et al., *Learning Stability Certificates from Data*, arXiv:2008.05952v2 (September 2020), §§2–3, especially §3.1 and equations (3.1)–(3.3), printed pp.4–5: fixed autonomous dynamics, independent initial states, exact derivative assumption versus numerical experiment, sampled margins and trajectory violation. No source proof-status upgrade or global certification claim is made.

The existing source locators remain unchanged in front matter. The cost/value bridge consists of explicit derived identities in original prose; no unsupported attribution to a textbook theorem was added.

Source PDF SHA-256: Khalil `36e14dfa62bd1284dc12941966aafd040f712c3c63cb7ccd2f019819c5861da2`; Hespanha `f6759d796b1ca653b894fa1f04d6325e1a48e6ca0288b6997e65576c8477480a`; Boffi v2 `9f3084e19d21c5854af361de0a2cc23e32b97eb4ebcb163beb1ef697f74157d7`.

## Checks and illustrative computations

Ran `python tmp/m16-phase2-checks.py`; output saved in ignored `tmp/m16-phase2-checks.txt`. This script uses exact rational matrix arithmetic and direct scalar calculations; it is a writer check, not independent mathematical review.

- Shared matrix residual exactly -I; transient squared-norm derivative at (3/2,1) exactly 1/2.
- P eigenvalues approximately 0.190983005625 and 1.309016994375; norm rate 0.381966011250 and prefactor 2.618033988750, consistent with the pilot.
- Residual comparison bound equals 1 at t=log(3)/2 from initial level 2.
- Euler h=1/2, 2 and 5/2 gives norm factors 1/2, 1 and 3/2 and energy factors 1/4, 1 and 9/4.
- Finite-difference remainder for the escaping flow at xi=1,t=1/2 is exactly 4 eps^2/(1-eps).
- Forced nonlinear escape time log(2); discounted unstable map has cost coefficient 2 and difference coefficient 6; velocity residual error bound at x=2 is 0.4.
- Existing front matter matches the input revision after newline normalization; every old anchor remains; no unexpected control characters; paired display delimiters; each added native question has a solution separator. The pilot initially matched its accepted raw hash; the final check verifies equality to that version after exactly the authorized rounding sentence repair.

The first preservation assertion compared CRLF and LF literally and failed; normalizing line endings for that comparison resolved it. This was a check-script issue, not a metadata edit. No shared build, browser job or engine change was run by this writer. The coordinator owns integrated build/tests/mobile/visual checks and independent review assignment.

## Review and integration status

Draft frozen for the coordinator's first build/mobile gate. The coordinator's early C1 regularity findings were patched in the ode-sensitivity Card and time-dictionary metric paragraph before freeze. Independent beginner and mathematics reviews are pending. No substantive issue is intentionally left unresolved in the mainline arguments; general nonexponential converse construction and upper-right-derivative comparison proof are expressly identified source extensions, while the narrower arguments used here are supplied.

Initial mathematical finding M23-1: the inherited dynamical-systems Card said a bounded invariant set prevents finite escape, without excluding approach to an open domain's missing boundary. Repaired to a **compact invariant subset of the open domain**; the Textbook already carried this qualification. The reviewer was asked to recheck. The postrepair raw hash of dynamical-systems is `157d87fdd2ae36924f96520b9f4e9285b94f4120efaaa7b8b3078e7184232068`. The coordinator was notified of this sole lesson edit after the first freeze.

M23-1 was rechecked by the mathematical reviewer and closed. Beginner finding B1 identified that ode-sensitivity used the Jacobian before explaining its entries and dimensions. Its first occurrence in `statement` now defines the p-by-p matrix, coordinate meaning and induced Euclidean norm; `sensitivity` recalls the earlier definition. New raw SHA-256 `0c8a1dacd1180c8359f3a64a225cd34a84b1387f10a8fca69f01983cd4d10652`; both independent reviewers were notified for recheck. Illustrative and preservation checks pass after the patch. An optional minor rounding note in the accepted pilot was relayed to the coordinator; the pilot itself was not edited by this writer.

Final bounded followup supersedes that last historical sentence. The coordinator authorized the minor pilot rounding repair: in `nonnormal`, the t=1 illustration now says its values are approximately V=0.319 and norm=0.7175, instead of calling rounded values exact and printing norm=0.718. The analytically recomputed norm is 0.7174927558907744. No other pilot passage changed. Final raw SHA-256 `d9dbaca10fe3d12f86065eb659ceb1433a5f169180ec280afc7dbc559efe9a75`.

Beginner B2 requested a reproducible Lab task in lyapunov-equation. Its `experiment` section now identifies the inline seed/n/holdout/rate and defines one failure per trajectory if any tested time exceeds residual tolerance 1e-5. A four-step bench task specifies Linear system, Quadratic Lyapunov function, n=8 then 16, alpha=0.1 per second, seed 1 and Typical seed off, plus horizon/integration/training check and fitting-rate details. A direct Node engine run (`require('./lab/node.js'); RL.flows.experiment(...)`) reproduced both n=8 and n=16 results: 32 iterations, feasible true, maxResidual 0.0000069448545119144, bad 0/100. Inline n=4/holdout20 gives maxResidual 0.000006938614793394748 and bad 0/20. Rounded readouts are stated with their finite-case limits. Final lesson raw SHA-256 `bfba965a84f9cb20d054bfb08353e05d6411e12ce7d41315ab31fec0c41aaf2b`. Both reviewers and coordinator received exact changed passages/hashes for recheck. No engine or shared build changed.

Raw draft hashes are printed by the computation script/output; rerun after any lesson patch. No commit, publication or nested delegation was performed.
