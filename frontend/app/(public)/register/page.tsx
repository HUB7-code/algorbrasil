"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import ConsentCheckbox from "@/components/ui/ConsentCheckbox";
// import LegalTooltip from "@/components/ui/LegalTooltip"; // Simplification for M3
import { ArrowLeft, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

// Persona Data Mapping
const personaImages: Record<string, { src: string; alt: string; label: string }> = {
    strategist: {
        src: "/images/personas/strategist.png",
        alt: "Dashboard Executivo ALGOR",
        label: "Visão Estratégica"
    },
    guardian: {
        src: "/images/personas/guardian.png",
        alt: "Escudo de Compliance e Risco",
        label: "Segurança & Auditoria"
    },
    builder: {
        src: "/images/personas/builder.png",
        alt: "Pipeline CI/CD Robusto",
        label: "Infraestrutura & MLOps"
    },
    protector: {
        src: "/images/personas/protector.png",
        alt: "Fortaleza Jurídica LGPD",
        label: "Blindagem Legal"
    }
};

function RegisterContent() {
    // Replace useSearchParams with client-side only check to avoid Suspense issues
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setRole(params.get('role'));
        }
    }, []);

    // Default or Specific Persona Image
    const activePersona = role && personaImages[role] ? personaImages[role] : {
        src: "/images/system_core.png",
        alt: "Algor Ecosystem Core",
        label: "Plataforma de Governança"
    };

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: ""
    });
    const [consent, setConsent] = useState(false);

    // States for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setStatus("idle");

        if (formData.password !== formData.confirm_password) {
            setErrorMessage("As senhas não conferem.");
            setStatus("error");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/v1/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.detail || "Erro ao criar conta.");

            setStatus("success");
            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } catch (error: any) {
            console.error("Register Error:", error);
            setErrorMessage(error.message || "Erro desconhecido.");
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-aurora-bg-gradient-start to-aurora-bg-gradient-end text-gray-100 font-sans selection:bg-aurora-violet selection:text-white">

            <div className="hidden md:flex w-1/2 bg-slate-900 relative flex-col justify-between p-12 overflow-hidden border-r border-aurora-border">
                {/* Aurora Background Effects */}
                <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-aurora-violet/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-aurora-cyan/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '3s' }} />

                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />

                {/* Top Text content */}
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <span className="material-symbols-rounded text-white text-3xl">verified_user</span>
                    </div>
                    <h1 className="text-5xl font-display font-medium leading-tight mb-6 text-white drop-shadow-lg">
                        {activePersona ? `Bem-vindo, ${activePersona.label.split(' ')[0]}.` : "Comece sua jornada de governança."}
                    </h1>
                    <p className="text-gray-300 text-lg max-w-md font-light leading-relaxed">
                        {activePersona
                            ? `Acesso exclusivo às ferramentas de ${activePersona.label} e conformidade ISO 42001.`
                            : "Compliance automatizado com a ISO 42001 e monitoramento de riscos em tempo real para seus modelos de IA."}
                    </p>
                </div>

                {/* Dynamic Persona Visualization */}
                {activePersona && (
                    <div className="relative z-10 flex-grow flex items-center justify-center py-8 animate-in fade-in zoom-in duration-1000 perspective-1000">
                        <div className="relative w-full max-w-[420px] aspect-square group cursor-default">
                            <div className="absolute -inset-8 bg-gradient-to-r from-aurora-violet/20 to-aurora-cyan/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="absolute inset-4 bg-aurora-violet/10 rounded-full blur-2xl animate-pulse-slow" />
                            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#0F172A]/50 backdrop-blur-sm shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group-hover:border-white/20">
                                <div className="absolute inset-0 transform transition-transform duration-700 scale-105 group-hover:scale-110">
                                    <Image
                                        src={activePersona.src}
                                        alt={activePersona.alt}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.6)_100%)] mixed-blend-multiply pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent opacity-90" />
                                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-end transform transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-center px-6">
                                    <h3 className="text-2xl font-display font-medium text-white mb-2 drop-shadow-md tracking-wide">
                                        {activePersona.label}
                                    </h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                        <div className="w-1.5 h-1.5 rounded-full bg-aurora-green shadow-[0_0_8px_#00FF94] animate-pulse" />
                                        <span className="text-[10px] font-mono text-aurora-cyan uppercase tracking-[0.2em]">
                                            System Online
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative z-10 text-sm text-aurora-cyan/60 font-mono">
                    © 2024 Algor Brasil. Secure Enclave.
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                <div className="w-full max-w-[480px] space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    <div className="md:hidden mb-8">
                        <div className="w-10 h-10 bg-aurora-violet/20 rounded-xl flex items-center justify-center mb-4 border border-aurora-violet/30">
                            <span className="material-symbols-rounded text-white">verified_user</span>
                        </div>
                        <h1 className="text-3xl font-display font-medium text-white">Criar Conta</h1>
                    </div>

                    <div className="hidden md:block">
                        <h2 className="text-3xl font-display font-medium text-white mb-2">Criar Conta</h2>
                        <p className="text-gray-400 font-light">
                            {role ? `Configurando perfil para: ${role.charAt(0).toUpperCase() + role.slice(1)}` : "Junte-se à plataforma de governança."}
                        </p>
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
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nome Completo</label>
                                    <input
                                        name="full_name"
                                        type="text"
                                        className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-gray-100 focus:border-aurora-violet focus:ring-1 focus:ring-aurora-violet/50 outline-none transition-all placeholder:text-gray-600"
                                        placeholder="Seu nome"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">E-mail</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-gray-100 focus:border-aurora-violet focus:ring-1 focus:ring-aurora-violet/50 outline-none transition-all placeholder:text-gray-600"
                                            placeholder="nome@empresa.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Telefone</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-gray-100 focus:border-aurora-violet focus:ring-1 focus:ring-aurora-violet/50 outline-none transition-all placeholder:text-gray-600"
                                            placeholder="(11) 99999-9999"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1 relative">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Senha</label>
                                        <div className="relative">
                                            <input
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-gray-100 focus:border-aurora-violet focus:ring-1 focus:ring-aurora-violet/50 outline-none transition-all placeholder:text-gray-600 pr-10"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1 relative">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirmar</label>
                                        <div className="relative">
                                            <input
                                                name="confirm_password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-gray-100 focus:border-aurora-violet focus:ring-1 focus:ring-aurora-violet/50 outline-none transition-all placeholder:text-gray-600 pr-10"
                                                placeholder="••••••••"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-black/40 text-aurora-violet focus:ring-aurora-violet/50 focus:ring-offset-0"
                                    required
                                />
                                <label htmlFor="consent" className="text-sm text-gray-400 leading-snug">
                                    Concordo com a <Link href="/policies/terms" className="text-aurora-cyan hover:underline">Política de Privacidade</Link> e aceito o processamento dos meus dados.
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
                                    className="relative w-full h-12 rounded-xl bg-gradient-to-r from-aurora-violet to-aurora-pink text-white font-medium hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-100 disabled:cursor-not-allowed border border-white/10 overflow-hidden"
                                >
                                    {/* Progress Bar Layer */}
                                    <div
                                        className={`absolute left-0 top-0 h-full bg-white/20 transition-all duration-[3000ms] ease-out ${isLoading ? 'w-full' : 'w-0'}`}
                                    />

                                    {/* Text Layer */}
                                    <div className="relative z-10 flex items-center justify-center gap-2">
                                        {isLoading ? (
                                            <>
                                                <span className="material-symbols-rounded animate-spin text-[18px]">progress_activity</span>
                                                <span>Criando conta...</span>
                                            </>
                                        ) : "Criar Conta"}
                                    </div>
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    Já tem uma conta? <Link href="/login" className="text-aurora-violet font-bold hover:text-aurora-pink transition-colors">Fazer login</Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}

export default function RegisterPage() {
    return <RegisterContent />;
}
