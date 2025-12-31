"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Circle, FileText, ExternalLink } from 'lucide-react';

export function LegalCompliance() {
    const [expandedSection, setExpandedSection] = useState<string | null>('LGPD');

    const sections = [
        {
            id: 'LGPD',
            title: 'LGPD (Brasil)',
            progress: 85,
            items: [
                { id: 1, label: 'Base Legal Definida (Art. 7)', status: 'done' },
                { id: 2, label: 'Relatório de Impacto (DPIA/RIPD)', status: 'done' },
                { id: 3, label: 'Direitos do Titular (Art. 18)', status: 'pending' },
                { id: 4, label: 'Encarregado (DPO) Nomeado', status: 'done' }
            ]
        },
        {
            id: 'EUAI',
            title: 'EU AI Act (Europa)',
            progress: 40,
            items: [
                { id: 1, label: 'Classificação de Risco', status: 'done' },
                { id: 2, label: 'Governança de Dados (Art. 10)', status: 'pending' },
                { id: 3, label: 'Documentação Técnica (Annex IV)', status: 'pending' },
                { id: 4, label: 'Registro na Base de Dados da UE', status: 'todo' }
            ]
        },
        {
            id: 'ISO',
            title: 'ISO/IEC 42001 (Global)',
            progress: 20,
            items: [
                { id: 1, label: 'Política de IA (A.5.1)', status: 'done' },
                { id: 2, label: 'Avaliação de Impacto de IA (A.6.2)', status: 'todo' },
                { id: 3, label: 'Ciclo de Vida do Sistema (A.7)', status: 'todo' }
            ]
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-bold font-orbitron text-white">3. Conformidade Legal</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Checklists regulatórios automatizados baseados na jurisdição de operação.
                    </p>
                </div>
                <div className="px-3 py-1 bg-[#00FF94]/10 border border-[#00FF94]/20 rounded-full text-[#00FF94] text-xs font-bold uppercase flex items-center gap-2">
                    <CheckCircle2 size={12} />
                    Status Geral: Em Adequação
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Accordion List */}
                <div className="space-y-4">
                    {sections.map((section) => (
                        <div key={section.id} className="rounded-xl border border-white/10 bg-[#0A0E1A]/40 overflow-hidden">
                            <button
                                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                                className="w-full flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${section.progress === 100 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        <FileText size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-sm font-bold text-white">{section.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${section.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${section.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-400 font-mono">{section.progress}%</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={`text-gray-500 transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}
                                    size={20}
                                />
                            </button>

                            <AnimatePresence>
                                {expandedSection === section.id && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 space-y-2 border-t border-white/5">
                                            {section.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                                                    {item.status === 'done' ? (
                                                        <CheckCircle2 className="text-[#00FF94]" size={18} />
                                                    ) : item.status === 'pending' ? (
                                                        <div className="w-[18px] h-[18px] rounded-full border-2 border-amber-500/50 flex items-center justify-center">
                                                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                                        </div>
                                                    ) : (
                                                        <Circle className="text-gray-600" size={18} />
                                                    )}

                                                    <span className={`text-sm ${item.status === 'done' ? 'text-gray-300 line-through decoration-gray-600' : 'text-white'}`}>
                                                        {item.label}
                                                    </span>

                                                    <button className="ml-auto opacity-0 group-hover:opacity-100 text-xs text-[#00A3FF] hover:underline flex items-center gap-1">
                                                        Detalhes <ExternalLink size={10} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Right Panel: Certification Preview */}
                <div className="relative rounded-2xl border border-white/10 bg-[#0F172A] p-8 flex flex-col items-center justify-center text-center overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A3FF]/5 rounded-full blur-[80px]" />

                    <div className="mb-6 relative">
                        <div className="w-32 h-32 rounded-full border-4 border-[#00A3FF]/30 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-[#00A3FF]/10 flex items-center justify-center">
                                <ShieldCheckIcon />
                            </div>
                        </div>
                        <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                            <span className="bg-[#00A3FF] text-[#0A0E1A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Em Progresso
                            </span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold font-orbitron text-white mb-2">Certificado de Conformidade</h3>
                    <p className="text-sm text-gray-400 mb-6 max-w-xs">
                        Complete os requisitos obrigatórios da LGPD e EU AI Act para emitir o selo de confiança ALGOR.
                    </p>

                    <button className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 font-bold text-sm transition-all cursor-not-allowed">
                        Emitir Certificado (Bloqueado)
                    </button>
                </div>
            </div>
        </div>
    );
}

function ShieldCheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
