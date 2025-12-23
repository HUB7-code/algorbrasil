"use client";

import { useState, useEffect } from "react";
import { Lock, FileText, Download, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ExclusiveContentPage() {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("algor_user");
        if (userData) {
            const parsed = JSON.parse(userData);
            setUserRole(parsed.role);
        }
    }, []);

    const isMember = userRole === 'member' || userRole === 'admin';

    const resources = [
        { title: "Política de Segurança de IA Generativa", type: "DOCX", size: "2.4 MB" },
        { title: "Matriz de Risco Algorítmico v3.0", type: "XLSX", size: "4.1 MB" },
        { title: "Checklist de Auditoria ISO 42001", type: "PDF", size: "1.2 MB" },
        { title: "Playbook de Resposta a Incidentes de IA", type: "PDF", size: "5.5 MB" },
        { title: "Template de Relatório de Impacto (DPIA-IA)", type: "DOCX", size: "1.8 MB" },
        { title: "Guia de Contratação de Fornecedores de IA", type: "PDF", size: "3.0 MB" },
    ];

    if (!userRole) return null;

    return (
        <div className="p-8 w-full min-h-screen space-y-8 relative">
            <div className="border-b border-white/10 pb-6">
                <h1 className="text-3xl font-serif font-medium text-white mb-2">Acervo Premium</h1>
                <p className="text-gray-400">Materiais técnicos de alta profundidade para implementação e auditoria.</p>
            </div>

            <div className="relative">
                {/* Content Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${!isMember ? "blur-md pointer-events-none select-none opacity-50" : ""}`}>
                    {resources.map((res, idx) => (
                        <div key={idx} className="glossy-card p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                    <FileText className="w-6 h-6 text-blue-400" />
                                </div>
                                <span className="text-xs font-mono text-gray-500">{res.type}</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2 leading-snug group-hover:text-[#00FF94] transition-colors">
                                {res.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
                                <Download className="w-3 h-3" />
                                {res.size} • Versão 2024
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAYWALL OVERLAY */}
                {!isMember && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="max-w-md w-full p-1 bg-gradient-to-br from-[#00FF94] to-[#00A3FF] rounded-2xl shadow-[0_0_50px_rgba(0,255,148,0.2)]">
                            <div className="bg-[#0A1A2F] rounded-xl p-8 text-center space-y-6">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                    <Lock className="w-8 h-8 text-[#00FF94]" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-serif text-white mb-2">Conteúdo Exclusivo</h2>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        O acesso a templates editáveis, playbooks e ferramentas de auditoria é restrito a <strong>Membros Associados</strong>.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full py-3 bg-[#00FF94] hover:bg-white hover:scale-[1.02] text-[#0A1A2F] font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                                        <ShieldCheck className="w-5 h-5" />
                                        TORNAR-SE MEMBRO
                                    </button>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">A partir de R$ 99/mês</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
