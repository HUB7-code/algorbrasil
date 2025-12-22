# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 22/12/2025 - 15:00 (Settings Module & UI Polish)
> **Status Geral:** **OPERACIONAL E EXPANDIDO (V6.4)** ⚙️📸
> **Versão:** 6.4-Beta (Settings, Profile Picture, Sidebar Branding)

## 1. Manifesto Estratégico (The 3 Pillars)
O ecossistema ALGOR BRASIL opera sob três mandatos inegociáveis:

1.  **Frente Corporativa (B2B):** Captar empresas resolvendo a dor da "Insegurança Jurídica" com Governança de IA (ISO 42001/LGPD).
    *   *Mecanismo:* Diagnósticos de Risco, Data Clean Rooms e Infraestrutura "Growth AI Compliant".
2.  **Frente Associativa (B2C/Pro):** Captar e converter profissionais em membros associados e Consultores/Auditores certificados.
    *   *Mecanismo:* Formação (LMS), Certificação de Auditor Líder e Comunidade de Elite.
3.  **Plataforma SaaS (Delivery):** Entregar ferramentas digitais de alta performance para Consultores auditarem seus clientes.
    *   *Mecanismo:* Dashboard de Inventário de IA, Matriz de Risco Automatizada e Gerador de Políticas.

## 2. Design System & Branding: "HOME DNA" (Definitivo)
Abandonamos o conceito "Gamer/Matrix" em favor de uma estética **Corporativa, Sóbria e Premium**, alinhada 100% com a Home Page pública.

*   **Tema Global:** "Royal Navy Premium" (Consultoria de Elite).
*   **Cor Base:** Deep Navy (`#0A1A2F`) - *A mesma da Home*.
*   **Acentos:** Neon Green (`#00FF94`) e Electric Blue (`#00A3FF`) usados com parcimônia.
*   **Elementos Chave:**
    *   **Glass Panel:** Classe global `.glass-panel` usada em tudo (Sites e SaaS). Vidro real translúcido.
    *   **Tipografia:** Serif (`Playfair Display` ou similar) para Títulos. Sans (`Inter/Satoshi`) para dados.

*   **Status de Unificação Visual (FRONTEND V1.2 COMPLETE):**
    *   ✅ **Home Page:** Refinada (Links corretos, rolagem ajustada, Copy "Motor de Receita").
    *   ✅ **Register Journey:** Implementado "Cinematic Holographic Personas" na tela de cadastro.
    *   ✅ **Admin Dashboard:**
        - Sidebar: Logo ampliado (`w-14 h-14`), tipografia `Orbitron`, e "BRASIL" em verde neon.
        - Aba "Candidaturas" adicionada.
    *   ✅ **Fixes Críticos:** Resolvido bug de "Tela Escura/Bloqueada" no Navbar (Mobile Overlay) e Loading.

## 3. Estado Atual dos Arquivos (FULL STACK CONNECTED)

### ⚙️ Módulo de Configurações & Perfil (NEW V6.4)
- ✅ **Frontend (`/dashboard/settings`):** Página totalmente interativa.
    - Abas funcionais: Perfil, Segurança, Faturamento, Notificações.
    - Edição de dados: Nome, Email, Senha (backend conectado).
    - **Upload de Foto:** Input hidden e preview instantâneo.
- ✅ **Backend (`/api/v1/users/me`):**
    - `PUT /users/me`: Atualização segura de dados cadastrais.
    - `POST /users/me/avatar`: Upload, armazenamento local e linkagem no banco.
    - **Schema:** Adicionada coluna `profile_image` à tabela `users`.
- ✅ **Static Serving:** Next.js configurado para servir imagens estáticas do FastAPI.

### 🤝 Módulo de Parceiros
- ✅ **Backend (`models/partner.py`):** Tabela `partner_applications` com suporte a status.
- ✅ **API (`api/partners.py`):** Endpoints públicos de submissão e privados de gestão.
- ✅ **Frontend Admin (`dashboard/admin`):** Painel de controle para aprovar/rejeitar candidaturas.

### 🛡️ Backend & Segurança & Reparos
- ✅ **Admin Recovery:** Scripts `fix_admin.py` e `force_reset_robust.py` criados.
- ✅ **Banco de Dados:** SQLite atualizado com migração manual (`add_profile_image_column.py`).
- ✅ **Secrets Management:** `SECRET_KEY` centralizada em `.env`.

### Ciclo Atual (Fase de Polimento e Expansão)
67. ✅ **Sidebar Polish:** Branding da dashboard alinhado à Home.
68. ✅ **Settings Engine:** Módulo de configurações 100% funcional.
69. ✅ **Profile Picture:** Upload de avatar implementado com sucesso.

## 4. Roadmap Imediato (v6.5 - Deploy & Docs)
Com a plataforma funcional e segura:

70. 🚀 **VPS Deploy:** Levar a v6.4 para produção.
71. 📄 **Documentação:** Atualizar manuais de usuário e administrador.

## 5. Histórico de Versões
- **v6.0-RC1:** Security Hardening.
- **v6.1-Beta:** Edge Telemetry.
- **v6.2-UX:** Visual Storytelling (Personas Holográficas).
- **v6.3-Stable:** Partner Credentialing & Debug.
- **v6.4-Beta:** **Settings & Profile (ATUAL):** Upload de imagem, dashboard update, sidebar branding.
