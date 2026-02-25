'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Shield, Brain, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const consultancies = [
    {
        icon: Search,
        title: 'Diagnóstico de Risco',
        tag: 'Avaliação',
        color: '#00FF94',
        description: 'Análise completa da infraestrutura atual de IA para identificar vulnerabilidades e gaps de compliance regulatório.',
        bullets: ['Maturidade organizacional', 'Gaps de conformidade', 'Roadmap prioritário'],
    },
    {
        icon: Compass,
        title: 'Descoberta & Mapeamento',
        tag: 'Estratégia',
        color: '#4F7EFF',
        description: 'Catalogação de todos os ativos de IA, shadow AI e fluxos de dados sensíveis dentro da organização.',
        bullets: ['Oportunidades de IA', 'Mapeamento de riscos', 'Shadow AI detection'],
    },
    {
        icon: Shield,
        title: 'Gestão Continuada',
        tag: 'Implementação',
        color: '#818CF8',
        description: 'Monitoramento em tempo real e ajustes de políticas conforme a evolução dos modelos de IA. ISO 42001 como framework central.',
        bullets: ['Políticas e controles', 'ISO 42001 nativa', 'Gestão contínua'],
    },
    {
        icon: Brain,
        title: 'Cultura AI First',
        tag: 'Transformação',
        color: '#F59E0B',
        description: 'Treinamento e aculturamento de equipes para uso ético, seguro e produtivo de ferramentas generativas.',
        bullets: ['Change management', 'Capacitação interna', 'Cultura de inovação'],
    },
];

export default function CinematicSolutions() {
    return (
        <section id="pillars" className="py-28 bg-[#080C18] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F7EFF] rounded-full blur-[250px] opacity-[0.04]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4F7EFF]/30 bg-[#4F7EFF]/10 text-[#4F7EFF] text-xs font-bold tracking-widest uppercase mb-6"
                    >
                        Soluções Corporativas
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-inter text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        Governança de IA para{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7EFF] to-[#818CF8]">
                            o seu negócio
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        Quatro frentes de atuação para que sua organização implemente Governança de IA com segurança, conformidade e estratégia.
                    </motion.p>
                </div>

                {/* Cards Grid — LEFT BORDER ACCENT (Stitch style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {consultancies.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className="group relative rounded-2xl bg-[#0A1222]/80 border border-white/5 hover:border-white/10 p-8 transition-all duration-400 overflow-hidden flex gap-6"
                            style={{ borderLeftColor: c.color, borderLeftWidth: '3px' }}
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                style={{ background: `radial-gradient(180px at 0% 50%, ${c.color}0D 0%, transparent 100%)` }}
                            />

                            {/* Icon */}
                            <div
                                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mt-1"
                                style={{ backgroundColor: `${c.color}15`, boxShadow: `0 0 20px ${c.color}10` }}
                            >
                                <c.icon className="w-6 h-6" style={{ color: c.color }} />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-inter text-lg font-bold text-white">{c.title}</h3>
                                    <span
                                        className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                                        style={{ color: c.color, backgroundColor: `${c.color}15` }}
                                    >
                                        {c.tag}
                                    </span>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed mb-4">{c.description}</p>

                                <ul className="space-y-1.5">
                                    {c.bullets.map((b, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs text-slate-400">
                                            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                                            {b}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className="mt-4 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ color: c.color }}
                                >
                                    Saiba mais <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link href="/contato">
                        <button className="group relative overflow-hidden px-8 py-4 border border-[#4F7EFF]/30 text-[#4F7EFF] rounded-xl font-bold tracking-wide hover:bg-[#4F7EFF] hover:text-white hover:border-[#4F7EFF] transition-all duration-300 flex items-center gap-2 mx-auto">
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                            <span className="relative">Ver especialistas</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
