'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Users, Cpu, ChevronRight, Lock, Activity, Globe, X, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/Footer';
import PersonaGrid from '@/components/PersonaGrid';
import MethodologySection from '@/components/MethodologySection';

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showManifesto, setShowManifesto] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effects for methodology visualization removed as they are now in the component

    const handleApply = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#0A1A2F] text-white overflow-x-hidden font-sans selection:bg-[#00FF94] selection:text-[#0A1A2F]">

            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#00A3FF] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00FF94] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A1A2F]/80 backdrop-blur-md border-b border-white/5 py-4' : 'py-8 bg-transparent'}`}>
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00A3FF] via-[#00FF94] to-[#00A3FF]"
                    style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }} />

                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative w-40 h-40 rounded-full border border-[#00FF94]/50 shadow-[0_0_25px_rgba(0,255,148,0.4)] overflow-hidden">
                            <img src="/logo-algor.webp" alt="Algor Brasil Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-serif text-4xl tracking-wide font-normal">ALGOR <span className="text-[#00FF94]">BRASIL</span></span>
                    </div>

                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
                        <button onClick={() => scrollToSection('benefits')} className="hover:text-white transition-colors">A Associação</button>
                        <button onClick={() => scrollToSection('personas')} className="hover:text-white transition-colors">Intelligence Hub</button>
                        <button onClick={() => scrollToSection('methodology')} className="hover:text-white transition-colors">Metodologia</button>
                    </div>

                    <button className="px-5 py-2 text-xs font-mono uppercase tracking-widest border border-white/20 rounded hover:bg-white hover:text-[#0A1A2F] transition-all hover:scale-105 active:scale-95">
                        Login Membros
                    </button>
                </div>
            </nav >

            {/* Hero Section */}
            < section className="relative pt-48 pb-32 px-6 z-10 flex flex-col items-center text-center" >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] border border-white/5 rounded-full animate-float pointer-events-none">
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-75" />
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#00A3FF] rounded-full blur-md" />
                </div>

                <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#00FF94] text-[10px] font-mono tracking-[0.2em] mb-6 uppercase">
                    Association for Algorithmization & Logic Governance
                </span>

                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl mx-auto">
                    Não é apenas software.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">É a Elite da Governança.</span>
                </h1>

                <p className="font-sans text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                    Junte-se à associação que define os padrões de ética e segurança de IA no Brasil.
                    Tenha acesso exclusivo à nossa tecnologia proprietária de auditoria e certificação ISO 42001.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button
                        onClick={handleApply}
                        className="px-8 py-4 bg-[#00FF94] text-[#0A1A2F] font-bold text-sm uppercase tracking-wider rounded hover:bg-[#00cc76] transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:shadow-[0_0_30px_rgba(0,255,148,0.5)] flex items-center gap-2 group hover:scale-105 active:scale-95"
                    >
                        Aplicar para Filiação
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => setShowManifesto(true)}
                        className="px-8 py-4 glass-panel text-white font-medium text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                    >
                        Ler Manifesto
                    </button>
                </div>
            </section>

            {/* Persona Grid - Strategic Segmentation */}
            <div id="personas">
                <PersonaGrid />
            </div>

            {/* Benefits Section */}
            < section id="benefits" className="relative z-10 max-w-7xl mx-auto px-6 pb-32" >
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-panel p-8 rounded-xl group transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00FF94]/10 transition-all text-white group-hover:text-[#00FF94]">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-2xl mb-3 group-hover:text-[#00FF94] transition-colors">Autoridade Auditada</h3>
                        <p className="text-gray-400 font-light leading-relaxed">
                            Diferencie-se no mercado. Membros recebem o selo <span className="text-white font-medium">Verified ALGOR</span>, sinalizando conformidade com padrões éticos rigorosos.
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-xl group transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00FF94]/10 transition-all text-white group-hover:text-[#00FF94]">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-2xl mb-3 group-hover:text-[#00FF94] transition-colors">Network de Elite</h3>
                        <p className="text-gray-400 font-light leading-relaxed">
                            Acesso exclusivo a grupos de trabalho com C-Levels e reguladores. Participe ativamente da definição dos rumos da IA no Brasil.
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-xl group relative overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Activity className="w-24 h-24 text-[#00A3FF]" />
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-[#00A3FF] group-hover:bg-[#00A3FF]/10 transition-all relative z-10">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-2xl mb-3 group-hover:text-[#00A3FF] transition-colors relative z-10">Acesso ao ALGOR OS</h3>
                        <p className="text-gray-400 font-light leading-relaxed relative z-10">
                            Uso irrestrito da nossa plataforma SaaS para diagnósticos ISO 42001, auditoria algorítmica e gestão de risco contínua.
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-[#00A3FF] text-xs font-mono uppercase tracking-widest relative z-10">
                            <span className="w-2 h-2 bg-[#00A3FF] rounded-full animate-pulse" />
                            Sistema Operacional Incluso
                        </div>
                    </div>
                </div>
            </section >

            {/* Methodology Section - System OS */}
            <MethodologySection />




            {/* Manifesto Modal */}
            {
                showManifesto && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm fade-in" onClick={() => setShowManifesto(false)}>
                        <div className="bg-[#0A1A2F] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto glass-panel slide-up" onClick={e => e.stopPropagation()}>
                            <div className="sticky top-0 bg-[#0A1A2F]/95 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center z-10">
                                <h3 className="font-serif text-2xl">Manifesto ALGOR Brasil</h3>
                                <button
                                    onClick={() => setShowManifesto(false)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg font-light">
                                    <span className="text-[#00FF94] font-semibold">Governança não é burocracia.</span> É a diferença entre inovação responsável e caos regulatório.
                                </p>
                                <p>
                                    Acreditamos que sistemas de IA devem ser auditáveis por design, não por imposição.
                                    Que transparência algorítmica é um diferencial competitivo, não um custo operacional.
                                </p>
                                <p>
                                    A ALGOR Brasil nasce para criar a elite da governança generativa no país —
                                    uma rede de organizações que não apenas cumprem regulações, mas que as antecipam e as moldam.
                                </p>
                                <div className="bg-white/5 border border-[#00FF94]/20 rounded-lg p-6 my-6">
                                    <h4 className="font-serif text-xl text-white mb-3">Nossos Princípios</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#00FF94] mt-1 flex-shrink-0" />
                                            <span>Auditabilidade como vantagem estratégica</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#00FF94] mt-1 flex-shrink-0" />
                                            <span>Ética algorítmica além da conformidade</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#00FF94] mt-1 flex-shrink-0" />
                                            <span>Governança adaptativa e evolutiva</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#00FF94] mt-1 flex-shrink-0" />
                                            <span>Transparência sem comprometer competitividade</span>
                                        </li>
                                    </ul>
                                </div>
                                <p className="text-sm text-gray-400 italic">
                                    Junte-se a nós na construção do futuro da IA responsável no Brasil.
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Toast Notification */}
            {
                showToast && (
                    <div className="fixed bottom-8 right-8 z-[150] glass-panel px-6 py-4 rounded-lg shadow-[0_0_30px_rgba(0,255,148,0.3)] border border-[#00FF94]/30 slide-up max-w-md">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#00FF94] rounded-full animate-pulse" />
                            <p className="text-sm text-gray-200">Aplicação enviada! Entraremos em contato em breve.</p>
                        </div>
                    </div>
                )
            }

            {/* Scroll to Top */}
            {
                scrolled && (
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 left-8 z-50 w-12 h-12 glass-panel rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all group slide-up"
                    >
                        <ChevronRight className="w-5 h-5 -rotate-90 text-[#00FF94] group-hover:text-white transition-colors" />
                    </button>
                )
            }
            <Footer />
        </div >
    );
}
