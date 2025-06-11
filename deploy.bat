@echo off
echo Building Mubwiza Garden for deployment...
echo.

cd frontend_garden

echo Installing dependencies...
call npm install

echo.
echo Building production version...
call npm run build

echo.
echo Build complete! 
echo.
echo Your website is ready in the 'frontend_garden/build' folder.
echo.
echo Next steps:
echo 1. Go to https://netlify.com
echo 2. Drag and drop the 'build' folder to deploy
echo 3. Your site will be live with a free .netlify.app domain
echo.
echo Suggested domain names:
echo - mubwiza-garden.netlify.app
echo - mubwizagarden.netlify.app
echo - fresh-mubwiza.netlify.app
echo.
pause
