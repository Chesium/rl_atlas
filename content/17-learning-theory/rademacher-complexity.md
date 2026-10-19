+++
summary = "How well can a class match random signs? That measures its ability to exploit sampling noise."
prereqs = ["uniform-convergence"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 26, §§26.1–26.3", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

On a fixed sample, $\widehat{\mathfrak R}_n(F)=\mathbb E_\sigma\sup_{f\in F}n^{-1}\sum_i\sigma_i f(Z_i)$, with independent uniform signs.

### The calculation {#reasoning}

A class that matches arbitrary signs can exploit noise. For $f_w(z)=w^Tz$, $\|w\|_2\le B$ and $\|z\|_2\le R$, duality and Jensen yield $\widehat{\mathfrak R}_n\le BR/\sqrt n$. The supremum is chosen after the signs. The paper uses a worst-case-sample absolute-value convention for trajectory residuals; its lemma states that convention. The demo estimates a finite class’s sign expectation; it is a Monte Carlo estimate, not an exact complexity theorem.

### Assumptions and domain {#assumptions}

Distinguish empirical, expected and worst-case-sample complexity; specify the absolute-value convention.

### Try the class {#experiment}

{{learning signs}}

### Where it is used {#uses}

[[covering-dudley]], [[rademacher-properties]], [[boffi-lemma-4-1]].

## Card

### The idea {#idea}

On a fixed sample, $\widehat{\mathfrak R}_n(F)=\mathbb E_\sigma\sup_{f\in F}n^{-1}\sum_i\sigma_i f(Z_i)$, with independent uniform signs.

### Intuition and example {#intuition}

A class that matches arbitrary signs can exploit noise. For $f_w(z)=w^Tz$, $\|w\|_2\le B$ and $\|z\|_2\le R$, duality and Jensen yield $\widehat{\mathfrak R}_n\le BR/\sqrt n$. The supremum is chosen after the signs. The paper uses a worst-case-sample absolute-value convention for trajectory residuals; its lemma states that convention. The demo estimates a finite class’s sign expectation; it is a Monte Carlo estimate, not an exact complexity theorem.

### Assumptions and domain {#assumptions}

Distinguish empirical, expected and worst-case-sample complexity; specify the absolute-value convention.

### Where it is used {#uses}

[[covering-dudley]], [[rademacher-properties]], [[boffi-lemma-4-1]].
