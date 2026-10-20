# M16 Phase 4: mathematical and source review (P4-M)

- **Reviewer:** reviewer-P4M, assignment P4-M, independent mathematical/source reviewer (agent). I authored none of the reviewed material. I am distinct from the beginner reviewer (reviewer-P4B) and from writers P4-WA and P4-WB. **This is an agent review, not a human proof audit.**
- **Date:** 2026-10-20.
- **Waves:** (1) slice A, plus the coordinator integration edits (the sections below, findings M4-1 to M4-7); (2) slice B (`rademacher-properties`, `covering-dudley`, `covering-properties`, `kernels-random-features`, `dual-sudakov`, pilot `rademacher-complexity` layout edits). Slice B is in the section "Slice B" at the end, findings M4-8 to M4-13. The slice A recheck after writer-P4A's patch is still pending.
- **Read before conclusions:** AGENTS.md; `.agents/skills/atlas-writing/SKILL.md`; `references/rewrite-workflow.md` (Mathematical reviewer role, gates 2–3, Lessons from the pilot); `docs/m16/math-review.md` (pilot decisions on Lemma 4.1 and Dudley); the pilot `rademacher-complexity.md` (symmetrization theorem and conventions); `content/18-certificates/boffi-thm-4-2.md` (`lem-fast`, Step 1); the primary sources. I did not read `docs/m16/writer-phase4a.md`. I read `docs/m16/beginner-phase4.md` only after my first pass, for its referral to P4-M (the abstract Lemma 4.1 restatement, answered in M4-1 and under "Lemma 4.1 restatement").

## Candidate identity (raw SHA-256, `sha256sum`, all equal to the packet)

| File | SHA-256 |
| --- | --- |
| `content/17-learning-theory/risk-erm.md` | `12716d0f827cbe5b52de7255b621f048494208593003554dcbc9e37b94a07389` |
| `content/17-learning-theory/concentration.md` | `d66d448788f402f09abb61424aa2f8cc6423dc16b4c6ab7c717681375bdff5ba` |
| `content/17-learning-theory/finite-classes.md` | `7c22f23842c92d06fc7bda23f9bbe49a0b6d2a07e32c642b7a610685c48ca504` |
| `content/17-learning-theory/uniform-convergence.md` | `dd55fdaedcca17b547b672018680098319b7f76537114f8fa2bb752df49be05b` |
| `content/17-learning-theory/margin-bounds.md` | `81b8ed8a04d9a75656b8e33f50026becd25092cfa93c0e3122eae30b17479405` |
| `content/17-learning-theory/trajectories-as-samples.md` | `e500de60b2aa17853ec3dc735b83ead989e927cfc1fe7d5e192fe5dea4c51411` |
| `content/16-contraction/three-contractions.md` | `4c454424deb3f2eaf444c27232fa157fb5857a6a5fa66ae37cb8ae6b73a844b4` |
| `content/15-dynamics/lyapunov-functions.md` | `22fbd748c62960a42bc9c20fe8d80b83d9d29a92b215b474f4c6c8e2036e3209` |
| `content/18-certificates/boffi-thm-4-2.md` | `204c88ab3eb8b8e3fbf2472a43bfb214e719e27363e851d0b9c772681b37a460` |
| `content/17-learning-theory/rademacher-properties.md` (light check only; slice B, still being patched) | `23dbe32e3847aa8686308ee36910c721a6c2c275f1d0885a5eb255ce204605bc` |

## Sources consulted

| Source | Pages checked (printed / PDF) | What was checked |
| --- | --- | --- |
| Shalev-Shwartz and Ben-David, *Understanding Machine Learning*, 2014 (`course/ese6180/learning.pdf`; offset printed = PDF − 18) | pp.15–20 / 33–38 (§2.2, (2.3), §2.3, ERM_H (2.4), Def 2.1, (2.5)–(2.9), Lemma 2.2, Cor 2.3); pp.26–27 / 44–45 ((3.3), (3.4), Remark 3.1); pp.31–34 / 49–52 (Def 4.1, Lemma 4.2, Def 4.3, (4.1), Lemma 4.5, Cor 4.6, Remark 4.1); p.174 / 192 (§15.2.3 ramp loss); pp.326–329 / 344–347 (Lemma 26.2, Lemma 26.4, Thm 26.5 parts 1–3 and proof); pp.331–335 / 349–353 (Lemma 26.9, Thm 26.13, Remark 26.1, Thm 26.14 and proof); pp.372–376 / 390–394 ((B.3), (B.4), Lemma B.2, Lemma B.6, Lemma B.7) | Statements, constants, hypotheses, and every page locator cited in slice A |
| Boffi et al., arXiv:2008.05952v2 (`course/ese6180/boffi-v2.pdf`, `tmp/boffi-v2.txt`, plus `pdftotext -f 6 -l 6 -layout`) | p.4 (§3.1: X, T, D, exact time derivative, (3.1), (3.2), γ); p.5 ((3.3), §3.1.1 Lyapunov residual); p.6 (Assumptions 4.1–4.2, B_h, h(ξ,V), "zero empirical risk" remark, Lemma 4.1, R_n); p.7 (Thm 4.2 shape only) | Faithfulness of the slice's recall and of the abstract restatement |
| Srebro, Sridharan and Tewari (NeurIPS 2010), Theorem 5 | **not available locally** | Not checked; see limits |

Greek letters are dropped by the text extraction. For Lemma 4.1 I relied on the layout text, which shows `2 log(log(4Bh/·)/·)` and `log3 n R2n(V)/·2`, consistent with the pilot's image-based reading (math-review.md, §Lemma 4.1).

## Checked scope (verified, as distinct from read)

**Verified by recomputation or line-by-line derivation:**

- `risk-erm`: i.i.d. and expectation definitions; two-state memorizer (empirical 0, risk ½, probability 2^{1−n} of all-equal samples, n=2 enumeration); the uniform-interval memorizing class (every member has risk ½, uniform deviation exactly ½ on every sample); the three-term identity \ref{decomp}; the bound on term 1 by the one-sided supremum; the 2ε conclusion, and the approximate-ERM variant 2ε+ε_opt (0.11; exercise 0.065); agreement with SSBD Def 4.1/Lemma 4.2 (ε/2 → ε).
- `concentration`: Markov proof; Chebyshev and the variance of an independent average (cross terms vanish); Hoeffding's lemma, all three steps (chord bound, the substitution u=λ(b−a), q=−a/(b−a), λa=−qu, the form e^{L(u)}, L(0)=L'(0)=0, L''=r(1−r)≤¼, Taylor); Hoeffding's inequality (Markov on e^{λΣX_i}, factorization by independence, minimizer λ=4ε/(b−a)², exponent −2nε²/(b−a)², the reflection for the lower tail, the factor 2 from the union); the confidence inversion; the range-width remark; bounded differences of an average and of the uniform deviation (supremum moves by at most the largest member change); the McDiarmid radius c√(n log(2/δ)/2) against SSBD Lemma 26.4; the consistency check with Hoeffding; the max non-example; the copied-coin failure.
- `finite-classes`: union bound; Theorem `thm-finite` (Hoeffding per member, union, inversion); the agnostic sample size 2log(2|Ψ|/δ)/ε₀², which equals SSBD Cor 4.6; Theorem `thm-zero` (bad set fixed by the distribution, (1−Pf)^n ≤ (1−ε)^n ≤ e^{−nε}, union over bad members, contrapositive), the trivial case ε ≥ 1, the realizability route, and the [0,1]-valued extension (Pr(f=0) ≤ 1 − Pf); the variance explanation; the sample-built-class failure; the discretization bound.
- `uniform-convergence`: pointwise vs uniform quantifier order; the two-model example (gaps ½,0,0,½; mean ¼; probabilities ¼ and ½); the M-model example (pointwise holds with δ=0.1 for ε∈[0.1,0.9)); Lemma `lem-select`; the one-sided use for ERM, against SSBD Thm 26.5(3) and its proof; McDiarmid for G with constant 1/n; the symmetrization sketch against the pilot's `thm-sym` (rendered (4), since equations are counted separately and `sym` is the fourth `\label` in `rademacher-complexity.md`; I checked build.py's numbering) and against SSBD Lemma 26.2; the assembled bound \ref{assembled} for [0,1] losses (see M4-3 on the constant); the 0.143 example.
- `margin-bounds`: the ramp loss, its three-piece sandwich and Lipschitz constant 1/γ; the substitution u = −γ·y⟨w,x⟩ into SSBD's ramp; the slow bound (uniform bound applied to r_γ∘F, SSBD Lemma 26.9 for the signed convention with no φ(0)=0 requirement, the two ramp facts) and its constants 2/γ and √(log(2/δ)/(2n)); the finite-class fast case via the [0,1] extension; the variance bound E(g−p)² ≤ p; the illustrative quadratic, root ((1+√5)/2)²A ≈ 2.618A; the Lemma 4.1 restatement against Boffi p.6 (premises, quantifiers, factor 2, 4B, log³n, absolute worst-case R_n, K unspecified, B ≥ γ forced by feasibility); scaling invariance (R_n, R̂_n, B and γ all scale by c; linear-ρ certificate residual scales by c); the halving-γ effect; the rate crossover; the fixed-margin obstruction at the equilibrium; the Lab description (`app/js/flows.js` lines 62–63, 72: α+0.05 relative margin, 100 holdout trajectories from a separate stream, binomial limit printed only at zero failures); the demo formulas (`app/js/flows.js` lines 128–135: k=16, δ=0.05, √(log(2k/δ)/(2n)) and log(k/δ)/n, both capped at 1, slider 4–128 step 4); SSBD Thm 26.13, Remark 26.1 and Thm 26.14 descriptions.
- `trajectories-as-samples`: flow and determinism; the residual and its chain-rule reading; `def-traj-max` against Boffi (3.3) and the h(ξ,V) shorthand; the dictionary (loss, risk, empirical risk); independence of functions of independent initial states; the copied-indicator example for ẋ=−x; the holdout limit (1−q)^m=0.05, q=1−0.05^{1/m}, and the e^{−qm} bound; the grid-miss counterexample (L_t=0.3π/Δ, bound 0.371); Lemma `lem-bridge` and its proof; the bridge example (r=−ξ²e^{−2t}, maximum at t=1, r' ≤ 8, Δ=0.01, −0.095, γ=0.09; the grid contains t=1; |x(t)| ≥ e^{−1}); the Lab grid claim (RK4 step 0.02, 3 s, every tenth point → 0.2 s); both exercises.
- **Every worked number** in the six Textbooks and Cards was recomputed by script (`tmp/m16-p4m-numbers.log`). Every printed value reproduces to the precision shown, including the exact binomial tail 7.85×10⁻⁵ and ratio 8.5, the crossover n ≈ 2.41×10⁷ and ratio 2.64 at 10⁶, and the demo readouts 31.8/18.0, 15.9/4.5 and 63.5/72.1 %, crossing 10.3.
- **All 13 native exercises**: solutions checked and correct.
- **Every SSBD and Boffi locator** cited in slice A was checked against the printed page and the PDF page (offset 18 for SSBD). All are correct apart from those listed in M4-2.
- **Source metadata**: front matter unchanged against HEAD in all six files. Every source is still `located`; nothing is upgraded.
- **Cross-references**: every `\ref` in the nine files resolves to a label in the same Textbook (script check). No control characters. Every `[[station]]` link in slice A names an existing station file.

**Read but not independently verified:** McDiarmid's proof, which is recalled without proof (the lesson says so, as SSBD do); Srebro–Sridharan–Tewari Theorem 5; whether SSBD Lemma B.2 is stated for averages exactly as paraphrased (the page and lemma number are correct); the rendered views (no browser run by me; the beginner report records the coordinator's DOM checks).

## Per-station verdict (mathematics and evidence gates 2–3, slice A)

| Station | Gate 2 (math) | Gate 3 (evidence) | Open findings |
| --- | --- | --- | --- |
| `risk-erm` | pass | pass | M4-2 (minor), M4-4 (minor) |
| `concentration` | pass | pass | none |
| `finite-classes` | pass | pass | M4-2 (minor), M4-6 (minor) |
| `uniform-convergence` | pass | pass | M4-3 (minor), M4-5 (minor), M4-4 (minor) |
| `margin-bounds` | pass | pass | M4-1 (minor), M4-2 (minor), M4-7 (minor) |
| `trajectories-as-samples` | pass | pass | M4-7 (minor) |
| Integration: `three-contractions` sentence | pass (light; final check in the slice B wave) | n/a | none |
| Integration: kind-word removal, `lyapunov-functions`, `boffi-thm-4-2` | pass | n/a | none |

There are **no critical and no moderate findings**. The minor findings below do not block gates 2–3.

## Lemma 4.1 restatement (`margin-bounds` `lem-boffi`)

The beginner reviewer referred this item. **Judgment: faithful in premises, quantifiers and constants to what Boffi et al. state on p.6. The general-class form is the atlas's own reading, and it is labeled as such.**

- *Premises.* Boffi: δ∈(0,1); Assumptions 4.1–4.2; (3.2) feasible; V̂_n a solution; ξ_i i.i.d. from D. Atlas: i.i.d. examples; a class fixed in advance with |f| ≤ B; γ fixed in advance; some member has zero margin errors; f̂ any such member. Boffi uses Assumptions 4.1–4.2 in the lemma only through B_h. On p.6 Boffi say "both B_h and L_h are guaranteed to be finite by our assumptions", and L_h does not appear in the lemma. Assumption 4.1 also makes h(ξ,V) well defined; in the abstract form this is a hypothesis ("a class of real functions"). The p.6 remark says the lemma follows from zero empirical margin risk via "results from statistical learning theory", so its own justification uses nothing certificate-specific.
- *Quantifiers.* Both say "with probability at least 1−δ, [the/any] solution satisfies". Because the solution depends on the data, the event must in effect be uniform over zero-margin-error members. The atlas mirrors the source's wording exactly, which is correct.
- *Constants.* The factor 2, 4B (Boffi's 4B_h), log³n/γ² times the squared complexity, the absolute worst-case R_n, and an unspecified K all match p.6. The worst-case supremum is over the example space 𝒵 rather than Boffi's X. This is the same object when 𝒵 is the domain of the examples, and a larger one otherwise, so it is conservative.
- *Origin.* Boffi say "adapted from Theorem 5 of Srebro et al."; that source is not local. Whether SST Theorem 5 is itself general enough, and whether it needs γ fixed (the log log(4B/γ) term suggests a peeling over scales that might allow a data-dependent margin), cannot be checked. The atlas's "γ fixed in advance" is at worst stronger than necessary, which keeps it safe.
- The remaining issue is presentation only: M4-1.

## Integration edits

- **`three-contractions` (line 66).** Old: "…its general proof is deferred to SSBD Lemma 26.9 … `rademacher-properties` is the related atlas station, whose fuller Phase 4 development remains pending." New: "This bridge invokes the scalar theorem (SSBD (2014), Lemma 26.9, pp.331–332). [[rademacher-properties]] proves it for this signed convention and treats offsets under the absolute convention and vector-valued composition separately." Against the current `rademacher-properties.md` (hash above):
  - `thm-contraction` is the signed scalar lemma, with a full proof.
  - `#absolute` treats offsets and the absolute convention: the failure example and `abs-shift`, with Ledoux–Talagrand invoked.
  - `#vector` treats vector composition, with Maurer invoked and not proved. "Treats … separately" is accurate for this.

  The sentence is a **true description at this hash**. The SSBD locator (pp.331–332 / PDF 349–350) is correct. Recheck in the slice B wave, because that file is still being patched.
- **Kind-word removal.** `git diff` of both files against HEAD, plus a script: deleting every `(Lemma|Theorem|Example|Definition) ` immediately before `\ref{` from the HEAD text reproduces the working file **exactly**. That is 11 removals in `lyapunov-functions` and 8 in `boffi-thm-4-2`, and no other change. Every label keeps its intended target and its kind matches the removed word:
  - `lem-trap` is `::: lemma`;
  - `def-posdef` is `::: definition`;
  - `thm-lyapunov` and `thm-global` are `::: theorem`;
  - `lem-param` and `lem-residual` are `::: lemma`;
  - `ex-quadratic` is `::: example`.

  So REF_TEXT renders the same words as before, without doubling. No kind word before `\ref` remains in either file. Sentence-initial uses ("\ref{thm-lyapunov} and \ref{thm-global} are…") render capitalized as "Theorem N". **Pass.**

## Findings

| ID | Location (file, anchor, quote) | Severity | Diagnosis | Source locator | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| M4-1 | `margin-bounds` `#fast`, lemma title "Fast-margin bound (Boffi et al., arXiv:2008.05952v2, Lemma 4.1, p. 6, in abstract form; recalled, not proved)" and Card "#idea" ("Boffi et al.'s Lemma 4.1 (invoked …) gives …" for a general class) | minor | Premises and constants are faithful (see the section above). The title still attributes a general-class statement to Boffi, who state it only for certificate residuals under Assumptions 4.1–4.2. The "Provenance and status" paragraph says this, but the paragraph comes after the box, and the Card does not say it at all. A reader quoting the box or the Card could cite Boffi for a generality that no checked source states. | Boffi v2 p.6 (Lemma 4.1; "Note that both B_h and L_h are guaranteed to be finite"; "adapted from Theorem 5 of Srebro et al.") | Retitle to, e.g., "Fast-margin bound (atlas restatement of Boffi et al., Lemma 4.1, p.6; recalled, not proved)". Add one Card clause: "stated by Boffi for certificate residuals; the general form is our reading via its stated origin, unchecked". | open |
| M4-2 | Source locators and metadata. (a) `risk-erm` `#statement`: "Shalev-Shwartz and Ben-David define ERM over a class fixed in advance in §2.3 (2014, p. 16 / PDF p. 34)". (b) `risk-erm` front matter `locator = "2014, Chapters 3–4"`, although the station's central example and ERM definition are Ch.2. (c) `finite-classes` front matter "Chapter 4", although `thm-zero` follows §2.3.1. (d) `margin-bounds` front matter: one SSBD record whose locator is "2014, Chapter 26; Boffi v2 Lemma 4.1, p.6", under the SSBD URL. | minor | (a) §2.3 begins on p.16, but ERM_H, eq. (2.4), is displayed on p.17 (PDF 35); the locator should span both. (b)–(c) The locators omit the chapters that supply consequential claims. (d) Boffi's lemma is attached to the textbook record, under the wrong URL and source kind; §15.2.3 (ramp loss) is also omitted. No status is affected; all remain `located`. | SSBD pp.16–17 / PDF 34–35; Ch.2 §2.3.1 pp.17–19; §15.2.3 p.174; Boffi v2 p.6 | (a) "pp. 16–17 / PDF pp. 34–35". (b) "2014, Chapters 2–4". (c) "2014, §2.3.1 and Chapter 4". (d) Split into two records: SSBD "2014, §15.2.3, Chapter 26" and a Boffi paper record "arXiv:2008.05952v2, Lemma 4.1, p.6" with the arXiv URL, both `located`. Metadata is coordinator-owned if `sources` is treated as shared. | open |
| M4-3 | `uniform-convergence` `#route` "Assembled": "This is the shape of Shalev-Shwartz and Ben-David's Theorem 26.5, part 1 …, specialized to losses in [0,1]"; same constant in the Card | minor | The atlas term √(log(2/δ)/(2n)) is correct: losses in [0,1] give the bounded-differences constant 1/n. It is not, however, a literal specialization. SSBD assume \|ℓ\| ≤ c, use the constant 2c/m, and get c√(2ln(2/δ)/m). Setting c=1 gives a term twice as large. The pilot `rademacher-complexity` quotes SSBD's c-form, so a reader comparing the two stations sees two different constants with no explanation. | SSBD Thm 26.5 and proof, pp.328–329 / PDF 346–347 ("bounded differences … with a constant 2c/m") | Replace "specialized to" with "re-derived for losses in [0,1] (range width 1, constant 1/n); SSBD's form for \|ℓ\| ≤ c has c√(2log(2/δ)/n)". | open |
| M4-4 | `risk-erm` `#assumptions`: "the supremum in \ref{eps-rep} must be a well-defined random variable. Shalev-Shwartz and Ben-David state this measurability requirement in Remark 3.1 … It holds for finite classes and for classes continuously indexed by real parameters." Similar wording in `uniform-convergence` `#route` and `#assumptions`. | minor | Remark 3.1 concerns the measurability of each loss ℓ(h,·), not of the supremum. The supremum requirement is not in Remark 3.1. "Continuously indexed" is only sufficient when θ ↦ f_θ(z) is continuous for each z and the parameter set is separable. It does not cover the indicator losses that this chapter uses (0–1 loss; the violation indicator of `trajectories-as-samples`), for which continuity in θ fails. The claim as written is too broad. | SSBD Remark 3.1, p.27 / PDF 45 | Attribute only the per-loss requirement to Remark 3.1. Phrase the supremum condition as an assumption, e.g. "holds for countable classes, and for classes where the supremum equals one over a countable subfamily (e.g. f_θ(z) continuous in θ for each z); for indicator classes it is assumed". | open |
| M4-5 | `uniform-convergence` `#route` Step 2 (sketch): "…that swap attaches an independent random sign σ_i to each difference. … The result is the symmetrization inequality …≤ 2 E_Z R̂_n" | minor | The sketch is accurate and points to the right inequality, the pilot's `thm-sym` (rendered (4)), with a correct SSBD locator. It omits the step that produces the factor 2: splitting the signed difference into two suprema, each with expectation E R̂. A reader cannot see where the 2 comes from without opening the pilot. | SSBD Lemma 26.2 and proof, pp.326–327 / PDF 344–345; pilot `rademacher-complexity` `thm-sym` Step 4 | Add one clause: "splitting the supremum of the sum into the two samples' suprema gives two equal Rademacher terms, hence the factor 2". | open |
| M4-6 | `finite-classes` `#example` "Counting parameters": "The order k/n is the shape of Theorem 4.2 of Boffi et al."; also `#uses` ("same k/n shape") and the Card | minor | Boffi (4.2) is O(k log³n/(γ²n)) plus a confidence term, with class constants. Calling it "k/n" without "up to log³n" understates the logarithmic cost. `margin-bounds` points out that this cost is substantial (until n ≈ 2.4×10⁷). | Boffi v2 p.7, (4.2) | "…the shape k/n, up to a log³n factor and class constants, of Theorem 4.2…". | open |
| M4-7 | Fixed-margin obstruction. `margin-bounds` `#failure`: "So a sampled trajectory that contains the equilibrium has trajectory residual at least 0 for every candidate, and no candidate meets a fixed margin γ>0." Card: "A fixed scalar margin is infeasible on trajectories that reach the equilibrium". `trajectories-as-samples` after `ex-bridge`: "If D included initial states near 0 … no fixed γ>0 could be met". | minor | Each statement is literally true, but they argue from the wrong event. Under a continuous D, a sampled trajectory almost surely neither starts at nor reaches the equilibrium on a finite horizon. Also, for a finite sample a small enough γ can be met; it is the requirement to fix γ before the data that fails. The real obstruction is population-level. Under Assumption 4.2 and f(0)=0 with f Lipschitz near 0 (constant L_f), the decrease residual satisfies h ≥ −B_∇V·L_f·\|x\| near 0, uniformly over the class. Hence Pr(H_V(ξ) > −γ) ≥ p_γ > 0 for every V whenever D charges a neighborhood of 0. Feasibility of (3.2) at a fixed γ then has probability at most (1−p_γ)^n → 0, and on an unbounded horizon every trajectory fails. A reader may take the current wording to mean that fixed margins are always infeasible, or never a practical issue. | Boffi v2 p.4 ((3.2)), p.5 (§3.1.1 residual), p.6 (Assumption 4.2) | Rephrase: "near the equilibrium every candidate's residual is close to 0. If D gives positive probability to a neighborhood of the equilibrium, a fixed γ is violated on a positive fraction of trajectories, so feasibility of (3.2) becomes unlikely as n grows. On an unbounded horizon it fails on every trajectory". Keep the Card short, e.g. "trajectories that come near the equilibrium". | open |

**Noted, not new:** `margin-bounds` `#uses` sends readers to `[[boffi-lemma-4-1]]` as "the interface for certificates", but that file still omits the factor 2 printed on p.6. This is pilot finding L3-8, deferred to the Part 18 rollout; it is now visible from a second station. No action for the slice A writer.

## Conventions confirmed

- n counts independent initial states/trajectories (`trajectories-as-samples` `#reasoning`, `ex-count`; `concentration` `#assumptions`).
- δ is a failure probability and γ a margin fixed in advance throughout. Natural logarithms are used throughout.
- Fixed versus relative margin is preserved: the Lab's α+0.05 relative margin is said not to be an instance of Lemma 4.1, which matches `flows.js`.
- Signed versus worst-case absolute complexity is kept distinct (slow route versus fast route), consistent with the pilot.
- Cards agree with their Textbooks on every statement and number.
- Each worked example satisfies the premises of what it illustrates:
  - the bridge example checks Lipschitz, domain and horizon;
  - the two-member example uses binary losses;
  - the scaling and exercise numbers satisfy B ≥ γ;
  - the finite-class demo is labeled as having no margin.

## Limits

- Agent review only. It is not a human proof audit and is not evidence for upgrading any `located` status.
- Srebro–Sridharan–Tewari (NeurIPS 2010) Theorem 5 is not local. The generality of the abstract Lemma 4.1, its quantifier structure, and whether the margin must be fixed rest on it and are unverified.
- McDiarmid's inequality is recalled without proof, as it is in SSBD. I did not re-derive it.
- No browser or rendered-view check by me; I did not run `build.py` (it writes coordinator-owned bundles).
- `rademacher-properties` was checked only lightly in this wave, for the integration sentence; it is fully reviewed in the slice B section below.
- Scratch: `tmp/m16-p4m-numbers.log` (number recomputation output) and `tmp/m16-p4m-lyap-old.md` (HEAD copy used for the diff). The scripts are in the session scratchpad.

---

# Slice B (wave 2, 2026-10-20)

Author: writer-P4B. Reviewer: reviewer-P4M, the same independent identity as above; I authored none of this material. This is an agent review, not a human proof audit. I formed the findings below before reading `docs/m16/writer-phase4b.md` and the slice B part of `docs/m16/beginner-phase4.md`. Afterwards I read only the writer's "Open issues for reviewers" list and the beginner reviewer's Monte Carlo line, to compare run-to-run variation.

## Candidate identity (raw SHA-256, `sha256sum`, all equal to the packet)

| File | SHA-256 |
| --- | --- |
| `content/17-learning-theory/rademacher-properties.md` | `23dbe32e3847aa8686308ee36910c721a6c2c275f1d0885a5eb255ce204605bc` |
| `content/17-learning-theory/covering-dudley.md` | `133e615338dfab38e530b9403d1c08706548a674b8818d89fe22f2548b7f5407` |
| `content/17-learning-theory/covering-properties.md` | `5a8e788e3ba547b2a75e2f897e33e042e9626ff486125583352cd0da51f83d5e` |
| `content/17-learning-theory/kernels-random-features.md` | `92f98128ffbec572682fe4bac8167264113881e0c649a2504d564e5555933057` |
| `content/17-learning-theory/dual-sudakov.md` | `e9b9b02c63b7c8158a268cf95732878c398497c71bac884771a5ef116fabd06f` |
| `content/17-learning-theory/rademacher-complexity.md` (pilot; the HEAD version is the accepted `a95c06b5…b0b0`, verified) | `019d9519031f16e34b8aeebc93f88057c7e3a4260eed7e0fd7419bbeada50a8d` |

## Sources consulted (slice B)

- **SSBD 2014** (local PDF, printed page = PDF − 18):
  - pp.181 and 185 / PDF 199 and 203: §16.2 and Lemma 16.2;
  - pp.329–332 / PDF 347–350: Lemmas 26.6–26.9;
  - p.330 / PDF 348: Lemma 26.8, Massart;
  - pp.337–340 / PDF 355–358: Definition 27.1, Lemmas 27.2–27.5, §27.3.

  Lemma 27.2 was also checked in `tmp/uml.txt` (line 19637).
- **Boffi v2:**
  - p.6: the Dudley estimate and its citation [51], Wainwright 2019;
  - p.7: (4.3), (4.4), §4.2, (4.5), the Theorem 4.4 statement;
  - pp.18–19: (B.1), the proof of Theorem 4.2, the B.2 proof, the Lipschitz factor (B_m² + 2B_Dm B_m), and the min{d² log(1+2/ε), cd/ε²} estimate citing Vershynin [50] Thm 2.2;
  - pp.20–23: (B.3), (B.4), Lemma B.1 (B.5)–(B.7) and its proof, the Ledoux–Talagrand citation on p.21, Maurer Thm 3 on p.22, the p.22 bounds on V and ∇V, the "data-dependent dictionary" remark, the choice of K, δ=1/n², the γ/(8√2 L_h) choice, γ/4, (B.8) −3γ/4, the shift h̃ = h+γ/4 with B_h → B_h+γ/4 and γ → γ/2, and ‖f̂−ĝ‖_V ≤ (1+B_θL_φ)‖c−d‖₁;
  - references [35] (Rahimi–Recht 2007), [36] (Rahimi–Recht 2008), [50] and [51].
- **Not available locally:** Vershynin, *Lectures in Geometric Functional Analysis* (dual Sudakov, Theorem 2.2); Ledoux–Talagrand 1991, Theorem 4.12; Maurer, arXiv:1605.00251; Rahimi–Recht 2007/2008; Bochner's theorem; Gordon's inequality for E‖G‖_op ≤ 2√d. All are labeled as recalled in the lessons. I confirmed only that Boffi cites them at the stated places.

## Checked scope (slice B)

**Verified by derivation or recomputation:**

- **`covering-dudley`** (mainline for Theorem 4.2).
  - Recalled objects: the Cauchy–Schwarz inequality `cs` and the shift identity.
  - Massart, all five steps:
    - log-sum-exp and Jensen;
    - factorization, with cosh x ≤ e^{x²/2} via (2j)! ≥ 2^j j!;
    - the optimal λ = √(2logN/(nr²)), giving r√(2n log N);
    - the N=1 and r=0 cases;
    - the 2N absolute variant via A∪(−A).

    The uncentered, normalized form follows from SSBD Lemma 26.8.
  - The interval and diagonal covers, including projecting centers onto the segment (convex, so non-expansive toward members).
  - The parameter transfer, the volume comparison (1+2/u)^k, and the one-scale bound (discarding far centers gives radius D+ε).
  - The full chaining proof, Steps 0–7:
    - halving scales; the link bound ε_j + ε_{j−1} = 3ε_j;
    - the fixed link set, with |L_j| ≤ N(ε_j)² using N(ε_{j−1}) ≤ N(ε_j);
    - Massart giving the constant 6, and the η-tolerance;
    - the sum-to-integral step ε_j = 2(ε_j − ε_{j+1}) with monotone N, giving the constant 12 and the upper limit D/2.

    The finite form \ref{chain-sum} equals SSBD Lemma 27.4 after the √n normalization.
  - Truncation at the radius, and the parameter-ball corollary 12·I·LB√(k/n), I = 1.35258.
  - The B4-25 sentence ("as [[boffi-thm-4-2]] does when it stops its integral at u=1"): it is true of `boffi-thm-4-2` Step 5 (line 128).
  - `lem-abs`: the triangle split, sup|x| ≤ sup x + sup(−x) when 0 is in the family, the sign flip, and Jensen.
  - The worst-case form \ref{dudley-wc}: per-sample D ≤ D_∞, the empirical covers are dominated by sup covers, the right side does not depend on the sample, and the constant is 2·12 = 24.
  - The (B.1) reconciliation, M4-8.
  - The second-route remark.
  - The memorizing-class failure: Hamming-ball counting, H(¼) = 0.8113, log N(¼) ≥ 0.131n, exact complexity ½.
  - All four exercises.
- **`rademacher-properties`.**
  - Rules 1–5 in the signed convention. In the absolute convention, rules 1, 3, 4 and 5, \ref{abs-shift} via Jensen, and the failure of rule 2.
  - The fixed-vector values ½, 0.375 and 0.0796.
  - \ref{zero-member} and the general ‖a₀‖_n/√n + 2× signed corollary.
  - The full coordinate-replacement proof of the contraction lemma with L carried throughout:
    - the one-sign average, merging the two suprema into one over pairs, and the Lipschitz step;
    - removing the absolute value by relabeling the pair, which is valid because T(a)+T(a′) is symmetric;
    - re-splitting, and iterating to L·R̂(A) by rule 3.

    This matches SSBD Lemma 26.9, which proves the L=1 case and rescales; no ℓ_i(0)=0 condition is needed.
  - The diagonal examples (2t: 1; |t|: ¼; t²: ¼; 2t+5: 1; the intermediate (|w|,w): ½).
  - The absolute-convention 2t+5 toy: the exact value 3.5 is correct, but see M4-10.
  - "What does hold": 2L.
  - Maurer and Ledoux–Talagrand as recalled; locators: Boffi pp.21 and 22.
  - thm-hp: bounded differences 2c/n, McDiarmid c√(2log(2/δ)/n), exactly SSBD Theorem 26.5(1).
  - The data-dependent version: R̂ has differences 2c/n, two McDiarmid applications at δ/2, total 3c√(2log(4/δ)/n), which is valid and stronger than SSBD's 4c.
  - All five exercises.
  - The three-contractions sentence (4c454424…) is now **fully true**: the signed scalar lemma is proved, and offsets/absolute (`#absolute`) and vector composition (`#vector`) are treated separately.
- **`covering-properties`.**
  - Definitions; external centers match SSBD Def 27.1, where the cover A′ is an arbitrary set.
  - All three comparison inequalities and their proofs, and the factor 2 in the integral.
  - Subset monotonicity with the {−1,1} counterexample.
  - Transfer rules 1–4 and their proofs, and the coordinatewise Lemma 27.3.
  - **The UML Lemma 27.2 misprint claim.** The printed text reads ∀r>0, N(r,{ca+a₀}) ≤ N(cr,A) for c>0 (PDF 356; `tmp/uml.txt` 19637). With c=2, A=[−1,1] and r=1, the left side is 2 and the right side is 1, so the printed form fails for c>1. It holds for c ≤ 1, because N(r,cA) = N(r/c,A) ≤ N(cr,A) when r/c ≥ cr. The writer's diagnosis and correction are right.
  - The volume theorem: the upper bound by disjoint ε/2-balls, any norm; the lower bound by volume.
  - Matrix norms, the joint-cover routes, and all worked cases (M(0.5)=4, M(1)=2; N(0.3) ≤ 7; 4 and 9 product centers; ⌈√2/ε⌉).
  - All three exercises.
- **`kernels-random-features`** (optional branch).
  - The PSD Gram argument.
  - The class against Boffi (4.5)/(B.3), with β = α/ν, and the (B.4) class.
  - c_j = β(θ_j)/K against the Lemma B.1 proof, and ‖c‖₁ ≤ B_α.
  - The one-point Hoeffding radius B√(2log(2/δ)/K).
  - The Lemma B.1 recall against (B.5)–(B.7): hypotheses, the 1−δ and 1−2δ events, and "the same f̂".
  - The proof-route description: subtracting the φ(0) offset and the absolute Ledoux–Talagrand step; unit vectors q and Maurer.
  - The sinc construction (product-to-sum identity, k = ½ sinc), V = sin(Wx)/(Wx), and sup|V′| = 0.301 and 4.36.
  - The Lemma B.1 bound values 0.300 and 2.43 (B_θ = 3.297).
  - The value-close/residual-far example (−1.8x² ≤ −0.45; increases 9.739 and 99.997).
  - **The B4-30 sentence.** a = γ/(8√2L_h) per component gives joint error √2·a = γ/(8L_h), so residual change ≤ γ/8 and −γ ⇒ −7γ/8 ⇒ −3γ/4. This matches (B.8), and the source's "γ/4" is indeed weaker. It assumes L_h is the Lipschitz constant for the Euclidean norm of the stacked (V,∇V), which is the joint norm used in the atlas; Boffi leave that norm implicit.
  - The p.22 bounds; the dictionary independence argument, δ=1/n² and +1/n²; the shift to γ/2 and B_h+γ/4; the (1+B_θL_φ) factor and the order B_α(1+B_θL_φ)L_h√(K/n).
  - Both observations in the remark: the γ/(4√n) shift cost, which after squaring and dividing by (γ/2)² gives O(log³n/n); and value complexity B√(2log(2K)/n) by the convex hull and Massart.
  - The Gaussian-kernel identity and P(|w|>4) = 6.33×10⁻⁵.
  - All four exercises.
- **`dual-sudakov`** (optional branch).
  - (4.3)/(4.4) against p.7.
  - `lem-op` and its proof: the value bound; the gradient J^T(Δ+Δ^T)m, so the bound also holds for nonsymmetric Δ; √(a²+b²) ≤ a+b.
  - Covering the d²-dimensional Frobenius ball (larger set, valid).
  - The volume estimate \ref{vol}.
  - The dual Sudakov statement in its standard form, with the normalization honestly labeled unchecked; E‖G‖_F ≈ d.
  - The split-integral derivation:
    - the derivative of ε√Λ, and the bound 0.477;
    - the moderate-scale term (√c/2)√d·log d;
    - order √d·log d.
  - The zero member Q=0 (V≡0, h = ρ(0) = 0), and the (B.2) shape.
  - All rate comparisons: 0.96, 53.0, 347, 2121, 47717; ratios 2.38 and 10.49; minimum near d=9 (1.036); first ≥2 at d=73.
  - The c=1 integrals 8.72, 40.7, 169 against dI = 13.5, 135, 1353.
  - All three exercises: 8.18; crossing near 0.052; ratios 1.04, 1.67, 2.38.
- **Pilot `rademacher-complexity` layout diff** (`git diff` against HEAD = accepted `a95c06b5…`). There are six changed lines and no change in meaning:
  - four displays (`sym`, `lin-mid`, the ‖v_σ‖² expansion, `rad-wc`) are split into `aligned` lines with identical mathematics;
  - "§\ref{toy}" becomes "\ref{toy}", which removes a doubled "§" because REF_TEXT prints "§N";
  - one added clause, "[[rademacher-properties]] carries out that step", is true: `thm-hp` and its McDiarmid proof are there.
- **Numbers.** Every deterministic number in the five lessons was recomputed by script (`tmp/m16-p4m-numbers-b.log`) and reproduces. The only exceptions are Monte Carlo quantities:
  - **Operator norm, own seed:** E‖G‖_op = 5.6340 ± 0.0017 (d=10, 10⁵ draws) and 19.5956 ± 0.0059 (d=100, 4000 draws). These agree with the printed 5.637 ± 0.002 and 19.594 ± 0.006 within about 1.5 SE, and both are below 2√d.
  - **Random-feature medians, own seeds:** same order, and the printed ratios 13–23 (derivative) and 1.7–3 (value) are consistent with the printed table. At W=1, K=10⁴ my value medians over six seeds are 0.0072–0.0091, against the printed 0.0063; the beginner reviewer got 0.0065. These are run-to-run variations of an illustration labeled as one example, not a finding.
- **Locators** are correct except those in M4-12 and M4-13.
- **Metadata:** front matter unchanged against HEAD, and every source is still `located`.
- **Cross-references:** all `\ref`s resolve, there are no control characters, and every `[[station]]` link exists.

**Read, not verified (recalled external results, labeled as such in the lessons):** dual Sudakov (Vershynin Thm 2.2) and its normalization; E‖G‖_op ≤ 2√d (Gordon); Maurer's vector contraction with the factor √2; Ledoux–Talagrand Thm 4.12; Rahimi–Recht Thm 3.2; Bochner; the RKHS facts for feature-average kernels; Boffi's proof of Lemma B.1 (read, not re-derived line by line).

## Per-station verdict (gates 2–3, slice B)

| Station | Gate 2 | Gate 3 | Open findings |
| --- | --- | --- | --- |
| `covering-dudley` | pass | pass | M4-8, M4-9 (coordinator), M4-13 |
| `rademacher-properties` | pass | pass | M4-10 |
| `covering-properties` | pass | pass | none |
| `kernels-random-features` | pass | pass | M4-12, M4-13 |
| `dual-sudakov` | pass | pass | M4-11 |
| pilot `rademacher-complexity` (layout diff) | pass, no change in meaning | pass | none |
| `three-contractions` sentence (final check) | pass, fully true | n/a | none |

There are **no critical and no moderate findings in slice B.**

## Reconciliation: worst-case Dudley, constant 24, and (B.1)

The pilot's critical finding L3-1 (math-review.md) was that, under the absolute worst-case convention, the source's Dudley step is false without an extra reference term. `covering-dudley` now proves the repair rather than assuming it.

- `lem-abs` gives R̂^{|·|} ≤ ‖a₀‖_n/√n + 2R̂. Each step checks.
- Signed chaining (constant 12) plus `lem-abs` gives the constant 24 in front of the integral, and sup|f₀|/√n for the reference.
- With a member whose residual is identically zero, the reference term vanishes. The lesson's derivation then reproduces the shape and constant of (B.1), **provided** the covering number of 𝒱 is read as an *internal* one, with centers that are certificates in the class. That reading is needed because the residual Lipschitz step |h(ξ,V₁)−h(ξ,V₂)| ≤ L_h‖V₁−V₂‖_𝒱 is available only for certificates within Boffi's bounds. The lesson states this in a parenthesis ("whose centers are certificates in the class (as the parameter transfer provides)"), but its bullet says "exactly" (M4-8).
- On the Theorem 4.2 route the cover comes from the parameter ball, whose centers lie in the ball, so they are internal. The constant 24 in `boffi-thm-4-2` (`complexity`, 24·I ≈ 32.5) is therefore supported by this derivation for the parametric class.
- Without a zero member, the extra term is B_h/√n, consistent with `boffi-thm-4-2` remark/`#assumptions` (line 177) and the pilot repair.
- `boffi-thm-4-2` line 126 still says "we take its constant 24 from the source without checking it". That is no longer the atlas's best evidence (M4-9).

## Findings (slice B)

| ID | Location (file, anchor, quote) | Severity | Diagnosis | Source locator | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| M4-8 | `covering-dudley` `#conventions`, bullet "With a zero-residual member … our derivation gives (B.1) exactly, constant $24$ included"; Card `#assumptions` "this reproduces Boffi's (B.1) with constant $24$" | minor | The reproduction holds when N(ε;𝒱,‖·‖_𝒱) has centers in the class (internal), which is what the parameter transfer gives. Boffi do not say which covering number (B.1) uses. Read as an external covering number, the comparison of [[covering-properties]] (N^in(2ε) ≤ N(ε)) gives the same form with 48 in place of 24. The argument is right, but "exactly" overstates what the source fixes. | Boffi v2 p.18 (B.1), p.19 (the B.1 proof uses a parameter-ball cover); [[covering-properties]] `thm-packing` | "…gives (B.1) with constant 24 when N counts covers whose centers are certificates in the class (internal covers, as the parameter transfer provides); with arbitrary centers the comparison of [[covering-properties]] doubles the scale, giving constant 48". Make the same qualification in the Card. | open |
| M4-9 | `content/18-certificates/boffi-thm-4-2.md` Step 5 (line 126): "we take its constant $24$ from the source without checking it" | minor (integration; coordinator or Part 18 owner) | Now inconsistent with `covering-dudley`, which derives the 24 (signed 12 × 2 from `lem-abs`) under the zero-member hypothesis and internal parameter-ball centers, exactly the setting of Step 5. The statement is not false, but it understates the evidence and contradicts the neighboring station's wording. The meaning of Theorem 4.2 is unchanged. | — | Replace with, e.g., "the constant 24 is derived in [[covering-dudley]] (§'Absolute values and the worst sample') for internal covers and a zero-residual member, both of which hold here; the source states it without derivation". This needs renewed math review of that sentence only. | open |
| M4-10 | `rademacher-properties` `#absolute` "A failure": "Then \ref{abs-shift} gives $\widehat{\mathfrak R}^{\lvert\cdot\rvert}(\tilde\ell\circ A)+5\cdot\mathbb E\lvert\sigma_1+\sigma_2\rvert/2=1+2.5=3.5$, which is exact here." | minor | The exact value 3.5 is correct, but it does not come from the displayed \ref{abs-shift}. That bound charges ‖b‖_n/√n = 5/√2 ≈ 3.54 and gives 1+3.54 ≈ 4.54. The 2.5 is the exact E\|S_σ(b)\| from the triangle-inequality step inside the proof of \ref{abs-shift}, before Jensen. A reader checking the displayed inequality gets 4.54, not 3.5. | — | "The triangle-inequality step in the proof of \ref{abs-shift}, with the exact $\mathbb E\lvert S_\sigma(b)\rvert=2.5$ (the displayed bound uses $5/\sqrt2\approx3.54$), gives $1+2.5=3.5$, which is exact here." | open |
| M4-11 | `dual-sudakov` `#reasoning` "Assembling the complexity", first display (constant 24 with ∫ √log N(u)), together with `#norm` "(The bound in \ref{lem-op} holds for nonsymmetric differences too, so external matrix centers are allowed. …)" | minor (optional branch) | `lem-op` does hold for any matrix centers. But the residual step needs L_h at the center certificate V_{Q_c}, and a nonsymmetric or non-PSD Q_c, possibly slightly outside the B_Q ball, need not satisfy the bounds under which L_h is defined. This is the same internal/external issue as M4-8. The displayed constant 24 then needs internal centers (factor 2 in scale) or L_h on a slightly enlarged set. Both are absorbed by the O(1) of (B.2), so the conclusion is unaffected. | Boffi v2 p.6 (B_h/L_h definition), p.19 (B.2) | Say that the residual cover uses internal centers (or L_h on a set enlarged by one cover radius), at a constant-factor cost absorbed in O(1); or drop "24" from that display and write O(1). | open |
| M4-12 | `kernels-random-features` `#statement`: "Their Lemma 16.2 (2014, §16.2.2, p. 186, PDF p. 204)"; `ex-sinc` "A Monte Carlo check … reproduces $k(0.3,-0.5)\approx0.448$"; `#frequency` "Bochner's theorem, cited by Boffi et al. ([35])" | minor | (a) Lemma 16.2 is on p.185 / PDF 203 (§16.2.2 starts there). (b) The value 0.448 = ½·sin(0.8)/0.8 needs W=1, which the sentence does not state. (c) Boffi's [35] is Rahimi–Recht 2007 (NeurIPS), not a source for Bochner; the citation is Boffi's, but the parenthesis may mislead. | SSBD p.185 / PDF 203; Boffi v2 p.7 and refs [35]–[36] | (a) "p. 185, PDF p. 203". (b) "(with $W=1$)". (c) "cited by Boffi et al. via Rahimi and Recht (2007), their [35]". | open |
| M4-13 | Source metadata. `covering-dudley`: `locator = "2014, Chapter 27; Boffi v2 Appendix B, p.19"`. `kernels-random-features`: `locator = "2014, Chapter 16; Boffi v2 §4.2 and Appendix B.3"`. Both are under the SSBD URL. | minor | Same pattern as slice A M4-2(d): Boffi locators sit inside the SSBD textbook record with the textbook URL. `covering-dudley`'s Boffi locator also omits p.18, where (B.1) is, and p.6. Status is `located` in both; nothing is upgraded. | Boffi v2 pp.6, 18–19; pp.7, 20–23 | Split each into an SSBD record and a Boffi paper record with the arXiv URL, both `located`. Use "Appendix B, pp.18–19; p.6" for `covering-dudley`. | open |

**Writer claims confirmed:** the UML Lemma 27.2 misprint (c>1) with its counterexample; γ/8 vs the source's γ/4; the data-dependent constant 3 vs UML's 4; the chaining constants 6 and 12 against Lemma 27.4's normalization; the worst-case 24 under the zero-member hypothesis (with M4-8's reading).

## Limits (slice B)

- Agent review; not a human proof audit. Nothing supports upgrading `located`.
- The recalled external results listed above are not local and not checked: Vershynin, Gordon, Maurer, Ledoux–Talagrand, Rahimi–Recht, Bochner and RKHS theory. Their correctness, and the exact normalization of dual Sudakov and the √2 in Maurer, rest on those sources.
- Boffi's Lemma B.1 proof was read against the lesson's description but not re-derived.
- The Monte Carlo checks use my own seeds, so they agree statistically, not digit for digit.
- No browser or rendered-view check, and `build.py` not run.
- Scratch: `tmp/m16-p4m-numbers-b.log`. The scripts are in the session scratchpad.

---

# Slice A recheck (wave 3, 2026-10-20)

Reviewer: reviewer-P4M (agent; not a human proof audit). Input: writer-P4A's patch for M4-1 … M4-7, as described in `docs/m16/writer-phase4a.md` "Math review patch". I reread every patched passage, Card and front matter in the current files, and reran the ref/control-character check. That check passes: every `\ref` resolves and there are no control characters.

## Hashes rechecked (raw SHA-256, all equal to the coordinator's packet)

| File | SHA-256 |
| --- | --- |
| `risk-erm.md` | `79a0d9138bc473f74f9dbb1eff7a8901dc8b89284ca4cb00b12e5f761609b352` |
| `concentration.md` (unchanged) | `d66d448788f402f09abb61424aa2f8cc6423dc16b4c6ab7c717681375bdff5ba` |
| `finite-classes.md` | `2e77adc13fbcf6d54a7451ad779c0bd5a51785479c943133e1a90c3a8800724d` |
| `uniform-convergence.md` | `f07c4a11ab15341fdc69644f5d31f1ce4554dbb1e19059aa84f7efba515e6170` |
| `margin-bounds.md` | `b949d90b905456eabf0780f5492df79051800b2ef324049206b9731c458e8c69` |
| `trajectories-as-samples.md` | `b12bb7f4e37695a53594123028383f9e516ab52e0329c24f3dad18eb0f402e66` |

## Dispositions

| ID | Recheck evidence | Disposition |
| --- | --- | --- |
| M4-1 | The `lem-boffi` title reads "atlas restatement of Boffi et al., … Lemma 4.1, p. 6, which is stated there for certificate residuals only; recalled, not proved". The provenance paragraph says that no checked source states the general-class form. The Card bullet says "the atlas's general-class reading … the general form is unchecked". Premises and constants are unchanged. | **closed** |
| M4-2 | (a) risk-erm: "§2.3 (2014, eq. (2.4), pp. 16–17 / PDF pp. 34–35)", correct (ERM_H (2.4) is on p.17 / PDF 35). (b) risk-erm locator "2014, Chapters 2–4". (c) finite-classes "2014, §2.3.1 and Chapter 4". (d) margin-bounds is now two records: SSBD "2014, §15.2.3, Chapter 26" (textbook, SSBD URL), and Boffi "arXiv:2008.05952v2, September 2020, Lemma 4.1, p.6" (paper, arXiv URL). Every locator matches the pages I checked in wave 1, and both records are `located`. No status was upgraded and no prerequisite changed. | **closed** |
| M4-3 | uniform-convergence "Assembled" now says the bound is re-derived for [0,1] losses (range width 1, bounded-differences constant 1/n). It states SSBD's form for \|ℓ\| ≤ c: constant 2c/n and term c√(2log(2/δ)/n). I recomputed both forms. SSBD Thm 26.5(1), PDF 346, prints c√(2ln(2/δ)/m), and its proof uses 2c/m (PDF 347). At c=1 that is √2·√(log(2/δ)/n) against √(log(2/δ)/(2n)), a ratio of exactly 2, as stated. The note that the pilot quotes SSBD's form is accurate (the pilot's `#symmetrization` "High probability" bullet). Locator pp. 328–329 / PDF 346–347 is correct. | **closed** |
| M4-4 | risk-erm `#assumptions` attributes only the per-loss requirement to Remark 3.1 (p.27 / PDF 45), which is correct. It states measurability of the supremum as an assumption: true for countable classes, or when the supremum reduces to a countable subfamily (e.g. continuity in θ), and assumed for indicator losses. uniform-convergence `#route` and `#assumptions` are consistent with this. Nit, not reopened: `#route` says "whose supremum is *attained* along a countable subfamily". "Equals the supremum over" is meant, as `#assumptions` and risk-erm say. | **closed** (nit noted) |
| M4-5 | uniform-convergence Step 2 now ends with the split: the supremum of a sum is at most the sum of the suprema, each with expectation E R̂, hence the factor 2. This matches the pilot `thm-sym` Step 4 and SSBD Lemma 26.2. | **closed** |
| M4-6 | finite-classes "Counting parameters" and `#uses` now say "$k/n$ … up to a $\log^3n$ factor and class constants". This agrees with Boffi (4.2), p.7. The Card makes no k/n claim. | **closed** |
| M4-7 | **margin-bounds `#failure`** now argues at the population level. Its premises: Lyapunov residual, V(0)=0, ρ(0)=0, uniformly bounded certificate gradients, continuous dynamics. I re-derived the conclusion:<br>- \|V(x)\| ≤ B_∇V\|x\|, so ρ(V(x)) → 0 for continuous ρ.<br>- ∇V·f(x) ≥ −B_∇V\|f(x)\| → 0, since f(0)=0 at the equilibrium.<br>- Hence the pointwise residual exceeds −γ on a neighborhood U of 0, uniformly over the class. Since H_V(ξ) ≥ residual at t=0, every candidate has a margin error on every ξ ∈ U.<br>- So Pr(all n meet γ) ≤ (1 − 𝒟(U))^n → 0 when 𝒟(U) > 0.<br>- On an unbounded horizon, sup_t of the residual is ≥ 0 along every convergent trajectory.<br>- The remark about a post-hoc small γ is correct.<br><br>"Close to 0" uses continuity of ρ, which is implicit; Boffi's class-K ρ is continuous (p.5).<br><br>**margin-bounds Card:** consistent.<br><br>**trajectories-as-samples** after `ex-bridge`: H_V(ξ) = −ξ²e^{−2} > −γ iff ξ² < γe². For γ=0.1 that is \|ξ\| < √0.1·e = 0.8596, which matches the writer's script value 0.860 (the value is not printed in the lesson; the condition is). The conclusion is stated for this example's V, which is the correct scope. The unbounded-horizon remark −x² → 0 is correct. | **closed** |

## New finding from the cross-slice pointer check

I grepped every `[[rademacher-properties]]` mention in slice A and compared each claim with the current `rademacher-properties.md` (23dbe32e…). Pointers:

- **margin-bounds `#reasoning`:** "We invoke it [the contraction lemma] … [[rademacher-properties]] treats it." Accurate: `thm-contraction` is proved there.
- **concentration `#uses`:** "[[uniform-convergence]] and [[rademacher-complexity]] use McDiarmid on the uniform deviation. [[rademacher-properties]] develops the complexity side of that high-probability bound." This is inaccurate (M4-14).
- **uniform-convergence `#route`:** "[[rademacher-properties]] develops symmetrization further, together with the rules for computing complexities of transformed classes." This is inaccurate (M4-14).

| ID | Location (file, anchor, quote) | Severity | Diagnosis | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- |
| M4-14 | (a) `concentration` `#uses`: "[[uniform-convergence]] and [[rademacher-complexity]] use McDiarmid on the uniform deviation. [[rademacher-properties]] develops the complexity side of that high-probability bound." (b) `uniform-convergence` `#route` Step 2: "[[rademacher-properties]] develops symmetrization further, together with the rules for computing complexities of transformed classes." | minor | **(a)** The pilot `rademacher-complexity` does not apply McDiarmid. It quotes Theorem 26.5 and says "[[rademacher-properties]] carries out that step". The McDiarmid step on the uniform deviation is proved in `rademacher-properties` `thm-hp`, which is the high-probability side rather than the "complexity side". **(b)** `rademacher-properties` recalls symmetrization ("That lesson keeps the proof; this one adds the step from an average over samples to the actual sample"); it does not develop it. The proof is in the pilot `thm-sym`. "Rules for computing complexities of transformed classes" is accurate. A reader sent to `rademacher-properties` for more on symmetrization finds only a recall. | (a) "[[uniform-convergence]] applies McDiarmid on the uniform deviation; [[rademacher-properties]] proves the resulting high-probability bound (`thm-hp`) and develops the complexity rules." (b) "[[rademacher-properties]] recalls this inequality, converts it into a high-probability bound with McDiarmid, and gives the rules for computing complexities of transformed classes." | open |

## Recheck verdict

Slice A at the hashes above: M4-1 … M4-7 are **closed**. One new minor finding, M4-14 (pointer accuracy), is open; it is a writer-P4A wording fix and does not block gates 2–3. Gates 2–3 still pass for all six stations, with no critical or moderate findings. Metadata is still `located`. Limits are as in wave 1: Srebro–Sridharan–Tewari is unchecked, no browser run by me, and this is an agent review.

---

# Slice B recheck (wave 4, 2026-10-20)

Reviewer: reviewer-P4M (agent; not a human proof audit). Input:
- writer-P4B's patch, described in `docs/m16/writer-phase4b.md` "Math review patch (M4-8, M4-10 … M4-13)";
- the coordinator's M4-9 edit to `boffi-thm-4-2.md`.

I reread every patched passage, Card and front matter and reran the ref/control-character check: all refs resolve and there are no control characters. For `boffi-thm-4-2.md` I also ran the kind-word script against HEAD. After stripping the 8 earlier kind-word removals, line 126 is the only difference.

## Hashes rechecked (raw SHA-256, all equal to the coordinator's packet)

| File | SHA-256 |
| --- | --- |
| `rademacher-properties.md` | `bd9311c56347f9e5149a2fcf77832cf0be462b7ce0f668db957a84afb002db04` |
| `covering-dudley.md` | `03a6f06464c70c1b7a29b9935996afe449ff6fbeb0fb05095c6c201573a43072` |
| `covering-properties.md` (unchanged) | `5a8e788e3ba547b2a75e2f897e33e042e9626ff486125583352cd0da51f83d5e` |
| `kernels-random-features.md` | `73573ea594a45b22205c2a845c7b718f07de14c19e1f8d783dadeee5995ebecb` |
| `dual-sudakov.md` | `17748420812b8cdcd32130e1252451864c89fc75064d3e16d382a428dc5b68c4` |
| `rademacher-complexity.md` (pilot, unchanged) | `019d9519031f16e34b8aeebc93f88057c7e3a4260eed7e0fd7419bbeada50a8d` |
| `content/18-certificates/boffi-thm-4-2.md` (M4-9) | `cf5b653a041064cffacbfa7699c2c8a66a8866a7019b22fa26562aea06ff71b5` |

## Dispositions

| ID | Recheck evidence | Disposition |
| --- | --- | --- |
| M4-8 | `covering-dudley` `#conventions` bullet, scope bullet and Card now say: constant 24 when the covers have centers that are certificates in the class (internal covers); 48 with arbitrary centers, via N^in(2ε) ≤ N(ε); the source does not say which. I recomputed the 48: ∫√log N^in(ε) dε = 2∫√log N^in(2u) du ≤ 2∫√log N(u) du, so 24 becomes 48. Correct. Nit, not reopened: the bullet's sentence "This is the hypothesis that [[boffi-thm-4-2]] adds explicitly" now follows the 48 sentence, so "this" reads less clearly. It means the zero-residual member. | **closed** |
| M4-9 | `boffi-thm-4-2` line 126 now reads: "[[covering-dudley]] derives it with constant 24 from a zero-residual member when the cover's centers are certificates in the class, as the parameter transfer above provides. With arbitrary centers its derivation gives 48. The source does not say which covering number it means."<br><br>**Is the claim that the parameter transfer provides in-class centers true? Yes, with one wording gap (M4-15).**<br>- `lem-volume`'s proof builds the cover from picks *inside* the unit ball, and for u ≥ 1 it uses the center 0. So the bound (1+2/u)^k is achieved by centers in the ball. Rescaling keeps them in the radius-B_θ ball.<br>- `lem-param` holds for any two parameters in the ball, and the segment between them stays in the ball because the ball is convex.<br>- The image centers V_{θ_c} are therefore certificates in the class (4.1), and `lem-residual`'s L_h applies at them.<br>- The zero-residual member θ₀ is in the ball, by `thm-main`'s hypothesis.<br><br>So 24 is the constant supported for Step 5. The rest of the line is unchanged. | **closed** (see M4-15) |
| M4-10 | `rademacher-properties` `#absolute` "A failure" now attributes the exact 3.5 to the triangle-inequality step in the proof of \ref{abs-shift}, with E\|S_σ(b)\| = 5·E\|σ₁+σ₂\|/2 = 2.5. It notes that the displayed bound uses 5/√2 ≈ 3.54 and gives ≈ 4.54, valid but not tight. Both numbers are recomputed and correct. | **closed** |
| M4-11 | `dual-sudakov` `#norm`: external matrix centers are fine for covering 𝒱, but the residual step uses L_h only at certificates within the class's bounds, so it needs internal centers (factor 2 in scale) or L_h on an enlarged set. After (B.2): 24 assumes in-class centers, otherwise it doubles, and both are absorbed in O(1). Correct. For the PSD subset, N^in(2ε;𝒱) ≤ N(ε;𝒱) ≤ N(ε; Frobenius ball) by [[covering-properties]], so the full-ball entropy estimates still apply at the doubled scale. | **closed** |
| M4-12 | **(a) Writer's correction accepted; my suggested locator was wrong.** On a single-page extraction (`pdftotext -f 204 -l 204`), "Lemma 16.2" sits at line 6 of PDF 204, printed p.186. §16.2.2 begins on PDF 203, printed p.185. My wave-2 reading came from a two-page extraction and misattributed the page. The text now gives "§16.2.2, which begins on p. 185, PDF p. 203; the lemma is on p. 186, PDF p. 204". This is correct; the original "p. 186, PDF p. 204" was also correct for the lemma. **(b)** "with $W=1$" and the closed form ½·sin(0.8)/0.8 ≈ 0.448 are present and correct. **(c)** "cited by Boffi et al. via Rahimi and Recht (2007), their reference [35]" is correct (Boffi refs line 691). | **closed** ((a) withdrawn as an error of mine; (b), (c) fixed) |
| M4-13 | `covering-dudley`: separate Boffi paper record, "arXiv:2008.05952v2, September 2020, Appendix B, pp.18–19; p.6", arXiv URL, `located`. `kernels-random-features`: separate record, "§4.2 and Theorem 4.4, p.7; Appendix B.3, pp.20–23", arXiv URL, `located`. The SSBD records are "2014, Chapter 27" and "2014, Chapter 16". All locators match pages I checked. Nothing is upgraded and no prerequisite changed. | **closed** |

## New finding

| ID | Location (file, anchor, quote) | Severity | Diagnosis | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- |
| M4-15 | `content/18-certificates/boffi-thm-4-2.md` Step 4: "An $\epsilon$-**cover** of a set is a finite collection of points such that every member of the set lies within $\epsilon$ of one of them"; Step 5: "Rescaling turns a $u$-cover of $\mathbb B^k$ into a $B_\theta u$-cover of the parameter ball", together with the new line 126 claim "as the parameter transfer above provides" | minor (coordinator / Part 18 owner) | The claim at line 126 is true, because `lem-volume`'s picks lie in the ball. But Step 4 defines covers with arbitrary points, and Step 5 says "a u-cover". A reader taking a minimal arbitrary cover could have centers outside the ball. There `lem-param` (stated for ‖θ‖ ≤ B_θ) and the class membership of V_{θ_c} are not guaranteed. The in-class property comes from the specific construction, which the text does not say. | In Step 5, say: "take the cover by picks from \ref{lem-volume}, whose points lie in the ball; rescaled, they lie in the parameter ball, so \ref{lem-param} applies and each center is a certificate in the class". Alternatively, note in `lem-volume` that the bound holds for covers with centers in the ball. | open |

## Recheck verdict

Slice B at the hashes above:
- M4-8, M4-10, M4-11, M4-12 and M4-13 are **closed**.
- M4-12(a) was my error and is withdrawn; the writer's locator is correct.
- M4-9 is **closed** in `boffi-thm-4-2`.
- One new minor finding, M4-15, is open. It is a coordinator/Part 18 wording fix and does not block gates 2–3.
- Gates 2–3 still pass for all slice B stations, and the `three-contractions` sentence remains true.
- There are no critical or moderate findings. Metadata is still `located`.
- Limits are as in wave 2: the recalled external results are not checked, there was no browser run by me, and this is an agent review.

Still pending: the short recheck of writer-P4A's M4-14 patch.

---

# Final status (wave 5, 2026-10-20)

Reviewer: reviewer-P4M (agent). **This is an agent mathematical/source review, not a human proof audit.** All hashes below were verified with `sha256sum` on the working files at the time of writing. The ref/control-character check passes on every file changed in this wave. For `boffi-thm-4-2.md`, the kind-word script against HEAD shows exactly two non-kind-word changes, lines 120 (M4-15) and 126 (M4-9).

## Last rechecks in this wave

- **M4-14** (writer-P4A). The `concentration` `#uses` now reads: "[[uniform-convergence]] applies McDiarmid to the uniform deviation, and [[rademacher-properties]] proves that step within its high-probability bound; [[rademacher-complexity]] quotes the resulting textbook theorem." Each part is accurate: `thm-hp` in `rademacher-properties`, and the pilot's quotation of Theorem 26.5. `uniform-convergence` `#route` now reads "[[rademacher-properties]] recalls this inequality and develops the rules for computing complexities of transformed classes", which is accurate. The `#route` nit now reads "equals the supremum over a countable subfamily". **Closed.**
- **M4-15** (coordinator). `boffi-thm-4-2` Step 5 now opens: "Use the u-cover of 𝔹^k built in the proof of \ref{lem-volume}, whose points are picked inside the ball (for u≥1, the single point 0). Rescaling turns it into a B_θu-cover of the parameter ball with centers in that ball, so every center is a certificate in 𝒱." This is true by `lem-volume`'s construction, and it makes the line 126 constant 24 follow explicitly. **Closed.**
- **`covering-dudley` referent nit.** The sentence now reads "The zero-residual member is the hypothesis that [[boffi-thm-4-2]] adds explicitly." **Closed.**

## Final hashes and per-station verdict

| File | Final SHA-256 | Gate 2 (math) | Gate 3 (evidence) |
| --- | --- | --- | --- |
| `17-learning-theory/risk-erm.md` | `79a0d9138bc473f74f9dbb1eff7a8901dc8b89284ca4cb00b12e5f761609b352` | pass | pass |
| `17-learning-theory/concentration.md` | `4e2a4c823042e3dea2d08370a098cacaecdd5009e9c093e97aa5a57e730a727d` | pass | pass |
| `17-learning-theory/finite-classes.md` | `2e77adc13fbcf6d54a7451ad779c0bd5a51785479c943133e1a90c3a8800724d` | pass | pass |
| `17-learning-theory/uniform-convergence.md` | `e9c01b793323f348dbcdddde9981e48b43d097dce29460ee1ea2a89a6be16490` | pass | pass |
| `17-learning-theory/margin-bounds.md` (B4-34 post-final edit, rechecked) | `da81acff72b9ebba962d2ae0aa8b2fcf291724c5b072d7917f87b409f31c1f26` | pass | pass |
| `17-learning-theory/trajectories-as-samples.md` | `b12bb7f4e37695a53594123028383f9e516ab52e0329c24f3dad18eb0f402e66` | pass | pass |
| `17-learning-theory/rademacher-complexity.md` (pilot; layout-only diff from accepted `a95c06b5…`) | `019d9519031f16e34b8aeebc93f88057c7e3a4260eed7e0fd7419bbeada50a8d` | pass | pass |
| `17-learning-theory/rademacher-properties.md` | `bd9311c56347f9e5149a2fcf77832cf0be462b7ce0f668db957a84afb002db04` | pass | pass |
| `17-learning-theory/covering-dudley.md` | `54f20740b4f5ff12f46af735455c8bab2c8611728415ce27a5e13250fcfb8fa8` | pass | pass |
| `17-learning-theory/covering-properties.md` | `5a8e788e3ba547b2a75e2f897e33e042e9626ff486125583352cd0da51f83d5e` | pass | pass |
| `17-learning-theory/kernels-random-features.md` | `73573ea594a45b22205c2a845c7b718f07de14c19e1f8d783dadeee5995ebecb` | pass | pass |
| `17-learning-theory/dual-sudakov.md` | `17748420812b8cdcd32130e1252451864c89fc75064d3e16d382a428dc5b68c4` | pass | pass |
| `16-contraction/three-contractions.md` (integration sentence) | `4c454424deb3f2eaf444c27232fa157fb5857a6a5fa66ae37cb8ae6b73a844b4` | pass (sentence true of `rademacher-properties` at `bd9311c5…`) | n/a |
| `15-dynamics/lyapunov-functions.md` (kind-word removal only) | `22fbd748c62960a42bc9c20fe8d80b83d9d29a92b215b474f4c6c8e2036e3209` | pass | n/a |
| `18-certificates/boffi-thm-4-2.md` (kind words; M4-9 line 126; M4-15 line 120) | `77a427a9cd16dd37c36bdd75b9453eac59c5a3109a9e4e9f9fe618e6cfb295a0` | pass, for the changed passages only; the rest of this file was reviewed in the pilot (`math-review.md`) | n/a |

## Finding dispositions

| ID | Severity | Station | Disposition |
| --- | --- | --- | --- |
| M4-1 | minor | margin-bounds | closed (wave 3) |
| M4-2 | minor | risk-erm, finite-classes, margin-bounds metadata/locators | closed (wave 3) |
| M4-3 | minor | uniform-convergence | closed (wave 3) |
| M4-4 | minor | risk-erm, uniform-convergence | closed (wave 3; nit fixed in wave 5) |
| M4-5 | minor | uniform-convergence | closed (wave 3) |
| M4-6 | minor | finite-classes | closed (wave 3) |
| M4-7 | minor | margin-bounds, trajectories-as-samples | closed (wave 3) |
| M4-8 | minor | covering-dudley | closed (wave 4; referent nit fixed in wave 5) |
| M4-9 | minor | boffi-thm-4-2 line 126 (coordinator) | closed (wave 4) |
| M4-10 | minor | rademacher-properties | closed (wave 4) |
| M4-11 | minor | dual-sudakov | closed (wave 4) |
| M4-12 | minor | kernels-random-features | closed (wave 4); part (a) withdrawn as a reviewer error, and the writer's locator p.186 / PDF 204 is correct |
| M4-13 | minor | covering-dudley, kernels-random-features metadata | closed (wave 4) |
| M4-14 | minor | concentration, uniform-convergence pointers | closed (wave 5) |
| M4-15 | minor | boffi-thm-4-2 Step 5 (coordinator) | closed (wave 5) |

There were **no critical or moderate findings** in any wave. No findings remain open from this review.

**Carried, not part of this review's dispositions:** pilot L3-8. `boffi-lemma-4-1.md` omits the factor 2 printed in Boffi's Lemma 4.1, and `margin-bounds` links to that file. It stays deferred to the Part 18 rollout.

## Evidence scope and limits (unchanged)

- Source metadata stays `located` in every file. I support no upgrade.
- **Not checked, because not available locally:**
  - Srebro–Sridharan–Tewari Theorem 5, the origin of Lemma 4.1 and of its general-class reading;
  - Vershynin (dual Sudakov);
  - Gordon (E‖G‖_op ≤ 2√d);
  - Maurer (vector contraction);
  - Ledoux–Talagrand Theorem 4.12;
  - Rahimi–Recht;
  - Bochner;
  - the RKHS facts.

  The lessons label all of them as recalled.
- **Read, not re-derived:** McDiarmid's inequality and Boffi's proof of Lemma B.1.
- Monte Carlo values were confirmed statistically with my own seeds, not digit for digit.
- No browser or rendered-view check by me, and `build.py` not run.
- Agent perspective only: not evidence of student learning and not a human proof audit.

**Post-final recheck (B4-34, `margin-bounds` `da81acff…`).** The `#failure` bullet and the Card now require the initial-state distribution to give positive probability to *every* neighborhood of the equilibrium. This is the correct strengthening. For a fixed γ, the neighborhood U_γ on which every candidate's residual exceeds −γ shrinks with γ (radius of order γ/(B_∇V·L_f)), so positive mass on one neighborhood would not cover every γ. Positive mass on every neighborhood gives 𝒟(U_γ) > 0 for each γ, and then Pr(all n meet γ) ≤ (1−𝒟(U_γ))^n → 0. The rest of the passage is unchanged and still correct. Refs resolve, and there are no control characters. Verdict: pass. No new finding.
