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
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center pb-32 relative"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00FF94] tracking-widest uppercase mb-8 cursor-default hover:bg-white/10 transition-colors">
                        <Shield className="w-3 h-3" />
                        Enterprise Grade Security
                    </div>

                    <h1 className="text-5xl lg:text-8xl font-serif font-medium mb-8 leading-[0.9] tracking-tight text-white">
                        Cresça Rápido.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">
                            Durma Tranquilo.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                        A única infraestrutura do Brasil que une <span className="text-white font-medium border-b border-[#00A3FF]/30">Growth Hacking</span> com <span className="text-white font-medium border-b border-[#00FF94]/30">ISO 42001 Nativa</span>.
                        Transforme governança em vantagem competitiva.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.button
                            onClick={() => setIsDiagnosticModalOpen(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-[#00FF94] text-[#0A1A2F] font-bold rounded-xl hover:bg-[#00CC76] transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(0,255,148,0.2)]"
                        >
                            <Zap className="w-5 h-5 fill-current" />
                            AGENDAR DIAGNÓSTICO
                        </motion.button>
                        <Link href="#architecture">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center gap-3 backdrop-blur-md"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                VER ARQUITETURA
                            </motion.button>
                        </Link>
                    </div>
                </motion.header>

                {/* --- STATS BAR (Power BI Cards) --- */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32"
                >
                    {benefits.map((benefit, idx) => (
                        <div key={benefit.label} className="group relative overflow-hidden bg-[#0A1A2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-[#00FF94]/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{benefit.label}</p>
                                <benefit.icon className="w-5 h-5 text-[#00A3FF] group-hover:text-[#00FF94] transition-colors" />
                            </div>
                            <p className="text-4xl font-mono font-bold text-white group-hover:scale-105 transition-transform origin-left">{benefit.value}</p>
                        </div>
                    ))}
                </motion.section>

                {/* --- VALUE PROPOSITION --- */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-3 gap-8 mb-32"
                >
                    {valueProps.map((prop, idx) => (
                        <motion.div
                            key={prop.title}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group p-8 rounded-3xl bg-gradient-to-b from-[#131825] to-[#0A0E1A] border border-white/5 hover:border-white/10 transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] group-hover:bg-[#00A3FF]/10 transition-colors" />

                            <div className="w-14 h-14 rounded-2xl bg-[#0A1A2F] border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#00FF94]/50 transition-colors shadow-lg">
                                <prop.icon className="w-6 h-6" style={{ color: prop.color }} />
                            </div>

                            <h3 className="text-2xl font-serif font-medium text-white mb-4">{prop.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {prop.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.section>

                {/* --- ARCHITECTURE DIAGRAM (Live Monitor) --- */}
                <motion.section
                    id="architecture"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-32 scroll-mt-32"
                >
                    <div className="p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
                        <div className="bg-[#0D1117] rounded-[22px] p-8 lg:p-16 relative overflow-hidden">
                            {/* Background Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00A3FF]/10 blur-[100px] pointer-events-none" />

                            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                                <div>
                                    <h2 className="text-4xl lg:text-5xl font-serif font-medium mb-12">
                                        Infraestrutura de <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">Confiança Digital</span>
                                    </h2>

                                    <div className="space-y-4">
                                        {architectureSteps.map((step, idx) => (
                                            <div
                                                key={step.number}
                                                onClick={() => setActiveStep(idx)}
                                                className={`group flex gap-6 p-6 rounded-2xl cursor-pointer transition-all border ${activeStep === idx
                                                        ? 'bg-[#1C2333] border-[#00FF94]/30'
                                                        : 'bg-transparent border-transparent hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className={`text-sm font-mono font-bold pt-1 transition-colors ${activeStep === idx ? 'text-[#00FF94]' : 'text-gray-600'
                                                    }`}>
                                                    {step.number}
                                                </div>
                                                <div>
                                                    <h4 className={`text-lg font-bold mb-2 transition-colors ${activeStep === idx ? 'text-white' : 'text-gray-400 group-hover:text-white'
                                                        }`}>
                                                        {step.title}
                                                    </h4>
                                                    <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Live Widget Visualization */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#00FF94]/5 blur-3xl" />
                                    <div className="relative bg-[#0A1A2F]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                        {/* Mock Header */}
                                        <div className="h-10 border-b border-white/5 bg-[#050912] flex items-center px-4 justify-between">
                                            <div className="flex gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                                            </div>
                                            <div className="text-[10px] font-mono text-gray-500 uppercase">algor_guardrail_v2.sys</div>
                                        </div>

                                        {/* Monitor Content */}
                                        <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                                            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                                                {/* Animated Rings */}
                                                <div className="absolute inset-0 border-4 border-[#00A3FF]/20 rounded-full animate-spin-slow" />
                                                <div className="absolute inset-4 border-4 border-t-[#00FF94] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />

                                                <div className="text-center">
                                                    <div className="text-5xl font-mono font-bold text-white tracking-tighter">99.9</div>
                                                    <div className="text-[10px] uppercase tracking-widest text-[#00FF94] mt-1">SLA Verified</div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 w-full">
                                                <div className="bg-[#131825] p-4 rounded-xl border border-white/5 text-center">
                                                    <div className="text-xs text-gray-500 uppercase mb-1">Threats Blocked</div>
                                                    <div className="text-2xl font-mono text-[#F59E0B]">1,402</div>
                                                </div>
                                                <div className="bg-[#131825] p-4 rounded-xl border border-white/5 text-center">
                                                    <div className="text-xs text-gray-500 uppercase mb-1">Safe Requests</div>
                                                    <div className="text-2xl font-mono text-[#00A3FF]">842k</div>
                                                </div>
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
                    className="text-center mb-32"
                >
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-12">Native Integrations</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {integrations.map((integration, idx) => (
                            <motion.div
                                key={integration.name}
                                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)" }}
                                className="px-6 py-3 bg-white/5 border border-white/5 rounded-full flex items-center gap-3 cursor-default"
                            >
                                <span className="text-xl grayscale opacity-70">{integration.logo}</span>
                                <span className="text-sm font-medium text-gray-300">{integration.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* --- FINAL CTA --- */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-[#00A3FF] relative overflow-hidden p-12 lg:p-24 text-center"
                >
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-transparent to-transparent opacity-90" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-serif font-medium text-white mb-6">
                            Sua Governança é o <br />Novo Diferencial Competitivo.
                        </h2>
                        <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
                            Clientes Enterprise exigem segurança. Entregue ISO 42001 by default e feche contratos maiores, mais rápido.
                        </p>

                        <motion.button
                            onClick={() => setIsSpecialistModalOpen(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-5 bg-white text-[#0A1A2F] font-bold rounded-xl shadow-xl flex items-center gap-2 mx-auto"
                        >
                            FALAR COM ESPECIALISTA
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        <p className="mt-6 text-sm text-blue-200/60">
                            Implementação média em 48 horas.
                        </p>
                    </div>
                </motion.section>

            </div>
        </div>
    );
}
