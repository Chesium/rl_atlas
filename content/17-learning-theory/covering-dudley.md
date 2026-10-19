+++
summary = "Approximate a function class at many scales, then integrate its metric entropy to bound complexity."
prereqs = ["rademacher-complexity"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 27; Boffi v2 Appendix B, p.19", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

An epsilon-cover approximates every class member within epsilon in a specified norm. Chaining integrates the square root of log covering numbers across scales.

### The calculation {#reasoning}

A parameter ball in k dimensions has $\log N(\epsilon)\lesssim k\log(1+C/\epsilon)$. Lipschitz parameter-to-function-and-derivative maps transfer the cover to certificates. The entropy integral then scales like $\sqrt{k/n}$ times class radius. Squaring complexity in the fast-margin lemma gives k/n. A value-only cover is insufficient for derivative residuals. The paper uses $\mathfrak R_n\le24L_h n^{-1/2}\int_0^\infty\sqrt{\log N(\epsilon)}d\epsilon$.

### Assumptions and domain {#assumptions}

Finite diameter and integrable entropy in the norm controlling the loss. General Dudley bounds use a lower cutoff if the integral diverges.

### Where it is used {#uses}

[[covering-properties]], [[boffi-thm-4-2]].

## Card

### The idea {#idea}

An epsilon-cover approximates every class member within epsilon in a specified norm. Chaining integrates the square root of log covering numbers across scales.

### Intuition and example {#intuition}

A parameter ball in k dimensions has $\log N(\epsilon)\lesssim k\log(1+C/\epsilon)$. Lipschitz parameter-to-function-and-derivative maps transfer the cover to certificates. The entropy integral then scales like $\sqrt{k/n}$ times class radius. Squaring complexity in the fast-margin lemma gives k/n. A value-only cover is insufficient for derivative residuals. The paper uses $\mathfrak R_n\le24L_h n^{-1/2}\int_0^\infty\sqrt{\log N(\epsilon)}d\epsilon$.

### Assumptions and domain {#assumptions}

Finite diameter and integrable entropy in the norm controlling the loss. General Dudley bounds use a lower cutoff if the integral diverges.

### Where it is used {#uses}

[[covering-properties]], [[boffi-thm-4-2]].
