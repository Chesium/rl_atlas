# M16 Phase 5A writer report (formulation and generalization)

Assignment P5-WA; author agent `writer-P5A` (Claude Code subagent). Draft checkpoint 2026-10-20. Baseline HEAD `82f00a4`. This is an authoring and calculation report, not independent acceptance. Only the five owned Part 18 lessons, consistency-only pointer edits to the pilot `boffi-thm-4-2`, this report and the writer handoff were edited. No TOML front matter (summary, prereqs, sources, `review = "located"`) was changed. No shared metadata, app/tool code, PLAN.md, coordinator file, Part 15–17 lesson or P5B-owned file was edited. `python build.py` regenerated `rl_atlas.html` and `app/content.js` for validation only. No commit, push, publication or nested agent.

## Inputs read

- AGENTS.md; `.agents/skills/atlas-writing/SKILL.md`; `references/rewrite-workflow.md` including "Lessons from the pilot".
- `docs/m16/route-contract.md` (audience/notation, Part 18 records); `docs/m16/phase4-review.md` (notation, L3-8, constant 24/48, Lemma 4.1 general-class reading); `docs/m16/task-ledger.md` "Phase 5 execution"; `docs/handoffs/m16-phase-5.md`; `docs/guarantees.md` (Lab settings).
- Accepted prerequisites (read, not edited): `lyapunov-functions`, `controller-or-certificate`, `comparison-functions` (headings), `trajectories-as-samples`, `margin-bounds`, `rademacher-complexity` (headings/conventions), `covering-dudley` (conventions section), `covering-properties` (first half), `dual-sudakov`, `kernels-random-features`, `rademacher-properties` (headings). Pilot `boffi-thm-4-2.md` verified at baseline raw SHA-256 `77a427a9…` before editing.
- Engine: `lab/flows.js` (`experiment`, `residual`), `app/js/flows.js` (the `{{flow linear}}` demo: seed 1, n=4, 20 holdout, rate 0.1).

## Sources consulted

1. Boffi, Tu, Matni, Slotine and Sindhwani, *Learning Stability Certificates from Data*, arXiv:2008.05952v2 (Sept 2020), local `course/ese6180/boffi-v2.pdf`, rendered pages read with the Read tool (Greek symbols verified on the images; `tmp/boffi-v2.txt` used only for structure): §3 and (3.1)–(3.3), pp.4–5; §3.1.1–3.1.2 p.5; Assumptions 4.1–4.2, $B_h/L_h$ definitions, $h(\xi,V)$ shorthand, Lemma 4.1, (B.1) preview, class (4.1) p.6; Theorems 4.2, 4.3 with (4.3)–(4.4), class (4.5), Theorem 4.4 and $\kappa$ p.7; (B.1) p.18; B.1–B.2 p.19; B.3 with (B.3)–(B.8), Lemma B.1 and its proof, the choice of $K$, the shift and the assembly pp.20–24.
2. Srebro, Sridharan and Tewari (NeurIPS 2010), Theorem 5: **not consulted**; named only as the paper's stated origin of Lemma 4.1. Rahimi–Recht, Ledoux–Talagrand, Maurer, Vershynin: not consulted; their results are recalled as invoked through Part 17.
3. Private course notes were not used.

## Notation applied

State dimension $p$, parameter count $k$, trajectory count $n$, initial state $\xi$, flow $\phi_t(\xi)$, initial set $X$, distribution $\mathcal D$, time interval $T$ (Boffi's maximal interval; a fixed $[0,t_{\max}]$ in examples, as in the pilot), reachable set $S$ and $B_S$. Rate function $\rho$ (the paper's $\alpha$); $\alpha$ only for physical norm rates, with $\rho(v)=2\alpha v$ the energy form. Trajectory residual introduced as $H_V(\xi)$ (matching `trajectories-as-samples`) and identified with Boffi's $h(\xi,V)$, which the later lessons use. $\gamma$ a fixed positive margin, $\delta$ a failure probability, natural $\log$. Worst-case absolute $\mathfrak R_n$ redefined at use. In `boffi-thm-4-4`, $K$ is the feature count (as in the source's B.3 and `kernels-random-features`); Lemma 4.1's universal constant is written $K_{4.1}$ there. Paper's coefficient density $\alpha(\theta)$ rewritten via $\beta=\alpha/\nu$ as in `kernels-random-features`.

## Per-station work

### learning-certificates (concept)
Objective: write a trajectory residual and test training feasibility. Reader tasks: compute the residual and trajectory residual of a candidate; decide feasibility of (3.2) for a sample; explain why a fixed $\gamma$ fails near the equilibrium; read $\operatorname{err}$.
Taught: setting; residual (3.1) and Lyapunov residual with chain-rule reading; contraction residual named and deferred; **positivity separate** with non-example $V=x^2-1$ (residual $-x^2-1\le-1$ everywhere, even at $0$) and $V\equiv-1$; trajectory residual; problem (3.2) and empirical margin loss; testing feasibility of a candidate (grid caveat to `trajectories-as-samples`); (3.3) with three readings and holdout limit.
Worked: $\dot x=-x$, $V=x^2$, $\rho(v)=v$: $H_V(\xi)=-\xi^2e^{-2t_{\max}}$; annulus $1\le|\xi|\le2$, $t_{\max}=1$: worst $-0.135$ (feasible for $\gamma\le0.135$); uniform on $[-2,2]$, $\gamma=0.01$: threshold $0.272$, per-sample $0.864$, all-$n$ $0.054$ ($n=20$), $4.5\times10^{-7}$ ($n=100$); $[0,\infty)$ infeasible; $\operatorname{err}=0$ throughout. Class-wide obstruction derived: with $V\ge0$, $\|\nabla V\|\le B_{\nabla V}$, $\|f(x)\|\le L_f\|x\|$, $h\ge-B_{\nabla V}L_f\|x\|$. Relative margin of the Lab ($-0.1V$) contrasted. Nonnormal $A$: Lyapunov-equation $P$ gives residual matrix eigenvalues $-0.962,-0.738$ (err 0); $P=I$ gives $-5.96,+0.362$, bad directions $21.9^\circ$–$49.6^\circ$ (15.4%), $\operatorname{err}(I)\approx0.77$ for uniform direction, $T=[0,3]$ (7200 angles, dt 0.001). Kept `{{flow linear}}` with an accurate description and a predict question ($1-0.05^{1/20}\approx0.139$). Four solved exercises. Card rewritten (concise, distinct).
Introduced: $h$, $H_V$, (3.2), $\widehat R_n$, $\operatorname{err}$, $\gamma$. Consumed: $V$, $f$, $\xi$, $T$, flow, Lyapunov conditions, trajectory counting.

### certificate-classes (concept)
Objective: explain and bound the joint value/gradient norm. Reader tasks: compute $\|\cdot\|_{\mathcal V}$; reproduce $L_h$ for the Lyapunov residual; reproduce the mean-value lemma and the quadratic constants.
Taught: Assumption 4.1 (definition), joint norm, $\sin(mx)/m$ ($\|V_m\|_{\mathcal V}=1$ exactly, via $1-(1-1/m^2)\sin^2$); residual damage on $[0.5,1]$ (max perturbed residual $0.073$, $0.249$, $0.250$ for $m=10,100,1000$; change up to $0.94$–$0.996$); Assumption 4.2; $B_h$, $L_h$ (Lipschitz as explicit hypothesis); $L_h=\sup\sqrt{\|f\|^2+c^2}$ derivation; trajectory-residual lemma with proof; class (4.1), $L_g$, $L_{\nabla g}$, operator norm; mean-value lemma with full proof; $C^2$ implies Assumption 4.2 (with $\theta_2=0$).
Worked: quadratic $k=3$: $L_g=\sqrt{3/2}B_S^2$, $L_{\nabla g}=\sqrt6B_S$, $B_V$, $B_{\nabla V}$; numbers at $B_S=2.03$, $B_\theta=2$: $5.05$, $4.97$, $10.09$, $9.94$; check $\max_{\|\theta\|=1}\|P_\theta\|=\sqrt{3/2}$ (sampled); nearby-certificate check $0.578\le1.00$; shared system $\|A\|=3.70$, $L_h\le7.52$, $B_h\le76.8$. Failures: $\dot x=x$ (no compact $S$), unbounded parameters, $|x-\theta|$ (distance $\ge2$ for any distinct parameters). Four solved exercises.
Introduced: $\|\cdot\|_{\mathcal V}$, $B_V$, $B_{\nabla V}$, $B_h$, $L_h$, $L_g$, $L_{\nabla g}$. Consumed: residual, $S$.

### boffi-lemma-4-1 (result) — carry-over L3-8 closed on the lemma station
Objective: apply the fast-margin interface and list its premises. Reader tasks: state the lemma exactly; distinguish the three convention changes; substitute $\mathfrak R_n^2\le3C/n$; check a protocol against the premises.
Taught: objects recalled; worst-case absolute $\mathfrak R_n$ redefined with the three differences from the signed empirical convention and the single-function example; **exact printed statement** (factor $2$, $\log(\log(4B_h/\gamma)/\delta)$, $K$ universal); well-definedness ($B_h\ge\gamma$); "any solution" reading; provenance (Srebro–Sridharan–Tewari Thm 5, not checked, not proved by paper or atlas) and agreement with `margin-bounds`' general-class reading (atlas's own); mechanism (finite zero-error, variance, ramp) labeled as explanation, not proof; recipe; premises with where each enters; the lemma does not need a zero-residual member.
Worked: leading $3KC\log^3n/(\gamma^2n)$; $\log^3n/n=0.330,0.220,0.143$ at $1000,2000,4000$ (doubling factor $0.666$, quadrupling $0.433$); quadratic instance $C=(24I\cdot151)^2\approx2.39\times10^7$, leading $K\cdot7.2\times10^9\log^3n/n$ at $\gamma=0.1$ (consistent with pilot's $C\cdot6.8\times10^6$ times $(24I)^2$); confidence numerator $\le10.2$. **Theorem forms** $B_h$ vs $4B_h$: $7.46$ vs $2.63$ ($B_h/\gamma=2,\delta=0.05$); $1.38$ vs $-0.80$ ($1.5$, $0.9$); undefined at $B_h=\gamma$. Time-sample inflation ($\log^3n/n$ $1.34\to0.069$, $19.5\times$). Finite-class non-example ($N=16$: lemma lead $228$ vs zero-error $0.0058$). Four solved exercises (incl. crossing near $2\times10^7$; premise audit; $\mathfrak R_2=\tfrac12$).

### boffi-thm-4-3 (result)
Objective: compare entry counting with structured matrix entropy. Reader tasks: reproduce the operator-norm Lipschitz bound; explain both entropy regimes and the split; compute 55 vs 53 vs leading 10; explain why the Lab is not an instance.
Taught: class (4.3), built-in positivity, zero member $Q=0$, entry count with $\sqrt2$-scaled coordinates ($\|\theta\|=\|Q\|_F$); printed statement and four remarks; proof Steps 1–6 (Lipschitz $\Lambda=B_m^2+2B_{Dm}B_m$; transfer to the $d^2$-dimensional Frobenius ball in operator norm, external centers → factor 2 / constant 48; volume and dual-Sudakov regimes; split integral with integration by parts and the balance argument for $a=1/\sqrt d$; Dudley from $Q=0$; Lemma 4.1). Shown that Theorem 4.2 on the same class has the same constant ($L_g=B_m^2$, $L_{\nabla g}\le2B_{Dm}B_m$), so only the dimension factor differs.
Worked: ten monomials of degree $\le3$ in the plane: $k=55$ vs $d\log^2d=53.0$; unit disk $B_m=2.00$, $B_{Dm}=3.74$, $\Lambda=19.0$ (printed factor $11.5$); radius 2: $9.22$, $12.69$, $319$; with $c=1$: crossing $u\approx0.21$, split parts $5.34+3.64=8.98$, best $8.72$, volume-only $13.5$, entry-count volume $10.0$. Lab section: $P\succeq I$ with no radius; default demo $\|P\|_F\approx1.72$ (engine: seed 1, $n=4$); post-hoc radius invalid; repairs (fixed $B_Q$ constraint, grid of radii); $\|P\|_F\ge\sqrt d$; Lab metric class differs. Four solved exercises ($d=6$: 21 vs 19.3; constant monomial forces first row zero, $d=9$: 45 vs 43.5; split at $1/d$; post-hoc radius).

### boffi-thm-4-4 (result)
Objective: trace joint feature approximation and its independent failure event. Reader tasks: explain why the dictionary is drawn independently; reproduce the feature count, the $\gamma/8$ transfer, the shift and event inclusion; list every error term; audit a dictionary protocol.
Taught: class (4.5) via $\beta$, $B_V=B_\alpha$, $B_{\nabla V}=B_\alpha B_\theta L_\phi$; **printed statement with correct $\kappa$** (the baseline lesson had dropped the $B_\alpha^2L_h^2/\gamma^2$ factor on the $p$ term); reading: $1/\gamma^4$, $\log^4n/n$. Proof Steps 1–9: p.22 obstruction; independent dictionary; Lemma B.1 recalled with proof structure; explicit derivation of the paper's $K$ ($\Gamma$, $n\ge3$, $c=(16\sqrt2(1+\sqrt2))^2\approx2.98\times10^3$), $K=O(\kappa)$; transfer $\le\gamma/8$ (source $\gamma/4$), (B.8); shift $\tilde h$, margin $\gamma/2$, bound $B_h+\gamma/4$, event inclusion; Lemma 4.1 on the conditional fixed class; $\ell_1$-ball complexity; shift offset $\gamma/(4\sqrt n)$ and its absorption via $\gamma\le L_hB_\alpha(1+B_\theta L_\phi)$; confidence term $\log(8B_h/\gamma+2)\le3.33\log(1+B_h/\gamma)$ for $B_h\ge\gamma$, absorbed for $\delta\le\tfrac12$; failure event read over data alone.
Worked: cosine features $w\sim U[-1,1]$, $b\sim U[-\pi,\pi]$, $\dot x=-x$, $1\le|\xi|\le2$, $T=[0,0.5]$, $S=[-2,2]$; pure decrease residual ($L_h=2$, $B_h\le13.19$); member $V=-\sin x/x$ ($B_\alpha=2$; $V+1$ positive definite with the same residual); max residual $-0.118$ at $|x|=0.607$ → feasible with $\gamma=0.1$; $\kappa\approx3.09\times10^6$, leading coefficient $\approx3.0\times10^{10}$ at $n=1000$; proof's feature count $K\ge7.2\times10^9$ (gradient), $9.3\times10^7$ (value) at $a=0.0044$, $\delta_f=10^{-6}$. Dictionary section: drawn-first (direct fixed-class application) vs changed-after-fitting (void), $W$ change alters $\nu$; repairs ($M$ declared dictionaries, $+2\log M$; fresh trajectories). Bounded-density non-example $\beta=2\cos b\,|w|^{-1/4}$ ($\mathbb E\beta^2=4$, $\sup=\infty$). Five solved exercises.

### boffi-thm-4-2 (pilot; consistency-only)
Two pointer sentences added: in "The setting, recalled", that `learning-certificates` and `certificate-classes` develop the formulation and the norm/constants; in Step 1, that `boffi-lemma-4-1` discusses premises, convention and the printed confidence term. **No change of mathematical meaning.** No setting text was removed (the pilot's local recall remains complete; trimming it is optional coordinator work). Notation and the recalled Lemma 4.1 already match the new lessons exactly (factor 2, $4B_h$, $\rho$, $h(\xi,V)$, zero-residual member, 24/48).

## Source discrepancies and added hypotheses (for the mathematical reviewer)

1. Lemma 4.1 vs Theorems 4.2–4.4 confidence terms ($2\log(\log(4B_h/\gamma)/\delta)$ vs $\log(\log(B_h/\gamma)/\delta)$ vs $\log(\log(1+B_h/\gamma)/\delta)$): not equivalent for small $B_h/\gamma$ (numbers above). Recorded in `boffi-lemma-4-1` §confidence and in each theorem.
2. Theorem 4.3 prints $B_m^2+B_{Dm}B_m$; Appendix B.2 derives $B_m^2+2B_{Dm}B_m$ (absorbed, factor $\le2$).
3. Theorem 4.3's $d\log^2d$ is degenerate at $d=1,2$; the lesson reads it for $d\ge3$ (or $\log d\to1+\log d$).
4. Theorem 4.3's matrix cover uses external centers; constant $48$ (or scale factor 2) rather than $24$; absorbed.
5. Theorem 4.4: Lemma B.1 gives probability $1-2\delta_f$, so $\delta_f=1/n^2$ yields $2/n^2$, not $1/n^2$ (or use $\delta_f=1/(2n^2)$).
6. Theorem 4.4: the residual transfer gives $\gamma/8$; the source records $\gamma/4$ (harmless).
7. Theorem 4.4: the shifted residual lacks a zero member; extra $\gamma/(4\sqrt n)$ in absolute complexity, absorbed by the atlas's argument (zero member $V\equiv0$ + feasibility ⇒ $\gamma\le L_hB_\alpha(1+B_\theta L_\phi)$). Atlas observation, not in the source (also noted in `kernels-random-features`).
8. Theorem 4.4: derived confidence numerator $2\log(\log(8B_h/\gamma+2)/\delta)$ vs printed $\log(\log(1+B_h/\gamma)/\delta)$; equivalent up to $O(1)$ only when $\log(\log(1+B_h/\gamma)/\delta)$ is bounded below (e.g. $\delta\le\tfrac12$).
9. Theorem 4.4: the paper's p.23 step adds $1/n^2$ to the error under the joint data-feature measure; the atlas reads the conclusion as probability $\ge1-\delta-2/n^2$ over the data alone (Fubini argument given). **Flag for renewed math review.**
10. Theorem 4.4 baseline lesson had $\kappa$ wrong (missing $B_\alpha^2L_h^2/\gamma^2$ on the $p$ term); corrected to the printed form (verified on rendered p.7 and text extraction).
11. Hypotheses carried: zero-residual member (pilot L3-1, automatic for (4.3) and for $V\equiv0$ in (4.5)); Lipschitz residual as explicit hypothesis; $n\ge3$ in the $K$ derivation.
12. The worked example of Theorem 4.4 uses the pure decrease residual $h=\nabla V^{\mathsf T}\dot x$ (allowed by (3.1), not §3.1.1's Lyapunov residual); labeled in the lesson. All worked examples that illustrate a theorem satisfy its premises and show the check (learning-certificates annulus; thm-4-4 feasibility $-0.118\le-0.1$); thm-4-3's ten-monomial case is constant/dimension bookkeeping (no feasibility claimed).

## Checks actually run (final hashes below)

- `python build.py`: 140 stations, 0 warnings.
- Strict KaTeX scan (`tmp/m16-p4b-katex-scan.js`, `throwOnError`): 0 errors (learning-certificates 286 segments, certificate-classes 296, boffi-lemma-4-1 259, boffi-thm-4-3 324, boffi-thm-4-4 371, boffi-thm-4-2 561).
- File check (`tmp/m16-phase5a-refcheck.py`): every `\ref` resolves within its Textbook, no `\ref` in Cards, no control characters, no kind word before `\ref`, no fused macros.
- `node tools/m16-lesson-check.js chrome --quick --parts=18` (Chrome 155.0.8059.85, 390px, light, answers exposed): 20 views, 0 errors, 0 external requests. (One overflow in thm-4-4 was found and fixed by splitting into `aligned`.)
- `git diff --check -- content/18-certificates/`: clean.
- Calculations: `tmp/m16-phase5a-calculations.py` (numpy only; scipy not installed, so small local quadrature/bisection helpers) prints every number quoted above; Lab numbers from `lab/flows.js` via Node.
- Not run (out of scope for writers): full browser sweep, Edge, `node --test`, guarantees checks, screenshots.

## Final raw SHA-256 (Git Bash `sha256sum`)

- `content/18-certificates/learning-certificates.md` `0f811201dcd2f93ea002e4560264d701b2ac926fd97986a9748354f069f5faeb`
- `content/18-certificates/certificate-classes.md` `5fe77b1ded922c5273fe2b15c467d781bf34fdf7c068fd8a8f8baea6d6acc7fe`
- `content/18-certificates/boffi-lemma-4-1.md` `3457177043745d6703e74b5b7612385904f339634af7d87a33485fd329132f62`
- `content/18-certificates/boffi-thm-4-3.md` `7407b7813171df90b0325ac1e87c09baaa551e78cc59e71bd976a1513caa9b26`
- `content/18-certificates/boffi-thm-4-4.md` `05caabba98940061ba8121e6b9d81116180606681a34435fc673ff18c820b065`
- `content/18-certificates/boffi-thm-4-2.md` `223c63e00ce08c8032892843e9390d5bca9f704ad9dbbe44818ad641a3a838e4` (pointer sentences only)

## Requested shared changes (coordinator)

1. `kernels-random-features` (Part 17, accepted): §"Draw the dictionary before the data" says the feature event has probability at most $1/n^2$; Lemma B.1 as stated gives $2/n^2$ (item 5). Optionally point to `boffi-thm-4-4` Step 9 for the over-data reading.
2. L3-8: `boffi-lemma-4-1` now states the printed factor $2$ and $4B_h$; `margin-bounds`' pointer ("states the fast-margin lemma as the interface for certificates") is now accurate. No Part 17 edit required unless the coordinator wants a pointer to §confidence.
3. Optional: trim duplicated setting/lemma text in the pilot now that `learning-certificates` and `certificate-classes` develop it (not done; would need renewed review only if meaning changes).
4. No prerequisite, route or notation.toml change requested. `learning-certificates` links `comparison-functions` and `boffi-thm-5-2` inline as non-required links.

## Review dispositions

The mathematical review (P5-M) has not reported yet. Its 12 flags above are still open for it.

## Beginner patch

Source: `docs/m16/beginner-phase5.md` (reviewer-P5B), reviewed at the draft hashes above. All findings were minor. I changed no mathematical meaning; every edit is wording, notation or an added computed fact.

| ID | File | Disposition |
| --- | --- | --- |
| B5-1 | learning-certificates | Fixed. In #setting I added a sentence on the convention. Here $T$ names the interval, as in the paper. [[trajectories-as-samples]] writes $T$ for the endpoint, so its "$T=1$" is our $t_{\max}=1$. |
| B5-2 | learning-certificates | Fixed. The answer in #experiment no longer says "radius". It now says the Lab's fit "has no fixed bound on the size of $P$, which the class-based theorems need ([[boffi-thm-4-3]])". |
| B5-3 | certificate-classes | Fixed. The mixed-derivative matrix is renamed $M\to G(x,\theta)$ in its definition, the operator-norm sentence, the proof of lem-param ($G(s)$) and ex-quadratic ($G(x)$, $GG^{\mathsf T}$). One clause notes that Part 16 reserves $M$ for a contraction metric. |
| B5-4 | certificate-classes | Fixed. Exercise 3 now asks "how close must two parameters be for lem-param to guarantee…". The answer adds that $0.0136$ is sufficient, not maximal. |
| B5-5 | boffi-lemma-4-1 | Fixed. ex-interface now defines $I=\int_0^1\sqrt{\log(1+2/u)}\,du$ inline. It says $I$ and the zero-residual hypothesis are derived in Step 5 of [[boffi-thm-4-2]] and are taken as given here. |
| B5-6 | boffi-thm-4-3 | Fixed. In Step 1, $J$ is replaced by $Dm$, explicitly "the feature Jacobian (not the Jacobian of $f$)". |
| B5-7 | boffi-thm-4-4 | Fixed. The answer to Exercise 5 now gives the member's actual largest slope on $[-2,2]$: about $0.87$, near $2x\approx2.08$. So $7.45$ is loose by about $8.5\times$ and $4$ by about $4.6\times$. Computed numerically: $0.8724$ at $u=2.0816$. |
| B5-8 | boffi-thm-4-4 | Fixed in part. The numeric constant is renamed $c\to c_0$ in Step 3 and the Card proof sketch, with a note that the paper writes $c$. A clause now says $\nu$ is the feature distribution, not the uniform measure of [[boffi-thm-5-1]]. I declined the optional rename of $a$. It is defined locally in each station ($\gamma/(8\sqrt2L_h)$ here, a split point in 4.3), and renaming it would also touch the matching names in `kernels-random-features`. |

New raw SHA-256 after the patch:

- `learning-certificates.md`: `0b6efa0644eb37bf1b248631a242d10c949377eb2660d0cc4d74f224a27429a9`
- `certificate-classes.md`: `344efbd79911eb0138866127066850841a1500154653f8d62d1ba2eb2170f5e2`
- `boffi-lemma-4-1.md`: `7e87e66a35ff4c5a301cf167a88d5c1321026f4bebaed05ffe763b3187fe1935`
- `boffi-thm-4-3.md`: `7874c6e7db0d2bd52aff359104e5c02686acb1159d191a5cb42c81c93d040d7f`
- `boffi-thm-4-4.md`: `3b18751045fbc0b0d9cd6c67f7880a22eff869ffe3602aae4455b6d3c5dac583`
- `boffi-thm-4-2.md` (pilot): unchanged at `223c63e00ce08c8032892843e9390d5bca9f704ad9dbbe44818ad641a3a838e4`

Checks run at these hashes:

- `python build.py`: 140 stations, 0 warnings.
- Strict KaTeX scan: 0 errors (292, 299, 259, 325 and 383 segments).
- Refcheck on all six files: every `\ref` resolves; no control characters, kind words or fused macros.
- `node tools/m16-lesson-check.js chrome --quick --parts=18`: 20 views, 0 errors, 0 external requests.
- `git diff --check`: clean.

## Math patch

Source: `docs/m16/math-phase5.md` (reviewer-P5M). All five stations and the pilot diff pass, and discrepancies D1–D12 are confirmed. Two of them change status:

- D4 is confirmed, and M5-3 corrects two loose sentences that went with it.
- D7 is confirmed: the atlas reading is valid, and the paper's route has a gap.

The open findings were minor. The only changes are corrected sentences and renamed symbols; no bound or derivation changed.

| ID | File | Disposition |
| --- | --- | --- |
| M5-3 | boffi-thm-4-3 | Fixed. (a) "Among $d\ge3$, the ratio first reaches $2$ at $d=73$". I added that at $d=2$ the ratio is $3.12$ only because the printed factor is degenerate. (b) #failure now says: within $10\%$ for $6\le d\le10$; for $d=3$ to $5$ the printed factor is $14$ to $40\%$ smaller than $k$ ($3.6$ against $6$ at $d=3$); degenerate at $d=1,2$. Numbers rechecked: $d\log^2d/k=0.603$, $0.769$, $0.863$ for $d=3$, $4$, $5$; $0.917$ to $0.964$ for $d=6$ to $10$. The ratio is $1.996$ at $72$ and $2.010$ at $73$. |
| M5-4 | boffi-thm-4-4 | Fixed. Step 9 no longer presents the two readings as equally valid. The atlas reading is complete. The paper's p.23 form adds $1/n^2$ inside a joint probability while keeping $1-\delta$. Read literally, that step has a gap: Lemma 4.1's good event depends on the dictionary, so an extra averaging argument, such as Markov over the dictionary, would be needed. The "Reading the bound" sentence on the $1/n^2$ term now points to Step 9. The lesson is consistent with the coordinator's `kernels-random-features` wording: $2\delta=2/n^2$, with the factor $2$ and how the term enters left to `boffi-thm-4-4`. |
| M5-8 | boffi-lemma-4-1 | Fixed. In `ex-interface` and the Card, the class-dependent constant is renamed $C\to C_{\mathcal V}$. One sentence says it depends on the class, its region and its residual but not on $n$, and that it is not the universal $C$ of `boffi-thm-4-2`. |
| M5-8 | boffi-thm-4-2 (pilot) | Fixed, under the coordinator's authorization as a consistency-only edit. In the proof of `lem-param`, $M(s)\to G(s)$, with a parenthesis matching `certificate-classes`. **No change of mathematical meaning.** The generic "for a matrix $M$" in the operator-norm definition of #setting is unchanged; it is not the mixed matrix. |

New raw SHA-256:

- `learning-certificates.md`: `0b6efa0644eb37bf1b248631a242d10c949377eb2660d0cc4d74f224a27429a9` (unchanged)
- `certificate-classes.md`: `344efbd79911eb0138866127066850841a1500154653f8d62d1ba2eb2170f5e2` (unchanged)
- `boffi-lemma-4-1.md`: `c2a13ed54888c845f0cde5a2b6e7f170c12871a725e943ec1b567bacb1b868d1`
- `boffi-thm-4-3.md`: `672ef036b02f5175153d7ebb5db28ccfd9b08d324c074f691c406ba4ca78fde6`
- `boffi-thm-4-4.md`: `b5b5b20ad05898f104b79acc7c33071a832a7a582ffee0d1f1cd1799c175391e`
- `boffi-thm-4-2.md`: `98de2abec1b8bdb6f7f24b44a7320f0aee61782bcbeb59fb220ae96fb19774d9`

Checks run at these hashes:

- `python build.py`: 140 stations, 0 warnings.
- Strict KaTeX scan: 0 errors (292, 299, 262, 339, 388 and 563 segments).
- Refcheck: clean on all six files.
- `node tools/m16-lesson-check.js chrome --quick --parts=18`: 20 views, 0 errors, 0 external requests.
- `git diff --check`: clean.
