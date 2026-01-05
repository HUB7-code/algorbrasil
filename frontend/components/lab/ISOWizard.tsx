"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { Check, X, AlertCircle, Award, Zap, ChevronRight, FileText, RefreshCw } from 'lucide-react';

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
            const res = await fetch('http://localhost:8000/api/v1/lab/iso/assess', {
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

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Background
        doc.setFillColor(15, 23, 42); // #0F172A
        doc.rect(0, 0, 210, 297, 'F');

        // Header
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("RELATÓRIO DE CONFORMIDADE", 20, 30);

        doc.setFontSize(10);
        doc.setTextColor(0, 240, 255); // Cyan
        doc.text("ISO/IEC 42001:2023 - AI MANAGEMENT SYSTEM", 20, 40);

        // Score Section
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.5);
        doc.line(20, 50, 190, 50);

        doc.setFontSize(14);
        doc.setTextColor(200, 200, 200);
        doc.text("RESULTADO DA AVALIAÇÃO", 20, 70);

        doc.setFontSize(40);
        doc.setTextColor(result.score >= 70 ? 0 : 255, result.score >= 70 ? 255 : 190, result.score >= 70 ? 148 : 0); // Green or Amber
        doc.text(result.score + "/100", 20, 90);

        doc.setFontSize(16);
        doc.setTextColor(255, 255, 255);
        doc.text(`Nível de Maturidade: ${result.maturity_level}`, 20, 105);

        // Recommendations
        doc.setFontSize(14);
        doc.setTextColor(200, 200, 200);
        doc.text("RECOMENDAÇÕES PRIORITÁRIAS", 20, 130);

        let yPos = 145;
        result.recommendations.forEach((rec: string, i: number) => {
            doc.setFillColor(30, 41, 59);
            doc.roundedRect(20, yPos - 5, 170, 20, 2, 2, 'F');

            doc.setFontSize(10);
            doc.setTextColor(0, 240, 255);
            doc.text(`AÇÃO 0${i + 1}`, 25, yPos + 8);

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.text(rec, 50, yPos + 8, { maxWidth: 130 });

            yPos += 25;
        });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Gerado automaticamente por ALGOR HEALTH - ${new Date().toLocaleDateString()}`, 20, 280);

        doc.save('CERTIFICADO_ISO42001.pdf');
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
                                        className="relative group w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold font-orbitron text-white tracking-wider overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-transform hover:scale-105 active:scale-95 mb-4"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md" />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            BAIXAR PDF <ChevronRight className="w-4 h-4" />
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
        </div>
    );
}
