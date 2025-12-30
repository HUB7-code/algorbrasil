'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Scale, Award, TrendingUp, Users, Building, Sparkles, CheckCircle2 } from 'lucide-react';

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

const stats = [
    { value: '+45', label: 'Auditorias Realizadas', color: '#00FF94', icon: Award },
    { value: '100%', label: 'Aprovação ISO', color: '#00A3FF', icon: CheckCircle2 },
    { value: 'UK & BR', label: 'Presença Internacional', color: '#8B5CF6', icon: Globe, fullWidth: true },
];

const trustBadges = [
    { icon: ShieldCheck, label: 'ISO 42001 Native', color: '#00FF94' },
    { icon: Scale, label: 'LGPD Compliant', color: '#00A3FF' },
    { icon: Award, label: 'Algor UK Licensed', color: '#8B5CF6' },
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
                            A Autoridade que Define <br />
                            <span className="relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-[#00A3FF] to-[#8B5CF6]">
                                    o Padrão da IA no Brasil.
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
                                <strong className="text-white font-medium">A ALGOR Brasil</strong> transcende o modelo tradicional de consultoria. Somos uma infraestrutura estratégica composta por especialistas, auditores e líderes de tecnologia sob licença da <strong className="text-white">Algor UK</strong>.
                            </p>
                            <p>
                                Nossa missão é clara: implementar o padrão global de segurança e governança de IA (<strong className="text-[#00FF94]">ISO 42001</strong>), com alinhamento rigoroso à <strong className="text-[#00A3FF]">LGPD</strong> e ao <strong className="text-[#8B5CF6]">PL 2338/23</strong>.
                            </p>

                            {/* Quote */}
                            <motion.div
                                className="relative pl-6 py-4"
                                whileHover={{ x: 4 }}
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00FF94] to-[#00A3FF] rounded-full" />
                                <p className="italic text-gray-300 text-base">
                                    "Unimos inteligência global à realidade regulatória brasileira para garantir que sua inovação seja segura, ética e auditável."
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

                    {/* Right Column: Stats Panel */}
                    <motion.div
                        className="relative"
                        variants={itemVariants}
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF94]/20 via-[#00A3FF]/10 to-[#8B5CF6]/20 rounded-3xl blur-2xl transform rotate-3 scale-95" />

                        {/* Main Panel */}
                        <motion.div
                            className="relative bg-gradient-to-b from-[#131825]/90 to-[#0A0E1A]/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 overflow-hidden"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {/* Ambient Corner Glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00A3FF]/20 rounded-full blur-[60px]" />

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                {stats.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={`p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 text-center group hover:border-white/20 transition-all ${stat.fullWidth ? 'col-span-2' : ''
                                            }`}
                                        whileHover={{ scale: 1.02, y: -4 }}
                                    >
                                        <div className="flex justify-center mb-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                style={{ backgroundColor: `${stat.color}15` }}
                                            >
                                                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                                            </div>
                                        </div>
                                        <div
                                            className="text-4xl font-bold mb-2 font-mono"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.value}
                                        </div>
                                        <div className="text-xs uppercase tracking-widest text-gray-400">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer Message */}
                            <motion.div
                                className="mt-8 pt-8 border-t border-white/10 text-center"
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                                    <Sparkles className="w-4 h-4 text-[#00FF94]" />
                                    Liderando o debate regulatório com técnica e inovação.
                                </div>
                            </motion.div>

                            {/* Decorative Elements */}
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
                        </motion.div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
