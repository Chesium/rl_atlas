# Upstream documentation snapshots

Retrieved 2026-10-19 for the user-requested RL Atlas writing-workflow adaptation.
The five Markdown files below are verbatim downloads. `manifest.json` records
their exact download URLs and SHA-256 digests; links here use immutable revisions.

| Author/repository | Revision | Included documents |
| --- | --- | --- |
| [panpanc/math-skills](https://github.com/panpanc/math-skills/tree/f96707ab1104d52487dbbfecaba8deca2f98a88a) | `f96707ab1104d52487dbbfecaba8deca2f98a88a` | `.claude/skills/bottom-up/SKILL.md`, stored at [bottom-up/UPSTREAM_SKILL.md](bottom-up/UPSTREAM_SKILL.md) |
| [az9713/writing-skills](https://github.com/az9713/writing-skills/tree/367bd4ccaaad42023dfc647a5c29d40e611e5866) | `367bd4ccaaad42023dfc647a5c29d40e611e5866` | `skills/rigorous-explainer/SKILL.md` and three references listed below |

The rigorous-explainer files are [UPSTREAM_SKILL.md](rigorous-explainer/UPSTREAM_SKILL.md),
[textbook-style.md](rigorous-explainer/references/textbook-style.md),
[technical-writing-guides.md](rigorous-explainer/references/technical-writing-guides.md),
and [pedagogy-checklist.md](rigorous-explainer/references/pedagogy-checklist.md).
Attribution remains with their respective upstream authors. Neither repository's
pinned root listing contained a license file; this snapshot does not assign a
new license to the upstream material.

Upstream `SKILL.md` files are named `UPSTREAM_SKILL.md` locally to avoid discovering
them as additional active skills. The filenames changed; the downloaded bytes did
not. The manifest preserves each original `upstream_path`.

## How these copies are used

Only [the adapted atlas-writing skill](../../SKILL.md) is the local authoring
entrypoint. The archived skills are explanatory sources. Their internal commands,
file-deletion steps, publication recipes, and instruction precedence are not active
repo instructions. Read them under the adaptation's explicit overrides.

This is a selected documentation snapshot, not a complete upstream installation.
Scripts, templates, other skills, and unrelated references were not downloaded.
Relative links in the verbatim documents to omitted files are therefore archival
references; consult the same pinned upstream revision if one becomes relevant.
In particular, the atlas uses its own Markdown build, KaTeX, native statement and
question blocks, deterministic examples, and browser validation. A MathJax DOM
checker or a stage-label counter cannot be assumed to validate this product.

## Updates

Do not silently refresh from `main`. To update intentionally, choose and record a
new immutable revision, inspect the upstream changes, download the selected files
without altering their bytes, update the manifest hashes/date, and reconcile the
adaptation. Keep upstream copies separate from local changes so the distinction
remains reviewable. Verify each local SHA-256 against `manifest.json` after a
download or update. These snapshots are authoring references and are not copied
into the public HTML by the content build.
