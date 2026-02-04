// Algor Lab - Main Platform Page (Netflix-style)
'use client';

import { Flame, BookOpen, Target, FileText, Star, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/lab/HeroSection';
import ContentCarousel from '@/components/lab/ContentCarousel';

// Mock Data (será substituído por API)
const mockContents = {
    featured: [
        {
            id: 'sgia-locked',
            title: 'FORMAÇÃO DE GESTOR DE SISTEMAS DE GESTÃO DE INTELIGÊNCIA ARTIFICIAL (SGIA)',
            description: 'Torne-se um gestor completo de IA. Em breve disponível para membros ALGOR.',
            type: 'video' as const,
            duration: 0,
            level: 'advanced' as const,
            instructor: 'Em Breve',
            thumbnail: '/images/content/sgia_cover.png',
            isNew: false,
        },
        {
            id: '1',
            title: 'Formação de Advisor/Auditor de Inteligência Artificial - Management System (ISO/IEC 42001:2024)',
            description: 'Formação completa com certificação. Aulas gravadas, material de apoio e simulados.',
            type: 'video' as const,
            duration: 120, // Aula Magna
            level: 'advanced' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/iso_auditor_cover_v2.png',
            isNew: true,
        },
    ],
    continue: [
        {
            id: '6',
            title: 'ISO 42001 - Módulo 3: Controles',
            description: 'Implementação de controles de segurança',
            type: 'video' as const,
            duration: 45,
            level: 'intermediate' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/iso-controles.webp',
        },
        {
            id: '7',
            title: 'Gestão de Riscos em IA',
            description: 'Framework completo de risk management',
            type: 'video' as const,
            duration: 75,
            level: 'advanced' as const,
            instructor: 'Edisio Nascimento',
            thumbnail: '/images/content/risk-management.webp',
        },
    ],
    tracks: [
        {
            id: '8',
            title: 'Trilha ISO 42001 Completa',
            description: '12 módulos sobre a norma',
            type: 'video' as const,
            duration: 480,
            level: 'beginner' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/trilha-iso.webp',
        },
        {
            id: '10',
            title: 'Trilha PL 2338',
            description: '6 módulos sobre legislação brasileira',
            type: 'video' as const,
            duration: 240,
            level: 'intermediate' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/trilha-pl2338.webp',
        },
    ],
    documents: [
        {
            id: '11',
            title: 'Matriz de Riscos - Template Excel',
            description: 'Planilha editável para gestão de riscos',
            type: 'excel' as const,
            instructor: 'Edisio Nascimento',
            thumbnail: '/images/content/matriz-riscos.webp',
        },
        {
            id: '13',
            title: 'Política de Governança - Template',
            description: 'Documento Word editável',
            type: 'doc' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/politica-template.webp',
        },
    ],
    popular: [
        {
            id: '14',
            title: 'ISO 42001 - Certificação: Passo a Passo',
            description: 'Como obter a certificação',
            type: 'video' as const,
            duration: 120,
            level: 'advanced' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/certificacao.webp',
        },
    ],
    webinars: [
        {
            id: '16',
            title: 'Webinar: Futuro da Regulação de IA',
            description: 'Discussão com especialistas',
            type: 'video' as const,
            duration: 60,
            level: 'intermediate' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/webinar-regulacao.webp',
        },
    ],
};

const mockUserProgress = {
    '6': { progress: 40, completed: false },
    '7': { progress: 12, completed: false },
    '14': { progress: 85, completed: false },
};

export default function AlgorLabPage() {
    const router = useRouter();

    const handleCardClick = (id: string) => {
        if (id.includes('locked')) {
            alert('⚠️ Em breve!\n\nEsta formação será liberada nas próximas semanas. Fique atento às notificações.');
            return;
        }
        router.push(`/academy/lab/content/${id}`);
    };

    const handleDownload = (id: string) => {
        console.log('Downloading content:', id);
        alert('Download iniciado! (Simulação)');
    };

    return (
        <div className="min-h-screen bg-[#0A0E14] text-white flex flex-col">
            <Navbar />

            {/* Main Content - Centralized Hub */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 mt-20">

                <div className="text-center mb-12 max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-black font-orbitron mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                        ALGOR LAB
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-manrope">
                        Selecione sua trilha de especialização
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                    {mockContents.featured.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => handleCardClick(course.id)}
                            className="group relative cursor-pointer flex flex-col gap-5"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_50px_rgba(0,255,148,0.2)] group-hover:border-[#00FF94]/50">

                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                                />

                                {/* Overlay Gradient (Subtle) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Status Badge (Keep inside image) */}
                                {course.id.includes('locked') && (
                                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                        EM BREVE
                                    </div>
                                )}
                                {!course.id.includes('locked') && (
                                    <div className="absolute top-4 right-4 bg-[#0A0E14]/80 backdrop-blur border border-[#00FF94]/50 text-[#00FF94] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,148,0.3)]">
                                        <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
                                        DISPONÍVEL
                                    </div>
                                )}
                            </div>

                            {/* Text Content (Below Image) */}
                            <div className="flex flex-col gap-2 px-2">
                                <h2 className="text-xl md:text-2xl font-bold font-orbitron text-white leading-tight group-hover:text-[#00FF94] transition-colors">
                                    {course.title}
                                </h2>
                                <p className="text-gray-400 text-sm md:text-base font-manrope line-clamp-2">
                                    {course.description}
                                </p>

                                {/* Call to Action Text */}
                                <div className="flex items-center gap-2 text-[#00FF94] font-bold text-sm uppercase tracking-wider mt-2 opacity-50 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                                    <span>Acessar Conteúdo</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
