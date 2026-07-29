'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');

if (!fs.existsSync(publishDir)) {
  console.error(`[audit-site] Publish directory not found: ${publishDir}`);
  process.exit(1);
}

const htmlFiles = [];
const allFiles = new Set();

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!entry.isFile()) continue;
    const relative = path.relative(publishDir, fullPath).replace(/\\/g, '/');
    allFiles.add(relative);
    if (path.extname(entry.name).toLowerCase() === '.html') htmlFiles.push(relative);
  }
}

walk(publishDir);

const failures = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const paragraphOwners = new Map();
let checkedLinks = 0;
let checkedImages = 0;
let jsonLdBlocks = 0;

function stripTags(value) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeLocalReference(reference, sourceFile) {
  if (!reference || /^(?:https?:|mailto:|tel:|sms:|data:|blob:|javascript:|#)/i.test(reference)) return null;
  const clean = reference.split('#')[0].split('?')[0];
  if (!clean) return null;
  const decoded = (() => {
    try { return decodeURIComponent(clean); } catch { return clean; }
  })();
  const base = decoded.startsWith('/')
    ? decoded.replace(/^\/+/, '')
    : path.posix.normalize(path.posix.join(path.posix.dirname(sourceFile), decoded));
  if (!base || base === '.') return 'index.html';
  if (base.endsWith('/')) return `${base}index.html`;
  if (!path.posix.extname(base)) return `${base}/index.html`;
  return base.replace(/^\.\//, '');
}

function addUnique(map, value, file, label) {
  if (!value) return;
  const key = value.toLowerCase();
  if (!map.has(key)) {
    map.set(key, file);
    return;
  }
  if (map.get(key) !== file) warnings.push(`${label} duplicated between ${map.get(key)} and ${file}: ${value}`);
}

for (const file of htmlFiles) {
  const fullPath = path.join(publishDir, file);
  const html = fs.readFileSync(fullPath, 'utf8');

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? stripTags(titleMatch[1]) : '';
  if (!title) failures.push(`${file}: missing <title>`);
  else {
    if (title.length < 20 || title.length > 70) warnings.push(`${file}: title length ${title.length}`);
    addUnique(titles, title, file, 'Title');
  }

  const descriptionMatch = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
    html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const description = descriptionMatch ? descriptionMatch[1].trim() : '';
  if (!description) failures.push(`${file}: missing meta description`);
  else {
    if (description.length < 70 || description.length > 170) warnings.push(`${file}: meta description length ${description.length}`);
    addUnique(descriptions, description, file, 'Meta description');
  }

  const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) ||
    html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  if (!canonicalMatch) warnings.push(`${file}: missing canonical URL`);

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) failures.push(`${file}: expected exactly 1 H1, found ${h1Count}`);

  const ids = [];
  for (const match of html.matchAll(/\sid=["']([^"']+)["']/gi)) ids.push(match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) failures.push(`${file}: duplicate IDs ${[...new Set(duplicateIds)].join(', ')}`);

  for (const match of html.matchAll(/<(?:a|link|script|img|source|video|iframe)\b[^>]*(?:href|src)=["']([^"']+)["'][^>]*>/gi)) {
    const reference = match[1];
    const target = normalizeLocalReference(reference, file);
    if (!target) continue;
    checkedLinks += 1;
    if (!allFiles.has(target)) failures.push(`${file}: missing local target ${reference} -> ${target}`);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    checkedImages += 1;
    const attrs = match[1];
    const srcMatch = attrs.match(/\bsrc=["']([^"']+)["']/i);
    const altMatch = attrs.match(/\balt=["']([^"']*)["']/i);
    if (!altMatch) failures.push(`${file}: image missing alt attribute${srcMatch ? ` (${srcMatch[1]})` : ''}`);
    if (srcMatch) {
      const basename = path.posix.basename(srcMatch[1].split('?')[0]).toLowerCase();
      if (/^(?:img|image|photo|pic|dsc|pxl|screenshot|untitled|file)[-_ ]?\d*/.test(basename)) {
        warnings.push(`${file}: non-descriptive image filename ${basename}`);
      }
    }
  }

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonLdBlocks += 1;
    try {
      JSON.parse(match[1].trim());
    } catch (error) {
      failures.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const paragraph = stripTags(match[1]);
    if (paragraph.length < 120) continue;
    const key = paragraph.toLowerCase();
    if (!paragraphOwners.has(key)) paragraphOwners.set(key, []);
    paragraphOwners.get(key).push(file);
  }

  if (/lorem ipsum|placeholder text|coming soon|todo\b|fixme\b/i.test(stripTags(html))) {
    failures.push(`${file}: placeholder or unfinished copy detected`);
  }
}

for (const [paragraph, owners] of paragraphOwners.entries()) {
  const uniqueOwners = [...new Set(owners)];
  if (uniqueOwners.length > 1) {
    warnings.push(`Long paragraph duplicated across ${uniqueOwners.join(', ')}: ${paragraph.slice(0, 110)}…`);
  }
}

if (!allFiles.has('robots.txt')) warnings.push('robots.txt missing');
if (!allFiles.has('sitemap.xml')) failures.push('sitemap.xml missing');
if (!allFiles.has('llms.txt')) warnings.push('llms.txt missing');

console.log(`[audit-site] Files: ${allFiles.size}; HTML pages: ${htmlFiles.length}; local references checked: ${checkedLinks}; images checked: ${checkedImages}; JSON-LD blocks: ${jsonLdBlocks}.`);

if (warnings.length) {
  console.log(`[audit-site] Warnings (${warnings.length}):`);
  for (const warning of warnings.slice(0, 80)) console.log(`  - ${warning}`);
  if (warnings.length > 80) console.log(`  - …and ${warnings.length - 80} more warnings`);
}

if (failures.length) {
  console.error(`[audit-site] FAILED with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 120)) console.error(`  - ${failure}`);
  if (failures.length > 120) console.error(`  - …and ${failures.length - 120} more failures`);
  process.exit(1);
}

console.log('[audit-site] PASS: no broken local links/assets, missing core metadata, duplicate IDs, invalid JSON-LD, missing image alt attributes, or unfinished copy detected.');
