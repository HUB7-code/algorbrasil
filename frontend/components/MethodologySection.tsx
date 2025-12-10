export default function MethodologySection() {
    return (
        <section className="py-24 relative overflow-hidden bg-white border-y border-[#E0E3E7]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">

                {/* Left Content */}
                <div className="md:w-1/2">
                    <span className="text-[#0B57D0] font-mono text-xs tracking-widest uppercase mb-2 block">/ Metodologia Proprietária</span>
                    <h2 className="font-serif text-4xl mb-6 text-[#1F1F1F]">Do Caos à Otimização.</h2>
                    <p className="text-[#444746] mb-8 leading-relaxed text-lg">
                        Não aplicamos checklists genéricos. Implementamos um sistema vivo de governança que evolui junto com seus modelos de IA, garantindo agilidade.
                    </p>

                    <div className="space-y-6">
                        {[
                            "Discovery & Diagnóstico de Shadow AI",
                            "Design de Frameworks Éticos",
                            "Implementação de Sensores de Risco",
                            "Operação e Monitoramento Contínuo"
                        ].map((step, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-default">
                                <div className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center text-xs font-bold font-mono text-[#0B57D0] group-hover:bg-[#0B57D0] group-hover:text-white transition-colors">
                                    0{i + 1}
                                </div>
                                <span className="text-[#1F1F1F] font-medium transition-colors text-base">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Visual - Abstract System Status (Material Style) */}
                <div className="md:w-1/2 relative w-full flex justify-center">
                    {/* Visual Abstraction - Material Card */}
                    <div className="surface-card p-8 rounded-[32px] relative z-20 w-full max-w-md shadow-lg border-0 bg-white">
                        <div className="flex justify-between items-center mb-8 border-b border-[#F0F4F9] pb-4">
                            <span className="font-mono text-xs text-[#444746] font-bold">STATUS DO SISTEMA</span>
                            <span className="flex items-center gap-2 text-[#146C2E] text-xs font-bold uppercase bg-[#C4EED0] px-3 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-[#146C2E] animate-pulse"></span>
                                Protegido
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between text-xs font-bold text-[#444746] mb-1">
                                <span>MATURITY SCORE</span>
                                <span className="text-[#0B57D0]">92/100</span>
                            </div>
                            <div className="h-3 bg-[#F0F4F9] rounded-full overflow-hidden">
                                <div className="h-full w-[92%] bg-[#0B57D0] rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="bg-[#F8FAFD] p-4 rounded-2xl border border-[#E0E3E7] text-center">
                                    <div className="text-3xl font-serif text-[#1F1F1F] mb-1 font-bold">24</div>
                                    <div className="text-[10px] text-[#444746] uppercase tracking-wide font-bold">Modelos Ativos</div>
                                </div>
                                <div className="bg-[#F8FAFD] p-4 rounded-2xl border border-[#E0E3E7] text-center">
                                    <div className="text-3xl font-serif text-[#1F1F1F] mb-1 font-bold">0</div>
                                    <div className="text-[10px] text-[#444746] uppercase tracking-wide font-bold">Incidentes</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements behind - Soft Blobs */}
                    <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#D3E3FD] rounded-full blur-2xl opacity-60 z-10"></div>
                    <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 bg-[#C4EED0] rounded-full blur-2xl opacity-60 z-10"></div>
                </div>

            </div>
        </section>
    );
}
