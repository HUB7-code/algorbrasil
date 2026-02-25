'use client';

import { motion } from 'framer-motion';
import { BookOpen, Mic, Users, GraduationCap, Award, ArrowRight } from 'lucide-react';
import GlowIcon from '@/components/GlowIcon';
import Link from 'next/link';

const steps = [
    {
        icon: BookOpen,
        title: 'E-book',
        duration: 'Gratuito',
        tag: 'Conteúdo',
        color: '#4F7EFF',
        description: 'Governança de IA para Instituições Públicas — o ponto de entrada para compliance e legislação.',
    },
    {
        icon: Mic,
        title: 'Palestra',
        duration: '1 hora',
        tag: 'Sensibilização',
        color: '#60a5fa',
        description: 'IA como solução para legislação, avaliação de riscos, sanções e oportunidades de ROI para lideranças.',
    },
    {
        icon: Users,
        title: 'Workshop',
        duration: '8 horas',
        tag: 'Imersão',
        color: '#818CF8',
        description: 'Treinamento prático e imersivo no Plano de Adoção de IA para empresas. Hands-on com ferramentas reais.',
    },
    {
        icon: GraduationCap,
        title: 'Curso',
        duration: '12 horas',
        tag: 'Formação',
        color: '#a78bfa',
        description: 'Modelo de Governança de IA e ISO 42001. Para universidades e equipes executivas.',
    },
    {
        icon: Award,
        title: 'Certificação',
        duration: '48 horas',
        tag: 'Elite',
        color: '#F59E0B',
        description: 'Formação executiva completa de Advisor / Auditor / Gestor de Sistemas de Gestão de IA.',
    },
];

export default function TrainingJourney() {
    return (
        <section className="py-28 bg-[#0B0F1E] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#818CF8]/4 rounded-full blur-[200px] -translate-y-1/2" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(79,126,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(79,126,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
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
                        Trilha de Formação
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-inter text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        Do Básico à{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7EFF] to-[#F59E0B]">
                            Certificação Executiva
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        Uma jornada estruturada para construir competência real em Governança de IA — do conteúdo acessível à formação de elite.
                    </motion.p>
                </div>

                {/* ── TIMELINE ROW (Desktop) — linha + labels acima dos cards ── */}
                <div className="hidden lg:block relative mb-6">
                    {/* Track line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-slate-800/60" />

                    {/* Animated glowing fill */}
                    <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-px"
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        style={{
                            background: 'linear-gradient(90deg, #4F7EFF, #818CF8, #F59E0B)',
                            boxShadow: '0 0 8px rgba(245,158,11,0.35)',
                        }}
                    />

                    {/* Labels Grid — Matches exactly the 5-col grid of the cards below */}
                    <div className="grid grid-cols-5 gap-6 relative z-10">
                        {steps.map((step, i) => (
                            <div key={i} className="flex justify-center">
                                <div className="flex flex-col items-center gap-1 bg-[#0B0F1E] px-4">
                                    <span
                                        className="font-orbitron text-[10px] font-bold"
                                        style={{ color: step.color }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                        className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                                        style={{ color: step.color, backgroundColor: `${step.color}15` }}
                                    >
                                        {step.tag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── STEPS CARDS ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="relative rounded-2xl border bg-[#0A1222] hover:bg-[#0d1630] transition-all duration-300 group overflow-hidden z-10"
                            style={{
                                borderColor: `${step.color}30`,
                                background: `radial-gradient(120% 120% at 50% 0%, ${step.color}08 0%, rgba(10,18,34,0.9) 100%)`
                            }}
                        >
                            {/* Hover inner glow */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ boxShadow: `inset 0 0 40px ${step.color}08` }}
                            />

                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px]"
                                style={{ background: `linear-gradient(to right, transparent, ${step.color}, transparent)` }}
                            />

                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                style={{ boxShadow: `inset 0 0 40px ${step.color}08` }}
                            />

                            <div className="p-6">
                                {/* Icon */}
                                <div className="mb-4">
                                    <GlowIcon icon={step.icon} color={step.color} size="sm" pulse={false} />
                                </div>

                                {/* Title + Duration */}
                                <h3 className="font-inter text-white font-bold text-lg mb-1">{step.title}</h3>
                                <p className="text-xs font-bold mb-3" style={{ color: step.color }}>
                                    {step.duration}
                                </p>

                                {/* Description */}
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile connector arrows */}
                <div className="flex lg:hidden justify-center mt-3 mb-1">
                    <p className="text-slate-600 text-xs">↕ Progresso crescente</p>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link href="/contato">
                        <button className="group relative overflow-hidden px-8 py-4 bg-[#4F7EFF] text-white rounded-xl font-bold tracking-wide hover:bg-[#3D6AE8] hover:shadow-[0_0_30px_rgba(79,126,255,0.4)] transition-all duration-300 inline-flex items-center gap-2">
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                            <span className="relative">Escolher minha trilha</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
