"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CorporateOnboardingForm from "@/components/onboarding/CorporateOnboardingForm";
import ProfessionalOnboardingForm from "@/components/onboarding/ProfessionalOnboardingForm";
import { Building2, UserCircle2, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Briefcase, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// POWER BI PREMIUM DARK MODE - ONBOARDING PAGE v16.5.0
// ============================================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function OnboardingPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<"corporate" | "professional" | null>(null);
    const [completed, setCompleted] = useState(false);

    // =========================================================
    // STATE: SUCCESS (COMPLETED)
    // =========================================================
    if (completed) {
        return (
            <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#050810] text-gray-100 relative overflow-hidden">
                {/* Ambient Lighting */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#00FF94]/10 rounded-full blur-[180px] animate-pulse" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[150px]" />
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative z-10 flex flex-col items-center text-center max-w-md p-12 rounded-3xl 
                        bg-gradient-to-br from-[#0A1A2F]/80 to-[#050810]/80 
                        border border-[#00FF94]/30 backdrop-blur-2xl 
                        shadow-[0_0_80px_rgba(0,255,148,0.15),_inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                    {/* Success Icon with Glow */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="w-28 h-28 rounded-full bg-gradient-to-br from-[#00FF94]/20 to-[#00FF94]/5 
                            border border-[#00FF94]/40 flex items-center justify-center mb-10
                            shadow-[0_0_40px_rgba(0,255,148,0.3)]"
                    >
                        <CheckCircle2 className="w-14 h-14 text-[#00FF94]" />
                    </motion.div>

                    <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        Tudo Pronto!
                    </h2>
                    <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                        Sua conta foi configurada com sucesso. Você já pode acessar o ambiente seguro.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,255,148,0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push("/dashboard")}
                        className="w-full py-5 rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00CC76] 
                            text-[#050810] font-bold uppercase tracking-widest text-lg
                            shadow-[0_10px_40px_rgba(0,255,148,0.25)] transition-all"
                    >
                        Acessar Dashboard
                    </motion.button>

                    <div className="mt-8 flex items-center gap-3 text-xs text-gray-500 uppercase tracking-[0.2em]">
                        <div className="w-2 h-2 bg-[#00FF94] rounded-full animate-pulse shadow-[0_0_10px_#00FF94]" />
                        Ambiente Criptografado
                    </div>
                </motion.div>
            </main>
        );
    }

    // =========================================================
    // STATE: FORM FILLING (SELECTED ROLE)
    // =========================================================
    if (selectedRole) {
        const isCorporate = selectedRole === 'corporate';
        const accentColor = isCorporate ? '#00FF94' : '#00A3FF';

        return (
            <main className="min-h-screen w-full bg-[#050810] text-gray-100 flex flex-col items-center py-12 px-4 relative overflow-hidden">
                {/* Dynamic Ambient Lighting */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{
                            x: isCorporate ? 0 : 100,
                            opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className={`absolute top-[-10%] right-[-10%] w-[900px] h-[900px] rounded-full blur-[200px] 
                            ${isCorporate ? 'bg-[#00FF94]' : 'bg-[#00A3FF]'}`}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 80 }}
                    className="w-full max-w-3xl relative z-10"
                >
                    {/* Back Button */}
                    <motion.button
                        whileHover={{ x: -5 }}
                        onClick={() => setSelectedRole(null)}
                        className="group flex items-center gap-3 text-gray-400 hover:text-white mb-10 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center 
                            group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">Voltar para seleção</span>
                    </motion.button>

                    {/* Form Card */}
                    <div
                        className="rounded-3xl overflow-hidden backdrop-blur-2xl 
                            border bg-gradient-to-br from-[#0A1A2F]/70 to-[#050810]/70
                            shadow-[0_0_60px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.05)]"
                        style={{ borderColor: `${accentColor}30` }}
                    >
                        {/* Header */}
                        <div
                            className="p-8 border-b border-white/5"
                            style={{ background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)` }}
                        >
                            <div className="flex items-center gap-6">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{
                                        background: `${accentColor}15`,
                                        boxShadow: `0 0 30px ${accentColor}20`
                                    }}
                                >
                                    {isCorporate ? (
                                        <Building2 className="w-8 h-8" style={{ color: accentColor }} />
                                    ) : (
                                        <UserCircle2 className="w-8 h-8" style={{ color: accentColor }} />
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        {isCorporate ? 'Perfil Corporativo' : 'Perfil Profissional'}
                                    </h1>
                                    <p className="text-gray-400">
                                        {isCorporate
                                            ? 'Configure sua organização para auditoria ISO 42001.'
                                            : 'Complete seu perfil de auditor especializado.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="p-8 md:p-10">
                            {isCorporate ? (
                                <CorporateOnboardingForm onSuccess={() => setCompleted(true)} />
                            ) : (
                                <ProfessionalOnboardingForm onSuccess={() => setCompleted(true)} />
                            )}
                        </div>
                    </div>
                </motion.div>
            </main>
        );
    }

    // =========================================================
    // STATE: SELECTION SCREEN (MAIN)
    // =========================================================
    return (
        <main className="min-h-screen w-full bg-[#050810] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Lighting Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#00A3FF]/8 rounded-full blur-[180px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#00FF94]/8 rounded-full blur-[150px]" />
                <div className="absolute top-[40%] left-[50%] w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center mb-16 relative z-10"
            >
                {/* LED Status */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                >
                    <div className="w-2 h-2 bg-[#00FF94] rounded-full animate-pulse shadow-[0_0_10px_#00FF94]" />
                    <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">Secure Onboarding</span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                    Escolha seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">Perfil</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed"
                >
                    Selecione como você atuará na plataforma para personalizarmos sua experiência.
                </motion.p>
            </motion.div>

            {/* Cards Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-8 w-full max-w-5xl relative z-10"
            >
                {/* Corporate Card */}
                <motion.div variants={itemVariants}>
                    <RoleCard
                        icon={<Building2 className="w-9 h-9" />}
                        title="Empresa"
                        subtitle="Para organizações que desenvolvem ou utilizam IA."
                        features={['Auditoria de Modelos', 'Monitoramento e Risco', 'Compliance ISO 42001']}
                        onClick={() => setSelectedRole('corporate')}
                        theme="green"
                    />
                </motion.div>

                {/* Professional Card */}
                <motion.div variants={itemVariants}>
                    <RoleCard
                        icon={<Briefcase className="w-9 h-9" />}
                        title="Profissional"
                        subtitle="Para auditores, consultores e DPOs."
                        features={['Ferramentas de Auditoria', 'Certificação Profissional', 'Gestão de Clientes']}
                        onClick={() => setSelectedRole('professional')}
                        theme="blue"
                    />
                </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 text-center flex items-center gap-3 text-xs text-gray-600 uppercase tracking-[0.2em]"
            >
                <ShieldCheck className="w-4 h-4" />
                Secure Environment
            </motion.footer>
        </main>
    );
}

// ============================================================
// ROLE CARD COMPONENT - PREMIUM GLASS DESIGN
// ============================================================
function RoleCard({ icon, title, subtitle, features, onClick, theme }: any) {
    const isGreen = theme === 'green';
    const accentColor = isGreen ? '#00FF94' : '#00A3FF';

    return (
        <motion.button
            onClick={onClick}
            whileHover={{
                y: -8,
                boxShadow: `0 30px 60px ${accentColor}15, 0 0 0 1px ${accentColor}40`
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex flex-col text-left p-10 rounded-[32px] w-full
                bg-gradient-to-br from-[#0A1A2F]/60 to-[#050810]/60 
                border border-white/[0.08] backdrop-blur-xl
                transition-all duration-500 ease-out overflow-hidden
                hover:border-opacity-40"
            style={{
                ['--accent' as any]: accentColor,
            }}
        >
            {/* Hover Gradient Overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at top right, ${accentColor}08 0%, transparent 60%)`
                }}
            />

            {/* Floating Glow on Hover */}
            <div
                className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full blur-[80px] 
                    opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                style={{ background: accentColor }}
            />

            {/* Icon Container */}
            <div
                className="relative w-18 h-18 rounded-2xl flex items-center justify-center mb-8 
                    transition-all duration-500 group-hover:scale-110"
                style={{
                    background: `${accentColor}10`,
                    color: accentColor,
                    boxShadow: `0 0 0 1px ${accentColor}20`
                }}
            >
                <div className="p-4">
                    {icon}
                </div>
            </div>

            {/* Content */}
            <h2
                className="text-3xl font-bold text-white mb-3 relative z-10"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
                {title}
            </h2>

            <p className="text-gray-400 group-hover:text-gray-300 mb-10 min-h-[50px] leading-relaxed transition-colors relative z-10">
                {subtitle}
            </p>

            {/* Features List */}
            <div className="mt-auto pt-8 border-t border-white/[0.06] w-full relative z-10">
                <ul className="space-y-4 mb-8">
                    {features.map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
                            {f}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div
                    className="text-sm font-bold uppercase tracking-widest flex items-center gap-3 
                        transition-all duration-300 group-hover:translate-x-2"
                    style={{ color: accentColor }}
                >
                    <Sparkles className="w-4 h-4" />
                    Selecionar
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </motion.button>
    );
}
