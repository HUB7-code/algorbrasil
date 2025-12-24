"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, FileText, AlertTriangle, CheckCircle2,
    ArrowRight, Lock, Zap, Shield, Brain, Search,
    ChevronRight, Sparkles, FileJson, Table2, Eye,
    AlertCircle, Database, Users
} from 'lucide-react';
import Link from 'next/link';

// Limits for Freemium
const FREEMIUM_LIMITS = {
    maxRows: 100,
    maxFileSize: 1024 * 1024, // 1MB
    maxFindings: 3
};

interface Finding {
    category: string;
    severity: string;
    description: string;
    regulatory_ref: string;
    estimated_fine: number;
    row_index?: number;
}

interface ScanResult {
    total_rows: number;
    risks_found: number;
    lgpd_score: number;
    operational_score: number;
    owasp_score: number;
    findings: Finding[];
}

// Animated Score Ring
const ScoreRing = ({ score, label, color }: { score: number; label: string; color: string }) => {
    const radius = 40;
    const strokeWidth = 6;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const colorMap: Record<string, { start: string; end: string; text: string }> = {
        green: { start: '#10B981', end: '#059669', text: 'text-emerald-400' },
        yellow: { start: '#F59E0B', end: '#D97706', text: 'text-amber-400' },
        red: { start: '#EF4444', end: '#DC2626', text: 'text-red-400' }
    };

    const colors = colorMap[color] || colorMap.green;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="#1f2937"
                        strokeWidth={strokeWidth}
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={`url(#gradient-${label})`}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                    <defs>
                        <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={colors.start} />
                            <stop offset="100%" stopColor={colors.end} />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        className={`text-2xl font-bold font-mono ${colors.text}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {score}%
                    </motion.span>
                </div>
            </div>
            <span className="text-gray-400 text-xs mt-2 uppercase tracking-wider">{label}</span>
        </div>
    );
};

// File Type Badge
const FileTypeBadge = ({ type }: { type: 'json' | 'csv' }) => {
    const config = {
        json: { icon: FileJson, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        csv: { icon: Table2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    };
    const c = config[type];
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded ${c.bg} ${c.color} text-xs font-mono`}>
            <c.icon className="w-3 h-3" />
            {type.toUpperCase()}
        </span>
    );
};

export default function ScannerFreemiumPage() {
    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState<'json' | 'csv' | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [scanStage, setScanStage] = useState<string>('');

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) validateAndSetFile(droppedFile);
    }, []);

    const validateAndSetFile = (selectedFile: File) => {
        setError(null);
        setResult(null);

        if (selectedFile.size > FREEMIUM_LIMITS.maxFileSize) {
            setError(`Arquivo muito grande. Limite gratuito: 1MB. Faça upgrade para arquivos maiores.`);
            return;
        }

        const ext = selectedFile.name.split('.').pop()?.toLowerCase();
        if (!['json', 'csv'].includes(ext || '')) {
            setError('Formato inválido. Use JSON ou CSV.');
            return;
        }

        setFileType(ext as 'json' | 'csv');
        setFile(selectedFile);
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setIsLoading(true);
        setError(null);

        // Simulate scan stages
        const stages = [
            'Carregando arquivo...',
            'Detectando PII (CPF, Email)...',
            'Analisando Prompt Injection...',
            'Verificando conformidade LGPD...',
            'Gerando relatório...'
        ];

        for (const stage of stages) {
            setScanStage(stage);
            await new Promise(r => setTimeout(r, 600));
        }

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
            setError(err.message || 'Erro ao analisar arquivo');
        } finally {
            setIsLoading(false);
            setScanStage('');
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'green';
        if (score >= 50) return 'yellow';
        return 'red';
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
    };

    const totalFines = result?.findings.reduce((acc, f) => acc + (f.estimated_fine || 0), 0) || 0;

    return (
        <div className="min-h-screen bg-[#0A0E1A] pt-44 pb-16">
            {/* Background ambient */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Compliance Scanner</span>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Descubra se sua IA viola a LGPD em 30 segundos.
                        Faça upload de logs e receba um diagnóstico instantâneo.
                    </p>
                </motion.div>

                {/* Limits Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-white font-medium text-sm">Versão Gratuita</p>
                            <p className="text-amber-200/70 text-xs">Limite de 100 linhas • 1MB • 3 findings visíveis</p>
                        </div>
                    </div>
                    <Link href="/register" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 group">
                        Remover limites
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* Upload Zone */}
                            <motion.div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => !isLoading && document.getElementById('file-input')?.click()}
                                className={`
                  relative overflow-hidden rounded-3xl border-2 border-dashed transition-all cursor-pointer
                  bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl
                  ${isDragging ? 'border-blue-500 bg-blue-500/5 scale-[1.02]' :
                                        file ? 'border-emerald-500/50' : 'border-gray-700 hover:border-gray-600'}
                `}
                                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                            >
                                <input
                                    id="file-input"
                                    type="file"
                                    accept=".json,.csv"
                                    className="hidden"
                                    disabled={isLoading}
                                    onChange={(e) => e.target.files?.[0] && validateAndSetFile(e.target.files[0])}
                                />

                                <div className="p-12 text-center">
                                    {isLoading ? (
                                        <div className="space-y-6">
                                            <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
                                                <motion.div
                                                    className="w-12 h-12 border-3 border-blue-500/30 border-t-blue-500 rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium text-lg">{scanStage}</p>
                                                <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden max-w-xs mx-auto">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                                        initial={{ width: '0%' }}
                                                        animate={{ width: '100%' }}
                                                        transition={{ duration: 3, ease: "linear" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : file ? (
                                        <div className="space-y-4">
                                            <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-center gap-2 mb-2">
                                                    <p className="text-white font-medium text-lg">{file.name}</p>
                                                    {fileType && <FileTypeBadge type={fileType} />}
                                                </div>
                                                <p className="text-gray-500 text-sm">
                                                    {(file.size / 1024).toFixed(1)} KB
                                                </p>
                                            </div>
                                            <p className="text-gray-600 text-xs">Clique para trocar arquivo</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-800/50 flex items-center justify-center group-hover:bg-gray-800">
                                                <Upload className="w-10 h-10 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium text-lg">
                                                    Arraste seu arquivo aqui
                                                </p>
                                                <p className="text-gray-500 text-sm mt-1">
                                                    ou clique para selecionar
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-center gap-4 mt-4">
                                                <span className="flex items-center gap-1 text-xs text-gray-600">
                                                    <FileJson className="w-4 h-4" /> JSON
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-gray-600">
                                                    <Table2 className="w-4 h-4" /> CSV
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Animated border effect */}
                                {isDragging && (
                                    <motion.div
                                        className="absolute inset-0 border-2 border-blue-500 rounded-3xl pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                )}
                            </motion.div>

                            {/* Error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
                                >
                                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    <span className="text-red-300 text-sm">{error}</span>
                                </motion.div>
                            )}

                            {/* Analyze Button */}
                            <motion.button
                                onClick={handleAnalyze}
                                disabled={!file || isLoading}
                                whileHover={{ scale: file && !isLoading ? 1.02 : 1 }}
                                whileTap={{ scale: file && !isLoading ? 0.98 : 1 }}
                                className={`
                  w-full py-5 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-3
                  ${file && !isLoading
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    }
                `}
                            >
                                <Search className="w-5 h-5" />
                                Analisar Arquivo
                            </motion.button>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                {[
                                    { icon: Shield, title: 'Detecção LGPD', desc: 'CPF, CNPJ, Email' },
                                    { icon: Brain, title: 'Análise de IA', desc: 'Alucinações e riscos' },
                                    { icon: AlertCircle, title: 'OWASP LLM', desc: 'Prompt Injection' }
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                        className="text-center p-4 rounded-2xl bg-gray-900/30 border border-gray-800"
                                    >
                                        <feature.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                        <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                                        <p className="text-gray-500 text-xs mt-1">{feature.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {/* Score Cards */}
                            <div className="bg-gradient-to-b from-[#131825]/90 to-[#0A0E1A]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-8">
                                <div className="flex justify-around items-center mb-8">
                                    <ScoreRing
                                        score={result.lgpd_score}
                                        label="LGPD"
                                        color={getScoreColor(result.lgpd_score)}
                                    />
                                    <ScoreRing
                                        score={result.operational_score}
                                        label="Operacional"
                                        color={getScoreColor(result.operational_score)}
                                    />
                                    <ScoreRing
                                        score={result.owasp_score}
                                        label="Segurança"
                                        color={getScoreColor(result.owasp_score)}
                                    />
                                </div>

                                {/* Summary Stats */}
                                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
                                    <div className="text-center">
                                        <p className="text-gray-500 text-xs uppercase mb-1">Linhas Analisadas</p>
                                        <p className="text-2xl font-bold text-white font-mono">{result.total_rows}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-500 text-xs uppercase mb-1">Riscos Encontrados</p>
                                        <p className="text-2xl font-bold text-red-400 font-mono">{result.risks_found}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-500 text-xs uppercase mb-1">Exposição Estimada</p>
                                        <p className="text-2xl font-bold text-amber-400 font-mono">{formatCurrency(totalFines)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Findings */}
                            <div className="bg-gradient-to-b from-[#131825]/90 to-[#0A0E1A]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Eye className="w-5 h-5 text-purple-400" />
                                        <h3 className="text-white font-semibold">Detalhes dos Riscos</h3>
                                    </div>
                                    {result.findings.length > FREEMIUM_LIMITS.maxFindings && (
                                        <span className="text-amber-400 text-xs flex items-center gap-1">
                                            <Lock className="w-3 h-3" />
                                            +{result.findings.length - FREEMIUM_LIMITS.maxFindings} ocultos
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {result.findings.slice(0, FREEMIUM_LIMITS.maxFindings).map((finding, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-start gap-3 p-4 bg-black/30 rounded-xl border border-gray-800/50"
                                        >
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${finding.severity === 'HIGH' || finding.severity === 'CRITICAL'
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : finding.severity === 'MEDIUM'
                                                        ? 'bg-amber-500/20 text-amber-400'
                                                        : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {finding.severity}
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-gray-300 text-sm">{finding.description}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="text-gray-600 text-xs font-mono">{finding.regulatory_ref}</span>
                                                    {finding.estimated_fine > 0 && (
                                                        <span className="text-amber-400 text-xs">
                                                            Multa: {formatCurrency(finding.estimated_fine)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {result.findings.length > FREEMIUM_LIMITS.maxFindings && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl text-center"
                                        >
                                            <Lock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                                            <p className="text-white font-medium">
                                                +{result.findings.length - FREEMIUM_LIMITS.maxFindings} riscos adicionais
                                            </p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                Faça upgrade para ver o relatório completo
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-3xl p-8 text-center"
                            >
                                <h3 className="text-2xl font-bold text-white mb-2">Quer o Relatório Completo?</h3>
                                <p className="text-gray-400 mb-6">
                                    Dashboards avançados, histórico, relatórios ANPD e monitoramento contínuo.
                                </p>
                                <div className="flex gap-4 justify-center flex-wrap">
                                    <Link href="/register">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 flex items-center gap-2"
                                        >
                                            Começar Grátis <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                    <button
                                        onClick={() => { setResult(null); setFile(null); }}
                                        className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700"
                                    >
                                        Nova Análise
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Disclaimer */}
                <p className="text-center text-gray-600 text-xs mt-12">
                    * Análise baseada em padrões regex. Para detecção semântica avançada, use a versão Enterprise.
                </p>
            </div>
        </div>
    );
}
