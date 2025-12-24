'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Scan, DraftingCompass, Hammer, RefreshCw, CheckCircle2,
    ShieldCheck, Activity, Sparkles, ArrowRight, Zap
} from 'lucide-react';

// ========================================
// METHODOLOGY SECTION - Power BI Premium Dark Mode
// Do Caos à Otimização Auditável
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', damping: 25, stiffness: 300 }
    }
};

const phases = [
    {
        id: '01',
        title: 'Discovery & Shadow AI',
        description: 'Mapeamento de riscos ocultos e vazamento de dados em IA não sancionada.',
        icon: Scan,
        color: '#FFB000', // Amber
        gradient: 'from-amber-500 to-orange-500'
    },
    {
        id: '02',
        title: 'Clean Room Design',
        description: 'Arquitetura de ambiente seguro para cruzamento de dados sem PII.',
        icon: DraftingCompass,
        color: '#00A3FF', // Blue
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        id: '03',
        title: 'Compliance-Led Growth',
        description: 'Ativação de campanhas usando IA que respeita Opt-in/Opt-out em tempo real.',
        icon: Hammer,
        color: '#00FF94', // Green
        gradient: 'from-emerald-500 to-teal-500'
    },
    {
        id: '04',
        title: 'Continuous Audit',
        description: 'Monitoramento 24/7 de alucinação e viés algorítmico.',
        icon: RefreshCw,
        color: '#8B5CF6', // Purple
        gradient: 'from-purple-500 to-pink-500'
    }
];

export default function MethodologySection() {
    return (
        <section id="methodology" className="py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00FF94]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Column: Content */}
                    <motion.div
                        className="lg:w-1/2"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                            variants={itemVariants}
                        >
                            <Zap className="w-3 h-3 text-[#00A3FF]" />
                            <span className="text-[#00A3FF] font-mono text-xs tracking-[0.2em] uppercase">
                                Sistema Operacional de Governança
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight"
                            variants={itemVariants}
                        >
                            Do Caos à{' '}
                            <span className="relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">
                                    Otimização Auditável
                                </span>
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00FF94]/50 to-transparent" />
                            </span>
                            .
                        </motion.h2>

                        {/* Description */}
                        <motion.div
                            className="relative pl-6 py-2 mb-12"
                            variants={itemVariants}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00FF94] via-[#00A3FF] to-[#8B5CF6] rounded-full" />
                            <p className="text-gray-400 font-light leading-relaxed text-lg">
                                Não aplicamos checklists genéricos. Implementamos um sistema vivo de governança que evolui junto com seus modelos de IA, do diagnóstico à operação contínua.
                            </p>
                        </motion.div>

                        {/* Phases */}
                        <div className="space-y-4">
                            {phases.map((phase, idx) => (
                                <motion.div
                                    key={phase.id}
                                    className="group flex items-start gap-6 p-4 rounded-xl border border-transparent hover:border-white/10 bg-transparent hover:bg-white/5 transition-all duration-300 cursor-pointer"
                                    variants={itemVariants}
                                    whileHover={{ x: 8 }}
                                >
                                    {/* Icon */}
                                    <motion.div
                                        className="relative shrink-0"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"
                                            style={{ backgroundColor: `${phase.color}30` }}
                                        />
                                        <div
                                            className="relative w-14 h-14 rounded-xl flex items-center justify-center border"
                                            style={{
                                                backgroundColor: `${phase.color}10`,
                                                borderColor: `${phase.color}30`,
                                                color: phase.color
                                            }}
                                        >
                                            <phase.icon className="w-6 h-6" />
                                        </div>
                                    </motion.div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span
                                                className="font-mono text-xs font-bold px-2 py-0.5 rounded-md"
                                                style={{
                                                    color: phase.color,
                                                    backgroundColor: `${phase.color}15`
                                                }}
                                            >
                                                {phase.id}
                                            </span>
                                            <h3 className="text-lg font-serif text-white group-hover:text-white transition-colors">
                                                {phase.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                                            {phase.description}
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    <motion.div
                                        className="opacity-0 group-hover:opacity-100 transition-opacity self-center"
                                        whileHover={{ x: 4 }}
                                    >
                                        <ArrowRight className="w-5 h-5" style={{ color: phase.color }} />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Visual Dashboard */}
                    <motion.div
                        className="lg:w-1/2 w-full pt-12"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="relative">
                            {/* Glow Effects */}
                            <div className="absolute top-[-30px] right-[-30px] w-64 h-64 bg-[#00A3FF]/15 rounded-full blur-[80px] animate-pulse" />
                            <div className="absolute bottom-[-40px] left-[-40px] w-64 h-64 bg-[#00FF94]/15 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />

                            {/* Main Card */}
                            <motion.div
                                className="relative z-20 w-full max-w-lg mx-auto"
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {/* Gradient Border */}
                                <div className="absolute inset-0 rounded-[32px] p-[1px] bg-gradient-to-b from-[#00FF94]/30 via-[#00A3FF]/20 to-transparent" />

                                <div className="relative bg-gradient-to-b from-[#131825]/95 to-[#0A0E1A]/95 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] overflow-hidden">

                                    {/* Ambient Corner Glow */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00FF94]/20 rounded-full blur-[60px]" />

                                    {/* Card Header */}
                                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-[#00FF94]/30 rounded-full blur-md" />
                                                <Activity className="w-5 h-5 text-[#00FF94] relative animate-pulse" />
                                            </div>
                                            <span className="font-mono text-xs text-[#00FF94] font-bold tracking-widest">SYSTEM STATUS</span>
                                        </div>
                                        <span className="flex items-center gap-2 text-[#00FF94] text-[10px] font-bold uppercase bg-[#00FF94]/10 border border-[#00FF94]/30 px-3 py-1.5 rounded-full">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                                            On-line
                                        </span>
                                    </div>

                                    {/* Main Metric */}
                                    <div className="mb-10 text-center relative z-10">
                                        <div className="absolute inset-0 bg-[#00FF94]/20 blur-[60px] rounded-full" />
                                        <motion.div
                                            className="relative z-10"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5, type: 'spring' }}
                                        >
                                            <span className="block text-6xl font-bold text-white mb-2 font-mono">
                                                98.5<span className="text-[#00FF94]">%</span>
                                            </span>
                                            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Índice de Conformidade</span>
                                        </motion.div>
                                    </div>

                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-2 gap-4 relative z-10">
                                        <motion.div
                                            className="bg-gradient-to-b from-white/5 to-white/[0.02] p-4 rounded-2xl border border-white/10 text-center group hover:border-[#00A3FF]/30 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <Zap className="w-4 h-4 text-[#00A3FF]" />
                                                <span className="text-2xl font-bold text-white font-mono">24/7</span>
                                            </div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wide">Monitoramento</div>
                                        </motion.div>

                                        <motion.div
                                            className="bg-gradient-to-b from-white/5 to-white/[0.02] p-4 rounded-2xl border border-white/10 text-center group hover:border-[#00FF94]/30 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <ShieldCheck className="w-4 h-4 text-[#00FF94]" />
                                                <span className="text-2xl font-bold text-white font-mono">ISO</span>
                                            </div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wide">42001 Ready</div>
                                        </motion.div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono relative z-10">
                                        <span className="text-gray-500">LAST AUDIT: DIRECT</span>
                                        <span className="text-[#00A3FF] flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            v2.4.0-stable
                                        </span>
                                    </div>

                                    {/* Decorative Dots */}
                                    <div className="absolute bottom-4 right-4 flex gap-1">
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1.5 h-1.5 rounded-full bg-white/20"
                                                animate={{ opacity: [0.2, 1, 0.2] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
