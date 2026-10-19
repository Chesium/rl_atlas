+++
summary = "A linear matrix equation constructs a quadratic certificate for a stable linear system."
prereqs = ["lyapunov-functions"]
time = "both"
sources = [{ text = "Hespanha, Linear Systems Theory", kind = "textbook", locator = "2nd edition, 2018, §§8.2, 8.4–8.6", review = "located", url = "https://press.princeton.edu/books/hardcover/9780691179575/linear-systems-theory" }]
+++

## Textbook

### The idea {#statement}

For a Hurwitz matrix $A$ and $Q\succ0$, $A^TP+PA=-Q$ has a unique $P\succ0$. Then $V=x^TPx$ satisfies $\dot V=-x^TQx$.

### The calculation {#reasoning}

The solution is $P=\int_0^\infty e^{A^Tt}Qe^{At}dt$. Differentiate the integrand and integrate its endpoints to verify the equation. Positivity follows because a nonzero initial vector has positive integrand near time zero. Conversely, a positive solution implies all modes decay. For $A=\operatorname{diag}(-1,-2)$ and $Q=I$, $P=\operatorname{diag}(1/2,1/4)$. A nonnormal example needs off-diagonal terms; the Lab solves all three independent entries and checks the residual.

### Assumptions and domain {#assumptions}

Continuous time: eigenvalues have negative real parts. Discrete time: $A^TPA-P=-Q$ and eigenvalues have modulus below one.

### See the trajectories {#experiment}

{{flow linear}}

[Open the flows and certificates Lab](#/flows). The pictures and holdout rates are numerical evidence.

### Where it is used {#uses}

[[contraction-metrics]], [[certificate-classes]].

## Card

### The idea {#idea}

For a Hurwitz matrix $A$ and $Q\succ0$, $A^TP+PA=-Q$ has a unique $P\succ0$. Then $V=x^TPx$ satisfies $\dot V=-x^TQx$.

### Intuition and example {#intuition}

The solution is $P=\int_0^\infty e^{A^Tt}Qe^{At}dt$. Differentiate the integrand and integrate its endpoints to verify the equation. Positivity follows because a nonzero initial vector has positive integrand near time zero. Conversely, a positive solution implies all modes decay. For $A=\operatorname{diag}(-1,-2)$ and $Q=I$, $P=\operatorname{diag}(1/2,1/4)$. A nonnormal example needs off-diagonal terms; the Lab solves all three independent entries and checks the residual.

### Assumptions and domain {#assumptions}

Continuous time: eigenvalues have negative real parts. Discrete time: $A^TPA-P=-Q$ and eigenvalues have modulus below one.

### Where it is used {#uses}

[[contraction-metrics]], [[certificate-classes]].
