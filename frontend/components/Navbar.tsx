'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const isHome = pathname === '/';
    const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/2fa' || pathname === '/onboarding';

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

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 will-change-transform ${scrolled ? 'bg-[#0A1A2F]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-lg' : 'py-8 bg-transparent'}`}>
            <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00A3FF] via-[#00FF94] to-[#00A3FF] will-change-[width]"
                style={{ width: `${scrollProgress}%`, transition: 'width 0.1s linear' }} />

            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative w-32 h-32 rounded-full border border-[#00FF94]/30 shadow-[0_0_15px_rgba(0,255,148,0.2)] overflow-hidden transition-transform group-hover:scale-105">
                        <Image
                            src="/logo-algor.webp"
                            alt="Algor Brasil Logo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <span className="font-display text-xl tracking-wide font-bold text-white">ALGOR <span className="text-[#00FF94]">BRASIL</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
                    <button onClick={() => handleNavigation('governance')} className="hover:text-white transition-colors">A Autoridade</button>
                    <button onClick={() => handleNavigation('personas')} className="hover:text-white transition-colors">Soluções Enterprise</button>
                    <button onClick={() => handleNavigation('methodology')} className="hover:text-white transition-colors">Metodologia ALGOR</button>
                    <Link href="/associates" className="hover:text-white transition-colors" prefetch={true}>Rede de Especialistas</Link>
                </div>

                <Link href="/login" className="hidden md:block">
                    <button className="relative group px-6 py-2.5 overflow-hidden rounded-lg bg-[#0A1A2F] border border-brand-green/30 shadow-[0_0_15px_rgba(0,255,148,0.1)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,148,0.4)] hover:border-brand-green/60">
                        {/* Background Gradient Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/10 via-transparent to-brand-green/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                        <div className="relative flex items-center gap-2">
                            <span className="material-symbols-rounded text-brand-green text-sm transition-transform group-hover:rotate-12">lock</span>
                            <span className="font-mono text-xs uppercase tracking-widest text-brand-green group-hover:text-white transition-colors font-bold">
                                Area do Membro
                            </span>
                        </div>
                    </button>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Menu"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#0A1A2F]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-5">
                    <button onClick={() => handleNavigation('governance')} className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-white">A Autoridade</button>
                    <button onClick={() => handleNavigation('personas')} className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-white">Soluções Enterprise</button>
                    <button onClick={() => handleNavigation('methodology')} className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-white">Metodologia ALGOR</button>
                    <Link href="/associates" className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)} prefetch={true}>Rede de Especialistas</Link>
                    <Link href="/login" className="w-full">
                        <button className="w-full py-4 mt-2 relative overflow-hidden rounded-lg bg-gradient-to-r from-brand-navy to-brand-green/20 border border-brand-green/30 text-center group">
                            <div className="relative flex items-center justify-center gap-2">
                                <span className="material-symbols-rounded text-brand-green text-sm">lock</span>
                                <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                                    Acessar Portal
                                </span>
                            </div>
                        </button>
                    </Link>
                </div>
            )}
        </nav >
    );
}
