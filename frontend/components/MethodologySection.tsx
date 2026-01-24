'use client';

import React, { useState, useEffect } from 'react';
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
        title: 'Descoberta e Diagnóstico',
        description: 'AI Discovery Sprint: Mapeamento completo de Shadow IA e avaliação de maturidade em 5 níveis.',
        icon: Scan,
        color: '#FFB000', // Amber - Visibility
        gradient: 'from-amber-500 to-orange-500'
    },
    {
        id: '02',
        title: 'Estratégia de Governança',
        description: 'Constituição do Comitê de IA, definição de políticas éticas e matriz de responsabilidades.',
        icon: DraftingCompass,
        color: '#00A3FF', // Blue - Strategy
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        id: '03',
        title: 'Tratamento de Riscos',
        description: 'Avaliação de Impacto Algorítmico (AIA) e controles para ISO 42001 e PL 2338.',
        icon: ShieldCheck,
        color: '#FF0055', // Red/Pink - Critical Risk Control
        gradient: 'from-pink-500 to-rose-500'
    },
    {
        id: '04',
        title: 'Operação e Ciclo de Vida',
        description: 'Implementação de Service Desk, treinamento de times e gestão controlada do deploy.',
        icon: Hammer,
        color: '#00FF94', // Green - Execution
        gradient: 'from-emerald-500 to-teal-500'
    },
    {
        id: '05',
        title: 'Auditoria Contínua (GaaS)',
        description: 'Governance as a Service: Auditoria 24/7 e monitoramento de KPIs de conformidade.',
        icon: RefreshCw,
        color: '#8B5CF6', // Purple - Evolution
        gradient: 'from-purple-500 to-violet-500'
    }
];


export default function MethodologySection() {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <section id="methodology" className="py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00FF94]/5 rounded-full blur-[120px]" />
            </div>

            {/* Zoom Modal */}
            {isZoomed && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsZoomed(false)}
                >
                    <motion.div
                        className="relative max-w-6xl w-full"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src="/images/nosso-processo.png"
                            alt="Nosso Processo - 5 Etapas de Governança de IA"
                            className="w-full h-auto rounded-2xl shadow-[0_0_60px_rgba(0,163,255,0.4)]"
                        />
                        <button
                            onClick={() => setIsZoomed(false)}
                            className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            ✕
                        </button>
                    </motion.div>
                </motion.div>
            )}


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
                            className="font-orbitron text-4xl md:text-5xl text-white mb-6 leading-tight"
                            variants={itemVariants}
                        >
                            A Exclusiva <br />
                            <span className="relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">
                                    Metodologia ALGOR
                                </span>
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00FF94]/50 to-transparent" />
                            </span>
                        </motion.h2>

                        {/* Description */}
                        <motion.div
                            className="relative pl-6 py-2 mb-12"
                            variants={itemVariants}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00FF94] via-[#00A3FF] to-[#8B5CF6] rounded-full" />
                            <p className="text-gray-400 font-light leading-relaxed text-lg">
                                Estruturada sobre os pilares da <span className="text-white font-medium">ISO 42001</span>, <span className="text-white font-medium">EU AI Act</span>, <span className="text-white font-medium">LGPD</span> e <span className="text-white font-medium">PL 2338/23</span>. Mais que conformidade, entregamos <span className="text-[#00FF94]">Blindagem Jurídica</span> e <span className="text-[#00A3FF]">Valor Estratégico</span>, transformando a Governança de IA em um diferencial competitivo para sua operação.
                            </p>
                        </motion.div>

                        {/* Process Image */}
                        <motion.div
                            className="mt-8 cursor-pointer"
                            variants={itemVariants}
                            onClick={() => setIsZoomed(true)}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <img
                                src="/images/nosso-processo.png"
                                alt="Nosso Processo - 5 Etapas de Governança de IA (Clique para ampliar)"
                                className="w-full max-w-2xl h-auto rounded-2xl shadow-[0_0_40px_-15px_rgba(0,163,255,0.3)] hover:shadow-[0_0_50px_-10px_rgba(0,163,255,0.5)] transition-shadow"
                            />
                        </motion.div>
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

                            {/* Main Card - Futuristic Revamp */}
                            <motion.div
                                className="relative z-20 w-full max-w-lg mx-auto"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                {/* Futuristic Container */}
                                <div className="relative bg-[#050B14] border border-[#00FF94]/20 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,255,148,0.05)]">

                                    {/* 1. Perspective Grid Background */}
                                    <div className="absolute inset-0 opacity-20 pointer-events-none perspective-[1000px]">
                                        <div
                                            className="absolute inset-0 origin-bottom"
                                            style={{
                                                backgroundImage: 'linear-gradient(to right, #00FF94 1px, transparent 1px), linear-gradient(to bottom, #00FF94 1px, transparent 1px)',
                                                backgroundSize: '40px 40px',
                                                transform: 'rotateX(60deg) scale(2)',
                                                maskImage: 'linear-gradient(to bottom, transparent, black)'
                                            }}
                                        />
                                    </div>

                                    {/* 2. Matrix Rain Effect - Hydration Safe */}
                                    <MatrixRain />

                                    {/* Content Container */}
                                    <div className="relative p-8 z-10 flex flex-col h-full">

                                        {/* HEADER: EKG & Badge */}
                                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                                            <div className="flex items-center gap-4">
                                                {/* EKG Animation */}
                                                <div className="w-8 h-6 relative overflow-hidden flex items-center">
                                                    <svg viewBox="0 0 40 20" className="w-full h-full">
                                                        <motion.path
                                                            d="M0 10 L5 10 L8 18 L12 2 L16 10 L40 10"
                                                            fill="none"
                                                            stroke="#00A3FF"
                                                            strokeWidth="2"
                                                            initial={{ pathLength: 0, opacity: 0 }}
                                                            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0], x: [-10, 0, 10] }}
                                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#050B14] via-transparent to-[#050B14]" />
                                                </div>
                                                <span className="font-mono text-sm text-[#00A3FF] font-bold tracking-widest shadow-[0_0_10px_#00A3FF] drop-shadow-sm">SYSTEM STATUS</span>
                                            </div>

                                            <span className="flex items-center gap-2 text-[#00A3FF] text-[10px] font-bold uppercase bg-[#00A3FF]/5 border border-[#00A3FF]/20 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,163,255,0.1)]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
                                                On-line
                                            </span>
                                        </div>

                                        {/* CENTER: Radial Gauge */}
                                        <div className="flex-1 flex flex-col items-center justify-center mb-8 relative">
                                            <div className="relative w-64 h-64 flex items-center justify-center">
                                                {/* Gauge SVG */}
                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 256 256">
                                                    <defs>
                                                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor="#00A3FF" />
                                                            <stop offset="100%" stopColor="#00D4FF" />
                                                        </linearGradient>
                                                    </defs>
                                                    {/* Background Track */}
                                                    <circle cx="128" cy="128" r="110" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeOpacity="0.05" />
                                                    {/* Progress Arc (98.5%) */}
                                                    <motion.circle
                                                        cx="128" cy="128" r="110"
                                                        stroke="url(#gaugeGradient)"
                                                        strokeWidth="6"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        initial={{ strokeDasharray: "0 1000" }}
                                                        animate={{ strokeDasharray: "680 1000" }} // 2*PI*110 = ~691
                                                        transition={{ duration: 2, ease: "easeOut" }}
                                                        className="drop-shadow-[0_0_10px_rgba(0,163,255,0.3)]"
                                                    />
                                                </svg>

                                                {/* Orbiting Particle Trail */}
                                                <motion.div
                                                    className="absolute inset-0"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
                                                </motion.div>

                                                {/* Central Text */}
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <div className="flex items-start">
                                                        <span className="text-5xl font-bold font-orbitron text-white tracking-tighter">98.5</span>
                                                        <span className="text-xl text-[#00A3FF] font-bold mt-2">%</span>
                                                    </div>

                                                    {/* Trend Indicator */}
                                                    <div className="flex items-center gap-1 mt-2 bg-white/5 rounded-full px-3 py-1 border border-white/5">
                                                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-[#00A3FF]" />
                                                        <span className="text-xs text-[#00A3FF] font-bold">+0.2%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className="mt-2 font-mono text-xs text-gray-400 uppercase tracking-[0.2em]">Índice de Conformidade</span>
                                        </div>

                                        {/* SUB-CARDS: Glassmorphism */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Monitoramento Card */}
                                            <motion.div
                                                className="relative group overflow-hidden rounded-2xl p-4 bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-[#00A3FF]/40 transition-all duration-500"
                                                whileHover={{ y: -2 }}
                                            >
                                                {/* Hover Glow */}
                                                <div className="absolute inset-0 bg-[#00A3FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                                                <div className="relative z-10 flex flex-col items-center text-center">
                                                    <div className="mb-2 p-2 rounded-full bg-[#00A3FF]/10 text-[#00A3FF]">
                                                        <Zap className="w-5 h-5" fill="currentColor" />
                                                    </div>
                                                    <span className="text-xl font-bold text-white font-orbitron">24/7</span>
                                                    <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">Monitoramento</span>
                                                </div>
                                            </motion.div>

                                            {/* ISO Card */}
                                            <motion.div
                                                className="relative group overflow-hidden rounded-2xl p-4 bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-[#00FF94]/40 transition-all duration-500"
                                                whileHover={{ y: -2 }}
                                            >
                                                {/* Hover Glow */}
                                                <div className="absolute inset-0 bg-[#00FF94]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                                                <div className="relative z-10 flex flex-col items-center text-center">
                                                    <div className="mb-2 p-2 rounded-full bg-[#00A3FF]/10 text-[#00A3FF]">
                                                        <ShieldCheck className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-xl font-bold text-white font-orbitron">ISO</span>
                                                    <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">42001 Ready</span>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-mono tracking-wider relative z-10 opacity-60">
                                            <span className="text-gray-400">STATUS: AUDITED</span>
                                            <span className="text-[#00A3FF] flex items-center gap-1 font-bold">
                                                <CheckCircle2 className="w-3 h-3" />
                                                CERTIFIED PARTNER
                                            </span>
                                        </div>

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

function MatrixRain() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 flex justify-between px-6 pt-4">
            {[...Array(12)].map((_, colIndex) => (
                <motion.div
                    key={colIndex}
                    className="flex flex-col gap-1 text-[10px] font-mono text-[#00A3FF] leading-none"
                    initial={{ y: -120 }}
                    animate={{ y: [0, 500] }}
                    transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 4
                    }}
                >
                    {[...Array(12)].map((_, charIndex) => (
                        <span key={charIndex} style={{ opacity: Math.random() > 0.5 ? 0.8 : 0.2 }}>
                            {Math.random() > 0.5 ? '1' : '0'}
                        </span>
                    ))}
                </motion.div>
            ))}
        </div>
    );
}
