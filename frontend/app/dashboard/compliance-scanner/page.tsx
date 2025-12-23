"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Download, Share2, FileText, Bell, Settings,
    Building2, ChevronDown, Sparkles
} from 'lucide-react';

// Components
import RiskScoreGauge from '@/components/compliance-scanner/RiskScoreGauge';
import RiskCard from '@/components/compliance-scanner/RiskCard';
import TimelineChart from '@/components/compliance-scanner/TimelineChart';
import DataBreakdownTable from '@/components/compliance-scanner/DataBreakdownTable';
import ActionChecklist from '@/components/compliance-scanner/ActionChecklist';
import ActivityFeed from '@/components/compliance-scanner/ActivityFeed';

// Mock Data
import {
    companyProfile,
    overviewMetrics,
    lgpdRiskData,
    hallucinationRiskData,
    securityRiskData,
    timelineData,
    dataBreakdown,
    actionItems,
    recentActivity,
    financialSummary
} from '@/components/compliance-scanner/mockData';

export default function ComplianceScannerDashboard() {

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white">
            {/* Background ambient effect */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-8">

                {/* Top Bar */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        {/* Logo/Brand */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">AI Compliance Scanner</h1>
                                <p className="text-xs text-gray-500">by ALGOR Brasil</p>
                            </div>
                        </div>

                        {/* Org Switcher */}
                        <div className="ml-8 flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:border-gray-600 transition-colors">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-white font-medium">{companyProfile.name}</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors">
                            <Bell className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors">
                            <Settings className="w-5 h-5 text-gray-400" />
                        </button>

                        {/* Export buttons */}
                        <div className="flex items-center gap-2 ml-4">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors text-sm">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">PDF</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors text-sm">
                                <Download className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">CSV</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/50 transition-colors text-sm">
                                <Share2 className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-400">Compartilhar</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Financial Hero Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/10 via-orange-500/5 to-amber-500/10 border border-red-500/20"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Exposição Financeira Total</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-white font-mono">
                                    {formatCurrency(financialSummary.totalExposure)}
                                </span>
                                <span className="text-emerald-400 text-sm">
                                    ↓ {formatCurrency(financialSummary.mitigationSavings)} economizados este mês
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-8">
                            <div className="text-center">
                                <p className="text-gray-500 text-xs uppercase mb-1">Risco Legal</p>
                                <p className="text-2xl font-bold text-red-400 font-mono">{formatCurrency(financialSummary.legalRisk)}</p>
                                <p className="text-xs text-gray-500">Multas ANPD</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 text-xs uppercase mb-1">Risco Operacional</p>
                                <p className="text-2xl font-bold text-amber-400 font-mono">{formatCurrency(financialSummary.operationalRisk)}</p>
                                <p className="text-xs text-gray-500">Erros de IA</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 text-xs uppercase mb-1">ROI Governança</p>
                                <p className="text-2xl font-bold text-emerald-400 font-mono">{financialSummary.roiPercentage}%</p>
                                <p className="text-xs text-gray-500">Retorno</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Grid: Score + Risk Cards */}
                <div className="grid grid-cols-12 gap-6 mb-8">
                    {/* Risk Score Gauge - Larger */}
                    <div className="col-span-12 lg:col-span-4">
                        <RiskScoreGauge
                            score={overviewMetrics.riskScore}
                            previousScore={overviewMetrics.previousWeekScore}
                        />
                    </div>

                    {/* Risk Cards - Side by side */}
                    <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <RiskCard
                            type="lgpd"
                            percentage={lgpdRiskData.exposurePercentage}
                            mainMetric="de requisições expuseram dados sensíveis"
                            details={[
                                `${lgpdRiskData.cpfCount} CPFs detectados`,
                                `${lgpdRiskData.geoCount} geolocalizações precisas`
                            ]}
                            reference={lgpdRiskData.relevantArticle}
                            financialImpact={lgpdRiskData.potentialFine}
                            ctaLabel="Ativar bloqueio automático"
                            severity={lgpdRiskData.severity}
                        />

                        <RiskCard
                            type="hallucination"
                            percentage={hallucinationRiskData.lowConfidencePercentage}
                            mainMetric="de respostas com baixa confiança"
                            details={[
                                `${hallucinationRiskData.confirmedHallucinations} alucinações confirmadas`,
                                `Threshold atual: ${hallucinationRiskData.threshold}`
                            ]}
                            reference="ISO 42001 A.8.4"
                            financialImpact={hallucinationRiskData.monthlyRiskCost}
                            ctaLabel="Configurar guardrails"
                            severity={hallucinationRiskData.severity}
                        />

                        <RiskCard
                            type="security"
                            percentage={(securityRiskData.blockedCount / securityRiskData.injectionAttempts) * 100}
                            mainMetric={`${securityRiskData.injectionAttempts} tentativas detectadas`}
                            details={[
                                `Última tentativa: ${securityRiskData.lastAttemptTime}`,
                                `${securityRiskData.blockedCount}/${securityRiskData.injectionAttempts} bloqueadas ✓`
                            ]}
                            reference={securityRiskData.owaspReference}
                            financialImpact={null}
                            ctaLabel="Ver log de ataques"
                            severity={securityRiskData.severity}
                        />
                    </div>
                </div>

                {/* Timeline Chart - Full Width */}
                <div className="mb-8">
                    <TimelineChart data={timelineData} />
                </div>

                {/* Bottom Grid: Table + Actions + Activity */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Data Breakdown Table */}
                    <div className="col-span-12 lg:col-span-5">
                        <DataBreakdownTable data={dataBreakdown} />
                    </div>

                    {/* Action Checklist */}
                    <div className="col-span-12 lg:col-span-4">
                        <ActionChecklist items={actionItems} />
                    </div>

                    {/* Activity Feed */}
                    <div className="col-span-12 lg:col-span-3">
                        <ActivityFeed initialData={recentActivity} />
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-12 pt-6 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
                    <div>
                        <span>© 2025 ALGOR Brasil. Todos os direitos reservados.</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Última sincronização: agora</span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Conexão ativa
                        </span>
                    </div>
                </footer>

            </div>
        </div>
    );
}
