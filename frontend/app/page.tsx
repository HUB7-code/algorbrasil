import Link from "next/link";
import HeroScene from "@/components/HeroScene";
import MethodologySection from "@/components/MethodologySection";
import { ArrowRight, Castle, Shield, Cpu, Scale } from "lucide-react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start relative overflow-x-hidden bg-brand-navy selection:bg-brand-green selection:text-brand-navy">
            {/* 3D Background - Fixed so it stays while scrolling */}
            <div className="fixed inset-0 w-full h-full -z-10 bg-brand-navy pointer-events-none">
                <HeroScene />
            </div>

            {/* Status Bar */}
            <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-xs lg:flex absolute top-8 left-0 right-0 px-8 mx-auto pointer-events-none">
                <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full pointer-events-auto">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                    </span>
                    <span className="text-brand-green tracking-widest">SYSTEM ONLINE</span>
                </div>
                <div className="hidden lg:block text-brand-blue/60 tracking-widest">
                    ALGOR BRASIL v2.0
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center text-center pt-32 pb-24 px-4 min-h-screen">
                <div className="mb-8 relative max-w-5xl">
                    <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 relative z-10 leading-[1.2]">
                        Transformando Riscos de IA em <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue">
                            Vantagens Competitivas Sustentáveis.
                        </span>
                    </h1>
                </div>

                <p className="text-brand-blue/70 font-sans text-base md:text-lg max-w-3xl leading-relaxed mb-12 glass-panel p-4 rounded-xl border-l-2 border-brand-green/50 inline-block">
                    <span className="text-white font-semibold block mb-1">A Era da Inteligência Viva Chegou.</span>
                    Governance de IA, Compliance e Auditoria Contínua.
                </p>

                <div className="mb-24">
                    <Link href="/register">
                        <button className="group bg-brand-green text-brand-navy font-bold font-sans px-8 py-3 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(0,255,148,0.3)] hover:shadow-[0_0_25px_rgba(0,255,148,0.5)] text-sm uppercase tracking-wide flex items-center gap-2 mx-auto">
                            Iniciar Avaliação de Maturidade
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>

                {/* Personas Grid - Decision Matrix (Auto-Segmentation) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
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
                            icon: <Shield className="w-8 h-8 text-brand-green mb-4" />,
                            title: "Controle & Mitigação",
                            desc: "Frameworks alinhados à ISO 42001 e LGPD.",
                            target: "Para Risco & Compliance"
                        },
                        {
                            id: "tech",
                            icon: <Cpu className="w-8 h-8 text-brand-green mb-4" />,
                            title: "Arquitetura & MLOps",
                            desc: "Integração de governança sem frear a inovação.",
                            target: "Para Tecnologia"
                        },
                        {
                            id: "legal",
                            icon: <Scale className="w-8 h-8 text-brand-green mb-4" />,
                            title: "Segurança Jurídica",
                            desc: "Adequação ao PL 2338 e AI Act Europeu.",
                            target: "Para Jurídico"
                        }
                    ].map((persona, index) => (
                        <Link
                            href={`/register?persona=${persona.id}`}
                            key={persona.id}
                            className="group relative overflow-hidden rounded-2xl border border-brand-blue/10 bg-brand-navy/60 backdrop-blur-xl hover:bg-brand-navy/80 hover:border-brand-green/60 transition-all duration-300 cursor-pointer flex flex-col items-start p-6 h-full hover:-translate-y-1 hover:shadow-[0_4px_30px_rgba(0,255,148,0.1)] text-left"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-green/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-mono font-bold tracking-wider mb-4 border border-brand-blue/20">
                                    {persona.target.toUpperCase()}
                                </span>

                                {persona.icon}

                                <h3 className="text-lg font-sans font-bold text-white mb-3 group-hover:text-brand-green transition-colors leading-tight">
                                    {persona.title}
                                </h3>

                                <p className="text-sm text-brand-blue/60 font-sans leading-relaxed mb-6">
                                    {persona.desc}
                                </p>

                                <div className="mt-auto flex items-center gap-2 text-xs font-mono text-brand-greenOpacity group-hover:text-brand-green transition-colors">
                                    <span>Acessar Trilha</span>
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Methodology Section - A Sala de Máquinas */}
            <MethodologySection />
        </main>
    );
}
