# VeryCare Website Audit

Audit date: 25 October 2026
Site audited: https://verycare.ca/ (WordPress + Elementor, per the supplied extraction)

## 0. Access limitation — read this first

The live website **could not be inspected** during this project:

| Method | Result |
| --- | --- |
| Direct HTTPS from the build container | Refused by the environment's network policy (proxy returned `403` for `verycare.ca:443`) |
| Web-fetch service (independent network) | `getaddrinfo ENOTFOUND verycare.ca`, and the same for `www.verycare.ca`: the domain did not resolve in DNS at the time of the audit |
| Internet Archive (Wayback Machine) | Not reachable from this environment |
| Web search (`verycare.ca`, the phone number, the hero headline) | No indexed pages for the site were found |

As a result, **every finding below is based on the content extraction supplied with the project brief**, not on a live inspection. Nothing in this report claims that a page was opened, a link was clicked, or a form was submitted on the live site. Items that need live verification are marked **VERIFY**.

The domain not resolving may be temporary, a DNS misconfiguration, or a lapsed registration. **The site owner should check this urgently**: if `verycare.ca` does not resolve, the current website and probably the `info@verycare.ca` mailbox are unreachable for the public.

## 1. Page inventory (from the supplied extraction)

| Page | Source URL (as supplied / inferred) | Content supplied? | New file |
| --- | --- | --- | --- |
| Home | `https://verycare.ca/` | Yes — full extraction | `index.html` |
| About Us | `https://verycare.ca/about-us/` (inferred, **VERIFY**) | Yes — full extraction | `about.html` |
| Blog | unknown | **No** — no article text supplied | `blog.html` (honest holding page, `noindex`) |
| Services | unknown | Service names and descriptions from home page and footer | `services.html` |
| Contacts | `https://verycare.ca/contact-us/` (from footer service links) | Contact details only | `contact-us.html` |
| Privacy Policy | unknown | **No** — policy text not supplied | `privacy-policy.html` (holding page, `noindex`) |
| Terms & Condition(s) | unknown | **No** — terms text not supplied | `terms-and-conditions.html` (holding page, `noindex`) |
| Service detail pages | none known — all footer service links pointed to `https://verycare.ca/contact-us/#` | — | Anchors on `services.html` |

## 2. Navigation and information architecture

- Main navigation (as supplied): Home, About Us, Blog, Services, Contacts.
- Header strip: "Mon - Frd : 8:00 -16:00", info@verycare.ca, "Canada", "Have Any Questions?", +1-905-519-3423.
- Footer: introduction paragraph, eight services, opening hours, contact block, copyright, legal links.
- All eight footer service links pointed to `https://verycare.ca/contact-us/#` — an empty fragment, so every service link went to the same place with no way to tell services apart.

New IA: the same five main pages (with "Contacts" corrected to "Contact Us"), a dedicated Services page with an anchor per service, and legal pages in the footer.

## 3. Existing page content

Fully preserved (with corrections logged in `CONTENT_CORRECTIONS.md`):

- **Home:** hero; "Welcome to VeryCare / Committed to Ensuring Quality Home Care"; About preview (paragraph and four points); services intro and six service cards; "Request a Free Consultation" with the "Book An Appointment" form.
- **About Us:** the three-paragraph introduction, Emergency Contact, and "Why Choose VeryCare".
- **Footer:** introduction, eight services, and contact block.

## 4. Existing service information

| # | Service (full name) | Description supplied | Where shown |
| --- | --- | --- | --- |
| 1 | Personal Care Support | Yes | Home card, Services page, footer |
| 2 | Nursing & Medical Support | Yes | Home card, Services page, footer |
| 3 | Companionship Care | Yes | Home card, Services page, footer |
| 4 | Memory & Dementia Care | Yes | Home card, Services page, footer |
| 5 | Housekeeping & Home Support | Yes | Home card, Services page, footer |
| 6 | Meal Preparation & Dietary Assistance | Yes | Home card, Services page, footer |
| 7 | Live-In Care Services | **No** (name only) | Services page (no invented description), footer |
| 8 | Respite Care for Families | **No** (name only) | Services page (no invented description), footer |

**VERIFY:** whether the live site has descriptions or pages for Live-In Care and Respite Care. If it does, add that text to `services.html`.

## 5. Logo and brand assets

- The supplied logo URL is `https://verycare.ca/wp-content/uploads/2025/08/verycare-removebg-preview.png`. It **could not be downloaded**, because the domain does not resolve.
- No logo file was present in the repository.
- The brief describes the logo as blue and green, with an abstract human/care-inspired symbol.
- **Consequence:** the site references `assets/images/verycare-logo.png`. Until that file is added, a text wordmark ("VeryCare") is shown automatically. The brand colours are provisional and were **not** sampled from the logo (see `DESIGN_SYSTEM.md`).

## 6. Existing image assets

No original images were available, because the domain does not resolve. The extraction names no photographs. The redesign uses two original SVG illustrations created for this project (see `LICENSES-AND-ATTRIBUTION.md`).

## 7. Visual design problems (from the extraction)

- Generic medical-clinic theme ("pathologists", "clinic", "Choose Doctor", "Select Treatment") that does not match a home care provider.
- Duplicated labels on each service card (for example "Memory" and "Memory & Dementia Care").
- Phone number repeated twice in one card.
- The same introduction paragraph repeated on the About page, in "Why Choose VeryCare", and in the footer.
- Three different, conflicting opening-hours displays.

## 8. Mobile usability issues

Could not be assessed on the live site. The redesign was tested at 10 widths from 320px to 1920px (see `QA_REPORT.md`).

## 9. Accessibility issues (from the extraction)

- Generic "Read More" links that are identical for all six services (not distinguishable for screen readers).
- An empty `#` fragment on all service links.
- The form's privacy statement makes a guarantee that the form itself cannot enforce.

## 10. Performance problems

Could not be measured on the live site. Typical WordPress + Elementor + plugin overhead (the extraction mentions SpeedyCache, User Registration, and a consent plugin) is removed entirely by the static rebuild.

## 11. Broken links and images

Not testable live. Known from the extraction: service links pointing to `contact-us/#`, a "View All Healthcare Facilities" link with no known destination, a "Promo T&Cs Apply" link with no known promotion, and "Re-consent".

## 12. Questionable statistics and template artifacts

| Item | Assessment | Treatment |
| --- | --- | --- |
| "780k Patients Served" | Implausible for a single Ontario home care provider; theme demo figure | Removed, not replaced |
| "250+ Expert Pathologists" | Pathologists are laboratory physicians; not a home care role; theme demo figure | Removed |
| "90+ Premium Branch" | No branches are named anywhere; contradicts "Ontario, Canada" as the only location | Removed |
| "100% Assurance of Client Satisfaction" | Unsupported guarantee | Removed |
| "More than twenty one locations across the country" | No locations are listed; contradicts the single Ontario location | Removed |
| "Visit Our Clinic", "Office: CANADA", "View All Healthcare Facilities" | Clinic-template wording; no address or facility list exists | Replaced with the verified "Ontario, Canada" |
| "Choose Doctor", "Select Treatment" | Clinic-template form fields; no doctor or treatment list exists | "Choose Doctor" removed; "Select Treatment" became "Select Service", listing the 8 published services |
| "© 2026, Skillscore All rights reserved" | Footer from another brand/theme | Changed to "© [year] VeryCare. All rights reserved." — **owner must confirm the legal entity name** |
| Store coming soon, Customize, New, Edit Page, Edit with Elementor, User Registration, SpeedyCache, Howdy admin, 21, 0 | WordPress admin toolbar and plugin items (visible only to a logged-in admin) | Excluded |
| "Re-consent" | Consent-plugin control; plugin not available to audit | Excluded |
| "*Promo T&Cs Apply" | No promotion exists in any supplied content | Excluded |

## 13. Conflicting opening hours

Three mutually inconsistent schedules were supplied:

1. Header: "Mon - Frd : 8:00 -16:00" (Mon–Fri 8:00–16:00)
2. Appointment section: Monday–Sunday 08:00–18:00, plus "24/7 Service For Emergencies"
3. Footer: Monday–Saturday "9am – 7am", Sunday Closed ("9am – 7am" is itself impossible as written)

The conflict cannot be resolved without the owner. **No opening hours are published on the new site**, and visitors are directed to the phone and email instead. See `CONTENT_CORRECTIONS.md` §3.

## 14. Incorrect or uncertain footer information

- Copyright entity "Skillscore" (see §12).
- "Terms & Condition" corrected to "Terms & Conditions".
- Legal page texts were not supplied, so they could not be preserved. **VERIFY and supply.**

## 15. Recommended next steps for the owner

1. Restore DNS for `verycare.ca` (and check the `info@verycare.ca` mail records).
2. Add the official logo file as `assets/images/verycare-logo.png`, then update the brand colours from it.
3. Confirm the real opening hours and whether emergency/24-7 telephone support is offered.
4. Confirm the legal entity name for the copyright line.
5. Supply the existing Privacy Policy, Terms & Conditions, and blog articles for migration.
6. Choose a form-submission service (or keep phone/email only). See `README.md` → "Connecting the consultation form".
7. Supply licensed photographs, if photography is preferred over the illustrations.
