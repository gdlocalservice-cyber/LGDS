'use strict';

const scriptUrl = 'https://news.google.com/swg/js/v1/publisher.js';
const sourceUrl = 'https://www.google.com/preferences/source?q=localgaragedoorsvc.com';

module.exports = function preferredSources($, {production,file}) {
  if (file.startsWith('ads/')) return;
  // Google infers the site from the current origin. The review domain must
  // therefore use the documented deep link to the actual business instead.
  const button = theme => production
    ? `<div google-add-preferred-source-btn data-theme="${theme}"></div><noscript><a class="lgds-preferred-link" href="${sourceUrl}">Add to Preferred Sources</a></noscript>`
    : `<a class="lgds-preferred-link" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">Add to Preferred Sources <span aria-hidden="true">↗</span></a>`;

  if(production) {
    const existing=$(`script[src="${scriptUrl}"]`);
    if(!existing.length) $('head').append(`<script async src="${scriptUrl}"></script>`);
    else {
      const first=existing.first().attr('async','');
      existing.slice(1).remove();
      if(!first.parent().is('head')) $('head').append(first);
    }
  }
  // This component is independent of measurement and form initialization.
  $('footer').first().append(`<div class="lgds-preferred-source"><p>Find Local Garage Door Service on Google</p>${button('dark')}</div>`);
  if(file.startsWith('blog/')) {
    const card=`<section class="lgds-preferred-guides" aria-labelledby="preferred-guides-heading"><div><p class="lgds-preferred-eyebrow">Helpful guides, easy to find</p><h2 id="preferred-guides-heading">Keep our guides close.</h2><p>Add Local Garage Door Service to your preferred sources on Google.</p></div><div class="lgds-preferred-action">${button('light')}</div></section>`;
    const anchor=file==='blog/index.html' ? $('main .blog-grid').first() : $('main .inner-request-band').first();
    if(!anchor.length) throw new Error('Missing Preferred Sources guide placement: '+file);
    if(file==='blog/index.html') anchor.after(card); else anchor.before(card);
  }
};
