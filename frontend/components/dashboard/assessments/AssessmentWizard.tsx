"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useOrganization } from "@/context/OrganizationContext";
import { Database, Gauge, Shield, CheckCircle2, Circle, ArrowRight, ChevronLeft, Check, AlertTriangle, Lock } from "lucide-react";

// Schema de Perguntas (Mantido)
const STEPS = [
    {
        id: "data_provenance",
        title: "Origem & Segurança de Dados",
        description: "Avaliando a toxicidade e a conformidade da sua infraestrutura de dados atual.",
        icon: Database,
        questions: [
            {
                id: "data_source",
                text: "Qual a fonte primária de dados para treinamento/retargeting?",
                options: [
                    { value: "first_party_clean", label: "First-Party (Coletado com Consentimento)", score: 10 },
                    { value: "mixed_enriched", label: "Misto (Enriquecido via Bureau)", score: 5 },
                    { value: "third_party_bought", label: "Listas Compradas / Cold Data", score: 0 }
                ]
            },
            {
                id: "clean_room",
                text: "Utiliza Data Clean Rooms para cruzamento de audiências?",
                options: [
                    { value: "active", label: "Sim, ambiente criptografado ativo", score: 10 },
                    { value: "planned", label: "Em planejamento/implementação", score: 5 },
                    { value: "none", label: "Não, cruzamento direto (CSV/Excel)", score: 0 }
                ]
            }
        ]
    },
    {
        id: "consent_velocity",
        title: "Velocidade de Consentimento",
        description: "Capacidade de respeitar os direitos do titular em tempo real (LGPD Art. 18).",
        icon: Gauge,
        questions: [
            {
                id: "opt_out_mechanism",
                text: "O que acontece quando um lead pede Opt-out?",
                options: [
                    { value: "automated_realtime", label: "Remoção automática em < 24h", score: 10 },
                    { value: "manual_process", label: "Processo manual (Planilha)", score: 3 },
                    { value: "ignored", label: "Não há processo definido", score: 0 }
                ]
            },
            {
                id: "cookie_sync",
                text: "Sua IA de retargeting respeita o Consent Mode?",
                options: [
                    { value: "full_sync", label: "Sim, bloqueia cookies sem aceite", score: 10 },
                    { value: "partial", label: "Apenas aviso de banner", score: 5 },
                    { value: "none", label: "Ignora preferências", score: 0 }
                ]
            }
        ]
    },
    {
        id: "brand_safety",
        title: "Segurança de Marca & IA",
        description: "Mitigação de riscos de alucinação e danos à reputação.",
        icon: Shield,
        questions: [
            {
                id: "creative_review",
                text: "Como os criativos gerados por IA são validados?",
                options: [
                    { value: "human_audit", label: "Auditoria Humana (HITL)", score: 10 },
                    { value: "automated_check", label: "Checagem automatizada básica", score: 5 },
                    { value: "no_review", label: "Publicação direta sem revisão", score: 0 }
                ]
            },
            {
                id: "hallucination_risk",
                text: "Seu chatbot de vendas tem travas de segurança?",
                options: [
                    { value: "rag_controlled", label: "RAG estrito (Base de conhecimento fechada)", score: 10 },
                    { value: "prompt_eng", label: "Apenas Prompt Engineering", score: 5 },
                    { value: "open_model", label: "Modelo Aberto (Cria livremente)", score: 0 }
                ]
            }
        ]
    }
];

export default function AssessmentWizard({ onCancel }: { onCancel?: () => void }) {
    const router = useRouter();
    const { currentOrganization } = useOrganization();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentStep = STEPS[currentStepIndex];
    const isLastStep = currentStepIndex === STEPS.length - 1;
    // Progress starts at 0%
    const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

    const handleOptionSelect = (questionId: string, optionValue: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionValue }));
    };

    const handleNext = async () => {
        if (isLastStep) {
            await submitAssessment();
        } else {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        } else if (onCancel) {
            onCancel();
        }
    };

    const submitAssessment = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('algor_token');
            if (!token) {
                // Se não tem token, forçar login
                alert("Sessão expirada. Faça login novamente.");
                router.push('/login');
                return;
            }

            let url = '/api/v1/assessments/';
            // TODO: Se backend suportar organization_id na query
            if (currentOrganization) {
                // url += `?organization_id=${currentOrganization.id}`;
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: `Auditoria ISO 42001 - ${new Date().toLocaleDateString()}`,
                    answers_payload: answers, // Backend espera answers_payload
                    status: "completed",
                    score_total: 85 // Calcular real score depois
                })
            });

            if (response.ok) {
                const data = await response.json();
                router.push(`/dashboard/assessments/${data.id}`);
            } else {
                console.error("Falha ao enviar:", await response.text());
                alert("Erro ao salvar avaliação. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Erro de conexão com o servidor.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const canAdvance = currentStep.questions.every(q => answers[q.id]);

    return (
        <div className="max-w-4xl mx-auto w-full pb-10 font-sans">
            {/* Progress Indicator */}
            <div className="mb-8 max-w-xl mx-auto">
                <div className="flex justify-between text-xs font-medium text-gray-400 mb-2 px-1">
                    <span>Etapa {currentStepIndex + 1} de {STEPS.length}</span>
                    <span className="text-[#00FF94]">{Math.round(progress)}% Concluído</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full">
                    <div
                        className="h-full bg-[#00FF94] shadow-[0_0_10px_#00FF94] transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Main Content Card - Glass Panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel p-8 md:p-10 rounded-[28px] relative overflow-hidden bg-[#0A1A2F]/60 backdrop-blur-xl border border-white/10"
                >
                    {/* Header with Icon */}
                    <div className="flex items-start gap-6 mb-10 border-b border-white/5 pb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00A3FF]/20 to-[#00FF94]/10 border border-[#00A3FF]/30 flex items-center justify-center text-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.2)]">
                            <currentStep.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1 pt-1">
                            <h2 className="text-2xl font-semibold text-white mb-2">{currentStep.title}</h2>
                            <p className="text-gray-400 leading-relaxed font-light text-lg">{currentStep.description}</p>
                        </div>
                    </div>

                    {/* Questions Group */}
                    <div className="space-y-12">
                        {currentStep.questions.map((q) => (
                            <div key={q.id}>
                                <h3 className="text-gray-200 font-medium mb-5 text-lg flex items-center gap-3">
                                    <span className="w-1 h-6 bg-[#00FF94] rounded-full sm:block hidden"></span>
                                    {q.text}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {q.options.map((opt) => {
                                        const isSelected = answers[q.id] === opt.value;
                                        return (
                                            <button
                                                key={opt.value}
                                                onClick={() => handleOptionSelect(q.id, opt.value)}
                                                className={`
                                                    relative px-5 py-6 rounded-xl text-left transition-all duration-300 border
                                                    flex flex-col gap-3 group
                                                    ${isSelected
                                                        ? 'bg-[#00A3FF]/10 border-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.15)]' // Selected
                                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20' // Inactive
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center justify-between w-full mb-1">
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-[#00A3FF] bg-[#00A3FF]' : 'border-gray-500'}`}>
                                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                </div>
                                                <span className={`text-sm font-medium leading-snug ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                    {opt.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 px-4 max-w-3xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full px-6 gap-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                </Button>

                <Button
                    onClick={handleNext}
                    disabled={!canAdvance}
                    className={`
                        rounded-full px-8 h-12 text-sm font-bold tracking-wide transition-all shadow-lg
                        flex items-center gap-3
                        ${!canAdvance
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' // Disabled
                            : 'bg-gradient-to-r from-[#00A3FF] to-[#006097] text-white hover:shadow-[0_0_20px_rgba(0,163,255,0.4)] hover:scale-105' // Enabled
                        }
                    `}
                >
                    {isLastStep ? (isSubmitting ? "Enviando..." : "Finalizar Auditoria") : "Próxima Etapa"}
                    {!isLastStep && <ArrowRight className="w-5 h-5" />}
                </Button>
            </div>
        </div>
    );
}
