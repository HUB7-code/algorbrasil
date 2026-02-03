"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// ============================================================
// SIMPLIFIED ONBOARDING - WELCOME TO ACADEMY
// ============================================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function OnboardingPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Opcional: Redirecionar automaticamente após alguns segundos
        // const timer = setTimeout(() => router.push("/dashboard"), 5000);
        // return () => clearTimeout(timer);
    }, [router]);

    if (!mounted) return null;

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#050810] text-gray-100 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#00FF94]/10 rounded-full blur-[180px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[150px]" />
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative z-10 flex flex-col items-center text-center max-w-lg p-12 rounded-3xl 
                    bg-gradient-to-br from-[#0A1A2F]/80 to-[#050810]/80 
                    border border-[#00FF94]/30 backdrop-blur-2xl 
                    shadow-[0_0_80px_rgba(0,255,148,0.15),_inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
                {/* Status Bar */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20"
                >
                    <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse shadow-[0_0_8px_#00FF94]" />
                    <span className="text-[10px] font-bold text-[#00FF94] tracking-[0.2em] uppercase">Membro Verificado</span>
                </motion.div>

                {/* Welcome Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00FF94]/20 to-[#00FF94]/5 
                        border border-[#00FF94]/40 flex items-center justify-center mb-8
                        shadow-[0_0_40px_rgba(0,255,148,0.2)]"
                >
                    <Sparkles className="w-12 h-12 text-[#00FF94]" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Bem-vindo à <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">
                        Algor Academy
                    </span>
                </h1>

                <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                    Seu ambiente seguro de aprendizado e governança está pronto.
                    Acesse materiais exclusivos, ferramentas e a comunidade de membros.
                </p>

                <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,255,148,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/dashboard")}
                    className="w-full py-5 rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00CC76] 
                        text-[#050810] font-bold uppercase tracking-widest text-lg md:text-xl
                        shadow-[0_10px_40px_rgba(0,255,148,0.25)] transition-all flex items-center justify-center gap-3"
                >
                    Acessar Console
                    <ArrowRight className="w-6 h-6" />
                </motion.button>

                <div className="mt-8 pt-8 border-t border-white/5 w-full flex justify-center">
                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-[0.2em]">
                        <ShieldCheck className="w-4 h-4 text-[#00A3FF]" />
                        Secure Environment v18.4
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
