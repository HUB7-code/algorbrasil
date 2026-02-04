
export interface CourseMaterial {
    id: string;
    title: string;
    type: 'pdf' | 'xlsx' | 'doc';
    downloadUrl: string;
}

export interface CourseLesson {
    id: string;
    title: string;
    videoUrl: string; // YouTube Embed URL or similar
    duration: number; // minutes
    description: string; // HTML allowed
    completed?: boolean;
    materials?: CourseMaterial[];
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
                        id: 'mat_checklist_contexto',
                        title: 'Checklist Prático – Análise do Contexto de IA',
                        type: 'xlsx',
                        downloadUrl: '/materials/PLANILHA - Checklist Prático – Análise do Contexto de IA.xlsx'
                    },
                    {
                        id: 'mat_gestao_contexto',
                        title: 'Planilha de Gestão de Contexto',
                        type: 'xlsx',
                        downloadUrl: '/materials/PLANILHA - GESTÃO DE CONTEXTO.xlsx'
                    },
                    {
                        id: 'mat_escopo_model',
                        title: 'Modelo de Escopo - Sistema de Gestão de IA',
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
                videoUrl: '',
                duration: 30,
                description: '<p class="text-gray-400">Quiz de validação de conhecimento.</p>'
            }
        ]
    }
];
