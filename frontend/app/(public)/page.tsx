'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';
import HeroCinematic from '@/components/HeroCinematic';
import TrainingJourney from '@/components/TrainingJourney';
import CinematicSolutions from '@/components/CinematicSolutions';
import SaasPreview from '@/components/SaasPreview';
import GlobalTeam from '@/components/GlobalTeam';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
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

    return (
        <div className="min-h-screen bg-[#0B0F1E] text-white overflow-x-hidden font-sans selection:bg-[#4F7EFF] selection:text-white">

            {/* Hero */}
            <HeroCinematic />

            {/* 1. Nossos Treinamentos */}
            <TrainingJourney />

            {/* 2. Nossas Consultorias */}
            <CinematicSolutions />

            {/* 3. Nossos Sistemas SaaS */}
            <SaasPreview />

            {/* 4. Nossa Equipe Global */}
            <GlobalTeam />

            {/* Scroll to Top */}
            {scrolled && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Scroll to top"
                    className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-white/10 border border-white/20 shadow-lg rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
                >
                    <ChevronRight className="w-5 h-5 -rotate-90 text-[#4F7EFF]" />
                </button>
            )}

            <WhatsAppButton />
            <Footer />
        </div>
    );
}
