# 🚀 GUIA RÁPIDO - Testes Automatizados ALGOR

## ⚡ Início Rápido (3 passos)

### 1️⃣ Instalar Playwright
```cmd
cd c:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin
npm install --save-dev @playwright/test
npx playwright install
```

### 2️⃣ Executar Testes
```cmd
npx playwright test --ui
```

### 3️⃣ Ver Resultados
O navegador abrirá automaticamente com a interface interativa!

---

## 🎯 Ou use o Script Batch (Mais Fácil!)

### Windows CMD
```cmd
cd c:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin
run-tests.bat
```

**Menu Interativo:**
```
1. Instalar Playwright (primeira vez)
2. Executar TODOS os testes
3. Executar com interface
4. Modo UI interativo ⭐ RECOMENDADO
5. Apenas Chromium
6. Apenas Firefox
7. Testes Mobile
8. Modo Debug
9. Ver relatório HTML
```

---

## 📊 O que será testado?

✅ **10 Categorias de Testes:**
1. Homepage (design, animações, performance)
2. Páginas Institucionais (Institute, Policy, Academy)
3. Soluções (Enterprise, Partners, Associates)
4. Autenticação (Login, Register)
5. Performance (< 5s de carregamento)
6. Responsividade (Mobile, Tablet, Desktop)
7. Acessibilidade (teclado, contraste)
8. Backend (API, CORS)
9. Links (validação de rotas)
10. Console (sem erros JS)

---

## 🎨 Validações do Design System

- ✅ Cores (Deep Navy #0A0E1A, Neon Green #00FF94)
- ✅ Glassmorphism (backdrop-blur)
- ✅ Tipografia (Orbitron)
- ✅ Animações Framer Motion
- ✅ Hover effects (neon glow)

---

## 📸 Screenshots Automáticos

Todos os testes geram screenshots em:
```
tests/screenshots/
├── homepage.png
├── homepage-mobile.png
├── homepage-tablet.png
├── institute.png
├── governance-policy.png
├── academy.png
└── ... (11 screenshots no total)
```

---

## ⏱️ Tempo Estimado

- **Instalação**: ~2 minutos
- **Execução completa**: ~3-5 minutos
- **Modo UI**: Interativo (você controla)

---

## 🆘 Problemas?

### Backend/Frontend não está rodando?
```cmd
# Terminal 1 - Backend
python -m uvicorn backend.app.main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Playwright não instalado?
```cmd
npm install --save-dev @playwright/test
npx playwright install
```

---

## 🎯 Próximos Passos

Após executar os testes:

1. ✅ Verifique que todos passaram (verde)
2. 📸 Revise os screenshots gerados
3. 📊 Analise o relatório HTML
4. 🐛 Corrija erros encontrados (se houver)

---

**Pronto para começar?** Execute: `run-tests.bat` 🚀
