+++
summary = "Fit decrease constraints along training trajectories and measure failure on fresh ones."
prereqs = ["lyapunov-functions", "trajectories-as-samples", "controller-or-certificate"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §3, equations (3.1)–(3.3), pp.4–5", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The question {#statement}

A closed loop has been fixed, for example a trained policy together with its plant ([[controller-or-certificate]]). Lyapunov's method ([[lyapunov-functions]]) proves that it is stable if we can exhibit a function $V$ that is positive away from the equilibrium and decreases along **every** trajectory. We do not have every trajectory. We have $n$ recorded ones, and we may not even have a formula for the dynamics.

This lesson turns Lyapunov's conditions into something a finite dataset can check, and names the quantity that later theorems control. It needs three objects:

1. a **residual**, one number per state that is negative exactly when $V$ decreases fast enough there;
2. a **margin learning problem**, Boffi et al.'s problem (3.2), which asks for the residual to be at most $-\gamma$ along every recorded trajectory;
3. a **violation probability**, their (3.3): the chance that a fresh trajectory has a positive residual somewhere.

The questions to answer by the end: given a candidate and a dataset, is the margin problem feasible? And what does a small violation probability say, and not say?

### The setting {#setting}

The dynamics are $\dot x=f(x)$ with state $x\in\mathbb R^p$, where $f$ is continuous and unknown. The **flow** $\phi_t(\xi)$ is the state at time $t$ of the solution that starts at the initial state $\xi$; for the scalar loop $\dot x=-x$ it is $\phi_t(\xi)=e^{-t}\xi$. Initial states lie in a compact set $X\subset\mathbb R^p$ and are drawn from a probability distribution $\mathcal D$ on $X$. The data are $n$ initial states $\xi_1,\dots,\xi_n$, drawn **independently** from $\mathcal D$, together with their trajectories, each followed over the same time interval $T$ that starts at $0$.

Boffi et al. take $T$ to be the largest such interval on which every trajectory exists, often $[0,\infty)$. A fixed finite interval $T=[0,t_{\max}]$, chosen before the data, works equally well in everything below, and we use one in the examples. Note the convention: here $T$ names the interval itself, as in the paper, whereas [[trajectories-as-samples]] writes $T$ for its endpoint and the interval as $[0,T]$; its "$T=1$" is our $t_{\max}=1$. The count $n$ is the number of trajectories, however many times each one is recorded ([[trajectories-as-samples]]). The paper assumes the velocity $\dot x$ along a recorded trajectory is known exactly and computes it numerically in experiments; [[controller-or-certificate]] shows how a velocity error passes into the residual.

### Residuals: one inequality for every state {#residual}

A **residual** is a fixed, known, continuous function $h\big(x,\dot x,V(x),\nabla V(x)\big)$ of a state, its velocity, and the value and gradient of a candidate $V$ there. It encodes a certificate condition as "$h\le0$". Boffi et al.'s goal (3.1) is
$$h\big(\phi_t(\xi),\dot\phi_t(\xi),V(\phi_t(\xi)),\nabla V(\phi_t(\xi))\big)\le0 \label{goal}$$
for every $\xi\in X$ and every $t\in T$. (The paper allows vector-valued $V$; like the paper from §4 on, we keep $V$ scalar.)

::: definition {#def-lyap-residual} Lyapunov residual
Let $\rho:\mathbb R\to\mathbb R$ be continuous and strictly increasing with $\rho(0)=0$; on $[0,\infty)$ it is a class-$\mathcal K$ function of [[comparison-functions]]. (The paper calls it $\alpha$; the atlas keeps $\alpha$ for physical rates.) The Lyapunov residual is
$$h=\nabla V(x)^{\mathsf T}\dot x+\rho\big(V(x)\big).$$
:::

Along a trajectory $x(t)$ the chain rule gives $\frac{d}{dt}V(x(t))=\nabla V(x(t))^{\mathsf T}\dot x(t)$. So $h\le0$ along the trajectory says
$$\frac{d}{dt}V(x(t))\le-\rho\big(V(x(t))\big):$$
$V$ falls at least as fast as $\rho(V)$. With $\rho(v)=2\alpha v$ this is $\dot V\le-2\alpha V$; for a quadratic $V$ that is the energy form of the norm rate $\alpha$ ([[lyapunov-functions]]). The residual uses the **observed** velocity $\dot x$, not a formula for $f$, so evaluating it needs no model of the dynamics.

Other certificates fit the same template. For a contraction metric $M(x)$ the paper's residual is the largest eigenvalue of $J^{\mathsf T}M+MJ+\dot M+2\alpha M$, where $J$ is the Jacobian of $f$; it needs derivative information that a single trajectory does not supply, and Part 16 and [[boffi-thm-5-2]] develop it. This lesson uses the Lyapunov residual.

### Positivity is a separate condition {#positivity}

The residual encodes only **decrease**. Lyapunov's theorem also needs $V(0)=0$ and $V>0$ elsewhere ([[lyapunov-functions]]), and nothing in $h\le0$ enforces that.

For $\dot x=-x$ with $\rho(v)=v$, take the candidate $V(x)=x^2-1$. Its residual is
$$2x\cdot(-x)+(x^2-1)=-x^2-1\le-1$$
at every state, including the equilibrium. It passes every decrease check with room to spare, yet $V(0)=-1$, so it is not positive definite and proves nothing. The constant $V\equiv-1$ does the same: its residual is $\rho(-1)=-1$ everywhere.

So positivity must come from somewhere else: from the class itself, as with $V(x)=x^{\mathsf T}Px$ restricted to $P\succeq I$ in the atlas Lab, or from separate constraints. Keep the two conditions apart when reading a result. A statement about residuals is a statement about decrease only.

### The margin problem and the trajectory residual {#reasoning}

A whole trajectory is judged by its worst time. This defines a function of the initial state:

::: definition {#def-traj} Trajectory residual
$$H_V(\xi)=\sup_{t\in T}h\big(\phi_t(\xi),\dot\phi_t(\xi),V(\phi_t(\xi)),\nabla V(\phi_t(\xi))\big).$$
:::

Boffi et al. write $h(\xi,V)$ for $H_V(\xi)$, reusing the letter of the pointwise residual, and use a maximum; on a closed finite interval with a continuous residual the supremum is attained, so the two agree. Later lessons use the paper's notation $h(\xi,V)$.

::: definition {#def-problem} Margin learning problem (3.2)
Fix a class $\mathcal V$ of candidate certificates and a **margin** $\gamma>0$, both chosen before the data. Problem (3.2) asks for $V\in\mathcal V$ with
$$H_V(\xi_i)\le-\gamma\qquad\text{for }i=1,\dots,n.$$
It is **feasible** if some member of $\mathcal V$ satisfies all $n$ constraints. Write $\widehat V_n$ for any solution.
:::

Each constraint covers **every** time of one trajectory, not only the recorded times. The margin $\gamma$ is a fixed number in the residual's units; it is not the RL discount factor. In practice one solves (3.2) with an added cost, such as a norm of $V$, to pick one solution.

Feasibility is what the statistical theorems use. Define the **empirical margin loss**
$$\widehat R_n(V)=\frac1n\sum_{i=1}^n\mathbf 1\{H_V(\xi_i)>-\gamma\},$$
where $\mathbf 1\{\cdot\}$ is $1$ when its statement is true and $0$ otherwise. A solution of (3.2) has $\widehat R_n(\widehat V_n)=0$: no margin errors on the sample. This is the hook for [[boffi-lemma-4-1]].

**Testing training feasibility of a given candidate** therefore means: for each recorded trajectory, compute its worst residual over the time interval, and compare it with $-\gamma$. A numerical check sees only finitely many times. [[trajectories-as-samples]] shows that a grid can miss a violation between grid points, and gives a Lipschitz-in-time margin that closes the gap.

### The violation probability (3.3) {#err}

::: definition {#def-err} Violation probability
For a fixed candidate $V$,
$$\operatorname{err}(V)=\Pr_{\xi\sim\mathcal D}\big(H_V(\xi)>0\big),$$
the probability that a trajectory from a fresh initial state has a positive residual at some time.
:::

For the learned $\widehat V_n$, the probability is over a fresh $\xi$ drawn independently of $\xi_1,\dots,\xi_n$, with $\widehat V_n$ held fixed. Since $\widehat V_n$ depends on the sample, $\operatorname{err}(\widehat V_n)$ is itself random, and the theorems of this part bound it "with probability at least $1-\delta$ over the sample".

Three readings of this definition matter later.

- **Violation is "$>0$", not "$>-\gamma$".** The margin is demanded in training only. A fresh trajectory counts against $V$ only if the actual condition fails.
- **One bad time spoils the trajectory.** $\operatorname{err}$ counts trajectories, not the fraction of time spent violating.
- **Small is not zero.** A small $\operatorname{err}$ allows a set of initial states of small probability on which $V$ fails. It is not a proof that $V$ is a certificate on $X$; turning it into one is the job of [[boffi-thm-5-1]].

It can be estimated on holdout trajectories. If $m$ fresh initial states are drawn independently of the training data and none violates, then $1-0.05^{1/m}$ is a one-sided $95\%$ upper limit for $\operatorname{err}$, about $0.03$ for $m=100$ ([[trajectories-as-samples]]).

### Worked case: the scalar flow {#example}

::: example {#ex-scalar} Feasibility for $\dot x=-x$ and $V=x^2$
Take $\rho(v)=v$. The residual is $2x\cdot(-x)+x^2=-x^2$. Along $\phi_t(\xi)=e^{-t}\xi$ it equals $-\xi^2e^{-2t}$, which increases toward $0$ as $t$ grows. On $T=[0,t_{\max}]$ the worst time is the last one:
$$H_V(\xi)=-\xi^2e^{-2t_{\max}}.$$
So $V$ meets the margin on trajectory $i$ exactly when $\xi_i^2e^{-2t_{\max}}\ge\gamma$, that is, when
$$|\xi_i|\ge\sqrt\gamma\,e^{t_{\max}}.$$

- **Initial states away from $0$.** Let $\mathcal D$ live on $1\le|\xi|\le2$ and $t_{\max}=1$. Every trajectory has $H_V(\xi)\le-e^{-2}\approx-0.135$, so (3.2) is feasible for every sample whenever $\gamma\le0.135$.
- **Initial states around $0$.** Let $\mathcal D$ be uniform on $[-2,2]$, with $t_{\max}=1$ and $\gamma=0.01$. A trajectory meets the margin when $|\xi|\ge0.1e\approx0.272$, which has probability $1-0.272/2\approx0.864$. All $n$ independent trajectories meet it with probability $0.864^n$: about $0.054$ for $n=20$ and $4.5\times10^{-7}$ for $n=100$.
- **Unbounded horizon.** With $T=[0,\infty)$ the residual approaches $0$ along every trajectory, so $H_V(\xi)=0$ for every $\xi\ne0$ (approached, never attained), and no sample is feasible for any $\gamma>0$.

In all three settings $H_V(\xi)\le0$ for every $\xi$, so $\operatorname{err}(V)=0$: the candidate is perfect, yet the margin test can fail. The margin problem is stricter than the property it is meant to establish.
:::

The failure in the second and third settings is not a weakness of $x^2$; it affects every positive candidate at once. For the Lyapunov residual, suppose every member of the class satisfies $V\ge0$ and $\|\nabla V(x)\|\le B_{\nabla V}$, and $\|f(x)\|\le L_f\|x\|$ near the equilibrium $0$. Then $\rho(V(x))\ge\rho(0)=0$ and, by Cauchy–Schwarz,
$$h\ge-\|\nabla V(x)\|\,\|f(x)\|\ge-B_{\nabla V}L_f\|x\|.$$
At a state with $\|x\|<\gamma/(B_{\nabla V}L_f)$, every candidate's residual exceeds $-\gamma$. A trajectory that passes that close to the equilibrium makes (3.2) infeasible for the whole class. If $\mathcal D$ gives probability $q>0$ to that small ball, all $n$ samples avoid it with probability $(1-q)^n$, which tends to $0$. On an unbounded horizon every trajectory approaches the equilibrium, and (3.2) is never feasible. The candidate $x^2-1$ of \ref{positivity} escapes this argument only because it is not positive.

So a fixed scalar margin requires sampled trajectory segments that stay away from the equilibrium, as in the first setting. The atlas Lab makes a different choice: it fits with norm rate $\alpha+0.05$ and tests at rate $\alpha$. Its fitted inequality $\nabla V^{\mathsf T}\dot x+2(\alpha+0.05)V\le0$ reads $\nabla V^{\mathsf T}\dot x+2\alpha V\le-0.1\,V$, a **relative** margin proportional to $V$ that vanishes at the equilibrium. It keeps the fit feasible near the origin, but it is not the $\gamma$ of (3.2), and the Lab's results are not instances of the theorems built on it ([[boffi-thm-4-2]]).

### Two candidates for the nonnormal system {#nonnormal}

Use the atlas's shared system $\dot x=Ax$ with $A=\begin{bmatrix}-1&3\\0&-2\end{bmatrix}$, $V(x)=x^{\mathsf T}Px$ and $\rho(v)=0.2v$. Since $\nabla V=2Px$, the residual is a quadratic form:
$$h=x^{\mathsf T}\big(A^{\mathsf T}P+PA+0.2P\big)x.$$

- **The certificate of [[lyapunov-functions]].** For $P=\begin{bmatrix}1/2&1/2\\1/2&1\end{bmatrix}$, $A^{\mathsf T}P+PA=-I$, so the residual matrix is $\begin{bmatrix}-0.9&0.1\\0.1&-0.8\end{bmatrix}$, with eigenvalues $-0.962$ and $-0.738$. The residual is at most $-0.738\|x\|^2<0$ at every $x\ne0$, so $\operatorname{err}=0$ for every $\mathcal D$ and every horizon.
- **The identity.** $P=I$ gives $V=\|x\|^2$, positive definite. Its residual matrix is $\begin{bmatrix}-1.8&3\\3&-3.8\end{bmatrix}$, with eigenvalues $-5.96$ and $+0.362$. The residual is positive for directions between about $21.9^\circ$ and $49.6^\circ$ from the $x_1$-axis (and their opposites), $15.4\%$ of all directions.

How often does a trajectory cross that cone? Take $\mathcal D$ with uniformly distributed direction and $T=[0,3]$. Both the flow and the sign of the residual are unchanged when $\xi$ is scaled, so only the direction matters. Checking $7200$ evenly spaced initial directions on a time grid of step $0.001$ gives $\operatorname{err}(I)\approx0.77$. Only $15.4\%$ of trajectories start in the cone; the nonnormal transient, which first swings states toward the slow direction $(1,0)$, carries most of the others through it. A holdout of $100$ trajectories would show about $77$ violations. Positivity holds for both candidates; only the residual separates them.

### See the trajectories {#experiment}

{{flow linear}}

The picture runs the atlas engine on the shared matrix $A$: $n=4$ training trajectories from seed 1, a quadratic $V=x^{\mathsf T}Px$ fitted with $P\succeq I$ (positivity built into the class), the relative margin described above, and $20$ fresh trajectories from a separate random stream. Its caption reports how many fresh trajectories violate at a recorded time. [Open the flows and certificates Lab](#/flows) to change $n$ and the seed.

::: question
Before opening the Lab: a fitted candidate has no violation on $20$ fresh trajectories. What one-sided $95\%$ upper limit does that give for its violation probability, and why is it not a bound of the kind (3.2) leads to?
---
$1-0.05^{1/20}\approx0.139$. It is a statement about one fixed candidate and independent fresh trajectories, checked at recorded times only. It says nothing about the theorems built on (3.2), because the Lab fits a relative margin, not a fixed $\gamma$, and its fit has no fixed bound on the size of $P$, which the class-based theorems need ([[boffi-thm-4-3]]).
:::

These pictures and holdout rates are numerical evidence about the Lab's own procedure. They check finitely many times along finitely many trajectories and prove no universal claim.

### Assumptions and scope {#assumptions}

- **A fixed closed loop.** The trajectories, residual and conclusion all refer to one $f$. Retraining the controller requires new data ([[controller-or-certificate]]).
- **Independent initial states from $\mathcal D$**, with $n$ counting trajectories. $\operatorname{err}$ is defined for the same $\mathcal D$; another initial distribution needs another argument.
- **Exact velocities and all times.** The theory uses exact $\dot x$ and the supremum over the whole interval; estimated velocities and time grids add errors that must be bounded separately ([[trajectories-as-samples]]).
- **Positivity separate from decrease.** The residual does not enforce it.
- **A fixed margin $\gamma>0$, chosen before the data, and feasibility.** For the Lyapunov residual these fail near the equilibrium.
- **What is concluded.** A probability of violation on fresh trajectories, not validity on all of $X$.

The statistical part of the argument also needs a bound on how complex the class is, measured in a norm that sees values and gradients: [[certificate-classes]].

### Exercises {#exercises}

::: question
For $\dot x=-x$, $V=x^2$, $\rho(v)=v$ and $T=[0,0.5]$, which margins $\gamma$ make (3.2) feasible for every sample when $\mathcal D$ lives on $0.5\le|\xi|\le1$?
---
$H_V(\xi)=-\xi^2e^{-1}$, largest at $|\xi|=0.5$: $-0.25e^{-1}\approx-0.092$. Every sample is feasible exactly when $\gamma\le0.092$.
:::

::: question
A solver returns $V(x)=3x^2-0.5$ for $\dot x=-x$ with $\rho(v)=v$, and all margin constraints with $\gamma=0.5$ hold on the recorded trajectories. Is $V$ a Lyapunov certificate? What is its residual at the equilibrium?
---
No. Its residual is $6x\cdot(-x)+3x^2-0.5=-3x^2-0.5\le-0.5$ everywhere, including $\rho(V(0))=-0.5$ at $x=0$, which is why it can meet a fixed margin there. But $V(0)=-0.5<0$, so it is not positive definite. Positivity must be imposed separately, for example by requiring $V(0)=0$ and a positive leading coefficient.
:::

::: question
Ten trajectories of $\dot x=-x$ are each recorded at $1000$ times. In the definition of $\operatorname{err}$ and of problem (3.2), what is $n$, and what is one "example"?
---
$n=10$. One example is one whole trajectory, generated by one independent initial state; the $1000$ records of a trajectory are all determined by its initial state and do not add independent examples.
:::

::: question
For the nonnormal system with $V=\|x\|^2$ and $\rho(v)=0.2v$, is the residual positive at $x=(1,1)/\sqrt2$? Is it positive at $(1,0)$?
---
At $x=(1,1)/\sqrt2$ (direction $45^\circ$) it is $\tfrac12(-1.8+2\cdot3-3.8)=0.2>0$. At $(1,0)$ it is $-1.8<0$. A trajectory that passes through the $45^\circ$ direction therefore violates.
:::

### Where it is used {#uses}

[[certificate-classes]] defines the norm in which classes of candidates are measured; [[boffi-lemma-4-1]] turns zero margin errors into a bound on $\operatorname{err}$; [[boffi-thm-4-2]] supplies the main parametric bound.

## Card

### The idea {#idea}

Encode a certificate condition as a residual $h(x,\dot x,V,\nabla V)\le0$; for Lyapunov, $h=\nabla V^{\mathsf T}\dot x+\rho(V)$. Judge a trajectory by its worst time, $H_V(\xi)=\sup_th(\cdots)$, written $h(\xi,V)$ by Boffi et al. Problem (3.2) asks $H_V(\xi_i)\le-\gamma$ on $n$ independent trajectories, with $\gamma>0$ fixed in advance; the violation probability (3.3) is $\operatorname{err}(V)=\Pr_{\xi\sim\mathcal D}(H_V(\xi)>0)$ on a fresh trajectory.

### Intuition and example {#intuition}

For $\dot x=-x$ and $V=x^2$ with $\rho(v)=v$, $H_V(\xi)=-\xi^2e^{-2t_{\max}}$: feasible with $\gamma\le e^{-2}$ when $1\le|\xi|\le2$ and $t_{\max}=1$, but infeasible with probability tending to one when $\mathcal D$ covers $0$, and always infeasible on $[0,\infty)$, although $\operatorname{err}=0$. On the nonnormal system the positive definite $\|x\|^2$ violates on about $77\%$ of trajectories, while the Lyapunov-equation certificate never does.

### Assumptions and domain {#assumptions}

A fixed closed loop, independent initial states from $\mathcal D$, exact velocities, the supremum over all times, and a fixed $\gamma$. Positivity is a separate condition; the residual encodes decrease only. Every positive candidate fails a fixed margin on trajectories that come near the equilibrium; the Lab's relative margin is a different premise. A small $\operatorname{err}$ is not validity everywhere.

### Where it is used {#uses}

[[certificate-classes]], [[boffi-lemma-4-1]], [[boffi-thm-4-2]].
