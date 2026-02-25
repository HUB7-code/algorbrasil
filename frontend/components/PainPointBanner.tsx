'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, ShieldCheck, Download } from 'lucide-react';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';

const pains = [
    {
        icon: AlertTriangle,
        label: 'Multas & Sanções',
        detail: 'LGPD, IA Act europeu e resoluções do BACEN exigem conformidade ativa — não apenas declaratória.',
        color: '#F59E0B',
    },
    {
        icon: TrendingUp,
        label: 'Shadow AI Crescente',
        detail: 'Mais de 60% dos funcionários já usam IA não autorizada. Cada uso não mapeado é um vetor de risco.',
        color: '#4F7EFF',
    },
    {
        icon: ShieldCheck,
        label: 'Confiança como Diferencial',
        detail: 'Organizações certificadas ISO 42001 fecham contratos 3× mais rápido em licitações e RFPs enterprise.',
        color: '#00FF94',
    },
];

export default function PainPointBanner() {
    return (
        <section className="relative py-20 bg-[#07091A] overflow-hidden">
            {/* Ambient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4F7EFF]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4F7EFF]/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,126,255,0.06)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Hook Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-14"
                >
                    <span className="inline-block text-[#F59E0B] text-xs font-black tracking-[0.2em] uppercase mb-4">
                        ⚠ O cenário atual
                    </span>
                    <h2 className="font-inter text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight max-w-4xl mx-auto">
                        Não espere a multa chegar.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7EFF] to-[#00FF94]">
                            Transforme o risco da IA em vantagem competitiva auditável.
                        </span>
                    </h2>
                    <p className="mt-5 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Enquanto sua concorrência ignora o tema, organizações que governam IA hoje colhem o prêmio de confiança amanhã.
                    </p>
                </motion.div>

                {/* Pain Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {pains.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative rounded-2xl border border-white/5 hover:border-white/15 p-6 transition-all duration-400 overflow-hidden"
                            style={{
                                background: `radial-gradient(120% 120% at 50% -10%, ${p.color}08 0%, rgba(7,9,26,0.8) 60%)`,
                            }}
                        >
                            {/* Top glow line */}
                            <div
                                className="absolute top-0 left-6 right-6 h-px rounded-full"
                                style={{ background: `linear-gradient(to right, transparent, ${p.color}60, transparent)` }}
                            />

                            <div className="flex items-start gap-4">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                                    style={{ backgroundColor: `${p.color}15`, boxShadow: `0 0 16px ${p.color}25` }}
                                >
                                    <p.icon className="w-5 h-5" style={{ color: p.color }} />
                                </div>
                                <div>
                                    <h3 className="font-inter font-bold text-white text-base mb-1.5">{p.label}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                        {p.detail}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lead Capture CTA - Framework de Governança */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <SignedIn>
                        <a
                            href="/assets/Framework_Governanca_IA.pdf"
                            download
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00FF94] text-black font-bold rounded-xl hover:bg-[#00CC76] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all"
                        >
                            <Download className="w-5 h-5" />
                            Baixar Framework de Governança (PDF)
                        </a>
                    </SignedIn>
                    <SignedOut>
                        <SignUpButton mode="modal" fallbackRedirectUrl="/assets/Framework_Governanca_IA.pdf">
                            <button className="inline-flex items-center gap-3 px-8 py-4 bg-[#00FF94] text-black font-bold rounded-xl hover:bg-[#00CC76] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all">
                                <Download className="w-5 h-5" />
                                Baixar Framework de Governança (PDF)
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <p className="mt-4 text-slate-500 text-sm">
                        Material executivo exclusivo. O acesso requer um breve cadastro.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
