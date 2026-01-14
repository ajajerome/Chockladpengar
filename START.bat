@echo off
echo.
echo ========================================
echo   🍫 CHOKLADPENGAR - STARTA APPEN
echo ========================================
echo.
echo Startar Metro Bundler...
echo.
start cmd /k "npm start"
echo.
echo Vänta 10 sekunder för Metro att starta...
timeout /t 10 /nobreak
echo.
echo Nu startar vi appen på Android...
echo.
npm run android
echo.
echo ========================================
echo   Appen körs nu på din emulator! 🎉
echo ========================================
pause

