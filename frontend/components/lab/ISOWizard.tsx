"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Award, Zap, ChevronRight, FileText, RefreshCw, Loader2 } from 'lucide-react';

const QUESTIONS = [
    { id: 'q1', text: "Existe um responsável (humano) nomeado pela supervisão das decisões da IA?", category: "Governança" },
    { id: 'q2', text: "O sistema gera logs de explicabilidade (XAI) acessíveis para auditoria externa?", category: "Transparência" },
    { id: 'q3', text: "Há evidência de testes de viés (fairness) para diferentes etnias e faixas etárias?", category: "Dados" },
    { id: 'q4', text: "O modelo é protegido contra ataques adversariais ou envenenamento de dados?", category: "Segurança" },
    { id: 'q5', text: "A IA utiliza dados sensíveis (saúde/biometria) sem uma base legal documentada?", category: "Privacidade" }
];

export default function ISOWizard() {
    const [step, setStep] = useState(0); // 0-4 = Perguntas, 5 = Resultado
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);

    const handleAnswer = async (val: string) => {
        const newAnswers = { ...answers, [QUESTIONS[step].id]: val };
        setAnswers(newAnswers);

        if (step < QUESTIONS.length - 1) {
            setTimeout(() => setStep(s => s + 1), 250);
        } else {
            await finishAssessment(newAnswers);
        }
    };

    const finishAssessment = async (finalAnswers: Record<string, string>) => {
        setLoading(true);
        setStep(5);
        try {
            const res = await fetch('/api/v1/lab/iso/assess', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: finalAnswers })
            });
            const data = await res.json();
            setTimeout(() => {
                setResult(data);
                setLoading(false);
            }, 1500);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    // --- TITAN PDF ENGINE (ISO 42001 EDITION) ---
    const handleExportPDF = async () => {
        if (!result) return;
        setExporting(true);

        try {
            const jsPDF = (await import('jspdf')).default;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;

            // HELPER: Auto-page break
            let y = 0;
            const checkPageBreak = (spaceNeeded: number) => {
                if (y + spaceNeeded > pageHeight - margin) {
                    pdf.addPage();
                    y = margin;
                    return true;
                }
                return false;
            };

            // HELPER: Load & Sanitize Image
            const loadImage = async (url: string): Promise<{ data: string; w: number; h: number } | null> => {
                try {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.crossOrigin = 'Anonymous';
                        img.src = url;
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            if (ctx) {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(img, 0, 0);
                                resolve({ data: canvas.toDataURL('image/png'), w: img.width, h: img.height });
                            } else resolve(null);
                        };
                        img.onerror = () => resolve(null);
                    });
                } catch { return null; }
            };

            // HELPER: Load Font
            const loadFont = async (url: string): Promise<string> => {
                try {
                    const res = await fetch(url);
                    const blob = await res.blob();
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
                        reader.readAsDataURL(blob);
                    });
                } catch { return ''; }
            };

            // --- DRAW HEADER V5.1 ---
            const drawHeader = async () => {
                // Load Orbitron
                const orbitronBase64 = await loadFont('/fonts/Orbitron-Bold.ttf');
                let fontReady = false;
                if (orbitronBase64) {
                    pdf.addFileToVFS('Orbitron.ttf', orbitronBase64);
                    pdf.addFont('Orbitron.ttf', 'Orbitron', 'bold');
                    fontReady = true;
                }

                const topBarHeight = 40;
                pdf.setFillColor(0, 0, 0);
                pdf.rect(0, 0, pageWidth, topBarHeight, 'F');

                // Logo
                let logoObj = await loadImage('/logo-algor.webp');
                if (logoObj) {
                    const maxH = 32;
                    const ratio = logoObj.w / logoObj.h;
                    pdf.addImage(logoObj.data, 'PNG', margin, 4, maxH * ratio, maxH);
                }

                // Title
                if (fontReady) pdf.setFont('Orbitron', 'bold');
                else pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(32);
                pdf.setTextColor(255, 255, 255);
                pdf.text('ALGOR', margin + 45, 26);
                pdf.setTextColor(0, 255, 148);
                pdf.text('BRASIL', margin + 45 + pdf.getTextWidth('ALGOR') + 4, 26);

                // Separator
                pdf.setFillColor(0, 255, 148);
                pdf.rect(0, topBarHeight, pageWidth, 0.8, 'F');

                // Sub-Header
                const headerHeight = 35;
                const headerY = topBarHeight + 0.8;
                pdf.setFillColor(10, 22, 40);
                pdf.rect(0, headerY, pageWidth, headerHeight, 'F');

                // Report Type
                pdf.setFontSize(14);
                pdf.setTextColor(255, 255, 255);
                pdf.text('AUDITORIA DE CONFORMIDADE', margin, headerY + 12);

                pdf.setFontSize(10);
                pdf.setTextColor(0, 240, 255);
                pdf.text('ISO/IEC 42001:2023 - AI MANAGEMENT SYSTEM', margin, headerY + 20);

                // Status Box
                const isPassing = result.score >= 70;
                pdf.setDrawColor(isPassing ? 0 : 255, isPassing ? 255 : 50, isPassing ? 148 : 50);
                pdf.setFillColor(13, 25, 48);
                pdf.roundedRect(pageWidth - margin - 60, headerY + 6, 60, 22, 1, 1, 'FD');

                pdf.setFontSize(12);
                pdf.setTextColor(isPassing ? 0 : 255, isPassing ? 255 : 50, isPassing ? 148 : 50);
                pdf.text(isPassing ? 'STATUS: CONFORME' : 'STATUS: CRÍTICO', pageWidth - margin - 55, headerY + 14);

                pdf.setFontSize(8);
                pdf.setTextColor(200, 220, 240);
                pdf.text(`REF: ${Math.random().toString(36).substr(2, 6).toUpperCase()}`, pageWidth - margin - 55, headerY + 22);

                return headerY + headerHeight + 10; // New Y
            };

            y = await drawHeader();

            // --- SECTION 1: EXECUTIVE SUMMARY (Score & Maturity) ---
            pdf.setFontSize(14);
            if (pdf.getFontList().Orbitron) pdf.setFont('Orbitron', 'bold');
            pdf.setTextColor(10, 26, 47);
            pdf.text('RESUMO EXECUTIVO', margin, y);
            y += 10;

            // Score Card
            const isPassing = result.score >= 70;
            const cardHeight = 60;
            pdf.setFillColor(248, 250, 252); // Light bg for printability
            pdf.setDrawColor(226, 232, 240);
            pdf.roundedRect(margin, y, pageWidth - margin * 2, cardHeight, 3, 3, 'FD');

            // Gauge (Simulated)
            const cx = margin + 30;
            const cy = y + 30;
            pdf.setLineWidth(3);
            pdf.setDrawColor(220, 220, 220);
            pdf.circle(cx, cy, 20, 'S');

            pdf.setDrawColor(isPassing ? 0 : 255, isPassing ? 255 : 0, isPassing ? 148 : 0);
            // Partial Arc (approx)
            const angle = 2 * Math.PI * (result.score / 100);
            pdf.circle(cx, cy, 20, 'S'); // Simplified for this implementation, ideally construct path

            pdf.setFontSize(24);
            pdf.setTextColor(15, 23, 42);
            pdf.text(result.score.toString(), cx - 8, cy + 3);

            // Maturity Details
            pdf.setFontSize(16);
            pdf.text(result.maturity_level, margin + 60, y + 15);

            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(71, 85, 105);
            const summaryText = isPassing
                ? "A organização demonstra controles sólidos de governança de IA, alinhados com as melhores práticas da ISO 42001. Recomenda-se a manutenção contínua e monitoramento de novos riscos."
                : "Foram identificadas lacunas significativas na estrutura de governança. A organização está exposta a riscos regulatórios e operacionais que exigem remediação imediata.";
            pdf.text(pdf.splitTextToSize(summaryText, pageWidth - margin * 2 - 80), margin + 60, y + 25);

            y += cardHeight + 15;

            // --- SECTION 2: RECOMMENDATIONS ---
            checkPageBreak(20);
            pdf.setFontSize(14);
            if (pdf.getFontList().Orbitron) pdf.setFont('Orbitron', 'bold');
            pdf.setTextColor(10, 26, 47);
            pdf.text('PLANO DE AÇÃO PRIORITÁRIO', margin, y);
            y += 10;

            if (result.recommendations && result.recommendations.length > 0) {
                result.recommendations.forEach((rec: string, i: number) => {
                    checkPageBreak(25);

                    pdf.setFillColor(248, 250, 252);
                    pdf.setDrawColor(226, 232, 240);
                    pdf.setLineWidth(0.5);
                    pdf.roundedRect(margin, y, pageWidth - margin * 2, 20, 2, 2, 'FD');

                    // Badge
                    pdf.setFillColor(10, 26, 47);
                    pdf.roundedRect(margin + 5, y + 5, 10, 10, 2, 2, 'F');
                    pdf.setTextColor(0, 255, 148);
                    pdf.setFontSize(8);
                    pdf.text((i + 1).toString(), margin + 7.5, y + 11);

                    // Text
                    pdf.setTextColor(51, 65, 85);
                    pdf.setFontSize(10);
                    pdf.setFont('helvetica', 'normal');
                    const textLines = pdf.splitTextToSize(rec, pageWidth - margin * 2 - 25);
                    pdf.text(textLines, margin + 20, y + 9);

                    y += 25;
                });
            } else {
                pdf.setFontSize(10);
                pdf.setTextColor(100, 100, 100);
                pdf.text("Nenhuma recomendação crítica identificada.", margin, y + 5);
            }

            // --- FOOTER ---
            const pageCount = (pdf.internal as any).getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.setTextColor(150, 150, 150);
                pdf.text(`Gerado por ALGOR HEALTH LAB • Página ${i} de ${pageCount}`, margin, pageHeight - 10);
            }

            pdf.save(`ALGOR_ISO42001_Audit_${new Date().toISOString().split('T')[0]}.pdf`);

        } catch (error) {
            console.error(error);
            alert("Erro ao gerar PDF. Tente novamente.");
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto min-h-[600px] flex flex-col items-center justify-center relative">

            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] to-black -z-20 rounded-3xl" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 -z-10" />

            {/* Questions Wizard */}
            <AnimatePresence mode="wait">
                {step < 5 && (
                    <motion.div
                        key="wizard-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full flex flex-col items-center"
                    >
                        {/* ENERGY PROGRESS BAR */}
                        <div className="w-full max-w-2xl mb-12 relative">
                            <div className="flex justify-between text-[10px] font-orbitron text-gray-500 uppercase tracking-widest mb-3">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" /> CONFIGURAÇÃO DE SISTEMA</span>
                                <span>SEQUÊNCIA {step + 1}/{QUESTIONS.length}</span>
                            </div>

                            <div className="w-full h-3 bg-[#0f172a] rounded-full overflow-hidden border border-white/5 shadow-inner relative">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyan-900 via-cyan-500 to-cyan-400 relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                >
                                    {/* Flowing energy effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full -translate-x-full animate-[shimmer_1.5s_infinite]" />

                                    {/* Leading edge glow */}
                                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[4px]" />
                                </motion.div>
                            </div>

                            {/* Segment Indicator (Radar Pulse) */}
                            <motion.div
                                className="absolute top-[28px] -ml-2 rounded-full w-4 h-4 bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-10"
                                style={{ left: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <div className="absolute inset-0 rounded-full border border-cyan-200 animate-ping" />
                            </motion.div>
                        </div>

                        {/* QUESTION CARD (Glassmorphism) */}
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="w-full max-w-3xl relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 rounded-3xl blur-xl -z-10" />

                            <div className="backdrop-blur-xl bg-[#0F121C]/80 border border-white/10 rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                                {/* Border Glow */}
                                <div className="absolute inset-0 rounded-3xl border border-cyan-500/20 pointer-events-none" />

                                {/* Category Pill (LED Style) */}
                                <div className="flex justify-center mb-8">
                                    <span className="relative inline-flex items-center px-4 py-1.5 bg-[#1a1f2e] border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 shadow-[0_0_8px_#22d3ee]" />
                                        {QUESTIONS[step].category}
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-orbitron text-white text-center mb-12 leading-tight drop-shadow-lg">
                                    {QUESTIONS[step].text}
                                </h2>

                                {/* Holographic Buttons Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* NO BUTTON */}
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAnswer('no')}
                                        className="relative group h-40 rounded-2xl border border-white/5 bg-[#0a0f16] overflow-hidden flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/20 group-hover:to-transparent transition-all duration-500" />
                                        <X className="w-12 h-12 text-gray-600 group-hover:text-red-500 transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_rgba(239,68,68,1)]" />
                                        <span className="text-gray-500 font-orbitron text-lg font-bold tracking-wider group-hover:text-red-100 transition-colors duration-300">NÃO</span>
                                        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                    </motion.button>

                                    {/* PARTIAL BUTTON */}
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAnswer('partial')}
                                        className="relative group h-40 rounded-2xl border border-white/5 bg-[#0a0f16] overflow-hidden flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 to-amber-600/0 group-hover:from-amber-600/20 group-hover:to-transparent transition-all duration-500" />
                                        <AlertCircle className="w-12 h-12 text-gray-600 group-hover:text-amber-500 transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,1)]" />
                                        <span className="text-gray-500 font-orbitron text-lg font-bold tracking-wider group-hover:text-amber-100 transition-colors duration-300">PARCIAL</span>
                                        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                    </motion.button>

                                    {/* YES BUTTON */}
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAnswer('yes')}
                                        className="relative group h-40 rounded-2xl border border-white/5 bg-[#0a0f16] overflow-hidden flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 to-cyan-600/0 group-hover:from-cyan-600/20 group-hover:to-transparent transition-all duration-500" />
                                        <Check className="w-12 h-12 text-gray-600 group-hover:text-cyan-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,1)]" />
                                        <span className="text-gray-500 font-orbitron text-lg font-bold tracking-wider group-hover:text-cyan-100 transition-colors duration-300">SIM</span>

                                        {/* Particles Effect on Active (Simulated by simple glow for now) */}
                                        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                    </motion.button>
                                </div>

                                <div className="mt-8 text-center">
                                    <button
                                        onClick={() => setStep(Math.max(0, step - 1))}
                                        className={`text-xs text-gray-600 hover:text-gray-400 uppercase tracking-widest transition-colors ${step === 0 ? 'invisible' : ''}`}
                                    >
                                        ← Voltar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Loading State */}
                {loading && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center p-20"
                    >
                        <div className="relative w-32 h-32 mb-8">
                            <motion.div
                                className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-4 rounded-full border-4 border-t-transparent border-r-cyan-300 border-b-transparent border-l-purple-300 opacity-50"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <Zap className="absolute inset-0 m-auto w-10 h-10 text-white animate-pulse" />
                        </div>
                        <h3 className="text-xl font-orbitron text-white tracking-widest animate-pulse">PROCESSANDO DADOS ISO 42001...</h3>
                    </motion.div>
                )}

                {/* Result State */}
                {!loading && step === 5 && result && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-5xl"
                    >
                        <div className="flex flex-col gap-8">

                            {/* TOP ROW: MATURITY + SCORE */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                                {/* 1. MATURITY LEVEL CARD (Focus) */}
                                <div className="md:col-span-2 relative group">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${result.score >= 70 ? 'from-[#00FF94]/20' : 'from-amber-500/20'} to-transparent rounded-3xl blur-xl -z-10`} />

                                    <div className={`h-full bg-[#0F121C]/80 backdrop-blur-xl border ${result.score >= 70 ? 'border-[#00FF94]/30' : 'border-amber-500/30'} rounded-3xl p-10 flex items-center gap-8 relative overflow-hidden shadow-2xl`}>
                                        {/* Ambient Glow */}
                                        <div className={`absolute -left-20 top-0 w-64 h-64 ${result.score >= 70 ? 'bg-[#00FF94]/10' : 'bg-amber-500/10'} rounded-full blur-[80px] pointer-events-none`} />

                                        {/* Neon Medal */}
                                        <div className="relative">
                                            <div className={`absolute inset-0 ${result.score >= 70 ? 'bg-[#00FF94]' : 'bg-amber-500'} blur-[40px] opacity-40 animate-pulse`} />
                                            <Award className={`w-32 h-32 ${result.score >= 70 ? 'text-[#00FF94]' : 'text-amber-500'} drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`} strokeWidth={1} />
                                        </div>

                                        <div className="flex-1 relative z-10">
                                            <h3 className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-2 font-bold">Nível de Maturidade</h3>
                                            <h1 className={`text-5xl font-black font-orbitron tracking-tight mb-4 ${result.score >= 70 ? 'text-[#00FF94] drop-shadow-[0_0_10px_rgba(0,255,148,0.8)]' : 'text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]'}`}>
                                                {result.maturity_level}
                                            </h1>
                                            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-white/10 pl-4 py-1">
                                                {result.score >= 70
                                                    ? "Sua governança de IA está avançada. O sistema demonstra controles robustos e alinhamento estratégico."
                                                    : "A governança está em estágio inicial. São necessárias ações corretivas imediatas para evitar riscos regulatórios."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. SCORE METER (Circular) */}
                                <div className="bg-[#0F121C]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center relative shadow-2xl">
                                    <h3 className="text-xs text-gray-500 uppercase tracking-widest absolute top-6">Score de Conformidade</h3>

                                    <div className="relative w-48 h-48 flex items-center justify-center mt-4">
                                        {/* Outer Ring */}
                                        <svg className="w-full h-full -rotate-90">
                                            <circle cx="96" cy="96" r="88" stroke="#1e293b" strokeWidth="12" fill="none" />
                                            <circle
                                                cx="96" cy="96" r="88"
                                                stroke={result.score >= 70 ? '#00FF94' : '#EF4444'}
                                                strokeWidth="12"
                                                fill="none"
                                                strokeDasharray={2 * Math.PI * 88}
                                                strokeDashoffset={2 * Math.PI * 88 * (1 - result.score / 100)}
                                                strokeLinecap="round"
                                                className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                            />
                                        </svg>

                                        {/* Inner Content */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            {result.score < 70 && <AlertCircle className="w-8 h-8 text-red-500 mb-2 animate-pulse" />}
                                            <span className={`text-5xl font-black ${result.score >= 70 ? 'text-[#00FF94]' : 'text-red-500'} drop-shadow-lg`}>{result.score}</span>
                                            <span className="text-xs text-gray-400 font-mono">/100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM ROW: RECOMMENDATIONS (Data Panels) */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-white font-bold font-orbitron flex items-center gap-3 text-xl">
                                        <span className="w-1 h-6 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]" />
                                        RECOMENDAÇÕES PRIORITÁRIAS
                                    </h3>
                                    <div className="space-y-4">
                                        {result.recommendations.map((rec: string, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: i * 0.15 }}
                                                className="group relative bg-white/5 backdrop-blur-md border border-white/5 hover:border-cyan-500/40 rounded-xl p-5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 cursor-none"
                                            >
                                                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                                    <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                                                </div>

                                                <div className="flex gap-5 items-start relative z-10">
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0A0E1A] border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                                                        0{i + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-gray-200 font-bold text-sm mb-1 group-hover:text-cyan-100 transition-colors">Ação Requerida</h4>
                                                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">{rec}</p>
                                                    </div>
                                                </div>

                                                {/* Data Flow Animation on Hover */}
                                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: NEXT STEPS / ACTION */}
                                <div className="bg-[#0F121C]/60 border border-white/5 rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                                    <FileText className="w-16 h-16 text-cyan-500 mb-6 animate-pulse" />
                                    <h3 className="text-2xl font-orbitron text-white mb-4">RELATÓRIO TÉCNICO</h3>
                                    <p className="text-gray-400 mb-8 max-w-md">
                                        Baixe o documento oficial com o detalhamento das não-conformidades e plano de ação.
                                    </p>

                                    <button
                                        onClick={handleExportPDF}
                                        disabled={exporting}
                                        className="relative group w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold font-orbitron text-white tracking-wider overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-transform hover:scale-105 active:scale-95 mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md" />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            BAIXAR PDF {exporting && <Loader2 className="w-4 h-4 animate-spin ml-2" />} {!exporting && <ChevronRight className="w-4 h-4 ml-2" />}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => { setStep(0); setAnswers({}); setResult(null); }}
                                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest mt-4"
                                    >
                                        <RefreshCw className="w-3 h-3" /> Iniciar Nova Auditoria
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}
