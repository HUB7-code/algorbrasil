'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// ========================================
// LOGIN PAGE - Power BI Premium Dark Mode
// ========================================

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const res = await fetch("/api/v1/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.detail || "Credenciais inválidas.");

            console.log("Login success:", data);

            if (data.requires_2fa) {
                localStorage.setItem("algor_temp_token", data.access_token);
                router.push("/2fa?flow=login");
                return;
            }

            // Save auth data to LocalStorage (for client-side usage)
            localStorage.setItem("algor_token", data.access_token);
            localStorage.setItem("algor_user", JSON.stringify({ role: data.role, name: data.username }));

            // Save auth data to Cookies (vulnerable, but required for Middleware)
            // In production, this should be httpOnly set by the backend
            document.cookie = `access_token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;

            // Direct redirect
            const urlParams = new URLSearchParams(window.location.search);
            const redirectParam = urlParams.get('redirect');

            console.log("Redirecting to:", redirectParam || "/dashboard");

            // Define target URL
            const targetUrl = redirectParam || (data.role === "subscriber" ? "/onboarding" : "/dashboard");

            // Use window.location as fallback if router.push hangs
            router.push(targetUrl);
            router.refresh(); // Ensure strict refresh

        } catch (error: any) {
            console.error("Login Error:", error);
            setErrorMessage(error.message || "Erro ao conectar com o servidor.");
            setIsLoading(false); // ALWAYS reset loading on error
        } finally {
            // If strictly successful, we rely on page navigation. 
            // But just in case router is slow, we can keep it loading visually.
            // On error, it was already reset in catch block.
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050810] text-gray-100 font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[120px]" />
            </div>

            {/* Top Bar */}
            <header className="absolute top-0 left-0 w-full p-8 z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all group-hover:border-[#00FF94]/30">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-white" />
                    </div>
                </Link>
            </header>

            {/* Login Card */}
            <motion.div
                className="w-full max-w-[440px] p-10 rounded-3xl bg-[#0A1A2F]/60 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        className="relative w-24 h-24 mb-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="absolute inset-0 bg-[#00FF94]/20 rounded-full blur-[30px]" />
                        <div className="relative w-24 h-24 rounded-full border border-[#00FF94]/30 shadow-[0_0_20px_rgba(0,255,148,0.2)] overflow-hidden">
                            <Image
                                src="/logo-algor.webp"
                                alt="Algor Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    <h1 className="text-3xl font-serif text-white mb-2 text-center">
                        Bem-vindo
                    </h1>
                    <p className="text-sm text-gray-400 text-center font-light">
                        Acesse seu console de governança
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF94]/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl -z-10 blur-md" />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="peer w-full h-[56px] px-4 pt-6 bg-[#050810]/50 text-white border border-white/10 rounded-xl placeholder-transparent focus:outline-none focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/50 transition-all font-mono"
                            placeholder="Email"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-2 text-gray-500 text-xs transition-all 
                                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                                peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#00FF94]
                                peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500 pointer-events-none uppercase tracking-wider font-bold"
                        >
                            Email corporativo
                        </label>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF]/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl -z-10 blur-md" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="peer w-full h-[56px] px-4 pt-6 bg-[#050810]/50 text-white border border-white/10 rounded-xl placeholder-transparent focus:outline-none focus:border-[#00A3FF]/50 focus:ring-1 focus:ring-[#00A3FF]/50 transition-all font-mono pr-12"
                                placeholder="Senha"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            <label
                                htmlFor="password"
                                className="absolute left-4 top-2 text-gray-500 text-xs transition-all 
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                                    peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#00A3FF]
                                    peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500 pointer-events-none uppercase tracking-wider font-bold"
                            >
                                Senha
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-xs font-mono text-[#00A3FF] hover:text-white transition-colors">
                                Esqueceu a senha?
                            </Link>
                        </div>
                    </div>

                    {errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex items-center gap-2 p-4 rounded-xl bg-red-900/20 border border-red-500/20 text-red-200 text-sm"
                        >
                            <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                            {errorMessage}
                        </motion.div>
                    )}

                    <div className="pt-2">
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full h-[56px] rounded-xl overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF94] to-[#00A3FF] transition-all duration-300 group-hover:brightness-110" />

                            {/* Loading State */}
                            {isLoading && (
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            )}

                            <div className="relative flex items-center justify-center gap-2 h-full text-[#050810] font-bold uppercase tracking-widest text-sm">
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-[#050810] border-t-transparent rounded-full animate-spin" />
                                        <span>Acessando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        Acessar Sistema
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </motion.button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-sm text-gray-500 mb-2">Ainda não possui acesso?</p>
                    <Link href="/register" className="inline-flex items-center gap-2 text-sm text-[#00FF94] hover:text-white transition-colors font-mono font-medium">
                        Solicitar conta Enterprise <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
