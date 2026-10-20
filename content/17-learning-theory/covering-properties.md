+++
summary = "Lipschitz maps and product covers transfer entropy bounds, provided the norm is the right one."
prereqs = ["covering-dudley"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 27", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### Building covers from covers {#motivation}

Dudley's integral in [[covering-dudley]] needs covering numbers of the class at every scale. One rarely counts them directly. Instead one starts from a set whose covers are known, usually a ball of parameters, and pushes those covers through maps, products and changes of norm. Each push has a price, and each depends on *which distance* is used and *where the centers are allowed to lie*. This lesson collects the rules, proves them, and shows how each can be misapplied. It is an optional branch: [[boffi-thm-4-2]] uses only the parameter transfer and volume count, which it develops locally. [[dual-sudakov]] and the matrix route (Theorem 4.3) use the rest.

**Recalled from [[covering-dudley]].** A set $T$ comes with a distance $\rho$: the empirical $L_2$ distance $\lVert f-g\rVert_n$ on a fixed sample, the sup distance $\lVert f-g\rVert_\infty$ over the domain, or a norm $\lVert\theta-\theta'\rVert$ on parameters. An $\epsilon$-cover is a set of centers with every member of $T$ within $\epsilon$ of some center, and $N(\epsilon;T,\rho)$ is the smallest size of one. Covering numbers do not increase as $\epsilon$ grows, and $N(\epsilon)=1$ once $\epsilon$ reaches the radius of $T$ about some point. All distances here satisfy the triangle inequality $\rho(s,u)\le\rho(s,t)+\rho(t,u)$.

### Centers, packing and the factor two {#statement}

Where the centers may lie changes the count.

::: definition {#def-centers} External and internal covers, packing
Let $T$ sit inside a larger space $\mathcal X$ with the same distance (for vectors, $\mathcal X=\mathbb R^n$; for functions, all bounded functions).

- The **external** covering number $N(\epsilon;T)$ allows centers anywhere in $\mathcal X$. This is the convention of [[covering-dudley]] and of Shalev-Shwartz and Ben-David, Definition 27.1 (2014, p. 337, PDF p. 355), whose centers form an arbitrary set of vectors.
- The **internal** covering number $N^{\mathrm{in}}(\epsilon;T)$ requires every center to be a member of $T$.
- An **$\epsilon$-packing** of $T$ is a set of members of $T$ whose pairwise distances all exceed $\epsilon$. The **packing number** $M(\epsilon;T)$ is the largest size of one.
:::

::: theorem {#thm-packing} Comparisons
For every set $T$ and every $\epsilon>0$:
$$\begin{aligned}N(\epsilon)&\le N^{\mathrm{in}}(\epsilon)\le M(\epsilon),\\ M(2\epsilon)&\le N(\epsilon),\\ N^{\mathrm{in}}(2\epsilon)&\le N(\epsilon).\end{aligned}$$
:::

::: proof
*First line.* An internal cover is one particular external cover, so $N\le N^{\mathrm{in}}$. Next, take a packing that cannot be enlarged (a maximal packing; one exists when $M(\epsilon)$ is finite). Every member of $T$ is then within $\epsilon$ of some packing point, or it could be added. So a maximal packing is an internal cover, and $N^{\mathrm{in}}(\epsilon)\le M(\epsilon)$.

*Second line.* Take an external $\epsilon$-cover and a $2\epsilon$-packing. If two packing points were within $\epsilon$ of the same center, the triangle inequality would put them within $2\epsilon$ of each other, which a $2\epsilon$-packing forbids. So each center serves at most one packing point, and there are at least as many centers as packing points.

*Third line.* Take an external $\epsilon$-cover. For each center whose $\epsilon$-ball meets $T$, choose one member $t_c$ of $T$ in that ball. Any $t\in T$ lies within $\epsilon$ of some center $c$, and $t_c$ lies within $\epsilon$ of $c$, so $t$ lies within $2\epsilon$ of $t_c$. The chosen members form an internal $2\epsilon$-cover with at most $N(\epsilon)$ points.
:::

So the three counts agree up to a factor $2$ in the *scale*. In an entropy integral, a factor $2$ in scale changes only the constant. Substituting $\epsilon=2u$ and then using the third inequality,
$$\begin{aligned}\int_0^\infty\sqrt{\log N^{\mathrm{in}}(\epsilon)}\,d\epsilon&=2\int_0^\infty\sqrt{\log N^{\mathrm{in}}(2u)}\,du\\&\le2\int_0^\infty\sqrt{\log N(u)}\,du,\end{aligned}$$
so insisting on internal centers costs at most a factor $2$ in Dudley's bound.

**Subsets: the external count is monotone, the internal one is not.** If $T'\subset T$, every external cover of $T$ also covers $T'$, so $N(\epsilon;T')\le N(\epsilon;T)$. Internal covers do not pass to subsets, because the centers of $T$ need not lie in $T'$. With $T=[-1,1]$ and $\epsilon=1$, the single center $0$ is internal for $T$, so $N^{\mathrm{in}}(1;T)=1$. The subset $T'=\{-1,1\}$ has points $2$ apart; an internal center must be one of them and covers only itself, so $N^{\mathrm{in}}(1;T')=2$. Through the theorem, the subset still satisfies $N^{\mathrm{in}}(2\epsilon;T')\le N(\epsilon;T')\le N(\epsilon;T)\le N^{\mathrm{in}}(\epsilon;T)$: monotone up to the factor $2$ in scale. This is why [[dual-sudakov]], which bounds a class by a larger ball, uses external centers.

### Transfer rules {#reasoning}

::: theorem {#thm-transfer} Pushing covers forward
Let $\epsilon>0$.

1. **Scaling and translation.** For a set $A$ of vectors (or functions) under a norm, a number $c\ne0$ and a fixed $a_0$, $N\bigl(|c|\epsilon;\ cA+a_0\bigr)=N(\epsilon;A)$.
2. **Lipschitz images.** Let $\Phi$ map $(\mathcal X,\rho)$ to $(\mathcal Y,\rho')$ with $\rho'(\Phi(s),\Phi(t))\le L\rho(s,t)$ for all $s,t$ in a set containing $T$ and the centers used. Then $N(L\epsilon;\Phi(T))\le N(\epsilon;T)$. With internal centers the condition is needed only on $T$, and $N^{\mathrm{in}}(L\epsilon;\Phi(T))\le N^{\mathrm{in}}(\epsilon;T)$.
3. **Products.** Let $T\subset T_1\times T_2$, and measure pairs by the larger of the two component distances, $\rho_{\max}\bigl((s_1,s_2),(t_1,t_2)\bigr)=\max\{\rho_1(s_1,t_1),\rho_2(s_2,t_2)\}$. Then $N(\epsilon;T,\rho_{\max})\le N(\epsilon;T_1)\,N(\epsilon;T_2)$. For the Euclidean combination $\sqrt{\rho_1^2+\rho_2^2}$, cover each factor at $\epsilon/\sqrt2$.
4. **Comparing norms.** If $\lVert x\rVert_a\le C\lVert x\rVert_b$ for all $x$, then $N(C\epsilon;T,\lVert\cdot\rVert_a)\le N(\epsilon;T,\lVert\cdot\rVert_b)$.
:::

::: proof
*Rule 1.* The map $a\mapsto ca+a_0$ multiplies every distance by $|c|$ and has an inverse of the same form, so it carries $\epsilon$-covers of $A$ to $|c|\epsilon$-covers of $cA+a_0$ and back.

*Rule 2.* Take an $\epsilon$-cover $C$ of $T$. For $t\in T$ with center $c$, $\rho'(\Phi(t),\Phi(c))\le L\rho(t,c)\le L\epsilon$, so $\Phi(C)$ is an $L\epsilon$-cover of $\Phi(T)$ with at most $|C|$ points. Internal centers lie in $T$, where the condition holds.

*Rule 3.* Take $\epsilon$-covers $C_1$ of $T_1$ and $C_2$ of $T_2$. For $(t_1,t_2)\in T$ pick $c_1$ within $\epsilon$ of $t_1$ and $c_2$ within $\epsilon$ of $t_2$; then $(c_1,c_2)$ is within $\epsilon$ in $\rho_{\max}$. The pairs $C_1\times C_2$ cover. For the Euclidean combination, components within $\epsilon/\sqrt2$ give $\sqrt{\epsilon^2/2+\epsilon^2/2}=\epsilon$.

*Rule 4.* A center within $\epsilon$ in $\lVert\cdot\rVert_b$ is within $C\epsilon$ in $\lVert\cdot\rVert_a$.
:::

The coordinatewise case of rule 2, with each coordinate passed through its own $L$-Lipschitz scalar map, is Lemma 27.3 of Shalev-Shwartz and Ben-David (2014, p. 338, PDF p. 356). Their Lemma 27.2 on the same page states the scaling rule as $N(r,\{ca+a_0\})\le N(cr,A)$ for $c>0$. As printed, the scale sits on the wrong side for $c>1$: with $A=[-1,1]$, $c=2$ and $r=1$, the left side is $N(1;[-2,2])=2$ and the right side is $N(2;[-1,1])=1$. The statement consistent with their Lemma 27.3, and with rule 1, is $N(cr,\{ca+a_0\})\le N(r,A)$.

**Reading rule 2.** To cover the image at scale $\epsilon$, cover the source at the finer scale $\epsilon/L$. A large Lipschitz constant does not change the *dimension* in the entropy, only the scale inside the logarithm, $k\log(1+2LB/\epsilon)$ instead of $k\log(1+2B/\epsilon)$. Inside Dudley's integral the substitution $\epsilon=Lu$ pulls $L$ out as a factor, which is how [[boffi-thm-4-2]] obtains $B_\theta(L_g+L_{\nabla g})L_h$ in front of $\sqrt{k/n}$.

### Volume: entropy grows with dimension {#volume}

::: theorem {#thm-volume} Volume bounds in any norm
Let $\lVert\cdot\rVert$ be any norm on $\mathbb R^k$ and $\mathbb B$ its closed unit ball. For $0<\epsilon\le1$,
$$\Bigl(\frac1\epsilon\Bigr)^k\le N(\epsilon;\mathbb B,\lVert\cdot\rVert)\le\Bigl(1+\frac2\epsilon\Bigr)^k.$$
:::

::: proof
Volume in $\mathbb R^k$ scales with the $k$th power of length: a ball of radius $r$ in this norm has volume $r^k\operatorname{vol}(\mathbb B)$.

*Upper bound.* This is the argument of [[boffi-thm-4-2]] (Lemma "Volume comparison"), and it uses only the triangle inequality, so it holds for any norm. A maximal $\epsilon$-packing is a cover (\ref{thm-packing}). Balls of radius $\epsilon/2$ around its $J$ points are disjoint and lie in the ball of radius $1+\epsilon/2$, so $J(\epsilon/2)^k\le(1+\epsilon/2)^k$.

*Lower bound.* If $N$ balls of radius $\epsilon$ cover $\mathbb B$, their volumes add to at least that of $\mathbb B$: $N\epsilon^k\ge1$.
:::

So $k\log(1/\epsilon)\le\log N(\epsilon)\le k\log(1+2/\epsilon)$: for small $\epsilon$ the metric entropy of a full $k$-dimensional ball is $k\log(1/\epsilon)$ to leading order, in *every* norm, with the norm fixed on both sides. With $k=3$ and $\epsilon=0.1$ the two bounds are $1000$ and $9261$ centers, or $6.9$ and $9.1$ for the logarithms. The count cannot be improved by cleverness in the same norm. A smaller entropy needs either fewer effective dimensions or a ball measured in a *different*, weaker norm, which is the mechanism of [[dual-sudakov]].

**Norms on matrices.** For a $d\times d$ matrix $Q$, the Frobenius norm $\lVert Q\rVert_F=\sqrt{\sum_{ij}Q_{ij}^2}$ treats the $d^2$ entries as a vector. The operator norm $\lVert Q\rVert_{\mathrm{op}}=\max_{\lVert u\rVert_2=1}\lVert Qu\rVert_2$ is the largest stretch of a unit vector. Always $\lVert Q\rVert_{\mathrm{op}}\le\lVert Q\rVert_F\le\sqrt d\,\lVert Q\rVert_{\mathrm{op}}$. Both ends are attained: the all-ones $2\times2$ matrix has both norms equal to $2$, while the identity $I_d$ has operator norm $1$ and Frobenius norm $\sqrt d$. By rule 4, an $\epsilon$-cover in Frobenius norm is an $\epsilon$-cover in operator norm, but the reverse costs a factor up to $\sqrt d$ in the scale. They are not interchangeable for free.

### Covering values and gradients together {#joint}

This section previews how Part 18 uses the rules; the exercises need only the rules above. A *certificate* is a candidate Lyapunov function $V$ of the state $x$, the reachable set $S$ is a set containing every trajectory point, and $V_\theta$ is a certificate indexed by a parameter $\theta$, with $L_g$ and $L_{\nabla g}$ the Lipschitz constants in $\theta$ of its values and of its gradients on $S$ (defined in [[boffi-thm-4-2]]). Certificate residuals depend on $V$ and on $\nabla V$, so [[boffi-thm-4-2]] measures certificates with the joint norm
$$\lVert V\rVert_{\mathcal V}=\sup_{x\in S}\Bigl\lVert\begin{bmatrix}V(x)\\ \nabla V(x)\end{bmatrix}\Bigr\rVert$$
over the reachable set $S$ ([[certificate-classes]]). Two routes produce covers in this norm.

- **Through the parameters (rule 2).** If $\lVert V_{\theta_1}-V_{\theta_2}\rVert_{\mathcal V}\le(L_g+L_{\nabla g})\lVert\theta_1-\theta_2\rVert$, a parameter cover at scale $\epsilon/(L_g+L_{\nabla g})$ gives a $\lVert\cdot\rVert_{\mathcal V}$-cover. Its centers are certificates $V_{\theta_c}$ in the class, so their residuals are defined.
- **As a product (rule 3).** Cover the values in sup distance and the gradients in sup distance separately, each at $\epsilon/\sqrt2$, and pair the centers. The pairs cover the class in the joint norm. But a center pair $(u,G)$ is external: $G$ need not be the gradient of $u$, and $u$ need not be a certificate. That is harmless for the chaining argument, which never evaluates a residual at a center, but it is not enough when one needs a certificate at each center.

A cover in values alone is not a cover in the joint norm. [[kernels-random-features]] gives a family whose values converge uniformly while its gradients do not.

### Worked cases {#examples}

::: example {#ex-packing} Packing and covering an interval
Take $T=[-1,1]$ and $\epsilon=0.5$. External: $N(0.5)=\lceil1/0.5\rceil=2$, with centers $\pm0.5$, which are also members, so $N^{\mathrm{in}}(0.5)=2$. Packing: points more than $0.5$ apart fit four times ($-1$, then steps of a little more than $0.5$ reach about $0.5$), but not five, since four gaps of more than $0.5$ exceed the length $2$; so $M(0.5)=4$. At twice the scale, $M(1)=2$ (the endpoints), and indeed $M(1)\le N(0.5)=2$, while $N^{\mathrm{in}}(0.5)=2\le M(0.5)=4$.
:::

::: example {#ex-image} A Lipschitz image and a product
*Image.* Let $f_\theta(x)=\theta x$ on $x\in[0,2]$ with $|\theta|\le1$. Then $\lVert f_\theta-f_{\theta'}\rVert_\infty=2|\theta-\theta'|$, so $L=2$, and $N(0.3;F,\lVert\cdot\rVert_\infty)\le N(0.15;[-1,1])=\lceil1/0.15\rceil=7$.

*Product.* The square $[-1,1]^2$ is the product of two intervals. In the larger-coordinate distance, two interval covers at $\epsilon=0.5$ give $2\times2=4$ centers. For the Euclidean distance, rule 3 covers each side at $0.5/\sqrt2\approx0.354$, needing $\lceil2.83\rceil=3$ per side, so $9$ centers suffice.

*The two-point diagonal class.* As vectors in $\mathbb R^2$ the values $(w,w)$ are the image of $w\in[-1,1]$ under $w\mapsto(w,w)$. In the empirical norm $\lVert\cdot\rVert_n$ this map preserves distance ($L=1$), and $N(\epsilon)=\lceil1/\epsilon\rceil$ as in [[covering-dudley]]. In the unnormalized Euclidean norm used by Shalev-Shwartz and Ben-David it stretches distances by $\sqrt2$, and the count at scale $\epsilon$ is $\lceil\sqrt2/\epsilon\rceil$. The same set, two norms, two counts: the norm must be named.
:::

### When the rules are misapplied {#failure}

- **Internal centers for a subset.** Shown above: $N^{\mathrm{in}}(1;\{-1,1\})=2>N^{\mathrm{in}}(1;[-1,1])=1$.
- **A misprinted scale.** Applying Lemma 27.2 as printed with $c>1$ undercounts, as the interval example shows.
- **Switching norms silently.** A bound proved in operator norm does not transfer to Frobenius norm without the factor $\sqrt d$ of rule 4, and the identity matrix shows the factor is real.
- **A data-dependent class.** Covering numbers of a class built after seeing the data, for example features added until the training fit succeeds, are not covering numbers of a fixed class. The chaining bound is then about the wrong set. [[kernels-random-features]] meets this when choosing a random-feature dictionary.

### Assumptions and domain {#assumptions}

- Name the distance, the radius and the center convention in every count.
- External covers are monotone under subsets; internal ones are monotone only up to a factor $2$ in scale.
- Lipschitz transfer needs the bound on a set containing the centers, or internal centers.
- Volume counts are dimensional: $\log N\approx k\log(1/\epsilon)$ for a $k$-dimensional ball in any fixed norm.
- The class must be fixed before the data for any covering bound to feed a generalization statement.

### Exercises {#exercises}

::: question
**Packing.** For $T=[0,3]$ with $|\cdot|$ and $\epsilon=1$, find $N(1)$, $M(1)$ and $M(2)$, and check the inequalities of \ref{thm-packing}.
---
$N(1)=\lceil1.5\rceil=2$: for example the centers $1$ and $2$ cover $[0,2]$ and $[1,3]$, and one center covers only a length $2$. $M(1)$: points more than $1$ apart in an interval of length $3$ give at most $3$ points ($0$, $1.01$, $2.02$; a fourth would need three gaps over $1$, total over $3$). So $M(1)=3$. $M(2)=2$ ($0$ and $3$). Check: $N(1)=2\le N^{\mathrm{in}}(1)\le M(1)=3$ and $M(2)=2\le N(1)=2$.
:::

::: question
**Scaling.** If $N(\epsilon;A)=\lceil1/\epsilon\rceil$ for the interval $A=[-1,1]$, what is $N(\epsilon;5A+3)$? Use it to show that $N(r;cA)\le N(cr;A)$ fails for $c=5$, $r=1$.
---
$5A+3=[-2,8]$ is an interval of half-length $5$, so $N(\epsilon;5A+3)=N(\epsilon/5;A)=\lceil5/\epsilon\rceil$. At $r=1$: $N(1;5A+3)=5$, while $N(5;A)=1$. The inequality as printed fails; the correct one is $N(5r;5A+3)\le N(r;A)$, here $N(5;[-2,8])=1\le N(1;[-1,1])=1$.
:::

::: question
**Joint cover.** Values of a class lie in sup-norm covers with $N_{\mathrm{val}}(\epsilon)$ centers, gradients in covers with $N_{\mathrm{grad}}(\epsilon)$ centers. Bound the joint-norm covering number at scale $\epsilon$, and say why the resulting centers may not be certificates.
---
By rule 3 with the Euclidean combination, $N(\epsilon;\lVert\cdot\rVert_{\mathcal V})\le N_{\mathrm{val}}(\epsilon/\sqrt2)\,N_{\mathrm{grad}}(\epsilon/\sqrt2)$. Each center is a pair (value function, gradient field) chosen separately, so the field need not be the gradient of the function and neither need belong to the class. That is fine for an external cover in Dudley's integral, but not when a certificate is needed at each center.
:::

### Where it is used {#uses}

[[dual-sudakov]] uses subset monotonicity, rule 4 and the volume bound. [[boffi-thm-4-3]] combines them for the matrix class. [[kernels-random-features]] uses a coefficient-ball cover and the joint norm.

## Card

### The idea {#idea}

To cover an image at scale $\epsilon$, cover the source at $\epsilon/L$ (Lipschitz images); multiply counts for products (each factor at $\epsilon$ in the max distance, at $\epsilon/\sqrt2$ in the Euclidean one); rescaling by $c$ rescales the scale: $N(|c|\epsilon;cA+a_0)=N(\epsilon;A)$.

### Intuition and example {#intuition}

External $\le$ internal $\le$ packing, and $M(2\epsilon)\le N(\epsilon)$, $N^{\mathrm{in}}(2\epsilon)\le N(\epsilon)$: the counts agree up to a factor $2$ in scale. A $k$-dimensional ball has $(1/\epsilon)^k\le N(\epsilon)\le(1+2/\epsilon)^k$ in every norm, so entropy is proportional to dimension. Example: $\theta\mapsto\theta x$ on $[0,2]$ is $2$-Lipschitz in sup distance, so $N(0.3)\le\lceil1/0.15\rceil=7$.

### Assumptions and domain {#assumptions}

- Name the norm, radius and center convention. External counts are monotone under subsets; internal ones are not ($\{-1,1\}$ inside $[-1,1]$).
- $\lVert\cdot\rVert_{\mathrm{op}}\le\lVert\cdot\rVert_F\le\sqrt d\lVert\cdot\rVert_{\mathrm{op}}$: not interchangeable for free.
- Lemma 27.2 of UML (2014, p. 338) is misprinted; use $N(cr,cA+a_0)\le N(r,A)$.
- The class must be fixed before the data.

### Where it is used {#uses}

[[dual-sudakov]], [[boffi-thm-4-3]].
