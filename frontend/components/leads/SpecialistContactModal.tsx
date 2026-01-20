'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Phone, Building2, User, Mail, Briefcase, MessageSquare,
    CheckCircle2, Loader2, Users, Clock, Shield, TrendingUp, Sparkles, ArrowRight
} from 'lucide-react';

// ========================================
// ESTÁGIO 3 - FUNDO DE FUNIL
// Design: Quantum Prestige / Power BI Premium Dark Mode
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
    { id: 'dev', label: 'Desenvolvedor/Eng.' },
    { id: 'other', label: 'Outro' },
];

// Company sizes
const companySizes = [
    { id: '10-50', label: '10-50 colaboradores' },
    { id: '51-200', label: '51-200 colaboradores' },
    { id: '201-1000', label: '201-1000 colaboradores' },
    { id: '1000+', label: '1000+ colaboradores' },
];

// AI Request volumes
const aiVolumes = [
    { id: '<10k', label: '< 10k req/mês' },
    { id: '10k-100k', label: '10k - 100k req/mês' },
    { id: '100k-1M', label: '100k - 1M req/mês' },
    { id: '1M+', label: '1M+ req/mês' },
];

// Urgency levels
const urgencyLevels = [
    { id: 'urgent', label: 'Urgente (4 semanas)', color: 'red', gradient: 'from-red-500 to-orange-500' },
    { id: 'planning', label: 'Planejando (3 meses)', color: 'amber', gradient: 'from-amber-500 to-yellow-500' },
    { id: 'exploring', label: 'Explorando (6 meses)', color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
];

// Contact times
const contactTimes = [
    { id: 'morning', label: 'Manhã (9h-12h)' },
    { id: 'afternoon', label: 'Tarde (14h-18h)' },
    { id: 'flexible', label: 'Qualquer Horário' },
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

        if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.role) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

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
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`fixed inset-0 z-[9999] flex justify-center px-4 overflow-y-auto pointer-events-none ${isSuccess ? 'items-center py-8' : 'items-start pt-20 pb-8'}`}
                    >
                        <div
                            className="relative w-full max-w-3xl pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Ambient Glows */}
                            <div className="absolute -top-32 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                            <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

                            <div className="relative bg-gradient-to-b from-[#131825] via-[#0F1219] to-[#0A0E1A] border border-gray-800/80 rounded-[32px] shadow-2xl shadow-black/50 overflow-hidden">

                                {/* Gradient Border */}
                                <div className="absolute inset-0 rounded-[32px] p-[1px] bg-gradient-to-b from-blue-500/20 via-transparent to-purple-500/20 pointer-events-none" />

                                {/* Header */}
                                <div className="relative px-8 pt-8 pb-6 border-b border-gray-800/50 bg-[#131825]/50 backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 ring-1 ring-white/10"
                                            >
                                                <Phone className="w-7 h-7 text-white" />
                                            </motion.div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white tracking-tight">Falar com Especialista</h2>
                                                <p className="text-gray-400 text-xs font-medium tracking-wide flex items-center gap-2 mt-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    ENGENHARIA DE SOLUÇÕES
                                                </p>
                                            </div>
                                        </div>
                                        <motion.button
                                            onClick={handleClose}
                                            whileHover={{ scale: 1.1, rotate: 90, backgroundColor: "rgba(255,255,255,0.1)" }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors"
                                        >
                                            <X className="w-5 h-5 text-gray-400" />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative px-8 py-8">
                                    {isSuccess ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', delay: 0.2 }}
                                                className="relative w-32 h-32 mx-auto mb-8"
                                            >
                                                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                                                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 flex items-center justify-center ring-1 ring-emerald-500/40">
                                                    <CheckCircle2 className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                                </div>
                                            </motion.div>

                                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Solicitação Confirmada</h3>
                                            <p className="text-gray-300 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                                                Nossa equipe de engenharia de IA recebeu seu perfil e entrará em contato dentro de <span className="text-emerald-400 font-bold">24 horas</span>.
                                            </p>

                                            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                                                {[
                                                    { icon: Clock, label: "SLA", val: "24h", col: "text-blue-400" },
                                                    { icon: Users, label: "Time", val: "Senior", col: "text-purple-400" },
                                                    { icon: Shield, label: "Privacidade", val: "Blindada", col: "text-emerald-400" }
                                                ].map((stat, i) => (
                                                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                                        <stat.icon className={`w-6 h-6 ${stat.col} mx-auto mb-2`} />
                                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">{stat.label}</p>
                                                        <p className="text-white font-bold">{stat.val}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            {/* Grid Layout for Form */}
                                            <div className="grid lg:grid-cols-2 gap-x-8 gap-y-6">

                                                {/* Left Column */}
                                                <div className="space-y-5">
                                                    <div className="space-y-4">
                                                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                            <User className="w-4 h-4 text-blue-500" />
                                                            Identificação
                                                        </h4>
                                                        <div className="space-y-3">
                                                            <input
                                                                type="text"
                                                                value={formData.name}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                                placeholder="Nome completo"
                                                                className="w-full px-4 py-3 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                                                                required
                                                            />
                                                            <input
                                                                type="email"
                                                                value={formData.email}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                                placeholder="Email corporativo"
                                                                className="w-full px-4 py-3 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                                                                required
                                                            />
                                                            <input
                                                                type="tel"
                                                                value={formData.phone}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                                placeholder="Telefone / WhatsApp"
                                                                className="w-full px-4 py-3 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                            <Building2 className="w-4 h-4 text-purple-500" />
                                                            Empresa
                                                        </h4>
                                                        <div className="space-y-3">
                                                            <input
                                                                type="text"
                                                                value={formData.company}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                                                placeholder="Nome da empresa"
                                                                className="w-full px-4 py-3 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                                                                required
                                                            />
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {companySizes.map((size) => (
                                                                    <button
                                                                        key={size.id}
                                                                        type="button"
                                                                        onClick={() => setFormData(prev => ({ ...prev, companySize: size.id }))}
                                                                        className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${formData.companySize === size.id
                                                                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                                                                            : 'bg-[#0A0E1A] border-gray-800 text-gray-400 hover:border-gray-700'
                                                                            }`}
                                                                    >
                                                                        {size.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column */}
                                                <div className="space-y-6">
                                                    <div className="space-y-4">
                                                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                            <Briefcase className="w-4 h-4 text-emerald-500" />
                                                            Cargo
                                                        </h4>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {roles.map((role) => (
                                                                <button
                                                                    key={role.id}
                                                                    type="button"
                                                                    onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                                                                    className={`px-3 py-2.5 rounded-lg border text-xs font-medium text-left transition-all ${formData.role === role.id
                                                                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                                                        : 'bg-[#0A0E1A] border-gray-800 text-gray-400 hover:border-gray-700'
                                                                        }`}
                                                                >
                                                                    {role.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                            <TrendingUp className="w-4 h-4 text-amber-500" />
                                                            Volume & Urgência
                                                        </h4>
                                                        <div className="space-y-4">
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {aiVolumes.map((volume) => (
                                                                    <button
                                                                        key={volume.id}
                                                                        type="button"
                                                                        onClick={() => setFormData(prev => ({ ...prev, aiVolume: volume.id }))}
                                                                        className={`px-2 py-2 rounded-lg border text-[11px] font-medium transition-all ${formData.aiVolume === volume.id
                                                                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                                                                            : 'bg-[#0A0E1A] border-gray-800 text-gray-400 hover:border-gray-700'
                                                                            }`}
                                                                    >
                                                                        {volume.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-2">
                                                                {urgencyLevels.map((level) => (
                                                                    <button
                                                                        key={level.id}
                                                                        type="button"
                                                                        onClick={() => setFormData(prev => ({ ...prev, urgency: level.id }))}
                                                                        className={`px-3 py-2 rounded-lg border text-xs font-medium text-left transition-all relative overflow-hidden ${formData.urgency === level.id
                                                                            ? 'border-transparent text-white'
                                                                            : 'bg-[#0A0E1A] border-gray-800 text-gray-400 hover:border-gray-700'
                                                                            }`}
                                                                    >
                                                                        {formData.urgency === level.id && (
                                                                            <div className={`absolute inset-0 bg-gradient-to-r ${level.gradient} opacity-20`} />
                                                                        )}
                                                                        <span className="relative z-10 flex items-center justify-between">
                                                                            {level.label}
                                                                            {formData.urgency === level.id && <CheckCircle2 className="w-3 h-3" />}
                                                                        </span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer area - Comments and Submit */}
                                            <div className="space-y-4 pt-4 border-t border-gray-800/50">
                                                <div className="relative">
                                                    <MessageSquare className="absolute top-3 left-4 w-4 h-4 text-gray-500" />
                                                    <textarea
                                                        value={formData.comments}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                                                        placeholder="Alguma dúvida técnica específica? (Opcional)"
                                                        rows={2}
                                                        className="w-full pl-10 pr-4 py-3 bg-[#0A0E1A] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none text-sm"
                                                    />
                                                </div>

                                                {error && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center"
                                                    >
                                                        {error}
                                                    </motion.div>
                                                )}

                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                                                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                                                    className="relative w-full py-4 rounded-xl font-bold text-white shadow-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] group-hover:animate-shimmer" />
                                                    <span className="relative flex items-center justify-center gap-2">
                                                        {isSubmitting ? (
                                                            <>
                                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                                Enviando solicitação...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Agendar Conversa com Especialista
                                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                            </>
                                                        )}
                                                    </span>
                                                </motion.button>

                                                <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> LGPD Compliant</span>
                                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Human Support</span>
                                                </div>
                                            </div>
                                        </form>
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
