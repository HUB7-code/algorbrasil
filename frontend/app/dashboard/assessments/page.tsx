"use client";

import { useState, useEffect } from "react";
import {
    ShieldCheck, Zap, Activity, FileText, Lock,
    Sparkles, Clock, Play, Search, Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import AssessmentWizard from "@/components/dashboard/assessments/AssessmentWizard";
import {
    RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip,
    LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';

// ========================================
// CENTRAL DE AUDITORIA - TACTICAL OPS DESIGN
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

// Protocol Data (Preserved)
const protocols = [
    {
        id: "iso-42001",
        title: "ISO 42001 Full Scan",
        category: "Certificação",
        description: "Diagnóstico completo de governança para certificação internacional.",
        rationale: "Obrigatório para contratos Enterprise.",
        icon: ShieldCheck,
        color: "#00FF94",
        cost: 2,
        duration: "45 min",
        accuracy: 98,
        isAvailable: true
    },
    {
        id: "lia-flash",
        title: "L.I.A. Flash",
        category: "Risco Rápido",
        description: "Avaliação de Impacto Algorítmico (LIA) expressa.",
        rationale: "Art. 38 LGPD: Alto risco detectado.",
        icon: Zap,
        color: "#00A3FF",
        cost: 1,
        duration: "15 min",
        accuracy: 92,
        isAvailable: true
    },
    {
        id: "data-clean-room",
        title: "Data Clean Room",
        category: "Privacidade",
        description: "Validação de ambiente seguro para dados sensíveis.",
        rationale: "Anonimização para Retail Media.",
        icon: Lock,
        color: "#8B5CF6",
        cost: 5,
        duration: "2 horas",
        accuracy: 99,
        isAvailable: false
    },
    {
        id: "policy-generator",
        title: "Gerador de Políticas",
        category: "Legal",
        description: "Minutas de Governança de IA (PL 2338) automáticas.",
        rationale: "Documentação jurídica instantânea.",
        icon: FileText,
        color: "#F59E0B",
        cost: 0,
        duration: "5 min",
        accuracy: 95,
        isAvailable: true
    }
];

// Mock Data for Charts
const complianceData = [
    { name: 'Segurança', uv: 90, fill: '#00FF94' },
    { name: 'Privacidade', uv: 80, fill: '#00A3FF' },
    { name: 'Ética', uv: 65, fill: '#F59E0B' },
    { name: 'Robustez', uv: 50, fill: '#8B5CF6' },
];

const historyTrace = [
    { name: 'S1', score: 60 },
    { name: 'S2', score: 65 },
    { name: 'S3', score: 62 },
    { name: 'S4', score: 78 },
    { name: 'S5', score: 85 },
    { name: 'S6', score: 92 },
];

export default function AssessmentsPage() {
    const [showWizard, setShowWizard] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userCredits, setUserCredits] = useState(10);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (searchParams.get('new') === 'true') {
            setShowWizard(true);
        }
    }, [searchParams]);

    const handleProtocolClick = (protocol: typeof protocols[0]) => {
        if (protocol.id === "iso-42001") {
            setShowWizard(true);
        } else if (protocol.id === "policy-generator") {
            router.push("/dashboard/growth?tab=policy");
        } else if (!protocol.isAvailable) {
            // Toast or specific UI for locked
            console.log("Feature locked");
        }
    };

    if (showWizard) {
        return <AssessmentWizard onCancel={() => {
            setShowWizard(false);
            router.replace('/dashboard/assessments');
        }} />;
    }

    return (
        <div className="p-8 w-full min-h-screen relative text-white font-sans overflow-hidden bg-[#050A14]">

            {/* Grid Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,163,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,163,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-[1920px] mx-auto relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8"
            >
                {/* COLUMN 1: STATUS & RADAR (Left 4 cols) */}
                <div className="xl:col-span-4 space-y-6">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-[#00FF94] uppercase tracking-widest px-2 py-1 bg-[#00FF94]/10 rounded border border-[#00FF94]/20 flex w-fit items-center gap-2">
                                <Activity className="w-3 h-3 animate-pulse" />
                                Sistema de Diagnóstico
                            </span>
                        </div>
                        <h1 className="text-4xl font-orbitron font-bold text-white tracking-wide">
                            Tactical <span className="text-[#00A3FF]">Audit</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-2 font-light">
                            Selecione um protocolo para iniciar a varredura profunda da sua infraestrutura.
                        </p>
                    </div>

                    {/* Main Compliance Gauge */}
                    <motion.div variants={itemVariants} className="rounded-[24px] bg-[#0A111F]/80 backdrop-blur-xl border border-white/5 p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-50"><ShieldCheck className="w-6 h-6 text-[#00FF94]" /></div>

                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Status de Conformidade</h3>

                        <div className="h-[250px] w-full relative flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    innerRadius="30%"
                                    outerRadius="100%"
                                    barSize={20}
                                    data={complianceData}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar
                                        background
                                        dataKey="uv"
                                        cornerRadius={10}
                                    />
                                    <Tooltip contentStyle={{ backgroundColor: '#050A14', borderRadius: '12px', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute bottom-10 text-center">
                                <span className="text-4xl font-orbitron font-bold text-white">92%</span>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Global Score</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {complianceData.map((d, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                                    <span className="text-gray-300">{d.name}</span>
                                    <span className="ml-auto font-bold text-white">{d.uv}%</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* History Mini-Chart */}
                    <motion.div variants={itemVariants} className="rounded-[24px] bg-[#0A111F]/80 backdrop-blur-xl border border-white/5 p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Tendência de Score</h3>
                        <div className="h-[150px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={historyTrace}>
                                    <Line type="monotone" dataKey="score" stroke="#00A3FF" strokeWidth={3} dot={{ r: 4, fill: '#050A14', strokeWidth: 2 }} />
                                    <CartesianGrid stroke="#ffffff05" vertical={false} />
                                    <XAxis hide />
                                    <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                                    <Tooltip contentStyle={{ backgroundColor: '#050A14', borderRadius: '8px', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Credits Widget */}
                    <motion.div variants={itemVariants} className="rounded-[24px] bg-gradient-to-r from-[#00A3FF]/10 to-[#00A3FF]/5 border border-[#00A3FF]/20 p-6 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-bold text-[#00A3FF] uppercase tracking-widest mb-1">Créditos de Auditoria</p>
                            <p className="text-3xl font-orbitron font-bold text-white">{userCredits}</p>
                        </div>
                        <button className="px-4 py-2 bg-[#00A3FF] hover:bg-[#0090E0] text-white text-xs font-bold rounded-lg transition-colors">
                            RECARREGAR
                        </button>
                    </motion.div>
                </div>

                {/* COLUMN 2: PROTOCOL LIBRARY (Right 8 cols) */}
                <div className="xl:col-span-8 space-y-6">

                    {/* Filter Bar */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2">
                            {['Todos', 'Certificação', 'Risco', 'Legal'].map(f => (
                                <button key={f} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-all">
                                    {f}
                                </button>
                            ))}
                        </div>
                        <div className="relative group">
                            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5 group-focus-within:text-[#00FF94]" />
                            <input type="text" placeholder="Buscar protocolo..." className="bg-[#0A111F] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-[#00FF94] focus:outline-none w-64 transition-all" />
                        </div>
                    </div>

                    {/* Protocols List (Horizontal Blade Style) */}
                    <div className="space-y-4">
                        {protocols.map((protocol, index) => (
                            <motion.div
                                key={protocol.id}
                                variants={itemVariants}
                                onClick={() => handleProtocolClick(protocol)}
                                className={`
                                    relative overflow-hidden rounded-[20px] bg-[#0A111F]/60 backdrop-blur-xl border border-white/5 
                                    hover:border-[${protocol.color}]/50 hover:bg-[#0A111F]/80
                                    transition-all duration-300 cursor-pointer group min-h-[140px] flex
                                    ${!protocol.isAvailable ? 'opacity-60 grayscale-[0.5]' : ''}
                                `}
                            >
                                {/* Left Color Strip */}
                                <div className="w-2 absolute inset-y-0 left-0" style={{ backgroundColor: protocol.color }} />

                                <div className="flex-1 flex flex-col md:flex-row items-center p-6 pl-8 gap-6">
                                    {/* Icon Box */}
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                        <protocol.icon className="w-8 h-8" style={{ color: protocol.color }} />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-[var(--text-glow)]" style={{ ['--text-glow' as any]: protocol.color }}>
                                                {protocol.title}
                                            </h3>
                                            {!protocol.isAvailable && <Lock className="w-3 h-3 text-gray-500" />}
                                            {protocol.category && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase border border-white/5">
                                                    {protocol.category}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-400 font-light mb-2">{protocol.description}</p>
                                        <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {protocol.duration}</span>
                                            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Acc: {protocol.accuracy}%</span>
                                        </div>
                                    </div>

                                    {/* Action Side */}
                                    <div className="flex flex-col items-end gap-3 min-w-[120px]">
                                        <span className={`text-lg font-bold ${userCredits >= protocol.cost ? 'text-white' : 'text-red-400'}`}>
                                            {protocol.cost === 0 ? 'FREE' : `${protocol.cost} CR`}
                                        </span>
                                        <button className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-xs font-bold uppercase tracking-widest text-[#00FF94] transition-all flex items-center gap-2 group-hover:bg-[#00FF94] group-hover:text-black">
                                            Iniciar <Play className="w-3 h-3 fill-current" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Logic Terminal Section */}
                    <motion.div variants={itemVariants} className="mt-8 rounded-[24px] bg-black/40 border border-white/10 p-6 font-mono text-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF94]/50 to-transparent" />
                        <div className="flex items-center gap-2 mb-4 text-[#00FF94]">
                            <Terminal className="w-4 h-4" />
                            <span className="font-bold uppercase tracking-widest text-xs">Terminal de Auditoria</span>
                        </div>
                        <div className="space-y-2 text-gray-400 h-32 overflow-y-auto custom-scrollbar">
                            <p><span className="text-gray-600">[14:00:23]</span> System ready. Waiting for input protocol...</p>
                            <p><span className="text-gray-600">[13:45:12]</span> <span className="text-[#00A3FF]">L.I.A. Flash</span> completed for <span className="text-white">Model_X_Credits</span>. Score: 88%.</p>
                            <p><span className="text-gray-600">[12:10:05]</span> Policy Generator executed. 2 documents created.</p>
                            <p><span className="text-gray-600">[10:00:00]</span> User credentials verified. Access granted.</p>
                        </div>
                    </motion.div>

                </div>
            </motion.div>

        </div>
    );
}
