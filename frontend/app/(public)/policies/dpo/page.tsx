"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertTriangle } from "lucide-react";

export default function DpoChannelPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");

        // Simulação de envio para API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
    }

    return (
        <div className="animate-in fade-in duration-700">
            <h1 className="text-4xl md:text-5xl font-light mb-8 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                Canal de Privacidade (DPO)
            </h1>

            <p className="lead text-xl text-slate-300 mb-8">
                Exercer seus direitos é simples e rápido. Utilize este canal oficial para entrar em contato com nosso Encarregado de Proteção de Dados (DPO).
            </p>

            <div className="bg-[#0A0A15] border border-slate-800 rounded-2xl p-8 mb-12">
                <h3 className="flex items-center gap-2 text-[#00A3FF] mt-0">
                    <span className="material-symbols-rounded">support_agent</span>
                    Encarregado (DPO)
                </h3>
                <p className="text-slate-400 mb-4">
                    O responsável atual pela supervisão da proteção de dados na Algor Brasil é:
                </p>
                <div className="flex items-center gap-4 text-slate-200 bg-slate-900/50 p-4 rounded-lg border border-slate-800/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A3FF] to-blue-800 flex items-center justify-center font-bold text-lg">
                        L
                    </div>
                    <div>
                        <div className="font-medium">Legal Team Algor</div>
                        <div className="text-sm text-slate-400">dpo@algorbrasil.com.br</div>
                    </div>
                </div>
            </div>

            <h2>Solicitação de Direitos</h2>
            <p>
                Preencha o formulário abaixo para solicitar acesso, correção, exclusão ou portabilidade de seus dados pessoais. Responderemos em até <strong>15 dias</strong>, conforme prazo legal.
            </p>

            {status === "success" ? (
                <div className="bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-xl p-8 text-center animate-in zoom-in-95 duration-500">
                    <CheckCircle2 className="w-16 h-16 text-[#00FF94] mx-auto mb-4" />
                    <h3 className="text-[#00FF94] text-xl font-medium mb-2 mt-0">Solicitação Recebida!</h3>
                    <p className="text-slate-300">
                        Um protocolo foi enviado para seu e-mail. Nossa equipe de privacidade analisará sua requisição e entrará em contato em breve.
                    </p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 px-6 py-2 bg-[#00FF94]/20 hover:bg-[#00FF94]/30 text-[#00FF94] rounded-lg text-sm font-medium transition-colors"
                    >
                        Nova Solicitação
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-[#0A0A15] border border-slate-800 rounded-xl p-6 md:p-8 space-y-6 not-prose">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300 font-medium">Nome Completo</label>
                            <input type="text" required className="w-full bg-[#0E121F] border border-slate-800 focus:border-[#00A3FF] rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 transition-all font-sans" placeholder="Ex: João da Silva" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300 font-medium">E-mail Corporativo</label>
                            <input type="email" required className="w-full bg-[#0E121F] border border-slate-800 focus:border-[#00A3FF] rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 transition-all font-sans" placeholder="nome@empresa.com.br" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-slate-300 font-medium">Tipo de Solicitação</label>
                        <div className="relative">
                            <select className="w-full bg-[#0E121F] border border-slate-800 focus:border-[#00A3FF] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 transition-all appearance-none font-sans">
                                <option>Quero acessar meus dados (Art. 18, II)</option>
                                <option>Quero excluir meus dados (Art. 18, VI)</option>
                                <option>Quero corrigir dados incompletos (Art. 18, III)</option>
                                <option>Revogar consentimento de marketing (Art. 18, IX)</option>
                                <option>Outra solicitação legal</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-slate-300 font-medium">Detalhes da Solicitação</label>
                        <textarea className="w-full bg-[#0E121F] border border-slate-800 focus:border-[#00A3FF] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 transition-all min-h-[140px] font-sans" placeholder="Por favor, descreva sua solicitação com detalhes para agilizarmos o atendimento..."></textarea>
                    </div>

                    <div className="bg-slate-900/50 p-4 rounded-lg flex gap-3 items-start border border-slate-800">
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 m-0">
                            Para sua segurança, poderemos solicitar documentos adicionais para comprovar sua identidade antes de processar informações sensíveis.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full bg-[#00A3FF] hover:bg-[#0088D4] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(0,163,255,0.3)]"
                    >
                        {status === "submitting" ? (
                            <span className="animate-pulse">Enviando...</span>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Enviar Solicitação
                            </>
                        )}
                    </button>
                </form>
            )}


            <hr className="border-slate-800 my-12" />

            <p className="text-sm text-slate-500">
                Este formulário é gerido de forma segura e os dados aqui inseridos são usados exclusivamente para atender ao seu pedido de direitos.
            </p>
        </div>
    );
}
