"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, ShieldAlert, Activity, Plus } from "lucide-react";

export default function RisksPage() {
    const [risks, setRisks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRisks = async () => {
            const token = localStorage.getItem("algor_token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("/api/v1/risks/", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const json = await res.json();
                    setRisks(json);
                }
            } catch (error) {
                console.error("Failed to fetch risks", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRisks();
    }, []);

    // Helper for Level Text
    const getLevelText = (score: number) => {
        if (score >= 15) return "Critical";
        if (score >= 9) return "High";
        if (score >= 4) return "Medium";
        return "Low";
    }

    return (
        <div className="p-8 w-full min-h-screen space-y-10 relative text-white font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2 tracking-tight">
                        Gestão de Riscos
                    </h1>
                    <p className="text-gray-300 font-light text-lg">
                        Monitoramento ativo de vulnerabilidades e compliance.
                    </p>
                </div>

                <button className="flex items-center gap-3 px-6 py-3 rounded-lg bg-[#00FF94] hover:bg-[#00FF94]/90 text-[#0A1A2F] font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(0,255,148,0.2)]">
                    <Plus className="w-4 h-4" />
                    REPORTAR RISCO
                </button>
            </div>

            {/* Risk Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {loading && <div className="text-gray-500">Scanning Matrix...</div>}

                {!loading && risks.length === 0 && (
                    <div className="col-span-4 glass-panel p-8 text-center text-gray-500">
                        Nenhum risco detectado na varredura atual.
                    </div>
                )}

                {risks.map((risk) => (
                    <RiskCard
                        key={risk.id}
                        title={risk.category || "General Risk"}
                        level={getLevelText(risk.risk_level)}
                        score={risk.risk_level * 4} // Scale to 100 roughly
                        delta="New"
                        icon={<AlertTriangle className={`w-5 h-5 ${getLevelText(risk.risk_level) === 'Critical' ? 'text-red-500' : 'text-amber-500'}`} />}
                    />
                ))}

                {/* Mock Examples only if empty for visual check */}
                {risks.length === 0 && !loading && (
                    <>
                        <RiskCard
                            title="Exemplo: Viés Algorítmico"
                            level="Critical"
                            score={92}
                            delta="+4%"
                            icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
                        />
                        <RiskCard
                            title="Exemplo: Vazamento PII"
                            level="High"
                            score={78}
                            delta="-2%"
                            icon={<ShieldAlert className="w-5 h-5 text-amber-500" />}
                        />
                    </>
                )}

            </div>

            {/* Detailed Risk Table Placeholder (Glass Style) */}
            <div className="mt-8 glass-panel rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Activity className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Matriz de Risco Detalhada</h3>
                <p className="text-gray-400 font-light max-w-md">
                    Os dados detalhados estão sendo processados pela engine de conformidade. Disponível em breve.
                </p>
            </div>
        </div>
    );
}

function RiskCard({ title, level, score, delta, icon }: any) {
    const isCritical = level === 'Critical';
    const isHigh = level === 'High';

    const accentColor = isCritical ? 'text-red-400' : isHigh ? 'text-amber-400' : 'text-gray-300';
    const bgHighlight = isCritical ? 'bg-red-500/5 border-red-500/20' : 'glass-panel';

    return (
        <div className={`p-6 rounded-2xl flex flex-col justify-between h-[200px] transition-all duration-300 group hover:border-white/20 ${bgHighlight} ${!isCritical ? 'glass-panel' : 'border border-red-500/20'}`}>
            <div className="flex justify-between items-start">
                <h3 className="text-base font-serif font-medium text-white">{title}</h3>
                <div className={`p-2 rounded-lg bg-white/5 border border-white/5`}>{icon}</div>
            </div>

            <div>
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-sans font-bold text-white tracking-tighter">{score}</span>
                    <span className="text-sm text-gray-500">Rank</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                    <span className={`px-2 py-0.5 rounded bg-white/5 ${accentColor} border border-white/5`}>{level}</span>
                    <span className={'text-gray-500'}>{delta}</span>
                </div>
            </div>
        </div>
    );
}
