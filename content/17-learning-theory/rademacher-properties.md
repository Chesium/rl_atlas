+++
summary = "Symmetrization, scaling and Lipschitz composition control the complexity of transformed classes."
prereqs = ["rademacher-complexity", "concentration"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 26", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### Transformed classes {#motivation}

Learning rarely uses a class exactly as it was analysed. A loss is applied to a prediction, a certificate is rescaled, a constant is added, two families are summed. [[rademacher-complexity]] computed the random-sign complexity of a linear ball. This lesson asks what happens to that number when the class is transformed, and it finishes the passage from complexity to a high-probability guarantee. Every rule below depends on the *convention* in use, so we restate the conventions first.

**Objects recalled from [[rademacher-complexity]].** The sample $z_1,\dots,z_n$ is fixed. A class $F$ of real functions gives the value set $A=\{(f(z_1),\dots,f(z_n)):f\in F\}\subset\mathbb R^n$. The signs $\sigma_1,\dots,\sigma_n$ are independent and fair, and for a vector $a\in\mathbb R^n$ we write $S_\sigma(a)=\frac1n\sum_i\sigma_ia_i$. Since only the value set matters, we write complexities of sets of vectors.

- **Signed:** $\widehat{\mathfrak R}(A)=\mathbb E_\sigma\sup_{a\in A}S_\sigma(a)$. This is $\widehat{\mathfrak R}_n(F;z_{1:n})$ of [[rademacher-complexity]]: sample fixed first, signs second, supremum third.
- **Absolute:** $\widehat{\mathfrak R}^{|\cdot|}(A)=\mathbb E_\sigma\sup_{a\in A}|S_\sigma(a)|$.
- **Worst-case absolute** (Boffi et al.): the absolute version maximized over all samples, $\mathfrak R_n(F)=\sup_{z_{1:n}}\widehat{\mathfrak R}^{|\cdot|}(A)$. A rule for the absolute version that holds on every sample carries over to it.

The hat marks a fixed sample, as in [[covering-dudley]]; the plain $\mathfrak R_n$ stays reserved for the worst-case absolute convention. We also write $\lVert a\rVert_n=\sqrt{\tfrac1n\sum_ia_i^2}$ for the root-mean-square size of a vector, and $\log$ for the natural logarithm.

**The running example.** The diagonal class has value vectors $(w,w)$, $|w|\le1$, on two points. Its supremum for a sign vector is $\tfrac12|\sigma_1+\sigma_2|$, with values $1,0,0,1$, so both its signed and absolute complexities are $\tfrac12$. It is symmetric ($-A=A$), which is why the two agree. Each rule below is tested on it.

### Calculation rules {#statement}

::: theorem {#thm-rules} Rules for the signed complexity
Let $A,A'\subset\mathbb R^n$ be bounded, $b\in\mathbb R^n$ a fixed vector and $c$ a real number.

1. **Monotone:** if $A\subset A'$ then $\widehat{\mathfrak R}(A)\le\widehat{\mathfrak R}(A')$.
2. **Translation:** $\widehat{\mathfrak R}(A+b)=\widehat{\mathfrak R}(A)$, where $A+b=\{a+b:a\in A\}$.
3. **Scaling:** $\widehat{\mathfrak R}(cA)=|c|\,\widehat{\mathfrak R}(A)$.
4. **Sums:** $\widehat{\mathfrak R}(A+A')\le\widehat{\mathfrak R}(A)+\widehat{\mathfrak R}(A')$, where $A+A'=\{a+a':a\in A,\ a'\in A'\}$.
5. **Convex hull:** $\widehat{\mathfrak R}(\operatorname{conv}A)=\widehat{\mathfrak R}(A)$, where $\operatorname{conv}A$ is the set of all finite averages $\sum_j\lambda_ja^{(j)}$ with $a^{(j)}\in A$, $\lambda_j\ge0$ and $\sum_j\lambda_j=1$.

For the absolute version, rules 1, 3, 4 and 5 hold as stated, but rule 2 does not. In its place,
$$\widehat{\mathfrak R}^{|\cdot|}(A+b)\le\widehat{\mathfrak R}^{|\cdot|}(A)+\frac{\lVert b\rVert_n}{\sqrt n}. \label{abs-shift}$$
:::

Shalev-Shwartz and Ben-David state rules 2–3 as an inequality in Lemma 26.6 and rule 5 as Lemma 26.7 (2014, §26.1.1, pp. 329–330, PDF pp. 347–348), for the signed convention.

::: proof
*Rule 1.* A supremum over a larger set is at least as large, sign vector by sign vector; average over signs.

*Rule 2.* $S_\sigma$ is linear, so $S_\sigma(a+b)=S_\sigma(a)+S_\sigma(b)$. The second term does not depend on $a$, so it comes out of the supremum: $\sup_aS_\sigma(a+b)=\sup_aS_\sigma(a)+S_\sigma(b)$. Averaging, $\mathbb E_\sigma S_\sigma(b)=\frac1n\sum_ib_i\,\mathbb E\sigma_i=0$, because $b$ is fixed and each sign has mean zero.

*Rule 3.* For $c>0$, $\sup_aS_\sigma(ca)=c\sup_aS_\sigma(a)$. For $c=0$ both sides are $0$. For $c<0$, $S_\sigma(ca)=|c|\,S_{-\sigma}(a)$, and $-\sigma$ is again a vector of independent fair signs, so it has the same average.

*Rule 4.* For each sign vector, $\sup_{a,a'}\bigl(S_\sigma(a)+S_\sigma(a')\bigr)\le\sup_aS_\sigma(a)+\sup_{a'}S_\sigma(a')$; average.

*Rule 5.* $A\subset\operatorname{conv}A$ gives $\ge$. For the reverse, $S_\sigma\bigl(\sum_j\lambda_ja^{(j)}\bigr)=\sum_j\lambda_jS_\sigma(a^{(j)})$ is an average of numbers each at most $\sup_{a\in A}S_\sigma(a)$, so it is at most that supremum.

*Absolute version.* Rules 1 and 4 use only suprema and the triangle inequality $|x+y|\le|x|+|y|$. Rule 3: $|S_\sigma(ca)|=|c|\,|S_\sigma(a)|$. Rule 5: $|S_\sigma|$ of an average is at most the average of $|S_\sigma|$ by the triangle inequality. For \ref{abs-shift}, $|S_\sigma(a+b)|\le|S_\sigma(a)|+|S_\sigma(b)|$, and by Jensen's inequality and $\mathbb E\sigma_i\sigma_j=0$ for $i\ne j$,
$$\mathbb E_\sigma|S_\sigma(b)|\le\sqrt{\mathbb E_\sigma S_\sigma(b)^2}=\sqrt{\tfrac1{n^2}\textstyle\sum_ib_i^2}=\frac{\lVert b\rVert_n}{\sqrt n}.$$
The shift is no longer free because $|S_\sigma(b)|$ does not average to zero.
:::

**The fixed nonzero function.** Take $A=\{b\}$, a single fixed vector. The signed complexity is $\mathbb E_\sigma S_\sigma(b)=0$: one function cannot follow noise. The absolute complexity is $\mathbb E_\sigma|S_\sigma(b)|$, which is positive whenever $b\ne0$, since some sign vector makes $S_\sigma(b)\ne0$. For $b=(1,\dots,1)$ it is $\mathbb E|\sigma_1+\dots+\sigma_n|/n$: exactly $\tfrac12$ at $n=2$, $0.375$ at $n=4$ and $0.0796$ at $n=100$, close to $\sqrt{2/(\pi n)}$ and below the bound $1/\sqrt n$ of \ref{abs-shift}. The absolute convention charges a class for where it sits, not only for how much it can bend.

**A class containing zero.** If $0\in A$, the absolute version costs at most a factor $2$ over the signed one:
$$\widehat{\mathfrak R}^{|\cdot|}(A)\le2\,\widehat{\mathfrak R}(A)\qquad\text{when }0\in A. \label{zero-member}$$
Indeed $\sup_a|S_\sigma(a)|=\max\{\sup_aS_\sigma(a),\sup_aS_\sigma(-a)\}$, both suprema are at least $S_\sigma(0)=0$, so the maximum is at most their sum, and each averages to $\widehat{\mathfrak R}(A)$ (the second by the sign flip of rule 3). For any member $a_0$ of $A$, write $A=(A-a_0)+a_0$: the shifted set $A-a_0$ contains $0$, so \ref{zero-member} applies to it, its signed complexity equals $\widehat{\mathfrak R}(A)$ by rule 2, and \ref{abs-shift} pays for adding back $a_0$. This gives $\widehat{\mathfrak R}^{|\cdot|}(A)\le\lVert a_0\rVert_n/\sqrt n+2\widehat{\mathfrak R}(A)$. [[covering-dudley]] uses exactly this to pass from its signed chaining bound to the convention of Boffi et al.

### The scalar contraction lemma {#reasoning}

The most used rule says that applying a Lipschitz function to every value cannot increase the signed complexity by more than the Lipschitz constant. For $i=1,\dots,n$ let $\ell_i:\mathbb R\to\mathbb R$ satisfy
$$|\ell_i(s)-\ell_i(t)|\le L\,|s-t|\quad\text{for all }s,t\in\mathbb R,$$
and write $\ell\circ A=\{(\ell_1(a_1),\dots,\ell_n(a_n)):a\in A\}$. We write $\ell_i$ because the typical use is a loss: $\ell_i(t)=\ell(t,y_i)$ is the loss of the prediction $t$ against the label $y_i$ of the $i$th sample point, and $\ell\circ A$ is the loss class of a predictor class. The map may differ from point to point, but each acts on one real number.

::: theorem {#thm-contraction} Contraction lemma (signed convention)
For every bounded $A\subset\mathbb R^n$,
$$\widehat{\mathfrak R}(\ell\circ A)\le L\,\widehat{\mathfrak R}(A). \label{contraction}$$
No condition $\ell_i(0)=0$ is needed, and $L$ may be larger than $1$. The proof uses the Lipschitz inequality only at values that members of $A$ actually take, so it is enough for it to hold there; for example $t\mapsto t^2$ is $2$-Lipschitz on $[-1,1]$.
:::

This is Lemma 26.9 of Shalev-Shwartz and Ben-David (2014, pp. 331–332, PDF pp. 349–350), whose proof they credit to Kakade and Tewari. They prove it for $L=1$ and rescale; the argument below carries $L$ throughout. The word "contraction" refers to the Lipschitz map, not to a shrinking complexity, and it is unrelated to physical contraction of trajectories ([[three-contractions]]).

::: proof
*Idea.* Replace one coordinate at a time. We show that replacing $\ell_j(a_j)$ by $La_j$ in coordinate $j$, while every other coordinate is left as it is, cannot decrease the average supremum. After $n$ replacements every coordinate is $La_i$, and the average supremum is $L\,\widehat{\mathfrak R}(A)$ by rule 3.

*Setting up one step.* Fix the coordinate $j$. Every term other than the $j$th forms a quantity $T(a)$ that depends on $a$ and on the other signs, but not on $\sigma_j$. At the first step $T(a)=\sum_{i\ne j}\sigma_i\ell_i(a_i)$; at later steps some coordinates of $T$ have already been replaced by $\sigma_iLa_i$. We fix the other signs and show
$$\mathbb E_{\sigma_j}\sup_{a\in A}\bigl[\sigma_j\ell_j(a_j)+T(a)\bigr]\le\mathbb E_{\sigma_j}\sup_{a\in A}\bigl[\sigma_jLa_j+T(a)\bigr]. \label{one-coordinate}$$
Averaging over the other signs then gives the step.

*Average over the one sign.* $\sigma_j$ is $+1$ or $-1$ with probability $\tfrac12$ each, so the left side of \ref{one-coordinate} is
$$\tfrac12\sup_{a\in A}\bigl[\ell_j(a_j)+T(a)\bigr]+\tfrac12\sup_{a'\in A}\bigl[-\ell_j(a'_j)+T(a')\bigr].$$

*Combine the two suprema.* The two suprema run over separate variables $a$ and $a'$, so their sum is one supremum over pairs:
$$\tfrac12\sup_{a,a'\in A}\bigl[\ell_j(a_j)-\ell_j(a'_j)+T(a)+T(a')\bigr].$$

*Use the Lipschitz property.* $\ell_j(a_j)-\ell_j(a'_j)\le L|a_j-a'_j|$, so the expression is at most
$$\tfrac12\sup_{a,a'\in A}\bigl[L|a_j-a'_j|+T(a)+T(a')\bigr].$$

*Remove the absolute value.* The part $T(a)+T(a')$ does not change if we exchange $a$ and $a'$. So for each pair, the bracket with $L|a_j-a'_j|$ equals the bracket with $L(a_j-a'_j)$ for the pair taken in the order that makes $a_j\ge a'_j$. The supremum over all ordered pairs therefore sees the same values:
$$\tfrac12\sup_{a,a'\in A}\bigl[La_j-La'_j+T(a)+T(a')\bigr].$$
This step is where the signed structure is essential: the absolute value disappears without a cost because the pair can be relabelled.

*Split again.* This supremum is a sum of a supremum over $a$ and one over $a'$:
$$\tfrac12\sup_{a\in A}\bigl[La_j+T(a)\bigr]+\tfrac12\sup_{a'\in A}\bigl[-La'_j+T(a')\bigr],$$
which is the right side of \ref{one-coordinate} written out over the two values of $\sigma_j$.

*Repeat.* Apply this for $j=1$, then $j=2$ with coordinate $1$ already replaced, and so on to $j=n$. Each step can only increase the average supremum. At the end the average supremum is $\mathbb E_\sigma\sup_a\frac1n\sum_i\sigma_iLa_i=L\,\widehat{\mathfrak R}(A)$. The bounded set $A$ makes every supremum finite.
:::

**Offsets cost nothing in this convention.** Write $\ell_i(t)=\ell_i(0)+\tilde\ell_i(t)$. The constant vector $(\ell_1(0),\dots,\ell_n(0))$ is a fixed $b$, so by rule 2 it does not change the signed complexity. That is why the lemma needs no $\ell_i(0)=0$. Shalev-Shwartz and Ben-David use the signed convention throughout Chapter 26, and their lemma is stated without this condition.

::: example {#ex-contraction} Contractions of the diagonal class
On the diagonal class, $\widehat{\mathfrak R}(A)=\tfrac12$.

- $\ell(t)=2t$, $L=2$: the class becomes $(2w,2w)$, with complexity $1=2\cdot\tfrac12$. The bound is attained, and "contraction" here doubles the complexity, because $L=2$.
- $\ell(t)=|t|$, $L=1$: the values $(|w|,|w|)$ lie in $[0,1]$, the supremum for a sign vector is $\max\{0,\tfrac12(\sigma_1+\sigma_2)\}$, with values $1,0,0,0$. The complexity is $\tfrac14\le\tfrac12$.
- $\ell(t)=t^2$ on values in $[-1,1]$, where it is $2$-Lipschitz: again $\tfrac14$, well below $2\cdot\tfrac12=1$.
- $\ell(t)=2t+5$: the offset $5$ disappears and the complexity is $1=2\cdot\tfrac12$.

Replacing only the first coordinate by $|a_1|$, the intermediate set $\{(|w|,w)\}$ has complexity $\tfrac12$, consistent with the one-coordinate step.
:::

### Offsets and the absolute convention {#absolute}

The proof above fails for $\mathfrak R^{|\cdot|}$ at the step that removed the absolute value: the pair can no longer be relabelled freely, because $|x+y|$ is not linear. And offsets do cost something, by \ref{abs-shift}.

**A failure.** Take $\ell(t)=2t+5$ on the diagonal class, so $L=2$. The new class has values $(2w+5,2w+5)$ with $2w+5\in[3,7]$. Its absolute supremum for a sign vector is $\tfrac12|\sigma_1+\sigma_2|\cdot7$, with values $7,0,0,7$, so $\widehat{\mathfrak R}^{|\cdot|}(\ell\circ A)=3.5$. But $L\,\widehat{\mathfrak R}^{|\cdot|}(A)=1$. Even twice that, $2$, is too small. The whole excess is the offset: split $\ell=5+\tilde\ell$ with $\tilde\ell(t)=2t$. The triangle-inequality step in the proof of \ref{abs-shift}, with the exact offset term $\mathbb E_\sigma|S_\sigma(b)|=5\cdot\mathbb E|\sigma_1+\sigma_2|/2=2.5$, gives $\widehat{\mathfrak R}^{|\cdot|}(\tilde\ell\circ A)+2.5=1+2.5=3.5$, which is exact here. The displayed bound \ref{abs-shift} replaces $2.5$ by $\lVert b\rVert_n/\sqrt n=5/\sqrt2\approx3.54$ and gives about $4.54$, still valid but not tight.

**What does hold.** If $\ell_i(0)=0$ for every $i$ and $0\in A$, then $0\in\ell\circ A$, and \ref{zero-member} with \ref{contraction} gives
$$\widehat{\mathfrak R}^{|\cdot|}(\ell\circ A)\le2\,\widehat{\mathfrak R}(\ell\circ A)\le2L\,\widehat{\mathfrak R}(A)\le2L\,\widehat{\mathfrak R}^{|\cdot|}(A).$$
With an offset, add the offset term of \ref{abs-shift}. The classical absolute-value contraction inequality also needs $\ell_i(0)=0$ and also carries a factor $2$: Ledoux and Talagrand, *Probability in Banach Spaces* (1991), Theorem 4.12, as invoked by Boffi et al. (arXiv:2008.05952v2, Appendix B.3, p. 21). That book is not available locally, so we recall the citation and rely on the derived inequality above. In short: before quoting a contraction factor, state the convention, whether $\ell_i(0)=0$, and whether the class contains zero.

### Vector-valued composition {#vector}

Sometimes each sample point produces a vector, not a number. In [[boffi-thm-4-4]] a certificate gradient $\nabla V(x)\in\mathbb R^p$ enters the residual, and the random-feature proof composes a vector-valued feature with a Lipschitz map. Formally, each member gives vectors $a_i\in\mathbb R^m$ and is mapped to the numbers $\ell_i(a_i)$, where $\ell_i:\mathbb R^m\to\mathbb R$ satisfies $|\ell_i(s)-\ell_i(t)|\le L\lVert s-t\rVert_2$.

**Why the scalar proof does not carry over.** Run the one-coordinate step with a vector $a_j$. The Lipschitz step now gives $L\lVert a_j-a'_j\rVert_2$. In the scalar proof $L|a_j-a'_j|$ became the *linear* expression $L(a_j-a'_j)$ by relabelling the pair, and a linear expression is again a sign-weighted average. A Euclidean length is not linear. It equals the largest of the linear expressions $u^{\mathsf T}(a_j-a'_j)$ over unit vectors $u$, and the best $u$ changes from pair to pair, so no single linear expression can be put back. Nor can the scalar lemma be applied coordinate by coordinate: $\ell_i$ mixes the coordinates of $a_i$, so it is not a list of scalar maps, one per coordinate.

**What is invoked instead.** Maurer's vector-contraction inequality (A. Maurer, "A vector-contraction inequality for Rademacher complexities", arXiv:1605.00251, 2016) gives each coordinate of each point its own independent sign $\sigma_{ik}$:
$$\begin{aligned}&\mathbb E\sup_{a\in A}\sum_{i=1}^n\sigma_i\,\ell_i(a_i)\\&\quad\le\sqrt2\,L\ \mathbb E\sup_{a\in A}\sum_{i=1}^n\sum_{k=1}^m\sigma_{ik}\,a_{ik}.\end{aligned}$$
The right side is a signed complexity of the class with $nm$ scalar entries. Boffi et al. invoke it as "Theorem 3 of Maurer [34]" for the derivative approximation in Appendix B.3 (p. 22). We have not checked Maurer's paper locally; the statement and the constant $\sqrt2$ are recalled, not proved here.

### From complexity to a high-probability guarantee {#high-probability}

**Symmetrization, recalled.** [[rademacher-complexity]] (§"Why random signs control the uniform deviation", Theorem "Symmetrization") proves the ghost-sample inequality in full. For independent draws $Z_1,\dots,Z_n$ and a class with population means $Pf$ and sample means $P_nf$,
$$\mathbb E_Z\sup_{f\in F}\bigl(Pf-P_nf\bigr)\le2\,\mathbb E_Z\,\widehat{\mathfrak R}_n(F;Z_{1:n}).$$
Its four steps are: introduce an independent ghost sample $Z'$ with $Pf=\mathbb E_{Z'}P'_nf$; move the supremum inside the ghost average (a supremum of averages is at most the average of suprema); swap $Z_i$ and $Z'_i$ for any subset of indices, which leaves the joint distribution unchanged and so inserts random signs; split the supremum of a sum. With absolute values, the same steps bound $\mathbb E\sup_f|Pf-P_nf|$ by $2\,\mathbb E\,\widehat{\mathfrak R}^{\,|\cdot|}_n$. That lesson keeps the proof; this one adds the step from an average over samples to the actual sample.

**The tool.** McDiarmid's inequality, recalled from [[concentration]] in the form of Shalev-Shwartz and Ben-David, Lemma 26.4 (2014, p. 328, PDF p. 346): let $\Phi$ be a function of $n$ independent random inputs, and suppose that changing any single input, with the others held fixed, changes $\Phi$ by at most $\beta$. Then for $0<\delta<1$, with probability at least $1-\delta$,
$$|\Phi-\mathbb E\Phi|\le\beta\sqrt{\frac{n\log(2/\delta)}2}.$$

::: theorem {#thm-hp} High-probability uniform bound
Suppose $|f(z)|\le c$ for all $f\in F$ and $z$. Then for $0<\delta<1$, with probability at least $1-\delta$ over the sample, every $f\in F$ satisfies
$$Pf-P_nf\le2\,\mathbb E_Z\widehat{\mathfrak R}_n(F)+c\sqrt{\frac{2\log(2/\delta)}n}. \label{hp}$$
:::

This is part 1 of Theorem 26.5 of Shalev-Shwartz and Ben-David (2014, pp. 328–329, PDF pp. 346–347), which [[rademacher-complexity]] quotes.

::: proof
Let $\Phi(Z_1,\dots,Z_n)=\sup_{f\in F}(Pf-P_nf)$.

*Bounded differences.* Replace $Z_j$ by another point $Z'_j$ and keep the rest. For each fixed $f$, $Pf$ does not change, and $P_nf$ changes by $\bigl(f(Z'_j)-f(Z_j)\bigr)/n$, which has size at most $2c/n$. So every member's gap $Pf-P_nf$ moves by at most $2c/n$. A supremum moves by at most the largest change of its terms: if $x_f\le y_f+d$ for every $f$, then $\sup_fx_f\le\sup_fy_f+d$, and symmetrically. Hence $\Phi$ changes by at most $\beta=2c/n$.

*Concentration.* McDiarmid with $\beta=2c/n$ gives, with probability at least $1-\delta$,
$$\Phi\le\mathbb E\Phi+\frac{2c}n\sqrt{\frac{n\log(2/\delta)}2}=\mathbb E\Phi+c\sqrt{\frac{2\log(2/\delta)}n}.$$

*Symmetrization.* $\mathbb E\Phi\le2\,\mathbb E_Z\widehat{\mathfrak R}_n(F)$. On the same event every $f$ has $Pf-P_nf\le\Phi$, which gives \ref{hp}.
:::

**Reading it.** The bound is uniform: one event of probability at least $1-\delta$ covers every member, including the one chosen by ERM after seeing the data. With $c=1$, $n=100$ and $\delta=0.05$ the confidence term is $\sqrt{2\log40/100}\approx0.272$. It shrinks like $1/\sqrt n$, the same rate as the complexity of a linear ball, so neither term dominates in general.

**A bound computed from the sample.** The empirical complexity $\widehat{\mathfrak R}_n(F;Z_{1:n})$ itself has bounded differences: changing $Z_j$ changes every $S_\sigma$ by at most $2c/n$, hence each supremum and their average by at most $2c/n$. Applying McDiarmid to it and to $\Phi$, each at level $\delta/2$, and adding the two failure probabilities (union bound) gives, with probability at least $1-\delta$, $Pf-P_nf\le2\,\widehat{\mathfrak R}_n(F;Z_{1:n})+3c\sqrt{2\log(4/\delta)/n}$ for every $f$. Shalev-Shwartz and Ben-David's part 2 states the constant $4$ in place of $3$, a weaker and therefore also valid statement.

### Assumptions and domain {#assumptions}

- **Convention first.** Rules 2 and 5 of \ref{thm-rules} and the contraction lemma are proved for the signed convention. The absolute convention keeps rules 1, 3, 4 and 5, pays $\lVert b\rVert_n/\sqrt n$ for a shift, and costs at most a factor $2$ when the class contains zero.
- **Contraction.** Scalar maps, one per sample point, each $L$-Lipschitz on the range of values. Offsets are free in the signed convention and are not free in the absolute one.
- **Vector maps.** Not covered by the scalar lemma. Maurer's inequality is invoked with its source; its proof is not given here.
- **High probability.** Independent sample points and a uniform range $|f|\le c$. The guarantee is about this fixed class; enlarging the class after seeing the data voids it.
- **Not a dynamical statement.** None of these contractions concerns trajectories; [[three-contractions]] separates the meanings.

### Exercises {#exercises}

::: question
**Scaling and offset.** On two points let $A=\{(3w-1,3w-1):|w|\le1\}$. Compute its signed complexity using the rules, and its absolute complexity directly. Check the absolute value against \ref{abs-shift}.
---
Signed: $A=3D+b$ with $D$ the diagonal class and $b=(-1,-1)$, so $\widehat{\mathfrak R}(A)=3\cdot\tfrac12=\tfrac32$ by rules 2 and 3. Absolute: $3w-1$ ranges over $[-4,2]$, so the absolute supremum is $\tfrac12|\sigma_1+\sigma_2|\cdot4$, with values $4,0,0,4$; the average is $2$. The bound \ref{abs-shift} gives $\widehat{\mathfrak R}^{|\cdot|}(3D)+\lVert b\rVert_n/\sqrt2=\tfrac32+0.707\approx2.21\ge2$.
:::

::: question
**A ramp.** Apply $\ell(t)=\max\{t,0\}$ to the diagonal class. What is the Lipschitz constant, what does the contraction lemma predict, and what is the exact signed complexity?
---
$\ell$ is $1$-Lipschitz, so the lemma predicts at most $\tfrac12$. The values are $(\max\{w,0\},\max\{w,0\})\in[0,1]^2$ on the diagonal, and the supremum for a sign vector is $\max\{0,\tfrac12(\sigma_1+\sigma_2)\}$: $1,0,0,0$. The exact complexity is $\tfrac14$.
:::

::: question
**Where the absolute proof breaks.** In the proof of \ref{thm-contraction}, which step uses the signed convention in an essential way? Give a class and a $1$-Lipschitz map for which $\widehat{\mathfrak R}^{|\cdot|}(\ell\circ A)>\widehat{\mathfrak R}^{|\cdot|}(A)$.
---
The step that replaces $L|a_j-a'_j|$ by $L(a_j-a'_j)$ relabels the pair, which works because the remaining part $T(a)+T(a')$ is symmetric and everything is linear in the sign; with $|\cdot|$ around the whole average this fails, and offsets no longer average away. Example: the diagonal class and $\ell(t)=t+1$. The values $(w+1,w+1)$ lie in $[0,2]$, the absolute suprema are $2,0,0,2$, so $\widehat{\mathfrak R}^{|\cdot|}(\ell\circ A)=1>\tfrac12$.
:::

::: question
**Confidence term.** Losses lie in $[-1,1]$, $n=400$ and $\delta=0.01$. Compute the confidence term of \ref{hp}. Which assumption would fail if the $400$ points were consecutive time samples of one trajectory?
---
$c\sqrt{2\log(2/\delta)/n}=\sqrt{2\log200/400}\approx0.163$. McDiarmid and symmetrization need independent sample points. Consecutive points of one trajectory are dependent, so $n$ must count independent trajectories, not time samples ([[trajectories-as-samples]]).
:::

::: question
**Vector maps.** Let $\ell(s)=\lVert s\rVert_2$ for $s\in\mathbb R^2$. It is $1$-Lipschitz. Why can the scalar contraction lemma not be applied to the two coordinates separately?
---
The scalar lemma needs, for each entry of the value vector, a map of that entry alone. $\lVert s\rVert_2=\sqrt{s_1^2+s_2^2}$ is not a sum of a function of $s_1$ and a function of $s_2$, so the composed class is not obtained by transforming entries one at a time. Its proof would also need to turn $\lVert a_j-a'_j\rVert_2$ back into a linear expression, which a length is not. A vector-contraction inequality such as Maurer's is needed, with a sign for each coordinate and a factor $\sqrt2$.
:::

### Where it is used {#uses}

[[three-contractions]] invokes the scalar contraction lemma and its signed convention. [[covering-dudley]] uses the shift rule and the zero-member inequality \ref{zero-member}. [[kernels-random-features]] uses the convex-hull rule and the vector inequality behind Boffi's random-feature lemma.

## Card

### The idea {#idea}

For the signed complexity (sample fixed, signs, then supremum): monotone in the class; unchanged by adding a fixed function; scaled by $|c|$; subadditive under sums; unchanged by convex hulls; and $\widehat{\mathfrak R}(\ell\circ A)\le L\,\widehat{\mathfrak R}(A)$ for scalar $L$-Lipschitz maps, offsets included (UML 2014, Lemmas 26.6–26.9). With a uniform range $|f|\le c$: $Pf-P_nf\le2\,\mathbb E\widehat{\mathfrak R}_n+c\sqrt{2\log(2/\delta)/n}$ for all $f$ with probability at least $1-\delta$.

### Intuition and example {#intuition}

Diagonal class $(w,w)$ on two points, complexity $\tfrac12$: $\times2$ gives $1$; $|t|$ gives $\tfrac14$; $+5$ gives $\tfrac12$ signed. With absolute values a fixed vector $b$ costs up to $\lVert b\rVert_n/\sqrt n$, so $2t+5$ gives $3.5$, not $1$. Contraction is proved by replacing one coordinate at a time; the absolute value $|a_j-a'_j|$ is removed by relabelling the pair, which only the signed convention allows.

### Assumptions and domain {#assumptions}

- State the convention before quoting a factor. Absolute: shifts cost $\lVert b\rVert_n/\sqrt n$; a class containing zero costs at most a factor $2$.
- Scalar maps act on one value each. Vector-valued maps need a vector-contraction inequality (Maurer 2016, factor $\sqrt2$, invoked).
- High probability needs independent points and a uniform range.

### Where it is used {#uses}

[[three-contractions]], [[covering-dudley]], [[kernels-random-features]].
