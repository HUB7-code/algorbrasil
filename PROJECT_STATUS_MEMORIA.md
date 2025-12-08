# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 08/12/2025
> **Status Geral:** **SITE EM PRODUÇÃO** 🚀 | Infraestrutura 100% (VPS, SSL, DB) | Backend e Frontend Integrados.
> **Próximo Ciclo:** Refinamento do Dashboard e Funcionalidades de Membros.

## 1. Objetivo Principal
Refinar o site institucional da Algor Brasil para refletir uma estética "Premium Organic Tech" e preparar a infraestrutura para a futura plataforma SaaS (Login e Área de Membros).

## 2. Decisões de Design (Estética)
- **Conceito:** "Premium Organic Tech". Fusão de tecnologia (IA/Dados) com elementos orgânicos e sofisticados.
- **Paleta de Cores:** Fundo Dark (#0A0A0A), Textos Claros, Acentos em **Cobre (Copper)**, **Ouro (Gold)** e toques sutis de Azul Neon.
- **Tipografia:** 
  - Títulos Principais: 'Orbitron' (Futurista/Tech).
  - Títulos Secundários: 'Playfair Display' (Sofisticação/Serifa).
  - Corpo: 'Inter' (Legibilidade).
- **Consistência:** Todas as páginas (Home, Login, Dashboard) compartilham o mesmo DNA visual (Glassmorphism, Glow, Imagens Abstratas).

## 3. Estrutura do Site e Páginas
### Index (`index.html`)
- **Hero:** Título "Governança de I.A.". Background `hero-opt1.png`.
- **Conteúdo:** Bento Grid de Atuação, Membros com fotos hover, Lead Magnets (Dossiê, Playbook).
- **Parceiros:** Oculto (`hidden`).

### Associe-se (`associe-se.html`)
- **Funil:** Seção de Benefícios (Cards), Comparativo de Categorias (Individual vs Corporativo) e Timeline de Adesão.
- **Formulário:** Estilizado, submete dados via API Backend.

### Login (`login.html`)
- **Design:** Card centralizado com efeito Glassmorphism agressivo e background imersivo.
- **Funcionalidade:** Conectado ao `auth-client.js` e API Python. Segue padrão OAuth2 (JWT).

### Dashboard (`dashboard.html`)
- **Conceito:** "Console do Membro".
- **Recursos:** Acesso direto aos Downloads (Lead Magnets) prometidos na Home.
- **Status:** Área protegida. Verifica token de autenticação e exibe email do usuário.

## 4. Infraestrutura Técnica (Produção)
- **Servidor:** VPS Hostinger (IP: 72.60.243.67).
- **Domínio:** `algorbrasil.com.br` (HTTPS/SSL Ativo via LetsEncrypt/Certbot).
- **Containerização:** Docker & Docker Compose.
  - Serviço `web` (Nginx): Proxy Reverso, Cache de estáticos e SSL Termination.
  - Serviço `backend` (FastAPI): API REST na porta interna 8000.
- **Banco de Dados:** SQLite (`sql_app.db`) persistido em volume Docker, com migração de coluna `phone` aplicada.

## 5. Histórico de Conquistas (Checklist)
- [x] **Configurar Docker:** Criar `Dockerfile` e `docker-compose.yml`.
- [x] **Deploy na VPS:** Subir aplicação na Hostinger.
- [x] **Configurar Domínio:** Apontar DNS e configurar Nginx.
- [x] **HTTPS (SSL):** Cadeado seguro ativado.
- [x] **Persistência de Dados:** Banco de dados seguro contra restarts.
- [x] **Teste Final:** Login validado em produção com sucesso.

## 6. Próximos Passos (Roadmap de Evolução)
- [ ] **Backup Automático:** Script para exportar `sql_app.db` periodicamente.
- [ ] **Refinamento do Dashboard:** Transformar a página básica em um verdadeiro painel de controle.
- [ ] **Gestão de Membros:** Criar página para Admin ver quem se cadastrou.

## 7. Arquivos Chave
- `PROJECT_STATUS_MEMORIA.md` (Este arquivo).
- `docker-compose.yml` (Orquestração).
- `nginx.conf` (Roteamento e Segurança).
- `js/auth-client.js` (Lógica de Login).
