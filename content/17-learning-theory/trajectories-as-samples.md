+++
summary = "One independent initial state gives one trajectory example, regardless of its number of sampled times."
prereqs = ["dynamical-systems", "risk-erm"]
time = "statistical"
sources = [{ text = "Boffi, Tu, Matni, Slotine and Sindhwani, Learning Stability Certificates from Data", kind = "paper", locator = "arXiv:2008.05952v2, September 2020, §3.1, equations (3.1)–(3.3), pp.4–5", review = "located", url = "https://arxiv.org/abs/2008.05952v2" }]
+++

## Textbook

### The idea {#statement}

Draw independent initial states and treat each whole trajectory as one example. Its loss asks whether any time violates the certificate condition.

### The calculation {#reasoning}

Points along one trajectory are dependent. Refining a timestep improves a numerical maximum but does not multiply independent sample count. Twenty initial states with 600 points each still give n=20. A finite grid can miss a between-time violation. A known Lipschitz-in-time constant plus a grid margin can bridge that gap. The Lab uses a separate random stream for holdout initial states and labels its finite horizon.

### Assumptions and domain {#assumptions}

I.i.d. initial states from the stated distribution, common horizon, bounded trajectories and measurable maxima.

### Where it is used {#uses}

[[learning-certificates]], [[boffi-lemma-4-1]].

## Card

### The idea {#idea}

Draw independent initial states and treat each whole trajectory as one example. Its loss asks whether any time violates the certificate condition.

### Intuition and example {#intuition}

Points along one trajectory are dependent. Refining a timestep improves a numerical maximum but does not multiply independent sample count. Twenty initial states with 600 points each still give n=20. A finite grid can miss a between-time violation. A known Lipschitz-in-time constant plus a grid margin can bridge that gap. The Lab uses a separate random stream for holdout initial states and labels its finite horizon.

### Assumptions and domain {#assumptions}

I.i.d. initial states from the stated distribution, common horizon, bounded trajectories and measurable maxima.

### Where it is used {#uses}

[[learning-certificates]], [[boffi-lemma-4-1]].
