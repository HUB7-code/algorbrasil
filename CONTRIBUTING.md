# 🤝 Guia de Contribuição - ALGOR Brasil

Obrigado por contribuir com o ALGOR Brasil! Este guia ajudará você a manter o repositório limpo e otimizado.

## 🚫 Arquivos que NÃO devem ser commitados

Para manter o repositório limpo, otimizado e dentro do limite recomendado de armazenamento:

### ❌ NUNCA commitar:

#### Build Artifacts (Arquivos de Build)
- `frontend/.next/` - Arquivos de build do Next.js (gerados automaticamente)
- `frontend/build/` - Build de produção
- `frontend/out/` - Output de export estático
- `frontend/dist/` - Distribuição compilada
- `backend/build/` - Build do backend
- `**/__pycache__/` - Cache do Python

#### Dependências
- `node_modules/` - Dependências npm/yarn (sempre instalar localmente)
- `venv/` ou `env/` - Ambientes virtuais Python

#### Logs e Arquivos Temporários
- `*.log` - Todos os arquivos de log
- `build_log*.txt` - Logs de build
- `errors.txt` - Logs de erros
- `lint_log.txt`, `lint_output.txt` - Logs de linting
- `tsc_output.txt` - Output do TypeScript compiler
- `test_results.txt` - Resultados de testes
- `*.backup`, `*.backup2` - Arquivos de backup

#### Configurações Locais e Segredos
- `.env` - Variáveis de ambiente (use `.env.example` como template)
- `.env.local`, `.env*.local` - Configurações locais
- `*.pem`, `*.key` - Chaves privadas e certificados
- `*.db`, `*.sqlite3` - Bancos de dados locais (exceto schemas)

#### Arquivos do Sistema
- `.DS_Store` - Metadata do macOS
- `Thumbs.db`, `desktop.ini` - Metadata do Windows
- `.vscode/`, `.idea/` - Configurações de IDE

## ✅ Antes de Fazer Commit

### 1. Verificar o que será commitado
```bash
# Ver status e arquivos modificados
git status

# Ver diferenças
git diff

# Se encontrar arquivos de build ou logs, remova do staging:
git reset HEAD frontend/.next/
git reset HEAD frontend/build_log*.txt
```

### 2. Verificar o `.gitignore`
Certifique-se de que os arquivos ignorados estão corretamente listados:
- **Root `.gitignore`**: Regras globais do projeto
- **`frontend/.gitignore`**: Regras específicas do Next.js

### 3. Limpar arquivos não rastreados (opcional)
```bash
# Ver arquivos que serão removidos (dry-run)
git clean -n -d

# Remover arquivos não rastreados
git clean -f -d
```

## 🔧 Comandos Úteis para Limpeza

### Limpar builds do Frontend (Next.js)
```bash
cd frontend
rm -rf .next/ out/ build/
npm run build  # Reconstruir se necessário
cd ..
```

### Limpar node_modules e reinstalar
```bash
cd frontend
rm -rf node_modules/
npm install
cd ..
```

### Limpar cache do Python
```bash
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null
find . -type f -name "*.pyc" -delete
```

### Limpar logs e arquivos temporários
```bash
# Do diretório raiz do projeto
rm -f frontend/build_log*.txt
rm -f frontend/*.log
rm -f frontend/errors.txt
rm -f frontend/lint_*.txt
rm -f frontend/tsc_output.txt
```

## 📝 Boas Práticas de Commit

### Mensagens de Commit
Use mensagens claras e descritivas seguindo o padrão:
```
<tipo>: <descrição curta>

<corpo opcional com mais detalhes>
```

**Tipos comuns:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação, estilo
- `refactor:` - Refatoração de código
- `test:` - Adicionar ou modificar testes
- `chore:` - Manutenção, tarefas de build

**Exemplos:**
```bash
git commit -m "feat: Add ISO42001 compliance module"
git commit -m "fix: Resolve login authentication issue"
git commit -m "chore: Remove build files from repository"
```

### Commits Pequenos e Focados
- Faça commits pequenos e frequentes
- Cada commit deve representar uma unidade lógica de mudança
- Evite misturar múltiplas funcionalidades em um único commit

## 🔒 Segurança

### Nunca commitar dados sensíveis:
- Senhas, tokens, API keys
- Certificados e chaves privadas
- Dados pessoais de usuários
- Credenciais de banco de dados

### Se você acidentalmente commitou dados sensíveis:
1. **NÃO** simplesmente delete o arquivo e faça novo commit
2. Use `git filter-branch` ou ferramentas como `BFG Repo Cleaner`
3. Notifique a equipe imediatamente
4. Revogue/rotacione as credenciais expostas

## 🏗️ Workflow de Desenvolvimento

### 1. Criar branch para feature/fix
```bash
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-fix
```

### 2. Fazer mudanças e testar
```bash
# Frontend
cd frontend
npm run lint
npm run build
npm run dev  # Testar localmente

# Backend
cd backend
python -m pytest
python main.py  # Testar localmente
```

### 3. Commit e Push
```bash
git add .
git status  # Verificar o que será commitado
git commit -m "feat: descrição da mudança"
git push origin feature/nome-da-feature
```

### 4. Criar Pull Request
- Descreva claramente as mudanças
- Referencie issues relacionadas
- Aguarde code review

## 📊 Monitorar Tamanho do Repositório

### Verificar tamanho atual
```bash
# Tamanho do diretório .git
du -sh .git/

# Tamanho total do repositório
du -sh .
```

### Encontrar arquivos grandes no histórico
```bash
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sed -n 's/^blob //p' | \
  sort --numeric-sort --key=2 | \
  tail -20
```

## 🆘 Problemas Comuns

### "Arquivo muito grande para GitHub"
- Limite: 100 MB por arquivo
- Solução: Use Git LFS para arquivos grandes ou remova-os

### "Repositório acima de 1 GB"
- Remova arquivos desnecessários do histórico
- Use `.gitignore` adequadamente
- Considere separar assets grandes em outro repositório

### "Arquivos aparecem em git status mesmo estando no .gitignore"
- Eles podem já estar rastreados pelo git
- Solução: `git rm --cached <arquivo>`

## 📚 Recursos Adicionais

- [Documentação Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Dúvidas?** Abra uma issue ou entre em contato com a equipe de desenvolvimento.
