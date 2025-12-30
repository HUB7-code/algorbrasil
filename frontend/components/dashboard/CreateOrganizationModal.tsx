"use client";

import React, { useState } from 'react';
import { X, Building2, Plus, Loader2 } from 'lucide-react';
import { useOrganization } from '@/context/OrganizationContext';

interface CreateOrganizationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateOrganizationModal({ isOpen, onClose }: CreateOrganizationModalProps) {
    const { refreshOrganizations } = useOrganization();
    const [name, setName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const token = localStorage.getItem('algor_token');
            const res = await fetch('/api/v1/organizations/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, cnpj })
            });

            if (res.ok) {
                await refreshOrganizations();
                onClose();
                setName("");
                setCnpj("");
            } else {
                const data = await res.json();
                if (res.status === 403) {
                    // Limite atingido - mostra mensagem amigável
                    setError(data.detail || "Limite de organizações atingido. Faça upgrade para criar mais.");
                } else {
                    setError("Falha ao criar organização. Tente novamente.");
                }
            }
        } catch (err) {
            setError("Erro de conexão com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0A1A2F]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white leading-tight">Nova Organização</h2>
                            <p className="text-xs text-gray-400">Crie um workspace para seu cliente</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                            Nome da Empresa
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Tech Corp Ltda"
                            className="w-full bg-[#050B14] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                            CNPJ (Opcional)
                        </label>
                        <input
                            type="text"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            placeholder="00.000.000/0000-00"
                            className="w-full bg-[#050B14] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all font-mono text-sm"
                        />
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="p-3 rounded-xl bg-red-900/20 border border-red-500/20 text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="pt-4 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-gray-300 font-medium hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-[2] py-3 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-bold transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Criar Workspace
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
