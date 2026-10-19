// Keep the standard-library pack tests in the same node --test gate as the Lab.
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
test('course importer, build validation, private/public separation and optional real pack', () => {
  const result = spawnSync(process.env.PYTHON || 'python', [path.join(__dirname, 'course_check.py')], {
    cwd: path.join(__dirname, '..'), encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
  });
  assert.equal(result.status, 0, `${result.error || ''}\n${result.stdout}\n${result.stderr}`);
});
