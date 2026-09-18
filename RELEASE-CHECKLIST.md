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
