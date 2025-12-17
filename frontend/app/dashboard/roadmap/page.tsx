"use client";

import React from 'react';
import { CheckCircle2, Circle, Lock, ArrowRight, ShieldCheck, Rocket, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

const ROADMAP_PHASES = [
    {
        id: 1,
        title: "Fase 1: Fortalecimento Fundamental",
        subtitle: "Otimização e Integração Inicial",
        status: "in_progress", // in_progress, completed, locked
        progress: 65,
        color: "text-brand-copper",
        bg: "bg-brand-copper",
        icon: ShieldCheck,
        steps: [
            { id: "1.1", title: "Avaliação de Maturidade e Inventário", status: "completed" },
            { id: "1.2", title: "Definição de Escopos de Uso", status: "completed" },
            { id: "1.3", title: "Capacitação Inicial da Liderança", status: "in_progress" },
            { id: "1.4", title: "Constituição do Comitê de IA", status: "pending" }
        ]
    },
    {
        id: 2,
        title: "Fase 2: Expansão Estratégica",
        subtitle: "Pilotando Novas Fronteiras",
        status: "locked",
        progress: 0,
        color: "text-brand-blue",
        bg: "bg-brand-blue",
        icon: Rocket,
        steps: [
            { id: "2.1", title: "Priorização de Casos de Uso (PoCs)", status: "locked" },
            { id: "2.2", title: "Pipeline de Dados Escalável", status: "locked" },
            { id: "2.3", title: "Desenvolvimento de Infraestrutura Segura", status: "locked" },
            { id: "2.4", title: "Centro de Excelência (CoE) Ativo", status: "locked" }
        ]
    },
    {
        id: 3,
        title: "Fase 3: Cultura AI-First",
        subtitle: "Inovação Contínua e Governança",
        status: "locked",
        progress: 0,
        color: "text-brand-green",
        bg: "bg-brand-green",
        icon: LayoutGrid,
        steps: [
            { id: "3.1", title: "IA nos Processos Essenciais", status: "locked" },
            { id: "3.2", title: "Governança Ética Automatizada", status: "locked" },
            { id: "3.3", title: "Monitoramento Contínuo (KPIs)", status: "locked" }
        ]
    }
];

export default function RoadmapPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-medium text-white tracking-tight">
                    Jornada de Adoção ALGOR
                </h1>
                <p className="text-gray-400 mt-2 font-light max-w-3xl">
                    Seu mapa estratégico para a conformidade ISO 42001. Complete as etapas sequenciais para desbloquear níveis avançados de governança.
                </p>
            </div>

            {/* Progress Overview */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-brand-navy/60">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">Progresso Geral</span>
                    <span className="text-xl font-bold text-white">22%</span>
                </div>
                <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-copper via-brand-blue to-brand-green w-[22%] rounded-full relative">
                        <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                    </div>
                </div>
            </div>

            {/* Phases Grid */}
            <div className="grid gap-6">
                {ROADMAP_PHASES.map((phase, index) => {
                    const isActive = phase.status === 'in_progress';
                    const isLocked = phase.status === 'locked';
                    const isCompleted = phase.status === 'completed';

                    return (
                        <div
                            key={phase.id}
                            className={`
                                relative overflow-hidden rounded-3xl border transition-all duration-300
                                ${isActive ? 'bg-[#0A1A2F] border-brand-copper/30 shadow-[0_0_30px_rgba(230,126,34,0.1)]' : ''}
                                ${isLocked ? 'bg-[#050B14] border-white/5 opacity-60 grayscale-[0.5]' : ''}
                                ${isCompleted ? 'bg-brand-navy border-brand-green/30' : ''}
                            `}
                        >
                            {/* Phase Progress Bar Background */}
                            <div className="absolute top-0 left-0 h-1 bg-white/5 w-full">
                                <div
                                    className={`h-full ${phase.bg} transition-all duration-1000`}
                                    style={{ width: `${phase.progress}%` }}
                                />
                            </div>

                            <div className="p-8 md:flex gap-8 items-start">
                                {/* Phase Header */}
                                <div className="md:w-1/3 mb-6 md:mb-0">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl ${isActive ? 'bg-brand-copper/10 text-brand-copper' : 'bg-white/5 text-gray-500'}`}>
                                        <phase.icon className="w-7 h-7" />
                                    </div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${isActive ? 'bg-brand-copper/10 text-brand-copper border-brand-copper/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                            {isLocked ? 'Bloqueado' : isActive ? 'Em Progresso' : 'Concluído'}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-serif text-white mb-2">{phase.title}</h2>
                                    <p className="text-sm text-gray-400 font-light">{phase.subtitle}</p>

                                    {isActive && (
                                        <Link href="/dashboard/inventory">
                                            <button className="mt-8 px-6 py-3 bg-brand-copper hover:bg-[#D35400] text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2">
                                                Continuar Jornada
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </Link>
                                    )}
                                </div>

                                {/* Steps List */}
                                <div className="flex-1 space-y-4 pt-2">
                                    {phase.steps.map((step) => (
                                        <div
                                            key={step.id}
                                            className={`
                                                flex items-center gap-4 p-4 rounded-xl border transition-all
                                                ${step.status === 'completed' ? 'bg-brand-green/5 border-brand-green/10' : ''}
                                                ${step.status === 'in_progress' ? 'bg-white/5 border-white/10' : ''}
                                                ${step.status === 'locked' || step.status === 'pending' ? 'border-transparent opacity-60' : ''}
                                            `}
                                        >
                                            <div className="shrink-0">
                                                {step.status === 'completed' ? (
                                                    <CheckCircle2 className="w-6 h-6 text-brand-green" />
                                                ) : step.status === 'in_progress' ? (
                                                    <div className="relative">
                                                        <Circle className="w-6 h-6 text-brand-copper" />
                                                        <div className="absolute inset-0 w-6 h-6 border-2 border-brand-copper rounded-full border-t-transparent animate-spin" />
                                                    </div>
                                                ) : step.status === 'locked' ? (
                                                    <Lock className="w-5 h-5 text-gray-600" />
                                                ) : (
                                                    <Circle className="w-6 h-6 text-gray-600" />
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className={`text-sm font-medium ${step.status === 'completed' ? 'text-gray-200' : 'text-gray-400'}`}>
                                                        {step.title}
                                                    </span>
                                                    <span className="text-xs font-mono text-gray-600">ID {step.id}</span>
                                                </div>
                                                {step.status === 'in_progress' && (
                                                    <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                                        <div className="h-full bg-brand-copper w-1/3 animate-pulse"></div>
                                                    </div>
                                                )}
                                            </div>

                                            {step.status === 'in_progress' && (
                                                <button className="text-xs text-brand-copper hover:underline whitespace-nowrap">
                                                    Retomar
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Utility for later:
// We can fetch user progress from the backend (API) and dynamically map it to this structure.
// This is currently mocking the "Fortalecimento" phase as active.
