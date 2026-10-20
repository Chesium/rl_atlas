+++
summary = "Control the distance between two trajectories, with uniform bounds over their initial states."
prereqs = ["comparison-functions", "ode-sensitivity"]
time = "continuous"
sources = [{ text = "Angeli, A Lyapunov Approach to Incremental Stability Properties", kind = "paper", locator = "IEEE TAC 47(3), 2002, §§II–IV", review = "located", url = "https://doi.org/10.1109/9.989067" }]
+++

## Textbook

### The idea {#statement}

Suppose a controller is run twice, with slightly different initial states. Knowing that both runs eventually approach an equilibrium does not yet tell us how far apart they can become along the way. Deployment error and the geometric argument in [[boffi-thm-5-1]] need a bound on **every pair of runs**.

Recall from [[ode-sensitivity]] that $\phi_t(\xi)\in\mathbb R^p$ is the state at time $t$ of $\dot x=f(x)$ starting from $\xi$. Here $p$ is the state dimension, $t\ge0$, and $\|\cdot\|$ is the Euclidean norm. Assume solutions exist for all these times in a common forward-invariant set $S$: a run starting in $S$ remains in $S$.

::: definition {#incremental-bound} A uniform pair bound
The flow is incrementally globally asymptotically stable on $S$ if one function $\beta$ satisfies

$$\begin{aligned}
\|\phi_t(\xi)-\phi_t(\zeta)\|
&\le \beta(\|\xi-\zeta\|,t),\\
&\qquad \xi,\zeta\in S,\quad t\ge0,
\end{aligned}$$

where $\beta$ is of class $\mathcal{KL}$. This means that, for fixed $t$, it is continuous, strictly increasing in its first argument and zero at zero; for fixed separation $r$, $\beta(r,t)$ decreases to zero as $t\to\infty$. The word globally here means over the declared set $S$; a claim on $S$ is a claim on all of $\mathbb R^p$ only when $S=\mathbb R^p$.
:::

[[comparison-functions]] develops these comparison functions. The key quantifier is that the **same** $\beta$ works for all $\xi,\zeta$, independently of their location. One plot of one pair cannot supply that uniformity. The special bound

$$\|\phi_t(\xi)-\phi_t(\zeta)\|
\le C e^{-\alpha t}\|\xi-\zeta\|$$

with constants $C\ge1$ and $\alpha>0$ is incremental exponential stability. The rate $\alpha$ has units of inverse time, and $C$ permits a transient enlargement of Euclidean separation. The factor $C$ cannot depend on the pair.

### The calculation {#reasoning}

Put the two states into one vector $(x,y)\in\mathbb R^{2p}$. Its dynamics are

$$\dot x=f(x),\qquad \dot y=f(y).$$

The target is now the diagonal $\Delta=\{(x,y):x=y\}$, rather than a particular equilibrium. Uniqueness of solutions makes $\Delta$ invariant: two equal states receiving the same dynamics remain equal. Its Euclidean distance from $(x,y)$ is $\|x-y\|/\sqrt2$. Indeed the nearest diagonal point is $((x+y)/2,(x+y)/2)$, and the sum of the two squared distances is $\|x-y\|^2/2$.

Define the pair certificate $W(x,y)=\|x-y\|^2$. The chain rule gives

$$\dot W=2(x-y)^T\big(f(x)-f(y)\big).$$

If this expression is at most $-2\alpha W$ everywhere on $S\times S$, differentiation of $e^{2\alpha t}W(t)$ gives a nonpositive derivative. Therefore

$$\begin{aligned}
W(t)&\le e^{-2\alpha t}W(0),\\
\|\phi_t(\xi)-\phi_t(\zeta)\|
&\le e^{-\alpha t}\|\xi-\zeta\|.
\end{aligned}$$

The square root halves the rate. This is a sufficient test with $C=1$, not a necessary condition for all incremental exponential bounds. [[contraction-metrics]] changes the geometry when this Euclidean test fails.

::: example {#scalar-pair} Two runs of a scalar flow
For $\dot x=-x$, $\phi_t(\xi)=e^{-t}\xi$. Starting from $\xi=2$ and $\zeta=-1$ gives separation $3e^{-t}$, which is $3/e\approx1.104$ at $t=1$. Directly, $\dot W=2(x-y)(-x+y)=-2W$. Thus the squared separation decays at rate $2$, while separation decays at rate $1$. This calculation works for every pair, so $\beta(r,t)=re^{-t}$ is a uniform bound.
:::

### Inputs and the meaning of incremental ISS {#inputs}

For a controlled system $\dot x=f(x,u)$, write $\phi_t(\xi,u)$ for the run driven by the whole input signal $u$. Assume forward completeness and invariance for the admissible inputs. Incremental input-to-state stability, abbreviated $\delta$ISS, requires one $\mathcal{KL}$ function $\beta$ and one class-$\mathcal K$ gain $\chi$ such that, for all initial pairs and input pairs,

$$\begin{aligned}
\|\phi_t(\xi,u)-\phi_t(\zeta,v)\|
&\le \beta(\|\xi-\zeta\|,t)\\
&\quad+\chi(\|u-v\|_{\infty,[0,t]}).
\end{aligned}$$

Here $\|u-v\|_{\infty,[0,t]}$ is the largest input difference on the elapsed interval (essential supremum for measurable inputs). A class-$\mathcal K$ gain is continuous, strictly increasing, and zero at zero. Initial mismatch is forgotten; a persistent input mismatch may leave a persistent state mismatch. With $u=v$ the input term vanishes.

For $\dot x=-a x+u$, with $a>0$, subtract the two equations and use the integrating-factor solution:

$$\begin{aligned}
x(t)-y(t)&=e^{-at}(\xi-\zeta)\\
&\quad+\int_0^t e^{-a(t-s)}(u(s)-v(s))\,ds,\\
|x(t)-y(t)|&\le e^{-at}|\xi-\zeta|\\
&\quad+\frac{1-e^{-at}}{a}\|u-v\|_{\infty,[0,t]}.
\end{aligned}$$

Dropping $1-e^{-at}\le1$ gives $\chi(r)=r/a$. When $a=2$ and the inputs differ constantly by $0.2$, equal initial states develop a difference $0.1(1-e^{-2t})$, tending to $0.1$. The gain has units of state per input.

An estimate with exponential initial term $Ce^{-\alpha t}r$ and linear input gain $Kr$ is often called exponential incremental ISS ($\delta$EISS). Specify this inequality when using that name. **EISS without the incremental qualifier usually concerns a single state's distance from an equilibrium under an input; it does not automatically compare arbitrary pairs.** Angeli's 2002 paper supplies the $\delta$ISS framework; the scalar calculation here is a direct derivation. [[imitation-deployment]] develops the corresponding discrete recurrence.

### Why attraction to an equilibrium is insufficient {#failure}

Consider $\dot x=-x/(1+x^2)$ on $\mathbb R$. Every nonzero state moves toward zero; $V=x^2$ satisfies $\dot V=-2x^2/(1+x^2)<0$, and its bounded sublevel intervals prevent escape. Thus the origin is globally asymptotically stable by [[lyapunov-functions]].

There is nevertheless no global uniform pair bound of the form in \ref{incremental-bound}. Fix any $r>0$ and any finite $t$. Start at $R$ and $R+r$. As $R\to\infty$, both runs move arbitrarily little over that fixed time, because $|f(x)|$ tends to zero for large positive $x$. Their separation at time $t$ therefore tends to $r$. A bound valid for every $R$ would require $\beta(r,t)\ge r$ for every $t$. Such a function cannot tend to zero. Attraction of individual runs has not supplied uniform forgetting of the initial separation.

Even incremental exponential stability can allow a short Euclidean growth: $C>1$ accommodates it. Do not confuse failure of the $C=1$ Euclidean derivative test with failure of every incremental bound.

### Assumptions and domain {#assumptions}

All pair bounds refer to the same vector field, common time interval, and declared invariant region, with constants uniform over that region. Smoothness or local Lipschitz continuity supplies uniqueness; forward completeness supplies all $t\ge0$. A finite-horizon bound can be useful, but alone says nothing about $t\to\infty$. The Boffi v2 Assumption 5.1 in [[boffi-thm-5-1]] assumes a pair bound on its initial set and horizon before deriving a geometric guarantee. Training data does not establish that assumption. Its printed definition of $\mathcal{KL}$ mentions nonincrease but omits the usual limit-to-zero clause; the asymptotic terminology here uses the usual clause explicitly.

### Check the uniformity {#questions}

::: question
For $\dot x=-2x+u$, equal initial states and $|u-v|\le0.6$, derive a time-dependent pair bound. Does it imply convergence of the pair to zero separation?
---
The integrating-factor formula gives $|x(t)-y(t)|\le0.3(1-e^{-2t})\le0.3$. It does not force separation to zero. Constant input difference $0.6$ attains the bound; the limiting separation is $0.3$. Initial-condition forgetting and input robustness are different parts of $\delta$ISS.
:::

::: question
A simulation finds decay for pairs with initial states in $[-2,2]$. Can it establish global incremental exponential stability? What additional claim would a proof need?
---
No. A global proof needs the same $C,\alpha$ for every initial pair in $\mathbb R^p$ and every $t\ge0$, together with existence. A proof restricted to $[-2,2]$ must first show that interval is invariant and prove the pair inequality throughout the interval; finitely many observed pairs do neither. The slowly moving large states in \ref{failure} show why the region matters.
:::

### Where it is used {#uses}

[[variational-dynamics]], [[imitation-deployment]], [[boffi-thm-5-1]].

## Card

### The idea {#idea}

Incremental stability controls two solutions: $\|\phi_t(\xi)-\phi_t(\zeta)\|\le\beta(\|\xi-\zeta\|,t)$. Incremental exponential stability uses $Ce^{-\alpha t}\|\xi-\zeta\|$.

### Intuition and example {#intuition}

The doubled system $\dot x=f(x),\dot y=f(y)$ approaches its diagonal $x=y$. For $\dot x=-x$, separation is exactly $e^{-t}|\xi-\zeta|$. A sufficient Euclidean test is $\dot W\le-2\alpha W$ for $W=\|x-y\|^2$; taking square roots gives norm rate $\alpha$.

### Assumptions and domain {#assumptions}

A common invariant domain and complete unique solutions; one $\beta\in\mathcal{KL}$ or one pair $C,\alpha$ for all initial pairs and times. Incremental ISS adds $\chi(\|u-v\|_\infty)$; exponential incremental ISS specifies exponential initial decay. Equilibrium stability, finite simulations, and average controller error do not establish these premises.

### Where it is used {#uses}

[[variational-dynamics]], [[imitation-deployment]], [[boffi-thm-5-1]].
