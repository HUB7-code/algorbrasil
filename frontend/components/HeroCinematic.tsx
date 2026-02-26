'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Globe } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function HeroCinematic() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // ─ Parallax ─
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const blobTopY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const blobBotY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const card1Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const card2Y = useTransform(scrollYProgress, [0, 1], [0, -35]);

    // ─ Video: apenas toca quando visível na viewport ─
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Respeitar preferência de movimento reduzido do OS
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            video.pause();
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { /* autoplay bloqueado, silencioso */ });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.15 } // inicia quando 15% da seção está visível
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0B0F1E] pt-24 pb-20">
            {/* Ambient Lighting — with scroll parallax */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    style={{ y: blobTopY }}
                    className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#4F7EFF] rounded-full blur-[200px] opacity-[0.15]"
                />
                <motion.div
                    style={{ y: blobBotY }}
                    className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#818CF8] rounded-full blur-[150px] opacity-[0.1]"
                />
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* LEFT: TEXT CONTENT */}
                    <div className="text-left max-w-2xl">
                        {/* Institution tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4F7EFF]/30 bg-[#4F7EFF]/10 text-[#4F7EFF] text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md"
                        >
                            <Shield className="w-3.5 h-3.5" />
                            Enterprise AI Governance
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-inter text-5xl lg:text-7xl font-extrabold leading-[1.05] text-white mb-6 tracking-tight"
                        >
                            Governança inteligente movida a{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7EFF] to-[#00FF94]">
                                Inteligência Artificial
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-slate-400 mb-10 leading-relaxed pr-8"
                        >
                            Soluções de compliance completas para conselhos e executivos:
                            transforme dados em confiança, evite multas, e lidere a adoção segura de IA no Brasil.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 mb-14"
                        >
                            <Link
                                href="/#diagnostico"
                                className="group relative overflow-hidden px-8 py-4 bg-[#00FF94] text-black rounded-xl font-bold tracking-wide hover:bg-[#00CC76] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                                <span className="relative">Agendar Diagnóstico Gratuito</span>
                                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/#pillars"
                                className="px-8 py-4 border border-white/20 text-white/80 rounded-xl font-semibold hover:bg-white/5 hover:border-white/40 transition-all duration-300 w-full sm:w-auto text-center block"
                            >
                                Nossas Soluções
                            </Link>
                        </motion.div>

                        {/* Statistics Trust */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex items-center gap-4 text-sm font-bold text-slate-300"
                        >
                            <span className="text-[#00FF94]">+600</span> organizações
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                            <span className="text-[#00FF94]">+20.000</span> conselheiros
                        </motion.div>
                    </div>

                    {/* RIGHT: HUMAN & UI COMPOSITION */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden md:block"
                    >
                        {/* Main Frame — slow-motion video background */}
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10 aspect-[4/3]">
                            {/* Cinematic slow-motion tech video */}
                            <video
                                ref={videoRef}
                                muted
                                loop
                                playsInline
                                preload="none"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ filter: 'saturate(0.85) brightness(0.92)' }}
                                poster="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=75"
                            >
                                {/* Local cinematic video asset */}
                                <source
                                    src="/videos/hero-bg.mp4"
                                    type="video/mp4"
                                />
                                {/* Fallback corporate image */}
                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75"
                                    alt="Equipe discutindo Governança"
                                    className="object-cover w-full h-full"
                                />
                            </video>

                            {/* Color-grading: azul premium para casar com paleta */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4F7EFF]/25 via-transparent to-[#818CF8]/20 mix-blend-screen pointer-events-none" />
                            {/* Overlay degradê para legibilidade */}
                            <div className="absolute inset-0 video-hero-overlay pointer-events-none" />

                            {/* "Live" indicator — reforça SaaS em tempo real */}
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                                <span className="text-[9px] font-bold text-white uppercase tracking-widest">Live</span>
                            </div>
                        </div>

                        {/* Floating Glassmorphism Element 1 (Top Left) — premium glass */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="absolute -top-6 -left-12 z-20 p-4 rounded-2xl flex items-center gap-4 w-64"
                            style={{
                                y: card1Y,
                                background: 'rgba(15, 23, 42, 0.6)',
                                backdropFilter: 'blur(32px)',
                                WebkitBackdropFilter: 'blur(32px)',
                                border: '1px solid rgba(79, 126, 255, 0.35)',
                                boxShadow: '0 0 40px rgba(79,126,255,0.2), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                            }}
                        >
                            <div className="p-2.5 rounded-xl bg-[#4F7EFF] text-white shadow-lg shadow-[#4F7EFF]/30">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-xs font-bold leading-tight">Maturidade ISO 42001</p>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <motion.div
                                        className="h-1.5 rounded-full bg-gradient-to-r from-[#00FF94] to-[#4F7EFF]"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '85%' }}
                                        transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
                                    />
                                </div>
                                <p className="text-[#00FF94] text-[9px] font-bold mt-1">85% · Nível Avançado</p>
                            </div>
                        </motion.div>

                        {/* Floating Glassmorphism Element 2 (Bottom Right) */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="absolute -bottom-8 -right-8 z-20 p-4 rounded-2xl flex items-center gap-3 w-56"
                            style={{
                                y: card2Y,
                                background: 'rgba(15, 23, 42, 0.75)',
                                backdropFilter: 'blur(28px)',
                                WebkitBackdropFilter: 'blur(28px)',
                                border: '1px solid rgba(79, 126, 255, 0.25)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(129,140,248,0.15)',
                            }}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#818CF8] to-[#4F7EFF] flex items-center justify-center border-2 border-[#0B0F1E] shadow-lg">
                                    <Globe className="w-4 h-4 text-white" />
                                </div>
                                {/* Online indicator */}
                                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#00FF94] rounded-full border-2 border-[#0B0F1E] animate-pulse" />
                            </div>
                            <div>
                                <p className="text-[#00FF94] text-sm font-black">+250 Membros</p>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Comitê Global</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
