+++
summary = "Policy value predicts reward; a Lyapunov certificate proves decrease. Cost-to-go can connect the two."
prereqs = ["lyapunov-functions", "value-functions"]
time = "both"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §4.1; bridge to policy values", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

A policy value predicts accumulated reward. A Lyapunov function proves decrease toward an equilibrium.

### The calculation {#reasoning}

For a fixed stable policy and positive cost, the undiscounted cost-to-go $V(x)=\int_0^\infty\ell(\phi_t(x))dt$ satisfies $\nabla V^Tf=-\ell(x)$ when finite and differentiable. It is a certificate if positivity, domain and properness conditions hold. Reward maximization flips the sign. Discounting changes the identity to $\nabla V^Tf=\rho V-\ell$, so discounted value need not decrease. A good reward score alone does not prove stability.

### Assumptions and domain {#assumptions}

Finiteness, differentiability and positive state cost are essential; infinite-horizon integrals may diverge.

### Where it is used {#uses}

[[controller-or-certificate]], [[learning-certificates]].

## Card

### The idea {#idea}

A policy value predicts accumulated reward. A Lyapunov function proves decrease toward an equilibrium.

### Intuition and example {#intuition}

For a fixed stable policy and positive cost, the undiscounted cost-to-go $V(x)=\int_0^\infty\ell(\phi_t(x))dt$ satisfies $\nabla V^Tf=-\ell(x)$ when finite and differentiable. It is a certificate if positivity, domain and properness conditions hold. Reward maximization flips the sign. Discounting changes the identity to $\nabla V^Tf=\rho V-\ell$, so discounted value need not decrease. A good reward score alone does not prove stability.

### Assumptions and domain {#assumptions}

Finiteness, differentiability and positive state cost are essential; infinite-horizon integrals may diverge.

### Where it is used {#uses}

[[controller-or-certificate]], [[learning-certificates]].
