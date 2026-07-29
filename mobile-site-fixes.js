'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');

if (!fs.existsSync(publishDir)) {
  console.error(`[mobile-site-fixes] Publish directory not found: ${publishDir}`);
  process.exit(1);
}

const bootstrap = String.raw`<style id="lgds-mobile-site-fixes">
html, body {
  max-width: 100%;
  overflow-x: hidden !important;
}

*, *::before, *::after {
  box-sizing: border-box;
}

img, video, iframe, svg, canvas, picture {
  max-width: 100%;
}

@media (max-width: 767px) {
  body {
    width: 100%;
    position: relative;
  }

  main, header, footer, section, nav {
    max-width: 100vw;
  }

  .lgds-emergency-mobile-image,
  .lgds-emergency-mobile-image picture,
  .lgds-emergency-mobile-image img {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    max-width: 100% !important;
    width: 100% !important;
    height: auto !important;
  }
}
</style>
<script id="lgds-mobile-site-fixes-script">
(function () {
  'use strict';

  function normalizePath(value) {
    return (value || '/').replace(/\/+$/, '') || '/';
  }

  function commonAncestor(a, b) {
    if (!a || !b) return null;
    var parents = [];
    var node = a;
    while (node && node !== document.documentElement) {
      parents.push(node);
      node = node.parentElement;
    }
    node = b;
    while (node && node !== document.documentElement) {
      if (parents.indexOf(node) !== -1) return node;
      node = node.parentElement;
    }
    return null;
  }

  function removeUnrequestedHomepageServiceBanner() {
    if (normalizePath(window.location.pathname) !== '/') return;

    var emergencyLinks = Array.prototype.slice.call(document.querySelectorAll('a[href*="emergency-garage-door-service"]'));
    var sameDayLinks = Array.prototype.slice.call(document.querySelectorAll('a[href*="same-day-garage-door-service"]'));

    for (var i = 0; i < emergencyLinks.length; i += 1) {
      for (var j = 0; j < sameDayLinks.length; j += 1) {
        var container = commonAncestor(emergencyLinks[i], sameDayLinks[j]);
        if (!container || container === document.body || container.tagName === 'MAIN') continue;

        var text = (container.textContent || '').replace(/\s+/g, ' ').trim();
        var rect = container.getBoundingClientRect();
        var style = window.getComputedStyle(container);
        var isNearTop = rect.top < 650;
        var isCompact = text.length > 0 && text.length < 900;
        var looksLikeBanner = isNearTop && isCompact && (
          style.position === 'fixed' ||
          style.position === 'sticky' ||
          rect.height < 260 ||
          container.closest('header')
        );

        if (looksLikeBanner) {
          container.remove();
          return;
        }
      }
    }
  }

  function restoreEmergencyImageOnMobile() {
    if (window.innerWidth > 767) return;
    if (normalizePath(window.location.pathname).indexOf('/services/emergency-garage-door-service') !== 0) return;

    var main = document.querySelector('main') || document.body;
    var images = Array.prototype.slice.call(main.querySelectorAll('img'));
    if (!images.length) return;

    var candidate = images.find(function (image) {
      var haystack = [image.alt, image.src, image.currentSrc, image.getAttribute('data-src')]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return /emergency|damaged|broken|garage|door/.test(haystack);
    }) || images[0];

    var wrapper = candidate.closest('picture, figure') || candidate.parentElement || candidate;
    wrapper.classList.add('lgds-emergency-mobile-image');
    candidate.classList.add('lgds-emergency-mobile-image');

    var parent = wrapper.parentElement;
    for (var depth = 0; depth < 3 && parent && parent !== main; depth += 1, parent = parent.parentElement) {
      var computed = window.getComputedStyle(parent);
      if (computed.display === 'none' || computed.visibility === 'hidden' || Number(computed.opacity) === 0) {
        parent.classList.add('lgds-emergency-mobile-image');
      }
    }
  }

  function runFixes() {
    removeUnrequestedHomepageServiceBanner();
    restoreEmergencyImageOnMobile();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFixes, { once: true });
  } else {
    runFixes();
  }

  window.addEventListener('load', runFixes, { once: true });
})();
</script>`;

let htmlFiles = 0;
let injectedFiles = 0;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.html') continue;

    htmlFiles += 1;
    const original = fs.readFileSync(fullPath, 'utf8');
    if (original.includes('id="lgds-mobile-site-fixes"')) continue;

    const updated = original.replace(/<head(\s[^>]*)?>/i, function (match) {
      return match + bootstrap;
    });

    if (updated === original) {
      console.error(`[mobile-site-fixes] Could not inject into ${path.relative(publishDir, fullPath)}`);
      process.exit(1);
    }

    fs.writeFileSync(fullPath, updated, 'utf8');
    injectedFiles += 1;
  }
}

walk(publishDir);

if (injectedFiles !== htmlFiles) {
  console.error(`[mobile-site-fixes] Injected ${injectedFiles} of ${htmlFiles} HTML files. Aborting to avoid a partial deployment.`);
  process.exit(1);
}

console.log(`[mobile-site-fixes] Applied homepage banner removal, emergency mobile image restoration, and horizontal overflow protection to ${injectedFiles} HTML files.`);
