"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

// Mock Data
const MOCK_ASSESSMENTS = [
    { title: "Avaliação ISO 42001 - Q4", score: 85, date: "Hoje", status: "completed" },
    { title: "Auditoria de Algoritmos - RH", score: 42, date: "Ontem", status: "pending" },
    { title: "Risk Assessment - Marketing GenAI", score: 92, date: "10 Dez", status: "completed" },
];

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [recentAssessments, setRecentAssessments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        maturityLevel: "Calculando...",
        complianceRate: "0%",
        vulnerabilities: "0"
    });
    const [buying, setBuying] = useState(false);
    const [hasPurchasedReport, setHasPurchasedReport] = useState(false);

    const handleDownloadReport = async () => {
        const token = localStorage.getItem("algor_token");
        if (!token) return;

        try {
            const res = await fetch("/api/v1/payments/report/download", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!res.ok) {
                alert("Erro ao baixar. Tente novamente.");
                return;
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Relatorio_Viabilidade_Algor.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (err) {
            console.error("Download Error", err);
        }
    };

    const handlePurchase = async () => {
        setBuying(true);
        try {
            const token = localStorage.getItem("algor_token");
            if (!token) {
                alert("Sessão expirada. Faça login novamente.");
                return;
            }

            const res = await fetch("/api/v1/payments/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ product_type: "viability_report" })
            });

            if (res.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                window.location.href = "/login";
                return;
            }

            const data = await res.json();
            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else {
                console.error("Payment Error Data:", data);
                alert("Erro ao iniciar pagamento. Tente novamente.");
            }
        } catch (err) {
            console.error("Payment Network Error:", err);
            alert("Erro de conexão com o servidor de pagamentos.");
        } finally {
            setBuying(false);
        }
    }

    useEffect(() => {
        const userData = localStorage.getItem("algor_user");
        const token = localStorage.getItem("algor_token");

        if (userData) setUser(JSON.parse(userData));

        const fetchData = async () => {
            if (!token) return;
            try {
                // 1. Fetch Assessments
                const resAssessments = await fetch('/api/v1/assessments/?limit=5', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (resAssessments.ok) {
                    const data = await resAssessments.json();
                    setRecentAssessments(data);

                    if (data.length > 0) {
                        const totalScore = data.reduce((acc: number, curr: any) => acc + curr.score_total, 0);
                        const avg = Math.round(totalScore / data.length);
                        setStats(prev => ({
                            ...prev,
                            complianceRate: `${avg}%`,
                            maturityLevel: avg >= 70 ? "Nível 5" : avg >= 30 ? "Nível 3" : "Nível 1"
                        }));
                    }
                }

                // 2. Fetch Risks
                const resRisks = await fetch('/api/v1/risks/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (resRisks.ok) {
                    const risksData = await resRisks.json();
                    const criticalCount = risksData.filter((r: any) => r.risk_level >= 15).length;
                    setStats(prev => ({
                        ...prev,
                        vulnerabilities: `${criticalCount} Críticas`
                    }));
                }

                // 3. Check Purchases
                const resPurchases = await fetch('/api/v1/payments/my-purchases', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (resPurchases.ok) {
                    const purchases = await resPurchases.json();
                    const hasReport = purchases.some((p: any) => p.product_name === 'viability_report' && p.status === 'completed');
                    setHasPurchasedReport(hasReport);
                }

            } catch (error) {
                console.error("Dashboard Sync Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle Stripe Redirect
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('payment_success')) {
                // Remove param from URL
                window.history.replaceState({}, document.title, window.location.pathname);
                // Show success message (Future: Toast)
                alert("Pagamento confirmado! Seu relatório está sendo gerado.");
                // Reload data to update permissions
                window.location.reload();
            }
        }
    }, []);

    if (!user) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

            {/* Top Bar / Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                        Visão Geral
                    </h1>
                    <p className="text-gray-400 mt-2 font-light">
                        Bem-vindo ao centro de comando, <span className="text-brand-blue font-medium">{user.name}</span>.
                    </p>
                </div>
                <Link href="/dashboard/assessments/new">
                    <button className="h-11 px-6 rounded-xl bg-gradient-to-r from-brand-blue to-teal-500 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(0,163,255,0.4)] transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
                        <span className="material-symbols-rounded text-xl">add_circle</span>
                        Nova Auditoria
                    </button>
                </Link>
            </div>

            {/* KPI Cards (Bento Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <EliteCard
                    icon="rocket_launch"
                    label="Growth Viability"
                    value={stats.maturityLevel}
                    subtext="Nível de Prontidão"
                    colorClass="text-brand-blue"
                />
                <EliteCard
                    icon="shield_lock"
                    label="Data Clean Room"
                    value="Ativo"
                    subtext="Criptografia Total"
                    colorClass="text-brand-green"
                />
                <EliteCard
                    icon="warning"
                    label="Risco de Dados"
                    value={stats.vulnerabilities}
                    subtext="Leads Tóxicos"
                    colorClass="text-red-400"
                />
                <EliteCard
                    icon="speed"
                    label="Consent Velocity"
                    value="< 24h"
                    subtext="Opt-out SLA"
                    colorClass="text-purple-400"
                />
            </div>

            {/* Content Split: List & Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main List: Recent Activity */}
                <div className="lg:col-span-2 glass-panel rounded-3xl p-1 relative overflow-hidden group">
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                    <div className="p-6 pb-4 flex items-center justify-between relative z-10">
                        <h2 className="text-lg font-medium text-white flex items-center gap-2">
                            <span className="material-symbols-rounded text-brand-blue">monitoring</span>
                            Auditorias de Growth
                        </h2>
                        <Button variant="ghost" className="text-brand-blue text-xs hover:text-white hover:bg-brand-blue/10 rounded-full px-4">Ver histórico</Button>
                    </div>

                    <div className="p-2 relative z-10">
                        {loading ? (
                            <div className="p-12 text-center text-gray-500 animate-pulse font-mono text-sm">Authenticating handshake...</div>
                        ) : recentAssessments.length === 0 ? (
                            <div className="p-12 text-center text-gray-500 font-light">Nenhum diagnóstico de campanha realizado.</div>
                        ) : (
                            recentAssessments.map((item, idx) => (
                                <Link href={`/dashboard/assessments/${item.id}`} key={item.id}>
                                    <div className="group/item flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border-b border-white/5 last:border-0 hover:pl-6">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover/item:text-brand-blue group-hover/item:bg-brand-blue/10 transition-colors">
                                            <span className="material-symbols-rounded">check_circle</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-gray-200 group-hover/item:text-brand-blue transition-colors">{item.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-2 font-mono">
                                                SCORE: {item.score_total}/60 • {new Date(item.created_at).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                        <StatusBadge status={item.status} />
                                        <span className="material-symbols-rounded text-gray-600 group-hover/item:translate-x-1 transition-transform">chevron_right</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Side Panel: Infrastructure */}
                <div className="space-y-6">

                    {/* Premium Reports Card (Monetization Phase 6) */}
                    <div className="glass-panel rounded-3xl p-6 border border-brand-amber/20 relative overflow-hidden group hover:border-brand-amber/40 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-amber/5 to-transparent opacity-50" />

                        <div className="relative z-10">
                            <h3 className="text-white font-medium flex items-center gap-2 mb-2">
                                <span className="material-symbols-rounded text-brand-amber">lock_open</span>
                                Relatório de Viabilidade
                            </h3>
                            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                                Análise profunda de risco jurídico e técnico para escalar campanhas (SLA 24h).
                            </p>

                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Investimento</p>
                                    <span className="text-lg font-bold text-white">R$ 1.500</span>
                                </div>
                                <button
                                    onClick={hasPurchasedReport ? handleDownloadReport : handlePurchase}
                                    disabled={buying}
                                    className={`text-black text-xs font-bold px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${hasPurchasedReport
                                            ? 'bg-brand-green hover:bg-[#00E585] hover:shadow-[0_0_15px_rgba(0,255,148,0.4)]'
                                            : 'bg-brand-amber hover:bg-[#FFC033] hover:shadow-[0_0_15px_rgba(255,176,0,0.4)]'
                                        }`}
                                >
                                    {buying ? (
                                        <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : hasPurchasedReport ? (
                                        <>
                                            <span className="material-symbols-rounded text-sm">download</span>
                                            BAIXAR PDF
                                        </>
                                    ) : (
                                        "COMPRAR"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Enterprise Plan Card */}
                    <div className="rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy to-[#0F2942] p-8 text-white relative overflow-hidden border border-white/10 shadow-2xl">
                        {/* Abstract Art */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl -mr-10 -mt-10 animate-pulse-slow" />

                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-blue flex items-center justify-center mb-6 border border-brand-blue/30 shadow-[0_0_15px_rgba(0,163,255,0.2)]">
                                <span className="material-symbols-rounded">verified_user</span>
                            </div>
                            <h3 className="text-xl font-display font-medium mb-2">Growth License</h3>
                            <p className="text-sm text-gray-400 mb-8 font-light leading-relaxed">Sua auditoria ISO 42001 está válida para campanhas Enterprise até <span className="text-white font-medium">Jan 2026</span>.</p>
                            <button className="text-xs font-bold uppercase tracking-widest text-brand-blue hover:text-white hover:underline transition-colors offset-2">Renovar Certificado</button>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="glass-panel rounded-3xl p-6 border border-white/5">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                            Infraestrutura Segura
                        </h3>
                        <div className="space-y-5">
                            <StatusRow label="Data Clean Room" status="online" />
                            <StatusRow label="Consent Engine" status="online" />
                            <StatusRow label="Bias Monitor" status="scanning" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Components

function EliteCard({ icon, label, value, subtext, colorClass }: any) {
    return (
        <div className="glass-panel rounded-[24px] p-6 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden border border-white/5 hover:border-white/10">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors" />

            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${colorClass} text-2xl group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                    <span className="material-symbols-rounded">{icon}</span>
                </div>
            </div>
            <div className="relative z-10">
                <p className="text-gray-400 text-sm font-medium tracking-wide">{label}</p>
                <h2 className="text-3xl font-display font-medium text-white my-1">{value}</h2>
                <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${subtext.includes('atenção') ? 'bg-red-400' : 'bg-brand-green'}`} />
                    <p className="text-xs text-gray-500 font-mono">{subtext}</p>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const isCompleted = status === 'completed';
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm ${isCompleted
            ? 'bg-brand-green/10 text-brand-green border-brand-green/20'
            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            }`}>
            {isCompleted ? 'Concluído' : 'Pendente'}
        </span>
    );
}

function StatusRow({ label, status }: { label: string, status: string }) {
    const isOnline = status === 'online';
    return (
        <div className="flex items-center justify-between group">
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{label}</span>
            <div className="flex items-center gap-2 bg-black/20 px-2 py-1 rounded-lg border border-white/5">
                <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-brand-green shadow-[0_0_8px_#00FF94]' : 'bg-brand-blue animate-pulse'}`} />
                <span className={`text-[10px] font-mono font-medium uppercase ${isOnline ? 'text-brand-green' : 'text-brand-blue'}`}>{status}</span>
            </div>
        </div>
    )
}

