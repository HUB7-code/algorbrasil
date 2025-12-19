"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Shield, AlertTriangle, CheckCircle, Save } from "lucide-react";

interface Rule {
    id: number;
    rule_type: string;
    content: string;
    action: string;
    severity: string;
}

interface Policy {
    id: number;
    name: string;
    version: string;
    is_active: boolean;
    rules_count: number;
    rules?: Rule[]; // Hydrated later if needed, but for listing we just show count
}

export function PolicyManager() {
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [activePolicy, setActivePolicy] = useState<Policy | null>(null);
    const [loading, setLoading] = useState(true);

    // New Rule Form State
    const [newRuleContent, setNewRuleContent] = useState("");
    const [newRuleSeverity, setNewRuleSeverity] = useState("HIGH");

    const ORG_ID = 1; // TODO: Context

    useEffect(() => {
        fetchPolicies();
    }, []);

    async function fetchPolicies() {
        try {
            const res = await fetch(`http://localhost:8000/api/v1/governance/policies?organization_id=${ORG_ID}`);
            const data = await res.json();
            setPolicies(data);

            // Auto select first logic
            if (data.length > 0) setActivePolicy(data[0]);
            setLoading(false);
        } catch (e) {
            console.error("Failed to fetch policies", e);
            setLoading(false);
        }
    }

    async function handleCreatePolicy() {
        // Quick setup for demo: Create "Corporate Policy 2025" if none exists
        try {
            const res = await fetch(`http://localhost:8000/api/v1/governance/policies`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    organization_id: ORG_ID,
                    name: "Política Corporativa padrão 2026",
                    description: "Regras base de segurança de IA."
                })
            });
            if (res.ok) {
                fetchPolicies();
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function handleAddRule() {
        if (!activePolicy || !newRuleContent) return;

        try {
            const res = await fetch(`http://localhost:8000/api/v1/governance/policies/${activePolicy.id}/rules`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rule_type: "keyword_fuzzy",
                    content: newRuleContent,
                    severity: newRuleSeverity,
                    action: "BLOCK"
                })
            });

            if (res.ok) {
                setNewRuleContent("");
                // Refresh logic (simplified)
                alert("Regra adicionada! O Guardrail já está atualizado.");
                fetchPolicies(); // To update rule count
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Sidebar: Policies List */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Políticas Ativas</h3>
                    <button
                        onClick={handleCreatePolicy}
                        className="p-2 bg-[#00FF94]/10 text-[#00FF94] rounded-lg hover:bg-[#00FF94]/20 transition-colors"
                        title="Nova Política"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                <div className="space-y-3">
                    {loading && <div className="text-sm text-slate-500">Carregando...</div>}
                    {!loading && policies.length === 0 && (
                        <div className="p-4 rounded-lg border border-dashed border-white/10 text-slate-500 text-sm text-center">
                            Nenhuma política definida. Crie a primeira para ativar o Guardrail.
                        </div>
                    )}
                    {policies.map(p => (
                        <div
                            key={p.id}
                            onClick={() => setActivePolicy(p)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${activePolicy?.id === p.id
                                    ? "bg-[#00A3FF]/10 border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.2)]"
                                    : "bg-white/5 border-white/5 hover:border-white/20"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-white text-sm">{p.name}</span>
                                {p.is_active && <CheckCircle size={14} className="text-[#00FF94]" />}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                                <span className="bg-white/5 px-2 py-0.5 rounded">v{p.version}</span>
                                <span>{p.rules_count} regras</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main: Rule Editor */}
            <div className="lg:col-span-2 bg-slate-900/50 rounded-2xl border border-white/5 p-6 backdrop-blur-sm relative overflow-hidden">
                {activePolicy ? (
                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                            <Shield className="text-[#00A3FF] w-8 h-8" />
                            <div>
                                <h2 className="text-xl font-bold text-white">Editor de Regras: {activePolicy.name}</h2>
                                <p className="text-sm text-slate-400">
                                    Adicione palavras-chave ou padrões que devem ser bloqueados pela IA.
                                </p>
                            </div>
                        </div>

                        {/* Add Rule Form */}
                        <div className="bg-black/20 p-5 rounded-xl border border-white/5 space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1 space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Palavra ou Frase Proibida</label>
                                    <input
                                        type="text"
                                        value={newRuleContent}
                                        onChange={(e) => setNewRuleContent(e.target.value)}
                                        placeholder="Ex: Senha do Admin, Projeto X, Concorrente Y"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00A3FF]"
                                    />
                                </div>
                                <div className="w-32 space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Severidade</label>
                                    <select
                                        value={newRuleSeverity}
                                        onChange={(e) => setNewRuleSeverity(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-3 text-white focus:outline-none"
                                    >
                                        <option value="HIGH">Alta</option>
                                        <option value="MEDIUM">Média</option>
                                        <option value="CRITICAL">Crítica</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                onClick={handleAddRule}
                                disabled={!newRuleContent}
                                className="w-full py-3 bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={18} /> Adicionar Regra ao Guardrail
                            </button>
                        </div>

                        {/* Rules List Preview (Visual only for now as listing endpoint is not FULLY separated yet, but we can assume simplicity) */}
                        <div className="mt-8">
                            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <AlertTriangle size={16} className="text-amber-400" />
                                Regras Ativas recentemente
                            </h4>
                            <div className="space-y-2">
                                {/* Mock visualization of what user added */}
                                {newRuleContent === "" && activePolicy.rules_count > 0 && (
                                    <div className="text-sm text-slate-500 italic">
                                        As regras estão ativas no banco de dados. (Visualização da lista completa vira na v1.1)
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500">
                        <Shield className="w-16 h-16 mb-4 opacity-20" />
                        <p>Selecione ou crie uma política para editar.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
