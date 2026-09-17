const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
process.chdir(root);
const archive = path.join(root, 'LGDS-STATIC-SITE.zip');
fs.writeFileSync(archive, Buffer.concat(fs.readdirSync('chunks').filter(n => /^chunk-\d+$/.test(n)).sort().map(n => fs.readFileSync(path.join('chunks', n)))));
const entries = execFileSync('unzip', ['-Z1', archive], { encoding: 'utf8' }).trim().split('\n');
if (entries.some(n => n.startsWith('/') || n.split('/').includes('..'))) throw new Error('Unsafe archive entry');
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');
execFileSync('unzip', ['-q', archive, '-d', 'dist']);
for (const script of ['privacy-consent.js', 'owner-feedback.js', 'performance.js', 'scripts/campaign-build.cjs', 'cache-bust.js']) {
  execFileSync(process.execPath, [script, 'dist'], { stdio: 'inherit' });
}
