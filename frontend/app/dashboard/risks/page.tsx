
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RiskFormModal from '@/components/dashboard/risks/RiskFormModal';

// Mocked Data for Preview if API fails or empty
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
        fetchRisks(); // Reload data from API to be sure
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
                // Optimistic UI update or fetch again
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
        <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <RiskFormModal
                isOpen={isModalOpen}
                initialData={editingRisk}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
            />

            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[24px] md:text-[32px] font-normal text-[#E3E3E3]">Gestão de Riscos</h1>
                    <p className="text-sm text-[#C4C7C5]">Matriz de riscos e incidentes de IA</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="h-10 px-6 rounded-full bg-[#A8C7FA] text-[#062E6F] text-sm font-medium hover:bg-[#D3E3FD] shadow-sm flex items-center gap-2 transition-colors"
                >
                    <span className="material-symbols-rounded text-lg">add_circle</span>
                    Registrar Risco
                </button>
            </div>

            {/* Stats Cards (M3 Elevated) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <M3StatCard
                    label="Total de Riscos"
                    value={totalRisks}
                    icon="shield"
                    trend="Estável"
                />
                <M3StatCard
                    label="Críticos"
                    value={criticalRisks}
                    icon="warning"
                    colorClass="text-[#FFB4AB]"
                    subtext="Ação Imediata"
                />
                <M3StatCard
                    label="Mitigados"
                    value={mitigatedRisks}
                    icon="check_circle"
                    colorClass="text-[#6DD58C]"
                    subtext="Controles Efetivos"
                />
            </div>

            {/* Risk List (M3 List) */}
            <div className="rounded-[24px] bg-[#1E1F20] border border-[#444746] overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-[#444746] flex gap-3">
                    <div className="flex-1 bg-[#28292A] h-10 rounded-full flex items-center px-4 border border-[#444746] focus-within:border-[#A8C7FA] transition-colors">
                        <span className="material-symbols-rounded text-[#C4C7C5]">search</span>
                        <input
                            type="text"
                            placeholder="Buscar incidentes ou sistemas..."
                            className="bg-transparent border-none outline-none text-[#E3E3E3] text-sm ml-2 w-full placeholder-[#8E918F]"
                        />
                    </div>
                </div>

                {/* List Content */}
                <div>
                    {risks.map((risk) => (
                        <div key={risk.id} className="group p-4 border-b border-[#444746] hover:bg-[#444746]/30 transition-colors flex flex-col md:flex-row md:items-center gap-4">
                            {/* Icon / Leading */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${risk.risk_level >= 15 ? 'bg-[#93000A] text-[#FFDAD6]' : 'bg-[#3E4042] text-[#C4C7C5]'}`}>
                                <span className="material-symbols-rounded">
                                    {risk.risk_level >= 15 ? 'priority_high' : 'policy'}
                                </span>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-medium text-[#E3E3E3] truncate">{risk.description}</h4>
                                    {risk.risk_level >= 15 && (
                                        <span className="px-2 py-0.5 rounded-full bg-[#93000A] text-[#FFDAD6] text-[10px] font-bold uppercase">Crítico</span>
                                    )}
                                </div>
                                <p className="text-xs text-[#C4C7C5] flex items-center gap-2">
                                    <span>{risk.category}</span>
                                    <span className="text-[#8E918F]">•</span>
                                    <span>{risk.affected_system}</span>
                                </p>
                            </div>

                            {/* Meta / Trailing */}
                            <div className="flex items-center gap-6 text-sm text-[#C4C7C5] mt-2 md:mt-0">
                                <div className="text-center min-w-[60px]">
                                    <span className="block text-[10px] text-[#8E918F] uppercase">Nível</span>
                                    <span className="font-bold">{risk.risk_level}</span>
                                </div>
                                <div className="min-w-[100px] text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs border ${risk.status === 'Mitigado' ? 'border-[#6DD58C]/30 text-[#6DD58C]' : 'border-[#C4C7C5]/30 text-[#C4C7C5]'}`}>
                                        {risk.status}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openEditModal(risk)}
                                        className="h-8 w-8 rounded-full hover:bg-[#A8C7FA]/10 hover:text-[#A8C7FA] flex items-center justify-center transition-colors text-[#C4C7C5]"
                                        title="Editar"
                                    >
                                        <span className="material-symbols-rounded text-lg">edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(risk.id)}
                                        className="h-8 w-8 rounded-full hover:bg-[#FFB4AB]/10 hover:text-[#FFB4AB] flex items-center justify-center transition-colors text-[#C4C7C5]"
                                        title="Excluir"
                                    >
                                        <span className="material-symbols-rounded text-lg">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {risks.length === 0 && (
                        <div className="p-12 text-center text-[#8E918F]">
                            Nenhum risco encontrado.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function M3StatCard({ label, value, icon, colorClass = "text-[#A8C7FA]", trend, subtext }: any) {
    return (
        <div className="rounded-[24px] bg-[#1E1F20] border border-[#444746] p-6 flex flex-col justify-between h-[140px] relative overflow-hidden group">
            <div className="flex justify-between items-start z-10">
                <div>
                    <p className="text-sm text-[#C4C7C5] font-medium mb-1">{label}</p>
                    <h3 className="text-4xl font-normal text-[#E3E3E3]">{value}</h3>
                </div>
                <div className={`w-10 h-10 rounded-full bg-[#1e1f20] border border-[#444746] flex items-center justify-center ${colorClass}`}>
                    <span className="material-symbols-rounded">{icon}</span>
                </div>
            </div>
            {(trend || subtext) && (
                <div className="mt-auto z-10">
                    {trend && <div className="text-xs text-[#6DD58C] flex items-center gap-1"><span className="material-symbols-rounded text-sm">trending_up</span> {trend}</div>}
                    {subtext && <div className="text-xs text-[#FABD00] flex items-center gap-1">{subtext}</div>}
                </div>
            )}
        </div>
    )
}

