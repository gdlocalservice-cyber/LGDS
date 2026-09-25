(function (w, d) {
  'use strict';
  if (w.lgdsMeasurement) return;
  var settings = __LGDS_SETTINGS__;
  var productionHost = /^(www\.)?localgaragedoorsvc\.com$/.test(w.location.hostname);
  var live = settings.measurementEnabled && productionHost;
  var memory = {};
  var storageAvailable = true;
  function read(key) {
    try { return w.sessionStorage.getItem(key) || memory[key] || null; }
    catch (_) { storageAvailable = false; return memory[key] || null; }
  }
  function write(key, value) {
    memory[key] = value;
    try { w.sessionStorage.setItem(key, value); }
    catch (_) { storageAvailable = false; }
  }
  function json(value, fallback) { try { return JSON.parse(value) || fallback; } catch (_) { return fallback; } }
  var attribution = json(read('lgds_attribution_v2'), null);
  var params = new URLSearchParams(w.location.search);
  var incoming = {};
  params.forEach(function (value, key) {
    if (/^(gclid|gbraid|wbraid|oppref|utm_[a-z0-9_]+)$/.test(key) && value) incoming[key] = value.slice(0, 2000);
  });
  // A new ad click replaces the whole campaign; ordinary navigation preserves it.
  var newClick = ['gclid','gbraid','wbraid','oppref'].some(function (key) { return incoming[key] && incoming[key] !== attribution?.[key]; });
  if (!attribution || newClick || (!attribution.has_campaign && Object.keys(incoming).length)) {
    attribution = Object.assign({ landing_page: w.location.href, referrer: d.referrer, has_campaign: !!Object.keys(incoming).length }, incoming);
    write('lgds_attribution_v2', JSON.stringify(attribution));
  }
  var evidence = [];
  var delivered = json(read('lgds_measured_leads_v2'), {});
  var forwarding = null;
  var openaiAllowed = false;
  var openaiRegionResolved = false;
  var pendingOpenai = new Set();
  var privacyOptOut = w.navigator.globalPrivacyControl === true;
  function sendOpenai(id) {
    if (!openaiRegionResolved) { pendingOpenai.add(id); return; }
    if (!openaiAllowed) return;
    var record = delivered[id] || {};
    if (record.openai) return;
    w.oaiq('measure', 'lead_created', { type: 'customer_action' }, { event_id: id });
    record.openai = true;
    delivered[id] = record;
    write('lgds_measured_leads_v2', JSON.stringify(delivered));
  }
  function applyPhoneNumber() {
    if (!forwarding) return;
    d.querySelectorAll('[data-lgds-phone]').forEach(function (link) {
      link.setAttribute('href', 'tel:' + forwarding.number);
      var label = link.getAttribute('aria-label');
      if (label) {
        var template = link.getAttribute('data-lgds-phone-label') || label;
        link.setAttribute('data-lgds-phone-label', template);
        link.setAttribute('aria-label', template.replace(/(?:\+?1[ .-]?)?\(?267\)?[ .-]?438[ .-]?6494/g, forwarding.formatted));
      }
    });
    d.querySelectorAll('[data-lgds-phone-text]').forEach(function (node) { node.textContent = forwarding.formatted; });
  }
  function phoneCallback(formatted, number) {
    var digits = String(number || '').replace(/[^0-9+]/g, '');
    if (!/^\+?\d{10,15}$/.test(digits)) return;
    var national = digits.replace(/^\+/, '');
    if (national.length === 11 && national.charAt(0) === '1') national = national.slice(1);
    var display = national.length === 10 ? '(' + national.slice(0,3) + ') ' + national.slice(3,6) + '-' + national.slice(6) : String(formatted || number);
    forwarding = { formatted: display, number: digits };
    applyPhoneNumber();
  }
  function event(name, parameters) {
    var fields = Object.assign({ send_to: 'G-TVGZZ0WFTH' }, parameters || {});
    if (settings.verification) fields.debug_mode = true;
    if (live) w.gtag('event', name, fields);
    else evidence.push({ destination: 'ga4', event: name, parameters: fields });
  }
  function lead(id, parameters) {
    if (!id) return;
    var record = delivered[id] || {};
    if (!record.ga4) {
      try { event('generate_lead', Object.assign({ submission_id: id, transport_type: 'beacon' }, parameters)); record.ga4 = true; } catch (_) {}
    }
    if (!record.openai) {
      try {
        if (live) { delivered[id] = record; sendOpenai(id); }
        else { evidence.push({ destination: 'openai', event: 'lead_created', parameters: { type: 'customer_action' } }); record.openai = true; }
      } catch (_) {}
    }
    delivered[id] = record;
    // Only opaque submission IDs and delivery flags are stored, never form contents.
    var ids = Object.keys(delivered);
    ids.slice(0, Math.max(0, ids.length - 100)).forEach(function (key) { delete delivered[key]; });
    write('lgds_measured_leads_v2', JSON.stringify(delivered));
  }
  w.lgdsMeasurement = {
    event: event, lead: lead, applyPhoneNumber: applyPhoneNumber,
    attribution: function () { var copy = Object.assign({}, attribution); delete copy.has_campaign; return copy; },
    submissionsEnabled: settings.submissionsEnabled && productionHost,
    verification: settings.verification,
    // Preview evidence is local only; debug mode is not a substitute for a sandbox.
    previewEvents: evidence
  };
  if (live) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };
    var consentDefault = privacyOptOut ? 'denied' : 'granted';
    w.gtag('consent', 'default', { ad_storage: consentDefault, analytics_storage: consentDefault, ad_user_data: consentDefault, ad_personalization: consentDefault });
    w.gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','CH','GB'] });
    w.gtag('js', new Date());
    w.gtag('config', 'GT-NGJ3Z7QQ', { send_page_view: false });
    w.gtag('config', 'G-TVGZZ0WFTH', { send_page_view: false });
    w.gtag('config', 'AW-17878825273', { send_page_view: false });
    w.gtag('config', 'AW-17878825273/TxwGCJyr6-IcELnypM1C', {
      send_page_view: false, phone_conversion_number: '267-438-6494', phone_conversion_callback: phoneCallback
    });
    var google = d.createElement('script');
    google.id = 'lgds-gtag'; google.async = true;
    google.src = 'https://www.googletagmanager.com/gtag/js?id=GT-NGJ3Z7QQ';
    d.head.appendChild(google);
    if (!privacyOptOut && typeof w.fetch === 'function') {
      var regionController = new AbortController();
      var regionTimeout = w.setTimeout(function () { regionController.abort(); }, 5000);
      w.fetch('/lgds-measurement-region', { credentials: 'same-origin', cache: 'no-store', signal: regionController.signal })
        .then(function (response) { if (!response.ok) throw new Error('Region unavailable'); return response.json(); })
        .then(function (result) {
          openaiRegionResolved = true;
          openaiAllowed = result?.openaiMeasurementAllowed === true;
          if (openaiAllowed && w.navigator.globalPrivacyControl !== true) {
            // Load only after eligibility is confirmed. Never reset consent on navigation:
            // consent(false) deletes the SDK's attribution cookies.
            !function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;d.head.appendChild(j)}(w,d,'script','https://bzrcdn.openai.com/sdk/oaiq.min.js');
            w.oaiq('init', { pixelId: 'QEWL68vbdMGYqEuE22V49Y', debug: !!settings.verification });
            pendingOpenai.forEach(function (id) { try { sendOpenai(id); } catch (_) {} });
          }
          pendingOpenai.clear();
        })
        .catch(function () { openaiRegionResolved = true; pendingOpenai.clear(); })
        .finally(function () { w.clearTimeout(regionTimeout); });
    } else openaiRegionResolved = true;
  }
  function ready() {
    event('page_view', { page_title: d.title, page_location: w.location.href });
    applyPhoneNumber();
    if (!storageAvailable && attribution.has_campaign) {
      // A usable fallback for browsers that prohibit sessionStorage.
      d.querySelectorAll('a[href]').forEach(function (link) {
        var url;
        try { url = new URL(link.getAttribute('href'), w.location.href); } catch (_) { return; }
        if (url.origin !== w.location.origin || link.getAttribute('href').charAt(0) === '#') return;
        Object.keys(attribution).forEach(function (key) { if (/^(gclid|gbraid|wbraid|oppref|utm_)/.test(key)) url.searchParams.set(key, attribution[key]); });
        link.href = url.pathname + url.search + url.hash;
      });
    }
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', ready, { once: true }); else ready();
})(window, document);
