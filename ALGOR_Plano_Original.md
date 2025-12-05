# 📋 Plano de Desenvolvimento do Site Institucional ALGOR Association Brasil

**Documento Final | Dezembro 2025**

---

## 📌 1. INTRODUÇÃO E CONTEXTO

### Objetivo do Projeto

Desenvolver um **site institucional** para a **ALGOR Association Brasil**, uma entidade focada em **Governança, Ética e Regulação da Inteligência Artificial (IA)**.

O projeto busca estabelecer diretrizes e promover a governança de IA, baseado em padrões como:
- **ISO/IEC 42001:2024** (Management of AI)
- **PL 2338/2023** (Lei Brasileira de Regulação de IA)
- **UE AI Act** (Regulação Europeia de IA)

### Propósito do Site

O site deve servir como a **principal plataforma de comunicação, apresentação da instituição e engajamento** com membros e interessados (membros, empresas e reguladores), com potencial de crescimento futuro.

**Proposta de Valor:**
- Informações essenciais sobre a ALGOR
- Ferramentas para avançar na maturidade da IA
- Engajamento com membros
- Conteúdo educacional e insights

### Pilares do Projeto

| Pilar | Descrição |
|-------|-----------|
| **Institucional** | Apresentar a missão, visão e atividades da ALGOR |
| **Comunicação** | Manter um canal ativo via Blog/Notícias e formulário de contato |
| **Engajamento** | Oferecer uma Área de Membros para retenção e valorização |
| **Escalabilidade** | Estrutura que permita a adição de novas seções e integrações |

---

## 🗺️ 2. MAPA DO SITE FINAL (PÁGINAS E CONTEÚDO)

### Estrutura de Navegação Principal

| Página | Subpáginas | Conteúdo Essencial |
|--------|------------|-------------------|
| **HOME** | — | **Proposta de Valor Principal:** Missão, Visão, Valores, Impacto, Antecipação regulatória, Governança de IA, Conformidade.<br><br>**CTAs Proeminentes:**<br>• Se associar/conhecer mais<br>• Destaques do Blog/Notícias e próximos eventos<br>• O Diagnóstico Rápido de Maturidade em IA<br>• Metodologia ALGOR ASSOCIATION (5 fases) |
| **SOBRE** | Missão e Valores | Nome completo: **Association for Algorithmization and Logic Governance Organization**<br><br>Missão: Promover o uso responsável e ético da IA, em conformidade com as regulamentações vigentes |
| | Governança | Estrutura organizacional, estatuto, conselho e comitês |
| | Equipe | Apresentação dos líderes e principais colaboradores |
| **O QUE FAZEMOS** | Soluções em Governança de IA | **Principais Serviços:**<br>1. **Diagnóstico de Maturidade** (identifica gaps e planos 5W2H)<br>2. **Plano de Adoção/Aceleração de IA** (estruturado pela ALGOR)<br>3. **Auditoria de IA** (5 estágios, ISO 42001, PL 2338) |
| | Projetos e Iniciativas | Apresentação dos projetos atuais e passados da associação |
| | Como se Associar | Tipos de membros, benefícios e processo de adesão |
| **BLOG / NOTÍCIAS** | Insights & Conteúdo / Artigos | Posts com filtros por Categoria e busca |
| | Eventos | Agenda de eventos, webinars e participações da ALGOR |
| **DOWNLOADS** | Área de Downloads | Materiais públicos: relatórios, guias, comunicados<br><br>**Tipos:**<br>• Públicos (lead magnets como Whitepapers PL 2338, Checklists)<br>• Restritos (conteúdo exclusivo membros) |
| **CONTATO** | Contato | Formulário de contato + dados (endereço, telefone, e-mail)<br><br>CTA: "Pitch de Descoberta (15 minutos)" |
| **ÁREA DE MEMBROS (Restrita)** | Login / ALGOR Connect | Sistema de autenticação seguro |
| | Meu Perfil | Edição de dados cadastrais e senha |
| | Downloads Exclusivos | **Conteúdo Exclusivo:**<br>1. Modelos de Documentação Obrigatória (Política de IA, Inventário)<br>2. Avaliação de Risco Algorítmico, Matriz RACI<br>3. Relatórios de Desempenho/Auditoria<br>4. Materiais de Capacitação/Treinamento |
| | Comunidade | (Fase 2) Fórum ou lista de membros para networking |

### Páginas Adicionais Sugeridas

| Página | Propósito |
|--------|----------|
| **Transparência** | Estatutos, relatórios anuais, prestação de contas (subpágina de "Sobre") |
| **Parceiros** | Lista de empresas, instituições e associações parceiras |

### 🔴 Páginas/Seções Faltando (Críticas)

#### **A) Regulação & Conformidade (Página Chave)**

**Por quê?** Uma página dedicada que explica como a ALGOR atua para garantir conformidade com exigências legais:
- LGPD (Lei Geral de Proteção de Dados)
- PL 2338/2023 (Lei Brasileira de IA)
- ISO/IEC 42001:2024 (Governança de IA)

**Impacto:** Reforça a relevância do trabalho de gestão de riscos e mitigação de viés.

#### **B) ALGOR AI GOV (Destaque do Produto Core)**

**Descrição:** Apresentação da plataforma SaaS para **Inventário Dinâmico e Monitoramento Ativo** de Governança, Risco e Compliance (GRC).

**Mensagem-chave:** Governança é um **processo contínuo**, não um projeto estático.

#### **C) Parceiros**

**Descrição:** Lista de empresas, instituições e outras associações parceiras (reforça credibilidade).

---

## ⚙️ 3. ESTRUTURAÇÃO DAS FUNCIONALIDADES (MVP E PRÓXIMAS FASES)

### Funcionalidades por Fase

| Funcionalidade | Descrição | Fase |
|----------------|-----------|------|
| **Formulário de Contato** | Captura de dados e mensagem, armazenamento em BD, notificação por e-mail | MVP |
| **Blog/Notícias** | Publicação de posts com categorias, tags e busca simples | MVP |
| **Painel Administrativo (CMS)** | Gerenciamento de conteúdo e visualização de submissões | MVP |
| **Área de Downloads (Pública)** | Upload e disponibilização de arquivos com organização por categoria | MVP |
| **Área de Membros (Login/Perfil)** | Registro, Login, Recuperação de Senha, Edição de Perfil | MVP |
| **Downloads Restritos** | Acesso exclusivo a arquivos para usuários logados | MVP |
| **Recuperação de Senha** | Envio de link/código por e-mail | MVP |
| **Integração com Pagamento** | Stripe/PagSeguro para cobrança de anuidade/mensalidade | Fase 2 |
| **Fórum/Comunidade** | Espaço de interação entre membros | Fase 2 |
| **Busca Avançada** | Busca em todo conteúdo (posts, downloads, páginas) | Fase 2 |
| **Gestão de Eventos** | Inscrição e gerenciamento de participantes | Fase 2 |
| **Rastreabilidade do Usuário (Auditoria)** | Logs detalhados de atividades (compliance com IA) | Fase 3 |
| **Integrações de Terceiros** | Conexão com XGOAL360, E-mail Marketing, etc | Fase 3 |
| **Área de Membros Completa (RH)** | Gestão de competências e responsabilidades | Fase 4 |

### Conclusão sobre o MVP

O MVP proposto é **viável e bem estruturado**, cobrindo:
- ✅ Necessidades institucionais
- ✅ Comunicação ativa
- ✅ Início do engajamento com membros

---

## 💾 4. ESTRUTURA DO BANCO DE DADOS (MySQL/PostgreSQL)

### Design Principles

O modelo é projetado para ser **simples, flexível e escalável**, suportando funcionalidades presentes e futuras.

### Tabelas Essenciais

#### **1. usuarios** (Gerenciamento de membros e admins)

```
usuarios
├── id (PK - UUID)
├── nome (VARCHAR 255)
├── email (VARCHAR 255) [UNIQUE]
├── senha_hash (VARCHAR 255)
├── tipo_usuario (ENUM: admin, membro, pendente)
├── tipo_membro (ENUM: fisica, juridica, premium)
├── empresa (VARCHAR 255)
├── cargo (VARCHAR 255)
├── telefone (VARCHAR 20)
├── data_cadastro (TIMESTAMP)
├── ativo (BOOLEAN)
└── [FKs futuras para planos e permissões]
```

**Propósito:** Armazenar dados de login, tipo de usuário e informações de perfil.

---

#### **2. posts** (Conteúdo do Blog/Notícias)

```
posts
├── id (PK - UUID)
├── titulo (VARCHAR 255)
├── slug (VARCHAR 255) [UNIQUE]
├── conteudo (TEXT)
├── resumo (TEXT)
├── autor_id (FK → usuarios)
├── categoria_id (FK → categorias)
├── publicado_em (TIMESTAMP)
├── status (ENUM: rascunho, publicado)
└── imagem_destaque (VARCHAR 255)
```

**Propósito:** Armazenar artigos, notícias e insights para o blog.

---

#### **3. categorias** (Categorização de conteúdo)

```
categorias
├── id (PK - UUID)
├── nome (VARCHAR 255)
├── slug (VARCHAR 255) [UNIQUE]
└── descricao (TEXT)
```

**Propósito:** Nomes de categorias (ex: "PL 2338", "ISO 42001", "IA Generativa", "Mercado").

---

#### **4. arquivos** (Downloads públicos e restritos)

```
arquivos
├── id (PK - UUID)
├── titulo (VARCHAR 255)
├── descricao (TEXT)
├── caminho_arquivo (VARCHAR 255)
├── categoria_id (FK → categorias)
├── tipo_acesso (ENUM: publico, restrito)
├── data_upload (TIMESTAMP)
└── tipo_arquivo (VARCHAR 50)
```

**Propósito:** Documentos (PDF, PPT, Checklists, Whitepapers) com controle de acesso.

---

#### **5. formularios_contato** (Submissões de contato)

```
formularios_contato
├── id (PK - UUID)
├── nome (VARCHAR 255)
├── email (VARCHAR 255)
├── empresa (VARCHAR 255)
├── telefone (VARCHAR 20)
├── mensagem (TEXT)
├── data_envio (TIMESTAMP)
└── lido (BOOLEAN)
```

**Propósito:** Armazenar submissões do formulário de contato.

---

#### **6. usuarios_arquivos** (Mapeamento N:N - Fase 2)

```
usuarios_arquivos
├── usuario_id (FK → usuarios)
├── arquivo_id (FK → arquivos)
├── data_download (TIMESTAMP)
└── [PK composto: usuario_id + arquivo_id]
```

**Propósito:** Controlar quais usuários têm acesso a quais arquivos restritos.

---

#### **7. logs_auditoria** (Rastreabilidade - Fase 2)

```
logs_auditoria
├── id (PK - UUID)
├── usuario_id (FK → usuarios)
├── acao (VARCHAR 255)
├── tabela_afetada (VARCHAR 100)
├── registro_id (VARCHAR 255)
├── ip (VARCHAR 45)
├── user_agent (TEXT)
└── data_hora (TIMESTAMP)
```

**Propósito:** Garantir rastreabilidade e responsabilização das operações (compliance).

---

### Relacionamentos Principais

| Relação | Tipo | Descrição |
|---------|------|-----------|
| **usuarios (1) : posts (N)** | 1:N | Um autor pode escrever muitos posts |
| **categorias (1) : posts (N)** | 1:N | Uma categoria pode ter muitos posts |
| **categorias (1) : arquivos (N)** | 1:N | Uma categoria pode ter muitos arquivos |
| **usuarios (1) : formularios_contato (N)** | 1:N | Um usuário pode enviar muitos contatos |
| **usuarios (N) : arquivos (N)** | N:N | Um usuário pode acessar muitos arquivos (Fase 2) |

---

### Considerações Arquiteturais (MVP)

#### ✅ **Simplicidade Garantida**

- ❌ **Sem tabelas N:N complexas** no MVP
- ❌ **Sem múltiplos autores** por post
- ✅ **Gestão simplificada** de permissões (coluna `tipo_usuario` na tabela `usuarios`)

#### 🚀 **Escalabilidade Futura**

- Tipos de membros começam como coluna simples (`tipo_membro`) na Fase 1
- Evoluem para tabela `planos_assinatura` na Fase 2
- Permissões RBAC adicionadas gradualmente

#### 🔐 **Compliance by Design**

- Logs de auditoria planejados desde o início
- Isolamento de dados por tipo de usuário
- Suporte para LGPD (acesso, portabilidade, exclusão)

---

## 📝 CONCLUSÃO

Este plano serve como um **ponto de partida sólido e estruturado** para a construção do Site Institucional ALGOR. A abordagem faseada garante:

✅ **MVP rápido** e focado (8-12 semanas)  
✅ **Arquitetura escalável** para crescimento futuro  
✅ **Compliance desde o dia 1** (LGPD, ISO, PL 2338)  
✅ **Foco na experiência do usuário** (navegação clara, CTAs efetivos)  

---

## 📊 RESUMO EXECUTIVO

| Aspecto | Descrição |
|---------|-----------|
| **MVP Timeline** | 8-12 semanas |
| **Páginas Principais** | 10 (Home, Sobre, O que Fazemos, Blog, Downloads, Contato, Área de Membros, Comunidade, etc) |
| **Funcionalidades MVP** | 7 (Formulário, Blog, CMS, Downloads públicos, Login, Downloads restritos, Recuperação de senha) |
| **Tabelas Banco de Dados** | 7 (com potencial para 9+ nas fases futuras) |
| **Foco Principal** | Comunicação + Engajamento |
| **Próximas Fases** | Pagamentos, Fórum, Auditoria, Integrações |

---

**Documento Final | Status: ✅ APROVADO**

**Versão:** 1.0  
**Data:** Dezembro 2025  
**Para:** Antigravity Agent + Dev Team