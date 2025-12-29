'use client';

import { useState, useEffect } from "react";
import { ArrowRight, Activity, ShieldCheck, Zap, Database, AlertTriangle, HelpCircle, CheckCircle2, Lock, Play, X, ShoppingCart, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TrendChart, RiskRadar, MiniGauge, SparkLine } from "@/components/dashboard/OverviewCharts";
import { useSearchParams, useRouter } from "next/navigation";

// ========================================
// DASHBOARD V2.0 - COMMAND CENTER
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// Mock data for sparklines
const sparkData = [40, 30, 45, 60, 55, 70, 65, 80];

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem("algor_token");
            if (!token) {
                // Determine if we should mock for demo or wait
                setTimeout(() => setLoading(false), 800);
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

        if (searchParams.get("payment_success") === "true") {
            setShowSuccessModal(true);
            router.replace("/dashboard");
        }
    }, [searchParams, router]);

    const handleBuyReport = async () => {
        setPurchasing(true);
        const token = localStorage.getItem("algor_token");

        try {
            const res = await fetch("/api/v1/payments/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ product_type: "viability_report" })
            });

            if (res.ok) {
                const json = await res.json();
                if (json.checkout_url) {
                    window.location.href = json.checkout_url;
                }
            }
        } catch (error) {
            console.error("Payment error:", error);
        } finally {
            setPurchasing(false);
        }
    };

    // Derived States
    const complianceScore = data?.kpis?.trust_score || 0;
    const criticalRisks = data?.critical_alerts || 0;
    const activeModels = data?.kpis?.active_models || 0;
    const growthScore = data?.kpis?.growth_score || 0;

    let currentPhase = "01. FORTALECIMENTO";
    if (growthScore > 70) currentPhase = "02. EXPANSÃO";
    if (growthScore > 90) currentPhase = "03. AI-FIRST";

    return (
        <div className="p-8 w-full min-h-screen space-y-8 relative text-white font-sans bg-[#0A0E1A] overflow-x-hidden">
            {/* Ambient Background Glow */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#00A3FF]/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#00FF94]/5 rounded-full blur-[128px] pointer-events-none" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-white/5 pb-6"
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block w-2 h-2 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-[#00FF94] shadow-[0_0_10px_#00FF94]'}`}></span>
                        <span className="text-[10px] font-mono text-[#00FF94] uppercase tracking-[0.2em] font-bold">
                            {loading ? "INICIALIZANDO..." : "SISTEMA OPERACIONAL"}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold font-orbitron text-white mb-2 tracking-wide flex items-center gap-3">
                        CENTRO DE EXCELÊNCIA
                    </h1>
                    <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">
                        Hub de Governança de IA | <span className="text-[#00A3FF]">{currentPhase}</span>
                    </p>
                </div>

                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-[#0A1A2F]/80 backdrop-blur-md border border-[#00FF94]/30 rounded-lg shadow-[0_0_15px_rgba(0,255,148,0.1)]">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Score de Crescimento</p>
                        <p className="text-xl font-bold text-white font-mono">{growthScore}/100</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 space-y-6"
            >
                {/* KPI Cards Grid - Dense Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Readiness Gauge */}
                    <NewStatCard
                        title="Nível de Prontidão"
                        value={`${complianceScore}%`}
                        subValue="Pronto p/ ISO 42001"
                        icon={<ShieldCheck className="w-5 h-5" />}
                        color="#00FF94"
                        delay={0.1}
                    >
                        <div className="absolute right-2 bottom-2 opacity-50">
                            <MiniGauge value={complianceScore} color="#00FF94" />
                        </div>
                    </NewStatCard>

                    {/* Active Assets */}
                    <NewStatCard
                        title="Ativos Monitorados"
                        value={activeModels.toString()}
                        subValue="+2 novos essa semana"
                        icon={<Database className="w-5 h-5" />}
                        color="#00A3FF"
                        delay={0.2}
                    >
                        <div className="absolute bottom-6 left-6 w-24 h-8 opacity-70">
                            <SparkLine data={sparkData} color="#00A3FF" />
                        </div>
                    </NewStatCard>

                    {/* Critical Incidents */}
                    <NewStatCard
                        title="Incidentes Críticos"
                        value={criticalRisks.toString()}
                        subValue={criticalRisks === 0 ? "Ambiente Seguro" : "Ação Necessária"}
                        icon={<AlertTriangle className="w-5 h-5" />}
                        color={criticalRisks > 0 ? "#EF4444" : "#00FF94"}
                        delay={0.3}
                    />

                    {/* Velocity */}
                    <NewStatCard
                        title="Velocidade de Aprovação"
                        value="4.2h"
                        subValue="Eficiência Alta"
                        icon={<Zap className="w-5 h-5" />}
                        color="#8B5CF6"
                        delay={0.4}
                    >
                        <div className="absolute bottom-6 left-6 w-24 h-8 opacity-70">
                            <SparkLine data={[10, 25, 40, 30, 50, 70, 60, 90]} color="#8B5CF6" />
                        </div>
                    </NewStatCard>
                </div>

                {/* Main Interactive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[450px]">

                    {/* Trend Chart (Large) */}
                    <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0D1117]/80 backdrop-blur-xl border border-white/5 flex flex-col relative overflow-hidden group">
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                                <Activity className="w-4 h-4 text-[#8B5CF6]" />
                                Evolução do Trust Score
                            </h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                                    <span className="text-[10px] text-gray-400 font-mono">ÍNDICE DE CONFIANÇA</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />
                                    <span className="text-[10px] text-gray-400 font-mono">ATIVOS</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <TrendChart data={data?.charts?.trend_data} />
                        </div>
                    </div>

                    {/* Risk Radar (Side) */}
                    <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0D1117]/80 backdrop-blur-xl border border-white/5 flex flex-col relative overflow-hidden group hover:border-[#F59E0B]/30 transition-colors">
                        <div className="mb-4 text-center">
                            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Matriz de Risco</h3>
                            <p className="text-[10px] text-[#F59E0B] font-mono mt-1">MONITORAMENTO EM TEMPO REAL</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <RiskRadar data={data?.charts?.risk_radar} />
                        </div>
                    </div>
                </div>

                {/* Bottom Action Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main CTA Card */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#131825] to-[#0A0E1A] border border-white/10 p-8 group"
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00FF94]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#00FF94]/10 transition-colors duration-700" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold font-orbitron text-white mb-2">Iniciar Novo Ciclo de Auditoria</h2>
                                <p className="text-gray-400 max-w-lg text-sm">
                                    Diagnóstico completo para identificar brechas de conformidade (ISO 42001/EU AI Act) e atualizar sua matriz de riscos.
                                </p>
                            </div>
                            <Link href="/dashboard/assessments">
                                <button className="px-6 py-3 bg-white text-[#0A1A2F] font-bold rounded-xl hover:bg-[#00FF94] hover:text-[#0A1A2F] transition-all text-xs tracking-widest flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] uppercase">
                                    <Play className="w-4 h-4 fill-current" />
                                    Executar Scanner
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Premium Service Card */}
                    <div
                        onClick={handleBuyReport}
                        className={`cursor-pointer lg:col-span-1 rounded-2xl bg-[#0D1117]/60 backdrop-blur-md border border-[#00FF94]/20 p-6 flex flex-col justify-between group relative overflow-hidden transition-all hover:bg-[#00FF94]/5 ${purchasing ? 'opacity-70 pointer-events-none' : ''}`}
                    >
                        {purchasing && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
                                <Loader2 className="w-6 h-6 text-[#00FF94] animate-spin" />
                            </div>
                        )}
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-[10px] font-bold text-[#00FF94] uppercase tracking-wider mb-1 block">Upgrade Premium</span>
                                <h3 className="text-lg font-bold text-white">Viabilidade Técnica</h3>
                            </div>
                            <ShoppingCart className="w-5 h-5 text-gray-500 group-hover:text-[#00FF94] transition-colors" />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-end justify-between">
                                <span className="text-2xl font-mono text-white font-bold">R$ 1.500</span>
                                <span className="text-[10px] text-gray-400 uppercase">Pagamento Único</span>
                            </div>
                        </div>
                    </div>

                </div>

            </motion.div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0A1A2F] border border-[#00FF94]/50 rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(0,255,148,0.2)]"
                        >
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-[#00FF94]/10 flex items-center justify-center mb-6 border border-[#00FF94]/20">
                                    <CheckCircle2 className="w-8 h-8 text-[#00FF94]" />
                                </div>
                                <h3 className="text-2xl font-orbitron font-bold text-white mb-2">Pagamento Confirmado!</h3>
                                <p className="text-gray-400 mb-8 text-sm">
                                    Seu Relatório de Viabilidade foi desbloqueado e está sendo gerado. Você receberá uma cópia por e-mail em instantes.
                                </p>
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="w-full py-3 bg-[#00FF94] hover:bg-[#00CC76] text-black font-bold rounded-xl transition-all uppercase tracking-widest text-xs"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Reusable "StatCard" Component matching Admin Dashboard
function NewStatCard({ title, value, subValue, icon, color, delay, children }: any) {
    // Generate a subtle border color based on the prop color
    const borderColor = color ? `${color}40` : '#ffffff10'; // 25% opacity

    return (
        <div
            className="p-5 rounded-2xl bg-[#0D1117]/60 backdrop-blur-md border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all h-[140px]"
            style={{ borderColor: borderColor }}
        >
            {/* Background glow effect on hover */}
            <div className={`absolute top-0 right-0 p-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity blur-3xl rounded-full translate-x-10 -translate-y-10`} style={{ backgroundColor: color }} />

            <div className="flex justify-between items-start mb-2 relative z-10">
                <div className={`p-2 rounded-lg bg-white/5`} style={{ color: color }}>
                    {icon}
                </div>
                {/* Optional sparkline or extra graphic goes here via children, usually absolute positioned */}
            </div>

            <div className="relative z-10 mt-2">
                <h3 className="text-3xl font-bold text-white font-mono tracking-tight leading-none mb-1">{value}</h3>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">{title}</p>
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold" style={{ color: color }}>{subValue}</span>
                </div>
            </div>

            {/* Render children (sparklines/gauges) */}
            {children}
        </div>
    );
}
