"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/dashboard/StatCard";
// Icons replaced by Material Symbols (Google Fonts)

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [recentAssessments, setRecentAssessments] = useState<any[]>([]);
    const [stats, setStats] = useState({
        maturityLevel: "NÍVEL 0",
        complianceRate: "0%",
        vulnerabilities: "UNKNOWN"
    });
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem("algor_user");
        const token = localStorage.getItem("algor_token");

        if (userData) {
            setUser(JSON.parse(userData));
        }

        // Check for survey completion flag
        if (window.location.search.includes("survey_completed=true")) {
            setShowSuccessToast(true);
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            setTimeout(() => setShowSuccessToast(false), 5000);
        }

        // Fetch Real Assessments
        if (token) {
            fetch("/api/v1/assessments/", {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setRecentAssessments(data);

                        // Calculate Simple Stats
                        if (data.length > 0) {
                            // Get latest assessment score
                            const latest = data[data.length - 1]; // Assuming order or sorting backend
                            const score = latest.score_total;

                            // Logic Level
                            let level = "NÍVEL 1";
                            if (score > 30) level = "NÍVEL 2";
                            if (score > 50) level = "NÍVEL 3";
                            if (score > 80) level = "NÍVEL 5";

                            setStats({
                                maturityLevel: level,
                                complianceRate: `${score.toFixed(1)}%`,
                                vulnerabilities: score < 50 ? "CRÍTICAS" : "SEGURO"
                            });
                        }
                    }
                })
                .catch(err => console.error("Failed to fetch assessments", err));
        }
    }, []);

    if (!user) return null;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">

            {/* Success Toast */}
            {showSuccessToast && (
                <div className="absolute top-0 right-0 z-50 bg-brand-green/10 border border-brand-green text-brand-green px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(0,255,148,0.2)] animate-in slide-in-from-right fade-in flex items-center gap-3">
                    <span className="material-symbols-rounded">verified_user</span>
                    <div>
                        <p className="font-bold text-sm">Diagnóstico Salvo com Sucesso!</p>
                        <p className="text-xs opacity-80">Seus KPIs foram atualizados.</p>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                        <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest">Sistema Operacional</span>
                    </div>
                    <h1 className="text-4xl font-orbitron font-bold text-white mb-2 tracking-wide">
                        CENTRO DE COMANDO
                    </h1>
                    <p className="text-brand-blue/60 font-mono text-sm max-w-xl">
                        Monitoramento em tempo real da conformidade ISO 42001 e integridade dos sistemas de IA.
                    </p>
                </div>
                <Link href="/dashboard/assessments/new">
                    <Button className="group bg-brand-green text-black hover:bg-brand-green/90 shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all flex items-center">
                        <span className="material-symbols-rounded mr-2 group-hover:rotate-90 transition-transform text-lg">add</span>
                        Nova Auditoria
                    </Button>
                </Link>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Maturidade IA"
                    value={stats.maturityLevel}
                    subtext={stats.maturityLevel === "NÍVEL 0" ? "Sem dados" : "Metodologia Ágil"}
                    icon={<span className="material-symbols-rounded">memory</span>}
                    trend={stats.maturityLevel !== "NÍVEL 0" ? "Evoluindo" : undefined}
                    borderColor="border-brand-green/30"
                    delay={100}
                />
                <StatCard
                    title="Vulnerabilidades"
                    value={stats.vulnerabilities}
                    subtext={stats.vulnerabilities === "CRÍTICAS" ? "Ação Requerida" : "Monitorando"}
                    icon={<span className={`material-symbols-rounded ${stats.vulnerabilities === "CRÍTICAS" ? "text-brand-amber" : "text-brand-blue"}`}>warning</span>}
                    borderColor={stats.vulnerabilities === "CRÍTICAS" ? "border-brand-amber/30" : "border-brand-blue/30"}
                    delay={200}
                />
                <StatCard
                    title="Compliance Rate"
                    value={stats.complianceRate}
                    subtext="ISO 42001 Standard"
                    icon={<span className="material-symbols-rounded">verified_user</span>}
                    delay={300}
                />
                <StatCard
                    title="Próxima Rodada"
                    value="15 DEZ"
                    subtext="Em 06 dias"
                    icon={<span className="material-symbols-rounded text-purple-400">schedule</span>}
                    borderColor="border-purple-500/30"
                    delay={400}
                />
            </div>

            {/* Main Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visualização de Rede / Atividade */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-display font-medium text-xl text-white flex items-center gap-2">
                            <span className="material-symbols-rounded text-brand-green">monitoring</span>
                            Registro de Atividades Recentes
                        </h3>
                        <Link href="/dashboard/assessments/new">
                            <button className="text-xs font-mono text-brand-blue/60 hover:text-white transition-colors">Ver todos</button>
                        </Link>
                    </div>

                    <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                        {recentAssessments.length === 0 ? (
                            <div className="p-8 text-center text-white/40 font-mono text-sm">
                                <p>Nenhuma auditoria realizada ainda.</p>
                                <Link href="/dashboard/assessments/new" className="text-brand-green mt-2 block hover:underline">
                                    Iniciar Primeira Auditoria
                                </Link>
                            </div>
                        ) : (
                            recentAssessments.map((assessment, i) => (
                                <div key={assessment.id || i} className="group flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 group-hover:border-brand-blue/30 transition-all">
                                            <span className="material-symbols-rounded">description</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white group-hover:text-brand-green transition-colors font-display tracking-wide">
                                                {assessment.title} {(i === recentAssessments.length - 1) && "(Recente)"}
                                            </h4>
                                            <p className="text-xs text-brand-blue/40 font-mono mt-1 flex items-center gap-2">
                                                <span className={`w-1 h-1 rounded-full ${assessment.score_total > 50 ? 'bg-brand-green' : 'bg-brand-amber'}`} />
                                                Score: {assessment.score_total}/100
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-mono text-brand-blue/30 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                                            {assessment.status === 'completed' ? 'CONCLUÍDO' : 'EM ANDAMENTO'}
                                        </span>
                                        <span className="material-symbols-rounded text-white/10 group-hover:text-brand-green transition-colors text-lg">bolt</span>
                                    </div>
                                </div>
                            ))
                        )}
                        {recentAssessments.length > 0 && (
                            <div className="p-4 bg-black/20 text-center">
                                <p className="text-xs text-white/20 font-mono">Mostrando últimos registros</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Lateral */}
                <div className="space-y-6">
                    <h3 className="font-display font-medium text-xl text-white">Status da Infraestrutura</h3>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-brand-navy via-[#0A1A2F] to-black/60 relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="space-y-6 relative z-10">
                            <StatusItem label="API Gateway" status="online" ping="12ms" />
                            <StatusItem label="Database Cluster" status="online" ping="24ms" />
                            <StatusItem label="Neural Engine (LLM)" status="processing" ping="Thinking..." />
                            <StatusItem label="LGPD Compliance Monitor" status="online" ping="Active" />

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <div className="p-4 rounded-xl bg-gradient-to-r from-brand-green/10 to-transparent border border-brand-green/10 mb-4">
                                    <p className="text-xs text-brand-green font-bold font-mono uppercase mb-1">Assinatura Ativa</p>
                                    <p className="text-sm text-white/80">Plano Enterprise expira em <span className="text-white font-bold">29 dias</span>.</p>
                                </div>
                                <Button variant="outline" size="sm" className="w-full border-white/10 hover:bg-white/5 text-white/60 hover:text-white">
                                    Gerenciar Assinatura
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusItem({ label, status, ping }: { label: string, status: "online" | "offline" | "processing", ping: string }) {
    const statusConfig = {
        online: { color: "bg-brand-green", text: "ONLINE", shadow: "shadow-[0_0_8px_#00FF94]" },
        offline: { color: "bg-red-500", text: "OFFLINE", shadow: "shadow-[0_0_8px_red]" },
        processing: { color: "bg-brand-amber", text: "PROCESSANDO", shadow: "shadow-[0_0_8px_#FFB000]" },
    };

    const config = statusConfig[status];

    return (
        <div className="flex items-center justify-between group">
            <span className="text-sm text-brand-blue/80 font-medium group-hover:text-white transition-colors">{label}</span>
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-white/20">{ping}</span>
                <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/5">
                    <span className={`w-1.5 h-1.5 rounded-full ${config.color} ${status === 'online' ? 'animate-pulse' : 'animate-ping'} ${config.shadow}`} />
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">{config.text}</span>
                </div>
            </div>
        </div>
    );
}
