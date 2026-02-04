
export interface CourseMaterial {
    id: string;
    title: string;
    type: 'pdf' | 'xlsx' | 'doc';
    downloadUrl: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option (0-based)
}

export interface CourseLesson {
    id: string;
    title: string;
    videoUrl?: string; // Optional now
    duration: number; // minutes
    description?: string; // Optional now
    completed?: boolean;
    materials?: CourseMaterial[];
    quiz?: QuizQuestion[]; // New field for Quizzes
}

export interface CourseModule {
    id: string;
    title: string;
    lessons: CourseLesson[];
}

export const iso42001Content: CourseModule[] = [
    {
        id: 'mod_intro',
        title: 'Módulo 1: Introdução à Governança de IA',
        lessons: [
            {
                id: 'aula_magna',
                title: 'Aula Magna: Governança de IA',
                videoUrl: 'https://www.youtube.com/embed/WiVpqOKW6j0',
                duration: 120,
                description: `
                    <div class="space-y-6 text-gray-300 font-manrope">
                        <div class="flex items-center gap-4 text-sm font-mono text-[#00FF94] bg-[#00FF94]/5 p-3 rounded-lg border border-[#00FF94]/20 w-fit">
                            <span>📅 26 de Março, 2025</span>
                            <span>⏰ 19h às 21h</span>
                            <span>🎓 ALGOR ASSOCIATION</span>
                        </div>
                        <p>
                            <strong class="text-white block mb-2">🟢 Abertura Institucional – 1 ano de ALGOR</strong>
                            O evento foi aberto com a celebração do primeiro ano da ALGOR ASSOCIATION...
                        </p>
                         <p>
                            <strong class="text-white block mb-2">📚 Apresentação do Curso</strong>
                            O facilitador apresentou o objetivo da formação: capacitar auditores...
                        </p>
                    </div>
                `,
                materials: [
                    { id: 'm1', title: 'Slides Aula Magna.pdf', type: 'pdf', downloadUrl: '/materials/aula-magna.pdf' }
                ]
            }
        ]
    },
    {
        id: 'etapa_01',
        title: 'Etapa 01: Contexto da Organização (Cláusula 4)',
        lessons: [
            {
                id: '42001_context',
                title: '42.001 - Contextualização e Escopo',
                videoUrl: 'https://www.youtube.com/embed/i6gGSoumXP8',
                duration: 120,
                description: `
                    <div class="space-y-6 text-gray-300 font-manrope">
                        <div class="bg-[#0A1A2F]/50 p-4 rounded-xl border border-white/5 mb-6">
                            <strong class="text-[#00FF94] block mb-2 text-lg">Objetivos da Aula</strong>
                            <p>Nesta aula, abordaremos a Cláusula 4 da ISO/IEC 42001, fundamental para estabelecer as bases do Sistema de Gestão de IA, incluindo o entendimento do contexto organizacional e a definição do escopo.</p>
                        </div>
                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-white font-orbitron">1. Entendendo o Contexto da IA na Prática</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                                <li><strong>Diagnóstico Interno:</strong> Avaliação de cultura, capacidades e infraestrutura.</li>
                                <li><strong>Diagnóstico Externo:</strong> Análise de mercado, regulamentações e tendências tecnológicas.</li>
                            </ul>
                        </div>
                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-white font-orbitron">2. Expectativas das Partes Interessadas</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                                <li>Identificação das Partes Interessadas (Stakeholders).</li>
                                <li>Levantamento de Requisitos e Expectativas (Legais, contratuais, éticos).</li>
                                <li>Avaliação e Priorização de demandas.</li>
                                <li>Plano de Atendimento e Acompanhamento.</li>
                            </ul>
                        </div>
                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-white font-orbitron">3. Definição do Escopo de IA</h3>
                            <p>Delimitação das fronteiras do SGIA, considerando os produtos, serviços e departamentos envolvidos.</p>
                        </div>
                    </div>
                `,
                materials: [
                    {
                        id: 'mat_slide_1.1',
                        title: 'MATERIAL DE APOIO - Aula 1.1 Contexto ISO 42001',
                        type: 'pdf',
                        downloadUrl: '/materials/AULA 1.1_CONTEXTO_ISO_42001.pdf'
                    },
                    {
                        id: 'mat_manual_auditor',
                        title: 'LIVRO - Manual do Auditor de IA',
                        type: 'pdf',
                        downloadUrl: '/materials/Manual do Auditor de IA.pdf'
                    },
                    {
                        id: 'mat_checklist_contexto',
                        title: 'FERRAMENTA - Checklist Prático: Análise do Contexto',
                        type: 'xlsx',
                        downloadUrl: '/materials/PLANILHA - Checklist Prático – Análise do Contexto de IA.xlsx'
                    },
                    {
                        id: 'mat_gestao_contexto',
                        title: 'FERRAMENTA - Planilha de Gestão de Contexto',
                        type: 'xlsx',
                        downloadUrl: '/materials/PLANILHA - GESTÃO DE CONTEXTO.xlsx'
                    },
                    {
                        id: 'mat_escopo_model',
                        title: 'MODELO - Declaração de Escopo de IA',
                        type: 'doc',
                        downloadUrl: '/materials/ALGOR  - MODELO DE ESCOPO DE IA .docx'
                    }
                ]
            },
            {
                id: 'ia_2030_models',
                title: 'IA 2030 - Modelos, Técnicas e Pesquisa',
                videoUrl: '',
                duration: 50,
                description: `
                    <div class="space-y-6 text-gray-300 font-manrope">
                        <div class="bg-[#0A1A2F]/50 p-4 rounded-xl border border-white/5 mb-6">
                            <strong class="text-[#00FF94] block mb-2 text-lg">Visão Geral</strong>
                            <p>Esta aula explora as tendências tecnológicas que definirão a próxima década da Inteligência Artificial, fundamentada no relatório "2025 Tech Trends" e pesquisas de ponta.</p>
                        </div>
                        <div class="grid md:grid-cols-2 gap-8">
                            <div class="space-y-4">
                                <h3 class="text-xl font-bold text-white font-orbitron border-b border-white/10 pb-2">Evolução dos Modelos</h3>
                                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                                    <li>Expansão das modalidades de IA generativa</li>
                                    <li>Afinação (Fine-Tuning) e Personalização</li>
                                    <li>Aprendizagem de reforço automatizada</li>
                                    <li>Composição Evolutiva</li>
                                    <li>Mistura de especialistas (MoE)</li>
                                    <li>Autonomia dos Especialistas</li>
                                </ul>
                            </div>
                            <div class="space-y-4">
                                <h3 class="text-xl font-bold text-white font-orbitron border-b border-white/10 pb-2">Arquitetura e Escala</h3>
                                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                                    <li>LLMs como novos sistemas operacionais</li>
                                    <li>LLMs: A dicotomia entre Maiores/Caros vs Pequenos/Eficientes (SLMs)</li>
                                    <li>Modelos de cadeia de pensamento (Chain-of-Thought)</li>
                                    <li>Aterramento (Grounding) e Aumento de Contexto (RAG)</li>
                                </ul>
                            </div>
                        </div>
                         <div class="bg-indigo-900/10 p-5 rounded-xl border border-indigo-500/20 mt-4">
                            <h3 class="text-indigo-400 font-bold font-orbitron mb-3">Fronteiras da Inovação</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-300">
                                <li><strong>Superando a escassez de dados:</strong> O papel dos dados sintéticos.</li>
                                <li><strong>IA de código aberto:</strong> O impacto da democratização.</li>
                                <li><strong>Grandes Modelos de Ação (LAMs):</strong> De "pensar" para "fazer".</li>
                                <li><strong>Modelos de Ação Grande Pessoal:</strong> Assistentes que conhecem você.</li>
                            </ul>
                        </div>
                    </div>
                `,
                materials: [
                    {
                        id: 'pdf_aula_1.2',
                        title: 'MATERIAL DE APOIO - IA 2030: Modelos e Pesquisa',
                        type: 'pdf',
                        downloadUrl: '/materials/ALGOR - AULA 1.2_MODELOS_TÉCNICAS E PESQUISA_IA 2030.pdf'
                    },
                    {
                        id: 'pdf_tech_trends_2025',
                        title: 'RELATÓRIO - 2025 Tech Trends Report',
                        type: 'pdf',
                        downloadUrl: '/materials/INTELIGENCIA ARTIFICIAL - 2025 TECH TRENDS REPORT.pdf'
                    }
                ]
            },
            {
                id: 'auto_avaliacao_01',
                title: 'Testes de Auto Avaliação - Etapa 01',
                duration: 15,
                quiz: [
                    {
                        id: 'q1',
                        question: 'Qual das alternativas NÃO é um papel reconhecido em relação ao uso de IA dentro das organizações?',
                        options: [
                            'Desenvolvedor',
                            'Usuário final',
                            'Parceiro de dados',
                            'Sujeito de IA',
                            'Regulador externo'
                        ],
                        correctAnswer: 4
                    },
                    {
                        id: 'q2',
                        question: 'No diagnóstico interno proposto na aula, qual é um dos aspectos analisados?',
                        options: [
                            'Nível de concorrência global',
                            'Existência de metas SMART para IA',
                            'Clareza sobre objetivos com o uso de IA',
                            'Frequência de atualizações dos servidores',
                            'Compatibilidade com normas da ISO 9001'
                        ],
                        correctAnswer: 2
                    },
                    {
                        id: 'q3',
                        question: 'Qual das afirmações abaixo representa uma expectativa correta do sistema de gestão de IA, segundo a ISO 42001?',
                        options: [
                            'Automatizar todos os processos de uma organização, sem exceções',
                            'Eliminar qualquer tipo de supervisão humana nos sistemas de IA',
                            'Garantir valor com a IA, evitando riscos inesperados',
                            'Substituir a gestão de riscos tradicionais por IA autônoma',
                            'Centralizar todas as decisões em um único algoritmo'
                        ],
                        correctAnswer: 2
                    },
                    {
                        id: 'q4',
                        question: 'O que a ISO 42001 propõe como essencial ao observar o contexto de uso de IA em uma organização?',
                        options: [
                            'Contratação de especialistas externos como única forma de garantir segurança',
                            'Observação apenas do impacto financeiro da IA',
                            'Foco exclusivo na performance do algoritmo',
                            'Atenção a tudo que possa afetar o funcionamento do sistema de gestão de IA',
                            'Padronização global do software utilizado'
                        ],
                        correctAnswer: 3
                    },
                    {
                        id: 'q5',
                        question: 'O que caracteriza a técnica de Mistura de Especialistas (MoE) em modelos de Inteligência Artificial?',
                        options: [
                            'Um único modelo tenta resolver todas as tarefas usando raciocínio em cadeia.',
                            'Um modelo pré-treinado é ajustado com dados específicos de um setor.',
                            'Vários submodelos especializados resolvem tarefas específicas sob a coordenação de um roteador.',
                            'A IA decide sozinha se deve responder ou não a determinada entrada.',
                            'A IA é treinada apenas com dados sintéticos para tarefas complexas.'
                        ],
                        correctAnswer: 2
                    },
                    {
                        id: 'q6',
                        question: 'Qual é a principal vantagem dos Pequenos Modelos de Linguagem (SLMs) em relação aos grandes modelos como o GPT-4?',
                        options: [
                            'Eles são treinados apenas com dados sintéticos para maior segurança.',
                            'São mais poderosos que os modelos grandes em qualquer tarefa.',
                            'Oferecem alta performance com menor custo, podendo rodar localmente com mais privacidade.',
                            'Não requerem dados de treinamento, pois aprendem com interações humanas em tempo real.',
                            'Utilizam apenas processamento em nuvem, o que reduz o uso de dispositivos locais.'
                        ],
                        correctAnswer: 2
                    }
                ]
            }
        ]
    },
    {
        id: 'etapa_02',
        title: 'Etapa 02: Liderança e Segurança (Cláusula 5)',
        lessons: [
            {
                id: '42001_leadership',
                title: '42.001 - Liderança',
                videoUrl: 'https://www.youtube.com/embed/xY2S7nbRsxw',
                duration: 90,
                description: `
                    <div class="space-y-6 text-gray-300 font-manrope">
                        <div class="flex items-center gap-4 text-sm font-mono text-[#00FF94] bg-[#00FF94]/5 p-3 rounded-lg border border-[#00FF94]/20 w-fit mb-4">
                            <span>📅 23 de Abril, 2025</span>
                            <span>📚 AULA 02</span>
                        </div>
                        
                        <div class="bg-[#0A1A2F]/50 p-4 rounded-xl border border-white/5 mb-6">
                            <strong class="text-[#00FF94] block mb-2 text-lg">Objetivos da Aula</strong>
                            <p>Esta aula foca na Cláusula 5 da ISO/IEC 42001, detalhando o papel crucial da Alta Direção e a estrutura de governança necessária para o sucesso do SGIA.</p>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-white font-orbitron">Temas Abordados</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                                <li>Liderança e comprometimento</li>
                                <li>Contexto de Política de IA</li>
                                <li>Papéis, responsabilidades e autoridades</li>
                            </ul>
                        </div>
                    </div>
                `,
                materials: [
                    {
                        id: 'mat_lideranca_pdf',
                        title: 'MATERIAL DE APOIO - Liderança ISO 42001',
                        type: 'pdf',
                        downloadUrl: '/materials/ALGOR - AULA 2.1_LIDERANÇA_ISO 42001.pdf'
                    },
                    {
                        id: 'mat_modelo_politica',
                        title: 'MODELO - Política de IA',
                        type: 'doc',
                        downloadUrl: '/materials/ALGOR - MODELO DE POLITICA DE IA.docx'
                    },
                    {
                        id: 'mat_manual_gov',
                        title: 'LIVRO - Manual da Governança de IA',
                        type: 'pdf',
                        downloadUrl: '/materials/LIVRO - Manual da governança de IA.pdf'
                    }
                ]
            },
            {
                id: 'ia_2030_security',
                title: 'IA 2030 - Segurança, Ética e Sociedade',
                videoUrl: '', // A definir
                duration: 60,
                description: `
                    <div class="space-y-6 text-gray-300 font-manrope">
                         <div class="bg-[#0A1A2F]/50 p-4 rounded-xl border border-white/5 mb-6">
                            <strong class="text-[#00FF94] block mb-2 text-lg">Visão Geral</strong>
                            <p>Exploração dos desafios de confiança, riscos e impacto social da IA, baseada nas tendências para 2030.</p>
                        </div>
                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-white font-orbitron">Tópicos Abordados</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                                <li><strong>Trust Gap:</strong> A lacuna de confiança na IA.</li>
                                <li><strong>Riscos Emergentes:</strong> Alucinações, vazamento de dados e viés.</li>
                                <li><strong>Impacto Social:</strong> O futuro do trabalho e a interação humano-máquina.</li>
                            </ul>
                        </div>
                    </div>
                `,
                materials: []
            },
            {
                id: 'auto_avaliacao_02',
                title: 'Testes de Auto Avaliação - Etapa 02',
                duration: 15,
                quiz: [
                    {
                        id: 'q1',
                        question: 'Qual é o papel principal da Alta Direção segundo a Cláusula 5 da ISO 42001?',
                        options: [
                            'Desenvolver os algoritmos de IA pessoalmente.',
                            'Demonstrar liderança e comprometimento com o SGIA.',
                            'Realizar a manutenção dos servidores.',
                            'Monitorar as redes sociais da empresa.',
                            'Nenhuma das anteriores.'
                        ],
                        correctAnswer: 1
                    },
                    {
                        id: 'q2',
                        question: 'O que a Política de IA deve incluir obrigatoriamente?',
                        options: [
                            'A lista de todos os funcionários.',
                            'O orçamento de marketing.',
                            'Um comprometimento com a satisfação de requisitos aplicáveis e gestão de riscos.',
                            'A marca do computador usado pelo CEO.',
                            'Previsão de lucros para 2030.'
                        ],
                        correctAnswer: 2
                    },
                    {
                        id: 'q3',
                        question: 'Em relação à confiança na IA (Trust Gap), qual é um dos principais desafios mencionados?',
                        options: [
                            'A IA ser muito lenta.',
                            'A falta de eletricidade.',
                            'A opacidade dos modelos ("caixa preta") e alucinações.',
                            'O custo dos teclados.',
                            'O excesso de confiança cega dos usuários.'
                        ],
                        correctAnswer: 2
                    }
                ]
            }
        ]
    }
];
