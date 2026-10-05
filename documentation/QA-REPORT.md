# Verification report — Orchard & Jar 1.2.1

Date: 2 October 2026.

## Source and asset checks — passed

- All 20 HTML documents checked (19 storefront pages plus documentation).
- All local image, stylesheet, script and navigation targets exist; linked anchors resolve.
- No duplicate HTML IDs; one active primary heading per page. Detail variants are hidden unless selected.
- Image alt attributes and input labels checked.
- JSON-LD examples parse successfully.
- All 68 image assets verified; WebP files decode and SVG files parse.
- Both authored JavaScript files pass syntax checks.
- 165 DOM assertions passed across all 19 storefront pages, including every product and journal variant.

## Rendered Chromium layout checks — passed

The complete 19-page storefront was checked with a real headless Chromium 143 browser using local files, with JavaScript and local styles/assets enabled.

Widths: **320, 375, 390, 430, 640, 768, 820, 1024, 1280, 1440 and 1920 px**.

At every width each page was checked in:

- Light + LTR
- Dark + LTR
- Light + RTL
- Dark + RTL

**836 page/width/theme/direction combinations passed.** Automated measurements found no horizontal document overflow, off-screen checked headings/text/controls, broken visible images or missing/duplicate visible primary headings. No JavaScript page errors or console errors were reported.

Desktop and mobile first-viewport screenshots for all 19 storefront pages were reviewed in contact sheets. Full-page captures of both homepages and a dark/RTL tablet catalogue were also inspected. Original photos and representative illustration assets were visually reviewed.

## Real-browser interactions — passed

**16 browser interaction assertions passed**, covering:

- Mobile navigation, homepage dropdown and Escape dismissal
- Theme and layout direction persistence across page navigation
- Catalogue search and fruit filtering
- Product size/quantity controls and enquiry subject transfer to the contact page
- Invalid-form focus and validated enquiry demo response
- Password mismatch, visibility, successful demo registration and password clearing
- Gift-box preview
- Journal pagination and topic filtering

The mobile menu icon-bubbling issue found by this testing was fixed, then the interaction suite was rerun successfully.

## Automated accessibility — passed within tested scope

Axe-core 4.10.3 was run on all 19 storefront pages at 390 px in both light and dark themes using WCAG 2 A/AA and WCAG 2.1 AA rules. **38 scans completed with zero detected violations** with the updated three-color interface, heading backgrounds and testimonial portraits.

Automated scans are not formal WCAG certification. Screen-reader usability, every keyboard sequence and all assistive technologies have not been exhaustively tested.

## Requested refinements — passed

- Repeated-card grids checked for matching heights within rows at mobile, tablet and desktop widths. The final tablet journal story uses a full-width image-and-copy row to remove unused space.
- Three motion checks passed: normal scroll reveal, visible completion and switching to reduced motion.
- Mobile and tablet footer screenshots reviewed: brand and all three link groups remain together with compact spacing.
- Main page-header backgrounds and replaceable testimonial image paths verified locally. Internal section headings have no background images.
- The interface uses black, white and berry primary. Raster sample photos and illustrations retain their natural colors.

## Content and typography corrections — passed

- All 19 storefront pages checked at 390, 820 and 1440 px: 57 checks confirmed visible paragraphs render at 16 px, internal section headings have no background images and visible copy contains no template/development labels.
- Home 2 now has its own seasonal calendar, orchard pairings, flavour guide, pantry care and harvest steps.
- Full responsive, interaction and accessibility checks rerun after corrections; the Home 2 flavour-heading contrast issue was corrected.

## Screenshot fixes — passed

- Opened the actual mobile topic dropdown in dark mode: the picker background is black, the selection is berry, and changing the topic still filters stories.
- Confirmed the final journal card fills its tablet row at 640, 768, 820 and 1023 px.
- Image hover zoom and reduced-motion behavior checked in Chromium.
- Reran all 836 layout combinations, 16 interaction assertions and 38 accessibility scans with no detected issues.

## Remaining platform and performance limits

Firefox, Safari and actual Microsoft Edge were not available; no cross-engine/browser-version certification is claimed. Testing used simulated viewport widths, not physical mobile/tablet devices. No Lighthouse score, Core Web Vitals measurement or production-network speed claim is made.

The responsive checks measure overflow, visibility and asset loading; they are not a mathematical proof against every possible text overlap or future content change. Recheck after replacing copy, photos, product labels or fonts.

## Integration limits

No real account, dashboard, payment, checkout, form transmission, newsletter subscription or map integration is enabled. Business/product information is fictional or illustrative and must be replaced with verified details before launch.
