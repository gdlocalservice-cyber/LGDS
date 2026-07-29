'use strict';

const fs = require('node:fs');
const path = require('node:path');

const publishDir = path.resolve(process.argv[2] || 'dist');

if (!fs.existsSync(publishDir)) {
  console.error(`[site-quality-fixes] Publish directory not found: ${publishDir}`);
  process.exit(1);
}

const textExtensions = new Set(['.html', '.js', '.txt', '.json', '.xml']);
const textFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (entry.isFile() && textExtensions.has(path.extname(entry.name).toLowerCase())) {
      textFiles.push(fullPath);
    }
  }
}

walk(publishDir);

const globalReplacements = [
  [/Friday:\s*7:00 AM[–-]1:00 PM/g, 'Friday: 7:00 AM–5:00 PM'],
  [/Friday:\s*7 AM[–-]1 PM/g, 'Friday: 7 AM–5 PM'],
  [/Friday\s*7:00 AM[–-]1:00 PM/g, 'Friday 7:00 AM–5:00 PM'],
  [/Friday7:00 AM[–-]1:00 PM/g, 'Friday7:00 AM–5:00 PM'],
  [/Friday7 AM[–-]1 PM/g, 'Friday7 AM–5 PM'],
  [/Friday closing time is 1:00 PM/gi, 'Friday closing time is 5:00 PM'],
  [/("dayOfWeek"\s*:\s*"Friday"[\s\S]{0,180}?"closes"\s*:\s*")13:00("?)/g, '$117:00$2'],
  [/(dayOfWeek\\?"?\s*:\s*\\?"Friday\\?"?[\s\S]{0,220}?closes\\?"?\s*:\s*\\?")13:00(\\?")/g, '$117:00$2'],
  [/Emergency garage door repair available in Smyrna\. Technician available today\s*[–-]\s*call now for fast service\./gi,
    'Emergency garage door service may be available in Smyrna. Call to confirm the next available appointment window.'],
  [/Technicians? available today/gi, 'Same-day appointments may be available'],
  [/same-day completion is the norm/gi, 'same-day completion may be possible when the required parts and appointment time are available'],
  [/Spring replacements typically run \$200[–-]\$350\./gi,
    'Spring-replacement pricing depends on the door, spring system and parts required.'],
  [/South NJ/g, 'New Jersey'],
  [/disconnect use of the opener if safe to do so, and request service\./gi,
    'do not use the opener or attempt to move the door. Keep people and vehicles clear and request service.']
];

const serviceCopy = {
  'garage-door-repair': {
    heading: 'Whole-system troubleshooting.',
    paragraph: 'The same symptom can come from different parts. We trace how the door, spring system, tracks, hardware and opener interact so the recommendation addresses the actual failure instead of guessing from one visible sign.'
  },
  'broken-spring-replacement': {
    heading: 'Spring sizing and balance matter.',
    paragraph: 'A replacement spring must match the door weight and system design. We inspect the paired hardware, confirm balance and test the full travel so the opener is not left lifting a door that is still too heavy.'
  },
  'garage-door-cable-repair': {
    heading: 'Cable damage rarely stands alone.',
    paragraph: 'A cable can slip or break because of spring, drum, track or balance problems. We inspect both sides of the lift system and correct the cause before testing the door under controlled operation.'
  },
  'off-track-garage-door-repair': {
    heading: 'Reset the door and correct the cause.',
    paragraph: 'Putting a roller back into the track is only part of the repair. We check why the door shifted, inspect cables and sections for secondary damage, then verify alignment and safe travel before normal use resumes.'
  },
  'garage-door-opener-repair': {
    heading: 'Test the door before blaming the opener.',
    paragraph: 'An opener can appear faulty when the door is unbalanced or binding. We separate mechanical door problems from motor, rail, sensor and control issues so the repair is directed at the right component.'
  },
  'garage-door-opener-installation': {
    heading: 'Match the opener to the door.',
    paragraph: 'A reliable installation starts with door balance, weight, headroom and daily use. We confirm compatibility, install the rail and controls correctly, and test safety reversal and travel limits before handoff.'
  },
  'garage-door-roller-hinge-repair': {
    heading: 'Reduce friction at the moving points.',
    paragraph: 'Rollers, hinges and brackets guide every cycle of the door. We identify worn or loose hardware, check track condition and replace only the components needed to restore smoother, quieter movement.'
  },
  'garage-door-panel-replacement': {
    heading: 'Check the section and the full door.',
    paragraph: 'Panel damage can affect hinges, tracks and door alignment. We evaluate whether a matching section is available and whether replacing one panel will restore safe operation without creating a poor fit or finish.'
  },
  'new-garage-door-installation': {
    heading: 'Measure first, then select the door.',
    paragraph: 'The opening, track layout, insulation goals, exterior style and opener all affect the right choice. We measure the site and review practical options before the final door and hardware are ordered.'
  },
  'garage-door-adjustment-balance': {
    heading: 'Balance protects the opener.',
    paragraph: 'A door that drifts or feels heavy can overload the opener and wear hardware unevenly. We check spring support, cable position, tracks and travel before making controlled adjustments and retesting movement.'
  },
  'garage-door-safety-inspection': {
    heading: 'A practical safety check.',
    paragraph: 'The inspection focuses on the parts that support, guide and stop the door. We look for visible wear, unstable movement and safety-control problems, then explain which findings need attention now and which can be monitored.'
  },
  'noisy-heavy-garage-door': {
    heading: 'Noise is a symptom, not the diagnosis.',
    paragraph: 'Grinding, banging and sudden heaviness can come from different sources. We listen to the door through a controlled cycle and inspect balance, rollers, hinges, tracks and opener strain before recommending work.'
  },
  'garage-door-maintenance-lubrication': {
    heading: 'Use the right lubricant in the right places.',
    paragraph: 'Maintenance is more than spraying every moving part. We inspect the system first, tighten appropriate hardware, lubricate suitable contact points and flag wear that routine service cannot safely correct.'
  },
  'commercial-garage-door-service': {
    heading: 'Minimize downtime without skipping safety.',
    paragraph: 'Commercial doors often cycle more frequently and support heavier hardware. We assess the operating environment, failed components and access needs before outlining repair or replacement options.'
  },
  'commercial-roll-up-door-service': {
    heading: 'Inspect the curtain, guides and counterbalance together.',
    paragraph: 'A roll-up door can bind because of damage in more than one area. We evaluate curtain travel, guides, bottom bar, brackets and counterbalance components before recommending the safest practical repair.'
  },
  'emergency-garage-door-service': {
    heading: 'Secure the opening before secondary damage.',
    paragraph: 'Urgent service starts with the immediate risk: a trapped vehicle, exposed opening, hanging section or unstable door. We confirm availability, inspect the failure and explain the safest next step without claiming round-the-clock response.'
  },
  'same-day-garage-door-service': {
    heading: 'Confirm the problem and the available window.',
    paragraph: 'Same-day appointments depend on location, schedule, technician availability and the parts required. We collect the basic details first so we can give an honest response window instead of promising a time we cannot verify.'
  }
};

const genericHeading = 'Diagnosis before recommendation.';
const genericParagraph = 'Garage door parts work as a connected system. The technician checks the relevant springs, cables, tracks, rollers, hardware or opener response before explaining the practical next steps.';

function cloneFooterLink(anchorHtml, href, label) {
  return anchorHtml
    .replace(/href=["'][^"']+["']/i, `href="${href}"`)
    .replace(/>([\s\S]*?)<\/a>/i, `>${label}</a>`);
}

function injectFooterServiceLinks(html) {
  if (/href=["'][^"']*emergency-garage-door-service\/?["']/i.test(html) &&
      /href=["'][^"']*same-day-garage-door-service\/?["']/i.test(html)) {
    return html;
  }

  return html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i, function (footer) {
    if (/emergency-garage-door-service/i.test(footer) && /same-day-garage-door-service/i.test(footer)) return footer;

    const anchorMatch = footer.match(/<a\b[^>]*href=["'][^"']*new-garage-door-installation\/?["'][^>]*>[\s\S]*?<\/a>/i) ||
      footer.match(/<a\b[^>]*href=["'][^"']*garage-door-repair\/?["'][^>]*>[\s\S]*?<\/a>/i);
    if (!anchorMatch) return footer;

    const emergency = cloneFooterLink(anchorMatch[0], '/services/emergency-garage-door-service/', 'Emergency Service');
    const sameDay = cloneFooterLink(anchorMatch[0], '/services/same-day-garage-door-service/', 'Same-Day Service');
    return footer.replace(anchorMatch[0], `${anchorMatch[0]}${emergency}${sameDay}`);
  });
}

let filesChanged = 0;
let replacementsApplied = 0;
let servicePagesDiversified = 0;

for (const file of textFiles) {
  let content;
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (error) {
    continue;
  }

  const original = content;

  for (const [pattern, replacement] of globalReplacements) {
    const before = content;
    content = content.replace(pattern, replacement);
    if (content !== before) replacementsApplied += 1;
  }

  const relative = path.relative(publishDir, file).replace(/\\/g, '/').toLowerCase();

  if (path.extname(file).toLowerCase() === '.html') {
    content = injectFooterServiceLinks(content);
  }
  const slug = Object.keys(serviceCopy).find((key) => relative.includes(`/services/${key}/`) || relative.includes(`/services/${key}.`));

  if (slug) {
    const copy = serviceCopy[slug];
    const before = content;
    content = content.split(genericHeading).join(copy.heading);
    content = content.split(genericParagraph).join(copy.paragraph);
    if (content !== before) servicePagesDiversified += 1;
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    filesChanged += 1;
  }
}

console.log(`[site-quality-fixes] Updated ${filesChanged} text files; applied ${replacementsApplied} global consistency/safety replacements; diversified ${servicePagesDiversified} service-page assets.`);
