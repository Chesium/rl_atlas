+++
summary = "Scalar decay inequalities turn certificate residuals into bounds on trajectories."
prereqs = ["stability"]
time = "continuous"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§3.4, 4.4", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

Suppose a scalar measure of error decreases, except for a small residual. How much error can remain? We want an explicit trajectory bound, rather than the unsupported instruction “apply comparison.” This station derives the linear comparison argument and then introduces the function classes used to state more general bounds.

Let $x(t)\in\mathbb R^p$ be a trajectory and let $v(t)$ be a nonnegative scalar evaluated along it, such as $v(t)=\|x(t)\|^2$ or a positive certificate $V(x(t))$. The lower-case $v$ is a function of time; the upper-case $V$ is a function of state. Assume $v$ is absolutely continuous, meaning it is recovered by integrating its derivative, which exists except possibly on a set of times of zero length. Smooth trajectories and continuously differentiable certificates satisfy this condition.

### The calculation {#reasoning}

Assume for almost every $t\in[0,T]$ that

$$
\dot v(t)\le-\lambda v(t)+b(t),
\qquad \lambda>0,
$$

where $b$ is an integrable scalar residual. Multiplication by the positive integrating factor $e^{\lambda t}$ preserves the inequality. The product rule gives

$$
\begin{aligned}
\frac{d}{dt}(e^{\lambda t}v(t))
&=e^{\lambda t}(\dot v(t)+\lambda v(t))\\
&\le e^{\lambda t}b(t).
\end{aligned}
$$

Integrate from $0$ to $t$ and divide by $e^{\lambda t}$:

$$
v(t)\le e^{-\lambda t}v(0)
+\int_0^t e^{-\lambda(t-s)}b(s)\,ds.
$$

The right side is exactly the solution of $\dot w=-\lambda w+b(t)$ with $w(0)=v(0)$. We have bounded a possibly complicated quantity by a solved scalar equation. No equality for $v$ and no explicit solution for $x$ was needed.

::: example {#residual-floor} A decrease inequality with a floor
If $\dot v\le-2v+1$, then

$$
v(t)\le e^{-2t}v(0)+\frac{1-e^{-2t}}2.
$$

For $v(0)=2$ the bound is $1/2+(3/2)e^{-2t}$; at $t=(\log 3)/2$ it is $1$. As $t\to\infty$ it tends to $1/2$, not zero. Equality is realized by the scalar comparison equation, so no better universal limit follows from this inequality alone.

If $v(t)\ge c_1\|x(t)\|^2$ with $c_1>0$, this yields $\limsup_{t\to\infty}\|x(t)\|\le\sqrt{1/(2c_1)}$, provided the premises hold for all future times. An energy bound becomes a state bound only after this lower comparison is supplied.
:::

With $b=0$, and also $V(x)\le c_2\|x\|^2$, the same calculation gives

$$
\|x(t)\|\le
\sqrt{c_2/c_1}\,e^{-\lambda t/2}\|x(0)\|.
$$

The certificate's decay exponent $\lambda$ is an energy rate. The norm rate is $\lambda/2$, as in [[lyapunov-functions]]. For a bounded residual $0\le b(t)\le B$, replace $1/2$ above by $B/\lambda$. Small residuals support small ultimate error; they do not by themselves support exact convergence.

### Names for comparison functions {#function-classes}

The exponential formula is one useful shape, but many stable nonlinear systems decay more slowly. The following definitions express the needed order properties without forcing exponential decay.

::: definition {#comparison-classes} Classes $\mathcal K$, $\mathcal K_\infty$ and $\mathcal{KL}$
A function $a:[0,r_0)\to[0,\infty)$ is class $\mathcal K$ if it is continuous, strictly increasing and satisfies $a(0)=0$. It is class $\mathcal K_\infty$ if its domain is all $[0,\infty)$ and $a(r)\to\infty$ as $r\to\infty$.

A continuous function $\beta:[0,r_0)\times[0,\infty)\to[0,\infty)$ is class $\mathcal{KL}$ if, for fixed $t$, $r\mapsto\beta(r,t)$ is class $\mathcal K$, and, for fixed $r>0$, $t\mapsto\beta(r,t)$ decreases to zero. A nonincreasing time dependence with limit zero is enough for the bounds used here.
:::

For example $a(r)=r^2$ is class $\mathcal K_\infty$. The function $a(r)=r/(1+r)$ is class $\mathcal K$ on $[0,\infty)$ but is bounded, so is not class $\mathcal K_\infty$. The function $r^2$ has inverse $a^{-1}(s)=\sqrt s$; this is why a squared-error estimate converts back to length. A class $\mathcal K$ function has an inverse on its range, but that range need not include every positive number.

The functions $\beta(r,t)=re^{-t}$ and $\beta(r,t)=r/\sqrt{1+2r^2t}$ are class $\mathcal{KL}$ on $[0,\infty)\times[0,\infty)$. For the second, differentiation with respect to $r$ gives $(1+2r^2t)^{-3/2}>0$, and for any fixed $r>0$ the denominator tends to infinity. This second shape is the exact norm decay for $\dot x=-x^3$. Both functions describe decay with an initial-size dependence, but only the first is exponential.

### Why nonlinear comparison is legitimate {#nonlinear-comparison}

Khalil's comparison lemma (§3.4, Lemma 3.4) extends the idea to $\dot v\le g(t,v)$: if $g$ is continuous in time and locally Lipschitz in its scalar second argument, the equality solution $\dot w=g(t,w)$ with $v(0)\le w(0)$ bounds $v\le w$ on their common interval in the stated domain.

For differentiable $v$, the central reason is a first-crossing argument. On any compact time interval and scalar range where the Lipschitz constant is $L$, compare instead with $w_\varepsilon$ solving $\dot w_\varepsilon=g(t,w_\varepsilon)+\varepsilon$, $w_\varepsilon(0)=w(0)+\varepsilon$. At a first contact from below, $v=w_\varepsilon$ would give $\dot v-\dot w_\varepsilon\le-\varepsilon<0$, preventing the crossing. The perturbation vanishes as $\varepsilon\downarrow0$: the integral difference is bounded by $\varepsilon+\int_0^t(L|w_\varepsilon-w|+\varepsilon)ds$, which gives at most $\varepsilon e^{Lt}+\varepsilon(e^{Lt}-1)/L$ when $L>0$. Thus $v\le w$. The more general upper-right-derivative version is proved in Khalil's Appendix C.2; none of our integrating-factor calculations requires that extension.

### Assumptions and domain {#assumptions}

Every estimate holds only while its inequality holds and the underlying trajectory exists. If a residual is small on sampled times, that does not establish a differential inequality between those times. If the inequality holds only inside a set, an invariance or continuation argument is needed before extending its conclusion forever.

::: question
Suppose $V(x)\ge2\|x\|^2$ and, along a forward-complete trajectory, $\dot V\le-4V+8$. What limiting norm bound follows? Does it show attraction to zero?
---
Comparison gives $V(t)\le e^{-4t}V(0)+2(1-e^{-4t})$. Hence $\limsup\|x(t)\|\le\sqrt{2/2}=1$. It does not show convergence to zero: the allowed residual can balance decay at a nonzero certificate level.
:::

### Where it is used {#uses}

[[converse-iss]], [[boffi-thm-5-1]].

## Card

### The idea {#idea}

A class $\mathcal K$ function is continuous, strictly increasing and zero at zero. A $\mathcal{KL}$ function is class $\mathcal K$ in its first argument and decays to zero in time for each fixed first argument.

### Intuition and example {#intuition}

If $\dot V\le-\lambda V+b(t)$, multiplying by $e^{\lambda t}$ and integrating gives $V(t)\le e^{-\lambda t}V(0)+\int_0^t e^{-\lambda(t-s)}b(s)ds$. A nearly valid certificate has an additive residual of this form. A constant residual b gives an ultimate level $b/\lambda$, not convergence to zero. A class K function need not be unbounded; $\mathcal K_\infty$ adds that property.

### Assumptions and domain {#assumptions}

Scalar differential inequalities require regularity along trajectories and a matching initial condition. Bounds hold only on the interval where their premises hold.

### Where it is used {#uses}

[[converse-iss]], [[boffi-thm-5-1]].
