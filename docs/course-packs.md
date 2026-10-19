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
