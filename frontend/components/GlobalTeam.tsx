'use client';

import { motion } from 'framer-motion';
import { Users, Globe, MapPin, ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useCountUp } from '@/hooks/useCountUp';
import { SITE_CONFIG } from '@/config/site';

const regions = [
    { city: 'São Paulo', role: 'Gestor Regional', flag: '🇧🇷' },
    { city: 'Brasília', role: 'Gestor Regional', flag: '🇧🇷' },
    { city: 'Paraná', role: 'Gestor Regional', flag: '🇧🇷' },
    { city: 'Rio de Janeiro', role: 'Gestor Regional', flag: '🇧🇷' },
    { city: 'Ceará', role: 'Gestor Regional', flag: '🇧🇷' },
    { city: 'Paraíba', role: 'Gestor Regional', flag: '🇧🇷' },
    { city: 'London, UK', role: 'Sede Internacional', flag: '🇬🇧' },
    { city: 'Europa & EUA', role: 'Membros Globais', flag: '🌍' },
];

function CounterNum({ target, suffix }: { target: number; suffix: string }) {
    const { count, ref } = useCountUp({ target });
    return (
        <span ref={ref as React.RefObject<HTMLSpanElement>} className="font-orbitron text-5xl md:text-6xl font-bold text-white">
            {count}{suffix}
        </span>
    );
}

export default function GlobalTeam() {
    return (
        <section className="py-28 bg-[#080C18] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#4F7EFF]/4 rounded-full blur-[200px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(79,126,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(79,126,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
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
                        <Globe className="w-3.5 h-3.5" />
                        Nossa Autoridade
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-inter text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        250+ Especialistas.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7EFF] to-[#818CF8]">
                            Uma Missão.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        Traduzimos o "techês" em risco de negócio. Enquanto a sua equipe já usa IA, o{' '}
                        <span className="text-white font-semibold">PL 2338</span> prevê multas de até{' '}
                        <span className="text-white font-semibold">R$ 50 milhões</span> e responsabilidade objetiva para quem não tiver Supervisão Humana Significativa documentada.
                    </motion.p>
                </div>

                {/* Pain Point Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 mb-16 flex flex-col md:flex-row items-center gap-4"
                >
                    <div className="flex-shrink-0 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-white font-bold text-sm mb-1">
                            Sua equipe já usa IA. Você sabe como e onde?
                        </p>
                        <p className="text-slate-400 text-sm">
                            Shadow AI, LGPD e o PL 2338 criam passivos jurídicos invisíveis. A ALGOR Association mapeia e neutraliza esses riscos antes que eles virem multa.
                        </p>
                    </div>
                    <Link
                        href="#diagnostico"
                        className="flex-shrink-0 px-5 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-bold hover:bg-red-500/20 transition-colors whitespace-nowrap"
                    >
                        Ver soluções →
                    </Link>
                </motion.div>

                {/* Stats — Big Numbers */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                >
                    {/* 25 Consultores */}
                    <div className="relative rounded-2xl border border-slate-700/40 bg-white/[0.02] p-10 text-center group hover:border-[#4F7EFF]/30 transition-colors duration-300 overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#4F7EFF]/10 blur-[50px] rounded-full pointer-events-none" />
                        <div className="relative flex justify-center mb-4 z-10">
                            <div className="p-3 rounded-xl bg-[#4F7EFF]/10 border border-[#4F7EFF]/20">
                                <Users className="w-6 h-6 text-[#4F7EFF]" />
                            </div>
                        </div>
                        <CounterNum target={SITE_CONFIG.stats.brazilConsultants} suffix="+" />
                        <p className="font-orbitron text-[#4F7EFF] text-sm font-bold tracking-wider mt-2">CONSULTORES NO BRASIL</p>
                        <p className="text-slate-500 text-sm mt-3 max-w-xs mx-auto leading-relaxed">
                            Dedicados a atender as demandas do mercado nacional com especialização em AI Governance e Compliance.
                        </p>
                    </div>

                    {/* 250 Membros */}
                    <div className="relative rounded-2xl border border-slate-700/40 bg-white/[0.02] p-10 text-center group hover:border-[#818CF8]/30 transition-colors duration-300 overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#818CF8]/10 blur-[50px] rounded-full pointer-events-none" />
                        <div className="relative flex justify-center mb-4 z-10">
                            <div className="p-3 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/20">
                                <Globe className="w-6 h-6 text-[#818CF8]" />
                            </div>
                        </div>
                        <CounterNum target={SITE_CONFIG.stats.globalMembers} suffix="+" />
                        <p className="font-orbitron text-[#818CF8] text-sm font-bold tracking-wider mt-2">MEMBROS GLOBAIS</p>
                        <p className="text-slate-500 text-sm mt-3 max-w-xs mx-auto leading-relaxed">
                            Rede internacional de profissionais que aplicam metodologias inovadoras de Governança de IA.
                        </p>
                    </div>

                    {/* ISO 42001 */}
                    <div className="relative rounded-2xl border border-[#4F7EFF]/20 bg-[#4F7EFF]/5 p-10 text-center group hover:border-[#4F7EFF]/40 transition-colors duration-300 overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#4F7EFF]/10 blur-[50px] rounded-full pointer-events-none" />
                        <div className="relative flex justify-center mb-4 z-10">
                            <div className="p-3 rounded-xl bg-[#4F7EFF]/10 border border-[#4F7EFF]/30">
                                <span className="text-[#4F7EFF] text-lg font-black">AIMS</span>
                            </div>
                        </div>
                        <span className="font-orbitron text-4xl md:text-5xl font-bold text-white">ISO</span>
                        <span className="font-orbitron text-4xl md:text-5xl font-bold text-[#4F7EFF]"> 42001</span>
                        <p className="font-orbitron text-[#4F7EFF] text-sm font-bold tracking-wider mt-2">FRAMEWORK OFICIAL</p>
                        <p className="text-slate-500 text-sm mt-3 max-w-xs mx-auto leading-relaxed">
                            Nossa metodologia é 100% lastreada no padrão-ouro global de auditoria de IA (AIMS).
                        </p>
                    </div>
                </motion.div>

                {/* Regions Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest text-center mb-6">
                        Presença regional
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {regions.map((r, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-700/30 bg-white/[0.02] hover:border-[#4F7EFF]/20 transition-colors"
                            >
                                <span className="text-lg">{r.flag}</span>
                                <div>
                                    <p className="text-white text-xs font-bold">{r.city}</p>
                                    <p className="text-slate-500 text-[10px]">{r.role}</p>
                                </div>
                                <MapPin className="w-3 h-3 text-slate-600 ml-auto flex-shrink-0" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <Link
                        href="/board"
                        className="group relative overflow-hidden px-8 py-4 border border-[#4F7EFF]/30 text-[#4F7EFF] rounded-xl font-bold tracking-wide hover:bg-[#4F7EFF] hover:text-white transition-all duration-300 inline-flex items-center gap-2"
                    >
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                        <span className="relative">Conheça o Conselho Diretor</span>
                        <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
