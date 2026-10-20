+++
summary = "Small violation volume yields decrease on an eroded reachable domain outside an explicit equilibrium neighborhood."
prereqs = ["boffi-thm-4-2", "incremental-stability", "comparison-functions", "lyapunov-functions"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 5.1, equations (5.1)–(5.3), p.8; Appendix C.1, pp.25–26", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question {#question}

[[boffi-thm-4-2]] ends with a probability. A certificate $V$ learned from $n$ trajectories fails on a fresh trajectory with small probability $\operatorname{err}(V)$. A controller designer wants something else: a region of the state space on which $V$ really decreases, and a bound on how $V$ evolves along every trajectory that starts there. A small probability of failure allows failures. It does not say where they are.

Theorem 5.1 of Boffi et al. converts the first kind of statement into the second, at a price. It needs one more property of the dynamics, a uniform bound on how far two trajectories can separate ([[incremental-stability]]), and it gives up two regions: a strip along the boundary of the initial set, and a ball around the equilibrium. This lesson states the theorem, proves it in four short steps, computes every constant for the atlas's shared linear system, and then asks where Theorem 4.2's probability enters.

### The setting, recalled {#setting}

The dynamics are $\dot x=f(x)$ with $x\in\mathbb R^p$ and $f$ continuously differentiable (added: the paper's §3 asks only for continuity, but its use of $\nabla q$ needs $q=\nabla V^{\mathsf T}f$ to be differentiable). The flow $\phi_t(\xi)$ is the state at time $t$ of the trajectory that starts at $\xi$. $T$ is a time interval starting at $0$, such as $[0,\infty)$ or a horizon $[0,t_{\max}]$ fixed in advance, on which every trajectory below exists.

Initial states lie in a compact set $X\subset\mathbb R^p$. It is **full-dimensional**: it has positive volume. Write $\operatorname{vol}$ for volume in $\mathbb R^p$ (length when $p=1$, area when $p=2$). The **uniform probability measure** on $X$ is
$$\nu(A)=\frac{\operatorname{vol}(A)}{\operatorname{vol}(X)},\qquad A\subseteq X,$$
the fraction of $X$ that $A$ occupies. The closed ball of radius $s$ about $c$ is $\mathbb B(c,s)=\{x:\|x-c\|\le s\}$; its volume is $s^p\operatorname{vol}(\mathbb B(0,1))$, and $\operatorname{vol}(\mathbb B(0,1))$ equals $2$ for $p=1$ and $\pi$ for $p=2$. The **reachable set** is
$$S=\bigcup_{t\in T}\phi_t(X),$$
every state visited by a trajectory from $X$. Here, unlike in [[boffi-thm-4-2]], $S$ is exactly the reachable set.

The candidate $V$ is twice continuously differentiable, and $V(x)\ge\mu\|x\|^2$ on $S$ for some $\mu>0$, so the equilibrium sits at the origin. Its rate of change along trajectories is
$$q(x)=\nabla V(x)^{\mathsf T}f(x),\qquad \frac{d}{dt}V(\phi_t(\xi))=q(\phi_t(\xi)),$$
by the chain rule ([[lyapunov-functions]]). Fix $\lambda>0$. The decrease condition $q\le-\lambda V$ says $V$ decays at least like $e^{-\lambda t}$. For a quadratic $V$ this is an **energy rate**: lengths then decay at rate $\lambda/2$.

::: definition {#def-viol} Violation set
$$X_b=\Big\{\xi\in X:\ \sup_{t\in T}\big(q(\phi_t(\xi))+\lambda V(\phi_t(\xi))\big)>0\Big\}.$$
An initial state is **bad** if its trajectory violates $q\le-\lambda V$ at some time, and **good** otherwise.
:::

This is the trajectory residual of [[boffi-thm-4-2]] with $\rho(v)=\lambda v$, and $\nu(X_b)$ is the probability that a uniformly drawn initial state is bad. The paper's display (5.1) prints the condition as $\langle\nabla V,f\rangle>\lambda V$, without the minus sign. Its proof (Appendix C.1, p.26) uses $q\le-\lambda V$ along good trajectories, and its conclusion (5.2) is a negative decrease. We follow the proof.

The constants are suprema of the two gradients:
$$B_{\nabla V}=\sup\|\nabla V(x)\|,\qquad B_{\nabla q}=\sup\|\nabla q(x)\|.$$
The paper takes them over $S$. The proof uses them as Lipschitz constants between two points of $S$, which needs the straight segment between those points. We therefore take both suprema over a convex set containing $S$ on which $V$ is defined and twice continuously differentiable (this lesson's addition). Then $|V(a)-V(b)|\le B_{\nabla V}\|a-b\|$ for $a,b\in S$, by the mean value theorem along the segment, and likewise for $q$.

The extra property of the dynamics is a uniform pair bound, recalled from [[incremental-stability]].

::: definition {#def-incr} Incremental stability (Assumption 5.1)
There is a function $\beta(s,t)$, increasing and continuous in $s$ with $\beta(0,t)=0$, and nonincreasing in $t$, such that
$$\|\phi_t(\xi_1)-\phi_t(\xi_2)\|\le\beta(\|\xi_1-\xi_2\|,t)$$
for all $\xi_1,\xi_2\in X$ and $t\in T$.
:::

The paper calls $\beta$ class $\mathcal{KL}$; its definition (p.8) asks only for nonincrease in $t$, without the usual limit zero. The proof uses only the properties listed. The exponential case $\beta(s,t)=Ce^{-at}s$ is the one used below.

Finally, the two geometric objects. The radius
$$r(\varepsilon)=\Big(\frac{\varepsilon\operatorname{vol}(X)}{\operatorname{vol}(\mathbb B(0,1))}\Big)^{1/p} \label{radius}$$
is chosen so that a ball of radius $r$ has $\nu$-measure exactly $\varepsilon$: $\operatorname{vol}(\mathbb B(c,r))=r^p\operatorname{vol}(\mathbb B(0,1))=\varepsilon\operatorname{vol}(X)$. The **eroded set** keeps the initial states whose whole $r$-ball fits in $X$, and $\widetilde S$ is what they reach:
$$\widetilde X=\{\xi\in X:\mathbb B(\xi,r)\subseteq X\},\qquad \widetilde S=\bigcup_{t\in T}\phi_t(\widetilde X).$$

### Statement {#statement}

::: theorem {#thm-51} Boffi et al., arXiv:2008.05952v2, Theorem 5.1, with the proof's sign and three added conditions
Assume the setting above, \ref{def-incr}, and $\nu(X_b)<\varepsilon$ for some $\varepsilon\in(0,1)$. Write $r=r(\varepsilon)$ and $E=B_{\nabla q}+\lambda B_{\nabla V}$. Then three conclusions hold.

(i) For every $\xi\in\widetilde X$ and $t\in T$,
$$q(\phi_t(\xi))\le-\lambda V(\phi_t(\xi))+E\,\beta(r,t). \label{transfer}$$

(ii) For every $\eta\in(0,1)$, $q(x)\le-(1-\eta)\lambda V(x)$ at every $x\in\widetilde S$ with $\|x\|\ge r_b$, where
$$r_b=\sqrt{\frac{\beta(r,0)}{\eta\mu}\Big(B_{\nabla V}+\frac{B_{\nabla q}}{\lambda}\Big)}. \label{rb}$$

(iii) For every $\xi\in\widetilde X$ and $t\in T$, $V(\phi_t(\xi))\le u_\xi(t)$, where $u_\xi$ solves
$$\dot u_\xi=-\lambda u_\xi+E\,\beta(r,t),\qquad u_\xi(0)=V(\xi). \label{compare}$$
:::

Conclusion (ii) is the paper's (5.2) and (iii) its (5.3); (i) is the intermediate bound of its proof. The three conditions added here are $f\in C^1$, the convex domain for the gradient bounds, explained above, and the strict inequality $\nu(X_b)<\varepsilon$ in place of the paper's $\le$; the remark after the proof explains why. If only $\nu(X_b)\le\varepsilon$ is known, apply the theorem with any slightly larger $\varepsilon'$: $r$, $\beta(r,0)$ and $r_b$ change continuously.

**Reading the conclusions.** Conclusion (i) says that after a bad volume of less than $\varepsilon$, the decrease inequality still holds everywhere on $\widetilde S$ up to an **additive** error $E\beta(r,t)$. The error vanishes as $\varepsilon\to0$, because $r\to0$ and $\beta(0,t)=0$. Conclusion (ii) converts the additive error into a slightly slower **multiplicative** decrease, which is possible only where $V$ is large enough to absorb it, that is outside a ball. Conclusion (iii) integrates (i) along a trajectory. None of the three says that $V$ is a certificate everywhere. Inside $\mathbb B(0,r_b)$, and outside $\widetilde S$, the theorem asserts nothing.

### The proof {#reasoning}

Fix $\xi\in\widetilde X$ and $t\in T$. The proof finds a good initial state near $\xi$, carries the closeness forward to time $t$, and pays for the distance with the two Lipschitz constants.

**Step 1: a small set contains no ball of radius $r$.**

::: lemma {#lem-noball} Small sets contain no large balls
If $U\subseteq X$ and $\nu(U)<\varepsilon$, then $U$ contains no closed ball of radius $r(\varepsilon)$.
:::

::: proof
If $\mathbb B(c,r)\subseteq U$, then $\nu(U)\ge\nu(\mathbb B(c,r))=\operatorname{vol}(\mathbb B(c,r))/\operatorname{vol}(X)=\varepsilon$, by the choice \ref{radius}. This contradicts $\nu(U)<\varepsilon$.
:::

This is the only place the uniform measure enters: it turns "small probability" into "small volume", and volume controls the size of the balls a set can contain. The lemma is the paper's Lemma C.1 (p.24) in the Euclidean case.

**Step 2: a nearby good initial state.** Because $\xi\in\widetilde X$, the ball $\mathbb B(\xi,r)$ lies in $X$. By \ref{lem-noball} with $U=X_b$, that ball is not contained in $X_b$, so it contains a good initial state $\xi'$ with $\|\xi-\xi'\|\le r$. Along its whole trajectory,
$$q(\phi_t(\xi'))\le-\lambda V(\phi_t(\xi')),\qquad t\in T.$$
The erosion is what makes this step work. For a state $\xi$ near the edge of $X$, the part of $\mathbb B(\xi,r)$ inside $X$ can be smaller than $\varepsilon$ and lie entirely in $X_b$.

**Step 3: transport the closeness.** By \ref{def-incr} and monotonicity of $\beta$ in its first argument,
$$d_t=\|\phi_t(\xi)-\phi_t(\xi')\|\le\beta(\|\xi-\xi'\|,t)\le\beta(r,t).$$
Without incremental stability, two trajectories that start within $r$ of each other could be far apart at time $t$, and the good trajectory would say nothing about the bad one.

**Step 4: transfer the inequality.** Write $y=\phi_t(\xi)$ and $y'=\phi_t(\xi')$, both in $S$. Use the Lipschitz bound for $q$, then the good inequality at $y'$, then the Lipschitz bound for $V$:
$$\begin{aligned}q(y)&\le q(y')+B_{\nabla q}\,d_t\\&\le-\lambda V(y')+B_{\nabla q}\,d_t\\&\le-\lambda V(y)+\lambda B_{\nabla V}\,d_t+B_{\nabla q}\,d_t.\end{aligned}$$
With Step 3, $q(y)\le-\lambda V(y)+E\beta(r,t)$. This is \ref{transfer}, conclusion (i).

**Step 5: absorb the error outside a ball.** Since $\beta$ is nonincreasing in $t$, $\beta(r,t)\le\beta(r,0)$. Split $-\lambda V=-(1-\eta)\lambda V-\eta\lambda V$. If $\|y\|\ge r_b$, then $V(y)\ge\mu\|y\|^2\ge\mu r_b^2$, so
$$q(y)\le-(1-\eta)\lambda V(y)-\eta\lambda\mu r_b^2+E\beta(r,0).$$
The last two terms total at most zero exactly when $\eta\lambda\mu r_b^2\ge E\beta(r,0)$. Dividing $E$ by $\lambda$ gives \ref{rb}. Every $x\in\widetilde S$ equals $\phi_t(\xi)$ for some $\xi\in\widetilde X$ and $t\in T$, so conclusion (ii) follows.

**Step 6: integrate along the trajectory.** Let $v(t)=V(\phi_t(\xi))$. Conclusion (i) says $\dot v\le-\lambda v+E\beta(r,t)$. The linear comparison argument of [[comparison-functions]] (multiply by $e^{\lambda t}$ and integrate) gives
$$v(t)\le e^{-\lambda t}V(\xi)+E\int_0^te^{-\lambda(t-s)}\beta(r,s)\,ds,$$
and the right side is the solution $u_\xi(t)$ of \ref{compare}. This is conclusion (iii).

::: remark
Why the strict inequality. The paper assumes $\nu(X_b)\le\varepsilon$ and argues that for every small enough increment $\tau>0$ the slightly larger ball $\mathbb B(\xi,r+\tau)$ still lies in $X$ and has measure above $\varepsilon$. That fails at points on the edge of $\widetilde X$, where $\mathbb B(\xi,r)$ touches the boundary of $X$. If $X$ consists of two disjoint disks, and the smaller has exactly radius $r$ and is the whole bad set, then $\nu(X_b)=\varepsilon$, the smaller disk's center belongs to $\widetilde X$, and no good state lies within $r+\tau$ of it. The strict inequality removes the increment entirely, as in Step 2. (The paper calls the increment $\delta$; we rename it because $\delta$ is the failure probability on this route.) A second repair keeps the paper's $\le$: read "$\mathbb B(\xi,r)$ strictly contained in $X$" as $\mathbb B(\xi,r)\subseteq\operatorname{int}X$, the interior. Then a slightly larger ball still lies in $X$, by compactness of $\mathbb B(\xi,r)$, and the paper's increment exists. We have not checked whether the conclusion itself can fail in that example; we only note that the printed argument does not cover it.
:::

The equilibrium ball is not an artifact of the proof. At $x=0$, $V=0$ and $q=0$, so the decrease $-\lambda V$ vanishes while the transfer error $E\beta(r,t)$ does not. Near the equilibrium the inequality $q\le-(1-\eta)\lambda V$ asks for a tiny decrease, and an additive error of fixed size cannot certify it. This is the same obstruction that makes a fixed margin $\gamma$ impossible near the equilibrium in [[boffi-thm-4-2]].

### Worked example: the shared linear system {#example}

::: example {#ex-shared} Every constant for $A$ and $P$ on the unit disk
Take $p=2$, $\dot x=Ax$ with $A=\begin{bmatrix}-1&3\\0&-2\end{bmatrix}$, initial set $X$ the closed unit disk, $T=[0,\infty)$, and the candidate $V(x)=x^{\mathsf T}Px$ with $P=\begin{bmatrix}1/2&1/2\\1/2&1\end{bmatrix}$.

- **Decrease.** $A^{\mathsf T}P+PA=-I$, so $q(x)=-\|x\|^2$. The eigenvalues of $P$ are $\lambda_{\min}(P)\approx0.19098$ and $\lambda_{\max}(P)\approx1.30902$, so $V\le\lambda_{\max}(P)\|x\|^2$ and $q\le-V/\lambda_{\max}(P)\approx-0.764V$. Take $\lambda=0.5$. Then $q\le-\lambda V$ everywhere and $X_b$ is empty.
- **Incremental stability.** [[contraction-metrics]] shows that $\dot x=Ax$ contracts in the constant metric $P$ with norm rate $1/(2\lambda_{\max}(P))\approx0.382$ and prefactor $\sqrt{\lambda_{\max}(P)/\lambda_{\min}(P)}\approx2.618$. So $\beta(s,t)=2.618\,e^{-0.382t}s$ satisfies \ref{def-incr}.
- **Reachable set and gradients.** Numerically $\sup_{t\ge0}\|e^{At}\|\approx1.012$, so $S$ lies in the disk of radius $1.012$, which is convex. There $\|\nabla V\|=\|2Px\|\le2\lambda_{\max}(P)\cdot1.012\approx2.649$ and $\|\nabla q\|=\|{-2x}\|\le2.024$. Also $\mu=\lambda_{\min}(P)\approx0.191$.
- **Radius.** For the unit disk, $\operatorname{vol}(X)=\operatorname{vol}(\mathbb B(0,1))$, so \ref{radius} gives $r=\varepsilon^{1/2}$ and $\widetilde X$ is the disk of radius $1-\varepsilon^{1/2}$.

Since $\nu(X_b)=0$, the premise $\nu(X_b)<\varepsilon$ holds for **every** $\varepsilon>0$. This mimics the practical situation, where data supply only an upper bound $\varepsilon$, never the exact volume. With $\eta=1/2$, $B_{\nabla V}+B_{\nabla q}/\lambda\approx6.697$ and
$$\begin{aligned}r_b^2&=\frac{2.618\,r\cdot6.697}{0.5\cdot0.191}\approx183.6\,r,\\ r_b&\approx13.55\,\varepsilon^{1/4}.\end{aligned}$$

- $\varepsilon=10^{-2}$: $r=0.1$ and $r_b\approx4.28$. The excluded ball is larger than $S$, so conclusion (ii) says nothing.
- $\varepsilon=10^{-4}$: $r=0.01$ and $r_b\approx1.36$, still vacuous.
- $\varepsilon=10^{-6}$: $r=0.001$ and $r_b\approx0.43$. Decrease at rate $(1-\eta)\lambda=0.25$ is certified on $\widetilde S$ outside radius $0.43$.
- Reaching $r_b\le0.1$ requires $\varepsilon\le3.0\times10^{-9}$.
:::

The exponent $1/4$ is the paper's example (p.8): a ball in $p$ dimensions has $r\propto\varepsilon^{1/p}$, and a linear $\beta(r,0)\le Cr$ puts $r$ under a square root, so $r_b\propto\varepsilon^{1/(2p)}$. For $p=2$ that is $\varepsilon^{1/4}$. A tenfold smaller violation volume shrinks the excluded ball only by $10^{1/4}\approx1.78$; halving $r_b$ needs $\varepsilon/16$. In $p$ dimensions halving it needs $\varepsilon/2^{2p}$.

Conclusion (iii) is informative even when (ii) is vacuous. With $\beta(r,t)=2.618\,re^{-0.382t}$ the integral is explicit:
$$u_\xi(t)=e^{-\lambda t}V(\xi)+2.618\,Er\,\frac{e^{-0.382t}-e^{-\lambda t}}{\lambda-0.382},$$
with $E=B_{\nabla q}+\lambda B_{\nabla V}\approx3.35$ and $\lambda-0.382\approx0.118$. For $\varepsilon=10^{-6}$ and $V(\xi)=1$, $u_\xi(3)\approx0.230$, against the exact decay $e^{-1.5}\approx0.223$ that a valid certificate would give. The error term decays at the slower of the two rates.

The theorem used only $\varepsilon$, not the fact that $X_b$ is empty here, so its conclusions are true but loose: this $V$ actually satisfies $q\le-0.764V$ everywhere. The constants $\sqrt{\lambda_{\max}(P)/\lambda_{\min}(P)}$, $1/\mu$ and $B_{\nabla q}/\lambda$ are what make the guarantee costly even for a well-conditioned two-dimensional linear system.

### Where Theorem 4.2's probability enters {#from-err}

Theorem 4.2 bounds $\operatorname{err}(\widehat V_n)=\Pr_{\xi\sim\mathcal D}(h(\xi,\widehat V_n)>0)$. With the Lyapunov residual $h=\nabla V^{\mathsf T}\dot x+\lambda V$, the event $h(\xi,V)>0$ is exactly $\xi\in X_b$. So if $\mathcal D=\nu$ is uniform on $X$, then $\nu(X_b)=\operatorname{err}(\widehat V_n)$. With probability at least $1-\delta$ over the training trajectories, $\operatorname{err}(\widehat V_n)$ is below the bound of Theorem 4.2, call it $\varepsilon_n$. Theorem 5.1 also has conditions of its own on the learned $\widehat V_n$, which problem (3.2) and Theorem 4.2 do not enforce: $\widehat V_n$ must be twice continuously differentiable, satisfy $\widehat V_n(x)\ge\mu\|x\|^2$ on $S$ for some $\mu>0$, and have finite gradient bounds $B_{\nabla V}$, $B_{\nabla q}$ on a convex set containing $S$. A class with $P_\theta\succeq\mu I$, or a separate check after fitting, can supply the positivity; the class of [[boffi-thm-4-2]] alone contains $\theta=0$ and indefinite matrices. When these conditions hold, Theorem 5.1 then applies on that event with any $\varepsilon>\varepsilon_n$. Its constants may depend on the data, which is harmless because Theorem 5.1 is a deterministic statement about whichever $V$ it is given. The conclusion is again a statement with probability at least $1-\delta$ over the data; for each training sample it either holds or it does not.

Three cautions apply to this chain.

- **Nonuniform initial states.** If $\mathcal D$ is not uniform, a small $\operatorname{err}$ need not give a small $\nu(X_b)$. If $\mathcal D$ is uniform on $[-1,0]$ for $\dot x=-x$ on $X=[-1,1]$, trajectories from $[-1,0]$ stay in $[-1,0]$. Two candidates that agree on $[-1,0]$ have the same $\operatorname{err}$, whatever they do on $(0,1]$, so $\operatorname{err}=0$ is compatible with $\nu(X_b)=1/2$. One sufficient bridge: if $\mathcal D$ has a density of at least $c/\operatorname{vol}(X)$ on $X$, for some $c>0$, then $\mathcal D(A)\ge c\,\nu(A)$ for every $A$, so $\nu(X_b)\le\operatorname{err}/c$.
- **The fixed margin.** Theorem 4.2 needs problem (3.2) to be feasible with a fixed margin $\gamma>0$. On the unit disk around the equilibrium with $T=[0,\infty)$ that fails, as [[boffi-thm-4-2]] shows, so the chain is formal there. It can be made honest with an initial set and horizon that keep trajectories away from the equilibrium, such as the annulus $1\le\|\xi\|\le2$ and $T=[0,0.32]$ of that lesson's worked example, with $\mathcal D$ **uniform on the annulus** so that $\nu(X_b)=\operatorname{err}$. Theorem 5.1 allows any full-dimensional compact $X$ and any $T$.
- **The scaling claim.** The paper combines $\varepsilon\approx k/n$ with $r_b\propto\varepsilon^{1/(2p)}$ and concludes that $r_b\le\zeta$ needs $n$ of order $k\zeta^{-2p}$. That count omits the factors $\log^3n$, $1/\gamma^2$ and the class constants of Theorem 4.2, and the unknown constant $C$. It describes a dependence on dimension, not a usable sample size.

### When the conclusion is weaker than it looks {#failure}

A small violation volume is not a certificate valid everywhere. Three gaps remain even when the premises hold.

- **Inside the equilibrium ball** the theorem permits violations, and Step 5 shows why it must: the additive error cannot be absorbed where $V$ is small.
- **Outside $\widetilde S$** it says nothing. States reachable only from the boundary strip $X\setminus\widetilde X$ are not covered, because Step 2 may find no good neighbor there.
- **Narrow failures cost through the constants.** A learned $V$ can fail on a set of tiny volume, for example along a thin bump. The theorem still covers that set when it lies in $\widetilde S$ outside $\mathbb B(0,r_b)$; it can do so only because a sharp bump makes $B_{\nabla q}$ large, and $r_b$ grows with $B_{\nabla q}$. A bound on $\varepsilon$ alone, without the gradient constants, would prove nothing.

### Assumptions and where they enter {#assumptions}

- **Full-dimensional compact $X$ with the uniform measure.** Step 1 turns probability into volume. A different initial distribution needs a density bound, as above.
- **Incremental stability on $X$ and $T$ (Assumption 5.1).** Step 3. It is a property of the true dynamics; training data do not establish it ([[incremental-stability]]).
- **$f\in C^1$ (added).** The gradient $\nabla q$ used in Step 4 must exist; the paper's §3 asks only for continuity of $f$.
- **$V\ge\mu\|x\|^2$ with $\mu>0$.** Step 5 only; it fixes the equilibrium at the origin and sizes the excluded ball.
- **Gradient bounds as Lipschitz constants (added).** Step 4 needs them along segments; we take them over a convex set containing $S$.
- **$\nu(X_b)<\varepsilon$ (added strictness).** Step 2, without the paper's slightly-larger-ball argument at the boundary.
- **Negative-decrease convention.** The printed (5.1) lacks the minus sign; the proof and (5.2) use $q\le-\lambda V$.
- **Energy rate.** $\lambda$ and $(1-\eta)\lambda$ are decay rates of $V$. For a quadratic $V$ the corresponding norm rates are half of them.

### Exercises {#exercises}

::: question
For $p=1$, $X=[-1,1]$ and $\varepsilon=0.05$, compute $r$ and $\widetilde X$. Which initial states lose the guarantee, and why?
---
$\operatorname{vol}(X)=2$ and the unit ball $[-1,1]$ also has length $2$, so $r=\varepsilon=0.05$ and $\widetilde X=[-0.95,0.95]$. The states within $0.05$ of $\pm1$ lose it. For example, the ball $[0.93,1.03]$ of radius $0.05$ around $0.98$ reaches outside $X$; its part inside $X$ is $[0.93,1]$, of measure $0.07/2=0.035<\varepsilon$. A bad set of measure below $\varepsilon$ could contain all of it, and Step 2 would find no good neighbor.
:::

::: question
In the worked example, $\varepsilon=10^{-6}$ gives $r_b\approx0.43$. What violation volume halves $r_b$? If $\varepsilon$ came from a bound of order $k/n$, ignoring logarithms, how many more trajectories would that take?
---
$r_b\propto\varepsilon^{1/4}$, so halving needs $\varepsilon$ divided by $2^4=16$: $\varepsilon=6.25\times10^{-8}$. A bound of order $k/n$ then needs about $16$ times as many trajectories. With the factor $\log^3n$ kept, slightly more.
:::

::: question
Conclusion (i) holds at the equilibrium too, for a trajectory that sits at $x=0$. What does it say there? Conclusion (ii) holds trivially at the single point $x=0$; why can it not be extended to a whole neighborhood of $x=0$, whatever $\eta\in(0,1)$ is chosen?
---
At $x=0$, $V=0$ and $q=0$, so (i) reads $0\le E\beta(r,t)$, which is true and empty. Conclusion (ii) at $x=0$ reads $0\le-(1-\eta)\lambda\cdot0$, also trivially true. At nearby $x\ne0$, however, the absorption in Step 5 needs $\eta\lambda\mu\|x\|^2\ge E\beta(r,0)$. As $\|x\|\to0$ the left side tends to $0$ for every $\eta<1$, while the right side is fixed. No choice of $\eta$ closes the gap.
:::

::: question
Learned certificates are often tested on initial states from a Gaussian, truncated to $X$. Can its $\operatorname{err}$ be used as $\varepsilon$?
---
Not directly: the theorem measures $X_b$ with the uniform $\nu$. A truncated Gaussian on a compact $X$ has a density bounded below by some $c/\operatorname{vol}(X)$ with $c>0$, so $\nu(X_b)\le\operatorname{err}/c$, and $\varepsilon$ must be taken as $\operatorname{err}/c$. For instance $\operatorname{err}=10^{-3}$ and $c=1/2$ give $\varepsilon=2\times10^{-3}$. If the density were zero on part of $X$, no such bound would hold.
:::

::: question
Where in the proof would the argument fail if $V$ were only required to satisfy $V(x)>0$ for $x\ne0$, without $V\ge\mu\|x\|^2$?
---
In Step 5. Positivity alone gives no lower bound on $V$ outside a ball in terms of the radius, so no $r_b$ makes $\eta\lambda V(x)\ge E\beta(r,0)$ follow from $\|x\|\ge r_b$. Conclusions (i) and (iii) do not use $\mu$ and survive. On a compact $S$, a continuous positive definite $V$ is bounded below by some positive number outside any ball, which would give a radius of a different form.
:::

### Where it is used {#uses}

[[boffi-thm-5-2]] repeats the argument for contraction metrics on the tangent bundle; [[vdp-certificates]] shows a violation set shrinking in a finite experiment.

## Card

### Statement {#statement}

Let $q=\nabla V^{\mathsf T}f$, $V\ge\mu\|x\|^2$, and let the dynamics satisfy $\|\phi_t(\xi_1)-\phi_t(\xi_2)\|\le\beta(\|\xi_1-\xi_2\|,t)$ on $X$ (Assumption 5.1). If the set of initial states whose trajectories violate $q\le-\lambda V$ has uniform measure below $\varepsilon$, put $r=(\varepsilon\operatorname{vol}(X)/\operatorname{vol}(\mathbb B(0,1)))^{1/p}$, $\widetilde X=\{\xi:\mathbb B(\xi,r)\subseteq X\}$ and $\widetilde S=\bigcup_t\phi_t(\widetilde X)$. Then for $0<\eta<1$, $q\le-(1-\eta)\lambda V$ on $\widetilde S$ outside the ball of radius
$$r_b=\sqrt{\frac{\beta(r,0)}{\eta\mu}\Big(B_{\nabla V}+\frac{B_{\nabla q}}{\lambda}\Big)},$$
and along trajectories from $\widetilde X$, $V(\phi_t(\xi))\le u_\xi(t)$ with $\dot u=-\lambda u+(B_{\nabla q}+\lambda B_{\nabla V})\beta(r,t)$, $u(0)=V(\xi)$.

### Intuition and example {#intuition}

A set of volume below $\varepsilon$ cannot contain a ball of volume $\varepsilon$, so every eroded initial state has a good neighbor within $r$. Incremental stability keeps the two trajectories within $\beta(r,t)$, and gradient bounds transfer the good decrease with an additive error. Outside a ball, $V$ is large enough to absorb it.

Example: on the unit disk in the plane with $\beta(r,0)\le Cr$, $r=\varepsilon^{1/2}$ and $r_b\propto\varepsilon^{1/4}$. For the shared $A$, $P$ with $\lambda=\eta=1/2$, $r_b\approx13.55\,\varepsilon^{1/4}$: vacuous at $\varepsilon=10^{-4}$, about $0.43$ at $\varepsilon=10^{-6}$.

### Assumptions and domain {#assumptions}

- Full-dimensional compact $X$ with the uniform measure; a nonuniform distribution needs a density lower bound.
- Incremental stability of the true dynamics on $X$; $f\in C^1$ (added), $V$ twice continuously differentiable with $V\ge\mu\|x\|^2$.
- Gradient bounds taken over a convex set containing $S$ (added here, so they act as Lipschitz constants).
- $\nu(X_b)<\varepsilon$ (strict, added); the printed $\le$ needs a boundary argument that fails at the edge of $\widetilde X$, or read the eroded set with $\mathbb B(\xi,r)\subseteq\operatorname{int}X$ so that argument applies.
- Negative-decrease convention from the proof; the printed (5.1) lacks the minus sign. $\lambda$ is an energy rate.
- No conclusion inside $\mathbb B(0,r_b)$ or outside $\widetilde S$.

### Proof sketch {#proof}

1. $\nu(\mathbb B(\xi,r))=\varepsilon>\nu(X_b)$, so for $\xi\in\widetilde X$ the ball $\mathbb B(\xi,r)\subseteq X$ contains a good $\xi'$.
2. $\|\phi_t(\xi)-\phi_t(\xi')\|\le\beta(r,t)$.
3. Lipschitz transfer: $q(\phi_t(\xi))\le-\lambda V(\phi_t(\xi))+(B_{\nabla q}+\lambda B_{\nabla V})\beta(r,t)$.
4. Outside $\mathbb B(0,r_b)$, $\eta\lambda V\ge\eta\lambda\mu r_b^2$ absorbs the error, using $\beta(r,t)\le\beta(r,0)$.
5. Linear comparison integrates step 3.

Source status: located. This proof route is reconstructed from Appendix C.1; an independent proof audit has not been recorded.

### Where it is used {#uses}

[[boffi-thm-5-2]], [[vdp-certificates]].
