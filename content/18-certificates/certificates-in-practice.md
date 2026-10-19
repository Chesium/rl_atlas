+++
summary = "Gram positivity, convex fitting and holdout tests supply useful numerical evidence with explicit limits."
prereqs = ["certificate-classes", "contraction-metrics", "concentration"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §6 and Appendices A.1–A.5, pp.9, 14–19", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The idea {#statement}

Gram representations impose positivity. Sampled decrease is affine in parameters when the certificate is linear in those parameters.

### The calculation {#reasoning}

A sum-of-squares polynomial has $p(x)=m(x)^TQm(x)$, $Q\succeq0$. This suffices for nonnegativity but does not represent every nonnegative polynomial. The Lab uses $M=I+B^TQB$ with quadratic monomials: metric entries have degree at most four. Dykstra projections onto halfspaces and the PSD cone solve a small convex feasibility problem; violated eigenvectors add cutting planes. The full matrix residual decides sampled feasibility. A fixed iteration budget can leave that unresolved.

### Assumptions and domain {#assumptions}

Time grids and estimated derivatives require error bounds for certification between samples. Holdout estimates have binomial uncertainty and do not prove a global inequality. Class selection needs fresh validation data.

### Where it is used {#uses}

[[vdp-certificates]], [[boffi-thm-5-2]].

## Card

### The idea {#idea}

Gram representations impose positivity. Sampled decrease is affine in parameters when the certificate is linear in those parameters.

### Intuition and example {#intuition}

A sum-of-squares polynomial has $p(x)=m(x)^TQm(x)$, $Q\succeq0$. This suffices for nonnegativity but does not represent every nonnegative polynomial. The Lab uses $M=I+B^TQB$ with quadratic monomials: metric entries have degree at most four. Dykstra projections onto halfspaces and the PSD cone solve a small convex feasibility problem; violated eigenvectors add cutting planes. The full matrix residual decides sampled feasibility. A fixed iteration budget can leave that unresolved.

### Assumptions and domain {#assumptions}

Time grids and estimated derivatives require error bounds for certification between samples. Holdout estimates have binomial uncertainty and do not prove a global inequality. Class selection needs fresh validation data.

### Where it is used {#uses}

[[vdp-certificates]], [[boffi-thm-5-2]].
