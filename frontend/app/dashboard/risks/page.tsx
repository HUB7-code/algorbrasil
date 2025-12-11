
"use client";

import React, { useEffect, useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Plus, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import RiskFormModal from '@/components/dashboard/risks/RiskFormModal';

// Types (Espelhando o Backend)
interface Risk {
    id: number;
    category: string;
    description: string;
    affected_system: string;
    probability: number;
    impact: number;
    risk_level: number;
    strategy: string;
    status: string;
    mitigation_plan: string;
}

export default function RiskDashboardPage() {
    const [risks, setRisks] = useState<Risk[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchRisks();
    }, []);

    const fetchRisks = async () => {
        try {
            const token = localStorage.getItem('algor_token');
            if (!token) return;

            const res = await fetch('http://localhost:8000/api/v1/risks/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setRisks(data);
            }
        } catch (error) {
            console.error("Erro ao buscar riscos:", error);
        } finally {
            setLoading(false);
        }
    };

    // KPIs
    const totalRisks = risks.length;
    const criticalRisks = risks.filter(r => r.risk_level >= 15).length; // Regra: P*I >= 15 é Crítico/Alto
    const mitigatedRisks = risks.filter(r => r.status === 'Mitigado').length;

    // Helper de Cor de Nível
    const getRiskColor = (level: number) => {
        if (level >= 15) return "text-red-400 border-red-400/30 bg-red-400/10"; // Alto/Extremo
        if (level >= 8) return "text-amber-400 border-amber-400/30 bg-amber-400/10"; // Médio
        return "text-[#00FF94] border-[#00FF94]/30 bg-[#00FF94]/10"; // Baixo
    };

    return (
        <div className="p-8 md:p-12 space-y-10 min-h-screen relative">
            <RiskFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchRisks}
            />

            {/* Header com Ação */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-serif text-white mb-2">Gestão de Riscos ISO 42001</h1>
                    <p className="text-gray-400 font-light">Identifique, avalie e mitigue riscos algorítmicos em conformidade regulatória.</p>
                </div>
                <button
                    className="flex items-center gap-2 px-6 py-3 bg-[#00A3FF] hover:bg-[#0082CC] text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-[#00A3FF]/20 transition-all hover:-translate-y-1 hover:scale-105 active:scale-95"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="w-4 h-4" />
                    Novo Risco
                </button>
            </div>

            {/* Bento Grid KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="p-6 rounded-3xl bg-[#0A1A2F]/60 border border-white/5 backdrop-blur-xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ShieldAlert className="w-16 h-16 text-[#00A3FF]" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-1">Riscos Mapeados</h3>
                        <p className="text-4xl font-serif text-white">{totalRisks}</p>
                    </div>
                </motion.div>

                {/* Críticos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="p-6 rounded-3xl bg-[#0A1A2F]/60 border border-white/5 backdrop-blur-xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertTriangle className="w-16 h-16 text-red-500" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-1 flex items-center gap-2">
                            Atenção Crítica
                            {criticalRisks > 0 && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                        </h3>
                        <p className={`text-4xl font-serif ${criticalRisks > 0 ? "text-red-400" : "text-gray-200"}`}>{criticalRisks}</p>
                    </div>
                </motion.div>

                {/* Mitigados */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="p-6 rounded-3xl bg-[#0A1A2F]/60 border border-white/5 backdrop-blur-xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CheckCircle2 className="w-16 h-16 text-[#00FF94]" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-1">Mitigados</h3>
                        <p className="text-4xl font-serif text-[#00FF94]">{mitigatedRisks}</p>
                    </div>
                </motion.div>
            </div>

            {/* Risk List / Table */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="bg-[#0A1A2F]/60 border border-white/5 rounded-3xl backdrop-blur-md overflow-hidden"
            >
                {/* Filters Mock */}
                <div className="p-6 border-b border-white/5 flex gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar riscos..."
                            className="w-full bg-[#050B14] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00A3FF]"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/5">
                        <Filter className="w-4 h-4" /> Filtros
                    </button>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-gray-500">Carregando matriz de riscos...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-mono uppercase tracking-widest text-gray-400 border-b border-white/5">
                                    <th className="p-6 font-medium">Categoria & Descrição</th>
                                    <th className="p-6 font-medium">Prob.</th>
                                    <th className="p-6 font-medium">Imp.</th>
                                    <th className="p-6 font-medium">Nível (PxI)</th>
                                    <th className="p-6 font-medium">Tratamento</th>
                                    <th className="p-6 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {risks.map((risk) => (
                                    <tr key={risk.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-[#00A3FF] mb-1">{risk.category}</span>
                                                <span className="text-white font-medium">{risk.description}</span>
                                                <span className="text-xs text-gray-500 mt-1">Afeta: {risk.affected_system}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 font-mono text-gray-300">{risk.probability}</td>
                                        <td className="p-6 font-mono text-gray-300">{risk.impact}</td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(risk.risk_level)}`}>
                                                {risk.risk_level}
                                            </span>
                                        </td>
                                        <td className="p-6 text-sm text-gray-300">{risk.strategy}</td>
                                        <td className="p-6">
                                            <span className={`flex items-center gap-2 text-xs font-semibold ${risk.status === 'Mitigado' ? 'text-[#00FF94]' : 'text-gray-400'}`}>
                                                <span className={`w-2 h-2 rounded-full ${risk.status === 'Mitigado' ? 'bg-[#00FF94]' : 'bg-gray-400'}`} />
                                                {risk.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {risks.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-gray-500">
                                            Nenhum risco registrado. Inicie pelo botão "Novo Risco".
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
