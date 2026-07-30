'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}

walk(publishDir);

const compactStyles = `<style id="lgds-owner-feedback">
.mobile-nav .mobile-priority-service{display:none!important}
@media (min-width:901px){
  .offer-grid{max-width:1000px}
  .offer-card{min-height:285px;padding:26px}
  .before-after-grid{max-width:1120px;gap:18px}
  .before-after-image{height:380px}
  .trusted-brands{max-width:1180px;padding:22px 26px 18px}
  .brand-logo-grid{gap:14px}
  .brand-logo-card{height:82px;padding:10px}
  .brand-logo-card img{height:58px}
}
</style>`;

const homeProblemCardFallback = `<script id="lgds-home-problem-card-fallback">
(function(){
  'use strict';

  function normalize(value){
    return String(value || '')
      .toLowerCase()
      .replace(/[’']/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  const issueDefinitions = [
    {label:'Wont Open', keys:['wont open','door wont open','not open']},
    {label:'Broken Spring', keys:['broken spring','spring']},
    {label:'Off Track', keys:['off track','track']},
    {label:'New Door / Opener', keys:['new door opener','new door','new garage door','new opener','installation']},
    {label:'Opener Issue', keys:['opener issue','opener']},
    {label:'Noisy / Heavy', keys:['noisy heavy','noisy','heavy']}
  ];

  function findIssue(text){
    const normalized = normalize(text);
    return issueDefinitions.find(function(issue){
      return issue.keys.some(function(key){ return normalized.includes(key); });
    });
  }

  function findCardIssue(trigger, section){
    let node = trigger;
    for(let depth = 0; node && node !== section && depth < 6; depth += 1){
      const issue = findIssue(node.textContent);
      if(issue) return issue;
      node = node.parentElement;
    }
    return null;
  }

  function setIssue(form, issue){
    if(!form || !issue) return;
    const select = Array.from(form.querySelectorAll('select')).find(function(field){
      const descriptor = normalize(
        (field.name || '') + ' ' +
        (field.id || '') + ' ' +
        (field.getAttribute('aria-label') || '')
      );
      return descriptor.includes('issue') || descriptor.includes('problem') || descriptor.includes('happening');
    }) || form.querySelector('select');

    if(!select) return;
    const option = Array.from(select.options).find(function(candidate){
      const candidateText = normalize(candidate.textContent + ' ' + candidate.value);
      return issue.keys.some(function(key){ return candidateText.includes(key); });
    });

    if(option){
      select.value = option.value;
      select.dispatchEvent(new Event('input', {bubbles:true}));
      select.dispatchEvent(new Event('change', {bubbles:true}));
    }
  }

  function init(){
    const problemHeading = Array.from(document.querySelectorAll('h1,h2,h3')).find(function(heading){
      return normalize(heading.textContent).includes('whats happening with your door');
    });
    if(!problemHeading) return;

    const problemSection = problemHeading.closest('section') || problemHeading.parentElement;
    if(!problemSection || problemSection.dataset.lgdsRequestFallback === 'ready') return;

    const requestHeading = Array.from(document.querySelectorAll('h1,h2,h3')).find(function(heading){
      return normalize(heading.textContent).includes('tell us what you need');
    });
    const requestSection = requestHeading && (requestHeading.closest('section') || requestHeading.parentElement);
    const requestForm = requestSection && requestSection.querySelector('form');
    if(!requestHeading || !requestForm) return;

    problemSection.dataset.lgdsRequestFallback = 'ready';
    problemSection.addEventListener('click', function(event){
      const trigger = event.target.closest('a,button');
      if(!trigger || !problemSection.contains(trigger)) return;
      const issue = findCardIssue(trigger, problemSection);
      if(!issue) return;

      event.preventDefault();
      setIssue(requestForm, issue);
      const headingOffset = window.matchMedia('(min-width: 901px)').matches ? 140 : 96;
      const scrollTop = requestHeading.getBoundingClientRect().top + window.scrollY - headingOffset;
      window.scrollTo({top:Math.max(0, scrollTop), behavior:'smooth'});
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();
</script>`;

const priorityLink =
  /<a class="mobile-priority-service (?:emergency|same-day)"[^>]*>.*?<\/a>/g;

function optimizeHomeDocument(html) {
  const nextScriptPreload =
    /<link\b(?=[^>]*\brel=["']preload["'])(?=[^>]*\bas=["']script["'])[^>]*\bhref=["']\/_next\/static\/chunks\/[^"']+["'][^>]*>/gi;
  const nextChunkScript =
    /<script\b[^>]*\bsrc=["']\/_next\/static\/chunks\/[^"']+["'][^>]*>\s*<\/script>/gi;
  const nextFlightScript =
    /<script>\s*(?:\(self\.__next_f\s*=|self\.__next_f\.push)[\s\S]*?<\/script>/g;
  const heroPreload =
    /<link\b(?=[^>]*\brel=["']preload["'])(?=[^>]*\bas=["']image["'])[^>]*\bhref=["']\/assets\/garage-door-technician-king-of-prussia-pa-lgds-mobile-720\.avif["'][^>]*>/gi;
  const fontPreload =
    '<link rel="preload" href="/assets/fonts/montserrat-latin-variable.woff2" as="font" type="font/woff2" crossorigin="anonymous"/>';

  html = html
    .replace(nextScriptPreload, '')
    .replace(nextChunkScript, '')
    .replace(nextFlightScript, '');

  let heroPreloadSeen = false;
  html = html.replace(heroPreload, function (match) {
    if (heroPreloadSeen) return '';
    heroPreloadSeen = true;
    return match;
  });

  if (!html.includes('href="/assets/fonts/montserrat-latin-variable.woff2"')) {
    html = html.replace(
      /<link rel="stylesheet" href="\/_next\/static\/chunks\//,
      `${fontPreload}<link rel="stylesheet" href="/_next/static/chunks/`
    );
  }

  html = html.replace(
    'fetchPriority="high" alt="Local Garage Door Service technician arriving',
    'fetchPriority="high" loading="eager" decoding="sync" alt="Local Garage Door Service technician arriving'
  );

  if (
    /<script\b[^>]*\bsrc=["']\/_next\/static\/chunks\//i.test(html) ||
    /self\.__next_f/.test(html)
  ) {
    throw new Error(
      '[owner-feedback] Homepage still contains Next hydration scripts after performance optimization.'
    );
  }

  return html;
}

function repairComparisonAssetPairs() {
  const interactionsFile = path.join(publishDir, 'recovery-interactions.js');
  const original = fs.readFileSync(interactionsFile, 'utf8');
  const oldLogic = `          var current = image.getAttribute('src') || '';
          image.setAttribute('src', showBefore ? current.replace('-after.webp', '-before.webp') : current.replace('-before.webp', '-after.webp'));`;
  const newLogic = `          var current = image.getAttribute('src') || '';
          var comparisonPairs = [
            {
              before: '/assets/work/new-construction-garage-before.webp',
              after: '/assets/work/black-garage-doors-after.webp'
            },
            {
              before: '/assets/work/old-garage-door-before.webp',
              after: '/assets/work/white-garage-door-after.webp'
            },
            {
              before: '/assets/work/garage-opening-before.webp',
              after: '/assets/work/garage-door-completed-after.webp'
            }
          ];
          var pair = comparisonPairs.find(function (candidate) {
            return candidate.before === current || candidate.after === current;
          });
          if (pair) image.setAttribute('src', showBefore ? pair.before : pair.after);`;

  if (!original.includes(oldLogic)) {
    throw new Error(
      '[owner-feedback] Expected before/after interaction logic was not found.'
    );
  }

  fs.writeFileSync(interactionsFile, original.replace(oldLogic, newLogic), 'utf8');
}

for (const htmlFile of htmlFiles) {
  let html = fs.readFileSync(htmlFile, 'utf8');
  html = html.replace(priorityLink, '');

  if (
    htmlFile.endsWith(
      path.join('services', 'emergency-garage-door-service', 'index.html')
    )
  ) {
    html = html.replaceAll(
      '/assets/media/services/emergency-collapsed-garage-door.webp',
      '/assets/media/services/garage-door-repair-damaged-door.webp'
    );
  }

  if (!html.includes('id="lgds-owner-feedback"')) {
    html = html.replace('</head>', `${compactStyles}</head>`);
  }

  if (htmlFile === path.join(publishDir, 'index.html')) {
    html = optimizeHomeDocument(html);
    if (!html.includes('id="lgds-home-problem-card-fallback"')) {
      html = html.replace('</body>', `${homeProblemCardFallback}</body>`);
    }
  }

  fs.writeFileSync(htmlFile, html);
}

repairComparisonAssetPairs();

console.log(
  `[owner-feedback] Updated ${htmlFiles.length} pages: simplified mobile menu, compacted home sections, replaced the Emergency image, repaired home problem-card request navigation, and removed redundant homepage hydration.`
);
