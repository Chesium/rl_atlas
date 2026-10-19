// Optional installed-browser check of a private pack; writes screenshots beside its report, never course data to git.
// npm install --no-save playwright-core
// node tools/course-check.js --browser chrome [--file course/ese3990/rl_atlas-ese3990.html]
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright-core');
const arg = (key, value) => process.argv.includes(`--${key}`) ? process.argv[process.argv.indexOf(`--${key}`) + 1] : value;
const browser = arg('browser', 'chrome');
const pilot = process.argv.includes('--pilot');
const file = path.resolve(arg('file', 'course/ese3990/rl_atlas-ese3990.html'));
const out = path.resolve(arg('out', `browser-check-results/course-${browser}`));
fs.mkdirSync(out, { recursive: true });
const url = pathToFileURL(file).href;
(async () => {
  const b = await chromium.launch({ headless: true, ...(arg('exe') ? { executablePath: arg('exe') } : { channel: browser === 'edge' ? 'msedge' : browser }) });
  try {
    const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [], external = [], shots = [], pdfs = [];
    p.on('pageerror', e => errors.push(e.message));
    p.on('request', r => { if (/^https?:/.test(r.url())) external.push(r.url()); });
    await p.goto(url + '#/c/');
    await p.waitForSelector('.c-page');
    const go = async hash => { await p.evaluate(h => { location.hash = h; }, hash); await p.waitForTimeout(120); };
    const shot = async name => { await p.waitForTimeout(250); await p.screenshot({ path: path.join(out, `${name}.png`) }); shots.push(name); };
    // Station -> exact course item, and the paired target lines in both directions.
    await go('#/e/sarsa/course');
    assert.ok(await p.locator('.c-in-lectures .c-slide').count());
    assert.ok(await p.locator('.c-in-book .c-pdf').count());
    const pair = p.locator('.c-pair').first();
    const pairedCode = pair.locator('.c-code > code.language-python');
    assert.ok(await pairedCode.locator('.token.keyword').count());
    assert.ok(await pairedCode.locator('.c-line[data-mate] .token').count());
    assert.ok(await p.evaluate(() => {
      const link = RL.course.links.find(l => l.stations.includes('sarsa') && l.pair);
      const it = RL.course.items[link.at];
      const nb = RL.course.notebooks.find(n => n.id === it.notebook);
      const expected = nb.functions[it.name].source.split('\n').map(l => l || ' ').join('\n');
      return document.querySelector('.c-pair .c-code code').textContent === expected;
    }), 'highlighting preserves the paired function text and indentation');
    await pair.locator('[data-mate]').first().hover();
    assert.ok(await pair.locator('[data-line].c-hot').count());
    await pair.locator('[data-line].c-hot').first().hover();
    assert.ok(await pair.locator('[data-mate].c-hot').count());
    await shot('pilot-station');
    // From file://, actually open both a lecture and a textbook PDF at the requested fragment.
    for (const selector of ['.c-in-lectures .c-pdf', '.c-in-book .c-pdf']) {
      const a = p.locator(selector).first(), href = await a.getAttribute('href');
      const popup = p.waitForEvent('popup');
      await a.click();
      const tab = await popup;
      await tab.waitForLoadState('load');
      assert.equal(decodeURI(tab.url()), decodeURI(new URL(href, url).href));
      assert.match(tab.url(), /#page=\d+$/);
      pdfs.push(tab.url().split('/').at(-1));
      await tab.close();
    }
    await go('#/c/Quiz2:11');
    const card = p.locator('.c-flip').first();
    assert.equal(await card.evaluate(e => e.classList.contains('flipped')), false);
    await card.click();
    assert.equal(await card.evaluate(e => e.classList.contains('flipped')), true);
    await p.locator('[data-solved="Quiz2:11"]').check();
    await p.reload();
    await p.waitForSelector('[data-solved="Quiz2:11"]:checked');
    await shot('question-solution');
    await p.locator('.c-links a[href="#/e/q-learning/course"]').first().click();
    await p.waitForSelector('.c-tab');
    // All registered course views, including every comparison and derivation variant.
    const lenses = await p.evaluate(() => RL.mapLenses.map(l => l.id));
    for (const lens of lenses) {
      await p.evaluate(id => RL.store.set('lens', id), lens);
      await go('#/');
      await p.waitForSelector(`svg[data-lens="${lens}"]`);
      await shot(lens);
      await go('#/c/');
    }
    // Every linked item and every station tab must render without exceptions or wide page overflow.
    const routes = pilot ? [] : await p.evaluate(() => [...new Set(RL.course.links.map(l => `#/c/${l.at}`)), ...new Set(RL.course.links.flatMap(l => l.stations).map(s => `#/e/${s}/course`))]);
    for (const hash of routes) {
      await go(hash);
      assert.ok(await p.locator('.c-page, .c-tab').count(), hash);
      assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `wide page ${hash}`);
    }
    for (const text of ['L8 46', 'Quiz 2 Q11', 'td_control']) {
      assert.ok(await p.evaluate(text => RL.courseSearch(text.toLowerCase().split(/\s+/)).length, text), `search ${text}`);
    }
    await p.keyboard.press('Control+k');
    await p.getByRole('searchbox').fill('Quiz 2 Q11');
    await p.locator('.palette li.course').first().click();
    await p.waitForSelector('[data-solved="Quiz2:11"]');
    await p.evaluate(() => RL.store.set('lens', 'c-lectures'));
    await go('#/');
    await p.locator('.panel-toggle').click();
    await p.getByRole('tab', { name: 'Compare', exact: true }).click();
    await p.waitForSelector('svg[data-lens^="c-compare-"]');
    await p.getByRole('tab', { name: 'Lectures', exact: true }).click();
    await p.waitForSelector('svg[data-lens="c-lectures"]');
    await p.getByRole('tab', { name: 'Derive', exact: true }).click();
    await p.locator('.mp-close').click();
    const step = p.locator('.deco.on .c-step').first();
    const label = await step.getAttribute('data-anchor');
    await step.focus();
    await p.keyboard.press('Enter');
    await p.waitForSelector(`.mode-textbook [data-anchor="${label}"].flash`);
    // Fresh-run and bench construction on the course's custom grids and slippery cliff.
    for (const id of await p.evaluate(() => Object.keys(RL.course.presets))) {
      await go(`#/lab/${id}`);
      await p.waitForSelector('.lab');
      if (id === 'ese3990-slippery-cliff') await p.waitForFunction(() => [...document.querySelectorAll('.odds-badge')].every(e => !e.hidden && /\/20\b/.test(e.textContent)), null, { timeout: 60000 });
      await shot(id);
    }
    for (const theme of ['light', 'dark']) {
      await p.evaluate(t => { document.documentElement.dataset.theme = t; }, theme);
      for (const width of [1440, 390]) {
        await p.setViewportSize({ width, height: 1000 });
        await go('#/e/sarsa/course');
        assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${theme} ${width}`);
        await shot(`station-${theme}-${width}`);
      }
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify({ browser, pilot, routes: routes.length, lenses, pdfs, shots, errors, external }, null, 2));
    console.log(`${browser}: ${pilot ? 'pilot flow' : `${routes.length} routes`}, ${lenses.length} map views, PDF page links, paired code, hidden solutions, saved progress, search, labs and responsive themes passed`);
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
