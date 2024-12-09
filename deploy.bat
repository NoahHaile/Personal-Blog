@echo off

REM Remove existing folder on the remote server (if it exists)
plink -pw Cool4life root@94.130.58.212 "rm -rf /var/www/noahhaile.com"

REM Create the noahhaile.com directory on the remote server
plink -pw Cool4life root@94.130.58.212 "mkdir -p /var/www/noahhaile.com"

REM Transfer the folder from local to the remote server
pscp -r -pw Cool4life "C:\Projects\personal\personal\public\*" root@94.130.58.212:/var/www/noahhaile.com/

echo Transfer completed!
pause
