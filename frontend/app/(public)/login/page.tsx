'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isFormValid, setIsFormValid] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFormData = { ...formData, [e.target.name]: e.target.value };
        setFormData(newFormData);

        // Check if form is valid for button pulsation
        setIsFormValid(
            newFormData.email.length > 0 &&
            newFormData.password.length > 0
        );
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
        });
    };

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsNavigating(true);
        setTimeout(() => router.push('/register'), 800);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const res = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.detail || "Credenciais inválidas.");

            if (data.requires_2fa) {
                localStorage.setItem("algor_temp_token", data.access_token);
                router.push("/2fa?flow=login");
                return;
            }

            localStorage.setItem("algor_token", data.access_token);
            localStorage.setItem("algor_user", JSON.stringify({ role: data.role, name: data.username }));
            document.cookie = `access_token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;

            const urlParams = new URLSearchParams(window.location.search);
            const redirectParam = urlParams.get('redirect');
            const targetUrl = redirectParam || (data.role === "admin" ? "/dashboard/admin" : data.role === "subscriber" ? "/onboarding" : "/dashboard");

            router.push(targetUrl);
            router.refresh();

        } catch (error: any) {
            setErrorMessage(error.message || "Erro ao conectar com o servidor.");
            setIsLoading(false);
        }
    };

    return (
        <main
            className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050810] text-gray-100 font-sans relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >

            {/* 1. NEURAL MESH BACKGROUND - Rede de Conexões */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Grid Base */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

                {/* Neural Mesh - Reage ao mouse */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                        <radialGradient id="nodeGlow">
                            <stop offset="0%" stopColor="#00FF94" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#00FF94" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {[...Array(20)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx={`${(i * 5 + 10)}%`}
                            cy={`${(i * 3 + 20) % 100}%`}
                            r="2"
                            fill="url(#nodeGlow)"
                            animate={{
                                cx: `${(i * 5 + 10 + mousePosition.x * 10)}%`,
                                cy: `${((i * 3 + 20) % 100 + mousePosition.y * 10)}%`,
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </svg>

                {/* Nebulosa de Dados - Gradientes Animados */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        opacity: [0.15, 0.3, 0.15],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#00A3FF]/20 via-[#00A3FF]/10 to-transparent rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                        opacity: [0.15, 0.3, 0.15],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#00FF94]/20 via-[#00FF94]/10 to-transparent rounded-full blur-[120px]"
                />
            </div>

            {/* Top Bar */}
            <header className="absolute top-0 left-0 w-full p-8 z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all group-hover:border-[#00FF94]/30 relative overflow-hidden">
                        {/* Scanner Effect on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-white relative z-10" />
                    </div>
                </Link>
            </header>

            {/* Login Card - Carregamento em Cascata */}
            <motion.div
                className="w-full max-w-[440px] p-10 rounded-3xl bg-[#0A1A2F]/60 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {/* Top Border Flow */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF94]/50 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Logo Area - Glitch Effect */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        className="relative w-24 h-24 mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.3,
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* Dynamic LOGO Aura */}
                        <motion.div
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.15, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 bg-[#00FF94]/20 rounded-full blur-[30px]"
                        />

                        {/* Glitch Effect */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.1, delay: 0.5 }}
                            className="absolute inset-0 bg-[#00FF94]/30 rounded-full"
                        />

                        <div className="relative w-24 h-24 rounded-full border border-[#00FF94]/30 shadow-[0_0_20px_rgba(0,255,148,0.2)] overflow-hidden bg-black/40 backdrop-blur-sm">
                            <Image
                                src="/logo-algor.webp"
                                alt="Algor Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-3xl font-display text-white mb-2 text-center drop-shadow-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Bem-vindo
                    </motion.h1>
                    <motion.p
                        className="text-sm text-gray-400 text-center font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Acesse seu console de governança
                    </motion.p>
                </div>

                {/* Form - Cascata */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    data-testid="login-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    {/* Email Input - Ativação Neon */}
                    <div className="group relative">
                        {/* Neon Glow on Focus */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#00FF94]/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl -z-10 blur-xl"
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            data-testid="email-input"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="peer w-full h-[56px] px-4 pt-6 bg-[#050810]/50 text-white border border-white/10 rounded-xl placeholder-transparent focus:outline-none focus:border-[#00FF94] focus:ring-0 focus:shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all font-mono shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                            placeholder="Email"
                        />
                        <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#00FF94] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500 pointer-events-none uppercase tracking-wider font-bold">
                            Email corporativo
                        </label>
                    </div>

                    {/* Password Input - Ativação Neon + Ícone Interativo */}
                    <div className="space-y-2">
                        <div className="group relative">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#00A3FF]/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl -z-10 blur-xl"
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                data-testid="password-input"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="peer w-full h-[56px] px-4 pt-6 bg-[#050810]/50 text-white border border-white/10 rounded-xl placeholder-transparent focus:outline-none focus:border-[#00A3FF] focus:ring-0 focus:shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all font-mono shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] pr-12"
                                placeholder="Senha"
                            />
                            {/* Ícone de Olho Interativo */}
                            <motion.button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{
                                        rotateY: showPassword ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </motion.div>
                            </motion.button>
                            <label className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#00A3FF] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500 pointer-events-none uppercase tracking-wider font-bold">
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

                    {/* Botão - Scanner Effect + Pulsação de Prontidão */}
                    <div className="pt-2">
                        <motion.button
                            type="submit"
                            data-testid="login-submit"
                            disabled={isLoading}
                            className="relative w-full h-[56px] rounded-xl overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            animate={isFormValid && !isLoading ? {
                                boxShadow: [
                                    '0 0 20px rgba(0,255,148,0.2)',
                                    '0 0 30px rgba(0,255,148,0.4)',
                                    '0 0 20px rgba(0,255,148,0.2)',
                                ]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF94] to-[#00A3FF] transition-all duration-300 group-hover:brightness-110" />

                            {/* Scanner Effect on Hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />

                            {/* Pulsação de Prontidão */}
                            {isFormValid && !isLoading && (
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    animate={{ opacity: [0, 0.3, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}

                            {/* Loading State - Data Flow */}
                            {isLoading && (
                                <motion.div
                                    className="absolute inset-0 bg-white/40"
                                    animate={{
                                        backgroundPosition: ['0% 0%', '100% 100%'],
                                    }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    style={{
                                        backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.3) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.3) 75%)',
                                        backgroundSize: '20px 20px',
                                    }}
                                />
                            )}

                            <div className="relative flex items-center justify-center gap-2 h-full text-[#050810] font-bold uppercase tracking-widest text-sm z-10">
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
                </motion.form>

                {/* Footer - Cascata */}
                <motion.div
                    className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <p className="text-sm text-gray-500">Ainda não possui credenciais?</p>
                    <button onClick={handleRegisterClick} className="inline-flex items-center gap-2 text-sm text-[#00FF94] hover:text-white transition-colors font-mono font-medium group">
                        Solicitar conta Enterprise <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Compliance Badges */}
                    <div className="flex gap-4 mt-4 bg-black/20 p-2 rounded-full border border-white/5">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider font-mono px-2">
                            <ShieldCheck className="w-3 h-3 text-[#00FF94]" />
                            ISO 42001
                        </div>
                        <div className="w-[1px] h-4 bg-white/10" />
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider font-mono px-2">
                            <Cpu className="w-3 h-3 text-[#00A3FF]" />
                            AI ENGINE
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* DIAGONAL TRANSITION OVERLAY - Fluxo de Dados */}
            <AnimatePresence>
                {isNavigating && (
                    <motion.div
                        initial={{ clipPath: "polygon(0 0, 100% 0, 0 0, 0 100%)" }}
                        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-50 bg-[#00FF94] flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            className="text-[#050810] text-6xl font-black font-orbitron tracking-tighter"
                            animate={{
                                opacity: [0, 1, 1, 0],
                                scale: [0.8, 1, 1, 1.2],
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            ALGOR BRASIL
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Keyframes */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </main>
    );
}
