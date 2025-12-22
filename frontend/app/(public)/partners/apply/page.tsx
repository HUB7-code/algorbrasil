'use client';

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2, Send, ShieldCheck, Linkedin } from 'lucide-react';
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
            <div className="min-h-screen bg-[#050511] text-white flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Ambience */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF94]/10 rounded-full blur-[100px]" />
                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-20" />
                </div>

                <div className="glass-panel max-w-lg w-full p-12 rounded-3xl border border-[#00FF94]/30 text-center relative z-10 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-[#00FF94]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00FF94] border border-[#00FF94]/40">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-serif text-white mb-4">Candidatura Recebida</h2>
                    <p className="text-gray-300 leading-relaxed mb-8">
                        Seus dados foram enviados com sucesso para o nosso <strong>Comitê de Credenciamento</strong>.
                        <br /><br />
                        Analisaremos seu perfil (LinkedIn e track record) e entraremos em contato em até 48 horas úteis caso sua aplicação seja aprovada.
                    </p>
                    <Link href="/" className="inline-block w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors">
                        Voltar para Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050511] text-white flex flex-col md:flex-row font-sans selection:bg-[#00A3FF] selection:text-white">

            {/* Left Col - Visual & Context */}
            <div className="w-full md:w-5/12 bg-[#0A1A2F] relative p-8 md:p-12 flex flex-col justify-between overflow-hidden border-r border-white/5">
                {/* Ambience */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid.svg')] opacity-10" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00A3FF]/20 rounded-full blur-[100px]" />

                {/* Back Link */}
                <div className="relative z-10 mb-8">
                    <Link href="/partners" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar
                    </Link>
                </div>

                {/* THE KEY VISUAL - 3D GLOBE */}
                <div className="relative z-10 flex-grow flex items-center justify-center mb-8">
                    <div className="relative w-full aspect-square max-w-sm rounded-full overflow-hidden border border-[#00A3FF]/30 shadow-[0_0_50px_rgba(0,163,255,0.15)] bg-[#0A1A2F]/50 group">

                        {/* 3D Scene */}
                        <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                            <HeroScene />
                        </div>

                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <div className="text-center">
                                <h3 className="font-display text-3xl md:text-4xl text-white font-bold tracking-wide drop-shadow-[0_0_15px_rgba(0,163,255,0.8)]">
                                    ALGOR
                                </h3>
                                <span className="text-[10px] md:text-xs font-mono text-[#00FF94] tracking-[0.5em] uppercase">Brasil</span>
                            </div>
                        </div>

                        {/* Overlays for Vignette */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,26,47,0.8)_90%)] z-10 pointer-events-none" />

                        {/* Floating Label - Centered for Circle */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-max">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1A2F]/90 border border-[#00A3FF]/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                                <span className="text-[10px] uppercase tracking-widest text-[#00FF94] font-mono">Neural Network Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Context Text */}
                <div className="relative z-10 mb-12 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-serif leading-tight mb-4">
                        Inicie seu <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-white">
                            Credenciamento.
                        </span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                        O Programa de Parceiros ALGOR é restrito a profissionais com experiência comprovada em Consultoria, Direito Digital ou Tecnologia.
                    </p>
                </div>

                <div className="relative z-10 mt-6 md:mt-0">
                    <p className="text-xs text-[#00A3FF] uppercase tracking-widest font-mono mb-2">Processo Seletivo v2.0</p>
                    <div className="flex gap-2">
                        <div className="h-1 w-8 bg-[#00A3FF] rounded-full" />
                        <div className="h-1 w-8 bg-[#00A3FF]/30 rounded-full" />
                        <div className="h-1 w-8 bg-[#00A3FF]/30 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Right Col - The Form */}
            <div className="w-full md:w-7/12 p-6 md:p-12 lg:p-20 overflow-y-auto">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Dossier do Candidato</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Nome Completo</label>
                                <input
                                    required
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94] focus:ring-1 focus:ring-[#00FF94] transition-all"
                                    placeholder="Ex: Dr. Roberto Campos"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Email Corporativo</label>
                                <input
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94] focus:ring-1 focus:ring-[#00FF94] transition-all"
                                    placeholder="seu@escritorio.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Linkedin className="w-3 h-3 text-[#0077b5]" />
                                URL do Perfil LinkedIn (Critério Chave)
                            </label>
                            <input
                                required
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                type="url"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94] focus:ring-1 focus:ring-[#00FF94] transition-all"
                                placeholder="https://linkedin.com/in/seu-perfil"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">WhatsApp</label>
                                <input
                                    required
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    type="tel"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94] focus:ring-1 focus:ring-[#00FF94] transition-all"
                                    placeholder="(11) 99999-9999"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Área de Atuação</label>
                                <select
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00FF94] focus:ring-1 focus:ring-[#00FF94] transition-all appearance-none"
                                >
                                    <option className="bg-[#0A1A2F]">Consultoria de Gestão</option>
                                    <option className="bg-[#0A1A2F]">Escritório de Advocacia</option>
                                    <option className="bg-[#0A1A2F]">Empresa de TI/Dev</option>
                                    <option className="bg-[#0A1A2F]">Auditor Independente</option>
                                    <option className="bg-[#0A1A2F]">Outro</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Motivação para Acesso</label>
                            <textarea
                                required
                                name="motivation"
                                value={formData.motivation}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94] focus:ring-1 focus:ring-[#00FF94] transition-all"
                                placeholder="Descreva brevemente sua experiência com governança ou tecnologia e por que deseja ser um Parceiro ALGOR."
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-[#00FF94] hover:bg-[#00D67D] text-[#0A1A2F] font-bold rounded-xl transition-all shadow-lg shadow-[#00FF94]/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processando Aplicação...
                                    </>
                                ) : (
                                    <>
                                        Enviar para o Board
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-4">
                                Seus dados estão protegidos sob nossa Política de Privacidade.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
