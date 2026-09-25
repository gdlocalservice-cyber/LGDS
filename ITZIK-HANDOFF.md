# LGDS — release handoff, 2026-09-25

## Decision and scope

Itzik's supplied technical review of `9d965ba` accepted the full PR #15 package, including the earlier ordinary-site changes, with 26/26 tests passing on repeat. No new code blocker was identified. The remaining documentation correction is incorporated below. This records the supplied account/owner evidence; it does not claim a new direct account audit by this implementation.

Gal subsequently approved the wide navy-photo design on the spring/cable/off-track page and requested the same design on the other two paid pages. This follow-up applies that shared design to all three: original responsive technician background, graduated navy overlay, local Repairs/Reviews/FAQs navigation, wider alignment, smaller headings, compact gold offers and a white form card. Mobile keeps opening, offer/actions, short review and form in that order. The background image has no separate duplicate block; supporting service images remain. This rollout does not modify the ordinary site's design or behavior. Earlier ordinary-site changes remain in PR #15.

PR #15 was published with the owner’s express authorization after he confirmed Itzik’s approval. Live merge: `01a7ad112e95f03997c9ee83caac406be796136c`; Netlify deploy: `6ab6e6b1b4781800080662e6`, published September 25 at 17:25:33 Eastern. The owner separately approved the site-wide `(267) 438-6494` display update and its publication at 18:16 Eastern. The display follow-up is being verified before publication; its final deploy and checks will be recorded in its PR. Google account and campaign changes remain outside that authorization.

## Completed evidence — do not repeat as open tasks

| Item | Recorded result and evidence source |
| --- | --- |
| Campaign coverage | Accepted in Itzik's review: general/overhead repair, opener/motor/sensor/remote/keypad, and spring/cable/off-track. Overhead is descriptive, without brand affiliation. No further content request is open. |
| Preview and ordinary-site usability | Itzik accepted desktop/mobile Preview, navigation, buttons and ordinary-site actions. Gal reported successful real-phone checks on the reviewed version. Responsive checks for this later shared visual rollout are separate; earlier physical-device confirmation is not relabelled as a new device test. |
| Offers and business details | Approved 10% service-specific repair offer and separate 7% U.S. military/veterans offer retained, including the approved combination terms. No 17% claim. Existing ordinary-site promotions remain. Friday closes at 5 PM Eastern. |
| Existing form conversion | Owner/Itzik report direct Ads/Analytics verification: “Local Garage Door Service (web) generate_lead” belongs to GA4 property `520175750` and Ads account `632-428-0974`; Primary, Count One. Search campaign uses default call/form goals. No new import or conversion is needed. Google-hosted lead forms are a separate source. |
| Web stream | Stream `13308694835`, Measurement ID `G-TVGZZ0WFTH`, match the code. Owner's screenshot confirms Stream URL was updated to `https://www.localgaragedoorsvc.com/` within the same stream, retaining its IDs. The former Netlify URL was not proven to cause the conversion issue. |
| SEO and existing-site work | Itzik accepted code checks for redirects, links, sitemap and Ads separation. Paid pages remain noindex/follow, self-canonical, outside sitemap/main navigation and accessible to AdsBot; logo links home. No special GEO code or duplicate city pages. |
| Preferred Sources, performance and accessibility | Accepted within code/Preview scope. Official live Google component and performance with production integrations still require the post-release checks below. No claim of full WCAG conformance or a particular Lighthouse score. |
| Security evidence status | Itzik accepted the description of the known state and evidence limits. No proof of compromise; the unusual query source remains unproven. The investigation is not reopened as a release prerequisite. |

The earlier “No recent conversions” status does not undo the verified conversion mapping. The owner confirmed a phone TEST and inbox receipt around 17:40 Eastern. Supplied GA4 screenshots show one `generate_lead` with `page_location` equal to the general repair Ads URL. A separate controlled TEST produced one OpenAI `lead_created` at 17:58:44 Eastern via `pixel_sdk`, alongside a distinct initialization event. These are receipt evidence, not proof of paid-campaign attribution or exact ID correlation across those two tests.

## Security record and limits

- The owner's Google screenshot shows 2-Step Verification enabled. Netlify uses the connected Google account. Separate Netlify 2FA was not shown enabled; this document neither claims otherwise nor introduces it as a new release gate.
- Supplied Google activity screenshots show application grants; the owner reports Itzik authorized HYPD_AI. This does not establish that every other grant was reviewed.
- A supplied GitHub Security log screenshot is filtered to August 31–September 13, 2026 and shows ChatGPT Codex Connector token-regeneration entries. A screenshot is not a complete forensic audit of all access.
- The supplied Netlify team log shows payments and project changes. A complete historical sign-in log and coverage for that period were not established from the available records. This remains an explicit evidence limitation, not a claim that no access occurred.
- Search Console evidence and the earlier rollback record were received. The source of the unusual Philadelphia queries is unresolved. No proof of a breach was established; no forensic clearance is asserted.
- Keep credentials, QR codes, recovery codes and private account evidence outside this public repository.

## Latest verification and implementation limits

`npm run verify` passed for this follow-up: 26/26 tests; 62 generated pages, 55 forms, 4,654 links and 54 sitemap routes. The tests cover the generated pages, all three forms, simulated provider acknowledgements, attribution, consent, telephone-link updates, navigation, SEO and Preview isolation. The shared hero stylesheet is loaded only on Ads pages. Actual inbox delivery and provider dashboards are not simulated-test evidence. All three desktop/mobile layouts were inspected in the browser; additional 360px opener and 430px spring views were checked. The mobile Request action reaches the form without the fixed bar covering submit. A shared CSS specificity correction keeps mobile input text at 16px. These are browser-responsive checks, not new physical-device tests.

Known limitations remain explicit:

1. Phone validation is browser-side (ordinary phone characters, 10–15 digits). Receiving-server/Formspree-side validation has not been implemented/configured and verified by this work.
2. In-flight and repeated-submit protection applies within the current document, with a stable opaque submission ID for retries there and session-level measurement flags. No server-side idempotency store was added. A refresh or lost acknowledgement can still result in duplicate receipt. This is not exactly-once server delivery.
3. Preview disables real submissions and advertising events. Automated tests cannot confirm live Formspree/email delivery, OpenAI dashboard receipt, number substitution, call attribution or production-network performance.

Existing Google tag identifiers remain `GT-NGJ3Z7QQ`, `G-TVGZZ0WFTH` and `AW-17878825273`; no GTM migration. Website call configuration remains `AW-17878825273/TxwGCJyr6-IcELnypM1C` for `267-438-6494`. No Google setting, conversion import, additional-domain suggestion or administrator change is part of this follow-up.

## Remaining coordinated checks

1. Verify an eligible real Google forwarding number, actual call routing and qualified-call attribution. The supplied website-call action uses Primary / One and a 60-second threshold. The Google debugging panel successfully replaced all five general-page phone links with its dummy number before the display follow-up; this proves the callback path, not real routing or campaign attribution.
2. Check Ads lead attribution and OpenAI campaign attribution through eligible campaign traffic. Do not create or import duplicate conversions. Review GA4 `form_start`, which appears as a key event in the owner’s screenshot, and confirm it is not used as a completed lead in Ads; its import was not established.
3. Retain the limitations below and complete the remaining post-release items in `RELEASE-CHECKLIST.md`. Campaign final URLs and Google-account changes remain separately coordinated with Itzik.
4. For the approved phone display follow-up, the immediately preceding production rollback is deploy `6ab6e6b1b4781800080662e6` / commit `01a7ad112e95f03997c9ee83caac406be796136c`. Recheck before publication. Automatic main publishing and the approved production build gate are active.

## Phone display follow-up

The build now formats customer-facing text, accessibility labels, metadata and form-error fallback numbers as `(267) 438-6494`. Dialing/WhatsApp URLs, structured telephone fields, conversion IDs and Google account settings are preserved. Valid U.S. forwarding numbers use the same display format, while `tel:` receives Google's supplied dialable number. Repeated callbacks and late error messages remain synchronized.

Pre-publication production build: 28/28 tests passed. Audited 62 HTML pages, 317 displayed numbers including JavaScript-disabled fallbacks, 55 forms and 6,061 links. After normalizing only the approved display changes and build cache versions, all 62 pages matched the preceding production build. All non-HTML production assets were byte-identical except the two intended form/measurement scripts. Browser and live follow-up results belong to this change’s PR release record.

## Published pages

- https://www.localgaragedoorsvc.com/ads/garage-door-repair/
- https://www.localgaragedoorsvc.com/ads/garage-door-opener-repair/
- https://www.localgaragedoorsvc.com/ads/spring-cable-off-track-repair/
- Full PR: https://github.com/gdlocalservice-cyber/LGDS/pull/15
