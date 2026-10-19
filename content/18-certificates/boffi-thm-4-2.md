+++
summary = "A smooth k-parameter class yields an approximately k/n trajectory-violation bound, with margin, norm and logarithmic factors."
prereqs = ["boffi-lemma-4-1", "covering-dudley"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 4.2, equation (4.2), p.7; Appendix B.1, p.19", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### Statement {#statement}

Let $V_\theta=g(x,\theta)$, $\theta\in\mathbb R^k$, $\|\theta\|\le B_\theta$, with g twice continuously differentiable. With probability at least $1-\delta$, every feasible margin solution satisfies $$\begin{aligned}\operatorname{err}(\widehat V_n)&\lesssim A\frac{k\log^3n}{\gamma^2n}+B_n,\\ A&=B_\theta^2(L_g+L_{\nabla g})^2L_h^2,\\ B_n&=\frac{\log(\log(B_h/\gamma)/\delta)}{n}.\end{aligned}$$ The hidden constant is universal; this is the source’s asymptotic form.

### Where the assumptions enter {#reasoning}

The joint map from parameters to certificate values and derivatives is Lipschitz with constant $L_g+L_{\nabla g}$. Cover the parameter ball, transfer the cover, integrate entropy and invoke Lemma 4.1. Complexity scales as $\sqrt{k/n}$; the lemma squares it. A quadratic has three parameters in two state dimensions, but adding features increases the statistical cost.

For example $V_\theta(x)=\theta_1x_1^2+2\theta_2x_1x_2+\theta_3x_2^2$ has k=3. The smoothness constants still depend on the reachable-state radius and the parameter bound; three parameters alone do not determine a numerical sample size.

### Assumptions and domain {#assumptions}

Assumption 4.1, independent initial states, a bounded parameter ball and a C2 parameterization on the common compact reachable set; finite $L_g=\sup\|D_\theta g\|$ and $L_{\nabla g}=\sup\|D_\theta D_xg\|$. Problem (3.2) must be feasible. The result does not assert that a numerical optimizer finds that solution.

### Where it is used {#uses}

[[boffi-thm-5-1]], [[learning-certificates]].

## Card

### Statement {#statement}

Let $V_\theta=g(x,\theta)$, $\theta\in\mathbb R^k$, $\|\theta\|\le B_\theta$, with g twice continuously differentiable. With probability at least $1-\delta$, every feasible margin solution satisfies $$\begin{aligned}\operatorname{err}(\widehat V_n)&\lesssim A\frac{k\log^3n}{\gamma^2n}+B_n,\\ A&=B_\theta^2(L_g+L_{\nabla g})^2L_h^2,\\ B_n&=\frac{\log(\log(B_h/\gamma)/\delta)}{n}.\end{aligned}$$ The hidden constant is universal; this is the source’s asymptotic form.

### Intuition and example {#intuition}

The joint map from parameters to certificate values and derivatives is Lipschitz with constant $L_g+L_{\nabla g}$. Cover the parameter ball, transfer the cover, integrate entropy and invoke Lemma 4.1. Complexity scales as $\sqrt{k/n}$; the lemma squares it. A quadratic has three parameters in two state dimensions, but adding features increases the statistical cost.

For example $V_\theta(x)=\theta_1x_1^2+2\theta_2x_1x_2+\theta_3x_2^2$ has k=3. The smoothness constants still depend on the reachable-state radius and the parameter bound; three parameters alone do not determine a numerical sample size.

### Assumptions and domain {#assumptions}

Assumption 4.1, independent initial states, a bounded parameter ball and a C2 parameterization on the common compact reachable set; finite $L_g=\sup\|D_\theta g\|$ and $L_{\nabla g}=\sup\|D_\theta D_xg\|$. Problem (3.2) must be feasible. The result does not assert that a numerical optimizer finds that solution.

### Proof sketch {#proof}

The joint map from parameters to certificate values and derivatives is Lipschitz with constant $L_g+L_{\nabla g}$. Cover the parameter ball, transfer the cover, integrate entropy and invoke Lemma 4.1. Complexity scales as $\sqrt{k/n}$; the lemma squares it. A quadratic has three parameters in two state dimensions, but adding features increases the statistical cost. Source status: located. The proof route is identified; a separate independent proof audit has not been completed.

### Where it is used {#uses}

[[boffi-thm-5-1]], [[learning-certificates]].
