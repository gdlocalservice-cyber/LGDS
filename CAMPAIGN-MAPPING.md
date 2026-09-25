# Campaign landing-page review — 2026-09-25

This is a content mapping for draft PR #15. The production paths below become campaign destinations only after separate release and campaign-URL approval. These topics are not a keyword upload or authorization to change Google Ads.

| Ad group / service | Intended production path | Content coverage and remaining gap |
| --- | --- | --- |
| General Garage Door Repair | `/ads/garage-door-repair/` | Opening identifies garage door repair; service copy uses overhead descriptively and covers stuck, noisy, uneven/crooked doors and opening/closing problems. Added a repair-suitability FAQ. No remaining content gap identified for this repair group. |
| Opener & Sensor Repair | `/ads/garage-door-opener-repair/` | Opening explicitly names opener, motor, sensor, remote and keypad problems. Existing diagnosis/repair copy retained; added a remote/keypad FAQ. No remaining content gap identified for this repair group. |
| Spring, Cable & Off-Track Repair | `/ads/spring-cable-off-track-repair/` | Explicit broken-spring, spring-replacement, cable-repair and off-track content; added a repair-process FAQ while retaining the operating-safety advice. No remaining content gap identified for this repair group. |

Production domain: `https://www.localgaragedoorsvc.com`.

## Conditional future campaign gaps

- New-door installation: the three repair pages do not provide an installation-focused journey. If an installation campaign is proposed, request approval for a dedicated `/ads/garage-door-installation/` page covering door selection, site assessment and installation.
- Opener replacement: the opener repair page acknowledges replacement as a possible diagnosis outcome, but is not a focused replacement campaign page. If that campaign is proposed, request approval for `/ads/garage-door-opener-replacement/` with model/suitability and installation details.
- Neither proposed page was created. No additional campaign, service promise or keyword set is approved by this document.

## Preserved behavior

- Each paid repair page now displays the owner's requested 10% repair offer with its service name and existing call/request actions. A separate 7% offer for U.S. active-duty military members and veterans may be combined with it, matching the public homepage terms checked on 2026-09-25. Other website offers cannot be combined with the repair offer. No combined 17% claim, expiration date, new eligibility rule or savings cap is implied. The homepage's separate 15% spring-labor and 10% opener-installation offers are unchanged.

- The owner requested new opening copy and a navy/gold hero using the original site typography. The owner-approved hero, service-specific supporting photos and exact owner-supplied Google review excerpts remain. No affiliation with the Overhead Door brand is claimed.
- Mobile order remains opening + short review, form, then hero photo. The short approved review is also visible on desktop. The desktop two-column layout is retained. Supporting images are lazy; responsive hero priority is retained.
- Existing call destinations, local form anchors and confirmed operating hours remain. ZIP is a form field only; promotional copy no longer emphasizes it. No 24/7, guaranteed arrival or free-quote promise was added.
- All three paid pages retain noindex/follow, a self-canonical URL, exclusion from the sitemap and ordinary main navigation, and AdsBot access. The logo links home. Preferred Sources remains outside paid pages.
- No GEO code, duplicate city pages, measurement runtime changes or additional conversion action was introduced.

## Verification and limits

`npm run verify`: 26/26 tests passed; 62 generated HTML pages, 55 forms, 4,654 links and 54 sitemap routes checked.

The new functional test submits each of the three actual paid-page forms with a simulated positive Formspree response. It verifies the landing URL, page/service, selected issue, advertising click and campaign fields, consent, one submission, one GA4 lead and an eligible OpenAI event using the submission ID. Repeated submit is prevented within that document. All three preview forms make no real submission or lead event. Navigation, new-click attribution replacement, phone validation, phone-link updates, consent gating and SEO boundaries remain covered by the existing tests.

Simulated acknowledgements do not verify live Formspree/email delivery, the GA4-property-to-Ads connection, actual OpenAI attribution, physical iPhone/Android behavior or real-network loading performance. Server receipt idempotency and Formspree-side phone validation remain unimplemented; there is no guarantee against all duplicate requests after refresh.

## Approval boundary

Itzik's acceptance of the earlier `9e63cf7` code/Preview is historical evidence. The content and test changes in this follow-up require review of the new Preview. Account verification, the owner-only security/access review and the coordinated release checklist remain required. No merge to main, production release, Google setting change or campaign final-URL change is authorized.
