+++
summary = "Scalar decay inequalities turn certificate residuals into bounds on trajectories."
prereqs = ["stability"]
time = "continuous"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§3.4, 4.4", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

A class $\mathcal K$ function is continuous, strictly increasing and zero at zero. A $\mathcal{KL}$ function is class $\mathcal K$ in its first argument and decays to zero in time for each fixed first argument.

### The calculation {#reasoning}

If $\dot V\le-\lambda V+b(t)$, multiplying by $e^{\lambda t}$ and integrating gives $V(t)\le e^{-\lambda t}V(0)+\int_0^t e^{-\lambda(t-s)}b(s)ds$. A nearly valid certificate has an additive residual of this form. A constant residual b gives an ultimate level $b/\lambda$, not convergence to zero. A class K function need not be unbounded; $\mathcal K_\infty$ adds that property.

### Assumptions and domain {#assumptions}

Scalar differential inequalities require regularity along trajectories and a matching initial condition. Bounds hold only on the interval where their premises hold.

### Where it is used {#uses}

[[converse-iss]], [[boffi-thm-5-1]].

## Card

### The idea {#idea}

A class $\mathcal K$ function is continuous, strictly increasing and zero at zero. A $\mathcal{KL}$ function is class $\mathcal K$ in its first argument and decays to zero in time for each fixed first argument.

### Intuition and example {#intuition}

If $\dot V\le-\lambda V+b(t)$, multiplying by $e^{\lambda t}$ and integrating gives $V(t)\le e^{-\lambda t}V(0)+\int_0^t e^{-\lambda(t-s)}b(s)ds$. A nearly valid certificate has an additive residual of this form. A constant residual b gives an ultimate level $b/\lambda$, not convergence to zero. A class K function need not be unbounded; $\mathcal K_\infty$ adds that property.

### Assumptions and domain {#assumptions}

Scalar differential inequalities require regularity along trajectories and a matching initial condition. Bounds hold only on the interval where their premises hold.

### Where it is used {#uses}

[[converse-iss]], [[boffi-thm-5-1]].
