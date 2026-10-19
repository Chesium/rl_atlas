+++
summary = "A bounded-density kernel class admits a derivative-aware random-feature generalization argument."
prereqs = ["boffi-lemma-4-1", "kernels-random-features"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 4.4, p.7; Appendix B.3, pp.20–24", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### Statement {#statement}

For the bounded-density feature class (4.5), with probability $1-\delta$, $$\begin{aligned}\operatorname{err}(\widehat V_n)&\lesssim T_1+T_2+n^{-2},\\ T_1&=A\frac{\kappa\log^3n}{\gamma^2n},\\ A&=B_\alpha^2(1+B_\theta L_\phi)^2L_h^2,\\ T_2&=\frac{\log(\log(1+B_h/\gamma)/\delta)}{n}.\end{aligned}$$ where $$\begin{aligned}\kappa&=K_1+K_2,\\ K_1&=\frac{A}{\gamma^2}\log n,\\ K_2&=B_\theta^2(B_S+1)^2 C^2p,\\ C&=L_\phi+B_\theta L_{\phi^\prime}.\end{aligned}$$

### Where the assumptions enter {#reasoning}

Approximate both functions and derivatives with a finite feature dictionary chosen independently of the training trajectories. Control approximation and its failure event, then apply the fixed-class margin argument. Value-only approximation is insufficient. The branch is an alternative to the finite-parametric theorem, not another prerequisite for it.

A cosine feature has bounded value and bounded Lipschitz derivative when frequencies are bounded. Allowing arbitrarily large frequencies violates the support premise and can make derivative approximation fail even when values look accurate.

### Assumptions and domain {#assumptions}

Assumption 4.1 and feasibility over (4.5); $|\phi|\le1$, differentiable Lipschitz feature with Lipschitz derivative; bounded parameter support $B_\theta$, bounded coefficient-density norm $B_\alpha$ and independent trajectory initial states. This is not an unrestricted RKHS.

### Where it is used {#uses}

[[learning-certificates]], [[boffi-thm-5-1]].

## Card

### Statement {#statement}

For the bounded-density feature class (4.5), with probability $1-\delta$, $$\begin{aligned}\operatorname{err}(\widehat V_n)&\lesssim T_1+T_2+n^{-2},\\ T_1&=A\frac{\kappa\log^3n}{\gamma^2n},\\ A&=B_\alpha^2(1+B_\theta L_\phi)^2L_h^2,\\ T_2&=\frac{\log(\log(1+B_h/\gamma)/\delta)}{n}.\end{aligned}$$ where $$\begin{aligned}\kappa&=K_1+K_2,\\ K_1&=\frac{A}{\gamma^2}\log n,\\ K_2&=B_\theta^2(B_S+1)^2 C^2p,\\ C&=L_\phi+B_\theta L_{\phi^\prime}.\end{aligned}$$

### Intuition and example {#intuition}

Approximate both functions and derivatives with a finite feature dictionary chosen independently of the training trajectories. Control approximation and its failure event, then apply the fixed-class margin argument. Value-only approximation is insufficient. The branch is an alternative to the finite-parametric theorem, not another prerequisite for it.

A cosine feature has bounded value and bounded Lipschitz derivative when frequencies are bounded. Allowing arbitrarily large frequencies violates the support premise and can make derivative approximation fail even when values look accurate.

### Assumptions and domain {#assumptions}

Assumption 4.1 and feasibility over (4.5); $|\phi|\le1$, differentiable Lipschitz feature with Lipschitz derivative; bounded parameter support $B_\theta$, bounded coefficient-density norm $B_\alpha$ and independent trajectory initial states. This is not an unrestricted RKHS.

### Proof sketch {#proof}

Approximate both functions and derivatives with a finite feature dictionary chosen independently of the training trajectories. Control approximation and its failure event, then apply the fixed-class margin argument. Value-only approximation is insufficient. The branch is an alternative to the finite-parametric theorem, not another prerequisite for it. Source status: located. The proof route is identified; a separate independent proof audit has not been completed.

### Where it is used {#uses}

[[learning-certificates]], [[boffi-thm-5-1]].
