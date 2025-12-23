"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import {
    Activity, Clock, Zap, Server, AlertTriangle,
    ChevronDown, Filter, RefreshCw, Terminal, Cpu,
    Database, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// Mock Data for Technical Dashboard
const latencyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    p50: 120 + Math.random() * 30,
    p95: 200 + Math.random() * 80,
    p99: 350 + Math.random() * 150
}));

const errorRateData = [
    { endpoint: '/chat/completion', rate: 0.8, requests: 12500 },
    { endpoint: '/embeddings', rate: 0.2, requests: 8200 },
    { endpoint: '/assistants', rate: 1.5, requests: 3100 },
    { endpoint: '/images/generate', rate: 2.1, requests: 850 },
    { endpoint: '/audio/transcriptions', rate: 0.4, requests: 420 }
];

const tokenDistribution = [
    { range: '0-500', count: 12500, color: '#10B981' },
    { range: '500-1k', count: 8900, color: '#3B82F6' },
    { range: '1k-2k', count: 4200, color: '#8B5CF6' },
    { range: '2k-4k', count: 2100, color: '#F59E0B' },
    { range: '4k+', count: 800, color: '#EF4444' }
];

const modelUsage = [
    { name: 'GPT-4o', value: 45, color: '#10B981' },
    { name: 'GPT-4 Turbo', value: 25, color: '#3B82F6' },
    { name: 'Claude Sonnet', value: 20, color: '#8B5CF6' },
    { name: 'Claude Haiku', value: 10, color: '#F59E0B' }
];

const realtimeLogs = [
    { id: 1, timestamp: '15:23:45.123', level: 'INFO', model: 'gpt-4o', tokens: 847, latency: 145, status: 'success' },
    { id: 2, timestamp: '15:23:44.891', level: 'WARN', model: 'claude-sonnet', tokens: 1203, latency: 312, status: 'slow' },
    { id: 3, timestamp: '15:23:44.567', level: 'INFO', model: 'gpt-4o', tokens: 523, latency: 98, status: 'success' },
    { id: 4, timestamp: '15:23:44.234', level: 'ERROR', model: 'gpt-4-turbo', tokens: 0, latency: 5023, status: 'timeout' },
    { id: 5, timestamp: '15:23:43.901', level: 'INFO', model: 'gpt-4o', tokens: 1567, latency: 201, status: 'success' },
    { id: 6, timestamp: '15:23:43.678', level: 'INFO', model: 'claude-haiku', tokens: 234, latency: 67, status: 'success' },
    { id: 7, timestamp: '15:23:43.345', level: 'WARN', model: 'gpt-4o', tokens: 2341, latency: 456, status: 'slow' },
    { id: 8, timestamp: '15:23:43.012', level: 'INFO', model: 'gpt-4o', tokens: 678, latency: 123, status: 'success' }
];

const MetricCard = ({ title, value, unit, change, changeType, icon: Icon }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-5"
    >
        <div className="flex justify-between items-start mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
                <Icon className="w-5 h-5 text-blue-400" />
            </div>
            {change && (
                <div className={`flex items-center gap-1 text-xs ${changeType === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {changeType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {change}
                </div>
            )}
        </div>
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white font-mono">{value}</span>
            <span className="text-gray-500 text-sm">{unit}</span>
        </div>
    </motion.div>
);

export default function TechnicalDashboard() {
    const [selectedModel, setSelectedModel] = useState('all');
    const [selectedEnv, setSelectedEnv] = useState('production');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white p-6">
            <div className="max-w-[1600px] mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Technical Deep Dive</h1>
                        <p className="text-gray-500 text-sm mt-1">Performance, latência e observabilidade em tempo real</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Filters */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
                            <Filter className="w-4 h-4 text-gray-400" />
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="bg-transparent text-sm text-white outline-none cursor-pointer"
                            >
                                <option value="all">Todos os modelos</option>
                                <option value="gpt-4o">GPT-4o</option>
                                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                                <option value="claude-sonnet">Claude Sonnet</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
                            <Server className="w-4 h-4 text-gray-400" />
                            <select
                                value={selectedEnv}
                                onChange={(e) => setSelectedEnv(e.target.value)}
                                className="bg-transparent text-sm text-white outline-none cursor-pointer"
                            >
                                <option value="production">Production</option>
                                <option value="staging">Staging</option>
                                <option value="development">Development</option>
                            </select>
                        </div>

                        <button
                            onClick={handleRefresh}
                            className={`p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/50 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                        >
                            <RefreshCw className="w-5 h-5 text-blue-400" />
                        </button>
                    </div>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <MetricCard
                        title="Latência P50"
                        value="142"
                        unit="ms"
                        change="+12ms"
                        changeType="up"
                        icon={Clock}
                    />
                    <MetricCard
                        title="Latência P95"
                        value="287"
                        unit="ms"
                        change="-23ms"
                        changeType="down"
                        icon={Zap}
                    />
                    <MetricCard
                        title="Taxa de Erro"
                        value="0.8"
                        unit="%"
                        change="-0.2%"
                        changeType="down"
                        icon={AlertTriangle}
                    />
                    <MetricCard
                        title="Tokens/hora"
                        value="847K"
                        unit=""
                        change="+12%"
                        changeType="up"
                        icon={Cpu}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-12 gap-6 mb-8">
                    {/* Latency Chart */}
                    <div className="col-span-8 bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <Activity className="w-5 h-5 text-blue-400" />
                                <h3 className="text-white font-semibold">Latência por Percentil (24h)</h3>
                            </div>
                            <div className="flex gap-4 text-xs">
                                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-emerald-400" /> P50</span>
                                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-amber-400" /> P95</span>
                                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-red-400" /> P99</span>
                            </div>
                        </div>

                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={latencyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                    <XAxis dataKey="hour" stroke="#4b5563" fontSize={10} tickLine={false} />
                                    <YAxis stroke="#4b5563" fontSize={10} tickLine={false} unit="ms" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151', borderRadius: '8px' }}
                                        labelStyle={{ color: '#9ca3af' }}
                                    />
                                    <Line type="monotone" dataKey="p50" stroke="#10B981" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="p95" stroke="#F59E0B" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="p99" stroke="#EF4444" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Model Distribution Pie */}
                    <div className="col-span-4 bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Database className="w-5 h-5 text-purple-400" />
                            <h3 className="text-white font-semibold">Uso por Modelo</h3>
                        </div>

                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={modelUsage}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {modelUsage.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151', borderRadius: '8px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {modelUsage.map((model) => (
                                <div key={model.name} className="flex items-center gap-2 text-xs">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: model.color }} />
                                    <span className="text-gray-400">{model.name}</span>
                                    <span className="text-white font-mono ml-auto">{model.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Error Rate by Endpoint */}
                <div className="grid grid-cols-12 gap-6 mb-8">
                    <div className="col-span-6 bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                            <h3 className="text-white font-semibold">Taxa de Erro por Endpoint</h3>
                        </div>

                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={errorRateData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                                    <XAxis type="number" stroke="#4b5563" fontSize={10} unit="%" />
                                    <YAxis dataKey="endpoint" type="category" stroke="#4b5563" fontSize={10} width={140} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="rate" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Token Distribution */}
                    <div className="col-span-6 bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Cpu className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-white font-semibold">Distribuição de Tokens</h3>
                        </div>

                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={tokenDistribution}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                    <XAxis dataKey="range" stroke="#4b5563" fontSize={10} />
                                    <YAxis stroke="#4b5563" fontSize={10} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151', borderRadius: '8px' }}
                                        formatter={(value: number) => [`${value.toLocaleString()} requests`, 'Count']}
                                    />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {tokenDistribution.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Real-time Logs */}
                <div className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/20">
                        <div className="flex items-center gap-3">
                            <Terminal className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-white font-semibold">Logs em Tempo Real</h3>
                            <span className="flex items-center gap-1 text-xs text-emerald-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Streaming
                            </span>
                        </div>
                        <span className="text-xs text-gray-500 font-mono">Últimas 100 requisições</span>
                    </div>

                    <div className="font-mono text-xs overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-black/40 text-gray-500 uppercase">
                                <tr>
                                    <th className="px-4 py-3 text-left">Timestamp</th>
                                    <th className="px-4 py-3 text-left">Level</th>
                                    <th className="px-4 py-3 text-left">Model</th>
                                    <th className="px-4 py-3 text-right">Tokens</th>
                                    <th className="px-4 py-3 text-right">Latency</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {realtimeLogs.map((log, idx) => (
                                    <motion.tr
                                        key={log.id}
                                        initial={{ opacity: 0, backgroundColor: '#10B98120' }}
                                        animate={{ opacity: 1, backgroundColor: 'transparent' }}
                                        transition={{ duration: 0.5 }}
                                        className="hover:bg-white/5"
                                    >
                                        <td className="px-4 py-3 text-gray-400">{log.timestamp}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.level === 'ERROR' ? 'bg-red-500/20 text-red-400' :
                                                    log.level === 'WARN' ? 'bg-amber-500/20 text-amber-400' :
                                                        'bg-emerald-500/20 text-emerald-400'
                                                }`}>
                                                {log.level}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-white">{log.model}</td>
                                        <td className="px-4 py-3 text-right text-gray-300">{log.tokens.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right">
                                            <span className={
                                                log.latency > 500 ? 'text-red-400' :
                                                    log.latency > 200 ? 'text-amber-400' :
                                                        'text-emerald-400'
                                            }>
                                                {log.latency}ms
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`${log.status === 'success' ? 'text-emerald-400' :
                                                    log.status === 'slow' ? 'text-amber-400' :
                                                        'text-red-400'
                                                }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
