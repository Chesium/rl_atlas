+++
summary = "Small violation volume yields decrease on an eroded reachable domain outside an explicit equilibrium neighborhood."
prereqs = ["boffi-thm-4-2", "incremental-stability", "comparison-functions", "lyapunov-functions"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Theorem 5.1, equations (5.1)–(5.3), p.8; Appendix C.1, pp.25–26", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### Statement {#statement}

Write $q=\nabla V^Tf$. Suppose the uniform initial-state measure of trajectories failing $q\le-\lambda V$ is at most epsilon. Put $r=(\epsilon\operatorname{vol}(X)/\operatorname{vol}(B_2^p(1)))^{1/p}$ and $\widetilde X=\{\xi:B(\xi,r)\subset X\}$. On $\widetilde S=\bigcup_t\phi_t(\widetilde X)$, outside the ball of radius $$r_b=\sqrt{\frac{\beta(r,0)}{\eta\mu}(B_{\nabla V}+\lambda^{-1}B_{\nabla q})},$$ one has $q\le-(1-\eta)\lambda V$ for $0<\eta<1$. Also $V(\phi_t(\xi))\le u_\xi(t)$ where $\dot u=-\lambda u+(B_{\nabla q}+\lambda B_{\nabla V})\beta(r,t)$ and $u(0)=V(\xi)$.

### Where the assumptions enter {#reasoning}

A small bad volume forces a good point within approximately r of each interior initial state. Incremental stability transports proximity along the flow. Lipschitz bounds transfer the good decrease inequality with additive error; quadratic positivity absorbs that error outside a ball. Scalar comparison integrates the same error. The eroded initial set and excluded ball are essential, so small probability alone is not a certificate everywhere.

For a two-dimensional unit initial ball with $\beta(r,0)\le Cr$, the excluded radius scales like $\epsilon^{1/4}$. Thus a tenfold statistical improvement produces a much smaller geometric improvement; dimension matters.

### Assumptions and domain {#assumptions}

Assumption 5.1 with a specified KL bound; full-dimensional compact X and uniform initial measure; C2 positive definite V with $V\ge\mu\|x\|^2$; finite gradient bounds over reachable S; positive lambda and $0<\eta<1$. The v2 displayed violation-set sign is interpreted using the negative-decrease condition in Appendix C.1. A statistical bound for a nonuniform distribution cannot simply be substituted for the uniform volume premise.

### Where it is used {#uses}

[[boffi-thm-5-2]], [[vdp-certificates]].

## Card

### Statement {#statement}

Write $q=\nabla V^Tf$. Suppose the uniform initial-state measure of trajectories failing $q\le-\lambda V$ is at most epsilon. Put $r=(\epsilon\operatorname{vol}(X)/\operatorname{vol}(B_2^p(1)))^{1/p}$ and $\widetilde X=\{\xi:B(\xi,r)\subset X\}$. On $\widetilde S=\bigcup_t\phi_t(\widetilde X)$, outside the ball of radius $$r_b=\sqrt{\frac{\beta(r,0)}{\eta\mu}(B_{\nabla V}+\lambda^{-1}B_{\nabla q})},$$ one has $q\le-(1-\eta)\lambda V$ for $0<\eta<1$. Also $V(\phi_t(\xi))\le u_\xi(t)$ where $\dot u=-\lambda u+(B_{\nabla q}+\lambda B_{\nabla V})\beta(r,t)$ and $u(0)=V(\xi)$.

### Intuition and example {#intuition}

A small bad volume forces a good point within approximately r of each interior initial state. Incremental stability transports proximity along the flow. Lipschitz bounds transfer the good decrease inequality with additive error; quadratic positivity absorbs that error outside a ball. Scalar comparison integrates the same error. The eroded initial set and excluded ball are essential, so small probability alone is not a certificate everywhere.

For a two-dimensional unit initial ball with $\beta(r,0)\le Cr$, the excluded radius scales like $\epsilon^{1/4}$. Thus a tenfold statistical improvement produces a much smaller geometric improvement; dimension matters.

### Assumptions and domain {#assumptions}

Assumption 5.1 with a specified KL bound; full-dimensional compact X and uniform initial measure; C2 positive definite V with $V\ge\mu\|x\|^2$; finite gradient bounds over reachable S; positive lambda and $0<\eta<1$. The v2 displayed violation-set sign is interpreted using the negative-decrease condition in Appendix C.1. A statistical bound for a nonuniform distribution cannot simply be substituted for the uniform volume premise.

### Proof sketch {#proof}

A small bad volume forces a good point within approximately r of each interior initial state. Incremental stability transports proximity along the flow. Lipschitz bounds transfer the good decrease inequality with additive error; quadratic positivity absorbs that error outside a ball. Scalar comparison integrates the same error. The eroded initial set and excluded ball are essential, so small probability alone is not a certificate everywhere. Source status: located. The proof route is identified; a separate independent proof audit has not been completed.

### Where it is used {#uses}

[[boffi-thm-5-2]], [[vdp-certificates]].
