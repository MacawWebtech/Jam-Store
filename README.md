# Orchard & Jar — Stackly Fruit Preserve & Jam Template

A complete, offline-friendly, multi-page HTML5 template for a fictional local artisan preserve shop. The design combines black, white and berry primary (#742f3e) with editorial typography, original product illustrations and three AI-created lifestyle photographs.

## Run

Unzip the package and open `index.html` in a browser. All styles, scripts, fonts and images are local. For a local HTTP preview, run `python3 -m http.server 8080` in this folder and visit `http://localhost:8080/`. No build step, installation or backend is required.

## Technology

HTML5, organized CSS3, Bootstrap 5.3.3, Bootstrap Icons 1.11.3 and vanilla ES6+ JavaScript. System serif and sans-serif fonts avoid remote font requests. All authored code is expanded and indented, line by line. The bundled Bootstrap source stylesheet is the official readable, unminified version.

## Pages

- `index.html`: story-led preserve shop homepage
- `home-2.html`: orchard pantry homepage with a harvest calendar, flavour pairings and pantry care guide
- `about.html`: story, mission, values, process, illustrated makers and timeline
- `products.html`: 12-product searchable, filterable catalogue
- `product-details.html`: query-driven details for all 12 products, gallery, sizes, quantity, ingredients, storage, nutrition placeholders and FAQs
- `gifting.html`: gift boxes, occasions, flavour builder and corporate gifting
- `bulk-orders.html`: formats, volume examples, process, FAQs and enquiry
- `pricing.html`: equal-height one-time pantry bundles and comparison
- `blog.html`: six editorial stories with search, topic filters and pagination
- `blog-details.html`: query-driven full articles, sidebar, sharing and related stories
- `contact.html`: validated enquiry form, sample contact information, map placeholder and FAQs
- `login.html`, `register.html`, `forgot-password.html`: validated frontend account demonstrations
- `404.html`, `coming-soon.html`: niche-specific utility pages
- `privacy.html`, `terms.html`, `accessibility.html`: editable sample information pages
- `documentation/index.html`: customization and integration guidance

## Folder structure

- `assets/css/style.css`: tokens and reusable components
- `assets/css/responsive.css`: screen-size adjustments
- `assets/css/dark-mode.css`: black, white and berry dark palette
- `assets/css/refinements.css`: compact responsive spacing, matching card heights and subtle motion
- `assets/css/image-paths.css`: replaceable heading-background paths for every page
- `assets/css/rtl.css`: direction-specific details
- `assets/js/theme-init.js`: pre-paint preference initialization
- `assets/js/main.js`: navigation, filters, product controls, journal, validation and demo messages
- `assets/js/products.json`: reference product data; the pages are statically rendered and do not fetch this file
- `assets/images/`: optimized WebP photos, original illustrations and SVG fruit/logo artwork
- `assets/vendor/`: local Bootstrap CSS, Bootstrap Icons CSS and its WOFF2 font
- `sitemap.xml`, `robots.txt`: replace `https://example.com/` with your final domain
- `documentation/`: user guide and QA report

## Customize

1. Edit shared palette values at the start of `assets/css/style.css`; edit the matching dark tokens in `dark-mode.css`.
2. Replace `assets/images/logo.svg` and change the brand text in each static page header and footer.
3. See `documentation/IMAGE-REPLACEMENT-GUIDE.md` for testimonial, heading and other image slots. Replace images while retaining their filenames, or update HTML paths and JavaScript gallery `data-src` paths together. Product image files are illustrations, not genuine product photography.
4. Edit product cards in `products.html` and matching detail articles in `product-details.html`. Keep URL product slugs, data attributes, prices and descriptive metadata aligned. Update all homepage/related cards that feature that product.
5. Change article cards in `blog.html`, detail content in `blog-details.html`, and the article date mapping in `main.js`.
6. Edit all fictional business details, prices, testimonials, team profiles, sourcing stories, ingredients, nutrition and legal pages before commercial use.
7. Replace canonical and Open Graph URL placeholders, JSON-LD URLs, sitemap and robots domain placeholders with verified launch URLs.
8. Theme and direction buttons persist only local preferences. Set default direction with the HTML `dir` attribute or customize `theme-init.js`.

## Forms and integration boundaries

All forms are frontend demos. Submission performs local validation and displays a transparent demo result. Enquiries, emails and passwords are never transmitted or persisted. Login does not authenticate; registration does not create an account; reset does not email a reset link. No dashboard, cart, checkout or live payment processing exists.

Before connecting a real service, remove the relevant demo submit handler in `initForms()`, add your actual form action or submission endpoint, implement the service's validation and error handling, and update the privacy policy. Formspree and Netlify Forms are possible integration points; Mailchimp and ConvertKit are newsletter options. Keep secrets on a backend, never in this template. A real account flow needs a proper authentication service and server-side security.

The map is a labelled visual placeholder. Replace it with a verified address and an approved safe embed without exposing API secrets. Product enquiries link to the contact form; optional Stripe/PayPal checkout would be a separate integration, and is not included.

## Accessibility and performance

Semantic landmarks, labelled inputs, inline errors, visible keyboard focus, skip navigation, native details/summary controls, 44 px primary touch targets, reduced-motion handling and logical CSS spacing. Lazy-loaded, optimized local WebP assets and reserved image dimensions reduce external requests. No formal accessibility certification or Lighthouse score is claimed. See `documentation/QA-REPORT.md` for actual verification scope and limits.

## Credits

- Bootstrap 5.3.3: https://getbootstrap.com/ — MIT, bundled copyright header retained.
- Bootstrap Icons 1.11.3: https://icons.getbootstrap.com/ — MIT, license included in `assets/vendor/LICENSE-icons.txt`.
- Three lifestyle photographs: original AI-generated fictional scenes, created with OpenAI imagegen for this template. Intentional crops recur where they depict the same brand/product story.
- Product jars, gift-set cards, fruit SVGs, maker portraits, kitchen/editorial illustrations, 404 scene and logo: original locally authored illustration assets. Maker profiles are clearly fictional.
- Fonts: browser/system fonts (Georgia, Times New Roman, Trebuchet MS, Arial); embedded illustrations use rendered DejaVu font glyphs.
- No third-party stock image is included. Search imagery was consulted but not copied into the template.

## Release

Version 1.2.1 · 2 October 2026. See `CHANGELOG.md`.
