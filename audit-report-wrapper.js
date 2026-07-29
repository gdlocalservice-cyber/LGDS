'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const publishDir = path.resolve(process.argv[2] || 'dist');
const result = spawnSync(process.execPath, ['audit-site.js', publishDir], {
  cwd: process.cwd(),
  encoding: 'utf8'
});

const report = [
  `Exit code: ${result.status}`,
  '',
  'STDOUT',
  result.stdout || '',
  '',
  'STDERR',
  result.stderr || ''
].join('\n');

fs.writeFileSync(path.join(publishDir, 'audit-report.txt'), report, 'utf8');
process.stdout.write(result.stdout || '');
process.stderr.write(result.stderr || '');
console.log(`[audit-report-wrapper] Wrote ${path.join(publishDir, 'audit-report.txt')}`);

if (process.env.AUDIT_STRICT === '1' && result.status !== 0) {
  process.exit(result.status || 1);
}
