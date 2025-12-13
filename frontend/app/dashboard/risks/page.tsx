
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RiskFormModal from '@/components/dashboard/risks/RiskFormModal';

// Mocked Data
const MOCK_RISKS = [
    { id: 1, category: "Segurança de Dados", description: "Vazamento de PII em output de LLM", affected_system: "Chatbot RH", probability: 4, impact: 5, risk_level: 20, strategy: "Mitigar", status: "Aberto", mitigation_plan: "Implementar regex filter" },
    { id: 2, category: "Viés Algorítmico", description: "Disparidade de gênero em triagem", affected_system: "Recrutamento AI", probability: 3, impact: 4, risk_level: 12, strategy: "Monitorar", status: "Em Análise", mitigation_plan: "Revisar dataset" },
];

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
    const [risks, setRisks] = useState<Risk[]>(MOCK_RISKS);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRisk, setEditingRisk] = useState<Risk | null>(null);

    const fetchRisks = async () => {
        try {
            const token = localStorage.getItem('algor_token');
            if (token) {
                const res = await fetch('/api/v1/risks/', { headers: { 'Authorization': `Bearer ${token}` } });
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) setRisks(data);
                }
            }
        } catch (e) { console.error(e) } finally { setLoading(false) }
    }

    useEffect(() => {
        fetchRisks();
    }, []);

    const openEditModal = (risk: Risk) => {
        setEditingRisk(risk);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingRisk(null);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        fetchRisks();
        setIsModalOpen(false);
    };

    const handleDelete = async (riskId: number) => {
        if (!confirm("Tem certeza que deseja excluir este risco? Esta ação não pode ser desfeita.")) return;

        try {
            const token = localStorage.getItem('algor_token');
            const res = await fetch(`/api/v1/risks/${riskId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setRisks(risks.filter(r => r.id !== riskId));
            } else {
                alert("Erro ao excluir risco.");
            }
        } catch (e) {
            console.error(e);
            alert("Erro de conexão.");
        }
    };

    // KPIs
    const totalRisks = risks.length;
    const criticalRisks = risks.filter(r => r.risk_level >= 15).length;
    const mitigatedRisks = risks.filter(r => r.status === 'Mitigado').length;

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <RiskFormModal
                isOpen={isModalOpen}
                initialData={editingRisk}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
            />

            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-white/5">
                <div>
                    <h1 className="text-3xl font-display font-medium text-white tracking-tight">Gestão de Riscos</h1>
                    <p className="text-gray-400 mt-1 font-light font-mono text-sm">Matriz de incidentes e vulnerabilidades ISO 42001</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="h-11 px-6 rounded-xl bg-gradient-to-r from-red-500/80 to-red-600/80 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] shadow-lg flex items-center gap-2 transition-all hover:scale-105 border border-red-400/20"
                >
                    <span className="material-symbols-rounded text-xl">warning</span>
                    Registrar Incidente
                </button>
            </div>

            {/* Stats Cards (Elite Glass) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EliteStatCard
                    label="Total de Riscos"
                    value={totalRisks}
                    icon="shield"
                    trend="Estável"
                />
                <EliteStatCard
                    label="Críticos"
                    value={criticalRisks}
                    icon="gpp_maybe"
                    colorClass="text-red-400"
                    subtext="Ação Imediata Requerida"
                    isCritical
                />
                <EliteStatCard
                    label="Mitigados"
                    value={mitigatedRisks}
                    icon="verified_user"
                    colorClass="text-brand-green"
                    subtext="Controles Efetivos"
                />
            </div>

            {/* Risk List (Glass Panel) */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 relative">
                {/* Toolbar */}
                <div className="p-6 border-b border-white/5 flex gap-4 bg-white/5 backdrop-blur-md">
                    <div className="flex-1 bg-black/20 h-12 rounded-xl flex items-center px-4 border border-white/5 focus-within:border-brand-blue/50 transition-colors group">
                        <span className="material-symbols-rounded text-gray-500 group-focus-within:text-brand-blue transition-colors">search</span>
                        <input
                            type="text"
                            placeholder="Buscar incidentes, sistemas ou severidade..."
                            className="bg-transparent border-none outline-none text-gray-200 text-sm ml-3 w-full placeholder-gray-600 font-mono"
                        />
                    </div>
                    {/* Filter Button */}
                    <button className="h-12 w-12 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <span className="material-symbols-rounded">filter_list</span>
                    </button>
                </div>

                {/* List Content */}
                <div className="divide-y divide-white/5">
                    {risks.map((risk) => (
                        <div key={risk.id} className="group p-6 hover:bg-white/5 transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden">
                            {/* Hover Glow */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Icon / Leading */}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg ${risk.risk_level >= 15 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-gray-800/50 text-gray-400 border border-white/5'}`}>
                                <span className="material-symbols-rounded">
                                    {risk.risk_level >= 15 ? 'priority_high' : 'policy'}
                                </span>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-base font-medium text-gray-200 truncate group-hover:text-white transition-colors">{risk.description}</h4>
                                    {risk.risk_level >= 15 && (
                                        <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(239,68,68,0.2)]">Crítico</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 flex items-center gap-2 font-mono">
                                    <span className="text-brand-blue">{risk.category}</span>
                                    <span className="text-gray-700">|</span>
                                    <span>{risk.affected_system}</span>
                                </p>
                            </div>

                            {/* Meta / Trailing */}
                            <div className="flex items-center gap-8 text-sm text-gray-400 mt-2 md:mt-0">
                                <div className="text-center min-w-[80px]">
                                    <span className="block text-[10px] text-gray-600 uppercase tracking-wider font-bold mb-1">Severidade</span>
                                    <span className={`font-display text-lg ${risk.risk_level >= 15 ? 'text-red-400' : 'text-white'}`}>{risk.risk_level}</span>
                                </div>
                                <div className="min-w-[120px] text-center">
                                    <span className={`px-4 py-1.5 rounded-lg text-xs font-bold border backdrop-blur-md uppercase tracking-wider ${risk.status === 'Mitigado' ? 'border-brand-green/30 text-brand-green bg-brand-green/10' : 'border-gray-600/30 text-gray-400 bg-gray-800/30'}`}>
                                        {risk.status}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                    <button
                                        onClick={() => openEditModal(risk)}
                                        className="h-9 w-9 rounded-lg hover:bg-brand-blue/20 hover:text-brand-blue flex items-center justify-center transition-colors text-gray-500 border border-transparent hover:border-brand-blue/30"
                                        title="Editar"
                                    >
                                        <span className="material-symbols-rounded text-lg">edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(risk.id)}
                                        className="h-9 w-9 rounded-lg hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-colors text-gray-500 border border-transparent hover:border-red-500/30"
                                        title="Excluir"
                                    >
                                        <span className="material-symbols-rounded text-lg">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {risks.length === 0 && (
                        <div className="p-16 text-center text-gray-600 font-light flex flex-col items-center">
                            <span className="material-symbols-rounded text-4xl mb-4 opacity-20">verified_user</span>
                            Nenhum risco detectado no perímetro.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function EliteStatCard({ label, value, icon, colorClass = "text-brand-blue", trend, subtext, isCritical }: any) {
    return (
        <div className={`glass-panel rounded-3xl p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group border transition-all duration-300 hover:-translate-y-1 ${isCritical ? 'border-red-500/20 bg-red-900/5' : 'border-white/5'}`}>
            {isCritical && <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 animate-pulse-slow" />}

            <div className="flex justify-between items-start z-10">
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">{label}</p>
                    <h3 className="text-5xl font-display font-medium text-white tracking-tight">{value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                    <span className="material-symbols-rounded text-2xl">{icon}</span>
                </div>
            </div>
            {(trend || subtext) && (
                <div className="mt-auto z-10">
                    {trend && <div className="text-xs text-brand-green flex items-center gap-1 font-mono"><span className="material-symbols-rounded text-sm">trending_up</span> {trend}</div>}
                    {subtext && <div className={`text-xs flex items-center gap-1 font-medium ${isCritical ? 'text-red-300' : 'text-brand-amber'}`}>
                        {isCritical && <span className="material-symbols-rounded text-sm">error</span>}
                        {subtext}
                    </div>}
                </div>
            )}
        </div>
    )
}

