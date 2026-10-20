# M16 Phases 2 and 3 independent beginner review

Reviewer: `/root/review_beginner`, assignment P23-B. Baseline: `9764c85`.
Scope: all ten Part 15 and five Part 16 lessons, read in prerequisite order;
basic derivatives, vectors, matrix multiplication and elementary probability only.
This is an agent perspective, not evidence from actual beginner students or an
independent source/proof audit. No writer or mathematical-review conclusions were
read before this review. Candidate hashes and final dispositions appear below.
Review completed 2026-10-19 (America/New_York), 02:48 UTC on October 20.

## Procedure and evidence limitation

The first raw-file read accidentally displayed exercise answers in
`dynamical-systems`, `stability` and the retained `lyapunov-functions` pilot.
Their native exercise computations below are therefore answer-exposed rechecks,
not blinded attempts. All later native exercise first reads suppress answers;
attempts are recorded before revealing the supplied solutions. Worked examples
are read as teaching material and then recomputed. No external help is used
unless explicitly recorded. The coordinator was informed of this limitation.

## Reader-task ledger

### dynamical-systems

From F(x,u)=x+u and pi(x)=-2x, obtained f(x)=-x; product rule gives
d(e^t x)/dt=0, hence phi_t(xi)=e^-t xi. At xi=2,t=log2 the state is 1.
Composition gives e^-(s+t)xi=e^-t(e^-s xi). Exact sampling gives e^-h x,
whereas Euler gives (1-h)x: the integrator is an approximation of the flow.
Answer-exposed native recheck: pi=-x makes f=0, phi=xi; all points are
equilibria and nonzero points do not return. No additional help required.

### stability

Chose tolerance first, then one delta valid for every initial point/time.
For decay, delta=epsilon works and the limit is zero. Rotation has derivative
of squared length 2x1(-x2)+2x2 x1=0, so the same delta works without attraction.
For growth e^t xi, xi<min(delta,1) reaches 1 at log(1/xi), defeating stability.
At xi=(1.5,1), Axi=(1.5,-2), so 2xi^T Axi=2(2.25-2)=0.5: transient growth
is compatible with an eventual exponential estimate.
Answer-exposed native recheck: 3e^-2t and tolerance .1 give delta=1/30;
the domain |xi|<1 prevents a global conclusion. No extra help required.

### lyapunov-functions (retained pilot)

Reperformed chain rule grad(V)^T f. With V=x1^2+x2^2 and
f=(-x1+x2,-x1-x2), cross terms cancel and Vdot=-2V. Trapping uses a sphere
minimum m_r>0 and c<m_r: a first boundary crossing would require V>=m_r
and V<=c simultaneously. Compact continuation supplies infinite time.
For strict decrease, a compact shell has Vdot<=-m<0; remaining there forever
would force V(t)<0. The quadratic sandwich then gives energy exponent c3/c2
and length exponent c3/(2c2), with prefactor sqrt(c2/c1).
Recomputed shared case at (.8,.6): Ax=(1,-1.2), Euclidean squared derivative
.16; grad(V)=(1.4,2), so certificate derivative 1.4-2.4=-1.
Answer-exposed exercise rechecks: damped oscillator gives -2x2^2, only stability
from the direct theorem; bounds 2,8,4 give energy .5 and norm .25 with factor2;
Euler decreases iff 0<h<2, factors .25 and2.25 at h=.5,2.5;
-x^3 gives -2x^4 and no uniform positive quadratic decrease near0;
positive-definite examples (a),(d); Card tasks give 2x^2(1-x^2), rotation
counterexample, norm exponent .4, and map factors .81/.9. No external help.

### lyapunov-equation

Before answer reveal: product rule yields x^T(A^T P+PA)x. Setting
P=[[a,b],[b,c]] gives equations -2a=-1,3a-3b=0,6b-4c=-1;
thus a=b=.5,c=1. Completion of squares proves positivity.
For P integral, the nonzero vector's integrand is positive at0 and near0;
decay makes the improper integral finite. Differentiating B(t) gives
A^T B+BA and endpoints 0-Q=-Q. Difference of two solutions remains constant
after transport yet tends to0, hence is0. Eigenvalues give norm rate about.382
and prefactor2.618, rather than the exact slow mode1.
Native attempt before reveal: A=-3,Q=2 gives -6P=-2, P=1/3>0;
Vdot=-2x^2=-6V, so energy rate6 and norm rate3. No extra help.

### comparison-functions

Before answer reveal: d(e^2t v)/dt<=e^2t, giving
v(t)<=e^-2t v(0)+(1-e^-2t)/2. At v0=2,t=log3/2 the result is1;
the limiting energy bound is.5, not convergence. If V>=c1|x|^2, length
ceiling is sqrt(.5/c1). r/(1+r) is K but bounded; r^2 is K-infinity;
r/sqrt(1+2r^2t) increases in r and tends to0 in t, hence KL.
Native attempt before reveal: -4V+8 gives limiting energy2; V>=2|x|^2
then gives limsup|x|<=1. Attraction to0 does not follow. No extra help.

### ode-sensitivity

Integrated xdot=f(x) to x(t)=xi+integral f(x(s))ds. Subtracting solutions
gave d(t)<=d0+L integral d; defining z=d0+L integral d gives zdot<=Lz,
so e^-Lt z is nonincreasing and d<=e^Lt d0. This is finite-horizon dependence,
not decay. Differentiating the integral equation gives Phi=I+integral J Phi,
thus Phidot=J Phi and Phi0=I. For xdot=x^2, differentiated xi/(1-t xi)
to Phi=(1-t xi)^-2. At xi=1,t=.5 this is4; exact perturbation difference
4epsilon/(1-epsilon) minus its linear part4epsilon leaves
4epsilon^2/(1-epsilon). Uniqueness and this finite-time derivative do not
extend the solution past escape t=1. Native attempt before reveal: for -2x,
phi=e^-2t xi and Phi=e^-2t; a Lipschitz constant2 gives the looser e^2t bound.
Only the exact signed dynamics proves shrinking. Help needed: B1's initial
Jacobian definition was late; the writer's repair was read and rechecked.

### converse-iss

Reproduced W=integral_0^H |phi_s(x)|^2 ds, with q=C^2 e^-2alphaH<1.
Shifting the integration endpoints gives Wdot=|phi_H(x)|^2-|x|^2
<=-(1-q)|x|^2. The lower velocity bound gives c1=integral e^-2Ls>0;
the decay upper bound supplies c2. Differentiating under the finite integral
gives gradW=2 integral Phi^T phi and the stated finite gradient constant.
Existence of this W neither places it in a chosen family nor supplies a solver.
For -x+u, integrating factor yields e^-t xi+integral e^-(t-s)u(s)ds;
input supremum gives gain1. Constant input1 tends to1. Zero-input stability
alone fails for -x+x^2u: u=1,xi=2 escapes at log2.
Native attempt before reveal: Vdot=-2x^2+2xu<=-x^2+u^2 gives
V<=e^-t V0+U^2 and |x|<=e^(-t/2)|xi|+U. Norm rate.5 is weaker than
exact rate1; neither bound asserts a fitting routine succeeds. No extra help.

### time-dictionary

Reconstructed the discrete trap: continuity maps a small eta-ball into an
R-ball; choose c below the annulus minimum. An iterate has norm<R and V<=c,
so cannot land in the annulus; it lands back inside eta. This handles jumps
without importing the continuous sphere-crossing argument. If limit V=ell>0,
the compact positive-level set has -DeltaV>=d>0, forcing eventual negative V;
thus V->0 and compact positivity converts to x->0. Global needs proper levels.
For Euler, DeltaV=[(1-h)^2-1]x^2=h(h-2)x^2, so 0<h<2. At .5 length/energy
factors are .5/.25; at2 length does not decay; at2.5 factors1.5/2.25.
In discrete metrics, next base state g(x) appears in M(g(x)), and a norm
factor rho requires squared factor rho^2. Continuous energy exponent2alpha
corresponds to norm exponentalpha. Native attempt before reveal:
(.25-1)P=-1 gives P=4/3>0; energy factor.25 and norm.5. Wrong continuous
equation with A=.5 gives P=-1, analyzing a different ODE. No extra help.

### two-values

Split J(x) at h, then use flow composition for its tail. Rearranging yields
[J(phi_h(x))-J(x)]/h=-(1/h)integral_0^h ell(phi_t(x))dt, giving
gradJ^T f=-ell. Positive finite differentiable J is then a local certificate;
properness remains a separate global premise. For -x and ell=x^2,
J=x^2/2 and Jdot=-x^2=-2J. Reward value=-J has the wrong sign for this role.
With discount rho, derivative of e^-rhoh J_rho(phi_h) gives
Jdot_rho=rho J_rho-ell; for unstable +x,rho3, J3=x^2 and derivative2x^2.
Native attempt before reveal: map2x,discount1/8 has gamma a^2=.5,
J=2x^2 and DeltaJ=8x^2-2x^2=6x^2>0: finite, not a certificate. No extra help.

### controller-or-certificate

For pi_k=-kx the plant gives (1-k)x; V_a=ax^2 gives
Vdot=2a(1-k)x^2. Changing a>0 rescales a witness; changing k changes physical
motion. At k2 residual with energy rate1 is -x^2; at k.5 derivative is ax^2.
The class ax1^2 misses x2 and cannot be positive definite in the plane even
for stable -x. At x2 and velocity error<=.1, gradient magnitude4 gives
residual uncertainty.4, so estimated-.2 allows true+.2. Fixed negative
scalar margin is impossible at the equilibrium residual0. Native attempt before
reveal: only the old recorded checks remain facts after controller retraining;
new-trajectory decrease/global stability require new analysis. No extra help.

### incremental-stability

Formed (x,y) in R^(2p), with target diagonal. Nearest diagonal point is the
coordinatewise midpoint, yielding distance |x-y|/sqrt2. W=|x-y|^2 gives
Wdot=2(x-y)^T(f(x)-f(y)); <=-2alphaW integrates to pair norm exponentalpha.
One beta, or one C/alpha pair, must cover all starting pairs and times.
For -x, initial2,-1 gives separation3e^-t, at1 about1.104.
For -a x+u, subtraction/integrating factor yields input gain1/a;
a2,mismatch.2,equal start gives .1(1-e^-2t), limit.1.
Slow dynamics -x/(1+x^2) explain why attraction alone does not forget fixed
pair separation uniformly over arbitrarily distant starting points.
Native attempts before reveal: a2,mismatch<=.6 gives .3(1-e^-2t), not necessarily
zero separation. Finite simulated pairs in [-2,2] prove neither invariance nor
the universal pair inequality; global additionally covers every real pair.
No extra help.

### variational-dynamics

Subtraction and division by epsilon gives qdot_epsilon=B_epsilon q_epsilon,
where B is the Jacobian averaged over the joining segment. As epsilon->0,
the average tends to J on the base run, yielding exact tangent equation
delta_xdot=J(x(t))delta_x. The finite displacement instead retains remainder
f(x+d)-f(x)-Jd. For -x-x^3 this is -3xd^2-d^3; at x1,d.1 the tangent
velocity-.4 differs from actual-.431 by-.031. Tangent decay is
v exp(-t-3integral x(s)^2ds), bounded by e^-t|v|.
Native attempts before reveal: at x0,d.2 actual difference-.208,
first order-.2, remainder-.008. Dividing by d makes remainder/d=-d^2->0.
For linear A finite displacement obeys Ad exactly, but at (.8,.6) squared
Euclidean derivative.16>0. Linearity does not imply monotone length. No extra help.

### contraction-metrics

Product rule must differentiate both tangent factors and M, yielding
J^TM+Mdot+MJ with Mdot=sum f_i partial_i M. Matrix residual<=-2alpha M gives
energy exponent2alpha and differential length exponentalpha.
For each admissible initial joining curve c, transport every point to c_t;
its tangent is flow sensitivity times c'. Integrating its shrinking lengths
gives length(c_t)<=e^-alphat length(c). Endpoint distance is <=this particular
length; taking the infimum over initial curves yields contraction of d_M.
No shortest-curve attainment or shortest-curve preservation is needed.
All paths give d_M>=sqrt(m)|xi-zeta|; a convex in-region straight segment gives
d_M<=sqrt(L)|xi-zeta|. Thus Euclidean prefactor sqrt(L/m) requires that geometry.
For constant shared P, PA=[[-.5,.5],[-.5,-.5]] and A^TP+PA=-I;
alpha=1/(2L) about.382,prefactor2.618. At unit(.8,.6), metric energy1.16
derivative-1 contrasts with Euclidean derivative+.16.
For moving M=e^-4x and f=-x, Mdot=4xM; total(-2+4x)M is +M at.75.
Ignoring movement of the measuring rule gives the wrong conclusion.
Native attempts before reveal: residual<=-M means alpha=.5 and prefactor2
for metric bounds2I,8I. An annulus can have straight segments crossing its
hole: use admissible in-region paths, check invariance/completeness and bounds;
a separate path-length constant can restore a Euclidean estimate. No extra help.

### three-contractions

Bellman acts on value vectors/bounded functions in sup norm, factorgamma per
operator update. Rewards cancel and transition probabilities average absolute
value differences, so the factor is gamma<1. Flow acts on states with d_M,
factor e^-alphah at elapsed timeh, energy exponenttwicealpha. Statistical
composition acts on sampled prediction sets, fixed sample then sign-dependent
supremum then expectation; multiplierLpsi need not be below1.
For {(w,w):|w|<=1}, normalized best sums are1,1,0,0, averaging.5;
doubling values gives2,2,0,0 and complexity1. Plant2x still expands physical
separation while zero-reward discounted Bellman shrinks bounded value differences.
Native attempts before reveal: neither Bellmangamma.95 nor lossLipschitz3
proves physical shrinking. For offset+7 the signed four suprema are8,-6,0,0,
still averaging.5; the fixed offset has zero-mean sign sum outside the supremum.
Absolute values prevent this cancellation (in this example the absolute
complexity becomes4). No additional Phase4 proof was needed to answer the bridge;
the general scalar composition result is explicitly invoked, not derived here.
No extra help.

### imitation-deployment

Added/subtracted expert next state at the deployed state to obtain
e_(j+1)<=rho e_j+L_u epsilon_j. Substitution gives weighted sum
rho^N e0+L_u sum rho^(N-1-j)epsilon_j; multiplying the geometric sum by
1-rho cancels middle terms. rho.5,bias.1,e0=0 yields .1,.15,.175 and
limit.2, which is an upper bound attained by the aligned scalar example.
An average expert-data error supplies no bound at newly visited states.
One-step rho<1 also cannot be imported from a continuous Euclidean estimate
with prefactorC>1; the metric/input-distance choices would need reconciliation.
Native attempts before reveal: errors(.1,0,.1) give .25*.1+.5*0+.1=.125,
versus max-error bound.175. At eta.01 failure example gives errors.01,1.005,
while substituting trainingerror predicts.015: at deployed state.01 the action
error is1. Region and uniform-error premises have to survive deployment.
No extra help.

## Blinded supplements for the initially answer-exposed lessons

Coordinator supplied these new tasks after the exposure was reported; no
expected result was read before the following calculations were sent back.
The coordinator subsequently independently verified all three supplement outputs.

1. Plant2x+u,pi=-5x: f=-3x. Product rule d(e^3t x)/dt=0 gives
   phi_t(2)=2e^-3t and phi_log2(2)=.25. Euler at h=.5 has multiplier-.5;
   exact sampling has multiplier e^-1.5. Velocity, exact endpoint map and
   approximate numerical update are distinct objects.
2. Flow -4x: |phi_t(xi)|=e^-4t|xi|<=|xi|, so delta=epsilon proves stability;
   limit0 gives attraction and C1,alpha4 gives global exponential stability.
   Zero velocity: phi=xi,delta=epsilon gives stability; nonzero states never
   converge, so attraction and exponential stability fail. A separate delta
   for each observation time is not one radius for the entire future.
3. Flow -2x+x^3,V=x^2: Vdot=-4x^2+2x^4<=-2V on |x|<=1.
   Every0<c<=1 gives a compact local sublevel; nonincrease and inward boundary
   derivative prevent first exit. Thus V(t)<=e^-2t V0 and
   |x(t)|<=e^-t|xi| for |xi|<=1, normrate1. This is regional/local;
   other equilibria at plus/minus sqrt2 rule out a global exponential claim.

All twelve later lessons' supplied native answers were revealed only after the
attempts above were recorded in this review process and sent to the coordinator;
they agree with the computations. Supplements do not retroactively turn the
first three lessons' native exercise checks into blinded evidence.

## Teaching and integration observations

The Textbooks develop arguments rather than duplicate Cards: scalar construction,
quantifier challenges, compact traps, matrix entry equations, integrating factors,
integral sensitivity, endpoint-shift converse, discrete jump trapping, cost identity,
witness/observation errors, doubled dynamics, tangent limit, transported paths,
three spaces and deployment recurrence each have an interpreted computation and
failure case. Cards retain quick assumptions/formulas without carrying the sole
explanation. No new visual quota or additional Part17/18 syllabus is required.

Story continuity was checked in source: the pilot and contraction Story use eight
illustrative paths of the same fixed nonnormal A, with RK4 .02 and three-second
scope. Pilot fitted inline figure uses four training/20 holdout trajectories;
contraction explicitly distinguishes that inline sample from Story's eight and
Lab's 100 holdout trials per seed. The Lab is finite numerical evidence, not the
matrix identity. Contraction Lab task identifies prediction, changed n, held
settings, trajectory failure unit, residual, physical rate/time units, solver
limits and finite-grid limits. B2 requests the same essential measurement clarity
for the shorter matrix-equation Lab instruction; that repair is now closed.
I did not execute the Lab or
perform rendered/browser acceptance; those remain coordinator integration work.

## Findings and final hashes

| ID | Severity and passage | Diagnosis and requested repair | Disposition |
| --- | --- | --- | --- |
| B1 | Moderate, `ode-sensitivity` Textbook `statement`, first `Jacobian Df` passage | Matrix bounded to obtain Lipschitz L before entries/dimensions were defined later. Define the p-by-p derivative matrix and its induced norm at first use. | Writer repaired; independent reread confirms definition now precedes use and later sensitivity section recalls it. Closed. |
| B2 | Moderate, `lyapunov-equation` Textbook `experiment` | Lab instruction referred to maximum residual and holdout rate without a local counting unit or quantitative record task. Add actual settings, trajectory failure unit and a reproducible observation. | Writer repaired; independently reread n8-to-16, seed1, test rate.1, trajectory failure if any tested time exceeds tolerance1e-5, record residual/flag/failure count, seconds/horizon/grid, and finite limits. Closed. |

No critical findings and zero open moderate findings. No additional moderate
findings from the other thirteen lessons. The coordinator's minor retained-pilot
rounding change was reread: from the shown exact trajectory at t1,
x1=2.6/e-1.8/e^2 and x2=.6/e^2, so the norm is approximately.7175.
It leaves the conservative bound and energy/norm explanation intact.

The beginner teaching gate passes for the raw-byte candidate hashes below,
subject to the explicitly recorded first-read exposure limitation and its
blinded supplemental remedy. This does not pass the separate mathematical,
rendered-product, or actual-student gates. No lesson edits or commits by reviewer.

| Station | Raw SHA-256 |
| --- | --- |
| dynamical-systems | `157d87fdd2ae36924f96520b9f4e9285b94f4120efaaa7b8b3078e7184232068` |
| stability | `69ec2303077c7018b9e7d94d63c141c1d3b260bd1861732afb010fa68385c0fd` |
| lyapunov-functions | `d9dbaca10fe3d12f86065eb659ceb1433a5f169180ec280afc7dbc559efe9a75` |
| lyapunov-equation | `bfba965a84f9cb20d054bfb08353e05d6411e12ce7d41315ab31fec0c41aaf2b` |
| comparison-functions | `6e6f2934b2dc5cca712b9cbf1123fd0ae1dcc70979eed3b39019c3112149c51a` |
| ode-sensitivity | `0c8a1dacd1180c8359f3a64a225cd34a84b1387f10a8fca69f01983cd4d10652` |
| converse-iss | `06c9d2b3d8da078d1725d968f2318f3099e0740634ec729337708da4069535d8` |
| time-dictionary | `5f1bba0504f621057cfb877c270d3939d4cdb0aec4f21ee3ff6e444445be82c9` |
| two-values | `a2803d01f6bf02f5aa5fa399e673256a4bd6971167188a8c7af9be2c76b28f10` |
| controller-or-certificate | `40ca5b4ac0bdb36bc801a63f90669f3c83962c2217999af90b26de6bd2716e3e` |
| incremental-stability | `253e7af53f0d90b269fa7fcacd87c448c0903c52c0f92d8d0e5ab7eb8f231d0f` |
| variational-dynamics | `6c20451763162b22cb151a76137931cd7505acfa5edbdb389e13a853bdf74de7` |
| contraction-metrics | `1a49590d6ac5e46c7668309a491a528231879a7841c0f3bd50f2440bee2b715b` |
| three-contractions | `2417de733ec31194746869ea69ebed4255618c7814d808d7660be3b57e054f9f` |
| imitation-deployment | `89313b6e849fe2f68073bffb3516cb318bf009bee52b691918170b317ec26239` |
