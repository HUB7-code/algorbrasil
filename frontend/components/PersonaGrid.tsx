
import React from 'react';
import { Briefcase, ShieldCheck, Cpu, Scale, ArrowRight, Activity, FileText, Server, Building2 } from 'lucide-react';

const personas = [
    {
        id: 'strategist',
        title: 'O Estrategista',
        role: 'C-Suite & Board',
        icon: Building2,
        color: 'text-brand-green',
        borderColor: 'group-hover:border-brand-green/50',
        BgGradient: 'group-hover:from-brand-green/5',
        description: 'Foco em ROI, Reputação e Estratégia de Negócios.',
        solutions: ['Dashboard Executivo', 'Análise de Impacto Econômico', 'Briefing de Riscos'],
        path: '/solutions/board'
    },
    {
        id: 'guardian',
        title: 'O Guardião',
        role: 'Risco & Compliance',
        icon: ShieldCheck,
        color: 'text-brand-amber',
        borderColor: 'group-hover:border-brand-amber/50',
        BgGradient: 'group-hover:from-brand-amber/5',
        description: 'Foco em ISO 42001, Controles e Auditoria.',
        solutions: ['Matriz de Risco', 'Framework de Controles', 'Manual do Auditor'],
        path: '/solutions/risk'
    },
    {
        id: 'builder',
        title: 'O Construtor',
        role: 'CTO & Tech Lead',
        icon: Cpu,
        color: 'text-brand-blue',
        borderColor: 'group-hover:border-brand-blue/50',
        BgGradient: 'group-hover:from-brand-blue/5',
        description: 'Foco em MLOps, Arquitetura e Performance.',
        solutions: ['Governança em CI/CD', 'Monitoramento de Drift', 'Blueprints Técnicos'],
        path: '/solutions/tech'
    },
    {
        id: 'protector',
        title: 'O Protetor',
        role: 'Jurídico & DPO',
        icon: Scale,
        color: 'text-purple-400',
        borderColor: 'group-hover:border-purple-400/50',
        BgGradient: 'group-hover:from-purple-400/5',
        description: 'Foco em LGPD, PL 2338 e Segurança Jurídica.',
        solutions: ['Compliance Regulatório', 'Modelos de Contrato', 'Diagnóstico Legal'],
        path: '/solutions/legal'
    }
];

export default function PersonaGrid() {
    return (
        <section className="relative w-full py-24 z-10">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                        Governança Sob Medida
                    </h2>
                    <p className="font-mono text-sm text-brand-blue/60 uppercase tracking-widest mb-2">
                        Auto-Segmentação Estratégica
                    </p>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A metodologia da ALGOR se adapta ao seu papel na organização.
                        Identifique seu perfil para acessar ferramentas e insights específicos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {personas.map((persona) => (
                        <div
                            key={persona.id}
                            className={`glass-panel group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${persona.borderColor}`}
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${persona.BgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${persona.color} group-hover:bg-white/10 transition-colors`}>
                                        <persona.icon className="w-8 h-8" />
                                    </div>
                                    <ArrowRight className={`w-5 h-5 text-gray-600 group-hover:text-white transition-colors -rotate-45 group-hover:rotate-0 duration-300`} />
                                </div>

                                {/* Content */}
                                <h3 className="font-serif text-xl text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {persona.title}
                                </h3>
                                <p className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-4">
                                    {persona.role}
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                                    {persona.description}
                                </p>

                                {/* Feature List */}
                                <ul className="space-y-3 mt-auto border-t border-white/5 pt-6">
                                    {persona.solutions.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                                            <div className={`w-1 h-1 rounded-full ${persona.color.replace('text-', 'bg-')}`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button (Hidden by default, visible on hover? No, card is clickable. Visual cue implies click) */}
                                <div className="mt-6 pt-2">
                                    <span className={`text-xs font-bold ${persona.color} flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}>
                                        Acessar Área <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
