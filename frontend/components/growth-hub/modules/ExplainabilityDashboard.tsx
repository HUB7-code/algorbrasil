"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Network, Code2, Sliders, ChevronRight } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';

export function ExplainabilityDashboard() {
    const [viewMode, setViewMode] = useState<'global' | 'local'>('global');

    // Mock Feature Importance
    const featureData = [
        { name: 'Histórico Crédito', value: 35, color: '#00A3FF' },
        { name: 'Renda Mensal', value: 25, color: '#00A3FF' },
        { name: 'Idade', value: 15, color: '#3B82F6' },
        { name: 'Dívida Atual', value: 12, color: '#3B82F6' },
        { name: 'Tempo Emprego', value: 8, color: '#6366F1' },
        { name: 'Outros', value: 5, color: '#8B5CF6' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-bold font-orbitron text-white">6. Explicabilidade (XAI)</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Entenda como o modelo toma decisões (Global) e justifique predições individuais (Local/SHAP).
                    </p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                    <button
                        onClick={() => setViewMode('global')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'global' ? 'bg-[#00A3FF] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Global
                    </button>
                    <button
                        onClick={() => setViewMode('local')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'local' ? 'bg-[#00FF94] text-[#0A0E1A] shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Local (Simulação)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Chart Area */}
                <div className="lg:col-span-2 min-h-[400px] p-6 rounded-3xl border border-white/10 bg-[#0A0E1A]/40 backdrop-blur-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Sliders size={16} className="text-[#00A3FF]" />
                            {viewMode === 'global' ? 'Importância das Features (Global SHAP)' : 'Contribuição por Decisão (Local)'}
                        </h3>
                    </div>

                    <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={featureData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis type="number" stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={12} width={100} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    contentStyle={{ backgroundColor: '#0A0E1A', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {featureData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Model Card / Technical Details */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500">
                                <Code2 size={20} />
                            </div>
                            <h3 className="text-base font-bold text-white">Model Card</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Arquitetura</label>
                                <p className="text-sm font-mono text-white mt-1">XGBoost Classifier v1.4</p>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Métrica Performance</label>
                                <div className="flex items-end gap-2 mt-1">
                                    <span className="text-2xl font-bold font-orbitron text-[#00FF94]">0.92</span>
                                    <span className="text-xs text-gray-400 mb-1">AUC-ROC</span>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Dataset Treino</label>
                                <p className="text-sm text-gray-300 mt-1">Historical_Loan_Data_2024.csv (500k rows)</p>
                            </div>
                        </div>

                        <button className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all group">
                            Ver Documentação Técnica
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#00A3FF]/10 to-transparent border border-[#00A3FF]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20">
                            <Network size={40} className="text-[#00A3FF]" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">Fairness Check</h4>
                        <p className="text-xs text-gray-400 leading-relaxed mb-3">
                            A disparidade de impacto entre gêneros está abaixo de 5% (aceitável). Monitoramento contínuo ativo.
                        </p>
                        <div className="w-full h-1.5 bg-[#00A3FF]/20 rounded-full overflow-hidden">
                            <div className="h-full w-[95%] bg-[#00FF94]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
