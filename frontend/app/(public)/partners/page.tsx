'use client';

import React from 'react';
import { Briefcase, Zap, GraduationCap, Network, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PartnersPage() {
    return (
        <div className="min-h-screen bg-[#050511] text-white pt-24 pb-20 font-sans selection:bg-[#00A3FF] selection:text-white">

            {/* Background Ambience (Distinct Blue for Partners) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#0A1A2F] to-transparent opacity-80" />
                <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-[#00A3FF]/10 rounded-full blur-[120px]" />
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- HERO SECTION --- */}
                <header className="text-center py-20 lg:py-28">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <Briefcase className="w-4 h-4 text-[#00A3FF]" />
                        <span className="text-sm font-mono text-[#00A3FF] tracking-wider uppercase">Para Consultores & Advogados</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                        Escale sua Consultoria.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-white">
                            Automatize sua Auditoria.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        Pare de vender horas. Comece a vender <strong>Infraestrutura de Governança</strong>.
                        Torne-se um parceiro ALGOR e utilize nossa tecnologia White-Label para entregar conformidade ISO 42001 em escala.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="https://wa.me/558599851769?text=Quero%20me%20tornar%20um%20Consultor%20Parceiro%20ALGOR."
                            className="px-8 py-4 bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(0,163,255,0.3)] hover:shadow-[0_0_50px_rgba(0,163,255,0.5)] flex items-center gap-3"
                        >
                            Aplicar para Parceria
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/associates"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all backdrop-blur-sm flex items-center gap-3"
                        >
                            Ver Rede de Associados
                            <Network className="w-5 h-5" />
                        </Link>
                    </div>
                </header>

                {/* --- THE SHIFT (Problem/Solution) --- */}
                <section className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#00A3FF]/20 blur-[60px] rounded-full" />
                        <div className="glass-panel p-8 rounded-2xl border border-white/10 relative z-10">
                            <h3 className="text-2xl font-serif mb-6 border-b border-white/10 pb-4">O Velho Modelo (Consultoria 1.0)</h3>
                            <ul className="space-y-4 text-gray-400">
                                <li className="flex gap-3">
                                    <span className="text-red-500">✕</span>
                                    <span>Venda de horas limitadas (Teto de receita).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-500">✕</span>
                                    <span>Auditoria manual baseada em amostragem (Risco alto).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-500">✕</span>
                                    <span>Cliente cancela após obter o certificado (Churn alto).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-500">✕</span>
                                    <span>Medo constante de ser substituído por IA.</span>
                                </li>
                            </ul>
                        </div>

                        {/* VS Badge */}
                        <div className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 z-20 bg-white text-black font-bold p-3 rounded-full hidden lg:block">VS</div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-[#00FF94]/20 blur-[60px] rounded-full" />
                        <div className="glass-panel p-8 rounded-2xl border border-[#00FF94]/30 relative z-10 bg-[#0A1A2F]/80">
                            <h3 className="text-2xl font-serif mb-6 border-b border-white/10 pb-4 text-[#00FF94]">O Modelo ALGOR (Consultoria 2.0)</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#00FF94]" />
                                    <span><strong>Receita Recorrente</strong> via licenciamento de software (RaaS).</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#00FF94]" />
                                    <span>Auditoria contínuaAutomatizada (100% dos dados).</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#00FF94]" />
                                    <span>Lock-in operacional: O cliente precisa de você para manter o sistema.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#00FF94]" />
                                    <span>Você usa a IA como alavanca de escala.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- BENEFITS GRID --- */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold text-center mb-16">O Kit de Poder do Parceiro</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-[#00A3FF]/20 rounded-lg flex items-center justify-center mb-6 text-[#00A3FF]">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Tech-Enabled Audit</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Acesse o <strong>ALGOR Trust Hub</strong> para rodar diagnósticos automatizados nos seus clientes. Gere relatórios de viés e risco em minutos, não semanas.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-[#00A3FF]/20 rounded-lg flex items-center justify-center mb-6 text-[#00A3FF]">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Certificação Auditor Líder</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Treinamento oficial e certificação reconhecida. Aprenda não apenas a teoria ISO, mas como auditar *código* e pipelines de CI/CD.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-[#00A3FF]/20 rounded-lg flex items-center justify-center mb-6 text-[#00A3FF]">
                                <Network className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Rede de Indicações</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Receba leads qualificados (Empresas) que procuram implementação na sua região. Clientes Enterprise confiam na marca ALGOR.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- CTA FINAL --- */}
                <section className="text-center py-20 border-t border-white/10">
                    <h2 className="text-4xl font-bold mb-6">Sua cadeira no futuro da Governança está vazia.</h2>
                    <p className="text-gray-400 mb-8">As vagas para Partner Regional são limitadas por geografia.</p>
                    <Link
                        href="https://wa.me/558599851769?text=Quero%20me%20inscrever%20no%20programa%20de%20Parceiros."
                        className="inline-flex px-10 py-4 bg-white text-[#0A1A2F] font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Inscrever-me Agora
                    </Link>
                </section>

            </div>
        </div>
    );
}
