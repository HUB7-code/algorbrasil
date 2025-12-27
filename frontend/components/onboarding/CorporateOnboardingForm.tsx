
'use client';

import React, { useState } from 'react';
import { Building2, Globe, Database } from 'lucide-react';
import LegalTooltip from '@/components/ui/LegalTooltip';
import ConsentCheckbox from '@/components/ui/ConsentCheckbox';

export default function CorporateOnboardingForm({ onSuccess }: { onSuccess: () => void }) {
    const [formData, setFormData] = useState({
        company_name: '',
        sector: '',
        size_range: '',
        website: ''
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

        // Sanitize Payload (Empty string is not valid URL)
        const payload = {
            ...formData,
            website: formData.website.trim() === '' ? null : formData.website
        };

        try {
            const res = await fetch("/api/v1/profiles/corporate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
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
                // Handle FastAPI/Pydantic validation errors (Array)
                if (Array.isArray(data.detail)) {
                    const errorMessages = data.detail.map((err: any) => `${err.loc.join('.')} - ${err.msg}`).join('\n');
                    throw new Error(errorMessages);
                }
                // Handle Generic HTTP Exception (String)
                throw new Error(data.detail || "Erro ao criar perfil corporativo.");
            }

            // ✅ SUCCESS: Update user role in storage
            const user = JSON.parse(localStorage.getItem("algor_user") || "{}");
            user.role = "corporate_lead";
            localStorage.setItem("algor_user", JSON.stringify(user));

            onSuccess(); // Trigger parent success flow

        } catch (error: any) {
            console.error("❌ Onboarding Error:", error);
            alert(`Erro: ${error.message || "Erro desconhecido. Verifique o console."}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="space-y-6">
                {/* Company Name */}
                <div className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#00FF94] transition-colors">
                        Nome da Empresa
                        <LegalTooltip content="Identificação da pessoa jurídica para fins contratuais e de faturamento." />
                    </label>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF94] transition-colors" />
                        <input
                            type="text"
                            required
                            className="w-full h-12 bg-[#050810]/50 border border-white/10 rounded-xl pl-12 px-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-[#00FF94]/50 focus:border-[#00FF94] outline-none transition-all font-medium"
                            placeholder="Ex: Tech Solutions Ltda"
                            value={formData.company_name}
                            onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                        />
                    </div>
                </div>

                {/* Sector */}
                <div className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#00FF94] transition-colors">
                        Setor de Atuação
                        <LegalTooltip content="Para benchmarking e análise de riscos setoriais específicos." />
                    </label>
                    <div className="relative">
                        <Database className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF94] transition-colors" />
                        <select
                            required
                            className="w-full h-12 bg-[#050810]/50 border border-white/10 rounded-xl pl-12 px-4 text-white focus:ring-2 focus:ring-[#00FF94]/50 focus:border-[#00FF94] outline-none appearance-none transition-all font-medium cursor-pointer"
                            value={formData.sector}
                            onChange={e => setFormData({ ...formData, sector: e.target.value })}
                        >
                            <option value="" disabled className="bg-[#050810] text-gray-500">Selecione um setor...</option>
                            <option value="Tecnologia" className="bg-[#050810]">Tecnologia</option>
                            <option value="Financeiro" className="bg-[#050810]">Financeiro</option>
                            <option value="Saúde" className="bg-[#050810]">Saúde</option>
                            <option value="Varejo" className="bg-[#050810]">Varejo</option>
                            <option value="Indústria" className="bg-[#050810]">Indústria</option>
                            <option value="Serviços" className="bg-[#050810]">Serviços</option>
                        </select>
                    </div>
                </div>

                {/* Size Range */}
                <div className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#00FF94] transition-colors">
                        Tamanho da Empresa
                        <LegalTooltip content="Para dimensionar o plano de governança adequado." />
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 flex items-center justify-center font-serif text-xs font-bold group-focus-within:text-[#00FF94] transition-colors">#</div>
                        <select
                            required
                            className="w-full h-12 bg-[#050810]/50 border border-white/10 rounded-xl pl-12 px-4 text-white focus:ring-2 focus:ring-[#00FF94]/50 focus:border-[#00FF94] outline-none appearance-none transition-all font-medium cursor-pointer"
                            value={formData.size_range}
                            onChange={e => setFormData({ ...formData, size_range: e.target.value })}
                        >
                            <option value="" disabled className="bg-[#050810] text-gray-500">Número de colaboradores...</option>
                            <option value="1-50" className="bg-[#050810]">1-50 (Pequena)</option>
                            <option value="51-200" className="bg-[#050810]">51-200 (Média)</option>
                            <option value="201-1000" className="bg-[#050810]">201-1000 (Grande)</option>
                            <option value="1000+" className="bg-[#050810]">1000+ (Enterprise)</option>
                        </select>
                    </div>
                </div>

                {/* Website */}
                <div className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#00FF94] transition-colors">
                        Website Corporativo
                        <LegalTooltip content="Utilizado para verificação de domínio e reputação digital." />
                    </label>
                    <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF94] transition-colors" />
                        <input
                            type="url"
                            className="w-full h-12 bg-[#050810]/50 border border-white/10 rounded-xl pl-12 px-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-[#00FF94]/50 focus:border-[#00FF94] outline-none transition-all font-medium"
                            placeholder="https://suaempresa.com.br"
                            value={formData.website}
                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5">
                <ConsentCheckbox
                    id="corp-consent"
                    checked={consent}
                    onChange={setConsent}
                    required
                    label="Declaro que estou autorizado a representar esta empresa e aceito a Política de Privacidade B2B."
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-[#00FF94] to-[#00CC76] text-[#050810] font-bold uppercase tracking-widest text-sm rounded-xl shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:shadow-[0_0_30px_rgba(0,255,148,0.5)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            >
                {loading ? (
                    <span className="w-5 h-5 border-2 border-[#050810]/30 border-t-[#050810] rounded-full animate-spin" />
                ) : (
                    <Database className="w-5 h-5" />
                )}
                {loading ? 'Processando Blindagem...' : 'Acessar War Room'}
            </button>
        </form>
    );
}
