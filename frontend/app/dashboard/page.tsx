'use client';

import { useState, useEffect } from "react";
import {
    Activity, ShieldCheck, Zap, Database, AlertTriangle, CheckCircle2, X,
    ShoppingCart, Loader2, Play, TrendingUp, Shield, Cpu, Clock, Lock,
    Crown, MoreHorizontal, Download, Share2, Search, Filter
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, Cell
} from 'recharts';

// ========================================
// CENTRO DE EXCELÊNCIA - ULTRA PREMIUM DASHBOARD
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

// MOCK DATA (High Fidelity for Sci-Fi Look)
const trendData = Array.from({ length: 12 }, (_, i) => ({
    name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
    trust: Math.floor(Math.random() * 20) + 70,
    activity: Math.floor(Math.random() * 50) + 30,
    compliance: Math.floor(Math.random() * 15) + 80,
}));

const radarData = [
    { subject: 'Segurança', A: 95, B: 70, fullMark: 100 },
    { subject: 'Privacidade', A: 88, B: 60, fullMark: 100 },
    { subject: 'Ética', A: 75, B: 50, fullMark: 100 },
    { subject: 'Robustez', A: 90, B: 65, fullMark: 100 },
    { subject: 'Conformidade', A: 98, B: 80, fullMark: 100 },
    { subject: 'Transparência', A: 82, B: 55, fullMark: 100 },
];

const activityData = [
    { name: 'Seg', value: 45 },
    { name: 'Ter', value: 52 },
    { name: 'Qua', value: 38 },
    { name: 'Qui', value: 65 },
    { name: 'Sex', value: 48 },
    { name: 'Sab', value: 20 },
    { name: 'Dom', value: 15 },
];

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // UI State
    const [activeTab, setActiveTab] = useState('visão geral');

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

    const handleUpgradeToAssociate = () => {
        router.push("/dashboard/membership");
    };

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

    // Data Mapping
    const complianceScore = data?.kpis?.trust_score || 92;
    const criticalRisks = data?.critical_alerts || 0;
    const activeModels = data?.kpis?.active_models || 14;

    const isCommunityUser = data?.user_status?.upgrade_required === true;
    const userName = data?.user_status?.name || "Visitante";

    return (
        <div className="p-8 w-full min-h-screen relative text-white font-sans overflow-hidden bg-[#050A14]">

            {/* Deep Ambient Background - "Space/Cyber" Theme */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[0%] w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[150px]" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-[1920px] mx-auto space-y-8"
            >

                {/* TOP BAR: Title & Global Actions */}
                <div className="flex flex-col xl:flex-row justify-between items-end gap-6 pb-6 border-b border-white/5">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] font-mono font-bold flex items-center gap-2 px-2 py-1 rounded border uppercase tracking-widest ${isCommunityUser ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-[#00FF94]/10 text-[#00FF94] border-[#00FF94]/20'}`}>
                                <Activity className="w-3 h-3 animate-pulse" />
                                {isCommunityUser ? "Acesso Restrito" : "Sistema Operacional: Online"}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-2 tracking-tight">
                            {isCommunityUser ? "Portal do" : "Centro de"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00FF94]">{isCommunityUser ? "Membro" : "Excelência"}</span>
                        </h1>
                        <p className="text-gray-400 font-light text-sm max-w-xl">
                            {isCommunityUser
                                ? "Complete seu perfil para desbloquear o poder total da IA Vertical."
                                : "Visão geral da saúde do ecossistema de IA, governança e conformidade."}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="p-1 rounded-xl bg-[#0A1A2F]/50 border border-white/10 flex items-center">
                            {['Visão Geral', 'Ativos', 'Auditoria'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab.toLowerCase() ? 'bg-[#00A3FF] text-[#050A14] shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {isCommunityUser ? (
                            <button
                                onClick={handleUpgradeToAssociate}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                            >
                                <Crown className="w-4 h-4" />
                                Upgrade
                            </button>
                        ) : (
                            <Link href="/dashboard/assessments">
                                <button className="px-6 py-3 rounded-xl bg-[#00FF94] text-[#050A14] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,148,0.4)]">
                                    <Play className="w-4 h-4" />
                                    Scanner IA
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* ROW 1: SYSTEM VITALITY (KPIs) */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {/* KPI 1: Trust Score */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            {isCommunityUser ? <Lock className="w-12 h-12 text-gray-700" /> : <ShieldCheck className="w-12 h-12 text-[#00FF94]" />}
                        </div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Trust Score</h3>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-orbitron font-bold text-white">{isCommunityUser ? "--" : complianceScore}<span className="text-2xl text-gray-500">%</span></span>
                            {!isCommunityUser && (
                                <span className="text-[#00FF94] text-xs font-bold bg-[#00FF94]/10 px-2 py-1 rounded mb-2 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> +1.2%
                                </span>
                            )}
                        </div>
                        {isCommunityUser ? (
                            <div className="mt-6 text-xs text-[#F59E0B] font-bold uppercase tracking-wider flex items-center gap-2">
                                <Lock className="w-3 h-3" />
                                Requer Assinatura
                            </div>
                        ) : (
                            <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${complianceScore}%` }} className="h-full bg-gradient-to-r from-[#00FF94] to-[#00A3FF]" />
                            </div>
                        )}
                    </div>

                    {/* KPI 2: Active Models */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute top-0 right-0 p-4 opacity-50"><Cpu className="w-12 h-12 text-[#00A3FF]" /></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Modelos Ativos</h3>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-orbitron font-bold text-white">{activeModels}</span>
                            <span className="text-[#00A3FF] text-xs font-bold bg-[#00A3FF]/10 px-2 py-1 rounded mb-2 flex items-center gap-1">
                                Monitorados
                            </span>
                        </div>
                        <div className="flex items-end gap-1 h-6 mt-6 opacity-30">
                            {[40, 60, 50, 80, 70, 90, 85, 100].map((h, i) => (
                                <div key={i} className="flex-1 bg-[#00A3FF] rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>

                    {/* KPI 3: Critical Risks */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute top-0 right-0 p-4 opacity-50"><AlertTriangle className={`w-12 h-12 ${criticalRisks > 0 ? 'text-[#EF4444]' : 'text-[#00FF94]'}`} /></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Riscos Críticos</h3>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-orbitron font-bold text-white">{criticalRisks}</span>
                            {criticalRisks > 0 ? (
                                <span className="text-[#EF4444] text-xs font-bold bg-[#EF4444]/10 px-2 py-1 rounded mb-2 flex items-center gap-1">
                                    Atenção
                                </span>
                            ) : (
                                <span className="text-[#00FF94] text-xs font-bold bg-[#00FF94]/10 px-2 py-1 rounded mb-2 flex items-center gap-1">
                                    Seguro
                                </span>
                            )}
                        </div>
                        <div className="mt-6 flex gap-2">
                            {[1, 1, 1, 1, 1].map((_, i) => (
                                <div key={i} className={`h-1.5 flex-1 rounded-full ${i < criticalRisks ? 'bg-[#EF4444]' : 'bg-white/5'}`} />
                            ))}
                        </div>
                    </div>

                    {/* KPI 4: Infrastructure */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#8B5CF6]/10 rounded-full blur-[40px]" />
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Uso de Infra</h3>
                        <div className="h-[80px] w-full mt-2 relative">
                            {/* Mini circular or area chart visual */}
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={activityData}>
                                    <defs>
                                        <linearGradient id="colorInfra" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorInfra)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">Latência: 24ms</span>
                            <span className="text-lg font-orbitron font-bold text-white">45<span className="text-sm text-gray-500">%</span></span>
                        </div>
                    </div>
                </div>

                {/* ROW 2: MAIN CHARTS */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[450px]">
                    {/* Main Area Chart */}
                    <div className="xl:col-span-2 rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-8 relative overflow-hidden backdrop-blur-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-orbitron font-bold text-white">Evolução do Trust Score</h3>
                                <p className="text-xs text-gray-400">Análise de tendências de conformidade nos últimos 12 meses.</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400"><Download className="w-4 h-4" /></button>
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400"><Share2 className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-0">
                            {isCommunityUser ? (
                                <div className="h-full w-full flex flex-col items-center justify-center bg-[#050A14] rounded-xl border border-white/5 border-dashed">
                                    <Lock className="w-10 h-10 text-gray-600 mb-4" />
                                    <h4 className="text-white font-bold mb-2">Visualização Avançada Bloqueada</h4>
                                    <p className="text-gray-500 text-sm mb-4 max-w-xs text-center">Faça um upgrade para visualizar o histórico detalhado de conformidade.</p>
                                    <button onClick={handleUpgradeToAssociate} className="text-[#F59E0B] text-xs font-bold uppercase tracking-widest hover:underline">Liberar Acesso</button>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData}>
                                        <defs>
                                            <linearGradient id="colorTrust" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00FF94" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#00FF94" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                        <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#475569" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#050A14', borderColor: '#ffffff10', borderRadius: '12px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="trust" stroke="#00FF94" strokeWidth={3} fillOpacity={1} fill="url(#colorTrust)" />
                                        <Area type="monotone" dataKey="activity" stroke="#00A3FF" strokeWidth={3} fillOpacity={1} fill="url(#colorAct)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Radar Chart */}
                    <div className="xl:col-span-1 rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-8 flex flex-col relative backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-orbitron font-bold text-white">Matriz de Maturidade</h3>
                            <button><MoreHorizontal className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Cobertura dos pilares de IA Responsável.</p>

                        <div className="flex-1 w-full min-h-0 relative">
                            {isCommunityUser && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-[2px] rounded-xl">
                                    <Lock className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#ffffff10" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Maturidade"
                                        dataKey="A"
                                        stroke="#8B5CF6"
                                        strokeWidth={2}
                                        fill="#8B5CF6"
                                        fillOpacity={0.4}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 flex justify-between items-end border-t border-white/5 pt-4">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 block">Pilar Mais Forte</span>
                                <span className="text-sm font-bold text-white">Conformidade (98%)</span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 block text-right">Atenção</span>
                                <span className="text-sm font-bold text-white">Ética (75%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROW 3: LISTS & ACTIVITIES */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Activity Feed */}
                    <div className="xl:col-span-2 rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-8 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-orbitron font-bold text-white">Atividade Recente do Sistema</h3>
                            <button className="text-xs font-bold text-[#00A3FF] uppercase tracking-wider">Ver Audit Log</button>
                        </div>

                        <div className="space-y-4">
                            {/* Mock Activity Items */}
                            {[
                                { action: "Novo Modelo Registrado", target: "Credit_Scoring_V2", user: "Admin", time: "2 min atrás", icon: Database, color: "#00A3FF" },
                                { action: "Auditoria Completada", target: "Relatório Mensal ISO", user: "System", time: "1h atrás", icon: CheckCircle2, color: "#00FF94" },
                                { action: "Alerta de Viés", target: "Reconhecimento Facial", user: "Watchdog", time: "3h atrás", icon: AlertTriangle, color: "#F59E0B" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                                    <div className={`p-2 rounded-lg bg-[${item.color}]/10 border border-[${item.color}]/20`}>
                                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-white">{item.action}</h4>
                                        <p className="text-xs text-gray-400">Alvo: <span className="text-gray-300">{item.target}</span> • Por: {item.user}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Upgrade / Status Card */}
                    <div className="rounded-[24px] bg-gradient-to-br from-[#0A1A2F]/60 to-[#000]/60 border border-[#F59E0B]/20 p-8 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-[#F59E0B]/5 rounded-full blur-[60px]" />

                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 mb-4">
                                <Crown className="w-4 h-4 text-[#F59E0B]" />
                                <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider">Marketplace</span>
                            </div>
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">Relatório de Viabilidade</h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                Diagnóstico técnico profundo para certificação ISO 42001. Apenas para membros.
                            </p>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex items-baseline justify-between">
                                <span className="text-3xl font-orbitron font-bold text-white">R$ 1.500</span>
                                <span className="text-xs text-gray-500 uppercase">Pagamento Único</span>
                            </div>
                            <button
                                onClick={handleBuyReport}
                                disabled={purchasing}
                                className="w-full py-4 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.3)]"
                            >
                                {purchasing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
                                {purchasing ? "Processando..." : "Adquirir Relatório"}
                            </button>
                        </div>
                    </div>
                </div>

            </motion.div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0A1A2F] border border-[#00FF94]/40 rounded-[24px] p-10 max-w-md w-full relative shadow-[0_0_80px_rgba(0,255,148,0.2)] text-center"
                        >
                            <button onClick={() => setShowSuccessModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                            <div className="w-20 h-20 rounded-full bg-[#00FF94]/10 flex items-center justify-center mb-8 mx-auto border border-[#00FF94]/30 shadow-[0_0_40px_rgba(0,255,148,0.2)]">
                                <CheckCircle2 className="w-10 h-10 text-[#00FF94]" />
                            </div>
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">Pagamento Confirmado!</h3>
                            <p className="text-gray-400 mb-8">Seu Relatório de Viabilidade foi desbloqueado e enviado para seu e-mail.</p>
                            <button onClick={() => setShowSuccessModal(false)} className="w-full py-4 bg-[#00FF94] text-[#050A14] font-bold rounded-xl uppercase tracking-widest text-sm hover:brightness-110">Confirmar</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
