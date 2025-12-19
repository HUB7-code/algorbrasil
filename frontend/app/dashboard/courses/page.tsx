"use client";

import { PlayCircle, BookOpen, Star, Clock } from "lucide-react";

export default function CoursesPage() {
    return (
        <div className="p-8 w-full min-h-screen space-y-10 relative text-white font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2 tracking-tight">
                        Universidade ALGOR
                    </h1>
                    <p className="text-gray-300 font-light text-lg">
                        Capacitação executiva para a era da Governança de IA.
                    </p>
                </div>
            </div>

            {/* Featured Course (Hero) */}
            <div className="glass-panel p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F] via-[#0A1A2F]/90 to-transparent z-10 pointer-events-none" />
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />

                <div className="relative z-20 flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20 text-[10px] font-bold uppercase tracking-widest">
                        <Star className="w-3 h-3 fill-current" /> Certificação Oficial
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-white leading-tight">
                        Auditor Líder <br />ISO 42001
                    </h2>
                    <p className="text-gray-300 max-w-lg text-lg font-light leading-relaxed">
                        Domine a norma internacional de gestão de IA e torne-se um auditor certificado pela ALGOR.
                    </p>
                    <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-[#0A1A2F] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg hover:bg-gray-100">
                        <PlayCircle className="w-5 h-5" /> Começar Agora
                    </button>
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <CourseCard
                    title="Lei de IA (PL 2338)"
                    duration="4h 30m"
                    students="1.2k"
                    level="Iniciante"
                    color="text-[#00FF94]"
                    BorderColor="border-[#00FF94]/20"
                    BgColor="bg-[#00FF94]/5"
                />
                <CourseCard
                    title="Engenharia de Prompt Segura"
                    duration="8h 15m"
                    students="850"
                    level="Intermediário"
                    color="text-[#00A3FF]"
                    BorderColor="border-[#00A3FF]/20"
                    BgColor="bg-[#00A3FF]/5"
                />
                <CourseCard
                    title="Auditoria de Vieses"
                    duration="12h 00m"
                    students="420"
                    level="Avançado"
                    color="text-aurora-violet"
                    BorderColor="border-purple-500/20"
                    BgColor="bg-purple-500/5"
                />
            </div>
        </div>
    );
}

function CourseCard({ title, duration, students, level, color, BorderColor, BgColor }: any) {
    return (
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-[280px] group hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${BgColor} ${color} border ${BorderColor}`}>
                    <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-[10px] uppercase font-bold text-gray-500 bg-white/5 border border-white/5 px-2 py-1 rounded">{level}</div>
            </div>

            <div className="flex-1">
                <h3 className="text-xl font-serif font-medium text-white mb-2 group-hover:text-white/80 transition-colors">{title}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mt-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {duration}</span>
                    <span>{students} alunos</span>
                </div>
            </div>

            <button className="w-full py-3 rounded-lg border border-white/10 hover:bg-white text-white hover:text-[#0A1A2F] font-bold text-xs uppercase tracking-widest transition-all mt-4">
                Ver Detalhes
            </button>
        </div>
    );
}
