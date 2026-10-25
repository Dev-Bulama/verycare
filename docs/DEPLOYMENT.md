# Deployment

The site is plain static files: no build step, database or server-side code. Upload the repository contents (everything except `docs/`, `README.md` and `LICENSES-AND-ATTRIBUTION.md`, which are harmless if included) to the web root.

Files the web server must serve: `*.html`, `assets/`, `js/`, `robots.txt`, `sitemap.xml`.

## Before going live

1. Add the official logo at `assets/images/verycare-logo.png`.
2. Confirm the domain: canonical URLs, Open Graph URLs, `sitemap.xml` and `robots.txt` all assume `https://verycare.ca/`. Change them if the site will live elsewhere.
3. Make sure `verycare.ca` resolves in DNS. It did not resolve during this project.
4. Configure the 404 page (below).

## cPanel / hPanel (shared hosting)

1. Open **File Manager** and go to `public_html/` (back up or remove the old WordPress files first, if this replaces WordPress).
2. Upload the files, keeping the folder structure. Or zip them locally, upload, and **Extract**.
3. `index.html` is served automatically at `/`.
4. 404 page: add to `public_html/.htaccess`:
   ```
   ErrorDocument 404 /404.html
   ```
5. Optional, to redirect old WordPress URLs:
   ```
   Redirect 301 /about-us/   /about.html
   Redirect 301 /contact-us/ /contact-us.html
   ```
6. Enable SSL (AutoSSL / Let's Encrypt) in the control panel.

## Netlify

1. **Add new site → Import an existing project →** pick the GitHub repo.
2. Build command: *(empty)*. Publish directory: `/` (repository root).
3. Netlify serves `404.html` automatically.
4. Add the custom domain and enable HTTPS.

## Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git**, then pick the repo.
2. Framework preset: *None*. Build command: *(empty)*. Output directory: `/`.
3. `404.html` at the root is used automatically.
4. Add the custom domain.

## GitHub Pages

1. Repository **Settings → Pages → Build and deployment → Deploy from a branch**.
2. Choose the branch (for example `main`) and folder `/ (root)`.
3. `404.html` at the root is used automatically.
4. For a custom domain, add it under Pages settings (this creates a `CNAME` file) and point DNS to GitHub Pages.

## After deployment

- Load every page in a desktop and a mobile browser. Check that the Tailwind styles applied, since the CDN was not testable in the build environment (see `QA_REPORT.md`).
- Tap the phone and email links on a phone.
- Submit the sitemap in Google Search Console.
