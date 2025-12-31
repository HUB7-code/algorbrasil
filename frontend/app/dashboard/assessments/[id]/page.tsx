"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import {
    Share2, Download, ArrowLeft, Calendar, FileText,
    CheckCircle2, AlertTriangle, XCircle, TrendingUp
} from 'lucide-react';

interface AssessmentDetail {
    id: number;
    title: string;
    status: string;
    score_total: number;
    report_summary: string;
    created_at: string;
    answers_payload: Record<string, any>;
}

export default function AssessmentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;
    const [assessment, setAssessment] = useState<AssessmentDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetchAssessment(id as string);
    }, [id]);

    const fetchAssessment = async (assessmentId: string) => {
        try {
            const token = localStorage.getItem('algor_token');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch(`/api/v1/assessments/${assessmentId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setAssessment(data);
            } else {
                console.error("Failed to fetch assessment");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0E1A] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#00FF94] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-mono text-[#00FF94] tracking-widest animate-pulse">CARREGANDO DIAGNÓSTICO...</span>
                </div>
            </div>
        );
    }

    if (!assessment) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0A0E1A] text-white">
                <AlertTriangle className="w-16 h-16 text-[#F59E0B] mb-6" />
                <h2 className="text-3xl font-orbitron mb-2">Relatório Não Encontrado</h2>
                <Link href="/dashboard" className="mt-4 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#00FF94] border border-[#00FF94]/30 hover:border-[#00FF94] transition-all flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar ao Comando
                </Link>
            </div>
        );
    }

    const formatKey = (key: string) => key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    const getScoreColor = (score: number) => {
        if (score >= 70) return { text: 'text-[#00FF94]', border: 'border-[#00FF94]', bg: 'bg-[#00FF94]', glow: 'shadow-[0_0_30px_#00FF94]' };
        if (score >= 30) return { text: 'text-[#F59E0B]', border: 'border-[#F59E0B]', bg: 'bg-[#F59E0B]', glow: 'shadow-[0_0_30px_#F59E0B]' };
        return { text: 'text-[#EF4444]', border: 'border-[#EF4444]', bg: 'bg-[#EF4444]', glow: 'shadow-[0_0_30px_#EF4444]' };
    };

    const scoreStyle = getScoreColor(assessment.score_total);

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white p-8 pb-20 relative overflow-hidden font-sans">

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
                    <div className="flex items-start gap-6">
                        <Link href="/dashboard" className="p-3 rounded-full border border-white/10 hover:border-[#00FF94] text-gray-400 hover:text-[#00FF94] bg-white/5 transition-all group">
                            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    Relatório Técnico
                                </span>
                                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                                    <Calendar className="w-3 h-3" />
                                    {format(new Date(assessment.created_at), "dd MMM yyyy", { locale: ptBR }).toUpperCase()}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold font-orbitron text-white tracking-wide">
                                {assessment.title}
                            </h1>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="h-12 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-sm font-bold flex items-center gap-2 transition-all">
                            <Share2 className="w-4 h-4" />
                            Compartilhar
                        </button>
                        <button className="h-12 px-6 rounded-xl bg-[#00A3FF] hover:bg-[#0090E0] text-[#0A0E1A] text-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] transition-all">
                            <Download className="w-4 h-4" />
                            Baixar PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Score Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Score Card - Glass Panel */}
                        <div className="relative overflow-hidden rounded-[32px] bg-[#0A0E1A]/60 backdrop-blur-xl border border-white/10 p-8 flex flex-col items-center text-center shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

                            {/* Neon Title */}
                            <h3 className="text-xs font-bold font-orbitron text-gray-400 uppercase tracking-[0.2em] mb-8 relative z-10">
                                Índice de Compliance
                            </h3>

                            {/* Score Circle */}
                            <div className="relative w-48 h-48 flex items-center justify-center mb-8 z-10">
                                {/* Glow Layer */}
                                <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${scoreStyle.bg}`} />

                                <svg className="w-full h-full -rotate-90 transform drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]" viewBox="0 0 100 100">
                                    {/* Track */}
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1E293B" strokeWidth="6" />
                                    {/* Progress */}
                                    <circle
                                        cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray="283"
                                        strokeDashoffset={283 - (283 * assessment.score_total) / 100}
                                        className={`${scoreStyle.text} transition-all duration-1000 ease-out`}
                                    />
                                </svg>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={`text-6xl font-bold font-orbitron ${scoreStyle.text} drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]`}>
                                        {assessment.score_total}
                                    </span>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">/ 100 PTS</span>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className={`px-5 py-2 rounded-full text-xs font-bold font-orbitron uppercase tracking-widest border backdrop-blur-md ${scoreStyle.bg.replace('bg-', 'bg-')}/10 ${scoreStyle.border} ${scoreStyle.text} relative z-10 mb-6 shadow-lg`}>
                                {assessment.score_total >= 70 ? 'CERTIFIED READY' : assessment.score_total >= 30 ? 'EM ADEQUAÇÃO' : 'CRÍTICO'}
                            </div>

                            <p className="text-sm text-gray-400 leading-relaxed font-light relative z-10 border-t border-white/5 pt-6 w-full">
                                {assessment.report_summary}
                            </p>
                        </div>

                        {/* Quick Actions Sidebar */}
                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 space-y-2">
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-2">Ações Recomendadas</h4>
                            <button className="w-full p-3 rounded-lg bg-[#00FF94]/5 hover:bg-[#00FF94]/10 border border-[#00FF94]/20 hover:border-[#00FF94]/40 flex items-center gap-3 transition-colors group">
                                <CheckCircle2 className="w-4 h-4 text-[#00FF94]" />
                                <span className="text-xs font-bold text-[#00FF94] group-hover:text-white transition-colors">Iniciar Correções</span>
                            </button>
                            <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 flex items-center gap-3 transition-colors text-gray-400 hover:text-white">
                                <FileText className="w-4 h-4" />
                                <span className="text-xs font-bold">Ver Metodologia</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column: Details & Answers */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Executive Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-3xl bg-gradient-to-br from-[#131825] to-[#0A0E1A] border border-white/10 p-8 shadow-xl"
                        >
                            <h3 className="text-lg font-bold font-orbitron text-white mb-4 flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-[#00A3FF]" />
                                Diagnóstico Executivo
                            </h3>
                            <div className="space-y-4 text-base text-gray-300 font-light leading-relaxed">
                                <p>
                                    A análise da infraestrutura indica um nível de maturidade
                                    <strong className={`mx-2 ${scoreStyle.text} font-bold font-orbitron`}>{assessment.score_total}%</strong>
                                    em conformidade com os controles da ISO/IEC 42001.
                                </p>
                                <p>
                                    As áreas de <span className="text-white font-medium">Privacidade de Dados</span> e <span className="text-white font-medium">Segurança Algorítmica</span> requerem atenção imediata para mitigar riscos de sanções regulatórias.
                                </p>
                            </div>
                        </motion.div>

                        {/* Answer List - Tech Style */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Mapeamento de Respostas</h3>
                                <div className="h-[1px] flex-1 bg-white/5 ml-4" />
                            </div>

                            <div className="grid gap-4">
                                {Object.entries(assessment.answers_payload || {}).map(([key, value], index) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.2 }}
                                        className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                                            <div className="flex items-start gap-4">
                                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#00A3FF]/10 text-[#00A3FF] text-xs font-mono font-bold border border-[#00A3FF]/20 mt-0.5">
                                                    Q{index + 1}
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Parâmetro Avaliado</span>
                                                    <span className="text-sm font-medium text-white capitalize font-orbitron tracking-wide">
                                                        {formatKey(key)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center pl-12 md:pl-0">
                                                <div className="px-4 py-2 rounded-lg bg-[#0A0E1A] border border-white/10 text-sm font-mono text-[#00FF94] group-hover:border-[#00FF94]/30 transition-colors shadow-inner">
                                                    {String(value)}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {Object.keys(assessment.answers_payload || {}).length === 0 && (
                                <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                                    <AlertTriangle className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-500">Nenhuma telemetria registrada.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
