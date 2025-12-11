"use client";

import Link from "next/link";
import { ArrowLeft, Scale, Lock } from "lucide-react";

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen w-full bg-[#0A1A2F] text-white p-6 pb-20 font-sans">
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Header */}
                <div className="space-y-4">
                    <Link href="/register" className="inline-flex items-center gap-2 text-brand-blue/60 hover:text-brand-green transition-colors font-mono text-xs">
                        <ArrowLeft className="w-4 h-4" /> VOLTAR PARA CADASTRO
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white">
                        Termos de <span className="text-brand-blue">Uso e Privacidade</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                        Condições legais para utilização da plataforma SaaS de Governança e Auditoria de IA.
                    </p>
                </div>

                {/* Content Card */}
                <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 bg-[#0A1A2F]/80 backdrop-blur-xl relative overflow-hidden">

                    {/* Decorative Background */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-white prose-a:text-brand-blue prose-strong:text-brand-blue">

                        <h3>1. Aceite dos Termos</h3>
                        <p>
                            Ao acessar a plataforma <strong>Algor Console</strong>, você concorda expressamente com estes termos. O uso das ferramentas de diagnóstico implica no reconhecimento de que os relatórios gerados são ferramentas de apoio à decisão e não constituem, por si só, certificação legal sem a validação de um auditor humano credenciado.
                        </p>

                        <h3>2. Proteção de Dados e LGPD</h3>
                        <p>
                            Em conformidade com a Lei 13.709/2018 (LGPD):
                        </p>
                        <ul>
                            <li><strong>Titularidade:</strong> Você mantém a propriedade intelectual sobre os dados brutos inseridos na plataforma.</li>
                            <li><strong>Processamento:</strong> A Algor Brasil atua como Operadora e Controladora, utilizando dados anonimizados para calibração de modelos estatísticos de risco (Benchmarking setorial).</li>
                            <li><strong>Segurança:</strong> Utilizamos criptografia AES-256 em repouso e TLS 1.3 em trânsito.</li>
                        </ul>

                        <h3>3. Propriedade Intelectual</h3>
                        <p>
                            A metodologia de cálculo de risco, os algoritmos de "Neural Scoring" e a interface do sistema são propriedade exclusiva da Algor Brasil. É proibida a cópia, redistribuição ou engenharia reversa do código-fonte.
                        </p>

                        <h3>4. Limitação de Responsabilidade</h3>
                        <p>
                            A plataforma não garante "imunidade jurídica" completa contra sanções da ANPD ou processos civis. Nosso objetivo é mitigar riscos técnicos e processuais através das melhores práticas da ISO 42001. A responsabilidade final pela implementação dos controles é da organização usuária.
                        </p>

                        <div className="my-8 p-6 rounded-xl bg-white/5 border-l-4 border-brand-blue">
                            <h4 className="flex items-center gap-2 mt-0 mb-2">
                                <Lock className="w-5 h-5 text-brand-blue" />
                                Consentimento Clarificado
                            </h4>
                            <p className="m-0 text-sm text-gray-300">
                                Para fins de auditoria, todas as ações realizadas dentro do Console (criação de projetos, deleção de dados, alteração de scores) são registradas em logs imutáveis, acessíveis às autoridades competentes mediante ordem judicial.
                            </p>
                        </div>

                    </div>
                </div>

                <div className="text-center text-xs text-brand-blue/40 font-mono">
                    Última atualização: 11 de Dezembro de 2025 • Depto. Jurídico Algor Brasil
                </div>

            </div>
        </main>
    );
}
