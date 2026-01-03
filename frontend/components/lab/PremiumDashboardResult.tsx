"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, RadialBarChart, RadialBar, LineChart, Line
} from 'recharts';
import { Download, HelpCircle, TrendingUp, TrendingDown, Shield, AlertTriangle, CheckCircle, Activity, Brain, Eye, Lock, Zap, Target, Layers } from 'lucide-react';

interface PremiumDashboardProps {
    title: string;
    score: number;
    riskLevel: string;
    verdict: string;
    metrics: { label: string; value: string | number; sub?: string; trend?: 'up' | 'down' }[];
    chartData: any[];
    barData: any[];
    type: 'xai' | 'shadow' | 'iso';
}

// Tooltip Component
const InfoTooltip = ({ text }: { text: string }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative inline-block">
            <button onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <HelpCircle className="w-3 h-3 text-gray-400" />
            </button>
            {show && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-[#1a1f2e] border border-white/20 rounded-xl shadow-2xl text-xs text-gray-300 leading-relaxed">
                    {text}
                </motion.div>
            )}
        </div>
    );
};

// Mini Sparkline Component
const Sparkline = ({ data, color }: { data: number[], color: string }) => (
    <ResponsiveContainer width="100%" height={40}>
        <LineChart data={data.map((v, i) => ({ v }))}>
            <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
    </ResponsiveContainer>
);

// Animated Counter
const AnimatedNumber = ({ value, suffix = '' }: { value: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [value]);
    return <>{count}{suffix}</>;
};

// Metric Tooltips
const TOOLTIPS: Record<string, string> = {
    'Variáveis Analisadas': 'Total de colunas de dados processadas pelo algoritmo de auditoria.',
    'Métodos de Explicabilidade': 'Técnicas de XAI (SHAP/LIME) detectadas que tornam o modelo auditável.',
    'Entropia': 'Nível de complexidade interna do modelo. Alta entropia pode indicar problemas.',
    'Entidades': 'Quantidade de dados pessoais (CPF, nome, CID) detectados no texto.',
    'Caracteres': 'Volume total de texto processado.',
    'Ofuscação': 'Sistema de mascaramento de dados sensíveis ativo.',
};

export default function PremiumDashboardResult({
    title, score, riskLevel, verdict, metrics, chartData, barData, type
}: PremiumDashboardProps) {
    const dashboardRef = useRef<HTMLDivElement>(null);
    const [exporting, setExporting] = useState(false);

    // Dynamic Colors
    const isGood = riskLevel === 'LOW';
    const primaryColor = isGood ? '#00FF94' : '#FF0055';
    const secondaryColor = '#00A3FF';

    // Score Gauge Data
    const scoreGauge = [{ name: 'score', value: score, fill: primaryColor }];

    // Trend sparkline data
    const sparkData = [30, 45, 28, 80, 75, 90, score];

    // PDF Export
    const handleExportPDF = async () => {
        if (!dashboardRef.current) return;
        setExporting(true);
        try {
            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;
            const canvas = await html2canvas(dashboardRef.current, { scale: 2, backgroundColor: '#0A0E14' });
            const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`ALGOR_Auditoria_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (e) { console.error(e); }
        finally { setExporting(false); }
    };

    return (
        <motion.div
            ref={dashboardRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-[#0A0E14] rounded-3xl p-6 relative overflow-hidden"
        >
            {/* BACKGROUND EFFECTS */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00A3FF]/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF0055]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIwMjUzMCIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

            {/* HEADER ROW */}
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${isGood ? 'from-[#00FF94]/20 to-[#00A3FF]/10' : 'from-[#FF0055]/20 to-[#FF6B00]/10'} flex items-center justify-center`}>
                        {isGood ? <Shield className="w-6 h-6 text-[#00FF94]" /> : <AlertTriangle className="w-6 h-6 text-[#FF0055]" />}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white font-orbitron tracking-tight">{title}</h1>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            MÓDULO {type.toUpperCase()} • <span className={isGood ? 'text-[#00FF94]' : 'text-[#FF0055]'}>{isGood ? 'COMPLIANCE OK' : 'AÇÃO REQUERIDA'}</span>
                        </p>
                    </div>
                </div>
                <button onClick={handleExportPDF} disabled={exporting}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                    <Download className="w-4 h-4 text-[#00A3FF]" />
                    <span className="text-sm text-white font-medium">{exporting ? 'Gerando...' : 'Exportar PDF'}</span>
                </button>
            </div>

            {/* BENTO GRID LAYOUT */}
            <div className="grid grid-cols-12 grid-rows-3 gap-4 relative z-10" style={{ height: '500px' }}>

                {/* HERO SCORE CARD - Large */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="col-span-4 row-span-2 bg-gradient-to-br from-[#12161F] to-[#0D1117] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.02]" />
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Índice de Conformidade</p>

                    {/* Radial Progress */}
                    <div className="relative w-48 h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270} data={scoreGauge}>
                                <RadialBar background={{ fill: '#1a1f2e' }} dataKey="value" cornerRadius={10} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-6xl font-black text-white font-orbitron" style={{ textShadow: `0 0 40px ${primaryColor}50` }}>
                                <AnimatedNumber value={score} />
                            </span>
                            <span className="text-sm text-gray-500">de 100 pontos</span>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`mt-6 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${isGood ? 'bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/30' : 'bg-[#FF0055]/10 text-[#FF0055] border border-[#FF0055]/30'}`}>
                        {isGood ? '✓ Modelo Auditável' : '✕ Caixa-Preta Detectada'}
                    </div>
                </motion.div>

                {/* METRIC CARDS - Row 1 */}
                {metrics.slice(0, 2).map((m, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -2 }}
                        className="col-span-4 row-span-1 bg-gradient-to-br from-[#12161F] to-[#0D1117] border border-white/5 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#00A3FF]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${i === 0 ? 'from-[#00A3FF]/20 to-[#8B5CF6]/10' : 'from-[#00FF94]/20 to-[#00A3FF]/10'} flex items-center justify-center`}>
                                    {i === 0 ? <Layers className="w-5 h-5 text-[#00A3FF]" /> : <Brain className="w-5 h-5 text-[#00FF94]" />}
                                </div>
                                <span className="text-xs text-gray-400 uppercase tracking-wider">{m.label}</span>
                            </div>
                            <InfoTooltip text={TOOLTIPS[m.label] || 'Indicador de auditoria.'} />
                        </div>

                        <div className="flex items-end justify-between mt-3">
                            <div>
                                <span className="text-4xl font-black text-white font-orbitron">{m.value}</span>
                                {m.sub && <p className="text-xs text-gray-500 mt-1">{m.sub}</p>}
                            </div>
                            <div className={`flex items-center gap-1 text-xs ${m.trend === 'up' ? 'text-[#00FF94]' : 'text-[#FF0055]'}`}>
                                {m.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {m.trend === 'up' ? '+12%' : '-8%'}
                            </div>
                        </div>

                        {/* Sparkline */}
                        <div className="mt-3 h-10">
                            <Sparkline data={sparkData} color={m.trend === 'up' ? '#00FF94' : '#FF0055'} />
                        </div>
                    </motion.div>
                ))}

                {/* ENTROPY / THIRD METRIC - Smaller */}
                {metrics.slice(2).map((m, i) => (
                    <motion.div
                        key={i + 2}
                        whileHover={{ y: -2 }}
                        className="col-span-4 row-span-1 bg-gradient-to-br from-[#12161F] to-[#0D1117] border border-white/5 rounded-2xl p-5 flex items-center justify-between relative overflow-hidden"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#FF0055]/10 flex items-center justify-center">
                                <Activity className="w-6 h-6 text-[#8B5CF6]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider">{m.label}</p>
                                <p className="text-3xl font-black text-white font-orbitron">{m.value}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">{m.sub}</p>
                            <div className="w-24 h-2 bg-white/5 rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: m.value === 'ALTA' ? '90%' : '30%' }}
                                    className={`h-full rounded-full ${m.value === 'ALTA' ? 'bg-[#FF0055]' : 'bg-[#00FF94]'}`}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* MAIN AREA CHART */}
                <motion.div
                    className="col-span-8 row-span-2 bg-gradient-to-br from-[#12161F] to-[#0D1117] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-semibold text-white">Evolução da Transparência</h3>
                            <p className="text-xs text-gray-500">Histórico de análises recentes</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#00A3FF]" /> Score</span>
                            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#8B5CF6]" /> Benchmark</span>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                            <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                            <Area type="monotone" dataKey="value" stroke="#00A3FF" strokeWidth={3} fill="url(#colorScore)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* SIDEBAR - BAR CHART */}
                <motion.div
                    className="col-span-4 row-span-1 bg-gradient-to-br from-[#12161F] to-[#0D1117] border border-white/5 rounded-2xl p-5 relative overflow-hidden"
                >
                    <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                        {type === 'xai' ? 'Distribuição de Variáveis' : 'Tipos de Dados'}
                    </h3>
                    <ResponsiveContainer width="100%" height={100}>
                        <BarChart layout="vertical" data={barData} barSize={16}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={60} tickLine={false} axisLine={false} />
                            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                                {barData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00A3FF' : '#8B5CF6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

            </div>

            {/* VERDICT FOOTER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`mt-6 p-4 rounded-xl border ${isGood ? 'bg-[#00FF94]/5 border-[#00FF94]/20' : 'bg-[#FF0055]/5 border-[#FF0055]/20'} relative z-10`}
            >
                <div className="flex items-center gap-3">
                    {isGood ? <CheckCircle className="w-5 h-5 text-[#00FF94]" /> : <AlertTriangle className="w-5 h-5 text-[#FF0055]" />}
                    <p className={`text-sm font-medium ${isGood ? 'text-[#00FF94]' : 'text-[#FF0055]'}`}>{verdict}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}
