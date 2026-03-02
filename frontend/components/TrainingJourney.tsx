'use client';

import { motion } from 'framer-motion';
import { Search, Settings, Brain, Scale, Rocket, ArrowRight } from 'lucide-react';
import GlowIcon from '@/components/GlowIcon';

// Calendly placeholder — substituir pelo link real quando disponível
const CALENDLY_URL = 'https://calendly.com/algorbrasil/diagnostico-n7';

const stages = [
    {
        icon: Search,
        title: 'Descoberta',
        stage: 'Estágio 1',
        tag: 'Diagnóstico',
        color: '#4F7EFF',
        description: 'Shadow AI não mapeada, sem inventário de sistemas. A organização usa IA sem governança ou controle centralizado.',
        alert: 'Exposição crítica ao PL 2338',
    },
    {
        icon: Settings,
        title: 'Gestão',
        stage: 'Estágio 2',
        tag: 'Controles',
        color: '#60a5fa',
        description: 'Iniciativas isoladas de governança. Políticas parciais, sem estratégia integrada nem responsável (AI Officer) formal.',
        alert: 'Risco Alto — sem accountability',
    },
    {
        icon: Brain,
        title: 'Cultura',
        stage: 'Estágio 3',
        tag: 'Pessoas',
        color: '#818CF8',
        description: 'Governança operacional parcial. Equipes treinadas, mas ausência de auditoria e supervisão humana documentada.',
        alert: 'Risco Moderado',
    },
    {
        icon: Scale,
        title: 'Regulação',
        stage: 'Estágio 4',
        tag: 'Compliance',
        color: '#a78bfa',
        description: 'Conformidade ativa com ISO 42001, LGPD e PL 2338. Supervisão Humana Significativa implementada e auditável.',
        alert: 'Risco Baixo — conformidade operacional',
    },
    {
        icon: Rocket,
        title: 'Autonomia',
        stage: 'Estágio 5',
        tag: 'Elite',
        color: '#F59E0B',
        description: 'Governança autossustentável. IA gerenciada de forma independente, com KPIs, auditorias periódicas e certificação ISO.',
        alert: 'Risco Residual — padrão-ouro',
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
                        Mapa de Maturidade ALGOR
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-inter text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        Em qual estágio sua{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7EFF] to-[#F59E0B]">
                            organização está?
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        A régua universal da ALGOR Association. Os 5 Estágios de Maturidade em Governança de IA — do risco crítico ao padrão-ouro auditável.
                    </motion.p>
                </div>

                {/* ── TIMELINE ROW (Desktop) ── */}
                <div className="hidden lg:block relative mb-6">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-slate-800/60" />
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
                    <div className="grid grid-cols-5 gap-6 relative z-10">
                        {stages.map((s, i) => (
                            <div key={i} className="flex justify-center">
                                <div className="flex flex-col items-center gap-1 bg-[#0B0F1E] px-4">
                                    <span className="font-orbitron text-[10px] font-bold" style={{ color: s.color }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                        className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                                        style={{ color: s.color, backgroundColor: `${s.color}15` }}
                                    >
                                        {s.tag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── STAGE CARDS ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                    {stages.map((s, i) => {
                        const isElite = s.tag === 'Elite';
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="relative rounded-2xl border bg-[#0A1222] hover:bg-[#0d1630] transition-all duration-300 group overflow-visible z-10"
                                style={{
                                    borderColor: isElite ? '#F59E0B60' : `${s.color}30`,
                                    background: isElite
                                        ? `radial-gradient(120% 120% at 50% 0%, #F59E0B12 0%, rgba(10,18,34,0.95) 100%)`
                                        : `radial-gradient(120% 120% at 50% 0%, ${s.color}08 0%, rgba(10,18,34,0.9) 100%)`,
                                    boxShadow: isElite ? '0 0 0 1px rgba(245,158,11,0.2)' : undefined,
                                }}
                            >
                                {isElite && (
                                    <>
                                        <motion.div
                                            className="absolute -inset-[2px] rounded-2xl pointer-events-none"
                                            animate={{
                                                boxShadow: [
                                                    '0 0 20px rgba(245,158,11,0.2), 0 0 40px rgba(245,158,11,0.08)',
                                                    '0 0 35px rgba(245,158,11,0.35), 0 0 70px rgba(245,158,11,0.15)',
                                                    '0 0 20px rgba(245,158,11,0.2), 0 0 40px rgba(245,158,11,0.08)',
                                                ],
                                            }}
                                            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-70" />
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#F59E0B] text-black text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#F59E0B]/40 whitespace-nowrap z-20">
                                            ★ Padrão-Ouro
                                        </div>
                                    </>
                                )}

                                {!isElite && (
                                    <div
                                        className="absolute top-0 left-0 right-0 h-[2px]"
                                        style={{ background: `linear-gradient(to right, transparent, ${s.color}, transparent)` }}
                                    />
                                )}

                                <div className="p-6">
                                    <div className="mb-4">
                                        <GlowIcon icon={s.icon} color={s.color} size="sm" pulse={isElite} />
                                    </div>

                                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: s.color }}>
                                        {s.stage}
                                    </p>
                                    <h3 className="font-inter text-white font-bold text-lg mb-3">{s.title}</h3>
                                    <p className="text-slate-400 text-xs leading-relaxed mb-4">{s.description}</p>

                                    {/* Alert badge */}
                                    <div
                                        className="text-[9px] font-bold px-2 py-1 rounded-lg"
                                        style={{
                                            color: s.color,
                                            backgroundColor: `${s.color}15`,
                                            border: `1px solid ${s.color}30`,
                                        }}
                                    >
                                        {s.alert}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-slate-500 text-sm mb-6">
                        Não sabe em qual estágio sua empresa está? Nossos auditores identificam em 15 minutos.
                    </p>
                    <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden px-8 py-4 bg-[#4F7EFF] text-white rounded-xl font-bold tracking-wide hover:bg-[#3D6AE8] hover:shadow-[0_0_30px_rgba(79,126,255,0.4)] transition-all duration-300 inline-flex items-center gap-2"
                    >
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                        <span className="relative">Descobrir meu Estágio de Maturidade</span>
                        <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
