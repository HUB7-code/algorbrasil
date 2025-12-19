"use client";

import { Folder, GitBranch, Users, Play, Plus } from "lucide-react";

export default function ProjectsPage() {
    return (
        <div className="p-8 w-full min-h-screen space-y-10 relative text-white font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2 tracking-tight">
                        Projetos de IA (Gov)
                    </h1>
                    <p className="text-gray-300 font-light text-lg">
                        Gestão de ciclo de vida de projetos de Inteligência Artificial.
                    </p>
                </div>

                <button className="flex items-center gap-3 px-6 py-3 rounded-lg bg-[#00FF94] hover:bg-[#00FF94]/90 text-[#0A1A2F] font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(0,255,148,0.2)]">
                    <Plus className="w-4 h-4" />
                    NOVO PROJETO
                </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <ProjectCard
                    title="Chatbot Cidadão v2"
                    status="Em Desenvolvimento"
                    progress={65}
                    members={4}
                    color="text-[#00A3FF]"
                    barColor="bg-[#00A3FF]"
                />
                <ProjectCard
                    title="Análise Preditiva Fiscal"
                    status="Homologação"
                    progress={90}
                    members={8}
                    color="text-[#00FF94]"
                    barColor="bg-[#00FF94]"
                />
                <ProjectCard
                    title="Automação de Diário Oficial"
                    status="Planejamento"
                    progress={15}
                    members={2}
                    color="text-purple-400"
                    barColor="bg-purple-400"
                />
            </div>
        </div>
    );
}

function ProjectCard({ title, status, progress, members, color, barColor }: any) {
    return (
        <div className="glass-panel p-8 rounded-2xl relative group hover:border-white/20 transition-all duration-300">

            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <Folder className={`w-6 h-6 ${color}`} />
                </div>
                <div className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    {status}
                </div>
            </div>

            <h3 className="text-xl font-serif font-medium text-white mb-6 group-hover:text-white/90">{title}</h3>

            <div className="space-y-4">
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${barColor} transition-all duration-1000`} style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 font-mono">
                    <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                        <GitBranch className="w-3 h-3" /> main
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users className="w-3 h-3" /> {members} devs
                    </span>
                </div>
            </div>
        </div>
    );
}
