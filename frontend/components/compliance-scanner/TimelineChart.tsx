"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Bar, ComposedChart, ReferenceLine
} from 'recharts';
import { Calendar, ZoomIn, Activity } from 'lucide-react';

interface TimelineDataPoint {
    date: string;
    fullDate: string;
    requests: number;
    riskScore: number;
    piiExposures: number;
    hallucinations: number;
    event: string | null;
}

interface TimelineChartProps {
    data: TimelineDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg p-4 shadow-xl">
                <p className="text-white font-semibold mb-2">{label}</p>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-6">
                        <span className="text-gray-400">Requisições:</span>
                        <span className="text-white font-mono">{data.requests.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                        <span className="text-gray-400">Risk Score:</span>
                        <span className={`font-mono ${data.riskScore > 6 ? 'text-red-400' : data.riskScore > 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {data.riskScore}
                        </span>
                    </div>
                    <div className="flex justify-between gap-6">
                        <span className="text-gray-400">PII Expostos:</span>
                        <span className="text-purple-400 font-mono">{data.piiExposures}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                        <span className="text-gray-400">Alucinações:</span>
                        <span className="text-amber-400 font-mono">{data.hallucinations}</span>
                    </div>
                </div>
                {data.event && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-xs text-blue-400 flex items-center gap-1">
                            <Activity className="w-3 h-3" />
                            {data.event}
                        </p>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export default function TimelineChart({ data }: TimelineChartProps) {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

    // Filter data based on time range
    const filteredData = timeRange === '7d' ? data.slice(-7) :
        timeRange === '30d' ? data :
            data; // For 90d we'd need more data

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                        <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Timeline de Risco</h3>
                        <p className="text-gray-500 text-xs">Requisições vs. Score de Risco</p>
                    </div>
                </div>

                {/* Time range selector */}
                <div className="flex bg-gray-800/50 rounded-lg p-1">
                    {(['7d', '30d', '90d'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === range
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={filteredData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <defs>
                            <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="riskGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#10B981" />
                                <stop offset="50%" stopColor="#F59E0B" />
                                <stop offset="100%" stopColor="#EF4444" />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />

                        <XAxis
                            dataKey="date"
                            stroke="#4b5563"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            yAxisId="left"
                            stroke="#4b5563"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        />

                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#4b5563"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 10]}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        {/* Risk threshold lines */}
                        <ReferenceLine yAxisId="right" y={3} stroke="#10B981" strokeDasharray="3 3" strokeOpacity={0.5} />
                        <ReferenceLine yAxisId="right" y={6} stroke="#F59E0B" strokeDasharray="3 3" strokeOpacity={0.5} />

                        {/* Requests area */}
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="requests"
                            stroke="#3B82F6"
                            fill="url(#requestsGradient)"
                            strokeWidth={2}
                        />

                        {/* Risk score line */}
                        <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="riskScore"
                            stroke="url(#riskGradient)"
                            strokeWidth={3}
                            fill="none"
                            dot={(props: any) => {
                                const { cx, cy, payload } = props;
                                if (payload.event) {
                                    return (
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={6}
                                            fill="#EF4444"
                                            stroke="#0A0E1A"
                                            strokeWidth={2}
                                        />
                                    );
                                }
                                return null;
                            }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-gray-400">Requisições</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500" />
                    <span className="text-gray-400">Risk Score</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-gray-400">Evento</span>
                </div>
            </div>
        </motion.div>
    );
}
