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
import dynamic from 'next/dynamic';

const SecurePDFViewer = dynamic(() => import('@/components/SecurePDFViewer'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-gray-500">Carregando Leitor Seguro...</div>
});

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
        <div className="flex h-screen bg-[#131314] text-[#E3E3E3] overflow-hidden font-sans selection:bg-[#A8C7FA] selection:text-[#001D35]">

            {/* --- SIDEBAR (Modules - Google Material 3 Style) --- */}
            <AnimatePresence mode="wait">
                {sidebarOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 360, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="bg-[#1E1F20] flex-shrink-0 flex flex-col h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.2)]"
                    >
                        <div className="p-6">
                            <button onClick={() => router.push('/dashboard')} className="flex items-center text-sm text-[#C4C7C5] hover:text-white mb-6 transition-colors group">
                                <div className="p-2 rounded-full bg-[#303336] mr-3 group-hover:bg-[#444746] transition-colors">
                                    <ChevronLeft className="w-4 h-4" />
                                </div>
                                Voltar ao Hub
                            </button>

                            <div className="mb-6">
                                <h2 className="font-normal text-xl leading-tight text-[#E3E3E3] mb-2">{course.title}</h2>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-1 bg-[#444746] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#A8C7FA] w-[15%]" />
                                    </div>
                                    <span className="text-xs text-[#A8C7FA] font-medium">15%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6 scrollbar-thin scrollbar-thumb-[#444746] scrollbar-track-transparent">
                            {course.modules.map((module, i) => (
                                <div key={module.id} className="space-y-3">
                                    <h3 className="text-xs font-bold text-[#8E918F] uppercase tracking-wider px-3">
                                        Módulo {i + 1}: {module.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {module.lessons.map((lesson) => (
                                            <button
                                                key={lesson.id}
                                                onClick={() => lesson.status !== 'locked' && setActiveLesson(lesson)}
                                                disabled={lesson.status === 'locked'}
                                                className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left group border border-transparent
                                                    ${activeLesson?.id === lesson.id
                                                        ? 'bg-[#004A77] border-[#A8C7FA]/30 text-[#D3E3FD]'
                                                        : 'hover:bg-[#303336] text-[#C4C7C5]'
                                                    }
                                                    ${lesson.status === 'locked' ? 'opacity-40 cursor-not-allowed' : ''}
                                                `}
                                            >
                                                {/* Status Icon Wrapper */}
                                                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
                                                    ${activeLesson?.id === lesson.id ? 'text-[#A8C7FA]' : 'text-[#8E918F] group-hover:text-[#E3E3E3]'}
                                                `}>
                                                    {lesson.status === 'locked' ? (
                                                        <Lock className="w-4 h-4" />
                                                    ) : lesson.completed ? (
                                                        <CheckCircle className="w-5 h-5 text-[#6DD58C]" />
                                                    ) : lesson.type === 'video' ? (
                                                        <PlayCircle className="w-5 h-5" />
                                                    ) : (
                                                        <FileText className="w-5 h-5" />
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    <p className={`text-sm font-medium leading-snug ${activeLesson?.id === lesson.id ? 'text-[#D3E3FD]' : 'text-[#E3E3E3]'}`}>
                                                        {lesson.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[11px] opacity-70 flex items-center gap-1">
                                                            {lesson.duration} min
                                                        </span>
                                                        {lesson.status === 'in_progress' && (
                                                            <span className="text-[10px] bg-[#A8C7FA] text-[#001D35] px-1.5 py-0.5 rounded-sm font-bold">EM ANDAMENTO</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* --- MAIN CONTENT (Theater Mode) --- */}
            <main className="flex-1 flex flex-col relative h-full bg-[#131314]">
                {/* Minimal Header */}
                <header className="h-16 flex items-center px-6 border-b border-[#28292A] bg-[#131314]/90 backdrop-blur-md sticky top-0 z-10">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 -ml-2 rounded-full text-[#C4C7C5] hover:bg-[#303336] hover:text-white transition-colors"
                        title={sidebarOpen ? "Expandir Vídeo" : "Mostrar Aulas"}
                    >
                        {sidebarOpen ? <ChevronLeft className="w-6 h-6 rotate-180" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <span className="ml-4 text-sm font-medium text-[#E3E3E3] opacity-60">
                        / {course.title} / <span className="text-white opacity-100">{activeLesson?.title}</span>
                    </span>
                </header>

                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-[1400px] mx-auto p-6 md:p-8 flex flex-col items-center">

                        {activeLesson ? (
                            <div className="w-full space-y-8">

                                {/* THEATER PLAYER */}
                                <div className="w-full relative group">
                                    <div className={`w-full bg-black rounded-[24px] overflow-hidden border border-[#28292A] shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative z-0 transition-all duration-500 ease-in-out ${activeLesson.type === 'video' ? 'aspect-video' : 'h-[85vh]'}`}>
                                        {activeLesson.type === 'video' ? (
                                            <ReactPlayer
                                                url={`https://www.youtube.com/watch?v=${activeLesson.content}`}
                                                width="100%"
                                                height="100%"
                                                controls
                                                onEnded={() => handleLessonComplete(activeLesson.id)}
                                                config={{
                                                    youtube: {
                                                        // playerVars removed as they are deprecated/untyped in newer versions
                                                    }
                                                }}
                                            />
                                        ) : (
                                            // Secure Document Viewer (Canvas Based)
                                            <div className="w-full h-full bg-[#1E1F20]">
                                                <SecurePDFViewer
                                                    fileUrl={activeLesson.content.startsWith('http') ? activeLesson.content : 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'}
                                                    userEmail="auditor@algor.com.br"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Tabs & Actions */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left: Description */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div>
                                            <h1 className="text-3xl md:text-4xl font-normal text-[#E3E3E3] mb-4">{activeLesson.title}</h1>
                                            <div className="flex items-center gap-4 text-sm text-[#C4C7C5]">
                                                <span className="flex items-center gap-1"><PlayCircle className="w-4 h-4" /> {activeLesson.type === 'video' ? 'Videoaula' : 'Leitura'}</span>
                                                <span className="w-1 h-1 bg-[#444746] rounded-full" />
                                                <span>Atualizado em Dez 2025</span>
                                            </div>
                                        </div>

                                        <div className="prose prose-invert prose-p:text-[#C4C7C5] prose-h3:text-[#E3E3E3] max-w-none">
                                            <h3>Sobre esta aula</h3>
                                            <p>
                                                Nesta lição, exploraremos os fundamentos da cláusula 4 da ISO 42001, focando no entendimento do contexto da organização e como isso impacta a governança de IA. Prepare-se para analisar casos de uso reais.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Actions Card */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-[#1E1F20] rounded-[24px] p-6 border border-[#28292A]">
                                            <h3 className="text-lg font-medium text-[#E3E3E3] mb-4">Ações da Aula</h3>

                                            <button
                                                onClick={() => handleLessonComplete(activeLesson.id)}
                                                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all mb-4
                                                    ${activeLesson.completed
                                                        ? 'bg-[#1E1F20] border-2 border-[#6DD58C] text-[#6DD58C] cursor-default'
                                                        : 'bg-[#004A77] hover:bg-[#005C94] text-[#D3E3FD] shadow-lg'
                                                    }`}
                                            >
                                                {activeLesson.completed ? (
                                                    <> <CheckCircle className="w-5 h-5" /> Aula Concluída </>
                                                ) : (
                                                    "Marcar como Concluída"
                                                )}
                                            </button>

                                            <div className="space-y-3">
                                                <button className="w-full py-3 rounded-xl bg-[#303336] hover:bg-[#444746] text-[#E3E3E3] text-sm flex items-center justify-center gap-2 transition-colors">
                                                    <Download className="w-4 h-4" /> Material de Apoio (0)
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="text-gray-500 mt-20">Selecione uma aula para começar.</div>
                        )}

                    </div>
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
                { id: "l3", title: "Material de Apoio (PDF)", type: 'document', content: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf", duration: 5, status: 'unlocked', completed: false },
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
