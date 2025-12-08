# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 08/12/2025
> **Status Geral:** Frontend Completo | Backend Operacional | Próximo: Testes Integrados e Containerização (Docker)

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

### Associe-se (`associe-se.html`) - **NOVO**
- **Funil:** Seção de Benefícios (Cards), Comparativo de Categorias (Individual vs Corporativo) e Timeline de Adesão.
- **Formulário:** Estilizado e pronto para integração.

### Login (`login.html`) - **NOVO**
- **Design:** Card centralizado com efeito Glassmorphism agressivo e background imersivo.
- **Funcionalidade:** Conectado ao `auth-client.js`.

### Dashboard (`dashboard.html`) - **NOVO**
- **Conceito:** "Console do Membro".
- **Recursos:** Acesso direto aos Downloads (Lead Magnets) prometidos na Home.
- **Status:** Verifica token de autenticação e exibe email do usuário.

## 4. Infraestrutura Técnica
- **Frontend:** HTML5, TailwindCSS (CDN), JavaScript Vanilla (Modules).
- **Backend:** Python FastAPI. Rodando localmente (Portas 8001/8002).
- **Banco de Dados:** SQLite (Local).
# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 08/12/2025
> **Status Geral:** Frontend Completo | Backend Operacional | Próximo: Testes Integrados e Containerização (Docker)

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

### Associe-se (`associe-se.html`) - **NOVO**
- **Funil:** Seção de Benefícios (Cards), Comparativo de Categorias (Individual vs Corporativo) e Timeline de Adesão.
- **Formulário:** Estilizado e pronto para integração.

### Login (`login.html`) - **NOVO**
- **Design:** Card centralizado com efeito Glassmorphism agressivo e background imersivo.
- **Funcionalidade:** Conectado ao `auth-client.js`.

### Dashboard (`dashboard.html`) - **NOVO**
- **Conceito:** "Console do Membro".
- **Recursos:** Acesso direto aos Downloads (Lead Magnets) prometidos na Home.
- **Status:** Verifica token de autenticação e exibe email do usuário.

## 4. Infraestrutura Técnica
- **Frontend:** HTML5, TailwindCSS (CDN), JavaScript Vanilla (Modules).
- **Backend:** Python FastAPI. Rodando localmente (Portas 8001/8002).
- **Banco de Dados:** SQLite (Local).
- **Repositório:** GitHub sincronizado.

## 4. Próximos Passos (Roadmap Imediato)

- [x] **Configurar Docker:** Criar `Dockerfile` e `docker-compose.yml`. (FEITO)
- [x] **Deploy na VPS:** Subir aplicação na Hostinger. (FEITO - IP: 72.60.243.67)
- [ ] **Configurar Domínio:** Apontar DNS `algorbrasil.com.br` para a VPS.
- [ ] **HTTPS (SSL):** Configurar Certbot/LetsEncrypt para cadeado seguro.
- [ ] **Backup:** Configurar script de backup automático do `sql_app.db`. via Docker.

## 6. Arquivos Chave
- `PROJECT_STATUS_MEMORIA.md` (Este arquivo).
- `js/auth-client.js` (Cliente de API).
- `backend/app/main.py` (API Server).
