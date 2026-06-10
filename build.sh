#!/bin/bash
set -e

# Pull the latest changes, then sync the static site (repo root) to the web root.
echo "Pulling latest changes from Git repository..."
git checkout -- .
git pull
chmod +x build.sh

echo "Syncing site to web root (excluding repo infra)..."
mkdir -p /var/www/noahhaile.com
rsync -a --delete \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='build.sh' \
  --exclude='deploy.bat' \
  --exclude='scripts' \
  ./ /var/www/noahhaile.com/
echo "Done."
