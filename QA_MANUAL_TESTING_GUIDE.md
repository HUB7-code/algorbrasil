# MANUAL DE TESTES INTEGRADO (E2E) - ALGOR BRASIL v7.7
> **Objetivo:** Roteiro atualizado para validação da "Operação Fortaleza Digital", incluindo os novos módulos de Riscos ISO 42001, Visualizador Seguro e Trilha de Auditoria.

## 🟢 ETAPA 1: FLUXO PÚBLICO (Visitante)
O objetivo desta etapa é garantir que a "vitrine" do site esteja perfeita, responsiva e com todos os links funcionando.

### 1.1. Home Page (Landing)
- [ ] **Carregamento & Performance:**
    - Acessar a Home (`/`). O site carrega instantaneamente (< 2s)?
    - A Logo no topo esquerdo está com tamanho adequado (`w-12`) e legível?
    - A animação de fundo (neurônios/ondas) está fluida?
- [ ] **Navegação (Header):**
    - Clicar em "A Associação" -> Rola suavemente para a seção de benefícios?
    - Clicar em "Intelligence Hub" -> Rola suavemente para a grid de Personas?
    - Clicar em "Metodologia" -> Rola suavemente para a seção do sistema operacional?
    - Botão "Login Membros" -> Redireciona para `/login`?
- [ ] **Grid de Personas:** 
    - Clicar em um card ("C-Level" ou "Auditor"). Leva para o onboarding correto?

---

## 🟡 ETAPA 2: AUTENTICAÇÃO & ONBOARDING

### 2.1. Login (`/login`)
- [ ] **Login Válido:** Entrar com credenciais (ex: `admin@algor.com`).
- [ ] **Feedback Visual:** O botão mostra estado de "Carregando" durante a chamada à API?
- [ ] **Redirecionamento:** Após login, o usuário é levado para o `/dashboard` com um efeito de fade-in?

---

## 🔵 ETAPA 3: DASHBOARD & FUNCIONALIDADES (Membro Logado)
**Foco Crítico:** Riscos ISO 42001 e Proteção de Propriedade Intelectual.

### 3.1. Dashboard Home (`/dashboard`)
- [ ] **Elite UI:** O fundo tem gradiente suave e os cards têm efeito "vidro" (Glassmorphism)?
- [ ] **KPIs:** Os números principais (ex: Total Riscos) estão visíveis?

### 3.2. Módulo de Riscos (NOVO - `/dashboard/risks`)
- [ ] **Renderização Inicial:** A página carrega a Matriz de Calor (Heatmap) à esquerda e a lista à direita?
- [ ] **Insight IA:** O box de "Insights IA" exibe uma mensagem contextual (ex: "Concentração de riscos em...").
- [ ] **Criar Incidente (Teste do Cálculo PxI):**
    1. Clicar em "Registrar Incidente".
    2. Preencher:
       - Categoria: "Segurança"
       - Probabilidade: 5 (Muito Alta)
       - Impacto: 4 (Alto)
    3. **Validação:** O modal mostra "Risco Calculado: 20 (Crítico)" em vermelho antes de salvar?
    4. Salvar e verificar se apareceu na lista e se o Heatmap atualizou o contador na célula 5x4.
- [ ] **Persistência:** Recarregar a página (F5). O risco criado continua lá? (Verifica backend fix).

### 3.3. LMS / Sala de Aula (ATUALIZADO - `/dashboard/classroom`)
- [ ] **Acesso:** Entrar no curso "Formação Lead Implementer ISO 42001".
- [ ] **Theater Mode (Vídeo):**
    - Selecionar uma aula de Vídeo.
    - O player deve ocupar a largura total no formato 16:9 ("Cinema").
    - Configurações do YouTube (título, logo) estão minimizadas?
- [ ] **Secure Viewer (Documento - NOVO):**
    - Selecionar a aula "Material de Apoio (PDF)".
    - **Layout:** O container deve expandir verticalmente (`85vh`) para leitura confortável.
    - **Visualização:** O PDF carrega dentro do Canvas?
    - **Proteção:** Tentar selecionar o texto do PDF com o mouse. (Não deve ser possível).
    - **Marca D'água:** Verificar se existe uma marca d'água rotacionada com "CONFIDENTIAL" sobre o documento.
    - **Rodapé de Segurança:** Verificar se aparece a barra "SECURE VIEW • AUDIT ID: ... • IP LOGGED" piscando em verde.
- [ ] **Conclusão:** 
    - Clicar em "Marcar como Concluída".
    - Verificar se houve "flash" de sucesso e se o ícone na sidebar mudou para Check Verde.

### 3.4. Auditoria (Invisible Check)
- [ ] **Log:** (Técnico) Verificar no terminal do backend ou banco de dados se as entradas na tabela `audit_logs` foram criadas para as ações de "READ" (abrir curso) e "UPDATE_PROGRESS" (concluir aula).

---

## 🟣 ETAPA 4: RESPONSIVIDADE (Mobile)
Repetir os fluxos críticos simulando um celular (iPhone 12/14 Pro).

- [ ] **Matriz de Calor:** No mobile, ela se ajusta ou fica scrollável horizontalmente?
- [ ] **Menu Hambúrguer:** O menu do Dashboard funciona no mobile?
- [ ] **PDF Viewer:** O PDF é legível na tela pequena? A marca d'água atrapalha a leitura?
