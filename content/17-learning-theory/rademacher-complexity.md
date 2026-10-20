+++
summary = "On a fixed sample, how well can the class match random signs? The average best match measures how much the class can exploit sampling noise, and it controls the worst gap between sample and population averages."
prereqs = ["uniform-convergence"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 26, §§26.1–26.3", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### Why the worst case over the class matters {#motivation}

A learner sees a sample and then chooses a model. The danger is that the chosen model looks good on this particular sample only because it was chosen *after* looking at it. This section collects the objects needed to say that precisely. They are developed in [[risk-erm]] and [[uniform-convergence]]; everything used below is restated here.

**The sample.** $Z_1,\dots,Z_n$ are $n$ data points in a set $\mathcal Z$. They are *independent draws* from one unknown distribution: each $Z_i$ has the same distribution as a generic point $Z$, and knowing some of them tells nothing about the others. In the certificate chapters one data point will be one whole independent trajectory, so $n$ counts trajectories, never time steps along one trajectory ([[trajectories-as-samples]]).

**The class.** $F$ is a set of real-valued functions $f:\mathcal Z\to\mathbb R$. In learning, $F$ is usually a *loss class*: each hypothesis $\psi$ from the hypothesis class $\Psi$ gives the function $f_\psi(z)=\ell(\psi,z)$, the loss of $\psi$ on the point $z$. Choosing a hypothesis is the same as choosing a member of $F$. As in [[risk-erm]], we use $\psi$ because the certificate chapters use $h$ for a residual and $g$ for a parametrization.

**Two averages.** For each $f\in F$ write

$$P f=\mathbb E\,f(Z), \qquad P_n f=\frac1n\sum_{i=1}^n f(Z_i).$$

$Pf$ is the population mean, a fixed number that we cannot compute because the distribution is unknown. $P_nf$ is the empirical mean, a random number computed from the sample. For a loss class, $Pf_\psi$ is the risk of $\psi$ and $P_nf_\psi$ is its empirical risk, using the notation of [[risk-erm]]. In this lesson the letter $R$ is kept for a bound on the length of data vectors, so risks are written only as $Pf_\psi$ and $P_nf_\psi$.

**One fixed function is easy; a chosen one is not.** If $f$ is fixed before the data arrive, $P_nf$ is an average of $n$ independent numbers, and [[concentration]] shows it is close to $Pf$ with high probability. Empirical risk minimization (ERM), however, returns the member $\hat f$ with the smallest $P_n f$, and $\hat f$ depends on the same sample. A class that can *memorize* shows what goes wrong. Let $Z$ be uniform on $[0,1]$ and let $F$ contain, for every finite set $A\subset[0,1]$, the function $f_A(z)=1$ if $z\notin A$ and $f_A(z)=0$ if $z\in A$. Each fixed $f_A$ has $Pf_A=1$, because a finite set has probability zero. After seeing the sample, the learner can take $A=\{Z_1,\dots,Z_n\}$ and get $P_nf_A=0$. The chosen function looks perfect on the sample and is useless in the population, although every individual function in the class concentrates.

**The uniform deviation.** The remedy is to control every member of the class at once. The quantity

$$\sup_{f\in F}\,\bigl|P_n f-Pf\bigr| \label{unif-dev}$$

is the *uniform deviation*. If it is at most $\epsilon$, then whatever member the learner picks, its empirical mean is within $\epsilon$ of its population mean. For ERM this gives the bound of [[risk-erm]]: with $\hat f$ the empirical minimizer and $f^\star$ any fixed member,

$$P\hat f-Pf^\star=\underbrace{(P\hat f-P_n\hat f)}_{\le\,\epsilon}+\underbrace{(P_n\hat f-P_nf^\star)}_{\le\,0}+\underbrace{(P_nf^\star-Pf^\star)}_{\le\,\epsilon}\le2\epsilon.$$

The middle term is nonpositive because $\hat f$ minimizes $P_n$. The outer terms are bounded by \ref{unif-dev} no matter how $\hat f$ was selected.

**Supremum versus maximum.** The symbol $\sup_{f\in F}a_f$ is the *supremum*: the smallest number that is greater than or equal to every $a_f$. When some member attains it, it is the maximum. A supremum always exists (possibly $+\infty$) even when no member attains it. For example, over $w\in(-1,1)$ the values $w$ have supremum $1$ but no maximum. We use $\sup$ so that infinite classes need no special treatment; in every worked example below the supremum is attained.

The rest of this lesson builds a number, computed from the sample and the class alone, that controls the expected uniform deviation.

### Random signs on a fixed sample {#statement}

::: definition {#def-signs} Rademacher signs
Rademacher signs $\sigma_1,\dots,\sigma_n$ are independent random variables, each equal to $+1$ or $-1$ with probability $\tfrac12$, and independent of the sample. In particular $\mathbb E\sigma_i=0$ and $\sigma_i^2=1$. We write $\mathbb E_\sigma$ for the average over the $2^n$ equally likely sign vectors.
:::

::: definition {#def-rad} Empirical Rademacher complexity
Fix the sample $Z_{1:n}=(Z_1,\dots,Z_n)$. The empirical Rademacher complexity of $F$ on this sample is

$$\widehat{\mathfrak R}_n(F;Z_{1:n})=\mathbb E_\sigma\Bigl[\,\sup_{f\in F}\frac1n\sum_{i=1}^n\sigma_i f(Z_i)\Bigr]. \label{rad}$$

We drop $Z_{1:n}$ from the notation when the sample is clear. The *expected* Rademacher complexity is $\mathbb E_Z\,\widehat{\mathfrak R}_n(F;Z_{1:n})$, the average of \ref{rad} over random samples.
:::

Read \ref{rad} as a three-stage game, played in this order:

1. **The sample is fixed first.** The points $Z_1,\dots,Z_n$ are given and do not change during the computation.
2. **The signs are drawn second.** Nature labels each point $+1$ or $-1$ by a fair coin. These labels are pure noise: they have nothing to do with the data.
3. **The class member is chosen third, after seeing the signs.** For this sign vector, the class picks the $f$ whose values $f(Z_i)$ correlate best with the signs: large where $\sigma_i=+1$, small where $\sigma_i=-1$.

The supremum sits *inside* the expectation. That is the whole point. A class gets a large value if, for most noise patterns, some member can follow that pattern. This is exactly the ability that let the memorizing class above fit the sample.

::: remark
Swapping the order destroys the measure. For any single $f$, independence and $\mathbb E\sigma_i=0$ give $\mathbb E_\sigma\frac1n\sum_i\sigma_if(Z_i)=\frac1n\sum_i f(Z_i)\,\mathbb E\sigma_i=0$. Hence $\sup_{f\in F}\mathbb E_\sigma[\cdots]=0$ for every class. Choosing $f$ before seeing the signs is like choosing a hypothesis before seeing the data: no fitting of noise is possible. ERM chooses after seeing the data, so the relevant quantity chooses after seeing the signs.
:::

**Absolute-value variant.** Some texts put absolute values inside the supremum:

$$\widehat{\mathfrak R}^{\,|\cdot|}_n(F;Z_{1:n})=\mathbb E_\sigma\Bigl[\,\sup_{f\in F}\Bigl|\frac1n\sum_{i=1}^n\sigma_i f(Z_i)\Bigr|\Bigr]. \label{rad-abs}$$

The two versions agree for many classes but not all; the example below shows a difference, and \ref{assumptions} compares all the conventions in use.

**What the memorizing class scores.** On a sample of distinct points, the memorizing class can produce any vector of values in $\{0,1\}^n$. For a sign vector $\sigma$ the best choice puts $f(Z_i)=1$ where $\sigma_i=+1$ and $0$ elsewhere, so the supremum equals (number of $+1$ signs)$/n$. Its average is $\tfrac12$ for every $n$. The complexity does not shrink as the sample grows, which matches the failure seen above.

### A two-point example {#toy}

::: example {#ex-toy} The diagonal class on two points
Take $n=2$ and a class whose members take the same value on both points: $f_w(Z_1)=f_w(Z_2)=w$ for each $w\in[-1,1]$. Only the vector of values on the sample matters, so we can describe the class by the set $\{(w,w):|w|\le1\}$. For a sign vector,

$$\sup_{|w|\le1}\frac12(\sigma_1w+\sigma_2w)=\sup_{|w|\le1}w\cdot\frac{\sigma_1+\sigma_2}{2}=\frac{|\sigma_1+\sigma_2|}{2},$$

because a linear function of $w$ on $[-1,1]$ is largest at $w=1$ if its slope is positive and at $w=-1$ if its slope is negative. Enumerating all four equally likely sign vectors:

| $(\sigma_1,\sigma_2)$ | $\sigma_1+\sigma_2$ | best $w$ | supremum |
| --- | --- | --- | --- |
| $(+1,+1)$ | $2$ | $1$ | $1$ |
| $(+1,-1)$ | $0$ | any | $0$ |
| $(-1,+1)$ | $0$ | any | $0$ |
| $(-1,-1)$ | $-2$ | $-1$ | $1$ |

So $\widehat{\mathfrak R}_2=\tfrac14(1+0+0+1)=\tfrac12$. When the signs agree, the class follows them perfectly. When they disagree, a class that must give both points the same value cannot follow either sign without paying for the other.
:::

The example changes in instructive ways when the class changes.

**A richer class.** Let the values $(a,b)$ range over the whole square $[-1,1]^2$. Now each coordinate can follow its own sign: choose $a=\sigma_1$, $b=\sigma_2$. Every sign vector gives supremum $\tfrac12(|\sigma_1|+|\sigma_2|)=1$, so $\widehat{\mathfrak R}_2=1$, the largest possible value for functions bounded by $1$. The square contains the diagonal, and the larger class fits more noise.

**A single function.** Let $F=\{f\}$ with $f(Z_1)=f(Z_2)=1$. There is nothing to choose, so the signed quantity is $\mathbb E_\sigma\tfrac12(\sigma_1+\sigma_2)=0$, as in the remark above. The absolute-value version is not zero: the values of $\tfrac12|\sigma_1+\sigma_2|$ are $1,0,0,1$, with average $\tfrac12$. One fixed function cannot fit noise, so the signed complexity correctly says $0$. The absolute version instead charges it for the random fluctuation of the sign sum. Because the two conventions disagree here, any quoted bound must say which one it uses.

### Why random signs control the uniform deviation {#symmetrization}

The definition is useful because of the following inequality. It replaces the unknown population mean by a quantity built from the sample and coin flips. Shalev-Shwartz and Ben-David prove it as Lemma 26.2 (2014, §26.1, p. 326), writing $m$ for the sample size and $\mathcal R(\ell\circ H\circ S)$ for our $\widehat{\mathfrak R}_n(F;Z_{1:n})$.

::: theorem {#thm-sym} Symmetrization
Let $Z_1,\dots,Z_n$ be independent draws and let $F$ be a class whose means $Pf$ exist and whose suprema below are well-defined random variables (true, for example, for a countable class or a class continuously indexed by parameters in $\mathbb R^k$). Then

$$\begin{aligned}&\mathbb E_Z\Bigl[\sup_{f\in F}\bigl(Pf-P_nf\bigr)\Bigr]\\&\qquad\le2\,\mathbb E_Z\,\widehat{\mathfrak R}_n(F;Z_{1:n}).\end{aligned} \label{sym}$$
:::

The proof is short enough to give in full. Its one idea is to compare the sample with an imaginary second sample.

::: proof
*Step 1: a ghost sample.* Let $Z'_1,\dots,Z'_n$ be a second set of independent draws from the same distribution, independent of the first. It is never observed; it is a device for the proof. Write $P'_nf=\frac1n\sum_if(Z'_i)$. Each $Z'_i$ has the distribution of $Z$, so $\mathbb E_{Z'}P'_nf=Pf$. Therefore, holding the real sample fixed,

$$Pf-P_nf=\mathbb E_{Z'}\bigl[P'_nf-P_nf\bigr].$$

*Step 2: supremum of an average is at most the average of the supremum.* For each fixed $\tilde f\in F$, $P'_n\tilde f-P_n\tilde f\le\sup_{f\in F}(P'_nf-P_nf)$ for every ghost sample. Averaging over $Z'$ preserves the inequality, so $\mathbb E_{Z'}[P'_n\tilde f-P_n\tilde f]\le\mathbb E_{Z'}\sup_f(P'_nf-P_nf)$. The right side does not depend on $\tilde f$, so we may take the supremum over $\tilde f$ on the left. Taking also the average over the real sample,

$$\mathbb E_Z\sup_{f\in F}(Pf-P_nf)\le\mathbb E_{Z,Z'}\sup_{f\in F}\frac1n\sum_{i=1}^n\bigl(f(Z'_i)-f(Z_i)\bigr).$$

*Step 3: swapping a pair changes nothing.* The pairs $(Z_i,Z'_i)$ are independent, and within a pair the two points are independent with the same distribution, so $(Z_i,Z'_i)$ and $(Z'_i,Z_i)$ have the same distribution. Fix any sign vector $s\in\{-1,+1\}^n$ and swap the two points of pair $i$ exactly when $s_i=-1$. The swapped samples have the same joint distribution as the originals, so the expectation above is unchanged. But the swap turns the $i$-th difference $f(Z'_i)-f(Z_i)$ into $s_i\bigl(f(Z'_i)-f(Z_i)\bigr)$. Since this holds for every $s$, it also holds on average over random signs $\sigma$ drawn independently of both samples. Writing $d_i(f)=f(Z'_i)-f(Z_i)$ and taking all expectations over $Z$, $Z'$ and $\sigma$,

$$\mathbb E\sup_{f}\frac1n\sum_i d_i(f)=\mathbb E\sup_{f}\frac1n\sum_i\sigma_i d_i(f).$$

*Step 4: split the supremum.* For any two families of numbers, $\sup_f(a_f+b_f)\le\sup_fa_f+\sup_fb_f$. With $a_f=\frac1n\sum_i\sigma_if(Z'_i)$ and $b_f=\frac1n\sum_i(-\sigma_i)f(Z_i)$,

$$\begin{aligned}&\mathbb E\sup_f\frac1n\sum_i\sigma_i d_i(f)\\&\quad\le\mathbb E\sup_f\frac1n\sum_i\sigma_if(Z'_i)\\&\qquad+\mathbb E\sup_f\frac1n\sum_i(-\sigma_i)f(Z_i).\end{aligned}$$

The first term is $\mathbb E_{Z'}\widehat{\mathfrak R}_n(F;Z'_{1:n})$. In the second, $-\sigma$ is again a vector of fair independent signs, so it is $\mathbb E_Z\widehat{\mathfrak R}_n(F;Z_{1:n})$. The ghost sample has the same distribution as the real one, so both terms are equal to $\mathbb E_Z\widehat{\mathfrak R}_n(F;Z_{1:n})$, which proves \ref{sym}.
:::

Three consequences matter for what follows.

- *The other direction.* Applying \ref{sym} to the class $-F=\{-f:f\in F\}$ bounds $\mathbb E\sup_f(P_nf-Pf)$. Flipping every sign is again a fair sign vector, so $\widehat{\mathfrak R}_n(-F)=\widehat{\mathfrak R}_n(F)$ and the same bound holds.
- *Absolute values.* Run the four steps with $|\cdot|$ around each average. Step 2 now also uses $|\mathbb E X|\le\mathbb E|X|$ (the size of an average is at most the average of the sizes), and Step 4 uses the triangle inequality $|a_f+b_f|\le|a_f|+|b_f|$ before taking suprema. The result is $\mathbb E_Z\sup_f|Pf-P_nf|\le2\,\mathbb E_Z\widehat{\mathfrak R}^{\,|\cdot|}_n(F)$, a bound on the expected uniform deviation \ref{unif-dev} itself.
- *High probability.* \ref{sym} controls an average over samples. Shalev-Shwartz and Ben-David's Theorem 26.5 (2014, §26.1, p. 328) converts it into a statement about the actual sample. If $|f(z)|\le c$ for all $f$ and $z$, then for $0<\delta<1$, with probability at least $1-\delta$ over the sample, every $f\in F$ satisfies $Pf-P_nf\le2\,\mathbb E_Z\widehat{\mathfrak R}_n(F)+c\sqrt{2\ln(2/\delta)/n}$. Here $\delta$ is a failure probability and $\ln$ is the natural logarithm. We recall only Theorem 26.5's statement. Its proof applies McDiarmid's inequality, which is stated in [[concentration]], to the uniform deviation; [[rademacher-properties]] carries out that step.

So a class with small Rademacher complexity cannot fit noise, and a class that cannot fit noise has a small uniform deviation. The next section computes the complexity for the class used most often.

### The linear class {#reasoning}

Let the data points be vectors $z\in\mathbb R^d$. A *linear* class with weight bound $B>0$ is

$$F_B=\bigl\{\,z\mapsto w^{\mathsf T}z\;:\;w\in\mathbb R^d,\ \lVert w\rVert_2\le B\,\bigr\}.$$

Each weight vector $w$ in the ball of radius $B$ gives one function. The norm is the Euclidean length $\lVert v\rVert_2=\sqrt{v^{\mathsf T}v}$.

::: theorem {#thm-linear} Linear-ball bound
For any fixed points $z_1,\dots,z_n\in\mathbb R^d$,

$$\begin{aligned}\widehat{\mathfrak R}_n(F_B;z_{1:n})&=\frac Bn\,\mathbb E_\sigma\Bigl\lVert\sum_{i=1}^n\sigma_iz_i\Bigr\rVert_2\\&\le\frac Bn\sqrt{\sum_{i=1}^n\lVert z_i\rVert_2^2}.\end{aligned} \label{lin-mid}$$

If, in addition, every point satisfies $\lVert z_i\rVert_2\le R$, then

$$\widehat{\mathfrak R}_n(F_B;z_{1:n})\le\frac{BR}{\sqrt n}. \label{lin}$$
:::

This is Lemma 26.10 of Shalev-Shwartz and Ben-David (2014, §26.2, p. 332), stated there for $B=1$ with the bound $\max_i\lVert z_i\rVert_2/\sqrt m$; scaling the weights by $B$ scales every value $w^{\mathsf T}z_i$, and so the complexity, by $B$.

::: proof
Fix a sign vector $\sigma$ and write $v_\sigma=\sum_{i=1}^n\sigma_iz_i$, a vector in $\mathbb R^d$.

*Step 1: linearity collects the signs.* $\sum_i\sigma_i\,w^{\mathsf T}z_i=w^{\mathsf T}\sum_i\sigma_iz_i=w^{\mathsf T}v_\sigma$. The supremum over the class is a supremum of one inner product.

*Step 2: the best weight points along $v_\sigma$ (duality).* By the Cauchy–Schwarz inequality, $w^{\mathsf T}v_\sigma\le\lVert w\rVert_2\lVert v_\sigma\rVert_2\le B\lVert v_\sigma\rVert_2$ for every allowed $w$. Equality is attained: if $v_\sigma\neq0$, take $w=Bv_\sigma/\lVert v_\sigma\rVert_2$, which has length $B$ and gives $w^{\mathsf T}v_\sigma=B\lVert v_\sigma\rVert_2$; if $v_\sigma=0$, every $w$ gives $0$. Hence

$$\sup_{\lVert w\rVert_2\le B}w^{\mathsf T}v_\sigma=B\lVert v_\sigma\rVert_2.$$

This identity, the largest inner product with a vector over a ball equals radius times length, is the "duality" of the Euclidean norm. Dividing by $n$ and averaging over $\sigma$ gives the equality in \ref{lin-mid}.

*Step 3: replace the average length by a root mean square (Jensen).* Let $X=\lVert v_\sigma\rVert_2$, a random number because $\sigma$ is random. Its variance is nonnegative: $\mathbb E[X^2]-(\mathbb EX)^2=\mathbb E\bigl[(X-\mathbb EX)^2\bigr]\ge0$. Hence

$$\mathbb E_\sigma\lVert v_\sigma\rVert_2\le\sqrt{\mathbb E_\sigma\lVert v_\sigma\rVert_2^2}.$$

This is Jensen's inequality for the concave function $\sqrt{\cdot}$: the square root of an average is at least the average of square roots. We make this move because the *squared* length expands into simple terms, while the length itself does not. Equality holds exactly when $\lVert v_\sigma\rVert_2$ is the same for every sign vector.

*Step 4: the cross terms cancel.* Expand the square:

$$\begin{aligned}\lVert v_\sigma\rVert_2^2&=\Bigl(\sum_i\sigma_iz_i\Bigr)^{\mathsf T}\Bigl(\sum_j\sigma_jz_j\Bigr)\\&=\sum_{i=1}^n\sigma_i^2\lVert z_i\rVert_2^2+\sum_{i\neq j}\sigma_i\sigma_j\,z_i^{\mathsf T}z_j.\end{aligned}$$

For $i\neq j$ the signs are independent with mean zero, so $\mathbb E[\sigma_i\sigma_j]=\mathbb E\sigma_i\,\mathbb E\sigma_j=0$, and every cross term averages to zero. Since $\sigma_i^2=1$, $\mathbb E_\sigma\lVert v_\sigma\rVert_2^2=\sum_i\lVert z_i\rVert_2^2$. Combining with Steps 2 and 3 gives the inequality in \ref{lin-mid}.

*Step 5: use the radius.* If every $\lVert z_i\rVert_2\le R$, then $\sum_i\lVert z_i\rVert_2^2\le nR^2$, and $\frac Bn\sqrt{nR^2}=\frac{BR}{\sqrt n}$, which is \ref{lin}.
:::

**What the rate means.** The sum $v_\sigma$ adds $n$ vectors of length at most $R$ with random signs. If the signs all agreed, its length could reach $nR$. Because they are random, the cross terms cancel on average and the typical length is only about $\sqrt n\,R$, as for a random walk. Dividing by $n$ leaves $R/\sqrt n$. In practice: quadrupling the number of independent samples halves the bound; doubling the weight radius $B$ or the data radius $R$ doubles it. The dimension $d$ does not appear at all, so the bound holds equally for a million features as long as the norms are controlled.

**Back to the two-point example.** The diagonal class of \ref{ex-toy} is the linear class with $d=1$, $B=1$ and both points equal to $z_1=z_2=1$, so $R=1$. The bound \ref{lin} gives $1/\sqrt2\approx0.707$, while the exact value is $\tfrac12$. All the loss is in Step 3: $\lvert\sigma_1+\sigma_2\rvert$ is $2$ or $0$, so its mean is $1$ while its root mean square is $\sqrt2$.

**When the bound is exact.** If $z_1,\dots,z_n$ are orthonormal (unit length and mutually perpendicular, possible when $n\le d$), then $\lVert v_\sigma\rVert_2^2=n$ for every sign vector, Step 3 holds with equality and $\widehat{\mathfrak R}_n=B/\sqrt n$ exactly. So the $1/\sqrt n$ rate cannot be improved without further assumptions on the data.

From the linear class one reaches loss classes, such as a Lipschitz loss composed with a linear predictor, by the composition rules in [[rademacher-properties]]; that step is not needed here.

### Conventions and assumptions {#assumptions}

Different sources attach the name "Rademacher complexity" to different quantities. For the same class $F$ they are ordered, but not equal, so every bound must be read with its own convention.

- **(a) Signed empirical** $\widehat{\mathfrak R}_n(F;Z_{1:n})$, equation \ref{rad}: the observed sample is held fixed, and the supremum is taken of the signed average $\frac1n\sum_i\sigma_if(Z_i)$.
- **(a′) Absolute empirical** $\widehat{\mathfrak R}^{\,|\cdot|}_n(F;Z_{1:n})$, equation \ref{rad-abs}: the same fixed sample, with the absolute value of that average.
- **(b) Expected** $\mathbb E_Z\widehat{\mathfrak R}_n(F;Z_{1:n})$: the signed version, averaged over random samples.
- **(c) Worst-case absolute** $\mathfrak R_n(F)$: the absolute version on the worst possible sample.

Convention (c) is the one used by Boffi, Tu, Matni, Slotine and Sindhwani, *Learning Stability Certificates from Data*, arXiv:2008.05952v2, p. 6, where it is defined inside the statement of their Lemma 4.1. In our notation,

$$\begin{aligned}\mathfrak R_n(F)={}&\sup_{z_1,\dots,z_n\in\mathcal Z}\ \mathbb E_\sigma\Bigl[\,\sup_{f\in F}\\&\qquad\Bigl|\frac1n\sum_{i=1}^n\sigma_if(z_i)\Bigr|\Bigr].\end{aligned} \label{rad-wc}$$

They write $\varepsilon$ for the signs and index the class by a certificate $V$; their data points are initial states $\xi$ and their functions are trajectory residuals $\xi\mapsto h(\xi,V)$. In this atlas the plain symbol $\mathfrak R_n$ is reserved for \ref{rad-wc}, as in [[boffi-lemma-4-1]].

**The ordering.** For any class and any sample:

- (a) $\le$ (a′), because $x\le|x|$ for every number, and the inequality survives the supremum and the average over signs.
- (a′) $\le$ (c), because the observed sample is one of the samples over which \ref{rad-wc} takes its supremum.
- (b) $\le$ (c), because (b) averages (a) over samples, and an average is at most the largest value: (a) $\le$ (a′) $\le$ (c) for every sample.

So \ref{rad-wc} upper-bounds the other conventions for the same class. The reverse fails: the single function of \ref{toy} has (a) $=0$ but (a′) $=\tfrac12$.

**When signed and absolute agree.** If the class is symmetric, meaning $-f\in F$ whenever $f\in F$, then (a) $=$ (a′). Indeed, for each sign vector, $\bigl|\sum_i\sigma_if(Z_i)\bigr|$ equals either $\sum_i\sigma_if(Z_i)$ or $\sum_i\sigma_i(-f)(Z_i)$, and both members are in the class. The diagonal class and every linear ball $F_B$ are symmetric.

**Why the certificate lemma needs its own convention.** Lemma 4.1 of Boffi et al. bounds a failure probability by an expression containing $\mathfrak R_n(\mathcal V)^2$, the worst-case absolute quantity \ref{rad-wc}. Because (c) is the largest convention, a bound on (a) or (b) does not supply what the lemma needs; one must bound (c) itself. That is a bound valid for every possible sample, not only typical ones, and with absolute values. The linear calculation passes this test. \ref{lin} holds for *every* sample with $\lVert z_i\rVert_2\le R$, and $F_B$ is symmetric. So, with $\mathcal Z$ the ball of radius $R$, $\mathfrak R_n(F_B)\le BR/\sqrt n$ as well. This lesson does not prove Lemma 4.1; its statement and premises are in [[boffi-lemma-4-1]].

**Assumptions used in this lesson.**

- The sample consists of independent draws from one distribution (symmetrization and Theorem 26.5). The linear bound \ref{lin-mid} needs no assumption on the sample at all: it holds for any fixed points.
- The signs are independent of each other and of the sample, each fair. Step 4 of the linear proof uses exactly independence and mean zero.
- Suprema are well-defined random variables. This holds for the classes here (countable, or continuously parametrized), and is assumed rather than discussed for general classes.
- For the high-probability bound, a uniform range $|f|\le c$.

### Try the class {#experiment}

::: figure {#fig-signs}
{{learning signs}}
Monte Carlo estimate of the signed empirical complexity of a 17-member linear class on one pinned sample. The slider sets $n$; the dots show the last of 400 sign draws, at horizontal position $x_i$ and drawn above the axis for $\sigma_i=+1$ and below for $\sigma_i=-1$.
:::

**What it computes.** The data are numbers $x_1,\dots,x_n$, drawn uniform on $[-1,1]$ from the atlas's seeded generator with seed $7$. The slider sets $n$ from $4$ to $128$ in steps of $4$. The class is $\{x\mapsto wx:w\in W\}$ with the 17 weights $W=\{-1,-\tfrac78,\dots,\tfrac78,1\}$. With the sample held fixed, the demo draws 400 sign vectors from the continuing generator stream. For each draw $t$ it computes $\max_{w\in W}\frac1n\sum_i\sigma^{(t)}_iwx_i$. The readout is the average of these 400 maxima, to four decimals.

**Sampling unit and settings.** The unit of randomness is a sign draw; the sample is drawn once and pinned. Moving the slider re-runs the generator from seed 7, so the sample for $n$ consists of the first $n$ numbers of the stream, followed by fresh sign draws. The readout is therefore an estimate of (a), on one sample, for one class. It is not the expected complexity (b), which would also average over samples.

**Finite class versus the interval.** The objective $w\cdot\frac1n\sum_i\sigma_ix_i$ is linear in $w$, so its maximum over $[-1,1]$ is attained at $w=1$ or $w=-1$, and both are in $W$. Draw by draw, the maximum over the 17 weights therefore equals the maximum over the whole interval, namely $\frac1n\bigl|\sum_i\sigma_ix_i\bigr|$. The remaining error is Monte Carlo error from using 400 draws instead of all $2^n$ sign vectors.

::: question
Predict before moving the slider. The bound \ref{lin} with $B=1$ and $R=1$ (every $|x_i|\le1$) is $1/\sqrt n$. What should happen to the readout when $n$ is multiplied by four, for example from 8 to 32, or from 32 to 128? Should the readout be close to $1/\sqrt n$, or below it?
---
Roughly halved, and clearly below $1/\sqrt n$. The tables below list what the engine produces. From 8 to 32 the readout goes from 0.1701 to 0.0832; from 32 to 128 it goes from 0.0832 to 0.0439, both close to a factor of two. From 4 to 16 the drop is larger (0.3420 to 0.1073) because the four-point sample happens to contain three points with $|x_i|>0.87$, which makes its complexity unusually large. For $n\ge8$ the readout stays near half the radius bound (at $n=4$ it is $0.68$ of it), for two reasons. First, a uniform point has $\mathbb E x^2=\tfrac13$, so $\sum_ix_i^2$ is near $n/3$, not $nR^2=n$. Second, Step 3 loses a little: the mean of $|\sum_i\sigma_ix_i|$ is below its root mean square.
:::

The first table compares the readout with the exact value on the same sample, found by enumerating all $2^n$ sign vectors (feasible here for $n\le16$). The standard error is the sample standard deviation of the 400 maxima divided by $\sqrt{400}$.

| $n$ | readout | std. error | exact |
| --- | --- | --- | --- |
| 4 | 0.3420 | 0.011 | 0.3508 |
| 8 | 0.1701 | 0.0061 | 0.1795 |
| 16 | 0.1073 | 0.0038 | 0.1099 |
| 32 | 0.0832 | 0.0030 | — |
| 64 | 0.0578 | 0.0022 | — |
| 128 | 0.0439 | 0.0016 | — |

The second table gives the two bounds on the same samples: the sample bound $\frac1n\sqrt{\sum_ix_i^2}$ from \ref{lin-mid}, and the radius bound $1/\sqrt n$ from \ref{lin}.

| $n$ | readout | sample bound | radius bound |
| --- | --- | --- | --- |
| 4 | 0.3420 | 0.4175 | 0.5000 |
| 8 | 0.1701 | 0.2202 | 0.3536 |
| 16 | 0.1073 | 0.1362 | 0.2500 |
| 32 | 0.0832 | 0.0995 | 0.1768 |
| 64 | 0.0578 | 0.0725 | 0.1250 |
| 128 | 0.0439 | 0.0525 | 0.0884 |

The readouts are the values the demo displays; the other columns are computed from the same pinned samples. Each exact value lies within about 1.5 standard errors of its readout, and every readout is below both bounds, as the theorem requires of the exact values.

**Limits.** This experiment illustrates the theorem; it does not prove it. It is one pinned sample per $n$, one distribution of points, and a finite number of sign draws, so the readouts carry Monte Carlo error. The theorem holds for every sample and every $n$; the demo checks a few of them. It measures the complexity of a function class, not a learned model's error, and it says nothing about the extra factor $2$ and confidence term in Theorem 26.5.

### Exercises {#exercises}

::: question
**Enumeration.** Let $n=2$ and let the class consist of two functions with value vectors $(1,1)$ and $(1,-1)$ on the sample. Compute the signed complexity \ref{rad} and the absolute version \ref{rad-abs} by listing all four sign vectors.
---
For each $\sigma$ compute $\frac12(\sigma_1+\sigma_2)$ and $\frac12(\sigma_1-\sigma_2)$ and take the larger. $(+,+)$: $\max(1,0)=1$. $(+,-)$: $\max(0,1)=1$. $(-,+)$: $\max(0,-1)=0$. $(-,-)$: $\max(-1,0)=0$. The signed complexity is $\tfrac14(1+1+0+0)=\tfrac12$. With absolute values the four suprema are $1,1,1,1$, so the absolute version is $1$. The class is not symmetric (it does not contain $(-1,-1)$ or $(-1,1)$), which is why the two conventions differ.
:::

::: question
**More points.** For the diagonal class with $n$ points all equal to $z=1$ (so $f_w(Z_i)=w$, $|w|\le1$), compute $\widehat{\mathfrak R}_n$ exactly for $n=3$ and $n=4$, and compare with $1/\sqrt n$.
---
The supremum is $\frac1n|\sigma_1+\dots+\sigma_n|$. For $n=3$, two of the eight sign vectors give sum $\pm3$ and six give $\pm1$, so $\widehat{\mathfrak R}_3=\frac13\cdot\frac{2\cdot3+6\cdot1}{8}=\frac12$, below $1/\sqrt3\approx0.577$. For $n=4$, two of sixteen give $\pm4$, eight give $\pm2$ and six give $0$, so $\widehat{\mathfrak R}_4=\frac14\cdot\frac{2\cdot4+8\cdot2}{16}=\frac38$, below $1/\sqrt4=0.5$.
:::

::: question
**Order of operations.** For the diagonal class on two points, compute $\sup_{|w|\le1}\mathbb E_\sigma\bigl[\tfrac12(\sigma_1w+\sigma_2w)\bigr]$ and compare it with $\widehat{\mathfrak R}_2=\tfrac12$. Which order corresponds to a learner that chooses after seeing the data, and why?
---
For each fixed $w$ the average over signs is $\tfrac w2(\mathbb E\sigma_1+\mathbb E\sigma_2)=0$, so the supremum is $0$. The definition puts the supremum inside the expectation, giving $\tfrac12$. A learner who chooses after seeing the data corresponds to choosing after seeing the signs, the inner supremum. Choosing first and then averaging can never fit noise, so it cannot detect overfitting.
:::

::: question
**A linear bound with numbers.** Feature vectors satisfy $\lVert z\rVert_2\le3$ and weights are restricted to $\lVert w\rVert_2\le2$. How large must $n$ be for \ref{lin} to guarantee $\widehat{\mathfrak R}_n\le0.1$ on every sample? What does \ref{sym} then give for $\mathbb E_Z\sup_f(Pf-P_nf)$?
---
We need $BR/\sqrt n=6/\sqrt n\le0.1$, that is $\sqrt n\ge60$, so $n\ge3600$. Since the bound holds on every sample, it holds on average, and \ref{sym} gives $\mathbb E_Z\sup_f(Pf-P_nf)\le2\times0.1=0.2$.
:::

::: question
**When Jensen is tight.** Take $n=2$, $B=1$. Compute $\widehat{\mathfrak R}_2(F_1)$ exactly using the equality in \ref{lin-mid}, first for $z_1=(1,0)$, $z_2=(0,1)$ and then for $z_1=z_2=(1,0)$. Compare each with $\frac12\sqrt{\lVert z_1\rVert^2+\lVert z_2\rVert^2}$.
---
Orthogonal points: $\lVert\sigma_1z_1+\sigma_2z_2\rVert_2=\sqrt2$ for every sign vector, so $\widehat{\mathfrak R}_2=\frac{\sqrt2}{2}\approx0.707$, equal to the bound $\frac12\sqrt2$. Equal points: the length is $|\sigma_1+\sigma_2|\in\{2,0\}$ with mean $1$, so $\widehat{\mathfrak R}_2=\frac12$, below the bound $0.707$. Jensen's step is exact when the length does not depend on the signs.
:::

::: question
**Conventions.** A colleague proves $\mathbb E_Z\widehat{\mathfrak R}_n(F)\le C/\sqrt n$ for a residual class and wants to substitute it into Lemma 4.1 of Boffi et al. What is missing? What extra facts would make the substitution valid for a linear ball?
---
Lemma 4.1 uses the worst-case absolute quantity \ref{rad-wc}, which is at least as large as the expected signed one. An average-case signed bound does not bound it: the worst sample can be larger than the average, and absolute values can be larger than signed values (the single function: $0$ versus $\tfrac12$). For a linear ball both gaps close. The bound \ref{lin} holds for every sample in the radius-$R$ ball, and the class is symmetric, so signed equals absolute. Hence $\mathfrak R_n(F_B)\le BR/\sqrt n$.
:::

### Where it is used {#uses}

[[covering-dudley]] bounds the complexity of classes that are not linear balls by approximating them at many scales. [[rademacher-properties]] gives the rules for sums, scalings and Lipschitz compositions, and the concentration step behind high-probability bounds. [[boffi-lemma-4-1]] consumes the worst-case absolute convention \ref{rad-wc} for certificate residuals.

## Card

### Idea {#idea}

Fix the sample. Draw independent fair signs $\sigma_i\in\{-1,+1\}$. Let the class pick its best member *after* seeing the signs, and average:

$$\widehat{\mathfrak R}_n(F;Z_{1:n})=\mathbb E_\sigma\sup_{f\in F}\frac1n\sum_{i=1}^n\sigma_if(Z_i).$$

A large value means the class can follow pure noise on this sample. Symmetrization turns this into control of the worst sample-versus-population gap: $\mathbb E\sup_f(Pf-P_nf)\le2\,\mathbb E_Z\widehat{\mathfrak R}_n(F)$ (Shalev-Shwartz and Ben-David 2014, Lemma 26.2).

### Smallest example {#toy}

Two points, values $(w,w)$ with $|w|\le1$: the supremum is $\tfrac12|\sigma_1+\sigma_2|$, which is $1,0,0,1$ over the four sign vectors, so $\widehat{\mathfrak R}_2=\tfrac12$. The full square $[-1,1]^2$ gives $1$. A single function gives $0$ signed but $\tfrac12$ with absolute values.

### Linear ball {#linear}

For $f_w(z)=w^{\mathsf T}z$ with $\lVert w\rVert_2\le B$ and $\lVert z_i\rVert_2\le R$:

$$\widehat{\mathfrak R}_n=\frac Bn\,\mathbb E\Bigl\lVert\sum_i\sigma_iz_i\Bigr\rVert_2\le\frac Bn\sqrt{\sum_i\lVert z_i\rVert_2^2}\le\frac{BR}{\sqrt n}.$$

The three moves are Cauchy–Schwarz with its equality case, Jensen ($\mathbb EX\le\sqrt{\mathbb EX^2}$), and $\mathbb E\sigma_i\sigma_j=0$ for $i\neq j$. Four times the samples halves the bound; the dimension does not enter.

### Conventions {#conventions}

Signed empirical $\le$ absolute empirical $\le$ worst-case absolute; expected $\le$ worst-case absolute. They coincide in pairs only under conditions: signed equals absolute for a symmetric class ($-F=F$). Boffi et al. (arXiv:2008.05952v2, p. 6) use the worst-case absolute version $\mathfrak R_n$, and their Lemma 4.1 needs a bound on that quantity.

### Pitfalls {#pitfalls}

- Putting the supremum outside the expectation gives $0$ for every class.
- The demo estimates one sample's complexity with 400 sign draws; it is not an average over samples and not a proof.
- $n$ counts independent draws, such as independent trajectories, never correlated time steps.
- A bound in one convention does not transfer to a larger convention.

### Check yourself {#check}

::: question
Why is the supremum inside the expectation over signs?
---
The class must choose after seeing the noise, just as ERM chooses after seeing the data. Chosen beforehand, any fixed function averages to $0$ against fair signs.
:::

::: question
Points in the unit ball, weights with $\lVert w\rVert_2\le1$, $n=400$. What is the linear bound?
---
$BR/\sqrt n=1/20=0.05$.
:::

::: question
Give a class whose signed and absolute complexities differ.
---
A single function $f\equiv1$ on two points: signed $0$, absolute $\tfrac12$.
:::

### Where it is used {#uses}

[[covering-dudley]], [[rademacher-properties]], [[boffi-lemma-4-1]].
