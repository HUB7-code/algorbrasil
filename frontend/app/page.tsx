import Link from "next/link";
import dynamic from "next/dynamic";
import MethodologySection from "@/components/MethodologySection";
import MembershipBenefits from "@/components/MembershipBenefits";
import GovernanceInsights from "@/components/GovernanceInsights";
import JoinCTA from "@/components/JoinCTA";
import { ArrowRight, Castle, Shield, Cpu, Scale } from "lucide-react";

// Dynamic import for 3D Scene (Client Side only)
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-brand-navy selection:bg-brand-green selection:text-brand-navy overflow-hidden">

            {/* Global Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-noise opacity-[0.03] mix-blend-overlay"></div>

            {/* Hero Section - The Holographic Impact */}
            <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center px-4 pt-10 pb-20 overflow-hidden">

                {/* 1. The Holographic Sphere (Scene3D) */}
                {/* Focused centrally to act as the 'Sphere of Connections' behind text */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <div className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] opacity-40 mix-blend-screen bg-radial-gradient-hologram animate-spin-slow-linear rounded-full blur-3xl" />
                    <Scene3D />
                </div>

                {/* Status Bar */}
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md z-20 hover:bg-white/10 transition-colors cursor-help group">
                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse shadows-[0_0_10px_#00FF94]" />
                    <span className="text-[10px] font-mono text-brand-green tracking-widest uppercase group-hover:text-white transition-colors">Sistema: Inteligência Viva v2.5</span>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 flex flex-col items-center justify-center h-full">

                    {/* 2. Logotipo Tipográfico "ALGOR" */}
                    <div className="mb-2 relative">
                        <h2 className="font-serif text-6xl md:text-8xl font-bold text-white tracking-[0.1em] drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                            ALGOR
                        </h2>
                        {/* Decorative Underline */}
                        <div className="h-[2px] w-24 bg-brand-green mx-auto mt-4 rounded-full shadow-[0_0_15px_#00FF94]"></div>
                    </div>

                    {/* 3. Headline Overlapping the Sphere */}
                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] drop-shadow-2xl">
                        Transformando Riscos de IA em <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-green to-brand-blue animate-gradient-x">
                            Vantagem Competitiva
                        </span>
                    </h1>

                    <p className="font-sans text-brand-blue/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light backdrop-blur-sm p-4 rounded-xl border border-white/0 hover:border-white/5 transition-colors">
                        A primeira plataforma de <strong className="text-white font-normal">Governança Generativa</strong> do Brasil. <br className="hidden md:block" />
                        Conformidade ISO 42001, Proteção Jurídica e Estratégia de Negócios em um único ecossistema auditável.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6 w-full sm:w-auto">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-brand-green text-brand-navy font-bold font-mono rounded-lg hover:bg-white hover:text-brand-navy transition-all duration-300 shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:shadow-[0_0_40px_rgba(0,255,148,0.5)] flex items-center justify-center gap-2 group text-sm md:text-base tracking-wide"
                        >
                            INICIAR DIAGNÓSTICO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/about"
                            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-mono font-bold rounded-lg hover:bg-white/10 hover:border-white/30 transition-all text-sm md:text-base tracking-wide backdrop-blur-sm"
                        >
                            CONHECER METODOLOGIA
                        </Link>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="flex flex-col items-center gap-2 opacity-60 animate-bounce cursor-pointer hover:opacity-100 transition-opacity pt-16">
                        <span className="text-[10px] font-mono tracking-[0.2em] text-brand-green uppercase">Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-green to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* Personas Grid - Glassmorphism */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4 mt-8 mb-24">
                {[
                    {
                        id: "board",
                        icon: <Castle className="w-8 h-8 text-brand-green mb-4" />,
                        title: "Visão Estratégica & ROI",
                        desc: "Transforme risco regulatório em vantagem competitiva.",
                        target: "Para o Board"
                    },
                    {
                        id: "risk",
                        icon: <Shield className="w-8 h-8 text-brand-amber mb-4" />,
                        title: "Gestão de Riscos",
                        desc: "Matriz de impacto, viés algorítmico e compliance.",
                        target: "Para CISO/DPO"
                    },
                    {
                        id: "tech",
                        icon: <Cpu className="w-8 h-8 text-brand-blue mb-4" />,
                        title: "Arquitetura Segura",
                        desc: "Implementação técnica da ISO 42001 e LLMOps.",
                        target: "Para CTO/Tech Lead"
                    },
                    {
                        id: "legal",
                        icon: <Scale className="w-8 h-8 text-purple-400 mb-4" />,
                        title: "Jurídico & Ética",
                        desc: "Adequação ao PL 2338/23 e EU AI Act.",
                        target: "Para Jurídico"
                    }
                ].map((persona, index) => (
                    <Link
                        href={`/register?persona=${persona.id}`}
                        key={persona.id}
                        className="group relative glass-card rounded-2xl flex flex-col items-start p-8 h-full"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="text-brand-green -rotate-45" />
                        </div>

                        <div className="bg-white/5 p-3 rounded-lg mb-4 group-hover:bg-brand-green/10 transition-colors duration-300 ring-1 ring-white/5">
                            {persona.icon}
                        </div>

                        <h3 className="font-display font-medium text-xl text-white mb-2 group-hover:text-brand-green transition-colors">
                            {persona.title}
                        </h3>

                        <p className="font-sans text-brand-blue/60 text-sm mb-6 leading-relaxed flex-grow group-hover:text-brand-blue/80 transition-colors">
                            {persona.desc}
                        </p>

                        <div className="mt-auto w-full pt-4 border-t border-white/5 group-hover:border-white/10">
                            <span className="font-mono text-xs text-brand-green uppercase tracking-wider opacity-80 group-hover:opacity-100">
                                {persona.target}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <MembershipBenefits />

            <MethodologySection />

            <GovernanceInsights />

            <JoinCTA />
        </main>
    );
}
