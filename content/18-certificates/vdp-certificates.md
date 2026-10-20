+++
summary = "Learn a polynomial metric for a positively damped oscillator and inspect its remaining violation regions."
prereqs = ["certificates-in-practice", "boffi-thm-5-2"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Figure 1 and Appendix A.5, pp.2, 18–19", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]

[story]
scene = "flow-learning"
world = "vdp"
metric = true
+++

## Story

::: step { samples = 2 }

Two trajectories leave much of the radius-two initial ball unexplored. Fit a positive polynomial metric on their sampled times; the squares show where its decrease condition still fails.
:::

::: step { samples = 8 }

Add independent initial states, rather than more points on the same two trajectories. The metric must now satisfy constraints from eight trajectories. Its holdout test uses the same fresh initial states.
:::

::: step { samples = 32 }

Thirty-two trajectories constrain more directions and regions. This seed leaves fewer violations, but that pattern is an observation. Use the Lab to compare the same settings across all 20 seeds, including the fits that do not meet their training tolerance.
:::

::: step { samples = 32, at = 25 }

The metric ellipses measure local displacement as trajectories move. A finite grid cannot check every point or every time. The conditional theorem requires smoothness, domain and true-contraction assumptions that this picture cannot establish. Seed 5, degree-four Gram metric, test rate 0.1, training rate 0.15, RK4 step 0.02, three seconds.
:::


## Textbook

### The question {#statement}

The Story fits a contraction metric to a few trajectories of a damped oscillator and counts how many fresh trajectories still violate it: $76$ of $100$ with two training trajectories, $6$ with eight, $0$ with thirty-two. Before reading on, predict what will happen to that count when you change the number of trajectories $n$, or lower the decay rate the metric is tested at. Then ask what the change can, and cannot, tell you.

This lesson builds the example from its equation, shows why the obvious certificates fail, describes exactly what the Lab measures, and separates three things that are easy to conflate: this adapted finite experiment, the paper's Figure 1, and a proof that the system contracts. It uses the readings of [[certificates-in-practice]] and the conditional theorem [[boffi-thm-5-2]].

### The damped oscillator {#system}

Appendix A.5 of Boffi et al. studies $\ddot x+a(x^2+k_0)\dot x+\omega^2x=0$ with $a=k_0=\omega=1$. The paper writes the coefficients as $\alpha$, $k$ and $\omega$; we rename them because here $\alpha$ is a damping coefficient, not a rate, and $k$ is kept for the number of certificate parameters. With $y=\dot x$ the state is $(x,y)\in\mathbb R^2$ and
$$\dot x=y,\qquad\dot y=-(x^2+1)\,y-x.$$
This is the vector field of the atlas engine (`lab/flows.js`, world `vdp`). The damping coefficient $x^2+1$ is at least $1$ everywhere. The classical Van der Pol equation $\ddot x-c(1-x^2)\dot x+x=0$ with $c>0$ instead has **negative** damping near the origin, which pumps energy in and produces a limit cycle; this positively damped variant has none of that. The Jacobian is
$$J(x,y)=\begin{bmatrix}0&1\\-2xy-1&-(x^2+1)\end{bmatrix},$$
and at the origin $J(0,0)=\begin{bmatrix}0&1\\-1&-1\end{bmatrix}$ has eigenvalues $-\tfrac12\pm\tfrac{\sqrt3}2i$: nearby trajectories spiral into the equilibrium.

### Why the obvious certificates fail {#reasoning}

**The energy $x^2+y^2$ is not a strict certificate.** Take $V(x,y)=x^2+y^2$. By the chain rule,
$$\begin{aligned}\dot V&=2x\dot x+2y\dot y\\&=2xy+2y\big(-(x^2+1)y-x\big)\\&=-2(x^2+1)\,y^2.\end{aligned}$$
So $\dot V\le0$ everywhere, but $\dot V=0$ on the whole axis $y=0$. As a rate certificate, $\dot V\le-2\alpha V$ with norm rate $\alpha=0.1$ fails at every point $(x,0)$ with $x\ne0$. At $(1.5,0)$, $\dot V=0$ while $-2\alpha V=-0.45$. It fails near the axis too: at $(1,0.1)$, $\dot V=-0.04$ and $-2\alpha V=-0.202$. Every spiraling trajectory crosses the axis, so under the Lab's holdout test essentially every trajectory would violate. A nonstrict decrease can still support convergence through LaSalle's invariance principle (Khalil, 3rd ed., §4.2), which the atlas does not develop; it gives no rate.

**The Euclidean metric is not a contraction metric.** The constant metric $M=I$ passes the test of [[contraction-metrics]] at norm rate $\alpha$ only if $J^{\mathsf T}+J+2\alpha I\preceq0$. Here
$$J^{\mathsf T}+J=\begin{bmatrix}0&-2xy\\-2xy&-2(x^2+1)\end{bmatrix},$$
and in the direction $u=(1,0)$ the test gives $u^{\mathsf T}(J^{\mathsf T}+J+2\alpha I)u=2\alpha>0$ at **every** state. The Euclidean metric's violation set is the whole plane. The Lab's metric class is $M(x)=I+B(x)^{\mathsf T}QB(x)$, and its solver starts from $Q=0$, which is exactly this failing metric. The fit must find a state-dependent $Q$-shape that makes horizontal displacements shrink.

### What the experiment measures {#measure}

- **Sampling unit.** One initial state, uniform in the disk of radius $2$. Each seed draws $n$ independent training states and, from a separate random stream, $100$ holdout states. The holdout states are the same for every $n$, and training sets are nested, so changes across $n$ are paired comparisons.
- **Fit.** A Gram metric with degree-four entries, $M\succeq I$ everywhere by construction, fitted with norm rate $\alpha+0.05$ at $16$ states per trajectory ([[certificates-in-practice]]).
- **Measured quantity.** A holdout trajectory counts as violating if the full $2\times2$ residual matrix $J^{\mathsf T}M+MJ+\dot M+2\alpha M$ has an eigenvalue above the engine's tolerance $10^{-5}$ at any of its $151$ RK4 states over three seconds. The default test rate is $\alpha=0.1$. The squares in the picture mark grid states where the same matrix test fails; they are pointwise, not trajectories.
- **Relative margin.** Fitting at $\alpha+0.05$ and testing at $\alpha$ is a margin proportional to the metric energy. It vanishes near the equilibrium and is not the fixed scalar $\gamma$ of [[boffi-thm-4-2]].

The pinned Story runs (seed 5) give $76$, $6$ and $0$ violating holdout trajectories at $n=2$, $8$ and $32$, and all three fits meet their sampled training tolerance. Hoeffding's inequality, used as in [[certificates-in-practice]] with $\delta=0.05$, bounds the checked-time violation rate of each fitted metric from either side: with probability at least $0.95$ it is at most the observed fraction plus $0.122$, and with probability at least $0.95$ it is at least the fraction minus $0.122$. So the $n=2$ rate is at least $0.638$ and the $n=8$ rate at most $0.182$, both together with probability at least $0.90$ by a union bound. The fall from $76$ to $6$ is not holdout noise. For $0$ of $100$, the exact 95% limit is about $3\%$.

### Predict, intervene, observe, explain {#predict}

**More trajectories.** Predict that violations usually fall as $n$ grows. Each independent trajectory adds decrease constraints along a new path through the disk, and regions no training trajectory visited are where the fitted metric is least constrained. [[boffi-thm-4-2]] suggests, for a fixed-margin learner with $k$ parameters, a rate of order $k\log^3n/(\gamma^2n)$, roughly $k/n$ up to logarithms and constants, and the Lab draws a dashed $2/n$ curve for comparison. That curve is a shape only: the Lab's margin is relative, its $78$ parameters have no radius bound, and the theorem's constant is unknown. Expect exceptions. One seed can get worse when $n$ grows, because a new trajectory can pull the metric away from regions the holdout visits, and some fits end with feasibility unresolved. Compare the $20$-seed bench, not one seed.

**Lower test rate.** For one fixed metric, lowering the tested rate can only shrink the violation set. If $\alpha'<\alpha$, then $2\alpha'M\preceq2\alpha M$ because $M\succ0$, so
$$J^{\mathsf T}M+MJ+\dot M+2\alpha'M\preceq J^{\mathsf T}M+MJ+\dot M+2\alpha M,$$
and a state that passes at $\alpha$ passes at $\alpha'$. This is the effect of $\eta$ in [[boffi-thm-5-2]] and in the paper's Figure 3. In the Lab, however, changing $\alpha$ also changes the training rate $\alpha+0.05$ and hence the fitted metric, so an observed change mixes two effects. The monotonicity is guaranteed only with the metric held fixed.

**Explain.** A count is evidence about this procedure, this seed and this test. To explain a change, name its source: more constraints, a different test rate, a different fitted metric, or the finite holdout. The Lab's readout and bench give the numbers; the theorems give conditional reasons for the trend.

### Adapted from the paper, not reproduced {#adaptation}

The atlas keeps the paper's dynamics, initial disk of radius $2$, three-second horizon, degree-four metric entries and $M\succeq I$ (Appendix A.5). It changes the rest.

- **Integration.** Paper: time step $0.005$, $600$ steps. Lab: RK4 with step $0.02$, $150$ steps.
- **Constraints.** Paper: $50$ per trajectory. Lab: $16$ states, four directions and cutting planes.
- **Derivatives.** Paper: numerical, from fitted splines and from pairs of nearby trajectories kept within tolerances ($\|\delta x\|\le5\times10^{-3}$, $\|\delta x(t)\|\le10^{-2}$). Lab: analytic $f$ and Jacobian.
- **Solver.** Paper: a sum-of-squares program. Lab: Dykstra projections with a $250$-iteration budget.
- **Rate.** Paper: $\lambda=3/4$, tested with $\eta=1$ in Figure 1. A.5 prints the test as $\ldots+\dot M\preceq-2\eta\lambda$, without $M$ on the right; we read it as $\preceq-2\eta\lambda M$, the natural reading and the form of the paper's metric condition. Lab: test norm rate $0.1$, fit $0.15$. The paper's training constraint (Algorithm 1) uses energy rate $\lambda$, while its test uses norm rate $\eta\lambda$; in the atlas convention these differ by a factor $2$.
- **Scale and evaluation.** Paper: $n$ from $100$ to $1000$, violation regions on a $9\times10^4$-point grid. Lab: $n$ from $2$ to $32$, $100$ holdout trajectories and a display grid.

So the Lab is an **adapted reproduction of the violation-set idea**, not a numerical reproduction of Figure 1, whose shapes and percentages should not be expected to match. Nor is it a proof. Theorem 5.2 would need true contraction of this system in some metric, which the Lab does not check, a uniform measure over states and directions, smoothness constants, and the eroded, time-dependent region. Even then its printed radius needs the correction discussed in [[boffi-thm-5-2]]. The quadruped experiment of the paper uses a high-dimensional simulated robot and remains outside this Lab.

### See the trajectories {#experiment}

{{flow vdp}}

[Open the flows and certificates Lab](#/flows). The inline figure is one small run (seed 1, $n=4$, $20$ holdout trajectories); its count is a single finite outcome. The pictures and holdout rates are numerical evidence.

### Assumptions and domain {#assumptions}

- Finite horizon, finite time grid, finite holdout, finite display grid; nothing here covers all times, states or directions.
- Relative margin at the Lab's own rates, not the fixed margin of Theorem 4.2 or the paper's $\lambda=3/4$.
- One seed's counts need not decrease monotonically in $n$; trends belong to the bench.
- True contraction, the premise of [[boffi-thm-5-2]], is assumed by the theorem and untested by the experiment.

### Exercises {#exercises}

::: question
For $V=x^2+y^2$, compute $\dot V$ at $(0,1)$ and $(1,0)$. At which of the two does $\dot V\le-2\alpha V$ hold with $\alpha=0.1$?
---
$\dot V=-2(x^2+1)y^2$. At $(0,1)$: $\dot V=-2$ and $-2\alpha V=-0.2$, so it holds. At $(1,0)$: $\dot V=0>-0.2$, so it fails. The decrease vanishes on the $x$-axis, where the velocity is purely vertical and the damping term $-(x^2+1)y$ is zero.
:::

::: question
Show that the Euclidean metric fails the contraction test at every state, whatever $\alpha>0$. Which displacement direction is responsible, and why physically?
---
With $u=(1,0)$, $u^{\mathsf T}(J^{\mathsf T}+J)u=2J_{11}=0$, so the test value is $2\alpha>0$. A purely horizontal displacement $\delta x=(1,0)$ has $\dot{\delta x}=J\delta x=(0,-2xy-1)$: it rotates into the vertical direction without shrinking at first. Only the damping acts on vertical displacements, so Euclidean length does not decrease instantaneously in that direction.
:::

::: question
A fitted metric is tested at $\alpha=0.1$ and $0.05$ without refitting. Can the second test show more violating holdout trajectories? In the Lab, where changing $\alpha$ refits, can it?
---
Without refitting, no: $\alpha'<\alpha$ and $M\succ0$ give a smaller residual matrix at every state, so every passing state still passes. In the Lab the training rate $\alpha+0.05$ changes too, the fitted metric changes, and the count can move either way.
:::

::: question
The seed-5 counts are $76$, $6$, $0$ on the same $100$ holdout trajectories. Does this show that violations fall as $n$ grows for this system? Does $0$ of $100$ confirm the conclusion of Theorem 5.2 for the $n=32$ metric?
---
For this seed, the fall from $76$ to $6$ exceeds holdout noise (lower limit $0.638$ against upper limit $0.182$). It says nothing about other seeds; the $20$-seed bench addresses the typical behavior, still only at finite $n$. For the second question, no: $0$ of $100$ bounds this metric's checked-time violation rate by about $3\%$. Theorem 5.2 needs true contraction, which is unchecked, and concludes a matrix inequality on a whole region, for every direction and time, which no finite test establishes.
:::

### Where it is used {#uses}

[[boffi-thm-5-2]].

## Card

### The idea {#idea}

The damped oscillator $\dot x=y$, $\dot y=-(x^2+1)y-x$ has damping $x^2+1\ge1$ everywhere. A degree-four Gram metric fitted on $n$ independent trajectories is tested on $100$ fresh ones; violation counts fall as $n$ grows (seed 5: $76$, $6$, $0$ at $n=2,8,32$). This is an adapted, finite experiment.

### Intuition and example {#intuition}

Naive certificates fail: $V=x^2+y^2$ gives $\dot V=-2(x^2+1)y^2$, zero on $y=0$, so no strict rate; the Euclidean metric fails the contraction test in the direction $(1,0)$ at every state. A learned state-dependent metric is needed, and more independent trajectories constrain it in more regions. For a fixed metric, a lower tested rate can only shrink the violation set.

The Lab keeps the paper's dynamics, radius-two disk, three-second horizon and metric degree, but uses RK4 at $0.02$, analytic derivatives, $16$ constraint states per trajectory, a Dykstra Gram solver and a relative margin (fit $0.15$, test $0.1$). It reproduces the violation-set idea, not Figure 1.

### Assumptions and domain {#assumptions}

Finite horizon, time grid, holdout and display grid; one seed need not be monotone in $n$. The relative margin is not Theorem 4.2's fixed margin. Theorem 5.2's true-contraction premise is not tested, so no count here proves contraction.

### Where it is used {#uses}

[[boffi-thm-5-2]].
