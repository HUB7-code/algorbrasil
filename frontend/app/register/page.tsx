"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import ConsentCheckbox from "@/components/ui/ConsentCheckbox";
import LegalTooltip from "@/components/ui/LegalTooltip";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import HeroScene from "@/components/HeroScene";

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
            // Using /api default proxy
            const res = await fetch("/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    full_name: formData.full_name,
                    phone: formData.phone,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Erro ao criar conta.");
            }

            setStatus("success");
            // Redirect after 2 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } catch (error: any) {
            setStatus("error");
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

            <div className="z-10 w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-brand-blue/60 hover:text-brand-green transition-colors font-mono text-xs mb-8">
                        <ArrowLeft className="w-4 h-4" /> VOLTAR PARA HOME
                    </Link>
                    <h2 className="text-3xl font-display font-bold text-white tracking-tight">
                        Acesso ao <span className="text-brand-green text-glow">CONSOLE</span>
                    </h2>
                    <p className="mt-2 text-sm text-brand-blue/80 font-mono">
                        Crie sua identidade digital para iniciar a governança.
                    </p>
                </div>

                {/* Form Card */}
                <div className="glass-panel p-8 rounded-2xl border-t border-white/10 backdrop-blur-xl relative overflow-hidden">
                    {/* Status Loading Line */}
                    {isLoading && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-navy/50 overflow-hidden">
                            <div className="h-full bg-brand-green w-1/3 animate-[loading_1s_ease-in-out_infinite]" />
                        </div>
                    )}

                    {status === "success" ? (
                        <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="flex justify-center">
                                <CheckCircle2 className="w-16 h-16 text-brand-green" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Cadastro Realizado!</h3>
                            <p className="text-brand-blue/80 text-sm">
                                Sua credencial foi criada. Redirecionando...
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <Input
                                    name="full_name"
                                    label="Nome Completo"
                                    placeholder="Ex: Dr. Algor"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Input
                                            name="email"
                                            label="E-mail Corporativo"
                                            type="email"
                                            placeholder="voce@empresa.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="absolute top-0 right-0">
                                            <LegalTooltip content="Utilizado para login único e comunicações oficiais." side="left" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            name="phone"
                                            label="Telefone / WhatsApp"
                                            type="tel"
                                            placeholder="(11) 99999-9999"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        <div className="absolute top-0 right-0">
                                            <LegalTooltip content="Criptografado. Para recuperação de conta (MFA)." side="left" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        name="password"
                                        label="Senha"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                    <Input
                                        name="confirm_password"
                                        label="Confirmar Senha"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <ConsentCheckbox
                                    id="signup-consent"
                                    label="Concordo com a Política de Privacidade e aceito o processamento dos meus dados para fins de cadastro."
                                    checked={consent}
                                    onChange={setConsent}
                                    required
                                />
                            </div>

                            {status === "error" && (
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
                                {isLoading ? "Criptografando..." : "GERAR CREDENCIAL"}
                            </Button>

                            <p className="text-center text-xs text-brand-blue/50">
                                Já possui acesso? <Link href="/login" className="text-brand-green hover:underline">Faça login</Link>
                            </p>
                        </form>
                    )}
                </div>

                {/* Footer Badges */}
                <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="px-2 py-1 rounded border border-white/10 text-[10px] bg-black/20 text-white">ISO 42001</span>
                    <span className="px-2 py-1 rounded border border-white/10 text-[10px] bg-black/20 text-white">SSL SECURE</span>
                </div>
            </div>
        </main >
    );
}
