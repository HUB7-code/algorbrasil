export default function MethodologySection() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#0A1A2F]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">

                {/* Left Content */}
                <div className="md:w-1/2">
                    <span className="text-[#00A3FF] font-mono text-xs tracking-widest uppercase mb-2 block">/ Metodologia Proprietária</span>
                    <h2 className="font-serif text-4xl mb-6 text-white">Do Caos à Otimização Auditável.</h2>
                    <p className="text-gray-400 mb-8 font-light leading-relaxed text-lg">
                        Não aplicamos checklists genéricos. Implementamos um sistema vivo de governança que evolui junto com seus modelos de IA.
                    </p>

                    <div className="space-y-6">
                        {[
                            "Discovery & Diagnóstico de Shadow AI",
                            "Design de Frameworks Éticos",
                            "Implementação de Sensores de Risco",
                            "Operação e Monitoramento Contínuo"
                        ].map((step, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-default">
                                <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-[#00A3FF] group-hover:bg-[#00A3FF] group-hover:text-white transition-colors">
                                    0{i + 1}
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors text-sm md:text-base font-light">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Visual - Abstract System Status */}
                <div className="md:w-1/2 relative w-full">
                    {/* Visual Abstraction of Methodology - Glass Card Stack */}
                    <div className="glass-panel p-8 rounded-2xl relative z-20 max-w-md mx-auto aspect-square md:aspect-auto flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                            <span className="font-mono text-xs text-gray-500">STATUS DO SISTEMA</span>
                            <span className="flex items-center gap-2 text-[#00FF94] text-xs font-bold uppercase">
                                <span className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse"></span>
                                Protegido
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                                <span>MATURITY SCORE</span>
                                <span>92/100</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full w-[92%] bg-[#00FF94] shadow-[0_0_10px_#00FF94]"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <div className="bg-[#0A1A2F]/50 p-4 rounded border border-white/5 text-center">
                                    <div className="text-3xl font-serif text-white mb-1">24</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Modelos Ativos</div>
                                </div>
                                <div className="bg-[#0A1A2F]/50 p-4 rounded border border-white/5 text-center">
                                    <div className="text-3xl font-serif text-white mb-1">0</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Incidentes Críticos</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements behind */}
                    <div className="absolute top-4 -right-4 w-full h-full border border-white/5 rounded-2xl z-10 pointer-events-none hidden md:block"></div>
                    <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#00A3FF] opacity-10 blur-[80px] rounded-full z-0 pointer-events-none"></div>
                </div>

            </div>
        </section>
    );
}
