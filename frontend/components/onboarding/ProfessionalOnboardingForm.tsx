'use client';

import React, { useState } from 'react';
import { UserCheck, Linkedin, Briefcase, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import LegalTooltip from '@/components/ui/LegalTooltip';
import ConsentCheckbox from '@/components/ui/ConsentCheckbox';
import { motion } from 'framer-motion';

// ============================================================
// POWER BI PREMIUM DARK MODE - PROFESSIONAL ONBOARDING FORM
// ============================================================

const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

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

    // Premium Input Style
    const inputStyle = `
        w-full h-14 bg-gradient-to-br from-[#0A1A2F]/80 to-[#050810]/80 
        border border-white/[0.08] rounded-xl px-4 text-white 
        placeholder-gray-500 
        focus:ring-2 focus:ring-[#00A3FF]/40 focus:border-[#00A3FF]/60 
        hover:border-white/20
        outline-none transition-all duration-300 font-medium
        backdrop-blur-sm
        shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]
    `;

    const labelStyle = `
        flex items-center gap-2 text-xs font-bold text-gray-400 
        uppercase tracking-[0.15em] mb-3 
        group-focus-within:text-[#00A3FF] transition-colors duration-300
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
                {/* LinkedIn */}
                <motion.div variants={inputVariants} className="group">
                    <label className={labelStyle}>
                        <Linkedin className="w-4 h-4 text-[#00A3FF]" />
                        LinkedIn Profile URL
                        <LegalTooltip content="Utilizado para validar seu histórico profissional e conexões no mercado." />
                    </label>
                    <div className="relative">
                        <input
                            type="url"
                            required
                            className={`${inputStyle} pl-12`}
                            placeholder="https://linkedin.com/in/seu-perfil"
                            value={formData.linkedin_url}
                            onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00A3FF] transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </div>
                    </div>
                </motion.div>

                {/* Expertise */}
                <motion.div variants={inputVariants} className="group">
                    <label className={labelStyle}>
                        <Briefcase className="w-4 h-4 text-[#00A3FF]" />
                        Área de Expertise Primária
                        <LegalTooltip content="Para direcionar oportunidades de auditoria compatíveis." />
                    </label>
                    <div className="relative">
                        <select
                            required
                            className={`${inputStyle} pl-12 pr-12 appearance-none cursor-pointer`}
                            value={formData.primary_expertise}
                            onChange={e => setFormData({ ...formData, primary_expertise: e.target.value })}
                        >
                            <option value="" disabled className="bg-[#0A1A2F] text-gray-500">Selecione sua área...</option>
                            <option value="Jurídica" className="bg-[#0A1A2F] text-white">Jurídica / Compliance</option>
                            <option value="Técnica" className="bg-[#0A1A2F] text-white">Técnica / Engenharia de Dados</option>
                            <option value="Ética" className="bg-[#0A1A2F] text-white">Ética / Sociologia</option>
                            <option value="Geral" className="bg-[#0A1A2F] text-white">Consultoria Geral</option>
                        </select>
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00A3FF] transition-colors pointer-events-none" />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                </motion.div>

                {/* Location Grid */}
                <motion.div variants={inputVariants} className="grid grid-cols-12 gap-4">
                    {/* Years Experience */}
                    <div className="col-span-4 group">
                        <label className={labelStyle}>
                            Exp (Anos)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="50"
                            required
                            className={`${inputStyle} text-center`}
                            value={formData.years_experience}
                            onChange={e => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                        />
                    </div>

                    {/* City */}
                    <div className="col-span-5 group">
                        <label className={labelStyle}>
                            <MapPin className="w-4 h-4 text-[#00A3FF]" />
                            Cidade
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="São Paulo"
                            className={inputStyle}
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>

                    {/* UF */}
                    <div className="col-span-3 group">
                        <label className={labelStyle}>
                            UF
                        </label>
                        <input
                            type="text"
                            maxLength={2}
                            required
                            placeholder="SP"
                            className={`${inputStyle} text-center uppercase`}
                            value={formData.state}
                            onChange={e => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Consent Section */}
            <motion.div
                variants={inputVariants}
                className="pt-8 border-t border-white/[0.06]"
            >
                <ConsentCheckbox
                    id="prof-consent"
                    checked={consent}
                    onChange={setConsent}
                    required
                    label="Autorizo o processamento do meu perfil profissional e aceito a Política para Membros."
                />
            </motion.div>

            {/* Submit Button - Premium Gradient */}
            <motion.button
                variants={inputVariants}
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01, boxShadow: "0 0 50px rgba(0,163,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 bg-gradient-to-r from-[#00A3FF] via-[#0088FF] to-[#0066FF] 
                    text-white font-bold uppercase tracking-[0.2em] text-sm rounded-xl 
                    shadow-[0_10px_40px_rgba(0,163,255,0.25),_inset_0_1px_0_rgba(255,255,255,0.1)] 
                    hover:shadow-[0_20px_60px_rgba(0,163,255,0.35)] 
                    active:scale-[0.98] transition-all duration-300 
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    flex justify-center items-center gap-4
                    relative overflow-hidden group"
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                {loading ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <Sparkles className="w-5 h-5" />
                )}
                <span className="relative z-10">
                    {loading ? 'Processando Cadastro...' : 'Enviar Solicitação'}
                </span>
            </motion.button>
        </motion.form>
    );
}
