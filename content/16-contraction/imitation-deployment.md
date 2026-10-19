+++
summary = "Incremental stability can prevent small controller errors from growing into large deployment errors."
prereqs = ["incremental-stability", "imitation"]
time = "discrete"
sources = [{ text = "Angeli, A Lyapunov Approach to Incremental Stability Properties", kind = "paper", locator = "IEEE TAC 47(3), 2002, §IV; atlas discrete deployment derivation", review = "located", url = "https://doi.org/10.1109/9.989067" }]
+++

## Textbook

### The idea {#statement}

If the expert closed loop contracts by $\rho<1$ and deployed action error adds a state disturbance at most $L_u\epsilon$, then $e_{t+1}\le\rho e_t+L_u\epsilon$.

### The calculation {#reasoning}

Unroll: $e_T\le\rho^Te_0+L_u\epsilon(1-\rho^T)/(1-\rho)$. A Lipschitz factor above one can instead amplify prediction error exponentially. The premise must hold on states visited during deployment; average training error on expert states is insufficient. Incremental ISS generalizes the recurrence to nonlinear gains. This motivates certification without making imitation a prerequisite for every statistical theorem.

### Assumptions and domain {#assumptions}

A common invariant region, uniform deployment action-error bound there, Lipschitz input influence and contracting reference dynamics.

### Where it is used {#uses}

[[controller-or-certificate]], [[boffi-thm-5-1]].

## Card

### The idea {#idea}

If the expert closed loop contracts by $\rho<1$ and deployed action error adds a state disturbance at most $L_u\epsilon$, then $e_{t+1}\le\rho e_t+L_u\epsilon$.

### Intuition and example {#intuition}

Unroll: $e_T\le\rho^Te_0+L_u\epsilon(1-\rho^T)/(1-\rho)$. A Lipschitz factor above one can instead amplify prediction error exponentially. The premise must hold on states visited during deployment; average training error on expert states is insufficient. Incremental ISS generalizes the recurrence to nonlinear gains. This motivates certification without making imitation a prerequisite for every statistical theorem.

### Assumptions and domain {#assumptions}

A common invariant region, uniform deployment action-error bound there, Lipschitz input influence and contracting reference dynamics.

### Where it is used {#uses}

[[controller-or-certificate]], [[boffi-thm-5-1]].
