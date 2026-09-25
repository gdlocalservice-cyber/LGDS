'use strict';

const cheerio = require('cheerio');
const display = '(267) 438-6494';
const phone = /(?<!\d)(?:\+?1[ .-]?)?\(?267\)?[ .-]?438[ .-]?6494(?!\d)/g;
const escape = value => value.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

// Format customer-facing text only. Keep tel:/WhatsApp URLs, tag configuration
// and machine-readable telephone fields unchanged.
module.exports = function phoneDisplay($) {
  $('noscript').each((_, element) => {
    const fragment = cheerio.load($(element).html(), {scriptingEnabled:false}, false);
    module.exports(fragment);
    $(element).html(fragment.html());
  });
  $('*').contents().filter((_, node) => node.type === 'text').each((_, node) => {
    if ($(node).parents('script,style,noscript').length) return;
    const formatted = node.data.replace(phone, display);
    if (formatted === node.data && !formatted.includes(display)) return;
    if ($(node.parent).is('[data-lgds-phone-text],title')) node.data = formatted;
    else $(node).replaceWith(escape(formatted).replaceAll(display, '<span data-lgds-phone-text>' + display + '</span>'));
  });
  $('[aria-label],[title],[alt],[placeholder],meta[content]').each((_, element) => {
    for (const key of ['aria-label','title','alt','placeholder','content']) {
      const value = $(element).attr(key);
      if (value) $(element).attr(key, value.replace(phone, display));
    }
  });
  $('script[type="application/ld+json"]').each((_, element) => {
    function format(value, key) {
      if (typeof value === 'string') return ['telephone','url','@id','sameAs'].includes(key) ? value : value.replace(phone, display);
      if (Array.isArray(value)) return value.map(item => format(item, key));
      if (value && typeof value === 'object') for (const name of Object.keys(value)) value[name] = format(value[name], name);
      return value;
    }
    $(element).text(JSON.stringify(format(JSON.parse($(element).text()))));
  });
};
