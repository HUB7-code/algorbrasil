"use client";

import { ShieldCheck, Zap, Activity, FileText, ArrowRight, Star, Lock, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import AssessmentWizard from "@/components/dashboard/assessments/AssessmentWizard";

export default function AssessmentsPage() {
    const [showWizard, setShowWizard] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('new') === 'true') {
            setShowWizard(true);
        }
    }, [searchParams]);

    if (showWizard) {
        return <AssessmentWizard onCancel={() => {
            setShowWizard(false);
            router.replace('/dashboard/assessments'); // Clear query param on cancel
        }} />;
    }

    return (
        <div className="p-8 w-full min-h-screen space-y-10 relative text-white font-sans">
            {/* Header Section */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2 tracking-tight">
                        Central de Auditoria
                    </h1>
                    <p className="text-gray-300 font-light text-lg">
                        Selecione o protocolo de validação para sua infraestrutura IA.
                    </p>
                </div>
            </div>

            {/* Protocol Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">

                {/* 1. PROTOCOL: ISO 42001 */}
                <AssessmentCard
                    title="ISO 42001 Full Scan"
                    description="Diagnóstico completo de governança, riscos e conformidade para certificação internacional."
                    rationale="Padrão ouro para desbloquear contratos Enterprise e reduzir prêmios de seguro cibernético."
                    icon={<ShieldCheck className="w-8 h-8 text-[#00FF94]" />}
                    color="text-[#00FF94]"
                    bg="bg-[#00FF94]/10"
                    badge="Most Popular"
                    cost="2 Credits"
                    onClick={() => setShowWizard(true)}
                />

                {/* 2. PROTOCOL: LIA Flash */}
                <AssessmentCard
                    title="L.I.A. Flash"
                    description="Avaliação de Impacto Algorítmico rápida para novos modelos ou updates menores."
                    rationale="Exigência do Art. 38 da LGPD sempre que houver tratamento de dados de alto risco."
                    icon={<Zap className="w-8 h-8 text-[#00A3FF]" />}
                    color="text-[#00A3FF]"
                    bg="bg-[#00A3FF]/10"
                    cost="1 Credit"
                    onClick={() => alert("Em breve: LIA Flash")}
                />

                {/* 3. PROTOCOL: Data Clean Room */}
                <AssessmentCard
                    title="Data Clean Room Check"
                    description="Validação de ambiente seguro para processamento de dados sensíveis."
                    rationale="Permite cruzar dados com parceiros (Retail Media) sem revelar PII, garantindo anonimização."
                    icon={<Lock className="w-8 h-8 text-aurora-violet" />}
                    color="text-aurora-violet"
                    bg="bg-aurora-violet/10"
                    badge="Enterprise"
                    cost="5 Credits"
                    onClick={() => alert("Recurso 'Data Clean Room' disponível no ciclo v10.5 (Enterprise).")}
                />

                {/* 4. TOOL: Policy Generator (New Strategic Addition) */}
                <AssessmentCard
                    title="Gerador de Políticas"
                    description="Crie minutas de Governança de IA (PL 2338) personalizadas para sua empresa."
                    rationale="Gera documentos jurídicos iniciais para Terms of Use e Política de Privacidade de IA."
                    icon={<FileText className="w-8 h-8 text-white" />}
                    color="text-white"
                    bg="bg-white/10"
                    badge="New Tool"
                    cost="Free"
                    onClick={() => router.push("/dashboard/growth?tab=policy")}
                />
            </div>

            {/* History Section */}
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <h3 className="text-xl font-serif font-medium mb-6 flex items-center gap-2 text-white">
                    <Activity className="w-5 h-5 text-gray-400" />
                    Histórico de Diagnósticos
                </h3>

                <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center group hover:border-white/20">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-inner border border-white/5 group-hover:scale-105 transition-transform duration-500">
                        <FileText className="w-8 h-8 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-gray-400 font-light max-w-sm mb-2">
                        Nenhum registro encontrado neste workspace.
                    </p>
                    <p className="text-sm text-gray-500 font-mono">
                        ID: WS-29384-RJ
                    </p>
                </div>
            </div>
        </div>
    );
}

// Componente Visual de Card de Seleção - GLASS DNA
function AssessmentCard({ title, description, icon, color, bg, badge, cost, onClick, rationale }: any) {
    return (
        <div
            onClick={onClick}
            className="glass-panel rounded-2xl p-8 flex flex-col justify-between h-[320px] relative group hover:border-[#00FF94]/30 cursor-pointer"
        >

            {/* Header */}
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-xl ${bg} border border-white/5`}>
                        {icon}
                    </div>
                    {badge && (
                        <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/10 text-gray-300 bg-white/5">
                            {badge}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-2xl font-serif font-medium text-white group-hover:text-[#00FF94] transition-colors">
                        {title}
                    </h3>
                    {rationale && (
                        <div className="relative group/tooltip z-50" onClick={(e) => e.stopPropagation()}>
                            <HelpCircle className="w-4 h-4 text-gray-500 hover:text-[#00FF94] cursor-help transition-colors" />
                            <div className="absolute left-0 bottom-8 w-64 p-4 bg-[#0A1A2F]/95 border border-[#00FF94]/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] text-xs text-gray-300 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity backdrop-blur-xl">
                                <span className="block text-[#00FF94] font-bold uppercase text-[10px] mb-1 tracking-wider">Por que usar?</span>
                                {rationale}
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-sm text-gray-400 leading-relaxed font-light group-hover:text-gray-300">
                    {description}
                </p>
            </div>

            {/* Footer / Action */}
            <div className="relative z-10 flex justify-between items-center border-t border-white/10 pt-6 mt-4">
                <div className="text-xs font-mono text-gray-500 flex items-center gap-1 group-hover:text-white transition-colors">
                    <Star className="w-3 h-3" /> {cost}
                </div>
                <button className="w-10 h-10 rounded-full bg-white text-[#0A1A2F] flex items-center justify-center hover:bg-[#00FF94] transition-colors shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
