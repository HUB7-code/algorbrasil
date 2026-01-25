"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Lock, User, Mail, Phone, KeyRound, Check, X, Zap, TrendingUp, FileCheck } from "lucide-react";
import Image from "next/image";

// ========================================
// REGISTER PAGE - PREMIUM EXPERIENCE
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

// Password Strength Calculator
function calculatePasswordStrength(password: string): { score: number; label: string; color: string } {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: "Fraca", color: "#EF4444" };
    if (score <= 3) return { score, label: "Média", color: "#F59E0B" };
    return { score, label: "Elite", color: "#00FF94" };
}

// Password Requirements
const passwordRequirements = [
    { id: "length", label: "Mínimo 8 caracteres", test: (p: string) => p.length >= 8 },
    { id: "uppercase", label: "Letra maiúscula", test: (p: string) => /[A-Z]/.test(p) },
    { id: "number", label: "Número", test: (p: string) => /\d/.test(p) },
    { id: "special", label: "Caractere especial", test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
];

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
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: "Fraca", color: "#EF4444" });

    const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
        try {
            const res = await fetch(`/api/v1/auth/${provider}/login`);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.detail || `Erro ao conectar com ${provider}`);
            }
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error: any) {
            setErrorMessage(error.message);
            setStatus("error");
        }
    };


    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFormData = { ...formData, [e.target.name]: e.target.value };
        setFormData(newFormData);

        // Update password strength in real-time
        if (e.target.name === "password") {
            setPasswordStrength(calculatePasswordStrength(e.target.value));
        }
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
            const res = await fetch("/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const responseText = await res.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error("CRITICAL PARSE ERROR. Response text:", responseText);
                throw new Error(`Erro ao processar resposta do servidor: ${responseText.slice(0, 100)}...`);
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

            {/* Left Column: Brand & Visual - ORIGINAL */}
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
                        <h1 className="text-5xl font-display font-medium leading-tight mb-6 text-white">
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

            {/* Right Column: Form - COM MELHORIAS */}
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
                        <h2 className="text-4xl font-display font-medium text-white mb-2">
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
                                <h3 className="text-2xl font-display font-medium text-white mb-2">Conta Criada!</h3>
                                <p className="text-gray-400">Redirecionando para verificação...</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                data-testid="register-form"
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Social Login - NOVO */}
                                <motion.div variants={itemVariants} className="space-y-3">
                                    <p className="text-xs text-gray-500 text-center uppercase tracking-wider">Cadastro Rápido</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleSocialLogin('google')}
                                            className="h-12 rounded-xl bg-white/5 border border-white/10 hover:border-[#00A3FF]/30 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-gray-400 hover:text-white group"
                                        >
                                            <svg className="w-5 h-5 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span className="text-sm font-medium">Google</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleSocialLogin('linkedin')}
                                            className="h-12 rounded-xl bg-white/5 border border-white/10 hover:border-[#0077B5]/30 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-gray-400 hover:text-white group"
                                        >
                                            <svg className="w-5 h-5 group-hover:text-[#0077B5] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span className="text-sm font-medium">LinkedIn</span>
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/10"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-4 bg-[#0A0E1A] text-gray-500">ou preencha manualmente</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Form Fields - Glassmorphism */}
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
                                            data-testid="name-input"
                                            className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,255,148,0.1)] outline-none transition-all placeholder:text-gray-600 hover:border-white/20 backdrop-blur-sm"
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
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,255,148,0.1)] outline-none transition-all placeholder:text-gray-600 hover:border-white/20 backdrop-blur-sm"
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
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,255,148,0.1)] outline-none transition-all placeholder:text-gray-600 hover:border-white/20 backdrop-blur-sm"
                                                placeholder="(11) 99999-9999"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Password with Strength Meter - NOVO */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                                            <KeyRound className="w-3 h-3" />
                                            Senha
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,255,148,0.1)] outline-none transition-all placeholder:text-gray-600 hover:border-white/20 backdrop-blur-sm"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <motion.button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00FF94] transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </motion.button>
                                        </div>

                                        {/* Password Strength Meter */}
                                        {formData.password && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="space-y-2"
                                            >
                                                {/* Strength Bar */}
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full rounded-full"
                                                            style={{ backgroundColor: passwordStrength.color }}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-bold" style={{ color: passwordStrength.color }}>
                                                        {passwordStrength.label}
                                                    </span>
                                                </div>

                                                {/* Requirements Checklist */}
                                                <div className="grid grid-cols-2 gap-2">
                                                    {passwordRequirements.map((req) => {
                                                        const isMet = req.test(formData.password);
                                                        return (
                                                            <div key={req.id} className="flex items-center gap-2">
                                                                <motion.div
                                                                    className={`w-4 h-4 rounded-full flex items-center justify-center ${isMet ? 'bg-[#00FF94]' : 'bg-white/10'}`}
                                                                    animate={{ scale: isMet ? [1, 1.2, 1] : 1 }}
                                                                    transition={{ duration: 0.3 }}
                                                                >
                                                                    {isMet ? <Check className="w-3 h-3 text-black" /> : <X className="w-3 h-3 text-gray-600" />}
                                                                </motion.div>
                                                                <span className={`text-xs ${isMet ? 'text-[#00FF94]' : 'text-gray-600'}`}>
                                                                    {req.label}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                                            <Lock className="w-3 h-3" />
                                            Confirmar Senha
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="confirm_password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,255,148,0.1)] outline-none transition-all placeholder:text-gray-600 hover:border-white/20 backdrop-blur-sm"
                                                placeholder="••••••••"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <motion.button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00FF94] transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </motion.button>
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
                                            <div className="w-5 h-5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-[#00FF94] peer-checked:border-[#00FF94] transition-all flex items-center justify-center group-hover:border-[#00FF94]/50">
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
                                        data-testid="register-submit"
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
