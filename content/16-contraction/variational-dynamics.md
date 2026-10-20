+++
summary = "The Jacobian transports infinitesimal displacements along a nonlinear trajectory."
prereqs = ["ode-sensitivity"]
time = "continuous"
sources = [{ text = "Lohmiller and Slotine, On Contraction Analysis for Non-linear Systems", kind = "paper", locator = "Automatica 34(6), 1998, §2, differential displacement", review = "located", url = "https://doi.org/10.1016/S0005-1098(98)00019-3" }]
+++

## Textbook

### The idea {#statement}

A nearby run of a nonlinear system does not obey a separate linear model with fixed coefficients. Its first-order displacement obeys a linear equation whose coefficients move along the reference run. This distinction lets us study sensitivity without pretending the whole nonlinear flow is linear.

Let $f:U\to\mathbb R^p$ be continuously differentiable on an open set $U\subseteq\mathbb R^p$, and let $x(t)=\phi_t(\xi)$ solve $\dot x=f(x)$ from $\xi$. The Jacobian $J(x)=Df(x)\in\mathbb R^{p\times p}$ has entry $J_{ij}=\partial f_i/\partial x_j$. It gives the first-order change in velocity produced by a change in state. Its units are inverse time when state coordinates use the same units.

[[ode-sensitivity]] develops differentiability of the flow in its initial state: $D_\xi\phi_t(\xi)$ is the matrix mapping a small initial displacement into its first-order displacement at time $t$. We recall and derive its direction-by-direction equation here. All statements hold on a common time interval where the nearby solutions exist in $U$.

### The calculation {#reasoning}

Choose an initial direction $v\in\mathbb R^p$ and a scalar perturbation $\varepsilon\ne0$. Run the same vector field from $\xi+\varepsilon v$, obtaining $x_\varepsilon(t)=\phi_t(\xi+\varepsilon v)$. The difference quotient

$$q_\varepsilon(t)=\frac{x_\varepsilon(t)-x(t)}{\varepsilon}$$

has initial value $q_\varepsilon(0)=v$. Subtract the two differential equations. The fundamental theorem of calculus on the short segment between the states gives

$$\begin{aligned}
\dot q_\varepsilon(t)&=B_\varepsilon(t)q_\varepsilon(t),\\
B_\varepsilon(t)&=\int_0^1 J\big(x(t)+s d_\varepsilon(t)\big)\,ds,\\
d_\varepsilon(t)&=x_\varepsilon(t)-x(t).
\end{aligned}$$

For sufficiently small $\varepsilon$ these segments stay in $U$ on any compact common time interval. As $\varepsilon\to0$, continuous dependence gives $x_\varepsilon\to x$, so continuity of $J$ gives $B_\varepsilon\to J(x(t))$. The flow-differentiability result in [[ode-sensitivity]] justifies passage to the limit in the integral equation for $q_\varepsilon$. Thus the tangent vector, also called a virtual displacement,

$$\delta x(t)=\lim_{\varepsilon\to0}q_\varepsilon(t)
=D_\xi\phi_t(\xi)v$$

obeys the **exact variational equation**

$$\dot{\delta x}(t)=J(x(t))\delta x(t),\qquad \delta x(0)=v. \label{variation}$$

The notation $\delta x$ denotes a derivative vector; it is not an extra finite trajectory. If $\Phi(t,\xi)=D_\xi\phi_t(\xi)$, then $\dot\Phi=J(\phi_t(\xi))\Phi$ and $\Phi(0,\xi)=I$. Each column solves \ref{variation} with a coordinate-vector initial value. Superposition applies to tangent vectors along this one reference run, even though it need not apply to nonlinear states themselves.

### Finite differences carry a remainder {#finite}

For the finite displacement $d(t)=x_\varepsilon(t)-x(t)$, the correct equation is

$$\begin{aligned}
\dot d(t)&=J(x(t))d(t)+r(x(t),d(t)),\\
r(x,d)&=f(x+d)-f(x)-J(x)d.
\end{aligned}$$

Differentiability means $\|r(x,d)\|/\|d\|\to0$ as $d\to0$; the notation $o(\|d\|)$ records this smaller-order remainder. If $J$ is Lipschitz with constant $K$ on the connecting segment, the integral formula above gives the stronger estimate $\|r(x,d)\|\le K\|d\|^2/2$. Dropping the remainder is an approximation for a finite displacement, while \ref{variation} is exact for the limiting derivative. A good finite approximation over one time interval need not stay accurate over arbitrarily long times.

::: example {#cubic} Tangent decay along a nonlinear run
For $f(x)=-x-x^3$ on $\mathbb R$, the Jacobian is the scalar $J(x)=-1-3x^2$. Along any reference solution,

$$\begin{aligned}
\delta x(t)&=v\exp\left(-t-3\int_0^t x(s)^2\,ds\right),\\
|\delta x(t)|&\le e^{-t}|v|.
\end{aligned}$$

This follows by the scalar integrating factor; $x(s)^2\ge0$ supplies the inequality. The runs exist for all positive times because $x^2$ decreases: its derivative is $-2x^2-2x^4$.

At the equilibrium reference $x(t)=0$ and with $v=1$, the tangent is exactly $e^{-t}$. The finite neighboring run starting from $\varepsilon$ has the explicit solution

$$x_\varepsilon(t)=\frac{\varepsilon e^{-t}}
{\sqrt{1+\varepsilon^2(1-e^{-2t})}}.$$

It can be checked by differentiation and by its value at $t=0$. At $t=1$ the quotient $x_\varepsilon(1)/\varepsilon$ is about $0.36630$ for $\varepsilon=0.1$ and $0.31267$ for $\varepsilon=\tfrac23$, compared with the tangent $e^{-1}\approx0.36788$. The finite quotient approaches the tangent as $\varepsilon\to0$; it is not identical at a nonzero perturbation.

The remainder is explicit too:

$$f(x+d)-f(x)=(-1-3x^2)d-3xd^2-d^3.$$

At $x=1,d=0.1$, the tangent velocity difference is $-0.4$, while the finite velocity difference is $-0.431$. The omitted $-0.03-0.001$ accounts for the discrepancy.
:::

### What must shrink: eigenvalues or lengths? {#lengths}

Differentiate the Euclidean squared length $E=\delta x^T\delta x$ using \ref{variation}:

$$\begin{aligned}
\dot E&=\delta x^T(J^T+J)\delta x,\\
\dot E&\le-2\alpha E
\quad\text{if }\frac{J+J^T}{2}\preceq-\alpha I.
\end{aligned}$$

For symmetric matrices, $B\preceq C$ means $v^TBv\le v^TCv$ for every vector $v$. The symmetric part of $J$ governs length; the eigenvalues of the unsymmetrized $J$ do not directly supply this inequality.

For the shared linear system

$$A=\begin{pmatrix}-1&3\\0&-2\end{pmatrix},$$

the eigenvalues are $-1,-2$, but at the unit displacement $v=(0.8,0.6)^T$,

$$\begin{aligned}
v^T(A^T+A)v
&=-2(0.8)^2+6(0.8)(0.6)\\
&\quad-4(0.6)^2\\
&=0.16>0.
\end{aligned}$$

Its Euclidean length initially grows. Thus even a constant stable matrix need not contract Euclidean lengths at every instant. For a moving Jacobian the gap is larger: a collection of frozen stable matrices is not a bound on the solutions of the time-varying equation. [[contraction-metrics]] proves decay in a geometry that includes both the moving displacement and a moving metric. It also supplies the path argument needed to transfer tangent decay to finite trajectory separation; the derivative calculation alone has not done that.

### Assumptions and domain {#assumptions}

Continuous differentiability of $f$, a common solution interval, and a neighborhood containing the compared runs justify the variational construction. Long-time or global claims additionally require complete solutions and a uniform inequality over their region. A finite-difference calculation, a frozen eigenvalue test, and a theorem about all transported directions are different checks. Lohmiller and Slotine (1998), §2, equations (2)–(3), is the source of the differential-displacement approach; the limit construction here makes its objects explicit.

### Work with the two displacements {#questions}

::: question
For $f(x)=-x-x^3$, reference state $x=0$, and finite displacement $d=0.2$, find the actual velocity difference, its first-order approximation, and the remainder. Which becomes exact in the tangent equation?
---
The actual difference is $f(0.2)-f(0)=-0.208$. The Jacobian gives $J(0)d=-0.2$, leaving remainder $-0.008=-d^3$. In the difference quotient the remainder divided by $d$ is $-d^2\to0$, so the derivative equation uses exactly $J(0)=-1$. A finite neighbor still has the remainder.
:::

::: question
For $\dot x=Ax$ with the matrix in \ref{lengths}, is tangent dynamics an approximation to the finite difference? Does linearity force Euclidean distances to decrease monotonically?
---
Here $f(x+d)-f(x)=Ad$ exactly, so both finite differences and tangent vectors solve the same linear equation. Nevertheless $v=(0.8,0.6)^T$ has initial squared-length derivative $0.16>0$. Exact linearity removes the nonlinear remainder; it does not make $A+A^T$ negative definite.
:::

### Where it is used {#uses}

[[contraction-metrics]], [[boffi-thm-5-2]].

## Card

### The idea {#idea}

An infinitesimal displacement evolves by $\dot{\delta x}=J(x)\delta x$, $J=Df(x)$. This linear system follows a moving nonlinear trajectory.

### Intuition and example {#intuition}

Perturb the initial condition by $\varepsilon v$ and take the limit of $[\phi_t(\xi+\varepsilon v)-\phi_t(\xi)]/\varepsilon$. The limiting vector solves the exact variational equation; a finite difference includes a nonlinear remainder. For $f(x)=-x-x^3$, $\delta x(t)=v\exp(-t-3\int_0^t x(s)^2ds)$, so $|\delta x(t)|\le e^{-t}|v|$.

### Assumptions and domain {#assumptions}

A continuously differentiable vector field and a common solution interval. Euclidean length uses the symmetric-part test $J+J^T\preceq-2\alpha I$. Stable frozen eigenvalues alone are insufficient; finite separation requires a connecting-path argument on a suitable region.

### Where it is used {#uses}

[[contraction-metrics]], [[boffi-thm-5-2]].
