+++
summary = "Incremental stability can prevent small controller errors from growing into large deployment errors."
prereqs = ["incremental-stability", "imitation"]
time = "discrete"
sources = [{ text = "Angeli, A Lyapunov Approach to Incremental Stability Properties", kind = "paper", locator = "IEEE TAC 47(3), 2002, §IV; atlas discrete deployment derivation", review = "located", url = "https://doi.org/10.1109/9.989067" }]
+++

## Textbook

### The idea {#statement}

An imitation policy can predict expert actions accurately on recorded states and still drift away when deployed. Its own actions change the states at which the next prediction is made. To control that drift, separate two effects: how reference dynamics propagate an existing state error, and how a new action error perturbs the next state.

Use discrete time $j=0,1,\ldots$. A plant has state $x_j\in\mathbb R^p$, action $u_j\in\mathbb R^q$, and update $x_{j+1}=F(x_j,u_j)$, with one step representing a fixed sampling interval. The expert policy is $\pi_*:S\to\mathbb R^q$ and the learned policy is $\widehat\pi:S\to\mathbb R^q$, on a common region $S$. Define the expert closed-loop map

$$G_*(x)=F(x,\pi_*(x)).$$

Let $x_{j+1}^*=G_*(x_j^*)$ be the expert run and $\widehat x_{j+1}=F(\widehat x_j,\widehat\pi(\widehat x_j))$ the deployed run. Their state error is $e_j=\|\widehat x_j-x_j^*\|$, using Euclidean norms for states and actions. The question is how $e_j$ depends on initial mismatch and action prediction errors **at deployed states**.

Assume both runs remain in $S$ for all steps considered. Suppose the expert map is uniformly contracting there,

$$\|G_*(x)-G_*(y)\|\le\rho\|x-y\|,
\qquad x,y\in S,\quad 0\le\rho<1,$$

and the input influence is uniformly Lipschitz,

$$\|F(x,u)-F(x,v)\|\le L_u\|u-v\|.$$

The second inequality is required for each deployed state $x$ and its two actions; a uniform statement on all $x\in S$ and admissible $u,v$ is a convenient sufficient premise. The dimensionless factor $\rho$ is per step. The constant $L_u$ has units of state per action. These premises concern the closed-loop map and the plant respectively, not the average training loss of a predictor.

### The calculation {#reasoning}

At a deployed state define its action mismatch

$$\epsilon_j=\|\widehat\pi(\widehat x_j)-\pi_*(\widehat x_j)\|.$$

Add and subtract $G_*(\widehat x_j)$, which is the next state the expert would choose **from the deployed state**. The triangle inequality gives

$$\begin{aligned}
e_{j+1}
&\le \|F(\widehat x_j,\widehat\pi(\widehat x_j))
       -G_*(\widehat x_j)\|\\
&\quad+\|G_*(\widehat x_j)-G_*(x_j^*)\|\\
&\le L_u\epsilon_j+\rho e_j.
\end{aligned} \label{recurrence}$$

This comparison does not require $\widehat\pi$ itself to be Lipschitz: its error relative to the expert at the same deployed state is what enters. Comparing $\widehat\pi(\widehat x_j)$ with $\pi_*(x_j^*)$ directly would mix prediction error and state mismatch, obscuring the useful decomposition.

Apply \ref{recurrence} successively:

$$\begin{aligned}
e_1&\le\rho e_0+L_u\epsilon_0,\\
e_2&\le\rho^2e_0+L_u(\rho\epsilon_0+\epsilon_1),\\
e_N&\le\rho^Ne_0
       +L_u\sum_{j=0}^{N-1}\rho^{N-1-j}\epsilon_j.
\end{aligned} \label{unroll}$$

Induction proves the last line: multiply the bound for $e_N$ by $\rho$ and add $L_u\epsilon_N$. A mistake early in the run is damped for more steps than a recent mistake. This weighted expression remains useful when the errors vary.

If $\epsilon_j\le\epsilon$ at every deployed state, the geometric sum gives

$$e_N\le\rho^Ne_0
+L_u\epsilon\frac{1-\rho^N}{1-\rho}. \label{geometric}$$

To check the sum, multiply $1+\rho+\cdots+\rho^{N-1}$ by $1-\rho$: every middle term cancels, leaving $1-\rho^N$. The first term in \ref{geometric} forgets initial mismatch. The second approaches the error floor $L_u\epsilon/(1-\rho)$. That floor is an upper bound on accumulated state error, not a statement that every policy attains it. As $\rho\uparrow1$, a fixed one-step error can sustain a much larger state error.

::: example {#exact-scalar} A case that attains the bound
Take the scalar plant $F(x,u)=\tfrac12x+u$, expert $\pi_*(x)=0$, and deployed policy $\widehat\pi(x)=0.1$. On $S=\mathbb R$, $G_*(x)=x/2$ has $\rho=1/2$ and $L_u=1$. Both runs are defined for all steps. From $x_0^*=\widehat x_0=0$, the expert remains zero and the deployed states are

$$\widehat x_1=0.1,\quad
\widehat x_2=0.15,\quad
\widehat x_3=0.175.$$

The formula gives $e_3\le0.1(1-2^{-3})/(1-1/2)=0.175$, with equality here. The limiting error is $0.2$. If actions have unit $U$ and state has unit $X$, read the bias as $0.1\,U$ and $L_u=1\,X/U$, so the errors above have unit $X$. The figures use normalized coordinates, not a particular robot's calibration.
:::

### The region assumption must survive deployment {#region}

A uniform error bound on $S$ is useful only while the deployed run stays there. Invariance of the expert map alone does not prove invariance of $F(x,\widehat\pi(x))$. One can establish both directly, or verify a tube around the expert trajectory stays inside the region where all bounds hold. For example, if that region contains every radius-$r$ ball around the expert run, then \ref{geometric} supplies a valid induction when its bound never exceeds $r$ and the inequalities hold at each preceding step. This check must start with $e_0\le r$; a bound conditional on remaining in $S$ cannot simply assume its own conclusion.

The one-step factor $\rho<1$ is a stronger premise than a general incremental exponential bound with a prefactor $C>1$. One cannot substitute $\rho=e^{-\alpha h}$ into this proof merely because a continuous flow has $Ce^{-\alpha t}$ Euclidean decay. A contracting metric can supply a one-step contraction in its own distance, but input influence and policy errors must then be bounded in that distance too. [[incremental-stability]] explains incremental ISS: forgetting an initial difference plus a gain of input mismatch. This recurrence is a direct discrete, linear-gain instance of that mechanism.

### Why average expert-data error is insufficient {#failure}

Consider the same plant $F(x,u)=x/2+u$ and expert $\pi_*=0$, but let the training states all equal zero. Define the learned policy to output $\eta>0$ at zero and $1$ at every nonzero state. Its average absolute training error is only $\eta$, which can be arbitrarily small. Starting from zero, however,

$$\widehat x_1=\eta,\qquad
\widehat x_2=\eta/2+1.$$

The deployed second state is about $1$ even when $\eta$ is tiny. Applying \ref{geometric} with the training error $\epsilon=\eta$ would falsely predict $e_2\le1.5\eta$. The theorem did not fail: its premise fails at the newly visited state $\eta$, where action error is $1$. The example intentionally uses a discontinuous learned policy; no continuity or uniform approximation premise was assumed from the training average. A predictor class with extra regularity needs its own argument to obtain a uniform bound.

The problem can also arise within the training distribution: a rare state may have large action error while contributing little to an average. Thus more expert examples can improve a statistical estimate of expert-distribution loss, but that estimate is a different object from a pointwise deployment error bound. [[imitation]] motivates collecting or controlling the states induced by the learned policy; it does not remove the need to state the relevant distribution or uniformity.

If the propagation factor is instead $b>1$, unrolling gives $e_N\le b^Ne_0+L_u\epsilon(b^N-1)/(b-1)$. For $b=2,e_0=0,L_u\epsilon=0.1$, an aligned scalar disturbance gives errors $0.1,0.3,0.7$ after three steps and grows exponentially. At $b=1$ the sum is $N L_u\epsilon$, so the expression with denominator $1-b$ must be replaced by its limit. Stability changes how errors accumulate; action accuracy alone does not determine the outcome.

### Assumptions and domain {#assumptions}

A common region containing both runs, a uniform expert-map contraction in the chosen distance, bounded input influence, and an action-error bound at deployed states for the horizon claimed. The derivation is the atlas's discrete deployment bridge, motivated by Angeli's incremental-input framework; it is not a claim that Angeli §IV states this discrete imitation theorem. No finite training average or sampled holdout test proves these uniform premises. This bridge motivates fixed-loop certification without making imitation a prerequisite for every statistical certificate theorem.

### Test the premise as well as the sum {#questions}

::: question
Let $\rho=1/2$, $L_u=1$, $e_0=0$, and action errors $(\epsilon_0,\epsilon_1,\epsilon_2)=(0.1,0,0.1)$. Calculate the weighted bound on $e_3$. Compare it with replacing all errors by their maximum.
---
Equation \ref{unroll} gives $e_3\le(1/2)^2(0.1)+(1/2)(0)+0.1=0.125$. The uniform maximum gives $0.1(1+1/2+1/4)=0.175$. Both are valid; the weighted calculation uses the missing middle disturbance and its time location. An unweighted average alone would lose that timing information.
:::

::: question
For the failure example take $\eta=0.01$. Compute the first two deployed errors and the incorrect bound obtained from training error. Identify the exact failed premise.
---
The expert stays at zero, so $e_1=0.01$ and $e_2=1.005$. Inserting $\epsilon=0.01$ into the uniform formula would give $e_2\le0.015$. The pointwise action bound at the deployed state $0.01$ is false: the learned policy chooses $1$ there and the expert chooses $0$. The plant remains contractive under the expert; the failure is the substituted error bound.
:::

### Where it is used {#uses}

[[controller-or-certificate]], [[boffi-thm-5-1]].

## Card

### The idea {#idea}

If the expert closed loop contracts by $\rho<1$ and deployed action error adds a state disturbance at most $L_u\epsilon$, then $e_{t+1}\le\rho e_t+L_u\epsilon$.

### Intuition and example {#intuition}

Add and subtract the expert next state from the deployed state. Then $e_{j+1}\le\rho e_j+L_u\epsilon_j$, where $\epsilon_j=\|\widehat\pi(\widehat x_j)-\pi_*(\widehat x_j)\|$. If $\epsilon_j\le\epsilon$, unrolling yields $e_N\le\rho^Ne_0+L_u\epsilon(1-\rho^N)/(1-\rho)$. With $\rho=1/2$, $L_u\epsilon=0.1$, and $e_0=0$, $e_3\le0.175$ and the limiting bound is $0.2$.

### Assumptions and domain {#assumptions}

Both runs stay in the region; the expert map contracts uniformly by $\rho<1$ per step; input influence has constant $L_u$; action errors are bounded at deployed states. Average expert-data error does not supply the last premise. A Euclidean exponential bound with prefactor $C>1$ does not by itself give this one-step recurrence with a factor below one.

### Where it is used {#uses}

[[controller-or-certificate]], [[boffi-thm-5-1]].
