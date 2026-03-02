'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

interface RiskScoreGaugeProps {
    score?: number;
    previousScore?: number;
}

export default function RiskScoreGauge({ score = 68, previousScore }: RiskScoreGaugeProps) {
    // Determine color based on score
    const getColor = (s: number) => {
        if (s > 80) return '#10b981'; // Green
        if (s > 50) return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    const color = getColor(score);

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Background Track */}
                <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-white/5"
                    />
                    {/* Progress Fill */}
                    <motion.circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke={color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 88}
                        initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - score / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
                    />
                </svg>

                {/* Center Content */}
                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {score > 80 ? (
                            <ShieldCheck className="w-8 h-8 mx-auto mb-1 text-emerald-500" />
                        ) : score > 50 ? (
                            <Shield className="w-8 h-8 mx-auto mb-1 text-amber-500" />
                        ) : (
                            <ShieldAlert className="w-8 h-8 mx-auto mb-1 text-red-500" />
                        )}
                    </motion.div>
                    <span className="text-4xl font-black font-orbitron text-white">{score}</span>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Compliance Score</p>
                    {previousScore !== undefined && (
                        <p className={`text-[10px] font-bold mt-1 ${score >= previousScore ? 'text-emerald-400' : 'text-red-400'}`}>
                            {score >= previousScore ? '▲' : '▼'} {Math.abs(score - previousScore)} vs semana anterior
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-8 w-full">
                <div className="text-center">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Risco</div>
                    <div className="text-sm font-bold text-amber-500">MÉDIO</div>
                </div>
                <div className="text-center border-x border-white/5 px-4">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Status</div>
                    <div className="text-sm font-bold text-blue-400">EM ANÁLISE</div>
                </div>
                <div className="text-center">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">ISO 42001</div>
                    <div className="text-sm font-bold text-slate-300">NÍVEL 3</div>
                </div>
            </div>
        </div>
    );
}
