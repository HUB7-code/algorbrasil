"use client";

import { useState, useEffect } from "react";
import { Search, Database, Server, Cpu, MoreVertical, Plus } from "lucide-react";

export default function InventoryPage() {
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            const token = localStorage.getItem("algor_token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("/api/v1/inventory/", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const json = await res.json();
                    setAssets(json);
                }
            } catch (error) {
                console.error("Failed to fetch assets", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, []);

    // Helper to Create Asset (Mock MVP)
    const handleCreateMock = async () => {
        const name = prompt("Nome do Ativo (Ex: Chatbot RH):");
        if (!name) return;

        const token = localStorage.getItem("algor_token");
        try {
            await fetch("/api/v1/inventory/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    type: "Generative AI",
                    risk_level: "Medium",
                    department: "Inovação"
                })
            });
            // Reload
            window.location.reload();
        } catch (e) {
            alert("Erro ao criar");
        }
    }

    return (
        <div className="p-8 w-full min-h-screen space-y-10 relative text-white font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2 tracking-tight">
                        Inventário de IA
                    </h1>
                    <p className="text-gray-300 font-light text-lg">
                        Catálogo centralizado de todos os modelos e ativos de dados.
                    </p>
                </div>

                {/* Search Bar - Glass Style */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar ativo..."
                        className="pl-10 pr-4 py-2.5 w-64 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00FF94]/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    />
                </div>
            </div>

            {/* Asset Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

                {/* Render API Assets */}
                {loading ? (
                    <div className="col-span-3 text-center text-gray-500 py-10">
                        Carregando Inteligência...
                    </div>
                ) : assets.map((asset: any) => (
                    <AssetCard
                        key={asset.id}
                        name={asset.name}
                        type={asset.type}
                        owner={asset.department || "Geral"}
                        status={asset.status || "In Review"}
                        icon={getIconForType(asset.type)}
                        risk={asset.risk_level}
                    />
                ))}

                {/* Add New Button */}
                <button onClick={handleCreateMock} className="rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 hover:bg-white/5 transition-colors group cursor-pointer h-[220px]">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-400 group-hover:text-white">Adicionar Ativo</span>
                </button>

            </div>
        </div>
    );
}

function getIconForType(type: string) {
    if (type === 'Machine Learning') return <Cpu className="w-6 h-6 text-[#00A3FF]" />;
    if (type === 'Dataset') return <Database className="w-6 h-6 text-[#00FF94]" />;
    return <Server className="w-6 h-6 text-purple-400" />;
}

function AssetCard({ name, type, owner, status, icon, risk }: any) {
    const statusColor = status === 'Production' ? 'text-[#00FF94] bg-[#00FF94]/10' : 'text-amber-400 bg-amber-400/10';
    const riskColor = risk === 'High' || risk === 'Critical' ? 'text-red-400' : risk === 'Medium' ? 'text-amber-400' : 'text-[#00FF94]';

    return (
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-[220px] group hover:border-white/20 relative">

            <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    {icon}
                </div>
                <button className="text-gray-600 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            <div>
                <h3 className="text-lg font-serif font-medium text-white mb-1 group-hover:text-[#00A3FF] transition-colors">{name}</h3>
                <p className="text-sm text-gray-500 font-mono">{type} • {owner}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${statusColor} border border-white/5`}>
                    {status}
                </span>
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Risk Level</p>
                    <p className={`text-xs font-bold ${riskColor}`}>{risk}</p>
                </div>
            </div>
        </div>
    )
}
