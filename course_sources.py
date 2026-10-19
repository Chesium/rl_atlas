"""Hashed, page-addressable sources shared by the course importer and builder."""
from __future__ import annotations

import hashlib
import re
from pathlib import Path

KINDS = {"textbook", "paper", "course note", "personal note", "bridge explanation"}
REVIEWS = {"located", "proof-checked", "pending"}


def verified_documents(pack: Path, spec: dict) -> list[dict]:
    """Fail before any import output is changed if a source differs from its manifest."""
    docs, seen = spec.get("document", []), set()
    for doc in docs:
        key = doc.get("id", "")
        if not re.fullmatch(r"[A-Za-z][\w-]*", key) or key in seen:
            raise ValueError(f"document id must be unique: {key!r}")
        seen.add(key)
        path = (pack / doc.get("path", "")).resolve()
        if not path.is_relative_to(pack.resolve()) or not path.is_file():
            raise ValueError(f"{key}: missing source or path outside pack")
        digest = doc.get("sha256", "")
        if not re.fullmatch(r"[0-9a-f]{64}", digest) or hashlib.sha256(path.read_bytes()).hexdigest() != digest:
            raise ValueError(f"{key}: SHA-256 mismatch; source must match the manifest before importing")
        if doc.get("kind") not in KINDS or doc.get("review") not in REVIEWS:
            raise ValueError(f"{key}: document needs a known kind and review status")
        if not doc.get("title") or not doc.get("edition"):
            raise ValueError(f"{key}: document needs title and edition/version")
    return docs


def read_document(doc: dict, pages: list[str]) -> dict:
    """Read numbered headings/statements in chapter notes, plus checked manual book anchors.

    References in body prose are excluded: a statement must start a line and its number
    must be followed by a parenthesized title or a period. Repeats keep their first page.
    """
    if not pages or not any(p.strip() for p in pages):
        raise ValueError(f"{doc['id']}: no selectable PDF text was extracted")
    anchors, seen = [], set()

    def add(key, title, page, category, section=None, printed=None, review=None):
        if key in seen:
            return
        seen.add(key)
        pending = any(section == p or (section or "").startswith(p + ".") for p in doc.get("pending_sections", []))
        anchors.append({"id": key, "title": title, "page": page, "category": category,
                        "section": section, "printed": printed,
                        "review": "pending" if pending else review or doc["review"]})

    if doc.get("chapter") is not None:
        chapter = str(doc["chapter"])
        current = chapter
        section_re = re.compile(r"^\s*(" + re.escape(chapter) + r"\.\d+(?:\.\d+)*)\s+([A-Za-z].*)$")
        statement_re = re.compile(r"^\s*(Theorem|Lemma|Proposition|Definition|Corollary|Assumption|Example|Remark)\s+(" + re.escape(chapter) + r"\.\d+)(?=\s*\(|\.\s)(.*)")
        for page, text in enumerate(pages, 1):
            lines = text.splitlines()
            for i, line in enumerate(lines):
                if m := section_re.match(line):
                    current, title = m.groups()
                    # A wrapped heading ends at the first blank line. Prose is separated by a blank.
                    for extra in lines[i + 1:i + 3] if len(title) >= 55 else []:
                        if not re.match(r"^\s{4,}[A-Za-z]", extra) or section_re.match(extra) or statement_re.match(extra):
                            break
                        title += " " + extra.strip()
                    add(current, title.strip(), page, "section", current)
                elif m := statement_re.match(line):
                    kind, number, rest = m.groups()
                    # Keep only a title; the PDF remains the source of the statement and its proof.
                    label = f"{kind} {number}"
                    if rest.lstrip().startswith("("):
                        text = " ".join([rest.strip(), *[l.strip() for l in lines[i + 1:i + 5]]])
                        title = text[1:].split(").", 1)[0]
                        label += " (" + " ".join(title.split())[:220] + ")"
                    add(f"{kind.lower()}-{number}", label, page, "statement", current)
    for anchor in doc.get("anchor", []):
        page = anchor.get("page", 0)
        if not isinstance(page, int) or not 1 <= page <= len(pages):
            raise ValueError(f"{doc['id']}:{anchor.get('id')}: PDF page out of range")
        if not re.fullmatch(r"[\w.-]+", anchor.get("id", "")):
            raise ValueError(f"{doc['id']}: invalid anchor id")
        if not anchor.get("match") or not re.search(anchor["match"], pages[page - 1], re.I):
            raise ValueError(f"{doc['id']}:{anchor['id']}: expected heading not found on PDF page {page}")
        printed = anchor.get("printed")
        if printed is not None and "offset" in doc and page != printed + doc["offset"]:
            raise ValueError(f"{doc['id']}:{anchor['id']}: printed/PDF page offset mismatch")
        category = "statement" if re.match(r"(?:theorem|lemma|proposition|definition|corollary)-", anchor["id"]) else "section"
        add(anchor["id"], anchor["title"], page, category, anchor.get("section", anchor["id"]), printed, anchor.get("review"))
    for key, title in doc.get("titles", {}).items():
        if key not in seen:
            raise ValueError(f"{doc['id']}:{key}: title override names no imported locator")
        next(a for a in anchors if a["id"] == key)["title"] = title
    return {"id": doc["id"], "sha256": doc["sha256"], "spec": doc, "pages": len(pages), "anchors": anchors}
