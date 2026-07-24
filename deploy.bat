@echo off
cd /d C:\LGDS

echo ------------------------------------
echo Deploying LGDS to GitHub + Netlify...
echo ------------------------------------

git add .
git commit -m "update"
git push

echo ------------------------------------
echo DONE! If you see no errors, it's live.
echo ------------------------------------
pause
