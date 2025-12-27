'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Lock, Search, Calculator, ShieldCheck, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ========================================
// NAVBAR - Power BI Premium Dark Mode
// ========================================

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const isHome = pathname === '/';
    const normalizedPath = pathname?.replace(/\/$/, '') || '';
    const isAuthPage = ['/login', '/register', '/2fa', '/onboarding', '/partners/apply'].includes(normalizedPath);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
                    setScrollProgress(progress);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    if (isAuthPage) return null;

    const handleNavigation = (sectionId: string) => {
        if (isHome) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push(`/#${sectionId}`);
        }
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { id: 'governance', label: 'A Autoridade' },
        { id: 'personas', label: 'Enterprise' },
        { id: 'methodology', label: 'Metodologia' },
    ];

    return (
        <motion.nav
            className={`fixed w-full z-[100] transition-all duration-500 will-change-transform ${scrolled
                ? 'bg-[#0A1A2F]/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                : 'py-6 bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
            {/* Reading Progress Bar */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#00A3FF] via-[#00FF94] to-[#8B5CF6] will-change-[width] opacity-70"
                style={{ width: `${scrollProgress}%`, transition: 'width 0.1s linear' }} />

            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">

                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-4 group relative z-50">
                    <div className="relative w-28 h-28">
                        <div className="absolute inset-0 bg-[#00FF94]/20 rounded-full blur-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-28 h-28 rounded-full border border-[#00FF94]/30 shadow-[0_0_25px_rgba(0,255,148,0.25)] overflow-hidden transition-transform group-hover:scale-105">
                            <Image
                                src="/logo-algor.webp"
                                alt="Algor Brasil Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="font-orbitron text-2xl tracking-wide font-bold text-white leading-none">
                            ALGOR <span className="text-[#00FF94]">BRASIL</span>
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em] ml-0.5">
                            AI Governance
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 items-center">

                    {/* Ferramentas Dropdown (Premium) */}
                    <div className="relative group">
                        <button className="flex items-center gap-1.5 hover:text-white transition-colors py-2">
                            Ferramentas
                            <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                        </button>

                        {/* Dropdown Panel */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            {/* Arrow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-3 h-3 bg-[#131825] border-t border-l border-white/10 rotate-45" />

                            <div className="relative bg-[#131825]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Ambient Glow */}
                                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#00A3FF]/20 rounded-full blur-[30px]" />

                                <div className="p-2 space-y-1 relative z-10">
                                    <Link href="/scanner" className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group/item">
                                        <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF] group-hover/item:scale-110 transition-transform">
                                            <Search className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">Scanner de IA</p>
                                            <p className="text-gray-500 text-xs">Analise logs gratuitamente</p>
                                        </div>
                                    </Link>

                                    <Link href="/calculadora" className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group/item">
                                        <div className="w-8 h-8 rounded-lg bg-[#FFB000]/10 flex items-center justify-center text-[#FFB000] group-hover/item:scale-110 transition-transform">
                                            <Calculator className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">Calculadora LGPD</p>
                                            <p className="text-gray-500 text-xs">Calcule sua exposição</p>
                                        </div>
                                    </Link>

                                    <div className="h-[1px] bg-white/5 my-1 mx-2" />

                                    <Link href="/associates" className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group/item" prefetch={true}>
                                        <div className="w-8 h-8 rounded-lg bg-[#00FF94]/10 flex items-center justify-center text-[#00FF94] group-hover/item:scale-110 transition-transform">
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">Especialistas</p>
                                            <p className="text-gray-500 text-xs">Rede credenciada Algor</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavigation(link.id)}
                            className="relative hover:text-white transition-colors py-2 group"
                        >
                            {link.label}
                            <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-[#00FF94] group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}

                    <div className="w-[1px] h-6 bg-white/10 mx-2" />

                    {/* Member Area Button */}
                    <Link href="/login">
                        <motion.button
                            className="relative group px-5 py-2 overflow-hidden rounded-lg bg-[#0A1A2F] border border-[#00FF94]/30 shadow-[0_0_15px_rgba(0,255,148,0.1)] hover:shadow-[0_0_25px_rgba(0,255,148,0.3)] hover:border-[#00FF94]/50 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Background Shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF94]/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />

                            <div className="relative flex items-center gap-2">
                                <Lock className="w-3 h-3 text-[#00FF94] transition-transform group-hover:rotate-12" />
                                <span className="font-mono text-xs uppercase tracking-widest text-[#00FF94] group-hover:text-white transition-colors font-bold">
                                    Login
                                </span>
                            </div>
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2 relative z-50 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="absolute top-0 left-0 w-full h-screen bg-[#050810]/95 backdrop-blur-xl z-40 flex flex-col pt-24 px-6 md:hidden"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        {/* Mobile Links */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 uppercase tracking-widest px-2 mb-2">Ferramentas</p>
                                <Link href="/scanner" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF]">
                                        <Search className="w-4 h-4" />
                                    </div>
                                    <span className="text-white text-sm font-medium">Scanner de IA</span>
                                </Link>
                                <Link href="/calculadora" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="w-8 h-8 rounded-lg bg-[#FFB000]/10 flex items-center justify-center text-[#FFB000]">
                                        <Calculator className="w-4 h-4" />
                                    </div>
                                    <span className="text-white text-sm font-medium">Calculadora LGPD</span>
                                </Link>
                            </div>

                            <div className="space-y-4">
                                <p className="text-xs text-gray-500 uppercase tracking-widest px-2">Menu Principal</p>
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => handleNavigation(link.id)}
                                        className="w-full text-left p-2 text-xl font-serif text-white hover:text-[#00FF94] transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                                <Link
                                    href="/associates"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block p-2 text-xl font-serif text-white hover:text-[#00FF94] transition-colors"
                                    prefetch={true}
                                >
                                    Especialistas
                                </Link>
                            </div>

                            <Link href="/login" className="block w-full pt-8">
                                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00A3FF] text-[#050810] font-bold uppercase tracking-widest shadow-lg shadow-[#00FF94]/20">
                                    Acessar Portal
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    );
}
