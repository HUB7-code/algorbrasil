
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
                        <div class="flex items-center gap-4 text-sm font-mono text-[#4F7EFF] bg-[#4F7EFF]/5 p-3 rounded-lg border border-[#4F7EFF]/20 w-fit">
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
                            <strong class="text-[#4F7EFF] block mb-2 text-lg">Objetivos da Aula</strong>
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
                            <strong class="text-[#4F7EFF] block mb-2 text-lg">Visão Geral</strong>
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
                        <div class="flex items-center gap-4 text-sm font-mono text-[#4F7EFF] bg-[#4F7EFF]/5 p-3 rounded-lg border border-[#4F7EFF]/20 w-fit mb-4">
                            <span>📅 23 de Abril, 2025</span>
                            <span>📚 AULA 02</span>
                        </div>
                        
                        <div class="bg-[#0A1A2F]/50 p-4 rounded-xl border border-white/5 mb-6">
                            <strong class="text-[#4F7EFF] block mb-2 text-lg">Objetivos da Aula</strong>
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
                videoUrl: 'https://www.youtube.com/embed/GDSOszhcIdI',
                duration: 60,
                description: `
                    <div class="space-y-8 text-gray-300 font-manrope">
                        
                        <div class="bg-[#0A1A2F]/50 p-6 rounded-xl border border-white/5">
                            <h3 class="text-[#4F7EFF] font-orbitron font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="p-1 rounded bg-[#4F7EFF]/10">🔐</span> Pontos-Chave
                            </h3>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <strong class="text-white block mb-1">✅ IA Explicável (XAI)</strong>
                                    <p class="text-sm opacity-80">Essencial para confiança e ética em setores críticos.</p>
                                </div>
                                <div>
                                    <strong class="text-white block mb-1">✅ Transparência (FMTI)</strong>
                                    <p class="text-sm opacity-80">Índices ajudam na escolha de modelos éticos.</p>
                                </div>
                                <div>
                                    <strong class="text-white block mb-1">✅ Detecção de Deepfakes</strong>
                                    <p class="text-sm opacity-80">Proteção contra fraudes digitais hiper-realistas.</p>
                                </div>
                                <div>
                                    <strong class="text-white block mb-1">✅ Envenenamento de Dados</strong>
                                    <p class="text-sm opacity-80">Técnicas como Glaze protegem obras autorais.</p>
                                </div>
                                <div>
                                    <strong class="text-white block mb-1">✅ Vigilância</strong>
                                    <p class="text-sm opacity-80">Preocupações sobre privacidade e repressão.</p>
                                </div>
                                <div>
                                    <strong class="text-white block mb-1">✅ Viés Algorítmico</strong>
                                    <p class="text-sm opacity-80">Ferramentas para corrigir discriminação de gênero/raça.</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-white font-orbitron border-b border-white/10 pb-2">⚠️ Tendências Preocupantes</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                                <li><strong>IA Póstuma:</strong> Recriação digital de pessoas falecidas.</li>
                                <li><strong>Biometria Comportamental:</strong> Monitoramento de padrões sutis.</li>
                                <li><strong>AIO (Otimização de Respostas):</strong> Manipulação ideológica ou comercial.</li>
                            </ul>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-white font-orbitron border-b border-white/10 pb-2">👶 IA para Crianças</h3>
                            <p>Iniciativas como <strong>MIT CoCo</strong> buscam garantir uso seguro no desenvolvimento infantil.</p>
                        </div>

                        <div class="bg-indigo-900/20 p-5 rounded-xl border border-indigo-500/30">
                            <strong class="block text-indigo-400 mb-2 font-orbitron">📌 Conclusão</strong>
                            <p>A segurança da IA exige governança, ética e responsabilidade. Profissionais precisam atuar de forma crítica diante desses desafios.</p>
                        </div>

                        <div class="text-sm text-gray-500 italic border-l-2 border-[#4F7EFF] pl-4 py-1">
                            📅 <strong>Próxima aula:</strong> Planejamento com base na ISO/IEC 42001 e aplicação da IA na área de energia até 2030.
                        </div>

                        <div class="flex flex-wrap gap-2 text-xs font-mono text-[#4F7EFF]">
                            <span>#AlgorDigital</span>
                            <span>#IA2030</span>
                            <span>#GovernançaIA</span>
                            <span>#ÉticaDigital</span>
                        </div>
                    </div>
                `,
                materials: [
                    {
                        id: 'mat_paper_transparencia',
                        title: 'PAPER - Índice de Transparência',
                        type: 'pdf',
                        downloadUrl: '/materials/Paper - Indice de Transparencia.pdf'
                    },
                    {
                        id: 'mat_aula_2.2',
                        title: 'SLIDES - Segurança, Ética e Sociedade',
                        type: 'pdf',
                        downloadUrl: '/materials/AULA 2.2_SEGURANÇA. ÉTICA E SOCIEDADE - IA 2030.pdf'
                    },
                    {
                        id: 'mat_tech_trends_2025_ref',
                        title: 'RELATÓRIO - 2025 Tech Trends Report',
                        type: 'pdf',
                        downloadUrl: '/materials/INTELIGENCIA ARTIFICIAL - 2025 TECH TRENDS REPORT.pdf'
                    }
                ]
            },
            {
                id: 'auto_avaliacao_02',
                title: 'Testes de Auto Avaliação - Etapa 02',
                duration: 15,
                quiz: [
                    {
                        id: 'q1',
                        question: 'Qual é o ponto de partida essencial para o sucesso de uma iniciativa de IA em uma organização?',
                        options: [
                            'Adoção de ferramentas de mercado',
                            'Contratação de especialistas externos',
                            'Investimento em infraestrutura de dados',
                            'Apoio genuíno e contínuo da liderança',
                            'Aquisição de modelos prontos de IA'
                        ],
                        correctAnswer: 3
                    },
                    {
                        id: 'q2',
                        question: 'Segundo o manual, qual ação fortalece a confiança dos colaboradores na Governança de IA?',
                        options: [
                            'Redução do número de reuniões técnicas',
                            'Substituição do RH por bots de atendimento',
                            'Inclusão da IA apenas no planejamento estratégico',
                            'Comunicação clara e constante da liderança sobre a importância da IA',
                            'Centralização total da decisão em TI'
                        ],
                        correctAnswer: 3
                    },
                    {
                        id: 'q3',
                        question: 'O que é essencial na criação de uma Política de IA dentro da organização?',
                        options: [
                            'Guardar o documento apenas no setor jurídico',
                            'Utilizar linguagem exclusivamente técnica',
                            'Garantir que ela seja prática, acessível e alinhada aos valores da organização',
                            'Limitar seu uso apenas à equipe de tecnologia',
                            'Publicá-la apenas para investidores'
                        ],
                        correctAnswer: 2
                    },
                    {
                        id: 'q4',
                        question: 'Qual dos seguintes princípios éticos NÃO é destacado no manual como fundamental na IA?',
                        options: [
                            'Supervisão humana significativa',
                            'Transparência e explicabilidade',
                            'Benefício social',
                            'Automação total sem intervenção humana',
                            'Privacidade e proteção de dados'
                        ],
                        correctAnswer: 3
                    },
                    {
                        id: 'q5',
                        question: 'De acordo com a ISO/IEC 42001 e o manual, o que deve ser feito com a Política de Governança de IA ao longo do tempo?',
                        options: [
                            'Usada uma única vez durante a implantação',
                            'Revisada apenas quando há mudança de diretoria',
                            'Mantida como documento confidencial',
                            'Atualizada continuamente com base em riscos e mudanças tecnológicas',
                            'Ignorada após o primeiro ciclo de auditoria'
                        ],
                        correctAnswer: 3
                    },
                    {
                        id: 'q6',
                        question: 'O que a IA Explicável (XAI) busca proporcionar?',
                        options: [
                            'Substituir totalmente médicos e analistas financeiros.',
                            'Garantir maior velocidade nas respostas da IA.',
                            'Tornar compreensível como a IA toma decisões.',
                            'Reduzir o custo do desenvolvimento de IA.',
                            'Aumentar o número de dados usados pela IA.'
                        ],
                        correctAnswer: 2
                    },
                    {
                        id: 'q7',
                        question: 'Qual é a principal função do Foundation Model Transparency Index (FMTI)?',
                        options: [
                            'Monitorar crimes digitais em tempo real.',
                            'Avaliar o nível de transparência dos modelos de IA.',
                            'Classificar modelos pela quantidade de dados usados.',
                            'Indicar a performance de IA em jogos.',
                            'Verificar se uma IA pode substituir humanos.'
                        ],
                        correctAnswer: 1
                    },
                    {
                        id: 'q8',
                        question: 'Para que serve o envenenamento de dados com ferramentas como Glaze?',
                        options: [
                            'Deixar os dados mais claros para IA.',
                            'Corrigir erros na base de dados usada por IA.',
                            'Proteger obras artísticas contra cópia por sistemas de IA.',
                            'Melhorar a performance da IA no reconhecimento facial.',
                            'Otimizar o uso de deepfakes em marketing.'
                        ],
                        correctAnswer: 2
                    }
                ]
            }
        ]
    }
];
