"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    risk_level: string;
    created_at: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newRisk, setNewRisk] = useState("low");

    const fetchProjects = async () => {
        const token = localStorage.getItem("algor_token");
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetch("/api/v1/projects/", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) setProjects(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("algor_token");
        try {
            const res = await fetch("/api/v1/projects/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newName,
                    description: newDesc,
                    risk_level: newRisk,
                    status: "planning"
                })
            });
            if (res.ok) {
                setIsCreating(false);
                setNewName("");
                setNewDesc("");
                fetchProjects();
            }
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            default: return 'bg-brand-green/10 text-brand-green border-brand-green/20';
        }
    };

    return (
        <div className="min-h-screen bg-[#0A1A2F] text-white p-8 animate-in fade-in">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-white mb-2">AI GOV <span className="text-brand-blue text-sm align-super">BETA</span></h1>
                        <p className="text-gray-400">Central de Ciclo de Vida e Governança de Projetos.</p>
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-brand-blue hover:bg-white hover:text-brand-navy text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-rounded">add_circle</span> NOVO PROJETO
                    </button>
                </div>

                {/* Create Modal Area */}
                {isCreating && (
                    <div className="mb-8 p-6 glass-panel rounded-2xl border border-white/10 bg-white/[0.02]">
                        <h3 className="font-bold text-lg mb-4">Registrar Iniciativa de IA</h3>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                placeholder="Nome do Projeto (ex: Chatbot RH)"
                                className="bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-brand-blue"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                required
                            />
                            <select
                                className="bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none"
                                value={newRisk}
                                onChange={e => setNewRisk(e.target.value)}
                            >
                                <option value="low">Risco Baixo (Interno)</option>
                                <option value="medium">Risco Médio (Assistido)</option>
                                <option value="high">Risco Alto (Decisão Automatizada)</option>
                                <option value="critical">Crítico (Biometria/Vida)</option>
                            </select>
                            <textarea
                                placeholder="Descrição do caso de uso..."
                                className="md:col-span-2 bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-brand-blue h-24"
                                value={newDesc}
                                onChange={e => setNewDesc(e.target.value)}
                            />
                            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                                <button type="submit" className="px-6 py-2 bg-brand-green text-black font-bold rounded-lg hover:brightness-110">Registrar</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Project List */}
                {loading ? (
                    <div className="flex justify-center p-12"><span className="animate-spin material-symbols-rounded text-4xl text-brand-blue">progress_activity</span></div>
                ) : projects.length === 0 ? (
                    <div className="text-center p-16 border border-dashed border-white/10 rounded-3xl opacity-50">
                        <span className="material-symbols-rounded text-6xl mb-4">folder_off</span>
                        <p className="text-xl">Nenhum projeto governado ainda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(p => (
                            <div key={p.id} className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-brand-blue/30 transition-all group relative overflow-hidden">
                                <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase border-l border-b rounded-bl-xl ${getRiskColor(p.risk_level)}`}>
                                    {p.risk_level} Risk
                                </div>

                                <div className="mb-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                        <span className="material-symbols-rounded">rocket_launch</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest">{p.status}</p>
                                </div>

                                <p className="text-sm text-gray-400 mb-6 line-clamp-3 min-h-[3rem]">
                                    {p.description || "Sem descrição definida."}
                                </p>

                                <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs text-gray-500">
                                    <span>Atualizado: {new Date(p.created_at).toLocaleDateString()}</span>
                                    <button className="hover:text-white flex items-center gap-1">
                                        Gerenciar <span className="material-symbols-rounded text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
