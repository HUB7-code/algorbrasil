'use client';

import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceLine
} from 'recharts';
import { motion } from 'framer-motion';

// Mock Data - Power BI Style
const trendData = [
    { name: 'Jan', score: 65, active: 12 },
    { name: 'Feb', score: 68, active: 15 },
    { name: 'Mar', score: 75, active: 18 },
    { name: 'Apr', score: 72, active: 22 },
    { name: 'May', score: 80, active: 25 },
    { name: 'Jun', score: 85, active: 24 },
    { name: 'Jul', score: 82, active: 30 },
];

const riskData = [
    { subject: 'LGPD', A: 120, fullMark: 150 },
    { subject: 'Segurança', A: 98, fullMark: 150 },
    { subject: 'Alucinação', A: 86, fullMark: 150 },
    { subject: 'Viés', A: 99, fullMark: 150 },
    { subject: 'Jailbreak', A: 85, fullMark: 150 },
    { subject: 'PII Data', A: 65, fullMark: 150 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0A1A2F]/95 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl">
                <p className="font-bold text-white mb-2">{label}</p>
                {payload.map((p: any, idx: number) => (
                    <p key={idx} className="text-sm font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-gray-300 capitalize">{p.name}:</span>
                        <span className="text-white font-bold">{p.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export function TrendChart() {
    return (
        <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00FF94" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#00FF94" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#6B7280"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#6B7280"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                    <ReferenceLine y={90} label="" stroke="#00FF94" strokeDasharray="3 3" opacity={0.5} />

                    <Area
                        type="monotone"
                        dataKey="score"
                        name="Trust Score"
                        stroke="#00FF94"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorScore)"
                    />
                    <Area
                        type="monotone"
                        dataKey="active"
                        name="Modelos Ativos"
                        stroke="#00A3FF"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorActive)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export function RiskRadar() {
    return (
        <div className="h-[280px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={riskData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="Risco Detectado"
                        dataKey="A"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        fill="#F59E0B"
                        fillOpacity={0.3}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

// Pequeno gauge circular para cards
export function MiniGauge({ value, color = "#00FF94" }: { value: number, color?: string }) {
    return (
        <div className="relative w-16 h-16">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                <motion.path
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${value}, 100` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white font-mono">{value}%</span>
            </div>
        </div>
    );
}
