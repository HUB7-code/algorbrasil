'use client';

import { useState, useEffect } from "react";
import { ArrowRight, Activity, ShieldCheck, Zap, Database, AlertTriangle, HelpCircle, CheckCircle2, Lock, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendChart, RiskRadar, MiniGauge } from "@/components/dashboard/OverviewCharts";

// ========================================
// DASHBOARD - POWER BI PREMIUM DARK MODE
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem("algor_token");
            // If no token, layout handles redirect, but we safeguard here
            if (!token) {
                // Simulated Delay for animation demo
                setTimeout(() => setLoading(false), 1000);
                return;
            }

            try {
                const res = await fetch("/api/v1/dashboard/overview", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Derived States or Defaults
    const complianceScore = data?.kpis?.trust_score || 0;
    const criticalRisks = data?.critical_alerts || 0;
    const activeModels = data?.kpis?.active_models || 0;
    const growthScore = data?.kpis?.growth_score || 0;

    // Determine Phase based on Growth Score
    let currentPhase = "01. FORTALECIMENTO";
    if (growthScore > 70) currentPhase = "02. EXPANSÃO";
    if (growthScore > 90) currentPhase = "03. AI-FIRST";

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen text-white font-sans relative z-10">

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="relative flex h-2.5 w-2.5">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${loading ? 'bg-amber-400' : 'bg-[#00FF94]'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${loading ? 'bg-amber-500' : 'bg-[#00FF94]'}`}></span>
                            </div>
                            <span className="text-[10px] font-mono text-[#00FF94] uppercase tracking-[0.2em] font-bold">
                                {loading ? "ESTABLISHING UPLINK..." : "SYSTEM ONLINE"}
                            </span>
                        </div>
                        <h1 className="text-5xl font-serif font-medium text-white mb-2 tracking-tight">
                            Centro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Excelência</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-light flex items-center gap-2">
                            Bem-vindo ao comando, <span className="text-white font-medium border-b border-[#00FF94]/30 pb-0.5">Gestor de IA</span>.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="px-5 py-3 rounded-xl bg-[#0A1A2F]/50 backdrop-blur-md border border-white/10 flex items-center gap-4 shadow-lg group hover:border-[#00FF94]/30 transition-colors cursor-default">
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Fase Atual</p>
                                <p className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                                    {currentPhase}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* 1. Readiness Gauge */}
                    <KpiCard
                        title="Nível de Prontidão"
                        icon={<ShieldCheck className="w-5 h-5 text-[#00FF94]" />}
                        description="Índice de conformidade auditável ISO 42001."
                        delay={0.1}
                    >
                        <div className="flex items-center gap-4 mt-2">
                            <MiniGauge value={complianceScore} color={complianceScore > 80 ? "#00FF94" : "#F59E0B"} />
                            <div>
                                <p className="text-2xl font-bold text-white font-mono">{complianceScore}%</p>
                                <p className="text-xs text-gray-400">Score de Confiança</p>
                            </div>
                        </div>
                    </KpiCard>

                    {/* 2. Active Models */}
                    <KpiCard title="Ativos Monitorados" icon={<Database className="w-5 h-5 text-[#00A3FF]" />} delay={0.2}>
                        <div className="flex items-end gap-2 mt-4">
                            <p className="text-3xl font-bold text-white font-mono">{activeModels}</p>
                            <span className="text-xs text-[#00A3FF] mb-1.5 font-bold">+2 novos</span>
                        </div>
                        <div className="w-full bg-[#00A3FF]/10 h-1.5 rounded-full mt-3 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-[#00A3FF]" />
                        </div>
                    </KpiCard>

                    {/* 3. Incidents */}
                    <KpiCard title="Incidentes Críticos" icon={<AlertTriangle className="w-5 h-5 text-[#EF4444]" />} delay={0.3}>
                        <div className="flex items-end gap-2 mt-4">
                            <p className={`text-3xl font-bold font-mono ${criticalRisks > 0 ? "text-[#EF4444]" : "text-[#00FF94]"}`}>{criticalRisks}</p>
                            <span className="text-xs text-gray-400 mb-1.5">Detectados hoje</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: criticalRisks > 0 ? '20%' : '100%' }} className={`h-full ${criticalRisks > 0 ? "bg-[#EF4444]" : "bg-[#00FF94]"}`} />
                        </div>
                    </KpiCard>

                    {/* 4. Velocity */}
                    <KpiCard title="Consent Velocity" icon={<Zap className="w-5 h-5 text-[#8B5CF6]" />} delay={0.4}>
                        <div className="flex items-end gap-2 mt-4">
                            <p className="text-3xl font-bold text-white font-mono">4.2h</p>
                            <span className="text-xs text-[#8B5CF6] mb-1.5 font-bold">-18% vs média</span>
                        </div>
                        <div className="w-full bg-[#8B5CF6]/10 h-1.5 rounded-full mt-3 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} className="h-full bg-[#8B5CF6]" />
                        </div>
                    </KpiCard>
                </div>

                {/* ANALYTICS SECTION (POWER BI STYLE) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[350px]">

                    {/* Trend Chart Area */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 glass-panel p-6 flex flex-col relative group hover:border-[#00FF94]/30 transition-colors"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Evolução do Trust Score</h3>
                                <p className="text-xs text-gray-500">Histórico de 6 meses (ISO 42001)</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-[10px] text-gray-400 uppercase"><div className="w-2 h-2 rounded-full bg-[#00FF94]" />Score</span>
                                <span className="flex items-center gap-1 text-[10px] text-gray-400 uppercase"><div className="w-2 h-2 rounded-full bg-[#00A3FF]" />Ativos</span>
                            </div>
                        </div>
                        <TrendChart />
                    </motion.div>

                    {/* Radar Chart Area */}
                    <motion.div
                        variants={itemVariants}
                        className="glass-panel p-6 flex flex-col relative group hover:border-[#F59E0B]/30 transition-colors"
                    >
                        <div className="mb-2">
                            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Matriz de Risco</h3>
                            <p className="text-xs text-gray-500">Distribuição por Categoria</p>
                        </div>
                        <RiskRadar />
                    </motion.div>

                </div>

                {/* Main Action Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Hero Card: Auditorias */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#131825] to-[#0A0E1A] border border-white/10 p-10 group"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00FF94]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#00FF94]/10 transition-colors duration-700" />

                        <div className="relative z-10 flex flex-col items-start h-full justify-between gap-10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-bold text-gray-300 uppercase tracking-wider mb-6">
                                    <Activity className="w-4 h-4" />
                                    Ação Recomendada
                                </div>
                                <h2 className="text-3xl font-serif font-medium text-white mb-4">
                                    Iniciar Novo Ciclo de Auditoria
                                </h2>
                                <p className="text-gray-400 font-light max-w-xl text-lg leading-relaxed">
                                    Nenhuma validação ativa detectada. Inicie um diagnóstico completo para identificar brechas de conformidade, atualizar a matriz de risco e desbloquear recursos Enterprise.
                                </p>
                            </div>

                            <Link href="/dashboard/assessments">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-4 bg-white text-[#0A1A2F] font-bold rounded-xl hover:bg-gray-100 transition-all text-sm tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                                >
                                    <Play className="w-4 h-4 fill-current" />
                                    EXECUTAR SCANNER DIAGNÓSTICO
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Secondary Actions Stack */}
                    <div className="flex flex-col gap-6">

                        {/* Viabilidade */}
                        <motion.div variants={itemVariants} className="flex-1 glass-panel p-6 flex flex-col justify-between group cursor-pointer hover:border-[#00FF94]/30 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Serviço Premium</span>
                                    <h3 className="text-lg font-serif font-medium text-white mt-1">Análise de Viabilidade</h3>
                                </div>
                                <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex items-end justify-between mt-4">
                                <div>
                                    <p className="text-2xl font-bold text-white tracking-tight">R$ 1.500</p>
                                    <p className="text-xs text-gray-500 mt-1">SLA 24 horas</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* License Status */}
                        <motion.div variants={itemVariants} className="flex-1 glass-panel p-6 flex flex-col justify-center gap-4 group hover:border-[#00A3FF]/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF]">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Growth License</p>
                                    <p className="text-xs text-[#00A3FF]">Ativa até Jan 2026</p>
                                </div>
                            </div>
                            <button className="w-full py-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 uppercase tracking-wider transition-all">
                                Gerenciar Assinatura
                            </button>
                        </motion.div>

                    </div>
                </div>

            </motion.div>
        </div>
    );
}

// Glass Card Component
function KpiCard({ title, icon, description, delay, children }: any) {
    return (
        <motion.div
            variants={itemVariants}
            className="glass-panel p-6 flex flex-col h-[280px] relative group hover:border-[#00FF94]/30 transition-colors"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors">
                        {title}
                    </span>
                    {description && (
                        <div className="relative group/tooltip">
                            <HelpCircle className="w-3 h-3 text-gray-600 hover:text-[#00FF94] cursor-help transition-colors mt-0.5" />
                            <div className="absolute left-0 top-6 w-48 p-3 bg-[#0A1A2F] border border-white/10 rounded-lg shadow-xl text-xs text-gray-300 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-50 backdrop-blur-xl">
                                {description}
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 group-hover:text-white transition-colors">
                    {icon}
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-end">
                {children}
            </div>
        </motion.div>
    );
}
