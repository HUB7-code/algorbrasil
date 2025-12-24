'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, TrendingUp, Clock, Target, Filter, Search, RefreshCw,
    Phone, Mail, Building2, ChevronDown, Eye, CheckCircle2, XCircle,
    MessageSquare, Zap, Flame, ThermometerSun, Snowflake, Calendar,
    ArrowUpRight, ArrowDownRight, MoreVertical
} from 'lucide-react';

// Tipos
interface Lead {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    role?: string;
    company_size?: string;
    ai_volume?: string;
    ai_providers?: string[];
    pain_points?: string[];
    lead_score: number;
    priority: string;
    status: string;
    funnel_stage: string;
    lead_type?: string;
    source?: string;
    urgency?: string;
    contact_time?: string;
    comments?: string;
    admin_notes?: string;
    assigned_to?: string;
    created_at: string;
    contacted_at?: string;
}

interface LeadStats {
    total_leads: number;
    new_leads: number;
    contacted_leads: number;
    qualified_leads: number;
    converted_leads: number;
    hot_leads: number;
    warm_leads: number;
    conversion_rate: number;
    leads_today: number;
    leads_this_week: number;
    leads_this_month: number;
}

// Configurações visuais
const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    new: { label: 'Novo', color: '#3B82F6', bg: 'bg-blue-500/10' },
    contacted: { label: 'Contatado', color: '#F59E0B', bg: 'bg-amber-500/10' },
    qualified: { label: 'Qualificado', color: '#8B5CF6', bg: 'bg-purple-500/10' },
    nurturing: { label: 'Nutrição', color: '#6B7280', bg: 'bg-gray-500/10' },
    converted: { label: 'Convertido', color: '#10B981', bg: 'bg-emerald-500/10' },
    lost: { label: 'Perdido', color: '#EF4444', bg: 'bg-red-500/10' },
};

const priorityConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
    hot: { label: 'Quente', icon: Flame, color: '#EF4444' },
    warm: { label: 'Morno', icon: ThermometerSun, color: '#F59E0B' },
    cold: { label: 'Frio', icon: Snowflake, color: '#3B82F6' },
    nurture: { label: 'Nutrição', icon: Clock, color: '#6B7280' },
};

// Componente de Stat Card
const StatCard = ({ title, value, icon: Icon, change, changeType, color }: {
    title: string;
    value: number | string;
    icon: React.ElementType;
    change?: string;
    changeType?: 'up' | 'down';
    color: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            {change && (
                <div className={`flex items-center gap-1 text-xs ${changeType === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {changeType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {change}
                </div>
            )}
        </div>
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-bold text-white font-mono">{value}</p>
    </motion.div>
);

export default function LeadsManagementPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [stats, setStats] = useState<LeadStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [priorityFilter, setPriorityFilter] = useState<string>('');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // Fetch leads
    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const apiUrl = baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;
            const params = new URLSearchParams();
            if (statusFilter) params.append('status', statusFilter);
            if (priorityFilter) params.append('priority', priorityFilter);
            if (searchQuery) params.append('search', searchQuery);

            const response = await fetch(`${apiUrl}/leads?${params}`);
            if (response.ok) {
                const data = await response.json();
                setLeads(data.items || []);
            }
        } catch (error) {
            console.error('Erro ao buscar leads:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch stats
    const fetchStats = async () => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const apiUrl = baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;
            const response = await fetch(`${apiUrl}/leads/stats`);
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
        }
    };

    // Update lead status
    const updateLeadStatus = async (leadId: number, newStatus: string) => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const apiUrl = baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;
            const response = await fetch(`${apiUrl}/leads/${leadId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                fetchLeads();
                fetchStats();
            }
        } catch (error) {
            console.error('Erro ao atualizar lead:', error);
        }
    };

    useEffect(() => {
        fetchLeads();
        fetchStats();
    }, [statusFilter, priorityFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchLeads();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white p-6">
            {/* Background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                                <Users className="w-6 h-6" />
                            </div>
                            Gestão de Leads
                        </h1>
                        <p className="text-gray-500 mt-1">Pipeline de vendas e qualificação</p>
                    </div>

                    <motion.button
                        onClick={() => { fetchLeads(); fetchStats(); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/50 transition-colors"
                    >
                        <RefreshCw className={`w-5 h-5 text-blue-400 ${isLoading ? 'animate-spin' : ''}`} />
                    </motion.button>
                </div>

                {/* Stats Grid */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                        <StatCard
                            title="Total de Leads"
                            value={stats.total_leads}
                            icon={Users}
                            color="#3B82F6"
                        />
                        <StatCard
                            title="Novos"
                            value={stats.new_leads}
                            icon={Zap}
                            color="#10B981"
                            change={`+${stats.leads_today} hoje`}
                            changeType="up"
                        />
                        <StatCard
                            title="Hot Leads"
                            value={stats.hot_leads}
                            icon={Flame}
                            color="#EF4444"
                        />
                        <StatCard
                            title="Warm Leads"
                            value={stats.warm_leads}
                            icon={ThermometerSun}
                            color="#F59E0B"
                        />
                        <StatCard
                            title="Convertidos"
                            value={stats.converted_leads}
                            icon={CheckCircle2}
                            color="#10B981"
                        />
                        <StatCard
                            title="Taxa Conversão"
                            value={`${stats.conversion_rate}%`}
                            icon={TrendingUp}
                            color="#8B5CF6"
                        />
                    </div>
                )}

                {/* Filters */}
                <div className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Search */}
                        <div className="flex-1 min-w-[200px] relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar por nome, email ou empresa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none px-4 py-2.5 pr-10 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500/50 cursor-pointer"
                            >
                                <option value="">Todos os Status</option>
                                {Object.entries(statusConfig).map(([key, { label }]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>

                        {/* Priority Filter */}
                        <div className="relative">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="appearance-none px-4 py-2.5 pr-10 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500/50 cursor-pointer"
                            >
                                <option value="">Todas as Prioridades</option>
                                {Object.entries(priorityConfig).map(([key, { label }]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800 bg-black/20">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Lead</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Empresa</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Score</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Prioridade</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Origem</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Data</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Carregando leads...
                                        </td>
                                    </tr>
                                ) : leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            Nenhum lead encontrado
                                        </td>
                                    </tr>
                                ) : (
                                    leads.map((lead, idx) => {
                                        const status = statusConfig[lead.status] || statusConfig.new;
                                        const priority = priorityConfig[lead.priority] || priorityConfig.nurture;
                                        const PriorityIcon = priority.icon;

                                        return (
                                            <motion.tr
                                                key={lead.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.03 }}
                                                className="hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-gray-700 flex items-center justify-center text-white font-bold">
                                                            {lead.name?.charAt(0) || '?'}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-white">{lead.name || 'Sem nome'}</p>
                                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                                <Mail className="w-3 h-3" />
                                                                {lead.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-gray-300">
                                                        <Building2 className="w-4 h-4 text-gray-500" />
                                                        {lead.company || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-800/50">
                                                        <Target className="w-3 h-3 text-gray-400" />
                                                        <span className="font-mono font-bold text-white">{lead.lead_score}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                                                        style={{ backgroundColor: `${priority.color}15`, color: priority.color }}
                                                    >
                                                        <PriorityIcon className="w-3 h-3" />
                                                        {priority.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status.bg}`}
                                                        style={{ color: status.color }}
                                                    >
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-xs text-gray-400 capitalize">
                                                        {lead.source?.replace('-', ' ') || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-xs text-gray-400 font-mono">
                                                        {formatDate(lead.created_at)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => { setSelectedLead(lead); setIsDetailOpen(true); }}
                                                            className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                                                            title="Ver detalhes"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </motion.button>
                                                        {lead.phone && (
                                                            <motion.a
                                                                href={`tel:${lead.phone}`}
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                                                                title="Ligar"
                                                            >
                                                                <Phone className="w-4 h-4" />
                                                            </motion.a>
                                                        )}
                                                        {lead.status === 'new' && (
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => updateLeadStatus(lead.id, 'contacted')}
                                                                className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors"
                                                                title="Marcar como contatado"
                                                            >
                                                                <CheckCircle2 className="w-4 h-4" />
                                                            </motion.button>
                                                        )}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Lead Detail Modal */}
            <AnimatePresence>
                {isDetailOpen && selectedLead && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                            onClick={() => setIsDetailOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-gradient-to-b from-[#131825] to-[#0A0E1A] border-l border-gray-800 z-50 overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Detalhes do Lead</h2>
                                    <button
                                        onClick={() => setIsDetailOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        <XCircle className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                {/* Lead info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                                            {selectedLead.name?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
                                            <p className="text-gray-400">{selectedLead.company}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-800/30 rounded-xl">
                                            <p className="text-xs text-gray-500 mb-1">Score</p>
                                            <p className="text-2xl font-bold font-mono text-white">{selectedLead.lead_score}</p>
                                        </div>
                                        <div className="p-4 bg-gray-800/30 rounded-xl">
                                            <p className="text-xs text-gray-500 mb-1">Prioridade</p>
                                            <p className="text-lg font-bold capitalize" style={{ color: priorityConfig[selectedLead.priority]?.color }}>
                                                {priorityConfig[selectedLead.priority]?.label}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            {selectedLead.email}
                                        </div>
                                        {selectedLead.phone && (
                                            <div className="flex items-center gap-3 text-gray-300">
                                                <Phone className="w-4 h-4 text-gray-500" />
                                                {selectedLead.phone}
                                            </div>
                                        )}
                                        {selectedLead.role && (
                                            <div className="flex items-center gap-3 text-gray-300">
                                                <Users className="w-4 h-4 text-gray-500" />
                                                Cargo: {selectedLead.role}
                                            </div>
                                        )}
                                        {selectedLead.urgency && (
                                            <div className="flex items-center gap-3 text-gray-300">
                                                <Clock className="w-4 h-4 text-gray-500" />
                                                Urgência: {selectedLead.urgency}
                                            </div>
                                        )}
                                    </div>

                                    {selectedLead.ai_providers && selectedLead.ai_providers.length > 0 && (
                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">IAs Utilizadas</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedLead.ai_providers.map(provider => (
                                                    <span key={provider} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400">
                                                        {provider}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedLead.pain_points && selectedLead.pain_points.length > 0 && (
                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">Pain Points</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedLead.pain_points.map(pain => (
                                                    <span key={pain} className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-400">
                                                        {pain}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedLead.comments && (
                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">Comentários</p>
                                            <p className="text-gray-300 text-sm bg-gray-800/30 rounded-xl p-4">
                                                {selectedLead.comments}
                                            </p>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="pt-4 border-t border-gray-800 space-y-3">
                                        <p className="text-xs text-gray-500 mb-2">Atualizar Status</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(statusConfig).map(([key, { label, color }]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => { updateLeadStatus(selectedLead.id, key); setIsDetailOpen(false); }}
                                                    disabled={selectedLead.status === key}
                                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedLead.status === key
                                                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                                        : 'bg-gray-800/50 hover:bg-gray-800 text-white'
                                                        }`}
                                                    style={selectedLead.status === key ? { borderColor: color, borderWidth: 2 } : {}}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
