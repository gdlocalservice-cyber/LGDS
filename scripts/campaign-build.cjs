'use strict';
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const campaigns = require('../site/campaigns.cjs');
const campaignSections = require('../site/campaign-sections.cjs');
const preferredSources = require('../site/preferred-sources.cjs');
const pageQuality = require('../site/page-quality.cjs');
const editorial = require('../site/editorial.cjs');
const dir = path.resolve(process.argv[2] || 'dist');
const domain = 'https://www.localgaragedoorsvc.com';
const production = process.env.CONTEXT === 'production';
if (production && process.env.LGDS_RELEASE_APPROVED !== '1') throw new Error('Release blocked: Itzik must approve the completed preview before setting LGDS_RELEASE_APPROVED=1. Live form, conversion and Preferred Sources checks follow the approved release.');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const files = fs.readdirSync(dir, {recursive:true}).filter(p=>p.endsWith('.html'));
const routes = new Set(files.filter(p=>p.endsWith('index.html')).map(p=>'/'+p.slice(0,-10)));
campaigns.forEach(p=>routes.add('/ads/'+p.slug+'/'));
const legacy = {};
for (const line of fs.readFileSync(path.join(dir,'_redirects'),'utf8').split('\n')) {
  const [from,to] = line.trim().split(/\s+/);
  if (from?.startsWith('/') && to?.startsWith('/')) legacy[from] = to === '/' ? '/' : to.replace(/\/$/,'')+'/';
}
legacy['/services/roller-repair'] = '/services/garage-door-roller-hinge-repair/';
legacy['/services/roller-repair/'] = '/services/garage-door-roller-hinge-repair/';
const routeList = [...routes].sort();
fs.writeFileSync('site/routes.mjs', `// Generated from the actual exported pages and legacy redirects.\nconst routes = new Set(${JSON.stringify(routeList)});\nconst legacy = ${JSON.stringify(legacy,null,2)};\nexport function canonicalPath(p) {\n  if (legacy[p]) return legacy[p];\n  if (p.endsWith('/index.html') && routes.has(p.slice(0,-10))) return p.slice(0,-10);\n  if (p.endsWith('.html') && routes.has(p.slice(0,-5)+'/')) return p.slice(0,-5)+'/';\n  if (!p.endsWith('/') && routes.has(p+'/')) return p+'/';\n  return p;\n}\n`);
function normalHref(href) {
  if (!href || href.startsWith('#')) return href;
  let u; try {u = new URL(href,domain);} catch {return href;}
  if (!['www.localgaragedoorsvc.com','localgaragedoorsvc.com'].includes(u.hostname)) return href;
  let p = legacy[u.pathname] || u.pathname;
  if (p.endsWith('/index.html')) p=p.slice(0,-10);
  if (p.endsWith('.html') && routes.has(p.slice(0,-5)+'/')) p=p.slice(0,-5)+'/';
  if (!p.endsWith('/') && routes.has(p+'/')) p+='/';
  return p+u.search+u.hash;
}
const home=cheerio.load(fs.readFileSync(path.join(dir,'index.html'),'utf8'));
const reviewMap = require('../site/approved-reviews.json');
const brand = home('header .brand').first().toString();
const brands = home('.trusted-brands').first().toString();
const consent = home('form .form-consent').first().toString();
const sticky = home('.mobile-cta').first().toString().replace('/#service-request-form','#service-request');
const cssPath = '/_next/static/chunks/'+fs.readdirSync(path.join(dir,'_next/static/chunks')).find(n=>n.endsWith('.css'));
const commonFaq=[
 ['Do you serve my ZIP code?', 'Service coverage and availability vary by location. Call us or submit your ZIP code and we’ll confirm whether service is currently available in your area.'],
 ['Will I know the price before work begins?', 'The technician diagnoses the issue, explains the available options and reviews pricing before approved work begins.'],
 ['What happens after I request service?', 'We contact you to confirm the issue, service location and appointment availability. A submitted form is a service request and does not automatically confirm an appointment.']
];
const call = '<a class="button button-gold" href="tel:2674386494">Call 267-438-6494</a>';
const actions = `<div class="ads-actions">${call}<a class="button button-outline" href="#service-request">Request Service</a></div>`;
for (const page of campaigns) {
  const canonical=domain+'/ads/'+page.slug+'/';
  const faq=[...commonFaq,...(page.extraFaqs || [])];
  // Owner approved reuse of the main site's hero, including its mobile source.
  const image = home('main picture').first().toString();
  if (!image) throw new Error('Missing approved homepage hero');
  const workPhoto=page.workPhoto;
  if(!workPhoto || !fs.existsSync(path.join(dir,workPhoto.src.slice(1)))) throw new Error('Missing selected project photo for '+page.slug);
  const workImage=`<figure class="ads-work-photo"><img src="${esc(workPhoto.src)}" width="${workPhoto.width}" height="${workPhoto.height}" loading="lazy" decoding="async" alt="${esc(workPhoto.alt)}"></figure>`;
  const snippets=page.reviews.map(initials=>{if(!reviewMap[initials])throw new Error('Missing approved review '+initials);return `<blockquote><span class="ads-quote-mark" aria-hidden="true">“</span><p>“${esc(reviewMap[initials])}”</p><cite><span class="ads-review-avatar" aria-hidden="true">${esc(initials.split(' ').map(n=>n[0]).join(''))}</span><span><strong>${esc(initials)}</strong><small>Google review excerpt</small></span></cite></blockquote>`;}).join('');
  const form=`<form class="service-request-card" id="service-request" name="service-request" method="POST"><input type="text" name="_gotcha" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" aria-label="Leave this field empty"><input type="hidden" name="source" value="ads_${esc(page.slug)}"><h2>Request Service</h2><p>Tell us the issue and your ZIP code.</p><label><span>Name</span><input name="name" autocomplete="name" required maxlength="120"></label><div class="request-row"><label><span>Phone</span><input name="phone" type="tel" autocomplete="tel" required maxlength="30"></label><label><span>ZIP code</span><input name="zip" inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{5}" maxlength="5" required></label></div><label><span>Problem type</span><select name="issue" required><option value="">Choose a problem</option>${page.problems.map(p=>`<option>${esc(p)}</option>`).join('')}</select></label><label><span>Additional details <em>Optional</em></span><textarea name="details" maxlength="4000"></textarea></label>${consent}<button class="button button-gold" type="submit">Request Service</button></form>`;
  const schema={'@context':'https://schema.org','@type':'Service','@id':canonical+'#service',name:page.title,serviceType:page.title,url:canonical,provider:{'@type':'HomeAndConstructionBusiness',name:'Local Garage Door Service',url:domain+'/',telephone:'+12674386494'},areaServed:['Selected communities in Pennsylvania','Selected communities in New Jersey','Selected communities in Delaware']};
  const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(page.title)} | Local Garage Door Service</title><meta name="description" content="${esc(page.hero)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="noindex, follow"><link rel="stylesheet" href="${cssPath}"><link rel="preload" as="font" href="/assets/fonts/montserrat-latin-variable.woff2" type="font/woff2" crossorigin><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body class="ads-page" data-service="${page.slug}"><a class="skip-link" href="#main">Skip to content</a>${production?'':'<p class="ads-preview-note">Preview for review — requests and advertising events are not sent.</p>'}<header class="ads-header">${brand}<div class="ads-header-actions"><a class="header-phone" href="tel:2674386494">267-438-6494</a><a class="button button-gold" href="tel:2674386494">Call Now</a></div></header><main id="main" class="ads-main"><section class="ads-hero"><div class="ads-intro"><p class="eyebrow">Local Garage Door Service</p><h1>${esc(page.h1)}</h1><p class="ads-lead">${esc(page.hero)}</p>${actions}<blockquote class="ads-opening-review"><p>“${esc(reviewMap[page.reviews[0]].split(/(?<=[.!?]) /)[0])}”</p><cite>${esc(page.reviews[0])} · Google review excerpt</cite></blockquote><p class="ads-trust">Licensed · Insured · Bonded · Pricing Reviewed Before Approved Work</p></div><div class="ads-request">${form}</div><figure class="ads-photo">${image}</figure></section>${campaignSections({page,workImage,snippets,brands,faq,actions})}</main><footer class="ads-footer"><div class="ads-footer-grid"><div><strong>Local Garage Door Service</strong><p>A DBA of GALMOR LLP</p><p><a href="tel:2674386494">267-438-6494</a></p><p>Licensed · Insured · Bonded</p><p>PA HIC #PA220090 · NJ HICB #13VH14099400</p></div><div><strong>Operating hours — Eastern Time</strong><p>Sunday–Thursday: 7:00 AM–10:00 PM</p><p>Friday: 7:00 AM–5:00 PM</p><p>Saturday: Closed</p><nav class="legal-links" aria-label="Footer"><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms</a><a href="/reviews/">Reviews</a><a href="/locations/">Service Areas</a></nav></div></div></footer>${sticky}</body></html>`;
  const output=path.join(dir,'ads',page.slug,'index.html');fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,html);files.push('ads/'+page.slug+'/index.html');
}
const settings={measurementEnabled:production,submissionsEnabled:production,verification:false};
// Forms and measurement are installed once in every document, before interaction.
fs.writeFileSync(path.join(dir,'lgds-measurement.js'),fs.readFileSync('site/measurement.js','utf8').replace('__LGDS_SETTINGS__',JSON.stringify(settings)));
fs.copyFileSync('site/forms.js',path.join(dir,'lgds-forms.js'));
fs.copyFileSync('site/campaign.css',path.join(dir,'lgds-campaign.css'));
const recoveryPath=path.join(dir,'recovery-interactions.js');
let recovery=fs.readFileSync(recoveryPath,'utf8');
recovery=recovery.replace(/  function attribution\(\) \{[\s\S]*?(?=  function initialize\(\))/, '').replace('    prepareForms();','').replace('a[href="#service-request"]','a[href="#service-request-form"]');
recovery=recovery.replace("if (typeof window.gtag === 'function') window.gtag('event', name, parameters || {});", "try { window.lgdsMeasurement.event(name, parameters || {}); } catch (_) {}");
const comparisonState="candidate.classList.toggle('active', candidate === button);";
if(!recovery.includes(comparisonState)) throw new Error('Missing before/after comparison state update');
recovery=recovery.replace(comparisonState,comparisonState+"\n            candidate.setAttribute('aria-pressed', String(candidate === button));");
fs.writeFileSync(recoveryPath,recovery);
let linksUpdated=0; let formsUpdated=0;
let removedPreloads=0;
for(const file of files) {
  const p=path.join(dir,file); const $=cheerio.load(fs.readFileSync(p,'utf8'));
  const ads=file.startsWith('ads/'); const route=file==='index.html'?'/':'/'+file.replace(/index\.html$/,'');
  // The archive is a static Next export, with a separate interaction layer already in place.
  // Remove hydration on all pages so it cannot restore stale CTAs, duplicate tags or forms.
  $('script').each((_,el)=>{const s=$(el);if(s.attr('id')==='lgds-regional-consent-bootstrap'||(s.attr('src')||'').startsWith('/_next/')||s.text().includes('self.__next_f'))s.remove();});
  $('link[as=script][href^="/_next/"]').remove();
  $('meta[name=generator]').remove();
  $('p').filter((_,e)=>$(e).text()==='Selected excerpts are shown as lightweight page content so customer proof does not slow the site with a third-party review widget.').text('Read selected experiences from customers who contacted Local Garage Door Service for repair or installation.');
  if(file==='privacy/index.html') {
    $('li').filter((_,e)=>$(e).text().startsWith('Analytics and advertising:')).text('Analytics and advertising: We may use Google Analytics, Google Ads and the OpenAI advertising measurement pixel to understand website and campaign performance. We record service-request conversions only after our form provider confirms receipt; names, phone numbers and request details are not included in these analytics events. Regional privacy controls restrict Google analytics and advertising storage in the European Economic Area, the United Kingdom and Switzerland. OpenAI measurement remains disabled unless a U.S. visit is confirmed. Global Privacy Control signals disable OpenAI measurement and restrict Google analytics and advertising storage.');
  }
  const form=$('form.service-request-card').first();
  if(form.length) {
    form.attr('id',ads?'service-request':'service-request-form').attr('action','https://formspree.io/f/xpqqzvwo').attr('data-lgds-submissions',production?'production':'preview').removeAttr('data-netlify').removeAttr('netlify-honeypot');
    form.find('[name=form-name]').remove();
    if(!production){form.find('[type=submit]').attr('disabled','');form.attr('action','#'+form.attr('id'));}
    form.append('<noscript><p>Please enable JavaScript or call <a href="tel:2674386494">267-438-6494</a> to request service.</p></noscript>');
    formsUpdated++;
  }
  $('a[href]').each((_,el)=>{const a=$(el),old=a.attr('href'); let href=normalHref(old);
    if(form.length && (/^(\/)?#(service-request(?:-form)?|request)$/.test(href)|| /^(\/)?#service-request(?:-form)?$/.test(old))) href='#'+form.attr('id');
    if(href!==old){a.attr('href',href);linksUpdated++;}
    if(/^tel:/.test(href)){
      a.attr('data-lgds-phone','');
      a.contents().filter((_,n)=>n.type==='text'&&/267[- ]?438[- ]?6494/.test(n.data)).each((_,n)=>{ $(n).replaceWith(n.data.replace(/267[- ]?438[- ]?6494/g,'<span data-lgds-phone-text>267-438-6494</span>')); });
    }
  });
  if(!ads && form.length && file.startsWith('services/')) {
    const request=$('a[href="#service-request-form"]').filter((_,a)=>!$(a).closest('header,.mobile-cta,footer').length).first();
    request.parent().after('<p class="lgds-coverage">Serving selected communities in Pennsylvania, New Jersey and Delaware. Enter your ZIP code or call to confirm coverage and current availability.</p>');
  }
  if(routes.has(route)) $('link[rel=canonical]').attr('href',domain+route);
  $('meta[property="og:url"]').each((_,el)=>$(el).attr('content',domain+route));
  $('script[type="application/ld+json"]').each((_,el)=>{let j=JSON.parse($(el).text()); function fix(v){if(Array.isArray(v))return v.map(fix);if(v&&typeof v==='object'){for(const k of Object.keys(v))v[k]=fix(v[k]);return v;}if(typeof v==='string'&&v.startsWith(domain)) return domain+normalHref(v);return v;}$(el).text(JSON.stringify(fix(j)));});
  $('head').append('<script id="lgds-measurement" src="/lgds-measurement.js"></script><script id="lgds-forms" defer src="/lgds-forms.js"></script><link rel="stylesheet" href="/lgds-campaign.css">');
  if(!production){$('meta[name=robots]').remove();$('head').append('<meta name="robots" content="noindex, follow">');}
  preferredSources($,{production,file});
  editorial($,file);
  removedPreloads+=pageQuality($).removedPreloads;
  fs.writeFileSync(p,$.html());
}
// Preserve only actual indexable routes; paid pages and internal confirmation pages are excluded.
const sitemap=cheerio.load(fs.readFileSync(path.join(dir,'sitemap.xml'),'utf8'),{xmlMode:true});
const urls=[...new Set(sitemap('loc').map((_,el)=>domain+normalHref(sitemap(el).text())).get())].filter(u=>!u.includes('/ads/'));
fs.writeFileSync(path.join(dir,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>`  <url><loc>${esc(u)}</loc></url>`).join('\n')+'\n</urlset>\n');
fs.writeFileSync(path.join(dir,'_redirects'),'# Canonical paths and legacy redirects are handled by canonical-path.ts.\n');
if(!production) {
  fs.appendFileSync(path.join(dir,'_headers'),'\n/*\n  X-Robots-Tag: noindex, follow\n');
  fs.mkdirSync(path.join(dir,'__review__'),{recursive:true});
  fs.copyFileSync('site/review.html',path.join(dir,'__review__/index.html'));
}
fs.writeFileSync(path.join(dir,'lgds-build.json'),JSON.stringify({mode:production?'production':'preview',pages:files.length,forms:formsUpdated,normalizedLinks:linksUpdated,photoSelected:true,photoSource:'Existing LGDS project images, selected at owner request'},null,2));
console.log(`[campaigns] Built ${campaigns.length} paid pages; updated ${formsUpdated} forms and ${linksUpdated} links; removed ${removedPreloads} unused/duplicate preloads. Mode: ${production?'production':'isolated preview'}.`);
