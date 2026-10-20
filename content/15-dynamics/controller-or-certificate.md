+++
summary = "Learning a witness for a fixed closed loop differs from learning actions or identifying a model."
prereqs = ["dynamical-systems", "lyapunov-functions"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §§2–3, pp.3–5", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The idea {#statement}

Suppose an RL policy has finished training. A second learning procedure now fits a function $V$ to the trajectories it produces. Is this second procedure learning better actions? Usually it is answering a different question: whether a mathematical witness can explain the behavior of the already fixed closed loop.

There are three distinct unknowns:

- A **controller** $\pi$ maps a state to an action. Changing it changes the closed-loop velocity $f_\pi(x)=F(x,\pi(x))$.
- A **model** $\widehat f$ predicts the state velocity or transition. Learning it estimates the dynamics.
- A **certificate** $V$ is a scalar function whose positivity and decrease can establish a property of a specified $f_\pi$. Changing $V$ changes the proposed witness, not the actual action.

Here $x\in\mathbb R^p$ is the state and $F$ is the plant's state-velocity law. We study autonomous deterministic continuous-time dynamics, as in [[dynamical-systems]]. The letter $V$ denotes a certificate rather than the reward value discussed in [[two-values]].

### The calculation {#reasoning}

For the scalar plant $F(x,u)=x+u$, choose a policy family $\pi_k(x)=-kx$, with real gain $k$. Its closed loop is

$$
\dot x=(1-k)x.
$$

With the candidate $V_a(x)=ax^2$, $a>0$, its derivative is

$$
\dot V_a=2a(1-k)x^2.
$$

For a **fixed** $k=2$, every $a>0$ supplies a strictly decreasing positive certificate. Choosing a new $a$ changes its scale but leaves the physical flow $e^{-t}\xi$ unchanged. Choosing a new $k$ changes that flow. If $k$ is changed to $1/2$ after the fit, the same function has $\dot V_a=ax^2>0$ and no longer certifies decrease. Positivity of $V_a$ survives the controller change; the decrease claim does not.

An algorithm could jointly optimize $k$ and $a$, but that is a joint controller-and-certificate problem. A guarantee proved for a fixed closed loop does not automatically cover this adaptation.

### What a data constraint measures {#sampled-witness}

Hold the policy fixed and observe trajectories $x_i(t)=\phi_t(\xi_i)$ from initial states $\xi_i$. For a differentiable candidate $V_\theta$ with parameters $\theta$, a common residual is

$$
r_\theta(x,\dot x)
=\nabla V_\theta(x)^T\dot x+\lambda V_\theta(x),
\qquad \lambda>0.
$$

If $\dot x=f_\pi(x)$, the inequality $r_\theta\le0$ means $\dot V_\theta\le-\lambda V_\theta$ at that state. The parameter $\lambda$ is a chosen energy decay rate. Positive state comparisons are still needed to turn this into a norm bound; the residual alone does not enforce $V_\theta>0$. Along a trajectory this residual uses the observed velocity, so evaluating it need not require learning an explicit model of $f_\pi$.

For example, with fixed $k=2$, $a=1$ and $\lambda=1$, we have $r=-2x^2+x^2=-x^2$. Its nonpositivity is an all-state identity. A fitting program that instead checks this residual only at finitely many observed states has established only those checks. Extending them to new trajectories requires assumptions and a statistical argument, developed in [[learning-certificates]]. Counting more time points on the same trajectory does not create more independently sampled initial conditions.

The sampled constraints in Boffi v2 §3 use a fixed negative scalar margin. Such a margin is stronger than nonpositivity and may be infeasible: if $V(0)=0$, $f_\pi(0)=0$, the residual above is exactly zero at the equilibrium. It cannot be $\le-\gamma$ there for a fixed $\gamma>0$. The Lab's extra relative decay rate and the paper's fixed scalar margin must be kept separate.

### Why an unsuccessful search is inconclusive {#failed-search}

A stability theorem has the form “if a function with these properties exists, then the system has this stability property.” Failure of one candidate does not negate existence of every candidate.

For $\dot x=-x$, the function $V(x)=-x^2$ is not positive definite, although the system is globally exponentially stable and $x^2$ is a valid certificate. More structurally, consider $\dot x=-x$ on $\mathbb R^2$ and search only the class $V_a(x)=ax_1^2$. Every member vanishes at $(0,1)$, so none is positive definite on the plane. The stable system is outside the representational reach of that certificate class; changing an optimizer cannot repair the missing $x_2$ dependence.

Even when a valid member exists, a finite optimizer can fail to find it. Conflicting noisy constraints, unsuitable margins, restricted domains and numerical tolerances are further possible explanations. A solver's “infeasible” claim must be interpreted for the encoded problem and the strength of its numerical evidence, not immediately translated into physical instability. A valid proof of instability needs its own argument, such as an explicitly diverging trajectory.

### Velocities estimated from observations {#derivative-error}

Boffi v2 §3.1 assumes exact time derivatives for its theoretical formulation and computes them numerically in experiments. If an estimated velocity is $\widehat{\dot x}=f_\pi(x)+e$ with error vector $e$, then

$$
\widehat r_\theta-r_\theta
=\nabla V_\theta(x)^Te.
$$

The Cauchy–Schwarz inequality gives

$$
|\widehat r_\theta-r_\theta|
\le\|\nabla V_\theta(x)\|\,\|e\|.
$$

For $V=x^2$ at $x=2$ and $|e|\le0.1$, the residual error is at most $|2x|\cdot0.1=0.4$. An estimated residual $-0.2$ therefore does not guarantee a negative true residual: its allowed upper value is $0.2$. A justified derivative-error bound and a margin larger than the resulting residual error can protect a pointwise check. A finite difference without such an error bound supplies numerical evidence rather than that guarantee.

### Assumptions and domain {#assumptions}

The trajectories, residual and claimed theorem must refer to the same fixed policy, plant, domain and time convention. A change to any of these needs a new check. Certificate learning can avoid explicit model identification for some residuals; this does not remove its observation, differentiability, positivity or generalization assumptions. Contraction residuals also involve differential information beyond the scalar example here, as Part 16 explains.

::: question
A fitted positive $V$ has nonpositive residual at every sampled time of ten trajectories. Then the controller is retrained. Which conclusions remain justified without further analysis: the original sampled checks, decrease along new trajectories, or global stability of the new controller?
---
The recorded checks remain facts about the original states and velocities under the original controller. They do not establish decrease along the retrained controller's trajectories or global stability. One must reevaluate the residual for the new closed loop and supply the needed domain and generalization argument.
:::

### Where it is used {#uses}

[[learning-certificates]], [[certificates-in-practice]].

## Card

### The idea {#idea}

Learning a controller changes trajectories. Learning a certificate evaluates fixed dynamics and need not change a single action.

### Intuition and example {#intuition}

Hold a controller fixed after RL training and treat its closed loop as autonomous. Fitting V searches for a witness of decrease. Failure to find a witness does not establish instability: the system may need a richer class, another domain or a better solver. Changing the controller after fitting invalidates the sampled constraints. Model learning estimates f; certificate learning can instead use time derivatives of observed trajectories.

### Assumptions and domain {#assumptions}

Trajectories and certificates must refer to the same fixed closed loop. Estimated derivatives introduce a separate approximation error.

### Where it is used {#uses}

[[learning-certificates]], [[certificates-in-practice]].
