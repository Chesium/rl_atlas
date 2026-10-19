# Private course packs

A pack adds course references beside the public atlas's entries. Its documents, links, notes, solutions and
generated HTML belong in `course/<id>/`, which git ignores. The normal `python build.py` bundles no pack payload.
The generic mechanism and the invented fixtures in `tests/course-pack/` can be shared.

```powershell
python tools/course-import.py course/ese3990
python build.py --course course/ese3990
```

Open `course/ese3990/rl_atlas-ese3990.html`. Keep the PDFs and notebooks at their manifest paths beside it.
Poppler's `pdftotext` imports slide titles/numbers, question regions and book sections; `pdftoppm` renders pictures.
Both must be on PATH for a full import. Notebook import needs only Python 3.11+. Reimport after changing materials
or adding references to new slides. The importer reads the source documents; it writes only `import/`.

`course.toml` identifies the course and its materials:

```toml
id = "example"
code = "EX101"
title = "An example course"

[slides]
path = "lectures.pdf"
lectures = [{ n = 1, title = "Introduction", pages = [1, 20] }]

[[notebook]]
id = "HW1"
ps = 1
title = "Prediction"
path = "notebooks/prediction.ipynb"

[[paper]]
id = "Quiz1"
title = "Quiz 1"
path = "quiz.pdf"
style = "quiz" # or "problems" for numbered problems with lettered parts

[book]
id = "SB"
title = "Sutton & Barto (2018)"
path = "book.pdf"
offset = 22
```

The manifest's slide ranges are combined-PDF pages. Link references use the slide numbers printed on those pages.
Each `links.toml` or `links/*.toml` entry names exact items and existing station IDs:

```toml
[[link]]
at = "L1:3-5"
stations = ["sarsa", "q-learning"]
role = "compares"
note = "The next action is sampled in Sarsa and maximized in Q-learning."
```

Roles are `introduces`, `derives`, `implements`, `compares`, `assesses`. An `at` may name a lecture (`L1`), slide
or inclusive range (`L1:3-5`), question (`Quiz1:2`, `Rec:2c`), notebook (`HW1`), activity (`HW1:A1`), function
(`HW1:td_update`), cell (`HW1:#stable-cell-id`), notebook question (`HW1:Q1`), prediction (`HW1:P1`), or book
section (`SB:6.4`). The importer lists all items in `import/*.json`. Book references are also added from entries'
Sutton & Barto section citations, with printed and PDF pages kept separate.

A function link may pair one station's pseudocode line IDs to substrings of its original code:

```toml
pair = { update = "return q + alpha * (target - q)" }
```

`notes/*.toml` holds `[[note]]` records (`stations`, optional `at`, `title`, Markdown `text`).
`solutions/*.toml` holds `[[solution]]` records (`at`, optional `answer`, Markdown `text`), hidden by flip cards.
`titles/*.toml` supplies `[titles]` overrides keyed by slide reference when PDF text loses a title.
`notation.toml` holds `[[symbol]]` records (`atlas`, `course`, `note`); `atlas` must match a public notation entry.
`maps.toml` defines `[[compare]]` records (`id`, `title`, `stations`, optional `caption`, `targets`, `notes`) and
`[[derive]]` records (`id`, `title`, `steps` with `station`, Textbook `label`, `text`, optional course `at` list).
`worlds.toml` adds grid specifications; `lab.toml` uses the public preset format. `experiments.toml` connects
activities to presets through `[[experiment]]` records (`at`, `lab`, `note`).

The course tab, course item pages, search and maps read the same links in both directions. Assessment ticks persist
in the browser. A course build includes lecture, homework, assessment, comparison and derivation map views;
derivation nodes open their named Textbook statement. These maps remain in the course mechanism for now.

Validation:

```powershell
node --test
npm install --no-save --package-lock=false playwright-core
node tools/course-check.js --browser chrome
node tools/course-check.js --browser edge
```

The tests use invented materials and skip the real pack checks when it is absent. The optional browser check needs
the local ESE3990 pack and an installed browser. `--exe PATH` accepts another Chromium browser, including Brave;
`--file PATH` and `--out DIR` override its input and report folder. Reports and screenshots go to ignored
`browser-check-results/`. They contain private material and must stay local.
`--pilot` checks the study flows and all map views without visiting every linked route again.

PDF links use relative `file://` URLs with `#page=N`. If a browser blocks them, serve the pack folder with
`python -m http.server` and open its HTML on localhost. Browser navigation checks establish that the requested
page fragment reaches the PDF viewer; they do not independently read the viewer's displayed page counter.

## Chapter notes and multiple reference sources

A pack can also declare `[[document]]` records. Each names a PDF inside the pack, its exact SHA-256, source kind,
edition/version and review status. This is independent of the older single `[book]` and slide mechanisms:

```toml
[[document]]
id = "Notes3"
title = "An invented dynamics chapter"
path = "chapter-3.pdf"
sha256 = "<the source file's 64 lowercase hexadecimal SHA-256 characters>"
kind = "course note"
edition = "Example course, supplied Chapter 3"
review = "located"
chapter = 3
pending_sections = ["3.6"]
pending_note = "This appendix is awaiting source review."
```

The importer extracts numbered sections and statements (definitions, assumptions, theorems, lemmas, propositions,
corollaries, examples and remarks), retaining the first page of repeated labels. Chapter numbers come from the
manifest; filename prefixes do not determine them. Wrapped headings are joined conservatively. A document's
`titles = { "proposition-3.1" = "Corrected title" }` overrides extraction errors without changing the PDF or page.
Overrides must name existing locators.

Books and papers use curated anchors, each checked against text on its specified PDF page:

```toml
[[document]]
id = "Book"
title = "An invented reference book"
path = "book.pdf"
sha256 = "<the source file's SHA-256>"
kind = "textbook"
edition = "Example, 2nd edition"
review = "located"
offset = 16

[[document.anchor]]
id = "4.1"
title = "Autonomous systems"
page = 128
printed = 112
match = "Autonomous Systems"
```

`match` is a case-insensitive regular expression. `offset`, when declared, enforces `PDF page = printed page +
offset` for every anchor with a printed page. This offset belongs to the declared source/edition, never all PDFs.
Use a version-specific `edition` for papers and add anchors for that exact version's theorem numbering.

Both import and build rehash every declared document. A mismatch stops the import before it changes `import/`;
missing PDF tools or a failed PDF extraction also stop document imports. Changed manifest metadata requires a
fresh import. `import/documents.json` records the imported specification and locators. These checks establish
file identity and locator consistency, not mathematical correctness.

Links use the existing course roles and may add M13's relation type:

```toml
[[link]]
at = "Notes3:3.2" # or "Notes3:theorem-3.4", "Book:4.1"
stations = ["lyapunov-functions", "time-dictionary"]
role = "compares"
relation = "illustrative" # required, sufficient, illustrative, motivation, optional
note = "Compare a one-step difference with a continuous-time Lie derivative."
```

Provenance is inherited from the source, including its edition, locator and review status. `pending_sections`
applies to a section, its subsections and their statements. Pending links cannot be `required` or `sufficient`.
These course relations do not modify the public prerequisite graph. Source status, personal proof progress and
numerical evidence remain separate.

Document pages, station course tabs and search use the same references in both directions. Packs with chapter
notes gain **Course order** on the map and a bridge page at `#/c/bridge`, with sections and their stations beside
the continuous/discrete-time dictionary. Prerequisite links open M13's route view at the selected station.

The local ESE6180 pack is built and checked with:

```powershell
python tools/course-import.py course/ese6180
python build.py --course course/ese6180
node tools/control-course-check.js chrome
node tools/control-course-check.js edge
```

Open `course/ese6180/rl_atlas-ese6180.html`. Its PDFs, manifest, links, import output and HTML remain private and
ignored. Browser reports and screenshots stay in ignored `browser-check-results/m15-{chrome,edge}/`.
