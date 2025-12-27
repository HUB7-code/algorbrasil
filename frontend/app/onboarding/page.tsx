"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CorporateOnboardingForm from "@/components/onboarding/CorporateOnboardingForm";
import ProfessionalOnboardingForm from "@/components/onboarding/ProfessionalOnboardingForm";
import { Building2, UserCircle2, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function OnboardingPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<"corporate" | "professional" | null>(null);
    const [completed, setCompleted] = useState(false);

    // =========================================================
    // STATE: SUCCESS (COMPLETED)
    // =========================================================
    if (completed) {
        return (
            <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#050810] text-gray-100 font-sans relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00FF94]/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00A3FF]/10 rounded-full blur-[100px]" />
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 flex flex-col items-center text-center max-w-md p-10 rounded-3xl bg-[#0A1A2F]/60 border border-[#00FF94]/30 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,148,0.15)]"
                >
                    <div className="w-24 h-24 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,255,148,0.2)]">
                        <CheckCircle2 className="w-10 h-10 text-[#00FF94]" />
                    </div>

                    <h2 className="text-3xl font-serif text-white mb-3">Tudo pronto!</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Sua conta foi configurada com sucesso. Você já pode acessar o ambiente seguro.
                    </p>

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00CC76] text-[#050810] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-green-900/20"
                    >
                        Acessar War Room
                    </button>

                    <div className="mt-6 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" />
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
        const accentColor = isCorporate ? 'text-[#00FF94]' : 'text-[#00A3FF]';
        const borderColor = isCorporate ? 'border-[#00FF94]/30' : 'border-[#00A3FF]/30';
        const bgGlow = isCorporate ? 'bg-[#00FF94]/5' : 'bg-[#00A3FF]/5';

        return (
            <main className="min-h-screen w-full bg-[#050810] text-gray-100 font-sans flex flex-col items-center py-12 px-4 relative overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] transition-colors duration-1000 ${isCorporate ? 'bg-[#00FF94]/5' : 'bg-[#00A3FF]/5'}`} />
                </div>

                <div className="w-full max-w-3xl relative z-10 animate-in slide-in-from-right duration-500 fade-in">
                    <button
                        onClick={() => setSelectedRole(null)}
                        className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">Voltar para seleção</span>
                    </button>

                    <div className={`rounded-3xl overflow-hidden backdrop-blur-xl border ${borderColor} bg-[#0A1A2F]/60 shadow-2xl`}>
                        {/* Header */}
                        <div className={`p-8 border-b border-white/5 ${bgGlow}`}>
                            <div className="flex items-center gap-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isCorporate ? 'bg-[#00FF94]/10 text-[#00FF94]' : 'bg-[#00A3FF]/10 text-[#00A3FF]'}`}>
                                    {isCorporate ? <Building2 className="w-7 h-7" /> : <UserCircle2 className="w-7 h-7" />}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-serif text-white mb-1">
                                        {isCorporate ? 'Perfil Corporativo' : 'Perfil Profissional'}
                                    </h1>
                                    <p className="text-gray-400 text-sm">
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
                </div>
            </main>
        );
    }

    // =========================================================
    // STATE: SELECTION SCREEN
    // =========================================================
    return (
        <main className="min-h-screen w-full bg-[#050810] text-gray-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[120px]" />
            </div>

            <div className="text-center mb-16 relative z-10 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-white tracking-tight">
                    Escolha seu Perfil
                </h1>
                <p className="text-gray-400 max-w-lg mx-auto font-light text-lg">
                    Selecione como você atuará na plataforma para personalizarmos sua experiência.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl relative z-10">
                {/* Corporate Card */}
                <RoleCard
                    icon={<Building2 className="w-8 h-8" />}
                    title="Empresa"
                    subtitle="Para organizações que desenvolvem ou utilizam IA."
                    features={['Auditoria de Modelos', 'Monitoramento e Risco', 'Compliance ISO 42001']}
                    onClick={() => setSelectedRole('corporate')}
                    theme="green"
                />

                {/* Professional Card */}
                <RoleCard
                    icon={<Briefcase className="w-8 h-8" />}
                    title="Profissional"
                    subtitle="Para auditores, consultores e DPOs."
                    features={['Ferramentas de Auditoria', 'Certificação Profissional', 'Gestão de Clientes']}
                    onClick={() => setSelectedRole('professional')}
                    theme="blue"
                />
            </div>

            <footer className="absolute bottom-8 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
                Secure Environment
            </footer>
        </main>
    );
}

function RoleCard({ icon, title, subtitle, features, onClick, theme }: any) {
    const isGreen = theme === 'green';
    const accentColor = isGreen ? 'text-[#00FF94]' : 'text-[#00A3FF]';
    const groupHoverBorder = isGreen ? 'group-hover:border-[#00FF94]/40' : 'group-hover:border-[#00A3FF]/40';
    const groupHoverShadow = isGreen ? 'group-hover:shadow-[0_0_40px_rgba(0,255,148,0.1)]' : 'group-hover:shadow-[0_0_40px_rgba(0,163,255,0.1)]';
    const checkColor = isGreen ? 'text-[#00FF94]' : 'text-[#00A3FF]';

    return (
        <button
            onClick={onClick}
            className={`group relative flex flex-col text-left p-10 rounded-[32px] 
                bg-[#0A1A2F]/40 border border-white/5 backdrop-blur-md
                transition-all duration-500 ease-out
                ${groupHoverBorder} ${groupHoverShadow} hover:-translate-y-2 hover:bg-[#0A1A2F]/60 overflow-hidden`}
        >
            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${isGreen ? 'from-[#00FF94] to-transparent' : 'from-[#00A3FF] to-transparent'}`} />

            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300
                bg-white/5 border border-white/5 group-hover:scale-110 ${accentColor} ${isGreen ? 'group-hover:bg-[#00FF94]/10' : 'group-hover:bg-[#00A3FF]/10'}`}>
                {icon}
            </div>

            <h2 className="text-3xl font-serif text-white mb-2">{title}</h2>
            <p className="text-gray-400 group-hover:text-gray-300 mb-10 min-h-[48px] text-sm leading-relaxed transition-colors">
                {subtitle}
            </p>

            <div className="mt-auto pt-8 border-t border-white/5 w-full">
                <ul className="space-y-3 mb-8">
                    {features.map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                            <CheckCircle2 className={`w-4 h-4 ${checkColor}`} />
                            {f}
                        </li>
                    ))}
                </ul>
                <div className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1 ${accentColor}`}>
                    Selecionar
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </button>
    )
}
