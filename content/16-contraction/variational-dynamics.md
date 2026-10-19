+++
summary = "The Jacobian transports infinitesimal displacements along a nonlinear trajectory."
prereqs = ["ode-sensitivity"]
time = "continuous"
sources = [{ text = "Lohmiller and Slotine, On Contraction Analysis for Non-linear Systems", kind = "paper", locator = "Automatica 34(6), 1998, §2, differential displacement", review = "located", url = "https://doi.org/10.1016/S0005-1098(98)00019-3" }]
+++

## Textbook

### The idea {#statement}

An infinitesimal displacement evolves by $\dot{\delta x}=J(x)\delta x$, $J=Df(x)$. This linear system follows a moving nonlinear trajectory.

### The calculation {#reasoning}

Expand $f(x+\delta x)-f(x)=J(x)\delta x+o(\|\delta x\|)$. Discarding the remainder gives tangent dynamics. A nearby finite trajectory difference includes that remainder. For $f(x)=-x-x^3$, $J=-1-3x^2\le-1$, so Euclidean infinitesimal distances decay everywhere. In multiple dimensions a metric can reveal contraction when Euclidean length grows temporarily.

### Assumptions and domain {#assumptions}

A differentiable vector field on the domain. A stable Jacobian at each frozen state is not itself a uniform contraction proof along a moving trajectory.

### Where it is used {#uses}

[[contraction-metrics]], [[boffi-thm-5-2]].

## Card

### The idea {#idea}

An infinitesimal displacement evolves by $\dot{\delta x}=J(x)\delta x$, $J=Df(x)$. This linear system follows a moving nonlinear trajectory.

### Intuition and example {#intuition}

Expand $f(x+\delta x)-f(x)=J(x)\delta x+o(\|\delta x\|)$. Discarding the remainder gives tangent dynamics. A nearby finite trajectory difference includes that remainder. For $f(x)=-x-x^3$, $J=-1-3x^2\le-1$, so Euclidean infinitesimal distances decay everywhere. In multiple dimensions a metric can reveal contraction when Euclidean length grows temporarily.

### Assumptions and domain {#assumptions}

A differentiable vector field on the domain. A stable Jacobian at each frozen state is not itself a uniform contraction proof along a moving trajectory.

### Where it is used {#uses}

[[contraction-metrics]], [[boffi-thm-5-2]].
