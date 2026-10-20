# Routes, results and learning guarantees

The public atlas has 140 stations in 19 parts. Parts 15–18 are the guarantees track. Open the offline
`rl_atlas.html`, choose **Routes** under **Views & filters**, or choose **Flows** in the header for experiments.

## Authoring routes

`content/routes.toml` contains named destinations and typed arrows. Arrows point from an idea to its consumer:

```toml
[[route]]
id = "read-thm-4-2"
title = "Read Theorem 4.2"
destination = "boffi-thm-4-2"

[[link]]
from = "neural-networks"
to = "boffi-thm-4-2"
role = "optional"
at = "Example class: smooth networks; not needed for the parametric proof"
```

Roles are `required`, `sufficient`, `illustrative`, `motivation` and `optional`. `at` is a nonempty locator or
explanation of where the link is used. An entry's existing `prereqs` also generate required arrows. The build
rejects unknown stations, unknown roles, missing locators, duplicate route IDs and required-link cycles.
Non-required cycles are legal: a motivation or a sufficient converse is not a prerequisite.

The route view initially expands required links. Other roles between visible nodes are drawn too. **Open supporting
and optional branches** expands the remaining incoming branches. Stroke patterns distinguish all five roles;
hovering a stroke shows its role and `at`. Every station remains selectable as a destination. `parent` remains the
algorithm family tree and is independent of the route graph. Graph closure and layout are pure operations in
`app/js/routes.js`; no coordinates are saved with content. RL bridges are supporting links where the paper does not
need an RL derivation. The main Theorem 4.2 route has 16 stations rather than importing the entire RL curriculum.

## Authoring results and provenance

A map station may use `kind = "result"`. Its entry requires `summary`, `time`, `sources`, and Card sections
`statement`, `intuition`, `assumptions`, `proof`, `uses`. Missing result requirements are build errors. Every result
source requires all three provenance fields:

```toml
sources = [{ text = "Author, title", url = "https://example.org/paper",
             kind = "paper", locator = "arXiv version, statement, page", review = "located" }]
```

Write the inline table on one line in actual TOML. Source kinds are `textbook`, `paper`, `course note`, `personal note`
and `bridge explanation`. Review statuses are `located`, `proof-checked` and `pending`. Located means the relevant
source was found and consulted; it does not mean an independent proof audit. Cards and Textbooks display the kind,
locator and status. Legacy RL citations without these fields remain supported; their old citation text is preserved,
and the build does not invent a source review. A result's **I have worked through this proof** checkbox records the
reader's own progress in local storage and does not change editorial source status.

`time` is `continuous`, `discrete`, `both` or `statistical`. Concepts may use it too. New quantities use `\cert`,
`\met` and `\viol`; their tokens are in `app/css/tokens.css` and their explanations on the Symbols page.
The shapes also distinguish quantities: contours, dotted ellipses and filled violation squares.

The Boffi results cite *Learning Stability Certificates from Data*, **arXiv:2008.05952v2**, including appendix and
page locators. The ten-page conference paper is PMLR 155, pp.1341–1350 (2021); its numbering and page locators must
not be mixed with the extended paper. The v2 record reports corrections to Theorems 5.1, 5.2 and Proposition D.1.
The theorem entries explain the negative-decrease convention from the proofs where the displayed violation-set
signs are inconsistent. Theorem 5.2's lesson distinguishes a counterexample to the printed radius from a labelled
reconstruction with added assumptions. It states the differential-energy inequality explicitly: norm decay is half
the energy decay rate. All six result source records currently say **located**, not proof-checked.

## The flow engine

`lab/flows.js` has no DOM and is loaded by `lab/node.js`. Worlds are autonomous flows, rather than MDPs with
invented actions. They include a configurable 2×2 linear system, a discrete linear map, the damped pendulum
and the positively damped Van der Pol system. Continuous flows use fixed-step RK4 and the atlas's deterministic
transcendental math. The same seed and settings match exactly in Node, installed Chrome and installed Edge.

Quadratic fitting uses V(x)=xᵀPx with P ≥ I. Metric fitting uses M(x)=I+B(x)ᵀQB(x), Q ≥ 0. B contains the monomials
[1, x, y, x², xy, y²] separately for each displacement coordinate, so Q is 12×12 and metric entries have degree four.
Dykstra projections combine affine sampled decrease constraints with a PSD cone projection. A Jacobi eigensolver
provides that projection. A violated full residual matrix contributes its worst eigenvector as a cutting plane.
The reported maximum residual and feasibility flag use the full matrices at training times, including directions
not present in the original direction list. The finite iteration budget can leave a feasible problem unresolved;
this is reported and not classified as system instability.

The public Flow Lab uses an embedded Blob Worker. `build.py` generates `app/flow-worker.js` from `lab/core.js`,
`lab/deep/dmath.js`, `lab/flows.js` and `lab/flow-worker.js`. Stop and page navigation terminate the owned worker;
changing settings cancels stale work. The background field and violation grid are cached during playback. A nearby
cloud uses extra initial states only for visualization; it is not additional training data.

## What the experiments do and do not establish

Every bench uses seeds 1–20. Each seed draws n independent initial states uniformly in the radius-two ball and
100 holdout initial states from another stream. Sweeps share the holdout stream across n. Typical chooses the
lower median violation rate, with seed order breaking ties. The strip can replay any bench seed; manual and rolled
seeds also work. Training trajectories are nested across n. Each holdout trajectory fails if any sampled time
violates the tested inequality. The displayed grid uses full residual eigenvalues for metric tests.

The default continuous horizon is three seconds, step 0.02, with constraints at every tenth point. Fitting uses
rate α+0.05 and tests at α. This is a **relative decrease margin**, not the paper's fixed scalar margin γ. The model
radius and all theorem constants are not bounded by this optimizer. Therefore the dashed normalized k/n shape
is a scaling comparison, not a numerical application of Theorem 4.2. The method text states those differences.
A fixed certificate with zero of 100 holdout failures has a one-sided 95% binomial upper limit of about 3%; this
statement requires fresh holdout sampling and is not a simultaneous guarantee over adaptively selected models.

The Van der Pol experiment preserves the paper's dynamics, initial ball, horizon and metric polynomial degree.
It uses analytic derivatives/Jacobians, a coarser integrator, fewer constraint times and a small Gram solver rather
than the original SOS setup. It is an **adapted reproduction of the violation-set idea**, not a numerical reproduction
of Figure 1. A finite time grid, holdout and phase-plane grid are evidence only. Uniform-in-time and uniform-in-space
claims require extra approximation/regularity arguments. The quadruped experiment remains a linked description.

## Verification

```
python build.py
node --test
node tools/guarantees-check.js chrome
node tools/guarantees-check.js edge
```

The browser command uses `playwright-core` and installed browsers. It writes ignored evidence under
`browser-check-results/m13-m14-<browser>/`. It checks both themes, mobile and desktop math/layout, route folding,
proof progress after reload, worker cancellation/restart, 20-seed replay, a full metric sweep, the pinned story,
external requests, page errors and exact Node/browser numeric agreement. It also saves screenshots for visual review.
The route check compares the visible required and expanded supporting closures for all five guarantees destinations.
`tests/flow-story-runs.json` fingerprints the three fits in the Van der Pol story. Review the story against the bench
before deliberately changing those fingerprints. Source/proof review remains a separate scholarly task.
