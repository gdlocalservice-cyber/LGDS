'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');
const rawVersion =
  process.env.COMMIT_REF ||
  process.env.DEPLOY_ID ||
  process.env.BRANCH ||
  Date.now().toString(36);
const version =
  rawVersion.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 16) || Date.now().toString(36);

if (!fs.existsSync(publishDir)) {
  console.error(`[cache-bust] Publish directory not found: ${publishDir}`);
  process.exit(1);
}

let filesUpdated = 0;
let referencesUpdated = 0;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.html') {
      continue;
    }

    const original = fs.readFileSync(fullPath, 'utf8');
    let replacementsInFile = 0;
    const updated = original.replace(
      /(<(?:script|link)\b[^>]*\b(?:src|href)=["'])([^"']+\.(?:css|js))(?:\?[^"']*)?(["'])/gi,
      (match, prefix, assetUrl, suffix) => {
        if (/^(?:https?:|data:|blob:|\/\/)/i.test(assetUrl)) {
          return match;
        }

        replacementsInFile += 1;
        return `${prefix}${assetUrl.split('?')[0]}?v=${version}${suffix}`;
      }
    );

    if (updated !== original) {
      fs.writeFileSync(fullPath, updated, 'utf8');
      filesUpdated += 1;
      referencesUpdated += replacementsInFile;
    }
  }
}

walk(publishDir);
console.log(
  `[cache-bust] Added v=${version} to ${referencesUpdated} local CSS/JS references across ${filesUpdated} HTML files.`
);
