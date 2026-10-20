+++
summary = "Separate population risk from the empirical objective used to choose a hypothesis."
prereqs = []
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapters 2–4", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The question: what does a good fit on data promise? {#statement}

A learner receives examples, searches a family of candidate models, and keeps the one that does best on those examples. The quantity it can compute is performance on the data it has. The quantity we care about is performance on data it has not seen. This station defines both quantities, names the rule that picks a model by the first, and isolates exactly what must be controlled for the second to follow. The answer, a three-term decomposition, is the interface that the rest of the learning-theory chapter fills in.

**Examples and independence.** An *example* is a point $z$ of a set $\mathcal Z$. For a prediction task $z=(x,y)$ is an input with its label; for certificate learning (Part 18) one example will be one whole trajectory, identified by its initial state. The data are $n$ examples $Z_1,\dots,Z_n$. We assume they are **independent and identically distributed (i.i.d.)**: each $Z_i$ is drawn from the same unknown distribution, and the draws do not influence each other. Formally, for any events $A_1,\dots,A_n$, $\Pr(Z_1\in A_1,\dots,Z_n\in A_n)=\prod_i\Pr(Z\in A_i)$, where $Z$ denotes a generic fresh draw from the same distribution. The count $n$ is the number of such independent draws.

**Expectation, briefly.** For a real-valued function $u$ of an example, $\mathbb E\,u(Z)$ is the probability-weighted average of $u$ over the distribution. If $Z$ takes finitely many values $z$ with probabilities $p(z)$, then $\mathbb E\,u(Z)=\sum_z p(z)\,u(z)$. For an event $A$, the **indicator** $\mathbf 1\{A\}$ is $1$ if $A$ happens and $0$ otherwise, and $\mathbb E\,\mathbf 1\{A\}=\Pr(A)$.

**Hypotheses and losses.** A *hypothesis* $\psi$ is one candidate model, for instance a classifier or a certificate. The *hypothesis class* $\Psi$ is the set of candidates the learner is allowed to choose from, and it is fixed **before** the data are seen. A **loss** $\ell(\psi,z)\ge0$ scores hypothesis $\psi$ on example $z$; smaller is better. Two losses recur:

- the **0–1 loss** for a classifier, $\ell(\psi,(x,y))=\mathbf 1\{\psi(x)\neq y\}$, which counts a mistake;
- the **violation loss** for a certificate, which is $1$ if the certificate's inequality fails somewhere on the example and $0$ otherwise ([[trajectories-as-samples]]).

It is convenient to turn each hypothesis into one function of the example, its **loss function** $f_\psi(z)=\ell(\psi,z)$. The set $F=\{f_\psi:\psi\in\Psi\}$ is the **loss class**. Choosing a hypothesis is the same as choosing a member of $F$, and the later stations state their results for $F$.

::: definition {#def-risk} Population risk and empirical risk
For a function $f$ of an example, write
$$\begin{aligned}Pf&=\mathbb E\,f(Z),\\ P_nf&=\frac1n\sum_{i=1}^nf(Z_i).\end{aligned} \label{two-means}$$
The **population risk** of $\psi$ is $Pf_\psi=\mathbb E\,\ell(\psi,Z)$, its average loss on a fresh example. The **empirical risk** of $\psi$ is $P_nf_\psi$, its average loss on the sample.
:::

$Pf_\psi$ is a fixed number that the learner cannot compute, because the distribution is unknown. $P_nf_\psi$ is computable but random: a new sample gives a new value. Many texts call these $R(h)$ and $\widehat R_n(h)$; Shalev-Shwartz and Ben-David write $L_{\mathcal D}(h)$ and $L_S(h)$ (2014, §3.2.2, eqs. (3.3)–(3.4), pp. 26–27 / PDF pp. 44–45). The atlas writes $Pf_\psi$ and $P_nf_\psi$ because Part 18 uses $h$ for a certificate residual, and [[rademacher-complexity]] reserves $R$ for a bound on the length of data vectors.

**Empirical risk minimization.** The rule *ERM* returns a hypothesis $\hat\psi$ with the smallest empirical risk in the class:
$$P_nf_{\hat\psi}\le P_nf_\psi\quad\text{for every }\psi\in\Psi.$$
If several hypotheses tie, any one of them may be returned. We write $\hat f=f_{\hat\psi}$. Shalev-Shwartz and Ben-David define ERM over a class fixed in advance in §2.3 (2014, eq. (2.4), pp. 16–17 / PDF pp. 34–35).

For a hypothesis fixed before sampling, $P_nf_\psi$ is an average of $n$ independent numbers whose mean is $Pf_\psi$, because $\mathbb E\,f_\psi(Z_i)=Pf_\psi$ for every $i$. Averages of independent numbers settle near their mean, and [[concentration]] says how fast. ERM's output is not fixed before sampling: $\hat\psi$ is chosen by looking at the same $Z_1,\dots,Z_n$ that enter $P_n\hat f$. The next section shows what that changes.

### Memorizing: zero sample loss, risk one half {#memorize}

::: example {#ex-two-states} Two equally likely states
Let the input $X$ take two values, $a$ and $b$, each with probability $\tfrac12$, and let the label always be $Y=1$. Use the 0–1 loss. The class $\Psi$ contains all four functions from $\{a,b\}$ to $\{0,1\}$. The constant hypothesis $\psi_1\equiv1$ has risk $0$.

A *memorizer* answers with the label it saw on observed inputs and $0$ on unobserved ones. Take $n=1$ and suppose $X_1=a$. The memorizer is $\psi_S(a)=1$, $\psi_S(b)=0$. Its empirical risk is $0$, because it is right on the one example. Its population risk is
$$Pf_{\psi_S}=\tfrac12\cdot0+\tfrac12\cdot1=\tfrac12,$$
since it errs exactly when a fresh input equals $b$. Both $\psi_1$ and $\psi_S$ have empirical risk $0$, so an ERM rule that breaks ties toward the memorizer is a legitimate ERM, and it returns a hypothesis with risk $\tfrac12$.
:::

The failure depends on how the sample relates to the class. With $n$ examples the memorizer still has risk $\tfrac12$ exactly when all examples show the same input, which has probability $2\cdot(\tfrac12)^n=2^{1-n}$: certain for $n=1$, $\tfrac12$ for $n=2$, and $2^{-9}\approx0.002$ for $n=10$. This class has only four members, and [[finite-classes]] shows that a fixed finite class is always rescued by enough data.

A richer class is never rescued. Let $X$ be uniform on the interval $[0,1]$ and let the label be $1$ when $X<\tfrac12$ and $0$ otherwise, so the two labels are equally likely. Let $\Psi$ contain every memorizer: for every finite set of points, each given any label, the rule that repeats those labels on those points and answers $0$ elsewhere. A finite set has probability $0$ under the uniform distribution, so every member of the class has risk $\Pr(X<\tfrac12)=\tfrac12$. Yet for every sample the member that memorizes it has empirical risk $0$. This is the memorizing predictor of Shalev-Shwartz and Ben-David (2014, §2.2.1, eq. (2.3), pp. 15–16 / PDF pp. 33–34). Each fixed member is unremarkable; only the member chosen *after* seeing the sample looks perfect.

### The excess-risk decomposition {#reasoning}

How much worse than the best available hypothesis can ERM be? Fix any comparison hypothesis $\psi^\star\in\Psi$ chosen without looking at the data, for example one with the smallest population risk if it exists, and write $f^\star=f_{\psi^\star}$. Add and subtract $P_n\hat f$ and $P_nf^\star$:
$$\begin{aligned}P\hat f-Pf^\star&=\big(P\hat f-P_n\hat f\big)\\&\quad+\big(P_n\hat f-P_nf^\star\big)\\&\quad+\big(P_nf^\star-Pf^\star\big).\end{aligned} \label{decomp}$$
This is an identity; nothing has been assumed. The three terms have different characters.

1. **The selected hypothesis's deviation**, $P\hat f-P_n\hat f$. This is the hard term: $\hat f$ depends on the sample, so it is not an average of independent numbers with mean $P\hat f$. In \ref{ex-two-states} it equals $\tfrac12-0=\tfrac12$.
2. **The optimization term**, $P_n\hat f-P_nf^\star$. It is at most $0$, because ERM minimizes $P_n$ over the class and $f^\star$ is in the class.
3. **The comparator's deviation**, $P_nf^\star-Pf^\star$. Here $f^\star$ is fixed in advance, so this is the deviation of an ordinary average and [[concentration]] controls it.

In the example the three terms are $\tfrac12$, $0$ and $0$, and they add up to the excess risk $\tfrac12-0$.

**The uniform deviation controls term 1.** Since $\hat f$ is *some* member of $F$, whichever member it is,
$$P\hat f-P_n\hat f\le\sup_{f\in F}\big(Pf-P_nf\big).$$
The supremum $\sup$ is the smallest number at least as large as every value in the family; when one member attains it, it is the maximum. The inequality holds on every sample, no matter how $\hat f$ was selected. Suppose that on some sample
$$\sup_{f\in F}\big|Pf-P_nf\big|\le\epsilon. \label{eps-rep}$$
Then term 1 is at most $\epsilon$, term 3 is at most $\epsilon$ (because $f^\star\in F$), and term 2 is at most $0$. Hence, on that sample,
$$P\hat f\le Pf^\star+2\epsilon. \label{two-eps}$$
This is Lemma 4.2 of Shalev-Shwartz and Ben-David, who call a sample satisfying \ref{eps-rep} "$\epsilon$-representative" (2014, §4.1, Definition 4.1 and Lemma 4.2, pp. 31–32 / PDF pp. 49–50; their lemma assumes $\epsilon/2$ and concludes $\epsilon$).

**Approximate minimization.** A numerical optimizer rarely finds the exact minimizer. If it returns $\tilde f\in F$ with $P_n\tilde f\le P_nf+\epsilon_{\mathrm{opt}}$ for every $f\in F$, then term 2 is at most $\epsilon_{\mathrm{opt}}$ instead of $0$, and the same steps give $P\tilde f\le Pf^\star+2\epsilon+\epsilon_{\mathrm{opt}}$. With $\epsilon=0.05$ and $\epsilon_{\mathrm{opt}}=0.01$ the guarantee is $Pf^\star+0.11$.

**Interpretation.** The decomposition separates two questions. Is the sample representative of *every* member of the class at once? That is a statistical question about the class, answered in [[uniform-convergence]], [[finite-classes]] and [[rademacher-complexity]]. Did the optimizer do its job on the sample? That is a computational question. Concentration of one fixed hypothesis answers neither: it handles term 3, not term 1. The memorizing class has uniform deviation $\tfrac12$ on every sample, so \ref{eps-rep} never holds with $\epsilon<\tfrac12$ and \ref{two-eps} gives nothing.

### Assumptions and domain {#assumptions}

- **Independent examples from one distribution.** The risk $Pf_\psi$ is defined for the distribution that generated the sample. If deployment draws examples from another distribution, a small $Pf_\psi$ says nothing about deployment.
- **A class fixed before the data.** If the class itself is chosen after looking at the data, for instance by adding candidates until one fits, the selection effect reappears at the level of classes. A validation set used to choose among classes is no longer a fresh test set for the chosen one.
- **Measurable, finite risks.** Each $f_\psi(Z)$ must be a random variable with a finite mean; Shalev-Shwartz and Ben-David state this per-loss measurability requirement in Remark 3.1 (2014, p. 27 / PDF p. 45). Separately, the supremum in \ref{eps-rep} must be a well-defined random variable. We assume this. It holds for countable classes, and for classes whose supremum equals the supremum over a countable subfamily, for example when $f_\theta(z)$ is continuous in a real parameter $\theta$ for each $z$. For indicator losses, such as the 0–1 loss, continuity in $\theta$ fails and the property is simply assumed.
- **What is concluded.** \ref{two-eps} compares ERM with the best member of the *class*. If every member is poor, ERM is poor too; the decomposition is silent about that approximation gap.

### Check the decomposition {#questions}

::: question
In \ref{ex-two-states} with $n=2$, list the four equally likely samples. For each, which hypotheses have empirical risk $0$, and what is the risk of the memorizer? What is the probability that a tie-breaking ERM can return a hypothesis with risk at least $\tfrac12$?
---
The samples are $(a,a)$, $(a,b)$, $(b,a)$, $(b,b)$. On $(a,a)$ the zero-loss hypotheses are those with $\psi(a)=1$: $\psi_1\equiv1$ and the memorizer $\psi(a)=1,\psi(b)=0$, with risk $\tfrac12$. On $(b,b)$ they are $\psi_1$ and the memorizer $\psi(a)=0,\psi(b)=1$, again risk $\tfrac12$. On the two mixed samples only $\psi_1$ has zero loss, and the memorizer equals $\psi_1$, with risk $0$. So with probability $\tfrac24=\tfrac12=2^{1-n}$ an ERM may return a risk-$\tfrac12$ hypothesis.
:::

::: question
A learner reports: "on every sample, every member of my class has empirical and population risk within $0.03$ of each other; my optimizer returns a hypothesis within $0.005$ of the smallest empirical risk." Bound the excess risk over the best member of the class. Which term of \ref{decomp} would a concentration bound for one fixed hypothesis fail to control?
---
Term 1 is at most $0.03$, term 2 at most $0.005$ and term 3 at most $0.03$, so the excess risk is at most $2(0.03)+0.005=0.065$. A bound for one fixed hypothesis controls term 3, whose hypothesis $\psi^\star$ was fixed in advance. It does not control term 1, because the returned hypothesis was selected using the sample.
:::

### Where it is used {#uses}

[[uniform-convergence]] studies the supremum in \ref{eps-rep}. [[finite-classes]] bounds it with concentration and a union bound. [[trajectories-as-samples]] identifies the example, the loss and $n$ for certificate learning.

## Card

### The idea {#idea}

Population risk $Pf_\psi=\mathbb E\,\ell(\psi,Z)$ is what we want; empirical risk $P_nf_\psi=\frac1n\sum_i\ell(\psi,Z_i)$ is what we can compute. ERM picks the class member with the smallest empirical risk. Many texts write $R(h)$ and $\widehat R_n(h)$.

### Intuition and example {#intuition}

For a comparator $f^\star$ fixed in advance:

$$\begin{aligned}P\hat f-Pf^\star&=(P\hat f-P_n\hat f)\\&\quad+(P_n\hat f-P_nf^\star)\\&\quad+(P_nf^\star-Pf^\star).\end{aligned}$$

The middle term is $\le0$ for exact ERM ($\le\epsilon_{\mathrm{opt}}$ for an approximate one). If $\sup_f|Pf-P_nf|\le\epsilon$, the outer terms are $\le\epsilon$ each, so $P\hat f\le Pf^\star+2\epsilon$. Example: two equally likely inputs, label always $1$, one example; the memorizer has empirical risk $0$ and risk $\tfrac12$.

### Assumptions and domain {#assumptions}

I.i.d. examples from the deployment distribution; a class fixed before the data; measurable losses with finite means. The first term needs uniform control because the selected hypothesis depends on the sample; one fixed hypothesis's concentration controls only the third.

### Where it is used {#uses}

[[uniform-convergence]], [[finite-classes]], [[trajectories-as-samples]].
