"use client";

import React, { useState, useEffect } from 'react';
import {
    ShieldCheck, TrendingUp, AlertTriangle, Activity, Lock, Eye,
    FileText, CheckCircle2, BarChart3, Globe2, Zap, ArrowRight,
    Terminal, LayoutGrid, Search, Settings, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PolicyManager } from '@/components/growth-hub/PolicyManager';
import { ScopeDefinition } from '@/components/growth-hub/modules/ScopeDefinition';
import { RiskClassification } from '@/components/growth-hub/modules/RiskClassification';
import { LegalCompliance } from '@/components/growth-hub/modules/LegalCompliance';
import { ImpactAssessment } from '@/components/growth-hub/modules/ImpactAssessment';
import { ExplainabilityDashboard } from '@/components/growth-hub/modules/ExplainabilityDashboard';
import { HumanOversight } from '@/components/growth-hub/modules/HumanOversight';
import { MonitoringDashboard } from '@/components/growth-hub/modules/MonitoringDashboard';
import { useSearchParams } from 'next/navigation';
import { useOrganization } from '@/context/OrganizationContext';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// ========================================
// GROWTH AI GOVERNANCE HUB - WORKBENCH MODE
// ========================================

const steps = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutGrid, desc: 'Dashboard de Operações' },
    { id: 'scope', label: '1. Definição Escopo', icon: Globe2, desc: 'Identificação e Limites' },
    { id: 'risks', label: '2. Classif. Riscos', icon: AlertTriangle, desc: 'Matriz de Impacto' },
    { id: 'legal', label: '3. Conformidade Legal', icon: FileText, desc: 'LGPD, EU AI Act' },
    { id: 'aia', label: '4. Impacto (AIA)', icon: Activity, desc: 'Relatório Algorítmico' },
    { id: 'policy', label: '5. Políticas (SGIA)', icon: ShieldCheck, desc: 'Governança Interna' },
    { id: 'xai', label: '6. Explicabilidade', icon: Eye, desc: 'Transparência de Modelo' },
    { id: 'human', label: '7. Supervisão Humana', icon: Lock, desc: 'Human-in-the-loop' },
    { id: 'monitor', label: '8. Monitoramento', icon: BarChart3, desc: 'Observabilidade Contínua' },
];

// MOCK DATA FOR VISUALS
const auditHistory = Array.from({ length: 12 }, (_, i) => ({
    name: i,
    events: Math.floor(Math.random() * 50) + 10,
    blocked: Math.floor(Math.random() * 10),
}));

export default function GrowthHubPage() {
    const searchParams = useSearchParams();
    const { currentOrganization } = useOrganization();

    // Determine active tab (default: overview)
    // We use internal state to switch instantly, but could sync with URL
    const [activeTab, setActiveTab] = useState('overview');

    // Sync with URL param on mount
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab) setActiveTab(tab);
    }, [searchParams]);

    // Derived: Current Step Info
    const currentStep = steps.find(s => s.id === activeTab) || steps[0];

    return (
        <div className="flex w-full min-h-screen bg-[#050A14] text-white font-sans overflow-hidden">

            {/* BACKGROUND EFFECTS */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#00A3FF]/5 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* SIDEBAR NAVIGATION (Command Center Style) */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-80 shrink-0 border-r border-white/5 bg-[#0A111F]/80 backdrop-blur-xl flex flex-col z-20"
            >
                {/* Brand / Header */}
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3 text-[#00FF94] mb-2">
                        <Terminal className="w-6 h-6" />
                        <span className="font-orbitron font-bold text-lg tracking-wider">ALGOR.AI</span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">Governance Workbench v2.1</p>
                </div>

                {/* Navigation List */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-4">Pipeline de Governança</p>

                    {steps.map((step) => {
                        const isActive = activeTab === step.id;
                        return (
                            <button
                                key={step.id}
                                onClick={() => setActiveTab(step.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? 'bg-[#00A3FF]/10 text-white shadow-[0_0_20px_rgba(0,163,255,0.1)]'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {isActive && <div className="absolute inset-y-0 left-0 w-1 bg-[#00A3FF] rounded-full" />}

                                <step.icon className={`w-5 h-5 ${isActive ? 'text-[#00A3FF]' : 'text-gray-500 group-hover:text-white'}`} />
                                <div className="text-left">
                                    <div className={`text-sm font-bold ${isActive ? 'text-white' : ''}`}>{step.label}</div>
                                    <div className="text-[10px] text-gray-500 font-medium opacity-80">{step.desc}</div>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-[#00A3FF]" />}
                            </button>
                        );
                    })}
                </div>

                {/* Footer User Info */}
                <div className="p-4 border-t border-white/5 bg-black/20">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00A3FF] to-[#00FF94]" />
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate text-white">{currentOrganization?.name || 'Algor Demo'}</p>
                            <p className="text-[10px] text-gray-400">Enterprise Plan</p>
                        </div>
                        <Settings className="w-4 h-4 ml-auto text-gray-500 hover:text-white cursor-pointer" />
                    </div>
                </div>
            </motion.div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 relative z-10 h-screen overflow-hidden">

                {/* Top Breadcrumb Bar */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#050A14]/80 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-sm">Dashboard</span>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                        <span className="text-[#00FF94] text-sm font-bold uppercase tracking-wider bg-[#00FF94]/10 px-3 py-1 rounded-full border border-[#00FF94]/20 flex items-center gap-2">
                            <currentStep.icon className="w-3 h-3" />
                            {currentStep.label}
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-mono text-gray-400">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            LIVE AUDIT LOG
                        </div>
                    </div>
                </header>

                {/* Dynamic Content Scroll Area */}
                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {activeTab === 'overview' && <OverviewDashboard />}
                            {activeTab === 'scope' && <ScopeDefinition />}
                            {activeTab === 'risks' && <RiskClassification />}
                            {activeTab === 'legal' && <LegalCompliance />}
                            {activeTab === 'aia' && <ImpactAssessment />}
                            {activeTab === 'policy' && <PolicyManager />}
                            {activeTab === 'xai' && <ExplainabilityDashboard />}
                            {activeTab === 'human' && <HumanOversight />}
                            {activeTab === 'monitor' && <MonitoringDashboard />}
                        </motion.div>
                    </AnimatePresence>

                </main>
            </div>
        </div>
    );
}

// ==========================================
// SUB-COMPONENTS (Overview Specific)
// ==========================================

function OverviewDashboard() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header Hero */}
            <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#00A3FF]/10 to-[#00FF94]/5 border border-white/5 p-10">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl font-bold font-orbitron text-white mb-4">Central de Governança</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        Visão consolidada de todos os vetores de IA. Seu ecossistema está <span className="text-[#00FF94] font-bold">94% conforme</span> com a ISO 42001.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-[#00FF94] text-[#050A14] font-bold rounded-xl shadow-lg shadow-[#00FF94]/30 hover:shadow-[#00FF94]/50 transition-all flex items-center gap-2 uppercase tracking-wide text-xs">
                            <Zap className="w-4 h-4" /> Relatório Executivo
                        </button>
                        <button className="px-6 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 uppercase tracking-wide text-xs">
                            <Settings className="w-4 h-4 ml-1" /> Configurar Alertas
                        </button>
                    </div>
                </div>
                {/* Decorative BG */}
                <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('/img/grid-pattern.svg')] opacity-20 mask-image-linear-gradient" />
            </div>

            {/* KPIs Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Modelos Auditados", val: "12", sub: "+2 essa semana", color: "#00A3FF", icon: CheckCircle2 },
                    { label: "Riscos Mitigados", val: "847", sub: "99.9% Taxa de Sucesso", color: "#00FF94", icon: ShieldCheck },
                    { label: "Incidentes Críticos", val: "0", sub: "Sistema Seguro", color: "#F59E0B", icon: AlertTriangle },
                    { label: "Tempo Médio (Review)", val: "4h", sub: "-20% vs média", color: "#8B5CF6", icon: Activity },
                ].map((kpi, i) => (
                    <div key={i} className="bg-[#0A111F]/60 backdrop-blur border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-[${kpi.color}]/10`} style={{ color: kpi.color }}>
                                <kpi.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-orbitron font-bold text-white mb-1">{kpi.val}</h3>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{kpi.label}</p>
                        <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded inline-block">
                            {kpi.sub}
                        </span>
                    </div>
                ))}
            </div>

            {/* Activity Chart & Logs */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-[500px]">
                <div className="xl:col-span-2 bg-[#0A111F]/60 backdrop-blur border border-white/5 p-8 rounded-[32px] flex flex-col">
                    <h3 className="text-xl font-orbitron font-bold text-white mb-6">Volume de Interceptações (Firewall)</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={auditHistory}>
                                <defs>
                                    <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" hide />
                                <YAxis stroke="#475569" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#050A14', borderColor: '#ffffff10', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                                <Area type="monotone" dataKey="events" stroke="#00A3FF" strokeWidth={2} fillOpacity={1} fill="url(#colorEvents)" />
                                <Area type="monotone" dataKey="blocked" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="transparent" strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#0A111F]/60 backdrop-blur border border-white/5 p-8 rounded-[32px] flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-orbitron font-bold text-white">Últimos Logs</h3>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                                <div className="flex justify-between mb-1">
                                    <span className="text-[10px] font-mono text-[#00A3FF] font-bold">TRACE-839{i}</span>
                                    <span className="text-[10px] text-gray-500">14:02:{i}0</span>
                                </div>
                                <p className="text-sm font-bold text-white mb-1">PII Detectado (CPF)</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-400">GPT-4-Turbo</span>
                                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded uppercase font-bold">Blocked</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
