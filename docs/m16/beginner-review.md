# M16 Phase 1 pilot — independent beginner review (B1)

## Identity, role and scope

- Reviewer: **B1**, independent beginner reviewer (agent). I did not author any of the reviewed material.
- Date: 2026-10-19.
- Persona: knows basic differentiation, vectors, matrix multiplication, elementary probability and introductory RL. Has **not** studied ODE theory, Lyapunov methods, uniform convergence or complexity bounds. Reads in route order using only the declared material.
- Evidence status: these are **agent perspectives, not student evidence**. A pass below means that this agent, simulating the persona, could do the task from the text. It does not show that real beginners can do it. I avoided using outside knowledge when I judged whether a step is reproducible. Where I needed outside knowledge, the table says so.
- I did not read `docs/m16/writer-*.md`, `docs/m16/pilot-review.md` or any handoff before writing these conclusions.
- I edited only this file. Nothing was committed.

## Candidate hashes (raw SHA-256, verified at start, all match the assignment)

| File | SHA-256 |
| --- | --- |
| `content/15-dynamics/lyapunov-functions.md` | `6c9dcd34ae47949e83c8e210816e1f60cc3c27a94d57e74b58d971590ba3e75b` |
| `content/17-learning-theory/rademacher-complexity.md` | `1f52aee078da43f29b37a9a5c0db6e1ebc0d31afd32921bac8fb72873c397050` |
| `content/18-certificates/boffi-thm-4-2.md` | `b24bc2cb1211be9fcc12b1811f0cd743eabb15dfbd44d209cdb62ef3cf308368` |

## What I read, in order

1. Guidance: `AGENTS.md`, `.agents/skills/atlas-writing/SKILL.md`, `references/rewrite-workflow.md`, `references/upstream/rigorous-explainer/references/pedagogy-checklist.md`. From `docs/m16/route-contract.md`, I read the "Audience…", "Routes and pilot prerequisite closure" and "Minimum Phase 1 supporting work" sections, plus the per-station entries for `stability`, `lyapunov-functions`, `rademacher-complexity` and `boffi-thm-4-2`.
2. `lyapunov-functions.md`: Story, then the Textbook top to bottom, then the Card. I attempted every example and exercise before reading its solution.
3. `rademacher-complexity.md`: Textbook, then Card. Same protocol.
4. `boffi-thm-4-2.md`: Textbook, then Card. Same protocol.
5. Only after attempting the reader tasks from the pilot text, I read the Textbook sections of the declared prerequisites. The goal was to test the local-bridge claim: `dynamical-systems`, `stability`, `risk-erm`, `uniform-convergence`, `concentration`, `finite-classes`, `covering-dudley`, `margin-bounds`, `trajectories-as-samples`, `learning-certificates`, `certificate-classes` and `boffi-lemma-4-1`. Note that `controller-or-certificate.md` is in `content/15-dynamics/`, not in `content/18-certificates/` as the assignment packet says. It was not needed.
6. Numerical spot checks with Python 3.12 stdlib:
   - Nonnormal trajectory peak: 1.00772 at t ≈ 0.143.
   - Maximum transient growth over all directions: 1.0119.
   - Entropy integral: I = 1.35258, and 24I = 32.46.
   - Hand recomputation of every closed-form exercise answer, the Lyapunov-equation solution, the eigenvalues of P, ‖A‖ ≈ 3.702 and the quadratic-class constants.
   - All agree with the text. I did **not** re-run the Lab engine, so I did not verify the Rademacher demo table.

## Reader-task outcomes

| Task | Outcome | Passage used | Help needed / notes |
| --- | --- | --- | --- |
| A1. Lyapunov derivative from the lesson | **Pass** | L1 `#lie-derivative` (scalar example); L1 `#nonnormal` check at (0.8, 0.6) | None. Before reading on, I reproduced V̇₀ = 0.16 and V̇ = −1.0. |
| A2. Lyapunov derivative, own system | **Pass** | L1 `#lie-derivative`, `#rates`, `#assumptions` | ẋ = −x³ with V = x²: I got V̇ = −2x⁴ and global asymptotic stability, and found that no c₃ works. This matches exercise 5. Own 2-D system A = [[−1, 1], [0, −1]] with V = ‖x‖²: V̇ = −2x₁² + 2x₁x₂ − 2x₂² = −‖x‖² − (x₁ − x₂)² ≤ −‖x‖², so c₃ = 1, energy rate 1 and norm rate ½. I avoided eigenvalues by completing the square. The lesson's own route for c₁ and c₂ needs eigenvalues (finding 2). |
| A3. Why positivity and decrease support the conclusion | **Pass** | L1 `#reasoning` (trapping lemma, proofs of parts 1 and 2) | I could restate the chain: sphere minimum m_r → trapped set Ω_c → monotone v(t) → uniform decrease on a compact shell → V → 0 → state → 0. One implicit step is noted in finding 3. |
| A4. Stability versus attraction | **Pass** | L1 `#setting` (definition, decay versus rotation), `#failures` | None. |
| A5. Energy rate to norm rate | **Pass** | L1 `#rates`, exercise 3, Card check 3 | Exercise 3 before reading the solution: energy rate ½, norm rate ¼, prefactor 2. Correct. |
| A6. Discrete-time check | **Pass** | L1 `#discrete`, Euler exercise | Before the solution I got ΔV = h(h − 2)x², so V decreases for 0 < h < 2. Correct. |
| B1. Tiny random-sign example | **Pass** | L2 `#toy` | Enumerated 1, 0, 0, 1 → ½ before reading the table. Exercises "Enumeration" (½ and 1) and "More points" (½ and 3/8) were also correct. |
| B2. Order of supremum and expectation | **Pass** | L2 `#statement` (three-stage game, remark), exercise "Order of operations" | None. |
| B3. Linear-ball bound BR/√n | **Pass** | L2 `#reasoning`, Steps 1–5 | Cauchy–Schwarz is stated inline. Jensen is derived from Var ≥ 0. Cross-term cancellation is shown. I reproduced the bound without notes. |
| C1. Parameter cover → value-and-derivative cover → complexity → margin bound | **Pass with help** | L3 `#reasoning`, Steps 1–6 | The mechanical chain is followable. Two notions are never defined anywhere in the route: "Lipschitz constant" (finding 7), which I inferred from the form of Lemma 4.3, and "induced operator norm" together with "squared operator norm = largest eigenvalue of MMᵀ" (finding 8). Without outside knowledge the persona cannot reproduce the gradient half of `lem-param` or L_∇g in `#example`. Dudley and Lemma 4.1 are used as black boxes, as declared. |
| C2. Where each assumption enters | **Pass** | L3 `#assumptions`, the remark after `lem-residual`, exercise 1 | None. |
| C3. What the k/n rate means and does not mean | **Pass with help** | L3 "Reading the bound", "Two cautions", exercise 2 | I could read off the dependencies and the "not calibrated, not everywhere-validity" cautions. To understand **why** zero training error gives 1/n instead of 1/√n, I had to open `finite-classes.md`, whose (1 − ε)ⁿ argument L3 lacks (finding 13). Exercise 2's "roughly" answer confused me (finding 14). |
| C4. Why a fixed margin fails at the equilibrium | **Pass** (caveat) | L3 `#feasibility`, exercise 4 | The argument is clear. With T = [0, ∞), the "max over t" in the definition does not exist for a residual that approaches 0 from below, so the solution's "maximum … at least 0" needs sup (finding 9). |

## Findings

Severity: **critical** blocks a mainline reader task or is wrong. **Moderate** means a beginner is likely to get stuck or be misled, and the issue needs a fix before acceptance. **Minor** is polish. No critical findings.

| # | Lesson / passage | Severity | Diagnosis | Suggested repair | Disposition/recheck |
| --- | --- | --- | --- | --- | --- |
| 1 | **Cross-lesson notation** (L1 Euler exercise "steps of size h"; L1 `#discrete` index k; L1 `#setting` "δ"; L2 `#motivation` "hypothesis h", "risk R(h)"; L2 `#reasoning` "data radius R"; L3 `#setting` h(x,ẋ,V,∇V) and h(ξ,V); L3 Lemma 4.1 "ε₁,…,ε_n are independent signs" and Step 4/5 "ε-cover", "dε"; L3 φ written `\varphi` while L1 and the contract use `\phi`) | Moderate | Several symbols change meaning across the three pilot lessons, and some change meaning inside one lesson. **Inside L3**, ε is both the Rademacher signs (Lemma 4.1) and the cover scale (Steps 4–5), about forty lines apart. **Inside L2**, R is both the risk R(h) and the data radius R, beside 𝔯R̂. h means an Euler step (L1), a hypothesis (L2), and both a pointwise and a trajectory residual (L3). k is a time index in L1 and the parameter count in L3. δ is a stability radius in L1 and a failure probability in L2 and L3. φ_t renders differently in L1 (ϕ) and L3 (φ). The overload of h in L3 follows the paper and is flagged. The others are not, and a beginner will try to match symbols between lessons. | In L3, use σ for the signs (as L2 does) with a note "the paper writes ε", or rename the cover scale. Use `\phi` in L3. Rename the Euler step in L1 (e.g. Δt). Rename the L2 risk to avoid R, or add a disambiguating sentence. In L3, say explicitly that h(ξ,V) is a new function of (ξ,V) built from the pointwise h (the contract's H_V(ξ) is one option). Note at L1 `#setting` that δ is a stability radius, not the later confidence parameter. | **Closed (rechecked), with residue in new finding N3.** L1 now uses Δt and the index j, and notes that δ is a radius. L2 uses g for hypotheses and explains the R/risk choice. L3 uses σ for the signs, \phi, and calls h(ξ,V) a new function. |
| 2 | L1 `#nonnormal`: "For a symmetric matrix, xᵀPx lies between the smallest and largest eigenvalue times ‖x‖² (write x in an orthonormal basis of eigenvectors)". Also "Its eigenvectors … are not orthogonal; … AAᵀ ≠ AᵀA … nonnormal", and `#assumptions`/`#scope`: "P positive definite" | Minor | The persona's audience list does not include eigenvalues. The bounds c₁ and c₂ for the recurring example rest on a spectral fact given in one parenthesis. A "positive definite matrix" is never defined; only positive definite *functions* are. The link between nonnormality and transient growth is asserted rather than explained. A beginner can still do A1–A6, because every reader task avoids this. | Add a 3–4 line bridge: eigenvalues of a 2×2 matrix via trace and determinant; the Rayleigh bound for symmetric P, with the 2×2 case done explicitly; "P is positive definite iff xᵀPx is a positive definite function". This bridge would also serve finding 8. | **Closed.** `#nonnormal` adds the trace/determinant eigenvalue formula, the Rayleigh bounds `rayleigh`, a positive definite matrix definition and the operator norm. |
| 3 | L1 `#reasoning`, proof of `lem-trap`: "The distance ‖φ_t(ξ)‖ changes continuously and starts strictly below r" | Minor | "Strictly below r" relies on the earlier remark that Ω_c does not touch the sphere, but the proof does not point back to it. A reader reading the proof alone wonders why ξ ∈ Ω_c (which allows ‖x‖ ≤ r) gives strict inequality. | Add "(because Ω_c does not touch the sphere)". | **Closed.** Line 126 now says "(because Ω_c does not touch the sphere)". |
| 4 | L1 `#assumptions`, `thm-global` "Proof idea" | Minor | The proof idea covers only attraction ("Steps 1–3 of the attraction proof"). Global asymptotic stability as defined in `def-stability` also needs stability. That follows from part 1 with U = ℝᵖ, but the text does not say so. | Add one clause: "stability is part 1 of Theorem \ref{thm-lyapunov} with U = ℝᵖ". | **Closed.** The `thm-global` proof idea now adds stability from part 1 with U = ℝᵖ. |
| 5 | L1 `#scope`: "proves global exponential stability with the stated constants" | Minor | The term "exponential stability" is never defined in the lesson. `#rates` derives the inequality but does not name it, and the term appears only in the compressed `stability.md`. | Name the property where `norm-rate` is derived: "a bound of this form, valid for all ξ in the region, is called exponential stability". | **Closed.** `#rates` defines exponential stability and global exponential stability, and shows that it implies asymptotic stability. |
| 6 | L1 `#discrete`: "The analogue of Theorem \ref{thm-lyapunov} holds for continuous g … We do not prove it here" | Minor (record only) | The deferral is explicit, which is good. The destination `[[time-dictionary]]` is compressed baseline. For the persona this is fine: task A's discrete check is fully supported by the worked map and the Euler exercise. | Record the deferred proof's destination in the coverage ledger for Phase 2. | **Open (record-only, not blocking).** Unchanged, as intended. Carry the deferred discrete-time proof to the Phase 2 `time-dictionary` ledger entry. **Final (Recheck 2):** open, record-only, deferred to Phase 2 `time-dictionary`. It does not block the pilot. |
| 7 | L3 `#setting`: "Two numbers describe how h behaves on the relevant region, where x ∈ S, \|V\| ≤ B_V and ‖∇V‖ ≤ B_∇V: B_h bounds \|h\|, and L_h is a Lipschitz constant of h in the stacked pair (V, ∇V)" | **Moderate** | (a) "Lipschitz constant" is used here without definition and is load-bearing in Steps 2, 3 and 5 and in `#example`. No declared prerequisite defines it either: `certificate-classes.md` and `covering-dudley.md` use the word without defining it. The local bridge cannot rely on them. (b) B_V and B_∇V appear here for the first time with no source. Only in `#statement`, about 25 lines later, does the reader learn that they come from bounds on \|g\| and ‖∇ₓg‖ (Assumption 4.2). A beginner reaching this sentence cannot tell what "the relevant region" is. | Define it before first use: "h is L_h-Lipschitz in (V, ∇V) if \|h(x,ẋ,v₁,w₁) − h(x,ẋ,v₂,w₂)\| ≤ L_h‖(v₁−v₂, w₁−w₂)‖ for all arguments in the region". Give a scalar picture (slope bound). Introduce B_V and B_∇V as the bounds on \|g\| and ‖∇ₓg‖ over S × parameter ball, i.e. Assumption 4.2, at this point, and move the "both suprema are finite" sentence up. | **Closed.** `#setting` defines L-Lipschitz (with the chord/slope picture), introduces B_V and B_∇V as Assumption 4.2 before use, and says what h is Lipschitz in. |
| 8 | L3 `#statement`: "its norm is the induced operator norm"; L3 `#example`: "Its squared operator norm is the largest eigenvalue of 4[[‖x‖², x₁x₂], [x₁x₂, ‖x‖²]]"; and "‖A‖ ≈ 3.70" | **Moderate** | The route contract says operator norms are to be "define[d] … locally when first needed". The term is not defined in L3, L1 or any declared prerequisite. The gradient half of `lem-param` silently uses ‖Mv‖ ≤ ‖M‖‖v‖. The example uses "‖M‖² = λ_max(MMᵀ)" with no justification. The persona therefore cannot reproduce L_∇g = √6 B_S, which is the only worked calculation of a derivative-aware constant, or ‖A‖ ≈ 3.70. This is half of reader task C's "value-and-derivative cover". | Define ‖M‖ = max over ‖u‖ = 1 of ‖Mu‖, state ‖Mv‖ ≤ ‖M‖‖v‖, and give a one-line reason that ‖M‖² = λ_max(MᵀM) (= λ_max(MMᵀ)) for the 2×2/2×3 case, or point to a bridge added under finding 2. Optionally show ‖A‖² = 7 + √45 for the shared matrix. | **Closed**, with polish in N4. Operator norm is defined in L3 `#setting` and L1 `#nonnormal`. The gradient half of `lem-param` now shows ‖M(s)Δθ‖ ≤ ‖M(s)‖‖Δθ‖. ‖A‖ = √(7+√45) is shown. |
| 9 | L3 `traj-residual`: "h(ξ,V) = max over t ∈ T …" with "T = [0, t_max] or [0, ∞)"; `lem-residual` proof uses max_t; exercise 4 solution: "the maximum over t is at least 0 for every P" | **Moderate** | L2 `#motivation` explicitly teaches the difference between sup and max, using the example "(−1,1) has supremum 1 but no maximum". L3 then uses max over an unbounded interval. In the equilibrium-failure argument, the residual along a convergent trajectory can be strictly negative at every finite t and tend to 0. The maximum then does not exist, and its supremum is 0. A careful reader following L2's lesson finds that the key exercise's answer refers to an object that does not exist. This argument is reader task C4. | Use sup over t ∈ T in `traj-residual`, `lem-residual` and exercise 4 (the `lem-residual` proof already mixes max and sup). Add one sentence: "on a compact T and with continuous residuals the sup is a max". | **Closed in the Textbook.** `traj-residual`, `lem-residual` and exercise 4 now use sup, with a max/sup note. The Card proof sketch step 3 still says "maximum over time" (N5). |
| 10 | L3 `#question`: "satisfies a decrease inequality … at every recorded time of every recorded trajectory", versus `def-problem`: "the residual is at most −γ at **every** time of every sampled trajectory" (max over the continuum T) | **Moderate** | The opening question frames feasibility as a check at *recorded* (finitely many) times. The theorem's premise is a check at every t in a continuous interval. L1 `#scope` insists that finitely many checks prove nothing. A beginner is left unsure whether a solver that satisfies the inequality on a time grid meets the theorem's premise. It does not, and L3 never says so. `trajectories-as-samples.md` mentions the grid gap and a Lipschitz-in-time repair, but in compressed form. | Make the opening consistent ("along every recorded trajectory, at all times"). In `#assumptions`, add a bullet: a time grid checks only finitely many times, so the premise needs either a continuous-time verification or a grid margin with a time-Lipschitz bound. Link `[[trajectories-as-samples]]` there. | **Closed.** The opening now says "at all times along every recorded trajectory". `#assumptions` adds an "all times, not recorded times" bullet linking `trajectories-as-samples`. |
| 11 | L2 `#assumptions` ("The linear calculation passes this test … 𝔯_n(F_B) ≤ BR/√n") → L3 `#reasoning`, Steps 4–5, and L3 `#example` (g = θᵀm(x), linear in θ) | **Moderate** | L2 ends by presenting the linear-ball bound as one that satisfies Lemma 4.1's convention. L3's worked class is linear in θ, and with ρ(v) = cv its pointwise residual θᵀ(Dm(x)ẋ + c·m(x)) is linear in θ too. A beginner who has just learned L2 will try to apply BR/√n directly, without logarithms, and will wonder why L3 needs covers and Dudley. L3 never says why the linear-ball bound does not apply: the trajectory residual is a **max over time** of linear functions, so it is not linear in θ, and general g is nonlinear in θ. This gap risks a misconception, and it disconnects the pilot's two foundational lessons. | Add a short paragraph at the start of L3 Step 4: "Why not the linear-ball bound of [[rademacher-complexity]]?" Explain the max-over-time obstruction and the general nonlinear g, and say that covers handle both. | **Closed.** A "Why not the linear-ball bound?" paragraph was added before Step 4. |
| 12 | L3 `lem-fast` (recalled Lemma 4.1) second term "2 log(log(4B_h/γ)/δ)/n", versus prerequisite `boffi-lemma-4-1.md` `#statement`: B_n = log(log(4B_h/γ)/δ)/n (no factor 2), and versus L3 `bound`: log(log(B_h/γ)/δ)/n | Minor (beginner); refer to the mathematical reviewer | Three versions of the confidence term appear on the route. The remark in L3 explains the 4B_h versus B_h discrepancy but not the factor 2 versus the prerequisite file. "This is \ref{bound} with the constants collected" (Step 6) cannot be reproduced for the second term. When B_h/γ ≤ e, log(B_h/γ) ≤ 1 and the theorem's printed form log(log(B_h/γ)/δ) can be negative or undefined, whereas the lemma's form stays positive. A beginner comparing the files will not know which statement to trust. | The mathematical reviewer should decide the source-correct factor. Make the prerequisite file and L3 agree, or note the discrepancy in both. In Step 6, say explicitly that the second term is not literally reproduced, and point to the remark. | **Partly closed.** The lesson remark now explains the factor 2 (absorbed in C) and the 4B_h versus B_h difference, including the possibly negative theorem form. Step 6 now says only the first term is reproduced. **Still open:** `boffi-lemma-4-1.md` (no factor 2) conflicts with the L3 recall, pending the math reviewer's source decision. **Final (Recheck 2):** the pilot part is closed. M1's source decision confirms that L3's recall of Lemma 4.1 (factor 2, 4B_h) matches the source, and the remark now also covers the B_h = γ case. The prerequisite part stays open as math-review L3-8, deferred to the rollout of `boffi-lemma-4-1.md`. That file is outside the pilot. |
| 13 | L3 `#reasoning`, Step 1: "Fast-rate results for zero-error learning with a margin then apply … we recall its statement and do not reprove it"; "Reading the bound": "This is a fast rate" | Minor | The black box itself is allowed by the contract. Still, the pilot gives no intuition for *why* zero training error lets the bound charge the square of the complexity. I found the intuition only in the compressed `finite-classes.md`: a rule with error ε survives n samples with probability (1 − ε)ⁿ ≤ e^{−nε}, so the error is about log(\|H\|/δ)/n. Without it, "k/n instead of √(k/n)" is something to memorize, not something understood. | Add 2–3 lines recalling the finite-class realizable argument as the simplest instance of the fast rate, with the caveat that Lemma 4.1 is the margin/continuous-class analogue and is not proved here. | **Closed.** Step 1 now recalls the finite-class (1−ε)ⁿ argument and its relation to Lemma 4.1. |
| 14 | L3 exercise 2: "why 'roughly'?" solution: "'Roughly' because the bound holds only up to the universal constant. The ratio of two bounds is meaningful…" | Minor | The explanation contradicts itself. With everything fixed, the constant cancels in the ratio, so it cannot be why the answer is "rough". The computed ratio 0.433 and the value 0.017 are correct. A beginner who did the exercise correctly is left confused about what "roughly" refers to. | Say that the ratio of the leading terms is exact (0.433); the answer is rounded; and the *bound* itself, not the ratio, is uncalibrated because C is unknown. Optionally note that the second term scales as 1/n, not as log³n/n. | **Closed.** The solution now says the constant cancels in the ratio; "roughly" refers to rounding and the 1/n second term. |
| 15 | L3 `#reasoning`, Step 5: "The paper's form of Dudley's inequality ([[covering-dudley]]; Boffi et al., (B.1), p.6) bounds …" | Minor | Dudley's inequality is recalled and applied correctly, and I could follow the substitution, the cutoff at u = 1 and I ≈ 1.3526 (verified). However, the text does not say that its proof is deferred. The linked destination `covering-dudley.md` is a one-sentence compressed station that only repeats the formula, so it would not have helped. The workflow requires that any deferred argument be identified along with where it is developed. | State "we use Dudley's inequality without proof". Add one sentence of chaining intuition (approximate at scales 1, ½, ¼, …; each refinement costs √(log N)/√n). Record that `covering-dudley` must develop it in Phase 4. | **Closed**, with polish in N6. It now says "We use it without proof; its development belongs to [[covering-dudley]]" and adds chaining intuition. |
| 16 | L3 `#example` and the paragraph after it ("Every quantity in the leading term is now explicit except C") | Minor | The worked example computes L_g, L_∇g and a bound on L_h, but it never assembles B_θ²(L_g + L_∇g)²L_h²·k for one concrete choice of B_θ, c and S. It also never connects to L1's certificate P = [[½, ½], [½, 1]] (θ = (½, ½, 1), ‖θ‖ ≈ 1.22) or to L1's transient growth factor 1.012, which determines S for the shared matrix. The prescribed "worked calculation" stops short of a number the reader can interpret. | Pick B_S = 2, B_θ = 2 and ρ(v) = 2αv with α = 0.1, then compute the leading-term factor. Note that the L1 certificate lies in the ball, and that S for initial states in a disk of radius r is contained in the disk of radius ≈ 1.012r. | **Closed, but the new text introduces N1 (moderate) and N2.** A full assembly was added (B_S = 2.03, B_θ = 2, α = 0.1, γ = 0.1), and it links the L1 certificate and the 1.012 growth factor. I recomputed L_g ≈ 5.05, L_∇g ≈ 4.97, L_h ≈ 7.52, the product ≈ 151 and the factor ≈ 6.8×10⁴; all agree. |
| 17 | L3 `#feasibility` second paragraph: "It fits with decrease rate α + 0.05 and tests at rate α"; L3 `lyap-residual` with ρ | Minor | L1 `#rates` sets an atlas rule: "Always say which rate a number refers to", with α a norm rate and V̇ ≤ −2αV its energy form. L3 says "decrease rate α + 0.05" without saying whether it is a norm rate or an energy rate. L3 also never connects ρ(v) = cv to α (c = 2α for a norm rate α). L1's figure caption (`fig-flow`) makes the same Lab statement correctly. | Write "norm rate α + 0.05 (energy form V̇ ≤ −2(α + 0.05)V)". In the `#example` L_h paragraph, add "ρ(v) = 2αv corresponds to norm rate α (see [[lyapunov-functions]])". | **Closed.** `#setting` adds ρ(v) = 2αv ↔ norm rate α. `#feasibility` now says "norm rate α + 0.05, that is V̇ ≤ −2(α+0.05)V". |
| 18 | L3 "Reading the bound": "A smaller margin costs 1/γ²" | Minor | An obvious beginner question goes unanswered: why not scale V up so that γ becomes large? `margin-bounds.md` answers it in compressed form ("Scaling a certificate also scales its complexity"). L3 does not. For a linear ρ, scaling V by s scales the residual, the margin and B_θ together, so B_θ/γ is invariant. | Add one sentence explaining the scale invariance of B_θL_h/γ (with L_h fixed for linear ρ). | **Closed.** "Reading the bound" adds the scaling-invariance argument for linear ρ. I checked it: L_h is unchanged and B_h scales with γ. |
| 19 | L3 Step 1: "the empirical risk (1/n)Σᵢ **1**{h(ξᵢ,V) > −γ} is zero"; Theorem and exercise "log³n", ∫√log(1/u) = √π/2 | Minor | The indicator **1**{·} is not defined. L3 writes "log" while L2 writes "ln", and the √π/2 value requires the natural logarithm. | Define the indicator inline. State "log is the natural logarithm" once, or use ln consistently with L2. | **Closed.** The indicator is defined in Step 1. `#setting` says "Logarithms are natural". |
| 20 | L3 `thm-main` hypotheses: "Assume Assumption 4.1 and the class \ref{class}" | Minor | The bound uses B_h and L_h, but finiteness of these quantities and the Lipschitz property of h are not listed among the theorem's hypotheses. They appear only as a loose "on the relevant region" in `#setting` and in the Card's assumptions list. A reader checking "where each assumption enters" (task C2) has to assemble the premises from three places. | Add "h bounded by B_h and L_h-Lipschitz in (V, ∇V) on the region of Assumption 4.2" to the theorem box. | **Closed.** The `thm-main` box now lists the B_h bound and the L_h-Lipschitz property. |
| 21 | L3 `#reasoning`, Step 2: "Two certificates that are close in value can have very different gradients" | Minor | This is asserted without an example. The declared prerequisite `certificate-classes.md` has the ideal one-liner (V_m = sin(mx)/m → 0 uniformly while \|V_m′\| reaches 1). It did help me, but the pilot is supposed to make that file unnecessary. | Copy the sin(mx)/m example inline. | **Closed.** Step 2 now includes the sin(mx)/m example. |
| 22 | L2 `#symmetrization`, bullet "High probability": "That proof applies McDiarmid's inequality from [[concentration]] …; we recall the statement and do not reprove it here" | Minor | The phrase "we recall the statement" is ambiguous. McDiarmid's inequality itself is not stated in L2; only the SSBD Theorem 26.5 conclusion is. This is off the mainline for task B. | Change to "we recall Theorem 26.5's statement; McDiarmid's inequality is stated in [[concentration]]", or state McDiarmid in one line. | **Closed.** The bullet now says "We recall only Theorem 26.5's statement… McDiarmid's inequality, which is stated in [[concentration]]". |
| 23 | L2 `#symmetrization`, bullet "Absolute values": "Running the four steps with \|·\| around each average gives …" | Minor | A beginner cannot run Steps 2 and 4 with absolute values without two facts the text does not mention: \|E X\| ≤ E\|X\| and \|a + b\| ≤ \|a\| + \|b\| under the supremum. Since L3 uses the absolute convention, this bullet is the bridge to L3's complexity. | Name the two facts in the bullet. | **Closed.** The bullet now names \|E X\| ≤ E\|X\| and the triangle inequality. |
| 24 | L2 `#experiment` table (demo readouts, exact values, standard errors) | Minor (record only) | I did not re-run the engine. The theoretical columns (1/√n) are correct, and the qualitative claims (each readout below both bounds, halving per ×4) are consistent with the listed numbers. Numerical verification belongs to another reviewer. | None from B1. The numerical reviewer should confirm the exact and readout columns. | **Open (deferred to the math/numerical reviewer by the coordinator).** It is outside B1's role. **Final (Recheck 2):** closed. Math review M1 reproduced every column with the engine, and the SE column was refined. I rechecked the 1.5-SE and "0.68 at n = 4" statements. |

### Card checks (all three lessons)

- L1 Card: a distinct concise reference. Its check-yourself items (x − x³, 0.9-map, rate 0.8 → 0.4) differ from the Textbook exercises, and all are correct. It is consistent with the Textbook on the rate halving, the nonnormal constants and ΔV versus ∇Vᵀg. No findings.
- L2 Card: distinct and consistent with the Textbook (toy value ½, square 1, single function 0 versus ½, conventions ordering, n = 400 → 0.05). No findings.
- L3 Card: distinct and consistent with the Textbook (statement, Lemma 4.1 with the factor 2, constants √(3/2)B_S² and √6B_S, I ≈ 1.35, feasibility caveat). It inherits findings 9 (step 3's "maximum over time"), 12 (log form) and 19 (log base). No separate finding.

## Prerequisite-closure test (route contract "local bridges" claim)

| Place | Needed a prerequisite file? | Would the prerequisite have helped? |
| --- | --- | --- |
| L1 flows, equilibrium, stability, existence/continuation | No. `#setting` recalls everything used. | `stability.md` / `dynamical-systems.md` add nothing L1 lacks. They mention "exponential stability", which L1 uses but does not name (finding 5). |
| L1 spectral facts (finding 2) | Not available. | No. No declared prerequisite covers eigenvalues or positive definite matrices. |
| L2 sample, loss class, ERM, uniform deviation | No. `#motivation` restates `risk-erm` and `uniform-convergence` fully. | No. Those files are strictly less informative. |
| L2 high-probability bullet (McDiarmid) | Off mainline. | `concentration.md` does state McDiarmid in one line, so yes, marginally. |
| L3 why zero error gives 1/n | **Yes**, I opened `finite-classes.md` (finding 13). | Yes. |
| L3 Lipschitz constant (finding 7) | Needed, not available. | **No.** No route file defines it. |
| L3 operator norm (finding 8) | Needed, not available. | **No.** |
| L3 Dudley's inequality (finding 15) | Used as recalled. | **No.** `covering-dudley.md` only repeats the formula. |
| L3 Lemma 4.1 | Used as recalled (per contract). | `boffi-lemma-4-1.md` **conflicts** with L3 on the factor 2 (finding 12); it hurt rather than helped. |
| L3 recorded times versus continuous T | Not consulted at first. | `trajectories-as-samples.md` has the grid caveat L3 lacks (finding 10). |
| L3 value versus gradient closeness | Not needed to follow the steps. | `certificate-classes.md` example helps (finding 21). |
| L3 margin scaling | Not needed to follow the steps. | `margin-bounds.md` answers the scaling question (finding 18). |

Conclusion: the claim holds for L1 and L2. For L3 it holds **only partly**. Two notions on the main path (Lipschitz constant and operator norm) have no bridge anywhere on the route, and for three intuitions the compressed prerequisites are currently better than the pilot.

## Checked passages with no findings

- L1 Story steps 0–150: consistent with the Textbook. The peak distance 1.0077 at t ≈ 0.14 and the "close to the origin after three seconds" framing are labelled as illustration.
- L1 `#motivation`: the motivating obstacle (no closed-form solution; finitely many simulations) is concrete, and the energy analogy is tied back to the formal properties.
- L1 `#setting`: open set, compactness, the existence and continuation fact (cited and deferred explicitly), and `def-stability` with the quantifier-order explanation. In `ex-two-systems`, the rotation solution checks by differentiation.
- L1 `#lie-derivative`: gradient, `def-posdef`, and the chain-rule derivation with each term identified. `ex-scalar-lie` is cross-checked against the exact solution.
- L1 `#statement` and `#reasoning`: theorem statement, the m_r and Ω_c construction, the unbounded-sublevel counterexample, proof of part 1, proof of part 2 Steps 1–3, and the summary of where compactness and strictness enter. All steps are reproducible apart from finding 3.
- L1 `#rates`: Steps 1–3 and the energy-versus-norm paragraph. Scalar check: equality case confirmed.
- L1 `#nonnormal`: eigenvectors, the V̇₀ computation (0.16), λ_max(A + Aᵀ) = −3 + √10, the exact trajectory formula, the Lyapunov-equation entries, P, the completed square, the eigenvalues of P, the radii 0.874 and 2.288, the rates 0.764, 0.382 and 2.618, the t = 1 values 0.319 and 0.718 against the bounds 0.540 and 1.787, and the 1.012 maximum growth. All were recomputed and agree.
- L1 `#failures`: the rotation, the damped oscillator (V̇ = −2x₂², eigenvalues −½ ± i√3/2), V = −x², and the unbounded sublevel set.
- L1 `#discrete`: the g(x) = x/2 example and the common mistake ∇Vᵀg.
- L1 `#experiment` and `#scope`: finite-evidence limits are stated, along with the non-uniqueness of certificates and the distinction between V and v_π.
- L1 exercises 1–6: all attempted before reading the solutions and all correct, including the exact solution ξ/√(1 + 2ξ²t).
- L2 `#motivation`: the memorizing class example (Pf_A = 1, P_nf_A = 0), the 2ε ERM decomposition, and sup versus max.
- L2 `def-signs`, `def-rad`, the three-stage game, the remark on the swapped order, and the memorizing-class score ½.
- L2 `#toy`: the table, the richer square class (value 1), and the single-function contrast between signed and absolute.
- L2 `thm-sym` proof Steps 1–4: I could reproduce each step, including the swap argument with a fixed s followed by averaging.
- L2 `#reasoning` `thm-linear` Steps 1–5: Cauchy–Schwarz with its equality case, Jensen via variance, cross-term cancellation and the radius step. Also "What the rate means", the back-check against the toy example (0.707 versus 0.5, with the loss located in Step 3), and the orthonormal equality case.
- L2 `#assumptions`: the conventions table, the ordering proofs (a ≤ a′ ≤ c, b ≤ c), the symmetric-class equality, and why Lemma 4.1 needs convention (c).
- L2 exercises 1–6 and the Lab prediction question: all attempted first. Values ½ and 1; ½ and 3/8; 0 versus ½; n ≥ 3600 and 0.2; 0.707 and 0.5; the conventions answer. All correct.
- L3 `#question` (apart from finding 10), `def-reach`, `def-problem` with the two layers of probability clearly separated, and the γ-is-not-discount note.
- L3 "Reading the bound" and "Two cautions": the dependence on n, k and γ, the unknown C, and violation probability versus validity everywhere.
- L3 `lem-param` value half; `lem-residual` max-perturbation argument; `lem-volume` packing proof and its 1-D check; Step 5 cover transfer N(ε; 𝒱) ≤ N(ε/L; 𝔹ᵏ), the substitution, the u = 1 cutoff and its necessity; Step 6 squaring.
- L3 `#example` value constant: ‖m‖² = ‖x‖⁴ + 2x₁²x₂² ≤ (3/2)‖x‖⁴, attained at \|x₁\| = \|x₂\|. B_S = 2 gives 4.90 and 4.90.
- L3 `#feasibility`: the uniform-smallness argument near 0, infeasibility with probability tending to 1, and the relative versus fixed margin distinction (apart from findings 9 and 17).
- L3 `#assumptions`: each bullet names where it enters.
- L3 exercises 1, 3, 4 and 5: attempted first and correct. ∫₀¹√log(1/u) du = √π/2, and the attainment point (r, r)/√2.

## Summary counts

| Lesson | Critical | Moderate | Minor |
| --- | --- | --- | --- |
| L1 `lyapunov-functions` | 0 | 0 | 5 (2, 3, 4, 5, 6) |
| L2 `rademacher-complexity` | 0 | 0 | 3 (22, 23, 24) |
| L3 `boffi-thm-4-2` | 0 | 5 (7, 8, 9, 10, 11) | 10 (12–21) |
| Cross-lesson notation | 0 | 1 (1) | 0 |

**Totals: 0 critical, 6 moderate, 18 minor.**

## Recheck (B1, 2026-10-19, after writer patches)

The coordinator relayed the patched candidates. I verified the raw SHA-256 of each before reading:

| File | SHA-256 (verified, matches the coordinator's message) |
| --- | --- |
| `content/15-dynamics/lyapunov-functions.md` | `234bf79145ecf6b297781c6255a49f18f00431faddac4bf39543d093d3379659` |
| `content/17-learning-theory/rademacher-complexity.md` | `8c81cea6ec772f44d272a8642a2293f87fe3daadca23331f9190e7b3a10d9014` |
| `content/18-certificates/boffi-thm-4-2.md` | `d92f38ee75807d8a71e3dd84f80d238bd27be979ce7dd8fbcdd014f6f17d9213` |

Scope of the recheck:
- I re-read the whole Textbook and Card of `boffi-thm-4-2`.
- In `lyapunov-functions`, I re-read `#setting` (`def-stability` and the δ note), `#reasoning` (trapping proof), `#rates` (exponential-stability definition), all of `#nonnormal` (eigenvalue, Rayleigh and operator-norm bridge), the `thm-global` proof idea, `#discrete`, the Euler exercise and the Card discrete-time items.
- In `rademacher-complexity`, I re-read `#motivation` (class, two averages, the R/h notes) and the "Absolute values" and "High probability" bullets in `#symmetrization`. I checked the L2 Card for consistency.
- I recomputed the new numbers: ‖A‖² = 7 + √45 ≈ 13.708; the assembled constants 5.05, 4.97, 7.52, ≈151 and ≈6.8×10⁴; and the leading-term crossover (below).
- I did not read writer reports or handoffs.

### Reader tasks re-attempted from the patched text

| Task | Outcome | Notes |
| --- | --- | --- |
| C1. Parameter cover → value-and-derivative cover → complexity → margin bound | **Pass** (was: pass with help) | Lipschitz and operator norm are now defined before use, in L3 `#setting` with the bridge in L1 `#nonnormal`. I reproduced both halves of `lem-param`, `lem-residual` (sup form), the cover transfer and the integral, and the constant L_∇g = √6·B_S. One small gap remains: the step λ_max(MᵀM) = λ_max(MMᵀ), used for the 2×3 mixed matrix, is asserted in both lessons. A beginner can avoid it by computing the 3×3 matrix MᵀM instead (N4). Dudley and Lemma 4.1 remain declared black boxes, as allowed. |
| C3. What the k/n rate means and does not mean | **Pass** (was: pass with help) | The fast-rate intuition is now local (Step 1, finite-class (1−ε)ⁿ). I did not open `finite-classes.md`. Scaling invariance, the corrected exercise 2 and the assembled example ("not a usable sample size") make the scope of the rate concrete. |

Tasks A, B, C2 and C4 were not re-run in full. Their passages were touched only by the patches checked above, and C4's sup issue (finding 9) is fixed in the Textbook.

### New findings introduced by the patches

| # | Lesson / passage | Severity | Diagnosis | Suggested repair | Disposition/recheck |
| --- | --- | --- | --- | --- | --- |
| N1 | L3 `#example`, "one complete assembly for the shared system": "Initial states lie in the disk of radius 2 … Residual ρ(v) = 2αv … With a margin γ = 0.1" | **Moderate** | The assembly applies the theorem to exactly the setting that the next section, `#feasibility`, shows makes the premise fail. Initial states lie in a disk that contains the equilibrium, with a Lyapunov residual and a fixed margin γ. As n grows, samples near 0 make (3.2) infeasible. With T unspecified (and [0,∞) allowed), every convergent trajectory already breaks the margin. A beginner reads this as a valid worked instance, then reads one section later that the premise fails. That contradicts reader task C4. | Restrict the assembly to a setting where the premise can hold, and say so. For example, take initial states in an annulus r₀ ≤ ‖ξ‖ ≤ 2 and a finite horizon t_max, chosen so that trajectories stay outside a ball around 0. For the L1 certificate with c = 0.2, the pointwise residual is ≤ −0.738‖x‖², so γ = 0.1 needs ‖x‖ ≥ 0.37 along every sampled segment. Alternatively, label the assembly explicitly as constant bookkeeping only and point to `#feasibility`. | **Closed (Recheck 2).** The assembly now uses 𝒟 on the annulus 1 ≤ ‖ξ‖ ≤ 2 with T = [0, 0.32] fixed in advance, and adds a feasibility bullet. It says the paper's maximal T would make the example infeasible. I recomputed min σ_min(e^{At}) on [0, 0.32] = 0.3797 ≥ 0.37, giving residual ≤ −0.738·0.3797² ≈ −0.106 ≤ −0.1. |
| N2 | L3 `#example`: "this exceeds 1 until n is in the billions" | Minor | With the stated factor 6.8×10⁶ (γ = 0.1), 6.8×10⁶·ln³n/n first drops below 1 at n ≈ 1.1×10¹¹. At n = 10⁹ it is about 61, and at n = 10¹⁰ about 8.3. "In the billions" understates this by about 100×. The qualitative point stands. | Write "until n is about 10¹¹ (a hundred billion)". | **Closed (Recheck 2).** The text now says "until n is about 10¹¹", which matches my crossover of n ≈ 1.1×10¹¹. |
| N3 | Notation after the renames: L2 `#motivation` "each hypothesis g from the hypothesis class G"; L1 `#discrete` x_{j+1} = g(x_j); L3 `class` g(·,θ). L3 Step 1: "A fixed rule whose true error probability is ε", right after `lem-fast` says "reserve ε for cover scales". L3 uses M for matrices (`#setting`, `lem-param` M(s)) and also for the number of picks in `lem-volume`. L3 also uses c for an unspecified constant ("𝔯_n(𝒱)² ≤ c B_θ²…") and for the slope ρ(v) = cv. | Minor | Renaming h to g in L2 moved the collision. g now means a discrete map (L1), a hypothesis (L2) and the certificate parameterization (L3), and L2's note claims to avoid the Part 18 clash. The ε reuse in Step 1 contradicts the sentence that reserves ε, just above it. | Use another letter for hypotheses in L2 (e.g. q, or keep h and add a one-line note) and say "Part 18 uses g for the parameterization". Use p_err or η for the error probability in L3 Step 1. Rename the pick count, e.g. to N_pick. Write the unspecified constant as c′ or C₀. | **Closed (Recheck 2).** L2 hypotheses now use ψ/Ψ, with a note. L3 uses q for the error probability, J for the pick count and c₀ for the unspecified constant. L1's g (discrete map) and L3's g (parameterization) still share a letter, but they sit in different Parts and never meet in one argument, so I accept it. |
| N4 | L3 `#setting`: "…which equals the largest eigenvalue of MMᵀ (the symmetric-matrix facts and this example are worked in [[lyapunov-functions]], §7)" | Minor | (a) λ_max(MᵀM) = λ_max(MMᵀ) is asserted. L1 `#nonnormal` proves only ‖M‖² = λ_max(MᵀM). L3 `#example` relies on the MMᵀ form for the 2×3 matrix. (b) "§7" is a hard-coded number. The source headings are unnumbered, and I could not confirm that the renderer numbers them. "This example" has no clear referent. | (a) Add one line: if MᵀMu = λu with λ ≠ 0, then MMᵀ(Mu) = λMu, so the nonzero eigenvalues agree. (b) Link the anchor (`[[lyapunov-functions#nonnormal]]` or its equivalent), and name "the operator norm of A". | **Closed (Recheck 2).** L3 `#setting` now proves that MᵀM and MMᵀ share their nonzero eigenvalues. The hard-coded "§7" is gone (it now reads "worked in [[lyapunov-functions]]"). |
| N5 | L3 Card, Proof sketch step 3: "because a maximum over time moves by at most the largest pointwise change" | Minor | The Textbook now uses sup over T (finding 9). The Card's Intuition says "supremum", but step 3 still says "maximum". | Change to "a supremum over time". | **Closed (Recheck 2).** Card proof step 3 now says "a supremum over time". |
| N6 | L3 Step 5 chaining intuition: "A finite class of N functions has complexity of order √(log N)/√n" | Minor | This finite-class Rademacher bound (Massart's lemma) appears neither in L2 nor in the route's developed material. Labelled as intuition it does no harm, but it reads as a recalled fact. | Add "(a standard finite-class bound, Massart's lemma; not proved here)", or point to where the rollout will develop it. | **Closed (Recheck 2).** The text now says "(Massart's finite-class lemma, also recalled without proof; with absolute values, replace N by 2N)". |

### Status after recheck

| Lesson | Original findings still open | New open findings |
| --- | --- | --- |
| L1 `lyapunov-functions` | #6 (record-only, deferred to the Phase 2 ledger; not blocking) | none |
| L2 `rademacher-complexity` | #24 (deferred to the math/numerical reviewer) | none |
| L3 `boffi-thm-4-2` | #12, prerequisite-file part only (awaiting the math reviewer's source decision) | N1 (moderate); N2, N4, N5, N6 (minor) |
| Cross-lesson | none (#1 closed) | N3 (minor) |

Gate-1 view from B1: L1 and L2 have no open comprehension findings at moderate or above. L3 has one open moderate finding (N1), and per the workflow it must be closed before acceptance. The other open items are minor or belong to other reviewers.

## Recheck 2 (B1, 2026-10-19, final beginner recheck)

This section supersedes the "Status after recheck" table above.

### Candidate (raw SHA-256 verified before reading)

| File | SHA-256 |
| --- | --- |
| `content/15-dynamics/lyapunov-functions.md` | `199abd2ca520923195bbaec538c34f461062dab8fad9dddb03def9450eae8029` |
| `content/17-learning-theory/rademacher-complexity.md` | `a95c06b57e77a573fcce0562e4962582d371802d02fe0e845a2199b94fb1b0b0` |
| `content/18-certificates/boffi-thm-4-2.md` | `c400dd0a625baaf733b130916da809fdd11252dff40f4e901721ab07bb0f4bda` |

All three match the coordinator's message. Note for the coordinator: the "Recheck 1" table in `docs/m16/math-review.md` records L3 as `da13aa3e…`, not `c400dd0a…`. L3 changed after the math recheck; the change appears to be the R-1/R-2 polish, now present in the text. The math reviewer's pass therefore does not cover this exact L3 hash.

### What I reread

- **L3:** the whole Textbook and Card. This covers `#setting` (fixed-horizon adaptation, Lipschitz/operator-norm bridge with the MMᵀ proof, B_h/L_h hypothesis note), `#statement` (the new zero-residual hypothesis and its labelling), Step 1 (q, δ fixed), Step 5 (Massart, chaining from a reference, the (B.1) locator) and both remarks (the constant-certificate counterexample; second-term discrepancy), `#example` (annulus assembly and feasibility bullet), `#feasibility`, `#assumptions`, the exercises and all Card subsections.
- **L1:** `#setting` (C¹ labelled as sufficient, local Lipschitz mentioned), the maximal-interval `lem-trap` proof, the `#nonnormal` exact and conservatively rounded rates, `#failures` ("cannot establish"), and the Card.
- **L2:** `#motivation` (ψ/Ψ hypotheses, R note), `#symmetrization` (f̃, d_i(f), multi-line Step 4, the three consequences), `#assumptions` (convention list, Lemma 4.1 locator) and `#experiment` (split tables).
- I read `docs/m16/math-review.md`, as now permitted, after re-attempting task C.

Numerical checks:
- min σ_min(e^{At}) on [0, 0.32] = 0.3797, so the residual is ≤ −0.106. Feasibility with γ = 0.1 holds.
- E\|σ₁+…+σ_n\|/n against √(2/(πn)): 0.375 vs 0.399 (n=4), 0.196 vs 0.199 (n=16), 0.0993 vs 0.0997 (n=64). "About" is fair.
- L1 conservative constants: 2.619 ≥ (3+√5)/2 and 0.381 ≤ (3−√5)/2.
- L2 demo prose: the largest exact-vs-readout gap is 1.54 SE (n = 8); readout/radius bound is 0.684 at n = 4 and 0.43–0.50 for n ≥ 8.

### Reader task C re-attempted on the final L3

| Part | Outcome | Notes |
| --- | --- | --- |
| C1. Parameter cover → value-and-derivative cover → complexity → margin bound | **Pass** | Every link is now locally supported: Lipschitz, operator norm and MᵀM/MMᵀ in `#setting`; `lem-param` (both halves); `lem-residual` (sup form); `lem-volume`; and the cover transfer. Chaining is explained relative to a reference member. I could say why the reference must have zero residual by recognising L2's single-function example (signed 0, absolute ½) in the remark. That cross-lesson link works well. Dudley's constant 24 and Lemma 4.1 remain declared black boxes. |
| C2. Where each assumption enters | **Pass with a note** (N8) | I could place every hypothesis, but the new zero-residual hypothesis is located only in the theorem box, the sentence after it, Step 5 and the Card. The Textbook's own "Assumptions and where they enter" list does not include it or the fixed-horizon adaptation. |
| C3. What the k/n rate means and does not mean | **Pass** | The fast-rate intuition (finite class, q), scaling invariance (for a linear-in-θ class and linear ρ), "scale of change, half the upper bound", unknown C, "about 10¹¹, not a usable sample size", and violation probability versus validity are all present. The remark makes clear that without a zero-residual member the extra B_h² log³n/(γ²n) term is still order 1/n and does not grow with k. |
| C4. Why a fixed margin fails at the equilibrium | **Pass** | `#feasibility` and exercise 4 (sup form) are clear. The worked example no longer contradicts them: it states that it uses a finite horizon and an annulus precisely so that the premise holds, and that the paper's maximal T would make it infeasible. |

### New findings from Recheck 2

| # | Lesson / passage | Severity | Diagnosis | Suggested repair | Disposition/recheck |
| --- | --- | --- | --- | --- | --- |
| N7 | L1 `#setting`: "Khalil assumes only that f is locally Lipschitz"; L1 Card assumptions: "local Lipschitz continuity is enough" | Minor | "Locally Lipschitz" is used in L1 before Lipschitz is defined anywhere on L1's route. The definition first appears in L3. The phrase is an aside about a weaker sufficient condition, so no inference depends on it. A beginner reading in route order meets an undefined term. | Add a parenthetical: "(on each small ball, \|f(x)−f(y)\| ≤ L‖x−y‖ for some L)". Or link forward to the L3 definition. | **Closed (Recheck 3).** L1 `#setting` now defines locally Lipschitz inline ("near each point there is a constant L with ‖f(x)−f(y)‖ ≤ L‖x−y‖ …; every continuously differentiable f has this property"). |
| N8 | L3 `#assumptions` ("Assumptions and where they enter") and `#example` | Minor | The section that maps each hypothesis to where it enters omits the two meaning-changing additions from the M1 repair. First, the zero-residual member, which enters at Step 5 (chaining reference) and otherwise adds a B_h²-term. Second, the fixed-horizon adaptation of T. The worked example also does not say that its class satisfies the zero-residual hypothesis (θ = 0 is in the ball of radius 2 and gives V ≡ 0, so it does). The theorem box is titled "Boffi et al., … Theorem 4.2" yet carries a hypothesis the paper lacks. The disclaimer sits only in the paragraph after the box. | Add a bullet to `#assumptions`: "Zero-residual member (this lesson's addition): enters at Step 5; without it add 2KB_h²log³n/(γ²n). Holds for linear-in-θ Lyapunov classes via θ = 0." Add a bullet on the fixed horizon. In the example, add "θ = 0 lies in the ball, so the zero-residual hypothesis holds". Consider retitling the box "… Theorem 4.2 (with one added hypothesis)". | **Closed (Recheck 3).** The theorem title now reads "…Theorem 4.2, with the zero-residual condition added". `#assumptions` has bullets for "A zero-residual member (added here)" (enters at Step 5; otherwise +B_h/√n and a B_h² log³n/(γ²n) term) and "Horizon fixed before the data". The `#example` Parameters bullet names θ = 0 (V ≡ 0, residual ρ(0) = 0) as the zero-residual member. |

### Final disposition summary (all findings)

| Finding | Final status |
| --- | --- |
| #1–#5, #7–#11, #13–#23 | Closed (Recheck 1), and still closed at the final hashes. I spot-checked the passages that M1-driven edits touched (L1 `#setting`, `lem-trap`, `#nonnormal` rates, `#failures`; L2 `#motivation`, `#symmetrization`; L3 Step 5 and the remarks). None regressed. |
| #6 | Open, record-only, deferred to Phase 2 `time-dictionary`. Not blocking. |
| #12 | Pilot part closed. Prerequisite `boffi-lemma-4-1.md` part deferred to rollout (math-review L3-8); outside the pilot. |
| #24 | Closed (math review M1 reproduced the table). |
| N1–N6 | Closed (Recheck 2). |
| N7, N8 | Open, minor. |

| Lesson | Open critical | Open moderate | Open minor |
| --- | --- | --- | --- |
| L1 `lyapunov-functions` | 0 | 0 | 2 (#6 deferred; N7) |
| L2 `rademacher-complexity` | 0 | 0 | 0 |
| L3 `boffi-thm-4-2` | 0 | 0 | 2 (#12 prerequisite part, outside the pilot; N8) |

**Gate-1 (Teaching) view from B1:**
- No comprehension findings at moderate or above remain open in the three pilot lessons at these hashes.
- From the final text, I completed every reader task: A1–A6, B1–B3 (passed at the first pass, with no regressions in the touched passages) and C1–C4, without needing any prerequisite file.
- This is an agent's simulated-beginner judgment, not evidence from real learners.

## Recheck 3 (B1, 2026-10-19, final confirmation)

**Final hashes covered by this review** (raw SHA-256, verified before reading):

| File | SHA-256 |
| --- | --- |
| `content/15-dynamics/lyapunov-functions.md` | `c29da439ff5ae7863910b01f0042398207d169f26870ea238c00eb833d86a4c9` |
| `content/17-learning-theory/rademacher-complexity.md` | `a95c06b57e77a573fcce0562e4962582d371802d02fe0e845a2199b94fb1b0b0` (unchanged since Recheck 2) |
| `content/18-certificates/boffi-thm-4-2.md` | `04ce6e410c299b5e4a9cbb7ca17fa46dd0576a2effc21d1235b808c57c6e8491` |

**Passages rechecked:**

- **L1:** `#setting`, where the aside now defines locally Lipschitz inline, and the Card assumptions bullet.
- **L3:** the `thm-main` title and hypothesis; the paragraph after the box; the two new `#assumptions` bullets; the `#example` Parameters bullet (θ = 0); the R-2 wording in "Reading the bound" ("scale of change … half of the upper bound 2B_θ(L_g + L_∇g) on any change"); the R-1 clause in the remark after Step 5 ("the constant of the first term doubles to 2K(24I)², which C absorbs"); and Card assumptions and proof step 5, which are consistent with the Textbook.

**Results:**

- The new text introduces no new undefined symbols and no contradictions. The new `#assumptions` bullet's "B_h/√n" and "B_h² log³n/(γ²n)" agree with the remark and the Card.
- Task C2 (where each assumption enters) is now a full **pass**: every hypothesis, including the lesson's addition and the horizon adaptation, appears in the assumption map. C1, C3 and C4 were unaffected and remain passes.
- N7 and N8 are closed.

**Final open items:**

- **#6:** record-only; deferred to Phase 2 `time-dictionary`.
- **#12:** the prerequisite `boffi-lemma-4-1.md` part only (math-review L3-8); outside the pilot and deferred to rollout.
- **Other findings:** none open at any severity in the three pilot lessons.

**Gate-1 view (B1):** pass at the hashes above, as an agent's simulated-beginner judgment, not evidence from real learners.
