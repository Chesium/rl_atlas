# M16 Phase 4 review

Status 2026-10-20: **Phase 4 accepted.** All twelve Part 17 stations pass the teaching, mathematical,
integration and product-validation gates within the evidence scope below. Baseline `4aea067`, clean on entry. Phases 5–6 remain pending. The task ledger
records exclusive writer ownership and independent reviewer identities.

## Teaching and mathematical contract

The route now builds statistical learning from the ground up. Population and empirical means, ERM and
the three-term excess-risk decomposition come first. Then come Hoeffding (with Hoeffding's lemma proved),
McDiarmid (stated; proof cited) and finite classes, with the union bound and the zero-error rate.
Uniform convergence covers any data-selected model by the supremum. Random signs (accepted pilot),
calculation rules and the full proof of the scalar contraction lemma follow, then Massart's lemma and a
complete chaining proof of Dudley's integral. A signed-to-absolute conversion covers Boffi's convention,
and covering transfers (image, product, packing) come next. Margins: the ramp sandwich, a slow margin
bound, and a general-class reading of Boffi Lemma 4.1 (printed factor 2 and 4B), invoked as unchecked
external work. Trajectories as samples: n counts independent initial states, a Lipschitz-in-time grid
bridge is proved, and the fixed-margin obstruction near the equilibrium is argued at the population level.
The kernel/random-feature and dual-Sudakov branches are developed and remain optional for Theorem 4.2.

Notation follows the pilot: ψ ∈ Ψ, loss class f_ψ, Pf and P_n f, and R reserved for data length. Signed
empirical complexity fixes the sample first; the Boffi absolute worst-case convention is redefined at
use. γ is a fixed positive margin and δ a failure probability. Natural log is written `\log` across
slice A and the new slice B lessons. The accepted pilot keeps its locally defined `\ln` (B4-21, part
declined); harmonising it is Phase 6 work.

## Findings of note

- **Constant 24 in Dudley/(B.1).** `covering-dudley` derives Boffi's constant from a zero-residual member
  when the cover's centers lie in the class; arbitrary centers give 48 (M4-8). Theorem 4.2's parameter
  transfer yields in-class centers. I edited `boffi-thm-4-2` Step 5 and line 126 to say so, replacing
  "taken from the source without checking it" (M4-9, M4-15). This supersedes the pilot's recalled-only
  Dudley step, and the pilot's critical L3-1 resolution stands.
- **UML Lemma 27.2 is misprinted for c > 1** (counterexample: 2 versus 1). The lesson states the
  corrected form. Both the writer and the reviewer confirmed it.
- **Lemma 4.1 general-class reading.** Boffi states the lemma for certificate residuals only. The atlas
  restatement is labelled as its own reading, and Srebro–Sridharan–Tewari was not checked (M4-1).
- **Rendering defects found by review.** B4-17: a fused `\ler` macro rendered as red text that the
  checker missed (B4-18). Kind words before `\ref` rendered doubled ("Lemma Lemma 1") across the site.
  Display math inside list items collapsed a list in `covering-dudley`, found by screenshot inspection.
  All three are fixed, and `tools/m16-lesson-check.js` now detects each class.
- **L3-8 (Phase 5).** `boffi-lemma-4-1.md` still omits the printed factor 2, and `margin-bounds` links to it.

## Review and validation gates

| Gate | Evidence | State |
| --- | --- | --- |
| Writer drafts and computations | [writer-phase4a.md](writer-phase4a.md), [writer-phase4b.md](writer-phase4b.md); `tmp/m16-phase4{a,b}-calculations.py` | Complete |
| Beginner agent tasks, distinct nonauthor `reviewer-P4B` | [beginner-phase4.md](beginner-phase4.md) | All twelve reader tasks pass; B4-1..B4-34 closed (B4-1 moderate, B4-17 critical, B4-18 moderate tooling) |
| Mathematics/source pass, distinct nonauthor `reviewer-P4M` | [math-phase4.md](math-phase4.md) | All twelve pass within the checked scope; M4-1..M4-15 closed, all minor |
| Integration edits rechecked | `three-contractions` (M23-2 pointer), `boffi-thm-4-2` (M4-9/15), kind-word removals | Rechecked by P4-M; pass |
| Public build | `python build.py` | 140 stations, 0 warnings |
| Node tests | `node --test` on the final candidate | 97/97, no skips or failures |
| Guarantees regression, Chrome/Edge | `tools/guarantees-check.js` | Rerun on the final candidate: 148 visits each, no errors or external requests, exact cross-runtime agreement |
| Changed-view quick gate | `m16-lesson-check.js chrome --quick --parts=15,16,17,18` | 74 views at 390px, zero math/unknown-macro/doubled-label/raw-list/overflow/ref/term flags, no external requests; hashes in the report match the final sources |
| Full changed-view sweep (1440/390, both themes) | `m16-lesson-check.js {chrome,edge} --parts=15,16,17,18` | Chrome 155.0.8059.85 and Edge 155.0.4283.62: 308 views each, zero flags or external requests, with exercise answers exposed. Report hash maps cover all 37 Part 15–18 sources at their final hashes. A first attempt was stopped for low system memory; spot inspection of its partial screenshots found the list defect above |
| Visual inspection | Contact sheets `browser-check-results/m16-parts-15-16-17-18-{chrome,edge}/inspection/` | Opening/calculation clips and full-page overviews of the twelve Part 17 lessons, both browsers, 1440/390, light/dark. No layout defect remains. This is layout evidence, not a line-by-line proof audit |

Final raw SHA-256 values are in the two reviewers' "Final status" tables. One exception:
`covering-dudley.md` changed afterwards from `54f20740…` to `78afb59d…`. That change converts its four
recall list items to bold-led paragraphs because of the list-rendering defect. I compared the text
against the reviewed rendering; the wording and displays are unchanged.

## Evidence limits

Agent beginner review is a simulated perspective, not a student study. The mathematical review is an
agent check of the stated scope, not a human proof audit. Externally recalled results were not
available locally and are not claimed checked: Srebro–Sridharan–Tewari, Vershynin, Gordon, Maurer,
Ledoux–Talagrand, Rahimi–Recht and Bochner. Every source record stays `located`. Monte Carlo and
random-feature numbers are seeded finite-sample illustrations. No commit, publication or human review
is implied.
