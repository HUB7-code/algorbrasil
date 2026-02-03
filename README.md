# 🔒 ALGOR BRASIL - Plataforma de Governança de IA

**Versão:** V18.3.0 "Authentication Audit"  
**Status:** 🔒 SECURITY VALIDATED (Production Ready)  
**Última Atualização:** 03/02/2026

---

## 🎯 Sobre o Projeto

ALGOR BRASIL é a primeira associação brasileira de Governança de IA, oferecendo uma plataforma completa para gestão, auditoria e conformidade de sistemas de Inteligência Artificial.

### Missão
Liderar a era da Governança de IA no Brasil através de:
- 🔍 **Diagnóstico e Auditoria** de sistemas de IA
- 📚 **Educação Executiva** (ISO 42001, LGPD, PL 2338)
- 🏆 **Certificação e Selo** de confiança em IA
- 🤝 **Networking de Elite** para C-Levels e decisores

---

## 🚀 Quick Start

### Pré-requisitos
- **Backend:** Python 3.10+
- **Frontend:** Node.js 20+
- **Banco de Dados:** SQLite (dev) / PostgreSQL (prod)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/HUB7-code/algorbrasil.git
cd algorbrasil

# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edite .env com suas credenciais

# Frontend
cd ../frontend
npm install
cp .env.example .env
# Edite .env com suas configurações

# Rodar localmente
# Terminal 1 (Backend)
cd backend
uvicorn app.main:app --reload

# Terminal 2 (Frontend)
cd frontend
npm run dev
```

Acesse: http://localhost:3000

---

## 🔐 OAuth Configuration

For OAuth authentication (LinkedIn, Google), you need to configure credentials:

1. Copy the example file:
   ```bash
   cp OAUTH_CREDENTIALS.example.md OAUTH_CREDENTIALS.md
   ```

2. Edit `OAUTH_CREDENTIALS.md` with your actual credentials
   - **This file is git-ignored and will NOT be committed**

3. For production, set environment variables instead:
   ```bash
   export LINKEDIN_CLIENT_ID=your_id
   export LINKEDIN_CLIENT_SECRET=your_secret
   export GOOGLE_CLIENT_ID=your_id
   export GOOGLE_CLIENT_SECRET=your_secret
   # ... etc
   ```

⚠️ **NEVER commit real credentials to Git!**

---

## 📊 Stack Tecnológico

### Backend
- **Framework:** FastAPI (Python 3.10)
- **Database:** SQLite / PostgreSQL
- **ORM:** SQLAlchemy 2.0
- **Auth:** JWT (PyJWT) + OAuth2 (Google, LinkedIn)
- **Security:** Argon2id, AES-256, Rate Limiting
- **Email:** SMTP (Gmail) com templates HTML premium

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + Custom CSS
- **Animations:** Framer Motion 11+
- **Icons:** Lucide React

### Design System
- **Aesthetic:** "Power BI Premium Dark Mode" + "Apple Vision Pro UI"
- **Colors:** Deep Navy (#050A10), Neon Green (#00FF94), Electric Blue (#00A3FF)
- **Typography:** Orbitron (Display), Inter/Manrope (Body), JetBrains Mono (Code)
- **Effects:** Glassmorphism, Neon Glows, Neural Mesh Backgrounds

---

## 🔐 Segurança

### Autenticação
- ✅ JWT com expiração de 30 minutos
- ✅ Argon2id para hashing de senhas (custo 12+)
- ✅ 2FA via TOTP (Google Authenticator, Authy)
- ✅ OAuth2 (Google, LinkedIn)
- ✅ Rate Limiting (5 req/min)

### Criptografia
- ✅ AES-256-CBC para dados sensíveis (phone, cpf)
- ✅ TLS 1.3 obrigatório em produção
- ✅ Prepared statements (anti-SQL injection)

### Compliance
- ✅ LGPD - Conformidade parcial (faltam exclusão e exportação)
- ✅ Audit Logs (6 meses de retenção)
- ✅ Consentimento opt-in
- ✅ Transparência em coleta de dados

**Relatório Completo:** [`AUTHENTICATION_AUDIT_REPORT.md`](./AUTHENTICATION_AUDIT_REPORT.md)

---

## 🧪 Testes

### Teste Automatizado
```bash
cd backend
python test_auth_system.py
```

**Resultado Esperado:** 4/4 testes (100%)
- ✅ Configurações SMTP
- ✅ Logo para e-mails
- ✅ Conexão com banco de dados
- ✅ Envio de e-mail real

### Testes Manuais
Siga o roteiro completo: [`ROTEIRO_TESTES_COMPLETO.md`](./ROTEIRO_TESTES_COMPLETO.md)

---

## 📚 Documentação

### Principais Documentos
- 📄 [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md) - **Índice completo de documentação**
- 📄 [`PROJECT_STATUS_MEMORIA.md`](./PROJECT_STATUS_MEMORIA.md) - Status e histórico do projeto
- 📄 [`CHANGELOG.md`](./CHANGELOG.md) - Histórico de versões
- 📄 [`AUTHENTICATION_AUDIT_REPORT.md`](./AUTHENTICATION_AUDIT_REPORT.md) - Auditoria de segurança
- 📄 [`ALGOR_Design_System_Spec.md`](./ALGOR_Design_System_Spec.md) - Design System v3.0
- 📄 [`algor_backend_security.md`](./algor_backend_security.md) - Arquitetura de segurança
- 📄 [`LGPD-Manual-Operacional.md`](./LGPD-Manual-Operacional.md) - Compliance LGPD

**Navegue pela documentação completa:** [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md)

---

## 🎨 Design System

### Paleta de Cores
```css
/* Core */
--deep-navy: #050A10;
--electric-blue: #00A3FF;
--neon-green: #00FF94;
--amber-warning: #FFB000;
--purple-accent: #8B5CF6;
--error-red: #EF4444;

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #A0AEC0;
--text-tertiary: #718096;
```

### Glassmorphism Pattern
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(32px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
}
```

**Especificação Completa:** [`ALGOR_Design_System_Spec.md`](./ALGOR_Design_System_Spec.md)

---

## 🚀 Deploy

### Produção (VPS com Docker)
```bash
# No VPS
cd ~/algorbrasil
./deploy.sh
```

**Guia Completo:** [`DEPLOY_V17.8.2.md`](./DEPLOY_V17.8.2.md)

### CI/CD (GitHub Actions)
- ✅ Pipeline backend (Python + pytest)
- ✅ Pipeline frontend (Node.js + build)
- ✅ Deploy automático após merge na main

**Documentação:** [`CI_CD_DOCUMENTATION.md`](./CI_CD_DOCUMENTATION.md)

---

## 🌟 Funcionalidades Principais

### Para Usuários
- 🔐 **Autenticação Segura:** Login com 2FA, OAuth2 (Google, LinkedIn)
- 📊 **Dashboard Interativo:** Visualização de métricas de governança
- 🔍 **Scanner de IA:** Detecção de Shadow AI
- 📈 **Relatórios Premium:** PDFs com design institucional
- 🎓 **Academy:** Cursos e certificações em IA

### Para Empresas
- 🏢 **Diagnóstico Gratuito:** AI Discovery Sprint
- 📋 **Auditoria ISO 42001:** Conformidade certificada
- 🛡️ **Selo de Confiança:** Trust Seal para websites
- 👥 **Consultoria Especializada:** Implementação de governança
- 📚 **Educação In-Company:** Treinamentos customizados

### Para Membros Associados
- ✍️ **Blog ALGOR Insights:** Publicação de artigos
- 🤝 **Networking:** Conexão com C-Levels
- 🎤 **Eventos Exclusivos:** Fóruns e workshops
- 💼 **Oportunidades:** Projetos e parcerias

---

## 📊 Roadmap

### V18.4.0 (Planejado - Q1 2026)
- [ ] Implementar exclusão de conta (LGPD)
- [ ] Implementar exportação de dados (LGPD)
- [ ] Adicionar backup codes para 2FA
- [ ] Implementar refresh tokens
- [ ] Health check endpoint

### V19.0.0 (Planejado - Q2 2026)
- [ ] Migração para PostgreSQL em produção
- [ ] Implementar WebAuthn (biometria)
- [ ] Magic Link login
- [ ] Dashboard de analytics avançado
- [ ] API pública para parceiros

---

## 🤝 Contribuindo

### Workflow
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrões
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- **Code Style:** Seguir ESLint (frontend) e Black (backend)
- **Testes:** Adicionar testes para novas funcionalidades
- **Documentação:** Atualizar docs relevantes

---

## 📞 Suporte

### Documentação
- 📚 **Índice Completo:** [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md)
- 🔒 **Auditoria de Segurança:** [`AUTHENTICATION_AUDIT_REPORT.md`](./AUTHENTICATION_AUDIT_REPORT.md)
- 🧪 **Testes:** [`ROTEIRO_TESTES_COMPLETO.md`](./ROTEIRO_TESTES_COMPLETO.md)

### Contato
- **Website:** https://www.algorbrasil.com.br
- **Email:** contato@algorbrasil.com.br
- **GitHub:** https://github.com/HUB7-code/algorbrasil

---

## 📜 Licença

Copyright © 2026 ALGOR BRASIL. Todos os direitos reservados.

---

## 🏆 Conquistas Recentes (V18.3.0)

- ✅ **100% Funcional:** Sistema de autenticação auditado e validado
- ✅ **SMTP Corrigido:** E-mails sendo enviados com sucesso
- ✅ **6 Templates Premium:** Design Dark Mode com glassmorphism
- ✅ **Testes Automatizados:** 4/4 testes passando (100%)
- ✅ **Documentação Completa:** 20+ páginas de auditoria de segurança
- ✅ **OAuth2:** Google e LinkedIn funcionais
- ✅ **2FA:** TOTP implementado e testado
- ✅ **LGPD:** Audit logs e criptografia de dados

**Veja o histórico completo:** [`CHANGELOG.md`](./CHANGELOG.md)

---

**Desenvolvido com 💚 pela equipe ALGOR BRASIL**
