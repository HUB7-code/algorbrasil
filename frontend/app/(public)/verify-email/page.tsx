'use client';

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState("Validando token de segurança...");

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage("Token de verificação não encontrado.");
            return;
        }

        const verifyToken = async () => {
            try {
                const res = await fetch("/api/v1/verify-email", { // Ajustando para a rota correta do Auth
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.detail || "Falha na verificação.");

                setStatus('success');
                setMessage("E-mail confirmado com sucesso!");

                // Redirecionamento automatico opcional
                // setTimeout(() => router.push('/login'), 3000);

            } catch (error: any) {
                console.error("Verification Error:", error);
                setStatus('error');
                setMessage(error.message || "Token inválido ou expirado.");
            }
        };

        verifyToken();
    }, [token, router]);

    return (
        <motion.div
            className="w-full max-w-md p-8 rounded-3xl bg-[#0A1A2F]/60 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Loading State */}
            {status === 'loading' && (
                <div className="flex flex-col items-center">
                    <Loader2 className="w-12 h-12 text-[#00A3FF] animate-spin mb-6" />
                    <h2 className="text-xl text-white font-medium mb-2">Verificando...</h2>
                    <p className="text-gray-400 text-sm">{message}</p>
                </div>
            )}

            {/* Success State */}
            {status === 'success' && (
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-[#00FF94]/10 flex items-center justify-center mb-6 ring-1 ring-[#00FF94]/30">
                        <CheckCircle className="w-10 h-10 text-[#00FF94]" />
                    </div>
                    <h2 className="text-2xl text-white font-display mb-4">Conta Ativada</h2>
                    <p className="text-gray-400 mb-8 max-w-xs">{message}</p>

                    <Link href="/login" className="w-full">
                        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00A3FF] text-[#050810] font-bold uppercase tracking-widest shadow-lg shadow-[#00FF94]/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                            Acessar Sistema <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            )}

            {/* Error State */}
            {status === 'error' && (
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 ring-1 ring-red-500/30">
                        <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-xl text-white font-medium mb-4">Falha na Ativação</h2>
                    <p className="text-red-300 text-sm mb-8 bg-red-900/20 p-4 rounded-lg border border-red-500/20 w-full">
                        {message}
                    </p>

                    <Link href="/register">
                        <button className="text-gray-400 hover:text-white underline text-sm">
                            Tentar cadastro novamente
                        </button>
                    </Link>
                </div>
            )}
        </motion.div>
    );
}

export default function VerifyEmailPage() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050810] text-gray-100 font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
            </div>

            <Suspense fallback={<div className="text-white">Carregando...</div>}>
                <VerifyEmailContent />
            </Suspense>
        </main>
    );
}
