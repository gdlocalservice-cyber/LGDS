import fs from 'node:fs';
import path from 'node:path';
import { chromium, devices } from 'playwright';

const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173';
const distDir = path.resolve(process.env.AUDIT_DIST || 'dist');
const outputDir = path.resolve(process.env.AUDIT_OUTPUT || 'audit-results');
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(path.join(outputDir, 'screenshots'), { recursive: true });

const sitemapPath = path.join(distDir, 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const pagePaths = [...new Set([...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => {
  try { return new URL(match[1]).pathname || '/'; } catch { return '/'; }
}))].sort();

const keyPaths = new Set([
  '/',
  '/services/',
  '/services/emergency-garage-door-service/',
  '/services/same-day-garage-door-service/'
]);

const profiles = [
  { name: 'desktop', options: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  { name: 'mobile', options: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } } }
];

const results = [];
const failures = [];
const warnings = [];

function safeName(value) {
  if (value === '/') return 'home';
  return value.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-').slice(0, 120) || 'page';
}

function issue(level, message, details = {}) {
  const target = level === 'failure' ? failures : warnings;
  target.push({ message, ...details });
}

async function scrollForLazyAssets(page) {
  await page.evaluate(async () => {
    const step = Math.max(500, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(350);
}

async function pageFacts(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 1 && rect.height > 1;
    };

    const doc = document.documentElement;
    const body = document.body;
    const viewportWidth = window.innerWidth;
    const overflow = Math.max(doc.scrollWidth, body?.scrollWidth || 0) - viewportWidth;
    const overflowOffenders = [...document.querySelectorAll('body *')]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.right > viewportWidth + 2 || rect.left < -2;
      })
      .slice(0, 12)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        id: element.id || '',
        className: typeof element.className === 'string' ? element.className.slice(0, 160) : '',
        text: (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 90),
        left: Math.round(element.getBoundingClientRect().left),
        right: Math.round(element.getBoundingClientRect().right)
      }));

    const images = [...document.images].map((image) => ({
      src: image.currentSrc || image.src,
      alt: image.alt,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      visible: visible(image),
      width: Math.round(image.getBoundingClientRect().width),
      height: Math.round(image.getBoundingClientRect().height)
    }));

    const dataLayer = (window.dataLayer || []).map((entry) => {
      try { return Array.from(entry); } catch { return entry; }
    });

    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      h1Count: document.querySelectorAll('h1').length,
      visibleH1: [...document.querySelectorAll('h1')].filter(visible).map((node) => node.textContent.trim()),
      overflow,
      overflowOffenders,
      brokenImages: images.filter((image) => image.naturalWidth === 0),
      visibleImages: images.filter((image) => image.visible),
      imageCount: images.length,
      emptyLinks: [...document.querySelectorAll('a[href]')].filter((link) => !((link.textContent || '').trim()) && !link.querySelector('img[alt]')).length,
      forms: [...document.forms].map((form) => ({
        action: form.action,
        method: form.method,
        controls: [...form.querySelectorAll('input, textarea, select')].map((control) => ({
          type: control.type || control.tagName.toLowerCase(),
          name: control.name,
          required: control.required,
          label: control.getAttribute('aria-label') || control.getAttribute('placeholder') || (control.id && document.querySelector(`label[for="${CSS.escape(control.id)}"]`)?.textContent.trim()) || ''
        }))
      })),
      consentDefaultCount: dataLayer.filter((entry) => entry?.[0] === 'consent' && entry?.[1] === 'default').length,
      pageViewCount: dataLayer.filter((entry) => entry?.[0] === 'event' && entry?.[1] === 'page_view').length,
      cookieBannerVisible: [...document.querySelectorAll('[id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="consent" i]')].some((node) => visible(node) && /accept|decline|cookies/i.test(node.textContent || ''))
    };
  });
}

async function auditMobileServicesMenu(page) {
  const summary = { opened: false, servicesExpanded: false, emergency: null, sameDay: null };
  const menuButtons = page.locator('button[aria-label*="menu" i], button[aria-controls], button').filter({ hasText: /menu/i });
  for (let i = 0; i < await menuButtons.count(); i += 1) {
    const button = menuButtons.nth(i);
    if (await button.isVisible().catch(() => false)) {
      await button.click().catch(() => {});
      summary.opened = true;
      break;
    }
  }

  await page.waitForTimeout(250);
  const servicesCandidates = page.getByText(/^Services$/i);
  for (let i = 0; i < await servicesCandidates.count(); i += 1) {
    const item = servicesCandidates.nth(i);
    if (await item.isVisible().catch(() => false)) {
      await item.click().catch(() => {});
      summary.servicesExpanded = true;
      break;
    }
  }

  await page.waitForTimeout(500);

  for (const [key, fragment] of [['emergency', 'emergency-garage-door-service'], ['sameDay', 'same-day-garage-door-service']]) {
    const links = page.locator(`a[href*="${fragment}"]`);
    let selected = null;
    for (let i = 0; i < await links.count(); i += 1) {
      const link = links.nth(i);
      if (await link.isVisible().catch(() => false)) { selected = link; break; }
    }
    if (!selected) {
      summary[key] = { visible: false };
      continue;
    }
    summary[key] = await selected.evaluate((link) => {
      let node = link;
      let image = link.querySelector('img');
      for (let depth = 0; !image && depth < 5 && node.parentElement; depth += 1) {
        node = node.parentElement;
        image = node.querySelector('img');
      }
      return {
        visible: true,
        href: link.href,
        text: (link.textContent || '').replace(/\s+/g, ' ').trim(),
        image: image ? {
          src: image.currentSrc || image.src,
          alt: image.alt,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          width: Math.round(image.getBoundingClientRect().width),
          height: Math.round(image.getBoundingClientRect().height)
        } : null
      };
    });
  }

  return summary;
}

const browser = await chromium.launch({ headless: true });
try {
  for (const profile of profiles) {
    const context = await browser.newContext(profile.options);
    for (const pathname of pagePaths) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('pageerror', (error) => pageErrors.push(error.message));
      page.on('requestfailed', (request) => {
        const url = request.url();
        if (!/google-analytics|googletagmanager|doubleclick|youtube|ytimg|facebook|gstatic/i.test(url)) {
          failedRequests.push({ url, error: request.failure()?.errorText || 'failed' });
        }
      });

      const url = `${baseUrl}${pathname}`;
      let response = null;
      let navigationError = null;
      try {
        response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(900);
        await scrollForLazyAssets(page);
      } catch (error) {
        navigationError = error.message;
      }

      const facts = navigationError ? null : await pageFacts(page);
      let menu = null;
      if (profile.name === 'mobile' && pathname === '/') menu = await auditMobileServicesMenu(page);

      const record = {
        profile: profile.name,
        pathname,
        status: response?.status() || null,
        navigationError,
        consoleErrors,
        pageErrors,
        failedRequests,
        facts,
        menu
      };
      results.push(record);

      if (navigationError || !response || response.status() >= 400) issue('failure', 'Page navigation failed', { profile: profile.name, pathname, navigationError, status: response?.status() });
      if (pageErrors.length) issue('failure', 'Uncaught JavaScript error', { profile: profile.name, pathname, pageErrors });
      if (failedRequests.length) issue('warning', 'Non-tracker requests failed', { profile: profile.name, pathname, failedRequests });
      if (facts) {
        if (!facts.title || !facts.description || !facts.canonical || facts.h1Count !== 1) issue('failure', 'Core SEO metadata/H1 issue', { profile: profile.name, pathname, title: facts.title, description: facts.description, canonical: facts.canonical, h1Count: facts.h1Count });
        if (facts.brokenImages.length) issue('failure', 'Broken image detected', { profile: profile.name, pathname, brokenImages: facts.brokenImages });
        if (profile.name === 'mobile' && facts.overflow > 2) issue('failure', 'Horizontal overflow detected', { pathname, overflow: facts.overflow, offenders: facts.overflowOffenders });
        if (facts.emptyLinks > 0) issue('warning', 'Empty links detected', { profile: profile.name, pathname, count: facts.emptyLinks });
        if (facts.forms.some((form) => form.controls.some((control) => !control.label && !['hidden', 'submit', 'button'].includes(control.type)))) issue('warning', 'Form controls without accessible labels', { profile: profile.name, pathname, forms: facts.forms });
      }

      if (profile.name === 'mobile' && pathname === '/services/emergency-garage-door-service/' && facts) {
        const realVisible = facts.visibleImages.filter((image) => image.naturalWidth >= 300 && image.naturalHeight >= 180 && image.width >= 180 && image.height >= 100);
        if (!realVisible.length) issue('failure', 'Emergency page has no substantial visible real image on mobile', { pathname, visibleImages: facts.visibleImages });
      }

      if (menu) {
        if (!menu.opened || !menu.emergency?.visible || !menu.sameDay?.visible) issue('failure', 'Mobile Services menu is missing Emergency or Same-Day', { menu });
        if (!menu.emergency?.image || menu.emergency.image.naturalWidth === 0 || menu.emergency.image.width < 80) issue('failure', 'Emergency mobile menu card has no usable real image', { menu });
        if (!menu.sameDay?.image || menu.sameDay.image.naturalWidth === 0 || menu.sameDay.image.width < 80) issue('failure', 'Same-Day mobile menu card has no usable real image', { menu });
        if (menu.emergency?.image?.src && menu.emergency.image.src === menu.sameDay?.image?.src) issue('failure', 'Emergency and Same-Day mobile cards use the same image', { menu });
      }

      const shotPath = path.join(outputDir, 'screenshots', `${profile.name}-${safeName(pathname)}.png`);
      await page.screenshot({ path: shotPath, fullPage: keyPaths.has(pathname) }).catch(() => {});
      await page.close();
    }
    await context.close();
  }
} finally {
  await browser.close();
}

const summary = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  pageCount: pagePaths.length,
  profiles: profiles.map((profile) => profile.name),
  failures,
  warnings,
  results
};

fs.writeFileSync(path.join(outputDir, 'browser-audit.json'), JSON.stringify(summary, null, 2));

const lines = [
  '# LGDS Browser Audit',
  '',
  `- Pages tested: ${pagePaths.length}`,
  `- Desktop and mobile runs: ${results.length}`,
  `- Failures: ${failures.length}`,
  `- Warnings: ${warnings.length}`,
  '',
  '## Failures',
  ...(failures.length ? failures.map((entry) => `- ${entry.message}: ${entry.profile || ''} ${entry.pathname || ''}`.trim()) : ['- None']),
  '',
  '## Warnings',
  ...(warnings.length ? warnings.map((entry) => `- ${entry.message}: ${entry.profile || ''} ${entry.pathname || ''}`.trim()) : ['- None'])
];
fs.writeFileSync(path.join(outputDir, 'SUMMARY.md'), `${lines.join('\n')}\n`);

console.log(lines.join('\n'));
if (failures.length) process.exit(1);
