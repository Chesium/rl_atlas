+++
summary = "Approximate a function class at many scales, then integrate its metric entropy to bound complexity."
prereqs = ["rademacher-complexity"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 27", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }, { text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Appendix B, pp.18–19; p.6", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### When the class is not a linear ball {#motivation}

[[rademacher-complexity]] computed the random-sign complexity of a linear ball exactly, using the fact that a supremum of inner products over a ball has a closed form. Most classes in the certificate chapters have no such formula. A trajectory residual is a maximum over time of functions of the parameters, and a general smooth parametrization is not linear at all. This lesson develops the tool that replaces the closed form: approximate the class by finitely many functions, first at one resolution and then at many.

We recall the objects of [[rademacher-complexity]] that are used here.

**Sample and class.** $z_1,\dots,z_n$ are fixed points of a set $\mathcal Z$ (the observed sample, held fixed throughout this lesson), and $F$ is a set of real functions on $\mathcal Z$.

**Value set.** Only the values on the sample matter, so we work with the set of vectors

$$A=\bigl\{(f(z_1),\dots,f(z_n)):f\in F\bigr\}\subset\mathbb R^n.$$

We write $a$ for a vector of $A$ and $a_i$ for its $i$th entry.

**Signs.** $\sigma_1,\dots,\sigma_n$ are independent fair $\pm1$ signs, and for any vector $a\in\mathbb R^n$ we abbreviate the sign-weighted average as

$$S_\sigma(a)=\frac1n\sum_{i=1}^n\sigma_ia_i.$$

**Signed empirical complexity.** With the sample fixed first, the signs drawn second and the supremum taken third,

$$\widehat{\mathfrak R}_n(F;z_{1:n})=\mathbb E_\sigma\Bigl[\,\sup_{a\in A}S_\sigma(a)\Bigr].$$

The *absolute* version $\widehat{\mathfrak R}^{\,|\cdot|}_n$ puts $|S_\sigma(a)|$ inside the supremum, and the worst-case absolute version $\mathfrak R_n(F)$ used by Boffi et al. also takes a supremum over all samples. These two are treated in \ref{conventions}.

Two facts about $S_\sigma$ do most of the work. Write $\lVert a\rVert_n=\sqrt{\tfrac1n\sum_ia_i^2}$ for the root-mean-square size of a vector, the *empirical $L_2$ norm*. Since every $\sigma_i^2=1$, the Cauchy–Schwarz inequality gives

$$S_\sigma(a)\le\sqrt{\tfrac1n\textstyle\sum_i\sigma_i^2}\,\sqrt{\tfrac1n\textstyle\sum_ia_i^2}=\lVert a\rVert_n. \label{cs}$$

And for a *fixed* vector $b$, $\mathbb E_\sigma S_\sigma(b)=\frac1n\sum_ib_i\,\mathbb E\sigma_i=0$. Hence subtracting a fixed vector from every member of $A$ does not change the signed complexity:

$$\mathbb E_\sigma\sup_{a\in A}S_\sigma(a-b)=\mathbb E_\sigma\Bigl[\sup_{a\in A}S_\sigma(a)-S_\sigma(b)\Bigr]=\widehat{\mathfrak R}_n(F). \label{shift}$$

The supremum can be split this way because $S_\sigma(b)$ does not depend on $a$. [[rademacher-properties]] develops this and the other calculation rules.

### Finite classes: Massart's lemma {#massart}

The simplest non-linear case is a finite class. If $F$ has $N$ members, the supremum is a maximum of $N$ random averages, each of mean zero. The question is how fast the maximum grows with $N$.

::: lemma {#lem-massart} Massart's finite-class lemma
Let $A\subset\mathbb R^n$ contain $N\ge1$ vectors, and let $r=\max_{a\in A}\lVert a\rVert_n$. Then
$$\mathbb E_\sigma\Bigl[\max_{a\in A}S_\sigma(a)\Bigr]\le r\sqrt{\frac{2\log N}{n}}. \label{massart-bd}$$
Here $\log$ is the natural logarithm. With absolute values, apply \ref{massart-bd} to $A\cup(-A)$, which has at most $2N$ vectors: the bound becomes $r\sqrt{2\log(2N)/n}$.
:::

This is Lemma 26.8 of Shalev-Shwartz and Ben-David (2014, p. 330, PDF p. 348). They state it for $\max_a\lVert a-\bar a\rVert_2$ with the mean vector $\bar a$ subtracted and with the unnormalized Euclidean norm; the version above follows from the same proof without centering, and with $\lVert a\rVert_2=\sqrt n\lVert a\rVert_n$.

::: proof
If $N=1$, the left side is $\mathbb E_\sigma S_\sigma(a)=0$ and there is nothing to prove; the same holds if $r=0$. Otherwise write $X_a=\sum_i\sigma_ia_i=nS_\sigma(a)$ and fix a number $\lambda>0$, to be chosen at the end.

*Step 1: replace the maximum by a sum of exponentials.* The exponential is increasing, and a sum of positive numbers is at least its largest term. So
$$\max_aX_a=\frac1\lambda\log e^{\lambda\max_aX_a}\le\frac1\lambda\log\sum_{a\in A}e^{\lambda X_a}.$$

*Step 2: move the average inside the logarithm (Jensen).* The logarithm is concave, so the average of logarithms is at most the logarithm of the average: $\mathbb E\log Y\le\log\mathbb EY$ for a positive random $Y$. Hence
$$\mathbb E\max_aX_a\le\frac1\lambda\log\sum_{a\in A}\mathbb E\,e^{\lambda X_a}.$$
This is why the exponential was introduced: the expectation of a maximum is hard, but the expectation of a single exponential factors.

*Step 3: independence factors each exponential.* $e^{\lambda X_a}=\prod_ie^{\lambda\sigma_ia_i}$, and the factors are independent, so the expectation is the product of the expectations. Each factor averages two values: $\mathbb E\,e^{\lambda\sigma_ia_i}=\tfrac12(e^{\lambda a_i}+e^{-\lambda a_i})=\cosh(\lambda a_i)$.

*Step 4: $\cosh x\le e^{x^2/2}$.* Compare power series term by term: $\cosh x=\sum_{j\ge0}x^{2j}/(2j)!$ and $e^{x^2/2}=\sum_{j\ge0}x^{2j}/(2^jj!)$. Since $(2j)!=\prod_{i=1}^j(2i)(2i-1)\ge\prod_{i=1}^j2i=2^jj!$, every term of the first series is at most the corresponding term of the second. Therefore
$$\mathbb E\,e^{\lambda X_a}\le\prod_{i=1}^ne^{\lambda^2a_i^2/2}=e^{\lambda^2n\lVert a\rVert_n^2/2}\le e^{\lambda^2nr^2/2}.$$

*Step 5: choose $\lambda$.* Combining, $\mathbb E\max_aX_a\le\frac1\lambda\bigl(\log N+\lambda^2nr^2/2\bigr)=\frac{\log N}{\lambda}+\frac{\lambda nr^2}2$. The first term falls and the second grows with $\lambda$; they balance at $\lambda=\sqrt{2\log N/(nr^2)}$, where the sum equals $r\sqrt{2n\log N}$. Dividing by $n$ gives \ref{massart-bd}.

For the absolute version, $|S_\sigma(a)|=\max\{S_\sigma(a),S_\sigma(-a)\}$, so $\max_a|S_\sigma(a)|$ is the maximum of $S_\sigma$ over $A\cup(-A)$, a set of at most $2N$ vectors with the same $r$.
:::

**Reading the lemma.** The complexity of a finite class grows only like $\sqrt{\log N}$: squaring the number of members multiplies the bound by $\sqrt2$. A class of a million functions of size at most $1$ has signed complexity at most $\sqrt{2\log10^6/n}\approx5.3/\sqrt n$.

::: example {#ex-massart} Two endpoints of the diagonal class
The diagonal class of [[rademacher-complexity]] has value vectors $(w,w)$, $|w|\le1$, on two points, and its complexity is $\tfrac12$. Keep only its two endpoints, $A=\{(1,1),(-1,-1)\}$. For each sign vector the best of the two values is $\tfrac12|\sigma_1+\sigma_2|$, which is $1,0,0,1$, so the complexity is again $\tfrac12$: a linear function of $w$ is maximized at an endpoint, so the endpoints already do everything the whole segment does. Massart's bound with $N=2$, $r=1$ and $n=2$ is $\sqrt{2\log2/2}=\sqrt{\log 2}\approx0.833$. The bound holds, with room to spare.
:::

### Covers: finitely many functions at one resolution {#covers}

An infinite class may still be *approximately* finite: at any resolution $\epsilon>0$, finitely many functions may come within $\epsilon$ of every member. To say this we need a distance between functions, and the choice matters. Three are used in this route.

- **Empirical $L_2$ distance** on the fixed sample, $\lVert f-g\rVert_n=\sqrt{\tfrac1n\sum_i(f(z_i)-g(z_i))^2}$. This is the distance that \ref{cs} pairs with random signs.
- **Sup distance** over the whole domain, $\lVert f-g\rVert_\infty=\sup_{z\in\mathcal Z}|f(z)-g(z)|$. Since an average of squares is at most their largest value, $\lVert f-g\rVert_n\le\lVert f-g\rVert_\infty$ *for every sample*. A sup-distance statement therefore holds simultaneously on all samples, which is what a worst-case convention needs.
- **Parameter distance** $\lVert\theta-\theta'\rVert$ between parameter vectors, when $F=\{f_\theta\}$ is indexed by $\theta\in\mathbb R^k$. Unless stated otherwise this is the Euclidean norm.

::: definition {#def-cover} Cover and covering number
Let $T$ be a set equipped with one of these distances $\rho$ (here $T$ and $\rho$ are local names, unrelated to the time horizon and the residual's rate function in Part 18). An **$\epsilon$-cover** of $T$ is a set $C$ of **centers** such that every $t\in T$ has some $c\in C$ with $\rho(t,c)\le\epsilon$. The **covering number** $N(\epsilon;T,\rho)$ is the smallest number of centers in an $\epsilon$-cover, or $+\infty$ if no finite cover exists.
:::

In this lesson the centers are **external**: they may be any vectors of $\mathbb R^n$, or any functions, not necessarily members of $T$. Requiring centers inside $T$ gives the **internal** covering number, which can be larger; [[covering-properties]] compares the two (they differ by at most a factor $2$ in the scale) and relates both to packing. Two properties are immediate. A cover at scale $\epsilon$ is also a cover at every larger scale, so $N(\epsilon)$ **does not increase** as $\epsilon$ grows. And if every member of $T$ is within distance $D$ of one fixed point $b_0$, then $\{b_0\}$ is a $D$-cover, so $N(\epsilon)=1$ and $\log N(\epsilon)=0$ for every $\epsilon\ge D$.

::: example {#ex-interval} An interval and the diagonal class
The interval $[-B,B]$ with distance $|t-t'|$ is covered at scale $\epsilon$ by the centers $-B+\epsilon,\ -B+3\epsilon,\ -B+5\epsilon,\dots$, each responsible for a piece of length $2\epsilon$. Since the interval has length $2B$ and no center can be responsible for more than $2\epsilon$ of it, the minimum is
$$N(\epsilon;[-B,B])=\lceil B/\epsilon\rceil\le1+\frac B\epsilon\le1+\frac{2B}\epsilon.$$
For $B=2$ and $\epsilon=0.3$: $\lceil 6.67\rceil=7$ centers, while the last form, which is the one-dimensional case of the volume bound $(1+2B/\epsilon)^k$, gives $14.3$. The volume bound is crude but has the right shape, $\log N\approx\log(1/\epsilon)$ per dimension.

The diagonal class on $n$ points has value vectors $(w,\dots,w)$, and $\lVert(w,\dots,w)-(w',\dots,w')\rVert_n=|w-w'|$. Moving a center to the nearest point of the diagonal brings it closer to every member (Pythagoras), so we may take centers on the diagonal, and covering the class is covering $[-1,1]$: $N(\epsilon)=\lceil1/\epsilon\rceil$, the same for every $n$.
:::

**Transferring a parameter cover.** Suppose the class is $F=\{f_\theta:\lVert\theta\rVert\le B\}$ and the parametrization is Lipschitz in sup distance: $\lVert f_\theta-f_{\theta'}\rVert_\infty\le L\lVert\theta-\theta'\rVert$ for all parameters in the ball. Take a cover of the parameter ball at scale $\epsilon/L$ whose centers lie in the ball. For each $f_\theta$ the nearest center $\theta_c$ satisfies $\lVert f_\theta-f_{\theta_c}\rVert_\infty\le L\cdot\epsilon/L=\epsilon$. So the functions $f_{\theta_c}$ form an $\epsilon$-cover of $F$:

$$N(\epsilon;F,\lVert\cdot\rVert_\infty)\le N\bigl(\epsilon/L;\ \{\lVert\theta\rVert\le B\}\bigr)\le\Bigl(1+\frac{2LB}{\epsilon}\Bigr)^k. \label{transfer}$$

The last step is the volume comparison $N(u;\text{unit ball})\le(1+2/u)^k$, rescaled from the unit ball to radius $B$. Its proof is short: a maximal set of points of the ball at mutual distance more than $u$ is a cover, and balls of radius $u/2$ around them are disjoint inside the ball of radius $1+u/2$, so comparing volumes bounds their number by $(1+2/u)^k$. [[covering-properties]] (Theorem "Volume bounds in any norm") gives it in full for any norm. [[boffi-thm-4-2]] applies exactly this transfer with $L$ built from the derivatives of the certificate parametrization. [[covering-properties]] develops Lipschitz images, products and norm changes in general.

**One resolution is already useful.** Fix $\epsilon$, a reference vector $b_0$ with every $a\in A$ within $\lVert a-b_0\rVert_n\le D$, and a minimal $\epsilon$-cover $C$ of $A$ in $\lVert\cdot\rVert_n$. Discard centers that are farther than $\epsilon$ from all of $A$; each remaining center then lies within $D+\epsilon$ of $b_0$. By \ref{shift} we may subtract $b_0$ and assume $b_0=0$. For each $a$, with $c(a)$ its center,
$$S_\sigma(a)=S_\sigma(c(a))+S_\sigma\bigl(a-c(a)\bigr)\le\max_{c\in C}S_\sigma(c)+\epsilon,$$
using \ref{cs} on the second term. Taking the supremum over $a$, averaging over signs and applying Massart's lemma to the finite set $C$,
$$\widehat{\mathfrak R}_n(F)\le\epsilon+(D+\epsilon)\sqrt{\frac{2\log N(\epsilon)}n}. \label{one-scale}$$

Small $\epsilon$ makes the approximation error small but the cover large. For a $k$-parameter class, $\log N(\epsilon)\approx k\log(1/\epsilon)$; the two terms balance near $\epsilon\approx\sqrt{k/n}$, and the bound is of order $\sqrt{k\log(n/k)/n}$. The logarithm is the price of using a single resolution. Chaining removes it.

### Chaining: Dudley's entropy integral {#statement}

Instead of one cover, use a sequence of covers at the halving scales $\epsilon_j=D2^{-j}$, $j=0,1,2,\dots$, and follow each class member down the sequence. The integral form below uses the **metric entropy** $\log N(\epsilon)$.

::: theorem {#thm-dudley} Dudley's chaining bound, signed convention
Fix the sample. Suppose there is a vector $b_0$ with $\lVert a-b_0\rVert_n\le D$ for every $a\in A$, and write $N(\epsilon)=N(\epsilon;A,\lVert\cdot\rVert_n)$ with external centers. Then for every integer $M\ge1$,
$$\widehat{\mathfrak R}_n(F;z_{1:n})\le\epsilon_M+\frac6{\sqrt n}\sum_{j=1}^M\epsilon_j\sqrt{\log N(\epsilon_j)}, \label{chain-sum}$$
and consequently
$$\widehat{\mathfrak R}_n(F;z_{1:n})\le\frac{12}{\sqrt n}\int_0^{D/2}\sqrt{\log N(\epsilon)}\,d\epsilon. \label{dudley}$$
:::

The finite form \ref{chain-sum} is Lemma 27.4 of Shalev-Shwartz and Ben-David (2014, §27.2, pp. 338–339, PDF pp. 356–357), written there with the unnormalized Euclidean norm, $m$ for $n$ and the best possible center for $b_0$. The integral form \ref{dudley} is our conversion; their Lemma 27.5 draws a different corollary from the same sum. The book attributes chaining to Dudley (§27.3, p. 340).

### The chaining argument {#reasoning}

::: proof
*Step 0: center the class.* By \ref{shift} we may replace every $a$ by $a-b_0$ without changing the complexity, so assume $b_0=0$ and $\lVert a\rVert_n\le D=\epsilon_0$ for all $a\in A$. If some $N(\epsilon_j)$ is infinite the bounds are trivially true, so assume all are finite.

*Step 1: covers at halving scales.* Let $C_0=\{0\}$, which is an $\epsilon_0$-cover of $A$. For $j=1,\dots,M$ let $C_j$ be a minimal $\epsilon_j$-cover, so $|C_j|=N(\epsilon_j)$.

*Step 2: a chain for each sign vector.* Fix $\sigma$ and a tolerance $\eta>0$. Pick $a^\sigma\in A$ with $S_\sigma(a^\sigma)\ge\sup_{a\in A}S_\sigma(a)-\eta$; if the supremum is attained, take a maximizer and $\eta=0$. For each $j$ let $c_j$ be a center of $C_j$ within $\epsilon_j$ of $a^\sigma$, and $c_0=0$. The vectors $c_0,c_1,\dots,c_M$ approach $a^\sigma$ in steps, and they telescope:
$$a^\sigma=\bigl(a^\sigma-c_M\bigr)+\sum_{j=1}^M\bigl(c_j-c_{j-1}\bigr)+c_0.$$
Since $S_\sigma$ is linear and $c_0=0$,
$$S_\sigma(a^\sigma)=S_\sigma\bigl(a^\sigma-c_M\bigr)+\sum_{j=1}^MS_\sigma\bigl(c_j-c_{j-1}\bigr).$$

*Step 3: the last link is short.* By \ref{cs}, $S_\sigma(a^\sigma-c_M)\le\lVert a^\sigma-c_M\rVert_n\le\epsilon_M$.

*Step 4: each link lies in a fixed finite set.* By the triangle inequality, $\lVert c_j-c_{j-1}\rVert_n\le\lVert c_j-a^\sigma\rVert_n+\lVert a^\sigma-c_{j-1}\rVert_n\le\epsilon_j+\epsilon_{j-1}=3\epsilon_j$. So the link belongs to
$$\begin{aligned}\mathcal L_j=\bigl\{c-c':\ &c\in C_j,\ c'\in C_{j-1},\\&\lVert c-c'\rVert_n\le3\epsilon_j\bigr\}.\end{aligned}$$
The chain depends on $\sigma$, but the set $\mathcal L_j$ does not. That is the point of this step: Massart's lemma applies to a maximum over a set fixed before the signs are drawn, so we bound the $\sigma$-dependent link by the maximum over all possible links, $S_\sigma(c_j-c_{j-1})\le\max_{\ell\in\mathcal L_j}S_\sigma(\ell)$. The set has at most $|C_j|\,|C_{j-1}|\le N(\epsilon_j)^2$ members, because $N(\epsilon_{j-1})\le N(\epsilon_j)$.

*Step 5: Massart at each level.* Every member of $\mathcal L_j$ has $\lVert\ell\rVert_n\le3\epsilon_j$, so \ref{massart-bd} gives
$$\mathbb E_\sigma\max_{\ell\in\mathcal L_j}S_\sigma(\ell)\le3\epsilon_j\sqrt{\frac{2\log N(\epsilon_j)^2}n}=\frac{6\,\epsilon_j\sqrt{\log N(\epsilon_j)}}{\sqrt n}.$$

*Step 6: add the levels.* Combining Steps 2–5 for each $\sigma$ and averaging,
$$\widehat{\mathfrak R}_n(F)-\eta\le\epsilon_M+\frac6{\sqrt n}\sum_{j=1}^M\epsilon_j\sqrt{\log N(\epsilon_j)}.$$
The tolerance $\eta>0$ was arbitrary, which proves \ref{chain-sum}.

*Step 7: from the sum to the integral.* Since $\epsilon_{j+1}=\epsilon_j/2$, we have $\epsilon_j=2(\epsilon_j-\epsilon_{j+1})$. For $\epsilon$ in $[\epsilon_{j+1},\epsilon_j]$, $N(\epsilon)\ge N(\epsilon_j)$ because covering numbers do not increase with the scale. So the term at level $j$ is at most twice the area under $\sqrt{\log N}$ over that interval:
$$\epsilon_j\sqrt{\log N(\epsilon_j)}\le2\int_{\epsilon_{j+1}}^{\epsilon_j}\sqrt{\log N(\epsilon)}\,d\epsilon.$$
The intervals for $j=1,\dots,M$ are disjoint and lie in $(0,\epsilon_1]=(0,D/2]$, so the sum is at most $2\int_0^{D/2}\sqrt{\log N(\epsilon)}\,d\epsilon$. Then $\widehat{\mathfrak R}_n(F)\le\epsilon_M+\frac{12}{\sqrt n}\int_0^{D/2}\sqrt{\log N}$ for every $M$, and letting $M\to\infty$ sends $\epsilon_M=D2^{-M}\to0$, which proves \ref{dudley}.
:::

**What each level costs.** Level $j$ pays the length of its links, about $\epsilon_j$, times the square root of the log of the number of possible links, about $\sqrt{\log N(\epsilon_j)}$. Coarse levels have few centers but long links; fine levels have many centers but short links. For a $k$-parameter class $\sqrt{\log N(\epsilon)}$ grows only like $\sqrt{k\log(1/\epsilon)}$ while the link lengths halve, so the sum converges with no $\log n$ in it. The one-scale bound \ref{one-scale} paid for the finest resolution with every center at once; chaining pays each resolution only for the short corrections it adds.

**Why the integral stops.** Beyond the radius $D$ one center covers everything, $\log N=0$, and the integrand vanishes. The finite upper limit $D/2$ (and $D$ is at most the diameter of the class) is not decoration. A bound such as $\log N(\epsilon)\le k\log(1+2LB/\epsilon)$ is valid for every $\epsilon$, but for large $\epsilon$ it behaves like $2kLB/\epsilon$, and $\int^\infty\epsilon^{-1/2}\,d\epsilon$ diverges. One must use $N(\epsilon)=1$ beyond the radius, as [[boffi-thm-4-2]] does when it stops its integral at $u=1$. Near $\epsilon=0$ the parametric integrand grows only like $\sqrt{\log(1/\epsilon)}$, which is integrable.

**A parameter ball.** Combine \ref{transfer} with \ref{dudley}, using sup-distance covers (which are also $\lVert\cdot\rVert_n$-covers) and the substitution $\epsilon=LBu$. Take the reference $f_0=f_{\theta=0}$, which is in the class. Every $f_\theta$ satisfies $\lVert f_\theta-f_0\rVert_\infty\le L\lVert\theta\rVert\le LB$, so $N(\epsilon)=1$ for $\epsilon\ge LB$ and the integrand vanishes beyond $\epsilon=LB$, that is beyond $u=1$:
$$\begin{aligned}\int_0^\infty\sqrt{\log N(\epsilon)}\,d\epsilon&\le LB\sqrt k\int_0^1\sqrt{\log(1+2/u)}\,du\\&=LB\sqrt k\,I,\qquad I\approx1.3526.\end{aligned}$$
So $\widehat{\mathfrak R}_n(F)\le12I\,LB\sqrt{k/n}\approx16.2\,LB\sqrt{k/n}$ on every sample. The rate is $\sqrt{k/n}$, without the logarithm of \ref{one-scale}.

### Absolute values and the worst sample {#conventions}

Boffi et al. bound the worst-case absolute complexity, redefined here because it is the convention the certificate lemma consumes:
$$\mathfrak R_n(F)=\sup_{z_1,\dots,z_n\in\mathcal Z}\ \mathbb E_\sigma\Bigl[\sup_{f\in F}\Bigl|\frac1n\sum_{i=1}^n\sigma_if(z_i)\Bigr|\Bigr].$$
\ref{thm-dudley} does not control this directly, for two reasons.

- **Absolute values are not shift-invariant.** Step 0 used \ref{shift}, which holds because a fixed vector averages to zero against the signs. Its *absolute* value does not: a single fixed function has signed complexity $0$ but positive absolute complexity ([[rademacher-complexity]], the single-function example). Every cover of a one-member class has one center, so the right side of \ref{dudley} is $0$, while the absolute complexity of $f\equiv1$ on two points is $\tfrac12$.
- **The sample is chosen adversarially.** The empirical covers depend on the sample. A bound valid for the worst sample must use covers that work for every sample at once.

The next lemma handles the first point by paying for one reference member separately.

::: lemma {#lem-abs} From signed to absolute
For any member $f_0\in F$, with value vector $a_0$ on the sample,
$$\begin{aligned}\widehat{\mathfrak R}^{\,|\cdot|}_n(F)&\le\mathbb E_\sigma|S_\sigma(a_0)|+2\,\widehat{\mathfrak R}_n(F)\\&\le\frac{\lVert a_0\rVert_n}{\sqrt n}+2\,\widehat{\mathfrak R}_n(F).\end{aligned} \label{abs}$$
In particular, if $F$ contains a member that is zero on the sample, then $\widehat{\mathfrak R}^{\,|\cdot|}_n(F)\le2\,\widehat{\mathfrak R}_n(F)$.
:::

::: proof
By the triangle inequality, $|S_\sigma(a)|\le|S_\sigma(a_0)|+|S_\sigma(a-a_0)|$ for every $a$. The shifted set $G=A-a_0$ contains $0$. For any family of numbers $x_g$ that includes $x_0=0$, both $\sup_gx_g$ and $\sup_g(-x_g)$ are at least $0$, so
$$\sup_g|x_g|=\max\Bigl\{\sup_gx_g,\ \sup_g(-x_g)\Bigr\}\le\sup_gx_g+\sup_g(-x_g).$$
Apply this with $x_g=S_\sigma(g)$. Since $-S_\sigma(g)=S_{-\sigma}(g)$ and $-\sigma$ is again a vector of fair independent signs, both terms average to the signed complexity of $G$, which equals $\widehat{\mathfrak R}_n(F)$ by \ref{shift}. For the reference term, Jensen's inequality ($\mathbb E X\le\sqrt{\mathbb EX^2}$) and the cancellation of cross terms $\mathbb E\sigma_i\sigma_j=0$ give $\mathbb E|S_\sigma(a_0)|\le\sqrt{\tfrac1{n^2}\sum_ia_{0,i}^2}=\lVert a_0\rVert_n/\sqrt n$, exactly as in the linear-ball calculation.
:::

Now combine \ref{abs} with \ref{dudley}. Use sup-distance covers, which are $\lVert\cdot\rVert_n$-covers on every sample, and the reference $b_0=f_0$, with $D_\infty=\sup_{f\in F}\lVert f-f_0\rVert_\infty$. The right side then no longer depends on the sample, so it also bounds the supremum over samples:

$$\mathfrak R_n(F)\le\frac{\sup_z|f_0(z)|}{\sqrt n}+\frac{24}{\sqrt n}\int_0^{D_\infty/2}\sqrt{\log N(\epsilon;F,\lVert\cdot\rVert_\infty)}\,d\epsilon. \label{dudley-wc}$$

**Connection to the paper (a preview for [[boffi-thm-4-2]]).** Nothing else in this lesson depends on this paragraph; it names objects that Part 18 defines. A *certificate* $V$ is a candidate Lyapunov function, its *trajectory residual* $h(\xi,V)$ is the worst violation of the decrease condition along the trajectory from the initial state $\xi$, $\lVert\cdot\rVert_{\mathcal V}$ is the largest size of a certificate's value and gradient together over the reachable region, and $L_h$ and $B_h$ are a Lipschitz constant and a bound for the residual. Boffi et al. (arXiv:2008.05952v2) state Dudley's estimate on p. 6 and as (B.1) on p. 18 in the form $\mathfrak R_n(\mathcal V)\le\frac{24L_h}{\sqrt n}\int_0^\infty\sqrt{\log N(\epsilon;\mathcal V,\lVert\cdot\rVert_{\mathcal V})}\,d\epsilon$, citing Wainwright (2019) without a derivation. Here the class is the set of trajectory residuals $\xi\mapsto h(\xi,V)$, and $\lVert\cdot\rVert_{\mathcal V}$ is the joint value-and-gradient norm of [[certificate-classes]]. Since $|h(\xi,V_1)-h(\xi,V_2)|\le L_h\lVert V_1-V_2\rVert_{\mathcal V}$ for every $\xi$ ([[boffi-thm-4-2]]), a $\lVert\cdot\rVert_{\mathcal V}$-cover at scale $\epsilon$ whose centers are certificates in the class (as the parameter transfer provides) yields a sup-distance cover of the residuals at scale $L_h\epsilon$. Substituting $\epsilon'=L_h\epsilon$ in \ref{dudley-wc} turns its integral into $L_h\int\sqrt{\log N(\epsilon;\mathcal V,\lVert\cdot\rVert_{\mathcal V})}\,d\epsilon$, and the upper limit $\infty$ only adds a zero integrand. So:

- **With a zero-residual member.** If some certificate in the class has trajectory residual identically zero, take it as $f_0$. The first term of \ref{dudley-wc} vanishes, and our derivation gives (B.1) with constant $24$ when $N(\epsilon;\mathcal V,\lVert\cdot\rVert_{\mathcal V})$ counts covers whose centers are certificates in the class (internal covers, as the parameter transfer provides). The source does not say which covering number it means. With arbitrary centers, the comparison $N^{\mathrm{in}}(2\epsilon)\le N(\epsilon)$ of [[covering-properties]] doubles the scale and gives constant $48$. The zero-residual member is the hypothesis that [[boffi-thm-4-2]] adds explicitly. We cannot tell from the source whether the authors' constant arises the same way.
- **Without one.** The extra term $\sup_\xi|h(\xi,V_0)|/\sqrt n\le B_h/\sqrt n$ remains, where $B_h$ bounds the residual. The source's display omits it; [[boffi-thm-4-2]] records its effect on the theorem.

::: remark
A second route gives the same qualitative answer. Since $\sup_f|S_\sigma(f)|$ is the supremum of $S_\sigma$ over $F\cup(-F)$, the absolute complexity of $F$ is the signed complexity of $F\cup(-F)$. A cover of $F\cup(-F)$ needs at most $2N(\epsilon)$ centers (a cover of $F$ and its negative), but the radius must now be measured around $0$, which includes the size of $f_0$. This is the "replace $N$ by $2N$" rule quoted for Massart's lemma in [[boffi-thm-4-2]]. Either way, absolute values cost something whenever the class sits away from zero.
:::

### Worked comparisons {#examples}

::: example {#ex-diag-n} Exact value, one scale and chaining for the diagonal class
On $n$ points the diagonal class has supremum $\frac1n|\sigma_1+\dots+\sigma_n|$ for each sign vector, so its exact complexity is $\mathbb E|\sigma_1+\dots+\sigma_n|/n$. Its covering numbers are $N(\epsilon)=\lceil1/\epsilon\rceil$ with $D=1$ around $b_0=0$ (\ref{ex-interval}).

*Chaining integral.* For $\epsilon$ in $(1/(m+1),1/m]$ we have $\lceil1/\epsilon\rceil=m+1$, so
$$\begin{aligned}J&=\int_0^{1/2}\sqrt{\log\lceil1/\epsilon\rceil}\,d\epsilon\\&=\sum_{m\ge2}\Bigl(\frac1m-\frac1{m+1}\Bigr)\sqrt{\log(m+1)}\\&\approx0.658,\end{aligned}$$
and \ref{dudley} gives $12J/\sqrt n\approx7.90/\sqrt n$.

*One scale.* Minimizing \ref{one-scale} over $\epsilon$ numerically gives the third column below.

- $n=16$: exact $0.196$; one scale $0.687$; chaining $1.974$.
- $n=100$: exact $0.0796$; one scale $0.303$ (at $\epsilon\approx0.031$); chaining $0.790$.
- $n=10^4$: exact $0.00798$; one scale $0.0372$; chaining $0.0790$.

The exact value times $\sqrt n$ settles near $0.798\approx\sqrt{2/\pi}$, the mean size of a standard normal variable. Chaining has the right $1/\sqrt n$ shape, with a constant about ten times too large. The one-scale bound decays more slowly, like $\sqrt{\log n/n}$, but for this one-parameter class its smaller constant keeps it ahead at every sample size one would meet. The advantage of chaining is in the rate, which is what a theorem such as [[boffi-thm-4-2]] needs. These numbers are illustrations of the two bounds; they prove nothing beyond this class.
:::

The finite form \ref{chain-sum} at $n=100$ behaves the same way: with $M=1,2,3$ levels it gives $0.750$, $0.676$ and $0.660$. Adding levels first helps, as the approximation term $\epsilon_M$ shrinks, then costs a little more, because each new level adds a positive term.

### When it fails {#failure}

- **A fixed offset under absolute values.** The single function $f\equiv1$ has every covering number equal to $1$, so the chaining integral is $0$. Its absolute complexity on two points is $\tfrac12$. \ref{lem-abs} pays for it with $\lVert a_0\rVert_n/\sqrt n=1/\sqrt2\approx0.707\ge\tfrac12$.
- **No truncation.** Integrating the volume bound $k\log(1+2LB/\epsilon)$ to infinity diverges, as computed above; the bound must use $N=1$ beyond the radius.
- **A class with no small covers.** The memorizing class of [[rademacher-complexity]] can produce every vector in $\{0,1\}^n$ on distinct points. For two cube vertices, $\lVert v-v'\rVert_n^2$ is the fraction of coordinates in which they differ. Two vertices within $\tfrac14$ of a common center are within $\tfrac12$ of each other, so they differ in at most $n/4$ coordinates. One ball of radius $\tfrac14$ therefore holds at most $\sum_{j\le n/4}\binom nj\le2^{0.812n}$ vertices (a standard binomial-sum estimate), and covering all $2^n$ vertices needs $N(\tfrac14)\ge2^{0.188n}$ balls, that is $\log N(\tfrac14)\ge0.13\,n$. So $\sqrt{\log N}$ grows like $\sqrt n$ and the chaining bound stays of order one. That is the right answer: the exact complexity is $\tfrac12$ for every $n$.
- **The wrong distance.** A cover in values alone does not control a quantity that depends on derivatives. Certificate residuals use $\nabla V$, which is why the route covers values and gradients together ([[certificate-classes]], [[kernels-random-features]]).

### Assumptions and scope {#assumptions}

- **Fixed sample, fixed class.** \ref{thm-dudley} is a statement about one fixed sample and a class chosen before the signs. Turning it into a statement about population risk goes through symmetrization ([[rademacher-complexity]]) or, for certificates, Lemma 4.1 ([[boffi-lemma-4-1]]).
- **Signed convention for the main theorem.** The theorem uses the shift invariance \ref{shift}. Absolute or worst-case conventions need \ref{lem-abs}, sup-distance covers and either a zero member or the extra reference term.
- **Finite radius and finite covers.** The bound is trivially true when a covering number is infinite; it is informative only when $\int_0^{D/2}\sqrt{\log N}$ is finite.
- **Constants.** The constants $6$, $12$ and $24$ are what this argument produces. They are not optimal. The exact constant matters for numbers, not for rates.
- **What is proved here.** Massart's lemma, the chaining bound, the integral form and the absolute-value lemma are proved in full. The source statements are cited with locators; Boffi's constant $24$ is reproduced under the zero-member hypothesis and with covers centered in the class ($48$ with arbitrary centers), not verified against an unstated proof.

### Exercises {#exercises}

::: question
**Massart by hand.** On two points, let $F$ have value vectors $(1,1)$, $(1,-1)$ and $(-1,-1)$. Compute the signed complexity by listing the four sign vectors, then compare it with Massart's bound.
---
For $(\sigma_1,\sigma_2)=(+,+)$ the three averages are $1,0,-1$, so the maximum is $1$. For $(+,-)$ they are $0,1,0$: maximum $1$. For $(-,+)$ they are $0,-1,0$: maximum $0$. For $(-,-)$ they are $-1,0,1$: maximum $1$. The complexity is $\tfrac14(1+1+0+1)=\tfrac34$. Every vector has $\lVert a\rVert_n=1$, so Massart gives $\sqrt{2\log3/2}=\sqrt{\log3}\approx1.048$. The bound holds.
:::

::: question
**Transferring a cover.** Let $f_\theta(x)=\theta x$ for $x\in[0,2]$ and $|\theta|\le1$. Find a Lipschitz constant $L$ with $\lVert f_\theta-f_{\theta'}\rVert_\infty\le L|\theta-\theta'|$, and use it to bound $N(0.25;F,\lVert\cdot\rVert_\infty)$.
---
$\sup_{x\in[0,2]}|\theta x-\theta'x|=2|\theta-\theta'|$, so $L=2$. A cover of $[-1,1]$ at scale $0.25/2=0.125$ needs $\lceil1/0.125\rceil=8$ centers, so $N(0.25)\le8$. Here the transfer is exact, because the sup distance is exactly $2|\theta-\theta'|$.
:::

::: question
**Choosing the reference.** On two points, let $F$ have value vectors $(w+1,w+1)$ for $|w|\le1$. Its absolute complexity is $1$ (the suprema are $2,0,0,2$). Evaluate the bound of \ref{lem-abs} with the reference $w=0$, then with $w=-1$. Which reference is better, and why?
---
The signed complexity is $\tfrac12$, as for the diagonal class, because adding the fixed vector $(1,1)$ does not change it. With $w=0$ the reference is $(1,1)$, so the bound is $\lVert(1,1)\rVert_n/\sqrt2+2\cdot\tfrac12=0.707+1=1.707$. With $w=-1$ the reference is $(0,0)$, a member that is zero on the sample, so the bound is $0+1=1$, which is exact. A zero member removes the reference term, which is why [[boffi-thm-4-2]] asks for a zero-residual certificate.
:::

::: question
**Why stop the integral?** For a one-parameter class with $N(\epsilon)\le1+2/\epsilon$, explain why $\int_0^\infty\sqrt{\log(1+2/\epsilon)}\,d\epsilon$ is infinite, and what the chaining bound integrates instead.
---
For large $\epsilon$, $\log(1+2/\epsilon)\approx2/\epsilon$, so the integrand behaves like $\sqrt2\,\epsilon^{-1/2}$, whose integral to infinity diverges. The true covering number is $1$ once $\epsilon$ reaches the radius ($\epsilon\ge1$ for the unit interval), so the actual integrand is $0$ there. The bound integrates $\sqrt{\log N(\epsilon)}$ only up to half the radius, or equivalently uses $\log N=0$ beyond it.
:::

### Where it is used {#uses}

[[boffi-thm-4-2]] applies the transfer \ref{transfer}, the volume count and the worst-case form \ref{dudley-wc} with a zero-residual member. [[covering-properties]] develops the cover calculus (images, products, packing, norm changes). [[dual-sudakov]] and [[kernels-random-features]] supply sharper or different entropy estimates for the same integral.

## Card

### The idea {#idea}

Approximate the class at halving resolutions and pay, at each level, the link length times $\sqrt{\log(\text{number of links})}$. For a fixed sample, signed complexity, and value vectors within $D$ of a reference:
$$\widehat{\mathfrak R}_n(F)\le\frac{12}{\sqrt n}\int_0^{D/2}\sqrt{\log N(\epsilon;F,\lVert\cdot\rVert_n)}\,d\epsilon.$$
The finite-class input is Massart: $N$ vectors of empirical size at most $r$ have complexity at most $r\sqrt{2\log N/n}$.

### Intuition and example {#intuition}

- One resolution gives $\epsilon+(D+\epsilon)\sqrt{2\log N(\epsilon)/n}$, which costs an extra $\sqrt{\log n}$; chaining removes it.
- Diagonal class: $N(\epsilon)=\lceil1/\epsilon\rceil$, chaining bound $7.90/\sqrt n$, exact value about $0.80/\sqrt n$. Right rate, loose constant.
- $k$ parameters with an $L$-Lipschitz map from a radius-$B$ ball: $N(\epsilon)\le(1+2LB/\epsilon)^k$ and complexity $\le12I\,LB\sqrt{k/n}$, $I\approx1.35$.

### Assumptions and domain {#assumptions}

- Name the distance: empirical $L_2$ for one sample; sup distance for statements uniform over samples.
- External centers; $N(\epsilon)=1$ beyond the radius, so the integral is truncated there.
- Absolute or worst-case convention: $\widehat{\mathfrak R}^{\,|\cdot|}\le\lVert f_0\rVert_n/\sqrt n+2\widehat{\mathfrak R}$. With a member that is zero everywhere and covers whose centers lie in the class, this reproduces Boffi's (B.1) with constant $24$ (arbitrary centers: $48$); otherwise add $B_h/\sqrt n$.

### Where it is used {#uses}

[[covering-properties]], [[boffi-thm-4-2]].
