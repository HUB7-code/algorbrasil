"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import ConsentCheckbox from "@/components/ui/ConsentCheckbox";
// import LegalTooltip from "@/components/ui/LegalTooltip"; // Simplification for M3
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [consent, setConsent] = useState(false);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");
        setErrorMessage("");

        if (formData.password !== formData.confirm_password) {
            setStatus("error");
            setErrorMessage("As senhas não coincidem.");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/v1/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    full_name: formData.full_name,
                    phone: formData.phone,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Erro ao criar conta.");

            setStatus("success");
            setTimeout(() => { router.push("/login"); }, 2000);

        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row bg-[#131314] text-[#E3E3E3] font-sans">

            {/* Left Column: Branding (Marketing Chin Pattern) */}
            <div className="hidden md:flex w-1/2 bg-[#004A77] relative flex-col justify-between p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm">
                        <span className="material-symbols-rounded text-white text-2xl">verified_user</span>
                    </div>
                    <h1 className="text-5xl font-normal leading-tight mb-6">Comece sua jornada de governança.</h1>
                    <p className="text-[#D3E3FD] text-lg max-w-md">Compliance automatizado com a ISO 42001 e monitoramento de riscos em tempo real para seus modelos de IA.</p>
                </div>
                <div className="relative z-10 text-sm text-[#A8C7FA]/60">
                    © 2024 Algor Brasil. Secure Enclave.
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                <div className="w-full max-w-[480px] space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* Mobile Header */}
                    <div className="md:hidden mb-8">
                        <div className="w-10 h-10 bg-[#004A77] rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-rounded text-white">verified_user</span>
                        </div>
                        <h1 className="text-3xl font-normal text-[#E3E3E3]">Criar Conta</h1>
                    </div>

                    <div className="hidden md:block">
                        <h2 className="text-3xl font-normal text-[#E3E3E3] mb-2">Criar Conta</h2>
                        <p className="text-[#C4C7C5]">Junte-se à plataforma de governança.</p>
                    </div>

                    {status === "success" ? (
                        <div className="p-8 rounded-[24px] bg-[#1E1F20] border border-[#444746] text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-[#0F5223] text-[#C4EED0] flex items-center justify-center mx-auto">
                                <span className="material-symbols-rounded text-3xl">check</span>
                            </div>
                            <h3 className="text-xl font-medium">Sucesso!</h3>
                            <p className="text-[#C4C7C5]">Sua conta foi criada. Redirecionando...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-[#C4C7C5] ml-1">Nome Completo</label>
                                    <input
                                        name="full_name"
                                        type="text"
                                        className="w-full h-14 bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none transition-colors"
                                        placeholder="Seu nome"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-[#C4C7C5] ml-1">E-mail</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="w-full h-14 bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none transition-colors"
                                            placeholder="nome@empresa.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-[#C4C7C5] ml-1">Telefone</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            className="w-full h-14 bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none transition-colors"
                                            placeholder="(11) 99999-9999"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-[#C4C7C5] ml-1">Senha</label>
                                        <input
                                            name="password"
                                            type="password"
                                            className="w-full h-14 bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none transition-colors"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-[#C4C7C5] ml-1">Confirmar</label>
                                        <input
                                            name="confirm_password"
                                            type="password"
                                            className="w-full h-14 bg-[#1E1F20] border border-[#444746] rounded-[4px] px-4 text-[#E3E3E3] focus:border-[#A8C7FA] focus:outline-none transition-colors"
                                            placeholder="••••••••"
                                            value={formData.confirm_password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="mt-1 w-5 h-5 rounded border-[#444746] bg-[#1E1F20] text-[#A8C7FA] focus:ring-offset-[#131314]"
                                    required
                                />
                                <label htmlFor="consent" className="text-sm text-[#C4C7C5] leading-snug">
                                    Concordo com a <Link href="/policies/terms" className="text-[#A8C7FA] hover:underline">Política de Privacidade</Link> e aceito o processamento dos meus dados.
                                </label>
                            </div>

                            {status === "error" && (
                                <div className="p-4 rounded-[12px] bg-[#93000A]/10 border border-[#93000A]/20 text-[#FFDAD6] text-sm flex items-center gap-2">
                                    <span className="material-symbols-rounded">error</span>
                                    {errorMessage}
                                </div>
                            )}

                            <div className="pt-4 space-y-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 rounded-full bg-[#A8C7FA] text-[#062E6F] font-medium hover:bg-[#D3E3FD] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {isLoading ? "Criando conta..." : "Criar Conta"}
                                </button>

                                <p className="text-center text-sm text-[#C4C7C5]">
                                    Já tem uma conta? <Link href="/login" className="text-[#A8C7FA] font-medium hover:underline">Fazer login</Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
