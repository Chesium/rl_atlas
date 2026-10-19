+++
summary = "Derivatives, differences, Lyapunov equations and contraction rates in the two time conventions."
prereqs = ["lyapunov-equation", "ode-sensitivity"]
time = "both"
sources = [{ text = "Hespanha, Linear Systems Theory", kind = "textbook", locator = "2nd edition, 2018, §§8.4–8.6", review = "located", url = "https://press.princeton.edu/books/hardcover/9780691179575/linear-systems-theory" }]
+++

## Textbook

### The idea {#statement}

Continuous time differentiates: $\dot V=\nabla V^Tf$. Discrete time subtracts: $\Delta V=V(f(x))-V(x)$.

### The calculation {#reasoning}

Linear stability uses $\Re\lambda(A)<0$ for $\dot x=Ax$, but $|\lambda(A)|<1$ for $x^+=Ax$. The equations are $A^TP+PA=-Q$ and $A^TPA-P=-Q$. Differential dynamics use $\dot{\delta x}=J\delta x$ and $\delta x^+=J\delta x$. Metrics satisfy $\dot M+J^TM+MJ\preceq-2\alpha M$ and $J^TM(f(x))J\preceq\rho^2M(x)$. Squared lengths decay at twice the continuous norm rate; in discrete time the factor is squared. Euler can destroy stability: $\dot x=-x$ is stable, but $x^+=(1-h)x$ needs $0<h<2$.

### Assumptions and domain {#assumptions}

Time discretization has a stability restriction. Paper statements remain continuous unless explicitly translated.

### Where it is used {#uses}

[[contraction-metrics]], [[three-contractions]].

## Card

### The idea {#idea}

Continuous time differentiates: $\dot V=\nabla V^Tf$. Discrete time subtracts: $\Delta V=V(f(x))-V(x)$.

### Intuition and example {#intuition}

Linear stability uses $\Re\lambda(A)<0$ for $\dot x=Ax$, but $|\lambda(A)|<1$ for $x^+=Ax$. The equations are $A^TP+PA=-Q$ and $A^TPA-P=-Q$. Differential dynamics use $\dot{\delta x}=J\delta x$ and $\delta x^+=J\delta x$. Metrics satisfy $\dot M+J^TM+MJ\preceq-2\alpha M$ and $J^TM(f(x))J\preceq\rho^2M(x)$. Squared lengths decay at twice the continuous norm rate; in discrete time the factor is squared. Euler can destroy stability: $\dot x=-x$ is stable, but $x^+=(1-h)x$ needs $0<h<2$.

### Assumptions and domain {#assumptions}

Time discretization has a stability restriction. Paper statements remain continuous unless explicitly translated.

### Where it is used {#uses}

[[contraction-metrics]], [[three-contractions]].
