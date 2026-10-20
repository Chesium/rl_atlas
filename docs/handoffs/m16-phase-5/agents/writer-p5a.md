# Handoff: writer-P5A (M16 Phase 5, assignment P5-WA)

State on 2026-10-20: **draft complete; beginner and math patches applied.**

- Beginner review: B5-1 to B5-8 are dispositioned. Seven are fixed. B5-8 is fixed in part; its optional rename of $a$ is declined with a stated reason.
- Math review: M5-3, M5-4 and M5-8 are fixed. M5-8 includes the coordinator-authorized pilot rename $M(s)\to G(s)$, which does not change meaning.
- Every station passed the math review, and discrepancies D1–D12 are confirmed.
- Waiting on: reviewer rechecks if wanted, then coordinator acceptance.

Dispositions are recorded in `docs/m16/writer-phase5a.md` under "Beginner patch" and "Math patch".

## Owned files

Current raw SHA-256 (Git Bash `sha256sum`):

- `content/18-certificates/learning-certificates.md`: `0b6efa0644eb37bf1b248631a242d10c949377eb2660d0cc4d74f224a27429a9`
- `content/18-certificates/certificate-classes.md`: `344efbd79911eb0138866127066850841a1500154653f8d62d1ba2eb2170f5e2`
- `content/18-certificates/boffi-lemma-4-1.md`: `c2a13ed54888c845f0cde5a2b6e7f170c12871a725e943ec1b567bacb1b868d1`
- `content/18-certificates/boffi-thm-4-3.md`: `672ef036b02f5175153d7ebb5db28ccfd9b08d324c074f691c406ba4ca78fde6`
- `content/18-certificates/boffi-thm-4-4.md`: `b5b5b20ad05898f104b79acc7c33071a832a7a582ffee0d1f1cd1799c175391e`
- `content/18-certificates/boffi-thm-4-2.md`: `98de2abec1b8bdb6f7f24b44a7320f0aee61782bcbeb59fb220ae96fb19774d9`. This is the pilot (baseline `77a427a9…`). It has two pointer sentences and the rename $M(s)\to G(s)$, with no change of meaning.

## Report and scratch files

- The report is `docs/m16/writer-phase5a.md`.
- Scratch files (git-ignored):
  - `tmp/m16-phase5a-calculations.py`
  - `tmp/m16-phase5a-refcheck.py`
  - `tmp/m16-p4b-katex-scan.js`

## Unchanged

- All front matter.
- All existing anchors.

## Checks at these hashes

- `python build.py`: 0 warnings.
- Strict KaTeX scan: 0 errors.
- Refcheck: clean.
- Part 18 Chrome quick check: 20 views, 0 errors.
- `git diff --check`: clean.

## To resume

1. Patch the owned files with Edit only.
2. Rerun the checks above.
3. Append a disposition table to the report and update the hashes here.
4. Do not edit the reviewers' reports or the P5B-owned files.

## Coordinator items

- Done by the coordinator: `kernels-random-features` now says $2/n^2$ and points to `boffi-thm-4-4`, and `boffi-thm-4-4` is consistent with that wording.
- Optional: trim the setting text that the pilot now duplicates.
