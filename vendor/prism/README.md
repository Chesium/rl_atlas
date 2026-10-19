# Prism 1.30.0

Python-only browser bundle from https://github.com/PrismJS/prism/tree/v1.30.0:

- `components/prism-core.min.js`
- `components/prism-python.min.js`
- `plugins/keep-markup/prism-keep-markup.min.js`

`prism-python.min.js` concatenates the MIT license, `globalThis.Prism = { manual: true };`,
and those three upstream files in order. Automatic highlighting is disabled: `course.js`
highlights Python blocks when a course tab or page renders. Keep Markup preserves the
paired code lines and their `data-mate` attributes. Colors come from `course.css`.

The bundle and license are embedded by `build.py`, so the atlas works offline without a CDN.
