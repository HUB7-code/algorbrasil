"use client"

import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, ChevronRight, X } from 'lucide-react';

interface XAIWidgetProps {
    verdict?: "ALLOWED" | "FLAGGED" | "BLOCKED";
    privacyLevel?: "HIGH" | "MEDIUM" | "LOW";
    traceId?: string;
}

/**
 * XAI (Explainable AI) Transparency Widget
 * Este componente serve como "Selo de Confiança" para o usuário final.
 * Ele demonstra que a interação com a IA está sendo auditada pela ALGOR.
 */
export const XAIWidget: React.FC<XAIWidgetProps> = ({
    verdict = "ALLOWED",
    privacyLevel = "HIGH",
    traceId = "TRACE-DEMO-123"
}) => {
    const [expanded, setExpanded] = useState(false);

    // Cores dinâmicas baseadas no status
    const statusColors = {
        ALLOWED: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        FLAGGED: "text-amber-400 bg-amber-400/10 border-amber-400/20",
        BLOCKED: "text-red-400 bg-red-400/10 border-red-400/20",
    };

    const currentStyle = statusColors[verdict];

    return (
        <div className="fixed bottom-4 right-4 z-50 font-sans">
            {/* Estado Colapsado (Badge) */}
            {!expanded && (
                <button
                    onClick={() => setExpanded(true)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md border shadow-lg transition-all hover:scale-105 ${currentStyle} bg-slate-900/90`}
                >
                    <ShieldCheck size={16} />
                    <span className="text-xs font-semibold tracking-wider">AI AUDITED</span>
                </button>
            )}

            {/* Estado Expandido (Detalhes) */}
            {expanded && (
                <div className="w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

                    {/* Header */}
                    <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-gradient-to-r from-slate-800 to-slate-900">
                        <div className="flex items-center gap-2 text-emerald-400">
                            <ShieldCheck size={18} />
                            <span className="text-sm font-bold tracking-wide">ALGOR GOVERNANCE</span>
                        </div>
                        <button onClick={() => setExpanded(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-4 space-y-4">

                        {/* Veredito */}
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Status da Interação</p>
                            <div className={`flex items-center gap-2 p-2 rounded-lg border ${currentStyle}`}>
                                {verdict === "ALLOWED" ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
                                <span className="text-sm font-bold">{verdict === "ALLOWED" ? "APROVADO E SEGURO" : "RISCO DETECTADO"}</span>
                            </div>
                        </div>

                        {/* Métricas de Privacidade */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                                    <Lock size={12} />
                                    <span className="text-[10px] font-bold uppercase">Privacidade</span>
                                </div>
                                <span className="text-white text-sm font-mono">{privacyLevel}</span>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                                    <ShieldCheck size={12} />
                                    <span className="text-[10px] font-bold uppercase">ISO 42001</span>
                                </div>
                                <span className="text-white text-sm font-mono">CERTIFIED</span>
                            </div>
                        </div>

                        {/* Trace ID */}
                        <div className="bg-black/40 p-2 rounded border border-slate-800 flex justify-between items-center group cursor-pointer hover:border-slate-600 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-slate-500 uppercase">Audit Trace ID</span>
                                <span className="text-[10px] text-slate-300 font-mono tracking-tighter">{traceId}</span>
                            </div>
                            <ChevronRight size={14} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-2 bg-black/60 text-center border-t border-slate-800">
                        <p className="text-[9px] text-slate-500">
                            Esta interação foi auditada e registrada na blockchain ALGOR para fins de conformidade legal.
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
};
