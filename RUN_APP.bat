@echo off
echo ========================================
echo   CHOKLADPENGAR - Starta App
echo ========================================
echo.

REM Set Android SDK path
set ANDROID_SDK=C:\Users\jerom\AppData\Local\Android\Sdk
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%ANDROID_SDK%\platform-tools;%ANDROID_SDK%\emulator;%JAVA_HOME%\bin;%PATH%

echo 1. Kollar emulator status...
adb devices
echo.

echo 2. Startar Metro Bundler...
start "Metro Bundler" cmd /k "npx react-native start --reset-cache"
timeout /t 5 /nobreak >nul

echo 3. Installerar och startar appen (tar 1-2 minuter)...
echo.
call npx react-native run-android

echo.
echo ========================================
echo   KLART!
echo ========================================
pause

