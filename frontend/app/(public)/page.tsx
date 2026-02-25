'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ChevronRight } from 'lucide-react';
import HeroCinematic from '@/components/HeroCinematic'; // above-the-fold: import síncrono

// ── Below-the-fold: carregados dinamicamente (split de bundle) ──
const TrainingJourney = lazy(() => import('@/components/TrainingJourney'));
const PainPointBanner = lazy(() => import('@/components/PainPointBanner'));
const CinematicSolutions = lazy(() => import('@/components/CinematicSolutions'));
const SaasPreview = lazy(() => import('@/components/SaasPreview'));
const GlobalTeam = lazy(() => import('@/components/GlobalTeam'));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));
const Footer = lazy(() => import('@/components/Footer'));

// Skeleton minimal para o placeholder enquanto carrega
function SectionSkeleton() {
    return <div className="w-full py-24 bg-[#0B0F1E]" aria-hidden="true" />;
}

export default function Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
                    setScrolled(currentScrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#0B0F1E] text-white font-sans selection:bg-[#4F7EFF] selection:text-white">

            {/* ── ABOVE THE FOLD: carregado imediatamente ── */}
            <HeroCinematic />

            {/* ── BELOW THE FOLD: carregamento diferido ── */}
            <Suspense fallback={<SectionSkeleton />}>
                <TrainingJourney />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <PainPointBanner />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <CinematicSolutions />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <SaasPreview />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <GlobalTeam />
            </Suspense>

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

            <Suspense fallback={null}>
                <WhatsAppButton />
            </Suspense>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>
    );
}
