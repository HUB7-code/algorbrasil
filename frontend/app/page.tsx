import Link from "next/link";
import { ChevronRight, Globe, Shield, Cpu, Lock, Activity, Users } from "lucide-react";
import MembershipBenefits from "@/components/MembershipBenefits";
import MethodologySection from "@/components/MethodologySection";
import GovernanceInsights from "@/components/GovernanceInsights";
import JoinCTA from "@/components/JoinCTA";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0A1A2F] text-white overflow-x-hidden selection:bg-[#00FF94] selection:text-[#0A1A2F]">

            {/* --- Ambient Background Glows --- */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#00A3FF] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00FF94] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                {/* Global Noise Overlay */}
                <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
            </div>

            {/* --- Status Bar / Nav Placeholder (Since we don't have a dedicated Nav component yet) --- */}
            <div className="absolute top-0 left-0 w-full z-50 py-8 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* Logo Simplificada - Esfera */}
                        <div className="w-8 h-8 rounded-full border border-[#00FF94] flex items-center justify-center relative shadow-[0_0_15px_rgba(0,255,148,0.3)] bg-[#0A1A2F]/50 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-[#00FF94] rounded-full absolute top-1 right-1"></div>
                            <div className="w-4 h-4 border border-white/30 rounded-full"></div>
                        </div>
                        <span className="font-serif text-xl tracking-wide font-medium">ALGOR <span className="text-[#00FF94]">BRASIL</span></span>
                    </div>
                    <Link href="/login" className="px-5 py-2 text-xs font-mono uppercase tracking-widest border border-white/20 rounded hover:bg-white hover:text-[#0A1A2F] transition-all backdrop-blur-sm">
                        Login Membros
                    </Link>
                </div>
            </div>


            {/* --- Hero Section --- */}
            <section className="relative pt-48 pb-32 px-6 z-10 flex flex-col items-center text-center">

                {/* Abstract Mesh Representation (Central visual anchor) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-white/5 rounded-full animate-float pointer-events-none z-0">
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-75"></div>
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-50"></div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#00A3FF] rounded-full blur-md"></div>
                </div>

                <div className="relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#00FF94] text-[10px] font-mono tracking-[0.2em] mb-6 uppercase backdrop-blur-sm">
                        Association for Algorithmization & Logic Governance
                    </span>

                    <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6 max-w-4xl mx-auto drop-shadow-2xl">
                        Não é apenas software.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">É a Elite da Governança.</span>
                    </h1>

                    <p className="font-sans text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        Junte-se à associação que define os padrões de ética e segurança de IA no Brasil.
                        Tenha acesso exclusivo à nossa tecnologia proprietária de auditoria e certificação ISO 42001.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Link href="/register" className="px-8 py-4 bg-[#00FF94] text-[#0A1A2F] font-bold text-sm uppercase tracking-wider rounded hover:bg-[#00cc76] transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)] flex items-center gap-2 group">
                            Aplicar para Filiação
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/about" className="px-8 py-4 glass-panel text-white font-medium text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-all backdrop-blur-md">
                            Ler Manifesto
                        </Link>
                    </div>
                </div>
            </section>


            {/* --- Personas / Strategy Section (Replaced Grid) --- */}
            <section className="py-24 border-t border-white/5 bg-[#0A1A2F]/50 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="text-[#00FF94] font-mono text-xs tracking-widest uppercase mb-2 block">/ Segmentação Estratégica</span>
                            <h2 className="font-serif text-4xl md:text-5xl">Inteligência para quem decide.</h2>
                        </div>
                        <p className="text-gray-400 max-w-md text-right md:text-left font-light">
                            Nossa arquitetura de governança adapta-se instantaneamente ao papel do stakeholder, entregando clareza onde há complexidade.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { id: "board", title: "Para o Board", icon: Globe, desc: "Mitigação de risco estratégico e proteção de reputação.", color: "text-purple-400" },
                            { id: "risk", title: "Para Compliance", icon: Shield, desc: "Alinhamento ISO 42001 e trilhas de auditoria.", color: "text-[#00FF94]" },
                            { id: "tech", title: "Para Tech Leaders", icon: Cpu, desc: "Guardrails de LLMs sem travar o deploy.", color: "text-[#00A3FF]" },
                            { id: "legal", title: "Para Jurídico", icon: Lock, desc: "Conformidade com PL 2338 e EU AI Act.", color: "text-amber-400" }
                        ].map((item, idx) => (
                            <Link href={`/register?persona=${item.id}`} key={idx} className="glass-panel p-6 rounded-lg hover:-translate-y-1 transition-transform cursor-pointer group block">
                                <div className={`mb-4 ${item.color}`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-serif text-xl mb-2 group-hover:text-white transition-colors text-gray-100">{item.title}</h4>
                                <p className="text-sm text-gray-500 group-hover:text-gray-400 leading-relaxed font-light">{item.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reusing Modular Components (They need to be refactored to match style, but placed here for structure) */}
            <MembershipBenefits />
            <MethodologySection />
            <GovernanceInsights />
            <JoinCTA />

        </main>
    );
}
