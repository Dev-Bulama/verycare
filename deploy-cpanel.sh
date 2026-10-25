#!/usr/bin/env bash
# Copies the public website files from this checkout into public_html.
#
#   ./deploy-cpanel.sh                 # deploys to ~/public_html
#   ./deploy-cpanel.sh /path/to/root   # deploys elsewhere
#
# Only site files are copied (pages, assets, js, robots.txt, sitemap.xml,
# .htaccess). Docs, the README and the .git folder never reach the web root.
# Other files already in the target folder are left untouched.
set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
DEST="${1:-$HOME/public_html}"

if [ ! -d "$DEST" ]; then
  echo "Target folder not found: $DEST" >&2
  exit 1
fi

if [ -e "$DEST/index.php" ] || [ -e "$DEST/wp-config.php" ]; then
  echo "WordPress files are still in $DEST." >&2
  echo "Move them out first (see docs/DEPLOYMENT.md, step 1), then run this again." >&2
  exit 1
fi

cd "$SRC"
cp -f ./*.html robots.txt sitemap.xml .htaccess "$DEST"/

for dir in assets js; do
  rm -rf "${DEST:?}/$dir"
  cp -R "$dir" "$DEST/$dir"
done
# Full-resolution logo masters are kept in the repository, not on the web.
rm -rf "$DEST/assets/images/source"

find "$DEST" -maxdepth 1 -type f \( -name '*.html' -o -name '*.txt' -o -name '*.xml' -o -name '.htaccess' \) -exec chmod 644 {} +
find "$DEST/assets" "$DEST/js" -type d -exec chmod 755 {} +
find "$DEST/assets" "$DEST/js" -type f -exec chmod 644 {} +

echo "Deployed $(git -C "$SRC" rev-parse --short HEAD 2>/dev/null || echo 'files') to $DEST"
