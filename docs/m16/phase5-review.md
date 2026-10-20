# M16 Phase 5: learning certificates

Status 2026-10-20: **Phase 5 accepted.** This continuation resumes the saved
Phase 5 drafts on baseline `82f00a4`; it does not claim a clean worktree on entry.
All ten Part 18 lessons and the single Part 17 kernel-feature consistency edit
were already present. Original writer/reviewer evidence remains intact.

## Teaching and mathematical scope

The formulation separates fixed closed-loop dynamics, certificate choice,
independent initial-state samples and trajectory residuals. The class lesson
develops value-and-derivative control before Lemma 4.1's fast margin bound.
The parametric pilot remains the main route; matrix and kernel branches explain
their own assumptions and complexity transfers. The deployment lessons explain
what extra geometry, positivity and regularity a small violation probability
needs. Practice and Van der Pol distinguish solver feasibility, finite holdout
evidence and theorem premises, preserving the existing engines and pinned Story.

Source discrepancies are retained rather than silently absorbed. See the 27
adjudications in [math-phase5.md](math-phase5.md): notably Lemma 4.1's factor 2
and 4B_h (L3-8), the feature-event factor 2, and the counterexample to the printed
Theorem 5.2 radius. The latter is presented as a false printed claim followed by
a separately labelled reconstruction with added assumptions. True norm rate and
learned energy rate are distinct. The route contract records this correction to
its original planned linear example.

## Review and validation

Original authors: `writer-P5A` and `writer-P5B`; independent beginner reviewer:
`reviewer-P5B`; mathematical reviewer: `reviewer-P5M`. Reports include checked
passages, reader tasks, source locators, hashes and dispositions. Their second
rechecks pass all ten within the stated scope. `/root/phase5_patch` completed
B5-24..27 and verified the existing M5-9 repair. Distinct nonauthors
`/root/phase5_beginner` and `/root/phase5_math` rechecked the affected passages:
[beginner continuation](beginner-phase5-resume.md),
[mathematical continuation](math-phase5-resume.md),
[writer continuation](writer-phase5-resume.md). No critical or moderate finding
remains open. Original reports retain their historical findings; these later
dispositions supersede their open statuses.

The coordinator identified **M5-R1**, an additional moderate gap in the 5.2
counterexample: a 1200² grid does not establish the measure premise. The writer
replaced that inference with an analytic Gaussian-tail enclosure and annular
sector bound, `nu(Z_b) <= .02274784 < .03`. The eroded radius `.544917` still
contains the expansion point `.514142`. An exact derivative now gives
`B_grad q >= 2500`, replacing a sampled lower bound. Both independent reviewers
recomputed the affected argument at the final hash. The beginner recheck records
that exercise answers were visible before independently reconstructing them;
it does not claim a blind attempt for that last recheck.

| Gate | Rerun evidence | Result |
| --- | --- | --- |
| Build | `python build.py` after the final M5-R1 repair | 140 stations, zero warnings; generated bundle updated |
| Node | `node --test`, final candidate; `tmp/m16-phase5-final-node.txt` | 97/97, zero failures/skips |
| Numerical cases | Saved independent scripts `tmp/m16-phase5-math-{a,b,c}.py`; writer/reviewer assertions for M5-R1 | Reported worked values reproduced; not substitutes for general proofs |
| Pre-review mobile | `m16-lesson-check.js chrome --quick --parts=18`, final candidate | 20 views, zero flags/external requests |
| Full views | `m16-lesson-check.js {chrome,edge} --parts=17,18` | 180 views each, both themes at 1440/390, questions exposed, zero errors/external requests |
| Final 5.2 Chrome recheck | Ignored `tmp/m16-phase5-recheck.js` reuses the existing checker, filtering only 5.2 into a separate output folder | Eight views at final hash, zero errors/external requests; supersedes the first Chrome sweep's 5.2 views |
| Guarantees regression | `guarantees-check.js chrome` and `edge`, final candidate | 148 visits each, zero errors/external requests, worker stop/restart and full metric sweep pass, exact Node/browser agreement |
| Visual inspection | Opening/calculation clips for all ten lessons and the kernel pointer; changed Card overviews, Story and supplementary full-page views | No remaining layout defect observed; comparison and viewport details below |
| Integration | Build link/schema checks, route contract amendment, coverage, unchanged source front matter/engine/Story fingerprints | Pass within Phase 5; whole-track Phase 6 remains pending |

Evidence folders (ignored): `browser-check-results/m16-parts-17-18-{chrome,edge}/`,
`m16-recheck-parts-18-chrome/`, `m16-phase5-viewports-{chrome,edge}/`, and
`m13-m14-{chrome,edge}/`. Chrome full/recheck reports record 155.0.8059.85;
the later Chrome guarantees regression records 155.0.8059.86. Edge records
155.0.4283.62. The first Edge guarantees pass preceded M5-R1 and was rerun after
that repair; only the final pass supports acceptance.

Visual evidence uses the opening/calculation sheets and Card overviews under
each full sweep's `inspection/`. Of 132 paired opening/calculation/Card PNGs,
125 are pixel-identical across browsers; the seven differing captures (5.1's
desktop light Card and 5.2's mobile views) were inspected separately without a
layout finding. Full-page captures of very long lessons can repeat the top
after pixel 16,384; they are not reliable evidence for the affected tails.
Supplementary normal viewport captures verify all eleven lesson tails in both
themes/sizes, plus the reconstructed statement and counterexample in 5.2:
44 tail checks and 52 PNGs per browser, with one hero in the DOM, no horizontal
overflow, and the actual bottom reached. All 52 paired viewport images are
pixel-identical. Inspection confirms normal footer rendering and readable new
proof displays. This is layout evidence, not a line-by-line proof audit.

### Final raw SHA-256

| Lesson | Hash |
| --- | --- |
| learning-certificates | `0b6efa0644eb37bf1b248631a242d10c949377eb2660d0cc4d74f224a27429a9` |
| certificate-classes | `344efbd79911eb0138866127066850841a1500154653f8d62d1ba2eb2170f5e2` |
| boffi-lemma-4-1 | `c2a13ed54888c845f0cde5a2b6e7f170c12871a725e943ec1b567bacb1b868d1` |
| boffi-thm-4-2 | `98de2abec1b8bdb6f7f24b44a7320f0aee61782bcbeb59fb220ae96fb19774d9` |
| boffi-thm-4-3 | `672ef036b02f5175153d7ebb5db28ccfd9b08d324c074f691c406ba4ca78fde6` |
| boffi-thm-4-4 | `b0db6b7f6185de82a78c95094d0c140dcede9c86200ffad204e1308595ade6f9` |
| boffi-thm-5-1 | `3b80bceb9973942c1e8fd0743fac70b8c2cd1c93fbcbd035e7edaa46014d9c6e` |
| boffi-thm-5-2 | `ec58b68cbe74f6728e3e063481a93cde6447e75e21a3a3ca8573860f7c9993a8` |
| certificates-in-practice | `75b44bd299e19b06dc2526e6df3e7535b384474ba784f8dbc3c0e6590edf4097` |
| vdp-certificates | `e78c297184bf16918c6cd5f370fa438ee13db2ccc14a6f9844e3b34a6cd3fd6d` |
| kernels-random-features (one consistency sentence) | `9a6c4a1a990fe6e59641dd1fe0695832cee6f942e53db23b8bc09c68cfefe38a` |

Phase 6's whole-track cross-route acceptance remains separate.

## Evidence limits

Agent beginner perspectives are not student studies; mathematical agent checks
are not human proof audits. External results and unchecked source proofs remain
explicitly recalled (including the external theorem underlying Lemma 4.1 and
parts of the random-feature approximation machinery). All source records remain
`located`. The reconstructed 5.2 radius is not claimed optimal. Numerical cases
do not certify global validity or reproduce Figure 1 exactly. No commit, push,
publication or human review is implied.
