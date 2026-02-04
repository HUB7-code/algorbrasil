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
            thumbnail: '/AI_Gov.png',
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
        <div className="min-h-screen bg-[#0A0E14] text-white">
            <Navbar />

            {/* Hero Section */}
            <HeroSection
                title="ALGOR LAB"
                subtitle="Laboratório de Excelência em Governança de IA"
                continueWatching={{
                    title: 'Formação Advisor ISO 42001',
                    progress: 10,
                    thumbnail: '/images/content/iso-42001-intro.webp',
                }}
                overallProgress={15}
            />

            {/* Main Content */}
            <div className="pb-20">
                {/* Featured Formations - THE MAIN REQUEST */}
                <ContentCarousel
                    title="Formações em Destaque"
                    icon={<Star className="w-6 h-6 text-[#00FF94]" />}
                    contents={mockContents.featured}
                    onCardClick={handleCardClick}
                    onDownload={handleDownload}
                />

                {/* Continue Watching */}

                <ContentCarousel
                    title="Continuar Assistindo"
                    icon={<BookOpen className="w-6 h-6" />}
                    contents={mockContents.continue}
                    userProgress={mockUserProgress}
                    onCardClick={handleCardClick}
                />

                {/* Learning Tracks */}
                <ContentCarousel
                    title="Trilhas de Aprendizado"
                    icon={<Target className="w-6 h-6" />}
                    contents={mockContents.tracks}
                    onCardClick={handleCardClick}
                />

                {/* Documents */}
                <ContentCarousel
                    title="Documentos e Planilhas"
                    icon={<FileText className="w-6 h-6" />}
                    contents={mockContents.documents}
                    onCardClick={handleCardClick}
                    onDownload={handleDownload}
                />

                {/* Popular */}
                <ContentCarousel
                    title="Mais Populares"
                    icon={<Star className="w-6 h-6" />}
                    contents={mockContents.popular}
                    userProgress={mockUserProgress}
                    onCardClick={handleCardClick}
                />

                {/* Webinars */}
                <ContentCarousel
                    title="Webinars e Palestras"
                    icon={<Video className="w-6 h-6" />}
                    contents={mockContents.webinars}
                    onCardClick={handleCardClick}
                />
            </div>

            <Footer />
        </div>
    );
}
