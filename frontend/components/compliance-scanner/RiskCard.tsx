'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Shield, ArrowRight, TrendingUp, DollarSign } from 'lucide-react';

interface RiskCardProps {
    type: 'lgpd' | 'hallucination' | 'security' | 'legal';
    percentage: number;
    mainMetric: string;
    details: string[];
    reference: string;
    financialImpact: number | null;
    ctaLabel: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
}

export default function RiskCard({
    type,
    percentage,
    mainMetric,
    details,
    reference,
    financialImpact,
    ctaLabel,
    severity
}: RiskCardProps) {
    const getIcon = () => {
        switch (type) {
            case 'lgpd': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
            case 'security': return <ShieldAlert className="w-5 h-5 text-red-400" />;
            case 'hallucination': return <Shield className="w-5 h-5 text-amber-400" />;
            default: return <Shield className="w-5 h-5 text-blue-400" />;
        }
    };

    const getStatusColor = () => {
        switch (severity) {
            case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
            case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            default: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-[#0A1A2F]/40 border border-white/5 flex flex-col h-full group hover:border-white/10 transition-all backdrop-blur-sm"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                    {getIcon()}
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${getStatusColor()}`}>
                    {severity}
                </span>
            </div>

            <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-white font-mono">{percentage}%</span>
                    <TrendingUp className="w-3 h-3 text-red-400 opacity-50" />
                </div>
                <p className="text-xs text-slate-400 leading-tight mb-4">{mainMetric}</p>

                <div className="space-y-2 mb-6">
                    {details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-slate-700" />
                            <span className="text-[10px] text-slate-300 font-medium">{detail}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Compromisso</span>
                        <span className="text-[10px] text-slate-300 font-mono font-bold tracking-tighter">{reference}</span>
                    </div>
                    {financialImpact !== null && (
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Impacto Est.</span>
                            <span className="text-[10px] text-red-400 font-mono font-bold">{formatCurrency(financialImpact)}</span>
                        </div>
                    )}
                </div>

                <button className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-200 uppercase tracking-widest transition-all flex items-center justify-center gap-2 group-hover:bg-[#4F7EFF] group-hover:text-[#0B0F1E]">
                    {ctaLabel}
                    <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </motion.div>
    );
}
