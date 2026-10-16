+++
summary = "The critic of DDPG, TD3 and SAC is a network fit to its own moving targets, on the few actions its memory holds, and the actor climbs whatever errors it makes. Target networks and twin critics were the first fixes. Since then, weight decay, layer normalization, dropout, ensembles, batch normalization without a target network, spectral normalization and periodic resets have let learners take many updates per step and use much larger critics: the recent state of the art in continuous control comes as much from regularized critics as from new algorithms."
prereqs = ["td3", "sac", "target-network"]
lab = "ddpg-pendulum"
sources = [
  { text = "Lillicrap et al. (2016), Continuous control with deep reinforcement learning, ICLR", url = "https://arxiv.org/abs/1509.02971" },
  { text = "Chen, Wang, Zhou & Ross (2021), Randomized ensembled double Q-learning: learning fast without a model, ICLR", url = "https://arxiv.org/abs/2101.05982" },
  { text = "Hiraoka, Imagawa, Hashimoto, Onishi & Tsuruoka (2022), Dropout Q-functions for doubly efficient reinforcement learning, ICLR", url = "https://arxiv.org/abs/2110.02034" },
  { text = "Bhatt, Palenicek, Belousov, Argus, Amiranashvili, Brox & Peters (2024), CrossQ: batch normalization in deep reinforcement learning for greater sample efficiency and simplicity, ICLR", url = "https://arxiv.org/abs/1902.05605" },
  { text = "Ball, Smith, Kostrikov & Levine (2023), Efficient online reinforcement learning with offline data, ICML", url = "https://arxiv.org/abs/2302.02948" },
  { text = "Bjorck, Gomes & Weinberger (2021), Towards deeper deep reinforcement learning with spectral normalization, NeurIPS", url = "https://arxiv.org/abs/2106.01151" },
  { text = "Nikishin, Schwarzer, D'Oro, Bacon & Courville (2022), The primacy bias in deep reinforcement learning, ICML", url = "https://arxiv.org/abs/2205.07802" },
  { text = "Sokar, Agarwal, Castro & Evci (2023), The dormant neuron phenomenon in deep reinforcement learning, ICML", url = "https://arxiv.org/abs/2302.12902" },
  { text = "Nauman, Ostaszewski, Jankowski, Miłoś & Cygan (2024), Bigger, regularized, optimistic: scaling for compute and sample-efficient continuous control, NeurIPS", url = "https://arxiv.org/abs/2405.16158" },
  { text = "Lee et al. (2025), SimBa: simplicity bias for scaling up parameters in deep reinforcement learning, ICLR", url = "https://arxiv.org/abs/2410.09754" },
  { text = "Kuznetsov, Shvechikov, Grishin & Vetrov (2020), Controlling overestimation bias with truncated mixture of continuous distributional quantile critics, ICML", url = "https://arxiv.org/abs/2005.04269" },
  { text = "Smith, Kostrikov & Levine (2022), A walk in the park: learning to walk in 20 minutes with model-free reinforcement learning", url = "https://arxiv.org/abs/2208.07860" },
  { text = "Ba, Kiros & Hinton (2016), Layer normalization", url = "https://arxiv.org/abs/1607.06450" },
  { text = "Miyato, Kataoka, Koyama & Yoshida (2018), Spectral normalization for generative adversarial networks, ICLR", url = "https://arxiv.org/abs/1802.05957" },
  { text = "Loshchilov & Hutter (2019), Decoupled weight decay regularization, ICLR", url = "https://arxiv.org/abs/1711.05101" },
  { text = "Barth-Maron et al. (2018), Distributed distributional deterministic policy gradients, ICLR", url = "https://arxiv.org/abs/1804.08617" },
  { text = "Dohare, Hernandez-Garcia, Lan, Rahman, Mahmood & Sutton (2024), Loss of plasticity in deep continual learning, Nature 632", url = "https://www.nature.com/articles/s41586-024-07711-7" },
  { text = "Plappert et al. (2018), Parameter space noise for exploration, ICLR", url = "https://arxiv.org/abs/1706.01905" },
  { text = "Andrychowicz et al. (2021), What matters in on-policy reinforcement learning? A large-scale empirical study, ICLR", url = "https://arxiv.org/abs/2006.05990" },
]
+++

## Textbook

### What goes wrong in a critic {#why}

An actor–critic for continuous actions trusts its critic twice: the critic's estimates are its targets ([[bootstrapping]]), and the critic's slope is the direction the actor moves ([[ddpg]]). Three things make that trust fragile:

- **Moving targets.** The critic is fit to targets computed with its own estimates, which change with every update: the deadly triad of function approximation, bootstrapping and off-policy data ([[deadly-triad]]).
- **A thin slice of actions.** The memory holds the actions the agent took; the target asks about the action the current actor would take, which may be nowhere near them. What the network says there is extrapolation, and nothing stops it from being too high.
- **An actor that climbs the errors.** The actor moves toward whatever the critic rates highest, so the critic's overestimates are exactly where it goes, and where the next targets come from ([[td3]]).

More gradient steps per environment step make the critic learn faster from each sample, and make all three worse. SAC with 20 updates per step learned poorly on MuJoCo's Ant and Humanoid: its errors were large, unstable, and different from one state to the next (Chen et al., 2021).

### The first fixes {#first}

The atlas has met the classics already. A slowly following target network keeps the targets still for a while ([[target-network]]); the smaller of two critics' estimates makes the target cautious, and blurring the target action keeps it off narrow peaks ([[td3]]); a Huber loss and a clipped gradient bound the steps ([[normalization]]). TD3 and SAC use all of these by default. The tools below come on top of them.

### Weight decay {#decay}

Weight decay adds a penalty $\frac{\knob\lambda}{2}\|\mathbf w\|^2$ to the critic's loss, so that every step also pulls every weight a little toward 0: large weights, and the sharp functions they make, have to earn their keep. DDPG's paper put $\knob\lambda = 10^{-2}$ on its critic (Lillicrap et al., 2016), and parameter noise kept it (Plappert et al., 2018). TD3, SAC and Stable-Baselines3 left it out; it came back in BRO's large critics (below). Added to the loss of an Adam optimizer, the penalty is divided by Adam's running scale like any gradient; AdamW applies the decay to the weights directly instead (Loshchilov & Hutter, 2019). Alone, weight decay is a weak regularizer for critics: when RLPD compared it with dropout and an ensemble, the ensemble did best on every task and weight decay on none (Ball et al., 2023), and no amount of it rescued a critic overtrained on its first experiences (Nikishin et al., 2022). The trainer of this guide has it as a knob, $\knob\lambda$, for DDPG, TD3 and SAC.

### Layer normalization {#layernorm}

Layer normalization rescales the units of a layer, for each input separately, to mean 0 and spread 1, before a learned gain and offset (Ba et al., 2016). In a critic it does something specific: the last hidden layer's activations now have a fixed size, so the critic's output can be no larger than its last layer's weights allow, whatever the state and action. An action far from any in the memory can no longer get an arbitrarily large value. RLPD showed it on SAC learning with offline data: without layer normalization the critic's values diverged by orders of magnitude on sparse tasks; with it, they stayed in range and the agent learned (Ball et al., 2023).

Layer normalization is now in many critics that take several updates per step: it is half of DroQ's critic and the core of BRO's and SimBa's (below). It costs little, which makes it the usual first thing to try when a critic's values run away.

### Batch normalization, without a target network {#batchnorm}

Batch normalization normalizes each unit over the batch instead, with running averages for later use. DDPG's paper used it in the critic's layers before the action enters, and later critics left it out; DroQ's authors found it did not help at 20 updates per step. The trouble is the target network: it evaluates the next states with the current policy's actions, pairs its running averages never saw. CrossQ (Bhatt et al., 2024) found a way: drop the target network, and push the batch's current pairs $(s, a)$ and next pairs $(s', \pol{\pi(s')})$ through the critic together, so the normalization's statistics cover both. With batch renormalization and a wider critic (2,048 units), SAC with one update per step then matched REDQ and DroQ, which take 20, with 20 times fewer gradient steps and about 4 times less time. With layer normalization in its place, CrossQ fell back to plain SAC's level.

### Spectral normalization {#spectral}

Spectral normalization divides each layer's weights by their largest singular value, so that no layer can stretch its input by more than a factor of one: the network's output changes at most as fast as its input (Miyato et al., 2018, for the discriminators of generative adversarial networks). Bjorck et al. (2021) traced why larger networks failed in actor–critics: the actor's gradient passes through the critic, as a generator's passes through its discriminator, and in deeper critics it exploded. With spectral normalization on the inner layers of both networks, the deeper networks trained stably and finally helped: a DDPG-based agent walking from pixels scored 477 with its usual network, 6 with a deeper one, and 740 with the deeper one normalized.

### Ensembles and dropout {#ensembles}

**REDQ** (Chen et al., 2021) keeps an ensemble of $N = 10$ critics, all trained on the same targets, and computes each target as the minimum over a random subset of $M = 2$ of them. The ensemble averages the errors down; the random pair keeps the target cautious, about as cautious as TD3's twin critics. With 20 updates per step, REDQ was as sample-efficient as the model-based MBPO, and reached given scores on MuJoCo about 5 times sooner than SAC, at the price of training ten critics.

**DroQ** (Hiraoka et al., 2022) replaces the ensemble by dropout: two critics whose hidden units are switched off at random (1% of them) at every pass, each pass a slightly different network, with layer normalization after the dropout to keep training stable. It matched REDQ's sample efficiency with a fifth of its parameters and less than half its time per update; without either the dropout or the layer normalization, it fell behind on Ant and Humanoid. With DroQ's recipe and 20 updates per step, a quadruped robot learned to walk on real ground, grass and a forest trail in about 20 minutes (Smith et al., 2022); in their simulated comparison, layer normalization alone did better than REDQ.

**Distributional critics** predict the return's distribution rather than its mean ([[dqn-extensions]]). TQC (Kuznetsov et al., 2020) pools the quantiles predicted by several such critics and drops the largest few from the target: how many it drops sets how pessimistic the target is, in finer steps than a minimum over critics allows. D4PG combined a distributional critic with $n$-step returns and many parallel actors for DDPG (Barth-Maron et al., 2018).

::: example {#ex-redq} How pessimistic is a random pair?
Ten critics rate the next state's action at $-5.2$, $-4.8$, $-4.1$, $-3.9$, $-3.6$, $-3.3$, $-3.0$, $-2.7$, $-2.2$, $-1.5$; their mean is $-3.43$. The smallest of all ten, $-5.2$, would make the target very pessimistic, and on MuJoCo such full minima made the critics' errors run away downward. A random pair's minimum is the $k$-th smallest value with probability $(10 - k)/45$: on average $-4.11$, a little below the mean. $M$ sets the pessimism: $M = 1$ is the mean on average, $M = 2$ is cautious, $M = 10$ is the worst case every time.
:::

### More updates per step, and the loss of plasticity {#plasticity}

The **update-to-data ratio** (or replay ratio) is the number of gradient steps per environment step: 1 in TD3 and SAC, 20 in REDQ and DroQ, 10 in BRO. Raising it learns more from each sample, and exposes a problem of its own:

- **The primacy bias.** Nikishin et al. (2022) trained SAC 100,000 times on its first 100 transitions; it never recovered, even after a million new ones. SAC with 9 updates per step failed on a task where a fresh agent, given the failed agent's memory, learned quickly: the data was fine, the networks had lost the ability to learn from it. Their remedy is **resets**: every 200,000 steps, re-initialize the networks (for SAC from states, all of them), keep the memory. Performance dips and recovers within a few thousand steps, and ends higher: on the DeepMind Control tasks they used, resets lifted SAC's interquartile mean from 501 to 656, and at 32 updates per step they more than doubled it.
- **Dormant units.** Sokar et al. (2023) counted the hidden units whose activation is nearly zero for every input: their share grows as training goes on, in DQN and in SAC's actor and critic alike, and in DQN faster with more updates per step. ReDo recycles them: it re-initializes a dormant unit's incoming weights and zeroes its outgoing ones, so the network's output does not jump. The Lab's network strip marks the units that never fire over the map's states: dead units, which receive no gradient and stay dead.

Both are forms of a **loss of plasticity**: a network trained on a long, changing stream of targets gradually loses its capacity to learn new ones, as in continual supervised learning (Dohare et al., 2024).

### Bigger critics {#bigger}

Small networks, two layers of 256 units, were the rule in continuous control for years: making them larger made things worse (Andrychowicz et al., 2021; Bjorck et al., 2021). With enough regularization, that changed:

- **BRO** (Nauman et al., 2024) trains a critic of about 5 million parameters, seven times SAC's, built from layers each followed by layer normalization, with residual connections, weight decay and periodic resets, and 10 updates per step. It was the first model-free method to learn near-optimal policies on the DeepMind Control Suite's dog and humanoid tasks. A larger critic helped more than more updates per step, at a lower cost in time; a larger actor did not help. And with this much regularization, the twin critics' minimum became unnecessary: BRO's targets average its two critics, and did better for it.
- **SimBa** (Lee et al., 2025) builds the same ingredients into one architecture: observations normalized with running statistics, residual blocks with layer normalization, and a layer normalization before the output. Plain SAC with SimBa networks improved steadily as they grew from 0.1 to 17 million parameters, where SAC with ordinary networks got worse; it kept improving with more updates per step even without resets.

### What to reach for {#which}

- **Start with the defaults**: target networks, twin critics, target smoothing (TD3) or SAC's equivalents. They cost nothing.
- **Values running away**, or many updates per step: add **layer normalization** to the critic.
- **Samples are expensive** (a real robot): more updates per step, with an ensemble (REDQ) or dropout and layer normalization (DroQ); or batch normalization without a target network (CrossQ), which gets there with one update per step.
- **Long runs at a high update ratio**: **resets**, keeping the memory.
- **A larger critic**: only with normalization (layer norm, as in BRO and SimBa, or spectral norm), and weight decay or resets.

### Historical remarks {#history}

DDPG brought weight decay and batch normalization to the critic (Lillicrap et al., 2016), after DQN's target network; TD3 added the twin critics (Fujimoto et al., 2018). The push for sample efficiency after MBPO (Janner et al., 2019), a model-based method that took 20 updates per step, led to REDQ and DroQ in 2021, which reached it without a model. From 2022, work on why networks stop learning (primacy bias, dormant units, plasticity) and on scaling (spectral normalization, BRO, SimBa, CrossQ) made the critic's architecture a main lever of progress, next to the algorithm.

## Card

### Idea

Keep the critic well behaved, because the actor climbs its errors and the targets are built from them: target networks and twin critics first; then layer normalization, dropout, ensembles, batch normalization without targets, spectral normalization, weight decay, and resets. With them, critics can take many updates per step and grow large.

::: analogy
A guide who has walked only one path, asked about every other path in the forest, and believed: give the guide colleagues to check with (ensembles), a habit of modesty about places never seen (normalization), and now and then a fresh start with the old notes (resets).
:::

### The tools {#tools}

| Tool | What it does | Used by |
| --- | --- | --- |
| target network, twin critics | still, cautious targets | DQN, TD3, SAC |
| weight decay | pulls weights toward 0 | DDPG, BRO |
| layer normalization | bounds the critic's output | DroQ, RLPD, BRO, SimBa |
| batch normalization | normalizes over the batch; works without a target network | CrossQ |
| spectral normalization | bounds each layer's gain | deeper actor–critics |
| ensembles, random minimum | average the errors, stay cautious | REDQ, RLPD |
| dropout | a cheap ensemble | DroQ |
| resets, recycled units | restore the ability to learn | SAC with resets, ReDo, BRO |

### Pitfalls

- Raising the updates per step without regularizing the critic: faster learning at first, then values that run away.
- Batch normalization in a critic that keeps a target network: the target sees pairs its statistics never saw.
- A minimum over many critics: far too pessimistic.
- Resetting the memory along with the networks: that is starting over.
- A larger critic without normalization: worse, not better.

### Check yourself {#check}

::: question
Why does layer normalization help a critic most on actions far from the memory?
---
After normalization, the last hidden layer's activations have a fixed size, so the output is bounded by the last layer's weights whatever the input. An action the critic never saw cannot get an arbitrarily large value, and the actor cannot run toward a value that is not there.
:::

::: question
REDQ's target is the minimum over a random pair from ten critics. Why not the minimum over all ten?
---
The minimum of ten estimates is far below their mean: the targets would be very pessimistic, and that error compounds through bootstrapping just as overestimation does. A random pair is about as cautious as TD3's twin critics, while the ensemble of ten still averages the errors down.
:::

::: question
A SAC agent trained with many updates per step stalls. Its memory, given to a new agent, lets the new agent learn quickly. What went wrong, and what is the fix?
---
The primacy bias: the networks overfit the first experiences and lost the ability to learn from later ones; the data was fine. Resetting the networks every so often, while keeping the memory, gives the agent its plasticity back.
:::
