# VeryCare Design System

## Colour

> **Provisional.** The official logo file could not be downloaded (see `WEBSITE_AUDIT.md` §5), so the brand blue and green below were **not sampled from it**. They are chosen to match the brief's description ("blue and green") and to pass WCAG AA.
>
> **To update:** sample the logo's blue and green (for example with an eyedropper) and replace the values in **both** `js/tailwind-config.js` (`brand.blue.*`, `brand.green.*`) and the `:root` block of `assets/css/styles.css`. Re-check contrast for text uses (700 shades) against white.

| Token | Hex | Use | Contrast on white |
| --- | --- | --- | --- |
| `brand-blue-700` / `--vc-blue-700` | `#17589C` | Primary buttons, links, icons | 7.2 : 1 (AA/AAA) |
| `brand-blue-800` / `--vc-blue-800` | `#114676` | Hover states, CTA band | 9.7 : 1 |
| `brand-blue-50` / `--vc-blue-50` | `#EEF4FA` | Hero and tinted backgrounds, icon badges | — |
| `brand-green-500` / `--vc-green-500` | `#3AA35F` | Decorative accents only (eyebrow rule, active-nav underline, illustrations) | 3.2 : 1, so not used for text |
| `brand-green-700` / `--vc-green-700` | `#1E7444` | Eyebrow text, green icons | 5.8 : 1 (AA) |
| `brand-green-50` / `--vc-green-50` | `#EDF7F0` | Green icon badges | — |
| `ink` / `--vc-ink` | `#0F2A44` | Headings, top bar, footer background | 14.6 : 1 |
| `body` / `--vc-body` | `#3A4A5C` | Body text | 9.1 : 1 |
| `muted` / `--vc-muted` | `#55667A` | Secondary text, hints | 5.9 : 1 |
| `line` / `--vc-line` | `#E2E8EF` | Borders, dividers | — |
| `canvas` / `--vc-canvas` | `#F6F8FA` | Alternating section background | — |
| Error | `#B42318` | Field errors, required marker | 6.6 : 1 |

Automated axe-core checks found no colour-contrast violations (see `QA_REPORT.md`).

## Typography

- **Family:** Figtree (Google Fonts, weights 400–800, `display=swap`), falling back to the system UI sans-serif stack.
- **Body:** 17px (1.0625rem), line height 1.65; text columns are capped at about 68ch.
- **Lead paragraphs:** 19px.
- **Headings:** ink colour, weight 800, tracking −0.015em, `text-wrap: balance`.
  - H1: 36px on mobile → 48px (sm) → 56px (lg, hero only)
  - H2: 30px → 36px
  - H3: 18–24px, weight 700
- **Eyebrow labels:** 13px, uppercase, 0.12em tracking, green-700, with a 28px green rule before them.

## Spacing and layout

- Container: `max-w-7xl` (1280px) with side padding of 16px / 24px (sm) / 32px (lg).
- Section rhythm: `py-16` on mobile → `py-20`/`py-24` on desktop.
- Grids: one column on mobile; services use 2 columns from `sm` and 3 from `lg`; two-column split layouts from `lg` (1024px).
- Mobile-first breakpoints (Tailwind defaults): sm 640, md 768, lg 1024, xl 1280.
- The main navigation switches from the mobile menu to the inline nav at **lg (1024px)**.

## Components

| Component | Class | Notes |
| --- | --- | --- |
| Primary button | `.btn .btn-primary` | Blue-700 fill, white text, 48px minimum height, 8px radius |
| Secondary button | `.btn .btn-secondary` | White fill, 2px blue border |
| Light buttons (on dark) | `.btn-light`, `.btn-outline-light` | For the CTA band |
| Text link | `.text-link` | Underlined, bold blue; used for "Read More" |
| Card | `.card` | White, 1px `line` border, 14px radius, soft two-layer shadow |
| Service card | `.card .service-card` | Equal heights; the link pins to the bottom |
| Icon badge | `.icon-badge` (`--green`, `--sm`) | 52px (40px small) tinted square with a 1.8px-stroke line icon |
| Check list | `.check-list` | Green check circles |
| Notice | `.notice` | Amber, used for "online booking not available" |
| Form control | `.form-control`, `.form-label`, `.field-error` | 50px minimum height, visible focus ring, red invalid state |
| Page hero | `.page-hero` + `.breadcrumb` | Tinted header for inner pages |
| CTA band | `.cta-band` | Dark blue with a subtle green radial accent |

**Radius scale:** 8px (buttons, inputs), 14px (cards), 22px (illustration frames).
**Shadow:** one shadow token (`--vc-shadow`), applied sparingly.

## Icons

- Inline SVG line icons on a 24×24 grid with 1.8 stroke and round caps, drawn for this project (see `LICENSES-AND-ATTRIBUTION.md`).
- All icons are decorative (`aria-hidden="true"`); meaning always comes from adjacent text.

## Imagery

- Two original flat illustrations (`home-living-room.svg`, `home-exterior.svg`) use the brand palette. They show places, not people, so they cannot be mistaken for VeryCare staff or clients.
- If photographs are added later: use licensed images only, record them in `LICENSES-AND-ATTRIBUTION.md`, export WebP/JPEG at no more than 1600px wide, set `width`/`height` attributes, use `loading="lazy"` below the fold, and do not imply the people shown are VeryCare staff or clients.

## Logo

- Path: `assets/images/verycare-logo.png`, displayed at 52px (header) and 56px (footer, on a white plate) high, `width: auto`, with its proportions preserved.
- Fallback: if the file is missing, `js/main.js` hides the image and shows the text wordmark "VeryCare" (blue "Very", green "Care").
- Favicon: `assets/icons/favicon.svg` is a provisional monogram. Replace it with a mark cut from the official logo.

## Accessibility conventions

- Skip link, landmark regions, one H1 per page, and sequential headings.
- `:focus-visible` outline: 3px `#0B4F8A` (white on dark sections).
- Touch targets are at least 44px.
- `prefers-reduced-motion` disables smooth scrolling and transitions.
- Phone numbers do not wrap (`white-space: nowrap`).
