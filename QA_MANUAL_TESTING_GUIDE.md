# MANUAL DE TESTES INTEGRADO (E2E) - ALGOR BRASIL
> **Objetivo:** Roteiro passo a passo para validação manual completa da plataforma, cobrindo fluxos públicos, autenticação e funcionalidades restritas (Dashboard, LMS, Riscos).

## 🟢 ETAPA 1: FLUXO PÚBLICO (Visitante)
O objetivo desta etapa é garantir que a "vitrine" do site esteja perfeita, responsiva e com todos os links funcionando.

### 1.1. Home Page (Landing)
- [ ] **Carregamento & Performance:**
    - Acessar a Home (`/`). O site carrega instantaneamente (< 2s)?
    - A Logo no topo esquerdo está grande, circular e visível?
    - A animação de fundo (neurônios/ondas) está fluida e não trava o scroll?
- [ ] **Navegação (Header):**
    - Clicar em "A Associação" -> Rola suavemente para a seção de benefícios?
    - Clicar em "Intelligence Hub" -> Rola suavemente para a grid de Personas?
    - Clicar em "Metodologia" -> Rola suavemente para a seção do sistema operacional?
    - Clicar em "Associados" -> Redireciona para a página `/associates`?
    - Botão "Login Membros" -> Redireciona para `/login`?
- [ ] **Interatividade da Home:**
    - **Hero Section:** Passar o mouse sobre os cards "Para Empresas" e "Para Profissionais". O efeito de hover (brilho/foco) funciona?
    - **Botões Hero:**
        - "Diagnóstico Gratuito" (Empresas) -> Leva para Login ou Cadastro?
        - "Aplicar para Associação" (Profissionais) -> Leva para `/register`?
    - **Grid de Personas:** Clicar em um card (ex: "O Guardião"). Leva para o registro com o parâmetro correto?
- [ ] **Rodapé (Footer):**
    - Verificar se os links de Políticas (Privacidade, Transparência) clicam e abrem (mesmo que placeholders).
    - Verificar se o Copyright mostra o ano atual.

### 1.2. Página de Associados (`/associates`)
- [ ] **Renderização:** A página carrega o Grid de associados?
- [ ] **Filtros:**
    - Tentar filtrar por categoria (ex: "Conselheiro", "Auditor"). A lista atualiza?
    - Tentar a busca por texto. Funciona?
- [ ] **Modal de Detalhes:** Clicar em um card de associado. O modal abre com as informações detalhadas? O botão de fechar funciona?

---

## 🟡 ETAPA 2: AUTENTICAÇÃO & ONBOARDING
Validação crítica de segurança e fluxo de entrada de usuários.

### 2.1. Registro (`/register`)
- [ ] **Formulário:** Preencher com dados de teste.
- [ ] **Seleção de Perfil:** Escolher entre "Corporativo" ou "Profissional". O formulário adapta os campos?
- [ ] **Submissão:** Clicar em "Continuar". Ocorre sucesso? (Verificar se redireciona ou mostra mensagem).

### 2.2. Login (`/login`)
- [ ] **Login Inválido:** Tentar entrar com `email: teste@errado.com` / `senha: 123`. Deve exibir erro.
- [ ] **Login Válido:** Entrar com credenciais válidas (ex: admin local se houver, ou criar um usuário no banco).
- [ ] **Redirecionamento:** Após login, o usuário é levado automaticamente para o `/dashboard`?

---

## 🔵 ETAPA 3: DASHBOARD & FUNCIONALIDADES (Membro Logado)
Aqui testamos o "valor entregue" da plataforma.

### 3.1. Dashboard Home (`/dashboard`)
- [ ] **Visão Geral:** Os Cards de KPI (Total Riscos, Auditorias, etc.) renderizam números?
- [ ] **Sidebar:** O menu lateral está visível? Ele colapsa/expande se houver essa função?
- [ ] **Logout:** O botão de sair funciona e limpa a sessão?

### 3.2. Módulo de Riscos (`/dashboard/risks`)
- [ ] **Listagem:** A tabela de riscos carrega dados?
- [ ] **Novo Risco:**
    - Clicar em "Novo Risco".
    - Preencher Título, Probabilidade, Impacto.
    - Salvar. O risco aparece na lista? O cálculo de Severidade (Probabilidade x Impacto) ocorreu?
- [ ] **Edição/Exclusão:** Tentar editar um risco existente. Tentar excluir.

### 3.3. LMS / Sala de Aula (`/dashboard/classroom`)
- [ ] **Acesso:** Entrar em um curso.
- [ ] **Player:** O vídeo do YouTube carrega e toca?
- [ ] **Navegação de Aulas:** Clicar nas aulas da sidebar lateral troca o vídeo?
- [ ] **Conclusão:** Clicar em "Marcar como Concluído". O status (check verde) atualiza na sidebar?

### 3.4. Assessments (`/dashboard/assessments`)
- [ ] **Novo Assessment:** Iniciar um novo diagnóstico.
- [ ] **Wizard:** O formulário passo-a-passo avança?

---

## 🟣 ETAPA 4: RESPONSIVIDADE (Mobile)
Repetir os fluxos críticos simulando um celular (DevTools `Ctrl+Shift+M`).

- [ ] **Menu Hambúrguer:** Na Home, o menu móvel abre e fecha?
- [ ] **Tabelas no Dashboard:** Elas possuem scroll horizontal ou quebram o layout?
- [ ] **Vídeo Aula:** O player se ajusta à largura da tela?

