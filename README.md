# VeryCare Website

Static website for **VeryCare**, a home care provider in Ontario, Canada.
Phone: +1-905-519-3423 · Email: info@verycare.ca

The site is a rebuild of https://verycare.ca/ using the content supplied for the project. It has no database, no backend and no build step.

> **Status — action needed before launch:** add the official logo, confirm opening hours, supply the legal page texts, and decide how the consultation form should submit. See [Known limitations](#known-limitations).

## Technology

- HTML5, CSS3, vanilla JavaScript
- Tailwind CSS via the Play CDN (`https://cdn.tailwindcss.com`), configured in `js/tailwind-config.js`
- Figtree font from Google Fonts
- Local SVG illustrations and icons

## Structure

```
index.html                 Home
about.html                 About Us
services.html              All 8 services (anchors: #personal-care, #nursing-care, #companionship,
                           #memory-care, #housekeeping, #meal-prep, #live-in-care, #respite-care)
contact-us.html            Contact details + consultation form (#consultation)
blog.html                  Holding page (articles to be migrated)          noindex
privacy-policy.html        Holding page (policy text to be supplied)       noindex
terms-and-conditions.html  Holding page (terms text to be supplied)        noindex
404.html                   Not-found page (uses <base href="/">)
assets/css/styles.css      Design tokens + components
assets/images/             Illustrations; put verycare-logo.png here
assets/icons/favicon.svg   Provisional favicon
js/tailwind-config.js      Tailwind theme (brand colours, font)
js/main.js                 Mobile menu, logo fallback, footer year, form handling
robots.txt, sitemap.xml
docs/                      Audit, content corrections, design system, QA, deployment
```

## Run locally

Open `index.html` directly in a browser, or (better, so that paths behave as on a server) run a static server from the project folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

An internet connection is needed for the Tailwind CDN and the font.

## Editing

- **Text:** edit the HTML file for that page. The header and footer are repeated in every page, so **a change to the navigation, footer or contact details must be made in all 8 HTML files** (search and replace works well: e.g. search for `info@verycare.ca`).
- **Styles:** use Tailwind utility classes in the HTML for layout. Use `assets/css/styles.css` for the shared components (`.btn`, `.card`, `.eyebrow`, form styles…). Colours are defined twice and must stay in sync: the `:root` variables in `styles.css`, and `brand` in `js/tailwind-config.js`. See `docs/DESIGN_SYSTEM.md`.
- **Logo:** save the official file as `assets/images/verycare-logo.png`. It appears automatically in the header and footer. Until then a text wordmark is shown. If the file has a different format, keep the format and update the `src` in all pages (search for `verycare-logo.png`). Then update the brand colours from the logo, and replace `assets/icons/favicon.svg`.
- **Images:** put files in `assets/images/`, always set `alt`, `width` and `height`, and record the licence in `LICENSES-AND-ATTRIBUTION.md`.
- **Adding a page with existing content:** copy `about.html`, change the `<title>`, meta description, canonical/OG URLs, the `aria-current="page"` link and the content inside `<main>`. Add it to the navigation in every page and to `sitemap.xml` if it should be indexed.

## Connecting the consultation form

The form has no submission service, because none could be verified on the original site. In this state the form:

- validates input and tells the visitor plainly that the request has **not** been sent, with the phone number and email;
- never stores data in the browser and never puts it in the URL.

To connect a service (any form backend that accepts a standard `POST` of form data and returns a 2xx status), set its URL on **both** forms: in `index.html` and in `contact-us.html`:

```html
<form ... data-consultation-form data-endpoint="https://your-form-service.example/endpoint">
```

The "not available" notice then hides automatically. A success message appears only when the service returns a 2xx response. Before connecting a service, review the Privacy Policy and the service's data handling (the form collects names, emails and phone numbers).

## Testing

Recommended checks before each release:

1. **HTML validity:** `npx html-validate "*.html"`
2. **Links:** every internal `href` should point to an existing file and anchor (no `href="#"`).
3. **Responsive:** check widths 320–1920px for horizontal scrolling. Use browser dev tools or Playwright.
4. **Accessibility:** run axe DevTools or Lighthouse on each page, and tab through each page with the keyboard.
5. **Form:** submit empty (errors should show) and valid (honest status message should show).

The results of the checks run for this delivery are in `docs/QA_REPORT.md`.

## Deploy

Upload the files to any static host. See `docs/DEPLOYMENT.md` for cPanel/hPanel, Netlify, Cloudflare Pages and GitHub Pages.

### Optional: compile Tailwind

The Play CDN compiles CSS in the visitor's browser and logs a "not for production" console notice. To serve a precompiled stylesheet instead (needs Node.js once, at build time only):

```bash
npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o assets/css/tailwind.css --minify
```

Where `tailwind.config.js` exports the object in `js/tailwind-config.js` with `content: ["./*.html", "./js/*.js"]`, and `input.css` contains the three `@tailwind` directives. Then replace the two Tailwind `<script>` tags in each page with `<link rel="stylesheet" href="assets/css/tailwind.css">` placed **before** `styles.css`.

## Known limitations

1. **The live site could not be inspected:** `verycare.ca` did not resolve in DNS during the project. All content comes from the supplied extraction. See `docs/WEBSITE_AUDIT.md`.
2. **Logo missing:** the text wordmark fallback is in use and the brand colours are provisional.
3. **Opening hours not published:** the three supplied schedules conflict. See `docs/CONTENT_CORRECTIONS.md` §3.
4. **Legal pages and blog:** their texts were not supplied, so holding pages are in place.
5. **Form:** not connected to any submission service (see above).
6. **Copyright line** reads "© [year] VeryCare". The legal entity name needs owner confirmation (the old site showed "Skillscore").
7. The Tailwind Play CDN is intended for development; see "Optional: compile Tailwind".
