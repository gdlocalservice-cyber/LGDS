# PR #15 — release checklist, 2026-09-25

Status: Preview only. Itzik's technical acceptance of `9d965ba` and recommendation to proceed after documentation correction are recorded; separate merge/publication approval and a coordinated time are still required. See `ITZIK-HANDOFF.md` for evidence sources and limitations. Do not reopen completed account/security checks as new release prerequisites.

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

## At the coordinated release — still open

- [ ] Obtain Itzik's explicit approval of the current Preview and the merge/publication time. Technical recommendation alone is not authorization.
- [ ] Recheck current production deploy, commit and automatic-publishing state immediately before release. Last recorded rollback (September 25): `6a824bc28167ec00080355f2` / `125d6e27dc2067067450824da725755168f3eeeb`. Replace the record if production has changed.
- [ ] After that approval only, set the existing `LGDS_RELEASE_APPROVED=1` production gate and follow the agreed merge/deploy sequence. Do not merge early while automatic publishing is active.
- [ ] Retain a usable rollback target and account for automatic publishing before restoring it, so a subsequent build cannot immediately replace the restoration.

## After the approved release — owner and Itzik

- [ ] Send one clearly marked TEST request. Confirm receipt in Formspree and the business inbox; compare landing page, service, issue and consent-appropriate campaign/source fields.
- [ ] Verify one GA4 `generate_lead` and one eligible OpenAI `lead_created` for the accepted request, using the opaque submission/event ID where available. Invalid submissions or repeat submits within the same document must not create extra lead events. Honor regional consent, GPC and OpenAI U.S. eligibility; absence under an ineligible condition is not a failed event.
- [ ] Check page-view counts and conversion behavior with the live tags. Complete an eligible OpenAI `oppref` landing → internal navigation → accepted lead path and verify it in Monitoring. A simulated SDK check is not live attribution proof.
- [ ] Check actual Google forwarding-number replacement and call routing through the appropriate campaign path, including displayed numbers and `tel:` destinations in header, hero, mobile bar and final CTA. Verify qualified-call attribution separately.
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
