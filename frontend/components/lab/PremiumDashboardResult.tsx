"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Download, Info, TrendingUp, TrendingDown, Shield, AlertTriangle, CheckCircle, Activity, Brain, Layers, FileText, Lightbulb } from 'lucide-react';

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

// TOOLTIP - Fixed position to the RIGHT
const CardTooltip = ({ text, action }: { text: string, action?: string }) => {
    const [show, setShow] = useState(false);

    return (
        <div
            className="absolute top-2 right-2 z-50"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <button className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Info className="w-3.5 h-3.5 text-gray-400" />
            </button>

            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute right-0 top-8 w-80 bg-[#1a2332] border border-[#2d3748] rounded-xl shadow-2xl overflow-hidden"
                        style={{ zIndex: 1000 }}
                    >
                        <div className="p-4 border-b border-[#2d3748]">
                            <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider mb-2">
                                <Info className="w-3 h-3" />
                                O que significa?
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
                        </div>
                        {action && (
                            <div className="p-4 bg-[#0d1117]">
                                <div className="flex items-center gap-2 text-[#FF6B35] text-xs font-semibold uppercase tracking-wider mb-2">
                                    <Lightbulb className="w-3 h-3" />
                                    O que fazer?
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">{action}</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ANIMATED NUMBER
const AnimatedValue = ({ value }: { value: number }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let current = 0;
        const step = value / 60;
        const timer = setInterval(() => {
            current += step;
            if (current >= value) { setDisplay(value); clearInterval(timer); }
            else { setDisplay(Math.floor(current)); }
        }, 25);
        return () => clearInterval(timer);
    }, [value]);
    return <>{display}</>;
};

// CONFIG
const CONFIG = {
    'Variáveis Analisadas': {
        meaning: 'Número de colunas de dados que a IA utiliza para tomar decisões. Mais variáveis = modelo mais complexo.',
        action: 'Se o número for alto (>20), solicite documentação técnica ao fornecedor para entender cada variável.',
    },
    'Métodos de Explicabilidade': {
        meaning: 'Técnicas como SHAP ou LIME que explicam POR QUE a IA tomou uma decisão. Zero = Caixa-Preta!',
        action: 'Se for ZERO, o modelo não é auditável. Exija do fornecedor a implementação de explicabilidade (Art. 20 LGPD).',
    },
    'Entropia': {
        meaning: 'Mede a complexidade/desordem interna do modelo. ALTA = pode ter overfitting ou dados ruidosos.',
        action: 'Entropia ALTA requer revisão do dataset de treinamento e validação com especialistas.',
    },
    'Evolução Temporal': {
        meaning: 'Histórico do score de transparência nas últimas análises. Mostra se o modelo está melhorando ou piorando.',
        action: 'Tendência de QUEDA indica degradação do modelo. Agende auditoria técnica imediata.',
    },
    'Distribuição': {
        meaning: 'Mostra o peso de cada variável na decisão da IA. "BlackBox" significa que não há transparência.',
        action: 'Se aparecer "BlackBox" com valor alto, reprove o modelo. Não use em produção.',
    },
};

export default function PremiumDashboardResult({
    title, score, riskLevel, verdict, metrics, chartData, barData, type
}: PremiumDashboardProps) {
    const dashboardRef = useRef<HTMLDivElement>(null);
    const [exporting, setExporting] = useState(false);

    const isGood = riskLevel === 'LOW';
    const mainColor = isGood ? '#00F0FF' : '#FF3366';
    const secondColor = isGood ? '#00FF87' : '#FF6B35';

    // Donut data
    const donutData = [
        { name: 'Score', value: score },
        { name: 'Empty', value: 100 - score }
    ];

    // PDF Export - Professional Report
    const handleExportPDF = async () => {
        setExporting(true);
        try {
            const jsPDF = (await import('jspdf')).default;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 20;
            let y = 20;

            // Helper functions
            const addTitle = (text: string, size: number = 16) => {
                pdf.setFontSize(size);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(30, 41, 59);
                pdf.text(text, margin, y);
                y += size * 0.5;
            };

            const addText = (text: string, size: number = 11) => {
                pdf.setFontSize(size);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(71, 85, 105);
                const lines = pdf.splitTextToSize(text, pageWidth - margin * 2);
                pdf.text(lines, margin, y);
                y += lines.length * size * 0.4 + 2;
            };

            const addSection = (title: string, content: string, action?: string) => {
                // Check if we need a new page
                if (y > 250) {
                    pdf.addPage();
                    y = 20;
                }

                // Section title
                pdf.setFillColor(241, 245, 249);
                pdf.roundedRect(margin - 2, y - 4, pageWidth - margin * 2 + 4, 8, 2, 2, 'F');
                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(30, 41, 59);
                pdf.text(title, margin, y + 2);
                y += 12;

                // Content
                addText(content);

                // Action if exists
                if (action) {
                    pdf.setFontSize(10);
                    pdf.setFont('helvetica', 'bold');
                    pdf.setTextColor(isGood ? 0 : 255, isGood ? 163 : 0, isGood ? 255 : 85); // #00A3FF or #FF0055
                    pdf.text('→ Ação Recomendada: ', margin, y);
                    pdf.setFont('helvetica', 'normal');
                    pdf.setTextColor(71, 85, 105);
                    const actionLines = pdf.splitTextToSize(action, pageWidth - margin * 2 - 38);
                    pdf.text(actionLines, margin + 38, y);
                    y += actionLines.length * 4 + 6;
                }
                y += 4;
            };

            // ========== LOAD LOGO ==========
            // Fetch logo and convert to base64
            let logoBase64 = '';
            try {
                const logoResponse = await fetch('/logo-symbol.png');
                const logoBlob = await logoResponse.blob();
                logoBase64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(logoBlob);
                });
            } catch (e) {
                console.warn('Logo não encontrada, continuando sem ela.');
            }

            // ========== HEADER - CORES OFICIAIS ==========
            // Background: #0A1A2F (Deep Navy)
            pdf.setFillColor(10, 26, 47);
            pdf.rect(0, 0, pageWidth, 45, 'F');

            // Accent line: #00A3FF (Cyan)
            pdf.setFillColor(0, 163, 255);
            pdf.rect(0, 45, pageWidth, 2, 'F');

            // Logo
            if (logoBase64) {
                try {
                    pdf.addImage(logoBase64, 'PNG', margin, 8, 28, 28);
                } catch (e) {
                    console.warn('Erro ao adicionar logo');
                }
            }

            // Title - ALGOR BRASIL
            pdf.setFontSize(24);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(0, 255, 148); // #00FF94 (Neon Green)
            pdf.text('ALGOR BRASIL', logoBase64 ? margin + 35 : margin, 20);

            // Subtitle
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(0, 163, 255); // #00A3FF (Cyan)
            pdf.text('RELATÓRIO DE AUDITORIA DE INTELIGÊNCIA ARTIFICIAL', logoBase64 ? margin + 35 : margin, 28);

            // Date
            pdf.setFontSize(9);
            pdf.setTextColor(148, 163, 184);
            pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, logoBase64 ? margin + 35 : margin, 36);

            y = 55;

            // ========== EXECUTIVE SUMMARY ==========
            addTitle('RESUMO EXECUTIVO', 18);
            y += 5;

            // Score Box - CORES OFICIAIS
            // Good: #00FF94 background tint, Bad: #FF0055 background tint
            pdf.setFillColor(isGood ? 10 : 30, isGood ? 40 : 15, isGood ? 35 : 25);
            pdf.roundedRect(margin, y, pageWidth - margin * 2, 35, 3, 3, 'F');

            // Border accent
            pdf.setDrawColor(isGood ? 0 : 255, isGood ? 255 : 0, isGood ? 148 : 85);
            pdf.setLineWidth(0.5);
            pdf.roundedRect(margin, y, pageWidth - margin * 2, 35, 3, 3, 'S');

            // Score number
            pdf.setFontSize(40);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(isGood ? 0 : 255, isGood ? 255 : 0, isGood ? 148 : 85); // #00FF94 or #FF0055
            pdf.text(`${score}`, margin + 10, y + 25);

            pdf.setFontSize(12);
            pdf.text('/100', margin + 35, y + 25);

            // Status text
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(isGood ? 0 : 255, isGood ? 255 : 0, isGood ? 148 : 85);
            pdf.text(isGood ? 'MODELO AUDITÁVEL' : 'CAIXA-PRETA DETECTADA', margin + 60, y + 18);

            // Verdict description
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(148, 163, 184);
            const verdictLines = pdf.splitTextToSize(verdict, pageWidth - margin * 2 - 60);
            pdf.text(verdictLines, margin + 60, y + 26);

            y += 50;

            // ========== DETAILED FINDINGS ==========
            addTitle('ANÁLISE DETALHADA', 16);
            y += 8;

            // Iterate through metrics
            metrics.forEach((m) => {
                const config = CONFIG[m.label as keyof typeof CONFIG];
                if (config) {
                    const status = m.trend === 'up' ? '✓ Adequado' : '⚠ Atenção';
                    addSection(
                        `${m.label}: ${m.value} ${m.sub ? `(${m.sub})` : ''} - ${status}`,
                        config.meaning,
                        config.action
                    );
                }
            });

            // ========== CHART ANALYSIS ==========
            addSection(
                'Evolução Temporal',
                CONFIG['Evolução Temporal'].meaning,
                CONFIG['Evolução Temporal'].action
            );

            addSection(
                'Distribuição de Variáveis',
                CONFIG['Distribuição'].meaning,
                CONFIG['Distribuição'].action
            );

            // ========== CONCLUSION ==========
            if (y > 220) {
                pdf.addPage();
                y = 20;
            }

            addTitle('CONCLUSÃO E PRÓXIMOS PASSOS', 16);
            y += 5;

            if (isGood) {
                addText('O modelo analisado apresenta características compatíveis com as boas práticas de governança de IA. Recomenda-se manter o monitoramento contínuo e realizar auditorias periódicas para garantir a conformidade ao longo do tempo.');
                y += 5;
                addText('Próximos passos sugeridos:');
                addText('1. Documentar os resultados desta auditoria no inventário de IA da organização.');
                addText('2. Agendar próxima auditoria em 90 dias.');
                addText('3. Compartilhar este relatório com o comitê de governança.');
            } else {
                addText('O modelo analisado apresenta RISCOS SIGNIFICATIVOS que requerem ação imediata. A ausência de mecanismos de explicabilidade configura uma "caixa-preta" algorítmica, o que pode violar o Art. 20 da LGPD e expor a organização a sanções administrativas.');
                y += 5;
                addText('Próximos passos OBRIGATÓRIOS:');
                addText('1. SUSPENDER o uso do modelo em decisões que afetem pessoas até regularização.');
                addText('2. Notificar o fornecedor da IA sobre os requisitos de explicabilidade.');
                addText('3. Agendar reunião urgente com o DPO e jurídico da organização.');
                addText('4. Documentar este relatório como evidência de due diligence.');
            }

            // ========== FOOTER ==========
            const totalPages = pdf.internal.pages.length - 1;
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.setTextColor(148, 163, 184);
                pdf.text(`ALGOR BRASIL - Relatório Confidencial - Página ${i} de ${totalPages}`, margin, 290);
                pdf.text('Este documento foi gerado automaticamente pelo sistema de auditoria algorítmica.', pageWidth - margin - 80, 290);
            }

            pdf.save(`ALGOR_Relatorio_Auditoria_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (e) {
            console.error('Erro ao gerar PDF:', e);
            alert('Erro ao gerar o relatório. Tente novamente.');
        }
        finally { setExporting(false); }
    };

    return (
        <motion.div
            ref={dashboardRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-[#0D1117] rounded-2xl overflow-hidden"
        >
            {/* HEADER */}
            <div className="bg-[#161B26] px-6 py-4 border-b border-[#21262D] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isGood ? 'bg-[#00F0FF]/20' : 'bg-[#FF3366]/20'}`}>
                        <Shield className="w-5 h-5" style={{ color: mainColor }} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">ALGOR HEALTH LAB • {type.toUpperCase()}</p>
                        <h1 className="text-xl font-bold text-white">{title}</h1>
                    </div>
                </div>
                <button onClick={handleExportPDF} disabled={exporting}
                    className="flex items-center gap-2 px-4 py-2 bg-[#21262D] hover:bg-[#30363D] rounded-lg transition-all">
                    <FileText className="w-4 h-4 text-[#00F0FF]" />
                    <span className="text-sm text-white">{exporting ? 'Gerando...' : 'Exportar PDF'}</span>
                </button>
            </div>

            {/* CONTENT */}
            <div className="p-5 grid grid-cols-12 gap-4">

                {/* ========== COLUNA ESQUERDA: SCORE ========== */}
                <div className="col-span-12 lg:col-span-4">
                    <motion.div
                        className="bg-[#161B26] rounded-xl p-5 border border-[#21262D] h-full relative overflow-hidden"
                        animate={{ boxShadow: isGood ? '0 0 60px rgba(0,240,255,0.1)' : '0 0 60px rgba(255,51,102,0.15)' }}
                    >
                        {/* Animated Background Glow */}
                        <motion.div
                            className="absolute inset-0 rounded-xl"
                            animate={{
                                background: [
                                    `radial-gradient(circle at 50% 50%, ${mainColor}10 0%, transparent 50%)`,
                                    `radial-gradient(circle at 50% 50%, ${mainColor}20 0%, transparent 60%)`,
                                    `radial-gradient(circle at 50% 50%, ${mainColor}10 0%, transparent 50%)`,
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        <p className="text-xs text-gray-500 uppercase tracking-widest text-center mb-4 relative z-10">Índice de Conformidade</p>

                        {/* DONUT CHART */}
                        <div className="relative mx-auto" style={{ width: 180, height: 180 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <defs>
                                        <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor={mainColor} />
                                            <stop offset="100%" stopColor={secondColor} />
                                        </linearGradient>
                                    </defs>
                                    <Pie
                                        data={donutData}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={85}
                                        startAngle={90} endAngle={-270}
                                        dataKey="value" stroke="none"
                                    >
                                        <Cell fill="url(#scoreGrad)" />
                                        <Cell fill="#1E2433" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Center Number */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                    className="text-5xl font-black"
                                    style={{ color: mainColor, textShadow: `0 0 30px ${mainColor}60` }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <AnimatedValue value={score} />
                                </motion.span>
                                <span className="text-xs text-gray-500">de 100 pts</span>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="text-center mt-4 relative z-10">
                            <motion.div
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${isGood ? 'bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30' : 'bg-[#FF3366]/15 text-[#FF3366] border border-[#FF3366]/30'
                                    }`}
                                animate={{ scale: [1, 1.03, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            >
                                {isGood ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                {isGood ? 'Modelo Auditável' : 'Caixa-Preta'}
                            </motion.div>
                        </div>

                        {/* Mini Stats - FIXED OVERFLOW */}
                        <div className="grid grid-cols-3 gap-2 mt-5 relative z-10">
                            {[
                                { label: 'Segur.', value: isGood ? 92 : 23, color: '#00F0FF' },
                                { label: 'Transp.', value: score, color: '#9945FF' },
                                { label: 'Compl.', value: isGood ? 88 : 15, color: '#00FF87' },
                            ].map((item, i) => (
                                <div key={i} className="text-center p-2 bg-[#0D1117] rounded-lg">
                                    <div className="text-lg font-bold text-white">{item.value}%</div>
                                    <div className="text-[9px] text-gray-500 uppercase truncate">{item.label}</div>
                                    <div className="w-full h-1 bg-[#21262D] rounded-full mt-1.5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ========== COLUNA DIREITA: MÉTRICAS E GRÁFICOS ========== */}
                <div className="col-span-12 lg:col-span-8 space-y-4">

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ overflow: 'visible' }}>
                        {metrics.map((m, i) => {
                            const colors = ['#00F0FF', '#9945FF', '#00FF87'];
                            const icons = [<Layers key={0} className="w-5 h-5" />, <Brain key={1} className="w-5 h-5" />, <Activity key={2} className="w-5 h-5" />];
                            const color = colors[i % 3];
                            const config = CONFIG[m.label as keyof typeof CONFIG];

                            return (
                                <div key={i} className="bg-[#161B26] rounded-xl p-4 border border-[#21262D] relative group" style={{ overflow: 'visible' }}>
                                    {/* Tooltip */}
                                    {config && <CardTooltip text={config.meaning} action={config.action} />}

                                    {/* Glow on hover */}
                                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: color }} />

                                    {/* Icon */}
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${color}20` }}>
                                        <div style={{ color }}>{icons[i]}</div>
                                    </div>

                                    {/* Value */}
                                    <div className="text-3xl font-black text-white mb-1">
                                        {typeof m.value === 'number' ? <AnimatedValue value={m.value} /> : m.value}
                                    </div>
                                    <div className="text-xs text-gray-400 mb-3">{m.label}</div>

                                    {/* Trend + Sparkline */}
                                    <div className="flex items-center justify-between">
                                        <div className="h-8 flex-1 mr-2">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={[{ v: 30 }, { v: 50 }, { v: 35 }, { v: 60 }, { v: typeof m.value === 'number' ? m.value : 50 }]}>
                                                    <defs>
                                                        <linearGradient id={`sp-${i}`} x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                                                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#sp-${i})`} />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                        {m.trend && (
                                            <div className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold ${m.trend === 'up' ? 'bg-[#00FF87]/20 text-[#00FF87]' : 'bg-[#FF3366]/20 text-[#FF3366]'
                                                }`}>
                                                {m.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                {m.trend === 'up' ? '+15%' : '-8%'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CHARTS ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                        {/* EVOLUÇÃO TEMPORAL */}
                        <div className="md:col-span-3 bg-[#161B26] rounded-xl p-4 border border-[#21262D] relative">
                            <CardTooltip
                                text={CONFIG['Evolução Temporal'].meaning}
                                action={CONFIG['Evolução Temporal'].action}
                            />

                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Evolução Temporal</h3>
                                    <p className="text-[10px] text-gray-500">Histórico de análises</p>
                                </div>
                                <div className="flex items-center gap-3 text-[10px]">
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00F0FF]" /> Score</span>
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#9945FF]" /> Meta</span>
                                </div>
                            </div>

                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#00F0FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#30363D" fontSize={9} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#30363D" fontSize={9} tickLine={false} axisLine={false} domain={[0, 100]} />
                                    <RechartsTooltip contentStyle={{ backgroundColor: '#161B26', border: '1px solid #30363D', borderRadius: '8px', fontSize: '11px' }} />
                                    <Area type="monotone" dataKey="value" stroke="#00F0FF" strokeWidth={2} fill="url(#areaGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* DISTRIBUIÇÃO */}
                        <div className="md:col-span-2 bg-[#161B26] rounded-xl p-4 border border-[#21262D] relative">
                            <CardTooltip
                                text={CONFIG['Distribuição'].meaning}
                                action={CONFIG['Distribuição'].action}
                            />

                            <h3 className="text-sm font-semibold text-white mb-1">Distribuição</h3>
                            <p className="text-[10px] text-gray-500 mb-3">{type === 'xai' ? 'Variáveis detectadas' : 'Por categoria'}</p>

                            <ResponsiveContainer width="100%" height={130}>
                                <BarChart layout="vertical" data={barData} barSize={14}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={60} tickLine={false} axisLine={false} />
                                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
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

            {/* FOOTER - VERDICT */}
            <div className={`mx-5 mb-5 p-4 rounded-xl border ${isGood ? 'bg-[#00FF87]/5 border-[#00FF87]/20' : 'bg-[#FF3366]/5 border-[#FF3366]/20'}`}>
                <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isGood ? 'bg-[#00FF87]/20' : 'bg-[#FF3366]/20'}`}>
                        {isGood ? <CheckCircle className="w-5 h-5 text-[#00FF87]" /> : <AlertTriangle className="w-5 h-5 text-[#FF3366]" />}
                    </div>
                    <div>
                        <div className={`text-sm font-bold ${isGood ? 'text-[#00FF87]' : 'text-[#FF3366]'}`}>
                            {isGood ? '✓ Diagnóstico Favorável' : '⚠ Ação Corretiva Necessária'}
                        </div>
                        <div className="text-sm text-gray-400 mt-0.5">{verdict}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
