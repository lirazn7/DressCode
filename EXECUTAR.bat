@echo off
echo 🚀 DressCode MVP - Execucao Automatica (SEM AWS)
echo ===============================================
echo.

echo Verificando pre-requisitos...

:: Verificar Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python nao encontrado!
    echo 📥 Baixe em: https://python.org/downloads/
    pause
    exit /b 1
) else (
    echo ✅ Python encontrado
)

:: Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js nao encontrado!
    echo 📥 Baixe em: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js encontrado
)

echo.
echo 🛠️ Instalando dependencias (versao local)...

:: Instalar dependencias do backend
echo 📦 Backend - Instalando dependencias Python...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependencias Python
    pause
    exit /b 1
)

:: Instalar dependencias do frontend
cd ..\frontend
echo 📦 Frontend - Instalando dependencias Node.js...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependencias Node.js
    pause
    exit /b 1
)

cd ..

:: Criar pastas locais
echo 📁 Criando estrutura local...
if not exist "local_db" mkdir local_db
if not exist "local_storage" mkdir local_storage
if not exist "local_storage\uploads" mkdir local_storage\uploads
if not exist "local_storage\thumbnails" mkdir local_storage\thumbnails

echo.
echo 🚀 Iniciando servidores...
echo.
echo ⚡ Backend: http://localhost:8000
echo ⚡ Frontend: http://localhost:3000
echo ⚡ API Docs: http://localhost:8000/docs
echo.
echo 💾 Banco de dados: Arquivos JSON locais
echo 📁 Storage: Pasta local_storage/
echo.

:: Iniciar backend em segundo plano
start "DressCode Backend" cmd /k "cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

:: Aguardar 3 segundos
timeout /t 3 /nobreak >nul

:: Iniciar frontend
start "DressCode Frontend" cmd /k "cd frontend && npm start"

echo ✅ Servidores iniciados!
echo.
echo 📱 Acesse: http://localhost:3000
echo 🔌 API: http://localhost:8000
echo 📚 Docs: http://localhost:8000/docs
echo.
echo Pressione qualquer tecla para finalizar...
pause >nul

:: Finalizar processos
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1

echo 👋 Sistema finalizado!