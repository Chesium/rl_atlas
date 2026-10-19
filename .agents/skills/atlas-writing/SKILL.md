---
name: atlas-writing
description: Rewrite, expand, or review RL Atlas Parts 15–18 for readers new to control and statistical learning theory. Combine bottom-up concept construction with rigorous textbook exposition inside the existing Story, Textbook, Card, and Lab format. Includes route planning and explicit multi-agent writing and review instructions.
---

# Atlas writing

Read [the rewrite workflow](references/rewrite-workflow.md) before assigning work.
It defines the roles, handoff contract, pilot, review gates, and M16 deliverables.
For a review-only request, produce findings; do not start a rewrite. For a
planning-only request, prepare the plan and leave content tasks pending.

## Audience and scope

Assume basic differentiation, vectors, matrix multiplication, and elementary
probability. Readers may know introductory RL, but have not studied ODE theory,
Lyapunov methods, contraction, uniform convergence, or complexity bounds. Refresh
probability notation when it becomes load-bearing; supply an inline bridge or a
linked, developed prerequisite for any additional mathematics.

The destination is understanding the existing guarantees routes, including
*Learning Stability Certificates from Data*, arXiv:2008.05952v2. Expand explanations
as needed, without growing an unrelated control-theory syllabus. Read PLAN.md's
M14 and M16, README.md's authoring syntax, and docs/guarantees.md. Inspect current
content and route links rather than relying on milestone completion claims.

## Adaptation and precedence

Follow the user's current task and the repo's technical constraints. Within that
scope, this adapted skill and its workflow resolve the upstream presentation
defaults. Use these archived documents selectively:

- [bottom-up](references/upstream/bottom-up/UPSTREAM_SKILL.md): construction from elementary
  objects, motivation for each step, concrete examples, dependency-gap audit.
- [rigorous-explainer](references/upstream/rigorous-explainer/UPSTREAM_SKILL.md): a coherent
  question, local definitions, visible derivations, interpretation, and evidence.
- Read its [textbook style](references/upstream/rigorous-explainer/references/textbook-style.md),
  [technical prose](references/upstream/rigorous-explainer/references/technical-writing-guides.md),
  and [pedagogy checklist](references/upstream/rigorous-explainer/references/pedagogy-checklist.md)
  when outlining, drafting, and reviewing respectively. Keep the audience above
  even where these references speak of graduate readers.

These are documentation snapshots, not complete installations. Attribution,
revisions, checksums, omitted resources, and update instructions are in
[SOURCES.md](references/upstream/SOURCES.md).

Apply the following explicit overrides:

- Build the explanation across the prerequisite route. Do not restart every
  station from calculus or force every section to depend on its immediate neighbor.
- Choose stages and examples to resolve real learning obstacles. Do not require
  seven sections, 6–10 stages, 2–3 examples per stage, a Mermaid diagram, a word
  count, or a figure quota. Treat lack of a worked calculation as a review issue
  when the station teaches a calculation or a quantitative claim.
- Rewrite and reorganize weak prose where needed. Preserve mathematical coverage,
  source qualifications, anchors, and supported claims; do not inherit the
  expansion-only patch rule or automatic draft/audit deletion. Retain review
  reports and dispositions as M16 evidence.
- Author in the existing Markdown/TOML files and native blocks. Do not adopt the
  standalone HTML template, MathJax, SMIL conventions, or GitHub Pages workflow.
  Never hand-edit generated bundles as the content source.
- Use existing atlas checks plus checks justified by changed behavior. Upstream
  verifiers are not installed or automatically applicable: their label quotas,
  HTML classes, renderer assumptions, and domain-specific anatomy rules are not
  atlas requirements. Check rendered math in the DOM and inspect layout visually.
- A dependency-gap audit does not verify mathematics. Keep beginner review,
  independent source/proof review, and numerical validation separate.

## What each view must do

**Story** gives a concrete question and observable mechanism, with reader-paced
steps. Introduce the quantities the picture needs. Keep computed numbers tied to
the engine and pinned runs. A picture illustrates a theorem; it does not prove a
universal claim. Use `story_in` when an existing story carries the point. Proof
stations may have no Story, consistent with M14.

**Textbook** teaches the route: a motivating obstacle, defined objects, the
construction or derivation, an interpreted result, a worked case, an informative
failure or non-example, and explicit scope. This is a flexible sequence, not a
required set of headings. It must be intelligible without opening Story or Card.
Link prerequisites and briefly recall what is used; a hyperlink alone does not
define an unfamiliar symbol or explain an inference.

**Card** is a concise reference derived from the developed lesson. Preserve the
required schema, especially result statement, intuition, assumptions, proof, and
uses. A Card and a Textbook should serve different reading needs.

**Lab** supports prediction → intervention → observation → explanation. State the
quantity measured, sampling unit, settings, and finite-case limits beside the
experiment. Keep existing worlds and interfaces unless a concrete teaching gap
requires a scoped change.

## Mathematical and editorial invariants

Define symbols with their roles, domains, and dimensions before substantive use.
State assumptions and quantifiers before the claim. Show consequential proof
steps, name invoked results, explain why they apply, and interpret the conclusion.
A cited prerequisite may supply its own proof, but its relevant statement must be
recalled. Identify any deferred argument and where it is developed.

Use recurring examples to expose changes in the model. Connect analogies back to
the formal objects and explain their limits. Give important peer results
comparable treatment. Exercises should test explanation, calculation, or assumption
checking and include an answer or worked solution using native question blocks.

Keep continuous/discrete time and norm/energy rates explicit; distinguish RL value
functions, Lyapunov certificates, and the three meanings of contraction. Count
independent trajectories, not their time samples. Preserve the fixed-margin versus
relative-margin distinction, derivative-aware certificate norms, feasibility
conditions, and the gap between small violation probability and global validity.

Use edition-specific primary sources in original prose. Review private course
material locally when helpful, but do not copy its payload into the public atlas
or base a public claim on the pending course appendix. Never infer proof-checked
status from an authoring pass, personal study tick, solver, plot, or passing test.
