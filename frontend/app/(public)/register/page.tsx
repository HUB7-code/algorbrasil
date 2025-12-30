"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Lock, User, Mail, Phone, KeyRound } from "lucide-react";
import Image from "next/image";

// ========================================
// REGISTER PAGE - POWER BI PREMIUM
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

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
    },
    student: {
        src: "/images/personas/protector.png",
        alt: "Algor Knowledge Hub",
        label: "Membro Acadêmico"
    }
};

function RegisterContent() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setRole(params.get('role'));
        }
    }, []);

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

            // Capturar o texto bruto primeiro para debug
            const responseText = await res.text();

            // Tentar fazer parse do JSON
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                // Silently fails parsing logs in production
                throw new Error(`Erro ao processar resposta do servidor.`);
            }

            if (!res.ok) throw new Error(data.detail || "Erro ao criar conta.");

            setStatus("success");
            setTimeout(() => {
                router.push("/register/success");
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
        <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0A0E1A] text-white font-sans selection:bg-[#00FF94] selection:text-[#0A0E1A] relative overflow-hidden">

            {/* Background Ambient Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00FF94]/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00A3FF]/8 rounded-full blur-[150px]" />
                <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
            </div>

            {/* Left Column: Brand & Visual */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden"
            >
                {/* Gradient Border Right */}
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#00FF94]/30 to-transparent" />

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,148,0.03)_0%,transparent_50%)]" />

                {/* Top Section */}
                <div className="relative z-10">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col gap-1 mb-12 group">
                        <div>
                            <span className="font-orbitron font-bold text-xl text-white">
                                ALGOR <span className="text-[#00FF94]">BRASIL</span>
                            </span>
                        </div>
                    </Link>

                    {/* Welcome Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl font-serif font-medium leading-tight mb-6 text-white">
                            Bem-vindo à <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">Elite</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-md font-light leading-relaxed">
                            {activePersona
                                ? `Acesso exclusivo às ferramentas de ${activePersona.label} e conformidade ISO 42001.`
                                : "Compliance automatizado com a ISO 42001 e monitoramento de riscos em tempo real para seus modelos de IA."}
                        </p>
                    </motion.div>
                </div>

                {/* Center: Persona Visualization */}
                <motion.div
                    className="relative z-10 flex-grow flex items-center justify-center py-8 -mt-24"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="relative w-full max-w-[380px] aspect-square group">
                        {/* Outer Glow Ring */}
                        <motion.div
                            className="absolute -inset-4 rounded-full border border-[#00FF94]/20"
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* Inner Glow */}
                        <div className="absolute inset-8 bg-gradient-to-br from-[#00FF94]/10 to-[#00A3FF]/5 rounded-full blur-2xl" />

                        {/* Main Image Container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-gradient-to-br from-[#131825] to-[#0A0E1A] shadow-[0_0_60px_rgba(0,0,0,0.5)] group-hover:border-[#00FF94]/30 transition-all duration-500">
                            <Image
                                src="/logo-algor.webp"
                                alt="Algor Brasil"
                                fill
                                className="object-contain p-12 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                priority
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent opacity-80" />

                            {/* Label */}
                            <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center text-center">
                                {/* Label Removed as requested */}
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-[#00FF94]/30 backdrop-blur-md">
                                    <div className="w-2 h-2 rounded-full bg-[#00FF94] shadow-[0_0_10px_#00FF94] animate-pulse" />
                                    <span className="text-[10px] font-mono text-[#00FF94] uppercase tracking-[0.2em]">
                                        System Online
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom */}
                <div className="relative z-10 flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-600">
                        © 2025 Algor Brasil. Secure Enclave.
                    </span>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#00FF94]" />
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">ISO 42001 Ready</span>
                    </div>
                </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
                className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="w-full max-w-[480px]">

                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 flex items-center gap-3">
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-[#00FF94]/30 shadow-[0_0_20px_rgba(0,255,148,0.2)]">
                            <Image src="/logo-algor.webp" alt="Algor" width={96} height={96} className="object-contain" />
                        </div>
                        <div>
                            <span className="font-orbitron font-bold text-lg text-white">ALGOR <span className="text-[#00FF94]">BRASIL</span></span>
                        </div>
                    </div>

                    {/* Header */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-8"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF94]"></span>
                            </div>
                            <span className="text-[10px] font-mono text-[#00FF94] uppercase tracking-[0.2em] font-bold">
                                Secure Registration
                            </span>
                        </div>
                        <h2 className="text-4xl font-serif font-medium text-white mb-2">
                            Criar <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Conta</span>
                        </h2>
                        <p className="text-gray-400 font-light">
                            {role === 'student' ? "Perfil: Estudante / Acadêmico" : (role ? `Perfil: ${role.charAt(0).toUpperCase() + role.slice(1)}` : "Junte-se à plataforma de governança de IA.")}
                        </p>
                    </motion.div>

                    {/* Success State */}
                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-10 rounded-2xl bg-gradient-to-br from-[#131825] to-[#0A0E1A] border border-[#00FF94]/30 text-center shadow-[0_0_40px_rgba(0,255,148,0.1)]"
                            >
                                <motion.div
                                    className="w-20 h-20 rounded-2xl bg-[#00FF94]/10 border border-[#00FF94]/30 flex items-center justify-center mx-auto mb-6"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <CheckCircle2 className="w-10 h-10 text-[#00FF94]" />
                                </motion.div>
                                <h3 className="text-2xl font-serif font-medium text-white mb-2">Conta Criada!</h3>
                                <p className="text-gray-400">Redirecionando para verificação...</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Form Fields */}
                                <motion.div variants={itemVariants} className="space-y-4">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                                            <User className="w-3 h-3" />
                                            Nome Completo
                                        </label>
                                        <input
                                            name="full_name"
                                            type="text"
                                            className="w-full h-14 bg-[#131825] border border-white/10 rounded-xl px-4 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 focus:bg-[#131825] outline-none transition-all placeholder:text-gray-600 hover:border-white/20"
                                            placeholder="Seu nome completo"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                                                <Mail className="w-3 h-3" />
                                                E-mail
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                className="w-full h-14 bg-[#131825] border border-white/10 rounded-xl px-4 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 outline-none transition-all placeholder:text-gray-600 hover:border-white/20"
                                                placeholder="nome@empresa.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                                                <Phone className="w-3 h-3" />
                                                Telefone
                                            </label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                className="w-full h-14 bg-[#131825] border border-white/10 rounded-xl px-4 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 outline-none transition-all placeholder:text-gray-600 hover:border-white/20"
                                                placeholder="(11) 99999-9999"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Passwords */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                                                <KeyRound className="w-3 h-3" />
                                                Senha
                                            </label>
                                            <div className="relative">
                                                <input
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    className="w-full h-14 bg-[#131825] border border-white/10 rounded-xl px-4 pr-12 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 outline-none transition-all placeholder:text-gray-600 hover:border-white/20"
                                                    placeholder="••••••••"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00FF94] transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                                                <Lock className="w-3 h-3" />
                                                Confirmar
                                            </label>
                                            <div className="relative">
                                                <input
                                                    name="confirm_password"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="w-full h-14 bg-[#131825] border border-white/10 rounded-xl px-4 pr-12 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 outline-none transition-all placeholder:text-gray-600 hover:border-white/20"
                                                    placeholder="••••••••"
                                                    value={formData.confirm_password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00FF94] transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Consent Checkbox */}
                                <motion.div variants={itemVariants} className="pt-2">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative mt-1">
                                            <input
                                                type="checkbox"
                                                id="consent"
                                                checked={consent}
                                                onChange={(e) => setConsent(e.target.checked)}
                                                className="sr-only peer"
                                                required
                                            />
                                            <div className="w-5 h-5 rounded-md border border-white/20 bg-[#131825] peer-checked:bg-[#00FF94] peer-checked:border-[#00FF94] transition-all flex items-center justify-center group-hover:border-[#00FF94]/50">
                                                {consent && <CheckCircle2 className="w-3 h-3 text-[#0A0E1A]" />}
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-400 leading-relaxed">
                                            Concordo com os{' '}
                                            <Link href="/policies/terms" className="text-[#00FF94] hover:underline font-medium">
                                                Termos de Uso
                                            </Link>{' '}
                                            e{' '}
                                            <Link href="/policies/privacy" className="text-[#00FF94] hover:underline font-medium">
                                                Política de Privacidade
                                            </Link>
                                            , e aceito o processamento dos meus dados.
                                        </span>
                                    </label>
                                </motion.div>

                                {/* Error Message */}
                                <AnimatePresence>
                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm flex items-center gap-3"
                                        >
                                            <AlertTriangle className="w-5 h-5 shrink-0" />
                                            {errorMessage}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit Button */}
                                <motion.div variants={itemVariants} className="pt-4 space-y-4">
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading || !consent}
                                        whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(0,255,148,0.3)" }}
                                        whileTap={{ scale: 0.99 }}
                                        className="relative w-full h-14 rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00CC76] text-[#0A0E1A] font-bold text-sm tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-[#00FF94]/50 shadow-[0_0_30px_rgba(0,255,148,0.2)] overflow-hidden"
                                    >
                                        {/* Progress Bar */}
                                        <div
                                            className={`absolute left-0 top-0 h-full bg-white/30 transition-all duration-[2000ms] ease-out ${isLoading ? 'w-full' : 'w-0'}`}
                                        />

                                        {/* Button Content */}
                                        <div className="relative z-10 flex items-center justify-center gap-2">
                                            {isLoading ? (
                                                <>
                                                    <span className="material-symbols-rounded animate-spin text-[18px]">progress_activity</span>
                                                    <span>Criando conta...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4" />
                                                    Criar Conta
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </div>
                                    </motion.button>

                                    <p className="text-center text-sm text-gray-500">
                                        Já tem uma conta?{' '}
                                        <Link href="/login" className="text-[#00FF94] font-bold hover:text-[#00A3FF] transition-colors">
                                            Fazer login
                                        </Link>
                                    </p>
                                </motion.div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div >
        </main >
    );
}

export default function RegisterPage() {
    return <RegisterContent />;
}
