+++
summary = "Bellman operators, physical flows and Rademacher composition use the same word for three different arguments."
prereqs = ["contraction-metrics", "bellman", "rademacher-properties"]
time = "both"
sources = [{ text = "Lohmiller and Slotine, On Contraction Analysis for Non-linear Systems", kind = "paper", locator = "Automatica 34(6), 1998, §§2–3; bridge between definitions", review = "located", url = "https://doi.org/10.1016/S0005-1098(98)00019-3" }]
+++

## Textbook

### The idea {#statement}

Bellman contraction shrinks differences between value functions. Flow contraction shrinks trajectory distances. Rademacher contraction bounds a class after Lipschitz composition.

### The calculation {#reasoning}

The Bellman operator obeys $\|Tv-Tw\|_\infty\le\gamma\|v-w\|_\infty$ in discounted MDPs. A contracting flow obeys a metric differential inequality with physical rate alpha. The statistical lemma compares expected random-sign suprema and need not describe an iterative map or a stable system. A discounted Bellman operator may contract while a physical policy drives an unstable plant.

### Assumptions and domain {#assumptions}

Name the space, norm or metric, and constant before transferring a contraction argument across subjects.

### Where it is used {#uses}

[[boffi-thm-4-4]], [[controller-or-certificate]].

## Card

### The idea {#idea}

Bellman contraction shrinks differences between value functions. Flow contraction shrinks trajectory distances. Rademacher contraction bounds a class after Lipschitz composition.

### Intuition and example {#intuition}

The Bellman operator obeys $\|Tv-Tw\|_\infty\le\gamma\|v-w\|_\infty$ in discounted MDPs. A contracting flow obeys a metric differential inequality with physical rate alpha. The statistical lemma compares expected random-sign suprema and need not describe an iterative map or a stable system. A discounted Bellman operator may contract while a physical policy drives an unstable plant.

### Assumptions and domain {#assumptions}

Name the space, norm or metric, and constant before transferring a contraction argument across subjects.

### Where it is used {#uses}

[[boffi-thm-4-4]], [[controller-or-certificate]].
