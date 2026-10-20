+++
summary = "Control an entire class at once so the guarantee covers a hypothesis selected from the data."
prereqs = ["risk-erm"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapters 4, 26", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The question: which guarantee survives selection? {#statement}

A learner looks at the sample and then picks a hypothesis. A guarantee that each hypothesis, taken by itself, is probably accurate does not tell us that the *picked* one is accurate, because the picking can steer toward exactly the hypotheses that the sample flatters. This station states the guarantee that does survive selection, shows on a four-sample example why the weaker one does not, and lays out the route by which the next stations establish the stronger one for infinite classes.

**Recalled from [[risk-erm]].** Examples $Z_1,\dots,Z_n$ are i.i.d. draws, each distributed like a generic example $Z$. A hypothesis $\psi$ in the class $\Psi$ has loss function $f_\psi(z)=\ell(\psi,z)$; the loss class is $F=\{f_\psi:\psi\in\Psi\}$, fixed before the data. For each $f\in F$,
$$Pf=\mathbb E\,f(Z),\qquad P_nf=\frac1n\sum_{i=1}^nf(Z_i)$$
are the population and empirical means; for $f=f_\psi$ they are the risk and empirical risk of $\psi$. $\sup$ denotes the supremum, the smallest number at least as large as every member of a family; it is the maximum when some member attains it. $\delta\in(0,1)$ is a failure probability.

The difference between the two guarantees is the **order of the quantifiers**:

- **Pointwise:** for every $\psi\in\Psi$, $\ \Pr\big(|P_nf_\psi-Pf_\psi|\le\epsilon\big)\ge1-\delta$.
- **Uniform:** $\ \Pr\big(\text{for every }\psi\in\Psi,\ |P_nf_\psi-Pf_\psi|\le\epsilon\big)\ge1-\delta$.

In the pointwise statement, each hypothesis has its own bad set of samples, of probability at most $\delta$, and these bad sets can differ. In the uniform statement there is one **common event**, of probability at least $1-\delta$, on which every hypothesis is accurate at once. The uniform statement is equivalent to
$$\Pr\Big(\sup_{f\in F}|P_nf-Pf|\le\epsilon\Big)\ge1-\delta, \label{uniform}$$
which is a statement about one random number, the **uniform deviation** $\sup_{f\in F}|P_nf-Pf|$. A class for which \ref{uniform} holds with an $\epsilon$ that depends only on $n$ and $\delta$, not on the distribution, and tends to $0$ as $n$ grows, is said to have the uniform convergence property (Shalev-Shwartz and Ben-David, Definition 4.3, 2014, §4.1, p. 32 / PDF p. 50).

### Worked case: two models, each good on a different point {#example}

::: example {#ex-two-models} Selection makes unbiased models look perfect
The input takes two values $a$ and $b$, each with probability $\tfrac12$, and $n=2$. Model $\psi_1$ has loss $0$ at $a$ and loss $1$ at $b$; model $\psi_2$ has loss $1$ at $a$ and loss $0$ at $b$. Each has risk $\tfrac12$. ERM keeps the model with the smaller empirical risk. The four equally likely samples give:

- $(a,a)$: $P_nf_1=0$, $P_nf_2=1$. ERM picks $\psi_1$, with empirical risk $0$ and risk $\tfrac12$.
- $(a,b)$ and $(b,a)$: $P_nf_1=P_nf_2=\tfrac12$. Either model is picked; its empirical risk $\tfrac12$ equals its risk.
- $(b,b)$: $P_nf_1=1$, $P_nf_2=0$. ERM picks $\psi_2$, with empirical risk $0$ and risk $\tfrac12$.

For the **fixed** model $\psi_1$, the empirical risk is $0$, $\tfrac12$, $\tfrac12$, $1$ on the four samples, so on average it equals the risk: $\mathbb E[Pf_1-P_nf_1]=0$. It looks perfect with probability $\tfrac14$. For the **selected** model, the gap $Pf_{\hat\psi}-P_nf_{\hat\psi}$ is $\tfrac12,0,0,\tfrac12$: it looks perfect with probability $\tfrac12$, and on average its empirical risk understates its risk by $\tfrac14$.
:::

Each model separately is unbiased; the selection creates the bias, by picking whichever model the sample happens to favor. The event "some model looks perfect" is the union of the two models' events. They are disjoint, so its probability is $\tfrac14+\tfrac14=\tfrac12$, which is exactly the probability that the selected model looks perfect. The common event "neither model looks perfect" (the two mixed samples) has probability $\tfrac12$, and on it the selected model's empirical risk is exact whichever model ERM takes.

**More models make it worse.** Let the input be uniform on $\{1,\dots,M\}$, let $n=1$, and let model $\psi_j$ have loss $0$ at input $j$ and $1$ elsewhere, so each has risk $1-\tfrac1M$. Each fixed model looks perfect with probability only $\tfrac1M$; for $M=10$, the pointwise statement holds for every model with $\delta=0.1$ and any $\epsilon$ in $[0.1,0.9)$, because a fixed model's empirical risk is $0$ with probability $0.1$ and otherwise equals $1$, within $0.1$ of its risk $0.9$. Yet the model matching the observed input always looks perfect, so ERM's choice has empirical risk $0$ and risk $0.9$ every time. The union bound gives $M\cdot\tfrac1M=1$ for the probability that some model looks perfect, which is the truth. Pointwise guarantees, however strong for each member, say nothing about the member the data select.

### Why one common event is enough {#reasoning}

::: lemma {#lem-select} Any selection is covered by the supremum
Let $\hat f\in F$ be chosen from the sample by any rule whatsoever. Then on every sample
$$P\hat f-P_n\hat f\le\sup_{f\in F}\big(Pf-P_nf\big)\le\sup_{f\in F}|Pf-P_nf|.$$
:::

::: proof
Whatever the sample is, $\hat f$ is one member of $F$, and a supremum is at least as large as each member's value. The second inequality holds because $x\le|x|$ for each member.
:::

The lemma is deterministic: it holds sample by sample, with no probability involved. That is the point. On the common event of \ref{uniform}, the right side is at most $\epsilon$, so the selected model is within $\epsilon$ no matter how it was selected, by ERM, by an approximate optimizer, or by a rule that inspects the data in any other way. In \ref{ex-two-models} the lemma holds with equality on every sample. Combined with the excess-risk decomposition of [[risk-erm]], a uniform deviation $\epsilon$ gives ERM an excess risk at most $2\epsilon$ over any fixed comparator in the class.

For ERM only one direction is needed. The selected model's term $P\hat f-P_n\hat f$ is bounded by the **one-sided** supremum $\sup_f(Pf-P_nf)$, and the comparator's term $P_nf^\star-Pf^\star$ concerns a fixed function, which [[concentration]] handles directly. Shalev-Shwartz and Ben-David combine the two parts this way in Theorem 26.5, part 3 (2014, §26.1, pp. 328–329 / PDF pp. 346–347).

**Finite classes.** For finitely many members the union bound turns pointwise into uniform at the cost of a factor $|\Psi|$ in the failure probability, and so of $\log|\Psi|$ in $\epsilon$ ([[finite-classes]]).

**Infinite classes.** The union bound adds one term per member, so for infinitely many members it gives nothing. Some infinite classes nevertheless converge uniformly and some do not:

- The memorizing class of [[risk-erm]], with uniform inputs on $[0,1]$, has members of risk $\tfrac12$ and, on every sample, a member with empirical risk $0$. Its uniform deviation is $\tfrac12$ on every sample, for every $n$. It never converges.
- The class of linear functions $z\mapsto w^{\mathsf T}z$ with $\|w\|_2\le B$, on data with $\|z\|_2\le R$, is infinite, yet it can fit pure noise only to the extent $BR/\sqrt n$ ([[rademacher-complexity]]), and its uniform deviation shrinks at that rate.

What separates them is not the number of members but how well the class can follow arbitrary patterns in the sample. The next stations measure that.

### The route for infinite classes {#route}

The uniform deviation $G=\sup_{f\in F}(Pf-P_nf)$ is one random number, a function of $Z_1,\dots,Z_n$. Bound it in two steps. Take losses in $[0,1]$ and assume the supremum is a well-defined random variable (true for countable classes and for classes whose supremum equals the supremum over a countable subfamily, for example when $f_\theta(z)$ is continuous in a real parameter $\theta$; for indicator classes it is assumed).

**Step 1: $G$ is close to its mean.** Replacing one example changes every $P_nf$ by at most $\tfrac1n$, so it changes $G$ by at most $\tfrac1n$. McDiarmid's bounded-differences inequality, recalled in [[concentration]] from Shalev-Shwartz and Ben-David (Lemma 26.4, p. 328 / PDF p. 346), then gives, with probability at least $1-\delta$,
$$G\le\mathbb E\,G+\sqrt{\frac{\log(2/\delta)}{2n}}.$$

**Step 2 (sketch): the mean is controlled by random signs.** The idea is a **ghost sample**. The population mean $Pf$ is the expected empirical mean of an imaginary second sample $Z'_1,\dots,Z'_n$, independent of the first and never observed: $Pf=\mathbb E\,P'_nf$ with $P'_nf=\frac1n\sum_if(Z'_i)$. This replaces the unknown population by a second sample. Because the supremum of an average is at most the average of the supremum, $\mathbb EG$ is at most the expected largest gap $\sup_f(P'_nf-P_nf)$ between two samples' averages. Each pair is **exchangeable**: $(Z_i,Z'_i)$ and $(Z'_i,Z_i)$ have the same distribution. So swapping the two points of a pair at random does not change any expectation, and that swap attaches an independent random sign $\sigma_i=\pm1$ to each difference. Finally, the supremum of a sum is at most the sum of the suprema, so the signed gap splits into one supremum for the ghost sample and one for the real sample. Each has expectation equal to the expected Rademacher complexity, which gives the factor $2$. Below, $\mathbb E_Z$ averages over the sample and $\mathbb E_\sigma$ over the signs. The result is the **symmetrization inequality**
$$\mathbb E\sup_{f\in F}\big(Pf-P_nf\big)\le2\,\mathbb E_Z\,\widehat{\mathfrak R}_n(F;Z_{1:n}),$$
where $\widehat{\mathfrak R}_n(F;Z_{1:n})=\mathbb E_\sigma\sup_{f\in F}\frac1n\sum_i\sigma_if(Z_i)$ is the empirical Rademacher complexity: with the sample fixed, the average over fair signs of the best correlation between the class and the signs. The complete four-step proof is the symmetrization theorem of [[rademacher-complexity]] (its inequality (4)), following Shalev-Shwartz and Ben-David, Lemma 26.2 (2014, §26.1, p. 326 / PDF p. 344). [[rademacher-properties]] recalls this inequality and develops the rules for computing complexities of transformed classes.

**Assembled.** With probability at least $1-\delta$, simultaneously for every $f\in F$,
$$Pf\le P_nf+2\,\mathbb E_Z\widehat{\mathfrak R}_n(F)+\sqrt{\frac{\log(2/\delta)}{2n}}. \label{assembled}$$
This has the shape of Shalev-Shwartz and Ben-David's Theorem 26.5, part 1 (2014, pp. 328–329 / PDF pp. 346–347), re-derived here for losses in $[0,1]$ (range width $1$, bounded-differences constant $1/n$). Their version assumes $|\ell|\le c$, uses the constant $2c/n$, and has confidence term $c\sqrt{2\log(2/\delta)/n}$; with $c=1$ that is twice ours, which is why [[rademacher-complexity]], quoting their form, shows a different constant. For example, with $n=1000$, $\delta=0.05$ and a class whose expected complexity is at most $0.05$, every member's risk exceeds its empirical risk by at most $0.10+\sqrt{\log40/2000}\approx0.10+0.043=0.143$, including the member ERM selects.

**The rate.** For classes such as the linear ball, the complexity is of order $1/\sqrt n$, and so is the confidence term. Bounds of the form \ref{assembled} therefore decrease like $1/\sqrt n$. They cannot do better when some members have risk near $\tfrac12$, for the variance reason explained in [[finite-classes]]. The certificate theorems of Boffi et al. achieve order $1/n$ (up to logarithms) by a different route that uses zero empirical violations and a margin; [[margin-bounds]] explains that route, and it is not a consequence of \ref{assembled}.

### Assumptions and domain {#assumptions}

- **Independent examples and a fixed class.** McDiarmid and symmetrization both need independent examples; symmetrization also needs the ghost sample to have the same distribution as the real one. The class must not be enlarged after looking at the data.
- **Bounded losses.** The fluctuation term in \ref{assembled} uses losses in $[0,1]$; a range $[a,b]$ multiplies it by $b-a$.
- **A measurable supremum.** For uncountable classes, $\sup_fP_nf$ must be a random variable. This is an assumption. It holds when the supremum reduces to one over a countable subfamily, as for parameters entering continuously, and it is assumed without proof for indicator classes such as violation losses.
- **What is concluded.** A one-sided bound $Pf\le P_nf+\dots$ for every member. It says nothing about members outside the class, nor about a distribution other than the one that generated the sample.

### Check the quantifiers {#questions}

::: question
In \ref{ex-two-models}, add a third model $\psi_3$ with loss $\tfrac12$ at both inputs. What does ERM pick on each sample, and what is the expected gap $\mathbb E[Pf_{\hat\psi}-P_nf_{\hat\psi}]$ now? (Break ties in favor of $\psi_3$.)
---
$\psi_3$ has empirical risk $\tfrac12$ on every sample and risk $\tfrac12$. On $(a,a)$ and $(b,b)$ one of $\psi_1,\psi_2$ has empirical risk $0<\tfrac12$ and is picked, with gap $\tfrac12$. On the mixed samples all three tie at $\tfrac12$ and $\psi_3$ is picked, with gap $0$. The expected gap is still $\tfrac14(\tfrac12+0+0+\tfrac12)=\tfrac14$. Adding a model that cannot be flattered does not remove the bias created by the two that can.
:::

::: question
A colleague proves: "for each fixed $w$ in an infinite parameter set, with probability at least $0.95$ the empirical risk of $w$ is within $0.02$ of its risk", and then applies it to the $\hat w$ found by gradient descent on the same data. What is wrong, and what statement would make the step valid?
---
The statement is pointwise: the probability-$0.05$ bad set of samples depends on $w$, and $\hat w$ is chosen by looking at the sample, so it may be exactly a $w$ whose bad set contains the observed sample (as in the $M$-model example, where every fixed model is fine with probability $0.9$ and the selected one never is). The step needs the uniform statement \ref{uniform}, a bound on $\sup_w|P_nf_w-Pf_w|$ on one event of probability at least $0.95$; then \ref{lem-select} covers $\hat w$ however it was found.
:::

### Where it is used {#uses}

[[rademacher-complexity]] measures the class's ability to fit noise and proves the symmetrization step. [[margin-bounds]] contrasts this route with the fast zero-error route used by the certificate theorems.

## Card

### The idea {#idea}

A uniform guarantee bounds $\sup_{f\in F}|P_nf-Pf|$ on one common event. Since any data-selected $\hat f$ is a member, $P\hat f-P_n\hat f\le\sup_f(Pf-P_nf)$ on every sample, so the guarantee covers the selection, whatever rule made it.

### Intuition and example {#intuition}

Pointwise ("each $\psi$ is accurate with probability $1-\delta$") is weaker than uniform ("with probability $1-\delta$, every $\psi$ is accurate"). Two equally likely inputs, two models each perfect on a different input, $n=2$: each fixed model looks perfect with probability $\tfrac14$, the selected one with probability $\tfrac12$, and its expected optimism is $\tfrac14$.

For $[0,1]$ losses, McDiarmid plus symmetrization: with probability $1-\delta$, every $f$ has $Pf\le P_nf+2\,\mathbb E\widehat{\mathfrak R}_n(F)+\sqrt{\log(2/\delta)/(2n)}$, typically order $1/\sqrt n$.

### Assumptions and domain {#assumptions}

Independent examples; a class fixed in advance; bounded losses; a measurable supremum. Finite classes use the union bound. Infinite classes need a complexity measure; size alone does not decide.

### Where it is used {#uses}

[[rademacher-complexity]], [[margin-bounds]].
