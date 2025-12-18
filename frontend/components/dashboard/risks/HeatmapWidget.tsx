import React from 'react';
import { motion } from 'framer-motion';

import { Risk } from '@/types/risk';

interface HeatmapWidgetProps {
    risks: Risk[];
}

export default function HeatmapWidget({ risks }: HeatmapWidgetProps) {
    // 5x5 Matrix (Probability x Impact)
    // Rows (Probability) 5 down to 1
    // Cols (Impact) 1 to 5

    const getRiskCount = (prob: number, imp: number) => {
        return risks.filter(r => r.probability === prob && r.impact === imp).length;
    };

    const getCellColor = (prob: number, imp: number) => {
        const score = prob * imp;
        if (score >= 15) return 'bg-red-500/20 border-red-500/30 hover:bg-red-500/30';
        if (score >= 6) return 'bg-yellow-500/20 border-yellow-500/30 hover:bg-yellow-500/30';
        return 'bg-green-500/20 border-green-500/30 hover:bg-green-500/30';
    };

    const getCellLabelColor = (prob: number, imp: number) => {
        const score = prob * imp;
        if (score >= 15) return 'text-red-400';
        if (score >= 6) return 'text-yellow-400';
        return 'text-green-400';
    };

    return (
        <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-medium text-white">Matriz de Calor</h3>
                    <p className="text-xs text-gray-400 font-mono">Distribuição de Probabilidade x Impacto</p>
                </div>
                {/* Legend */}
                <div className="flex gap-3 text-[10px] text-gray-400 font-mono">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Baixo (1-5)</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Médio (6-12)</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Crítico (15-25)</div>
                </div>
            </div>

            {/* Matrix Container */}
            <div className="relative p-4">
                {/* Y Axis Label */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
                    Probabilidade
                </div>

                {/* Grid */}
                <div className="grid grid-rows-5 gap-2">
                    {[5, 4, 3, 2, 1].map((prob) => (
                        <div key={`row-${prob}`} className="grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5].map((imp) => {
                                const count = getRiskCount(prob, imp);
                                return (
                                    <div
                                        key={`cell-${prob}-${imp}`}
                                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border flex items-center justify-center relative group transition-all duration-300 cursor-default
                                            ${getCellColor(prob, imp)}`}
                                    >
                                        {/* Count Circle */}
                                        {count > 0 ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg
                                                ${prob * imp >= 15 ? 'bg-red-500 text-white' : prob * imp >= 6 ? 'bg-yellow-500 text-black' : 'bg-green-500 text-black'}`}
                                            >
                                                {count}
                                            </motion.div>
                                        ) : (
                                            <span className="text-[10px] text-gray-600 font-mono opacity-30">{prob * imp}</span>
                                        )}

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-32 bg-black/90 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 text-center border border-white/10">
                                            Prob: {prob} | Imp: {imp}
                                            <br />
                                            Score: {prob * imp}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* X Axis Label */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Impacto
                </div>
            </div>

            {/* Spacing for labels */}
            <div className="h-6 w-full" />
        </div>
    );
}
