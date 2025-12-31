'use client';

import { useState, useEffect } from "react";
import { Search, Database, Server, Cpu, MoreVertical, Plus, Filter, LayoutGrid, List, ShieldAlert, Activity, Box } from "lucide-react";
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

    // Summary Stats
    const totalAssets = assets.length;
    const highRiskCount = assets.filter(a => a.risk_level === 'High' || a.risk_level === 'Critical').length;
    const productionCount = assets.filter(a => a.status === 'Production').length;

    return (
        <div className="p-8 w-full min-h-screen relative text-white font-sans overflow-hidden bg-[#0A0E1A]">

            {/* Ambient Lighting - Premium Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
            </div>

            <CreateAssetModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onAssetCreated={fetchAssets}
            />

            <div className="relative z-10 space-y-8">
                {/* Header & Stats Row */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Header Title Area */}
                    <div className="lg:col-span-1 flex flex-col justify-end">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono text-[#00A3FF] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded bg-[#00A3FF]/10 border border-[#00A3FF]/20">
                                Asset Control
                            </span>
                        </div>
                        <h1 className="text-4xl font-orbitron font-bold text-white mb-2 tracking-tight">
                            Inventário IA
                        </h1>
                        <p className="text-gray-400 font-light text-sm">
                            Catálogo centralizado de todos os modelos e ativos de dados.
                        </p>
                    </div>

                    {/* KPI Cards */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* KPI 1 */}
                        <div className="p-4 rounded-2xl bg-[#0A0E1A]/60 border border-white/5 backdrop-blur-xl flex items-center gap-4 hover:border-[#00A3FF]/30 transition-colors group">
                            <div className="p-3 rounded-xl bg-[#00A3FF]/10 text-[#00A3FF] group-hover:bg-[#00A3FF] group-hover:text-[#0A0E1A] transition-all">
                                <Box size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Ativos</p>
                                <p className="text-2xl font-orbitron font-bold text-white">{totalAssets}</p>
                            </div>
                        </div>

                        {/* KPI 2 */}
                        <div className="p-4 rounded-2xl bg-[#0A0E1A]/60 border border-white/5 backdrop-blur-xl flex items-center gap-4 hover:border-red-500/30 transition-colors group">
                            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                <ShieldAlert size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alto Risco</p>
                                <p className="text-2xl font-orbitron font-bold text-white">{highRiskCount}</p>
                            </div>
                        </div>

                        {/* KPI 3 */}
                        <div className="p-4 rounded-2xl bg-[#0A0E1A]/60 border border-white/5 backdrop-blur-xl flex items-center gap-4 hover:border-[#00FF94]/30 transition-colors group">
                            <div className="p-3 rounded-xl bg-[#00FF94]/10 text-[#00FF94] group-hover:bg-[#00FF94] group-hover:text-[#0A0E1A] transition-all">
                                <Activity size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Em Produção</p>
                                <p className="text-2xl font-orbitron font-bold text-white">{productionCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Toolbar - Glass Bar */}
                <div className="p-2 rounded-2xl bg-[#0A0E1A]/60 border border-white/5 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Visual Filter Pills */}
                    <div className="flex items-center gap-1 p-1">
                        {["All", "Model", "Dataset", "System"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`
                                    px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
                                    ${filter === f
                                        ? 'bg-[#00A3FF] text-[#0A0E1A] shadow-[0_0_15px_rgba(0,163,255,0.4)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                {f === "All" ? "Todos" : f + "s"}
                            </button>
                        ))}
                    </div>

                    {/* Actions Right */}
                    <div className="flex items-center gap-3 w-full md:w-auto px-2">
                        {/* Search */}
                        <div className="relative group w-full md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-[#00FF94] transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar ativos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2.5 w-full rounded-xl bg-[#0A1A2F]/50 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00FF94] focus:bg-[#0A1A2F] transition-all placeholder:text-gray-600"
                            />
                        </div>

                        <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block" />

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-[#00FF94] text-[#0A1A2F] font-bold text-xs uppercase tracking-widest hover:bg-[#00CC76] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:shadow-[0_0_30px_rgba(0,255,148,0.5)] transform hover:scale-105"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Ativo
                        </button>
                    </div>
                </div>

                {/* Asset Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20"
                >

                    {/* Loading Skeleton */}
                    {loading && Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-[280px] rounded-[24px] bg-white/5 animate-pulse border border-white/5" />
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
                            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                                <Database className="w-10 h-10 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-orbitron text-white mb-2">Inventário Vazio</h3>
                            <p className="text-gray-400 max-w-md">Não encontramos ativos com os filtros selecionados. Comece catalogando seus modelos de IA.</p>
                        </div>
                    )}

                </motion.div>
            </div>
        </div>
    );
}

function getIconForType(type: string) {
    if (type === 'Model' || type === 'Generative AI') return <Cpu className="w-6 h-6 text-[#00A3FF]" />;
    if (type === 'Dataset') return <Database className="w-6 h-6 text-[#00FF94]" />;
    return <Server className="w-6 h-6 text-[#8B5CF6]" />;
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
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF]/20 to-[#00FF94]/20 rounded-[24px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="h-[280px] p-6 rounded-[24px] bg-[#0A0E1A]/60 backdrop-blur-xl border border-white/5 group-hover:border-white/20 transition-all group-hover:-translate-y-1 relative z-10 flex flex-col justify-between overflow-hidden">

                {/* Decorative Top Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${data.risk_level === 'High' ? 'bg-red-500' : data.risk_level === 'Medium' ? 'bg-amber-500' : 'bg-[#00FF94]'
                    }`} />

                <div>
                    <div className="flex justify-between items-start mb-6 pt-2">
                        <div className="p-3 rounded-2xl bg-[#0A0E1A] border border-white/10 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
                            {getIconForType(data.type)}
                        </div>

                        <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${riskColor}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${data.risk_level === 'High' ? 'bg-red-500' : data.risk_level === 'Medium' ? 'bg-amber-500' : 'bg-[#00FF94]'
                                } animate-pulse`} />
                            {data.risk_level} Risk
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-orbitron font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-[#00A3FF] transition-colors">
                            {data.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-wide mb-1 flex items-center gap-2">
                            <span className="w-1 h-3 bg-[#00A3FF] rounded-full" />
                            {data.type}
                        </p>
                        <p className="text-sm text-gray-400 font-light line-clamp-2 leading-relaxed">
                            Owner: <span className="text-gray-300">{data.department || "N/A"}</span>
                        </p>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.status === 'Production' ? 'bg-[#00FF94] shadow-[0_0_5px_#00FF94]' : 'bg-gray-500'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${data.status === 'Production' ? 'text-white' : 'text-gray-500'}`}>
                            {data.status || 'Draft'}
                        </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#00A3FF] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                        Acessar
                    </span>
                </div>
            </div>
        </motion.div>
    )
}
