'use client';

import { useState, useEffect } from "react";
import { Search, Database, Server, Cpu, MoreVertical, Plus, Filter, LayoutGrid, List } from "lucide-react";
import CreateAssetModal from "@/components/dashboard/inventory/CreateAssetModal";
import { motion } from "framer-motion";

// ========================================
// INVENTÁRIO - POWER BI PREMIUM DARK MODE
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
};

export default function InventoryPage() {
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [filter, setFilter] = useState("All"); // All, Model, Dataset, System
    const [searchQuery, setSearchQuery] = useState("");

    const fetchAssets = async () => {
        setLoading(true);
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

    useEffect(() => {
        fetchAssets();
    }, []);

    // Filter Logic
    const filteredAssets = assets.filter(asset => {
        const matchesFilter = filter === "All" || asset.type === filter;
        const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            asset.department?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="p-8 w-full min-h-screen relative text-white font-sans z-10">

            <CreateAssetModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onAssetCreated={fetchAssets}
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-mono text-[#00A3FF] uppercase tracking-[0.2em] font-bold">ASSET CONTROL</span>
                    </div>
                    <h1 className="text-4xl font-serif font-medium text-white mb-2 tracking-tight">
                        Inventário de IA
                    </h1>
                    <p className="text-gray-400 font-light text-lg">
                        Catálogo centralizado de todos os modelos e ativos de dados.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-5 py-3 rounded-xl bg-[#00FF94] text-[#0A1A2F] font-bold text-sm tracking-wide hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,148,0.2)]"
                    >
                        <Plus className="w-4 h-4" />
                        NOVO ATIVO
                    </button>
                </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

                {/* Visual Filter Pills */}
                <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/5">
                    {["All", "Model", "Dataset", "System"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`
                                px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                ${filter === f
                                    ? 'bg-[#00A3FF] text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }
                            `}
                        >
                            {f === "All" ? "Todos" : f + "s"}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#00FF94] transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou área..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2.5 w-64 md:w-80 rounded-xl bg-[#0A1A2F] border border-white/10 text-sm text-white focus:outline-none focus:border-[#00FF94] focus:bg-white/5 transition-all placeholder:text-gray-600 shadow-inner"
                    />
                </div>
            </div>

            {/* Asset Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >

                {/* Loading Skeleton */}
                {loading && Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-[240px] rounded-2xl bg-white/5 animate-pulse" />
                ))}

                {/* Render Assets */}
                {!loading && filteredAssets.map((asset: any) => (
                    <AssetCard
                        key={asset.id}
                        data={asset}
                    />
                ))}

                {/* Empty State */}
                {!loading && filteredAssets.length === 0 && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-60">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <Database className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-serif text-white mb-2">Nenhum ativo encontrado</h3>
                        <p className="text-gray-400 max-w-md">Não encontramos ativos com os filtros selecionados. Tente buscar outro termo ou cadastre um novo.</p>
                    </div>
                )}

            </motion.div>
        </div>
    );
}

function getIconForType(type: string) {
    if (type === 'Model' || type === 'Generative AI') return <Cpu className="w-6 h-6 text-[#00A3FF]" />;
    if (type === 'Dataset') return <Database className="w-6 h-6 text-[#00FF94]" />;
    return <Server className="w-6 h-6 text-purple-400" />;
}

function AssetCard({ data }: any) {
    const riskColor = data.risk_level === 'High' || data.risk_level === 'Critical'
        ? 'text-red-500 bg-red-500/10 border-red-500/20'
        : data.risk_level === 'Medium'
            ? 'text-amber-500 bg-amber-500/10 border-amber-500/20'
            : 'text-[#00FF94] bg-[#00FF94]/10 border-[#00FF94]/20';

    return (
        <motion.div
            variants={itemVariants}
            className="group relative cursor-pointer"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF]/20 to-[#00FF94]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="glass-panel p-6 rounded-2xl flex flex-col h-[240px] relative z-10 border border-white/5 group-hover:border-white/20 transition-all group-hover:-translate-y-1">

                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-[#0A1A2F] border border-white/10 shadow-lg group-hover:scale-105 transition-transform">
                        {getIconForType(data.type)}
                    </div>

                    <div className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${riskColor}`}>
                        {data.risk_level} Risk
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-serif font-medium text-white mb-2 line-clamp-2 leading-tight group-hover:text-[#00A3FF] transition-colors">
                        {data.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-wide mb-1">
                        {data.type}
                    </p>
                    <p className="text-sm text-gray-400 font-light line-clamp-2">
                        {data.department || "Sem departamento"}
                    </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.status === 'Production' ? 'bg-[#00FF94]' : 'bg-amber-500'}`} />
                        <span className="text-xs font-bold text-gray-400 uppercase">{data.status || 'Draft'}</span>
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-white transition-colors">Ver Detalhes →</span>
                </div>

            </div>
        </motion.div>
    )
}
