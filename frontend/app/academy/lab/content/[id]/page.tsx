// Algor Lab - Content Detail Page
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Download, CheckCircle, List, Check, FileText, ChevronDown, ChevronRight, Award } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentPlaceholder from '@/components/lab/ContentPlaceholder';
import { useGamification } from '@/hooks/useGamification';
import { iso42001Content, CourseLesson } from '@/data/iso42001';

export default function ContentDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
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

    const handleToggleComplete = () => {
        if (completedLessons.includes(activeLessonId)) {
            setCompletedLessons(prev => prev.filter(id => id !== activeLessonId));
            toast.info('Aula marcada como pendente.', {
                style: { background: '#0A1A2F', border: '1px solid #333', color: '#fff' }
            });
        } else {
            handleLessonComplete();
        }
    };

    const handleQuizFinish = () => {
        handleLessonComplete();
        router.push('/academy/lab?concluded=true');
    };

    // Load persisted quiz state
    useEffect(() => {
        if (currentLesson?.quiz) {
            const savedState = localStorage.getItem(`quiz_attempt_${activeLessonId}`);
            if (savedState) {
                const { score, answers } = JSON.parse(savedState);
                setQuizAnswers(answers || {});
                setQuizScore(score || 0);
                setQuizSubmitted(true); // Always submitted if found, enforcing One Shot
            } else {
                setQuizSubmitted(false);
                setQuizAnswers({});
                setQuizScore(0);
            }
        }
    }, [activeLessonId, currentLesson]);

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

        // Persist Attempt (One Shot)
        localStorage.setItem(`quiz_attempt_${activeLessonId}`, JSON.stringify({
            score,
            answers: quizAnswers,
            submitted: true,
            timestamp: new Date().toISOString()
        }));

        if (score >= 100) {
            toast.success('Aprovado!', {
                description: `Perfeito! Desempenho máximo: ${score}%`,
                style: { background: '#0A1A2F', border: '1px solid #00FF94', color: '#fff' }
            });
            handleLessonComplete();
        } else {
            toast.error('Reprovado.', {
                description: 'A auto-avaliação exige 100% de acerto.',
                style: { background: '#0A1A2F', border: '1px solid red', color: '#fff' }
            });
        }
    };

    if (!currentLesson) {
        return (
            <div className="min-h-screen bg-[#0A0E14] text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 rounded-full border-2 border-[#00FF94] border-t-transparent animate-spin" />
                    <p className="font-orbitron tracking-widest text-[#00FF94] text-sm">CARREGANDO SISTEMA...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0E14] text-white">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Navigation */}
                <div className="max-w-[1600px] mx-auto px-6 mb-6 relative z-10">
                    <Link href="/academy/lab" prefetch={false} className="inline-flex items-center text-gray-400 hover:text-[#00FF94] transition-colors gap-2 text-sm font-manrope cursor-pointer relative z-20">
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
                                <div className="flex-1 relative bg-[#0A1A2F] flex flex-col items-center overflow-y-auto min-h-[600px] scrollbar-thin scrollbar-thumb-[#00FF94]/20 scrollbar-track-transparent">
                                    {/* Ambient Background Effects */}
                                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none fixed">
                                        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow" />
                                        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
                                    </div>

                                    <div className="w-full max-w-4xl space-y-8 relative z-10 p-8 pb-32">

                                        {/* Header & Result Summary */}
                                        <div className="text-center mb-10">
                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FF94]/5 text-[#00FF94] border border-[#00FF94]/20 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,148,0.1)]">
                                                <Award className="w-4 h-4" />
                                                <span className="font-bold tracking-widest text-xs uppercase">Avaliação de Competência</span>
                                            </div>

                                            {quizSubmitted ? (
                                                <div className="animate-in fade-in zoom-in duration-700">
                                                    <h2 className="text-4xl font-bold font-orbitron text-white mb-2 tracking-tight">
                                                        Resultado do <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-blue-500">Diagnóstico</span>
                                                    </h2>
                                                    <div className="mt-8 mb-8 flex justify-center">
                                                        <div className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center border-[6px] shadow-2xl backdrop-blur-xl transition-all duration-1000 ${quizScore >= 100
                                                            ? 'bg-[#00FF94]/10 border-[#00FF94] text-[#00FF94] shadow-[0_0_50px_rgba(0,255,148,0.2)]'
                                                            : 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)]'
                                                            }`}>
                                                            <div className={`absolute inset-0 rounded-full blur-[50px] animate-pulse-slow ${quizScore >= 100 ? 'bg-green-500/20' : 'bg-red-500/20'}`} />
                                                            <span className="text-6xl font-bold font-orbitron tracking-tighter relative z-10">{quizScore}%</span>
                                                            <span className="text-xs font-bold uppercase tracking-widest mt-2 opacity-70 relative z-10">
                                                                {quizScore >= 100 ? 'APROVADO' : 'REPROVADO'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed border-b border-white/10 pb-8 mb-8">
                                                        {quizScore >= 100
                                                            ? 'Excelente. Você demonstrou domínio total do conteúdo alinhado aos padrões ISO 42001.'
                                                            : 'Sua pontuação não atingiu o critério de excelência (100%). Esta tentativa única foi registrada.'}
                                                    </p>
                                                    {quizScore >= 100 && (
                                                        <button
                                                            onClick={handleQuizFinish}
                                                            className="px-10 py-4 bg-[#00FF94] hover:bg-[#00CC76] text-black rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(0,255,148,0.3)] hover:shadow-[0_0_50px_rgba(0,255,148,0.4)] hover:scale-[1.02] flex items-center justify-center gap-2 mx-auto mb-12"
                                                        >
                                                            <Check className="w-5 h-5" />
                                                            Retornar ao Lab
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <h2 className="text-4xl font-bold font-orbitron text-white mb-2 tracking-tight">
                                                        Teste de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-blue-500">Conhecimento</span>
                                                    </h2>
                                                    <p className="text-gray-400 max-w-lg mx-auto">
                                                        Atenção: Você tem apenas <strong className="text-white">UMA tentativa</strong>.
                                                        Nota mínima para aprovação: <strong className="text-[#00FF94]">100%</strong>.
                                                    </p>
                                                    {/* Progress Bar */}
                                                    <div className="mt-8 w-full max-w-md mx-auto h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-[#00FF94] to-blue-500 transition-all duration-500 ease-out shadow-[0_0_10px_#00FF94]"
                                                            style={{ width: `${(Object.keys(quizAnswers).length / currentLesson.quiz.length) * 100}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2 font-mono">
                                                        {Object.keys(quizAnswers).length} / {currentLesson.quiz.length} RESPONDIDAS
                                                    </p>
                                                </>
                                            )}
                                        </div>

                                        {/* Questions List (Always visible now, serving as Input or Review) */}
                                        <div className="space-y-6">
                                            {currentLesson.quiz.map((q, qIndex) => {
                                                const isCorrectAnswer = quizSubmitted && quizAnswers[q.id] === q.correctAnswer;
                                                const isWrongAnswer = quizSubmitted && quizAnswers[q.id] !== undefined && quizAnswers[q.id] !== q.correctAnswer;

                                                return (
                                                    <div
                                                        key={q.id}
                                                        className={`relative group transition-all duration-300 ${quizSubmitted
                                                            ? (isCorrectAnswer ? 'opacity-100' : isWrongAnswer ? 'opacity-100' : 'opacity-60')
                                                            : (quizAnswers[q.id] !== undefined ? 'opacity-100' : 'opacity-90 hover:opacity-100')
                                                            }`}
                                                    >
                                                        {/* Question Card */}
                                                        <div className={`p-6 rounded-2xl border transition-all duration-500 backdrop-blur-sm relative overflow-hidden ${quizSubmitted
                                                            ? (isCorrectAnswer
                                                                ? 'bg-[#00FF94]/5 border-[#00FF94]/50 shadow-[0_0_30px_rgba(0,255,148,0.1)]'
                                                                : (isWrongAnswer ? 'bg-red-500/5 border-red-500/50' : 'bg-[#0A1A2F]/80 border-white/5'))
                                                            : (quizAnswers[q.id] !== undefined
                                                                ? 'bg-[#0A1A2F]/80 border-[#00FF94]/30 shadow-[0_0_30px_rgba(0,255,148,0.05)]'
                                                                : 'bg-[#141922]/60 border-white/5 hover:border-white/10')
                                                            }`}>
                                                            {/* Result Icon Badge */}
                                                            {quizSubmitted && (
                                                                <div className="absolute top-4 right-4">
                                                                    {isCorrectAnswer ? <CheckCircle className="text-[#00FF94] w-6 h-6" /> : (isWrongAnswer ? <span className="text-red-500 font-bold text-xl">✕</span> : null)}
                                                                </div>
                                                            )}

                                                            <h3 className="text-lg font-bold text-white mb-6 flex gap-4 leading-relaxed pr-8">
                                                                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm border ${quizSubmitted
                                                                    ? (isCorrectAnswer ? 'bg-[#00FF94] text-black border-[#00FF94]' : (isWrongAnswer ? 'bg-red-500 text-white border-red-500' : 'bg-white/5 text-gray-400 border-white/10'))
                                                                    : (quizAnswers[q.id] !== undefined ? 'bg-[#00FF94] text-black border-[#00FF94] font-bold shadow-[0_0_10px_#00FF94]' : 'bg-white/5 text-gray-400 border-white/10')
                                                                    }`}>
                                                                    {qIndex + 1}
                                                                </span>
                                                                {q.question}
                                                            </h3>

                                                            <div className="space-y-3 pl-12">
                                                                {q.options.map((option, optIndex) => {
                                                                    // Formatting Logic for Review Mode
                                                                    let optionClass = "";
                                                                    if (quizSubmitted) {
                                                                        if (optIndex === q.correctAnswer) optionClass = "bg-[#00FF94]/20 border-[#00FF94] text-[#00FF94] font-bold"; // Show Correct
                                                                        else if (quizAnswers[q.id] === optIndex && optIndex !== q.correctAnswer) optionClass = "bg-red-500/20 border-red-500 text-red-500 font-bold"; // Show Wrong Selection
                                                                        else optionClass = "bg-black/20 border-white/5 text-gray-500 opacity-50"; // Dim others
                                                                    } else {
                                                                        if (quizAnswers[q.id] === optIndex) optionClass = "bg-[#00FF94]/10 border-[#00FF94] text-white shadow-[0_0_20px_rgba(0,255,148,0.15)]";
                                                                        else optionClass = "bg-black/20 border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/20 hover:text-gray-200";
                                                                    }

                                                                    return (
                                                                        <label
                                                                            key={optIndex}
                                                                            className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group/opt overflow-hidden ${!quizSubmitted ? 'cursor-pointer' : 'cursor-default'
                                                                                } ${optionClass}`}
                                                                        >
                                                                            {!quizSubmitted && quizAnswers[q.id] === optIndex && (
                                                                                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF94]/10 to-transparent opacity-50" />
                                                                            )}

                                                                            <input
                                                                                type="radio"
                                                                                name={q.id}
                                                                                className="hidden"
                                                                                checked={quizAnswers[q.id] === optIndex}
                                                                                onChange={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                                                                                disabled={quizSubmitted}
                                                                            />

                                                                            {/* Radio Circle Indicator */}
                                                                            <div className={`relative z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${quizSubmitted
                                                                                ? (optIndex === q.correctAnswer ? 'border-[#00FF94] bg-[#00FF94]' : (quizAnswers[q.id] === optIndex ? 'border-red-500 bg-red-500' : 'border-gray-700'))
                                                                                : (quizAnswers[q.id] === optIndex ? 'border-[#00FF94]' : 'border-gray-600 group-hover/opt:border-gray-400')
                                                                                }`}>
                                                                                {/* Inner Dot Logic */}
                                                                                {quizSubmitted
                                                                                    ? (optIndex === q.correctAnswer ? <Check className="w-3 h-3 text-black" strokeWidth={4} /> : (quizAnswers[q.id] === optIndex ? <span className="text-white text-xs font-bold">✕</span> : null))
                                                                                    : <div className={`w-2.5 h-2.5 rounded-full bg-[#00FF94] transition-transform duration-300 ${quizAnswers[q.id] === optIndex ? 'scale-100' : 'scale-0'}`} />
                                                                                }
                                                                            </div>

                                                                            <span className="relative z-10 text-sm md:text-base font-medium">{option}</span>
                                                                        </label>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {!quizSubmitted && (
                                            <div className="flex justify-end pt-8 pb-4">
                                                <button
                                                    onClick={handleSubmitQuiz}
                                                    disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                                                    className="relative group overflow-hidden px-10 py-4 bg-[#00FF94] text-black font-bold font-orbitron rounded-xl hover:bg-[#00CC76] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(0,255,148,0.3)] hover:shadow-[0_0_50px_rgba(0,255,148,0.5)] active:scale-95"
                                                >
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        ENVIAR DIAGNÓSTICO FINAL
                                                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${Object.keys(quizAnswers).length === currentLesson.quiz.length ? 'translate-x-1' : ''}`} />
                                                    </span>
                                                    <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
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
                                    onClick={handleToggleComplete}
                                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${completedLessons.includes(activeLessonId)
                                        ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/50 hover:bg-[#10B981]/20'
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
