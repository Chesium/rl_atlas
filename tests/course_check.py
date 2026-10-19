"""Invented materials only; the real local pack is optional and never copied into fixtures."""
import contextlib
import io
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
import hashlib
import tomllib
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import build
from course_sources import read_document

spec = importlib.util.spec_from_file_location("course_import", ROOT / "tools/course-import.py")
importer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(importer)


class CourseTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        problems = build.Problems()
        cls.data, cls.recordings = build.compile_content(problems)
        assert not problems.errors

    def setUp(self):
        quiet = patch.object(build.log, "disabled", True)
        quiet.start()
        self.addCleanup(quiet.stop)
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.pack = Path(self.temp.name) / "pack"
        shutil.copytree(ROOT / "tests/course-pack", self.pack)
        # Exercise notebook import even on CI machines without Poppler.
        with patch.object(importer, "tool", return_value=None), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(importer.main(["course-import.py", str(self.pack)]), 0)
        self.write("slides", [{"lecture": lec, "n": n, "page": (lec - 1) * 2 + n,
                               "title": f"Invented slide {lec}.{n}"} for lec in (1, 2) for n in (1, 2)])
        self.write("questions", [{"paper": "Quiz", "id": "1", "n": 1, "part": "", "page": 1,
                                  "text": "Which target? (A) Sampled action (B) Maximum", "options": {"A": "Sampled action", "B": "Maximum"}}])
        self.write("book", [{"id": "6.4", "title": "Invented Sarsa section", "printed": 129, "pdf": 151}])

    def write(self, name, value):
        (self.pack / "import" / f"{name}.json").write_text(json.dumps(value), encoding="utf-8")

    def compile(self):
        problems = build.Problems()
        course = build.compile_course(self.pack, self.data, self.recordings, problems)
        return course, problems

    def test_notebook_import_and_two_way_references(self):
        course, problems = self.compile()
        self.assertEqual(problems.errors, 0)
        nb = course["notebooks"][0]
        self.assertEqual(nb["order"], ["intro", "activity", "predict", "code", "question", "answer"])
        self.assertEqual(nb["activities"][0]["tasks"], ["1"])
        self.assertEqual(nb["questions"][0]["answerCell"], "answer")
        self.assertIn("Yes.", nb["predicts"][0]["said"])
        self.assertEqual(nb["cells"]["code"]["out"], [{"text": "0.5\n"}])
        source = nb["functions"]["sarsa_update"]["source"]
        self.assertIn("return q + alpha * (target - q)", source)
        self.assertNotIn("print(", source)
        for link in course["links"]:
            # Ranges are resolved to the first slide for display, every other key is exact.
            ref = link["at"].split("-")[0] if link["at"].startswith("L") else link["at"]
            self.assertIn(ref, course["items"])
        refs = [l for l in course["links"] if l["at"] == "Quiz:1"]
        self.assertEqual(refs[0]["stations"], ["sarsa", "q-learning"])
        self.assertEqual(course["items"]["SB:6.4"]["page"], 151)
        self.assertEqual(course["solutions"]["Quiz:1"]["answer"], "A")

    def test_reject_invalid_references_roles_and_pairings(self):
        file = self.pack / "links.toml"
        valid = file.read_text(encoding="utf-8")
        for old, new in [("sarsa\"]", "missing-station\"]"), ('"L2:1"', '"L2:99"'),
                         ('"HW:#answer"', '"HW:#missing"'), ('"Quiz:1"', '"Quiz:99"'),
                         ('"implements"', '"invents"'), ("update =", "missing_line ="),
                         ("return q + alpha * (target - q)", "nonexistent code")]:
            with self.subTest(new=new):
                file.write_text(valid.replace(old, new), encoding="utf-8")
                _, problems = self.compile()
                self.assertGreater(problems.errors, 0)

    def test_reject_invalid_derivation_item(self):
        (self.pack / "maps.toml").write_text('[[derive]]\nid="bad"\nsteps=[{station="sarsa", at=["L2:99"]}]\n', encoding="utf-8")
        _, problems = self.compile()
        self.assertGreater(problems.errors, 0)

    def test_range_can_span_omitted_printed_slide_numbers(self):
        slides = json.loads((self.pack / "import/slides.json").read_text(encoding="utf-8"))
        slides[1]["n"] = 3
        self.write("slides", slides)
        file = self.pack / "links.toml"
        file.write_text(file.read_text(encoding="utf-8").replace("L1:1-2", "L1:1-3"), encoding="utf-8")
        _, problems = self.compile()
        self.assertEqual(problems.errors, 0)

    def test_pdf_parsers_with_invented_pages(self):
        with patch.object(importer, "pdf_text", return_value=["First steps\n1\n", "Another target\n2\n", "Learning targets\n1\n", "Last slide\n2\n"]):
            slides = importer.read_slides("unused", self.pack, {"path": "slides.pdf", "lectures": [
                {"n": 1, "pages": [1, 2]}, {"n": 2, "pages": [3, 4]}]}, {"L2:1": "Title override"})
        self.assertEqual([(s["lecture"], s["n"], s["page"]) for s in slides], [(1, 1, 1), (1, 2, 2), (2, 1, 3), (2, 2, 4)])
        self.assertEqual(slides[2]["title"], "Title override")
        lines = [{"x": 40, "y0": y, "y1": y + 10, "text": t} for y, t in [
            (70, "1. Which action?"), (90, "(A) Sampled action"), (110, "(B) Maximum"), (150, "2. Which value?"), (170, "(A) Zero"), (190, "(B) One")]]
        with patch.object(importer, "pdf_lines", return_value=[{"w": 600, "h": 800, "lines": lines}]):
            qs = importer.read_paper("unused", self.pack, {"id": "Quiz", "path": "quiz.pdf", "style": "quiz"})
        self.assertEqual([q["id"] for q in qs], ["1", "2"])
        self.assertEqual(qs[0]["options"]["B"], "Maximum")
        self.assertLess(qs[0]["box"]["y1"], 150)  # the next question's first text baseline
        with patch.object(importer, "pdf_text", return_value=["6.4 Sarsa . . . . . 129\n"]):
            sections = importer.read_book("unused", self.pack, {"path": "book.pdf", "offset": 22})
        self.assertEqual(sections[0]["pdf"], 151)

    def test_public_bundle_is_deterministic_and_has_no_pack_payload(self):
        course, problems = self.compile()
        self.assertEqual(problems.errors, 0)
        public, private = self.pack / "public.html", self.pack / "private.html"
        build.bundle(public)
        before = public.read_bytes()
        build.bundle(private, course)
        self.assertIn(b"PRIVATE_FIXTURE_MARKER", private.read_bytes())
        self.assertNotIn(b"PRIVATE_FIXTURE_MARKER", before)
        self.assertNotIn(b"globalThis.RL.course =", before)
        build.bundle(public)
        self.assertEqual(before, public.read_bytes())

    def add_document(self):
        pdf = self.pack / "notes.pdf"
        pdf.write_bytes(b"%PDF invented document fixture")
        digest = hashlib.sha256(pdf.read_bytes()).hexdigest()
        manifest = self.pack / "course.toml"
        with manifest.open("a", encoding="utf-8") as out:
            out.write(f'''\n[[document]]
id = "Notes"
title = "Invented chapter"
edition = "Fixture edition"
path = "notes.pdf"
sha256 = "{digest}"
kind = "course note"
review = "located"
chapter = 3
pending_sections = ["3.2"]
''')
        doc = tomllib.loads(manifest.read_text(encoding="utf-8"))["document"][0]
        result = read_document(doc, ["3.1 Dynamics\n\nDefinition 3.1 (A state). Text.\n",
                                     "3.2 Appendix\n\nTheorem 3.2 (A draft). Text.\n"])
        self.write("documents", [result])
        return doc, result

    def test_document_locators_provenance_and_pending_routes(self):
        doc, result = self.add_document()
        self.assertEqual([a["page"] for a in result["anchors"]], [1, 1, 2, 2])
        self.assertEqual([a["review"] for a in result["anchors"]], ["located", "located", "pending", "pending"])
        links = self.pack / "links.toml"
        with links.open("a", encoding="utf-8") as out:
            out.write('''\n[[link]]
at="Notes:3.2"
stations=["stability"]
role="compares"
relation="optional"
note="Invented draft context."
''')
        course, p = self.compile()
        self.assertEqual(p.errors, 0)
        it = course["items"]["Notes:theorem-3.2"]
        self.assertEqual(it["kind"], "source-anchor")
        self.assertEqual(it["page"], 2)
        self.assertIn("PDF p. 2", it["source"]["locator"])
        self.assertEqual(next(l for l in course["links"] if l["at"] == "Notes:3.2")["source"]["review"], "pending")
        links.write_text(links.read_text(encoding="utf-8").replace('relation="optional"', 'relation="required"'), encoding="utf-8")
        self.assertGreater(self.compile()[1].errors, 0)

    def test_hash_preflight_leaves_previous_import_untouched(self):
        self.add_document()
        saved = (self.pack / "import/documents.json").read_bytes()
        (self.pack / "notes.pdf").write_bytes(b"changed source")
        with contextlib.redirect_stderr(io.StringIO()):
            self.assertEqual(importer.main(["course-import.py", str(self.pack)]), 1)
        self.assertEqual((self.pack / "import/documents.json").read_bytes(), saved)
        self.assertGreater(self.compile()[1].errors, 0)

    def test_document_manifest_changes_require_reimport(self):
        self.add_document()
        file = self.pack / "course.toml"
        file.write_text(file.read_text(encoding="utf-8").replace('pending_sections = ["3.2"]', 'pending_sections = ["3.1", "3.2"]'), encoding="utf-8")
        self.assertGreater(self.compile()[1].errors, 0)

    def test_manual_anchors_check_page_text_and_printed_offset(self):
        doc, _ = self.add_document()
        doc.pop("chapter")
        doc["offset"] = 1
        doc["anchor"] = [dict(id="1.1", title="Invented heading", page=2, printed=1, match="Heading")]
        result = read_document(doc, ["cover", "1.1 Heading\nText"])
        self.assertEqual(result["anchors"][0]["printed"], 1)
        with self.assertRaises(ValueError):
            read_document(doc, ["cover", "wrong page"])
        doc["anchor"][0]["printed"] = 2
        with self.assertRaises(ValueError):
            read_document(doc, ["cover", "Heading"])

    def test_document_parser_ignores_body_references_and_deduplicates(self):
        doc, _ = self.add_document()
        result = read_document(doc, ["3.1 Dynamics\n\nTheorem 3.1 is discussed here.\nDefinition 3.1 (State). Body.",
                                     "Definition 3.1 (State). Repeated.\n3.2 Appendix\n\n3.2.1 Detail\nTheorem 3.2 (Draft). Body."])
        self.assertEqual([a["id"] for a in result["anchors"]], ["3.1", "definition-3.1", "3.2", "3.2.1", "theorem-3.2"])
        self.assertEqual(result["anchors"][-1]["review"], "pending")

    @unittest.skipUnless((ROOT / "course/ese6180/course.toml").exists(), "private ESE6180 pack absent")
    def test_real_control_pack_coverage_and_separation(self):
        p = build.Problems()
        course = build.compile_course(ROOT / "course/ese6180", self.data, self.recordings, p)
        self.assertEqual(p.errors, 0)
        self.assertEqual([d["chapter"] for d in course["documents"] if "chapter" in d], [3, 4, 5, 6, 7])
        self.assertEqual(len(course["documents"]), 11)
        for at in ["N3:3.5", "N4:4.1", "N5:5.6", "N6:6.3", "N7:7.6", "Boffi:theorem-4.2"]:
            self.assertIn(at, course["items"])
            self.assertTrue(any(l["at"] == at for l in course["links"]))
        self.assertEqual(course["items"]["Khalil:4.1"]["page"], 128)
        self.assertEqual(course["items"]["Khalil:4.1"]["printed"], 112)
        model = next(l for l in course["links"] if l["at"] == "N4:4.1")
        self.assertTrue({"models", "model-based-deep"}.issubset(model["stations"]))
        for link in course["links"]:
            self.assertIn("source", link)
            if link["at"].startswith(("N6:", "N7:")):
                self.assertIn(link["relation"], ["motivation", "optional"])
            if link["source"]["review"] == "pending":
                self.assertEqual(link["relation"], "optional")
        before = json.dumps(self.data["routes"], sort_keys=True)
        public = self.pack / "public-control.html"
        build.bundle(public)
        self.assertNotIn(b"globalThis.RL.course =", public.read_bytes())
        self.assertEqual(before, json.dumps(self.data["routes"], sort_keys=True))

    @unittest.skipUnless((ROOT / "course/ese3990/course.toml").exists(), "private pack absent")
    def test_real_pack_coverage_and_numeric_solutions(self):
        pack = ROOT / "course/ese3990"
        p = build.Problems()
        course = build.compile_course(pack, self.data, self.recordings, p)
        self.assertEqual(p.errors, 0)
        self.assertEqual(len(course["lectures"]), 13)
        self.assertEqual([len(nb["activities"]) for nb in course["notebooks"]], [5, 5, 3, 5, 5])
        linked = {l["at"] for l in course["links"]}
        for nb in course["notebooks"]:
            for act in nb["activities"]:
                self.assertIn(f"{nb['id']}:{act['id']}", linked)
        for paper in course["papers"]:
            for q in paper["questions"]:
                if paper["id"] == "Rec" and q.isdigit():
                    continue  # recitation parts carry the assessment links
                at = f"{paper['id']}:{q}"
                self.assertIn(at, linked)
                self.assertIn(at, course["solutions"])
        for script in sorted((pack / "solutions").glob("check_*.py")):
            subprocess.run([sys.executable, str(script)], check=True)


if __name__ == "__main__":
    unittest.main()
