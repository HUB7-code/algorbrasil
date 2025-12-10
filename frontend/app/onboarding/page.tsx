
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Building2, UserCircle2, ArrowRight, CheckCircle2 } from 'lucide-react';
import CorporateOnboardingForm from '@/components/onboarding/CorporateOnboardingForm';
import ProfessionalOnboardingForm from '@/components/onboarding/ProfessionalOnboardingForm';

export default function OnboardingPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<'corporate' | 'professional' | null>(null);
    const [completed, setCompleted] = useState(false);

    // Se completou, mostra tela de sucesso
    if (completed) {
        return (
            <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center p-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-2xl text-center max-w-lg w-full shadow-[0_0_50px_rgba(0,255,148,0.1)] animate-fadeIn">
                    <div className="w-20 h-20 bg-[#00FF94]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-[#00FF94]" />
                    </div>
                    <h2 className="text-3xl font-serif text-white mb-4">Onboarding Concluído!</h2>
                    <p className="text-gray-400 mb-8">
                        Seu perfil foi configurado com sucesso e seus dados estão protegidos em nossa Fortaleza Digital.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="px-8 py-3 bg-[#00FF94] text-[#0A1A2F] font-bold rounded-full hover:bg-[#00CC76] transition-colors"
                    >
                        Acessar Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // Se selecionou um role, mostra o formulário específico
    if (selectedRole) {
        return (
            <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center py-10 px-4">
                <div className="w-full max-w-2xl bg-[#050d18]/80 backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl overflow-hidden animate-slideUp">

                    {/* Header com botão de voltar */}
                    <div className={`p-8 border-b border-white/5 ${selectedRole === 'corporate' ? 'bg-[#00A3FF]/5' : 'bg-[#00FF94]/5'}`}>
                        <button
                            onClick={() => setSelectedRole(null)}
                            className="text-sm text-gray-500 hover:text-white mb-4 flex items-center transition-colors"
                        >
                            ← Voltar para seleção
                        </button>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${selectedRole === 'corporate' ? 'bg-[#00A3FF]/20 text-[#00A3FF]' : 'bg-[#00FF94]/20 text-[#00FF94]'}`}>
                                {selectedRole === 'corporate' ? <Building2 size={32} /> : <UserCircle2 size={32} />}
                            </div>
                            <div>
                                <h1 className="text-2xl font-serif text-white">
                                    {selectedRole === 'corporate' ? 'Perfil Corporativo' : 'Perfil do Auditor'}
                                </h1>
                                <p className="text-gray-400 text-sm">
                                    {selectedRole === 'corporate' ? 'Para empresas buscando blindagem e governança.' : 'Para especialistas buscando certificação e projetos.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Conteúdo do Formulário */}
                    <div className="p-8">
                        {selectedRole === 'corporate' ? (
                            <CorporateOnboardingForm onSuccess={() => setCompleted(true)} />
                        ) : (
                            <ProfessionalOnboardingForm onSuccess={() => setCompleted(true)} />
                        )}
                    </div>

                </div>
            </div>
        );
    }

    // TELA INICIAL: Seleção (Dual Funnel)
    return (
        <div className="min-h-screen bg-[#0A1A2F] text-white flex flex-col justify-center items-center p-6 selection:bg-[#00FF94] selection:text-[#0A1A2F]">

            <div className="text-center mb-12 animate-fadeIn">
                <h1 className="text-4xl md:text-5xl font-serif mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
                    Bem-vindo ao Ecossistema ALGOR
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Para personalizar sua experiência e garantir conformidade, precisamos saber como você deseja atuar.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">

                {/* Card Corporativo */}
                <div
                    onClick={() => setSelectedRole('corporate')}
                    className="group relative bg-[#050d18]/60 border border-white/5 rounded-2xl p-8 cursor-pointer hover:border-[#00A3FF] hover:shadow-[0_0_30px_rgba(0,163,255,0.15)] transition-all duration-300 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-[#00A3FF]/10 rounded-2xl flex items-center justify-center mb-6 text-[#00A3FF] group-hover:scale-110 transition-transform duration-300">
                            <Building2 size={32} />
                        </div>
                        <h2 className="text-2xl font-serif mb-3 group-hover:text-[#00A3FF] transition-colors">Para Empresas</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Busco diagnósticos, blindagem jurídica e ferramentas de governança para minha organização.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-500 mb-8">
                            <li className="flex items-center gap-2">✓ Radar de Risco IA</li>
                            <li className="flex items-center gap-2">✓ Conformidade Setorial</li>
                            <li className="flex items-center gap-2">✓ Acesso a Auditores</li>
                        </ul>
                        <span className="inline-flex items-center text-[#00A3FF] font-medium group-hover:translate-x-2 transition-transform">
                            Iniciar Onboarding B2B <ArrowRight size={16} className="ml-2" />
                        </span>
                    </div>
                </div>

                {/* Card Profissional */}
                <div
                    onClick={() => setSelectedRole('professional')}
                    className="group relative bg-[#050d18]/60 border border-white/5 rounded-2xl p-8 cursor-pointer hover:border-[#00FF94] hover:shadow-[0_0_30px_rgba(0,255,148,0.15)] transition-all duration-300 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FF94]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-[#00FF94]/10 rounded-2xl flex items-center justify-center mb-6 text-[#00FF94] group-hover:scale-110 transition-transform duration-300">
                            <UserCircle2 size={32} />
                        </div>
                        <h2 className="text-2xl font-serif mb-3 group-hover:text-[#00FF94] transition-colors">Para Profissionais</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Sou advogado, engenheiro ou consultor e busco certificação, ferramentas e network.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-500 mb-8">
                            <li className="flex items-center gap-2">✓ Manual do Auditor</li>
                            <li className="flex items-center gap-2">✓ Certificação 42001</li>
                            <li className="flex items-center gap-2">✓ Oportunidades de Projeto</li>
                        </ul>
                        <span className="inline-flex items-center text-[#00FF94] font-medium group-hover:translate-x-2 transition-transform">
                            Iniciar Onboarding Expert <ArrowRight size={16} className="ml-2" />
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
