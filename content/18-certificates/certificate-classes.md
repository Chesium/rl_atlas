+++
summary = "Certificate complexity must control both function values and derivatives on the reachable region."
prereqs = ["learning-certificates"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §4, Assumptions 4.1–4.2, p.6", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question: when are two certificates close? {#statement}

Generalization arguments for a class of candidates ([[learning-certificates]]) work by replacing the class with finitely many representatives: if two candidates are close, their trajectory residuals should be close, so a few well-placed candidates stand for all of them ([[covering-dudley]]). That needs a distance between certificates under which the residual changes little. Which distance?

The residual $h=\nabla V^{\mathsf T}\dot x+\rho(V)$ uses the value **and** the gradient of $V$, along trajectories that wander through a region of the state space. So the distance must measure both, uniformly over that region. This lesson defines that norm, shows why values alone fail, proves that the residual is Lipschitz in it, and shows how a smooth parameterization controls it. These are the inputs to [[boffi-thm-4-2]].

**Recalled from [[learning-certificates]].** Trajectories $\phi_t(\xi)$ of $\dot x=f(x)$, $x\in\mathbb R^p$, start in a compact set $X$ and run over a time interval $T$. The trajectory residual of $V$ is $h(\xi,V)=\sup_{t\in T}h\big(\phi_t(\xi),\dot\phi_t(\xi),V(\phi_t(\xi)),\nabla V(\phi_t(\xi))\big)$.

::: definition {#def-reach} Common compact reachable set (Boffi et al., Assumption 4.1)
There is a compact set $S\subset\mathbb R^p$ that contains $\phi_t(\xi)$ for every $\xi\in X$ and every $t\in T$. Write $B_S=\sup_{x\in S}\|x\|$.
:::

The paper calls this "stability in the sense of Lyapunov": trajectories from a bounded set stay in a bounded set. It notes that contraction implies it. For $\dot x=-x$ and $X=[-2,2]$, $S=[-2,2]$ works.

::: definition {#def-joint} Joint value-and-gradient norm
For a differentiable $V$,
$$\|V\|_{\mathcal V}=\sup_{x\in S}\left\|\begin{bmatrix}V(x)\\ \nabla V(x)\end{bmatrix}\right\|,$$
the Euclidean norm of the stacked vector in $\mathbb R^{1+p}$, maximized over $S$. The distance between two candidates is $\|V_1-V_2\|_{\mathcal V}$.
:::

Since $\max\{a,b\}\le\sqrt{a^2+b^2}\le a+b$ for $a,b\ge0$, being close in this norm means: close in value **and** close in gradient, at every point of $S$.

### Why values are not enough {#values}

::: example {#ex-sine} A small value with a large slope
On $S=[-1,1]$ let $V_m(x)=\sin(mx)/m$. Then $\sup_S|V_m|=1/m$, which tends to $0$, while $V_m'(x)=\cos(mx)$ reaches $1$ at $x=0$ for every $m$. Hence
$$\|V_m\|_{\mathcal V}=1\quad\text{for every }m\ge1:$$
the stacked vector has squared length $\sin^2(mx)/m^2+\cos^2(mx)=1-(1-1/m^2)\sin^2(mx)\le1$, with equality at $x=0$.
:::

The residual notices. Take $\dot x=-x$, $\rho(v)=v$ and $V=x^2$; on $[0.5,1]$ its residual is $-x^2\le-0.25$. Add the perturbation: $V+V_m$ has residual
$$-x^2-x\cos(mx)+\frac{\sin(mx)}m.$$
The change $-x\cos(mx)+\sin(mx)/m$ comes almost entirely from the gradient. Maximizing over a fine grid of $[0.5,1]$, the perturbed residual reaches $0.073$ for $m=10$, $0.249$ for $m=100$ and $0.250$ for $m=1000$. The value perturbation shrinks to $0.001$, the residual stays damaged by almost $1$, and the decrease condition fails. A cover in values alone would place $V+V_m$ next to $V$ and wrongly vouch for it. (The example of [[kernels-random-features]], $\sin(m^2x)/m$, is worse: its gradient grows without bound. Here the gradient error merely refuses to shrink.)

### The residual is Lipschitz in the joint norm {#lipschitz}

Two constants describe a residual. Boffi et al. first assume the class is bounded on $S$:

::: definition {#def-bounded} Uniform boundedness (Boffi et al., Assumption 4.2)
There are finite $B_V$ and $B_{\nabla V}$ with $|V(x)|\le B_V$ and $\|\nabla V(x)\|\le B_{\nabla V}$ for every $x\in S$ and every $V\in\mathcal V$.
:::

On the set of $(x,V,\nabla V)$ with $x\in S$, $|V|\le B_V$ and $\|\nabla V\|\le B_{\nabla V}$, with $\dot x=f(x)$:

- $B_h$ bounds $|h|$;
- $L_h$ is a Lipschitz constant of $h$ in the stacked pair $(V,\nabla V)\in\mathbb R^{1+p}$, with $x$ held fixed: $|h(x,\dot x,v_1,w_1)-h(x,\dot x,v_2,w_2)|\le L_h\|(v_1-v_2,w_1-w_2)\|$.

The paper says both are finite under its assumptions. For $B_h$ that follows from continuity on a compact set. A continuous $h$ need not be Lipschitz, so the atlas lists the Lipschitz property as a hypothesis; for the Lyapunov residual it is easy to check.

**The Lyapunov residual.** With $\rho(v)=cv$, a change $(\Delta V,\Delta\nabla V)$ changes $h=\nabla V^{\mathsf T}f(x)+cV$ by $f(x)^{\mathsf T}\Delta\nabla V+c\,\Delta V$. This is the inner product of $(c,f(x))$ with $(\Delta V,\Delta\nabla V)$ in $\mathbb R^{1+p}$, so by Cauchy–Schwarz
$$L_h=\sup_{x\in S}\sqrt{\|f(x)\|^2+c^2}.$$
For a nonlinear $\rho$ that is $L_\rho$-Lipschitz on $[-B_V,B_V]$, replace $c$ by $L_\rho$. For $\dot x=-x$ on $S=[-2,2]$ with $\rho(v)=v$, $L_h=\sqrt{4+1}=\sqrt5$.

::: lemma {#lem-traj} From certificates to trajectory residuals
If $V_1,V_2\in\mathcal V$, then for every $\xi\in X$,
$$|h(\xi,V_1)-h(\xi,V_2)|\le L_h\,\|V_1-V_2\|_{\mathcal V}.$$
:::

::: proof
Write $a_t$ and $b_t$ for the two pointwise residuals at time $t$ along the trajectory from $\xi$, and $d=\sup_t|a_t-b_t|$. For every $t$, $a_t\le b_t+d\le\sup_sb_s+d$; so $\sup_ta_t\le\sup_tb_t+d$, and by symmetry $|\sup_ta_t-\sup_tb_t|\le d$. At time $t$ both residuals use the same $x=\phi_t(\xi)$ and $\dot x$ and differ only through $(V,\nabla V)$, so $|a_t-b_t|\le L_h\|(V_1-V_2,\nabla V_1-\nabla V_2)(\phi_t(\xi))\|$. Since $\phi_t(\xi)\in S$, this is at most $L_h\|V_1-V_2\|_{\mathcal V}$.
:::

The bound holds for **every** initial state at once, which is what a worst-case complexity needs. The reachable set is used in the last step: without it the supremum defining the norm would have to cover wherever trajectories might go.

### Parametric classes: a mean-value argument {#reasoning}

Boffi et al.'s main class (their (4.1)) is
$$\mathcal V=\{V_\theta=g(\cdot,\theta):\theta\in\mathbb R^k,\ \|\theta\|\le B_\theta\},$$
with $g:\mathbb R^p\times\mathbb R^k\to\mathbb R$ twice continuously differentiable. Two derivatives of $g$ measure how a certificate moves when its parameters move:
$$\begin{aligned}L_g&=\sup_{x\in S,\ \|\theta\|\le B_\theta}\|\nabla_\theta g(x,\theta)\|,\\ L_{\nabla g}&=\sup_{x\in S,\ \|\theta\|\le B_\theta}\Big\|\frac{\partial^2g}{\partial\theta\,\partial x}(x,\theta)\Big\|.\end{aligned}$$
Here $\nabla_\theta g\in\mathbb R^k$ has its Euclidean norm. The mixed derivative is the $p\times k$ matrix $G(x,\theta)$ whose column $j$ is $\partial(\nabla_xg)/\partial\theta_j$. (We write $G$ rather than $M$, which Part 16 reserves for a contraction metric.) Its norm is the **induced operator norm** $\|G\|=\max_{\|u\|=1}\|Gu\|$, so that $\|Gv\|\le\|G\|\,\|v\|$. Both suprema are finite: the derivatives are continuous and $S$ times the parameter ball is compact.

::: lemma {#lem-param} Parameters control values and gradients
For $\|\theta_1\|,\|\theta_2\|\le B_\theta$,
$$\|V_{\theta_1}-V_{\theta_2}\|_{\mathcal V}\le(L_g+L_{\nabla g})\,\|\theta_1-\theta_2\|.$$
:::

::: proof
Fix $x\in S$ and put $\theta(s)=\theta_2+s(\theta_1-\theta_2)$ for $s\in[0,1]$. The ball is convex, so $\theta(s)$ stays in it. By the fundamental theorem of calculus along this segment and Cauchy–Schwarz,
$$\begin{aligned}|g(x,\theta_1)-g(x,\theta_2)|&=\Big|\int_0^1\nabla_\theta g(x,\theta(s))^{\mathsf T}(\theta_1-\theta_2)\,ds\Big|\\&\le L_g\|\theta_1-\theta_2\|.\end{aligned}$$
For the gradient let $G(s)=G(x,\theta(s))$ be the mixed matrix along the segment. The same step gives $\nabla_xg(x,\theta_1)-\nabla_xg(x,\theta_2)=\int_0^1G(s)(\theta_1-\theta_2)\,ds$. The norm of an integral is at most the integral of the norm, and $\|G(s)(\theta_1-\theta_2)\|\le L_{\nabla g}\|\theta_1-\theta_2\|$. Finally $\sqrt{a^2+b^2}\le a+b$, and take the supremum over $x\in S$.
:::

Combined with \ref{lem-traj}, parameters within distance $r$ give trajectory residuals within $L_h(L_g+L_{\nabla g})\,r$, for every initial state. That is the whole bridge from a parameter ball to the residual class. The same argument with $\theta_2=0$ gives Assumption 4.2: $B_V\le\sup_S|g(\cdot,0)|+L_gB_\theta$ and $B_{\nabla V}\le\sup_S\|\nabla_xg(\cdot,0)\|+L_{\nabla g}B_\theta$, which is why the paper says a $C^2$ parameterization implies it.

Second derivatives appear because the residual uses $\nabla_xV$, and its sensitivity to $\theta$ is a mixed second derivative. A value-only Lipschitz constant $L_g$ would not suffice, for the reason of \ref{ex-sine}.

### Worked example: the three-parameter quadratic {#example}

::: example {#ex-quadratic} Constants for $x^{\mathsf T}P_\theta x$
Take $p=2$, $S$ the disk of radius $B_S$, and
$$V_\theta(x)=\theta_1x_1^2+2\theta_2x_1x_2+\theta_3x_2^2=x^{\mathsf T}P_\theta x,$$
with $P_\theta=\begin{bmatrix}\theta_1&\theta_2\\ \theta_2&\theta_3\end{bmatrix}$, so $k=3$. It is linear in $\theta$: $g(x,\theta)=\theta^{\mathsf T}m(x)$ with $m(x)=(x_1^2,2x_1x_2,x_2^2)$.

*Values.* $\nabla_\theta g=m(x)$ and $\|m(x)\|^2=x_1^4+4x_1^2x_2^2+x_2^4=\|x\|^4+2x_1^2x_2^2$. Since $2x_1^2x_2^2\le\tfrac12\|x\|^4$, with equality when $|x_1|=|x_2|$,
$$L_g=\sqrt{3/2}\,B_S^2.$$

*Gradients.* $\nabla_xg=2P_\theta x=(2\theta_1x_1+2\theta_2x_2,\ 2\theta_2x_1+2\theta_3x_2)$, so the mixed derivative is
$$G(x)=\begin{bmatrix}2x_1&2x_2&0\\0&2x_1&2x_2\end{bmatrix}.$$
$\|G\|^2$ is the largest eigenvalue of $GG^{\mathsf T}=4\begin{bmatrix}\|x\|^2&x_1x_2\\x_1x_2&\|x\|^2\end{bmatrix}$, namely $4(\|x\|^2+|x_1x_2|)\le6\|x\|^2$. Hence
$$L_{\nabla g}=\sqrt6\,B_S.$$

*Bounds.* Because $g(x,0)=0$, Assumption 4.2 holds with $B_V=\sqrt{3/2}\,B_S^2B_\theta$ and $B_{\nabla V}=\sqrt6\,B_SB_\theta$.

*Numbers.* With $B_S=2.03$ and $B_\theta=2$: $L_g\approx5.05$, $L_{\nabla g}\approx4.97$, $B_V\approx10.09$, $B_{\nabla V}\approx9.94$.
:::

The constants grow with the reachable radius, like $B_S^2$ for values and $B_S$ for gradients, and they do not depend on $\theta$ because $g$ is linear in $\theta$.

**A check on two nearby certificates.** Let $\theta_1=(\tfrac12,\tfrac12,1)$, the certificate $P=\begin{bmatrix}1/2&1/2\\1/2&1\end{bmatrix}$ of [[lyapunov-functions]], and $\theta_2=\theta_1+(0.1,0,0)$. The difference is $0.1x_1^2$, with gradient $(0.2x_1,0)$, so
$$\|V_{\theta_2}-V_{\theta_1}\|_{\mathcal V}=0.1\sup_{\|x\|\le B_S}\sqrt{x_1^4+4x_1^2}=0.1\sqrt{B_S^4+4B_S^2}.$$
For $B_S=2.03$ this is $0.578$. \ref{lem-param} promises at most $0.1(L_g+L_{\nabla g})\approx1.00$. The bound holds; it is not tight, because the worst directions for values and for gradients differ.

**The residual constants for the shared system.** For $\dot x=Ax$ with $A=\begin{bmatrix}-1&3\\0&-2\end{bmatrix}$ and $\rho(v)=0.2v$: $\|A\|=\sqrt{7+\sqrt{45}}\approx3.70$ (the square root of the largest eigenvalue of $A^{\mathsf T}A$), so $L_h\le\sqrt{\|A\|^2B_S^2+0.04}\approx7.52$. And $|h|\le\|\nabla V\|\,\|Ax\|+0.2|V|\le B_{\nabla V}\|A\|B_S+0.2B_V$, so $B_h\le76.8$. These are the constants that [[boffi-thm-4-2]] assembles.

### When the premises fail {#failure}

- **No common compact set.** For $\dot x=x$, trajectories from $X=[1,2]$ leave every bounded set as $t\to\infty$. On $T=[0,\infty)$ there is no $S$, $B_S=\infty$, and for the class $\theta x^2$ even $L_g=\sup x^2$ is infinite. The norm $\|\cdot\|_{\mathcal V}$ is then useless as a distance. A finite horizon restores a compact $S$.
- **An unbounded parameter set.** Without $\|\theta\|\le B_\theta$, the class $\theta x^2$ contains arbitrarily large certificates, $B_V=\infty$, and no finite collection is close to all of them.
- **A nonsmooth parameterization.** On $S=[-1,1]$ take $g(x,\theta)=|x-\theta|$ with $|\theta|\le1$. For $\theta_1<\theta_2$, every $x$ between them has $\partial_x|x-\theta_1|=1$ and $\partial_x|x-\theta_2|=-1$, so $\|V_{\theta_1}-V_{\theta_2}\|_{\mathcal V}\ge2$ however close the parameters are. (Strictly, $V_\theta$ has no derivative at $x=\theta$, so it is outside the setting; the point is that closeness of parameters gives no closeness of certificates.) \ref{lem-param} fails because $g$ is not $C^2$, and covering the parameter interval covers nothing.

### Assumptions and scope {#assumptions}

- **Assumption 4.1:** a common compact reachable set $S$ for all trajectories from $X$ over $T$.
- **Assumption 4.2:** uniform bounds $B_V$, $B_{\nabla V}$ on $S$, implied by a $C^2$ parameterization on a bounded ball.
- **The residual:** bounded by $B_h$ and, as an explicit hypothesis, $L_h$-Lipschitz in $(V,\nabla V)$ on the bounded region.
- **What is proved here:** \ref{lem-traj} and \ref{lem-param}, hence residual distance at most $L_h(L_g+L_{\nabla g})\|\theta_1-\theta_2\|$ for every initial state. How a small distance becomes a complexity bound is the business of [[covering-dudley]] and [[boffi-thm-4-2]].

### Exercises {#exercises}

::: question
For the one-parameter class $g(x,\theta)=\theta x^2$ with $|\theta|\le1$ on $S=[-2,2]$, compute $L_g$, $L_{\nabla g}$, $B_V$ and $B_{\nabla V}$. For $\dot x=-x$ and $\rho(v)=v$, what is $L_h$?
---
$\partial_\theta g=x^2$, so $L_g=4$. $\partial_xg=2\theta x$, so the mixed derivative is $2x$ and $L_{\nabla g}=4$. With $g(x,0)=0$: $B_V=4$, $B_{\nabla V}=4$. The residual change is $-x\,\Delta V'+\Delta V$, so $L_h=\sup_{|x|\le2}\sqrt{x^2+1}=\sqrt5\approx2.24$.
:::

::: question
Two certificates satisfy $\sup_S|V_1-V_2|\le10^{-6}$. What can you conclude about $|h(\xi,V_1)-h(\xi,V_2)|$ for the Lyapunov residual? What extra information would make the conclusion useful?
---
Nothing useful: \ref{ex-sine} shows the gradients can still differ by $1$, which changes the residual by up to $\sup_S\|f\|$. One needs the gradient difference too, that is, a bound on $\|V_1-V_2\|_{\mathcal V}$; then \ref{lem-traj} gives at most $L_h\|V_1-V_2\|_{\mathcal V}$.
:::

::: question
For the quadratic class of \ref{ex-quadratic} with $B_S=1$ and $B_\theta=1$, how close must two parameters be for \ref{lem-param} to guarantee that their certificates are within $0.05$ in $\|\cdot\|_{\mathcal V}$?
---
$L_g+L_{\nabla g}=\sqrt{1.5}+\sqrt6\approx1.225+2.449=3.674$, so $\|\theta_1-\theta_2\|\le0.05/3.674\approx0.0136$ suffices. This is a sufficient distance, not the largest allowed one: the lemma is an upper bound, and in some directions parameters farther apart still give certificates within $0.05$.
:::

::: question
With the nonlinear rate function $\rho(v)=v^3$ and $|V|\le B_V$ on $S$, what replaces $c$ in the formula for $L_h$?
---
The Lipschitz constant of $v^3$ on $[-B_V,B_V]$, which is $\sup3v^2=3B_V^2$. So $L_h=\sup_S\sqrt{\|f(x)\|^2+9B_V^4}$.
:::

### Where it is used {#uses}

[[boffi-lemma-4-1]] states the bound in terms of a complexity of the residual class; [[boffi-thm-4-2]] covers the parameter ball and uses \ref{lem-traj} and \ref{lem-param}; [[boffi-thm-4-3]] and [[boffi-thm-4-4]] use the same norm for matrix and kernel classes.

## Card

### The idea {#idea}

Under a common compact reachable set $S$ (Assumption 4.1), measure certificates by $\|V\|_{\mathcal V}=\sup_{x\in S}\|(V(x),\nabla V(x))\|$. If the residual is $L_h$-Lipschitz in $(V,\nabla V)$, then $|h(\xi,V_1)-h(\xi,V_2)|\le L_h\|V_1-V_2\|_{\mathcal V}$ for every initial state. For $V_\theta=g(\cdot,\theta)$ with $\|\theta\|\le B_\theta$ and $g\in C^2$, $\|V_{\theta_1}-V_{\theta_2}\|_{\mathcal V}\le(L_g+L_{\nabla g})\|\theta_1-\theta_2\|$.

### Intuition and example {#intuition}

Values alone are not enough: $\sin(mx)/m$ has values of size $1/m$ but slope $1$, and it can make a Lyapunov residual positive however large $m$ is. For the quadratic $x^{\mathsf T}P_\theta x$ in the plane, $L_g=\sqrt{3/2}\,B_S^2$, $L_{\nabla g}=\sqrt6\,B_S$; for the Lyapunov residual with $\rho(v)=cv$, $L_h=\sup_S\sqrt{\|f\|^2+c^2}$.

### Assumptions and domain {#assumptions}

Assumption 4.1 (compact $S$), Assumption 4.2 (bounded values and gradients, implied by $C^2$ on a bounded ball), a bounded residual and a Lipschitz residual (an explicit hypothesis). Without a compact $S$, a bounded parameter set or smoothness, closeness of parameters gives no closeness of residuals.

### Where it is used {#uses}

[[boffi-lemma-4-1]], [[boffi-thm-4-2]], [[boffi-thm-4-3]], [[boffi-thm-4-4]].
