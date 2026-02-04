// Algor Lab - Hero Section Component
'use client';

import { Play, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
    title: string;
    subtitle: string;
    continueWatching?: {
        title: string;
        progress: number;
        thumbnail: string;
    };
    overallProgress: number;
    backgroundImage?: string;
}

export default function HeroSection({
    title,
    subtitle,
    continueWatching,
    overallProgress,
    backgroundImage = '/images/hero-lab-bg.webp'
}: HeroSectionProps) {
    return (
        <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E14] via-[#0A0E14]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Title */}
                    <h1 className="font-orbitron text-5xl md:text-6xl font-bold mb-4 text-white">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl font-manrope">
                        {subtitle}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        {continueWatching ? (
                            <button className="group flex items-center gap-3 px-8 py-4 bg-white text-[#0A0E14] rounded-lg font-bold hover:bg-[#00FF94] transition-all">
                                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <div className="text-left">
                                    <div className="text-sm">Continuar Assistindo</div>
                                    <div className="text-xs opacity-70">{continueWatching.title}</div>
                                </div>
                            </button>
                        ) : (
                            <button className="flex items-center gap-3 px-8 py-4 bg-white text-[#0A0E14] rounded-lg font-bold hover:bg-[#00FF94] transition-all">
                                <Play className="w-5 h-5" />
                                Começar Agora
                            </button>
                        )}

                        <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-bold border border-white/20 hover:bg-white/20 transition-all">
                            <TrendingUp className="w-5 h-5" />
                            Meu Progresso: {overallProgress}%
                        </button>
                    </div>

                    {/* Progress Bar */}
                    {continueWatching && (
                        <div className="max-w-md">
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                                <span>{continueWatching.title}</span>
                                <span>{continueWatching.progress}%</span>
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#00FF94]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${continueWatching.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Parallax Effect Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
        </div>
    );
}
