# QA Report

Test date: 25 October 2026. All tests below were actually run in the build environment; results are as recorded.

## Test environment and an important caveat

- Headless Chromium (Playwright), serving the site locally with `python3 -m http.server`.
- **The Tailwind Play CDN (`cdn.tailwindcss.com`) is blocked in the build environment.** For testing, requests to it were intercepted, and an equivalent stylesheet compiled locally was injected in its place. That stylesheet used **Tailwind CSS v3.4.17** with the exact config in `js/tailwind-config.js`, scanning all `*.html` and `js/*.js`. The rendered layout should match the CDN, but the CDN build itself was not loaded in testing. **Do a visual check in a normal browser after deployment.**
- Google Fonts requests were stubbed, so the screenshots use the fallback system font rather than Figtree.
- The logo file is not in the repository, so all tests ran with the text-wordmark fallback.

## 1. HTML validation — PASS

`html-validate` 9 (`html-validate:recommended`) on all 8 HTML files: **0 errors**.
The rules `tel-non-breaking`, `no-inline-style`, `long-title` and `attribute-boolean-style` were disabled. Telephone wrapping is handled in CSS instead (`a[href^="tel:"] { white-space: nowrap }`).

## 2. Responsive layout — PASS

All 8 pages were checked at **320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px**: 80 combinations. Each check looked for horizontal document scroll and for any in-flow element extending outside the viewport.

- First run: overflow on every page at 320px. The cause was a header button whose `display` rule in `styles.css` overrode Tailwind's `hidden`. Fixed by wrapping the button in a span and moving the menu-toggle breakpoint into `styles.css`.
- Final run: **0 overflow issues**.

Screenshots were reviewed visually at 375, 768 and 1440px for Home, About, Services and Contact. No overlap, clipping, distorted illustrations or hidden content was found.

## 3. Accessibility — PASS (automated), manual checks noted

axe-core 4 (WCAG 2.0/2.1/2.2 A and AA rules plus best practices) on every page at 375px and 1280px:

- First run: one `region` violation (moderate) on all pages, because the top contact strip was outside a landmark. Fixed by making it an `<aside aria-label="Contact information">`.
- Final run: **0 violations on all 16 page/viewport combinations.**

Scripted keyboard and behaviour checks (all passed):

| Check | Result |
| --- | --- |
| First Tab press focuses "Skip to main content" | Pass |
| Mobile menu button opens the menu (`aria-expanded="true"`, menu visible) | Pass |
| Escape closes the menu and returns focus to the button | Pass |
| Logo missing → image hidden, text wordmark shown | Pass |

Not tested: real screen readers (NVDA/JAWS/VoiceOver) and manual zoom to 400%. Recommended before launch.

## 4. Links — PASS

A script collected every `href` on every page:

- **0 missing internal files.**
- **0 missing anchor targets.** All `services.html#…` and `#consultation` targets exist.
- **0 empty or `#` links.**
- External destinations are only `tel:+19055193423` and `mailto:info@verycare.ca`, plus Google Fonts and the Tailwind CDN in `<head>`.
- Console: 0 JavaScript errors. The only failing request is the expected missing `assets/images/verycare-logo.png`.

## 5. Consultation form — PASS (behaviour as designed)

| Scenario | Result |
| --- | --- |
| Submit empty | "Please correct the highlighted fields…"; 3 fields marked `aria-invalid`; focus moved to Full Name |
| Submit valid data with no endpoint configured | "Your request has not been sent. Online submission is not connected yet…" with phone and email; URL unchanged (no data in the query string) |
| Browser storage after submit | `localStorage` 0 keys, `sessionStorage` 0 keys |
| "Online booking is not available yet" notice | Shown while `data-endpoint` is empty |
| Submit with an endpoint configured | **Not tested** — no endpoint exists. Code path: `fetch` POST; success message only when the response is `response.ok` |

## 6. SEO checks (manual review)

- Unique `<title>` and meta description on every page.
- Canonical URLs on indexable pages.
- Open Graph tags present.
- `lang="en-CA"`.
- `sitemap.xml` lists the 4 indexable pages; `robots.txt` references it.
- The holding pages (Blog, Privacy, Terms, 404) carry `noindex` and are left out of the sitemap.
- No structured data was added: no verified opening hours or address exist to support it.

## 7. Performance

- No Lighthouse run. Lighthouse is not installed, and the Tailwind CDN cannot load in this environment, which would distort the scores. **No scores are claimed.**
- Asset weights (measured): `styles.css` ≈ 12 KB, `main.js` ≈ 7 KB, the two SVG illustrations ≈ 2 KB and ≈ 4 KB. There are no raster images.
- Known cost: the Tailwind Play CDN script (~100 KB+, compiles in the browser) and Tailwind's own console notice that the CDN is not intended for production. Mitigation: `README.md` → "Optional: compile Tailwind".

## Unresolved issues

1. Official logo file missing (wordmark fallback in use); brand colours are provisional.
2. Live site never inspected (DNS failure); all content is from the supplied extraction.
3. Opening hours unconfirmed and not published.
4. Privacy Policy, Terms and Blog content not supplied; holding pages are in place.
5. Form not connected to any submission service.
6. Copyright entity name ("VeryCare") needs owner confirmation.
7. No screen-reader or real-device testing; no Lighthouse run.
