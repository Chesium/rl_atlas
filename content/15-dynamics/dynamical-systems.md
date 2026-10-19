+++
summary = "Fix a controller, then study the state trajectories its closed loop generates."
prereqs = []
time = "both"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§1.1, 3.1", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

A fixed controller $u=\pi(x)$ turns $\dot x=F(x,u)$ into the autonomous flow $\dot x=f(x)=F(x,\pi(x))$. A discrete system instead iterates $x_{t+1}=f(x_t)$.

### The calculation {#reasoning}

The state contains what is needed to predict the next evolution. Once the controller is fixed there is no maximization over actions in a certificate inequality. For $\dot x=-x$, the flow is $\phi_t(\xi)=e^{-t}\xi$; for $x_{t+1}=ax_t$, it is $a^t\xi$. Numerical integration approximates the first; it is not the dynamics itself. Local Lipschitz continuity supplies uniqueness, while a bounded invariant set prevents finite escape.

### Assumptions and domain {#assumptions}

An autonomous, finite-dimensional state; specify the domain and initial-condition set. A learned controller must be held fixed during this analysis.

### Where it is used {#uses}

[[stability]], [[trajectories-as-samples]], [[controller-or-certificate]].

## Card

### The idea {#idea}

A fixed controller $u=\pi(x)$ turns $\dot x=F(x,u)$ into the autonomous flow $\dot x=f(x)=F(x,\pi(x))$. A discrete system instead iterates $x_{t+1}=f(x_t)$.

### Intuition and example {#intuition}

The state contains what is needed to predict the next evolution. Once the controller is fixed there is no maximization over actions in a certificate inequality. For $\dot x=-x$, the flow is $\phi_t(\xi)=e^{-t}\xi$; for $x_{t+1}=ax_t$, it is $a^t\xi$. Numerical integration approximates the first; it is not the dynamics itself. Local Lipschitz continuity supplies uniqueness, while a bounded invariant set prevents finite escape.

### Assumptions and domain {#assumptions}

An autonomous, finite-dimensional state; specify the domain and initial-condition set. A learned controller must be held fixed during this analysis.

### Where it is used {#uses}

[[stability]], [[trajectories-as-samples]], [[controller-or-certificate]].
