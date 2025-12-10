# 🤖 INSTRUÇÕES PARA ANTIGRAVITY AGENT
## Como Usar Este Manual de Conformidade LGPD

**Documento:** LGPD-Manual-Operacional.md  
**Versão:** 2.0  
**Data:** Dezembro 2025  

---

## 🎯 MODO DE USO

### Fase 1: ANTES de Implementar Qualquer Recurso

**Pergunta Gatilho:**
> Este novo recurso/funcionalidade coleta dados pessoais de usuários?

**SE SIM → Execute o Checklist:**

```
1. IDENTIFICAÇÃO DO DADO
   └─ Ir para: Seção "Backend - Segurança de Dados" → "1. Autenticação e Autorização"
   └─ Documentar: Qual é o dado? (nome, email, CPF, etc)
   └─ Validar: É direto ou indireto?

2. FINALIDADE
   └─ Pergunta: Por que precisamos deste dado?
   └─ Regra: Deve ser específico (não genérico)
   └─ Exemplo: ✅ "Nome para identificar em documentos"
   └─ Exemplo: ❌ "Nome para melhorar serviços"

3. BASE LEGAL
   └─ Ir para: Seção "GERENCIAMENTO DE CONSENTIMENTO"
   └─ Escolher: Consentimento? Contrato? Obrigação legal?
   └─ Validar: Está no código?

4. PROTEÇÃO
   └─ Ir para: Seção "Backend - Segurança de Dados"
   └─ Copiar: Código de criptografia relevante
   └─ Implementar: Em repouso + em trânsito

5. CONFORMIDADE FRONTEND
   └─ Ir para: Seção "Frontend - Coleta Consciente"
   └─ Copiar: Código de formulário
   └─ Adicionar: Labels + Finalidade + Link para Política

6. DIREITOS DO TITULAR
   └─ Garantir: Deletar, Acessar, Exportar disponível
   └─ Validar: Contra Seção "Processamento de Direitos"

7. DOCUMENTAÇÃO
   └─ Ir para: Seção "Gestão de Terceiros"
   └─ Adicionar: Linha em ROPA
   └─ Revisar: Contra Checklist de Certificação
```

**SE NÃO → Prossiga normalmente**

---

### Fase 2: DURANTE Implementação

**Para cada NOVO ENDPOINT que trata dados:**

```
1. Backend:
   └─ Copie o padrão de código da seção correspondente
   └─ Cole no seu projeto
   └─ Adapte: User IDs, nomes de tabelas, etc
   
2. Frontend:
   └─ Se é formulário: Use código da seção "Frontend - Coleta"
   └─ Se é listagem: Garanta que dados sensíveis são mascarados
   └─ Se é export: Use código de portabilidade
   
3. Teste:
   └─ Execute operações (criar, ler, atualizar, deletar)
   └─ Valide logs de auditoria foram gerados
   └─ Teste exclusão de dados (cascata)
   └─ Teste revogação de consentimento
```

---

### Fase 3: ANTES de Deploy

**Execute Checklist de Certificação:**

```bash
# Copie este checklist e valide item por item:

# 🔐 BACKEND
✓ Todas as senhas com bcrypt (custo 12+)
✓ Dados sensíveis criptografados em repouso (AES-256)
✓ Conexão com BD usa TLS
✓ Prepared statements em ALL queries
✓ Autorização verificada em CADA endpoint
✓ Logs de auditoria implementados
✓ Backup criptografado diário testado
✓ Sem credenciais no código

# 🎨 FRONTEND
✓ Consentimento explícito implementado
✓ Checkbox de consentimento desmarcado
✓ Cada campo tem label e finalidade
✓ Link para Política de Privacidade visível
✓ Revogação de consentimento fácil
✓ Google Analytics SÓ após consentimento
✓ IP do Analytics anonimizado

# 📋 DOCUMENTAÇÃO
✓ ROPA preenchida para todos os dados
✓ RIPD para operações de risco alto
✓ DPAs assinados com operadores
✓ Política de Privacidade publicada
✓ Aviso de Cookies publicado

# ✅ DIREITOS DOS TITULARES
✓ Endpoint de Acesso de Dados implementado
✓ Endpoint de Exclusão implementado
✓ Endpoint de Portabilidade implementado
✓ Todos com resposta em 15 dias

# 🚨 INCIDENTES
✓ Sistema de detecção configurado
✓ Procedimento de notificação definido
✓ Contato da ANPD conhecido

# Status Final: [ ] Falta corrigir [ ] ✅ PRONTO PARA DEPLOY
```

---

## 📚 REFERÊNCIA RÁPIDA POR TIPO DE RECURSO

### 1. Adicionar Campo de Formulário

**Passo 1:** Qual é o tipo de dado?
- Email → Use padrão de email (não precisa encriptação em repouso, mas precisa de TLS)
- CPF → Use encriptação (seção Backend → Código de Encriptação)
- Foto → Use encriptação para foto identificadora
- Senha → Use bcrypt SEMPRE

**Passo 2:** Qual é a base legal?
- Necessário para conta → Contrato (Art. 7º, II)
- Marketing opcional → Consentimento (Art. 7º, I)

**Passo 3:** Copie o código
- Para formulário → Ir a "Frontend - Coleta Consciente"
- Para backend → Ir a "Backend - Segurança de Dados"

**Passo 4:** Teste
- Criar registro
- Verificar auditoria
- Testar acesso de outro usuário (deve ser negado)
- Testar exclusão

**Passo 5:** Documente
- Adicione linha em ROPA
- Se sensível: Descreva proteção em Política de Privacidade

---

### 2. Adicionar Integração com Terceiro (Google Analytics, Stripe, SendGrid, etc)

**ANTES de integrar:**

```
1. Esse terceiro acessa dados pessoais?
   ├─ SIM → Ir para "Gestão de Terceiros"
   ├─ NÃO → Prossiga normalmente
   
2. Existe DPA disponível?
   ├─ SIM → Faça download e assine
   ├─ NÃO → Contate fornecedor
   
3. Preencha Assessment de Conformidade:
   └─ Modelo em "Gestão de Terceiros - Avaliação"
   
4. Copie padrão de integração:
   └─ Para Google Analytics: "Frontend - Coleta → Google Analytics"
   └─ Para Stripe: Busque código de tokenização (NUNCA armazene CC)
   └─ Para SendGrid: Use template de consentimento
```

---

### 3. Implementar Direitos do Titular (SAR, Exclusão, Portabilidade)

**Copie os endpoints prontos:**

```
# Para Subject Access Request:
└─ Arquivo: LGPD-Manual-Operacional.md
└─ Seção: "Processamento de Direitos - SAR"
└─ Copie: Função completa `handleDataAccessRequest`

# Para Exclusão de Conta:
└─ Seção: "Processamento de Direitos - Deletion"
└─ Copie: Funções `handleAccountDeletion` + `permanentlyDeleteUser`

# Para Portabilidade:
└─ Seção: "Processamento de Direitos - Portability"
└─ Copie: Função `getDataPortability`
```

**Adapte:**
- User IDs
- Nomes de tabelas
- Campos específicos
- URLs de redirecionamento

**Teste:**
- Submeta SAR como usuário
- Verifique email dentro de 15 dias
- Baixe arquivo
- Valide conteúdo

---

### 4. Configurar Segurança (Encryption, Backup, Logs)

**Checklist de Segurança:**

```
CRIPTOGRAFIA:
└─ [ ] Gerar chave AES-256
└─ [ ] Armazene em ENV (nunca no código)
└─ [ ] Criptografe CPF, SSN, PII sensível
└─ [ ] Use IV único por registro
└─ [ ] Teste encrypt → decrypt

ACESSO À DATABASE:
└─ [ ] Configure TLS na connection string
└─ [ ] Teste conexão com certificado
└─ [ ] Configure connection pooling (máx 20 conexões)
└─ [ ] Teste timeout (10s)

LOGS DE AUDITORIA:
└─ [ ] Implemente middleware de auditoria
└─ [ ] Teste: Cada acesso é logado?
└─ [ ] Teste: Alterações capturam antes/depois?
└─ [ ] Configure retenção (6 meses)
└─ [ ] Teste: Logs são deletados após 6 meses?

BACKUP:
└─ [ ] Configure backup automático (diário)
└─ [ ] Criptografe backups
└─ [ ] Teste restauração (semanalmente)
└─ [ ] Valide: Backup restaurado é idêntico ao original?
```

---

## 🔍 MATRIZ DE DECISÃO - QUAL SEÇÃO DO MANUAL USAR?

```
Você precisa...                           → Vá para...
─────────────────────────────────────────────────────────
Coletar nome do usuário                   → Frontend → Coleta Consciente
Coletar CPF/SSN                          → Backend → Criptografia + Frontend
Coletar email                             → Frontend → Consentimento (Newsletter)
Autenticar usuário                        → Backend → Autenticação (bcrypt)
Conectar a banco de dados                 → Backend → Proteção de Conexão
Armazenar dados sensíveis                 → Backend → Criptografia em Repouso
Rastrear com Google Analytics             → Frontend → Google Analytics
Integrar com Stripe/Pagamento             → Gestão de Terceiros → DPA
Permitir usuário acessar seus dados       → Direitos do Titular → SAR
Permitir usuário deletar sua conta        → Direitos do Titular → Deletion
Permitir usuário exportar dados           → Direitos do Titular → Portability
Responder a incident de segurança         → Incidentes → Plano de Resposta
Treinar equipe sobre LGPD                 → Arquitetura → Princípio Fundamental
Preparar documentação                      → Gestão de Terceiros → DPA + ROPA
```

---

## ⚙️ INTEGRAÇÃO COM WORKFLOW DE DESENVOLVIMENTO

### Git Workflow com LGPD Checks

```bash
# Antes de fazer commit:
1. Pergunte: "Este código toca em dados pessoais?"
2. SE SIM: Execute pre-commit hook
3. Pre-commit hook valida:
   - Não há credenciais em hardcode
   - Senhas usam bcrypt
   - Dados sensíveis estão encriptados
   - Logs incluem auditoria
   - Endpoints têm autorização

# Exemplo de pre-commit hook (.git/hooks/pre-commit):
#!/bin/bash
echo "🔍 Validando conformidade LGPD..."

# Verificar se há hardcoded credentials
if grep -r "password = " --include="*.js" --include="*.py" --exclude-dir=node_modules .; then
  echo "❌ Credenciais hardcoded detectadas!"
  exit 1
fi

# Verificar se há SHA1 em senhas (deve ser bcrypt)
if grep -r "sha1\|md5" --include="*.js" .; then
  echo "❌ Hash fraco detectado! Use bcrypt."
  exit 1
fi

echo "✅ Pré-commit checks passaram"
exit 0
```

### Pull Request Template com LGPD

```markdown
## PR Template - LGPD Compliance

### Descrição
- [ ] Este PR coleta dados pessoais novos?
- [ ] Este PR integra com serviço de terceiros?
- [ ] Este PR modifica políticas de retenção de dados?

### Conformidade LGPD
- [ ] Verifiquei seção relevante do manual
- [ ] Copiei código-padrão fornecido
- [ ] Implementei criptografia (se necessário)
- [ ] Implementei auditoria (se necessário)
- [ ] Implementei direitos do titular
- [ ] Atualizei ROPA
- [ ] Atualizei Política de Privacidade (se necessário)

### Checklist de Segurança
- [ ] Sem credenciais em hardcode
- [ ] Senhas com bcrypt
- [ ] Dados sensíveis encriptados
- [ ] Autorização verificada
- [ ] Logs de auditoria implementados
- [ ] Testes de acesso negado funcionam

### Revisão de Conformidade
- [ ] Revisei contra Checklist de Certificação
- [ ] Nenhum gap de conformidade

### Aprovação
- [ ] Aprovado por DPO / Compliance (se coleta dados sensíveis)
```

---

## 🚀 EXEMPLO PRÁTICO: Adicionando "Telefone" ao Formulário

### Passo 1: Identificação
- Dado: Telefone
- Tipo: Pessoal sensível (pode ser usado para contato não autorizado)
- Base Legal: Consentimento (opcional) ou Contrato (se necessário para serviço)

### Passo 2: Decisão
- "Vamos coletar telefone para contato de suporte apenas"
- Base Legal: Contrato (Art. 7º, II)
- Necessário: SIM

### Passo 3: Frontend
Ir a "Frontend - Coleta Consciente → Formulários"
Copiar:
```jsx
<label htmlFor="phone">
  Telefone *
  <Tooltip content="Usaremos para contato de suporte. Retenção: Conforme política.">
    <InfoIcon />
  </Tooltip>
</label>
<input id="phone" name="phone" type="tel" required />
```

### Passo 4: Backend
Ir a "Backend - Criptografia"
Implementar:
```javascript
// Salvar
phone: encryptField(userData.phone)

// Recuperar
phone: decryptField(user.phone)
```

### Passo 5: Documentação (ROPA)

Adicionar linha:
```
DATA-004: Telefone
├─ Identificador? NÃO (indireto)
├─ Finalidade? Contato de suporte
├─ Base Legal? Contrato (Art. 7º, II)
├─ Necessário? SIM
├─ Sensível? SIM (pode expor identidade)
├─ Retenção? Enquanto cliente + 90 dias
├─ Armazenamento? AES-256 criptografado
├─ Acesso? Suporte + Admin
├─ Compartilhado? NÃO
├─ Exclusão? DELETE em cascata
└─ Status: ✓ LGPD-OK
```

### Passo 6: Teste
```bash
# Criar registro
POST /api/users
{ "name": "João", "phone": "11998765432" }

# Verificar se foi encriptado
SELECT phone FROM users WHERE id = '123'
# Resultado: "a1b2c3d4e5f6g7h8i9j0:xyz789..." ✓

# Acessar como usuário (deve descriptografar)
GET /api/users/123
# Retorna: { "phone": "11998765432" } ✓

# Acessar como outro usuário (deve ser negado)
GET /api/users/456/phone
# Retorna: 403 Forbidden ✓

# Deletar usuário
DELETE /api/users/123
# Verificar: dados foram deletados ✓

# Verificar auditoria
SELECT * FROM auditLogs WHERE user_id = '123'
# Deve conter: action=DELETE, timestamp, ip, etc ✓
```

### Passo 7: Política de Privacidade
Adicionar seção:
```markdown
## Dados de Contato

**Dados Coletados:** Número de telefone

**Finalidade:** Permitir suporte técnico para resolver problemas na plataforma

**Base Legal:** Execução de Contrato (Art. 7º, II, LGPD)

**Retenção:** Mantemos seu telefone enquanto a sua conta está ativa. Após 90 dias do cancelamento, excluímos completamente.

**Proteção:** Seu telefone é criptografado com AES-256 e acessível apenas pela equipe de suporte.

**Seus Direitos:** Você pode acessar, corrigir, ou solicitar exclusão do seu telefone a qualquer momento em Configurações de Privacidade.
```

### Passo 8: Checklist Final
```
✓ Código implementado com criptografia
✓ Autorização verificada
✓ Logs de auditoria inclusos
✓ Teste de acesso negado passou
✓ Teste de exclusão passou
✓ ROPA atualizada
✓ Política de Privacidade atualizada
✓ Sem credenciais em hardcode
✓ Pronto para deploy
```

---

## 🎓 TREINAMENTO - O QUE CADA PESSOA NA EQUIPE DEVE SABER

### Desenvolvedores Backend
- [ ] Seção "Backend - Segurança de Dados" (completo)
- [ ] Seção "Processamento de Direitos" (implementação)
- [ ] Checklist de Certificação (validação)

### Desenvolvedores Frontend
- [ ] Seção "Frontend - Coleta Consciente" (completo)
- [ ] Seção "Gerenciamento de Consentimento" (consentimento)
- [ ] Como testar formulários conformes

### DevOps/Infraestrutura
- [ ] Seção "Backend - Criptografia" (deploy)
- [ ] Seção "Backend - Backup Encriptado" (operação)
- [ ] Procedimento de resposta a incidentes

### Product/Designers
- [ ] Seção "Frontend - Coleta Consciente" (visual)
- [ ] Seção "Gerenciamento de Consentimento" (UX)
- [ ] Direitos do titular (features)

### Marketing/Operations
- [ ] Seção "Gerenciamento de Consentimento" (email)
- [ ] Seção "Google Analytics" (tracking)
- [ ] Como revogar consentimentos

### Compliance/DPO
- [ ] Documento completo (reference)
- [ ] Seção "Gestão de Terceiros" (contracts)
- [ ] Seção "Incidentes" (procedures)

---

## 🆘 Quando Escalar para DPO/Compliance

```
ESCALAR SE...

☐ Novo tipo de dado sensível será coletado
☐ Novos terceiros terão acesso a dados
☐ Mudança em período de retenção de dados
☐ Novo país onde dados serão processados
☐ Novo uso/finalidade de dados existentes
☐ Qualquer incidente de segurança suspeito
☐ Renovação anual de contratos/políticas
☐ Mudança em tecnologia de armazenamento
☐ Qualquer requisição de titulares não coberta aqui
☐ Mudança na legislação brasileira
```

---

## 📞 Contatos Rápidos

**Dentro da Empresa:**
- DPO: [EMAIL]
- Compliance: [EMAIL]
- Segurança: [EMAIL]

**Externos:**
- ANPD Geral: www.gov.br/anpd
- ANPD Reclamações: reclamacao@anpd.gov.br
- ANPD Telefone: +55 (61) 2030-3600

---

**Versão:** 2.0  
**Próxima Revisão:** Junho 2026  
**Aprovado por:** [DPO Name]  
**Data de Aprovação:** Dezembro 2025  

