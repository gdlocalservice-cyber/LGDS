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
const emergencyPath = discoverServicePath(sitemap, [/emergency/i, /garage-door/i], '/services/emergency-garage-door-service/');
const sameDayPath = discoverServicePath(sitemap, [/same[-_ ]?day/i, /garage-door/i], '/services/same-day-garage-door-service/');

const block = String.raw`<script id="lgds-mobile-service-menu-links">
(function () {
  'use strict';

  var EMERGENCY_PATH = '${emergencyPath}';
  var SAME_DAY_PATH = '${sameDayPath}';

  function normalizePath(value) {
    return (value || '').replace(/\/+$/, '') || '/';
  }

  function hasLink(container, href) {
    var target = normalizePath(href);
    return Array.prototype.some.call(container.querySelectorAll('a[href]'), function (link) {
      try {
        return normalizePath(new URL(link.href, window.location.href).pathname) === target;
      } catch (error) {
        return normalizePath(link.getAttribute('href')) === target;
      }
    });
  }

  function cloneMenuLink(example, href, label) {
    var link = example.cloneNode(true);
    link.setAttribute('href', href);
    link.removeAttribute('aria-current');
    link.removeAttribute('data-active');

    var textNode = Array.prototype.find.call(link.querySelectorAll('span, strong, b'), function (node) {
      return (node.textContent || '').trim().length > 0;
    });

    if (textNode) textNode.textContent = label;
    else link.textContent = label;

    return link;
  }

  function findServiceContainers() {
    var serviceLinks = Array.prototype.slice.call(document.querySelectorAll('a[href*="/services/"]'));
    var containers = [];

    serviceLinks.forEach(function (link) {
      var node = link.parentElement;
      for (var depth = 0; depth < 4 && node && node !== document.body; depth += 1, node = node.parentElement) {
        var count = node.querySelectorAll('a[href*="/services/"]').length;
        if (count >= 2 && count <= 20 && containers.indexOf(node) === -1) containers.push(node);
      }
    });

    return containers.filter(function (container) {
      var parent = container.parentElement;
      return !parent || parent.querySelectorAll('a[href*="/services/"]').length !== container.querySelectorAll('a[href*="/services/"]').length;
    });
  }

  function addMissingLinks() {
    if (window.innerWidth > 900) return;

    findServiceContainers().forEach(function (container) {
      var example = container.querySelector('a[href*="/services/"]');
      if (!example) return;

      if (!hasLink(container, EMERGENCY_PATH)) {
        container.appendChild(cloneMenuLink(example, EMERGENCY_PATH, 'Emergency Service'));
      }
      if (!hasLink(container, SAME_DAY_PATH)) {
        container.appendChild(cloneMenuLink(example, SAME_DAY_PATH, 'Same-Day Service'));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMissingLinks, { once: true });
  } else {
    addMissingLinks();
  }

  var observer = new MutationObserver(addMissingLinks);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(function () { observer.disconnect(); }, 15000);
})();
</script>`;

const htmlFiles = walkFiles(publishDir, '.html');
let updatedFiles = 0;

for (const file of htmlFiles) {
  const original = fs.readFileSync(file, 'utf8');
  if (original.includes('id="lgds-mobile-service-menu-links"')) continue;

  const updated = original.replace(/<head(\s[^>]*)?>/i, (match) => `${match}${block}`);
  if (updated !== original) {
    fs.writeFileSync(file, updated, 'utf8');
    updatedFiles += 1;
  }
}

if (updatedFiles !== htmlFiles.length) {
  console.error(`[mobile-service-links] Updated ${updatedFiles} of ${htmlFiles.length} HTML files. Aborting to avoid a partial deployment.`);
  process.exit(1);
}

console.log(`[mobile-service-links] Added Emergency and Same-Day links inside existing mobile service menus on ${updatedFiles} HTML files without adding a homepage banner.`);
