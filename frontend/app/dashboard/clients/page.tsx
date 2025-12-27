"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Building2, Plus, Search, MoreVertical,
    TrendingUp, ShieldAlert, ArrowRight, Briefcase, FileText
} from 'lucide-react';
import { useOrganization } from '@/context/OrganizationContext';
import { useRouter } from 'next/navigation';
import CreateOrganizationModal from '@/components/dashboard/CreateOrganizationModal';

export default function ClientsPage() {
    const { organizations, setCurrentOrganization, isLoading } = useOrganization();
    const router = useRouter();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrgs = organizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAccessWorkspace = (org: any) => {
        setCurrentOrganization(org);
        router.push('/dashboard');
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-8 space-y-8 min-h-screen bg-[#0A0E1A] text-white">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Gestão de Carteira
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Gerencie os workspaces dos seus clientes e monitore riscos.
                    </p>
                </div>

                <div className="flex item-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 w-64 transition-all"
                        />
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-blue/20 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Novo Cliente
                    </button>
                </div>
            </div>

            {/* Clients Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : filteredOrgs.length > 0 ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredOrgs.map((org) => (
                        <motion.div
                            key={org.id}
                            variants={item}
                            className="group relative bg-[#0F172A] border border-white/5 hover:border-brand-blue/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-blue/5 overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 to-brand-blue/0 group-hover:from-brand-blue/5 group-hover:to-transparent transition-all duration-500" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold font-mono text-gray-300 group-hover:text-white group-hover:border-brand-blue/30 transition-colors">
                                        {org.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <button className="text-gray-500 hover:text-white transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-blue transition-colors truncate">
                                    {org.name}
                                </h3>
                                <p className="text-xs text-gray-500 mb-6 font-mono">
                                    ID: {org.id} • {org.role === 'owner' ? 'Owner' : 'Member'}
                                </p>

                                {/* Mock Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-2 mb-1">
                                            <ShieldAlert className="w-3 h-3 text-amber-400" />
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Riscos</span>
                                        </div>
                                        <p className="text-lg font-bold text-white">4</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp className="w-3 h-3 text-emerald-400" />
                                            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Score</span>
                                        </div>
                                        <p className="text-lg font-bold text-white">85%</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${org.plan_tier === 'enterprise'
                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                        }`}>
                                        {org.plan_tier || 'FREE'}
                                    </span>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(`/dashboard/report-iso42001/${org.id}`, '_blank');
                                            }}
                                            className="text-gray-400 hover:text-white transition-colors"
                                            title="Gerar Relatório ISO 42001"
                                        >
                                            <FileText className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => handleAccessWorkspace(org)}
                                            className="text-sm font-medium text-white hover:text-brand-blue flex items-center gap-1 transition-colors"
                                        >
                                            Acessar
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add New Card (Ghost) */}
                    <motion.button
                        variants={item}
                        onClick={() => setIsCreateModalOpen(true)}
                        className="group flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all min-h-[300px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-brand-blue/20 flex items-center justify-center mb-4 transition-colors">
                            <Plus className="w-8 h-8 text-gray-400 group-hover:text-brand-blue" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-400 group-hover:text-white mb-2">Adicionar Cliente</h3>
                        <p className="text-sm text-gray-600 group-hover:text-gray-400 text-center max-w-[200px]">
                            Crie um novo workspace para gerenciar riscos e auditorias.
                        </p>
                    </motion.button>
                </motion.div>
            ) : (
                // Empty State
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Briefcase className="w-10 h-10 text-gray-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Nenhum cliente encontrado</h2>
                    <p className="text-gray-400 max-w-md mb-8">
                        Você ainda não gerencia nenhum workspace. Adicione seu primeiro cliente para começar.
                    </p>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl shadow-lg shadow-brand-blue/20 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Adicionar Primeiro Cliente
                    </button>
                </div>
            )}

            <CreateOrganizationModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
}
