# LGDS — release checklist, 2026-09-25

Status: PR #15 is published, with owner-confirmed Itzik approval and explicit owner authorization. Production merge `01a7ad112e95f03997c9ee83caac406be796136c`, deploy `6ab6e6b1b4781800080662e6`, September 25 at 17:25:33 Eastern. A separate site-wide phone-format change is expressly approved for publication after checks. See `ITZIK-HANDOFF.md`; do not reopen completed account/security checks.

## Completed

- [x] Campaign mapping, natural service-specific content and generic use of overhead accepted. No further content request remains.
- [x] Technical review of the full PR package, including earlier ordinary-site changes: desktop/mobile Preview, navigation, actions, offers/business details and code-level SEO accepted by Itzik.
- [x] Gal reported successful physical-phone checks on the reviewed version. This is historical device evidence; it does not claim a new real-device test of the later shared design.
- [x] Owner-approved 10% repair offer and separate 7% military/veterans offer retained with existing terms. No 17% claim. Friday hours: 7 AM–5 PM Eastern; other approved hours and ordinary-site promotions retained.
- [x] Existing Ads `generate_lead` conversion mapped to GA4 property `520175750`, stream `13308694835`, tag `G-TVGZZ0WFTH` and Ads account `632-428-0974`, per supplied direct-account verification. Primary, Count One; campaign default call/form goals verified. No duplicate import needed.
- [x] Stream URL updated by the owner to `https://www.localgaragedoorsvc.com/` in the existing stream; identifiers unchanged.
- [x] Available security evidence and log limits documented and accepted as the known state. Google 2-Step Verification shown enabled. No proof of compromise; unusual query source remains unresolved. A full historical Netlify sign-in audit was not available from supplied records. This is not an outstanding release gate.
- [x] Apply the approved wide navy-photo design and local header links across the three Ads pages, retaining service-specific text, forms, offers, reviews, attribution and responsive images. Ordinary-site design is outside this rollout.
- [x] Update handoff/checklist so completed account checks are no longer listed as open, and retain the server-validation/idempotency limitations below.

## Verification of this follow-up

- [x] `npm run verify`: build and 26/26 tests passed for this follow-up; 62 pages, 55 forms, 4,654 links and 54 sitemap routes. All 59 ordinary-site HTML outputs matched the pre-rollout baseline after normalizing asset cache-version strings.
- [x] Inspected all three pages on desktop and in smartphone layout. Additional narrow (360px) opener and large-phone (430px) spring views checked. Confirmed readable openings, offers and in-page navigation; the mobile Request action reaches a form with its submit button clear of the fixed bar. Phone/WhatsApp destinations and form isolation remain covered by the existing tests; no real call or message was sent. Corrected the shared mobile input rule to retain 16px text. Browser-responsive checks are not physical hardware tests.
- [x] Confirmed Preview isolation in the tests and no ordinary-site HTML changes in the baseline comparison.

## Completed publication and phone follow-up

- [x] Owner confirmed Itzik’s approval and expressly authorized PR #15 merge/publication.
- [x] Checked prior production and autopublishing immediately before release; enabled the approved production build gate and confirmed successful publication.
- [x] Owner approved `(267) 438-6494` throughout the site and publication after regression checks.
- [x] Phone update production build and 28/28 tests passed; 62 pages, 317 displayed numbers, 55 forms and 6,061 links audited. All 62 normalized pages match the previous build apart from phone formatting and asset cache versions. Other production assets remain byte-identical except the two intended form/measurement scripts.
- [ ] Finish browser review, publish the phone-format follow-up and record its live commit/deploy and live checks in its PR. Recheck rollback `6ab6e6b1b4781800080662e6` / `01a7ad112e95f03997c9ee83caac406be796136c` immediately beforehand.

## Verified live evidence from PR #15

- [x] Owner reported actual mobile TEST submission and business inbox receipt around 17:40 Eastern.
- [x] Supplied GA4 screenshots show one `generate_lead` for `/ads/garage-door-repair/`; submission ID and service/source parameter keys are present. Exact field/ID reconciliation with the inbox was not shown.
- [x] Separate controlled TEST received in OpenAI Event Stream: one `lead_created` via `pixel_sdk` at 17:58:44 Eastern. Pixel initialization is a separate event, not a second lead.
- [x] Google debugging panel exercised number replacement on the live general-repair page: displayed phone numbers and all five active call destinations changed to the supplied dummy number. The browser was returned to the regular page afterward. This is not a real forwarding-number or call-attribution test.

## After the approved release — owner and Itzik

- [ ] If full submission reconciliation is required, compare the existing TEST record in Formspree with inbox/source fields; inbox delivery is already owner-confirmed. Avoid redundant test leads.
- [ ] Complete exact submission/event-ID correlation if required; the separate GA4 and OpenAI receipt evidence above is already recorded. Simulations cover invalid/repeated-submit behavior and consent gating.
- [ ] Check page-view counts and conversion behavior with the live tags. Complete an eligible OpenAI `oppref` landing → internal navigation → accepted lead path and verify it in Monitoring. A simulated SDK check is not live attribution proof.
- [ ] Check actual Google forwarding-number replacement and call routing through the appropriate campaign path, including displayed numbers and `tel:` destinations in header, hero, mobile bar and final CTA. Verify qualified-call attribution separately.
- [ ] Check GA4 `form_start` key-event status and confirm it is not used in Ads as a completed lead; no such import has been established.
- [ ] Check Ads form attribution through an eligible, coordinated campaign test. Do not infer Ads attribution from a direct visit. Do not create or re-import a form conversion to make a TEST appear.
- [ ] Smoke-test the production site on iPhone/Android: readability, call/WhatsApp actions, local Request scrolling, validation, consent, submit visibility and no fixed-bar obstruction. Record performance with production integrations enabled.
- [ ] Verify redirects and preservation of campaign query parameters, working links, canonical URLs, sitemap and Ads noindex/separation on production. Paid pages remain outside the sitemap/main navigation and accessible to AdsBot.
- [ ] Verify the official Preferred Sources component on ordinary pages/Guides: authenticated source selection and return flow for `localgaragedoorsvc.com`. It remains absent from Ads pages and separate from measurement.
- [ ] Coordinate campaign final-URL changes separately with Itzik. This release checklist does not approve Google-account, campaign-goal or campaign-URL changes.

## Known limitations — retain in the release record

- Browser-side phone validation exists; receiving-server/Formspree-side validation is not implemented/configured and verified by this work.
- Duplicate protection covers in-flight/repeated submit in the current document, a stable ID for retries there and session-level measurement flags. No server-side idempotency store exists. Refresh or lost acknowledgement can still produce duplicate receipt; there is no exactly-once server-delivery guarantee.
- Simulated provider responses and 26 passing tests do not establish live inbox receipt, dashboard events, call attribution or real-network performance.
- Security screenshots and team activity logs do not provide complete historical login coverage. The query source remains unproven; no proof of compromise was established. This limitation is documented, without reopening the investigation as a release condition.
- Code/Preview accessibility improvements are not a full WCAG certification or a promised Lighthouse score.
