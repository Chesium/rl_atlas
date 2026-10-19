# Textbook-derived editorial style

This reference records a comparative style skim of 12 PDFs supplied for the
CMU 11-768 agent notes on 12 September 2026. Ten are textbooks or monographs,
one is a set of theory lecture notes, and one is a short technical paper. The
observations concern sampled front matter, introductions, technical sections,
examples, exercises, and rendered pages. They are not cover-to-cover judgments.
Page numbers below are one-based PDF-viewer pages, not printed page labels.

**Precedence:** Apply this source-derived editorial guidance over conflicting
presentation prescriptions elsewhere in the skill. Explicit user instructions
remain first. Borrow pedagogical methods, not distinctive wording or page design.

## Nine elements to carry into technical learning material

1. **Problem before abstraction.** Open with a consequential task, decision, or
   failure. Let it raise the exact question the formal model will answer. Return
   to the same case after the derivation. An everyday anecdote is optional.
   Evidence: Shalev-Shwartz and Ben-David p. 33; Murphy I p. 76; ISLP p. 12;
   Hardt and Recht p. 11.
2. **A recurring conceptual model.** Name the objects and relationships that
   later sections reuse. A new mechanism should alter an identified part of
   this model. Keep logical dependencies clear without forcing each section to
   depend on the immediately previous one. Evidence: Murphy I p. 31; Bach p.
   11; Hardt and Recht p. 21.
3. **Local definitions and assumptions.** Define every technical term and
   symbol before first substantive use. Give its domain and units when
   relevant. State the assumptions and quantifiers of a claim. A glossary or
   notation appendix is helpful but cannot substitute for a local definition.
   For algorithms, state inputs, outputs, parameters, and permitted effects.
   Evidence: Bishop p. 11; Murphy I p. 803; Shalev-Shwartz and Ben-David p.
   43; Phuong and Hutter pp. 5–6, 16.
4. **Visible derivation followed by interpretation.** Show the steps that
   determine the conclusion, identify invoked results, and explain what the
   equation means in words. Include a numerical, limiting-case, or independent
   check when one is informative. Do not hide a crucial inference in "clearly"
   or "it follows." Do not spell out routine algebra merely to meet a quota.
   Evidence: Mohri et al. p. 33; Bach p. 239; Murphy I p. 342;
   Shalev-Shwartz and Ben-David p. 392.
5. **Running examples and figures that carry an argument.** Reuse one case
   across several concepts. A figure should expose a mechanism, comparison,
   geometry, state transition, or cost trade-off. Its caption should tell the
   reader what to infer. A proof does not require a figure when one adds no
   explanatory value. Evidence: Bishop p. 24; Murphy I p. 76; ESL p. 30;
   ISLP p. 27.
6. **Operational algorithms after the model.** A concise trace, pseudocode,
   code fragment, or lab can show how a formal object becomes an executable
   procedure. Explain how each step implements the model and what the code
   checks or guarantees. Include actual output when useful. Evidence: Mitchell
   pp. 4, 60; ISLP pp. 50, 125; Phuong and Hutter pp. 5–6.
7. **Comparisons by assumptions and failure modes.** Compare alternatives by
   when they work, what evidence supports them, and how they fail. Keep
   separate outcome dimensions separate until an application-specific
   decision rule justifies combining them. Evidence: ESL p. 30; Hardt and
   Recht p. 116; Murphy II p. 1241.
8. **Explicit limits and evidence classes.** Distinguish a theorem under
   assumptions, a numerical or engineering check, an empirical observation,
   and a product-specific claim. Explain finite-case or implementation limits.
   State where knowledge remains unsettled. Evidence: Bach p. 123;
   Shalev-Shwartz and Ben-David p. 392; Telgarsky p. 3.
9. **Exercises and prose pacing.** Test derivation, assumption checking,
   counterexamples, computation, and design judgment where appropriate. In
   prose, give a claim, mechanism, and limitation separate sentences when they
   are distinct ideas. A little elaboration is preferable to dense compression.
   Avoid narrating the source lecture or announcing the writing method in the
   chapter body. Evidence: ISLP p. 73; Mohri et al. p. 40; Mitchell p. 60.

## Prose craft from the same source sample

The nine elements above concern lesson structure. A second pass over at least
two passages in each of the twelve PDFs yielded sentence- and paragraph-level
guidance. These are editorial inferences, not a claim that all twelve authors
write in one voice. The expanded, linked evidence is in the project's
`textbook-style-report.html`, section "What the prose itself does."

1. **Give a paragraph one intellectual move.** State the result, explain its
   mechanism, then give its consequence or boundary. Separate these jobs when
   each requires a distinct sentence. Mohri p. 33; Hardt and Recht p. 116;
   Bach p. 123.
2. **State the question before the machinery.** Tell the reader what must be
   predicted, compared, or proved before introducing dense notation. Mohri p.
   26; ESL p. 31; Bishop p. 32.
3. **Give symbols grammatical roles.** Say what an object does in the problem
   as well as its domain. Interpret a posterior, prediction, or representation
   after its formal definition. Murphy I p. 76; ESL pp. 30-31; Phuong and
   Hutter p. 5.
4. **Keep referents stable.** Reuse a technical noun while its relation to
   other objects is being built. Do not vary "proposal," "call," "action," and
   "execution" as synonyms when they represent different stages. Mitchell
   p. 35; Shalev-Shwartz and Ben-David p. 43; Murphy II p. 247.
5. **Explain a derivation's hinge.** Name the assumption, inequality, or
   obstruction that changes the argument's direction. Routine algebra can be
   brief; a crucial implication cannot. Murphy I p. 342; Bach p. 239; ESL
   p. 31.
6. **Translate important equations into meaning and checks.** Explain the
   direction of dependence, then give a numerical case, limiting case, or
   operational diagnostic when helpful. Mohri p. 33; Murphy I p. 342; ISLP
   p. 27.
7. **Move from a case to a class of cases and return.** Say which features of
   the example generalize and which are incidental. Bishop p. 32; Mitchell
   p. 36; Murphy II p. 247.
8. **Make transitions carry a reason.** End one paragraph with the fact that
   makes the next mechanism necessary. Prefer a causal bridge to an
   announcement about what the text will cover. Mitchell p. 36; Bishop p. 32;
   Hardt and Recht p. 33.
9. **Place qualifiers beside claims.** State assumptions, evidence class,
   finite-case limits, and unproved extensions at the point of the claim.
   Bach p. 123; Shalev-Shwartz and Ben-David p. 392; Hardt and Recht p. 116;
   Murphy II p. 1241.
10. **Describe code by contract and behavior.** Explain inputs, outputs,
    effects, and failure states. Avoid line-by-line syntax commentary when it
    hides the model. Phuong and Hutter p. 6; Mitchell p. 35; ISLP p. 50.
11. **Use a restrained, unhurried cadence.** Vary sentence length and let a
    short sentence land a consequential result. Prefer object-level transitions
    to self-referential teaching patter. This is a synthesis for these notes,
    not a prescription found verbatim in one source. ISLP p. 27; Bishop p. 24;
    Mohri p. 33; Telgarsky p. 15.

## What each reference contributes

| Reference (local PDF) | Transferable habit | Boundary |
|---|---|---|
| Mohri, Rostamizadeh, Talwalkar, *Foundations of Machine Learning* (`10290.pdf`, pp. 14, 26, 33, 40) | Question → formal model → theorem/proof/example; chapter notes and exercises | Its intentionally succinct proofs may need more intermediate explanation. |
| Bishop, *Pattern Recognition and Machine Learning* (`Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf`, pp. 11, 24, 32) | Running example, interpreted figures, notation discipline | Combine concept-first pacing with stronger proof detail where needed. |
| Murphy, *Probabilistic Machine Learning: An Introduction* (`book1.pdf`, pp. 31, 76, 342, 803) | Unifying lens; equation in words; numerical example; practical diagnostic | A large-reference cross-link never replaces local definition. |
| Murphy, *Probabilistic Machine Learning: Advanced Topics* (`book2.pdf`, pp. 39, 247, 321, 1241) | Systematic advanced definitions, small-to-general examples, practical advice | Select depth relevant to the chapter spine. |
| Hastie, Tibshirani, Friedman, *The Elements of Statistical Learning* (`ESLII_print12_toc.pdf`, pp. 20, 30, 58) | Compare methods through assumptions and errors | Unpack bridges in dense technical prose. |
| James, Witten, Hastie, Tibshirani, Taylor, *An Introduction to Statistical Learning with Applications in Python* (`ISLP_website.pdf`, pp. 12, 27, 73, 125) | Data-first openings, concept explanation, labs with code/output, mixed exercises | Keep mathematical depth appropriate for advanced graduates. |
| Bach, *Learning Theory from First Principles* (`ltfp_book.pdf`, pp. 11, 19, 123, 239) | Motivation, prerequisite map, assumption-led derivations, finite-case limits | Add worked system traces when abstract proof lacks operational grounding. |
| Mitchell, *Machine Learning* (`MachineLearningTomMitchell.pdf`, pp. 3–4, 35, 60) | Problem/algorithm/theory/practice progression and traces | Do not treat historical implementation details as current practice. |
| Hardt and Recht, *Patterns, Predictions, and Actions* (`patterns.pdf`, pp. 11, 21, 33, 116) | Consequential framing; prediction connected to action; empirical/theoretical boundary | Use historical framing only when it advances the argument. |
| Shalev-Shwartz and Ben-David, *Understanding Machine Learning* (`understanding-machine-learning-theory-algorithms.pdf`, pp. 33, 43, 392) | Concrete task → formal quantifiers → guarantee and proof conditions | Explain every symbol locally; do not assume notation fluency. |
| Telgarsky, *Deep Learning Theory Lecture Notes* (`index.pdf`, pp. 3, 15, 63) | Scope honesty, simplified propositions | Do not imitate draft shorthand or unfinished sections. |
| Phuong and Hutter, *Formal Algorithms for Transformers* (`2207.09238v1.pdf`, pp. 1, 5–6, 16) | Precise pseudocode, dimensions, inputs/outputs/parameters, notation | Its 16-page paper pace cannot replace textbook narrative and exercises. |

## Chapter pattern for advanced technical readers

1. Open with a specific task and why an error would matter.
2. Define the model's objects and state every assumption. Build a local notation
   table as the chapter grows, checking for symbol collisions.
3. State the claim and its status: definition, derivation, theorem, heuristic,
   empirical observation, or product-specific behavior.
4. Derive the mechanism in visible steps. Interpret each important equation and
   check a limiting case, numerical example, or independent observation.
5. Revisit the opening task with a trace, figure, table, or code fragment when
   it clarifies the mechanism. Show a failure or uncertain path as well as a
   successful one when both matter.
6. Compare alternatives by assumptions, outcomes, cost, delay, and risk.
   Combine dimensions only under a stated decision rule.
7. End with limits, evidence gaps, and exercises that test more than recall.

For transcript-grounded notes, preserve the transcript's topic order as the
coverage spine, but write an independent chapter. Put video timestamps in
section headings if the reader needs to return to the recording. Keep the body
free of "at minute N the lecturer said" narration. Define every term and
symbol before use, including terms inherited from a source transcript.

### Sentence-level pacing example

Compressed: "Evaluation should report the vector `(S,C,D,R)`, not collapse
everything into a single leaderboard rank."

Developed: "Let `S` measure task success, `C` resource cost, `D` delay, and
`R` risk. Report these four quantities separately. A system that improves
success by doubling cost may be desirable in one application and unacceptable
in another. A single rank hides the information needed to make that decision."
