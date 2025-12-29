'use client';

import React, { useState } from 'react';
import { Building2, Globe, Database, ChevronDown, Rocket, Users } from 'lucide-react';
import LegalTooltip from '@/components/ui/LegalTooltip';
import ConsentCheckbox from '@/components/ui/ConsentCheckbox';
import { motion } from 'framer-motion';

// ============================================================
// POWER BI PREMIUM DARK MODE - CORPORATE ONBOARDING FORM
// ============================================================

const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

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

        const token = localStorage.getItem("algor_token");

        if (!token) {
            setLoading(false);
            alert("⚠️ Sessão expirada ou inválida. Você será redirecionado para o login.");
            setTimeout(() => {
                window.location.href = "/login?redirect=/onboarding";
            }, 1500);
            return;
        }

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
                throw new Error(data.detail || "Erro ao criar perfil corporativo.");
            }

            const user = JSON.parse(localStorage.getItem("algor_user") || "{}");
            user.role = "corporate_lead";
            localStorage.setItem("algor_user", JSON.stringify(user));

            onSuccess();

        } catch (error: any) {
            console.error("❌ Onboarding Error:", error);
            alert(`Erro: ${error.message || "Erro desconhecido. Verifique o console."}`);
        } finally {
            setLoading(false);
        }
    };

    // Premium Input Style
    const inputStyle = `
        w-full h-14 bg-gradient-to-br from-[#0A1A2F]/80 to-[#050810]/80 
        border border-white/[0.08] rounded-xl px-4 text-white 
        placeholder-gray-500 
        focus:ring-2 focus:ring-[#00FF94]/40 focus:border-[#00FF94]/60 
        hover:border-white/20
        outline-none transition-all duration-300 font-medium
        backdrop-blur-sm
        shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]
    `;

    const labelStyle = `
        flex items-center gap-2 text-xs font-bold text-gray-400 
        uppercase tracking-[0.15em] mb-3 
        group-focus-within:text-[#00FF94] transition-colors duration-300
    `;

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
            <div className="space-y-6">
                {/* Company Name */}
                <motion.div variants={inputVariants} className="group">
                    <label className={labelStyle}>
                        <Building2 className="w-4 h-4 text-[#00FF94]" />
                        Nome da Empresa
                        <LegalTooltip content="Identificação da pessoa jurídica para fins contratuais e de faturamento." />
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            required
                            className={`${inputStyle} pl-12`}
                            placeholder="Ex: Tech Solutions Ltda"
                            value={formData.company_name}
                            onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                        />
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF94] transition-colors pointer-events-none" />
                    </div>
                </motion.div>

                {/* Sector */}
                <motion.div variants={inputVariants} className="group">
                    <label className={labelStyle}>
                        <Database className="w-4 h-4 text-[#00FF94]" />
                        Setor de Atuação
                        <LegalTooltip content="Para benchmarking e análise de riscos setoriais específicos." />
                    </label>
                    <div className="relative">
                        <select
                            required
                            className={`${inputStyle} pl-12 pr-12 appearance-none cursor-pointer`}
                            value={formData.sector}
                            onChange={e => setFormData({ ...formData, sector: e.target.value })}
                        >
                            <option value="" disabled className="bg-[#0A1A2F] text-gray-500">Selecione um setor...</option>
                            <option value="Tecnologia" className="bg-[#0A1A2F] text-white">Tecnologia</option>
                            <option value="Financeiro" className="bg-[#0A1A2F] text-white">Financeiro</option>
                            <option value="Saúde" className="bg-[#0A1A2F] text-white">Saúde</option>
                            <option value="Varejo" className="bg-[#0A1A2F] text-white">Varejo</option>
                            <option value="Indústria" className="bg-[#0A1A2F] text-white">Indústria</option>
                            <option value="Serviços" className="bg-[#0A1A2F] text-white">Serviços</option>
                        </select>
                        <Database className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF94] transition-colors pointer-events-none" />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                </motion.div>

                {/* Size Range */}
                <motion.div variants={inputVariants} className="group">
                    <label className={labelStyle}>
                        <Users className="w-4 h-4 text-[#00FF94]" />
                        Tamanho da Empresa
                        <LegalTooltip content="Para dimensionar o plano de governança adequado." />
                    </label>
                    <div className="relative">
                        <select
                            required
                            className={`${inputStyle} pl-12 pr-12 appearance-none cursor-pointer`}
                            value={formData.size_range}
                            onChange={e => setFormData({ ...formData, size_range: e.target.value })}
                        >
                            <option value="" disabled className="bg-[#0A1A2F] text-gray-500">Número de colaboradores...</option>
                            <option value="1-50" className="bg-[#0A1A2F] text-white">1-50 (Pequena)</option>
                            <option value="51-200" className="bg-[#0A1A2F] text-white">51-200 (Média)</option>
                            <option value="201-1000" className="bg-[#0A1A2F] text-white">201-1000 (Grande)</option>
                            <option value="1000+" className="bg-[#0A1A2F] text-white">1000+ (Enterprise)</option>
                        </select>
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF94] transition-colors pointer-events-none" />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                </motion.div>

                {/* Website */}
                <motion.div variants={inputVariants} className="group">
                    <label className={labelStyle}>
                        <Globe className="w-4 h-4 text-[#00FF94]" />
                        Website Corporativo
                        <LegalTooltip content="Utilizado para verificação de domínio e reputação digital." />
                    </label>
                    <div className="relative">
                        <input
                            type="url"
                            className={`${inputStyle} pl-12`}
                            placeholder="https://suaempresa.com.br"
                            value={formData.website}
                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                        />
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF94] transition-colors pointer-events-none" />
                    </div>
                </motion.div>
            </div>

            {/* Consent Section */}
            <motion.div
                variants={inputVariants}
                className="pt-8 border-t border-white/[0.06]"
            >
                <ConsentCheckbox
                    id="corp-consent"
                    checked={consent}
                    onChange={setConsent}
                    required
                    label="Declaro que estou autorizado a representar esta empresa e aceito a Política de Privacidade B2B."
                />
            </motion.div>

            {/* Submit Button - Premium Green Gradient */}
            <motion.button
                variants={inputVariants}
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01, boxShadow: "0 0 50px rgba(0,255,148,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 bg-gradient-to-r from-[#00FF94] via-[#00DD80] to-[#00CC76] 
                    text-[#050810] font-bold uppercase tracking-[0.2em] text-sm rounded-xl 
                    shadow-[0_10px_40px_rgba(0,255,148,0.25),_inset_0_1px_0_rgba(255,255,255,0.2)] 
                    hover:shadow-[0_20px_60px_rgba(0,255,148,0.35)] 
                    active:scale-[0.98] transition-all duration-300 
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    flex justify-center items-center gap-4
                    relative overflow-hidden group"
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                {loading ? (
                    <span className="w-6 h-6 border-2 border-[#050810]/30 border-t-[#050810] rounded-full animate-spin" />
                ) : (
                    <Rocket className="w-5 h-5" />
                )}
                <span className="relative z-10">
                    {loading ? 'Processando Blindagem...' : 'Acessar War Room'}
                </span>
            </motion.button>
        </motion.form>
    );
}
