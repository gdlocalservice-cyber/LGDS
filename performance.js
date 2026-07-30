'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');
const homeFile = path.join(publishDir, 'index.html');
const optimizedHeroSource = path.join(
  __dirname,
  'performance-assets',
  'home-hero-mobile-fast.webp'
);
const optimizedHeroUrl = '/assets/home-hero-mobile-fast.webp';
const optimizedHeroOutput = path.join(publishDir, optimizedHeroUrl.slice(1));
const originalMobileAvif =
  '/assets/garage-door-technician-king-of-prussia-pa-lgds-mobile-720.avif';
const originalMobileWebp =
  '/assets/garage-door-technician-king-of-prussia-pa-lgds-mobile-720.webp';

for (const requiredFile of [homeFile, optimizedHeroSource]) {
  if (!fs.existsSync(requiredFile)) {
    console.error(`[performance] Required file not found: ${requiredFile}`);
    process.exit(1);
  }
}

fs.mkdirSync(path.dirname(optimizedHeroOutput), { recursive: true });
fs.copyFileSync(optimizedHeroSource, optimizedHeroOutput);

let html = fs.readFileSync(homeFile, 'utf8');

const stylesheetTags = [
  ...html.matchAll(/<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi)
].map((match) => match[0]);

if (stylesheetTags.length !== 1) {
  throw new Error(
    `[performance] Expected one homepage stylesheet, found ${stylesheetTags.length}.`
  );
}

const stylesheetTag = stylesheetTags[0];
const stylesheetHref = stylesheetTag.match(/\bhref=["']([^"']+)["']/i)?.[1];
const stylesheetUrl = stylesheetHref?.split('?')[0];

if (!stylesheetUrl || !/^\/_next\/static\/chunks\/[^/]+\.css$/.test(stylesheetUrl)) {
  throw new Error(
    `[performance] Unexpected homepage stylesheet URL: ${stylesheetHref || 'missing'}.`
  );
}

const stylesheetFile = path.join(publishDir, stylesheetUrl.slice(1));
if (!fs.existsSync(stylesheetFile)) {
  throw new Error(`[performance] Homepage stylesheet not found: ${stylesheetFile}`);
}

const inlineCss = fs
  .readFileSync(stylesheetFile, 'utf8')
  .replace(/url\((['"]?)\.\.\/media\//g, 'url($1/_next/static/media/');

if (/<\/style/i.test(inlineCss)) {
  throw new Error('[performance] Stylesheet contains an unsafe closing style tag.');
}

html = html.replace(
  stylesheetTag,
  `<style id="lgds-home-inline-css">${inlineCss}</style>`
);

const mobileAvifSource =
  `<source media="(max-width: 620px)" type="image/avif" srcSet="${originalMobileAvif}"/>`;
const mobileWebpSource =
  `<source media="(max-width: 620px)" type="image/webp" srcSet="${originalMobileWebp}"/>`;

if (!html.includes(mobileAvifSource) || !html.includes(mobileWebpSource)) {
  throw new Error('[performance] Expected homepage mobile hero sources were not found.');
}

html = html
  .replace(mobileAvifSource, '')
  .replace(
    mobileWebpSource,
    `<source media="(max-width: 620px)" type="image/webp" srcSet="${optimizedHeroUrl}"/>`
  );

const currentHeroPreload = html.match(
  /<link\b(?=[^>]*\brel=["']preload["'])(?=[^>]*\bas=["']image["'])(?=[^>]*\bhref=["']\/assets\/garage-door-technician-king-of-prussia-pa-lgds-mobile-720\.(?:avif|webp)["'])[^>]*>/i
)?.[0];

if (!currentHeroPreload) {
  throw new Error('[performance] Expected homepage hero preload was not found.');
}

const optimizedHeroPreload =
  `<link rel="preload" href="${optimizedHeroUrl}" as="image" type="image/webp" fetchpriority="high" media="(max-width: 620px)"/>`;

html = html.replace(currentHeroPreload, '');
html = html.replace(/<head(\s[^>]*)?>/i, (headTag) => headTag + optimizedHeroPreload);

const heroImagePattern =
  /(<section class="hero" id="top">[\s\S]*?<img\b[^>]*\bloading=["']eager["'][^>]*\bdecoding=["'])sync(["'][^>]*>)/i;

if (!heroImagePattern.test(html)) {
  throw new Error('[performance] Expected eager homepage hero image was not found.');
}

html = html.replace(heroImagePattern, '$1async$2');

if (
  !html.includes('id="lgds-home-inline-css"') ||
  html.includes(originalMobileAvif) ||
  html.includes(originalMobileWebp) ||
  !html.includes(optimizedHeroUrl)
) {
  throw new Error('[performance] Homepage performance transformation was incomplete.');
}

if (
  html.indexOf(optimizedHeroPreload) >
  html.indexOf('id="lgds-regional-consent-bootstrap"')
) {
  throw new Error('[performance] Hero preload is not ahead of the consent bootstrap.');
}

fs.writeFileSync(homeFile, html, 'utf8');

console.log(
  '[performance] Inlined the exact homepage stylesheet, prioritized the mobile hero, and installed its fast-decoding WebP asset.'
);
