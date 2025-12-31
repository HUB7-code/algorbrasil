'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Activity, Lock, Zap, Sparkles, Bot, Target } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// ========================================
// HERO DUAL - Power BI Premium Dark Mode
// Mantém o HeroScene (cérebro/sinapses) intacto
// ========================================

const HeroScene = dynamic(() => import('./HeroScene'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0A1A2F]" />
});

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', damping: 25, stiffness: 300 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', damping: 20, stiffness: 150 }
    }
};

export default function HeroDual() {
    const router = useRouter();
    const [hoveredSide, setHoveredSide] = useState<'corporate' | 'professional' | null>(null);

    const handleDiagnosticClick = () => {
        const token = localStorage.getItem("algor_token");
        if (token) {
            router.push("/dashboard/assessments?new=true");
        } else {
            router.push("/login?redirect=/dashboard/assessments?new=true");
        }
    };

    return (
        <section data-testid="hero-section" className="relative min-h-[90vh] flex flex-col pt-48 pb-48 md:pb-32 px-4 md:px-0 overflow-hidden">

            {/* 3D Neural Background - PRESERVADO INTACTO */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                <HeroScene />
            </div>

            {/* Ambient Glow Effects - Premium */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00FF94]/8 rounded-full blur-[150px] pointer-events-none" />

            {/* Main Headline - Enhanced */}
            <motion.div
                className="relative z-[5] text-center mb-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Premium Badge */}
                <motion.div variants={itemVariants} className="inline-block mb-10">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF94]/20 to-[#00A3FF]/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                        <span className="relative inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 border border-white/10 text-[#00FF94] text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase backdrop-blur-md hover:border-[#00FF94]/30 transition-all cursor-default">
                            <Sparkles className="w-3 h-3" />
                            Growth AI Compliant v2.0
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                        </span>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    data-testid="hero-title"
                    variants={itemVariants}
                    className="font-orbitron text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-6"
                >
                    Cresça Rápido. <br />
                    <span className="relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-green-400 animate-gradient-x">
                            Durma Tranquilo.
                        </span>
                        {/* Underline glow */}
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF94]/50 to-transparent" />
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={itemVariants}
                    className="font-light text-gray-300 max-w-2xl mx-auto text-sm md:text-lg"
                >
                    Infraestrutura de Governança e <span className="text-white font-medium">Software de Auditoria (SaaS)</span> com arquitetura ISO 42001 Nativa. Desbloqueie contratos Enterprise e blinde sua operação de IA.
                </motion.p>

                {/* Stats Bar - Premium */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center gap-8 mt-10"
                >
                    {[
                        { value: '100%', label: 'ISO 42001', icon: ShieldCheck },
                        { value: '< 48h', label: 'Deploy', icon: Zap },
                        { value: '0', label: 'Data Leaks', icon: Lock },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all group"
                            whileHover={{ scale: 1.05, y: -2 }}
                        >
                            <stat.icon className="w-4 h-4 text-[#00FF94] group-hover:scale-110 transition-transform" />
                            <div className="text-left">
                                <p className="font-mono font-bold text-white text-sm">{stat.value}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Neural Cortex Animation - Spacer */}
            <div className="w-full relative z-0 h-[200px] md:h-[300px]" />

            {/* Dual Funnel Cards - Premium Design */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-6 px-4 md:px-8 -mt-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Corporate Side - Premium */}
                <motion.div
                    variants={cardVariants}
                    onMouseEnter={() => setHoveredSide('corporate')}
                    onMouseLeave={() => setHoveredSide(null)}
                    whileHover={{ y: -8 }}
                    className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ${hoveredSide === 'professional' ? 'md:opacity-50 md:scale-[0.98]' : ''
                        }`}
                >
                    {/* Card Background with Gradient Border */}
                    <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-[#00A3FF]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative h-full bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 group-hover:border-[#00A3FF]/30 transition-all">

                        {/* Ambient glow */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00A3FF]/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Background Icon */}
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Activity className="w-32 h-32 text-[#00A3FF]" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full items-start">
                            {/* Icon with glow */}
                            <motion.div
                                className="relative mb-6"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <div className="absolute inset-0 bg-[#00A3FF]/30 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#00A3FF]/20 to-[#00A3FF]/5 flex items-center justify-center text-[#00A3FF] border border-[#00A3FF]/30">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                            </motion.div>

                            <h2 className="font-orbitron text-3xl text-white mb-2 group-hover:text-[#00A3FF]/90 transition-colors">Para Empresas</h2>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="font-mono text-xs text-[#00A3FF] tracking-widest uppercase">Governança como Motor de Receita</span>
                                <Target className="w-3 h-3 text-[#00A3FF]" />
                            </div>

                            <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">
                                Desbloqueie projetos de IA travados pelo Compliance. Transforme a governança em vantagem competitiva com nossa infraestrutura auditável e seguro técnico contra riscos algorítmicos.
                            </p>

                            <div className="mt-auto pt-6 w-full border-t border-white/5">
                                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                                    <motion.li
                                        className="flex items-center gap-3"
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className="w-6 h-6 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center">
                                            <Lock className="w-3 h-3 text-[#00A3FF]" />
                                        </div>
                                        Selo ISO 42001 Nativo
                                    </motion.li>
                                    <motion.li
                                        className="flex items-center gap-3"
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className="w-6 h-6 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center">
                                            <Activity className="w-3 h-3 text-[#00A3FF]" />
                                        </div>
                                        Mitigação Técnica de Riscos
                                    </motion.li>
                                </ul>

                                <Link href="/solutions/enterprise" className="w-full block" data-testid="cta-enterprise">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative w-full py-4 rounded-xl font-bold tracking-wider uppercase text-xs overflow-hidden group/btn"
                                    >
                                        {/* Button gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF] to-[#0066CC]" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF] to-[#0066CC] opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity" />

                                        <span className="relative flex items-center justify-center gap-2 text-white">
                                            Soluções Enterprise
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Professional Side - Premium */}
                <motion.div
                    variants={cardVariants}
                    onMouseEnter={() => setHoveredSide('professional')}
                    onMouseLeave={() => setHoveredSide(null)}
                    whileHover={{ y: -8 }}
                    className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ${hoveredSide === 'corporate' ? 'md:opacity-50 md:scale-[0.98]' : ''
                        }`}
                >
                    {/* Card Background with Gradient Border */}
                    <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-[#00FF94]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative h-full bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 group-hover:border-[#00FF94]/30 transition-all">

                        {/* Ambient glow */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00FF94]/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Background Icon */}
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Users className="w-32 h-32 text-[#00FF94]" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full items-start">
                            {/* Icon with glow */}
                            <motion.div
                                className="relative mb-6"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                            >
                                <div className="absolute inset-0 bg-[#00FF94]/30 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#00FF94]/20 to-[#00FF94]/5 flex items-center justify-center text-[#00FF94] border border-[#00FF94]/30">
                                    <Users className="w-7 h-7" />
                                </div>
                            </motion.div>

                            <h2 className="font-orbitron text-3xl text-white mb-2 group-hover:text-[#00FF94]/90 transition-colors">Para Consultores</h2>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="font-mono text-xs text-[#00FF94] tracking-widest uppercase">Carreira & Ferramentas</span>
                                <Bot className="w-3 h-3 text-[#00FF94]" />
                            </div>

                            <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">
                                Junte-se à elite da governança. Acesse metodologias exclusivas, <span className="text-white font-medium">licença de software de auditoria</span> e conecte-se com o board.
                            </p>

                            <div className="mt-auto pt-6 w-full border-t border-white/5">
                                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                                    <motion.li
                                        className="flex items-center gap-3"
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className="w-6 h-6 rounded-lg bg-[#00FF94]/10 flex items-center justify-center">
                                            <ShieldCheck className="w-3 h-3 text-[#00FF94]" />
                                        </div>
                                        Software de Auditoria Multi-Cliente
                                    </motion.li>
                                    <motion.li
                                        className="flex items-center gap-3"
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className="w-6 h-6 rounded-lg bg-[#00FF94]/10 flex items-center justify-center">
                                            <Users className="w-3 h-3 text-[#00FF94]" />
                                        </div>
                                        Networking com C-Levels
                                    </motion.li>
                                </ul>

                                <Link href="/partners" className="w-full block" data-testid="cta-partners">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative w-full py-4 rounded-xl font-bold tracking-wider uppercase text-xs border border-[#00FF94] bg-transparent text-[#00FF94] overflow-hidden group/btn hover:bg-[#00FF94] hover:text-[#0A1A2F] transition-all"
                                    >
                                        {/* Button glow */}
                                        <div className="absolute inset-0 bg-[#00FF94]/20 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity" />

                                        <span className="relative flex items-center justify-center gap-2">
                                            Programa de Parceiros
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>

        </section>
    );
}
