"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calculator, AlertTriangle, ChevronRight, Building2,
    Users, Database, ShieldAlert, ArrowRight, CheckCircle2,
    DollarSign, Scale, TrendingUp, Lock, Sparkles, Shield,
    TrendingDown, BarChart3, Zap
} from 'lucide-react';
import Link from 'next/link';

// Configurações de cálculo baseadas na LGPD
const LGPD_CONFIG = {
    baseMultiplier: 0.02,
    maxFine: 50_000_000,
    perIncidentBase: 50_000,

    sectorRisk: {
        'financeiro': 2.5,
        'saude': 2.3,
        'telecom': 2.0,
        'varejo': 1.5,
        'tecnologia': 1.8,
        'educacao': 1.2,
        'industria': 1.3,
        'governo': 2.0,
        'outro': 1.0
    } as Record<string, number>,

    dataTypeRisk: {
        'cpf': 1.5,
        'financeiro': 2.0,
        'saude': 2.5,
        'biometrico': 3.0,
        'localizacao': 1.8,
        'comportamental': 1.3
    } as Record<string, number>
};

const SECTORS = [
    { value: 'financeiro', label: 'Serviços Financeiros / Bancos', icon: '🏦' },
    { value: 'saude', label: 'Saúde / Hospitais / Planos', icon: '🏥' },
    { value: 'telecom', label: 'Telecom / Internet', icon: '📡' },
    { value: 'varejo', label: 'Varejo / E-commerce', icon: '🛒' },
    { value: 'tecnologia', label: 'Tecnologia / SaaS', icon: '💻' },
    { value: 'educacao', label: 'Educação', icon: '🎓' },
    { value: 'industria', label: 'Indústria / Manufatura', icon: '🏭' },
    { value: 'governo', label: 'Governo / Público', icon: '🏛️' },
    { value: 'outro', label: 'Outro', icon: '📋' }
];

const COMPANY_SIZES = [
    { value: '1m', label: 'Até R$ 1 mi', revenue: 1_000_000 },
    { value: '10m', label: 'R$ 1-10 mi', revenue: 10_000_000 },
    { value: '50m', label: 'R$ 10-50 mi', revenue: 50_000_000 },
    { value: '100m', label: 'R$ 50-100 mi', revenue: 100_000_000 },
    { value: '500m', label: 'R$ 100-500 mi', revenue: 500_000_000 },
    { value: '1b', label: 'R$ 500 mi - 1 bi', revenue: 1_000_000_000 },
    { value: '1b+', label: 'Acima de R$ 1 bi', revenue: 2_000_000_000 }
];

const DATA_TYPES = [
    { id: 'cpf', label: 'CPF / RG / Documentos', icon: Users, risk: 'medium' },
    { id: 'financeiro', label: 'Dados Financeiros', icon: DollarSign, risk: 'high' },
    { id: 'saude', label: 'Dados de Saúde', icon: ShieldAlert, risk: 'critical' },
    { id: 'biometrico', label: 'Biométricos / Facial', icon: Lock, risk: 'critical' },
    { id: 'localizacao', label: 'Geolocalização', icon: Building2, risk: 'high' },
    { id: 'comportamental', label: 'Comportamento', icon: TrendingUp, risk: 'medium' }
];

const AI_USAGE = [
    { value: 'nenhum', label: 'Não usamos IA', multiplier: 1.0, risk: 'low' },
    { value: 'basico', label: 'IA básica (chatbots)', multiplier: 1.3, risk: 'low' },
    { value: 'moderado', label: 'IA moderada (recomendações)', multiplier: 1.6, risk: 'medium' },
    { value: 'avancado', label: 'IA avançada (decisões auto)', multiplier: 2.0, risk: 'high' },
    { value: 'generativa', label: 'IA Generativa (LLMs)', multiplier: 2.5, risk: 'critical' }
];

// Animated Gauge Component
const ExposureGauge = ({ value, maxValue }: { value: number; maxValue: number }) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const radius = 120;
    const strokeWidth = 12;
    const circumference = Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const getColor = () => {
        if (percentage >= 70) return { start: '#EF4444', end: '#DC2626' };
        if (percentage >= 40) return { start: '#F59E0B', end: '#D97706' };
        return { start: '#10B981', end: '#059669' };
    };

    const colors = getColor();

    return (
        <div className="relative w-[280px] h-[160px] mx-auto">
            <svg viewBox="0 0 280 160" className="w-full h-full">
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={colors.start} />
                        <stop offset="100%" stopColor={colors.end} />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background arc */}
                <path
                    d={`M 20 140 A ${radius} ${radius} 0 0 1 260 140`}
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                {/* Animated progress arc */}
                <motion.path
                    d={`M 20 140 A ${radius} ${radius} 0 0 1 260 140`}
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    filter="url(#glow)"
                />

                {/* Risk level markers */}
                <circle cx="45" cy="100" r="4" fill="#10B981" opacity={0.5} />
                <circle cx="140" cy="30" r="4" fill="#F59E0B" opacity={0.5} />
                <circle cx="235" cy="100" r="4" fill="#EF4444" opacity={0.5} />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
                <motion.span
                    className="text-5xl font-bold text-white font-mono"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {percentage.toFixed(0)}%
                </motion.span>
                <span className="text-gray-500 text-xs uppercase tracking-wider">do limite LGPD</span>
            </div>
        </div>
    );
};

// Step indicator
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
    <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
            <motion.div
                key={i}
                className={`h-2 rounded-full transition-all ${i < currentStep ? 'bg-blue-500 w-8' :
                    i === currentStep ? 'bg-blue-400 w-12' :
                        'bg-gray-700 w-2'
                    }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: i === currentStep ? 1.1 : 1 }}
            />
        ))}
    </div>
);

export default function CalculadoraMultasPage() {
    const [step, setStep] = useState(0);
    const [sector, setSector] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
    const [aiUsage, setAiUsage] = useState('');
    const [hasGovernance, setHasGovernance] = useState<boolean | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const toggleDataType = (id: string) => {
        setSelectedDataTypes(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const result = useMemo(() => {
        if (!sector || !companySize || selectedDataTypes.length === 0 || !aiUsage) return null;

        const sizeConfig = COMPANY_SIZES.find(s => s.value === companySize);
        const revenue = sizeConfig?.revenue || 0;

        let baseFine = revenue * LGPD_CONFIG.baseMultiplier;
        const sectorMultiplier = LGPD_CONFIG.sectorRisk[sector] || 1.0;
        baseFine *= sectorMultiplier;

        const dataMultiplier = selectedDataTypes.reduce((acc, dt) => {
            return acc + (LGPD_CONFIG.dataTypeRisk[dt] || 1.0);
        }, 0) / selectedDataTypes.length;
        baseFine *= dataMultiplier;

        const aiConfig = AI_USAGE.find(a => a.value === aiUsage);
        const aiMultiplier = aiConfig?.multiplier || 1.0;
        baseFine *= aiMultiplier;

        const governanceDiscount = hasGovernance ? 0.4 : 0;
        baseFine *= (1 - governanceDiscount);
        baseFine = Math.min(baseFine, LGPD_CONFIG.maxFine);

        const operationalRisk = LGPD_CONFIG.perIncidentBase * dataMultiplier * aiMultiplier * 12;
        const reputationalRisk = revenue * 0.15 * sectorMultiplier;

        return {
            legalFine: Math.round(baseFine),
            operationalRisk: Math.round(operationalRisk),
            reputationalRisk: Math.round(reputationalRisk),
            totalExposure: Math.round(baseFine + operationalRisk + reputationalRisk),
            percentOfMax: (baseFine / LGPD_CONFIG.maxFine) * 100,
            savingsWithGovernance: Math.round((baseFine / (1 - governanceDiscount)) * governanceDiscount),
            riskLevel: baseFine > 10_000_000 ? 'critical' : baseFine > 1_000_000 ? 'high' : baseFine > 100_000 ? 'medium' : 'low'
        };
    }, [sector, companySize, selectedDataTypes, aiUsage, hasGovernance]);

    const handleCalculate = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
            setShowResult(true);
        }, 2000);
    };

    const formatCurrency = (value: number) => {
        if (value >= 1_000_000_000) return `R$ ${(value / 1_000_000_000).toFixed(1)} bi`;
        if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)} mi`;
        if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(0)} mil`;
        return `R$ ${value.toLocaleString('pt-BR')}`;
    };

    const canProceed = () => {
        switch (step) {
            case 0: return !!sector;
            case 1: return !!companySize;
            case 2: return selectedDataTypes.length > 0;
            case 3: return !!aiUsage;
            case 4: return hasGovernance !== null;
            default: return false;
        }
    };

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
        else handleCalculate();
    };

    return (
        <div className="min-h-screen bg-[#0A0E1A] pt-44 pb-16">
            {/* Background ambient */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Exposição LGPD</span>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Descubra quanto sua empresa pode perder em multas e riscos operacionais
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key="wizard"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <StepIndicator currentStep={step} totalSteps={5} />

                            {/* Wizard Card */}
                            <motion.div
                                className="bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl"
                                layout
                            >
                                <AnimatePresence mode="wait">
                                    {/* Step 0: Sector */}
                                    {step === 0 && (
                                        <motion.div
                                            key="step0"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                                    <Building2 className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">Qual é o setor da sua empresa?</h3>
                                                    <p className="text-gray-500 text-sm">Setores regulados têm maior exposição</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3">
                                                {SECTORS.map(s => (
                                                    <motion.button
                                                        key={s.value}
                                                        onClick={() => setSector(s.value)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${sector === s.value
                                                            ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20'
                                                            : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        <span className="text-2xl">{s.icon}</span>
                                                        <span className={`text-sm ${sector === s.value ? 'text-blue-400' : 'text-gray-400'}`}>
                                                            {s.label}
                                                        </span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 1: Size */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                                    <BarChart3 className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">Qual o faturamento anual?</h3>
                                                    <p className="text-gray-500 text-sm">A multa é calculada como % do faturamento</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 gap-3">
                                                {COMPANY_SIZES.map(size => (
                                                    <motion.button
                                                        key={size.value}
                                                        onClick={() => setCompanySize(size.value)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`p-4 rounded-xl border text-center transition-all ${companySize === size.value
                                                            ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/20'
                                                            : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        <span className={`text-sm font-medium ${companySize === size.value ? 'text-emerald-400' : 'text-gray-400'}`}>
                                                            {size.label}
                                                        </span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Data Types */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                                    <Database className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">Quais dados você processa?</h3>
                                                    <p className="text-gray-500 text-sm">Selecione todos os tipos aplicáveis</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                {DATA_TYPES.map(dt => (
                                                    <motion.button
                                                        key={dt.id}
                                                        onClick={() => toggleDataType(dt.id)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`p-5 rounded-xl border text-left transition-all flex items-center gap-4 ${selectedDataTypes.includes(dt.id)
                                                            ? 'bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/20'
                                                            : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedDataTypes.includes(dt.id) ? 'bg-purple-500/30' : 'bg-gray-700'
                                                            }`}>
                                                            <dt.icon className={`w-5 h-5 ${selectedDataTypes.includes(dt.id) ? 'text-purple-400' : 'text-gray-400'}`} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={`font-medium ${selectedDataTypes.includes(dt.id) ? 'text-purple-400' : 'text-gray-300'}`}>
                                                                {dt.label}
                                                            </p>
                                                            <span className={`text-xs px-2 py-0.5 rounded ${dt.risk === 'critical' ? 'bg-red-500/20 text-red-400' :
                                                                dt.risk === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                                                    'bg-amber-500/20 text-amber-400'
                                                                }`}>
                                                                {dt.risk === 'critical' ? 'Sensível' : dt.risk === 'high' ? 'Alto risco' : 'Médio risco'}
                                                            </span>
                                                        </div>
                                                        {selectedDataTypes.includes(dt.id) && (
                                                            <CheckCircle2 className="w-5 h-5 text-purple-400" />
                                                        )}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: AI Usage */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                                    <Zap className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">Qual o nível de uso de IA?</h3>
                                                    <p className="text-gray-500 text-sm">IA aumenta exposição regulatória</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {AI_USAGE.map(ai => (
                                                    <motion.button
                                                        key={ai.value}
                                                        onClick={() => setAiUsage(ai.value)}
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        className={`w-full p-5 rounded-xl border text-left transition-all flex items-center justify-between ${aiUsage === ai.value
                                                            ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/20'
                                                            : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        <span className={`font-medium ${aiUsage === ai.value ? 'text-amber-400' : 'text-gray-300'}`}>
                                                            {ai.label}
                                                        </span>
                                                        <div className="flex items-center gap-3">
                                                            {ai.multiplier > 1 && (
                                                                <span className={`text-xs px-3 py-1 rounded-full ${ai.risk === 'critical' ? 'bg-red-500/20 text-red-400' :
                                                                    ai.risk === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                                                        ai.risk === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                                                                            'bg-gray-500/20 text-gray-400'
                                                                    }`}>
                                                                    +{((ai.multiplier - 1) * 100).toFixed(0)}% risco
                                                                </span>
                                                            )}
                                                            {aiUsage === ai.value && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 4: Governance */}
                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                                    <Shield className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">Você possui governança de IA?</h3>
                                                    <p className="text-gray-500 text-sm">Governança reduz multas em até 40%</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <motion.button
                                                    onClick={() => setHasGovernance(true)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`p-8 rounded-2xl border transition-all flex flex-col items-center gap-4 ${hasGovernance === true
                                                        ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/20'
                                                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                                                        }`}
                                                >
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${hasGovernance === true ? 'bg-emerald-500/30' : 'bg-gray-700'
                                                        }`}>
                                                        <CheckCircle2 className={`w-8 h-8 ${hasGovernance === true ? 'text-emerald-400' : 'text-gray-400'}`} />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className={`font-bold text-lg ${hasGovernance === true ? 'text-emerald-400' : 'text-white'}`}>
                                                            Sim, temos
                                                        </p>
                                                        <p className="text-emerald-400/70 text-sm mt-1">-40% na multa</p>
                                                    </div>
                                                </motion.button>

                                                <motion.button
                                                    onClick={() => setHasGovernance(false)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`p-8 rounded-2xl border transition-all flex flex-col items-center gap-4 ${hasGovernance === false
                                                        ? 'bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20'
                                                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                                                        }`}
                                                >
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${hasGovernance === false ? 'bg-red-500/30' : 'bg-gray-700'
                                                        }`}>
                                                        <AlertTriangle className={`w-8 h-8 ${hasGovernance === false ? 'text-red-400' : 'text-gray-400'}`} />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className={`font-bold text-lg ${hasGovernance === false ? 'text-red-400' : 'text-white'}`}>
                                                            Não temos
                                                        </p>
                                                        <p className="text-red-400/70 text-sm mt-1">Exposição total</p>
                                                    </div>
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800">
                                    <button
                                        onClick={() => setStep(Math.max(0, step - 1))}
                                        className={`px-6 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors ${step === 0 ? 'invisible' : ''}`}
                                    >
                                        ← Voltar
                                    </button>

                                    <motion.button
                                        onClick={nextStep}
                                        disabled={!canProceed() || isCalculating}
                                        whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                                        whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                                        className={`px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all ${canProceed() && !isCalculating
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {isCalculating ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Calculando...
                                            </>
                                        ) : step === 4 ? (
                                            <>
                                                <Calculator className="w-5 h-5" />
                                                Calcular Exposição
                                            </>
                                        ) : (
                                            <>
                                                Próximo
                                                <ChevronRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {result && (
                                <>
                                    {/* Main Result Card */}
                                    <div className="bg-gradient-to-b from-[#131825]/90 to-[#0A0E1A]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">

                                        {/* Gauge */}
                                        <ExposureGauge value={result.legalFine} maxValue={LGPD_CONFIG.maxFine} />

                                        {/* Total Exposure */}
                                        <div className="text-center mt-6 mb-8">
                                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Exposição Financeira Total</p>
                                            <motion.p
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: "spring", duration: 0.5 }}
                                                className={`text-5xl md:text-6xl font-bold font-mono ${result.riskLevel === 'critical' || result.riskLevel === 'high' ? 'text-red-400' :
                                                    result.riskLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400'
                                                    }`}
                                            >
                                                {formatCurrency(result.totalExposure)}
                                            </motion.p>
                                            <p className="text-gray-500 text-sm mt-2">por ano</p>
                                        </div>

                                        {/* Breakdown Cards */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-center"
                                            >
                                                <Scale className="w-6 h-6 text-red-400 mx-auto mb-2" />
                                                <p className="text-gray-500 text-xs uppercase mb-1">Multa ANPD</p>
                                                <p className="text-2xl font-bold text-red-400 font-mono">{formatCurrency(result.legalFine)}</p>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-center"
                                            >
                                                <TrendingDown className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                                <p className="text-gray-500 text-xs uppercase mb-1">Risco Operacional</p>
                                                <p className="text-2xl font-bold text-amber-400 font-mono">{formatCurrency(result.operationalRisk)}</p>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 text-center"
                                            >
                                                <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                                                <p className="text-gray-500 text-xs uppercase mb-1">Risco Reputacional</p>
                                                <p className="text-2xl font-bold text-orange-400 font-mono">{formatCurrency(result.reputationalRisk)}</p>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Governance Savings */}
                                    {!hasGovernance && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-6"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                                    <Sparkles className="w-7 h-7 text-emerald-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-bold text-lg mb-1">Com Governança você economizaria</h4>
                                                    <p className="text-4xl font-bold text-emerald-400 font-mono mb-2">
                                                        {formatCurrency(result.legalFine * 0.67)}
                                                        <span className="text-lg text-emerald-400/70">/ano</span>
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        Empresas com governança estruturada têm até 40% de redução em multas
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* CTA */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8 text-center"
                                    >
                                        <h3 className="text-2xl font-bold text-white mb-2">Proteja sua Empresa</h3>
                                        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                                            Nossa plataforma reduz riscos, automatiza conformidade e gera relatórios para auditoria.
                                        </p>
                                        <div className="flex gap-4 justify-center flex-wrap">
                                            <Link href="/register">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 flex items-center gap-2"
                                                >
                                                    Começar Gratuitamente
                                                    <ArrowRight className="w-5 h-5" />
                                                </motion.button>
                                            </Link>
                                            <Link href="/scanner">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 flex items-center gap-2"
                                                >
                                                    Testar Scanner de IA
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </motion.div>

                                    {/* Recalculate */}
                                    <button
                                        onClick={() => { setShowResult(false); setStep(0); }}
                                        className="w-full py-4 text-gray-400 hover:text-white transition-colors text-sm text-center"
                                    >
                                        ← Fazer novo cálculo
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Disclaimer */}
                <p className="text-center text-gray-600 text-xs mt-12">
                    * Estimativas baseadas na LGPD (Lei 13.709/2018). Consulte um advogado para análise específica.
                </p>
            </div>
        </div>
    );
}
