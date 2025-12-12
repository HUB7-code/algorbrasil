"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CorporateOnboardingForm from "@/components/onboarding/CorporateOnboardingForm";
import ProfessionalOnboardingForm from "@/components/onboarding/ProfessionalOnboardingForm";

export default function OnboardingPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<"corporate" | "professional" | null>(null);
    const [completed, setCompleted] = useState(false);

    if (completed) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#131314] text-[#E3E3E3] animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full bg-[#0F5223] text-[#C4EED0] flex items-center justify-center mb-6">
                    <span className="material-symbols-rounded text-4xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-normal mb-2">Tudo pronto!</h2>
                <p className="text-[#C4C7C5] mb-8 text-center max-w-sm">
                    Sua conta foi configurada com sucesso.
                </p>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="h-12 px-8 rounded-full bg-[#A8C7FA] text-[#062E6F] font-medium hover:bg-[#D3E3FD] transition-colors"
                >
                    Acessar Dashboard
                </button>
            </div>
        );
    }

    // Role Specific Flow Wrapper
    if (selectedRole) {
        return (
            <main className="min-h-screen w-full bg-[#131314] flex flex-col items-center py-12 px-4 animate-in slide-in-from-right duration-500">
                <div className="w-full max-w-3xl">
                    <button
                        onClick={() => setSelectedRole(null)}
                        className="flex items-center gap-2 text-[#A8C7FA] text-sm font-medium hover:underline mb-8"
                    >
                        <span className="material-symbols-rounded text-lg">arrow_back</span>
                        Voltar para seleção
                    </button>

                    <div className="bg-[#1E1F20] border border-[#444746] rounded-[24px] overflow-hidden">
                        <div className="p-8 border-b border-[#444746] bg-[#004A77] text-white">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-rounded text-3xl opacity-80">
                                    {selectedRole === 'corporate' ? 'domain' : 'badge'}
                                </span>
                                <div>
                                    <h1 className="text-2xl font-normal">
                                        {selectedRole === 'corporate' ? 'Perfil Corporativo' : 'Perfil Profissional'}
                                    </h1>
                                    <p className="text-[#D3E3FD] text-sm mt-1">
                                        {selectedRole === 'corporate'
                                            ? 'Configure sua organização para auditoria ISO 42001.'
                                            : 'Complete seu perfil de auditor especializado.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            {selectedRole === 'corporate' ? (
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

    // Selection Screen
    return (
        <main className="min-h-screen w-full bg-[#131314] flex flex-col items-center justify-center p-6 text-[#E3E3E3] font-sans">

            <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-4xl md:text-5xl font-normal mb-4">Escolha seu Perfil</h1>
                <p className="text-[#C4C7C5] max-w-lg mx-auto">
                    Para personalizar sua experiência de governança, precisamos saber como você atuará na plataforma.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Corporate Card */}
                <RoleCard
                    icon="domain"
                    title="Empresa"
                    subtitle="Para organizações que desenvolvem ou utilizam IA."
                    features={['Auditoria de Modelos', 'Monitoramento de Risco', 'Compliance ISO 42001']}
                    onClick={() => setSelectedRole('corporate')}
                />

                {/* Professional Card */}
                <RoleCard
                    icon="badge"
                    title="Profissional"
                    subtitle="Para auditores, consultores e DPOs."
                    features={['Ferramentas de Auditoria', 'Certificação Profissional', 'Gestão de Clientes']}
                    onClick={() => setSelectedRole('professional')}
                />
            </div>
        </main>
    );
}

function RoleCard({ icon, title, subtitle, features, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="group relative flex flex-col text-left p-8 rounded-[24px] bg-[#1E1F20] border border-[#444746] hover:bg-[#004A77] hover:border-[#A8C7FA] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
        >
            <div className="w-16 h-16 rounded-full bg-[#444746] group-hover:bg-[#A8C7FA] flex items-center justify-center text-[#E3E3E3] group-hover:text-[#062E6F] mb-6 transition-colors">
                <span className="material-symbols-rounded text-3xl">{icon}</span>
            </div>

            <h2 className="text-2xl font-normal text-[#E3E3E3] mb-2">{title}</h2>
            <p className="text-[#C4C7C5] group-hover:text-[#D3E3FD] mb-8 min-h-[48px] text-sm leading-relaxed">{subtitle}</p>

            <div className="mt-auto pt-6 border-t border-[#444746] group-hover:border-[#A8C7FA]/30 w-full">
                <ul className="space-y-2 mb-6">
                    {features.map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[#C4C7C5] group-hover:text-[#E3E3E3]">
                            <span className="material-symbols-rounded text-lg text-[#8E918F] group-hover:text-[#A8C7FA]">check</span>
                            {f}
                        </li>
                    ))}
                </ul>
                <div className="text-[#A8C7FA] text-sm font-medium flex items-center gap-2 group-hover:text-white">
                    Selecionar
                    <span className="material-symbols-rounded text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
            </div>
        </button>
    )
}
