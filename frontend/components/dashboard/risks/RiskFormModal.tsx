
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any; // If present, it's an edit
}

export default function RiskFormModal({ isOpen, onClose, onSuccess, initialData }: RiskFormModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        category: "Viés Algorítmico",
        description: "",
        affected_system: "",
        probability: 3,
        impact: 3,
        strategy: "Mitigar",
        mitigation_plan: ""
    });

    // Populate form on open if initialData exists
    useEffect(() => {
        if (isOpen && initialData) {
            setFormData({
                category: initialData.category,
                description: initialData.description,
                affected_system: initialData.affected_system,
                probability: initialData.probability,
                impact: initialData.impact,
                strategy: initialData.strategy,
                mitigation_plan: initialData.mitigation_plan || ""
            });
        } else if (isOpen && !initialData) {
            // Reset if opening in create mode
            setFormData({
                category: "Viés Algorítmico",
                description: "",
                affected_system: "",
                probability: 3,
                impact: 3,
                strategy: "Mitigar",
                mitigation_plan: ""
            });
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('algor_token');
            const url = initialData
                ? `/api/v1/risks/${initialData.id}`
                : '/api/v1/risks/';

            const method = initialData ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                alert("Erro ao salvar risco.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#000000]/60 backdrop-blur-sm"
                    />

                    {/* Modal Content - M3 Surface Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-[#1E1F20] rounded-[28px] overflow-hidden w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-[#444746] flex justify-between items-center bg-[#1E1F20]">
                            <h2 className="text-xl font-normal text-[#E3E3E3] flex items-center gap-2">
                                <span className="material-symbols-rounded text-[#A8C7FA] text-2xl">
                                    {initialData ? 'edit_square' : 'warning'}
                                </span>
                                {initialData ? 'Editar Risco' : 'Registrar Novo Risco'}
                            </h2>
                            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-[#444746] flex items-center justify-center text-[#C4C7C5] transition-colors">
                                <span className="material-symbols-rounded">close</span>
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <form id="riskForm" onSubmit={handleSubmit} className="space-y-6">
                                {/* Linha 1 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-[#C4C7C5] font-medium ml-1">Categoria</label>
                                        <div className="relative">
                                            <select
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full h-14 bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none appearance-none"
                                            >
                                                <option>Viés Algorítmico</option>
                                                <option>Segurança / Cibersesgurança</option>
                                                <option>Performance / Acurácia</option>
                                                <option>Ética / Transparência</option>
                                                <option>Legal / Compliance</option>
                                            </select>
                                            <span className="material-symbols-rounded absolute right-4 top-4 text-[#C4C7C5] pointer-events-none">arrow_drop_down</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-[#C4C7C5] font-medium ml-1">Sistema Afetado</label>
                                        <input
                                            required
                                            placeholder="Ex: ChatBot v2"
                                            value={formData.affected_system}
                                            onChange={e => setFormData({ ...formData, affected_system: e.target.value })}
                                            className="w-full h-14 bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none placeholder-[#8E918F]"
                                        />
                                    </div>
                                </div>

                                {/* Descrição */}
                                <div className="space-y-2">
                                    <label className="text-xs text-[#C4C7C5] font-medium ml-1">Descrição Detalhada</label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Descreva o evento de risco, causa e consequência..."
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 py-3 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none resize-none placeholder-[#8E918F]"
                                    />
                                </div>

                                {/* Avaliação Cards */}
                                <div className="p-6 rounded-[16px] bg-[#28292A] border border-[#444746] space-y-6">
                                    <h3 className="text-sm font-medium text-[#E3E3E3] mb-4">Avaliação de Severidade</h3>

                                    <div className="space-y-4">
                                        <label className="text-xs text-[#C4C7C5] flex justify-between">
                                            <span>
                                                Probabilidade: <strong className="text-[#A8C7FA]">{formData.probability}</strong>
                                            </span>
                                        </label>
                                        <input
                                            type="range" min="1" max="5"
                                            value={formData.probability}
                                            onChange={e => setFormData({ ...formData, probability: parseInt(e.target.value) })}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#444746] accent-[#A8C7FA]"
                                        />
                                        <div className="flex justify-between text-[10px] text-[#8E918F]">
                                            <span>Muito Baixa</span>
                                            <span>Muito Alta</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs text-[#C4C7C5] flex justify-between">
                                            <span>
                                                Impacto: <strong className="text-[#FFB4AB]">{formData.impact}</strong>
                                            </span>
                                        </label>
                                        <input
                                            type="range" min="1" max="5"
                                            value={formData.impact}
                                            onChange={e => setFormData({ ...formData, impact: parseInt(e.target.value) })}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#444746] accent-[#FFB4AB]"
                                        />
                                        <div className="flex justify-between text-[10px] text-[#8E918F]">
                                            <span>Insignificante</span>
                                            <span>Catastrófico</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-[#444746] flex items-center justify-between">
                                        <span className="text-xs text-[#C4C7C5]">Risco Calculado (PxI)</span>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xl font-bold ${formData.probability * formData.impact >= 15 ? 'text-[#FFB4AB]' : 'text-[#E3E3E3]'}`}>
                                                {formData.probability * formData.impact}
                                            </span>
                                            {formData.probability * formData.impact >= 15 && (
                                                <span className="px-2 py-0.5 rounded bg-[#93000A] text-[#FFDAD6] text-[10px] uppercase font-bold">Crítico</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Estratégia */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-[#C4C7C5] font-medium ml-1">Estratégia</label>
                                        <div className="relative">
                                            <select
                                                value={formData.strategy}
                                                onChange={e => setFormData({ ...formData, strategy: e.target.value })}
                                                className="w-full h-14 bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none appearance-none"
                                            >
                                                <option>Mitigar</option>
                                                <option>Aceitar</option>
                                                <option>Transferir</option>
                                                <option>Evitar</option>
                                            </select>
                                            <span className="material-symbols-rounded absolute right-4 top-4 text-[#C4C7C5] pointer-events-none">arrow_drop_down</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-[#C4C7C5] font-medium ml-1">Plano de Mitigação</label>
                                        <input
                                            placeholder="Ação corretiva..."
                                            value={formData.mitigation_plan}
                                            onChange={e => setFormData({ ...formData, mitigation_plan: e.target.value })}
                                            className="w-full h-14 bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none placeholder-[#8E918F]"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-[#444746] bg-[#1E1F20] flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="h-10 px-6 rounded-full text-[#A8C7FA] hover:bg-[#444746]/50 font-medium text-sm transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                form="riskForm"
                                disabled={isLoading}
                                className="h-10 px-6 bg-[#A8C7FA] hover:bg-[#D3E3FD] text-[#062E6F] rounded-full font-medium text-sm shadow-sm flex items-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <span className="material-symbols-rounded animate-spin">progress_activity</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-rounded text-lg">save</span>
                                        {initialData ? 'Salvar Alterações' : 'Salvar Risco'}
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
