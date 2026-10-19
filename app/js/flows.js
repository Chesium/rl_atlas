/* Phase-plane drawing, live flow Lab, and the track's story and textbook demos. */
(function (RL) {
  "use strict";
  const F = RL.flows, { esc } = RL, pct = (x) => `${(100*x).toFixed(1)}%`;
  const backgrounds=new WeakMap();
  function picture(host, w, fit, at=150, ellipses=true, cloud=false) {
    const X=(x)=>310+82*x, Y=(y)=>230-82*y;
    let svg=`<svg viewBox="0 0 620 460" class="flow-plane" role="img" aria-label="Phase plane: vector field, trajectories, certificate contours and sampled violations"><path class="flow-axis" d="M20 230H600 M310 20V440"/><text x="585" y="250">x₁</text><text x="320" y="26">x₂</text>`;
    const background=fit&&backgrounds.get(fit);
    if(background)svg=background;
    if(!background&&fit) for(let i=-20;i<=20;i++)for(let j=-20;j<=20;j++) {
      const x=[i/10,j/10];
      if(F.residual(w,fit.Q,x,fit.rate,fit.metric)>1e-5) svg+=`<rect class="flow-violation" x="${X(x[0])-4}" y="${Y(x[1])-4}" width="8" height="8"/>`;
    }
    if(!background)for(let i=-4;i<=4;i++)for(let j=-3;j<=3;j++) {
      const x=[i*.5,j*.5],v=w.f(x),z=Math.hypot(...v)||1,dx=14*v[0]/z,dy=-14*v[1]/z;
      svg+=`<path class="flow-field" d="M${X(x[0])} ${Y(x[1])}l${dx} ${dy} m${-dx*.28+dy*.2} ${-dy*.28-dx*.2}l${dx*.28-dy*.2} ${dy*.28+dx*.2}l${-dx*.28-dy*.2} ${-dy*.28+dx*.2}"/>`;
    }
    if(!background&&fit&&!fit.metric)for(const level of [.5,1,2,4,8]) {
      const pts=[];
      for(let k=0;k<=96;k++){const t=k/96*2*Math.PI,u=[RL.dmath.cos(t),RL.dmath.sin(t)],r=Math.sqrt(level/F.quad(fit.Q,u));pts.push(`${k?'L':'M'}${X(r*u[0])} ${Y(r*u[1])}`);}
      svg+=`<path class="flow-contour" d="${pts.join(' ')}"/>`;
    }
    if(!background&&fit)backgrounds.set(fit,svg);
    if(cloud&&fit?.train?.length){
      const origin=fit.train[0][0];
      for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){
        const path=F.trajectory(w,[origin[0]+i*.08,origin[1]+j*.08]),p=path[at];
        svg+=`<circle class="flow-cloud" cx="${X(p[0])}" cy="${Y(p[1])}" r="4"/>`;
      }
    }
    for(const path of fit?.train?.slice(0,12)||[]) {
      const shown=path.slice(0,at+1),last=shown.at(-1);
      svg+=`<path class="flow-trajectory" d="${shown.map((p,i)=>`${i?'L':'M'}${X(p[0])} ${Y(p[1])}`).join(' ')}"/><circle class="flow-state" cx="${X(last[0])}" cy="${Y(last[1])}" r="3"/>`;
      if(ellipses&&fit.metric){
        const e=F.eigen(F.metricAt(fit.Q,last),2),a=e.vectors,pts=[];
        for(let k=0;k<=32;k++){const t=k/32*2*Math.PI,u=.18*RL.dmath.cos(t)/Math.sqrt(e.values[0]),v=.18*RL.dmath.sin(t)/Math.sqrt(e.values[1]);pts.push(`${k?'L':'M'}${X(last[0]+a[0]*u+a[1]*v)} ${Y(last[1]+a[2]*u+a[3]*v)}`);}
        svg+=`<path class="flow-metric" d="${pts.join(' ')}"/>`;
      }
    }
    svg+=`<text x="20" y="440">${w.time} time · ${w.time==='discrete'?at+' iterations':(at*.02).toFixed(2)+' seconds'}</text></svg>`;
    host.innerHTML=svg;
  }
  RL.flowPicture=picture;
  function chart(host,rows){
    const x=(n)=>44+(Math.log2(n)-1)/4*470,y=(v)=>190-v*160;
    host.innerHTML=`<svg class="flow-chart" viewBox="0 0 620 235" role="img" aria-label="Holdout trajectory violations against number of independent training trajectories"><path class="flow-axis" d="M44 30V190H530"/>${[0,.5,1].map(v=>`<text x="4" y="${y(v)+4}">${pct(v)}</text>`).join('')}<path class="flow-reference" d="${rows.map((r,i)=>`${i?'L':'M'}${x(r.n)} ${y(2/r.n)}`).join(' ')}"/><path class="flow-curve" d="${rows.map((r,i)=>`${i?'L':'M'}${x(r.n)} ${y(r.value)}`).join(' ')}"/>${rows.map(r=>`<circle class="flow-state" cx="${x(r.n)}" cy="${y(r.value)}" r="4"/><text x="${x(r.n)}" y="211" text-anchor="middle">${r.n}</text>`).join('')}<text x="310" y="232" text-anchor="middle">n independent training trajectories</text></svg>`;
  }
  RL.views.flows=function(host){
    host.innerHTML=`<article class="entry flow-lab"><header class="hero"><span class="eyebrow">Lab · Learning with guarantees</span><h1>Flows and certificates</h1><p class="summary">Fit on trajectories, then look for failures on fresh ones. A sampled test is evidence; it does not prove stability everywhere.</p></header>
      <div class="flow-controls card">
      <label>Flow<select name="world"><option value="linear">Linear system</option><option value="pendulum">Damped pendulum</option><option value="vdp">Damped Van der Pol</option><option value="discrete">Discrete linear map</option></select></label>
      <label>Certificate<select name="metric"><option value="0">Quadratic Lyapunov function</option><option value="1">Polynomial contraction metric</option></select></label>
      <label>Trajectories n<select name="samples">${[2,4,8,16,32].map(n=>`<option ${n===8?'selected':''}>${n}</option>`).join('')}</select></label>
      <label>Test norm rate α<input name="rate" type="number" min="0" max="0.4" step="0.05" value="0.1"></label>
      <label>Seed<input name="seed" type="number" min="1" max="4294967295" value="1"></label><label><input name="typical" type="checkbox" checked> Typical seed</label><button class="btn ghost flow-dice" type="button">Roll seed</button>
      <fieldset class="flow-matrix"><legend>Linear matrix A</legend>${[-1,3,0,-2].map((v,i)=>`<label>a${Math.floor(i/2)+1}${i%2+1}<input name="a${i}" type="number" min="-4" max="4" step="0.1" value="${v}"></label>`).join('')}</fieldset>
      <button class="btn flow-run" type="button">Run bench</button><button class="btn ghost flow-sweep" type="button">Sweep n on seeds 1–20</button><button class="btn ghost flow-stop" type="button" disabled>Stop</button></div>
      <p class="flow-status" role="status" aria-live="polite"></p>
      <div class="flow-main"><section class="card"><div class="flow-picture"></div><div class="flow-transport"><button class="btn ghost flow-play" type="button">Play</button><label>Time<input class="flow-time" type="range" min="0" max="150" value="150"></label><label><input class="flow-ellipses" type="checkbox" checked> Metric ellipses</label><label><input class="flow-nearby" type="checkbox"> Nearby cloud (extra initial states)</label></div><p class="flow-legend"><span>— certificate contours</span> · <b>▧ grid decrease violations</b> · dotted: metric balls</p></section>
      <section class="card flow-results"><h2>The played seed</h2><div class="flow-readout"></div><h2>Bench: seeds 1–20</h2><div class="flow-strip"></div><div class="flow-bench"></div><h2>Sweep n</h2><div class="flow-sweep-chart"></div><div class="flow-sweep-table"></div></section></div>
      <section class="card flow-method"><h2>What this experiment checks</h2><p>Initial states are uniform in the radius-two ball. Each seed supplies n independent training trajectories and 100 fresh holdout trajectories from a separate stream. The holdout stream is shared across n. The same 20 seeds form every bench; Typical chooses the median violation rate (ties: seed order).</p>
      <p>RK4 uses a 0.02 step and a 3 second horizon; training checks every tenth point. Fitting uses α + 0.05 as a relative decrease margin and tests at α. This differs from the paper’s fixed scalar margin. A positive training residual means sampled feasibility is unresolved after 250 projection iterations. Discrete maps use 150 iterations and V(Ax) ≤ (1 − 2α)V(x).</p>
      <p>Quadratics impose P ≥ I. Polynomial metrics impose M(x) = I + B(x)ᵀQB(x), Q ≥ 0, with quadratic monomials (degree-four entries). Analytic derivatives and Jacobians are used. Holdout and grid tests use the largest full-matrix residual eigenvalue. The constraint solver adds violated eigenvector directions as cutting planes.</p>
      <p>The dashed chart shows a normalized k/n shape (k=3 for a quadratic, 78 for the Gram matrix). Constants, norm radii, fixed-margin premises and logarithms are not validated here. This is an adapted experiment, not the original Figure 1 reproduction.</p><p><a href="#/e/boffi-thm-4-2/textbook">Read Theorem 4.2</a> · <a href="#/e/vdp-certificates/textbook">Figure 1 and the differences</a></p></section></article>`;
    const $=s=>host.querySelector(s),input=n=>$(`[name="${n}"]`);
    let worker=null,pending=null,serial=0,epoch=0,current=null,settings=null,results=[],timer=0,dead=false;
    const cache=new Map(),status=text=>{$('.flow-status').textContent=text;};
    const refresh=()=>{if(current)picture($('.flow-picture'),F.world(settings.name,settings.matrix),current,+$('.flow-time').value,$('.flow-ellipses').checked,$('.flow-nearby').checked);};
    function display(r){
      current=r;input('seed').value=r.seed;refresh();
      const ci=r.bad===0?1-Math.pow(.05,1/r.holdout):null;
      $('.flow-readout').innerHTML=`<p><b>Seed ${r.seed}: ${r.bad}/${r.holdout} holdout trajectories violate (${pct(r.violation)}).</b></p><p>Training: ${r.feasible?'sampled constraints met':'feasibility unresolved'}; maximum residual ${r.maxResidual.toExponential(2)}; ${r.iterations} iterations.</p><p>${ci!==null?`Zero failures: the one-sided 95% binomial upper limit is ${pct(ci)} for a fixed certificate.`:'The observed fraction is an estimate, not a population guarantee.'}</p><p>Rank: ${results.filter(v=>v.violation>r.violation).length} of ${results.length} bench seeds have more violations. Proof progress is recorded separately on result cards.</p>`;
    }
    function busy(on){$('.flow-run').disabled=$('.flow-sweep').disabled=on;$('.flow-stop').disabled=!on;}
    function stop(){epoch++;worker?.terminate();worker=null;pending?.reject(new Error('Stopped'));pending=null;busy(false);}
    function compute(s){
      const key=JSON.stringify(s);if(cache.has(key))return Promise.resolve(cache.get(key));
      if(!worker){
        const url=URL.createObjectURL(new Blob([RL.flowWorker],{type:'text/javascript'}));worker=new Worker(url);URL.revokeObjectURL(url);
        worker.onmessage=({data})=>{if(!pending||data.id!==pending.id)return;const p=pending;pending=null;if(data.error)p.reject(new Error(data.error));else{cache.set(p.key,data.result);p.resolve(data.result);}};
        worker.onerror=()=>{const p=pending;pending=null;worker?.terminate();worker=null;p?.reject(new Error('Flow worker failed'));};
      }
      return new Promise((resolve,reject)=>{const id=++serial;pending={id,key,resolve,reject};worker.postMessage({id,settings:s});});
    }
    function read(){
      for(const el of host.querySelectorAll('input[type=number]'))if(!el.checkValidity()){el.reportValidity();throw new Error('Check the highlighted setting');}
      const s={name:input('world').value,metric:!!+input('metric').value,samples:+input('samples').value,rate:+input('rate').value,matrix:[0,1,2,3].map(i=>+input(`a${i}`).value)};
      if(s.name==='discrete'&&s.metric)throw new Error('Choose a quadratic certificate for discrete time');return s;
    }
    async function run(sweep=false){
      stop();let s;try{s=read();}catch(e){status(e.message);return;}
      settings=s;current=null;busy(true);const mine=epoch;
      try{
        if(sweep){
          const rows=[];$('.flow-sweep-chart').replaceChildren();$('.flow-sweep-table').replaceChildren();
          for(const n of [2,4,8,16,32]){
            let sum=0,feasible=0;
            for(let seed=1;seed<=20;seed++){status(`Sweep: n=${n}, seed ${seed} of 20`);const r=await compute({...s,samples:n,seed});if(dead||mine!==epoch)return;sum+=r.violation;feasible+=+r.feasible;}
            rows.push({n,value:sum/20,feasible});chart($('.flow-sweep-chart'),rows);
            $('.flow-sweep-table').innerHTML=`<table><thead><tr><th>n</th><th>Mean violation</th><th>Feasible seeds</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.n}</td><td>${pct(r.value)}</td><td>${r.feasible}/20</td></tr>`).join('')}</tbody></table><p>Dashed: k/n shape normalized to 1 at n=2. This is not a numerical theorem bound.</p>`;
          }
          status('Sweep complete: 100 seeded fits, each tested on 100 holdout trajectories.');
        }else{
          results=[];$('.flow-strip').replaceChildren();$('.flow-bench').replaceChildren();
          for(let seed=1;seed<=20;seed++){status(`Bench: seed ${seed} of 20`);results.push(await compute({...s,seed}));if(dead||mine!==epoch)return;}
          const sorted=[...results].sort((a,b)=>a.violation-b.violation||a.seed-b.seed),typical=sorted[9];
          const played=input('typical').checked?typical:await compute({...s,seed:+input('seed').value});
          if(dead||mine!==epoch)return;
          $('.flow-strip').innerHTML=results.map(r=>`<button type="button" data-seed="${r.seed}" title="Seed ${r.seed}: ${pct(r.violation)} violations">${r.seed}<small>${pct(r.violation)}</small></button>`).join('');
          $('.flow-bench').textContent=`Middle half: ${pct(sorted[4].violation)}–${pct(sorted[14].violation)}. Typical: seed ${typical.seed}. Sampled feasibility met on ${results.filter(r=>r.feasible).length}/20 seeds.`;
          display(played);status('Bench complete. Click any seed to replay it.');
        }
      }catch(e){if(!dead&&mine===epoch)status(e.message);}finally{if(!dead&&mine===epoch)busy(false);}
    }
    $('.flow-run').onclick=()=>run();$('.flow-sweep').onclick=()=>run(true);$('.flow-stop').onclick=()=>{stop();status('Stopped. Completed results remain visible.');};
    $('.flow-dice').onclick=()=>{input('typical').checked=false;input('seed').value=1+Math.floor(Math.random()*1000000);run();};
    $('.flow-strip').onclick=e=>{const seed=+e.target.closest('[data-seed]')?.dataset.seed;if(seed){input('typical').checked=false;display(results.find(r=>r.seed===seed));}};
    function haltPlay(){clearInterval(timer);timer=0;$('.flow-play').textContent='Play';}
    $('.flow-play').onclick=()=>{if(timer)return haltPlay();if(+$('.flow-time').value===150)$('.flow-time').value=0;$('.flow-play').textContent='Pause';timer=setInterval(()=>{$('.flow-time').value=+$('.flow-time').value+2;refresh();if(+$('.flow-time').value>=150)haltPlay();},40);};
    $('.flow-time').oninput=()=>{haltPlay();refresh();};$('.flow-ellipses').onchange=$('.flow-nearby').onchange=refresh;
    input('world').onchange=()=>{if(input('world').value==='discrete'){input('metric').value='0';[.8,.2,0,.6].forEach((v,i)=>{input(`a${i}`).value=v;});}run();};
    for(const el of host.querySelectorAll('.flow-controls input,.flow-controls select'))if(el!==input('world'))el.onchange=()=>run();
    run();return{destroy(){dead=true;stop();haltPlay();}};
  };
  RL.demos.flow=function(host,arg){const metric=arg==='contraction'||arg==='vdp',name=arg==='vdp'?'vdp':'linear',r=F.experiment({name,metric,seed:1,samples:4,holdout:20});picture(host,F.world(name),r);host.insertAdjacentHTML('beforeend',`<p>Seed 1, n=4 · ${r.bad}/${r.holdout} fresh trajectories violate. <a href="#/flows">Try the bench →</a></p>`);};
  RL.scenes.flow={create(host,config){const w=F.world(config.world||'linear'),random=RL.lab.rng(1),train=Array.from({length:8},()=>F.trajectory(w,F.initial(random))),Q=config.metric?F.fit(w,train,{metric:true}).Q:F.lyapunov([-1,3,0,-2]);return{apply(state){picture(host,w,{Q,train,metric:!!config.metric,rate:.1},state.at??150);},destroy(){}};}};
  RL.demos.learning=function(host,arg){
    host.innerHTML='<label>Independent samples n <input type="range" min="4" max="128" step="4" value="32"><output></output></label><div class="learning-picture"></div><p class="learning-readout"></p>';
    const draw=()=>{
      const n=+host.querySelector('input').value;host.querySelector('output').textContent=n;
      if(arg==='rates'){
        const k=16,delta=.05,fast=Math.min(1,Math.log(k/delta)/n),slow=Math.min(1,Math.sqrt(Math.log(2*k/delta)/(2*n)));
        host.querySelector('.learning-picture').innerHTML=`<div class="rate-bars"><div style="width:${slow*100}%">Generic ${pct(slow)}</div><div style="width:${fast*100}%">Zero errors ${pct(fast)}</div></div>`;
        host.querySelector('.learning-readout').textContent='Same finite class, |H|=16, δ=0.05: generic Hoeffding uniform deviation versus realizable zero-error risk bound. These bound different quantities; the fast one requires zero empirical errors.';
      }else{
        const random=RL.lab.rng(7),points=Array.from({length:n},()=>2*random.next()-1),trials=400;let sum=0,signs=[];
        for(let t=0;t<trials;t++){signs=points.map(()=>random.next()<.5?-1:1);let best=-Infinity;for(let j=0;j<17;j++){const w=-1+j/8;best=Math.max(best,points.reduce((a,x,i)=>a+signs[i]*w*x,0)/n);}sum+=best;}
        host.querySelector('.learning-picture').innerHTML=`<svg viewBox="0 0 620 160" role="img" aria-label="Random signs and the selected linear predictor">${points.map((x,i)=>`<circle cx="${40+(x+1)*260}" cy="${80-signs[i]*40}" r="4" fill="var(--metric)"/>`).join('')}</svg>`;
        host.querySelector('.learning-readout').textContent=`Finite class f_w(x)=wx, 17 weights in [−1,1]. Best random-sign fit averaged over ${trials} draws: ${(sum/trials).toFixed(4)}. Last draw shown. Seed 7 pins the Monte Carlo demonstration.`;
      }
    };host.querySelector('input').oninput=draw;draw();
  };
})(globalThis.RL=globalThis.RL||{});

/* The violation-set story uses the same cancellable offline worker as the Lab, one pinned fit at a time. */
(function(RL){
 RL.scenes['flow-learning']={create(host){
  let worker=null,generation=0,state=null;const cache=new Map();
  function draw(r){RL.flowPicture(host,RL.flows.world('vdp'),r,state.at??150);host.insertAdjacentHTML('beforeend',`<p>Seed 5 · n=${r.samples} · ${r.bad}/${r.holdout} holdout trajectories violate · ${r.feasible?'sampled training constraints met':'training feasibility unresolved'}</p>`);}
  return{apply(next){state=next;generation++;worker?.terminate();worker=null;
   if(cache.has(next.samples))return draw(cache.get(next.samples));
   host.innerHTML='<p role="status">Fitting this pinned metric…</p>';
   const id=generation,url=URL.createObjectURL(new Blob([RL.flowWorker],{type:'text/javascript'}));worker=new Worker(url);URL.revokeObjectURL(url);
   worker.onmessage=({data})=>{if(id!==generation)return;worker?.terminate();worker=null;if(data.error){host.textContent=data.error;return;}cache.set(next.samples,data.result);draw(data.result);};
   worker.onerror=()=>{if(id===generation)host.textContent='The metric worker could not finish.';};
   worker.postMessage({id,settings:{name:'vdp',metric:true,seed:5,samples:next.samples,rate:.1,holdout:100}});
  },destroy(){generation++;worker?.terminate();}};
 }};
})(globalThis.RL);
