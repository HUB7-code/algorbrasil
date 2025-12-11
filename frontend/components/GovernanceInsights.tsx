import Link from "next/link";
import { ArrowUpRight, Scale, BookOpen, Lock } from "lucide-react";

export default function GovernanceInsights() {
    return (
        <section className="w-full py-24 relative">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="font-mono text-brand-green text-sm tracking-widest uppercase mb-4 block">
                            {"// Inteligência"}
                        </span>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white max-w-2xl">
                            Insights de Governança
                        </h2>
                    </div>
                    <Link href="/blog" className="text-brand-green font-mono text-sm hover:underline flex items-center gap-2">
                        VER TODOS OS ARTIGOS <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Insight 1 */}
                    <article className="glass-card rounded-2xl p-6 group cursor-pointer h-full flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 rounded-lg bg-brand-navy border border-white/10 text-brand-green">
                                <Scale className="w-6 h-6" />
                            </div>
                            <span className="font-mono text-xs text-brand-blue/60">PL 2338/23</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-brand-green transition-colors">
                            O Impacto do Marco Legal da IA nas Empresas Brasileiras
                        </h3>
                        <p className="font-sans text-sm text-brand-blue/60 mb-6 flex-grow">
                            Análise detalhada sobre a classificação de riscos e as novas exigências de transparência algorítmica.
                        </p>
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-xs font-mono text-brand-blue/80 gap-2">
                            <span>LEITURA: 5 MIN</span>
                        </div>
                    </article>

                    {/* Insight 2 */}
                    <article className="glass-card rounded-2xl p-6 group cursor-pointer h-full flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 rounded-lg bg-brand-navy border border-white/10 text-brand-blue">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <span className="font-mono text-xs text-brand-blue/60">ISO 42001</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors">
                            Guia de Implementação: Do Zero à Certificação
                        </h3>
                        <p className="font-sans text-sm text-brand-blue/60 mb-6 flex-grow">
                            Passo a passo para estruturar seu Sistema de Gestão de IA (SGIA) seguindo o novo padrão global.
                        </p>
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-xs font-mono text-brand-blue/80 gap-2">
                            <span>LEITURA: 12 MIN</span>
                        </div>
                    </article>

                    {/* Insight 3 */}
                    <article className="glass-card rounded-2xl p-6 group cursor-pointer h-full flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 rounded-lg bg-brand-navy border border-white/10 text-purple-400">
                                <Lock className="w-6 h-6" />
                            </div>
                            <span className="font-mono text-xs text-brand-blue/60">AUDITORIA</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                            Auditoria de Viés em Modelos de Crédito
                        </h3>
                        <p className="font-sans text-sm text-brand-blue/60 mb-6 flex-grow">
                            Estudo de caso sobre como identificar e mitigar discriminação algorítmica em fintechs.
                        </p>
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-xs font-mono text-brand-blue/80 gap-2">
                            <span>LEITURA: 8 MIN</span>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    );
}
