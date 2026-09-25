'use strict';

const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Owner requested 10% for each paid repair page. Military terms match the
// public homepage checked on 2026-09-25. Do not combine the percentages into 17%.
module.exports = function campaignOffer(page, actions) {
  return `<section class="ads-offer" aria-labelledby="repair-offer-heading">
    <div class="ads-offer-heading">
      <p class="ads-offer-amount"><strong>10<span>%</span></strong><span>OFF</span></p>
      <div class="ads-offer-copy"><p class="ads-offer-kicker">Your repair. Your savings.</p><h2 id="repair-offer-heading">${esc(page.title)}</h2><p>Mention this offer when you call or request service.</p></div>
    </div>
    ${actions}
    <div class="ads-military-offer">
      <span class="ads-military-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="m12 2 8 3v6c0 5-5 9-8 11-3-2-8-6-8-11V5l8-3Z"/><path d="m12 6 1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5L12 6Z"/></svg></span>
      <div><p><strong>7% OFF</strong> <span>U.S. Military &amp; Veterans</span></p><p>For active-duty service members and veterans. May be combined with this offer.</p></div>
    </div>
    <p class="ads-offer-terms">Repair offer cannot be combined with other website offers, except the military &amp; veterans offer.</p>
  </section>`;
};
