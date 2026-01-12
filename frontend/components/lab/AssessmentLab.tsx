"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertTriangle, Activity, Lock, Search } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import PremiumDashboardResult from './PremiumDashboardResult';

// Tipos baseados no Backend Schema
interface AuditResult {
    score: number;
    risk_level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    verdict: string;
    transparency_metrics: any;
    detected_explainability_methods: string[];
    missing_critical_components: string[];
    processing_time_ms: number;
}

const EXPERT_PHRASES = [
    "Interrogando pesos sinápticos e vetores de explicabilidade (XAI)...",
    "Mapeando aderência ao Art. 20 da LGPD & requisitos do PL 2338...",
    "Auditando integridade de PHI (Personal Health Information)...",
    "Sintetizando Mapa de Calor de Risco e Veredito de Governança..."
];

export default function AssessmentLab() {
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'result'>('idle');
    const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);
    const [result, setResult] = useState<AuditResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Simulação do "Expert Pause" + Chamada Real
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setStatus('analyzing');
        setLoadingPhraseIndex(0);
        setError(null);

        // Ciclo de frases (Teatro de Auditoria) - 3s total
        const phraseInterval = setInterval(() => {
            setLoadingPhraseIndex(prev => (prev + 1) % EXPERT_PHRASES.length);
        }, 800);

        try {
            // 1. Preparar Upload
            const formData = new FormData();
            formData.append('file', file);

            // 2. Chamar Backend (Real)
            const response = await fetch('/api/v1/lab/xai/audit', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error("Falha na análise do arquivo.");

            const data = await response.json();

            // 3. Garantir o tempo mínimo de "Teatro" (3s)
            setTimeout(() => {
                clearInterval(phraseInterval);
                setResult(data);
                setStatus('result');
            }, 3200);

        } catch (err) {
            clearInterval(phraseInterval);
            setError("Erro ao processar arquivo. Verifique se é um CSV/JSON válido.");
            setStatus('idle');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/csv': ['.csv'], 'application/json': ['.json'] },
        maxFiles: 1
    });

    // Helper para cor de Risco (mantido para compatibilidade, embora o Dashboard tenha o seu próprio)
    const getRiskColor = (level: string) => {
        switch (level) {
            case 'LOW': return '#00FF94'; // Neon Green
            case 'MODERATE': return '#F59E0B'; // Amber
            default: return '#FF0055'; // Electric Red
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0E1A]/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">

            {/* BACKGROUND GRID */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            <AnimatePresence mode='wait'>

                {/* ESTADO 1: IDLE (UPLOAD) */}
                {status === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center w-full max-w-xl z-10"
                    >
                        <h2 className="text-4xl font-orbitron font-bold text-white mb-2">Auditor de IA para Saúde</h2>
                        <p className="text-gray-400 mb-8 font-manrope">Arraste os logs do modelo para iniciar o diagnóstico forense ISO 42001.</p>

                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer group
                                ${isDragActive ? 'border-[#00FF94] bg-[#00FF94]/5' : 'border-white/20 hover:border-[#00A3FF] hover:bg-white/5'}
                            `}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-[#00A3FF]" />
                                </div>
                                <p className="text-lg font-semibold text-white">Solte o arquivo CSV/JSON aqui</p>
                                <p className="text-sm text-gray-500 mt-2">Suporte: SHAP, LIME, Logs Brutos</p>
                            </div>
                        </div>
                        {error && <p className="text-red-500 mt-4 bg-red-500/10 p-2 rounded-lg">{error}</p>}
                    </motion.div>
                )}

                {/* ESTADO 2: THE EXPERT PAUSE (ANALYZING) */}
                {status === 'analyzing' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0E1A]/90 backdrop-blur-md"
                    >
                        {/* Radar Desfocado ao Fundo */}
                        <div className="absolute opacity-20 blur-sm scale-110 pointer-events-none">
                            <ResponsiveContainer width={400} height={400}>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[{ subject: 'A', A: 100 }, { subject: 'B', A: 100 }, { subject: 'C', A: 100 }, { subject: 'D', A: 100 }, { subject: 'E', A: 100 }]}>
                                    <PolarGrid stroke="#333" />
                                    <PolarAngleAxis dataKey="subject" tick={false} />
                                    <PolarRadiusAxis tick={false} />
                                    <Radar name="IA" dataKey="A" stroke="#00A3FF" fill="#00A3FF" fillOpacity={0.1} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Scanner Line */}
                        <motion.div
                            className="w-full h-1 bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent absolute top-1/2"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Frases de Efeito */}
                        <div className="z-30 text-center space-y-4">
                            <Activity className="w-12 h-12 text-[#00A3FF] mx-auto animate-pulse" />
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={loadingPhraseIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-xl font-orbitron text-[#00A3FF] max-w-lg mx-auto h-16"
                                >
                                    {EXPERT_PHRASES[loadingPhraseIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {/* ESTADO 3: RESULTADO (REVEAL - PREMIUM DASHBOARD) */}
                {status === 'result' && result && (
                    <div className="w-full z-10 animate-in fade-in duration-700">
                        <PremiumDashboardResult
                            type="xai"
                            title="Relatório de Auditoria de IA"
                            score={result.score}
                            riskLevel={result.risk_level}
                            verdict={result.verdict}
                            metrics={[
                                { label: 'Variáveis Analisadas', value: result.transparency_metrics.total_columns_scanned, sub: 'Colunas processadas' },
                                { label: 'Métodos de Explicabilidade', value: result.detected_explainability_methods.length, sub: 'SHAP / LIME Detectados', trend: result.detected_explainability_methods.length > 0 ? 'up' : 'down' },
                                { label: 'Entropia', value: result.transparency_metrics.entropy_flag ? 'ALTA' : 'BAIXA', sub: 'Complexidade Interna' }
                            ]}
                            chartData={[
                                { name: 'T-5', value: Math.max(0, result.score - 10) },
                                { name: 'T-4', value: Math.max(0, result.score - 5) },
                                { name: 'T-3', value: result.score },
                                { name: 'T-2', value: Math.min(100, result.score + 2) },
                                { name: 'T-1', value: Math.min(100, result.score + 5) },
                                { name: 'Atual', value: result.score }
                            ]}
                            barData={
                                result.detected_explainability_methods.length > 0
                                    ? result.detected_explainability_methods.map(m => ({ name: m, value: 80 }))
                                    : [{ name: 'Nenhum', value: 0 }, { name: 'BlackBox', value: 100 }]
                            }
                        />
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setStatus('idle')}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-semibold flex items-center gap-2"
                            >
                                <Search className="w-4 h-4" /> Nova Auditoria
                            </button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
