const test=require('node:test'),assert=require('node:assert/strict');
require('../lab/node');require('../app/content');require('../app/js/routes');
const F=RL.flows,G=RL.routes,C=RL.content;
const close=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
test('RK4 has fourth-order accuracy and pins a repeatable flow',()=>{
 const run=(dt)=>{let x=[1];for(let t=0;t<Math.round(1/dt);t++)x=F.rk4(([v])=>[-v],x,dt);return x[0];};
 const exact=Math.exp(-1),e1=Math.abs(run(.1)-exact),e2=Math.abs(run(.05)-exact);
 assert.ok(e1/e2>15&&e1/e2<18);close(run(.02),exact,1e-9);
 const w=F.world('vdp');assert.deepEqual(F.trajectory(w,[1,1]),F.trajectory(w,[1,1]));
 assert.throws(()=>F.rk4(w.f,[1,1],0));assert.throws(()=>F.experiment({samples:0}));
});
test('analytic Jacobians match independent differences for nonlinear flows',()=>{
 for(const name of ['pendulum','vdp'])for(const x of [[0,0],[1.2,-.7],[-1.8,1.1]]){
  const w=F.world(name),J=w.jac(x),h=1e-5;
  for(let j=0;j<2;j++){const a=x.slice(),b=x.slice();a[j]+=h;b[j]-=h;const fa=w.f(a),fb=w.f(b);for(let i=0;i<2;i++)close(J[2*i+j],(fa[i]-fb[i])/(2*h),1e-8);}
 }
});
test('Jacobi eigenvectors reconstruct symmetric matrices and PSD projection is positive',()=>{
 const A=[2,1,-.3,1,-2,.6,-.3,.6,4],e=F.eigen(A,3),P=F.psd(A,3,.2);
 for(let i=0;i<3;i++)for(let j=0;j<3;j++)close(A[3*i+j],e.values.reduce((s,v,k)=>s+v*e.vectors[3*i+k]*e.vectors[3*j+k],0));
 assert.ok(Math.min(...F.eigen(P,3).values)>=.2-1e-10);
 assert.deepEqual(F.psd(P,3,.2).map(x=>+x.toFixed(9)),P.map(x=>+x.toFixed(9)));
});
test('Lyapunov equation residual and known 2x2 solution',()=>{
 assert.deepEqual(F.lyapunov([-1,0,0,-2]),[.5,0,0,.25]);
 const A=[-1,3,0,-2],P=F.lyapunov(A);
 for(let i=0;i<2;i++)for(let j=0;j<2;j++){let v=0;for(let k=0;k<2;k++)v+=A[2*k+i]*P[2*k+j]+P[2*i+k]*A[2*k+j];close(v,i===j?-1:0);}
 assert.ok(Math.min(...F.eigen(P,2).values)>0);assert.throws(()=>F.lyapunov([0,0,0,0]));
});
test('convex quadratic fit agrees with the closed-form projection and rejects an unstable flow',()=>{
 const stable=F.world('linear',[-1,0,0,-2]),train=[F.trajectory(stable,[1,1])],r=F.fit(stable,train);
 assert.equal(r.feasible,true);r.Q.forEach((v,i)=>close(v,i%3===0?1:0));
 const unstable=F.world('linear',[1,0,0,1]),bad=F.fit(unstable,[F.trajectory(unstable,[1,.5])]);
 assert.equal(bad.feasible,false);assert.ok(bad.maxResidual>0);
});
test('Gram-metric residual agrees with a directional finite-difference calculation',()=>{
 const w=F.world('vdp'),x=[.8,-.3],u=[.4,.7],Q=Array.from({length:144},(_,i)=>i%13===0?.1:0),h=1e-6,f=w.f(x),J=w.jac(x),du=[J[0]*u[0]+J[1]*u[1],J[2]*u[0]+J[3]*u[1]];
 const xp=x.map((v,i)=>v+h*f[i]),xm=x.map((v,i)=>v-h*f[i]),up=u.map((v,i)=>v+h*du[i]),um=u.map((v,i)=>v-h*du[i]);
 const energy=(a,b)=>F.quad(F.metricAt(Q,a),b),c=F.constraint(w,x,u,.1,true);
 close(c.a.reduce((s,v,i)=>s+v*Q[i],0)-c.b,(energy(xp,up)-energy(xm,um))/(2*h)+.2*energy(x,u),1e-7);
 for(const z of [[-2,2],[0,0],[10,-10]])assert.ok(Math.min(...F.eigen(F.metricAt(Q,z),2).values)>=1-1e-9);
});
test('trajectory holdout streams are repeatable and independent of training sample count',()=>{
 const a=F.experiment({name:'linear',seed:5,samples:4,holdout:20}),b=F.experiment({name:'linear',seed:5,samples:8,holdout:20});
 assert.deepEqual(a.train,b.train.slice(0,4));assert.deepEqual(a,F.experiment({name:'linear',seed:5,samples:4,holdout:20}));
 assert.ok(a.feasible&&b.feasible);assert.equal(a.violation,0);
});
test('sampled metric feasibility checks full matrices, not only training directions',()=>{
 const r=F.experiment({name:'vdp',metric:true,samples:8,seed:1,holdout:20});
 const actual=Math.max(...r.train.flatMap(states=>states.filter((_,i)=>i%10===0).map(x=>F.residual(F.world('vdp'),r.Q,x,r.trainingRate,true))));
 assert.equal(r.feasible,actual<=1e-5);close(r.maxResidual,actual,1e-8);
});
test('all destinations have deterministic route closures and required layers are acyclic',()=>{
 for(const r of C.routes.named){const a=G.layout(r.destination,C.routes.links),b=G.layout(r.destination,[...C.routes.links].reverse());assert.deepEqual([...a.pos],[...b.pos]);assert.equal(a.pos.get(r.destination).x,Math.max(...[...a.pos.values()].map(p=>p.x)));}
 for(const id of Object.keys(C.entries))assert.doesNotThrow(()=>G.layout(id,C.routes.links));
 const links=[{from:'a',to:'b',role:'required'},{from:'c',to:'b',role:'optional'},{from:'d',to:'c',role:'required'}];
 assert.deepEqual(G.closure('b',links).ids,['a','b']);assert.deepEqual(G.closure('b',links,true).ids,['a','b','c','d']);
 assert.throws(()=>G.layout('b',[...links,{from:'b',to:'a',role:'required'}]),/cycle/);
});
test('guarantees curriculum has complete result cards and version-specific provenance',()=>{
 const parts=C.parts.filter(p=>p.n>=15),stations=parts.flatMap(p=>p.stations);
 assert.equal(stations.length,37);assert.equal(stations.filter(s=>s.kind==='result').length,6);
 for(const s of stations){const e=C.entries[s.id];assert.ok(e.textbook);for(const src of e.sources){assert.ok(src.kind&&src.locator&&src.review);if(src.text.includes('Boffi'))assert.match(src.locator,/2008\.05952v2/);}
  if(s.kind==='result')for(const key of ['statement','intuition','assumptions','proof','uses'])assert.ok(e.card.some(c=>c.id===key));
 }
});

test('pinned violation-set story fits stay unchanged',()=>{
 const {createHash}=require('node:crypto'),expected=require('./flow-story-runs.json');
 for(const samples of [2,8,32]){const r=F.experiment({name:'vdp',metric:true,seed:5,samples,rate:.1,holdout:100});assert.deepEqual({Q:createHash('sha256').update(JSON.stringify(r.Q)).digest('hex'),bad:r.bad,feasible:r.feasible},expected[samples]);}
});
test('guarantees colors meet text contrast in both themes',()=>{
 const light=['#087681','#9b4775','#a45a0a'],dark=['#60ced2','#e5a0c8','#edb56c'];
 const lum=h=>{const v=h.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2];};
 for(const [colors,backgrounds] of [[light,['#f4f3ef','#fcfcfb']],[dark,['#121211','#1a1a19']]])for(const c of colors)for(const b of backgrounds){const a=lum(c),z=lum(b);assert.ok((Math.max(a,z)+.05)/(Math.min(a,z)+.05)>=4.5,`${c} on ${b}`);}
});

test('the embedded flow Worker is built from the tested engine',()=>{
 const fs=require('node:fs'),path=require('node:path');require('../app/flow-worker');
 const source=['lab/core.js','lab/deep/dmath.js','lab/flows.js','lab/flow-worker.js'].map(f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8')).join('\n');
 assert.equal(RL.flowWorker,source);
});
