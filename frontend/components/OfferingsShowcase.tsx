'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, Search, Monitor, GraduationCap, Users, Shield, Award,
    BarChart3, LineChart, Sparkles, ArrowRight, Zap, Layers
} from 'lucide-react';

// ========================================
// OFFERINGS SHOWCASE - Power BI Premium Dark Mode
// Governança sob Medida
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
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

const offerings = [
    {
        id: 'academy',
        title: 'Educação Executiva',
        subtitle: 'ALGOR Academy',
        icon: GraduationCap,
        color: '#FFB000', // Amber/Copper
        gradient: 'from-amber-500 to-orange-500',
        badge: 'Formação',
        useImage: true,
        imageSrc: '/images/educacao-executiva-full.png', // Hologram Full Image
        items: [
            { title: 'Formação de Auditores ISO 42001', icon: BookOpen },
            { title: 'Workshops de Implementação', icon: Users },
            { title: 'Masterclasses com Especialistas', icon: Award },
            { title: 'Acervo Técnico e Regulatório', icon: Search },
        ],
        footer: { icon: Users, text: '+1.200 Alunos Formados', pulse: false }
    },
    {
        id: 'certification',
        title: 'Certificação & Selo',
        subtitle: 'Conformidade Verificada',
        icon: Shield,
        color: '#00FF94', // Green
        gradient: 'from-emerald-500 to-cyan-500',
        badge: 'Autoridade',
        featured: true,
        useImage: true,
        imageSrc: '/images/certificacao-selo-full.png', // Hologram Full Image
        items: [
            { title: 'Auditoria de Conformidade', icon: Shield },
            { title: 'Emissão de Selo de Confiança', icon: Award },
            { title: 'Diagnóstico de Maturidade', icon: BarChart3 },
            { title: 'Relatórios de Impacto (RIIA)', icon: LineChart },
        ],
        footer: { icon: Zap, text: 'Padrão Reconhecido', pulse: true }
    },
    {
        id: 'community',
        title: 'Rede de Membros',
        subtitle: 'Networking de Elite',
        icon: Users,
        color: '#00A3FF', // Blue
        gradient: 'from-blue-500 to-purple-500',
        badge: 'Ecossistema',
        useImage: true,
        imageSrc: '/images/rede-membros-full.png', // Hologram Full Image
        items: [
            { title: 'Conexão com C-Levels', icon: Users },
            { title: 'Grupos de Trabalho Temáticos', icon: Layers },
            { title: 'Eventos Exclusivos', icon: Sparkles },
            { title: 'Oportunidades de Carreira', icon: Search },
        ],
        footer: { icon: Users, text: 'Membros em todo o Brasil' }
    }
];

export default function OfferingsShowcase() {
    return (
        <section id="offerings" className="py-24 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00FF94]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
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
                        <Layers className="w-3 h-3" />
                        Nossas Soluções
                    </motion.span>

                    <h2 className="font-orbitron text-4xl md:text-5xl text-white mb-4">
                        Pilares da{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">
                            Excelência
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                        Atuamos em três frentes estratégicas para elevar o nível da Inteligência Artificial no Brasil.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className="grid lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {offerings.map((offering) => (
                        <motion.div
                            key={offering.id}
                            variants={cardVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`group relative h-full rounded-2xl ${offering.featured ? 'lg:scale-105' : ''}`}
                        >
                            {/* Render Logic: Image Card (Priority) OR Standard Card (Fallback) */}
                            {offering.useImage ? (
                                // --- FULL HOLOGRAM IMAGE CARD ---
                                <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_0_50px_-5px_rgba(var(--glow-color),0.4)]">
                                    <div className="absolute inset-0 bg-black rounded-2xl" /> {/* Dark background base */}
                                    <img
                                        src={offering.imageSrc}
                                        alt={offering.title}
                                        className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Glass Reflection Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
                                </div>
                            ) : (
                                // --- STANDARD CSS CARD (Fallback) ---
                                <>
                                    {/* Gradient Border Effect */}
                                    <div className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b ${offering.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative h-full bg-gradient-to-b from-[#131825]/90 to-[#0A0E1A]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group-hover:border-transparent transition-all overflow-hidden flex flex-col">
                                        {/* Ambient glow */}
                                        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: offering.color }} />

                                        {/* Fallback Icon */}
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <offering.icon className="w-32 h-32" style={{ color: offering.color }} />
                                        </div>

                                        {/* Badge */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <span
                                                className="px-2 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider border"
                                                style={{
                                                    color: offering.color,
                                                    borderColor: `${offering.color}30`,
                                                    backgroundColor: `${offering.color}10`
                                                }}
                                            >
                                                {offering.badge}
                                            </span>
                                        </div>

                                        {/* Header */}
                                        <div className="flex items-center gap-4 mb-8 relative z-10">
                                            <motion.div className="relative" whileHover={{ scale: 1.1, rotate: 5 }}>
                                                <div className="absolute inset-0 rounded-xl blur-xl transition-all group-hover:blur-2xl" style={{ backgroundColor: `${offering.color}30` }} />
                                                <div
                                                    className="relative w-14 h-14 rounded-xl flex items-center justify-center border"
                                                    style={{
                                                        backgroundColor: `${offering.color}10`,
                                                        borderColor: `${offering.color}30`,
                                                        color: offering.color
                                                    }}
                                                >
                                                    <offering.icon className="w-7 h-7" />
                                                </div>
                                            </motion.div>
                                            <div>
                                                <h3 className="font-orbitron text-2xl text-white group-hover:text-white transition-colors">{offering.title}</h3>
                                                <p className="text-xs font-mono uppercase tracking-wider" style={{ color: `${offering.color}80` }}>{offering.subtitle}</p>
                                            </div>
                                        </div>

                                        {/* Items List */}
                                        <div className="space-y-4 relative z-10 flex-1">
                                            {offering.items.map((item, itemIdx) => (
                                                <motion.div key={itemIdx} className="flex items-start gap-4 group/item" whileHover={{ x: 4 }}>
                                                    <div
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                                        style={{ backgroundColor: `${offering.color}10`, color: offering.color }}
                                                    >
                                                        <item.icon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-medium text-sm group-hover/item:text-white transition-colors">{item.title}</h4>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        {offering.footer && (
                                            <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: offering.color }}>
                                                    {offering.footer.pulse && <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: offering.color }} />}
                                                    <offering.footer.icon className="w-4 h-4" />
                                                    {offering.footer.text}
                                                </div>
                                            </div>
                                        )}

                                        {/* CTA on hover */}
                                        <motion.div
                                            className="mt-6 flex items-center gap-2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all relative z-10"
                                            style={{ color: offering.color }}
                                            initial={{ x: -10 }}
                                            whileHover={{ x: 0 }}
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            Saiba Mais
                                            <ArrowRight className="w-3 h-3" />
                                        </motion.div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
