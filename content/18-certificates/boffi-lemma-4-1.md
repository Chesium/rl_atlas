+++
summary = "Zero empirical margin violations turn squared trajectory complexity into a fast generalization bound."
prereqs = ["margin-bounds", "rademacher-complexity", "trajectories-as-samples", "certificate-classes"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Lemma 4.1, p.6", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question {#question}

A learner has solved the margin problem (3.2) of [[learning-certificates]]: its certificate $\widehat V_n$ has residual at most $-\gamma$ along all $n$ training trajectories. How likely is a fresh trajectory to violate the decrease condition?

Lemma 4.1 of Boffi et al. answers with an **interface**. One number describing the class goes in, its worst-case random-sign complexity $\mathfrak R_n(\mathcal V)$; a high-probability bound on the violation probability comes out, with that number **squared**. Every generalization theorem of the paper's §4 has the same shape: bound $\mathfrak R_n(\mathcal V)$ for a particular class, then apply Lemma 4.1. This lesson states the lemma exactly as printed, explains each premise and the conventions, and shows how to apply it. The lemma's proof is an external result that the paper adapts and does not reprove; the atlas does not prove it either.

### The objects, recalled {#objects}

From [[learning-certificates]] and [[certificate-classes]]:

- Initial states $\xi_1,\dots,\xi_n$ are drawn independently from a distribution $\mathcal D$ on a compact set $X\subset\mathbb R^p$; $n$ counts trajectories ([[trajectories-as-samples]]).
- The trajectory residual of a candidate $V$ is $h(\xi,V)=\sup_{t\in T}h\big(\phi_t(\xi),\dot\phi_t(\xi),V(\phi_t(\xi)),\nabla V(\phi_t(\xi))\big)$.
- Problem (3.2) asks for $V$ in a class $\mathcal V$ with $h(\xi_i,V)\le-\gamma$ for every $i$, with the class and the margin $\gamma>0$ fixed before the data. A solution $\widehat V_n$ has zero **empirical margin loss**: $\frac1n\sum_i\mathbf 1\{h(\xi_i,\widehat V_n)>-\gamma\}=0$.
- Its violation probability is $\operatorname{err}(\widehat V_n)=\Pr_{\xi\sim\mathcal D}\big(h(\xi,\widehat V_n)>0\big)$, over a fresh $\xi$ with $\widehat V_n$ held fixed.
- Assumption 4.1 gives a compact set $S$ containing every trajectory; Assumption 4.2 bounds values and gradients of all candidates on $S$ by $B_V$ and $B_{\nabla V}$; $B_h$ bounds $|h|$ on the resulting region.

**The complexity, in Boffi's convention.** The lemma uses
$$\mathfrak R_n(\mathcal V)=\sup_{\xi_1,\dots,\xi_n\in X}\ \mathbb E_\sigma\sup_{V\in\mathcal V}\frac1n\Big|\sum_{i=1}^n\sigma_i\,h(\xi_i,V)\Big|,$$
where $\sigma_1,\dots,\sigma_n$ are independent signs, each $\pm1$ with probability $\tfrac12$, and $\mathbb E_\sigma$ averages over them. (The paper writes $\varepsilon_i$ and calls this "the Rademacher complexity of the function class $\mathcal V$".) Compared with the signed empirical complexity of [[rademacher-complexity]], which fixes the observed sample first and then averages the supremum of the signed sum, three things change:

1. it is the complexity of the **residual functions** $\xi\mapsto h(\xi,V)$, not of the certificates themselves;
2. it takes the **absolute value** of the signed sum;
3. it takes the **worst sample** in $X$, not the observed one.

For the same residual class, taking the absolute value and then the worst sample can only increase complexity relative to the signed empirical convention. Replacing certificates by residual functions changes the class being measured and has no general monotonicity rule; the later lessons bound that change using regularity of $h$. The absolute value matters even for one function: a class whose only residual is the constant $b$ has signed complexity $0$ but $\mathfrak R_n=|b|\,\mathbb E|\sigma_1+\dots+\sigma_n|/n$, which is $|b|/2$ for $n=2$ and about $|b|\sqrt{2/(\pi n)}$ for large $n$ ([[rademacher-complexity]]).

### Statement {#statement}

::: lemma {#lem-41} Boffi et al., arXiv:2008.05952v2, Lemma 4.1, p.6 (recalled, not proved)
Fix $\delta\in(0,1)$. Assume Assumptions 4.1 and 4.2. Suppose problem (3.2) is feasible and let $\widehat V_n$ be a solution. With probability at least $1-\delta$ over $\xi_1,\dots,\xi_n$ drawn independently from $\mathcal D$,
$$\begin{aligned}&\Pr_{\xi\sim\mathcal D}\big(h(\xi,\widehat V_n)>0\big)\\&\quad\le K\Bigg(\frac{\log^3n}{\gamma^2}\,\mathfrak R_n(\mathcal V)^2\\&\qquad+\frac{2\log\big(\log(4B_h/\gamma)/\delta\big)}n\Bigg),\end{aligned} \label{lemma}$$
where $K$ is a universal constant and $\mathfrak R_n(\mathcal V)$ is the worst-case absolute complexity above.
:::

The factor $2$ and the argument $4B_h/\gamma$ are printed exactly so on p.6. Logarithms are natural. The paper does not give $K$.

**Well defined.** A solution has $h(\xi_i,\widehat V_n)\le-\gamma$, so $|h|\ge\gamma$ somewhere and $B_h\ge\gamma$. Then $\log(4B_h/\gamma)\ge\log4\approx1.39$, and since $\delta<1$ the confidence term is positive.

**Which solution.** A solver's choice among solutions depends on the data. The statement is useful only if it holds for every solution on the same event of probability $1-\delta$, and we read it that way; the general restatement in [[margin-bounds]] makes this explicit by bounding every member with zero margin errors.

**Provenance.** Boffi et al. say the lemma is adapted from Theorem 5 of Srebro, Sridharan and Tewari, "Smoothness, low-noise and fast rates" (NeurIPS 2010). The atlas has not checked that source, and neither Boffi et al. nor the atlas prove the lemma. [[margin-bounds]] states it for an abstract class of real functions with range bound $B$; that general form is the atlas's own reading of a statement the paper makes for certificate residuals only. Here we keep the paper's certificate form. The two agree under the substitutions listed in [[margin-bounds]]: example $\to$ initial state, member $\to$ trajectory residual, range bound $B\to B_h$.

### Why the complexity enters squared {#mechanism}

The lemma is a **fast-rate** statement: with $\mathfrak R_n$ of order $1/\sqrt n$ its leading term is of order $\log^3n/n$, not $1/\sqrt n$. [[margin-bounds]] develops the mechanism; in brief:

- **Zero errors on a finite class.** A fixed rule with violation probability $q$ survives $n$ independent checks with probability $(1-q)^n\le e^{-nq}$. A union bound over $N$ rules then gives error at most $\log(N/\delta)/n$ for every rule with no training errors ([[finite-classes]]).
- **Small risk means small variance.** A loss with values in $[0,1]$ and mean $q$ has variance at most $q$. Bounds that exploit this give a deviation of size $\sqrt{q\cdot A}$, with $A$ a complexity term of order $1/n$, and solving $q\le\sqrt{qA}+A$ gives $q$ of order $A$, linear in $A$ rather than $\sqrt A$.
- **The margin.** The ramp loss of [[margin-bounds]] changes by at most $1/\gamma$ per unit change of residual, so its complexity is at most $\mathfrak R_n/\gamma$; squared, that is $\mathfrak R_n^2/\gamma^2$.

The factor $\log^3n$ is the price of the localized argument in the cited theorem. This sketch explains the shape of \ref{lemma}; it is not its proof.

### Applying the interface {#reasoning}

The recipe has four steps:

1. Check the premises listed in \ref{premises}.
2. Bound $\mathfrak R_n(\mathcal V)$ for the class, in the worst-case absolute convention.
3. Square the bound and substitute it into \ref{lemma}.
4. Read the result as a rate, with $K$ unknown.

::: example {#ex-interface} A class with squared complexity $3C_{\mathcal V}/n$
Suppose a class satisfies $\mathfrak R_n(\mathcal V)^2\le3C_{\mathcal V}/n$, where $C_{\mathcal V}$ is a number that depends on the class, its region and its residual, but not on $n$. This is the shape a $3$-parameter class gives. (It is not the universal constant $C$ of [[boffi-thm-4-2]].) Substituting into \ref{lemma},
$$\begin{aligned}\operatorname{err}(\widehat V_n)\le K\Bigg(&\frac{3C_{\mathcal V}\log^3n}{\gamma^2n}\\&+\frac{2\log\big(\log(4B_h/\gamma)/\delta\big)}n\Bigg).\end{aligned}$$
The leading term is $3KC_{\mathcal V}\log^3n/(\gamma^2n)$.

*How it scales.* $\log^3n/n$ is $0.330$ at $n=1000$, $0.220$ at $n=2000$ and $0.143$ at $n=4000$. Doubling the number of trajectories multiplies the leading term by $0.666$, not $\tfrac12$, because $\log^3n$ also grows; quadrupling multiplies it by $0.433$. Halving $\gamma$ multiplies it by $4$.

*A concrete class.* [[boffi-thm-4-2]] shows that the quadratic class $x^{\mathsf T}P_\theta x$ of [[certificate-classes]] satisfies this with $C_{\mathcal V}=\big(24I\,B_\theta(L_g+L_{\nabla g})L_h\big)^2$, where $I=\int_0^1\sqrt{\log(1+2/u)}\,du\approx1.353$ is an entropy integral, provided the class contains a certificate with identically zero residual. Both the integral and that hypothesis are derived in the next station (Step 5 of [[boffi-thm-4-2]]); take them as given here. With the constants of [[certificate-classes]] ($B_S=2.03$, $B_\theta=2$, $\rho(v)=0.2v$ on the shared system), $B_\theta(L_g+L_{\nabla g})L_h\approx151$ and $C_{\mathcal V}\approx2.39\times10^7$. With $\gamma=0.1$ the leading term is $K\cdot7.2\times10^9\log^3n/n$.

*The confidence term.* There $B_h\le76.8$, so $B_h/\gamma\le768$, and with $\delta=0.05$ the numerator $2\log(\log(4B_h/\gamma)/\delta)$ is at most $10.2$. The confidence term is about $10.2K/n$, smaller than the leading term by a factor of order $10^9$.
:::

The numbers show what the lemma is for. It gives the dependence of the guarantee on $n$, $\gamma$ and the class; with $K$ unknown and $C_{\mathcal V}$ this large, it gives no usable sample size for this small system.

### The printed second term, and why the theorems differ {#confidence}

The confidence term is printed differently in the paper's results:

- Lemma 4.1 (p.6): $2\log\big(\log(4B_h/\gamma)/\delta\big)/n$;
- Theorems 4.2 and 4.3 (p.7): $\log\big(\log(B_h/\gamma)/\delta\big)/n$;
- Theorem 4.4 (p.7): $\log\big(\log(1+B_h/\gamma)/\delta\big)/n$.

The factor $2$ is a constant and can be absorbed into the theorems' $O(1)$. The change from $4B_h$ to $B_h$ is not a constant factor in general. With $B_h/\gamma=2$ and $\delta=0.05$, the lemma's numerator is $7.46$ and the theorems' is $2.63$. With $B_h/\gamma=1.5$ and $\delta=0.9$, the theorems' form is $\log(0.405/0.9)=-0.80$, a negative "bound"; with $B_h=\gamma$ it is undefined. When $B_h/\gamma$ is large the two differ by a bounded factor, since $\log(4x)/\log x\to1$. The atlas derives the lemma's form wherever it assembles a theorem ([[boffi-thm-4-2]]) and records the theorems' forms as printed. In all three the term is of order $1/n$ and does not drive the rate.

### Premises and where they enter {#premises}

- **Independent initial states from $\mathcal D$.** The lemma is a statement about i.i.d. examples, and its conclusion is about the same $\mathcal D$. Each trajectory is one example. Recording $600$ times along each of $20$ trajectories does not make $n=12{,}000$: plugging the wrong $n$ into $\log^3n/n$ would shrink that factor from $1.34$ to $0.069$, overstating the guarantee about twentyfold.
- **The class and the margin are fixed before the data.** The lemma bounds members of one class chosen in advance. A class enlarged or modified after seeing the trajectories, such as features added until the fit succeeds, is not that class. This is why [[boffi-thm-4-4]] draws its random features independently of the data.
- **Assumptions 4.1 and 4.2.** They make $B_h$ finite and the complexity a well-defined number ([[certificate-classes]]).
- **Feasibility of (3.2).** Zero empirical margin loss is the premise that buys the fast rate. It is a premise, not a conclusion; the lemma says nothing about whether an optimizer finds a solution, and for the Lyapunov residual it fails on trajectories that come near the equilibrium ([[learning-certificates]]).
- **The worst-case absolute complexity.** A bound on a smaller convention, such as the signed complexity of the observed sample, does not substitute for $\mathfrak R_n$.
- **What is not assumed.** The lemma does not need a member of the class with zero residual; that hypothesis enters later, when [[boffi-thm-4-2]] bounds $\mathfrak R_n$ by Dudley's integral, because the absolute convention charges even a single function.

### When the premises fail {#failure}

- **One margin error.** If even one training trajectory has $h(\xi_i,V)>-\gamma$, the lemma says nothing about $V$. A solver that reports a small average violation, or a largest residual slightly above $-\gamma$, has not met the premise.
- **A margin chosen after looking.** Taking $\gamma$ to be the largest margin the fitted certificate happens to achieve is data-dependent. [[margin-bounds]] describes the standard repair: a fixed grid of margins with failure probabilities summing to $\delta$.
- **A finite class.** The lemma is not sharp for small classes. For $N$ residual functions with values in $[-B,B]$, Massart's lemma ([[covering-dudley]]) gives $\mathfrak R_n\le B\sqrt{2\log(2N)/n}$. With $N=16$, $B=1$, $\gamma=0.1$ and $n=1000$, the leading term with $K=1$ is $228$, a vacuous bound, while the direct zero-error bound of [[finite-classes]], $\log(N/\delta)/n$ with $\delta=0.05$, is $0.0058$. The lemma earns its keep on infinite classes, where no union bound is available.

### Exercises {#exercises}

::: question
A class has $\mathfrak R_n(\mathcal V)^2\le50/n$. Take $\gamma=0.5$, $B_h=5$, $\delta=0.01$ and $n=10^4$, and set $K=1$ for illustration. Compute both terms of \ref{lemma}. Is the bound informative? At roughly what $n$ does the leading term fall below $0.05$?
---
$\log^3(10^4)\approx781.3$, so the leading term is $781.3\cdot0.005/0.25\approx15.6$, and the confidence term is $2\log(\log40/0.01)/10^4\approx0.0012$. The bound exceeds $1$ and says nothing. The leading term $50\log^3n/(0.25n)$ is $0.53$ at $n=10^6$ and $0.0125$ at $n=10^8$, so it crosses $0.05$ between those: it is about $0.084$ at $10^7$ and $0.048$ at $2\times10^7$, so the crossing is near $n\approx2\times10^7$. And $K$ is not $1$.
:::

::: question
Which premises of Lemma 4.1 fail in this protocol? A student records $30$ trajectories at $500$ times each, uses $n=15{,}000$, tries ten feature sets after seeing the data and keeps the one whose fit has the largest margin, and then sets $\gamma$ to that margin.
---
Three. The count is $n=30$ trajectories, not $15{,}000$. The class was chosen after seeing the data (unless the ten feature sets were fixed in advance, in which case a union bound at $\delta/10$ repairs it). And $\gamma$ was chosen from the fitted certificate rather than before the data.
:::

::: question
For $B_h/\gamma=1.5$ and $\delta=0.9$, evaluate the lemma's numerator $2\log(\log(4B_h/\gamma)/\delta)$ and the theorems' numerator $\log(\log(B_h/\gamma)/\delta)$. Which one can be derived from the lemma?
---
Lemma: $\log6\approx1.792$, $1.792/0.9\approx1.991$, and $2\log1.991\approx1.38$. Theorems: $\log1.5\approx0.405$, $0.405/0.9\approx0.450$, and $\log0.450\approx-0.80$, which is negative. Only the lemma's form follows from substituting a complexity bound into \ref{lemma}; the theorems' printed form is a rewriting that is not equivalent for small $B_h/\gamma$.
:::

::: question
A class contains only the constant residual $h(\xi,V)=-1$. What is $\mathfrak R_2(\mathcal V)$, and what is its signed complexity on any two points?
---
With two signs, $|\sigma_1+\sigma_2|$ is $2$ with probability $\tfrac12$ and $0$ otherwise, so $\mathfrak R_2=1\cdot\mathbb E|\sigma_1+\sigma_2|/2=\tfrac12$. The signed complexity is $\mathbb E_\sigma\frac12(-\sigma_1-\sigma_2)=0$. The absolute convention charges a single function, which is why Theorem 4.2's proof needs a zero-residual member or an extra term.
:::

### Where it is used {#uses}

[[boffi-thm-4-2]] bounds $\mathfrak R_n$ for smooth parametric classes; [[boffi-thm-4-3]] for structured matrix classes; [[boffi-thm-4-4]] for a random-feature approximation of a kernel class. Each then applies \ref{lemma}.

## Card

### Statement {#statement}

Fix $\delta\in(0,1)$. Under Assumptions 4.1–4.2, if (3.2) is feasible and $\widehat V_n$ is a solution, then with probability at least $1-\delta$ over $n$ independent initial states,
$$\begin{aligned}\operatorname{err}(\widehat V_n)\le K\Big(&\tfrac{\log^3n}{\gamma^2}\mathfrak R_n(\mathcal V)^2\\&+\tfrac2n\log\tfrac{\log(4B_h/\gamma)}\delta\Big),\end{aligned}$$
with $K$ universal and unspecified, and $\mathfrak R_n(\mathcal V)=\sup_{\xi_{1:n}\in X}\mathbb E_\sigma\sup_V\frac1n|\sum_i\sigma_ih(\xi_i,V)|$, the worst-case absolute complexity of the residual class (Boffi et al., v2, p.6, as printed).

### Intuition and example {#intuition}

Zero margin errors let a fast-rate theorem charge the square of the complexity: $\mathfrak R_n^2\le3C_{\mathcal V}/n$, for a class-dependent $C_{\mathcal V}$, gives leading term $3KC_{\mathcal V}\log^3n/(\gamma^2n)$. Doubling $n$ multiplies $\log^3n/n$ by about $0.67$ near $n=1000$; halving $\gamma$ quadruples the term. For the planar quadratic class with $B_S=2.03$, $B_\theta=2$, $\gamma=0.1$, the leading term is $K\cdot7.2\times10^9\log^3n/n$: a rate, not a sample size.

### Assumptions and domain {#assumptions}

- I.i.d. initial states; $n$ counts trajectories.
- Class and $\gamma>0$ fixed before the data.
- Assumptions 4.1–4.2, and feasibility (zero margin errors).
- The worst-case absolute convention; no zero-residual member is needed here.
- Theorems 4.2–4.3 print $\log(\log(B_h/\gamma)/\delta)/n$ and Theorem 4.4 $\log(\log(1+B_h/\gamma)/\delta)/n$; these are not equivalent to the lemma's term for small $B_h/\gamma$.

### Proof sketch {#proof}

Not proved in the atlas or in the paper. Boffi et al. adapt Theorem 5 of Srebro, Sridharan and Tewari (NeurIPS 2010), which the atlas has not checked. The mechanism: a $[0,1]$ loss with mean $q$ has variance at most $q$, so for a member with zero empirical loss the deviation term scales like $\sqrt q$, and solving for $q$ gives a bound linear in the squared complexity; the ramp loss turns the margin into a factor $1/\gamma$. Source status: located; no independent proof audit has been recorded.

### Where it is used {#uses}

[[boffi-thm-4-2]], [[boffi-thm-4-3]], [[boffi-thm-4-4]].
