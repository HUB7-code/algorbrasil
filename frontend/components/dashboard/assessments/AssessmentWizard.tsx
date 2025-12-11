"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

// Schema de Perguntas (Mantido)
const STEPS = [
    {
        id: "context",
        title: "Contexto & Papel",
        description: "Definindo a posição da sua organização na cadeia de valor da IA.",
        icon: "domain", // Google Material Icon Name
        questions: [
            {
                id: "role",
                text: "Qual o papel principal da sua organização?",
                options: [
                    { value: "provider", label: "Desenvolvedor (Cria o modelo)", score: 10 },
                    { value: "deployer", label: "Usuário (Utiliza IA de terceiros)", score: 5 },
                    { value: "integrator", label: "Integrador (Conecta APIs)", score: 8 }
                ]
            },
            {
                id: "scope",
                text: "Qual o escopo de aplicação da IA?",
                options: [
                    { value: "internal", label: "Apenas Processos Internos", score: 10 },
                    { value: "customer", label: "Interação com Clientes", score: 5 },
                    { value: "decision", label: "Decisão Automatizada Crítica", score: 0 }
                ]
            }
        ]
    },
    {
        id: "risk_level",
        title: "Classificação de Risco",
        description: "Identificando o nível regulatório (EU AI Act).",
        icon: "warning",
        questions: [
            {
                id: "data_category",
                text: "O sistema processa dados sensíveis?",
                options: [
                    { value: "none", label: "Não processa dados pessoais", score: 10 },
                    { value: "personal", label: "Dados pessoais comuns", score: 5 },
                    { value: "sensitive", label: "Dados sensíveis/biométricos", score: 0 }
                ]
            },
            {
                id: "criticality",
                text: "Risco de impacto em direitos fundamentais?",
                options: [
                    { value: "no", label: "Impacto mínimo/reversível", score: 10 },
                    { value: "reputation", label: "Apenas financeiro/reputação", score: 5 },
                    { value: "rights", label: "Risco a direitos fundamentais", score: 0 }
                ]
            }
        ]
    },
    {
        id: "governance",
        title: "Maturidade de Governança",
        description: "Avaliação de controles administrativos e humanos.",
        icon: "gavel",
        questions: [
            {
                id: "policy",
                text: "Existe Política de Uso de IA documentada?",
                options: [
                    { value: "documented", label: "Sim, aprovada e comunicada", score: 10 },
                    { value: "draft", label: "Em rascunho/informal", score: 5 },
                    { value: "none", label: "Inexistente", score: 0 }
                ]
            },
            {
                id: "human_oversight",
                text: "Nível de Supervisão Humana (HITL)?",
                options: [
                    { value: "total", label: "Validação humana total", score: 10 },
                    { value: "partial", label: "Amostragem/Pós-evento", score: 5 },
                    { value: "none", label: "Autonomia total", score: 0 }
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

            const response = await fetch('http://localhost:8000/api/v1/assessments/', { // URL BASE DEVE VIR DE ENV EM PROD
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
                // Sucesso: Redireciona com flag para mostrar confete/modal
                router.push(`/dashboard?new_assessment_id=${data.id}&score=${data.score_total}`);
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
        <div className="max-w-4xl mx-auto w-full py-10">
            {/* Progress Bar */}
            <div className="mb-10 relative">
                <div className="flex justify-between text-xs font-semibold font-manrope text-gray-400 mb-3 uppercase tracking-wider pl-1">
                    <span>Etapa {currentStepIndex + 1} / {STEPS.length}</span>
                    <span className={isLastStep ? "text-[#00FF94] font-bold shadow-glow" : ""}>{Math.round(progress)}% Concluído</span>
                </div>
                <div className="h-2 bg-[#050B14] rounded-full overflow-hidden border border-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-[#00A3FF] via-[#00FF94] to-[#00A3FF] transition-all duration-700 ease-out relative shadow-[0_0_15px_rgba(0,163,255,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Main Content Area - Fluid transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom "Google-like" easing
                    className="bg-[#0A1A2F]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                >
                    {/* Glossy Reflection (Subtle) */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

                    {/* Step Header */}
                    <div className="flex items-start gap-6 mb-12">
                        <div className="w-16 h-16 rounded-2xl bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF] border border-[#00A3FF]/20 shadow-[0_0_30px_rgba(0,163,255,0.15)]">
                            <span className="material-symbols-rounded text-4xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                                {currentStep.icon}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-display font-bold text-white mb-2">{currentStep.title}</h2>
                            <p className="text-lg text-slate-300 font-light leading-relaxed">{currentStep.description}</p>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-10">
                        {currentStep.questions.map((q) => (
                            <div key={q.id}>
                                <h3 className="text-white font-medium mb-4 text-lg flex items-center gap-2">
                                    <span className="material-symbols-rounded text-[#00FF94] text-sm">arrow_forward_ios</span>
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
                                                    relative px-6 py-5 rounded-3xl text-left transition-all duration-300 border
                                                    flex items-center gap-3 group
                                                    ${isSelected
                                                        ? 'bg-[#00FF94]/10 text-white border-[#00FF94] shadow-[0_0_20px_rgba(0,255,148,0.2)] scale-[1.02]'
                                                        : 'bg-[#112240] text-slate-400 border-white/5 hover:bg-[#1a355e] hover:border-[#00A3FF]/50 hover:text-white'
                                                    }
                                                `}
                                            >
                                                {isSelected ? (
                                                    <span className="material-symbols-rounded text-xl animate-in zoom-in spin-in-90 duration-300 text-[#00FF94]">check_circle</span>
                                                ) : (
                                                    <span className="material-symbols-rounded text-xl text-white/20 group-hover:text-[#00A3FF] transition-colors">radio_button_unchecked</span>
                                                )}
                                                <span className="text-sm font-semibold leading-tight">{opt.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                </motion.div>
            </AnimatePresence>

            {/* Navigation Fab-like Buttons */}
            <div className="flex justify-between items-center mt-8 px-4">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStepIndex === 0}
                    className="text-slate-500 hover:text-white hover:bg-white/5 rounded-full px-6"
                >
                    Voltar
                </Button>

                <Button
                    onClick={handleNext}
                    disabled={!canAdvance}
                    className={`
                        rounded-full px-8 py-6 text-base font-bold tracking-wide transition-all shadow-lg
                        flex items-center gap-2
                        ${!canAdvance
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                            : 'bg-[#00FF94] text-[#0A1A2F] hover:bg-[#00DD83] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,148,0.4)]'
                        }
                    `}
                >
                    {isLastStep ? "Finalizar Diagnóstico" : "Continuar"}
                    <span className="material-symbols-rounded">arrow_forward</span>
                </Button>
            </div>
        </div>
    );
}
