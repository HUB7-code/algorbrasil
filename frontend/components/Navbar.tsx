'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Building2, Users, Briefcase, GraduationCap, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
    const isAuthPage = ['/login', '/register', '/2fa', '/onboarding', '/partners/apply'].includes(normalizedPath);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20); // Trigger earlier for floating effect
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
                    ? 'max-w-6xl mx-4 rounded-2xl bg-[#0A1A2F]/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent border-transparent'}`}
            >
                {/* Scroll Progress (Integrated into pod border or subtle bottom line) */}
                {scrolled && (
                    <div
                        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF94] to-transparent will-change-[width] opacity-50 transition-all"
                        style={{ width: `${scrollProgress}%`, left: '50%', transform: 'translateX(-50%)' }}
                    />
                )}

                <div className={`px-6 md:px-8 flex justify-between items-center relative transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-4 group relative z-50">
                        <div className="relative w-20 h-20 md:w-24 md:h-24">
                            {/* Logo Glow */}
                            <div className="absolute inset-0 bg-[#00FF94] rounded-full blur-[25px] opacity-10 group-hover:opacity-30 transition-opacity duration-500" />

                            <div className="relative w-full h-full rounded-full border border-[#00FF94]/30 shadow-[0_0_15px_rgba(0,255,148,0.1)] overflow-hidden transition-transform group-hover:scale-105 bg-black/20 backdrop-blur-sm">
                                <Image
                                    src="/logo-algor.webp"
                                    alt="Algor Brasil Logo"
                                    fill
                                    sizes="96px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                        {/* Texto limpo e centralizado verticalmente */}
                        <div className="flex flex-col justify-center h-full">
                            <span className="font-orbitron text-lg md:text-xl tracking-widest font-bold leading-none transition-all">
                                <span className="text-white">ALGOR</span> <span className="text-[#00FF94]">BRASIL</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu - UI Refinada (Semibold + Contraste) */}
                    <div className="hidden md:flex gap-1 text-sm font-semibold text-gray-300 items-center">

                        {[
                            { href: '/institute', label: 'A Associação', color: '#00FF94' },
                            { href: '/academy', label: 'Academy', color: '#8B5CF6' },
                            { href: '/blog', label: 'Blog', color: '#F59E0B' },
                            { href: '/board', label: 'Quem Somos', color: '#FFD700' },
                        ].map((link) => (
                            <Link key={link.href} href={link.href} className="relative group px-4 py-2 hover:text-white transition-colors">
                                {link.label}
                                {/* Hover Glow Dot */}
                                <span
                                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-[2px]"
                                    style={{ backgroundColor: link.color }}
                                />
                                <span
                                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] group-hover:w-1/2 transition-all duration-300"
                                    style={{ backgroundColor: link.color }}
                                />
                            </Link>
                        ))}

                        <div className="w-[1px] h-6 bg-white/10 mx-4" />

                        {/* Member Area / Login */}
                        <Link href="/login" className="hover:text-white transition-colors font-semibold text-white/80 hover:text-[#00A3FF] flex items-center gap-2 mr-4 group">
                            <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 group-hover:border-[#00A3FF]/30 group-hover:bg-[#00A3FF]/10 transition-all">
                                <Lock className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs uppercase tracking-wider font-bold">Membro</span>
                        </Link>

                        {/* CTA Principal - Mini Holographic Button */}
                        <Link href="/register">
                            <motion.button
                                className="relative group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-[#00FF94] blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="relative px-6 py-2 rounded-lg bg-[#00FF94]/10 border border-[#00FF94]/50 hover:bg-[#00FF94]/20 transition-all overflow-hidden">
                                    {/* Scanline */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF94]/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1s] ease-in-out" />

                                    <span className="relative z-10 flex items-center gap-2 uppercase text-[10px] font-bold tracking-[0.15em] text-white">
                                        Associar-se
                                        <ArrowRight className="w-3 h-3 text-[#00FF94]" />
                                    </span>
                                </div>
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2 relative z-50 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
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
                        className="fixed inset-0 bg-[#050810]/98 backdrop-blur-2xl z-40 flex flex-col pt-32 px-6 md:hidden"
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        {/* Mobile Links */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-xs text-[#00FF94] uppercase tracking-widest px-2 font-mono mb-4 border-b border-white/10 pb-2">Menu Principal</p>

                                {[
                                    { href: '/institute', label: 'A Associação', icon: Users },
                                    { href: '/academy', label: 'Academy', icon: GraduationCap },
                                    { href: '/blog', label: 'Blog', icon: BookOpen },
                                    { href: '/board', label: 'Quem Somos', icon: Building2 },
                                ].map((link) => (
                                    <Link key={link.href} href={link.href} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00FF94]/30 active:scale-95 transition-all" onClick={() => setMobileMenuOpen(false)}>
                                        <link.icon className="w-5 h-5 text-gray-400" />
                                        <span className="text-white text-lg font-medium">{link.label}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-6 mt-auto mb-10 space-y-4">
                                <Link href="/register" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full py-4 rounded-xl bg-[#00FF94] text-[#050810] font-bold text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,148,0.3)]">
                                        Quero me Associar
                                    </button>
                                </Link>

                                <Link href="/login" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        Área do Membro
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
