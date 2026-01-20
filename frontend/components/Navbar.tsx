'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Lock, Search, Calculator, ShieldCheck, Users, BookOpen, Building2, GraduationCap, Briefcase } from 'lucide-react';
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
                                sizes="112px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="font-orbitron text-2xl tracking-wide font-bold text-white leading-none">
                            ALGOR <span className="text-[#00FF94]">BRASIL</span>
                        </span>
                        <span className="hidden md:block text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em] ml-0.5">
                            Association
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu - Institutional Focus */}
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 items-center">

                    <Link href="/solutions/enterprise" className="hover:text-white transition-colors py-2 relative group">
                        Soluções
                        <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-[#00FF94] group-hover:w-full transition-all duration-300" />
                    </Link>

                    <Link href="/academy" className="hover:text-white transition-colors py-2 relative group">
                        Academy
                        <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-[#8B5CF6] group-hover:w-full transition-all duration-300" />
                    </Link>

                    <Link href="/institute" className="hover:text-white transition-colors py-2 relative group">
                        Instituto
                        <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-[#00A3FF] group-hover:w-full transition-all duration-300" />
                    </Link>

                    <Link href="/associates" className="hover:text-white transition-colors py-2 relative group">
                        Associação
                        <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-[#FFD700] group-hover:w-full transition-all duration-300" />
                    </Link>

                    <div className="w-[1px] h-6 bg-white/10 mx-2" />

                    {/* Member Area / Login */}
                    <Link href="/login" className="hover:text-white transition-colors font-medium">
                        Login
                    </Link>

                    {/* CTA Principal - Conversion Focus */}
                    <Link href="/register">
                        <motion.button
                            className="relative group px-6 py-2.5 overflow-hidden rounded-xl bg-[#00FF94] text-[#0A1A2F] font-bold tracking-wide shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:shadow-[0_0_30px_rgba(0,255,148,0.5)] transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Seja Membro
                                <Users className="w-4 h-4" />
                            </span>
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
                        <div className="space-y-8">

                            <div className="space-y-4">
                                <p className="text-xs text-gray-500 uppercase tracking-widest px-2 font-mono">Navegação</p>

                                <Link href="/solutions/enterprise" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5" onClick={() => setMobileMenuOpen(false)}>
                                    <Briefcase className="w-5 h-5 text-[#00A3FF]" />
                                    <span className="text-white text-lg font-medium">Soluções Enterprise</span>
                                </Link>

                                <Link href="/academy" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5" onClick={() => setMobileMenuOpen(false)}>
                                    <GraduationCap className="w-5 h-5 text-[#8B5CF6]" />
                                    <span className="text-white text-lg font-medium">Academy</span>
                                </Link>

                                <Link href="/institute" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5" onClick={() => setMobileMenuOpen(false)}>
                                    <Building2 className="w-5 h-5 text-[#00FF94]" />
                                    <span className="text-white text-lg font-medium">Instituto ALGOR</span>
                                </Link>

                                <Link href="/associates" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5" onClick={() => setMobileMenuOpen(false)}>
                                    <Users className="w-5 h-5 text-[#FFD700]" />
                                    <span className="text-white text-lg font-medium">Associação</span>
                                </Link>
                            </div>

                            <div className="pt-8 border-t border-white/10 space-y-4">
                                <Link href="/register" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full py-4 rounded-xl bg-[#00FF94] text-[#050810] font-bold text-lg uppercase tracking-widest shadow-lg shadow-[#00FF94]/20">
                                        Seja Membro
                                    </button>
                                </Link>

                                <Link href="/login" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                                        Fazer Login
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
