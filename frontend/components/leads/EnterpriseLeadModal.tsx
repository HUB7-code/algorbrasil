'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Zap, Building2, User, Mail, AlertTriangle,
    CheckCircle2, Loader2, Bot, Shield, Database, FileWarning,
    Sparkles, ArrowRight
} from 'lucide-react';

// ========================================
// ESTÁGIO 2 - MEIO DE FUNIL
// Design: Power BI Premium Dark Mode
// ========================================

interface EnterpriseLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    source?: string;
}

// AI Providers - Multi-select
const aiProviders = [
    { id: 'openai', label: 'OpenAI', sublabel: 'ChatGPT/GPT-4', color: '#10B981', icon: '🤖' },
    { id: 'anthropic', label: 'Anthropic', sublabel: 'Claude', color: '#8B5CF6', icon: '🧠' },
    { id: 'azure', label: 'Azure', sublabel: 'OpenAI', color: '#3B82F6', icon: '☁️' },
    { id: 'google', label: 'Google', sublabel: 'Gemini', color: '#F59E0B', icon: '✨' },
    { id: 'aws', label: 'AWS', sublabel: 'Bedrock', color: '#EF4444', icon: '📦' },
    { id: 'other', label: 'Outro', sublabel: 'Especificar', color: '#6B7280', icon: '🔧' },
];

// Pain Points - Multi-select (max 2)
const painPoints = [
    { id: 'lgpd', label: 'Vazamento de Dados', sublabel: 'Compliance LGPD', icon: Database, color: '#EF4444', gradient: 'from-red-500 to-orange-500' },
    { id: 'hallucinations', label: 'Alucinações', sublabel: 'Custos operacionais', icon: AlertTriangle, color: '#F59E0B', gradient: 'from-amber-500 to-yellow-500' },
    { id: 'audit', label: 'Audit Trail', sublabel: 'Rastreabilidade', icon: FileWarning, color: '#3B82F6', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'security', label: 'Segurança', sublabel: 'Prompt injection', icon: Shield, color: '#8B5CF6', gradient: 'from-purple-500 to-pink-500' },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

export default function EnterpriseLeadModal({ isOpen, onClose, source = 'enterprise-page' }: EnterpriseLeadModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        aiProviders: [] as string[],
        painPoints: [] as string[],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleProviderToggle = (providerId: string) => {
        setFormData(prev => ({
            ...prev,
            aiProviders: prev.aiProviders.includes(providerId)
                ? prev.aiProviders.filter(id => id !== providerId)
                : [...prev.aiProviders, providerId]
        }));
    };

    const handlePainPointToggle = (painId: string) => {
        if (formData.painPoints.includes(painId)) {
            setFormData(prev => ({
                ...prev,
                painPoints: prev.painPoints.filter(id => id !== painId)
            }));
        } else if (formData.painPoints.length < 2) {
            setFormData(prev => ({
                ...prev,
                painPoints: [...prev.painPoints, painId]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const personalDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'protonmail.com'];
        const emailDomain = formData.email.split('@')[1]?.toLowerCase();
        if (personalDomains.includes(emailDomain)) {
            setError('Por favor, utilize seu email corporativo.');
            return;
        }

        if (formData.aiProviders.length === 0) {
            setError('Selecione pelo menos uma IA que você utiliza.');
            return;
        }

        setIsSubmitting(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
            const response = await fetch(`${apiUrl}/leads/diagnostic`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    ai_providers: formData.aiProviders,
                    pain_points: formData.painPoints,
                    source: source,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Erro ao enviar formulário');
            }

            const leadData = await response.json();
            console.log('Lead salvo com sucesso:', leadData);

            setIsSuccess(true);
        } catch (err: any) {
            console.error('Erro ao salvar lead:', err);
            setError(err.message || 'Ocorreu um erro. Por favor, tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            company: '',
            aiProviders: [],
            painPoints: [],
        });
        setIsSuccess(false);
        setError('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
                        onClick={handleClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`fixed inset-0 z-[9999] flex justify-center px-4 overflow-y-auto pointer-events-none ${isSuccess
                            ? 'items-center py-8'
                            : 'items-start pt-28 pb-8'
                            }`}
                    >
                        <div
                            className="relative w-full max-w-2xl pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Ambient glow effects */}
                            <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

                            {/* Modal Card */}
                            <div className="relative bg-gradient-to-b from-[#131825] via-[#0F1219] to-[#0A0E1A] border border-gray-800/50 rounded-3xl shadow-2xl overflow-hidden">

                                {/* Gradient border effect */}
                                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-emerald-500/20 via-transparent to-blue-500/20 pointer-events-none" />

                                {/* Header */}
                                <div className="relative px-8 pt-8 pb-6 border-b border-gray-800/50">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5" />

                                    <div className="relative flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Animated icon */}
                                            <motion.div
                                                className="relative"
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                            >
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                                    <Zap className="w-7 h-7 text-white" />
                                                </div>
                                                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center animate-pulse">
                                                    <Sparkles className="w-2.5 h-2.5 text-white" />
                                                </div>
                                            </motion.div>

                                            <div>
                                                <h2 className="text-2xl font-bold text-white tracking-tight">
                                                    Diagnóstico Técnico
                                                </h2>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                                                        Gratuito
                                                    </span>
                                                    <span className="text-gray-500 text-sm">•</span>
                                                    <span className="text-gray-400 text-sm">Sem compromisso</span>
                                                </div>
                                            </div>
                                        </div>

                                        <motion.button
                                            onClick={handleClose}
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-10 h-10 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 flex items-center justify-center transition-colors"
                                        >
                                            <X className="w-5 h-5 text-gray-400" />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative px-8 py-8">
                                    {isSuccess ? (
                                        /* Success State - Premium */
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', delay: 0.1 }}
                                                className="relative w-28 h-28 mx-auto mb-8"
                                            >
                                                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                                                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                    <CheckCircle2 className="w-14 h-14 text-emerald-400" />
                                                </div>
                                            </motion.div>

                                            <h3 className="text-2xl font-bold text-white mb-3">
                                                Solicitação Recebida!
                                            </h3>
                                            <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                                                Nossa equipe de engenheiros entrará em contato em até{' '}
                                                <span className="text-white font-mono font-bold">24h</span>{' '}
                                                para agendar seu diagnóstico técnico personalizado.
                                            </p>

                                            <motion.a
                                                href="/calculadora"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-medium hover:border-emerald-500/50 transition-all"
                                            >
                                                Calcular Minha Exposição LGPD
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.a>
                                        </motion.div>
                                    ) : (
                                        /* Form - Premium Design */
                                        <motion.form
                                            onSubmit={handleSubmit}
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="space-y-6"
                                        >
                                            {/* Basic Info Grid */}
                                            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                                        <User className="w-4 h-4 text-gray-500" />
                                                        Nome completo
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                        placeholder="Seu nome"
                                                        className="w-full px-4 py-3.5 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all font-light"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                                        <Building2 className="w-4 h-4 text-gray-500" />
                                                        Empresa
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.company}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                                        placeholder="Nome da empresa"
                                                        className="w-full px-4 py-3.5 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all font-light"
                                                        required
                                                    />
                                                </div>
                                            </motion.div>

                                            <motion.div variants={itemVariants} className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                                    <Mail className="w-4 h-4 text-gray-500" />
                                                    Email corporativo
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    placeholder="voce@suaempresa.com.br"
                                                    className="w-full px-4 py-3.5 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all font-light"
                                                    required
                                                />
                                                <p className="text-gray-600 text-xs flex items-center gap-1">
                                                    <Shield className="w-3 h-3" />
                                                    Emails pessoais não são aceitos
                                                </p>
                                            </motion.div>

                                            {/* AI Providers - Premium Cards */}
                                            <motion.div variants={itemVariants} className="space-y-3">
                                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                                    <Bot className="w-4 h-4 text-gray-500" />
                                                    Qual IA você está usando?
                                                    <span className="text-emerald-400 text-xs font-normal">(selecione todas)</span>
                                                </label>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {aiProviders.map((provider) => {
                                                        const isSelected = formData.aiProviders.includes(provider.id);
                                                        return (
                                                            <motion.button
                                                                key={provider.id}
                                                                type="button"
                                                                onClick={() => handleProviderToggle(provider.id)}
                                                                whileHover={{ scale: 1.02, y: -2 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                className={`relative p-4 rounded-xl border text-left transition-all overflow-hidden ${isSelected
                                                                    ? 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/50'
                                                                    : 'bg-[#0A0E1A] border-gray-800 hover:border-gray-700'
                                                                    }`}
                                                            >
                                                                {isSelected && (
                                                                    <motion.div
                                                                        layoutId={`provider-check-${provider.id}`}
                                                                        className="absolute top-2 right-2"
                                                                    >
                                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                                    </motion.div>
                                                                )}
                                                                <span className="text-2xl mb-2 block">{provider.icon}</span>
                                                                <p className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                                                    {provider.label}
                                                                </p>
                                                                <p className="text-xs text-gray-500">{provider.sublabel}</p>
                                                            </motion.button>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>

                                            {/* Pain Points - Premium Selection */}
                                            <motion.div variants={itemVariants} className="space-y-3">
                                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                                    <AlertTriangle className="w-4 h-4 text-gray-500" />
                                                    Maior preocupação atual
                                                    <span className="text-gray-500 text-xs font-normal">(até 2)</span>
                                                </label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {painPoints.map((pain) => {
                                                        const isSelected = formData.painPoints.includes(pain.id);
                                                        const isDisabled = !isSelected && formData.painPoints.length >= 2;
                                                        const IconComponent = pain.icon;

                                                        return (
                                                            <motion.button
                                                                key={pain.id}
                                                                type="button"
                                                                onClick={() => handlePainPointToggle(pain.id)}
                                                                disabled={isDisabled}
                                                                whileHover={!isDisabled ? { scale: 1.01, y: -1 } : {}}
                                                                whileTap={!isDisabled ? { scale: 0.99 } : {}}
                                                                className={`relative p-4 rounded-xl border text-left transition-all ${isSelected
                                                                    ? 'border-transparent'
                                                                    : isDisabled
                                                                        ? 'bg-[#0A0E1A] border-gray-800/50 opacity-40 cursor-not-allowed'
                                                                        : 'bg-[#0A0E1A] border-gray-800 hover:border-gray-700'
                                                                    }`}
                                                                style={isSelected ? {
                                                                    background: `linear-gradient(135deg, ${pain.color}15, transparent)`,
                                                                    borderColor: `${pain.color}50`
                                                                } : {}}
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <div
                                                                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? `bg-gradient-to-br ${pain.gradient}` : 'bg-gray-800'
                                                                            }`}
                                                                    >
                                                                        <IconComponent className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                                                                    </div>
                                                                    <div>
                                                                        <p className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                                                            {pain.label}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">{pain.sublabel}</p>
                                                                    </div>
                                                                </div>

                                                                {isSelected && (
                                                                    <motion.div
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        className="absolute top-2 right-2"
                                                                    >
                                                                        <CheckCircle2 className="w-4 h-4" style={{ color: pain.color }} />
                                                                    </motion.div>
                                                                )}
                                                            </motion.button>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>

                                            {/* Error Message */}
                                            <AnimatePresence>
                                                {error && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10, height: 0 }}
                                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                        exit={{ opacity: 0, y: -10, height: 0 }}
                                                        className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-center gap-2"
                                                    >
                                                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                                        {error}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Submit Button - Premium */}
                                            <motion.button
                                                variants={itemVariants}
                                                type="submit"
                                                disabled={isSubmitting}
                                                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                                                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                                                className="relative w-full py-4 rounded-xl font-bold text-white shadow-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
                                            >
                                                {/* Button gradient background */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 bg-[length:200%_100%] group-hover:animate-shimmer" />

                                                {/* Button glow */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-50 blur-xl group-hover:opacity-70 transition-opacity" />

                                                <span className="relative flex items-center justify-center gap-3">
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            Processando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Solicitar Diagnóstico Gratuito
                                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </span>
                                            </motion.button>

                                            {/* Trust Indicators */}
                                            <motion.div
                                                variants={itemVariants}
                                                className="flex items-center justify-center gap-6 pt-2 text-gray-500 text-xs"
                                            >
                                                <span className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                    Dados protegidos
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                    Sem spam
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                    Resposta em 24h
                                                </span>
                                            </motion.div>
                                        </motion.form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
