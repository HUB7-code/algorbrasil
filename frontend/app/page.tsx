import Link from "next/link";
import HeroScene from "@/components/HeroScene";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden bg-brand-navy selection:bg-brand-green selection:text-brand-navy">
            {/* 3D Background */}
            <HeroScene />

            {/* Status Bar */}
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-xs lg:flex absolute top-8 left-0 right-0 px-8 lg:px-24">
                <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full">
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

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center mt-[-2vh] px-4">
                <div className="mb-8 relative max-w-5xl">
                    <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 relative z-10 leading-[1.2]">
                        Transformando Riscos de IA em <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue">
                            Vantagens Competitivas Sustentáveis.
                        </span>
                    </h1>
                </div>

                <p className="text-brand-blue/70 font-sans text-base md:text-lg max-w-3xl leading-relaxed mb-12">
                    <span className="text-white font-semibold">A Era da Inteligência Viva Chegou.</span> Governance de IA, Compliance e Auditoria Contínua.
                </p>

                <div className="mb-20">
                    <Link href="/register">
                        <button className="group bg-brand-green text-brand-navy font-bold font-sans px-8 py-3 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(0,255,148,0.3)] hover:shadow-[0_0_25px_rgba(0,255,148,0.5)] text-sm uppercase tracking-wide flex items-center gap-2 mx-auto">
                            Iniciar Avaliação de Maturidade
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>

                {/* Personas Grid - Decision Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                    {["Estrategista", "Guardião", "Construtor", "Protetor"].map((persona, index) => (
                        <Link
                            href={`/register?persona=${persona.toLowerCase()}`}
                            key={persona}
                            className="group relative overflow-hidden rounded-xl border border-white/5 bg-brand-navy/40 backdrop-blur-md hover:bg-white/5 hover:border-brand-green/50 transition-all duration-500 cursor-pointer flex flex-col items-start p-6 min-h-[160px] hover:shadow-[0_0_30px_-5px_rgba(0,255,148,0.2)]"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-green/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

                            <span className="font-mono text-[10px] text-brand-blue/50 mb-auto">0{index + 1}</span>

                            <div className="mt-4">
                                <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-brand-green transition-colors flex items-center gap-2">
                                    {persona}
                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-green" />
                                </h3>
                                <p className="text-xs text-brand-blue/60 font-mono">
                                    Acessar perfil {">"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
