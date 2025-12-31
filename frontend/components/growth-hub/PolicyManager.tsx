"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Shield, AlertTriangle, CheckCircle, Save, ShieldCheck, Zap } from "lucide-react";
import { useOrganization } from "@/context/OrganizationContext";
import { motion, AnimatePresence } from "framer-motion";

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
    rules?: Rule[];
}

export function PolicyManager() {
    const { currentOrganization } = useOrganization();
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [activePolicy, setActivePolicy] = useState<Policy | null>(null);
    const [loading, setLoading] = useState(true);

    // New Rule Form State
    const [newRuleContent, setNewRuleContent] = useState("");
    const [newRuleSeverity, setNewRuleSeverity] = useState("HIGH");

    const orgId = currentOrganization?.id || 1;

    useEffect(() => {
        fetchPolicies();
    }, [orgId]);

    async function fetchPolicies() {
        try {
            const res = await fetch(`/api/v1/governance/policies?organization_id=${orgId}`);
            if (!res.ok) {
                console.warn(`API Error: ${res.status}`);
                setPolicies([]);
                return;
            }
            const data = await res.json();
            if (Array.isArray(data)) {
                setPolicies(data);
                if (data.length > 0 && !activePolicy) setActivePolicy(data[0]);
            } else {
                setPolicies([]);
            }
        } catch (e) {
            console.error("Failed to fetch policies", e);
            setPolicies([]);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreatePolicy() {
        try {
            const res = await fetch(`/api/v1/governance/policies`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    organization_id: orgId,
                    name: `Política Corporativa ${new Date().getFullYear()}`,
                    description: "Regras base de segurança de IA."
                })
            });
            if (res.ok) fetchPolicies();
        } catch (e) {
            console.error(e);
        }
    }

    async function handleAddRule() {
        if (!activePolicy || !newRuleContent) return;
        try {
            const res = await fetch(`/api/v1/governance/policies/${activePolicy.id}/rules`, {
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
                alert("Regra adicionada ao Guardrail com sucesso.");
                // Update specific policy rule count locally or refetch
                fetchPolicies();
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px] font-sans selection:bg-[#00FF94] selection:text-[#0A0E1A]">

            {/* Sidebar: Policies List */}
            <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div>
                        <h3 className="text-xl font-bold font-orbitron text-white">Políticas Ativas</h3>
                        <p className="text-xs text-gray-400 font-light mt-1">Gerencie os conjuntos de regras do seu Firewall de IA.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCreatePolicy}
                        className="p-3 bg-gradient-to-br from-[#00FF94] to-[#00A3FF] text-[#0A0E1A] rounded-xl shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:shadow-[0_0_30px_rgba(0,255,148,0.5)] transition-all"
                        title="Nova Política"
                    >
                        <Plus size={20} strokeWidth={3} />
                    </motion.button>
                </div>

                <div className="space-y-4 pr-2 custom-scrollbar max-h-[600px] overflow-y-auto">
                    {loading && (
                        <div className="flex flex-col items-center py-10 space-y-3">
                            <div className="w-8 h-8 border-2 border-[#00FF94] border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs font-mono text-[#00FF94] animate-pulse">CARREGANDO...</span>
                        </div>
                    )}

                    {!loading && policies.length === 0 && (
                        <div className="p-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-center group hover:border-[#00FF94]/30 transition-colors">
                            <Shield className="w-10 h-10 text-gray-600 mx-auto mb-3 group-hover:text-[#00FF94] transition-colors" />
                            <p className="text-gray-400 text-sm mb-4">Nenhuma política encontrada.</p>
                            <button onClick={handleCreatePolicy} className="text-xs font-bold text-[#00FF94] uppercase tracking-wider hover:underline">
                                + Criar Primeira Política
                            </button>
                        </div>
                    )}

                    <AnimatePresence>
                        {policies.map((p, idx) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setActivePolicy(p)}
                                className={`
                                    relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 group overflow-hidden
                                    ${activePolicy?.id === p.id
                                        ? "bg-gradient-to-r from-[#00A3FF]/20 to-[#0A0E1A] border-[#00A3FF] shadow-[0_0_30px_rgba(0,163,255,0.15)]"
                                        : "bg-[#0A0E1A]/40 border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                                    }
                                `}
                            >
                                {activePolicy?.id === p.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00A3FF] shadow-[0_0_15px_#00A3FF]" />
                                )}

                                <div className="flex justify-between items-start mb-3 pl-2">
                                    <span className={`font-bold text-sm tracking-wide ${activePolicy?.id === p.id ? 'text-white' : 'text-gray-300'}`}>
                                        {p.name}
                                    </span>
                                    {p.is_active && (
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20 shadow-[0_0_10px_rgba(0,255,148,0.2)]">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                                            <span className="text-[10px] font-bold text-[#00FF94] uppercase">Active</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-xs pl-2">
                                    <div className="flex items-center gap-1.5 text-gray-500">
                                        <ShieldCheck size={12} />
                                        <span className="font-mono">v{p.version}</span>
                                    </div>
                                    <div className="h-3 w-[1px] bg-white/10" />
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <Zap size={12} className={activePolicy?.id === p.id ? 'text-[#00A3FF]' : ''} />
                                        <span className="font-mono">{p.rules_count} REGRAS</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main: Rule Editor */}
            <div className="lg:col-span-2 relative">
                {/* Glass Panel Background */}
                <div className="absolute inset-0 bg-[#0A0E1A]/60 backdrop-blur-2xl rounded-[32px] border border-white/[0.08] shadow-2xl" />

                {activePolicy ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 p-8 h-full flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-start gap-6 pb-8 border-b border-white/10 mb-8">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-[#00A3FF]/20 rounded-2xl blur-xl group-hover:bg-[#00A3FF]/40 transition-all" />
                                <div className="relative w-16 h-16 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center shadow-lg">
                                    <Shield className="w-8 h-8 text-[#00A3FF] drop-shadow-[0_0_10px_rgba(0,163,255,0.5)]" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold font-orbitron text-white mb-2 tracking-wide">
                                    Configuração de Guardrails
                                </h2>
                                <p className="text-sm text-gray-400 font-light max-w-lg">
                                    Defina os bloqueios de segurança para o modelo. As alterações são replicadas para a API em tempo real (~50ms).
                                </p>
                            </div>
                        </div>

                        {/* Add Rule Form */}
                        <div className="bg-[#0D121F] p-6 rounded-2xl border border-white/5 space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF94]/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="flex flex-col md:flex-row gap-6 relative z-10">
                                <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-bold text-[#00A3FF] uppercase tracking-widest pl-1">
                                        Padrão de Bloqueio (Keyword / Regex)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={newRuleContent}
                                            onChange={(e) => setNewRuleContent(e.target.value)}
                                            placeholder="Ex: Senha do Admin, Projeto X, Concorrente Y"
                                            className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF]/50 transition-all font-mono text-sm shadow-inner"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <span className="text-[10px] font-mono text-gray-600 border border-gray-700 px-1.5 py-0.5 rounded">STR</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-48 space-y-2">
                                    <label className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest pl-1">
                                        Nível de Risco
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={newRuleSeverity}
                                            onChange={(e) => setNewRuleSeverity(e.target.value)}
                                            className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-4 text-white appearance-none focus:border-[#F59E0B] focus:outline-none transition-all font-bold text-sm cursor-pointer hover:bg-white/[0.02]"
                                        >
                                            <option value="HIGH">ALTA CRITICIDADE</option>
                                            <option value="MEDIUM">RISCO MÉDIO</option>
                                            <option value="CRITICAL">BLOCK IMEDIATO</option>
                                        </select>
                                        <AlertTriangle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F59E0B] pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddRule}
                                    disabled={!newRuleContent}
                                    className={`
                                        px-8 py-3 rounded-xl font-bold font-orbitron text-sm tracking-wider flex items-center gap-3 transition-all
                                        ${!newRuleContent
                                            ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                                            : 'bg-gradient-to-r from-[#00A3FF] to-[#006097] text-white hover:shadow-[0_0_20px_rgba(0,163,255,0.4)] border border-[#00A3FF]/50'
                                        }
                                    `}
                                >
                                    <Plus size={16} />
                                    ADICIONAR REGRA
                                </motion.button>
                            </div>
                        </div>

                        {/* Recent Activity / Preview */}
                        <div className="mt-8 flex-1">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                                Live Rule Preview
                            </h4>

                            <div className="space-y-3">
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                            <Shield className="w-4 h-4 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">Block Senhas e PII</p>
                                            <p className="text-xs text-red-400 font-mono mt-0.5">REGEX: \b(?:\d{3}\.){2}\d{3}-\d{2}\b</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20">CRÍTICO</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center border border-[#F59E0B]/20">
                                            <Shield className="w-4 h-4 text-[#F59E0B]" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">Concorrente: "CompetitorX"</p>
                                            <p className="text-xs text-[#F59E0B] font-mono mt-0.5">KEYWORD: CompetitorX</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded border border-[#F59E0B]/20">ALTA</span>
                                </div>

                                <div className="mt-4 p-3 rounded-lg border border-dashed border-white/10 text-center">
                                    <p className="text-xs text-gray-500">Visualização limitada a 2 regras (Sincronizando com Cluster...)</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 relative z-10">
                        <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 animate-pulse">
                            <Shield className="w-10 h-10 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold font-orbitron text-white mb-2">Selecione uma Política</h3>
                        <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                            Escolha um grupo de regras à esquerda para editar seus parâmetros de segurança ou crie uma nova política.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
