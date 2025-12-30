'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Cpu, Activity, Lock, Zap, Database, Bot } from 'lucide-react';

// ========================================
// TECHNOLOGY SECTION - Power BI Premium Dark Mode
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', damping: 20, stiffness: 150 }
    }
};

const techCards = [
    {
        icon: Shield,
        title: 'Nativo na Norma ISO',
        description: 'Sua operação growth nasce desenhada segundo a norma internacional. Entregamos relatórios mensais de',
        highlight: 'Auditoria de Viés Algorítmico',
        suffix: 'para blindar seu C-Level.',
        color: '#00FF94',
        gradient: 'from-emerald-500 to-cyan-500',
        badge: 'ISO 42001'
    },
    {
        icon: Database,
        title: 'Ambiente Seguro de Dados',
        description: 'Acesso a dados de mercado cruzados com seus dados First-Party em ambiente neutro criptografado. Nossa equipe processa inteligência',
        highlight: 'sem nunca ver Dados Pessoais',
        suffix: '.',
        color: '#00A3FF',
        gradient: 'from-blue-500 to-purple-500',
        badge: 'Clean Room'
    },
    {
        icon: Bot,
        title: 'IA com Consentimento',
        description: 'Modelos que respeitam o Opt-in em tempo real. Se o usuário revoga consentimento, nossa IA',
        highlight: 'automaticamente o remove',
        suffix: 'do retargeting, eliminando riscos jurídicos.',
        color: '#8B5CF6',
        gradient: 'from-purple-500 to-pink-500',
        badge: 'LGPD Automata',
        featured: true
    }
];

export default function TechnologySection() {
    return (
        <section id="technology" className="relative z-10 max-w-7xl mx-auto px-6 pb-32 scroll-mt-24">
            {/* Ambient Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF94]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00A3FF]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Section Header */}
            <motion.div
                className="text-center mb-16 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* Badge */}
                <motion.span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00FF94] text-[10px] font-mono tracking-[0.2em] uppercase mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <Cpu className="w-3 h-3" />
                    Infraestrutura
                </motion.span>

                <h2 className="font-orbitron text-3xl md:text-5xl text-white mb-4">
                    Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00FF94]">Tecnologia</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                    A infraestrutura técnica que torna a governança invisível e automática.
                </p>
            </motion.div>

            {/* Tech Cards Grid */}
            <motion.div
                className="grid md:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {techCards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        variants={cardVariants}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${card.featured ? 'md:scale-105 md:-translate-y-2' : ''
                            }`}
                    >
                        {/* Gradient Border Effect */}
                        <div
                            className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />

                        {/* Card Content */}
                        <div className="relative h-full bg-gradient-to-b from-[#131825]/90 to-[#0A0E1A]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group-hover:border-transparent transition-all">

                            {/* Ambient glow on hover */}
                            <div
                                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                style={{ backgroundColor: card.color }}
                            />

                            {/* Badge */}
                            <div className="absolute top-4 right-4">
                                <span
                                    className="px-2 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider border"
                                    style={{
                                        color: card.color,
                                        borderColor: `${card.color}30`,
                                        backgroundColor: `${card.color}10`
                                    }}
                                >
                                    {card.badge}
                                </span>
                            </div>

                            {/* Icon */}
                            <motion.div
                                className="relative mb-6"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <div
                                    className="absolute inset-0 rounded-xl blur-xl transition-all group-hover:blur-2xl"
                                    style={{ backgroundColor: `${card.color}30` }}
                                />
                                <div
                                    className="relative w-14 h-14 rounded-xl flex items-center justify-center border"
                                    style={{
                                        backgroundColor: `${card.color}10`,
                                        borderColor: `${card.color}30`,
                                        color: card.color
                                    }}
                                >
                                    <card.icon className="w-7 h-7" />
                                </div>
                            </motion.div>

                            {/* Title */}
                            <h3
                                className="font-orbitron text-2xl mb-4 text-white group-hover:transition-colors"
                                style={{ '--hover-color': card.color } as React.CSSProperties}
                            >
                                <span className="group-hover:text-[var(--hover-color)] transition-colors">
                                    {card.title}
                                </span>
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 font-light leading-relaxed relative z-10">
                                {card.description}{' '}
                                <span className="text-white font-medium">{card.highlight}</span>{' '}
                                {card.suffix}
                            </p>

                            {/* Feature Indicator for last card */}
                            {card.featured && (
                                <div className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest relative z-10" style={{ color: card.color }}>
                                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: card.color }} />
                                    Núcleo Automata LGPD
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom Stats */}
            <motion.div
                className="mt-16 flex justify-center gap-8 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                {[
                    { value: '99.9%', label: 'Uptime SLA', icon: Activity },
                    { value: '<100ms', label: 'Latência API', icon: Zap },
                    { value: 'SOC 2', label: 'Certificado', icon: Lock },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                    >
                        <stat.icon className="w-5 h-5 text-[#00FF94]" />
                        <div className="text-left">
                            <p className="font-mono font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
