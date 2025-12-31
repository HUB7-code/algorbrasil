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
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A3FF]/10 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-full text-[#00FF94] text-xs font-mono uppercase tracking-widest">
                            <span className="w-2 h-2 bg-[#00FF94] rounded-full animate-pulse" />
                            Inscrições Abertas: Turma Beta
                        </div>
                        <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Domine a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">
                                Governança de IA
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-xl">
                            A primeira formação técnica e estratégica do Brasil focada na implementação prática da <strong className="text-white">ISO/IEC 42001</strong> e conformidade com o <strong className="text-white">PL 2338/2023</strong>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/register?interest=academy" className="px-8 py-4 rounded-xl bg-[#00FF94] text-[#0A1A2F] font-bold uppercase tracking-widest hover:bg-[#00CC76] transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)] flex items-center justify-center gap-2">
                                <PlayCircle className="w-5 h-5" />
                                Entrar na Lista de Espera
                            </Link>
                            <Link href="#cursos" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center">
                                Ver Grade Curricular
                            </Link>
                        </div>
                    </div>

                    {/* VIDEO PREVIEW / MOCKUP */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer aspect-video bg-[#000]">
                            {/* Overlay Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                </div>
                            </div>
                            {/* Placeholder for Video Thumbnail - In prod use real image */}
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-500 font-mono">
                                [PREVIEW DA PLATAFORMA]
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -right-6 bg-[#131825] border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-float">
                            <div className="w-10 h-10 rounded-full bg-[#00FF94]/20 flex items-center justify-center">
                                <Award className="w-5 h-5 text-[#00FF94]" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Certificado Oficial</div>
                                <div className="text-xs text-gray-400">Válido em todo território nacional</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CURSOS */}
            <section id="cursos" className="py-20 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-orbitron text-3xl font-bold mb-4">Trilhas de Formação</h2>
                    <p className="text-gray-400">Do básico ao nível Auditor Líder. Escolha seu caminho.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* CARD 1: FUNDAMENTOS (FREE) */}
                    <div className="bg-[#131825] border border-white/10 rounded-2xl p-1 overflow-hidden hover:border-[#00FF94]/50 transition-all group relative">
                        <div className="absolute top-4 right-4 bg-[#00FF94] text-[#0A1A2F] text-xs font-bold px-2 py-1 rounded">GRATUITO</div>
                        <div className="p-6 h-full flex flex-col">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-[#00FF94]">
                                <Smartphone className="w-6 h-6" /> {/* Icon representing accessible/mobile learning */}
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-orbitron">Fundamentos ISO 42001</h3>
                            <p className="text-sm text-gray-400 mb-6 flex-grow">
                                Entenda os conceitos base da norma, o vocabulário essencial e os princípios de IA responsável. Ideal para iniciantes.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00FF94]" /> 2 horas de conteúdo</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00FF94]" /> Certificado de Participação</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00FF94]" /> Acesso à Comunidade</li>
                            </ul>
                            <Link href="/register?plan=free" className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-white/10 transition-colors">
                                Lista de Espera
                            </Link>
                        </div>
                    </div>

                    {/* CARD 2: IMPLEMENTADOR (PRO) */}
                    <div className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-[#00A3FF]/30 rounded-2xl p-1 overflow-hidden transform md:-translate-y-4 shadow-2xl relative">
                        <div className="absolute inset-0 bg-[#00A3FF]/5 animate-pulse-slow pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A3FF] to-[#00FF94]" />

                        <div className="p-8 h-full flex flex-col relative z-10">
                            <div className="w-14 h-14 bg-[#00A3FF]/20 rounded-xl flex items-center justify-center mb-6 text-[#00A3FF]">
                                <FileCheck className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-orbitron text-white">Implementador Líder</h3>
                            <p className="text-sm text-gray-300 mb-6 flex-grow">
                                Aprenda a construir o Sistema de Gestão de IA do zero. Templates, checklists, aulas de análise de risco e prática no Dashboard ALGOR.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00A3FF]" /> +20 horas de aula</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00A3FF]" /> Acesso ao Software ALGOR (3 meses)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00A3FF]" /> Templates Editáveis</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00A3FF]" /> Mentoria Mensal em Grupo</li>
                            </ul>
                            <button disabled className="w-full py-3 rounded-lg bg-[#00A3FF] text-white font-bold text-center opacity-80 cursor-not-allowed">
                                Lista de Espera (Abril/2026)
                            </button>
                        </div>
                    </div>

                    {/* CARD 3: AUDITOR (EXPERT) */}
                    <div className="bg-[#131825] border border-white/10 rounded-2xl p-1 overflow-hidden hover:border-[#F59E0B]/50 transition-all relative">
                        <div className="p-6 h-full flex flex-col">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-[#F59E0B]">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-orbitron">Auditor Interno de IA</h3>
                            <p className="text-sm text-gray-400 mb-6 flex-grow">
                                Formação técnica para validar, testar e auditar sistemas de IA. Foco em Red Teaming, Testes de Viés e Documentação de Auditoria.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F59E0B]" /> Módulo Técnico (Python Requerido)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F59E0B]" /> Lab de Ataque (Red Teaming)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F59E0B]" /> Credenciamento na Rede ALGOR</li>
                            </ul>
                            <button disabled className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed">
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
