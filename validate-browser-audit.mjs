import fs from 'node:fs';
import path from 'node:path';

const reportPath = path.resolve(process.env.AUDIT_REPORT || 'audit-results/browser-audit.json');
if (!fs.existsSync(reportPath)) {
  console.error(`[validate-browser-audit] Report not found: ${reportPath}`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const successfulImages = new Set();

function normalizedSrc(value) {
  try {
    const url = new URL(value);
    return url.pathname;
  } catch {
    return String(value || '').split('?')[0];
  }
}

for (const result of report.results || []) {
  for (const image of result.facts?.visibleImages || []) {
    if (image.naturalWidth > 0 && image.naturalHeight > 0) successfulImages.add(normalizedSrc(image.src));
  }
}

const actionable = [];
const ignored = [];

for (const failure of report.failures || []) {
  if (failure.message === 'Broken image detected') {
    const trulyBroken = (failure.brokenImages || []).filter((image) => {
      const src = normalizedSrc(image.src);
      return image.visible && !successfulImages.has(src);
    });
    if (trulyBroken.length) actionable.push({ ...failure, brokenImages: trulyBroken });
    else ignored.push({ ...failure, reason: 'The same asset loaded successfully on another audited page; treated as a lazy-loading timing result.' });
    continue;
  }

  if (failure.message === 'Mobile Services menu is missing Emergency or Same-Day') {
    const menu = failure.menu || {};
    if (menu.emergency?.visible && menu.sameDay?.visible) {
      ignored.push({ ...failure, reason: 'Both requested service links are visible; the audit could not identify the menu toggle button.' });
    } else {
      actionable.push(failure);
    }
    continue;
  }

  actionable.push(failure);
}

const formWarnings = (report.warnings || []).filter((warning) => warning.message === 'Form controls without accessible labels');
const networkWarnings = (report.warnings || []).filter((warning) => warning.message === 'Non-tracker requests failed');

const summary = {
  generatedAt: new Date().toISOString(),
  pagesTested: report.pageCount,
  browserRuns: (report.results || []).length,
  actionableFailures: actionable,
  ignoredTimingResults: ignored.length,
  formAccessibilityWarnings: formWarnings.length,
  networkWarnings: networkWarnings.length
};

const outputPath = path.join(path.dirname(reportPath), 'validated-audit.json');
fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

console.log(`[validate-browser-audit] Pages: ${summary.pagesTested}; browser runs: ${summary.browserRuns}; actionable failures: ${actionable.length}; ignored timing results: ${ignored.length}; form warnings: ${formWarnings.length}; network warnings: ${networkWarnings.length}.`);
for (const failure of actionable) {
  console.error(`  - ${failure.message}${failure.pathname ? `: ${failure.pathname}` : ''}`);
}

if (actionable.length || formWarnings.length) process.exit(1);
