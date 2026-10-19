// Focused M13/M14 offline browser regression. Requires an installed Chrome or Edge.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright-core');
const browser=process.argv[2]||'chrome',out=path.resolve(`browser-check-results/m13-m14-${browser}`);fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({channel:browser==='edge'?'msedge':browser,headless:true});
try{
 const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[],external=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
 const url=pathToFileURL(path.resolve('rl_atlas.html')).href;
 await p.goto(url);await p.waitForSelector('.metro');
 const go=async hash=>{await p.evaluate(h=>location.hash=h,hash);await p.waitForTimeout(50);};
 const shot=async name=>{await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:path.join(out,name+'.png'),fullPage:true});};
 const overflow=async()=>assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'page wider than viewport');
 await p.locator('.panel-toggle').click();await p.locator('[data-lens="route"]').click();await p.locator('.route-destination').selectOption('boffi-thm-4-2');
 assert.ok((await p.locator('.st[data-id="dynamical-systems"] .dot').boundingBox()).x>320,'route camera clears the panel');assert.ok(await p.locator('.route-edge[marker-end]').count());
 const count=await p.locator('.st:not(.out)').count();assert.ok(count>=14&&count<25);await shot('route-4-2');
 await p.locator('.route-optional').check();assert.ok(await p.locator('.st:not(.out)').count()>count);await p.locator('.route-optional').uncheck();
 await p.locator('.route-destination').selectOption('contraction-metrics');await shot('route-contraction');
 await p.locator('[data-lens="map"]').click();await p.locator('.mp-close').click();await shot('metro');await p.locator('.panel-toggle').click();await p.locator('.mp-lines button[data-line="dynamics"]').click();await p.waitForTimeout(550);await p.locator('.mp-close').click();await shot('guarantees-row');
 let visits=0;
 const ids=await p.evaluate(()=>RL.content.parts.filter(p=>p.n>=15).flatMap(p=>p.stations.map(s=>s.id)));
 for(const id of ids)for(const mode of ['textbook','card']){
  await go(`#/e/${id}/${mode}`);
  // A same-entry mode hash does not remount: use the visible mode tab, as readers do.
  if(await p.locator(`[data-mode="${mode}"]`).count())await p.locator(`[data-mode="${mode}"]`).first().click();
  assert.equal(await p.locator('.katex-error').count(),0,`${id}/${mode}: formula error`);await overflow();visits++;
 }
 await p.setViewportSize({width:390,height:844});
 for(const id of ids)for(const mode of ['textbook','card']){
  await go(`#/e/${id}/${mode}`);await p.locator(`[data-mode="${mode}"]`).first().click();await overflow();
  const mathOverflow=await p.evaluate(()=>[...document.querySelectorAll('.mode-body .tex')].filter(e=>e.getBoundingClientRect().width>0&&((e.classList.contains('tex-display')&&e.scrollWidth>e.clientWidth+2)||(!e.classList.contains('tex-display')&&e.getBoundingClientRect().right>innerWidth-5))).map(e=>e.dataset.src));
  assert.deepEqual(mathOverflow,[],`${id}/${mode}: mobile math overflow`);visits++;
 }
 await p.setViewportSize({width:1440,height:1000});
 await go('#/e/boffi-thm-5-1/card');await p.locator('[data-mode="card"]').first().click();assert.ok(await p.locator('.source-provenance').count());
 await p.locator('[data-proof]').check();await p.reload();await p.waitForSelector('[data-proof]');assert.equal(await p.locator('[data-proof]').isChecked(),true);await shot('result-card');
 await go('#/e/lyapunov-functions/story');await p.locator('[data-mode="story"]').first().click();await p.waitForSelector('.flow-plane');await shot('story');
 await go('#/flows');await p.waitForFunction(()=>document.querySelector('.flow-status')?.textContent.startsWith('Bench complete'),{},{timeout:60000});
 assert.equal(await p.locator('.flow-strip button').count(),20);await p.locator('.flow-strip button').nth(2).click();assert.match(await p.locator('.flow-readout').innerText(),/Seed 3/);
 await p.locator('.flow-play').click();await p.waitForTimeout(120);assert.ok(+await p.locator('.flow-time').inputValue()<150);await p.locator('.flow-play').click();await shot('linear-lab');
 await p.locator('[name="world"]').selectOption('vdp');await p.locator('[name="metric"]').selectOption('1');await p.waitForFunction(()=>document.querySelector('.flow-status')?.textContent.startsWith('Bench complete'),{},{timeout:60000});
 await p.locator('.flow-sweep').click();await p.waitForTimeout(100);await p.locator('.flow-stop').click();assert.match(await p.locator('.flow-status').innerText(),/Stopped/);
 await p.locator('.flow-sweep').click();await p.waitForFunction(()=>document.querySelector('.flow-status')?.textContent.startsWith('Sweep complete'),{},{timeout:180000});
 assert.equal(await p.locator('.flow-sweep-table tbody tr').count(),5);const sweep=await p.locator('.flow-sweep-table').innerText();await shot('metric-sweep');
 // Rebuild the played metric after the sweep, from the cache.
 await p.locator('.flow-run').click();await p.waitForFunction(()=>document.querySelector('.flow-status')?.textContent.startsWith('Bench complete'));await shot('metric-lab');
 for(const theme of ['light','dark'])for(const width of [1440,390]){
  await p.setViewportSize({width,height:width===390?844:1000});await p.evaluate(t=>document.documentElement.dataset.theme=t,theme);
  await overflow();await shot(`lab-${theme}-${width}`);
  await go('#/e/boffi-thm-4-4/textbook');await p.locator('[data-mode="textbook"]').first().click();await overflow();await shot(`textbook-${theme}-${width}`);
  await go('#/flows');await p.waitForFunction(()=>document.querySelector('.flow-status')?.textContent.startsWith('Bench complete'),{},{timeout:60000});
 }
 await go('#/e/vdp-certificates/story');await p.locator('[data-mode="story"]').first().click();await p.waitForFunction(()=>document.querySelector('.scene-flow-learning')?.textContent.includes('n=2'),{},{timeout:60000});await shot('violation-story');
 // Node and browser engines must agree exactly for the same seed and settings.
 const browserRun=await p.evaluate(()=>{const r=RL.flows.experiment({name:'vdp',seed:7,samples:4,metric:true,holdout:10});return {Q:r.Q,violation:r.violation,feasible:r.feasible};});
 require('../lab/node');const r=RL.flows.experiment({name:'vdp',seed:7,samples:4,metric:true,holdout:10});assert.deepEqual(browserRun,{Q:r.Q,violation:r.violation,feasible:r.feasible});
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 const report={browser,version:b.version(),visits,errors,external,sweep,crossRuntime:'exact',screenshots:fs.readdirSync(out).filter(f=>f.endsWith('.png'))};fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
