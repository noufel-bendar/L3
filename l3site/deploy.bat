@echo off
echo 🚀 Starting deployment process for USTHB Informatique L3 LMD...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI is not installed. Installing now...
    npm install -g vercel
)

REM Check if user is logged in to Vercel
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo 🔐 Please log in to Vercel...
    vercel login
)

REM Build the project
echo 📦 Building the project...
npm run build

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

echo ✅ Deployment completed!
echo 🌐 Your site should be live at the URL provided above.
pause
