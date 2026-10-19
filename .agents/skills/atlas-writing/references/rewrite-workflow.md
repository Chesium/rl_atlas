# Parts 15–18 rewrite workflow

This is the execution contract for PLAN.md's M16. The user has requested a
multi-agent workflow for the rewrite. Use a coordinated draft and independent
reviews, rather than competing full rewrites. All phases below are future work
until their evidence exists; preparing this document does not complete them.

## Start with the route contract

The coordinator inspects the worktree and current station inventory, then creates
`docs/m16/route-contract.md`. Cover all 37 existing stations in `content/15-dynamics/`
(10), `content/16-contraction/` (5), `content/17-learning-theory/` (12), and
`content/18-certificates/` (10). Recount if the inventory changes. For each station
record:

- Its ID, file, audience prerequisites, one concrete learning objective, and a
  question the reader should be able to answer afterward.
- Concepts/symbols it consumes and introduces; the exact upstream station/section
  supplying each prerequisite, and a planned local reminder or missing bridge.
- Consequential claims and source edition/locators; which will be derived here,
  recalled from a developed prerequisite, or explicitly deferred to an extension.
- A running example, worked calculation/check where useful, counterexample or
  failure of an assumption, and an exercise with its solution.
- The teaching job of each Story, figure, and Lab interaction, or why no new one
  is needed. Note shared examples and notation so parallel drafts stay compatible.

Use `content/routes.toml`, `content/map.toml`, `content/notation.toml`, existing
anchors, and the source metadata as the starting contract. Preserve station IDs and links. Add or
split a station only when a documented dependency gap cannot be explained well
within the existing route; the coordinator then reconciles counts and links.
Avoid unrelated curriculum expansion.

Choose examples that connect the parts: a scalar flow for first calculations;
the existing stable, nonnormal linear system and quadratic certificate for geometry;
the certificate residual class for learning theory; and the existing Van der Pol
experiment for nonlinear evidence. These are suggested shared cases, not a
requirement to force every argument into one system. Define a statistical toy
class when it makes an expectation, supremum, or covering argument calculable.

## Explicit multi-agent instructions

The coordinator owns the route contract, notation decisions, task ledger, shared
files, integration, and final acceptance. Create `docs/m16/task-ledger.md` with
assignment ID, agent identity and role, owned files, dependency inputs/revision,
status, report path, and blocking dependencies. Preserve unrelated work in this
shared checkout.

Use these roles; roles may run in successive waves when slots are limited:

| Role | Assignment | Required output |
| --- | --- | --- |
| Writer | A coherent station or dependency slice using the adapted skill | Edited owned content, example computations, source locators, handoff |
| Beginner reviewer | Read the slice in route order with only declared prerequisites; attempt examples/exercises before consulting answers | Passage-specific missing definitions, jumps, weak motivation, and actual reader-task outcomes |
| Mathematical reviewer | Independently consult the specified editions and recompute consequential steps | Claim/assumption/proof findings, source locators, checked scope and unresolved items |
| Coordinator / integration editor | Reconcile drafts and reviews; inspect rendered lessons and route continuity | Accepted dispositions, shared-file edits, validation evidence, milestone status |

Mandatory coordination rules:

1. Use available subagents for M16 execution. If delegation is unavailable, record
   the limitation and leave the independent-agent gate pending. Solo drafting can
   progress, but must not be labeled independently reviewed.
2. With four slots, run at most the coordinator, two writers, and one reviewer.
   Rotate beginner and mathematical reviews in separate passes. With fewer slots,
   serialize roles. Do not exceed the actual tool limit or create untracked nested
   agents. Subagents must not delegate further without a coordinator assignment.
3. Give each writer exclusive files. Writers may read dependencies but must not
   edit another writer's slice. The coordinator owns PLAN.md, route/map/notation
   metadata, shared app/engine code, generated bundles, and cross-slice integration.
   Request needed shared changes through the handoff.
4. A writer must not perform the independent acceptance reviews of their own
   slice. Use distinct agent identities for its beginner and mathematical reviews,
   including across successive waves; record both identities and its writer in
   the ledger. Agents can review other slices where they did not author the
   material. Give reviewers the draft,
   declared prerequisites, raw sources, and rubric before writer conclusions.
   These are agent perspectives, not evidence from actual beginner students.
5. Parallelize only slices whose dependency contracts are stable. Part 15 and
   elementary Part 17 drafts may proceed together. Part 16 consumes the agreed
   dynamics notation; Part 18 consumes both tracks and must be reconciled against
   their accepted definitions and bounds before acceptance.
6. Reviewers write reports, not simultaneous edits to writer-owned files. The
   writer patches; the reviewer checks the affected reasoning again. Record the
   draft revision or file hashes in every report so later edits cannot inherit a
   stale pass. Integration changes that affect meaning require renewed review.
7. Keep reports and per-assignment handoffs under `docs/m16/`. Track substantive
   unresolved issues through disposition rather than deleting the audit trail.
   Stop, resume, and quota instructions from the execution session still apply;
   preserve enough handoff detail to recreate unfinished assignments.

### Assignment packet

Every spawn instruction must include the following concrete information, filled
in by the coordinator rather than sending an open-ended “improve Chapter 17”:

```text
Read AGENTS.md and .agents/skills/atlas-writing/SKILL.md, then the linked workflow.
Role and assignment ID:
Owned content/report paths; files you may read but must not edit:
Learning objectives and route-contract sections:
Declared prerequisite files/sections and their input revision or hashes:
Notation and shared-example decisions:
Primary sources, exact editions/locators, and accessible local source paths:
Required draft/review artifacts and acceptance criteria:
Handoff path, coordination constraints, and current session stopping policy:
Report actual work, unresolved dependencies, and validation limits; do not commit,
publish, or launch nested agents unless separately assigned.
```

A handoff records edited files, introduced/consumed concepts, example computations
and outputs, consulted sources, remaining issues, requested shared changes, and
checks actually run. Reviewer reports identify location, severity, diagnosis,
suggested repair, and disposition/recheck. A report with no findings must identify
the checked passages and reader tasks; “looks good” is not an acceptance record.

## Pilot before rollout

Develop `lyapunov-functions`, `rademacher-complexity`, and `boffi-thm-4-2` as a
connected pilot. Start with the two foundational lessons, then develop the theorem
explanation using their agreed objects. Expand required intermediate explanations
or supply precise local bridges when the old stations cannot support the pilot;
do not pretend the three stations alone form the whole prerequisite route.

Before assigning bridges, record the pilot's prerequisite closure and minimum
supporting edits in the route contract. If a sound pilot needs substantial work
from a later slice, schedule that prerequisite work explicitly and credit it to
the relevant rollout phase. Do not silently turn the pilot into an unbounded
rewrite or accept it with unresolved mainline dependencies.

Use both independent review roles. The beginner reviewer should be able to:

- Calculate a Lyapunov derivative for a small system and explain why positivity
  and decrease support the stated conclusion; distinguish stability and attraction.
- Compute a tiny random-sign example, explain the order of the supremum and
  expectation, and reproduce the consequential steps of the stated linear bound.
- Follow the parameter-cover → value-and-derivative cover → complexity → margin
  bound argument, identifying where assumptions enter and what the rate means.

The mathematical reviewer checks the claims and proof steps against the actual
sources, including v2 qualifications. Integrate the pilot, inspect its rendered
views, and record `docs/m16/pilot-review.md`. Fix the workflow if the pilot exposes
a repeatable problem. Do not roll out an unresolved pilot merely because its
prose is longer. No additional user approval is required by this workflow; request
input only when a missing preference or source prevents a sound decision.

## Rollout and evidence

After the pilot gate, assign these dependency slices and track every station:

| Slice | Educational work |
| --- | --- |
| Part 15: dynamics and stability | Build closed loops, flows, equilibrium and stability before Lyapunov reasoning; derive the equation and comparison arguments; develop sensitivity, converse/ISS material, the time dictionary, and RL bridges to the depth their routes need. |
| Part 16: incremental stability and contraction | Construct the doubled-system and variational views, differential length and metric inequalities, path-to-distance reasoning, and the imitation deployment bridge; distinguish all three contractions. |
| Part 17: statistical learning | Motivate adaptive model selection, risk and uniform control; develop concentration, finite classes, random-sign complexity and its properties, covers/Dudley, margins, independent trajectories, and the structured/kernel branches. |
| Part 18: certificate learning | Build the learning formulation and derivative-aware class norm; develop Lemma 4.1 and Theorems 4.2–4.4 and 5.1–5.2 with explicit assumptions and proof dependencies; connect practice and Van der Pol evidence without upgrading it to a theorem or exact reproduction. |

Keep optional branches folded in the route; expanding explanations does not make
every supporting topic a required prerequisite. Track reader tasks and review
dispositions per station in `docs/m16/coverage.md`. Produce
`docs/m16/rewrite-review.md` for cross-part continuity and completion evidence.

## Acceptance gates

Apply these gates to every station or coherent review slice, then to whole routes:

1. **Teaching:** the Textbook develops an argument distinct from the Card. The
   opening question is answered; definitions precede substantive use; consequential
   steps are reproducible. Examples are computed and interpreted. Exercises have
   solutions and test the stated objective. A reviewer completes the reader tasks
   from the declared material, recording any help required.
2. **Mathematics:** claims, quantifiers, domains, assumptions, and proof transitions
   match primary sources. Record illustrative calculations separately from checked
   general arguments. A central proof cannot remain a list of theorem names.
   Report any intentionally deferred proof and its developed destination.
3. **Evidence:** preserve `located` / `pending` unless an independent proof audit
   explicitly records the complete checked scope and supports a metadata change.
   Unresolved source contradictions remain visible. Agent review does not become
   human review, and finite experiments do not establish universal guarantees.
4. **Integration:** check route order, notation collisions, duplicate explanation,
   links/anchors, Card schema, time/rate conventions, and consistency with Stories,
   figures, quizzes, and Lab measurements. Revisit examples after abstractions.
5. **Product validation:** run `python build.py` for changed authored content and
   `node --test` on the integrated candidate. Run the guarantees browser checks
   documented in `docs/guarantees.md` for Chrome and Edge; inspect every changed
   lesson's rendered Textbook and any changed Story/Card/figure at desktop/mobile
   sizes in both themes. Use DOM checks for math errors as well as screenshots for
   readability. Extend coverage if new blocks or interactions are not exercised.
   Recompute numerical/story fingerprints only for deliberate changes, with the
   reason recorded. Do not change the engine simply to beautify an explanation.

Close critical/moderate comprehension and mathematical findings before accepting
a slice. A genuinely optional extension may be explicitly deferred with a reason;
an unresolved dependency needed for a mainline conclusion cannot. Record minor
issues and dispositions. Mechanical checks and agent reviews cannot establish
actual student learning outcomes; describe the evidence at its real scope.

The coordinator marks M16 complete only after all station records and the main
Theorem 4.2, contraction, matrix, kernel, and adapted Figure 1 routes pass their
relevant gates. Report tests and browser checks actually rerun, remaining limits,
and any outstanding human feedback. Commit/push/publication require the user's
task authorization; this workflow itself grants none.
