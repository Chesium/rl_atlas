# M13–M14 implementation review, 2026-10-19

The public offline build now has 140 stations in 19 parts: 37 algorithms, 97 concepts and six results.
The guarantees row adds 37 stations, each with a Textbook and Card, plus three stories and computed figures.

## Routes and results (M13)

The fourth map view uses deterministic prerequisite closure and layered layout. Every existing RL station can be
a destination, including PPO and Q-learning. Seven named routes cover those two and the paper's main parametric,
structured-matrix, kernel, contraction and experiment paths. The main Theorem 4.2 path contains 16 required stations;
RL motivation and optional alternatives do not pull in the full RL syllabus. Opening supporting branches exposes
those links. Five stroke patterns and hover locators distinguish edge roles. Required cycles are build errors;
non-required cycles are permitted. Existing algorithm parents and the family tree retain their meaning.

Result cards explicitly carry statements, examples, assumptions/domain, proof sketches and uses. Sources carry kind,
edition-specific locator and review status in both Textbook and Card. Personal proof progress survives reload and is
separate from source review and experiment results. Legacy RL source records remain backwards compatible.

## Guarantees track (M14)

The four parts cover dynamics and Lyapunov theory; incremental stability, contraction and the bridges from RL;
statistical learning and complexity; and certificate learning. The six results are Boffi Lemma 4.1 and Theorems
4.2, 4.3, 4.4, 5.1 and 5.2. They reference the 30-page arXiv:2008.05952v2 and its proof appendices. The theorem
entries retain domain erosion, excluded neighborhoods/directions, independent-trajectory counts, margins, norm
bounds and true incremental/contraction assumptions. They explain the displayed-sign and energy/norm-rate
conventions using the proofs. Source review is **located** throughout; independent scholarly proof audits are not
claimed. No public text relies on the course's draft technical appendix.

The flow Lab implements continuous and discrete linear systems, the damped pendulum and damped Van der Pol,
RK4, phase-plane fields/trajectories, quadratic contours, sampled violation regions, metric ellipses and a nearby
cloud. The certificate learner uses PSD projection, Dykstra halfspace projections and eigenvector cutting planes.
Quadratics are positive by construction; polynomial metrics have degree-four entries and global Gram positivity.
Sampled feasibility is checked with full residual matrices. The browser runs fitting in a cancellable Worker.

The 20-seed bench offers typical/manual/rolled seeds and click-to-replay, a seed strip, a middle-half summary,
independent holdout tests and a paired sweep in n. Fresh-trajectory error is a finite-horizon sampled-time estimate.
A normalized k/n shape is explicitly not a numerical theorem bound: the fit uses a relative margin, does not
bound all class radii/constants, and does not enforce continuous-time constraints everywhere.

The Van der Pol story pins seed 5 at n=2, 8, 32. It has respectively 76, 6 and 0 failures among the same 100 holdout
trajectories; all three fits meet the sampled training tolerance. A coefficient hash and those outcomes are pinned
in `tests/flow-story-runs.json`. This seed was checked alongside seeds 1–5 before selection, and the Lab shows its
position in the full bench. The experiment preserves dynamics, initial ball, horizon and metric degree from the
paper but changes integration, derivatives, solver and constraint sampling. It is an adapted violation-set experiment,
not a numerical reproduction of Figure 1. The quadruped remains outside the Lab.

## Validation

- `python build.py`: 140/140 written, zero warnings; the public bundle contains no course payload.
- `node --test`: 97/97 passed, including the existing RL/deep/recording/story/course gates and 14 new flow/route gates.
- New numerical checks: RK4 convergence order, analytic Jacobians against differences, eigen-reconstruction and PSD
  projection, a closed-form 2×2 Lyapunov solution, exact residual identities, stable/unstable solver behavior, nonlinear
  Gram-metric derivative checks and full-direction training feasibility.
- Graph/schema checks: deterministic closures/layouts, every destination, required cycles, supporting branches,
  provenance validation and complete result cards.
- Palette: each new quantity text color exceeds 4.5:1 against background and surface in both themes. Geometry also
  distinguishes the quantities; this is not a claim of a separate color-vision usability study.
- Installed Chrome 155.0.8059.80 and Edge 155.0.4283.62, from `file://`: 148 new entry/mode/viewport visits per browser,
  with no page errors, external network requests, page overflow or mobile formula overflow. Both exercise proof
  progress after reload, route folding, seed replay, Worker stop/restart and a complete 100-fit metric sweep.
  The same seeded metric fit matches Node exactly. Evidence: ignored `browser-check-results/m13-m14-{chrome,edge}/`.

Both browsers obtained the same metric sweep at test norm rate 0.1:

| n independent training trajectories | Mean holdout violation | Fits meeting sampled tolerance |
| --- | --- | --- |
| 2 | 68.8% | 18/20 |
| 4 | 38.5% | 20/20 |
| 8 | 19.6% | 19/20 |
| 16 | 8.0% | 16/20 |
| 32 | 1.1% | 11/20 |

The decreasing holdout estimate is evidence for this experiment. The declining feasibility count at large n shows
that the 250-iteration solver budget becomes limiting; it is retained in the table, not filtered out.

Screenshot review covers routes, the guarantees row, result cards, stories, phase planes and both themes at
1440 and 390 pixels. Review found oversized theorem equations on mobile, overly broad theorem routes, long map
labels and a misleading concept count that included results. Equations now split into named terms, bridges fold,
labels shorten without changing accessible titles, and the legend counts results separately. Playback caches static
fields and violation grids. Browser automation and screenshot inspection do not establish a student's learning
outcomes, an independent proof audit, or exact reproduction of the paper's original numerical experiment.

Reproduction and authoring details are in [guarantees.md](guarantees.md). No commit, push, deployment or M15 course
pack work was performed as part of these milestones.
