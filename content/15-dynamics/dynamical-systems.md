+++
summary = "Fix a controller, then study the state trajectories its closed loop generates."
prereqs = []
time = "both"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§1.1, 3.1", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

An RL policy chooses actions, but a stability question asks what the resulting physical state does over time. Before asking whether a controller returns a robot to rest, we must specify the evolution law produced by that controller. This station builds that law and the notation for its solutions.

The **state** $x\in\mathbb R^p$ is a vector containing the information needed to predict future evolution once future inputs are specified. For a moving point it might contain both position and velocity; position alone generally does not suffice. The positive integer $p$ is the state dimension. An input $u\in\mathbb R^m$ is an action or control signal, with input dimension $m$.

In continuous time a model gives a velocity:

$$
\dot x(t)=F(x(t),u(t)).
$$

Here $t\ge0$ is time, $\dot x$ is the vector of time derivatives, and $F$ maps a state and input to a state velocity. Fix a deterministic feedback policy $\pi:\mathbb R^p\to\mathbb R^m$ and substitute $u(t)=\pi(x(t))$. The **closed loop** is

$$
\begin{aligned}
\dot x(t)&=f(x(t)),\\
f(x)&:=F(x,\pi(x)).
\end{aligned}
$$

It is **autonomous**: the velocity depends on the present state, without a separate time argument. A time-varying controller or fresh random actions would require a different model; freezing network weights alone does not make a randomized policy deterministic.

### The calculation {#reasoning}

Let $\xi\in\mathbb R^p$ be the initial state, meaning $x(0)=\xi$. A **solution** is a differentiable curve whose derivative equals the specified velocity at every time. When there is a unique solution, write

$$
\phi_t(\xi):=x(t).
$$

Thus $f$ gives a velocity at one point, whereas $\phi_t$ gives the state reached after duration $t$. The family $\phi_t$ is the forward flow, on the times and initial states where solutions exist. The domain matters: not every smooth equation has solutions for all $t\ge0$.

::: example {#scalar-closed-loop} From feedback to a solved trajectory
Take a scalar plant $F(x,u)=x+u$ and policy $\pi(x)=-2x$. Substitution gives $f(x)=x-2x=-x$. Multiplying $\dot x+x=0$ by $e^t$ yields

$$
\frac{d}{dt}(e^t x(t))=0.
$$

Therefore $e^t x(t)=\xi$, so $\phi_t(\xi)=e^{-t}\xi$. Check both conditions: $\phi_0(\xi)=\xi$ and $\frac{d}{dt}\phi_t(\xi)=-\phi_t(\xi)$. From $\xi=2$, the state at time $\log 2$ is $1$.
:::

Uniqueness explains the **composition rule**. Following a solution for duration $s$ and then restarting the same autonomous dynamics for duration $t$ produces the same curve as running for $s+t$:

$$
\phi_{s+t}(\xi)=\phi_t(\phi_s(\xi)).
$$

Both curves start the second interval at $\phi_s(\xi)$ and solve the same equation; uniqueness makes them coincide. For the scalar example this is $e^{-(s+t)}\xi=e^{-t}e^{-s}\xi$. This time-shift property later lets a cost-to-go become a certificate.

An **equilibrium** $x_\star$ satisfies $f(x_\star)=0$. Its solution stays constant: $\phi_t(x_\star)=x_\star$. We usually shift coordinates to put the target equilibrium at $0$. Returning to an equilibrium is a further property, developed in [[stability]]; the equation $f(0)=0$ alone does not imply it.

### A map is a different model {#discrete-time}

In discrete time use an integer $k=0,1,2,\ldots$ and a transition map $g$:

$$
x_{k+1}=g(x_k),\qquad x_0=\xi.
$$

The scalar map $g(x)=ax$, with $a\in\mathbb R$, gives $x_k=a^k\xi$. A discrete equilibrium satisfies $g(x_\star)=x_\star$, rather than $g(x_\star)=0$. We use $g$ here to keep a next state distinct from the continuous velocity $f$; another source may use $f$ for either object after declaring its time convention.

Sampling the exact flow every $h>0$ gives the map $g_h(x)=\phi_h(x)$. For $\dot x=-x$ this is $g_h(x)=e^{-h}x$. Euler integration instead approximates it by $\widetilde g_h(x)=(1-h)x$. Those are unequal for nonzero $h$; [[time-dictionary]] shows that the approximation can even lose stability.

### Assumptions and domain {#assumptions}

State an open domain $D\subseteq\mathbb R^p$ on which $f$ is defined, an initial-state set inside $D$, and a time horizon. **Local Lipschitz continuity** means that near each point, some finite $L$ bounds velocity differences by $\|f(x)-f(y)\|\le L\|x-y\|$. Here $\|x\|=\sqrt{\sum_i x_i^2}$ is Euclidean length. Local Lipschitz continuity gives local existence and uniqueness; it does not guarantee an infinite horizon. [[ode-sensitivity]] develops that result and the compact-set continuation argument.

For a first failure case, $\dot x=x^2$ has solution $x(t)=\xi/(1-t\xi)$. From $\xi=1$ it becomes unbounded as $t$ approaches $1$. The velocity field is smooth everywhere, yet its flow from $1$ does not exist at time $2$. A **forward-invariant** set is one that solutions starting in it never leave. Trapping a solution in a compact subset of $D$ rules out this finite escape and extension through the boundary of $D$.

::: question
For the same plant $\dot x=x+u$, change the fixed policy to $\pi(x)=-x$. What are the closed-loop velocity, flow and equilibria? Does every initial state return to zero?
---
The velocity is $f(x)=0$, the flow is $\phi_t(\xi)=\xi$, and every state is an equilibrium. A nonzero initial state stays nonzero. Having a well-defined closed loop does not establish attraction.
:::

### Where it is used {#uses}

[[stability]], [[trajectories-as-samples]], [[controller-or-certificate]].

## Card

### The idea {#idea}

A fixed controller $u=\pi(x)$ turns $\dot x=F(x,u)$ into the autonomous flow $\dot x=f(x)=F(x,\pi(x))$. A discrete system instead iterates $x_{t+1}=f(x_t)$.

### Intuition and example {#intuition}

The state contains what is needed to predict the next evolution. Once the controller is fixed there is no maximization over actions in a certificate inequality. For $\dot x=-x$, the flow is $\phi_t(\xi)=e^{-t}\xi$; for $x_{t+1}=ax_t$, it is $a^t\xi$. Numerical integration approximates the first; it is not the dynamics itself. Local Lipschitz continuity supplies uniqueness, while a compact invariant subset of the open domain prevents finite escape.

### Assumptions and domain {#assumptions}

An autonomous, finite-dimensional state; specify the domain and initial-condition set. A learned controller must be held fixed during this analysis.

### Where it is used {#uses}

[[stability]], [[trajectories-as-samples]], [[controller-or-certificate]].
