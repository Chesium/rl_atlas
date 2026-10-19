+++
summary = "Certificate complexity must control both function values and derivatives on the reachable region."
prereqs = ["learning-certificates"]
time = "continuous"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §4, Assumptions 4.1–4.2, p.6", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The idea {#statement}

The norm controls values and derivatives together: $\|V\|_{\mathcal V}=\sup_{x\in S}\|(V(x),DV(x))\|$.

### The calculation {#reasoning}

Value approximation alone does not control derivatives: $V_m(x)=\sin(mx)/m$ tends uniformly to zero while its derivative has magnitude one. A Lie derivative cannot be controlled by value-only approximation. For $V_\theta=g(x,\theta)$ a bounded parameter ball and bounds on $D_\theta g$ and $D_\theta D_xg$ give joint Lipschitz control. These bounds hold over the entire common compact reachable set, not just training points.

### Assumptions and domain {#assumptions}

The residual is Lipschitz in the joint object, with finite magnitude bound $B_h$ and Lipschitz constant $L_h$.

### Where it is used {#uses}

[[boffi-lemma-4-1]], [[boffi-thm-4-2]].

## Card

### The idea {#idea}

The norm controls values and derivatives together: $\|V\|_{\mathcal V}=\sup_{x\in S}\|(V(x),DV(x))\|$.

### Intuition and example {#intuition}

Value approximation alone does not control derivatives: $V_m(x)=\sin(mx)/m$ tends uniformly to zero while its derivative has magnitude one. A Lie derivative cannot be controlled by value-only approximation. For $V_\theta=g(x,\theta)$ a bounded parameter ball and bounds on $D_\theta g$ and $D_\theta D_xg$ give joint Lipschitz control. These bounds hold over the entire common compact reachable set, not just training points.

### Assumptions and domain {#assumptions}

The residual is Lipschitz in the joint object, with finite magnitude bound $B_h$ and Lipschitz constant $L_h$.

### Where it is used {#uses}

[[boffi-lemma-4-1]], [[boffi-thm-4-2]].
