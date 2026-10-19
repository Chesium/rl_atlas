"""Read a course pack's materials into import/*.json, which build.py --course reads.

    python tools/course-import.py course/ese3990

From the notebooks: every cell by id, the activities, their tasks, the "Predict first" prompts, the questions with
the answers as written, and every function by its `def`. Cell ids survive re-runs, so links survive a notebook
changing. From the PDFs, when Poppler's pdftotext is installed: the slides' titles and printed numbers, the quiz and
recitation questions with their place on the page, and the book's sections from its contents. When pdftoppm is
installed, the slides and questions the pack links to are drawn as small pictures (import/pictures/).

Standard library only. Without the PDF tools the notebooks are still read, and the build says what is missing.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import tomllib
import html
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from course_sources import verified_documents, read_document

PICTURE_WIDTH = 600  # pixels across a slide's picture; a question's crop keeps the page's scale


def tool(name: str, poppler: bool = True) -> str | None:
    """The first `name` on PATH, preferring Poppler's (xpdf's pdftotext has no word boxes and loses math letters)."""
    found = []
    for folder in os.environ.get("PATH", "").split(os.pathsep):
        for exe in (name, f"{name}.exe"):
            path = Path(folder) / exe
            if path.is_file() and str(path) not in found:
                found.append(str(path))
    if not poppler:
        return found[0] if found else None
    for path in found:
        try:
            out = subprocess.run([path, "-v"], capture_output=True, text=True, timeout=20)
        except (OSError, subprocess.TimeoutExpired):
            continue
        if "poppler" in (out.stdout + out.stderr).lower():
            return path
    return None


def pdf_text(exe: str, pdf: Path, first: int | None = None, last: int | None = None) -> list[str]:
    """The text of every page, in reading layout."""
    args = [exe, "-layout", "-enc", "UTF-8"]
    if first:
        args += ["-f", str(first), "-l", str(last or first)]
    out = subprocess.run(args + [str(pdf), "-"], capture_output=True, timeout=600)
    if out.returncode:
        raise ValueError(f"pdftotext failed for {pdf.name} (exit {out.returncode})")
    pages = out.stdout.decode("utf-8", "replace").replace("\r", "").split("\f")
    return pages[:-1] if pages and not pages[-1].strip() else pages


def pdf_lines(exe: str, pdf: Path) -> list[dict]:
    """Every page's lines with their boxes: [{"w", "h", "lines": [{"x", "y0", "y1", "text"}]}]."""
    out = subprocess.run([exe, "-bbox-layout", "-enc", "UTF-8", str(pdf), "-"], capture_output=True, timeout=600)
    # read with patterns, not an XML parser: the words may hold characters XML forbids
    text = out.stdout.decode("utf-8", "replace")
    pages = []
    for page in re.finditer(r'<page width="([\d.]+)" height="([\d.]+)">(.*?)</page>', text, re.S):
        lines = []
        for line in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="[\d.]+" yMax="([\d.]+)">(.*?)</line>', page.group(3), re.S):
            words = [html.unescape(w) for w in re.findall(r"<word [^>]*>(.*?)</word>", line.group(4), re.S)]
            lines.append({"x": float(line.group(1)), "y0": float(line.group(2)), "y1": float(line.group(3)), "text": " ".join(words)})
        lines.sort(key=lambda l: (round(l["y0"]), l["x"]))
        pages.append({"w": float(page.group(1)), "h": float(page.group(2)), "lines": lines})
    return pages


def clean(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


# ---- slides ----
def read_slides(exe: str, pack: Path, spec: dict, titles: dict) -> list[dict]:
    """Every page of the combined PDF: its lecture, the slide number printed at its corner, and its title."""
    pages = pdf_text(exe, pack / spec["path"])
    slides = []
    for lec in spec["lectures"]:
        a, b = lec["pages"]
        for page in range(a, b + 1):
            text = pages[page - 1] if page - 1 < len(pages) else ""
            lines = [l for l in text.splitlines() if l.strip()]
            # the printed number is the last line's last token, alone at the bottom right
            n = None
            if lines and (m := re.search(r"(\d+)\s*$", lines[-1])) and len(lines[-1].strip()) <= 4 + len(m.group(1)):
                n = int(m.group(1))
                lines = lines[:-1]
            # the title: the first line that reads as words (a slide may open on a formula)
            title = next((l for l in lines if re.search(r"[A-Za-z]{3,}.*[A-Za-z]{3,}", l)), lines[0] if lines else "")
            slides.append({"lecture": lec["n"], "page": page, "n": n, "title": clean(title).lstrip("•▪◦ ").strip(),
                           "text": clean(" ".join(lines))[:600]})
    # A slide without a printed number (a title page) takes the number before it, plus one; the first takes 1.
    for i, s in enumerate(slides):
        if s["n"] is None:
            prev = slides[i - 1] if i and slides[i - 1]["lecture"] == s["lecture"] else None
            s["n"] = prev["n"] + 1 if prev else 1
            s["unnumbered"] = True
    for s in slides:
        if (key := f"L{s['lecture']}:{s['n']}") in titles:
            s["title"] = titles[key]
    return slides


# ---- quizzes and the recitation ----
def read_paper(exe: str, pack: Path, paper: dict) -> list[dict]:
    """The questions of a quiz ("1.", "2.") or the problems of a recitation ("Problem 1" and its parts "(a)"), each
    with its text and the region of the page it fills, from its first line to the next question's."""
    pages = pdf_lines(exe, pack / paper["path"])
    starts = []  # (page, y, number, part)
    left = min((l["x"] for p in pages for l in p["lines"]), default=0)
    for k, page in enumerate(pages):
        for line in page["lines"]:
            t = line["text"]
            if paper["style"] == "quiz":
                if (m := re.match(r"(\d{1,2})\.\s", t)) and line["x"] < left + 30:
                    starts.append((k, line["y0"], m.group(1), ""))
            else:
                if m := re.match(r"Problem (\d+)\s*$", t):
                    starts.append((k, line["y0"], m.group(1), ""))
                elif (m := re.match(r"\(([a-z])\)\s", t)) and starts:
                    starts.append((k, line["y0"], starts[-1][2], m.group(1)))
    # numbers must climb: a "1." inside a question's text is not a question
    kept = []
    for s in starts:
        if paper["style"] == "quiz" and kept and int(s[2]) != int(kept[-1][2]) + 1:
            continue
        kept.append(s)
    questions = []
    for i, (k, y, n, part) in enumerate(kept):
        page = pages[k]
        # where it ends: the next start on the same page, or the page's footer
        nxt = kept[i + 1] if i + 1 < len(kept) else None
        foot = max((l["y0"] for l in page["lines"] if re.fullmatch(r"\d+", l["text"].strip())), default=page["h"])
        end = nxt[1] if nxt and nxt[0] == k else min(foot, page["h"])
        body = [l["text"] for l in page["lines"] if y - 1 <= l["y0"] < end - 1]
        # a question that runs onto the next page keeps that page's lines up to the next start
        cont = None
        if nxt is None or nxt[0] != k:
            if k + 1 < len(pages) and not (nxt and nxt[0] == k + 1 and nxt[1] < 90):
                top = pages[k + 1]["lines"]
                stop = nxt[1] if nxt and nxt[0] == k + 1 else pages[k + 1]["h"]
                # a quiz's answer grid, on the page after its last question, is not part of it
                stop = min([stop] + [l["y0"] for l in top if "Answer grid" in l["text"]])
                extra = [l for l in top if l["y0"] < stop - 1 and l["y0"] > 50 and not re.fullmatch(r"\d+", l["text"].strip())]
                if extra and paper["style"] == "quiz" and not any(re.match(r"\d{1,2}\.\s", l["text"]) for l in extra[:1]):
                    body += [l["text"] for l in extra]
                    cont = {"page": k + 2, "y0": extra[0]["y0"] - 4, "y1": extra[-1]["y1"] + 6}
        text = "\n".join(body)
        options = {}
        if paper["style"] == "quiz":
            for m in re.finditer(r"\(([A-D])\)\s*(.*?)(?=\n\s*\([A-D]\)|\Z)", text, re.S):
                options[m.group(1)] = clean(m.group(2))
        qid = f"{n}{part}"
        questions.append({
            "paper": paper["id"], "id": qid, "n": int(n), "part": part, "page": k + 1, "text": clean(text)[:2000],
            "options": options, "box": {"y0": max(0, y - 6), "y1": end - 2, "w": page["w"], "h": page["h"]},
            **({"more": cont} if cont else {}),
        })
    return questions


# ---- the book ----
def read_book(exe: str, pack: Path, book: dict) -> list[dict]:
    """The sections in the book's contents ("6.4 Sarsa: On-policy TD Control . . . 129"), with printed and PDF pages."""
    pages = pdf_text(exe, pack / book["path"], 1, 30)
    sections, seen = [], set()
    for line in "\n".join(pages).splitlines():
        m = re.match(r"\s*(\d{1,2}(?:\.\d{1,2})?)\s+(\S.*?)\s*(?:\.\s*){3,}\s*(\d+)\s*$", line)
        if m and m.group(1) not in seen:
            seen.add(m.group(1))
            printed = int(m.group(3))
            sections.append({"id": m.group(1), "title": clean(m.group(2)), "printed": printed, "pdf": printed + book.get("offset", 0)})
    return sections


# ---- notebooks ----
ACTIVITY = re.compile(r"^#{2,3}\s*Activity\s+(\d+)\s*[:.\-–]\s*(.+?)\s*(?:\((\d+)\s*pts?\))?\s*$", re.M)
TASK = re.compile(r"\*\*Task\s+(\d+[a-z]?)\.\*\*\s*(.*?)(?=\*\*Task\s+\d|\Z)", re.S)
QUESTION = re.compile(r"^\s*\*\*Q(?:uestion\s+)?(\d+)\.\*\*\s*(.*)", re.S)
PREDICT = re.compile(r"^\s*(?:>\s*)?\*\*Predict first\.\*\*\s*(.*)", re.S)
DEF = re.compile(r"^def (\w+)\(", re.M)


def outputs(cell: dict, pictures: Path, nid: str) -> list[dict]:
    """A code cell's outputs: text as written; a figure saved as a picture, named by the cell."""
    out = []
    for k, o in enumerate(cell.get("outputs", [])):
        data = o.get("data", {})
        if o.get("output_type") == "stream":
            out.append({"text": "".join(o.get("text", ""))[-4000:]})
        elif "image/png" in data:
            import base64
            name = f"{nid}-{cell.get('id')}-{k}.png"
            (pictures / name).write_bytes(base64.b64decode("".join(data["image/png"])))
            out.append({"picture": name})
        elif "text/plain" in data:
            out.append({"text": "".join(data["text/plain"])[-2000:]})
        elif o.get("output_type") == "error":
            out.append({"text": f"{o.get('ename')}: {o.get('evalue')}", "error": True})
    return out


def read_notebook(pack: Path, nb: dict, pictures: Path) -> dict:
    raw = json.loads((pack / nb["path"]).read_text(encoding="utf-8"))
    cells, activities, functions, questions, predicts = [], [], {}, [], []
    activity = None
    for i, c in enumerate(raw["cells"]):
        src = "".join(c.get("source", ""))
        cid = c.get("id") or f"cell{i}"
        if c["cell_type"] == "markdown" and (m := ACTIVITY.search(src)):
            activity = f"A{m.group(1)}"
            activities.append({"id": activity, "n": int(m.group(1)), "title": clean(m.group(2)),
                               "points": int(m.group(3)) if m.group(3) else None, "cell": cid,
                               "text": src, "tasks": [], "cells": []})
        cell = {"id": cid, "type": c["cell_type"], "source": src, "activity": activity}
        if c["cell_type"] == "code":
            cell["outputs"] = outputs(c, pictures, nb["id"])
            for m in DEF.finditer(src):
                # the function's own text: from its def to the next top-level line
                rest = src[m.start():]
                end = re.search(r"\n(?=[^\s)])", rest[1:])  # a signature over several lines closes with ")" at column 0
                body = rest[: end.start() + 1] if end else rest
                doc = re.search(r'^\s+"""(.*?)"""', body, re.S | re.M)
                functions[m.group(1)] = {"name": m.group(1), "cell": cid, "activity": activity,
                                         "source": body.rstrip(), "doc": clean(doc.group(1)) if doc else ""}
        if c["cell_type"] == "markdown":
            for m in TASK.finditer(src):
                if activities and activity:
                    activities[-1]["tasks"].append({"id": m.group(1), "text": m.group(2).strip()})
            if m := QUESTION.match(src):
                questions.append({"id": f"Q{m.group(1)}", "n": int(m.group(1)), "cell": cid, "activity": activity,
                                  "text": m.group(2).strip(), "answer": None})
            elif m := PREDICT.match(src):
                predicts.append({"id": f"P{len(predicts) + 1}", "cell": cid, "activity": activity, "text": m.group(1).strip()})
            elif re.match(r"^\s*\*Your (answer|prediction)", src):
                # the answer as written belongs to the question or prediction just before it
                target = None
                if predicts and predicts[-1]["cell"] == cells[-1]["id"]:
                    target = predicts[-1]
                elif questions and questions[-1]["cell"] == cells[-1]["id"]:
                    target = questions[-1]
                if target is not None:
                    target["answer"] = re.sub(r"^\s*\*Your (answer|prediction)[^*]*\*:?\s*", "", src).strip()
                    target["answerCell"] = cid
            # a prediction may hold its answer in the same cell
            if (m := PREDICT.match(src)) and "*Your prediction" in src:
                head, _, ans = src.partition("*Your prediction")
                predicts[-1]["text"] = PREDICT.match(head).group(1).strip()
                predicts[-1]["answer"] = re.sub(r"^[^*]*\*:?\s*", "", ans).strip()
        cells.append(cell)
        if activity and activities:
            activities[-1]["cells"].append(cid)
    return {"id": nb["id"], "ps": nb.get("ps"), "title": nb["title"], "path": nb["path"], "cells": cells,
            "activities": activities, "functions": functions, "questions": questions, "predicts": predicts}


# ---- pictures ----
def link_refs(pack: Path) -> set[str]:
    """Every course item the pack's links name: those are the ones to draw."""
    refs = set()
    files = [pack / "links.toml", *sorted((pack / "links").glob("*.toml"))]
    for f in files:
        if f.exists():
            for link in tomllib.loads(f.read_text(encoding="utf-8")).get("link", []):
                refs.add(link.get("at", ""))
    return refs


def draw(ppm: str, pdf: Path, page: int, out: Path, crop: dict | None = None) -> bool:
    """One page as a JPEG, or the box of it a question fills."""
    if out.exists() and out.stat().st_mtime > max(pdf.stat().st_mtime, Path(__file__).stat().st_mtime):
        return True
    stem = out.with_suffix("")
    args = [ppm, "-f", str(page), "-l", str(page), "-jpeg", "-jpegopt", "quality=62", "-singlefile"]
    if crop:
        scale = 1.6  # 115 dpi: a question's text stays readable
        args += ["-r", str(72 * scale), "-x", "0", "-y", str(int(crop["y0"] * scale)),
                 "-W", str(int(crop["w"] * scale)), "-H", str(int((crop["y1"] - crop["y0"]) * scale))]
    else:
        args += ["-scale-to-x", str(PICTURE_WIDTH), "-scale-to-y", "-1"]
    res = subprocess.run(args + [str(pdf), str(stem)], capture_output=True, timeout=120)
    return res.returncode == 0 and out.exists()


def slide_range(ref: str) -> tuple[int, int, int] | None:
    if m := re.fullmatch(r"L(\d+):(\d+)(?:-(\d+))?", ref):
        return int(m.group(1)), int(m.group(2)), int(m.group(3) or m.group(2))
    return None


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print(__doc__)
        return 2
    pack = Path(argv[1]).resolve()
    spec = tomllib.loads((pack / "course.toml").read_text(encoding="utf-8"))
    try:
        documents = verified_documents(pack, spec)
        text = tool("pdftotext")
        if documents and not text:
            raise ValueError("Poppler's pdftotext is required for source-document imports")
        sources = [read_document(doc, pdf_text(text, pack / doc["path"])) for doc in documents]
    except (ValueError, OSError) as exc:
        print(f"Source verification failed: {exc}", file=sys.stderr)
        return 1
    out = pack / "import"
    pictures = out / "pictures"
    pictures.mkdir(parents=True, exist_ok=True)
    (out / "documents.json").write_text(json.dumps(sources, ensure_ascii=False, indent=1), encoding="utf-8")
    text, ppm = tool("pdftotext"), tool("pdftoppm", poppler=False)
    report = []
    report.extend(f"{d['id']}: SHA-256 verified, {d['pages']} pages, {len(d['anchors'])} locators" for d in sources)

    notebooks = [read_notebook(pack, nb, pictures) for nb in spec.get("notebook", [])]
    (out / "notebooks.json").write_text(json.dumps(notebooks, ensure_ascii=False, indent=1), encoding="utf-8")
    for nb in notebooks:
        report.append(f"{nb['id']}: {len(nb['cells'])} cells, {len(nb['activities'])} activities, "
                      f"{len(nb['functions'])} functions, {len(nb['questions'])} questions, {len(nb['predicts'])} predictions")

    slides, questions, book = [], [], []
    if text:
        if "slides" in spec:
            titles = dict(spec.get("titles", {}))
            for f in sorted((pack / "titles").glob("*.toml")):
                titles.update(tomllib.loads(f.read_text(encoding="utf-8")).get("titles", {}))
            slides = read_slides(text, pack, spec["slides"], titles)
            report.append(f"slides: {len(slides)} pages in {len(spec['slides']['lectures'])} lectures")
        for paper in spec.get("paper", []):
            qs = read_paper(text, pack, paper)
            questions += qs
            report.append(f"{paper['id']}: {len(qs)} questions ({', '.join(q['id'] for q in qs)})")
        if "book" in spec:
            book = read_book(text, pack, spec["book"])
            report.append(f"book: {len(book)} sections in its contents")
    else:
        report.append("Poppler's pdftotext is not installed: no slides, questions or book sections (the build will say so)")
    (out / "slides.json").write_text(json.dumps(slides, ensure_ascii=False, indent=1), encoding="utf-8")
    (out / "questions.json").write_text(json.dumps(questions, ensure_ascii=False, indent=1), encoding="utf-8")
    (out / "book.json").write_text(json.dumps(book, ensure_ascii=False, indent=1), encoding="utf-8")

    # the pictures of what the links name: a slide (the first of a run), every question of a paper
    drawn, failed = 0, 0
    if ppm:
        refs = link_refs(pack)
        by_page = {(s["lecture"], s["n"]): s["page"] for s in slides}
        for ref in sorted(refs):
            if r := slide_range(ref):
                lec, a, b = r
                for n in (a,):  # a run of slides is shown by its first
                    if (page := by_page.get((lec, n))) and draw(ppm, pack / spec["slides"]["path"], page, pictures / f"slide-{page}.jpg"):
                        drawn += 1
                    elif page:
                        failed += 1
        papers = {p["id"]: p for p in spec.get("paper", [])}
        for q in questions:
            name = f"{q['paper']}-{q['id']}"
            ok = draw(ppm, pack / papers[q["paper"]]["path"], q["page"], pictures / f"{name}.jpg", q["box"])
            if ok and q.get("more"):
                m = q["more"]
                ok = draw(ppm, pack / papers[q["paper"]]["path"], m["page"], pictures / f"{name}-more.jpg",
                          {**m, "w": q["box"]["w"], "h": q["box"]["h"]})
            drawn, failed = drawn + ok, failed + (not ok)
        report.append(f"pictures: {drawn} drawn{f', {failed} failed' if failed else ''}")
    else:
        report.append("pdftoppm is not installed: no pictures")
    print("\n".join(report))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
