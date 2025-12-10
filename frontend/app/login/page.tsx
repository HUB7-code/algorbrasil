"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Lock, AlertCircle } from "lucide-react";
import HeroScene from "@/components/HeroScene";

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
            // Backend expects JSON (UserLogin schema), NOT OAuth2 Form Data
            const res = await fetch("/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Credenciais inválidas.");
            }

            // Store Token (Simple localStorage for MVP)
            localStorage.setItem("algor_token", data.access_token);
            localStorage.setItem("algor_user", JSON.stringify({
                role: data.role,
                name: data.username
            }));

            // Redirect to Dashboard
            // Redirect based on Onboarding Status
            if (data.role === "subscriber") {
                router.push("/onboarding");
            } else {
                router.push("/dashboard");
            }

        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brand-navy p-4">
            {/* Background 3D */}
            <div className="absolute inset-0 opacity-50 z-0 pointer-events-none">
                <HeroScene />
            </div>

            <div className="z-10 w-full max-w-sm space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-brand-blue/60 hover:text-brand-green transition-colors font-mono text-xs mb-8">
                        <ArrowLeft className="w-4 h-4" /> VOLTAR PARA HOME
                    </Link>
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-brand-navy/80 border border-brand-green/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,148,0.2)] backdrop-blur-md">
                            <Lock className="w-8 h-8 text-brand-green" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white tracking-tight">
                        Acesso Restrito
                    </h2>
                </div>

                {/* Form Card */}
                <div className="glass-panel p-8 rounded-2xl border-t border-white/10 backdrop-blur-xl relative overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            name="email"
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            name="password"
                            label="Senha"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {errorMessage && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {errorMessage}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full relative overflow-hidden group"
                            disabled={isLoading}
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                            {isLoading ? "Autenticando..." : "ENTRAR NO CONSOLE"}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-xs text-brand-blue/50">
                    Não tem acesso? <Link href="/register" className="text-brand-green hover:underline">Solicitar credencial</Link>
                </p>
            </div>
        </main>
    );
}
