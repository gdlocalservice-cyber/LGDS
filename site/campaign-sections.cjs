'use strict';

const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = {
  shield: '<path d="m12 3 8 3v6c0 4-5 7-8 9-3-2-8-5-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  pricing: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  phone: '<path d="M8 3H5a2 2 0 0 0-2 2c0 9 7 16 16 16a2 2 0 0 0 2-2v-3l-5-2-2 2a13 13 0 0 1-6-6l2-2-2-5Z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
const reasons = [
  ['shield', 'Licensed, Insured and Bonded'],
  ['pricing', 'Repair Options and Pricing Explained Before Approved Work'],
  ['phone', 'Technician Courtesy Call Approximately 30 Minutes Before Arrival'],
  ['pin', 'Service Across Selected Communities in Pennsylvania, New Jersey and Delaware']
];
const steps = [
  ['Send your request', 'Tell us the issue and ZIP code.'],
  ['Confirm availability', 'We confirm the service area and appointment availability.'],
  ['Review your options', 'The technician diagnoses the problem and explains the available options and pricing before approved work begins.']
];

module.exports = function campaignSections({page,workImage,snippets,brands,faq,actions}) {
  return `
  <section class="ads-section ads-services" aria-labelledby="problems-heading">
    <div class="ads-service-copy">
      <p class="ads-kicker">A closer look at the problem</p>
      <h2 id="problems-heading">Problems We Handle</h2>
      <p class="ads-section-lead">${esc(page.intro)}</p>
      <ul class="ads-problems">${page.problems.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>
    </div>
    ${workImage}
  </section>
  <section class="ads-section ads-assurance" aria-labelledby="assurance-heading">
    <p class="ads-kicker">The LGDS approach</p>
    <h2 id="assurance-heading">Why Homeowners Call Local Garage Door Service</h2>
    <ul class="ads-reasons">${reasons.map(([name,text])=>`<li><span class="ads-reason-icon">${icon(name)}</span><h3>${esc(text)}</h3></li>`).join('')}</ul>
    <div class="ads-coverage-note"><p>Enter your ZIP code or call us to confirm service coverage and current availability.</p><a href="#service-request">Check my ZIP code <span aria-hidden="true">→</span></a></div>
  </section>
  <section class="ads-section ads-how" aria-labelledby="process-heading">
    <p class="ads-kicker">From request to repair</p>
    <h2 id="process-heading">How the Service Process Works</h2>
    <ol class="ads-process">${steps.map(([title,text],i)=>`<li><span class="ads-step-number" aria-hidden="true">0${i+1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></li>`).join('')}</ol>
  </section>
  <section class="ads-section ads-testimonials" aria-labelledby="reviews-heading">
    <div class="ads-section-heading"><div><p class="ads-kicker">In our customers’ words</p><h2 id="reviews-heading">Customer Experiences</h2></div><a class="ads-google-profile" href="https://share.google/ArfweksEz68jrQfo9" target="_blank" rel="noopener noreferrer">View our Google profile <span aria-hidden="true">↗</span></a></div>
    <div class="ads-reviews">${snippets}</div>
  </section>
  <section class="ads-section ads-brands">${brands}</section>
  <section class="ads-section ads-faq" aria-labelledby="faq-heading">
    <div><p class="ads-kicker">Before you schedule</p><h2 id="faq-heading">Frequently Asked Questions</h2></div>
    <div class="ads-faq-list">${faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
  </section>
  <section class="ads-section ads-final-cta"><div><p class="ads-kicker">Let’s take the next step</p><h2>Tell us what your door is doing.</h2><p>Call or request service to confirm coverage and availability.</p></div>${actions}</section>`;
};
