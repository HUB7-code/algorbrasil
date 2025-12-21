'use client';

import React from 'react';
import { ShieldCheck, Globe, Scale } from 'lucide-react';

export default function AboutSection() {
    return (
        <section id="about-algor" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-navy/50 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[80px] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                            <Globe className="w-4 h-4 text-brand-green" />
                            <span className="text-sm font-mono text-brand-green tracking-wider uppercase">Divisão Brasil - Algor UK</span>
                        </div>

                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                            A Autoridade que Define <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue">
                                o Padrão da IA no Brasil.
                            </span>
                        </h2>

                        <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                            <p>
                                <strong className="text-white font-medium">A ALGOR Brasil</strong> transcende o modelo tradicional de consultoria. Somos uma infraestrutura estratégica composta por especialistas, auditores e líderes de tecnologia sob licença da <strong>Algor UK</strong>.
                            </p>
                            <p>
                                Nossa missão é clara: implementar o padrão global de segurança e governança de IA (<strong>ISO 42001</strong>), com alinhamento rigoroso à <strong>LGPD</strong> e ao <strong>PL 2338/23</strong>.
                            </p>
                            <p className="border-l-4 border-brand-green pl-6 py-2 italic text-gray-300">
                                "Unimos inteligência global à realidade regulatória brasileira para garantir que sua inovação seja segura, ética e auditável."
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-10 flex flex-wrap gap-8 opacity-80">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-brand-green" />
                                <span className="font-mono text-xs uppercase tracking-wider text-white">ISO 42001 Native</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Scale className="w-6 h-6 text-brand-blue" />
                                <span className="font-mono text-xs uppercase tracking-wider text-white">LGPD Compliant</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual/Stats */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/20 to-brand-blue/20 rounded-3xl blur-2xl transform rotate-3 scale-95" />
                        <div className="glass-panel rounded-3xl p-10 border border-white/10 relative z-10 bg-[#0A1A2F]/80 backdrop-blur-xl">
                            <div className="grid grid-cols-2 gap-8 text-center">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-4xl font-bold text-brand-green mb-2 font-mono">+45</div>
                                    <div className="text-xs uppercase tracking-widest text-gray-400">Auditorias Realizadas</div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-4xl font-bold text-brand-blue mb-2 font-mono">100%</div>
                                    <div className="text-xs uppercase tracking-widest text-gray-400">Aprovação ISO</div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 col-span-2">
                                    <div className="text-4xl font-bold text-white mb-2 font-mono">UK & BR</div>
                                    <div className="text-xs uppercase tracking-widest text-gray-400">Presença Internacional</div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10 text-center">
                                <p className="text-sm text-gray-400">Liderando o debate regulatório com técnica e inovação.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
