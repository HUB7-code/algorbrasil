"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Search, Lock, EyeOff, FileWarning } from 'lucide-react';
import PremiumDashboardResult from './PremiumDashboardResult';

interface ScanEntity {
    type: string;
    value: string;
    start: number;
    end: number;
}

interface ScanResult {
    risk_score: number;
    entities_detected: ScanEntity[];
    sanitized_text: string;
    risk_level: string;
}

export default function ShadowScanner() {
    const [text, setText] = useState('');
    const [status, setStatus] = useState<'idle' | 'scanning' | 'result'>('idle');
    const [result, setResult] = useState<ScanResult | null>(null);

    const handleScan = async () => {
        if (!text.trim()) return;
        setStatus('scanning');

        // Simula delay de scanning
        setTimeout(async () => {
            try {
                const res = await fetch('http://localhost:8000/api/v1/lab/shadow/scan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text })
                });
                const data = await res.json();
                setResult(data);
                setStatus('result');
            } catch (e) {
                console.error(e);
                setStatus('idle');
            }
        }, 1500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto min-h-[500px] bg-[#0A0E1A]/80 border border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col">

            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-orbitron font-bold text-white flex items-center gap-2">
                        <EyeOff className="text-red-500" /> Shadow AI Simulator
                    </h2>
                    <p className="text-gray-400 text-sm">Simule vazamento de dados em IAs públicas (ChatGPT/Gemini).</p>
                </div>
            </div>

            {/* Input Area */}
            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col gap-4"
                    >
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Cole um prontuário ou texto clínico aqui para testar a sanitização..."
                            className="w-full h-64 bg-black/30 border border-white/10 rounded-xl p-4 text-gray-300 font-mono focus:border-red-500/50 outline-none resize-none transition-all"
                        />
                        <button
                            onClick={handleScan}
                            disabled={!text}
                            className="self-end px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Search className="w-5 h-5" /> SCAN EXPOSURE
                        </button>
                    </motion.div>
                )}

                {/* Scanning Animation */}
                {status === 'scanning' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center relative"
                    >
                        <div className="w-full h-1 bg-red-500/50 absolute top-0 animate-scan" />
                        <ShieldAlert className="w-16 h-16 text-red-500 animate-pulse mb-4" />
                        <p className="text-red-400 font-orbitron text-xl">DETECTANDO PII/PHI...</p>
                        <p className="text-gray-500 text-sm mt-2">Buscando padrões de CRM, CID-10 e Dados Sensíveis</p>
                    </motion.div>
                )}

                {/* Result View - PREMIUM DASHBOARD */}
                {status === 'result' && result && (
                    <div className="w-full relative z-20">
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => { setText(''); setStatus('idle'); }}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-2"
                            >
                                <Search className="w-3 h-3" /> Nova Simulação
                            </button>
                        </div>

                        <PremiumDashboardResult
                            type="shadow"
                            title="Relatório de Exposição de Dados"
                            score={result.risk_score}
                            riskLevel={result.risk_level}
                            verdict={result.risk_score > 50 ? "VAZAMENTO CRÍTICO DE DADOS SENSÍVEIS (LGPD/PL 2338)" : "Texto Sanitizado com Sucesso."}
                            metrics={[
                                { label: 'Entidades', value: result.entities_detected.length, sub: 'PII/PHI Encontrados', trend: result.entities_detected.length > 0 ? 'down' : 'up' },
                                { label: 'Caracteres', value: result.sanitized_text.length, sub: 'Volume Processado' },
                                { label: 'Ofuscação', value: 'ATIVADA', sub: 'Máscara de Privacidade' }
                            ]}
                            chartData={[
                                { name: 'Part 1', value: Math.random() * 20 },
                                { name: 'Part 2', value: Math.random() * 50 },
                                { name: 'Part 3', value: result.risk_score },
                                { name: 'Part 4', value: Math.max(0, result.risk_score - 10) },
                                { name: 'Part 5', value: result.risk_score }
                            ]}
                            barData={
                                result.entities_detected.length > 0
                                    ? Array.from(new Set(result.entities_detected.map(e => e.type))).map(type => ({
                                        name: type,
                                        value: result.entities_detected.filter(e => e.type === type).length * 10
                                    }))
                                    : [{ name: 'Seguro', value: 100 }]
                            }
                        />

                        {/* Texto Sanitizado (Extra - Abaixo do Dashboard) */}
                        <div className="mt-8 bg-black/40 border border-white/5 rounded-xl p-6 font-mono text-sm text-gray-400">
                            <h3 className="text-xs text-gray-500 uppercase mb-4 flex items-center gap-2">
                                <Lock className="w-3 h-3" /> Visualização Sanitizada (Preview)
                            </h3>
                            <p className="whitespace-pre-wrap leading-relaxed opacity-80">{result.sanitized_text}</p>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @keyframes scan {
                    0% { top: 0; }
                    50% { top: 100%; }
                    100% { top: 0; }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </div>
    );
}
