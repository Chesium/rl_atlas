+++
summary = "What to reach for, in order, when a continuous-control task will not learn. First the problem's setup: actions in [−1, 1] around a sensible pose, normalized observations, time limits handled as time-outs, a control rate that fits the body. Then a well-tuned default learner. Then exploration that matches the body's inertia, then a regularized critic, and, for a policy bound for hardware, smoothness and robustness. Each step points to the station that explains it."
story_in = ["action-noise", "parameter-noise", "policy-spread", "smooth-policies"]
prereqs = ["which-algorithm", "action-noise", "critic-regularization"]
lab = "action-noise-car"
sources = [
  { text = "Pardo, Tavakoli, Levdik & Kormushev (2018), Time limits in reinforcement learning, ICML", url = "https://arxiv.org/abs/1712.00378" },
  { text = "Andrychowicz et al. (2021), What matters in on-policy reinforcement learning? A large-scale empirical study, ICLR", url = "https://arxiv.org/abs/2006.05990" },
  { text = "Huang, Dossa, Raffin, Kanervisto & Wang (2022), The 37 implementation details of proximal policy optimization, ICLR Blog Track", url = "https://iclr-blog-track.github.io/2022/03/25/ppo-implementation-details/" },
  { text = "Henderson, Islam, Bachman, Pineau, Precup & Meger (2018), Deep reinforcement learning that matters, AAAI", url = "https://arxiv.org/abs/1709.06560" },
  { text = "Peng & van de Panne (2017), Learning locomotion skills using DeepRL: does the choice of action space matter?, SCA", url = "https://arxiv.org/abs/1611.01055" },
  { text = "Hwangbo, Lee, Dosovitskiy, Bellicoso, Tsounis, Koltun & Hutter (2019), Learning agile and dynamic motor skills for legged robots, Science Robotics 4", url = "https://arxiv.org/abs/1901.08652" },
  { text = "Smith, Kostrikov & Levine (2022), A walk in the park: learning to walk in 20 minutes with model-free reinforcement learning", url = "https://arxiv.org/abs/2208.07860" },
  { text = "Rudin, Hoeller, Reist & Hutter (2022), Learning to walk in minutes using massively parallel deep reinforcement learning, CoRL", url = "https://arxiv.org/abs/2109.11978" },
  { text = "Lee et al. (2025), SimBa: simplicity bias for scaling up parameters in deep reinforcement learning, ICLR", url = "https://arxiv.org/abs/2410.09754" },
  { text = "Engstrom et al. (2020), Implementation matters in deep policy gradients: a case study on PPO and TRPO, ICLR", url = "https://arxiv.org/abs/2005.12729" },
  { text = "Eberhard, Hollenstein, Pinneri & Martius (2023), Pink noise is all you need: colored noise exploration in deep reinforcement learning, ICLR", url = "https://iclr.cc/virtual/2023/oral/12540" },
  { text = "Raffin (2020), RL Baselines3 Zoo: tuned hyperparameters for Stable-Baselines3", url = "https://github.com/DLR-RM/rl-baselines3-zoo" },
  { text = "Stable-Baselines3 documentation: reinforcement learning tips and tricks", url = "https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html" },
  { text = "Andrychowicz et al. (2017), Hindsight experience replay, NeurIPS", url = "https://arxiv.org/abs/1707.01495" },
]
+++

## Textbook

### Why a recipe {#why}

DDPG, TD3, SAC and PPO are a few dozen lines each. Around them, a working continuous-control setup makes dozens of choices that papers mention in an appendix or not at all, and those choices often decide more than the algorithm does: the same algorithm, in two careful implementations, can differ more than two algorithms do (Henderson et al., 2018; Andrychowicz et al., 2021; Huang et al., 2022). This entry puts the choices of Part 12 and the Toolbox in the order in which they usually pay off. Work down the list, change one thing at a time, and run several seeds for every comparison ([[seeds]]).

### 1. Set up the problem {#setup}

Most failures start here, before any learning.

- **Actions in $[-1, 1]$**, the same range for every dimension, rescaled to the motors' units inside the environment. One spread then means the same thing for every joint, and the network's outputs stay of order one ([[policy-spread]]).
- **A sensible action space.** For robots, joint position targets tracked by a PD controller learn faster than raw torques, and a policy that outputs zeros starts out standing rather than falling (Peng & van de Panne, 2017; Hwangbo et al., 2019). Center the targets on a default pose and allow only the range the task needs: Smith et al. (2022) found that, in simulation, their quadruped learned nothing in the full range of its joints, and learned stably within limited offsets around a standing pose.
- **Normalized observations**, with a running mean and spread per input, clipped at a few spreads ([[normalization]]). For an off-policy learner, store the raw observations and normalize them when a batch is drawn, with the current statistics: normalizing before storing keeps the same state under different values from different times, and did worse in SimBa's comparison (Lee et al., 2025).
- **Time limits are time-outs, not ends.** Most simulated tasks stop episodes after a fixed number of steps. Unless the agent knows how much time is left, that cut is not part of the world, and the target there must still include the value of the next state (Pardo et al., 2018). Gymnasium reports the two cases apart, `terminated` and `truncated`, for this reason; Rudin et al. (2022) gained 10% to 20% in return from bootstrapping at time-outs. Where the time limit is part of the task, put the time left in the observation instead.
- **A control rate that fits the body.** Acting much faster than the body moves gives a policy room to jitter, and exploration noise that cancels out ([[smooth-policies]], [[action-noise]]); acting too slowly loses control. Repeating each action for a few simulator steps is the usual adjustment.
- **A reward that says what you want** and no more, in moderate units ([[reward-design]]).

### 2. Start from a tuned default {#default}

- **Plenty of cheap, parallel simulation** (thousands of environments on a GPU): PPO, the workhorse of legged and humanoid locomotion (Rudin et al., 2022). Its defaults for continuous control: clip 0.2, GAE with $\lambda = 0.95$, $\gamma = 0.99$, a step size of $3 \cdot 10^{-4}$, about 10 passes per batch ([[ppo]], [[hyperparameters]]); observations normalized; the policy's last layer scaled down and a smallish initial spread ([[policy-spread]]).
- **Samples that are expensive** (a slow simulator, a real robot): SAC or TD3, which reuse every sample from a memory ([[sac]], [[td3]], [[which-algorithm]]). Their published settings, as in the RL Zoo, work on most tasks: start there.

Before blaming the algorithm, check that it learns a task where the answer is known, such as Pendulum, with the same code ([[debugging]]).

### 3. If it never finds the reward: exploration {#exploration}

The signature: the return stays flat, and the policy settles on doing as little as possible, because every action costs and nothing has paid yet. On continuous Mountain Car, TD3 with white noise learns to stand still ([[action-noise]]).

- **For DDPG, TD3 and SAC, colored noise**: pink noise, one sequence per episode, at the same spread as before, or for SAC in place of its samples' normal numbers. It costs nothing and is a good default (Eberhard et al., 2023): on continuous Mountain Car it took TD3 from 1 seed of 20 to the flag to 18, and SAC from none to all 20 ([[action-noise]]). Ornstein–Uhlenbeck noise is the classic alternative, red noise the extreme one.
- **Noise in the weights**: parameter noise explores with a consistent, slightly different policy each episode, provided the observations are normalized: on the car it found the flag only then ([[parameter-noise]]).
- **For PPO and A2C, gSDE**: noise that is a function of the state, resampled every few steps (4 to 8), smooth and still a Gaussian, so that on-policy methods can use it. It helped PPO on the paper's locomotion tasks; on Pendulum, which needs no help to explore, it did not ([[gsde]]). SAC can use it too where the training must be gentle, on a robot: on the car it reached the flag on 12 seeds of 20, with the smoothest training forces of all.
- **If the reward is truly sparse**, no noise is enough: shape the reward, add intrinsic rewards, or start from demonstrations ([[reward-design]], [[exploration-strategies]], [[imitation]]). If the task is to reach goals, store each missed episode again as a success at the place it did reach: hindsight experience replay taught DDPG to push and pick up objects from a reward for success alone ([[exploration-strategies]]).

### 4. If it learns, then falls apart: the critic {#critic}

The signature: the critic's values climb far above any return the agent has seen, or swing wildly, and the policy's performance collapses with them ([[debugging]]).

- Use twin critics and target networks: TD3's and SAC's defaults ([[td3]]).
- Add **layer normalization** to the critic: its values can then no longer run away on actions it has not seen ([[critic-regularization]]).
- Check the reward's scale ([[normalization]]), and lower the critic's step size.
- With more updates per step, regularize: an ensemble, dropout with layer norm, or resets ([[critic-regularization]]).

### 5. If it works in simulation and must run on hardware {#hardware}

- **Measure the jitter** of the test episodes: the mean squared change of action per step, or the spectrum's weighted frequency ([[smooth-policies]]).
- **Make the policy smooth**: CAPS's terms in the actor's loss, a penalty on the change of action in the reward, a lower control rate; a filter only if it is in place during training too ([[smooth-policies]]).
- **Make the training smooth** if training runs on the robot: gSDE or colored noise instead of white ([[gsde]]).
- **Make the policy robust**: randomize masses, frictions, gains, delays and sensor noise; push the robot; give the policy memory; simulate the motors as they are ([[robust-policies]]).

### A checklist {#checklist}

1. Actions in $[-1, 1]$, around a default pose, no wider than needed.
2. Observations normalized; time-outs bootstrapped; a sensible control rate.
3. A tuned default: PPO with many parallel environments, SAC or TD3 otherwise.
4. Flat return, standing still: pink noise (TD3, SAC), parameter noise with normalized inputs (TD3), gSDE (PPO, or SAC on hardware).
5. Values running away: layer norm in the critic, twin critics, the reward's scale.
6. Bound for hardware: measure the jitter, add CAPS or an action-rate penalty, randomize the world.

### Historical remarks {#history}

Much of this list was learned the hard way and written down late. Henderson et al. (2018) showed that seeds and implementations could change deep RL's results more than the algorithms compared; Engstrom et al. (2020) and Andrychowicz et al. (2021) traced PPO's performance to its implementation details; tuned settings were collected in libraries such as Stable-Baselines3 and its RL Zoo (Raffin, 2020). Robot learners at ETH Zurich, Google, Berkeley and elsewhere added the rest: action spaces, actuator models, randomization and smoothness.

## Card

### Idea

When a continuous-control task will not learn, work in order: set up the problem (action scale, normalization, time limits, control rate), start from a tuned default, then fix exploration, then the critic, then smoothness and robustness. Change one thing at a time, over several seeds.

::: analogy
A mechanic checks the fuel and the tires before taking the engine apart. Most cars that will not go are not broken inside.
:::

### The order {#order}

| Symptom | First things to try |
| --- | --- |
| nothing learns, on any seed | the setup: action scale, observation normalization, time-outs, the reward |
| flat return, the agent stands still | pink noise (TD3, SAC), parameter noise with normalized inputs (TD3), gSDE (PPO, or SAC on hardware) |
| learns, then collapses; values far above returns | layer norm in the critic, twin critics, the reward's scale |
| works, but the actions jitter | CAPS, an action-rate penalty, a lower control rate |
| works in simulation, fails on the robot | randomization, sensor noise, delays, memory, an actuator model |

### Pitfalls

- Tuning the algorithm before checking the setup.
- Treating time-outs as ends: the critic learns that the world stops.
- Normalizing observations before storing them in an off-policy memory.
- Changing several things at once, or judging from one seed.
- Adding a filter or a penalty after training instead of during it.

### Check yourself {#check}

::: question
An agent's episodes are cut after 1,000 steps. Why must the critic's target at the cut still include the next state's value?
---
The cut is a rule of the training loop, not of the world: the state at step 1,000 is not worth less because training stopped there. Treating it as an end teaches the critic that the world stops, which makes the same state worth different amounts depending on the clock, a clock the agent cannot see.
:::

::: question
TD3 on a task with a sparse reward learns to stand still. What would you change first, and why?
---
The exploration: white noise cancels out through the body's inertia and rarely reaches the reward. Pink noise, one sequence per episode, or parameter noise on normalized inputs, a consistent perturbed policy each episode, push in one direction long enough to get there. If even that never reaches the reward, the reward itself needs shaping or demonstrations.
:::
