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
*   **Node Version:** `20` (Compatível com Next.js 16 e React 19).
*   **Instalação de Pacotes:**
    *   ⚠️ **USAR `npm install --legacy-peer-deps`**.
    *   **Motivo:** Com a migração para o **Next.js 16 / React 19**, algumas dependências (como `recharts` ou `lucide-react`) podem apresentar avisos de conflito de `peerDependencies`. O uso da flag `--legacy-peer-deps` é obrigatório para garantir que o pipeline não quebre por avisos de versão durante a fase de transição do ecossistema.
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
