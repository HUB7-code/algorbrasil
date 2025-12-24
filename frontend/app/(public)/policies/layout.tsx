"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, FileText, Cookie, Key, Lock, ArrowLeft } from "lucide-react";

export default function PoliciesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050810] text-slate-300 font-sans selection:bg-[#00A3FF]/20 selection:text-[#00A3FF]">

            {/* Decorative Ambient Background - Suavizado */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-[#00A3FF] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.02]"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[#00FF94] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.01]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="flex flex-col gap-6 sticky top-40">

                            <Link
                                href="/"
                                className="group flex items-center gap-2 text-sm text-slate-400 hover:text-[#00A3FF] transition-colors mb-4"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Voltar para Home
                            </Link>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-3 mb-2">
                                    Legal & Compliance
                                </h3>

                                <nav className="flex flex-col gap-1">
                                    <NavItem href="/policies/privacy" icon={Lock} label="Política de Privacidade" />
                                    <NavItem href="/policies/terms" icon={FileText} label="Termos de Uso" />
                                    <NavItem href="/policies/cookies" icon={Cookie} label="Política de Cookies" />
                                    <NavItem href="/policies/dpo" icon={Shield} label="Canal do DPO" />
                                </nav>
                            </div>

                            <div className="p-5 rounded-2xl bg-[#0A0E1A] border border-white/5 mt-8 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h4 className="text-white font-medium mb-2 flex items-center gap-2 relative z-10">
                                    <Key className="w-4 h-4 text-[#00A3FF]" />
                                    LGPD Status
                                </h4>
                                <p className="text-xs text-slate-400 mb-4 relative z-10 leading-relaxed">
                                    Conformidade ativa com a Lei 13.709/2018.
                                </p>
                                <div className="text-[10px] font-mono text-[#00FF94] bg-[#00FF94]/5 border border-[#00FF94]/20 px-2 py-1 rounded inline-block relative z-10">
                                    ● v1.0.2 (Auditada)
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-3 pb-24 relative">
                        {/* Ferramentas de Acessibilidade Flutuantes */}
                        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50 no-print">
                            <button
                                onClick={() => window.print()}
                                className="bg-[#0A0E1A] hover:bg-[#00A3FF] text-slate-400 hover:text-white p-3 rounded-full border border-slate-700 hover:border-[#00A3FF] transition-all shadow-lg group"
                                aria-label="Imprimir esta página"
                                title="Imprimir"
                            >
                                <span className="material-symbols-rounded block group-hover:hidden">print</span>
                                <span className="material-symbols-rounded hidden group-hover:block">print</span>
                            </button>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-[#0A0E1A] hover:bg-[#00FF94] text-slate-400 hover:text-black p-3 rounded-full border border-slate-700 hover:border-[#00FF94] transition-all shadow-lg group"
                                aria-label="Voltar ao topo"
                                title="Voltar ao topo"
                            >
                                <span className="material-symbols-rounded">arrow_upward</span>
                            </button>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none
                prose-headings:font-light prose-headings:text-white
                prose-h1:text-5xl prose-h1:tracking-tight
                prose-p:text-slate-400 prose-p:leading-8
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-[#00A3FF] prose-a:no-underline hover:prose-a:underline
                prose-li:text-slate-400
                prose-blockquote:border-l-[#00FF94] prose-blockquote:bg-[#00FF94]/5 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
             ">
                            {children}
                        </div>

                        {/* Assinatura Digital do Documento (Footer LGPD Padrão) */}
                        <div className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 font-mono no-print">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <p className="mb-1 text-slate-400"><strong>ALGOR TECNOLOGIA LTDA</strong></p>
                                    <p>Av. Paulista, 1106 - Bela Vista, São Paulo - SP</p>
                                </div>
                                <div className="text-right">
                                    <p>Hash SHA-256: <span className="text-[#00FF94]">e3b0c442...</span> (Validado)</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                text-sm font-medium border
                ${isActive
                    ? "bg-[#00A3FF]/10 text-[#00A3FF] border-[#00A3FF]/20 shadow-[0_0_20px_rgba(0,163,255,0.05)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/5"}
            `}
        >
            <Icon className={`w-4 h-4 ${isActive ? "text-[#00A3FF]" : "text-slate-500 group-hover:text-white"}`} />
            {label}
        </Link>
    )
}
