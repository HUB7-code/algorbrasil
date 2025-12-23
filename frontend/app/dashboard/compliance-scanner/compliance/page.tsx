"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, FileText, Download, CheckCircle2, Clock, AlertCircle,
    ChevronRight, Search, Filter, Calendar, ExternalLink,
    Scale, BookOpen, Eye, Lock
} from 'lucide-react';

// Mock Audit Trail Data
const auditTrailData = [
    {
        id: 1,
        timestamp: '2025-12-23 15:23:45',
        userId: 'USR-4521',
        department: 'Atendimento',
        dataType: 'CPF',
        action: 'detected_blocked',
        lgpdArticle: 'Art. 5º, II',
        severity: 'high'
    },
    {
        id: 2,
        timestamp: '2025-12-23 15:22:12',
        userId: 'USR-8734',
        department: 'Vendas',
        dataType: 'Email',
        action: 'detected_allowed',
        lgpdArticle: 'Art. 5º, I',
        severity: 'medium'
    },
    {
        id: 3,
        timestamp: '2025-12-23 15:21:33',
        userId: 'USR-2156',
        department: 'RH',
        dataType: 'Geolocalização',
        action: 'detected_blocked',
        lgpdArticle: 'Art. 5º, I',
        severity: 'high'
    },
    {
        id: 4,
        timestamp: '2025-12-23 15:20:01',
        userId: 'USR-9012',
        department: 'TI',
        dataType: 'Nome Completo',
        action: 'detected_allowed',
        lgpdArticle: 'Art. 5º, I',
        severity: 'low'
    },
    {
        id: 5,
        timestamp: '2025-12-23 15:18:45',
        userId: 'USR-3344',
        department: 'Atendimento',
        dataType: 'Telefone',
        action: 'detected_flagged',
        lgpdArticle: 'Art. 5º, I',
        severity: 'medium'
    }
];

// Compliance Status
const complianceFrameworks = [
    {
        id: 'lgpd',
        name: 'LGPD',
        fullName: 'Lei Geral de Proteção de Dados',
        percentage: 94,
        pending: 6,
        status: 'compliant',
        color: '#10B981',
        lastAudit: '15/12/2025',
        nextAudit: '15/03/2026'
    },
    {
        id: 'pl2338',
        name: 'PL 2338/2023',
        fullName: 'Marco Legal da IA',
        percentage: 67,
        pending: 12,
        status: 'implementing',
        color: '#F59E0B',
        lastAudit: 'N/A',
        nextAudit: 'Aguardando aprovação'
    },
    {
        id: 'iso42001',
        name: 'ISO 42001',
        fullName: 'AI Management System',
        percentage: 0,
        pending: 0,
        status: 'not_started',
        color: '#6B7280',
        lastAudit: 'N/A',
        nextAudit: 'Não iniciado'
    }
];

// Pre-formatted Reports
const availableReports = [
    {
        id: 1,
        name: 'Relatório Trimestral ANPD',
        description: 'Inventário de dados e incidentes para submissão',
        format: 'PDF',
        size: '2.4 MB',
        lastGenerated: '01/12/2025'
    },
    {
        id: 2,
        name: 'Inventário de Dados Sensíveis',
        description: 'Mapeamento de PII processados por IA',
        format: 'XLSX',
        size: '856 KB',
        lastGenerated: '15/12/2025'
    },
    {
        id: 3,
        name: 'Audit Trail Completo',
        description: 'Log de 90 dias de atividades',
        format: 'CSV',
        size: '12.3 MB',
        lastGenerated: 'Hoje'
    },
    {
        id: 4,
        name: 'Assessment ISO 42001',
        description: 'Gap analysis para certificação',
        format: 'PDF',
        size: '1.8 MB',
        lastGenerated: '20/11/2025'
    }
];

// Pending Items
const pendingItems = [
    { id: 1, text: 'Atualizar Política de Privacidade para incluir IA', framework: 'LGPD', priority: 'high' },
    { id: 2, text: 'Documentar base legal para uso de dados em treinamento', framework: 'LGPD', priority: 'high' },
    { id: 3, text: 'Implementar mecanismo de explicabilidade', framework: 'PL 2338', priority: 'medium' },
    { id: 4, text: 'Criar processo de revisão humana para decisões', framework: 'PL 2338', priority: 'medium' },
    { id: 5, text: 'Definir critérios de classificação de risco', framework: 'ISO 42001', priority: 'low' },
    { id: 6, text: 'Estabelecer comitê de governança de IA', framework: 'ISO 42001', priority: 'low' }
];

const StatusBadge = ({ status }: { status: string }) => {
    const config = {
        compliant: { label: 'Conforme', color: '#10B981', bg: 'bg-emerald-500/10' },
        implementing: { label: 'Em Implementação', color: '#F59E0B', bg: 'bg-amber-500/10' },
        not_started: { label: 'Não Iniciado', color: '#6B7280', bg: 'bg-gray-500/10' }
    };
    const c = config[status as keyof typeof config];

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${c.bg}`} style={{ color: c.color }}>
            {c.label}
        </span>
    );
};

export default function ComplianceDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFramework, setSelectedFramework] = useState('all');

    const filteredAudit = auditTrailData.filter(item =>
        searchQuery === '' ||
        item.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dataType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white p-6">
            <div className="max-w-[1600px] mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Scale className="w-6 h-6 text-purple-400" />
                            Compliance Center
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Gestão de conformidade regulatória e evidências de auditoria</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:border-purple-500/50 transition-colors text-sm">
                            <FileText className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400">Gerar Relatório ANPD</span>
                        </button>
                    </div>
                </div>

                {/* Compliance Status Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {complianceFrameworks.map((framework, idx) => (
                        <motion.div
                            key={framework.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-white font-semibold text-lg">{framework.name}</h3>
                                    <p className="text-gray-500 text-xs">{framework.fullName}</p>
                                </div>
                                <StatusBadge status={framework.status} />
                            </div>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Conformidade</span>
                                    <span className="text-white font-mono">{framework.percentage}%</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${framework.percentage}%` }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: framework.color }}
                                    />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Itens pendentes</span>
                                    <span className="text-gray-300">{framework.pending}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Última auditoria</span>
                                    <span className="text-gray-300">{framework.lastAudit}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Próxima auditoria</span>
                                    <span className="text-gray-300">{framework.nextAudit}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-6">

                    {/* Audit Trail */}
                    <div className="col-span-8 bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-gray-800 bg-black/20">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Eye className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-white font-semibold">Audit Trail</h3>
                                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                                        {auditTrailData.length} registros hoje
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Buscar por ID ou tipo..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 w-64"
                                        />
                                    </div>
                                    <button className="p-2 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-600">
                                        <Filter className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-black/40 text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Timestamp</th>
                                        <th className="px-4 py-3 text-left">User ID</th>
                                        <th className="px-4 py-3 text-left">Departamento</th>
                                        <th className="px-4 py-3 text-left">Tipo de Dado</th>
                                        <th className="px-4 py-3 text-left">Ação</th>
                                        <th className="px-4 py-3 text-left">Artigo LGPD</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/50">
                                    {filteredAudit.map((item) => (
                                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-3 font-mono text-gray-400 text-xs">{item.timestamp}</td>
                                            <td className="px-4 py-3 text-white">{item.userId}</td>
                                            <td className="px-4 py-3 text-gray-300">{item.department}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${item.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                                                        item.severity === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                                                            'bg-gray-500/10 text-gray-400'
                                                    }`}>
                                                    {item.dataType}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`flex items-center gap-1 text-xs ${item.action.includes('blocked') ? 'text-emerald-400' :
                                                        item.action.includes('flagged') ? 'text-amber-400' :
                                                            'text-gray-400'
                                                    }`}>
                                                    {item.action.includes('blocked') ? <Lock className="w-3 h-3" /> :
                                                        item.action.includes('flagged') ? <AlertCircle className="w-3 h-3" /> :
                                                            <Eye className="w-3 h-3" />}
                                                    {item.action.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-mono text-xs text-gray-300">{item.lgpdArticle}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-gray-800 bg-black/20 flex justify-between items-center">
                            <span className="text-xs text-gray-500">Mostrando {filteredAudit.length} de {auditTrailData.length}</span>
                            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                Ver todos os registros <ExternalLink className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-span-4 space-y-6">

                        {/* Available Reports */}
                        <div className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-5 h-5 text-purple-400" />
                                <h3 className="text-white font-semibold">Relatórios Disponíveis</h3>
                            </div>

                            <div className="space-y-3">
                                {availableReports.map((report) => (
                                    <div
                                        key={report.id}
                                        className="flex items-center justify-between p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex-1 min-w-0 mr-4">
                                            <p className="text-white text-sm font-medium truncate">{report.name}</p>
                                            <p className="text-gray-500 text-xs truncate">{report.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                                                {report.format}
                                            </span>
                                            <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pending Compliance Items */}
                        <div className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-5 h-5 text-amber-400" />
                                <h3 className="text-white font-semibold">Pendências</h3>
                                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                                    {pendingItems.length}
                                </span>
                            </div>

                            <div className="space-y-2">
                                {pendingItems.slice(0, 4).map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start gap-3 p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors cursor-pointer"
                                    >
                                        <div className={`w-1 h-full rounded-full ${item.priority === 'high' ? 'bg-red-500' :
                                                item.priority === 'medium' ? 'bg-amber-500' :
                                                    'bg-gray-500'
                                            }`} />
                                        <div className="flex-1">
                                            <p className="text-gray-300 text-sm">{item.text}</p>
                                            <span className="text-xs text-gray-500">{item.framework}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-600" />
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-4 text-center text-xs text-blue-400 hover:text-blue-300">
                                Ver todas as pendências
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
