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

    // Quiz State
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState(0);

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

    const handleSubmitQuiz = () => {
        if (!currentLesson?.quiz) return;

        let correctCount = 0;
        currentLesson.quiz.forEach(q => {
            if (quizAnswers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const score = Math.round((correctCount / currentLesson.quiz.length) * 100);
        setQuizScore(score);
        setQuizSubmitted(true);

        if (score >= 70) {
            toast.success('Parabéns! Você passou no teste.', {
                description: `Você acertou ${correctCount} de ${currentLesson.quiz.length} questões.`,
                style: { background: '#0A1A2F', border: '1px solid #00FF94', color: '#fff' }
            });
            handleLessonComplete();
        } else {
            toast.error('Tente novamente.', {
                description: 'Você precisa de pelo menos 70% de acerto.',
                style: { background: '#0A1A2F', border: '1px solid red', color: '#fff' }
            });
        }
    };

    if (!currentLesson) return <div>Carregando...</div>;

    return (
        <div className="min-h-screen bg-[#0A0E14] text-white">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Navigation */}
                <div className="max-w-[1600px] mx-auto px-6 mb-6 relative z-10">
                    <Link href="/academy/lab" className="inline-flex items-center text-gray-400 hover:text-[#00FF94] transition-colors gap-2 text-sm font-manrope cursor-pointer relative z-20">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para o Lab
                    </Link>
                </div>

                <div className="max-w-[1600px] mx-auto px-6 grid lg:grid-cols-4 gap-8">

                    {/* LEFT COLUMN: Player (3 cols) */}
                    <div className="lg:col-span-3">
                        {/* Video Player Container */}
                        {/* Media Player or Quiz Interface */}
                        <div className={`relative w-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group mb-8 ${currentLesson.quiz ? 'min-h-[500px] flex flex-col' : 'aspect-video'}`}>

                            {/* QUIZ MODE */}
                            {currentLesson.quiz ? (
                                <div className="flex-1 p-8 bg-[#0A1A2F] flex flex-col items-center justify-center">
                                    {!quizSubmitted ? (
                                        <div className="w-full max-w-3xl space-y-8">
                                            <div className="text-center mb-8">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20 mb-4">
                                                    <Award className="w-5 h-5" />
                                                    <span className="font-bold tracking-wider">QUIZ DE AUTO AVALIAÇÃO</span>
                                                </div>
                                                <h2 className="text-3xl font-bold font-orbitron text-white">Teste seus Conhecimentos</h2>
                                                <p className="text-gray-400 mt-2">Responda as {currentLesson.quiz.length} questões abaixo para completar esta etapa.</p>
                                            </div>

                                            <div className="space-y-6">
                                                {currentLesson.quiz.map((q, qIndex) => (
                                                    <div key={q.id} className="bg-[#141922] p-6 rounded-xl border border-white/5">
                                                        <h3 className="text-lg font-bold text-white mb-4 flex gap-3">
                                                            <span className="text-[#00FF94]">{qIndex + 1}.</span>
                                                            {q.question}
                                                        </h3>
                                                        <div className="space-y-3 pl-6">
                                                            {q.options.map((option, optIndex) => (
                                                                <label
                                                                    key={optIndex}
                                                                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${quizAnswers[q.id] === optIndex
                                                                        ? 'bg-[#00FF94]/10 border-[#00FF94] text-white'
                                                                        : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'
                                                                        }`}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={q.id}
                                                                        className="hidden"
                                                                        checked={quizAnswers[q.id] === optIndex}
                                                                        onChange={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                                                                    />
                                                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${quizAnswers[q.id] === optIndex ? 'border-[#00FF94]' : 'border-gray-500'
                                                                        }`}>
                                                                        {quizAnswers[q.id] === optIndex && <div className="w-2 h-2 rounded-full bg-[#00FF94]" />}
                                                                    </div>
                                                                    <span>{option}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={handleSubmitQuiz}
                                                disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                                                className="w-full py-4 bg-[#00FF94] text-black font-bold font-orbitron rounded-xl hover:bg-[#00CC76] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)] mt-8"
                                            >
                                                ENVIAR RESPOSTAS
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center w-full max-w-2xl animate-in fade-in zoom-in duration-500">
                                            <div className="mb-6 inline-flex justify-center">
                                                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl border-4 ${quizScore >= 70 ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-red-500/20 border-red-500 text-red-500'
                                                    }`}>
                                                    {quizScore}%
                                                </div>
                                            </div>

                                            <h2 className="text-4xl font-bold text-white font-orbitron mb-4">
                                                {quizScore >= 70 ? 'Excelente!' : 'Bom esforço!'}
                                            </h2>
                                            <p className="text-xl text-gray-400 mb-8">
                                                Você acertou {Object.keys(quizAnswers).filter(qid => {
                                                    const q = currentLesson?.quiz?.find(qz => qz.id === qid);
                                                    return q && quizAnswers[qid] === q.correctAnswer;
                                                }).length} de {currentLesson.quiz.length} questões.
                                            </p>

                                            <div className="flex gap-4 justify-center">
                                                <button
                                                    onClick={() => {
                                                        setQuizSubmitted(false);
                                                        setQuizAnswers({});
                                                        setQuizScore(0);
                                                    }}
                                                    className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-colors"
                                                >
                                                    Tentar Novamente
                                                </button>
                                                {quizScore >= 70 && (
                                                    <button
                                                        onClick={handleLessonComplete}
                                                        className="px-8 py-3 bg-[#00FF94] hover:bg-[#00CC76] text-black rounded-lg font-bold transition-colors shadow-[0_0_20px_rgba(0,255,148,0.3)]"
                                                    >
                                                        Concluir Etapa
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* VIDEO PLAYER MODE */
                                isPlaying ? (
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
                                )
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
                                dangerouslySetInnerHTML={{ __html: currentLesson.description || '' }}
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
