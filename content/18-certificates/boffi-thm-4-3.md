+++
summary = "Structured matrix entropy improves the leading dimension dependence beyond a naive parameter count."
prereqs = ["boffi-lemma-4-1", "dual-sudakov", "covering-properties"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 4.3, equations (4.3)–(4.4), p.7; Appendix B.2, p.19", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### Statement {#statement}

For $V_Q(x)=m(x)^TQm(x)$, $Q=Q^T\succeq0$, $\|Q\|_F\le B_Q$, $m(x)\in\mathbb R^d$, a feasible margin solution satisfies $$\begin{aligned}\operatorname{err}(\widehat V_n)&\lesssim A\frac{d\log^2d\log^3n}{\gamma^2n}+B_n,\\ A&=B_Q^2(B_m^2+B_{Dm}B_m)^2L_h^2,\\ B_n&=\frac{\log(\log(B_h/\gamma)/\delta)}{n}.\end{aligned}$$ This uses the paper’s asymptotic notation and probability $1-\delta$.

### Where the assumptions enter {#reasoning}

Counting symmetric entries gives $k=d(d+1)/2$. Dual Sudakov and structured entropy improve leading dimension dependence to approximately d. The matrix still has all its entries; the image class is bounded more carefully in its joint value-and-derivative norm. This is a sharper alternative to Theorem 4.2 for the stated class, not a generic fact about every matrix parameterization.

With ten monomials a symmetric Gram matrix has 55 free entries. Parameter counting gives that dimension, whereas the structured theorem has leading monomial dimension 10, together with its log factors and norm constants.

### Assumptions and domain {#assumptions}

Assumption 4.1, all margin-framework conditions and feasibility; $B_m=\sup_S\|m\|$, $B_{Dm}=\sup_S\|Dm\|$ are finite. A bounded Frobenius radius is part of the class. Lab fitting without an enforced radius does not automatically satisfy this premise. Small-dimension logarithms are interpreted through the source’s universal constants.

### Where it is used {#uses}

[[certificates-in-practice]], [[boffi-thm-5-1]].

## Card

### Statement {#statement}

For $V_Q(x)=m(x)^TQm(x)$, $Q=Q^T\succeq0$, $\|Q\|_F\le B_Q$, $m(x)\in\mathbb R^d$, a feasible margin solution satisfies $$\begin{aligned}\operatorname{err}(\widehat V_n)&\lesssim A\frac{d\log^2d\log^3n}{\gamma^2n}+B_n,\\ A&=B_Q^2(B_m^2+B_{Dm}B_m)^2L_h^2,\\ B_n&=\frac{\log(\log(B_h/\gamma)/\delta)}{n}.\end{aligned}$$ This uses the paper’s asymptotic notation and probability $1-\delta$.

### Intuition and example {#intuition}

Counting symmetric entries gives $k=d(d+1)/2$. Dual Sudakov and structured entropy improve leading dimension dependence to approximately d. The matrix still has all its entries; the image class is bounded more carefully in its joint value-and-derivative norm. This is a sharper alternative to Theorem 4.2 for the stated class, not a generic fact about every matrix parameterization.

With ten monomials a symmetric Gram matrix has 55 free entries. Parameter counting gives that dimension, whereas the structured theorem has leading monomial dimension 10, together with its log factors and norm constants.

### Assumptions and domain {#assumptions}

Assumption 4.1, all margin-framework conditions and feasibility; $B_m=\sup_S\|m\|$, $B_{Dm}=\sup_S\|Dm\|$ are finite. A bounded Frobenius radius is part of the class. Lab fitting without an enforced radius does not automatically satisfy this premise. Small-dimension logarithms are interpreted through the source’s universal constants.

### Proof sketch {#proof}

Counting symmetric entries gives $k=d(d+1)/2$. Dual Sudakov and structured entropy improve leading dimension dependence to approximately d. The matrix still has all its entries; the image class is bounded more carefully in its joint value-and-derivative norm. This is a sharper alternative to Theorem 4.2 for the stated class, not a generic fact about every matrix parameterization. Source status: located. The proof route is identified; a separate independent proof audit has not been completed.

### Where it is used {#uses}

[[certificates-in-practice]], [[boffi-thm-5-1]].
