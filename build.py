"""Build RL Atlas from content/: check it, compile it to app/content.js, bundle rl_atlas.html.

    python build.py

Errors stop the build; warnings name content that is still incomplete.
Needs Python 3.11+ and nothing else.
"""

from __future__ import annotations

import base64
import html
import json
import logging
import re
import sys
import tomllib
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONTENT = ROOT / "content"
APP = ROOT / "app"
OUT = ROOT / "rl_atlas.html"

log = logging.getLogger("build")

# What a written entry must contain. Card sections are named by the ids of their "### Title {#id}" headings.
REQUIRED = {
    "algorithm": {
        "fields": ("summary", "lab", "sources", "story"),
        "card": ("idea", "update", "change", "backup", "pseudocode", "perks", "flaws", "knobs", "pitfalls", "check"),
    },
    "concept": {"fields": ("summary", "sources"), "card": ("idea",)},
    "result": {"fields": ("summary", "sources", "time"),
               "card": ("statement", "intuition", "assumptions", "proof", "uses")},
}
FRONT_MATTER = {"summary", "change", "prereqs", "lab", "sources", "story", "story_in", "time"}
# The keys of a Lab preset (content/lab.toml); any other key is a knob, and what its charts may plot.
# Lab algorithms that teach a concept station, each with its station: DPG on the throw, offline RL on the cliff,
# imitation on the ice bridge, planning in a learned model among hidden cliffs. Their pseudocode is the station's.
RUNNABLE_CONCEPTS = {"dpg": "dpg", "offline-q": "offline-rl", "offline-bcq": "offline-rl", "bc": "imitation", "dagger": "imitation",
                     "model-planner": "model-based-deep"}
PRESET_KEYS = {"title", "env", "algorithms", "racers", "units", "runs", "charts", "measures", "film", "intro", "success", "sweep", "seeds", "home", "fixed"}
CHARTS = {"return", "steps", "optimal", "left", "delta", "error", "optimal-error", "match", "greedy", "ve", "weights",
          "policy-value", "right", "aim", "kl", "clipped", "deployed", "labels"}
# What a preset of recorded runs (racers that name a recording) can chart: from the recordings, nothing is recomputed.
RECORDED_CHARTS = {"return", "test", "steps", "loss", "td", "q", "eps", "kl", "clipped", "jitter", "jitter-train"}
RECORDINGS = CONTENT / "recordings"
DEEP_WORKER = ["dmath", "nn", "worlds", "dqn", "pg", "ac", "record", "worker"]  # lab/deep/, in load order: the Worker's text
MEASURES = {"error", "optimal-error", "match", "greedy", "ve", "policy-value", "right", "aim", "deployed"}
# Stations the math macros of app/js/math.js link to.
MACRO_TERMS = ("step-size", "discount", "epsilon-greedy", "lambda-return", "td-error")
# What the Textbook numbers, and how a \ref{label} to each one reads.
REF_TEXT = {
    "section": "§{}", "equation": "({})", "figure": "Figure {}", "algorithm": "Algorithm {}",
    "definition": "Definition {}", "theorem": "Theorem {}", "lemma": "Lemma {}", "example": "Example {}",
}
# ::: blocks that state something, as in a textbook. The first four are numbered.
STATEMENTS = {
    "definition": "Definition", "theorem": "Theorem", "lemma": "Lemma", "example": "Example",
    "remark": "Remark", "proof": "Proof",
}

FRONT = re.compile(r"\+\+\+\n(.*?)\n\+\+\+\n", re.S)
BLOCK = re.compile(r"^::: *([\w-]+) *(.*?)\n(.*?)^:::[ \t]*$", re.M | re.S)
MATH = re.compile(r"\$\$(.+?)\$\$|\$([^\n$]+?)\$", re.S)
TERM = re.compile(r"\[\[([\w-]+)(?:\|([^\]]+))?\]\]")
LINK = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")
DEMO = re.compile(r"\{\{([\w-]+)(?: +([\w-]+))?\}\}")
SLOT = re.compile("\x00(\\d+)\x00")
REF = re.compile("\x01([\\w-]+)\x01")


class Problems:
    def __init__(self) -> None:
        self.errors = 0
        self.warnings = 0

    def error(self, where: str, msg: str) -> None:
        self.errors += 1
        log.error("%s: %s", where, msg)

    def warn(self, where: str, msg: str) -> None:
        self.warnings += 1
        log.warning("%s: %s", where, msg)


class Markdown:
    """The Markdown subset the content uses, plus [[term]] links, (lab:preset) links, $math$ and {{demo}} lines.
    In a Textbook it also numbers sections, equations (\\label{..}), figures, algorithms and statements,
    and turns \\ref{label} into links to them."""

    def __init__(self, stations: dict, presets: dict, where: str, problems: Problems, textbook: bool = False) -> None:
        self.stations, self.presets, self.where, self.problems = stations, presets, where, problems
        self.textbook = textbook
        self.labels: dict[str, tuple[str, int]] = {}
        self.counts: dict[str, int] = {}

    # ---- numbering and references (Textbook only) ----
    def number(self, kind: str, label: str | None = None) -> int:
        n = self.counts[kind] = self.counts.get(kind, 0) + 1
        if label:
            if label in self.labels:
                self.problems.error(self.where, f"the label '{label}' is used twice")
            self.labels[label] = (kind, n)
        return n

    def resolve(self, text: str) -> str:
        """Turn \\ref placeholders into links. Runs after the whole Textbook is compiled, so references may look ahead."""

        def link(m: re.Match) -> str:
            label = m.group(1)
            if label not in self.labels:
                self.problems.error(self.where, f"\\ref{{{label}}}: no such label in the Textbook")
                return "??"
            kind, n = self.labels[label]
            return f'<a class="ref" href="#" data-ref="{label}" data-kind="{kind}">{REF_TEXT[kind].format(n)}</a>'

        return REF.sub(link, text)

    def _ref(self, m: re.Match) -> str:
        if not self.textbook:
            self.problems.error(self.where, f"\\ref{{{m.group(1)}}}: references work only in the Textbook")
            return ""
        return f"\x01{m.group(1)}\x01"

    # ---- inline ----
    def inline(self, text: str) -> str:
        text, slots = self._protect_math(text)
        return self._restore(self._inline(text), slots)

    def _inline(self, text: str) -> str:
        text = html.escape(text, quote=False)
        text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
        text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
        text = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", text)
        text = re.sub(r"\\ref\{([\w-]+)\}", self._ref, text)
        text = TERM.sub(self._term, text)
        return LINK.sub(self._link, text)

    def _term(self, m: re.Match) -> str:
        sid, label = m.group(1), m.group(2)
        if sid not in self.stations:
            self.problems.error(self.where, f"[[{sid}]] is not a station on the map")
            return label or sid
        label = label or html.escape(self.stations[sid]["title"])
        return f'<a class="term" data-term="{sid}" href="#/e/{sid}">{label}</a>'

    def _link(self, m: re.Match) -> str:
        text, href = m.group(1), m.group(2)
        if href.startswith("lab:"):
            preset = href[4:]
            if preset not in self.presets:
                self.problems.error(self.where, f"lab preset '{preset}' is not in content/lab.toml")
            return f'<a class="lab-link" href="#/lab/{preset}">{text}</a>'
        if href.startswith(("http://", "https://")):
            return f'<a href="{href}" target="_blank" rel="noopener">{text}</a>'
        if href.startswith("#/"):
            return f'<a href="{href}">{text}</a>'
        self.problems.error(self.where, f"unknown link target '{href}'")
        return text

    def _protect_math(self, text: str) -> tuple[str, list[str]]:
        slots: list[str] = []

        def keep(m: re.Match) -> str:
            if m.group(1) is not None:
                tex, anchor = m.group(1).strip(), ""
                if label := re.search(r"\\label\{([\w-]+)\}", tex):
                    if not self.textbook:
                        self.problems.error(self.where, "numbered equations (\\label) work only in the Textbook")
                    n = self.number("equation", label.group(1))
                    tex = f"{tex[: label.start()]}\\tag{{{n}}}{tex[label.end() :]}"
                    anchor = f' data-anchor="{label.group(1)}"'
                slots.append(f'<div class="tex tex-display"{anchor}>{html.escape(tex)}</div>')
            else:
                slots.append(f'<span class="tex">{html.escape(m.group(2))}</span>')
            return f"\x00{len(slots) - 1}\x00"

        return MATH.sub(keep, text), slots

    @staticmethod
    def _restore(text: str, slots: list[str]) -> str:
        return SLOT.sub(lambda m: slots[int(m.group(1))], text)

    # ---- blocks ----
    def blocks(self, text: str) -> str:
        """Paragraphs, #### headings, lists, tables, display math and {{demo}} lines, separated by blank lines."""
        text, slots = self._protect_math(text)
        out = []
        for chunk in re.split(r"\n\s*\n", text.strip()):
            lines = [line.rstrip() for line in chunk.strip().splitlines()]
            if not lines:
                continue
            first = lines[0]
            if first.startswith("#### "):
                out.append(f"<h4>{self._inline(first[5:])}</h4>")
            elif all(line.startswith("- ") for line in lines):
                out.append("<ul>" + "".join(f"<li>{self._inline(line[2:])}</li>" for line in lines) + "</ul>")
            elif all(re.match(r"\d+\. ", line) for line in lines):
                items = (re.sub(r"^\d+\. ", "", line) for line in lines)
                out.append("<ol>" + "".join(f"<li>{self._inline(item)}</li>" for item in items) + "</ol>")
            elif all(line.startswith("|") for line in lines):
                out.append(self._table(lines))
            elif len(lines) == 1 and (demo := DEMO.fullmatch(first)):
                out.append(self._demo(demo))
            elif len(lines) == 1 and (slot := SLOT.fullmatch(first)) and slots[int(slot.group(1))].startswith("<div"):
                out.append(first)
            else:
                out.append(f"<p>{self._inline(' '.join(lines))}</p>")
        return self._restore("\n".join(out), slots)

    @staticmethod
    def _demo(m: re.Match) -> str:
        arg = f' data-arg="{m.group(2)}"' if m.group(2) else ""
        return f'<div class="demo" data-demo="{m.group(1)}"{arg}></div>'

    def _table(self, lines: list[str]) -> str:
        rows = [[cell.strip() for cell in line.strip("|").split("|")] for line in lines]
        if len(rows) < 2 or not all(re.fullmatch(r":?-+:?", c) for c in rows[1]):
            self.problems.error(self.where, "a table needs a header row and a | --- | row")
            return ""
        head = "".join(f"<th>{self._inline(c)}</th>" for c in rows[0])
        body = "".join("<tr>" + "".join(f"<td>{self._inline(c)}</td>" for c in row) + "</tr>" for row in rows[2:])
        return f"<table><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>"

    def pseudocode(self, text: str) -> str:
        items = []
        for raw in text.splitlines():
            if not raw.strip():
                continue
            indent = (len(raw) - len(raw.lstrip(" "))) // 2
            line = raw.strip()
            lid = ""
            if m := re.search(r"\s*\{#([\w-]+)\}$", line):
                lid, line = m.group(1), line[: m.start()]
            attr = f' data-line="{lid}"' if lid else ""
            items.append(f'<li style="--indent:{indent}"{attr}>{self.inline(line)}</li>')
        return '<ol class="pseudo">' + "".join(items) + "</ol>"

    def question(self, text: str) -> str:
        parts = re.split(r"^---[ \t]*$", text, maxsplit=1, flags=re.M)
        if len(parts) != 2:
            self.problems.error(self.where, "a question needs its answer after a --- line")
            return ""
        q, a = (self.blocks(p) for p in parts)
        return (
            '<div class="question" tabindex="0" role="button" aria-label="Show the answer">'
            f'<div class="face q"><span class="tag">Question</span>{q}</div>'
            f'<div class="face a"><span class="tag">Answer</span>{a}</div></div>'
        )

    # ---- textbook blocks: "::: theorem {#label} Title", "::: figure {#label}", "::: algorithm {#label} Title" ----
    @staticmethod
    def _label(args: str) -> tuple[str | None, str]:
        if m := re.match(r"\{#([\w-]+)\}\s*", args):
            return m.group(1), args[m.end() :].strip()
        return None, args.strip()

    def statement(self, kind: str, args: str, body: str) -> str:
        label, title = self._label(args)
        if kind == "proof":
            head, title = title or "Proof", ""
        elif kind == "remark":
            head = "Remark"
        else:
            head = f"{STATEMENTS[kind]} {self.number(kind, label)}"
        lead = f'<span class="tb-lead"><b>{head}</b>{f" ({self.inline(title)})" if title else ""}.</span> '
        inner = self.blocks(body)
        inner = inner.replace("<p>", f"<p>{lead}", 1) if inner.startswith("<p>") else f"<p>{lead}</p>{inner}"
        anchor = f' data-anchor="{label}"' if label else ""
        return f'<div class="tb-block tb-{kind}"{anchor}>{inner}</div>'

    def figure(self, args: str, body: str) -> str:
        label, _ = self._label(args)
        first, _, caption = body.strip().partition("\n")
        demo = DEMO.fullmatch(first.strip())
        if not demo:
            self.problems.error(self.where, "a figure starts with a {{demo}} line, followed by its caption")
            return ""
        n = self.number("figure", label)
        anchor = f' data-anchor="{label}"' if label else ""
        return (f'<figure class="tb-fig"{anchor}>{self._demo(demo)}'
                f'<figcaption><b>Figure {n}.</b> {self.inline(" ".join(caption.split()))}</figcaption></figure>')

    def algorithm(self, args: str, body: str) -> str:
        label, title = self._label(args)
        n = self.number("algorithm", label)
        anchor = f' data-anchor="{label}"' if label else ""
        return (f'<figure class="tb-alg"{anchor}><figcaption><b>Algorithm {n}</b> {self.inline(title)}</figcaption>'
                f"{self.pseudocode(body)}</figure>")

    def rich(self, text: str) -> str:
        """Markdown with ::: blocks: pseudocode, question, analogy, and in a Textbook figure, algorithm and statements."""
        out, pos = [], 0
        for m in BLOCK.finditer(text):
            out.append(self.blocks(text[pos : m.start()]))
            name, args, body = m.group(1), m.group(2), m.group(3)
            if name == "pseudocode":
                out.append(self.pseudocode(body))
            elif name == "question":
                out.append(self.question(body))
            elif name == "analogy":
                out.append(f'<aside class="analogy">{self.blocks(body)}</aside>')
            elif self.textbook and name in STATEMENTS:
                out.append(self.statement(name, args, body))
            elif self.textbook and name == "figure":
                out.append(self.figure(args, body))
            elif self.textbook and name == "algorithm":
                out.append(self.algorithm(args, body))
            else:
                self.problems.error(self.where, f"unknown block '::: {name}'" + ("" if self.textbook else " (outside the Textbook)"))
            pos = m.end()
        out.append(self.blocks(text[pos:]))
        return "\n".join(part for part in out if part)


def split_headings(text: str, level: str) -> list[tuple[str, str]]:
    """[(heading, body)] for every heading of the given level ('##' or '###'); text before the first is dropped."""
    parts = re.split(rf"^{level} +(.+)$", text, flags=re.M)
    return [(parts[i].strip(), parts[i + 1]) for i in range(1, len(parts), 2)]


def heading_id(title: str) -> tuple[str, str]:
    if m := re.search(r"\s*\{#([\w-]+)\}$", title):
        return title[: m.start()], m.group(1)
    return title, re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")


def compile_entry(path: Path, site: dict, problems: Problems) -> dict | None:
    where = str(path.relative_to(ROOT))
    raw = path.read_text(encoding="utf-8")
    front = FRONT.match(raw)
    if not front:
        problems.error(where, "missing the +++ front matter")
        return None
    try:
        meta = tomllib.loads(front.group(1))
    except tomllib.TOMLDecodeError as exc:
        problems.error(where, f"front matter: {exc}")
        return None

    sid = path.stem
    station = site["stations"].get(sid)
    if not station:
        problems.error(where, f"'{sid}' is not a station on the map (content/map.toml)")
        return None
    if path.parent.name != station["folder"]:
        problems.warn(where, f"belongs in content/{station['folder']}/")

    md = Markdown(site["stations"], site["presets"], where, problems)
    need = REQUIRED.get(station["kind"], REQUIRED["concept"])
    for field in need["fields"]:
        if field not in meta:
            (problems.error if station["kind"] == "result" else problems.warn)(where, f"no '{field}' yet")
    for field in meta.keys() - FRONT_MATTER:
        note = " (parents and labels live in content/map.toml)" if field in ("parent", "labels") else ""
        problems.warn(where, f"unknown front matter field '{field}'{note}")
    for ref in meta.get("prereqs", []) + meta.get("story_in", []):
        if ref not in site["stations"]:
            problems.error(where, f"'{ref}' is not a station on the map")
    if meta.get("time") not in (None, "continuous", "discrete", "both", "statistical"):
        problems.error(where, "time must be continuous, discrete, both or statistical")
    sources = meta.get("sources", [])
    if not isinstance(sources, list) or (station["kind"] == "result" and not sources):
        problems.error(where, "sources must be a list; results need at least one source")
        sources = []
    for source in sources:
        validate_source(source, where, problems)
        if station["kind"] == "result" and (not isinstance(source, dict) or not all(source.get(k) for k in ("kind", "locator", "review"))):
            problems.error(where, "result sources require kind, locator and review")
    if station.get("parent") and not meta.get("change"):
        problems.warn(where, "has a parent but no 'change' saying what changed")
    if "lab" in meta and meta["lab"] not in site["presets"]:
        problems.error(where, f"lab preset '{meta['lab']}' is not in content/lab.toml")

    body = dict((title.lower(), text) for title, text in split_headings(raw[front.end() :], "##"))

    story = None
    if "story" in meta:
        steps = []
        for m in BLOCK.finditer(body.get("story", "")):
            if m.group(1) != "step":
                problems.error(where, f"the story only takes '::: step' blocks, not '::: {m.group(1)}'")
                continue
            try:
                state = tomllib.loads(f"s = {m.group(2) or '{}'}")["s"]
            except tomllib.TOMLDecodeError as exc:
                problems.error(where, f"story step {len(steps) + 1}: {exc}")
                continue
            steps.append({"state": state, "html": md.blocks(m.group(3))})
        if not steps:
            problems.warn(where, "has a [story] but no story steps")
        story = {"config": meta["story"], "steps": steps}

    textbook = None
    if "textbook" in body:
        tb = Markdown(site["stations"], site["presets"], where, problems, textbook=True)
        sections = []
        for title, text in split_headings(body["textbook"], "###"):
            title, sid = heading_id(title)
            sections.append({"id": sid, "n": tb.number("section", sid), "title": tb.inline(title), "html": tb.rich(text)})
        for section in sections:
            section["title"], section["html"] = tb.resolve(section["title"]), tb.resolve(section["html"])
        words = len(re.findall(r"[A-Za-z]+", MATH.sub(" ", body["textbook"])))
        textbook = {"minutes": max(1, round(words / 160)), "sections": sections}
    elif station["kind"] in ("algorithm", "result"):
        (problems.error if station["kind"] == "result" else problems.warn)(where, "no '## Textbook' yet")

    card, pseudocode = [], ""
    for title, text in split_headings(body.get("card", ""), "###"):
        title, cid = heading_id(title)
        html_ = md.rich(text)
        card.append({"id": cid, "title": md.inline(title), "html": html_})
        if cid == "pseudocode":
            pseudocode = html_
    for cid in need["card"]:
        if cid not in {section["id"] for section in card}:
            (problems.error if station["kind"] == "result" else problems.warn)(where, f"the card has no '{cid}' section")

    return {
        "summary": meta.get("summary", ""),
        "time": meta.get("time"),
        "change": meta.get("change", ""),
        "prereqs": meta.get("prereqs", []),
        # an entry without a story of its own can point to the stories that show its idea at work
        "storyIn": meta.get("story_in", []),
        "lab": meta.get("lab"),
        "sources": meta.get("sources", []),
        "story": story,
        "textbook": textbook,
        "card": card,
        "pseudocode": pseudocode,
    }


def compile_preset(pid: str, raw: dict, stations: dict, recordings: dict, problems: Problems) -> dict:
    """A Lab preset in one shape: its racers (each an algorithm, a name and knobs of its own, or a recorded run) and the
    shared knobs."""
    where = f"content/lab.toml [{pid}]"
    for key in ("title", "env"):
        if key not in raw:
            problems.error(where, f"no '{key}'")
    racers = []
    for r in raw.get("racers") or [{"algorithm": a} for a in raw.get("algorithms", [])]:
        if "recording" in r:  # a run recorded offline by recorder/record.py: its algorithm is the recording's station
            rec = recordings.get(r["recording"])
            if not rec:
                problems.error(where, f"races recording '{r['recording']}', which is not in content/recordings/")
            elif rec["world"] != raw.get("env"):
                problems.error(where, f"recording '{r['recording']}' is on '{rec['world']}', not on '{raw.get('env')}'")
            else:
                racers.append({"recording": r["recording"], "algorithm": rec["station"], "name": r.get("name") or rec["title"], "params": {}})
            continue
        algo = r.get("algorithm", "")
        if stations.get(algo, {}).get("kind") != "algorithm" and algo not in RUNNABLE_CONCEPTS:
            problems.error(where, f"runs '{algo}', which is not an algorithm station")
            continue
        own = {k: v for k, v in r.items() if k not in ("algorithm", "name")}
        racers.append({"algorithm": algo, "name": r.get("name") or stations[RUNNABLE_CONCEPTS.get(algo, algo)]["title"], "params": own})
    if not racers:
        problems.error(where, "runs no algorithm")
    charts, measures = raw.get("charts", ["return"]), raw.get("measures", [])
    recorded = any("recording" in r for r in racers)
    if recorded and not all("recording" in r for r in racers):
        problems.error(where, "races recorded and live runs together")
    for chart in charts:
        if recorded:
            if chart not in RECORDED_CHARTS:
                problems.error(where, f"cannot chart '{chart}' from recordings (one of: {', '.join(sorted(RECORDED_CHARTS))})")
        elif chart not in CHARTS:
            problems.error(where, f"cannot chart '{chart}' (one of: {', '.join(sorted(CHARTS))})")
        elif chart in MEASURES and chart not in measures:
            problems.error(where, f"charts '{chart}' but does not measure it (add it to measures)")
    for m in measures:
        if m not in MEASURES:
            problems.error(where, f"unknown measure '{m}'")
    success = raw.get("success")
    if success is not None:  # what counts as a run that ended well, for the odds the Lab counts over many seeds
        units = raw.get("units", 500)
        metric, window = success.get("metric"), success.get("window")
        if set(success) - {"metric", "min", "max", "window", "text"}:
            problems.error(where, f"success has unknown keys: {', '.join(sorted(set(success) - {'metric', 'min', 'max', 'window', 'text'}))}")
        if recorded:  # only the curves every seed of a recording kept can be judged over seeds
            kept = {"return": "train", "test": "test", "q": "q", "jitter": "jitter", "jitter-train": "jitterTrain"}
            if metric not in kept:
                problems.error(where, f"success judges '{metric}', which recordings do not keep for every seed (one of: {', '.join(kept)})")
            elif not all(kept[metric] in c for r in racers if r.get("recording") in recordings for c in recordings[r["recording"]]["curves"]):
                problems.error(where, f"success judges '{metric}', but not every seed of its recordings kept it (record them again)")
        elif metric not in CHARTS:
            problems.error(where, f"success judges '{metric}', which no run records (one of: {', '.join(sorted(CHARTS))})")
        elif metric in MEASURES and metric not in measures:
            problems.error(where, f"success judges '{metric}' but the preset does not measure it (add it to measures)")
        if ("min" in success) == ("max" in success):
            problems.error(where, "success needs exactly one of min and max")
        if not success.get("text"):
            problems.error(where, "success needs a text: what the runs that end well do, as in \"how many <text>\"")
        if window is not None and not (isinstance(window, list) and len(window) == 2 and 1 <= window[0] <= window[1] <= units):
            problems.error(where, f"success window must be [first, last] units within 1 to {units}")
    sweep = raw.get("sweep")
    if sweep is not None and not (isinstance(sweep, dict) and all(isinstance(v, list) and len(v) > 1 and all(isinstance(x, (int, float)) for x in v) for v in sweep.values())):
        problems.error(where, "sweep must map knobs to lists of at least two numbers, as in sweep = { q0 = [-100.0, 0.0] }")
    fixed = raw.get("fixed", [])
    if not (isinstance(fixed, list) and all(isinstance(k, str) for k in fixed)):
        problems.error(where, 'fixed must list knobs, as in fixed = ["gamma"]: those that change nothing in this lab, kept off its bar')
    elif not any(r.get("recording") for r in raw.get("racers", [])) and (stray := [k for k in fixed if k not in raw]):
        problems.error(where, f"fixed names knobs the lab does not set: {', '.join(stray)}")
    if not isinstance(raw.get("seeds", False), bool):
        problems.error(where, "seeds must be true or false (true, for recorded runs: the charts open on the thin lines of every seed)")
    return {
        "title": raw.get("title", pid), "env": raw.get("env", ""), "racers": racers,
        "units": raw.get("units", 500), "seed": 1, "runs": raw.get("runs", 1),
        "charts": charts, "measures": measures, "film": raw.get("film", []), "intro": raw.get("intro", ""),
        "params": {k: v for k, v in raw.items() if k not in PRESET_KEYS},
        **({"success": success} if success is not None else {}),
        **({"sweep": sweep} if sweep is not None else {}),
        **({"seeds": True} if raw.get("seeds") is True else {}),
        **({"fixed": fixed} if fixed else {}),
        **({"home": raw["home"]} if raw.get("home") else {}),
    }


SOURCE_KINDS = {"textbook", "paper", "course note", "personal note", "bridge explanation"}
REVIEWS = {"located", "proof-checked", "pending"}
LINK_ROLES = {"required", "sufficient", "illustrative", "motivation", "optional"}


def validate_source(source: dict, where: str, problems: Problems) -> None:
    if not isinstance(source, dict):
        problems.error(where, "source must be a table")
        return
    if not isinstance(source.get("text"), str) or not source["text"].strip():
        problems.error(where, "source needs nonempty text")
    for key, allowed in (("kind", SOURCE_KINDS), ("review", REVIEWS)):
        if key in source and source[key] not in allowed:
            problems.error(where, f"source {key}: unknown value '{source[key]}'")
    if "locator" in source and (not isinstance(source["locator"], str) or not source["locator"].strip()):
        problems.error(where, "source locator must be a nonempty edition-specific string")


def compile_routes(raw: dict, stations: dict, entries: dict, problems: Problems) -> dict:
    """Arrows point from a prerequisite to its consumer; parent is deliberately independent."""
    links = list(raw.get("link", []))
    links += [{"from": ref, "to": sid, "role": "required", "at": "Prerequisites"}
              for sid, entry in entries.items() for ref in entry["prereqs"]]
    unique, seen = [], set()
    for link in links:
        if not isinstance(link, dict):
            problems.error("content/routes.toml", "link must be a table")
            continue
        if any(link.get(k) not in stations for k in ("from", "to")):
            problems.error("content/routes.toml", f"unknown station in {link}")
            continue
        if link.get("role") not in LINK_ROLES or not isinstance(link.get("at"), str) or not link["at"].strip():
            problems.error("content/routes.toml", f"link needs a known role and nonempty at: {link}")
            continue
        key = tuple(link[k] for k in ("from", "to", "role", "at"))
        if key not in seen:
            unique.append(link)
            seen.add(key)
    incoming = {sid: [] for sid in stations}
    for link in unique:
        if link["role"] == "required":
            incoming[link["to"]].append(link["from"])
    state = {}
    def visit(sid):
        if state.get(sid) == 1:
            problems.error("content/routes.toml", f"cycle of required links through '{sid}'")
            return
        if state.get(sid) == 2:
            return
        state[sid] = 1
        for ref in incoming[sid]:
            visit(ref)
        state[sid] = 2
    for sid in stations:
        visit(sid)
    routes, ids = [], set()
    for route in raw.get("route", []):
        if not isinstance(route, dict):
            problems.error("content/routes.toml", "route must be a table")
            continue
        if not route.get("id") or route["id"] in ids or route.get("destination") not in stations or not route.get("title"):
            problems.error("content/routes.toml", f"invalid or duplicate route: {route}")
        ids.add(route.get("id"))
        routes.append(route)
    return {"links": unique, "named": routes}


def compile_content(problems: Problems) -> dict:
    atlas = tomllib.loads((CONTENT / "map.toml").read_text(encoding="utf-8"))
    presets = tomllib.loads((CONTENT / "lab.toml").read_text(encoding="utf-8"))
    notation = tomllib.loads((CONTENT / "notation.toml").read_text(encoding="utf-8"))

    stations, parts = {}, []
    for part in atlas["part"]:
        if part["line"] not in atlas["lines"]:
            problems.error("content/map.toml", f"part {part['n']} uses an unknown line '{part['line']}'")
        for st in part["stations"]:
            if st["id"] in stations:
                problems.error("content/map.toml", f"station '{st['id']}' appears twice")
            st.setdefault("kind", "concept")
            if st["kind"] not in REQUIRED:
                problems.error("content/map.toml", f"unknown station kind '{st['kind']}'")
            stations[st["id"]] = {**st, "part": part["n"], "folder": part["folder"]}
        parts.append({key: part[key] for key in ("n", "title", "line", "stations")})
    for label in atlas["labels"].values():
        if label["station"] not in stations:
            problems.error("content/map.toml", f"label '{label['text']}' points to unknown station '{label['station']}'")
    for sid, st in stations.items():
        if st.get("parent") and stations.get(st["parent"], {}).get("kind") != "algorithm":
            problems.error("content/map.toml", f"'{sid}' has parent '{st['parent']}', which is not an algorithm station")
        for label in st.get("labels", []):
            if label not in atlas["labels"]:
                problems.error("content/map.toml", f"'{sid}' has label '{label}', which is not in [labels]")
        if st["kind"] == "algorithm" and not st.get("labels"):
            problems.warn("content/map.toml", f"algorithm '{sid}' has no labels")
    for sid in atlas.get("unified", {}):
        if stations.get(sid, {}).get("kind") != "algorithm":
            problems.error("content/map.toml", f"[unified] places '{sid}', which is not an algorithm station")
    for sid, st in stations.items():
        if st["kind"] == "algorithm" and sid not in atlas.get("unified", {}):
            problems.warn("content/map.toml", f"algorithm '{sid}' has no place in [unified]")
    for sid in MACRO_TERMS:
        if sid not in stations:
            problems.error("app/js/math.js", f"a math macro links to unknown station '{sid}'")
    recordings = {path.stem: json.loads(path.read_text(encoding="utf-8")) for path in sorted(RECORDINGS.glob("*.json"))}
    for name, rec in recordings.items():
        missing = [k for k in ("world", "station", "learner", "snapshots", "curves", "grid", "block") if k not in rec]
        if missing:
            problems.error(f"content/recordings/{name}.json", f"lacks {', '.join(missing)}")
        elif rec["station"] not in stations:
            problems.error(f"content/recordings/{name}.json", f"follows unknown station '{rec['station']}'")
    presets = {pid: compile_preset(pid, raw, stations, recordings, problems) for pid, raw in presets.items()}
    for sym in notation.get("symbol", []):
        if sym.get("station") and sym["station"] not in stations:
            problems.error("content/notation.toml", f"symbol {sym['tex']} points to unknown station '{sym['station']}'")

    site = {"stations": stations, "presets": presets, "labels": atlas["labels"]}
    entries = {}
    for path in sorted(CONTENT.glob("*/*.md")):
        entry = compile_entry(path, site, problems)
        if entry:
            entries[path.stem] = entry
    for eid, entry in entries.items():
        for ref in entry["storyIn"]:
            if not entries.get(ref, {}).get("story"):
                problems.error(f"content/{eid}.md", f"story_in names '{ref}', which has no story")
        # a story's runs: the recordings they play must exist, and every step must name runs the story has
        if not entry["story"]:
            continue
        runs = entry["story"]["config"].get("runs", {})
        for name, run in runs.items():
            if isinstance(run, dict) and run.get("recording") and run["recording"] not in recordings:
                problems.error(f"content/{eid}.md", f"story run '{name}' plays recording '{run['recording']}', which is not in content/recordings/")
        for k, step in enumerate(entry["story"]["steps"], 1):
            st = step["state"]
            for name in [st.get("run")] + list(st.get("curves", [])):
                if name and name not in runs:
                    problems.error(f"content/{eid}.md", f"story step {k} names run '{name}', which [story.runs] lacks")
            if st.get("curves") and all(isinstance(runs.get(n), dict) and runs[n].get("recording") for n in st["curves"]) and st.get("metric", "optimal") not in RECORDED_CHARTS:
                problems.error(f"content/{eid}.md", f"story step {k} charts '{st.get('metric', 'optimal')}' from recordings (one of: {', '.join(sorted(RECORDED_CHARTS))})")
    for pid, preset in presets.items():
        for algo in sorted({r["algorithm"] for r in preset["racers"]}):
            if not entries.get(RUNNABLE_CONCEPTS.get(algo, algo), {}).get("pseudocode"):
                problems.warn("content/lab.toml", f"preset '{pid}' runs '{algo}', which has no written pseudocode yet")

    routes_path = CONTENT / "routes.toml"
    routes = compile_routes(tomllib.loads(routes_path.read_text(encoding="utf-8")) if routes_path.exists() else {}, stations, entries, problems)
    return {
        "routes": routes,
        "rows": atlas["rows"],
        "rowTitles": atlas["row_titles"],
        "lines": atlas["lines"],
        "labels": atlas["labels"],
        "parts": parts,
        "unified": atlas.get("unified", {}),
        "entries": entries,
        "presets": presets,
        "notation": notation,
    }, recordings


# ---- course packs (build.py --course DIR): a course's links to the stations, kept out of the repository ----
# What a link says it does with the stations it names.
ROLES = ("introduces", "derives", "implements", "compares", "assesses")
# A course item, as a link's `at` names it: L8 (a lecture), L8:31 or L8:31-34 (slides), Quiz2:11 or Rec:2c (a question),
# PS2-control (a notebook), PS2-control:A2 (an activity), :Q2 (its question), :P1 (a "Predict first"), :#a0383157 (a
# cell) or :sarsa_update (a function), and SB:6.4 (a section of the book).
COURSE_REF = re.compile(r"(?P<lec>L\d+)(?::(?P<a>\d+)(?:-(?P<b>\d+))?)?$|(?P<head>[\w-]+)(?::(?P<tail>#?[\w.]+))?$")


class LenientMarkdown(Markdown):
    """Notebook text as the course wrote it: its links stay text, its headings become the page's small ones."""

    def _link(self, m: re.Match) -> str:
        href = m.group(2)
        return f'<a href="{html.escape(href)}" target="_blank" rel="noopener">{m.group(1)}</a>' if href.startswith(("http://", "https://")) else m.group(1)

    def _term(self, m: re.Match) -> str:
        return m.group(0)

    def notebook(self, text: str) -> str:
        """Fenced code stays as written; quotes lose their marks; every heading is a #### heading."""
        out = []
        for k, part in enumerate(re.split(r"^```[^\n]*\n(.*?)^```[ \t]*$", text, flags=re.M | re.S)):
            if k % 2:
                out.append(f"<pre><code>{html.escape(part.rstrip())}</code></pre>")
            else:
                part = re.sub(r"^>\s?", "", part, flags=re.M)
                part = re.sub(r"^#{1,6}\s+", "#### ", part, flags=re.M)
                part = re.sub(r"^\s*[*-]\s+(?=\S)", "- ", part, flags=re.M)
                out.append(self.blocks(part))
        return "\n".join(o for o in out if o)


def data_uri(path: Path) -> str:
    kind = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg"}[path.suffix.lower()]
    return f"data:{kind};base64,{base64.b64encode(path.read_bytes()).decode()}"


def read_tomls(pack: Path, name: str, problems: Problems) -> list[tuple[str, dict]]:
    """name.toml and every name/*.toml of the pack, each with where it came from."""
    out = []
    for path in [pack / f"{name}.toml", *sorted((pack / name).glob("*.toml"))]:
        if path.exists():
            where = f"{pack.name}/{path.relative_to(pack).as_posix()}"
            try:
                out.append((where, tomllib.loads(path.read_text(encoding="utf-8"))))
            except tomllib.TOMLDecodeError as exc:
                problems.error(where, str(exc))
    return out


def compile_course(pack: Path, data: dict, recordings: dict, problems: Problems) -> dict | None:
    """Check a course pack and compile it into RL.course: its documents, the items its links name, the links (each
    naming stations, a role and what the reader finds), course notes, worked solutions, presets, worlds and maps."""
    from urllib.parse import quote

    where = f"{pack.name}/course.toml"
    if not (pack / "course.toml").exists():
        problems.error(where, "no course.toml: is this a course pack?")
        return None
    spec = tomllib.loads((pack / "course.toml").read_text(encoding="utf-8"))
    from course_sources import verified_documents
    try:
        source_docs = verified_documents(pack, spec)
    except (ValueError, OSError) as exc:
        problems.error(where, str(exc))
        return None
    imported = pack / "import"
    if not imported.exists():
        problems.error(f"{pack.name}/import", "missing: run python tools/course-import.py first")
        return None
    load = lambda name: json.loads((imported / f"{name}.json").read_text(encoding="utf-8")) if (imported / f"{name}.json").exists() else []
    slides, questions, book, notebooks = load("slides"), load("questions"), load("book"), load("notebooks")
    for nb in notebooks:  # the notebooks write some activity titles in lower case
        for a in nb["activities"]:
            a["title"] = a["title"][:1].upper() + a["title"][1:]
    if not slides and "slides" in spec:
        problems.warn(f"{pack.name}/import", "no slides were read (Poppler's pdftotext was missing when the importer ran)")
    pictures = imported / "pictures"
    picture = lambda name: data_uri(pictures / name) if (pictures / name).exists() else None
    href = lambda path: quote(path.replace("\\", "/"))
    stations = {sid: st for part in data["parts"] for st in part["stations"] for sid in [st["id"]]}
    site = {"stations": stations, "presets": data["presets"]}

    # the pack's own Lab presets and worlds: course data, added to the page's presets only in the course build
    presets = {}
    for src, raw in read_tomls(pack, "lab", problems):
        for pid, p in raw.items():
            if pid in data["presets"] or pid in presets:
                problems.error(src, f"preset '{pid}' is already a preset")
            presets[pid] = compile_preset(pid, p, stations, recordings, problems)
    site["presets"] = {**data["presets"], **presets}
    worlds = {}
    for src, raw in read_tomls(pack, "worlds", problems):
        worlds.update(raw)

    # the items, by the name a link gives them
    items: dict[str, dict] = {}
    lectures = []
    for lec in spec.get("slides", {}).get("lectures", []):
        own = [s for s in slides if s["lecture"] == lec["n"]]
        items[f"L{lec['n']}"] = {"kind": "lecture", "n": lec["n"], "title": lec["title"]}
        for s in own:
            items[f"L{lec['n']}:{s['n']}"] = {"kind": "slide", "lecture": lec["n"], "n": s["n"], "page": s["page"], "title": s["title"]}
        lectures.append({"n": lec["n"], "title": lec["title"], "pages": lec["pages"],
                         "slides": [{"n": s["n"], "page": s["page"], "title": s["title"]} for s in own]})
    papers = []
    for paper in spec.get("paper", []):
        own = [q for q in questions if q["paper"] == paper["id"]]
        papers.append({"id": paper["id"], "title": paper["title"], "file": href(paper["path"]), "questions": [q["id"] for q in own]})
        for q in own:
            items[f"{paper['id']}:{q['id']}"] = {"kind": "question", "paper": paper["id"], "id": q["id"], "n": q["n"], "part": q["part"],
                                                "page": q["page"], "text": q["text"], "options": q["options"]}
    nbs = {}
    for nb in notebooks:
        nbs[nb["id"]] = nb
        items[nb["id"]] = {"kind": "notebook", "id": nb["id"], "ps": nb["ps"], "title": nb["title"]}
        for a in nb["activities"]:
            items[f"{nb['id']}:{a['id']}"] = {"kind": "activity", "notebook": nb["id"], "id": a["id"], "n": a["n"], "title": a["title"]}
        for q in nb["questions"] + nb["predicts"]:
            items[f"{nb['id']}:{q['id']}"] = {"kind": "nb-question" if q["id"][0] == "Q" else "predict", "notebook": nb["id"], "id": q["id"], "activity": q["activity"]}
        for name, f in nb["functions"].items():
            items[f"{nb['id']}:{name}"] = {"kind": "function", "notebook": nb["id"], "name": name, "activity": f["activity"]}
        for c in nb["cells"]:
            items[f"{nb['id']}:#{c['id']}"] = {"kind": "cell", "notebook": nb["id"], "id": c["id"], "activity": c["activity"]}
    bk = spec.get("book")
    sections = {s["id"]: s for s in book}
    if bk:
        for s in book:
            items[f"{bk['id']}:{s['id']}"] = {"kind": "section", "id": s["id"], "title": s["title"], "printed": s["printed"], "page": s["pdf"]}

    documents = []
    imported_docs = {d["id"]: d for d in load("documents")}
    for doc in source_docs:
        imported_doc = imported_docs.get(doc["id"], {})
        if imported_doc.get("spec") != doc:
            problems.error(where, f"{doc['id']}: stale or missing document import; re-run tools/course-import.py")
            continue
        source = {"text": doc["title"], "kind": doc["kind"], "review": doc["review"], "locator": doc["edition"]}
        anchors = imported_doc["anchors"]
        documents.append({**doc, "file": href(doc["path"]), "anchors": [a["id"] for a in anchors], "pages": imported_doc["pages"]})
        items[doc["id"]] = {"kind": "document", "document": doc["id"], "title": doc["title"], "page": 1, "source": source}
        for anchor in anchors:
            locator = f"{doc['edition']}, {anchor['title']}, PDF p. {anchor['page']}"
            if anchor.get("printed") is not None:
                locator += f", printed p. {anchor['printed']}"
            items[f"{doc['id']}:{anchor['id']}"] = {**anchor, "kind": "source-anchor", "document": doc["id"],
                "source": {**source, "review": anchor["review"], "locator": locator}}

    def known(ref: str, src: str) -> bool:
        m = COURSE_REF.match(ref)
        if m and m.group("lec") and m.group("b"):  # printed slide numbers may skip; both endpoints must exist
            ok = all(f"{m.group('lec')}:{n}" in items for n in (m.group("a"), m.group("b"))) and int(m.group("a")) <= int(m.group("b"))
            if not ok:
                problems.error(src, f"'{ref}' is not a range of slides of {m.group('lec')}")
            return ok
        if ref not in items:
            problems.error(src, f"'{ref}' names no course item (a slide, question, notebook item or book section)")
            return False
        return True

    # the links, each naming stations, a role and what the reader finds there
    links = []
    for src, raw in read_tomls(pack, "links", problems):
        for k, link in enumerate(raw.get("link", []), 1):
            here = f"{src} link {k} ({link.get('at', '?')})"
            if set(link) - {"at", "stations", "role", "note", "pair", "relation"}:
                problems.error(here, f"unknown keys: {', '.join(sorted(set(link) - {'at', 'stations', 'role', 'note', 'pair', 'relation'}))}")
            at, sts = link.get("at", ""), link.get("stations", [])
            if not known(at, here):
                continue
            if not sts:
                problems.error(here, "names no station")
            for sid in sts:
                if sid not in stations:
                    problems.error(here, f"'{sid}' is not a station on the map (content/map.toml)")
            if link.get("role") not in ROLES:
                problems.error(here, f"role '{link.get('role')}' is not one of {', '.join(ROLES)}")
            if not link.get("note"):
                problems.error(here, "needs a note: one sentence on what the reader finds there")
            relation = link.get("relation", "illustrative")
            if relation not in LINK_ROLES:
                problems.error(here, f"unknown route relation '{relation}'")
            source = items.get(at, {}).get("source")
            if source:
                validate_source(source, here, problems)
                if source["review"] == "pending" and relation in ("required", "sufficient"):
                    problems.error(here, "a pending source cannot supply a required or sufficient route")
            pair = link.get("pair")
            if pair is not None:  # pseudocode line → the line of the function that does it
                item = items.get(at, {})
                if item.get("kind") != "function" or len(sts) != 1:
                    problems.error(here, "pair needs a function and one station")
                else:
                    code = nbs[item["notebook"]]["functions"][item["name"]]["source"]
                    lines_ = set(re.findall(r'data-line="([\w-]+)"', data["entries"].get(sts[0], {}).get("pseudocode", "")))
                    for lid, text in pair.items():
                        if lid not in lines_:
                            problems.error(here, f"pair: the pseudocode of '{sts[0]}' has no line '{lid}'")
                        if text not in code:
                            problems.error(here, f"pair: '{text}' is not in {item['name']}")
            md = Markdown(stations, site["presets"], here, problems)
            links.append({"at": at, "stations": sts, "role": link.get("role"), "note": md.inline(link.get("note", "")),
                          "relation": relation, **({"source": source} if source else {}), **({"pair": pair} if pair else {})})

    # the book's sections, worked out from the § numbers in every entry's sources
    if bk:
        for sid, e in data["entries"].items():
            for s in e["sources"]:
                if "Sutton & Barto" not in s.get("text", ""):
                    continue
                for num in re.findall(r"§\s*(\d+\.\d+)", s["text"]):
                    if num in sections:
                        sec = sections[num]
                        links.append({"at": f"{bk['id']}:{num}", "stations": [sid], "role": "introduces", "book": True,
                                      "note": html.escape(f"§{num} {sec['title']}, p. {sec['printed']}.")})
                    else:
                        problems.warn(f"content/{sid}.md", f"cites Sutton & Barto §{num}, which the book's contents lack")

    # the Lab presets that run an activity's experiment
    experiments = []
    for src, raw in read_tomls(pack, "experiments", problems):
        for k, ex in enumerate(raw.get("experiment", []), 1):
            here = f"{src} experiment {k} ({ex.get('at', '?')})"
            if known(ex.get("at", ""), here) and items[ex["at"]]["kind"] != "activity":
                problems.error(here, "an experiment belongs to an activity")
            if ex.get("lab") not in site["presets"]:
                problems.error(here, f"lab preset '{ex.get('lab')}' is neither in content/lab.toml nor in the pack's lab.toml")
            experiments.append({"at": ex.get("at"), "lab": ex.get("lab"), "note": Markdown(stations, site["presets"], here, problems).inline(ex.get("note", ""))})

    linked = {l["at"] for l in links}
    # course notes, beside the entries they are about
    notes = []
    for src, raw in read_tomls(pack, "notes", problems):
        for k, note in enumerate(raw.get("note", []), 1):
            here = f"{src} note {k}"
            for sid in note.get("stations", []):
                if sid not in stations:
                    problems.error(here, f"'{sid}' is not a station on the map")
            for ref in note.get("at", []):
                known(ref, here)
            md = Markdown(stations, site["presets"], here, problems)
            notes.append({"stations": note.get("stations", []), "at": note.get("at", []), "title": md.inline(note.get("title", "")),
                          "html": md.rich(note.get("text", ""))})
    # worked solutions, hidden until asked for
    solutions = {}
    for src, raw in read_tomls(pack, "solutions", problems):
        for k, sol in enumerate(raw.get("solution", []), 1):
            at = sol.get("at", "")
            here = f"{src} solution {k} ({at})"
            if not known(at, here):
                continue
            if at in solutions:
                problems.error(here, "a second solution for the same item")
            md = Markdown(stations, site["presets"], here, problems)
            solutions[at] = {"answer": sol.get("answer", ""), "html": md.rich(sol.get("text", ""))}
    # links between pages: [text](#/c/<item>) must name an item
    for text in [l["note"] for l in links] + [n["html"] for n in notes] + [s["html"] for s in solutions.values()]:
        for ref in re.findall(r'href="#/c/([^"]+)"', text):
            known(ref, "a link to a course page")

    # what the pages show of each item: pictures of the linked slides and questions, the notebooks' text and code
    for ref, item in items.items():
        if item["kind"] == "slide":
            item["pic"] = picture(f"slide-{item['page']}.jpg")
        elif item["kind"] == "question":
            item["pic"] = picture(f"{item['paper']}-{item['id']}.jpg")
            if more := picture(f"{item['paper']}-{item['id']}-more.jpg"):
                item["more"] = more
    for item in items.values():
        if item["kind"] == "slide" and not item["pic"]:
            del item["pic"]
    lenient = LenientMarkdown(stations, site["presets"], f"{pack.name}/notebooks", Problems())
    used_nbs = {items[l["at"]].get("notebook") or (l["at"] if items.get(l["at"], {}).get("kind") == "notebook" else None) for l in links if l["at"] in items}
    out_nbs = []
    for nb in notebooks:
        cells = {}
        for c in nb["cells"]:
            if c["type"] == "markdown":
                cells[c["id"]] = {"md": lenient.notebook(c["source"])}
            else:
                outs = []
                for o in c.get("outputs", []):
                    if "picture" in o:
                        if nb["id"] in used_nbs and (uri := picture(o["picture"])):
                            outs.append({"pic": uri})
                    else:
                        outs.append({"text": o["text"], **({"error": True} if o.get("error") else {})})
                cells[c["id"]] = {"code": c["source"], "out": outs}
        out_nbs.append({
            "id": nb["id"], "ps": nb["ps"], "title": nb["title"], "file": href(nb["path"]),
            "order": [c["id"] for c in nb["cells"]], "act": {c["id"]: c["activity"] for c in nb["cells"] if c["activity"]}, "cells": cells,
            "activities": [{k: a[k] for k in ("id", "n", "title", "points", "cell", "cells")} | {"tasks": [t["id"] for t in a["tasks"]]} for a in nb["activities"]],
            "functions": {n: {k: f[k] for k in ("cell", "activity", "source", "doc")} for n, f in nb["functions"].items()},
            "questions": [{k: q.get(k) for k in ("id", "n", "cell", "activity", "answerCell")} for q in nb["questions"]],
            # a prediction written in its prompt's own cell: the prompt and the prediction apart, so a card can hide one
            "predicts": [{k: q.get(k) for k in ("id", "cell", "activity", "answerCell")}
                         | ({"prompt": lenient.notebook(f"**Predict first.** {q['text']}"), "said": lenient.notebook(q["answer"])} if q.get("answer") and not q.get("answerCell") else {})
                         for q in nb["predicts"]],
        })

    # the course's notation beside the atlas's, and its maps
    notation = []
    atlas_tex = {s["tex"] for s in data["notation"].get("symbol", [])}
    for src, raw in read_tomls(pack, "notation", problems):
        for sym in raw.get("symbol", []):
            if sym.get("atlas") not in atlas_tex:
                problems.error(src, f"symbol {sym.get('atlas')!r} is not in content/notation.toml")
            notation.append({"atlas": sym.get("atlas"), "course": sym.get("course", ""), "note": sym.get("note", "")})
    maps = {"compare": [], "derive": []}
    for src, raw in read_tomls(pack, "maps", problems):
        for m in raw.get("compare", []):
            for sid in m.get("stations", []):
                if sid not in stations:
                    problems.error(src, f"comparison map '{m.get('id')}': '{sid}' is not a station")
            maps["compare"].append(m)
        for m in raw.get("derive", []):
            for step in m.get("steps", []):
                for ref in step.get("at", []):
                    known(ref, f"{src} derivation map '{m.get('id')}'")
                sid, label = step.get("station"), step.get("label")
                if sid not in stations:
                    problems.error(src, f"derivation map '{m.get('id')}': '{sid}' is not a station")
                elif label and label not in re.findall(r'data-anchor="([\w-]+)"', "".join(sec["html"] for sec in (data["entries"].get(sid, {}).get("textbook") or {}).get("sections", []))):
                    problems.error(src, f"derivation map '{m.get('id')}': the Textbook of '{sid}' has no label '{label}'")
            maps["derive"].append(m)

    return {
        "id": spec["id"], "code": spec.get("code", spec["id"]), "title": spec.get("title", ""), "school": spec.get("school", ""),
        "term": spec.get("term", ""),
        "files": {"slides": href(spec["slides"]["path"]) if "slides" in spec else None, "book": href(bk["path"]) if bk else None},
        "book": {"id": bk["id"], "title": bk["title"], "offset": bk.get("offset", 0)} if bk else None,
        "lectures": lectures, "papers": papers, "notebooks": out_nbs, "documents": documents,
        "items": {ref: item for ref, item in items.items() if item["kind"] not in ("cell", "section") or ref in linked},
        "links": links, "experiments": experiments, "notes": notes, "solutions": solutions, "presets": presets, "worlds": worlds,
        "notation": notation, "maps": maps,
    }


def bundle(out: Path = OUT, course: dict | None = None) -> int:
    """Inline every stylesheet, script and font of app/index.html into one offline file. A course build adds its pack
    (RL.course) right after the content, so that every script after it can read it."""
    page = (APP / "index.html").read_text(encoding="utf-8")

    def font(css_dir: Path):
        def data_uri(m: re.Match) -> str:
            data = base64.b64encode((css_dir / m.group(1)).read_bytes()).decode()
            return f"url(data:font/woff2;base64,{data})"

        return data_uri

    def style(m: re.Match) -> str:
        path = (APP / m.group(1)).resolve()
        css = re.sub(r"url\((fonts/[^)]+\.woff2)\)", font(path.parent), path.read_text(encoding="utf-8"))
        return "<style>\n" + css.replace("</style", "<\\/style") + "\n</style>"

    def script(m: re.Match) -> str:
        code = (APP / m.group(1)).resolve().read_text(encoding="utf-8")
        return "<script>\n" + code.replace("</script", "<\\/script") + "\n</script>"

    page = re.sub(r'<link rel="stylesheet" href="([^"]+)">', style, page)
    if course is not None:
        pack = json.dumps(course, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
        page = page.replace('<script src="content.js"></script>', f'<script src="content.js"></script>\n<script>\nglobalThis.RL.course = {pack};\n</script>', 1)
    page = re.sub(r'<script src="([^"]+)"></script>', script, page)
    out.write_text(page, encoding="utf-8")
    return out.stat().st_size


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(levelname)-7s %(message)s")
    args = sys.argv[1:]
    pack = None
    if args[:1] == ["--course"] and len(args) == 2:
        pack = Path(args[1]).resolve()
    elif args:
        log.error("usage: python build.py [--course DIR]")
        return 2
    problems = Problems()
    data, recordings = compile_content(problems)
    course = compile_course(pack, data, recordings, problems) if pack else None
    if problems.errors:
        log.error("%d error(s); nothing was written", problems.errors)
        return 1

    script = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    (APP / "content.js").write_text(
        "// Generated by build.py from content/. Do not edit.\n"
        f"(globalThis.RL = globalThis.RL || {{}}).content = {script};\n",
        encoding="utf-8",
    )
    # each recording's sweeps (recorder/record.py --sweep): its knobs over several values, training curves only
    sweeps = {path.stem: json.loads(path.read_text(encoding="utf-8")) for path in sorted((RECORDINGS / "sweeps").glob("*.json"))}
    (APP / "recordings.js").write_text(
        "// Generated by build.py from content/recordings/, which recorder/record.py writes. Do not edit.\n"
        f"(globalThis.RL = globalThis.RL || {{}}).recordings = {json.dumps(recordings, separators=(',', ':'))};\n"
        f"globalThis.RL.sweeps = {json.dumps(sweeps, separators=(',', ':'))};\n",
        encoding="utf-8",
    )
    # the averages the story charts show, worked out offline (tools/story-curves.js); a chart missing there is averaged live
    curves_file = CONTENT / "story-curves.json"
    curves = json.loads(curves_file.read_text(encoding="utf-8")) if curves_file.exists() else {}
    (APP / "story-curves.js").write_text(
        "// Generated by build.py from content/story-curves.json, which tools/story-curves.js writes. Do not edit.\n"
        f"(globalThis.RL = globalThis.RL || {{}}).storyCurves = {json.dumps(curves, separators=(',', ':'))};\n",
        encoding="utf-8",
    )
    # the deep trainer (lab/deep/) as one text, from which the page starts its Web Worker
    worker = "\n".join((ROOT / "lab" / "deep" / f"{name}.js").read_text(encoding="utf-8") for name in DEEP_WORKER)
    (APP / "deep-worker.js").write_text(
        "// Generated by build.py from lab/deep/. Do not edit.\n"
        f"(globalThis.RL = globalThis.RL || {{}}).deepWorker = {json.dumps(worker)};\n",
        encoding="utf-8",
    )
    flow_worker = "\n".join((ROOT / name).read_text(encoding="utf-8")
                            for name in ("lab/core.js", "lab/deep/dmath.js", "lab/flows.js", "lab/flow-worker.js"))
    (APP / "flow-worker.js").write_text(
        "// Generated by build.py from the flow engine. Do not edit.\n"
        f"(globalThis.RL = globalThis.RL || {{}}).flowWorker = {json.dumps(flow_worker)};\n",
        encoding="utf-8",
    )
    size = bundle()
    if course is not None:
        out = pack / f"rl_atlas-{course['id']}.html"
        size = bundle(out, course)
        per = {}
        for link in course["links"]:
            per[link["role"]] = per.get(link["role"], 0) + 1
        log.info("course %s: %d links (%s), %d stations linked, %d notes, %d solutions, %d presets",
                 course["code"], len(course["links"]), ", ".join(f"{n} {r}" for r, n in sorted(per.items())),
                 len({s for l in course["links"] for s in l["stations"]}), len(course["notes"]), len(course["solutions"]), len(course["presets"]))
        log.info("wrote %s (%.1f MB)", out, size / 1e6)
        return 0

    kinds = [st["kind"] for part in data["parts"] for st in part["stations"]]
    written = set(data["entries"])
    algos = sum(1 for part in data["parts"] for st in part["stations"] if st["kind"] == "algorithm" and st["id"] in written)
    log.info(
        "%d stations, %d written (%d of %d algorithms, %d concepts, %d results), %d lab preset(s), %d warning(s)",
        len(kinds), len(written), algos, kinds.count("algorithm"),
        kinds.count("concept"), kinds.count("result"), len(data["presets"]), problems.warnings,
    )
    log.info("wrote %s (%.1f MB)", OUT.name, size / 1e6)
    return 0


if __name__ == "__main__":
    sys.exit(main())
