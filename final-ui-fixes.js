'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');
if (!fs.existsSync(publishDir)) {
  console.error(`[final-ui-fixes] Publish directory not found: ${publishDir}`);
  process.exit(1);
}

const emergencyImage = '/assets/media/services/emergency-collapsed-garage-door.webp';
const sameDayImage = '/assets/media/services/same-day-garage-door-repair.webp';

const injected = String.raw`<style id="lgds-final-ui-fixes">
html,
body {
  width: 100%;
  max-width: 100%;
  overflow-x: clip !important;
}

input[name="_gotcha"] {
  position: absolute !important;
  left: -10000px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

@media (max-width: 767px) {
  .lgds-mobile-issue-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 12px !important;
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden !important;
    transform: none !important;
  }

  .lgds-mobile-issue-grid .issue-card {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    margin: 0 !important;
    transform: none !important;
  }

  .lgds-mobile-review-grid {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 16px !important;
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden !important;
    transform: none !important;
  }

  .lgds-mobile-review-grid .review-card {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    margin: 0 !important;
    transform: none !important;
  }
}
</style>
<script id="lgds-final-ui-fixes-script">
(function () {
  'use strict';

  var EMERGENCY_IMAGE = '${emergencyImage}';
  var SAME_DAY_IMAGE = '${sameDayImage}';

  function setServiceCardImage(fragment, src, alt) {
    var links = document.querySelectorAll('a[href*="' + fragment + '"]');
    Array.prototype.forEach.call(links, function (link) {
      var node = link;
      var image = null;

      for (var depth = 0; depth < 6 && node && node !== document.body; depth += 1, node = node.parentElement) {
        image = node.querySelector && node.querySelector('img');
        var textLength = ((node.textContent || '').replace(/\s+/g, ' ').trim()).length;
        if (image && textLength < 1200) break;
        image = null;
      }

      if (!image) return;
      image.setAttribute('src', src);
      image.setAttribute('alt', alt);
      image.removeAttribute('srcset');
      image.removeAttribute('data-src');
      image.removeAttribute('data-srcset');
      image.style.objectFit = 'cover';
    });
  }

  function constrainMobileRows() {
    if (window.innerWidth > 767) return;

    var issueCards = document.querySelectorAll('.issue-card');
    Array.prototype.forEach.call(issueCards, function (card) {
      var parent = card.parentElement;
      if (parent && parent.querySelectorAll(':scope > .issue-card').length >= 2) {
        parent.classList.add('lgds-mobile-issue-grid');
      }
    });

    var reviewCards = document.querySelectorAll('.review-card');
    Array.prototype.forEach.call(reviewCards, function (card) {
      var parent = card.parentElement;
      if (parent && parent.querySelectorAll(':scope > .review-card').length >= 2) {
        parent.classList.add('lgds-mobile-review-grid');
      }
    });
  }

  function applyFixes() {
    setServiceCardImage(
      'emergency-garage-door-service',
      EMERGENCY_IMAGE,
      'Severely damaged garage door requiring emergency service'
    );
    setServiceCardImage(
      'same-day-garage-door-service',
      SAME_DAY_IMAGE,
      'Garage door technician completing a same-day repair appointment'
    );
    constrainMobileRows();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyFixes, { once: true });
  } else {
    applyFixes();
  }

  window.addEventListener('load', applyFixes, { once: true });
  var observer = new MutationObserver(applyFixes);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(function () { observer.disconnect(); }, 15000);
})();
</script>`;

function walk(directory) {
  const results = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...walk(fullPath));
    else if (entry.isFile()) results.push(fullPath);
  }
  return results;
}

let changed = 0;
let htmlCount = 0;
let injectedCount = 0;

for (const file of walk(publishDir)) {
  const extension = path.extname(file).toLowerCase();
  if (!['.html', '.js', '.json', '.txt', '.xml'].includes(extension)) continue;

  let content;
  try { content = fs.readFileSync(file, 'utf8'); } catch { continue; }
  const original = content;

  content = content
    .split('/assets/media/services/emergency-garage-door-card.svg').join(emergencyImage)
    .split('/assets/media/services/emergency-garage-door-inspection.svg').join(emergencyImage);

  if (extension === '.html') {
    htmlCount += 1;

    content = content.replace(/<select\b([^>]*\bname=["']issue["'][^>]*)>/gi, function (match, attrs) {
      return /\baria-label=/i.test(attrs) ? match : `<select${attrs} aria-label="Garage door issue">`;
    });

    content = content.replace(/<input\b([^>]*\bname=["']consent["'][^>]*)>/gi, function (match, attrs) {
      return /\baria-label=/i.test(attrs) ? match : `<input${attrs} aria-label="Consent to be contacted about this service request">`;
    });

    content = content.replace(/<input\b([^>]*\bname=["']_gotcha["'][^>]*)>/gi, function (match, attrs) {
      let updated = attrs;
      if (!/\baria-label=/i.test(updated)) updated += ' aria-label="Leave this field empty"';
      if (!/\baria-hidden=/i.test(updated)) updated += ' aria-hidden="true"';
      if (!/\btabindex=/i.test(updated)) updated += ' tabindex="-1"';
      if (!/\bautocomplete=/i.test(updated)) updated += ' autocomplete="off"';
      return `<input${updated}>`;
    });

    if (!content.includes('id="lgds-final-ui-fixes"')) {
      const updated = content.replace(/<head(\s[^>]*)?>/i, (match) => `${match}${injected}`);
      if (updated !== content) {
        content = updated;
        injectedCount += 1;
      }
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changed += 1;
  }
}

if (injectedCount !== htmlCount) {
  console.error(`[final-ui-fixes] Injected ${injectedCount} of ${htmlCount} HTML files.`);
  process.exit(1);
}

console.log(`[final-ui-fixes] Updated ${changed} files and injected final mobile/image/accessibility fixes into ${injectedCount} HTML pages.`);
