# 📄 Termos de Consentimento (LGPD) e Inventário de Dados (ROPA)

**Projeto:** Algor Brasil - AI Governance Platform  
**Data:** 30/12/2025  
**DPO Responsável:** Antigravity (Simulação Sênior)  

---

## 1. Inventário de Dados Pessoais Processados (ROPA - Art. 37)

| Dado Pessoal | Finalidade | Base Legal (Art. 7 LGPD) | Retenção | Compartilhado com |
| :--- | :--- | :--- | :--- | :--- |
| **Nome Completo** | Cadastro e Identificação | V. Execução de Contrato | Vigência + 5 anos | AWS (DB) |
| **Email Corporativo** | Login, Comunicação e 2FA | V. Execução de Contrato | Vigência + 5 anos | AWS, Brevo (Email), Supabase |
| **Senha (Hash)** | Segurança de Acesso | V. Execução de Contrato | Vigência + 5 anos | AWS (DB) |
| **Log de Acesso (IP)** | Segurança e Auditoria | II. Obrigação Legal (Marco Civil) | 6 meses | AWS, Vercel |
| **Dados do Scanner** | Análise de Risco de IA | IX. Legítimo Interesse (Segurança) | Sob demanda | Azure OpenAI (Se processado) |
| **Newsletter** | Marketing | I. Consentimento (Opt-in) | Até revogação | Brevo |

---

## 2. Bases Legais e Direitos dos Titulares

### 2.1 Gestão de Consentimento
- **Cookies:** Implementado banner de *Cookie Consent* granular (Essenciais vs Opcionais). Consentimento salvo em LocalStorage.
- **Marketing:** Checkbox de opt-in explícito no cadastro (Planejado).
- **Termos de Uso:** Aceite obrigatório no cadastro (`/register`).

### 2.2 Exercício de Direitos (Art. 18)
Canais disponíveis para o titular:
1.  **Dashboard:** O usuário pode editar seu perfil (`/dashboard/settings`).
2.  **Canal DPO:** Email disponível em `/policies/dpo`.
3.  **Portabilidade:** Exportação de dados (Relatórios PDF/CSV) disponível.
4.  **Eliminação:** Funcionalidade de "Deletar Conta" (Exige solicitação manual por segurança, por enquanto).

---

## 3. Conformidade com ISO/IEC 42001 (AI Management System)

### 3.1 Política de IA (A.2)
- O Sistema implementa guardrails técnicos (`AnalysisEngine`) para prevenir uso indevido.
- A Plataforma audita todas as interações de risco (`AuditLog`).

### 3.2 Avaliação de Impacto (AIA)
- O módulo `/dashboard/assessments` permite que clientes realizem suas próprias avaliações de impacto algorítmico, usando o template ISO 42001.

### 3.3 Transparência (A.7.3)
- O sistema informa claramente quando o usuário está interagindo com IA (Scanner, Chatbot).
- As limitações da IA são descritas nos Termos de Uso.

---
*Relatório gerado automaticamente pelo Agente de Auditoria Antigravity.*
