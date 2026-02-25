'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Globe, Zap } from 'lucide-react';

export default function HeroCinematic() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0F1E]">
            {/* Ambient gradient lights */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-[#4F7EFF] rounded-full blur-[180px] opacity-10" />
                <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] bg-[#1E3A8A] rounded-full blur-[160px] opacity-10" />
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(79,126,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,126,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-6 pt-32 pb-20">
                {/* Institution tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4F7EFF]/30 bg-[#4F7EFF]/10 text-[#4F7EFF] text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md"
                >
                    <Shield className="w-3.5 h-3.5" />
                    Enterprise AI Governance
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="font-inter text-5xl md:text-7xl font-extrabold leading-[1.05] text-white mb-6 tracking-tight"
                >
                    Liderando a Era da{' '}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7EFF] to-[#818CF8]">
                        Governança de IA no Brasil
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Transformação digital com segurança, conformidade e inteligência estratégica
                    para o mercado B2B brasileiro.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                    <Link href="/contato">
                        <button className="group relative overflow-hidden px-8 py-4 bg-[#4F7EFF] text-white rounded-xl font-bold tracking-wide hover:bg-[#3D6AE8] hover:shadow-[0_0_30px_rgba(79,126,255,0.4)] transition-all duration-300 flex items-center gap-2">
                            {/* Shimmer sweep — GPU only (transform) */}
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                            <span className="relative">Solicitar Diagnóstico B2B</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <Link href="/#pillars">
                        <button className="px-8 py-4 border border-white/20 text-white/80 rounded-xl font-semibold hover:bg-white/5 hover:border-white/40 transition-all duration-300">
                            Conheça o Ecossistema
                        </button>
                    </Link>
                </motion.div>

                {/* Trust bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 border-t border-slate-700/50"
                >
                    {[
                        { icon: Shield, label: 'ISO 42001', sub: 'Certified' },
                        { icon: Globe, label: 'LGPD', sub: 'Compliant' },
                        { icon: Zap, label: '250+ Membros', sub: 'Globais' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#4F7EFF]/10 border border-[#4F7EFF]/20">
                                <item.icon className="w-4 h-4 text-[#4F7EFF]" />
                            </div>
                            <div className="text-left">
                                <p className="text-white font-bold text-sm">{item.label}</p>
                                <p className="text-slate-500 text-xs">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
