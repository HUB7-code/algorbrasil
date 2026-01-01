'use client';

import Link from "next/link";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterSuccessPage() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050810] text-gray-100 font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                className="w-full max-w-md p-8 rounded-3xl bg-[#0A1A2F]/60 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Icon Container */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-[#00A3FF]/20 rounded-full blur-[30px]" />
                    <div className="relative w-24 h-24 rounded-full border border-[#00A3FF]/30 bg-[#0A1A2F] flex items-center justify-center shadow-[0_0_20px_rgba(0,163,255,0.2)]">
                        <Mail className="w-10 h-10 text-[#00A3FF]" />
                    </div>
                    {/* Status Dot */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#00FF94] rounded-full border-4 border-[#0A1A2F] flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-[#050810]" />
                    </div>
                </div>

                <h1 className="text-2xl font-display text-white mb-4">
                    Confirme seu E-mail
                </h1>

                <p className="text-gray-400 leading-relaxed mb-8">
                    Enviamos um link de segurança para o seu endereço de e-mail. <br />
                    <span className="text-sm text-gray-500">(Verifique também sua caixa de Spam)</span>
                </p>

                <div className="p-4 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/20 mb-8">
                    <p className="text-xs text-[#00A3FF] font-mono">
                        Seu acesso será liberado automaticamente após a confirmação.
                    </p>
                </div>

                <Link href="/login">
                    <button className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2 group">
                        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Voltar para Login
                    </button>
                </Link>

            </motion.div>
        </main>
    );
}
