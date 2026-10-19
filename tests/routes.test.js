const test=require('node:test'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
test('route schema, prerequisite cycles and provenance validation',()=>{const r=spawnSync(process.env.PYTHON||'python',['tests/routes_check.py'],{encoding:'utf8'});assert.equal(r.status,0,r.stdout+r.stderr);});
