
'use client';

import React, { useState } from 'react';
import { UserCheck, Linkedin, Briefcase, MapPin } from 'lucide-react';
import LegalTooltip from '@/components/ui/LegalTooltip';
import ConsentCheckbox from '@/components/ui/ConsentCheckbox';

export default function ProfessionalOnboardingForm({ onSuccess }: { onSuccess: () => void }) {
    const [formData, setFormData] = useState({
        linkedin_url: '',
        primary_expertise: '',
        years_experience: 0,
        city: '',
        state: ''
    });
    const [consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent) return alert("O consentimento LGPD é obrigatório.");

        setLoading(true);
        const token = localStorage.getItem("algor_token");

        if (!token) {
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "/login";
            return;
        }

        try {
            const res = await fetch("/api/v1/profiles/professional", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Erro ao criar perfil profissional.");
            }

            // Update user role in storage if needed
            const user = JSON.parse(localStorage.getItem("algor_user") || "{}");
            user.role = "professional_candidate";
            localStorage.setItem("algor_user", JSON.stringify(user));

            onSuccess();

        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
            <div className="space-y-4">
                {/* LinkedIn */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        LinkedIn Profile URL
                        <LegalTooltip content="Utilizado para validar seu histórico profissional e conexões no mercado." />
                    </label>
                    <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="url"
                            required
                            className="w-full bg-[#050d18]/50 border border-gray-700 rounded-lg py-3 pl-10 px-4 text-white focus:ring-2 focus:ring-[#00FF94] focus:border-transparent outline-none transition-all"
                            placeholder="https://linkedin.com/in/seu-perfil"
                            value={formData.linkedin_url}
                            onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                        />
                    </div>
                </div>

                {/* Expertise */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Área de Expertise Primária
                        <LegalTooltip content="Para direcionar oportunidades de auditoria compatíveis." />
                    </label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <select
                            required
                            className="w-full bg-[#050d18]/50 border border-gray-700 rounded-lg py-3 pl-10 px-4 text-white focus:ring-2 focus:ring-[#00FF94] outline-none appearance-none"
                            value={formData.primary_expertise}
                            onChange={e => setFormData({ ...formData, primary_expertise: e.target.value })}
                        >
                            <option value="" disabled>Selecione sua área...</option>
                            <option value="Jurídica">Jurídica / Compliance</option>
                            <option value="Técnica">Técnica / Engenharia de Dados</option>
                            <option value="Ética">Ética / Sociologia</option>
                            <option value="Geral">Consultoria Geral</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Years Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Anos de Experiência
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="50"
                            required
                            className="w-full bg-[#050d18]/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-[#00FF94] outline-none"
                            value={formData.years_experience}
                            onChange={e => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                        />
                    </div>

                    {/* Location (Simplified for now) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            UF
                            <LegalTooltip content="Para matching geográfico de projetos presenciais." />
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                maxLength={2}
                                required
                                placeholder="SP"
                                className="w-full bg-[#050d18]/50 border border-gray-700 rounded-lg py-3 pl-9 px-4 text-white focus:ring-2 focus:ring-[#00FF94] outline-none uppercase"
                                value={formData.state}
                                onChange={e => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="pt-4 border-t border-gray-800">
                <ConsentCheckbox
                    id="prof-consent"
                    checked={consent}
                    onChange={setConsent}
                    required
                    label="Autorizo o processamento do meu perfil profissional e aceito a Política para Membros."
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00FF94] to-[#00CC76] hover:from-[#00DD83] hover:to-[#00BB65] text-[#0A1A2F] font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {loading ? (
                    <span className="w-5 h-5 border-2 border-[#0A1A2F]/30 border-t-[#0A1A2F] rounded-full animate-spin mr-2" />
                ) : (
                    <UserCheck className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Processando Cadastro...' : 'Enviar Solicitação de Associação'}
            </button>
        </form>
    );
}
