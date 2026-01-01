import Link from 'next/link';
import { BookOpen, GraduationCap, Building2, Users, FileCheck, ArrowRight, Award, Network, Microscope, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Instituto ALGOR | Pesquisa e Normatização de IA',
    description: 'O braço de pesquisa e autoridade técnica da ALGOR Brasil. Liderando o debate sobre Governança de IA, PL 2338/2023 e ISO 42001.',
    openGraph: {
        title: 'Instituto ALGOR | A Ciência da Confiança em IA',
        description: 'Pesquisa avançada, pareces técnicos sobre o PL 2338 e a tropicalização da ISO 42001. Conheça o braço científico da ALGOR.',
        images: ['/og-institute.jpg'],
        type: 'website',
    },
};

export default function InstitutePage() {
    return (
        <div className="min-h-screen bg-[#050A10] text-white selection:bg-[#00FF94] selection:text-[#0A1A2F]">
            <Navbar />

            {/* HERO SECTION - QUANTUM PRESTIGE */}
            <header className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
                {/* Dynamic Background Mesh */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#00A3FF]/20 to-[#0A1A2F]/0 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-[#00FF94]/10 to-[#0A1A2F]/0 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-700" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[length:50px_50px]" />
                </div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10 w-full">

                    {/* Hero Text Content */}
                    <div className="lg:col-span-7 relative">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 bg-gradient-to-r from-white/5 to-transparent border-l-2 border-[#00FF94] backdrop-blur-md">
                            <Microscope className="w-4 h-4 text-[#00FF94]" />
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF94] font-semibold">
                                Laboratório de Pesquisa & Governança
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 tracking-tight text-white">
                            <span className="font-sans font-light text-white/80 block mb-2">A Ciência da</span>
                            <span className="font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-[#00A3FF] to-[#00FF94] bg-[length:200%_auto] animate-gradient-text">
                                Confiança Artificial
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed font-manrope font-light mb-10 max-w-xl border-l border-[#00FF94]/30 pl-6">
                            O Instituto ALGOR não apenas observa o futuro. <br />
                            <strong className="text-white font-medium">Nós escrevemos o código de conduta dele.</strong>
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/institute/about" className="group relative px-8 py-4 bg-[#00FF94] text-[#050A10] font-orbitron font-bold rounded-none skew-x-[-10deg] hover:bg-[#00CC76] transition-all flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:shadow-[0_0_40px_rgba(0,255,148,0.5)]">
                                <span className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[10deg]" />
                                <span className="skew-x-[10deg] inline-flex items-center gap-2 tracking-wider">
                                    Nossa Metodologia <ArrowRight className="w-5 h-5" />
                                </span>
                            </Link>
                            <Link href="/institute/policy" className="group px-8 py-4 bg-transparent border border-white/20 text-white font-orbitron font-medium rounded-none skew-x-[-10deg] hover:border-[#00FF94]/50 hover:bg-[#00FF94]/5 transition-all flex items-center gap-3">
                                <span className="skew-x-[10deg] tracking-wider">Pareceres Técnicos</span>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Stats / Interactive Holograms */}
                    <div className="lg:col-span-5 space-y-6 perspective-1000">
                        {/* Card 1: PL 2338 */}
                        <div className="relative group transistion-all duration-500 hover:transform hover:-translate-y-2">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF94]/20 to-[#00A3FF]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-[#0A111A]/90 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-[#00FF94]/50 transition-all shadow-2xl overflow-hidden group-hover:shadow-[0_0_30px_rgba(0,255,148,0.15)]">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <FileCheck className="w-24 h-24 text-white" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
                                    <span className="text-xs font-mono text-[#00FF94] uppercase tracking-widest">Status: Ativo no Senado</span>
                                </div>
                                <div className="text-4xl font-bold text-white font-orbitron mb-2 tabular-nums tracking-tight">PL 2338</div>
                                <div className="text-sm text-gray-400 leading-snug font-manrope">
                                    Contribuição técnica direta para o Marco Legal da IA no Brasil.
                                </div>
                            </div>
                        </div>

                        {/* Card 2: ISO 42001 */}
                        <div className="relative group transistion-all duration-500 delay-100 hover:transform hover:-translate-y-2">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF]/20 to-[#8B5CF6]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-[#0A111A]/90 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-[#00A3FF]/50 transition-all shadow-2xl overflow-hidden group-hover:shadow-[0_0_30px_rgba(0,163,255,0.15)]">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <ShieldCheck className="w-24 h-24 text-white" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse" />
                                    <span className="text-xs font-mono text-[#00A3FF] uppercase tracking-widest">Padrão Global</span>
                                </div>
                                <div className="text-4xl font-bold text-white font-orbitron mb-2 tabular-nums tracking-tight">ISO 42001</div>
                                <div className="text-sm text-gray-400 leading-snug font-manrope">
                                    Pioneiros na auditoria de conformidade algorítmica ISO.
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Elite Council */}
                        <div className="relative group transistion-all duration-500 delay-200 hover:transform hover:-translate-y-2">
                            <div className="relative bg-gradient-to-r from-[#131B2A] to-[#0A111A] border border-white/10 p-6 rounded-2xl group-hover:border-white/30 transition-all flex items-center gap-6 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#0A111A] flex items-center justify-center text-xs text-gray-500 font-mono">
                                            PhD
                                        </div>
                                    ))}
                                    <div className="w-12 h-12 rounded-full bg-[#00FF94] border-2 border-[#0A111A] flex items-center justify-center text-[#0A1A2F] font-bold text-xs">
                                        +12
                                    </div>
                                </div>
                                <div>
                                    <div className="text-white font-bold font-orbitron text-lg tracking-wide">Conselho de Elite</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-mono">Mentes Brilhantes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">

                {/* Section: Pilares de Atuação - Floating Cards */}
                <section className="grid md:grid-cols-3 gap-8 mb-40">
                    <div className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-[#00FF94]/50 hover:to-[#00FF94]/5 transition-all duration-500">
                        <div className="relative h-full bg-[#0B121C] rounded-[23px] p-10 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF94]/5 rounded-full blur-2xl group-hover:bg-[#00FF94]/10 transition-all" />
                            <ScaleIcon className="w-10 h-10 text-[#00FF94] mb-8 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="font-orbitron text-2xl font-bold mb-4 text-white group-hover:text-[#00FF94] transition-colors tracking-wide">Regulação</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 border-b border-white/5 pb-8 font-manrope">
                                Atuamos no ground-zero do debate legislativo, desenhando o futuro do Marco Legal da IA com precisão cirúrgica.
                            </p>
                            <Link href="/institute/policy" className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all hover:text-[#00FF94]">
                                Ler Pareceres <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-[#00A3FF]/50 hover:to-[#00A3FF]/5 transition-all duration-500">
                        <div className="relative h-full bg-[#0B121C] rounded-[23px] p-10 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3FF]/5 rounded-full blur-2xl group-hover:bg-[#00A3FF]/10 transition-all" />
                            <BookOpen className="w-10 h-10 text-[#00A3FF] mb-8 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="font-orbitron text-2xl font-bold mb-4 text-white group-hover:text-[#00A3FF] transition-colors tracking-wide">Pesquisa</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 border-b border-white/5 pb-8 font-manrope">
                                Whitepapers profundos e relatórios de inteligência que tropicalizam normas globais (ISO/IEC 42001) para o mercado brasileiro.
                            </p>
                            <Link href="/institute/research" className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all hover:text-[#00A3FF]">
                                Acessar Intel <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-[#8B5CF6]/50 hover:to-[#8B5CF6]/5 transition-all duration-500">
                        <div className="relative h-full bg-[#0B121C] rounded-[23px] p-10 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/5 rounded-full blur-2xl group-hover:bg-[#8B5CF6]/10 transition-all" />
                            <GraduationCap className="w-10 h-10 text-[#8B5CF6] mb-8 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="font-orbitron text-2xl font-bold mb-4 text-white group-hover:text-[#8B5CF6] transition-colors tracking-wide">Educação</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 border-b border-white/5 pb-8 font-manrope">
                                Formação de elite para C-Levels. Não ensinamos prompts; ensinamos estratégia, ética e responsabilidade civil algorítmica.
                            </p>
                            <Link href="/academy" className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all hover:text-[#8B5CF6]">
                                Ver Academy <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section: Manifesto Acadêmico/Citação - TECH STYLE REFINED */}
                <section className="relative rounded-[40px] overflow-hidden mb-32 border border-white/5 bg-[#080E17]">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF94]/50 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-[#00A3FF]/30 to-transparent" />

                    <div className="relative z-10 py-24 px-8 text-center max-w-5xl mx-auto">
                        <div className="mb-12 relative inline-flex">
                            <div className="absolute inset-0 bg-[#00FF94]/20 blur-xl rounded-full" />
                            <Network className="relative w-16 h-16 text-[#00FF94]" />
                        </div>

                        <blockquote className="font-manrope text-3xl md:text-5xl lg:text-6xl font-light leading-snug mb-12 text-white tracking-tight">
                            "A confiança não é um
                            <span className="font-sans font-light text-gray-400 px-3">atributo de software</span>,
                            mas uma <span className="font-orbitron font-bold text-[#00FF94] tracking-wide">construção social</span> validada por rigorosa auditoria."
                        </blockquote>

                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#00FF94] to-transparent mb-4 opacity-50" />
                            <cite className="not-italic flex flex-col items-center gap-2">
                                <span className="font-orbitron font-bold text-white tracking-widest text-sm uppercase">Conselho Diretor</span>
                                <span className="font-mono text-xs text-[#00FF94] tracking-[0.2em] uppercase opacity-80">ALGOR Brasil</span>
                            </cite>
                        </div>
                    </div>
                </section>

                {/* Section: Academic Partnerships - Dark Logos */}
                <section className="text-center pt-10 pb-20">
                    <p className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-16">
                        Reconhecimento & Parcerias Estratégicas
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                        {/* Placeholder Logos - Styled text for now */}
                        <div className="text-3xl font-orbitron font-bold text-white tracking-tighter hover:scale-105 transition-transform cursor-pointer">IEEE<span className="text-[#00A3FF]">.org</span></div>
                        <div className="text-3xl font-orbitron font-bold text-white tracking-tighter hover:scale-105 transition-transform cursor-pointer">MIT<span className="text-gray-600">Review</span></div>
                        <div className="text-3xl font-orbitron font-bold text-white tracking-tighter hover:scale-105 transition-transform cursor-pointer">FGV<span className="text-[#00FF94]">Tech</span></div>
                        <div className="text-3xl font-orbitron font-bold text-white tracking-tighter hover:scale-105 transition-transform cursor-pointer">OAB<span className="text-[#8B5CF6]">Digital</span></div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

// Helper Icon Component
function ScaleIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="M7 21h10" />
            <path d="M12 3v18" />
            <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </svg>
    )
}
