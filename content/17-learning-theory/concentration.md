+++
summary = "Independence and bounded influence turn averages and sample-dependent functions into tail bounds."
prereqs = []
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Appendix B", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The question: how far can an average stray? {#question}

Toss a fair coin $100$ times and record the fraction of heads. It should be near $\tfrac12$, but how likely is it to be off by $0.2$ or more, that is, to show $30$ or fewer, or $70$ or more, heads? In learning, the same question asks how far the empirical risk of a hypothesis fixed in advance can be from its population risk ([[risk-erm]]). This station answers it with a bound that decreases **exponentially** in the number of independent examples, and then extends the answer from averages to more general functions of the sample.

**Notation.** $Z_1,\dots,Z_n$ are independent real random variables (knowing some of them does not change the probabilities of the others), with means $\mu_i=\mathbb E Z_i$. In this station each $Z_i$ is a real number. In learning it will be the loss value of one fixed hypothesis on the $i$-th example of [[risk-erm]], where the example itself is written $Z_i$; we keep the letter because the inequality is then applied to those loss values. Their average is $\bar Z=\frac1n\sum_iZ_i$, with mean $\bar\mu=\frac1n\sum_i\mu_i$. The **range** assumption is that each $Z_i$ lies in a known interval $[a,b]$ with probability one. A **tail bound** bounds a probability such as $\Pr(\bar Z-\bar\mu\ge\epsilon)$ for a deviation $\epsilon>0$. A failure probability is written $\delta\in(0,1)$, and $\log$ is the natural logarithm.

### Two elementary bounds {#elementary}

**Markov's inequality.** If $Y\ge0$ and $s>0$, then
$$\Pr(Y\ge s)\le\frac{\mathbb E Y}{s}. \label{markov}$$
*Proof.* Compare two random variables pointwise: $s\,\mathbf 1\{Y\ge s\}\le Y$, because the left side is $0$ when $Y<s$ and equals $s\le Y$ otherwise. Taking expectations, $s\Pr(Y\ge s)\le\mathbb EY$. Markov uses only the mean. For the number of heads $S$ in $100$ fair tosses, $\mathbb ES=50$ and it gives only $\Pr(S\ge70)\le50/70\approx0.71$.

**Variance and a product rule.** The **variance** of a random variable $Y$ is the mean squared distance from its mean, $\operatorname{Var}Y=\mathbb E(Y-\mathbb EY)^2$; its square root is the **standard deviation**, the typical size of a fluctuation. A fair coin coded $0/1$ has mean $\tfrac12$ and is always at distance $\tfrac12$ from it, so its variance is $\tfrac14$ and its standard deviation $\tfrac12$. For **independent** $X$ and $Y$, $\mathbb E[XY]=\mathbb EX\,\mathbb EY$; more generally the expectation of a product of independent variables is the product of their expectations.

**Chebyshev's inequality.** Apply \ref{markov} to $Y=(\bar Z-\bar\mu)^2$ and $s=\epsilon^2$:
$$\Pr(|\bar Z-\bar\mu|\ge\epsilon)\le\frac{\operatorname{Var}\bar Z}{\epsilon^2}.$$
For independent variables $\operatorname{Var}\bar Z=\frac1{n^2}\sum_i\operatorname{Var}Z_i$. Expand the square of $\sum_i(Z_i-\mu_i)$: every cross term $\mathbb E[(Z_i-\mu_i)(Z_j-\mu_j)]$ with $i\neq j$ factorizes into $\mathbb E[Z_i-\mu_i]\,\mathbb E[Z_j-\mu_j]=0$. A coin toss has variance $\tfrac14$, so for the fraction of heads Chebyshev gives $\frac{1/4}{100\cdot0.04}=\frac1{16}=0.0625$. This decreases like $1/n$. Shalev-Shwartz and Ben-David present both bounds in Appendix B.1–B.2 (2014, eqs. (B.3)–(B.4) and Lemma B.2, pp. 372–373 / PDF pp. 390–391).

### Hoeffding's inequality {#statement}

::: theorem {#thm-hoeffding} Hoeffding's inequality
Let $Z_1,\dots,Z_n$ be independent, with $Z_i\in[a,b]$ with probability one. For every $\epsilon>0$,
$$\begin{aligned}\Pr\big(\bar Z-\bar\mu\ge\epsilon\big)&\le\exp\Big(-\frac{2n\epsilon^2}{(b-a)^2}\Big),\\ \Pr\big(|\bar Z-\bar\mu|\ge\epsilon\big)&\le2\exp\Big(-\frac{2n\epsilon^2}{(b-a)^2}\Big).\end{aligned} \label{hoeffding}$$
:::

This is Lemma B.6 of Shalev-Shwartz and Ben-David (2014, Appendix B.4, p. 375 / PDF p. 393), stated there for identically distributed variables with a strict inequality; the proof below uses only independence, so the identical-distribution assumption is not needed. The same bound appears as Lemma 4.5 (p. 33 / PDF p. 51) where it is applied to losses.

**The coin.** With $n=100$, $\epsilon=0.2$ and range $[0,1]$, the two-sided bound is $2\exp(-2\cdot100\cdot0.04)=2e^{-8}\approx6.7\times10^{-4}$. Compare Chebyshev's $0.0625$ and Markov's $0.71$. The exact probability of $30$ or fewer, or $70$ or more, heads is about $7.9\times10^{-5}$, so Hoeffding is about $8.5$ times too large here but has the correct exponential shape.

The proof needs one fact about a single bounded variable, which we prove first.

::: lemma {#lem-hoeffding} Hoeffding's lemma
If $X\in[a,b]$ with probability one and $\mathbb EX=0$, then for every $\lambda>0$
$$\mathbb E\,e^{\lambda X}\le\exp\Big(\frac{\lambda^2(b-a)^2}{8}\Big).$$
:::

::: proof
If $a=b$ then $X=0$ and both sides equal $1$. Otherwise $a<b$, and $\mathbb EX=0$ forces $a\le0\le b$.

*Step 1: a chord lies above a convex curve.* The function $x\mapsto e^{\lambda x}$ is convex, so on $[a,b]$ it lies below the straight line through its endpoint values:
$$e^{\lambda x}\le\frac{b-x}{b-a}e^{\lambda a}+\frac{x-a}{b-a}e^{\lambda b}.$$
Take expectations and use $\mathbb EX=0$:
$$\mathbb E\,e^{\lambda X}\le\frac{b}{b-a}e^{\lambda a}-\frac{a}{b-a}e^{\lambda b}.$$

*Step 2: rewrite the right side as one exponential.* Put $u=\lambda(b-a)>0$ and $q=-a/(b-a)$, which lies in $[0,1]$ because $a\le0\le b$. Then $\lambda a=-qu$, $\frac b{b-a}=1-q$, and the right side equals $e^{-qu}(1-q+qe^u)=e^{L(u)}$ with
$$L(u)=-qu+\log\big(1-q+qe^u\big).$$

*Step 3: a second-order Taylor bound.* $L(0)=0$. Differentiating, $L'(u)=-q+r(u)$ where $r(u)=\frac{qe^u}{1-q+qe^u}\in[0,1]$, so $L'(0)=0$. Differentiating again, $L''(u)=r(u)\big(1-r(u)\big)\le\tfrac14$, since $s(1-s)\le\tfrac14$ for every real $s$. Taylor's theorem with remainder gives, for some $\tau$ between $0$ and $u$,
$$L(u)=L(0)+L'(0)u+\tfrac12L''(\tau)u^2\le\frac{u^2}8=\frac{\lambda^2(b-a)^2}8.$$
:::

This follows the proof of Lemma B.7 in Shalev-Shwartz and Ben-David (2014, p. 376 / PDF p. 394). As a check, a variable with $\Pr(X=3)=\tfrac14$ and $\Pr(X=-1)=\tfrac34$ has mean $0$ and range width $4$. At $\lambda=0.5$, $\mathbb Ee^{\lambda X}\approx1.575$, below $e^{0.5}\approx1.649$.

::: proof Proof of Hoeffding's inequality
Write $X_i=Z_i-\mu_i$. Each $X_i$ has mean $0$ and lies in the interval $[a-\mu_i,b-\mu_i]$, whose width is $b-a$. Fix $\lambda>0$.

*Step 1: exponentiate and apply Markov.* The map $y\mapsto e^{\lambda ny}$ is increasing, so $\bar Z-\bar\mu\ge\epsilon$ happens exactly when $e^{\lambda\sum_iX_i}\ge e^{\lambda n\epsilon}$. By \ref{markov},
$$\Pr(\bar Z-\bar\mu\ge\epsilon)\le e^{-\lambda n\epsilon}\,\mathbb E\,e^{\lambda\sum_iX_i}.$$

*Step 2: independence factorizes the exponential.* $e^{\lambda\sum_iX_i}=\prod_ie^{\lambda X_i}$, and the expectation of a product of independent variables is the product of expectations. By \ref{lem-hoeffding}, each factor is at most $e^{\lambda^2(b-a)^2/8}$. Hence
$$\Pr(\bar Z-\bar\mu\ge\epsilon)\le\exp\Big(-\lambda n\epsilon+\frac{n\lambda^2(b-a)^2}8\Big).$$

*Step 3: choose the best $\lambda$.* The exponent is a quadratic in $\lambda$; its derivative $-n\epsilon+n\lambda(b-a)^2/4$ vanishes at $\lambda=4\epsilon/(b-a)^2$. Substituting,
$$-\frac{4n\epsilon^2}{(b-a)^2}+\frac{2n\epsilon^2}{(b-a)^2}=-\frac{2n\epsilon^2}{(b-a)^2}.$$
This is the one-sided bound. For the coin, $\lambda=0.8$ and the exponent is $-8$.

*Step 4: the other side.* The variables $-Z_i$ lie in $[-b,-a]$, an interval of the same width, so the same argument bounds $\Pr(\bar Z-\bar\mu\le-\epsilon)$ by the same number. The two-sided event is the union of the two one-sided events, and the probability of a union is at most the sum of the probabilities. That gives the factor $2$.
:::

### Reading and inverting the bound {#reasoning}

**Confidence form.** Set the two-sided bound equal to $\delta$ and solve for $\epsilon$: with probability at least $1-\delta$,
$$|\bar Z-\bar\mu|\le(b-a)\sqrt{\frac{\log(2/\delta)}{2n}}. \label{hoeffding-delta}$$
For $n=100$, range $[0,1]$ and $\delta=0.05$, the radius is $\sqrt{\log40/200}\approx0.136$. Quadrupling $n$ halves it. Making $\delta$ ten times smaller adds only about $\log10\approx2.3$ inside the square root.

**Range matters.** The range enters squared. If losses lie in $[0,10]$ but are treated as lying in $[0,1]$, the bound is wrong. Used correctly, the coin calculation with range width $10$ gives $2\exp(-0.08)\approx1.85$, a vacuous probability bound, and \ref{hoeffding-delta} becomes $10\times0.136\approx1.36$. Rescaling the variables never helps: dividing by $10$ shrinks both $\epsilon$ and $b-a$ by the same factor.

**What it applies to.** \ref{hoeffding} controls *one* average of independent variables whose identity is fixed before sampling, such as the empirical risk $P_nf_\psi$ of a fixed hypothesis: apply it to the loss values of that hypothesis on the $n$ examples, which are independent with common mean $Pf_\psi$. It does not apply directly to the hypothesis chosen by ERM, whose loss values are not the same kind of fixed average ([[risk-erm]], [[uniform-convergence]]).

### Bounded differences: McDiarmid's inequality {#mcdiarmid}

Some quantities are not averages but still depend on many independent inputs, each only a little. The main example in learning is the uniform deviation over a class,
$$G(Z_1,\dots,Z_n)=\sup_{f\in F}\big(Pf-P_nf\big),$$
the worst gap between population and empirical means over all members of a loss class $F$ ([[uniform-convergence]]).

**Coordinate replacement.** Say $G$ has the **bounded-differences property** with constant $c$ if replacing any single input changes the value by at most $c$: for every $i$, all $z_1,\dots,z_n$ and every replacement $z_i'$,
$$|G(z_1,\dots,z_i,\dots,z_n)-G(z_1,\dots,z_i',\dots,z_n)|\le c.$$
For the average of $[a,b]$-valued variables, replacing one term changes the sum by at most $b-a$ and the average by at most $c=(b-a)/n$. For the uniform deviation with $[0,1]$-valued functions, replacing $Z_i$ changes each $P_nf$ by at most $\tfrac1n$, and so each $Pf-P_nf$ by at most $\tfrac1n$. A supremum then moves by at most the largest change of its members: if $|u_f-v_f|\le c$ for every $f$, then $u_f\le v_f+c\le\sup_gv_g+c$ for every $f$, hence $\sup_fu_f\le\sup_fv_f+c$, and symmetrically. So $G$ has constant $c=\tfrac1n$.

::: theorem {#thm-mcdiarmid} McDiarmid's inequality (equal constants)
Let $Z_1,\dots,Z_n$ be independent and let $G$ have the bounded-differences property with constant $c$. Then for every $\delta\in(0,1)$, with probability at least $1-\delta$,
$$|G(Z_1,\dots,Z_n)-\mathbb E\,G|\le c\sqrt{\frac{n\log(2/\delta)}2}.$$
:::

This is Lemma 26.4 of Shalev-Shwartz and Ben-David (2014, §26.1, p. 328 / PDF p. 346), which they state without proof; we recall it without proof as well. Its proof extends the exponential-moment argument above by revealing the inputs one at a time and applying a version of \ref{lem-hoeffding} at each step; independence makes each step's increment confined to an interval of width at most $c$. Many references state the inequality with a separate constant $c_i$ for each coordinate and $\sum_ic_i^2$ in place of $nc^2$. Only the equal-constant form is used in the atlas, and when the constants differ one may apply it with $c=\max_ic_i$.

**Consistency check.** For the average, $c=(b-a)/n$ and the theorem gives radius $(b-a)\sqrt{\log(2/\delta)/(2n)}$, exactly \ref{hoeffding-delta}. **For the uniform deviation**, $c=1/n$ gives: with probability at least $1-\delta$,
$$\sup_{f\in F}\big(Pf-P_nf\big)\le\mathbb E\sup_{f\in F}\big(Pf-P_nf\big)+\sqrt{\frac{\log(2/\delta)}{2n}}.$$
With $n=100$ and $\delta=0.05$ the fluctuation term is $0.136$. The random supremum is close to its own mean, so it remains to bound the mean. That is the job of random-sign complexity ([[rademacher-complexity]]), and this step is how Shalev-Shwartz and Ben-David pass from expectation to probability in Theorem 26.5 (2014, p. 328 / PDF p. 346).

**A non-example.** The largest of $n$ values, $G=\max_iZ_i$ with $Z_i\in[0,1]$, also has bounded differences, but with $c=1$, not $1/n$: one input can move the maximum all the way. The radius $\sqrt{n\log(2/\delta)/2}$ then grows with $n$ and says nothing. Concentration needs *each* input to have small influence.

### When independence fails {#assumptions}

Every step above that multiplies expectations, or that counts $n$ separate inputs, uses independence. Take the extreme case $Z_1=Z_2=\dots=Z_n$, one fair coin copied $n$ times. Then $\bar Z=Z_1$ is $0$ or $1$, and $\Pr(|\bar Z-\tfrac12|\ge0.2)=1$, whatever $n$ is. Hoeffding with $n=100$ would claim $6.7\times10^{-4}$. The copies carry the information of one toss, so the effective sample size is $1$.

This is the situation of time samples along one deterministic trajectory. Once the initial state is drawn, the whole trajectory is determined, so a trajectory recorded at $600$ times, as in the example of [[trajectories-as-samples]], gives $600$ functions of one random draw, not $600$ independent draws. Independent initial states give independent trajectories. Dependent data require different tools, which this atlas does not develop.

**Assumptions, collected.**

- Independence across the $n$ inputs. Identical distribution is not needed for \ref{hoeffding}.
- A deterministic range $[a,b]$ known in advance (Hoeffding), or a deterministic bounded-differences constant (McDiarmid). Unbounded variables need other inequalities.
- For learning, the function whose average or value is bounded must be fixed before the sample is drawn. A supremum over a fixed class is fixed in this sense; a hypothesis selected from the data is not.

### Practise the inequalities {#questions}

::: question
Losses lie in $[0,1]$. How many independent examples guarantee, by Hoeffding, that the empirical risk of a fixed hypothesis is within $0.05$ of its risk with probability at least $0.99$?
---
From \ref{hoeffding-delta} we need $\sqrt{\log(2/0.01)/(2n)}\le0.05$, that is $n\ge\log200/(2\cdot0.0025)=5.298/0.005\approx1059.7$, so $n=1060$ suffices.
:::

::: question
Let $G$ be the fraction of distinct values among $Z_1,\dots,Z_n$, where the $Z_i$ are independent and uniform on $\{1,\dots,10\}$. What bounded-differences constant does $G$ have, and what does McDiarmid give for $n=400$ and $\delta=0.05$?
---
Replacing one input removes at most one distinct value and adds at most one, so the number of distinct values changes by at most $1$ and the fraction by at most $c=1/n$. The radius is $\frac1n\sqrt{n\log40/2}=\sqrt{\log40/(2n)}=\sqrt{3.689/800}\approx0.068$. So $G$ is within about $0.068$ of its mean with probability at least $0.95$.
:::

### Where it is used {#uses}

[[finite-classes]] applies Hoeffding to every member of a finite class. [[uniform-convergence]] applies McDiarmid to the uniform deviation, and [[rademacher-properties]] proves that step within its high-probability bound; [[rademacher-complexity]] quotes the resulting textbook theorem.

## Card

### The idea {#idea}

For independent $Z_i\in[a,b]$ and $\bar Z=\frac1n\sum_iZ_i$:

$$\Pr(|\bar Z-\mathbb E\bar Z|\ge\epsilon)\le2\exp\Big(-\frac{2n\epsilon^2}{(b-a)^2}\Big).$$

Equivalently, with probability at least $1-\delta$, $|\bar Z-\mathbb E\bar Z|\le(b-a)\sqrt{\log(2/\delta)/(2n)}$.

### Intuition and example {#intuition}

Proof route: Markov on $e^{\lambda\sum_iX_i}$; independence factorizes it; Hoeffding's lemma bounds each factor by $e^{\lambda^2(b-a)^2/8}$; optimize at $\lambda=4\epsilon/(b-a)^2$; union of two sides. Fair coin, $n=100$, $\epsilon=0.2$: $2e^{-8}\approx6.7\times10^{-4}$ (Chebyshev: $0.0625$; exact: $7.9\times10^{-5}$).

McDiarmid (Shalev-Shwartz and Ben-David, Lemma 26.4): if replacing one input changes $G$ by at most $c$, then $|G-\mathbb EG|\le c\sqrt{n\log(2/\delta)/2}$ with probability at least $1-\delta$. The uniform deviation of a $[0,1]$-valued class has $c=1/n$.

### Assumptions and domain {#assumptions}

Independent inputs; deterministic range or coordinate influence; the averaged function fixed in advance. Copies of one draw, such as time samples of one trajectory, count once.

### Where it is used {#uses}

[[finite-classes]], [[uniform-convergence]], [[rademacher-properties]].
