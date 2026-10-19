+++
summary = "Fit decrease constraints along training trajectories and measure failure on fresh ones."
prereqs = ["lyapunov-functions", "trajectories-as-samples", "controller-or-certificate"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §3, equations (3.1)–(3.3), pp.4–5", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The idea {#statement}

Choose V so $h(x,\dot x,V(x),DV(x))\le-\gamma$ along sampled trajectories. Population error is the probability that a new trajectory has positive residual at any time.

### The calculation {#reasoning}

A Lyapunov residual is $\nabla V^T\dot x+\alpha(V)$. Positive definiteness is a separate structural constraint. A metric residual is the maximum eigenvalue of $J^TM+MJ+\dot M+2\alpha M$. Derivatives can be observed or estimated without identifying a global model. The theorem allows smooth general parameterizations and assumes a feasible solution. Returning a matrix does not show that the constraints are feasible.

### Assumptions and domain {#assumptions}

A bounded common reachable set, smooth class, positive margin and independent trajectories. Derivative estimation and time grids introduce approximation error.

### See the trajectories {#experiment}

{{flow linear}}

[Open the flows and certificates Lab](#/flows). The pictures and holdout rates are numerical evidence.

### Where it is used {#uses}

[[certificate-classes]], [[boffi-lemma-4-1]].

## Card

### The idea {#idea}

Choose V so $h(x,\dot x,V(x),DV(x))\le-\gamma$ along sampled trajectories. Population error is the probability that a new trajectory has positive residual at any time.

### Intuition and example {#intuition}

A Lyapunov residual is $\nabla V^T\dot x+\alpha(V)$. Positive definiteness is a separate structural constraint. A metric residual is the maximum eigenvalue of $J^TM+MJ+\dot M+2\alpha M$. Derivatives can be observed or estimated without identifying a global model. The theorem allows smooth general parameterizations and assumes a feasible solution. Returning a matrix does not show that the constraints are feasible.

### Assumptions and domain {#assumptions}

A bounded common reachable set, smooth class, positive margin and independent trajectories. Derivative estimation and time grids introduce approximation error.

### Where it is used {#uses}

[[certificate-classes]], [[boffi-lemma-4-1]].
