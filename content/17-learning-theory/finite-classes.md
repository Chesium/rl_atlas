+++
summary = "Union bounds connect class size to data requirements, with a faster rate when empirical errors vanish."
prereqs = ["concentration", "risk-erm"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, §2.3.1 and Chapter 4", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The question: how much data does a finite menu need? {#statement}

[[risk-erm]] reduced the analysis of empirical risk minimization to one requirement: on the observed sample, every member of the class must have empirical risk close to its population risk, at the same time. [[concentration]] controls one member at a time. This station combines the two for a class with finitely many members, and obtains two different answers: a general one of order $1/\sqrt n$, and a much faster one of order $1/n$ for members that make **no** errors on the sample. The second is the simplest instance of the fast rate behind the certificate theorems of Part 18.

**Recalled from the prerequisites.** Examples $Z_1,\dots,Z_n$ are i.i.d. A hypothesis $\psi$ from the class $\Psi$ has loss function $f_\psi(z)=\ell(\psi,z)$, population risk $Pf_\psi=\mathbb Ef_\psi(Z)$ and empirical risk $P_nf_\psi=\frac1n\sum_if_\psi(Z_i)$. The class is **fixed before the data** and here it is finite, with $|\Psi|$ members. Hoeffding's inequality: if a fixed function takes values in $[0,1]$, then for $\epsilon>0$
$$\Pr\big(|P_nf-Pf|\ge\epsilon\big)\le2e^{-2n\epsilon^2}.$$
$\delta\in(0,1)$ is a failure probability and $\log$ is natural.

**The union bound.** For any events $A_1,\dots,A_m$,
$$\Pr(A_1\cup\dots\cup A_m)\le\Pr(A_1)+\dots+\Pr(A_m).$$
For two events, $\Pr(A\cup B)=\Pr(A)+\Pr(B)-\Pr(A\cap B)$, and the subtracted term is nonnegative; more events follow by repeating the step. The bound is exact when the events cannot happen together and wasteful when they overlap heavily. It needs no independence between the events.

::: theorem {#thm-finite} Uniform deviation of a finite class
Let $\Psi$ be finite and fixed in advance, with losses in $[0,1]$. With probability at least $1-\delta$, simultaneously for every $\psi\in\Psi$,
$$|P_nf_\psi-Pf_\psi|\le\sqrt{\frac{\log(2|\Psi|/\delta)}{2n}}. \label{finite-dev}$$
:::

### Proof and consequences {#reasoning}

::: proof
Fix $\epsilon>0$. For each $\psi$ let $A_\psi$ be the event $|P_nf_\psi-Pf_\psi|\ge\epsilon$. Since $\psi$ was fixed before sampling, Hoeffding applies to it: $\Pr(A_\psi)\le2e^{-2n\epsilon^2}$. Some member deviates exactly when the union of the events $A_\psi$ happens, and by the union bound
$$\Pr\Big(\bigcup_{\psi\in\Psi}A_\psi\Big)\le\sum_{\psi\in\Psi}\Pr(A_\psi)\le2|\Psi|e^{-2n\epsilon^2}.$$
Set the right side equal to $\delta$ and solve: $\epsilon=\sqrt{\log(2|\Psi|/\delta)/(2n)}$. Outside the union, which has probability at least $1-\delta$, every member is within $\epsilon$.
:::

This is the argument of Shalev-Shwartz and Ben-David, Corollary 4.6 (2014, §4.2, eqs. (4.1)–(4.2), pp. 32–34 / PDF pp. 50–52), written as a deviation instead of a sample size.

**The price of the class is a logarithm.** Doubling the number of members adds only $\log2$ inside the square root. A class of a million members costs $\log10^6\approx13.8$.

**ERM.** On the event of \ref{thm-finite}, the excess-risk decomposition of [[risk-erm]] gives $P\hat f\le Pf^\star+2\epsilon$ for the empirical minimizer $\hat f$ and any fixed comparator $f^\star$ in the class. Solving $2\epsilon\le\epsilon_0$ for $n$ gives the sample size $n\ge2\log(2|\Psi|/\delta)/\epsilon_0^2$, Shalev-Shwartz and Ben-David's agnostic sample complexity. The order $1/\epsilon_0^2$ is the cost of estimating every risk to within $\epsilon_0$, including risks near $\tfrac12$.

### Zero errors give a faster rate {#zero-error}

Now let the loss be binary, $f_\psi(z)\in\{0,1\}$, as for the 0–1 loss of a classifier or the violation indicator of a certificate. Ask a narrower question: if a member makes **no** errors on the sample, how large can its risk be?

::: theorem {#thm-zero} Zero empirical error, finite class
Let $\Psi$ be finite and fixed in advance, with binary losses. With probability at least $1-\delta$, every $\psi\in\Psi$ with $P_nf_\psi=0$ satisfies
$$Pf_\psi\le\frac{\log(|\Psi|/\delta)}{n}. \label{zero-rate}$$
:::

::: proof
Let $\epsilon=\log(|\Psi|/\delta)/n$. Call $\psi$ **bad** if $Pf_\psi>\epsilon$. Whether a member is bad depends on the distribution only, not on the sample, so the set of bad members is fixed.

*Step 1: one bad member rarely looks perfect.* For a bad $\psi$, each example independently shows no error with probability $1-Pf_\psi<1-\epsilon$. Zero empirical error means no error on all $n$ examples, so by independence
$$\Pr(P_nf_\psi=0)=(1-Pf_\psi)^n\le(1-\epsilon)^n\le e^{-n\epsilon}.$$
The last step uses $1-x\le e^{-x}$: the convex curve $e^{-x}$ lies above its tangent line $1-x$ at $x=0$.

*Step 2: union over the bad members.* The probability that *some* bad member looks perfect is at most (number of bad members)$\cdot e^{-n\epsilon}\le|\Psi|e^{-n\epsilon}=\delta$, by the choice of $\epsilon$.

*Step 3: conclude.* Outside that event, no bad member has zero empirical error. So every member with zero empirical error has $Pf_\psi\le\epsilon$.
:::

This is Shalev-Shwartz and Ben-David's analysis of §2.3.1 (2014, eqs. (2.5)–(2.9) and Corollary 2.3, pp. 18–20 / PDF pp. 36–38), stated for every zero-error member instead of for ERM.

**Where realizability enters.** The theorem is about members that happen to have zero empirical error; it does not say any such member exists. Under the **realizability assumption**, some $\psi^\star\in\Psi$ has $Pf_{\psi^\star}=0$ (Shalev-Shwartz and Ben-David, Definition 2.1, p. 17 / PDF p. 35). Then $\psi^\star$ makes no errors on any sample with probability one, so ERM returns a zero-error member $\hat\psi$, and \ref{zero-rate} gives $Pf_{\hat\psi}\le\log(|\Psi|/\delta)/n$. Without realizability ERM may make errors on the sample, and the theorem is silent about it. In certificate learning the role of "zero empirical error" is played by feasibility: the learner keeps only candidates that satisfy the condition on every sampled trajectory ([[margin-bounds]]).

**The same proof for $[0,1]$-valued losses.** Step 1 used only $\Pr(f_\psi(Z)=0)\le1-Pf_\psi$. That remains true when $f_\psi$ takes values in $[0,1]$, because $f_\psi\le\mathbf 1\{f_\psi>0\}$ gives $Pf_\psi\le\Pr(f_\psi(Z)>0)$. So \ref{zero-rate} also holds for every member whose loss is exactly $0$ on all sampled examples.

**Why the two rates differ.** \ref{thm-finite} estimates every risk to within $\epsilon$. A binary loss with mean near $\tfrac12$ has standard deviation (the square root of the variance, [[concentration]]) near $\tfrac12$, and the average of $n$ independent copies has standard deviation about $\frac1{2\sqrt n}$. The empirical risk typically misses the risk by that much, so an accuracy $\epsilon$ guaranteed for every member must be of order $1/\sqrt n$. \ref{thm-zero} only separates risk $0$ from risk above $\epsilon$. A member with risk $\epsilon$ errs on a given example with probability $\epsilon$, so after about $1/\epsilon$ examples it has usually revealed an error: $\epsilon$ of order $1/n$. Hoeffding's inequality uses the range of the loss and not its variance, which is small when the mean is small; that is why it cannot see the faster rate.

### Worked case: two members {#example}

::: example {#ex-two} $|\Psi|=2$ and $\delta=0.05$
The zero-error bound \ref{zero-rate} is $\log(2/0.05)/n=\log40/n\approx3.689/n$. At $n=100$ it is $0.0369$. The uniform deviation \ref{finite-dev} is $\sqrt{\log(4/0.05)/(2n)}=\sqrt{\log80/(2n)}$, which is $0.148$ at $n=100$, and ERM's excess-risk guarantee is twice that, $0.296$.

To guarantee risk at most $0.01$:

- with zero empirical errors, $n\ge\log40/0.01\approx368.9$, so $369$ examples;
- through uniform deviation $\epsilon=0.01$, $n\ge\log80/(2\cdot0.01^2)\approx21{,}910.1$, so $21{,}911$ examples.

**A concrete check.** Let $\psi_1$ have risk $0$ and $\psi_2$ risk $0.1$, with $n=50$. The bound is $\log40/50\approx0.074$, so $\psi_2$ is bad. It shows zero errors with probability $0.9^{50}\approx0.0052$, below $e^{-5}\approx0.0067$ and far below $\delta=0.05$. With probability at least $0.95$, therefore, the only zero-error member is $\psi_1$; the theorem's guarantee is cruder than this exact calculation, as a union bound must be.
:::

**Counting parameters.** Shalev-Shwartz and Ben-David's "discretization trick" (Remark 4.1, p. 34 / PDF p. 52) observes that a model with $k$ real parameters stored as 64-bit numbers belongs to a finite class with at most $2^{64k}$ members. Then $\log|\Psi|\le64k\log2\approx44.4k$, and \ref{zero-rate} becomes a bound of order $k/n$. With $k=3$, $\delta=0.05$ and $n=1000$ it is $(133.1+3.0)/1000\approx0.136$. This depends on the number format, so it is a heuristic; [[rademacher-complexity]] and [[covering-dudley]] replace it with format-free measures. The order $k/n$ is, up to a $\log^3n$ factor and class constants, the shape of Theorem 4.2 of Boffi et al. ([[boffi-thm-4-2]]).

### Assumptions and a failure {#assumptions}

**The class must be fixed before the data.** Both proofs bound the probability that a *fixed* member is misleading and then add over a list written down in advance. Suppose instead the learner builds the class from the sample: it looks at the sample and puts into a one-member class the memorizer of that sample from the uniform-interval example of [[risk-erm]]. The formula \ref{zero-rate} would claim risk at most $\log(1/\delta)/n$, which is $0.03$ for $n=100$ and $\delta=0.05$, but the memorizer has risk $\tfrac12$ on every sample. Step 1 failed: for a member chosen to fit the sample, $\Pr(P_nf_\psi=0)=1$, not $(1-Pf_\psi)^n$.

- **Several classes tried.** If a learner tries classes $\Psi_1,\dots,\Psi_K$, all listed in advance, and keeps a zero-error member of any of them, the union bound must run over all of them: replace $|\Psi|$ by $|\Psi_1|+\dots+|\Psi_K|$.
- **Independent examples.** Step 1 multiplies $n$ probabilities. Time samples of one trajectory are not independent examples ([[trajectories-as-samples]]).
- **Binary or $[0,1]$-valued losses** for \ref{thm-zero}; losses in $[0,1]$ for \ref{thm-finite} (another range $[a,b]$ multiplies \ref{finite-dev} by $b-a$).
- **Finite classes.** For an infinite class, $|\Psi|=\infty$ and both bounds are vacuous. [[uniform-convergence]] explains what replaces the count.

### Practise the two rates {#questions}

::: question
A class has $1000$ members and $\delta=0.01$. How many examples guarantee (a) risk at most $0.05$ for every zero-error member; (b) uniform deviation at most $0.05$; (c) ERM excess risk at most $0.05$ through (b)?
---
(a) $n\ge\log(10^5)/0.05=11.513/0.05\approx230.3$, so $231$. (b) $n\ge\log(2\times10^5)/(2\cdot0.05^2)=12.206/0.005\approx2441.2$, so $2442$. (c) ERM needs $2\epsilon\le0.05$, so $\epsilon=0.025$ and $n\ge12.206/(2\cdot0.025^2)\approx9764.9$, so $9765$.
:::

::: question
A learner's finite class contains no member with zero population risk, and on the observed sample the best member makes $3$ errors in $100$ examples. What does \ref{thm-zero} say about it, and what can be said instead?
---
Nothing: the theorem only concerns members with zero empirical error, and the realizability route needs a member with zero population risk. \ref{thm-finite} still applies: with probability at least $1-\delta$ the member's risk is at most $0.03+\sqrt{\log(2|\Psi|/\delta)/200}$, a bound of order $1/\sqrt n$.
:::

### Where it is used {#uses}

[[uniform-convergence]] generalizes the union bound to infinite classes. [[margin-bounds]] carries the zero-error rate to infinite classes with a margin. [[boffi-thm-4-2]] has the same $k/n$ shape, up to a $\log^3n$ factor and class constants.

## Card

### The idea {#idea}

For a finite class fixed in advance, with $[0,1]$ losses, with probability at least $1-\delta$:

$$\sup_{\psi\in\Psi}|P_nf_\psi-Pf_\psi|\le\sqrt{\frac{\log(2|\Psi|/\delta)}{2n}}.$$

With binary losses, every member with zero empirical error has $Pf_\psi\le\log(|\Psi|/\delta)/n$.

### Intuition and example {#intuition}

Hoeffding for each member, then the union bound: the class costs $\log|\Psi|$. Zero errors: a member with risk above $\epsilon$ survives $n$ examples with probability $(1-\epsilon)^n\le e^{-n\epsilon}$; add over at most $|\Psi|$ such members. Example: $|\Psi|=2$, $\delta=0.05$ gives $\log40/n\approx3.69/n$; risk $0.01$ needs $369$ examples this way, but $21{,}911$ through uniform deviation $0.01$.

### Assumptions and domain {#assumptions}

The class is listed before the data; examples are independent. The fast bound concerns zero-error members; ERM returns one under realizability (some member has risk $0$). A class built from the sample breaks both proofs.

### Where it is used {#uses}

[[uniform-convergence]], [[margin-bounds]], [[boffi-thm-4-2]].
