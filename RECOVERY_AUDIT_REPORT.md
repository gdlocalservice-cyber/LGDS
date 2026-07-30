# LGDS Recovery Audit Report

Status: **preview candidate — production is intentionally unchanged**

Recovery branch: `agent/lgds-complete-recovery-2026-07-29`  
Working-video baseline: `3166689`  
Approved feature source restored: `12205b5`

## Recovery scope

- Restored the approved bright navy/gold LGDS site and original logo.
- Preserved the working homepage service video and poster byte-for-byte.
- Restored the four approved offers with no coupon numbering:
  - $250 off eligible new garage door installation
  - 15% off spring-repair labor
  - 10% off eligible opener installation
  - 7% U.S. military and veterans discount; the only offer allowed to combine
- Restored Emergency and Same-Day pages and Services links without adding a homepage banner.
- Added real, distinct Emergency and Same-Day images to the mobile Services menu and service index.
- Restored all approved service, city, CTA, hours, warranty, license, analytics, consent and privacy content.
- Kept Friday hours at 7 AM–5 PM, Saturday closed, and removed financing details.
- Kept Same-Day availability conditional and removed unsupported 24/7, guaranteed-arrival and fixed-price claims.
- Kept the full service-request form with Formspree as primary delivery and Netlify Forms as an encoded POST fallback.
- Added a narrow, deterministic interaction layer for the work video, coupons, before/after controls and form delivery because the static Next export did not reliably hydrate those controls. It does not scan or replace arbitrary images, logos, menus or content.
- Added security and cache headers in `netlify.toml`.

## Baseline integrity

| Asset | SHA-256 |
|---|---|
| `assets/service-visit.mp4` | `26241c69ee65bdb3aff4b380ee3c0f483ed8ceedc40df26a236c95ca717d6a63` |
| `assets/service-visit-poster.avif` | `cefa9290669c20bf3229d32003c9d42aad1addda68eb5594e9c60112846abee8` |
| `assets/logo-nav.webp` | `34a943024886c44e55aa941e2ee028e831e1b118881454b832bf7128efa73909` |

The video is a valid 24.7-second H.264 MP4 at 848×480. These hashes match the verified working-video baseline.

## Automated and visual audit results

| Audit | Coverage | Result |
|---|---:|---|
| Static release audit | 621 files, 59 HTML pages, 7,024 local references, 1,051 images, 63 JSON-LD blocks | PASS |
| Sitemap browser audit | 54 routes × desktop/mobile = 108 runs | 0 actionable failures |
| Page screenshots | 54 routes × desktop/mobile | 108 captured |
| JavaScript/runtime errors | 108 browser runs | 0 |
| Mobile horizontal overflow | 54 mobile routes | 0 |
| Core metadata/H1 | 108 browser runs | 0 failures |
| Form accessibility labels | 108 browser runs | 0 warnings |
| Focused interaction audit | 18 conversion/media/navigation checks | 18 PASS |
| axe WCAG 2 A/AA audit | Home, Emergency and Philadelphia × desktop/mobile | 0 critical/serious violations |
| Direct Core Web Vitals | Home, Emergency and Philadelphia × desktop/mobile | 6 PASS, 0 threshold failures |

The static audit reports 60 non-blocking editorial warnings: the non-indexed 404 lacks a canonical, some titles/descriptions are outside the advisory length range, and shared sitewide/process language is intentionally repeated. It found no broken local links/assets, missing required metadata, duplicate IDs, invalid structured data, missing image alt attributes or unfinished copy.

The browser audit recorded two non-blocking aborted requests for the customer-testimonial video when the Reviews page was closed after inspection. The video file exists, loads, and retains user-controlled playback. Lazy images reported before their hidden mobile menu or footer section opened were separately verified with positive natural dimensions.

## Interaction and conversion checks

- Coupon claim selects the correct offer and service issue, then scrolls to the full request form.
- Work video resolves to the preserved MP4 and keeps muted autoplay, loop and inline behavior.
- Before/after controls change the correct real project image and restore it.
- Customer testimonial keeps visible controls and does not autoplay.
- Every tested phone link uses `tel:2674386494`.
- Form required validation, accessible names and Netlify declaration are present.
- A simulated Formspree failure correctly falls back to a Netlify URL-encoded POST containing `form-name=service-request`.
- Test submissions were intercepted locally; no audit lead was sent to Formspree or Netlify.
- Preview hosts do not load Google tracking. Production hosts use GA4 `G-TVGZZ0WFTH`, Google Tag `GT-NGJ3Z7QQ` and Google Ads `AW-17878825273`.
- Consent defaults grant measurement for U.S. traffic and deny analytics/ads storage by default for the EEA, UK and Switzerland.

## Performance results

| Profile | Page | FCP | LCP | CLS |
|---|---|---:|---:|---:|
| Desktop | Home | 736 ms | 736 ms | 0.010 |
| Desktop | Emergency | 236 ms | 476 ms | 0.000 |
| Desktop | Philadelphia | 232 ms | 568 ms | 0.039 |
| Mobile | Home | 884 ms | 884 ms | 0.000 |
| Mobile | Emergency | 532 ms | 532 ms | 0.000 |
| Mobile | Philadelphia | 216 ms | 216 ms | 0.000 |

These are direct local Chromium Performance API measurements. Lighthouse CLI could not attach to Chrome because the audit container blocks Chrome's debugging socket. A public PageSpeed/Lighthouse check should be attempted against the Netlify Preview.

## SEO, local accuracy and originality

- Sitemap contains all 54 approved indexable routes; `robots.txt` is present.
- Canonicals, titles, descriptions, H1s, LocalBusiness/Service/FAQ/Breadcrumb schema, licenses, hours and service areas were parsed and checked.
- No public business address, location-search ZIP field, 100-mile claim, South Jersey wording or financing detail remains.
- Five previously missing city routes are present with PA/NJ/DE relationships and direct service language.
- `llms.txt` was evaluated and intentionally omitted because it would not add authoritative information beyond the sitemap and visible HTML.
- Exact-phrase searches and manual comparison against current Philadelphia and New Jersey garage-door competitors found no material long-form passage copied from a competitor. Short operational phrases such as reviewing pricing before approved work are generic and are supported by the visible LGDS process.

## Compatibility and limitations

- Current Chromium desktop, iPhone-sized mobile emulation and Android-sized viewport behavior passed.
- Edge is covered at the shared Chromium rendering-engine level.
- A current Playwright WebKit build downloaded, but this container lacks the native GTK/GStreamer/WebKit libraries required to launch it. Safari/WebKit should receive a final smoke test on the public Preview if an external WebKit runner is available.
- Lighthouse scores and live HTTPS/mixed-content behavior require the public Netlify Preview.
- Owner visual approval, merge, production deployment and live smoke testing remain intentionally pending.

## Release gate

Do not merge to `main` or deploy to production until:

1. The Netlify Preview is available.
2. Preview HTTPS, headers, forms and representative pages receive a final smoke test.
3. The owner visually approves the desktop and mobile screenshots.
4. The owner explicitly approves production.
