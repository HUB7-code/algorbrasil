"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

// Schema de Perguntas (Mantido)
const STEPS = [
    {
        id: "data_provenance",
        title: "Origem & Segurança de Dados",
        description: "Avaliando a toxicidade e a conformidade da sua infraestrutura de dados atual.",
        icon: "database", // Google Material Icon
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
        icon: "speed",
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
        icon: "shield",
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

export default function AssessmentWizard() {
    const router = useRouter();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentStep = STEPS[currentStepIndex];
    const isLastStep = currentStepIndex === STEPS.length - 1;
    // Progress starts at 0% (Index 0 / 3 = 0)
    const progress = (currentStepIndex / STEPS.length) * 100;

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
        }
    };

    const submitAssessment = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('algor_token');
            if (!token) {
                // Se não tem token, salva estado enciclopédico localmente (opcional) e pede login
                router.push('/login?redirect=dashboard/risk-assessment'); // Ajuste conforme rota real de login
                return;
            }

            const response = await fetch('/api/v1/assessments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: `Auditoria Inicial - ${new Date().toLocaleDateString()}`,
                    answers: answers
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Sucesso: Redireciona para a página de detalhes
                router.push(`/dashboard/assessments/${data.id}`);
            } else {
                if (response.status === 401) {
                    router.push('/login');
                } else {
                    console.error("Falha ao enviar:", await response.text());
                    alert("Erro ao salvar avaliação. Tente novamente."); // TODO: Usar Toast decente
                }
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
        <div className="max-w-4xl mx-auto w-full pb-10">
            {/* M3 Linear Progress Indicator */}
            <div className="mb-8 max-w-xl mx-auto">
                <div className="flex justify-between text-xs font-medium text-[#C4C7C5] mb-2 px-1">
                    <span>Etapa {currentStepIndex + 1} de {STEPS.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-[#444746] rounded-full overflow-hidden w-full">
                    <div
                        className="h-full bg-[#A8C7FA] transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Main Content Card - Google Surface */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }} // Emphasized Decelerate
                    className="bg-[#1E1F20] border border-[#444746] p-8 md:p-10 rounded-[28px] shadow-sm relative overflow-hidden"
                >
                    {/* Header with Icon */}
                    <div className="flex items-start gap-6 mb-10">
                        <div className="w-12 h-12 rounded-full bg-[#3E4042] flex items-center justify-center text-[#A8C7FA]">
                            <span className="material-symbols-rounded text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                {currentStep.icon}
                            </span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h2 className="text-2xl font-normal text-[#E3E3E3] mb-1">{currentStep.title}</h2>
                            <p className="text-sm text-[#C4C7C5] leading-relaxed">{currentStep.description}</p>
                        </div>
                    </div>

                    {/* Questions Group */}
                    <div className="space-y-12">
                        {currentStep.questions.map((q) => (
                            <div key={q.id}>
                                <h3 className="text-[#E3E3E3] font-medium mb-4 text-base flex items-center gap-2">
                                    {q.text}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {q.options.map((opt) => {
                                        const isSelected = answers[q.id] === opt.value;
                                        return (
                                            <button
                                                key={opt.value}
                                                onClick={() => handleOptionSelect(q.id, opt.value)}
                                                className={`
                                                    relative px-5 py-6 rounded-[16px] text-left transition-all duration-200 border
                                                    flex flex-col gap-3 group
                                                    ${isSelected
                                                        ? 'bg-[#004A77] border-[#A8C7FA] text-[#D3E3FD]' // Selected State (Primary Container)
                                                        : 'bg-[#1E1F20] border-[#8E918F] text-[#C4C7C5] hover:bg-[#444746]/30' // Inactive
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    <span className={`material-symbols-rounded text-2xl ${isSelected ? 'text-[#A8C7FA]' : 'text-[#8E918F]'}`}>
                                                        {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                                                    </span>
                                                </div>
                                                <span className={`text-sm font-medium leading-tight ${isSelected ? 'text-[#D3E3FD]' : 'text-[#E3E3E3]'}`}>
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
            <div className="flex justify-between items-center mt-8 px-2 max-w-2xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStepIndex === 0}
                    className="text-[#A8C7FA] hover:bg-[#004A77]/30 rounded-full px-6 text-sm font-medium h-10"
                >
                    Voltar
                </Button>

                <Button
                    onClick={handleNext}
                    disabled={!canAdvance}
                    className={`
                        rounded-full px-8 h-12 text-sm font-medium tracking-wide transition-all shadow-sm
                        flex items-center gap-2
                        ${!canAdvance
                            ? 'bg-[#1E1F20] text-[#8E918F] cursor-not-allowed border border-[#444746]' // Disabled
                            : 'bg-[#A8C7FA] text-[#062E6F] hover:bg-[#D3E3FD] shadow-md' // Enabled Primary
                        }
                    `}
                >
                    {isLastStep ? "Concluir" : "Próximo"}
                    {!isLastStep && <span className="material-symbols-rounded text-lg">arrow_forward</span>}
                </Button>
            </div>
        </div>
    );
}
