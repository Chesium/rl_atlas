+++
summary = "Zero empirical margin violations turn squared trajectory complexity into a fast generalization bound."
prereqs = ["margin-bounds", "rademacher-complexity", "trajectories-as-samples", "certificate-classes"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Lemma 4.1, p.6", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### Statement {#statement}

For $0<\delta<1$, a feasible margin-$\gamma$ solution obeys with probability at least $1-\delta$: $$\begin{aligned}\operatorname{err}(\widehat V_n)&\le K(A_n+B_n),\\ A_n&=\frac{\log^3n}{\gamma^2}\mathfrak R_n(\mathcal V)^2,\\ B_n&=\frac{\log(\log(4B_h/\gamma)/\delta)}{n}.\end{aligned}$$ Here K is universal; $\mathfrak R_n$ is worst-case-sample absolute Rademacher complexity of trajectory residuals.

### Where the assumptions enter {#reasoning}

Zero empirical margin violations permit a fast-rate theorem that squares the complexity. Thus $\mathfrak R_n\sim\sqrt{k/n}$ gives approximately k/n, rather than $\sqrt{k/n}$. The result bounds failure of a trajectory from the same initial distribution, not arbitrary points from another distribution. Feasibility is used before the statistical bound; the theorem does not prove it.

For example, if a fixed-radius class has squared complexity proportional to $3/n$, doubling n halves the leading bound up to logarithms, provided the same positive margin remains feasible.

### Assumptions and domain {#assumptions}

Assumptions 4.1–4.2: a common compact reachable set, uniformly bounded certificates and derivatives, bounded Lipschitz residual, i.i.d. initial states, positive margin, and feasible constraints along the entire sampled trajectories. The paper’s asymptotic-constant expression is not a calibrated numeric confidence bound for this Lab.

### Where it is used {#uses}

[[boffi-thm-4-2]], [[boffi-thm-4-3]], [[boffi-thm-4-4]].

## Card

### Statement {#statement}

For $0<\delta<1$, a feasible margin-$\gamma$ solution obeys with probability at least $1-\delta$: $$\begin{aligned}\operatorname{err}(\widehat V_n)&\le K(A_n+B_n),\\ A_n&=\frac{\log^3n}{\gamma^2}\mathfrak R_n(\mathcal V)^2,\\ B_n&=\frac{\log(\log(4B_h/\gamma)/\delta)}{n}.\end{aligned}$$ Here K is universal; $\mathfrak R_n$ is worst-case-sample absolute Rademacher complexity of trajectory residuals.

### Intuition and example {#intuition}

Zero empirical margin violations permit a fast-rate theorem that squares the complexity. Thus $\mathfrak R_n\sim\sqrt{k/n}$ gives approximately k/n, rather than $\sqrt{k/n}$. The result bounds failure of a trajectory from the same initial distribution, not arbitrary points from another distribution. Feasibility is used before the statistical bound; the theorem does not prove it.

For example, if a fixed-radius class has squared complexity proportional to $3/n$, doubling n halves the leading bound up to logarithms, provided the same positive margin remains feasible.

### Assumptions and domain {#assumptions}

Assumptions 4.1–4.2: a common compact reachable set, uniformly bounded certificates and derivatives, bounded Lipschitz residual, i.i.d. initial states, positive margin, and feasible constraints along the entire sampled trajectories. The paper’s asymptotic-constant expression is not a calibrated numeric confidence bound for this Lab.

### Proof sketch {#proof}

Zero empirical margin violations permit a fast-rate theorem that squares the complexity. Thus $\mathfrak R_n\sim\sqrt{k/n}$ gives approximately k/n, rather than $\sqrt{k/n}$. The result bounds failure of a trajectory from the same initial distribution, not arbitrary points from another distribution. Feasibility is used before the statistical bound; the theorem does not prove it. Source status: located. The proof route is identified; a separate independent proof audit has not been completed.

### Where it is used {#uses}

[[boffi-thm-4-2]], [[boffi-thm-4-3]], [[boffi-thm-4-4]].
