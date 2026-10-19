+++
summary = "Control the distance between two trajectories, with uniform bounds over their initial states."
prereqs = ["comparison-functions", "ode-sensitivity"]
time = "continuous"
sources = [{ text = "Angeli, A Lyapunov Approach to Incremental Stability Properties", kind = "paper", locator = "IEEE TAC 47(3), 2002, §§II–IV", review = "located", url = "https://doi.org/10.1109/9.989067" }]
+++

## Textbook

### The idea {#statement}

Incremental stability controls two solutions: $\|\phi_t(\xi)-\phi_t(\zeta)\|\le\beta(\|\xi-\zeta\|,t)$. Incremental exponential stability uses $Ce^{-\alpha t}\|\xi-\zeta\|$.

### The calculation {#reasoning}

Treat (x,y) as a doubled system and the diagonal x=y as the target set. Equilibrium stability alone does not bound separation uniformly for every pair. Different inputs add a gain of their difference in incremental ISS. Such bounds control how errors in an imitated controller accumulate in deployment. The paper assumes incremental stability before converting small violation probability into a geometric guarantee; training data does not establish that assumption.

### Assumptions and domain {#assumptions}

A common invariant domain, uniform constants and identical time intervals. Distinguish incremental asymptotic from incremental exponential stability.

### Where it is used {#uses}

[[variational-dynamics]], [[imitation-deployment]], [[boffi-thm-5-1]].

## Card

### The idea {#idea}

Incremental stability controls two solutions: $\|\phi_t(\xi)-\phi_t(\zeta)\|\le\beta(\|\xi-\zeta\|,t)$. Incremental exponential stability uses $Ce^{-\alpha t}\|\xi-\zeta\|$.

### Intuition and example {#intuition}

Treat (x,y) as a doubled system and the diagonal x=y as the target set. Equilibrium stability alone does not bound separation uniformly for every pair. Different inputs add a gain of their difference in incremental ISS. Such bounds control how errors in an imitated controller accumulate in deployment. The paper assumes incremental stability before converting small violation probability into a geometric guarantee; training data does not establish that assumption.

### Assumptions and domain {#assumptions}

A common invariant domain, uniform constants and identical time intervals. Distinguish incremental asymptotic from incremental exponential stability.

### Where it is used {#uses}

[[variational-dynamics]], [[imitation-deployment]], [[boffi-thm-5-1]].
