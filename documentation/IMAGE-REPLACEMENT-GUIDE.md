# Replace your images

Every image box is replaceable. To keep HTML and JavaScript unchanged, export your image in the same format and overwrite the matching file with exactly the same filename. Keep backups of your originals. Photos retain their own colors; interface text, icons, borders and buttons use black, white and berry primary.

## Testimonial portraits

| Customer sample | Image path |
| --- | --- |
| Emily Parker | `assets/images/testimonials/maya.webp` |
| James Mitchell | `assets/images/testimonials/arun.webp` |
| Grace Wilson | `assets/images/testimonials/leela.webp` |

Use a square portrait, ideally at least 240 × 240 px. These samples are illustrated placeholders. Each HTML testimonial has an explicit image `src` path. Change its alt text and customer name when replacing it with a real authorized testimonial.

## Heading backgrounds

Only each storefront page’s main header/title area uses its background. Internal section headings stay plain. Edit the clearly listed URLs in `assets/css/image-paths.css`, or overwrite the corresponding WebP file under `assets/images/headings/`.

Home 1 uses `home-1.webp`; Home 2 uses `home-2.webp`. Journal pages use `journal.webp` and `journal-details.webp`. Other pages use their HTML basename: for example, `about.webp`, `products.webp`, `contact.webp`, `login.webp` or `privacy.webp`. The documentation uses `about.webp`.

Use a landscape image, preferably 1600 px wide. Backgrounds use centered `cover` cropping so they fill the heading area without stretching. A black scrim maintains white-text readability. Adjust `background-position` in `refinements.css` if your image subject needs a different crop. Text stays in normal document flow and the area grows for wrapped headings.

To use a JPG or PNG, change its URL in `image-paths.css` to the actual filename. The main Home 2 orchard photo also uses `assets/images/headings/home-2.webp`; update that HTML `src` if changing the file extension.

## Products, gifts, editorial and team images

Replace the existing files under `assets/images/`, using the same names and WebP format for an image-only update. Product and gift images are cropped into consistent card aspect ratios; choose images with the subject centered and leave room around it. Product images in the original package are illustrations.

For a different filename, update the corresponding HTML `src`. Product detail galleries also use thumbnail `data-src` values; update those together. Keep alt text accurate and reserve width/height dimensions matching the image proportions. No JavaScript logic change is required.

Matching cards stretch to equal heights within repeated grids. Mobile and tablet use smaller gaps. Optional reveal/hover effects automatically respect reduced-motion preferences. Check your actual images at mobile and tablet widths after replacement, especially text embedded inside a photograph.
