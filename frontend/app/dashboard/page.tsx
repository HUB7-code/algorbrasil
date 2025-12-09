"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
    Activity,
    ShieldCheck,
    AlertTriangle,
    Clock,
    Plus
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Centro de Comando
                    </h1>
                    <p className="text-brand-blue/60 font-mono text-sm">
                        Visão geral da sua conformidade e riscos de IA.
                    </p>
                </div>
                <Button className="flex items-center gap-2 shadow-lg hover:shadow-brand-green/20">
                    <Plus className="w-4 h-4" /> Nova Avaliação
                </Button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Nível de Maturidade"
                    value="Nível 1"
                    subtext="Inicial / Ad-hoc"
                    icon={<Activity className="text-brand-green" />}
                    trend="+10% vs mês anterior"
                    trendUp={true}
                />
                <StatCard
                    title="Riscos Críticos"
                    value="03"
                    subtext="Necessitam Atenção"
                    icon={<AlertTriangle className="text-yellow-500" />}
                    borderColor="border-yellow-500/30"
                />
                <StatCard
                    title="Compliance Rate"
                    value="45%"
                    subtext="ISO 42001"
                    icon={<ShieldCheck className="text-brand-blue" />}
                />
                <StatCard
                    title="Próxima Auditoria"
                    value="15 Dez"
                    subtext="Em 6 dias"
                    icon={<Clock className="text-purple-400" />}
                    borderColor="border-purple-500/30"
                />
            </div>

            {/* Main Workspace (Placeholder for now) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-96">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-white/5">
                    <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-brand-green" /> Atividade Recente
                    </h3>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5 hover:border-brand-blue/20 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                        <FileIcon />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white group-hover:text-brand-green transition-colors">Avaliação de Risco #00{i}</h4>
                                        <p className="text-xs text-brand-blue/50">Atualizado há 2 horas por {user.name.split(' ')[0]}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-mono text-brand-blue/40 px-2 py-1 rounded bg-white/5">Em Progresso</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Status */}
                <div className="glass-panel p-6 rounded-xl border border-white/5 bg-gradient-to-b from-brand-navy to-black/40">
                    <h3 className="font-display font-bold text-lg text-white mb-6">Status do Sistema</h3>
                    <div className="space-y-6">
                        <StatusItem label="API Gateway" status="online" />
                        <StatusItem label="Database Cluster" status="online" />
                        <StatusItem label="AI Engine (LLM)" status="processing" />

                        <div className="pt-6 mt-6 border-t border-white/5">
                            <p className="text-xs text-brand-blue/40 text-center mb-4">
                                Sua licença expira em <span className="text-white">29 dias</span>.
                            </p>
                            <Button variant="outline" size="sm" className="w-full">
                                Gerenciar Plano
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, subtext, icon, trend, trendUp, borderColor = "border-brand-green/20" }: any) {
    return (
        <div className={`glass-panel p-6 rounded-xl border ${borderColor} hover:border-brand-green/50 transition-all duration-300 group`}>
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    {icon}
                </div>
                {trend && (
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${trendUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-2xl font-bold font-display text-white">{value}</h3>
                <p className="text-xs font-bold text-brand-blue/80 uppercase tracking-wide">{title}</p>
                <p className="text-[10px] text-brand-blue/50 font-mono">{subtext}</p>
            </div>
        </div>
    );
}

function StatusItem({ label, status }: { label: string, status: "online" | "offline" | "processing" }) {
    const statusConfig = {
        online: { color: "bg-brand-green", text: "Online" },
        offline: { color: "bg-red-500", text: "Offline" },
        processing: { color: "bg-yellow-500", text: "Processando" },
    };

    const config = statusConfig[status];

    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-brand-blue/70">{label}</span>
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${config.color} ${status === 'online' ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-mono text-white/50 uppercase">{config.text}</span>
            </div>
        </div>
    );
}

function FileIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
    )
}
