+++
summary = "A Gaussian norm estimate can sharpen matrix-class entropy beyond counting every free entry."
prereqs = ["covering-properties"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, Appendix B.2, p.19; cited Vershynin lectures", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The idea {#statement}

Dual Sudakov bounds the entropy of a Euclidean ball under another norm using the expected norm of a Gaussian vector.

### The calculation {#reasoning}

In a common normalization, $\log N(B_2^d,\|\cdot\|,\epsilon)\lesssim(\mathbb E\|g\|/\epsilon)^2$. Matrix parameterizations have a structured induced norm that counts more carefully than treating all entries separately. The paper combines this with diameter/volume estimates inside the entropy integral. This is a side branch for Theorem 4.3, not a prerequisite for Theorem 4.2.

### Assumptions and domain {#assumptions}

A finite-dimensional norm, correct Gaussian normalization and the specific structured norm used in the proof.

### Where it is used {#uses}

[[boffi-thm-4-3]].

## Card

### The idea {#idea}

Dual Sudakov bounds the entropy of a Euclidean ball under another norm using the expected norm of a Gaussian vector.

### Intuition and example {#intuition}

In a common normalization, $\log N(B_2^d,\|\cdot\|,\epsilon)\lesssim(\mathbb E\|g\|/\epsilon)^2$. Matrix parameterizations have a structured induced norm that counts more carefully than treating all entries separately. The paper combines this with diameter/volume estimates inside the entropy integral. This is a side branch for Theorem 4.3, not a prerequisite for Theorem 4.2.

### Assumptions and domain {#assumptions}

A finite-dimensional norm, correct Gaussian normalization and the specific structured norm used in the proof.

### Where it is used {#uses}

[[boffi-thm-4-3]].
