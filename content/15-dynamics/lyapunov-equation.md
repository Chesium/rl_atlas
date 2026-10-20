+++
summary = "A linear matrix equation constructs a quadratic certificate for a stable linear system."
prereqs = ["lyapunov-functions"]
time = "both"
sources = [{ text = "Hespanha, Linear Systems Theory", kind = "textbook", locator = "2nd edition, 2018, §§8.2, 8.4–8.6", review = "located", url = "https://press.princeton.edu/books/hardcover/9780691179575/linear-systems-theory" }]
+++

## Textbook

### The idea {#statement}

The Lyapunov theorem asks us to find a positive function that decreases. For a stable linear system, can we construct one systematically? A matrix equation answers this question and explains why an ellipse can shrink even while Euclidean distance temporarily grows.

Let $x\in\mathbb R^p$ and $\dot x=Ax$, where $A\in\mathbb R^{p\times p}$ is constant. Its flow is $\phi_t(\xi)=e^{At}\xi$, where the matrix exponential is the solution of $\frac{d}{dt}e^{At}=Ae^{At}$, $e^{A0}=I$. A matrix is **Hurwitz** if every eigenvalue has strictly negative real part. For a finite-dimensional constant matrix, this gives constants $C\ge1$, $a>0$ such that $\|e^{At}\|\le Ce^{-at}$. Here the matrix norm is the induced Euclidean norm, $\|B\|=\sup_{\|z\|=1}\|Bz\|$.

The eigenvalue-to-decay implication uses a basic linear-algebra fact: after a change of coordinates, each Jordan block contributes terms $t^j e^{\lambda t}$ to the exponential. When $\operatorname{Re}\lambda<0$, each such term is bounded by a constant times $e^{-at}$ for sufficiently small $a>0$. Hespanha §8.3 develops this spectral result; below we prove the certificate construction and its converse directly.

A real symmetric matrix $P$ is **positive definite**, written $P\succ0$, if $z^TPz>0$ for every nonzero $z\in\mathbb R^p$. A quadratic certificate is $V(x)=x^TPx$. Its smallest and largest eigenvalues bound it:

$$
\lambda_{\min}(P)\|x\|^2
\le V(x)\le
\lambda_{\max}(P)\|x\|^2.
$$

These follow by expanding $x$ in an orthonormal eigenvector basis. The bounds connect elliptical certificate levels to Euclidean length.

### The calculation {#reasoning}

The product rule gives

$$
\begin{aligned}
\dot V
&=\dot x^TPx+x^TP\dot x\\
&=x^T(A^TP+PA)x.
\end{aligned}
$$

Choose a symmetric $Q\succ0$ to specify the desired positive state cost. Enforcing $\dot V=-x^TQx$ for every state is equivalent to the **continuous-time Lyapunov equation**

$$
A^TP+PA=-Q.
$$

It is linear in the entries of $P$ when $A,Q$ are fixed.

::: theorem {#linear-lyapunov} Construction and converse
If $A$ is Hurwitz, then for every symmetric $Q\succ0$ the equation has a unique matrix solution, and that solution is symmetric positive definite. Conversely, if symmetric $P,Q\succ0$ satisfy the equation, the system is globally exponentially stable.
:::

::: proof
For the forward direction define

$$
P=\int_0^\infty e^{A^Tt}Qe^{At}\,dt.
$$

This improper integral is finite: its integrand has norm at most $C^2\|Q\|e^{-2at}$, whose integral is $C^2\|Q\|/(2a)$. Each integrand is symmetric, so $P$ is symmetric. For nonzero $z$, the scalar integrand $(e^{At}z)^TQ(e^{At}z)$ is positive at $t=0$ and, by continuity, on a small interval. It is nonnegative everywhere, so its integral $z^TPz$ is strictly positive.

Put $B(t)=e^{A^Tt}Qe^{At}$. The product rule gives $\dot B=A^TB+BA$, because $A$ commutes with its exponential. Integrating entry by entry yields

$$
\begin{aligned}
A^TP+PA
&=\int_0^\infty \dot B(t)\,dt\\
&=B(\infty)-B(0)=-Q.
\end{aligned}
$$

The upper endpoint is zero by exponential decay; the lower endpoint is $Q$. To prove uniqueness, let $P_1,P_2$ be any two solutions and put $R=P_1-P_2$. Then $A^TR+RA=0$. Differentiating $e^{A^Tt}Re^{At}$ gives zero, so it equals $R$ for every $t$. Its norm tends to zero by exponential decay, forcing $R=0$.

For the converse, the equation gives $\dot V=-x^TQx$. Write $q=\lambda_{\min}(Q)>0$, $p_-=\lambda_{\min}(P)>0$, and $p_+=\lambda_{\max}(P)$. Then

$$
\dot V\le-q\|x\|^2
\le-\frac{q}{p_+}V.
$$

Integrating this scalar inequality and using both quadratic bounds gives

$$
\|x(t)\|\le
\sqrt{\frac{p_+}{p_-}}
e^{-qt/(2p_+)}\|\xi\|.
$$

Linear trajectories exist for all future time, so this is a global exponential estimate. It also implies that all eigenvalues of $A$ have negative real parts, by the spectral characterization recalled above.
:::

The integral has an interpretation: $x^TPx$ is the total future cost $\int_0^\infty\phi_t(x)^TQ\phi_t(x)dt$. [[two-values]] develops this connection to cost-to-go without confusing it with an arbitrary reward value.

### Solve the running example {#worked-matrix}

Take

$$
A=\begin{bmatrix}-1&3\\0&-2\end{bmatrix},
\quad Q=I,
\quad P=\begin{bmatrix}a&b\\b&c\end{bmatrix}.
$$

Multiplying the matrices gives

$$
A^TP+PA=
\begin{bmatrix}
-2a&3a-3b\\
3a-3b&6b-4c
\end{bmatrix}.
$$

Equating this to $-I$ gives $a=1/2$, $b=a=1/2$, and $c=(1+6b)/4=1$. Thus

$$
\begin{aligned}
P&=\begin{bmatrix}1/2&1/2\\1/2&1\end{bmatrix},\\
V(x)&=\tfrac12x_1^2+x_1x_2+x_2^2\\
&=\tfrac12(x_1+x_2)^2+\tfrac12x_2^2.
\end{aligned}
$$

The last expression proves positivity without an eigenvalue computation: both squares vanish only at the origin. Substitution gives $\dot V=-x_1^2-x_2^2$ exactly. The eigenvalues of $P$ are $(3-\sqrt5)/4$ and $(3+\sqrt5)/4$. Therefore the proved norm rate is $\alpha=1/(2p_+)=2/(3+\sqrt5)\approx0.3820$ and the prefactor is $\sqrt{p_+/p_-}\approx2.6180$. This conservative bound permits Euclidean transients; it need not equal the slowest exact modal rate $1$.

For the diagonal comparison $A=\operatorname{diag}(-1,-2)$, the same calculation gives $P=\operatorname{diag}(1/2,1/4)$: the entries of $A^TP+PA$ are $-1,0,0,-1$. The off-diagonal term in our running example accounts for the interaction between coordinates; simply keeping the diagonal solution would not solve its equation.

### Assumptions and domain {#assumptions}

Solving an algebraic equation does not by itself prove positivity. For the unstable scalar $A=1$, $Q=1$, the equation gives $2P=-1$, so $P=-1/2$. Its quadratic function is negative away from zero and is not a Lyapunov certificate. Likewise $Q\succeq0$ alone need not give strict decrease or positive $P$; the theorem above assumes $Q\succ0$.

For a discrete linear map $x_{k+1}=Bx_k$, the correct equation is $B^TPB-P=-Q$, and the spectral condition is $|\lambda(B)|<1$. [[time-dictionary]] derives the difference equation, its series solution and the discrete nonlinear theorem. A continuous-time matrix must not be inserted unchanged into the discrete criterion.

### See the trajectories {#experiment}

{{flow linear}}

The inline experiment uses seed 1, four independent training trajectories, 20 fresh holdout trajectories, and test norm rate $\alpha=0.1$ per second. It fits at $\alpha+0.05=0.15$ per second, using the energy residual $\dot V+2\alpha V$. Its displayed result is 0/20 holdout trajectories failing. A trajectory counts once as a failure if **any** tested time has residual greater than the numerical tolerance $10^{-5}$; time points are not independent samples.

[Open the flows and certificates Lab](#/flows) for a reproducible intervention:

1. **Predict.** Can Euclidean distance initially increase while a quadratic certificate decreases? Use the nonnormal calculation above to justify your prediction.
2. **Intervene.** Choose Linear system, Quadratic Lyapunov function, the running matrix, $n=8$, and test norm rate $\alpha=0.1$ per second. Clear Typical seed and choose seed 1. Run bench, then change $n$ to 16 and run again. Each bench uses seeds 1–20, with $n$ independent initial states and 100 fresh holdout states per seed, drawn uniformly in the radius-two ball.
3. **Observe.** Record the played seed, sampled-feasibility flag, maximum training residual, and number of failing holdout trajectories out of 100. For seed 1 at $n=8$, the engine returns sampled constraints met after 32 iterations, maximum training residual about $6.94\times10^{-6}$, and 0/100 holdout failures (0%). At $n=16$ these rounded readouts are the same; increasing samples need not strictly improve every finite fit.
4. **Explain.** Continuous trajectories use RK4 step 0.02 seconds over three seconds, with training constraints every tenth point. State coordinates are normalized. The training residual uses fitting rate 0.15 per second and the holdout residual uses test rate 0.1 per second; this relative decrease margin is distinct from a fixed scalar margin. Compare the finite readouts with the all-state identity $\dot V=-\|x\|^2$ above.

The analytic $P$ above is an exact certificate, but the Lab uses its own normalization and a finite optimizer, so its returned matrix need not equal this $P$. Changing the matrix changes the equation being solved. A time grid can miss between-time violations, and finitely many trajectories do not cover every state. The plot and holdout rate are numerical evidence, separate from the all-state matrix identity.

::: question
Solve the scalar Lyapunov equation for $\dot x=-3x$ with $Q=2$. Check positivity and compare the certificate and norm rates.
---
The equation is $-6P=-2$, so $P=1/3>0$. Thus $V=x^2/3$ and $\dot V=-2x^2=-6V$. Energy decays as $e^{-6t}$ and length as $e^{-3t}$; the norm rate is half the energy rate.
:::

### Where it is used {#uses}

[[contraction-metrics]], [[certificate-classes]].

## Card

### The idea {#idea}

For a Hurwitz matrix $A$ and $Q\succ0$, $A^TP+PA=-Q$ has a unique $P\succ0$. Then $V=x^TPx$ satisfies $\dot V=-x^TQx$.

### Intuition and example {#intuition}

The solution is $P=\int_0^\infty e^{A^Tt}Qe^{At}dt$. Differentiate the integrand and integrate its endpoints to verify the equation. Positivity follows because a nonzero initial vector has positive integrand near time zero. Conversely, a positive solution implies all modes decay. For $A=\operatorname{diag}(-1,-2)$ and $Q=I$, $P=\operatorname{diag}(1/2,1/4)$. A nonnormal example needs off-diagonal terms; the Lab solves all three independent entries and checks the residual.

### Assumptions and domain {#assumptions}

Continuous time: eigenvalues have negative real parts. Discrete time: $A^TPA-P=-Q$ and eigenvalues have modulus below one.

### Where it is used {#uses}

[[contraction-metrics]], [[certificate-classes]].
