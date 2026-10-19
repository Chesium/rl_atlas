+++
summary = "Learn a polynomial metric for a positively damped oscillator and inspect its remaining violation regions."
prereqs = ["certificates-in-practice", "boffi-thm-5-2"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Figure 1 and Appendix A.5, pp.2, 18–19", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]

[story]
scene = "flow-learning"
world = "vdp"
metric = true
+++

## Story

::: step { samples = 2 }

Two trajectories leave much of the radius-two initial ball unexplored. Fit a positive polynomial metric on their sampled times; the squares show where its decrease condition still fails.
:::

::: step { samples = 8 }

Add independent initial states, rather than more points on the same two trajectories. The metric must now satisfy constraints from eight trajectories. Its holdout test uses the same fresh initial states.
:::

::: step { samples = 32 }

Thirty-two trajectories constrain more directions and regions. This seed leaves fewer violations, but that pattern is an observation. Use the Lab to compare the same settings across all 20 seeds, including the fits that do not meet their training tolerance.
:::

::: step { samples = 32, at = 25 }

The metric ellipses measure local displacement as trajectories move. A finite grid cannot check every point or every time. The conditional theorem requires smoothness, domain and true-contraction assumptions that this picture cannot establish. Seed 5, degree-four Gram metric, test rate 0.1, training rate 0.15, RK4 step 0.02, three seconds.
:::


## Textbook

### The idea {#statement}

The damped oscillator is $\dot x=y$, $\dot y=-(x^2+1)y-x$. Its damping is positive everywhere, unlike the usual self-excited Van der Pol system.

### The calculation {#reasoning}

The paper samples a radius-two ball, uses a three-second horizon, degree-four metric entries and timestep 0.005, downsampled to 50 constraints per trajectory. The atlas preserves dynamics, ball and polynomial degree but uses RK4 at 0.02, analytic Jacobians, 16 constraint times and a small Gram solver. It is an adapted reproduction of the violation-set idea, not a numerical reproduction of Figure 1. Change n, compare the same seeds and holdout states, and inspect full-matrix violations. The paper’s quadruped experiment instead uses a high-dimensional simulated robot; it remains outside this Lab.

### Assumptions and domain {#assumptions}

The grid and holdout horizon are finite. Overfitting means violation fractions need not decrease monotonically for each seed.

### See the trajectories {#experiment}

{{flow vdp}}

[Open the flows and certificates Lab](#/flows). The pictures and holdout rates are numerical evidence.

### Where it is used {#uses}

[[boffi-thm-5-2]].

## Card

### The idea {#idea}

The damped oscillator is $\dot x=y$, $\dot y=-(x^2+1)y-x$. Its damping is positive everywhere, unlike the usual self-excited Van der Pol system.

### Intuition and example {#intuition}

The paper samples a radius-two ball, uses a three-second horizon, degree-four metric entries and timestep 0.005, downsampled to 50 constraints per trajectory. The atlas preserves dynamics, ball and polynomial degree but uses RK4 at 0.02, analytic Jacobians, 16 constraint times and a small Gram solver. It is an adapted reproduction of the violation-set idea, not a numerical reproduction of Figure 1. Change n, compare the same seeds and holdout states, and inspect full-matrix violations. The paper’s quadruped experiment instead uses a high-dimensional simulated robot; it remains outside this Lab.

### Assumptions and domain {#assumptions}

The grid and holdout horizon are finite. Overfitting means violation fractions need not decrease monotonically for each seed.

### Where it is used {#uses}

[[boffi-thm-5-2]].
