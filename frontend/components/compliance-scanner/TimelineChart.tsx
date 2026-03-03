'use client';

import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const mockTimelineData = [
    { name: 'Jan', compliance: 45, risks: 20 },
    { name: 'Fev', compliance: 52, risks: 18 },
    { name: 'Mar', compliance: 48, risks: 25 },
    { name: 'Abr', compliance: 61, risks: 15 },
    { name: 'Mai', compliance: 68, risks: 12 },
];

interface TimelineChartProps {
    data?: any[];
}

export default function TimelineChart({ data = mockTimelineData }: TimelineChartProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-full min-h-[300px] bg-white/5 animate-pulse rounded-xl" />;

    return (
        <div className="w-full h-full min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-sm tracking-widest uppercase">Evolução da Conformidade</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#4F7EFF]" />
                        <span className="text-[10px] text-slate-400 font-bold">SCORE N7</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="text-[10px] text-slate-400 font-bold">RISCOS</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                            dy={10}
                        />
                        <YAxis
                            hide
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0B0F1E',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                fontSize: '11px',
                                color: '#fff'
                            }}
                            itemStyle={{ padding: '2px 0' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="compliance"
                            stroke="#4F7EFF"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#4F7EFF', strokeWidth: 2, stroke: '#0B0F1E' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="risks"
                            stroke="#ef4444"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
