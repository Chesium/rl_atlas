+++
summary = "Finite random features approximate a kernel class; certificates require derivative approximation too."
prereqs = ["rademacher-properties", "covering-properties"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 16", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }, { text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §4.2 and Theorem 4.4, p.7; Appendix B.3, pp.20–23", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### An infinite class with a finite proxy {#motivation}

*Reading note.* This optional station is best read after [[boffi-thm-4-2]]. Its later sections use Part 18 objects (certificates $V$, trajectory residuals $h$ with Lipschitz constant $L_h$ and bound $B_h$, the margin $\gamma$, the reachable set $S$, the joint value-gradient norm and Lemma 4.1), all defined there. The constructions of \ref{statement} and \ref{reasoning} need only the declared prerequisites.

The parametric bound of [[boffi-thm-4-2]] grows with the number of parameters (written $k$ there). A richer certificate family needs more parameters, and an infinite-dimensional family, such as a kernel class, has no finite parameter count at all. In this lesson $k(x,y)$ always denotes a kernel, features are indexed by $j$, and $K$ is the number of features, not the universal constant of Lemma 4.1. Boffi et al. (arXiv:2008.05952v2, §4.2 and Theorem 4.4, p. 7; proof in Appendix B.3, pp. 20–23) handle such a class in three moves:

1. approximate any member of the kernel class by a combination of $K$ randomly drawn features, **in value and in gradient**;
2. draw those features **independently of the training trajectories**, so that the finite feature class is a fixed class;
3. apply the parametric machinery (Lemma 4.1, covers and Dudley) to the finite class.

This lesson builds the objects and explains why each move is needed. It prepares [[boffi-thm-4-4]], which states and assembles the theorem. It is an optional branch: Theorem 4.2 does not need it.

### Features, kernels and the density-constrained class {#statement}

**Features.** A *feature* is a function $\phi(x;\theta)$ of the state $x\in\mathbb R^p$ that depends on a parameter $\theta\in\Theta$. Boffi et al. use ridge features
$$\phi(x;\theta)=\phi\bigl(\langle x,w\rangle+b\bigr),\qquad\theta=(w,b)\in\Theta\subset\mathbb R^p\times\mathbb R,$$
with a scalar function $\phi$ (the same letter is used for the scalar function and the feature; the flow of a dynamical system is written $\phi_t$ with a time subscript and is unrelated). A probability distribution $\nu$ on $\Theta$ says how features are drawn.

**Kernel.** Averaging products of features defines
$$k(x,y)=\mathbb E_{\theta\sim\nu}\bigl[\phi(x;\theta)\,\phi(y;\theta)\bigr].$$
This is a valid kernel in the sense of Shalev-Shwartz and Ben-David: its Gram matrix $G_{ij}=k(x_i,x_j)$ is positive semidefinite for any points, because for any coefficients $c$,
$$c^{\mathsf T}Gc=\mathbb E_\nu\Bigl[\Bigl(\sum_ic_i\phi(x_i;\theta)\Bigr)^2\Bigr]\ge0.$$
Their Lemma 16.2 (2014, §16.2.2, which begins on p. 185, PDF p. 203; the lemma is on p. 186, PDF p. 204) shows that this property characterizes kernels, functions that are inner products of some feature embedding (§16.2, p. 181, PDF p. 199). Here the embedding is explicit: $x$ is sent to the whole function $\theta\mapsto\phi(x;\theta)$.

**The class.** Boffi et al. define (their (4.5), p. 7, and (B.3), p. 20)
$$\mathcal V=\Bigl\{V(x)=\int_\Theta\alpha(\theta)\phi(x;\theta)\,d\theta:\ \sup_{\theta}\Bigl|\frac{\alpha(\theta)}{\nu(\theta)}\Bigr|\le B_\alpha\Bigr\},$$
where $\nu(\theta)$ is the density of $\nu$ and $\lVert V\rVert_\nu=\sup_\theta|\alpha(\theta)/\nu(\theta)|$. Writing $\beta=\alpha/\nu$ makes the meaning plain:
$$V(x)=\mathbb E_{\theta\sim\nu}\bigl[\beta(\theta)\,\phi(x;\theta)\bigr],\qquad|\beta(\theta)|\le B_\alpha.$$
A member is an average of features, weighted by a bounded weight function $\beta$.

**Its relation to the kernel's function space.** We recall without proof a standard fact about feature-average kernels: the reproducing kernel Hilbert space (RKHS) of $k$ consists of the averages $\mathbb E_\nu[\beta\phi]$ with square-integrable $\beta$, and the RKHS norm of such an average is at most $\sqrt{\mathbb E_\nu\beta^2}$. Since $\sqrt{\mathbb E\beta^2}\le\sup|\beta|$, the class $\mathcal V$ sits inside the RKHS ball of radius $B_\alpha$. It is a proper, *density-constrained* subset: it asks for a uniformly bounded weight, not merely a square-integrable one. Boffi et al. note that it is dense in the RKHS as $B_\alpha\to\infty$, citing Rahimi and Recht (2008). Neither fact is used in the argument below, which works with $\beta$ directly.

::: example {#ex-sinc} Cosine features and a sinc certificate
In one dimension take $\phi=\cos$, so $\phi(x;\theta)=\cos(wx+b)$, with $w$ uniform on $[-W,W]$ and $b$ uniform on $[-\pi,\pi]$, independent. The product-to-sum identity $2\cos u\cos v=\cos(u-v)+\cos(u+v)$, with the second term averaging to $0$ over a full period of $b$, gives
$$\mathbb E_b\bigl[\cos(wx+b)\cos(wy+b)\bigr]=\tfrac12\cos\bigl(w(x-y)\bigr).$$
Averaging over $w$, $\frac1{2W}\int_{-W}^W\cos(wt)\,dw=\frac{\sin(Wt)}{Wt}$, so $k(x,y)=\tfrac12\,\frac{\sin(W(x-y))}{W(x-y)}$, a sinc kernel. A Monte Carlo check with $W=1$ and $4\times10^5$ draws reproduces $k(0.3,-0.5)=\tfrac12\sin(0.8)/0.8\approx0.448$.

Now take the weight $\beta(w,b)=2\cos b$, so $B_\alpha=2$. The same identity gives $\mathbb E_b[2\cos b\cos(wx+b)]=\cos(wx)$, and averaging over $w$,
$$V(x)=\frac{\sin(Wx)}{Wx}\quad(V(0)=1).$$
This $V$ is a member of $\mathcal V$ with $\lVert V\rVert_\nu=2$. On $X=[-1,1]$, $\sup|V|=1$ and $\sup|V'|\approx0.301$ for $W=1$, $4.36$ for $W=10$.
:::

### Random features {#reasoning}

**The approximation.** Draw $\theta_1,\dots,\theta_K$ independently from $\nu$ and set
$$\widehat V(x)=\frac1K\sum_{j=1}^K\beta(\theta_j)\phi(x;\theta_j)=\sum_{j=1}^Kc_j\phi(x;\theta_j),\qquad c_j=\frac{\beta(\theta_j)}K.$$
This is the choice $c_j=\alpha(\theta_j)/(K\nu(\theta_j))$ in the proof of Lemma B.1 (p. 20), following Rahimi and Recht. Each term has mean $V(x)$, so $\mathbb E\widehat V(x)=V(x)$, and the coefficients satisfy $\lVert c\rVert_1=\frac1K\sum_j|\beta(\theta_j)|\le B_\alpha$. Thus $\widehat V$ lies in the finite-dimensional class (Boffi's (B.4), p. 20)
$$\widehat{\mathcal V}(B,\theta_{1:K})=\Bigl\{\sum_{j=1}^Kc_j\phi(\cdot;\theta_j):\ \lVert c\rVert_1\le B\Bigr\}.$$

**At one point.** For fixed $x$, $\widehat V(x)$ is an average of $K$ independent terms with values in $[-B_\alpha,B_\alpha]$ (when $|\phi|\le1$). Hoeffding's inequality ([[concentration]]) gives $|\widehat V(x)-V(x)|\le B_\alpha\sqrt{2\log(2/\delta)/K}$ with probability at least $1-\delta$. The error falls like $1/\sqrt K$.

**Uniformly over states.** A certificate must be approximated at every state at once, which is a uniform deviation in which the roles are exchanged: the $K$ independent features play the part of the sample, and the states $x$ index the "class". The tools of [[rademacher-properties]] then apply in the same order: symmetrization over the feature draws, a contraction step to remove the scalar function $\phi$, Jensen for the remaining linear sum, and McDiarmid's inequality for high probability. Boffi et al. carry this out in Lemma B.1 (pp. 20–22), a modification of Theorem 3.2 of Rahimi and Recht that also covers derivatives. We recall its conclusions.

::: lemma {#lem-b1} Uniform value and gradient approximation (Boffi et al., Lemma B.1, recalled)
Let $X\subset\mathbb R^p$ be bounded with $B_X=\sup_{x\in X}\lVert x\rVert$, let $B_\theta=\sup_{\theta\in\Theta}\lVert\theta\rVert$, and suppose $|\phi|\le1$ and $\phi$ is $L_\phi$-Lipschitz. Fix $V\in\mathcal V$ and $\delta\in(0,1)$. With probability at least $1-\delta$ over the draws, some $\widehat V\in\widehat{\mathcal V}(\lVert V\rVert_\nu,\theta_{1:K})$ satisfies
$$\begin{aligned}&\sup_{x\in X}|\widehat V(x)-V(x)|\\&\quad\le\frac{2\lVert V\rVert_\nu}{\sqrt K}\Bigl(1+\sqrt{\log(1/\delta)}\\&\qquad+2L_\phi\bigl(B_X\sqrt{\mathbb E\lVert w\rVert^2}+\sqrt{\mathbb E|b|^2}\bigr)\Bigr).\end{aligned}$$
If moreover $\phi$ is differentiable and $\phi'$ is $L_{\phi'}$-Lipschitz, then $\nabla V(x)=\mathbb E_\nu[\beta(\theta)\nabla_x\phi(x;\theta)]$, and with probability at least $1-2\delta$ the same $\widehat V$ also satisfies
$$\begin{aligned}&\sup_{x\in X}\lVert\nabla\widehat V(x)-\nabla V(x)\rVert\\&\quad\le\frac{B_\theta\lVert V\rVert_\nu}{\sqrt K}\Bigl(L_\phi\sqrt{2\log(1/\delta)}\\&\qquad+4(L_\phi+B_\theta L_{\phi'})(B_X+1)\sqrt p\Bigr).\end{aligned}$$
:::

These are (B.5)–(B.7). The value bound invokes the absolute-value scalar contraction inequality of Ledoux and Talagrand after subtracting the offset $\phi(0)$, treated separately, which matches the offset rule of [[rademacher-properties]]. The gradient bound writes $\lVert\nabla\widehat V-\nabla V\rVert$ as a supremum over unit vectors $q$ of $\langle q,\nabla\widehat V-\nabla V\rangle$. Each term then depends on the pair $(x,q)$ through a vector, so the proof invokes Maurer's *vector* contraction inequality, exactly the situation [[rademacher-properties]] (§"Vector-valued composition") explains the scalar lemma cannot handle. The atlas does not re-derive Lemma B.1; its proof is in the source, and the external inequalities it invokes are not checked locally.

**What the constants mean.** The value bound needs only second moments of $w$ and $b$. The gradient bound needs $B_\theta$, the *largest* parameter size, because the gradient of a ridge feature is $\phi'(\langle x,w\rangle+b)\,w$, whose size grows with $\lVert w\rVert$.

::: example {#ex-rf-numbers} Random features for the sinc certificate
For the certificate of \ref{ex-sinc} on $X=[-1,1]$, draw $K$ features, form $\widehat V$ and measure the largest value and derivative errors on a grid of $2001$ points. Each entry below is the median over $20$ independent dictionaries.

- $W=1$: value errors $0.258$, $0.083$, $0.032$, $0.0063$ and derivative errors $0.167$, $0.065$, $0.018$, $0.0044$ for $K=10$, $100$, $1000$, $10^4$.
- $W=10$: value errors $0.636$, $0.161$, $0.053$, $0.019$ and derivative errors $3.18$, $0.85$, $0.28$, $0.10$ for the same $K$.

Both errors fall roughly like $1/\sqrt K$: a hundredfold increase in $K$ cuts them about tenfold. Raising the frequency limit $W$ from $1$ to $10$ multiplies the derivative error by about $13$ to $23$ here, depending on $K$, as the factor $w$ in each feature gradient leads one to expect; the value error grows less, by a factor of about $1.7$ to $3$.

The guarantee is far more conservative. For $W=1$, $K=10^4$ and $\delta=0.05$, the right side of the value bound is $0.30$ and of the gradient bound $2.43$ (with $B_\theta=\sqrt{1+\pi^2}\approx3.30$), against observed errors $0.0063$ and $0.0044$. These runs illustrate the lemma on one example; they do not test it in general.
:::

### Why values are not enough {#derivatives}

A Lyapunov residual uses the gradient: $h=\nabla V(x)^{\mathsf T}\dot x+\rho(V(x))$ ([[boffi-thm-4-2]]). An approximation that is uniformly close in value can still have a very different gradient, and then the residual changes by a large amount.

Take $\dot x=-x$ on $[0.5,1]$, $V(x)=x^2$ and $\rho(v)=0.2v$. Then $h=-2x^2+0.2x^2=-1.8x^2\le-0.45$, a margin of $\gamma=0.45$ on this interval. Perturb the certificate by
$$g_m(x)=\frac{\sin(m^2x)}m,\qquad\sup|g_m|=\frac1m,\quad\sup|g_m'|=m.$$
The residual changes by $-x\,m\cos(m^2x)+0.2\sin(m^2x)/m$. For $m=10$ the values differ by at most $0.1$, but on $[0.5,1]$ the residual increases by as much as $9.74$; for $m=100$ the value change is $0.01$ and the residual increase $99.99$. Value accuracy improves while the certificate is destroyed. ([[boffi-thm-4-2]] uses $\sin(mx)/m$, whose gradient error stays of size $1$; here it grows without bound.)

This is why \ref{lem-b1} controls gradients as well, and why Theorem 4.4 measures closeness in the joint norm $\lVert\cdot\rVert_{\mathcal V}$ of [[certificate-classes]]. In the proof of Theorem 4.4 (pp. 22–23), both errors are made at most $a=\gamma/(8\sqrt2L_h)$ on $S$. The joint error is then at most $\sqrt{a^2+a^2}=\gamma/(8L_h)$, and since the residual is $L_h$-Lipschitz in $(V,\nabla V)$, every residual changes by at most $\gamma/8$; the source records the weaker $\gamma/4$. A feasible $V$ with $h(\xi_i,V)\le-\gamma$ then gives $h(\xi_i,\widehat V)\le-7\gamma/8$, and in particular $h(\xi_i,\widehat V)\le-3\gamma/4$, the value the source carries forward, at every training trajectory.

### Bounded versus unbounded frequencies {#frequency}

For cosine features $\phi=\cos$: $|\phi|\le1$, $\phi$ is $1$-Lipschitz, and $\phi'=-\sin$ is $1$-Lipschitz, so $L_\phi=L_{\phi'}=1$. A feature's gradient is $-\sin(wx+b)\,w$, of size at most $|w|$.

- **Bounded frequency.** With $w\in[-W,W]$ and $b\in[-\pi,\pi]$, $B_\theta=\sqrt{W^2+\pi^2}$ is finite. Every member of $\mathcal V$ and of $\widehat{\mathcal V}(B_\alpha,\theta_{1:K})$ then has $\sup|V|\le B_\alpha$ and $\sup\lVert\nabla V\rVert\le B_\alpha B_\theta L_\phi$ (Boffi p. 22), and all constants in \ref{lem-b1} and Theorem 4.4 are finite.
- **Unbounded frequency.** Bochner's theorem, cited by Boffi et al. via Rahimi and Recht (2007), their reference [35], writes translation-invariant kernels this way with unbounded frequencies. For example, with $w$ standard normal, $\mathbb E\cos(wt)=e^{-t^2/2}$, so $\mathbb E_\nu[\cos(wx+b)\cos(wy+b)]=\tfrac12e^{-(x-y)^2/2}$, a Gaussian kernel. Now $B_\theta=\sup\lVert\theta\rVert=\infty$. The value bound of \ref{lem-b1} is still finite, since $\mathbb E w^2=1$, but the gradient bound and Theorem 4.4 contain $B_\theta$ and become vacuous. Restricting to $|w|\le4$ discards only probability $6.3\times10^{-5}$ of $\nu$, but it changes $\nu$ and therefore the kernel and the class; the theorem then applies to the truncated class, not the Gaussian one.

### Draw the dictionary before the data {#independence}

The approximation in \ref{lem-b1} is random. It might seem enough to argue that *some* dictionary $\theta_{1:K}$ approximates the learned certificate well, and to apply Lemma 4.1 to the corresponding finite class. Boffi et al. point out (p. 22) that this fails: a dictionary chosen to fit the learned certificate depends on the training trajectories, so the finite class is no longer fixed before the data, and Lemma 4.1, a statement about a class fixed in advance, does not apply to it.

The proof therefore draws $\theta_{1:K}$ from $\nu$ *independently* of $\xi_1,\dots,\xi_n$, with $K$ chosen large enough (of the order of the quantity $\kappa$ in Theorem 4.4). With $\delta=1/n^2$ in \ref{lem-b1}, the good approximation exists except on a feature event of probability at most $1/n^2$, which appears as the final $+1/n^2$ in Theorem 4.4. Given the features, $\widehat{\mathcal V}(B_\alpha,\theta_{1:K})$ is a fixed class and the trajectories are still independent draws, so Lemma 4.1 applies to it with the shifted residual $\tilde h=h+\gamma/4$, margin $\gamma/2$ and bound $B_h+\gamma/4$. Finally,
$$\lVert\widehat V-\widehat V'\rVert_{\mathcal V}\le(1+B_\theta L_\phi)\lVert c-c'\rVert_1$$
for two members with coefficients $c,c'$: values change by at most $\lVert c-c'\rVert_1$ because $|\phi|\le1$, gradients by at most $\lVert c-c'\rVert_1B_\theta L_\phi$. So the finite class is a Lipschitz image of an $\ell_1$-ball in $\mathbb R^K$. By the volume bound and the transfer rules of [[covering-properties]], $\log N\le K\log(1+2/u)$ at relative scale $u$, and Dudley's integral ([[covering-dudley]]) gives complexity of order $B_\alpha(1+B_\theta L_\phi)L_h\sqrt{K/n}$. The parametric argument has taken over, with the feature count $K$ in place of Theorem 4.2's parameter count. The full assembly belongs to [[boffi-thm-4-4]].

::: remark
Two observations of this atlas, not made in the source. First, the shifted residual $\tilde h=h+\gamma/4$ is a fixed offset: the zero certificate ($c=0$) has $\tilde h=\gamma/4$ everywhere, not $0$. In the worst-case absolute convention this costs at most $\gamma/(4\sqrt n)$ in complexity ([[rademacher-properties]], the shift rule); after Lemma 4.1 squares the complexity and divides by $(\gamma/2)^2$ it contributes a term of order $\log^3n/n$, no worse than the rest. Second, for the *values* alone the finite class is $B$ times the convex hull of $\{\pm\phi(\cdot;\theta_j)\}$, so the convex-hull rule and Massart's lemma give value complexity at most $B\sqrt{2\log(2K)/n}$, only logarithmic in $K$. That does not transfer to the trajectory residual, which is a maximum over time and so not linear in $c$; the covering route is used instead.
:::

### Assumptions and domain {#assumptions}

- Ridge features $\phi(\langle x,w\rangle+b)$ with $|\phi|\le1$, $\phi$ $L_\phi$-Lipschitz, $\phi'$ $L_{\phi'}$-Lipschitz, and bounded parameters ($B_\theta<\infty$); a bounded state region.
- The class is the density-constrained one: $\sup|\alpha/\nu|\le B_\alpha$, a subset of an RKHS ball, not the whole ball.
- The dictionary is drawn from $\nu$ independently of the training trajectories; its failure probability is part of the bound.
- Values *and* gradients must be approximated, uniformly on the reachable set.
- Recalled rather than derived: Lemma B.1 and the external inequalities it uses (Rahimi–Recht, Ledoux–Talagrand, Maurer), the RKHS facts and Bochner's theorem.

### Exercises {#exercises}

::: question
**A valid kernel.** Show directly that $k(x,y)=\mathbb E_\nu[\phi(x;\theta)\phi(y;\theta)]$ gives a positive semidefinite Gram matrix on any points $x_1,\dots,x_m$.
---
For coefficients $c_1,\dots,c_m$, $\sum_{i,j}c_ic_jk(x_i,x_j)=\mathbb E_\nu\bigl[\sum_{i,j}c_ic_j\phi(x_i;\theta)\phi(x_j;\theta)\bigr]=\mathbb E_\nu\bigl[(\sum_ic_i\phi(x_i;\theta))^2\bigr]\ge0$, since an average of squares is nonnegative.
:::

::: question
**Coefficients.** In \ref{ex-sinc}, why does every random-feature approximation $\widehat V$ lie in $\widehat{\mathcal V}(2,\theta_{1:K})$, whatever the draws?
---
$c_j=\beta(\theta_j)/K=2\cos(b_j)/K$, so $\lVert c\rVert_1=\frac1K\sum_j2|\cos b_j|\le2$. The bound holds for every draw because the weight is bounded by $B_\alpha=2$ everywhere, which is exactly what the density constraint provides.
:::

::: question
**Value-close, residual-far.** In the example of \ref{derivatives} with $m=10$, is the perturbed certificate $x^2+g_{10}(x)$ still feasible with margin $\gamma=0.45$ on $[0.5,1]$? What would a pure value-approximation guarantee have predicted?
---
No. The residual increases by up to $9.74$, so at some points it is positive, far above $-0.45$. A value-only guarantee bounds the change in $V$ by $0.1$ and says nothing about $\nabla V$, so it cannot predict the residual; with $\rho(v)=0.2v$ it would only control the $\rho$ part, a change of at most $0.02$.
:::

::: question
**Choosing among dictionaries.** A colleague draws ten dictionaries before seeing any data, fits a certificate in each finite class, and keeps the dictionary whose fit has the largest margin. Is Lemma 4.1 still usable, and at what cost?
---
Yes, with a union bound. Each of the ten classes is fixed before the data and independent of it, so Lemma 4.1 applies to each at confidence $\delta/10$, and with probability at least $1-\delta$ all ten statements hold together; the chosen one is among them. The cost is $\log(10/\delta)$ in place of $\log(1/\delta)$. What is not allowed is drawing or modifying dictionaries after looking at the trajectories, which makes the class depend on the data.
:::

### Where it is used {#uses}

[[boffi-thm-4-4]] assembles Lemma B.1, the independent dictionary, the shifted margin and the $\ell_1$-ball cover into its bound.

## Card

### The idea {#idea}

A kernel $k(x,y)=\mathbb E_\theta[\phi(x;\theta)\phi(y;\theta)]$ admits finite approximations by sampling feature parameters. Boffi's class is $V=\mathbb E_\nu[\beta\phi]$ with $|\beta|\le B_\alpha$, a density-constrained subset of an RKHS ball. Drawing $\theta_1,\dots,\theta_K\sim\nu$ independently of the data and setting $c_j=\beta(\theta_j)/K$ gives $\widehat V=\sum_jc_j\phi(\cdot;\theta_j)$ with $\lVert c\rVert_1\le B_\alpha$ and value and gradient errors of order $1/\sqrt K$ (Lemma B.1).

### Intuition and example {#intuition}

Cosine features with $|w|\le W$ give a sinc kernel; the weight $2\cos b$ gives the certificate $\sin(Wx)/(Wx)$. With $W=1$ and $K=10^4$ features the observed sup errors are about $0.006$ (values) and $0.004$ (derivatives); with $W=10$ the derivative error is about twenty times larger. Values alone are not enough: $\sin(m^2x)/m$ changes values by $1/m$ but a Lyapunov residual by about $m$.

### Assumptions and domain {#assumptions}

Bounded feature parameters ($B_\theta<\infty$, which excludes unbounded-frequency features such as those of a Gaussian kernel), $|\phi|\le1$, $\phi$ and $\phi'$ Lipschitz, a bounded region, the coefficient-density constraint, and a dictionary drawn independently of the trajectories. Lemma B.1 and its external inequalities are recalled, not proved.

### Where it is used {#uses}

[[boffi-thm-4-4]].
