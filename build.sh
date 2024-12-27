#!/bin/bash

# Step 1: Pull the latest changes from the Git repository
echo "Pulling latest changes from Git repository..."
git checkout -- .
git pull
chmod +x build.sh

# Step 2: Remove the previous contents of the target directory on the server
echo "Removing previous site content..."
rm -rf /var/www/noahhaile.com
mkdir -p /var/www/noahhaile.com
echo "Moving the Hugo site..."
cp -r ./public/* /var/www/noahhaile.com