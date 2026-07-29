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
  var imageCache = {};

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

  function setLabel(link, label) {
    var candidates = Array.prototype.slice.call(link.querySelectorAll('span, strong, b, h2, h3, h4, p'));
    var textNode = candidates.find(function (node) {
      var text = (node.textContent || '').trim();
      return text.length > 0 && text.length < 80;
    });
    if (textNode) textNode.textContent = label;
    else link.appendChild(document.createTextNode(label));
  }

  function chooseRealImage(documentNode, href) {
    var images = Array.prototype.slice.call(documentNode.querySelectorAll('main img, article img, img'));
    var emergency = /emergency/i.test(href);
    var scored = images.map(function (image, index) {
      var haystack = [image.alt, image.src, image.currentSrc, image.getAttribute('data-src')]
        .filter(Boolean).join(' ').toLowerCase();
      var score = 0;
      if (emergency && /emergency|damaged|broken|off.?track|collapsed|bent/.test(haystack)) score += 20;
      if (!emergency && /same.?day|repair|technician|service/.test(haystack)) score += 12;
      if (/logo|icon|avatar|star|badge|google/.test(haystack)) score -= 30;
      if (image.naturalWidth >= 600 || Number(image.getAttribute('width')) >= 600) score += 5;
      score -= index * 0.01;
      return { image: image, score: score };
    }).sort(function (a, b) { return b.score - a.score; });
    return scored.length ? scored[0].image : null;
  }

  function applyImage(link, sourceImage, label) {
    if (!sourceImage) return;
    var targetImage = link.querySelector('img');
    if (!targetImage) return;
    ['src', 'srcset', 'sizes', 'width', 'height'].forEach(function (attribute) {
      var value = sourceImage.getAttribute(attribute);
      if (value) targetImage.setAttribute(attribute, value);
      else targetImage.removeAttribute(attribute);
    });
    targetImage.alt = label + ' – Local Garage Door Service';
    targetImage.removeAttribute('data-src');
    targetImage.loading = 'lazy';
  }

  function hydrateRealImage(link, href, label) {
    if (imageCache[href]) {
      applyImage(link, imageCache[href], label);
      return;
    }
    fetch(href, { credentials: 'same-origin' })
      .then(function (response) { return response.ok ? response.text() : ''; })
      .then(function (html) {
        if (!html) return;
        var parsed = new DOMParser().parseFromString(html, 'text/html');
        var sourceImage = chooseRealImage(parsed, href);
        if (!sourceImage) return;
        imageCache[href] = sourceImage;
        applyImage(link, sourceImage, label);
      })
      .catch(function () { /* Leave the existing card image rather than break the menu. */ });
  }

  function cloneMenuLink(example, href, label) {
    var link = example.cloneNode(true);
    link.setAttribute('href', href);
    link.removeAttribute('aria-current');
    link.removeAttribute('data-active');
    link.setAttribute('data-lgds-added-service', label);
    setLabel(link, label);
    hydrateRealImage(link, href, label);
    return link;
  }

  function findServiceContainers() {
    var serviceLinks = Array.prototype.slice.call(document.querySelectorAll('a[href*="/services/"]'));
    var containers = [];
    serviceLinks.forEach(function (link) {
      var node = link.parentElement;
      for (var depth = 0; depth < 5 && node && node !== document.body; depth += 1, node = node.parentElement) {
        var count = node.querySelectorAll('a[href*="/services/"]').length;
        if (count >= 2 && count <= 24 && containers.indexOf(node) === -1) containers.push(node);
      }
    });
    return containers.filter(function (container) {
      var parent = container.parentElement;
      return !parent || parent.querySelectorAll('a[href*="/services/"]').length !== container.querySelectorAll('a[href*="/services/"]').length;
    });
  }

  function refreshExistingAddedCards(container) {
    Array.prototype.forEach.call(container.querySelectorAll('a[data-lgds-added-service]'), function (link) {
      var label = link.getAttribute('data-lgds-added-service');
      var href = link.getAttribute('href');
      hydrateRealImage(link, href, label);
    });
  }

  function addMissingLinks() {
    if (window.innerWidth > 900) return;
    findServiceContainers().forEach(function (container) {
      var example = container.querySelector('a[href*="/services/"]:not([data-lgds-added-service])');
      if (!example) return;
      if (!hasLink(container, EMERGENCY_PATH)) container.appendChild(cloneMenuLink(example, EMERGENCY_PATH, 'Emergency Service'));
      if (!hasLink(container, SAME_DAY_PATH)) container.appendChild(cloneMenuLink(example, SAME_DAY_PATH, 'Same-Day Service'));
      refreshExistingAddedCards(container);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addMissingLinks, { once: true });
  else addMissingLinks();

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

console.log(`[mobile-service-links] Added Emergency and Same-Day links inside existing mobile service menus and hydrated each card with a real page image on ${updatedFiles} HTML files.`);
