"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, RadialBarChart, RadialBar, LineChart, Line
} from 'recharts';
import { Download, Info, TrendingUp, TrendingDown, Shield, AlertTriangle, CheckCircle, Activity, Brain, Eye, Lock, Zap, Target, Layers, FileText, BarChart2, PieChartIcon } from 'lucide-react';

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

// TOOLTIP COMPONENT - Fixed positioning
const MetricTooltip = ({ text, children }: { text: string, children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-[100] top-full left-0 mt-3 w-72 p-4 bg-[#1E2433] border border-[#3B4559] rounded-xl shadow-2xl"
                        style={{ pointerEvents: 'auto' }}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/20 flex items-center justify-center flex-shrink-0">
                                <Info className="w-4 h-4 text-[#00F0FF]" />
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium mb-1">O que significa?</p>
                                <p className="text-xs text-gray-400 leading-relaxed">{text}</p>
                            </div>
                        </div>
                        <div className="absolute -top-2 left-6 w-4 h-4 bg-[#1E2433] border-l border-t border-[#3B4559] rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ANIMATED NUMBER with formatting
const AnimatedValue = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value]);

    return <>{prefix}{displayValue}{suffix}</>;
};

// METRIC EXPLANATIONS
const EXPLANATIONS: Record<string, string> = {
    'Variáveis Analisadas': 'Representa o número total de colunas de dados que a inteligência artificial utiliza para realizar suas predições. Quanto maior o número, mais complexo é o modelo e maior a necessidade de monitoramento.',
    'Métodos de Explicabilidade': 'Indica quantas técnicas de explicabilidade (como SHAP ou LIME) foram detectadas no modelo. Zero significa que o modelo é uma "caixa-preta" sem transparência.',
    'Entropia': 'Mede o grau de desordem ou complexidade interna do modelo. Entropia ALTA pode indicar overfitting, dados ruidosos ou falta de padrões claros nas decisões.',
    'Entidades': 'Quantidade de informações pessoais identificáveis (PII/PHI) como CPF, nome, CID-10, CRM encontradas no texto analisado.',
    'Caracteres': 'Volume total de texto que foi processado pelo scanner de privacidade.',
    'Ofuscação': 'Sistema de anonimização que substitui dados sensíveis por tokens seguros, protegendo a privacidade.',
};

export default function PremiumDashboardResult({
    title, score, riskLevel, verdict, metrics, chartData, barData, type
}: PremiumDashboardProps) {
    const dashboardRef = useRef<HTMLDivElement>(null);
    const [exporting, setExporting] = useState(false);

    // Colors based on risk
    const isGood = riskLevel === 'LOW';
    const accentColor = isGood ? '#00F0FF' : '#FF3366';
    const gradientFrom = isGood ? '#00F0FF' : '#FF3366';
    const gradientTo = isGood ? '#00FF87' : '#FF6B35';

    // Donut chart for score
    const donutData = [
        { name: 'Score', value: score, fill: `url(#scoreGradient)` },
        { name: 'Empty', value: 100 - score, fill: '#1E2433' }
    ];

    // Additional visual data
    const performanceData = [
        { name: 'Segurança', value: isGood ? 92 : 23, fill: '#00F0FF' },
        { name: 'Transparência', value: score, fill: '#9945FF' },
        { name: 'Compliance', value: isGood ? 88 : 15, fill: '#00FF87' },
    ];

    // PDF Export
    const handleExportPDF = async () => {
        if (!dashboardRef.current) return;
        setExporting(true);
        try {
            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;
            const canvas = await html2canvas(dashboardRef.current, { scale: 2, backgroundColor: '#0D1117' });
            const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`ALGOR_Relatorio_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (e) { console.error(e); }
        finally { setExporting(false); }
    };

    return (
        <motion.div
            ref={dashboardRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-[#0D1117] rounded-3xl overflow-hidden"
        >
            {/* ========== HEADER ========== */}
            <div className="bg-gradient-to-r from-[#161B26] to-[#0D1117] px-8 py-6 border-b border-[#21262D]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[${gradientFrom}]/30 to-[${gradientTo}]/10 flex items-center justify-center border border-white/10`}>
                            <Shield className={`w-7 h-7`} style={{ color: accentColor }} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-xs text-gray-500 uppercase tracking-widest">ALGOR HEALTH LAB</span>
                                <span className="px-2 py-0.5 bg-[#9945FF]/20 text-[#9945FF] text-[10px] font-bold rounded uppercase">{type}</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white">{title}</h1>
                        </div>
                    </div>
                    <button
                        onClick={handleExportPDF}
                        disabled={exporting}
                        className="flex items-center gap-2 px-5 py-3 bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] rounded-xl transition-all"
                    >
                        <FileText className="w-4 h-4 text-[#00F0FF]" />
                        <span className="text-sm text-white font-medium">{exporting ? 'Gerando...' : 'Exportar Relatório'}</span>
                    </button>
                </div>
            </div>

            {/* ========== MAIN CONTENT ========== */}
            <div className="p-6">
                <div className="grid grid-cols-12 gap-5">

                    {/* ===== LEFT COLUMN: SCORE DONUT ===== */}
                    <div className="col-span-12 lg:col-span-4">
                        <div className="bg-[#161B26] rounded-2xl p-6 border border-[#21262D] h-full">
                            <div className="text-center mb-4">
                                <span className="text-xs text-gray-500 uppercase tracking-widest">Índice de Conformidade</span>
                            </div>

                            {/* LARGE DONUT CHART */}
                            <div className="relative mx-auto" style={{ width: 220, height: 220 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <defs>
                                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor={gradientFrom} />
                                                <stop offset="100%" stopColor={gradientTo} />
                                            </linearGradient>
                                        </defs>
                                        <Pie
                                            data={donutData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={75}
                                            outerRadius={100}
                                            startAngle={90}
                                            endAngle={-270}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {donutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? `url(#scoreGradient)` : '#1E2433'} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                {/* Center Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-6xl font-black text-white" style={{
                                        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        <AnimatedValue value={score} />
                                    </span>
                                    <span className="text-sm text-gray-500">de 100</span>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="text-center mt-6">
                                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold ${isGood
                                        ? 'bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/30'
                                        : 'bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30'
                                    }`}>
                                    {isGood ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                    {isGood ? 'Modelo Transparente' : 'Caixa-Preta Detectada'}
                                </div>
                            </div>

                            {/* Mini Stats */}
                            <div className="grid grid-cols-3 gap-3 mt-6">
                                {performanceData.map((item, i) => (
                                    <div key={i} className="text-center p-3 bg-[#0D1117] rounded-xl">
                                        <div className="text-2xl font-bold text-white">{item.value}%</div>
                                        <div className="text-[10px] text-gray-500 uppercase mt-1">{item.name}</div>
                                        <div className="w-full h-1 bg-[#21262D] rounded-full mt-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.value}%` }}
                                                transition={{ duration: 1, delay: i * 0.2 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: item.fill }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN: METRICS + CHARTS ===== */}
                    <div className="col-span-12 lg:col-span-8 space-y-5">

                        {/* KPI CARDS ROW */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {metrics.map((m, i) => {
                                const colors = ['#00F0FF', '#9945FF', '#00FF87'];
                                const icons = [<Layers key={0} className="w-6 h-6" />, <Brain key={1} className="w-6 h-6" />, <Activity key={2} className="w-6 h-6" />];
                                const color = colors[i % 3];

                                return (
                                    <MetricTooltip key={i} text={EXPLANATIONS[m.label] || 'Indicador de auditoria algorítmica.'}>
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            className="bg-[#161B26] rounded-2xl p-5 border border-[#21262D] cursor-help relative overflow-hidden group"
                                        >
                                            {/* Glow Effect */}
                                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: color }} />

                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}20` }}>
                                                <div style={{ color }}>{icons[i]}</div>
                                            </div>

                                            {/* Value */}
                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <div className="text-4xl font-black text-white mb-1">
                                                        {typeof m.value === 'number' ? <AnimatedValue value={m.value} /> : m.value}
                                                    </div>
                                                    <div className="text-sm text-gray-400">{m.label}</div>
                                                </div>

                                                {/* Trend */}
                                                {m.trend && (
                                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${m.trend === 'up' ? 'bg-[#00FF87]/10 text-[#00FF87]' : 'bg-[#FF3366]/10 text-[#FF3366]'
                                                        }`}>
                                                        {m.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                        {m.trend === 'up' ? '+15%' : '-8%'}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Mini Sparkline */}
                                            <div className="h-12 mt-4 -mx-2">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={[
                                                        { v: 30 }, { v: 45 }, { v: 35 }, { v: 50 }, { v: 40 }, { v: 60 }, { v: typeof m.value === 'number' ? m.value : 50 }
                                                    ]}>
                                                        <defs>
                                                            <linearGradient id={`spark-${i}`} x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                                                                <stop offset="100%" stopColor={color} stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#spark-${i})`} />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </motion.div>
                                    </MetricTooltip>
                                );
                            })}
                        </div>

                        {/* CHARTS ROW */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

                            {/* MAIN TIMELINE CHART */}
                            <div className="md:col-span-3 bg-[#161B26] rounded-2xl p-5 border border-[#21262D]">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-white font-semibold">Evolução Temporal</h3>
                                        <p className="text-xs text-gray-500">Últimas análises realizadas</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
                                            Score
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#9945FF]" />
                                            Baseline
                                        </span>
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={180}>
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.4} />
                                                <stop offset="100%" stopColor="#00F0FF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" stroke="#30363D" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#30363D" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: '#161B26', border: '1px solid #30363D', borderRadius: '12px' }}
                                            labelStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#00F0FF" strokeWidth={3} fill="url(#chartGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* BAR CHART */}
                            <div className="md:col-span-2 bg-[#161B26] rounded-2xl p-5 border border-[#21262D]">
                                <h3 className="text-white font-semibold mb-1">Distribuição</h3>
                                <p className="text-xs text-gray-500 mb-4">{type === 'xai' ? 'Variáveis detectadas' : 'Por categoria'}</p>
                                <ResponsiveContainer width="100%" height={160}>
                                    <BarChart layout="vertical" data={barData} barSize={14}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={70} tickLine={false} axisLine={false} />
                                        <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                                            {barData.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00F0FF' : '#9945FF'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========== VERDICT FOOTER ========== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`mt-6 p-5 rounded-2xl border ${isGood
                            ? 'bg-gradient-to-r from-[#00FF87]/10 to-transparent border-[#00FF87]/20'
                            : 'bg-gradient-to-r from-[#FF3366]/10 to-transparent border-[#FF3366]/20'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isGood ? 'bg-[#00FF87]/20' : 'bg-[#FF3366]/20'}`}>
                            {isGood ? <CheckCircle className="w-5 h-5 text-[#00FF87]" /> : <AlertTriangle className="w-5 h-5 text-[#FF3366]" />}
                        </div>
                        <div>
                            <div className={`text-sm font-semibold ${isGood ? 'text-[#00FF87]' : 'text-[#FF3366]'}`}>
                                {isGood ? 'Diagnóstico Favorável' : 'Ação Corretiva Necessária'}
                            </div>
                            <div className="text-sm text-gray-400 mt-0.5">{verdict}</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
