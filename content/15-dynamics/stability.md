+++
summary = "Staying near an equilibrium, approaching it, and approaching it exponentially are different properties."
prereqs = ["dynamical-systems"]
time = "both"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §4.1", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

Stability means every tolerance $\epsilon>0$ admits a radius $\delta>0$ such that $\|x(0)\|<\delta$ implies $\|x(t)\|<\epsilon$ for all future times. Asymptotic stability also requires convergence to the equilibrium.

### The calculation {#reasoning}

Exponential stability strengthens convergence to $\|x(t)\|\le Ce^{-\alpha t}\|x(0)\|$, uniformly over the stated initial set. In discrete time use $C\rho^t$, $0<\rho<1$. A center can be stable without attracting anything. A stable nonnormal matrix can temporarily amplify Euclidean length before decaying; eigenvalues describe eventual behavior, not absence of transients. The Lab linear system deliberately shows this.

### Assumptions and domain {#assumptions}

Local and global are different claims. Global convergence requires the whole state space and solutions defined for all future time.

### Where it is used {#uses}

[[lyapunov-functions]], [[incremental-stability]].

## Card

### The idea {#idea}

Stability means every tolerance $\epsilon>0$ admits a radius $\delta>0$ such that $\|x(0)\|<\delta$ implies $\|x(t)\|<\epsilon$ for all future times. Asymptotic stability also requires convergence to the equilibrium.

### Intuition and example {#intuition}

Exponential stability strengthens convergence to $\|x(t)\|\le Ce^{-\alpha t}\|x(0)\|$, uniformly over the stated initial set. In discrete time use $C\rho^t$, $0<\rho<1$. A center can be stable without attracting anything. A stable nonnormal matrix can temporarily amplify Euclidean length before decaying; eigenvalues describe eventual behavior, not absence of transients. The Lab linear system deliberately shows this.

### Assumptions and domain {#assumptions}

Local and global are different claims. Global convergence requires the whole state space and solutions defined for all future time.

### Where it is used {#uses}

[[lyapunov-functions]], [[incremental-stability]].
