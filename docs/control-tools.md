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
  thousands, actions in newton-metres ([Normalization tricks](../content/13-toolbox/normalization.md)).
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
| Bootstrapped heads, Thompson sampling | commit to one hypothesis for a while | Osband et al. (2016) | covered ([Exploration strategies](../content/13-toolbox/exploration-strategies.md)) |

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
| Huber loss, gradient clipping | bounded steps for large errors | DQN | covered ([Normalization tricks](../content/13-toolbox/normalization.md)) |

### 6. Numbers in range

| Tool | What it does | Who uses it | In the atlas |
| --- | --- | --- | --- |
| Observation normalization | running mean and spread of each input, then clip | PPO (Andrychowicz et al., 2021: "always use it"), SB3's VecNormalize | covered ([Normalization tricks](../content/13-toolbox/normalization.md)); new: a knob in the trainer, Lab |
| Reward scaling, value normalization, advantage normalization | | | covered ([Normalization tricks](../content/13-toolbox/normalization.md)) |
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
- **Intrinsic rewards** (RND, ICM, counts): already in [Exploration strategies](../content/13-toolbox/exploration-strategies.md); the new part links to them for
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

## Status

Built as planned: Part 12's eight stations, between Continuous control and the Toolbox (now Parts 13 and 14);
continuous Mountain Car with its Lab view; the trainer's tools, each off by default (the recordings test confirms that
every earlier recording trains as before); five new Lab presets; and the links from Parts 0, 1, 9, 10, 11 and 13.
Five stations tell a story from the recordings: action noise, parameter noise, gSDE, Gaussian policies and smooth
policies.

Changed on the way, with the reasons:

- **Parameter noise races TD3, not DDPG.** The car's comparison keeps one learner: TD3 with white noise on its
  actions against TD3 with noise in its weights, from the same seeds.
- **Parameter noise needs normalized observations on the car.** The car's speed never exceeds 0.07 while its position
  ranges over 1.8, so a perturbed actor's push follows the position, and no push that follows the position alone can
  pump the swing (none did in 240,000 trials of such pushes). The race has a third racer, with the observations
  normalized as Plappert et al. did: 1 of 20 seeds ends up reaching the flag with raw inputs, 15 with normalized ones.
- **gSDE's story is SAC on the car**, not PPO on Pendulum. Pendulum learns with almost any noise. PPO's gSDE is a knob
  of the PPO Lab (its sweep). On the car gSDE, a new matrix every 8 steps as in the paper, beat SAC's own samples (12
  seeds of 20 against none) but not pink noise (all 20). Its sweep over the interval found the reason: held for 32
  steps, about half the car's swing, the matrices took 9 seeds of 10 to the flag, nearly as many as pink noise, with
  a fifth of its jitter. The story, the textbook and the recipe say so.
- **PPO draws gSDE's matrix every 4 steps by default**, not once per batch: drawn once per batch of 512 steps, PPO on
  Pendulum failed on all three seeds of a trial (the RL Zoo uses 4 there). Even so, gSDE did not make PPO better on
  Pendulum: in the PPO Lab's sweep it held the pendulum on 4 seeds of 10, against 8 for PPO's own noise, with half the
  jitter. *Gaussian policies in practice*, *gSDE* and the recipe say so.
- **DDPG on Pendulum keeps white noise**: its sweep showed it learns with no noise at all, so the noise's color
  cannot matter there. The colors race on the car instead.
- **CAPS's weights are λ_T = 0.1 and λ_S = 0.3 (σ = 0.05)**, and CAPS is wired for DDPG and TD3, not SAC. Stronger
  weights freeze some seeds at the start: an untrained critic pushes every torque one way, the terms hold the torques
  together, and at tanh's flat ends nothing moves them back. Its sweep measured it: λ_T = 0.3 froze 2 seeds of 10,
  λ_S = 1 one; and each term alone already cut the jitter from 18 to 1.8 (spatial) and 2.6 (temporal), 0.5 with both.
- **The CAPS race shows seed 6**, through a second TD3 recording with the same runs (`td3-pendulum-jitter`): on seed 1,
  which TD3's own recording shows, plain TD3 stays smooth; on seed 6 it comes to flip its torque between the ends of
  its range, as 8 of its 20 seeds do for much of the second half.
- **Gaussian policies in practice tells its story with the starting spread alone**: two more recordings, PPO from
  σ₀ = 0.37 and from 2.7, race the PPO Lab's σ₀ = 1, in a Lab of their own. Clipping against squashing, normalization
  and gSDE stay knobs of the PPO Lab's sweep, which the race's Lab shows too.
- **Regularizing the critic has no story**: of its tools the trainer has weight decay only (layer norm, ensembles,
  dropout and resets would each need a new network in the trainer), and many updates per step cost too much to record
  at 20 per step. Its Lab is DDPG on Pendulum, whose sweep gains weight decay; there it changes next to nothing, as
  the page says: a small critic taking one update per step has little to overfit.
- **Weight decay went to the actor–critics only** (DDPG, TD3, SAC), whose critics the part regularizes. PPO, A2C and
  TRPO gained observation normalization alone, and DQN neither: the part is about continuous control, and DQN's
  CartPole learns without them.
- **Added after the list**: hindsight experience replay (a section of *Exploration strategies*, and a line in the
  recipe), the tanh-saturation penalty (in *Gaussian policies in practice*), autoregressive noise and spectral
  normalization for value-based agents (one paragraph each).

Recordings added (20 seeds each; the sweeps 10 seeds per value):

| Recording | Steps | Result |
| --- | --- | --- |
| td3-car-white-noise | 40,000 | 1 of 20 end up reaching the flag (training reaches it on 2) |
| td3-car-ou-noise | 40,000 | 1 of 20 (training reaches it on 4) |
| td3-car-pink-noise | 40,000 | 18 of 20 (training reaches it on 20, half by step 3,000) |
| td3-car-red-noise | 40,000 | 7 of 20 (training reaches it on 20, half by step 7,000) |
| td3-car-param-noise | 40,000 | 1 of 20 (training reaches it on 15, half by step 27,000) |
| td3-car-param-noise-norm | 40,000 | 15 of 20 (training reaches it on 20, half by step 3,500) |
| sac-car | 30,000 | 0 of 20 (training never reaches it) |
| sac-car-pink-noise | 30,000 | 20 of 20 (training reaches it on 20, half by step 2,250) |
| sac-car-gsde | 30,000 | 12 of 20, with the smoothest training forces (jitter 0.4, against 1.0 with pink noise) |
| td3-pendulum-caps | 60,000 | all 20 swing it up and hold it; the test episodes' jitter averages 1 in the second half, against 16 for plain TD3 |
| td3-pendulum-jitter | 60,000 | td3-pendulum's runs, shown at seed 6 |
| ppo-pendulum-narrow | 200,000 | PPO from σ₀ = 0.37: 15 of 20 end up holding the pendulum in training, half the seeds first by step 70,000; training jitter 0.8 |
| ppo-pendulum-wide | 200,000 | PPO from σ₀ = 2.7: 20 of 20, half by step 25,000 (σ₀ = 1, the PPO Lab's: 17, by 35,000); training jitter 12, against 3.2 |
| ppo-pendulum, td3-pendulum | as before | retrained to keep the jitter; otherwise identical |

Sweeps added or extended:

| Sweep | Knobs | Result |
| --- | --- | --- |
| ppo-pendulum | starting spread, tanh squashing, normalized observations, gSDE | σ₀ = 0.37, 1, 2.7: 9, 8 and 10 of 10 hold the pendulum, the narrow start twice as slow; tanh 9, normalized 10, gSDE 4 |
| ddpg-pendulum | weight decay | λ = 0 and 10⁻³: every seed ends near −117 and −116; DDPG's 10⁻²: two of 10 end near −210 |
| td3-car-white-noise | the four colors (the recordings' runs), the spread, normalized observations | colors: white 1, Ornstein–Uhlenbeck 1, pink 10, red 2 of 10 reach the flag; spread 0.2, 0.5, 1: 0, 1, 4; normalized inputs: 2, against 1 |
| td3-car-pink-noise | the spread | 0.2, 0.5, 1: 1, 10 and 10 of 10, fastest at 1 (half the seeds by 12,500 steps, against 18,000), with 2.5 times the jitter |
| sac-car-gsde | how long each gSDE matrix is held (1 to 128 steps) | every 1, 4, 8, 32, 128 steps: 0, 2, 5, 9 and 6 of 10 reach the flag; training jitter 3.1, 0.8, 0.4, 0.2, 0.07 |
| td3-pendulum-caps | CAPS's two weights, each from 0 to three times the recording's | λ_T = 0, 0.1, 0.3: 9, 10, 8 of 10 hold the pendulum (2 frozen at 0.3); λ_S = 0, 0.3, 1: 10, 10, 8 (1 frozen at 1); test jitter 1.8 (spatial alone), 2.6 (temporal alone), 0.5 (both), against 18 for plain TD3 |
| td3-pendulum-jitter | TD3's delay and target noise (td3-pendulum's runs) | for the CAPS race's knobs |

Found and fixed in the review:

- The page's copy of the trainer (`app/deep-worker.js`, built from `lab/deep/`) was stale: in the browser, PPO drew
  gSDE's matrix once per batch instead of every 4 steps. Rebuilt, and a test now fails when the copy and `lab/deep/`
  differ.
- The build now checks that every story run names a recording that exists and that its steps name the story's runs
  (a missing recording used to leave a story waiting forever).
- The recordings test compared a fresh run's returns with the recording's at full strictness, and failed on −0, which
  JSON writes as 0.
- Numbers corrected after decoding the runs themselves: training jitter that counted the random first steps (smooth
  noises looked five to fifteen times rougher than they are); a gSDE actor said to push right everywhere (it pushed
  with the position); Ornstein–Uhlenbeck noise said to reach farther than white (on the car it did not); the car's
  speed called a twentieth of its position's range (0.07 against 1.8).
- Added from the sources: autoregressive noise (Korenkevych et al., 2019), the optimistic actor–critic's source,
  spectral normalization for value-based agents (Gogianu et al., 2021), MBPO's updates per step and source.
- Checked against the papers again, and corrected: RLPD's weight decay fell behind its ensemble on every task (not
  "on none"); gSDE scored a little lower than per-step noise on HalfCheetah; Hwangbo et al.'s hand-tuned motor model
  took over a week; the CAPS example's spin now has the sign its angles imply; a clipped mean past the range is
  nearly, not wholly, invisible to the gradient; the trainer's observation normalization is for its actor–critics
  and policy gradients, not DQN.
- In the Labs, the SAC racers showed TD3's pseudocode (their recordings named the action-noise station), the gSDE
  racer PPO's, and plain TD3 in the CAPS race CAPS's. Each racer now shows its own learner's, and gSDE's card is
  written for SAC, as its story and Lab run it. The CAPS racer's live formula, plain TD3's actor update, now has
  CAPS's two terms.
- The README's map picture showed 14 parts, and its reading order left this part out; the plan's milestone for it
  had split M8 in two and repeated M9's number (it is M11 now). The Symbols page, which lists every symbol, had none
  of this part's; the welcome page's reading paths had none into it.
- Corrected against the recordings and the new sweeps: white noise does reach the flag with the full force as its
  spread (4 seeds of 10), where *Action noise* said no spread helps; the normalized weight-noise racers reach the flag
  in a median of 14,000 steps, not 13,000; plain TD3's torque in the CAPS story jitters by 71, not 72; CAPS's test
  episodes drop the pendulum now and then (4 of 600 after the first 15,000 steps), which *Smooth policies* now says.

Compute: about nine hours of a 4-core machine, nearly all of it for the recordings and sweeps above.
