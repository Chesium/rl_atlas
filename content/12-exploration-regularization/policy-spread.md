+++
summary = "A Gaussian policy is two numbers per action dimension, a mean and a spread, and the details of both decide much of what PPO, A2C and SAC can learn: whether the spread depends on the state, how it is kept positive, where it starts, how a sample is fitted into the allowed range (clipped, or squashed with tanh), and what scale the actions and observations come in. The largest study of these choices found the starting distribution the most surprising: a mean near zero everywhere and a smallish spread."
prereqs = ["policy-parameterization", "ppo", "sac"]
lab = "ppo-spread-pendulum"
sources = [
  { text = "Andrychowicz et al. (2021), What matters in on-policy reinforcement learning? A large-scale empirical study, ICLR", url = "https://arxiv.org/abs/2006.05990" },
  { text = "Haarnoja, Zhou, Abbeel & Levine (2018), Soft actor-critic: off-policy maximum entropy deep reinforcement learning with a stochastic actor, ICML", url = "https://arxiv.org/abs/1801.01290" },
  { text = "Chou, Maturana & Scherer (2017), Improving stochastic policy gradients in continuous control with deep reinforcement learning using the beta distribution, ICML", url = "https://proceedings.mlr.press/v70/chou17a.html" },
  { text = "Seyde, Gilitschenski, Schwarting, Stellato, Riedmiller, Wulfmeier & Rus (2021), Is bang-bang control all you need? Solving continuous control with Bernoulli policies, NeurIPS", url = "https://arxiv.org/abs/2111.02552" },
  { text = "Engstrom et al. (2020), Implementation matters in deep policy gradients: a case study on PPO and TRPO, ICLR", url = "https://arxiv.org/abs/2005.12729" },
  { text = "Stable-Baselines3 documentation: reinforcement learning tips and tricks", url = "https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html" },
  { text = "Andrychowicz et al. (2017), Hindsight experience replay, NeurIPS", url = "https://arxiv.org/abs/1707.01495" },
]

[story]
scene = "pendulum"
env = "pendulum"
formula = '''\step{1}{A \sim \mathcal N\big(\pol{\mu(S)}, \pol{\sigma}^2\big), \text{ clipped to } [-2, 2] \qquad} \step{2}{\pol{\sigma} = e^{\pol{\ln\sigma}}, \quad \pol{\ln\sigma} \text{ learned with the network, from } \knob{\ln\sigma_0}}'''

[story.runs]
narrow = { recording = "ppo-pendulum-narrow", name = "σ₀ = 0.37" }
mid = { recording = "ppo-pendulum", name = "σ₀ = 1" }
wide = { recording = "ppo-pendulum-wide", name = "σ₀ = 2.7" }
+++

## Story

::: step {run = "mid", at = 0, map = "action", formula = 1}
**PPO's policy is a bell curve** in every state (formula 1): the network gives the mean torque, and one learned number, the spread $\pol\sigma$, says how far around it to sample; a sample past the range, $-2$ to 2, is clipped to its end. The network's last layer starts small, so every state's mean starts near 0, and the map shows no preference anywhere. The spread starts at $\pol\sigma = 1$, half the largest torque, as the largest study of PPO's choices advises for actions scaled to $[-1, 1]$ (0.5 there). The test episode, sampled like the training ones, flails at the bottom.
:::

::: step {run = "narrow", at = 4, map = "action"}
**Start at $\pol\sigma = 0.37$ instead**, and the torques stay close to the means: in the test episode after 20,000 steps, not one reaches the end of the range. The pendulum needs full pushes, back and forth, to swing up, and PPO learns only about the torques it tries. The means widen slowly, to $\pm 0.6$ by now, and the pendulum still hangs.
:::

::: step {run = "wide", at = 4, map = "action"}
**Start at $\pol\sigma = 2.7$**, wider than the range itself, and from the first step half the torques are clipped to its ends: full pushes, the kind a swing needs. After the same 20,000 steps the means run past both ends of the range, and the test episode swings the pendulum up by step 53 and holds it. From $\pol\sigma = 1$ that takes 25,000 steps on this seed; from 0.37, 60,000.
:::

::: step {run = "wide", at = 40, curves = ["narrow", "mid", "wide"], metric = "return"}
**Twenty seeds of each**, judged by their training episodes. Starting at $\pol\sigma = 0.37$, 15 seeds end up swinging the pendulum up and holding it, and half the seeds need 70,000 steps to first get there; at $\pol\sigma = 1$, 17 seeds, and 35,000 steps; at $\pol\sigma = 2.7$, all 20, and 25,000.
:::

::: step {run = "mid", at = 40, curves = ["narrow", "mid", "wide"], metric = "jitter-train", formula = 2}
**The spread is learned too** (formula 2), and it narrows as the policy improves: on this seed, from 2.7 to 0.37 over the 200,000 steps, from 1 to 0.27, from 0.37 to 0.16. Until it has, a wide start shakes: its training torques jump by 12 from step to step on average, against 3.2 from $\pol\sigma = 1$ and 0.8 from 0.37 ([[smooth-policies]]). The best start depends on the task, and so does its price. [Race the three starts in the Lab](lab:ppo-spread-pendulum).
:::

## Textbook

### Two numbers per action {#two}

A Gaussian policy draws each action dimension from $\mathcal N(\pol{\mu(s)}, \pol{\sigma}^2)$: a mean computed by the network, and a spread ([[policy-parameterization]]). The mean is what the policy believes; the spread is how much it explores, and it is learned too: the policy gradient widens it when samples far from the mean did better than expected, and narrows it otherwise. Everything else about the policy is a choice its code makes, and those choices matter more than their absence from papers suggests. Andrychowicz et al. (2021) trained over 250,000 PPO agents on five MuJoCo tasks, turning more than 50 such choices; this entry follows their findings.

### Where the spread comes from {#where}

- **A free number per dimension**, the same in every state: PPO and A2C learn $\ln\pol\sigma$ directly, as a parameter next to the network. The policy explores as much everywhere, and narrows everywhere as it learns.
- **An output of the network**, $\pol{\sigma(s)}$: SAC computes its log spread from the state, so it can stay wide where it is unsure and narrow where it knows ([[sac]]).
- **A function of features**: gSDE's spread $\pol{\hat\sigma_j(s)} = \sqrt{\sum_i (z_i(s)\knob{\sigma_{ij}})^2}$ also depends on the state, through the network's last hidden layer ([[gsde]]).

For PPO, the study found no clear advantage either way. What matters more is keeping $\pol\sigma$ positive and in range: an exponential of a learned log spread (with the log clipped, to $[-5, 2]$ in this guide's SAC and $[-20, 2]$ in SAC's original code) or a softplus, $\ln(1 + e^x)$, which grows only linearly; the two did about equally well, and a small floor under $\pol\sigma$ mattered little.

### Start near zero, and not too wide {#start}

The study's "most surprising finding" was the starting policy. Initialize the network so that every state's mean starts near 0 and the spread starts smallish, and PPO learns much faster:

- **A small last layer.** Scaling the last layer's initial weights by 0.01 makes the initial means almost independent of the state: no state starts with a strong, arbitrary preference. That alone raised performance on Humanoid by 66%. This guide's PPO and A2C networks start that way (their last layer is scaled by 0.01; the actors of DDPG, TD3 and SAC by 0.1).
- **A smallish spread.** With actions scaled to $[-1, 1]$, an initial $\pol\sigma$ of 0.5 did best on four tasks of five (Hopper preferred more). Too wide, and most early samples land outside the range and get clipped to its ends; too narrow, and the policy hardly explores before it commits.

The best start depends on the task, and on Pendulum it was wider. In the Lab's race of three starts, 20 seeds of 200,000 steps each, with the torque running from $-2$ to 2: starting at $\pol\sigma = 0.37$ ($\ln\pol\sigma = -1$), 15 seeds ended up holding the pendulum, and half the seeds needed 70,000 steps to first get there; at $\pol\sigma = 1$, this guide's default, 17 seeds, and 35,000; at $\pol\sigma = 2.7$, all 20, and 25,000, with training torques that jumped four times as much from step to step (12 against 3.2).

### Bounded actions: clip or squash {#bounds}

A Gaussian sample can be any number; a motor accepts a range. Three ways to reconcile them:

- **Clip** the sample before the world sees it, $\operatorname{clip}(a, -1, 1)$, and keep the unclipped $a$ for the update: PPO's default, and this guide's. The world treats every sample past the end alike, so the policy feels no difference between a mean at 1.2 and at 3.
- **Squash** it, $a_{\text{world}} = \tanh(a)$ (times the largest action): SAC's choice, smooth everywhere. The density of a squashed sample gains a term, $-\ln(1 - \tanh^2 a)$, which SAC includes in its entropy ([[sac]]). For PPO the term cancels in the probability ratios and in the KL divergence, because both compare two densities at the same sample; only an entropy bonus would feel it. In the study, tanh did slightly better overall (30% better on HalfCheetah), perhaps mostly because it makes the first actions smaller. On Pendulum here the two did about as well: 9 seeds of 10 held the pendulum with tanh, 8 with clipping.
- **A distribution with bounded support**, such as the Beta distribution on the interval (Chou et al., 2017), so that no probability is wasted past the ends.

A squashed output can also get stuck. Where $\tanh$ is near $\pm 1$ its slope is near 0, and so is every gradient that passes through it: an actor whose outputs drift to the ends of the range may stop learning there. The DDPG of hindsight experience replay added the squares of the actor's outputs before the $\tanh$ to its loss, to keep them away from the ends (Andrychowicz et al., 2017).

### Scales {#scales}

- **Actions in $[-1, 1]$.** Rescale each action dimension to the same range, as Stable-Baselines3's guide advises first: one initial spread then means the same for every joint, and the network's outputs stay of order one.
- **Observations normalized.** "Always use observation normalization": in the study it was crucial on four tasks of five ([[normalization]]). A running mean and spread per input, then a clip at a few spreads. Pendulum's spin runs to $\pm 8$ next to a cosine and a sine; normalized, PPO held the pendulum on all 10 seeds of the Lab's sweep, against 8.
- **Rewards scaled** so that values stay moderate ([[normalization]]).

### Where Gaussian policies drift: bang-bang {#bang-bang}

Nothing in the return asks for moderate actions, and trained Gaussian policies often push their means past the ends of the range, so that the clipped action switches between the extremes. Seyde et al. (2021) replaced the Gaussian by a Bernoulli policy that only ever picks the two ends of each dimension, a bang-bang controller, and matched state-of-the-art results on several continuous control benchmarks. On a simulator, extreme actions cost nothing; on a motor they cost energy and wear, which is why real systems add penalties or smoothing ([[smooth-policies]]).

### Entropy {#entropy}

The spread can collapse early, before the policy has found what pays. PPO and A2C can add an entropy bonus to their loss ([[entropy-bonus]]); SAC weighs entropy in the return itself and tunes the weight toward a target entropy of minus the number of action dimensions ([[sac]]). In the study, neither an entropy bonus nor any other regularizer of the policy helped significantly, except on HalfCheetah; the authors suggest that the careful starting policy already explored enough.

::: example {#ex-clip} A mean past the end
A pendulum's torque runs from −2 to 2. A PPO policy whose mean drifted to 3, with a spread of 0.5, sends 2 almost every time: the world can hardly tell this policy from one whose mean is 4 or 10, so the gradient has little to pull the mean back with. Squashed, the same mean sends $2\tanh 3 = 1.99$, and a mean of 1 sends $1.52$: every change of the mean changes the action, however slightly, and the gradient never goes entirely flat, though far out at the ends it is weak.
:::

## Card

### Idea

The details of a Gaussian policy decide much of what it learns: where the spread comes from and how it stays positive, a starting mean near zero in every state (last layer × 0.01) and a smallish starting spread, clipping or squashing into the allowed range, and actions and observations in a common scale.

::: analogy
Tuning an instrument before playing: no single peg makes music, but a badly tuned one spoils the piece.
:::

### The choices {#choices}

| Choice | Common settings |
| --- | --- |
| spread | free log σ (PPO) or σ(s) from the network (SAC) |
| keeping σ positive | exp of a clipped log, or softplus |
| start | last layer × 0.01; σ ≈ 0.5 for actions in [−1, 1] |
| bounds | clip (PPO), tanh with the density's correction (SAC), Beta |
| scales | actions in [−1, 1]; observations normalized |

### Pitfalls

- An initial spread as wide as the range: most early actions clipped to the ends.
- A last layer at full scale: arbitrary strong preferences in some states from the start.
- Squashing with tanh and forgetting the density's correction where entropy is used.
- Clipping, and reading the policy's mean as the action it takes.
- Unnormalized observations of very different scales.

### Check yourself {#check}

::: question
Why does a mean far past the end of the action range stop learning when actions are clipped?
---
Every sample past the end becomes the same clipped action, so the returns do not depend on how far past it the mean is: the gradient that would pull the mean back is close to zero. With tanh, every change of the mean still changes the action a little.
:::

::: question
Why does PPO not need the tanh correction in its ratios, when SAC needs it?
---
PPO's ratio compares the new and old policies' densities at the same sample, and the tanh term is the same in both, so it cancels, as it does in the KL divergence. SAC uses the density itself, in its entropy term, where the correction does not cancel.
:::
