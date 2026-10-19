# M12 implementation review, 2026-10-19

The companion is built at `course/ese3990/rl_atlas-ese3990.html`. It and its course materials are ignored by git.
The reusable mechanism is documented in [course-packs.md](course-packs.md).

The importer read 566 lecture pages, five notebooks with 23 activities, Quiz 1's 15 questions, Quiz 2's 12
questions, the recitation's three problems and nine parts, and 153 book sections. It rendered 274 linked pictures.
The compiled pack has 522 role-labeled links to 80 stations, 38 notes, 39 solutions and three Lab presets.

The four pilot flows were exercised in installed Chrome and Edge from `file://`:

1. A station's course tab opens its lecture and book PDFs with the expected relative path and `#page=N`.
2. Hovering a paired homework target highlights its pseudocode partner, and vice versa.
3. A question hides its solution until flipped, links back to the explanation, and keeps its solved tick after reload.
4. The map's visible tabs switch between lecture, comparison and derivation views. A derivation step accepts Enter
   and opens the named Textbook statement. Ctrl K finds and opens a quiz question.

Both browsers also visited 571 linked course pages and station tabs, rendered all nine map variants, opened all
three course Labs, and checked the station tab in both themes at 1440 and 390 pixels. No page errors, external
network requests or page overflow were observed. The focused pilot waited for the slippery cliff's full 20-seed
bench. Reports and screenshots stay in `browser-check-results/course-{chrome,edge}/` and the corresponding
`course-{chrome,edge}-pilot/` folders. They contain course material and must not be published.

Screenshot review found overlapping function labels in homework maps and overflowing labels in comparisons.
Function rows now reserve their actual wrapped height and long comparison labels are abbreviated with the full
description in their tooltip. Mobile review found the fourth station-view tab and long book links widened the
page; tabs now wrap and book links break naturally. A question-picture click used to flip the card and open a
zoom overlay over the solution; pictures inside cards now belong only to the flip gesture. Questions also show
their imported text if no picture is available, and book-only references get their own visible section.

Reduced motion now removes animation delays as well as durations. This also prevents stations and backup diagram
nodes from staying invisible while a disabled animation's staggered delay runs.

The course text color's sRGB contrast is 5.18:1 against the light background (5.61:1 on its surface) and 6.85:1
against the dark background (6.36:1 on its surface), exceeding 4.5:1 in both themes.

`node --test` passes all 83 tests, including the course gate's seven Python checks. The latter cover notebook
cell IDs, original function excerpts, predictions and answers, PDF text parsers, link validation, code pairings,
derivation references, printed slide-number gaps, deterministic public bundles and private-payload exclusion.
When the real pack exists they check its coverage and run all four numeric-solution check scripts. Course builds
and the normal build pass; rebuilding the public file produces identical bytes and no course payload.

Limits: Brave is not installed, so its own PDF behavior remains unverified. The PDF test confirms the viewer's
URL and page fragment; it does not inspect the internal PDF viewer's page counter. The browser runs are automated
study-flow checks, not a student's revision session. Browser screenshots were reviewed for layout; they do not
establish that every slide transcription or worked explanation has had an independent scholarly review.
