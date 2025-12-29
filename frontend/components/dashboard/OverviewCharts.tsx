'use client';

import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceLine
} from 'recharts';
import { motion } from 'framer-motion';

// ===================================
// ULTRA-MODERN CHART COMPONENTS
// ===================================

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0A0E1A]/90 backdrop-blur-xl border border-white/10 p-3 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <p className="font-mono text-[10px] text-gray-400 mb-1 uppercase tracking-widest">{label}</p>
                {payload.map((p: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 mb-1 last:mb-0">
                        <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_5px]" style={{ backgroundColor: p.stroke || p.fill, boxShadow: `0 0 5px ${p.stroke || p.fill}` }} />
                        <span className="text-xs text-white font-bold font-mono">{p.value}</span>
                        <span className="text-[10px] text-gray-400 capitalize">{p.name}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function TrendChart({ data }: { data?: any[] }) {
    if (!data || data.length === 0) return <div className="h-[200px] flex items-center justify-center text-xs text-gray-600 font-mono">SEM DADOS</div>;

    return (
        <div className="h-[220px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="name" stroke="#4B5563" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => v.toUpperCase()} dy={10} fontFamily="var(--font-jetbrains-mono)" />
                    <YAxis stroke="#4B5563" fontSize={9} tickLine={false} axisLine={false} fontFamily="var(--font-jetbrains-mono)" />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />

                    <Area type="monotone" dataKey="score" name="Índice de Confiança" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 6, strokeWidth: 0, fill: "#fff" }} />
                    <Area type="monotone" dataKey="active" name="Ativos" stroke="#00A3FF" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" activeDot={{ r: 6, strokeWidth: 0, fill: "#fff" }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export function RiskRadar({ data }: { data?: any[] }) {
    if (!data || data.length === 0) return <div className="h-[200px] flex items-center justify-center text-xs text-gray-600 font-mono">SISTEMA SEGURO</div>;

    return (
        <div className="h-[240px] w-full flex items-center justify-center relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-[#F59E0B]/5 to-transparent blur-2xl" />

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid gridType="polygon" stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 9, fontFamily: 'var(--font-jetbrains-mono)' }} tickFormatter={(val) => val.toUpperCase()} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="Risco Detectado"
                        dataKey="A"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        fill="#F59E0B"
                        fillOpacity={0.4}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function MiniGauge({ value, color = "#00FF94" }: { value: number, color?: string }) {
    // Semi-circle gauge (180 degrees)
    return (
        <div className="relative w-24 h-12 overflow-hidden flex items-end justify-center">
            <svg viewBox="0 0 100 50" className="w-full h-full">
                {/* Background Track */}
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" />
                {/* Active Track */}
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: value / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_currentColor]"
                />
            </svg>
            <div className="absolute bottom-0 flex flex-col items-center">
                <span className="text-2xl font-bold text-white font-mono leading-none tracking-tighter shadow-black drop-shadow-md">{value}%</span>
            </div>
        </div>
    );
}

// Sparkline for small cards
export function SparkLine({ data, color }: { data: number[], color: string }) {
    const formattedData = data.map((val, i) => ({ i, val }));
    return (
        <div className="h-10 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedData}>
                    <defs>
                        <linearGradient id={`gradsw-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="val"
                        stroke={color}
                        strokeWidth={2}
                        fill={`url(#gradsw-${color})`}
                        isAnimationActive={true}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
