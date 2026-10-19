+++
summary = "Learning a witness for a fixed closed loop differs from learning actions or identifying a model."
prereqs = ["dynamical-systems", "lyapunov-functions"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §§2–3, pp.3–5", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The idea {#statement}

Learning a controller changes trajectories. Learning a certificate evaluates fixed dynamics and need not change a single action.

### The calculation {#reasoning}

Hold a controller fixed after RL training and treat its closed loop as autonomous. Fitting V searches for a witness of decrease. Failure to find a witness does not establish instability: the system may need a richer class, another domain or a better solver. Changing the controller after fitting invalidates the sampled constraints. Model learning estimates f; certificate learning can instead use time derivatives of observed trajectories.

### Assumptions and domain {#assumptions}

Trajectories and certificates must refer to the same fixed closed loop. Estimated derivatives introduce a separate approximation error.

### Where it is used {#uses}

[[learning-certificates]], [[certificates-in-practice]].

## Card

### The idea {#idea}

Learning a controller changes trajectories. Learning a certificate evaluates fixed dynamics and need not change a single action.

### Intuition and example {#intuition}

Hold a controller fixed after RL training and treat its closed loop as autonomous. Fitting V searches for a witness of decrease. Failure to find a witness does not establish instability: the system may need a richer class, another domain or a better solver. Changing the controller after fitting invalidates the sampled constraints. Model learning estimates f; certificate learning can instead use time derivatives of observed trajectories.

### Assumptions and domain {#assumptions}

Trajectories and certificates must refer to the same fixed closed loop. Estimated derivatives introduce a separate approximation error.

### Where it is used {#uses}

[[learning-certificates]], [[certificates-in-practice]].
