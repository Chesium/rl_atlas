+++
summary = "Lipschitz maps and product covers transfer entropy bounds, provided the norm is the right one."
prereqs = ["covering-dudley"]
time = "statistical"
sources = [{ text = "Shalev-Shwartz and Ben-David, Understanding Machine Learning", kind = "textbook", locator = "2014, Chapter 27", review = "located", url = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/understanding-machine-learning-theory-algorithms.pdf" }]
+++

## Textbook

### The idea {#statement}

A Lipschitz image maps an epsilon/L cover to an epsilon cover. Product covers have at most the product of component cover sizes.

### The calculation {#reasoning}

Volume packing gives polynomial covering counts in finite dimensions, with logarithmic entropy proportional to dimension. Covering a subset cannot increase its external covering number. Operator and Frobenius norms are not interchangeable for free. The certificate route covers joint values and derivatives. Redundant parameter coordinates may yield a loose ambient-dimension bound; structured entropy can improve it.

### Assumptions and domain {#assumptions}

Name the norm, radius and center convention. Data-dependent covers cannot be treated as a fixed hypothesis class without another argument.

### Where it is used {#uses}

[[dual-sudakov]], [[boffi-thm-4-3]].

## Card

### The idea {#idea}

A Lipschitz image maps an epsilon/L cover to an epsilon cover. Product covers have at most the product of component cover sizes.

### Intuition and example {#intuition}

Volume packing gives polynomial covering counts in finite dimensions, with logarithmic entropy proportional to dimension. Covering a subset cannot increase its external covering number. Operator and Frobenius norms are not interchangeable for free. The certificate route covers joint values and derivatives. Redundant parameter coordinates may yield a loose ambient-dimension bound; structured entropy can improve it.

### Assumptions and domain {#assumptions}

Name the norm, radius and center convention. Data-dependent covers cannot be treated as a fixed hypothesis class without another argument.

### Where it is used {#uses}

[[dual-sudakov]], [[boffi-thm-4-3]].
