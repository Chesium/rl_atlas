+++
summary = "A policy trained in one simulator learns that simulator: its exact masses, frictions, motor responses and timing. On the real machine it can fail outright. Domain randomization trains on many versions of the world instead, drawn anew each episode, with noise on the sensors, random pushes and delays; a policy with memory can then work out which world it is in. Curricula, critics and teachers that see what the robot cannot, and learned motor models complete the toolkit that took legged robots from simulation to snow and mud."
prereqs = ["policy-spread", "smooth-policies"]
sources = [
  { text = "Tobin, Fong, Ray, Schneider, Zaremba & Abbeel (2017), Domain randomization for transferring deep neural networks from simulation to the real world, IROS", url = "https://arxiv.org/abs/1703.06907" },
  { text = "Peng, Andrychowicz, Zaremba & Abbeel (2018), Sim-to-real transfer of robotic control with dynamics randomization, ICRA", url = "https://arxiv.org/abs/1710.06537" },
  { text = "OpenAI, Akkaya et al. (2019), Solving Rubik's cube with a robot hand", url = "https://arxiv.org/abs/1910.07113" },
  { text = "Hwangbo, Lee, Dosovitskiy, Bellicoso, Tsounis, Koltun & Hutter (2019), Learning agile and dynamic motor skills for legged robots, Science Robotics 4", url = "https://arxiv.org/abs/1901.08652" },
  { text = "Lee, Hwangbo, Wellhausen, Koltun & Hutter (2020), Learning quadrupedal locomotion over challenging terrain, Science Robotics 5", url = "https://arxiv.org/abs/2010.11251" },
  { text = "Rudin, Hoeller, Reist & Hutter (2022), Learning to walk in minutes using massively parallel deep reinforcement learning, CoRL", url = "https://arxiv.org/abs/2109.11978" },
  { text = "Kumar, Fu, Pathak & Malik (2021), RMA: rapid motor adaptation for legged robots, RSS", url = "https://arxiv.org/abs/2107.04034" },
  { text = "Peng, Coumans, Zhang, Lee, Tan & Levine (2020), Learning agile robotic locomotion skills by imitating animals, RSS", url = "https://arxiv.org/abs/2004.00784" },
  { text = "Pinto, Andrychowicz, Welinder, Zaremba & Abbeel (2018), Asymmetric actor critic for image-based robot learning, RSS", url = "https://arxiv.org/abs/1710.06542" },
  { text = "Pinto, Davidson, Sukthankar & Gupta (2017), Robust adversarial reinforcement learning, ICML", url = "https://arxiv.org/abs/1703.02702" },
  { text = "Smith, Kostrikov & Levine (2022), A walk in the park: learning to walk in 20 minutes with model-free reinforcement learning", url = "https://arxiv.org/abs/2208.07860" },
  { text = "Sadeghi & Levine (2017), CAD2RL: real single-image flight without a single real image, RSS", url = "https://arxiv.org/abs/1611.04201" },
  { text = "Andrychowicz et al. (2017), Hindsight experience replay, NeurIPS", url = "https://arxiv.org/abs/1707.01495" },
]
+++

## Textbook

### The reality gap {#gap}

A simulator is a model, and no model is the machine. Links weigh a little more or less, joints have friction nobody measured, motors respond with a delay, sensors are noisy. Sent the same sequence of joint targets, a real Fetch arm and its simulated model moved visibly differently (Peng et al., 2018). A policy trained in one simulator learns that simulator, flaws included: reinforcement learners are good at finding behavior that works only because of the simulator's quirks, and such behavior fails on the robot.

There are two ways around the gap. One is to learn on the machine itself, which takes a sample-efficient learner and care for the hardware: gSDE trained SAC on real robots for this reason ([[gsde]]), and SAC with a regularized critic taught a quadruped to walk in 20 minutes ([[critic-regularization]]). The other, behind most of today's legged and dexterous robots, is to train in simulation on purpose for the gap: this entry.

### Domain randomization {#randomize}

Instead of one simulator, train on a distribution of them. Collect the quantities nobody knows exactly into a vector of parameters $\boldsymbol\mu$ (masses, frictions, gains, delays), draw a new $\boldsymbol\mu$ at the start of every episode, and maximize the return averaged over them:
$$\max_{\pol\pi}\ \mathbb E_{\boldsymbol\mu \sim \rho}\Big[\,\mathbb E_{\pol\pi, \boldsymbol\mu}\Big[\sum_t \gam^t\,\rew{R_{t+1}}\Big]\Big]. \label{eq-randomized}$$
If the real machine looks to the policy like one more draw from $\rho$, the policy works on it without ever having seen it. Tobin et al. (2017) named the idea, randomizing textures, lighting and camera placement so that object detectors trained only on rendered images worked on real camera images.

Peng et al. (2018) randomized the dynamics. To push a puck to a target with a Fetch arm, they drew 95 parameters per episode: the mass of every link (from a quarter to four times its nominal value), the damping of every joint (from 0.2 to 20 times), the puck's mass, friction and damping, the table's height and the controller's gains (from half to twice), with the time between actions and noise on every sensor redrawn at every step. A recurrent policy trained only in simulation succeeded on the real robot in 89% of trials, as often as in simulation (91%); a feedforward network trained without randomization never succeeded on the robot. Leaving out single parameters showed what mattered most: without random delays the real success rate fell to 29%, without sensor noise to 25%. It even kept 91% when a bag of chips was taped under the puck, changing its friction.

What to randomize: whatever is uncertain and matters. In practice, masses and inertias, friction, motor strength and gains, delays, and sensor noise, each over a range wide enough to cover the real value. Ranges can also grow as the policy masters them: OpenAI's automatic domain randomization widened each range whenever the policy succeeded at its edge, which took a robot hand to solving a Rubik's cube after the equivalent of thousands of years of simulated experience (OpenAI, 2019).

### Memory: working out which world it is {#memory}

A policy that sees only the current state must find actions that work in every world of the distribution at once: a cautious compromise. A policy with memory can do better. How the arm responded to the last few commands says how heavy it is and how much the joints resist, and a recurrent network can learn to read that and adapt, without anyone naming the parameters it infers. In Peng et al.'s pushing task, a memoryless network trained with randomization succeeded on the robot in 67% of trials, the same network with the last 8 states and actions as input in 70%, and a recurrent (LSTM) policy in 89%.

Lee et al. (2020) gave a quadruped's controller two seconds of its own joint and body measurements, through a temporal convolutional network: the longer the memory, the higher the steps it could climb and the better it resisted being pushed. Another way is to compress the world's parameters, during training, into a small vector the policy receives, and to estimate that vector from recent history once deployed (RMA, Kumar et al., 2021), or to adapt only that vector on the real robot with a few trials (Peng et al., 2020).

### Teachers and critics that see more {#privileged}

In simulation, everything is known: the terrain under each foot, the contacts, the friction, the push being applied. Two tools use that knowledge during training only:

- **A critic that sees everything.** The critic is not deployed, so it may take any input: the simulator's full state, the randomized parameters. Its values are then more accurate, and so are the actor's gradients, while the actor itself sees only what the robot measures (Pinto et al., 2018; Peng et al., 2018).
- **A teacher and a student.** Lee et al. (2020) first trained a teacher policy, by reinforcement learning, that saw the terrain and contacts. A student that saw only the robot's own measurements then learned to imitate it. Trained directly by reinforcement learning, the same student failed to learn. Trained only on rigid hills, steps and stairs, the student walked ANYmal robots through mud, snow, moss, rubble, dense vegetation and running water, and still walked and climbed steps carrying a 10 kg payload, 23% of the robot's weight, that it had never felt in simulation.

### Noise, pushes, delays and motors {#perturb}

- **Sensor noise** at the level measured on the real sensors, and **delays** between observation and action: in Peng et al.'s ablation, the two most important things to randomize. A pick-and-place policy trained on exact simulated states succeeded in 2 of 5 trials on a real Fetch arm, where its camera estimated the box's position with small errors; retrained with 1 cm of noise on its observations, it succeeded in 5 of 5 (Andrychowicz et al., 2017).
- **Random pushes** teach recovery: Rudin et al. (2022) shoved each simulated robot every 10 seconds, changing its velocity by up to 1 m/s, and drew the ground's friction per robot.
- **Adversaries** generalize pushes: a second policy, trained to make the first fail, chooses the disturbance forces (Pinto et al., 2017).
- **Motor models.** Electric motors with gearboxes or springs do not deliver the torque a simulator assumes, nor at once. Hwangbo et al. (2019) recorded ANYmal's actuators for under 4 minutes and trained a small network to predict their torque from the recent position errors and velocities, then simulated the robot with it. Policies trained with an ideal motor model, or with an analytical one tuned by hand for over a week, could not take a single step on the robot without falling; with the learned model, the policy beat the robot's best hand-designed controller, using less torque and power.

### Curricula {#curriculum}

A robot that falls at once learns nothing about walking on stairs. A curriculum starts easy and raises the difficulty with the policy's skill. Rudin et al. (2022) trained 4,096 simulated ANYmal robots at once on one GPU, each on a terrain of its own type and level: a robot that walked past the edge of its terrain moved up a level, one that covered less than half the commanded distance moved down, and one that solved the hardest level went back to a random one, to keep the mix. A policy for flat ground trained in under 4 minutes, one for slopes, stairs and obstacles in 20, and it walked on the real robot. Lee et al. (2020) kept terrains of medium difficulty with a particle filter; without that curriculum their teacher learned less and succeeded less often on test terrain.

### What it costs {#cost}

- **A harder problem.** The policy must succeed in every world of the distribution: it learns more slowly, and with ranges far wider than reality it becomes needlessly cautious.
- **Compute.** Peng et al.'s policy took 100 million samples, 8 hours on a 100-core cluster; massively parallel simulators (Rudin et al., 2022) brought such budgets down to minutes on one GPU.
- **Smooth, gentle actions still matter**: a policy that is robust to the world can still jitter and overheat its motors ([[smooth-policies]]).

### Historical remarks {#history}

Robotics had randomized simulations for robust controllers before deep learning; the names and the scale are recent. Tobin et al. (2017) and Sadeghi and Levine (2017) transferred vision from rendered images; Peng et al. (2018) transferred dynamics with recurrent policies; OpenAI's dexterous hand (2018–2019) combined both at great scale, and automated the ranges. ETH Zurich's ANYmal work added learned actuator models (Hwangbo et al., 2019), teachers and students (Lee et al., 2020) and massively parallel training with curricula (Rudin et al., 2022), the recipe most legged and humanoid robots are now trained with.

## Card

### Idea

Train on many worlds, not one: draw masses, frictions, gains, delays and sensor noise anew each episode, push the robot now and then, and give the policy memory to infer which world it is in. The real machine becomes one more draw.

::: analogy
A pilot trained on one simulator with perfect weather and a perfect aircraft panics at the first gust. A pilot trained in every weather, on aircraft that each handle a little differently, flies the real one as just another variation.
:::

### What to randomize {#what}

| Quantity | An example range |
| --- | --- |
| link masses | ×0.25 to ×4 (Peng et al., 2018) |
| joint damping | ×0.2 to ×20 (Peng et al., 2018) |
| controller gains | ×0.5 to ×2 (Peng et al., 2018) |
| ground friction | 0.5 to 1.25 (Rudin et al., 2022) |
| time between actions, sensor noise | redrawn every step |
| pushes | up to 1 m/s, every 10 s (Rudin et al., 2022) |

### Pitfalls

- Ranges that do not cover the real values: the gap remains.
- Ranges far wider than needed: a slow learner and a timid policy.
- A memoryless policy over a wide distribution: it can only compromise.
- Randomizing the dynamics but simulating ideal motors: the actuators are often the largest gap.
- Judging robustness on the training distribution: test on parameters outside it.

### Check yourself {#check}

::: question
Why does a policy with memory transfer better than one without, when both are trained on the same randomized worlds?
---
Without memory, the policy must use one action per state for every world in the distribution, a compromise. With memory, it can infer the world from how it responded to recent actions, as a driver feels a slippery road, and act for that world: in Peng et al.'s experiment, 89% on the real robot against 67%.
:::

::: question
Why may the critic see the simulator's hidden parameters when the actor may not?
---
Only the actor runs on the robot, where those parameters are unknown. The critic exists only during training, in simulation, where everything is known; seeing more makes its values, and so the actor's gradients, more accurate.
:::
