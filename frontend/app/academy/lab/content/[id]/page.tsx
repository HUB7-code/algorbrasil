// Algor Lab - Content Detail Page
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Download, CheckCircle, List, Check, FileText, ChevronDown, ChevronRight, Award } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentPlaceholder from '@/components/lab/ContentPlaceholder';
import { useGamification } from '@/hooks/useGamification';
import { iso42001Content, CourseLesson } from '@/data/iso42001';

export default function ContentDetailPage({ params }: { params: { id: string } }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeLessonId, setActiveLessonId] = useState<string>('aula_magna');
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [expandedModules, setExpandedModules] = useState<string[]>(['mod_intro']);

    const { addXp } = useGamification();

    // Find current active lesson data layout
    const getCurrentLesson = (): CourseLesson | undefined => {
        for (const mod of iso42001Content) {
            const lesson = mod.lessons.find(l => l.id === activeLessonId);
            if (lesson) return lesson;
        }
        return iso42001Content[0].lessons[0]; // Fallback
    };

    const currentLesson = getCurrentLesson();

    const toggleModule = (modId: string) => {
        setExpandedModules(prev =>
            prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
        );
    };

    const handleLessonComplete = () => {
        if (!completedLessons.includes(activeLessonId)) {
            setCompletedLessons(prev => [...prev, activeLessonId]);
            addXp(150);
            toast.success('Aula Concluída!', {
                description: 'Você ganhou +150 XP!',
                style: { background: '#0A1A2F', border: '1px solid #00FF94', color: '#fff' }
            });
        }
    };

    if (!currentLesson) return <div>Carregando...</div>;

    return (
        <div className="min-h-screen bg-[#0A0E14] text-white">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Navigation */}
                <div className="max-w-[1600px] mx-auto px-6 mb-6">
                    <Link href="/academy/lab" className="inline-flex items-center text-gray-400 hover:text-[#00FF94] transition-colors gap-2 text-sm font-manrope">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para o Lab
                    </Link>
                </div>

                <div className="max-w-[1600px] mx-auto px-6 grid lg:grid-cols-4 gap-8">

                    {/* LEFT COLUMN: Player (3 cols) */}
                    <div className="lg:col-span-3">
                        {/* Video Player Container */}
                        <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group mb-8">
                            {isPlaying ? (
                                <iframe
                                    src={`${currentLesson.videoUrl}?autoplay=1&modestbranding=1&rel=0`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gray-900 cursor-pointer" onClick={() => setIsPlaying(true)}>
                                    <div className="absolute inset-0 opacity-50">
                                        <ContentPlaceholder type="video" title={currentLesson.title} />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-[#00FF94]/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#00FF94]/50 shadow-[0_0_30px_rgba(0,255,148,0.3)]">
                                            <Play className="w-10 h-10 text-[#00FF94] ml-1" fill="currentColor" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                                        <h2 className="text-3xl font-bold text-white font-orbitron">{currentLesson.title}</h2>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Lesson Details */}
                        <div className="bg-[#141922]/50 rounded-2xl border border-white/5 p-8">
                            <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
                                <div>
                                    <h1 className="text-2xl font-bold font-orbitron text-white mb-2">{currentLesson.title}</h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span className="flex items-center gap-1"><Play className="w-3 h-3 text-[#00FF94]" /> {currentLesson.duration} min</span>
                                        <span className="flex items-center gap-1"><Award className="w-3 h-3 text-[#00FF94]" /> Certificado ISO 42001</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLessonComplete}
                                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${completedLessons.includes(activeLessonId)
                                        ? 'bg-[#10B981]/20 text-[#10B981] cursor-default border border-[#10B981]/50'
                                        : 'bg-[#00FF94] text-[#0A0E14] hover:bg-[#00CC76]'
                                        }`}
                                >
                                    {completedLessons.includes(activeLessonId) ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-[#0A0E14]" />}
                                    {completedLessons.includes(activeLessonId) ? 'Concluída' : 'Marcar como Concluída'}
                                </button>
                            </div>

                            <div
                                className="description-content prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-[#00FF94]"
                                dangerouslySetInnerHTML={{ __html: currentLesson.description }}
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Curriculum & Materials (1 col) */}
                    <div className="space-y-6">

                        {/* Curriculum / Playlist */}
                        <div className="bg-[#141922] rounded-xl border border-white/5 overflow-hidden sticky top-24">
                            <div className="p-4 border-b border-white/5 bg-[#0A0E14] flex justify-between items-center">
                                <h3 className="font-orbitron font-bold text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                    <List className="w-4 h-4 text-[#00FF94]" /> Conteúdo do Curso
                                </h3>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                                {iso42001Content.map((module) => (
                                    <div key={module.id} className="border-b border-white/5 last:border-0">
                                        {/* Module Header */}
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            className="w-full p-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors text-left"
                                        >
                                            <span className="font-bold text-sm text-white">{module.title}</span>
                                            {expandedModules.includes(module.id) ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                                        </button>

                                        {/* Lessons List */}
                                        {expandedModules.includes(module.id) && (
                                            <div className="bg-[#0A0E14]/50">
                                                {module.lessons.map((lesson) => (
                                                    <div
                                                        key={lesson.id}
                                                        onClick={() => {
                                                            setActiveLessonId(lesson.id);
                                                            setIsPlaying(false);
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                        className={`p-4 pl-6 cursor-pointer flex items-start gap-3 transition-colors border-l-2 ${activeLessonId === lesson.id
                                                            ? 'bg-[#00FF94]/10 border-l-[#00FF94]'
                                                            : 'hover:bg-white/5 border-l-transparent'
                                                            }`}
                                                    >
                                                        <div className="mt-1">
                                                            {completedLessons.includes(lesson.id) ? (
                                                                <CheckCircle className="w-4 h-4 text-[#00FF94]" />
                                                            ) : (
                                                                <div className={`w-4 h-4 rounded-full border-2 ${activeLessonId === lesson.id ? 'border-[#00FF94]' : 'border-gray-600'}`} />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className={`text-xs font-bold mb-1 ${activeLessonId === lesson.id ? 'text-[#00FF94]' : 'text-gray-300'}`}>
                                                                {lesson.title}
                                                            </h4>
                                                            <span className="text-[10px] text-gray-500 block">{lesson.duration} min</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Materials Widget (Dynamic based on lesson) */}
                        {currentLesson.materials && currentLesson.materials.length > 0 && (
                            <div className="bg-[#141922] rounded-xl p-6 border border-white/5">
                                <h3 className="font-orbitron font-bold text-sm uppercase mb-4 flex items-center gap-2 text-gray-400">
                                    <FileText className="w-4 h-4 text-[#00FF94]" /> Materiais da Aula
                                </h3>
                                <div className="space-y-3">
                                    {currentLesson.materials.map((material) => (
                                        <a
                                            key={material.id}
                                            href={(material as any).downloadUrl || '#'}
                                            target="_blank"
                                            className="flex items-center justify-between p-3 bg-black/20 rounded-lg hover:bg-black/40 transition-colors group cursor-pointer border border-transparent hover:border-[#00FF94]/30"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${material.type === 'pdf' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                                                    }`}>
                                                    {material.type.toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors line-clamp-1 max-w-[150px]">
                                                        {material.title}
                                                    </span>
                                                </div>
                                            </div>
                                            <Download className="w-4 h-4 text-gray-500 group-hover:text-[#00FF94] transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
