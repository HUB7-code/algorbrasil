'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Building2, Briefcase, ArrowRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import UserLevelBadge from './lab/UserLevelBadge';
import NeuralGlobe from './NeuralGlobe';

// ========================================
// NAVBAR - Holographic Command Center
// ========================================

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const isHome = pathname === '/';
    const normalizedPath = pathname?.replace(/\/$/, '') || '';
    const isAuthPage = ['/login', '/register', '/2fa', '/sign-in', '/sign-up'].includes(normalizedPath);
    const isLabPage = pathname?.startsWith('/academy/lab');

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
                    setScrolled(currentScrollY > 20); // Trigger earlier for floating effect
                    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
                    setScrollProgress(progress);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Also listen on document just in case
        document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('scroll', handleScroll, { capture: true });
        }
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    if (isAuthPage) return null;

    return (
        <motion.nav
            className={`fixed left-0 right-0 z-[100] transition-all duration-500 will-change-transform flex justify-center ${scrolled
                ? 'top-4'
                : 'top-0'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
            {/* FLOATING GLASS POD */}
            <div
                className={`transform transition-all duration-500 w-full ${scrolled
                    ? 'max-w-6xl mx-4 rounded-2xl bg-[#0B0F1E]/80 backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent border-transparent'}`}
            >
                {/* Scroll Progress */}
                {scrolled && (
                    <div
                        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#4F7EFF] to-transparent will-change-[width] opacity-50 transition-all"
                        style={{ width: `${scrollProgress}%`, left: '50%', transform: 'translateX(-50%)' }}
                    />
                )}

                <div className={`px-6 md:px-8 flex justify-between items-center relative transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-3 group relative z-50">
                        <span className="flex-shrink-0 transition-transform group-hover:scale-105 duration-300 block">
                            <NeuralGlobe size={52} intensity="medium" />
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="font-orbitron text-base md:text-lg font-bold tracking-widest uppercase text-white">
                                ALGOR BRASIL
                            </span>
                            <span className="text-[9px] text-[#4F7EFF] tracking-[0.2em] uppercase font-medium mt-0.5 hidden md:block">
                                AI Governance
                            </span>
                        </span>
                    </Link>


                    {/* Desktop Menu - UI Refinada */}
                    <div className="hidden md:flex gap-1 text-sm font-semibold text-gray-300 items-center">

                        {[
                            { href: '/#pillars', label: 'Consultoria B2B', color: '#4F7EFF' },
                            { href: '/board', label: 'Especialistas', color: '#4F7EFF' },
                        ].map((link) => (
                            <Link key={link.href} href={link.href} className="relative group px-4 py-2 hover:text-white transition-colors">
                                {link.label}
                                {/* Hover Glow Dot */}
                                <span
                                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-[1px]"
                                    style={{ backgroundColor: link.color }}
                                />
                                <span
                                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] group-hover:w-1/2 transition-all duration-300"
                                    style={{ backgroundColor: link.color }}
                                />
                            </Link>
                        ))}

                        <div className="w-[1px] h-6 bg-white/10 mx-4" />

                        {/* Gamification Badge (Only in Lab) */}
                        {isLabPage && (
                            <>
                                <UserLevelBadge />
                                <div className="w-[1px] h-6 bg-white/10 mx-4" />
                            </>
                        )}

                        {/* Member Area / Login — Dynamic based on auth state */}
                        <SignedOut>
                            <SignInButton mode="redirect">
                                <span className="transition-colors font-semibold text-white/80 hover:text-[#4F7EFF] flex items-center gap-2 mr-4 group cursor-pointer">
                                    <span className="p-1.5 rounded-lg bg-white/5 border border-slate-700/50 group-hover:border-[#4F7EFF]/30 group-hover:bg-[#4F7EFF]/10 transition-all block">
                                        <Lock className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="text-xs uppercase tracking-wider font-bold">Entrar</span>
                                </span>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/dashboard" className="transition-colors font-semibold text-white/80 hover:text-[#4F7EFF] flex items-center gap-2 mr-3 group">
                                <span className="p-1.5 rounded-lg bg-white/5 border border-slate-700/50 group-hover:border-[#4F7EFF]/30 group-hover:bg-[#4F7EFF]/10 transition-all inline-flex items-center">
                                    <LayoutDashboard className="w-3.5 h-3.5" />
                                </span>
                                <span className="text-xs uppercase tracking-wider font-bold">Minha Conta</span>
                            </Link>
                            <span className="mr-4">
                                <UserButton afterSignOutUrl="/" />
                            </span>
                        </SignedIn>

                        {/* CTA Principal */}
                        <Link
                            href="https://wa.me/558599851769?text=Olá! Gostaria de agendar um Diagnóstico de IA para minha empresa."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 bg-[#4F7EFF] text-white rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-[#3D6AE8] hover:shadow-[0_0_20px_rgba(79,126,255,0.4)] transition-all flex items-center gap-2"
                        >
                            Diagnóstico
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2 relative z-50 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-slate-700/50"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-[#0C1020]/98 backdrop-blur-2xl z-40 flex flex-col pt-32 px-6 md:hidden"
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        {/* Mobile Links */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-xs text-[#4F7EFF] uppercase tracking-widest px-2 font-semibold mb-4 border-b border-gray-100 pb-2">Menu Principal</p>

                                {[
                                    { href: '/#pillars', label: 'Consultoria B2B', icon: Briefcase },
                                    { href: '/board', label: 'Especialistas Associados', icon: Building2 },
                                ].map((link) => (
                                    <Link key={link.href} href={link.href} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#4F7EFF]/30 active:scale-95 transition-all" onClick={() => setMobileMenuOpen(false)}>
                                        <link.icon className="w-5 h-5 text-[#4F7EFF]" />
                                        <span className="text-[#0F172A] text-lg font-medium">{link.label}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-6 mt-auto mb-10 space-y-4">
                                <Link
                                    href="https://wa.me/558599851769?text=Olá! Gostaria de agendar um Diagnóstico de IA para minha empresa."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-4 rounded-xl bg-[#0F172A] text-white font-bold text-center text-lg tracking-wide shadow-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Solicitar Diagnóstico
                                </Link>

                                <SignedOut>
                                    <SignInButton mode="redirect">
                                        <span className="w-full py-4 rounded-xl bg-gray-50 border border-gray-200 text-[#0F172A] font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                                            <Lock className="w-4 h-4" />
                                            Entrar
                                        </span>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <Link
                                        href="/dashboard"
                                        className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-[#0F172A] font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 block"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Minha Conta
                                    </Link>
                                </SignedIn>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
