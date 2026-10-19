+++
summary = "Zero empirical violations with a positive margin permit fast rates unavailable from a generic deviation bound."
prereqs = ["uniform-convergence", "finite-classes"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 26; Boffi v2 Lemma 4.1, p.6", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

A negative training margin separates $h(\xi_i,V)\le-\gamma$ from the violation event $h(\xi,V)>0$.

### The calculation {#reasoning}

With zero empirical margin violations, localized arguments bound population error by squared complexity divided by $\gamma^2$, plus confidence and logarithmic terms. This is stronger than applying a generic $1/\sqrt n$ estimate to a ramp loss. A smaller margin worsens the guarantee. Scaling a certificate also scales its complexity, so it does not make the guarantee free. A positive solver residual fails the feasibility premise even if average hinge loss is small.

### Assumptions and domain {#assumptions}

Positive margin, zero empirical margin errors, and the specific fast-rate lemma. Nonzero errors require another theorem.

### Try the class {#experiment}

{{learning rates}}

### Where it is used {#uses}

[[boffi-lemma-4-1]], [[boffi-thm-4-2]].

## Card

### The idea {#idea}

A negative training margin separates $h(\xi_i,V)\le-\gamma$ from the violation event $h(\xi,V)>0$.

### Intuition and example {#intuition}

With zero empirical margin violations, localized arguments bound population error by squared complexity divided by $\gamma^2$, plus confidence and logarithmic terms. This is stronger than applying a generic $1/\sqrt n$ estimate to a ramp loss. A smaller margin worsens the guarantee. Scaling a certificate also scales its complexity, so it does not make the guarantee free. A positive solver residual fails the feasibility premise even if average hinge loss is small.

### Assumptions and domain {#assumptions}

Positive margin, zero empirical margin errors, and the specific fast-rate lemma. Nonzero errors require another theorem.

### Where it is used {#uses}

[[boffi-lemma-4-1]], [[boffi-thm-4-2]].
