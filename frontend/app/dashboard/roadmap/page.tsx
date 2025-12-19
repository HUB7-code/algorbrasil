"use client";

import { CheckCircle2, Circle, ArrowRight, Map } from "lucide-react";

export default function RoadmapPage() {
    return (
        <div className="p-8 w-full min-h-screen space-y-10 relative text-white font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2 tracking-tight">
                        Jornada de Adoção
                    </h1>
                    <p className="text-gray-300 font-light text-lg">
                        Seu plano de voo para a maturidade em IA.
                    </p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-[#00FF94] flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    STATUS: FASE 1 - INICIADA
                </div>
            </div>

            {/* Roadmap Steps - Vertical List Style (Cleaner) */}
            <div className="w-full max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

                {/* Step 1: Completed */}
                <StepCard
                    number="01"
                    title="Diagnóstico Inicial & Shadow AI"
                    description="Mapeamento de riscos ocultos e inventário preliminar de ativos de IA."
                    status="completed"
                />

                {/* Step 2: Active */}
                <StepCard
                    number="02"
                    title="Estruturação da Governança"
                    description="Definição de comitê de ética, políticas de uso e escolha de frameworks (ISO/NIST)."
                    status="active"
                />

                {/* Step 3: Locked */}
                <StepCard
                    number="03"
                    title="Implementação Técnica"
                    description="Deploy de Data Clean Rooms e auditoria contínua de modelos."
                    status="locked"
                />

                {/* Step 4: Locked */}
                <StepCard
                    number="04"
                    title="Certificação & Escala"
                    description="Auditoria final para selo ISO 42001 e expansão para toda a organização."
                    status="locked"
                />

            </div>
        </div>
    );
}

function StepCard({ number, title, description, status }: any) {
    const isCompleted = status === 'completed';
    const isActive = status === 'active';
    const isLocked = status === 'locked';

    return (
        <div className={`
            w-full p-6 rounded-xl border transition-all duration-300 flex items-center gap-6
            ${isCompleted ? 'bg-[#00FF94]/5 border-[#00FF94]/30' : ''}
            ${isActive ? 'glass-panel border-[#00FF94] shadow-[0_0_20px_rgba(0,255,148,0.1)]' : ''}
            ${isLocked ? 'bg-white/5 border-white/5 opacity-60' : ''}
        `}>
            {/* Status Icon */}
            <div className="shrink-0">
                {isCompleted && <CheckCircle2 className="w-8 h-8 text-[#00FF94]" />}
                {isActive && <div className="w-8 h-8 rounded-full border-2 border-[#00FF94] flex items-center justify-center"><div className="w-3 h-3 bg-[#00FF94] rounded-full animate-pulse" /></div>}
                {isLocked && <Circle className="w-8 h-8 text-gray-600" />}
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-[#00FF94]' : 'text-gray-500'}`}>Fase {number}</span>
                </div>
                <h3 className={`text-xl font-serif font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{title}</h3>
                <p className="text-sm text-gray-400 font-light mt-1">{description}</p>
            </div>

            {/* Action (if active) */}
            {isActive && (
                <button className="px-4 py-2 rounded-lg bg-[#00FF94] text-[#0A1A2F] text-sm font-bold hover:bg-white transition-colors flex items-center gap-2">
                    Continuar <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
    )
}
