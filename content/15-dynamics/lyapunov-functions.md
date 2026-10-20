+++
summary = "A positive function that decreases along every trajectory can prove stability and attraction without solving the dynamics."
prereqs = ["stability"]
time = "both"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§4.1–4.2, 4.5", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]

[story]
scene = "flow"
world = "linear"
metric = false
+++

## Story

::: step { at = 0 }

Eight initial states are drawn independently from the disk of radius two. Every one of them moves by the same fixed linear dynamics $\dot x=Ax$ with $A=\begin{pmatrix}-1&3\\0&-2\end{pmatrix}$. No agent chooses an action. The question is whether all of them, and every other initial state, must end at the origin.
:::

::: step { at = 25 }

Both eigenvalues of $A$, $-1$ and $-2$, are negative, so the states do head home eventually. Yet distance to the origin is not a reliable measure of progress here: at the state $(0.8,\,0.6)$, for example, it is increasing. The effect is small for this matrix and hard to see among these eight paths, but it means distance cannot serve as a proof.
:::

::: step { at = 75 }

The tilted ellipses are the levels 0.5, 1, 2, 4 and 8 of one function, $\cert{V(x)}=x^TPx$, with $P$ chosen so that $A^TP+PA=-I$. Along every trajectory $\dot V=-\|x\|^2$, which is negative away from the origin. So each path crosses each ellipse inward and can never cross back out.
:::

::: step { at = 150 }

After three seconds (seed 1, RK4 steps of 0.02) all eight states are close to the origin. The picture shows eight trajectories; the calculation of $\dot V$ holds at every state, and that calculation, not the picture, is what proves the claim.
:::


## Textbook

### Deciding convergence without solving {#motivation}

Hold a controller fixed and its closed loop becomes a system that moves by itself ([[dynamical-systems]]). The question we usually care about is simple to state: if the state starts near a target, does it stay near, and does it eventually arrive? For the scalar system $\dot x=-x$ we can write the solution $x(t)=e^{-t}x(0)$ and read off the answer. For a pendulum, a Van der Pol oscillator or a closed loop with a learned controller, no formula for the solution is available.

Simulation does not settle the question either. It produces finitely many trajectories, and the claim concerns every initial state in a region, including the ones we did not try. What we always do have is the vector field $f$: the formula that gives the velocity at each state. This lesson develops a test that uses only $f$.

The idea comes from mechanical energy. A pendulum with friction loses energy as it swings, and energy is zero only at rest at the bottom. Energy that is positive away from rest and keeps decreasing must push the pendulum toward rest. Lyapunov's insight was that any function with these two properties, positivity and decrease, does the same job, whether or not it is a physical energy. Such a function is called a Lyapunov function or certificate. The work below is to make "decreasing along trajectories" computable from $f$, and to show exactly why positivity and decrease force the conclusions.

### Flows, equilibria and two kinds of good behavior {#setting}

We first recall the objects of [[stability]] in the form we will use them.

The **state** is a vector $x\in\mathbb R^p$. The dynamics are an autonomous ordinary differential equation
$$\dot x=f(x),\qquad x(0)=\xi, \label{ode}$$
where $\dot x$ is the time derivative, the **vector field** $f:U\to\mathbb R^p$ gives the velocity at each state, and $\xi$ is the **initial state**. "Autonomous" means that $f$ does not depend on time; a fixed controller has already been substituted into it. The set $U\subseteq\mathbb R^p$ is an open set containing the origin: around every point of $U$ some small ball also lies in $U$. All norms $\|x\|=\sqrt{x^Tx}$ are Euclidean.

Throughout, $f$ is continuously differentiable on $U$. This is a convenient sufficient condition, not a necessary one: Khalil assumes only that $f$ is locally Lipschitz (near each point there is a constant $L$ with $\|f(x)-f(y)\|\le L\|x-y\|$ for all nearby $x,y$; every continuously differentiable $f$ has this property), and later lessons work with weaker assumptions stated there. We use one standard fact about such equations and do not prove it here (Khalil, §3.1 and Theorem 3.3; [[ode-sensitivity]]). From each $\xi\in U$ there is exactly one solution, at least for a short time. It continues for all $t\ge0$ whenever we know that it stays inside a **compact** subset of $U$, that is, a set that is bounded and closed (it contains the limit of every convergent sequence of its points). The danger the fact rules out is a solution that runs off to infinity, or out of $U$, in finite time.

The **flow** $\phi_t(\xi)$ is the state at time $t$ of the solution that starts at $\xi$. So $\phi_0(\xi)=\xi$ and $\tfrac{d}{dt}\phi_t(\xi)=f(\phi_t(\xi))$.

An **equilibrium** is a state where the velocity vanishes. We place it at the origin, $f(0)=0$, so that $\phi_t(0)=0$ for all $t$. (An equilibrium $x^\ast\ne0$ is moved to the origin by the change of variables $y=x-x^\ast$.)

::: definition {#def-stability} Stability and attraction
The equilibrium $0$ of \ref{ode} is

- **stable** if for every tolerance $\epsilon>0$ there is a radius $\delta>0$ such that $\|\xi\|<\delta$ implies $\|\phi_t(\xi)\|<\epsilon$ for all $t\ge0$;
- **attractive** if there is a radius $r_0>0$ such that $\|\xi\|<r_0$ implies $\phi_t(\xi)\to0$ as $t\to\infty$;
- **asymptotically stable** if it is both stable and attractive.

It is **globally** asymptotically stable if it is stable and $\phi_t(\xi)\to0$ for every $\xi\in\mathbb R^p$.
:::

The order of the quantifiers matters. In stability, a challenger names a tolerance $\epsilon$ first, and we must answer with a starting radius $\delta$ that keeps the whole future within $\epsilon$. (Here $\delta$ is a radius in state space; in the learning-theory lessons the same letter is a failure probability.) Stability is about **staying close**. Attraction is about **converging**. These are different properties, and two small systems separate them.

::: example {#ex-two-systems} Decay and rotation
For $\dot x=-x$ in one dimension, $\phi_t(\xi)=e^{-t}\xi$. Then $|\phi_t(\xi)|\le|\xi|$, so $\delta=\epsilon$ answers every challenge, and $\phi_t(\xi)\to0$ for every $\xi$. The origin is globally asymptotically stable.

For the rotation $\dot x_1=-x_2,\ \dot x_2=x_1$ in the plane, the solution is $\phi_t(\xi)=(\xi_1\cos t-\xi_2\sin t,\ \xi_1\sin t+\xi_2\cos t)$. Differentiating confirms $\dot x_1=-x_2$ and $\dot x_2=x_1$. Each state circles the origin at a constant distance, $\|\phi_t(\xi)\|=\|\xi\|$. Again $\delta=\epsilon$ works, so the origin is stable. But no state other than $0$ approaches it: the origin is stable and not attractive.
:::

Both checks above used the solution formula. That is exactly what we cannot do in general, so we need a way to reach the same conclusions from $f$ alone.

### The rate of change of a function along trajectories {#lie-derivative}

Let $V:U\to\mathbb R$ be a continuously differentiable scalar function. Its **gradient** is the column vector of partial derivatives $\nabla V(x)=\big(\partial V/\partial x_1,\dots,\partial V/\partial x_p\big)^T$. Where $\nabla V(x)\ne0$, it points in the direction in which $V$ increases fastest, perpendicular to the level set $\{V=\text{const}\}$ through $x$.

::: definition {#def-posdef} Positive definite function
$V$ is **positive definite** on $U$ if $V(0)=0$ and $V(x)>0$ for every $x\in U$ with $x\ne0$.
:::

Positivity lets $V$ act as a generalized distance: small values of $V$ will mean "near the origin". The second ingredient is how $V$ changes as the state moves. Follow one trajectory and record $v(t)=V(\phi_t(\xi))$. By the chain rule, applied to the composition of $V$ with the curve $t\mapsto\phi_t(\xi)$,
$$\frac{d}{dt}V(\phi_t(\xi))=\sum_{i=1}^p\frac{\partial V}{\partial x_i}(\phi_t(\xi))\,\frac{d}{dt}\big(\phi_t(\xi)\big)_i=\nabla V(\phi_t(\xi))^T f(\phi_t(\xi)). \label{chain}$$
The right-hand side depends on time only through the current state. This motivates the definition
$$\dot V(x)=\nabla V(x)^Tf(x), \label{lie}$$
called the **derivative of $V$ along trajectories**, or the Lie derivative of $V$ along $f$. It is an ordinary function of $x$, computed from $V$ and $f$ without any solution. Equation \ref{chain} says that $\dot V(x)$ is the rate at which $V$ changes for the trajectory currently passing through $x$. Geometrically, at a state where $\nabla V(x)\ne0$, $\dot V(x)<0$ means the velocity $f(x)$ makes an obtuse angle with the outward direction $\nabla V(x)$: the state is crossing its level set inward.

::: example {#ex-scalar-lie} The scalar flow
For $f(x)=-x$ and $V(x)=x^2$, the gradient is $V'(x)=2x$, so $\dot V(x)=2x\cdot(-x)=-2x^2=-2V(x)$. We can check this against the solution: $V(\phi_t(\xi))=e^{-2t}\xi^2$, whose time derivative is $-2e^{-2t}\xi^2=-2V(\phi_t(\xi))$. The two computations agree, but only the first was needed.

For the rotation and $V(x)=x_1^2+x_2^2$, $\nabla V(x)=2x$ and $\dot V(x)=2x_1(-x_2)+2x_2x_1=0$. The squared distance is constant along trajectories, as the circles showed.
:::

### Lyapunov's theorem {#statement}

::: theorem {#thm-lyapunov} Lyapunov's direct method
Let $f$ be continuously differentiable on an open set $U\subseteq\mathbb R^p$ containing $0$, with $f(0)=0$. Let $\cert{V}:U\to\mathbb R$ be continuously differentiable and positive definite on $U$.

1. If $\dot V(x)\le0$ for all $x\in U$, the origin is stable.
2. If, in addition, $\dot V(x)<0$ for all $x\in U$ with $x\ne0$, the origin is asymptotically stable.
:::

This is Khalil's Theorem 4.1 (printed p. 114), stated with our symbols. A $V$ satisfying the hypotheses of part 1 is a **Lyapunov function**; in this atlas we also call it a certificate, because it certifies a property of a fixed dynamics. Positivity and decrease have separate roles. Positivity makes a small value of $V$ mean "close to the origin". Decrease makes sure the value of $V$ never goes up. Neither alone is enough (\ref{failures}). Both conclusions are **local**: they concern initial states sufficiently close to the origin, and \ref{assumptions} states what more is needed for a global claim.

### Why positivity and decrease are enough {#reasoning}

The proof turns the two hypotheses into a set the trajectory cannot leave. Fix a radius $r>0$ such that the closed ball $\bar B_r=\{x:\|x\|\le r\}$ lies in $U$; this is possible because $U$ is open. The sphere $\{\|x\|=r\}$ is compact, and a continuous function on a compact set attains its minimum (the extreme value theorem). So
$$m_r=\min_{\|x\|=r}V(x)$$
is attained at some point of the sphere. That point is not the origin, so $m_r>0$ by positivity. For a level $0<c<m_r$ define
$$\Omega_c=\{x:\ \|x\|\le r,\ V(x)\le c\}. \label{omega}$$
This set is closed and bounded, so compact. It does not touch the sphere, because every point of the sphere has $V\ge m_r>c$.

::: lemma {#lem-trap} Trapping
Assume $\dot V\le0$ on $U$. If $\xi\in\Omega_c$, then $\phi_t(\xi)\in\Omega_c$ for all $t\ge0$, and the solution exists for all $t\ge0$.
:::

::: proof
We do not yet know that the solution exists for all time, so we work on the maximal interval $[0,t^\ast)$ on which it exists ($t^\ast=\infty$ is allowed). While the trajectory stays inside $\bar B_r$, equation \ref{chain} gives $\tfrac{d}{dt}V(\phi_t(\xi))=\dot V(\phi_t(\xi))\le0$. A function with a nonpositive derivative does not increase, so $V(\phi_t(\xi))\le V(\xi)\le c$.

Suppose the trajectory leaves the ball at some time in $[0,t^\ast)$. The distance $\|\phi_t(\xi)\|$ changes continuously and starts strictly below $r$ (because $\Omega_c$ does not touch the sphere), so there is a first time $\tau\in(0,t^\ast)$ at which $\|\phi_\tau(\xi)\|=r$. Up to time $\tau$ the trajectory is inside the ball, so $V(\phi_\tau(\xi))\le c$. But $\phi_\tau(\xi)$ lies on the sphere, so $V(\phi_\tau(\xi))\ge m_r>c$. This contradiction shows that on all of $[0,t^\ast)$ the trajectory never reaches the sphere and therefore stays in $\Omega_c$. Because $\Omega_c$ is a compact subset of $U$, the continuation fact recalled in \ref{setting} then gives $t^\ast=\infty$: the solution exists, and stays in $\Omega_c$, for all $t\ge0$.
:::

Both restrictions in \ref{omega} matter. Without the ball, the set $\{x\in U: V(x)\le c\}$ can be unbounded or reach the edge of $U$, where the decrease hypothesis says nothing. For example, $V(x)=\frac{x_1^2}{1+x_1^2}+x_2^2$ is positive definite on $\mathbb R^2$, yet every point $(x_1,0)$ has $V<1$; for $c\ge1$ the set $\{V\le c\}$ contains the whole $x_1$-axis. A trajectory could keep $V$ decreasing while running off to infinity inside that set. The ball together with the choice $c<m_r$ carves out the bounded piece around the origin that a trajectory provably cannot leave.

::: proof Proof of part 1 (stability)
Let $\epsilon>0$ be given. Choose $r$ with $0<r<\epsilon$ and $\bar B_r\subseteq U$, and choose a level $0<c<m_r$. Because $V$ is continuous with $V(0)=0$, there is a $\delta$ with $0<\delta<r$ such that $\|x\|<\delta$ implies $V(x)<c$. Now take $\|\xi\|<\delta$. Then $\xi\in\Omega_c$, so by Lemma \ref{lem-trap} the trajectory stays in $\Omega_c\subseteq\bar B_r$, and $\|\phi_t(\xi)\|\le r<\epsilon$ for all $t\ge0$. This is the definition of stability.
:::

Stability needed only $\dot V\le0$. Convergence needs more, and the proof shows exactly where the strict inequality enters.

::: proof Proof of part 2 (attraction)
Fix $r$ and $c$ as above, and let $\xi\in\Omega_c$. Write $v(t)=V(\phi_t(\xi))$.

*Step 1: $v$ has a limit.* By the trapping lemma $v$ is nonincreasing, and $v\ge0$ by positivity. A nonincreasing function that is bounded below converges to its greatest lower bound. Call the limit $V_\infty\ge0$. Then $v(t)\ge V_\infty$ for all $t$.

*Step 2: the limit is zero.* Suppose $V_\infty>0$. By continuity of $V$ at the origin there is $d$ with $0<d<r$ such that $\|x\|<d$ implies $V(x)<V_\infty$. Since $v(t)\ge V_\infty$, the trajectory never enters the ball of radius $d$; it stays in the shell $K=\{x: d\le\|x\|\le r\}$. The shell is compact and excludes the origin, and $\dot V$ is continuous and strictly negative on it. So $\dot V$ attains a maximum on $K$, which is some negative number $-m$ with $m>0$. By the fundamental theorem of calculus,
$$v(t)=v(0)+\int_0^t\dot V(\phi_s(\xi))\,ds\le v(0)-mt.$$
The right-hand side is negative once $t>v(0)/m$, which contradicts $v\ge0$. Hence $V_\infty=0$.

*Step 3: from small $V$ to small distance.* Let $0<a<r$. On the compact shell $\{a\le\|x\|\le r\}$, $V$ has a positive minimum $m_a$. Since $v(t)\to0$, there is a time $T$ with $v(t)<m_a$ for $t\ge T$. For those times the state lies in $\bar B_r$ but not in the shell, so $\|\phi_t(\xi)\|<a$. As $a$ was arbitrary, $\phi_t(\xi)\to0$.

Every initial state with $\|\xi\|<\delta$ lies in $\Omega_c$, so the origin is attractive with $r_0=\delta$. Together with part 1 it is asymptotically stable.
:::

Compactness carried the argument three times. It gave existence for all time, a positive threshold $m_r$ on the sphere, and, in Step 2, a uniform decrease rate $m$. The strict inequality was used only to make $m$ positive. With $\dot V\le0$ alone, $m$ can be zero, and the rotation shows that convergence can then genuinely fail. The proof also yields more than the theorem states: every initial state in $\Omega_c$ converges, so $\Omega_c$ is a certified estimate of the region of attraction.

### Exponential rates from quadratic bounds {#rates}

Lyapunov's theorem says that trajectories converge, not how fast. When $V$ is comparable to the squared distance, the same function also gives a rate. Suppose that on a region $\Omega$ that trajectories cannot leave (such as $\Omega_c$, or all of $\mathbb R^p$), there are positive constants $c_1,c_2,c_3$ with
$$c_1\|x\|^2\le V(x)\le c_2\|x\|^2, \label{sandwich}$$
$$\dot V(x)\le-c_3\|x\|^2. \label{quad-decrease}$$
Follow a trajectory from $\xi\in\Omega$ and write $v(t)=V(\phi_t(\xi))$ again.

*Step 1: decrease in terms of $V$ itself.* The upper bound in \ref{sandwich} gives $\|x\|^2\ge V(x)/c_2$. Inserting this in \ref{quad-decrease} gives $\dot v\le-(c_3/c_2)\,v$.

*Step 2: an integrating factor.* By the product rule,
$$\frac{d}{dt}\Big(e^{(c_3/c_2)t}\,v(t)\Big)=e^{(c_3/c_2)t}\Big(\frac{c_3}{c_2}v(t)+\dot v(t)\Big)\le0.$$
So $e^{(c_3/c_2)t}v(t)$ does not increase and is at most its value $v(0)$ at time zero:
$$V(\phi_t(\xi))\le e^{-(c_3/c_2)t}\,V(\xi). \label{energy-rate}$$

*Step 3: back to the state.* Use the lower bound of \ref{sandwich} on the left and the upper bound on the right: $c_1\|\phi_t(\xi)\|^2\le V(\phi_t(\xi))\le e^{-(c_3/c_2)t}c_2\|\xi\|^2$. Divide by $c_1$ and take square roots:
$$\|\phi_t(\xi)\|\le\sqrt{\frac{c_2}{c_1}}\;e^{-\alpha t}\,\|\xi\|,\qquad \alpha=\frac{c_3}{2c_2}. \label{norm-rate}$$

A bound of the form $\|\phi_t(\xi)\|\le Ce^{-\alpha t}\|\xi\|$ with constants $C\ge1$ and $\alpha>0$, valid for all initial states $\xi$ in a region around the origin, is called **exponential stability** (global exponential stability when the region is all of $\mathbb R^p$). It implies asymptotic stability: $\delta=\epsilon/C$ answers the stability challenge, and the bound tends to zero.

This argument is the whole of the comparison step; [[comparison-functions]] develops it further, including an additive residual. Khalil states the general version as Theorem 4.10 (§4.5, printed p. 154).

**Energy rate versus norm rate.** The certificate decays at the rate $c_3/c_2$, but the state's norm decays at $\alpha=c_3/(2c_2)$, half as fast. The factor two is the square root in Step 3: $V$ behaves like a squared length, and if $\|x\|$ shrinks like $e^{-\alpha t}$ then $\|x\|^2$ shrinks like $e^{-2\alpha t}$. In the certificate lessons of this atlas $\alpha$ denotes a norm rate, so "$\dot V\le-2\alpha V$" is the energy form of a norm rate $\alpha$. Always say which rate a number refers to. The prefactor $\sqrt{c_2/c_1}\ge1$ is a different effect. It allows the distance to grow temporarily when the level sets of $V$ are elongated, as in the next section.

For the scalar flow, $V=x^2$ gives $c_1=c_2=1$ and $\dot V=-2x^2$ gives $c_3=2$. The energy rate is 2, so $V(\phi_t(\xi))\le e^{-2t}\xi^2$, and the norm rate is $\alpha=1$ with prefactor 1, so $|\phi_t(\xi)|\le e^{-t}|\xi|$. The exact solution $e^{-t}\xi$ attains both bounds with equality.

### A tilted bowl for a nonnormal system {#nonnormal}

The atlas's recurring linear example is
$$\dot x=Ax,\qquad A=\begin{pmatrix}-1&3\\0&-2\end{pmatrix}.$$
$A$ is upper triangular, so its eigenvalues are its diagonal entries, $-1$ and $-2$. Its eigenvectors $(1,0)$ and $(3,-1)$ are not orthogonal; a matrix of this kind, with $AA^T\ne A^TA$, is called **nonnormal**.

**Distance is not a certificate here.** Try $V_0(x)=\|x\|^2$. Its gradient is $2x$, so $\dot V_0(x)=2x^TAx=x^T(A+A^T)x$ with $A+A^T=\begin{pmatrix}-2&3\\3&-4\end{pmatrix}$. At the unit vector $x=(0.8,\,0.6)$ the velocity is $Ax=(1.0,\,-1.2)$ and
$$\dot V_0(x)=2\,(0.8\cdot1.0+0.6\cdot(-1.2))=0.16>0.$$
The squared distance increases at this state, so $V_0$ violates the decrease condition. The largest eigenvalue of $A+A^T$ is $-3+\sqrt{10}\approx0.162$, so this happens on a whole cone of directions. Here the effect is mild. Along the exact trajectory from $(0.8,0.6)$, which is $x_2(t)=0.6e^{-2t}$ and $x_1(t)=0.8e^{-t}+1.8(e^{-t}-e^{-2t})$, the distance rises to about $1.0077$ near $t\approx0.14$ before decaying. Small or not, it disqualifies $V_0$: a certificate's derivative must be nonpositive at every state.

**A quadratic certificate.** Try instead $V(x)=x^TPx$ with a symmetric matrix $P$. Its gradient is $2Px$, so
$$\dot V(x)=2x^TPAx=x^T(A^TP+PA)x,$$
where we used that the scalar $x^TPAx$ equals its transpose $x^TA^TPx$. If we choose $P$ to satisfy the **Lyapunov equation** $A^TP+PA=-I$, then $\dot V(x)=-\|x\|^2$ at every state. [[lyapunov-equation]] shows that this equation has a unique positive definite solution whenever every eigenvalue of $A$ has negative real part. Here we simply solve it. With $P=\begin{pmatrix}p_{11}&p_{12}\\p_{12}&p_{22}\end{pmatrix}$, multiplying out gives
$$A^TP+PA=\begin{pmatrix}-2p_{11}&3p_{11}-3p_{12}\\3p_{11}-3p_{12}&6p_{12}-4p_{22}\end{pmatrix}.$$
Setting this equal to $-I$ gives three linear equations: $-2p_{11}=-1$, $3p_{11}-3p_{12}=0$ and $6p_{12}-4p_{22}=-1$. Their solution is $p_{11}=\tfrac12$, $p_{12}=\tfrac12$, $p_{22}=1$:
$$P=\begin{pmatrix}\tfrac12&\tfrac12\\\tfrac12&1\end{pmatrix},\qquad V(x)=\tfrac12x_1^2+x_1x_2+x_2^2=\tfrac12(x_1+x_2)^2+\tfrac12x_2^2.$$

The completed square shows positivity directly: $V(x)=0$ forces $x_2=0$ and $x_1+x_2=0$, so $x=0$. A symmetric matrix $P$ is called **positive definite** when the quadratic function $x^TPx$ is positive definite in the sense of Definition \ref{def-posdef}; this $P$ is.

The constants $c_1,c_2$ come from the eigenvalues of $P$. For a $2\times2$ matrix $M$, the eigenvalues $\lambda$ solve $\det(M-\lambda I)=0$, which reads $\lambda^2-(\operatorname{tr}M)\,\lambda+\det M=0$, where the trace $\operatorname{tr}M$ is the sum of the diagonal entries. Here $\operatorname{tr}P=\tfrac32$ and $\det P=\tfrac12-\tfrac14=\tfrac14$, so $\lambda^2-\tfrac32\lambda+\tfrac14=0$ and $\lambda=(3\pm\sqrt5)/4\approx0.191$ and $1.309$. A symmetric $p\times p$ matrix has real eigenvalues $\lambda_i$ with orthonormal eigenvectors $u_i$, $Pu_i=\lambda_iu_i$. Writing $x=\sum_ia_iu_i$ gives $\|x\|^2=\sum_ia_i^2$ and $x^TPx=\sum_i\lambda_ia_i^2$, and therefore
$$\lambda_{\min}(P)\,\|x\|^2\le x^TPx\le\lambda_{\max}(P)\,\|x\|^2. \label{rayleigh}$$
Both bounds are attained at the corresponding eigenvectors. In particular, a symmetric $P$ is positive definite exactly when all its eigenvalues are positive. So the constants of \ref{rates} are
$$c_1=\tfrac{3-\sqrt5}{4}\approx0.191,\qquad c_2=\tfrac{3+\sqrt5}{4}\approx1.309,\qquad c_3=1.$$

Check at the same state $x=(0.8,0.6)$: $\nabla V=2Px=(x_1+x_2,\ x_1+2x_2)=(1.4,\ 2.0)$, and $\nabla V^TAx=1.4\cdot1.0+2.0\cdot(-1.2)=-1.0=-\|x\|^2$. Distance increases at this state while $V$ decreases. The sublevel sets $\{V\le c\}$ are tilted ellipses, reaching from radius $\sqrt{c/c_2}$ to $\sqrt{c/c_1}$; for $c=1$, from about $0.874$ to $2.288$. A trajectory can move away from the origin while crossing these ellipses inward. The Story draws the levels $c=0.5,1,2,4,8$ of this $V$.

**Rates.** The energy rate is $c_3/c_2=4/(3+\sqrt5)=3-\sqrt5\approx0.764$. The norm rate is $\alpha=(3-\sqrt5)/2\approx0.382$, and the prefactor is $\sqrt{c_2/c_1}=(3+\sqrt5)/2\approx2.618$. The bounds hold on all of $\mathbb R^2$, so
$$V(\phi_t(\xi))\le e^{-(3-\sqrt5)\,t}\,V(\xi),\qquad\|\phi_t(\xi)\|\le\tfrac{3+\sqrt5}{2}\,e^{-\frac{3-\sqrt5}{2}t}\,\|\xi\|\quad\text{for every }\xi\in\mathbb R^2.$$
If decimals are wanted, round in the safe direction: slower rates and a larger prefactor, for example $\|\phi_t(\xi)\|\le2.619\,e^{-0.381\,t}\|\xi\|$. On the trajectory from $(0.8,0.6)$, where $V(\xi)=1.16$, at $t=1$ the values are approximately $V=0.319$ and $\|x\|=0.7175$, below the bounds $0.540$ and $1.787$. The bounds are valid but not sharp: the slowest mode of $A$ decays like $e^{-t}$, and the largest factor by which any trajectory's distance actually grows, the maximum over $\xi\ne0$ and $t\ge0$ of $\|\phi_t(\xi)\|/\|\xi\|$, is about $1.012$, not $2.618$. A certificate proves an upper bound; it does not measure the exact rate.

**Operator norm.** The largest factor by which a matrix $M$ stretches a vector is its induced (operator) norm $\|M\|=\max_{\|u\|=1}\|Mu\|$. Scaling any $v\ne0$ to the unit vector $v/\|v\|$ gives $\|Mv\|\le\|M\|\,\|v\|$ for every $v$. Since $\|Mu\|^2=u^T(M^TM)u$ and $M^TM$ is symmetric, \ref{rayleigh} gives $\|M\|^2=\lambda_{\max}(M^TM)$. For our $A$, $A^TA=\begin{pmatrix}1&-3\\-3&13\end{pmatrix}$ has trace 14 and determinant 4, so $\lambda_{\max}(A^TA)=7+3\sqrt5\approx13.708$ and $\|A\|\approx3.702$. Because the flow of $\dot x=Ax$ is linear in $\xi$, the growth factor $1.012$ above is the largest operator norm of the map $\xi\mapsto\phi_t(\xi)$ over $t\ge0$.

### When a hypothesis fails {#failures}

Each hypothesis of Theorem \ref{thm-lyapunov} does work; removing one breaks a conclusion.

**Decrease that is not strict.** For the rotation with $V=\|x\|^2$, $V$ is positive definite and $\dot V=0\le0$. Part 1 applies, and the origin is indeed stable. Part 2 does not apply, and the origin is indeed not attractive. So $\dot V\le0$ alone cannot establish convergence. Sometimes the conclusion is true but this $V$ cannot show it. For the damped oscillator $\dot x_1=x_2,\ \dot x_2=-x_1-x_2$, the same $V$ gives $\dot V=2x_1x_2+2x_2(-x_1-x_2)=-2x_2^2$. This is zero on the whole $x_1$-axis, so part 2 fails, yet every trajectory does converge (the eigenvalues have real part $-\tfrac12$). LaSalle's invariance principle repairs such cases (Khalil, Theorem 4.4 and Corollary 4.1, printed p. 128). If no trajectory other than $x\equiv0$ can remain in the set where $\dot V=0$, attraction still follows. Here a trajectory staying on $x_2=0$ would need $\dot x_2=-x_1=0$, so $x_1=0$ too. We do not prove LaSalle's principle in this lesson.

**Decrease without positivity.** For the scalar $\dot x=x$, every nonzero state runs away: $\phi_t(\xi)=e^t\xi$. Yet $V(x)=-x^2$ has $\dot V=-2x\cdot x=-2x^2<0$ for $x\ne0$. This $V$ decreases strictly along every trajectory, toward $-\infty$, because a small value of $V$ no longer means "near the origin". The zero function is a degenerate case: $\dot V=0$ satisfies "$\le0$" everywhere and proves nothing.

**Sublevel sets that are not bounded.** The function $\frac{x_1^2}{1+x_1^2}+x_2^2$ of \ref{reasoning} is positive definite, but its larger sublevel sets are unbounded. This failure limits how far the conclusion can be extended, which is the subject of the next section.

### Local and global claims {#assumptions}

Before claiming anything from a candidate $V$, check:

- the same fixed $f$ throughout: continuously differentiable on an open set $U$ containing $0$, with $f(0)=0$; changing the controller changes $f$ and invalidates the check;
- $V$ continuously differentiable and positive definite on $U$;
- $\dot V\le0$ at every point of $U$ (stability), or $\dot V<0$ at every point of $U$ except the origin (asymptotic stability); checking finitely many points does not establish either;
- for a rate, constants $c_1,c_2,c_3$ valid on a region that trajectories cannot leave.

The conclusions of Theorem \ref{thm-lyapunov} are local. They concern a neighborhood of the origin, and the certified region $\Omega_c$ may be small even when $U$ is large, because $c$ must stay below the minimum of $V$ on a sphere inside $U$.

A global conclusion needs the hypotheses on all of $\mathbb R^p$ plus one more property. $V$ is **radially unbounded** if $V(x)\to\infty$ as $\|x\|\to\infty$.

::: theorem {#thm-global} Global asymptotic stability
Let $f$ be continuously differentiable on $\mathbb R^p$ with $f(0)=0$. If $V:\mathbb R^p\to\mathbb R$ is continuously differentiable, positive definite, radially unbounded, and $\dot V(x)<0$ for all $x\ne0$, then the origin is globally asymptotically stable.
:::

::: proof Proof idea
Take any $\xi$ and let $c=V(\xi)$. Radial unboundedness gives a radius $r$ with $V(x)>c$ whenever $\|x\|\ge r$, so the whole set $\{V\le c\}$ lies inside the ball of radius $r$ and is compact. The trapping lemma and Steps 1–3 of the attraction proof then run unchanged with this set in place of $\Omega_c$, so $\phi_t(\xi)\to0$. Stability is part 1 of Theorem \ref{thm-lyapunov} with $U=\mathbb R^p$. Together these give global asymptotic stability.
:::

This is Khalil's Theorem 4.2 (printed p. 124). The function $\frac{x_1^2}{1+x_1^2}+x_2^2$ shows why the extra property is needed: it is positive definite but stays below 1 along the $x_1$-axis, so its sublevel sets for $c\ge1$ are unbounded. Khalil's Exercise 4.8 (printed p. 182) builds a planar system for which this $V$ satisfies $\dot V<0$ away from the origin, yet the origin is not globally asymptotically stable. A quadratic $V=x^TPx$ with $P$ positive definite is radially unbounded because $V\ge c_1\|x\|^2$. That is why the conclusion for the nonnormal example holds for every initial state.

### Discrete time {#discrete}

A discrete-time system updates by a map, $x_{j+1}=g(x_j)$ for steps $j=0,1,2,\dots$, with $g(0)=0$. There is no time derivative, so $\nabla V^Tf$ has no meaning here. Decrease is measured by the one-step change
$$\Delta V(x)=V(g(x))-V(x).$$
The analogue of Theorem \ref{thm-lyapunov} holds for continuous $g$ with $\Delta V$ in place of $\dot V$. We do not prove it here; its trapping step differs, because a single step can jump over a sphere instead of crossing it. [[time-dictionary]] collects the other continuous/discrete correspondences.

Take $g(x)=x/2$ and $V(x)=x^2$. Then $V(g(x))=x^2/4$, so $\Delta V(x)=-\tfrac34x^2<0$ for $x\ne0$, and $V$ shrinks by the factor $\tfrac14$ every step: $V(x_j)=4^{-j}V(x_0)$. The norm shrinks by $\sqrt{1/4}=\tfrac12$ per step, the discrete counterpart of the factor two between energy and norm rates. A common mistake is to evaluate the continuous formula with the map: $\nabla V(x)^Tg(x)=2x\cdot\tfrac x2=x^2>0$, which wrongly suggests growth. It computes the rate of change of $V$ for the different system $\dot x=g(x)$.

### See the trajectories {#experiment}

::: figure {#fig-flow}
{{flow linear}}
A quadratic certificate fitted to four sampled trajectories of the nonnormal system (seed 1), not the $P$ computed above, then tested on 20 fresh trajectories. The fit imposes $\dot V\le-2(0.15)V$ at sampled states; the test checks $\dot V\le-2\alpha V$ with norm rate $\alpha=0.1$. Filled squares would mark grid points where the tested inequality fails, and the line below reports how many fresh trajectories violate it.
:::

[Open the flows and certificates Lab](#/flows). There you can change the matrix, the seed and the number of training trajectories, and watch how often a fitted certificate fails on fresh trajectories. The pictures and holdout rates are finite numerical evidence. The proof for this matrix is the exact calculation of \ref{nonnormal}.

### What is and is not proven {#scope}

Theorem \ref{thm-lyapunov} and Theorem \ref{thm-global} are proofs under their hypotheses. For the nonnormal example, the exact solution of the Lyapunov equation proves global exponential stability with the stated constants. Every state is covered, because $\dot V=-\|x\|^2$ is an identity in $x$.

Several things are not proven by the material here:

- A picture or simulation of finitely many trajectories illustrates the theorem; it proves nothing about the states that were not simulated.
- Checking $\dot V<0$ at finitely many sampled states does not establish it everywhere. Turning sampled checks into a guarantee with stated probability is the subject of [[learning-certificates]].
- Failing to find a certificate does not show instability. A certificate may exist outside the family of functions searched, and a certificate is never unique: any positive multiple of $V$ also works, and for the linear example, replacing $-I$ by another negative definite right-hand side $-Q$ in the Lyapunov equation generally gives another valid $P$.

The letter $V$ is also used for value functions in RL, and the two must not be confused ([[two-values]]). A policy's value $\val{v_\pi}$ is an expected discounted sum of rewards; it is defined by the policy and the environment, and it need not decrease along trajectories. A certificate $\cert{V}$ is any function that satisfies the positivity and decrease inequalities for a fixed dynamics. A cost-to-go can be a certificate, but only after these inequalities are verified.

### Exercises {#exercises}

::: question
Compute $\dot V$ for $\dot x_1=-x_1+x_2,\ \dot x_2=-x_1-x_2$ with $V=x_1^2+x_2^2$. What can you conclude, and at what rates?
---
$\nabla V=2x$, so $\dot V=2x_1(-x_1+x_2)+2x_2(-x_1-x_2)=-2x_1^2-2x_2^2=-2V$. $V$ is positive definite and radially unbounded, and $\dot V<0$ away from the origin, so the origin is globally asymptotically stable. With $c_1=c_2=1$ and $c_3=2$: $V(\phi_t(\xi))\le e^{-2t}V(\xi)$ (energy rate 2) and $\|\phi_t(\xi)\|\le e^{-t}\|\xi\|$ (norm rate 1). Here $\dot V=-2V$ holds exactly, so both are equalities.
:::

::: question
For the damped oscillator $\dot x_1=x_2,\ \dot x_2=-x_1-x_2$ with $V=\|x\|^2$, what does Theorem \ref{thm-lyapunov} prove? Compare with the rotation.
---
$\dot V=-2x_2^2\le0$, so part 1 proves stability. Part 2 does not apply, because $\dot V=0$ at states such as $(1,0)$. The origin is in fact attractive (LaSalle's principle, or the eigenvalues $-\tfrac12\pm i\tfrac{\sqrt3}{2}$), but this $V$ and Theorem \ref{thm-lyapunov} alone do not prove it. For the rotation, $\dot V=0$ everywhere and attraction is actually false. The same "$\dot V\le0$" can come with or without convergence.
:::

::: question
A certificate satisfies $2\|x\|^2\le V(x)\le8\|x\|^2$ and $\dot V\le-4\|x\|^2$ on all of $\mathbb R^p$. Give the energy rate and a bound on $\|\phi_t(\xi)\|$.
---
$\dot V\le-4\|x\|^2\le-\tfrac48V=-\tfrac12V$, so $V(\phi_t(\xi))\le e^{-t/2}V(\xi)$: energy rate $\tfrac12$. Then $2\|\phi_t(\xi)\|^2\le e^{-t/2}\cdot8\|\xi\|^2$, so $\|\phi_t(\xi)\|\le2e^{-t/4}\|\xi\|$: norm rate $\alpha=\tfrac14$, half the energy rate, with prefactor $\sqrt{8/2}=2$.
:::

::: question
Simulating $\dot x=-x$ with Euler steps of size $\Delta t>0$ gives $x_{j+1}=(1-\Delta t)x_j$. With $V=x^2$, for which $\Delta t$ does $V$ decrease at every step? Try $\Delta t=0.5$ and $\Delta t=2.5$.
---
$\Delta V=(1-\Delta t)^2x^2-x^2=\Delta t\,(\Delta t-2)\,x^2$, which is negative for $x\ne0$ exactly when $0<\Delta t<2$. For $\Delta t=0.5$, $V$ shrinks by the factor $0.25$ per step. For $\Delta t=2.5$, it grows by the factor $2.25$ and the iteration diverges. A continuous-time certificate does not automatically certify a discretization; the discrete condition must be checked on the map.
:::

::: question
For $\dot x=-x^3$ and $V=x^2$, show that the origin is globally asymptotically stable. Does the exponential bound of \ref{rates} apply?
---
$\dot V=2x(-x^3)=-2x^4<0$ for $x\ne0$, and $V$ is positive definite and radially unbounded, so Theorem \ref{thm-global} applies. The exponential bound needs $-2x^4\le-c_3x^2$, that is $2x^2\ge c_3$, near the origin. This fails as $x\to0$ for every $c_3>0$. Indeed the exact solution $x(t)=\xi/\sqrt{1+2\xi^2t}$ decays like $1/\sqrt{2t}$, slower than any exponential. Asymptotic stability does not imply an exponential rate.
:::

::: question
Which are positive definite on $\mathbb R^2$: (a) $x_1^2+x_2^2$, (b) $(x_1+x_2)^2$, (c) $x_1^2-x_2^2$, (d) $\tfrac12(x_1+x_2)^2+\tfrac12x_2^2$?
---
(a) and (d). (b) is zero on the whole line $x_1=-x_2$, so it is only positive semidefinite. (c) is negative at $(0,1)$, so it is indefinite. (d) is the certificate of the nonnormal example.
:::

### Where it is used {#uses}

[[lyapunov-equation]] constructs quadratic certificates for stable linear systems. [[comparison-functions]] generalizes the rate argument of \ref{rates}. [[learning-certificates]] searches for $V$ from sampled trajectories. [[two-values]] separates the certificate from an RL value function.

## Card

### The idea {#idea}

To show that the equilibrium $0$ of $\dot x=f(x)$ is stable without solving the equation, find $\cert{V}$ with two properties near $0$. **Positive definite:** $V(0)=0$ and $V(x)>0$ for $x\ne0$. **Decreasing along trajectories:** $\dot V(x)=\nabla V(x)^Tf(x)\le0$. Then the origin is stable (states that start close stay close). If $\dot V<0$ away from $0$, it is also attractive (states converge). With $V$ radially unbounded and the conditions on all of $\mathbb R^p$, convergence is global. Khalil, Theorems 4.1–4.2.

### Intuition and example {#intuition}

The chain rule gives $\tfrac{d}{dt}V(\phi_t(\xi))=\dot V(\phi_t(\xi))$, so the sign of $\dot V$ at a state tells whether $V$ is falling there. Bounded sublevel sets $\{V\le c\}$ around $0$ then act as traps. Strict decrease on a compact shell away from $0$ has a uniform margin, which forces $V\to0$.

- Scalar: $\dot x=-x$, $V=x^2$ gives $\dot V=-2V$, so $V(t)=e^{-2t}\xi^2$ and $|x(t)|=e^{-t}|\xi|$.
- Rates: $c_1\|x\|^2\le V\le c_2\|x\|^2$ and $\dot V\le-c_3\|x\|^2$ give $V(t)\le e^{-(c_3/c_2)t}V(0)$ and $\|x(t)\|\le\sqrt{c_2/c_1}\,e^{-\alpha t}\|\xi\|$ with $\alpha=c_3/(2c_2)$. The norm rate is half the energy rate.
- Nonnormal $A=\begin{pmatrix}-1&3\\0&-2\end{pmatrix}$: $\|x\|^2$ grows at $(0.8,0.6)$, but $P=\begin{pmatrix}1/2&1/2\\1/2&1\end{pmatrix}$ solves $A^TP+PA=-I$ and gives $\dot V=-\|x\|^2$. Its eigenvalues are $(3\pm\sqrt5)/4$, so $\|\phi_t(\xi)\|\le\tfrac{3+\sqrt5}{2}\,e^{-\alpha t}\|\xi\|$ with $\alpha=(3-\sqrt5)/2$. Rounded conservatively: $\|\phi_t(\xi)\|\le2.619\,e^{-0.381\,t}\|\xi\|$.
- Discrete time $x_{j+1}=g(x_j)$: use $\Delta V=V(g(x))-V(x)$, not $\nabla V^Tg$.

### Assumptions and domain {#assumptions}

- One fixed, continuously differentiable $f$ with $f(0)=0$ on an open $U\ni0$ (a convenient sufficient condition; local Lipschitz continuity is enough).
- $V$ continuously differentiable and positive definite on $U$.
- The decrease inequality at every state of $U$, not at sampled states.
- Local conclusions use a bounded trapped set $\{\|x\|\le r,\ V\le c\}$ with $c$ below the minimum of $V$ on the sphere $\|x\|=r$. Global conclusions need $U=\mathbb R^p$ and radial unboundedness.

### Pitfalls {#pitfalls}

- $\dot V\le0$ gives stability, not convergence: the rotation has $\dot V=0$ for $V=\|x\|^2$. LaSalle's principle can sometimes repair this; it is a separate theorem.
- Decrease without positivity proves nothing: $V=-x^2$ decreases along $\dot x=x$, which is unstable.
- A positive definite $V$ can have unbounded sublevel sets, e.g. $\frac{x_1^2}{1+x_1^2}+x_2^2$.
- Distance to the origin can increase while a valid certificate decreases.
- Do not mix energy and norm rates, or continuous and discrete time.
- A certificate $\cert{V}$ is not a policy value $\val{v_\pi}$ ([[two-values]]).

### Check yourself {#check}

::: question
For $\dot x=x-x^3$ and $V=x^2$, compute $\dot V$. Is $V$ a certificate for the origin?
---
$\dot V=2x(x-x^3)=2x^2(1-x^2)$, which is positive for $0<|x|<1$. $V$ increases near the origin, so it is not a certificate. In fact the origin is unstable here: small positive states move away.
:::

::: question
$V$ is positive definite and $\dot V\le0$ everywhere. Can you claim that trajectories converge to $0$?
---
No, only stability. The rotation $\dot x_1=-x_2,\ \dot x_2=x_1$ with $V=\|x\|^2$ satisfies both conditions, and its trajectories circle forever.
:::

::: question
A certificate gives $V(\phi_t(\xi))\le e^{-0.8t}V(\xi)$, with $V$ between $c_1\|x\|^2$ and $c_2\|x\|^2$. At what rate does $\|\phi_t(\xi)\|$ decay?
---
At rate $0.4$, half the energy rate, with prefactor $\sqrt{c_2/c_1}$: $\|\phi_t(\xi)\|\le\sqrt{c_2/c_1}\,e^{-0.4t}\|\xi\|$.
:::

::: question
For the map $x_{j+1}=0.9\,x_j$ and $V=x^2$, what quantity shows decrease, and by what factor do $V$ and $|x|$ shrink per step?
---
$\Delta V=V(0.9x)-V(x)=-0.19x^2<0$. $V$ shrinks by $0.81$ per step, and $|x|$ by $\sqrt{0.81}=0.9$.
:::

### Where it is used {#uses}

[[lyapunov-equation]], [[comparison-functions]], [[learning-certificates]], [[two-values]].
