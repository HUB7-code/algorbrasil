"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
                // Handle 404
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = async () => {
        if (!assessment) return;
        try {
            const token = localStorage.getItem('algor_token');
            const res = await fetch(`/api/v1/assessments/${assessment.id}/pdf`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Algor_Report_ISO42001_${assessment.id}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                alert("Erro ao gerar PDF.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-[#131314] text-[#E3E3E3]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#A8C7FA] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">Carregando auditoria...</span>
                </div>
            </div>
        );
    }

    if (!assessment) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#131314] text-[#E3E3E3]">
                <span className="material-symbols-rounded text-4xl text-[#FFB4AB] mb-4">error</span>
                <h2 className="text-xl">Auditoria não encontrada</h2>
                <Link href="/dashboard" className="mt-4 text-[#A8C7FA] hover:underline">Voltar ao Dashboard</Link>
            </div>
        );
    }

    // Helper to format keys (e.g. "data_privacy" -> "Data Privacy")
    const formatKey = (key: string) => {
        return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    // Determine Status Color
    const statusColor = assessment.score_total >= 70 ? 'text-[#6DD58C]' :
        assessment.score_total >= 30 ? 'text-[#FABD00]' : 'text-[#FFB4AB]';

    const statusBg = assessment.score_total >= 70 ? 'bg-[#6DD58C]/10 border-[#6DD58C]/20' :
        assessment.score_total >= 30 ? 'bg-[#FABD00]/10 border-[#FABD00]/20' : 'bg-[#FFB4AB]/10 border-[#FFB4AB]/20';

    return (
        <div className="min-h-screen bg-[#131314] text-[#E3E3E3] p-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="max-w-[1200px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="w-10 h-10 rounded-full border border-[#444746] flex items-center justify-center hover:bg-[#444746] transition-colors text-[#C4C7C5]">
                            <span className="material-symbols-rounded">arrow_back</span>
                        </Link>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-normal text-[#E3E3E3]">{assessment.title}</h1>
                            <div className="flex items-center gap-2 text-sm text-[#C4C7C5] mt-1">
                                <span className="material-symbols-rounded text-base">calendar_today</span>
                                {format(new Date(assessment.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={downloadPDF}
                            className="h-10 px-4 rounded-full border border-[#444746] text-[#A8C7FA] text-sm font-medium hover:bg-[#A8C7FA]/10 flex items-center gap-2 transition-colors"
                        >
                            <span className="material-symbols-rounded">download</span>
                            PDF
                        </button>
                        <button className="h-10 px-4 rounded-full bg-[#A8C7FA] text-[#062E6F] text-sm font-medium hover:bg-[#D3E3FD] flex items-center gap-2 shadow-sm">
                            <span className="material-symbols-rounded">share</span>
                            Compartilhar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column: Score Card */}
                    <div className="space-y-6">
                        <div className="rounded-[24px] bg-[#1E1F20] border border-[#444746] p-8 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#A8C7FA]/5 to-transparent opacity-50" />

                            <h3 className="text-sm font-medium text-[#C4C7C5] uppercase tracking-wider mb-6 relative z-10">Score de Conformidade</h3>

                            <div className="relative w-40 h-40 flex items-center justify-center mb-6 z-10">
                                {/* Simple SVG Circle logic for visual */}
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#28292A" strokeWidth="8" />
                                    <circle
                                        cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"
                                        strokeDasharray="283"
                                        strokeDashoffset={283 - (283 * assessment.score_total) / 100}
                                        className={`${statusColor} transition-all duration-1000 ease-out`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={`text-4xl font-normal ${statusColor}`}>{assessment.score_total}</span>
                                    <span className="text-xs text-[#8E918F]">/ 100</span>
                                </div>
                            </div>

                            <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border ${statusBg} ${statusColor} relative z-10 mb-4`}>
                                {assessment.score_total >= 70 ? 'Otimizado' : assessment.score_total >= 30 ? 'Definido' : 'Inicial / Risco'}
                            </div>

                            <p className="text-sm text-[#C4C7C5] leading-relaxed relative z-10">
                                {assessment.report_summary}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Details & Answers */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Report Summary Details */}
                        <div className="rounded-[24px] bg-[#1E1F20] border border-[#444746] p-8">
                            <h3 className="text-lg font-normal text-[#E3E3E3] mb-4 flex items-center gap-2">
                                <span className="material-symbols-rounded text-[#A8C7FA]">analytics</span>
                                Diagnóstico Executivo
                            </h3>
                            <div className="space-y-4 text-sm text-[#C4C7C5] leading-relaxed">
                                <p>
                                    Com base nas respostas fornecidas, sua iniciativa apresenta um nível de maturidade
                                    <strong className={`mx-1 ${statusColor}`}>{assessment.score_total}%</strong>
                                    em relação aos controles da ISO 42001.
                                </p>
                                <p>
                                    Recomenda-se focar nas áreas onde a resposta foi negativa ou parcial para elevar o nível de compliance antes da auditoria externa.
                                </p>
                            </div>
                        </div>

                        {/* Answer List */}
                        <div className="rounded-[24px] bg-[#1E1F20] border border-[#444746] overflow-hidden">
                            <div className="p-6 border-b border-[#444746] bg-[#222324]">
                                <h3 className="text-lg font-normal text-[#E3E3E3] flex items-center gap-2">
                                    <span className="material-symbols-rounded text-[#A8C7FA]">list_alt</span>
                                    Respostas Registradas
                                </h3>
                            </div>

                            <div className="divide-y divide-[#444746]">
                                {Object.entries(assessment.answers_payload || {}).map(([key, value], index) => (
                                    <div key={key} className="p-6 hover:bg-[#444746]/10 transition-colors flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-xs font-mono text-[#8E918F] bg-[#28292A] px-2 py-0.5 rounded border border-[#444746]">
                                                    Q{index + 1}
                                                </span>
                                                <span className="text-sm font-medium text-[#E3E3E3] capitalize">
                                                    {formatKey(key)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="px-3 py-1.5 rounded-lg bg-[#28292A] border border-[#444746] text-sm text-[#A8C7FA] font-medium break-all md:break-normal">
                                                {String(value)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {Object.keys(assessment.answers_payload || {}).length === 0 && (
                                    <div className="p-8 text-center text-[#8E918F]">
                                        Nenhuma resposta registrada para esta avaliação.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
