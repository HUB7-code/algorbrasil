# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 08/12/2025
> **Status Geral:** **SITE VIVO & INTERATIVO** 🧠 | Infraestrutura 100% | Animações High-End Ativas.
> **Foco Atual:** Transformar a Área do Membro em uma experiência de alto valor.

## 1. Objetivo Principal
Refinar o site institucional da Algor Brasil para refletir uma estética "Premium Organic Tech", com foco agora em tornar a **Área do Membro** funcional para entrega de valor (downloads/conteúdo), enquanto mantemos a conversão de leads ativa na home.

## 2. Decisões de Design (Estética)
- **Conceito:** "Premium Organic Tech". Fusão de tecnologia (IA/Dados) com elementos orgânicos.
- **Background Hero:** **Neural Network Simulation** (Canvas).
  - Partículas conectadas simulando sinapses.
  - Velocidade: **Ludicrous (4.5)** - Efeito de tempestade elétrica de dados.
  - Cores: Ouro e Cobre da marca.
- **Paleta de Cores:** Fundo Dark (#0A0A0A), Textos Claros, Acentos em **Cobre (Copper)**, **Ouro (Gold)**.
- **Tipografia:** 'Orbitron' (Títulos) + 'Inter' (Corpo).

## 3. Estrutura do Site e Páginas
### Index (`index.html`)
- **Hero:** Fundo animado "Neural Network" substituindo imagem estática. Título "Governança de I.A.".
- **Funcionalidade:**
  - Formulário de Newsletter conectado à API `/forms/newsletter`.
  - Contador de Membros Real conectado à API `/api/v1/stats/public`.
- **Scripts:** `js/neural-bg.js` (Animação) e `js/api-client.js`.

### Associe-se (`associe-se.html`)
- **Funil:** Cards de benefícios e formulário de adesão detalhado.

### Login (`login.html`)
- **Design:** Glassmorphism agressivo.
- **Funcionalidade:** Autenticação via JWT (`/api/v1/login`).

### Admin (`admin-leads.html`) **[NOVO]**
- **Função:** Painel restrito para Administradores visualizarem leads capturados.
- **Segurança:** Protegido por Token Admin.
- **Dados:** Exibe tabela com Nome, Email, Empresa e Origem do lead.

### Dashboard (`dashboard.html`)
- **Conceito:** "Console do Membro".
- **Status Atual:** Protótipo funcional.
- **Planejamento:**
  - Seção "Biblioteca de Recursos" para baixar Dossiê PL 2338 e Playbook.
  - Bloqueio visual para usuários 'Free' (Upsell para 'Member').
  - Feed de Inteligência (Simulado).

## 4. Infraestrutura Técnica (Produção)
- **VPS:** Hostinger (IP: 72.60.243.67).
- **Domínio:** `algorbrasil.com.br` (HTTPS/SSL Ativo).
- **Stack:** Docker + Nginx + FastAPI (Python) + SQLite.
- **Autenticação:** OAuth2 com Password Flow (JWT).

## 5. Histórico de Conquistas (Checklist Recente)
- [x] **Infraestrutura:** Deploy VPS, SSL, Banco de Dados persistente.
- [x] **Backend:** API de Auth e Formulários (Newsletter/Leads) implementada.
- [x] **Gestão de Leads:** Página `admin-leads.html` criada e funcional.
- [x] **Visual Hero:** Implementada animação de Rede Neural em Canvas (Velocidade 3x).
- [x] **Dashboard:** Protótipo inicial criado.
- [x] **Hotfix Index:** Correção de HTML quebrado no Hero e Menu Mobile restaurado.
- [x] **Dados Reais:** Implementado endpoint `/api/v1/stats/public` para contagem real de membros no Hero.
- [x] **UX Hero:** Restaurados botões "Fale Conosco" e "Membros" com feedback visual de dados.

## 6. Próximos Passos (Roadmap de Evolução)
- [ ] **Dashboard V2:** Implementar links reais de download para os PDFs.
- [ ] **Integração de E-mail:** Configurar SMTP para disparar e-mails reais de boas-vindas.
- [ ] **Backup Automático:** Script para segurança do banco de dados.

## 7. Arquivos Chave & Scripts
- `PROJECT_STATUS_MEMORIA.md` (Este arquivo).
- `js/neural-bg.js` (Lógica da animação do Hero).
- `backend/app/api/auth.py` (Lógica de Login).
- `admin-leads.html` (Gestão Interna).

