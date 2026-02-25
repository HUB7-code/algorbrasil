'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Compass, Shield, Brain, ArrowRight, Clock, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const consultancies = [
    {
        icon: Search,
        title: 'Diagnóstico de Risco',
        tag: 'Avaliação',
        color: '#00FF94',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
        description: 'Análise completa da infraestrutura atual de IA para identificar vulnerabilidades e gaps de compliance regulatório.',
        bullets: ['Maturidade organizacional', 'Gaps de conformidade', 'Roadmap prioritário'],
        duration: '2–4 semanas',
        clients: '180+ diagnósticos',
        cta: 'Agendar Diagnóstico',
    },
    {
        icon: Compass,
        title: 'Descoberta & Mapeamento',
        tag: 'Estratégia',
        color: '#4F7EFF',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
        description: 'Catalogação de todos os ativos de IA, shadow AI e fluxos de dados sensíveis dentro da organização.',
        bullets: ['Oportunidades de IA', 'Mapeamento de riscos', 'Shadow AI detection'],
        duration: '3–6 semanas',
        clients: '90+ mapeamentos',
        cta: 'Falar com Especialista',
    },
    {
        icon: Shield,
        title: 'Gestão Continuada',
        tag: 'Implementação',
        color: '#818CF8',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        description: 'Monitoramento em tempo real e ajustes de políticas conforme a evolução dos modelos de IA. ISO 42001 como framework central.',
        bullets: ['Políticas e controles', 'ISO 42001 nativa', 'Gestão contínua'],
        duration: 'Contrato mensal',
        clients: '60+ contratos ativos',
        cta: 'Ver Pacotes',
    },
    {
        icon: Brain,
        title: 'Cultura AI First',
        tag: 'Transformação',
        color: '#F59E0B',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
        description: 'Treinamento e aculturamento de equipes para uso ético, seguro e produtivo de ferramentas generativas.',
        bullets: ['Change management', 'Capacitação interna', 'Cultura de inovação'],
        duration: '4–8 semanas',
        clients: '2.000+ treinados',
        cta: 'Proposta Personalizada',
    },
];

// Animated glow dot that pulses in sync on hover
function PulseDot({ color }: { color: string }) {
    return (
        <span className="relative flex h-2 w-2">
            <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: color }}
            />
            <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: color }}
            />
        </span>
    );
}

function SolutionCard({ c, i }: { c: typeof consultancies[0]; i: number }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative rounded-3xl border border-white/5 hover:border-white/25 overflow-hidden flex flex-col transition-all duration-500 will-change-transform"
            style={{
                borderLeftColor: c.color,
                borderLeftWidth: '3px',
                boxShadow: hovered ? `0 24px 70px ${c.color}25, 0 0 0 1px ${c.color}30` : undefined,
                transform: hovered ? 'translateY(-8px) scale(1.015)' : undefined,
            }}
        >
            {/* Background Image with living parallax */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={c.image}
                    alt={c.title}
                    className="object-cover w-full h-full transition-all duration-700 mix-blend-luminosity"
                    style={{
                        opacity: hovered ? 0.45 : 0.25,
                        transform: hovered ? 'scale(1.08)' : 'scale(1)',
                    }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1222] via-[#0A1222]/95 to-[#0A1222]/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1222] via-transparent to-transparent" />
            </div>

            {/* Chromatic color pulse on hover */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
                animate={{ opacity: hovered ? 0.08 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: `radial-gradient(circle at 30% 50%, ${c.color}, transparent 60%)` }}
            />

            {/* Card Content */}
            <div className="relative z-10 p-7 flex gap-5 flex-1">
                {/* Icon — glows on hover using CSS custom property */}
                <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mt-1 backdrop-blur-md border border-white/10 transition-all duration-400"
                    style={{
                        backgroundColor: hovered ? `${c.color}30` : `${c.color}15`,
                        boxShadow: hovered ? `0 0 30px ${c.color}50` : `0 0 12px ${c.color}20`,
                    }}
                >
                    <c.icon
                        className="w-6 h-6 transition-transform duration-400 group-hover:scale-110"
                        style={{
                            color: c.color,
                            '--glow-color': c.color,
                            filter: hovered
                                ? `drop-shadow(0 0 8px ${c.color}) drop-shadow(0 0 18px ${c.color}80) brightness(1.3)`
                                : 'none',
                            transition: 'filter 0.4s ease, transform 0.4s ease',
                        } as React.CSSProperties}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="font-inter text-lg font-bold text-white leading-tight">{c.title}</h3>
                        <span
                            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10 flex-shrink-0 ml-2"
                            style={{ color: c.color, backgroundColor: `${c.color}20` }}
                        >
                            {c.tag}
                        </span>
                    </div>

                    {/* Description — improved contrast */}
                    <p className="text-sm leading-relaxed mb-4 transition-colors duration-300" style={{ color: hovered ? 'rgba(226,232,240,0.95)' : 'rgba(148,163,184,0.85)' }}>
                        {c.description}
                    </p>

                    {/* Bullets with animated checkmarks — improved contrast */}
                    <ul className="space-y-2 mb-5">
                        {c.bullets.map((b, j) => (
                            <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -8 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: i * 0.12 + j * 0.07 + 0.3 }}
                                className="flex items-center gap-2 text-xs transition-colors duration-300"
                                style={{ color: hovered ? 'rgba(203,213,225,0.95)' : 'rgba(148,163,184,0.8)' }}
                            >
                                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-400 group-hover:scale-110" style={{ color: c.color }} />
                                {b}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Metadata row — duration & social proof */}
                    <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-auto">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock className="w-3.5 h-3.5" style={{ color: c.color }} />
                            <span className="group-hover:text-slate-300 transition-colors">{c.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <PulseDot color={c.color} />
                            <span className="group-hover:text-slate-300 transition-colors">{c.clients}</span>
                        </div>

                        {/* Reveal CTA on hover */}
                        <motion.div
                            className="ml-auto"
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
                            transition={{ duration: 0.25 }}
                        >
                            <Link href="/contato">
                                <button
                                    className="text-xs font-bold flex items-center gap-1 transition-colors duration-300"
                                    style={{ color: c.color }}
                                >
                                    {c.cta} <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function CinematicSolutions() {
    return (
        <section id="pillars" className="py-28 bg-[#080C18] relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#4F7EFF] rounded-full blur-[280px] opacity-[0.04]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#818CF8] rounded-full blur-[200px] opacity-[0.03]" />
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
                        <PulseDot color="#4F7EFF" />
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

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {consultancies.map((c, i) => (
                        <SolutionCard key={i} c={c} i={i} />
                    ))}
                </div>

                {/* CTA Block — high-conversion footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl border border-[#4F7EFF]/20 bg-gradient-to-br from-[#4F7EFF]/10 via-[#080C18] to-[#818CF8]/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
                >
                    {/* Decorative glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#4F7EFF] rounded-full blur-[120px] opacity-10" />
                    </div>

                    <div className="relative text-center md:text-left">
                        <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                            <PulseDot color="#00FF94" />
                            <span className="text-xs font-bold text-[#00FF94] uppercase tracking-widest">Especialistas disponíveis agora</span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-white mb-1">Pronto para estruturar sua Governança de IA?</h3>
                        <p className="text-slate-400 text-sm">Diagnóstico inicial sem custo. Resultado em até 5 dias úteis.</p>
                    </div>

                    <div className="relative flex flex-col sm:flex-row gap-3 flex-shrink-0">
                        <Link href="/contato">
                            <button className="group relative overflow-hidden px-7 py-3.5 bg-[#00FF94] text-black rounded-xl font-bold tracking-wide hover:bg-[#00CC76] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                                <span className="relative">Falar com Especialista</span>
                                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link href="/contato">
                            <button className="px-7 py-3.5 border border-[#4F7EFF]/40 text-[#4F7EFF] rounded-xl font-bold hover:bg-[#4F7EFF]/10 hover:border-[#4F7EFF] transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Ver nossa equipe
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
