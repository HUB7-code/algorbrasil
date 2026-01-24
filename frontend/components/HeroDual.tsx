'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Lock, Sparkles } from 'lucide-react';
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

export default function HeroDual() {
    const router = useRouter();

    const handleDiagnosticClick = () => {
        const token = localStorage.getItem("algor_token");
        if (token) {
            router.push("/dashboard/assessments?new=true");
        } else {
            router.push("/login?redirect=/dashboard/assessments?new=true");
        }
    };

    return (
        <section data-testid="hero-section" className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#0A1A2F]">

            {/* 3D Neural Background - GLOBE SLIGHTLY REDUCED FOR BALANCE */}
            <div className="absolute top-[80px] left-0 right-0 h-[55vh] z-[1]">
                <HeroScene />
            </div>

            {/* Ambient Glow Effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00FF94]/8 rounded-full blur-[150px] pointer-events-none" />

            {/* Spacer - Adjusted for new globe size */}
            <div className="h-[58vh] w-full pointer-events-none" />

            {/* Main Headline - BOTTOM SECTION */}
            <motion.div
                className="relative z-[10] text-center w-full px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Institutional Full Name - Globe Caption (BOLD & CLEARER) */}
                <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-[11px] md:text-sm font-mono text-gray-300 font-semibold uppercase tracking-[0.15em] leading-relaxed max-w-4xl mx-auto drop-shadow-md">
                        Association for Algorithmization <br className="hidden md:block" /> and Logic Governance Organization
                    </h2>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    data-testid="hero-title"
                    variants={itemVariants}
                    className="font-orbitron text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-6 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                >
                    Liderando a Era da <br />
                    <span className="relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-green-400 animate-gradient-x">
                            Governança de IA no Brasil.
                        </span>
                        {/* Underline glow */}
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF94]/50 to-transparent" />
                    </span>
                </motion.h1>

                {/* Subheadline (HIGHER CONTRAST) */}
                <motion.p
                    variants={itemVariants}
                    className="font-light text-gray-100 max-w-3xl mx-auto text-sm md:text-xl leading-relaxed"
                >
                    Transforme a Inteligência Artificial em um ativo seguro e confiável. <br />
                    Adote práticas de <span className="text-[#00FF94] font-medium">Governança Ética</span> que protegem sua reputação, garantem <span className="text-[#00A3FF] font-medium">Segurança Jurídica</span> e impulsionam a inovação com <span className="text-white font-medium">Responsabilidade</span>.
                </motion.p>

                {/* Stats Bar - Premium Glass Tech */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-6 mt-12 mb-4"
                >
                    {[
                        { value: 'ISO 42001', label: 'CONFORMIDADE', icon: ShieldCheck, color: '#00FF94', shadow: 'shadow-emerald-500/20' }, // Green
                        { value: 'MEMBROS', label: 'CERTIFICADOS', icon: Users, color: '#00A3FF', shadow: 'shadow-blue-500/20' },        // Blue
                        { value: 'LGPD', label: 'PROTEÇÃO TOTAL', icon: Lock, color: '#D946EF', shadow: 'shadow-fuchsia-500/20' },       // Purple
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className={`relative flex items-center gap-4 px-8 py-4 rounded-2xl border backdrop-blur-md transition-all duration-300 group overflow-hidden ${stat.shadow} shadow-lg hover:shadow-2xl`}
                            style={{
                                borderColor: `${stat.color}30`,
                                background: `
                                    linear-gradient(135deg, ${stat.color}05, rgba(255,255,255,0.01)),
                                    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                                `,
                                backgroundSize: '100% 100%, 20px 20px, 20px 20px'
                            }}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            {/* Inner Glow Gradient */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                style={{ background: `radial-gradient(circle at center, ${stat.color}, transparent 70%)` }}
                            />

                            {/* Animated Scanline Effect */}
                            <div
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[1.5s] ease-in-out pointer-events-none"
                            />

                            {/* Icon Box - More glowing */}
                            <div
                                className="relative w-10 h-10 rounded-lg flex items-center justify-center border shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                                style={{
                                    backgroundColor: `${stat.color}10`,
                                    borderColor: `${stat.color}50`,
                                    color: stat.color,
                                    boxShadow: `inset 0 0 10px ${stat.color}20, 0 0 10px ${stat.color}20`
                                }}
                            >
                                <stat.icon className="w-5 h-5 drop-shadow-[0_0_5px_currentColor]" />
                            </div>

                            {/* Text Content */}
                            <div className="text-left relative z-10">
                                <p
                                    className="font-orbitron font-bold text-lg tracking-wide drop-shadow-md"
                                    style={{ color: '#fff', textShadow: `0 0 15px ${stat.color}50` }}
                                >
                                    {stat.value}
                                </p>
                                <p
                                    className="text-[10px] uppercase tracking-[0.2em] font-bold"
                                    style={{ color: stat.color, textShadow: `0 0 5px ${stat.color}40`, opacity: 0.9 }}
                                >
                                    {stat.label}
                                </p>
                            </div>

                            {/* Decorator Line */}
                            <div
                                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`, boxShadow: `0 0 10px ${stat.color}` }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Actions - Holographic Interface Style */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16"
                >
                    {/* PRIMARY BUTTON: ACTIVE HOLOGRAM */}
                    <Link href="/register">
                        <motion.button
                            className="relative group w-full md:w-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* 1. Outer Glow (Atmosphere) */}
                            <div className="absolute inset-0 rounded-xl bg-[#00FF94] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                            {/* 2. Main Container (Glass) */}
                            <div className="relative px-10 py-5 bg-[#00FF94]/10 backdrop-blur-md rounded-xl border border-[#00FF94]/50 overflow-hidden">
                                {/* 3. Inner Gradient Scanline (Animation) */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF94]/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out skew-x-12" />

                                {/* 4. Tech Decorators (Corners) */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00FF94]" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00FF94]" />

                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    <span className="font-orbitron font-bold tracking-[0.2em] text-white text-sm uppercase drop-shadow-[0_0_10px_rgba(0,255,148,0.8)]">
                                        Quero me Associar
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-[#00FF94] group-hover:translate-x-1 transition-transform drop-shadow-[0_0_10px_currentColor]" />
                                </span>
                            </div>
                        </motion.button>
                    </Link>

                    {/* SECONDARY BUTTON: GHOST GLASS */}
                    <button onClick={() => document.getElementById('institutional')?.scrollIntoView({ behavior: 'smooth' })}>
                        <motion.div
                            className="relative group w-full md:w-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="relative px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 transition-all overflow-hidden group">
                                {/* Subtle sheen */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    <span className="font-mono text-gray-300 group-hover:text-white tracking-[0.2em] text-sm uppercase transition-colors">
                                        Conheça a Instituição
                                    </span>
                                    {/* Animated Line */}
                                    <div className="w-6 h-[1px] bg-white/20 group-hover:w-10 group-hover:bg-[#00A3FF] transition-all duration-300" />
                                </span>
                            </div>
                        </motion.div>
                    </button>
                </motion.div>

                {/* Scroll Indicator Removed */}

            </motion.div>

        </section >
    );
}
