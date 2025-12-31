import Link from 'next/link';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Pareceres Técnicos | Instituto ALGOR',
    description: 'Pareceres técnicos do Instituto ALGOR sobre o Marco Legal da IA (PL 2338/2023) e normas internacionais.',
};

export default function InstitutoPolicyPage() {
    return (
        <div className="min-h-screen bg-[#050A10] text-white selection:bg-[#00FF94] selection:text-[#0A1A2F]">
            <Navbar />

            {/* Hero */}
            <header className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-b from-[#00A3FF]/10 to-transparent rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[length:50px_50px]" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/institute" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FF94] transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-mono uppercase tracking-widest">Voltar ao Instituto</span>
                    </Link>

                    <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Pareceres <span className="text-[#00A3FF]">Técnicos</span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                        Análises jurídicas e técnicas sobre o Marco Legal da IA no Brasil e frameworks internacionais
                        de governança algorítmica.
                    </p>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="max-w-4xl mx-auto px-6 pb-20">

                {/* Destaque: PL 2338 */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-[#0A1A2F] to-[#0A111A] border border-[#00FF94]/20 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#00FF94]/5 rounded-full blur-[60px]" />

                        <div className="flex items-start gap-4 mb-6 relative z-10">
                            <div className="w-14 h-14 rounded-xl bg-[#00FF94]/10 flex items-center justify-center flex-shrink-0">
                                <Scale className="w-7 h-7 text-[#00FF94]" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-mono text-[#00FF94] uppercase tracking-widest bg-[#00FF94]/10 px-2 py-1 rounded">Em Tramitação</span>
                                </div>
                                <h2 className="font-orbitron text-2xl font-bold">PL 2338/2023 - Marco Legal da IA</h2>
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                            O Projeto de Lei que estabelece princípios, direitos, deveres e instrumentos de governança para
                            o desenvolvimento e uso de sistemas de Inteligência Artificial no Brasil. O Instituto ALGOR
                            acompanha ativamente sua tramitação e contribui com análises técnicas.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 relative z-10">
                            <div className="bg-white/5 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#00FF94]" />
                                    Pontos Positivos
                                </h4>
                                <ul className="text-xs text-gray-400 space-y-1">
                                    <li>• Classificação de risco baseada no EU AI Act</li>
                                    <li>• Direito à explicação de decisões automatizadas</li>
                                    <li>• Criação de autoridade reguladora específica</li>
                                </ul>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                                    Pontos de Atenção
                                </h4>
                                <ul className="text-xs text-gray-400 space-y-1">
                                    <li>• Definições técnicas ainda amplas</li>
                                    <li>• Sandbox regulatório precisa de detalhamento</li>
                                    <li>• Fiscalização de IA generativa</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Lista de Pareceres */}
                <section className="mb-16">
                    <h2 className="font-orbitron text-2xl font-bold mb-8">Publicações Técnicas</h2>

                    <div className="space-y-4">
                        {[
                            {
                                title: 'Análise Comparativa: PL 2338 vs EU AI Act',
                                date: 'Dezembro 2025',
                                status: 'Em Preparação',
                                statusColor: '#F59E0B',
                            },
                            {
                                title: 'Guia de Implementação ISO/IEC 42001 para o Mercado Brasileiro',
                                date: 'Janeiro 2026',
                                status: 'Em Preparação',
                                statusColor: '#F59E0B',
                            },
                            {
                                title: 'Parecer: Impactos do PL 2338 para o Setor Financeiro',
                                date: 'Q1 2026',
                                status: 'Planejado',
                                statusColor: '#8B5CF6',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-[#0A111A]/80 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all group">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1 group-hover:text-[#00FF94] transition-colors">{item.title}</h3>
                                            <p className="text-xs text-gray-500">{item.date}</p>
                                        </div>
                                    </div>
                                    <span
                                        className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded"
                                        style={{ color: item.statusColor, backgroundColor: `${item.statusColor}20` }}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Newsletter */}
                <section>
                    <div className="bg-[#0A111A]/80 border border-[#00A3FF]/20 rounded-2xl p-10 text-center">
                        <h3 className="font-orbitron text-2xl font-bold mb-4">Receba Nossos Pareceres</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Inscreva-se para receber análises técnicas e atualizações sobre regulação de IA no Brasil.
                        </p>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A3FF] text-white font-bold rounded-xl hover:bg-[#0088DD] transition-all"
                        >
                            Criar Conta Gratuita
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
