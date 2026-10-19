+++
summary = "Independence and bounded influence turn averages and sample-dependent functions into tail bounds."
prereqs = []
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Appendix B", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

For independent $Z_i\in[a,b]$, $\Pr(|\bar Z-\mathbb E\bar Z|>\epsilon)\le2\exp(-2n\epsilon^2/(b-a)^2)$.

### The calculation {#reasoning}

Hoeffding controls a bounded independent average. McDiarmid controls a function of independent inputs when replacing input i changes it by at most $c_i$: its upper tail is bounded by $\exp(-2t^2/\sum_i c_i^2)$. A uniform-deviation supremum can have bounded differences without being a fixed average. Neither result permits treating adjacent trajectory points as independent.

### Assumptions and domain {#assumptions}

Independence and deterministic range or coordinate-influence bounds. Dependent data require a different argument.

### Where it is used {#uses}

[[finite-classes]], [[rademacher-properties]].

## Card

### The idea {#idea}

For independent $Z_i\in[a,b]$, $\Pr(|\bar Z-\mathbb E\bar Z|>\epsilon)\le2\exp(-2n\epsilon^2/(b-a)^2)$.

### Intuition and example {#intuition}

Hoeffding controls a bounded independent average. McDiarmid controls a function of independent inputs when replacing input i changes it by at most $c_i$: its upper tail is bounded by $\exp(-2t^2/\sum_i c_i^2)$. A uniform-deviation supremum can have bounded differences without being a fixed average. Neither result permits treating adjacent trajectory points as independent.

### Assumptions and domain {#assumptions}

Independence and deterministic range or coordinate-influence bounds. Dependent data require a different argument.

### Where it is used {#uses}

[[finite-classes]], [[rademacher-properties]].
