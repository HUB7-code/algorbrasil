'use client';

import { useState } from "react";
import { CheckCircle2, Lock, ArrowRight, Play, Map, Zap, ShieldCheck, FileCheck, Trophy, Search, Users, Scale, Bot, Brain } from "lucide-react";
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
    // Phase Configuration
    const phases = [
        {
            id: 1,
            title: "Descoberta de IA",
            description: "Fase de conscientização, mapeamento de Shadow AI e exploração inicial de oportunidades.",
            details: ["Workshop de Discovery", "Inventário de Shadow AI", "Análise de Viabilidade (PoC)"],
            icon: <Search className="w-5 h-5" />,
            status: "completed",
            progress: 100,
            color: "#00FF94" // Neon Green
        },
        {
            id: 2,
            title: "Gestão de IA",
            description: "Estruturação de governança, definição de PMO e priorização de casos de uso seguros.",
            details: ["Definição de PMO de IA", "Framework de Risco", "Políticas de Uso (AUP)"],
            icon: <ShieldCheck className="w-5 h-5" />,
            status: "active",
            progress: 45,
            color: "#00A3FF" // Electric Blue
        },
        {
            id: 3,
            title: "Cultura AI-FIRST",
            description: "Adoção da IA como estratégia central, upskilling de equipes e democratização de dados.",
            details: ["Programa de Upskilling", "Data Democratization", "Inovação Aberta"],
            icon: <Users className="w-5 h-5" />,
            status: "locked",
            progress: 0,
            color: "#8B5CF6" // Violet
        },
        {
            id: 4,
            title: "Regulação Legal",
            description: "Conformidade robusta com leis locais (LGPD, PL 2338) e globais (EU AI Act).",
            details: ["Auditoria Jurídica", "Direitos dos Titulares", "Relatórios de Impacto (DPIA)"],
            icon: <Scale className="w-5 h-5" />,
            status: "locked",
            progress: 0,
            color: "#F59E0B" // Amber
        },
        {
            id: 5,
            title: "Autonomia de IA",
            description: "Implementação de agentes autônomos, decisões automatizadas e integração profunda.",
            details: ["Agentes Autônomos", "Orquestração de Modelos", "Auto-Remediação"],
            icon: <Brain className="w-5 h-5" />,
            status: "locked",
            progress: 0,
            color: "#EC4899" // Pink
        },
    ];

    // Calculate Global Progress
    const totalProgress = Math.round(phases.reduce((acc, curr) => acc + curr.progress, 0) / phases.length);

    return (
        <div className="p-8 min-h-screen bg-[#0A0E1A] text-white font-sans relative overflow-hidden">

            {/* Ambient Lighting - Premium Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto space-y-16 relative z-10"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-mono text-[#00FF94] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded bg-[#00FF94]/10 border border-[#00FF94]/20">
                                Project S.A.F.E.
                            </span>
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-2 py-1">
                                v2.4 Status Report
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-4 tracking-tight leading-tight">
                            Jornada de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">Adoção</span>
                        </h1>
                        <p className="text-gray-400 font-light text-lg max-w-2xl leading-relaxed">
                            Seu plano de voo estratégico para atingir a maturidade em Inteligência Artificial com segurança, conformidade e escala.
                        </p>
                    </div>

                    {/* Global Progress Widget - Premium Glass */}
                    <div className="flex gap-4">
                        <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E1A]/60 backdrop-blur-xl p-6 min-w-[160px] text-center shadow-lg">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#00FF94]/10 rounded-bl-full -mr-8 -mt-8" />
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2 block">Progresso Geral</span>
                            <span className="text-4xl font-orbitron font-bold text-white drop-shadow-[0_0_10px_rgba(0,255,148,0.5)]">
                                {totalProgress}%
                            </span>
                            <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${totalProgress}%` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="h-full bg-[#00FF94] shadow-[0_0_10px_#00FF94]"
                                />
                            </div>
                        </div>

                        <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E1A]/60 backdrop-blur-xl p-6 min-w-[160px] text-center shadow-lg">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#00A3FF]/10 rounded-bl-full -mr-8 -mt-8" />
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2 block">Status Atual</span>
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse" />
                                <span className="text-xl font-bold font-orbitron text-[#00A3FF]">Fase 02</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2">Active Sprint</p>
                        </div>
                    </div>
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative pl-8 md:pl-0">
                    {/* Central Gradient Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00FF94] via-[#00A3FF] to-gray-800 -translate-x-1/2 hidden md:block opacity-30" />
                    <div className="absolute left-[33px] top-0 bottom-0 w-[2px] bg-white/10 md:hidden" />

                    <div className="space-y-16">
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
            <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-20' : 'md:pr-20'}`}>
                <div
                    className={`
                        p-8 rounded-[24px] border transition-all duration-500 group relative overflow-hidden backdrop-blur-xl
                        ${isActive
                            ? 'bg-[#0A0E1A]/80 border-[#00A3FF]/50 shadow-[0_0_50px_rgba(0,163,255,0.15)] ring-1 ring-[#00A3FF]/20'
                            : isCompleted
                                ? 'bg-[#0A0E1A]/40 border-[#00FF94]/20 hover:border-[#00FF94]/40'
                                : 'bg-[#0A0E1A]/20 border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-80'}
                    `}
                >
                    {/* Active Glow Effect */}
                    {isActive && (
                        <div className="absolute top-0 right-[-50%] w-[100%] h-[100%] bg-gradient-to-b from-[#00A3FF]/10 to-transparent blur-[60px] pointer-events-none" />
                    )}

                    <div className="flex justify-between items-start mb-6">
                        <div
                            className="p-3 rounded-xl border relative z-10"
                            style={{
                                backgroundColor: isLocked ? 'rgba(255,255,255,0.05)' : `${phase.color}15`,
                                borderColor: isLocked ? 'transparent' : `${phase.color}30`,
                                color: isLocked ? '#6B7280' : phase.color
                            }}
                        >
                            {phase.icon}
                        </div>
                        <span
                            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border"
                            style={{
                                color: isLocked ? '#6B7280' : phase.color,
                                borderColor: isLocked ? 'transparent' : `${phase.color}30`,
                                backgroundColor: isLocked ? 'rgba(255,255,255,0.05)' : `${phase.color}05`
                            }}
                        >
                            Fase 0{phase.id}
                        </span>
                    </div>

                    <h3 className={`text-2xl font-orbitron font-bold mb-3 ${isLocked ? 'text-gray-500' : 'text-white'}`}>
                        {phase.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                        {phase.description}
                    </p>

                    {/* Progress Bar for Active */}
                    {isActive && (
                        <div className="mb-8">
                            <div className="flex justify-between text-xs mb-2 font-bold uppercase tracking-wider">
                                <span className="text-[#00A3FF] animate-pulse">Em Execução</span>
                                <span className="text-white">{phase.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-[#00A3FF]/10 rounded-full overflow-hidden border border-[#00A3FF]/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${phase.progress}%` }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                                    className="h-full bg-[#00A3FF] shadow-[0_0_15px_#00A3FF]"
                                />
                            </div>
                        </div>
                    )}

                    {/* Details List (Checklist) */}
                    <div className="space-y-3">
                        {phase.details.map((detail: string, i: number) => {
                            const isDetailDone = isCompleted || (isActive && i === 0);
                            return (
                                <div key={i} className="flex items-center gap-3 text-sm group/item">
                                    <div
                                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${isDetailDone
                                            ? `bg-[${phase.color}]/10 border-[${phase.color}] text-[${phase.color}]`
                                            : 'border-white/10 text-transparent'
                                            }`}
                                        style={{
                                            borderColor: isDetailDone ? phase.color : 'rgba(255,255,255,0.1)',
                                            color: isDetailDone ? phase.color : 'transparent'
                                        }}
                                    >
                                        <CheckCircle2 size={12} />
                                    </div>
                                    <span className={`${isDetailDone ? "text-gray-400" : "text-gray-500"} transition-colors group-hover/item:text-gray-300`}>
                                        {detail}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    {isActive && (
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <Link href="/dashboard/assessments">
                                <button className="w-full py-4 rounded-xl bg-[#00A3FF] text-[#0A1A2F] text-sm font-bold uppercase tracking-wider hover:bg-[#0082CC] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)]">
                                    Continuar Jornada <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    )}

                    {isLocked && (
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-gray-600 text-xs font-bold uppercase tracking-wider">
                            <Lock className="w-3 h-3" /> Acesso Bloqueado
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Timeline Node (Center) - Premium Orb */}
            <div className="absolute left-8 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center justify-center z-20">
                <div
                    className={`
                        w-12 h-12 rounded-full border-4 flex items-center justify-center backdrop-blur-md transition-all duration-500
                        ${isActive
                            ? `border-[#00A3FF] bg-[#0A0E1A]/80 shadow-[0_0_30px_rgba(0,163,255,0.6)] scale-110`
                            : isCompleted
                                ? `border-[#00FF94] bg-[#0A0E1A] shadow-[0_0_15px_rgba(0,255,148,0.3)]`
                                : 'border-gray-800 bg-[#0A0E1A] opacity-50'}
                    `}
                >
                    {isCompleted ? (
                        <CheckCircle2 size={20} className="text-[#00FF94]" />
                    ) : isActive ? (
                        <div className="w-3 h-3 bg-[#00A3FF] rounded-full animate-ping" />
                    ) : (
                        <div className="w-2 h-2 bg-gray-700 rounded-full" />
                    )}
                </div>
                {/* Connector Line overlay for clean cuts */}
                <div className="absolute top-12 bottom-[-100px] w-[2px] bg-[#0A0E1A] -z-10" />
            </div>

            {/* 3. Empty Space (Occupies 50% on Desktop) */}
            <div className="hidden md:block w-1/2" />

        </motion.div>
    );
}
