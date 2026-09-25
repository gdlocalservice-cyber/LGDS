# LGDS review handoff — 2026-09-23

## Combined follow-up — 2026-09-25 (current status)

- Preserved the three paid pages and filled the campaign-content gaps only: clearer service-specific openings/process descriptions and relevant FAQs. See `CAMPAIGN-MAPPING.md` for the ad-group mapping and conditional installation/replacement campaign gaps.
- Build and 26/26 tests passed. The added functional case checks landing page, service and campaign attribution, one confirmed lead and preview isolation on all three actual paid-page forms. Measurement runtime and mobile/desktop layout code were not changed by this follow-up.
- Itzik confirms receipt of the campaign-goals, Search Console and rollback evidence and found no further code blocker in the earlier `9e63cf7` version. This does not constitute approval of a new commit or a production release.
- Campaign-goal screenshots show account-default form and phone goals. The existing GA4 `generate_lead` import must still be matched to the property/web stream `G-TVGZZ0WFTH`. The Google-hosted form action is separate and is not, by itself, a duplicate website form conversion. Do not create another conversion.
- Search Console screenshots show no detected Security Issues or Manual Actions; Philadelphia is indexed with a matching Google-selected canonical and a September 13, 2026 crawl. These observations do not explain the unusual historical queries or clear historical access. The complete owner-only access/security review remains open.
- Keep account-access evidence and authentication details in the private owner handoff, outside this public repository. Coordinate Netlify 2FA and linked-login protection with the owner; keep passwords, QR secrets and recovery codes private.
- Current production deploy was rechecked through Netlify on September 25: `6a824bc28167ec00080355f2`, commit `125d6e27dc2067067450824da725755168f3eeeb`. Recheck immediately before an approved release. The supplied dashboard shows automatic publishing enabled; no merge to `main` is authorized.
- After coordinated release, run one labelled TEST request for Formspree/email receipt, one GA4 event, one eligible OpenAI event and phone replacement. Verify Google Ads attribution separately through a suitable advertising path. Campaign URLs and Google settings require separate approval.

## Review corrections — 2026-09-24 (historical record)

- OpenAI SDK now loads/initializes only after the US eligibility response and no GPC. Removed per-page consent(false); no forced consent(true), so a stored SDK denial is respected. Added event_id from submission ID. Official reference: https://developers.openai.com/ads/measurement-pixel (consent(false) deletes attribution cookies).
- A fresh gclid/gbraid/wbraid/oppref replaces the complete stored campaign and stale fields; internal navigation preserves it.
- Browser phone validation requires ordinary phone characters and 10–15 digits. Formspree-side validation remains to be configured/verified by the account owner; no receiving-service setting was changed.
- Mobile DOM order is intro + short verified review, form, then hero image. Desktop grid retains its layout.
- Preferred Sources removed from all three Ads pages, retained on ordinary pages/Guides.
- Build and 25/25 tests passed. New cases cover attribution replacement, invalid/valid phones, OpenAI navigation cookie-contract simulation and Ads content/component placement. The cookie simulation is NOT a real SDK/Monitoring verification. Complete oppref landing → internal navigation → accepted test lead in OpenAI Monitoring after coordinated release.
- Duplicate protection scope: in-flight/repeated submit prevention in the current document; session-level measurement flags by opaque submission ID; stable ID on a retry within that document. Formspree receipt idempotency is not guaranteed, including refresh or a lost acknowledgement. No server-side idempotency store was added. Do not call this exactly-once server delivery.
- Itzik reports: 37 bookkeeping queries / 60 impressions / 0 clicks for Philadelphia in Aug 31–Sep 13; current code/live page clean. The later Search Console evidence is acknowledged above; historical access and the cause of the queries remain unresolved.
- Agreed account direction: do not add Netlify hosts to cross-domain measurement; no administrator change now. Campaign Goals evidence was subsequently received; the linked GA4 property/stream still requires verification.
- Preview only. No merge, production release, campaign URL or Google-account change authorized.


Review branch only: `codex/lgds-measurement-landing-pages`, draft PR #15. No production release, merge, Ads final-URL update, or Google-account configuration change is authorized by this handoff.

## Completed in code

- Three campaign pages: general repair, opener/sensor repair, spring/cable/off-track repair. Each has its own service copy, choices, local form anchor, FAQs and service schema.
- Reused the homepage responsive hero on all three pages, as approved by the owner. Selected exact excerpts from the supplied review screenshots: Brandon Munson, Kardia Rowe, Ralph DeJesus, Jatish Patel and Michael Crudup. Sources are owner-supplied screenshots; snippets and names live in site/approved-reviews.json. No new aggregate rating/count is claimed. Original spelling is preserved.
- Shared form handling across 55 forms: validation, consent, error recovery, retained input, timeout, submission deduplication, and success only after a positive JSON acknowledgement from Formspree. Preview makes no real submission.
- Attribution preservation for gclid, gbraid, wbraid and campaign parameters, including blocked-storage fallback.
- One measurement owner; GA4 generate_lead only after accepted submission. No extra direct Google Ads form conversion added. Phone-number callback updates display and tel destination. OpenAI event gated by consent, confirmed US region and GPC; production debug off.
- Production-host guards isolate preview measurement. Existing historical Netlify deployments were not modified.
- Ads pages excluded from sitemap and ordinary navigation, with noindex/follow, self-canonical and AdsBot access retained. Canonical redirects preserve query parameters and do not convert arbitrary missing pages into homepage redirects.
- Preferred Sources official production component in Guides, articles and footer; preview uses the business-domain deep link.
- Removed 116 obsolete image preloads, preserved hero priority, made supporting images lazy and video user-controlled. Added focus/target and before-after accessibility improvements.
- Editorial cleanup on 40 service/location pages, including 17 service-specific notes. This does not certify every existing sentence, photo or local project history.
- Friday hours match owner approval: 7 AM–5 PM Eastern.

## Verification

`npm run verify` passed on 2026-09-23: build plus 21/21 automated tests. Built 62 HTML pages, checked 4,654 links, 55 forms, 3 campaign pages, 54 sitemap routes. Tests exercise successful/error/invalid/duplicate form paths, preview isolation, attribution fallback, call-link behavior, OpenAI consent/region/GPC gating and redirects.

Tests simulate server acknowledgements and measurement; they do not prove inbox delivery, account attribution, actual qualified calls or real-device performance. No new Lighthouse score or complete WCAG claim is made.

## Google account evidence and decisions for Itzik

- Existing GA4 import: Local Garage Door Service (web) generate_lead, ID 7706703078, Primary, Count One, Active; GA4 source, 90-day click window. Verify property/stream and campaign-goal mapping; do not create another primary action for the same submission.
- Website calls: Call (267-438-6494), ID 7723472284, Primary, Count One, 60-second threshold, 30-day click window. Supplied snippet AW-17878825273/TxwGCJyr6-IcELnypM1C matches code. Verify actual number replacement and call attribution after approval.
- Google-hosted Lead form - Submit, Calls from ads and locked pay-per-lead actions are separate rows; do not delete or change them merely because names overlap.
- Retain G-TVGZZ0WFTH, GT-NGJ3Z7QQ and AW-17878825273. No GTM migration.
- Needs Attention screenshots show additional Netlify domains suggested for cross-domain configuration and a second-administrator recommendation. Do not automatically accept all deployment domains or change administrator access.
- Monitored domains is distinct from cross-domain measurement. Screenshots show root localgaragedoorsvc.com added under My domains; www addition is not confirmed. Ignoring diagnostic domains does not itself stop data collection. No accept/ignore/admin changes are verified.

## Before production: remaining review

1. Itzik reviews this branch/diff, campaign pages, content, image/review choices and campaign URL mapping. Do not infer readiness solely from green tests.
2. Verify account conversion destinations, consent behavior and campaign goals; agree any Google changes explicitly with the owner.
3. Continue the Philadelphia investigation for Aug 31–Sep 13, 2026 using the received Search Console evidence and available Netlify/GitHub activity/access records. Explicitly identify the records reviewed and those unavailable. No compromise or clean bill of health is established by a local string scan or by payment/project-change logs.
4. Check Netlify publication settings and record the actual current production deploy as rollback target immediately before release. Historical rollback IDs are not current-state proof.
5. Complete visual and real-device review; performance with live integrations is still outstanding.

## After coordinated release

- Clearly labelled TEST submission: verify Formspree AND inbox receipt; one GA4 lead and eligible OpenAI event. Verify Ads attribution through an eligible campaign path; an ordinary direct test need not appear as an Ads conversion.
- Verify forwarding numbers and displayed/tel values on header, hero, mobile bar and final CTA.
- Verify Preferred Sources authenticated selection and return on desktop/mobile.
- Check iPhone/Android interactions and record performance with production integrations.
- Review sitemap/indexing in Search Console and campaign final URLs only with approval.

Production remains gated by LGDS_RELEASE_APPROVED=1. Do not set it until release authorization.
