# Política de Segurança - ALGOR Brasil

## Versões Suportadas

| Versão | Suportada          |
| ------ | ------------------ |
| 16.x   | :white_check_mark: |
| < 16.0 | :x:                |

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

- **Criptografia em trânsito:** HTTPS obrigatório
- **Criptografia em repouso:** Dados sensíveis criptografados
- **LGPD Compliance:** Conformidade com a Lei Geral de Proteção de Dados

### Autenticação

- JWT com expiração de 8 dias
- SECRET_KEY única por ambiente
- Bcrypt para hash de senhas

### Configuração de Ambiente

- Variáveis sensíveis via `.env` (nunca commitadas)
- Valores padrão apenas para desenvolvimento
- Alertas de segurança quando usando configurações inseguras

## Escopo

Esta política cobre:

- Backend API (FastAPI/Python)
- Frontend (Next.js/React)
- Infraestrutura Docker
- Integrações de terceiros

## Reconhecimento

Agradecemos a todos que reportam vulnerabilidades de forma responsável. Contribuidores serão reconhecidos (com consentimento) em nossos release notes.

---

**Última atualização:** 29/12/2025
