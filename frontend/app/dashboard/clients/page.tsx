"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Plus, Search, MoreVertical,
    TrendingUp, ShieldAlert, ArrowRight, Briefcase, FileText,
    Users, Activity, Wallet, PieChart, BarChart3, Globe, Zap, Download, Filter
} from 'lucide-react';
import { useOrganization } from '@/context/OrganizationContext';
import { useRouter } from 'next/navigation';
import CreateOrganizationModal from '@/components/dashboard/CreateOrganizationModal';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart as RePieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

// ========================================
// PORTFOLIO CLIENTES - ULTRA PREMIUM
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

// MOCK DATA FOR VISUALS
const growthData = Array.from({ length: 12 }, (_, i) => ({
    name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
    value: Math.floor(Math.random() * 500) + 1000 + (i * 100),
    active: Math.floor(Math.random() * 5) + 10 + i,
}));

const sectorData = [
    { name: 'Fintech', value: 45, color: '#00A3FF' },
    { name: 'Healthtech', value: 30, color: '#00FF94' },
    { name: 'Retail', value: 15, color: '#F59E0B' },
    { name: 'Outros', value: 10, color: '#8B5CF6' },
];

export default function ClientsPage() {
    const { organizations, setCurrentOrganization, isLoading } = useOrganization();
    const router = useRouter();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredOrgs = organizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAccessWorkspace = (org: any) => {
        setCurrentOrganization(org);
        router.push('/dashboard');
    };

    // Calculate Summary Metrics (Mock + Real)
    const totalClients = organizations.length || 12; // Fallback to mock count for visual impact
    const totalRisk = 45;
    const avgHealth = 92;

    return (
        <div className="p-8 w-full min-h-screen relative text-white font-sans overflow-hidden bg-[#050A14]">

            {/* Deep Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[0%] w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <CreateOrganizationModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 max-w-[1920px] mx-auto space-y-8"
            >

                {/* HEADER */}
                <div className="flex flex-col xl:flex-row justify-between items-end gap-6 pb-6 border-b border-white/5">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-[#00A3FF] flex items-center gap-2 px-2 py-1 bg-[#00A3FF]/10 rounded border border-[#00A3FF]/20 uppercase tracking-widest">
                                <Globe className="w-3 h-3" />
                                Gestão Global
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-2 tracking-tight">
                            Portfólio de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00FF94]">Clientes</span>
                        </h1>
                        <p className="text-gray-400 font-light text-sm max-w-xl">
                            Gerencie workspaces, monitore riscos agregados e acompanhe a saúde do seu ecossistema de IA.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF]/20 to-[#00FF94]/20 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-center bg-[#0A1A2F]/80 border border-white/[0.1] rounded-xl px-4 py-3 w-[300px] transition-all group-focus-within:border-[#00FF94]/50">
                                <Search className="w-4 h-4 text-gray-500 group-focus-within:text-[#00FF94] mr-3" />
                                <input
                                    type="text"
                                    placeholder="Buscar cliente ou ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent border-none text-white text-xs font-bold uppercase tracking-wider focus:outline-none w-full placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0066FF] text-white font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,163,255,0.4)] transition-all flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Cliente
                        </motion.button>
                    </div>
                </div>

                {/* KPI ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Clients */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute top-0 right-0 p-4 opacity-50"><Users className="w-10 h-10 text-[#00A3FF]" /></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Total de Clientes</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-orbitron font-bold text-white">{totalClients}</span>
                            <span className="text-xs text-[#00FF94] font-bold">+2 este mês</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-[#00A3FF] w-[70%]" />
                        </div>
                    </div>

                    {/* Active Risks */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute top-0 right-0 p-4 opacity-50"><ShieldAlert className="w-10 h-10 text-[#F59E0B]" /></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Riscos Ativos</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-orbitron font-bold text-white">{totalRisk}</span>
                            <span className="text-xs text-[#F59E0B] font-bold">Atenção Necessária</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-[#F59E0B] w-[40%]" />
                        </div>
                    </div>

                    {/* Avg Health */}
                    <div className="relative overflow-hidden rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 group">
                        <div className="absolute top-0 right-0 p-4 opacity-50"><Activity className="w-10 h-10 text-[#00FF94]" /></div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Saúde Média</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-orbitron font-bold text-white">{avgHealth}%</span>
                            <span className="text-xs text-[#00FF94] font-bold">Otimizada</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-[#00FF94] w-[92%]" />
                        </div>
                    </div>
                </div>

                {/* CHARTS ROW */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[350px]">
                    <div className="xl:col-span-2 rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-8 backdrop-blur-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-orbitron font-bold text-white">Crescimento da Carteira</h3>
                            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400"><Filter className="w-4 h-4" /></button>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={growthData}>
                                    <defs>
                                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#475569" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#050A14', borderColor: '#ffffff10', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                                    <Area type="monotone" dataKey="value" stroke="#00A3FF" strokeWidth={2} fillOpacity={1} fill="url(#colorGrowth)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="xl:col-span-1 rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-8 backdrop-blur-sm flex flex-col">
                        <h3 className="text-lg font-orbitron font-bold text-white mb-6">Distribuição por Setor</h3>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={sectorData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sectorData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#050A14', borderColor: '#ffffff10', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                                </RePieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {sectorData.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-xs text-gray-400">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CLIENTS GRID */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-orbitron font-bold text-white">Workspaces Ativos</h3>
                        <div className="flex gap-2">
                            <button className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#00A3FF] text-white' : 'bg-white/5 text-gray-400'}`} onClick={() => setViewMode('grid')}><PieChart className="w-4 h-4" /></button>
                            <button className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#00A3FF] text-white' : 'bg-white/5 text-gray-400'}`} onClick={() => setViewMode('list')}><MoreVertical className="w-4 h-4" /></button>
                        </div>
                    </div>

                    {filteredOrgs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {filteredOrgs.map((org) => (
                                <motion.div
                                    key={org.id}
                                    variants={itemVariants}
                                    className="group relative rounded-[24px] bg-[#0A1A2F]/40 border border-white/5 p-6 hover:border-[#00FF94]/30 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Hover Gradients */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FF94]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#00FF94]/30 transition-colors">
                                                <span className="text-xl font-bold font-orbitron text-white">
                                                    {org.name.substring(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${org.role === 'owner' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20' : 'bg-[#00A3FF]/10 text-[#00A3FF] border-[#00A3FF]/20'}`}>
                                                {org.role === 'owner' ? 'Owner' : 'Member'}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold font-orbitron text-white mb-1 truncate group-hover:text-[#00FF94] transition-colors">{org.name}</h3>
                                        <p className="text-xs text-gray-500 mb-6 flex items-center gap-1"><Globe className="w-3 h-3" /> São Paulo, BR</p>

                                        {/* Mini Stats */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Health Score</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-[#00FF94]" />
                                                    <span className="text-lg font-bold text-white">94%</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Riscos</span>
                                                <span className="text-lg font-bold text-white">03</span>
                                            </div>
                                        </div>

                                        {/* Activity Sparkline (Mock) */}
                                        <div className="h-10 flex items-end gap-1 mb-6 opacity-40 group-hover:opacity-80 transition-opacity">
                                            {[30, 45, 25, 60, 40, 70, 50, 80].map((h, i) => (
                                                <div key={i} className="flex-1 bg-[#00FF94] rounded-t-sm" style={{ height: `${h}%` }} />
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{org.plan_tier || 'FREE'}</span>
                                            <button
                                                onClick={() => handleAccessWorkspace(org)}
                                                className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#00FF94] transition-colors uppercase tracking-wider"
                                            >
                                                Acessar <ArrowRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Add New Card */}
                            <motion.button
                                onClick={() => setIsCreateModalOpen(true)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="rounded-[24px] border border-white/5 border-dashed bg-white/[0.01] hover:bg-white/[0.03] p-6 flex flex-col items-center justify-center gap-4 transition-all group min-h-[300px]"
                            >
                                <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-[#00A3FF]/20 flex items-center justify-center transition-colors">
                                    <Plus className="w-8 h-8 text-gray-500 group-hover:text-[#00A3FF]" />
                                </div>
                                <span className="text-sm font-bold text-gray-500 group-hover:text-white uppercase tracking-widest">Adicionar Workspace</span>
                            </motion.button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center rounded-[24px] bg-[#0A1A2F]/20 border border-white/5 border-dashed">
                            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                <Briefcase className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">Carteira Vazia</h3>
                            <p className="text-gray-400 mb-8 max-w-sm">Adicione seu primeiro cliente para ativar o Painel de Controle Multitenant.</p>
                            <button onClick={() => setIsCreateModalOpen(true)} className="px-8 py-3 bg-[#00A3FF] text-white font-bold rounded-xl uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                                Adicionar Cliente
                            </button>
                        </div>
                    )}
                </div>

            </motion.div>
        </div>
    );
}
