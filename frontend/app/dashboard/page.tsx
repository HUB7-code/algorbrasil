"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/dashboard/StatCard";
import {
    Activity,
    ShieldCheck,
    AlertTriangle,
    Clock,
    Plus,
    FileText,
    BrainCircuit,
    Zap
} from "lucide-react";

export default function DashboardPage() {
    const [user, setUser] = useState<{ name: string, role: string } | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("algor_user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!user) return null;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                <Button className="group bg-brand-green text-black hover:bg-brand-green/90 shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all">
                    <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                    Nova Auditoria
                </Button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Maturidade IA"
                    value="NÍVEL 1"
                    subtext="Estágio Inicial / Ad-Hoc"
                    icon={<BrainCircuit className="w-6 h-6" />}
                    trend="+12% Evolução"
                    trendUp={true}
                    borderColor="border-brand-green/30"
                    delay={100}
                />
                <StatCard
                    title="Vulnerabilidades"
                    value="03 CRÍTICAS"
                    subtext="Ação Imediata Requerida"
                    icon={<AlertTriangle className="w-6 h-6 text-brand-amber" />}
                    borderColor="border-brand-amber/30"
                    delay={200}
                />
                <StatCard
                    title="Compliance Rate"
                    value="45.8%"
                    subtext="ISO 42001 Standard"
                    icon={<ShieldCheck className="w-6 h-6" />}
                    delay={300}
                />
                <StatCard
                    title="Próxima Rodada"
                    value="15 DEZ"
                    subtext="Em 06 dias"
                    icon={<Clock className="w-6 h-6 text-purple-400" />}
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
                            <Activity className="w-5 h-5 text-brand-green" />
                            Registro de Atividades
                        </h3>
                        <button className="text-xs font-mono text-brand-blue/60 hover:text-white transition-colors">Ver todos</button>
                    </div>

                    <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 group-hover:border-brand-blue/30 transition-all">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white group-hover:text-brand-green transition-colors font-display tracking-wide">
                                            Avaliação de Risco #004{i}
                                        </h4>
                                        <p className="text-xs text-brand-blue/40 font-mono mt-1 flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-brand-blue/50" />
                                            Atualizado há 2h por {user.name.split(' ')[0]}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-mono text-brand-blue/30 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                                        EM ANDAMENTO
                                    </span>
                                    <Zap className="w-4 h-4 text-white/10 group-hover:text-brand-green transition-colors" />
                                </div>
                            </div>
                        ))}
                        <div className="p-4 bg-black/20 text-center">
                            <p className="text-xs text-white/20 font-mono">Fim dos registros recentes</p>
                        </div>
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
