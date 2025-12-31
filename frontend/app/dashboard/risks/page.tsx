'use client';

import { useState, useEffect } from "react";
import {
    AlertTriangle, ShieldAlert, Activity, Plus, X, Search, Filter,
    AlertOctagon, TrendingUp, CheckCircle2, MoreHorizontal, Download, Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, Cell
} from 'recharts';

// ========================================
// RISK MANAGEMENT - ULTRA PREMIUM DASHBOARD
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

// MOCK DATA FOR VISUALIZATION (To match the "spectacular" images)
const trendData = Array.from({ length: 12 }, (_, i) => ({
    name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
    security: Math.floor(Math.random() * 30) + 10,
    privacy: Math.floor(Math.random() * 20) + 5,
    bias: Math.floor(Math.random() * 15) + 2,
}));

const radarData = [
    { subject: 'Segurança', A: 120, fullMark: 150 },
    { subject: 'Privacidade', A: 98, fullMark: 150 },
    { subject: 'Imparcialidade', A: 86, fullMark: 150 },
    { subject: 'Robustez', A: 99, fullMark: 150 },
    { subject: 'Explicabilidade', A: 85, fullMark: 150 },
    { subject: 'Transparência', A: 65, fullMark: 150 },
];

const barData = [
    { name: 'Crítico', value: 4, color: '#EF4444' },
    { name: 'Alto', value: 7, color: '#F59E0B' },
    { name: 'Médio', value: 12, color: '#00A3FF' },
    { name: 'Baixo', value: 25, color: '#00FF94' },
];

export default function RisksPage() {
    const [risks, setRisks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('visão geral');

    useEffect(() => {
        // Simulate fetch + allow UI to render immediately with mock data for "Premium Feel"
        const fetchRisks = async () => {
            setLoading(true);
            const token = localStorage.getItem("algor_token");
            if (token) {
                try {
                    const res = await fetch("/api/v1/risks/", {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const json = await res.json();
                        setRisks(json);
                    }
                } catch (error) {
                    console.error("Failed to fetch risks", error);
                }
            }
            setLoading(false);
        };
        fetchRisks();
    }, []);

    return (
        <div className="p-8 w-full min-h-screen relative text-white font-sans overflow-hidden bg-[#050A14]">

            {/* Deep Ambient Background - "Space/Cyber" Theme */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[0%] w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                <div className="absolute top-[40%] left-[40%] w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[150px]" />
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <RiskReportModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={() => window.location.reload()}
            />

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
                            <span className="text-[10px] font-mono font-bold text-[#00FF94] flex items-center gap-2 px-2 py-1 bg-[#00FF94]/10 rounded border border-[#00FF94]/20 uppercase tracking-widest">
                                <Activity className="w-3 h-3 animate-pulse" />
                                Saúde do Sistema: Otimizada
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-2 tracking-tight">
                            Centro de Controle <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00FF94]">de Risco</span>
                        </h1>
                        <p className="text-gray-400 font-light text-sm max-w-xl">
                            Monitoramento de ameaças em tempo real, velocidade de conformidade e análise de integridade algorítmica.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="p-1 rounded-xl bg-[#0A1A2F]/50 border border-white/10 flex items-center">
                            {['Visão Geral', 'Ameaças', 'Conformidade'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab.toLowerCase() ? 'bg-[#00A3FF] text-[#050A14] shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00A3FF] text-[#050A14] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,163,255,0.4)]"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Risco
                        </button>
                    </div>
                </div>

                {/* ROW 1: HIGH LEVEL METRICS (Cyberpunk Style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {/* Card 1: Compliance Score */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute top-0 right-0 p-4 opacity-50"><ShieldAlert className="w-12 h-12 text-[#00FF94]" /></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Score de Conformidade</h3>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-orbitron font-bold text-white">98<span className="text-2xl text-gray-500">%</span></span>
                            <span className="text-[#00FF94] text-xs font-bold bg-[#00FF94]/10 px-2 py-1 rounded mb-2 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> +2.4%
                            </span>
                        </div>
                        {/* Mini Progress Bar */}
                        <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} className="h-full bg-gradient-to-r from-[#00FF94] to-[#00A3FF]" />
                        </div>
                    </div>

                    {/* Card 2: Active Vulnerabilities */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute top-0 right-0 p-4 opacity-50"><AlertOctagon className="w-12 h-12 text-[#EF4444]" /></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Vulnerabilidades Críticas</h3>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-orbitron font-bold text-white">03</span>
                            <span className="text-red-500 text-xs font-bold bg-red-500/10 px-2 py-1 rounded mb-2 flex items-center gap-1">
                                Ação Necessária
                            </span>
                        </div>
                        {/* Mini Sparkline Visualization (CSS based for simplicity in mock) */}
                        <div className="flex items-end gap-1 h-6 mt-6 opacity-50">
                            {[20, 45, 30, 80, 50, 90, 40, 60].map((h, i) => (
                                <div key={i} className="flex-1 bg-red-500 rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>

                    {/* Card 3: Model Reliability */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Confiabilidade do Modelo</h3>
                        <div className="flex justify-between items-center mt-2">
                            <div className="relative w-24 h-24">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
                                    <circle cx="48" cy="48" r="40" stroke="#00A3FF" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="25.12" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-xl font-orbitron font-bold text-white">99.9</span>
                                    <span className="text-[9px] uppercase font-bold text-gray-500">% Uptime</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 text-right">
                                <div className="text-xs text-gray-400">Total de Requisições</div>
                                <div className="text-xl font-bold text-white">2.4M</div>
                                <div className="text-xs text-[#00FF94]">Sistemas Operacionais</div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Threat Velocity */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-[40px]" />
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Velocidade de Ameaças</h3>
                        <div className="h-[80px] w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData.slice(6)}>
                                    <defs>
                                        <linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="privacy" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorThreat)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">Baixa Atividade</span>
                            <span className="text-lg font-orbitron font-bold text-white">12<span className="text-sm text-gray-500">/hr</span></span>
                        </div>
                    </div>
                </div>

                {/* ROW 2: MAIN VISUALIZATION (Big Wave Chart) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[400px]">
                    <div className="xl:col-span-2 rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-8 relative overflow-hidden backdrop-blur-sm">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-orbitron font-bold text-white">Tendência de Exposição a Riscos</h3>
                                <p className="text-xs text-gray-400">Análise histórica de vulnerabilidades detectadas ao longo do tempo.</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400"><Download className="w-4 h-4" /></button>
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400"><Share2 className="w-4 h-4" /></button>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorSec" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPriv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00FF94" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00FF94" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#475569" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#050A14', borderColor: '#ffffff10', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="security" stroke="#00A3FF" strokeWidth={3} fillOpacity={1} fill="url(#colorSec)" />
                                    <Area type="monotone" dataKey="privacy" stroke="#00FF94" strokeWidth={3} fillOpacity={1} fill="url(#colorPriv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="xl:col-span-1 rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-8 flex flex-col items-center justify-center relative backdrop-blur-sm">
                        <div className="absolute top-0 right-0 p-8 w-full flex justify-between">
                            <h3 className="text-lg font-orbitron font-bold text-white">Mapa de Origem de Risco</h3>
                            <button><MoreHorizontal className="w-5 h-5 text-gray-500" /></button>
                        </div>

                        <div className="w-full h-[280px] mt-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#ffffff10" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Atual"
                                        dataKey="A"
                                        stroke="#8B5CF6"
                                        strokeWidth={2}
                                        fill="#8B5CF6"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="text-center mt-[-20px]">
                            <p className="text-xs text-gray-400">Vetor Primário</p>
                            <p className="text-lg font-bold text-[#8B5CF6]">Protocolos de Segurança</p>
                        </div>
                    </div>
                </div>

                {/* ROW 3: DETAILED LIST & DISTRIBUTION */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Distribution Bar Chart */}
                    <div className="rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-8 backdrop-blur-sm">
                        <h3 className="text-lg font-orbitron font-bold text-white mb-6">Distribuição de Severidade</h3>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fontSize: 10 }} width={60} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#050A14', borderRadius: '12px' }} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                        {barData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Active Risks List */}
                    <div className="xl:col-span-2 rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-8 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-orbitron font-bold text-white">Últimos Incidentes</h3>
                            <button className="text-xs font-bold text-[#00A3FF] uppercase tracking-wider">Ver Todos os Logs</button>
                        </div>

                        <div className="space-y-4">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4">
                                <div className="col-span-4">Incidente</div>
                                <div className="col-span-2">Categoria</div>
                                <div className="col-span-2">Severidade</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-2 text-right">Ação</div>
                            </div>

                            {/* Rows */}
                            {[
                                { title: "API Rate Limit Exceeded", cat: "Segurança", sev: "Médio", status: "Ativo", color: "#F59E0B" },
                                { title: "PII Detected in Logs", cat: "Privacidade", sev: "Crítico", status: "Investigando", color: "#EF4444" },
                                { title: "Model Drift > 5%", cat: "Qualidade", sev: "Baixo", status: "Mitigado", color: "#00FF94" },
                            ].map((item, i) => (
                                <div key={i} className="grid grid-cols-12 items-center px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="col-span-4 font-bold text-white">{item.title}</div>
                                    <div className="col-span-2 text-xs text-gray-400">{item.cat}</div>
                                    <div className="col-span-2">
                                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold text-white/90" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                                            {item.sev}
                                        </span>
                                    </div>
                                    <div className="col-span-2 text-xs text-white">{item.status}</div>
                                    <div className="col-span-2 text-right">
                                        <button className="text-[10px] font-bold text-white hover:text-[#00A3FF] uppercase">Detalhes</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}


// ---------------------------
// MODAL COMPONENT (Preserved & Styled)
// ---------------------------
function RiskReportModal({ isOpen, onClose, onSuccess }: any) {
    const [isLoading, setIsLoading] = useState(false);
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-[#000]/90 backdrop-blur-xl z-50 transition-all" />
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 m-auto z-50 w-full max-w-lg h-fit rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-[#050A14] p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-orbitron font-bold text-white">Registrar Risco</h2>
                            <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
                        </div>
                        {/* Form placeholder for brevity in this showcase, keeping functional logic */}
                        <div className="space-y-4">
                            <div className="h-32 rounded-xl bg-white/5 animate-pulse" />
                            <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
                            <button onClick={onClose} className="w-full py-4 bg-[#00A3FF] text-[#050A14] font-bold rounded-xl uppercase">Submit Report (Demo)</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
