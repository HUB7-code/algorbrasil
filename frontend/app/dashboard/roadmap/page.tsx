'use client';

import { useState } from "react";
import { CheckCircle2, Lock, ArrowRight, Play, Map, Zap, ShieldCheck, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// ========================================
// ROADMAP - POWER BI PREMIUM DARK MODE
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function RoadmapPage() {
    // Mock Progress State (In real app, fetch from backend)
    const currentPhase = 2; // 1-indexed
    const phases = [
        {
            id: 1,
            title: "Diagnóstico Inicial & Shadow AI",
            description: "Identificação de riscos ocultos e inventário preliminar de ativos.",
            details: ["Scan de Vulnerabilidades", "Mapeamento de Shadow IT", "Relatório de Risco Inicial"],
            icon: <Zap className="w-5 h-5" />,
            status: "completed",
            progress: 100,
        },
        {
            id: 2,
            title: "Estruturação da Governança",
            description: "Definição de comitê de ética, políticas e frameworks (ISO 42001).",
            details: ["Política de Uso Aceitável", "Formação do Comitê de IA", "Matriz de Impacto"],
            icon: <ShieldCheck className="w-5 h-5" />,
            status: "active",
            progress: 45,
        },
        {
            id: 3,
            title: "Implementação Técnica",
            description: "Deploy de Data Clean Rooms e auditoria contínua dos modelos.",
            details: ["Integração via API", "Guardrails em Produção", "Dashboards em Tempo Real"],
            icon: <FileCheck className="w-5 h-5" />,
            status: "locked",
            progress: 0,
        },
        {
            id: 4,
            title: "Certificação & Escala",
            description: "Auditoria final para selo ISO e expansão segura para toda organização.",
            details: ["Auditoria Externa", "Selo de Conformidade", "Rollout Global"],
            icon: <Map className="w-5 h-5" />,
            status: "locked",
            progress: 0,
        },
    ];

    return (
        <div className="p-8 max-w-[1200px] mx-auto min-h-screen text-white font-sans relative z-10">

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-mono text-[#00FF94] uppercase tracking-[0.2em] font-bold">PROJECT S.A.F.E.</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-2 tracking-tight">
                            Jornada de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">Adoção</span>
                        </h1>
                        <p className="text-gray-400 font-light text-lg max-w-2xl">
                            Seu plano de voo estratégico para atingir a maturidade em Inteligência Artificial com segurança e conformidade.
                        </p>
                    </div>

                    {/* Global Progress Widget */}
                    <div className="flex gap-4">
                        <div className="glass-panel px-6 py-4 flex flex-col items-center justify-center min-w-[140px] border-l-4 border-l-[#00FF94]">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Progresso Geral</span>
                            <span className="text-3xl font-mono font-bold text-white">35%</span>
                        </div>
                        <div className="glass-panel px-6 py-4 flex flex-col items-center justify-center min-w-[140px] border-l-4 border-l-[#00A3FF]">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Status Atual</span>
                            <span className="text-lg font-bold text-[#00A3FF]">Fase 02</span>
                        </div>
                    </div>
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative pl-8 md:pl-0">
                    {/* Central Line */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
                    <div className="absolute left-0 top-4 bottom-0 w-px bg-white/10 md:hidden" />

                    <div className="space-y-12">
                        {phases.map((phase, index) => (
                            <TimelineItem
                                key={phase.id}
                                phase={phase}
                                index={index}
                                isLast={index === phases.length - 1}
                            />
                        ))}
                    </div>
                </div>

            </motion.div>
        </div>
    );
}

function TimelineItem({ phase, index, isLast }: any) {
    const isCompleted = phase.status === 'completed';
    const isActive = phase.status === 'active';
    const isLocked = phase.status === 'locked';
    const isEven = index % 2 === 0;

    return (
        <motion.div
            variants={itemVariants}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 relative ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* 1. Content Card (Occupies 50%) */}
            <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                <div
                    className={`
                        p-6 rounded-2xl border transition-all duration-500 group relative overflow-hidden
                        ${isActive
                            ? 'glass-panel border-[#00FF94]/50 shadow-[0_0_30px_rgba(0,255,148,0.1)]'
                            : isCompleted
                                ? 'bg-[#0A1A2F]/40 border-[#00FF94]/20'
                                : 'bg-white/5 border-white/5 opacity-70'}
                    `}
                >
                    {isActive && (
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF94] to-transparent animate-pulse" />
                    )}

                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg border ${isActive ? 'bg-[#00FF94]/10 border-[#00FF94]/20 text-[#00FF94]' : isCompleted ? 'bg-[#00FF94]/5 text-[#00FF94] border-transparent' : 'bg-white/5 text-gray-500 border-transparent'}`}>
                            {phase.icon}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${isActive ? 'text-[#00FF94] border-[#00FF94]/30 bg-[#00FF94]/5' : isCompleted ? 'text-[#00FF94] border-transparent' : 'text-gray-500 border-transparent'}`}>
                            Fase 0{phase.id}
                        </span>
                    </div>

                    <h3 className={`text-xl font-serif font-medium mb-2 ${isLocked ? 'text-gray-400' : 'text-white'}`}>
                        {phase.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                        {phase.description}
                    </p>

                    {/* Progress Bar for Active */}
                    {isActive && (
                        <div className="mb-6">
                            <div className="flex justify-between text-xs mb-1.5 font-bold">
                                <span className="text-[#00FF94]">Em Progresso</span>
                                <span className="text-white">{phase.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${phase.progress}%` }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-[#00FF94] shadow-[0_0_10px_#00FF94]"
                                />
                            </div>
                        </div>
                    )}

                    {/* Details List */}
                    <div className="space-y-2">
                        {phase.details.map((detail: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                                {isCompleted || (isActive && i === 0) ? (
                                    <CheckCircle2 className="w-3 h-3 text-[#00FF94]" />
                                ) : (
                                    <div className="w-3 h-3 rounded-full border border-gray-600" />
                                )}
                                <span className={(isCompleted || (isActive && i === 0)) ? "text-gray-300 line-through decoration-gray-600" : ""}>{detail}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    {isActive && (
                        <div className="mt-6 pt-4 border-t border-white/5">
                            <Link href="/dashboard/assessments">
                                <button className="w-full py-3 rounded-lg bg-[#00FF94] text-[#0A1A2F] text-sm font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg">
                                    CONTINUAR JORNADA <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    )}
                    {isLocked && (
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <Lock className="w-3 h-3" /> Bloqueado
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Timeline Node (Center) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center justify-center">
                <div className={`
                    w-4 h-4 rounded-full border-2 z-10 transition-colors duration-500
                    ${isCompleted ? 'bg-[#00FF94] border-[#00FF94] shadow-[0_0_15px_#00FF94]' : ''}
                    ${isActive ? 'bg-[#0A1A2F] border-[#00FF94] shadow-[0_0_15px_rgba(0,255,148,0.5)] scale-125' : ''}
                    ${isLocked ? 'bg-[#0A1A2F] border-gray-700' : ''}
                `}>
                    {isActive && <div className="absolute inset-0 bg-[#00FF94] rounded-full animate-ping opacity-20" />}
                </div>
            </div>

            {/* 3. Empty Space (Occupies 50% on Desktop) */}
            <div className="hidden md:block w-1/2" />

        </motion.div>
    );
}

// Global Glass Panel Style (In case it's missing in globals.css)
// .glass-panel { @apply bg-[#131825]/80 backdrop-blur-xl border border-white/10 shadow-xl; }
