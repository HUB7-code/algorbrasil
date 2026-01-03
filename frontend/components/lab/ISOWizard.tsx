"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Award, ChevronRight } from 'lucide-react';

const QUESTIONS = [
    { id: 'q1', text: "Existe um responsável (humano) nomeado pela supervisão das decisões da IA?", category: "Governança" },
    { id: 'q2', text: "O sistema gera logs de explicabilidade (XAI) acessíveis para auditoria externa?", category: "Transparência" },
    { id: 'q3', text: "Há evidência de testes de viés (fairness) para diferentes etnias e faixas etárias?", category: "Dados" },
    { id: 'q4', text: "O modelo é protegido contra ataques adversariais ou envenenamento de dados?", category: "Segurança" },
    { id: 'q5', text: "A IA utiliza dados sensíveis (saúde/biometria) sem uma base legal documentada?", category: "Privacidade" }
];

export default function ISOWizard() {
    const [step, setStep] = useState(0); // 0-4 = Perguntas, 5 = Resultado
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [result, setResult] = useState<any>(null);

    const handleAnswer = (val: string) => {
        setAnswers(prev => ({ ...prev, [QUESTIONS[step].id]: val }));
        if (step < QUESTIONS.length - 1) {
            setStep(s => s + 1);
        } else {
            finishAssessment({ ...answers, [QUESTIONS[step].id]: val });
        }
    };

    const finishAssessment = async (finalAnswers: Record<string, string>) => {
        setStep(5); // Loading state
        try {
            const res = await fetch('http://localhost:8000/api/v1/lab/iso/assess', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: finalAnswers })
            });
            const data = await res.json();
            setResult(data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto min-h-[500px] bg-[#0A0E1A]/80 border border-white/10 rounded-2xl p-8 relative flex flex-col items-center justify-center">

            {/* Header / Progress */}
            {step < 5 && (
                <div className="w-full mb-8">
                    <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest mb-2">
                        <span>Avaliação ISO 42001</span>
                        <span>Questão {step + 1} de {QUESTIONS.length}</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#00FF94]"
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Questions Wizard */}
            <AnimatePresence mode="wait">
                {step < 5 && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-2xl text-center"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full mb-4">
                            {QUESTIONS[step].category}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-orbitron text-white mb-10 leading-relaxed">
                            {QUESTIONS[step].text}
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            <button onClick={() => handleAnswer('no')} className="p-4 rounded-xl border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all group">
                                <X className="w-8 h-8 text-gray-500 group-hover:text-red-500 mx-auto mb-2" />
                                <span className="text-gray-400 group-hover:text-white font-semibold">Não</span>
                            </button>
                            <button onClick={() => handleAnswer('partial')} className="p-4 rounded-xl border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all group">
                                <AlertCircle className="w-8 h-8 text-gray-500 group-hover:text-amber-500 mx-auto mb-2" />
                                <span className="text-gray-400 group-hover:text-white font-semibold">Parcial</span>
                            </button>
                            <button onClick={() => handleAnswer('yes')} className="p-4 rounded-xl border border-white/10 hover:border-[#00FF94]/50 hover:bg-[#00FF94]/10 transition-all group">
                                <Check className="w-8 h-8 text-gray-500 group-hover:text-[#00FF94] mx-auto mb-2" />
                                <span className="text-gray-400 group-hover:text-white font-semibold">Sim</span>
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Result */}
                {step === 5 && result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center w-full max-w-2xl"
                    >
                        <Award className="w-20 h-20 text-[#00FF94] mx-auto mb-6" />
                        <h2 className="text-4xl font-orbitron font-bold text-white mb-2">{result.maturity_level}</h2>
                        <p className="text-gray-400 mb-8">Nível de Maturidade ISO 42001</p>

                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-8">
                            <div className="text-6xl font-bold text-[#00FF94]">{result.score}/100</div>
                            <p className="text-sm text-gray-500 mt-2">ÍNDICE DE CONFORMIDADE ALGOR</p>
                        </div>

                        {result.recommendations.length > 0 && (
                            <div className="text-left bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl">
                                <h4 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Recomendações Críticas
                                </h4>
                                <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                                    {result.recommendations.map((rec: string, i: number) => (
                                        <li key={i}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={() => { setStep(0); setAnswers({}); setResult(null); }}
                            className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                            Reiniciar Avaliação
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
