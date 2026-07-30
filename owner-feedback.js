'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}

walk(publishDir);

const compactStyles = `<style id="lgds-owner-feedback">
.mobile-nav .mobile-priority-service{display:none!important}
@media (min-width:901px){
  .offer-grid{max-width:1000px}
  .offer-card{min-height:285px;padding:26px}
  .before-after-grid{max-width:1120px;gap:18px}
  .before-after-image{height:380px}
  .trusted-brands{max-width:1180px;padding:22px 26px 18px}
  .brand-logo-grid{gap:14px}
  .brand-logo-card{height:82px;padding:10px}
  .brand-logo-card img{height:58px}
}
</style>`;

const priorityLink =
  /<a class="mobile-priority-service (?:emergency|same-day)"[^>]*>.*?<\/a>/g;

for (const htmlFile of htmlFiles) {
  let html = fs.readFileSync(htmlFile, 'utf8');
  html = html.replace(priorityLink, '');

  if (
    htmlFile.endsWith(
      path.join('services', 'emergency-garage-door-service', 'index.html')
    )
  ) {
    html = html.replaceAll(
      '/assets/media/services/emergency-collapsed-garage-door.webp',
      '/assets/media/services/garage-door-repair-damaged-door.webp'
    );
  }

  if (!html.includes('id="lgds-owner-feedback"')) {
    html = html.replace('</head>', `${compactStyles}</head>`);
  }

  fs.writeFileSync(htmlFile, html);
}

console.log(
  `[owner-feedback] Updated ${htmlFiles.length} pages: simplified mobile menu, compacted home sections, and replaced the Emergency image.`
);
