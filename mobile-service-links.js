'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');

if (!fs.existsSync(publishDir)) {
  console.error(`[mobile-service-links] Publish directory not found: ${publishDir}`);
  process.exit(1);
}

function walkFiles(directory, extension) {
  const results = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...walkFiles(fullPath, extension));
    else if (entry.isFile() && path.extname(entry.name).toLowerCase() === extension) results.push(fullPath);
  }
  return results;
}

function findSitemap() {
  const candidates = walkFiles(publishDir, '.xml');
  return candidates.find((file) => path.basename(file).toLowerCase() === 'sitemap.xml') || null;
}

function normalizeLocalPath(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}`;
  } catch (error) {
    return url.startsWith('/') ? url : `/${url}`;
  }
}

function discoverServicePath(sitemap, patterns, fallback) {
  if (!sitemap) return fallback;
  const locations = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => match[1]);
  const found = locations.find((location) => patterns.every((pattern) => pattern.test(location)));
  return found ? normalizeLocalPath(found) : fallback;
}

const sitemapPath = findSitemap();
const sitemap = sitemapPath ? fs.readFileSync(sitemapPath, 'utf8') : '';
const emergencyPath = discoverServicePath(
  sitemap,
  [/emergency/i, /garage-door/i],
  '/services/emergency-garage-door-service/'
);
const sameDayPath = discoverServicePath(
  sitemap,
  [/same[-_ ]?day/i, /garage-door/i],
  '/services/same-day-garage-door-service/'
);

const block = `
<style id="lgds-mobile-priority-links-style">
  .lgds-mobile-priority-links {
    display: none;
  }
  @media (max-width: 767px) {
    .lgds-mobile-priority-links {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      padding: 8px 12px;
      background: #ffffff;
      border-bottom: 1px solid rgba(15, 23, 42, 0.12);
      box-shadow: 0 3px 10px rgba(15, 23, 42, 0.08);
      position: relative;
      z-index: 40;
    }
    .lgds-mobile-priority-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      padding: 8px 10px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 800;
      line-height: 1.15;
      text-align: center;
      text-decoration: none;
      border: 1px solid rgba(15, 23, 42, 0.14);
      color: #0f172a;
      background: #f8fafc;
    }
    .lgds-mobile-priority-links a:first-child {
      color: #ffffff;
      background: #b91c1c;
      border-color: #b91c1c;
    }
  }
</style>
<nav class="lgds-mobile-priority-links" aria-label="Priority garage door services">
  <a href="${emergencyPath}">Emergency Service</a>
  <a href="${sameDayPath}">Same-Day Service</a>
</nav>`;

const htmlFiles = walkFiles(publishDir, '.html');
let updatedFiles = 0;

for (const file of htmlFiles) {
  const original = fs.readFileSync(file, 'utf8');
  if (original.includes('lgds-mobile-priority-links')) continue;

  const updated = original.replace(/<body(\s[^>]*)?>/i, (match) => `${match}${block}`);
  if (updated !== original) {
    fs.writeFileSync(file, updated, 'utf8');
    updatedFiles += 1;
  }
}

if (updatedFiles !== htmlFiles.length) {
  console.error(
    `[mobile-service-links] Updated ${updatedFiles} of ${htmlFiles.length} HTML files. Aborting to avoid a partial deployment.`
  );
  process.exit(1);
}

console.log(
  `[mobile-service-links] Added mobile Emergency and Same-Day links to ${updatedFiles} HTML files. Paths: ${emergencyPath}, ${sameDayPath}`
);
