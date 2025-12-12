"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
import {
    PlayCircle,
    FileText,
    CheckCircle,
    Lock,
    ChevronLeft,
    Menu,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TS Interfaces ---
interface Lesson {
    id: string;
    title: string;
    type: 'video' | 'document';
    content: string; // url or ID
    duration: number;
    status: 'locked' | 'unlocked' | 'completed' | 'in_progress';
    completed: boolean;
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
    const courseId = params?.courseId as string;

    const [course, setCourse] = useState<CourseStructure | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Fetch Course Data
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const token = localStorage.getItem('algor_token');
                // Em produção real, descomente:
                const res = await fetch(`/api/v1/lms/courses/${courseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setCourse(data);
                    // Set first unlocked lesson as active if none selected
                    // Logic to find first unlocked
                    if (data.modules?.length > 0) {
                        const first = data.modules[0].lessons[0];
                        setActiveLesson(first);
                    }
                } else {
                    // Fallback Mock for Demo if API fails (or dev mode without backend running)
                    console.warn("API Error, using fallback data");
                    setCourse(MOCK_COURSE);
                    setActiveLesson(MOCK_COURSE.modules[0].lessons[0]);
                }
            } catch (error) {
                console.error("Failed to load course", error);
                setCourse(MOCK_COURSE);
                setActiveLesson(MOCK_COURSE.modules[0].lessons[0]);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) fetchCourse();
    }, [courseId]);

    const handleLessonComplete = async (lessonId: string) => {
        // Optimistic Update
        if (!course) return;

        // Call API
        try {
            const token = localStorage.getItem('algor_token');
            await fetch(`/api/v1/lms/enrollments/${courseId}/progress`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lesson_id: lessonId,
                    status: 'completed',
                    seek_time: 0
                })
            });
        } catch (e) {
            console.error(e);
        }

        // Update Local State for UI
        const newModules = course.modules.map(mod => ({
            ...mod,
            lessons: mod.lessons.map(l =>
                l.id === lessonId ? { ...l, status: 'completed' as const, completed: true } : l
            )
        }));
        setCourse({ ...course, modules: newModules });
    };

    if (loading) return <div className="min-h-screen bg-[#050511] flex items-center justify-center text-white">Carregando Sala de Aula...</div>;
    if (!course) return <div className="min-h-screen bg-[#050511] flex items-center justify-center text-white">Curso não encontrado.</div>;

    return (
        <div className="flex h-screen bg-[#050511] text-white overflow-hidden">

            {/* --- SIDEBAR (Modules) --- */}
            <AnimatePresence mode="wait">
                {sidebarOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 320, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="bg-[#12141C] border-r border-white/5 flex-shrink-0 flex flex-col h-full z-20"
                    >
                        <div className="p-6 border-b border-white/5">
                            <button onClick={() => router.push('/dashboard')} className="flex items-center text-xs text-gray-400 hover:text-white mb-4 transition-colors">
                                <ChevronLeft className="w-4 h-4 mr-1" /> Voltar ao Dashboard
                            </button>
                            <h2 className="font-bold text-lg leading-tight text-white">{course.title}</h2>
                            <p className="text-xs text-[#00FF94] mt-2 font-mono">PROGRESSO: 15%</p>
                            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-[#00FF94] w-[15%]" />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {course.modules.map((module, i) => (
                                <div key={module.id} className="space-y-2">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">
                                        Módulo {i + 1}: {module.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {module.lessons.map((lesson) => (
                                            <button
                                                key={lesson.id}
                                                onClick={() => lesson.status !== 'locked' && setActiveLesson(lesson)}
                                                disabled={lesson.status === 'locked'}
                                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all text-left
                                                    ${activeLesson?.id === lesson.id
                                                        ? 'bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20'
                                                        : 'hover:bg-white/5 text-gray-400'
                                                    }
                                                    ${lesson.status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''}
                                                `}
                                            >
                                                {/* Status Icon */}
                                                <div className="flex-shrink-0">
                                                    {lesson.status === 'locked' ? (
                                                        <Lock className="w-4 h-4" />
                                                    ) : lesson.completed ? (
                                                        <CheckCircle className="w-4 h-4 text-[#00FF94]" />
                                                    ) : lesson.type === 'video' ? (
                                                        <PlayCircle className="w-4 h-4" />
                                                    ) : (
                                                        <FileText className="w-4 h-4" />
                                                    )}
                                                </div>

                                                <div className="flex-1 line-clamp-2">
                                                    {lesson.title}
                                                </div>

                                                <span className="text-[10px] opacity-60 font-mono">
                                                    {lesson.duration}min
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* --- MAIN CONTENT (Player) --- */}
            <main className="flex-1 flex flex-col relative h-full">
                {/* Header (Within Main) */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#050511]">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-white/5 rounded-md text-gray-400 hover:text-white"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="text-sm font-medium text-gray-300">
                        {activeLesson?.title}
                    </div>
                    <div className="w-8" /> {/* Spacer */}
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center">

                    {activeLesson ? (
                        <div className="w-full max-w-5xl space-y-6">

                            {/* Player Wrapper */}
                            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                                {activeLesson.type === 'video' ? (
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${activeLesson.content}`}
                                        width="100%"
                                        height="100%"
                                        controls
                                        onEnded={() => handleLessonComplete(activeLesson.id)}
                                        config={{
                                            youtube: {
                                                playerVars: { showinfo: 0 }
                                            }
                                        }}
                                    />
                                ) : (
                                    // Document Viewer Placeholder
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#12141C]">
                                        <FileText className="w-20 h-20 text-gray-600 mb-4" />
                                        <h3 className="text-xl text-gray-300 mb-6">Material de Leitura</h3>
                                        <button className="px-6 py-3 bg-[#00A3FF] hover:bg-[#0082CC] text-white rounded-lg font-medium flex items-center gap-2">
                                            <Download className="w-5 h-5" />
                                            Baixar PDF ({activeLesson.duration} pág)
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Lesson Info */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold text-white mb-2">{activeLesson.title}</h1>
                                    <p className="text-gray-400">
                                        Módulo atual • {activeLesson.type === 'video' ? 'Videoaula' : 'Documento'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleLessonComplete(activeLesson.id)}
                                    className={`px-6 py-2 rounded-full border transition-all text-sm font-medium
                                        ${activeLesson.completed
                                            ? 'bg-[#00FF94]/20 text-[#00FF94] border-[#00FF94]/30'
                                            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    {activeLesson.completed ? 'Concluído' : 'Marcar como Concluído'}
                                </button>
                            </div>

                        </div>
                    ) : (
                        <div className="text-gray-500">Selecione uma aula para começar.</div>
                    )}

                </div>
            </main>

        </div>
    );
}

// Fallback Data
const MOCK_COURSE: CourseStructure = {
    id: "iso42001-lead",
    title: "Formação Lead Implementer ISO 42001",
    description: "Curso completo de implementação.",
    modules: [
        {
            id: 1,
            title: "Introdução à Governança",
            lessons: [
                { id: "l1", title: "O que é a ISO 42001?", type: 'video', content: "dQw4w9WgXcQ", duration: 10, status: 'unlocked', completed: true },
                { id: "l2", title: "Estrutura HLS (High Level Structure)", type: 'video', content: "M7lc1UVf-VE", duration: 15, status: 'unlocked', completed: false },
                { id: "l3", title: "Material de Apoio (PDF)", type: 'document', content: "doc1", duration: 5, status: 'unlocked', completed: false },
            ]
        },
        {
            id: 2,
            title: "Planejamento (Cláusula 6)",
            lessons: [
                { id: "l4", title: "Matriz de Riscos de IA", type: 'video', content: "xyz", duration: 20, status: 'locked', completed: false },
            ]
        }
    ]
};
