"use client";

import React, { useState } from 'react';
import {
    ShieldCheck,
    TrendingUp,
    AlertTriangle,
    Activity,
    Lock,
    Eye,
    FileText,
    CheckCircle2,
    BarChart3,
    Globe2,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PolicyManager } from '@/components/growth-hub/PolicyManager';
import { useSearchParams } from 'next/navigation';
import { useOrganization } from '@/context/OrganizationContext';

export default function GrowthHubPage() {
    const searchParams = useSearchParams();
    const { currentOrganization } = useOrganization();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');

    // State for Real KPIs and Logs
    const [kpis, setKpis] = useState<{
        cicr: { value: string; delta: string; isPositive: boolean };
        risk_mitigation: { value: string; delta: string; isPositive: boolean };
        audit_readiness: { value: string; delta: string; isPositive: boolean };
        secure_sessions: { value: string; delta: string; isPositive: boolean };
    } | null>(null);

    const [recentLogs, setRecentLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Organization ID from context, fallback to 1 for backwards compatibility
    const orgId = currentOrganization?.id || 1;

    // Fetch Real Data from Backend
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch KPIs
                const statsRes = await fetch(`/api/v1/governance-stats/dashboard-stats?organization_id=${orgId}`);
                const statsData = await statsRes.json();

                // 2. Fetch Recent Logs
                const logsRes = await fetch(`/api/v1/governance-stats/recent-logs?organization_id=${orgId}&limit=5`);
                const logsData = await logsRes.json();

                setKpis(statsData.kpis);
                setRecentLogs(logsData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch Growth Hub data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [orgId]);

    // KPIs Configuration (mapped to fetched data)
    const kpiConfig = [
        {
            key: 'cicr',
            label: "CICR Conversion Rate",
            icon: TrendingUp,
            desc: "Taxa de conversão em funis auditados"
        },
        {
            key: 'risk_mitigation',
            label: "Multas Mitigadas (Est.)",
            icon: ShieldCheck,
            desc: "Baseado em infrações LGPD evitadas"
        },
        {
            key: 'audit_readiness',
            label: "Audit Readiness",
            icon: CheckCircle2,
            desc: "Prontidão para ISO 42001"
        },
        {
            key: 'secure_sessions',
            label: "Sessões Seguras",
            icon: Activity,
            desc: "Interações de IA interceptadas via API"
        },
    ];

    return (
        <div className="p-8 space-y-8 min-h-screen bg-[#0A1A2F] text-slate-100 font-sans">

            {/* Header Section */}
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Growth AI Governance Hub
                    </h1>
                    <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
                        Transforme conformidade em receita. Gerencie o ciclo de vida ético de suas IAs e desbloqueie contratos Enterprise com o selo de confiança ALGOR.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all text-sm font-semibold">
                        <Zap size={16} />
                        Gerar Relatório Board
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold transition-all shadow-lg shadow-blue-500/20 text-sm">
                        <ShieldCheck size={16} />
                        Novo Guardrail
                    </button>
                </div>
            </div>

            {/* KPI Grid - Financial Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                    // Skeleton Loading
                    [1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 rounded-xl bg-white/5 animate-pulse" />
                    ))
                ) : (
                    kpiConfig.map((config, idx) => {
                        const data = kpis ? (kpis as any)[config.key] : { value: "-", delta: "-", isPositive: true };
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/10 transition-colors group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg bg-slate-900/50 text-slate-400 group-hover:text-emerald-400 transition-colors`}>
                                        <config.icon size={20} />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${data.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                        {data.delta}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{data.value}</h3>
                                <p className="text-sm font-medium text-slate-400 mb-1">{config.label}</p>
                                <p className="text-xs text-slate-500">{config.desc}</p>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Main Workbench */}
            <div className="flex gap-6 h-[800px]">

                {/* Sidebar Nav (11 Etapas) */}
                <div className="w-64 shrink-0 space-y-2">
                    <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Metodologia ALGOR
                    </div>
                    {[
                        { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                        { id: 'scope', label: '1. Definição Escopo', icon: Globe2 },
                        { id: 'risks', label: '2. Classif. Riscos', icon: AlertTriangle },
                        { id: 'legal', label: '3. Conformidade Legal', icon: FileText },
                        { id: 'aia', label: '4. Impacto (AIA)', icon: Activity },
                        { id: 'policy', label: '5. Políticas (SGIA)', icon: ShieldCheck },
                        { id: 'xai', label: '6. Explicabilidade', icon: Eye },
                        { id: 'human', label: '7. Supervisão Humana', icon: Lock },
                        { id: 'monitor', label: '8. Monitoramento', icon: BarChart3 },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === item.id
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 relative overflow-hidden">

                    {/* Background Grid Decoration */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)] pointer-events-none" />

                    {activeTab === 'overview' && (
                        <div className="relative z-10 space-y-6">
                            {/* ... Overview Content ... */}
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity className="text-blue-400" />
                                Live Governance Trace
                            </h2>

                            {/* Tabela Mock de Logs Recentes */}
                            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-slate-400 font-medium border-b border-white/10">
                                        <tr>
                                            <th className="px-6 py-4">Trace ID</th>
                                            <th className="px-6 py-4">Timestamp</th>
                                            <th className="px-6 py-4">Modelo</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Privacidade</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-slate-300">
                                        {loading ? (
                                            <tr><td colSpan={5} className="text-center py-8 text-slate-500">Carregando logs de auditoria...</td></tr>
                                        ) : (
                                            recentLogs.map((log: any) => (
                                                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 font-mono text-xs text-slate-500" title={log.trace_id}>
                                                        {log.trace_id.substring(0, 12)}...
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-400">
                                                        {new Date(log.created_at).toLocaleTimeString()}
                                                    </td>
                                                    <td className="px-6 py-4">{log.Model_name || "Unknown"}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${log.verdict === 'BLOCKED' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                            }`}>
                                                            {log.verdict}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full ${log.risk_score > 0.5 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                                                    style={{ width: `${(1 - log.risk_score) * 100}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-xs text-slate-500">{log.risk_score > 0.5 ? 'Medium' : 'High'}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Integração Widget Snippet */}
                            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/10 border border-purple-500/20 mt-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Injete Transparência no seu Frontend</h3>
                                        <p className="text-slate-400 text-sm max-w-xl">
                                            Copie o snippet abaixo para instalar o Widget de Explicação (XAI) no seu site e garantir conformidade com o Art. 20 da LGPD (Direito à Explicação).
                                        </p>
                                    </div>
                                    <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-cyan-400 border border-white/10 w-[450px]">
                                        {`<script src="https://api.algorbrasil.com/widget.js" \n  data-token="pk_live_51M..." \n  data-theme="dark">\n</script>`}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {activeTab === 'policy' && <PolicyManager />}

                    {activeTab !== 'overview' && activeTab !== 'policy' && (
                        <div className="flex flex-col items-center justify-center h-[400px] text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                <Lock className="text-slate-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Módulo em Desenvolvimento</h3>
                            <p className="text-slate-400 max-w-md mt-2">
                                A implementação técnica desta etapa da metodologia (item {activeTab}) será liberada na próxima sprint do roadmap v10.5.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
