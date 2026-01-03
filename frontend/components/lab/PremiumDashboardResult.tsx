"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Activity, ShieldAlert, Lock, Zap, Download, HelpCircle, Brain, Eye, Puzzle, Gauge, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface PremiumDashboardProps {
    title: string;
    score: number;
    riskLevel: string;
    verdict: string;
    metrics: { label: string; value: string | number; sub?: string; trend?: 'up' | 'down'; tooltip?: string }[];
    chartData: any[];
    barData: any[];
    type: 'xai' | 'shadow' | 'iso';
}

// Componente de Tooltip Educativo
const InfoTooltip = ({ text }: { text: string }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative inline-block">
            <button
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
                <HelpCircle className="w-3 h-3 text-gray-400" />
            </button>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#1a1f2e] border border-white/20 rounded-xl shadow-2xl text-xs text-gray-300 leading-relaxed"
                >
                    {text}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1f2e] border-b border-r border-white/20 rotate-45 -mt-1.5" />
                </motion.div>
            )}
        </div>
    );
};

// Ícones por tipo de métrica
const getMetricIcon = (label: string) => {
    const iconMap: Record<string, React.ReactNode> = {
        'Variáveis Analisadas': <Puzzle className="w-5 h-5" />,
        'Métodos de Explicabilidade': <Brain className="w-5 h-5" />,
        'Entropia': <Activity className="w-5 h-5" />,
        'Entidades': <Eye className="w-5 h-5" />,
        'Caracteres': <Gauge className="w-5 h-5" />,
        'Ofuscação': <Lock className="w-5 h-5" />,
    };
    return iconMap[label] || <Zap className="w-5 h-5" />;
};

// Descrições educativas para os indicadores
const METRIC_TOOLTIPS: Record<string, string> = {
    'Variáveis Analisadas': 'Quantidade de colunas de dados que o modelo de IA utiliza para tomar decisões. Quanto mais variáveis, mais complexo o modelo.',
    'Métodos de Explicabilidade': 'Técnicas como SHAP ou LIME que explicam POR QUE a IA tomou determinada decisão. Modelos sem isso são "caixas-pretas".',
    'Entropia': 'Mede a complexidade e aleatoriedade interna do modelo. Alta entropia pode indicar overfitting ou dados ruidosos.',
    'Índice de Confiança': 'Pontuação de 0-100 que indica o quão transparente e auditável é o modelo. Acima de 70 é considerado seguro.',
    'Entidades': 'Dados pessoais identificáveis (CPF, nome, CRM, CID) encontrados no texto que representam risco de vazamento.',
    'Caracteres': 'Volume total de texto processado pelo scanner de privacidade.',
    'Ofuscação': 'Sistema de mascaramento automático que substitui dados sensíveis por tokens seguros ([REDACTED]).',
};

export default function PremiumDashboardResult({
    title, score, riskLevel, verdict, metrics, chartData, barData, type
}: PremiumDashboardProps) {
    const dashboardRef = useRef<HTMLDivElement>(null);
    const [exporting, setExporting] = useState(false);

    // Cores Dinâmicas baseadas no risco
    const mainColor = riskLevel === 'LOW' ? '#00FF94' : (riskLevel === 'MODERATE' ? '#F59E0B' : '#FF0055');
    const bgGlow = riskLevel === 'LOW' ? 'from-[#00FF94]/10' : (riskLevel === 'MODERATE' ? 'from-[#F59E0B]/10' : 'from-[#FF0055]/10');

    // Gauge Data (Score)
    const gaugeData = [
        { name: 'Score', value: score },
        { name: 'Rest', value: 100 - score }
    ];

    // Função de Exportar PDF
    const handleExportPDF = async () => {
        if (!dashboardRef.current) return;
        setExporting(true);

        try {
            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;

            const canvas = await html2canvas(dashboardRef.current, {
                scale: 2,
                backgroundColor: '#05070A',
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`Relatorio_Auditoria_ALGOR_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('Erro ao exportar PDF:', error);
            alert('Erro ao gerar PDF. Verifique se as bibliotecas estão instaladas.');
        } finally {
            setExporting(false);
        }
    };

    return (
        <motion.div
            ref={dashboardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-gradient-to-br from-[#05070A] via-[#0A0E1A] to-[#05070A] border border-white/10 rounded-[30px] p-6 md:p-8 shadow-2xl relative overflow-hidden"
        >
            {/* Ambient Background Effects */}
            <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b ${bgGlow} to-transparent rounded-full blur-[150px] pointer-events-none opacity-50`} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-[#00A3FF]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

            {/* Scan Lines Effect */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 relative z-10">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-4 py-1.5 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-full text-[10px] font-orbitron text-gray-300 tracking-widest uppercase backdrop-blur-sm">
                            UNIDADE DE INTELIGÊNCIA ALGOR
                        </span>
                        <span className="px-4 py-1.5 bg-gradient-to-r from-[#00A3FF]/20 to-[#00A3FF]/5 border border-[#00A3FF]/30 rounded-full text-[10px] font-orbitron text-[#00A3FF] tracking-widest uppercase">
                            MÓDULO {type.toUpperCase()}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white tracking-tight">{title}</h2>
                    <p className="text-gray-400 mt-2 max-w-2xl flex items-center gap-2">
                        {riskLevel !== 'LOW' ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <CheckCircle className="w-4 h-4 text-green-500" />}
                        {verdict}
                    </p>
                </div>

                <button
                    onClick={handleExportPDF}
                    disabled={exporting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A3FF]/20 to-[#00FF94]/10 border border-[#00A3FF]/30 cursor-pointer hover:border-[#00A3FF]/60 hover:shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all disabled:opacity-50"
                >
                    <Download className="w-4 h-4 text-[#00A3FF]" />
                    <span className="text-sm font-semibold text-white">{exporting ? 'Gerando...' : 'Exportar PDF'}</span>
                </button>
            </div>

            {/* KPI GRID - REDESIGN ULTRA PREMIUM */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                {/* Score Card (Gauge) - HERO CARD */}
                <motion.div
                    whileHover={{ scale: 1.02, borderColor: mainColor }}
                    className="md:col-span-1 bg-gradient-to-br from-[#0A0E1A] to-[#0F1420] border border-white/10 rounded-2xl p-5 relative flex flex-col items-center justify-center overflow-hidden group"
                >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center justify-between w-full mb-2">
                        <h3 className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Índice de Confiança</h3>
                        <InfoTooltip text={METRIC_TOOLTIPS['Índice de Confiança']} />
                    </div>

                    <div className="relative w-full h-[130px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gaugeData}
                                    cx="50%" cy="55%"
                                    startAngle={180} endAngle={0}
                                    innerRadius={45} outerRadius={60}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell key="score" fill={mainColor} />
                                    <Cell key="rest" fill="#1e293b" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
                            <span className="text-4xl font-bold text-white font-orbitron" style={{ textShadow: `0 0 20px ${mainColor}40` }}>{score}</span>
                            <span className="text-[10px] text-gray-500 uppercase">/100 pts</span>
                        </div>
                    </div>

                    <div
                        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mt-2"
                        style={{
                            color: mainColor,
                            backgroundColor: `${mainColor}15`,
                            border: `1px solid ${mainColor}30`
                        }}
                    >
                        {riskLevel === 'LOW' ? '✓ MODELO SEGURO' : riskLevel === 'MODERATE' ? '⚠ ATENÇÃO RECOMENDADA' : '✕ RISCO CRÍTICO'}
                    </div>
                </motion.div>

                {/* Dynamic Metric Cards */}
                {metrics.map((m, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-gradient-to-br from-[#0A0E1A] to-[#0F1420] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#00A3FF]/30 transition-all group relative overflow-hidden"
                    >
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#00A3FF]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A3FF]/20 to-[#00A3FF]/5 flex items-center justify-center text-[#00A3FF]">
                                    {getMetricIcon(m.label)}
                                </div>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{m.label}</span>
                            </div>
                            <InfoTooltip text={METRIC_TOOLTIPS[m.label] || 'Indicador de auditoria algorítmica.'} />
                        </div>

                        <div className="mt-4">
                            <span className="text-3xl font-bold text-white font-orbitron block">{m.value}</span>
                            {m.sub && <span className="text-xs text-gray-500 mt-1 block">{m.sub}</span>}
                        </div>

                        {/* Animated Progress Bar */}
                        <motion.div
                            className="w-full h-1.5 bg-white/5 mt-4 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.div
                                className={`h-full rounded-full ${m.trend === 'up' ? 'bg-gradient-to-r from-[#00FF94] to-[#00A3FF]' : 'bg-gradient-to-r from-[#FF0055] to-[#F59E0B]'}`}
                                initial={{ width: 0 }}
                                animate={{ width: m.trend === 'up' ? '85%' : '30%' }}
                                transition={{ duration: 1, ease: 'easeOut', delay: i * 0.1 }}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Area Chart */}
                <div className="md:col-span-2 bg-gradient-to-br from-[#0A0E1A] to-[#0F1420] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent" />

                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                            {type === 'xai' ? 'Estabilidade da Transparência' : 'Densidade de Detecção'}
                        </h3>
                        <InfoTooltip text="Gráfico de evolução temporal mostrando como o score de transparência varia ao longo das análises." />
                    </div>

                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={mainColor} stopOpacity={0.4} />
                                    <stop offset="95%" stopColor={mainColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} vertical={false} />
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <RechartsTooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }}
                                itemStyle={{ color: mainColor }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={mainColor}
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Side Bar Chart */}
                <div className="md:col-span-1 bg-gradient-to-br from-[#0A0E1A] to-[#0F1420] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />

                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                            {type === 'xai' ? 'Peso das Variáveis' : 'Tipos de Violação'}
                        </h3>
                        <InfoTooltip text={type === 'xai' ? 'Mostra quais variáveis têm maior impacto na decisão da IA. Se aparecer "BlackBox", significa que não há transparência.' : 'Categorias de dados sensíveis encontrados no texto.'} />
                    </div>

                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart layout="vertical" data={barData} barSize={12}>
                            <CartesianGrid stroke="#334155" horizontal={false} opacity={0.1} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={70} tickLine={false} axisLine={false} />
                            <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00A3FF' : '#8B5CF6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </motion.div>
    );
}
