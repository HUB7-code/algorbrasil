# Política de Segurança - ALGOR Brasil

## Versões Suportadas

| Versão | Suportada          | Notas |
| ------ | ------------------ | ----- |
| 17.x   | :white_check_mark: | Enterprise Ready |
| 16.x   | :white_check_mark: | Suporte estendido |
| < 16.0 | :x:                | Descontinuada |

## Reportando Vulnerabilidades

Se você descobrir uma vulnerabilidade de segurança no ALGOR Brasil, por favor:

1. **NÃO** abra uma issue pública no GitHub
2. Envie um email para: **security@algorbrasil.com.br**
3. Inclua:
   - Descrição detalhada da vulnerabilidade
   - Passos para reproduzir
   - Impacto potencial
   - Sugestões de correção (se houver)

### Tempo de Resposta

- **Confirmação de recebimento:** 48 horas
- **Avaliação inicial:** 7 dias
- **Correção (vulnerabilidades críticas):** 30 dias

## Práticas de Segurança

### Dados Sensíveis

Este projeto lida com dados de governança de IA e compliance. Seguimos:

- **Criptografia em trânsito:** HTTPS obrigatório (TLS 1.3)
- **Criptografia em repouso:** Dados sensíveis criptografados
- **LGPD Compliance:** Conformidade com a Lei Geral de Proteção de Dados
- **Multi-tenant Isolation:** Verificação de membership em todos os endpoints

### Autenticação

- JWT com expiração de 8 dias (backend `cryptography`)
- SECRET_KEY única por ambiente
- **Argon2** para hash de senhas (via `passlib[argon2]`)
- 2FA via TOTP (`pyotp`)

### Logging e Monitoramento (v17.0)

- Logs estruturados via módulo `logging` (não `print`)
- Níveis de severidade: INFO, WARNING, ERROR
- Console de frontend limpo (sem debug logs em produção)

### Infraestrutura (v17.0)

- **Dockerfile Multi-Stage:** Imagem de produção otimizada
- **Usuário não-root:** Container roda como `appuser` (UID 1001)
- **Rate Limiting:** Implementado via `slowapi`
- **Secure Headers:** Implementado via biblioteca `secure`

### Configuração de Ambiente

- Variáveis sensíveis via `.env` (nunca commitadas)
- Valores padrão apenas para desenvolvimento
- Alertas de segurança quando usando configurações inseguras

## Credential Management

### Never Commit Secrets
- **NEVER** commit API keys, client secrets, or passwords to the repository
- Use environment variables for all sensitive data
- Review the `.gitignore` file to ensure credential files are excluded

### If Credentials Are Accidentally Committed
1. **IMMEDIATELY** revoke/regenerate the exposed credentials
2. Contact the repository maintainers
3. The credentials MUST be rotated even if removed from Git (they exist in history)

### Recommended Practices
- Use `.env` files for local development (already in `.gitignore`)
- Use environment variables in production
- Use secret management services (AWS Secrets Manager, Azure Key Vault, etc.) for production
- Enable GitHub secret scanning alerts
- Review commits before pushing

## Auditorias Realizadas

| Data | Tipo | Resultado |
|------|------|-----------|
| 30/12/2025 | Deep Scan (Bandit + pip-audit) | ✅ Enterprise Ready |

Relatório completo disponível em: `SECURITY_AUDIT_REPORT.md`

## Escopo

Esta política cobre:

- Backend API (FastAPI/Python)
- Frontend (Next.js/React)
- Infraestrutura Docker
- Integrações de terceiros

## Reconhecimento

Agradecemos a todos que reportam vulnerabilidades de forma responsável. Contribuidores serão reconhecidos (com consentimento) em nossos release notes.

---

**Última atualização:** 30/12/2025 (v17.0.0)

