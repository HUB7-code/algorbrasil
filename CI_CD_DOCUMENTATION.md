# 🚀 Documentação do Pipeline CI/CD

**Status:** ✅ Estável (Verde)
**Data da Última Atualização Crítica:** 25 Jan 2026

---

## 🏗️ Visão Geral

O projeto utiliza **GitHub Actions** para Integração Contínua e Entrega Contínua (CI/CD). O pipeline é dividido em jobs de **Backend** e **Frontend**, rodando em paralelo para otimizar tempo.

Documento de Referência: `.github/workflows/main.yml`

---

## 🔧 Configurações Críticas (Não Alterar sem Validação)

### 1. Backend (Python)
*   **SO:** `ubuntu-latest`
*   **Python Version:** `3.10`
*   **Dependências de Sistema:** É **obrigatório** instalar `libmagic1` antes das dependências Python, pois a lib `python-magic` depende dela para detecção de tipos de arquivo (MIME types).
    ```yaml
    - name: Install System Dependencies
      run: |
        sudo apt-get update
        sudo apt-get install -y libmagic1 libmagic-dev
    ```
*   **Testes:** Roda `pytest -v`.

### 2. Frontend (Node.js / Next.js)
*   **SO:** `ubuntu-latest`
*   **Node Version:** `20` (Necessário para compatibilidade com `pdfjs-dist` e Next.js 14+).
*   **Instalação de Pacotes:**
    *   ⚠️ **NÃO USAR `npm ci`**.
    *   ✅ **USAR `npm install`**.
    *   **Motivo:** Existe uma discrepância na resolução de dependências opcionais (como `linux-x64` vs `win32-x64`) entre o ambiente de desenvolvimento (Windows) e o CI (Linux). O `npm ci` falha se o lockfile não for *bit-perfect* para a plataforma atual. O `npm install` é mais resiliente e resolve isso dinamicamente.
*   **Build:** Executa `npm run build` (Next.js build).

### 3. GitHub Pages (Documentação)
*   **Arquivo `.nojekyll`:** Foi criado um arquivo vazio `.nojekyll` na raiz do projeto.
*   **Motivo:** O Jekyll (gerador padrão do GitHub Pages) tenta processar arquivos Markdown. Como nossos arquivos `.md` contêm sintaxe de código React/JSX (ex: `{{ valor }}` com chaves duplas), o Jekyll quebrava com erro de sintaxe Liquid. O `.nojekyll` desativa esse processamento e serve os arquivos como estáticos brutos.

---

## 🛠️ Resolução de Problemas Comuns

### Erro: `ModuleNotFoundError: No module named 'magic'`
*   **Causa:** Falta da biblioteca C `libmagic` no ambiente Linux.
*   **Solução:** Verificar se o passo `Install System Dependencies` está presente no workflow.

### Erro: `npm ci can only install packages when your package.json and package-lock.json are in sync`
*   **Causa:** Diferença entre ambiente Windows/Linux no lockfile.
*   **Solução:** Não use `npm ci`. Mude o comando do workflow para `npm install`.

### Erro: `Liquid syntax error` (GitHub Pages)
*   **Causa:** Jekyll tentando interpretar código React.
*   **Solução:** Garantir que o arquivo `.nojekyll` existe na raiz do branch `main`.

---

## 🔄 Fluxo de Deploy

1.  **Push na `main`:** Dispara o pipeline.
2.  **Testes e Build:** Rodam automaticamente.
3.  **Produção:** Se passar, atualização automática via Docker (na VPS) ou Vercel (se configurado).
