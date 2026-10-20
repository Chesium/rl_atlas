# M16 Phase 5 final minor repairs: independent beginner recheck

2026-10-20. Assignment P5-BR, agent `/root/phase5_beginner`, distinct from
writer `/root/phase5_patch`. This reviewer did not author these lessons.

This is an affected-passage recheck of B5-24 through B5-27, not a repeated
ten-station teaching review. The complete earlier review remains in
[beginner-phase5.md](beginner-phase5.md). No lesson or shared file was edited.

## Inputs and order

Read AGENTS.md, atlas-writing SKILL.md, rewrite workflow and pedagogy checklist;
read the Part 18 route-contract amendment and relevant station contracts. Consulted
the current three lessons, including their Cards, with the relevant declared
prerequisite statements/reasoning: Theorem 4.2, Lyapunov functions, comparison
functions, incremental stability, contraction metrics, Lemma 4.1, and kernel/random
features. The formulation lesson supplies the explicit (3.2) positivity contrast.
The current accepted Parts 15–17 serve as prerequisites, not subjects of a new
acceptance review.

Attempted the three assigned reader tasks before opening the earlier beginner
findings or writer conclusions. After recording the task outcomes to the
coordinator, read B5-24–27 and `writer-phase5-resume.md` to compare dispositions.
No writer explanation, raw-source help, or mathematical-review answer was needed
to complete these tasks. These are agent reading outcomes, not student evidence.

Raw SHA-256, checked directly from the current files:

| Lesson | SHA-256 |
| --- | --- |
| boffi-thm-5-1.md | `3b80bceb9973942c1e8fd0743fac70b8c2cd1c93fbcbd035e7edaa46014d9c6e` |
| boffi-thm-5-2.md | `5db30a59657e4ac80295753e65cd058e774b09a3cf9da8abd9521b772d3c0a50` |
| boffi-thm-4-4.md | `b0db6b7f6185de82a78c95094d0c140dcede9c86200ffad204e1308595ade6f9` |

## Actual reader tasks

**5.1: enumerate the extra premises and explain why sampled feasibility is
insufficient. Pass without help.** A matching Lyapunov residual makes the fresh
error event equal to the bad-initial-state event. Uniform initial states, or a
stated density lower bound and corresponding rescaling, are needed before an
error probability becomes a volume statement. The learned function must satisfy
the quadratic lower bound with positive mu, be twice continuously differentiable,
and have finite gradient bounds for V and q on the specified convex domain.
The dynamics need C1 regularity and a uniform incremental bound over the declared
time interval. Use epsilon strictly above the error bound, or the stated interior
erosion repair. Feasibility with a fixed margin and a compatible horizon remains
a separate statistical premise.

Problem (3.2) asks only for sampled trajectory residuals below a fixed negative
margin. It imposes neither positivity nor a pairwise dynamics bound nor a uniform
sampling law; sampled residual constraints cannot establish global regularity or
gradient bounds. Theorem 4.2's smooth parametric class can supply C2 regularity,
but it does not automatically supply the entire 5.1 premise set. In particular,
the quadratic parameter ball admits zero and indefinite matrices. The new
#from-err paragraph names the missing conditions; the title and both assumption
lists consistently count/mark the three atlas additions. The Card includes both
the strict-measure repair and the interior-ball alternative.

**5.2: choose the usable radius, rates and evidence status. Pass without help.**
The printed radius has BH as a factor and therefore vanishes for linear f. The
bump metric example explains why that cannot certify every eroded state: true
contraction of f does not prevent a learned metric from expanding on a small
interior region. The reconstructed statement now gives its own radius immediately:

`rb² = sqrt(2) r (Bgradq + lambda BgradV) CM / (eta lambda mu)`,
`CM = max{sqrt(L/m), (L/m)^(3/2) BH/lambda_star}`.

For BH=0, CM has the nonzero floor sqrt(L/m); transfer error survives even though
the Hessian coupling vanishes. With omega=1/2, the admissible block weight is
min{1, lambda_star/kappa_H}; its condition number gives CM, and absorbing the
additive error against eta lambda mu rb² reproduces the statement's radius.
The learned conclusion has energy rate (1-eta)lambda and norm rate half of that;
lambda_star is the assumed true norm rate, independent of the learned energy rate.
The paper ties their numerical values. The theorem, derivation, scope and Card
consistently say the reconstruction received independent mathematical-agent
checking, with no human proof audit and source status still located. The Step 5
parenthesis now defines the paper's A(s), allowing the reader to distinguish its
noncommuting exponential issue from the stated Liouville invertibility result.

**4.4 Step 9: remove the auxiliary features from the confidence event. Pass
without help.** For each fixed dataset the approximation event E fails with
probability at most 2/n² over features; for each fixed dictionary the uniform
generalization event G fails with probability at most delta over data. Averaging
those conditional bounds and using a union bound gives
`Pjoint(E intersect G) >= 1-delta-2/n²` without assuming E and G independent.
Let H be the event that the learned certificate's error is below the stated
first-two-term bound. H contains E intersect G. The learner did not fit with the
auxiliary dictionary, so H depends only on the dataset, and
`Pdata(H) = Pjoint(H) >= Pjoint(E intersect G)`.
The new sentence makes exactly this containment and equality explicit. It does
not recover the paper's printed confidence by silently averaging a
dictionary-dependent event.

## Dispositions and cross-view check

| Finding | Recheck disposition |
| --- | --- |
| B5-24 | Closed: three additions consistently identified; C1 explicitly marked added; Card recalls interior-ball alternative. |
| B5-25 | Closed: reconstructed radius and CM visible inside thm-52 and identical to the later derivation. |
| B5-26 | Closed: consistent agent-check/no-human-audit wording; A(s) defined in place. |
| B5-27 | Closed: containment and equality of marginal/joint probabilities now explicit. |

No new critical, moderate or minor comprehension finding from this bounded
recheck. Theorem 5.2's Card agrees with the reconstructed formula and energy/norm
distinction. Theorem 4.4's Card deliberately labels its headline statement as
printed, while its assumptions mention the data-only reading; the Textbook
statement's reading paragraph and Step 9 distinguish the reconstructed
confidence. No new contradiction was introduced by this sentence repair.

Checked affected references in the 5.1/5.2 uses sections and the practice/Van der
Pol lessons: true contraction remains an untested premise, the Lab remains a
finite adapted experiment, and the printed 5.2 radius is referred to its correction.
The existing route-contract amendment agrees with these distinctions.

## Limits

No raw-PDF source audit, new numerical experiment, full ten-station rereview,
build/test run or browser inspection was performed by this reviewer. Existing
build and mobile evidence supplied in the assignment was not independently
rerun. Mathematical and product gates belong to their separate owners. The
remaining action is coordinator integration at these exact hashes; meaning
changes after these hashes require another affected-passage recheck.

## Final M5-R1 affected-passage recheck

2026-10-20, same independent reviewer. Current `boffi-thm-5-2.md` raw SHA-256:
`ec58b68cbe74f6728e3e063481a93cde6447e75e21a3a3ca8573860f7c9993a8`.
Only `ex-bump` and the dependent erosion-exercise answer changed. This hash
supersedes the earlier 5.2 hash above; the 5.1 and 4.4 dispositions are unchanged.

Read the new lesson passage before writer/math conclusions. Attempted its
measure-enclosure and counterexample tasks from the lesson and basic calculus,
then independently recomputed its constants with Python `math`. Consulted the
writer and mathematical resume reports afterward. No help from those reports
was needed. The tool range also displayed the exercise answers before a blind
attempt could be recorded: the exercise calculations below are independent
reconstructions with that answer exposure, not claimed blind exercise outcomes.

**Why the grid was insufficient.** A finite grid estimates the fraction of tested
initial states whose trajectories violate. It does not enclose every violating
state or rule out missed narrow sets between its points; Gaussian tails are
nonzero. A definitive counterexample needs its strict small-measure premise,
not only an apparently small grid fraction. The repaired example clearly labels
the grid as illustrative and supplies an upper enclosure instead.

**Tail bound and geometry: pass without report help.** Differentiating
`w=1+exp(-s²/rho²)` gives gradient norm `2s exp(-s²/rho²)/rho²`.
Cauchy–Schwarz and `||x||<=s+.5` give H(s). Its logarithmic derivative is
`1/s+1/(s+.5)-2s/rho²`; for every `s>=.045`, both positive terms are no larger
than at `.045` and the subtracted term is no smaller. Their combined upper
bound is `-200.9429154`. Thus H decreases on that entire tail and is at most
`H(.045)=.7761813543<1<=w`. The bad-state condition `x dot grad w<-w` cannot
hold outside the small ball.

An inward radial trajectory can reach this ball only if its initial radius is
at least `.455`. Tangent rays from the origin to the radius-.045 ball centered
distance `.5` away have sine of half-angle `.045/.5=.09`, giving the stated
annular-sector enclosure. The area is half angular width times the difference
of squared radii; division by pi gives `.02274784074<.03`. The enclosure may
include rays which never violate, which is harmless for an upper bound. Because
the squared displacement factor cancels from q+lambda V, this bounds the
state–direction probability as well, rather than only the state probability.

For epsilon `.03`, I recomputed `r=(pi*.03)^(1/3)=.4550827521`, the eroded
disk radius `.5449172479`, and `||xhat||=.5141421356`. The violating point is
inside the eroded disk and belongs to the claimed region already at time zero.
At that point q for a unit displacement is `18.83756646>0`. Linear true
contraction controls lengths in the true metric I; the learned, spatially
varying weight w can grow along an inward-moving trajectory sufficiently fast
to increase its own energy. Positivity of that weight does not prevent this.

**Why the reconstruction stays vacuous: pass without report help.** At x0,
the gradient of w is zero and its Hessian is `-5000 I`. Differentiating
`q=-(2w+x dot grad w)` at a fixed unit displacement gives
`grad_x q=-3 grad w-D²w x=2500 e1`; hence the full gradient bound is at least
2500. Using just this term gives reconstructed radius lower bounds
`56.72672210` at eta `.5`, and `40.11184987` at eta `1` (strictly larger for
eta below `1`). Transported unit directions have length at most one, so none
can satisfy the cutoff and the reconstructed region is empty. The example now
establishes the printed claim's failure while preserving the reconstruction.

**Dependent exercises, independent reconstruction after answer exposure.**
For the shared linear A the prolonged Jacobian is block diagonal with two
copies of A: D²f=0 removes the coupling, while CM retains sqrt(L/m). For the
shared P this is about 2.618; the true norm rate is about .382. The transfer
error and positive reconstructed radius survive. In the bump/erosion exercise,
the updated `.514` point is inside the `.545` eroded radius: erosion only removes
a boundary strip and cannot remove this interior failure. The gradient-dependent
cutoff must do that job. The separate exercise explicitly asking for epsilon
`.02` remains a standalone calculation (`r` about `.398`), so it need not follow
the counterexample's new epsilon.

**Disposition:** M5-R1 closed from the beginner perspective at the new hash.
The argument is reproducible, including the difference between an upper enclosure
and an exact bad-set measure. No new comprehension finding. The Card and
downstream interpretation require no change: the printed radius still fails
for linear f, the reconstructed radius survives, and the finite grid is not the
proof. This is no full-ten rereview or fresh general-proof/source audit. No new
browser/build run was performed by this reviewer; coordinator evidence remains
separate.
