"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Server, AlertTriangle, ShieldCheck, MoreVertical, Database } from 'lucide-react';
import { useOrganization } from '@/context/OrganizationContext';
import AssetDrawer from '@/components/AssetDrawer';

type Asset = {
    id: number;
    name: string;
    department?: string;
    type: string;
    risk_level: string; // Changed from 'risk' to match API
    data_types?: string; // Changed from 'data' to match API
    status: string;
    description?: string;
};

export default function InventoryPage() {
    const { currentOrganization } = useOrganization();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [inventory, setInventory] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Assets
    useEffect(() => {
        const fetchAssets = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("algor_token");
                if (!token) return;

                let url = `${process.env.NEXT_PUBLIC_API_URL}/inventory/assets/`;
                if (currentOrganization) {
                    url += `?organization_id=${currentOrganization.id}`;
                }

                const res = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setInventory(data);
                } else {
                    console.error("Failed to fetch assets");
                    setInventory([]);
                }
            } catch (error) {
                console.error("Error fetching assets", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAssets();
    }, [currentOrganization]);

    const handleAddAsset = async (newAsset: any) => {
        // Optimistic Update or Refetch
        // For SaaS Demo, let's just make the API call
        try {
            const token = localStorage.getItem("algor_token");
            let url = `${process.env.NEXT_PUBLIC_API_URL}/inventory/assets/`;
            if (currentOrganization) {
                url += `?organization_id=${currentOrganization.id}`;
            }

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newAsset.name,
                    department: newAsset.department,
                    type: newAsset.type,
                    risk_level: newAsset.risk, // Mapping
                    data_types: newAsset.dataTypes.join(', '), // Mapping
                    description: newAsset.description || ""
                })
            });

            if (res.ok) {
                const createdAsset = await res.json();
                setInventory([...inventory, createdAsset]);
                setIsDrawerOpen(false);
            }
        } catch (error) {
            console.error("Failed to create asset", error);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Drawer Component */}
            <AssetDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onSave={handleAddAsset}
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        {currentOrganization ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-blue/20 text-brand-blue border border-brand-blue/30">
                                {currentOrganization.name}
                            </span>
                        ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                Personal Workspace
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl font-display font-medium text-white tracking-tight">
                        Inventário de IA (Shadow AI)
                    </h1>
                    <p className="text-gray-400 mt-2 font-light">
                        Mapeamento centralizado de todos os ativos algorítmicos. <span className="text-brand-copper">Fase 1.1 Obrigatória.</span>
                    </p>
                </div>
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="h-11 px-6 rounded-xl bg-brand-copper hover:bg-[#D35400] text-white text-sm font-bold shadow-[0_0_20px_rgba(230,126,34,0.2)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)] transition-all duration-300 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Registrar Novo Ativo
                </button>
            </div>

            {/* Metrics (Computed from real data) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard icon={Database} label="Total de Ativos" value={inventory.length.toString()} color="text-brand-blue" />
                <MetricCard icon={AlertTriangle} label="Alto Risco (High/Crit)" value={inventory.filter(i => i.risk_level === 'High' || i.risk_level === 'Critical').length.toString()} color="text-red-400" />
                <MetricCard icon={ShieldCheck} label="Aprovados" value={inventory.filter(i => i.status === 'Approved').length.toString()} color="text-brand-green" />
            </div>

            {/* Filters & Search - Logic pending implementation */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, departamento ou risco..."
                        className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="h-12 px-6 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 flex items-center gap-2 transition-all">
                    <Filter className="w-4 h-4" />
                    Filtros
                </button>
            </div>

            {/* Data Table */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden min-h-[300px] relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-white/5 text-gray-200 font-medium uppercase tracking-wider text-xs">
                            <tr>
                                <th className="p-6">Nome do Ativo</th>
                                <th className="p-6">Departamento</th>
                                <th className="p-6">Tipo</th>
                                <th className="p-6">Nível de Risco</th>
                                <th className="p-6">Dados Processados</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {inventory.length === 0 && !isLoading ? (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-gray-500">
                                        Nenhum ativo encontrado neste Workspace.
                                    </td>
                                </tr>
                            ) : (
                                inventory.map((item) => (
                                    <tr key={item.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                                    <Server className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium text-white group-hover:text-brand-blue transition-colors">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">{item.department || '-'}</td>
                                        <td className="p-6">
                                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className={`flex items-center gap-2 font-bold ${item.risk_level === 'Critical' ? 'text-red-500' :
                                                item.risk_level === 'High' ? 'text-orange-500' :
                                                    item.risk_level === 'Medium' ? 'text-yellow-500' : 'text-gray-500'
                                                }`}>
                                                <div className={`w-2 h-2 rounded-full ${item.risk_level === 'Critical' ? 'bg-red-500 animate-pulse' :
                                                    item.risk_level === 'High' ? 'bg-orange-500' :
                                                        item.risk_level === 'Medium' ? 'bg-yellow-500' : 'bg-gray-500'
                                                    }`} />
                                                {item.risk_level}
                                            </div>
                                        </td>
                                        <td className="p-6 font-mono text-xs text-gray-500">{item.data_types || '-'}</td>
                                        <td className="p-6">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="p-6 text-right">
                                            <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// ... existing MetricCard and StatusBadge ...

function MetricCard({ icon: Icon, label, value, color }: any) {
    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                <p className="text-2xl font-display font-medium text-white">{value}</p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        'Active': 'bg-green-500/10 text-green-500 border-green-500/20',
        'Under Review': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        'Approved': 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm ${styles[status] || styles['Active']}`}>
            {status}
        </span>
    );
}
