import Link from "next/link";
import Image from "next/image";
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

            {/* Hero Section - The Premium Impact */}
            <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center px-4 pt-10 pb-20">
                {/* 3D Neural Background */}
                <Scene3D />

                {/* Status Bar - Elite Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md z-20 hover:bg-white/10 transition-colors cursor-help">
                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse shadows-[0_0_10px_#00FF94]" />
                    <span className="text-[10px] font-mono text-brand-green tracking-widest uppercase">Sistema: Inteligência Viva v2.4</span>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 flex flex-col items-center justify-center h-full">

                    {/* Logo Shine Effect */}
                    <div className="relative group cursor-pointer mb-6">
                        <div className="absolute -inset-4 bg-brand-green/20 rounded-full blur-[60px] animate-pulse-slow group-hover:bg-brand-green/30 transition-all duration-700 opacity-60"></div>
                        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border border-white/10 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-out ring-1 ring-white/20">
                            <Image
                                src="/logo-algor.jpg"
                                alt="Logotipo ALGOR BRASIL"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Headline Premium with Gradient - Adjusted Size for Balance */}
                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] drop-shadow-2xl">
                        Transformando Riscos de IA em <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-green to-brand-blue animate-gradient-x">
                            Vantagem Competitiva
                        </span>
                    </h1>

                    <p className="font-sans text-brand-blue/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
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

                    {/* Scroll Indicator - Relative Position to prevent collision */}
                    <div className="flex flex-col items-center gap-2 opacity-60 animate-bounce cursor-pointer hover:opacity-100 transition-opacity pt-16">
                        <span className="text-[10px] font-mono tracking-[0.2em] text-brand-green uppercase">Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-green to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* Personas Grid - Decision Matrix (Auto-Segmentation) */}
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
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A1A2F]/80 backdrop-blur-xl hover:bg-[#0A1A2F] hover:border-brand-green/40 transition-all duration-500 cursor-pointer flex flex-col items-start p-8 h-full hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="text-brand-green -rotate-45" />
                        </div>

                        <div className="bg-white/5 p-3 rounded-lg mb-4 group-hover:bg-brand-green/10 transition-colors duration-300">
                            {persona.icon}
                        </div>

                        <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-brand-green transition-colors">
                            {persona.title}
                        </h3>

                        <p className="font-sans text-brand-blue/60 text-sm mb-6 leading-relaxed flex-grow">
                            {persona.desc}
                        </p>

                        <div className="mt-auto w-full pt-4 border-t border-white/5 group-hover:border-white/10">
                            <span className="font-mono text-xs text-brand-green uppercase tracking-wider">
                                {persona.target}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Membership Benefits - Institutional Layer */}
            <MembershipBenefits />

            {/* Methodology Section - A Sala de Máquinas */}
            <MethodologySection />

            {/* Governance Insights - SEO & Authority Content */}
            <GovernanceInsights />

            {/* Final CTA - Conversion */}
            <JoinCTA />
        </main>
    );
}
