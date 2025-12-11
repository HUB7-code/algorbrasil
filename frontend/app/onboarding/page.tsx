"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, UserCircle2, ArrowRight, CheckCircle2, ShieldCheck, Activity, Lock, Users } from "lucide-react";
import CorporateOnboardingForm from "@/components/onboarding/CorporateOnboardingForm";
import ProfessionalOnboardingForm from "@/components/onboarding/ProfessionalOnboardingForm";
import HeroScene from "@/components/HeroScene";
import AnimatedWave from "@/components/AnimatedWave";

export default function OnboardingPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<"corporate" | "professional" | null>(null);
    const [completed, setCompleted] = useState(false);

    const [hoveredSide, setHoveredSide] = useState<"corporate" | "professional" | null>(null);

    if (completed) {
        return (
            <div className="min-h-screen w-full bg-[#0A1A2F] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-white">
                <HeroScene />
                <div className="glass-panel p-12 rounded-2xl text-center max-w-lg w-full border border-white/10 relative z-10 animate-in zoom-in-95 duration-500 shadow-[0_0_100px_rgba(0,255,148,0.2)] bg-[#0A1A2F]/80 backdrop-blur-xl mb-10">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 ring-1 ring-[#00FF94]/50 shadow-[0_0_30px_rgba(0,255,148,0.3)]">
                        <CheckCircle2 className="w-12 h-12 text-[#00FF94]" />
                    </div>
                    <h2 className="text-4xl font-serif text-white mb-4 tracking-tight">Onboarding Concluído</h2>
                    <p className="text-[#00A3FF]/80 mb-10 font-light text-lg leading-relaxed">
                        Sua identidade digital foi forjada na <span className="text-[#00FF94] font-medium">Fortaleza Digital</span>.
                    </p>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full py-4 bg-[#00FF94] text-[#0A1A2F] font-bold text-xs rounded uppercase tracking-widest hover:bg-[#00FF94]/90 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(0,255,148,0.4)]"
                    >
                        Entrar no Console
                    </button>
                </div>
            </div>
        );
    }

    if (selectedRole) {
        return (
            <main className="min-h-screen w-full bg-[#0A1A2F] flex items-center justify-center py-10 px-4 relative overflow-hidden font-sans text-white pb-32">
                <HeroScene />
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#00A3FF] rounded-full mix-blend-screen filter blur-[120px] opacity-5 animate-blob" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00FF94] rounded-full mix-blend-screen filter blur-[100px] opacity-5 animate-blob" style={{ animationDelay: '2s' }} />
                </div>
                <div className={`fixed inset-0 transition-colors duration-1000 pointer-events-none z-0 ${selectedRole === 'corporate' ? 'bg-[#00A3FF]/5' : 'bg-[#00FF94]/5'}`} />

                <div className="z-10 w-full max-w-3xl animate-in slide-in-from-bottom-10 fade-in duration-700">
                    <div className="glass-panel border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-[#0A1A2F]/80">
                        <div className={`p-10 border-b border-white/5 relative overflow-hidden
                             ${selectedRole === 'corporate' ? 'bg-[#00A3FF]/10' : 'bg-[#00FF94]/10'}
                        `}>
                            <button
                                onClick={() => setSelectedRole(null)}
                                className="group flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest font-mono mb-8"
                            >
                                <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                Voltar para Seleção
                            </button>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                                <div className={`p-5 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.2)] border border-white/10
                                    ${selectedRole === 'corporate' ? 'bg-[#00A3FF]/10 text-[#00A3FF]' : 'bg-[#00FF94]/10 text-[#00FF94]'}
                                `}>
                                    {selectedRole === 'corporate' ? <Building2 size={32} /> : <UserCircle2 size={32} />}
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
                                        {selectedRole === 'corporate' ? 'Perfil Corporativo' : 'Perfil do Auditor'}
                                    </h1>
                                    <p className="text-gray-400 text-sm max-w-lg">
                                        {selectedRole === 'corporate'
                                            ? 'Inicie a blindagem jurídica e diagnóstico ISO 42001.'
                                            : 'Acesse metodologias exclusivas e certificação profissional.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-10">
                            {selectedRole === 'corporate' ? (
                                <CorporateOnboardingForm onSuccess={() => setCompleted(true)} />
                            ) : (
                                <ProfessionalOnboardingForm onSuccess={() => setCompleted(true)} />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // MAIN SELECTION SCREEN
    return (
        <main className="min-h-screen w-full bg-[#0A1A2F] relative overflow-x-hidden flex flex-col items-center justify-start p-6 text-white font-sans selection:bg-[#00FF94] selection:text-[#0A1A2F] pb-32">

            <HeroScene />

            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#00A3FF] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob will-change-transform" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00FF94] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-blob will-change-transform" style={{ animationDelay: '2s' }} />
            </div>

            <div className={`absolute inset-0 transition-opacity duration-1000 ${hoveredSide === 'corporate' ? 'opacity-20' : 'opacity-5'}`}>
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#00A3FF] rounded-full blur-[120px] mix-blend-screen" />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-1000 ${hoveredSide === 'professional' ? 'opacity-20' : 'opacity-5'}`}>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#00FF94] rounded-full blur-[120px] mix-blend-screen" />
            </div>

            {/* --- SECTION 1: HEADER --- */}
            {/* Reduced margin-top (mt-12) to allow brain to be higher */}
            <div className="z-10 text-center space-y-6 max-w-3xl animate-in fade-in slide-in-from-top-10 duration-1000 mt-12 relative">
                <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#00FF94] text-[10px] md:text-xs font-mono tracking-[0.2em] mb-4 uppercase backdrop-blur-md">
                    Ecossistema V.5.0
                </span>

                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-6">
                    Escolha sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-white to-[#00FF94]">Trajetória</span>
                </h1>

                <p className="font-light text-gray-300 max-w-2xl mx-auto text-sm md:text-lg">
                    A plataforma adapta suas ferramentas e acessos baseada no seu perfil de governança.
                </p>
            </div>

            {/* --- SECTION 2: THE BRAIN 3D --- */}
            {/* MOVED UP (-mt-10) and PUSHED CARDS DOWN (mb-10) */}
            <div className="w-full relative z-0 flex justify-center -mt-10 mb-[-50px] pointer-events-none">
                <div className="w-full max-w-[1400px] min-h-[400px]">
                    <AnimatedWave />
                </div>
            </div>

            {/* --- SECTION 3: CARDS --- */}
            {/* INCREASED TOP MARGIN (mt-24) to push cards down as requested */}
            <div className="z-10 grid md:grid-cols-2 gap-6 w-full max-w-7xl px-4 md:px-8 mt-24">

                {/* Corporate Card */}
                <div
                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A1A2F]/60 backdrop-blur-xl p-8 md:p-12 transition-all duration-500 hover:border-[#00A3FF]/50 hover:shadow-[0_0_50px_rgba(0,163,255,0.15)] cursor-pointer
                        ${hoveredSide === 'professional' ? 'md:opacity-50 md:scale-[0.98]' : ''}
                    `}
                    onMouseEnter={() => setHoveredSide('corporate')}
                    onMouseLeave={() => setHoveredSide(null)}
                    onClick={() => setSelectedRole('corporate')}
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
                            Mitigue riscos regulatórios e audite modelos de IA com metodologia proprietária.
                        </p>

                        <div className="mt-auto pt-6 w-full border-t border-white/5">
                            <ul className="space-y-3 mb-8 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#00A3FF]" /> Auditoria ISO 42001 Ready</li>
                                <li className="flex items-center gap-2"><Activity className="w-4 h-4 text-[#00A3FF]" /> Monitoramento de Risco</li>
                            </ul>

                            <div className="w-full py-4 bg-[#00A3FF] hover:bg-[#33B5FF] text-white font-bold tracking-wider uppercase text-xs rounded transition-all shadow-lg shadow-[#00A3FF]/20 group-hover:shadow-[#00A3FF]/40 flex items-center justify-center gap-2">
                                Iniciar Configuração
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Card */}
                <div
                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A1A2F]/60 backdrop-blur-xl p-8 md:p-12 transition-all duration-500 hover:border-[#00FF94]/50 hover:shadow-[0_0_50px_rgba(0,255,148,0.15)] cursor-pointer
                        ${hoveredSide === 'corporate' ? 'md:opacity-50 md:scale-[0.98]' : ''}
                    `}
                    onMouseEnter={() => setHoveredSide('professional')}
                    onMouseLeave={() => setHoveredSide(null)}
                    onClick={() => setSelectedRole('professional')}
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
                            Junte-se à elite da governança. Acesse metodologias exclusivas e certificação.
                        </p>

                        <div className="mt-auto pt-6 w-full border-t border-white/5">
                            <ul className="space-y-3 mb-8 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#00FF94]" /> Certificação de Auditor</li>
                                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-[#00FF94]" /> Networking C-Levels</li>
                            </ul>

                            <div className="w-full py-4 bg-transparent border border-[#00FF94] text-[#00FF94] hover:bg-[#00FF94] hover:text-[#0A1A2F] font-bold tracking-wider uppercase text-xs rounded transition-all shadow-lg shadow-[#00FF94]/5 group-hover:shadow-[#00FF94]/30 flex items-center justify-center gap-2">
                                Aplicar para Associação
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </main>
    );
}
