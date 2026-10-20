+++
summary = "A Gaussian norm estimate can sharpen matrix-class entropy beyond counting every free entry."
prereqs = ["covering-properties"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Appendix B.2, p.19; cited Vershynin lectures", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### Counting entries is too pessimistic {#motivation}

*Reading note.* This optional station is best read after [[boffi-thm-4-2]]. It uses Part 18 objects (certificates, the reachable set $S$, the joint value-gradient norm $\lVert\cdot\rVert_{\mathcal V}$, the residual constants $L_h$ and $B_h$, the margin $\gamma$ and Lemma 4.1), all defined there. The covering estimates themselves need only [[covering-properties]].

Sum-of-squares certificates have the form
$$V_Q(x)=m(x)^{\mathsf T}Q\,m(x),$$
where $m:\mathbb R^p\to\mathbb R^d$ is a fixed vector of $d$ monomials in the state and $Q$ is a symmetric positive semidefinite $d\times d$ matrix. Boffi et al. (arXiv:2008.05952v2, equation (4.3), p. 7) use the class
$$\mathcal V=\bigl\{V_Q:\ Q=Q^{\mathsf T}\succeq0,\ \lVert Q\rVert_F\le B_Q\bigr\},$$
with the Frobenius norm $\lVert Q\rVert_F=\sqrt{\sum_{ij}Q_{ij}^2}$. With $m(x)=x$ and $d=p=2$ this is the three-parameter quadratic class of [[boffi-thm-4-2]].

A symmetric matrix has $d(d+1)/2$ free entries, and $V_Q$ depends linearly on them. So the class is an instance of the parametric class of Theorem 4.2 with $k=d(d+1)/2$, and Theorem 4.2 gives a violation bound of order $d^2/n$, up to logarithms. The paper's Theorem 4.3 improves this to order $d\log^2d/n$ (equation (4.4), p. 7):
$$\begin{aligned}\operatorname{err}(\widehat V_n)\le O(1)\Bigl(&B_Q^2(B_m^2+B_{Dm}B_m)^2L_h^2\,\frac{d\log^2d\,\log^3n}{\gamma^2n}\\&+\frac{\log(\log(B_h/\gamma)/\delta)}n\Bigr).\end{aligned}$$
Here $B_m=\sup_{x\in S}\lVert m(x)\rVert$ and $B_{Dm}=\sup_{x\in S}\lVert\partial m/\partial x(x)\rVert_{\mathrm{op}}$ bound the features and their Jacobian on the reachable set $S$, and $L_h$, $\gamma$, $B_h$ and $\delta$ are as in [[boffi-thm-4-2]]. This lesson explains where the improvement comes from. It is an optional branch: Theorem 4.2 does not need it.

**The idea in one sentence.** Covering numbers depend on the norm (by the volume bound of [[covering-properties]], a $k$-dimensional ball has entropy about $k\log(1/\epsilon)$ *in its own norm*); the matrix class is Lipschitz in the operator norm, which is much weaker than the Frobenius norm that defines its radius, and a ball measured in a weaker norm can be covered with far fewer centers.

### The class is Lipschitz in operator norm {#norm}

Recall the operator norm $\lVert\Delta\rVert_{\mathrm{op}}=\max_{\lVert u\rVert_2=1}\lVert\Delta u\rVert_2$, so $\lVert\Delta u\rVert_2\le\lVert\Delta\rVert_{\mathrm{op}}\lVert u\rVert_2$, and $\lVert\Delta\rVert_{\mathrm{op}}\le\lVert\Delta\rVert_F$ ([[covering-properties]]). Certificates are compared in the joint value-and-gradient norm $\lVert V\rVert_{\mathcal V}=\sup_{x\in S}\lVert(V(x),\nabla V(x))\rVert$ of [[certificate-classes]].

::: lemma {#lem-op} Operator-norm Lipschitz bound
For $d\times d$ matrices $Q_1,Q_2$,
$$\lVert V_{Q_1}-V_{Q_2}\rVert_{\mathcal V}\le\bigl(B_m^2+2B_{Dm}B_m\bigr)\lVert Q_1-Q_2\rVert_{\mathrm{op}}.$$
:::

The paper states this on p. 19 as "a simple calculation".

::: proof
Let $\Delta=Q_1-Q_2$ and fix $x\in S$. Write $m=m(x)$ and $J=\partial m/\partial x(x)$, a $d\times p$ matrix.

*Values.* $|m^{\mathsf T}\Delta m|\le\lVert m\rVert_2\,\lVert\Delta m\rVert_2\le\lVert\Delta\rVert_{\mathrm{op}}\lVert m\rVert_2^2\le B_m^2\lVert\Delta\rVert_{\mathrm{op}}$, by Cauchy–Schwarz and the definition of the operator norm.

*Gradients.* By the product rule, $\nabla_x(m^{\mathsf T}\Delta m)=J^{\mathsf T}(\Delta+\Delta^{\mathsf T})m$, which is $2J^{\mathsf T}\Delta m$ when $\Delta$ is symmetric. Since $\lVert\Delta^{\mathsf T}\rVert_{\mathrm{op}}=\lVert\Delta\rVert_{\mathrm{op}}$, its length is at most $\lVert J\rVert_{\mathrm{op}}\cdot2\lVert\Delta\rVert_{\mathrm{op}}\cdot\lVert m\rVert_2\le2B_{Dm}B_m\lVert\Delta\rVert_{\mathrm{op}}$.

*Together.* $\sqrt{a^2+b^2}\le a+b$ for $a,b\ge0$; take the supremum over $x\in S$.
:::

Only $\lVert\Delta\rVert_{\mathrm{op}}$ appears. A perturbation spread over many entries, such as a small multiple of the identity, has a large Frobenius norm compared with its operator norm, yet changes the certificate only as much as its operator norm allows. The class does not "see" each entry separately.

**From certificates to matrices.** By rule 2 of [[covering-properties]] (a Lipschitz image), a cover of the parameter set at scale $\epsilon/(B_m^2+2B_{Dm}B_m)$ in operator norm gives a cover of $\mathcal V$ at scale $\epsilon$. The parameter set lies inside $B_Q$ times the ball
$$\mathbb B_F=\bigl\{Q\in\mathbb R^{d\times d}:\lVert Q\rVert_F\le1\bigr\}$$
of *all* $d\times d$ matrices, the set the paper writes $\mathbb B_2^{d\times d}(1)$. External covers are monotone under subsets, so it suffices to cover $\mathbb B_F$ in the operator norm. (The bound in \ref{lem-op} holds for nonsymmetric differences too, so external matrix centers are allowed for covering $\mathcal V$ itself. The residual step below, however, uses $L_h$ at each center, which is defined only for certificates within the class's bounds; so the residual cover uses internal centers, at the cost of a factor $2$ in scale ([[covering-properties]]), or $L_h$ on a set enlarged by one cover radius. Either cost is a constant factor.) Note that the paper's ball has $d^2$ dimensions, not $d(d+1)/2$; enlarging the set only enlarges its covering numbers, so the final bound is still valid for the symmetric class.

### Two entropy estimates {#statement}

**Volume.** Every Frobenius $\epsilon$-cover is an operator-norm $\epsilon$-cover, because $\lVert\cdot\rVert_{\mathrm{op}}\le\lVert\cdot\rVert_F$. Viewing a matrix as a vector of $d^2$ entries, the Frobenius norm is the Euclidean norm, and the volume bound of [[covering-properties]] gives
$$\log N(\epsilon;\mathbb B_F,\lVert\cdot\rVert_{\mathrm{op}})\le d^2\log(1+2/\epsilon). \label{vol}$$
This is the count of entries again. It is good at small scales, where the logarithm grows slowly.

**Dual Sudakov.** The second estimate compares a weaker norm with a Gaussian average.

::: theorem {#thm-dual-sudakov} Dual Sudakov inequality (recalled)
There is an absolute constant $C$ such that for every dimension $D$, every norm $\lVert\cdot\rVert$ on $\mathbb R^D$ and every $\epsilon>0$,
$$\log N\bigl(\epsilon;\ \mathbb B_2^D,\ \lVert\cdot\rVert\bigr)\le C\Bigl(\frac{\mathbb E\lVert g\rVert}{\epsilon}\Bigr)^2,$$
where $\mathbb B_2^D$ is the Euclidean unit ball and $g$ is a standard Gaussian vector in $\mathbb R^D$ (independent entries with mean $0$ and variance $1$).
:::

Boffi et al. invoke it as Theorem 2.2 of R. Vershynin, *Lectures in Geometric Functional Analysis* (2019), their reference [50], on p. 19. Those lectures are not available locally, so the statement and its normalization (Euclidean unit ball, standard Gaussian, entropy with the natural logarithm) are recalled here, not checked; the value of $C$ is not used. Its proof is an optional extension and is not developed in the atlas.

**Applying it to matrices.** Take $D=d^2$, identify $d\times d$ matrices with vectors of entries (so $\mathbb B_2^D=\mathbb B_F$), and take the operator norm as $\lVert\cdot\rVert$. The Gaussian vector is then a $d\times d$ matrix $G$ with independent standard normal entries. A standard bound for its operator norm, recalled without proof (it follows from Gordon's comparison inequality), is $\mathbb E\lVert G\rVert_{\mathrm{op}}\le2\sqrt d$. Hence
$$\log N(\epsilon;\mathbb B_F,\lVert\cdot\rVert_{\mathrm{op}})\le\frac{4Cd}{\epsilon^2}=\frac{cd}{\epsilon^2}, \label{sudakov}$$
with $c=4C$, which is the paper's estimate. A seeded Monte Carlo illustration gives $\mathbb E\lVert G\rVert_{\mathrm{op}}\approx5.637\pm0.002$ for $d=10$ ($10^5$ draws) and $19.594\pm0.006$ for $d=100$ ($4000$ draws), with one standard error, below $2\sqrt d=6.32$ and $20$.

**Why the weaker norm helps.** The same theorem with the Frobenius norm itself would use $\mathbb E\lVert G\rVert_F\approx d$, giving $Cd^2/\epsilon^2$, no better than counting entries. The gain comes entirely from $\mathbb E\lVert G\rVert_{\mathrm{op}}\approx2\sqrt d$ being much smaller than $\mathbb E\lVert G\rVert_F\approx d$: a random matrix stretches no single direction by much, although its entries add up to a large Frobenius norm.

The paper combines both:
$$\log N(\epsilon;\mathbb B_F,\lVert\cdot\rVert_{\mathrm{op}})\le\min\Bigl\{d^2\log\Bigl(1+\frac2\epsilon\Bigr),\ \frac{cd}{\epsilon^2}\Bigr\}.$$
The volume estimate is smaller at small $\epsilon$, the Sudakov estimate at moderate $\epsilon$.

### The entropy integral {#reasoning}

Since $\lVert Q\rVert_{\mathrm{op}}\le\lVert Q\rVert_F\le1$ on $\mathbb B_F$, the center $0$ covers it at every scale $\epsilon\ge1$, so $\log N=0$ there and the integral stops at $1$. Split it at $a=1/\sqrt d$ and use \ref{vol} below $a$ and \ref{sudakov} above it.

*Small scales.* For $\epsilon\le1$, $1+2/\epsilon\le3/\epsilon$. Let $\Lambda(\epsilon)=\log(3/\epsilon)$. The derivative of $\epsilon\sqrt{\Lambda(\epsilon)}$ is $\sqrt{\Lambda}-1/(2\sqrt\Lambda)$, so
$$\int_0^a\sqrt{\Lambda}\,d\epsilon=a\sqrt{\Lambda(a)}+\int_0^a\frac{d\epsilon}{2\sqrt{\Lambda(\epsilon)}}\le a\sqrt{\log(3/a)}+\frac a{2\sqrt{\log3}},$$
because $\Lambda(\epsilon)\ge\Lambda(1)=\log3$ on $(0,1]$. Multiplying by $d$ (from $\sqrt{d^2}$) and using $da=\sqrt d$, this part is at most $\sqrt d\bigl(\sqrt{\log(3\sqrt d)}+0.48\bigr)$.

*Moderate scales.*
$$\int_a^1\frac{\sqrt{cd}}\epsilon\,d\epsilon=\sqrt{cd}\,\log\frac1a=\frac{\sqrt c}2\sqrt d\,\log d.$$

*Together.*
$$\begin{aligned}\int_0^1\sqrt{\log N(\epsilon)}\,d\epsilon\le\sqrt d\Bigl(&\sqrt{\log(3\sqrt d)}+0.48\\&+\tfrac{\sqrt c}2\log d\Bigr).\end{aligned}$$
For $d\ge3$ every term in the bracket is at most a constant times $\log d$, so the integral is of order $\sqrt d\log d$. The volume estimate alone would give $d\int_0^1\sqrt{\log(1+2/\epsilon)}\,d\epsilon=dI$ with $I\approx1.35$, of order $d$.

**Assembling the complexity.** Apply the worst-case Dudley bound of [[covering-dudley]] (§"Absolute values and the worst sample") to the residual class. The class contains $Q=0$, the certificate $V\equiv0$. For the Lyapunov residual its value is $\rho(0)$, which is $0$ because the rate function satisfies $\rho(0)=0$; so this member has zero residual along every trajectory, and the reference term vanishes. Chaining the Lipschitz steps (residual $L_h$, \ref{lem-op}, the radius $B_Q$) and substituting scales as in [[boffi-thm-4-2]],
$$\begin{aligned}\mathfrak R_n(\mathcal V)&\le\frac{24L_hB_Q(B_m^2+2B_{Dm}B_m)}{\sqrt n}\int_0^1\sqrt{\log N(u)}\,du\\&\le O(1)\,B_Q(B_m^2+B_{Dm}B_m)L_h\sqrt{\frac dn}\,\log d,\end{aligned}$$
which is the paper's (B.2). The constant $24$ in the first line assumes covers centered in the class, as in [[covering-dudley]]; with matrix centers outside it, the scale factor $2$ of the previous paragraph doubles it. That factor, and the $2$ in $B_m^2+2B_{Dm}B_m$, are absorbed into $O(1)$. Lemma 4.1 charges $\mathfrak R_n^2$, giving $d\log^2d/n$ times $\log^3n/\gamma^2$, the first term of (4.4). For a residual without a zero member, the extra $B_h/\sqrt n$ of [[covering-dudley]] applies here as well.

### Comparing the two rates {#examples}

Theorem 4.2 charges the parameter count $k=d(d+1)/2$; Theorem 4.3 charges $d\log^2d$. Keeping the logarithms, and remembering that both theorems hide unknown constants:

- $d=2$: $k=3$ versus $d\log^2d\approx0.96$. Here $\log2<1$ and the comparison is meaningless; constants dominate.
- $d=10$: $k=55$ versus $53.0$. Essentially equal.
- $d=30$: $k=465$ versus $347$.
- $d=100$: $k=5050$ versus $2121$, a ratio of $2.4$.
- $d=1000$: $k=500500$ versus $47717$, a ratio of $10.5$.

The ratio $k/(d\log^2d)=(d+1)/(2\log^2d)$ is smallest near $d=9$ (about $1.04$) and first reaches $2$ at $d=73$. The structural improvement is real but asymptotic: it matters for large monomial dictionaries, not for the small quadratic examples of the atlas.

The integrals behave the same way. With the unknown constant set to $c=1$ purely for illustration, the minimum-of-two integral is $8.7$, $40.7$ and $169$ for $d=10$, $100$ and $1000$, against $dI=13.5$, $135$ and $1353$ for the volume estimate alone. These numbers illustrate shapes; with the true $c$ they would change.

### When it fails {#failure}

- **Sudakov alone diverges.** $\int_0^1\sqrt{cd}/\epsilon\,d\epsilon$ is infinite because of the $1/\epsilon$ near zero. The volume estimate must take over at small scales; that is why the paper takes the minimum.
- **The wrong norm gives nothing.** If the Lipschitz bound were only available in Frobenius norm, dual Sudakov would give $Cd^2/\epsilon^2$ and no improvement. The structure is the operator-norm bound of \ref{lem-op}.
- **No numerical sample size.** Both theorems carry unspecified constants ($O(1)$, $c$, the constant of Lemma 4.1). The comparison above is of rates, not of usable bounds.

### Assumptions and domain {#assumptions}

- The class is (4.3): $V_Q=m^{\mathsf T}Qm$ with $Q$ symmetric positive semidefinite and $\lVert Q\rVert_F\le B_Q$; $m$ is smooth with $B_m$, $B_{Dm}$ finite on the reachable set $S$ (Assumption 4.1).
- Norms: radius in Frobenius norm; Lipschitz modulus in operator norm; covering of the full $d^2$-dimensional Frobenius ball.
- Recalled, not proved: the dual Sudakov inequality (Vershynin 2019, Theorem 2.2, as cited) and $\mathbb E\lVert G\rVert_{\mathrm{op}}\le2\sqrt d$. Derived here: \ref{lem-op}, the entropy integral and its split.
- Dudley in the worst-case absolute convention needs the zero member $Q=0$ with zero residual, or the extra $B_h/\sqrt n$ term.

### Exercises {#exercises}

::: question
**The quadratic case.** For $m(x)=x$ with $p=d=2$, find $B_m$ and $B_{Dm}$ on a disk of radius $B_S$, and the Lipschitz factor of \ref{lem-op}. Evaluate it for $B_S=2.03$.
---
$m(x)=x$, so $B_m=B_S$, and $J=I$, so $B_{Dm}=1$. The factor is $B_S^2+2B_S$; for $B_S=2.03$ it is $4.12+4.06\approx8.18$.
:::

::: question
**Which estimate where?** For $d=100$ and $c=1$, at which scale $\epsilon$ do $d^2\log(1+2/\epsilon)$ and $cd/\epsilon^2$ cross, roughly? Which estimate should be used at $\epsilon=0.01$ and which at $\epsilon=0.5$?
---
At $\epsilon=0.5$: volume $10^4\log5\approx1.6\times10^4$, Sudakov $100/0.25=400$; Sudakov is smaller. At $\epsilon=0.01$: volume $10^4\log201\approx5.3\times10^4$, Sudakov $100/10^{-4}=10^6$; volume is smaller. They cross where $100\,\epsilon^2\log(1+2/\epsilon)=1$: at $0.05$ the left side is $0.93$ and at $0.055$ it is $1.10$, so the crossing is near $\epsilon\approx0.052$. The split at $1/\sqrt d=0.1$ used in the proof is not the crossing, but any split gives a valid bound.
:::

::: question
**When does structure pay?** Using the ratio $(d+1)/(2\log^2d)$, decide whether the improvement from Theorem 4.3 is worth a factor of two for $d=10$, $d=50$ and $d=100$.
---
The ratios are $1.04$, $1.67$ and $2.38$. Only $d=100$ gains more than a factor of two (the threshold is $d=73$), and these ratios ignore the theorems' unknown constants.
:::

### Where it is used {#uses}

[[boffi-thm-4-3]] combines \ref{lem-op}, the two entropy estimates and the integral with Lemma 4.1.

## Card

### The idea {#idea}

The SOS class $V_Q=m^{\mathsf T}Qm$, $\lVert Q\rVert_F\le B_Q$, is Lipschitz in operator norm with factor $B_m^2+2B_{Dm}B_m$. Covering the Frobenius ball in operator norm costs $\log N\le\min\{d^2\log(1+2/\epsilon),\,cd/\epsilon^2\}$, the second from dual Sudakov: $\log N(\epsilon;\mathbb B_2^D,\lVert\cdot\rVert)\le C(\mathbb E\lVert g\rVert/\epsilon)^2$ with $\mathbb E\lVert G\rVert_{\mathrm{op}}\le2\sqrt d$ (both recalled).

### Intuition and example {#intuition}

A random $d\times d$ matrix has Frobenius norm about $d$ but operator norm only about $2\sqrt d$, so the Frobenius ball is "small" in operator norm. The entropy integral drops from order $d$ to order $\sqrt d\log d$, and the violation rate from $d^2/n$ to $d\log^2d/n$ (times $\log^3n/\gamma^2$). Keeping logs: $d=10$ gives $55$ versus $53$ (no gain); $d=1000$ gives $500500$ versus $47717$.

### Assumptions and domain {#assumptions}

Exact norms: radius in Frobenius, Lipschitz modulus and covers in operator norm, over all $d\times d$ matrices. Dual Sudakov and the Gaussian operator-norm bound are recalled from the cited Vershynin lectures, with the unit Euclidean ball and standard Gaussian normalization. Optional for Theorem 4.2.

### Where it is used {#uses}

[[boffi-thm-4-3]].
