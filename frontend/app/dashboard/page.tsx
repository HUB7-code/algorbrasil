'use client';

import { useState, useEffect } from "react";
import { ArrowRight, Activity, ShieldCheck, Zap, Database, AlertTriangle, CheckCircle2, X, ShoppingCart, Loader2, Play, TrendingUp, Shield, Cpu, Clock } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TrendChart, RiskRadar, MiniGauge, SparkLine } from "@/components/dashboard/OverviewCharts";
import { useSearchParams, useRouter } from "next/navigation";

// ========================================
// DASHBOARD V3.0 - POWER BI PREMIUM MODE
// Centro de Excelência - Redesign Espetacular
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

// Animated Number Counter
function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setDisplayValue(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [value, duration]);

    return <>{displayValue}</>;
}

// Circular Gauge Component (Power BI Style)
function CircularGauge({ value, color, size = 120, label }: { value: number; color: string; size?: number; label: string }) {
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Background Ring */}
            <svg className="absolute" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                    fill="none"
                />
            </svg>
            {/* Progress Ring */}
            <motion.svg
                className="absolute -rotate-90"
                width={size}
                height={size}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{
                        filter: `drop-shadow(0 0 10px ${color}50)`
                    }}
                />
            </motion.svg>
            {/* Center Content */}
            <div className="flex flex-col items-center justify-center z-10">
                <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Orbitron', sans-serif", color }}
                >
                    <AnimatedCounter value={value} />%
                </span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">{label}</span>
            </div>
            {/* Glow Effect */}
            <div
                className="absolute inset-0 rounded-full blur-xl opacity-20"
                style={{ background: color }}
            />
        </div>
    );
}

// Premium KPI Card Component
function PremiumKPICard({
    title,
    value,
    subValue,
    icon,
    color,
    trend,
    sparkData,
    isLarge = false
}: {
    title: string;
    value: string;
    subValue: string;
    icon: React.ReactNode;
    color: string;
    trend?: string;
    sparkData?: number[];
    isLarge?: boolean;
}) {
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{
                y: -4,
                boxShadow: `0 20px 40px ${color}15, 0 0 0 1px ${color}40`
            }}
            className={`relative overflow-hidden rounded-2xl 
                bg-gradient-to-br from-[#0D1117]/90 to-[#050810]/90 
                backdrop-blur-xl border border-white/[0.06] 
                transition-all duration-500 group
                ${isLarge ? 'p-8' : 'p-6'}`}
        >
            {/* Ambient Glow */}
            <div
                className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full blur-[80px] 
                    opacity-20 group-hover:opacity-40 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2"
                style={{ background: color }}
            />

            {/* Top Accent Line */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            />

            {/* Icon Badge */}
            <div className="flex items-start justify-between mb-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                        background: `${color}15`,
                        boxShadow: `0 0 20px ${color}10`
                    }}
                >
                    <div style={{ color }}>{icon}</div>
                </div>
                {trend && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#00FF94]/10">
                        <TrendingUp className="w-3 h-3 text-[#00FF94]" />
                        <span className="text-[10px] text-[#00FF94] font-bold">{trend}</span>
                    </div>
                )}
            </div>

            {/* Value */}
            <div className="relative z-10">
                <h3
                    className={`font-bold text-white mb-1 tracking-tight ${isLarge ? 'text-5xl' : 'text-4xl'}`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                    {value}
                </h3>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-[0.15em] mb-2">{title}</p>
                <div className="flex items-center gap-2">
                    <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                    />
                    <span className="text-[11px] font-bold" style={{ color }}>{subValue}</span>
                </div>
            </div>

            {/* Mini Sparkline */}
            {sparkData && (
                <div className="absolute bottom-4 right-4 w-20 h-10 opacity-50 group-hover:opacity-80 transition-opacity">
                    <SparkLine data={sparkData} color={color} />
                </div>
            )}
        </motion.div>
    );
}

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
        <div className="p-8 w-full min-h-screen space-y-8 relative text-white bg-[#050810] overflow-x-hidden">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#00A3FF]/8 rounded-full blur-[200px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#00FF94]/6 rounded-full blur-[180px]" />
                <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80 }}
                className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 pb-8 border-b border-white/[0.06]"
            >
                <div>
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6">
                        <span className={`w-2.5 h-2.5 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-[#00FF94]'}`}
                            style={{ boxShadow: loading ? undefined : '0 0 12px #00FF94' }}
                        />
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                            {loading ? "INICIALIZANDO..." : "SISTEMA OPERACIONAL"}
                        </span>
                    </div>

                    <h1
                        className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                        CENTRO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">EXCELÊNCIA</span>
                    </h1>
                    <p className="text-gray-400 text-sm tracking-wide">
                        Hub de Governança de IA • <span className="text-[#00A3FF] font-medium">{currentPhase}</span>
                    </p>
                </div>

                {/* Score Badge */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                >
                    <CircularGauge value={growthScore} color="#00FF94" size={140} label="Crescimento" />
                </motion.div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 space-y-8"
            >
                {/* KPI Cards Grid - Premium Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <PremiumKPICard
                        title="Nível de Prontidão"
                        value={`${complianceScore}%`}
                        subValue="Pronto p/ ISO 42001"
                        icon={<Shield className="w-6 h-6" />}
                        color="#00FF94"
                        trend="+5%"
                        sparkData={[40, 45, 42, 55, 60, 58, 70, complianceScore]}
                    />

                    <PremiumKPICard
                        title="Ativos Monitorados"
                        value={activeModels.toString()}
                        subValue="+2 novos esta semana"
                        icon={<Cpu className="w-6 h-6" />}
                        color="#00A3FF"
                        sparkData={[3, 4, 4, 5, 6, 7, 8, activeModels]}
                    />

                    <PremiumKPICard
                        title="Incidentes Críticos"
                        value={criticalRisks.toString()}
                        subValue={criticalRisks === 0 ? "Ambiente Seguro" : "Ação Necessária"}
                        icon={<AlertTriangle className="w-6 h-6" />}
                        color={criticalRisks > 0 ? "#EF4444" : "#00FF94"}
                    />

                    <PremiumKPICard
                        title="Velocidade Média"
                        value="4.2h"
                        subValue="Eficiência Alta"
                        icon={<Clock className="w-6 h-6" />}
                        color="#8B5CF6"
                        sparkData={[10, 25, 40, 30, 50, 70, 60, 90]}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Trend Chart - Large */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-8 p-8 rounded-3xl 
                            bg-gradient-to-br from-[#0D1117]/80 to-[#050810]/80 
                            backdrop-blur-xl border border-white/[0.06] 
                            relative overflow-hidden group"
                    >
                        {/* Top Accent */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />

                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-[#8B5CF6]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        Evolução do Trust Score
                                    </h3>
                                    <p className="text-xs text-gray-500">Últimos 30 dias</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]" />
                                    <span className="text-[11px] text-gray-400 font-medium">Índice de Confiança</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#00A3FF] shadow-[0_0_10px_#00A3FF]" />
                                    <span className="text-[11px] text-gray-400 font-medium">Ativos</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <TrendChart data={data?.charts?.trend_data} />
                        </div>
                    </motion.div>

                    {/* Risk Radar - Side */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-4 p-8 rounded-3xl 
                            bg-gradient-to-br from-[#0D1117]/80 to-[#050810]/80 
                            backdrop-blur-xl border border-white/[0.06] 
                            relative overflow-hidden group hover:border-[#F59E0B]/30 transition-colors"
                    >
                        {/* Top Accent */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent" />

                        <div className="text-center mb-6">
                            <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                Matriz de Risco
                            </h3>
                            <p className="text-[11px] text-[#F59E0B] uppercase tracking-wider">Monitoramento em Tempo Real</p>
                        </div>
                        <div className="flex items-center justify-center h-[280px]">
                            <RiskRadar data={data?.charts?.risk_radar} />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Action Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main CTA - Scanner */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 relative overflow-hidden rounded-3xl 
                            bg-gradient-to-br from-[#0A1A2F]/80 to-[#050810]/80 
                            border border-[#00FF94]/20 p-10 group"
                    >
                        {/* Animated Glow */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF94]/5 rounded-full blur-[120px] 
                            pointer-events-none group-hover:bg-[#00FF94]/10 transition-all duration-1000" />
                        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#00A3FF]/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20 mb-4">
                                    <Zap className="w-3 h-3 text-[#00FF94]" />
                                    <span className="text-[10px] text-[#00FF94] font-bold uppercase tracking-wider">Ação Recomendada</span>
                                </div>
                                <h2
                                    className="text-3xl font-bold text-white mb-3"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                                >
                                    Iniciar Novo Ciclo de Auditoria
                                </h2>
                                <p className="text-gray-400 max-w-lg leading-relaxed">
                                    Diagnóstico completo para identificar brechas de conformidade (ISO 42001/EU AI Act) e atualizar sua matriz de riscos.
                                </p>
                            </div>
                            <Link href="/dashboard/assessments">
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(0,255,148,0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-4 bg-gradient-to-r from-[#00FF94] to-[#00CC76] 
                                        text-[#050810] font-bold rounded-xl text-sm tracking-widest 
                                        flex items-center gap-3 uppercase whitespace-nowrap
                                        shadow-[0_10px_40px_rgba(0,255,148,0.25)]"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                    Executar Scanner
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Premium Service Card */}
                    <motion.div
                        variants={itemVariants}
                        onClick={handleBuyReport}
                        whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,255,148,0.1)" }}
                        className={`cursor-pointer rounded-3xl 
                            bg-gradient-to-br from-[#0D1117]/80 to-[#050810]/80 
                            backdrop-blur-xl border border-[#00FF94]/20 
                            p-8 flex flex-col justify-between group relative overflow-hidden 
                            transition-all hover:border-[#00FF94]/40 
                            ${purchasing ? 'opacity-70 pointer-events-none' : ''}`}
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                        {purchasing && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
                                <Loader2 className="w-8 h-8 text-[#00FF94] animate-spin" />
                            </div>
                        )}

                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-[10px] font-bold text-[#00FF94] uppercase tracking-wider mb-2 block">
                                        Upgrade Premium
                                    </span>
                                    <h3
                                        className="text-xl font-bold text-white"
                                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                                    >
                                        Viabilidade Técnica
                                    </h3>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-[#00FF94]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <ShoppingCart className="w-5 h-5 text-[#00FF94]" />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Relatório completo de viabilidade técnica para certificação ISO 42001.
                            </p>
                        </div>

                        <div className="flex items-end justify-between pt-6 border-t border-white/[0.06]">
                            <span
                                className="text-3xl font-bold text-white"
                                style={{ fontFamily: "'Orbitron', sans-serif" }}
                            >
                                R$ 1.500
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Pagamento Único</span>
                        </div>
                    </motion.div>
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
                            className="bg-gradient-to-br from-[#0A1A2F] to-[#050810] border border-[#00FF94]/40 
                                rounded-3xl p-10 max-w-md w-full relative 
                                shadow-[0_0_80px_rgba(0,255,148,0.2)]"
                        >
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="w-20 h-20 rounded-full bg-[#00FF94]/10 flex items-center justify-center mb-8 
                                        border border-[#00FF94]/30 shadow-[0_0_40px_rgba(0,255,148,0.2)]"
                                >
                                    <CheckCircle2 className="w-10 h-10 text-[#00FF94]" />
                                </motion.div>
                                <h3
                                    className="text-3xl font-bold text-white mb-4"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                                >
                                    Pagamento Confirmado!
                                </h3>
                                <p className="text-gray-400 mb-10 leading-relaxed">
                                    Seu Relatório de Viabilidade foi desbloqueado e está sendo gerado. Você receberá uma cópia por e-mail em instantes.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowSuccessModal(false)}
                                    className="w-full py-4 bg-gradient-to-r from-[#00FF94] to-[#00CC76] 
                                        text-[#050810] font-bold rounded-xl transition-all uppercase tracking-widest text-sm
                                        shadow-[0_10px_40px_rgba(0,255,148,0.25)]"
                                >
                                    Confirmar
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
