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
    new: [
        {
            id: '1',
            title: 'ISO 42001 - Módulo 1: Introdução',
            description: 'Entenda os fundamentos da norma ISO 42001. Dividido em micro-aulas para facilitar seu aprendizado.',
            type: 'video' as const,
            duration: 45,
            level: 'beginner' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/iso-42001-intro.webp',
            isNew: true,
            microModules: [
                { id: '1.1', title: 'O que é a ISO 42001?', duration: 5, completed: true },
                { id: '1.2', title: 'Por que certificar?', duration: 7, completed: true },
                { id: '1.3', title: 'Estrutura de Alto Nível (HLS)', duration: 8, completed: false },
                { id: '1.4', title: 'Quiz Rápido: Fundamentos', duration: 2, type: 'quiz', completed: false },
            ]
        },
        {
            id: '2',
            title: 'Checklist de Implementação ISO 42001',
            description: 'Guia completo para implementação',
            type: 'pdf' as const,
            duration: 15,
            level: 'intermediate' as const,
            instructor: 'Edisio Nascimento',
            thumbnail: '/images/content/checklist-iso.webp',
            isNew: true,
        },
        {
            id: '3',
            title: 'LGPD e IA: Compliance Prático',
            description: 'Como adequar sistemas de IA à LGPD',
            type: 'video' as const,
            duration: 60,
            level: 'intermediate' as const,
            instructor: 'Marci Dantas',
            thumbnail: '/images/content/lgpd-ia.webp',
            isNew: true,
        },
        {
            id: '4',
            title: 'Template de Política de IA',
            description: 'Modelo editável de política organizacional',
            type: 'doc' as const,
            level: 'intermediate' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/template-politica.webp',
            isNew: true,
        },
        {
            id: '5',
            title: 'PL 2338 - Análise Completa',
            description: 'Entenda o projeto de lei brasileiro sobre IA',
            type: 'video' as const,
            duration: 90,
            level: 'advanced' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/pl-2338.webp',
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
            id: '9',
            title: 'Trilha LGPD para IA',
            description: '8 módulos sobre compliance',
            type: 'video' as const,
            duration: 360,
            level: 'intermediate' as const,
            instructor: 'Marci Dantas',
            thumbnail: '/images/content/trilha-lgpd.webp',
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
            id: '12',
            title: 'Guia de Auditoria Interna',
            description: 'PDF com checklist completo',
            type: 'pdf' as const,
            duration: 20,
            level: 'advanced' as const,
            instructor: 'Paulo Carvalho',
            thumbnail: '/images/content/guia-auditoria.webp',
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
        {
            id: '15',
            title: 'IA Responsável na Prática',
            description: 'Cases reais de implementação',
            type: 'video' as const,
            duration: 90,
            level: 'intermediate' as const,
            instructor: 'Marci Dantas',
            thumbnail: '/images/content/ia-responsavel.webp',
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
                    title: 'ISO 42001 - Módulo 3: Controles',
                    progress: 40,
                    thumbnail: '/images/content/iso-controles.webp',
                }}
                overallProgress={67}
            />

            {/* Main Content */}
            <div className="pb-20">
                {/* New Content */}
                <ContentCarousel
                    title="Novos Conteúdos"
                    icon={<Flame className="w-6 h-6" />}
                    contents={mockContents.new}
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
