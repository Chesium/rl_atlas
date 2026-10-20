+++
summary = "True contraction and a small tangent-bundle violation measure give a conditional learned-metric decrease region."
prereqs = ["contraction-metrics", "boffi-thm-5-1"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 5.2, p.9; Appendix C.2, pp.26–29", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question {#question}

A contraction metric $M(x)$ certifies that nearby trajectories approach each other ([[contraction-metrics]]). Suppose we learn such a metric from trajectory data, as in the Van der Pol experiment of [[vdp-certificates]], and a test on fresh trajectories shows that the metric inequality fails only rarely. On what part of the state space has the learned $M$ actually been shown to contract, and what had to be assumed for that?

Theorem 5.2 of Boffi et al. repeats the argument of [[boffi-thm-5-1]] one level up, on pairs of a state and a direction. Its answer is **conditional**: it assumes that the true dynamics already contract in some unknown metric, and concludes that the *learned* metric certifies contraction on a region. That region excludes a boundary strip, as before, and also states at which some transported direction has become very short. This lesson states the theorem, rebuilds the proof from the pieces of Theorem 5.1, and then shows by a linear example that the printed radius cannot be used as stated.

**Which contraction.** The atlas uses the word in three senses ([[three-contractions]]): a Bellman operator contracting value functions, a dynamical system contracting distances between trajectories, and a Lipschitz map contracting a random-sign complexity. This lesson concerns only the second, in two forms: the true dynamics contracting in $M_\star$ (a hypothesis), and the learned $M$ satisfying a metric inequality (the conclusion).

### The setting, recalled {#setting}

The dynamics $\dot x=f(x)$, $x\in\mathbb R^p$, are twice continuously differentiable. Write $J(x)=Df(x)$ for the Jacobian. By [[variational-dynamics]], a direction $\delta\xi$ attached to the initial state $\xi$ is carried along the trajectory as $\theta_t(\delta\xi;\xi)=D_\xi\phi_t(\xi)\,\delta\xi$, which solves $\dot\theta=J(\phi_t(\xi))\theta$ with $\theta_0=\delta\xi$.

::: definition {#def-prolonged} The prolonged system
The pair $(x,\delta x)\in\mathbb R^{2p}$ evolves by
$$g(x,\delta x)=\big(f(x),\,J(x)\delta x\big).$$
Its flow is $\psi_t(\xi,\delta\xi)=\big(\phi_t(\xi),\theta_t(\delta\xi;\xi)\big)$.
:::

A metric gives a function on these pairs, the squared differential length
$$V(x,\delta x)=\delta x^{\mathsf T}M(x)\,\delta x,$$
and its rate of change along the prolonged flow is $q=\nabla V^{\mathsf T}g$. The product rule computation of [[contraction-metrics]] gives
$$q(x,\delta x)=\delta x^{\mathsf T}\big(J^{\mathsf T}M+MJ+\dot M\big)(x)\,\delta x, \label{q-form}$$
with $\dot M=\sum_if_i\,\partial M/\partial x_i$. Both $V$ and $q$ are quadratic in $\delta x$: multiplying $\delta x$ by $a$ multiplies both by $a^2$.

**Rates.** "$q\le-cV$ for every $\delta x$ at $x$" is the matrix inequality $J^{\mathsf T}M+MJ+\dot M\preceq-cM$ at $x$. It makes $V$ decay at the **energy rate** $c$ and lengths $\sqrt V$ at the **norm rate** $c/2$. The atlas writes the metric test as $\preceq-2\alpha M$ for norm rate $\alpha$. Below, $\lambda$ is the energy rate demanded of the learned metric, and $\lambda_\star$ is the norm rate of the true contraction.

::: definition {#def-true} True contraction (hypothesis)
There are a metric $M_\star(x)$ and constants $0<m\le L$, $\lambda_\star>0$ with $mI\preceq M_\star(x)\preceq LI$ and
$$J^{\mathsf T}M_\star+M_\star J+\dot M_\star\preceq-2\lambda_\star M_\star$$
on the reachable set $S=\bigcup_{t\in T}\phi_t(X)$.
:::

The paper writes "contracting in the metric $M_\star$ with rate $\lambda$" and uses one letter $\lambda$ both for this and for the learned decrease. Its proof of Lemma C.4 reads the rate in the norm convention. We keep the two rates apart; the printed theorem is the case $\lambda_\star=\lambda$. By [[contraction-metrics]], a unit initial direction stays bounded: $\|\theta_t(\delta\xi;\xi)\|\le\sqrt{L/m}$.

**Measure on state–direction pairs.** Let $\mathbb S^{p-1}$ be the unit sphere of directions and $\nu$ the uniform probability on $X\times\mathbb S^{p-1}$: a uniform initial state from $X$ and an independent uniform direction. The violation set, with the sign the proof uses (the printed (5.4) lacks the minus sign, as in [[boffi-thm-5-1]]), is
$$Z_b=\Big\{(\xi,\delta\xi):\sup_{t\in T}\big(q+\lambda V\big)(\psi_t(\xi,\delta\xi))>0\Big\}.$$

**Radius.** Write $\zeta_p(s)$ for the fraction of the sphere within angle $s$ of a fixed direction, a spherical cap. In the plane, $p=2$, directions are angles on a circle and $\zeta_2(s)=s/\pi$ for $0\le s\le\pi$. A product of a state ball of radius $s$ and a cap of angular radius $s$ has $\nu$-measure $s^p\operatorname{vol}(\mathbb B(0,1))\zeta_p(s)/\operatorname{vol}(X)$. So, as in Theorem 5.1, a set of measure below $\varepsilon$ contains no such product of radius
$$r=\sup\Big\{s>0:\ s^p\zeta_p(s)\le\frac{\varepsilon\operatorname{vol}(X)}{\operatorname{vol}(\mathbb B(0,1))}\Big\}.$$
Appendix C.2 writes $\zeta_p$ through an incomplete beta function. Compared with the cap formula it cites (Li, 2011), that expression appears to omit a factor $\tfrac12$, and its last case reads $s\ge1$ where $s\ge\pi$ is meant. We use the cap fraction as named in the theorem.

**Constants.** $B_H=\sup_{x\in S}\|D^2f(x)\|$, where $D^2f(x)$ is the second derivative of $f$, a bilinear map with $\|D^2f(x)[u,v]\|\le B_H\|u\|\|v\|$. It bounds how fast the Jacobian changes with the base point: $\|J(x)-J(y)\|\le B_H\|x-y\|$ along segments. $B_{\nabla V}$ and $B_{\nabla q}$ bound the gradients of $V$ and $q$ as functions of $(x,\delta x)$. As in Theorem 5.1 they are used as Lipschitz constants along straight segments, so we take them over a **convex** set containing the reachable pairs, such as $\operatorname{conv}(S)\times\mathbb B(0,\sqrt{L/m})$ (added hypothesis; the paper does not specify the domain). The learned metric satisfies $M(x)\succeq\mu I$.

**Regions.** $\widetilde X=\{\xi:\mathbb B(\xi,r)\subseteq X\}$ is the eroded set. The new, **time-dependent** set keeps the eroded initial states whose every unit direction is still at least $r_b$ long at time $t$:
$$\widetilde X_t(r_b)=\Big\{\xi\in\widetilde X:\min_{\|\delta\xi\|=1}\|\theta_t(\delta\xi;\xi)\|\ge r_b\Big\},$$
and $\widetilde S(r_b)=\bigcup_{t\in T}\phi_t(\widetilde X_t(r_b))$. Because true contraction shrinks directions, a state typically leaves $\widetilde X_t(r_b)$ after a finite time.

### Statement {#statement}

We first quote what the paper prints, then state what its proof supports. The two differ: the printed version is **false as stated**, and \ref{ex-bump} below is a counterexample.

::: remark
**The printed claim (Boffi et al., arXiv:2008.05952v2, Theorem 5.2, p.9), with the proof's sign, rate and a strict measure condition. False as stated; see \ref{ex-bump}.** Let $p\ge2$, $X$ full-dimensional and compact, $\eta\in(0,1)$, and assume \ref{def-true} with $\lambda_\star=\lambda$. Let $M$ be a smooth learned metric with $M\succeq\mu I$, and suppose $\nu(Z_b)<\varepsilon$. Set
$$r_b=\sqrt{\frac{r\,B_H\,(B_{\nabla q}+\lambda B_{\nabla V})\,(L/m)^{3/2}}{\eta\lambda\mu}}. \label{rb-printed}$$
The claim is that then, at every $x\in\widetilde S(r_b)$,
$$J^{\mathsf T}M+MJ+\dot M\preceq-(1-\eta)\lambda M. \label{conclusion}$$
:::

The square root in \ref{rb-printed} is part of the printed statement. The conclusion \ref{conclusion} is what the proof's steps establish: $q\le-(1-\eta)\lambda V$ for every direction, an energy rate $(1-\eta)\lambda$ and so a norm rate $(1-\eta)\lambda/2$. The theorem's words "contracting at rate $(1-\eta)\lambda$", and the final line of Appendix C.2, which writes $-2(1-\eta)\lambda M$, claim twice that norm rate. Nothing in the proof supplies the factor $2$. What fails is the radius: for linear dynamics $B_H=0$ makes \ref{rb-printed} zero, and \ref{ex-bump} satisfies every premise while \ref{conclusion} fails at a point of $\widetilde S(0)$.

::: theorem {#thm-52} Theorem 5.2 with a reconstructed radius (agent-checked; no human proof audit)
Assume the premises of the printed claim, except that the true norm rate $\lambda_\star$ in \ref{def-true} need not equal $\lambda$. Assume also, as in [[boffi-thm-5-1]], that $B_{\nabla V}$ and $B_{\nabla q}$ bound the gradients of $V$ and $q$ on a convex set containing the reachable pairs, for example $\operatorname{conv}(S)\times\mathbb B(0,\sqrt{L/m})$, on which $V$ and $q$ are defined and continuously differentiable. Set
$$\begin{aligned}r_b^2&=\frac{\sqrt2\,r\,(B_{\nabla q}+\lambda B_{\nabla V})\,C_M}{\eta\lambda\mu},\\ C_M&=\max\Big\{\sqrt{L/m},\ \frac{(L/m)^{3/2}B_H}{\lambda_\star}\Big\}.\end{aligned}$$
Then \ref{conclusion} holds at every $x\in\widetilde S(r_b)$. The radius is derived in \ref{rb-repaired} below.
:::

This is the lesson's reconstruction from the steps of Appendix C.2, with the corrections derived in Step 1b and the radius section. It is agent-checked by the independent mathematical reviewer under these hypotheses; no human proof audit has been recorded, and the source record stays "located". The radius \ref{rb-repaired} has the printed form, up to the factors $\sqrt2$ and $1/\lambda_\star$, when $(L/m)B_H\ge\lambda_\star$; it never vanishes.

**Reading it.** The hypothesis that the true system contracts is not learned; it is assumed, and the data never test it. If the true dynamics do not contract, the theorem says nothing, however small $\nu(Z_b)$ is. When the hypothesis holds, the conclusion concerns the *learned* $M$, on a region whose two exclusions both have a reason, developed below.

### The proof route {#reasoning}

The proof is Theorem 5.1's, run on the prolonged system, with two new ingredients: incremental stability of the prolonged system, derived from true contraction, and an extension from unit initial directions to all directions.

**Step 1a: the metric inequality in rescaled coordinates.** The contraction argument is easiest in coordinates in which the true metric becomes the Euclidean one. Factor $M_\star(x)=\Theta(x)^{\mathsf T}\Theta(x)$ with $\Theta(x)$ an invertible $p\times p$ matrix depending differentiably on $x$; the symmetric positive-definite square root of $M_\star(x)$ is one choice, and it is continuously differentiable whenever $M_\star$ is (a standard fact about matrix square roots, recalled without proof). Two facts follow from $mI\preceq M_\star\preceq LI$. Since $\|\Theta v\|^2=v^{\mathsf T}M_\star v\le L\|v\|^2$, $\|\Theta\|\le\sqrt L$. Since $m\|v\|^2\le\|\Theta v\|^2$, putting $v=\Theta^{-1}w$ gives $\|\Theta^{-1}w\|\le\|w\|/\sqrt m$, so $\|\Theta^{-1}\|\le1/\sqrt m$.

Along a trajectory with transported displacement $\delta x$, define the rescaled displacement $\delta z=\Theta(x)\,\delta x$. Its squared length is the metric energy: $\|\delta z\|^2=\delta x^{\mathsf T}M_\star\delta x$. Write $\dot\Theta=\sum_if_i\,\partial\Theta/\partial x_i$ for the rate of change of $\Theta(x(t))$ along the trajectory, exactly as $\dot M$ was defined. The product rule and $\dot{\delta x}=J\delta x$ give
$$\begin{aligned}\dot{\delta z}&=\dot\Theta\,\delta x+\Theta J\,\delta x\\&=F\,\delta z,\qquad F=(\Theta J+\dot\Theta)\Theta^{-1}.\end{aligned}$$
The matrix $F$ is the **generalized Jacobian**: the linear dynamics of the displacement in the new coordinates. Then $\frac{d}{dt}\|\delta z\|^2=2\,\delta z^{\mathsf T}F\delta z$. The same derivative computed from $\|\delta z\|^2=\delta x^{\mathsf T}M_\star\delta x$ is $\delta x^{\mathsf T}(J^{\mathsf T}M_\star+M_\star J+\dot M_\star)\delta x$ ([[contraction-metrics]]). So \ref{def-true} says $2\,\delta z^{\mathsf T}F\delta z\le-2\lambda_\star\|\delta z\|^2$ for every $\delta x$, and since $\Theta$ is invertible every $\delta z$ arises this way:
$$\delta z^{\mathsf T}F\,\delta z\le-\lambda_\star\|\delta z\|^2\quad\text{for all }\delta z. \label{F-test}$$
Equivalently, the symmetric part $\tfrac12(F+F^{\mathsf T})$ has all eigenvalues at most $-\lambda_\star$. The steps reverse, so \ref{F-test} is equivalent to \ref{def-true}. The convention is unchanged: $\|\delta z\|^2$, the energy, decays at rate $2\lambda_\star$, and the length $\|\delta z\|$ at norm rate $\lambda_\star$.

**Step 1b: the prolonged system contracts.** Two nearby prolonged states differ by a pair $(\Delta x,\Delta\delta x)$, whose first-order dynamics are given by the Jacobian of $g$:
$$\begin{bmatrix}J(x)&0\\ H(x,\delta x)&J(x)\end{bmatrix},\qquad H(x,\delta x)u=D^2f(x)[\delta x,u].$$
The lower-left block is the only coupling: it is how the transported direction feels a change of base state. Its size is $\|H\|\le B_H\|\delta x\|$. Appendix C.2 (Lemma C.4) measures such pairs with the block metric $\operatorname{diag}(M_\star,\vartheta^2M_\star)$ for a weight $\vartheta>0$, whose factor is $\operatorname{diag}(\Theta,\vartheta\Theta)$. Apply Step 1a with this factor, setting $y=\Theta\Delta x$ and $z=\vartheta\Theta\Delta\delta x$. Since $\vartheta$ is constant and $\Theta$ depends only on $x$, multiplying out the blocks gives the generalized Jacobian
$$F'=\begin{bmatrix}F&0\\ \vartheta\,\Theta H\Theta^{-1}&F\end{bmatrix}.$$
Its coupling block has size $\|\vartheta\,\Theta H\Theta^{-1}\|\le\vartheta\sqrt L\,B_H\|\delta x\|/\sqrt m=\vartheta\kappa_H$, with $\kappa_H=\sqrt{L/m}\,B_H\sup\|\delta x\|$. By \ref{F-test} for each diagonal block, and Cauchy–Schwarz for the coupling,
$$\begin{aligned}(y,z)^{\mathsf T}F'(y,z)&\le-\lambda_\star(\|y\|^2+\|z\|^2)+\vartheta\kappa_H\|y\|\|z\|\\&\le-\Big(\lambda_\star-\frac{\vartheta\kappa_H}2\Big)(\|y\|^2+\|z\|^2),\end{aligned}$$
using $\|y\|\|z\|\le(\|y\|^2+\|z\|^2)/2$. By the equivalence of Step 1a, applied in reverse, the prolonged system contracts in the block metric with norm rate $\omega\lambda_\star$ whenever $\lambda_\star-\vartheta\kappa_H/2\ge\omega\lambda_\star$, that is $\vartheta\le2(1-\omega)\lambda_\star/\kappa_H$, for any $\omega\in(0,1)$. Unit initial directions keep $\|\delta x\|\le\sqrt{L/m}$, so $\kappa_H=(L/m)B_H$. The block-metric idea is the paper's; this computation is ours, and it shows where $\lambda_\star$ enters.

**Step 2: incremental stability with a condition number.** By [[contraction-metrics]], contraction in a metric with eigenvalues between $m'$ and $L'$ gives the pair bound $\beta(s',t)=\sqrt{L'/m'}\,e^{-\omega\lambda_\star t}s'$. For $\operatorname{diag}(M_\star,\vartheta^2M_\star)$ with $\vartheta\le1$, the eigenvalues lie between $\vartheta^2m$ and $L$, so $L'/m'\le L/(\vartheta^2m)$.

**Step 3: a nearby good pair.** Fix $\xi\in\widetilde X_t(r_b)$ and a unit $\delta\xi$. As in Theorem 5.1, the product of $\mathbb B(\xi,r)$ and the cap of radius $r$ about $\delta\xi$ has measure $\varepsilon$, so it contains a good pair $(\xi',\delta\xi')$ (this uses the strict inequality $\nu(Z_b)<\varepsilon$, added to the statement for the reason explained in [[boffi-thm-5-1]]; the paper writes $\le$). A chord is no longer than its arc, so $\|(\xi-\xi',\delta\xi-\delta\xi')\|\le\sqrt{r^2+r^2}=\sqrt2\,r$. The path argument behind Step 2 needs the straight segment between the two initial pairs. Its state part lies in the convex ball $\mathbb B(\xi,r)\subseteq X$, and its direction part consists of vectors of length at most $1$, which stay within $\sqrt{L/m}$ when transported, where Step 1b applies.

**Step 4: transfer and absorb.** Exactly as in Steps 4 and 5 of Theorem 5.1, with $E=B_{\nabla q}+\lambda B_{\nabla V}$,
$$\begin{aligned}q(\psi_t(\xi,\delta\xi))&\le-\lambda V(\psi_t)+E\,\beta(\sqrt2\,r,0)\\&\le-(1-\eta)\lambda V(\psi_t)-\eta\lambda\mu r_b^2+E\,\beta(\sqrt2\,r,0).\end{aligned}$$
The second line uses $V(\psi_t)\ge\mu\|\theta_t\|^2\ge\mu r_b^2$, which holds because $\xi\in\widetilde X_t(r_b)$. This is where short directions must be excluded: $V$ is small whenever the transported direction is short, even far from any equilibrium, and an additive error cannot be absorbed there. It is the tangent-bundle version of Theorem 5.1's equilibrium ball. The error vanishes once $\eta\lambda\mu r_b^2\ge E\,\beta(\sqrt2\,r,0)$.

**Step 5: from unit directions to all directions.** Let $x=\phi_t(\xi)$ and let $\delta x$ be any nonzero vector. The matrix $\Phi(t)=D_\xi\phi_t(\xi)$ is invertible: it solves $\dot\Phi=J(\phi_t(\xi))\Phi$ with $\Phi(0)=I$, and Liouville's formula gives $\det\Phi(t)=\exp\int_0^t\operatorname{tr}J\,ds\ne0$. (Lemma C.3 writes $\Phi=\exp\int_0^tA$, where $A(s)=J(\phi_s(\xi))$ in the paper's notation; that expression is valid only when the matrices $A(s)$ commute. The conclusion it needs is this invertibility.) Hence some unit $\delta\varrho$ satisfies $\theta_t(\delta\varrho;\xi)=a\,\delta x$ with $a\ne0$. Step 4 at $(\xi,\delta\varrho)$ and the quadratic scaling give $a^2q(x,\delta x)\le-(1-\eta)\lambda a^2V(x,\delta x)$. Divide by $a^2$. By \ref{q-form}, this for all $\delta x$ is \ref{conclusion}.

### Where the printed radius goes wrong {#radius}

To reach \ref{rb-printed}, Appendix C.2 chooses the weight $\vartheta=2(1-\omega)/\kappa_H$ and bounds the condition number by $(L/m)^3B_H^2/(4(1-\omega)^2)$. Checking those steps against Step 1b shows two problems.

- **A missing rate.** Step 1b derives the bound $-(\lambda_\star-\vartheta\kappa_H/2)$. The paper's version reads $-\lambda_\star\big(1-\vartheta\kappa_H/2\big)$, which agrees only when $\lambda_\star=1$. Its admissible weight therefore lacks the factor $\lambda_\star$. A time-rescaling check confirms the derivation. Replacing $f$ by $\tau f$ for a constant $\tau>0$ runs the same trajectories $\tau$ times faster. It multiplies $\lambda$, $\lambda_\star$, $B_H$ and $B_{\nabla q}$ by $\tau$, leaves $\varepsilon$, the violation set and $B_{\nabla V}$ unchanged, and should leave the radius unchanged. The printed $r_b^2$ is multiplied by $\tau$; with $B_H/\lambda_\star$ in place of $B_H$ it is invariant.
- **The weight must not exceed one.** The bound $L'/m'\le L/(\vartheta^2m)$ of Step 2 holds only for $\vartheta\le1$. When $B_H$ is small, the paper's weight is large, and the condition number of $\operatorname{diag}(M_\star,\vartheta^2M_\star)$ is then at least $L/m$, not small. Taking $\vartheta=\min\{1,2(1-\omega)\lambda_\star/\kappa_H\}$ instead gives $\sqrt{L'/m'}\le\max\{(L/m)^{1/2},\,(L/m)^{3/2}B_H/(2(1-\omega)\lambda_\star)\}$.

With $\omega=1/2$, $\beta(\sqrt2r,0)=\sqrt2\,r\sqrt{L'/m'}$, and Step 4's condition, the steps support
$$\begin{aligned}r_b^2&=\frac{\sqrt2\,r\,(B_{\nabla q}+\lambda B_{\nabla V})\,C_M}{\eta\lambda\mu},\\ C_M&=\max\Big\{\sqrt{L/m},\ \frac{(L/m)^{3/2}B_H}{\lambda_\star}\Big\}.\end{aligned} \label{rb-repaired}$$
This is this lesson's reconstruction, not the paper's statement. It is agent-checked by the independent mathematical reviewer; no human proof audit has been recorded. When $(L/m)B_H\ge\lambda_\star$ the second entry is the maximum and \ref{rb-repaired} has the printed form up to the factors $\sqrt2$ and $1/\lambda_\star$.

### Worked case: linear dynamics {#example}

For a linear system $\dot x=Ax$, $J=A$ is constant, so $D^2f=0$ and $B_H=0$. The coupling block in Step 1b vanishes: the prolonged system is two independent copies, $\dot x=Ax$ and $\dot{\delta x}=A\delta x$. The **Hessian-driven** part of the exclusion disappears, and the printed \ref{rb-printed} gives $r_b=0$, which would make $\widetilde S(0)$ the whole region reached from $\widetilde X$. In \ref{rb-repaired} the factor $C_M$ falls to its floor $\sqrt{L/m}$, and $r_b$ stays positive: the transfer error of Step 4 does not depend on $B_H$. The next example shows that the printed conclusion is in fact false here.

::: example {#ex-bump} A learned metric with a bump
Take $p=2$, $f(x)=-x$, $X$ the closed unit disk and $T=[0,\infty)$. The true dynamics contract in $M_\star=I$ with $\lambda_\star=1$ and $m=L=1$. Learn, or suppose a learner returned, the metric $M(x)=w(x)I$ with
$$w(x)=1+\exp\big(-\|x-x_0\|^2/\rho^2\big),\qquad x_0=(0.5,0),\ \rho=0.02.$$
It is smooth with $M\succeq I$, so $\mu=1$. By \ref{q-form}, with $J=-I$ and $\dot M=(\nabla w^{\mathsf T}f)I=-(x^{\mathsf T}\nabla w)I$,
$$q(x,\delta x)=-\big(2w(x)+x^{\mathsf T}\nabla w(x)\big)\|\delta x\|^2.$$
Take $\lambda=1$. A pair violates $q\le-\lambda V$ where $x^{\mathsf T}\nabla w<-w$. At $\hat x=x_0+(\rho/\sqrt2,0)\approx(0.514,0)$, numerically $w\approx1.607$ and $x^{\mathsf T}\nabla w\approx-22.05$, so $q\approx+18.8\,\|\delta x\|^2>0$: the learned metric energy **grows** in every direction.

We need an upper bound on the measure of all bad trajectories, not a finite-grid estimate. Write $s=\|x-x_0\|$. Since $\|x\|\le s+0.5$,
$$\begin{aligned}|x^{\mathsf T}\nabla w(x)|&\le H(s),\\ H(s)&=\frac{2s(s+0.5)}{\rho^2}e^{-s^2/\rho^2}.\end{aligned}$$
For $s\ge0.045$, the logarithmic derivative is negative:
$$\begin{aligned}\frac{d}{ds}\log H(s)&=\frac1s+\frac1{s+0.5}-\frac{2s}{\rho^2}\\&\le\frac1{0.045}+\frac1{0.545}-\frac{2(0.045)}{0.02^2}<0.\end{aligned}$$
Thus $H(s)\le H(0.045)\approx0.7762<1\le w(x)$ outside the ball $\mathbb B(x_0,0.045)$, so every violating state lies inside that ball.

Trajectories are inward radial segments $e^{-t}\xi$. Any segment reaching this ball must start at radius at least $0.5-0.045=0.455$ and have polar angle within $\arcsin(0.045/0.5)=\arcsin(0.09)$ of the positive horizontal axis. These initial states lie in an annular sector of angular width $2\arcsin(0.09)$ and radial range $[0.455,1]$. Dividing its area by the disk's area bounds the bad-trajectory probability. The test is independent of the displacement direction, so the same bound holds for the state–direction measure:
$$\begin{aligned}\nu(Z_b)&\le\frac{\arcsin(0.09)}{\pi}(1-0.455^2)\\&\approx0.02275<0.03.\end{aligned}$$
A $1200\times1200$ grid gives the smaller estimate $\nu(Z_b)\approx0.017$; that is illustrative, while the sector bound verifies the premise. Take $\varepsilon=0.03$. Then $r^3/\pi=0.03$, so $r\approx0.4551$, and $\widetilde X$ is the disk of radius $0.5449$, which contains $\hat x$ at radius $0.5141$. With $B_H=0$, \ref{rb-printed} gives $r_b=0$, and every $\xi\in\widetilde X$ belongs to $\widetilde X_0(0)$. The printed conclusion therefore claims \ref{conclusion} at $\hat x$ itself, where $q>0$. It fails there for every $\eta\in(0,1)$.

The reconstruction \ref{rb-repaired} is consistent with this. At $x_0$, $\nabla w=0$ and $D^2w=-5000I$. For a unit displacement, differentiating the formula for $q$ gives $\nabla_xq=-3\nabla w-D^2w\,x$, hence $\nabla_xq(x_0)=2500(1,0)$ and $B_{\nabla q}\ge2500$. With $\eta=\tfrac12$, \ref{rb-repaired} therefore gives $r_b>56.7$ (any $\eta<1$ gives $r_b>40.1$), while $\|\theta_t\|=e^{-t}\le1$. Every $\widetilde X_t(r_b)$ is empty and the corrected conclusion is vacuous.
:::

The example uses only the theorem's premises: a smooth positive learned metric, a truly contracting system, and a small violation measure. A small $\nu(Z_b)$ cannot rule out a narrow region where the learned metric expands; only the gradient bounds see it, and the printed radius lost their protection when $B_H=0$.

For a nonlinear system the Hessian term is real. For the damped Van der Pol field $f(x,y)=(y,\,-(x^2+1)y-x)$ of [[vdp-certificates]], only the second component is curved, with second derivatives $-2y$, $-2x$ and $0$. So $\|D^2f(x,y)\|$ is the operator norm of $\begin{bmatrix}-2y&-2x\\-2x&0\end{bmatrix}$, whose largest value on the disk of radius $R$ is $(4/\sqrt3)R\approx2.31R$. On the paper's radius-two initial disk this is already $4.62$, before the reachable set is taken into account.

### Assumptions and domain {#assumptions}

- **True contraction, assumed.** $M_\star$ with $mI\preceq M_\star\preceq LI$ and norm rate $\lambda_\star$ on the reachable set. The data never verify it.
- **Uniform measure on $X\times\mathbb S^{p-1}$, $p\ge2$, $X$ full-dimensional and compact.** Step 3 and the radius $r$.
- **$\nu(Z_b)<\varepsilon$ (added strictness, as in [[boffi-thm-5-1]]).** Step 3.
- **A differentiable factor $M_\star=\Theta^{\mathsf T}\Theta$.** Step 1a; the symmetric square root of a continuously differentiable $M_\star$ is one.
- **Twice differentiable $f$ with finite $B_H$; smooth learned $M\succeq\mu I$.**
- **Gradient bounds of $V$ and $q$ over a convex set containing the reachable pairs (added, as in [[boffi-thm-5-1]]).** Step 4 uses them as Lipschitz constants along segments.
- **Eroded and time-dependent domains.** Both exclusions are needed: the boundary strip by Step 3, the short directions by Step 4.
- **Negative-decrease sign; energy rate.** The printed (5.4) lacks the minus sign; the proof gives energy rate $(1-\eta)\lambda$, norm rate half of it.
- **The radius.** The printed \ref{rb-printed} fails for linear systems (\ref{ex-bump}); \ref{rb-repaired} is the lesson's reconstruction from the appendix's steps, agent-checked by the independent mathematical reviewer; no human proof audit has been recorded.

### Exercises {#exercises}

::: question
A learned metric satisfies $J^{\mathsf T}M+MJ+\dot M\preceq-0.5M$ on a region. At what rate do metric lengths of displacements shrink there? What would the paper's final line claim for $\lambda=1$, $\eta=1/2$?
---
The energy $V$ decays at rate $0.5$, so lengths $\sqrt V$ decay at norm rate $0.25$, i.e. $\sqrt V(t)\le e^{-0.25t}\sqrt V(0)$. The paper's last line, $-2(1-\eta)\lambda M=-M$, would give norm rate $0.5$, twice what the proof supports.
:::

::: question
For $p=2$, $X$ the unit disk and $\varepsilon=0.02$, compute $r$. Why does the cap make $r$ larger than Theorem 5.1's radius for the same $\varepsilon$?
---
$\operatorname{vol}(X)=\operatorname{vol}(\mathbb B(0,1))$, so $r^2\cdot r/\pi=0.02$, $r^3=0.0628$, $r\approx0.398$. Theorem 5.1 would give $r=\varepsilon^{1/2}\approx0.141$. The bad set now lives in the larger space of state–direction pairs, and a product ball there has the extra factor $\zeta_2(r)=r/\pi<1$, so a ball of the same measure must be wider.
:::

::: question
For $\dot x=Ax$ with the shared $A=\begin{bmatrix}-1&3\\0&-2\end{bmatrix}$, write the prolonged Jacobian. What vanishes, and what part of the radius survives in \ref{rb-repaired}?
---
It is $\begin{bmatrix}A&0\\0&A\end{bmatrix}$: the coupling block $H$ is zero because $D^2f=0$. The Hessian-driven term disappears and $C_M=\sqrt{L/m}$. With $M_\star=P=\begin{bmatrix}1/2&1/2\\1/2&1\end{bmatrix}$ from [[contraction-metrics]], $\sqrt{L/m}\approx2.618$ and $\lambda_\star\approx0.382$. The radius is still $\sqrt{\sqrt2\,r\,EC_M/(\eta\lambda\mu)}>0$, because the transfer error $E\beta(\sqrt2r,0)$ does not involve $B_H$.
:::

::: question
In \ref{ex-bump}, the bump violates the inequality on a set of tiny area. Why does Theorem 5.1's eroded set not already exclude it, and what in a correct theorem must?
---
The violating point $\hat x$ sits at radius about $0.514$, inside the eroded disk of radius $0.545$. Erosion only removes states near the boundary of $X$. A correct conclusion must exclude it through the constants: the bump's steep slope makes $B_{\nabla q}$ large, and the radius must grow with $B_{\nabla q}$. In the printed radius $B_{\nabla q}$ is multiplied by $B_H=0$, so it cannot.
:::

::: question
Classify each statement as Bellman, dynamical, or statistical contraction: (a) $\|Tv-Tw\|_\infty\le\gamma\|v-w\|_\infty$, where $\gamma$ here is the RL discount factor, not a margin; (b) $J^{\mathsf T}M_\star+M_\star J+\dot M_\star\preceq-2\lambda_\star M_\star$; (c) a Lipschitz map does not increase random-sign complexity by more than its constant. Which one does Theorem 5.2 assume, and which does it conclude for the learned $M$?
---
(a) Bellman, on value functions; (b) dynamical, on trajectory distances; (c) statistical, on complexity. Theorem 5.2 assumes (b) for the true $M_\star$ and concludes a weaker inequality of type (b), energy rate $(1-\eta)\lambda$, for the learned $M$ on $\widetilde S(r_b)$. Neither (a) nor (c) appears.
:::

### Where it is used {#uses}

[[vdp-certificates]] shows violation regions of a learned metric receding in a finite experiment; Theorem 5.2 is the conditional guarantee behind that picture, not a proof about it.

## Card

### Statement {#statement}

Assume the true dynamics contract in $M_\star$ ($mI\preceq M_\star\preceq LI$) at norm rate $\lambda_\star$ (the metric inequality $\preceq-2\lambda_\star M_\star$; the paper takes $\lambda_\star=\lambda$), the learned metric gives $V=\delta x^{\mathsf T}M(x)\delta x$ with $M\succeq\mu I$, and the uniform measure of state–direction pairs on $X\times\mathbb S^{p-1}$ whose prolonged trajectories violate the energy-rate condition $q\le-\lambda V$ is below $\varepsilon$ (strict, added; the paper writes $\le$). Let $r$ solve $r^p\zeta_p(r)=\varepsilon\operatorname{vol}(X)/\operatorname{vol}(\mathbb B(0,1))$, with $\zeta_p$ a spherical-cap fraction. The paper prints the radius
$$r_b=\sqrt{\frac{rB_H(B_{\nabla q}+\lambda B_{\nabla V})(L/m)^{3/2}}{\eta\lambda\mu}},$$
which is **false for linear $f$**: there $B_H=0$ gives $r_b=0$, and a bump metric for $\dot x=-x$ violates the conclusion. A reconstruction from the appendix's steps, with gradient bounds over a convex set, gives instead
$$\begin{aligned}r_b^2&=\frac{\sqrt2\,r(B_{\nabla q}+\lambda B_{\nabla V})\,C_M}{\eta\lambda\mu},\\ C_M&=\max\Big\{\sqrt{L/m},\frac{(L/m)^{3/2}B_H}{\lambda_\star}\Big\}.\end{aligned}$$
With that radius, on $\widetilde S(r_b)=\bigcup_t\phi_t(\widetilde X_t(r_b))$, where $\widetilde X_t(r_b)$ keeps eroded initial states whose unit directions are still at least $r_b$ long at time $t$, $J^{\mathsf T}M+MJ+\dot M\preceq-(1-\eta)\lambda M$: energy rate $(1-\eta)\lambda$, norm rate half of it.

### Intuition and example {#intuition}

Theorem 5.1's argument runs on (state, direction) pairs. True contraction makes the prolonged system incrementally stable, a nearby good pair transfers its decrease with an additive error, and that error is absorbed only where the transported direction is long enough. Directions are then extended to all of the tangent space by scaling.

Example: for linear $f$ the Hessian coupling vanishes, so the Hessian-driven exclusion is zero; the transfer error is not, and a bump metric for $\dot x=-x$ shows the printed $r_b=0$ is too small.

### Assumptions and domain {#assumptions}

- True contraction is assumed, not learned; $p\ge2$; full-dimensional compact $X$; uniform measure on states and directions.
- $f$ twice differentiable with $B_H=\sup\|D^2f\|$; learned $M\succeq\mu I$; prolonged gradient bounds over a convex set (added).
- Eroded and time-dependent domains are both required.
- Negative-decrease convention; the proved rate is an energy rate (norm rate half), not the paper's $-2(1-\eta)\lambda M$.
- The printed radius omits the true rate and a condition-number floor; it fails for linear systems.

### Proof sketch {#proof}

1. In coordinates $\delta z=\Theta\delta x$ with $M_\star=\Theta^{\mathsf T}\Theta$, true contraction says $\delta z^{\mathsf T}F\delta z\le-\lambda_\star\|\delta z\|^2$; with a block metric $\operatorname{diag}(M_\star,\vartheta^2M_\star)$ the prolonged system then contracts for a weight $\vartheta$ small relative to $\lambda_\star/((L/m)B_H)$.
2. Its condition number gives a linear pair bound $\beta$.
3. A product of a state ball and a direction cap of measure $\varepsilon$ contains a good pair within $\sqrt2r$.
4. Transfer as in Theorem 5.1; absorb the error using $V\ge\mu\|\theta_t\|^2\ge\mu r_b^2$.
5. Invertibility of the flow derivative and quadratic scaling extend unit initial directions to every direction.

Source status: located. The reconstruction is agent-checked by the independent mathematical reviewer; no human proof audit has been recorded.

### Where it is used {#uses}

[[vdp-certificates]].
