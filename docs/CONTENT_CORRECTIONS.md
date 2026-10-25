# Content Corrections Log

Source: the content extraction supplied with the project brief. The live site could not be inspected (see `WEBSITE_AUDIT.md` §0).
Principle: preserve meaning and substance, fix only demonstrable errors, and never invent facts.

## 1. Spelling, grammar and capitalization

| Location | Original | Corrected | Reason |
| --- | --- | --- | --- |
| Home – welcome heading | Committed to ensure Quality Homecare | Committed to Ensuring Quality Home Care | Grammar ("committed to ensuring"); "home care" as two words, matching the rest of the site; title case |
| Home – about heading | Our Goal Is To Make Your Life Better | Our Goal Is to Make Your Life Better | Title case: "to" is lowercase |
| Home – services heading | …Services Tailored For You | …Services Tailored for You | Title case |
| Header hours | Mon - Frd : 8:00 -16:00 | *(not published — see §3)* | "Frd" typo; schedule conflicts with other sources |
| Navigation | Contacts | Contact Us | Conventional label; the page URL is `contact-us` |
| Section label | Have Any Questions? | Have any questions? (header) / Have Any Questions? (Contact page eyebrow) | Sentence case in body text |
| Section label | Who we are | Who We Are | Matches the other uppercase eyebrow labels (rendered in uppercase) |
| Home – contact card | Get Appointment | Get an Appointment | Missing article |
| Home – contact card | Call US: | *(phone number shown under "Get an Appointment")* | Capitalization; label redundant |
| Footer | Terms & Condition | Terms & Conditions | Plural |
| Form | Book An Appointment | Book an Appointment | Title case |
| Form | Privacy wording: "…Privacy Policy, We guarantee…" | See §6 | Comma splice; also a factual issue |
| Footer | Meal Prep & Dietary Support (card) / Meal Preparation & Dietary Assistance (footer) | Meal Preparation & Dietary Assistance used everywhere | One consistent name; the footer form is the most complete |

Body paragraphs (hero, About Us, service descriptions, footer introduction) are reproduced word for word. They were already grammatical; the em dashes and curly apostrophes were kept as typeset.

## 2. Duplicated labels on service cards

Each card had a short label and a long label (for example "Memory" / "Memory & Dementia Care"). The long labels, which match the footer, are now used as the single card heading:

| Short label(s) removed | Heading used |
| --- | --- |
| Personal Care | Personal Care Support |
| Nursing Care | Nursing & Medical Support |
| Companionship | Companionship Care |
| Memory | Memory & Dementia Care |
| Housekeeping | Housekeeping & Home Support |
| Meal Prep, Dietary, Meal Prep & Dietary Support | Meal Preparation & Dietary Assistance |

"Read More" links are kept. They now go to that service's section on `services.html` (previously every link went to `contact-us/#`) and carry screen-reader text naming the service.

## 3. Opening hours — CONFLICT, NOT PUBLISHED

| Source | Text supplied |
| --- | --- |
| Header strip | Mon - Frd : 8:00 -16:00 |
| Appointment section | Monday – Thursday 08:00 – 18:00; Friday 08:00 – 18:00; Saturday 08:00 – 18:00; Sunday 08:00 – 18:00; "24/7 Service For Emergencies" |
| Footer | Monday–Saturday: 9am – 7am; Sunday: Closed |

- The three schedules contradict each other: weekdays 8–4, every day 8–6, and Monday–Saturday with Sunday closed.
- "9am – 7am" is impossible as written. It may mean 9am–7pm or be a theme default, and there is no evidence either way.
- **Decision:** no schedule is shown anywhere on the new site. Visitors are directed to phone and email. Add the confirmed hours once the owner provides them.

## 4. "24/7" and emergency wording

| Original | New | Reason |
| --- | --- | --- |
| "Call us 24/7 with any emergency or to schedule an appointment & check your health." | "Call us to schedule an appointment." | 24/7 emergency availability could not be verified and conflicts with the published hours. "Check your health" is clinic-template wording. |
| "24/7 Service For Emergencies" | *(removed)* | Unverified |
| "Emergency Contact: 1-905-519-3423" | Kept as "Emergency Contact", plus the added line "In a medical emergency, call 911." | Keeps the published label without presenting the number as a clinical emergency service |

**Owner to confirm:** whether a 24/7 line exists. If it does, the original wording can be restored.

## 5. Template statistics and location claims — removed

| Original | Action | Reason |
| --- | --- | --- |
| Our scale and reach to client Satisfaction | Section removed | Its figures are unsupported |
| 780k — Patients Served | Removed | Implausible for the business; matches medical-theme demo content |
| 250+ — Expert Pathologists | Removed | Pathologists do not provide home care |
| 90+ — Premium Branch | Removed | No branches exist in any supplied content |
| 100% — Assurance of Client Satisfaction | Removed | Unsupported guarantee |
| Visit Our Center: "With more than twenty one locations across the country…" | Removed | No locations listed; contradicts the single "Ontario, Canada" location |
| Visit Our Clinic / Office: CANADA / View All Healthcare Facilities | Replaced with "Where We Are — Ontario, Canada" | No clinic, address or facility list exists; "Ontario, Canada" is the verified location |

No replacement figures were invented.

## 6. Consultation form

| Original | New | Reason |
| --- | --- | --- |
| Full Name*, Email Address*, Phone Number* | Kept, required | — |
| Select Treatment | Select Service (optional), listing the 8 published services | No treatment list exists; the published services are the only verified options |
| Choose Doctor | **Removed** | No doctor directory exists; inventing one is not acceptable |
| Date | Preferred Date (optional), past dates rejected | Clarity |
| Submit Appointment | Submit Appointment Request | No submission service is connected, so a booking cannot be made |
| "By submitting this form you are agreeing to our Privacy Policy, We guarantee not to disclose your information." | "Please read our Privacy Policy before sharing personal information." | The policy text was not available to confirm the guarantee, and the form cannot send data anyway |
| *(none)* | Notice: "Online booking is not available yet…" with the phone number and email | Required honesty: the form is not connected to any service |

## 7. Footer branding and legal items

| Original | New | Reason |
| --- | --- | --- |
| © 2026, Skillscore All rights reserved | © [current year] VeryCare. All rights reserved. | "Skillscore" is unrelated to VeryCare (theme/template residue). The brand name is used, but **the legal entity name needs owner confirmation**. |
| *Promo T&Cs Apply | Removed | No promotion exists |
| Re-consent | Removed | Consent-plugin control; the plugin is not part of a static site |
| Store coming soon | Removed | WordPress/WooCommerce admin notice; no store exists |

## 8. WordPress administration artifacts — excluded

Customize, New, Edit Page, Edit with Elementor, User Registration, SpeedyCache, "Howdy, admin", "21", "0". These are admin-bar items and notification counters that only a logged-in administrator sees.

## 9. Consolidated repetition

- The introduction paragraph ("At VeryCare, we believe everyone deserves…") appeared on the About page, in "Why Choose VeryCare", and in the footer.
- It is now shown once on the About page (as its opening paragraph) and once in the footer. "Why Choose VeryCare" presents the four published points ("Licensed, insured, professional caregivers"…) instead of repeating the paragraph a third time.
- The duplicate phone number in the appointment card is shown once.

## 10. New interface text (no factual claims)

These short labels were written to make the interface usable. They contain no new facts:

- "Home Care in Ontario" (hero eyebrow, from "home care provider in Ontario")
- "Email Us / Send us your questions"
- "Where We Are / VeryCare provides home care in Ontario, Canada"
- "Book a Consultation" (header button, from the footer's "Book Your Consultation")
- "Ask about [service]" links
- "Contact us to discuss live-in care services." / "…respite care for families." (no description was published for these two services)
- Holding text on Blog, Privacy Policy and Terms pages, explaining that the text is being transferred
- 404 page text
- Form validation and status messages
