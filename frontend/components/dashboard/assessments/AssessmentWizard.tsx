"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useOrganization } from "@/context/OrganizationContext";
import { Database, Gauge, Shield, ArrowRight, ChevronLeft, Check, Info } from "lucide-react";

// Schema de Perguntas (Enriquecido com Contexto Educativo)
const STEPS = [
    {
        id: "data_provenance",
        title: "Origem & Segurança de Dados",
        description: "Avaliando a toxicidade e a conformidade da sua infraestrutura de dados atual.",
        icon: Database,
        questions: [
            {
                id: "data_source",
                text: "Qual a fonte primária de dados?",
                helpText: "Dados coletados diretamente (First-Party) possuem menor risco jurídico que listas compradas.",
                rationale: "Art. 7 da LGPD: O legítimo interesse ou consentimento deve ser comprovável na origem.",
                options: [
                    { value: "first_party_clean", label: "First-Party (Coletado com Consentimento)", score: 10 },
                    { value: "mixed_enriched", label: "Misto (Enriquecido via Bureau)", score: 5 },
                    { value: "third_party_bought", label: "Listas Compradas / Cold Data", score: 0 }
                ]
            },
            {
                id: "clean_room",
                text: "Utiliza Data Clean Rooms?",
                helpText: "Clean Rooms são ambientes seguros onde dados de duas empresas são cruzados sem revelar PII.",
                rationale: "Essencial para parcerias de Retail Media e Co-Marketing sem ferir privacidade.",
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
                text: "Processo de Opt-out (Descadastro)",
                helpText: "Se um usuário pede para sair, quanto tempo leva para ele parar de receber anúncios?",
                rationale: "A demora no opt-out é a princpal causa de denúncias na ANPD.",
                options: [
                    { value: "automated_realtime", label: "Remoção automática em < 24h", score: 10 },
                    { value: "manual_process", label: "Processo manual (Planilha)", score: 3 },
                    { value: "ignored", label: "Não há processo definido", score: 0 }
                ]
            },
            {
                id: "cookie_sync",
                text: "Respeito ao Consent Mode V2",
                helpText: "O Consent Mode V2 do Google avisa aos algoritmos se o usuário aceitou ou não ser rastreado.",
                rationale: "Sem isso, campanhas de Remarketing no Google/Meta podem ser bloqueadas.",
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
                text: "Validação de Criativos IA",
                helpText: "Imagens geradas por IA podem conter alucinações (ex: 6 dedos) ou viés preconceituoso.",
                rationale: "Publicar sem revisão humana (HITL) cria risco severo de crise de reputação.",
                options: [
                    { value: "human_audit", label: "Auditoria Humana (HITL)", score: 10 },
                    { value: "automated_check", label: "Checagem automatizada básica", score: 5 },
                    { value: "no_review", label: "Publicação direta sem revisão", score: 0 }
                ]
            },
            {
                id: "hallucination_risk",
                text: "Travas de Segurança no Chatbot",
                helpText: "Seu chatbot pode falar sobre concorrentes ou prometer descontos inexistentes?",
                rationale: "RAG (Retrieval Augmented Generation) limita a IA apenas aos seus PDFs aprovados.",
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
    // Progress: Start at 0% when on Step 1 (Index 0). Shows completion of PREVIOUS steps.
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

            // Remove trailing slash to avoid 307 Redirects which may strip Authorization headers
            let url = '/api/v1/assessments';

            // Passa organization_id se uma org estiver selecionada
            if (currentOrganization) {
                url += `?organization_id=${currentOrganization.id}`;
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
                if (response.status === 401) {
                    alert("Sessão expirada. Por favor, faça login novamente para salvar seu progresso.");
                    router.push('/login');
                    return;
                }
                const errorText = await response.text();
                console.error("Falha ao enviar:", errorText);
                alert("Erro ao salvar avaliação. Detalhes no console.");
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
        <div className="max-w-5xl mx-auto w-full pb-10 font-sans selection:bg-[#00FF94] selection:text-[#0A0E1A]">

            {/* Progress Header */}
            <div className="mb-10 max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-end mb-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-1">Status da Auditoria</span>
                        <span className="text-xl font-orbitron font-bold text-white">Etapa {currentStepIndex + 1} <span className="text-gray-600">/ {STEPS.length}</span></span>
                    </div>
                    <span className="text-[#00FF94] font-mono text-sm font-bold bg-[#00FF94]/10 px-3 py-1 rounded-full border border-[#00FF94]/20 shadow-[0_0_10px_rgba(0,255,148,0.2)]">
                        {Math.round(progress)}% Concluído
                    </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden w-full border border-white/5 relative">
                    {/* Glossy Progress Bar */}
                    <div
                        className="h-full bg-gradient-to-r from-[#00FF94] to-[#00A3FF] shadow-[0_0_20px_rgba(0,255,148,0.5)] transition-all duration-700 ease-out relative"
                        style={{ width: `${progress === 0 ? 5 : progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/30 animate-pulse-slow" />
                    </div>
                </div>
            </div>

            {/* Main Content Card - Glass Panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, x: 50, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative overflow-hidden bg-[#0A0E1A]/80 backdrop-blur-2xl border border-white/[0.08] p-8 md:p-12 rounded-[32px] shadow-2xl shadow-black/50"
                >
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00A3FF]/5 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00FF94]/5 rounded-full blur-[120px] pointer-events-none" />

                    {/* Step Header */}
                    <div className="flex items-start gap-8 mb-12 border-b border-white/10 pb-8 relative z-10">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF] to-[#00FF94] rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative w-20 h-20 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center shadow-xl">
                                <currentStep.icon className="w-10 h-10 text-[#00A3FF] drop-shadow-[0_0_10px_rgba(0,163,255,0.5)]" />
                            </div>
                        </div>
                        <div className="flex-1 pt-2">
                            <h2 className="text-3xl font-bold font-orbitron text-white mb-3 tracking-wide">{currentStep.title}</h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl">{currentStep.description}</p>
                        </div>
                    </div>

                    {/* Questions Group */}
                    <div className="space-y-16 relative z-10 w-full max-w-5xl mx-auto">
                        {currentStep.questions.map((q) => (
                            <div key={q.id} className="relative">
                                {/* Vertical Connector Line */}
                                <div className="absolute left-[7px] top-10 bottom-[-40px] w-[2px] bg-gradient-to-b from-[#334155] to-transparent last:hidden md:hidden lg:block -z-10 opacity-30" />

                                <div className="mb-6 pl-4 md:pl-0">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-4 mb-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] shadow-[0_0_10px_#00FF94]" />
                                        {q.text}
                                    </h3>

                                    {(q as any).helpText && (
                                        <div className="mt-4 bg-[#0B1121]/80 rounded-xl border-l-[3px] border-[#00A3FF] p-5 flex gap-4 backdrop-blur-sm relative overflow-hidden group">
                                            {/* Tech Pattern Background */}
                                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

                                            <div className="mt-1 shadow-[0_0_20px_rgba(0,163,255,0.2)] rounded-full bg-[#00A3FF]/10 p-2 h-fit">
                                                <Info className="w-5 h-5 text-[#00A3FF]" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-300 leading-relaxed mb-3 text-sm">
                                                    {(q as any).helpText}
                                                </p>
                                                <div className="inline-flex items-center gap-2 bg-[#00A3FF]/10 border border-[#00A3FF]/20 px-3 py-1.5 rounded-lg">
                                                    <span className="text-[10px] font-bold font-orbitron text-[#00A3FF] uppercase tracking-wider">CONTEXTO REGULATÓRIO</span>
                                                    <div className="w-[1px] h-3 bg-[#00A3FF]/30" />
                                                    <span className="text-xs text-blue-200/80 font-mono">{(q as any).rationale}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pl-4 md:pl-5">
                                    {q.options.map((opt) => {
                                        const isSelected = answers[q.id] === opt.value;
                                        return (
                                            <motion.button
                                                key={opt.value}
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleOptionSelect(q.id, opt.value)}
                                                className={`
                                                    relative p-6 rounded-2xl text-left transition-all duration-300 border flex flex-col gap-4 group h-full
                                                    ${isSelected
                                                        ? 'bg-gradient-to-br from-[#00A3FF]/20 to-[#0A0E1A] border-[#00A3FF] shadow-[0_0_30px_rgba(0,163,255,0.15)] ring-1 ring-[#00A3FF]/50'
                                                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/20'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'border-[#00A3FF] bg-[#00A3FF]' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                                        {isSelected && <Check className="w-3 h-3 text-white stroke-[4]" />}
                                                    </div>
                                                </div>
                                                <span className={`text-sm font-medium leading-relaxed transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                    {opt.label}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                </motion.div>
            </AnimatePresence>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center mt-12 px-6 max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="text-gray-500 hover:text-white hover:bg-white/5 rounded-xl px-6 py-6 font-orbitron tracking-wide"
                >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    VOLTAR
                </Button>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        onClick={handleNext}
                        disabled={!canAdvance}
                        className={`
                            rounded-xl px-10 py-7 text-sm font-bold font-orbitron tracking-widest transition-all shadow-xl
                            flex items-center gap-3
                            ${!canAdvance
                                ? 'bg-[#1E293B] text-gray-500 cursor-not-allowed border border-white/5'
                                : 'bg-gradient-to-r from-[#00A3FF] to-[#006097] text-white hover:shadow-[0_0_30px_rgba(0,163,255,0.4)] border border-[#00A3FF]/50'
                            }
                        `}
                    >
                        {isLastStep ? (isSubmitting ? "ENVIANDO..." : "FINALIZAR AUDITORIA") : "PRÓXIMA ETAPA"}
                        {!isLastStep && <ArrowRight className="w-5 h-5" />}
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
