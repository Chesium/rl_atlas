+++
summary = "Structured matrix entropy improves the leading dimension dependence beyond a naive parameter count."
prereqs = ["boffi-lemma-4-1", "dual-sudakov", "covering-properties"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 4.3, equations (4.3)–(4.4), p.7; Appendix B.2, p.19", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question {#question}

Sum-of-squares certificates are quadratic forms in a vector of features: $V_Q(x)=m(x)^{\mathsf T}Q\,m(x)$, where $m(x)$ lists $d$ monomials of the state and $Q$ is a symmetric $d\times d$ matrix. Such a $Q$ has $d(d+1)/2$ free entries. Counting them as parameters and applying [[boffi-thm-4-2]] gives a violation bound of order $d^2/n$, up to logarithms. Theorem 4.3 of Boffi et al. gives order $d\log^2d/n$ instead. Where does the saving come from, and when is it worth anything?

The answer is that covering numbers depend on the norm. The certificate moves only as much as the **operator norm** of a change in $Q$ allows, and the ball of matrices, measured in that weaker norm, can be covered by far fewer points than its $d^2$ dimensions suggest. [[dual-sudakov]] built the tools: the operator-norm Lipschitz bound, the two entropy estimates and the split integral. This lesson states the theorem, assembles its proof from those tools and [[boffi-lemma-4-1]], computes a ten-monomial example, and records where the atlas Lab falls outside the theorem.

### The class {#class}

Let $m:\mathbb R^p\to\mathbb R^d$ be a smooth feature map, typically monomials, with Jacobian $Dm(x)$, a $d\times p$ matrix. Boffi et al.'s class (4.3) is
$$\mathcal V=\big\{V_Q=m^{\mathsf T}Qm:\ Q=Q^{\mathsf T}\succeq0,\ \|Q\|_F\le B_Q\big\},$$
where $\|Q\|_F=\sqrt{\sum_{ij}Q_{ij}^2}$ is the Frobenius norm and $Q\succeq0$ means positive semidefinite ($u^{\mathsf T}Qu\ge0$ for all $u$). On the common reachable set $S$ of Assumption 4.1 ([[certificate-classes]]) write
$$B_m=\sup_{x\in S}\|m(x)\|,\qquad B_{Dm}=\sup_{x\in S}\|Dm(x)\|,$$
the second in the operator norm $\|M\|=\max_{\|u\|=1}\|Mu\|$.

Three features of the class matter below.

- **Positivity is built in.** $V_Q(x)=m(x)^{\mathsf T}Qm(x)\ge0$ because $Q\succeq0$. (Positive *definiteness* and $V(0)=0$ need more; see the exercises.)
- **A zero-residual member.** $Q=0$ gives $V\equiv0$, whose Lyapunov residual is $\rho(0)=0$ at every state. This is the member that [[boffi-thm-4-2]] adds as a hypothesis; here it is automatically present.
- **The entry count.** List the free entries as $\theta=(Q_{11},\dots,Q_{dd},\sqrt2\,Q_{12},\dots)$, with the off-diagonal entries scaled by $\sqrt2$, so that $\|\theta\|=\|Q\|_F$. Then $V_Q$ is linear in $\theta\in\mathbb R^k$ with $k=d(d+1)/2$ and $\|\theta\|\le B_Q$, an instance of the class of [[boffi-thm-4-2]] (the condition $Q\succeq0$ only removes members, which can only lower the complexity).

### Statement {#statement}

::: theorem {#thm-43} Boffi et al., arXiv:2008.05952v2, Theorem 4.3, equation (4.4), p.7 (as printed)
Under Assumption 4.1, if problem (3.2) over the class (4.3) is feasible, then any solution $\widehat V_n$ satisfies, with probability at least $1-\delta$ over $\xi_1,\dots,\xi_n$,
$$\begin{aligned}\operatorname{err}(\widehat V_n)\le O(1)\Bigg(&B_Q^2(B_m^2+B_{Dm}B_m)^2L_h^2\\&\cdot\frac{d\log^2d\,\log^3n}{\gamma^2n}\\&+\frac{\log\big(\log(B_h/\gamma)/\delta\big)}n\Bigg).\end{aligned} \label{bound}$$
:::

Here $L_h$, $B_h$, $\gamma$ and $\delta$ are as in [[boffi-lemma-4-1]], and $O(1)$ stands for an unspecified universal constant. Four remarks on the printed form:

- **The Lipschitz factor.** The proof (Appendix B.2, p.19) derives $B_m^2+2B_{Dm}B_m$; the theorem prints $B_m^2+B_{Dm}B_m$. Since $B_m^2+2B_{Dm}B_m\le2(B_m^2+B_{Dm}B_m)$, the difference is absorbed into $O(1)$. Below we write $\Lambda=B_m^2+2B_{Dm}B_m$.
- **The confidence term.** The derivation produces Lemma 4.1's $2\log(\log(4B_h/\gamma)/\delta)/n$, not the printed $\log(\log(B_h/\gamma)/\delta)/n$; the two are not equivalent when $B_h/\gamma$ is small ([[boffi-lemma-4-1]]).
- **Small $d$.** $d\log^2d$ is $0$ for $d=1$ and $0.96$ for $d=2$, while the derivation below gives a positive bound of order $\sqrt d\,(1+\log d)$ for the integral. The printed form is an asymptotic statement for $d\ge3$, say; for small $d$ read $\log d$ as $1+\log d$.
- **Feasibility and the radius** are premises. Nothing in the theorem bounds the norm of a solver's output; see \ref{lab}.

### The proof route {#reasoning}

The chain is that of [[boffi-thm-4-2]], with one link replaced: instead of covering a ball of $k$ parameters in its own norm, cover the Frobenius ball of matrices in the operator norm.

**Step 1: an operator-norm Lipschitz bound.** For matrices $Q_1,Q_2$ and $\Delta=Q_1-Q_2$, at a point $x\in S$ with $m=m(x)$ and the feature Jacobian $Dm=Dm(x)$ (not the Jacobian of $f$):
$$\begin{aligned}|m^{\mathsf T}\Delta m|&\le\|\Delta\|\,\|m\|^2\le B_m^2\|\Delta\|,\\ \|Dm^{\mathsf T}(\Delta+\Delta^{\mathsf T})m\|&\le2B_{Dm}B_m\|\Delta\|.\end{aligned}$$
The first line is Cauchy–Schwarz and the definition of the operator norm; the second is the product rule for the gradient of $m^{\mathsf T}\Delta m$ and $\|\Delta^{\mathsf T}\|=\|\Delta\|$. Adding the two (as $\sqrt{a^2+b^2}\le a+b$) and maximizing over $S$:
$$\|V_{Q_1}-V_{Q_2}\|_{\mathcal V}\le\Lambda\,\|Q_1-Q_2\|. \label{lip}$$
This is the lemma of [[dual-sudakov]], where it is proved in full. Only the operator norm of the change appears: a change spread over many entries, such as $\epsilon I$, has Frobenius norm $\epsilon\sqrt d$ but operator norm $\epsilon$.

**Step 2: transfer the cover.** The parameter set lies in $B_Q\,\mathbb B_F$, where $\mathbb B_F$ is the Frobenius unit ball of **all** $d\times d$ matrices ($d^2$ dimensions; enlarging the set can only enlarge its covering numbers). By \ref{lip} and the Lipschitz-image rule of [[covering-properties]], an operator-norm cover of $\mathbb B_F$ at scale $u$ gives a $\|\cdot\|_{\mathcal V}$-cover of $\mathcal V$ at scale $B_Q\Lambda u$:
$$N(B_Q\Lambda u;\ \mathcal V,\|\cdot\|_{\mathcal V})\le N(u;\ \mathbb B_F,\|\cdot\|).$$
The matrix centers need not lie in the class. Moving them inside costs a factor $2$ in scale ([[covering-properties]]), which is the factor that turns Dudley's constant $24$ into $48$ ([[covering-dudley]]). Since $\|Q\|\le\|Q\|_F\le1$ on $\mathbb B_F$, the single center $0$ covers it at every scale $u\ge1$, so $\log N=0$ there.

**Step 3: two entropy regimes.** For $0<u\le1$:

- **Volume (counting entries).** A Frobenius cover is an operator-norm cover, and the volume bound in $d^2$ dimensions gives $\log N(u)\le d^2\log(1+2/u)$. It grows slowly as $u\to0$, like $\log(1/u)$, but carries the full count $d^2$.
- **Dual Sudakov (structure).** The dual Sudakov inequality, recalled in [[dual-sudakov]], bounds the entropy of a Euclidean ball in a weaker norm by $C(\mathbb E\|G\|/u)^2$, where $G$ is a matrix of independent standard normal entries. With $\mathbb E\|G\|\le2\sqrt d$ (also recalled there) this gives $\log N(u)\le cd/u^2$ with $c=4C$. It carries only $d$, but blows up like $1/u^2$.

Each is better in its own range. For $d=10$ and, purely for illustration, $c=1$, the two cross near $u\approx0.21$: at $u=0.5$ volume gives $161$ and Sudakov $40$; at $u=0.01$ volume gives $530$ and Sudakov $10^5$. The paper takes the minimum:
$$\log N(u;\mathbb B_F,\|\cdot\|)\le\min\Big\{d^2\log\Big(1+\frac2u\Big),\ \frac{cd}{u^2}\Big\}.$$

**Step 4: split the entropy integral.** Pick a split point $0<a\le1$ and use volume below it, Sudakov above it:
$$\int_0^1\!\sqrt{\log N(u)}\,du\le d\!\int_0^a\!\sqrt{\log(1+2/u)}\,du+\sqrt{cd}\log\frac1a.$$
For the first integral, $1+2/u\le3/u$ when $u\le1$. Writing $\Lambda_3(u)=\log(3/u)$ and integrating by parts, as in [[dual-sudakov]],
$$\int_0^a\sqrt{\Lambda_3(u)}\,du\le a\sqrt{\log(3/a)}+\frac a{2\sqrt{\log3}}.$$
The split must balance two costs: the volume part is about $d\,a$, so $a$ must be small; the Sudakov part grows like $\log(1/a)$, so $a$ must not be tiny. Taking $a=1/\sqrt d$ makes $d\,a=\sqrt d$ and $\log(1/a)=\tfrac12\log d$:
$$\begin{aligned}\int_0^1\!\sqrt{\log N(u)}\,du\le\sqrt d\Big(&\sqrt{\log(3\sqrt d)}+0.48\\&+\tfrac{\sqrt c}2\log d\Big).\end{aligned}$$
For $d\ge3$ every term in the bracket is at most a constant times $\log d$, so the integral is of order $\sqrt d\log d$. A constant split such as $a=\tfrac12$ would leave the volume part of order $d$; a split $a=1/d$ would give the same order as $1/\sqrt d$. Volume alone gives $d\int_0^1\sqrt{\log(1+2/u)}\,du=dI$ with $I\approx1.353$, of order $d$; Sudakov alone diverges at $u=0$.

**Step 5: Dudley from the zero member.** Chaining from $Q=0$, whose residual is identically zero, the worst-case Dudley bound of [[covering-dudley]] together with \ref{lip}, the residual Lipschitz bound of [[certificate-classes]] and the substitution $\epsilon=B_Q\Lambda u$ gives
$$\begin{aligned}\mathfrak R_n(\mathcal V)&\le\frac{48L_hB_Q\Lambda}{\sqrt n}\int_0^1\sqrt{\log N(u)}\,du\\&\le O(1)\,B_Q\Lambda L_h\sqrt{\frac dn}\,\log d.\end{aligned}$$
The paper writes $24$, as in its (B.1), and arrives at its (B.2); the constant is absorbed either way.

**Step 6: square and apply Lemma 4.1.** Squaring gives $\mathfrak R_n^2\le O(1)B_Q^2\Lambda^2L_h^2\,d\log^2d/n$. Substituting into [[boffi-lemma-4-1]] gives the first term of \ref{bound}, with the lemma's confidence term.

**Comparison with entry counting.** In the $\theta$ coordinates of \ref{class}, $\nabla_\theta g$ has length $\|m\|^2\le B_m^2$, and $\nabla_xV_Q=2Dm^{\mathsf T}Qm$ changes by at most $2B_{Dm}B_m\|\Delta Q\|_F$. So Theorem 4.2's factor $B_\theta(L_g+L_{\nabla g})$ is at most $B_Q\Lambda$, the same as here. The two bounds share their constants and differ only in the dimension factor: $k=d(d+1)/2$ for Theorem 4.2 against $d\log^2d$ for Theorem 4.3.

### Worked case: ten monomials {#example}

::: example {#ex-ten} Ten monomials in the plane
Take $p=2$ and all monomials of degree at most $3$:
$$m(x)=(1,\,x_1,\,x_2,\,x_1^2,\,x_1x_2,\,x_2^2,\,x_1^3,\,x_1^2x_2,\,x_1x_2^2,\,x_2^3),$$
so $d=10$.

*Dimension factors.* A symmetric $10\times10$ matrix has $k=55$ free entries, the factor Theorem 4.2 charges. Theorem 4.3 charges $d\log^2d=10\cdot(2.303)^2\approx53.0$. Its leading dimension is $10$, but at this size the logarithms eat the whole saving: $55$ against $53$.

*Constants.* On the unit disk ($B_S=1$), maximizing over a polar grid gives $B_m=2.00$ (at $x=(\pm1,0)$ or $(0,\pm1)$, where $\|m\|^2=1+1+1+1$) and $B_{Dm}\approx3.74$, so $\Lambda=B_m^2+2B_{Dm}B_m\approx19.0$ (the printed factor $B_m^2+B_{Dm}B_m$ is $11.5$). On the disk of radius $2$: $B_m\approx9.22$, $B_{Dm}\approx12.69$, $\Lambda\approx319$. Cubic features make the constants grow quickly with the reachable radius.

*The entropy integral, with $c=1$ for illustration.* Split at $a=1/\sqrt{10}\approx0.316$: the volume part is $5.34$ and the Sudakov part $\sqrt{10}\log\sqrt{10}\approx3.64$, total $8.98$. The best split, near $a\approx0.21$, gives $8.72$, which is also the integral of the minimum itself. Volume alone over $d^2=100$ dimensions gives $10I\approx13.5$; Theorem 4.2's volume count over $k=55$ dimensions gives $\sqrt{55}\,I\approx10.0$. So at $d=10$ the structured bound improves the integral only modestly, and only if $c$ is near $1$, which the source does not say.
:::

The saving grows with $d$. With the logarithms kept, [[dual-sudakov]] computes $k$ against $d\log^2d$: $5050$ against $2121$ at $d=100$, and $500{,}500$ against $47{,}717$ at $d=1000$. Among $d\ge3$, the ratio $(d+1)/(2\log^2d)$ first reaches $2$ at $d=73$. (At $d=2$ it is $3.12$, but only because $\log^22<1$ makes the printed factor degenerate.) Structure pays for large dictionaries, not for the small examples of this atlas.

### The radius is a premise: the Lab is outside {#lab}

The class has a radius $B_Q$, fixed before the data, and the theorem bounds solutions **within** that class. The atlas Lab fits $V(x)=x^{\mathsf T}Px$ (here $m(x)=x$, $d=2$) with the constraint $P\succeq I$ and no upper bound on $P$. Its optimizer therefore supplies no radius. For the default demo (seed 1, $n=4$) the fitted matrix has $\|P\|_F\approx1.72$, but setting $B_Q=1.72$ **after** seeing that fit is choosing the class from the data, which [[boffi-lemma-4-1]] does not allow.

Two honest repairs exist. Fix $B_Q$ in advance and add $\|P\|_F\le B_Q$ to the fitting problem; feasibility may then fail, and that failure is informative. Or apply the bound on a fixed grid of radii $B_Q=2^j$ with confidence levels $\delta_j$ that sum to $\delta$, paying a slightly larger confidence term ([[margin-bounds]]). Note also that $P\succeq I$ forces $\|P\|_F\ge\|I\|_F=\sqrt d$, so a radius below $\sqrt d$ makes the Lab's constraint set empty. Finally, the Lab's relative margin is not the fixed $\gamma$ of (3.2) ([[learning-certificates]]), and its contraction-metric fit uses a different class, $M(x)=I+B(x)^{\mathsf T}QB(x)$, to which Theorem 4.3 does not refer.

### When the argument fails {#failure}

- **Sudakov alone.** $\int_0^1\sqrt{cd}/u\,du$ diverges at $0$; the volume estimate must take over at small scales.
- **The wrong norm.** If the certificate were only Lipschitz in the Frobenius norm, dual Sudakov would use $\mathbb E\|G\|_F\approx d$ and give $Cd^2/u^2$: no gain. The improvement lives in the operator-norm bound \ref{lip}.
- **Small dictionaries.** For $6\le d\le10$ the two dimension factors are within $10\%$ of each other. For $d=3$ to $5$ the printed factor $d\log^2d$ is $14$ to $40\%$ smaller than $k$ ($3.6$ against $6$ at $d=3$). That apparent gain is too small to matter beside the unknown constants. At $d=1,2$ the printed factor is degenerate.
- **No numerical sample size.** $O(1)$, $c$ and Lemma 4.1's constant are all unspecified. The comparison is of rates.

### Assumptions and scope {#assumptions}

- **Class (4.3):** $Q$ symmetric positive semidefinite with $\|Q\|_F\le B_Q$, $B_Q$ fixed before the data; $m$ smooth with $B_m$, $B_{Dm}$ finite on $S$.
- **Assumption 4.1**, independent initial states, a fixed margin $\gamma>0$ and feasibility of (3.2), as in [[boffi-lemma-4-1]].
- **The zero member** $Q=0$ is in the class, so Dudley's bound needs no extra term for the Lyapunov residual.
- **Recalled, not proved:** Lemma 4.1, the dual Sudakov inequality and $\mathbb E\|G\|\le2\sqrt d$ ([[dual-sudakov]]). **Derived:** \ref{lip}, the cover transfer, the split integral and the assembly.
- **Printed versus derived:** Lipschitz factor $2B_{Dm}B_m$ versus $B_{Dm}B_m$; confidence term with $4B_h$ and a factor $2$; $d\log^2d$ read for $d\ge3$.

### Exercises {#exercises}

::: question
For the six monomials $x_1^2,x_1x_2,x_2^2,x_1^4,x_1^2x_2^2,x_2^4$ (so $d=6$), compare the dimension factors of Theorems 4.2 and 4.3.
---
$k=6\cdot7/2=21$; $d\log^2d=6\cdot(1.792)^2\approx19.3$. They are essentially equal; the structured theorem gives no real saving at this size.
:::

::: question
In \ref{ex-ten} the first monomial is the constant $1$. Show that a member with $V_Q(0)=0$ must have the whole first row and column of $Q$ equal to zero. What does that mean for $d$?
---
At $x=0$ only the constant monomial is nonzero, so $V_Q(0)=Q_{11}$. If $Q\succeq0$ and $Q_{11}=0$, then for any $j$ and real $s$, the vector $u=e_1+se_j$ gives $0\le u^{\mathsf T}Qu=2sQ_{1j}+s^2Q_{jj}$; for this to hold for small $s$ of both signs, $Q_{1j}=0$. So the constant feature drops out and effectively $d=9$ ($k=45$, $d\log^2d\approx43.5$).
:::

::: question
In Step 4, what is the order of the integral bound if the split is placed at $a=1/d$ instead of $1/\sqrt d$?
---
The volume part is at most $d\cdot\frac1d\big(\sqrt{\log(3d)}+0.48\big)$, which is of order $\sqrt{\log d}$. The Sudakov part is $\sqrt{cd}\log d$. The total is still of order $\sqrt d\log d$, now dominated by the Sudakov part; the split at $1/\sqrt d$ balances the two parts better but does not change the order.
:::

::: question
A colleague fits the Lab's quadratic certificate, reads $\|P\|_F\approx1.72$, and applies Theorem 4.3 with $B_Q=1.72$. What premise is violated, and how can the radius be handled honestly?
---
The radius, and hence the class, was chosen after seeing the fit, so the class is not fixed before the data. Fix $B_Q$ in advance and constrain the fit to $\|P\|_F\le B_Q$, or use a pre-declared grid of radii with a union bound over confidence levels. (The Lab's relative margin is a further mismatch with the theorem's fixed $\gamma$.)
:::

### Where it is used {#uses}

[[certificates-in-practice]] uses Gram-matrix certificates of this form; [[boffi-thm-5-1]] turns any of the §4 violation bounds into a regional statement. Theorem 4.3 is an optional, sharper alternative to [[boffi-thm-4-2]] for this class.

## Card

### Statement {#statement}

For $V_Q=m^{\mathsf T}Qm$ with $Q=Q^{\mathsf T}\succeq0$, $\|Q\|_F\le B_Q$, $m:\mathbb R^p\to\mathbb R^d$, under Assumption 4.1 and feasibility of (3.2), with probability at least $1-\delta$,
$$\begin{aligned}\operatorname{err}(\widehat V_n)\le O(1)\Big(&B_Q^2(B_m^2+B_{Dm}B_m)^2L_h^2\\&\cdot\tfrac{d\log^2d\,\log^3n}{\gamma^2n}\\&+\tfrac1n\log\tfrac{\log(B_h/\gamma)}\delta\Big)\end{aligned}$$
(Boffi et al., v2, (4.4), as printed), with $B_m=\sup_S\|m\|$, $B_{Dm}=\sup_S\|Dm\|$. The proof gives the factor $B_m^2+2B_{Dm}B_m$ and Lemma 4.1's confidence term.

### Intuition and example {#intuition}

Counting entries charges $d(d+1)/2$ parameters. But $V_Q$ moves only by the operator norm of a change in $Q$, and the Frobenius ball is small in operator norm: a random matrix has Frobenius norm about $d$ and operator norm about $2\sqrt d$. Volume covers small scales, dual Sudakov moderate ones; splitting the entropy integral at $1/\sqrt d$ gives order $\sqrt d\log d$, squared $d\log^2d$. Ten cubic monomials: $55$ entries against $d\log^2d\approx53$, no real gain; $d=1000$: $500{,}500$ against $47{,}717$.

### Assumptions and domain {#assumptions}

- A positive semidefinite $Q$ with a Frobenius radius $B_Q$ fixed before the data; finite $B_m$, $B_{Dm}$ on $S$.
- Independent initial states, a fixed $\gamma$, and feasibility.
- Dual Sudakov and $\mathbb E\|G\|\le2\sqrt d$ are recalled, not proved.
- The Lab's $P\succeq I$ fit has no radius bound and a relative margin, so it is not an instance.

### Proof sketch {#proof}

1. $\|V_{Q_1}-V_{Q_2}\|_{\mathcal V}\le(B_m^2+2B_{Dm}B_m)\|Q_1-Q_2\|$ in operator norm.
2. Cover $B_Q$ times the Frobenius ball of all $d\times d$ matrices in operator norm; one center suffices at scale $1$.
3. $\log N(u)\le\min\{d^2\log(1+2/u),\ cd/u^2\}$ (volume; dual Sudakov with $\mathbb E\|G\|\le2\sqrt d$).
4. Split the integral at $u=1/\sqrt d$: order $\sqrt d\log d$.
5. Dudley chained from $Q=0$: $\mathfrak R_n\le O(1)B_Q(B_m^2+2B_{Dm}B_m)L_h\sqrt{d/n}\log d$ (the paper's (B.2)).
6. Square and apply Lemma 4.1.

Source status: located; no independent proof audit has been recorded.

### Where it is used {#uses}

[[certificates-in-practice]], [[boffi-thm-5-1]].
