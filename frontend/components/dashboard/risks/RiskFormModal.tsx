
"use client";

import React, { useState } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function RiskFormModal({ isOpen, onClose, onSuccess }: RiskFormModalProps) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('algor_token');
            const res = await fetch('http://localhost:8000/api/v1/risks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                onSuccess(); // Recarrega lista
                onClose();   // Fecha modal
                // Reset form (opcional)
                setFormData({ ...formData, description: "", mitigation_plan: "" });
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
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-[#0A1A2F] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050B14]/50">
                            <h2 className="text-xl font-serif text-white flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-[#00A3FF]" />
                                Registrar Novo Risco
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="p-8 overflow-y-auto">
                            <form id="riskForm" onSubmit={handleSubmit} className="space-y-6">
                                {/* Linha 1 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-mono uppercase">Categoria do Risco</label>
                                        <select
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-[#050B14] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00A3FF] outline-none"
                                        >
                                            <option>Viés Algorítmico</option>
                                            <option>Segurança / Cibersesgurança</option>
                                            <option>Performance / Acurácia</option>
                                            <option>Ética / Transparência</option>
                                            <option>Legal / Compliance</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-mono uppercase">Sistema Afetado</label>
                                        <input
                                            required
                                            placeholder="Ex: ChatBot v2"
                                            value={formData.affected_system}
                                            onChange={e => setFormData({ ...formData, affected_system: e.target.value })}
                                            className="w-full bg-[#050B14] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00A3FF] outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Descrição */}
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 font-mono uppercase">Descrição Detalhada do Risco</label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Descreva o evento de risco, causa e consequência..."
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-[#050B14] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00A3FF] outline-none resize-none"
                                    />
                                </div>

                                {/* Avaliação (Sliders ou Selects) */}
                                <div className="grid grid-cols-2 gap-6 p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-mono uppercase flex justify-between">
                                            Probabilidade (1-5)
                                            <span className="text-[#00A3FF] font-bold">{formData.probability}</span>
                                        </label>
                                        <input
                                            type="range" min="1" max="5"
                                            value={formData.probability}
                                            onChange={e => setFormData({ ...formData, probability: parseInt(e.target.value) })}
                                            className="w-full accent-[#00A3FF]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-mono uppercase flex justify-between">
                                            Impacto (1-5)
                                            <span className="text-[#00FF94] font-bold">{formData.impact}</span>
                                        </label>
                                        <input
                                            type="range" min="1" max="5"
                                            value={formData.impact}
                                            onChange={e => setFormData({ ...formData, impact: parseInt(e.target.value) })}
                                            className="w-full accent-[#00FF94]"
                                        />
                                    </div>
                                    <div className="col-span-2 text-center pt-2 border-t border-white/5">
                                        <span className="text-xs text-gray-500 uppercase">Nível de Risco Calculado: </span>
                                        <span className={`text-lg font-bold ${formData.probability * formData.impact >= 15 ? 'text-red-400' : 'text-white'}`}>
                                            {formData.probability * formData.impact}
                                        </span>
                                    </div>
                                </div>

                                {/* Estratégia */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-mono uppercase">Estratégia de Tratamento</label>
                                        <select
                                            value={formData.strategy}
                                            onChange={e => setFormData({ ...formData, strategy: e.target.value })}
                                            className="w-full bg-[#050B14] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00A3FF] outline-none"
                                        >
                                            <option>Mitigar</option>
                                            <option>Aceitar</option>
                                            <option>Transferir</option>
                                            <option>Evitar</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-mono uppercase">Plano de Mitigação</label>
                                        <input
                                            placeholder="Ação corretiva imediata..."
                                            value={formData.mitigation_plan}
                                            onChange={e => setFormData({ ...formData, mitigation_plan: e.target.value })}
                                            className="w-full bg-[#050B14] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00A3FF] outline-none"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-white/10 bg-[#050B14]/50 flex justify-end gap-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 text-gray-400 hover:text-white font-medium text-sm transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                form="riskForm"
                                disabled={isLoading}
                                className="px-8 py-3 bg-[#00A3FF] hover:bg-[#0082CC] text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-[#00A3FF]/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Salvar Risco
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
