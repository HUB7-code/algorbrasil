"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // MOCK EMAIL SEND
        setTimeout(() => {
            // Redirect to 2FA in 'reset' flow
            router.push(`/2fa?flow=reset&email=${encodeURIComponent(email)}`);
        }, 1500);
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#131314] text-[#E3E3E3] font-sans">
            <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <Link href="/login" className="flex items-center gap-2 text-sm text-[#C4C7C5] hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-[#444746] flex items-center justify-center group-hover:bg-[#5E5E5E] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span>Voltar para Login</span>
                </Link>
            </header>

            <div className="w-full max-w-[400px] px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#004A77]/20 flex items-center justify-center mb-6 text-[#A8C7FA]">
                        <KeyRound className="w-7 h-7" />
                    </div>
                    <h1 className="text-[28px] font-normal text-center text-[#E3E3E3] mb-2">
                        Recuperar Senha
                    </h1>
                    <p className="text-sm text-[#C4C7C5] text-center">
                        Informe seu email corporativo para receber as instruções de recuperação.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group relative">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer w-full h-[56px] px-4 pt-4 bg-[#1E1F20] text-[#E3E3E3] border border-[#8E918F] rounded-[4px] md:rounded-[16px] placeholder-transparent focus:outline-none focus:border-[#A8C7FA] focus:ring-1 focus:ring-[#A8C7FA] transition-all"
                            placeholder="Email"
                        />
                        <label className="absolute left-4 top-2 text-[#C4C7C5] text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base pointer-events-none">
                            Email corporativo
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-[48px] rounded-full bg-[#A8C7FA] text-[#062E6F] text-sm font-medium hover:bg-[#85B5F8] disabled:opacity-50 transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                        {isLoading ? "Enviando..." : "Enviar Código de Recuperação"}
                    </button>
                </form>
            </div>
        </main>
    );
}
