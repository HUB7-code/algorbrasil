"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

            if (data.requires_2fa) {
                // Redirect to 2FA page with temp token
                localStorage.setItem("algor_temp_token", data.access_token);
                router.push("/2fa?flow=login");
                return;
            }

            localStorage.setItem("algor_token", data.access_token);
            localStorage.setItem("algor_user", JSON.stringify({ role: data.role, name: data.username }));

            const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
            router.push(redirectUrl || (data.role === "subscriber" ? "/onboarding" : "/dashboard"));

        } catch (error: any) {
            console.error("Login Error:", error);
            setErrorMessage(error.message || "Erro ao conectar com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-aurora-bg-gradient-start to-aurora-bg-gradient-end text-gray-100 font-sans selection:bg-aurora-violet selection:text-white relative overflow-hidden">
            {/* Atmosphere */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-aurora-violet/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-aurora-cyan/15 rounded-full blur-[120px] pointer-events-none" />
            {/* Google Style Top Bar */}
            <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                </Link>
            </header>

            {/* Main Content: "Aurora" Aesthetic */}
            <div className="w-full max-w-[420px] p-8 rounded-3xl bg-aurora-card-bg backdrop-blur-xl border border-aurora-border shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Logo Area - Minimalist */}
                <div className="flex flex-col items-center mb-12">
                    {/* Increased size significantly (2x) */}
                    <div className="w-[300px] h-[140px] flex items-center justify-center mb-6 relative">
                        <Image
                            src="/logo-algor.webp"
                            alt="Algor Logo"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 400px"
                            priority
                        />
                    </div>
                    <h1 className="text-2xl font-display font-medium text-center text-white mb-2">
                        Bem-vindo de volta
                    </h1>
                    <p className="text-sm text-aurora-cyan/80 text-center font-mono">
                        Acesse o console de governança
                    </p>
                </div>

                {/* Material 3 Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="group relative">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="peer w-full h-[56px] px-4 pt-6 bg-black/20 text-gray-100 border border-white/10 rounded-xl placeholder-transparent focus:outline-none focus:border-aurora-violet focus:ring-1 focus:ring-aurora-violet/50 transition-all"
                            placeholder="Email"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-2 text-gray-500 text-xs transition-all 
                                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                                peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-aurora-violet
                                peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500 pointer-events-none"
                        >
                            Email corporativo
                        </label>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="group relative">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="peer w-full h-[56px] px-4 pt-6 bg-black/20 text-gray-100 border border-white/10 rounded-xl placeholder-transparent focus:outline-none focus:border-aurora-violet focus:ring-1 focus:ring-aurora-violet/50 transition-all"
                                placeholder="Senha"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-4 top-2 text-gray-500 text-xs transition-all 
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                                    peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-aurora-violet
                                    peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500 pointer-events-none"
                            >
                                Senha
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-xs font-medium text-aurora-violet hover:text-aurora-pink transition-colors">
                                Esqueceu a senha?
                            </Link>
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="flex items-center gap-2 p-4 rounded-[12px] bg-[#3C1919] text-[#FFB4AB] text-sm">
                            <span className="material-symbols-rounded text-base">error</span>
                            {errorMessage}
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-[52px] rounded-xl bg-gradient-to-r from-aurora-violet to-aurora-pink text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
                        >
                            {isLoading ? (
                                <span className="material-symbols-rounded animate-spin">progress_activity</span>
                            ) : (
                                "Acessar sistema"
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center space-y-4">
                    <Link href="/register" className="block text-sm text-gray-400 hover:text-white transition-colors">
                        Não tem conta? <span className="text-aurora-cyan">Solicite acesso</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
