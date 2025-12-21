'use client';

import React from 'react';
import { Shield, Lock, Zap, Activity, CheckCircle, BarChart3, Globe, Server } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-[#050511] text-white pt-24 pb-20 font-sans selection:bg-[#00FF94] selection:text-[#0A1A2F]">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#0A1A2F] to-transparent opacity-80" />
                <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-[#00A3FF]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[100px]" />
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- HERO SECTION --- */}
                <header className="text-center py-20 lg:py-32">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <Shield className="w-4 h-4 text-[#00FF94]" />
                        <span className="text-sm font-mono text-[#00FF94] tracking-wider uppercase">ALGOR Trust Hub v5.1</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                        Cresça Rápido. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">
                            Durma Tranquilo.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        A única infraestrutura do Brasil que une <strong>Growth Hacking</strong> com <strong>ISO 42001 Nativa</strong>.
                        Desbloqueie contratos Enterprise transformando governança em ativo de confiança.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="https://wa.me/558599851769?text=Gostaria%20de%20agendar%20um%20Diagnóstico%20Técnico%20Enterprise."
                            className="px-8 py-4 bg-[#00FF94] hover:bg-[#00D97E] text-[#0A1A2F] font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(0,255,148,0.3)] hover:shadow-[0_0_50px_rgba(0,255,148,0.5)] flex items-center gap-3"
                        >
                            Agendar Diagnóstico Técnico
                            <Zap className="w-5 h-5 fill-current" />
                        </Link>
                        <Link
                            href="#architecture"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all backdrop-blur-sm flex items-center gap-3"
                        >
                            Entender a Arquitetura
                            <Activity className="w-5 h-5" />
                        </Link>
                    </div>
                </header>

                {/* --- VALUE PROPOSITION (The "Why") --- */}
                <section className="grid lg:grid-cols-3 gap-8 mb-32">
                    <div className="glass-panel p-10 rounded-2xl border border-white/5 hover:border-[#00A3FF]/30 transition-all group">
                        <div className="w-14 h-14 bg-[#00A3FF]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Lock className="w-7 h-7 text-[#00A3FF]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Risco-como-Serviço</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Não oferecemos apenas software; entregamos certeza. Nossa infraestrutura assume a responsabilidade técnica da conformidade, transformando risco variável em custo fixo previsível.
                        </p>
                    </div>

                    <div className="glass-panel p-10 rounded-2xl border border-white/5 hover:border-[#00FF94]/30 transition-all group">
                        <div className="w-14 h-14 bg-[#00FF94]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Server className="w-7 h-7 text-[#00FF94]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Telemetria na Borda</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Latência zero para sua IA. Nosso <strong>Agente de Borda (Edge)</strong> coleta telemetria de risco assincronamente, sem nunca gargalar sua operação de produção.
                        </p>
                    </div>

                    <div className="glass-panel p-10 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group">
                        <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Shield className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Criptografia de Rastreio</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Logs de auditoria matematicamente imutáveis. Usamos criptografia de hash encadeado para garantir que seu histórico de governança seja à prova de adulteração (Anti-Poisoning).
                        </p>
                    </div>
                </section>

                {/* --- ARCHITECTURE DIAGRAM (Conceptual) --- */}
                <section id="architecture" className="mb-32 scroll-mt-32">
                    <div className="glass-panel p-12 rounded-3xl border border-white/10 bg-[#0A1A2F]/50 relative overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                                    A Infraestrutura Invisível de <br />
                                    <span className="text-[#00FF94]">Confiança Digital</span>
                                </h2>
                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#00A3FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="font-mono font-bold text-[#00A3FF]">01</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Interceptação Segura</h4>
                                            <p className="text-gray-400">Todo prompt passa pelo nosso Ethical Guardrail antes de chegar na OpenAI/Azure. Bloqueamos PII e toxicidade na origem.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#00FF94]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="font-mono font-bold text-[#00FF94]">02</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Cofre de Evidências</h4>
                                            <p className="text-gray-400">Logs são assinados e armazenados em cofre imutável. Sua prova de inocência jurídica, gerada automaticamente.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="font-mono font-bold text-purple-400">03</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Índice Atuarial (ARI)</h4>
                                            <p className="text-gray-400">Calculamos seu Score de Risco em tempo real para reduzir prêmios de seguro e desbloquear vendas B2B.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pseudo-Diagram */}
                            <div className="relative h-[400px] w-full bg-[#050511] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
                                {/* Animated Pulse Nodes */}
                                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#00A3FF]/20 rounded-full blur-[40px] animate-pulse" />
                                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#00FF94]/20 rounded-full blur-[40px] animate-pulse delay-700" />

                                <div className="relative z-10 text-center">
                                    <div className="text-xs font-mono text-gray-500 mb-2">MONITORAMENTO AO VIVO</div>
                                    <div className="text-4xl font-bold font-mono text-[#00FF94]">99.98%</div>
                                    <div className="text-sm text-gray-400">Taxa de Conformidade</div>

                                    <div className="mt-8 flex justify-center gap-4">
                                        <div className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30">Bloqueados: 142</div>
                                        <div className="px-3 py-1 bg-[#00FF94]/20 text-[#00FF94] text-xs rounded border border-[#00FF94]/30">Verificados: 8.4k</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- LOGO WALL / TRUST --- */}
                <section className="text-center mb-32">
                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-10">Compatível com o Ecossistema Moderno</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos (Text for now) */}
                        <span className="text-2xl font-bold font-serif text-white">OpenAI</span>
                        <span className="text-2xl font-bold font-serif text-white">Azure</span>
                        <span className="text-2xl font-bold font-serif text-white">AWS Bedrock</span>
                        <span className="text-2xl font-bold font-serif text-white">LangChain</span>
                        <span className="text-2xl font-bold font-serif text-white">LlamaIndex</span>
                    </div>
                </section>

                {/* --- CTA FINAL --- */}
                <section className="bg-gradient-to-r from-[#00A3FF]/10 to-[#00FF94]/10 rounded-3xl p-12 lg:p-24 text-center border border-white/10 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Pronto para blindar sua operação?</h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Não espere a notificação da ANPD. Implemente o ALGOR Trust Hub e transforme compliance em vantagem competitiva hoje.
                        </p>
                        <Link
                            href="https://wa.me/558599851769?text=Quero%20blindar%20minha%20operação%20com%20ALGOR%20Trust%20Hub."
                            className="inline-flex px-10 py-5 bg-white text-[#0A1A2F] font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors shadow-2xl items-center gap-3"
                        >
                            Falar com Engenheiro de Soluções
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00A3FF]/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00FF94]/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
                </section>

            </div>
        </div>
    );
}

// Simple internal icon component for specific use
function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
