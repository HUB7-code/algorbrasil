'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Loader2, Send, Linkedin, Mail, User, Phone, Briefcase, FileText, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/HeroScene'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0A1A2F] opacity-50" />
});

export default function PartnerApplicationPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        linkedin: '',
        whatsapp: '',
        area: 'Consultoria de Gestão',
        motivation: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/v1/partners/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsSuccess(true);
            } else {
                const err = await res.json();
                alert(`Erro: ${err.detail || 'Falha ao enviar aplicação'}`);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Erro de conexão. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#050810] text-white flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Ambience */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10" />
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel max-w-lg w-full p-12 rounded-3xl border border-[#00FF94]/30 text-center relative z-10 shadow-[0_0_50px_rgba(0,255,148,0.1)]"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-24 h-24 bg-[#00FF94]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#00FF94] border border-[#00FF94]/50 shadow-[0_0_30px_rgba(0,255,148,0.2)]"
                    >
                        <CheckCircle2 className="w-12 h-12" />
                    </motion.div>

                    <h2 className="font-orbitron text-3xl font-bold text-white mb-4">
                        Candidatura Recebida
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-10 text-lg">
                        Seus dados foram enviados com segurança para o nosso <strong>Comitê de Credenciamento</strong>.
                        <br /><br />
                        Analisaremos seu perfil e entraremos em contato em até 48 horas.
                    </p>
                    <Link href="/" className="inline-block w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors">
                        Voltar para o Início
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#050810] text-white flex flex-col lg:flex-row font-sans selection:bg-[#00FF94] selection:text-black overflow-hidden">

            {/* --- LEFT COLUMN: Brand & Visuals --- */}
            <div className="w-full lg:w-5/12 bg-[#020408] relative p-8 md:p-12 lg:p-16 flex flex-col justify-between border-r border-white/5 h-full z-20">
                {/* Ambience */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/grid-pattern.svg')] opacity-[0.05]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[120px]" />
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#00FF94]/5 rounded-full blur-[100px]" />

                {/* Back Link */}
                <div className="relative z-10 mb-8">
                    <Link href="/partners" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FF94] transition-colors group text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar
                    </Link>
                </div>

                {/* VISUAL CENTERPIECE */}
                <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center w-full">

                    <div className="relative w-full aspect-square max-w-[320px] md:max-w-[420px] lg:max-w-[500px] mb-8 transform hover:scale-105 transition-transform duration-700">
                        <div className="absolute inset-0 rounded-full border border-[#00A3FF]/20 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-4 rounded-full border border-[#00FF94]/10 animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,163,255,0.1)] bg-[#0A1A2F]/30 backdrop-blur-sm">
                            <HeroScene />
                        </div>

                        {/* Overlay Logo */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center z-20">
                                <h3 className="font-orbitron text-5xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,163,255,0.6)]">
                                    ALGOR
                                </h3>
                                <span className="text-xs md:text-sm font-mono text-[#00FF94] tracking-[0.6em] uppercase block mt-2">Brasil</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="font-orbitron text-4xl md:text-5xl font-bold leading-tight mb-6">
                            Solicitação de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00FF94]">
                                Credenciamento
                            </span>
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                            Acesso restrito para consultorias e especialistas em Governança de IA.
                            Junte-se à rede que define os padrões nacionais.
                        </p>
                    </div>
                </div>

                {/* Footer Status */}
                <div className="relative z-10 mt-12 hidden lg:block">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94]/30" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94]/30" />
                        </div>
                        <p className="text-xs text-[#00FF94] uppercase tracking-widest font-mono">System Online • v17.0</p>
                    </div>
                </div>
            </div>

            {/* --- RIGHT COLUMN: Form Application --- */}
            <div className="w-full lg:w-7/12 h-full overflow-y-auto bg-[#050810] relative z-10 scrollbar-thin scrollbar-thumb-[#00FF94]/20 scrollbar-track-transparent">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="p-6 md:p-12 lg:p-20 min-h-full flex flex-col justify-center">
                    <div className="max-w-2xl mx-auto w-full relative z-10">
                        <div className="mb-10">
                            <h2 className="font-orbitron text-2xl font-bold text-white mb-2">Dossier do Candidato</h2>
                            <p className="text-gray-500 text-sm">Preencha com seus dados profissionais.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Personal Info Group */}
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-[#00A3FF] transition-colors">Nome Completo</label>
                                        <div className="relative">
                                            <input
                                                required
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                type="text"
                                                className="w-full bg-[#0A1A2F]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00A3FF] focus:bg-[#0A1A2F] transition-all"
                                                placeholder="Ex: Dr. Roberto Campos"
                                            />
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00A3FF] transition-colors" />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-[#00A3FF] transition-colors">Email Corporativo</label>
                                        <div className="relative">
                                            <input
                                                required
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                type="email"
                                                className="w-full bg-[#0A1A2F]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00A3FF] focus:bg-[#0A1A2F] transition-all"
                                                placeholder="seu@escritorio.com"
                                            />
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00A3FF] transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-[#00FF94] transition-colors">WhatsApp</label>
                                        <div className="relative">
                                            <input
                                                required
                                                name="whatsapp"
                                                value={formData.whatsapp}
                                                onChange={handleChange}
                                                type="tel"
                                                className="w-full bg-[#0A1A2F]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94] focus:bg-[#0A1A2F] transition-all"
                                                placeholder="(11) 99999-9999"
                                            />
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF94] transition-colors" />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-[#00FF94] transition-colors">Área de Atuação</label>
                                        <div className="relative">
                                            <select
                                                name="area"
                                                value={formData.area}
                                                onChange={handleChange}
                                                className="w-full bg-[#0A1A2F]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00FF94] focus:bg-[#0A1A2F] transition-all appearance-none cursor-pointer"
                                            >
                                                <option className="bg-[#0A1A2F]">Consultoria de Gestão</option>
                                                <option className="bg-[#0A1A2F]">Escritório de Advocacia</option>
                                                <option className="bg-[#0A1A2F]">Empresa de TI/Dev</option>
                                                <option className="bg-[#0A1A2F]">Auditor Independente</option>
                                                <option className="bg-[#0A1A2F]">Outro</option>
                                            </select>
                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF94] transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Critical Info */}
                            <div className="p-6 rounded-2xl bg-[#0A1A2F]/30 border border-[#0077b5]/30">
                                <div className="group">
                                    <label className="text-[10px] font-bold text-[#0077b5] uppercase tracking-widest mb-2 block flex items-center gap-2">
                                        <Linkedin className="w-3 h-3" />
                                        URL do Perfil LinkedIn (Obrigatório)
                                    </label>
                                    <input
                                        required
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        type="url"
                                        className="w-full bg-[#050810] border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0077b5] focus:ring-1 focus:ring-[#0077b5] transition-all"
                                        placeholder="https://linkedin.com/in/seu-perfil"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-white transition-colors">Motivação para Acesso</label>
                                <div className="relative">
                                    <textarea
                                        required
                                        name="motivation"
                                        value={formData.motivation}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-[#0A1A2F]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-[#0A1A2F] transition-all resize-none"
                                        placeholder="Descreva brevemente sua experiência com governança ou tecnologia..."
                                    />
                                    <FileText className="absolute left-4 top-6 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative w-full py-5 bg-gradient-to-r from-[#00FF94] to-[#00CC76] hover:from-[#00CC76] hover:to-[#00AA63] 
                                        text-[#050810] font-bold rounded-xl transition-all shadow-[0_10px_40px_rgba(0,255,148,0.2)] 
                                        flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-sm">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Criptografando Dados...
                                            </>
                                        ) : (
                                            <>
                                                Submeter Credenciais
                                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                </button>

                                <div className="flex items-center justify-center gap-2 mt-6 opacity-40">
                                    <ShieldCheck className="w-3 h-3 text-gray-400" />
                                    <p className="text-[10px] text-gray-400">
                                        Connection Secured with 256-bit Encryption
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}
