# The tools of continuous control: the list

DDPG, TD3, SAC and PPO, as their papers describe them, swing a pendulum up. They rarely walk a robot. What makes them
work on locomotion, arms and anything with many joints is a set of tools around the algorithm: the noise that
explores, the regularizers that keep the policy and the critic in shape, and the normalizations that keep the numbers
in range. Sutton & Barto stop before these tools, and so did the atlas until now.

This is the list of those tools: what each one does, who uses it, and where it goes in the atlas. It was written before
anything was built, after reading the papers again (the sources are at the end). The part of the atlas it plans is
**Part 12, Exploration and regularization**; the plan's status is at the end.

## Why the algorithms need help

- **Noise that cancels out.** DDPG and TD3 explore by adding independent Gaussian noise to every action. A body with
  inertia filters it: pushes left and right a few steps apart cancel before the body moves. In continuous Mountain
  Car the car needs a hundred steps of pushing the same way, and independent noise almost never gives it that
  (Eberhard et al., 2023; Raffin et al., 2021).
- **Jittery, bang-bang control.** Nothing in the return asks for smooth actions, and trained policies often switch
  between the extremes of the action range (Seyde et al., 2021). In simulation that costs nothing. On a motor it means
  heat, wear and a power bill: smoothing a drone's controller cut its power use by almost 80% (Mysore et al., 2021).
- **A critic that is fit on a thin slice of actions**, and an actor that climbs its errors ([TD3](../content/11-continuous/td3.md) covers the
  overestimation; the critic regularizers below cover the rest).
- **Numbers in arbitrary units.** Positions in meters next to velocities a hundred times smaller, rewards in the
  thousands, actions in newton-metres ([Normalization tricks](../content/12-toolbox/normalization.md)).
- **Many action dimensions.** Every joint adds a dimension to explore, and to jitter in.

## The list

Each tool has a verdict: **station** (its own page), **section** (a section of a station), **mention** (a paragraph,
with its source), or **covered** (already in the atlas: linked from the new part).

### 1. Noise added to the action

For the deterministic actors (DDPG, TD3), and for the samples of stochastic ones (SAC, PPO).

| Tool | What it does | Who uses it | In the atlas |
| --- | --- | --- | --- |
| White Gaussian noise | a fresh N(0, σ²) at every step, σ a fraction of the action range | TD3 (σ = 0.1), most implementations | section, *action noise*; Lab |
| Ornstein–Uhlenbeck noise | a random walk pulled back toward 0: each step keeps most of the last noise | DDPG's paper (θ = 0.15, σ = 0.2); SB3 Zoo's TD3 on Mountain Car (σ = 0.5) | section; Lab |
| Colored noise, 1/f^β | a noise whose power falls with frequency as 1/f^β: white β = 0, pink β = 1, red (Brownian) β = 2; one sequence per episode | pink noise as the default for SAC and MPO (Eberhard et al., 2023); the authors' package also serves DDPG and TD3 | **station** *action noise*; Lab |
| Noise scale and schedules | σ relative to the action bounds, clipped after adding; σ decayed over training, or different per worker | everywhere | section |
| Random warm-up | uniform random actions before learning starts | TD3 (1,000 to 10,000 steps), SAC | section |
| Autoregressive and coherent noise | other ways to correlate the noise in time | Korenkevych et al. (2019), van Hoof et al. (2017) | mention |
| Action repeat (frame skip) | repeat each action k steps: fewer decisions, longer pushes, smoother | DQN on Atari (k = 4), the DeepMind Control Suite | section, *smooth policies* |
| Temporally extended ε-greedy | discrete actions: repeat the random action for a random number of steps | Dabney et al. (2021) | mention |

### 2. Noise inside the policy

| Tool | What it does | Who uses it | In the atlas |
| --- | --- | --- | --- |
| Parameter space noise | perturb the actor's weights once per episode, so the same state gets the same exploratory action; the perturbation's size adapts until the actions move by a target δ | DDPG, TD3, DQN, TRPO (Plappert et al., 2018) | **station** *parameter noise*; Lab |
| Noisy networks | layers whose weights carry learned noise: exploration tuned by gradient descent | Rainbow DQN (Fortunato et al., 2018) | section |
| State-dependent exploration (SDE, gSDE) | the noise is a function of the state, ε(s) = θ_εᵀ z(s), with θ_ε drawn every n steps: smooth, consistent, and still a Gaussian whose spread is learned | PPO, A2C, SAC, TD3 in Stable-Baselines3; learning on real robots (Raffin et al., 2021; Rückstieß et al., 2008) | **station** *gSDE*; Lab |
| Evolution strategies, random search | search in parameter space alone, with no gradient of the return | Salimans et al. (2017); ARS (Mania et al., 2018) | mention |
| Bootstrapped heads, Thompson sampling | commit to one hypothesis for a while | Osband et al. (2016) | covered ([Exploration strategies](../content/12-toolbox/exploration-strategies.md)) |

### 3. The policy's distribution

| Tool | What it does | Who uses it | In the atlas |
| --- | --- | --- | --- |
| The spread σ: one per action, or one per state | PPO keeps σ free of the state; SAC computes it from the state | PPO, SAC | section, *Gaussian policies in practice* |
| Initial spread, small last layer | start near zero mean with a small spread: initial σ ≈ 0.5 and the last layer ×0.01 | Andrychowicz et al. (2021), the most surprising finding of their study | **station** *Gaussian policies in practice*; Lab |
| Bounded actions: clip, tanh, Beta | clip the sample, squash it with tanh (and correct the log-probability), or use a Beta distribution on the interval | PPO clips; SAC squashes; Chou et al. (2017) | section |
| Actions scaled to [−1, 1] | one scale for every joint, so one σ means the same everywhere | a first tip of Stable-Baselines3's guide | section |
| Bang-bang policies | trained Gaussians drift to the extremes; Bernoulli bang-bang policies match them on many benchmarks | Seyde et al. (2021) | section, *smooth policies* |
| Entropy bonus, target entropy | pay the policy to stay random | A2C, PPO, SAC | covered ([Entropy bonus](../content/10-policy-gradients/entropy-bonus.md), [SAC](../content/11-continuous/sac.md)) |

### 4. Smoothness of the policy

| Tool | What it does | Who uses it | In the atlas |
| --- | --- | --- | --- |
| CAPS | two terms in the actor's loss: λ_T ‖π(s_t) − π(s_{t+1})‖ (consecutive actions alike) and λ_S ‖π(s) − π(s̄)‖, s̄ ~ N(s, σ) (nearby states, nearby actions) | DDPG, TD3, SAC, PPO; drones (Mysore et al., 2021) | **station** *smooth policies*; Lab |
| Action-rate and torque penalties | costs in the reward on the change of action, the torque, the joint accelerations | legged robots (Hwangbo et al., 2019; Rudin et al., 2022) | section, linked from [Reward design](../content/01-problem/reward-design.md) |
| Low-pass filters on the actions | smooth the actions before the motors; trained without the filter, a policy can misbehave with it | legged robots (Peng et al., 2020); the caveat: Mysore et al. (2021) | section |
| Lipschitz constraints | bound how fast the policy may change with the state: spectral normalization of its layers, or a penalty on its gradient | Miyato et al. (2018); Lipschitz-constrained policies for humanoids (Chen et al., 2024) | section |
| Smoothness measures | the weighted mean frequency of the action's spectrum (CAPS), or the mean squared change of action per step (gSDE's continuity cost) | | section; the Lab charts one |

### 5. Regularizing the critic

| Tool | What it does | Who uses it | In the atlas |
| --- | --- | --- | --- |
| Target networks, soft updates | targets from slowly following copies | DQN, DDPG, TD3, SAC | covered ([Target network](../content/09-deep-value/target-network.md), [DDPG](../content/11-continuous/ddpg.md)) |
| Clipped double Q | the smaller of two critics in the target | TD3, SAC | covered ([TD3](../content/11-continuous/td3.md)) |
| Target policy smoothing | the target is valued at a blurred action | TD3 | covered ([TD3](../content/11-continuous/td3.md)) |
| Weight decay | an L2 penalty on the critic's weights | DDPG's paper (10⁻²) | section, *regularizing the critic*; Lab |
| Layer normalization | normalize each layer's units before the activation | Plappert et al. (2018) for parameter noise; DroQ; RLPD; BRO; SimBa | section |
| Dropout | random units off in the critic, with layer norm, so a few critics behave like many | DroQ (Hiraoka et al., 2022) | section |
| Ensembles of critics | the min over a random pair of ten critics (REDQ); truncated quantiles (TQC) | Chen et al. (2021); Kuznetsov et al. (2020) | section |
| Batch normalization | DDPG's original critic; CrossQ, which drops the target network | Lillicrap et al. (2016); Bhatt et al. (2024) | section |
| Spectral normalization | bound each layer's gain, so that larger critics stay stable | Bjorck et al. (2021); Gogianu et al. (2021) | section |
| More updates per step, and resets | many gradient steps per environment step; reset the networks now and then to recover plasticity | REDQ, DroQ (20 updates a step); Nikishin et al. (2022); D'Oro et al. (2023) | section |
| Dormant units, plasticity loss | units that stop firing for good as training goes on | Sokar et al. (2023); Dohare et al. (2024) | section (the Lab's network strip shows them) |
| n-step returns, distributional critics | longer targets; a distribution of returns instead of a mean | D4PG (Barth-Maron et al., 2018) | mention |
| Huber loss, gradient clipping | bounded steps for large errors | DQN | covered ([Normalization tricks](../content/12-toolbox/normalization.md)) |

### 6. Numbers in range

| Tool | What it does | Who uses it | In the atlas |
| --- | --- | --- | --- |
| Observation normalization | running mean and spread of each input, then clip | PPO (Andrychowicz et al., 2021: "always use it"), SB3's VecNormalize | covered ([Normalization tricks](../content/12-toolbox/normalization.md)); new: a knob in the trainer, Lab |
| Reward scaling, value normalization, advantage normalization | | | covered ([Normalization tricks](../content/12-toolbox/normalization.md)) |
| Time limits | bootstrap at a time-out, do not treat it as an end; or give the agent the time left | Pardo et al. (2018); Rudin et al. (2022) | section, *the recipe* |

### 7. Robustness for real robots

| Tool | What it does | Who uses it | In the atlas |
| --- | --- | --- | --- |
| Domain and dynamics randomization | train on many worlds: masses, frictions, delays drawn per episode | Tobin et al. (2017); Peng et al. (2018) | **station** *robust policies* |
| Observation noise, pushes, latency | noise in the sensors, random shoves, delayed actions during training | Rudin et al. (2022) | section |
| Curricula | start easy (flat ground), make it harder as the policy improves | Rudin et al. (2022) | section |
| Privileged critic, teacher and student | the critic (or a teacher) sees what the robot cannot | Lee et al. (2020) | mention |

### 8. Left out, on purpose

- **Data augmentation** (DrQ, RAD): it is for learning from pixels, which the atlas leaves out.
- **Optimistic actor–critics** (OAC, Ciosek et al., 2019): one paragraph in *action noise*; not a tool people reach
  for first.
- **Intrinsic rewards** (RND, ICM, counts): already in [Exploration strategies](../content/12-toolbox/exploration-strategies.md); the new part links to them for
  sparse rewards.

## How it fits the atlas

### A new part on the continuous line

**Part 12 · Exploration and regularization**, between Continuous control and the Toolbox, on the continuous line.
Toolbox becomes Part 13 and Where next Part 14. Its stations, in reading order:

| Station | Title | Story and Lab |
| --- | --- | --- |
| `action-noise` | Action noise: white, red and pink | TD3 on continuous Mountain Car, white against Ornstein–Uhlenbeck, pink and red noise |
| `parameter-noise` | Noise in the weights | DDPG with action noise against parameter noise, on Mountain Car |
| `gsde` | State-dependent exploration (gSDE) | PPO on Pendulum with and without gSDE; SAC on Mountain Car |
| `policy-spread` | Gaussian policies in practice | PPO on Pendulum: the initial spread, clipping against squashing |
| `smooth-policies` | Smooth policies: CAPS, penalties, filters | TD3 on Pendulum with and without CAPS: the torque's jitter |
| `critic-regularization` | Regularizing the critic | DDPG on Pendulum: weight decay; SAC with many updates per step |
| `robust-policies` | Robust policies: randomize the world | textbook and card |
| `control-recipe` | A recipe for continuous control | a decision guide, like *Which algorithm should I use?* |

### A new world

**Continuous Mountain Car** (Gymnasium's MountainCarContinuous-v0, ported line for line): the force is a number in
[−1, 1], every step costs 0.1 × force², and reaching the flag pays 100. It is the classic test of exploration with
continuous actions: an agent that never reaches the flag learns that pushing only costs, and stands still. Pendulum
cannot show what noise does: the DDPG sweep already found that it learns with no noise at all.

### The trainer

New settings in `lab/deep/`, each off by default, so that every recording stays as it is (the recordings test checks
it):

- DDPG, TD3 and SAC: the noise's color (white, Ornstein–Uhlenbeck, pink, red), drawn one episode at a time.
- DDPG and TD3: parameter noise, with its adaptive spread.
- PPO and SAC: gSDE, with its sampling interval.
- DDPG, TD3 and SAC: CAPS's two terms.
- Every learner: observation normalization; the critic's weight decay.
- A recording also keeps, for every seed, how much its test episode's actions jitter.

### Into the current labs

The current deep labs gain the new knobs, with their sweeps: DDPG on Pendulum the noise's color, TD3 CAPS, SAC gSDE,
PPO gSDE, the initial spread and observation normalization. The entries of Parts 10 to 13 link to the new stations
where their text meets them: DDPG's exploration, TD3's target smoothing, SAC's random actions, PPO on Pendulum,
exploration strategies, normalization, the hyperparameter guide, debugging and which algorithm.

### What it costs

One TD3 seed on Pendulum takes about 5 minutes on one of four busy cores, SAC 8, PPO 2. Before each recording, three
seeds at each knob's two ends; then 20 seeds for a recording and 10 per value for a sweep, as for the others.

## Sources

- Eberhard, Hollenstein, Pinneri & Martius (2023), Pink noise is all you need: colored noise exploration in deep
  reinforcement learning, ICLR.
- Raffin, Kober & Stulp (2021), Smooth exploration for robotic reinforcement learning, CoRL (arXiv 2005.05719).
- Rückstieß, Felder & Schmidhuber (2008), State-dependent exploration for policy gradient methods, ECML PKDD.
- Plappert et al. (2018), Parameter space noise for exploration, ICLR (arXiv 1706.01905).
- Fortunato et al. (2018), Noisy networks for exploration, ICLR (arXiv 1706.10295).
- Mysore, Mabsout, Mancuso & Saenko (2021), Regularizing action policies for smooth control with reinforcement
  learning, ICRA (arXiv 2012.06644).
- Seyde et al. (2021), Is bang-bang control all you need? Solving continuous control with Bernoulli policies,
  NeurIPS (arXiv 2111.02552).
- Andrychowicz et al. (2021), What matters in on-policy reinforcement learning? A large-scale empirical study, ICLR
  (arXiv 2006.05990).
- Lillicrap et al. (2016), Continuous control with deep reinforcement learning, ICLR (arXiv 1509.02971).
- Fujimoto, van Hoof & Meger (2018), Addressing function approximation error in actor-critic methods, ICML.
- Hiraoka et al. (2022), Dropout Q-functions for doubly efficient reinforcement learning, ICLR (arXiv 2110.02034).
- Chen, Wang, Zhou & Ross (2021), Randomized ensembled double Q-learning: learning fast without a model, ICLR.
- Nikishin et al. (2022), The primacy bias in deep reinforcement learning, ICML.
- Rudin, Hoeller, Reist & Hutter (2022), Learning to walk in minutes using massively parallel deep reinforcement
  learning, CoRL (arXiv 2109.11978).
- Peng et al. (2020), Learning agile robotic locomotion skills by imitating animals, RSS (arXiv 2004.00784).
- Tobin et al. (2017), Domain randomization for transferring deep neural networks from simulation to the real world,
  IROS; Peng, Andrychowicz, Zaremba & Abbeel (2018), Sim-to-real transfer of robotic control with dynamics
  randomization, ICRA.
- Raffin et al. (2021), Stable-Baselines3 and the RL Zoo's tuned settings (hyperparams/*.yml): TD3 on
  MountainCarContinuous with Ornstein–Uhlenbeck noise; SAC and PPO there, and PPO on Pendulum, with gSDE.
