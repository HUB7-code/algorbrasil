
import React from 'react';
import { Scan, DraftingCompass, Hammer, RefreshCw, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

const phases = [
    {
        id: '01',
        title: 'Discovery & Shadow AI',
        description: 'Mapeamento de riscos ocultos e vazamento de dados em IA não sancionada.',
        icon: Scan,
        color: 'text-brand-copper',
        bg: 'bg-brand-copper/10',
        border: 'border-brand-copper/20'
    },
    {
        id: '02',
        title: 'Clean Room Design',
        description: 'Arquitetura de ambiente seguro para cruzamento de dados sem PII.',
        icon: DraftingCompass,
        color: 'text-brand-blue',
        bg: 'bg-brand-blue/10',
        border: 'border-brand-blue/20'
    },
    {
        id: '03',
        title: 'Compliance-Led Growth',
        description: 'Ativação de campanhas usando IA que respeita Opt-in/Opt-out em tempo real.',
        icon: Hammer,
        color: 'text-brand-green',
        bg: 'bg-brand-green/10',
        border: 'border-brand-green/20'
    },
    {
        id: '04',
        title: 'Continuous Audit',
        description: 'Monitoramento 24/7 de alucinação e viés algorítmico.',
        icon: RefreshCw,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/20'
    }
];

export default function MethodologySection() {
    return (
        <section id="methodology" className="py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Column: Content */}
                    <div className="lg:w-1/2">
                        <span className="text-brand-blue font-mono text-xs tracking-[0.2em] uppercase mb-4 block">
                            / Sistema Operacional de Governança
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                            Do Caos à <span className="text-brand-green">Otimização Auditável</span>.
                        </h2>
                        <p className="text-gray-400 mb-12 font-light leading-relaxed text-lg border-l-2 border-brand-green/20 pl-6">
                            Não aplicamos checklists genéricos. Implementamos um sistema vivo de governança que evolui junto com seus modelos de IA, do diagnóstico à operação contínua.
                        </p>

                        <div className="space-y-4">
                            {phases.map((phase) => (
                                <div key={phase.id} className="group flex items-start gap-6 p-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all duration-300">
                                    <div className={`mt-1 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${phase.bg} ${phase.color} border ${phase.border}`}>
                                        <phase.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className={`font-mono text-xs font-bold opacity-60 ${phase.color}`}>{phase.id}</span>
                                            <h3 className="text-lg font-serif text-white">{phase.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                                            {phase.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Visual Abstraction */}
                    <div className="lg:w-1/2 w-full pt-12">
                        <div className="relative">
                            {/* Main Card - System Status */}
                            <div className="glass-panel p-8 rounded-[32px] relative z-20 w-full max-w-lg mx-auto transform transition-transform hover:scale-[1.02] duration-500">
                                {/* Card Header */}
                                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-5 h-5 text-brand-green animate-pulse" />
                                        <span className="font-mono text-xs text-brand-green font-bold tracking-widest">SYSTEM STATUS</span>
                                    </div>
                                    <span className="flex items-center gap-2 text-brand-green text-[10px] font-bold uppercase bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                                        On-line
                                    </span>
                                </div>

                                {/* Main Metric */}
                                <div className="mb-10 text-center relative">
                                    <div className="absolute inset-0 bg-brand-green/20 blur-[60px] rounded-full" />
                                    <div className="relative z-10">
                                        <span className="block text-6xl font-serif text-white font-bold mb-2">98.5%</span>
                                        <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Índice de Conformidade</span>
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#0A1A2F]/50 p-4 rounded-2xl border border-white/5 text-center">
                                        <div className="text-2xl font-serif text-white mb-1">24/7</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wide">Monitoramento</div>
                                    </div>
                                    <div className="bg-[#0A1A2F]/50 p-4 rounded-2xl border border-white/5 text-center">
                                        <div className="text-2xl font-serif text-white mb-1 flex items-center justify-center gap-2">
                                            <ShieldCheck className="w-5 h-5 text-brand-green" />
                                            ISO
                                        </div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wide">42001 Ready</div>
                                    </div>
                                </div>

                                {/* ISO Badge */}
                                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-gray-500 font-mono">
                                    <span>LAST AUDIT: DIRECT</span>
                                    <span className="text-brand-blue">v2.4.0-stable</span>
                                </div>
                            </div>

                            {/* Decorative Background Elements */}
                            <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] z-0 animate-pulse-slow"></div>
                            <div className="absolute bottom-[-40px] left-[-40px] w-64 h-64 bg-brand-green/10 rounded-full blur-[80px] z-0 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
