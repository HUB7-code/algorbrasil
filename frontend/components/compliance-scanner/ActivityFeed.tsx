'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, FileText, User, Search } from 'lucide-react';

interface ActivityItem {
    id: string;
    type: 'audit' | 'alert' | 'update' | 'user';
    text: string;
    time: string;
    user?: string;
}

const mockActivities: ActivityItem[] = [
    { id: '1', type: 'audit', text: 'Documento "Política de Retenção" validado por Auditor N7', time: '10 min atrás' },
    { id: '2', type: 'alert', text: 'Detectado novo ativo de Shadow AI: "Marketing_Autopilot_v2"', time: '45 min atrás' },
    { id: '3', type: 'user', text: 'Carlos Santos (DPO) alterou permissões do Lab Alpha', time: '2 horas atrás', user: 'Carlos Santos' },
    { id: '4', type: 'update', text: 'Relatório de Impacto (RIPD) gerado automaticamente', time: '5 horas atrás' },
    { id: '5', type: 'audit', text: 'Início da verificação anual ISO 42001', time: 'ontem' },
];

interface ActivityFeedProps {
    initialData?: ActivityItem[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ initialData = mockActivities }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="space-y-6 animate-pulse"><div className="h-40 bg-white/5 rounded-xl w-full" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-bold text-sm tracking-widest uppercase">Feed de Auditoria</h3>
                <span className="text-[10px] text-slate-500 font-mono tracking-tighter">ÚLTIMAS 24H</span>
            </div>

            <div className="relative space-y-4">
                {/* Vertical Line */}
                <div className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-white/5" />

                {initialData.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative flex gap-4 pr-2 group"
                    >
                        <div className={`z-10 w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#0A0F1E] shadow-xl ${item.type === 'audit' ? 'bg-emerald-500/20 text-emerald-500' :
                            item.type === 'alert' ? 'bg-red-500/20 text-red-500' :
                                item.type === 'user' ? 'bg-blue-500/20 text-blue-500' : 'bg-slate-800 text-slate-400'
                            }`}>
                            {item.type === 'audit' && <ShieldCheck className="w-4 h-4" />}
                            {item.type === 'alert' && <AlertCircle className="w-4 h-4" />}
                            {item.type === 'user' && <User className="w-4 h-4" />}
                            {item.type === 'update' && <FileText className="w-4 h-4" />}
                        </div>

                        <div className="flex-1 min-w-0 pt-0.5">
                            <p className="text-xs text-slate-300 leading-relaxed transition-colors group-hover:text-white">
                                {item.text}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wider">{item.time}</span>
                                {item.user && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-slate-800" />
                                        <span className="text-[10px] text-blue-400 font-bold">{item.user}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full py-2.5 text-[10px] font-bold text-slate-500 hover:text-blue-400 transition-colors uppercase tracking-[0.2em] border-t border-white/5 mt-2">
                Ver Histórico Completo
            </button>
        </div>
    );
};

export default ActivityFeed;
