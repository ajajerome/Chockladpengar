@echo off
echo ========================================
echo   CHOKLADPENGAR - Starta Test
echo ========================================
echo.

REM Set paths
set ANDROID_SDK=C:\Users\jerom\AppData\Local\Android\Sdk
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%ANDROID_SDK%\platform-tools;%ANDROID_SDK%\emulator;%JAVA_HOME%\bin;%PATH%

echo 1. Stänger eventuella gamla processer...
adb kill-server
timeout /t 2 /nobreak >nul
adb start-server
timeout /t 3 /nobreak >nul

echo.
echo 2. Kollar emulator...
adb devices
echo.
echo Om emulatorn är "offline", öppna Android Studio och starta emulatorn manuellt.
echo Tryck sedan på valfri tangent för att fortsätta...
pause

echo.
echo 3. Startar Metro Bundler...
start "Metro Bundler" cmd /k "npx react-native start --reset-cache"
timeout /t 8 /nobreak >nul

echo.
echo 4. Installerar och startar appen...
echo (Detta tar 1-2 minuter första gången)
echo.
npx react-native run-android

echo.
echo ========================================
echo   KLART!
echo ========================================
pause

