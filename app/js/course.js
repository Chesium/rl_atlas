/* A course pack (build.py --course DIR): the course's lectures, homework, quizzes and book pages beside the stations.
   Nothing here runs in the public atlas, where RL.course is not set.
   A station gains a tab after its Card (its slides, homework, practice and course notes); every course item has a page
   (#/c/<item>) that leads back to the stations; the map gains the course's views; search finds course items. */
(function (RL) {
  "use strict";
  const C = RL.course;
  if (!C) return;
  const { $, esc, station, entry, store, lineColor } = RL;

  // ---- the pack's Lab worlds and presets join the atlas's ----
  for (const [id, spec] of Object.entries(C.worlds || {})) RL.lab?.addGridWorld?.(id, spec);
  Object.assign(RL.content.presets, C.presets);

  // ---- items, by the name the links give them ----
  const items = C.items;
  const nbs = Object.fromEntries(C.notebooks.map((n) => [n.id, n]));
  const papers = Object.fromEntries(C.papers.map((p) => [p.id, p]));
  const ROLE = { introduces: "Introduces", derives: "Derives", implements: "Implements", compares: "Compares", assesses: "Assesses" };
  // a run of slides: L8:28-31
  function item(at) {
    const m = at.match(/^(L\d+):(\d+)-(\d+)$/);
    if (m) {
      const first = items[`${m[1]}:${m[2]}`];
      return first && { ...first, kind: "slides", to: +m[3], ref: at };
    }
    return items[at] && { ...items[at], ref: at };
  }
  const byStation = new Map();
  C.links.forEach((l, i) => { for (const s of l.stations) { if (!byStation.has(s)) byStation.set(s, []); byStation.get(s).push(i); } });
  const linksAt = new Map();
  C.links.forEach((l) => { if (!linksAt.has(l.at)) linksAt.set(l.at, []); linksAt.get(l.at).push(l); });
  // the Lab presets that run an activity's experiment
  const labs = (act) => (C.experiments || []).filter((x) => x.at === act)
    .map((x) => `<p class="c-lab"><a class="btn ghost" href="#/lab/${x.lab}">${esc(RL.content.presets[x.lab]?.title || x.lab)} ▸</a><span class="faint">${x.note}</span></p>`).join("");
  const lectureOf = (it) => it.kind === "lecture" ? it.n : it.lecture;
  const paperTitle = (id) => papers[id]?.title.split(" · ")[0] || id;

  // Course titles may hold $math$: on a page it is typeset, on the map it is read as plain text.
  const tex = (s) => esc(s).replace(/\$([^$]+)\$/g, '<span class="tex">$1</span>');
  const plain = (s) => {
    const d = document.createElement("div");
    d.innerHTML = String(s);
    return d.textContent.replace(/\$([^$]+)\$/g, "$1").replace(/\\(\w+)/g, (m, w) => ({ pi: "π", mu: "μ", epsilon: "ε", lambda: "λ", gamma: "γ", alpha: "α", theta: "θ" })[w] || w);
  };
  // What a reader calls an item, in a few words.
  function name(at, long = false) {
    const it = item(at);
    if (!it) return esc(at);
    switch (it.kind) {
      case "lecture": return `Lecture ${it.n}${long ? ` · ${esc(it.title)}` : ""}`;
      case "slide": return `L${it.lecture} · slide ${it.n}${long && it.title ? ` · ${esc(it.title)}` : ""}`;
      case "slides": return `L${it.lecture} · slides ${it.n}–${it.to}${long && it.title ? ` · ${esc(it.title)}` : ""}`;
      case "question": return it.paper === "Rec" ? `Recitation · ${it.n}${it.part ? `(${it.part})` : ""}` : `${esc(paperTitle(it.paper))} · Q${it.n}`;
      case "notebook": return `PS${it.ps} · ${esc(it.title)}`;
      case "activity": return `PS${nbs[it.notebook].ps} · ${esc(nbs[it.notebook].title)} · Activity ${it.n}${long ? `: ${tex(it.title)}` : ""}`;
      case "function": return `<code>${esc(it.name)}()</code>`;
      case "nb-question": return `PS${nbs[it.notebook].ps} · ${esc(nbs[it.notebook].title)} · Question ${it.id.slice(1)}`;
      case "predict": return `PS${nbs[it.notebook].ps} · ${esc(nbs[it.notebook].title)} · Predict first`;
      case "cell": return `PS${nbs[it.notebook].ps} · ${esc(nbs[it.notebook].title)} · ${it.activity ? `Activity ${it.activity.slice(1)}, ` : ""}experiment`;
      case "section": return `Sutton &amp; Barto §${esc(it.id)}${long ? ` ${esc(it.title)}` : ""}`;
    }
    return esc(at);
  }
  // Where an item's page is: a slide opens its lecture's page at it, a notebook item its activity's page at its cell.
  function page(at) {
    const it = item(at);
    if (!it) return "#/c/";
    if (it.kind === "slide" || it.kind === "slides") return `#/c/L${it.lecture}:${it.n}`;
    return `#/c/${at}`;
  }
  // The PDF at the item's page, from the folder next to this file.
  function pdf(at) {
    const it = item(at);
    if (!it) return null;
    if (it.kind === "slide" || it.kind === "slides") return `${C.files.slides}#page=${it.page}`;
    if (it.kind === "lecture") return `${C.files.slides}#page=${C.lectures.find((l) => l.n === it.n).pages[0]}`;
    if (it.kind === "question") return `${papers[it.paper].file}#page=${it.page}`;
    if (it.kind === "section") return `${C.files.book}#page=${it.page}`;
    if (it.notebook || it.kind === "notebook") return nbs[it.notebook || it.id].file;
    return null;
  }
  const pdfLink = (at, text = "Open the PDF") => { const u = pdf(at); return u ? `<a class="c-pdf" href="${esc(u)}" target="_blank" rel="noopener">${text} ↗</a>` : ""; };
  const chip = (sid, role) => station(sid)
    ? `<a class="chip c-st" href="#/e/${sid}/course" data-term="${sid}" style="--c:${lineColor(station(sid).line)}"><i></i>${esc(station(sid).short || station(sid).title)}</a>`
    : "";
  const roleTag = (role) => `<span class="c-role c-role-${role}">${ROLE[role] || esc(role)}</span>`;

  // ---- solved questions are ticked, kept like visited stations ----
  const solved = (at) => !!store.get("solved", {})[at];
  function setSolved(at, on) {
    const s = { ...store.get("solved", {}) };
    if (on) s[at] = 1; else delete s[at];
    store.set("solved", s);
  }
  const tick = (at) => `<label class="c-tick"><input type="checkbox" data-solved="${esc(at)}"${solved(at) ? " checked" : ""}> solved</label>`;
  document.addEventListener("change", (e) => { const b = e.target.closest?.("[data-solved]"); if (b) setSolved(b.dataset.solved, b.checked); });
  document.addEventListener("click", (e) => { if (e.target.closest?.(".c-tick")) e.stopPropagation(); }, true);

  // ---- pieces shared by the tab and the pages ----
  const pic = (src, alt, cls = "c-pic") => src ? `<img class="${cls}" src="${src}" alt="${esc(alt)}" loading="lazy">` : "";
  function questionCard(at, opts = {}) {
    const it = item(at), sol = C.solutions[at];
    const needs = [...new Set((linksAt.get(at) || []).flatMap((l) => l.stations))];
    const front = `${it.pic ? pic(it.pic, name(at)) : `<p class="c-question-text">${esc(it.text)}</p>`}${it.more ? pic(it.more, `${name(at)}, continued`) : ""}
      ${opts.needs !== false && needs.length ? `<p class="c-needs">Needs ${needs.map((s) => chip(s)).join(" ")}</p>` : ""}`;
    const back = sol ? `${sol.answer ? `<p class="c-answer">Answer <b>${esc(sol.answer)}</b></p>` : ""}${sol.html}` : "<p>No worked solution yet.</p>";
    return `<div class="c-q" data-at="${esc(at)}">
      <div class="c-q-head"><a href="${page(at)}"><b>${name(at)}</b></a>${tick(at)}${pdfLink(at, "PDF")}</div>
      <div class="question c-flip" tabindex="0" role="button" aria-label="Show the solution">
        <div class="face q">${front}</div><div class="face a"><span class="tag">Solution</span>${back}</div>
      </div></div>`;
  }
  // A notebook's cell as the course wrote it: Markdown rendered, code as written with its printed output.
  function cell(nb, id, opts = {}) {
    const c = nbs[nb].cells[id];
    if (!c) return "";
    if (c.md !== undefined) return `<div class="c-cell c-md" data-cell="${id}">${c.md}</div>`;
    const lines = c.code.split("\n").length, out = (c.out || []).map((o) => o.pic ? pic(o.pic, "the cell's figure", "c-fig") : `<pre class="c-out${o.error ? " err" : ""}">${esc(o.text)}</pre>`).join("");
    const code = `<pre class="c-code"><code>${esc(c.code)}</code></pre>`;
    return `<div class="c-cell c-codecell" data-cell="${id}">${opts.fold && lines > 18 ? `<details><summary>Code, ${lines} lines</summary>${code}</details>` : code}${out}</div>`;
  }
  // The homework's function beside the Card's pseudocode: hover a line of either, and its partner lights up.
  function paired(sid, link) {
    const it = item(link.at), f = nbs[it.notebook].functions[it.name], e = entry(sid);
    if (!e?.pseudocode) return "";
    const lines = f.source.split("\n");
    const mates = {};
    for (const [lid, text] of Object.entries(link.pair)) mates[lid] = lines.findIndex((l) => l.includes(text));
    const code = lines.map((l, i) => {
      const lid = Object.keys(mates).find((k) => mates[k] === i);
      return `<span class="c-line"${lid ? ` data-mate="${lid}"` : ""}>${esc(l) || " "}</span>`;
    }).join("\n");
    return `<div class="c-pair" data-pair>
      <div class="c-pair-side"><div class="eyebrow">The atlas's pseudocode</div>${e.pseudocode}</div>
      <div class="c-pair-side"><div class="eyebrow">${esc(nbs[it.notebook].title)}, PS${nbs[it.notebook].ps} · as written</div><pre class="c-code"><code>${code}</code></pre></div>
    </div>`;
  }
  function wirePairs(root) {
    for (const p of root.querySelectorAll("[data-pair]")) {
      const light = (lid, on) => p.querySelectorAll(`[data-line="${lid}"], [data-mate="${lid}"]`).forEach((el) => el.classList.toggle("c-hot", on));
      p.addEventListener("pointerover", (e) => { const el = e.target.closest("[data-line], [data-mate]"); if (el) light(el.dataset.line || el.dataset.mate, true); });
      p.addEventListener("pointerout", (e) => { const el = e.target.closest("[data-line], [data-mate]"); if (el) light(el.dataset.line || el.dataset.mate, false); });
      p.querySelectorAll("[data-mate]").forEach((el) => p.querySelector(`[data-line="${el.dataset.mate}"]`)?.classList.add("c-has-mate"));
    }
  }
  // Slides at full size: click a picture to see it large, Escape or a click closes it.
  document.addEventListener("click", (e) => {
    const img = e.target.closest?.("img.c-pic, img.c-fig");
    // The card's own click handler has already flipped it by the time this bubbles here.
    // A picture inside it belongs to that gesture; opening a zoom would cover the answer.
    if (!img || img.closest(".c-flip")) return;
    const box = RL.h(`<div class="c-zoom" role="dialog" aria-label="The picture, large"><img src="${img.src}" alt=""></div>`);
    const close = () => { box.remove(); removeEventListener("keydown", key); };
    const key = (k) => { if (k.key === "Escape") close(); };
    box.addEventListener("click", close);
    addEventListener("keydown", key);
    document.body.appendChild(box);
  });

  // ---- the tab on a station: what the course says about it ----
  RL.courseMode = (id) => (byStation.has(id) || C.notes.some((n) => n.stations.includes(id)))
    ? { id: "course", name: C.code, sub: "the course", next: `See it in ${C.code}` } : null;

  RL.courseTab = function (host, id) {
    const links = (byStation.get(id) || []).map((i) => C.links[i]);
    const of = (kinds) => links.filter((l) => kinds.includes(item(l.at)?.kind));
    const lectures = of(["slide", "slides", "lecture"]).sort((a, b) => item(a.at).page - item(b.at).page);
    const book = of(["section"]);
    const homework = of(["notebook", "activity", "function", "cell"]);
    const practice = of(["question", "nb-question", "predict"]);
    const notes = C.notes.filter((n) => n.stations.includes(id));
    const others = (l) => l.stations.filter((s) => s !== id);
    const also = (l) => others(l).length ? `<span class="c-also">with ${others(l).map((s) => chip(s)).join(" ")}</span>` : "";

    const lectureHtml = lectures.length ? Object.entries(Object.groupBy(lectures, (l) => lectureOf(item(l.at)))).map(([n, ls]) => `
      <div class="c-lec"><h3><a href="#/c/L${n}">Lecture ${n} · ${esc(C.lectures.find((x) => x.n === +n).title)}</a></h3>
      <ul class="c-slides">${ls.map((l) => { const it = item(l.at); return `<li class="c-slide">
        <div class="c-thumb">${it.pic ? pic(it.pic, name(l.at, true), "c-pic c-small") : `<span class="c-nopic">${it.n}</span>`}</div>
        <div><div class="c-line1">${roleTag(l.role)}<a href="${page(l.at)}">${name(l.at, true)}</a>${pdfLink(l.at, "PDF")}</div><p>${l.note}</p>${also(l)}</div></li>`; }).join("")}</ul></div>`).join("") : "";
    const bookHtml = book.length ? `<ul class="c-book">${book.map((l) => `<li>${pdfLink(l.at, name(l.at, true))} <span class="faint">${l.note}</span></li>`).join("")}</ul>` : "";

    // the homework, by activity: what it builds, its functions (paired with the pseudocode where they can be), its experiments
    const byAct = Object.groupBy(homework, (l) => { const it = item(l.at); return it.kind === "activity" ? l.at : it.activity ? `${it.notebook}:${it.activity}` : l.at; });
    const homeworkHtml = Object.entries(byAct).map(([act, ls]) => {
      const a = item(act);
      return `<div class="c-act"><h3><a href="${page(act)}">${name(act, true)}</a>${pdfLink(act, "notebook")}</h3>
        ${ls.map((l) => { const it = item(l.at); return `<div class="c-hw">
          <div class="c-line1">${roleTag(l.role)}${it.kind === "activity" ? "" : `<a href="${page(l.at)}">${name(l.at)}</a>`}</div><p>${l.note}</p>${also(l)}
          ${it.kind === "function" && l.pair && l.stations.includes(id) ? paired(id, l) : it.kind === "function" ? `<details><summary>The function as written</summary><pre class="c-code"><code>${esc(nbs[it.notebook].functions[it.name].source)}</code></pre></details>` : ""}
          ${it.kind === "cell" ? `<details><summary>The experiment and what it printed</summary>${cell(it.notebook, it.id)}</details>` : ""}
          </div>`; }).join("")}
        ${a?.kind === "activity" ? labs(act) : ""}</div>`;
    }).join("");

    const practiceHtml = practice.map((l) => {
      const it = item(l.at);
      if (it.kind === "question") return `<div class="c-pr">${questionCard(l.at, { needs: false })}<p class="c-why">${roleTag(l.role)} ${l.note} ${also(l)}</p></div>`;
      const nb = nbs[it.notebook], q = (it.kind === "predict" ? nb.predicts : nb.questions).find((x) => x.id === it.id);
      const front = q.prompt ? `<div class="c-cell c-md">${q.prompt}</div>` : cell(it.notebook, q.cell);
      const back = q.said ? `<div class="c-cell c-md">${q.said}</div>` : q.answerCell ? cell(it.notebook, q.answerCell) : "<p>Not answered in the notebook.</p>";
      return `<div class="c-pr"><div class="c-q"><div class="c-q-head"><a href="${page(l.at)}"><b>${name(l.at)}</b></a>${tick(l.at)}</div>
        <div class="question c-flip" tabindex="0" role="button" aria-label="Show the answer as written">
          <div class="face q">${front}</div>
          <div class="face a"><span class="tag">${it.kind === "predict" ? "Your prediction in the notebook" : "Your answer in the notebook"}</span>${back}</div>
        </div></div><p class="c-why">${roleTag(l.role)} ${l.note} ${also(l)}</p></div>`;
    }).join("");
    const notesHtml = notes.map((n) => `<div class="c-note"><h3>${n.title}</h3>${n.html}${n.at.length ? `<p class="faint">About ${n.at.map((a) => `<a href="${page(a)}">${name(a)}</a>`).join(", ")}</p>` : ""}</div>`).join("");

    const sec = (cls, title, sub, body) => body ? `<section class="c-sec ${cls}"><h2>${title}<small>${sub}</small></h2>${body}</section>` : "";
    host.innerHTML = `<div class="c-tab">
      <p class="c-lead">Where ${esc(station(id).title)} comes up in <a href="#/c/">${esc(C.code)}, ${esc(C.title)}</a>. The atlas's own words stay the reference; the course's material sits beside them.</p>
      ${sec("c-in-lectures", "In lectures", `${lectures.length} ${lectures.length === 1 ? "place" : "places"}`, lectureHtml)}
      ${sec("c-in-book", "In the book", "sections and printed pages", bookHtml)}
      ${sec("c-in-homework", "In homework", "the functions you write and the experiments they run", homeworkHtml)}
      ${sec("c-practice", "Practice", "click a card to see its solution", practiceHtml ? `<div class="c-prs">${practiceHtml}</div>` : "")}
      ${sec("c-notes", "Course notes", "notation, assumptions, and where the course's version differs", notesHtml)}
    </div>`;
    RL.wire(host);
    wirePairs(host);
    return {};
  };

  // ---- a page per course item, for the way back ----
  const head = (eyebrow, title, sub = "", extra = "") => `<header class="hero"><a class="part-badge c-badge" href="#/c/"><i>${esc(C.code)}</i>${esc(C.title)}</a>
    <div class="eyebrow c-eyebrow">${eyebrow}</div><h1>${title}</h1>${sub ? `<p class="summary">${sub}</p>` : ""}${extra}</header>`;
  // the links of an item, as rows: role, stations, what the reader finds
  const linkRows = (ls) => ls.length ? `<ul class="c-links">${ls.map((l) => `<li>${roleTag(l.role)} ${l.stations.map((s) => chip(s)).join(" ")}<p>${l.note}</p></li>`).join("")}</ul>` : "";

  function home() {
    const count = (pred) => C.links.filter((l) => pred(item(l.at))).length;
    return `<article class="entry c-page">${head("A study companion", esc(C.code), `${esc(C.title)} · ${esc(C.school)}, ${esc(C.term)}. From a station's ${esc(C.code)} tab you reach the slides, homework, questions and book pages on its topic; from any of those, the stations that explain it.`)}
      <section class="c-sec"><h2>Lectures<small>${count((it) => it && /slide|lecture/.test(it.kind))} links to slides</small></h2>
        <ol class="c-index">${C.lectures.map((l) => `<li><a href="#/c/L${l.n}"><b>L${l.n}</b> ${esc(l.title)}</a><span class="faint">${C.links.filter((k) => lectureOf(item(k.at) || {}) === l.n).length} links</span></li>`).join("")}</ol></section>
      <section class="c-sec"><h2>Homework<small>problem sets and their notebooks</small></h2>
        <ul class="c-index">${C.notebooks.map((n) => `<li><a href="#/c/${n.id}"><b>PS${n.ps}</b> ${esc(n.title)}</a><span class="faint">${n.activities.length} activities</span></li>`).join("")}</ul></section>
      <section class="c-sec"><h2>Quizzes and recitation<small>${Object.keys(store.get("solved", {})).length} questions marked solved</small></h2>
        <ul class="c-index">${C.papers.map((p) => `<li><a href="#/c/${p.id}"><b>${esc(paperTitle(p.id))}</b> ${esc(p.title.split(" · ")[1] || "")}</a><span class="faint">${p.questions.filter((q) => solved(`${p.id}:${q}`)).length} of ${p.questions.length} solved</span></li>`).join("")}</ul></section>
      ${C.book ? `<section class="c-sec"><h2>The book<small>${esc(C.book.title)}</small></h2><p><a href="#/c/${C.book.id}">The sections the stations cite</a>, each opening the PDF at its page.</p></section>` : ""}
      <p class="faint">The map has the course's views too: open <a href="#/">the map</a> and its <b>Views &amp; filters</b>.</p></article>`;
  }

  function lecturePage(n, at) {
    const lec = C.lectures.find((l) => l.n === n);
    const linked = (s) => (linksAt.get(`L${n}:${s.n}`) || []).concat(C.links.filter((l) => { const m = l.at.match(/^L(\d+):(\d+)-(\d+)$/); return m && +m[1] === n && +m[2] <= s.n && s.n <= +m[3] && +m[2] !== s.n; }).map((l) => ({ ...l, cont: true })));
    const prev = C.lectures.find((l) => l.n === n - 1), next = C.lectures.find((l) => l.n === n + 1);
    const sts = [...new Set(C.links.filter((l) => lectureOf(item(l.at) || {}) === n).flatMap((l) => l.stations))];
    return `<article class="entry c-page">${head(`Lecture ${n} of ${C.lectures.length}`, esc(lec.title), "", `<p>${pdfLink(`L${n}`, "Open the lecture's PDF")}</p>
      ${sts.length ? `<p class="c-needs">Stations ${sts.map((s) => chip(s)).join(" ")}</p>` : ""}`)}
      <ol class="c-deck">${lec.slides.map((s) => { const ls = linked(s), it = items[`L${n}:${s.n}`]; return `<li class="c-dslide${ls.length ? " linked" : ""}" id="slide-${s.n}" data-slide="${s.n}">
        <div class="c-dnum">${s.n}</div>
        <div class="c-dbody"><div class="c-line1"><b>${esc(s.title || "(untitled)")}</b><a class="c-pdf" href="${esc(C.files.slides)}#page=${s.page}" target="_blank" rel="noopener">p. ${s.page} ↗</a></div>
        ${ls.length ? `${it?.pic ? pic(it.pic, s.title) : ""}${linkRows(ls.filter((l) => !l.cont))}${ls.some((l) => l.cont) ? `<p class="faint">Part of ${ls.filter((l) => l.cont).map((l) => `${name(l.at)}`).join(", ")}.</p>` : ""}` : ""}</div></li>`; }).join("")}</ol>
      <nav class="entry-nav">${prev ? `<a class="nb prev" href="#/c/L${prev.n}"><span class="faint">← Previous</span><b>L${prev.n} ${esc(prev.title)}</b></a>` : "<span></span>"}${next ? `<a class="nb next" href="#/c/L${next.n}"><span class="faint">Next →</span><b>L${next.n} ${esc(next.title)}</b></a>` : "<span></span>"}</nav></article>`;
  }

  function paperPage(id) {
    const p = papers[id];
    return `<article class="entry c-page">${head("Questions", esc(p.title), "Each card shows the question as printed; click it for the worked solution. Tick the ones you have solved: the assessment map keeps them.", `<p>${pdfLink(`${id}:${p.questions[0]}`, "Open the PDF")}</p>`)}
      <div class="c-prs">${p.questions.filter((q) => !(id === "Rec" && /^\d+$/.test(q))).map((q) => `<div class="c-pr">${questionCard(`${id}:${q}`)}</div>`).join("")}</div></article>`;
  }
  function questionPage(at) {
    const it = item(at), p = papers[it.paper], ls = linksAt.get(at) || [];
    const parts = it.paper === "Rec" && !it.part ? p.questions.filter((q) => q.startsWith(`${it.n}`) && q !== `${it.n}`) : [];
    const siblings = p.questions.filter((q) => !(it.paper === "Rec" && /^\d+$/.test(q)));
    const k = siblings.indexOf(it.id), prev = siblings[k - 1], next = siblings[k + 1];
    return `<article class="entry c-page">${head(`<a href="#/c/${p.id}">${esc(p.title)}</a>`, name(at), "", "")}
      ${parts.length ? `${pic(it.pic, name(at))}<div class="c-prs">${parts.map((q) => `<div class="c-pr">${questionCard(`${p.id}:${q}`)}</div>`).join("")}</div>`
        : `<div class="c-qpage">${questionCard(at, { needs: false })}</div>`}
      ${ls.length ? `<section class="c-sec"><h2>What it needs<small>the stations that explain it</small></h2>${linkRows(ls)}</section>` : ""}
      <nav class="entry-nav">${prev !== undefined ? `<a class="nb prev" href="#/c/${p.id}:${prev}"><span class="faint">← Previous</span><b>${name(`${p.id}:${prev}`)}</b></a>` : "<span></span>"}${next !== undefined ? `<a class="nb next" href="#/c/${p.id}:${next}"><span class="faint">Next →</span><b>${name(`${p.id}:${next}`)}</b></a>` : "<span></span>"}</nav></article>`;
  }

  function notebookPage(id) {
    const nb = nbs[id];
    const intro = nb.order.filter((c) => !nb.act[c]).slice(0, 3).map((c) => cell(id, c, { fold: true })).join("");
    return `<article class="entry c-page">${head(`Problem set ${nb.ps}`, esc(nb.title), "", `<p>${pdfLink(id, "The notebook")}</p>`)}
      <ol class="c-index">${nb.activities.map((a) => `<li><a href="#/c/${id}:${a.id}"><b>Activity ${a.n}</b> ${tex(a.title)}</a><span class="faint">${a.points ? `${a.points} pts · ` : ""}${[...new Set(C.links.filter((l) => l.at === `${id}:${a.id}`).flatMap((l) => l.stations))].map((s) => esc(station(s)?.title || s)).join(", ")}</span></li>`).join("")}</ol>
      <section class="c-sec"><h2>Setup<small>as the notebook opens</small></h2>${intro}</section></article>`;
  }
  function activityPage(at) {
    const it = item(at), nb = nbs[it.notebook], a = nb.activities.find((x) => x.id === it.id);
    const k = nb.activities.indexOf(a), prev = nb.activities[k - 1], next = nb.activities[k + 1];
    // every cell of the activity, in order, with the links that name it beside it
    const cellLinks = (cid) => C.links.filter((l) => { const t = item(l.at); return t && t.notebook === it.notebook && (t.id === cid && t.kind === "cell"
      || t.kind === "function" && nb.functions[t.name]?.cell === cid || (t.kind === "nb-question" || t.kind === "predict") && [...nb.questions, ...nb.predicts].find((q) => q.id === t.id)?.cell === cid); });
    const own = C.links.filter((l) => l.at === at);
    return `<article class="entry c-page">${head(`<a href="#/c/${nb.id}">PS${nb.ps} · ${esc(nb.title)}</a>`, `Activity ${a.n} · ${tex(a.title)}`, a.points ? `${a.points} points` : "", `${linkRows(own)}${labs(at)}`)}
      <div class="c-nb">${a.cells.map((cid) => { const ls = cellLinks(cid); return `<div class="c-nbrow${ls.length ? " linked" : ""}" id="cell-${cid}">${cell(nb.id, cid, { fold: true })}${ls.length ? `<aside class="c-aside">${linkRows(ls)}</aside>` : ""}</div>`; }).join("")}</div>
      <nav class="entry-nav">${prev ? `<a class="nb prev" href="#/c/${nb.id}:${prev.id}"><span class="faint">← Previous</span><b>Activity ${prev.n} · ${tex(prev.title)}</b></a>` : "<span></span>"}${next ? `<a class="nb next" href="#/c/${nb.id}:${next.id}"><span class="faint">Next →</span><b>Activity ${next.n} · ${tex(next.title)}</b></a>` : "<span></span>"}</nav></article>`;
  }
  function bookPage() {
    const secs = Object.entries(items).filter(([, it]) => it.kind === "section").sort(([, a], [, b]) => a.page - b.page);
    return `<article class="entry c-page">${head("The book", esc(C.book.title), "Every section a station cites, with the stations that cite it. Each opens the PDF at its page.")}
      <ul class="c-links">${secs.map(([at, it]) => `<li>${pdfLink(at, `§${esc(it.id)} ${esc(it.title)} · p. ${it.printed}`)} ${[...new Set((linksAt.get(at) || []).flatMap((l) => l.stations))].map((s) => chip(s)).join(" ")}</li>`).join("")}</ul></article>`;
  }

  RL.views.course = function (host, ref) {
    ref = decodeURIComponent(ref || "");
    let html, focus = null;
    const it = item(ref);
    if (!ref) html = home();
    else if (C.book && ref === C.book.id) html = bookPage();
    else if (papers[ref]) html = paperPage(ref);
    else if (!it) { location.replace("#/c/"); return {}; }
    else if (it.kind === "lecture") html = lecturePage(it.n);
    else if (it.kind === "slide" || it.kind === "slides") { html = lecturePage(it.lecture); focus = `#slide-${it.n}`; }
    else if (it.kind === "question") html = questionPage(ref);
    else if (it.kind === "notebook") html = notebookPage(ref);
    else if (it.kind === "activity") html = activityPage(ref);
    else if (it.kind === "section") { html = bookPage(); }
    else if (it.activity) {
      html = activityPage(`${it.notebook}:${it.activity}`);
      const nb = nbs[it.notebook];
      const cid = it.kind === "cell" ? it.id : it.kind === "function" ? nb.functions[it.name].cell : [...nb.questions, ...nb.predicts].find((q) => q.id === it.id)?.cell;
      focus = `#cell-${cid}`;
    } else html = notebookPage(it.notebook);
    host.innerHTML = html;
    RL.wire(host);
    wirePairs(host);
    if (focus) {
      const t = host.querySelector(focus);
      if (t) requestAnimationFrame(() => { t.scrollIntoView({ block: "center" }); t.classList.add("c-flash"); });
    }
    return {};
  };
  RL.courseTitle = (ref) => {
    ref = decodeURIComponent(ref || "");
    if (!ref) return C.code;
    if (papers[ref]) return papers[ref].title;
    if (C.book && ref === C.book.id) return "The book";
    return item(ref) ? plain(name(ref)) : C.code;
  };

  // ---- search: course items by their names ("L8 46", "Quiz 2 Q11", td_control) ----
  RL.courseSearch = function (words) {
    if (!words.length) return [];
    const hits = [];
    const add = (at, label, text) => { const t = `${text} ${at}`.toLowerCase().replace(/[:·]/g, " "); if (words.every((w) => t.includes(w.replace(/[:·]/g, " ").trim()) || t.includes(w))) hits.push({ at, label, href: page(at) }); };
    for (const l of C.lectures) {
      add(`L${l.n}`, `Lecture ${l.n} · ${l.title}`, `L${l.n} lecture ${l.n} ${l.title}`);
      for (const s of l.slides) add(`L${l.n}:${s.n}`, `L${l.n} · slide ${s.n} · ${s.title}`, `L${l.n} ${s.n} slide ${s.title}`);
    }
    for (const [at, it] of Object.entries(items)) {
      if (it.kind === "question") add(at, name(at).replace(/&amp;/g, "&"), `${it.paper} ${paperTitle(it.paper)} q${it.n}${it.part} q ${it.n} ${it.paper === "Rec" ? "recitation problem" : ""} ${it.text.slice(0, 200)}`);
      else if (it.kind === "activity") add(at, plain(name(at, true)), `${it.notebook} ps${nbs[it.notebook].ps} activity ${it.n} ${it.title}`);
      else if (it.kind === "function") add(at, `${it.name}() · ${nbs[it.notebook].title}`, `${it.name} ${it.notebook} function def`);
      else if (it.kind === "notebook") add(at, `PS${it.ps} · ${it.title}`, `${at} ps${it.ps} problem set ${it.title} notebook homework`);
    }
    for (const p of C.papers) add(p.id, p.title, `${p.id} ${p.title}`);
    // exact names first, then the slides that carry links
    const exact = (h) => words.join(" ").replace(/\s+/g, "").toLowerCase() === h.at.replace(/:/g, "").toLowerCase() ? 0 : 1;
    return hits.sort((a, b) => exact(a) - exact(b) || (linksAt.has(b.at) ? 1 : 0) - (linksAt.has(a.at) ? 1 : 0)).slice(0, 30);
  };

  // ---- the symbols page: the course's notation beside the atlas's ----
  RL.courseNotation = (tex) => C.notation.find((n) => n.atlas === tex);

  // ---- the map's course views ----
  const lens = (o) => (RL.mapLenses ||= []).push({ group: C.code, ...o });
  const T = (s) => esc(s);
  const node = (x, y, w, label, href, cls = "", title = "") => `<g class="c-node ${cls}" data-href="${href}" transform="translate(${x} ${y})" tabindex="0" role="link">
    ${title ? `<title>${esc(title)}</title>` : ""}<rect x="0" y="-12" width="${w}" height="24" rx="12"/><text x="${w / 2}" y="4.5" text-anchor="middle">${label}</text></g>`;
  const curve = (a, b, cls) => { const mx = (a.x + b.x) / 2; return `<path class="${cls}" d="M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}"/>`; };
  const lectureLinks = (sid) => (byStation.get(sid) || []).map((i) => C.links[i]).filter((l) => { const it = item(l.at); return it && /slide|lecture/.test(it.kind); });

  // The lecture roadmap: L1–L13 in course order, each station once, under the lecture that introduces it, with a faint
  // tie to every later lecture that comes back to it.
  lens({
    id: "c-lectures", tab: "c-lectures", name: "Lectures",
    caption: `${C.code}'s lectures in course order. Each station hangs under the lecture that introduces it; a faint tie joins it to the lectures that come back to it.`,
    layout() {
      const COL = 196, STEP = 27, X = 70, TOP = 110, GAP = 120, PER = 7;
      const home = new Map(), pos = new Map(), hubs = [];
      for (const s of RL.order) {
        const ls = lectureLinks(s.id);
        if (!ls.length) continue;
        const intro = ls.filter((l) => l.role === "introduces").map((l) => lectureOf(item(l.at)));
        home.set(s.id, Math.min(...(intro.length ? intro : ls.map((l) => lectureOf(item(l.at))))));
      }
      let y = TOP, bottom = 0;
      C.lectures.forEach((l, i) => {
        const col = i % PER;
        if (i && !col) y = bottom + GAP;
        const x = X + col * COL, here = RL.order.filter((s) => home.get(s.id) === l.n);
        hubs.push({ n: l.n, title: l.title, x, y });
        here.forEach((s, k) => pos.set(s.id, { x: x + 10, y: y + 40 + k * STEP }));
        bottom = Math.max(bottom, y + 40 + Math.max(0, here.length - 1) * STEP);
        l.count = here.length;
      });
      const ties = [];
      for (const [sid, n] of home) for (const m of new Set(lectureLinks(sid).map((l) => lectureOf(item(l.at))))) if (m !== n) ties.push({ sid, n: m });
      return { pos, hubs, ties, width: X + PER * COL + 40, height: bottom + 40 };
    },
    drawing(L) {
      let svg = "";
      const hub = new Map(L.hubs.map((h) => [h.n, h]));
      L.hubs.slice(0, -1).forEach((h, i) => { const n = L.hubs[i + 1]; svg += n.y === h.y ? `<line class="c-trunk" x1="${h.x}" y1="${h.y}" x2="${n.x}" y2="${n.y}"/>` : ""; });
      for (const t of L.ties) {
        const h = hub.get(t.n), p = L.pos.get(t.sid);
        svg += curve({ x: h.x + 14, y: h.y + 12 }, { x: p.x - 8, y: p.y }, "c-tie");
      }
      for (const h of L.hubs) {
        const words = h.title.split(" "), cut = h.title.length > 20 ? Math.ceil(words.length / 2) : words.length;
        const lines = [words.slice(0, cut).join(" "), words.slice(cut).join(" ")].filter(Boolean);
        svg += `<text class="c-hub-title" x="${h.x - 14}" y="${h.y - 22 - 15 * (lines.length - 1)}">${lines.map((t, i) => `<tspan x="${h.x - 14}"${i ? ' dy="15"' : ""}>${T(t)}</tspan>`).join("")}</text>`;
        svg += node(h.x - 16, h.y, 40, `L${h.n}`, `#/c/L${h.n}`, "c-hub", `Lecture ${h.n}: ${h.title}`);
        svg += `<line class="c-branch" x1="${h.x + 4}" y1="${h.y + 12}" x2="${h.x + 4}" y2="${L.pos.size ? h.y + 40 + Math.max(0, (C.lectures.find((l) => l.n === h.n).count || 1) - 1) * 27 : h.y}"/>`;
      }
      return svg;
    },
  });

  // The homework map: each problem set's notebooks, their activities, the functions they ask for and the stations behind
  // them, with the Lab presets that run the same experiment.
  function functionLines(fns) {
    const lines = [];
    for (const f of fns) {
      const w = `${f}()`;
      if (lines.length && (lines.at(-1) + ", " + w).length <= 34) lines[lines.length - 1] += `, ${w}`;
      else lines.push(w);
    }
    return lines;
  }
  lens({
    id: "c-homework", tab: "c-homework", name: "Homework",
    caption: "The problem sets: each activity, the functions it asks you to write, and the stations behind them. A ▸ Lab badge runs the same experiment in the Lab.",
    layout() {
      const COL = 300, X = 60, TOP = 70, STEP = 26;
      const pos = new Map(), rows = [], ties = [];
      let bottom = 0;
      C.notebooks.forEach((nb, ci) => {
        const x = X + ci * COL;
        let y = TOP;
        rows.push({ kind: "nb", x, y, nb });
        y += 40;
        for (const a of nb.activities) {
          const at = `${nb.id}:${a.id}`;
          const ls = C.links.filter((l) => { const it = item(l.at); return it && it.notebook === nb.id && (l.at === at || it.activity === a.id); });
          const fns = Object.entries(nb.functions).filter(([, f]) => f.activity === a.id).map(([n]) => n);
          const lab = (C.experiments || []).find((x) => x.at === at)?.lab;
          rows.push({ kind: "act", x, y, at, a, lab });
          y += 26;
          if (fns.length) { rows.push({ kind: "fns", x, y, nb: nb.id, fns }); y += 18 * functionLines(fns).length + 4; }
          for (const sid of RL.order.map((s) => s.id).filter((s) => ls.some((l) => l.stations.includes(s)))) {
            if (pos.has(sid)) ties.push({ from: { x: x + 4, y: y - 6 }, sid });
            else { pos.set(sid, { x: x + 14, y }); y += STEP; }
          }
          y += 16;
        }
        bottom = Math.max(bottom, y);
      });
      return { pos, rows, ties, width: X + C.notebooks.length * COL, height: bottom + 20 };
    },
    drawing(L) {
      let svg = "";
      for (const t of L.ties) { const p = L.pos.get(t.sid); svg += curve(t.from, { x: p.x - 8, y: p.y }, "c-tie"); }
      for (const r of L.rows) {
        if (r.kind === "nb") svg += node(r.x - 6, r.y, 250, `PS${r.nb.ps} · ${T(r.nb.title)}`, `#/c/${r.nb.id}`, "c-hub");
        else if (r.kind === "act") {
          const full = `A${r.a.n} ${plain(r.a.title)}`, label = full.slice(0, 34);
          svg += `<g class="c-act-row" data-href="#/c/${r.at}" transform="translate(${r.x} ${r.y})" tabindex="0" role="link"><title>Activity ${r.a.n}: ${esc(plain(r.a.title))}</title><text class="c-act-label">${T(label)}${label.length < full.length ? "…" : ""}</text></g>`;
          if (r.lab) svg += node(r.x + 222, r.y - 4, 52, "▸ Lab", `#/lab/${r.lab}`, "c-lab", "The same experiment in the Lab");
        } else if (r.kind === "fns") {
          const lines = functionLines(r.fns);
          svg += `<text class="c-fns" x="${r.x + 6}" y="${r.y}">${lines.map((t, i) => `<tspan x="${r.x + 6}"${i ? ' dy="18"' : ""}>${T(t)}</tspan>`).join("")}</text>`;
        }
      }
      return svg;
    },
  });

  // The assessment map: the questions of each quiz and the recitation, tied to the stations they need; solved ones ticked.
  lens({
    id: "c-quizzes", tab: "c-quizzes", name: "Quizzes",
    caption: "The quizzes' and the recitation's questions, each tied to the stations it needs. Tick a question on its page and it is ticked here.",
    layout() {
      const X = 60, TOP = 60, ROW = 26, SX = 560;
      const qs = [], pos = new Map();
      let y = TOP;
      for (const p of C.papers) {
        qs.push({ head: p.title, y });
        y += 34;
        for (const q of p.questions) {
          const at = `${p.id}:${q}`, needs = [...new Set((linksAt.get(at) || []).flatMap((l) => l.stations))];
          if (!needs.length && p.id === "Rec" && /^\d+$/.test(q)) continue;
          qs.push({ at, y, needs });
          y += ROW;
        }
        y += 18;
      }
      // each station at the mean height of its questions, then spread so no two overlap
      const want = new Map();
      for (const q of qs) for (const s of q.needs || []) { if (!want.has(s)) want.set(s, []); want.get(s).push(q.y); }
      const order = [...want].map(([s, ys]) => [s, ys.reduce((a, b) => a + b, 0) / ys.length]).sort((a, b) => a[1] - b[1]);
      let last = -1e9;
      for (const [s, wy] of order) { const yy = Math.max(wy, last + 27); pos.set(s, { x: SX, y: yy }); last = yy; }
      return { pos, qs, X, width: SX + 260, height: Math.max(y, last + 40) };
    },
    drawing(L) {
      let svg = "";
      for (const q of L.qs) if (q.at) for (const s of q.needs) { const p = L.pos.get(s); svg += curve({ x: L.X + 236, y: q.y }, { x: p.x - 8, y: p.y }, "c-edge"); }
      for (const q of L.qs) {
        if (q.head) { svg += `<text class="c-hub-title" x="${L.X}" y="${q.y}">${T(q.head)}</text>`; continue; }
        const it = item(q.at), label = it.paper === "Rec" ? `Problem ${it.n}${it.part ? `(${it.part})` : ""}` : `Q${it.n}`;
        const text = (it.text || "").replace(/^\(?[a-z0-9]+[.)]\s*/i, "").slice(0, 26);
        svg += `<g class="c-qnode${solved(q.at) ? " solved" : ""}" data-href="#/c/${q.at}" transform="translate(${L.X} ${q.y})" tabindex="0" role="link"><title>${esc(it.text?.slice(0, 300) || "")}</title>
          <rect x="0" y="-11" width="236" height="22" rx="11"/><text x="12" y="4.5"><tspan class="c-qn">${T(label)}</tspan> ${T(text)}…</text>${solved(q.at) ? `<text class="c-check" x="222" y="5" text-anchor="middle">✓</text>` : ""}</g>`;
      }
      return svg;
    },
  });

  // Comparison maps: methods side by side on their backup diagrams, with the course items that compare them.
  const backupOf = (sid) => (entry(sid)?.card || []).map((s) => s.html.match(/data-demo="backup" data-arg="([\w-]+)"/)?.[1]).find(Boolean);
  function backupSvg(id) {
    const d = document.createElement("div");
    RL.demos.backup(d, id);
    const svg = d.querySelector("svg");
    if (!svg) return null;
    svg.classList.add("on");
    const [, , w, hgt] = svg.getAttribute("viewBox").split(" ").map(Number);
    return { svg, w, h: hgt };
  }
  for (const m of C.maps.compare) {
    lens({
      id: `c-compare-${m.id}`, tab: "c-compare", name: "Compare", variant: m.title,
      caption: m.caption || `${m.stations.map((s) => station(s).title).join(", ")}, side by side.`,
      layout() {
        const COL = 290, X = 70, Y = 70;
        const pos = new Map(m.stations.map((s, i) => [s, { x: X + i * COL, y: Y }]));
        const cmp = C.links.filter((l) => l.role === "compares" && l.stations.filter((s) => m.stations.includes(s)).length >= 2);
        return { pos, cmp, X, Y, COL, width: X + m.stations.length * COL, height: Y + 420 + 30 * Math.min(cmp.length, 12) };
      },
      drawing(L) {
        let svg = "";
        m.stations.forEach((sid, i) => {
          const x = L.X + i * L.COL - 20, b = backupOf(sid) && backupSvg(backupOf(sid));
          if (b) { b.svg.setAttribute("x", x); b.svg.setAttribute("y", L.Y + 26); b.svg.setAttribute("width", Math.min(250, b.w)); b.svg.setAttribute("height", Math.min(250, b.w) * b.h / b.w); svg += b.svg.outerHTML; }
          const target = m.targets?.[sid];
          if (target) svg += `<text class="c-target" x="${x + 10}" y="${L.Y + 300}">${T(target)}</text>`;
          if (m.notes?.[sid]) svg += `<text class="c-target-note" x="${x + 10}" y="${L.Y + 322}">${T(m.notes[sid])}</text>`;
        });
        const top = L.Y + 360;
        svg += `<text class="c-hub-title" x="${L.X - 20}" y="${top}">Where the course compares them</text>`;
        L.cmp.slice(0, 12).forEach((l, k) => {
          const y = top + 30 + k * 30, label = plain(name(l.at));
          svg += node(L.X - 20, y, 190, T(label.length > 26 ? label.slice(0, 25) + "…" : label), page(l.at), "c-item", `${label}: ${plain(l.note)}`);
          svg += `<text class="c-cmp-note" x="${L.X + 182}" y="${y + 4.5}">${T(plain(l.note).slice(0, 110))}</text>`;
        });
        return svg;
      },
    });
  }

  // Derivation maps: chains of the Textbooks' numbered statements, each step opening its statement in the Textbook.
  function statement(sid, label) {
    const tb = entry(sid)?.textbook;
    if (!tb || !label) return "";
    const d = document.createElement("div");
    d.innerHTML = tb.sections.map((s) => `<div data-anchor="${s.id}" data-sec="${s.n}">${s.title}</div>${s.html}`).join("");
    const t = d.querySelector(`[data-anchor="${label}"]`);
    if (!t) return "";
    if (t.dataset.sec) return `§${t.dataset.sec}`;
    return t.querySelector(".tb-lead b")?.textContent || t.querySelector("figcaption b")?.textContent || "";
  }
  for (const m of C.maps.derive) {
    lens({
      id: `c-derive-${m.id}`, tab: "c-derive", name: "Derive", variant: m.title,
      caption: m.caption || "A chain of results, each building on the one before. Click a step to read it in its Textbook.",
      layout() {
        const W = 250, H = 92, GX = 50, GY = 70, PER = 4, X = 50, Y = 60;
        const boxes = m.steps.map((s, i) => ({ ...s, x: X + (i % PER) * (W + GX), y: Y + Math.floor(i / PER) * (H + GY), w: W, h: H }));
        return { pos: new Map(), boxes, width: X + Math.min(PER, m.steps.length) * (W + GX), height: Y + Math.ceil(m.steps.length / PER) * (H + GY) };
      },
      drawing(L) {
        let svg = "";
        L.boxes.slice(0, -1).forEach((b, i) => {
          const n = L.boxes[i + 1];
          svg += n.y === b.y ? `<path class="c-arrow" d="M${b.x + b.w + 4} ${b.y + b.h / 2} H${n.x - 8}"/>`
            : `<path class="c-arrow" d="M${b.x + b.w / 2} ${b.y + b.h + 4} V${b.y + b.h + 30} H${n.x + n.w / 2} V${n.y - 8}"/>`;
        });
        for (const b of L.boxes) {
          const st = station(b.station), lead = statement(b.station, b.label);
          const words = (b.text || "").split(" "), lines = [];
          for (const w of words) { if (lines.length && (lines.at(-1) + " " + w).length <= 36) lines[lines.length - 1] += ` ${w}`; else lines.push(w); }
          svg += `<g class="c-step" data-href="#/e/${b.station}/textbook"${b.label ? ` data-anchor="${b.label}"` : ""} data-term="${b.station}" transform="translate(${b.x} ${b.y})" style="--c:${lineColor(st.line)}" tabindex="0" role="link">
            <rect width="${b.w}" height="${b.h}" rx="12"/><rect class="c-step-bar" width="6" height="${b.h}" rx="3"/>
            <text class="c-step-st" x="16" y="20">${T(st.short || st.title)}${lead ? ` · ${T(lead)}` : ""}</text>
            <text class="c-step-text" x="16" y="42">${lines.slice(0, 3).map((t, i) => `<tspan x="16"${i ? ' dy="16"' : ""}>${T(t)}</tspan>`).join("")}</text>
            ${(b.at || []).length ? `<text class="c-step-at" x="16" y="${b.h + 16}">${T(b.at.map((a) => plain(name(a))).join(" · "))}</text>` : ""}</g>`;
        }
        return svg;
      },
    });
  }

  // A step of a derivation map opens its Textbook at the statement it names.
  addEventListener("hashchange", () => {
    const label = RL.pendingAnchor;
    if (!label) return;
    RL.pendingAnchor = null;
    let tries = 0;
    const look = () => {
      const t = document.querySelector(`.mode-textbook [data-anchor="${label}"]`);
      if (t) { t.scrollIntoView({ block: "center" }); t.classList.add("flash"); }
      else if (tries++ < 40) setTimeout(look, 50);
    };
    setTimeout(look, 50);
  });
})(globalThis.RL = globalThis.RL || {});
