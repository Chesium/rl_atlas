+++
summary = "Symmetrization, scaling and Lipschitz composition control the complexity of transformed classes."
prereqs = ["rademacher-complexity", "concentration"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 26", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

Adding classes is subadditive in complexity; scaling multiplies it by the absolute factor. Lipschitz scalar composition is controlled by a contraction inequality.

### The calculation {#reasoning}

A zero-at-origin scalar Lipschitz map costs its Lipschitz constant, up to factors depending on the absolute-value convention. Offsets must be handled explicitly. Vector-valued composition needs vector contraction, not a scalar formula used indiscriminately coordinate by coordinate. Symmetrization removes the unknown mean, Jensen handles a norm expectation, bounded differences supplies high probability. None is a physical stability claim.

### Assumptions and domain {#assumptions}

State the supremum convention, zero-offset condition and scalar or vector nature before quoting a factor.

### Where it is used {#uses}

[[three-contractions]], [[kernels-random-features]].

## Card

### The idea {#idea}

Adding classes is subadditive in complexity; scaling multiplies it by the absolute factor. Lipschitz scalar composition is controlled by a contraction inequality.

### Intuition and example {#intuition}

A zero-at-origin scalar Lipschitz map costs its Lipschitz constant, up to factors depending on the absolute-value convention. Offsets must be handled explicitly. Vector-valued composition needs vector contraction, not a scalar formula used indiscriminately coordinate by coordinate. Symmetrization removes the unknown mean, Jensen handles a norm expectation, bounded differences supplies high probability. None is a physical stability claim.

### Assumptions and domain {#assumptions}

State the supremum convention, zero-offset condition and scalar or vector nature before quoting a factor.

### Where it is used {#uses}

[[three-contractions]], [[kernels-random-features]].
