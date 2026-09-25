(function (w, d) {
  'use strict';
  if (w.lgdsFormsReady) return;
  w.lgdsFormsReady = true;
  var states = new WeakMap();
  function state(form) {
    if (!states.has(form)) states.set(form, { started: false, busy: false, sent: false, id: '' });
    return states.get(form);
  }
  function status(form, text, error) {
    var node = form.querySelector('.lgds-form-status');
    if (!node) {
      node = d.createElement('p'); node.className = 'lgds-form-status'; node.tabIndex = -1;
      form.appendChild(node);
    }
    node.setAttribute('role', error ? 'alert' : 'status');
    node.textContent = text;
    node.hidden = false;
    node.focus({ preventScroll: true });
    return node;
  }
  function source(form) { return form.querySelector('[name="source"]')?.value || 'website'; }
  function submissionsEnabled(form) {
    return form.dataset.lgdsSubmissions === 'production' && /^(www\.)?localgaragedoorsvc\.com$/.test(w.location.hostname);
  }
  function enableForms() {
    d.querySelectorAll('form.service-request-card [type="submit"]').forEach(function (button) { button.disabled = false; });
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', enableForms, { once: true }); else enableForms();
  d.addEventListener('input', function (e) {
    var form = e.target.closest('form.service-request-card');
    if (form && e.target.name === 'phone') e.target.setCustomValidity('');
    if (!e.isTrusted || !form || !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.type === 'hidden' || e.target.name === '_gotcha') return;
    var current = state(form);
    if (!current.started) {
      current.started = true;
      try { w.lgdsMeasurement.event('form_start', { form_source: source(form) }); } catch (_) {}
    }
  }, true);
  d.addEventListener('submit', async function (e) {
    var form = e.target.closest('form.service-request-card');
    if (!form) return;
    e.preventDefault(); e.stopImmediatePropagation();
    var current = state(form);
    if (current.busy || current.sent) return;
    var phone = form.querySelector('[name="phone"]');
    if (phone) {
      var value = phone.value.trim();
      var digits = value.replace(/[^0-9]/g, '');
      phone.setCustomValidity(/^\+?[0-9().\s-]+$/.test(value) && /^\d{10,15}$/.test(digits) ? '' : 'Enter a phone number with 10–15 digits.');
    }
    if (!form.reportValidity()) return;
    if (form.querySelector('[name="_gotcha"]')?.value) return;
    if (!submissionsEnabled(form)) {
      status(form, 'Preview only — this request has not been sent. Please use the live website to request service.', false);
      return;
    }
    current.busy = true;
    current.id = current.id || w.crypto.randomUUID();
    var button = form.querySelector('[type="submit"]');
    var originalLabel = button?.innerHTML;
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }
    form.setAttribute('aria-busy', 'true');
    var payload = new FormData(form);
    var attribution = { landing_page: w.location.href, referrer: d.referrer };
    try { attribution = w.lgdsMeasurement.attribution(); } catch (_) {}
    ['gclid','gbraid','wbraid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(function (key) { payload.set(key, attribution[key] || ''); });
    Object.entries(attribution).forEach(function (entry) { payload.set(entry[0], entry[1]); });
    payload.set('submission_id', current.id);
    payload.set('page_url', w.location.href);
    payload.set('page_service', d.body.dataset.service || source(form));
    payload.set('_subject', 'Website Service Request');
    var controller = new AbortController();
    var timeout = w.setTimeout(function () { controller.abort(); }, 25000);
    try {
      var response = await w.fetch('https://formspree.io/f/xpqqzvwo', {
        method: 'POST', body: payload, headers: { Accept: 'application/json' }, signal: controller.signal
      });
      // Reject HTML error pages, failed validation and unconfirmed/challenge responses.
      var result = await response.json();
      if (!response.ok || !result || result.ok !== true || result.errors?.length) throw new Error('Submission unconfirmed');
      current.sent = true;
      // Both measurement commands are queued only after the server confirmation.
      // Stay on the page; no automatic navigation can cut off either SDK.
      try { w.lgdsMeasurement.lead(current.id, { form_source: source(form), service: d.body.dataset.service || source(form) }); } catch (_) {}
      form.querySelectorAll('input,select,textarea,button').forEach(function (field) { field.disabled = true; });
      if (button) button.textContent = 'Request received';
      status(form, 'Thanks — we received your request. We’ll contact you to confirm the issue, location and service availability.', false);
    } catch (_) {
      var node = status(form, 'We could not confirm that your request was received. Your details are still here. Please call ', true);
      var call = d.createElement('a'); call.href = 'tel:2674386494'; call.dataset.lgdsPhone = '';
      var number = d.createElement('span'); number.dataset.lgdsPhoneText = ''; number.textContent = '(267) 438-6494'; call.appendChild(number);
      node.appendChild(call); node.appendChild(d.createTextNode(' or try again.'));
      try { w.lgdsMeasurement.applyPhoneNumber(); } catch (_) {}
      if (button) { button.disabled = false; button.innerHTML = originalLabel; }
    } finally {
      w.clearTimeout(timeout); current.busy = false; form.removeAttribute('aria-busy');
    }
  }, true);
  d.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    var eventName = /^tel:/.test(href) ? 'phone_click' : /wa.me\//.test(href) ? 'whatsapp_click' : /^#service-request/.test(href) ? 'request_click' : '';
    if (eventName) { try { w.lgdsMeasurement.event(eventName, { placement: link.closest('.mobile-cta') ? 'mobile_sticky' : link.closest('header') ? 'header' : 'page' }); } catch (_) {} }
    if (href.charAt(0) === '#') {
      var nav = link.closest('details.mobile-nav'); if (nav) nav.open = false;
    }
  });
})(window, document);
