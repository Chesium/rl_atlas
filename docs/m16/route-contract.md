# M16 route contract and baseline

Coordinator contract v1, 2026-10-19. Baseline HEAD: `2f72fc274169b6702d4b7ec9fe4a13b1d110011f`; clean worktree at entry. Inventory was read from the actual Markdown and TOML, not M14 completion claims. This is an authoring contract; a planned example or solution target below is not a delivered lesson. Independent baseline evidence is in [baseline-audit.md](baseline-audit.md); assignment status is in [task-ledger.md](task-ledger.md).

**Phase 0–1 closure, 2026-10-19:** the three pilot lessons were accepted after independent beginner and mathematical reviews at the hashes in [pilot-review.md](pilot-review.md). The baseline inventory and proposed work below stay unchanged as the planning record. The accepted Theorem 4.2 lesson explicitly adds a zero-residual hypothesis and identifies its fixed-horizon adaptation; these source qualifications supersede the original proof plan where they differ. All other stations remain rollout work. Phases 2–6 are pending.

**Phase 2/3 rollout, 2026-10-19:** Parts 15 and 16 are accepted at the final
hashes in the independent Phase 2/3 reports. See [phase2-3-review.md](phase2-3-review.md)
and [coverage.md](coverage.md). The inventory below remains the original planning
contract; its pending Phase 2/3 wording is historical. Phases 4–6 remain pending.

## Audience, shared notation and examples

**Phase 5 contract amendment, 2026-10-20:** the original Part 18 records below
are planning hypotheses, not verified source claims. Independent review of the
actual v2 statements and derivations is recorded in `math-phase5.md`. In
particular, the proposed zero exclusion radius for linear dynamics in 5.2 is
false: the lesson now exhibits a counterexample to the printed theorem and
separately develops a reconstructed result with explicit added hypotheses and
a nonzero transfer radius. The true norm rate is `lambda_star`, distinct from
the learned energy rate `lambda`. This supersedes that planned worked case.
The 5.1 application additionally requires positivity/regularity, a compatible
initial-state measure, convex-domain gradient bounds and the stated strictness
repair. Lemma 4.1 retains its printed factor 2 and 4B_h; the 4.4 feature-event
factor and data-only probability reading are explicit. Source status remains
`located`; an independent agent check does not establish human proof review.

Assume differentiation, vectors, matrix multiplication and elementary probability. Define gradients, positive definiteness, suprema, operator norms, independence, covers and probability quantifiers locally when first needed. Use scalar `xdot=-x`, then the existing nonnormal `A=[-1,3;0,-2]`, then a three-parameter quadratic certificate. State dimension is p, parameter dimension k, independent trajectory count n. The initial state is xi, flow phi_t(xi), common reachable compact set S, initial distribution D, horizon T. V is a certificate; policy reward value retains its RL meaning. Gradient is with respect to x unless marked theta. Euclidean vector and induced operator norms are the defaults; state exceptions explicitly.

Statistical signed empirical complexity fixes Z first, then averages signs after maximizing over the class. The Boffi convention additionally takes absolute values and a worst-case sample; it must be defined again at use. Gamma is a positive fixed scalar residual margin, not RL discount. Alpha is a physical norm decay rate where the metric inequality uses -2 alpha M; scalar energy rate and norm rate differ by two. Delta in a confidence statement is a failure probability, not TD surprise. Preserve the three meanings of contraction.

Use the random-sign toy F={(w,w):|w|<=1}, and certificate residual H_V(xi)=max over t of h(phi_t(xi),f(phi_t(xi)),V,DV). Positivity is separate from residual feasibility. A fixed negative scalar margin is impossible for the usual Lyapunov residual on any sampled trajectory containing the equilibrium. Make that failure explicit instead of presenting the Lab's relative margin as Theorem 4.2's premise. The Van der Pol experiment remains adapted numerical evidence, with no global or exact-reproduction claim.

## Routes and pilot prerequisite closure

Keep every station ID, existing section anchor, source status and typed link. `read-thm-4-2` is the main parametric destination; contraction, matrix, kernel and adapted Figure 1 retain their own routes. Optional matrix/kernel/neural-network links into 4.2 stay optional. No new station or route edge is needed for this pilot. The required transitive closure of 4.2 from current front matter is:

- `boffi-lemma-4-1`
- `certificate-classes`
- `concentration`
- `controller-or-certificate`
- `covering-dudley`
- `dynamical-systems`
- `finite-classes`
- `learning-certificates`
- `lyapunov-functions`
- `margin-bounds`
- `rademacher-complexity`
- `risk-erm`
- `stability`
- `trajectories-as-samples`
- `uniform-convergence`

The closure contains 15 prerequisites plus the destination. It does not include the optional structured/kernel branches. Reading order: dynamics -> stability -> Lyapunov; risk/ERM -> uniform convergence -> random signs -> covers; risk/ERM + dynamics -> trajectory samples -> learning formulation -> joint norm; concentration + finite classes -> margins; then Lemma 4.1 and Theorem 4.2. Controller/certificate is the fixed-loop bridge. Source-specific fast-margin Lemma 4.1 is an invoked prerequisite theorem; do not claim its external statistical proof is supplied by the entropy calculation.

### Minimum Phase 1 supporting work and ownership

- Writer D owns `lyapunov-functions.md`. Include local flow/equilibrium/stability reminders, chain rule, positive/sublevel-set argument, scalar and nonnormal examples, attraction counterexample, exponential rate and discrete-time reminder. Existing dynamics and stability remain rollout work; the pilot must not require their compressed prose to justify its main inference.
- Writer S owns `rademacher-complexity.md`. Include local loss-class/sample/supremum reminders, sign enumeration, linear-ball calculation, and conventions. Risk/ERM and uniform convergence remain rollout work; recall their exact interface locally.
- Coordinator owns `boffi-thm-4-2.md`, drafted after foundations agree. Include local initial-state/trajectory loss, fixed-class and compact-domain assumptions, joint norm, parameter derivatives, gamma-feasibility, full cover transfer/volume argument/entropy integral, and the exact recalled Lemma 4.1 statement. This bounded local bridge avoids rewriting every supporting station in Phase 1. It credits no full Phase 2/4/5 station beyond the three pilot files.
- Reviewers must attempt all three reader tasks from this declared material. If local bridges fail, record a moderate finding and schedule named support edits before accepting. Never accept a mainline dependency as optional merely to close Phase 1.

## Inventory and per-station authoring contract

Each consumed symbol group maps to the listed prerequisite's Textbook `statement`/`reasoning` anchors; mathematical objects not yet developed there are the stated local-bridge work. Sources and current claims below are baseline evidence. Derive the reader-task calculation locally; recall a prerequisite's relevant statement before use. Advanced source proofs explicitly deferred above are optional extensions, never silent mainline assumptions. Question/solution targets double as planned exercises; use native question blocks when authored. All nonpilot stations remain unaccepted until their rollout reviews.

## Part 15: Dynamics and stability (10)

### `dynamical-systems`

- File: [content/15-dynamics/dynamical-systems.md](../../content/15-dynamics/dynamical-systems.md); baseline SHA-256 `40001da2527492cbf5764a8e7f8916ff2c9b8655c8cd0f15b1ddbbcb737e35e5` (text normalized by Python read).
- Objective / reader question: Turn a fixed feedback law into an autonomous flow. Can the reader explain and reproduce the worked case below?
- Prerequisites: declared basic audience only. Consumed -> introduced symbols: `x,u,pi -> f,phi_t,xi`.
- Baseline claim / source: Fix a controller, then study the state trajectories its closed loop generates. Khalil, Nonlinear Systems, 3rd edition, 2002, §§1.1, 3.1 [located].
- Planned worked case, assumption failure and exercise/solution target: For F(x,u)=x+u and pi(x)=-2x, derive f=-x and phi_t=exp(-t)xi.
- Gap and derivation contract: Define state, derivative, equilibrium and finite horizon before using flow notation.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 123 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `stability`

- File: [content/15-dynamics/stability.md](../../content/15-dynamics/stability.md); baseline SHA-256 `5471059dc80f0e2c8eee0e21b72cf8e3c7fdf93457f28d00805a124101e94a81` (text normalized by Python read).
- Objective / reader question: Distinguish staying nearby from converging. Can the reader explain and reproduce the worked case below?
- Prerequisites: `dynamical-systems` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `phi_t,xi -> epsilon,delta,C,alpha,rho`.
- Baseline claim / source: Staying near an equilibrium, approaching it, and approaching it exponentially are different properties. Khalil, Nonlinear Systems, 3rd edition, 2002, §4.1 [located].
- Planned worked case, assumption failure and exercise/solution target: Compare xdot=-x and planar rotation: both stable; only the first attracts.
- Gap and derivation contract: Unpack quantifier order and the local/global distinction; recall equilibrium.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 121 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `lyapunov-functions`

- File: [content/15-dynamics/lyapunov-functions.md](../../content/15-dynamics/lyapunov-functions.md); baseline SHA-256 `cb0ac163f3ba7a322f8de27ec6e87ec74ba7e913e8f51d5cac342abe390e3997` (text normalized by Python read).
- Objective / reader question: Compute a Lie derivative and justify a trapping and attraction claim. Can the reader explain and reproduce the worked case below?
- Prerequisites: `stability` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `f,x,stability -> V,grad V,c1,c2,c3`.
- Baseline claim / source: A positive function that decreases along trajectories can prove stability without solving the dynamics. Khalil, Nonlinear Systems, 3rd edition, 2002, §§4.1–4.2 [located].
- Planned worked case, assumption failure and exercise/solution target: V=x^2 for xdot=-x gives Vdot=-2V; rotation with V=norm(x)^2 gives zero and no attraction.
- Gap and derivation contract: Pilot: chain rule, sublevel trapping, strict decrease, exponential comparison and half-rate.
- Visual/Lab purpose: Story: existing reader-paced scene; existing flow linear illustrates the stated mechanism; predict, intervene, observe and explain; finite runs are evidence.
- Baseline native solved questions: 0; baseline Textbook length: 147 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `lyapunov-equation`

- File: [content/15-dynamics/lyapunov-equation.md](../../content/15-dynamics/lyapunov-equation.md); baseline SHA-256 `0891533647dbcad906ebe80953857f45c18c296e32f9a633c6808e2a0f4874a3` (text normalized by Python read).
- Objective / reader question: Solve and verify a two-dimensional quadratic certificate. Can the reader explain and reproduce the worked case below?
- Prerequisites: `lyapunov-functions` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `V,grad V -> A,P,Q,Hurwitz`.
- Baseline claim / source: A linear matrix equation constructs a quadratic certificate for a stable linear system. Hespanha, Linear Systems Theory, 2nd edition, 2018, §§8.2, 8.4–8.6 [located].
- Planned worked case, assumption failure and exercise/solution target: A=diag(-1,-2), Q=I gives P=diag(1/2,1/4); verify every matrix entry.
- Gap and derivation contract: Derive product rule and integral endpoints; explain positive definite and nonnormal geometry.
- Visual/Lab purpose: Story: none required; existing flow linear illustrates the stated mechanism; predict, intervene, observe and explain; finite runs are evidence.
- Baseline native solved questions: 0; baseline Textbook length: 134 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `comparison-functions`

- File: [content/15-dynamics/comparison-functions.md](../../content/15-dynamics/comparison-functions.md); baseline SHA-256 `13f6f0826eaef832416d74d760cb69a92835cf5d102fd6ef79a696695f5174f4` (text normalized by Python read).
- Objective / reader question: Integrate a scalar inequality and interpret the residual floor. Can the reader explain and reproduce the worked case below?
- Prerequisites: `stability` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `Vdot,stability -> K,KL,K_infinity,beta,lambda`.
- Baseline claim / source: Scalar decay inequalities turn certificate residuals into bounds on trajectories. Khalil, Nonlinear Systems, 3rd edition, 2002, §§3.4, 4.4 [located].
- Planned worked case, assumption failure and exercise/solution target: Vdot<=-2V+1 yields V(t)<=exp(-2t)V(0)+(1-exp(-2t))/2.
- Gap and derivation contract: Define monotonicity domains; derive integrating-factor comparison, not just its name.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 130 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `ode-sensitivity`

- File: [content/15-dynamics/ode-sensitivity.md](../../content/15-dynamics/ode-sensitivity.md); baseline SHA-256 `4a85ddac4a3f5acaee7ffed803035679653c57b5bfd9644a3d5476276237ad3a` (text normalized by Python read).
- Objective / reader question: Explain why local uniqueness and sensitivity do not imply global existence. Can the reader explain and reproduce the worked case below?
- Prerequisites: `dynamical-systems` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `f,phi_t -> Df,Phi,L`.
- Baseline claim / source: Regularity gives unique flows; differentiating them gives the evolution of infinitesimal perturbations. Khalil, Nonlinear Systems, 3rd edition, 2002, §§3.1–3.4 [located].
- Planned worked case, assumption failure and exercise/solution target: xdot=x^2 gives x=xi/(1-t*xi), escaping at 1/xi for xi>0.
- Gap and derivation contract: Construct integral equation, recall Gronwall and show differentiation into sensitivity.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 128 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `converse-iss`

- File: [content/15-dynamics/converse-iss.md](../../content/15-dynamics/converse-iss.md); baseline SHA-256 `7f62e5524f273ec368b5a7e7d0c088f44a907f1d91fe35bf6b828ece9b82c5a5` (text normalized by Python read).
- Objective / reader question: Separate existence of a witness from finding it in a chosen class. Can the reader explain and reproduce the worked case below?
- Prerequisites: `lyapunov-functions` Textbook `statement` and `reasoning`, `comparison-functions` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `K,KL,V -> u,ISS,gamma(norm u)`.
- Baseline claim / source: Converse results establish certificate existence; ISS measures how disturbances change state bounds. Khalil, Nonlinear Systems, 3rd edition, 2002, §§4.7–4.9 [located].
- Planned worked case, assumption failure and exercise/solution target: xdot=-x+u has norm bound exp(-t)|xi|+norm(u)_infinity.
- Gap and derivation contract: State one route-relevant converse with assumptions; derive forced scalar bound; deeper converse proof optional.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 103 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `time-dictionary`

- File: [content/15-dynamics/time-dictionary.md](../../content/15-dynamics/time-dictionary.md); baseline SHA-256 `201031463242af2cb4245f94400904b94a127e5ca3b94efe5bcf8c49671d9b0c` (text normalized by Python read).
- Objective / reader question: Translate decrease and norm rates without confusing a flow with its integrator. Can the reader explain and reproduce the worked case below?
- Prerequisites: `lyapunov-equation` Textbook `statement` and `reasoning`, `ode-sensitivity` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `A,P,V,Df -> Delta V,h,rho`.
- Baseline claim / source: Derivatives, differences, Lyapunov equations and contraction rates in the two time conventions. Hespanha, Linear Systems Theory, 2nd edition, 2018, §§8.4–8.6 [located].
- Planned worked case, assumption failure and exercise/solution target: Euler on xdot=-x has factor 1-h: stability iff 0<h<2.
- Gap and derivation contract: Derive both matrix identities and squared-length factors; no discrete replacement of source theorem.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 107 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `two-values`

- File: [content/15-dynamics/two-values.md](../../content/15-dynamics/two-values.md); baseline SHA-256 `50e90e671cdb1b332eda73d5148e6cb681ee729fb68061a9e370287c002eefba` (text normalized by Python read).
- Objective / reader question: Decide when cost-to-go supplies a certificate. Can the reader explain and reproduce the worked case below?
- Prerequisites: `lyapunov-functions` Textbook `statement` and `reasoning`, `value-functions` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `policy value,V,phi_t -> ell,rho,cost integral`.
- Baseline claim / source: Policy value predicts reward; a Lyapunov certificate proves decrease. Cost-to-go can connect the two. Khalil, Nonlinear Systems, 3rd edition, 2002, §4.1; bridge to policy values [located].
- Planned worked case, assumption failure and exercise/solution target: For xdot=-x and ell=x^2, undiscounted cost is x^2/2 with derivative -x^2.
- Gap and derivation contract: Derive time-shift identity; discounted identity has rho V-ell and needs separate decrease check.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 105 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `controller-or-certificate`

- File: [content/15-dynamics/controller-or-certificate.md](../../content/15-dynamics/controller-or-certificate.md); baseline SHA-256 `f466c2ed49743f1c565c7ea70f9a23d0913ea5ef03c14dbf391880dead6b5e30` (text normalized by Python read).
- Objective / reader question: Explain why failure to fit V does not prove plant instability. Can the reader explain and reproduce the worked case below?
- Prerequisites: `dynamical-systems` Textbook `statement` and `reasoning`, `lyapunov-functions` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `pi,f,V -> fixed closed loop,witness class`.
- Baseline claim / source: Learning a witness for a fixed closed loop differs from learning actions or identifying a model. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, §§2–3, pp.3–5 [located].
- Planned worked case, assumption failure and exercise/solution target: xdot=-x is stable but V=-x^2 fails positivity; changing pi changes f.
- Gap and derivation contract: Separate policy, model and witness optimization; retain derivative-estimation errors.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 124 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

## Part 16: Incremental stability and contraction (5)

### `incremental-stability`

- File: [content/16-contraction/incremental-stability.md](../../content/16-contraction/incremental-stability.md); baseline SHA-256 `109ce937ae404f96598ab8631bdcb056e4532b4a5fdf60478ae424dbd5b39fdd` (text normalized by Python read).
- Objective / reader question: Formulate stability of two solutions as a doubled system. Can the reader explain and reproduce the worked case below?
- Prerequisites: `comparison-functions` Textbook `statement` and `reasoning`, `ode-sensitivity` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `phi_t,KL,Phi -> xi,zeta,deltaISS,EISS`.
- Baseline claim / source: Control the distance between two trajectories, with uniform bounds over their initial states. Angeli, A Lyapunov Approach to Incremental Stability Properties, IEEE TAC 47(3), 2002, §§II–IV [located].
- Planned worked case, assumption failure and exercise/solution target: xdot=-x gives paired separation exp(-t)|xi-zeta|.
- Gap and derivation contract: Define diagonal target and uniform pair quantifiers; equilibrium stability alone is insufficient.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 120 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `variational-dynamics`

- File: [content/16-contraction/variational-dynamics.md](../../content/16-contraction/variational-dynamics.md); baseline SHA-256 `4777dd7f0d01ecc02560897f5cfd865a3841a793f35634b3266c71fb0f25662e` (text normalized by Python read).
- Objective / reader question: Derive the equation for an infinitesimal displacement. Can the reader explain and reproduce the worked case below?
- Prerequisites: `ode-sensitivity` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `Df,Phi -> delta x,J,o(norm delta x)`.
- Baseline claim / source: The Jacobian transports infinitesimal displacements along a nonlinear trajectory. Lohmiller and Slotine, On Contraction Analysis for Non-linear Systems, Automatica 34(6), 1998, §2, differential displacement [located].
- Planned worked case, assumption failure and exercise/solution target: f=-x-x^3 has J=-1-3x^2; derive tangent decay.
- Gap and derivation contract: Explain derivative limit versus finite difference; frozen stable eigenvalues are insufficient.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 104 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `contraction-metrics`

- File: [content/16-contraction/contraction-metrics.md](../../content/16-contraction/contraction-metrics.md); baseline SHA-256 `79c873c9e1bfb5fa575cfbff21d3dad3aaf681075a3265075f37e66d90aa31b6` (text normalized by Python read).
- Objective / reader question: Differentiate metric energy and transfer it to finite separation. Can the reader explain and reproduce the worked case below?
- Prerequisites: `variational-dynamics` Textbook `statement` and `reasoning`, `lyapunov-equation` Textbook `statement` and `reasoning`, `incremental-stability` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `J,delta x,P -> M,m,L,alpha,d_M`.
- Baseline claim / source: A changing positive metric can reveal shrinking trajectory distances hidden by Euclidean transients. Lohmiller and Slotine, On Contraction Analysis for Non-linear Systems, Automatica 34(6), 1998, §§2–3, generalized metric [located].
- Planned worked case, assumption failure and exercise/solution target: Constant P for the shared nonnormal A reduces the metric test to A^TP+PA.
- Gap and derivation contract: Develop path length integration and connectivity; norm rate alpha versus energy rate 2alpha.
- Visual/Lab purpose: Story: existing reader-paced scene; existing flow contraction illustrates the stated mechanism; predict, intervene, observe and explain; finite runs are evidence.
- Baseline native solved questions: 0; baseline Textbook length: 157 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `three-contractions`

- File: [content/16-contraction/three-contractions.md](../../content/16-contraction/three-contractions.md); baseline SHA-256 `515edd8c86ef99c3e6851db37a601e4e2cf74b07520b9e90ae452db187bfd819` (text normalized by Python read).
- Objective / reader question: Identify the spaces and constants in the three contraction claims. Can the reader explain and reproduce the worked case below?
- Prerequisites: `contraction-metrics` Textbook `statement` and `reasoning`, `bellman` Textbook `statement` and `reasoning`, `rademacher-properties` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `Bellman,T,gamma,M,Rademacher -> Lipschitz composition`.
- Baseline claim / source: Bellman operators, physical flows and Rademacher composition use the same word for three different arguments. Lohmiller and Slotine, On Contraction Analysis for Non-linear Systems, Automatica 34(6), 1998, §§2–3; bridge between definitions [located].
- Planned worked case, assumption failure and exercise/solution target: Discounted Bellman contraction can coexist with unstable xdot=x plant.
- Gap and derivation contract: Recall all three actual inequalities; this optional bridge is not a prerequisite for 4.2.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 108 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `imitation-deployment`

- File: [content/16-contraction/imitation-deployment.md](../../content/16-contraction/imitation-deployment.md); baseline SHA-256 `8cd3ca3c6efa9935aa626d649f476d4e3596a66a8032f8b8c9de82ebffe2be6f` (text normalized by Python read).
- Objective / reader question: Unroll deployment error and identify its uniform premises. Can the reader explain and reproduce the worked case below?
- Prerequisites: `incremental-stability` Textbook `statement` and `reasoning`, `imitation` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `incremental stability,imitation -> e_t,L_u,epsilon,rho`.
- Baseline claim / source: Incremental stability can prevent small controller errors from growing into large deployment errors. Angeli, A Lyapunov Approach to Incremental Stability Properties, IEEE TAC 47(3), 2002, §IV; atlas discrete deployment derivation [located].
- Planned worked case, assumption failure and exercise/solution target: rho=1/2,L_u*epsilon=.1,e0=0 gives e3<=.175 and floor .2.
- Gap and derivation contract: Derive recurrence on visited states; average expert-data loss cannot replace uniform action error.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 109 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

## Part 17: Learning theory (12)

### `risk-erm`

- File: [content/17-learning-theory/risk-erm.md](../../content/17-learning-theory/risk-erm.md); baseline SHA-256 `d8b81a898db5cadb5407117bad1d89a4b8fb8f871307a41bf563470a867b5534` (text normalized by Python read).
- Objective / reader question: Compute empirical/population loss and derive the ERM 2epsilon bound. Can the reader explain and reproduce the worked case below?
- Prerequisites: declared basic audience only. Consumed -> introduced symbols: `expectation,average -> Z,h,ell,R,Rhat,H`.
- Baseline claim / source: Separate population risk from the empirical objective used to choose a hypothesis. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Chapters 3–4 [located].
- Planned worked case, assumption failure and exercise/solution target: Two equally likely states and a memorizing class: zero sample loss can have risk 1/2.
- Gap and derivation contract: Define hypothesis versus loss class and i.i.d.; show three-term excess-risk decomposition.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 119 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `concentration`

- File: [content/17-learning-theory/concentration.md](../../content/17-learning-theory/concentration.md); baseline SHA-256 `11074a2e91f4173644ea9bfbbba1a982dd167a2b2f1d73ca94d6f159d96a65c7` (text normalized by Python read).
- Objective / reader question: Apply a bounded independent-data tail bound with the right range. Can the reader explain and reproduce the worked case below?
- Prerequisites: declared basic audience only. Consumed -> introduced symbols: `probability,average -> n,a,b,c_i,delta`.
- Baseline claim / source: Independence and bounded influence turn averages and sample-dependent functions into tail bounds. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Appendix B [located].
- Planned worked case, assumption failure and exercise/solution target: For Bernoulli n=100 and epsilon=.2, Hoeffding gives 2 exp(-8).
- Gap and derivation contract: State upper/two-sided versions; explain coordinate replacement for McDiarmid; proof machinery may be cited.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 93 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `finite-classes`

- File: [content/17-learning-theory/finite-classes.md](../../content/17-learning-theory/finite-classes.md); baseline SHA-256 `0bad64ee5bc59031ad762563d7577aa553ddf6d8be2bd6d8518f02105cd85366` (text normalized by Python read).
- Objective / reader question: Derive a finite uniform bound and the zero-error improvement. Can the reader explain and reproduce the worked case below?
- Prerequisites: `concentration` Textbook `statement` and `reasoning`, `risk-erm` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `R,Rhat,Hoeffding -> cardinality H,union bound`.
- Baseline claim / source: Union bounds connect class size to data requirements, with a faster rate when empirical errors vanish. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Chapter 4 [located].
- Planned worked case, assumption failure and exercise/solution target: H=2 and delta=.05 gives zero-error bound log(40)/n.
- Gap and derivation contract: Show bad-model probability (1-epsilon)^n; distinguish class fixedness and binary realizability.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 110 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `uniform-convergence`

- File: [content/17-learning-theory/uniform-convergence.md](../../content/17-learning-theory/uniform-convergence.md); baseline SHA-256 `d7b231646748f94740ed8d3a9aea3f770e0f3220a46f2551376cf658db8ec5e7` (text normalized by Python read).
- Objective / reader question: Explain why a common event covers a data-selected model. Can the reader explain and reproduce the worked case below?
- Prerequisites: `risk-erm` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `H,R,Rhat -> sup,deviation,ghost sample`.
- Baseline claim / source: Control an entire class at once so the guarantee covers a hypothesis selected from the data. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Chapters 4, 26 [located].
- Planned worked case, assumption failure and exercise/solution target: Construct two models each good on a different observed point; pointwise control does not select safely.
- Gap and derivation contract: Pilot local reminder supplied in random-sign lesson; full symmetrization deferred to properties.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 97 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `rademacher-complexity`

- File: [content/17-learning-theory/rademacher-complexity.md](../../content/17-learning-theory/rademacher-complexity.md); baseline SHA-256 `03c93e740ff4a09fa3c61d88be34807860190e366b9eeb9d6b345ba57dfc42e0` (text normalized by Python read).
- Objective / reader question: Enumerate signs and derive the linear-ball bound. Can the reader explain and reproduce the worked case below?
- Prerequisites: `uniform-convergence` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `sample,Z_i,expectation,sup -> sigma,F,Rhat_rad,B,R`.
- Baseline claim / source: How well can a class match random signs? That measures its ability to exploit sampling noise. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Chapter 26, §§26.1–26.3 [located].
- Planned worked case, assumption failure and exercise/solution target: For outputs (w,w), |w|<=1 at n=2, sign supremum values 1,0,0,1 average to 1/2.
- Gap and derivation contract: Pilot: sample fixed first, signs second, fit third; duality, Jensen and cross-term cancellation.
- Visual/Lab purpose: Story: none required; existing learning signs illustrates the stated mechanism; predict, intervene, observe and explain; finite runs are evidence.
- Baseline native solved questions: 0; baseline Textbook length: 117 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `covering-dudley`

- File: [content/17-learning-theory/covering-dudley.md](../../content/17-learning-theory/covering-dudley.md); baseline SHA-256 `05946c32c3f467b0db0dee1c6dd1d0dac4c9efc74b4c11bafdf828d8e4bb55c3` (text normalized by Python read).
- Objective / reader question: Transfer a parameter cover and explain the entropy integral. Can the reader explain and reproduce the worked case below?
- Prerequisites: `rademacher-complexity` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `norm,F,Rademacher -> N(epsilon),entropy,diameter`.
- Baseline claim / source: Approximate a function class at many scales, then integrate its metric entropy to bound complexity. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Chapter 27; Boffi v2 Appendix B, p.19 [located].
- Planned worked case, assumption failure and exercise/solution target: A one-dimensional interval of radius B needs at most 1+2B/epsilon net points.
- Gap and derivation contract: Pilot theorem supplies a full local cover/chaining interface; finite diameter must truncate the integral.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 117 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `margin-bounds`

- File: [content/17-learning-theory/margin-bounds.md](../../content/17-learning-theory/margin-bounds.md); baseline SHA-256 `5c741da71a4bd34277281069baf9ded1bdf69e20399da1ab8be89fd6635c37b6` (text normalized by Python read).
- Objective / reader question: Explain why positive margin plus zero errors changes the available rate. Can the reader explain and reproduce the worked case below?
- Prerequisites: `uniform-convergence` Textbook `statement` and `reasoning`, `finite-classes` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `uniform convergence,finite classes -> gamma,ramp,fast rate`.
- Baseline claim / source: Zero empirical violations with a positive margin permit fast rates unavailable from a generic deviation bound. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Chapter 26; Boffi v2 Lemma 4.1, p.6 [located].
- Planned worked case, assumption failure and exercise/solution target: Scaling residuals by c scales complexity and gamma by c, leaving their ratio unchanged.
- Gap and derivation contract: Recall precise Lemma 4.1 interface locally in theorem; do not derive fast rate from ordinary deviation.
- Visual/Lab purpose: Story: none required; existing learning rates illustrates the stated mechanism; predict, intervene, observe and explain; finite runs are evidence.
- Baseline native solved questions: 0; baseline Textbook length: 126 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `trajectories-as-samples`

- File: [content/17-learning-theory/trajectories-as-samples.md](../../content/17-learning-theory/trajectories-as-samples.md); baseline SHA-256 `fc1eea40f417a65d337c4334f758b6a2d4405a8bef690bc5c535941d076f9b0c` (text normalized by Python read).
- Objective / reader question: Count independent trajectories and distinguish time-grid accuracy. Can the reader explain and reproduce the worked case below?
- Prerequisites: `dynamical-systems` Textbook `statement` and `reasoning`, `risk-erm` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `phi_t,R,Z -> xi_i,T,trajectory maximum`.
- Baseline claim / source: One independent initial state gives one trajectory example, regardless of its number of sampled times. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, §3.1, equations (3.1)–(3.3), pp.4–5 [located].
- Planned worked case, assumption failure and exercise/solution target: 20 initial states with 600 time points give n=20; grid refinement does not give n=12000.
- Gap and derivation contract: Theorem pilot defines initial distribution and maximum; a time Lipschitz bridge is needed for gridded certification.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 123 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `rademacher-properties`

- File: [content/17-learning-theory/rademacher-properties.md](../../content/17-learning-theory/rademacher-properties.md); baseline SHA-256 `5c42e97cb9c8f13b5a884377b1a529817ab27792b42094f9fd14b708f14638c3` (text normalized by Python read).
- Objective / reader question: Use scaling/composition without silently changing convention. Can the reader explain and reproduce the worked case below?
- Prerequisites: `rademacher-complexity` Textbook `statement` and `reasoning`, `concentration` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `sigma,Rademacher,concentration -> ghost sample,contraction`.
- Baseline claim / source: Symmetrization, scaling and Lipschitz composition control the complexity of transformed classes. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Chapter 26 [located].
- Planned worked case, assumption failure and exercise/solution target: A fixed nonzero function has signed complexity zero but absolute complexity can be positive.
- Gap and derivation contract: Derive symmetrization; handle offsets and scalar/vector composition separately.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 115 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `covering-properties`

- File: [content/17-learning-theory/covering-properties.md](../../content/17-learning-theory/covering-properties.md); baseline SHA-256 `f5009e18b394b973b022a61acd735d7821c4c680153f4630c1e8da308785fb32` (text normalized by Python read).
- Objective / reader question: Construct image and product covers with explicit norms. Can the reader explain and reproduce the worked case below?
- Prerequisites: `covering-dudley` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `N(epsilon),norm -> Lipschitz image,packing,product cover`.
- Baseline claim / source: Lipschitz maps and product covers transfer entropy bounds, provided the norm is the right one. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Chapter 27 [located].
- Planned worked case, assumption failure and exercise/solution target: An L-Lipschitz image uses an epsilon/L parameter cover; multiply product counts.
- Gap and derivation contract: Explain external versus internal centers and dimensions; structured refinements optional for 4.2.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 118 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `kernels-random-features`

- File: [content/17-learning-theory/kernels-random-features.md](../../content/17-learning-theory/kernels-random-features.md); baseline SHA-256 `1ef79536862b570ce6c28e21a1ff73a8dd55e127475b62fcacd4a4073418a855` (text normalized by Python read).
- Objective / reader question: Explain why value approximation alone does not transfer the certificate. Can the reader explain and reproduce the worked case below?
- Prerequisites: `rademacher-properties` Textbook `statement` and `reasoning`, `covering-properties` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `covers,composition -> kernel,nu,alpha,feature dictionary`.
- Baseline claim / source: Finite random features approximate a kernel class; certificates require derivative approximation too. Shalev-Shwartz and Ben-David, Understanding Machine Learning, 2014, Chapter 16; Boffi v2 §4.2 and Appendix B.3 [located].
- Planned worked case, assumption failure and exercise/solution target: Bounded-frequency cosine has bounded value/derivatives; unbounded frequency breaks uniform control.
- Gap and derivation contract: Develop density-constrained subset of RKHS and independent dictionary before theorem 4.4.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 93 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `dual-sudakov`

- File: [content/17-learning-theory/dual-sudakov.md](../../content/17-learning-theory/dual-sudakov.md); baseline SHA-256 `959cfb84d19fff2dce4a58160f3eca5e263d87a53e0cc47327761cebd7b3a353` (text normalized by Python read).
- Objective / reader question: Identify how structured entropy improves a matrix-class bound. Can the reader explain and reproduce the worked case below?
- Prerequisites: `covering-properties` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `cover properties,Gaussian -> B2^d,induced norm`.
- Baseline claim / source: A Gaussian norm estimate can sharpen matrix-class entropy beyond counting every free entry. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, Appendix B.2, p.19; cited Vershynin lectures [located].
- Planned worked case, assumption failure and exercise/solution target: Compare entry count d(d+1)/2 with leading structured dimension d, retaining logs.
- Gap and derivation contract: State exact norm and source normalization; advanced inequality recalled, its proof an optional extension.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 103 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

## Part 18: Learning certificates (10)

### `learning-certificates`

- File: [content/18-certificates/learning-certificates.md](../../content/18-certificates/learning-certificates.md); baseline SHA-256 `170601aa524501db937c5697df3e20d7bd2b0bbc817b64a6d0f436d0b0c28e97` (text normalized by Python read).
- Objective / reader question: Write a trajectory residual and test training feasibility. Can the reader explain and reproduce the worked case below?
- Prerequisites: `lyapunov-functions` Textbook `statement` and `reasoning`, `trajectories-as-samples` Textbook `statement` and `reasoning`, `controller-or-certificate` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `V,f,xi,T -> h,H_V,gamma,err`.
- Baseline claim / source: Fit decrease constraints along training trajectories and measure failure on fresh ones. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, §3, equations (3.1)–(3.3), pp.4–5 [located].
- Planned worked case, assumption failure and exercise/solution target: For xdot=-x,V=x^2, residual Vdot+V=-x^2; a set containing zero cannot support fixed gamma>0.
- Gap and derivation contract: Pilot theorem provides complete local feasibility/residual bridge; positivity is a separate structural condition.
- Visual/Lab purpose: Story: none required; existing flow linear illustrates the stated mechanism; predict, intervene, observe and explain; finite runs are evidence.
- Baseline native solved questions: 0; baseline Textbook length: 143 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `certificate-classes`

- File: [content/18-certificates/certificate-classes.md](../../content/18-certificates/certificate-classes.md); baseline SHA-256 `627494e5c38aaa27e8c5c2b89720ddc6d3646284916012f93922e6e7b9b220e0` (text normalized by Python read).
- Objective / reader question: Explain and bound the joint value/gradient norm. Can the reader explain and reproduce the worked case below?
- Prerequisites: `learning-certificates` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `V,grad V,S -> norm_V,Btheta,L_g,L_grad_g`.
- Baseline claim / source: Certificate complexity must control both function values and derivatives on the reachable region. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, §4, Assumptions 4.1–4.2, p.6 [located].
- Planned worked case, assumption failure and exercise/solution target: sin(mx)/m tends to zero in value, but derivative cos(mx) does not.
- Gap and derivation contract: Pilot theorem defines stacked norm, operator norm and parameter mean-value argument locally.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 107 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `certificates-in-practice`

- File: [content/18-certificates/certificates-in-practice.md](../../content/18-certificates/certificates-in-practice.md); baseline SHA-256 `c6ee71485bb555f63624f000a297a0688153fafd4aab2655f6359347ed2068b2` (text normalized by Python read).
- Objective / reader question: Separate a sampled solver result from a certificate theorem. Can the reader explain and reproduce the worked case below?
- Prerequisites: `certificate-classes` Textbook `statement` and `reasoning`, `contraction-metrics` Textbook `statement` and `reasoning`, `concentration` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `joint class,PSD,contraction -> Q,Gram,Dykstra,holdout`.
- Baseline claim / source: Gram positivity, convex fitting and holdout tests supply useful numerical evidence with explicit limits. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, §6 and Appendices A.1–A.5, pp.9, 14–19 [located].
- Planned worked case, assumption failure and exercise/solution target: m=(1,x) gives a quadratic m^TQm; PSD suffices for nonnegativity.
- Gap and derivation contract: Explain convex sampled constraints, iteration-budget failure and time/derivative approximation.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 134 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `vdp-certificates`

- File: [content/18-certificates/vdp-certificates.md](../../content/18-certificates/vdp-certificates.md); baseline SHA-256 `5cd2170048c0c22e33dacea4e6c2c1fe7a5c972573843b027cd90f19b97bfa35` (text normalized by Python read).
- Objective / reader question: Predict and interpret a change in fresh-trajectory violation rates. Can the reader explain and reproduce the worked case below?
- Prerequisites: `certificates-in-practice` Textbook `statement` and `reasoning`, `boffi-thm-5-2` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `practice,5.2 -> damped VDP,n,holdout`.
- Baseline claim / source: Learn a polynomial metric for a positively damped oscillator and inspect its remaining violation regions. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, Figure 1 and Appendix A.5, pp.2, 18–19 [located].
- Planned worked case, assumption failure and exercise/solution target: Differentiate x^2+y^2 to get -2(x^2+1)y^2; no strict decrease when y=0.
- Gap and derivation contract: Separate adapted finite experiment from Figure 1 reproduction and universal proof.
- Visual/Lab purpose: Story: existing reader-paced scene; existing flow vdp illustrates the stated mechanism; predict, intervene, observe and explain; finite runs are evidence.
- Baseline native solved questions: 0; baseline Textbook length: 169 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `boffi-lemma-4-1`

- File: [content/18-certificates/boffi-lemma-4-1.md](../../content/18-certificates/boffi-lemma-4-1.md); baseline SHA-256 `4b0b9dbedf74b4526274d0f856b0f524f837b7c6db026bf50e5bb04bc1026f6c` (text normalized by Python read).
- Objective / reader question: Apply the fast-margin interface and list its premises. Can the reader explain and reproduce the worked case below?
- Prerequisites: `margin-bounds` Textbook `statement` and `reasoning`, `rademacher-complexity` Textbook `statement` and `reasoning`, `trajectories-as-samples` Textbook `statement` and `reasoning`, `certificate-classes` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `margin,joint norm,trajectories,Rademacher -> worst-case absolute R_n,K,B_h,L_h`.
- Baseline claim / source: Zero empirical margin violations turn squared trajectory complexity into a fast generalization bound. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, Lemma 4.1, p.6 [located].
- Planned worked case, assumption failure and exercise/solution target: If R_n^2=C*3/n, leading term is 3C log^3(n)/(gamma^2*n).
- Gap and derivation contract: Pilot theorem recalls exact lemma with provenance; external fast-rate theorem is an explicitly invoked result, not an unexplained proof of 4.2.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 178 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `boffi-thm-4-2`

- File: [content/18-certificates/boffi-thm-4-2.md](../../content/18-certificates/boffi-thm-4-2.md); baseline SHA-256 `4b4075529f74ed092103d97c994c983947ef13222033d4a145ad1c9be61fcebe` (text normalized by Python read).
- Objective / reader question: Reproduce parameter cover -> joint cover -> complexity -> fast margin bound. Can the reader explain and reproduce the worked case below?
- Prerequisites: `boffi-lemma-4-1` Textbook `statement` and `reasoning`, `covering-dudley` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `lemma,cover,joint norm -> k,L_g,L_grad_g,A,B_n`.
- Baseline claim / source: A smooth k-parameter class yields an approximately k/n trajectory-violation bound, with margin, norm and logarithmic factors. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, Theorem 4.2, equation (4.2), p.7; Appendix B.1, p.19 [located].
- Planned worked case, assumption failure and exercise/solution target: Quadratic x1^2,2x1x2,x2^2 has k=3; calculate radius-dependent value/gradient bounds.
- Gap and derivation contract: Pilot: full local prerequisite bridge, volume packing and finite entropy integral; feasibility and hidden constants explicit.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 184 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `boffi-thm-4-3`

- File: [content/18-certificates/boffi-thm-4-3.md](../../content/18-certificates/boffi-thm-4-3.md); baseline SHA-256 `7ef43a20123d73a2609921e740b3a0ed3ba38c360e500ed68295c3c9b4059f65` (text normalized by Python read).
- Objective / reader question: Compare entry counting with structured matrix entropy. Can the reader explain and reproduce the worked case below?
- Prerequisites: `boffi-lemma-4-1` Textbook `statement` and `reasoning`, `dual-sudakov` Textbook `statement` and `reasoning`, `covering-properties` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `lemma,dual Sudakov,covers -> Q,m,B_Q,B_m,B_Dm,d`.
- Baseline claim / source: Structured matrix entropy improves the leading dimension dependence beyond a naive parameter count. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, Theorem 4.3, equations (4.3)–(4.4), p.7; Appendix B.2, p.19 [located].
- Planned worked case, assumption failure and exercise/solution target: Ten monomials give 55 symmetric entries, but leading structured dimension 10 with logs.
- Gap and derivation contract: Develop both entropy regimes and split the integral; no automatic radius bound from Lab optimizer.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 178 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `boffi-thm-4-4`

- File: [content/18-certificates/boffi-thm-4-4.md](../../content/18-certificates/boffi-thm-4-4.md); baseline SHA-256 `c7f1e88379d329a66a86d24ffb4c08fd33de7c8ab311724acbad9540b3fa1890` (text normalized by Python read).
- Objective / reader question: Trace joint feature approximation and its independent failure event. Can the reader explain and reproduce the worked case below?
- Prerequisites: `boffi-lemma-4-1` Textbook `statement` and `reasoning`, `kernels-random-features` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `lemma,kernels -> B_alpha,kappa,p,L_phi`.
- Baseline claim / source: A bounded-density kernel class admits a derivative-aware random-feature generalization argument. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, Theorem 4.4, p.7; Appendix B.3, pp.20–24 [located].
- Planned worked case, assumption failure and exercise/solution target: Cosine dictionary fixed before trajectories; changing dictionary after fitting violates direct fixed-class application.
- Gap and derivation contract: Develop approximation for gradients and all error terms; preserve bounded-density class.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 157 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `boffi-thm-5-1`

- File: [content/18-certificates/boffi-thm-5-1.md](../../content/18-certificates/boffi-thm-5-1.md); baseline SHA-256 `81b271705759e8979ee7c1bd0c9b5f4c42d733d1a5f1f9718c81776d0c143440` (text normalized by Python read).
- Objective / reader question: Locate the domains where probability yields approximate decrease. Can the reader explain and reproduce the worked case below?
- Prerequisites: `boffi-thm-4-2` Textbook `statement` and `reasoning`, `incremental-stability` Textbook `statement` and `reasoning`, `comparison-functions` Textbook `statement` and `reasoning`, `lyapunov-functions` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `4.2,incremental,comparison,V -> r,eroded X,r_b,beta,eta`.
- Baseline claim / source: Small violation volume yields decrease on an eroded reachable domain outside an explicit equilibrium neighborhood. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, Theorem 5.1, equations (5.1)–(5.3), p.8; Appendix C.1, pp.25–26 [located].
- Planned worked case, assumption failure and exercise/solution target: Unit ball in p=2 with beta(r,0)<=Cr gives r_b proportional to epsilon^(1/4).
- Gap and derivation contract: Derive nearby-good-point, transport and error absorption; preserve uniform measure and negative-decrease convention.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 228 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

### `boffi-thm-5-2`

- File: [content/18-certificates/boffi-thm-5-2.md](../../content/18-certificates/boffi-thm-5-2.md); baseline SHA-256 `d4e5ba464c89e3d86dc3d80cceca3cd19b623519cf8229b682c33818b9b62823` (text normalized by Python read).
- Objective / reader question: Interpret a conditional guarantee on transported directions. Can the reader explain and reproduce the worked case below?
- Prerequisites: `contraction-metrics` Textbook `statement` and `reasoning`, `boffi-thm-5-1` Textbook `statement` and `reasoning`. Consumed -> introduced symbols: `5.1,M,J -> prolonged domain,theta_t,zeta_p,B_H`.
- Baseline claim / source: True contraction and a small tangent-bundle violation measure give a conditional learned-metric decrease region. Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data, arXiv:2008.05952v2, September 2020, Theorem 5.2, p.9; Appendix C.2, pp.26–29 [located].
- Planned worked case, assumption failure and exercise/solution target: For linear f, D^2f=0 so Hessian-driven exclusion radius is zero.
- Gap and derivation contract: Retain v2 eroded/time-dependent domains; true contraction is assumed; energy rate halves for norms.
- Visual/Lab purpose: Story: none required; no new visual required for this proof/concept; worked symbolic calculation carries the inference. Link an existing Story only when it answers the objective.
- Baseline native solved questions: 0; baseline Textbook length: 276 whitespace-separated tokens. These counts are diagnostics, not quality quotas.

## Acceptance and evidence boundaries

Separate agent beginner review and mathematical source/proof review, with distinct reviewer identities per slice and hashes in reports. All critical/moderate findings require patch plus recheck. Keep source metadata located; a pilot educational review does not automatically upgrade scholarly provenance. Coordinator runs Python build, Node tests, Chrome/Edge guarantees checks, then dedicated changed-lesson desktop/mobile light/dark math and screenshot inspection. Check all changed Story/Card views too. Keep original numerical/story fingerprints unless deliberately changing engines (none planned). Student outcomes, human review, global certification and exact Figure 1 reproduction are outside this evidence.
