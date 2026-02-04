// Algor Lab - Content Card Component
'use client';

import { Play, Download, Info, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import ContentPlaceholder from './ContentPlaceholder';

interface ContentCardProps {
    content: {
        id: string;
        title: string;
        description?: string;
        type: 'video' | 'pdf' | 'excel' | 'doc' | 'link';
        duration?: number; // em minutos
        level?: 'beginner' | 'intermediate' | 'advanced';
        instructor?: string;
        thumbnail: string;
        isNew?: boolean;
    };
    userProgress?: {
        progress: number; // 0-100
        completed: boolean;
    };
    onPlay?: () => void;
    onDownload?: () => void;
    onInfo?: () => void;
}

const TYPE_COLORS = {
    video: '#00A3FF',
    pdf: '#EF4444',
    excel: '#10B981',
    doc: '#8B5CF6',
    link: '#F59E0B'
};

const TYPE_LABELS = {
    video: 'VÍDEO',
    pdf: 'PDF',
    excel: 'EXCEL',
    doc: 'DOC',
    link: 'LINK'
};

const LEVEL_LABELS = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado'
};

export default function ContentCard({
    content,
    userProgress,
    onPlay,
    onDownload,
    onInfo
}: ContentCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const typeColor = TYPE_COLORS[content.type];
    const hasProgress = userProgress && userProgress.progress > 0;

    return (
        <motion.div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.05, y: -10, zIndex: 10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Card Container */}
            <div className="relative rounded-xl overflow-hidden bg-[#141922] border border-white/5">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden">
                    {imageError ? (
                        <ContentPlaceholder type={content.type} title={content.title} />
                    ) : (
                        <Image
                            src={content.thumbnail}
                            alt={content.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImageError(true)}
                        />
                    )}

                    {/* Overlay on Hover */}
                    <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
                            >
                                <Play className="w-8 h-8 text-white ml-1" fill="white" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {content.isNew && (
                            <span className="px-2 py-1 bg-[#00FF94] text-[#0A0E14] text-[10px] font-bold uppercase tracking-wider rounded">
                                NOVO
                            </span>
                        )}
                        <span
                            className="px-2 py-1 text-white text-[10px] font-bold uppercase tracking-wider rounded"
                            style={{ backgroundColor: typeColor }}
                        >
                            {TYPE_LABELS[content.type]}
                        </span>
                    </div>

                    {/* Progress Bar (if started) */}
                    {hasProgress && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                            <div
                                className="h-full bg-[#00FF94] transition-all duration-500"
                                style={{ width: `${userProgress.progress}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Content Info */}
                <div className="p-4">
                    <h3 className="font-bold text-white mb-1 line-clamp-2 group-hover:text-[#00FF94] transition-colors">
                        {content.title}
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                        {content.duration && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {content.duration} min
                            </span>
                        )}
                        {content.level && (
                            <span>• {LEVEL_LABELS[content.level]}</span>
                        )}
                    </div>

                    {/* Progress Text */}
                    {hasProgress && (
                        <div className="mt-2 text-xs text-[#00FF94]">
                            {userProgress.completed ? '✓ Concluído' : `${userProgress.progress}% concluído`}
                        </div>
                    )}
                </div>

                {/* Expanded Info (on Hover) */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-white/5"
                >
                    <div className="p-4 bg-[#0A0E14]/50 backdrop-blur-sm">
                        {/* Description */}
                        {content.description && (
                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                {content.description}
                            </p>
                        )}

                        {/* Instructor */}
                        {content.instructor && (
                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                <User className="w-3 h-3" />
                                {content.instructor}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onPlay?.();
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#0A0E14] rounded-lg text-sm font-bold hover:bg-[#00FF94] transition-colors"
                            >
                                <Play className="w-4 h-4" />
                                {hasProgress ? 'Continuar' : 'Assistir'}
                            </button>

                            {(content.type === 'pdf' || content.type === 'excel' || content.type === 'doc') && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDownload?.();
                                    }}
                                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                            )}

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onInfo?.();
                                }}
                                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                            >
                                <Info className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Glow Effect */}
            <div
                className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                style={{
                    background: `radial-gradient(circle at center, ${typeColor}40, transparent 70%)`
                }}
            />
        </motion.div>
    );
}
