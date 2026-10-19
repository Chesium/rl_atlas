+++
summary = "Separate population risk from the empirical objective used to choose a hypothesis."
prereqs = []
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapters 3–4", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

Population risk is $R(h)=\mathbb E\ell(h,Z)$. Empirical risk is $\widehat R_n(h)=n^{-1}\sum_i\ell(h,Z_i)$. ERM selects a hypothesis using the sample.

### The calculation {#reasoning}

A fixed hypothesis admits concentration, but the selected hypothesis depends on those same data. Uniform control handles this dependence: if $\sup_h|R(h)-\widehat R_n(h)|\le\epsilon$, exact ERM has excess risk at most $2\epsilon$. Add an optimization error for approximate minimization. Certificate loss may ask whether any time on a trajectory violates decrease; one independent initial state contributes one example.

### Assumptions and domain {#assumptions}

I.i.d. examples, measurable losses, and a class fixed before inspecting data. A tuning set used for class selection is no longer a fresh test set.

### Where it is used {#uses}

[[uniform-convergence]], [[trajectories-as-samples]].

## Card

### The idea {#idea}

Population risk is $R(h)=\mathbb E\ell(h,Z)$. Empirical risk is $\widehat R_n(h)=n^{-1}\sum_i\ell(h,Z_i)$. ERM selects a hypothesis using the sample.

### Intuition and example {#intuition}

A fixed hypothesis admits concentration, but the selected hypothesis depends on those same data. Uniform control handles this dependence: if $\sup_h|R(h)-\widehat R_n(h)|\le\epsilon$, exact ERM has excess risk at most $2\epsilon$. Add an optimization error for approximate minimization. Certificate loss may ask whether any time on a trajectory violates decrease; one independent initial state contributes one example.

### Assumptions and domain {#assumptions}

I.i.d. examples, measurable losses, and a class fixed before inspecting data. A tuning set used for class selection is no longer a fresh test set.

### Where it is used {#uses}

[[uniform-convergence]], [[trajectories-as-samples]].
