'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Image from 'next/image';

// ========================================
// TECHNOLOGY SECTION (SERVICES) - All Image Cards Edition
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
        id: 'consultoria',
        imageSrc: '/images/consultoria-shield-icon.png',
        imageAlt: 'Consultoria & Advisory - Gestão Estratégica'
    },
    {
        id: 'educacao',
        imageSrc: '/images/educacao-in-company-card.png',
        imageAlt: 'Educação In-Company - Workshops & Cursos'
    },
    {
        id: 'palestras',
        imageSrc: '/images/palestras-keynotes-card.png',
        imageAlt: 'Palestras & Keynotes - Impacto & Visão'
    }
];

export default function TechnologySection() {
    return (
        <section id="technology" className="relative z-10 max-w-[1600px] mx-auto px-4 pb-32 scroll-mt-24">
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
                <motion.span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00FF94] text-[10px] font-mono tracking-[0.2em] uppercase mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <Users className="w-3 h-3" />
                    Nossos Serviços
                </motion.span>

                <h2 className="font-orbitron text-3xl md:text-5xl text-white mb-4">
                    Soluções Corporativas <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00FF94]">de Alto Impacto</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                    Preparamos líderes e organizações para a Era da IA com uma abordagem centrada em estratégia, segurança jurídica e inovação responsável.
                </p>
            </motion.div>

            {/* Cards Grid - 3 columns side by side */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {techCards.map((card) => (
                    <motion.div
                        key={card.id}
                        variants={cardVariants}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="relative group cursor-pointer"
                    >
                        <Image
                            src={card.imageSrc}
                            alt={card.imageAlt}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-2xl shadow-[0_0_40px_-15px_rgba(0,163,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(0,163,255,0.5)] transition-shadow duration-500"
                            priority
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
