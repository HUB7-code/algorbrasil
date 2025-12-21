"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Activity, ShieldCheck, Zap, Database, BarChart3, AlertTriangle, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem("algor_token");
            if (!token) {
                // Mock data for unauthenticated visual check (or redirect)
                // window.location.href = "/login";
                setLoading(false);
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

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 pb-6 border-b border-white/10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-500' : 'bg-[#00FF94]'} animate-pulse shadow-[0_0_10px_#00FF94]`} />
                        <span className="text-xs font-mono text-[#00FF94] uppercase tracking-widest">{loading ? "CONNECTING..." : "SYSTEM ONLINE"}</span>
                    </div>
                    <h1 className="text-4xl font-serif font-medium text-white mb-2 tracking-tight drop-shadow-lg">
                        Centro de Excelência
                    </h1>
                    <p className="text-gray-300 text-lg font-light">
                        Bem-vinda ao comando, <span className="text-white font-medium">Edisio Nascimento</span>.
                    </p>
                </div>

                <div className="px-5 py-2 rounded-lg glass-panel flex items-center gap-4">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Fase Atual</span>
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                        <span className="text-[#00FF94]">{currentPhase.split('.')[0]}.</span> {currentPhase.split('.')[1]}
                    </span>
                </div>
            </div>

            {/* KPI Cards - Using Global Glass Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                {/* 1. Growth Score / Readiness */}
                <KpiCard
                    title="Nível de Prontidão"
                    description="Nota de confiabilidade auditável (ISO 42001). Baseada em riscos ativos e controles implementados."
                    icon={<ShieldCheck className="w-5 h-5 text-[#00FF94]" />}
                    iconBg="bg-[#00FF94]/10"
                    trend={loading ? "..." : (complianceScore > 80 ? "+ Stable" : "- Attention")}
                    trendPositive={complianceScore > 80}
                >
                    <div className="flex items-center justify-between mt-4">
                        <div className="relative w-20 h-20">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                <path
                                    className="text-[#00FF94] drop-shadow-[0_0_8px_rgba(0,255,148,0.5)] transition-all duration-1000 ease-out"
                                    strokeDasharray={`${complianceScore}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-xl font-bold text-white">{loading ? "--" : `${complianceScore}%`}</span>
                                <span className="text-[9px] font-bold text-[#00FF94] uppercase">{complianceScore > 80 ? "High" : "Med"}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-400 mb-1">Status ISO</div>
                            <div className="text-base font-medium text-white">{complianceScore >= 100 ? "Certified" : "Audit Mode"}</div>
                        </div>
                    </div>
                </KpiCard>

                {/* 2. Data Activity */}
                <KpiCard
                    title="Atividade de Dados"
                    description="Volume de ativos de IA (Modelos/SaaS) em status de produção monitorados pelo Guardrail."
                    icon={<Database className="w-5 h-5 text-[#00A3FF]" />}
                    iconBg="bg-[#00A3FF]/10"
                    trend={`${activeModels} Ativos Monitorados`}
                    trendColor="text-[#00A3FF]"
                >
                    <div className="h-20 flex items-end justify-between gap-1 mt-4 px-1">
                        {[40, 70, 45, 90, 60, 80, 50, 75, 40].map((h, i) => (
                            <div key={i} className="w-full bg-[#00A3FF]/10 rounded-t-sm relative group">
                                <div
                                    className="absolute bottom-0 w-full bg-[#00A3FF] rounded-t-sm transition-all duration-1000 shadow-[0_0_10px_rgba(0,163,255,0.3)]"
                                    style={{ height: `${loading ? 20 : h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                </KpiCard>

                {/* 3. Risk Monitor */}
                <KpiCard
                    title="Monitoramento de Risco"
                    description="Incidentes de segurança e conformidade detectados em tempo real na matriz de risco."
                    icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
                    iconBg="bg-amber-500/10"
                    trend={`${data?.risks_summary?.total || 0} Incidentes Totais`}
                    trendColor="text-amber-400"
                >
                    <div className="space-y-4 mt-6">
                        <div>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-gray-400 font-medium">Críticos</span>
                                <span className={criticalRisks > 0 ? "text-red-500 font-bold" : "text-[#00FF94] font-bold"}>
                                    {criticalRisks > 0 ? "ACTION REQUIRED" : "Safe"}
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${criticalRisks > 0 ? 'bg-red-500 w-[80%]' : 'bg-[#00FF94] w-[10%]'}`}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-gray-400 font-medium">Alertas Elevados (High)</span>
                                <span className="text-amber-500 font-bold">{data?.risks_summary?.high || 0} Alerts</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-all duration-1000"
                                    style={{ width: `${(data?.risks_summary?.high || 0) * 10}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </KpiCard>

                {/* 4. Velocity */}
                <KpiCard
                    title="Consent Velocity"
                    description="Tempo médio para processar solicitações de opt-out (descadastro). Meta de SLA: < 24h."
                    icon={<Zap className="w-5 h-5 text-purple-400" />}
                    iconBg="bg-purple-500/10"
                    trend="Opt-in SLA"
                    trendColor="text-purple-300"
                >
                    <div className="flex flex-col items-center justify-center mt-2 h-20">
                        <span className="text-5xl font-serif font-medium text-white tracking-tighter drop-shadow-lg">
                            4.2<span className="text-2xl text-gray-500 ml-1 font-sans">h</span>
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 bg-white/5 border border-white/5 px-2 py-1 rounded mt-2">MÉDIA MENSAL</span>
                    </div>
                </KpiCard>
            </div>

            {/* Main Action Area Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Main Action (Auditorias) */}
                <div className="lg:col-span-2 glass-panel rounded-2xl p-8 relative overflow-hidden group hover:border-[#00FF94]/30">
                    <div className="relative z-10 flex flex-col items-start h-full justify-between">
                        <div className="flex w-full justify-between items-start">
                            <div className="p-3 bg-white/5 rounded-xl text-white mb-4 border border-white/5 shadow-inner">
                                <Activity className="w-6 h-6" />
                            </div>
                            <button className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors">
                                Ver Histórico
                            </button>
                        </div>

                        <div className="space-y-4 max-w-lg">
                            <h2 className="text-2xl font-serif font-medium text-white">Auditorias de Growth</h2>
                            <p className="text-gray-400 leading-relaxed font-light">
                                Nenhuma validação ativa no momento. Inicie um diagnóstico para desbloquear contratos Enterprise e garantir conformidade.
                            </p>
                        </div>

                        <div className="mt-8">
                            <Link href="/dashboard/assessments">
                                <button className="px-6 py-3 bg-white text-[#0A1A2F] font-bold rounded-xl hover:bg-gray-200 transition-all text-sm tracking-wide flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    INICIAR NOVA AUDITORIA <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right: Side Actions */}
                <div className="flex flex-col gap-6">
                    {/* Viabilidade Card */}
                    <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col justify-between group hover:border-[#00FF94]/30">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-serif font-medium text-white flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-gray-400" /> Viabilidade
                                </h3>
                                <p className="text-sm text-gray-400 mt-2 font-light">Análise profunda de risco jurídico e técnico (SLA 24h).</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                            <span className="text-2xl font-bold text-white tracking-tight">R$ 1.500</span>
                            <button className="h-8 w-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#0A1A2F] transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* License Card */}
                    <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col justify-between group hover:border-[#00FF94]/30">
                        <div>
                            <h3 className="text-lg font-serif font-medium text-white flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#00FF94]" /> Growth License
                            </h3>
                            <p className="text-sm text-gray-400 mt-1 font-light">Validade Enterprise até <span className="text-white font-medium">Jan 2026</span></p>
                        </div>
                        <button className="w-full py-2.5 mt-4 rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-gray-300 uppercase tracking-wider hover:bg-white hover:text-[#0A1A2F] transition-all">
                            Renovar Certificado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Global Glass Card Component Wrapper
function KpiCard({ title, icon, iconBg, trend, trendPositive, trendColor, description, children }: any) {
    return (
        <div className="glass-panel rounded-2xl p-6 flex flex-col h-64 relative group hover:border-[#00FF94]/30">

            <div className="flex justify-between items-start mb-4 relative z-10 gap-4">
                <div className="flex items-start gap-2 max-w-[70%]">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider leading-relaxed group-hover:text-white transition-colors">
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
                <div className={`p-2 rounded-lg ${iconBg} border border-white/5 shrink-0`}>
                    {icon}
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-end relative z-10">
                {children}
            </div>

            {trend && (
                <div className={`absolute top-[72px] left-6 text-xs font-bold ${trendPositive ? 'text-[#00FF94]' : trendColor ? trendColor : 'text-gray-500'}`}>
                    {trend}
                </div>
            )}
        </div>
    );
}
