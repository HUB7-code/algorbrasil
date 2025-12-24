'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield, Lock, Zap, Activity, CheckCircle2, BarChart3,
    Globe, Server, ArrowRight, ChevronRight, Play, Cpu,
    Eye, FileText, Users, TrendingUp, Clock, Award
} from 'lucide-react';
import Link from 'next/link';
import { EnterpriseLeadModal, SpecialistContactModal } from '@/components/leads';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Feature Cards Data
const valueProps = [
    {
        icon: Lock,
        title: 'Risco-como-Serviço',
        description: 'Não oferecemos apenas software; entregamos certeza. Nossa infraestrutura assume a responsabilidade técnica da conformidade.',
        color: 'blue',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Server,
        title: 'Telemetria na Borda',
        description: 'Latência zero para sua IA. Nosso Agente de Borda coleta telemetria de risco assincronamente, sem gargalar sua produção.',
        color: 'green',
        gradient: 'from-emerald-500 to-teal-500'
    },
    {
        icon: Shield,
        title: 'Criptografia de Rastreio',
        description: 'Logs de auditoria matematicamente imutáveis. Criptografia de hash encadeado garante histórico à prova de adulteração.',
        color: 'purple',
        gradient: 'from-purple-500 to-pink-500'
    }
];

const architectureSteps = [
    {
        number: '01',
        title: 'Interceptação Segura',
        description: 'Todo prompt passa pelo nosso Ethical Guardrail antes de chegar na OpenAI/Azure. Bloqueamos PII e toxicidade na origem.',
        color: 'blue'
    },
    {
        number: '02',
        title: 'Cofre de Evidências',
        description: 'Logs são assinados e armazenados em cofre imutável. Sua prova de inocência jurídica, gerada automaticamente.',
        color: 'green'
    },
    {
        number: '03',
        title: 'Índice Atuarial (ARI)',
        description: 'Calculamos seu Score de Risco em tempo real para reduzir prêmios de seguro e desbloquear vendas B2B.',
        color: 'purple'
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

export default function EnterprisePage() {
    const [activeStep, setActiveStep] = useState(0);
    const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
    const [isSpecialistModalOpen, setIsSpecialistModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white pt-44 pb-20 font-sans">

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

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#131825] to-transparent opacity-80" />
                <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- HERO SECTION --- */}
                <motion.header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center pb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 mb-8"
                    >
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-mono text-emerald-400 tracking-wider uppercase">ALGOR Trust Hub v5.1</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight"
                    >
                        Cresça Rápido. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                            Durma Tranquilo.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
                    >
                        A única infraestrutura do Brasil que une <span className="text-white font-medium">Growth Hacking</span> com <span className="text-white font-medium">ISO 42001 Nativa</span>.
                        Desbloqueie contratos Enterprise transformando governança em ativo de confiança.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.button
                            onClick={() => setIsDiagnosticModalOpen(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-3 cursor-pointer"
                        >
                            Agendar Diagnóstico Técnico
                            <Zap className="w-5 h-5" />
                        </motion.button>
                        <Link href="#architecture">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl font-medium transition-all backdrop-blur-sm flex items-center gap-3"
                            >
                                Entender a Arquitetura
                                <Play className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.header>

                {/* --- STATS BAR --- */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <div className="bg-gradient-to-r from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8">
                        <div className="grid grid-cols-4 gap-8">
                            {benefits.map((benefit, idx) => (
                                <motion.div
                                    key={benefit.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                                        <benefit.icon className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <p className="text-3xl font-bold text-white font-mono mb-1">{benefit.value}</p>
                                    <p className="text-gray-500 text-sm">{benefit.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* --- VALUE PROPOSITION --- */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-3 gap-6 mb-32"
                >
                    {valueProps.map((prop, idx) => (
                        <motion.div
                            key={prop.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="group bg-gradient-to-b from-[#131825]/80 to-[#0A0E1A]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:border-gray-700 transition-all"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prop.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <prop.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">{prop.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {prop.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.section>

                {/* --- ARCHITECTURE DIAGRAM --- */}
                <motion.section
                    id="architecture"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-32 scroll-mt-32"
                >
                    <div className="bg-gradient-to-b from-[#131825]/90 to-[#0A0E1A]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-12 relative overflow-hidden">

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="text-3xl lg:text-4xl font-bold mb-10"
                                >
                                    A Infraestrutura Invisível de <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Confiança Digital</span>
                                </motion.h2>

                                <div className="space-y-6">
                                    {architectureSteps.map((step, idx) => (
                                        <motion.div
                                            key={step.number}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.15 }}
                                            className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all ${activeStep === idx ? 'bg-gray-800/50 border border-gray-700' : 'hover:bg-gray-800/30'
                                                }`}
                                            onClick={() => setActiveStep(idx)}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color === 'blue' ? 'bg-blue-500/20' :
                                                step.color === 'green' ? 'bg-emerald-500/20' :
                                                    'bg-purple-500/20'
                                                }`}>
                                                <span className={`font-mono font-bold ${step.color === 'blue' ? 'text-blue-400' :
                                                    step.color === 'green' ? 'text-emerald-400' :
                                                        'text-purple-400'
                                                    }`}>{step.number}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold mb-1 text-white">{step.title}</h4>
                                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Live Monitor */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative h-[450px] w-full bg-[#0A0E1A] rounded-3xl border border-gray-800 flex flex-col overflow-hidden"
                            >
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-black/30">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                    </div>
                                    <span className="text-xs font-mono text-gray-500">ALGOR-MONITOR-LIVE</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs text-emerald-400">ONLINE</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex items-center justify-center relative p-8">
                                    {/* Ambient blobs */}
                                    <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-[60px] animate-pulse" />
                                    <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-emerald-500/20 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '1s' }} />

                                    <div className="relative z-10 text-center">
                                        <div className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-widest">Monitoramento ao Vivo</div>

                                        <motion.div
                                            className="text-7xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                        >
                                            99.98%
                                        </motion.div>
                                        <div className="text-gray-400 mb-8">Taxa de Conformidade</div>

                                        <div className="flex justify-center gap-4">
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl"
                                            >
                                                <p className="text-red-400 text-xl font-bold font-mono">142</p>
                                                <p className="text-gray-500 text-xs">Bloqueados</p>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl"
                                            >
                                                <p className="text-emerald-400 text-xl font-bold font-mono">8.4k</p>
                                                <p className="text-gray-500 text-xs">Verificados</p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* --- INTEGRATIONS --- */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-10">Compatível com o Ecossistema Moderno</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {integrations.map((integration, idx) => (
                            <motion.div
                                key={integration.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="px-6 py-4 bg-gray-800/30 border border-gray-800 rounded-2xl hover:border-gray-700 transition-all cursor-pointer"
                            >
                                <span className="text-2xl mr-2">{integration.logo}</span>
                                <span className="text-white font-medium">{integration.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* --- CTA FINAL --- */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl"
                >
                    <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-gray-800 p-12 lg:p-20 text-center relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl lg:text-5xl font-bold mb-6"
                        >
                            Pronto para blindar sua operação?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
                        >
                            Não espere a notificação da ANPD. Implemente o ALGOR Trust Hub e transforme compliance em vantagem competitiva.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <motion.button
                                onClick={() => setIsSpecialistModalOpen(true)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-5 bg-white text-[#0A1A2F] font-bold text-lg rounded-xl shadow-2xl flex items-center gap-3 mx-auto cursor-pointer"
                            >
                                Falar com Engenheiro de Soluções
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <Link href="/calculadora">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-5 bg-gray-800 text-white font-bold text-lg rounded-xl flex items-center gap-3 mx-auto"
                                >
                                    Calcular Minha Exposição
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
                </motion.section>

            </div>
        </div>
    );
}
