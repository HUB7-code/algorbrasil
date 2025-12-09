import { BadgeCheck, Users, Cpu, ArrowRight } from "lucide-react";

export default function MembershipBenefits() {
    return (
        <section className="relative z-10 w-full py-24 px-4 border-t border-brand-blue/5 bg-brand-navy/50 backdrop-blur-sm">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                    A Vantagem <span className="text-brand-green">ALGOR</span>
                </h2>
                <p className="font-mono text-sm text-brand-blue/60 max-w-2xl mx-auto">
                    Muito mais que um software. Uma aliança estratégica para líderes que definem o futuro da Inteligência Artificial no Brasil.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1: Autoridade */}
                <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-500 border border-brand-blue/10">
                    <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
                        <BadgeCheck className="w-6 h-6 text-brand-green" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-4">
                        Selo de Governança
                    </h3>
                    <p className="font-sans text-brand-blue/70 leading-relaxed text-sm">
                        Diferencie-se no mercado. Membros recebem o selo ALGOR, sinalizando ao mercado conformidade com padrões éticos e técnicos rigorosos.
                    </p>
                </div>

                {/* Card 2: Inteligência Coletiva */}
                <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-500 border border-brand-blue/10">
                    <div className="w-12 h-12 rounded-lg bg-brand-amber/10 flex items-center justify-center mb-6 group-hover:bg-brand-amber/20 transition-colors">
                        <Users className="w-6 h-6 text-brand-amber" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-4">
                        Network de Alto Nível
                    </h3>
                    <p className="font-sans text-brand-blue/70 leading-relaxed text-sm">
                        Acesso exclusivo a grupos de trabalho com C-Levels e reguladores. Participe da definição dos rumos da IA no Brasil e antecipe tendências.
                    </p>
                </div>

                {/* Card 3: Tecnologia (SaaS) - Destaque Tecnológico */}
                <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-500 border border-brand-blue/10 hover:border-brand-blue/50 hover:shadow-[0_0_40px_rgba(0,163,255,0.15)] relative overflow-hidden">
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-6 group-hover:bg-brand-blue/20 transition-colors relative z-10">
                        <Cpu className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-4 relative z-10 flex items-center gap-2">
                        Acesso ao ALGOR OS
                        <span className="text-[10px] bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded font-mono border border-brand-blue/30">SAAS</span>
                    </h3>
                    <p className="font-sans text-brand-blue/70 leading-relaxed text-sm relative z-10 mb-6">
                        Uso irrestrito da nossa plataforma SaaS para diagnósticos ISO 42001, auditoria algorítmica e gestão de risco contínua.
                    </p>

                    <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-10px] group-hover:translate-x-0 transform">
                        Exclusivo para Membros <ArrowRight className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </section>
    );
}
