+++
summary = "Converse results establish certificate existence; ISS measures how disturbances change state bounds."
prereqs = ["lyapunov-functions", "comparison-functions"]
time = "continuous"
sources = [{ text = "Khalil, Nonlinear Systems", kind = "textbook", locator = "3rd edition, 2002, §§4.7–4.9", review = "located", url = "https://www.egr.msu.edu/~khalil/NonlinearSystems/" }]
+++

## Textbook

### The idea {#statement}

Input-to-state stability bounds $\|x(t)\|\le\beta(\|x(0)\|,t)+\gamma(\|u\|_\infty)$ for $\beta\in\mathcal{KL}$ and $\gamma\in\mathcal K$.

### The calculation {#reasoning}

A Lyapunov inequality $\dot V\le-\alpha(\|x\|)+\sigma(\|u\|)$ explains the bound: outside an input-dependent ball the certificate decreases. Converse results construct certificates from stability properties under smoothness and domain assumptions. They establish existence, not that a chosen quadratic class contains the certificate or a solver finds it. For $\dot x=-x+u$, variation of constants gives $|x(t)|\le e^{-t}|x(0)|+\|u\|_\infty$.

### Assumptions and domain {#assumptions}

ISS concerns disturbance to one equilibrium. Incremental ISS concerns differences between two forced trajectories; one cannot substitute for the other.

### Where it is used {#uses}

[[incremental-stability]], [[learning-certificates]].

## Card

### The idea {#idea}

Input-to-state stability bounds $\|x(t)\|\le\beta(\|x(0)\|,t)+\gamma(\|u\|_\infty)$ for $\beta\in\mathcal{KL}$ and $\gamma\in\mathcal K$.

### Intuition and example {#intuition}

A Lyapunov inequality $\dot V\le-\alpha(\|x\|)+\sigma(\|u\|)$ explains the bound: outside an input-dependent ball the certificate decreases. Converse results construct certificates from stability properties under smoothness and domain assumptions. They establish existence, not that a chosen quadratic class contains the certificate or a solver finds it. For $\dot x=-x+u$, variation of constants gives $|x(t)|\le e^{-t}|x(0)|+\|u\|_\infty$.

### Assumptions and domain {#assumptions}

ISS concerns disturbance to one equilibrium. Incremental ISS concerns differences between two forced trajectories; one cannot substitute for the other.

### Where it is used {#uses}

[[incremental-stability]], [[learning-certificates]].
