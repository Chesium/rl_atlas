+++
summary = "A positive function that decreases along trajectories can prove stability without solving the dynamics."
prereqs = ["stability"]
time = "both"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§4.1–4.2", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]

[story]
scene = "flow"
world = "linear"
metric = false
+++

## Story

::: step { at = 0 }

Start eight trajectories from independent initial states. They all follow the same fixed linear dynamics. No agent chooses an action.
:::

::: step { at = 25 }

Euclidean distance can grow briefly even though the eigenvalues are stable. A tilted quadratic bowl measures progress more faithfully than distance to the origin.
:::

::: step { at = 75 }

The trajectories turn inward. Each contour is a level of the same certificate. The derivative is negative, so trajectories cross toward smaller levels.
:::

::: step { at = 150 }

A finite picture illustrates the calculation; the theorem supplies the guarantee under its assumptions. Seed 1, the matrix [−1, 3; 0, −2], RK4 step 0.02, three seconds.
:::


## Textbook

### The idea {#statement}

A continuously differentiable $V$ with $V(0)=0$, $V(x)>0$ away from zero and $\nabla V(x)^Tf(x)<0$ proves local asymptotic stability on an appropriate neighborhood. Properness and global conditions extend the conclusion globally.

### The calculation {#reasoning}

The function measures progress toward equilibrium. Its level sets trap trajectories because the derivative points inward on their boundaries. If $c_1\|x\|^2\le V(x)\le c_2\|x\|^2$ and $\dot V\le-c_3\|x\|^2$, comparison gives $V(t)\le e^{-c_3t/c_2}V(0)$ and a state-norm rate $c_3/(2c_2)$. Nonpositive derivatives alone require an invariance argument before claiming attraction. In discrete time the decrease is $V(f(x))-V(x)$, not a Lie derivative.

### Assumptions and domain {#assumptions}

Positive definiteness, the decrease domain, forward existence and invariance must all be checked. The zero function cannot certify attraction.

### See the trajectories {#experiment}

{{flow linear}}

[Open the flows and certificates Lab](#/flows). The pictures and holdout rates are numerical evidence.

### Where it is used {#uses}

[[lyapunov-equation]], [[learning-certificates]], [[two-values]].

## Card

### The idea {#idea}

A continuously differentiable $V$ with $V(0)=0$, $V(x)>0$ away from zero and $\nabla V(x)^Tf(x)<0$ proves local asymptotic stability on an appropriate neighborhood. Properness and global conditions extend the conclusion globally.

### Intuition and example {#intuition}

The function measures progress toward equilibrium. Its level sets trap trajectories because the derivative points inward on their boundaries. If $c_1\|x\|^2\le V(x)\le c_2\|x\|^2$ and $\dot V\le-c_3\|x\|^2$, comparison gives $V(t)\le e^{-c_3t/c_2}V(0)$ and a state-norm rate $c_3/(2c_2)$. Nonpositive derivatives alone require an invariance argument before claiming attraction. In discrete time the decrease is $V(f(x))-V(x)$, not a Lie derivative.

### Assumptions and domain {#assumptions}

Positive definiteness, the decrease domain, forward existence and invariance must all be checked. The zero function cannot certify attraction.

### Where it is used {#uses}

[[lyapunov-equation]], [[learning-certificates]], [[two-values]].
