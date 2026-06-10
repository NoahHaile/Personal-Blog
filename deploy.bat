@echo off
setlocal
REM --- Deploy the static site (repo root) to the VPS ---
set SERVER=root@94.130.58.212
set PW=Cool4life
set SRC=C:\Projects\personal\Personal-Blog
set DEST=/var/www/noahhaile.com

echo Uploading to a staging directory...
plink -batch -pw %PW% %SERVER% "rm -rf %DEST%.new && mkdir -p %DEST%.new"
pscp -r -pw %PW% "%SRC%\*" %SERVER%:%DEST%.new/

echo Removing repo infra from staging (keep only web files)...
plink -batch -pw %PW% %SERVER% "cd %DEST%.new && rm -rf .git .gitignore build.sh deploy.bat scripts"

echo Swapping staging into place (keeps the previous build as .bak)...
plink -batch -pw %PW% %SERVER% "rm -rf %DEST%.bak; if [ -d %DEST% ]; then mv %DEST% %DEST%.bak; fi; mv %DEST%.new %DEST%"

echo.
echo Done. The origin now serves the new site.
echo IMPORTANT: purge the Cloudflare cache (Cloudflare dashboard, Caching, Purge Everything).
pause
