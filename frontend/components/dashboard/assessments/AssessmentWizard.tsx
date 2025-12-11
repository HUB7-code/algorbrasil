"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    ShieldAlert,
    BrainCircuit,
    Lightbulb
} from "lucide-react";

// Mock das Perguntas ISO 42001 (Simplificadas para MVP)
const STEPS = [
    {
        id: "context",
        title: "Contexto da Organização",
        description: "Entendendo como a IA se encaixa no seu negócio.",
        questions: [
            {
                id: "q1",
                text: "Sua organização possui uma política formal de uso de IA?",
                options: [
                    { value: "yes", label: "Sim, documentada e comunicada.", score: 10 },
                    { value: "partial", label: "Em desenvolvimento / Informal.", score: 5 },
                    { value: "no", label: "Não possuímos.", score: 0 }
                ]
            },
            {
                id: "q2",
                text: "Vocês mapearam todos os sistemas de IA em uso atualmente?",
                options: [
                    { value: "yes", label: "Sim, inventário completo.", score: 10 },
                    { value: "partial", label: "Apenas os críticos.", score: 5 },
                    { value: "no", label: "Não sabemos o que está em uso.", score: 0 }
                ]
            }
        ]
    },
    {
        id: "risk",
        title: "Gestão de Riscos",
        description: "Avaliando vulnerabilidades e impactos.",
        questions: [
            {
                id: "q3",
                text: "Existe um processo de avaliação de impacto (AIA) antes de implantar novos modelos?",
                options: [
                    { value: "yes", label: "Sim, mandatório para todos.", score: 10 },
                    { value: "partial", label: "Apenas para projetos grandes.", score: 5 },
                    { value: "no", label: "Não realizamos.", score: 0 }
                ]
            },
            {
                id: "q4",
                text: "Como vocês monitoram 'alucinações' ou erros dos modelos em produção?",
                options: [
                    { value: "automated", label: "Monitoramento automatizado em tempo real.", score: 10 },
                    { value: "manual", label: "Revisão humana por amostragem.", score: 5 },
                    { value: "none", label: "Reagimos apenas a reclamações.", score: 0 }
                ]
            }
        ]
    },
    {
        id: "data",
        title: "Dados e Privacidade",
        description: "Conformidade LGPD nos dados de treinamento.",
        questions: [
            {
                id: "q5",
                text: "Os dados usados para treinar/finetunar modelos são anonimizados?",
                options: [
                    { value: "yes", label: "Sim, processo rigoroso.", score: 10 },
                    { value: "partial", label: "Parcialmente.", score: 5 },
                    { value: "no", label: "Usamos dados brutos.", score: -5 } // Penalidade
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
        }
    };

    const submitAssessment = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("algor_token");
            const res = await fetch("/api/v1/assessments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: "Diagnóstico Inicial ISO 42001",
                    answers: answers
                })
            });

            if (!res.ok) throw new Error("Erro ao salvar avaliação");

            // Sucesso! Redirecionar para dashboard ou resultado
            router.push("/dashboard?survey_completed=true");
        } catch (error) {
            console.error(error);
            alert("Erro ao enviar avaliação. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Check validação do passo atual: Todas as perguntas do passo atual foram respondidas?
    const canAdvance = currentStep.questions.every(q => answers[q.id]);

    return (
        <div className="max-w-4xl mx-auto w-full">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between text-xs font-mono text-brand-blue/60 mb-2 uppercase tracking-widest">
                    <span>Passo {currentStepIndex + 1} de {STEPS.length}</span>
                    <span>{Math.round(progress)}% Concluído</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-brand-green transition-all duration-500 ease-out shadow-[0_0_10px_#00FF94]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Main Card */}
            <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden min-h-[500px] flex flex-col justify-between">

                {/* Header do Passo */}
                <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 key={currentStep.id}">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                            {currentStep.id === 'risk' ? <ShieldAlert className="w-5 h-5" /> :
                                currentStep.id === 'data' ? <BrainCircuit className="w-5 h-5" /> :
                                    <Lightbulb className="w-5 h-5" />}
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white">
                            {currentStep.title}
                        </h2>
                    </div>
                    <p className="text-brand-blue/60 text-lg leading-relaxed max-w-2xl">
                        {currentStep.description}
                    </p>
                </div>

                {/* Perguntas */}
                <div className="space-y-8 mb-12">
                    {currentStep.questions.map((q) => (
                        <div key={q.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards">
                            <p className="text-white font-medium mb-4 text-lg">{q.text}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {q.options.map((opt) => {
                                    const isSelected = answers[q.id] === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleOptionSelect(q.id, opt.value)}
                                            className={`
                                                p-4 rounded-xl border text-left transition-all duration-200 relative group
                                                ${isSelected
                                                    ? 'bg-brand-green/10 border-brand-green text-white shadow-[0_0_15px_rgba(0,255,148,0.1)]'
                                                    : 'bg-white/5 border-white/5 text-brand-blue/60 hover:bg-white/10 hover:border-white/20 hover:text-white'
                                                }
                                            `}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-3 right-3 text-brand-green">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                            )}
                                            <span className="text-sm font-medium block pr-6">{opt.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStepIndex === 0}
                        className="text-white/40 hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={!canAdvance || isSubmitting}
                        className={`
                            bg-white text-black hover:bg-brand-green hover:text-black transition-all shadow-lg
                            ${!canAdvance ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                        `}
                    >
                        {isSubmitting ? "Finalizando..." : isLastStep ? "Concluir Diagnóstico" : "Próxima Etapa"}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
