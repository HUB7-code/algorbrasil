"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, AlertOctagon, Check, X, Clock, MessageSquare, ArrowRight } from 'lucide-react';

export function HumanOversight() {
    const [reviews, setReviews] = useState([
        { id: 'REV-1024', model: 'Credit_Risk_v2', prediction: 'REJECT', confidence: 0.45, reason: 'Low Income / High Debt', time: '10 min ago', status: 'pending' },
        { id: 'REV-1025', model: 'Fraud_Detection_v1', prediction: 'FLAGGED', confidence: 0.88, reason: 'Unusual Geo Location', time: '25 min ago', status: 'pending' },
        { id: 'REV-1026', model: 'Content_Mod_v3', prediction: 'BLOCK', confidence: 0.60, reason: 'Potential Hate Speech', time: '1h ago', status: 'pending' },
    ]);

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        setReviews(reviews.filter(r => r.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-bold font-orbitron text-white">7. Supervisão Humana (HITL)</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Interface de revisão para casos de baixa confiança ou alto risco (Human-in-the-Loop).
                    </p>
                </div>
                <div className="px-4 py-2 bg-[#0A0E1A] border border-white/10 rounded-lg flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fila de Revisão:</span>
                    </div>
                    <span className="text-xl font-bold font-orbitron text-white">{reviews.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Review Queue */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                        {reviews.length === 0 ? (
                            <div className="p-12 text-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                                <UserCheck className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                                <h3 className="text-lg font-bold text-white">Tudo Limpo!</h3>
                                <p className="text-gray-500">Nenhum caso pendente de revisão humana no momento.</p>
                            </div>
                        ) : (
                            reviews.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-6 rounded-2xl border border-white/10 bg-[#0A0E1A]/60 backdrop-blur-xl relative overflow-hidden group"
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.confidence < 0.5 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`} />

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">{item.id}</span>
                                                <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                                    <Clock size={12} /> {item.time}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-white">{item.reason}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                Modelo: <span className="text-gray-300">{item.model}</span>
                                                <span className="text-gray-600">|</span>
                                                IA Predição: <span className="font-bold text-white">{item.prediction}</span>
                                                <span className="text-xs ml-2 px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                                                    Conf: {(item.confidence * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleAction(item.id, 'reject')}
                                                className="px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-sm font-bold flex items-center gap-2 transition-all"
                                            >
                                                <X size={16} /> Corrigir IA
                                            </button>
                                            <button
                                                onClick={() => handleAction(item.id, 'approve')}
                                                className="px-4 py-2 rounded-lg bg-[#00FF94] hover:bg-[#00CC76] text-[#0A0E1A] text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,148,0.3)] transition-all"
                                            >
                                                <Check size={16} /> Aprovar Decisão
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00A3FF]/10 to-transparent border border-[#00A3FF]/20">
                        <h3 className="text-sm font-bold text-white mb-4">Eficiência da Supervisão</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">Taxa de Acordo (Humano x IA)</span>
                                    <span className="text-[#00FF94]">94%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[94%] bg-[#00FF94]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">Tempo Médio de Revisão</span>
                                    <span className="text-white">45s</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-white/5">
                                <MessageSquare size={18} className="text-gray-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Feedback Loop</h4>
                                <p className="text-xs text-gray-500">Revisões alimentam o treino.</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            As correções humanas são enviadas automaticamente para o dataset de "Golden Standard" para retreino semanal do modelo.
                        </p>
                        <button className="w-full py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-bold text-gray-300 transition-all">
                            Ver Dataset de Retreino
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
