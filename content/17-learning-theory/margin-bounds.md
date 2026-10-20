+++
summary = "Zero empirical violations with a positive margin permit fast rates unavailable from a generic deviation bound."
prereqs = ["uniform-convergence", "finite-classes"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, §15.2.3, Chapter 26", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }, { text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Lemma 4.1, p.6", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question: what does room to spare buy? {#statement}

A certificate learner does not merely ask that a candidate satisfy its inequality on the data. It asks for **room to spare**: a residual at most $-\gamma$, not merely at most $0$, on every sampled example. This station explains what that margin buys. A generic uniform-deviation argument with a margin gives a violation bound of order $1/(\gamma\sqrt n)$. When the margin is met on **every** example, a sharper theorem gives order $(\log n)^3\,\mathfrak R_n^2/\gamma^2$, where $\mathfrak R_n$ is a complexity of the class; that is $(\log n)^3/(\gamma^2n)$ when the complexity is of order $1/\sqrt n$. The sharper theorem is Lemma 4.1 of Boffi et al., on which their Theorem 4.2 relies. We derive the first bound, explain the mechanism of the second, and recall the second exactly as an invoked external result.

**The objects.** Examples $Z_1,\dots,Z_n$ are i.i.d. draws, distributed like a generic example $Z$. $F$ is a class of real-valued functions of an example, fixed before the data. Think of $f(z)$ as a **residual**: the requirement is $f(z)\le0$, and $f(z)>0$ is a **violation**. The violation probability of $f$ is
$$\operatorname{err}(f)=\Pr\big(f(Z)>0\big)=P\,\mathbf 1\{f>0\},$$
in the notation $Pg=\mathbb Eg(Z)$, $P_ng=\frac1n\sum_ig(Z_i)$ of [[uniform-convergence]]. A **margin** is a number $\gamma>0$ fixed before the data. The function $f$ makes a **margin error** on example $Z_i$ when $f(Z_i)>-\gamma$, and it has **zero margin errors** when $f(Z_i)\le-\gamma$ for every $i$.

Everything in this lesson is stated for these abstract objects. In the certificate chapters an example will be one whole trajectory and $f$ the worst value of a certificate's residual along it ([[trajectories-as-samples]]); the short mapping at the end of \ref{fast} names the correspondence, but nothing here depends on it.

### The ramp loss {#ramp}

The violation indicator $\mathbf 1\{u>0\}$ jumps at $0$, so a tiny change in a residual can change the loss from $0$ to $1$. Complexity arguments need a loss that changes gradually. The **ramp loss** with margin $\gamma$ interpolates linearly across the margin band:
$$r_\gamma(u)=\begin{cases}0,&u\le-\gamma,\\ 1+u/\gamma,&-\gamma<u<0,\\ 1,&u\ge0.\end{cases}$$
It is squeezed between the two indicators:
$$\mathbf 1\{u>0\}\le r_\gamma(u)\le\mathbf 1\{u>-\gamma\}. \label{sandwich}$$
Check the three pieces: for $u\le-\gamma$ all three are $0$; for $-\gamma<u\le0$ the left side is $0$, the middle lies in $(0,1]$ and the right side is $1$; for $u>0$ all three are $1$. For example, with $\gamma=0.1$ and $u=-0.05$ the three values are $0\le0.5\le1$. The ramp's steepest slope is $1/\gamma$, so it is **$(1/\gamma)$-Lipschitz**: $|r_\gamma(u)-r_\gamma(v)|\le|u-v|/\gamma$.

Applying \ref{sandwich} to $u=f(Z)$ and averaging gives the two facts used below:

- $\operatorname{err}(f)\le P(r_\gamma\circ f)$, from the left inequality, averaged over the population;
- zero margin errors imply $P_n(r_\gamma\circ f)=0$, from the right inequality, averaged over the sample.

This is the ramp loss of Shalev-Shwartz and Ben-David (2014, §15.2.3, p. 174 / PDF p. 192). They write it for a classifier's signed score $y\langle w,x\rangle$ with margin $1$; substituting $u=-\gamma\,y\langle w,x\rangle$ turns theirs into $r_\gamma$.

### The slow route: an ordinary deviation bound {#reasoning}

Apply the uniform bound of [[uniform-convergence]] to the class $r_\gamma\circ F=\{r_\gamma\circ f:f\in F\}$, whose values lie in $[0,1]$. With probability at least $1-\delta$, for every $f\in F$,
$$P(r_\gamma\circ f)\le P_n(r_\gamma\circ f)+2\,\mathbb E\widehat{\mathfrak R}_n(r_\gamma\circ F)+\sqrt{\frac{\log(2/\delta)}{2n}}.$$
Here $\widehat{\mathfrak R}_n$ is the signed empirical Rademacher complexity of [[rademacher-complexity]]. The **contraction lemma** of Shalev-Shwartz and Ben-David (Lemma 26.9, 2014, pp. 331–332 / PDF pp. 349–350) states that composing every member with an $L$-Lipschitz function multiplies this complexity by at most $L$. (Here "contraction" means composition with a Lipschitz function; it is unrelated to the contraction of dynamics in Part 16 or of Bellman operators.) We invoke it with $L=1/\gamma$; [[rademacher-properties]] treats it. Combining with the two ramp facts, every $f$ with zero margin errors satisfies, on the same event,
$$\operatorname{err}(f)\le\frac2\gamma\,\mathbb E\widehat{\mathfrak R}_n(F)+\sqrt{\frac{\log(2/\delta)}{2n}}. \label{slow}$$
If the class's complexity is at most $C/\sqrt n$, as for a linear ball, the bound is of order $1/(\gamma\sqrt n)$. This is the argument of Shalev-Shwartz and Ben-David's Theorem 26.13 for hard-margin support vector machines (2014, §26.3, p. 334 / PDF p. 352).

**Why zero errors did not speed it up.** In \ref{slow} the empirical term vanished, but the other two terms did not change. They are deviation terms: they bound $P-P_n$ for *every* member of the class, including members whose ramp risk is near $\tfrac12$, and for those the deviation really is of order $1/\sqrt n$ ([[finite-classes]]). The bound therefore stays slow however clean the fit. Shalev-Shwartz and Ben-David note, without proof, that a finer analysis using separability improves the sample complexity of hard SVM from order $1/\epsilon^2$ to order $1/\epsilon$ for accuracy $\epsilon$ (Remark 26.1, p. 335 / PDF p. 353). That improvement is not obtained by tightening \ref{slow}; it needs a different argument.

### The fast route: small risk means small variance {#fast}

**The finite-class case.** [[finite-classes]] proved the fast rate for a finite class: with probability at least $1-\delta$, every member whose loss is $0$ on every example has risk at most $\log(|F|/\delta)/n$, and the proof also covers $[0,1]$-valued losses. Applied to the ramp losses $r_\gamma\circ f$, which vanish on the sample for members with zero margin errors, it gives $\operatorname{err}(f)\le\log(|F|/\delta)/n$. For a finite class the margin is not even needed. For an infinite class, $\log|F|$ must be replaced by a complexity, and the margin is what makes the ramp loss, and so its complexity, controllable.

**The mechanism.** A loss $g$ with values in $[0,1]$ and mean $p$ satisfies $g^2\le g$, so its **variance**, the mean squared distance from the mean, $\mathbb E(g-p)^2=\mathbb Eg^2-p^2$, is at most $\mathbb E g^2\le p$. A member with small risk has small fluctuations. A Bernoulli loss has variance $p(1-p)$: $0.25$ at $p=\tfrac12$ but $0.0099$ at $p=0.01$. Arguments that exploit this, called **localized** or **optimistic** bounds, give a deviation term of size $\sqrt{p\cdot A}$ instead of $\sqrt A$, where $A$ is a complexity-and-confidence quantity of order $1/n$.

To see why that changes the rate, suppose, for illustration only, that such an argument gave $p\le P_ng+\sqrt{pA}+A$ for every member. A member with $P_ng=0$ then has $p\le\sqrt{pA}+A$. Writing $x=\sqrt p$, this is $x^2-\sqrt A\,x-A\le0$, so $x\le\frac{1+\sqrt5}2\sqrt A$ and $p\le\big(\tfrac{1+\sqrt5}2\big)^2A\approx2.62\,A$. The bound on $p$ is linear in $A$, of order $1/n$, rather than of order $\sqrt A$. This algebra shows the mechanism; it is not the statement or proof of the theorem below.

**The fast-margin theorem, in this lesson's terms.** Two more ingredients are needed. A **range bound** $B$: every member satisfies $|f(z)|\le B$ for every example $z$. And the **worst-case absolute Rademacher complexity** of [[rademacher-complexity]],
$$\mathfrak R_n(F)=\sup_{z_1,\dots,z_n}\mathbb E_\sigma\sup_{f\in F}\frac1n\Big|\sum_{i=1}^n\sigma_if(z_i)\Big|,$$
where $\sigma_1,\dots,\sigma_n$ are independent fair $\pm1$ signs, $\mathbb E_\sigma$ averages over them, and the outer supremum runs over all possible samples, not only the observed one. It is the largest of the complexity conventions compared in [[rademacher-complexity]].

::: lemma {#lem-boffi} Fast-margin bound (atlas restatement of Boffi et al., arXiv:2008.05952v2, Lemma 4.1, p. 6, which is stated there for certificate residuals only; recalled, not proved)
Let $Z_1,\dots,Z_n$ be i.i.d., let $F$ be a class of real functions fixed before the data with range bound $B$, let $\gamma>0$ be fixed before the data, and fix $\delta\in(0,1)$. Suppose some member has zero margin errors, and let $\hat f$ be any member with zero margin errors: $\hat f(Z_i)\le-\gamma$ for $i=1,\dots,n$. With probability at least $1-\delta$ over the sample,
$$\begin{aligned}&\Pr\big(\hat f(Z)>0\big)\\&\quad\le K\Bigg(\frac{\log^3n}{\gamma^2}\,\mathfrak R_n(F)^2\\&\qquad+\frac{2\log\big(\log(4B/\gamma)/\delta\big)}n\Bigg),\end{aligned} \label{lemma41}$$
where the probability on the left is over a fresh example $Z$ with $\hat f$ held fixed, and $K$ is a universal constant whose value the source does not give.
:::

**Provenance and status.** Boffi et al. state this bound for certificate residuals, with the factor $2$ and the $4B$ (their $4B_h$) exactly as printed above, and say it is adapted from Theorem 5 of Srebro, Sridharan and Tewari ("Smoothness, low-noise and fast rates", NeurIPS 2010). We have not checked that source, and neither this atlas nor Boffi et al. prove the lemma. The abstract statement above is the atlas's reading: it replaces their certificate objects by the objects of this lesson, and no source we checked states it for a general class; their extra assumptions (below) are what make the range bound and the complexity well defined in their setting. Since $\hat f(Z_i)\le-\gamma$ forces $|\hat f(Z_i)|\ge\gamma$, we have $B\ge\gamma$, so $\log(4B/\gamma)\ge\log4>0$ and the confidence term is well defined.

**In the certificate chapters.** The lemma is applied with these substitutions, defined in [[trajectories-as-samples]], [[learning-certificates]] and [[boffi-lemma-4-1]]; reading this lesson does not require them:

- the example $Z_i$ becomes an initial state $\xi_i$ drawn from a distribution $\mathcal D$;
- a member $f$ becomes the trajectory residual $\xi\mapsto h(\xi,V)$ of a candidate certificate $V$ from a class $\mathcal V$, and $\mathfrak R_n(F)$ is written $\mathfrak R_n(\mathcal V)$;
- "zero margin errors" becomes feasibility of their problem (3.2), and $\hat f$ a solution $\widehat V_n$;
- the range bound $B$ becomes $B_h$, which their Assumptions 4.1–4.2 (a common compact region for trajectories, bounded certificate values and gradients) make finite.

**Reading the rate.** Suppose $\mathfrak R_n(F)\le C/\sqrt n$. Then $\mathfrak R_n^2\le C^2/n$, and the right side of \ref{lemma41} is at most
$$K\Big(\frac{C^2\log^3n}{\gamma^2n}+\frac{2\log(\log(4B/\gamma)/\delta)}n\Big),$$
of order $\log^3n/(\gamma^2n)$. Compare \ref{slow}, of order $C/(\gamma\sqrt n)$. The complexity enters squared, and that is where the factor $1/\sqrt n$ becomes $1/n$. "Fast" refers to the power of $n$; the logarithms are not negligible. With natural logarithms, $\log^3n/n$ is larger than $1/\sqrt n$ until $n$ is about $2.4\times10^7$ (at $n=10^6$ the ratio is $2.6$). Since $K$ is unknown, \ref{lemma41} describes how the bound scales, not a number to compare with an experiment.

### Scaling does not create margin {#scaling}

Can a learner improve the guarantee by multiplying every residual by a large number $c>0$, so that the same fit meets a larger margin? Replace $F$ by $cF=\{cf:f\in F\}$ and $\gamma$ by $c\gamma$.

- Violations are unchanged: $cf(z)>0$ exactly when $f(z)>0$.
- Margin errors are unchanged: $cf(z)>-c\gamma$ exactly when $f(z)>-\gamma$.
- The complexity scales: $\big|\sum_i\sigma_icf(z_i)\big|=c\,\big|\sum_i\sigma_if(z_i)\big|$, so $\mathfrak R_n(cF)=c\,\mathfrak R_n(F)$; likewise $\widehat{\mathfrak R}_n(cF)=c\,\widehat{\mathfrak R}_n(F)$.
- The range bound scales: $B$ becomes $cB$.

So $\mathfrak R_n^2/\gamma^2$, $B/\gamma$ and $\widehat{\mathfrak R}_n/\gamma$ are all unchanged, and so are both bounds. For instance, $\mathfrak R_n=0.02$ and $\gamma=0.1$ give $\mathfrak R_n^2/\gamma^2=0.04$; with $c=10$, $0.2^2/1^2=0.04$ again, and the slow leading term $2\widehat{\mathfrak R}_n/\gamma$ stays at $0.4$. The bounds measure the margin relative to the class's scale: only ratios of the margin to the class's complexity and range bound matter. In the certificate chapters, scaling a Lyapunov certificate by $c$ scales its residual by $c$ when the decrease rate function is linear, and it also scales the radius of the parameter ball needed to contain the scaled certificates ([[boffi-thm-4-2]]).

What does change the bound is shrinking the margin with the class fixed: halving $\gamma$ quadruples the leading term of \ref{lemma41} and doubles that of \ref{slow}.

### Try the class {#experiment}

{{learning rates}}

**What it computes.** The demo is the finite-class version of the slow/fast contrast, with no margin. For a class of $16$ members and $\delta=0.05$ it shows two bars as functions of the slider $n$ (from $4$ to $128$ in steps of $4$): the generic uniform deviation $\sqrt{\log(2\cdot16/0.05)/(2n)}=\sqrt{\log640/(2n)}$ from [[finite-classes]], and the zero-error bound $\log(16/0.05)/n=\log320/n$, each capped at $100\%$. They bound different quantities: the first bounds every member's deviation, the second only the risk of members with zero empirical errors. At $n=32$ the bars read $31.8\%$ and $18.0\%$.

::: question
Predict before moving the slider: when $n$ goes from $32$ to $128$, by what factor does each bar shrink? At small $n$, which bar is larger?
---
The generic bar shrinks by $\sqrt4=2$, from $31.8\%$ to $15.9\%$. The zero-error bar shrinks by $4$, from $18.0\%$ to $4.5\%$. At $n=8$ the order is reversed, $63.5\%$ generic and $72.1\%$ zero-error, because the zero-error bar $\log320/n$ has the larger constant ($\log320\approx5.77$). Setting $\log320/n=\sqrt{\log640/(2n)}$ and squaring gives the crossing point $n=2(\log320)^2/\log640\approx10.3$, between the slider positions $8$ and $12$. A faster rate is a statement about large $n$.
:::

**Limits.** The bars are formulas evaluated exactly, not simulations. They illustrate the two rates for a finite class; they do not illustrate a margin, Lemma 4.1, or any measured violation rate.

### When the premises fail {#failure}

- **One margin error.** If even one sampled example has $f(Z_i)>-\gamma$, the zero-error premise fails and Lemma 4.1 says nothing. The slow bound still applies, with $P_n(r_\gamma\circ f)>0$ added; other fast-rate theorems for nonzero empirical risk exist but are not used in this atlas.
- **Fixed versus relative margin (certificate chapters).** For the usual Lyapunov decrease residual $\nabla V(x)^{\mathsf T}\dot x+\rho(V(x))$ of [[lyapunov-functions]], where $\rho$ is an increasing decrease-rate function, with $V(0)=0$, $\rho(0)=0$ and an equilibrium at the origin, the residual at the equilibrium is $\rho(0)=0$. With uniformly bounded certificate gradients and continuous dynamics, every candidate's residual is close to $0$ near the equilibrium. If the initial-state distribution gives positive probability to every neighborhood of the equilibrium, a margin $\gamma>0$ fixed in advance is therefore violated on a positive fraction of trajectories by every candidate, and the chance that the zero-margin-error premise holds on all $n$ sampled trajectories shrinks to $0$ as $n$ grows. On an unbounded horizon, where trajectories approach the equilibrium, it fails on every trajectory. (A small enough $\gamma$ chosen after seeing a finite sample might be met, but that is not a margin fixed in advance.) The atlas Lab instead fits a **relative** margin, a decrease rate $0.05$ higher than the tested one, whose room to spare is proportional to $V$ and vanishes at the equilibrium. That is a different premise; the Lab's results are not instances of \ref{lemma41} ([[boffi-thm-4-2]]).
- **A margin chosen after looking at the data.** In both bounds $\gamma$ is fixed in advance, like the class. Choosing it as the largest margin the fitted candidate happens to achieve is a data-dependent choice that these statements do not cover. Shalev-Shwartz and Ben-David's Theorem 26.14 (p. 335 / PDF p. 353) shows the standard repair for a data-dependent scale: apply the bound on a fixed grid of scales $2^i$ with failure probabilities $\delta_i$ that sum to at most $\delta$, and pay a slightly larger confidence term.
- **Small average loss is not zero margin error.** A solver that reports a small average hinge loss, or a slightly positive largest residual, has not met the feasibility premise.

### Assumptions and domain {#assumptions}

- I.i.d. examples (for certificates, independent initial states, one per trajectory) and a class and margin fixed before the data.
- Slow route: values of the ramp loss in $[0,1]$, the contraction lemma for the signed empirical complexity, and the uniform bound of [[uniform-convergence]]. It holds for every member, with or without margin errors.
- Fast route: exactly zero margin errors, a range bound $B$, and the worst-case absolute complexity $\mathfrak R_n$ (for certificates: feasibility of problem (3.2) and Boffi's Assumptions 4.1–4.2). A bound on a smaller convention, such as the expected signed complexity, does not substitute for it.
- Conclusion: a high-probability bound on the probability of a violation on a fresh example. It is not a proof that the inequality holds everywhere.

### Practise reading margin bounds {#questions}

::: question
A residual class has worst-case absolute complexity $\mathfrak R_n=0.03$, margin $\gamma=0.2$ and range bound $B=5$. Every residual is multiplied by $c=4$, and the learner now uses margin $0.8$. Compute $\mathfrak R_n^2/\gamma^2$ and $4B/\gamma$ before and after. Which, if any, of the two terms of \ref{lemma41} changes?
---
Before: $0.03^2/0.2^2=0.0009/0.04=0.0225$ and $4\cdot5/0.2=100$. After: $\mathfrak R_n=0.12$, so $0.0144/0.64=0.0225$, and $4\cdot20/0.8=100$. Neither term changes. Scaling the residuals and the margin together is a change of units.
:::

::: question
Ignoring $K$ and other constants, by what factor does the leading term shrink when $n$ goes from $10^6$ to $10^8$, (a) for a slow bound of order $1/\sqrt n$; (b) for a fast bound of order $\log^3n/n$?
---
(a) $\sqrt{100}=10$. (b) $100\big/\big(\log10^8/\log10^6\big)^3=100/(8/6)^3=100/2.370\approx42.2$. The logarithmic factor costs a factor of about $2.4$ against the ideal $100$, but the fast bound still shrinks more than four times as much as the slow one.
:::

### Where it is used {#uses}

[[boffi-lemma-4-1]] states the fast-margin lemma as the interface for certificates. [[boffi-thm-4-2]] bounds $\mathfrak R_n$ for a smooth parametric class and substitutes it.

## Card

### The idea {#idea}

A violation is $f(z)>0$; a margin error is $f(z)>-\gamma$ for a margin $\gamma>0$ fixed in advance. The ramp loss satisfies $\mathbf 1\{u>0\}\le r_\gamma(u)\le\mathbf 1\{u>-\gamma\}$ and is $(1/\gamma)$-Lipschitz. With zero margin errors:

- ordinary deviation plus contraction gives $\operatorname{err}\le\frac2\gamma\mathbb E\widehat{\mathfrak R}_n(F)+\sqrt{\log(2/\delta)/(2n)}$, order $1/(\gamma\sqrt n)$;
- with range bound $|f|\le B$, the atlas's general-class reading of Boffi et al.'s Lemma 4.1 (which they state for certificate residuals, adapting Srebro, Sridharan and Tewari; the general form is unchecked) gives $K\big(\log^3n\,\mathfrak R_n^2/\gamma^2+2\log(\log(4B/\gamma)/\delta)/n\big)$, order $\log^3n/(\gamma^2n)$ when $\mathfrak R_n\lesssim1/\sqrt n$.

### Intuition and example {#intuition}

A $[0,1]$ loss with mean $p$ has variance at most $p$, so members with small risk fluctuate little; localized arguments exploit this, and the complexity enters squared. Deviation bounds cannot, because they must also hold for members with risk near $\tfrac12$. Scaling residuals and margin by $c$ scales $\mathfrak R_n$, $\gamma$ and $B$ by $c$ and leaves the bound unchanged: $0.02^2/0.1^2=0.2^2/1^2=0.04$.

### Assumptions and domain {#assumptions}

Independent examples (for certificates, trajectories); class and $\gamma$ fixed in advance; exactly zero margin errors (for certificates, feasibility); worst-case absolute complexity; $K$ unspecified. For a Lyapunov residual, a fixed scalar margin fails on trajectories that come near the equilibrium, so it becomes unattainable as $n$ grows when every neighborhood of it has positive probability of containing an initial state; the Lab's relative margin is a different premise.

### Where it is used {#uses}

[[boffi-lemma-4-1]], [[boffi-thm-4-2]].
