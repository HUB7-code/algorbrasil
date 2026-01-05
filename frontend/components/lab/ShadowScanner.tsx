"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Search, Lock, EyeOff, FileWarning, Upload } from 'lucide-react';
import PremiumDashboardResult from './PremiumDashboardResult';
import ShadowDashboard from './ShadowDashboard';

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

    // --- CLIENT-SIDE SIMULATION ENGINE (DEMO MODE) ---
    const simulateScan = async (inputText: string): Promise<ScanResult> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const detected: ScanEntity[] = [];
                let sanitized = inputText;
                let riskScore = 15; // Base risk

                // 1. CRM Pattern (CRM/SP 123456)
                const crmRegex = /CRM\/?[A-Z]{2}\s?\d{4,8}/gi;
                let match;
                while ((match = crmRegex.exec(inputText)) !== null) {
                    detected.push({ type: 'CRM_MEDICO', value: match[0], start: match.index, end: match.index + match[0].length });
                    riskScore += 25;
                }

                // 2. CID-10 (A00, J12.9)
                const cidRegex = /[A-Z]\d{2}(\.\d)?/g;
                while ((match = cidRegex.exec(inputText)) !== null) {
                    detected.push({ type: 'CID_10', value: match[0], start: match.index, end: match.index + match[0].length });
                    riskScore += 20;
                }

                // 3. CPF Patterns
                const cpfRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;
                while ((match = cpfRegex.exec(inputText)) !== null) {
                    detected.push({ type: 'CPF', value: match[0], start: match.index, end: match.index + match[0].length });
                    riskScore += 30;
                }

                // 4. Keywords (Sensitive)
                const keywords = ["HIV", "CÂNCER", "DEPRESSÃO", "PSIQUE", "SIGILOSO", "CONFIDENCIAL", "PRONTUÁRIO"];
                keywords.forEach(kw => {
                    const kwRegex = new RegExp(kw, 'gi');
                    while ((match = kwRegex.exec(inputText)) !== null) {
                        detected.push({ type: 'SENSIBILIDADE', value: match[0], start: match.index, end: match.index + match[0].length });
                        riskScore += 15;
                    }
                });

                // Sanitize Text (Redact detected entities)
                detected.sort((a, b) => b.start - a.start); // Replace from end to start to allow multiple replacements
                detected.forEach(entity => {
                    const mask = '█'.repeat(entity.value.length);
                    sanitized = sanitized.substring(0, entity.start) + mask + sanitized.substring(entity.end);
                });

                // Cap Score
                riskScore = Math.min(riskScore, 98);

                resolve({
                    risk_score: riskScore,
                    entities_detected: detected,
                    sanitized_text: sanitized,
                    risk_level: riskScore > 60 ? 'CRITICAL' : (riskScore > 30 ? 'HIGH' : 'LOW')
                });
            }, 2000); // 2s scanning effect
        });
    };

    const handleScan = async () => {
        if (!text.trim()) return;
        setStatus('scanning');

        try {
            // Using Client-Side Simulation for flawless Demo
            const data = await simulateScan(text);
            setResult(data);
            setStatus('result');
        } catch (e) {
            console.error(e);
            setStatus('idle');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto min-h-[500px] bg-[#0A0E1A]/80 border border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col">

            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-orbitron font-bold text-white flex items-center gap-2">
                        <EyeOff className="text-red-500" /> Simulador de Shadow AI
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
                        <div className="relative group">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Cole um prontuário, log de chat ou texto clínico aqui..."
                                className="w-full h-64 bg-black/30 border border-white/10 rounded-xl p-4 text-gray-300 font-mono focus:border-red-500/50 outline-none resize-none transition-all"
                            />

                            {/* File Upload Overlay / Drop Zone Hint */}
                            {!text && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                                    <div className="flex flex-col items-center gap-2">
                                        <FileWarning className="w-8 h-8 text-gray-500" />
                                        <span className="text-sm text-gray-500">Cole texto ou Arraste arquivos aqui</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <label className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-gray-300 flex items-center gap-2 transition-all">
                                    <Upload className="w-3 h-3" />
                                    Importar Arquivo
                                    <input
                                        type="file"
                                        accept=".txt,.csv,.json,.md,.log"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (ev) => setText(ev.target?.result as string);
                                                reader.readAsText(file);
                                            }
                                        }}
                                    />
                                </label>
                                <span className="text-[10px] text-gray-600 self-center">(.txt, .csv, .json, .log)</span>
                            </div>

                            <button
                                onClick={handleScan}
                                disabled={!text}
                                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Search className="w-5 h-5" /> ESCANEAR EXPOSIÇÃO
                            </button>
                        </div>
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

                        <ShadowDashboard
                            score={result.risk_score}
                            riskLevel={result.risk_level}
                            entities={result.entities_detected}
                            originalText={text}
                            sanitizedText={result.sanitized_text}
                        />

                        {/* Texto Sanitizado (Extra - Abaixo do Dashboard) */}

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
