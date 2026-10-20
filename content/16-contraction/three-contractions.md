+++
summary = "Bellman operators, physical flows and Rademacher composition use the same word for three different arguments."
prereqs = ["contraction-metrics", "bellman", "rademacher-properties"]
time = "both"
sources = [{ text = "Lohmiller and Slotine, On Contraction Analysis for Non-linear Systems", kind = "paper", locator = "Automatica 34(6), 1998, §§2–3; bridge between definitions", review = "located", url = "https://doi.org/10.1016/S0005-1098(98)00019-3" }]
+++

## Textbook

### The idea {#statement}

An RL proof, a control proof, and a learning-theory proof may all use the word *contraction*. Before borrowing a conclusion, identify what the inequality compares. Are its objects value functions, physical states, or sets of sampled predictions? Only the first two below describe repeatedly shrinking distances under a map.

This bridge recalls [[bellman]], [[contraction-metrics]], and [[rademacher-properties]]. The statistical contraction lemma is an invoked result here, with its convention stated locally; its general proof belongs to the learning-theory route. None of the three inequalities proves either of the other two.

### The calculation {#reasoning}

**Bellman contraction acts on value functions.** For a finite discounted Markov decision process, let $\mathcal S$ be the finite state set, $P(s'\mid s,a)$ the transition probabilities, $r(s,a)$ bounded expected rewards, and $0\le\gamma<1$ the discount. A value candidate $v$ is a vector in $\mathbb R^{|\mathcal S|}$; its sup norm is $\|v\|_\infty=\max_s|v(s)|$. The optimal Bellman operator is

$$\begin{aligned}
(Tv)(s)&=\max_a Q_v(s,a),\\
Q_v(s,a)&=r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)v(s').
\end{aligned}$$

The elementary inequality $|\max_a b_a-\max_a c_a|\le\max_a|b_a-c_a|$ follows by bounding each $b_a$ by $c_a+\max|b-c|$, then reversing the roles. Rewards cancel in $Q_v-Q_w$, and probabilities are nonnegative and sum to one, so

$$\begin{aligned}
|(Tv)(s)-(Tw)(s)|
&\le\gamma\max_a\sum_{s'}P(s'\mid s,a)|v(s')-w(s')|\\
&\le\gamma\|v-w\|_\infty.
\end{aligned}$$

Taking the maximum over $s$ gives $\|Tv-Tw\|_\infty\le\gamma\|v-w\|_\infty$. Applying it $k$ times gives $\|T^kv-T^kw\|_\infty\le\gamma^k\|v-w\|_\infty$. Here $k$ counts **Bellman updates**, not seconds or physical state transitions. A fixed-policy operator has the same bound with the action average in place of the maximum. The discounted assumption is load-bearing: at $\gamma=1$ the calculation yields only a nonexpansion, not a strict contraction.

**Flow contraction acts on physical states.** Let $\phi_t:S\to S$ be the flow of $\dot x=f(x)$ on a forward-invariant region $S\subseteq\mathbb R^p$, and $d_M$ the distance obtained by taking the infimum of path lengths measured in a positive matrix metric $M$. The product rule and path transport in [[contraction-metrics]] prove

$$\begin{aligned}
J^TM+MJ+\dot M&\preceq-2\alpha M\\
&\Longrightarrow\\
d_M(\phi_t(\xi),\phi_t(\zeta))
&\le e^{-\alpha t}d_M(\xi,\zeta).
\end{aligned}$$

Here $J=Df$, $\alpha>0$ is a physical norm rate, and complete solutions, admissible paths, and a uniform matrix inequality are assumptions. At a fixed elapsed time $h>0$, the map $\phi_h$ is a contraction of state distance with factor $e^{-\alpha h}<1$. The differential energy rate $2\alpha$ is twice the distance rate. Changing the metric changes the distance being compared; it does not change the flow.

**Rademacher contraction acts on sampled function classes.** Fix a sample $Z=(z_1,\ldots,z_n)$ of $n$ examples, and a real-valued class $\mathcal F$. Its vectors of sampled values form a set

$$\mathcal A=\{(f(z_1),\ldots,f(z_n)):f\in\mathcal F\}\subseteq\mathbb R^n.$$

Draw independent random signs $\sigma_i\in\{-1,+1\}$, equally likely. Define the *signed*, no-absolute-value empirical complexity by

$$\widehat{\mathfrak R}_Z(\mathcal F)
=\mathbb E_\sigma\sup_{f\in\mathcal F}
\frac1n\sum_{i=1}^n\sigma_i f(z_i).$$

The sample stays fixed, the supremum chooses a function after seeing the signs, and only then is the result averaged over signs. This is a measure of how much a class can fit random labels, recalled from [[rademacher-complexity]]. Assume the displayed suprema and expectations are finite. For fixed scalar maps $\psi_i:\mathbb R\to\mathbb R$ satisfying $|\psi_i(a)-\psi_i(b)|\le L_\psi|a-b|$ for all $a,b$, define the transformed value set

$$\psi(\mathcal A)=\{(\psi_1(a_1),\ldots,\psi_n(a_n)):a\in\mathcal A\}.$$

The scalar contraction lemma (Shalev-Shwartz and Ben-David, 2014, Lemma 26.9, pp.331–332) says

$$\mathfrak R(\psi(\mathcal A))\le L_\psi\mathfrak R(\mathcal A),$$

where $\mathfrak R$ uses the same normalized signed definition on a set of vectors. It does not require $L_\psi<1$. It bounds a change in complexity after composition; it does not assert convergence of an iterative algorithm.

For this signed convention, fixed offsets $\psi_i(0)$ do not change complexity: their sign-weighted sum is independent of the supremum and has mean zero. The **absolute-value** convention used by Boffi is different; an offset can contribute there, and the lemma must be restated with its corresponding hypotheses and constants. A scalar lemma also does not automatically control vector-valued composition. This bridge invokes the scalar theorem; its general proof is deferred to Shalev-Shwartz and Ben-David (2014), Lemma 26.9, pp.331–332. [[rademacher-properties]] is the related atlas station, whose fuller Phase 4 development remains pending.

### Calculate the constants before interpreting the word {#examples}

Use the two-point sampled class $\mathcal A=\{(w,w):|w|\le1\}$. For signs $(+,+)$ and $(-,-)$ the best normalized signed sum is $1$; for $(+,-)$ and $(-,+)$ it is $0$. Thus $\mathfrak R(\mathcal A)=(1+1+0+0)/4=1/2$. For $\psi_i(a)=2a$, the Lipschitz constant is $L_\psi=2$ and the four best sums are $2,2,0,0$. The transformed complexity is $1$, exactly $2\mathfrak R(\mathcal A)$. A result named contraction can therefore permit an increase. Replacing $2a$ by $a/2$ gives complexity $1/4$ instead. These calculations check the signed convention and the scale factor; they are not a proof of the general composition lemma.

Now consider a physical plant $x_{j+1}=2x_j$, with a single available action and zero reward. Its states lie in $\mathbb R$ and physical separation is $2^j|x_0-y_0|$, so it is unstable. On the space of **bounded** real value functions on $\mathbb R$, however, its discounted Bellman operator is

$$\begin{aligned}
(Tv)(x)&=\gamma v(2x),\\
\|Tv-Tw\|_\infty&=\gamma\|v-w\|_\infty.
\end{aligned}$$

The equality holds because $x\mapsto2x$ covers all of $\mathbb R$. Bounded functions are mapped to bounded functions; zero reward makes $v=0$ the return value. With $\gamma=0.9$, value-iteration differences shrink by $0.9^k$ while physical differences grow by $2^j$. This example uses the same Bellman argument with a deterministic transition on an infinite state space. It shows exactly why convergence of value computation is not a stability guarantee for the plant.

### Assumptions and domain {#assumptions}

Name the space, its norm or metric, the quantity compared, and the constant. Bellman: bounded values, common dynamics/rewards, discount $\gamma<1$. Flow: a uniform differential metric inequality, complete solutions, and invariant connecting paths. Statistical composition: fixed sampled class, fixed scalar Lipschitz maps, and a stated random-sign convention. The statistical lemma compares expectations of suprema; it supplies no physical Lyapunov function and does not make an RL iteration a physical trajectory.

### Identify the missing premise {#questions}

::: question
A proof establishes a discounted Bellman contraction with $\gamma=0.95$. Another proves a scalar loss is $3$-Lipschitz. Which says physical trajectory distances shrink? Which contraction factor must be below one?
---
Neither says physical distances shrink. The first compares bounded value functions and needs $\gamma<1$ for a strict Bellman contraction. The second can give a statistical complexity bound with multiplier $3$, once the class and convention are supplied; that multiplier need not be below one. Physical distance shrinkage needs its own flow or discrete-state inequality on a declared region.
:::

::: question
For the two-point class in \ref{examples}, replace each value by $a+7$. Under the signed definition, compute the new complexity. Would the same reasoning justify ignoring the offset inside an absolute value?
---
For each sign vector the best sum gains $7(\sigma_1+\sigma_2)/2$, whose average is zero. The complexity remains $1/2$. An absolute value prevents pulling that additive random term outside the supremum and expectation as a zero mean. For example, a singleton constant-zero class has absolute complexity zero, but a singleton constant-seven class on one point has absolute complexity $7$.
:::

### Where it is used {#uses}

[[boffi-thm-4-4]], [[controller-or-certificate]].

## Card

### The idea {#idea}

Bellman contraction shrinks differences between value functions. Flow contraction shrinks trajectory distances. Rademacher contraction bounds a class after Lipschitz composition.

### Intuition and example {#intuition}

- Bellman on bounded value functions: $\|Tv-Tw\|_\infty\le\gamma\|v-w\|_\infty$, $0\le\gamma<1$.
- Flow on states in an invariant region: $d_M(\phi_t(\xi),\phi_t(\zeta))\le e^{-\alpha t}d_M(\xi,\zeta)$, $\alpha>0$.
- Scalar composition on sampled value sets: $\mathfrak R(\psi(\mathcal A))\le L_\psi\mathfrak R(\mathcal A)$ for the signed convention; $L_\psi$ may exceed one.

The unstable plant $x_{j+1}=2x_j$ with zero reward still has a discounted Bellman contraction on bounded value functions. Statistical composition by $a\mapsto2a$ can double complexity.

### Assumptions and domain {#assumptions}

Specify space, distance, time or update index, and constant. State scalar/vector and signed/absolute convention for statistical composition; offsets differ between conventions. Convergence of an RL value iteration does not certify physical stability.

### Where it is used {#uses}

[[boffi-thm-4-4]], [[controller-or-certificate]].
