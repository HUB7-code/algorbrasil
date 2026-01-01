import Link from 'next/link';
import { ArrowLeft, BookOpen, Download, Lock, Clock, FileText, Microscope } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Pesquisa & Intel | Instituto ALGOR',
    description: 'Whitepapers, estudos de caso e inteligência de mercado sobre Governança de IA do Instituto ALGOR.',
};

export default function InstituteResearchPage() {
    return (
        <div className="min-h-screen bg-[#050A10] text-white selection:bg-[#00FF94] selection:text-[#0A1A2F]">
            <Navbar />

            {/* Hero */}
            <header className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#8B5CF6]/10 to-transparent rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[length:50px_50px]" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/institute" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FF94] transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-mono uppercase tracking-widest">Voltar ao Instituto</span>
                    </Link>

                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full">
                        <Microscope className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-xs font-mono uppercase tracking-widest text-[#8B5CF6]">Laboratório de Pesquisa</span>
                    </div>

                    <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Pesquisa & <span className="text-[#8B5CF6]">Inteligência</span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                        Whitepapers originais, análises de mercado e estudos de caso que traduzem
                        normas globais para a realidade brasileira.
                    </p>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="max-w-4xl mx-auto px-6 pb-20">

                {/* Seção: Whitepapers */}
                <section className="mb-16">
                    <h2 className="font-orbitron text-2xl font-bold mb-8 flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-[#00FF94]" />
                        Whitepapers
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                title: 'Tropicalização da ISO/IEC 42001',
                                subtitle: 'Adaptando o Sistema de Gestão de IA para o contexto regulatório brasileiro',
                                pages: '45 páginas',
                                status: 'Em Breve',
                                locked: true,
                            },
                            {
                                title: 'Mapa de Riscos de IA por Setor',
                                subtitle: 'Análise setorial: Financeiro, Saúde, Varejo e Governo',
                                pages: '32 páginas',
                                status: 'Em Breve',
                                locked: true,
                            },
                            {
                                title: 'Framework de Avaliação de Viés Algorítmico',
                                subtitle: 'Metodologia prática para auditoria de fairness em modelos de ML',
                                pages: '28 páginas',
                                status: 'Q1 2026',
                                locked: true,
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-[#0A111A]/80 border border-white/10 rounded-xl p-6 hover:border-[#8B5CF6]/30 transition-all group relative overflow-hidden">
                                {item.locked && (
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                                            <Clock className="w-3 h-3" />
                                            {item.status}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-6 h-6 text-[#8B5CF6]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-1 group-hover:text-[#8B5CF6] transition-colors">{item.title}</h3>
                                        <p className="text-sm text-gray-400 mb-3">{item.subtitle}</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-gray-500">{item.pages}</span>
                                            {item.locked ? (
                                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Lock className="w-3 h-3" />
                                                    Acesso para Associados
                                                </span>
                                            ) : (
                                                <button className="flex items-center gap-1 text-xs text-[#00FF94] hover:underline">
                                                    <Download className="w-3 h-3" />
                                                    Download PDF
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Seção: Em Desenvolvimento */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-[#131B2A] to-[#0A111A] border border-white/10 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-6">
                            <Microscope className="w-8 h-8 text-[#8B5CF6]" />
                        </div>
                        <h3 className="font-orbitron text-xl font-bold mb-3">Biblioteca em Construção</h3>
                        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
                            Nossa equipe de pesquisa está finalizando os primeiros whitepapers.
                            Cadastre-se para ser notificado quando estiverem disponíveis.
                        </p>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white font-bold rounded-xl hover:bg-[#7C3AED] transition-all text-sm"
                        >
                            Receber Notificação
                        </Link>
                    </div>
                </section>

                {/* CTA Final */}
                <section>
                    <div className="bg-[#0A111A]/80 border border-[#00FF94]/20 rounded-2xl p-10 text-center">
                        <h3 className="font-orbitron text-2xl font-bold mb-4">Contribua com sua Pesquisa</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Tem expertise em governança de IA? Submeta sua proposta de paper para revisão do nosso comitê editorial.
                        </p>
                        <Link
                            href="/partners/apply"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-[#00FF94]/50 text-[#00FF94] font-bold rounded-xl hover:bg-[#00FF94]/10 transition-all"
                        >
                            Submeter Proposta
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
