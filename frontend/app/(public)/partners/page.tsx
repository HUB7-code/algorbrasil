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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-700">
                        <Briefcase className="w-4 h-4 text-[#00A3FF]" />
                        <span className="text-sm font-mono text-[#00A3FF] tracking-wider uppercase">Para Consultores & Advogados</span>
                    </div>

                    <h1 className="font-orbitron text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight animate-in fade-in zoom-in duration-1000">
                        Escale sua Consultoria.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00FF94]">
                            Automatize sua Auditoria.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                        Pare de vender horas. Comece a vender <strong>Infraestrutura de Governança</strong>.
                        Torne-se um parceiro ALGOR e utilize nossa tecnologia White-Label para entregar conformidade ISO 42001 em escala.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        <Link
                            href="/partners/apply"
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

                {/* --- VISUAL SHOWCASE: THE PARTNER TOOLKIT --- */}
                {/* Reusing existing assets to show value */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="font-orbitron text-3xl font-bold mb-4">O Arsenal Tecnológico do Parceiro</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Você não recebe apenas uma certificação. Você recebe uma plataforma de guerra para governança de IA.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* CARD 1: TECHNICAL AUDIT */}
                        <div className="group relative">
                            {/* Cinematic Container */}
                            <div className="relative w-full aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-[#0F172A]/50 backdrop-blur-sm transition-all duration-700 group-hover:scale-[1.02] group-hover:border-[#00FF94]/30">
                                <Image
                                    src="/images/partners/audit_tool.png"
                                    alt="Technical Audit Tool"
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.8)_100%)] mixed-blend-multiply" />
                                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-[#0F172A] to-transparent opacity-90" />

                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="w-12 h-12 bg-[#00FF94]/20 rounded-xl flex items-center justify-center mb-4 text-[#00FF94] backdrop-blur-md border border-[#00FF94]/30">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">Tech-Enabled Audit</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Use o <strong>ALGOR Trust Hub</strong> para escanear pipelines CI/CD e modelos Python. Auditoria em nível de código, não apenas papelada.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: RISK MANAGEMENT */}
                        <div className="group relative">
                            {/* Cinematic Container */}
                            <div className="relative w-full aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-[#0F172A]/50 backdrop-blur-sm transition-all duration-700 group-hover:scale-[1.02] group-hover:border-[#00A3FF]/30">
                                <Image
                                    src="/images/partners/dashboard_map.png"
                                    alt="Management Dashboard"
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.8)_100%)] mixed-blend-multiply" />
                                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-[#0F172A] to-transparent opacity-90" />

                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="w-12 h-12 bg-[#00A3FF]/20 rounded-xl flex items-center justify-center mb-4 text-[#00A3FF] backdrop-blur-md border border-[#00A3FF]/30">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">Gestão Multi-Cliente</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Gerencie governança de 10, 50, 100 clientes em um único painel. Gere receita recorrente (RaaS) licenciando nossa infraestrutura.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3: LEGAL FORTRESS */}
                        <div className="group relative">
                            {/* Cinematic Container */}
                            <div className="relative w-full aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-[#0F172A]/50 backdrop-blur-sm transition-all duration-700 group-hover:scale-[1.02] group-hover:border-purple-400/30">
                                <Image
                                    src="/images/partners/certificate.png"
                                    alt="Legal & Certification"
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.8)_100%)] mixed-blend-multiply" />
                                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-[#0F172A] to-transparent opacity-90" />

                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-purple-400 backdrop-blur-md border border-purple-500/30">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">Certificação Elite</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Acesso à <strong>ALGOR Academy</strong>. Torne-se um  Implementador Líder ISO 42001 e domine a intersecção entre Direito e Tecnologia.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- THE SHIFT (Problem/Solution) --- */}
                <section className="grid lg:grid-cols-2 gap-16 mb-32">
                    <div className="relative h-full">
                        <div className="absolute inset-0 bg-[#00A3FF]/20 blur-[60px] rounded-full" />
                        <div className="glass-panel p-8 rounded-2xl border border-white/10 relative z-10 transition-transform duration-500 hover:-translate-y-2 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="font-orbitron text-2xl mb-6 border-b border-white/10 pb-4">O Velho Modelo (Consultoria 1.0)</h3>
                                <ul className="space-y-4 text-gray-400">
                                    <li className="flex gap-3">
                                        <span className="text-red-500 font-bold">✕</span>
                                        <span>Venda de horas limitadas (Teto de receita).</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-500 font-bold">✕</span>
                                        <span>Auditoria manual baseada em amostragem (Risco alto).</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-500 font-bold">✕</span>
                                        <span>Cliente cancela após obter o certificado (Churn alto).</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-500 font-bold">✕</span>
                                        <span>Medo constante de ser substituído por IA.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* VS Badge - Centered relative to the container height */}
                        <div className="absolute top-1/2 right-[-4rem] transform -translate-y-1/2 z-20 hidden lg:flex w-16 h-16 bg-white text-[#0A1A2F] font-black items-center justify-center rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] border-4 border-[#0A1A2F]">
                            VS
                        </div>
                    </div>

                    <div className="relative h-full">
                        <div className="absolute inset-0 bg-[#00FF94]/20 blur-[60px] rounded-full" />
                        <div className="glass-panel p-8 rounded-2xl border border-[#00FF94]/30 relative z-10 bg-[#0A1A2F]/80 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,255,148,0.1)] h-full flex flex-col justify-between">
                            <div>
                                <h3 className="font-orbitron text-2xl mb-6 border-b border-white/10 pb-4 text-[#00FF94]">O Modelo ALGOR (Consultoria 2.0)</h3>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#00FF94] flex-shrink-0" />
                                        <span><strong>Receita Recorrente</strong> via licenciamento de software (RaaS).</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#00FF94] flex-shrink-0" />
                                        <span>Auditoria <strong>Automatizada</strong> (100% dos dados).</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#00FF94] flex-shrink-0" />
                                        <span>Lock-in operacional: O cliente precisa de você para manter o sistema.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#00FF94] flex-shrink-0" />
                                        <span>Você usa a IA como <strong>alavanca de escala</strong>.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CTA FINAL --- */}
                <section className="text-center py-20 border-t border-white/10">
                    <h2 className="font-orbitron text-4xl font-bold mb-6">Sua cadeira no futuro da Governança está vazia.</h2>
                    <p className="text-gray-400 mb-8">As vagas para Partner Regional são limitadas por geografia.</p>
                    <Link
                        href="/partners/apply"
                        className="inline-flex px-10 py-4 bg-white text-[#0A1A2F] font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Inscrever-me Agora
                    </Link>
                </section>

            </div>
        </div>
    );
}
