"use client";

import React, { useMemo } from 'react';
import { ShieldAlert, AlertTriangle, Eye, CheckCircle, FileText, Lock, LayoutDashboard, Download, Share2 } from 'lucide-react';

interface Finding {
    category: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    description: string;
    regulatory_ref: string;
    estimated_fine: number;
    row_index: number;
}

interface ScanResult {
    total_rows: number;
    risks_found: number;
    lgpd_score: number;
    operational_score: number;
    owasp_score: number;
    findings: Finding[];
}

interface RiskReportProps {
    data: ScanResult;
    onReset: () => void;
}

// --- Visual Components (Custom Charts) ---

const CircularProgress = ({ score, color }: { score: number; color: string }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="transform -rotate-90 w-20 h-20">
                <circle
                    className="text-gray-800"
                    strokeWidth="6"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="40"
                    cy="40"
                />
                <circle
                    className={`${color} transition-all duration-1000 ease-out`}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="40"
                    cy="40"
                />
            </svg>
            <span className={`absolute text-xl font-bold ${color}`}>{score}</span>
        </div>
    );
};

const SeverityBar = ({ count, total, color, label }: { count: number, total: number, color: string, label: string }) => {
    const width = total > 0 ? (count / total) * 100 : 0;
    return (
        <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{label}</span>
                <span className="text-gray-200 font-mono">{count}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                    className={`h-full ${color} transition-all duration-1000`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
};

export default function RiskReport({ data, onReset }: RiskReportProps) {

    // Memoize statistics
    const stats = useMemo(() => {
        const counts = { LGPD: 0, OWASP: 0, OPERATIONAL: 0 };
        const severities = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };

        data.findings.forEach(f => {
            if (counts[f.category as keyof typeof counts] !== undefined) counts[f.category as keyof typeof counts]++;
            if (severities[f.severity] !== undefined) severities[f.severity]++;
        });

        return { counts, severities };
    }, [data]);

    const totalFineExposure = data.findings.reduce((acc, curr) => acc + curr.estimated_fine, 0);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-[#00FF94]";
        if (score >= 70) return "text-yellow-400";
        return "text-red-500";
    };

    const getScoreColorHex = (score: number) => {
        if (score >= 90) return "text-[#00FF94]"; // Tailwind class needed
        if (score >= 70) return "text-yellow-400";
        return "text-red-500";
    };

    return (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. Top Bar: Global Stats (Power BI Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Total Risk Card */}
                <div className="bg-[#0A1A2F]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-5 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <LayoutDashboard className="w-16 h-16 text-[#00FF94]" />
                    </div>
                    <h3 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Passivo Estimado</h3>
                    <div className="text-3xl font-mono font-bold text-red-500">
                        {formatCurrency(totalFineExposure)}
                    </div>
                    <div className="mt-2 text-xs text-red-400/80 bg-red-900/20 px-2 py-1 rounded inline-block">
                        Based on ANPD Ref.
                    </div>
                </div>

                {/* Incidents Count */}
                <div className="bg-[#0A1A2F]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-5 shadow-lg">
                    <h3 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Total de Incidentes</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-white">{data.risks_found}</span>
                        <span className="text-sm text-gray-500 mb-1">em {data.total_rows} linhas</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
                        <div className="bg-[#00FF94] h-full" style={{ width: `${(data.risks_found / Math.max(data.total_rows, 1)) * 100}%` }} />
                    </div>
                </div>

                {/* Overall Health */}
                <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-[#0A1A2F] to-[#050B14] border border-gray-800 rounded-xl p-5 flex items-center justify-between shadow-lg">
                    <div>
                        <h3 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Saúde do Compliance</h3>
                        <p className="text-gray-300 text-sm max-w-xs">
                            Média ponderada baseada em LGPD, OWASP e Risco Operacional.
                        </p>
                    </div>
                    <div className="flex gap-6 text-center">
                        <div>
                            <span className={`block text-2xl font-bold ${getScoreColor(data.lgpd_score)}`}>{data.lgpd_score}%</span>
                            <span className="text-[10px] text-gray-500 uppercase">LGPD</span>
                        </div>
                        <div>
                            <span className={`block text-2xl font-bold ${getScoreColor(data.owasp_score)}`}>{data.owasp_score}%</span>
                            <span className="text-[10px] text-gray-500 uppercase">OWASP</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Middle Section: Charts & Breakdown (The Dashboard Core) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Left: Domain Scores (Gauges) */}
                <div className="bg-[#0A1A2F]/60 border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
                    <h3 className="text-white font-bold flex items-center gap-2 mb-6">
                        <ShieldAlert className="w-5 h-5 text-[#00FF94]" />
                        Compliance Domains
                    </h3>
                    <div className="flex justify-around items-center">
                        <div className="flex flex-col items-center">
                            <CircularProgress score={data.lgpd_score} color={getScoreColor(data.lgpd_score)} />
                            <span className="text-xs text-gray-400 mt-2 font-medium">LGPD</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <CircularProgress score={data.operational_score} color={getScoreColor(data.operational_score)} />
                            <span className="text-xs text-gray-400 mt-2 font-medium">TRUST</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <CircularProgress score={data.owasp_score} color={getScoreColor(data.owasp_score)} />
                            <span className="text-xs text-gray-400 mt-2 font-medium">SEC</span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Calculado usando ISO 42001 Standard Weighting
                        </p>
                    </div>
                </div>

                {/* Center: Incident Distribution */}
                <div className="bg-[#0A1A2F]/60 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-white font-bold flex items-center gap-2 mb-6">
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        Distribuição de Risco
                    </h3>
                    <div className="space-y-4">
                        <SeverityBar
                            label="LGPD (Dados Pessoais)"
                            count={stats.counts.LGPD}
                            total={data.risks_found}
                            color="bg-purple-500"
                        />
                        <SeverityBar
                            label="OWASP (Segurança)"
                            count={stats.counts.OWASP}
                            total={data.risks_found}
                            color="bg-blue-500"
                        />
                        <SeverityBar
                            label="Operacional (Alucinação)"
                            count={stats.counts.OPERATIONAL}
                            total={data.risks_found}
                            color="bg-yellow-500"
                        />
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-800 grid grid-cols-2 gap-4">
                        <div className="text-xs">
                            <span className="block text-gray-400">Risco Crítico</span>
                            <span className="text-red-500 font-bold text-lg">{stats.severities.CRITICAL}</span>
                        </div>
                        <div className="text-xs text-right">
                            <span className="block text-gray-400">Risco Alto</span>
                            <span className="text-orange-500 font-bold text-lg">{stats.severities.HIGH}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Action Board */}
                <div className="bg-gradient-to-b from-[#0A1A2F] to-[#050B14] border border-gray-800 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                    <Lock className="w-12 h-12 text-[#00FF94] mb-4 opacity-80" />
                    <h3 className="text-white font-bold text-lg mb-2">Bloquear estes riscos agora?</h3>
                    <p className="text-sm text-gray-400 mb-6">
                        Instale o ALGOR Guardrail API e bloqueie PII em tempo real.
                    </p>
                    <div className="w-full space-y-3">
                        <button className="w-full py-2 bg-[#00FF94] hover:bg-[#00cc76] text-[#050B14] font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(0,255,148,0.3)]">
                            Ativar Proteção
                        </button>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg text-sm flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> PDF
                            </button>
                            <button onClick={onReset} className="flex-1 py-2 border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg text-sm">
                                Novo Scan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Bottom: Data Grid (Findings) */}
            <div className="bg-[#0A1A2F]/60 border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-800 bg-[#0A1A2F] flex justify-between items-center">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                        Audit Log ({data.findings.length})
                    </h3>
                    <button className="text-xs text-[#00FF94] hover:underline flex items-center gap-1">
                        <Share2 className="w-3 h-3" /> Exportar CSV
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#050B14] text-xs uppercase text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Severidade</th>
                                <th className="px-6 py-3">Categoria</th>
                                <th className="px-6 py-3">Descrição do Incidente</th>
                                <th className="px-6 py-3">Ref. Regulatória</th>
                                <th className="px-6 py-3 text-right">Multa Est.</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {data.findings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                                        Nenhum incidente encontrado.
                                    </td>
                                </tr>
                            ) : (
                                data.findings.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            {item.severity === "CRITICAL" && <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-red-900/40 text-red-500 border border-red-900/60">CRÍTICO</span>}
                                            {item.severity === "HIGH" && <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-orange-900/40 text-orange-500 border border-orange-900/60">ALTO</span>}
                                            {item.severity === "MEDIUM" && <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-yellow-900/40 text-yellow-500 border border-yellow-900/60">MÉDIO</span>}
                                            {item.severity === "LOW" && <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-blue-900/40 text-blue-500 border border-blue-900/60">BAIXO</span>}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">
                                            {item.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.description}
                                            <div className="text-xs text-gray-600 font-mono mt-1">Row #{item.row_index} in log file</div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">
                                            {item.regulatory_ref}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-red-400">
                                            {item.estimated_fine > 0 ? formatCurrency(item.estimated_fine) : "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
