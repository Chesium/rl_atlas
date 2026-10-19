+++
summary = "A changing positive metric can reveal shrinking trajectory distances hidden by Euclidean transients."
prereqs = ["variational-dynamics", "lyapunov-equation", "incremental-stability"]
time = "continuous"
sources = [{ text = "Lohmiller and Slotine, On Contraction Analysis for Non-linear Systems", kind = "paper", locator = "Automatica 34(6), 1998, §§2–3, generalized metric", review = "located", url = "https://doi.org/10.1016/S0005-1098(98)00019-3" }]

[story]
scene = "flow"
world = "linear"
metric = true
+++

## Story

::: step { at = 0 }

Start eight trajectories from independent initial states. They all follow the same fixed linear dynamics. No agent chooses an action.
:::

::: step { at = 25 }

Euclidean distance can grow briefly even though the eigenvalues are stable. The dotted ellipses show how a positive metric measures displacement.
:::

::: step { at = 75 }

The trajectories turn inward. A differential inequality controls every infinitesimal direction when it holds throughout the domain.
:::

::: step { at = 150 }

A finite picture illustrates the calculation; the theorem supplies the guarantee under its assumptions. Seed 1, the matrix [−1, 3; 0, −2], RK4 step 0.02, three seconds.
:::


## Textbook

### The idea {#statement}

Let $mI\preceq M(x)\preceq LI$. If $J^TM+MJ+\dot M\preceq-2\alpha M$, squared differential lengths $\delta x^TM\delta x$ decay at rate $2\alpha$.

### The calculation {#reasoning}

Differentiate differential length using both the moving displacement and the moving metric. Integrating lengths along a connecting path transfers differential decay to the induced distance. On a region containing those paths, Euclidean separation is bounded by $\sqrt{L/m}e^{-\alpha t}$ times initial separation. The uniform bounds turn a metric statement into a state-norm statement. A linear system with constant metric reduces to a Lyapunov inequality. Lab ellipses are metric unit balls, not confidence intervals.

### Assumptions and domain {#assumptions}

A smooth positive metric, forward invariance and appropriate path/geodesic connectivity. A grid inequality is evidence at grid points, not a proof over the region.

### See the trajectories {#experiment}

{{flow contraction}}

[Open the flows and certificates Lab](#/flows). The pictures and holdout rates are numerical evidence.

### Where it is used {#uses}

[[three-contractions]], [[boffi-thm-5-2]], [[vdp-certificates]].

## Card

### The idea {#idea}

Let $mI\preceq M(x)\preceq LI$. If $J^TM+MJ+\dot M\preceq-2\alpha M$, squared differential lengths $\delta x^TM\delta x$ decay at rate $2\alpha$.

### Intuition and example {#intuition}

Differentiate differential length using both the moving displacement and the moving metric. Integrating lengths along a connecting path transfers differential decay to the induced distance. On a region containing those paths, Euclidean separation is bounded by $\sqrt{L/m}e^{-\alpha t}$ times initial separation. The uniform bounds turn a metric statement into a state-norm statement. A linear system with constant metric reduces to a Lyapunov inequality. Lab ellipses are metric unit balls, not confidence intervals.

### Assumptions and domain {#assumptions}

A smooth positive metric, forward invariance and appropriate path/geodesic connectivity. A grid inequality is evidence at grid points, not a proof over the region.

### Where it is used {#uses}

[[three-contractions]], [[boffi-thm-5-2]], [[vdp-certificates]].
