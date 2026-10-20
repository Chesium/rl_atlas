+++
summary = "Gram positivity, convex fitting and holdout tests supply useful numerical evidence with explicit limits."
prereqs = ["certificate-classes", "contraction-metrics", "concentration"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §6 and Appendices A.1–A.5, pp.9, 14–19", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question: what did the solver establish? {#statement}

Open the [flows and certificates Lab](#/flows) and choose the damped Van der Pol flow with a polynomial contraction metric. For each run the readout reports how many of $100$ holdout trajectories violate, whether the sampled training constraints were met, and the largest training residual. For seed 5 with $n=8$ training trajectories, the pinned run of [[vdp-certificates]] meets its sampled constraints and $6$ of $100$ holdout trajectories violate. Three different kinds of claim are packed into such a readout. None is an instance of the theorems of [[boffi-thm-4-2]] and [[boffi-thm-5-2]], although the third estimates the kind of quantity that Theorem 4.2 bounds.

- **A construction.** The fitted metric is positive definite at *every* state, not only at sampled ones. That is guaranteed by how the class is built, and it is a proof.
- **A sampled computation.** The decrease inequality holds at the finitely many states, times and directions that were handed to the solver, up to its tolerance. That is a fact about a finite list.
- **A Monte Carlo estimate.** The holdout fraction estimates the probability that a fresh trajectory violates the inequality at the checked times. It comes with a confidence bound, and it is not a guarantee about every trajectory.

This lesson takes the three apart. It assumes [[certificate-classes]] (certificate classes with values and gradients), [[contraction-metrics]] (the metric inequality) and Hoeffding's inequality from [[concentration]].

### Positivity by construction: Gram matrices {#gram}

A symmetric matrix $Q$ is **positive semidefinite**, written $Q\succeq0$, if $z^{\mathsf T}Qz\ge0$ for every vector $z$; equivalently, all its eigenvalues are nonnegative ([[lyapunov-functions]]). Let $m(x)$ be a vector of monomials, such as $(1,x)$ or $(1,x,x^2)$. A polynomial written as
$$p(x)=m(x)^{\mathsf T}Q\,m(x)$$
has **Gram matrix** $Q$. If $Q\succeq0$, then $p(x)\ge0$ for every $x$: apply the definition of $Q\succeq0$ with $z=m(x)$. Factoring $Q=R^{\mathsf T}R$ shows the same fact differently, $p(x)=\|Rm(x)\|^2$, a sum of squares of polynomials.

::: example {#ex-gram} The monomials $(1,x)$
With $m(x)=(1,x)$ and $Q=\begin{bmatrix}a&b\\b&c\end{bmatrix}$, $p(x)=a+2bx+cx^2$, a quadratic.

- $Q=\begin{bmatrix}1&1\\1&2\end{bmatrix}$ has eigenvalues $(3\pm\sqrt5)/2\approx0.382,\ 2.618$, so $Q\succeq0$. Indeed $p(x)=1+2x+2x^2=2(x+\tfrac12)^2+\tfrac12\ge\tfrac12$.
- $Q=\begin{bmatrix}1&2\\2&1\end{bmatrix}$ has eigenvalues $-1$ and $3$. Its polynomial $p(x)=1+4x+x^2$ equals $1-8+4=-3$ at $x=-2$.
:::

For $m=(1,x)$ the test is exact: $p\ge0$ everywhere forces $Q\succeq0$. Any $z=(z_1,z_2)$ with $z_1\ne0$ equals $z_1\,m(z_2/z_1)$, so $z^{\mathsf T}Qz=z_1^2\,p(z_2/z_1)\ge0$; and for $z_1=0$, $z^{\mathsf T}Qz=cz_2^2$, where the leading coefficient $c$ of a nonnegative quadratic is nonnegative.

With more monomials the Gram matrix is no longer unique, and one non-PSD representation proves nothing. With $m=(1,x,x^2)$ the nonnegative polynomial $(x^2-1)^2=1-2x^2+x^4$ has the Gram matrix with rows $(1,0,-1)$, $(0,0,0)$, $(-1,0,1)$, which is positive semidefinite, and also $\operatorname{diag}(1,-2,1)$, which is not. A search must therefore range over all Gram matrices of $p$: those matching its coefficients, a set cut out by linear equations. Positivity of *some* member is the test. For several variables or higher degree, there are nonnegative polynomials with no positive semidefinite Gram matrix at all. Motzkin's $x^4y^2+x^2y^4-3x^2y^2+1$ is the classical example (recalled here without proof). A sum-of-squares class is a convenient, provably positive subclass, not all positive polynomials.

**The Lab's metric.** The flows Lab fits $M(x)=I+B(x)^{\mathsf T}QB(x)$, where $Q$ is a $12\times12$ symmetric matrix and $B(x)v=(v_1b(x),\,v_2b(x))$ stacks the monomials $b(x)=(1,x_1,x_2,x_1^2,x_1x_2,x_2^2)$ once for each coordinate of a displacement $v$. For $Q\succeq0$,
$$v^{\mathsf T}M(x)v=\|v\|^2+(B(x)v)^{\mathsf T}Q\,(B(x)v)\ge\|v\|^2$$
at **every** state $x$, so $M\succeq I$ globally, by construction. The entries of $M$ are polynomials of degree at most four. The paper enforces $M(x)\succeq\mu I$ for all $x$ with sum-of-squares matrix constraints instead (Appendices A.1, A.4).

### Sampled decrease is a convex constraint {#reasoning}

Fix a state $x$ on a recorded trajectory and a direction $u$. The Lab **tests** a fitted metric at a norm rate $\alpha$ (default $0.1$) but **fits** it at the larger training rate $\alpha_{\mathrm{fit}}=\alpha+0.05$; the holdout section returns to this difference. With $J=Df$ the Jacobian of the dynamics, the sampled training residual is
$$c_{x,u}(Q)=u^{\mathsf T}\big(J^{\mathsf T}M+MJ+\dot M+2\alpha_{\mathrm{fit}}M\big)(x)\,u,$$
the metric inequality of [[contraction-metrics]] tested in one direction. $M(x)$ is the constant $I$ plus a term linear in $Q$, and so is $\dot M=\sum_if_i\,\partial M/\partial x_i$. Hence $c_{x,u}(Q)$ is an affine function of $Q$: it can be written $\langle A_{x,u},Q\rangle-b_{x,u}$, where the matrix $A_{x,u}$ and the number $b_{x,u}$ collect the coefficients and $\langle A,Q\rangle=\sum_{i,j}A_{ij}Q_{ij}$ is the entrywise inner product of two matrices (it equals $\operatorname{tr}(A^{\mathsf T}Q)$). The requirement $c_{x,u}(Q)\le0$ is then a **halfspace** in the space of matrices. The fit asks for a $Q$ in the intersection of finitely many halfspaces and the cone $\{Q\succeq0\}$. Both are convex, so the feasible set is convex: if two matrices satisfy every constraint, so does each point on the segment between them.

The same holds for any certificate class that is linear in its parameters, such as the quadratic Lyapunov class of [[certificate-classes]]. Convexity is what makes the fit a reliable computation. It is not the reason the fit generalizes; that is the statistical question of [[boffi-thm-4-2]].

**How the Lab solves it.** The Lab uses Dykstra's alternating projections: project onto one halfspace after another, then onto the positive semidefinite cone (by an eigenvalue decomposition that clips negative eigenvalues), keeping correction terms so that the iteration approaches the point of the intersection nearest to the start $Q=0$. The paper's Algorithm 1 likewise minimizes the parameter norm. Each training trajectory contributes $16$ states (every tenth RK4 step over three seconds) and four fixed directions, so $n=2$ trajectories start with $2\times16\times4=128$ halfspaces. Four directions do not cover the tangent plane, so whenever the full $2\times2$ residual matrix at a training state has a positive eigenvalue, its eigenvector is added as a new halfspace (a cutting plane). The reported feasibility uses the full matrix at the training states, every direction included.

Two outcomes need careful reading.

- **"Sampled constraints met"** means the largest residual at the training states is at most the tolerance $10^{-5}$. It says nothing about other states, other times on the same trajectories, or other trajectories.
- **"Feasibility unresolved"** means the budget of $250$ iterations ran out. Alternating projections can converge slowly, so a feasible problem may be reported unresolved. It is not evidence that the system is unstable or that no certificate exists.

### Time grids and derivatives {#approximation}

The theorems use the trajectory residual, a supremum over **all** times ([[trajectories-as-samples]]), and exact derivatives. Every practical pipeline replaces both.

- **Time grid.** The Lab constrains $16$ states per training trajectory, $0.2$ s apart, and checks holdout trajectories at all $151$ RK4 states. The paper's Van der Pol fit simulates $600$ steps of $0.005$ s and keeps $50$ constraints per trajectory (Appendix A.5). [[trajectories-as-samples]] shows a residual can be negative at every grid time and positive in between. Its bridge lemma certifies all times only with a Lipschitz constant in time and a grid margin $L_t\Delta/2$; neither the paper nor the Lab enforces such a margin.
- **Derivatives.** The Lab evaluates $f$ and its Jacobian analytically, because it knows the model. The paper assumes only trajectories. It estimates $\dot x$ numerically, with a Savitzky–Golay filter for the pendulum (A.2) or by differentiating a fitted cubic spline (A.4, A.5). It replaces the tangent vector by the difference of two nearby trajectories, kept within a tolerance (Algorithm 1). [[variational-dynamics]] shows such a difference obeys the variational equation only up to a remainder.
- **Integration.** Recorded trajectories are themselves numerical solutions (RK4 with step $0.02$ in the Lab). The integration error is a further gap.

Each replacement is reasonable, and each is a gap between "the solver's constraints hold" and "the theorem's premise holds". Closing it requires an error bound, not a finer picture.

### Holdout tests are Monte Carlo estimates {#holdout}

After fitting, freeze the certificate $\widehat V$. Draw $N$ fresh initial states independently from the initial-state distribution $\mathcal D$ (in the Lab, uniform on the disk of radius $2$; see [[trajectories-as-samples]]), independently of the training data, and let $Z_j=1$ if the $j$th holdout trajectory violates the tested inequality at some checked time, $Z_j=0$ otherwise. Because $\widehat V$ is fixed before the $Z_j$ are drawn, they are independent, with common mean $\widehat{\operatorname{err}}$, the probability that a fresh trajectory violates at the checked times. (It can only be smaller than the all-times violation probability.) The count $K=\sum_jZ_j$ estimates $N\,\widehat{\operatorname{err}}$. We write $N$ for the holdout count to keep $m$ for the monomial vector above.

Hoeffding's inequality ([[concentration]]) for variables in $[0,1]$, applied in the direction that bounds $\widehat{\operatorname{err}}$ from above, gives $\Pr\big(\widehat{\operatorname{err}}-K/N\ge t\big)\le e^{-2Nt^2}$. Setting the right side to $\delta$: with probability at least $1-\delta$ over the holdout draw,
$$\widehat{\operatorname{err}}\le\frac KN+\sqrt{\frac{\log(1/\delta)}{2N}}. \label{holdout-bound}$$

::: example {#ex-holdout} The pinned Van der Pol runs
The Van der Pol Story of [[vdp-certificates]] fixes seed 5 and fits with $n=2$, $8$ and $32$ training trajectories. The same $N=100$ holdout trajectories show $K=76$, $6$ and $0$ violations. With $\delta=0.05$ the Hoeffding radius is $\sqrt{\log20/200}\approx0.122$, so \ref{holdout-bound} gives upper limits:

- $n=2$: $0.76+0.122=0.882$;
- $n=8$: $0.06+0.122=0.182$;
- $n=32$: $0+0.122=0.122$.

Exact binomial calculations are tighter: about $0.829$, $0.115$ and $0.0295$. For $K=0$ the exact limit is $1-0.05^{1/100}\approx0.0295$, derived in [[trajectories-as-samples]]. Hoeffding uses only the range $[0,1]$ and is loose when the rate is near $0$. The paper reports a Chernoff-type upper confidence bound with $\delta=0.01$ (§6), the same idea with a different inequality.
:::

The $n=32$ result therefore supports, at 95% confidence, the claim that this one fitted metric fails on at most about 3% of fresh trajectories from the radius-two disk, at the Lab's checked times and test rate. Read it no further:

- **Not universal.** Up to 3% of initial states may still fail, and the test is silent about states outside the support of $\mathcal D$ and times between grid points.
- **Not Theorem 4.2's premise.** The Lab fits with a relative margin, norm rate $\alpha+0.05$, and tests at $\alpha$; Theorem 4.2 needs a fixed scalar margin $\gamma$ and bounds on the class constants ([[boffi-thm-4-2]]).
- **Not after selection.** If the holdout set is used to pick the best of $20$ seeds or classes, the winner's fraction is biased downward. A union bound over the $20$ candidates restores validity by replacing $\delta$ with $\delta/20$: the Hoeffding radius at $N=100$ grows to $0.173$, and the exact zero-failure limit to $1-0.0025^{1/100}\approx0.058$. A fresh validation set is the cleaner remedy.
- **Count trajectories.** The $100$ holdout trajectories are checked at $151$ states each. That is $100$ samples, not $15100$: states on one trajectory are not independent draws.

**A different guarantee for convex fits.** Appendix A.4.1 quotes a randomized-convex-program bound (Calafiore). For a convex program in $d$ decision variables with independently sampled constraints and a unique solution, the solution violates a fresh constraint with probability at most $\varepsilon$, except on an event of probability $\beta(\varepsilon)=\Pr(\operatorname{Bin}(n,\varepsilon)<d)$, where $\operatorname{Bin}(n,\varepsilon)$ is a binomial count. One trajectory is one sampled constraint here, since a maximum over times of affine functions of $Q$ is convex in $Q$. The Lab's $Q$ has $d=78$ free entries. With $n\le32<78$, $\operatorname{Bin}(n,\varepsilon)<78$ always and $\beta=1$: the bound is vacuous. At $n=1000$ and $\beta=0.01$ it would give $\varepsilon\approx0.099$. We recall this result with its stated conditions and do not prove it; the Lab's approximate Dykstra solution is not the exact unique optimum it requires.

### Assumptions and domain {#assumptions}

- **Positivity** holds everywhere by construction when the class is a positive semidefinite Gram class. It is a separate condition from decrease, which is only sampled.
- **Sampled feasibility** concerns the listed states, directions and times, up to a tolerance; a fixed iteration budget can leave it unresolved.
- **Time grids, numerical derivatives and integration** each need an error bound before a sampled inequality becomes the all-times inequality of the theorems.
- **Holdout bounds** need a certificate fixed before the holdout draw, independent holdout trajectories from the stated $\mathcal D$, and a correction for any selection made with the same holdout set. They bound a violation probability at the checked times, never validity everywhere.
- **Theorem premises** (fixed margin, fixed class, constants, true contraction for [[boffi-thm-5-2]]) are separate from all of the above and are not checked by the Lab.

### Exercises {#exercises}

::: question
With $m(x)=(1,x)$, find the Gram matrix of $p(x)=x^2-4x+4$. Is it positive semidefinite? What does that prove?
---
$p=a+2bx+cx^2$ with $a=4$, $b=-2$, $c=1$, so $Q=\begin{bmatrix}4&-2\\-2&1\end{bmatrix}$. Its eigenvalues are $0$ and $5$ (trace $5$, determinant $0$), so $Q\succeq0$. This proves $p(x)\ge0$ for every real $x$; indeed $p=(x-2)^2$. Because $Q$ is singular, $p$ has a real zero.
:::

::: question
A colleague's solver returns the Gram matrix $\operatorname{diag}(1,-2,1)$ for $p(x)=1-2x^2+x^4$ with $m=(1,x,x^2)$ and concludes that $p$ can be negative. Is the conclusion right?
---
No. $p=(x^2-1)^2\ge0$. The Gram matrix of a polynomial is not unique for these monomials; another one, with rows $(1,0,-1),(0,0,0),(-1,0,1)$, is positive semidefinite. One indefinite representation proves nothing about the sign of $p$.
:::

::: question
Why is the Lab's sampled decrease condition affine in $Q$, while positivity of $M$ is enforced by a cone rather than by samples?
---
$M=I+B^{\mathsf T}QB$ and $\dot M$ are affine in $Q$, and the residual $u^{\mathsf T}(J^{\mathsf T}M+MJ+\dot M+2\alpha_{\mathrm{fit}}M)u$ combines them linearly, so each sampled condition is a halfspace. Positivity at every state is a condition at infinitely many points. The construction $Q\succeq0$ settles it at all states at once, by $v^{\mathsf T}Mv\ge\|v\|^2$, so no sampling is needed for it.
:::

::: question
A fixed certificate shows $K=3$ violations among $N=200$ independent holdout trajectories. Give a 95% upper confidence limit from \ref{holdout-bound}. What would it mean if the certificate had been chosen as the best of several by this same holdout set?
---
$3/200+\sqrt{\log20/400}=0.015+0.0865\approx0.10$. If the certificate was selected using these holdout trajectories, its $Z_j$ are no longer independent of the choice, and the limit is invalid as stated. A union bound over the $N_c$ candidates (replace $\delta$ by $\delta/N_c$) or a fresh holdout set restores a valid statement.
:::

::: question
After $250$ iterations the Lab reports "feasibility unresolved" for one seed. Does the system lack a contraction metric in this class?
---
Not necessarily. The flag means the alternating projections did not reach the tolerance within the iteration budget. A feasible convex problem can be slow for this method. Neither the sampled problem's infeasibility nor instability of the system has been shown.
:::

### Where it is used {#uses}

[[vdp-certificates]] applies these readings to the Van der Pol experiment; [[boffi-thm-5-2]] is the conditional theorem whose premises the Lab does not check.

## Card

### The idea {#idea}

A learned certificate pipeline produces three different kinds of evidence. Positivity of a Gram class holds everywhere by construction. Sampled decrease holds at the listed states, times and directions, up to solver tolerance. A holdout fraction estimates the violation probability of one fixed certificate, with a confidence bound. Only the theorems, under their own premises, say more.

### Intuition and example {#intuition}

With $m=(1,x)$, $m^{\mathsf T}Qm=a+2bx+cx^2$ is nonnegative for every $x$ exactly when $Q=\begin{bmatrix}a&b\\b&c\end{bmatrix}\succeq0$; $\begin{bmatrix}1&2\\2&1\end{bmatrix}$ gives $-3$ at $x=-2$. The Lab's $M=I+B^{\mathsf T}QB$ with $Q\succeq0$ is $\succeq I$ everywhere, and each sampled decrease condition is a halfspace in $Q$, so the fit is a convex feasibility problem solved by Dykstra projections within a fixed budget.

Holdout: with $K$ failures among $N$ independent fresh trajectories, $\widehat{\operatorname{err}}\le K/N+\sqrt{\log(1/\delta)/(2N)}$ with probability $1-\delta$. For $K=0$, $N=100$ the exact 95% limit is about $3\%$.

### Assumptions and domain {#assumptions}

- Positivity everywhere needs a positive semidefinite Gram class; not every nonnegative polynomial is a sum of squares.
- Sampled feasibility is a statement about a finite list; "unresolved" is a budget outcome, not instability.
- Time grids, numerical derivatives and integration error need bounds before the all-times premise holds.
- Holdout needs a fixed certificate and independent fresh trajectories, counted as trajectories; selection on the same holdout set invalidates the bound.
- None of this checks a fixed margin, class constants or true contraction.

### Where it is used {#uses}

[[vdp-certificates]], [[boffi-thm-5-2]].
