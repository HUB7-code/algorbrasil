"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Activity, ShieldAlert, Lock, Zap, Share2, Download } from 'lucide-react';

interface PremiumDashboardProps {
    title: string;
    score: number;
    riskLevel: string;
    verdict: string;
    metrics: { label: string; value: string | number; sub?: string; trend?: 'up' | 'down' }[];
    chartData: any[]; // Data for the main Area Chart
    barData: any[];   // Data for the side Bar Chart
    type: 'xai' | 'shadow' | 'iso';
}

export default function PremiumDashboardResult({
    title, score, riskLevel, verdict, metrics, chartData, barData, type
}: PremiumDashboardProps) {

    // Cores Dinâmicas
    const mainColor = riskLevel === 'LOW' ? '#00FF94' : (riskLevel === 'MODERATE' ? '#F59E0B' : '#FF0055');

    // Gauge Data (Score)
    const gaugeData = [
        { name: 'Score', value: score },
        { name: 'Rest', value: 100 - score }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-[#05070A] border border-white/10 rounded-[30px] p-6 md:p-8 shadow-2xl relative overflow-hidden"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#00A3FF]/10 to-dashed rounded-full blur-[120px] pointer-events-none" />

            {/* HEADER */}
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-orbitron text-gray-400 tracking-widest uppercase">
                            ALGOR INTELLIGENCE UNIT
                        </span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-orbitron text-gray-400 tracking-widest uppercase">
                            {type.toUpperCase()} MODULE
                        </span>
                    </div>
                    <h2 className="text-4xl font-orbitron font-bold text-white tracking-tight">{title}</h2>
                    <p className="text-gray-400 mt-1 max-w-2xl">{verdict}</p>
                </div>

                <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                        <Download className="w-4 h-4 text-[#00A3FF]" />
                        <span className="text-sm font-semibold text-gray-300">Export PDF</span>
                    </div>
                </div>
            </div>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {/* Score Card (Gauge) */}
                <div className="md:col-span-1 bg-[#0A0E1A] border border-white/10 rounded-2xl p-4 relative flex flex-col items-center justify-center">
                    <h3 className="text-xs text-gray-500 uppercase tracking-widest absolute top-4 left-4">Trust Score</h3>
                    <div className="relative w-full h-[140px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gaugeData}
                                    cx="50%" cy="50%"
                                    startAngle={180} endAngle={0}
                                    innerRadius={50} outerRadius={65}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell key="score" fill={mainColor} />
                                    <Cell key="rest" fill="#1e293b" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                            <span className="text-4xl font-bold text-white font-orbitron">{score}</span>
                            <span className="text-[10px] text-gray-500 uppercase">/ 100</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 text-xs font-bold" style={{ color: mainColor }}>
                        {riskLevel === 'LOW' ? 'ENTIDADE SEGURA' : 'RISCO CRÍTICO'}
                    </div>
                </div>

                {/* Metric Cards */}
                {metrics.map((m, i) => (
                    <div key={i} className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors group">
                        <div className="flex justify-between items-start">
                            <span className="text-xs text-gray-500 uppercase tracking-widest">{m.label}</span>
                            <Zap className={`w-4 h-4 ${m.trend === 'up' ? 'text-[#00FF94]' : 'text-amber-500'} opacity-50 group-hover:opacity-100`} />
                        </div>
                        <div>
                            <span className="text-3xl font-bold text-white font-orbitron block mt-2">{m.value}</span>
                            {m.sub && <span className="text-xs text-gray-500 mt-1 block">{m.sub}</span>}
                        </div>
                        {/* Fake Mini Chart */}
                        <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#00A3FF] to-[#00FF94] w-[70%]" />
                        </div>
                    </div>
                ))}
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[300px]">
                {/* Main Area Chart (Timeline/Distribution) */}
                <div className="md:col-span-2 bg-[#0A0E1A] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                        {type === 'xai' ? 'Estabilidade de Explicabilidade (Tempo Real)' : 'Detecção de Entidades (Densidade)'}
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={mainColor} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={mainColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: mainColor }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={mainColor}
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Side Bar Chart (Categories) */}
                <div className="md:col-span-1 bg-[#0A0E1A] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                        {type === 'xai' ? 'Feature Importance (SHAP)' : 'Tipos de Violação'}
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart layout="vertical" data={barData} barSize={10}>
                            <CartesianGrid stroke="#334155" horizontal={false} opacity={0.2} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={60} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00A3FF' : '#3B82F6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </motion.div>
    );
}
