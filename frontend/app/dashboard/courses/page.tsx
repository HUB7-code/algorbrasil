"use client";

import { PlayCircle, BookOpen, Star, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Course {
    id: string;
    title: string;
    type: string;
    thumbnail: string | null;
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await fetch('http://localhost:8000/api/v1/lms/courses');
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
                }
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    const handleStartCourse = (courseId: string) => {
        router.push(`/dashboard/classroom/${courseId}`);
    };

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

            {/* Featured Course (Hero) - Mantido estático por enquanto como destaque */}
            <div className="glass-panel p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
                {/* ... (Hero Content same as before) ... */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F] via-[#0A1A2F]/90 to-transparent z-10 pointer-events-none" />
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
                    <button
                        onClick={() => handleStartCourse('iso42001-lead')}
                        className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-[#0A1A2F] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg hover:bg-gray-100"
                    >
                        <PlayCircle className="w-5 h-5" /> Começar Agora
                    </button>
                </div>
            </div>

            {/* Course Grid - Dynamic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-[280px] bg-white/5 rounded-2xl animate-pulse" />)
                ) : (
                    courses.map(course => (
                        <CourseCard
                            key={course.id}
                            title={course.title}
                            type={course.type}
                            students="--" // Backend doesn't return count yet
                            duration="--" // Backend doesn't return total duration yet
                            onClick={() => handleStartCourse(course.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function CourseCard({ title, type, students, duration, onClick }: any) {
    const isCert = type === 'certification';
    const color = isCert ? 'text-[#00FF94]' : 'text-[#00A3FF]';
    const bgColor = isCert ? 'bg-[#00FF94]/5' : 'bg-[#00A3FF]/5';
    const borderColor = isCert ? 'border-[#00FF94]/20' : 'border-[#00A3FF]/20';

    return (
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-[280px] group hover:border-white/20 transition-all cursor-pointer" onClick={onClick}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${bgColor} ${color} border ${borderColor}`}>
                    <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-[10px] uppercase font-bold text-gray-500 bg-white/5 border border-white/5 px-2 py-1 rounded">
                    {type === 'certification' ? 'Carreira' : 'Workshop'}
                </div>
            </div>

            <div className="flex-1">
                <h3 className="text-xl font-serif font-medium text-white mb-2 group-hover:text-white/80 transition-colors line-clamp-2">
                    {title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mt-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {duration}</span>
                    <span>{students} alunos</span>
                </div>
            </div>

            <button className="w-full py-3 rounded-lg border border-white/10 hover:bg-white text-white hover:text-[#0A1A2F] font-bold text-xs uppercase tracking-widest transition-all mt-4">
                Acessar Conteúdo
            </button>
        </div>
    );
}
