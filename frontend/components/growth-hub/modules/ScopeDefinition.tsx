"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Target, Users, Database, Server, Check } from 'lucide-react';

export function ScopeDefinition() {
    const [scopingData, setScopingData] = useState({
        systemName: "Customer Service Assistant v3",
        purpose: "Automated support for Tier 1 queries",
        deployment: "Cloud (AWS)",
        dataLevel: "Confidential (PII)",
        users: "External Customers"
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-bold font-orbitron text-white">1. Definição do Escopo</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Estabeleça os limites operacionais e o contexto do Sistema de IA.
                    </p>
                </div>
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase">
                    Em Progresso
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* System Identity Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-[#0A0E1A]/40 border border-white/5 hover:border-[#00A3FF]/30 transition-all group"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[#00A3FF]/10 text-[#00A3FF]">
                            <Target size={20} />
                        </div>
                        <h3 className="text-base font-bold text-white">Identidade do Sistema</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Nome do Sistema</label>
                            <input
                                type="text"
                                value={scopingData.systemName}
                                className="w-full mt-1 bg-[#151a29] border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-[#00A3FF] outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Propósito Pretendido</label>
                            <textarea
                                value={scopingData.purpose}
                                className="w-full mt-1 bg-[#151a29] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00A3FF] outline-none h-20 resize-none"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Technical Context Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl bg-[#0A0E1A]/40 border border-white/5 hover:border-[#00FF94]/30 transition-all group"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[#00FF94]/10 text-[#00FF94]">
                            <Server size={20} />
                        </div>
                        <h3 className="text-base font-bold text-white">Contexto Técnico</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Deployment</label>
                                <select className="w-full mt-1 bg-[#151a29] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00FF94] outline-none">
                                    <option>Cloud (AWS)</option>
                                    <option>On-Premise</option>
                                    <option>Edge Device</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Classificação de Dados</label>
                                <select className="w-full mt-1 bg-[#151a29] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00FF94] outline-none">
                                    <option>Público</option>
                                    <option>Interno</option>
                                    <option>Confidencial (PII)</option>
                                    <option>Secreto</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 block">Público Alvo</label>
                            <div className="flex gap-2">
                                {['Internal Staff', 'External Customers', 'Minors'].map(tag => (
                                    <button key={tag} className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${scopingData.users.includes(tag) ? 'bg-[#00FF94]/10 border-[#00FF94]/30 text-[#00FF94]' : 'bg-transparent border-white/10 text-gray-500'}`}>
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Lifecycle Timeline Visual */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Ciclo de Vida do Sistema</h3>
                <div className="flex items-center justify-between relative px-4">
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -z-10" />
                    {['Design', 'Data Coleta', 'Treinamento', 'Validação', 'Deploy', 'Monitoramento'].map((step, i) => (
                        <div key={step} className="flex flex-col items-center gap-3 bg-[#0A0E1A] p-2 z-10">
                            <div className={`w-3 h-3 rounded-full border-2 ${i < 4 ? 'bg-[#00A3FF] border-[#00A3FF]' : i === 4 ? 'bg-[#0A0E1A] border-[#00FF94] animate-pulse' : 'bg-[#0A0E1A] border-gray-600'}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${i === 4 ? 'text-[#00FF94]' : 'text-gray-500'}`}>{step}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
