# M16 Phase 3 writer report

Assignment P3-W; author agent `/root/writer_contraction`. Draft checkpoint: 2026-10-20 02:42 UTC (2026-10-19 local task date). This is an authoring and calculation report, not independent acceptance. Baseline HEAD `9764c85`; all five Part 16 Markdown files are this writer's exclusive content ownership. No shared metadata, application code, generated bundles, PLAN.md, or other writer's files were changed. No commits or nested agents were created.

## Delivered teaching work

- `incremental-stability`: all-pair/all-time quantifiers on a declared invariant domain; local KL reminder; doubled system and diagonal distance; pair-energy calculation; exact scalar example; incremental input-to-state estimate with integrating-factor proof; explicit distinction between incremental exponential stability and exponential incremental ISS; globally attractive scalar counterexample without uniform pair forgetting; two solved native questions.
- `variational-dynamics`: Jacobian dimensions; initial-direction difference quotient; averaged Jacobian and derivative limit using the developed sensitivity prerequisite; exact tangent versus finite remainder; cubic explicit solution and checked finite quotients; symmetric-part length condition; nonnormal expanding direction; two solved native questions.
- `contraction-metrics`: three-factor product rule including the flow derivative of M; energy/norm rate conversion; arbitrary path transport and two infimum steps without assuming a shortest curve exists; explicit invariant-region, convexity and nonconvex path-length qualifications; exact P calculation for the shared A; moving-metric failure case; inline and full-Lab prediction/intervention/observation/explanation with sample units and limitations; two solved native questions.
- `three-contractions`: actual Bellman, physical-distance and signed statistical-composition inequalities with their spaces and constants; Bellman proof; scalar contraction lemma explicitly invoked rather than silently rewriting Phase 4; signed toy calculation, offset/absolute convention distinction, unstable plant with contracting discounted Bellman operator; two solved native questions.
- `imitation-deployment`: add/subtract expert action at deployed state; time-varying error recurrence and induction; geometric-sum proof; attainable scalar example; deployment-region and prefactor-C cautions; small expert-data error counterexample; expanding and neutral propagation cases; two solved native questions.

The existing Story, Textbook, and Card section anchors, station IDs, prerequisite/source metadata, and story engine settings remain. Cards are concise references distinct from the developed Textbooks. No new visual engine or fixed numerical outcome was invented. The existing inline contraction demo uses n=4/20 holdouts, whereas its Story shows eight illustrative trajectories and its full Lab uses 100 holdouts per seed; the lesson now distinguishes them.

## Sources actually consulted

1. Lohmiller and Slotine, *On Contraction Analysis for Non-linear Systems*, Automatica 34(6), 1998, §§2–3, from local `course/ese6180/contraction.pdf`, raw SHA-256 `3a790e35223f4804e004d439569a636072012c0f443339914e47a9a68d340515`. Read extracted source `tmp/m15-contraction.json`: PDF pp.3–4, equation (2), symmetric-part calculation and Theorem 1; pp.5–8, metric length, equations (5)–(9), Definition 2/Theorem 2; p.10 remarks for domain context; pp.24–25 (§5) discrete virtual dynamics and singular-value condition. Page numbers are local PDF pages (the source copy's own labels), not invented journal page locators. The lesson supplies its own explicit path/invariance proof and two-sided metric bounds; it does not copy a converse argument or claim a converse theorem.
2. Shalev-Shwartz and Ben-David, *Understanding Machine Learning*, 2014, Lemma 26.9, printed pp.331–332 / PDF pp.349–350. Local raw PDF `tmp/ref-textbooks/Understanding machine learning _ from theory to algorithms - Shalev-Shwartz and Ben-David.pdf`, SHA-256 `a31cf1fa49b88b45128b692d0f029eea07bbe2264a21ffd1aabc10c649bc0199`; extracted `tmp/m15-learning.json` was read. Checked both the statement and the coordinate-replacement proof for its signed, normalized, no-absolute-value convention. The local bridge invokes this theorem; its general proof and vector/absolute variants remain Phase 4 work.
3. Boffi et al., arXiv:2008.05952v2, p.8, Assumption 5.1, from `tmp/m15-boffi-v2.json`. Its pair quantifiers/horizon and printed KL wording were checked. The lesson explains the standard asymptotic limit-to-zero clause, which the printed definition omits, without asserting the paper's assumption is established by training data.
4. Angeli, *A Lyapunov Approach to Incremental Stability Properties*, IEEE TAC 47(3), 2002, 410–421, DOI https://doi.org/10.1109/9.989067. **Fulltext access limitation:** DOI IEEE access is blocked; the author institutional record https://flore.unifi.it/handle/2158/307517 explicitly has no associated file; OpenAlex lists only a closed publisher location. Author URL attempts did not yield a copy. The citation was retained as existing provenance; no unread Angeli theorem or proof is described as verified. Incremental/input definitions, scalar examples, and deployment recurrence are explicitly stated and self-contained. The deployment lesson calls its discrete imitation recurrence an atlas derivation, not a theorem copied from Angeli §IV. Independent review should record this source-access limit too.
5. Existing `bellman` source metadata and Textbook were read; the bridge independently derives its discounted sup-norm inequality from probability weights and the maximum inequality. Source references remain those already attached to the station. No private draft appendix was used.

## Computations and mechanical checks

Ran `python tmp/m16-phase3-calculations.py` (ignored scratch file, reproducible stdlib arithmetic), checking:

- PA=[[-0.5,0.5],[-0.5,-0.5]], AᵀP+PA=-I.
- Metric eigenvalues 0.19098300562505255 and 1.3090169943749475; norm rate 0.38196601125010515; Euclidean prefactor 2.618033988749895.
- At v=(0.8,0.6), metric energy 1.16 and Euclidean energy derivative 0.1600000000000001 (exact rational 0.16).
- Cubic finite quotients at t=1: ε=0.1 gives 0.3662992196684835; ε=2/3 gives 0.3126735363611587; tangent 0.36787944117144233. Corrected the second rounded number during author self-check.
- Scalar pair separation 3/e=1.103638323514327.
- Signed toy sign-suprema [1,0,0,1], average 0.5; composition by 2a gives 1.
- Deployment uniform e3=0.175, floor 0.2, weighted e3=0.125, failure example e2=1.005 versus invalid substituted bound 0.015; expanding example e3=0.7.

`git diff --check -- content/16-contraction` passed (only Git line-ending normalization notices). Shared build, Node suite, browser checks and desktop/mobile screenshots are coordinator-owned and were not run by this writer during parallel editing. Source qualifications stay `located`; author checks do not upgrade provenance or establish student learning.

## Draft revision for the coordinator layout gate

Raw SHA-256 after computation/self-check, before independent review:

| Station | SHA-256 |
| --- | --- |
| contraction-metrics | `1a49590d6ac5e46c7668309a491a528231879a7841c0f3bd50f2440bee2b715b` |
| imitation-deployment | `89313b6e849fe2f68073bffb3516cb318bf009bee52b691918170b317ec26239` |
| incremental-stability | `253e7af53f0d90b269fa7fcacd87c448c0903c52c0f92d8d0e5ab7eb8f231d0f` |
| three-contractions | `66d957e868972ce34854f91a19885108b2fcdf6aaf492b94ba47bc77be59e8df` |
| variational-dynamics | `6c20451763162b22cb151a76137931cd7505acfa5edbdb389e13a853bdf74de7` |

## Dependencies and remaining gates

The accepted pilot `lyapunov-functions.md` was freshly hashed at `c29da439ff5ae7863910b01f0042398207d169f26870ea238c00eb833d86a4c9`. The Part 15 writer is simultaneously developing comparison functions, sensitivity and the Lyapunov equation under the agreed route contract. Phase 3 acceptance must reconcile local reminders against that final upstream candidate. No Part 15 edits were made here.

The statistical lemma's full educational proof remains in Phase 4 `rademacher-properties`; this station provides a complete local definition, precise invoked statement, convention qualification and worked toy, not a claim that Phase 4 has been rewritten. No new required route edge is requested. Optional provenance enrichment for `three-contractions` could attach the UML Lemma 26.9 source to its existing source list, but original metadata was left untouched under the assignment's preservation constraint.

Coordinator reported its 30-visit mobile math gate passed after the draft checkpoint. Full Chrome/Edge screenshot checks are being run by the coordinator; this writer has not independently executed them. Current Part 15 comparison-functions, ode-sensitivity and lyapunov-equation were read after drafting and align with the local reminders and numerical conventions. Final upstream accepted hashes remain pending. Next: distinct beginner and mathematical reviews, writer patches, and reviewer rechecks at the resulting hashes. Final product acceptance remains pending. No owned background jobs or descendants. The writer ended its active turn at coordinator request to free the beginner-review slot.

## Mathematical review patch M23-2

2026-10-20 02:45 UTC: reviewer `/root/review_math` correctly identified that three-contractions claimed the full statistical contraction proof and variants were already developed in `rademacher-properties`, which remains a compressed Phase 4 station. Replaced that claim with an explicit invocation and external proof deferral to UML (2014), Lemma26.9 pp.331–332, and made the atlas station's fuller Phase 4 development explicitly pending. No theorem, convention, example, source status or other lesson changed. New raw SHA-256 for three-contractions: `2417de733ec31194746869ea69ebed4255618c7814d808d7660be3b57e054f9f`. Other content hashes above remain current. `git diff --check` passed. Recheck requested from reviewer; not yet claimed closed. Fresh guard check at 02:45:03 UTC returned ok,39%five-hour,64%weekly. The bounded repair turn ends after reporting this revision.
