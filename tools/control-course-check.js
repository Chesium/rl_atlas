// Installed-browser check of the private ESE6180 companion. Evidence stays ignored.
// node tools/control-course-check.js [chrome|edge]
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright-core');
const browser = process.argv[2] || 'chrome';
const file = path.resolve('course/ese6180/rl_atlas-ese6180.html');
const out = path.resolve(`browser-check-results/m15-${browser}`);
fs.mkdirSync(out, { recursive: true });

(async () => {
  const b = await chromium.launch({ channel: browser === 'edge' ? 'msedge' : browser, headless: true });
  try {
    const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [], external = [], pdfs = [];
    p.on('pageerror', e => errors.push(e.message));
    p.on('request', r => { if (/^https?:/.test(r.url())) external.push(r.url()); });
    const url = pathToFileURL(file).href;
    await p.goto(url + '#/c/');
    await p.waitForSelector('.c-page');
    const go = async hash => { await p.evaluate(h => { location.hash = h; }, hash); await p.waitForTimeout(70); };
    const shot = async name => p.screenshot({ path: path.join(out, name + '.png') });
    const overflow = async () => assert.equal(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, 'page exceeds viewport');
    assert.equal(await p.locator('.c-index li').count(), 11);
    await shot('home');
    await p.getByRole('link', { name: 'Follow the course order →' }).click();
    await p.waitForSelector('.c-bridge');
    assert.equal(await p.locator('.c-bridge > div > section').count(), 5);
    assert.ok(await p.locator('.c-dictionary .katex').count() >= 8);
    assert.equal(await p.locator('.katex-error').count(), 0);
    await shot('bridge-light');
    const counts = await p.evaluate(() => ({
      documents: RL.course.documents.length,
      links: RL.course.links.length,
      anchors: Object.entries(RL.course.items).filter(([, it]) => it.kind === 'source-anchor').map(([at, it]) => ({ at, id: it.id, review: it.review })),
    }));
    for (const anchor of counts.anchors) {
      await go('#/c/' + anchor.at);
      const row = p.locator(`[id="source-${anchor.id}"]`);
      await row.waitFor();
      assert.ok((await row.getAttribute('class')).includes('c-flash'), `${anchor.at} focuses its row`);
      if (anchor.review === 'pending') assert.ok(await row.locator('.c-pending').count());
      await overflow();
    }
    await go('#/c/N7:theorem-7.34');
    assert.match(await p.locator('.c-flash').innerText(), /TO BE CHECKED 7\.1/);
    await shot('pending-appendix');
    await go('#/e/models/course');
    assert.match(await p.locator('.c-in-sources').innerText(), /Chapter 4/);
    await p.locator('.c-in-sources a[href="#/c/N4:4.1"]').first().click();
    await p.waitForSelector('.c-flash');
    assert.match(await p.locator('.c-flash').innerText(), /System Identification/);
    await shot('chapter-4');
    for (const [at, suffix] of [['Khalil:4.1', 'khalil.pdf#page=128'], ['Boffi:theorem-4.2', 'boffi-v2.pdf#page=7'], ['N7:7.6', 'chapter-7.pdf#page=18']]) {
      await go('#/c/' + at);
      const link = p.locator('.c-flash .c-pdf').first();
      assert.ok((await link.getAttribute('href')).endsWith(suffix));
      const [popup] = await Promise.all([p.waitForEvent('popup'), link.click()]);
      await popup.waitForLoadState('domcontentloaded');
      assert.ok(popup.url().endsWith(suffix), popup.url());
      pdfs.push(popup.url());
      await popup.close();
    }
    const found = await p.evaluate(() => RL.courseSearch(['n7:theorem-7.34']));
    assert.ok(found.some(h => h.at === 'N7:theorem-7.34'));
    await go('#/c/bridge');
    await p.locator('[data-course-route="lyapunov-functions"]').first().click();
    await p.waitForSelector('.route-destination', { state: 'attached' });
    assert.equal(await p.locator('.route-destination').inputValue(), 'lyapunov-functions');
    assert.ok(await p.locator('.route-edge').count());
    await shot('prerequisite-route');
    await p.locator('.panel-toggle').click();
    await p.locator('[data-lens="c-bridge"]').click();
    assert.equal(await p.locator('[data-deco="c-bridge"] .c-hub').count(), 6);
    await shot('course-map');
    await go('#/e/boffi-thm-4-2/card');
    await p.locator('[data-proof]').check();
    await p.reload();
    await p.waitForSelector('[data-proof]');
    assert.ok(await p.locator('[data-proof]').isChecked());
    await p.locator('.modes [data-mode="course"]').click();
    assert.match(await p.locator('.c-provenance').first().innerText(), /located/);
    for (const theme of ['light', 'dark']) for (const width of [1440, 390]) {
      await p.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await p.evaluate(t => { document.documentElement.dataset.theme = t; }, theme);
      for (const [hash, name] of [['#/c/bridge', 'bridge'], ['#/c/N7:theorem-7.34', 'pending'], ['#/e/contraction-metrics/course', 'station']]) {
        await go(hash); await overflow();
        assert.equal(await p.locator('.katex-error').count(), 0);
        await shot(`${name}-${theme}-${width}`);
      }
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    const report = { browser, version: b.version(), documents: counts.documents, anchors: counts.anchors.length,
      links: counts.links, errors, external, pdfs, screenshots: fs.readdirSync(out).filter(f => f.endsWith('.png')) };
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
