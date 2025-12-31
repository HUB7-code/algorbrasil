@echo off
REM ========================================
REM ALGOR Brasil - Script de Testes E2E
REM Versão: 1.0.0
REM Data: 31/12/2025
REM ========================================

echo.
echo ========================================
echo   ALGOR Brasil - Testes Automatizados
echo ========================================
echo.

REM Verificar se está no diretório correto
if not exist "playwright.config.ts" (
    echo [ERRO] Execute este script na raiz do projeto!
    pause
    exit /b 1
)

REM Menu de opções
echo Escolha uma opcao:
echo.
echo 1. Instalar Playwright (primeira vez)
echo 2. Executar TODOS os testes (headless)
echo 3. Executar testes com interface (headed)
echo 4. Executar testes em modo UI interativo
echo 5. Executar apenas Chromium
echo 6. Executar apenas Firefox
echo 7. Executar testes Mobile
echo 8. Modo Debug (passo a passo)
echo 9. Ver relatorio HTML
echo 0. Sair
echo.

set /p choice="Digite o numero da opcao: "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto test_all
if "%choice%"=="3" goto test_headed
if "%choice%"=="4" goto test_ui
if "%choice%"=="5" goto test_chromium
if "%choice%"=="6" goto test_firefox
if "%choice%"=="7" goto test_mobile
if "%choice%"=="8" goto test_debug
if "%choice%"=="9" goto show_report
if "%choice%"=="0" goto end

echo Opcao invalida!
pause
exit /b 1

:install
echo.
echo [INFO] Instalando Playwright...
call npm install --save-dev @playwright/test @types/node typescript
echo.
echo [INFO] Instalando browsers...
call npx playwright install
echo.
echo [SUCESSO] Instalacao concluida!
pause
goto end

:test_all
echo.
echo [INFO] Executando TODOS os testes (headless)...
call npx playwright test
echo.
echo [INFO] Testes concluidos! Veja o relatorio com a opcao 9.
pause
goto end

:test_headed
echo.
echo [INFO] Executando testes com interface...
call npx playwright test --headed
echo.
echo [INFO] Testes concluidos!
pause
goto end

:test_ui
echo.
echo [INFO] Abrindo modo UI interativo...
call npx playwright test --ui
goto end

:test_chromium
echo.
echo [INFO] Executando testes no Chromium...
call npx playwright test --project=chromium
echo.
echo [INFO] Testes concluidos!
pause
goto end

:test_firefox
echo.
echo [INFO] Executando testes no Firefox...
call npx playwright test --project=firefox
echo.
echo [INFO] Testes concluidos!
pause
goto end

:test_mobile
echo.
echo [INFO] Executando testes Mobile...
call npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
echo.
echo [INFO] Testes concluidos!
pause
goto end

:test_debug
echo.
echo [INFO] Modo Debug - Execute passo a passo...
call npx playwright test --debug
goto end

:show_report
echo.
echo [INFO] Abrindo relatorio HTML...
call npx playwright show-report tests/reports/html
goto end

:end
echo.
echo Pressione qualquer tecla para sair...
pause >nul
