'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Printer, ShieldCheck, AlertTriangle, CheckCircle2, TrendingUp, Download, Building2, User } from 'lucide-react';

// ========================================
// SMART REPORT ISO 42001 (A4 FORMAT)
// ========================================

interface ReportData {
    organization_name: string;
    generated_at: string;
    consultant_name: string;
    risk_summary: {
        total_risks: number;
        high_risks: number;
        mitigated_risks: number;
        top_risks: {
            category: string;
            description: string;
            level: number;
            status: string;
        }[];
    };
    compliance_summary: {
        last_assessment_date: string | null;
        maturity_score: number;
        status: string;
    };
    executive_summary: string;
}

export default function ISO42001ReportPage() {
    const params = useParams();
    const orgId = Array.isArray(params.orgId) ? params.orgId[0] : params.orgId as string;
    const [data, setData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReport() {
            try {
                // Obter token do localStorage se necessário ou confiar no cookie/header
                const token = localStorage.getItem('algor_token');
                const res = await fetch(`/api/v1/reports/iso42001/${orgId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                } else {
                    console.error("Failed to fetch report");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchReport();
    }, [orgId]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center text-[#00FF94]">Gerando Relatório Inteligente...</div>;
    }

    if (!data) {
        return <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center text-red-500">Erro ao carregar dados.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center print:bg-white print:p-0">

            {/* TOOLBAR (Hidden on Print) */}
            <div className="w-full max-w-[210mm] flex justify-between items-center mb-8 print:hidden">
                <h1 className="text-white text-xl font-bold flex items-center gap-2">
                    <ShieldCheck className="text-[#00FF94]" />
                    Relatório de Conformidade ISO 42001
                </h1>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-[#00A3FF] hover:bg-[#0088CC] text-white rounded-lg font-bold transition-colors"
                >
                    <Printer className="w-5 h-5" />
                    Imprimir / Salvar PDF
                </button>
            </div>

            {/* A4 PAPER */}
            <div className="w-[210mm] min-h-[297mm] bg-white text-black p-[20mm] shadow-2xl print:shadow-none print:w-full print:h-auto font-sans relative overflow-hidden">

                {/* HEADER */}
                <header className="border-b-4 border-[#0A0E1A] pb-6 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-extrabold text-[#0A0E1A] uppercase tracking-tighter mb-2">
                            Relatório de <br />Governança de IA
                        </h1>
                        <p className="text-gray-500 text-sm font-mono">ISO/IEC 42001:2023 • ARTIFICIAL INTELLIGENCE MANAGEMENT SYSTEM</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-[#0A0E1A] mb-1">{data.organization_name}</div>
                        <div className="text-sm text-gray-500">Gerado em: {new Date(data.generated_at).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">Consultor: {data.consultant_name}</div>
                    </div>
                </header>

                {/* EXECUTIVE SUMMARY */}
                <section className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-lg font-bold text-[#0A0E1A] mb-3 flex items-center gap-2 uppercase tracking-wide">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Resumo Executivo (IA Insight)
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-justify">
                        {data.executive_summary}
                    </p>
                </section>

                {/* METRICS GRID */}
                <div className="grid grid-cols-2 gap-8 mb-10">
                    {/* COMPLIANCE SCORE */}
                    <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
                        <div className="text-sm text-gray-400 uppercase font-bold mb-2">Maturidade ISO 42001</div>
                        <div className="text-6xl font-black text-blue-600 mb-2">{data.compliance_summary.maturity_score}<span className="text-2xl text-gray-400">/100</span></div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${data.compliance_summary.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            Status: {data.compliance_summary.status}
                        </div>
                    </div>

                    {/* RISK STATS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                            <div className="text-3xl font-bold text-red-600 mb-1">{data.risk_summary.high_risks}</div>
                            <div className="text-xs text-red-800 uppercase font-bold">Riscos Críticos</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <div className="text-3xl font-bold text-green-600 mb-1">{data.risk_summary.mitigated_risks}</div>
                            <div className="text-xs text-green-800 uppercase font-bold">Mitigados</div>
                        </div>
                        <div className="col-span-2 bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                            <div className="text-sm font-bold text-gray-600">Total de Riscos Mapeados</div>
                            <div className="text-xl font-bold text-gray-800">{data.risk_summary.total_risks}</div>
                        </div>
                    </div>
                </div>

                {/* TOP RISKS TABLE */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-[#0A0E1A] mb-4 flex items-center gap-2 uppercase tracking-wide border-b border-gray-200 pb-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Top 5 - Pontos de Atenção Crítica
                    </h2>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs">
                            <tr>
                                <th className="p-3 rounded-tl-lg">Categoria</th>
                                <th className="p-3">Descrição do Risco</th>
                                <th className="p-3 text-center">Nível</th>
                                <th className="p-3 rounded-tr-lg text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.risk_summary.top_risks.map((risk, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{risk.category}</td>
                                    <td className="p-3 text-gray-600 truncate max-w-[200px]">{risk.description}</td>
                                    <td className="p-3 text-center font-bold">
                                        <span className={`px-2 py-1 rounded ${risk.level >= 15 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {risk.level}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right text-gray-500">{risk.status}</td>
                                </tr>
                            ))}
                            {data.risk_summary.top_risks.length === 0 && (
                                <tr><td colSpan={4} className="p-6 text-center text-gray-400">Nenhum risco crítico identificado.</td></tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {/* FOOTER */}
                <footer className="absolute bottom-[20mm] left-[20mm] right-[20mm] border-t pt-4 text-xs text-center text-gray-400 flex flex-col gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Auditoria gerada pela plataforma <strong>ALGOR Governance</strong></span>
                    </div>
                    <p>Este documento é confidencial e destinado exclusivamente à organização {data.organization_name}.</p>
                </footer>

            </div>
        </div>
    );
}
