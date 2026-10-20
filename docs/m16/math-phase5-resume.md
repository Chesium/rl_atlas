# M16 Phase 5 resumed mathematical recheck

Reviewer: `/root/phase5_math`, assignment P5-MR, independent of the writer and beginner reviewers. Date: 2026-10-20. This is an agent mathematical check, not a human proof audit. The original complete ten-station report `math-phase5.md` remains the baseline; this report checks only the repaired passages and the counterexample premise identified by the coordinator. No lesson or source metadata was edited.

## Candidate identity

Raw SHA-256 from `Get-FileHash`, equal to the assignment packet:

| File in `content/18-certificates/` | SHA-256 |
| --- | --- |
| `boffi-thm-5-1.md` | `3b80bceb9973942c1e8fd0743fac70b8c2cd1c93fbcbd035e7edaa46014d9c6e` |
| `boffi-thm-5-2.md` | `5db30a59657e4ac80295753e65cd058e774b09a3cf9da8abd9521b772d3c0a50` |
| `boffi-thm-4-4.md` | `b0db6b7f6185de82a78c95094d0c140dcede9c86200ffad204e1308595ade6f9` |

Read AGENTS.md, the adapted atlas-writing skill and its workflow, and the pedagogy checklist. Independently extracted the raw local `course/ese6180/boffi-v2.pdf` using `pdftotext -f 23 -l 28 -layout ... -`, plus the printed theorem on p.9. Read the current candidate passages and accepted `contraction-metrics` path/energy argument and `covering-dudley` zero-member/internal-center qualifications. Writer conclusions were not an input to these mathematical judgments.

## Existing minor repairs

| Finding | Recheck and disposition |
| --- | --- |
| B5-24 | Closed within the mathematical scope. The theorem and following paragraph correctly list three additions: sufficient regularity of the field, gradient bounds on a convex domain, and strict measure inequality. The Card labels the additions and recalls the interior-ball alternative. A compact ball contained in the interior has positive distance from its complement, so a slightly enlarged ball exists; the repaired proof preserves the source's limit argument. |
| B5-25 | Closed. The reconstructed radius and `C_M` are now displayed in theorem 5.2 itself, exactly matching the later derivation. Moving this information does not change the hypotheses or conclusion. |
| B5-26 | Closed. Agent-check status and absence of human proof audit are stated consistently. The `A(s)` parenthesis identifies the time-varying Jacobian. Liouville's determinant formula supplies invertibility without the source's generally invalid exponential-of-integral shortcut. |
| B5-27 | Closed. The data-only error event contains the joint approximation-and-generalization event. Its joint probability equals its marginal probability over the data. Union-bounding the joint failures gives `1-delta-2/n^2` over the data, with no independence between the two good events required. |
| M5-9 | Closed. The Card now uses a separate true norm rate `lambda_star` and explicitly identifies the paper's tied-rate special case. This agrees with the reconstructed theorem and condition-number constant. |

The affected proof reasoning remains valid: the block coupling costs `vartheta*kappa_H/2`, the admissible weight includes `lambda_star` and is capped at one, the joining path starts inside the eroded state ball with directions of norm at most one, and the convex-domain gradient bounds apply to the transfer segment. Quadratic homogeneity extends the unit-initial-direction result to all directions after invertible transport. These checks do not expand the baseline audit into a fresh all-ten review.

## New moderate finding M5-R1: counterexample measure premise

**Location:** `boffi-thm-5-2.md`, Textbook example `ex-bump`, paragraph beginning “Trajectories are rays”. **Severity:** moderate. **Disposition:** open; writer repair and both affected-review rechecks required.

The current counterexample uses a `1200 x 1200` grid estimate `nu(Z_b) approximately 0.017` to choose `epsilon=0.02`. That estimate does not prove the measure premise of the counterexample. Consequently the current proof that the printed theorem is false has an unproved premise, despite the original report's acceptance of that example. “Its ray passes the bump” is also too imprecise for a Gaussian with nonzero tails. A rigorous upper enclosure is sufficient and avoids finding the exact bad set.

### Independently checked minimal repair

Keep the field, metric and test point, and choose `epsilon=0.03`. Write `s=||x-x0||`, `a=0.045`, and `rho=0.02`. Since `||x|| <= s+0.5`,

$$|x^T\nabla w(x)|\le H(s):=\frac{2s(s+0.5)}{\rho^2}e^{-s^2/\rho^2}.$$

For `s>=a`,

$$\frac{H'(s)}{H(s)}=\frac1s+\frac1{s+0.5}-\frac{2s}{\rho^2}<0.$$

Indeed the positive terms are at most `1/.045+1/.545<25`, whereas the final term is at least `225`. At the endpoint, `H(a)=122.625 exp(-5.0625)=0.7761813543<1`; the strict inequality also follows without decimal quadrature from `exp(5)>125`, using its positive Taylor series. Thus outside the ball `B(x0,a)`, `|x^T grad w|<1<=w`, so `x^T grad w<-w` is impossible. Every bad state lies in that ball.

The violation condition is independent of the transported nonzero direction, because both `q` and `V` have the same squared-direction factor. The flow `exp(-t) xi` travels only inward along its initial ray. If it meets `B(x0,a)`, its initial polar angle has magnitude at most `arcsin(a/.5)=arcsin(.09)`, and its initial radius is at least `.5-a=.455`. This encloses every bad initial state in an annular sector, giving

$$\nu(Z_b)\le\frac{\arcsin(.09)}{\pi}(1-.455^2)=0.02274784074<.023<.03.$$

This is an upper bound, not an assertion that every ray in the sector violates. One can verify the strict bound elementarily: `arcsin(.09)<.091`, since `sin(.091) >= .091-.091^3/6 > .09`, and `pi>3.14`.

For the genuine circular-cap fraction, `r=(pi*.03)^(1/3)=.4550827521`, so the eroded disk has radius `.5449172479`. It still contains `xhat=.5+.02/sqrt(2)=.5141421356`. At that test point `w=1.6065306597`, `x^T grad w=-22.0506277837`, and `q/||delta x||^2=18.8375664643>0`. The true metric is `I`, its true norm rate equals the chosen learned energy rate `1`, and `B_H=0`, so the printed radius is still zero. Time `t=0` places this point in the claimed region. The contradiction is preserved for every `eta in (0,1)`. Smoothness and positivity hold globally; the unit disk is compact, convex and invariant, so all gradient bounds on its product with the unit direction ball are finite. Thus the analytic enclosure supplies the missing premise rather than changing the counterexample mechanism.

Update the exercise answer's eroded radius from approximately `.6` to approximately `.545`. The reconstruction's existing conservative lower bounds `53` and `37` remain valid, but can be strengthened without sampling: at `(x0,v)` with `||v||=1`, `grad_x q=-3 grad w-D^2w x=2500 e1`, since `grad w(x0)=0` and `D^2w(x0)=-5000 I`. Hence `B_grad q>=2500` exactly. With the new `r`, this alone gives reconstructed `r_b>=56.7267` for `eta=.5`, and `r_b>40.112` for every `eta<1`; all transported unit directions have norm at most one. The reconstructed region is therefore empty in this example, as intended.

The explicit numerical substitutions were recomputed with a Python standard-library `math` self-check asserting `H(a)<1`, the measure enclosure below `.03`, and `xhat<1-r`. The inequalities above establish the general enclosure; these numerical assertions are a sanity check, not the measure proof.

## Scope and next gate

Only B5-24 through B5-27, M5-9, their affected hypotheses/proof transitions, and the identified counterexample premise were rechecked. M5-R1 blocks mathematical acceptance until the writer supplies the analytical proof and a fresh reviewed hash. A changed explanatory proof also needs renewed beginner review. No full-ten rerun, browser/build/test validation, human review, optimality claim, or source-status upgrade was performed. The original audit retains its external-result limits.

## Final M5-R1 recheck

**Candidate:** `boffi-thm-5-2.md`, raw SHA-256 `ec58b68cbe74f6728e3e063481a93cde6447e75e21a3a3ca8573860f7c9993a8`, verified with `Get-FileHash`. Read the patched `ex-bump` and its dependent exercise before consulting writer conclusions.

**Disposition: M5-R1 closed; mathematical gate passes for this changed proof and answer.** The text now derives the global Gaussian-tail enclosure through `H`, proves its logarithmic derivative is negative for every `s>=.045`, and bounds bad trajectories by an annular sector. It treats the grid result as illustrative only. The product-measure inference is valid: the transported direction is nonzero at every finite time and its squared norm cancels from the violation test, making the entire trajectory's bad/good status independent of the initially selected unit direction. The sector counts an upper enclosure of inward segments, with no converse assumed. Its normalized area is below `.03`, so the strict premise is now verified analytically.

Independently recomputed the displayed constants and strict comparisons with Python `math` assertions: `H(.045)=.7761813543`; the upper bound on its logarithmic derivative is `-200.9429154`; the sector measure is `.02274784074`; `r=.4550827521`; erosion radius `.5449172479`; `xhat=.5141421356`; and `q(xhat,v)=18.8375664643` for unit `v`. The test point is inside the eroded disk and is reached at time zero. The printed zero exclusion radius therefore asserts decrease at a point with positive derivative for every `eta in (0,1)`, as claimed. The lower bounds also hold with ample strict margins; elementary exponential/sine estimates recorded above independently control the decimal comparisons.

Checked the exact derivative replacement: holding a unit displacement fixed, differentiating `q=-(2w+x^T grad w)` gives `grad_x q=-3 grad w-D^2w x`. At `x0` this is exactly `2500 e1`. The norm of the full prolonged gradient is at least the norm of its state-gradient component, so `B_grad q>=2500`. Since `C_M=lambda=mu=1` here and the omitted `lambda B_grad V` is nonnegative, the reconstructed-radius lower bounds are `56.72672210` for `eta=.5` and strictly above `40.11184987` for every `eta<1`. Thus the authored `>56.7` and `>40.1` are valid; all transported unit directions have norm `exp(-t)<=1`, making the reconstruction's region empty. The dependent answer correctly updates the point radius to `.514` and the eroded-disk radius to `.545`. The separate exercise explicitly retaining `epsilon=.02` is a standalone radius calculation and needs no change.

No new finding in the affected passages. B5-24..27 and M5-9 retain their earlier dispositions; only the 5.2 candidate hash has changed. This closes the mathematical proof-premise gap, subject to the separate renewed beginner gate and coordinator integration gate. Build/browser results supplied by the coordinator were not independently rerun by this reviewer; no full-ten audit, external-result audit, human proof audit, or metadata upgrade is implied.
