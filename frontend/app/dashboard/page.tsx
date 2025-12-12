"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

// Mock Data for M3 Visualization (while API loads)
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

                    // Calculate average score for compliance rate
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

                // 2. Fetch Risks for Stats
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

            } catch (error) {
                console.error("Dashboard Sync Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!user) return null;

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Top Bar / Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-[24px] md:text-[32px] leading-tight font-normal text-[#E3E3E3]">
                        Visão Geral
                    </h1>
                    <p className="text-sm text-[#C4C7C5]">Resumo da governança e conformidade IA</p>
                </div>
                <Link href="/dashboard/assessments/new">
                    <button className="h-10 px-6 rounded-full bg-[#A8C7FA] text-[#062E6F] text-sm font-medium hover:bg-[#D3E3FD] transition-colors flex items-center gap-2 shadow-sm">
                        <span className="material-symbols-rounded text-lg">add</span>
                        Nova Auditoria
                    </button>
                </Link>
            </div>

            {/* KPI Cards - M3 Style (Elevated Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <M3Card
                    icon="memory"
                    label="Maturidade IA"
                    value={stats.maturityLevel}
                    subtext="Metodologia Ágil"
                    colorClass="text-[#A8C7FA]"
                />
                <M3Card
                    icon="security"
                    label="Vulnerabilidades"
                    value={stats.vulnerabilities}
                    subtext="Necessitam atenção"
                    colorClass="text-[#FFB4AB]" // Error Container Text
                />
                <M3Card
                    icon="verified"
                    label="Conformidade"
                    value={stats.complianceRate}
                    subtext="ISO 42001 Standard"
                    colorClass="text-[#6DD58C]" // Successish
                />
                <M3Card
                    icon="event"
                    label="Próxima Revisão"
                    value="15 Dez"
                    subtext="Em 4 dias"
                    colorClass="text-[#E3E3E3]"
                />
            </div>

            {/* Content Split: List & Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main List: Recent Activity (Outlined Card) */}
                <div className="lg:col-span-2 rounded-[24px] border border-[#444746] bg-[#1E1F20] overflow-hidden">
                    <div className="p-6 pb-2 flex items-center justify-between">
                        <h2 className="text-lg font-medium text-[#E3E3E3]">Atividade Recente</h2>
                        <Button variant="ghost" className="text-[#A8C7FA] text-sm h-8 hover:bg-[#A8C7FA]/10">Ver tudo</Button>
                    </div>

                    <div className="p-2">
                        {loading ? (
                            <div className="p-8 text-center text-[#8E918F] animate-pulse">Carregando dados...</div>
                        ) : recentAssessments.length === 0 ? (
                            <div className="p-8 text-center text-[#8E918F]">Nenhuma auditoria realizada ainda.</div>
                        ) : (
                            recentAssessments.map((item, idx) => (
                                <Link href={`/dashboard/assessments/${item.id}`} key={item.id}>
                                    <div className="group flex items-center gap-4 p-4 rounded-[16px] hover:bg-[#444746]/30 transition-colors cursor-pointer border-b border-[#444746]/20 last:border-0">
                                        <div className="w-10 h-10 rounded-full bg-[#3E4042] flex items-center justify-center text-[#A8C7FA]">
                                            <span className="material-symbols-rounded">description</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-[#E3E3E3] group-hover:text-[#A8C7FA] transition-colors">{item.title}</h3>
                                            <p className="text-xs text-[#C4C7C5] mt-1 flex items-center gap-2">
                                                Score: {item.score_total}/100 • {new Date(item.created_at).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                        <StatusBadge status={item.status} />
                                        <span className="material-symbols-rounded text-[#8E918F]">chevron_right</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Side Panel: Infrastructure (Filled Card) */}
                <div className="space-y-4">
                    {/* Signature Card */}
                    <div className="rounded-[24px] bg-[#004A77] p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-8 h-8 rounded-full bg-[#C2E7FF] text-[#001D35] flex items-center justify-center mb-4">
                                <span className="material-symbols-rounded">diamond</span>
                            </div>
                            <h3 className="text-lg font-medium mb-1">Plano Enterprise</h3>
                            <p className="text-sm opacity-80 mb-6">Sua licença ISO 42001 está ativa até Janeiro 2026.</p>
                            <button className="text-sm font-medium hover:opacity-80 underline">Gerenciar Plano</button>
                        </div>
                        {/* Decor */}
                        <span className="material-symbols-rounded absolute -bottom-4 -right-4 text-[120px] opacity-10 rotate-12">verified</span>
                    </div>

                    {/* Status List */}
                    <div className="rounded-[24px] bg-[#1E1F20] p-6 border border-[#444746]">
                        <h3 className="text-sm font-medium text-[#E3E3E3] mb-4 uppercase tracking-wider">Status do Sistema</h3>
                        <div className="space-y-4">
                            <StatusRow label="API Gateway" status="online" />
                            <StatusRow label="Database Cluster" status="online" />
                            <StatusRow label="LLM Engine" status="processing" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Components

function M3Card({ icon, label, value, subtext, colorClass }: any) {
    return (
        <div className="rounded-[24px] bg-[#1E1F20] p-6 border border-[#444746] hover:bg-[#252528] transition-colors group cursor-default">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-[#3E4042] flex items-center justify-center ${colorClass} text-2xl group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-rounded">{icon}</span>
                </div>
                {/* Trend Icon? */}
            </div>
            <div>
                <p className="text-[#C4C7C5] text-sm font-medium">{label}</p>
                <h2 className="text-3xl font-medium text-[#E3E3E3] my-1">{value}</h2>
                <p className="text-xs text-[#8E918F]">{subtext}</p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const isCompleted = status === 'completed';
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${isCompleted
            ? 'bg-[#0F5223] text-[#C4EED0] border-[#C4EED0]/20'
            : 'bg-[#3E2723] text-[#FFDAD6] border-[#FFDAD6]/20'
            }`}>
            {isCompleted ? 'Concluído' : 'Pendente'}
        </span>
    );
}

function StatusRow({ label, status }: { label: string, status: string }) {
    const isOnline = status === 'online';
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-[#C4C7C5]">{label}</span>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#6DD58C] animate-pulse' : 'bg-[#FFB4AB]'}`} />
                <span className="text-xs font-medium text-[#E3E3E3] uppercase">{status}</span>
            </div>
        </div>
    )
}

