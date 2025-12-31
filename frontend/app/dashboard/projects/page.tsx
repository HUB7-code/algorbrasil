"use client";

import { Folder, GitBranch, Users, Play, Plus, Lock, ShieldAlert, Cpu, Construction } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
    return (
        <div className="p-8 w-full min-h-screen relative text-white font-sans overflow-hidden bg-[#050A14] flex flex-col items-center justify-center">

            {/* Deep Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[0%] w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* BLURRED BACKGROUND CONTENT (Ghost UI) */}
            <div className="absolute inset-0 p-8 opacity-20 filter blur-[8px] pointer-events-none select-none overflow-hidden">
                {/* Header Ghost */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-orbitron font-bold text-white mb-2">Projetos de IA</h1>
                        <p className="text-lg text-gray-400">Gestão de ciclo de vida</p>
                    </div>
                </div>

                {/* Grid Ghost */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-[#0A1A2F]/40 border border-white/10 p-8 rounded-2xl h-[280px] flex flex-col justify-between">
                            <div className="flex justify-between">
                                <div className="w-12 h-12 rounded-xl bg-white/5" />
                                <div className="w-24 h-6 rounded bg-white/5" />
                            </div>
                            <div className="space-y-4">
                                <div className="w-[80%] h-8 rounded bg-white/10" />
                                <div className="w-full h-2 rounded-full bg-white/5" />
                                <div className="flex justify-between">
                                    <div className="w-20 h-4 rounded bg-white/5" />
                                    <div className="w-20 h-4 rounded bg-white/5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* LOCKED OVERLAY (Foreground) */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="relative z-10 max-w-lg w-full"
            >
                {/* Holographic Container */}
                <div className="rounded-[32px] bg-[#0A111F]/80 backdrop-blur-xl border border-white/10 p-12 text-center relative overflow-hidden group shadow-2xl">

                    {/* Animated Scanning Line */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent opacity-50"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                    />

                    {/* Lock Icon with Pulse */}
                    <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#00A3FF]/20 rounded-full blur-xl animate-pulse" />
                        <div className="relative w-full h-full rounded-2xl bg-[#0A1A2F] border border-[#00A3FF]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,163,255,0.2)]">
                            <Lock className="w-10 h-10 text-[#00A3FF]" />
                        </div>
                        {/* Orbiting Elements */}
                        <motion.div
                            className="absolute inset-[-10px] border border-[#00A3FF]/20 rounded-full border-t-transparent border-l-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        />
                    </div>

                    <h2 className="text-3xl font-orbitron font-bold text-white mb-4">
                        Acesso Restrito
                    </h2>

                    <div className="space-y-4 mb-8">
                        <p className="text-gray-300 font-light leading-relaxed">
                            O módulo <span className="text-[#00A3FF] font-bold">Gerenciamento de Projetos</span> está atualmente em fase de desenvolvimento confidencial (Alpha) pela equipe de engenharia da ALGOR.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs font-mono font-bold uppercase tracking-wider">
                            <Construction className="w-3 h-3" />
                            Status: Em Construção
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        className="w-full py-4 bg-gradient-to-r from-[#00A3FF] to-[#0066FF] hover:from-[#0080CC] hover:to-[#0055DD] text-white font-bold rounded-xl uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all flex items-center justify-center gap-2 group/btn"
                    >
                        <ShieldAlert className="w-4 h-4" />
                        Solicitar Acesso Antecipado
                    </button>

                    <p className="mt-6 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                        Protocol Code: PROJECT_GENESIS_LOCK_V1
                    </p>
                </div>
            </motion.div>

        </div>
    );
}
