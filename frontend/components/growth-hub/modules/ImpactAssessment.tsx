"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Activity, Users } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

export function ImpactAssessment() {
    const [scenarios, setScenarios] = useState([
        { id: 1, category: "Direitos Fundamentais", risk: 85, desc: "Potencial viés discriminatório em grupos minoritários." },
        { id: 2, category: "Segurança Física", risk: 20, desc: "Baixo risco de danos físicos diretos ao usuário." },
        { id: 3, category: "Privacidade", risk: 65, desc: "Coleta extensiva de dados comportamentais." },
        { id: 4, category: "Socioeconômico", risk: 40, desc: "Impacto moderado na automação de empregos." },
        { id: 5, category: "Democracia", risk: 10, desc: "Sem impacto em processos eleitorais ou discurso público." },
    ]);

    const data = scenarios.map(s => ({ subject: s.category, A: s.risk, fullMark: 100 }));

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-bold font-orbitron text-white">4. Avaliação de Impacto Algorítmico (AIA)</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Mapeamento de externalidades negativas e riscos aos direitos fundamentais.
                    </p>
                </div>
                <div className="px-3 py-1 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full text-[#F59E0B] text-xs font-bold uppercase flex items-center gap-2">
                    <Activity size={12} />
                    Impacto Geral: Moderado-Alto
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Visualização de Radar */}
                <div className="lg:col-span-1 min-h-[400px] relative rounded-3xl border border-white/10 bg-[#0A0E1A]/40 backdrop-blur-xl flex flex-col items-center justify-center p-4">
                    <h3 className="absolute top-6 left-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Radar de Impacto</h3>
                    <div className="w-full h-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 'bold' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Risco Estimado"
                                    dataKey="A"
                                    stroke="#F59E0B"
                                    strokeWidth={2}
                                    fill="#F59E0B"
                                    fillOpacity={0.3}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A0E1A', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                    itemStyle={{ color: '#F59E0B' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Lista de Cenários */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="grid gap-4">
                        {scenarios.map((scenario) => (
                            <motion.div
                                key={scenario.id}
                                whileHover={{ scale: 1.01 }}
                                className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden"
                            >
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${scenario.risk > 70 ? 'bg-[#EF4444]' : scenario.risk > 40 ? 'bg-[#F59E0B]' : 'bg-[#00FF94]'}`} />

                                <div className="flex justify-between items-start pl-4 gap-4">
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold text-sm mb-1">{scenario.category}</h4>
                                        <p className="text-gray-400 text-xs leading-relaxed">{scenario.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-2xl font-bold font-orbitron ${scenario.risk > 70 ? 'text-[#EF4444]' : scenario.risk > 40 ? 'text-[#F59E0B]' : 'text-[#00FF94]'}`}>
                                            {scenario.risk}
                                        </span>
                                        <span className="text-[10px] text-gray-500 block uppercase tracking-wider">Nível Risco</span>
                                    </div>
                                </div>

                                {/* Interactive Slider (Mock) */}
                                <div className="mt-4 pl-4 flex items-center gap-3">
                                    <span className="text-[10px] text-gray-600 font-mono">MITIGAÇÃO</span>
                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-white/20 w-[30%]" />
                                    </div>
                                    <button className="text-[10px] text-[#00A3FF] hover:underline">
                                        Adicionar Controle
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Users className="text-purple-400" />
                            <div>
                                <h4 className="text-sm font-bold text-white">Conselho Consultivo Requerido</h4>
                                <p className="text-xs text-gray-400">Devido ao alto risco em "Direitos Fundamentais", a validação humana externa é obrigatória.</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-purple-500 text-white text-xs font-bold rounded-lg hover:bg-purple-600 transition-colors">
                            Convidar Avaliadores
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
