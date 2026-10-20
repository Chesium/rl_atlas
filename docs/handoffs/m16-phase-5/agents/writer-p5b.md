# Handoff: writer-P5B (M16 Phase 5, deployment and practice slice)

Assignment P5-WB, 2026-10-20, input `82f00a4`. Status: **math findings M5-1, M5-2, M5-5, M5-6, M5-7 patched** (awaiting recheck by P5-M); earlier: **beginner findings patched** (B5-9 to B5-21 fixed, B5-22 declined as optional because the Story is pinned). B5-23 was fixed in the Card. Full record: [writer-phase5b.md](../../../m16/writer-phase5b.md), sections "Beginner patch", "Beginner recheck patch", "Math patch" and "Math recheck patch".

## Current files (raw SHA-256)

- `content/18-certificates/boffi-thm-5-1.md` `48e3e2048d955a9d4c75b5c8ced2fab910ff32009e4ee9944ffb9c96d1caf71c`
- `content/18-certificates/boffi-thm-5-2.md` `a95c8f9cee2ecddb60dc67d04aca8cfa7d1f935ec241a21be42cee6cfbfba236` (after the M5-9 Card fix)
- `content/18-certificates/certificates-in-practice.md` `75b44bd299e19b06dc2526e6df3e7535b384474ba784f8dbc3c0e6590edf4097`
- `content/18-certificates/vdp-certificates.md` `e78c297184bf16918c6cd5f370fa438ee13db2ccc14a6f9844e3b34a6cd3fd6d` (Story byte-identical to HEAD)

Draft hashes (pre-patch) are in the writer report. Scratch files (ignored): `tmp/m16-phase5b-calculations.py`/`.out`, `tmp/m16-p5b-katex-scan.js`, `tmp/p5b-refcheck.py`, `tmp/p5b-patch.py`, `tmp/p5b-splice.py`, `tmp/p5b-*.patch`, `tmp/p5b-52-*.md`.

## Open issues for reviewers

- 5.2 printed radius: source derivation gaps (the missing true rate, now derived in the lesson's Step 1a/1b; the condition-number bound valid only for weight ≤ 1). Bump-metric counterexample for linear $f$. The reconstructed radius is marked unaudited.
- Premises: 5.1 and 5.2 now both assume a strict $\nu<\varepsilon$; 5.1 takes its gradient bounds over a convex set; 5.2 assumes a differentiable factor $\Theta$.
- The rate proved in 5.2 is the energy rate $(1-\eta)\lambda$, not the printed $-2(1-\eta)\lambda M$.
- Coordinator request: B5-22 Story wording ("norm rate"), if the Story is ever touched.

## Validation

Ran `python build.py` (0 warnings), the strict KaTeX scan (0 errors), the ref/control/doubled check, and `node tools/m16-lesson-check.js chrome --quick --parts=18` (no page errors; my views clean). Not run: the full sweep, Edge, `node --test`, screenshots. No commit, publication or nested agents.

## To resume

Compare the hashes above with the files. Wait for the P5-M recheck of the math patch (see "Math patch" in the writer report), patch only the four owned files, record each disposition in the writer report, rerun the checks, and update the hashes here.
