+++
summary = "A changing positive metric can reveal shrinking trajectory distances hidden by Euclidean transients."
prereqs = ["variational-dynamics", "lyapunov-equation", "incremental-stability"]
time = "continuous"
sources = [{ text = "Lohmiller and Slotine, On Contraction Analysis for Non-linear Systems", kind = "paper", locator = "Automatica 34(6), 1998, §§2–3, generalized metric", review = "located", url = "https://doi.org/10.1016/S0005-1098(98)00019-3" }]

[story]
scene = "flow"
world = "linear"
metric = true
+++

## Story

::: step { at = 0 }

Start eight trajectories from independent initial states. They all follow the same fixed linear dynamics. No agent chooses an action.
:::

::: step { at = 25 }

Euclidean distance can grow briefly even though the eigenvalues are stable. The dotted ellipses show how a positive metric measures displacement.
:::

::: step { at = 75 }

The trajectories turn inward. A differential inequality controls every infinitesimal direction when it holds throughout the domain.
:::

::: step { at = 150 }

A finite picture illustrates the calculation; the theorem supplies the guarantee under its assumptions. Seed 1, the matrix [−1, 3; 0, −2], RK4 step 0.02, three seconds.
:::


## Textbook

### The idea {#statement}

The stable linear system used in [[lyapunov-equation]] can initially stretch Euclidean distances. Can another geometry reveal uniform forgetting of initial conditions? A contraction metric assigns a positive quadratic length to a displacement at each state, and requires that length to shrink along every run.

Let $\dot x=f(x)$ be a continuously differentiable vector field on an open neighborhood of a region $S\subseteq\mathbb R^p$. Assume every solution from $S$ exists for all $t\ge0$ and remains in $S$. Write $\phi_t(\xi)$ for that solution and $J(x)=Df(x)$ for the Jacobian. By [[variational-dynamics]], a transported tangent vector satisfies $\dot{\delta x}=J(x(t))\delta x$.

A metric here is a continuously differentiable, symmetric matrix function $M(x)\in\mathbb R^{p\times p}$ with $v^TM(x)v>0$ for every nonzero vector $v$. Its squared differential length is

$$E(x,\delta x)=\delta x^TM(x)\delta x.$$

Assume uniform constants $0<m\le L<\infty$ give $mI\preceq M(x)\preceq LI$ throughout $S$. In scalar terms this says $m\|v\|^2\le v^TM(x)v\le L\|v\|^2$ for every $x\in S,v\in\mathbb R^p$. The lower bound prevents length from hiding a large displacement; the upper bound prevents the initial length from being arbitrarily inflated.

### The calculation {#reasoning}

All three factors of $E$ move. For a state-dependent metric define its derivative along the flow, entry by entry, as

$$\dot M(x)=\sum_{i=1}^p f_i(x)\frac{\partial M(x)}{\partial x_i}.$$

This is not the Jacobian of $M$ treated as a matrix. It is the rate at which the matrix entries change on the particular trajectory. The product rule gives

$$\begin{aligned}
\frac{d}{dt}E
&=(\dot{\delta x})^TM\delta x
  +\delta x^T\dot M\delta x\\
&\quad+\delta x^TM\dot{\delta x}\\
&=\delta x^T(J^TM+\dot M+MJ)\delta x.
\end{aligned}$$

Suppose a single $\alpha>0$ satisfies the matrix inequality

$$J(x)^TM(x)+\dot M(x)+M(x)J(x)
\preceq-2\alpha M(x) \label{metric-test}$$

for every $x\in S$. Then $\dot E\le-2\alpha E$. Multiplying by $e^{2\alpha t}$ and integrating gives $E(t)\le e^{-2\alpha t}E(0)$. Hence each differential **length** $\sqrt E$ shrinks by at most $e^{-\alpha t}$. The energy rate is $2\alpha$; the norm rate is $\alpha$. When $t$ is in seconds, these rates have units $\mathrm{s}^{-1}$.

For an explicitly time-dependent metric $M(x,t)$, add $\partial M/\partial t$ to $\dot M$, and require bounds and \ref{metric-test} uniformly in time. No global change of state coordinates is needed: the locally assigned lengths suffice.

### From moving vectors to the distance between two states {#paths}

A tangent vector only compares infinitesimally close runs. To connect arbitrary initial states $\xi,\zeta\in S$, take any piecewise continuously differentiable curve $c:[0,1]\to S$ joining them. Its metric length is

$$\ell_M(c)=\int_0^1
\sqrt{c'(s)^TM(c(s))c'(s)}\,ds.$$

Define $d_M(\xi,\zeta)$ as the infimum of these lengths over all such curves. An infimum is the greatest lower bound; a shortest curve need not be attained. Assume $S$ has such finite-length connecting curves. This holds, for example, in an open connected region.

Transport **every point** of the curve through the flow: $c_t(s)=\phi_t(c(s))$. Forward invariance keeps the whole transported curve in $S$. Its tangent is

$$\partial_s c_t(s)=D_\xi\phi_t(c(s))c'(s).$$

At each fixed $s$ this is exactly a transported tangent vector, so \ref{metric-test} gives

$$\ell_M(c_t)\le e^{-\alpha t}\ell_M(c).$$

The transported curve joins $\phi_t(\xi)$ to $\phi_t(\zeta)$. Since distance is the infimum of *all* joining lengths, it is no greater than this particular one. Thus for every initial curve $c$,

$$\begin{aligned}
d_M(\phi_t(\xi),\phi_t(\zeta))
&\le\ell_M(c_t)\\
&\le e^{-\alpha t}\ell_M(c).
\end{aligned}$$

Take the infimum on the right over initial curves. This proves

$$d_M(\phi_t(\xi),\phi_t(\zeta))
\le e^{-\alpha t}d_M(\xi,\zeta). \label{distance-test}$$

There is no assumption that a transported shortest curve stays shortest. The two uses of the infimum avoid that unnecessary claim.

To turn \ref{distance-test} into a Euclidean bound, first note that every joining curve satisfies

$$\ell_M(c)\ge\sqrt m\int_0^1\|c'(s)\|\,ds
\ge\sqrt m\|\xi-\zeta\|.$$

The last inequality is the triangle inequality for the integral $\zeta-\xi=\int c'(s)ds$. If $S$ is also convex, its straight segment between the endpoints is admissible and has metric length at most $\sqrt L\|\xi-\zeta\|$. Combining both bounds yields

$$\|\phi_t(\xi)-\phi_t(\zeta)\|
\le\sqrt{L/m}\,e^{-\alpha t}\|\xi-\zeta\|. \label{euclidean-bound}$$

This is incremental exponential stability with $C=\sqrt{L/m}$. On a nonconvex region, \ref{distance-test} still holds, but the straight segment may cross a hole where the inequality is unknown. The always-valid conclusion is $\|\phi_t(\xi)-\phi_t(\zeta)\|\le e^{-\alpha t}d_M(\xi,\zeta)/\sqrt m$. If one separately proves that every pair has a curve of Euclidean length at most $K\|\xi-\zeta\|$ in $S$, then $K\sqrt{L/m}$ replaces the prefactor in \ref{euclidean-bound}. Connectivity alone does not give $K=1$. Convexity supplies paths; it does **not** supply forward invariance, which must be checked separately.

### A constant metric for the nonnormal example {#linear-example}

Use the shared matrices

$$A=\begin{pmatrix}-1&3\\0&-2\end{pmatrix},
\qquad P=\begin{pmatrix}1/2&1/2\\1/2&1\end{pmatrix}.$$

For $\dot x=Ax$, $M=P$ is constant, so $\dot M=0$. Direct multiplication gives

$$\begin{aligned}
PA&=\begin{pmatrix}-1/2&1/2\\-1/2&-1/2\end{pmatrix},\\
A^TP+PA&=-I.
\end{aligned}$$

The eigenvalues of $P$ are $m=(3-\sqrt5)/4\approx0.19098$ and $L=(3+\sqrt5)/4\approx1.30902$, both positive. Since $P\preceq LI$, we have $-I\preceq-P/L$. Thus \ref{metric-test} holds with

$$\begin{aligned}
\alpha&=\frac1{2L}=\frac{3-\sqrt5}{2}\approx0.38197,\\
\sqrt{L/m}&=\frac{3+\sqrt5}{2}\approx2.61803.
\end{aligned}$$

The region is $\mathbb R^2$, which is convex and invariant, and linear solutions are complete. Therefore \ref{euclidean-bound} applies to every pair. The prefactor allows Euclidean transients even though metric distance shrinks from time zero. For a constant metric the straight segment actually minimizes length, giving $d_P(x,y)=\sqrt{(x-y)^TP(x-y)}$; this follows by applying the integral triangle inequality after a fixed square-root matrix of $P$.

At the unit displacement $v=(0.8,0.6)^T$, the Euclidean squared-length derivative is $0.16>0$, as computed in [[variational-dynamics]]. The metric energy is $v^TPv=1.16$, and its derivative is $v^T(-I)v=-1<0$. The same displacement stretches in one geometry and shrinks in the other. These are two measurements of one dynamics, not two different dynamical systems.

### A moving metric can invalidate the frozen test {#moving-example}

For $\dot x=-x$ on the invariant interval $S=(0,1)$, try the positive metric $M(x)=e^{-4x}$. It obeys $e^{-4}I\preceq M\preceq I$. Checking only $J^TM+MJ=-2M$ would suggest contraction. But

$$\dot M=4xM,\qquad J^TM+MJ+\dot M=(-2+4x)M.$$

At $x=0.75$ this is $+M$, so differential metric energy initially grows. This candidate fails the contraction test, even though the underlying scalar flow contracts in the Euclidean metric $M=1$. The derivative of the measuring rule is part of the calculation.

### Assumptions and domain {#assumptions}

The sufficient theorem uses complete unique solutions in a common forward-invariant, path-connected region, a $C^1$ symmetric positive metric with the stated uniform bounds, and \ref{metric-test} in every state and direction. Convexity, or a quantified replacement, is additionally needed for the displayed Euclidean prefactor. Lohmiller and Slotine (1998), §§2–3, especially equation (9) and Theorem 2, develops differential lengths and path integration. The explicit invariance, upper-bound, and path qualifications above state exactly what this version uses. A sampled grid cannot verify the universal matrix inequality.

### See the trajectories {#experiment}

{{flow contraction}}

The inline picture uses seed 1, **four independent training trajectories and 20 fresh holdout trajectories**. A holdout trajectory counts as a failure if any tested time has a positive largest eigenvalue of the residual matrix $J^TM+MJ+\dot M+2\alpha M$. This is a fraction of failing trajectories, not of independent time samples. State coordinates are normalized; time is in seconds. The dotted ellipses are metric unit balls, not confidence intervals. The Story uses eight trajectories for illustration; it is not the same sample size as this inline fitted experiment.

[Open the flows and certificates Lab](#/flows) for the intervention:

1. **Predict.** For the linear matrix above, predict whether Euclidean distance may grow initially while a valid metric distance decreases. The calculation at $v=(0.8,0.6)^T$ supplies a testable reason.
2. **Intervene.** Choose Linear system, Polynomial contraction metric, $n=8$, and test norm rate $\alpha=0.1\,\mathrm{s}^{-1}$. Run the bench, then change $n$ to 16 while holding the other settings fixed. Each bench uses seeds 1–20, with $n$ independent initial states and 100 holdout initial states per seed, drawn uniformly in the radius-two ball.
3. **Observe.** Record the selected seed, sampled-feasibility flag, maximum training residual, and holdout failure count out of 100. Scrub the three-second animation and toggle Metric ellipses. A larger sample need not improve every finite fit; record what occurred rather than treating monotonic improvement as a theorem.
4. **Explain.** Compare the full-matrix residual test with \ref{metric-test}. The computation uses RK4 step $0.02$ seconds, training checks every tenth point, and a fitting norm rate $\alpha+0.05$ tested at $\alpha$. This is a relative energy-decrease margin, not the fixed scalar margin of [[boffi-thm-4-2]]. The solver's finite iteration budget may leave sampled feasibility unresolved.

The time grid can miss violations between tested times, and finitely many initial states cannot cover all paths or directions throughout a region. Extra nearby-cloud states are visualization, not independent training data. These readouts illustrate and test candidates; the analytic matrix calculation above is the guarantee for the stated linear example.

### Rebuild the argument {#questions}

::: question
A metric obeys $2I\preceq M\preceq8I$ on a convex invariant region and its residual obeys $J^TM+MJ+\dot M\preceq-M$. Find a guaranteed norm rate and Euclidean pair bound. Explain both constants.
---
Here $-M=-2\alpha M$ with $\alpha=1/2$. Thus metric energy decays at rate $1$ and metric distance at rate $1/2$. The Euclidean conversion costs $\sqrt{8/2}=2$, giving $\|\phi_t(\xi)-\phi_t(\zeta)\|\le2e^{-t/2}\|\xi-\zeta\|$. The rate comes from taking a square root; the prefactor comes from comparing the metric and Euclidean lengths at the two times.
:::

::: question
A positive metric passes the matrix test on an annulus. Is it valid to join two points by their straight segment and conclude the prefactor $\sqrt{L/m}$? What else must be checked?
---
No: a segment can cross the missing central disk. One must use admissible paths staying in the annulus and prove their transported paths remain in the test region. Complete solutions, invariance, and uniform metric bounds are still needed. The intrinsic-distance bound can hold without the straight-segment bound; a separate path-length constant can convert it to a Euclidean bound.
:::

### Where it is used {#uses}

[[three-contractions]], [[boffi-thm-5-2]], [[vdp-certificates]].

## Card

### The idea {#idea}

Let $mI\preceq M(x)\preceq LI$. If $J^TM+MJ+\dot M\preceq-2\alpha M$, squared differential lengths $\delta x^TM\delta x$ decay at rate $2\alpha$.

### Intuition and example {#intuition}

Product rule: $\tfrac d{dt}(\delta x^TM\delta x)=\delta x^T(J^TM+MJ+\dot M)\delta x$, where $\dot M=\sum_i f_i\partial_iM$. Transport a joining path, integrate its shrinking differential lengths, and take the infimum over initial paths. This gives $d_M(\phi_t(\xi),\phi_t(\zeta))\le e^{-\alpha t}d_M(\xi,\zeta)$. On a convex invariant region, Euclidean separation is at most $\sqrt{L/m}e^{-\alpha t}\|\xi-\zeta\|$.

For the shared $A=[-1,3;0,-2]$, constant $P=[[1/2,1/2],[1/2,1]]$ gives $A^TP+PA=-I$, norm rate $\alpha=(3-\sqrt5)/2$, and Euclidean prefactor $(3+\sqrt5)/2$. Metric energy falls while Euclidean energy can initially grow.

### Assumptions and domain {#assumptions}

A $C^1$ positive metric, uniform $0<m\le L<\infty$, complete solutions, forward invariance, and connecting paths inside the test region. Convexity supplies the straight-segment Euclidean bound; connectivity alone does not. Include $\partial_tM$ for explicit time dependence. Lab ellipses and sampled residuals are finite numerical evidence.

### Where it is used {#uses}

[[three-contractions]], [[boffi-thm-5-2]], [[vdp-certificates]].
