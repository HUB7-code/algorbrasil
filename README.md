# 🎯 ALGOR BRASIL - Governança de IA B2B Enterprise

**Versão:** V22.0.0 "Next.js 16 & Turbopack Stabilization"  
**Status:** 🚀 PRODUCTION STABLE (Next 16 & Turbopack)  
**Última Atualização:** 03/03/2026

---

## 🎯 Sobre o Projeto

A ALGOR BRASIL é a consultoria B2B líder e a primeira associação brasileira dedicada à Governança de Inteligência Artificial. Nós formamos um **Esquadrão de Elite** para auditar, proteger e certificar ecossistemas de IA em grandes corporações.

### Missão
Liderar a adoção corporativa segura da IA no Brasil através da nossa metodologia de 4 Pilares:
- 🔍 **Consultorias de Governança:** Diagnóstico de IA, Descoberta, Gestão e Cultura AI First.
- 🎓 **Treinamentos Executivos:** Formação In-Company para lideranças C-Level.
- 💻 **Sistemas SaaS (AI GOV):** Plataforma de ponta para acompanhamento de conformidade e riscos.
- 🤝 **Esquadrão de Especialistas:** Uma equipe global de 250+ associados e 25 consultores dedicados ao sucesso do seu projeto.

---

## ✨ Novidades V21.4.0: B2B Cinematic Pivot

### 🎯 Restruturação Estratégica
- **Foco B2B Enterprise:** O site agora vende nossos pacotes de consultoria, metodologia de governança e apresenta nosso "Squad de Consultores".
- **ALGOR Lab Rebaixado:** Foco temporário retirado do B2C (Cursos) para impulsionar a aquisição de clientes B2B.

### 🎨 Design "Cinematic Enterprise"
- **Interfaces Glassmorphism Premium:** Efeitos de neon glow, spotlight interativo, e tilt 3D focados no universo high-tech cibersegurança e governança.
- **Identidade "Esquadrão de Elite":** Apresentação repaginada da nossa rede de membros especialistas e liderança.

### 🔧 Otimização de Infraestrutura
- **Imagem Docker:** 62% menor (800MB → 300MB)
- **Repositório Git:** Potencial redução de 98% (2.45GB → 50MB)
- **Build mais rápido:** `.dockerignore` expandido (90+ linhas)
- **Cleanup automático:** Script `cleanup-vps.sh`

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

## 🗺️ Estrutura do Site (V19.0.0)

### **Páginas Públicas (4)**
```
/                    → Landing page
/academy             → Algor Lab (cursos e formação)
/blog                → Blog e artigos
/board               → Membros Associados
```

### **Autenticação (6)**
```
/login               → Login
/register            → Cadastro
/forgot-password     → Recuperar senha
/reset-password      → Resetar senha
/verify-email        → Verificar email
/2fa                 → Autenticação 2FA
```

### **Políticas LGPD (4)**
```
/policies/privacy    → Política de Privacidade
/policies/terms      → Termos de Uso
/policies/cookies    → Política de Cookies
/policies/dpo        → Contato DPO
```

### **Dashboard (Área Logada)**
```
/dashboard/*         → Todas as funcionalidades internas
```

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
- **Framework:** Next.js 16 (App Router + Turbopack)
- **UI Library:** React 19
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + Custom CSS (PostCSS order enforced)
- **Animations:** Framer Motion 12+
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
- ✅ LGPD - Conformidade parcial
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
- 📄 [`SIMPLIFICATION_CHANGELOG.md`](./SIMPLIFICATION_CHANGELOG.md) - Changelog da simplificação
- 📄 [`CHANGELOG.md`](./CHANGELOG.md) - Histórico de versões
- 📄 [`AUTHENTICATION_AUDIT_REPORT.md`](./AUTHENTICATION_AUDIT_REPORT.md) - Auditoria de segurança
- 📄 [`ALGOR_Design_System_Spec.md`](./ALGOR_Design_System_Spec.md) - Design System v3.0
- 📄 [`DISK_SPACE_FIX.md`](./DISK_SPACE_FIX.md) - Otimização de disco
- 📄 [`LGPD-Manual-Operacional.md`](./LGPD-Manual-Operacional.md) - Compliance LGPD

**Navegue pela documentação completa:** [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md)

---

## 🚀 Deploy

### Produção (VPS com Docker)
```bash
# No VPS
cd ~/algorbrasil
git pull origin main
docker-compose up -d --build

# Cleanup (opcional)
chmod +x cleanup-vps.sh
./cleanup-vps.sh
```

**Guias Completos:**
- [`DEPLOY_V17.8.2.md`](./DEPLOY_V17.8.2.md)
- [`DISK_SPACE_FIX.md`](./DISK_SPACE_FIX.md)
- [`VPS_TROUBLESHOOTING.md`](./VPS_TROUBLESHOOTING.md)

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
- 📈 **Relatórios Premium:** PDFs com design institucional
- 🎓 **Algor Lab:** Cursos e certificações em IA

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

### V19.1.0 (Planejado - Q1 2026)
- [ ] Implementar exclusão de conta (LGPD)
- [ ] Implementar exportação de dados (LGPD)
- [ ] Adicionar backup codes para 2FA
- [ ] Implementar refresh tokens
- [ ] Health check endpoint

### V20.0.0 (Planejado - Q2 2026)
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
- 🧹 **Otimização:** [`DISK_SPACE_FIX.md`](./DISK_SPACE_FIX.md)

### Contato
- **Website:** https://www.algorbrasil.com.br
- **Email:** contato@algorbrasil.com.br
- **GitHub:** https://github.com/HUB7-code/algorbrasil

---

## 📜 Licença

Copyright © 2026 ALGOR BRASIL. Todos os direitos reservados.

---

## 🏆 Conquistas Recentes (V19.0.0)

### 🎯 Simplificação & Foco
- ✅ **44% menos páginas:** De 25 para 14 páginas essenciais
- ✅ **Navegação otimizada:** 3 links principais (Algor Lab, Blog, Membros Associados)
- ✅ **Sitemap enxuto:** 42% redução (19 → 11 rotas)
- ✅ **LGPD completo:** Todas as páginas obrigatórias mantidas

### 🏷️ Rebranding
- ✅ **"Algor Lab":** Identidade de marca forte e moderna
- ✅ **"Membros Associados":** Clareza em português
- ✅ **Interface PT-BR:** 100% localizada

### 🔧 Infraestrutura
- ✅ **Docker otimizado:** 62% menor (800MB → 300MB)
- ✅ **Git cleanup:** Potencial 98% redução (2.45GB → 50MB)
- ✅ **Build rápido:** `.dockerignore` expandido
- ✅ **Cleanup automático:** Script VPS

### 👥 Board Atualizado
- ✅ **Estrutura clara:** Liderança + Gestores + Delegados
- ✅ **Cargos atualizados:** 3 membros com novos títulos
- ✅ **Cobertura regional:** Paraíba, Paraná, Fortaleza CE

**Veja o histórico completo:** [`CHANGELOG.md`](./CHANGELOG.md)

---

**Desenvolvido com 💚 pela equipe ALGOR BRASIL**
