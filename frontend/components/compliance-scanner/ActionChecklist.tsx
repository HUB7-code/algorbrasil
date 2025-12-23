"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, AlertTriangle, Zap, Clock, ChevronRight } from 'lucide-react';

interface ActionItem {
    id: number;
    text: string;
    completed: boolean;
    priority: 'critical' | 'high' | 'medium' | 'low';
}

interface ActionChecklistProps {
    items: ActionItem[];
    onToggle?: (id: number) => void;
}

const priorityConfig = {
    critical: { color: '#EF4444', bg: 'bg-red-500/10', label: 'Crítico', icon: AlertTriangle },
    high: { color: '#F59E0B', bg: 'bg-amber-500/10', label: 'Alto', icon: Zap },
    medium: { color: '#3B82F6', bg: 'bg-blue-500/10', label: 'Médio', icon: Clock },
    low: { color: '#10B981', bg: 'bg-emerald-500/10', label: 'Baixo', icon: Circle }
};

export default function ActionChecklist({ items, onToggle }: ActionChecklistProps) {
    const [localItems, setLocalItems] = useState(items);

    const handleToggle = (id: number) => {
        setLocalItems(prev => prev.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
        onToggle?.(id);
    };

    const completedCount = localItems.filter(i => i.completed).length;
    const progress = (completedCount / localItems.length) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Ações Recomendadas</h3>
                        <p className="text-gray-500 text-xs">Priorize para reduzir exposição</p>
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-2xl font-bold text-white">{completedCount}/{localItems.length}</span>
                    <p className="text-xs text-gray-500">concluídas</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                        style={{ boxShadow: '0 0 10px #10B98160' }}
                    />
                </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
                <AnimatePresence>
                    {localItems.map((item, idx) => {
                        const priority = priorityConfig[item.priority];
                        const PriorityIcon = priority.icon;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => handleToggle(item.id)}
                                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all group ${item.completed
                                        ? 'bg-emerald-500/5 border border-emerald-500/20'
                                        : 'bg-gray-800/30 border border-gray-700/50 hover:border-gray-600'
                                    }`}
                            >
                                {/* Checkbox */}
                                <div className="flex-shrink-0">
                                    <motion.div
                                        whileTap={{ scale: 0.9 }}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${item.completed
                                                ? 'bg-emerald-500 border-emerald-500'
                                                : 'border-gray-600 group-hover:border-gray-500'
                                            }`}
                                    >
                                        {item.completed && (
                                            <motion.svg
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-3 h-3 text-white"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            >
                                                <path d="M5 12l5 5L20 7" />
                                            </motion.svg>
                                        )}
                                    </motion.div>
                                </div>

                                {/* Text */}
                                <div className="flex-1">
                                    <p className={`text-sm font-medium transition-all ${item.completed ? 'text-gray-500 line-through' : 'text-white'
                                        }`}>
                                        {item.text}
                                    </p>
                                </div>

                                {/* Priority badge */}
                                {!item.completed && (
                                    <div
                                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${priority.bg}`}
                                        style={{ color: priority.color }}
                                    >
                                        <PriorityIcon className="w-3 h-3" />
                                        {priority.label}
                                    </div>
                                )}

                                {/* Arrow */}
                                <ChevronRight className={`w-4 h-4 transition-all ${item.completed ? 'text-gray-600' : 'text-gray-500 group-hover:text-white group-hover:translate-x-1'
                                    }`} />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
