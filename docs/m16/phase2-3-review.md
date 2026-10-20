# M16 Phases 2 and 3 review

Status 2026-10-19: **Phases 2 and 3 accepted within the scope below**. User scope is Part 15
(ten stations, including the accepted pilot) and Part 16 (five stations).
Baseline `9764c85`, clean on entry. Phases 4–6 remain pending. The task ledger
records exclusive writer ownership and independent reviewer identities.

## Teaching and mathematical contract

Part 15 develops fixed closed loops, stability, Lyapunov construction, comparison,
sensitivity, converse/ISS, the continuous/discrete dictionary and two RL bridges.
Part 16 consumes those objects to develop uniform pairs, tangent dynamics,
metric energy, transported paths, three meanings of contraction and deployment.
The recurring nonnormal example uses A=[-1,3;0,-2] and P=[[1/2,1/2],[1/2,1]].
Length rate alpha corresponds to energy rate 2alpha. Reader tasks are tracked in
[coverage.md](coverage.md), using the existing station contract.

Nine Part 15 nonpilot lessons and all five Part 16 lessons now have developed
Textbooks, worked calculations, failure cases and native solved questions, with
distinct reference Cards. The pilot's `lyapunov-functions` proof was retained;
its sole edit corrects a norm illustration from 0.718 to approximately 0.7175.
Its deferred discrete theorem is proved in `time-dictionary`, including a trap
construction that handles discrete jumps. Source statuses remain `located`.

## Source access and evidence scope

Local primary editions: Khalil, *Nonlinear Systems*, third edition (2002);
Hespanha, *Linear Systems Theory*, second edition (2018); Lohmiller and Slotine,
*On Contraction Analysis for Non-linear Systems*, Automatica 34(6) (1998), using
the author's final December 1997 preprint; Boffi et al., arXiv:2008.05952v2; and
Shalev-Shwartz and Ben-David, *Understanding Machine Learning* (2014), Lemma 26.9.
Private course notes are not a public prerequisite or copied payload.

Angeli (2002), DOI 10.1109/9.989067: publisher/author/institutional searches found
the bibliographic record, but full text was not accessible in this run. Review
must distinguish its attributed framework from the direct derivations supplied
here. No unread source proof is marked checked. Exact checked passages, numerical
recomputations and source limitations belong in the independent math report.

## Review and validation gates

| Gate | Evidence | Current state |
| --- | --- | --- |
| Writer drafts and computations | [writer-phase2.md](writer-phase2.md); [writer-phase3.md](writer-phase3.md) | Complete |
| Beginner agent tasks, distinct nonauthor | [beginner-phase2-3.md](beginner-phase2-3.md), `/root/review_beginner` | All fifteen tasks pass; B1/B2 closed at final hashes |
| Independent mathematics/source pass | [math-phase2-3.md](math-phase2-3.md), `/root/review_math` | All fifteen pass within stated checked scope; M23-1/2/3 closed |
| Findings, writer patches and reviewer rechecks | Both reports contain all fifteen final raw SHA-256 values | Zero open critical/moderate findings |
| Upstream/Part 16 continuity, Cards, anchors, metadata and Story settings | Coordinator and writer reconciliation; preservation script | Pass; IDs, original anchors and TOML metadata preserved; no engine/fingerprint change |
| Public build / Node tests | `python build.py`; `node --test` | 140 stations, zero warnings; 97/97 tests, no skips/failures |
| Chrome/Edge guarantees regression | `tools/guarantees-check.js` | Each 148 visits; exact Node/browser agreement; worker cancellation, metric sweep and offline checks pass |
| Final changed-view DOM checks | `tools/m16-lesson-check.js chrome` and `edge` | Each 128 visits at final authored hashes; zero page/math errors, overflow, unresolved refs/terms or external requests |
| Visual inspection | Saved desktop/mobile, both-theme lesson contact sheets; metric detail inspection | All fifteen Textbook/Card layouts inspected in Chrome and Edge; no blocking layout finding |

The added lesson checker visits all fifteen stations' Textbook/Card and existing
Story views at 1440/390px in both themes and installed browsers, exposes exercise
answers, checks math errors/overflow, reference resolution and station links,
and saves full-page plus opening/calculation screenshots with authored hashes.
Its quick mode passed the pre-review mobile gate (30 visits). Final evidence is
ignored under `browser-check-results/m16-phase2-3-{chrome,edge}/report.json`, with
full-page screenshots and opening/calculation clips. Contact sheets used for
layout inspection are in `browser-check-results/m16-inspection/`; these are
layout evidence, not a line-by-line visual proof audit. Existing Story views are
also exercised by the full checks; no Story settings or engine logic changed.

The complete guarantees regression ran on the integrated rollout before the last
bounded Lab-copy clarification and pilot rounding correction. The public build
and full 128-view sweeps were repeated after those changes; their hash maps match
all fifteen final sources and both independent reports. The Node suite was also
rerun after the final build. Numerical fingerprints were not recomputed or edited.

## Findings and acceptance limits

M23-1 repaired the inherited claim that any bounded invariant set prevents finite
escape: the Card now requires a compact invariant subset of the open domain.
M23-2 removed a promise that the current `rademacher-properties` contains a general
proof; the lesson explicitly defers to UML Lemma 26.9, with Phase 4 development
still pending. M23-3 corrected the pilot rounding. B1 defines Jacobian entries,
dimensions and induced norm at their first substantive use. B2 makes the linear
Lab task reproducible, counting failed holdout trajectories and stating settings,
observations and finite-case limits. The respective independent reviewers
rechecked all repairs and final hashes.

The beginner's first three native answers were accidentally exposed during the
initial file read. The report records this limitation. Three fresh supplemental
tasks were then attempted without answers: altered feedback/flow/Euler, stability
quantifiers, and a local nonlinear Lyapunov bound. Their intermediate outcomes
were recorded before coordinator verification; the remaining twelve lessons used
answer-suppressed first reads. This is bounded agent reader-task evidence.

All critical/moderate teaching and mathematical findings are closed and rechecked
at the final candidate hashes. Full cross-part destination
acceptance remains Phase 6. Agent beginner review is a simulated perspective,
not a student study. Numerical examples, plots, sampled constraints and holdout
rates are distinct from universal proofs. No human review, publication or exact
Figure 1 reproduction is implied.
