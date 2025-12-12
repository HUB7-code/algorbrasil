# ATUAÇÃO
Você é um Engenheiro de Software Sênior e Especialista em UX/UI, focado em desenvolvimento web moderno. Seu objetivo é desenvolver um módulo de front-end para o site da "ALGOR BRASIL", uma associação de governança de IA.

# CONTEXTO DO PROJETO
A ALGOR BRASIL é uma entidade sem fins lucrativos, mas sustentada por consultorias. O site deve transmitir autoridade técnica, modernidade e sofisticação. O design segue uma estética "Tech/Futurista Profissional", utilizando o efeito de Glassmorphism (vidro fosco).

# TAREFA
Desenvolver o módulo "Galeria de Associados". Este módulo deve exibir os consultores em um grid responsivo, permitindo filtrar por especialidade e visualizar detalhes em um modal, sem recarregar a página.

# REQUISITOS TÉCNICOS

1. ESTRUTURA DE DADOS (JSON)
Não hardcode o HTML dos cartões. Crie uma variável constante em JavaScript (array de objetos) contendo os dados dos consultores.
Campos necessários: `id`, `nome`, `foto` (placeholder), `cargo/especialidade`, `tags` (array de strings para filtros), `bio_curta` e `link_linkedin`.

2. FUNCIONALIDADES
- **Renderização Dinâmica:** O JS deve ler o array JSON e montar o HTML da galeria automaticamente.
- **Filtros:** Botões no topo da galeria (ex: Todos, Jurídico, Técnico, Ética). Ao clicar, filtrar os cartões visíveis com uma animação suave.
- **Modal de Detalhes:** Ao clicar no cartão de um consultor, abrir um MODAL (pop-up) centralizado com efeito de backdrop blur (fundo desfocado), mostrando a bio completa e botão de contato.

3. DESIGN E CSS (Glassmorphism)
- Utilize CSS moderno (Flexbox/Grid).
- **Estilo dos Cartões:** Fundo semi-transparente, borda sutil, sombra suave e efeito de "backdrop-filter: blur".
- **Hover:** Ao passar o mouse, o cartão deve ter uma leve elevação ou brilho.
- **Responsividade:** Deve funcionar perfeitamente em Mobile (1 coluna) e Desktop (3 ou 4 colunas).

# FORMATO DE SAÍDA
Por favor, forneça o código completo separado em 3 arquivos (ou blocos):
1. HTML (Estrutura semântica)
2. CSS (Estilização com Glassmorphism)
3. JS (Lógica de renderização, filtragem e modal)

# EXEMPLO DE DADOS (Para teste)
Use estes dados fictícios para popular a galeria inicialmente:
- "Ana Silva", Especialista em Viés Algorítmico, Tags: ["Ética", "Técnico"]
- "Dr. Roberto", Advogado Digital, Tags: ["Jurídico", "Compliance"]
- "Carla Mendes", Gestora de Projetos de IA, Tags: ["Gestão"]