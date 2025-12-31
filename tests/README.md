# 🧪 ALGOR Brasil - Suite Automatizada de Testes E2E

## 📋 Visão Geral

Suite completa de testes automatizados usando **Playwright** para validar:
- ✅ Todas as páginas públicas
- ✅ Design System (Power BI Premium Dark Mode)
- ✅ Funcionalidades críticas
- ✅ Performance e acessibilidade
- ✅ Responsividade (Desktop, Tablet, Mobile)
- ✅ Integração com Backend

---

## 🚀 Instalação Rápida

### 1. Instalar Dependências

```bash
cd c:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin
npm install --save-dev @playwright/test @types/node typescript
```

### 2. Instalar Browsers do Playwright

```bash
npx playwright install
```

---

## ▶️ Executar Testes

### Modo Padrão (Headless)
```bash
npx playwright test
```

### Modo Visual (Com Interface)
```bash
npx playwright test --headed
```

### Modo UI Interativo (Recomendado)
```bash
npx playwright test --ui
```

### Executar em Browser Específico
```bash
# Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# Safari (WebKit)
npx playwright test --project=webkit
```

### Executar Testes Mobile
```bash
npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
```

### Modo Debug (Passo a Passo)
```bash
npx playwright test --debug
```

---

## 📊 Visualizar Relatórios

Após executar os testes, visualize o relatório HTML:

```bash
npx playwright show-report tests/reports/html
```

---

## 🎯 Testes Incluídos

### 1. Homepage
- [x] Carregamento e Design System
- [x] Validação de cores (Deep Navy, Neon Green)
- [x] Scroll e animações
- [x] Performance (< 5s)

### 2. Páginas Institucionais
- [x] Institute (Layout Quantum Prestige)
- [x] Governance Policy (LGPD Art. 20)
- [x] Academy (Lista de Espera)

### 3. Páginas de Soluções
- [x] Solutions Enterprise
- [x] Partners
- [x] Associates

### 4. Autenticação
- [x] Login (Formulário e Design)
- [x] Register (Cadastro)

### 5. Performance
- [x] Tempo de carregamento
- [x] Recursos carregados (sem 404)

### 6. Responsividade
- [x] Mobile (iPhone 12)
- [x] Tablet (iPad)
- [x] Desktop (1920x1080)

### 7. Acessibilidade
- [x] Navegação por teclado
- [x] Contraste de cores

### 8. Integração Backend
- [x] API Health Check
- [x] CORS Headers

### 9. Validação de Links
- [x] Links internos não quebrados

### 10. Console
- [x] Sem erros JavaScript críticos

---

## 📸 Screenshots

Todos os testes geram screenshots em:
```
tests/screenshots/
├── homepage.png
├── homepage-mobile.png
├── homepage-tablet.png
├── institute.png
├── governance-policy.png
├── academy.png
├── solutions-enterprise.png
├── partners.png
├── associates.png
├── login.png
└── register.png
```

---

## 🛠️ Configuração

### Editar Configuração
Arquivo: `playwright.config.ts`

```typescript
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

---

## 📝 Adicionar Novos Testes

Edite o arquivo: `tests/e2e/algor-complete-test.spec.ts`

```typescript
test('Meu Novo Teste', async ({ page }) => {
  await page.goto('http://localhost:3000/nova-pagina');
  
  // Suas validações aqui
  await expect(page.locator('h1')).toBeVisible();
  
  // Screenshot
  await page.screenshot({ path: 'tests/screenshots/nova-pagina.png' });
});
```

---

## 🐛 Troubleshooting

### Erro: "Playwright not found"
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Erro: "Browser not installed"
```bash
npx playwright install chromium
```

### Testes falhando
1. Certifique-se que backend e frontend estão rodando:
   - Backend: http://localhost:8000
   - Frontend: http://localhost:3000

2. Execute em modo debug:
   ```bash
   npx playwright test --debug
   ```

---

## 📊 CI/CD Integration

Para integrar com GitHub Actions:

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: tests/reports/html/
```

---

## 📚 Documentação

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)

---

## ✅ Checklist de Validação

Após executar os testes, verifique:

- [ ] Todos os testes passaram (verde)
- [ ] Screenshots gerados corretamente
- [ ] Relatório HTML disponível
- [ ] Sem erros críticos no console
- [ ] Performance dentro do esperado (< 5s)

---

**Versão:** 1.0.0  
**Data:** 31/12/2025  
**Autor:** ALGOR Brasil Team
