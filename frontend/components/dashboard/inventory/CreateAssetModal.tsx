'use client';

import { useState } from "react";
import { X, Save, Server, Database, Cpu, Loader2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateAssetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAssetCreated: () => void;
}

export default function CreateAssetModal({ isOpen, onClose, onAssetCreated }: CreateAssetModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "Model",
        description: "",
        risk_level: "Low",
        department: "Engenharia"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem("algor_token");

        try {
            const res = await fetch("/api/v1/inventory/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                onAssetCreated();
                onClose();
                // Reset form
                setFormData({ name: "", type: "Model", description: "", risk_level: "Low", department: "Engenharia" });
            } else {
                alert("Erro ao criar ativo. Verifique os dados.");
            }
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with stronger blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#000]/80 backdrop-blur-xl z-40 transition-all"
                    />

                    {/* Modal Content - PREMIUM UPGRADE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="fixed inset-0 m-auto z-50 w-full max-w-lg h-fit rounded-[24px] overflow-hidden shadow-2xl"
                    >
                        {/* 1. Gradient Border Container */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF]/50 via-[#00FF94]/30 to-transparent p-[1px] rounded-[24px] pointer-events-none" />

                        {/* 2. Main Content Background (Glass) */}
                        <div className="bg-[#0A0E1A]/95 backdrop-blur-2xl h-full w-full rounded-[24px] relative z-10">

                            {/* Decorative Top Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A3FF]/10 blur-[80px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00FF94]/5 blur-[80px] pointer-events-none" />

                            {/* Header */}
                            <div className="px-8 py-8 border-b border-white/5 flex justify-between items-center relative z-20">
                                <div>
                                    <h2 className="text-2xl font-orbitron font-bold text-white flex items-center gap-3 tracking-wide">
                                        <div className="p-2 rounded-xl bg-[#00FF94]/10 border border-[#00FF94]/20 shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                                            <Database className="w-5 h-5 text-[#00FF94]" />
                                        </div>
                                        Registrar Ativo
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-2 ml-1 font-light tracking-wide">Adicione um novo recurso ao inventário corporativo.</p>
                                </div>
                                <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors bg-white/5 p-2 rounded-lg hover:bg-white/10 hover:rotate-90 duration-300">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-8 space-y-6 relative z-20">

                                {/* Nome */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-[#00FF94] uppercase tracking-widest flex items-center gap-1">
                                        Nome do Ativo <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ex: Motor de Recomendação V2"
                                        className="w-full bg-[#0A1A2F]/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF94] focus:ring-1 focus:ring-[#00FF94]/50 focus:bg-[#0A1A2F] transition-all font-medium text-sm shadow-inner"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    {/* Tipo */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categoria</label>
                                        <div className="relative group">
                                            <select
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full bg-[#0A1A2F]/50 border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:border-[#00A3FF] focus:bg-[#0A1A2F] transition-all cursor-pointer hover:border-white/20 text-sm font-medium"
                                            >
                                                <option value="Model" className="bg-[#0A0E1A]">Modelo IA</option>
                                                <option value="Dataset" className="bg-[#0A0E1A]">Dataset</option>
                                                <option value="System" className="bg-[#0A0E1A]">Sistema</option>
                                            </select>
                                            <Server className="absolute right-4 top-4 w-4 h-4 text-gray-500 pointer-events-none group-hover:text-[#00A3FF] transition-colors" />
                                        </div>
                                    </div>

                                    {/* Risco */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Risco Estimado</label>
                                        <div className="relative group">
                                            <select
                                                value={formData.risk_level}
                                                onChange={(e) => setFormData({ ...formData, risk_level: e.target.value })}
                                                className="w-full bg-[#0A1A2F]/50 border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:border-amber-500 focus:bg-[#0A1A2F] transition-all cursor-pointer hover:border-white/20 text-sm font-medium"
                                            >
                                                <option value="Low" className="bg-[#0A0E1A]">Baixo (Low)</option>
                                                <option value="Medium" className="bg-[#0A0E1A]">Médio (Medium)</option>
                                                <option value="High" className="bg-[#0A0E1A]">Alto (High)</option>
                                                <option value="Critical" className="bg-[#0A0E1A]">Crítico</option>
                                            </select>
                                            <AlertTriangle className="absolute right-4 top-4 w-4 h-4 text-gray-500 pointer-events-none group-hover:text-amber-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* Departamento */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Departamento Owner</label>
                                    <input
                                        type="text"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full bg-[#0A1A2F]/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00FF94] focus:bg-[#0A1A2F] transition-all shadow-inner text-sm font-medium"
                                    />
                                </div>

                                {/* Footer Actions */}
                                <div className="pt-8 flex justify-end gap-3 border-t border-white/5 mt-8">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="relative overflow-hidden px-8 py-3 rounded-xl bg-[#00A3FF] text-[#0A1A2F] font-bold text-xs uppercase tracking-widest hover:bg-[#0082CC] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,163,255,0.4)] group"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin relative z-10" /> : <Save className="w-4 h-4 relative z-10" />}
                                        <span className="relative z-10">{isLoading ? "Salvando..." : "Confirmar Registro"}</span>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
