# Guia de Teste Manual (End-to-End) - ALGOR BRASIL v5.0

Este documento guia o processo de validação manual das funcionalidades críticas do sistema, focado na experiência do usuário, segurança e integridade dos dados.

---

## 🚦 Pré-Requisitos
1. **Backend Rodando**: Certifique-se de que o backend está ativo (`uvicorn backend.app.main:app --reload`).
2. **Frontend Rodando**: Certifique-se de que o frontend está ativo (`npm run dev`).
3. **Ambiente Limpo**: Recomenda-se usar uma aba anônima ou limpar o `localStorage` antes de começar.

---

## 🕵️ Jornada 1: O Visitante (Frontend Institucional)
**Objetivo**: Validar a primeira impressão, navegação e performance visual.

### Passos:
1.  [ ] **Acessar a Home** (`http://localhost:3000`).
2.  [ ] **Hero Dual**:
    *   Passe o mouse sobre o lado "Para Empresas". Verifique se o brilho azul e a expansão ocorrem.
    *   Passe o mouse sobre o lado "Para Profissionais". Verifique se o brilho verde e a expansão ocorrem.
3.  [ ] **Navegação**:
    *   Role a página até o rodapé. Verifique se as animações de entrada (fade-in) estão suaves.
    *   Clique nos links do Menu Superior. Eles devem ancorar ou levar às seções corretas.
4.  [ ] **Responsividade**:
    *   Aperte `F12` -> Ícone de Celular (Mobile View).
    *   Verifique se o texto do Hero não está quebrado.
    *   Verifique se os cards do "Hero Dual" estão empilhados (um em cima do outro) e legíveis.
5.  [ ] **Rodapé**:
    *   Verifique a legibilidade dos links de Governança (Portal do Titular, Política). O contraste deve estar bom.
    *   Passe o mouse no selo "ISO 42001" (deve ficar colorido).

---

## 🏢 Jornada 2: O Cliente Corporativo (Fluxo B2B)
**Objetivo**: Validar o cadastro, consentimento LGPD e onboarding de uma empresa.

### Passos:
1.  [ ] **Início**: Na Home, clique em "Diagnóstico Gratuito" (Botão Azul do Hero).
2.  [ ] **Cadastro (Signup)**:
    *   Preencha o formulário com dados de teste (ex: `empresa@teste.com`).
    *   **Teste de Erro**: Tente clicar em "Gerar Credencial" *SEM* marcar o checkbox de consentimento. (Não deve deixar).
    *   Marque o consentimento e envie.
    *   Deve aparecer uma mensagem de "Sucesso" e redirecionar para o Login.
3.  [ ] **Login**:
    *   Faça login com o e-mail/senha criados.
    *   **Verificação**: O sistema deve detectar que você é novo e te mandar para a página de **Onboarding** (`/onboarding`).
4.  [ ] **Onboarding**:
    *   Selecione o card **"Para Empresas"** (Azul).
    *   Preencha o formulário (Nome da Empresa, Setor, etc).
    *   Passe o mouse nos ícones de `(i)` (Tooltips) para ver as explicações jurídicas.
    *   **Teste de Erro**: Tente enviar sem marcar o consentimento B2B.
    *   Envie o formulário.
5.  [ ] **Sucesso**:
    *   Deve aparecer a tela "Onboarding Concluído".
    *   Clique em "Acessar Dashboard".
6.  [ ] **Dashboard**:
    *   Você deve ver o "Centro de Comando".
    *   Verifique se aparecem os cards de estatísticas.

---

## 👨‍💻 Jornada 3: O Auditor (Fluxo Profissional & Segurança)
**Objetivo**: Validar o fluxo de membros e a segurança da sessão.

### Passos:
1.  [ ] **Limpeza**: Faça Logout ou abra uma nova Aba Anônima.
2.  [ ] **Cadastro**:
    *   Na Home, clique em "Aplicar para Associação" (Botão Verde).
    *   Crie um novo usuário (ex: `auditor@teste.com`).
3.  [ ] **Login & Redirecionamento**:
    *   Faça login. Deve cair no **Onboarding** novamente.
4.  [ ] **Onboarding Profissional**:
    *   Selecione **"Para Profissionais"** (Verde).
    *   Preencha com dados de teste (LinkedIn, Expertise).
    *   Envie.
5.  [ ] **Verificação de Token (Segurança)**:
    *   No Dashboard, aperte `F12` -> Aba `Application` -> `Local Storage`.
    *   Verifique se existe uma chave `algor_token`.
    *   Copie esse token.
6.  [ ] **Teste de Persistência**:
    *   Dê F5 na página. Você deve continuar logado no Dashboard (não pode voltar pro login).

---

## 🐛 Como Reportar Erros
Se encontrar algo estranho, me diga no chat usando o formato:
> **Jornada X - Passo Y**: [Descrição do que aconteceu] vs [O que deveria acontecer]
> *Exemplo: Jornada 2 - Passo 4: Ao clicar em enviar, a tela ficou branca e nada aconteceu.*
