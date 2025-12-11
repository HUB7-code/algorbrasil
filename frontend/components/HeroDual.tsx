'use client';

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Users, Activity, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function HeroDual() {
    const router = useRouter();
    const [hoveredSide, setHoveredSide] = useState<'corporate' | 'professional' | null>(null);

    const handleDiagnosticClick = () => {
        const token = localStorage.getItem("algor_token");
        if (token) {
            router.push("/dashboard/assessments/new");
        } else {
            router.push("/login?redirect=/dashboard/assessments/new");
        }
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col pt-48 pb-48 md:pb-32 px-4 md:px-0 overflow-hidden">

            {/* Background Effects - Dynamic based on hover */}
            {/* Background Effects - Dynamic based on hover */}
            {/* Removed conflicting blobs to prioritize Brain 3D Effect */}

            {/* Main Headline */}
            <div className="relative z-10 text-center mb-0 animate-in slide-in-from-top-10 fade-in duration-700">
                <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#00FF94] text-[10px] md:text-xs font-mono tracking-[0.2em] mb-10 uppercase backdrop-blur-md">
                    Ecossistema de Inteligência Viva
                </span>
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-6">
                    A Convergência entre <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-green-400">
                        Tecnologia e Governança
                    </span>
                </h1>
                <p className="font-light text-gray-300 max-w-2xl mx-auto text-sm md:text-lg">
                    O centro de excelência em auditoria algorítmica e conformidade ISO 42001 do Brasil.
                </p>
            </div>

            {/* Neural Cortex Animation - Spacer & Visual (Handled by Layout) */}
            <div className="w-full relative z-0 h-[200px] md:h-[300px]" />

            {/* Dual Funnel Cards */}
            <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-6 px-4 md:px-8 -mt-24">

                {/* Corporate Side */}
                <div
                    onMouseEnter={() => setHoveredSide('corporate')}
                    onMouseLeave={() => setHoveredSide(null)}
                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A1A2F]/60 backdrop-blur-xl p-8 md:p-12 transition-all duration-500 hover:border-[#00A3FF]/50 hover:shadow-[0_0_50px_rgba(0,163,255,0.15)] ${hoveredSide === 'professional' ? 'md:opacity-50 md:scale-[0.98]' : ''}`}
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-32 h-32 text-[#00A3FF]" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full items-start">
                        <div className="w-12 h-12 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center mb-6 text-[#00A3FF] border border-[#00A3FF]/20 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-6 h-6" />
                        </div>

                        <h2 className="font-serif text-3xl text-white mb-2">Para Empresas</h2>
                        <h3 className="font-mono text-xs text-[#00A3FF] tracking-widest uppercase mb-6">Proteção & Compliance</h3>

                        <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
                            Mitigue riscos regulatórios (PL 2338) e audite seus modelos de IA com nossa metodologia proprietária. Diagnostique sua maturidade agora.
                        </p>

                        <div className="mt-auto pt-6 w-full border-t border-white/5">
                            <ul className="space-y-3 mb-8 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#00A3FF]" /> Auditoria ISO 42001 Ready</li>
                                <li className="flex items-center gap-2"><Activity className="w-4 h-4 text-[#00A3FF]" /> Monitoramento de Risco Contínuo</li>
                            </ul>

                            <button
                                onClick={handleDiagnosticClick}
                                className="w-full py-4 bg-[#00A3FF] hover:bg-[#33B5FF] text-white font-bold tracking-wider uppercase text-xs rounded transition-all shadow-lg shadow-[#00A3FF]/20 group-hover:shadow-[#00A3FF]/40 flex items-center justify-center gap-2"
                            >
                                Diagnóstico Gratuito
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Professional Side */}
                <div
                    onMouseEnter={() => setHoveredSide('professional')}
                    onMouseLeave={() => setHoveredSide(null)}
                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A1A2F]/60 backdrop-blur-xl p-8 md:p-12 transition-all duration-500 hover:border-[#00FF94]/50 hover:shadow-[0_0_50px_rgba(0,255,148,0.15)] ${hoveredSide === 'corporate' ? 'md:opacity-50 md:scale-[0.98]' : ''}`}
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-32 h-32 text-[#00FF94]" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full items-start">
                        <div className="w-12 h-12 rounded-lg bg-[#00FF94]/10 flex items-center justify-center mb-6 text-[#00FF94] border border-[#00FF94]/20 group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6" />
                        </div>

                        <h2 className="font-serif text-3xl text-white mb-2">Para Profissionais</h2>
                        <h3 className="font-mono text-xs text-[#00FF94] tracking-widest uppercase mb-6">Carreira & Associação</h3>

                        <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
                            Junte-se à elite da governança. Acesse metodologias exclusivas, ferramentas de auditoria e conecte-se com o board nacional.
                        </p>

                        <div className="mt-auto pt-6 w-full border-t border-white/5">
                            <ul className="space-y-3 mb-8 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#00FF94]" /> Certificação de Auditor Líder</li>
                                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-[#00FF94]" /> Networking com C-Levels</li>
                            </ul>

                            <Link href="/register" className="w-full">
                                <button className="w-full py-4 bg-transparent border border-[#00FF94] text-[#00FF94] hover:bg-[#00FF94] hover:text-[#0A1A2F] font-bold tracking-wider uppercase text-xs rounded transition-all shadow-lg shadow-[#00FF94]/5 group-hover:shadow-[#00FF94]/30 flex items-center justify-center gap-2">
                                    Aplicar para Associação
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}
