'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChevronRight } from 'lucide-react';
// ── Below-the-fold: todos com ssr:false para evitar hydration mismatch ──
const HeroCinematic = dynamic(() => import('@/components/HeroCinematic'), { ssr: false });
const GlobalTeam = dynamic(() => import('@/components/GlobalTeam'), { ssr: false });
const TrainingJourney = dynamic(() => import('@/components/TrainingJourney'), { ssr: false });
const CinematicSolutions = dynamic(() => import('@/components/CinematicSolutions'), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

// Skeleton minimal para o placeholder enquanto carrega
function SectionSkeleton() {
    return <div className="w-full h-screen bg-[#0B0F1E]" aria-hidden="true" />;
}

// ScrollToTop isolado como componente client-only para evitar SSR mismatch
function ScrollToTop() {
    const [scrolled, setScrolled] = useState(false);

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

    if (!scrolled) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Rolar para o topo"
            className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-white/10 border border-white/20 shadow-lg rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
        >
            <ChevronRight className="w-5 h-5 -rotate-90 text-[#4F7EFF]" />
        </button>
    );
}

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-[#0B0F1E]" />;
    }

    return (
        <div className="min-h-screen bg-[#0B0F1E] text-white font-sans selection:bg-[#4F7EFF] selection:text-white">

            {/* BLOCO 1 — Hero: A Promessa Institucional */}
            <HeroCinematic />

            {/* BLOCO 2 — Autoridade: Quem somos + Pain Points */}
            <GlobalTeam />

            {/* BLOCO 3 — Metodologia: 5 Estágios de Maturidade ALGOR */}
            <TrainingJourney />

            {/* BLOCO 4 — Ponte Comercial: Ofertas MVP → Calendly */}
            <CinematicSolutions />

            {/* Scroll to Top */}
            <ScrollToTop />

            <WhatsAppButton />
            <Footer />
        </div>
    );
}
