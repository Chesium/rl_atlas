# M16 Phase 4 handoff

Started 2026-10-20 (Claude Code session). State: **completed; Phase 4 accepted**.

## Current checkpoint (supersedes the wave plan below)

All twelve Part 17 lessons pass the independent beginner and mathematical reviews, with every finding
closed at the final hashes. Evidence: `docs/m16/phase4-review.md`, `coverage.md`, `beginner-phase4.md`,
`math-phase4.md` and both writer reports. All four agents finished their turns: writers P4-WA and P4-WB,
and reviewers P4-B and P4-M. Do not recreate them for completed work.

Final gate done: `node tools/m16-lesson-check.js {chrome,edge} --parts=15,16,17,18` passed, 308 views each
(full 1440/390, light/dark, with screenshots). Superseded instructions follow for the record: Inspect the saved Textbook/Card screenshots of the
twelve Part 17 lessons, `three-contractions`, `lyapunov-functions` and `boffi-thm-4-2`. Then
tick PLAN.md Phase 4. The earlier attempt was stopped by Claude Code for low system memory after 282
Chrome screenshots; rerun only when memory allows. If inspection finds a layout defect, assign it to the
file's owner, make a layout-only patch, and record it. A meaning change needs reviewer recheck.

The checker gained four detections this phase, all now active in quick mode: unknown KaTeX commands,
doubled reference labels, unparsed list markers, and a layout-settle wait. Nothing is committed or
published.

Scope: rewrite all twelve Part 17 stations (PLAN.md M16 Phase 4). Baseline `4aea067`, clean on entry.
Assignments, ownership and baseline hashes are in [task-ledger.md](../m16/task-ledger.md), section
"Phase 4 execution".

## Wave plan

1. Writers P4-WA (foundations: risk-erm, concentration, finite-classes, uniform-convergence,
   margin-bounds, trajectories-as-samples) and P4-WB (complexity: rademacher-properties,
   covering-dudley, covering-properties, kernels-random-features, dual-sudakov, plus layout and
   consistency edits to the pilot rademacher-complexity) draft in parallel.
2. Coordinator mobile gate: `python build.py`, then `node tools/m16-lesson-check.js chrome --quick --parts=17`.
3. One reviewer at a time: beginner reviewer P4-B over all twelve stations, then the distinct
   mathematical reviewer P4-M. Writers patch, and reviewers recheck at the new hashes.
4. Integration: reconcile `three-contractions` wording about `rademacher-properties` (M23-2) if the
   new lesson supplies the proof (Part 16 meaning change needs a review recheck), then run the build,
   `node --test`, the Chrome/Edge guarantees checks, the full lesson check `--parts=17` and
   screenshot inspection. Record the results in `docs/m16/phase4-review.md` and `coverage.md`, then
   tick PLAN.md Phase 4.

## Coordinator changes so far

- `tools/m16-lesson-check.js`: new `--parts=` option (default 15,16, so earlier output paths stay
  the same); Part 17 output is written to `browser-check-results/m16-parts-17-*`.
- Baseline quick gate (Part 17, Chrome, 390px): no page errors; only the pilot's four wide
  displays were flagged, and they are assigned to P4-WB as a layout-only fix.
- Extracted sources (ignored): `tmp/uml.txt`, `tmp/boffi-v2.txt`.
- B4-18 (from the beginner reviewer): `tools/m16-lesson-check.js` missed unknown KaTeX commands. With
  `throwOnError: false` they render as red `#cc0000` spans, not `.katex-error`. The checker now counts
  them (`unknown`) and flags doubled reference labels (`doubled`, e.g. "Lemma Lemma 1").
- Doubled labels: build.py `REF_TEXT` already prints the kind, so `Lemma \ref{x}` renders as
  "Lemma Lemma 1". I removed the kind word mechanically (no meaning change; scratch script
  `dedup_refs.py`) in five files outside Part 17. New raw SHA-256: `01-problem/mdp.md` 17f6a05d…,
  `08-function-approximation/gradient-mc.md` 0834110e…, `value-error.md` e0b914f3…,
  `15-dynamics/lyapunov-functions.md` 22fbd748… (accepted pilot; the 10 edits are mechanical
  label removals), `18-certificates/boffi-thm-4-2.md` 204c88ab… (accepted pilot; 8 label removals).
  The Part 17 writers fixed their own files.
- `16-contraction/three-contractions.md`: reworded the M23-2 sentence so the contraction-lemma proof
  points to `rademacher-properties` (new hash 4c454424…). This changes meaning, so the math reviewer
  must recheck it.

## Recreating unfinished assignments

If interrupted, check the writer reports and handoffs under `docs/handoffs/m16-phase-4/agents/`
and compare the current hashes with those reports. Re-send the assignment packet from the ledger
with the current hashes as inputs. Do not restart completed agents.
