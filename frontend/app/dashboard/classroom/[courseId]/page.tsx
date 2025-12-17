"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, PlayCircle, CheckCircle, FileText, Lock, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import SecurePDFViewer from '@/components/SecurePDFViewer';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false }) as any;

type Lesson = {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'quiz' | 'document';
    url?: string;
    isLocked: boolean;
    isCompleted: boolean;
};

type Module = {
    id: string;
    title: string;
    lessons: Lesson[];
};

export default function ClassroomPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;

    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [expandedModules, setExpandedModules] = useState<string[]>([]);

    // Mock Course Data (Replace with API)
    const [course, setCourse] = useState<{ title: string; modules: Module[] } | null>(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const token = localStorage.getItem('algor_token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const res = await fetch(`/api/v1/lms/courses/${courseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setCourse(data);

                    // Auto-open first module if exists
                    if (data.modules && data.modules.length > 0) {
                        setExpandedModules([data.modules[0].id]);

                        // Auto-select first lesson if exists
                        if (data.modules[0].lessons && data.modules[0].lessons.length > 0) {
                            // Logic to select last accessed lesson could go here (saved in progress)
                            // For now, select first
                            setActiveLesson(data.modules[0].lessons[0]);
                        }
                    }
                } else {
                    console.error("Failed to load course");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourseData();
    }, [courseId, router]);

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
        );
    };

    const handleLessonSelect = (lesson: Lesson) => {
        if (!lesson.isLocked) {
            setActiveLesson(lesson);
        }
    };

    if (!course || !activeLesson) return <div className="min-h-screen flex items-center justify-center text-brand-blue animate-pulse">Carregando Sala de Aula...</div>;

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#050B14]">

            {/* Main Content (Player) */}
            <div className="flex-1 flex flex-col relative overflow-y-auto">
                {/* Header */}
                <div className="h-16 flex items-center px-6 border-b border-white/5 bg-[#0A1A2F]/80 backdrop-blur-md justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-sm font-bold text-gray-200 uppercase tracking-wide truncate max-w-[200px] md:max-w-md">
                            {course.title}
                        </h1>
                        <span className="text-gray-600">/</span>
                        <span className="text-brand-blue text-sm truncate">{activeLesson.title}</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-gray-400">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                {/* Player Area */}
                <div className="flex-1 bg-black relative flex items-center justify-center">
                    {activeLesson.type === 'video' ? (
                        <div className="w-full h-full max-h-[80vh] aspect-video relative">
                            <ReactPlayer
                                url={activeLesson.url || ''}
                                width="100%"
                                height="100%"
                                controls={true}
                                playing={false}
                                config={{
                                    youtube: {
                                        playerVars: { showinfo: 1 }
                                    }
                                }}
                            />
                        </div>
                    ) : activeLesson.type === 'document' ? (
                        <div className="w-full h-full p-8 overflow-y-auto bg-[#0F172A]">
                            <SecurePDFViewer fileUrl="/sample.pdf" />
                        </div>
                    ) : (
                        <div className="text-center p-8">
                            <h2 className="text-2xl text-white mb-4">Quiz Time!</h2>
                            <p className="text-gray-400">Funcionalidade em breve.</p>
                        </div>
                    )}
                </div>

                {/* Lesson Description / Tabs */}
                {/* Could go here */}
            </div>

            {/* Curriculum Sidebar */}
            <div
                className={`
                    w-[350px] bg-[#0A1A2F] border-l border-white/5 flex flex-col shrink-0 transition-all duration-300 ease-in-out absolute right-0 top-0 bottom-0 z-20 lg:static
                    ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:w-0 lg:border-l-0'}
                `}
            >
                <div className="p-6 border-b border-white/5 bg-[#0B1D36]">
                    <h2 className="font-display font-medium text-white mb-1">Conteúdo do Curso</h2>
                    <div className="flex items-center justify-between text-xs text-gray-400 font-mono mt-2">
                        <span>33% Concluído</span>
                        <span>1/3 Módulos</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-brand-green w-1/3" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                    {course.modules.map((module) => (
                        <div key={module.id} className="border-b border-white/5">
                            <button
                                onClick={() => toggleModule(module.id)}
                                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
                            >
                                <span className="text-sm font-bold text-gray-200">{module.title}</span>
                                {expandedModules.includes(module.id) ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                            </button>

                            {/* Lessons List */}
                            {expandedModules.includes(module.id) && (
                                <div className="bg-[#050B14]">
                                    {module.lessons.map((lesson) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => handleLessonSelect(lesson)}
                                            disabled={lesson.isLocked}
                                            className={`
                                                w-full flex items-start gap-3 p-4 border-l-2 transition-all hover:bg-white/5 text-left
                                                ${activeLesson.id === lesson.id
                                                    ? 'border-brand-blue bg-brand-blue/5'
                                                    : 'border-transparent'
                                                }
                                                ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                            `}
                                        >
                                            <div className="mt-0.5">
                                                {lesson.isLocked ? (
                                                    <Lock className="w-4 h-4 text-gray-600" />
                                                ) : lesson.isCompleted ? (
                                                    <CheckCircle className="w-4 h-4 text-brand-green" />
                                                ) : lesson.type === 'video' ? (
                                                    <PlayCircle className={`w-4 h-4 ${activeLesson.id === lesson.id ? 'text-brand-blue' : 'text-gray-400'}`} />
                                                ) : (
                                                    <FileText className="w-4 h-4 text-gray-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className={`text-sm ${activeLesson.id === lesson.id ? 'text-brand-blue font-medium' : 'text-gray-400'}`}>
                                                    {lesson.title}
                                                </p>
                                                <p className="text-[10px] text-gray-600 font-mono mt-1">{lesson.duration}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-10 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
