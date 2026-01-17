@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Stoppar processer och bygger
echo ========================================
echo.

REM Sätt JAVA_HOME
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"

echo 1. Stoppar alla Gradle daemons...
cd android
call gradlew --stop
timeout /t 3 /nobreak >nul
echo ✓ Gradle daemons stoppade!

echo.
echo 2. Rensar build-mappar...
if exist build rd /s /q build 2>nul
if exist app\build rd /s /q app\build 2>nul
timeout /t 2 /nobreak >nul
echo ✓ Build-mappar rensade!

echo.
echo 3. Bygger appen...
call gradlew assembleDebug

if errorlevel 1 (
    echo.
    echo ========================================
    echo   FEL: Bygget misslyckades!
    echo ========================================
    echo.
    cd ..
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✓ BYGGET LYCKADES!
echo ========================================
echo.
cd ..

echo.
echo Vill du starta appen nu? (Tryck valfri tangent)
pause >nul

echo.
echo Startar Metro Bundler...
start "Metro Bundler" cmd /k "npm start"
timeout /t 3 /nobreak >nul

echo.
echo Installerar på emulatorn...
call npx react-native run-android

pause



