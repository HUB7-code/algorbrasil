'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck, Cpu, Scale, ArrowRight, Sparkles, Users } from 'lucide-react';

// ========================================
// PERSONA GRID - Power BI Premium Dark Mode
// Quem Lidera a Governança
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', damping: 20, stiffness: 150 }
    }
};

const personas = [
    {
        id: 'strategist',
        title: 'O Estrategista',
        role: 'C-Suite & Board',
        icon: Building2,
        color: '#00FF94',
        gradient: 'from-emerald-500 to-cyan-500',
        description: 'Foco em ROI, Reputação e Estratégia de Negócios.',
        solutions: ['Dashboard Executivo', 'Análise de Impacto Econômico', 'Briefing de Riscos'],
        path: '/solutions/board',
        badge: 'Executive'
    },
    {
        id: 'guardian',
        title: 'O Guardião',
        role: 'Risco & Compliance',
        icon: ShieldCheck,
        color: '#FFB000',
        gradient: 'from-amber-500 to-orange-500',
        description: 'Foco em ISO 42001, Controles e Auditoria.',
        solutions: ['Matriz de Risco', 'Framework de Controles', 'Manual do Auditor'],
        path: '/solutions/risk',
        badge: 'Compliance'
    },
    {
        id: 'builder',
        title: 'O Construtor',
        role: 'CTO & Tech Lead',
        icon: Cpu,
        color: '#00A3FF',
        gradient: 'from-blue-500 to-purple-500',
        description: 'Foco em MLOps, Arquitetura e Performance.',
        solutions: ['Governança em CI/CD', 'Monitoramento de Drift', 'Blueprints Técnicos'],
        path: '/solutions/tech',
        badge: 'Technical'
    },
    {
        id: 'protector',
        title: 'O Protetor',
        role: 'Jurídico & DPO',
        icon: Scale,
        color: '#8B5CF6',
        gradient: 'from-purple-500 to-pink-500',
        description: 'Foco em LGPD, PL 2338 e Segurança Jurídica.',
        solutions: ['Compliance Regulatório', 'Modelos de Contrato', 'Diagnóstico Legal'],
        path: '/solutions/legal',
        badge: 'Legal'
    }
];

export default function PersonaGrid() {
    return (
        <section className="relative w-full py-24 z-10">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#00A3FF]/5 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#00FF94]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
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
                        <Users className="w-3 h-3" />
                        Perfis Estratégicos
                    </motion.span>

                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
                        Quem Lidera a{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00FF94]">
                            Governança?
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        A metodologia da ALGOR se adapta ao seu papel na organização.
                        Identifique seu perfil para acessar ferramentas e insights específicos.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {personas.map((persona, idx) => (
                        <motion.div
                            key={persona.id}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative"
                        >
                            <Link href={`/register?role=${persona.id}`} className="block h-full">
                                {/* Gradient Border Effect */}
                                <div
                                    className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b ${persona.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                {/* Card Content */}
                                <div className="relative h-full bg-gradient-to-b from-[#131825]/90 to-[#0A0E1A]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-transparent transition-all overflow-hidden">

                                    {/* Ambient glow on hover */}
                                    <div
                                        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                        style={{ backgroundColor: persona.color }}
                                    />

                                    {/* Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span
                                            className="px-2 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider border"
                                            style={{
                                                color: persona.color,
                                                borderColor: `${persona.color}30`,
                                                backgroundColor: `${persona.color}10`
                                            }}
                                        >
                                            {persona.badge}
                                        </span>
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Header with Icon */}
                                        <div className="flex items-start justify-between mb-6">
                                            <motion.div
                                                className="relative"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                            >
                                                <div
                                                    className="absolute inset-0 rounded-xl blur-xl transition-all group-hover:blur-2xl"
                                                    style={{ backgroundColor: `${persona.color}30` }}
                                                />
                                                <div
                                                    className="relative w-14 h-14 rounded-xl flex items-center justify-center border"
                                                    style={{
                                                        backgroundColor: `${persona.color}10`,
                                                        borderColor: `${persona.color}30`,
                                                        color: persona.color
                                                    }}
                                                >
                                                    <persona.icon className="w-7 h-7" />
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                whileHover={{ x: 4 }}
                                            >
                                                <ArrowRight
                                                    className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                                                    style={{ color: persona.color }}
                                                />
                                            </motion.div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="font-serif text-xl text-white mb-1 group-hover:text-white transition-colors">
                                            {persona.title}
                                        </h3>
                                        <p
                                            className="font-mono text-xs uppercase tracking-wider mb-4"
                                            style={{ color: `${persona.color}80` }}
                                        >
                                            {persona.role}
                                        </p>
                                        <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                                            {persona.description}
                                        </p>

                                        {/* Feature List */}
                                        <ul className="space-y-3 mt-auto border-t border-white/5 pt-6">
                                            {persona.solutions.map((item, itemIdx) => (
                                                <motion.li
                                                    key={itemIdx}
                                                    className="flex items-center gap-3 text-xs text-gray-500 group-hover:text-gray-300 transition-colors"
                                                    whileHover={{ x: 4 }}
                                                >
                                                    <div
                                                        className="w-1.5 h-1.5 rounded-full"
                                                        style={{ backgroundColor: persona.color }}
                                                    />
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </ul>

                                        {/* CTA */}
                                        <motion.div
                                            className="mt-6 pt-2 flex items-center gap-2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all"
                                            style={{ color: persona.color }}
                                            initial={{ x: -10 }}
                                            whileHover={{ x: 0 }}
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            Acessar Área
                                            <ArrowRight className="w-3 h-3" />
                                        </motion.div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
