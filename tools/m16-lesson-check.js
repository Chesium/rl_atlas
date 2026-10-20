// M16 rollout: inspect every view of the selected parts in both themes and viewport sizes.
// Use --quick for the pre-review DOM/overflow gate (no screenshots).
// Use --parts=17 (comma-separated) to choose parts; the default is 15,16.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright-core');
const channel = process.argv[2] || 'chrome';
const quick = process.argv.includes('--quick');
const parts = (process.argv.find(a => a.startsWith('--parts='))?.slice(8) || '15,16').split(',').map(Number);
const folders = {15: '15-dynamics', 16: '16-contraction', 17: '17-learning-theory', 18: '18-certificates'};
const label = parts.join('-') === '15-16' ? 'phase2-3' : `parts-${parts.join('-')}`;
const out = path.resolve(`browser-check-results/m16-${label}-${channel}${quick ? '-quick' : ''}`);
fs.mkdirSync(out, {recursive: true});

(async () => {
  const browser = await chromium.launch({channel: channel === 'edge' ? 'msedge' : channel, headless: true});
  const report = {browser: channel, version: browser.version(), quick, errors: [], external: [], views: [], hashes: {}};
  try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce'});
    page.on('pageerror', e => report.errors.push(e.message));
    page.on('request', r => {if (/^https?:/.test(r.url())) report.external.push(r.url());});
    await page.goto(pathToFileURL(path.resolve('rl_atlas.html')).href);
    await page.waitForSelector('.metro');
    const ids = await page.evaluate(parts => RL.content.parts.filter(p => parts.includes(p.n)).flatMap(p => p.stations.map(s => s.id)), parts);
    for (const folder of parts.map(n => folders[n])) {
      for (const file of fs.readdirSync(`content/${folder}`).filter(f => f.endsWith('.md'))) {
        const name = `content/${folder}/${file}`;
        report.hashes[name] = crypto.createHash('sha256').update(fs.readFileSync(name)).digest('hex');
      }
    }
    for (const width of quick ? [390] : [1440, 390]) {
      await page.setViewportSize({width, height: width === 390 ? 844 : 1000});
      for (const theme of quick ? ['light'] : ['light', 'dark']) {
        await page.evaluate(t => document.documentElement.dataset.theme = t, theme);
        for (const id of ids) {
          await page.evaluate(id => location.hash = `#/e/${id}/textbook`, id);
          await page.waitForFunction(id => document.querySelector('.entry .hero h1')?.textContent === RL.station(id).title, id);
          await page.locator('[data-mode="textbook"]').first().waitFor();
          const hasStory = await page.locator('[data-mode="story"]').count();
          for (const mode of quick ? ['textbook', 'card'] : ['textbook', 'card', ...(hasStory ? ['story'] : [])]) {
            await page.locator(`[data-mode="${mode}"]`).first().click();
            if (mode === 'textbook') await page.locator('.tb-paper').waitFor();
            if (mode === 'story') await page.waitForSelector('.flow-plane');
            // Expose answers too: hidden solution math must meet the same layout gate.
            await page.locator('.mode-body .question:not(.flipped)').evaluateAll(nodes => nodes.forEach(n => n.click()));
            // Measure only after the math fonts load; fallback glyphs are wider and flag false overflow.
            // A face starts loading only when a glyph first needs it, so ready can resolve early.
            await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
            await page.waitForFunction(() => document.fonts.status === 'loaded');
            await page.evaluate(() => document.fonts.ready);
            // Then wait until display widths stop changing (at most 2 s): early layout can still reflow.
            await page.evaluate(async () => {
              const widths = () => [...document.querySelectorAll('.mode-body .tex-display')].map(e => e.scrollWidth).join();
              for (let last = widths(), i = 0; i < 20; i++) {
                await new Promise(r => setTimeout(r, 100));
                const now = widths();
                if (now === last) break;
                last = now;
              }
            });
            const state = await page.evaluate(() => {
              const host = document.querySelector('.mode-body');
              const badMath = [...host.querySelectorAll('.tex')].filter(e => {
                const box = e.getBoundingClientRect();
                return box.width > 0 && (e.classList.contains('tex-display') ? e.scrollWidth > e.clientWidth + 2 : box.right > innerWidth - 5);
              }).map(e => e.dataset.src);
              const refs = [...host.querySelectorAll('a.ref')].filter(a => !host.querySelector(`[data-anchor="${a.dataset.ref}"]`)).map(a => a.dataset.ref);
              const terms = [...host.querySelectorAll('a.term')].filter(a => !RL.entry(a.dataset.term)).map(a => a.dataset.term);
              // With throwOnError false, KaTeX also prints an unknown command as red literal text.
              const unknown = [...host.querySelectorAll('.katex [style*="#cc0000"]')].map(e => e.textContent);
              return {mathErrors: host.querySelectorAll('.katex-error').length + unknown.length, unknown, pageOverflow: document.documentElement.scrollWidth > innerWidth + 1,
                badMath, refs, terms, unresolvedText: /\?\?/.test(host.textContent),
                doubled: (host.textContent.match(/\b(Lemma|Theorem|Example|Definition|Figure|Algorithm)\s+\1\s+\d/g) || []),
                // A list the renderer could not parse (e.g. display math inside an item) shows literal markers.
                rawList: [...host.querySelectorAll('p')].filter(p => (p.firstChild?.nodeType === 3 && /^\s*(?:[-*]|\d+\.)\s/.test(p.firstChild.textContent)) || /\s-\s\*\*/.test(p.innerHTML)).map(p => p.textContent.slice(0, 60)),
                questions: host.querySelectorAll('.question').length,
                background: getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()};
            });
            const name = `${id}-${mode}-${theme}-${width}`;
            report.views.push({id, mode, theme, width, ...state});
            if (state.mathErrors || state.pageOverflow || state.badMath.length || state.refs.length || state.terms.length || state.unresolvedText || state.doubled.length || state.rawList.length) {
              report.errors.push({view: name, ...state});
            }
            if (!quick) {
              await page.evaluate(() => scrollTo(0, 0));
              await page.screenshot({path: path.join(out, `${name}.png`), fullPage: true});
              if (mode === 'textbook') {
                await page.screenshot({path: path.join(out, `${name}-opening.png`)});
                await page.evaluate(() => {
                  const blocks = [...document.querySelectorAll('.tb-paper .tex-display')];
                  const formulaWidth = e => Math.max(0, ...[...e.querySelectorAll('.base')].map(n => n.getBoundingClientRect().width));
                  const widest = blocks.sort((a, b) => formulaWidth(b) - formulaWidth(a))[0];
                  (widest || document.querySelector('.tb-paper')).scrollIntoView({block: 'center'});
                });
                await page.screenshot({path: path.join(out, `${name}-calculation.png`)});
              }
            }
          }
        }
      }
    }
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({browser: channel, version: report.version, views: report.views.length, errors: report.errors, external: report.external, out}, null, 2));
    if (report.errors.length || report.external.length) process.exitCode = 1;
  } finally {
    await browser.close();
  }
})().catch(e => {console.error(e); process.exitCode = 1;});
