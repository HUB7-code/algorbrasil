'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield, Lock, Zap, Activity, CheckCircle2, BarChart3,
    Globe, Server, ArrowRight, ChevronRight, Play, Cpu,
    Eye, FileText, Users, TrendingUp, Clock, Award, LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { EnterpriseLeadModal, SpecialistContactModal } from '@/components/leads';

// --- DATA & CONTENT ---

const valueProps = [
    {
        icon: Lock,
        title: 'Risco-como-Serviço',
        description: 'Não oferecemos apenas software; entregamos certeza. Nossa infraestrutura assume a responsabilidade técnica da conformidade.',
        color: '#00A3FF' // Brand Blue
    },
    {
        icon: Server,
        title: 'Telemetria na Borda',
        description: 'Latência zero para sua IA. Nosso Agente de Borda coleta telemetria de risco assincronamente, sem gargalar sua produção.',
        color: '#00FF94' // Brand Green
    },
    {
        icon: Shield,
        title: 'Criptografia de Rastreio',
        description: 'Logs de auditoria matematicamente imutáveis. Criptografia de hash encadeado garante histórico à prova de adulteração.',
        color: '#F59E0B' // Brand Warning/Gold
    }
];

const architectureSteps = [
    {
        number: '01',
        title: 'Interceptação Segura',
        description: 'Todo prompt passa pelo nosso Ethical Guardrail antes de chegar na OpenAI/Azure. Bloqueamos PII na origem.',
        color: '#00A3FF'
    },
    {
        number: '02',
        title: 'Cofre de Evidências',
        description: 'Logs são assinados e armazenados em cofre imutável. Sua prova de inocência jurídica, gerada automaticamente.',
        color: '#00FF94'
    },
    {
        number: '03',
        title: 'Índice Atuarial (ARI)',
        description: 'Calculamos seu Score de Risco em tempo real para reduzir prêmios de seguro e desbloquear vendas B2B.',
        color: '#F59E0B'
    }
];

const benefits = [
    { icon: Clock, label: 'Deploy em 48h', value: '< 2 dias' },
    { icon: TrendingUp, label: 'Redução de Risco', value: '87%' },
    { icon: Award, label: 'Conformidade', value: '99.98%' },
    { icon: Users, label: 'Empresas Atendidas', value: '50+' }
];

const integrations = [
    { name: 'OpenAI', logo: '🤖' },
    { name: 'Azure AI', logo: '☁️' },
    { name: 'AWS Bedrock', logo: '📦' },
    { name: 'Anthropic', logo: '🧠' },
    { name: 'LangChain', logo: '🔗' },
    { name: 'LlamaIndex', logo: '🦙' }
];

// --- COMPONENT ---

export default function EnterprisePage() {
    const [activeStep, setActiveStep] = useState(0);
    const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
    const [isSpecialistModalOpen, setIsSpecialistModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white pt-32 pb-20 font-sans selection:bg-[#00FF94] selection:text-[#0A0E1A]">

            {/* Lead Capture Modals */}
            <EnterpriseLeadModal
                isOpen={isDiagnosticModalOpen}
                onClose={() => setIsDiagnosticModalOpen(false)}
                source="enterprise-hero"
            />
            <SpecialistContactModal
                isOpen={isSpecialistModalOpen}
                onClose={() => setIsSpecialistModalOpen(false)}
                source="enterprise-cta"
            />

            {/* Background Ambience (Subtle & Premium) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                {/* --- HERO SECTION --- */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center pb-32 relative"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#00A3FF]/20 to-[#00FF94]/20 blur-[120px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FF94]/5 border border-[#00FF94]/20 text-[10px] font-bold text-[#00FF94] tracking-[0.2em] uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.1)]">
                            <Shield className="w-3 h-3" />
                            Enterprise Grade Security
                        </div>

                        <h1 className="text-4xl lg:text-7xl font-light mb-8 leading-tight tracking-tight text-white drop-shadow-lg">
                            <span className="font-sans font-light text-gray-300 block mb-3 tracking-normal text-2xl lg:text-3xl">Cresça Rápido.</span>
                            <span className="font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FF94] to-[#00A3FF] animate-gradient-text block">
                                Durma Tranquilo.
                            </span>
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-manrope font-light">
                            A infraestrutura definitiva que une <strong className="text-white font-medium hover:text-[#00FF94] transition-colors">Growth Hacking</strong> com <strong className="text-white font-medium hover:text-[#00A3FF] transition-colors">ISO 42001 Nativa</strong>.
                            Transforme governança em vantagem competitiva real.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-orbitron">
                            <motion.button
                                onClick={() => setIsDiagnosticModalOpen(true)}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,255,148,0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-[#00FF94] text-[#0A1A2F] font-bold rounded-xl transition-all flex items-center gap-3 tracking-wider shadow-[0_0_20px_rgba(0,255,148,0.2)]"
                            >
                                <Zap className="w-5 h-5 fill-current" />
                                AGENDAR DIAGNÓSTICO
                            </motion.button>
                            <Link href="#architecture">
                                <motion.button
                                    whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.05)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl transition-all flex items-center gap-3 backdrop-blur-sm tracking-wider"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    VER ARQUITETURA
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.header>

                {/* --- STATS BAR (Floating Glass) --- */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-40"
                >
                    {benefits.map((benefit, idx) => (
                        <div key={benefit.label} className="group relative bg-[#131825]/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:bg-[#131825]/60 hover:border-[#00FF94]/20 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500 group-hover:border-[#00FF94]/20">
                                    <benefit.icon className="w-6 h-6 text-[#00A3FF] group-hover:text-[#00FF94] transition-colors" />
                                </div>
                                <p className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-2 tracking-tight group-hover:text-[#00FF94] transition-colors">
                                    {benefit.value}
                                </p>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{benefit.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.section>

                {/* --- VALUE PROPOSITION (Deep Cards) --- */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-3 gap-8 mb-40"
                >
                    {valueProps.map((prop, idx) => (
                        <motion.div
                            key={prop.title}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group p-10 rounded-[32px] bg-gradient-to-b from-[#131825] to-[#0A0E1A] border border-white/5 hover:border-[#00A3FF]/30 transition-all relative overflow-hidden shadow-2xl"
                        >
                            {/* Ambient Glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:bg-[#00A3FF]/10 transition-colors duration-700" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-[#0A1A2F] border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#00A3FF]/50 transition-colors shadow-[0_0_30px_rgba(0,163,255,0.1)] group-hover:shadow-[0_0_50px_rgba(0,163,255,0.2)]">
                                    <prop.icon className="w-8 h-8" style={{ color: prop.color }} />
                                </div>

                                <h3 className="text-2xl font-orbitron font-bold text-white mb-4 tracking-wide group-hover:text-[#00A3FF] transition-colors">
                                    {prop.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-base font-light">
                                    {prop.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.section>

                {/* --- ARCHITECTURE DIAGRAM (Holographic Monitor) --- */}
                <motion.section
                    id="architecture"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-40 scroll-mt-32"
                >
                    <div className="relative rounded-[40px] border border-white/10 bg-[#0A0E1A]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                        {/* Internal Glows */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00A3FF]/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00FF94]/5 blur-[120px] rounded-full pointer-events-none" />

                        <div className="grid lg:grid-cols-2 p-8 lg:p-16 gap-16 items-center relative z-10">
                            <div>
                                <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-[#00A3FF] text-xs font-mono mb-6 uppercase tracking-widest">
                                    System Architecture v2.0
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-light mb-12 leading-tight text-white">
                                    Infraestrutura de <br />
                                    <span className="font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">
                                        Confiança Digital
                                    </span>
                                </h2>

                                <div className="space-y-4">
                                    {architectureSteps.map((step, idx) => (
                                        <div
                                            key={step.number}
                                            onClick={() => setActiveStep(idx)}
                                            className={`group flex items-start gap-6 p-6 rounded-2xl cursor-pointer transition-all border ${activeStep === idx
                                                ? 'bg-[#1C2333]/60 border-[#00FF94]/30 shadow-[0_0_30px_rgba(0,255,148,0.05)]'
                                                : 'bg-transparent border-transparent hover:bg-white/5'
                                                }`}
                                        >
                                            <div className={`text-lg font-orbitron font-bold pt-1 transition-colors ${activeStep === idx ? 'text-[#00FF94]' : 'text-gray-600'}`}>
                                                {step.number}
                                            </div>
                                            <div>
                                                <h4 className={`text-xl font-orbitron font-bold mb-2 transition-colors tracking-wide ${activeStep === idx ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                                                    {step.title}
                                                </h4>
                                                <p className="text-gray-400 text-sm leading-relaxed max-w-md font-light">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Live Monitor - Premium Glass */}
                            <div className="relative">
                                {/* Monitor Frame */}
                                <div className="relative bg-[#050810] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                    {/* Header */}
                                    <div className="h-12 border-b border-white/5 bg-[#0A0E1A] flex items-center justify-between px-6">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                                            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                            <Lock className="w-3 h-3" />
                                            SECURE_CONNECTION_ESTABLISHED
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-10 flex flex-col items-center justify-center min-h-[450px] relative">
                                        {/* Background Grid */}
                                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

                                        {/* Central Metric */}
                                        <div className="relative w-64 h-64 flex items-center justify-center mb-10">
                                            <div className="absolute inset-0 border border-white/5 rounded-full" />
                                            <div className="absolute inset-0 border-2 border-t-[#00FF94] border-r-[#00A3FF] border-b-transparent border-l-transparent rounded-full animate-spin-slow opacity-50" />
                                            <div className="absolute inset-4 border border-white/5 rounded-full" />

                                            <div className="text-center relative z-10">
                                                <div className="text-6xl font-orbitron font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(0,255,148,0.5)]">
                                                    99.9
                                                </div>
                                                <div className="text-xs uppercase tracking-[0.3em] text-[#00FF94] mt-2 font-bold">
                                                    SLA Verified
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 w-full">
                                            <div className="bg-[#131825]/50 p-4 rounded-xl border border-white/5 text-center group hover:border-[#F59E0B]/30 transition-all">
                                                <div className="text-[10px] text-gray-500 uppercase mb-2 tracking-wider font-orbitron">Threats Blocked</div>
                                                <div className="text-3xl font-mono text-[#F59E0B] group-hover:scale-105 transition-transform">1,402</div>
                                            </div>
                                            <div className="bg-[#131825]/50 p-4 rounded-xl border border-white/5 text-center group hover:border-[#00A3FF]/30 transition-all">
                                                <div className="text-[10px] text-gray-500 uppercase mb-2 tracking-wider font-orbitron">Safe Requests</div>
                                                <div className="text-3xl font-mono text-[#00A3FF] group-hover:scale-105 transition-transform">842k</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* --- LEGACY INTEGRATIONS --- */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-40"
                >
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-12">Native Integrations</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {integrations.map((integration, idx) => (
                            <motion.div
                                key={integration.name}
                                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.05)" }}
                                className="px-8 py-4 bg-transparent border border-white/5 rounded-2xl flex items-center gap-4 cursor-default transition-all group"
                            >
                                <span className="text-2xl grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">{integration.logo}</span>
                                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{integration.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* --- FINAL CTA (PREMIUM REWORK) --- */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[40px] overflow-hidden p-12 lg:p-24 text-center border border-white/10 group"
                >
                    {/* Dark Premium Background */}
                    <div className="absolute inset-0 bg-[#0A0E1A]" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                    {/* Animated Neon Glows */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF94] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                    {/* Ambient Light */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00A3FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <motion.h2
                            className="text-3xl lg:text-5xl font-light text-white mb-8 leading-tight"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <span className="font-manrope font-light block mb-3 text-gray-400">Sua Governança é o</span>
                            <span className="font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 group-hover:to-[#00A3FF] transition-all duration-500">
                                Novo Diferencial Competitivo.
                            </span>
                        </motion.h2>

                        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed font-light">
                            Clientes Enterprise não compram risco. Entregue segurança por padrão e feche contratos maiores.
                        </p>

                        <div className="flex flex-col items-center gap-6">
                            <motion.button
                                onClick={() => setIsSpecialistModalOpen(true)}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 bg-white text-[#0A1A2F] font-bold rounded-xl flex items-center gap-3 tracking-widest font-orbitron hover:bg-gray-200 transition-colors shadow-2xl"
                            >
                                FALAR COM ESPECIALISTA
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>

                            <p className="flex items-center gap-2 text-sm text-[#00FF94] font-mono tracking-wide opacity-80">
                                <Clock className="w-4 h-4" />
                                Implementação média em 48 horas
                            </p>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
}
