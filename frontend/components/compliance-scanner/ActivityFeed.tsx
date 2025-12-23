"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Brain, Lock, Check, X, AlertCircle } from 'lucide-react';

interface ActivityItem {
    id: number;
    type: 'pii' | 'hallucination' | 'injection' | 'normal';
    message: string;
    timestamp: string;
    blocked: boolean;
}

interface ActivityFeedProps {
    initialData: ActivityItem[];
}

const typeConfig = {
    pii: { icon: Shield, color: '#A855F7', label: 'PII' },
    hallucination: { icon: Brain, color: '#F59E0B', label: 'Alucinação' },
    injection: { icon: Lock, color: '#EF4444', label: 'Injection' },
    normal: { icon: Activity, color: '#10B981', label: 'Normal' }
};

export default function ActivityFeed({ initialData }: ActivityFeedProps) {
    const [items, setItems] = useState(initialData);
    const [isPaused, setIsPaused] = useState(false);

    // Simulate real-time updates (in production, this would be WebSocket)
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            const newTypes: Array<'pii' | 'hallucination' | 'injection' | 'normal'> = ['normal', 'normal', 'pii', 'normal'];
            const randomType = newTypes[Math.floor(Math.random() * newTypes.length)];

            const messages = {
                pii: ['CPF detectado em prompt', 'Email pessoal em resposta', 'Dados bancários identificados'],
                hallucination: ['Resposta com baixa confiança', 'Fact-check falhou para resposta'],
                injection: ['Tentativa de jailbreak detectada', 'Prompt malicioso bloqueado'],
                normal: ['Requisição processada com sucesso', 'Análise concluída', 'Token gerado']
            };

            const newItem = {
                id: Date.now(),
                type: randomType,
                message: messages[randomType][Math.floor(Math.random() * messages[randomType].length)],
                timestamp: 'agora',
                blocked: randomType !== 'normal' && Math.random() > 0.3
            };

            setItems(prev => [newItem, ...prev.slice(0, 4)]);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden"
        >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">Atividade em Tempo Real</h3>
                    </div>
                </div>

                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${isPaused
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                >
                    {isPaused ? '⏸ Pausado' : '● Ao vivo'}
                </button>
            </div>

            {/* Feed */}
            <div className="max-h-[300px] overflow-y-auto">
                <AnimatePresence>
                    {items.map((item, idx) => {
                        const config = typeConfig[item.type];
                        const Icon = config.icon;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex items-start gap-3 p-4 border-b border-gray-800/50 ${idx === 0 ? 'bg-white/5' : ''
                                    }`}
                            >
                                {/* Icon */}
                                <div
                                    className="p-1.5 rounded-lg flex-shrink-0"
                                    style={{ backgroundColor: `${config.color}15` }}
                                >
                                    <Icon className="w-4 h-4" style={{ color: config.color }} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-300 truncate">{item.message}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                                        {item.type !== 'normal' && (
                                            <span className={`text-xs flex items-center gap-1 ${item.blocked ? 'text-emerald-400' : 'text-amber-400'
                                                }`}>
                                                {item.blocked ? (
                                                    <>
                                                        <Check className="w-3 h-3" />
                                                        Bloqueado
                                                    </>
                                                ) : (
                                                    <>
                                                        <AlertCircle className="w-3 h-3" />
                                                        Alerta
                                                    </>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-800 bg-black/20">
                <button className="w-full text-center text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    Ver histórico completo →
                </button>
            </div>
        </motion.div>
    );
}
