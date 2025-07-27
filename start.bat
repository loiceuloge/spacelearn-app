@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Starting Revision App - Spaced Repetition Learning
echo ==================================================

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

:: Function to check dependencies
echo 📦 Checking dependencies...

:: Check server dependencies
if not exist "server\node_modules" (
    echo ⚠️ Dependencies not found for Backend. Installing...
    cd server
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies for Backend
        pause
        exit /b 1
    )
    cd ..
    echo ✅ Dependencies installed for Backend
) else (
    echo ✅ Dependencies already installed for Backend
)

:: Check client dependencies
if not exist "client\node_modules" (
    echo ⚠️ Dependencies not found for Frontend. Installing...
    cd client
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies for Frontend
        pause
        exit /b 1
    )
    cd ..
    echo ✅ Dependencies installed for Frontend
) else (
    echo ✅ Dependencies already installed for Frontend
)

:: Check if .env file exists
if not exist ".env" (
    echo ❌ .env file not found. Creating template...
    echo MONGODB_URI=mongodb+srv://loiceuloge:^<db_password^>@myprojects.1aliwui.mongodb.net/revision-app?retryWrites=true^&w=majority^&appName=MyProjects > .env
    echo PORT=5000 >> .env
    echo ⚠️ Please update the .env file with your MongoDB password
    pause
    exit /b 1
)

:: Check if MongoDB password is set
findstr /C:"<db_password>" .env >nul
if %errorlevel% equ 0 (
    echo ❌ Please replace ^<db_password^> in .env file with your actual MongoDB password
    pause
    exit /b 1
)

echo.
echo 🔧 Starting services...

:: Start backend server
echo 🔙 Starting backend server on port 5000...
cd server
start "Backend Server" cmd /k "npm run dev"
cd ..

:: Wait for backend to start
timeout /t 3 /nobreak >nul

:: Start frontend server
echo 🎨 Starting frontend server on port 5173...
cd client
start "Frontend Server" cmd /k "npm run dev"
cd ..

:: Wait for frontend to start
timeout /t 3 /nobreak >nul

echo.
echo ==================================================
echo 🎉 Application is now running!
echo.
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:5000
echo 🏥 Health Check: http://localhost:5000/api/health
echo.
echo 💡 Tips:
echo    • Add learning items in the 'Items du Jour' tab
echo    • Review items in the 'Révisions du Jour' tab
echo    • Check your progress in the 'Statistiques' tab
echo.
echo ⚠️ Close the terminal windows to stop the servers
echo ==================================================
echo.

:: Open browser to the application
start http://localhost:5173

pause