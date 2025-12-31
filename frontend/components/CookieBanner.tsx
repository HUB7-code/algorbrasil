"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('algor_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem('algor_cookie_consent', 'accepted_all');
        setIsVisible(false);
        // Here you would trigger analytics load
        console.log("Cookies accepted - Analytics can fire");
    };

    const rejectNonEssential = () => {
        localStorage.setItem('algor_cookie_consent', 'essential_only');
        setIsVisible(false);
        console.log("Cookies rejected - Only essential fired");
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-4xl mx-auto bg-[#0A0E1A]/95 backdrop-blur-md border border-[#00FF94]/20 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-[#00FF94]/5">
                <div className="flex-1">
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <span className="material-symbols-rounded text-[#00FF94]">cookie</span>
                        Privacidade e Cookies
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Utilizamos cookies para personalizar sua experiência e garantir a segurança do sistema.
                        Ao navegar, você concorda com nossa <Link href="/policies/privacy" className="text-[#00FF94] hover:underline">Política de Privacidade</Link> e <Link href="/policies/cookies" className="text-[#00FF94] hover:underline">Política de Cookies</Link>.
                    </p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <button
                        onClick={rejectNonEssential}
                        className="px-4 py-2 text-sm text-slate-300 hover:text-white border border-slate-700/50 rounded-lg hover:border-slate-600 transition-colors"
                    >
                        Rejeitar Opcionais
                    </button>
                    <button
                        onClick={acceptAll}
                        className="px-6 py-2 text-sm bg-[#00FF94]/10 hover:bg-[#00FF94]/20 text-[#00FF94] border border-[#00FF94]/30 rounded-lg transition-all font-medium shadow-[0_0_15px_rgba(0,255,148,0.1)] hover:shadow-[0_0_20px_rgba(0,255,148,0.2)]"
                    >
                        Aceitar Todos
                    </button>
                </div>
            </div>
        </div>
    );
}
