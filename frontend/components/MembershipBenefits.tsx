import { ShieldCheck, Users, Zap, CheckCircle2 } from "lucide-react";

export default function MembershipBenefits() {
    return (
        <section className="w-full py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                        Por que se tornar um membro?
                    </h2>
                    <p className="font-sans text-brand-blue/60 text-lg max-w-2xl mx-auto">
                        Junte-se à elite da governança de IA no Brasil. ALGOR BRASIL oferece uma plataforma integrada de tecnologia, jurídico e estratégia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Benefit 1: Authority */}
                    <div className="glass-card p-10 rounded-3xl group">
                        <div className="w-16 h-16 bg-brand-navy border border-brand-green/30 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,255,148,0.1)] group-hover:scale-110 transition-transform duration-500">
                            <ShieldCheck className="w-8 h-8 text-brand-green" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white mb-4">
                            Autoridade & Selo
                        </h3>
                        <p className="font-sans text-brand-blue/70 leading-relaxed mb-6">
                            Receba o selo "Member ALGOR", sinalizando ao mercado que sua empresa segue os mais rigorosos padrões éticos e técnicos (ISO/IEC 42001).
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-sm text-white/80 gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-green" /> Reconhecimento de Mercado
                            </li>
                            <li className="flex items-center text-sm text-white/80 gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-green" /> Validação de Compliance
                            </li>
                        </ul>
                    </div>

                    {/* Benefit 2: Network */}
                    <div className="glass-card p-10 rounded-3xl group ">
                        <div className="w-16 h-16 bg-brand-navy border border-brand-blue/30 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,163,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                            <Users className="w-8 h-8 text-brand-blue" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white mb-4">
                            Rede de Elite
                        </h3>
                        <p className="font-sans text-brand-blue/70 leading-relaxed mb-6">
                            Acesso exclusivo a grupos de C-Level, DPOs e CTOs para troca de experiências sobre implementação de IA e desafios regulatórios.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-sm text-white/80 gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-blue" /> Mentoria Executiva
                            </li>
                            <li className="flex items-center text-sm text-white/80 gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-blue" /> Eventos Fechados
                            </li>
                        </ul>
                    </div>

                    {/* Benefit 3: SaaS Platform */}
                    <div className="glass-card p-10 rounded-3xl group relative overflow-hidden ring-1 ring-brand-green/20">
                        <div className="absolute top-0 right-0 p-3 bg-brand-green text-brand-navy font-bold text-[10px] tracking-widest uppercase">
                            Novo
                        </div>
                        <div className="w-16 h-16 bg-brand-navy border border-brand-green/30 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,255,148,0.2)] group-hover:bg-brand-green group-hover:text-brand-navy transition-colors duration-500">
                            <Zap className="w-8 h-8 text-brand-green group-hover:text-brand-navy transition-colors" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white mb-4">
                            Plataforma SaaS
                        </h3>
                        <p className="font-sans text-brand-blue/70 leading-relaxed mb-6">
                            Acesso ao nosso "Assessment Engine" para autodiagnóstico de maturidade e geração automática de planos de ação (Roadmap).
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-sm text-white/80 gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-green" /> Diagnóstico ISO 42001
                            </li>
                            <li className="flex items-center text-sm text-white/80 gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-green" /> Dashboard de Riscos
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
