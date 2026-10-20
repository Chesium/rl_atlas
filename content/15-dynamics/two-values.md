+++
summary = "Policy value predicts reward; a Lyapunov certificate proves decrease. Cost-to-go can connect the two."
prereqs = ["lyapunov-functions", "value-functions"]
time = "both"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §4.1; bridge to policy values", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

Why do control theory and RL both use the letter $V$? Their objects can coincide, but their jobs differ. A **policy value** predicts future reward under a specified policy and environment. A **Lyapunov certificate** is a positive function satisfying a decrease inequality for specified dynamics. A reward prediction has no built-in positivity or decrease requirement.

Hold a deterministic policy fixed and let its autonomous closed-loop state be $\phi_t(x)$ from initial state $x\in\mathbb R^p$. Here we suppress randomness to expose the calculus; stochastic RL values additionally average over random future trajectories. We will write $J$ for accumulated **cost**, $v_\pi$ for reward value, and reserve $V$ for a function after verifying its certificate properties. The names alone do not establish those properties.

### The calculation {#reasoning}

Let $\ell:\mathbb R^p\to[0,\infty)$ be a continuous state cost, with $\ell(0)=0$ and $\ell(x)>0$ for $x\ne0$. For a forward-complete flow, define the undiscounted cost-to-go

$$
J(x)=\int_0^\infty\ell(\phi_t(x))\,dt.
$$

This improper integral must be finite on the domain in question; stability by itself does not ensure integrability of every chosen cost. Assume also that $J$ is continuously differentiable there. Differentiating an infinite integral without these hypotheses would be an unjustified step. We can derive the needed identity instead by splitting off a short interval.

For $h>0$, split the cost at time $h$ and use the composition rule $\phi_{h+s}(x)=\phi_s(\phi_h(x))$:

$$
J(x)=\int_0^h\ell(\phi_t(x))\,dt+J(\phi_h(x)).
$$

The second term is the remaining cost from the state reached at $h$. Subtract $J(x)$, divide by $h$, and let $h\downarrow0$. Continuity of $\ell$ and the chain rule give

$$
\nabla J(x)^Tf(x)=-\ell(x).
$$

Thus $J$ strictly decreases away from the origin. Also $J(0)=0$. If $x\ne0$, continuity gives a short initial interval with positive cost, so $J(x)>0$. Consequently a finite continuously differentiable $J$ with these properties is a local Lyapunov certificate. Global asymptotic stability additionally needs the relevant global existence and bounded-sublevel hypotheses, for example radial unboundedness of $J$, as in [[lyapunov-functions]]. Those do not follow just by calling an integral “value.”

::: example {#undiscounted-scalar} A value that is a certificate
For $\dot x=-x$ and $\ell(x)=x^2$,

$$
\begin{aligned}
J(x)&=\int_0^\infty e^{-2t}x^2dt
=x^2/2,\\
\nabla J(x)^Tf(x)&=x(-x)=-x^2.
\end{aligned}
$$

The integral is finite, $J$ is smooth and positive definite, and $J$ is radially unbounded. We may take $V=J$, proving global asymptotic stability. In fact $\dot J=-2J$ gives energy rate $2$ and norm rate $1$.
:::

If the RL reward is $r(x)=-\ell(x)$, the corresponding undiscounted reward value is $v_\pi=-J$. Maximizing reward is then minimizing cost, but $v_\pi$ is negative away from the target and increases toward zero along this flow. Its negative, rather than the reward value itself, meets the certificate sign convention. Arbitrary rewards need not be negative state costs at all.

### Discounting changes the equation {#discounting}

For discount rate $\rho>0$ per unit time, define

$$
J_\rho(x)=\int_0^\infty
e^{-\rho t}\ell(\phi_t(x))\,dt.
$$

Splitting the integral now gives

$$
J_\rho(x)=\int_0^h e^{-\rho t}\ell(\phi_t(x))dt
+e^{-\rho h}J_\rho(\phi_h(x)).
$$

Differentiate this identity at $h=0$, assuming finiteness and differentiability of $J_\rho$:

$$
\nabla J_\rho(x)^Tf(x)
=\rho J_\rho(x)-\ell(x).
$$

There is a positive extra term. Discounting reduces the importance of distant costs and can make a value finite even when trajectories diverge.

::: example {#discounted-unstable} Finite positive value without stability
Take the unstable flow $\dot x=x$, cost $\ell(x)=x^2$, and discount rate $\rho=3$. Since $\phi_t(x)=e^tx$,

$$
J_3(x)=\int_0^\infty e^{-3t}e^{2t}x^2dt=x^2.
$$

This value is finite, smooth, positive definite and radially unbounded. Nevertheless $\dot J_3=2x^2>0$ for $x\ne0$, matching $3J_3-\ell=2x^2$. It is not a decreasing certificate, and the origin is unstable. Even these strong value-function regularity properties cannot replace a decrease check.
:::

Discounted value can still be a certificate in a particular problem. For the stable $\dot x=-x$, the same cost gives $J_\rho=x^2/(\rho+2)$ and $\dot J_\rho=-2J_\rho<0$. The correct conclusion follows from that calculation, not from discounting alone.

### The discrete counterpart {#discrete-value}

For a deterministic map $x_{k+1}=g(x_k)$, write $g^k(x)$ for $k$ successive updates and define $J_\gamma(x)=\sum_{k=0}^\infty\gamma^k\ell(g^k(x))$, when finite. Here $0<\gamma\le1$ is an RL discount factor per step; it is unrelated to a certificate residual margin also called $\gamma$ elsewhere. Splitting off the first cost gives

$$
J_\gamma(x)=\ell(x)+\gamma J_\gamma(g(x)).
$$

For $\gamma=1$, the difference is $\Delta J=-\ell$. For $0<\gamma<1$ it is

$$
\Delta J_\gamma
=\frac{1-\gamma}{\gamma}J_\gamma
-\frac1\gamma\ell.
$$

Again the sign must be checked. For $g(x)=ax$ and $\ell=x^2$, summing the geometric series gives $J_\gamma=x^2/(1-\gamma a^2)$ when $\gamma a^2<1$. This finiteness condition allows $|a|>1$ if discounting is strong enough; stability of the map still requires $|a|<1$.

### Assumptions and domain {#assumptions}

An identity for the exact cost does not automatically hold for an approximate critic learned from finite data. Approximation errors in values and their state derivatives affect a certificate residual differently. Likewise an expectation-based Bellman identity in a stochastic model is not the pointwise deterministic decrease condition used here. The present bridge is a calculus argument under the explicit finiteness, smoothness, cost and domain assumptions, not a transfer theorem for every RL value estimator.

::: question
For $g(x)=2x$, $\ell(x)=x^2$ and discount $\gamma=1/8$, compute $J_\gamma$ and its one-step change. Is the cost finite? Is it a Lyapunov certificate?
---
$\gamma a^2=1/2<1$, so $J_\gamma=2x^2$ is finite. But $\Delta J_\gamma=2(2x)^2-2x^2=6x^2>0$ away from zero. The map is unstable and this value is not a decreasing certificate.
:::

### Where it is used {#uses}

[[controller-or-certificate]], [[learning-certificates]].

## Card

### The idea {#idea}

A policy value predicts accumulated reward. A Lyapunov function proves decrease toward an equilibrium.

### Intuition and example {#intuition}

For a fixed stable policy and positive cost, the undiscounted cost-to-go $V(x)=\int_0^\infty\ell(\phi_t(x))dt$ satisfies $\nabla V^Tf=-\ell(x)$ when finite and differentiable. It is a certificate if positivity, domain and properness conditions hold. Reward maximization flips the sign. Discounting changes the identity to $\nabla V^Tf=\rho V-\ell$, so discounted value need not decrease. A good reward score alone does not prove stability.

### Assumptions and domain {#assumptions}

Finiteness, differentiability and positive state cost are essential; infinite-horizon integrals may diverge.

### Where it is used {#uses}

[[controller-or-certificate]], [[learning-certificates]].
