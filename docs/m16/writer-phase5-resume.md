# M16 Phase 5 final minor repairs

2026-10-20. Assignment P5-WR; writer agent `/root/phase5_patch`.
Input: worktree based on `82f00a4`, including the saved Phase 5 drafts and
independent reports `beginner-phase5.md` and `math-phase5.md`. This report covers
only the final repairs below, not the earlier rewrite shown by the full git diff.

## Ownership and dispositions

Owned content: `boffi-thm-5-1.md`, `boffi-thm-5-2.md`, and `boffi-thm-4-4.md`
under `content/18-certificates/`. Owned evidence: this report and the assignment
handoff. No other files edited; no commits, nested agents, or publication.

| Finding | Repair and affected reader task |
| --- | --- |
| B5-24 | Theorem 5.1 now counts three additions, lists `f` continuously differentiable as added in both assumption lists, and recalls the interior-ball alternative in the Card. A reader can inventory the premises and distinguish the two boundary repairs consistently across views. |
| B5-25 | The reconstructed Theorem 5.2 now displays its radius and `C_M` in the statement. The derivation retains its existing label. A statement-first reader can choose the reconstructed formula without using the nearby false printed radius. |
| B5-26 | Theorem 5.2 consistently identifies independent mathematical-agent checking and the absence of a human proof audit. Removed stale pending/unaudited language. Step 5 identifies the paper's `A(s)` as the Jacobian along the trajectory. A reader can distinguish checked scope from human audit and follow the notation in the invertibility argument. |
| B5-27 | Theorem 4.4 Step 9 now explicitly says the data-only success event contains `E` intersect `G`, and its data probability equals its joint probability. A reader can justify eliminating the auxiliary feature draw from the confidence statement. |
| M5-9 | Already repaired in the input. Verified the Card uses a free true norm rate and separately states the paper's equality with the learned energy rate. No further edit. |

These are writer dispositions awaiting independent rechecks. No theorem premises,
conclusions, rates, numerical examples, station IDs, anchors, or metadata status
were changed by this repair. The existing reconstructed theorem remains the
reconstruction already assessed by the mathematical reviewer.

## Dependencies and provenance

Read AGENTS.md, atlas-writing skill, rewrite workflow, technical-writing guide,
textbook-style guidance, and pedagogy checklist; inspected the Part 18 route
contract, current content, review reports, authoring syntax, and guarantees guide.
The prerequisite route remains the accepted Parts 15–17 and local Part 18 bridges.
No new concepts or symbols introduced, except the explicit identification of the
already quoted source notation `A(s)`.

Source edition remains Boffi et al., arXiv:2008.05952v2, available locally as
`course/ese6180/boffi-v2.pdf`. The repairs use the source locators and checked
scope in `math-phase5.md`: Appendix B.3 p.23 for the feature-event bookkeeping;
§3 and Appendix C.1 pp.25–26 for smoothness and boundary repairs; Appendix C.2
pp.26–29 for the reconstructed radius and flow-derivative argument. This writer
did not reopen or independently audit the PDF: the task is reconciliation of the
existing independent reviews. All source records remain `located`.

## Validation

- Called the existing `build.compile_content` read-only: 0 errors and 0 warnings.
  This compiles the native authored content without writing coordinator-owned
  generated bundles.
- Asserted all three files have no unexpected control characters, retain
  `review = "located"`, and have unique equation labels.
- Asserted the radius and `C_M` display inside `thm-52` matches the derivation
  exactly, with a single `rb-repaired` label.
- Asserted the stale Theorem 5.2 status phrases are absent and M5-9's Card repair
  is present. Existing example computations were not changed or rerun.
- Coordinator must run the full build, Node tests, independent affected-passage
  rechecks, rendered math checks, and desktop/mobile theme inspection.

## Raw SHA-256

| File | Before | After |
| --- | --- | --- |
| boffi-thm-5-1.md | `48e3e2048d955a9d4c75b5c8ced2fab910ff32009e4ee9944ffb9c96d1caf71c` | `3b80bceb9973942c1e8fd0743fac70b8c2cd1c93fbcbd035e7edaa46014d9c6e` |
| boffi-thm-5-2.md | `a95c8f9cee2ecddb60dc67d04aca8cfa7d1f935ec241a21be42cee6cfbfba236` | `5db30a59657e4ac80295753e65cd058e774b09a3cf9da8abd9521b772d3c0a50` |
| boffi-thm-4-4.md | `b5b5b20ad05898f104b79acc7c33071a832a7a582ffee0d1f1cd1799c175391e` | `b0db6b7f6185de82a78c95094d0c140dcede9c86200ffad204e1308595ade6f9` |

## Additional repair M5-R1: analytic counterexample premise

The coordinator and fresh independent mathematical reviewer identified a moderate
gap: a finite-grid estimate alone cannot establish the small-measure premise for
a definitive counterexample. On coordinator assignment, changed only Theorem
5.2's `ex-bump` and its dependent erosion exercise answer. This supersedes the
earlier statement that no numerical examples changed.

For `s = ||x-x0||`, the lesson now derives
`|x dot grad w| <= H(s) = 2s(s+.5) exp(-s²/rho²)/rho²`. Its logarithmic
derivative is negative for all `s >= .045`: the positive reciprocal terms
decrease and the negative linear term decreases. Since `H(.045) < 1 <= w`,
all violating states lie inside the radius-.045 ball. Initial radial segments
meeting that ball occupy at most an annular sector with angle width
`2 arcsin(.09)` and radii `.455` to `1`. The resulting probability is below
`.03` analytically. The grid estimate `.017` remains illustrative only.

The example now chooses epsilon `.03`; its erosion radius still contains the
specific violating point. The exercise answer uses radius `.545`, rather than
`.6`, and identifies that point explicitly. A separate radius exercise with
epsilon `.02` is unchanged because it is an independent calculation.

Replaced the sampled gradient lower bound with the exact pointwise calculation
at `x0`: `grad w = 0`, `D²w = -5000 I`, so for a unit displacement
`grad_x q = -3 grad w - D²w x = 2500 e1`. Thus `B_grad q >= 2500` without
sampling. Updated the reconstruction's conservative radius lower bounds to
`>56.7` at eta `.5` and `>40.1` for any eta below `1`; its conclusion stays
vacuous on this example. No general theorem statement or source metadata changed.

Numerical assert-based self-check recomputed:

| Quantity | Output |
| --- | --- |
| `H(.045)` | `0.7761813542954403` |
| logarithmic derivative at `.045` | `-200.94291539245665` |
| annular-sector probability upper bound | `0.022747840738132814` |
| `r = (pi*.03)^(1/3)` | `0.45508275209874843` |
| eroded disk radius `1-r` | `0.5449172479012516` |
| violating point radius | `0.5141421356237309` |
| reconstructed radius lower bound, eta `.5` | `56.726722099030326` |
| reconstructed radius lower limit, eta `1` | `40.11184987070913` |

Assertions checked the tail inequality, angle `< .091`, sector bound `< .023 <
.03`, erosion containment, and both conservative reconstructed-radius bounds.
Read-only native content compile again passed with 0 errors and 0 warnings.
The displayed bound teaches the additional reader task: prove a measure premise
using a containing region, while distinguishing a grid estimate from that proof.

Before this repair, 5.2 SHA-256 was
`5db30a59657e4ac80295753e65cd058e774b09a3cf9da8abd9521b772d3c0a50`.
After it, SHA-256 is
`ec58b68cbe74f6728e3e063481a93cde6447e75e21a3a3ca8573860f7c9993a8`.
The other two lesson hashes above are unchanged. Requested fresh independent
beginner and mathematical rechecks; coordinator owns full build and browser checks.
