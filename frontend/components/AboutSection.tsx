'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Scale, Award, TrendingUp, Users, Building, Sparkles, CheckCircle2 } from 'lucide-react';
import GlobalConnectionMap from './GlobalConnectionMap';
import AuditScanner from './AuditScanner';
import IsoBadgeAnimator from './IsoBadgeAnimator';

// ========================================
// ABOUT SECTION - Power BI Premium Dark Mode
// A Autoridade que Define o Padrão da IA no Brasil
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

interface StatItem {
    value: string;
    label: string;
    color: string;
    image: string; // Keep as fallback/required or make optional if not used by all
    isScanner?: boolean;
    isIso?: boolean;
    isMap?: boolean;
    fullWidth?: boolean;
}

const stats: StatItem[] = [
    {
        value: '+45',
        label: 'Auditorias Realizadas',
        color: '#00FF94',
        image: '/icon_audit_docs_3d_navy.png', // Fallback
        isScanner: true
    },
    {
        value: '100%',
        label: 'Aprovação ISO',
        color: '#00A3FF',
        image: '/icon_badge_3d_navy.png',
        isIso: true
    },
    {
        value: 'UK & BR',
        label: 'Presença Internacional',
        color: '#8B5CF6',
        image: '/icon_globe_3d_navy.png',
        fullWidth: true,
        isMap: true
    },
];







const trustBadges = [
    { icon: ShieldCheck, label: 'ISO 42001', color: '#00FF94' },
    { icon: Scale, label: 'PL 2338/23', color: '#00A3FF' },
    { icon: Globe, label: 'EU AI ACT', color: '#8B5CF6' },
    { icon: Award, label: 'Algor UK Licensed', color: '#FFD700' },
];

export default function AboutSection() {
    return (
        <section id="about-algor" className="py-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00FF94]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <motion.div
                    className="grid lg:grid-cols-2 gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >

                    {/* Left Column: Text Content */}
                    <motion.div variants={itemVariants}>
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm group hover:border-[#00FF94]/30 transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#00FF94]/30 rounded-full blur-md" />
                                <Globe className="w-4 h-4 text-[#00FF94] relative" />
                            </div>
                            <span className="text-sm font-mono text-[#00FF94] tracking-wider uppercase">
                                Divisão Brasil - Algor UK
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            className="font-orbitron text-4xl md:text-5xl text-white mb-6 leading-tight"
                            variants={itemVariants}
                        >
                            Missão, Visão e <br />
                            <span className="relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-[#00A3FF] to-[#8B5CF6]">
                                    Propósito Nacional.
                                </span>
                                {/* Underline glow */}
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00FF94]/50 via-[#00A3FF]/50 to-transparent" />
                            </span>
                        </motion.h2>

                        {/* Description */}
                        <motion.div
                            className="space-y-6 text-gray-400 text-lg font-light leading-relaxed"
                            variants={itemVariants}
                        >
                            <p>
                                <strong className="text-white font-medium">Nossa Missão:</strong> Fomentar o desenvolvimento da IA no Brasil através da segurança e da ética. Acreditamos que a governança não é uma barreira, mas o alicerce para um crescimento sustentável e inovador.
                            </p>
                            <p>
                                <strong className="text-white font-medium">Nossa Visão:</strong> Um mercado onde empresas prosperam com confiança. Onde a conformidade com normas globais (ISO 42001, EU AI Act) e nacionais (PL 2338/23) se traduz em vantagem competitiva, atraindo investimentos e fidelizando clientes.
                            </p>

                            {/* Quote */}
                            <motion.div
                                className="relative pl-6 py-4 mt-4"
                                whileHover={{ x: 4 }}
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00FF94] to-[#00A3FF] rounded-full" />
                                <p className="italic text-gray-300 text-base">
                                    "A ALGOR prepara sua organização para o futuro. Transformamos a complexidade regulatória em clareza estratégica, garantindo que sua inovação seja tão segura quanto poderosa."
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            className="mt-10 flex flex-wrap gap-4"
                            variants={itemVariants}
                        >
                            {trustBadges.map((badge, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${badge.color}15` }}
                                    >
                                        <badge.icon className="w-4 h-4" style={{ color: badge.color }} />
                                    </div>
                                    <span className="font-mono text-xs uppercase tracking-wider text-white">
                                        {badge.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Stats Panel - Redesigned for Lightness */}
                    <motion.div
                        className="relative"
                        variants={itemVariants}
                    >
                        {/* Organic Background Glows - subtle and separated */}
                        <div className="absolute top-10 right-10 w-64 h-64 bg-[#00A3FF]/10 rounded-full blur-[80px]" />
                        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-[80px]" />

                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`relative group ${stat.fullWidth ? 'col-span-2' : ''}`}
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Glass Card */}
                                    <div
                                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 h-full flex flex-col items-center justify-center transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.04]"
                                    >
                                        {/* Subtle Gradient Border Effect on Hover */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                            style={{
                                                background: `radial-gradient(circle at center, ${stat.color}10 0%, transparent 70%)`
                                            }}
                                        />

                                        {/* 3D Visual - Map, Scanner, Iso or Image */}
                                        {stat.isMap ? (
                                            <div className="relative w-full h-[180px] mb-8">
                                                <GlobalConnectionMap />
                                            </div>
                                        ) : stat.isScanner ? (
                                            <div className="relative w-full h-[160px] mb-4">
                                                <AuditScanner />
                                            </div>
                                        ) : stat.isIso ? (
                                            <div className="relative w-full h-[160px] mb-4">
                                                <IsoBadgeAnimator />
                                            </div>
                                        ) : (
                                            <div className="relative mb-4">
                                                {/* Multi-layer Glow Effect */}
                                                <div
                                                    className="absolute inset-0 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 rounded-full"
                                                    style={{ backgroundColor: stat.color }}
                                                />

                                                {/* 3D Image */}
                                                <div
                                                    className={`relative w-32 h-32 transition-all duration-700 group-hover:scale-105`}
                                                >
                                                    <Image
                                                        src={stat.image}
                                                        alt={stat.label}
                                                        fill
                                                        className="object-cover rounded-2xl"
                                                        sizes="(max-width: 768px) 128px, 160px"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="text-center relative z-10">
                                            <div
                                                className="text-3xl md:text-4xl font-bold font-orbitron mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                                            >
                                                {stat.value}
                                            </div>
                                            <div
                                                className="text-[10px] uppercase tracking-[0.25em] font-medium"
                                                style={{ color: stat.color }}
                                            >
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Floating Decoration Line */}
                        <div className="mt-8 flex justify-center">
                            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
