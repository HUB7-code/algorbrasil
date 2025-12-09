"use client";

import { Radar, FileCode, Terminal, RefreshCw } from "lucide-react";

export default function MethodologySection() {
    const steps = [
        {
            id: 1,
            icon: <Radar className="w-8 h-8 md:w-10 md:h-10 text-brand-green" />,
            title: "DISCOVERY",
            desc: "Diagnóstico de Maturidade"
        },
        {
            id: 2,
            icon: <FileCode className="w-8 h-8 md:w-10 md:h-10 text-brand-green" />,
            title: "DESIGN",
            desc: "Frameworks & Políticas"
        },
        {
            id: 3,
            icon: <Terminal className="w-8 h-8 md:w-10 md:h-10 text-brand-green" />,
            title: "IMPLEMENTATION",
            desc: "Treinamento & Deploy"
        },
        {
            id: 4,
            icon: <RefreshCw className="w-8 h-8 md:w-10 md:h-10 text-brand-green" />,
            title: "OPERATION",
            desc: "Auditoria Contínua"
        }
    ];

    return (
        <section className="relative w-full py-24 bg-brand-navy border-t border-brand-green/10 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        A SALA DE MÁQUINAS
                    </h2>
                    <p className="font-mono text-brand-blue/60 text-sm tracking-wider uppercase">
                        Metodologia Algor v2.0 // Processo Validado
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Background) */}
                    <div className="hidden md:block absolute top-[45px] left-0 w-full h-[2px] bg-brand-blue/10"></div>

                    {/* Pulsing Line (Animated) */}
                    <div className="hidden md:block absolute top-[45px] left-0 w-full h-[2px] overflow-hidden">
                        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-brand-green to-transparent animate-slide-right filter drop-shadow-[0_0_8px_rgba(0,255,148,0.8)]"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative flex flex-col items-center text-center group">
                                {/* Hexagon / Circle Wrapper */}
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full bg-brand-navy border border-brand-blue/20 flex items-center justify-center relative z-10 group-hover:border-brand-green/50 transition-colors duration-500 glass-panel shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]">
                                        {step.icon}
                                    </div>

                                    {/* Pulse Effect behind Icon */}
                                    <div className="absolute inset-0 rounded-full bg-brand-green/10 animate-ping opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                                </div>

                                <h3 className="font-mono text-lg font-bold text-white mb-2 tracking-wide group-hover:text-brand-green transition-colors">
                                    0{step.id} // {step.title}
                                </h3>

                                <p className="font-mono text-xs text-brand-blue/60 max-w-[150px]">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Details */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent"></div>
        </section>
    );
}
