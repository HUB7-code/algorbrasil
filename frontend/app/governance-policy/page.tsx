import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, ShieldCheck, Scale, Globe, Network, Download, CheckCircle, XCircle, AlertTriangle, FileText, Lock, User, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export const metadata = {
    title: 'Política de Governança de IA | Transparência Radical',
    description: 'Documentação detalhada sobre como a ALGOR utiliza IA, processa dados e garante conformidade com a LGPD e ISO 42001.',
    openGraph: {
        title: 'Transparência Radical: Nossa Governança de IA',
        description: 'Não é só discurso. Veja exatamente como auditamos nossos próprios algoritmos, quais dados coletamos e como protegemos você.',
        images: ['/og-governance.jpg'],
        type: 'article', // Article type for better reach as "content"
    },
};


export default function GovernancePolicyPage() {
    return (
        <div className="min-h-screen bg-[#0A1A2F] text-white selection:bg-[#00FF94] selection:text-[#0A1A2F]">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">

                {/* HERO SECTION - Camada 1: Executive Summary */}
                <section className="mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30 text-[#00FF94] text-xs font-mono uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
                        Status: Sistemas Operacionais & Conformes
                    </div>

                    <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Governança de IA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">
                            Transparente e Auditável
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Não é apenas sobre cumprir regras. É sobre definir o padrão.
                        Documentamos abaixo cada IA utilizada, cada dado coletado e como você mantém o controle.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        {/* Status Cards */}
                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                            <ShieldCheck className="w-5 h-5 text-[#00FF94]" />
                            <div className="text-left">
                                <p className="text-[10px] text-gray-500 uppercase font-bold">LGPD Compliance</p>
                                <p className="text-xs text-[#00FF94] font-bold">CONFORME</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                            <Globe className="w-5 h-5 text-[#00FF94]" />
                            <div className="text-left">
                                <p className="text-[10px] text-gray-500 uppercase font-bold">GDPR Readiness</p>
                                <p className="text-xs text-[#00FF94] font-bold">CONFORME</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                            <Clock className="w-5 h-5 text-[#FFB000]" />
                            <div className="text-left">
                                <p className="text-[10px] text-gray-500 uppercase font-bold">ISO 42001</p>
                                <p className="text-xs text-[#FFB000] font-bold">EM CERTIFICAÇÃO (Q2/2026)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CAMADA 2: Técnica - Sistemas de IA */}
                <section className="mb-20 relative">
                    <div className="absolute -left-10 top-0 w-1 h-full bg-gradient-to-b from-[#00FF94] to-transparent opacity-30 hidden md:block" />

                    <h2 className="font-orbitron text-2xl mb-8 flex items-center gap-3">
                        <Network className="w-6 h-6 text-[#00FF94]" />
                        Arquitetura de Sistemas de IA
                    </h2>

                    <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-[#00FF94]/30 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <span className="font-mono text-xs text-[#00FF94] border border-[#00FF94] px-2 py-1 rounded">LIVE SYSTEM</span>
                        </div>

                        <h3 className="text-xl font-bold mb-4">Scanner de Conformidade (Code Analysis)</h3>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-mono text-sm text-gray-500 uppercase mb-2">Tecnologia & Modelo</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex gap-2">
                                        <ArrowRight className="w-4 h-4 text-[#00FF94] mt-0.5" />
                                        <span><strong>Base:</strong> Análise Estática (AST) + Regex Heurístico</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <ArrowRight className="w-4 h-4 text-[#00FF94] mt-0.5" />
                                        <span><strong>Semântica:</strong> OpenAI GPT-4o (via Azure Brazil South)</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <ArrowRight className="w-4 h-4 text-[#00FF94] mt-0.5" />
                                        <span><strong>Infraestrutura:</strong> Processamento Efêmero (Stateless)</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-mono text-sm text-gray-500 uppercase mb-2">Privacidade de Dados</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex gap-2">
                                        <ShieldCheck className="w-4 h-4 text-[#00FF94] mt-0.5" />
                                        <span>Código <strong>NÃO</strong> é armazenado em disco</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <ShieldCheck className="w-4 h-4 text-[#00FF94] mt-0.5" />
                                        <span>Transmissão via HTTPS (TLS 1.3)</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <ShieldCheck className="w-4 h-4 text-[#00FF94] mt-0.5" />
                                        <span>Logs estritamente de metadados (sem payload)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                            <div className="text-xs text-gray-500 font-mono">
                                Hash da última build auditada: <span className="text-white">a1b2...c3d4</span>
                            </div>
                            <button className="text-xs text-[#00FF94] hover:underline flex items-center gap-1">
                                Ver Documentação OpenAPI <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* CAMADA 3: Jurídica - Bases Legais */}
                <section className="mb-20">
                    <h2 className="font-orbitron text-2xl mb-8 flex items-center gap-3">
                        <Scale className="w-6 h-6 text-[#00FF94]" />
                        Bases Legais & Transferência de Dados
                    </h2>

                    <div className="space-y-6">
                        {/* Accordion Item 1 */}
                        <div className="bg-[#131825] rounded-xl border border-white/5 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-4 text-[#00FF94]">1. Tratamento de Dados Pessoais (Art. 7º LGPD)</h3>
                                <div className="space-y-4 text-sm text-gray-300">
                                    <div>
                                        <strong className="block text-white mb-1">Dados de Cadastro:</strong>
                                        <p>Base Legal: <strong>Consentimento (I)</strong> + <strong>Execução de Contrato (V)</strong>.</p>
                                        <p className="text-gray-500 mt-1">Usados para autenticação, acesso ao dashboard e envio de relatórios solicitados.</p>
                                    </div>
                                    <div>
                                        <strong className="block text-white mb-1">Logs Técnicos e de Segurança:</strong>
                                        <p>Base Legal: <strong>Legítimo Interesse (IX)</strong> + <strong>Segurança (Art. 11)</strong>.</p>
                                        <p className="text-gray-500 mt-1">Retenção de IP e Timestamp por 6 meses conforme Marco Civil da Internet, exclusivamente para auditoria de segurança.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accordion Item 2 - Transferência Internacional */}
                        <div className="bg-[#131825] rounded-xl border border-white/5 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-4 text-[#00A3FF]">2. Transferência Internacional</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-400">
                                        <thead className="border-b border-white/10 text-xs uppercase font-mono text-gray-500">
                                            <tr>
                                                <th className="pb-3">Fornecedor</th>
                                                <th className="pb-3">Localização</th>
                                                <th className="pb-3">Finalidade</th>
                                                <th className="pb-3">Salvaguarda</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            <tr>
                                                <td className="py-3 text-white">Microsoft Azure</td>
                                                <td className="py-3">EUA / Brasil</td>
                                                <td className="py-3">Processamento AI</td>
                                                <td className="py-3 text-[#00FF94]">SCC (Cláusulas Padrão)</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 text-white">Vercel Inc.</td>
                                                <td className="py-3">Global (Edge)</td>
                                                <td className="py-3">Hospedagem Web</td>
                                                <td className="py-3 text-[#00FF94]">SCC + Privacy Shield</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CAMADA 4: Decisões Automatizadas (Art. 20 LGPD) */}
                <section className="mb-20">
                    <h2 className="font-orbitron text-2xl mb-8 flex items-center gap-3">
                        <Network className="w-6 h-6 text-[#00A3FF]" />
                        Decisões Automatizadas (Art. 20, LGPD)
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* YES - Automated */}
                        <div className="bg-[#131825] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#00FF94]" />
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#00FF94]" />
                                Scanner de Conformidade
                            </h3>

                            <div className="space-y-4 text-sm text-gray-300">
                                <div>
                                    <strong className="block text-white mb-1">O que é automatizado:</strong>
                                    <p>Classificação de riscos (Crítico, Alto, Médio, Baixo) através de algoritmos pré-definidos.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                    <strong className="block text-white mb-2 text-xs uppercase">Lógica de Processamento:</strong>
                                    <ol className="list-decimal list-inside space-y-1 text-gray-400">
                                        <li>Análise de regras técnicas (Regex/AST)</li>
                                        <li>Comparação com padrões ISO 42001</li>
                                        <li>Cálculo de Score de Risco (0-100)</li>
                                    </ol>
                                </div>
                                <div>
                                    <strong className="block text-white mb-1">Direito de Revisão:</strong>
                                    <p>Discorda da classificação? Solicite revisão humana por um Auditor Certificado (prazo: 5 dias úteis).</p>
                                </div>
                            </div>
                        </div>

                        {/* NO - Not Automated */}
                        <div className="bg-[#131825] border border-white/10 rounded-2xl p-8 relative overflow-hidden opacity-80">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gray-600" />
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <XCircle className="w-5 h-5 text-gray-400" />
                                Processos Manuais (Human-in-the-Loop)
                            </h3>

                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex gap-3">
                                    <User className="w-5 h-5 text-gray-500" />
                                    <span><strong>Contratação & Propostas:</strong> Sempre analisadas por consultores humanos.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="w-5 h-5 text-gray-500" />
                                    <span><strong>Certificação de Especialistas:</strong> Curadoria manual do conselho técnico.</span>
                                </li>
                                <li className="flex gap-3">
                                    <Network className="w-5 h-5 text-gray-500" />
                                    <span><strong>Suporte Crítico:</strong> Atendimento humano prioritário para incidentes.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* TIMELINE DE ATUALIZAÇÕES */}
                <section className="mb-20">
                    <h2 className="font-orbitron text-2xl mb-8 flex items-center gap-3">
                        <Clock className="w-6 h-6 text-gray-400" />
                        Timeline de Transparência
                    </h2>
                    <div className="border-l-2 border-white/10 ml-3 space-y-8">
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#00FF94] border-4 border-[#0A1A2F]" />
                            <p className="text-xs text-[#00FF94] font-mono mb-1">30/12/2025</p>
                            <h4 className="text-white font-bold">Scanner v2.1 (GPT-4o)</h4>
                            <p className="text-sm text-gray-500">Atualização do motor de análise semântica e expansão das regras ISO 42001.</p>
                        </div>
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-600 border-4 border-[#0A1A2F]" />
                            <p className="text-xs text-gray-500 font-mono mb-1">15/11/2025</p>
                            <h4 className="text-gray-300 font-bold">Atualização de Retenção</h4>
                            <p className="text-sm text-gray-500">Ajuste na política de retenção de logs para 6 meses conforme Marco Civil.</p>
                        </div>
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-600 border-4 border-[#0A1A2F]" />
                            <p className="text-xs text-gray-500 font-mono mb-1">01/10/2025</p>
                            <h4 className="text-gray-300 font-bold">Certificação ISO 27001</h4>
                            <p className="text-sm text-gray-500">Obtenção do selo de Segurança da Informação para infraestrutura cloud.</p>
                        </div>
                    </div>
                </section>

                {/* LGPD RIGHTS & DPO CONTACT */}
                <section className="bg-gradient-to-br from-[#131825] to-[#0A0E1A] p-8 rounded-2xl border border-white/10 text-center">
                    <h3 className="font-orbitron text-xl mb-4">Seus Direitos (Art. 18 LGPD)</h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Você tem controle total. Acesse, portabilize ou elimine seus dados a qualquer momento diretamente pelo Dashboard ou contatando nosso DPO.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-6 py-3 rounded-lg bg-[#00FF94]/10 border border-[#00FF94]/50 text-[#00FF94] font-bold hover:bg-[#00FF94]/20 transition-all flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Baixar Meus Dados (JSON)
                        </button>
                        <a href="mailto:dpo@algor.uk" className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            Falar com DPO (Paulo Carvalho)
                        </a>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
