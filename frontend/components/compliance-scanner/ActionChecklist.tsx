'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActionItem {
    id: string;
    text: string;
    priority: 'high' | 'medium' | 'low';
    status: 'pending' | 'completed' | 'urgent';
    timeEstimate: string;
}

const mockActions: ActionItem[] = [
    { id: '1', text: 'Identificar CPFs responsáveis por Shadow AI', priority: 'high', status: 'urgent', timeEstimate: '3h' },
    { id: '2', text: 'Mapear fluxos de dados transfronteiriços', priority: 'medium', status: 'pending', timeEstimate: '5h' },
    { id: '3', text: 'Estabelecer Comitê de Governança de IA', priority: 'high', status: 'pending', timeEstimate: '12h' },
    { id: '4', text: 'Treinamento de Alpha 1: Princípios Éticos', priority: 'low', status: 'completed', timeEstimate: '2h' },
];

interface ActionChecklistProps {
    items?: ActionItem[];
}

export default function ActionChecklist({ items = mockActions }: ActionChecklistProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="space-y-4 animate-pulse"><div className="h-20 bg-white/5 rounded-xl w-full" /><div className="h-20 bg-white/5 rounded-xl w-full" /></div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-bold text-sm tracking-widest uppercase">Ações Prioritárias</h3>
                <span className="text-[10px] text-slate-500 font-mono">4 AÇÕES PENDENTES</span>
            </div>

            <div className="space-y-3">
                {items.map((action, idx) => (
                    <motion.div
                        key={action.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-white/10 transition-all cursor-pointer`}
                    >
                        <div className="flex items-center gap-3">
                            {action.status === 'completed' ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : action.status === 'urgent' ? (
                                <AlertCircle className="w-5 h-5 text-amber-500 animate-pulse" />
                            ) : (
                                <Circle className="w-5 h-5 text-slate-700 group-hover:text-slate-500" />
                            )}
                            <div>
                                <p className={`text-sm font-medium ${action.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                    {action.text}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${action.priority === 'high' ? 'text-red-400' :
                                        action.priority === 'medium' ? 'text-amber-400' : 'text-slate-500'
                                        }`}>
                                        Prioridade {action.priority}
                                    </span>
                                    <span className="flex items-center gap-1 text-[9px] text-slate-500 font-medium">
                                        <Clock className="w-3 h-3" />
                                        {action.timeEstimate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-[10px] font-bold text-blue-400 hover:text-white transition-colors">EXECUTAR</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full py-3 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs font-bold hover:border-slate-700 hover:text-slate-300 transition-all mt-4">
                + ADICIONAR NOVA AÇÃO
            </button>
        </div>
    );
}
