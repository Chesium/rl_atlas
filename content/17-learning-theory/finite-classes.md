+++
summary = "Union bounds connect class size to data requirements, with a faster rate when empirical errors vanish."
prereqs = ["concentration", "risk-erm"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 4", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

For a fixed finite class H of [0,1] losses, $\sup_h|R(h)-\widehat R_n(h)|\le\sqrt{\log(2|H|/\delta)/(2n)}$ with probability at least $1-\delta$.

### The calculation {#reasoning}

Apply Hoeffding to every member and union bound. Complexity costs the logarithm of class size. For zero empirical binary errors a sharper argument works: a hypothesis with risk epsilon avoids errors with probability at most $(1-\epsilon)^n\le e^{-n\epsilon}$. Union bounding gives $R(\hat h)\le\log(|H|/\delta)/n$. This is a simple fast realizable rate; generic additive deviation hides it.

### Assumptions and domain {#assumptions}

The class must be fixed independently of training data. The fast argument needs binary errors and zero empirical errors.

### Where it is used {#uses}

[[uniform-convergence]], [[margin-bounds]].

## Card

### The idea {#idea}

For a fixed finite class H of [0,1] losses, $\sup_h|R(h)-\widehat R_n(h)|\le\sqrt{\log(2|H|/\delta)/(2n)}$ with probability at least $1-\delta$.

### Intuition and example {#intuition}

Apply Hoeffding to every member and union bound. Complexity costs the logarithm of class size. For zero empirical binary errors a sharper argument works: a hypothesis with risk epsilon avoids errors with probability at most $(1-\epsilon)^n\le e^{-n\epsilon}$. Union bounding gives $R(\hat h)\le\log(|H|/\delta)/n$. This is a simple fast realizable rate; generic additive deviation hides it.

### Assumptions and domain {#assumptions}

The class must be fixed independently of training data. The fast argument needs binary errors and zero empirical errors.

### Where it is used {#uses}

[[uniform-convergence]], [[margin-bounds]].
