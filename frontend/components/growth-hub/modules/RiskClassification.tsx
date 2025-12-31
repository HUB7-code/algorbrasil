"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Zap, Info } from 'lucide-react';

export function RiskClassification() {
    const [currentRiskLevel, setCurrentRiskLevel] = useState('HIGH'); // LIMITED, MINIMAL, UNACCEPTABLE

    const levels = {
        UNACCEPTABLE: { color: '#EF4444', label: 'Risco Inaceitável', desc: 'Sistemas proibidos (Social scoring, Real-time biometric identification).' },
        HIGH: { color: '#F59E0B', label: 'Alto Risco', desc: 'Infraestrutura crítica, RH, Saúde, Educação. Requer conformidade total.' },
        LIMITED: { color: '#00A3FF', label: 'Risco Limitado', desc: 'Chatbots, Deepfakes. Requer transparência.' },
        MINIMAL: { color: '#00FF94', label: 'Risco Mínimo', desc: 'Filtros de spam, Video games. Sem restrições.' }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-bold font-orbitron text-white">2. Classificação de Riscos (EU AI Act)</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Determine a categoria de risco do sistema para identificar as obrigações regulatórias.
                    </p>
                </div>
                <div className="px-3 py-1 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full text-[#F59E0B] text-xs font-bold uppercase flex items-center gap-2">
                    <AlertTriangle size={12} />
                    Nível Atual: Alto
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Pyramid Visualization */}
                <div className="lg:col-span-1 flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] to-transparent pointer-events-none" />

                    <div className="w-full flex flex-col gap-1 relative z-10">
                        {Object.entries(levels).map(([key, data]) => (
                            <motion.button
                                key={key}
                                onClick={() => setCurrentRiskLevel(key)}
                                whileHover={{ scale: 1.02 }}
                                className={`
                                    w-full py-4 rounded-lg font-bold uppercase tracking-wider text-xs border transition-all relative overflow-hidden group
                                    ${currentRiskLevel === key ? `border-[${data.color}] text-white shadow-[0_0_20px_${data.color}40]` : 'border-white/5 text-gray-600 hover:bg-white/5'}
                                `}
                                style={{
                                    backgroundColor: currentRiskLevel === key ? `${data.color}20` : 'transparent',
                                    borderColor: currentRiskLevel === key ? data.color : 'rgba(255,255,255,0.05)'
                                }}
                            >
                                {key === 'UNACCEPTABLE' && <ShieldAlert size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />}
                                {data.label}
                                {currentRiskLevel === key && <div className="absolute inset-0 bg-white/5 animate-pulse" />}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Details Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        key={currentRiskLevel}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-8 rounded-2xl border border-white/10 bg-[#0A0E1A]/40 backdrop-blur-xl relative overflow-hidden"
                    >
                        {/* Dynamic Glow */}
                        <div
                            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
                            style={{ backgroundColor: (levels as any)[currentRiskLevel].color }}
                        />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-orbitron font-bold mb-2 text-white">
                                {(levels as any)[currentRiskLevel].label}
                            </h3>
                            <p className="text-lg text-gray-300 mb-6 font-light">
                                {(levels as any)[currentRiskLevel].desc}
                            </p>

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2 mb-4">Obrigações Exigidas</h4>
                                <ul className="space-y-3">
                                    {currentRiskLevel === 'HIGH' && [
                                        "Sistema de Gestão de Risco (ISO 42001)",
                                        "Governança de Dados e Qualidade",
                                        "Documentação Técnica Detalhada",
                                        "Logs Automáticos (Rastreabilidade)",
                                        "Transparência e Informação aos Usuários",
                                        "Supervisão Humana",
                                        "Precisão, Robustez e Cibersegurança"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                                            {item}
                                        </li>
                                    ))}
                                    {currentRiskLevel === 'LIMITED' && [
                                        "Obrigações de Transparência (Avisar que é IA)",
                                        "Garantir que o conteúdo gerado é identificável"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]" />
                                            {item}
                                        </li>
                                    ))}
                                    {currentRiskLevel === 'MINIMAL' && [
                                        "Sem obrigações adicionais (Código de Conduta Voluntário recomendado)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                                            {item}
                                        </li>
                                    ))}
                                    {currentRiskLevel === 'UNACCEPTABLE' && [
                                        "PROIBIÇÃO TOTAL DE COLOCAÇÃO NO MERCADO"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-red-500">
                                            <AlertTriangle size={16} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                        <Info className="text-blue-400 mt-0.5 shrink-0" size={18} />
                        <p className="text-xs text-blue-300 leading-relaxed">
                            A classificação correta é fundamental. Erros aqui podem levar a multas de até 35 Milhões de Euros ou 7% do faturamento global. Em caso de dúvida, consulte o módulo jurídico.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
