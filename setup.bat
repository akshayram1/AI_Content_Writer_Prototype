@echo off
echo Setting up SEO Content Writer project...

echo.
echo Installing frontend dependencies...
cd seo-content-writer
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd ..\backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing Python dependencies...
cd ..\llm-service
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing Python dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ Setup complete!
echo.
echo Your OpenAI API key has been configured in the .env files.
echo.
echo To start the development servers, run:
echo   npm run dev
echo.
echo Or start services individually:
echo   1. cd llm-service && python app.py
echo   2. cd backend && npm run dev  
echo   3. cd seo-content-writer && npm start
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause
