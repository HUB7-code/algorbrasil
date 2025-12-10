import Link from "next/link";
import { ChevronRight, Globe, Shield, Cpu, Lock } from "lucide-react";
import MembershipBenefits from "@/components/MembershipBenefits";
import MethodologySection from "@/components/MethodologySection";
import GovernanceInsights from "@/components/GovernanceInsights";
import JoinCTA from "@/components/JoinCTA";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#F3F6FC] text-[#1F1F1F] overflow-x-hidden">

            {/* --- Ambient Background Shapes (Soft & Organic) --- */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-[#D3E3FD] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-float-light"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-[#C4EED0] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-float-light" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* --- Clean Navigation --- */}
            <div className="absolute top-0 left-0 w-full z-50 py-6 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden border border-[#E0E3E7]">
                            <img
                                src="/logo-algor.jpg"
                                alt="ALGOR Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-serif text-xl tracking-wide font-bold text-[#1F1F1F]">ALGOR <span className="text-[#0B57D0]">BRASIL</span></span>
                    </div>
                    <Link href="/login" className="text-sm font-medium text-[#444746] hover:text-[#0B57D0] hover:bg-white px-4 py-2 rounded-full transition-all">
                        Portal do Membro
                    </Link>
                </div>
            </div>


            {/* --- Hero Section Clean --- */}
            <section className="relative pt-40 pb-24 px-6 z-10 flex flex-col items-center text-center">

                <span className="inline-block py-2 px-4 rounded-full bg-[#E8F0FE] text-[#0B57D0] text-xs font-bold tracking-widest mb-8 uppercase shadow-sm">
                    Reinventando a Governança de IA
                </span>

                <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 max-w-4xl mx-auto text-[#1F1F1F]">
                    IA Segura não é burocracia.<br />
                    <span className="text-[#0B57D0]">É Vantagem Competitiva.</span>
                </h1>

                <p className="font-sans text-xl text-[#444746] max-w-2xl mx-auto mb-12 font-normal leading-relaxed">
                    A primeira plataforma brasileira que transforma conformidade ISO 42001 em estratégia de negócios auditável e escalável.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Link href="/register" className="btn-primary">
                        Iniciar Diagnóstico Gratuito
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link href="/about" className="btn-outline">
                        Ler Manifesto
                    </Link>
                </div>
            </section>


            {/* --- Segmentação (White Cards Grid) --- */}
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Para o Board", icon: Globe, desc: "Proteção de reputação e mitigação de risco estratégico.", color: "text-[#0B57D0]", bg: "bg-[#D3E3FD]" },
                            { title: "Para Compliance", icon: Shield, desc: "Trilhas de auditoria automática e gap analysis ISO 42001.", color: "text-[#146C2E]", bg: "bg-[#C4EED0]" },
                            { title: "Para Tech Leaders", icon: Cpu, desc: "Guardrails de segurança que não travam o deploy.", color: "text-[#A8C7FA]", bg: "bg-[#0A1A2F]" },
                            { title: "Para Jurídico", icon: Lock, desc: "Adequação jurídica ao PL 2338 e EU AI Act.", color: "text-[#EF9A9A]", bg: "bg-[#8C1D18]" }
                        ].map((item, idx) => (
                            <Link href="/register" key={idx} className="surface-card p-8 group cursor-pointer h-full flex flex-col items-start hover:-translate-y-1">
                                <div className={`mb-6 w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center`}>
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <h4 className="font-serif text-xl mb-3 font-bold text-[#1F1F1F]">{item.title}</h4>
                                <p className="text-sm text-[#444746] leading-relaxed mb-4">{item.desc}</p>
                                <span className="mt-auto text-xs font-bold text-[#0B57D0] uppercase tracking-wider group-hover:underline">Saiba mais</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Components need to be updated to match light theme... will leave them integrated but they might look odd until updated. */}
            {/* Note: I will update MembershipBenefits next to ensure consistency */}
            <MembershipBenefits />
            {/* Methodology & Insights & CTA will be updated subsequently */}
            <MethodologySection />
            <GovernanceInsights />
            <JoinCTA />

        </main>
    );
}
