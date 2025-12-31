import Link from 'next/link';
import { PlayCircle, Lock, Award, CheckCircle, Smartphone, FileCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export const metadata = {
    title: 'ALGOR Academy | A Elite da Formação em Governança de IA',
    description: 'Plataforma de ensino oficial da ALGOR Brasil. Cursos de ISO 42001, Formação de Auditores e Implementadores de Governança de IA.',
    openGraph: {
        title: 'ALGOR Academy | Formação de Elite em IA',
        description: 'Domine a ISO 42001 e o PL 2338. A primeira formação técnica do Brasil focada em implementação real de Governança de IA.',
        images: ['/og-academy.jpg'],
        type: 'website',
    },
};


export default function AcademyPage() {
    return (
        <div className="min-h-screen bg-[#0A1A2F] text-white selection:bg-[#00FF94] selection:text-[#0A1A2F]">
            <Navbar />

            {/* HERO ACADEMY */}
            <div className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A3FF]/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00FF94]/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-full backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF94]"></span>
                            </span>
                            <span className="text-[#00FF94] text-xs font-mono uppercase tracking-[0.2em] font-semibold">Turma Beta Aberta</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-light mb-8 leading-[0.95] tracking-tight text-white">
                            <span className="font-playfair italic text-gray-200">Domine a</span> <br />
                            <span className="font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-[#00A3FF] to-[#00FF94] bg-[length:200%_auto] animate-gradient-text">
                                Governança de IA
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-xl font-manrope font-light border-l border-[#00FF94]/30 pl-6">
                            A primeira formação técnica e estratégica do Brasil focada na implementação prática da <strong className="text-white font-medium">ISO/IEC 42001</strong> e conformidade com o <strong className="text-white font-medium">PL 2338/2023</strong>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/register?interest=academy" className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00CC76] text-[#0A1A2F] font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all flex items-center justify-center gap-3 font-orbitron transform hover:-translate-y-1">
                                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Entrar na Lista de Espera
                            </Link>
                            <Link href="#cursos" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center font-orbitron text-xs">
                                Ver Grade Curricular
                            </Link>
                        </div>
                    </div>

                    {/* VIDEO PREVIEW / MOCKUP */}
                    <div className="relative group perspective-1000">
                        {/* Glow Effect behind video */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF94] to-[#00A3FF] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-[#050A10] transform transition-transform duration-500 hover:scale-[1.01]">
                            {/* Overlay Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all cursor-pointer">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                </div>
                            </div>

                            {/* Mockup Content */}
                            <div className="w-full h-full flex flex-col items-center justify-center bg-[url('/grid.svg')] opacity-50">
                                <span className="font-orbitron text-gray-500 tracking-[0.2em] text-sm animate-pulse">PREVIEW DA PLATAFORMA</span>
                            </div>
                        </div>

                        {/* Floating Card - Fixed Overlap & Z-Index */}
                        <div className="absolute -bottom-6 -right-4 sm:-right-8 z-20 bg-[#0A1A2F]/95 backdrop-blur-xl border border-[#00FF94]/30 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 animate-float hover:scale-105 transition-transform">
                            <div className="w-12 h-12 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20 flex items-center justify-center shrink-0">
                                <Award className="w-6 h-6 text-[#00FF94]" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white font-orbitron">Certificado Oficial</div>
                                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Válido em todo território nacional</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CURSOS */}
            <section id="cursos" className="py-24 max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00A3FF]/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="text-center mb-20 relative z-10">
                    <h2 className="font-orbitron text-4xl font-bold mb-6 text-white tracking-wide">Trilhas de Formação</h2>
                    <p className="text-gray-400 font-manrope text-lg">Do básico ao nível Auditor Líder. Escolha seu caminho.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative z-10">
                    {/* CARD 1: FUNDAMENTOS (FREE) */}
                    <div className="group bg-[#0A111A]/80 backdrop-blur-sm border border-white/5 rounded-3xl p-1 hover:border-[#00FF94]/50 transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-full bg-[#0B121C] rounded-[22px] p-8 overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="px-3 py-1 bg-[#00FF94]/10 rounded text-[#00FF94] text-[10px] font-bold uppercase tracking-widest border border-[#00FF94]/20">Gratuito</div>
                            </div>

                            <div className="w-14 h-14 bg-[#00FF94]/5 rounded-2xl flex items-center justify-center mb-8 text-[#00FF94] group-hover:bg-[#00FF94]/10 transition-colors">
                                <Smartphone className="w-7 h-7" />
                            </div>

                            <h3 className="text-xl font-bold mb-4 font-orbitron text-white group-hover:text-[#00FF94] transition-colors">Fundamentos ISO 42001</h3>
                            <p className="text-sm text-gray-400 mb-8 leading-relaxed font-manrope flex-grow">
                                Entenda os conceitos base da norma, o vocabulário essencial e os princípios de IA responsável. Ideal para iniciantes.
                            </p>

                            <ul className="space-y-4 mb-8 text-sm text-gray-400 font-manrope">
                                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#00FF94]" /> 2 horas de conteúdo</li>
                                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#00FF94]" /> Certificado de Participação</li>
                                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#00FF94]" /> Acesso à Comunidade</li>
                            </ul>

                            <Link href="/register?plan=free" className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-center text-xs font-orbitron uppercase tracking-widest hover:bg-[#00FF94] hover:text-[#0A1A2F] hover:border-transparent transition-all">
                                Lista de Espera Free
                            </Link>
                        </div>
                    </div>

                    {/* CARD 2: IMPLEMENTADOR (PRO) */}
                    <div className="relative transform md:-translate-y-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF] to-[#00FF94] rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="group relative bg-[#0F172A] border border-[#00A3FF]/50 rounded-3xl p-1 overflow-hidden h-full shadow-2xl hover:shadow-[0_0_40px_rgba(0,163,255,0.2)] transition-all duration-500">
                            <div className="relative h-full bg-[#0F172A] rounded-[22px] p-8 overflow-hidden flex flex-col">
                                <div className="absolute top-0 right-0 p-6">
                                    <div className="px-3 py-1 bg-[#00A3FF]/20 rounded text-[#00A3FF] text-[10px] font-bold uppercase tracking-widest border border-[#00A3FF]/30 shadow-[0_0_10px_rgba(0,163,255,0.2)]">Recomendado</div>
                                </div>

                                <div className="w-16 h-16 bg-[#00A3FF]/10 rounded-2xl flex items-center justify-center mb-8 text-[#00A3FF] group-hover:scale-110 transition-transform duration-500">
                                    <FileCheck className="w-8 h-8" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 font-orbitron text-white">Implementador Líder</h3>
                                <p className="text-sm text-gray-300 mb-8 leading-relaxed font-manrope flex-grow border-l-2 border-[#00A3FF]/50 pl-4">
                                    Aprenda a construir o Sistema de Gestão de IA do zero. Templates, checklists e prática no Dashboard ALGOR.
                                </p>

                                <ul className="space-y-4 mb-10 text-sm text-gray-300 font-manrope">
                                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#00A3FF] shrink-0" /> +20 horas de aula</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#00A3FF] shrink-0" /> Acesso ao Software ALGOR (3 meses)</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#00A3FF] shrink-0" /> Templates Editáveis</li>
                                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#00A3FF] shrink-0" /> Mentoria Mensal em Grupo</li>
                                </ul>

                                <button disabled className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0080FF] text-white font-bold text-center text-xs font-orbitron uppercase tracking-widest opacity-90 cursor-not-allowed shadow-lg shadow-[#00A3FF]/20">
                                    Lista de Espera (Abril/2026)
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3: AUDITOR (EXPERT) */}
                    <div className="group bg-[#0A111A]/80 backdrop-blur-sm border border-white/5 rounded-3xl p-1 hover:border-[#F59E0B]/50 transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-full bg-[#0B121C] rounded-[22px] p-8 overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-6 opacity-30">
                                <Lock className="w-6 h-6 text-[#F59E0B]" />
                            </div>

                            <div className="w-14 h-14 bg-[#F59E0B]/5 rounded-2xl flex items-center justify-center mb-8 text-[#F59E0B] group-hover:bg-[#F59E0B]/10 transition-colors">
                                <Lock className="w-7 h-7" />
                            </div>

                            <h3 className="text-xl font-bold mb-4 font-orbitron text-white opacity-80 group-hover:opacity-100 group-hover:text-[#F59E0B] transition-all">Auditor Interno de IA</h3>
                            <p className="text-sm text-gray-500 mb-8 leading-relaxed font-manrope flex-grow">
                                Formação técnica para validar, testar e auditar sistemas de IA. Foco em Red Teaming, Viés e Auditoria.
                            </p>

                            <ul className="space-y-4 mb-8 text-sm text-gray-500 font-manrope">
                                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#F59E0B]/50" /> Módulo Técnico (Python)</li>
                                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#F59E0B]/50" /> Lab de Ataque (Red Teaming)</li>
                                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#F59E0B]/50" /> Credenciamento na Rede</li>
                            </ul>

                            <button disabled className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-gray-500 font-bold text-center text-xs font-orbitron uppercase tracking-widest cursor-not-allowed">
                                Em Breve
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
