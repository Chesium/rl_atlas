# Technical-writing guidance for rigorous lessons

Read with `textbook-style.md`. The latter supplies the pedagogical structure
and depth derived from twelve machine-learning references. These two guides
refine the prose, notation, evidence, and presentation. Explicit user
instructions always take precedence. Neither guide's paper- or thesis-specific
rules are compulsory chapter architecture.

Sources (accessed 12 September 2026):

- Gernot Heiser, [Tips and Guidance for Students and ECRs Writing Papers and Reports](https://gernot-heiser.org/style-guide.html).
- Derek Abbott, [Guide to technical writing](https://www.eleceng.adelaide.edu.au/personal/dabbott/wiki/index.php/Guide_to_technical_writing).

## Apply in technical lessons

1. **Maintain the reader's knowledge state.** Use a concept only after the
   prerequisites for understanding it have appeared. Define terms, symbols,
   domains, and assumptions at first substantive use. When definitions are
   circular, give a brief informal orientation and then the precise definition.
   Refresh a term after a long gap without changing its name. [Heiser](https://gernot-heiser.org/style-guide.html)
2. **Make the claim visible at sentence, paragraph, and section scale.** Give
   each sentence a clear referent and each paragraph one intellectual move.
   Use a transition to explain why the next step follows. Heiser's two-to-four
   sentence paragraph is a useful diagnostic, not a mandatory length.
   [Heiser](https://gernot-heiser.org/style-guide.html)
3. **Be concise only after being complete.** Delete words that add no meaning.
   Retain the definition, crucial inference, interpretation, evidence class,
   and limitation. Split a sentence when it contains independent claims.
   [Heiser](https://gernot-heiser.org/style-guide.html)
4. **Name actors and testable properties.** Prefer active voice when it
   identifies who proposes, authorizes, executes, or verifies an action. Passive
   voice is appropriate when the actor is immaterial. Replace vague praise
   such as "good" or "significant" with a named metric, baseline, and observed
   difference. Use *prove* for formal deduction; use *observe*, *show*, or
   *support* for empirical evidence. [Heiser](https://gernot-heiser.org/style-guide.html),
   [Abbott](https://www.eleceng.adelaide.edu.au/personal/dabbott/wiki/index.php/Guide_to_technical_writing)
5. **Match grammar to epistemic status.** Use present tense for stable
   definitions and results. Date historical or time-dependent claims. Use
   precise modality: *must* for an obligation or invariant, *can* for
   capability, *may* for uncertainty, *should* for a recommendation, and
   *would* for a counterfactual. Avoid vague hedges and unjustified certainty.
   [Abbott](https://www.eleceng.adelaide.edu.au/personal/dabbott/wiki/index.php/Guide_to_technical_writing)
6. **Treat equations, quantities, and figures as part of prose.** Define every
   symbol and unit, punctuate displayed equations as sentences, and interpret
   the consequential result in words. State whether a figure is theoretical,
   simulated, or measured; give its conditions, axes, units, and a caption that
   supports an inference. Distinguish percentages from percentage-point changes
   and report uncertainty when it affects the conclusion.
   [Heiser](https://gernot-heiser.org/style-guide.html),
   [Abbott](https://www.eleceng.adelaide.edu.au/personal/dabbott/wiki/index.php/Guide_to_technical_writing)
7. **Keep references findable and terminology stable.** Expand an acronym at
   first use and refresh it after a long gap. Use an exact section, figure, or
   dated source link instead of "later" or a relative time phrase. Give web
   references a title, author or institution, URL, and access date where useful.
   Use consistent US English and the Oxford comma in this project.
   [Heiser](https://gernot-heiser.org/style-guide.html),
   [Abbott](https://www.eleceng.adelaide.edu.au/personal/dabbott/wiki/index.php/Guide_to_technical_writing)

## Resolved conflicts and non-universal rules

| Guide prescription or tension | Rule for these graduate lessons |
|---|---|
| Heiser favors brevity; the reader requests a little more explanation than compressed theory prose. | Cut empty wording, but keep separate sentences for definition, mechanism, consequence, and limit. Clarity and explicit prerequisites outrank word count. |
| Heiser's section previews and paper/thesis structure versus an independent textbook voice. | Use meaningful section titles and logical bridges. Do not add "this section will" narration or impose paper-length/abstract rules on chapters. |
| Abbott discourages *could*, *would*, and *should*. | Keep modal verbs when they express a precise possibility, counterfactual, or recommendation. Remove only empty hedging. |
| Abbott discourages *belief*; probabilistic agents use a belief state. | Define *belief state* or *belief distribution* mathematically as a distribution over possible states. Avoid subjective "we believe" as evidence. |
| Abbott prefers single-letter variables and avoids opening sentences with symbols or abbreviations. | Choose conventional, defined mathematics and descriptive code names. An English lead-in often helps; never obscure the subject to satisfy an absolute typographic ban. |
| Heiser suggests italicizing new terms; formats vary. | Mark a new term consistently with the format's definition convention, such as an HTML `<dfn>` or a definition box. Its local explanation matters more than a particular font treatment. |
| Both guides address scientific papers and discipline-specific conventions. | Follow their clarity and evidentiary principles. Keep the chapter's graduate pedagogy and user-requested math, code, and examples. |

These are editorial decisions for this project, not claims that either guide
endorses every resolution. Paraphrase the guides; do not imitate distinctive
wording.
