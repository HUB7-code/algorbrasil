
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

        // ✅ CRITICAL: Verify token exists BEFORE making request
        const token = localStorage.getItem("algor_token");

        if (!token) {
            setLoading(false);
            alert("⚠️ Sessão expirada ou inválida. Você será redirecionado para o login.");
            setTimeout(() => {
                window.location.href = "/login?redirect=/onboarding";
            }, 1500);
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

            // ✅ CRITICAL: Handle 401 Unauthorized (Invalid/Expired Token)
            if (res.status === 401) {
                setLoading(false);
                alert("🔒 Token inválido ou expirado. Faça login novamente.");
                localStorage.removeItem("algor_token");
                localStorage.removeItem("algor_user");
                setTimeout(() => {
                    window.location.href = "/login?redirect=/onboarding";
                }, 1500);
                return;
            }

            if (!res.ok) {
                if (Array.isArray(data.detail)) {
                    const errorMessages = data.detail.map((err: any) => `${err.loc.join('.')} - ${err.msg}`).join('\n');
                    throw new Error(errorMessages);
                }
                throw new Error(data.detail || "Erro ao criar perfil profissional.");
            }

            // ✅ SUCCESS: Update user role in storage
            const user = JSON.parse(localStorage.getItem("algor_user") || "{}");
            user.role = "professional_candidate";
            localStorage.setItem("algor_user", JSON.stringify(user));

            onSuccess();

        } catch (error: any) {
            console.error("❌ Professional Onboarding Error:", error);
            alert(`Erro: ${error.message || "Erro desconhecido. Verifique o console."}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="space-y-6">
                {/* LinkedIn */}
                <div className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#00A3FF] transition-colors">
                        LinkedIn Profile URL
                        <LegalTooltip content="Utilizado para validar seu histórico profissional e conexões no mercado." />
                    </label>
                    <div className="relative">
                        <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00A3FF] transition-colors" />
                        <input
                            type="url"
                            required
                            className="w-full h-12 bg-[#050810]/50 border border-white/10 rounded-xl pl-12 px-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-[#00A3FF]/50 focus:border-[#00A3FF] outline-none transition-all font-medium"
                            placeholder="https://linkedin.com/in/seu-perfil"
                            value={formData.linkedin_url}
                            onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                        />
                    </div>
                </div>

                {/* Expertise */}
                <div className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#00A3FF] transition-colors">
                        Área de Expertise Primária
                        <LegalTooltip content="Para direcionar oportunidades de auditoria compatíveis." />
                    </label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00A3FF] transition-colors" />
                        <select
                            required
                            className="w-full h-12 bg-[#050810]/50 border border-white/10 rounded-xl pl-12 px-4 text-white focus:ring-2 focus:ring-[#00A3FF]/50 focus:border-[#00A3FF] outline-none appearance-none transition-all font-medium cursor-pointer"
                            value={formData.primary_expertise}
                            onChange={e => setFormData({ ...formData, primary_expertise: e.target.value })}
                        >
                            <option value="" disabled className="bg-[#050810] text-gray-500">Selecione sua área...</option>
                            <option value="Jurídica" className="bg-[#050810]">Jurídica / Compliance</option>
                            <option value="Técnica" className="bg-[#050810]">Técnica / Engenharia de Dados</option>
                            <option value="Ética" className="bg-[#050810]">Ética / Sociologia</option>
                            <option value="Geral" className="bg-[#050810]">Consultoria Geral</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    {/* Years Experience */}
                    <div className="col-span-4 group">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#00A3FF] transition-colors">
                            Exp (Anos)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="50"
                            required
                            className="w-full h-12 bg-[#050810]/50 border border-white/10 rounded-xl px-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-[#00A3FF]/50 focus:border-[#00A3FF] outline-none transition-all font-medium text-center"
                            value={formData.years_experience}
                            onChange={e => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                        />
                    </div>

                    {/* City */}
                    <div className="col-span-5 group">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#00A3FF] transition-colors">
                            Cidade
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="São Paulo"
                            className="w-full h-12 bg-[#050810]/50 border border-white/10 rounded-xl px-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-[#00A3FF]/50 focus:border-[#00A3FF] outline-none transition-all font-medium"
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>

                    {/* UF */}
                    <div className="col-span-3 group">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#00A3FF] transition-colors">
                            UF
                        </label>
                        <input
                            type="text"
                            maxLength={2}
                            required
                            placeholder="SP"
                            className="w-full h-12 bg-[#050810]/50 border border-white/10 rounded-xl px-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-[#00A3FF]/50 focus:border-[#00A3FF] outline-none transition-all font-medium uppercase text-center"
                            value={formData.state}
                            onChange={e => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5">
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
                className="w-full h-14 bg-gradient-to-r from-[#00A3FF] to-[#0066FF] text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            >
                {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <UserCheck className="w-5 h-5" />
                )}
                {loading ? 'Processando Cadastro...' : 'Enviar Solicitação'}
            </button>
        </form>
    );
}
