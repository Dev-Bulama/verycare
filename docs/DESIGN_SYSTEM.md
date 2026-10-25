# VeryCare Design System

## Colour

Brand colours are **sampled from the official logo** (`assets/images/source/verycare-logo-original.jpg`, the most frequent non-white pixel values). Derived tints and shades are marked "derived".

| Token | Hex | Source | Use | Contrast on white |
| --- | --- | --- | --- | --- |
| `brand-blue-500` / `--vc-blue-500` | `#3D92E5` | Logo light blue | Illustrations, decorative only | 3.3 : 1 |
| `brand-blue-600` / `--vc-blue-600` | `#2D73BB` | Logo blue (main) | Primary buttons (white text) | 4.9 : 1 (AA) |
| `brand-blue-700` / `--vc-blue-700` | `#21568C` | Logo dark blue | Links, text-coloured icons, button hover | 7.6 : 1 (AAA) |
| `brand-blue-800` / `--vc-blue-800` | `#1A4570` | Derived | CTA band background | 9.9 : 1 |
| `brand-blue-50` / `--vc-blue-50` | `#EEF5FC` | Derived | Hero and tinted backgrounds, icon badges | — |
| `brand-green-500` / `--vc-green-500` | `#2EA026` | Logo green | Decorative accents (eyebrow rule, active-nav underline, illustrations) | 3.4 : 1, so not used for text |
| `brand-green-700` / `--vc-green-700` | `#1F7419` | Derived (darkened logo green) | Eyebrow text, "Care" in the wordmark, green icons | 5.9 : 1 (AA) |
| `brand-green-50` / `--vc-green-50` | `#EDF8EC` | Derived | Green icon badges | — |
| `ink` / `--vc-ink` | `#0F2A44` | Neutral | Headings, top bar, footer background | 14.6 : 1 |
| `body` / `--vc-body` | `#3A4A5C` | Neutral | Body text | 9.1 : 1 |
| `muted` / `--vc-muted` | `#55667A` | Neutral | Secondary text, hints | 5.9 : 1 |
| `line` / `--vc-line` | `#E2E8EF` | Neutral | Borders, dividers | — |
| `canvas` / `--vc-canvas` | `#F6F8FA` | Neutral | Alternating section background | — |
| Error | `#B42318` | — | Field errors, required marker | 6.6 : 1 |

Colours are defined twice and must stay in sync: in `js/tailwind-config.js` (`brand.*`) and in the `:root` block of `assets/css/styles.css`. Automated axe-core checks found no colour-contrast violations (see `QA_REPORT.md`).

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

- Two original flat illustrations (`home-living-room.svg`, `home-exterior.svg`) use the logo palette. They show places, not people, so they cannot be mistaken for VeryCare staff or clients.
- If photographs are added later: use licensed images only, record them in `LICENSES-AND-ATTRIBUTION.md`, export WebP/JPEG at no more than 1600px wide, set `width`/`height` attributes, use `loading="lazy"` below the fold, and do not imply the people shown are VeryCare staff or clients.

## Logo

- **Master files** (kept in the repository, not deployed): `assets/images/source/verycare-logo-original.jpg` (as supplied, 1167×1167 JPEG on white) and `verycare-logo-transparent.png`. The transparent version was made by removing only the outer white background, which keeps the white details inside the hands; the artwork was not redrawn.
- **Web file:** `assets/images/verycare-logo.png`, 261×256 transparent PNG (≈14 KB). It is shown at 48px high in the header and 44px in the footer (on a white plate), with proportions preserved.
- The mark has no lettering, so the name **"VeryCare"** is set beside it as live text: "Very" in blue-700 and "Care" in green-700, in Figtree ExtraBold. The image has empty `alt` because the adjacent text and the link's `aria-label` ("VeryCare home") already name it.
- **Favicons** (generated from the logo): `assets/icons/favicon-32.png`, `icon-192.png`, `apple-touch-icon.png` (180px, white background).
- **Social sharing image:** `assets/images/og-image.jpg` (1200×630, logo centred on white).

## Accessibility conventions

- Skip link, landmark regions, one H1 per page, and sequential headings.
- `:focus-visible` outline: 3px `#0B4F8A` (white on dark sections).
- Touch targets are at least 44px.
- `prefers-reduced-motion` disables smooth scrolling and transitions.
- Phone numbers do not wrap (`white-space: nowrap`).
