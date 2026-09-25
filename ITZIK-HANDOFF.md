# PR #15 — current handoff, 2026-09-25

## Decision and scope

Itzik's supplied technical review of `9d965ba` accepted the full PR #15 package, including the earlier ordinary-site changes, with 26/26 tests passing on repeat. No new code blocker was identified. The remaining documentation correction is incorporated below. This records the supplied account/owner evidence; it does not claim a new direct account audit by this implementation.

Gal subsequently approved the wide navy-photo design on the spring/cable/off-track page and requested the same design on the other two paid pages. This follow-up applies that shared design to all three: original responsive technician background, graduated navy overlay, local Repairs/Reviews/FAQs navigation, wider alignment, smaller headings, compact gold offers and a white form card. Mobile keeps opening, offer/actions, short review and form in that order. The background image has no separate duplicate block; supporting service images remain. This rollout does not modify the ordinary site's design or behavior. Earlier ordinary-site changes remain in PR #15.

All work remains in Preview. Technical acceptance and the owner's design approval are not permission to merge or publish. Itzik will separately approve a coordinated release time.

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

The earlier “No recent conversions” status does not undo the verified conversion mapping. Live delivery and measurement remain unproven until the agreed TEST.

## Security record and limits

- The owner's Google screenshot shows 2-Step Verification enabled. Netlify uses the connected Google account. Separate Netlify 2FA was not shown enabled; this document neither claims otherwise nor introduces it as a new release gate.
- Supplied Google activity screenshots show application grants; the owner reports Itzik authorized HYPD_AI. This does not establish that every other grant was reviewed.
- A supplied GitHub Security log screenshot is filtered to August 31–September 13, 2026 and shows ChatGPT Codex Connector token-regeneration entries. A screenshot is not a complete forensic audit of all access.
- The supplied Netlify team log shows payments and project changes. A complete historical sign-in log and coverage for that period were not established from the available records. This remains an explicit evidence limitation, not a claim that no access occurred.
- Search Console evidence and the earlier rollback record were received. The source of the unusual Philadelphia queries is unresolved. No proof of a breach was established; no forensic clearance is asserted.
- Keep credentials, QR codes, recovery codes and private account evidence outside this public repository.

## Latest verification and implementation limits

`npm run verify` passed for this follow-up: 26/26 tests; 62 generated pages, 55 forms, 4,654 links and 54 sitemap routes. The tests cover the generated pages, all three forms, simulated provider acknowledgements, attribution, consent, telephone-link updates, navigation, SEO and Preview isolation. The shared hero stylesheet is loaded only on Ads pages. Actual inbox delivery and provider dashboards are not simulated-test evidence.

Known limitations remain explicit:

1. Phone validation is browser-side (ordinary phone characters, 10–15 digits). Receiving-server/Formspree-side validation has not been implemented/configured and verified by this work.
2. In-flight and repeated-submit protection applies within the current document, with a stable opaque submission ID for retries there and session-level measurement flags. No server-side idempotency store was added. A refresh or lost acknowledgement can still result in duplicate receipt. This is not exactly-once server delivery.
3. Preview disables real submissions and advertising events. Automated tests cannot confirm live Formspree/email delivery, OpenAI dashboard receipt, number substitution, call attribution or production-network performance.

Existing Google tag identifiers remain `GT-NGJ3Z7QQ`, `G-TVGZZ0WFTH` and `AW-17878825273`; no GTM migration. Website call configuration remains `AW-17878825273/TxwGCJyr6-IcELnypM1C` for `267-438-6494`. No Google setting, conversion import, additional-domain suggestion or administrator change is part of this follow-up.

## Only remaining release steps

1. Itzik reviews the current shared-design Preview and gives separate explicit merge/publication approval and a coordinated time.
2. Immediately before that release, recheck current production and automatic publishing. Last recorded rollback: deploy `6a824bc28167ec00080355f2`, commit `125d6e27dc2067067450824da725755168f3eeeb`, checked September 25. If production changes, record the new target. Main was automatically published; do not merge ahead of approval.
3. Only after approval, enable the existing production gate `LGDS_RELEASE_APPROVED=1` and carry out the agreed release. This handoff does not authorize changing that gate.
4. Perform the post-release sequence in `RELEASE-CHECKLIST.md`. Campaign final URLs and any further Google-account changes remain separately coordinated with Itzik.

## Preview links

- https://deploy-preview-15--local-garage-door-service.netlify.app/ads/garage-door-repair/
- https://deploy-preview-15--local-garage-door-service.netlify.app/ads/garage-door-opener-repair/
- https://deploy-preview-15--local-garage-door-service.netlify.app/ads/spring-cable-off-track-repair/
- Full PR: https://github.com/gdlocalservice-cyber/LGDS/pull/15
