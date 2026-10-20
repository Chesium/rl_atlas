+++
summary = "A bounded-density kernel class admits a derivative-aware random-feature generalization argument."
prereqs = ["boffi-lemma-4-1", "kernels-random-features"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 4.4, p.7; Appendix B.3, pp.20–24", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question {#question}

[[boffi-thm-4-2]] charges the number of parameters $k$. A kernel class has no finite parameter count, so that theorem cannot be applied to it. Yet Theorem 4.4 of Boffi et al. gives a fast violation bound for a kernel class all the same. How?

The proof borrows a finite class it never fits. It draws $K$ random features **before** looking at the trajectories, shows that with high probability the learned certificate is close to a combination of those features **in value and in gradient**, applies Lemma 4.1 to the finite feature class, and pays for everything that could go wrong. This lesson states the theorem, traces every error term of the proof (Appendix B.3, pp.20–24), works a cosine example, and shows why the dictionary must be fixed before the data. [[kernels-random-features]] built the objects and the approximation lemma; we recall what is used. This is an optional branch: [[boffi-thm-4-2]] does not need it.

### The class and its bounds {#class}

**Features.** A ridge feature is $\phi(x;\theta)=\phi(\langle x,w\rangle+b)$ with parameter $\theta=(w,b)\in\Theta\subset\mathbb R^p\times\mathbb R$, drawn from a probability distribution $\nu$ with density $\nu(\theta)$. (Here $\nu$ is the feature distribution, not the uniform measure of [[boffi-thm-5-1]].) The scalar function $\phi$ satisfies $|\phi|\le1$, is $L_\phi$-Lipschitz and differentiable, and $\phi'$ is $L_{\phi'}$-Lipschitz. Parameters are bounded: $B_\theta=\sup_{\theta\in\Theta}\|\theta\|<\infty$. (The flow $\phi_t$ has a time subscript and is unrelated.)

**The class (4.5).** The paper writes members as $\int_\Theta\alpha(\theta)\phi(x;\theta)\,d\theta$ with $\sup_\theta|\alpha(\theta)/\nu(\theta)|\le B_\alpha$; here $\alpha$ is a coefficient density, not a rate. With $\beta=\alpha/\nu$, as in [[kernels-random-features]],
$$\mathcal V=\big\{V=\mathbb E_{\theta\sim\nu}[\beta(\theta)\phi(\cdot;\theta)]:\ \sup_\theta|\beta(\theta)|\le B_\alpha\big\}.$$
A member is an average of features with a **bounded** weight. This is a subset of the ball of radius $B_\alpha$ in the kernel's function space, not the whole ball (\ref{density}).

**Assumption 4.2 holds.** For $V\in\mathcal V$ and every $x$, $|V(x)|\le\mathbb E_\nu|\beta|\,|\phi|\le B_\alpha$. The gradient of a feature is $\phi'(\langle x,w\rangle+b)\,w$, of length at most $L_\phi\|w\|\le L_\phi B_\theta$, so $\|\nabla V(x)\|\le B_\alpha B_\theta L_\phi$. The same bounds hold for every finite combination $\sum_jc_j\phi(\cdot;\theta_j)$ with $\|c\|_1=\sum_j|c_j|\le B_\alpha$ (p.22). So $B_V=B_\alpha$ and $B_{\nabla V}=B_\alpha B_\theta L_\phi$, and $L_h$, $B_h$ are defined on that region ([[certificate-classes]]).

### Statement {#statement}

::: theorem {#thm-44} Boffi et al., arXiv:2008.05952v2, Theorem 4.4, p.7 (as printed)
Suppose $|\phi|\le1$, $\phi$ is $L_\phi$-Lipschitz, $\phi$ is differentiable, $\phi'$ is $L_{\phi'}$-Lipschitz, and $B_\theta=\sup_{\theta\in\Theta}\|\theta\|$ is finite. Under Assumption 4.1, if problem (3.2) over the class (4.5) is feasible, then any solution $\widehat V_n$ satisfies, with probability at least $1-\delta$ over $\xi_1,\dots,\xi_n$,
$$\begin{aligned}\operatorname{err}(\widehat V_n)\le O(1)\Bigg(&B_\alpha^2(1+B_\theta L_\phi)^2L_h^2\,\frac{\kappa\log^3n}{\gamma^2n}\\&+\frac{\log\big(\log(1+B_h/\gamma)/\delta\big)}n+\frac1{n^2}\Bigg),\end{aligned} \label{bound}$$
where
$$\begin{aligned}\kappa=\frac{B_\alpha^2L_h^2}{\gamma^2}\Big(&(1+B_\theta L_\phi)^2\log n\\&+B_\theta^2(B_S+1)^2(L_\phi+B_\theta L_{\phi'})^2p\Big).\end{aligned} \label{kappa}$$
:::

**Reading the bound.** $\kappa$ will be the number of random features, up to a constant. It contains $1/\gamma^2$ and $\log n$, so the leading term is of order
$$\begin{aligned}&\frac{B_\alpha^4(1+B_\theta L_\phi)^2L_h^4}{\gamma^4n}\Big((1+B_\theta L_\phi)^2\log^4n\\&\quad+B_\theta^2(B_S+1)^2(L_\phi+B_\theta L_{\phi'})^2p\log^3n\Big).\end{aligned}$$
The rate in $n$ is still fast, $\log^4n/n$, but the margin enters as $1/\gamma^4$ rather than the $1/\gamma^2$ of Theorem 4.2: a smaller margin forces a finer approximation, hence more features, hence a larger finite class. Halving $\gamma$ multiplies the leading term by $16$. The state dimension $p$ enters through the gradient approximation. The last term, $1/n^2$, is the paper's charge for the event that the random features approximate badly. Step 9 explains why the atlas charges it, as $2/n^2$, to the confidence level instead.

### The proof route {#reasoning}

Write $\widehat V_n\in\mathcal V$ for the learner's solution of (3.2). It depends on the data.

**Step 1: the tempting move fails.** By [[kernels-random-features]], for any fixed member some finite combination of features approximates it well. It is tempting to pick a dictionary that approximates $\widehat V_n$ and apply Lemma 4.1 to that finite class. Boffi et al. point out (p.22) that this does not work: such a dictionary is chosen through $\widehat V_n$, hence through $\xi_1,\dots,\xi_n$, and Lemma 4.1 needs a class fixed before the data.

**Step 2: draw the dictionary independently.** Draw $\theta_1^\star,\dots,\theta_K^\star$ independently from $\nu$, and independently of $\xi_1,\dots,\xi_n$. Given the draw, the finite class
$$\mathcal V_K=\Big\{\sum_{j=1}^Kc_j\phi(\cdot;\theta_j^\star):\ \|c\|_1\le B_\alpha\Big\}$$
is fixed, and the trajectories are still independent draws from $\mathcal D$. Its natural approximation of $\widehat V_n$ is $\widetilde V_n=\sum_jc_j\phi(\cdot;\theta_j^\star)$ with importance weights $c_j=\beta(\theta_j^\star)/K$, where $\beta$ is the weight of $\widehat V_n$; then $\|c\|_1\le B_\alpha$, so $\widetilde V_n\in\mathcal V_K$.

**Step 3: approximate values and gradients (Lemma B.1).** [[kernels-random-features]] recalls the paper's Lemma B.1, a modification of Theorem 3.2 of Rahimi and Recht. For a fixed member $V$ with $\sup|\beta|\le B$ and a failure level $\delta_f$, with probability at least $1-2\delta_f$ over the features, both
$$\begin{aligned}&\sup_{x\in S}|\widetilde V-V|\le\frac{2B}{\sqrt K}\Big(1+\sqrt{\log(1/\delta_f)}\\&\quad+2L_\phi\big(B_S\sqrt{\mathbb E\|w\|^2}+\sqrt{\mathbb Eb^2}\big)\Big),\end{aligned}$$
$$\begin{aligned}&\sup_{x\in S}\|\nabla\widetilde V-\nabla V\|\le\frac{B_\theta B}{\sqrt K}\Big(L_\phi\sqrt{2\log(1/\delta_f)}\\&\quad+4(L_\phi+B_\theta L_{\phi'})(B_S+1)\sqrt p\Big)\end{aligned}$$
hold. Its proof has four ingredients: the weights make each term an unbiased estimate of $V$ (so $\mathbb E\widetilde V=V$); changing one feature moves the sup error by at most $2B/K$ for values and $2B_\theta L_\phi B/K$ for gradients; symmetrization with the contraction inequalities of Ledoux–Talagrand (values) and Maurer (gradients, a vector-valued case) bounds the expected sup error by order $1/\sqrt K$; McDiarmid's inequality adds the deviation. The atlas recalls the lemma and does not re-derive it ([[rademacher-properties]] explains the contraction steps).

Apply it to $V=\widehat V_n$ **conditionally on the data**: the features are independent of the data, so for each fixed sample the lemma applies to the fixed function $\widehat V_n$. Take $\delta_f=1/n^2$, so $\log(1/\delta_f)=2\log n$. Use $\mathbb E\|w\|^2\le B_\theta^2$ and $\mathbb Eb^2\le B_\theta^2$, and, for $n\ge3$ so that $\log n\ge1$, collect terms with
$$\Gamma=(1+B_\theta L_\phi)\sqrt{\log n}+B_\theta(B_S+1)(L_\phi+B_\theta L_{\phi'})\sqrt p.$$
Both brackets are then at most a constant multiple of $\Gamma$: for values, $1+\sqrt{2\log n}\le(1+\sqrt2)\sqrt{\log n}$ and $2L_\phi B_\theta(B_S+1)\le2B_\theta(B_S+1)(L_\phi+B_\theta L_{\phi'})\sqrt p$; for gradients, $2B_\theta L_\phi\sqrt{\log n}\le2(1+B_\theta L_\phi)\sqrt{\log n}$. Both errors are therefore at most $2(1+\sqrt2)B_\alpha\Gamma/\sqrt K$. The proof asks for both to be at most
$$a=\frac{\gamma}{8\sqrt2\,L_h},$$
which holds once
$$K\ge\Big(16\sqrt2(1+\sqrt2)\Big)^2\frac{B_\alpha^2L_h^2}{\gamma^2}\Gamma^2.$$
This is the paper's choice $K=\lceil c_0B_\alpha^2L_h^2\Gamma^2/\gamma^2\rceil$ (the paper writes $c$; we write $c_0$ to keep $c$ for coefficient vectors) with an explicit $c_0\approx2.98\times10^3$. Since $\Gamma^2\le2(1+B_\theta L_\phi)^2\log n+2B_\theta^2(B_S+1)^2(L_\phi+B_\theta L_{\phi'})^2p$, this $K$ is at most a constant times $\kappa$ of \ref{kappa}, plus one. Call $E$ the event that both approximations hold. Given the data, $E$ fails with probability at most $2\delta_f=2/n^2$. (The paper writes $1/n^2$; Lemma B.1 as stated gives $2\delta_f$. Taking $\delta_f=1/(2n^2)$ instead gives $1/n^2$ and changes only constants.)

**Step 4: transfer feasibility.** On $E$, at every $x\in S$ the stacked error $(\widetilde V_n-\widehat V_n,\nabla\widetilde V_n-\nabla\widehat V_n)$ has length at most $\sqrt{a^2+a^2}=\sqrt2a$. Both certificates lie in the region where $h$ is $L_h$-Lipschitz (\ref{class}), so by the trajectory lemma of [[certificate-classes]]
$$\sup_{\xi\in X}|h(\xi,\widetilde V_n)-h(\xi,\widehat V_n)|\le L_h\sqrt2\,a=\frac\gamma8.$$
The paper records the weaker $\gamma/4$, which is all it uses. Since $h(\xi_i,\widehat V_n)\le-\gamma$, we get $h(\xi_i,\widetilde V_n)\le-7\gamma/8\le-3\gamma/4$ for every $i$: the approximation is feasible with margin $3\gamma/4$. This is (B.8).

**Step 5: shift the residual.** Define $\tilde h=h+\gamma/4$. Then $\tilde h(\xi_i,\widetilde V_n)\le-\gamma/2$ for all $i$: zero margin errors for $\tilde h$ at margin $\gamma/2$, with $|\tilde h|\le B_h+\gamma/4$ and the same Lipschitz constant $L_h$. On $E$, a violation by the learned certificate forces a violation by the shifted approximation:
$$h(\xi,\widehat V_n)>0\ \Rightarrow\ h(\xi,\widetilde V_n)>-\tfrac\gamma8\ \Rightarrow\ \tilde h(\xi,\widetilde V_n)>0.$$
So on $E$, $\operatorname{err}(\widehat V_n)\le\Pr_\xi\big(\tilde h(\xi,\widetilde V_n)>0\big)$.

**Step 6: apply Lemma 4.1 to the fixed finite class.** Conditionally on the features, $\mathcal V_K$ is fixed, the data are i.i.d. from $\mathcal D$, Assumption 4.2 holds (\ref{class}), and $\widetilde V_n$ is a member with zero margin errors for $\tilde h$ at margin $\gamma/2$. [[boffi-lemma-4-1]], with $B_h\to B_h+\gamma/4$ and $\gamma\to\gamma/2$, gives an event $G$ of probability at least $1-\delta$ over the data on which
$$\begin{aligned}&\Pr_\xi\big(\tilde h(\xi,\widetilde V_n)>0\big)\\&\quad\le K_{4.1}\Bigg(\frac{4\log^3n}{\gamma^2}\mathfrak R_n(\tilde h,\mathcal V_K)^2\\&\qquad+\frac{2\log\big(\log(8B_h/\gamma+2)/\delta\big)}n\Bigg),\end{aligned}$$
where $K_{4.1}$ is the lemma's universal constant (written $K$ in [[boffi-lemma-4-1]]; here $K$ counts features) and $4(B_h+\gamma/4)/(\gamma/2)=8B_h/\gamma+2$.

**Step 7: the complexity of the finite class.** Two members with coefficient vectors $c,c'$ satisfy
$$\|V_c-V_{c'}\|_{\mathcal V}\le(1+B_\theta L_\phi)\|c-c'\|_1,$$
since values move by at most $\|c-c'\|_1$ (as $|\phi|\le1$) and gradients by at most $\|c-c'\|_1B_\theta L_\phi$. So $\mathcal V_K$ is a Lipschitz image of the $\ell_1$-ball of radius $B_\alpha$ in $\mathbb R^K$. The volume bound holds in any norm ([[covering-properties]]), so $\log N(u)\le K\log(1+2/u)$ at relative scale $u$, with centers inside the ball. Dudley's integral, chained from $c=0$ exactly as in [[boffi-thm-4-2]], gives for the unshifted residual $\mathfrak R_n(h,\mathcal V_K)\le24I\,B_\alpha(1+B_\theta L_\phi)L_h\sqrt{K/n}$ with $I\approx1.353$, provided $V\equiv0$ has zero residual, as for the Lyapunov residual.

The shift costs one more term, an observation of the atlas that the source does not make. For $\tilde h$ the member $c=0$ has residual $\gamma/4$ everywhere, not $0$, and a single constant function has positive absolute complexity. The triangle inequality gives
$$\begin{aligned}\mathfrak R_n(\tilde h,\mathcal V_K)&\le\mathfrak R_n(h,\mathcal V_K)+\frac\gamma4\cdot\frac{\mathbb E_\sigma|\sigma_1+\dots+\sigma_n|}n\\&\le\mathfrak R_n(h,\mathcal V_K)+\frac\gamma{4\sqrt n}.\end{aligned}$$

**Step 8: assemble.** Square with $(u+v)^2\le2u^2+2v^2$ and multiply by $4\log^3n/\gamma^2$:
$$\begin{aligned}&\frac{4\log^3n}{\gamma^2}\mathfrak R_n(\tilde h,\mathcal V_K)^2\\&\quad\le8(24I)^2B_\alpha^2(1+B_\theta L_\phi)^2L_h^2\\&\qquad\cdot\frac{K\log^3n}{\gamma^2n}+\frac{\log^3n}{2n}.\end{aligned}$$
The second term is absorbed by the first. The class contains $V\equiv0$ with zero residual, and a feasible certificate has $h(\xi_1,\widehat V_n)\le-\gamma$, so by the Lipschitz bound $\gamma\le L_h\|\widehat V_n\|_{\mathcal V}\le L_hB_\alpha(1+B_\theta L_\phi)$. With $K\ge1$ the first term is therefore at least a constant times $\log^3n/n$. With $K$ of order $\kappa$, the first term is the leading term of \ref{bound}.

For the confidence term: feasibility forces $B_h\ge\gamma$, and for $x=B_h/\gamma\ge1$ one checks $\log(8x+2)\le3.33\log(1+x)$ (equality is approached at $x=1$, where the ratio is $\log10/\log2\approx3.32$). Hence the lemma's numerator is at most $2\log3.33+2\log\big(\log(1+B_h/\gamma)/\delta\big)$. The additive constant is absorbed into $O(1)$ whenever $\log(\log(1+B_h/\gamma)/\delta)$ is bounded below by a positive constant, for instance for $\delta\le\tfrac12$, where it is at least $\log(2\log2)\approx0.33$. For $\delta$ near $1$ the printed form can be small or negative and the lemma's form should be kept.

**Step 9: the failure event.** On $E\cap G$, $\operatorname{err}(\widehat V_n)$ is at most the first two terms of \ref{bound}. Over the joint draw of data and features, $E$ fails with probability at most $2/n^2$ (it does so for every fixed sample) and $G$ fails with probability at most $\delta$ (it does so for every fixed dictionary). But $\operatorname{err}(\widehat V_n)$ depends on the data only: the features were an analysis device, and the learner never used them. The event that this error bound holds contains $E\cap G$; because it depends only on the data, its probability over the data equals its joint probability over data and features. So, with probability at least $1-\delta-2/n^2$ **over the data alone**,
$$\operatorname{err}(\widehat V_n)\le O(1)\Big(\text{first term}+\text{confidence term}\Big).$$
This is the atlas's reading of the last step, and it is complete as given. The paper's route differs (p.23). It adds $1/n^2$ inside a probability taken jointly over a fresh $\xi$ and the features, and it keeps the confidence level $1-\delta$ over the data. Read literally, that step has a gap. Lemma 4.1's good event $G$ depends on the dictionary, so "with probability $1-\delta$ over the data, the joint probability is bounded" does not follow from the lemma for each fixed dictionary. Closing the gap needs an extra averaging argument over the dictionary, for example Markov's inequality, which trades part of $\delta$ for an additive term. The reading above avoids that step. It charges the feature failure to the confidence level, as $2/n^2$, and keeps the violation probability, over a fresh trajectory, separate from the probability over the data.

### Worked case: a cosine dictionary {#example}

::: example {#ex-cosine} Constants for cosine features on the scalar flow
Take $\dot x=-x$ in one dimension ($p=1$), $\mathcal D$ supported on $1\le|\xi|\le2$ and $T=[0,0.5]$, so every trajectory state satisfies $0.607\approx e^{-0.5}\le|x|\le2$; take $S=[-2,2]$, $B_S=2$. Use cosine features $\cos(wx+b)$ with $w$ uniform on $[-1,1]$ and $b$ uniform on $[-\pi,\pi]$: $|\phi|\le1$, $L_\phi=L_{\phi'}=1$, $B_\theta=\sqrt{1+\pi^2}\approx3.30$.

*The residual.* Use the pure decrease residual $h=\nabla V^{\mathsf T}\dot x$. It fits the framework (3.1), where $h$ is any fixed continuous function, though it is not the §3.1.1 Lyapunov residual with a rate function. Here $L_h=\sup_S|\dot x|=2$, $B_h\le B_{\nabla V}B_S=B_\alpha B_\theta\cdot2$, and $V\equiv0$ has zero residual.

*A feasible member.* The weight $\beta(w,b)=-2\cos b$ gives $V(x)=-\sin x/x$ ([[kernels-random-features]] computes the same average with the opposite sign), so $B_\alpha=2$. The class has no constants, but $h$ ignores them: $V+1=1-\sin x/x$ is positive on $[-2,2]$ away from $0$ and vanishes at $0$, and it has the same residual. Along the dynamics, $h=-xV'(x)=\cos x-\sin x/x$. On $0.607\le|x|\le2$ its largest value is $-0.118$, at $|x|=0.607$. So $h(\xi,V)\le-0.118$ for every allowed $\xi$, and (3.2) is feasible with $\gamma=0.1$ for every sample.

*The constants.* $B_\alpha^2L_h^2/\gamma^2=1600$, $(1+B_\theta L_\phi)^2\approx18.5$ and $B_\theta^2(B_S+1)^2(L_\phi+B_\theta L_{\phi'})^2\approx1806$. At $n=1000$:
$$\kappa\approx1600\,(18.5\cdot6.91+1806)\approx3.09\times10^6,$$
and the leading term without its $O(1)$ is $B_\alpha^2(1+B_\theta L_\phi)^2L_h^2\,\kappa\log^3n/(\gamma^2n)\approx3.0\times10^{10}$. The bound is vacuous by ten orders of magnitude.

*The feature count of the proof.* $a=\gamma/(8\sqrt2L_h)\approx0.0044$. With $\delta_f=10^{-6}$, Lemma B.1's gradient bound is $374.7/\sqrt K$, which is below $a$ only for $K\ge7.2\times10^9$ features (the value bound needs $9.3\times10^7$). These numbers come from worst-case inequalities: [[kernels-random-features]] observes sup derivative errors near $0.004$ with $10^4$ features for a similar certificate on $[-1,1]$.
:::

The example satisfies every premise, and the theorem still says nothing numerical about it. Its value is in the dependence: $1/\gamma^4$, $\log^4n/n$, and a cost for every derivative bound.

### The dictionary must be fixed before the data {#dictionary}

The proof needs the features drawn independently of $\xi_1,\dots,\xi_n$, and it needs nothing else from them: the learner fits over the whole class (4.5). Practitioners often fit **in** a random-feature class instead. Both settings have the same rule.

- **A dictionary drawn first.** Fix the seed, draw $\theta_1^\star,\dots,\theta_K^\star$, then record trajectories and fit coefficients with $\|c\|_1\le B_\alpha$. The finite class is fixed before the data, Lemma 4.1 applies to it directly, and Step 7 bounds its complexity; no approximation event is needed. The guarantee is for that finite class.
- **A dictionary changed after fitting.** Suppose the fit fails or a holdout shows violations, and the practitioner redraws the features, raises the frequency limit, or keeps the features with the largest fitted coefficients, until the fit succeeds. The final class was chosen through the trajectories. Lemma 4.1 is a statement about a class fixed in advance, so the fixed-class application is void, however good the final fit looks. Raising the frequency limit also changes $\nu$, and with it the kernel, $B_\theta$ and the class (4.5) itself.

Two repairs are honest. Declare a finite list of $M$ dictionaries before the data and apply the lemma to each at confidence $\delta/M$; the confidence numerator grows by $2\log M$. Or select with one dataset and certify with fresh, independent trajectories, as a holdout check does ([[learning-certificates]]).

### Bounded density, not a kernel ball {#density}

The class asks for $\sup|\beta|\le B_\alpha$. The kernel's function space, the RKHS, also contains averages whose weight is only square-integrable ([[kernels-random-features]]). For the cosine features above, the weight $\beta(w,b)=2\cos(b)\,|w|^{-1/4}$ has $\mathbb E_\nu\beta^2=\mathbb E[4\cos^2b]\,\mathbb E|w|^{-1/2}=2\cdot2=4$, so its average lies in the RKHS ball of radius $2$, but $\sup|\beta|=\infty$, so it lies in the class for no $B_\alpha$. The proof needs the sup bound twice: for $\|c\|_1\le B_\alpha$, which places the approximation in the finite class, and for the bounded differences behind McDiarmid's inequality in Lemma B.1. The theorem is about the bounded-density class (4.5), not an unrestricted RKHS ball. Likewise, unbounded frequencies (a Gaussian kernel) make $B_\theta=\infty$ and the bound vacuous ([[kernels-random-features]]).

### Assumptions and scope {#assumptions}

- **Features:** ridge form, $|\phi|\le1$, $\phi$ and $\phi'$ Lipschitz, bounded parameters $B_\theta<\infty$; the class (4.5) with a bounded density weight $B_\alpha$.
- **Assumption 4.1**, independent initial states, a fixed $\gamma>0$ and feasibility of (3.2) over (4.5).
- **A dictionary independent of the data**, used only in the analysis; its failure probability is charged.
- **Recalled, not proved:** Lemma 4.1 and Lemma B.1 with the inequalities it invokes. **Derived here:** the feature count, the transfer of feasibility, the shift, the event inclusion, the $\ell_1$-ball complexity and the assembly.
- **Added or read by the atlas:** the zero-residual member $V\equiv0$ (true for the Lyapunov and pure decrease residuals); the extra $\gamma/(4\sqrt n)$ from the shift, absorbed; $2/n^2$ for Lemma B.1's two events; the final probability read over the data alone; the confidence term in the lemma's form, with the printed form valid up to constants for $\delta\le\tfrac12$.

### Exercises {#exercises}

::: question
With $a=\gamma/(8\sqrt2L_h)$ for both the value and the gradient error, by how much can a trajectory residual change? Why does the proof shift the residual by $\gamma/4$ rather than $\gamma/8$?
---
The stacked error has length at most $\sqrt2a=\gamma/(8L_h)$, so the residual changes by at most $\gamma/8$. The paper records $\gamma/4$; either works, because the shifted residual then has margin $\gamma/2$ on the sample and a fresh violation of $\widehat V_n$ still forces $\tilde h>0$. Shifting by $\gamma/8$ would give margin $3\gamma/4$ and slightly better constants.
:::

::: question
Show that on the approximation event, $h(\xi,\widehat V_n)>0$ implies $\tilde h(\xi,\widetilde V_n)>0$, where $\tilde h=h+\gamma/4$.
---
On the event, $|h(\xi,\widetilde V_n)-h(\xi,\widehat V_n)|\le\gamma/8$, so $h(\xi,\widetilde V_n)\ge h(\xi,\widehat V_n)-\gamma/8>-\gamma/8$. Adding $\gamma/4$ gives $\tilde h(\xi,\widetilde V_n)>\gamma/8>0$.
:::

::: question
Everything else fixed, by what factor does the leading term of \ref{bound} change when $\gamma$ is halved? Compare with Theorem 4.2.
---
$\kappa$ contains $1/\gamma^2$ and the term has another $1/\gamma^2$, so the factor is $2^4=16$. In Theorem 4.2 the leading term contains $1/\gamma^2$ only, a factor $4$.
:::

::: question
A practitioner fixes the seed and draws $500$ cosine features, records $200$ trajectories, fits coefficients with $\|c\|_1\le2$, sees violations on a holdout, adds $500$ new features, refits, and reports the bound for the $1000$-feature class. What is wrong, and what would be valid?
---
The second dictionary was added because of the data, so the reported class was not fixed before the trajectories and Lemma 4.1 does not apply to it. Valid alternatives: declare both dictionaries (or a list of $M$) in advance and pay $\delta/M$; or certify the final fit on new, independent trajectories. The holdout used to decide is no longer fresh for the final model.
:::

::: question
For cosine features with $w$ uniform on $[-2,2]$ and $b$ uniform on $[-\pi,\pi]$, compute $B_\theta$ and the gradient bound $B_{\nabla V}$ for $B_\alpha=2$. Is it tight for $V(x)=-\sin(2x)/(2x)$?
---
$B_\theta=\sqrt{4+\pi^2}\approx3.72$, so $B_{\nabla V}=2\cdot3.72\approx7.45$. It is loose: a feature's gradient is $-\sin(wx+b)w$, at most $|w|\le2$, so $2\cdot2=4$ already bounds every member's derivative; the bias $b$ inflates $B_\theta$ without affecting gradients. Even $4$ is loose for this member: on $S=[-2,2]$ its largest slope is about $0.87$, attained near $2x\approx2.08$, so the general bound $7.45$ overstates it about $8.5$-fold and the improved bound $4$ about $4.6$-fold.
:::

### Where it is used {#uses}

[[boffi-thm-5-1]] converts a violation bound from any of the §4 theorems into decrease on a region. Theorem 4.4 is an optional alternative to [[boffi-thm-4-2]] for kernel classes; [[learning-certificates]] poses the problem it solves.

## Card

### Statement {#statement}

Ridge features $\phi(\langle x,w\rangle+b)$ with $|\phi|\le1$, $\phi$ and $\phi'$ Lipschitz ($L_\phi$, $L_{\phi'}$), $B_\theta=\sup\|\theta\|<\infty$; class (4.5): $V=\mathbb E_\nu[\beta\phi]$ with $\sup|\beta|\le B_\alpha$. Under Assumption 4.1 and feasibility of (3.2), with probability at least $1-\delta$ (Boffi et al., v2, Theorem 4.4, as printed),
$$\begin{aligned}\operatorname{err}(\widehat V_n)\le O(1)\Big(&B_\alpha^2(1+B_\theta L_\phi)^2L_h^2\tfrac{\kappa\log^3n}{\gamma^2n}\\&+\tfrac1n\log\tfrac{\log(1+B_h/\gamma)}\delta+\tfrac1{n^2}\Big),\end{aligned}$$
$$\begin{aligned}\kappa=\tfrac{B_\alpha^2L_h^2}{\gamma^2}\Big(&(1+B_\theta L_\phi)^2\log n\\&+B_\theta^2(B_S+1)^2(L_\phi+B_\theta L_{\phi'})^2p\Big).\end{aligned}$$

### Intuition and example {#intuition}

Draw $K\approx\kappa$ features independently of the data; with probability $1-O(1/n^2)$ the learned certificate is within $\gamma/(8\sqrt2L_h)$ of a feature combination in value and gradient, so the combination meets margin $3\gamma/4$; shift the residual by $\gamma/4$ and apply Lemma 4.1 to the fixed finite class, an $\ell_1$-ball image. The margin enters as $1/\gamma^4$. Cosine features on $\dot x=-x$ with $\gamma=0.1$: $\kappa\approx3\times10^6$ at $n=1000$, a vacuous but premise-satisfying instance.

### Assumptions and domain {#assumptions}

- A bounded-density class, not an RKHS ball; bounded frequencies.
- Features drawn independently of the trajectories; a dictionary changed after fitting voids the fixed-class step.
- Independent initial states, a fixed $\gamma$, feasibility; Lemmas 4.1 and B.1 recalled.
- Atlas additions: zero-residual member, a shift term $\gamma/(4\sqrt n)$ (absorbed), $2/n^2$ for Lemma B.1, the final probability read over the data alone.

### Proof sketch {#proof}

1. Do not pick features through the data (p.22): draw $\theta_1^\star,\dots,\theta_K^\star\sim\nu$ independently.
2. Lemma B.1 with $\delta_f=1/n^2$ and $K\ge c_0B_\alpha^2L_h^2\Gamma^2/\gamma^2$: value and gradient errors at most $\gamma/(8\sqrt2L_h)$ except with probability $2/n^2$.
3. Residuals move by at most $\gamma/8$; the approximation meets margin $3\gamma/4$ (B.8).
4. $\tilde h=h+\gamma/4$: margin $\gamma/2$, bound $B_h+\gamma/4$; a violation by $\widehat V_n$ forces $\tilde h>0$ for the approximation.
5. Lemma 4.1 on the fixed finite class; $\|V_c-V_{c'}\|_{\mathcal V}\le(1+B_\theta L_\phi)\|c-c'\|_1$, volume and Dudley give complexity $O(B_\alpha(1+B_\theta L_\phi)L_h\sqrt{K/n})$, plus $\gamma/(4\sqrt n)$ for the shift.
6. Square, substitute $K=O(\kappa)$, and charge the feature failure.

Source status: located; no independent proof audit has been recorded.

### Where it is used {#uses}

[[boffi-thm-5-1]], [[learning-certificates]].
