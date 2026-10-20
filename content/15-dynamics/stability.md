+++
summary = "Staying near an equilibrium, approaching it, and approaching it exponentially are different properties."
prereqs = ["dynamical-systems"]
time = "both"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §4.1", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

Will a small initial error stay small, and will it eventually disappear? These are different questions. [[dynamical-systems]] defined the flow $\phi_t(\xi)$: the state reached at time $t$ from initial state $\xi$. Here $x\in\mathbb R^p$, $\|x\|$ is its Euclidean length, and the autonomous equation $\dot x=f(x)$ has equilibrium $f(0)=0$. Assume solutions are unique on the domain under discussion.

::: definition {#stability-definitions} Staying near and returning
The origin is **stable** if, for every tolerance $\epsilon>0$, there is a radius $\delta>0$ such that

$$
\|\xi\|<\delta
\ \Longrightarrow\ 
\|\phi_t(\xi)\|<\epsilon
\quad\text{for every }t\ge0.
$$

The solutions in this statement must exist for all these times. The origin is **attractive** if some radius $r>0$ has $\phi_t(\xi)\to0$ for every $\|\xi\|<r$. It is **asymptotically stable** if it is both stable and attractive.
:::

The order of the stability quantifiers does real work. First choose the acceptable error $\epsilon$; then choose one initial radius $\delta$ that works for every initial state in that ball and every future time. Choosing a different $\delta$ at each time would only describe finite-time control of errors. Stability also allows a permanently small error: convergence is not part of its definition.

### The calculation {#reasoning}

::: example {#decay-and-rotation} Two stable systems, different destinations
For $\dot x=-x$, the scalar solution is $\phi_t(\xi)=e^{-t}\xi$. Because $e^{-t}\le1$, choosing $\delta=\epsilon$ proves stability. Because $e^{-t}\to0$, every initial state converges to zero: the equilibrium is globally asymptotically stable.

Now consider the plane $x=(x_1,x_2)$ with $\dot x_1=-x_2$, $\dot x_2=x_1$. Differentiate squared length:

$$
\frac{d}{dt}(x_1^2+x_2^2)
=2x_1(-x_2)+2x_2x_1=0.
$$

Hence $\|\phi_t(\xi)\|=\|\xi\|$. Again $\delta=\epsilon$ proves stability, but every nonzero initial state stays at its original distance. Rotation is stable and not attractive.
:::

The unstable comparison is $\dot x=x$. Its solution is $e^t\xi$. Fix $\epsilon=1$. For any proposed $\delta>0$, choose $0<\xi<\min\{\delta,1\}$. At time $\log(1/\xi)$ the state reaches $1$. No single initial radius works for all future times, so stability fails.

### A quantitative promise {#exponential}

The origin is **locally exponentially stable** if there are constants $r>0$, $C\ge1$ and $\alpha>0$ such that

$$
\|\phi_t(\xi)\|
\le C e^{-\alpha t}\|\xi\|,
\quad \|\xi\|<r,\quad t\ge0.
$$

The constants are fixed for the whole stated initial ball. This implies stability: use $\delta=\min\{r,\epsilon/C\}$. It implies attraction because the right side tends to zero. The rate $\alpha$ measures decay of **length**; squared length has the rate $2\alpha$. In discrete time the corresponding norm bound is $C\rho^k\|\xi\|$, with integer $k\ge0$ and $0<\rho<1$.

Asymptotic stability need not supply an exponential rate. For $\dot x=-x^3$, solving gives

$$
\phi_t(\xi)=\frac{\xi}{\sqrt{1+2\xi^2t}}.
$$

Its length never increases and tends to zero, proving global asymptotic stability. But no fixed $C,\alpha,r$ can give the exponential bound. If they could, dividing by $|\xi|$ for nonzero $\xi$ and sending $\xi\to0$ at any fixed $t$ would give $1\le Ce^{-\alpha t}$ for every $t$, which fails when $t>\log C/\alpha$. Arbitrarily small states decay arbitrarily slowly relative to their starting size.

Exponential stability does not require the Euclidean norm to decrease at each instant. For the running linear system

$$
A=\begin{bmatrix}-1&3\\0&-2\end{bmatrix},
\qquad \dot x=Ax,
$$

take $\xi=(3/2,1)^T$. At time zero,

$$
\frac{d}{dt}\|x\|^2
=2\xi^TA\xi=1/2>0.
$$

Some lengths initially grow. [[lyapunov-equation]] constructs a different positive quadratic quantity that strictly decreases and proves exponential decay with a prefactor $C$. The matrix is **nonnormal**, meaning $A^TA\ne AA^T$; its eigenvectors need not be perpendicular, allowing this transient geometry.

### Assumptions and domain {#assumptions}

**Local** means an initial neighborhood of the equilibrium is covered. **Global asymptotic stability** means stability plus attraction from every initial state in $\mathbb R^p$, with forward existence for all of them. Global exponential stability uses the same $C,\alpha$ for every initial state. A regional theorem can instead name an invariant domain. Its conclusion does not automatically extend beyond that domain.

For example $\dot x=-x+x^3$ pulls states with $|x|<1$ toward zero, but $x=1$ is another equilibrium. Thus global attraction to zero is impossible. These distinctions matter when a learned certificate is tested only on a bounded region: a regional decrease calculation cannot establish a global claim.

::: question
A bound says $\|\phi_t(\xi)\|\le3e^{-2t}\|\xi\|$ whenever $\|\xi\|<1$. Give an initial radius ensuring $\|\phi_t(\xi)\|<0.1$ for all $t\ge0$. What can you conclude about global stability?
---
Choose $\delta=0.1/3=1/30$, which is below $1$. Then $3e^{-2t}\|\xi\|<0.1$ for all time. This proves the requested local tolerance statement and local exponential stability. The bound says nothing about initial states outside the unit ball, so it does not establish global stability.
:::

### Where it is used {#uses}

[[lyapunov-functions]], [[incremental-stability]].

## Card

### The idea {#idea}

Stability means every tolerance $\epsilon>0$ admits a radius $\delta>0$ such that $\|x(0)\|<\delta$ implies $\|x(t)\|<\epsilon$ for all future times. Asymptotic stability also requires convergence to the equilibrium.

### Intuition and example {#intuition}

Exponential stability strengthens convergence to $\|x(t)\|\le Ce^{-\alpha t}\|x(0)\|$, uniformly over the stated initial set. In discrete time use $C\rho^t$, $0<\rho<1$. A center can be stable without attracting anything. A stable nonnormal matrix can temporarily amplify Euclidean length before decaying; eigenvalues describe eventual behavior, not absence of transients. The Lab linear system deliberately shows this.

### Assumptions and domain {#assumptions}

Local and global are different claims. Global convergence requires the whole state space and solutions defined for all future time.

### Where it is used {#uses}

[[lyapunov-functions]], [[incremental-stability]].
