+++
summary = "Control an entire class at once so the guarantee covers a hypothesis selected from the data."
prereqs = ["risk-erm"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapters 4, 26", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

Uniform convergence controls $\sup_{h\in H}|R(h)-\widehat R_n(h)|$, covering a data-dependent selected hypothesis on one common event.

### The calculation {#reasoning}

The class must be small statistically, not necessarily finite. Symmetrization replaces an unknown expectation by a ghost sample; random signs measure how well the class matches noise. This gives complexity and concentration terms, often of order $1/\sqrt n$. The paper uses a stronger zero-error margin argument for its approximately $1/n$ conclusion.

### Assumptions and domain {#assumptions}

Bounded or controlled loss tails, independent examples, and well-defined suprema.

### Where it is used {#uses}

[[rademacher-complexity]], [[margin-bounds]].

## Card

### The idea {#idea}

Uniform convergence controls $\sup_{h\in H}|R(h)-\widehat R_n(h)|$, covering a data-dependent selected hypothesis on one common event.

### Intuition and example {#intuition}

The class must be small statistically, not necessarily finite. Symmetrization replaces an unknown expectation by a ghost sample; random signs measure how well the class matches noise. This gives complexity and concentration terms, often of order $1/\sqrt n$. The paper uses a stronger zero-error margin argument for its approximately $1/n$ conclusion.

### Assumptions and domain {#assumptions}

Bounded or controlled loss tails, independent examples, and well-defined suprema.

### Where it is used {#uses}

[[rademacher-complexity]], [[margin-bounds]].
