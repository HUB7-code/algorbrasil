
import React from 'react';
import { BookOpen, Search, Monitor, GraduationCap, Users, Shield, Award, BarChart3, LineChart } from 'lucide-react';

const offerings = {
    trainings: {
        title: "Nossos Treinamentos",
        icon: GraduationCap,
        color: "text-brand-copper",
        items: [
            {
                title: "Palestra: Governança de IA e o PL 2338",
                description: "Sessão informativa sobre a relação entre governança e regulação brasileira.",
                icon: BookOpen
            },
            {
                title: "Workshop de 8 Horas",
                description: "Imersão prática para planejamento estratégico da adoção de IA.",
                icon: Users
            },
            {
                title: "Curso de Extensão (Pós-Graduação)",
                description: "Capacitação aprofundada na norma ISO/IEC 42001.",
                icon: Award
            },
            {
                title: "Certificação Advisor/Auditor",
                description: "Formação para se tornar consultor ou auditor certificado.",
                icon: Shield
            }
        ]
    },
    consultancy: {
        title: "Nossas Consultorias",
        icon: Search,
        color: "text-brand-blue",
        items: [
            {
                title: "Diagnóstico de IA",
                description: "Avaliação inicial de maturidade e necessidades.",
                icon: Search
            },
            {
                title: "Governança: Descoberta",
                description: "Identificação de riscos e definição de estratégias.",
                icon: LineChart
            },
            {
                title: "Governança: Gestão",
                description: "Suporte na implementação e gerenciamento contínuo.",
                icon: Shield
            },
            {
                title: "Cultura 'IA First'",
                description: "Desenvolvimento de mentalidade organizacional orientada a dados.",
                icon: Users
            }
        ]
    },
    saas: {
        title: "Nossos Sistemas SaaS",
        icon: Monitor,
        color: "text-brand-green",
        items: [
            {
                title: "AI GOV",
                description: "Gestão do ciclo de vida de projetos e Service Desk especializado.",
                icon: Monitor
            },
            {
                title: "AI KPI",
                description: "Monitoramento de indicadores do Sistema de Gestão de IA (SGIA).",
                icon: BarChart3
            }
        ]
    }
};

export default function OfferingsShowcase() {
    return (
        <section id="offerings" className="py-24 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
                        Governança <span className="text-brand-green">Sob Medida</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                        Do aprendizado à automação. Escolha como acelerar sua jornada de conformidade.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Treinamentos */}
                    <div className="group glass-panel p-8 rounded-2xl border border-white/5 hover:border-brand-copper/30 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-brand-copper/10 flex items-center justify-center text-brand-copper">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-serif text-white">Treinamentos</h3>
                        </div>
                        <div className="space-y-6">
                            {offerings.trainings.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-2 h-2 rounded-full bg-brand-copper mt-2" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1 group-hover:text-brand-copper transition-colors">{item.title}</h4>
                                        <p className="text-sm text-gray-400 font-light leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Consultorias */}
                    <div className="group glass-panel p-8 rounded-2xl border border-white/5 hover:border-brand-blue/30 transition-all duration-300 bg-[#0A1A2F]/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-serif text-white">Consultorias</h3>
                        </div>
                        <div className="space-y-6">
                            {offerings.consultancy.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-2 h-2 rounded-full bg-brand-blue mt-2" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1 group-hover:text-brand-blue transition-colors">{item.title}</h4>
                                        <p className="text-sm text-gray-400 font-light leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-xs text-brand-blue font-mono uppercase tracking-widest">
                                <Users className="w-4 h-4" />
                                Equipe Global: 250+ Membros
                            </div>
                        </div>
                    </div>

                    {/* SaaS */}
                    <div className="group glass-panel p-8 rounded-2xl border border-white/5 hover:border-brand-green/30 transition-all duration-300 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Monitor className="w-32 h-32 text-brand-green" />
                        </div>
                        
                        <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                                <Monitor className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-serif text-white">Sistemas SaaS</h3>
                        </div>
                        <div className="space-y-6 relative z-10">
                            {offerings.saas.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-2 h-2 rounded-full bg-brand-green mt-2 animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1 group-hover:text-brand-green transition-colors">{item.title}</h4>
                                        <p className="text-sm text-gray-400 font-light leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                            <div className="flex items-center gap-2 text-xs text-brand-green font-mono uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                                ALGOR Cloud Active
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
