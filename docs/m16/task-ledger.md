# M16 Phase 0 / 1 task ledger

Baseline `2f72fc274169b6702d4b7ec9fe4a13b1d110011f`, initially clean. Contract v1 is [route-contract.md](route-contract.md). Shared metadata, PLAN, generated builds and integration belong only to the coordinator. Writer ownership is exclusive; reviewers write reports only. Phase 2–6 rollout is outside this request.

**Current status, 2026-10-19:** Phases 0 and 1 are complete. The accepted wave-2 assignments and independent rechecks appear below and in [pilot-review.md](pilot-review.md). The user has now authorized committing the scoped changes; no push is requested. The first table and shutdown section preserve the earlier interrupted run, not outstanding assignments.

## Initial Codex run (historical)

| ID | Agent / role | Owned files | Input | Status / dependency | Report / handoff |
| --- | --- | --- | --- | --- | --- |
| P0-AUDIT | `/root/baseline_audit`, baseline auditor | `docs/m16/baseline-audit.md` | Baseline HEAD, all 37 stations and TOML | Complete; 37/37 independent baseline records | `docs/handoffs/m16-phase-0-1/agents/baseline-audit.md` |
| P0-CONTRACT | `/root`, coordinator | route-contract, ledger | Actual baseline and audit | Complete; v1 reconciled against independent audit; Phase 0 checked | `docs/handoffs/m16-phase-0-1.md` |
| P1-D | `/root/pilot_dynamics`, dynamics writer | `content/15-dynamics/lyapunov-functions.md` | Contract v1, baseline file hash above; Khalil 3e §§4.1–4.2 | Stopped before lesson edits; draft pending | `docs/m16/writer-dynamics.md`; handoff `docs/handoffs/m16-phase-0-1/agents/pilot-dynamics.md` |
| P1-S | `/root/pilot_statistics`, statistics writer | `content/17-learning-theory/rademacher-complexity.md` | Contract v1, baseline file hash above; UML 2014 Ch26 §§26.1–26.3 | Stopped before lesson edits; draft pending | `docs/m16/writer-statistics.md`; handoff `docs/handoffs/m16-phase-0-1/agents/pilot-statistics.md` |
| P1-T | `/root`, theorem writer/integration | `content/18-certificates/boffi-thm-4-2.md` | Accepted foundational objects; Boffi v2 pp4–7 and B.1 p19 | Pending foundation drafts | `docs/m16/pilot-review.md` |
| P1-BEGINNER | distinct nonauthor reviewer, unassigned | beginner review report only | Integrated candidate hashes, declared route, raw sources, rubric | Pending all drafts; attempt tasks before answers | `docs/m16/beginner-review.md` |
| P1-MATH | nonauthor(s), distinct from beginner per slice | math review report(s) only | Candidate hashes and raw editions | Pending drafts; independent recomputation and source check | `docs/m16/math-review.md` |
| P1-INTEGRATE | `/root`, coordinator | shared files, build artifacts, validation tools, pilot-review | Patched/rechecked candidate | Pending reviews and browser inspection | `docs/m16/pilot-review.md` |

At this historical checkpoint the review gates were pending. Full mathematical review must record exact checked scope; baseline auditing is not an acceptance pass. At quota document/stop/unavailable, freeze substantive work and document descendants before coordinator. Main handoff records exact assignments, hashes, unfinished tests and stopped job states.

## Shutdown checkpoint, 2026-10-19

Fresh coordinator quota at 22:58:50Z was document/10: 8% five-hour,74% weekly; statistics writer first relayed document at 22:58:43Z (9%/75%). This latched team shutdown. Both writer assignments stopped before lesson edits. P0 baseline report recommendations are a menu of supporting edits; the coordinator chooses the workflow-permitted bounded local bridges recorded in route-contract v1. If those fail independent reader tasks, supporting edits must be assigned explicitly before Phase 1 acceptance. Phase 0 inventories/contracts are complete; Phase 1 remains pending. No completed draft, independent pilot review, build, tests or browser validation is claimed. See coordinating handoff for stopped states and recreation packets.

## Resume, 2026-10-19 (Claude Code session)

The user explicitly asked to continue Phases 0–1 from the coordinating handoff. This session runs in Claude Code, not Codex. The Codex `codex-usage-guard` script measures Codex quota and does not apply here, so no quota check was run. The earlier latched shutdown belonged to the Codex run. Worktree at resume: only PLAN.md (Phase 0) modified; docs/m16 and handoffs untracked; the three pilot lessons matched the recorded raw hashes. Agent identities below are Claude Code subagent sessions, recorded by role. Each reviewer is distinct from every author it reviews.

| ID | Agent / role | Owned files | Input | Status | Report |
| --- | --- | --- | --- | --- | --- |
| P1-D (wave 2) | subagent `writer-D2`, dynamics writer | `content/15-dynamics/lyapunov-functions.md`, writer-dynamics.md, its handoff | raw aa47d142…; contract v1 | Accepted at c29da439…; B1 and M1 findings patched and rechecked | `docs/m16/writer-dynamics.md` |
| P1-S (wave 2) | subagent `writer-S2`, statistics writer | `content/17-learning-theory/rademacher-complexity.md`, writer-statistics.md, its handoff | raw f02f29ae…; contract v1 | Accepted at a95c06b5…; B1 and M1 findings patched and rechecked | `docs/m16/writer-statistics.md` |
| P1-T | coordinator (main session), theorem writer | `content/18-certificates/boffi-thm-4-2.md` | raw 72ce48fd…; Boffi v2 pp.3–7, 18–19 from rendered pages | Accepted at 04ce6e41…; critical L3-1 resolved in lesson | `docs/m16/pilot-review.md` |
| P1-BEGINNER | subagent `reviewer-B1`, nonauthor | `docs/m16/beginner-review.md` | all three candidates; final hashes in Recheck 3 | Complete; reader tasks A–C pass; no open finding ≥ moderate | `docs/m16/beginner-review.md` |
| P1-MATH | subagent `reviewer-M1`, nonauthor, distinct from B1 | `docs/m16/math-review.md` | all three candidates, Khalil 3e, UML 2014, Boffi v2; final hashes in Recheck 2 | Complete; only L3-8 (outside pilot) open, deferred to Phase 5 | `docs/m16/math-review.md` |
| P1-INTEGRATE | coordinator | generated bundle, pilot-review, PLAN | accepted hashes | Complete: build, node --test 97/97, Chrome/Edge guarantees checks, changed-view screenshots and DOM checks | `docs/m16/pilot-review.md` |

Phase 1 closed 2026-10-19. The roles ran serially with at most two writers and one reviewer active at once. No nested delegation, commits or publication occurred. Rollout carry-overs are listed in pilot-review.md.
