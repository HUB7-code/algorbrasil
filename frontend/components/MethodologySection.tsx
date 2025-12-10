import { Radar, FileCode, Terminal, RefreshCw } from "lucide-react";
import MaturityRadar from "./MaturityRadar";

export default function MethodologySection() {
    return (
        <section id="metodologia" className="w-full py-24 relative overflow-hidden bg-brand-navy">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

            <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: The Narrative & Steps */}
                <div>
                    <div className="mb-12">
                        <span className="font-mono text-brand-green text-sm tracking-widest uppercase mb-4 block">
                            // A Sala de Máquinas
                        </span>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Do Caos à <span className="text-brand-blue">Otimização Auditável</span>
                        </h2>
                        <p className="font-sans text-brand-blue/60 text-lg leading-relaxed">
                            Transformamos conformidade burocrática em um sistema operacional vivo. Nossa metodologia de 4 etapas garante alinhamento técnico e jurídico sem travar a inovação.
                        </p>
                    </div>

                    <div className="space-y-10 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-green/30 to-transparent hidden lg:block" />

                        {/* Step 1 */}
                        <div className="relative flex items-start gap-6 group cursor-default">
                            <div className="relative z-10 w-12 h-12 rounded-xl bg-[#0A1A2F] border border-brand-green/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,148,0.1)] group-hover:scale-110 transition-transform duration-300">
                                <Radar className="w-6 h-6 text-brand-green" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-brand-green transition-colors">1. Discovery & Diagnóstico</h3>
                                <p className="font-mono text-xs md:text-sm text-brand-blue/60 leading-relaxed">
                                    Varredura de "Shadow AI", inventário de algoritmos e cálculo do nível de maturidade inicial.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex items-start gap-6 group cursor-default">
                            <div className="relative z-10 w-12 h-12 rounded-xl bg-[#0A1A2F] border border-white/10 flex items-center justify-center group-hover:border-brand-blue/50 transition-colors duration-300">
                                <FileCode className="w-6 h-6 text-brand-blue" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors">2. Design do Framework</h3>
                                <p className="font-mono text-xs md:text-sm text-brand-blue/60 leading-relaxed">
                                    Criação da Carta de Governança, políticas de uso aceitável e alinhamento com ISO 42001.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex items-start gap-6 group cursor-default">
                            <div className="relative z-10 w-12 h-12 rounded-xl bg-[#0A1A2F] border border-white/10 flex items-center justify-center group-hover:border-purple-400/50 transition-colors duration-300">
                                <Terminal className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">3. Implementação Técnica</h3>
                                <p className="font-mono text-xs md:text-sm text-brand-blue/60 leading-relaxed">
                                    Integração de guardrails em LLMs, treinamento de equipes e deploy de sensores.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: The Visual Tech (Radar Component) */}
                <div className="relative mt-8 lg:mt-0">
                    <div className="absolute -inset-20 bg-brand-green/5 blur-[80px] rounded-full animate-pulse-slow pointer-events-none" />

                    <MaturityRadar />

                    {/* Insight Box */}
                    <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-colors border-l-4 border-l-brand-gold">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                                Insight de Mercado
                            </h4>
                            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                        </div>
                        <p className="font-mono text-xs text-brand-blue/80 leading-relaxed">
                            <strong className="text-white">83% das empresas</strong> ainda operam no Nível 1 (Ad Hoc). Nossa metodologia eleva sua operação ao <strong className="text-brand-green">Nível 3 (Estruturado)</strong> em 90 dias, habilitando escalabilidade segura de IA Generativa.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
