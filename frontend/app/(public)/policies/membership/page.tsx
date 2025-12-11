"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export default function MembershipPolicyPage() {
    return (
        <main className="min-h-screen w-full bg-[#0A1A2F] text-white p-6 pb-20 font-sans">
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Header */}
                <div className="space-y-4">
                    <Link href="/register" className="inline-flex items-center gap-2 text-brand-blue/60 hover:text-brand-green transition-colors font-mono text-xs">
                        <ArrowLeft className="w-4 h-4" /> VOLTAR PARA CADASTRO
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white">
                        Política de <span className="text-brand-green">Membros</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                        Diretrizes para governança, conduta ética e responsabilidades dos associados do Ecossistema Algor Brasil.
                    </p>
                </div>

                {/* Content Card */}
                <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 bg-[#0A1A2F]/80 backdrop-blur-xl relative overflow-hidden">

                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-white prose-a:text-brand-green prose-strong:text-brand-green">

                        <h3>1. Premissas Fundamentais</h3>
                        <p>
                            A associação ao Algor Brasil é restrita a profissionais e organizações comprometidos com a <strong>Ética na Inteligência Artificial</strong> e a conformidade com a norma <strong>ISO/IEC 42001</strong>. Todos os membros devem agir como guardiões da integridade tecnológica.
                        </p>

                        <h3>2. Categorias de Associação</h3>
                        <ul>
                            <li><strong>Membros Individuais (Auditores/Consultores):</strong> Profissionais qualificados ou em formação para realizar diagnósticos de conformidade.</li>
                            <li><strong>Membros Corporativos:</strong> Organizações que buscam auditar seus próprios modelos ou de terceiros sob a tutela do framework Algor.</li>
                        </ul>

                        <h3>3. Código de Conduta</h3>
                        <p>
                            É mandatório o sigilo absoluto sobre dados sensíveis auditados. O uso da plataforma para espionagem industrial, engenharia reversa não autorizada ou qualquer prática "Black Hat" resultará em expulsão imediata e sanções legais.
                        </p>

                        <h3>4. Participação e Certificação</h3>
                        <p>
                            A manutenção do status de membro requer atualização constante. Os membros devem completar os ciclos de reciclagem anual sobre novas regulações (ex: PL 2338, EU AI Act) disponibilizados na plataforma.
                        </p>

                        <div className="my-8 p-6 rounded-xl bg-white/5 border-l-4 border-brand-green">
                            <h4 className="flex items-center gap-2 mt-0 mb-2">
                                <ShieldCheck className="w-5 h-5 text-brand-green" />
                                Compromisso de Conformidade
                            </h4>
                            <p className="m-0 text-sm text-gray-300">
                                Ao submeter sua solicitação, você declara sob as penas da lei que as informações fornecidas são verdadeiras e que não possui conflitos de interesse que impeçam sua atuação imparcial no ecossistema de governança.
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
