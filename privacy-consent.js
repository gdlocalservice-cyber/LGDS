'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');
const measurementId = 'G-TVGZZ0WFTH';
const googleTagId = 'GT-NGJ3Z7QQ';
const googleAdsId = 'AW-17878825273';
const restrictedRegions = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'
];

if (!fs.existsSync(publishDir)) {
  console.error(`[privacy-consent] Publish directory not found: ${publishDir}`);
  process.exit(1);
}

const bootstrap = String.raw`<style id="lgds-cookie-banner-suppression">
[id*="cookie" i][class*="banner" i],
[class*="cookie" i][class*="banner" i],
[id*="consent" i][class*="banner" i],
[class*="consent" i][class*="banner" i] {
  display: none !important;
}
</style>
<script id="lgds-regional-consent-bootstrap">
(function () {
  'use strict';

  var MEASUREMENT_ID = '${measurementId}';
  var GOOGLE_TAG_ID = '${googleTagId}';
  var GOOGLE_ADS_ID = '${googleAdsId}';
  var RESTRICTED_REGIONS = ${JSON.stringify(restrictedRegions)};
  var LIVE_HOSTS = {
    'localgaragedoorsvc.com': true,
    'www.localgaragedoorsvc.com': true
  };
  if (!LIVE_HOSTS[window.location.hostname]) return;

  var trackedIds = Object.create(null);
  trackedIds[MEASUREMENT_ID] = true;
  trackedIds[GOOGLE_TAG_ID] = true;
  trackedIds[GOOGLE_ADS_ID] = true;

  window.dataLayer = window.dataLayer || [];
  var nativePush = window.dataLayer.push.bind(window.dataLayer);
  var pageViewQueued = false;
  var consentInitialized = false;

  function commandValue(item, index) {
    try {
      return item && typeof item.length === 'number' ? item[index] : undefined;
    } catch (error) {
      return undefined;
    }
  }

  function targetsAnalytics(params) {
    if (!params || !params.send_to) return true;
    var sendTo = params.send_to;
    if (Array.isArray(sendTo)) return sendTo.indexOf(MEASUREMENT_ID) !== -1 || sendTo.indexOf(GOOGLE_TAG_ID) !== -1;
    if (typeof sendTo === 'string') {
      return sendTo.split(/[\s,]+/).some(function (id) { return !!trackedIds[id]; });
    }
    return false;
  }

  window.dataLayer.push = function () {
    var filtered = [];

    for (var i = 0; i < arguments.length; i += 1) {
      var item = arguments[i];
      var command = commandValue(item, 0);
      var name = commandValue(item, 1);

      if (consentInitialized && command === 'consent' && name === 'default') {
        var consentOptions = commandValue(item, 2);
        if (!consentOptions || !consentOptions.region) continue;
      }

      if (command === 'config' && trackedIds[name]) {
        var currentOptions = commandValue(item, 2);
        var safeOptions = Object.assign({}, currentOptions && typeof currentOptions === 'object' ? currentOptions : {}, {
          send_page_view: false
        });
        try { item[2] = safeOptions; } catch (error) { /* Keep processing. */ }
      }

      if (command === 'event' && name === 'page_view' && targetsAnalytics(commandValue(item, 2))) {
        if (pageViewQueued) continue;
        pageViewQueued = true;
      }

      filtered.push(item);
    }

    return nativePush.apply(window.dataLayer, filtered);
  };

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());

  window.gtag('consent', 'default', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    functionality_storage: 'granted',
    personalization_storage: 'granted',
    security_storage: 'granted'
  });

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    region: RESTRICTED_REGIONS
  });
  consentInitialized = true;

  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  function ensureGoogleTag() {
    if (window.google_tag_manager || document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function sendPageView() {
    if (pageViewQueued) return;
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
      send_to: MEASUREMENT_ID
    });
  }

  function normalizedText(node) {
    return ((node && node.textContent) || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function removeLegacyCookieBanner() {
    var phrase = 'we use cookies for analytics and advertising';
    var candidates = document.querySelectorAll('[id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="consent" i], button');

    for (var i = 0; i < candidates.length; i += 1) {
      var candidate = candidates[i];
      var text = normalizedText(candidate);

      if (candidate.tagName === 'BUTTON' && !/^(accept|decline)$/.test(text)) continue;

      var node = candidate;
      for (var depth = 0; depth < 7 && node && node !== document.body; depth += 1, node = node.parentElement) {
        var nodeText = normalizedText(node);
        if (
          nodeText.indexOf(phrase) !== -1 &&
          nodeText.indexOf('accept') !== -1 &&
          nodeText.indexOf('decline') !== -1 &&
          nodeText.length < 1200
        ) {
          node.remove();
          break;
        }
      }
    }
  }

  ensureGoogleTag();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeLegacyCookieBanner, { once: true });
  } else {
    removeLegacyCookieBanner();
  }

  var observer = new MutationObserver(removeLegacyCookieBanner);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(function () { observer.disconnect(); }, 12000);

  window.setTimeout(ensureGoogleTag, 1200);

  if (document.readyState === 'complete') {
    window.setTimeout(sendPageView, 0);
  } else {
    window.addEventListener('load', function () { window.setTimeout(sendPageView, 0); }, { once: true });
  }
})();
</script>`;

const privacyReplacements = [
  {
    from: 'Last updated July 24, 2026',
    to: 'Last updated July 29, 2026'
  },
  {
    from: 'We use optional cookies and similar technologies to understand website traffic and improve marketing effectiveness. Optional analytics and advertising tags load only after consent on the production domain. You may accept or decline optional cookies through the website banner and may also control cookies through your browser settings. Essential browser storage may still be used for form attribution and preference functionality.',
    to: 'We use cookies and similar technologies to understand website traffic and improve marketing effectiveness. For visitors in the United States, analytics and advertising measurement may begin when a page loads. For visitors in the European Economic Area, the United Kingdom and Switzerland, analytics and advertising storage is disabled by default. You may also control or delete cookies through your browser settings. Essential browser storage may be used for form attribution, security and preference functionality.'
  },
  {
    from: 'Analytics and advertising: We may use Google Analytics and Google Ads to understand website and campaign performance after consent.',
    to: 'Analytics and advertising: We may use Google Analytics and Google Ads to understand website and campaign performance. Regional privacy controls restrict analytics and advertising storage in the European Economic Area, the United Kingdom and Switzerland.'
  },
  {
    from: 'You may decline optional cookies through the website banner and opt out of certain advertising personalization through Google’s ad settings.',
    to: 'You may control or delete cookies through your browser settings and opt out of certain advertising personalization through Google’s ad settings.'
  },
  {
    from: 'Friday: 7 AM–1 PM',
    to: 'Friday: 7 AM–5 PM'
  }
];

let htmlFiles = 0;
let injectedFiles = 0;
let privacyChanges = 0;

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
    let updated = original;

    if (!updated.includes('id="lgds-regional-consent-bootstrap"')) {
      updated = updated.replace(/<head(\s[^>]*)?>/i, function (match) {
        return match + bootstrap;
      });
      if (updated !== original) injectedFiles += 1;
    }

    for (const replacement of privacyReplacements) {
      if (updated.includes(replacement.from)) {
        const before = updated;
        updated = updated.split(replacement.from).join(replacement.to);
        if (updated !== before) privacyChanges += 1;
      }
    }

    if (updated !== original) fs.writeFileSync(fullPath, updated, 'utf8');
  }
}

walk(publishDir);

if (injectedFiles !== htmlFiles) {
  console.error(`[privacy-consent] Injected ${injectedFiles} of ${htmlFiles} HTML files. Aborting to avoid a partial deployment.`);
  process.exit(1);
}

console.log(
  `[privacy-consent] Added regional Google Consent Mode and page-view safeguards to ${injectedFiles} HTML files; applied ${privacyChanges} privacy-policy/content replacements.`
);
