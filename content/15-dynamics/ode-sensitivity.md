+++
summary = "Regularity gives unique flows; differentiating them gives the evolution of infinitesimal perturbations."
prereqs = ["dynamical-systems"]
time = "continuous"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§3.1–3.4", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

If we slightly change an initial state, do we obtain a nearby trajectory? A flow notation such as $\phi_t(\xi)$ already assumes that the state at time $t$ is determined by the initial state $\xi$. We first justify this uniqueness, then quantify dependence on $\xi$, and finally differentiate that dependence. These are prerequisites for the finite-displacement and infinitesimal arguments in Part 16.

Let $D\subseteq\mathbb R^p$ be open and $f:D\to\mathbb R^p$ be locally Lipschitz. A continuous curve $x(t)$ solves $\dot x=f(x)$, $x(0)=\xi$, exactly when it solves the integral equation

$$
x(t)=\xi+\int_0^t f(x(s))\,ds.
$$

The equivalence follows from integrating the ODE in one direction and the fundamental theorem of calculus in the other. Local Lipschitz continuity bounds $\|f(x)-f(y)\|$ by $L\|x-y\|$ in a sufficiently small neighborhood. For a continuously differentiable $f$, its **Jacobian** $Df(x)$ is the $p\times p$ matrix whose entry $(i,j)$ is $\partial f_i/\partial x_j$: how the $i$th velocity component changes with the $j$th state coordinate. A bound on this matrix's induced Euclidean norm, $\|Df(x)\|=\sup_{\|v\|=1}\|Df(x)v\|$, on a convex neighborhood supplies such an $L$ by integration along line segments.

### The calculation {#reasoning}

Local existence can be understood by successive approximation. Choose a closed ball around $\xi$ lying inside $D$, with radius $r$, velocity bound $\|f\|\le M$, and Lipschitz constant $L$. For small enough $\tau>0$, both $M\tau\le r$ and $L\tau<1$. On continuous curves in this ball, the operation

$$
(\mathcal Tz)(t):=\xi+\int_0^t f(z(s))\,ds
$$

keeps curves in the ball and reduces their maximum difference by a factor at most $L\tau$. Starting from the constant curve $z_0=\xi$, the successive differences of $z_{j+1}=\mathcal Tz_j$ are bounded by a geometric series. The curves therefore converge uniformly to a curve $z$; continuity permits passing the limit through the integral, so $z=\mathcal Tz$. A second fixed curve would have maximum difference at most $L\tau$ times that same difference, forcing it to be zero. This supplies local existence and uniqueness. Khalil §3.1, Theorem 3.1 gives the general time-dependent version.

To extend the uniqueness argument and estimate errors, let $x(t)=\phi_t(\xi)$ and $y(t)=\phi_t(\zeta)$ stay in a common region where a single Lipschitz constant $L\ge0$ applies. Subtract their integral equations and take norms:

$$
\begin{aligned}
d(t)&:=\|x(t)-y(t)\|,\\
d(t)&\le d_0+L\int_0^t d(s)\,ds,\\
d_0&:=\|\xi-\zeta\|.
\end{aligned}
$$

Here is the needed Grönwall argument. Put $z(t)=d_0+L\int_0^t d(s)ds$. Then $d\le z$, $z(0)=d_0$ and $\dot z=Ld\le Lz$. The integrating factor $e^{-Lt}$ yields $z(t)\le d_0e^{Lt}$, so

$$
\|\phi_t(\xi)-\phi_t(\zeta)\|
\le e^{Lt}\|\xi-\zeta\|.
$$

If $\xi=\zeta$, the bound is zero: solutions cannot separate. For different initial states it proves continuous dependence over every fixed finite horizon. It permits exponential **growth**, so it is not a contraction theorem. Even $\dot x=-x$ has Lipschitz constant $L=1$; this general estimate gives $e^t$, although its exact separation is $e^{-t}$. A Lipschitz norm discards the directional signs needed to show decay.

### Differentiating a flow {#sensitivity}

Now assume $f$ is continuously differentiable and nearby initial states have solutions on a common finite interval. Write $J(x)=Df(x)$ for the $p\times p$ Jacobian defined above. Define the sensitivity matrix

$$
\Phi(t,\xi)=D_\xi\phi_t(\xi).
$$

Its $j$th column tells how the endpoint changes to first order when the $j$th initial coordinate changes. Differentiating the integral equation gives

$$
\Phi(t,\xi)=I+\int_0^t
J(\phi_s(\xi))\Phi(s,\xi)\,ds,
$$

and therefore

$$
\dot\Phi=J(\phi_t(\xi))\Phi,
\qquad \Phi(0,\xi)=I.
$$

The initial matrix is the identity because $\phi_0(\xi)=\xi$. Continuous differentiability is what justifies the differentiation, rather than an assumption that all Lipschitz maps have a derivative. One way to see the justification is to subtract two integral equations, divide by the initial displacement, and write the velocity difference using the integral of $J$ along the joining segment. Continuous dependence makes those averaged Jacobians approach $J(\phi_s(\xi))$ uniformly on a finite interval. The same Grönwall estimate controls the remaining difference from the displayed linear integral equation. Khalil §3.3 develops this sensitivity argument, including parameter dependence.

For a direction $v\in\mathbb R^p$ and small scalar $\varepsilon$, differentiability means

$$
\begin{aligned}
\phi_t(\xi+\varepsilon v)
&=\phi_t(\xi)+\varepsilon\Phi(t,\xi)v\\
&\quad+o(|\varepsilon|).
\end{aligned}
$$

The remainder divided by $|\varepsilon|$ tends to zero. Thus $\delta x(t)=\Phi(t,\xi)v$ evolves by $\dot{\delta x}=J(\phi_t(\xi))\delta x$. It is a derivative along one base trajectory, not an exact difference of arbitrary trajectories. For linear $f(x)=Ax$ it is exact: $\Phi(t,\xi)=e^{At}$, independent of $\xi$.

### Assumptions and domain {#assumptions}

::: example {#escape-sensitivity} Uniqueness without infinite existence
For $\dot x=x^2$ and initial $\xi>0$, separation of variables gives

$$
\phi_t(\xi)=\frac{\xi}{1-t\xi},
\qquad 0\le t<1/\xi.
$$

Differentiating gives $\Phi(t,\xi)=(1-t\xi)^{-2}$. It satisfies $\dot\Phi=2\phi_t(\xi)\Phi$ and $\Phi(0,\xi)=1$, as predicted. At $\xi=1$, $t=1/2$, the sensitivity is $4$. A perturbation $\varepsilon$ changes the endpoint by exactly $4\varepsilon/(1-\varepsilon)$; subtracting the linear prediction $4\varepsilon$ leaves $4\varepsilon^2/(1-\varepsilon)$. This is small relative to $\varepsilon$ near zero, but not near escape.
:::

Although $x^2$ is smooth, its trajectories may escape in finite time. The continuation theorem (Khalil §3.1, Theorem 3.3) says that a solution trapped in a compact subset of the open domain $D$ extends for all future time. The compact subset must stay inside $D$; mere boundedness near a missing domain boundary is insufficient. Uniform bounds used across many trajectories likewise need a common region and horizon.

The numerical quotient $[\phi_t(\xi+\varepsilon v)-\phi_t(\xi)]/\varepsilon$ approximates sensitivity. Large $\varepsilon$ leaves nonlinear error; extremely small $\varepsilon$ magnifies numerical integration and subtraction errors. A plotted quotient is a finite numerical check, not a proof of differentiability or a uniform bound.

::: question
For $\dot x=-2x$, compute the flow, its sensitivity, and the generic Lipschitz separation bound. Which expression actually proves shrinking separation?
---
The flow is $e^{-2t}\xi$ and $\Phi=e^{-2t}$. The velocity has Lipschitz constant $L=2$, so the generic bound is $e^{2t}|\xi-\zeta|$. The exact difference $e^{-2t}|\xi-\zeta|$ proves shrinking separation; the generic bound proves only continuous dependence.
:::

### Where it is used {#uses}

[[variational-dynamics]], [[trajectories-as-samples]].

## Card

### The idea {#idea}

If $f$ is locally Lipschitz, solutions are locally unique. If $f$ is continuously differentiable, $\Phi(t)=D_\xi\phi_t(\xi)$ satisfies $\dot\Phi=Df(\phi_t(\xi))\Phi$, $\Phi(0)=I$, on the common interval where the flow exists.

### Intuition and example {#intuition}

Compare two integral solutions and apply Grönwall: on a common region with Lipschitz constant L, their distance is at most $e^{Lt}$ times their initial distance. This proves continuous dependence but permits exponential growth. Differentiating the integral equation gives sensitivity. A numerical difference of nearby trajectories approximates this derivative only while the displacement is small; subtraction error and nonlinear terms both matter.

### Assumptions and domain {#assumptions}

Local existence does not imply an infinite horizon: $\dot x=x^2$ escapes in finite time for positive initial states. State a common invariant compact region before using uniform derivative bounds.

### Where it is used {#uses}

[[variational-dynamics]], [[trajectories-as-samples]].
