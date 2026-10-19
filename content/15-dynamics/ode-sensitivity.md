+++
summary = "Regularity gives unique flows; differentiating them gives the evolution of infinitesimal perturbations."
prereqs = ["dynamical-systems"]
time = "continuous"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§3.1–3.4", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

If f is locally Lipschitz, solutions are locally unique. If f is differentiable, $\Phi(t)=D_\xi\phi_t(\xi)$ satisfies $\dot\Phi=Df(\phi_t(\xi))\Phi$, $\Phi(0)=I$.

### The calculation {#reasoning}

Compare two integral solutions and apply Grönwall: on a common region with Lipschitz constant L, their distance is at most $e^{Lt}$ times their initial distance. This proves continuous dependence but permits exponential growth. Differentiating the integral equation gives sensitivity. A numerical difference of nearby trajectories approximates this derivative only while the displacement is small; subtraction error and nonlinear terms both matter.

### Assumptions and domain {#assumptions}

Local existence does not imply an infinite horizon: $\dot x=x^2$ escapes in finite time for positive initial states. State a common invariant compact region before using uniform derivative bounds.

### Where it is used {#uses}

[[variational-dynamics]], [[trajectories-as-samples]].

## Card

### The idea {#idea}

If f is locally Lipschitz, solutions are locally unique. If f is differentiable, $\Phi(t)=D_\xi\phi_t(\xi)$ satisfies $\dot\Phi=Df(\phi_t(\xi))\Phi$, $\Phi(0)=I$.

### Intuition and example {#intuition}

Compare two integral solutions and apply Grönwall: on a common region with Lipschitz constant L, their distance is at most $e^{Lt}$ times their initial distance. This proves continuous dependence but permits exponential growth. Differentiating the integral equation gives sensitivity. A numerical difference of nearby trajectories approximates this derivative only while the displacement is small; subtraction error and nonlinear terms both matter.

### Assumptions and domain {#assumptions}

Local existence does not imply an infinite horizon: $\dot x=x^2$ escapes in finite time for positive initial states. State a common invariant compact region before using uniform derivative bounds.

### Where it is used {#uses}

[[variational-dynamics]], [[trajectories-as-samples]].
