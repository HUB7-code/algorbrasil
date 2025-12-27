"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");
        setMessage("");

        try {
            const res = await fetch("/api/v1/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error("Erro ao processar solicitação");

            setStatus("success");
            // Security Best Practice: Always show generic success message
            setMessage("Se este e-mail estiver cadastrado, você receberá as instruções em breve.");

        } catch (error) {
            console.error(error);
            setStatus("error");
            setMessage("Ocorreu um erro ao conectar ao servidor. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050810] text-[#E3E3E3] font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[120px]" />
            </div>

            <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <Link href="/login" className="flex items-center gap-2 text-sm text-[#C4C7C5] hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-xl bg-[#444746]/30 border border-white/10 flex items-center justify-center group-hover:bg-[#5E5E5E] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span>Voltar para Login</span>
                </Link>
            </header>

            <div className="w-full max-w-[440px] px-6 animate-in fade-in slide-in-from-bottom-4 duration-700 z-10 relative">

                {status === "success" ? (
                    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#0A1A2F]/60 border border-[#00FF94]/30 backdrop-blur-xl">
                        <div className="w-20 h-20 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30 flex items-center justify-center mb-6">
                            <div className="w-10 h-10 text-[#00FF94]">📩</div>
                        </div>
                        <h2 className="text-2xl font-serif text-white mb-4">Verifique seu E-mail</h2>
                        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                            {message}
                        </p>
                        <Link href="/login" className="px-8 py-3 rounded-xl bg-[#00FF94] text-[#050810] font-bold text-sm uppercase tracking-wide hover:brightness-110 transition-all">
                            Voltar para Login
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center mb-10">
                            <div className="w-20 h-20 rounded-full bg-[#00A3FF]/10 flex items-center justify-center mb-6 border border-[#00A3FF]/30 shadow-[0_0_30px_rgba(0,163,255,0.2)]">
                                <KeyRound className="w-8 h-8 text-[#00A3FF]" />
                            </div>
                            <h1 className="text-3xl font-serif text-center text-white mb-3">
                                Recuperar Senha
                            </h1>
                            <p className="text-sm text-gray-400 text-center font-light max-w-xs">
                                Informe seu email corporativo para receber as instruções de recuperação.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF]/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl -z-10 blur-md" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="peer w-full h-[56px] px-4 pt-4 bg-[#0A1A2F]/50 text-white border border-white/10 rounded-xl placeholder-transparent focus:outline-none focus:border-[#00A3FF]/50 focus:ring-1 focus:ring-[#00A3FF]/50 transition-all font-mono"
                                    placeholder="Email"
                                />
                                <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base pointer-events-none uppercase tracking-wider font-bold">
                                    Email corporativo
                                </label>
                            </div>

                            {status === "error" && (
                                <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg border border-red-500/20">
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-[56px] rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0066FF] text-white font-bold uppercase tracking-widest text-sm hover:brightness-110 disabled:opacity-50 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Enviando...</span>
                                    </>
                                ) : "Enviar Link de Recuperação"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </main>
    );
}
