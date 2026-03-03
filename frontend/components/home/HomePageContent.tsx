'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChevronRight } from 'lucide-react';

// ── Sections loaded with ssr:false to maximize hydration stability ──
const HeroCinematic = dynamic(() => import('@/components/HeroCinematic'), { ssr: false });
const GlobalTeam = dynamic(() => import('@/components/GlobalTeam'), { ssr: false });
const TrainingJourney = dynamic(() => import('@/components/TrainingJourney'), { ssr: false });
const CinematicSolutions = dynamic(() => import('@/components/CinematicSolutions'), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

function ScrollToTop() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
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

export default function HomePageContent() {
    return (
        <div className="w-full bg-[#0B0F1E] text-white font-sans selection:bg-[#4F7EFF] selection:text-white">
            <HeroCinematic />
            <GlobalTeam />
            <TrainingJourney />
            <CinematicSolutions />
            <ScrollToTop />
            <WhatsAppButton />
            <Footer />
        </div>
    );
}
