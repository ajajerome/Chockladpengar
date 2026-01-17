@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Rensar och Bygger Chokladpengar
echo ========================================
echo.

REM Sätt JAVA_HOME
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
echo ✓ JAVA_HOME satt till: %JAVA_HOME%

echo.
echo 1. Rensar lokal Gradle cache i projektet...
cd android
if exist .gradle (
    echo Tar bort .gradle-mappen...
    rd /s /q .gradle 2>nul
    timeout /t 2 /nobreak >nul
)
if exist build (
    echo Tar bort build-mappen...
    rd /s /q build 2>nul
)
if exist app\build (
    echo Tar bort app\build-mappen...
    rd /s /q app\build 2>nul
)
echo ✓ Lokal cache rensad!

echo.
echo 2. Rensar global Gradle 8.0 cache...
if exist "%USERPROFILE%\.gradle\caches\8.0" (
    echo Tar bort korrupt Gradle 8.0 cache...
    rd /s /q "%USERPROFILE%\.gradle\caches\8.0" 2>nul
    timeout /t 2 /nobreak >nul
    echo ✓ Global cache rensad!
) else (
    echo ✓ Ingen 8.0 cache att rensa
)

echo.
echo 3. Bygger appen med Gradle 8.5...
echo Detta tar 3-5 minuter första gången...
echo.
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
echo Tryck valfri tangent för att starta appen...
pause >nul

echo.
echo Startar Metro Bundler...
start "Metro Bundler" cmd /k "npm start"

timeout /t 3 /nobreak >nul

echo.
echo Installerar på emulatorn...
call npx react-native run-android

pause



