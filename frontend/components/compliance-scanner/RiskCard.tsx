"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface RiskCardProps {
    type: 'lgpd' | 'hallucination' | 'security';
    percentage: number;
    mainMetric: string;
    details: string[];
    reference: string;
    financialImpact: number | null;
    ctaLabel: string;
    severity: 'critical' | 'medium' | 'low';
    onAction?: () => void;
}

const cardConfig = {
    lgpd: {
        icon: Shield,
        title: 'Risco LGPD',
        gradient: 'from-purple-500/20 to-purple-500/5',
        iconColor: '#A855F7',
        borderColor: 'border-purple-500/30'
    },
    hallucination: {
        icon: Brain,
        title: 'Risco de Alucinação',
        gradient: 'from-amber-500/20 to-amber-500/5',
        iconColor: '#F59E0B',
        borderColor: 'border-amber-500/30'
    },
    security: {
        icon: Lock,
        title: 'Risco de Segurança',
        gradient: 'from-blue-500/20 to-blue-500/5',
        iconColor: '#3B82F6',
        borderColor: 'border-blue-500/30'
    }
};

const severityConfig = {
    critical: { color: '#EF4444', bg: 'bg-red-500/10', text: 'text-red-500', label: 'CRÍTICO' },
    medium: { color: '#F59E0B', bg: 'bg-amber-500/10', text: 'text-amber-500', label: 'MÉDIO' },
    low: { color: '#10B981', bg: 'bg-emerald-500/10', text: 'text-emerald-500', label: 'CONTROLADO' }
};

export default function RiskCard({
    type,
    percentage,
    mainMetric,
    details,
    reference,
    financialImpact,
    ctaLabel,
    severity,
    onAction
}: RiskCardProps) {
    const config = cardConfig[type];
    const sevConfig = severityConfig[severity];
    const Icon = config.icon;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative bg-gradient-to-b ${config.gradient} backdrop-blur-xl border ${config.borderColor} rounded-2xl p-6 overflow-hidden group`}
        >
            {/* Ambient glow */}
            <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: config.iconColor }}
            />

            {/* Header */}
            <div className="relative flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${config.iconColor}20` }}
                    >
                        <Icon className="w-5 h-5" style={{ color: config.iconColor }} />
                    </div>
                    <h3 className="text-white font-semibold">{config.title}</h3>
                </div>

                <span className={`px-2 py-1 rounded text-xs font-bold ${sevConfig.bg} ${sevConfig.text}`}>
                    {sevConfig.label}
                </span>
            </div>

            {/* Main Metric */}
            <div className="relative mb-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white font-mono">{percentage}%</span>
                    <span className="text-gray-400 text-sm">{mainMetric}</span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{
                            backgroundColor: sevConfig.color,
                            boxShadow: `0 0 10px ${sevConfig.color}60`
                        }}
                    />
                </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
                {details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-3 h-3 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-400">{detail}</span>
                    </div>
                ))}
            </div>

            {/* Reference & Financial */}
            <div className="bg-black/20 rounded-lg p-3 mb-4 space-y-2">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Referência Legal</span>
                    <span className="text-gray-300 font-mono">{reference}</span>
                </div>
                {financialImpact && (
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Multa Potencial</span>
                        <span className="text-red-400 font-bold font-mono">{formatCurrency(financialImpact)}</span>
                    </div>
                )}
            </div>

            {/* CTA Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onAction}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all"
                style={{
                    backgroundColor: `${config.iconColor}20`,
                    color: config.iconColor,
                    border: `1px solid ${config.iconColor}40`
                }}
            >
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
            </motion.button>
        </motion.div>
    );
}
