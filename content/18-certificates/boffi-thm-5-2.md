+++
summary = "True contraction and a small tangent-bundle violation measure give a conditional learned-metric decrease region."
prereqs = ["contraction-metrics", "boffi-thm-5-1"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 5.2, p.9; Appendix C.2, pp.26–29", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### Statement {#statement}

Write $g(x,\delta x)=(f(x),Df(x)\delta x)$, $q=\nabla V^Tg$, and let $\theta_t(\delta\xi;\xi)$ be the differential displacement propagated from initial pair $(\xi,\delta\xi)$. The gradient bounds are taken on the prolonged domain reached from $X\times\mathbb S^{p-1}$. Assume true dynamics contracts in $M_\star$, $mI\preceq M_\star\preceq LI$, with rate $\lambda>0$. Let $V(x,\delta x)=\delta x^TM(x)\delta x$, $M\succeq\mu I$, and the uniform measure of violating prolonged trajectories on $X\times\mathbb S^{p-1}$ be at most epsilon. Define $r=\sup\{s>0:s^p\zeta_p(s)\le\epsilon\operatorname{vol}(X)/\operatorname{vol}(B_2^p(1))\}$, where $\zeta_p$ is spherical-cap measure. Set $$r_b=\frac{rB_H(B_{\nabla q}+\lambda B_{\nabla V})(L/m)^{3/2}}{\eta\lambda\mu}.$$ The learned differential certificate satisfies $q\le-(1-\eta)\lambda V$ on $\bigcup_t\phi_t(\widetilde X_t(r_b))$, where $\widetilde X_t(r_b)=\{\xi\in\widetilde X:\inf_{\delta\xi\in\mathbb S^{p-1}}\|\theta_t(\delta\xi;\xi)\|\ge r_b\}$.

### Where the assumptions enter {#reasoning}

The proof transfers good nearby tangent-bundle points using known true contraction. A Hessian bound controls changes in linearized dynamics with base state. Transported directions that become too small are excluded. Thus the theorem gives a conditional region; it does not discover global contraction from data alone. The source mixes energy and length language; here $q\le-(1-\eta)\lambda V$ is an energy decay rate, hence a norm rate $(1-\eta)\lambda/2$. Elsewhere the atlas writes $-2\alpha M$ for norm rate alpha.

For a linear contracting system the Hessian bound is zero, so the Hessian-driven exclusion radius vanishes. Nonlinear systems generally have a positive Hessian bound and retain a time-dependent exclusion of very short transported directions.

### Assumptions and domain {#assumptions}

Full-dimensional X, state dimension at least two, common reachable S, smooth f with finite $B_H=\sup_S\|D^2f\|$, known uniformly bounded true contraction metric, smooth positive learned metric, finite prolonged gradient bounds, uniform state-direction distribution and $0<\eta<1$. The eroded set and time-dependent restriction must be retained. Use v2’s corrected domains and Appendix C.2’s negative-decrease convention.

### Where it is used {#uses}

[[vdp-certificates]].

## Card

### Statement {#statement}

Write $g(x,\delta x)=(f(x),Df(x)\delta x)$, $q=\nabla V^Tg$, and let $\theta_t(\delta\xi;\xi)$ be the differential displacement propagated from initial pair $(\xi,\delta\xi)$. The gradient bounds are taken on the prolonged domain reached from $X\times\mathbb S^{p-1}$. Assume true dynamics contracts in $M_\star$, $mI\preceq M_\star\preceq LI$, with rate $\lambda>0$. Let $V(x,\delta x)=\delta x^TM(x)\delta x$, $M\succeq\mu I$, and the uniform measure of violating prolonged trajectories on $X\times\mathbb S^{p-1}$ be at most epsilon. Define $r=\sup\{s>0:s^p\zeta_p(s)\le\epsilon\operatorname{vol}(X)/\operatorname{vol}(B_2^p(1))\}$, where $\zeta_p$ is spherical-cap measure. Set $$r_b=\frac{rB_H(B_{\nabla q}+\lambda B_{\nabla V})(L/m)^{3/2}}{\eta\lambda\mu}.$$ The learned differential certificate satisfies $q\le-(1-\eta)\lambda V$ on $\bigcup_t\phi_t(\widetilde X_t(r_b))$, where $\widetilde X_t(r_b)=\{\xi\in\widetilde X:\inf_{\delta\xi\in\mathbb S^{p-1}}\|\theta_t(\delta\xi;\xi)\|\ge r_b\}$.

### Intuition and example {#intuition}

The proof transfers good nearby tangent-bundle points using known true contraction. A Hessian bound controls changes in linearized dynamics with base state. Transported directions that become too small are excluded. Thus the theorem gives a conditional region; it does not discover global contraction from data alone. The source mixes energy and length language; here $q\le-(1-\eta)\lambda V$ is an energy decay rate, hence a norm rate $(1-\eta)\lambda/2$. Elsewhere the atlas writes $-2\alpha M$ for norm rate alpha.

For a linear contracting system the Hessian bound is zero, so the Hessian-driven exclusion radius vanishes. Nonlinear systems generally have a positive Hessian bound and retain a time-dependent exclusion of very short transported directions.

### Assumptions and domain {#assumptions}

Full-dimensional X, state dimension at least two, common reachable S, smooth f with finite $B_H=\sup_S\|D^2f\|$, known uniformly bounded true contraction metric, smooth positive learned metric, finite prolonged gradient bounds, uniform state-direction distribution and $0<\eta<1$. The eroded set and time-dependent restriction must be retained. Use v2’s corrected domains and Appendix C.2’s negative-decrease convention.

### Proof sketch {#proof}

The proof transfers good nearby tangent-bundle points using known true contraction. A Hessian bound controls changes in linearized dynamics with base state. Transported directions that become too small are excluded. Thus the theorem gives a conditional region; it does not discover global contraction from data alone. The source mixes energy and length language; here $q\le-(1-\eta)\lambda V$ is an energy decay rate, hence a norm rate $(1-\eta)\lambda/2$. Elsewhere the atlas writes $-2\alpha M$ for norm rate alpha. Source status: located. The proof route is identified; a separate independent proof audit has not been completed.

### Where it is used {#uses}

[[vdp-certificates]].
