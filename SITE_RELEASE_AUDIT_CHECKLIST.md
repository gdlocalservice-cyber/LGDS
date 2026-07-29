# LGDS Final Release Audit Checklist

This checklist is mandatory for the recovery release. Nothing is merged to `main` until every applicable item is verified on the final Netlify Preview and the owner visually approves it.

## 1. Approved changes restored
- [ ] Preserve the working homepage video and its controls/behavior.
- [ ] Preserve the original company logo and approved LGDS branding.
- [ ] Restore the latest approved coupon design, wording, limits and claim behavior.
- [ ] Restore Emergency Service and Same-Day Service pages and links without adding an unrequested homepage banner.
- [ ] Restore all approved Google Analytics, Google Tag, Google Ads and consent/privacy changes.
- [ ] Restore Friday hours and confirm all business hours are consistent sitewide.
- [ ] Restore approved warranty/misuse policy wording without making the policy excessively long.
- [ ] Restore all previously approved navigation, city, service-area, CTA and contact-form changes.
- [ ] Confirm no rejected or superseded ideas were reintroduced.

## 2. Page-by-page visual review
- [ ] Open every sitemap page on desktop.
- [ ] Open every sitemap page on mobile.
- [ ] Capture screenshots of every page in both layouts.
- [ ] Manually review homepage, Services, Emergency, Same-Day, Contact, Reviews, Privacy, Terms, Warranty/Policy and every city/service page.
- [ ] Check headers, footers, spacing, typography, buttons, cards, forms and section order.
- [ ] Confirm no element is hidden, clipped, overlapping, stretched, duplicated or unexpectedly moved.
- [ ] Confirm no horizontal page movement or sideways scrolling on mobile.
- [ ] Confirm responsive behavior at small mobile, large mobile, tablet and desktop widths.
- [ ] Confirm the homepage fits the intended first-screen presentation on a 17-inch laptop without unnecessary scrolling.

## 3. Header, menus and navigation
- [ ] Original logo appears correctly on desktop and mobile.
- [ ] Closed mobile menu shows the approved logo/icon behavior.
- [ ] Navigation font size matches the approved larger version.
- [ ] Every main navigation item opens the correct page.
- [ ] Services dropdown/menu exposes every approved service.
- [ ] Emergency and Same-Day are accessible from the approved Services location.
- [ ] No service is reachable only through injected JavaScript or a hidden route.
- [ ] “South Jersey” is replaced with “New Jersey” everywhere required.
- [ ] Sticky Call, Request Service and WhatsApp controls work and do not block content.
- [ ] Request/problem links scroll to the full request section at the correct position on desktop and mobile.
- [ ] Mobile anchors do not jump to the installation video or the wrong section.

## 4. Homepage and media
- [ ] Homepage hero, service/problem icons and request area match the approved design.
- [ ] Video beside the Request section loads, displays the right thumbnail/poster and plays.
- [ ] Video controls, audio behavior and mobile playback work as approved.
- [ ] Hero autoplay behavior works where approved and complies with browser requirements.
- [ ] No video or image is replaced by an unrelated technician photo.
- [ ] Before/after slider works with mouse, touch and keyboard where applicable.
- [ ] Customer media uses the approved audio behavior.
- [ ] Vehicle plates are blurred where required; faces are not unnecessarily hidden.

## 5. Services and service pages
- [ ] Every approved service page exists and returns HTTP 200.
- [ ] Every service card points to the correct page.
- [ ] Emergency card/menu item uses a real, relevant image.
- [ ] Same-Day card/menu item uses a real, relevant and different image.
- [ ] Emergency page shows a substantial real image on mobile and desktop.
- [ ] Each service page has accurate, service-specific copy rather than boilerplate duplication.
- [ ] Commercial services and roll-up door content are present without unnecessary duplicate commercial pages.
- [ ] No unsupported promises such as guaranteed immediate arrival, 24/7 response or fixed pricing appear.
- [ ] Same-day wording clearly depends on location, availability and parts.
- [ ] Safety wording does not encourage operating a damaged or unbalanced door.

## 6. City and service-area pages
- [ ] Every approved city page exists and is linked.
- [ ] Previously missing city pages are restored.
- [ ] PA, NJ and DE abbreviations and service-area language are consistent.
- [ ] No public business address is displayed.
- [ ] No ZIP-code search field is present.
- [ ] No public “100-mile radius” wording is present.
- [ ] “City not listed? Request service” appears in the approved location and works.
- [ ] City pages contain meaningful local/service-specific content and are not thin duplicates.
- [ ] No incorrect city/state combination appears.

## 7. Images and asset review
- [ ] Inventory every image used by page and section.
- [ ] Confirm every image URL/file exists and loads.
- [ ] Confirm descriptive filenames where practical.
- [ ] Confirm every meaningful image has accurate alt text.
- [ ] Confirm decorative images use appropriate empty alt text.
- [ ] Check for duplicate images across pages and replace unintended repeats.
- [ ] Confirm each page uses the approved unique image where requested.
- [ ] Confirm no image contains an old phone number, obsolete branding or private information.
- [ ] Check image dimensions, cropping, orientation, compression and visual quality.
- [ ] Confirm responsive `srcset`/sizes behavior where used.
- [ ] Confirm lazy-loaded images become visible after scrolling.

## 8. Copy, accuracy and originality
- [ ] Read every visible page section manually.
- [ ] Check spelling, grammar, punctuation, capitalization and consistency.
- [ ] Verify business name, phone, licenses, states served, hours and warranty language.
- [ ] Confirm no financing details are published.
- [ ] Confirm customer-supplied parts are not advertised as a standard service.
- [ ] Confirm “licensed, insured and bonded” and license numbers appear only as approved.
- [ ] Check internal duplicate headings, paragraphs, FAQs and CTAs.
- [ ] Compare service/city copy against the public web and key competitors for suspicious copying.
- [ ] Rewrite any passage that is too similar, generic, misleading or unsupported.
- [ ] Confirm all copy is original enough to represent LGDS independently.
- [ ] Confirm prices, discounts and service claims are not presented as universal when they vary.

## 9. Coupons and conversion flow
- [ ] Latest approved coupon layout and numbering are restored.
- [ ] Approved discount wording and maximum discount are correct.
- [ ] Coupon claim buttons work on desktop and mobile.
- [ ] Claimed coupon data reaches the form/lead flow correctly.
- [ ] No rejected coupon wording or outdated discount returns.
- [ ] Coupon terms are clear without unnecessary fine print.
- [ ] Conversion events fire once per valid action and are not duplicated.

## 10. Forms, phone and messaging
- [ ] Submit every form using valid test data.
- [ ] Test required-field validation and invalid inputs.
- [ ] Confirm name, phone, email, address and message fields behave as approved.
- [ ] Confirm no file-upload field exists.
- [ ] Confirm successful submissions show the correct confirmation state.
- [ ] Confirm form attribution/coupon data is preserved.
- [ ] Test every phone link and displayed phone number.
- [ ] Test WhatsApp links and prefilled message where applicable.
- [ ] Confirm forms and buttons remain usable with keyboard only.
- [ ] Confirm all controls have accessible labels.

## 11. Analytics, ads and privacy
- [ ] GA4 Measurement ID is correct.
- [ ] Google Tag ID is correct.
- [ ] Google Ads ID is correct.
- [ ] Page views fire once per page load.
- [ ] Form, call, coupon, WhatsApp and other approved conversions fire correctly.
- [ ] No duplicate tags or duplicate events fire.
- [ ] Consent Mode defaults behave correctly by region.
- [ ] Cookie/privacy behavior matches the approved policy.
- [ ] Privacy Policy text matches actual tracking behavior.
- [ ] Analytics failures do not block page content, menus, media or forms.

## 12. Technical SEO
- [ ] Unique, relevant title on every indexable page.
- [ ] Unique, accurate meta description on every indexable page.
- [ ] Exactly one meaningful H1 per page.
- [ ] Logical H2/H3 hierarchy.
- [ ] Correct canonical URL on every page.
- [ ] Correct index/noindex behavior.
- [ ] Valid sitemap containing all approved indexable pages and no obsolete pages.
- [ ] Valid robots.txt.
- [ ] No broken internal links, assets, anchors or redirects.
- [ ] No accidental redirect chains or loops.
- [ ] Useful 404 behavior.
- [ ] Open Graph/social metadata is correct.
- [ ] Structured data parses without errors.
- [ ] LocalBusiness, Service, FAQ and Breadcrumb schema are accurate and not misleading.
- [ ] License, area-served and business-hours schema match visible content.
- [ ] No duplicate titles, descriptions, canonicals or conflicting schema.

## 13. Local SEO and GEO/AI readiness
- [ ] Business entity information is consistent across the site.
- [ ] Service areas, states and city relationships are explicit and accurate.
- [ ] Services are described in direct answer-friendly language.
- [ ] FAQs answer real customer questions without keyword stuffing.
- [ ] Important facts are present in visible HTML, not only client-side scripts.
- [ ] Breadcrumbs and internal links clarify page relationships.
- [ ] `llms.txt` is evaluated and included only if useful and accurate.
- [ ] Content provides clear expertise, process, safety and service limitations.
- [ ] No fake location, fake address or unsupported availability claim is used.

## 14. Accessibility
- [ ] Keyboard navigation works across menus, forms, sliders and dialogs.
- [ ] Visible focus indicators are present.
- [ ] Text/background contrast is acceptable.
- [ ] Buttons and links have accessible names.
- [ ] Form errors are understandable.
- [ ] Images have appropriate alt text.
- [ ] Video has usable controls and does not trap focus.
- [ ] Mobile tap targets are sufficiently large and separated.
- [ ] Heading landmarks, main, navigation and footer structure are logical.
- [ ] Page zoom does not break content or create horizontal scrolling.

## 15. Performance and Core Web Vitals
- [ ] Run Lighthouse/PageSpeed on homepage and representative service/city pages in mobile and desktop modes.
- [ ] Record Performance, Accessibility, Best Practices and SEO scores.
- [ ] Investigate Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift.
- [ ] Verify hero/video loading does not block the page.
- [ ] Optimize oversized images and unnecessary formats.
- [ ] Verify CSS/JS caching and cache-busting behavior.
- [ ] Remove unused or duplicate scripts introduced by previous fixes.
- [ ] Confirm lazy loading is not hiding above-the-fold content.
- [ ] Confirm third-party tags do not materially break interaction or rendering.
- [ ] Preserve the previously approved speed optimizations and target the best practical score without breaking functionality.

## 16. Browser and device compatibility
- [ ] Test current Chrome desktop and mobile emulation.
- [ ] Test current Edge desktop.
- [ ] Test Safari/WebKit desktop and iPhone behavior.
- [ ] Test Android-sized mobile viewport.
- [ ] Test touch menu, dropdowns, video, forms, sliders and sticky buttons.
- [ ] Confirm no browser-specific console errors.

## 17. Security and release integrity
- [ ] HTTPS loads without mixed-content warnings.
- [ ] No secrets, private files or source maps exposing sensitive data are published unnecessarily.
- [ ] External links use appropriate security attributes where needed.
- [ ] Forms do not expose unexpected data in URLs.
- [ ] Build output contains only intended production files.
- [ ] Preview and production builds use the same build sequence.
- [ ] Diff against the working-video baseline is manually reviewed.
- [ ] Diff against the last approved feature version is manually reviewed.
- [ ] No broad DOM mutation script is allowed to replace arbitrary images, logo, video or menu content.

## 18. Final owner review and release
- [ ] Send a complete list of restored changes.
- [ ] Send a complete list of fixes made during the audit.
- [ ] Send unresolved findings, limitations or items requiring the owner’s decision.
- [ ] Provide the Netlify Preview link.
- [ ] Provide representative desktop and mobile screenshots.
- [ ] Owner visually confirms logo, video, menus, services, coupons, forms and mobile layout.
- [ ] Receive explicit owner approval to publish.
- [ ] Merge only after approval.
- [ ] Verify the production deployment on the live domain after publishing.
- [ ] Run a final live smoke test and correct only verified issues through a new reviewed Preview.
