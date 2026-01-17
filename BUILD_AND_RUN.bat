@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Chokladpengar - Bygg och Kör
echo ========================================
echo.

REM Hitta Java i Android Studio
set "JAVA_SEARCH_PATH=C:\Program Files\Android\Android Studio\jbr\bin\java.exe"
if exist "%JAVA_SEARCH_PATH%" (
    for %%i in ("%JAVA_SEARCH_PATH%") do set "JAVA_HOME=%%~dpi.."
    echo ✓ Java hittad i Android Studio
) else (
    echo ✗ Varning: Kunde inte hitta Java i Android Studio
)

echo.
echo 1. Rensar Gradle cache...
cd android
if exist .gradle rmdir /s /q .gradle
if exist build rmdir /s /q build
if exist app\build rmdir /s /q app\build
echo ✓ Cache rensad!

echo.
echo 2. Bygger appen (tar 3-5 minuter första gången)...
call gradlew clean
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
echo   ✓ Bygget lyckades!
echo ========================================
echo.

cd ..

echo.
echo 3. Startar Metro Bundler...
start "Metro Bundler" cmd /k "npm start"

echo.
echo Väntar 5 sekunder så Metro startar...
timeout /t 5 /nobreak >nul

echo.
echo 4. Installerar och startar appen på emulatorn...
call npx react-native run-android

echo.
echo ========================================
echo   ✓ Appen körs!
echo ========================================
echo.
pause
