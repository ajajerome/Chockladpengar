@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Rensar cache och startar om
echo ========================================
echo.

echo 1. Rensar Metro cache...
call npx react-native start --reset-cache

pause


