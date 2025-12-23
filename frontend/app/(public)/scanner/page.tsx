"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, FileText, AlertTriangle, CheckCircle,
    ArrowRight, Lock, Zap, Shield, Brain,
    ChevronRight, Sparkles
} from 'lucide-react';

// Limits for Freemium
const FREEMIUM_LIMITS = {
    maxRows: 100,
    maxFileSize: 1024 * 1024, // 1MB
    scansPerMonth: 5
};

interface Finding {
    category: string;
    severity: string;
    description: string;
    regulatory_ref: string;
    estimated_fine: number;
}

interface ScanResult {
    total_rows: number;
    risks_found: number;
    lgpd_score: number;
    operational_score: number;
    owasp_score: number;
    findings: Finding[];
}

export default function ScannerFreemiumPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) validateAndSetFile(droppedFile);
    }, []);

    const validateAndSetFile = (selectedFile: File) => {
        setError(null);

        if (selectedFile.size > FREEMIUM_LIMITS.maxFileSize) {
            setError(`Arquivo muito grande. Limite gratuito: 1MB. Faça upgrade para analisar arquivos maiores.`);
            return;
        }

        const ext = selectedFile.name.split('.').pop()?.toLowerCase();
        if (!['json', 'csv'].includes(ext || '')) {
            setError('Formato inválido. Use JSON ou CSV.');
            return;
        }

        setFile(selectedFile);
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
            const response = await fetch(`${apiUrl}/scanner/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Erro na análise');
            }

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 50) return 'text-amber-400';
        return 'text-red-400';
    };

    const getRiskLevel = (score: number) => {
        if (score >= 80) return { label: 'Baixo Risco', color: 'bg-emerald-500/20 text-emerald-400' };
        if (score >= 50) return { label: 'Risco Moderado', color: 'bg-amber-500/20 text-amber-400' };
        return { label: 'Alto Risco', color: 'bg-red-500/20 text-red-400' };
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0A1A2F] to-[#0A0E1A] pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">Ferramenta Gratuita</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        AI Compliance Scanner
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Descubra se sua IA viola a LGPD em 30 segundos.
                        Faça upload de logs e receba um diagnóstico instantâneo.
                    </motion.p>
                </div>

                {/* Limite Banner */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-amber-400" />
                        <span className="text-amber-200 text-sm">
                            <strong>Versão Gratuita:</strong> Limite de 100 linhas e 1MB por arquivo
                        </span>
                    </div>
                    <a
                        href="/register"
                        className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                        Remover limites <ChevronRight className="w-4 h-4" />
                    </a>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {/* Upload Zone */}
                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className={`
                  relative p-12 rounded-2xl border-2 border-dashed transition-all cursor-pointer
                  ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'}
                `}
                                onClick={() => document.getElementById('file-input')?.click()}
                            >
                                <input
                                    id="file-input"
                                    type="file"
                                    accept=".json,.csv"
                                    className="hidden"
                                    onChange={(e) => e.target.files?.[0] && validateAndSetFile(e.target.files[0])}
                                />

                                <div className="text-center">
                                    {file ? (
                                        <>
                                            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                                            <p className="text-white font-medium text-lg">{file.name}</p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                            <p className="text-white font-medium text-lg">
                                                Arraste seu arquivo aqui
                                            </p>
                                            <p className="text-gray-500 text-sm mt-2">
                                                ou clique para selecionar (JSON ou CSV, máx. 1MB)
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
                                >
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                    <span className="text-red-300 text-sm">{error}</span>
                                </motion.div>
                            )}

                            {/* Analyze Button */}
                            <motion.button
                                onClick={handleAnalyze}
                                disabled={!file || isLoading}
                                className={`
                  w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3
                  ${file && !isLoading
                                        ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:opacity-90'
                                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    }
                `}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analisando...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Analisar Agora
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Score Cards */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: 'LGPD', score: result.lgpd_score, icon: Shield },
                                    { label: 'Operacional', score: result.operational_score, icon: Brain },
                                    { label: 'Segurança', score: result.owasp_score, icon: AlertTriangle }
                                ].map((item) => {
                                    const risk = getRiskLevel(item.score);
                                    return (
                                        <div key={item.label} className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 text-center">
                                            <item.icon className={`w-8 h-8 mx-auto mb-3 ${getScoreColor(item.score)}`} />
                                            <p className="text-gray-400 text-sm mb-2">{item.label}</p>
                                            <p className={`text-3xl font-bold font-mono ${getScoreColor(item.score)}`}>
                                                {item.score}%
                                            </p>
                                            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${risk.color}`}>
                                                {risk.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Summary */}
                            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
                                <h3 className="text-white font-semibold mb-4">Resumo da Análise</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Linhas analisadas</span>
                                        <span className="text-white font-mono">{result.total_rows}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Riscos encontrados</span>
                                        <span className="text-red-400 font-mono">{result.risks_found}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Findings Preview (Limited) */}
                            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-white font-semibold">Detalhes dos Riscos</h3>
                                    {result.findings.length > 3 && (
                                        <span className="text-amber-400 text-xs flex items-center gap-1">
                                            <Lock className="w-3 h-3" />
                                            {result.findings.length - 3} ocultos na versão gratuita
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {result.findings.slice(0, 3).map((finding, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 bg-black/30 rounded-lg">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${finding.severity === 'HIGH' || finding.severity === 'CRITICAL'
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : finding.severity === 'MEDIUM'
                                                        ? 'bg-amber-500/20 text-amber-400'
                                                        : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {finding.severity}
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-gray-300 text-sm">{finding.description}</p>
                                                <p className="text-gray-600 text-xs mt-1">{finding.regulatory_ref}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {result.findings.length > 3 && (
                                        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg text-center">
                                            <Lock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                            <p className="text-white font-medium">+{result.findings.length - 3} riscos adicionais encontrados</p>
                                            <p className="text-gray-400 text-sm mt-1">Faça upgrade para ver o relatório completo</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border border-blue-500/30 rounded-xl p-8 text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">Quer o Relatório Completo?</h3>
                                <p className="text-gray-400 mb-6">
                                    Dashboards avançados, relatórios ANPD, monitoramento contínuo e muito mais.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <a
                                        href="/register"
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-lg hover:opacity-90 flex items-center gap-2"
                                    >
                                        Começar Grátis <ArrowRight className="w-4 h-4" />
                                    </a>
                                    <button
                                        onClick={() => { setResult(null); setFile(null); }}
                                        className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700"
                                    >
                                        Nova Análise
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Features */}
                <div className="mt-16 grid grid-cols-3 gap-6">
                    {[
                        { icon: Shield, title: 'Detecção LGPD', desc: 'CPF, CNPJ, Email e mais' },
                        { icon: Brain, title: 'Análise de Alucinação', desc: 'Detecta respostas inventadas' },
                        { icon: AlertTriangle, title: 'OWASP LLM01', desc: 'Prompt Injection' }
                    ].map((feature) => (
                        <div key={feature.title} className="text-center p-6">
                            <feature.icon className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                            <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                            <p className="text-gray-500 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
