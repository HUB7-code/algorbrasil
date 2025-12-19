"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    PlayCircle, FileText, CheckCircle2, Lock, ChevronRight,
    Menu, X, BookOpen, Download
} from "lucide-react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface Lesson {
    id: string;
    title: string;
    type: "video" | "document" | "quiz";
    content: string | null;
    duration: number;
    status: "locked" | "unlocked" | "completed";
}

interface Module {
    id: number;
    title: string;
    lessons: Lesson[];
}

interface CourseStructure {
    id: string;
    title: string;
    description: string;
    modules: Module[];
}

export default function ClassroomPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;

    const [course, setCourse] = useState<CourseStructure | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Fetch Course Data
    useEffect(() => {
        async function fetchCourse() {
            try {
                // Em produção, passar token JWT no header Authorization
                const res = await fetch(`http://localhost:8000/api/v1/lms/courses/${courseId}`);
                if (!res.ok) throw new Error("Failed to load course");

                const data = await res.json();
                setCourse(data);

                // Set first unlocked lesson as active if none selected
                if (data.modules.length > 0 && data.modules[0].lessons.length > 0) {
                    setActiveLesson(data.modules[0].lessons[0]);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if (courseId) fetchCourse();
    }, [courseId]);

    const handleLessonComplete = async (lessonId: string) => {
        // Optimistic update
        if (!course) return;

        // Call API
        try {
            await fetch(`http://localhost:8000/api/v1/lms/enrollments/${courseId}/progress`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lesson_id: lessonId,
                    status: "completed",
                    seek_time: 0
                })
            });

            // Refresh local state (simplified for demo)
            // In a real app, we would update the specific lesson in the state tree
            const updatedModules = course.modules.map(mod => ({
                ...mod,
                lessons: mod.lessons.map(l => l.id === lessonId ? { ...l, status: "completed" } : l)
            }));
            // @ts-ignore
            setCourse({ ...course, modules: updatedModules });

        } catch (error) {
            console.error("Failed to update progress", error);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center text-white">Carregando Sala de Aula...</div>;
    if (!course) return <div className="flex h-screen items-center justify-center text-white">Curso não encontrado.</div>;

    return (
        <div className="flex h-screen bg-[#0A1A2F] text-white overflow-hidden font-sans">

            {/* --- SIDEBAR (Modules & Lessons) --- */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-40 w-80 bg-[#0A1A2F]/95 border-r border-white/5 backdrop-blur-xl flex flex-col transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:hidden"}
                `}
            >
                <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <h2 className="font-serif font-bold text-lg tracking-wide truncate max-w-[200px]" title={course.title}>
                        {course.title}
                    </h2>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-white/10 rounded">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                    {course.modules.map((module, mIdx) => (
                        <div key={module.id} className="mb-2">
                            <div className="px-4 py-3 bg-white/5 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white">
                                    {mIdx + 1}
                                </span>
                                {module.title}
                            </div>
                            <div>
                                {module.lessons.map((lesson, lIdx) => {
                                    const isActive = activeLesson?.id === lesson.id;
                                    const isLocked = lesson.status === 'locked';
                                    const isCompleted = lesson.status === 'completed';

                                    return (
                                        <button
                                            key={lesson.id}
                                            disabled={isLocked}
                                            onClick={() => setActiveLesson(lesson)}
                                            className={`
                                                w-full flex items-center gap-3 px-4 py-3 text-sm transition-all border-l-2
                                                ${isActive
                                                    ? "bg-[#00FF94]/10 text-[#00FF94] border-[#00FF94]"
                                                    : "text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                                                }
                                                ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                                            `}
                                        >
                                            <div className="shrink-0">
                                                {isLocked ? <Lock size={16} /> :
                                                    isCompleted ? <CheckCircle2 size={16} className="text-emerald-500" /> :
                                                        lesson.type === 'video' ? <PlayCircle size={16} /> : <FileText size={16} />}
                                            </div>
                                            <span className="text-left font-medium truncate flex-1">{lesson.title}</span>
                                            {lesson.duration > 0 && <span className="text-[10px] opacity-60">{lesson.duration}m</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Bar (Global) */}
                <div className="p-4 border-t border-white/5 bg-black/20">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Progresso do Curso</span>
                        <span>0%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00FF94] w-[0%]" />
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col h-full relative overflow-y-auto">

                {/* Mobile Header */}
                <div className="lg:hidden h-14 flex items-center px-4 border-b border-white/5 bg-[#0A1A2F]">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-white">
                        <Menu size={24} />
                    </button>
                    <span className="ml-2 font-bold truncate">{activeLesson?.title}</span>
                </div>

                {/* Content Container */}
                <div className="flex-1 p-0 lg:p-8 max-w-6xl mx-auto w-full">

                    {activeLesson ? (
                        <div className="space-y-6">

                            {/* Video / Content Player */}
                            <div className="aspect-video bg-black rounded-none lg:rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                                {activeLesson.type === 'video' ? (
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${activeLesson.content}`}
                                        width="100%"
                                        height="100%"
                                        controls={true}
                                        onEnded={() => handleLessonComplete(activeLesson.id)}
                                        config={{
                                            youtube: {
                                                playerVars: { showinfo: 1 }
                                            } as any
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400">
                                        <FileText size={64} className="mb-4 text-emerald-500 opacity-50" />
                                        <h3 className="text-xl font-bold text-white mb-2">Material de Leitura</h3>
                                        <p className="max-w-md text-center text-sm mb-6">
                                            Este conteúdo é um documento PDF ou artigo. Clique abaixo para acessar.
                                        </p>
                                        <a
                                            href={activeLesson.content || "#"}
                                            target="_blank"
                                            onClick={() => handleLessonComplete(activeLesson.id)}
                                            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <Download size={18} /> Acessar Documento
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Header info */}
                            <div className="px-4 lg:px-0 flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{activeLesson.title}</h1>
                                    <p className="text-slate-400 flex items-center gap-2 text-sm">
                                        <span className="capitalize px-2 py-0.5 rounded bg-white/10 text-white text-xs">{activeLesson.type}</span>
                                        <span>•</span>
                                        <span>Duração estimada: {activeLesson.duration} min</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleLessonComplete(activeLesson.id)}
                                    disabled={activeLesson.status === 'completed'}
                                    className={`px-6 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2
                                        ${activeLesson.status === 'completed'
                                            ? "bg-emerald-500/20 text-emerald-400 cursor-default"
                                            : "bg-[#00A3FF] hover:bg-[#0082CC] text-white shadow-lg shadow-blue-500/25"}
                                    `}
                                >
                                    {activeLesson.status === 'completed' ? (
                                        <> <CheckCircle2 size={18} /> Concluído </>
                                    ) : (
                                        <> Marcar como Concluído <ChevronRight size={18} /> </>
                                    )}
                                </button>
                            </div>

                            {/* Description / Resources */}
                            <div className="px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                                <div className="lg:col-span-2 space-y-4">
                                    <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Sobre esta aula</h3>
                                    <p className="text-slate-300 leading-relaxed text-sm">
                                        Nesta aula, abordaremos os conceitos fundamentais necessários para compreender a estrutura da ISO 42001 e como ela se aplica ao contexto de governança de inteligência artificial. Prepare-se para anotações.
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-5 border border-white/5 h-fit">
                                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                                        <BookOpen size={16} className="text-[#00FF94]" /> Recursos
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm text-slate-400 hover:text-[#00A3FF] cursor-pointer transition-colors">
                                            <FileText size={14} /> Slide Deck (PDF)
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-slate-400 hover:text-[#00A3FF] cursor-pointer transition-colors">
                                            <FileText size={14} /> Template Matriz de Riscos.xlsx
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">
                            Selecione uma aula no menu lateral para começar.
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
