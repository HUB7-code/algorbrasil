"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ShieldOff, Eye, Ban } from 'lucide-react';

interface DataRow {
    type: string;
    exposures: number;
    severity: 'high' | 'medium' | 'low';
    trend: 'up' | 'down' | 'stable';
    action: 'block' | 'review' | 'monitor';
}

interface DataBreakdownTableProps {
    data: DataRow[];
}

const severityConfig = {
    high: { label: 'Alta', color: '#EF4444', bg: 'bg-red-500/10', icon: '🔴' },
    medium: { label: 'Média', color: '#F59E0B', bg: 'bg-amber-500/10', icon: '🟡' },
    low: { label: 'Baixa', color: '#10B981', bg: 'bg-emerald-500/10', icon: '🟢' }
};

const actionConfig = {
    block: { label: 'Bloquear', color: '#EF4444', icon: Ban },
    review: { label: 'Revisar', color: '#F59E0B', icon: Eye },
    monitor: { label: 'Monitorar', color: '#10B981', icon: Eye }
};

export default function DataBreakdownTable({ data }: DataBreakdownTableProps) {

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up': return <TrendingUp className="w-4 h-4 text-red-400" />;
            case 'down': return <TrendingDown className="w-4 h-4 text-emerald-400" />;
            default: return <Minus className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden"
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                        <ShieldOff className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Breakdown por Tipo de Dado</h3>
                        <p className="text-gray-500 text-xs">Dados sensíveis detectados nos últimos 30 dias</p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-800 bg-black/20">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Tipo de Dado
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Exposições
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Severidade
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Tendência
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {data.map((row, idx) => {
                            const sev = severityConfig[row.severity];
                            const act = actionConfig[row.action];
                            const ActionIcon = act.icon;

                            return (
                                <motion.tr
                                    key={row.type}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <span className="text-white font-medium">{row.type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-white font-mono text-lg">{row.exposures}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sev.bg}`}
                                            style={{ color: sev.color }}>
                                            <span>{sev.icon}</span>
                                            {sev.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            {getTrendIcon(row.trend)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                                            style={{
                                                backgroundColor: `${act.color}15`,
                                                color: act.color,
                                                border: `1px solid ${act.color}30`
                                            }}
                                        >
                                            <ActionIcon className="w-3 h-3" />
                                            {act.label}
                                        </button>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Footer Summary */}
            <div className="p-4 border-t border-gray-800 bg-black/20">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                        Total: <span className="text-white font-mono">{data.reduce((acc, d) => acc + d.exposures, 0)}</span> exposições
                    </span>
                    <button className="text-blue-400 hover:text-blue-300 text-xs font-medium">
                        Exportar detalhes →
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
