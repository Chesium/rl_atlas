# RL Atlas: the plan

## Goal

A guide for someone who knows a little about reinforcement learning and wants a clear, complete view of
it. The algorithms are the main course; everything that works alongside them (γ, bias vs variance, GAE,
exploration…) is explained too. It must be complete, clean, fun to use and appealing at first sight:
you learn by watching things happen, not only by reading.

## How it teaches

- Almost every update is *old guess + step size × (target − old guess)*; algorithms differ mainly in the target.
- Each algorithm is its parent plus one change; perks and flaws follow from that change.
- Every algorithm is read three ways, in this order: **Story** (get the idea), **Textbook** (the theory, like a book
  chapter: complete, dry, section by section, building on the stations before it on its line), **Card** (the summary,
  for a quick look). Then the **Lab** shows it learning. Concepts use the same views where they help.
- A story shows a very good run: a seed picked because it proves the point clearly.
- The Lab shows the odds. Everything here is stochastic, so each experiment says how often its settings succeed over
  many seeds, and a sweep shows how that rate moves with a knob: where the good settings are, and what a bad one
  costs. Bad settings are run on purpose, to be understood, not as warnings.
- The tabular / function-approximation split is a visible line on the map ("Learning with tables" / "Learning at scale").
- Sources: Sutton & Barto (2018), OpenAI Spinning Up and the original papers, in our own words.

The full curriculum, 140 stations in 19 parts, lives in [content/map.toml](content/map.toml).

## Look and feel

- One color per quantity, everywhere: value blue, reward gold, policy violet, surprise (δ, advantage) red; knobs stay in ink.
  The palette was checked with a color validator in both themes (marks and text separately).
- Values on tiles use a diverging scale: orange below zero, gray at zero, blue above.
- Motion explains cause: a page opens out of the station you click, formulas that build themselves, values that ripple back
  from the goal, sparks where an update happens, an agent that hops, falls and respawns.
- Light and dark themes; reduced motion follows the operating system setting.

## The Lab

- Tabular and linear methods, and policy gradients (softmax and Gaussian policies, from REINFORCE to PPO), run live in the browser:
  a whole run is computed at once (milliseconds), then played like a video and replayable line by line.
- Neural-network methods (DQN, A2C, PPO, TRPO, DDPG, TD3, SAC) are **recorded runs** made offline by the page's own
  trainer (`lab/deep/`, run in Node by `recorder/deep.js`; none of RL_lib or Centipede) and played back with the same
  player, each over 20 seeds, with a sweep of its main knobs that shows how the odds of success move with each. The
  networks are small (two hidden layers of 64 units by default), with gradients by hand and math every engine rounds
  alike: no library to install, every recording reproducible bit for bit from its seed, and any other seed or setting
  trainable in the page on request.
- Worlds are picked so that values and policies stay pictures: grids, random walks, Blackjack, Mountain Car,
  Pendulum, the short corridor, the throw, CartPole with value and probability bars.
- Every racer is on screen at once, at the largest size that fits: each arrangement (how many across) is laid out and
  measured. The panes stay under the header, in sight with the knobs, when they are wide enough to read (400 px) or
  not much narrower than they could be; otherwise they take the whole window and playing scrolls them into view. The
  algorithm column (pseudocode and "This step") folds into a tab at the edge, and the panes grow into its room.

## Technology (decided)

| Part | Choice | Why |
| --- | --- | --- |
| The guide | one offline HTML file, plain JavaScript, SVG and canvas | animation, hover-linking and scrubbing need to run in the browser at 60 fps; opens with a double-click |
| Math | KaTeX, vendored | standard, fast, offline, supports the color and link macros |
| 3D (M4) | a small canvas surface renderer of our own | one surface of a few hundred tiles needs no library; keeps the file small and offline |
| Content | Markdown + TOML front matter, built by `build.py` | readable and editable; Python standard library only |
| Tests | `node --test`, one file | checks the Lab against the book's results |
| Deep RL runs (M6) | Python recorder → data files played in the page | training is heavy and offline; playback is light |

Not a Python app (Streamlit and similar): they redraw on the server for every interaction, so the
animations and hover effects this guide relies on would not be smooth.

## Milestones

- [x] **M0 · Look and feel**: the shell, the metro map, SARSA and Q-learning (story, card), the cliff-walking race in the Lab.
  After review: the Textbook view, with live figures computed by the Lab.
- [x] **M1 · Foundations**: Parts 0–1 (16 entries; every Part 1 concept has a Textbook, seven have a Story) with
  the "be the agent" game, the discount slider, the loop, timeline and MDP scenes, and the gridworld and robot computed
  exactly; the map's family-tree and unified views and its filters. Parents and labels now live in `map.toml`.
- [x] **M2 · Tabular core**: Bandits, DP, Monte Carlo, the rest of TD; Lab worlds (gridworld, Frozen Lake, random walk, Blackjack), filmstrip, seeds, sandbox.
  Parts 2–5 are written: 25 new entries, each with a Textbook and a Card, 18 with a Story whose numbers come from
  Lab runs. The book's figures are recomputed live by the Lab (the testbed, Figure 4.1, policy iteration on Frozen
  Lake, the Blackjack maps, importance sampling, the random walk, step sizes on the cliff, maximization bias), and
  a final pass retold the passages that still followed the book's wording too closely.
- [x] **M3 · Traces and planning**: n-step, TD(λ) with glowing traces, Dyna.
  Parts 6–7 are written: 9 new entries (n-step TD and SARSA, the λ-return, TD(λ), SARSA(λ), models and planning,
  Dyna-Q, Dyna-Q+, prioritized sweeping), each with a Textbook and a Card, 7 with a Story on Lab runs. The Lab runs
  them all, with replay checked by the tests: eligibility traces glow and fade on the tiles, the n-step window shows as
  a bracket, planning updates as dashed sparks (in queue order for prioritized sweeping), fog hides what a model has
  never seen, and maze walls move mid-run. Eight new Lab presets; new worlds: the 19-state random walk, the Dyna,
  blocking and shortcut mazes. Figures recomputed live: Sutton & Barto's 7.2, 7.4, 8.2–8.5, 8.7, 12.3 and 12.6.
- [x] **M4 · Function approximation**: features, the "touch a tile" demo, Mountain Car in 3D, the deadly triad.
  Part 8 is written: 8 entries (why tables break, features, value error, gradient Monte Carlo, semi-gradient TD and
  SARSA, generalization, the deadly triad), each with a Textbook and a Card, 7 with a Story on Lab runs. The Lab learns
  with features (groups, tile coding, polynomials, Fourier cosines, tables, or a world's own) built from scaled
  coordinates; new worlds: the 1000-state walk with its exact values and visit shares, Mountain Car, Baird's
  counterexample. New views: the walk as one value line with the footprint of each update, Mountain Car with a
  cost-to-go landscape you can turn (or a map from above), Baird's star with its weights on a log scale. Five new
  presets. Figures recomputed live: Sutton & Barto's 9.1, 9.2, 9.5, 9.8, 9.10, 10.1–10.3 and 11.2, plus touch a tile.
- [x] **M5 · Policy gradients, live**: gradient bandit, short corridor, REINFORCE, actor–critic, A2C; GAE and PPO demos.
  Part 10 is written: 11 entries (why learn a policy, softmax and Gaussian policies, the policy gradient theorem,
  REINFORCE, REINFORCE with baseline, actor–critic, A2C and A3C, the entropy bonus, GAE, TRPO, PPO), each with a Textbook
  and a Card, 10 with a Story on Lab runs. The Lab learns policies directly: softmax and Gaussian policies over its
  features; REINFORCE with and without a baseline; actor–critic with eligibility traces; and the batch methods A2C, TRPO
  (closed-form natural gradient and line search) and PPO, with GAE advantages and an entropy bonus, played by several
  workers at once, with replay checked by the tests. New worlds: the short corridor, its landscape worked out exactly; the
  throw, a continuous action; two gems. New views: the corridor above its value landscape, the throw with its bell curve;
  grids show workers, TD errors and a batch's advantages. Figures computed exactly or live: Sutton & Barto's Example 13.1
  and Figures 13.1 and 13.2, single-episode gradient estimates, softmax and Gaussian scores to play with, the critic's
  step size, the entropy bonus, GAE's weights and λ, and TRPO's trust region and PPO's clip on the corridor. Stories
  gained chart legends and partial replays.
- [x] **M6 · Odds and recorded runs**: every experiment shows how often its settings succeed; the recorder; DQN, A2C,
  TRPO and PPO on CartPole and Pendulum. Mountain Car is dropped from the deep runs: with random exploration the car
  almost never reaches the flag, so a network has nothing to learn from.
  Done: Mountain Car without optimism (a Lab, linked from Part 8: with γ = 0.99 no run ends up getting out when the values
  start at or below −100, the value of paying 1 forever; just above it the push to explore is feeble, and from −80 up every
  run gets out); the odds in the Lab (success rules on 26 presets, calibrated over 30 to 100 seeds; a tally of the runs that end
  well; a sweep of any knob, charting the share of runs that end well and their score against its values); fixes
  from profiling every preset over many seeds (Frozen Lake's shown seed, two intros, the odds of the failures the
  PPO, TRPO and REINFORCE stories show); the recorder (`recorder/`: NumPy networks checked against numerical gradients, DQN with switchable
  replay, target network, double, dueling and prioritized replay; A2C, PPO and TRPO with exact Fisher-vector products),
  tuned settings (DQN balances CartPole with a squared loss and lr 5·10⁻⁴; A2C, PPO and TRPO balance it within the
  first 20–40% of their training; PPO swings Pendulum up), the first two recordings, their decoder and a CartPole view.
- [x] **M7 · The rest**: continuous control, toolbox, where next, quizzes everywhere, polish.
  Done: Parts 11–13 written (95 of 95 stations); every story reviewed for calm visuals and concept first (checkpoints
  instead of fast replays); new stories for DPG (a deterministic aim on the throw, with a Lab), on/off-policy,
  exploration and bias–variance; deep recordings over 20 seeds, and their sweeps for DQN, PPO on Pendulum and TRPO.
  Then: stories for experience replay, the target network, offline RL, imitation, normalization, model-based deep RL
  and MCTS (UCT on a tic-tac-toe position, with a tree view and the odds of flat Monte Carlo against the tree); sweeps over
  10 to 20 seeds per value for every recorded algorithm, folded into the texts that quote them (A2C and PPO on CartPole,
  DQN's Huber knob, DDPG's τ, noise and reward scale, TD3's delay and target noise, SAC's α and τ); a third quiz question
  wherever an entry had two; a one-by-one review of every textbook against Sutton & Barto and newer sources; a review
  of every story and card: stories play at human pace (a move every 300–400 ms, long episodes shown by their first moves
  and their end), wordy steps cut to the idea and one telling number, and every step's picture checked.
  The map's other views completed: the tree gives every line its own tree of what builds on what, stacked in reading
  order, and the unified view places all 37 algorithms (bandits in a strip of their own); the panel became a view switch,
  a legend that counts what you have read and lights up a line, and the filters. The hand shows only while dragging; a
  click opens the page out of the station instead of flying the camera in.
  Decided:
  - No story, on purpose: which-algorithm (a decision guide, not a run), pg-theorem (a derivation; REINFORCE and the
    baseline show it at work), multi-agent and RLHF (they need worlds with several learners or a learned reward, beyond
    the guide's), debugging until a fair bug-hunt run is found.

- [x] **M8 · Honest runs**: stories show a run chosen offline that sells the idea; the Lab lets anyone test settings
  and seeds. One phase at a time, each reviewed with screenshots before the next. The deep presets (recorded on
  CartPole and Pendulum) wait until the live ones work; they then adopt the same method.

  **Principles**
  - *Stories sell the idea, with runs chosen offline.* For every story run, a script searches knobs and seeds
    offline, over many seeds, for a good representative: the idea shows cleanly, the run is good but not a freak, and
    the knobs are ones that work in general. The choice is then pinned: same seed and knobs give the same run on every
    machine, and a test stores a fingerprint of each pinned run, so a code change that alters one fails loudly instead
    of quietly changing the story. Nothing is justified in the story. One faint line at its end names the seed and
    settings ("Runs: seed 58, ε = 0.1, 1,000 pulls. Enter them in the Lab to replay."), so anyone can check.
  - *The Lab measures; it does not sell.* Two things decide a run: the settings and the luck (the seed). The Lab keeps them
    apart.
    - A **bench** of 20 seeds (1–20, the same for every setting) runs live in the browser whenever a knob changes. It
      gives the odds and the spread.
    - The run played is, by default, the bench's **typical** seed for those settings (the median). Good settings show a
      good typical run, bad settings a bad one.
    - Anyone can instead type a seed or roll the dice. It plays, and the Lab shows where it falls among the bench.
  - Races share their seed, so the comparison is fair: the typical seed of a race is the one closest to every racer's
    median. Odds are counted on shared seeds ("UCB wins on 17 of 20").
  - *Charts stay clean.* No bundle of thin lines. Over time: the played run as a line, the bench as a soft band (the
    middle half, the median as a faint line). At the end: a **seed strip** per racer, the 20 final scores as dots on one
    row, the success threshold as a mark that splits them into the odds, and the played seed ringed.

  **Phase 1 · The bench (lab engine, no visible change yet)** (done)
  - The bench: seeds 1–20 per racer, run in the background in small slices (as the odds already are). Results are cached
    by settings, so going back to a setting is instant.
  - Typical seed: the median of the success score (or of the preset's main measure when it has no success rule). For a
    race, it is the seed nearest every racer's median rank.
  - Rank of any seed against the bench; paired wins between racers; the band (quartiles and median per unit).
  - Tests: typical seeds, ranks and bands are deterministic.

  **Phase 2 · Seed and odds in the Lab** (done)
  - The seed control: *Typical* (the default), a box to type any seed, and the dice to roll one.
  - Each racer's pane header: its odds on the bench, and where the played seed falls ("better than 14 of 20").
  - Charts: the played run, the bench band, the seed strip (see Principles). "This run" alone stays as an option.
  - The sweep keeps its form (every value on the same bench) and marks the played settings.
  - The preset `seed` keys go. Preset intros that quote numbers from one run are checked and reworded.

  **Phase 3 · A layout made for comparing, and playback speeds that each mean something** (done)
  Today the racers are stacked full-width, so two worlds never fit on one screen, the transport bar covers the second,
  and the charts and odds sit far below. There are 45 live presets: 6 with one racer, 25 with two, 13 with three, 1 with
  four.
  - Every racer on screen at once, whatever their number: compact panes side by side (two or three across, four as a
    2 × 2), sized to fit the window. One shared play bar drives them all, at the same moment.
  - The charts directly under the panes, in the racers' colors; the filmstrip as a row per racer.
  - The side column: pseudocode with a tab per racer and the lines where they differ marked; the "Show" options shared.
  - One racer: the same frame, with the pane at full width.
  - Speeds, a ladder where each rung shows what can be seen at that pace:
    - *Line by line* (about 2 lines a second): every line of the pseudocode, with its numbers.
    - *Step by step* (about 3 steps a second): every move and its update.
    - *Fast* (about 10 steps a second) and *Faster* (about 40): the agent runs, the trail and the values change as it
      goes; the numbers of each update are no longer shown.
    - *1 episode a second*: each frame is a whole episode, its path drawn at once, the values as they stand after it.
    - *10 and 50 episodes a second*: single episodes can no longer be read, so the view shows what they add up to: the
      tiles shaded by how often the recent episodes visited them (a path has no median; where the agent goes most often
      does), and the path the greedy policy would take now.
    - The same ladder for the other unit kinds (pulls, sweeps, rounds), each with its own sensible rates.
  - Prototype on the cliff race (grid view) and review it. Then every other view kind: arms, cards, chain and line, car
    and surface, star, corridor, throw, graph.

  **Phase 4 · Stories** (done)
  - `tools/story-runs.js` checks every live story run (142 of them) against seeds 1–40: where its seed falls, and whether
    the story's runs keep the order of their medians. Most were representative. Re-pinned: on-policy MC control (its
    run reached 78% where the typical one reaches about 45%; now seed 96, numbers updated), and the feature and
    generalization stories (a rough seed for every run; now seeds 6 and 34). The runs that fail on purpose (PPO without
    the clip, TRPO with δ = 0.2, the thrown REINFORCE run, a gem worth 100) already say how rare they are.
  - `tests/stories.test.js` keeps a fingerprint of every pinned run (`tests/story-runs.json`); it is a developer check
    only and shows nowhere in the guide. A faint line at the end of each story names its seeds.
  - The story charts' averages (up to 100 runs a curve; the REINFORCE-with-baseline chart alone took 100 s) are worked
    out offline by `tools/story-curves.js` with the page's own runs and seeds, kept in `content/story-curves.json`,
    and shown at once; `tests/stories.test.js` replays each curve's first run against the fingerprint kept for it, and
    fails when a chart has none (it would be averaged live, in slices, as before). The runs a story steps through are
    still made in the page, in slices of 10 ms that stop between two events of a unit (`lab.simulateJob`), while the
    reader is on the first steps, and then the units the steps draw at rest (the one before each moment shown: a PPO
    round with its ten passes takes tens of milliseconds to replay); a step that comes before they are ready says so
    and shows them when they are.

  **Later (decided separately)**
  - The deep presets: the same bench-and-typical method on recorded grids (each value's seeds trained offline), how much
    of the knob space to record, and the flat Pendulum sweeps (see `recorder/RUNS-REVIEW.md`). Their story runs are
    re-picked from the recorded seeds then.
  - The Pendulum and CartPole stories play their recorded test episodes instead of stills (code only). *Done*: a step
    after some training plays the test episode of the network it shows, in a loop, at the world's own pace.

- [x] **M9 · Worlds for every algorithm** (closed with release 1.0.0): a shared set of worlds that every algorithm can
  be tried on, where its kind allows; for each algorithm, a study of which world shows it best; then the deep Lab on top
  (`recorder/DEEP-LAB.md`). Classic algorithms first. What it set out to do and was left out is listed at its end.

  **The shared worlds.** All of them run in the page: Gymnasium's equations ported exactly, or, where Gymnasium's
  physics can't be ported (Box2D, MuJoCo), a world of our own in the same spirit, named as such.
  - *Discrete actions, discrete states* (tables can hold them): Cliff Walking; Frozen Lake 4 × 4; Frozen Lake 8 × 8
    (new); Taxi (new, 500 states); the windy gridworld (new, Sutton & Barto's Example 6.5); the Dyna maze; Blackjack.
  - *Discrete actions, continuous or large states* (approximation only): CartPole (now live, not only recorded);
    Mountain Car; Acrobot (new); Catch (new, bsuite's tiny game: a falling ball, a paddle, 10 × 5 cells, 250 states).
  - *Continuous actions* (approximation only): Pendulum.
  - The chapter worlds built to make one point (the short corridor, two gems, the ice bridge, the hidden cliffs, the
    max-bias pair, Baird's star, the random walks) stay in their chapters; they are not part of the shared set.

  **Who may run where.**
  - Tabular methods (Monte Carlo, TD, SARSA, Q-learning, n-step, λ, Dyna, prioritized sweeping): discrete states and
    discrete actions only. Dynamic programming also needs the world's model written out: the grid worlds and Taxi
    (Blackjack keeps its exact solution).
  - Value methods with approximation (linear SARSA and TD, DQN and its extensions): any states, discrete actions only:
    choosing the best action is a max over a list.
  - Policy-gradient and actor–critic methods (REINFORCE, actor–critic, A2C, GAE, TRPO, PPO): any world; a softmax over
    discrete actions, a Gaussian over continuous ones.
  - DDPG, TD3, SAC: continuous actions only.
  - The Lab lists its worlds in a settings drawer (**World & display**, in the play bar), with the view's display
    options: the shared set, grouped (tables, approximation, continuous actions), showing only the worlds the chosen
    algorithm may run. Monte Carlo never lists a continuous-action world. The side column keeps only what follows the
    simulation: the pseudocode, its line lit in the racer's color at every step, and "This step".

  **Every world trains live.** The continuous ones included: their physics are a few lines, and their networks are
  small. Training runs in a Web Worker, so the animation never waits for the weights.

  **The network.** Two hidden layers by default, with depth (1–3), width (16–128) and activation as knobs: small, as the
  networks of most control work still are, robots included.
  - *Smoothness first.* Before the knobs open, every network shape is timed on every world: updates per second, and so
    the fastest playback it can keep. Shapes that would stall the page at a speed are not offered at that speed (or at
    all); the fast rates of the ladder show what training actually manages ("training: 1,800 steps a second").

  **Steps.**
  1. Port the new worlds; CartPole and Acrobot live; the compatibility table. *Frozen Lake 8 × 8, the windy gridworld,
     Taxi, and CartPole and Acrobot live done* (`lab/envs/control.js`, checked step for step against Gymnasium's own
     trajectories; tile coding, 8 tilings of 6 cells per coordinate; new Acrobot view, the CartPole view drawing live
     snapshots too). Linear SARSA and the policy-gradient methods run on them from the World panel. *Catch* (bsuite's
     falling ball, 250 states: tables, DP and policy methods) added with its own view.
  2. The world study for the classic algorithms: each on every world it may run, 20 seeds, sensible settings; a world
     is a good showcase when good settings succeed on most seeds, learning takes long enough to watch, the chapter's
     knob visibly matters, and the hero beats the foil on most seeds. Written up like the runs review; presets and
     stories move where a world shows the idea better. *First round done* (`recorder/WORLD-STUDY.md`): the settings
     each algorithm starts from in each world (3 seeds per candidate), episode caps, Frozen Lake judged by its chance of
     reaching the gem, prediction on the grids with a near-optimal policy and episodes starting anywhere; pairings that
     rarely end well are marked "hard" in the World panel, not hidden. The second round is left for after 1.0 (below).
  3. The scenario picker in the Lab: any allowed world for any algorithm, with its bench. *Done for the discrete
     worlds so far* (`lab/worlds.js`): a "World" panel in the Lab's side lists the shared worlds every racer may run,
     grouped, with the lab's own world marked; a click switches the world, starting from that world's profile (units,
     discount, charts, odds rule), with a bench of its own. Recorded labs and the sandbox keep their world.
     *Lab review after it* (every lab × every world it offers, in the browser): Monte Carlo and the other prediction
     methods now get every world whose values can be worked out; a racer's step size keeps its ratio to the lab's; the
     views handle every kind of learner (action values, a policy with or without a critic, a fixed policy); playback
     never runs more than one move per tick, so Monte Carlo and REINFORCE walk their episodes with the pseudocode in step;
     long runs train in slices with their progress shown, the page staying responsive.
  4. The deep Lab (`recorder/DEEP-LAB.md`), on the same worlds. *Done*: the trainer in
     JavaScript (`lab/deep/`: deterministic math, so a seed is the same run in Node and in any browser); every recording
     and sweep made with it (`recorder/deep.js`): the DQN family on CartPole, network depth, width and activation among
     its knobs, A2C, PPO and TRPO on CartPole, and PPO, DDPG, TD3 and SAC on Pendulum; the Lab training other seeds and
     settings of those recordings in a Web Worker, with the odds from the recording, its sweep, or a bench trained in
     the page on request; and a strip under each recorded world showing how often each hidden unit fires. A test keeps
     the trainer from drifting off the recordings (`tests/recordings.test.js`), and every lab offers only knobs that
     change its runs (`lab/knobs.js`). What the long runs cost, and the rules for the next: `recorder/DEEP-LAB.md`.
  5. The map keeps its order, which follows Sutton & Barto. A new station goes only where a topic needs its own, and
     then between the two stations where it naturally fits.

  **Left out, on purpose.**
  - Learning from pixels (a MinAtar-style Breakout behind a small convolutional encoder): convolutional networks belong
    to a course on neural networks, not to this guide. The DQN chapter tells the Atari story in words.
  - More continuous worlds of our own (continuous Mountain Car, CartPole pushed with any force, a torque-driven Acrobot,
    a reaching arm, a pushed puck): Pendulum already shows what continuous actions change, and each new world would
    need its recordings, sweeps and checks.

  **After 1.0** (not scheduled)
  - The world study's second round: the 20-seed showcase choice per chapter, and moving presets or stories where
    another world shows the idea better.
  - A check on real browsers and devices, which the headless checks here cannot replace (`docs/browser-check.md`, with
    `tools/browser-check.js` for what can be measured). *First round done* on a Windows laptop in Chrome, Brave and
    Edge; release 1.0.2 fixes what it found, and a *second round* (Chrome and Brave) confirmed those fixes. Still to
    do: Firefox, Safari and a real phone.
  - Small stutters: the second round (1.0.2, Chrome and Brave, `--quick`, the window kept uncovered) saw none of the
    400 to 620 ms frames nor the first story's long task, and the A2C story within its bounds. 1.0.3 fixes what it and
    the checks here still found: the freeze when a deep run trained in the page arrives (its film strip's maps drawn as
    one path per color), the first round of a lab played again from its start at a fast rate (worked out while
    paused), and the switch to the typical seed some seconds after a lab opens (worked out in slices). 1.1.0 draws the
    deep labs' big maps one path per color too: in the checks here, six labs of two to four racers, each played at
    every speed, had 8 long tasks instead of 48, the longest 72 ms instead of 111. Still open:
    - A2C maze at 4 rounds a second in Chrome: three freezes of up to 79 ms in 10 s, seen once, not in Brave nor here.
      Cause unknown; garbage collection is a guess.
    - Cliff walking's first play here: one long task of about 60 ms, a third of it garbage collection after the
      bench. Not seen on the laptop.
    - Not measured by a quick run: the Dyna maze at "Faster" in a large window (32 to 34 frames/s at 1440×900 in the
      first round) and the Dyna-Q story in a fast flick.
    - On a phone, the header's cut part name can end in a space before the "…": the browser's own cut, after a word.

- [x] **M10 · Release 1.0.0**: a design pass over the stories, the animations and the Lab's layout, then the release.
  The Lab's panes take the largest size that fits for any number and shape of racers, and the algorithm column folds
  into a tab at the edge; playback holds its rate at every speed without forced layouts; stories follow the scroll
  position frame by frame, prepare their runs and the moments their steps draw in slices that stop between two events
  of a unit, and show their charts at once (averaged offline, `tools/story-curves.js`). The README got pictures; a
  workflow (`.github/workflows/release.yml`) publishes `rl_atlas.html` as the download of each version tag. 1.0.1 fixes
  formulas that stopped a few pixels short of fitting their column (they now shrink until they fit). 1.0.2 fixes what
  the first check in real browsers found: hover cards kept inside the window, story formulas stacked in narrow
  windows, story runs prepared while the reader scrolls, labs at a few rounds a second without freezes, and the phone's
  header and symbols page. 1.0.3 fixes the freezes the second check and the checks here still found (a deep run arriving,
  a lab played again from its start, the switch to the typical seed).

- [x] **M11 · Exploration and regularization**: Part 12, the tools that make continuous control work beyond the bare
  algorithms (the list and its sources: `docs/control-tools.md`). Eight stations: action noise (white,
  Ornstein–Uhlenbeck, pink, red), noise in the weights, gSDE, Gaussian policies in practice, smooth policies (CAPS,
  penalties, filters, Lipschitz bounds), regularizing the critic (weight decay, layer and batch normalization, spectral
  normalization, ensembles, dropout, resets), robust policies (randomization, memory, teachers, curricula) and a
  recipe. A new world, Gymnasium's continuous Mountain Car, with its own view; the trainer gained colored and
  Ornstein–Uhlenbeck noise, adaptive parameter noise, gSDE (SAC, A2C, PPO), CAPS, tanh squashing for policy gradients,
  observation normalization and weight decay, all off by default so that every earlier recording stays bit for bit;
  recordings keep how much the actions jitter. Toolbox and Where next became Parts 13 and 14.
  Decided: five stations tell a story from the recordings (action noise, noise in the weights, gSDE, Gaussian
  policies in practice with PPO's starting spread, smooth policies); regularizing the critic, robust policies and the
  recipe have none, on purpose (the trainer has weight decay alone of the critic's regularizers, and on Pendulum it
  does not help; no world here to randomize; a decision guide). What changed on the way, with the reasons, is at the
  end of `docs/control-tools.md`. Released as 1.1.0.

- [x] **M12 · The ESE3990 companion**: the atlas as a study companion for ESE 3990 (*Reinforcement Learning: In Theory
  and In Practice*, Penn, fall 2026). From a station you reach the lecture slides, homework cells, quiz questions and
  textbook pages on its topic, each saying what it does there. From any of those you reach the stations that explain
  it. Maps follow the course's order as well as the book's. The proposal: `tmp/ese3990-integration-plan.md`. The
  materials: `tmp/ese3990/` (the 13 lectures in one 566-page PDF, Quizzes 1 and 2, a recitation, Problem Sets 2 and 3
  as five notebooks with PS3's `rl_lab.py`, and Sutton & Barto's PDF).

  **Principles**
  - *A course is a pack, kept out of the repository.* The public atlas gains a small, generic mechanism. The ESE3990
    pack is a folder of data, `course/ese3990/`, which git ignores: its links, notes, worked solutions, pictures of
    slides, and the PDFs. If it needs versioning, it gets a private repository of its own. `python build.py` still
    builds `rl_atlas.html` byte for byte as before, so the release workflow's check holds. `python build.py --course
    course/ese3990` writes `course/ese3990/rl_atlas-ese3990.html` next to the PDFs it links to. Nothing from the course
    goes into a commit or a release: the slides, quizzes and book are not ours to publish, and the notebooks hold graded
    answers. There is no fork: the mechanism is small, and a fork would need merging after every release.
  - *Keyed to station ids.* Every link names stations from `map.toml`, and the build stops on any it does not know,
    so a renamed station breaks the pack loudly. This replaces recording which atlas revision a pack was written against.
  - *Exact places.* A slide is named by lecture, slide number and title, with its page in the combined PDF. A quiz or
    recitation question is named by document, number and part, with its figure. A notebook item is named by problem
    set, activity, cell id and function. The book is cited by section, printed page and PDF page (22 apart in the main
    text).
  - *Every link says its role* (introduces, derives, implements, compares or assesses), with one sentence on what the
    reader finds there. One item can link several stations, such as a question that needs both the Bellman equation
    and Q-learning. The build makes every link two-way.
  - *Still one file, no server.* Links open the PDFs at the right page (`…pdf#page=330`) from the folder next to the
    page. Notebook excerpts and pictures of the linked slides are compiled into the page. Phase 1 checks that Chrome,
    Edge and Brave follow such links from a file:// page. If one does not, the fallback is `python -m http.server` in
    the pack's folder.
  - *The atlas's own words stay the reference.* Course material sits beside an entry, never inside it. Course code is
    shown as written and labeled with its source. Where the code or the lectures' notation differs from the atlas, a
    course note next to it says how. Two differences are known already. The lectures' A2C (L12) is a single-agent
    actor–critic whose advantage comes from a learned value; the atlas's A2C is the synchronous method with many
    workers. The lectures write $\mathcal P^a_{ss'}$ and $\mathcal R^a_s$, the atlas $p(s', r \mid s, a)$.
  - Course items get a color of their own, outside the quantity colors, checked with the validator in both themes.

  **Phase 1 · The pack and the build**
  - `course.toml`: the course's documents, with each lecture's pages in the combined PDF (L1 1–22, L2 23–60, L3 61–115,
    L4 116–170, L5 171–197, L6 198–244, L7 245–284, L8 285–344, L9 345–397, L10 398–445, L11 446–480, L12 481–518, L13
    519–566), the quizzes, the recitation, the notebooks, and the book with its page offset.
  - `tools/course-import.py` (standard library) reads the notebooks: each cell by id, the activities, the "Predict
    first" prompts and questions, each function by its `def`, and the answers as written. It also reads the PDFs' text
    when `pdftotext` is installed: slide titles and numbers, and quiz questions. When `pdftoppm` is installed, it draws
    the linked slides and question figures as small pictures. Its output, `import/*.json`, is what the build reads.
    Cell ids survive re-runs, so links survive a notebook changing.
  - `links.toml` holds the links, written by hand, for example `{ at = "L8:46", stations = ["sarsa", "q-learning"],
    role = "compares", note = "…" }`. Book links are worked out from the § numbers already in every entry's sources.
  - `build.py --course DIR` checks the pack and compiles it into `RL.course`; without the flag, nothing changes. It stops
    on an unknown station, slide, cell or question, and on a role outside the five.
  - Tests: an invented two-lecture pack in `tests/course-pack/` covers the importer, the two-way links and the errors.
    A test also checks that the default build contains no course data. Checks of the real pack (below) skip when it is
    absent, so `main` stays green without it. `.gitignore` gains `course/`.
  - PS2's own `rl_lab.py` (fog grid, cliff walk, random walk) is not among the materials; the one there is PS3's. The
    notebooks describe their worlds in full and keep their outputs, so nothing here needs it.

  **Phase 2 · The pilot: Sarsa, Expected Sarsa and Q-learning**
  - Links for the slice: L8's TD control (pages 311–344: Sarsa, the windy gridworld, Q-learning, cliff walking,
    Expected Sarsa, the unified view, maximization bias); L9's Q-learning as off-policy control (347–348, 384–390);
    PS2's model-free control notebook, Activities 2 and 3 (`sarsa_update`, `q_learning_update`,
    `expected_sarsa_update`, `td_control`, the slippery cliff and the sweep over α); Quiz 2's questions 9–12; recitation
    Problem 2(c) (a max over actions that are not available); Sutton & Barto §6.4–6.7.
  - On each station, an **ESE3990** tab after the Card, in course builds only, with four sections. *In lectures*:
    the slides, each with its role and a picture. *In homework*: the activity, its function, and the experiment it
    runs. *Practice*: the questions as the flip cards the atlas already has, solutions hidden. *Course notes*:
    notation, assumptions, and where the course's version differs.
  - The homework next to the pseudocode: the function beside the Card's pseudocode, lines paired so that hovering one
    lights the other (the target line of each update).
  - A page per course item, for the way back: a lecture (its slides in order, each with its stations), an activity
    (instructions, functions, questions, stations, the Lab preset), a question (its figure, hidden solution, and the
    stations it needs).
  - Worked solutions for the pilot's questions, written for the pack. The quizzes come without a key, so a script
    recomputes every numeric answer.
  - The Lab: the cliff gains a slip knob. The grid engine already slips the way the homework does (the intended move
    with probability 1 − slip, the rest split between the two sides), and the knob is generic, so it goes in the public
    atlas. The pack's preset races Sarsa against Q-learning as the slip grows, with the bench's odds. The sweep over α
    already exists as the `cliff-alpha` figure (Sutton & Barto's Figure 6.3).
  - Two maps, enough to switch between them: the **lecture roadmap** at the level of lectures (the table below; slides
    only for the slice), and the **comparison map** of Sarsa, Expected Sarsa, Q-learning and Double Q-learning, built on
    the `backup` diagrams.
  - Done when the four checks of the proposal work during real revision: open a station's exact course references;
    compare its equation with the homework's code; go from a question to its explanation and back; switch between
    lecture order and the comparison map. What that use shows is written down, and Phases 3 and 4 adjust to it.

  **Phase 3 · The course maps**, new views in the map's view switch, each prototyped and reviewed with screenshots:
  - *Lecture roadmap*, in full: L1–L13 as a line in course order. Each station appears once, under the lecture that
    introduces it, with a faint tie to lectures that come back to it (DP in L4 and L5, maximization bias in L8 and L9).
  - *Homework map*: problem sets, notebooks, activities, the functions they implement and the stations behind them,
    with the Lab presets that run the same experiment.
  - *Assessment map*: the questions of each quiz and the recitation, tied to the stations they need. Questions you
    have solved are ticked, kept like visited stations.
  - *Comparison maps*: MC, TD(0), n-step, λ and DP (the lectures' unified view, L7–L8); prediction against control
    (TD(0) and Sarsa, MC prediction and MC control, policy evaluation and value iteration); on- against off-policy.
  - *Derivation map*: chains of the Textbooks' numbered statements. Bellman expectation equation, matrix form,
    iterative evaluation, contraction, then the convergence of evaluation, policy iteration and value iteration (L3–L5).
    Score-function identity, gradient over trajectories, policy gradient theorem, REINFORCE, then baselines, the
    advantage, A2C and λ in policy gradients (L11–L12).
  - `Ctrl K` finds course items ("L8 46", "Quiz 2 Q11", `td_control`), and the symbols page gains a column for the
    course's notation.
  - The comparison and derivation maps are not specific to the course. If they prove useful, they move into the
    public atlas, defined in `map.toml`.

  **Phase 4 · The whole course**: links for every lecture, both problem sets, both quizzes and the recitation, from
  this coverage (read off the slides; the pilot refines it):

  | Lecture | Stations |
  | --- | --- |
  | L1 Introduction | welcome, agent-environment, explore-exploit |
  | L2 Basic definitions | state-action-reward, reward-design, agent-environment, mdp, policy, value-functions, models, model-based-free, on-off-policy, explore-exploit |
  | L3 Markov decision processes | mdp, return, discount, value-functions, bellman, optimality |
  | L4–L5 Dynamic programming | bellman, policy-evaluation, policy-improvement, policy-iteration, gpi, value-iteration, dp-limits, prioritized-sweeping |
  | L6–L7 Model-free prediction | mc-prediction, incremental-mean, td0, td-error, mc-vs-td, bootstrapping, bias-variance, n-step-td, lambda-return, td-lambda |
  | L8 Model-free control | gpi, mc-control, exploring-starts, epsilon-greedy, sarsa, n-step-sarsa, sarsa-lambda, q-learning, expected-sarsa, double-q |
  | L9 Off-policy learning | on-off-policy, importance-sampling, off-policy-mc, q-learning, double-q |
  | L10 Value function approximation | why-approximate, features, value-error, gradient-mc, semi-gradient-td, semi-gradient-sarsa, generalization, experience-replay, deadly-triad, dqn |
  | L11 Policy gradients | why-policy, policy-parameterization, pg-theorem, reinforce |
  | L12 Bias and variance in policy gradients | baseline, bias-variance, actor-critic, a2c, gae |
  | L13 Model-based RL | model-based-free, models, dyna-q, dyna-q-plus, model-based-deep, mcts |

  - Homework: PS2's dynamic programming (5 activities: policy-evaluation, policy-iteration, value-iteration, gpi),
    model-free prediction (5: mc-prediction, td0, mc-vs-td, n-step-td, lambda-return) and model-free control (3:
    mc-control, sarsa, q-learning, expected-sarsa). PS3's off-policy learning (5: importance-sampling, off-policy-mc,
    expected-sarsa, double-q) and policy gradients (5: policy-parameterization, pg-theorem, reinforce, baseline).
  - Homework worlds in the Lab where the engine already allows. The fog grid and the depot are grid specs, which
    `lab/envs/grid.js` already accepts, so the pack defines them with presets on them. The twin rooms, the sprinkler and
    the casino stay in the notebooks. Course notes point to their atlas counterparts: the short corridor (aliased
    states), the throw (a Gaussian policy) and the maximization-bias world.
  - Gaps, each decided on its own. When it is general RL, a section goes into the public atlas, in its own words with
    its sources; when it is the course's own angle, a course note goes in the pack. Known so far:
    - the baseline that minimizes the gradient's variance (L12; a candidate section for `baseline`);
    - least-squares prediction (L10; a candidate section for `semi-gradient-td`, Sutton & Barto §9.8);
    - ergodic chains and MDPs (L3; a note);
    - the policy gradient derived over trajectories (L11; a note, unless `pg-theorem` turns out to need it);
    - model-learning losses (L13; check against `model-based-deep`).

  **Left out, on purpose**
  - A fork, the Astro/React rewrite and website integration: postponed, as the proposal suggests. The pack is plain
    data, so it can move later.
  - Running the homework's Python in the page. It stays in the notebooks; the Lab runs the same experiments with its
    own engine.
  - Course material still to come (later problem sets and quizzes, the final project): added when it arrives.

  **Delivered and checked, 2026-10-19.** All four phases are implemented. The ignored pack imports all 566 slides,
  five notebooks (23 activities), both quizzes and the recitation, with 522 links to 80 stations, 38 course notes,
  39 worked solutions and three homework Lab presets. The course's nine map views, search, notation column,
  paired pseudocode and original code, hidden answers, solved ticks and exact PDF links work in the companion.
  The public sections cover the optimal baseline, least-squares prediction and model-learning losses; the course's
  notation and estimator differences stay in its notes. Comparison/derivation views remain in the course mechanism.
  The invented pack tests run under `node --test`; real-pack checks skip when it is absent. Chrome and Edge each
  passed 571 route checks and all nine map views, with screenshots reviewed; the pilot also checks keyboard
  navigation, the 20-seed cliff bench and progress after reload. The default build remains deterministic and has
  no course payload. See `docs/course-packs.md` and `docs/m12-review.md`.
  Validation limits: Brave is not installed here; the checks establish PDF viewer URLs and page fragments, not its
  displayed page counter. Automated revision flows were exercised; an actual student's revision session remains
  a user acceptance check, not a claim made by these tests.

- [x] **M13 · Routes and results**: what the atlas needs before it can lead a reader to a paper's theorems. M12's
  derivation map uses it too. Today each station has one `parent` (for the family tree) and an untyped `prereqs`
  list, and comes in one of two kinds, algorithm or concept.
  - *Typed links.* `content/routes.toml` holds links between stations. Each link has a role: required (for a named
    result), sufficient, illustrative (a special case), motivation or optional. It also has `at`, saying where the link
    is used ("Lemma 4.1, proof"; "Appendix B.1"). An entry's `prereqs` count as required links. The build stops on an
    unknown station, and on a cycle of required links. `parent` and the family tree stay as they are.
  - *Results.* A third kind of station, `result`, for a theorem or lemma from a book or paper. Its card has a
    statement, intuition (with an example), assumptions and domain, a proof sketch, where it is used, and sources with
    their review status. Where it applies, a section pairs continuous and discrete time. Concepts may take those last
    sections too. The build only knows the fields it was taught (`REQUIRED`, `FRONT_MATTER`), so its schema grows for
    this on purpose.
  - *Provenance.* A source gains a `kind` (textbook, paper, course note, personal note, bridge explanation), a `locator`
    (edition or version, section, statement or equation, page) and a `review` status (located, proof-checked,
    pending). The card shows all three. A source that has been located is not a checked proof, so there is no single
    confidence score.
  - *The route view*, a fourth view in the map's switch. Pick a destination (a station, or a route named in
    `routes.toml`), and the map lays out everything it needs in layers, with the destination on the right, links drawn
    by role, and optional branches folded until opened. Elementary linear algebra, calculus and probability stay
    leaves: a source link on the station that needs them. Layouts are computed and never stored with the stations, so
    one station can serve every route.
  - Tests: closures and layouts are deterministic, and required links are acyclic.
  - Done when routes work over the RL stations already written (for example "everything leading to PPO", or to
    Q-learning), reviewed with screenshots.

  **Delivered and checked, 2026-10-19.** The fourth map view supports every station and seven named routes,
  with five edge roles, folded supporting branches, deterministic closure/layout and required-cycle validation.
  Result schema, edition-specific provenance and separate personal proof progress are implemented. PPO and
  Q-learning routes work over the existing RL content. Chrome and Edge screenshots and offline checks were reviewed.
  Details and validation limits: `docs/m13-m14-review.md` and `docs/guarantees.md`.

- [x] **M14 · Learning with guarantees**: a third row on the map, after "Learning with tables" and "Learning at scale".
  It covers what control theory and learning theory say about learned systems, and leads to one paper: *Learning
  Stability Certificates from Data* (Boffi, Tu, Matni, Slotine & Sindhwani, CoRL 2020, PMLR 155, 2021). The proposal:
  `tmp/ese6180-boffi-prerequisite-map.md`. Needs M13. This milestone is the public atlas, written in its own words
  from the books and papers; the course's own material stays in its pack (M15).

  **The row.** Part 15, *Dynamics and stability*; Part 16, *Incremental stability and contraction*; Part 17, *Learning
  theory*; Part 18, *Learning certificates*. About 35 stations. The proposal's 56-node seed is missing (M15), so its
  list is drafted again here, phase by phase.

  **Principles**
  - *Destinations, not a syllabus.* The row holds what the paper's results need, and no more. The destinations: the
    formulation (equations 3.1–3.3); Lemma 4.1 and Theorem 4.2 (the main, parametric route); Theorem 4.3 (sharper, for
    matrix-structured classes); Theorem 4.4 (kernels); Theorems 5.1 and 5.2 (from a small probability of violation to
    Lyapunov and contraction guarantees); and the damped Van der Pol experiment (Figure 1). The paper's reference list
    is not a prerequisite list. Observability, transfer functions, LQR and feedback linearization stay off the route.
  - *Two editions, never mixed.* There is the 10-page conference paper, and the 30-page extended version
    (arXiv:2008.05952v2) with the proofs and experiment details; the extended version's page records corrections to
    Theorems 5.1 and 5.2 and Proposition D.1. Every locator names its edition, and statements follow v2 where it
    corrects. The paper is cited by title and identifier, never as `boffi21a` alone, since PMLR 144 has another Boffi
    paper under that name.
  - *Ids that can't be mistaken.* The paper's results carry its name (`boffi-thm-4-2`). New concepts get ids that
    can't be confused with RL ones (`contraction-metrics`, never `contraction`). Shared ideas link to the RL stations
    that already exist: `policy`, `agent-environment`, `models`, `features`, `neural-networks`, `imitation`,
    `generalization`.
  - *Bridges where words collide.* Three stations hold the distinctions a reader coming from RL will trip on:
    - *two V's*: a policy's value against a Lyapunov certificate (with positive costs, a stabilizing policy's cost-to-go
      is itself a certificate);
    - *three contractions*: the Bellman operator in the max norm, trajectories in a metric, and the contraction lemma
      of Rademacher complexity;
    - *a controller or a certificate*: learning a policy against certifying a fixed closed loop. A violated
      certificate shows that the candidate failed, not that the system is unstable.
  - *Cautions kept in sight.* The bounds count independent trajectories: n trajectories, never n times their samples.
    The fast rate, about 1/n, comes from Lemma 4.1's margin argument with zero empirical violations, not from a
    generic 1/√n bound. The norm on certificates controls V and its derivative together, and gets its own station,
    because approximating values alone does not control a Lie derivative. A small probability of violation is not a
    certificate valid everywhere, so Theorem 5.1's assumptions and domain are stated in full.
  - *Proofs and numbers are tracked separately.* Reading a proof and reproducing an experiment count as separate
    progress. A check on a dense grid is evidence, not a theorem, and the Lab says so.
  - *Continuous and discrete time side by side.* The paper works in continuous time, the course notes mostly in
    discrete time. One station sets out the dictionary between them (dynamics, decrease condition, Lyapunov equation,
    variational dynamics, metric contraction), with each inequality's rate convention. Every statement says which time
    it is in.
  - Stories go where a picture proves the point: a bowl the state rolls into, nearby trajectories closing in, violation
    sets shrinking as data grows. There are none for a proof step (Lemma 4.1, Dudley's integral, Theorems 4.3 and
    4.4), decided station by station as in M7.
  - New quantities (certificate, metric, violation) get colors of their own, checked with the validator in both
    themes. Red stays RL's surprise.

  **The Lab: flows and certificates**
  - A new kind of world, a *flow*: a small system in continuous or discrete time with no actions, or a closed loop
    with a fixed policy. The flows: linear systems with the matrix as a knob, the damped pendulum, and the damped Van
    der Pol oscillator. They are integrated by a fixed-step Runge–Kutta method in the atlas's deterministic math, so a
    seed gives the same run everywhere.
  - A phase-plane view: the vector field, trajectories, a certificate's level sets, where its decrease holds and where
    it fails, a cloud of nearby states that shrinks or doesn't, and a metric's ellipses.
  - A certificate learner. The certificate is linear in its parameters (quadratic forms, polynomial features, Gram
    matrices that keep it positive), fitted with a margin to sampled trajectories. The fitting uses a small convex
    solver of our own, a few hundred lines like the 3D renderer, built on eigen-decompositions of small symmetric
    matrices. Tests pin its results and check them against closed forms, such as the Lyapunov equation of a 2 × 2
    system.
  - The bench is the atlas's own: seeds draw the initial conditions, the measure is the violation rate on fresh
    trajectories, and a sweep over n shows how fast that rate falls.

  **Phase 1 · The first route: Theorem 4.2.** The slice the proposal starts with: a stable linear system and a
  quadratic certificate, then the parametric learning argument.
  - Stations, each with a Textbook and a Card, and a story where it shows something:
    - Part 15: dynamical systems and closed loops, stability, Lyapunov functions, the Lyapunov equation;
    - Part 17: risk and ERM, uniform convergence, Rademacher complexity, covering numbers and Dudley's integral,
      margin bounds, trajectories as samples;
    - Part 18: learning a certificate, certificate classes and their norm, Lemma 4.1, Theorem 4.2.
  - Lab: linear flows and the damped pendulum, and learning a quadratic certificate from n trajectories.
  - Done when the "Read Theorem 4.2" route reads from start to end, and the Lab measures how the violation rate falls
    with n over the bench, set against the bound's k/n and labeled as evidence.

  **Phase 2 · Stability and contraction in full**
  - The remaining stations:
    - comparison functions (K and KL) and the comparison lemma;
    - existence, continuous dependence and sensitivity equations (Khalil §§3.1–3.4);
    - converse theorems and input-to-state stability, as deep as the routes need (Khalil §§4.7–4.9);
    - incremental stability (δISS and EISS, as stability of the doubled system);
    - variational dynamics;
    - contraction metrics (Lohmiller & Slotine 1998), with the Lyapunov equation as the constant-metric case;
    - the dictionary between continuous and discrete time;
    - the three bridges;
    - from incremental stability to a deployment bound for imitation, linked from `imitation`.
  - Lab: the damped Van der Pol oscillator, and the contraction view.
  - Route: "Understand contraction certificates".

  **Phase 3 · Learning theory in full**
  - The remaining stations: concentration (Hoeffding, McDiarmid); finite classes; the properties of Rademacher
    complexity, the contraction lemma among them; the properties of covering numbers; kernels and random features (a
    folded branch that Theorem 4.4 needs); dual Sudakov (on Theorem 4.3's route only). Sources: Shalev-Shwartz &
    Ben-David (Chapters 4, 16, 26, 27, Appendix B) and the papers each result cites.
  - Demos: fitting random labels to estimate a class's Rademacher complexity; 1/√n against 1/n on the same class,
    first without a margin, then with a margin and zero errors.

  **Phase 4 · The rest of the paper**
  - Theorems 4.3, 4.4, 5.1 and 5.2. Each Textbook draws where each assumption enters the proof (the proposal's "where
    each assumption enters").
  - Certificates in practice: positivity constraints, semidefinite and sum-of-squares programs, numerical derivatives,
    approximations from nearby trajectories, and holdout estimates of violation.
  - Lab: learn a contraction metric for the damped Van der Pol oscillator and watch the violation sets shrink with n
    (Figure 1), with the route "Reproduce Figure 1". The quadruped experiment (PyBullet) is told in words.
  - Review: every result's statement checked against the extended version, with its status shown (located,
    proof-checked or pending).

  **Left out, on purpose**: Hespanha and Khalil beyond the route; sum-of-squares programming beyond the small cases the
  Lab needs; the quadruped in the Lab.

  **Delivered and checked, 2026-10-19.** All four parts are present: 37 new stations (including six results),
  each with a Textbook and Card, and three stories. The flows/certificates Lab has fixed-step deterministic flows,
  PSD/convex fitting, polynomial metrics, phase-plane evidence, an independent holdout and a 20-seed bench/sweep.
  The Van der Pol story fits are pinned. The public build has 140 stations, 87 stories and no private course payload.
  All 97 tests pass. Chrome and Edge each pass 148 new entry/mode/viewport checks, the full metric sweep, worker
  cancellation, offline operation and exact Node/browser agreement; screenshots were reviewed in both themes.
  Limits kept explicit: all six result sources are located, not independently proof-checked; the Lab uses relative
  margins and sampled constraints; its Figure 1 route is an adapted experiment, not an exact numerical reproduction.
  The original dynamics, ball, horizon and metric degree are retained; integration, derivative access and solver differ.
  These distinctions and the source's sign/rate conventions are documented in `docs/m13-m14-review.md`.

  **Educational follow-up.** M14's implementation delivery does not complete beginner education. The current
  Textbooks are highly compressed, and many repeat their Cards. M16 below develops the explanations while
  preserving this milestone's source qualifications, numerical evidence, and validation history.

- [x] **M15 · The ESE6180 companion**: the course pack for ESE 6180 (*Learning and Control*), built with M12's mechanism
  and M13's routes. From a station you reach the course notes and book pages on it; from the notes you reach the
  stations; and a view follows the course's order. Needs M12's Phase 1 and M13, and grows alongside M14's phases.
  - `course/ese6180/` is ignored by git, like the ESE3990 pack. It holds:
    - Chapters 3–7 of the notes (files 02–06): dynamics, stability and Lyapunov theory; parametric learning for system
      identification and imitation learning; empirical risk minimization; imitation learning from training to
      deployment; trajectory-wise stability and stability-constrained imitation learning;
    - Hespanha's *Linear Systems*, Khalil's *Nonlinear Systems* (PDF page = printed page + 16 in Chapters 3–4), and
      Shalev-Shwartz & Ben-David;
    - the paper, and Lohmiller & Slotine.

    File prefixes and chapter numbers differ (file 02 holds Chapter 3), so links name the chapter and section. The
    manifest's SHA-256 hashes are checked before every import.
  - Links carry M12's roles and M13's provenance. The importer reads the notes' sections, numbered statements and pages.
  - The bridge view: the chapters in course order, each section with its stations, and the dictionary between
    continuous and discrete time beside it.
  - Chapters 6 and 7 relate to the paper as motivation, not as prerequisites. Chapter 4 (system identification) is
    in `tmp/` but missing from the proposal's map; it links to `models` and `model-based-deep`.
  - Chapter 7's technical appendix (§7.6) is a draft by its own account: written on request, and flagged "TO BE
    CHECKED 7.1". It stays in the pack with status pending. No public station rests on it until it has been checked
    against primary sources (Angeli 2002; Lohmiller & Slotine 1998).
  - The proposal's seed (56 nodes, 85 typed edges, six views) remains missing; M14 drafted its stations again.
    The extended paper is now available locally as arXiv:2008.05952v2, with version-specific theorem links.
  Done: the ignored pack contains five note chapters and six reference PDFs, 213 page-addressable locators and
  213 links to 41 stations. Import and build verify SHA-256 hashes and reject stale source metadata. Notes,
  numbered statements, books and paper pages link in both directions; the bridge follows chapter/section order,
  with the time dictionary beside it and links into M13's prerequisite routes. Chapter 4 links to model learning;
  Chapters 6–7 stay motivational, and §7.6 and its descendants stay pending and optional. The public build includes
  no pack payload. Validation and limits are recorded in `docs/m15-review.md`.

- [ ] **M16 · Teach the guarantees track from the ground up**: rewrite and expand Parts 15–18 so a reader with
  basic calculus, linear algebra and elementary probability, but no control or learning-theory background, can
  follow the existing destinations. Depends on M13/M14; M15 is an optional local source companion, not a public
  prerequisite. M14/M15 remain completed implementation milestones; this educational milestone is separate.

  **Authoring contract.** Use [atlas-writing](.agents/skills/atlas-writing/SKILL.md) and its
  [multi-agent workflow](.agents/skills/atlas-writing/references/rewrite-workflow.md). The local skill adapts
  bottom-up construction and rigorous-explainer pedagogy to the atlas's Story → Textbook → Card → Lab sequence.
  Upstream documentation is pinned, attributed and hashed under the skill's `references/upstream/`; its standalone
  templates, fixed stage/example quotas, cleanup commands and MathJax-specific checks are not repo requirements.
  Develop the Textbook as the complete lesson, then summarize it in the Card. Keep stories purposeful, including
  the existing no-story exceptions for proof steps. Preserve Markdown/TOML, KaTeX and the offline build.

  **Multi-agent execution is required for this rewrite.** A coordinator owns the route contract, shared metadata,
  integration and acceptance. Writers own disjoint station files. Separate beginner and mathematical reviewers
  review material they did not author; they report findings for writers to patch and recheck. With four available
  slots, use the coordinator + at most two writers + one reviewer, rotating review roles in successive waves.
  Parallelize only dependency-ready slices; Part 18 must reconcile both foundational tracks before acceptance.
  Every assignment specifies owned files, prerequisite revisions, source editions, deliverables, report/handoff
  paths and acceptance criteria. No untracked nested delegation or simultaneous edits to shared files. If agents
  are unavailable, record the missing independent review and leave that gate pending. Full instructions and the
  assignment packet are in the workflow; a second complete competing rewrite is not the default.

  - [x] **Preparation · Local adapted workflow**: upstream skill docs and three relevant editorial references
    downloaded verbatim at recorded commits; a repo-specific skill, multi-agent protocol, discovery instructions,
    and this pending rewrite plan are present. This completes planning only, not the pilot or chapter rewrites.
  - [x] **Phase 0 · Route contract and baseline audit**: inventory all 37 stations (10/5/12/10 across Parts 15–18),
    learning objectives, prerequisite gaps, consumed/introduced notation, source locators, worked examples,
    exercises/solutions, and the purpose of each visual/Lab. Record `docs/m16/route-contract.md` and
    `docs/m16/task-ledger.md`. Agree shared examples and notation before parallel drafts; retain destination-led
    scope and distinguish optional branches from required dependencies.
    Recorded 2026-10-19: all 37 station records, baseline gaps and the 16-station pilot closure are in
    `docs/m16/route-contract.md` and `docs/m16/baseline-audit.md`; ownership and review dispositions are in the ledger.
  - [x] **Phase 1 · Pilot and review**: develop Lyapunov functions, Rademacher complexity and Theorem 4.2, including
    the intermediate bridges those lessons need. Use the shared examples, full consequential derivations, local
    definitions, counterexamples and exercises. Independent beginner and mathematical reviewers test the stated
    objectives and source fidelity. Integrate and inspect the rendered pilot; record `docs/m16/pilot-review.md`.
    Resolve critical/moderate findings before rollout and revise the authoring workflow if needed.
    Recorded 2026-10-19: the three lessons were rewritten with local bridges. Independent agent beginner (B1) and
    mathematical (M1) reviews passed at the accepted hashes after patches and rechecks; the critical finding, a gap in
    the source's Dudley step for the absolute convention, is resolved by an explicit added hypothesis. Build, Node tests,
    Chrome/Edge guarantees checks and changed-view screenshots pass. Evidence and rollout carry-overs are in
    `docs/m16/pilot-review.md`; workflow lessons were added to the rewrite workflow.
  - [x] **Phase 2 · Part 15, dynamics and stability**: rewrite all ten stations, including the pilot's Lyapunov
    lesson. Build from closed loops and flows to stability, Lyapunov functions/equation, comparison, sensitivity,
    converse/ISS ideas, continuous/discrete time and the RL bridges. Derive claims and show computed examples
    instead of substituting short theorem summaries for instruction.
    Accepted 2026-10-19: nine nonpilot lessons developed; the accepted Lyapunov pilot retained with one numerical
    rounding correction. Independent beginner and mathematical rechecks cover all ten final hashes. The discrete
    Lyapunov proof deferred by the pilot is now developed in `time-dictionary`.
  - [x] **Phase 3 · Part 16, incremental stability and contraction**: rewrite all five stations. Connect paired
    trajectories, variational dynamics, metric differential lengths and finite-distance bounds; derive the key
    inequality and its assumptions. Develop the imitation deployment bridge and distinguish three contractions.
    Accepted 2026-10-19: all five lessons independently reviewed and reconciled with Part 15; path invariance,
    nonconvex geometry, energy/norm rates and visited-state deployment premises are explicit. All critical/moderate
    findings closed. Build, 97 Node tests, Chrome/Edge guarantees checks and 128 changed-view checks per browser
    pass, with desktop/mobile and both-theme screenshot inspection. Scoped evidence and source-access limits are
    in `docs/m16/phase2-3-review.md`; source records remain `located`. Phases 4–6 remain pending.
  - [ ] **Phase 4 · Part 17, learning theory**: rewrite all twelve stations, including the random-sign pilot.
    Develop risk/ERM, uniform convergence, concentration, finite classes, Rademacher complexity/properties,
    covers/Dudley, margins, trajectories as samples, and the kernel/structured branches. Use small calculable
    classes before general bounds; explain consequential expectation, supremum and inequality steps.
  - [ ] **Phase 5 · Part 18, learning certificates**: rewrite all ten stations, including the theorem pilot.
    Develop the formulation, derivative-aware class norm, Lemma 4.1 and Theorems 4.2–4.4/5.1–5.2 with explicit
    proof dependencies and where each assumption enters. Connect practice and the adapted Van der Pol experiment.
    Preserve independent-trajectory counts, margin conventions, norm/energy rates, feasibility conditions and
    the distinction between small violation probability and a certificate valid everywhere.
  - [ ] **Phase 6 · Cross-route integration and acceptance**: audit every station and the Theorem 4.2, contraction,
    matrix, kernel and adapted Figure 1 routes for continuity, notation, definitions, links, examples, exercises,
    Cards and visual/experimental consistency. Keep per-station coverage and review dispositions in
    `docs/m16/coverage.md`, with a final `docs/m16/rewrite-review.md`. Run build/tests and the guarantees browser
    checks, extending checks where new content needs them; inspect every changed lesson on desktop/mobile in
    both themes. Preserve source-review status unless an independent proof audit supports a recorded change.

  **Done when** every station has a developed lesson distinct from its Card; independent reviewers can complete
  its reader tasks from the declared prerequisites and reproduce consequential calculations; all critical/moderate
  teaching and mathematical findings are resolved; and integrated route/rendering checks pass. Keep review and
  validation evidence explicit: agent beginner review is not a student study, browser checks are not proof audits,
  and a sampled grid or holdout is not a universal guarantee. No exact Figure 1 reproduction or human review is
  claimed by this milestone without separate evidence. Progress is tracked per phase, not inferred from length.
