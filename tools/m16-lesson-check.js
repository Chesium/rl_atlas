// M16 rollout: inspect every Part 15/16 view in both themes and viewport sizes.
// Use --quick for the pre-review DOM/overflow gate (no screenshots).
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright-core');
const channel = process.argv[2] || 'chrome';
const quick = process.argv.includes('--quick');
const out = path.resolve(`browser-check-results/m16-phase2-3-${channel}${quick ? '-quick' : ''}`);
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
    const ids = await page.evaluate(() => RL.content.parts.filter(p => p.n === 15 || p.n === 16).flatMap(p => p.stations.map(s => s.id)));
    for (const folder of ['15-dynamics', '16-contraction']) {
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
            const state = await page.evaluate(() => {
              const host = document.querySelector('.mode-body');
              const badMath = [...host.querySelectorAll('.tex')].filter(e => {
                const box = e.getBoundingClientRect();
                return box.width > 0 && (e.classList.contains('tex-display') ? e.scrollWidth > e.clientWidth + 2 : box.right > innerWidth - 5);
              }).map(e => e.dataset.src);
              const refs = [...host.querySelectorAll('a.ref')].filter(a => !host.querySelector(`[data-anchor="${a.dataset.ref}"]`)).map(a => a.dataset.ref);
              const terms = [...host.querySelectorAll('a.term')].filter(a => !RL.entry(a.dataset.term)).map(a => a.dataset.term);
              return {mathErrors: host.querySelectorAll('.katex-error').length, pageOverflow: document.documentElement.scrollWidth > innerWidth + 1,
                badMath, refs, terms, unresolvedText: /\?\?/.test(host.textContent), questions: host.querySelectorAll('.question').length,
                background: getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()};
            });
            const name = `${id}-${mode}-${theme}-${width}`;
            report.views.push({id, mode, theme, width, ...state});
            if (state.mathErrors || state.pageOverflow || state.badMath.length || state.refs.length || state.terms.length || state.unresolvedText) {
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
