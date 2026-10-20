+++
summary = "Derivatives, differences, Lyapunov equations and contraction rates in the two time conventions."
prereqs = ["lyapunov-equation", "ode-sensitivity"]
time = "both"
sources = [{ text = "Hespanha, Linear Systems Theory", kind = "textbook", locator = "2nd edition, 2018, §§8.4–8.6", review = "located", url = "https://press.princeton.edu/books/hardcover/9780691179575/linear-systems-theory" }]
+++

## Textbook

### The idea {#statement}

A physical flow, an exact sampled flow, and a numerical update are three different objects. A certificate must use the decrease operation appropriate to the object being analyzed. This station proves the discrete Lyapunov theorem deferred in [[lyapunov-functions]], derives the two matrix equations, and checks what Euler integration changes.

Use $t\ge0$ for continuous time and an integer $k\ge0$ for discrete steps. For $\dot x=f(x)$ with $x\in\mathbb R^p$ and a differentiable scalar $V$, the chain rule gives

$$
\dot V(x)=\nabla V(x)^Tf(x).
$$

For a map $x_{k+1}=g(x_k)$, use the actual one-step change

$$
\Delta V(x)=V(g(x))-V(x).
$$

The expression $\nabla V(x)^Tg(x)$ is a derivative for the different ODE $\dot x=g(x)$; it does not measure this map's decrease. For $g(x)=x/2$ and $V=x^2$, the correct change is $-3x^2/4$, although the derivative expression would be $x^2>0$.

### The calculation {#reasoning}

::: theorem {#discrete-lyapunov} Nonlinear discrete Lyapunov theorem
Let $g:\mathbb R^p\to\mathbb R^p$ and $V:\mathbb R^p\to\mathbb R$ be continuous, with $g(0)=0$ and $V(0)=0$. Suppose on an open neighborhood $D$ of zero that $V(x)>0$ for $x\ne0$ and $\Delta V(x)\le0$. Then zero is stable. If moreover $\Delta V(x)<0$ for $x\in D\setminus\{0\}$, zero is locally asymptotically stable.

If positivity and strict decrease hold on all of $\mathbb R^p$ and $V$ is radially unbounded, the conclusion is global asymptotic stability. Radially unbounded means $V(x)\to\infty$ as $\|x\|\to\infty$.
:::

::: proof
The trapping step must handle jumps. Fix a desired tolerance $\epsilon>0$ and choose $0<R<\epsilon$ with the closed radius-$R$ ball inside $D$. By continuity of $g$ and $g(0)=0$, choose $0<\eta<R$ so that $g$ maps the closed radius-$\eta$ ball into the open radius-$R$ ball.

On the compact annulus $\eta\le\|x\|\le R$, continuity and positivity give a minimum $m>0$ of $V$. Choose $0<c<m$ and form

$$
K=\{x:\|x\|\le\eta,\ V(x)\le c\}.
$$

For $x\in K$, continuity of $g$ gives $\|g(x)\|<R$, and decrease gives $V(g(x))\le c$. The image cannot lie in the annulus: that would require $V(g(x))\ge m>c$. Thus $\|g(x)\|<\eta$ and $g(x)\in K$. This proves invariance without assuming a step crosses a sphere continuously. Since $V(0)=0$, some initial ball of radius $\delta>0$ lies in $K$. All its iterates stay inside $R<\epsilon$, proving stability.

For strict decrease, fix one such compact invariant $K$. The nonnegative numbers $v_k=V(x_k)$ decrease and have a limit $\ell\ge0$. If $\ell>0$, the compact set

$$
\{x\in K:V(x)\ge\ell/2\}
$$

excludes zero. The continuous positive function $-\Delta V$ therefore has a minimum $d>0$ there. Every iterate has $v_k\ge\ell$, so $v_{k+1}\le v_k-d$. Repetition eventually makes $v_k$ negative, a contradiction. Hence $v_k\to0$. For any $\epsilon_1>0$, positivity gives a positive minimum of $V$ on the part of $K$ with $\|x\|\ge\epsilon_1$, if nonempty. Eventually $v_k$ is smaller than this minimum, forcing $\|x_k\|<\epsilon_1$. Thus $x_k\to0$.

For the global result, from any initial state the sublevel set $\{V\le V(x_0)\}$ is compact by radial unboundedness and invariant by decrease. Apply the same limit argument there. Stability has already been proved locally.
:::

The proof uses continuity, not a gradient. Nonstrict decrease gives only stability: $g(x)=-x$ has $\Delta(x^2)=0$ and nonzero iterates alternate forever.

### Matrix equations in the two conventions {#linear-equations}

For constant matrices, write $\dot x=Ax$ and $x_{k+1}=Bx_k$ to distinguish their roles. A symmetric quadratic $V=x^TPx$ gives

$$
\begin{aligned}
\dot V&=x^T(A^TP+PA)x,\\
\Delta V&=x^T(B^TPB-P)x.
\end{aligned}
$$

Thus the equations for a specified symmetric $Q\succ0$ are $A^TP+PA=-Q$ and $B^TPB-P=-Q$. The continuous equation has a unique positive solution when $A$ is Hurwitz, meaning $\operatorname{Re}\lambda(A)<0$. The discrete condition is that $B$ is **Schur stable**, meaning $|\lambda(B)|<1$.

The discrete analogue of the integral construction is a series:

$$
P=\sum_{j=0}^\infty (B^j)^TQB^j.
$$

For a Schur stable matrix, $\|B^j\|\le C\rho^j$ for some $C\ge1$, $0<\rho<1$, by the same Jordan-block reasoning used for exponentials. Hence the series converges absolutely. Each term is positive semidefinite and its first term is $Q\succ0$, giving $P\succ0$. Multiplication by $B^T,B$ shifts the sum's starting index to $1$, so $B^TPB=P-Q$. If two solutions differ by $R$, then $R=(B^k)^TRB^k$ for every $k$, which tends to zero, proving uniqueness. Conversely a positive solution gives $\Delta V=-x^TQx$ and hence exponential decay by the following scalar iteration.

If $V(x_k)$ lies between $c_1\|x_k\|^2$ and $c_2\|x_k\|^2$, and $V(x_{k+1})\le qV(x_k)$ with $0<q<1$, induction gives

$$
\|x_k\|\le\sqrt{c_2/c_1}\,q^{k/2}\|x_0\|.
$$

In particular $\Delta V\le-c_3\|x\|^2$ gives a factor $1-c_3/c_2$ when it is positive. A zero factor means arrival at zero after one step. Squared length shrinks by $q$ and length by $\sqrt q$; write $q=\rho^2$ to express the norm factor $\rho$.

### Sampling and numerical stability {#euler}

For the scalar ODE $\dot x=-x$, exact sampling every $h>0$ yields $x_{k+1}=e^{-h}x_k$, stable for every $h$. Forward Euler uses the first-order approximation $e^{-h}\approx1-h$ and updates $x_{k+1}=(1-h)x_k$. With $V=x^2$,

$$
\Delta V=((1-h)^2-1)x^2
=h(h-2)x^2.
$$

Strict decrease for nonzero $x$ holds precisely when $0<h<2$. At $h=1/2$, length halves each step and energy is quartered. At $h=2$, the sign alternates without decay. At $h=5/2$, length grows by $3/2$ and energy by $9/4$ each step. These are properties of the numerical map, despite the underlying ODE's global exponential stability. A per-step rate also needs its physical time unit: a norm factor $\rho$ every $h$ seconds corresponds at sample times to norm rate $-\log(\rho)/h$ per second.

### Differential lengths: a forward reference {#metric-dictionary}

Part 16 studies an infinitesimal displacement $\delta x$ and a continuously differentiable positive symmetric matrix field $M(x)$. Its squared length is $E=\delta x^TM(x)\delta x$. For continuously differentiable $f$, let $J=Df$ and let $\dot M$ mean the derivative of $M$ along $\dot x=f(x)$. The product rule gives

$$
\dot E=\delta x^T
(\dot M+J^TM+MJ)\delta x.
$$

Thus the matrix inequality $\dot M+J^TM+MJ\preceq-2\alpha M$ gives energy rate $2\alpha$ and length rate $\alpha$. The notation $H\preceq K$ means $z^THz\le z^TKz$ for every vector $z$.

For the map $g$, use $J=Dg$ and $\delta x^+=J(x)\delta x$. The next squared length is

$$
E^+=\delta x^TJ(x)^TM(g(x))J(x)\delta x.
$$

A norm factor $\rho$ therefore uses $J^TM(g(x))J\preceq\rho^2M(x)$. The metric is evaluated at the **next** base state. These algebraic correspondences do not prove the path-to-distance contraction theorem; [[contraction-metrics]] develops its additional geometric and domain assumptions.

### Assumptions and domain {#assumptions}

An inequality must hold for the chosen map or vector field on the stated domain, and discrete iterates must be defined there. The global theorem needs bounded sublevel sets; the local proof above constructs its own compact trap and explicitly prevents jumps out of it. A continuous-time paper theorem remains continuous-time unless a discrete statement and its premises are separately established.

::: question
For $x_{k+1}=x_k/2$, solve $B^TPB-P=-1$ and verify the energy and norm factors. What would incorrectly using $A^TP+PA=-1$ produce?
---
Here $B=1/2$, so $(1/4-1)P=-1$ gives $P=4/3>0$. Its energy factor is $1/4$ and its norm factor $1/2$. The continuous equation with $A=1/2$ would give $P=-1$: it analyzes the unstable ODE $\dot x=x/2$, not this map.
:::

### Where it is used {#uses}

[[contraction-metrics]], [[three-contractions]].

## Card

### The idea {#idea}

Continuous time differentiates: $\dot V=\nabla V^Tf$. Discrete time subtracts: $\Delta V=V(f(x))-V(x)$.

### Intuition and example {#intuition}

Linear stability uses $\Re\lambda(A)<0$ for $\dot x=Ax$, but $|\lambda(A)|<1$ for $x^+=Ax$. The equations are $A^TP+PA=-Q$ and $A^TPA-P=-Q$. Differential dynamics use $\dot{\delta x}=J\delta x$ and $\delta x^+=J\delta x$. Metrics satisfy $\dot M+J^TM+MJ\preceq-2\alpha M$ and $J^TM(f(x))J\preceq\rho^2M(x)$. Squared lengths decay at twice the continuous norm rate; in discrete time the factor is squared. Euler can destroy stability: $\dot x=-x$ is stable, but $x^+=(1-h)x$ needs $0<h<2$.

### Assumptions and domain {#assumptions}

Time discretization has a stability restriction. Paper statements remain continuous unless explicitly translated.

### Where it is used {#uses}

[[contraction-metrics]], [[three-contractions]].
