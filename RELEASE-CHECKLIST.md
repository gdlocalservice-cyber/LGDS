# LGDS review and release sequence

This branch is for review. It does not authorize merging or publishing the live site.

## Before requesting publication approval

- Finish the three landing pages and the separate Preferred Sources addition.
- Review the pages and existing-site changes together, then run one consolidated build/test pass.
- Check desktop/mobile layout, keyboard navigation, form validation, error/success handling in the test environment, and local assets/links.
- Confirm the business hours. The current specification and code use Friday 7 AM–5 PM Eastern; do not change this from an older note without the owner's answer.
- Keep preview requests and advertising events disabled. A simulated response is not evidence of a real inbox receipt or account conversion.
- Record remaining limitations and get Itzik's approval of the completed preview before authorizing a production release.

## After an approved production release

The owner requested these checks at the end, on the real website:

- Submit a request clearly labelled TEST and confirm receipt in Formspree and the business inbox.
- Confirm one lead per successful submission in GA4, Google Ads and OpenAI; rejected/duplicate submissions must not create extra leads.
- Check Google forwarding numbers and call links using the actual campaign path.
- Check Google Preferred Sources on `localgaragedoorsvc.com`, including authenticated source selection and the standard button's return flow.
- Complete iPhone/Android device checks and record real performance results with live integrations enabled.
- Review indexing/canonical behavior after publication; do not change Ads final URLs without approval.

The production build remains gated by `LGDS_RELEASE_APPROVED=1`. Set it only after release approval. Retain the current production deployment as the rollback point before publishing.

## Preferred Sources implementation

Production adds the official `publisher.js` once per document and places the standard Google button in Guides, guide articles and the footer. Preview uses Google's documented deep link to the business domain because the preview host is not the intended source. This component is separate from measurement and does not replace Google tags.

## Performance and accessibility update

- Remove obsolete homepage-image preloads from inner pages, retaining each page's actual hero priority.
- Keep the selected responsive hero images eager and supporting images lazy.
- Load footer images lazily and make the work video user-controlled with `preload="none"`.
- Provide visible keyboard focus, larger action targets and accessible before/after selection states.

These source-level improvements are not a Lighthouse score or a claim of complete WCAG conformance.

## Original-scope work that must remain visible

- Google tag: keep GT-NGJ3Z7QQ, GA4 G-TVGZZ0WFTH and Ads AW-17878825273. Do not migrate to GTM. Obtain the full text/screenshots of both Needs Attention alerts before diagnosing them.
- Form conversion: code sends generate_lead to GA4 after receipt. Confirm the existing GA4-to-Ads conversion mapping and campaign goal settings. Do not add a second primary conversion for the same submission. form_start, ordinary clicks and phone-link taps must not be treated as completed form leads. Actual qualified website calls are a separate conversion.
- Philadelphia: investigate the bookkeeping-related queries for August 31–September 13, 2026. Capture Security Issues, Manual Actions, indexed HTML, crawl date, Google-selected canonical and live inspection. Compare deployment history, shared templates, scripts, redirects, cache and administrative access. Report evidence before security changes. A local string scan does not clear the live site or establish a compromise.
- Content: editorial cleanup now covers 40 service/location pages, including 17 service-specific request notes. This removes template language; it does not create verified local project histories or prove the provenance of existing photos.
- Release safety: retain the actual current production deploy ID at release time. Check automatic publication settings before any rollback so a subsequent build cannot immediately replace the restored deploy.

## Owner/account handoff

Before publication, provide:
1. Screenshots with both Needs Attention alert details expanded, including the affected tag/destination.
2. Google Ads conversion-action list showing source, goal, primary/secondary status and counting setting; show whether generate_lead from G-TVGZZ0WFTH is already mapped. Confirm the linked GA4 property. No credentials are needed in chat.
3. Search Console evidence for Philadelphia as listed above, plus the query export for the specified date range with an exact page filter. Preserve evidence before requesting recrawl.
4. Confirmation of Friday closing time (current specification: 5 PM Eastern), the selected company-photo provenance, and review excerpts.
5. Itzik's visual review of the three preview pages and explicit approval before production or Ads final-URL changes.

After the approved release:
- Use a clearly marked TEST request; confirm Formspree and inbox receipt, then one generate_lead in GA4 and one eligible lead_created in OpenAI. Invalid or duplicate submissions must not generate extra leads.
- Confirm the Ads conversion mapping records eligible campaign leads. A direct non-ad test submission need not appear as an attributed Ads conversion.
- Use Tag Assistant to inspect one page_view per navigation, then the call-number replacement in header, hero, mobile bar and final CTA. Check the displayed number and tel destination together.
- In OpenAI Ads Manager, confirm the supplied pixel and accepted lead event. Production debug is off; any temporary verification mode must be removed after testing.
- Test iPhone and Android: fast call tap, local Request scroll, WhatsApp, form errors, consent and submit visibility.
- Select localgaragedoorsvc.com through the official Preferred Sources button and confirm the return flow on desktop and mobile.
- Submit the rebuilt sitemap in Search Console and measure mobile/desktop performance with the live integrations.

Official references:
- Google Analytics events to Ads conversions: https://support.google.com/google-ads/answer/10632359
- URL Inspection: https://support.google.com/webmasters/answer/9012289
- Website-call tracking: https://support.google.com/google-ads/answer/6095883
- Preferred Sources: https://developers.google.com/search/docs/appearance/preferred-sources
