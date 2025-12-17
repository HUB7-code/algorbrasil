'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Users, Cpu, ChevronRight, Activity, X, CheckCircle2, Menu } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import PersonaGrid from '@/components/PersonaGrid';
import MethodologySection from '@/components/MethodologySection';
import Image from 'next/image';
import HeroDual from '@/components/HeroDual';
import AnimatedWave from '@/components/AnimatedWave';
import OfferingsShowcase from '@/components/OfferingsShowcase';

// Memoize heavy static components to prevent re-renders on scroll state changes
const MemoizedWave = React.memo(AnimatedWave);
const MemoizedHero = React.memo(HeroDual);
const MemoizedPersonaGrid = React.memo(PersonaGrid);
const MemoizedMethodology = React.memo(MethodologySection);
const MemoizedOfferings = React.memo(OfferingsShowcase); // New component
const MemoizedFooter = React.memo(Footer);

export default function Home() {
    const [scrolled, setScrolled] = useState(false); // Kept for scroll-to-top button logic
    const [showManifesto, setShowManifesto] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-transparent text-white overflow-x-hidden font-sans selection:bg-[#00FF94] selection:text-[#0A1A2F]">

            {/* Hero Section - Memoized */}
            <MemoizedHero />

            {/* Persona Grid - Memoized */}
            <div id="personas">
                <MemoizedPersonaGrid />
            </div>

            {/* Benefits Section */}
            < section id="benefits" className="relative z-10 max-w-7xl mx-auto px-6 pb-32" >
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-panel p-8 rounded-xl group transition-all duration-300 hover:-translate-y-2">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00FF94]/10 transition-all text-white group-hover:text-[#00FF94]">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-2xl mb-3 group-hover:text-[#00FF94] transition-colors">ISO 42001 Native</h3>
                        <p className="text-gray-400 font-light leading-relaxed">
                            Sua operação growth nasce desenhada segundo a norma internacional. Entregamos relatórios mensais de <span className="text-white font-medium">Algorithmic Bias Audit</span> para blindar seu C-Level.
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-xl group transition-all duration-300 hover:-translate-y-2">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00FF94]/10 transition-all text-white group-hover:text-[#00FF94]">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-2xl mb-3 group-hover:text-[#00FF94] transition-colors">Data Clean Rooms</h3>
                        <p className="text-gray-400 font-light leading-relaxed">
                            Acesso a dados de mercado cruzados com seus dados First-Party em ambiente neutro criptografado. Nossa equipe processa inteligência <span className="text-white font-medium">sem nunca ver PII (Dados Pessoais)</span>.
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-xl group relative overflow-hidden hover:-translate-y-2 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Activity className="w-24 h-24 text-[#00A3FF]" />
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-[#00A3FF] group-hover:bg-[#00A3FF]/10 transition-all relative z-10">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-2xl mb-3 group-hover:text-[#00A3FF] transition-colors relative z-10">Consent-Aware AI</h3>
                        <p className="text-gray-400 font-light leading-relaxed relative z-10">
                            Modelos que respeitam o Opt-in em tempo real. Se o usuário revoga consentimento, nossa IA <span className="text-white font-medium">automaticamente o remove</span> do retargeting, eliminando riscos jurídicos.
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-[#00A3FF] text-xs font-mono uppercase tracking-widest relative z-10">
                            <span className="w-2 h-2 bg-[#00A3FF] rounded-full animate-pulse" />
                            LGPD Automata Core
                        </div>
                    </div>
                </div>
            </section >

            {/* Offerings Showcase - Governança sob Medida */}
            <div id="governance">
                <MemoizedOfferings />
            </div>

            {/* Methodology Section - Memoized */}
            <MemoizedMethodology />

            {/* Manifesto Modal - Conditional */}
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

            {/* Toast Notification - Conditional */}
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

            {/* Scroll to Top - Conditional */}
            {
                scrolled && (
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Scroll to top"
                        className="fixed bottom-8 left-8 z-50 w-12 h-12 glass-panel rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all group slide-up cursor-pointer"
                    >
                        <ChevronRight className="w-5 h-5 -rotate-90 text-[#00FF94] group-hover:text-white transition-colors" />
                    </button>
                )
            }
            <MemoizedFooter />
        </div >
    );
}
