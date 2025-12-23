"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, TrendingDown, History } from 'lucide-react';

interface RiskScoreGaugeProps {
    score: number;
    previousScore: number;
    maxScore?: number;
}

export default function RiskScoreGauge({ score, previousScore, maxScore = 10 }: RiskScoreGaugeProps) {
    const [displayScore, setDisplayScore] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    const change = score - previousScore;
    const changeDirection = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

    // Determine risk level and colors
    const getRiskLevel = (s: number) => {
        if (s <= 3) return { label: 'BAIXO RISCO', color: '#10B981', bg: 'from-emerald-500/20 to-emerald-500/5' };
        if (s <= 6) return { label: 'ATENÇÃO MODERADA', color: '#F59E0B', bg: 'from-amber-500/20 to-amber-500/5' };
        return { label: 'ATENÇÃO NECESSÁRIA', color: '#EF4444', bg: 'from-red-500/20 to-red-500/5' };
    };

    const riskLevel = getRiskLevel(score);

    // Animated count up effect
    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const increment = score / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= score) {
                setDisplayScore(score);
                setIsAnimating(false);
                clearInterval(timer);
            } else {
                setDisplayScore(parseFloat(current.toFixed(1)));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [score]);

    // SVG arc calculations
    const radius = 120;
    const strokeWidth = 12;
    const circumference = Math.PI * radius; // Half circle
    const progress = (score / maxScore) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative bg-gradient-to-b ${riskLevel.bg} backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden`}
        >
            {/* Ambient glow effect */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(ellipse at center bottom, ${riskLevel.color}20 0%, transparent 70%)`
                }}
            />

            {/* Header */}
            <div className="relative flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider">AI Compliance Score</h2>
                    <p className="text-gray-500 text-xs mt-1">Última análise: agora</p>
                </div>
                <motion.div
                    animate={isAnimating && score > 6 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <AlertTriangle
                        className="w-6 h-6"
                        style={{ color: riskLevel.color }}
                    />
                </motion.div>
            </div>

            {/* Gauge */}
            <div className="relative flex flex-col items-center">
                <svg
                    width="280"
                    height="160"
                    viewBox="0 0 280 160"
                    className="overflow-visible"
                >
                    {/* Background arc */}
                    <path
                        d="M 20 140 A 120 120 0 0 1 260 140"
                        fill="none"
                        stroke="#1f2937"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />

                    {/* Progress arc */}
                    <motion.path
                        d="M 20 140 A 120 120 0 0 1 260 140"
                        fill="none"
                        stroke={riskLevel.color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: score / maxScore }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            filter: `drop-shadow(0 0 8px ${riskLevel.color}60)`
                        }}
                    />

                    {/* Tick marks */}
                    {[0, 3, 6, 10].map((tick, i) => {
                        const angle = (Math.PI * tick) / maxScore;
                        const x1 = 140 - Math.cos(angle) * 105;
                        const y1 = 140 - Math.sin(angle) * 105;
                        const x2 = 140 - Math.cos(angle) * 95;
                        const y2 = 140 - Math.sin(angle) * 95;
                        return (
                            <g key={tick}>
                                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4b5563" strokeWidth="2" />
                                <text
                                    x={140 - Math.cos(angle) * 80}
                                    y={145 - Math.sin(angle) * 80}
                                    fill="#6b7280"
                                    fontSize="12"
                                    textAnchor="middle"
                                >
                                    {tick}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Score display */}
                <div className="absolute top-16 flex flex-col items-center">
                    <motion.span
                        className="text-6xl font-bold font-mono"
                        style={{ color: riskLevel.color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {displayScore.toFixed(1)}
                    </motion.span>
                    <span className="text-gray-500 text-lg mt-1">/ {maxScore}</span>
                </div>
            </div>

            {/* Risk Label */}
            <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <span
                    className="inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                    style={{
                        color: riskLevel.color,
                        backgroundColor: `${riskLevel.color}15`,
                        border: `1px solid ${riskLevel.color}30`
                    }}
                >
                    {riskLevel.label}
                </span>
            </motion.div>

            {/* Change indicator */}
            <motion.div
                className="flex items-center justify-center gap-2 mt-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                {changeDirection === 'up' ? (
                    <>
                        <TrendingUp className="w-4 h-4 text-red-400" />
                        <span className="text-red-400">↑ {Math.abs(change).toFixed(1)} pontos vs. semana passada</span>
                    </>
                ) : changeDirection === 'down' ? (
                    <>
                        <TrendingDown className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">↓ {Math.abs(change).toFixed(1)} pontos vs. semana passada</span>
                    </>
                ) : (
                    <span className="text-gray-400">Estável vs. semana passada</span>
                )}
            </motion.div>

            {/* History link */}
            <button className="flex items-center justify-center gap-2 mx-auto mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                <History className="w-3 h-3" />
                Ver histórico
            </button>
        </motion.div>
    );
}
