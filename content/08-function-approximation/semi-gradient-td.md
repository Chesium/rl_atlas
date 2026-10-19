+++
summary = "TD(0) with weights: after every step, move the weights so the estimate of the state just left gets closer to the reward plus the discounted estimate of the next state. That target is itself computed from the weights, and the update pretends it is not: half a gradient, hence the name. It learns online and with low variance, and with linear features and on-policy data it converges, near the best fit."
change = "Replace the return by a bootstrapped target, R + γ v̂(S′, w), and update after every step instead of after the episode. The target depends on the weights, but the update treats it as a fixed number: a semi-gradient."
prereqs = ["gradient-mc", "td0", "value-error"]
lab = "walk-aggregation"
sources = [
  { text = "Sutton & Barto (2018), Reinforcement Learning: An Introduction, 2nd ed., §9.3–9.4, §9.8 and §12.2", url = "http://incompleteideas.net/book/the-book-2nd.html" },
  { text = "Sutton (1988), Learning to predict by the methods of temporal differences, Machine Learning 3", url = "https://doi.org/10.1007/BF00115009" },
  { text = "Tsitsiklis & Van Roy (1997), An analysis of temporal-difference learning with function approximation, IEEE Transactions on Automatic Control 42", url = "https://doi.org/10.1109/9.580874" },
  { text = "Baird (1995), Residual algorithms: reinforcement learning with function approximation, Proceedings of the 12th International Conference on Machine Learning", url = "https://doi.org/10.1016/B978-1-55860-377-6.50013-X" },
  { text = "Bradtke & Barto (1996), Linear least-squares algorithms for temporal difference learning, Machine Learning 22", url = "https://doi.org/10.1007/BF00114723" },
  { text = "Boyan (2002), Technical update: least-squares temporal difference learning, Machine Learning 49", url = "https://doi.org/10.1023/A:1017936530646" },
  { text = "Lagoudakis & Parr (2003), Least-squares policy iteration, Journal of Machine Learning Research 4", url = "https://www.jmlr.org/papers/v4/lagoudakis03a.html" },
]

[story]
scene = "line"
env = "walk-1000"
seed = 3
average = 20
formula = '\step{1}{\rew{R} + \gam\,\val{\hat v(S^\prime, \mathbf w)}} \step{2}{\qquad \mathbf w \leftarrow \mathbf w + \alp\,\big[\rew{R} + \gam\,\val{\hat v(S^\prime, \mathbf w)} - \val{\hat v(S, \mathbf w)}\big]\,\nabla \val{\hat v(S, \mathbf w)}}'

[story.runs]
big = { algorithm = "semi-gradient-td", features = "groups", cells = 10, alpha = 0.05, gamma = 1.0, units = 2000, measures = ["ve"], name = "one-step TD, α = 0.05" }
one = { algorithm = "semi-gradient-td", features = "groups", cells = 10, alpha = 0.005, gamma = 1.0, units = 2000, measures = ["ve"], name = "one-step TD, α = 0.005" }
four = { algorithm = "semi-gradient-td", features = "groups", cells = 10, alpha = 0.002, n = 4, gamma = 1.0, units = 2000, measures = ["ve"], name = "4-step TD, α = 0.002" }
mc = { algorithm = "gradient-mc", features = "groups", cells = 10, alpha = 0.0005, gamma = 1.0, units = 2000, measures = ["ve"], name = "gradient MC, α = 0.0005" }
+++

## Story

::: step {run = "big", at = 0, formula = 1}
**The same walk, the same ten groups**, but the learner no longer waits for the end. After every jump it updates the state it just left, toward a target made of the reward and **its own estimate** of where it landed, as [[td0|TD(0)]] does with a table.
:::

::: step {run = "big", at = 1, formula = 2}
**The first walk**: forty jumps, forty updates. But every estimate is 0 and no jump inside the walk pays anything, so 39 targets are 0 and nothing moves. Only the last jump, out of the right exit, brings a surprise: $\rew{+1}$ against an estimate of 0. One group moves, the last one: the box in the strip under the plot.
:::

::: step {run = "big", at = 10}
After ten walks the news has crept inward from both exits: the outer groups know something, the next ones a little, the middle nothing yet. Each update can only borrow from the estimate of the next state, so information travels one jump per update, and with groups of 100 states, one group at a time.
:::

::: step {run = "one", at = 2000}
With a smaller step and 2000 walks, the staircase has settled, but **flatter than the truth** at the ends: the outer steps stop at about $\pm 0.7$, where their true averages are $\pm 0.83$. Each group bootstraps from neighbors whose estimates are themselves averages, which pulls the extremes toward the middle. This is the TD fixed point, not the best fit ([[value-error]]).
:::

::: step {run = "four", at = 2000}
**Four-step TD** waits four jumps and uses the four rewards before trusting an estimate ([[n-step-td]]): information travels four times as far per update, and the bootstrapped part of the target weighs less. Its staircase reaches $\pm 0.8$.
:::

::: step {run = "four", at = 2000, curves = ["one", "four", "mc"], metric = "ve"}
Averaged over 20 runs: one-step TD is slowest here, four-step TD beats even Monte Carlo by 2000 walks. Bootstrapping a little, but not as little as one step, is the usual sweet spot. [Watch both learn in the Lab](lab:walk-aggregation).
:::

## Textbook

### Bootstrapping with weights {#idea}

[[gradient-mc|Gradient Monte Carlo]] learns from the return, which is only known when the episode ends. [[td0|TD(0)]] showed that one can learn from each step instead, by using the estimate of the next state as a stand-in for everything that follows. With weights, the TD(0) target becomes $\rew{R_{t+1}} + \gam\,\val{\hat v(S_{t+1}, \mathbf w)}$, and the update

$$\mathbf w \leftarrow \mathbf w + \alp\,\big[\,\rew{R_{t+1}} + \gam\,\val{\hat v(S_{t+1}, \mathbf w)} - \val{\hat v(S_t, \mathbf w)}\,\big]\,\nabla \val{\hat v(S_t, \mathbf w)}. \label{eq-update}$$

The bracket is the TD error $\del_t$ ([[td-error]]), computed with the current weights.

The target depends on $\mathbf w$, but the update differentiates only the estimate being corrected, $\hat v(S_t, \mathbf w)$, and treats the target as a fixed number. The full gradient of the squared TD error would also contain $-\gam\,\nabla \val{\hat v(S_{t+1}, \mathbf w)}$, the effect of the weights on the target. Leaving it out makes \ref{eq-update} a **semi-gradient** method. It is a deliberate choice: the left-out term pushes the next state's estimate *toward* the current one, which makes values flow backward and forward in time alike, while the semi-gradient moves only the past toward the future, the direction in which information actually flows. Methods that keep the full gradient exist, the **residual-gradient** algorithms of Baird (1995); they descend a well-defined objective and so converge even off-policy, but they learn much more slowly, and in stochastic worlds they need two independent samples of the next state to be unbiased, which a learner moving through the world rarely has.

### The algorithm {#algorithm}

::: algorithm {#alg-sgtd} Semi-gradient TD(0) for estimating $\val{v_\pi}$
Input: the policy $\pol{\pi}$ to evaluate, a differentiable estimate $\val{\hat v(s, \mathbf w)}$ with $\val{\hat v(\text{terminal}, \cdot)} = 0$, a step size $\alp > 0$
Set the weights $\mathbf w$ (for example, all 0)
Repeat for each episode:
  Start: $S$
  Repeat until $S$ is terminal:
    Choose $A$ from $\pol{\pi}(\cdot \mid S)$; take it, observe $\rew{R}$ and $S'$
    $\mathbf w \leftarrow \mathbf w + \alp\,[\rew{R} + \gam\,\val{\hat v(S', \mathbf w)} - \val{\hat v(S, \mathbf w)}]\,\nabla \val{\hat v(S, \mathbf w)}$
    $S \leftarrow S'$
:::

The cost per step is one evaluation of the estimate at $S'$ and one gradient at $S$: constant, whatever the length of the episode, and the learning happens while acting.

### Where it converges {#fixedpoint}

With linear features and on-policy data, semi-gradient TD(0) converges, but to the **TD fixed point** $\mathbf w_{\text{TD}}$, where the expected TD error, weighted by the features, is zero; not to the minimum of the value error. Its value error there is at most $1/(1-\gamma)$ times the minimum ([[value-error]], Theorem 1). On the 1000-state walk with ten groups the difference is plain to see: Monte Carlo's staircase reaches each group's average true value, TD's is flatter at both ends (the figure in [[value-error]] shows both). With aggregation, a group's TD target averages over the groups it jumps into, whose estimates are averages too, and the outermost groups, which can only borrow from their inner neighbors and the exit, end up short of their true average.

That bias is the price of bootstrapping. The return is the honest target and the TD target a cheaper, less noisy approximation of it; with function approximation the approximation does not wash out, because the estimates it relies on can never all be exact. What TD buys in exchange is the same as in the tabular case: learning during the episode, in tasks that never end, and with much lower variance, which often makes it faster in practice even though its destination is worse.

### Least-squares TD {#lstd}

With linear features, the TD fixed point is the solution of a linear system, $\mathbf A \mathbf w = \mathbf b$, with $\mathbf A = \mathbb E[\mathbf x_t (\mathbf x_t - \gam\,\mathbf x_{t+1})^\top]$ and $\mathbf b = \mathbb E[\rew{R_{t+1}}\,\mathbf x_t]$ ([[value-error]]), where $\mathbf x_t = \mathbf x(S_t)$ and the features of a terminal state are $\mathbf 0$. Semi-gradient TD reaches it by many small steps, each sample used once. **Least-squares TD** (LSTD) instead estimates $\mathbf A$ and $\mathbf b$ from all the transitions seen so far and solves for the fixed point directly:

$$\hat{\mathbf A}_t = \sum_{k=0}^{t-1} \mathbf x_k (\mathbf x_k - \gam\,\mathbf x_{k+1})^\top + \varepsilon \mathbf I, \qquad \hat{\mathbf b}_t = \sum_{k=0}^{t-1} \rew{R_{k+1}}\,\mathbf x_k, \qquad \mathbf w_t = \hat{\mathbf A}_t^{-1}\,\hat{\mathbf b}_t. \label{eq-lstd}$$

The sums estimate $t$ times $\mathbf A$ and $t$ times $\mathbf b$, and the factor cancels in $\mathbf w_t$; the small $\varepsilon \mathbf I$ keeps $\hat{\mathbf A}_t$ invertible from the start. The same equation comes from the batch view: $\mathbf w_t$ is the weight vector for which a sweep of semi-gradient TD updates over the stored transitions, $\sum_k \mathbf x_k\,\big(\rew{R_{k+1}} + \gam\,\mathbf x_{k+1}^\top \mathbf w - \mathbf x_k^\top \mathbf w\big)$, adds up to zero. With the return in place of the TD target, the same condition gives ordinary least squares, the Monte Carlo counterpart ([[gradient-mc]]). LSTD is not a least-squares fit in that plain sense, since its targets move with $\mathbf w$; Bradtke and Barto (1996) derived it as a regression with instrumental variables, and showed that on-policy it converges to the TD fixed point as data accumulates.

Inverting a $d \times d$ matrix costs $O(d^3)$, but $\hat{\mathbf A}_t$ grows by one outer product per step, and the inverse of such a sum can be updated in $O(d^2)$ by the **Sherman–Morrison** formula. After a transition from features $\mathbf x$ to $\mathbf x'$, with $\mathbf v = (\hat{\mathbf A}^{-1})^\top (\mathbf x - \gam\,\mathbf x')$,

$$\hat{\mathbf A}^{-1} \leftarrow \hat{\mathbf A}^{-1} - \frac{(\hat{\mathbf A}^{-1} \mathbf x)\,\mathbf v^\top}{1 + \mathbf v^\top \mathbf x}. \label{eq-sm}$$

::: algorithm {#alg-lstd} LSTD for estimating $\val{v_\pi}$ ($O(d^2)$ per step)
Input: the policy $\pol{\pi}$ to evaluate, features $\mathbf x(s) \in \mathbb R^d$ with $\mathbf x(\text{terminal}) = \mathbf 0$, a small $\varepsilon > 0$
Set $\hat{\mathbf A}^{-1} \leftarrow \varepsilon^{-1} \mathbf I$ and $\hat{\mathbf b} \leftarrow \mathbf 0$
Repeat for each episode:
  Start: $S$; $\mathbf x \leftarrow \mathbf x(S)$
  Repeat until $S$ is terminal:
    Choose $A$ from $\pol{\pi}(\cdot \mid S)$; take it, observe $\rew{R}$ and $S'$; $\mathbf x' \leftarrow \mathbf x(S')$
    $\mathbf v \leftarrow (\hat{\mathbf A}^{-1})^\top (\mathbf x - \gam\,\mathbf x')$; $\hat{\mathbf A}^{-1} \leftarrow \hat{\mathbf A}^{-1} - (\hat{\mathbf A}^{-1} \mathbf x)\,\mathbf v^\top / (1 + \mathbf v^\top \mathbf x)$
    $\hat{\mathbf b} \leftarrow \hat{\mathbf b} + \rew{R}\,\mathbf x$; $\mathbf w \leftarrow \hat{\mathbf A}^{-1} \hat{\mathbf b}$
    $S \leftarrow S'$; $\mathbf x \leftarrow \mathbf x'$
:::

LSTD is the most data-efficient form of linear TD(0): every transition keeps counting, and there is no step size to tune. The price is $O(d^2)$ memory and computation per step against the $O(d)$ of \ref{eq-update}, which rules it out for the millions of weights of a network and makes it attractive for a few hundred features when data is scarce. Two cautions temper "no step size" (Sutton and Barto, §9.8). The regularizer $\varepsilon$ is a knob too: too small and the early inverses swing wildly, too large and learning is slow. And LSTD never forgets: the statistics weigh the first transition as much as the last. That is right for evaluating one fixed policy, and wrong when the policy keeps changing, as in control, where some forgetting must be added. Boyan (2002) extended LSTD to eligibility traces, LSTD(λ), by replacing $\mathbf x_k$ in front of each term of \ref{eq-lstd} with the trace vector $\mathbf z_k$; Lagoudakis and Parr (2003) built a control method on its action-value version, least-squares policy iteration.

### $n$-step semi-gradient TD {#n-step}

Between one step and the whole episode, the [[n-step-td|$n$-step return]] uses $n$ rewards and then bootstraps:

$$\rew{G_{t:t+n}} = \rew{R_{t+1}} + \gam\,\rew{R_{t+2}} + \dots + \gam^{n-1}\,\rew{R_{t+n}} + \gam^n\,\val{\hat v(S_{t+n}, \mathbf w)}, \qquad \mathbf w \leftarrow \mathbf w + \alp\,\big[\rew{G_{t:t+n}} - \val{\hat v(S_t, \mathbf w)}\big]\,\nabla \val{\hat v(S_t, \mathbf w)}. \label{eq-n}$$

The update of time $t$ is made at time $t + n$, once the rewards are in; after the episode ends the last $n - 1$ states are updated with the rewards that remain. Larger $n$ means less bias from the bootstrapped estimate, more variance from the rewards, and information that travels $n$ steps per update. As with tables, an intermediate $n$ usually learns fastest.

::: figure {#fig-n}
{{walk-n-study}}
$n$-step semi-gradient TD on the 1000-state walk with 20 groups of 50 states: the error over the first 10 walks, against the step size, for several $n$. Intermediate values of $n$ learn fastest, as with tables. Computed live by the Lab; after Sutton & Barto, Figure 9.2.
:::

### Off-policy, and a warning {#off-policy}

To learn the values of a target policy $\pol{\pi}$ from actions chosen by another policy $b$, each update can be weighted by the importance-sampling ratio of the action taken, $\rho_t = \pol{\pi(A_t \mid S_t)} / b(A_t \mid S_t)$:

$$\mathbf w \leftarrow \mathbf w + \alp\,\rho_t\,\big[\rew{R_{t+1}} + \gam\,\val{\hat v(S_{t+1}, \mathbf w)} - \val{\hat v(S_t, \mathbf w)}\big]\,\nabla \val{\hat v(S_t, \mathbf w)}. \label{eq-off}$$

In expectation this corrects the targets, but not the distribution of the states being updated, which stays that of $b$. The guarantee of the linear case relied on on-policy sampling, and without it the weights can diverge, even when every true value is 0 and nothing is random in the rewards: off-policy learning, bootstrapping and function approximation together are the [[deadly-triad]]. The Lab's [Baird experiment](lab:deadly-triad) runs exactly \ref{eq-off}.

### Relatives {#relatives}

- **TD(λ) with features.** The eligibility trace becomes a vector the size of the weights, $\mathbf z \leftarrow \gam\lam\,\mathbf z + \nabla \val{\hat v(S_t, \mathbf w)}$, and each step moves $\mathbf w$ by $\alp\,\del_t\,\mathbf z$ ([[td-lambda]]). True online TD(λ) refines it so that it matches the λ-return exactly, step by step.
- **Gradient-TD methods** (GTD2, TDC) follow the true gradient of a different objective, the projected Bellman error, and stay stable off-policy ([[deadly-triad]]).

### Historical remarks {#history}

Sutton (1988) introduced TD learning with linear function approximation and proved convergence in a special case; Dayan (1992) and others extended the result, and Tsitsiklis and Van Roy (1997) gave the general proof for linear on-policy TD(λ), together with the bound on its fixed point. Baird (1995) proposed residual-gradient algorithms, and with them the counterexample that bears his name. LSTD is due to Bradtke and Barto (1996), extended to traces by Boyan (2002) and to control by Lagoudakis and Parr (2003).

## Card

### Idea

TD(0) with weights: after every step, move the weights so the estimate of the state just left gets closer to the reward plus the discounted estimate of the next state. The target is computed from the weights, but the update treats it as fixed: a semi-gradient.

::: analogy
Correcting tomorrow's weather forecast with today's forecast for the day after, instead of waiting a week for the full record: quicker, but your own forecasts' biases creep in.
:::

### The update {#update}

$$\mathbf w \leftarrow \mathbf w + \alp\,\big[\,\rew{R} + \gam\,\val{\hat v(S', \mathbf w)} - \val{\hat v(S, \mathbf w)}\,\big]\,\nabla \val{\hat v(S, \mathbf w)}$$

### One change from gradient Monte Carlo {#change}

| | target | updates | converges (linear, on-policy) to |
| --- | --- | --- | --- |
| [[gradient-mc]] | $\rew{G_t}$ | after the episode | the minimum of $\overline{\text{VE}}$ |
| Semi-gradient TD | $\rew{R} + \gam\,\val{\hat v(S', \mathbf w)}$ | every step | the TD fixed point |

### Backup diagram {#backup}

{{backup td0}}

The one-step backup of TD(0); the update writes to the weights.

### Pseudocode

::: pseudocode
Parameters: step size $\alp$; features $\mathbf x(s)$, so $\val{\hat v(s, \mathbf w)} = \mathbf w^\top \mathbf x(s)$, and 0 at the end
Set $\mathbf w$ (here 0)
Repeat for each episode:
  Start: $S$ {#start}
  Repeat until $S$ is terminal:
    Choose $A$ from $\pol{\pi}$ {#choose}
    Take $A$, observe $\rew{R}$ and $S'$ {#act}
    $\mathbf w \leftarrow \mathbf w + \alp\,[\rew{R} + \gam\,\val{\hat v(S', \mathbf w)} - \val{\hat v(S, \mathbf w)}]\,\mathbf x(S)$, then $S \leftarrow S'$ {#update}
:::

### Perks

- Learns online, from every step, and in tasks that never end.
- Low variance: one reward and one estimate per target. [See it](lab:walk-aggregation)
- Linear and on-policy: converges, within $1/(1-\gamma)$ of the best fit.

### Flaws

- Biased: settles at the TD fixed point, not the best fit.
- Not a true gradient method: no general guarantee, and off-policy it can diverge ([[deadly-triad]]).
- One-step information travels slowly; $n$-step returns or traces usually help.

### Knobs

| Knob | Too low | Too high |
| --- | --- | --- |
| $\alp$ step size | slow | noisy, and off-policy, divergence comes sooner |
| $n$ steps ahead | slow spread, more bias | more variance, waits longer |
| features | coarse fit, more bootstrapping bias | little generalization |

### Pitfalls

- Using it off-policy without care: importance ratios correct the targets, not the distribution of updates.
- Comparing its final error with Monte Carlo's and concluding it learned less: its destination is different, its speed often better.
- Forgetting that the terminal state's estimate must be 0, not the weights' guess.

### Check yourself {#check}

::: question
What does “semi” in semi-gradient refer to?
---
The target $R + \gamma \hat v(S', \mathbf w)$ depends on the weights, but the update differentiates only $\hat v(S, \mathbf w)$ and treats the target as a constant: it follows only part of the gradient of the squared TD error.
:::

::: question
On the walk's first episode, with all estimates at 0, which updates of semi-gradient TD(0) change anything?
---
Only the last one: every other target is $0 + \gamma \cdot 0 = 0$, equal to the estimate. The final jump out of an exit pays $\pm 1$ against an estimate of 0, so only that state's group moves.
:::

::: question
Why does semi-gradient TD's staircase on the walk end flatter than Monte Carlo's?
---
Each group's target leans on the estimates of the groups it jumps into, themselves averages that cannot be exact. The outer groups bootstrap from inner neighbors with smaller values and settle short of their true average: the bias of the TD fixed point.
:::
