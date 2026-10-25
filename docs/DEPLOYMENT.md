# Deployment

The site is plain static files: no build step, database or server-side code.
Files the web server needs: `*.html`, `assets/`, `js/`, `robots.txt`, `sitemap.xml`, `.htaccess`.
`deploy-cpanel.sh` copies exactly these files, and nothing else, into the web root.

---

## cPanel server (`~/public_html` on srv31) — replacing the WordPress site

The current `public_html` holds a WordPress install. Its `index.php` would take priority over `index.html`, and its `.htaccess` sends every request to WordPress. **WordPress must be moved out of `public_html` (not deleted) before the static site can render.**

> ⚠️ **Security — do this today, even before deploying.** `public_html` currently contains
> `fnchhvk8_verycare_db.sql`, `wordpress.zip`, `force-send-email.php` and `test-logging.php`.
> Anything in `public_html` can be downloaded by anyone at `https://verycare.ca/<filename>`.
> A database dump can contain user accounts, password hashes and form submissions.
> Step 1 below moves all of these out of the web root.

Connect with SSH (or cPanel → **Terminal**) and run the steps in order.

### 1. Back up WordPress outside the web root

```bash
cd ~
BK=~/wordpress-backup-$(date +%Y%m%d-%H%M)
mkdir -p "$BK"
shopt -s dotglob                         # include hidden files such as .htaccess
for f in ~/public_html/*; do
  [ "$(basename "$f")" = "cgi-bin" ] && continue   # keep cgi-bin in place
  mv "$f" "$BK"/
done
shopt -u dotglob
ls -A ~/public_html                      # should now show only: cgi-bin
ls -A "$BK"                              # WordPress, .htaccess, the .sql dump, etc.
```

Nothing is deleted. To roll back, move the files from `$BK` back into `~/public_html`. The WordPress database in MySQL is untouched.

### 2. Get the website code

```bash
cd ~
git clone -b claude/bold-gates-sbblpo https://github.com/Dev-Bulama/verycare.git ~/verycare-site
```

If the repository is private, Git asks for a username and password. Use your GitHub username, and as the password a **GitHub personal access token** with read access to the repository (GitHub → Settings → Developer settings → Personal access tokens). Alternatively, use cPanel → **Git™ Version Control → Create → Clone a Repository**, with the same URL and `~/verycare-site` as the path.

The repository is cloned **outside** `public_html`, so the `.git` folder and the docs are never public.

### 3. Copy the site into public_html

```bash
cd ~/verycare-site
bash deploy-cpanel.sh            # copies into ~/public_html
ls -A ~/public_html
```

The script refuses to run while `index.php` or `wp-config.php` is still in `public_html`. It sets permissions to 644 for files and 755 for folders.

### 4. Check it

- Open `https://verycare.ca/` (or `http://` if SSL is not active yet). The VeryCare home page should load.
- Open `https://verycare.ca/about-us/`. It should redirect to `/about.html` (redirect rules for old WordPress URLs are in `.htaccess`).
- Open `https://verycare.ca/does-not-exist`. The VeryCare 404 page should appear.
- If the old WordPress page still shows, clear the cache: cPanel → **LiteSpeed Web Cache Manager → Flush All**, then hard-refresh the browser.
- Once SSL works (cPanel → **SSL/TLS Status → Run AutoSSL**), uncomment the two HTTPS lines in `~/public_html/.htaccess` to force HTTPS.

### 5. Updating the site later

```bash
cd ~/verycare-site
git pull origin claude/bold-gates-sbblpo
bash deploy-cpanel.sh
```

### If the domain does not load

Check that the domain registration is current, that the nameservers point to the host, and that the `A` records for `verycare.ca` and `www` point to the server's IP (cPanel → **Zone Editor**). Earlier versions of this guide said the domain did not resolve; that was a limitation of a tool used during the build, not a real DNS fault.

---

## Other static hosts

### Netlify
**Add new site → Import an existing project →** pick the repo. Leave the build command empty and set the publish directory to `/`. `404.html` is used automatically.

### Cloudflare Pages
**Workers & Pages → Create → Pages → Connect to Git.** Set the preset to *None*, leave the build command empty, and set the output directory to `/`.

### GitHub Pages
**Settings → Pages → Deploy from a branch**, then choose the branch and `/ (root)`. Add a custom domain if needed.

On these hosts `.htaccess` is ignored, and the `docs/` folder would be publicly readable. That is harmless, but you can remove it from the deployed copy.

---

## After any deployment

- Load every page on a desktop and a mobile browser. Check that the styling applied: the Tailwind CDN could not be loaded in the build environment, so it was substituted locally during testing (see `QA_REPORT.md`).
- Tap the phone and email links on a phone.
- Submit `https://verycare.ca/sitemap.xml` in Google Search Console.
