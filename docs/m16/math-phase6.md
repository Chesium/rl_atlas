# M16 Phase 6 independent mathematical integration review

Reviewer `/root/phase6_math`, assignment P6-M, 2026-10-20. Independent of the writers and Phase 6 beginner reviewer. Ownership is this report and `docs/handoffs/m16-phase-6/agents/math.md` only. Baseline `f2e18dc`, with the five coordinator lesson repairs identified below. **Pass within the cross-route scope below; no new critical, moderate, or minor mathematical finding.** This is an agent mathematical integration check, not a human proof audit or a new complete proof audit of every station.

## Scope and evidence boundary

Read AGENTS.md, the adapted atlas-writing skill, its rewrite workflow, and the pedagogy checklist. Inspected all 37 current station prerequisite declarations and Card statements/assumptions, cross-part Textbook seam passages, and all five route destinations in `content/routes.toml`. Independently re-derived consequential cross-route calculations rather than treating earlier reports as proof. Earlier station-level proof/source audits remain in `math-phase2-3.md`, `math-phase4.md`, `math-phase5.md`, and `math-phase5-resume.md`; their checked scope and external-result exclusions remain separate. The inventory below records current hashes, not an assertion that every proof was re-audited in Phase 6.

The five changed lessons were additionally read as diffs against HEAD and in their affected context: `dual-sudakov`, `kernels-random-features`, `rademacher-complexity`, `boffi-lemma-4-1`, and `vdp-certificates`. No lesson, metadata, engine, generated bundle, or source-review status was edited by this reviewer.

## Primary sources actually refreshed

Used installed `C:/P/MiKTeX/miktex/bin/x64/pdftotext.exe -f FIRST -l LAST -layout PDF -` on actual local PDFs:

| Source | Pages read this pass | Consequential seam |
| --- | --- | --- |
| `course/ese6180/boffi-v2.pdf`, arXiv:2008.05952v2 | pp.6–7, 18–19, 23, 27–28 | Lemma 4.1's exact absolute/worst-sample convention and confidence term; joint value-gradient norm; printed 4.2/4.3/4.4 and B.1/B.2; independent feature dictionary, shifted residual; prolonged block metric, lost true rate, condition-number floor and factor-two conclusion |
| `course/ese6180/learning.pdf`, Shalev-Shwartz and Ben-David (2014) | printed pp.331–332, PDF pp.349–350 | Lemma 26.9's signed scalar contraction argument, relabelling the two maximizers; no zero-at-origin condition needed for the signed convention |
| `course/ese6180/contraction.pdf`, Lohmiller–Slotine author preprint `finalDec1997` | pp.4–6 | Path integration, explicit warning that convexity alone does not establish invariance, metric energy and generalized Jacobian |

The Boffi extraction exposes the source's actual conflicting final `-2(1-eta)lambda M` after its proved scalar energy inequality with only `(1-eta)lambda`. The current lesson correctly preserves that distinction. No new access attempt or source-proof claim is made for Angeli, Srebro–Sridharan–Tewari, Vershynin, Rahimi–Recht, Maurer, or the other externally invoked results. Khalil/Hespanha station proofs retain their prior audits; they were not re-read from the PDFs here. Lemma B.1 was used as a recalled result; its approximation-to-generalization interface was checked, not its external vector-contraction proof. No internet search was necessary for this local primary-source audit.

## Cross-route checks and dispositions

| Route/seam and checked passages | Independent reasoning/evidence | Disposition |
| --- | --- | --- |
| Dynamics → Lyapunov → comparison → contraction: `stability`, `lyapunov-functions`, `lyapunov-equation`, `comparison-functions`, `incremental-stability`, `variational-dynamics`, `contraction-metrics` | Product rule gives `dot E <= -2 alpha E`, hence length rate `alpha`. Shared `A=[-1,3;0,-2]`, `P=[.5,.5;.5,1]` satisfies `A^T P+PA=-I`. Eigenvalues `.1909830056,1.3090169944`, norm rate `.3819660113`, Euclidean prefactor `2.6180339887`. At displacement `(.8,.6)`, Euclidean energy derivative `.16`, metric energy `1.16`, metric derivative `-1`. All three uses of this example agree. | Pass |
| Whole-path invariance: `ode-sensitivity`, `contraction-metrics#paths`, `boffi-thm-5-2` Steps 1b–3 | Entire joining curve must remain inside the region of the differential inequality. Convexity permits the initial segment; invariance transports it. Infima over curves avoid assuming a transported geodesic is shortest. In 5.2 the initial state segment lies in the eroded state's ball, and interpolated unit directions have norm at most one; true metric contraction bounds their transported norms by `sqrt(L/m)`. Thus the prolonged estimate applies to the whole transported segment, although the entire product ball need not itself be invariant for arbitrary starting directions. | Pass |
| Continuous/discrete, controller/certificate, value/certificate: `dynamical-systems`, `time-dictionary`, `two-values`, `controller-or-certificate`, `converse-iss`, `imitation-deployment`, `three-contractions` | Continuous `dot V` and discrete `Delta V` remain distinct. Euler's factor `1-h` requires `0<h<2`; a true Euclidean bound with prefactor `C>1` cannot be used as a one-step contraction with factor `exp(-alpha h)`. Discounted identity `grad J f=rho J-ell` does not imply decrease. Deployment recurrence requires errors at deployed states and an invariant tube. None of Bellman, physical, and signed statistical contractions is substituted for another. | Pass |
| Statistical selection → residual class: `risk-erm`, `concentration`, `finite-classes`, `uniform-convergence`, `rademacher-complexity`, `rademacher-properties`, `margin-bounds`, `boffi-lemma-4-1#objects` | Pointwise concentration does not cover the selected member; the common event does. For the same class, signed empirical ≤ absolute empirical ≤ worst-case absolute. Changing certificates to residual functions changes the class/domain and admits no generic monotonicity rule. Four-sign enumeration for singleton residual `b=1`, `n=2` gives signed `0`, absolute `.5`. Signed offsets average to zero; absolute offsets do not. | Pass; repaired Lemma 4.1 wording independently accepted |
| Margins and samples: `trajectories-as-samples`, `learning-certificates`, `margin-bounds`, `boffi-lemma-4-1`, `boffi-thm-4-2#feasibility`, `certificates-in-practice`, `vdp-certificates` | `n` counts independent initial states; time samples are one trajectory. Fixed `gamma` and all-times feasibility precede the bound. A scalar Lyapunov residual vanishes at equilibrium and can make a fixed margin infeasible; the Lab uses an extra norm rate. For a contraction metric its slack is `2(.05)M`, directional slack `.1 delta x^T M delta x`: it vanishes with tangent displacement, not with the base state. With `M>=I` and fixed nonzero displacement it remains positive even at equilibrium. | Pass; repaired VdP paragraph independently accepted |
| Parameter cover → derivative cover → residual cover → Lemma 4.1: `certificate-classes`, `covering-dudley`, `covering-properties`, `boffi-thm-4-2` | Parameter FTC controls both values and gradients; sup-of-differences transfers the cover through worst time. A value-only cover cannot control `grad V f`; `sin(mx)/m` shows why. Internal certificate centers preserve the domain of the residual Lipschitz constant. Absolute chaining needs a zero-residual reference; otherwise add `B_h/sqrt(n)`. Signed chaining constant `12`, absolute `24`; converting arbitrary centers to class centers costs scale factor two, hence `48`. The integral must truncate once one center covers the class. These qualifications agree across all four lessons. | Pass |
| Quantitative 4.2 assembly | Independently computed `I=1.3525813583`, `24I=32.4619525981`. With reachable radius `2.03`, `Lg=5.0470511405`, `L_gradg=4.9724641778`, `Lh=7.5186526443`; product with `Btheta=2` is `150.6665106858`; leading three-parameter coefficient is `68101.1923`. Finite-horizon singular-value scan gives minimum `.3796642087>.37`; analytic matrix decrease with conservative `.37` gives residual ceiling `-.1010591147<-.1`. The scan supports the displayed numerical example, not the general theorem. | Pass |
| Matrix destination: `dual-sudakov`, `boffi-thm-4-3` | `grad(m^T Delta m)=Dm^T(Delta+Delta^T)m` supplies factor two. Frobenius radius and operator-norm covers are distinct; internal centers cost a fixed scale factor. Split integral has volume at small scales and Sudakov at larger ones; Sudakov alone diverges at zero. Dimension examples give `55` versus `53.0189811` at `d=10`, and `500500` versus `47717.0830` at `d=1000`. Unknown constants prevent numerical gain claims. Corrected prerequisite declares 4.2 upstream of this optional branch; no circular mathematical dependency is introduced. | Pass; repaired route prerequisite accepted |
| Kernel destination: `kernels-random-features`, `boffi-thm-4-4` | The approximation is in value and gradient, conditional on the data; the generalization event is conditional on the independent dictionary. Each holds on the product space and a union bound needs no independence between their good events. Two approximation failures give `2/n^2`. The data-only error-bound event contains their intersection, so its marginal probability is at least `1-delta-2/n^2`. This is correctly separated from the paper's printed additive `1/n^2` risk term. Stacked errors each `gamma/(8 sqrt(2)Lh)` move residuals by at most `gamma/8`; shift by `gamma/4` leaves margin `gamma/2`. Shift complexity costs `gamma/(4 sqrt(n))`. | Pass |
| Fixed dictionaries and selected margin: changed exercise in `kernels-random-features#exercises` | Conditional on ten dictionaries independent of trajectories, Lemma 4.1 at fixed common `gamma` and `delta/10` holds on one event for all ten classes. Selection among them is allowed if the selected fit meets that same `gamma`. It does not justify plugging in the largest data-selected achieved margin. Substitution adds `log 10` to the outer logarithm (and hence `2 log 10` to the lemma's full numerator). | Pass; repaired exercise independently accepted |
| Probability → regional decrease: `boffi-thm-5-1`, `comparison-functions`, `incremental-stability` | Small violation probability alone is not global validity. Uniform state measure, strict bad measure `<epsilon`, an eroded initial region, incremental stability, convex-domain gradient bounds and lower bound `V>=mu||x||²` supply the transfer/absorption argument. The weaker Boffi time convention is explicitly distinguished from ordinary class KL. A high-probability bound `err<=epsilon` must use a slightly larger geometric epsilon to obtain the strict premise. | Pass |
| Reconstructed 5.2 versus printed claim: `boffi-thm-5-2#reasoning`, `#radius`, `#ex-bump` | Prolonged coupling costs `vartheta*kappa_H/2`, not `lambda_star*vartheta*kappa_H/2`. Thus `vartheta<=2(1-omega)lambda_star/kappa_H`, capped at one. At `omega=.5`, `C_M=max{sqrt(L/m),(L/m)^(3/2)B_H/lambda_star}` and the additional `sqrt(2)` displacement factor survive. Energy rate `(1-eta)lambda` gives half that norm rate. Liouville gives invertibility without assuming time-varying Jacobians commute. The reconstructed squared radius was invariant to field/time scaling at factors `.2` and `7` in an independent assertion; the printed one is not. | Pass |
| 5.2 analytic counterexample premise | Recomputed `H(.045)=.7761813543<1`, sector measure `.02274784074<.03`, `r=.4550827521`, eroded radius `.5449172479`, test radius `.5141421356`, and positive energy derivative `18.8375664643`. The logarithmic derivative of H is strictly negative outside `.045`; the annular sector is an upper enclosure of every inward ray that could hit the violating ball. Direction factors cancel, so this also bounds product measure. At bump center, exact `grad_x q=2500 e1`; reconstructed exclusions exceed `56.7267` at `eta=.5` and `40.1118` for every `eta<1`, leaving an empty region because transported unit directions are at most one. Printed zero exclusion is contradicted at time zero. | Pass; source error remains visible |
| Adapted Figure 1 destination: `certificates-in-practice`, `vdp-certificates` | Holdout bounds concern checked-time violation of a frozen fit, not all-time validity or verified true contraction. Independently computed one-sided 95% Hoeffding radius `.1223873415` and zero-of-100 limit `.0295130496`. Same holdout points across n permit paired comparison but require simultaneous confidence for a comparative claim; the lesson uses the union bound explicitly. Paper protocol and finite Lab protocol remain separated. | Pass |

The `rademacher-complexity` repair aligns the hypothesis symbol `psi` and risk notation with `risk-erm`; no equation or convention changed. Checked the actual upstream Card and local definitions rather than assuming the change was merely cosmetic.

## Recomputations actually executed

An inline Python/Numpy assert run checked matrix identities, rates, the two-sign singleton, parameter constants, finite-horizon feasibility numbers, matrix dimension factors, bump inequalities, holdout limits, relative tangent slack and time-rescaling invariance. All assertions passed. The entropy integral was recomputed by composite Simpson integration after `u=exp(-t)` on `[0,36]` with 20,000 intervals, giving the number above; the omitted tail is negligible at displayed precision. The first attempt imported SciPy, which is not installed; it failed before doing any calculation. The successful rerun used Numpy and the standard library, with the exact triangular linear flow in place of a matrix-exponential dependency. These numerical checks support explicit examples; the general seam arguments are the algebra and event/path reasoning recorded above.

No new finding requires a content repair. Passing this bounded review does not imply that the externally recalled Lemmas 4.1/B.1, dual Sudakov, or source-specific advanced results were independently proved here. It does not upgrade any `located` or `pending` record.

## Current inspected candidate hashes

Raw SHA-256 read from the current files with `Get-FileHash`; all 37 inventoried stations were inspected at the integration scope described above. Part 15 has 10, Part 16 has 5, Part 17 has 12, and Part 18 has 10.

| Part / station | SHA-256 |
| --- | --- |
| 15 comparison-functions | `6e6f2934b2dc5cca712b9cbf1123fd0ae1dcc70979eed3b39019c3112149c51a` |
| 15 controller-or-certificate | `40ca5b4ac0bdb36bc801a63f90669f3c83962c2217999af90b26de6bd2716e3e` |
| 15 converse-iss | `06c9d2b3d8da078d1725d968f2318f3099e0740634ec729337708da4069535d8` |
| 15 dynamical-systems | `157d87fdd2ae36924f96520b9f4e9285b94f4120efaaa7b8b3078e7184232068` |
| 15 lyapunov-equation | `bfba965a84f9cb20d054bfb08353e05d6411e12ce7d41315ab31fec0c41aaf2b` |
| 15 lyapunov-functions | `22fbd748c62960a42bc9c20fe8d80b83d9d29a92b215b474f4c6c8e2036e3209` |
| 15 ode-sensitivity | `0c8a1dacd1180c8359f3a64a225cd34a84b1387f10a8fca69f01983cd4d10652` |
| 15 stability | `69ec2303077c7018b9e7d94d63c141c1d3b260bd1861732afb010fa68385c0fd` |
| 15 time-dictionary | `5f1bba0504f621057cfb877c270d3939d4cdb0aec4f21ee3ff6e444445be82c9` |
| 15 two-values | `a2803d01f6bf02f5aa5fa399e673256a4bd6971167188a8c7af9be2c76b28f10` |
| 16 contraction-metrics | `1a49590d6ac5e46c7668309a491a528231879a7841c0f3bd50f2440bee2b715b` |
| 16 imitation-deployment | `89313b6e849fe2f68073bffb3516cb318bf009bee52b691918170b317ec26239` |
| 16 incremental-stability | `253e7af53f0d90b269fa7fcacd87c448c0903c52c0f92d8d0e5ab7eb8f231d0f` |
| 16 three-contractions | `4c454424deb3f2eaf444c27232fa157fb5857a6a5fa66ae37cb8ae6b73a844b4` |
| 16 variational-dynamics | `6c20451763162b22cb151a76137931cd7505acfa5edbdb389e13a853bdf74de7` |
| 17 concentration | `4e2a4c823042e3dea2d08370a098cacaecdd5009e9c093e97aa5a57e730a727d` |
| 17 covering-dudley | `78afb59ded9b86739f063c03a648e9f6200412096b1076d42eb49b119e63605d` |
| 17 covering-properties | `5a8e788e3ba547b2a75e2f897e33e042e9626ff486125583352cd0da51f83d5e` |
| 17 dual-sudakov | `8472a340b604464c3773acebaf761bc969e097e5e6511cb5baef86a4aebe4564` |
| 17 finite-classes | `2e77adc13fbcf6d54a7451ad779c0bd5a51785479c943133e1a90c3a8800724d` |
| 17 kernels-random-features | `bf1c2ee71430eb4db1f701db79825c4afa432554b619ebf3ab19f19063e27053` |
| 17 margin-bounds | `da81acff72b9ebba962d2ae0aa8b2fcf291724c5b072d7917f87b409f31c1f26` |
| 17 rademacher-complexity | `d7ca8fa543685ee617cc89c91c2cae23e258fbac14249e0263aae82776d0f2b4` |
| 17 rademacher-properties | `bd9311c56347f9e5149a2fcf77832cf0be462b7ce0f668db957a84afb002db04` |
| 17 risk-erm | `79a0d9138bc473f74f9dbb1eff7a8901dc8b89284ca4cb00b12e5f761609b352` |
| 17 trajectories-as-samples | `b12bb7f4e37695a53594123028383f9e516ab52e0329c24f3dad18eb0f402e66` |
| 17 uniform-convergence | `e9c01b793323f348dbcdddde9981e48b43d097dce29460ee1ea2a89a6be16490` |
| 18 boffi-lemma-4-1 | `2b24cde68fa5e6dbe5fe8a9cc9ac65410f5dbb8d96d0447fe14575edbae41664` |
| 18 boffi-thm-4-2 | `98de2abec1b8bdb6f7f24b44a7320f0aee61782bcbeb59fb220ae96fb19774d9` |
| 18 boffi-thm-4-3 | `672ef036b02f5175153d7ebb5db28ccfd9b08d324c074f691c406ba4ca78fde6` |
| 18 boffi-thm-4-4 | `b0db6b7f6185de82a78c95094d0c140dcede9c86200ffad204e1308595ade6f9` |
| 18 boffi-thm-5-1 | `3b80bceb9973942c1e8fd0743fac70b8c2cd1c93fbcbd035e7edaa46014d9c6e` |
| 18 boffi-thm-5-2 | `ec58b68cbe74f6728e3e063481a93cde6447e75e21a3a3ca8573860f7c9993a8` |
| 18 certificate-classes | `344efbd79911eb0138866127066850841a1500154653f8d62d1ba2eb2170f5e2` |
| 18 certificates-in-practice | `75b44bd299e19b06dc2526e6df3e7535b384474ba784f8dbc3c0e6590edf4097` |
| 18 learning-certificates | `0b6efa0644eb37bf1b248631a242d10c949377eb2660d0cc4d74f224a27429a9` |
| 18 vdp-certificates | `0385aefb1a0d54791f265b3e0da197d27bf6050f07e4dcaa1483b9f701047308` |

## Remaining gates

Coordinator must reconcile beginner review and rendered/product checks and ensure no later meaning-changing edits inherit these hashes. I did not run build, browser, engine experiments, accessibility/layout tests, source-status upgrades, commits or publication. No new mathematical risk was found in these integrated seams; the expressly recalled external proofs and absent human proof audit remain the stated limitations.
