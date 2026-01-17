@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   FULLSTÄNDIG RENSNING
echo ========================================
echo.

set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"

echo 1. Stoppar alla Gradle processer...
cd android
call gradlew --stop 2>nul
timeout /t 2 /nobreak >nul

echo.
echo 2. Rensar lokal Gradle cache...
cd ..
if exist android\.gradle rd /s /q android\.gradle 2>nul
if exist android\build rd /s /q android\build 2>nul
if exist android\app\build rd /s /q android\app\build 2>nul

echo.
echo 3. Rensar GLOBAL Gradle cache...
if exist "%USERPROFILE%\.gradle\caches" rd /s /q "%USERPROFILE%\.gradle\caches" 2>nul

echo.
echo 4. Väntar 3 sekunder...
timeout /t 3 /nobreak >nul

echo.
echo 5. Bygger appen (kan ta 5-10 minuter första gången)...
cd android
call gradlew assembleDebug --no-daemon

if errorlevel 1 (
    echo.
    echo ========================================
    echo   FEL: Bygget misslyckades!
    echo ========================================
    cd ..
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✓ BYGGET LYCKADES!
echo ========================================
cd ..

echo.
echo Startar Metro Bundler...
start "Metro Bundler" cmd /k "npm start"
timeout /t 5 /nobreak >nul

echo.
echo Installerar på emulatorn...
call npx react-native run-android

pause


