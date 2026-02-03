# 📚 ÍNDICE DE DOCUMENTAÇÃO - ALGOR BRASIL

**Versão:** V18.3.0  
**Última Atualização:** 03/02/2026

Este documento serve como guia de navegação para toda a documentação do projeto ALGOR BRASIL.

---

## 🎯 DOCUMENTOS PRINCIPAIS

### 1. **Status e Planejamento**

| Documento | Descrição | Última Atualização |
|-----------|-----------|-------------------|
| [`PROJECT_STATUS_MEMORIA.md`](./PROJECT_STATUS_MEMORIA.md) | Status atual do projeto, histórico de versões e conquistas | 03/02/2026 |
| [`CHANGELOG.md`](./CHANGELOG.md) | Histórico detalhado de mudanças por versão | 03/02/2026 |
| [`DEPLOY_V17.8.2.md`](./DEPLOY_V17.8.2.md) | Guia de deploy para VPS | 01/01/2026 |

### 2. **Arquitetura e Design**

| Documento | Descrição | Última Atualização |
|-----------|-----------|-------------------|
| [`ALGOR_Design_System_Spec.md`](./ALGOR_Design_System_Spec.md) | Especificação completa do Design System v3.0 | 23/01/2026 |
| [`ux-ui-manual-2026.md`](./ux-ui-manual-2026.md) | Manual de UX/UI com tendências e best practices | 20/01/2026 |
| [`STRATEGIC_ECONOMICS.md`](./STRATEGIC_ECONOMICS.md) | Tese econômica e modelo de negócio | 20/01/2026 |
| [`Metodologia de Serviço B2B – Governança de IA ALGO.md`](./Metodologia%20de%20Serviço%20B2B%20–%20Governança%20de%20IA%20ALGO.md) | Metodologia de 5 etapas B2B | 20/01/2026 |

### 3. **Segurança e Compliance**

| Documento | Descrição | Última Atualização |
|-----------|-----------|-------------------|
| [`AUTHENTICATION_AUDIT_REPORT.md`](./AUTHENTICATION_AUDIT_REPORT.md) | 🆕 Relatório completo de auditoria de autenticação | 03/02/2026 |
| [`AUTHENTICATION_SYSTEM.md`](./AUTHENTICATION_SYSTEM.md) | Sistema de autenticação para membros | 03/02/2026 |
| [`algor_backend_security.md`](./algor_backend_security.md) | Arquitetura de segurança backend (Zero Trust) | 20/01/2026 |
| [`LGPD-Manual-Operacional.md`](./LGPD-Manual-Operacional.md) | Manual operacional de conformidade LGPD | 20/01/2026 |
| [`GOOGLE_AUTH_SETUP.md`](./GOOGLE_AUTH_SETUP.md) | Setup de OAuth Google | 25/01/2026 |

### 4. **Testes e QA**

| Documento | Descrição | Última Atualização |
|-----------|-----------|-------------------|
| [`ROTEIRO_TESTES_COMPLETO.md`](./ROTEIRO_TESTES_COMPLETO.md) | Roteiro completo de testes (11 jornadas) | 03/02/2026 |
| [`backend/test_auth_system.py`](./backend/test_auth_system.py) | 🆕 Script automatizado de testes de autenticação | 03/02/2026 |

### 5. **CI/CD e Deploy**

| Documento | Descrição | Última Atualização |
|-----------|-----------|-------------------|
| [`CI_CD_DOCUMENTATION.md`](./CI_CD_DOCUMENTATION.md) | Documentação de CI/CD (GitHub Actions) | 12/01/2026 |
| [`docker-compose.yml`](./docker-compose.yml) | Configuração Docker Compose | 12/01/2026 |
| [`.env.example`](./.env.example) | Template de variáveis de ambiente | 20/01/2026 |

---

## 🔍 GUIAS RÁPIDOS

### Para Desenvolvedores

**Começando:**
1. Leia [`PROJECT_STATUS_MEMORIA.md`](./PROJECT_STATUS_MEMORIA.md) para entender o estado atual
2. Configure o ambiente seguindo [`.env.example`](./.env.example)
3. Consulte [`ALGOR_Design_System_Spec.md`](./ALGOR_Design_System_Spec.md) para padrões de UI

**Desenvolvendo:**
1. Siga os padrões do [`ux-ui-manual-2026.md`](./ux-ui-manual-2026.md)
2. Implemente segurança conforme [`algor_backend_security.md`](./algor_backend_security.md)
3. Garanta conformidade LGPD usando [`LGPD-Manual-Operacional.md`](./LGPD-Manual-Operacional.md)

**Testando:**
1. Execute [`backend/test_auth_system.py`](./backend/test_auth_system.py) para validar autenticação
2. Siga [`ROTEIRO_TESTES_COMPLETO.md`](./ROTEIRO_TESTES_COMPLETO.md) para testes manuais

**Deploy:**
1. Revise [`DEPLOY_V17.8.2.md`](./DEPLOY_V17.8.2.md)
2. Configure CI/CD conforme [`CI_CD_DOCUMENTATION.md`](./CI_CD_DOCUMENTATION.md)

### Para Product Managers

**Estratégia:**
1. [`STRATEGIC_ECONOMICS.md`](./STRATEGIC_ECONOMICS.md) - Modelo de negócio
2. [`Metodologia de Serviço B2B – Governança de IA ALGO.md`](./Metodologia%20de%20Serviço%20B2B%20–%20Governança%20de%20IA%20ALGO.md) - Ciclo de vendas

**Design:**
1. [`ALGOR_Design_System_Spec.md`](./ALGOR_Design_System_Spec.md) - Padrões visuais
2. [`ux-ui-manual-2026.md`](./ux-ui-manual-2026.md) - Tendências e best practices

**QA:**
1. [`ROTEIRO_TESTES_COMPLETO.md`](./ROTEIRO_TESTES_COMPLETO.md) - Validação de funcionalidades

### Para Auditores de Segurança

**Segurança:**
1. [`AUTHENTICATION_AUDIT_REPORT.md`](./AUTHENTICATION_AUDIT_REPORT.md) - Auditoria completa
2. [`algor_backend_security.md`](./algor_backend_security.md) - Arquitetura de segurança
3. [`AUTHENTICATION_SYSTEM.md`](./AUTHENTICATION_SYSTEM.md) - Sistema de autenticação

**Compliance:**
1. [`LGPD-Manual-Operacional.md`](./LGPD-Manual-Operacional.md) - Conformidade LGPD

---

## 📊 ESTRUTURA DO PROJETO

```
chrono-aldrin/
├── 📁 backend/                    # Backend FastAPI (Python)
│   ├── app/
│   │   ├── api/                   # Endpoints da API
│   │   │   └── auth.py           # Autenticação (14 endpoints)
│   │   ├── core/                  # Configurações e segurança
│   │   │   ├── config.py         # Settings (SMTP, JWT, etc)
│   │   │   └── security.py       # Argon2, AES-256, JWT
│   │   ├── db/                    # Modelos e sessões
│   │   ├── models/                # SQLAlchemy models
│   │   └── services/
│   │       └── email_service.py  # 6 templates de e-mail
│   ├── test_auth_system.py       # 🆕 Script de teste automatizado
│   └── requirements.txt           # Dependências Python
│
├── 📁 frontend/                   # Frontend Next.js 15 (React 19)
│   ├── app/
│   │   ├── (public)/
│   │   │   └── login/
│   │   │       └── page.tsx      # Login page (Cyberpunk UI)
│   │   ├── dashboard/             # Área autenticada
│   │   └── api/                   # API Routes (Next.js)
│   ├── components/                # Componentes React
│   ├── public/
│   │   └── logo-algor.webp       # Logo para e-mails
│   └── middleware.ts              # Proteção de rotas
│
├── 📄 AUTHENTICATION_AUDIT_REPORT.md  # 🆕 Relatório de auditoria
├── 📄 AUTHENTICATION_SYSTEM.md        # Sistema de autenticação
├── 📄 PROJECT_STATUS_MEMORIA.md       # Status do projeto
├── 📄 CHANGELOG.md                    # 🆕 Histórico de versões
├── 📄 ROTEIRO_TESTES_COMPLETO.md      # Roteiro de testes
├── 📄 ALGOR_Design_System_Spec.md     # Design System v3.0
├── 📄 algor_backend_security.md       # Segurança backend
├── 📄 LGPD-Manual-Operacional.md      # Compliance LGPD
└── 📄 .env.example                    # Template de configuração
```

---

## 🆕 NOVIDADES V18.3.0

### Documentos Criados
1. **`AUTHENTICATION_AUDIT_REPORT.md`** - Relatório completo de auditoria (20+ páginas)
2. **`backend/test_auth_system.py`** - Script de teste automatizado
3. **`CHANGELOG.md`** - Histórico de versões consolidado
4. **`DOCUMENTATION_INDEX.md`** - Este documento (índice de navegação)

### Documentos Atualizados
1. **`PROJECT_STATUS_MEMORIA.md`** - Versão V18.3.0 adicionada
2. **`ROTEIRO_TESTES_COMPLETO.md`** - JORNADA 11 adicionada (15 testes)
3. **`AUTHENTICATION_SYSTEM.md`** - Status atualizado para "100% Funcional (Auditado)"

### Correções Aplicadas
1. **`backend/.env`** - SMTP_USER corrigido (adicionado @gmail.com)
2. **Rota mock removida** - `/frontend/app/api/auth/login/route.ts` deletado

---

## 🔗 LINKS ÚTEIS

### Repositório
- **GitHub:** https://github.com/HUB7-code/algorbrasil

### Produção
- **Website:** https://www.algorbrasil.com.br
- **API:** https://www.algorbrasil.com.br/api/v1

### Desenvolvimento
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

---

## 📞 SUPORTE

Para dúvidas sobre a documentação:
1. Consulte o documento específico no índice acima
2. Verifique o [`CHANGELOG.md`](./CHANGELOG.md) para mudanças recentes
3. Execute [`backend/test_auth_system.py`](./backend/test_auth_system.py) para validar configurações

---

**Última atualização:** 03/02/2026  
**Versão:** V18.3.0  
**Mantido por:** Equipe ALGOR BRASIL
