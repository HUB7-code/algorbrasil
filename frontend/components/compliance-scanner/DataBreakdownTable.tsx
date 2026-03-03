'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Lock, FileText, Globe } from 'lucide-react';

interface DataRow {
    id: string;
    source: string;
    category: string;
    risk: 'Low' | 'Medium' | 'High' | 'Excessive';
    compliance: number;
    lastAudit: string;
}

const tableData: DataRow[] = [
    { id: '1', source: 'ERP Conector', category: 'Financeiro', risk: 'Low', compliance: 98, lastAudit: '12/05/2024' },
    { id: '2', source: 'Marketing Autopilot', category: 'Marketing', risk: 'High', compliance: 42, lastAudit: '14/05/2024' },
    { id: '3', source: 'CRM Global Flux', category: 'Vendas', risk: 'Medium', compliance: 75, lastAudit: '10/05/2024' },
    { id: '4', source: 'Shadow AI Tester', category: 'Desenvolvimento', risk: 'Excessive', compliance: 15, lastAudit: '15/05/2024' },
];

interface DataBreakdownTableProps {
    data?: DataRow[];
}

export const DataBreakdownTable: React.FC<DataBreakdownTableProps> = ({ data = tableData }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getRiskStyles = (risk: DataRow['risk']) => {
        switch (risk) {
            case 'Low': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'Medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'High': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case 'Excessive': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    if (!mounted) return <div className="space-y-4 animate-pulse"><div className="h-48 bg-white/5 rounded-xl w-full" /></div>;

    return (
        <div className="w-full overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-sm tracking-widest uppercase">Distribuição de Dados</h3>
                <span className="text-[10px] text-slate-500 font-mono">4 FONTES ATIVAS</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">
                            <th className="pb-4 pr-4">Fonte de Dados</th>
                            <th className="pb-4 pr-4">Risco PL 2338</th>
                            <th className="pb-4 pr-4">Conformidade</th>
                            <th className="pb-4">Última Auditoria</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map((row, idx) => (
                            <motion.tr
                                key={row.id}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#4F7EFF]/30 transition-colors">
                                            <Database className="w-4 h-4 text-slate-400 group-hover:text-[#4F7EFF]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-200">{row.source}</p>
                                            <p className="text-[10px] text-slate-500">{row.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 pr-4">
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getRiskStyles(row.risk)}`}>
                                        {row.risk.toUpperCase()}
                                    </span>
                                </td>
                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 min-w-[60px] bg-white/5 h-1 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-blue-500"
                                                style={{ width: `${row.compliance}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">{row.compliance}%</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className="text-[10px] text-slate-500 font-medium">{row.lastAudit}</span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataBreakdownTable;
