# M15 implementation review, 2026-10-19

The ESE6180 companion is local at `course/ese6180/rl_atlas-ese6180.html`. Its course materials, copied PDFs,
manifest, curated links, import data and HTML remain ignored by git. The public atlas's 140-station curriculum
and prerequisite graph receive no private course payload.

## Sources and navigation

The pack contains Chapters 3–7, Hespanha, Khalil, Shalev-Shwartz and Ben-David, both the supplied conference paper
and extended arXiv:2008.05952v2 paper, and Lohmiller–Slotine. The eleven copies retain their source bytes.
ASCII filenames avoid the installed PDF tool's failure to open an accented Windows path. The chapter/file-prefix
distinction is explicit: original file 02 is Chapter 3, through original file 06, Chapter 7.

There are 213 locators and 213 curated links to 41 stations. Sections and numbered definitions, assumptions,
theorems, lemmas, propositions, corollaries, examples and remarks have independent references. Statement titles
and page numbers are imported; complete statements and proofs stay in the PDFs. Books and papers have curated
anchors checked against text on the referenced page. Source titles affected by PDF extraction can be overridden
without changing the source. All sources are **located**, not independently proof-checked; §7.6 and its descendants
are **pending**.

Every source document has its own SHA-256 in the manifest. Import checks all hashes and extracts all source
locators before changing import output. Build checks hashes again and requires the imported source specification
to match the current manifest. A source mismatch cannot silently retain a previously successful import.

The source pages and station tabs use the same typed links in both directions. Search finds chapters, sections
and statements. Course order shows all five chapters, each section's stations and a continuous/discrete-time
dictionary. A matching map lens groups the stations by their first course occurrence. Each station can open its
public prerequisite route. Chapter 4 explicitly reaches `models` and `model-based-deep`; Chapters 6–7 have motivation
or optional relations. Course links never become edges in the public graph.

The source appendix says it is under construction and includes “TO BE CHECKED 7.1”. Every §7.6 item remains
pending and optional. The builder rejects required or sufficient links from pending sources. This work does not
validate that appendix against Angeli or Lohmiller–Slotine, and no public station is based on it.

## Validation

- The public build has 140/140 written stations and zero warnings; both course packs build without errors.
- `node --test`: 97/97 pass. The course gate includes six additional invented-material tests for source hashes,
  stale imports, pending routes, page/printed-offset consistency, parser boundaries and private-pack coverage.
- The existing ESE3990 Chrome pilot passes all nine map views, PDF routes, paired code, hidden solutions, saved
  progress, search, Lab links and responsive themes.
- Chrome 155.0.8059.80 and Edge 155.0.4283.62 each visit all 213 ESE6180 source anchors, exercise source/station
  navigation, course search, the bridge and map lens, public prerequisite-route selection and proof-progress
  persistence. Each checks light/dark themes at 1440 and 390 pixels, with zero page errors, external requests,
  page overflow or KaTeX errors.
- Both browsers open the requested PDF page fragments for Khalil §4.1 (PDF 128, printed 112), Boffi Theorem 4.2
  (extended v2 PDF 7), and the course appendix §7.6 (PDF 18). These checks establish navigation to the requested
  fragment, not an independent reading of the PDF viewer's page counter.
- Rendered source-page inspection confirms Khalil's 16-page offset, Hespanha's continuous-time Lyapunov equation
  and the appendix's draft status. Companion screenshots cover the bridge/dictionary, course map, station tabs,
  source pages, pending labels and mobile layouts. Evidence is in ignored `browser-check-results/m15-{chrome,edge}/`.

The missing proposal seed is unnecessary for this companion. The extended paper, once missing from the source
inventory, is available in the repository's local materials and included by its exact version. No push or
deployment is part of this work.
