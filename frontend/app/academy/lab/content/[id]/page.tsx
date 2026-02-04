// Algor Lab - Content Detail Page
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Download, CheckCircle, Clock, FileText, Share2, Award, List, Check } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentPlaceholder from '@/components/lab/ContentPlaceholder';
import { useGamification } from '@/hooks/useGamification';

// Mock Data (simulando fetch do backend)
const mockContent = {
    id: '1',
    title: 'ISO 42001 - Módulo 1: Introdução',
    description: 'Entenda os fundamentos da norma ISO 42001. Este módulo cobre os conceitos básicos, terminologia e a importância da certificação para organizações modernas.',
    type: 'video' as const,
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 45,
    level: 'Iniciante',
    instructor: {
        name: 'Paulo Carvalho',
        role: 'Especialista em Governança de IA',
        avatar: '/images/team/paulo.jpg'
    },
    microModules: [
        { id: '1.1', title: 'O que é a ISO 42001?', duration: 5, completed: true, type: 'video' },
        { id: '1.2', title: 'Por que certificar?', duration: 7, completed: true, type: 'video' },
        { id: '1.3', title: 'Estrutura de Alto Nível (HLS)', duration: 8, completed: false, type: 'video' },
        { id: '1.4', title: 'Quiz Rápido: Fundamentos', duration: 2, completed: false, type: 'quiz' },
    ],
    materials: [
        { id: 'm1', title: 'Checklist de Controles.pdf', type: 'pdf' },
        { id: 'm2', title: 'Matriz de Rastreabilidade.xlsx', type: 'excel' }
    ],
    nextContent: {
        id: '2',
        title: 'ISO 42001 - Módulo 2: Contexto da Organização',
        thumbnail: '/images/content/mod2.jpg'
    }
};

export default function ContentDetailPage({ params }: { params: { id: string } }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [activeModule, setActiveModule] = useState(mockContent.microModules?.[0]?.id || null);

    // Gamification Hook
    const { addXp } = useGamification();

    // Simula o conteúdo carregado
    const content = mockContent;

    const handleComplete = () => {
        if (!isCompleted) {
            setIsCompleted(true);
            addXp(50); // Adiciona 50 XP

            // Show Premium Toast
            toast.success('Módulo Concluído!', {
                description: 'Você ganhou +50 XP',
                duration: 4000,
                style: {
                    background: '#0A1A2F',
                    border: '1px solid #00FF94',
                    color: '#fff',
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0E14] text-white">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Breadcrumb & Navigation */}
                <div className="max-w-7xl mx-auto px-6 mb-6">
                    <Link href="/academy/lab" className="inline-flex items-center text-gray-400 hover:text-[#00FF94] transition-colors gap-2 text-sm font-manrope">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para o Lab
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Main Video Player */}
                    <div className="lg:col-span-2">
                        <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group mb-8">
                            {isPlaying ? (
                                <iframe
                                    src={`${content.url}?autoplay=1`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gray-900 cursor-pointer" onClick={() => setIsPlaying(true)}>
                                    <div className="absolute inset-0 opacity-50">
                                        <ContentPlaceholder type="video" title={content.title} />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-[#00FF94]/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#00FF94]/50 shadow-[0_0_30px_rgba(0,255,148,0.3)]">
                                            <Play className="w-10 h-10 text-[#00FF94] ml-1" fill="currentColor" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content Info */}
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-[#00A3FF]/10 text-[#00A3FF] text-xs font-bold uppercase rounded border border-[#00A3FF]/20">
                                    {content.level}
                                </span>
                                <span className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Clock className="w-4 h-4" /> {content.duration} min
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-3xl font-bold font-orbitron mb-4 leading-tight">
                                {content.title}
                            </h1>

                            <p className="text-gray-300 text-lg leading-relaxed font-manrope mb-6">
                                {content.description}
                            </p>

                            {/* Instructor */}
                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 mb-6">
                                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden shrink-0 flex items-center justify-center font-bold text-gray-400 bg-white/10">
                                    {content.instructor.name.substring(0, 2)}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{content.instructor.name}</div>
                                    <div className="text-sm text-gray-400">{content.instructor.role}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Micro-modules & Materials */}
                    <div className="space-y-6">
                        {/* Micro-modules List (Playlist) */}
                        {content.microModules && (
                            <div className="bg-[#141922] rounded-xl border border-white/5 overflow-hidden">
                                <div className="p-4 border-b border-white/5 bg-[#0A0E14] flex justify-between items-center">
                                    <h3 className="font-orbitron font-bold text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                        <List className="w-4 h-4" /> Conteúdo do Módulo
                                    </h3>
                                    <span className="text-xs text-[#00FF94]">2/4 Concluído</span>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                                    {content.microModules.map((module, index) => (
                                        <div
                                            key={module.id}
                                            onClick={() => setActiveModule(module.id)}
                                            className={`p-4 border-b border-white/5 cursor-pointer flex items-start gap-3 transition-colors ${activeModule === module.id
                                                    ? 'bg-[#00FF94]/10 border-l-2 border-l-[#00FF94]'
                                                    : 'hover:bg-white/5 border-l-2 border-l-transparent'
                                                }`}
                                        >
                                            <div className="mt-1">
                                                {module.completed ? (
                                                    <div className="w-5 h-5 rounded-full bg-[#00FF94] flex items-center justify-center">
                                                        <Check className="w-3 h-3 text-[#0A0E14] stroke-[3]" />
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-bold mb-1 ${activeModule === module.id ? 'text-[#00FF94]' : 'text-gray-300'}`}>
                                                    {index + 1}. {module.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    {module.type === 'video' ? <Play className="w-3 h-3" /> : <Award className="w-3 h-3" />}
                                                    <span>{module.duration} min</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Materials Widget */}
                        <div className="bg-[#141922] rounded-xl p-6 border border-white/5">
                            <h3 className="font-orbitron font-bold text-lg mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#00FF94]" />
                                Materiais
                            </h3>
                            <div className="space-y-3">
                                {content.materials.map((material) => (
                                    <div key={material.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg hover:bg-black/40 transition-colors group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${material.type === 'pdf' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                                                }`}>
                                                {material.type.toUpperCase()}
                                            </div>
                                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-1">
                                                {material.title}
                                            </span>
                                        </div>
                                        <Download className="w-4 h-4 text-gray-500 group-hover:text-[#00FF94] transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handleComplete}
                            className={`w-full px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isCompleted
                                ? 'bg-[#10B981] text-white'
                                : 'bg-[#00FF94] text-[#0A0E14] hover:bg-[#00CC76]'
                                }`}
                        >
                            {isCompleted ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5" />}
                            {isCompleted ? 'Módulo Concluído' : 'Marcar Módulo como Concluído'}
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
