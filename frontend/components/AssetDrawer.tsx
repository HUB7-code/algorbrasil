"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle, ShieldCheck, HelpCircle, Server, Info } from 'lucide-react';

import { Asset } from '@/types/asset';

interface AssetDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (asset: Asset) => void;
}

export default function AssetDrawer({ isOpen, onClose, onSave }: AssetDrawerProps) {
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        type: 'SaaS (Public)',
        dataTypes: [] as string[],
        description: ''
    });

    const [suggestedRisk, setSuggestedRisk] = useState<{ level: string, color: string, reason: string } | null>(null);

    // Auto-calculate risk based on inputs (Smart UX)
    useEffect(() => {
        let risk = { level: 'Low', color: 'text-brand-blue', reason: 'Uso interno seguro.' };

        if (formData.type.includes('Public') || formData.type.includes('Generative')) {
            risk = { level: 'High', color: 'text-orange-500', reason: 'Envio de dados para terceiros (OpenAI/Midjourney).' };
        }

        if (formData.dataTypes.includes('PII') || formData.dataTypes.includes('Financeiro')) {
            risk = { level: 'Critical', color: 'text-red-500', reason: 'Processamento de Dados Sensíveis/Pessoais.' };
        }

        setSuggestedRisk(risk);
    }, [formData.type, formData.dataTypes]);

    const toggleDataType = (type: string) => {
        setFormData(prev => ({
            ...prev,
            dataTypes: prev.dataTypes.includes(type)
                ? prev.dataTypes.filter(t => t !== type)
                : [...prev.dataTypes, type]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newAsset: Asset = {
            name: formData.name,
            department: formData.department,
            type: formData.type,
            risk_level: suggestedRisk?.level || 'Low',
            data_types: formData.dataTypes.join(', '),
            description: formData.description,
            status: 'Under Review' // Default status
        };

        onSave(newAsset);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-[#0A1A2F]/95 border-l border-white/10 shadow-2xl transform transition-transform animate-in slide-in-from-right duration-300 flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                    <div>
                        <h2 className="text-xl font-display font-medium text-white">Novo Ativo de IA</h2>
                        <p className="text-xs text-gray-400 font-mono mt-1 uppercase tracking-wider">Inventário Fase 1.1</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Form Section 1: Identity */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Server className="w-4 h-4 text-brand-copper" />
                            Identificação
                        </label>
                        <input
                            type="text"
                            placeholder="Nome da Ferramenta (ex: ChatGPT, Copilot)"
                            className="w-full h-12 px-4 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-gray-600 focus:border-brand-blue/50 focus:outline-none transition-colors"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                className="h-12 px-4 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-blue/50 focus:outline-none appearance-none"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                            >
                                <option value="" disabled>Departamento</option>
                                <option>Marketing</option>
                                <option>Engenharia</option>
                                <option>RH</option>
                                <option>Jurídico</option>
                                <option>Vendas</option>
                            </select>
                            <select
                                className="h-12 px-4 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-blue/50 focus:outline-none appearance-none"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>SaaS (Public)</option>
                                <option>Generative Image</option>
                                <option>Internal Model</option>
                                <option>Dev Tool</option>
                                <option>Chatbot</option>
                            </select>
                        </div>
                    </div>

                    {/* Form Section 2: Data Sensitivity */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-brand-blue" />
                            Dados Processados
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {['PII (Dados Pessoais)', 'Financeiro', 'Propriedade Intelectual', 'Código Fonte', 'Dados Públicos', 'Interno N/Confidencial'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => toggleDataType(type)}
                                    className={`
                                        text-xs py-3 px-3 rounded-lg border text-left transition-all
                                        ${formData.dataTypes.includes(type)
                                            ? 'bg-brand-blue/20 border-brand-blue text-white'
                                            : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:border-white/10'}
                                    `}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI Analysis Card (The "Smart" Part) */}
                    <div className={`p-5 rounded-2xl border ${suggestedRisk?.level === 'Critical' ? 'bg-red-500/10 border-red-500/20' : suggestedRisk?.level === 'High' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-brand-blue/10 border-brand-blue/20'}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <AlertTriangle className={`w-5 h-5 ${suggestedRisk?.color}`} />
                            <span className={`text-sm font-bold uppercase tracking-wider ${suggestedRisk?.color}`}>Risco Estimado: {suggestedRisk?.level}</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            <span className="font-bold">Motivo:</span> {suggestedRisk?.reason}
                        </p>
                        <div className="mt-3 flex gap-2">
                            <div className="py-1 px-2 rounded bg-black/20 text-[10px] text-gray-400 border border-white/5">
                                ISO 42001 A.6.2
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl hover:bg-white/10 text-gray-300 text-sm font-medium transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 rounded-xl bg-brand-green hover:bg-[#00E585] text-black text-sm font-bold shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_25px_rgba(0,255,148,0.4)] transition-all flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Registrar no Inventário
                    </button>
                </div>
            </div>
        </>
    );
}
