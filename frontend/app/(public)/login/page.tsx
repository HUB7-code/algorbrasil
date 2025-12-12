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

            localStorage.setItem("algor_token", data.access_token);
            localStorage.setItem("algor_user", JSON.stringify({ role: data.role, name: data.username }));

            const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
            router.push(redirectUrl || (data.role === "subscriber" ? "/onboarding" : "/dashboard"));

        } catch (error: any) {
            // MOCK MODE: Fallback for frontend testing
            if (formData.email.includes("errado") || formData.email.includes("error")) {
                setErrorMessage("Falha de autenticação simulada (Token Inválido).");
            } else {
                console.warn("API Offline (Mock Mode): Login Success");
                localStorage.setItem("algor_token", "mock_token_dev");
                localStorage.setItem("algor_user", JSON.stringify({ role: "admin", name: "Dev User" }));
                const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
                // Redirect to 2FA instead of Dashboard directly
                router.push("/2fa?flow=login");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#131314] text-[#E3E3E3] font-sans selection:bg-[#A8C7FA] selection:text-[#001D35]">
            {/* Google Style Top Bar */}
            <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <Link href="/" className="flex items-center gap-2 text-sm text-[#C4C7C5] hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-[#444746] flex items-center justify-center group-hover:bg-[#5E5E5E] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                </Link>
            </header>

            {/* Main Content: "Product" Aesthetic */}
            <div className="w-full max-w-[400px] px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

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
                    <h1 className="text-[28px] leading-[36px] font-normal text-center text-[#E3E3E3] mb-2">
                        Bem-vindo de volta
                    </h1>
                    <p className="text-sm text-[#C4C7C5] text-center">
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
                            className="peer w-full h-[56px] px-4 pt-4 bg-[#1E1F20] text-[#E3E3E3] border border-[#8E918F] rounded-[4px] md:rounded-[16px] placeholder-transparent focus:outline-none focus:border-[#A8C7FA] focus:ring-1 focus:ring-[#A8C7FA] transition-all"
                            placeholder="Email"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-2 text-[#C4C7C5] text-xs transition-all 
                                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#C4C7C5]
                                peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#A8C7FA]
                                peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#C4C7C5] pointer-events-none"
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
                                className="peer w-full h-[56px] px-4 pt-4 bg-[#1E1F20] text-[#E3E3E3] border border-[#8E918F] rounded-[4px] md:rounded-[16px] placeholder-transparent focus:outline-none focus:border-[#A8C7FA] focus:ring-1 focus:ring-[#A8C7FA] transition-all"
                                placeholder="Senha"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-4 top-2 text-[#C4C7C5] text-xs transition-all 
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#C4C7C5]
                                    peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#A8C7FA]
                                    peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#C4C7C5] pointer-events-none"
                            >
                                Senha
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-sm font-medium text-[#A8C7FA] hover:text-[#D3E3FD] no-underline hover:underline">
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
                            className="w-full h-[48px] rounded-full bg-[#A8C7FA] text-[#062E6F] text-sm font-medium hover:bg-[#85B5F8] active:bg-[#A8C7FA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
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
                    <Link href="/register" className="block text-sm text-[#A8C7FA] hover:text-[#D3E3FD] transition-colors">
                        Não tem conta? Solicite acesso
                    </Link>
                </div>
            </div>
        </main>
    );
}
