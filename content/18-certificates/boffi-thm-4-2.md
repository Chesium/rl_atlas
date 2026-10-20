+++
summary = "A smooth k-parameter certificate class that meets a fixed margin on n independent trajectories fails on a fresh trajectory with probability of order k/n, up to margin, smoothness and logarithmic factors."
prereqs = ["boffi-lemma-4-1", "covering-dudley"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 4.2, equation (4.2), p.7; Appendix B.1, p.19", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question {#question}

We run a fixed, unknown closed-loop system from $n$ random initial states and record each whole trajectory. We then search a family of candidate certificates for one member $\widehat V_n$ that satisfies a decrease inequality, with room to spare, at all times along every recorded trajectory. The learned function works on the data by construction. The question is what it says about the next trajectory: if we draw a fresh initial state from the same distribution, how likely is that trajectory to violate the inequality somewhere?

Theorem 4.2 of Boffi et al. answers this for families described by $k$ real parameters. The answer is a probability of order $k/n$, multiplied by factors for the margin, the smoothness of the family and the size of the reachable region, and by $\log^3 n$. This lesson states the theorem, then rebuilds its proof from four pieces: the fast-margin [[boffi-lemma-4-1|Lemma 4.1]], a norm that controls certificate values and derivatives together ([[certificate-classes]]), a covering of the parameter ball, and Dudley's entropy integral ([[covering-dudley]]). Each piece is recalled here at the point it is used.

### The setting, recalled {#setting}

Logarithms are natural. The dynamics are $\dot x=f(x)$ with state $x\in\mathbb R^p$. The flow $\phi_t(\xi)$ is the state at time $t$ of the trajectory that starts at the initial state $\xi$ ([[dynamical-systems]]). Initial states are drawn from a distribution $\mathcal D$ on a compact set $X\subset\mathbb R^p$. The paper takes $T$ to be the maximal interval starting at $0$ on which every such trajectory exists, often $[0,\infty)$. The proof below uses $T$ only through Assumption 4.1 and the trajectory residual \ref{traj-residual}, so it applies unchanged to any fixed horizon $T=[0,t_{\max}]$ chosen before the data, on which the trajectories exist. We use that adaptation in the worked example and say so there. The sample is $\xi_1,\dots,\xi_n$, drawn **independently** from $\mathcal D$; the count $n$ is the number of trajectories, however finely each one is recorded ([[trajectories-as-samples]]).

::: definition {#def-reach} Common compact reachable set (Assumption 4.1)
There is a compact set $S\subset\mathbb R^p$ that contains $\phi_t(\xi)$ for every $\xi\in X$ and every $t\in T$. Write $B_S=\sup_{x\in S}\|x\|$.
:::

A certificate condition is written as a **residual** $h\big(x,\dot x,V(x),\nabla V(x)\big)$ that should be negative. For a Lyapunov certificate the paper's residual is
$$h=\nabla V(x)^{\mathsf T}\dot x+\rho\big(V(x)\big), \label{lyap-residual}$$
where $\rho$ is continuous, strictly increasing and $\rho(0)=0$ (a class-$\mathcal K$ function; the paper calls it $\alpha$, a letter this atlas keeps for physical rates). Negative residual means $V$ decreases along the trajectory at least as fast as $\rho(V)$ ([[lyapunov-functions]]). With $\rho(v)=2\alpha v$, the inequality $h\le0$ reads $\dot V\le-2\alpha V$; for a quadratic $V$ this is the energy form of norm rate $\alpha$.

The proof measures how much an output can change when an input changes. A function $u\mapsto F(u)$ is **$L$-Lipschitz** on a set if $|F(u_1)-F(u_2)|\le L\|u_1-u_2\|$ for all $u_1,u_2$ in the set. In one variable this says every chord has slope at most $L$ in absolute value; for a differentiable function, $\sup|F'|$ is such a constant. For a matrix $M$, the **induced operator norm** is $\|M\|=\max_{\|u\|=1}\|Mu\|$, the largest factor by which $M$ stretches a vector, so $\|Mv\|\le\|M\|\,\|v\|$ for every $v$. Since $\|Mu\|^2=u^{\mathsf T}M^{\mathsf T}Mu$, $\|M\|^2$ is the largest eigenvalue of the symmetric matrix $M^{\mathsf T}M$, which equals the largest eigenvalue of $MM^{\mathsf T}$: if $M^{\mathsf T}Mu=\lambda u$ with $\lambda\ne0$, then $MM^{\mathsf T}(Mu)=\lambda\,Mu$ and $Mu\ne0$, so the two matrices share their nonzero eigenvalues. The symmetric-matrix facts used here are worked in [[lyapunov-functions]].

Every candidate is assumed to have bounded values and gradients on $S$: $|V(x)|\le B_V$ and $\|\nabla V(x)\|\le B_{\nabla V}$ for $x\in S$ and $V\in\mathcal V$ (the paper's Assumption 4.2). On the region where $x\in S$, $|V|\le B_V$ and $\|\nabla V\|\le B_{\nabla V}$, two numbers describe the residual: $B_h$ bounds $|h|$, and $h$ is $L_h$-Lipschitz in the stacked pair $(V,\nabla V)\in\mathbb R^{1+p}$ with $x$ and $\dot x$ held fixed. The paper says both are finite under its assumptions. For $B_h$ that follows from continuity on a compact set. A continuous $h$ need not be Lipschitz, however, so this lesson lists the Lipschitz property as a hypothesis.

A whole trajectory is judged by its worst time. This defines a **new** function of the initial state and the candidate; the paper reuses the letter $h$:
$$h(\xi,V)=\sup_{t\in T}h\big(\phi_t(\xi),\dot\phi_t(\xi),V(\phi_t(\xi)),\nabla V(\phi_t(\xi))\big). \label{traj-residual}$$
The paper writes a maximum. On a compact interval $T$ with a continuous residual the supremum is attained, so the two agree. On $T=[0,\infty)$ the residual can approach its supremum without reaching it, and the supremum is the right object.

::: definition {#def-problem} Margin learning problem (3.2) and violation probability (3.3)
Fix a margin $\gamma>0$, a positive number chosen before seeing data. Problem (3.2) asks for $V$ in a class $\mathcal V$ with $h(\xi_i,V)\le-\gamma$ for $i=1,\dots,n$, that is, the residual is at most $-\gamma$ at **every** time of every sampled trajectory. Write $\widehat V_n$ for any solution. Its violation probability is
$$\operatorname{err}(\widehat V_n)=\Pr_{\xi\sim\mathcal D}\big(h(\xi,\widehat V_n)>0\big),$$
the chance that a fresh, independent trajectory has a positive residual at some time. The probability is over the fresh $\xi$ with $\widehat V_n$ held fixed.
:::

The margin $\gamma$ is a fixed scalar in the residual's units; it is not the RL discount factor. Positivity of $V$, if required, is a separate constraint on the class.

The class used by Theorem 4.2 is parametric:
$$\mathcal V=\{V_\theta(\cdot)=g(\cdot,\theta):\theta\in\mathbb R^k,\ \|\theta\|\le B_\theta\}, \label{class}$$
with $g:\mathbb R^p\times\mathbb R^k\to\mathbb R$ twice continuously differentiable. Here $k$ is the number of parameters and $B_\theta$ the radius of the parameter ball.

### Statement {#statement}

::: theorem {#thm-main} Boffi et al., arXiv:2008.05952v2, Theorem 4.2, with the zero-residual condition added
Assume Assumption 4.1 and the class \ref{class}, with the residual bounded by $B_h$ and $L_h$-Lipschitz in $(V,\nabla V)$ on the region above. Assume also that some $\theta_0$ in the ball gives a certificate whose trajectory residual is identically zero (see the remark after Step 5; without it an extra term appears). Let $0<\delta<1$. If problem (3.2) is feasible, then any solution $\widehat V_n$ satisfies, with probability at least $1-\delta$ over the independent draw of $\xi_1,\dots,\xi_n$,
$$\begin{aligned}\operatorname{err}(\widehat V_n)\le C\Bigg(&B_\theta^2\,(L_g+L_{\nabla g})^2\,L_h^2\,\frac{k\log^3 n}{\gamma^2 n}\\&+\frac{\log\big(\log(B_h/\gamma)/\delta\big)}{n}\Bigg),\end{aligned} \label{bound}$$
where $C$ is a universal constant (the paper writes $O(1)$) and
$$L_g=\sup_{x\in S,\ \|\theta\|\le B_\theta}\|\nabla_\theta g(x,\theta)\|,\qquad L_{\nabla g}=\sup_{x\in S,\ \|\theta\|\le B_\theta}\Big\|\frac{\partial^2 g}{\partial\theta\,\partial x}(x,\theta)\Big\|.$$
:::

$\nabla_\theta g$ is a vector in $\mathbb R^k$ with its Euclidean norm. The mixed derivative is the $p\times k$ matrix whose columns say how the state gradient $\nabla_x g$ moves when one parameter moves; its norm is the induced operator norm. (The paper does not name this norm; the operator norm is the reading that makes Lemma \ref{lem-param} below work.) The zero-residual condition is this lesson's addition. It holds whenever $g$ is linear in $\theta$ and the residual vanishes for $V\equiv0$, as the Lyapunov residual does, because $\theta_0=0$ gives $V\equiv0$. Both suprema are finite: $g$ is $C^2$, so these derivatives are continuous, and $S$ times the parameter ball is compact. The same argument bounds $|g|$ and $\|\nabla_x g\|$, which is the paper's Assumption 4.2, so the theorem need not list it separately.

**Reading the bound.** The first term carries the learning. With everything else fixed, it shrinks like $k/n$ up to the factor $\log^3 n$: doubling the number of trajectories roughly halves it, and doubling the number of parameters doubles it. A smaller margin costs $1/\gamma^2$. One cannot buy a large margin by scaling: for a class linear in $\theta$ and a linear $\rho$, multiplying every certificate by $s$ multiplies the residual, so a margin $\gamma$ becomes $s\gamma$, but the parameter radius $B_\theta$ becomes $sB_\theta$ too, and the ratio $B_\theta/\gamma$ in the bound is unchanged. The factor $B_\theta(L_g+L_{\nabla g})$ is the scale of change in certificate values and gradients across the parameter ball (half of the upper bound $2B_\theta(L_g+L_{\nabla g})$ on any change, since the ball has diameter $2B_\theta$), and $L_h$ converts that into a change in residual. The second term is the price of the confidence level and is order $1/n$ by itself. This is a fast rate: a bound for a general loss that does not use zero training error would decrease like $\sqrt{k/n}$ instead.

Two cautions belong to the statement. First, $C$ is not given. It absorbs the unspecified constant $K$ of Lemma 4.1 and the Dudley constants, so \ref{bound} gives a rate and the dependence on each quantity, not a number to compare with a measured violation rate. Second, $\operatorname{err}$ is a probability over fresh trajectories from $\mathcal D$. A small value does not show that $\widehat V_n$ satisfies the inequality everywhere; it allows a violating set of small probability, which [[boffi-thm-5-1]] later converts into a statement about a region.

### The proof route {#reasoning}

The proof is a chain. Lemma 4.1 reduces the question to bounding a random-sign complexity. Two Lipschitz steps reduce that complexity to covering a $k$-dimensional ball, and Dudley's integral turns the covering numbers into a rate.

**Step 1: the fast-margin lemma.** Write $\mathbf 1\{A\}$ for the indicator, equal to $1$ when the statement $A$ is true and $0$ otherwise. A feasible $\widehat V_n$ makes no margin errors on the sample: the empirical risk $\frac1n\sum_i\mathbf 1\{h(\xi_i,V)>-\gamma\}$ is zero.

Zero training error is what makes the rate fast. The simplest case is a finite class ([[finite-classes]]). A fixed rule whose true error probability is $q$ makes no mistake on $n$ independent examples with probability $(1-q)^n\le e^{-nq}$. With $|\mathcal H|$ rules, a union bound shows that, with probability at least $1-\delta$, every rule with zero training errors has error at most $\log(|\mathcal H|/\delta)/n$, which is order $1/n$. A general uniform-deviation bound, which must also control rules with training errors, decreases only like $1/\sqrt n$. Lemma 4.1 is the analogue for an infinite class with a margin: complexity takes the place of $\log|\mathcal H|$, and it enters squared. The paper adapts Theorem 5 of Srebro, Sridharan and Tewari; we recall its statement and do not reprove it.

::: lemma {#lem-fast} Boffi et al., Lemma 4.1 (recalled)
Fix $\delta\in(0,1)$. Under Assumption 4.1, with $\mathcal V$ uniformly bounded with bounded state gradients on $S$ (Assumption 4.2), if (3.2) is feasible then with probability at least $1-\delta$ over $\xi_1,\dots,\xi_n$, any solution satisfies
$$\operatorname{err}(\widehat V_n)\le K\left(\frac{\log^3n}{\gamma^2}\,\mathfrak R_n(\mathcal V)^2+\frac{2\log\big(\log(4B_h/\gamma)/\delta\big)}{n}\right), \label{lemma}$$
with $K$ universal and
$$\mathfrak R_n(\mathcal V)=\sup_{\xi_1,\dots,\xi_n\in X}\ \mathbb E_{\sigma}\ \sup_{V\in\mathcal V}\ \frac1n\Big|\sum_{i=1}^n\sigma_i\,h(\xi_i,V)\Big|,$$
where $\sigma_1,\dots,\sigma_n$ are independent signs, each $\pm1$ with probability $1/2$. (The paper writes $\varepsilon_i$; we keep $\sigma_i$ from [[rademacher-complexity]] and reserve $\epsilon$ for cover scales.)
:::

This complexity uses the strongest of the conventions in [[rademacher-complexity]]. It takes the absolute value of the signed sum, and it takes the worst sample $\xi_1,\dots,\xi_n$ in $X$ rather than the observed one. It is the complexity of the **residual class** $\{\xi\mapsto h(\xi,V):V\in\mathcal V\}$, even though the paper writes it as a function of $\mathcal V$. With a zero-residual member in the class, the remaining steps show $\mathfrak R_n(\mathcal V)^2\le c_0\,B_\theta^2(L_g+L_{\nabla g})^2L_h^2\,k/n$.

**Step 2: a norm that sees derivatives.** The residual depends on $V$ and on $\nabla V$. Two certificates that are close in value can have very different gradients: in one dimension $V_m(x)=\sin(mx)/m$ satisfies $|V_m|\le1/m$, which tends to $0$, while $V_m'(x)=\cos(mx)$ keeps reaching $1$. So closeness must be measured in both ([[certificate-classes]]). The paper uses
$$\|V\|_{\mathcal V}=\sup_{x\in S}\left\|\begin{bmatrix}V(x)\\ \nabla V(x)\end{bmatrix}\right\|.$$

::: lemma {#lem-param} Parameters control values and gradients
For $\|\theta_1\|,\|\theta_2\|\le B_\theta$, $\ \|V_{\theta_1}-V_{\theta_2}\|_{\mathcal V}\le(L_g+L_{\nabla g})\,\|\theta_1-\theta_2\|$.
:::

::: proof
Fix $x\in S$ and let $\theta(s)=\theta_2+s(\theta_1-\theta_2)$ for $s\in[0,1]$. The ball is convex, so every $\theta(s)$ stays inside it. By the fundamental theorem of calculus along this segment,
$$g(x,\theta_1)-g(x,\theta_2)=\int_0^1\nabla_\theta g(x,\theta(s))^{\mathsf T}(\theta_1-\theta_2)\,ds,$$
so by Cauchy–Schwarz $|V_{\theta_1}(x)-V_{\theta_2}(x)|\le L_g\|\theta_1-\theta_2\|$. For the gradient, write $M(s)$ for the mixed matrix $\frac{\partial^2g}{\partial\theta\,\partial x}(x,\theta(s))$. The same calculus step gives $\nabla_xg(x,\theta_1)-\nabla_xg(x,\theta_2)=\int_0^1M(s)(\theta_1-\theta_2)\,ds$, and $\|M(s)(\theta_1-\theta_2)\|\le\|M(s)\|\,\|\theta_1-\theta_2\|\le L_{\nabla g}\|\theta_1-\theta_2\|$. The norm of an integral is at most the integral of the norm, so $\|\nabla V_{\theta_1}(x)-\nabla V_{\theta_2}(x)\|\le L_{\nabla g}\|\theta_1-\theta_2\|$. For the stacked vector, $\sqrt{a^2+b^2}\le a+b$ when $a,b\ge0$. Taking the supremum over $x\in S$ finishes the proof.
:::

**Step 3: the residual class inherits closeness.** This step uses Assumption 4.1.

::: lemma {#lem-residual} From certificates to trajectory residuals
For all $V_1,V_2\in\mathcal V$ and every $\xi\in X$, $\ |h(\xi,V_1)-h(\xi,V_2)|\le L_h\,\|V_1-V_2\|_{\mathcal V}$.
:::

::: proof
Write $a_t$ and $b_t$ for the residuals of $V_1$ and $V_2$ at time $t$ along the trajectory from $\xi$, and $d=\sup_t|a_t-b_t|$. A supremum moves by at most the largest pointwise change: for every $t$, $a_t\le b_t+d\le\sup_sb_s+d$, so $\sup_ta_t\le\sup_tb_t+d$, and symmetrically, so $|\sup_ta_t-\sup_tb_t|\le d$. At each time the two residuals share $x=\phi_t(\xi)$ and $\dot x$, and differ only through $(V,\nabla V)$, so $|a_t-b_t|\le L_h\|(V_1-V_2,\nabla V_1-\nabla V_2)(\phi_t(\xi))\|$. Because $\phi_t(\xi)\in S$ for every $t$, this is at most $L_h\|V_1-V_2\|_{\mathcal V}$.
:::

Without the common reachable set, the supremum defining $\|\cdot\|_{\mathcal V}$ would have to cover wherever the trajectories might go, and the constants could be infinite. Combining the two lemmas, parameters within distance $r$ give residual functions within $L_h(L_g+L_{\nabla g})r$ of each other, uniformly over all initial states.

**Why not the linear-ball bound?** [[rademacher-complexity]] bounds the complexity of a class that is linear in its parameter by $BR/\sqrt n$, with no logarithms. The quadratic class of Example \ref{ex-quadratic} below is linear in $\theta$, and with a linear $\rho$ so is the pointwise residual. The trajectory residual is not: it is a supremum over time of functions that are each linear in $\theta$, and a supremum of linear functions is not linear. For a general smooth $g$ there is no linearity to begin with. Covers handle both cases, at the price of the integral below.

**Step 4: covering a ball by volume.** An $\epsilon$-**cover** of a set is a finite collection of points such that every member of the set lies within $\epsilon$ of one of them; $N(\epsilon)$ is the smallest size of such a cover.

::: lemma {#lem-volume} Volume comparison
The closed unit ball $\mathbb B^k$ of $\mathbb R^k$ satisfies $N(u;\mathbb B^k)\le(1+2/u)^k$ for $u>0$, and $N(u;\mathbb B^k)=1$ for $u\ge1$.
:::

::: proof
Pick points of the ball one at a time, each at distance more than $u$ from all earlier picks, until no further point can be added. Every point of the ball is then within $u$ of a pick, so the picks form a $u$-cover. Balls of radius $u/2$ around the picks are disjoint and lie inside the ball of radius $1+u/2$. Volume in $\mathbb R^k$ scales with the $k$th power of the radius, so if there are $J$ picks then $J(u/2)^k\le(1+u/2)^k$, which gives $J\le(1+2/u)^k$. This also shows the selection process stops. For $u\ge1$, the center alone is within $u$ of every point.
:::

In one dimension the ball is $[-1,1]$. It needs $\lceil1/u\rceil$ intervals of length $2u$, and $\lceil1/u\rceil\le1+1/u\le1+2/u$. The volume bound is crude but has the right form, $\log N\approx k\log(1/u)$, and that form is all the rate needs.

**Step 5: transfer the cover and integrate.** Rescaling turns a $u$-cover of $\mathbb B^k$ into a $B_\theta u$-cover of the parameter ball. By Lemma \ref{lem-param} the corresponding certificates then form an $\epsilon$-cover of $\mathcal V$ in $\|\cdot\|_{\mathcal V}$, with $\epsilon=Lu$ and $L=B_\theta(L_g+L_{\nabla g})$. Hence
$$N(\epsilon;\mathcal V,\|\cdot\|_{\mathcal V})\le N(\epsilon/L;\mathbb B^k).$$
Dudley's inequality turns covering numbers at all scales into a complexity bound. We use it without proof; its development belongs to [[covering-dudley]]. The idea is chaining: approximate each function by a cover point at scale $1$, correct that by a cover point at scale $\tfrac12$, then $\tfrac14$, and so on. A finite class of $N$ functions with values in $[-b,b]$ has signed complexity at most $b\sqrt{2\log N/n}$ (Massart's finite-class lemma, also recalled without proof; with absolute values, replace $N$ by $2N$). Each refinement therefore contributes about $\epsilon\sqrt{\log N(\epsilon)}/\sqrt n$, and summing over the dyadic scales gives the integral.

Chaining controls how far each residual function is from a **reference** member, not the size of the reference itself. With the zero-residual certificate $V_0=V_{\theta_0}$ as the reference, $h(\xi,V)=h(\xi,V)-h(\xi,V_0)$, and the bound reads
$$\mathfrak R_n(\mathcal V)\le\frac{24L_h}{\sqrt n}\int_0^\infty\sqrt{\log N(\epsilon;\mathcal V,\|\cdot\|_{\mathcal V})}\,d\epsilon. \label{dudley}$$
This is the paper's estimate (stated on p.6 and numbered (B.1) on p.18); we take its constant $24$ from the source without checking it. The factor $L_h$ comes from Lemma \ref{lem-residual}: covering $\mathcal V$ at scale $\epsilon$ covers the residual functions at scale $L_h\epsilon$, uniformly in $\xi$. That uniformity is why a bound for the worst sample is available. Substituting $\epsilon=Lu$,
$$\begin{aligned}\int_0^\infty\sqrt{\log N(\epsilon;\mathcal V)}\,d\epsilon&\le L\int_0^\infty\sqrt{\log N(u;\mathbb B^k)}\,du\\&\le L\sqrt k\int_0^1\sqrt{\log(1+2/u)}\,du=L\sqrt k\,I.\end{aligned}$$
The integral stops at $u=1$ because one point covers the ball beyond that scale, so $\log N=0$. This matters: the bound $k\log(1+2/u)$ alone behaves like $2k/u$ for large $u$, and $\int^\infty u^{-1/2}\,du$ diverges. Near $u=0$ the integrand grows only like $\sqrt{\log(1/u)}$, which is integrable. Numerically $I\approx1.3526$. Therefore
$$\begin{aligned}\mathfrak R_n(\mathcal V)&\le24\,I\,B_\theta(L_g+L_{\nabla g})\,L_h\sqrt{\frac kn}\\&\approx32.5\,B_\theta(L_g+L_{\nabla g})\,L_h\sqrt{\frac kn}.\end{aligned} \label{complexity}$$

::: remark
Why the zero-residual member is needed. Take $k=1$ and $g(x,\theta)\equiv-1$, a constant certificate. Then $L_g=L_{\nabla g}=0$, every cover has one point, and the right side of \ref{dudley} is $0$. Yet every residual equals the same constant $b=\rho(-1)\ne0$, and the absolute convention gives $\mathfrak R_n=|b|\,\mathbb E|\sigma_1+\dots+\sigma_n|/n$, which is about $|b|\sqrt{2/(\pi n)}>0$. This is the single-function example of [[rademacher-complexity]]: with absolute values, even one function has positive complexity. The paper applies \ref{dudley} without this caveat. In general, pick any reference $V_0$ in the class. Then $\mathbb E_\sigma\big|\sum_i\sigma_ih(\xi_i,V_0)\big|\le\sqrt{\sum_ih(\xi_i,V_0)^2}\le B_h\sqrt n$, by Jensen's inequality and the cancellation of cross terms, exactly as in the linear-ball calculation. So the complexity gains at most an extra $B_h/\sqrt n$. After squaring, using $(a+b)^2\le2a^2+2b^2$, the bound gains a term $2KB_h^2\log^3n/(\gamma^2n)$, and the constant of the first term doubles to $2K(24I)^2$, which $C$ absorbs. The new term does not grow with $k$, but it is absent from the paper's display.
:::

**Step 6: square and substitute.** Squaring \ref{complexity} and inserting it in \ref{lemma},
$$\begin{aligned}\operatorname{err}(\widehat V_n)\le K\Bigg(&(24I)^2\,B_\theta^2(L_g+L_{\nabla g})^2L_h^2\,\frac{k\log^3n}{\gamma^2n}\\&+\frac{2\log\big(\log(4B_h/\gamma)/\delta\big)}{n}\Bigg).\end{aligned}$$
The first term is the first term of \ref{bound} with $C=K(24I)^2$. The second term is the lemma's, which differs slightly from the theorem's display (see the remark below). The square is where the rate improves: the complexity is order $\sqrt{k/n}$, and Lemma 4.1 charges its square.

::: remark
The second term differs between the source's two displays: Lemma 4.1 has $2\log(\log(4B_h/\gamma)/\delta)/n$ and Theorem 4.2 has $\log(\log(B_h/\gamma)/\delta)/n$. The factor $2$ is absorbed into $C$. The change from $4B_h$ to $B_h$ is not a constant factor in general: when $B_h/\gamma\le e$, $\log(B_h/\gamma)\le1$, and the theorem's form can be zero or negative, or undefined when $B_h=\gamma$. The derivation above produces the lemma's form. Feasibility forces $|h|\ge\gamma$ at sampled points, so $B_h\ge\gamma$ and $\log(4B_h/\gamma)\ge\log4>0$. The difference sits inside a term that does not drive the rate, and we keep the lemma's form as the derived statement.
:::

### Worked example: a three-parameter quadratic {#example}

::: example {#ex-quadratic} Constants for a quadratic class
Take $p=2$ and $V_\theta(x)=\theta_1x_1^2+2\theta_2x_1x_2+\theta_3x_2^2=x^{\mathsf T}P_\theta x$ with $P_\theta=\begin{bmatrix}\theta_1&\theta_2\\ \theta_2&\theta_3\end{bmatrix}$, so $k=3$. Since $g(x,\theta)=\theta^{\mathsf T}m(x)$ with $m(x)=(x_1^2,\,2x_1x_2,\,x_2^2)$:

- $\nabla_\theta g=m(x)$ and $\|m(x)\|^2=x_1^4+4x_1^2x_2^2+x_2^4=\|x\|^4+2x_1^2x_2^2$. Because $2x_1^2x_2^2\le\tfrac12\|x\|^4$, with equality when $|x_1|=|x_2|$, we get $L_g=\sqrt{3/2}\,B_S^2$.
- $\nabla_xg=2P_\theta x=(2\theta_1x_1+2\theta_2x_2,\ 2\theta_2x_1+2\theta_3x_2)$, so the mixed derivative is $\begin{bmatrix}2x_1&2x_2&0\\0&2x_1&2x_2\end{bmatrix}$. Its squared operator norm is the largest eigenvalue of $4\begin{bmatrix}\|x\|^2&x_1x_2\\x_1x_2&\|x\|^2\end{bmatrix}$, namely $4(\|x\|^2+|x_1x_2|)\le6\|x\|^2$. Hence $L_{\nabla g}=\sqrt6\,B_S$.

Neither constant depends on $\theta$, because $g$ is linear in $\theta$. If $S$ were the disk of radius $B_S=2$, then $L_g=\sqrt{3/2}\cdot4\approx4.90$ and $L_{\nabla g}=2\sqrt6\approx4.90$, so $B_\theta(L_g+L_{\nabla g})\approx9.80\,B_\theta$. The constants grow with the reachable radius: like $B_S^2$ for values and like $B_S$ for gradients.
:::

For the Lyapunov residual \ref{lyap-residual} with a linear $\rho(v)=cv$, changing $(V,\nabla V)$ by $(\Delta V,\Delta\nabla V)$ changes $h$ by $\dot x^{\mathsf T}\Delta\nabla V+c\,\Delta V$. By Cauchy–Schwarz in $\mathbb R^{1+p}$ this is at most $\sqrt{\|\dot x\|^2+c^2}\,\|(\Delta V,\Delta\nabla V)\|$, so $L_h=\sup_{x\in S}\sqrt{\|f(x)\|^2+c^2}$. For a linear system $\dot x=Ax$ this is at most $\sqrt{\|A\|^2B_S^2+c^2}$. For the atlas's shared matrix $A=\begin{bmatrix}-1&3\\0&-2\end{bmatrix}$, $A^{\mathsf T}A=\begin{bmatrix}1&-3\\-3&13\end{bmatrix}$ has trace $14$ and determinant $4$, so its largest eigenvalue is $7+\sqrt{45}$ and $\|A\|=\sqrt{7+\sqrt{45}}\approx3.70$.

Every quantity in the leading term is now explicit except $C$. Here is one complete assembly for the shared system. The setting is chosen so that the fixed-margin premise actually holds, and it uses the fixed-horizon adaptation described in the setting. With the paper's maximal $T=[0,\infty)$ every trajectory reaches the equilibrium in the limit, and the same example is infeasible (next section).

- **Initial states and horizon.** $\mathcal D$ is supported on the annulus $1\le\|\xi\|\le2$, and $T=[0,0.32]$, fixed before the data. For this $A$, the smallest stretch factor of $e^{At}$ stays at least $0.37$ for $t\le0.32$, so every trajectory point satisfies $\|x\|\ge0.37$.
- **Reachable set.** $\max_{t\ge0}\|e^{At}\|\approx1.012$, so every trajectory stays in the disk of radius $2.03$. Take $B_S=2.03$.
- **Parameters.** Take $B_\theta=2$. The certificate $P=\begin{bmatrix}1/2&1/2\\1/2&1\end{bmatrix}$ of [[lyapunov-functions]] is $\theta=(\tfrac12,\tfrac12,1)$, with $\|\theta\|\approx1.22$, so it lies in the class. The class also contains $\theta=0$, the certificate $V\equiv0$, whose residual is $\rho(0)=0$ at every time; this is the zero-residual member the theorem needs.
- **Residual.** Take $\rho(v)=2\alpha v$ with norm rate $\alpha=0.1$, so $c=0.2$.
- **Constants.** $L_g=\sqrt{3/2}\,(2.03)^2\approx5.05$, $L_{\nabla g}=\sqrt6\cdot2.03\approx4.97$ and $L_h\le\sqrt{13.71\cdot2.03^2+0.04}\approx7.52$. Then $B_\theta(L_g+L_{\nabla g})L_h\approx151$, and $B_\theta^2(L_g+L_{\nabla g})^2L_h^2\,k\approx2.27\times10^4\cdot3\approx6.8\times10^4$.

- **Feasibility.** For that certificate $\dot V=-\|x\|^2$, and $\rho(V)=0.2\,x^{\mathsf T}Px\le0.2\lambda_{\max}(P)\|x\|^2\approx0.262\|x\|^2$, so the residual is at most $-0.738\|x\|^2$. Since $\|x\|^2\ge0.37^2\approx0.137$ along every trajectory, the residual is at most $-0.1$, and problem (3.2) is feasible with $\gamma=0.1$ for every sample.

With $\gamma=0.1$, the leading term is $C\cdot6.8\times10^6\,\log^3n/n$. Even before the unknown $C$, this exceeds $1$ until $n$ is about $10^{11}$. The theorem tells us how the guarantee scales with $n$, $k$, $\gamma$ and the radii. It does not provide a usable sample size for this small system. Adding features changes $k$ and the smoothness constants together. For instance, the six monomials of degree two and four, $x_1^2,x_1x_2,x_2^2,x_1^4,x_1^2x_2^2,x_2^4$, give $k=6$, and the quartic terms make $L_g$ grow like $B_S^4$. Restricting the class, for example to $P_\theta\succeq I$ as the atlas Lab does, can only lower $\mathfrak R_n$, because a supremum over a smaller set is no larger, so the bound still applies.

### When the premise fails: a fixed margin at the equilibrium {#feasibility}

The theorem assumes problem (3.2) is feasible, and for the most common residual that assumption can fail for a structural reason. Lyapunov candidates are required to vanish at the equilibrium, and every quadratic $x^{\mathsf T}Px$ does. At the equilibrium $x=0$, $\dot x=f(0)=0$ and $V(0)=0$, so \ref{lyap-residual} gives $h=\rho(0)=0$. Near the equilibrium the residual stays close to $0$ for every such candidate at once: $f$ is continuous and the class has uniformly bounded gradients, so $\nabla V^{\mathsf T}f(x)$ and $V(x)$ are uniformly small there. Suppose a sampled trajectory starts at the equilibrium or near it, or $T$ is unbounded and the trajectory converges to it. Then the trajectory residual $h(\xi,V)$ is at least about $0$ for **every** candidate $V$, and no $V$ achieves $h(\xi,V)\le-\gamma$ with $\gamma>0$ fixed in advance. If $\mathcal D$ gives positive probability to every neighborhood of the equilibrium, as a uniform distribution on a ball around it does, some sample eventually lands close enough, and (3.2) becomes infeasible with probability tending to one as $n$ grows. The theorem is then not wrong but vacuous: its premise does not hold.

A fixed margin is therefore meaningful when the residual and the region keep $-\gamma$ attainable along every sampled trajectory. For a Lyapunov residual that means the sampled trajectory segments stay away from the equilibrium. The atlas Lab makes a different choice. It fits with norm rate $\alpha+0.05$, that is $\dot V\le-2(\alpha+0.05)V$, and tests at norm rate $\alpha$. This is a **relative** margin: the room to spare is proportional to $V$ and vanishes at the equilibrium. That keeps the fit feasible near the origin, but it is not the scalar $\gamma$ of (3.2). The Lab's holdout violation rates are therefore numerical evidence about its own procedure, not an instance of \ref{bound}, and its dashed $k/n$ curve is a comparison of shapes ([[certificates-in-practice]], [[vdp-certificates]]).

### Assumptions and where they enter {#assumptions}

- **Independent initial states from $\mathcal D$, class fixed in advance.** Lemma 4.1 is a statement about i.i.d. draws, and it covers every member of a class chosen before the data. Time samples along one trajectory do not add to $n$. A class enlarged after seeing the data, such as features added until the fit succeeds, is not the fixed class of the theorem.
- **A zero-residual member (added here).** Some certificate in the class has trajectory residual identically zero; for a linear-in-$\theta$ Lyapunov class, $\theta=0$ works. It lets Dudley's inequality be chained from that member in Step 5. Without it the complexity gains $B_h/\sqrt n$ and the bound gains a term of order $B_h^2\log^3n/(\gamma^2n)$.
- **Horizon fixed before the data.** The paper's $T$ is the maximal existence interval. Any fixed horizon on which the trajectories exist works equally well, because $T$ enters only through Assumption 4.1 and the trajectory residual.
- **Common compact reachable set (Assumption 4.1).** It makes $B_S$, $L_g$, $L_{\nabla g}$, $B_h$ and $L_h$ finite, and it lets the norm $\|\cdot\|_{\mathcal V}$ control residuals along whole trajectories (Lemma \ref{lem-residual}).
- **$C^2$ parameterization on a bounded ball.** Bounded derivatives give Lemma \ref{lem-param}, and the ball gives the volume count with $k$ in the exponent. Second derivatives appear because the residual uses $\nabla_xV$, and its sensitivity to $\theta$ is a mixed second derivative.
- **The inequality holds at all times, not at recorded times.** The premise $h(\xi_i,V)\le-\gamma$ is a supremum over the whole interval $T$. A solver that enforces the inequality on a time grid checks finitely many times and can miss a violation between them. Closing that gap needs a separate argument, such as a bound on how fast the residual can change in time together with a grid margin ([[trajectories-as-samples]]).
- **Fixed positive margin and feasibility.** These give zero empirical margin loss, which is what Lemma 4.1 needs. They are premises, not conclusions. The theorem says nothing about whether a numerical optimizer finds a solution.
- **What is concluded.** The conclusion is a high-probability bound on the probability that a fresh trajectory violates the inequality. It is not a proof that $\widehat V_n$ is a valid certificate everywhere. Turning a small violation probability into stability on a region needs the further arguments of [[boffi-thm-5-1]].

### Exercises {#exercises}

::: question
Where exactly would the proof break if trajectories from $X$ could leave every compact set?
---
In Lemma \ref{lem-residual}. Its last inequality bounds the residual difference at $\phi_t(\xi)$ by the supremum over $S$. Without a common compact $S$ the suprema defining $\|\cdot\|_{\mathcal V}$, $L_g$, $L_{\nabla g}$, $B_h$ and $L_h$ may be infinite, and the cover of $\mathcal V$ would not control the residual along the whole trajectory.
:::

::: question
With $\gamma$, $\delta$, the class and the system fixed, the leading term is $0.04$ at $n=1000$. Roughly what is it at $n=4000$, and why "roughly"?
---
The term is proportional to $\log^3n/n$, and the unknown constant cancels in a ratio of two such terms. The ratio is $(\log4000/\log1000)^3/4\approx(8.294/6.908)^3/4\approx1.731/4\approx0.433$, so the leading term becomes about $0.017$. "Roughly" refers only to rounding. (The whole bound also has a second term, which scales as $1/n$ and so changes differently.) Neither number is a measured violation rate: each is a value of the bound, whose constant is unknown.
:::

::: question
Why does the entropy integral in Step 5 not diverge, even though $k\log(1+2/u)$ grows without bound as $u\to0$ and is positive for every $u$?
---
At small $u$ the integrand $\sqrt{k\log(1+2/u)}$ grows only like $\sqrt{\log(1/u)}$, and $\int_0^1\sqrt{\log(1/u)}\,du$ is finite (it equals $\sqrt\pi/2$). At large $u$ we do not use the volume bound: for $u\ge1$ the unit ball is covered by its center, so $\log N=0$ and the integrand vanishes.
:::

::: question
A learner fits $V(x)=x^{\mathsf T}Px$ to trajectories of $\dot x=Ax$ that all converge to the origin over $T=[0,\infty)$, with residual $\nabla V^{\mathsf T}\dot x+V$. Can it satisfy (3.2) with $\gamma=0.1$? What does that mean for Theorem 4.2?
---
No. Along each trajectory $x(t)\to0$, so the residual tends to $\rho(V(0))=0>-0.1$, and the supremum over $t$ is at least $0$ for every $P$. It may never be attained, which is why \ref{traj-residual} uses a supremum. Problem (3.2) is infeasible and the theorem's conclusion does not apply. A relative margin or a region that excludes a neighborhood of the equilibrium would be needed; the Lab's relative margin is not the theorem's premise.
:::

::: question
In Example \ref{ex-quadratic}, show that the bound $\|m(x)\|\le\sqrt{3/2}\,\|x\|^2$ is attained, and compute $L_{\nabla g}$ when $S$ is the disk of radius $3$.
---
At $x=(r,r)/\sqrt2$, $x_1^2=x_2^2=r^2/2$, so $\|m(x)\|^2=r^4/4+r^4+r^4/4=\tfrac32r^4$. For $B_S=3$, $L_{\nabla g}=\sqrt6\cdot3\approx7.35$, attained where $|x_1|=|x_2|$.
:::

### Where it is used {#uses}

[[boffi-thm-5-1]] turns a small violation probability into decrease on an eroded region; [[learning-certificates]] poses the learning problem; [[boffi-thm-4-3]] sharpens the parameter count for matrix-structured classes.

## Card

### Statement {#statement}

For $\mathcal V=\{g(\cdot,\theta):\|\theta\|\le B_\theta\}$ with $\theta\in\mathbb R^k$ and $g$ twice continuously differentiable, under a common compact reachable set $S$, if the fixed-margin problem $h(\xi_i,V)\le-\gamma$ for $i=1,\dots,n$ is feasible, then any solution satisfies, with probability at least $1-\delta$ over $n$ independent initial states,
$$\operatorname{err}(\widehat V_n)\le C\left(B_\theta^2(L_g+L_{\nabla g})^2L_h^2\frac{k\log^3n}{\gamma^2n}+\frac{\log(\log(B_h/\gamma)/\delta)}{n}\right),$$
with $L_g=\sup\|\nabla_\theta g\|$, $L_{\nabla g}=\sup\|\partial^2g/\partial\theta\partial x\|$ over $S$ and the ball, and $C$ universal but unspecified. This is the printed form. The derivation gives the lemma's second term $2\log(\log(4B_h/\gamma)/\delta)/n$ (see the Textbook remark), and it needs a zero-residual member of the class; otherwise a term of order $B_h^2\log^3n/(\gamma^2n)$ is added.

### Intuition and example {#intuition}

Close parameters give close certificate values **and** gradients, so they give close trajectory residuals (the supremum of the residual over time). A $k$-dimensional ball needs about $(1/\epsilon)^k$ points to cover it at scale $\epsilon$, so the random-sign complexity is order $\sqrt{k/n}$. Zero margin errors let Lemma 4.1 charge the square of that complexity, which gives order $k/n$.

Example: $x^{\mathsf T}P_\theta x$ in the plane has $k=3$, $L_g=\sqrt{3/2}\,B_S^2$ and $L_{\nabla g}=\sqrt6\,B_S$.

### Assumptions and domain {#assumptions}

- I.i.d. initial states; the class is fixed before the data; $n$ counts trajectories.
- A member with identically zero trajectory residual, such as $\theta=0$ for a linear-in-$\theta$ Lyapunov class. This is added here; otherwise the bound gains a $B_h^2$ term.
- A common compact reachable set $S$; a bounded parameter ball; a $C^2$ parameterization.
- The residual is bounded by $B_h$ and $L_h$-Lipschitz in $(V,\nabla V)$.
- A fixed scalar margin $\gamma>0$, and (3.2) is feasible. For a Lyapunov residual this fails on trajectories that reach the equilibrium; the Lab's relative margin is a different premise.
- The conclusion bounds a violation probability; it is not validity everywhere, and the constants are not calibrated.

### Proof sketch {#proof}

1. Lemma 4.1: $\operatorname{err}\le K(\log^3n\,\mathfrak R_n^2/\gamma^2+2\log(\log(4B_h/\gamma)/\delta)/n)$, using the worst-sample absolute Rademacher complexity of the residual class.
2. $\|V_{\theta_1}-V_{\theta_2}\|_{\mathcal V}\le(L_g+L_{\nabla g})\|\theta_1-\theta_2\|$, by the mean value argument on values and gradients.
3. $|h(\xi,V_1)-h(\xi,V_2)|\le L_h\|V_1-V_2\|_{\mathcal V}$, because a supremum over time moves by at most the largest pointwise change, and trajectories stay in $S$.
4. $\log N(u;\mathbb B^k)\le k\log(1+2/u)$ by volume, and $N=1$ for $u\ge1$.
5. Dudley, chained from a zero-residual member: $\mathfrak R_n\le24L_hn^{-1/2}\int\sqrt{\log N}\le24\,I\,B_\theta(L_g+L_{\nabla g})L_h\sqrt{k/n}$, with $I=\int_0^1\sqrt{\log(1+2/u)}\,du\approx1.35$. Without such a member, add $B_h/\sqrt n$: a single function has positive absolute complexity. The paper omits this caveat.
6. Square and substitute into step 1.

Source status: located. This proof route is reconstructed from the source; an independent proof audit has not been recorded.

### Where it is used {#uses}

[[boffi-thm-5-1]], [[learning-certificates]], [[boffi-thm-4-3]].
