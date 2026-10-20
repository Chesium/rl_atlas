# M16 Phase 6 integration repairs (P6-W)

Writer: `/root/phase6_repairs`, 2026-10-20. Baseline authored content: `f2e18dc`.
This is a writer record, not independent acceptance. Ownership was limited to
the three lessons below and this report plus the writer handoff.

## Repairs and dependencies

- `dual-sudakov` and `kernels-random-features`: made `boffi-thm-4-2` a required
  prerequisite of each optional branch. Reading notes now distinguish the
  elementary covering/feature construction from its later certificate use.
  Theorem 4.2 does not acquire either branch as a prerequisite.
- `kernels-random-features` dictionary exercise: fixed a common positive gamma
  before trajectories are observed. Choosing the fit with the largest achieved
  margin is allowed only when the bound is evaluated at the fixed gamma and that
  fit meets it on all training trajectories. The union bound is over ten fixed
  finite-feature classes, conditional on dictionaries independent of trajectories;
  use delta/10 for each class. A finite-feature class need not have finite cardinality.
- `vdp-certificates` `#measure`: matrix slack from fitting at alpha+0.05 and testing
  at alpha is 0.1 M. Its tangent quadratic form is 0.1 delta-x^T M delta-x. It
  vanishes with tangent displacement; M>=I prevents it from vanishing merely
  because the base state approaches the equilibrium at a fixed nonzero tangent.
  The scalar Lyapunov energy distinction is explicit.

These implement the beginner review's three precise findings; that reviewer
received the patched raw hashes for independent recheck. Definitions consumed:
Theorem 4.2's setting and constants; `margin-bounds` fixed-margin and data-selected
margin discussion; `boffi-lemma-4-1` confidence formula and simultaneous-solution
interpretation; `contraction-metrics` metric energy and rate convention.

## Sources and computations

- Existing source edition retained: Boffi et al., arXiv:2008.05952v2, Lemma 4.1
  p.6; Appendix A.5 pp.18-19 for the experiment context. No new general theorem
  claim or source-status upgrade was made. The PDF extraction attempt with the
  active Python failed because PyMuPDF (`fitz`) is unavailable; this writer did
  not inspect raw PDF pages or claim a fresh source/proof audit.
- The changed exercise was checked against the developed local
  `margin-bounds` fixed-gamma statement and `boffi-lemma-4-1` formula. Replacing
  delta by delta/10 increases log(log(4 B/gamma)/delta) by log(10), computed as
  2.302585092994046; the confidence contribution therefore increases by
  2 K log(10)/n, holding each class's other quantities fixed.
- `lab/flows.js` line 162 fits with `rate + 0.05`; the product-rule energy and
  matrix inequality are developed in `contraction-metrics`. Independently checked
  2(0.15-0.1)=0.1 (floating-point isclose).

## Validation and candidate identity

- Parsed every Markdown frontmatter with Python tomllib, merged prerequisite
  edges and explicit typed-required links from `routes.toml`, and traversed the
  whole required graph: acyclic. Both new Theorem 4.2 edges are present.
- Asserted the rate-slack arithmetic and logarithm difference above: pass.
- `git diff --check`: pass (unrelated existing tools file has a CRLF warning).
- Engine, Story settings, source `located` status and existing anchors unchanged.
- Build, Node suite, browser/math/render checks are the coordinator's integration
  responsibility; not run by this writer. No commits or publication.

Raw SHA-256 after repairs:

| File | SHA-256 |
| --- | --- |
| `content/17-learning-theory/dual-sudakov.md` | `8472a340b604464c3773acebaf761bc969e097e5e6511cb5baef86a4aebe4564` |
| `content/17-learning-theory/kernels-random-features.md` | `bf1c2ee71430eb4db1f701db79825c4afa432554b619ebf3ab19f19063e27053` |
| `content/18-certificates/vdp-certificates.md` | `0385aefb1a0d54791f265b3e0da197d27bf6050f07e4dcaa1483b9f701047308` |
