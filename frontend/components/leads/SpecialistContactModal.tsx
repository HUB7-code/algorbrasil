'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Phone, Building2, User, Mail, Briefcase, MessageSquare,
    CheckCircle2, Loader2, Users, Clock, Zap, Shield, TrendingUp
} from 'lucide-react';

// ========================================
// ESTÁGIO 3 - FUNDO DE FUNIL
// Objetivo: Qualificação máxima, preparar vendas
// ========================================

interface SpecialistContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    source?: string;
}

// Roles/Positions
const roles = [
    { id: 'cto', label: 'CTO/Head de TI' },
    { id: 'dpo', label: 'DPO/Compliance' },
    { id: 'ceo', label: 'CEO/C-Level' },
    { id: 'pm', label: 'Gerente de Projetos' },
    { id: 'dev', label: 'Desenvolvedor/Eng. Software' },
    { id: 'other', label: 'Outro' },
];

// Company sizes
const companySizes = [
    { id: '10-50', label: '10-50 funcionários' },
    { id: '51-200', label: '51-200 funcionários' },
    { id: '201-1000', label: '201-1000 funcionários' },
    { id: '1000+', label: '1000+ funcionários' },
];

// AI Request volumes
const aiVolumes = [
    { id: '<10k', label: '< 10.000' },
    { id: '10k-100k', label: '10.000 - 100.000' },
    { id: '100k-1M', label: '100.000 - 1M' },
    { id: '1M+', label: '1M+' },
];

// Urgency levels
const urgencyLevels = [
    { id: 'exploring', label: 'Explorando (próximos 6 meses)', color: 'blue' },
    { id: 'planning', label: 'Planejando (próximos 3 meses)', color: 'amber' },
    { id: 'urgent', label: 'Urgente (próximas 4 semanas)', color: 'red' },
];

// Contact times
const contactTimes = [
    { id: 'morning', label: 'Manhã (9h-12h)' },
    { id: 'afternoon', label: 'Tarde (14h-17h)' },
    { id: 'flexible', label: 'Flexível' },
];

export default function SpecialistContactModal({ isOpen, onClose, source = 'enterprise-cta' }: SpecialistContactModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        otherRole: '',
        companySize: '',
        aiVolume: '',
        urgency: '',
        comments: '',
        contactTime: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validações
        if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.role) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validar email corporativo
        const personalDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'protonmail.com'];
        const emailDomain = formData.email.split('@')[1]?.toLowerCase();
        if (personalDomains.includes(emailDomain)) {
            setError('Por favor, utilize seu email corporativo.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/v1/leads/specialist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    role: formData.role,
                    company_size: formData.companySize,
                    ai_volume: formData.aiVolume,
                    urgency: formData.urgency,
                    contact_time: formData.contactTime,
                    comments: formData.comments,
                    source: source,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Erro ao enviar formulário');
            }

            const leadData = await response.json();
            console.log('Lead Enterprise salvo com sucesso:', leadData);

            setIsSuccess(true);
        } catch (err: any) {
            console.error('Erro ao salvar lead:', err);
            setError(err.message || 'Ocorreu um erro. Por favor, tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Sistema de pontuação para priorização de leads
    const calculateLeadScore = (data: typeof formData): number => {
        let score = 0;

        // Cargo (máx 30 pontos)
        if (['cto', 'ceo', 'dpo'].includes(data.role)) score += 30;
        else if (['pm'].includes(data.role)) score += 20;
        else score += 10;

        // Tamanho da empresa (máx 25 pontos)
        if (data.companySize === '1000+') score += 25;
        else if (data.companySize === '201-1000') score += 20;
        else if (data.companySize === '51-200') score += 15;
        else score += 10;

        // Volume de IA (máx 25 pontos)
        if (data.aiVolume === '1M+') score += 25;
        else if (data.aiVolume === '100k-1M') score += 20;
        else if (data.aiVolume === '10k-100k') score += 15;
        else score += 10;

        // Urgência (máx 20 pontos)
        if (data.urgency === 'urgent') score += 20;
        else if (data.urgency === 'planning') score += 15;
        else score += 5;

        return score;
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            role: '',
            otherRole: '',
            companySize: '',
            aiVolume: '',
            urgency: '',
            comments: '',
            contactTime: '',
        });
        setIsSuccess(false);
        setError('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[9999] flex items-start justify-center pt-32 pb-8 px-4 overflow-y-auto pointer-events-none"
                    >
                        <div
                            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#131825] to-[#0A0E1A] border border-gray-800 rounded-3xl shadow-2xl pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-gradient-to-b from-[#131825] to-transparent px-8 pt-8 pb-4 z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Falar com Especialista</h2>
                                            <p className="text-gray-400 text-sm">Engenheiros de Soluções Enterprise</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="w-10 h-10 rounded-xl bg-gray-800/50 hover:bg-gray-800 flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-8 pb-8">
                                {isSuccess ? (
                                    /* Success State */
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-12"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.2 }}
                                            className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6"
                                        >
                                            <CheckCircle2 className="w-12 h-12 text-blue-400" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Perfeito! Vamos te ligar.</h3>
                                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                            Um de nossos engenheiros de soluções entrará em contato no horário indicado para entender suas necessidades e apresentar uma proposta personalizada.
                                        </p>
                                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                                            <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-4 text-center">
                                                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                                <p className="text-xs text-gray-400">Resposta em</p>
                                                <p className="text-white font-bold">24h</p>
                                            </div>
                                            <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-4 text-center">
                                                <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                                <p className="text-xs text-gray-400">Time</p>
                                                <p className="text-white font-bold">Dedicado</p>
                                            </div>
                                            <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-4 text-center">
                                                <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                                <p className="text-xs text-gray-400">Proposta</p>
                                                <p className="text-white font-bold">Custom</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* Form */
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Basic Info - Grid */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    <User className="w-4 h-4 inline mr-2" />
                                                    Nome completo *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    placeholder="Seu nome"
                                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    <Mail className="w-4 h-4 inline mr-2" />
                                                    Email corporativo *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    placeholder="voce@suaempresa.com.br"
                                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    <Phone className="w-4 h-4 inline mr-2" />
                                                    Telefone (WhatsApp) *
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                    placeholder="(00) 00000-0000"
                                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    <Building2 className="w-4 h-4 inline mr-2" />
                                                    Empresa *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                                    placeholder="Nome da empresa"
                                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Role Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                <Briefcase className="w-4 h-4 inline mr-2" />
                                                Cargo/Função *
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {roles.map((role) => (
                                                    <button
                                                        key={role.id}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                                                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${formData.role === role.id
                                                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                                            : 'bg-gray-800/30 border-gray-700 text-gray-400 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        {role.label}
                                                    </button>
                                                ))}
                                            </div>
                                            {formData.role === 'other' && (
                                                <input
                                                    type="text"
                                                    value={formData.otherRole}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, otherRole: e.target.value }))}
                                                    placeholder="Especifique seu cargo"
                                                    className="mt-3 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                                                />
                                            )}
                                        </div>

                                        {/* Company Size */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                <Users className="w-4 h-4 inline mr-2" />
                                                Tamanho da empresa
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {companySizes.map((size) => (
                                                    <button
                                                        key={size.id}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, companySize: size.id }))}
                                                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${formData.companySize === size.id
                                                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                                                            : 'bg-gray-800/30 border-gray-700 text-gray-400 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        {size.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* AI Volume */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                <TrendingUp className="w-4 h-4 inline mr-2" />
                                                Volume de requisições IA/mês
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {aiVolumes.map((volume) => (
                                                    <button
                                                        key={volume.id}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, aiVolume: volume.id }))}
                                                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${formData.aiVolume === volume.id
                                                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                                            : 'bg-gray-800/30 border-gray-700 text-gray-400 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        {volume.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Urgency */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                <Clock className="w-4 h-4 inline mr-2" />
                                                Urgência do projeto
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                {urgencyLevels.map((level) => (
                                                    <button
                                                        key={level.id}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, urgency: level.id }))}
                                                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${formData.urgency === level.id
                                                            ? level.color === 'red'
                                                                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                                                                : level.color === 'amber'
                                                                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                                                                    : 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                                            : 'bg-gray-800/30 border-gray-700 text-gray-400 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        {level.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Comments */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <MessageSquare className="w-4 h-4 inline mr-2" />
                                                Comentários adicionais <span className="text-gray-500">(opcional)</span>
                                            </label>
                                            <textarea
                                                value={formData.comments}
                                                onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                                                placeholder="Descreva sua situação atual ou dúvidas específicas..."
                                                rows={3}
                                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                                            />
                                        </div>

                                        {/* Contact Time */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                <Clock className="w-4 h-4 inline mr-2" />
                                                Melhor horário para contato
                                            </label>
                                            <div className="flex flex-wrap gap-3">
                                                {contactTimes.map((time) => (
                                                    <button
                                                        key={time.id}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, contactTime: time.id }))}
                                                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${formData.contactTime === time.id
                                                            ? 'bg-gray-700 border-gray-600 text-white'
                                                            : 'bg-gray-800/30 border-gray-700 text-gray-400 hover:border-gray-600'
                                                            }`}
                                                    >
                                                        {time.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Error Message */}
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm"
                                            >
                                                {error}
                                            </motion.div>
                                        )}

                                        {/* Submit */}
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    Solicitar Contato
                                                    <Phone className="w-5 h-5" />
                                                </>
                                            )}
                                        </motion.button>

                                        {/* Trust Indicators */}
                                        <div className="flex items-center justify-center gap-6 pt-4 text-gray-500 text-xs">
                                            <span className="flex items-center gap-1">
                                                <Shield className="w-3 h-3" />
                                                Dados protegidos
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" />
                                                Sem spam
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                Time dedicado
                                            </span>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
