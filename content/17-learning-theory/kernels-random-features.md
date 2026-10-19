+++
summary = "Finite random features approximate a kernel class; certificates require derivative approximation too."
prereqs = ["rademacher-properties", "covering-properties"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 16; Boffi v2 §4.2 and Appendix B.3", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

A kernel $k(x,y)=\mathbb E_\theta[\phi(x;\theta)\phi(y;\theta)]$ admits finite approximations by sampling feature parameters.

### The calculation {#reasoning}

The paper studies $V_\alpha(x)=\int\alpha(\theta)\phi(x;\theta)d\theta$ with $\sup_\theta|\alpha(\theta)/\nu(\theta)|\le B_\alpha$. This is a bounded-density subset of an RKHS, not its unrestricted norm ball. Joint value-and-gradient approximation needs regularity of feature derivatives. The proof fixes a random feature dictionary independently of training trajectories: choosing it after fitting would invalidate the direct margin-lemma application.

### Assumptions and domain {#assumptions}

Bounded feature parameters, bounded Lipschitz features, a Lipschitz derivative and the coefficient-density constraint.

### Where it is used {#uses}

[[boffi-thm-4-4]].

## Card

### The idea {#idea}

A kernel $k(x,y)=\mathbb E_\theta[\phi(x;\theta)\phi(y;\theta)]$ admits finite approximations by sampling feature parameters.

### Intuition and example {#intuition}

The paper studies $V_\alpha(x)=\int\alpha(\theta)\phi(x;\theta)d\theta$ with $\sup_\theta|\alpha(\theta)/\nu(\theta)|\le B_\alpha$. This is a bounded-density subset of an RKHS, not its unrestricted norm ball. Joint value-and-gradient approximation needs regularity of feature derivatives. The proof fixes a random feature dictionary independently of training trajectories: choosing it after fitting would invalidate the direct margin-lemma application.

### Assumptions and domain {#assumptions}

Bounded feature parameters, bounded Lipschitz features, a Lipschitz derivative and the coefficient-density constraint.

### Where it is used {#uses}

[[boffi-thm-4-4]].
