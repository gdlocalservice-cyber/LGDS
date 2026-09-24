# LGDS review and release sequence

## Review corrections — 2026-09-24 (supersedes earlier status)

- OpenAI SDK now loads/initializes only after the US eligibility response and no GPC. Removed per-page consent(false); no forced consent(true), so a stored SDK denial is respected. Added event_id from submission ID. Official reference: https://developers.openai.com/ads/measurement-pixel (consent(false) deletes attribution cookies).
- A fresh gclid/gbraid/wbraid/oppref replaces the complete stored campaign and stale fields; internal navigation preserves it.
- Browser phone validation requires ordinary phone characters and 10–15 digits. Formspree-side validation remains to be configured/verified by the account owner; no receiving-service setting was changed.
- Mobile DOM order is intro + short verified review, form, then hero image. Desktop grid retains its layout.
- Preferred Sources removed from all three Ads pages, retained on ordinary pages/Guides.
- Build and 25/25 tests passed. New cases cover attribution replacement, invalid/valid phones, OpenAI navigation cookie-contract simulation and Ads content/component placement. The cookie simulation is NOT a real SDK/Monitoring verification. Complete oppref landing → internal navigation → accepted test lead in OpenAI Monitoring after coordinated release.
- Duplicate protection scope: in-flight/repeated submit prevention in the current document; session-level measurement flags by opaque submission ID; stable ID on a retry within that document. Formspree receipt idempotency is not guaranteed, including refresh or a lost acknowledgement. No server-side idempotency store was added. Do not call this exactly-once server delivery.
- Itzik reports: 37 bookkeeping queries / 60 impressions / 0 clicks for Philadelphia in Aug 31–Sep 13; current code/live page clean. These account findings are supplied by Itzik, not independently retrieved here. Security Issues, Manual Actions, indexed URL inspection and deployment/access history remain open.
- Agreed account direction: do not add Netlify hosts to cross-domain measurement; no administrator change now. Campaign Goals screenshot still required to verify actual active goals/no duplicate form conversion.
- Preview only. No merge, production release, campaign URL or Google-account change authorized.


This branch is for review. It does not authorize merging or publishing the live site.

## Before requesting publication approval

- Finish the three landing pages and the separate Preferred Sources addition.
- Review the pages and existing-site changes together, then run one consolidated build/test pass.
- Check desktop/mobile layout, keyboard navigation, form validation, error/success handling in the test environment, and local assets/links.
- Owner confirmed Friday 7 AM–5 PM Eastern; code matches. Owner approved the homepage hero and supplied review excerpts; these are implemented.
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

- Google tag: keep GT-NGJ3Z7QQ, GA4 G-TVGZZ0WFTH and Ads AW-17878825273. Do not migrate to GTM. The supplied screenshots identify additional-domain configuration suggestions and a second-administrator recommendation. Account decisions remain with Itzik.
- Form conversion: code sends generate_lead to GA4 after receipt. Confirm the existing GA4-to-Ads conversion mapping and campaign goal settings. Do not add a second primary conversion for the same submission. form_start, ordinary clicks and phone-link taps must not be treated as completed form leads. Actual qualified website calls are a separate conversion.
- Philadelphia: investigate the bookkeeping-related queries for August 31–September 13, 2026. Capture Security Issues, Manual Actions, indexed HTML, crawl date, Google-selected canonical and live inspection. Compare deployment history, shared templates, scripts, redirects, cache and administrative access. Report evidence before security changes. A local string scan does not clear the live site or establish a compromise.
- Content: editorial cleanup now covers 40 service/location pages, including 17 service-specific request notes. This removes template language; it does not create verified local project histories or prove the provenance of existing photos.
- Release safety: retain the actual current production deploy ID at release time. Check automatic publication settings before any rollback so a subsequent build cannot immediately replace the restored deploy.

## Owner/account handoff

Before publication, provide:
1. Review the supplied Needs Attention screenshots with Itzik: additional Netlify domains and adding another administrator. Neither action has been approved or performed by this implementation.
2. The supplied list already shows the GA4 generate_lead import as Primary, Count One, Active. Verify the actual linked stream/property and campaign goals in the account; do not create a duplicate import. No credentials are needed in chat.
3. Search Console evidence for Philadelphia as listed above, plus the query export for the specified date range with an exact page filter. Preserve evidence before requesting recrawl.
4. Owner approvals received: Friday closes at 5 PM Eastern, reuse the homepage hero, and use supplied reviews. Image provenance has not been independently certified.
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
