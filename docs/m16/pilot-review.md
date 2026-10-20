# M16 pilot review

Status 2026-10-19: **Phase 1 pilot accepted** at the hashes below, within the evidence scope stated here. This record supersedes the pending checkpoint from the earlier Codex run. The rollout (Phases 2–6) has not started.

## Accepted candidate

| Lesson | Author | Baseline raw SHA-256 | Accepted raw SHA-256 |
| --- | --- | --- | --- |
| `content/15-dynamics/lyapunov-functions.md` | writer-D2 (subagent) | `aa47d142…608b` | `c29da439ff5ae7863910b01f0042398207d169f26870ea238c00eb833d86a4c9` |
| `content/17-learning-theory/rademacher-complexity.md` | writer-S2 (subagent) | `f02f29ae…e1dcb1e8` | `a95c06b57e77a573fcce0562e4962582d371802d02fe0e845a2199b94fb1b0b0` |
| `content/18-certificates/boffi-thm-4-2.md` | coordinator | `72ce48fd…f90c` | `04ce6e410c299b5e4a9cbb7ca17fa46dd0576a2effc21d1235b808c57c6e8491` |

Writer reports: [writer-dynamics.md](writer-dynamics.md), [writer-statistics.md](writer-statistics.md). The coordinator authored Theorem 4.2. Its sources are Boffi v2 pp.3–7 and 18–19, read from rendered pages. Its computations (entropy integral, quadratic-class constants, ‖A‖, transient bounds, assembly) were run with node and were later recomputed independently by M1.

## What the pilot lessons now teach

- **Lyapunov functions.** A local recap of flow, equilibrium, stability and attraction. The chain-rule derivation of V̇. Lyapunov's theorem with a full trapping, stability and attraction proof, working on the maximal interval of existence. The exponential comparison and the factor of two between energy and norm rates. The shared nonnormal A, with exact P = [[½,½],[½,1]] and exact rate constants. Failure cases: rotation, positivity, unbounded sublevel sets, and LaSalle as a pointer. A discrete-time difference with a worked example. Native solved exercises and a distinct Card. The Story is reworded; its engine settings and numbers are unchanged.
- **Rademacher complexity.** A local recap of uniform deviation and ERM. Random signs, and the order of sample, signs and supremum. The 1, 0, 0, 1 → ½ toy and the singleton counterexample. The symmetrization derivation (UML Lemma 26.2), with Theorem 26.5 recalled. The linear-ball bound BR/√n derived step by step. The three conventions, including Boffi's worst-sample absolute version. The `{{learning signs}}` demo with its measured quantity, settings, an engine-recomputed table and its limits.
- **Theorem 4.2.** The setting recalled locally, including Lipschitz constants, operator norms, Assumptions 4.1–4.2, the trajectory supremum, problem (3.2) and err. The proof chain has six steps:
  1. Lemma 4.1, recalled exactly with its convention.
  2. Parameter to certificate, as a Lipschitz lemma.
  3. Certificate to trajectory residual.
  4. A volume cover with proof.
  5. Dudley chained from a zero-residual member, with the finite entropy integral I ≈ 1.3526.
  6. Square and substitute.

  The lesson also has a worked three-parameter quadratic with a complete feasible assembly (annulus, T = [0, 0.32]), the fixed-margin infeasibility at the equilibrium, the mismatch with the Lab's relative margin, the hidden constants, and assumption-by-assumption scope.

## Source-level findings surfaced by the pilot

- **A gap in Boffi v2's (B.1) step (M1 L3-1, critical, resolved in the lesson).** For the absolute, worst-sample Rademacher convention, Dudley's integral does not control a nonzero constant residual. The lesson adds an explicit hypothesis: the class contains a member with identically zero trajectory residual, which holds for linear-in-θ Lyapunov classes at θ = 0. Without it, the bound gains a term 2K·B_h²·log³n/(γ²n). A remark shows the counterexample. The source metadata stays `located`; this is not a proof-audit upgrade.
- **The confidence term.** Lemma 4.1 (p.6) prints 2·log(log(4B_h/γ)/δ)/n, and Theorem 4.2 (p.7) prints log(log(B_h/γ)/δ)/n. The lesson keeps the lemma's form as the derived one and explains the difference.
- **The horizon.** The paper's T is maximal. The lesson states a fixed-horizon adaptation and justifies it.

## Gate evidence

| Gate | Evidence | Status |
| --- | --- | --- |
| Baseline and prerequisite closure | route-contract.md, baseline-audit.md (Phase 0) | Complete |
| Drafts and computed examples | Writer reports and scratch scripts; coordinator node computations | Complete |
| Independent beginner review | [beginner-review.md](beginner-review.md), reviewer B1: 24 initial findings (6 moderate) plus N1–N8 from rechecks. All reader tasks A, B and C pass at the accepted hashes, with no prerequisite file needed. Recheck 3 covers the final hashes. | Passed (agent perspective, not student evidence) |
| Independent mathematical review | [math-review.md](math-review.md), reviewer M1, distinct from B1 and from all authors: 1 critical, 1 moderate and 13 minor findings, plus R-1/R-2. All numbers recomputed. Recheck 2 covers the final hashes. | Passed within its checked scope |
| Findings and rechecks | All critical and moderate findings closed and rechecked by the reviewer who raised them. Meaning changes to Theorem 4.2 were re-reviewed by both reviewers. | Closed |
| Build | `python build.py`: 140 stations, 0 warnings | Pass |
| Node tests | `node --test`: 97/97 | Pass |
| Guarantees browser checks | `node tools/guarantees-check.js chrome` (155.0.8059.80) and `edge` (155.0.4283.62): 148 Textbook/Card visits each, 0 page errors, 0 external requests, no KaTeX errors, no mobile math overflow, exact Node/browser engine match | Pass |
| Changed-view visual and DOM inspection | Chrome, three lessons × Story/Textbook/Card × 1440/390 × light/dark: 28 full-page screenshots plus 8 viewport clips inspected. 0 KaTeX errors, 0 page overflow, 0 unresolved refs or links, theme backgrounds correct. | Pass, with one minor note |

Minor layout note: two narrow tables in the Rademacher Textbook (toy enumeration and demo readouts) scroll horizontally by about 20px inside their own scroll box at 390px. That is the app's existing `display:block; overflow:auto` table behavior; the page does not overflow.

## Open items carried to rollout (not mainline blockers for the pilot)

- `content/18-certificates/boffi-lemma-4-1.md` drops Lemma 4.1's factor 2 and should add the 4B_h vs B_h note (M1 L3-8, B1 #12). This belongs to Phase 5.
- The discrete-time Lyapunov theorem is stated and deferred to `time-dictionary` (B1 #6). This belongs to Phase 2.
- Dudley's inequality and Massart's lemma are recalled without proof. `covering-dudley` must develop them (Phase 4).
- `risk-erm` and `uniform-convergence` still write hypotheses as h and risk as R(h). The rollout should match the pilot's ψ and P f convention.
- Requested shared changes (coordinator, not done in this phase):
  - notation.toml entries for the Rademacher conventions and the R radius;
  - the `learning` demo's aria-label in `app/js/flows.js` mentions a predictor that is not drawn;
  - optional route `at` wording for lyapunov-functions → stability.

## Evidence limits

These are agent reviews. B1 simulates a beginner and is not a student study. M1 did not check the Srebro–Sridharan–Tewari theorem behind Lemma 4.1 (no local copy) or Dudley's constant 24. All six result source records stay `located`. Browser checks are not proof audits. The worked numbers are illustrations, not universal guarantees, and no Figure 1 reproduction is claimed.

## Pre-commit documentation finalization, 2026-10-19

The resumed Codex run verified that all three source files still match the accepted raw hashes above and both reviewers' final rechecks. A fresh `python build.py` passed (140 stations, zero warnings), and a fresh `node --test` passed 97/97, with no skips or failures. The existing Chrome/Edge reports and 28-view DOM report were inspected; browser/visual checks were not repeated during this documentation-only finalization. The coordinating handoff and writer/ledger status summaries now reflect completed acceptance, while retaining their historical audit and patch records. No lesson meaning, source status or engine setting changed in this finalization. The user authorized the scoped commit; Phases 2–6 remain pending.
