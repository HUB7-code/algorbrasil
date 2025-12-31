"use client";

import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, Server, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

export function MonitoringDashboard() {
    // Mock Data Drift
    const driftData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        drift: Math.random() * 0.15 + (i > 18 ? 0.3 : 0.05), // Spike at end
        threshold: 0.2
    }));

    const alerts = [
        { id: 1, type: 'critical', msg: 'Drift Detected in "Income" Feature', time: '10:42 AM' },
        { id: 2, type: 'warning', msg: 'API Latency High (>500ms)', time: '09:15 AM' },
        { id: 3, type: 'info', msg: 'Model Retraining Completed', time: '04:00 AM' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-bold font-orbitron text-white">8. Monitoramento & Drift</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Saúde do modelo em tempo real, detecção de degradação de performance e anomalias.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Sistema Operacional</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Real-time Stats */}
                <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-[#0A0E1A]/40 border border-white/10 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-[#00A3FF]/10 text-[#00A3FF]">
                            <Activity size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Requests / Min</p>
                            <h3 className="text-2xl font-bold font-orbitron text-white">1,240</h3>
                        </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#0A0E1A]/40 border border-white/10 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-[#00FF94]/10 text-[#00FF94]">
                            <Zap size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Avg Latency</p>
                            <h3 className="text-2xl font-bold font-orbitron text-white">45ms</h3>
                        </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#0A0E1A]/40 border border-white/10 flex items-center gap-4 relative overflow-hidden">
                        <div className={`absolute right-0 top-0 bottom-0 w-1 ${driftData[23].drift > 0.2 ? 'bg-[#EF4444]' : 'bg-[#00FF94]'}`} />
                        <div className="p-3 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B]">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Drift Score (PSI)</p>
                            <h3 className="text-2xl font-bold font-orbitron text-white">{driftData[23].drift.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                {/* Main Drift Chart */}
                <div className="lg:col-span-3 min-h-[400px] p-6 rounded-3xl border border-white/10 bg-[#0A0E1A]/40 backdrop-blur-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Activity size={16} className="text-[#F59E0B]" />
                            Detecção de Data Drift (24h)
                        </h3>
                        <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1.5 text-gray-400">
                                <div className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Data Drift
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-400">
                                <div className="w-2 h-0.5 bg-red-500/50" /> Threshold (0.2)
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={driftData}>
                                <defs>
                                    <linearGradient id="colorDrift" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="time" stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} minTickGap={30} />
                                <YAxis stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A0E1A', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                    itemStyle={{ color: '#F59E0B' }}
                                />
                                <Area type="monotone" dataKey="drift" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorDrift)" />
                                <Area type="monotone" dataKey="threshold" stroke="#EF4444" strokeWidth={1} strokeDasharray="5 5" fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alerts Console */}
                <div className="lg:col-span-1 p-6 rounded-3xl border border-white/10 bg-black/20 flex flex-col">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <Server size={16} className="text-gray-400" />
                        Log de Alertas
                    </h3>

                    <div className="flex-1 space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {alerts.map(alert => (
                            <div key={alert.id} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors group">
                                <div className="flex items-start justify-between mb-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${alert.type === 'critical' ? 'bg-red-500/10 text-red-500' :
                                            alert.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-blue-500/10 text-blue-500'
                                        }`}>
                                        {alert.type}
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-mono">{alert.time}</span>
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed font-medium group-hover:text-white transition-colors">
                                    {alert.msg}
                                </p>
                            </div>
                        ))}
                        <div className="p-3 rounded-lg border border-dashed border-white/10 text-center text-xs text-gray-600 mt-4">
                            End of logs (24h)
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
