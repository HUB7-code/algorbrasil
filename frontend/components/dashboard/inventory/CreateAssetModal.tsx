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
                        className="fixed inset-0 bg-[#000]/80 backdrop-blur-md z-40 transition-all"
                    />

                    {/* Modal Content - PREMIUM UPGRADE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="fixed inset-0 m-auto z-50 w-full max-w-lg h-fit rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* 1. Gradient Border Container */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF94]/50 via-[#00A3FF]/30 to-transparent p-[1px] rounded-2xl pointer-events-none" />

                        {/* 2. Main Content Background (Glass) */}
                        <div className="bg-[#0A1A2F]/95 backdrop-blur-xl h-full w-full rounded-2xl relative z-10">

                            {/* Decorative Top Glow */}
                            <div className="absolute top-0 left-0 right-0 h-32 bg-[#00FF94]/10 blur-[60px] pointer-events-none" />

                            {/* Header */}
                            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center relative z-20">
                                <div>
                                    <h2 className="text-2xl font-serif text-white flex items-center gap-3 tracking-tight">
                                        <div className="p-2 rounded-lg bg-[#00FF94]/10 border border-[#00FF94]/20 shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                                            <Database className="w-5 h-5 text-[#00FF94]" />
                                        </div>
                                        Registrar Ativo
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-1 ml-1">Adicione um novo recurso ao inventário.</p>
                                </div>
                                <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors bg-white/5 p-2 rounded-lg hover:bg-white/10">
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
                                        className="w-full bg-[#050810]/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF94] focus:ring-1 focus:ring-[#00FF94]/50 focus:bg-[#050810]/80 transition-all font-medium shadow-inner"
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
                                                className="w-full bg-[#050810]/50 border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:border-[#00A3FF] focus:bg-[#050810]/80 transition-all cursor-pointer hover:border-white/20"
                                            >
                                                <option value="Model" className="bg-[#050810]">Modelo IA</option>
                                                <option value="Dataset" className="bg-[#050810]">Dataset</option>
                                                <option value="System" className="bg-[#050810]">Sistema</option>
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
                                                className="w-full bg-[#050810]/50 border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:border-amber-500 focus:bg-[#050810]/80 transition-all cursor-pointer hover:border-white/20"
                                            >
                                                <option value="Low" className="bg-[#050810]">Baixo (Low)</option>
                                                <option value="Medium" className="bg-[#050810]">Médio (Medium)</option>
                                                <option value="High" className="bg-[#050810]">Alto (High)</option>
                                                <option value="Critical" className="bg-[#050810]">Crítico</option>
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
                                        className="w-full bg-[#050810]/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00FF94] focus:bg-[#050810]/80 transition-all shadow-inner"
                                    />
                                </div>

                                {/* Footer Actions */}
                                <div className="pt-6 flex justify-end gap-3 border-t border-white/5 mt-8">
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
                                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#00FF94] text-[#0A1A2F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:scale-[1.02] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ backgroundSize: '200% auto' }}
                                    >
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        {isLoading ? "Salvando..." : "Confirmar Registro"}
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
