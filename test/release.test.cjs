const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const cheerio = require('cheerio');
const campaigns = require('../site/campaigns.cjs');
const base=path.resolve(__dirname,'../dist');
const measurement=fs.readFileSync(path.resolve(__dirname,'../site/measurement.js'),'utf8');
const forms=fs.readFileSync(path.resolve(__dirname,'../site/forms.js'),'utf8');
const tick=()=>new Promise(resolve=>setTimeout(resolve,5));
function browser({url='https://www.localgaragedoorsvc.com/ads/garage-door-repair/',live=true,tracking=true,storage,denyStorage=false,response,usRegion=true,gpc=false}={}) {
  const html=fs.readFileSync(base+'/ads/garage-door-repair/index.html','utf8');
  const dom=new JSDOM(html,{url,runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window; const form=w.document.querySelector('form');
  Object.defineProperty(w.navigator,'globalPrivacyControl',{value:gpc});
  form.dataset.lgdsSubmissions=live?'production':'preview';
  if(storage)for(const [k,v] of Object.entries(storage))w.sessionStorage.setItem(k,v);
  if(denyStorage)Object.defineProperty(w,'sessionStorage',{get(){throw new Error('blocked');}});
  let requests=[];w.fetch=async(url,opts)=>{if(url==='/lgds-measurement-region')return {ok:true,json:async()=>({openaiMeasurementAllowed:usRegion})};requests.push({url,opts,fields:Object.fromEntries(opts.body)});return response?response():{ok:true,json:async()=>({ok:true})};};
  const inputHandlers=[]; const add=w.document.addEventListener.bind(w.document);
  w.document.addEventListener=(type,fn,...rest)=>{if(type==='input')inputHandlers.push(fn);return add(type,fn,...rest);};
  if(tracking)w.eval(measurement.replace('__LGDS_SETTINGS__',JSON.stringify({measurementEnabled:live,submissionsEnabled:live,verification:false})));
  w.eval(forms);
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  return {dom,w,form,requests,inputHandlers,close:()=>w.close()};
}
function fill(b){b.form.elements.name.value='TEST QA';b.form.elements.phone.value='267-555-0100';b.form.elements.zip.value='19401';b.form.elements.issue.selectedIndex=1;b.form.elements.consent.checked=true;}
function submit(b){b.form.dispatchEvent(new b.w.Event('submit',{bubbles:true,cancelable:true}));}
function events(b,name){return (b.w.dataLayer||[]).filter(e=>e[0]==='event'&&e[1]===name);}

test('each paid page matches the approved heading, choices, canonical, CTA and schema',()=>{
 for(const p of campaigns){const $=cheerio.load(fs.readFileSync(base+'/ads/'+p.slug+'/index.html','utf8'));
  assert.equal($('h1').text(),p.h1);assert.equal($('link[rel=canonical]').attr('href'),'https://www.localgaragedoorsvc.com/ads/'+p.slug+'/');
  assert.equal($('meta[name=robots]').attr('content'),'noindex, follow');assert.deepEqual($('select option').slice(1).map((_,e)=>$(e).text()).get(),p.problems);
  assert.equal($('form').length,1);assert.equal($('input[name=zip]').attr('pattern'),'[0-9]{5}');assert.equal($('form').attr('id'),'service-request');
  assert.equal($('header nav,.breadcrumbs').length,0);assert.equal($('script#lgds-measurement').length,1);assert.equal($('script#lgds-forms').length,1);
  assert.equal($('a').filter((_,e)=>/Request/.test($(e).text())&&$(e).attr('href')!=='#service-request').length,0);
  assert.equal($('[type="application/ld+json"]').length,1);const schema=JSON.parse($('[type="application/ld+json"]').text());assert.equal(schema['@type'],'Service');assert.ok(!schema.aggregateRating&&!schema.review);
  assert.equal($('.ads-reviews blockquote').length,2);assert.ok(!/24\/7|Free Estimate|guaranteed arrival/i.test($('body').text()));
 }
});
test('all 62 pages keep working local assets/links and exactly one measurement/forms owner',()=>{
 const files=fs.readdirSync(base,{recursive:true}).filter(p=>p.endsWith('.html')&&!p.startsWith('__review__/'));
 assert.equal(files.length,62);
 for(const p of files){const $=cheerio.load(fs.readFileSync(base+'/'+p,'utf8'));
  assert.equal($('script#lgds-measurement').length,1,p);assert.equal($('script[src^="/_next/"]').length,0,p);
  const ids=new Set();$('[id]').each((_,e)=>{const id=$(e).attr('id');assert.ok(!ids.has(id),p+' duplicate id '+id);ids.add(id);});
  const form=$('form.service-request-card');if(form.length){assert.equal(form.attr('id'),p.startsWith('ads/')?'service-request':'service-request-form');assert.equal($('a[href="/#service-request-form"]').length,0,p);}
  $('[src],link[href],a[href]').each((_,e)=>{const raw=$(e).attr('src')||$(e).attr('href');if(!raw?.startsWith('/')||raw.startsWith('//'))return;const u=new URL(raw,'https://local.test');const local=path.join(base,decodeURIComponent(u.pathname));assert.ok(fs.existsSync(local)||fs.existsSync(local+'.html'),p+' missing '+raw);if(u.hash&&u.pathname==='/'){/* homepage anchors separately covered */}});
 }
});
test('sitemap excludes paid pages, contains 54 canonical slash URLs and robots permits AdsBot',()=>{
 const $=cheerio.load(fs.readFileSync(base+'/sitemap.xml','utf8'),{xmlMode:true});assert.equal($('loc').length,54);
 $('loc').each((_,e)=>{const u=$(e).text();assert.ok(u.endsWith('/'));assert.ok(!u.includes('/ads/'));});
 assert.ok(!/Disallow:\s*\/(?:ads|\s*$)/m.test(fs.readFileSync(base+'/robots.txt','utf8')));
});
test('a successful response produces exactly one lead per destination after receipt',async()=>{
 let finish;const b=browser({response:()=>new Promise(r=>finish=r)});fill(b);submit(b);submit(b);
 assert.equal(b.requests.length,1);assert.equal(events(b,'generate_lead').length,0);assert.equal(b.form.querySelector('[type=submit]').disabled,true);
 finish({ok:true,json:async()=>({ok:true})});await tick();submit(b);
 assert.equal(events(b,'generate_lead').length,1);assert.equal(b.w.oaiq.q.filter(e=>e[0]==='measure'&&e[1]==='lead_created').length,1);assert.equal(b.requests.length,1);
 assert.match(b.form.textContent,/Thanks — we received your request/);assert.ok(b.requests[0].fields.submission_id);
 const id=b.requests[0].fields.submission_id;b.w.lgdsMeasurement.lead(id,{});assert.equal(events(b,'generate_lead').length,1);
 assert.ok(!('zip' in events(b,'generate_lead')[0][2]));b.close();
});
for(const [label,response] of [
 ['server error',async()=>({ok:false,json:async()=>({ok:false})})],
 ['unconfirmed 200',async()=>({ok:true,json:async()=>({})})],
 ['HTML instead of JSON',async()=>({ok:true,json:async()=>{throw new Error('html');}})],
 ['network failure',async()=>{throw new Error('offline');}]
]) test(label+' preserves details, unlocks the button and records no lead',async()=>{const b=browser({response});fill(b);submit(b);await tick();assert.equal(events(b,'generate_lead').length,0);assert.equal(b.form.elements.name.value,'TEST QA');assert.equal(b.form.querySelector('[type=submit]').disabled,false);assert.ok(b.form.querySelector('[role=alert] a[href^="tel:"]'));assert.equal(b.requests.length,1);b.close();});
test('invalid form and unchecked consent produce neither requests nor conversions',async()=>{const b=browser();submit(b);fill(b);b.form.elements.consent.checked=false;submit(b);b.form.elements.consent.checked=true;b.form.elements.zip.value='1234';submit(b);await tick();assert.equal(b.requests.length,0);assert.equal(events(b,'generate_lead').length,0);b.close();});
test('preview sends no lead or tracking request, including on a production hostname',async()=>{const b=browser({live:false});fill(b);submit(b);await tick();assert.equal(b.requests.length,0);assert.equal(b.w.document.querySelectorAll('script[src*="googletagmanager"],script[src*="bzrcdn"]').length,0);assert.match(b.form.textContent,/has not been sent/);b.close();});
test('a production artifact also stays isolated when opened at a preview hostname',async()=>{const b=browser({url:'https://deploy-preview.example/ads/garage-door-repair/'});fill(b);submit(b);await tick();assert.equal(b.requests.length,0);assert.equal(b.w.dataLayer,undefined);b.close();});
test('blocked measurement script does not stop a customer from submitting',async()=>{const b=browser({tracking:false});fill(b);submit(b);await tick();assert.equal(b.requests.length,1);assert.match(b.form.textContent,/Thanks — we received/);b.close();});
test('campaign attribution survives a logo/homepage navigation and includes both braid IDs',async()=>{
 const first=browser({url:'https://www.localgaragedoorsvc.com/ads/garage-door-repair/?gclid=TEST-G&gbraid=TEST-GB&wbraid=TEST-WB&utm_source=google&utm_medium=cpc&utm_campaign=repair&utm_term=spring&utm_content=a'});
 const store=Object.fromEntries(Object.keys(first.w.sessionStorage).map(k=>[k,first.w.sessionStorage.getItem(k)]));const initial=first.w.location.href;first.close();
 const b=browser({url:'https://www.localgaragedoorsvc.com/',storage:store});fill(b);submit(b);await tick();const f=b.requests[0].fields;assert.equal(f.gbraid,'TEST-GB');assert.equal(f.wbraid,'TEST-WB');assert.equal(f.landing_page,initial);assert.equal(f.page_url,'https://www.localgaragedoorsvc.com/');b.close();
});
test('denied sessionStorage preserves campaign params in internal links without crashing forms',async()=>{const b=browser({url:'https://www.localgaragedoorsvc.com/ads/garage-door-repair/?gclid=TEST',denyStorage:true});assert.match(b.w.document.querySelector('a.brand').href,/gclid=TEST/);fill(b);submit(b);await tick();assert.equal(b.requests[0].fields.gclid,'TEST');b.close();});
test('form_start requires user interaction, happens once, and is never a lead',()=>{const b=browser();const input=b.form.elements.name;input.dispatchEvent(new b.w.Event('input',{bubbles:true}));assert.equal(events(b,'form_start').length,0);for(const fn of b.inputHandlers){fn({target:input,isTrusted:true});fn({target:input,isTrusted:true});}assert.equal(events(b,'form_start').length,1);assert.equal(events(b,'generate_lead').length,0);b.close();});
test('call links work before tracking loads; callback updates displayed and dialed numbers together',()=>{const b=browser();const links=[...b.w.document.querySelectorAll('[data-lgds-phone]')];assert.ok(links.length>=5);assert.ok(links.every(l=>l.getAttribute('href')==='tel:2674386494'));
 const config=b.w.dataLayer.find(e=>e[0]==='config'&&e[1]==='AW-17878825273/TxwGCJyr6-IcELnypM1C');config[2].phone_conversion_callback('(800) 555-0100','+18005550100');assert.ok(links.every(l=>l.href==='tel:+18005550100'));assert.ok([...b.w.document.querySelectorAll('[data-lgds-phone-text]')].every(n=>n.textContent==='(800) 555-0100'));b.close();});
test('tracking bootstrap cannot be installed twice in one document',()=>{const b=browser();b.w.eval(measurement.replace('__LGDS_SETTINGS__',JSON.stringify({measurementEnabled:true})));assert.equal(b.w.document.querySelectorAll('script[src*="googletagmanager"]').length,1);assert.equal(b.w.document.querySelectorAll('script[src*="bzrcdn"]').length,1);b.close();});
test('OpenAI starts denied and does not measure unconfirmed/non-US regions',async()=>{const b=browser({usRegion:false});assert.equal(b.w.oaiq.q[0][0],'consent');assert.equal(b.w.oaiq.q[0][1],false);fill(b);submit(b);await tick();assert.equal(b.requests.length,1);assert.equal(b.w.oaiq.q.filter(e=>e[0]==='measure').length,0);assert.equal(events(b,'generate_lead').length,1);b.close();});
test('GPC blocks OpenAI measurement without stopping a service request',async()=>{const b=browser({gpc:true});fill(b);submit(b);await tick();assert.equal(b.requests.length,1);assert.equal(b.w.oaiq.q.filter(e=>e[0]==='measure').length,0);assert.equal(b.w.dataLayer[0][2].ad_storage,'denied');b.close();});
test('region endpoint only enables a confirmed U.S. visitor and never caches',async()=>{const endpoint=(await import('../netlify/edge-functions/measurement-region.ts')).default;for(const country of ['US','GB','FR',undefined]){const r=endpoint(new Request('https://example.com/lgds-measurement-region'),{geo:{country:{code:country}}});assert.deepEqual(await r.json(),{openaiMeasurementAllowed:country==='US'});assert.match(r.headers.get('cache-control'),/no-store/);}});
test('canonical redirects are idempotent, with no loop and no arbitrary 404 redirect',async()=>{const {canonicalPath}=await import('../site/routes.mjs');for(const route of ['/services/roller-repair.html','/services/roller-repair','/services/garage-door-repair','/ads/garage-door-repair','/index.html','/privacy.html']){const target=canonicalPath(route);assert.equal(canonicalPath(target),target);assert.ok(target.endsWith('/'));}assert.equal(canonicalPath('/unknown'),'/unknown');
 const edge=(await import('../netlify/edge-functions/canonical-path.ts')).default;const req=new Request('https://localgaragedoorsvc.com/services/roller-repair.html?gclid=TEST&x=a%2Bb&x=two');const r=edge(req,{next:()=>new Response('next')});assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://www.localgaragedoorsvc.com/services/garage-door-roller-hinge-repair/?gclid=TEST&x=a%2Bb&x=two');assert.equal(edge(new Request('https://www.localgaragedoorsvc.com/ads/garage-door-repair/'),{next:()=>new Response('next')}).status,200);
});
