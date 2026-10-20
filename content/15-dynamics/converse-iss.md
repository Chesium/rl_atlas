+++
summary = "Converse results establish certificate existence; ISS measures how disturbances change state bounds."
prereqs = ["lyapunov-functions", "comparison-functions"]
time = "continuous"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§4.7–4.9", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

Two questions arise after learning Lyapunov's theorem. If a system is stable, must a certificate exist? And if a disturbance enters, how much of the conclusion survives? A **converse theorem** answers an existence question. **Input-to-state stability** (ISS) answers a robustness question. Neither says that a particular fitting algorithm will discover a certificate.

Recall that a certificate $V(x)$ is positive away from the equilibrium and decreases along its trajectories. [[comparison-functions]] introduced class $\mathcal K$ functions, which continuously and strictly increase from zero; $\mathcal K_\infty$ adds unboundedness; a class $\mathcal{KL}$ function $\beta(r,t)$ increases from zero in $r$ and decreases to zero in $t$ for fixed $r$. These functions will describe initial-error decay and input-dependent error.

### The calculation {#reasoning}

For the linear system in [[lyapunov-equation]], integrating future squared state constructs a certificate. The same idea works for a smooth exponentially stable nonlinear flow if we integrate over a suitable finite horizon. Here is an autonomous specialization of Khalil's Theorem 4.14 (§4.7), with the construction developed explicitly.

::: theorem {#exponential-converse} A route-relevant converse
Let $f:\{x\in\mathbb R^p:\|x\|<r\}\to\mathbb R^p$ be continuously differentiable, with $f(0)=0$ and $\|Df(x)\|\le L$ on that ball. Assume constants $C\ge1$, $\alpha>0$, and $r_0<r/C$ give

$$
\|\phi_t(\xi)\|\le Ce^{-\alpha t}\|\xi\|,
\quad \|\xi\|<r_0,\quad t\ge0.
$$

Then on the initial ball $\|x\|<r_0$ there is a continuously differentiable $W$ and positive constants $c_1,c_2,c_3,c_4$ such that

$$
\begin{aligned}
c_1\|x\|^2&\le W(x)\le c_2\|x\|^2,\\
\nabla W(x)^Tf(x)&\le-c_3\|x\|^2,\\
\|\nabla W(x)\|&\le c_4\|x\|.
\end{aligned}
$$
:::

::: proof
Choose a finite $H>0$ so that $q:=C^2e^{-2\alpha H}<1$, and set

$$
W(x)=\int_0^H\|\phi_s(x)\|^2\,ds.
$$

The assumed decay keeps these trajectories inside the larger radius-$r$ ball. Integrating its squared bound gives $W(x)\le c_2\|x\|^2$ with

$$
c_2=\frac{C^2(1-e^{-2\alpha H})}{2\alpha}.
$$

For a lower bound, the Jacobian bound and $f(0)=0$ imply $\|f(z)\|\le L\|z\|$. Along a nonzero trajectory, the derivative of its length is at least $-L\|\phi_s(x)\|$. Integration gives $\|\phi_s(x)\|\ge e^{-Ls}\|x\|$. Therefore $W(x)\ge c_1\|x\|^2$, where $c_1=\int_0^H e^{-2Ls}ds>0$. This integral definition includes $L=0$ without division by zero.

The flow composition rule gives, for sufficiently small $h\ge0$,

$$
W(\phi_h(x))=\int_h^{H+h}\|\phi_s(x)\|^2\,ds.
$$

Differentiating at $h=0$ removes the first endpoint and adds the last:

$$
\nabla W(x)^Tf(x)
=\|\phi_H(x)\|^2-\|x\|^2
\le-(1-q)\|x\|^2.
$$

Finally the sensitivity matrix $\Phi(s,x)=D_x\phi_s(x)$ obeys $\|\Phi(s,x)\|\le e^{Ls}$ by [[ode-sensitivity]]. Continuous differentiability permits differentiation under the finite integral. Thus

$$
\begin{aligned}
\nabla W(x)&=2\int_0^H
\Phi(s,x)^T\phi_s(x)\,ds,\\
\|\nabla W(x)\|&\le
2C\!\int_0^H e^{(L-\alpha)s}ds\,\|x\|.
\end{aligned}
$$

The integral is finite, giving $c_4$; choose $c_3=1-q>0$. This proves the stated local converse.
:::

This construction requires knowing the flow and its stability constants. It establishes existence, not an efficient data-based algorithm. It need not be quadratic or lie in a chosen neural-network class. The more general converse for asymptotic rather than exponential stability is Khalil's Theorem 4.17, on the region of attraction. Its smooth construction and properness proof are an optional extension in that source; they are not proved here and are not premises of the certificate-learning generalization route.

### Add a bounded input {#iss}

Now write $\dot x=f(x,u)$, with state $x\in\mathbb R^p$ and input $u(t)\in\mathbb R^m$. Assume $f(0,0)=0$ and enough local regularity for unique solutions. For a bounded piecewise continuous input define $\|u\|_{\infty,[0,t]}=\sup_{0\le s\le t}\|u(s)\|$. The system is **ISS** if every such input and every initial state produce a solution for all future time and

$$
\|x(t)\|\le\beta(\|\xi\|,t)
+\gamma(\|u\|_{\infty,[0,t]}),
$$

for a single pair $\beta\in\mathcal{KL}$, $\gamma\in\mathcal K$. The first term decays; the second records the allowed disturbance size. This is a global definition. A version restricted to small initial states and small inputs must be labeled local ISS.

::: example {#forced-scalar} Exact robustness of $\dot x=-x+u$
Multiply the equation by $e^t$ and integrate:

$$
x(t)=e^{-t}\xi+\int_0^t e^{-(t-s)}u(s)\,ds.
$$

Taking absolute values bounds the integral by $(1-e^{-t})\|u\|_{\infty,[0,t]}$, and hence

$$
|x(t)|\le e^{-t}|\xi|+\|u\|_{\infty,[0,t]}.
$$

Thus $\beta(r,t)=re^{-t}$ and $\gamma(s)=s$ prove ISS. With constant $u=1$, the exact solution is $1+e^{-t}(\xi-1)$ and tends to $1$. Persistent forcing can prevent return to the unforced equilibrium.
:::

### From a residual to a robustness bound {#iss-certificate}

A useful sufficient condition is a quadratic comparison with an input residual. Suppose, globally,

$$
\begin{aligned}
c_1\|x\|^2&\le V(x)\le c_2\|x\|^2,\\
\dot V&\le-c_3\|x\|^2+c_4\|u\|^2,
\end{aligned}
$$

where $c_1,c_2,c_3>0$, $c_4>0$. Put $\lambda=c_3/c_2$. For a fixed horizon $t$, let $U=\|u\|_{\infty,[0,t]}$. Comparison gives

$$
V(x(t))\le e^{-\lambda t}V(\xi)
+\frac{c_4}{\lambda}U^2.
$$

Using the lower bound and $\sqrt{a+b}\le\sqrt a+\sqrt b$ for nonnegative $a,b$ yields

$$
\|x(t)\|\le
\sqrt{c_2/c_1}\,e^{-\lambda t/2}\|\xi\|
+\sqrt{\frac{c_4}{\lambda c_1}}\,U.
$$

The bounds trap a solution in a bounded state set on every finite horizon, so local regularity on all of $\mathbb R^p\times\mathbb R^m$ also supplies continuation. This proves ISS for this sufficient condition. More generally, a decrease inequality of the form $\dot V\le-a(\|x\|)+\sigma(\|u\|)$ indicates an input-dependent threshold beyond which decrease wins. A global ISS theorem needs appropriate unbounded state comparisons and a genuine decreasing region; Khalil's Theorem 4.19 states these conditions with class $\mathcal K_\infty$ bounds and an input threshold. Merely writing the inequality with unspecified positive functions is insufficient.

### Assumptions and domain {#assumptions}

Zero-input stability does not automatically imply ISS. For $\dot x=-x+x^2u$, the unforced system is $\dot x=-x$, but with bounded constant input $u=1$ and $\xi=2$ the solution is $x(t)=2/(2-e^t)$ until $t=\log2$. It escapes in finite time, contradicting the forward existence required by ISS. The way the input enters matters.

ISS controls one state relative to the unforced equilibrium. **Incremental ISS** instead controls the difference of two forced trajectories using their initial difference and input difference. The latter is a separate, stronger type of comparison, introduced in [[incremental-stability]].

::: question
For $\dot x=-x+u$, use $V=x^2$ and $2xu\le x^2+u^2$ to derive a certificate-based ISS bound. Compare its rate with the exact solution above. Does either bound prove that a quadratic fitting routine succeeds?
---
$\dot V=-2x^2+2xu\le-x^2+u^2=-V+u^2$. Thus $|x(t)|\le e^{-t/2}|\xi|+\|u\|_{\infty,[0,t]}$. The norm rate $1/2$ is weaker than the exact rate $1$ because the cross-term estimate sacrificed decay. Both are valid state bounds; neither establishes a fitting algorithm's success.
:::

### Where it is used {#uses}

[[incremental-stability]], [[learning-certificates]].

## Card

### The idea {#idea}

Input-to-state stability bounds $\|x(t)\|\le\beta(\|x(0)\|,t)+\gamma(\|u\|_\infty)$ for $\beta\in\mathcal{KL}$ and $\gamma\in\mathcal K$.

### Intuition and example {#intuition}

A Lyapunov inequality $\dot V\le-\alpha(\|x\|)+\sigma(\|u\|)$ explains the bound: outside an input-dependent ball the certificate decreases. Converse results construct certificates from stability properties under smoothness and domain assumptions. They establish existence, not that a chosen quadratic class contains the certificate or a solver finds it. For $\dot x=-x+u$, variation of constants gives $|x(t)|\le e^{-t}|x(0)|+\|u\|_\infty$.

### Assumptions and domain {#assumptions}

ISS concerns disturbance to one equilibrium. Incremental ISS concerns differences between two forced trajectories; one cannot substitute for the other.

### Where it is used {#uses}

[[incremental-stability]], [[learning-certificates]].
