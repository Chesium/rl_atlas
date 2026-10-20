# M16 Phase 1 pilot: mathematical and source review (M1)

- **Reviewer:** M1, independent mathematical/source reviewer (agent). I authored none of the reviewed material, and I am distinct from the beginner reviewer (B1). This is an agent review, not a human or proof-audit record.
- **Date:** 2026-10-19
- **Scope:** Story (where present), Textbook and Card of the three pilot lessons.
- **Read before conclusions:** AGENTS.md; `.agents/skills/atlas-writing/SKILL.md`; `references/rewrite-workflow.md`; `docs/m16/route-contract.md` (audience/notation section, pilot closure, the three station records); the primary sources. I did not read the writer reports, the handoffs or `beginner-review.md` before forming these findings. Afterwards I read only beginner-review findings #12 and #24, which were referred to me (dispositions are below).

## Candidate identity (raw SHA-256, verified before review)

| File | SHA-256 | Match |
| --- | --- | --- |
| `content/15-dynamics/lyapunov-functions.md` | `234bf79145ecf6b297781c6255a49f18f00431faddac4bf39543d093d3379659` | yes |
| `content/17-learning-theory/rademacher-complexity.md` | `8c81cea6ec772f44d272a8642a2293f87fe3daadca23331f9190e7b3a10d9014` | yes |
| `content/18-certificates/boffi-thm-4-2.md` | `92645251fe1000695c64234bb4b708bb353905c584fe8b197641c28247a31722` | yes |

I also read `content/18-certificates/boffi-lemma-4-1.md` (not under review; see finding L3-8).

## Sources consulted

All private copies were read locally. Nothing from them is reproduced here beyond short formula-level references.

| Source | Pages consulted (printed / PDF) | Content checked |
| --- | --- | --- |
| Khalil, *Nonlinear Systems*, 3rd ed., 2002 (`course/ese6180/khalil.pdf`) | p.94 / pdf 110 (Thm 3.3); p.112 / 128 (Def 4.1); p.114 / 130 (Thm 4.1) and pp.115–116 (proof); p.124 / 140 (Thm 4.2, radially unbounded V); p.128 / 144 (Thm 4.4 LaSalle, Cor 4.1); p.154 / 170 (Thm 4.10); p.182 / 198 (Exercise 4.8) | Statements, hypotheses (C¹ V, locally Lipschitz f, domain D), page locators |
| Shalev-Shwartz & Ben-David, *Understanding Machine Learning*, 2014 (`course/ese6180/learning.pdf`) | pp.326–328 / pdf 344–346 (definition (26.4), Lemma 26.2 and proof, Thm 26.3, McDiarmid Lemma 26.4, Thm 26.5); p.332 / 350 (Lemma 26.10) | Signed convention, symmetrization statement, constants of Thm 26.5(1), Lemma 26.10 form |
| Boffi et al., arXiv:2008.05952v2 (`course/ese6180/boffi-v2.pdf`) | p.4 (§3.1: X, T maximal interval, (3.1), (3.2), γ); p.5 ((3.3), §3.1.1 Lyapunov residual with class-K α); p.6 (Assumptions 4.1–4.2, B_h/L_h definition, h(ξ,V) as max over T, Lemma 4.1, R_n definition, ‖·‖_V, unnumbered Dudley estimate, (4.1)); p.7 (Thm 4.2, (4.2), L_g, L_∇g); p.18 (Appendix B preamble, **equation (B.1)**); p.19 (B.1 proof of Thm 4.2) | Rendered at 110–250 dpi and read as images, because the text extraction garbles the formulas |

## Checked scope

**Lesson 1 (`lyapunov-functions`).** Checked:
- the definitions of stability, attraction, asymptotic and global asymptotic stability, against Khalil Def 4.1;
- the existence and continuation recall, against Thm 3.3;
- the chain rule and Lie derivative;
- Theorem `thm-lyapunov`, against Khalil Thm 4.1, including hypotheses and domain;
- every step of `lem-trap`, the stability proof and Steps 1–3 of the attraction proof (extreme value theorem uses, the first-exit time, the choice of δ<r, uniform decrease on the shell);
- the unbounded-sublevel example and the global theorem, against Khalil Thm 4.2 and Exercise 4.8;
- the comparison and integrating-factor derivation and the energy/norm factor two;
- the full nonnormal example (Lyapunov equation algebra, eigenvalues, Rayleigh bounds, rates, the exact trajectory, the transient peak, ‖A‖, ‖e^{At}‖ growth);
- the failure cases (rotation, damped oscillator and LaSalle/Cor 4.1 locator, V=−x²);
- the discrete-time example;
- all 6 Textbook exercises and 4 Card questions;
- the Story claims against `app/js/flows.js` and `lab/flows.js`: 8 states uniform in the radius-2 disk from rng(1); RK4 with dt=0.02 for 150 steps (3 s); the ellipses are `F.lyapunov(A)` at levels 0.5, 1, 2, 4, 8;
- the `fig-flow` caption against `F.experiment`: seed 1, 4 training trajectories, 20 holdout trajectories, fit rate 0.15, test rate 0.1.

Not checked: the discrete-time Lyapunov analogue (explicitly deferred by the lesson); LaSalle's proof (explicitly deferred); the rendered Lab grid squares.

**Lesson 2 (`rademacher-complexity`).** Checked:
- the memorizing-class example;
- the definitions and the order of quantifiers;
- the sup-outside remark;
- the two-point table, the square, the singleton (signed and absolute);
- every step of the symmetrization proof (ghost sample, sup/average exchange, swap invariance, split), against SSBD Lemma 26.2;
- the absolute-value variant of symmetrization (re-derived independently; it is correct);
- the constants and hypotheses of Thm 26.5(1);
- every step of the linear-ball theorem, against Lemma 26.10;
- the equality cases (orthonormal points, equal points);
- the ordering of conventions (a) ≤ (a′) ≤ (c), (b) ≤ (c), and symmetric class ⇒ (a)=(a′);
- the Boffi worst-case absolute definition, against p.6;
- the Lab demo description, against `app/js/flows.js` lines 127–145;
- the complete demo table, recomputed with the engine's `RL.lab.rng(7)`;
- all 6 exercises and 3 Card questions.

Not checked: measurability claims beyond plausibility; the McDiarmid proof of Thm 26.5 (recalled, not derived in the lesson).

**Lesson 3 (`boffi-thm-4-2`).** Checked:
- the setting against pp.4–6, including the definition of T, Assumptions 4.1–4.2, the definitions of B_h and L_h, the residual (3.3) and the Lyapunov residual;
- the Theorem 4.2 statement against p.7, symbol by symbol;
- the recalled Lemma 4.1 against the rendered p.6 (factor 2, 4B_h, absolute worst-case R_n, "a solution" vs "any solution");
- the finite-class realizable argument;
- Lemma `lem-param` (FTC along segment, convexity, operator norm, √(a²+b²) ≤ a+b);
- Lemma `lem-residual` (sup-perturbation argument, use of S);
- the volume lemma (packing, disjoint u/2-balls, termination, N=1 for u ≥ 1) and the 1-D check;
- the cover transfer and change of variables;
- the finiteness of the entropy integral and its tail cutoff;
- the value of I;
- the applicability of (B.1) to the absolute worst-case convention (finding L3-1);
- the squaring/substitution;
- the 4B_h vs B_h remark;
- the quadratic-class constants (L_g, L_∇g, attainment);
- the Lipschitz constant L_h for the linear ρ, and ‖A‖;
- the complete assembly (stretch bounds, B_S, ‖θ‖, constants, 6.8×10⁴/6.8×10⁶, the ≈10¹¹ crossover, feasibility at −0.738‖x‖²);
- the fixed-margin infeasibility argument;
- the Lab relative-margin description against `lab/flows.js`;
- all 5 exercises and the Card.

Not checked: Srebro–Sridharan–Tewari Theorem 5 (not available locally; Lemma 4.1 is only "located"); Dudley's constant 24 (recalled from the source, not re-derived); Theorems 5.1 and 4.3 (referenced only).

## Numerical recomputation

My scripts: `C:\Users\chesi\AppData\Local\Temp\claude\C--C-rl-atlas\40ac566d-4011-4145-8e00-f14ff8c6b81f\scratchpad\m1\num.py` (Python 3.12 stdlib) and `C:\Users\chesi\AppData\Local\Temp\claude\C--C-rl-atlas\40ac566d-4011-4145-8e00-f14ff8c6b81f\scratchpad\m1\signs.js` (node, `require('./lab/node')`, reimplementing the demo loop with `RL.lab.rng(7)` and adding exact 2ⁿ enumeration).

| Lesson | Claim | Method | My output | Match |
| --- | --- | --- | --- | --- |
| L1 | AᵀP+PA=−I for P=[½,½;½,1] | matrix product | [[−1,0],[0,−1]] | yes |
| L1 | eig P=(3±√5)/4 ≈ 0.191, 1.309 | closed form | 0.190983, 1.309017 | yes |
| L1 | energy rate 3−√5 ≈ 0.764; α ≈ 0.382; prefactor 2.618 | c3/c2 etc. | 0.763932; 0.381966; 2.618034 | yes (see L1-1 on rounding direction) |
| L1 | λmax(A+Aᵀ)=−3+√10 ≈ 0.162; V̇₀(0.8,0.6)=0.16; Ax=(1,−1.2) | direct | 0.162278; 0.16; (1.0,−1.2) | yes |
| L1 | ∇V=(1.4,2.0), V̇=−1 at (0.8,0.6) | direct | (1.4,2.0), −1.0 | yes |
| L1 | trajectory x₁=0.8e^{−t}+1.8(e^{−t}−e^{−2t}) | solved the ODE by hand | x₁=2.6e^{−t}−1.8e^{−2t} (same) | yes |
| L1 | peak distance ≈1.0077 near t≈0.14 | grid t step 1e−4 | 1.007721 at t=0.1431 | yes |
| L1 | V(ξ)=1.16; at t=1 V=0.319, ‖x‖=0.718; bounds 0.540, 1.787 | exact solution | 1.16; 0.31858, 0.71749; 0.54036, 1.78686 | yes |
| L1 | ellipse c=1 radii 0.874 and 2.288 | √(c/λ) | 0.87403, 2.28825 | yes |
| L1 | max_t ‖e^{At}‖ ≈ 1.012 | closed-form e^{At}, SVD on a grid | 1.011929 at t≈0.223 | yes |
| L1 | AᵀA=[1,−3;−3,13], λmax=7+3√5 ≈ 13.708, ‖A‖ ≈ 3.702 | direct | 13.708204, 3.702459 | yes |
| L1 | damped oscillator eigenvalues −½±i√3/2 | quadratic formula | −0.5±0.866i | yes |
| L1 | exercises (V̇=−2V; Euler factors 0.25 and 2.25; x(t)=ξ/√(1+2ξ²t); 2e^{−t/4}; 0.81/0.9) | by hand | all as stated | yes |
| L1 | Story: 8 states in radius-2 disk, seed 1, RK4 0.02, 3 s, ellipses of P at 0.5…8 | read `lab/flows.js` `initial`, `trajectory`, `lyapunov`; `app/js/flows.js` scene and line 19 | as stated | yes |
| L2 | diagonal class: R̂₂=½; n=3: ½; n=4: 3/8 | 2ⁿ enumeration | 0.5, 0.5, 0.375 | yes |
| L2 | square: 1; singleton: signed 0, absolute ½ | enumeration | 1.0; 0.0, 0.5 | yes |
| L2 | two-function exercise: signed ½, absolute 1 | enumeration | 0.5, 1.0 | yes |
| L2 | n ≥ 3600 for 6/√n ≤ 0.1 | direct | 3600 | yes |
| L2 | demo table, readouts | node, engine rng(7), 400 draws | 0.3420, 0.1701, 0.1073, 0.0832, 0.0578, 0.0439 | yes |
| L2 | demo table, SE | sd/20 | 0.0110, 0.0061, 0.0038, 0.0030, 0.0022, 0.0016 | yes (0.0016 printed as 0.002) |
| L2 | demo table, exact (n ≤ 16) | 2ⁿ enumeration of (1/n)\|Σσᵢxᵢ\| | 0.3508, 0.1795, 0.1099 | yes |
| L2 | demo table, (1/n)√Σxᵢ² | direct | 0.4175, 0.2202, 0.1362, 0.0995, 0.0725, 0.0525 | yes |
| L2 | "within about 1.5 SE" | (exact−readout)/SE | 0.80, 1.54, 0.68 | yes |
| L2 | n=4 sample has three \|xᵢ\|>0.87 | printed sample | −0.977, −0.876, 0.954, 0.398 | yes |
| L3 | I=∫₀¹√log(1+2/u)du ≈ 1.3526; 24I ≈ 32.5 | midpoint rule, 2×10⁶ cells | 1.352581; 32.462 | yes |
| L3 | L_g=√1.5·B_S², L_∇g=√6·B_S, both attained | closed form plus 2×10⁵ random unit vectors | sup ‖m‖=1.224745, sup ‖M‖=2.449490 on the unit circle | yes |
| L3 | B_S=2: 4.90, 4.90, 9.80 B_θ | direct | 4.899, 4.899 | yes |
| L3 | min stretch of e^{At} ≥ 0.37 for t ≤ 0.32 | σ_min on a grid of 10⁻⁵ | 0.37966 (at t=0.32, decreasing; 0.3687 at 0.33) | yes |
| L3 | B_S=2.03 from 2×1.012 | direct | 2.0239 | yes |
| L3 | ‖θ‖ ≈ 1.22 for θ=(½,½,1) | direct | 1.224745 | yes |
| L3 | L_g ≈ 5.05, L_∇g ≈ 4.97, L_h ≈ 7.52, product ≈ 151, squared ≈ 2.27×10⁴, ×3 ≈ 6.8×10⁴, /γ² ≈ 6.8×10⁶ | direct | 5.0471, 4.9725, 7.5187, 150.67, 22700, 68101, 6.81×10⁶ | yes |
| L3 | leading term exceeds 1 until n ≈ 10¹¹ | bisection on 6.81×10⁶ log³n/n = 1 | n ≈ 1.12×10¹¹ | yes |
| L3 | residual ≤ −0.738‖x‖² ≤ −0.1 | 1−0.2λmax(P); 0.37² | 0.73820; −0.10106 (threshold σ_min ≥ 0.36806) | yes |
| L3 | exercise: ratio 0.433, value 0.017 | direct | 0.43274, 0.01731 | yes |
| L3 | ∫₀¹√log(1/u) du = √π/2 | Γ(3/2) | 0.886227 | yes |
| L3 | Lab fits at rate α+0.05, tests at α, P ⪰ I | read `lab/flows.js` `experiment`, `fit` (psd floor 1) | as stated | yes |

All printed numbers reproduce. The issues below concern statements and arguments, not arithmetic.

## Source decision on Lemma 4.1's second term (task 2)

On the rendered p.6, Lemma 4.1 reads K((log³n/γ²)R_n²(V) + **2** log(log(**4**B_h/γ)/δ)/n). On the rendered p.7, Theorem 4.2's (4.2) has log(log(B_h/γ)/δ)/n, with no factor 2 and B_h in place of 4B_h. Appendix B.1 (p.19) only says "Theorem 4.2 now follows from Lemma 4.1", so the source never derives the change.

- **Lesson 3's handling is correct.** `lem-fast` recalls the lemma exactly as printed. `bound` reproduces (4.2) exactly as printed. The remark correctly states three things: the 2 is a constant, the 4B_h → B_h change is not a constant factor, and the theorem's form can be nonpositive. The arithmetic of the remark is also right: feasibility gives B_h ≥ γ, so the lemma's term is positive. One detail: when B_h=γ, the theorem's form is log(0), so it is undefined rather than "zero or negative". Step 6 correctly says that only the first term is reproduced.
- **`boffi-lemma-4-1.md` does not match the source.** Its Textbook and Card statements give B_n = log(log(4B_h/γ)/δ)/n, without the factor 2. Mathematically K absorbs the 2, but it is a misquote, and it conflicts with lesson 3's recall (finding L3-8).

## Findings

Severity: **critical** = false or unsupported mainline claim; **moderate** = gap or misstatement that must be fixed before acceptance; **minor** = record and fix when convenient.

| # | Lesson / anchor | Quote or location | Severity | Diagnosis | Source locator | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- | --- | --- |
| L3-1 | L3 `#reasoning` Step 5, `dudley`, `complexity`; the sentence before Step 2 ("The remaining steps show R_n(V)² ≤ c₀ …"); Card proof step 5 | "In the paper's form ((B.1), p.6) the bound for the residual class is R_n(V) ≤ (24L_h/√n)∫₀^∞√log N dε" and the derived bound R_n ≤ 24 I B_θ(L_g+L_∇g)L_h√(k/n) | **critical** | Applied to the **absolute-value** worst-case convention, the inequality is false without an extra term. Dudley chaining controls sup\|X_V−X_{V₀}\|, but \|X_{V₀}\| itself is not controlled. **Counterexample.** Take k=1 and g(x,θ)≡−1, which is C² and in class (4.1). Then L_g=L_∇g=0 and N(ε)=1 for every ε>0, so the right side is 0. The residual is the constant b=ρ(−1)≠0, so R_n = \|b\|·E\|Σσᵢ\|/n ≈ \|b\|√(2/(πn)) > 0. This is lesson 2's own singleton example. So `complexity` and the claim R_n² ≲ k/n are false in general. The signed convention would not need the extra term. **Repair conditions.** The step is valid, up to the constant, when the class contains a member V₀ whose trajectory residual is identically zero, or in general after adding a term ≤ B_h/√n. Squaring that term would add K·B_h² log³n/(γ²n) to (4.2), which the source's display omits. **Effect on the worked example.** It is unaffected: θ=0 gives V≡0 and h=ρ(0)=0 for the Lyapunov residual with linear ρ. The restricted P ⪰ I class inherits the bound by monotonicity from the full ball. Whether the theorem's *conclusion* still holds by another route (for example through the actual form of Srebro et al. Thm 5) cannot be decided from the local sources. | Boffi v2 p.6 (unnumbered estimate), p.18 (B.1), p.19 (B.1 proof) | State the hypothesis explicitly: the class contains a member with identically zero trajectory residual (true for θ=0 in the example). Alternatively, write the general form R_n ≤ sup_V... ≤ B_h/√n + (24L_h/√n)∫… and note its effect on (4.2). Mark this as an unresolved source qualification, visible in the Textbook and the Card; do not silently correct the source. Add a one-line cross-reference to lesson 2's singleton example as the reason. Keep the metadata `located`. | **closed** (recheck 1): zero-residual hypothesis in `thm-main`, labeled as the lesson's addition; chaining-from-reference explanation; constant 24 labeled as taken unchecked from the source; counterexample remark; general extra B_h/√n term and 2KB_h²log³n/(γ²n); Card statement, assumptions and step 5 consistent. Source gap stays visible; metadata `located`. See note R-1. |
| L3-2 | L3 `#setting` ("T=[0,t_max] or [0,∞) is the common time interval on which every such trajectory exists") and `#example` assembly (T=[0,0.32]) | | **moderate** | The source defines T as **the maximal interval** starting at 0 on which unique solutions exist for all ξ∈X (p.4). For the shared linear system that interval is [0,∞), and there (3.2) is infeasible, as the lesson's own fourth exercise shows. The "complete assembly … chosen so that the fixed-margin premise actually holds" depends on truncating to T=[0,0.32]. This is a legitimate adaptation, because the proof uses T only through Assumption 4.1 and the definition of h(ξ,V), and Lemma 4.1 is applied to a fixed class of functions of ξ. However, it is presented as if it were the paper's setting. Gate 2 requires the domains to match the source or to be labeled. | Boffi v2 p.4 §3.1; p.6 Assumption 4.1 | Say that the paper takes T maximal. State that the argument goes through unchanged for any fixed horizon T chosen before the data, on which trajectories exist and Assumption 4.1 holds, and give the reason. Label the assembly as using this adapted horizon. Point out that with the paper's T=[0,∞) the same example is infeasible. | **closed** (recheck 1): `#setting` states the paper's maximal T and the fixed-horizon adaptation with its justification; `#example` labels the adaptation and notes infeasibility for T=[0,∞). |
| L3-3 | L3 Step 5 | "In the paper's form ((B.1), p.6)" | minor | The equation number (B.1) is printed on p.18 (Appendix B preamble). On p.6 the same estimate appears unnumbered. | Boffi v2 pp.6, 18 | Write "(p.6; numbered (B.1) on p.18)". | **closed**: "stated on p.6 and numbered (B.1) on p.18". |
| L3-4 | L3 `#setting`, `thm-main` | "B_h bounds \|h\|, and h is L_h-Lipschitz …" (listed as hypotheses) | minor | The lesson rightly makes the finiteness of L_h a hypothesis. The source instead asserts that B_h and L_h are "guaranteed to be finite by our assumptions" (p.6). That is true for B_h (h is continuous on a compact set) but not for L_h, because a merely continuous h need not be Lipschitz. The deviation is correct but undisclosed. Similarly, the source leaves the norm in L_∇g unspecified. The lesson's operator-norm choice is what makes Lemma `lem-param` work. | Boffi v2 p.6 (B_h, L_h paragraph), p.7 (L_∇g) | Add one sentence noting that the Lipschitz hypothesis is stated explicitly here because continuity of h does not imply it. Also add that the operator norm is this lesson's reading of the source's unspecified norm. | **closed**: Lipschitz hypothesis and operator-norm reading both disclosed. |
| L3-5 | L3 Step 5, chaining intuition | "A finite class of N functions with values in [−b,b] has complexity at most b√(2 log N/n)" | minor | This is Massart's lemma for the signed convention. For the absolute convention used in this step it becomes b√(2 log(2N)/n), applied to F∪(−F). The missing log 2 is the finite-class shadow of L3-1. | SSBD §26.2 (Massart) | Say "signed; with absolute values, replace N by 2N", or fold this into the L3-1 repair. | **closed**: "signed complexity … with absolute values, replace N by 2N". |
| L3-6 | L3 Card `#statement` vs Card `#proof` step 1; `lem-fast` | The Card states (4.2) with log(log(B_h/γ)/δ). Proof step 1 uses 2log(log(4B_h/γ)/δ). The recalled lemma omits "0<δ<1". | minor | The Card shows two different confidence terms without pointing to the Textbook remark. A Card reader cannot tell which to trust. | Boffi v2 pp.6–7 | Add a parenthetical to the Card statement: "(printed form; the derivation yields the lemma's 2 log(log(4B_h/γ)/δ)/n, see Textbook remark)". Add "Fix δ∈(0,1)" to `lem-fast`, as in the source. | **closed**: Card notes the printed vs derived second term and the zero-residual need; `lem-fast` now fixes δ∈(0,1). |
| L3-7 | L3 "Reading the bound" | "The factor B_θ(L_g+L_∇g) is the largest change in certificate values and gradients that the parameter ball allows"; scaling argument "for the linear ρ" | minor | Two imprecisions. (a) The largest change over the ball is up to 2B_θ(L_g+L_∇g), the diameter; B_θ(L_g+L_∇g) is the radius-scale. (b) The scale-invariance argument also needs the class to be closed under scaling, for example g linear in θ, and not only a linear ρ. | n/a | Write "the scale of change (half the diameter)". Add "for a class linear in θ". | **closed**: "scale of change … (half the largest possible change)" and "for a class linear in θ and a linear ρ". See note R-2. |
| L3-8 | prerequisite `content/18-certificates/boffi-lemma-4-1.md` `#statement` (Textbook and Card) | B_n = log(log(4B_h/γ)/δ)/n | minor (for the pilot; must be fixed in rollout) | The factor 2 printed on p.6 is dropped. Lesson 3's recall matches the source; the prerequisite does not. Harmless inside K, but it is a misquote, and the route shows inconsistent statements (beginner-review #12). | Boffi v2 p.6 | In the Phase 4/5 rewrite of `boffi-lemma-4-1`, restore the 2 and add the same 4B_h vs B_h note. I did not edit this file. | **open (deferred to rollout)**: `boffi-lemma-4-1.md` still omits the factor 2; not a pilot-owned file; coordinator schedules it for the Part 18 slice. |
| L3-9 | L3 Exercise 2 solution | "'Roughly' refers only to rounding, and to the second term, which scales as 1/n" | minor | The question asks only about the leading term, so the second term has no bearing on that answer. The ratio 0.433 is exact up to rounding. | n/a | Drop the second-term clause, or rephrase it as "the whole bound also has a 1/n term, which changes differently". | **closed**: "Roughly refers only to rounding", second term moved to a parenthetical. |
| L1-1 | L1 `#nonnormal` "Rates" | "V(φ_t(ξ)) ≤ e^{−0.764t}V(ξ), ‖φ_t(ξ)‖ ≤ 2.618e^{−0.382t}‖ξ‖ for every ξ (constants rounded)"; Card "α ≈ 0.38 … prefactor ≈ 2.62" | minor | Every rounding goes in the non-conservative direction: 0.764>0.763932, 0.382>0.381966, 2.618<2.618034. The displayed inequalities are therefore not the ones the certificate proves. They are still true for this A, but only because the true transient is far smaller. The scope section says "proves global exponential stability with the stated constants". | n/a | Show the exact constants (3−√5, (3−√5)/2, (3+√5)/2), or round conservatively: e^{−0.763t}, 2.619e^{−0.381t}. | **closed**: exact constants displayed; conservative rounding 2.619e^{−0.381t} in Textbook and Card; 0.540/1.787 remain correct evaluations of the exact bounds. |
| L1-2 | L1 `lem-trap` proof | "While the trajectory stays inside B̄_r …"; "Suppose the trajectory leaves the ball …" | minor | The argument is correct, but it implicitly works on the maximal interval of existence before global existence is known. A reader may think existence is assumed while it is being proved. | Khalil Thm 3.3, p.94; proof of Thm 4.1, pp.114–116 | Add: "Work on the maximal interval [0,t*) on which the solution exists; the argument shows it stays in Ω_c there, and then the continuation fact gives t*=∞." | **closed**: proof now works on the maximal interval [0,t*) and concludes t*=∞. |
| L1-3 | L1 `#failures`; `#lie-derivative` | "So V̇≤0 alone can never yield convergence"; "[∇V] points … perpendicular to the level set"; "V̇<0 means … obtuse angle" | minor | (a) This overstates the point. The rotation shows that V̇≤0 cannot *establish* convergence through Theorem part 1, while LaSalle derives convergence from V̇≤0 plus an invariance condition, as the next sentences say. (b) The gradient-geometry statements need ∇V(x)≠0. | Khalil Thm 4.4/Cor 4.1, p.128 | Write "V̇≤0 alone cannot establish convergence". Add "(where ∇V≠0)". | **closed**: "cannot establish convergence"; both gradient-geometry sentences qualified by ∇V(x)≠0. |
| L1-4 | L1 `#setting`, `thm-lyapunov`, Card assumptions | "Throughout, f is continuously differentiable on U" | minor | Khalil Thm 4.1 needs only locally Lipschitz f. Assuming C¹ is a stronger, legitimate simplification, but it is not labeled as one. Later lessons work with merely continuous f plus assumed unique solutions (Boffi p.4, Van der Pol), so the reader should know that C¹ is a convenience. | Khalil Thm 4.1 p.114 (via (4.1), locally Lipschitz f), Thm 3.3 p.94 | Add: "(Khalil assumes only local Lipschitz continuity; C¹ is a convenient sufficient condition.)" | **closed**: C¹ labeled as a sufficient convenience (Khalil: locally Lipschitz) in `#setting` and the Card. |
| L2-1 | L2 `#assumptions` | "Convention (c) … p. 6, in the paragraph below their Lemma 4.1" | minor | The definition of R_n is part of the italic Lemma 4.1 statement on p.6 ("Here, R_n(V) := …"), not the paragraph below it. | Boffi v2 p.6 | Write "in the statement of their Lemma 4.1, p.6". | **closed**: "defined inside the statement of their Lemma 4.1". |
| L2-2 | L2 `#experiment` table and prediction answer | SE for n=128 printed 0.002 (computed 0.0016); "The readout stays near half the bound" | minor | All values reproduce (beginner-review #24 confirmed). Two small points. The SE rounding is coarser than the other rows. The readout/bound ratio is 0.68 at n=4, and 0.43–0.50 for n ≥ 8. | `app/js/flows.js` ll.127–145 | Print 0.0016, or keep 0.002 consistently with one significant figure. Write "near half the bound for n ≥ 8". | **closed**: SE column now 0.0016 etc.; "for n≥8 … (at n=4 it is 0.68 of it)". |

### Items checked and found sound (selected, for the record)

- **L1.** The stability and attraction proofs are complete under the stated hypotheses. Compactness of Ω_c, the first-exit argument, the δ<r choice and the uniform shell decrease are all correct and match Khalil's proof structure. The radially-unbounded example and its Khalil Exercise 4.8 locator are correct. The energy/norm factor two is correct and consistent with lesson 3's ρ(v)=2αv and the Lab's `2*rate` constraint. The δ-collision note is present. The "every solution" quantifier (trapping holds for each ξ∈Ω_c) is faithful.
- **L2.** The symmetrization proof is complete and matches SSBD Lemma 26.2's convention, which is signed and sample-expected. Thm 26.5(1) is quoted with the correct constants (2E R + c√(2ln(2/δ)/m)). The linear-ball proof is complete, and Jensen's equality case is right. The convention ordering is correct, as is the symmetric-class equality. The worst-case transfer for F_B (every sample in the radius-R ball, symmetric class) is valid. No issue with "independent draws" or n counting trajectories.
- **L3.** The other steps hold:
  - `lem-param` and `lem-residual` are correct, with internal covers and a uniform sup-norm cover over ξ.
  - The sup-norm cover dominates the empirical L₂ cover, so it is valid for the worst-sample supremum (but see L3-1 for the absolute value).
  - The volume packing proof is correct, the tail cutoff at u=1 is necessary and correctly argued, and the integral is finite.
  - The feasibility example is correct under the adapted horizon (L3-2).
  - The fixed-margin infeasibility argument is correct: uniform smallness of ∇Vᵀf and V near 0 under bounded gradients and V(0)=0, so positive mass near 0 makes (3.2) infeasible with probability → 1.
  - The relative-margin description of the Lab is accurate.
  - "Any solution" matches Thm 4.2 on p.7. The source's Lemma 4.1 says "a solution". Under the uniform form of the underlying result these are equivalent, so I raise no finding.
  - err is defined as a probability over a fresh ξ, and the scope disclaimers (not global validity; C uncalibrated) are honest.
- **Evidence (gate 3).** All three files keep `review = "located"`, and the lesson 3 Card states that no proof audit has been recorded. I recommend no upgrade. Recalled versus derived material is labeled: Lemma 4.1, Dudley, Massart, Thm 26.5, LaSalle and the discrete analogue are recalled or deferred with destinations; everything else is derived. Illustrative numerics (Story, Lab, demo table, assembly) are labeled as finite or illustrative. I found no verbatim copying of private-source prose.
- **Cross-lesson conventions.** These are consistent: continuous vs discrete time; norm rate α with energy form 2α (L1 ↔ L3 ↔ Lab); γ is a margin, not a discount; δ is a radius in L1 and a failure probability in L2/L3, with the collision flagged; signed / absolute / worst-case conventions are defined in L2 and re-defined at use in L3; n counts independent trajectories in all three; log is natural in L3 and ln in L2. The one cross-lesson inconsistency is the L3 ↔ `boffi-lemma-4-1.md` confidence term (L3-8).

## Referred beginner-review findings

- **#12.** Source decision made (see the section on Lemma 4.1 above). Lesson 3's recall is source-correct, and its remark is correct apart from the B_h=γ "undefined" nuance. `boffi-lemma-4-1.md` drops the factor 2 and should be corrected in rollout (L3-8).
- **#24.** Confirmed. The readout, SE, exact and bound columns all reproduce with the engine (`RL.lab.rng(7)`). The only notes are cosmetic (L2-2).

## Summary

| Lesson | Critical | Moderate | Minor |
| --- | --- | --- | --- |
| `lyapunov-functions` | 0 | 0 | 4 (L1-1 to L1-4) |
| `rademacher-complexity` | 0 | 0 | 2 (L2-1, L2-2) |
| `boffi-thm-4-2` | 1 (L3-1) | 1 (L3-2) | 7 (L3-3 to L3-9; L3-8 concerns the non-pilot prerequisite file) |

Key issues:

1. **L3-1 (critical).** Dudley's estimate (B.1), as used with the absolute worst-case Rademacher convention, is false without an additional term. A class with a constant nonzero residual is a counterexample (lesson 2's singleton). So the lesson's derived bound R_n ≲ √(k/n) needs a stated hypothesis (a member with zero residual, which holds for the pilot's quadratic example at θ=0) or an extra B_h/√n term. This is a source-level gap; record it visibly and keep `located`.
2. **L3-2 (moderate).** The source's T is the maximal existence interval. The worked feasibility example truncates T to [0,0.32], an unlabeled adaptation, although a valid one.
3. Lessons 1 and 2 are mathematically sound. Every printed number in all three lessons reproduces independently, including the Lab table. Lesson 3's handling of Lemma 4.1's 2·log(4B_h/γ) versus Theorem 4.2's log(B_h/γ) is source-correct. The prerequisite `boffi-lemma-4-1.md` drops the factor 2.

## Recheck 1 (2026-10-19)

**Patched candidate, raw SHA-256 verified:**

| File | SHA-256 | Match |
| --- | --- | --- |
| `content/15-dynamics/lyapunov-functions.md` | `199abd2ca520923195bbaec538c34f461062dab8fad9dddb03def9450eae8029` | yes |
| `content/17-learning-theory/rademacher-complexity.md` | `a95c06b57e77a573fcce0562e4962582d371802d02fe0e845a2199b94fb1b0b0` | yes |
| `content/18-certificates/boffi-thm-4-2.md` | `da13aa3ee3930898f6e72a1e4e3f30f5cc9a9411900301ccd9a7712115f6e952` | yes |

**Rechecked scope.** I reread every passage named in findings L1-1 to L3-9, plus all mathematical text the patches introduced. For lesson 2 that includes the full rewritten symmetrization section, the conventions list and the two split demo tables. For lesson 3 that includes the full Textbook and Card. Specific checks:

- **L3-1 repair.** This was the coordinator's main question; each part was checked separately.
  - *Chaining from a reference.* The lesson writes h(ξ,V)=h(ξ,V)−h(ξ,V₀) for a zero-residual V₀ and applies the paper's estimate to these differences. This is legitimate: Dudley chaining controls sup\|X_V−X_{V₀}\|, and the constant 24 is now labeled "taken from the source without checking". The sup-norm cover remains uniform in ξ, so the worst-sample supremum is covered.
  - *E_σ\|Σσᵢaᵢ\| ≤ √(Σaᵢ²) ≤ B_h√n.* Correct. The first inequality is Jensen (or Cauchy–Schwarz) together with E σᵢσⱼ = δᵢⱼ. The second uses \|aᵢ\| = \|h(ξᵢ,V₀)\| ≤ B_h, which holds because the trajectory residual is a supremum over t of pointwise residuals, each bounded by B_h.
  - *The added term.* Correct. sup_V\|Σσᵢh(ξᵢ,V)\| ≤ sup_V\|Σσᵢ(h(ξᵢ,V)−h(ξᵢ,V₀))\| + \|Σσᵢh(ξᵢ,V₀)\|, and the supremum over samples of a sum is at most the sum of the suprema. So R_n gains at most B_h/√n. Squaring with (a+b)² ≤ 2a²+2b² and inserting into Lemma 4.1 adds 2K·B_h²log³n/(γ²n).
  - *The zero-residual claim for linear-in-θ Lyapunov classes.* Correct. Linearity in θ gives g(·,0)≡0, so V≡0 and ∇V≡0. The pointwise residual is then ρ(0)=0 at every t, so the trajectory residual is identically 0.
  - *The counterexample remark.* Correct: g≡−1 gives the residual ρ(−1)≠0 and R_n = \|b\|·E\|Σσᵢ\|/n ≈ \|b\|√(2/(πn)).
  - *Card.* Consistent: the statement caveat, the assumption bullet and proof step 5 all match the Textbook.
  - *Theorem box.* It now contains a hypothesis the paper does not have. The sentence right after the box ("The zero-residual condition is this lesson's addition") labels it adequately.
- **L3-2.** The adaptation is stated in `#setting` and in the example, with a correct justification: the proof uses T only through Assumption 4.1 and the definition of h(ξ,V), and T is fixed before the data. The annulus with T=[0,0.32] and the feasibility numbers are unchanged from my first pass and still reproduce (min stretch 0.3797, residual ≤ −0.1011).
- **Lesson 2 layout and notation changes.** I found no change of meaning.
  - The hypothesis letter changed from g to ψ. In Step 2 the dummy g became f̃, which also removes a clash with Part 18's g.
  - Step 3 now introduces d_i(f)=f(Z′ᵢ)−f(Zᵢ) and Step 4's display is multi-line. The inequalities are the same as before.
  - The conventions table became a list with identical content.
  - The demo table was split into two tables, and every value matches my engine recomputation (readouts, SE 0.011/0.0061/0.0038/0.0030/0.0022/0.0016, exact values, bounds).
  - The "within about 1.5 SE" statement still holds (maximum 1.54).
- **Lesson 1.** The exact-constant display is correct: e^{−(3−√5)t} and ((3+√5)/2)·e^{−((3−√5)/2)t}. The conservative rounding 2.619e^{−0.381t} is valid, since 2.619 ≥ 2.618034 and 0.381 ≤ 0.381966. The maximal-interval trapping proof is now complete. The other wording fixes are correct.

**New notes from the recheck.** Both are minor, and neither blocks acceptance.

| # | Location | Severity | Note | Suggested repair | Disposition |
| --- | --- | --- | --- | --- | --- |
| R-1 | L3 remark after Step 5 | minor | Without a zero-residual member, squaring with (a+b)² ≤ 2a²+2b² also doubles the first term's constant, to 2K(24I)². The remark mentions only the added term. C absorbs the factor, so nothing false is stated, but Step 6's "C=K(24I)²" holds only under the zero-residual hypothesis. | Optional clause: "(and the first term's constant doubles)". | **closed** in Recheck 2 |
| R-2 | L3 "Reading the bound" | minor | "half the largest possible change" treats 2B_θ(L_g+L_∇g) as attained. It is only an upper bound from Lemma `lem-param`. | "half the largest change Lemma `lem-param` allows". | **closed** in Recheck 2 |

**Recheck result.**
- All critical and moderate findings are closed: L3-1 and L3-2.
- All minor findings are closed except L3-8. That one is deferred to the rollout of the non-pilot file `boffi-lemma-4-1.md`, which still omits the factor 2.
- Two new optional minor notes (R-1, R-2).
- Gate 2 (mathematics) and gate 3 (evidence) are satisfied for the three pilot lessons at these hashes, within the checked scope. Unchecked items are unchanged: Srebro et al. Theorem 5 and Dudley's constant 24. Source metadata stays `located`; I do not recommend an upgrade.

## Recheck 2 (2026-10-19): final versions covered by this review

**Final candidate, raw SHA-256 verified:**

| File | SHA-256 | Match |
| --- | --- | --- |
| `content/15-dynamics/lyapunov-functions.md` | `c29da439ff5ae7863910b01f0042398207d169f26870ea238c00eb833d86a4c9` | yes |
| `content/17-learning-theory/rademacher-complexity.md` | `a95c06b57e77a573fcce0562e4962582d371802d02fe0e845a2199b94fb1b0b0` | yes (unchanged since Recheck 1) |
| `content/18-certificates/boffi-thm-4-2.md` | `04ce6e410c299b5e4a9cbb7ca17fa46dd0576a2effc21d1235b808c57c6e8491` | yes |

**Changes checked since Recheck 1:**

- **L1 `#setting`.** The new inline definition of a locally Lipschitz f is correct: near each point, \|f(x)−f(y)\| ≤ L\|x−y\| for nearby x and y. So is the claim that every C¹ f has this property, by the mean value inequality on a small closed ball. Nothing else in L1 changed meaning.
- **L3 R-1.** The remark now says the first term's constant doubles to 2K(24I)², which C absorbs. This is correct. **Closed.**
- **L3 R-2.** The text now reads "half of the upper bound 2B_θ(L_g+L_∇g)". This is correct. **Closed.**
- **L3 theorem box title.** It now reads "…Theorem 4.2, with the zero-residual condition added". This is an accurate label of the lesson's addition.
- **L3 `#assumptions`, zero-residual bullet.** Correct. θ=0 works for a linear-in-θ Lyapunov class. Without such a member, the complexity gains B_h/√n and the bound gains a term of order B_h²log³n/(γ²n), consistent with the remark.
- **L3 `#assumptions`, horizon bullet.** Correct, and consistent with `#setting`: T enters only through Assumption 4.1 and the trajectory residual.
- **L3 worked example.** The new note is correct: θ=0 lies in the ball of radius B_θ=2 and gives V≡0, whose residual is ρ(0)=0 at every time.

**Final status at these hashes.** All findings are closed except L3-8, which concerns the non-pilot file `boffi-lemma-4-1.md` (missing factor 2) and is deferred to the Part 18 rollout.

For the three pilot lessons, this review supports gate 2 (mathematics) and gate 3 (evidence) within the checked scope. Two items remain outside that scope and are not verified: Srebro et al. Theorem 5, the result behind Lemma 4.1, and Dudley's constant 24. Source metadata stays `located`.
