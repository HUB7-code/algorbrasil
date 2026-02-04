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
    title: 'Aula Magna: Governança de IA',
    description: `
        <div class="space-y-6 text-gray-300 font-manrope">
            <div class="flex items-center gap-4 text-sm font-mono text-[#00FF94] bg-[#00FF94]/5 p-3 rounded-lg border border-[#00FF94]/20 w-fit">
                <span>📅 26 de Março, 2025</span>
                <span>⏰ 19h às 21h</span>
                <span>🎓 ALGOR ASSOCIATION</span>
            </div>

            <p>
                <strong class="text-white block mb-2">🟢 Abertura Institucional – 1 ano de ALGOR</strong>
                O evento foi aberto com a celebração do primeiro ano da ALGOR ASSOCIATION, destacando sua missão de promover a transformação digital orientada por inteligência artificial, com ênfase em governança, ética, maturidade digital e metodologias de auditoria baseadas na norma ISO/IEC 42001:2024.
            </p>

            <p>
                <strong class="text-white block mb-2">📚 Apresentação do Curso</strong>
                O facilitador apresentou o objetivo da formação: capacitar auditores e líderes organizacionais para atuarem com responsabilidade na implementação e auditoria de Sistemas de Gestão de Inteligência Artificial (SGIA).
            </p>

            <ul class="list-disc pl-5 space-y-1 text-gray-400">
                <li>Estrutura da norma ISO/IEC 42001</li>
                <li>Requisitos de um SGIA</li>
                <li>Princípios de risco e conformidade em IA</li>
                <li>Categorização de sistemas de IA</li>
                <li>Ciclo de vida da IA e governança lógica</li>
            </ul>

            <p>
                <strong class="text-white block mb-2">🌐 Demonstração da Plataforma EAD ALGOR</strong>
                Foi apresentada a plataforma de E-learning da ALGOR com trilhas de aprendizagem, simulados e certificação digital.
            </p>

            <div class="bg-white/5 p-4 rounded-xl border-l-4 border-[#00FF94]">
                <strong class="text-white block mb-2">💡 Inteligência Viva</strong>
                "A capacidade das organizações de aprender, adaptar-se e agir em rede, de forma autônoma e ética, usando a inteligência artificial como um recurso de transformação consciente."
            </div>

            <p class="italic text-gray-400">
                “A nova governança não é feita apenas de algoritmos. Ela é feita de decisões humanas mediadas por sistemas éticos e transparentes.”
            </p>
        </div>
    `,
    type: 'video' as const,
    url: 'https://www.youtube.com/embed/WiVpqOKW6j0',
    duration: 120,
    level: 'Advanced',
    instructor: {
        name: 'Algor Association',
        role: 'Corpo Docente',
        avatar: '/images/team/paulo.jpg'
    },
    microModules: [
        { id: '1.1', title: 'Abertura Institucional', duration: 15, completed: true, type: 'video' },
        { id: '1.2', title: 'Apresentação da Formação', duration: 25, completed: true, type: 'video' },
        { id: '1.3', title: 'Demonstração da Plataforma', duration: 20, completed: false, type: 'video' },
        { id: '1.4', title: 'Conceito Inteligência Viva', duration: 30, completed: false, type: 'video' },
        { id: '1.5', title: 'Mensagem Final', duration: 10, completed: false, type: 'video' },
    ],
    materials: [
        { id: 'm1', title: 'Slides Aula Magna.pdf', type: 'pdf', downloadUrl: '/materials/aula-magna.pdf' },
        { id: 'm2', title: 'Ementa Completa ISO 42001.pdf', type: 'pdf', downloadUrl: '/materials/ementa.pdf' }
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
            addXp(150); // XP maior para Aula Magna

            // Show Premium Toast
            toast.success('Módulo Concluído!', {
                description: 'Você ganhou +150 XP. Parabéns!',
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
                                    {/* Overlay Title on Thumbnail */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                                        <h2 className="text-2xl font-bold text-white font-orbitron">{content.title}</h2>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content Info */}
                        <div className="mb-8 p-6 bg-[#141922]/50 rounded-2xl border border-white/5">
                            <h1 className="text-3xl font-bold font-orbitron mb-6 text-white border-b border-white/10 pb-4">
                                {content.title}
                            </h1>

                            {/* Rich Text Description */}
                            <div
                                className="description-content"
                                dangerouslySetInnerHTML={{ __html: content.description }}
                            />

                            {/* Instructor */}
                            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden shrink-0 flex items-center justify-center font-bold text-gray-400 bg-white/10">
                                    {content.instructor.name.substring(0, 2)}
                                </div>
                                <div>
                                    <div className="text-xs text-[#00FF94] font-bold uppercase tracking-wider mb-0.5">Instrutor</div>
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
                                        <List className="w-4 h-4" /> Tópicos da Aula
                                    </h3>
                                    <span className="text-xs text-[#00FF94]">2/5 Concluído</span>
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
                                Materiais Complementares
                            </h3>
                            <div className="space-y-3">
                                {content.materials.map((material) => (
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
                                                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors line-clamp-1">
                                                    {material.title}
                                                </span>
                                                <span className="text-[10px] text-gray-500 group-hover:text-[#00FF94]">Clique para baixar</span>
                                            </div>
                                        </div>
                                        <Download className="w-4 h-4 text-gray-500 group-hover:text-[#00FF94] transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handleComplete}
                            className={`w-full px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isCompleted
                                ? 'bg-[#10B981] text-white cursor-default'
                                : 'bg-[#00FF94] text-[#0A0E14] hover:bg-[#00CC76] shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)]'
                                }`}
                        >
                            {isCompleted ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5" />}
                            {isCompleted ? 'Aula Concluída' : 'Marcar Aula como Concluída'}
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
