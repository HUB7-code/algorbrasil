// Algor Lab - Content Carousel Component
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import ContentCard from './ContentCard';

interface Content {
    id: string;
    title: string;
    description?: string;
    type: 'video' | 'pdf' | 'excel' | 'doc' | 'link';
    duration?: number;
    level?: 'beginner' | 'intermediate' | 'advanced';
    instructor?: string;
    thumbnail: string;
    isNew?: boolean;
}

interface UserProgress {
    progress: number;
    completed: boolean;
}

interface ContentCarouselProps {
    title: string;
    icon?: React.ReactNode;
    contents: Content[];
    userProgress?: Record<string, UserProgress>;
    onCardClick?: (contentId: string) => void;
    onDownload?: (contentId: string) => void;
}

export default function ContentCarousel({
    title,
    icon,
    contents,
    userProgress = {},
    onCardClick,
    onDownload
}: ContentCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
        const newScrollLeft = direction === 'left'
            ? scrollContainerRef.current.scrollLeft - scrollAmount
            : scrollContainerRef.current.scrollLeft + scrollAmount;

        scrollContainerRef.current.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });

        setTimeout(checkScroll, 300);
    };

    if (contents.length === 0) return null;

    return (
        <div className="relative group/carousel mb-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 px-6">
                {icon && <div className="text-[#00FF94]">{icon}</div>}
                <h2 className="text-2xl font-bold text-white font-orbitron">
                    {title}
                </h2>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Left Arrow */}
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#0A0E14]/90 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#00FF94] hover:text-[#0A0E14] transition-all opacity-0 group-hover/carousel:opacity-100"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}

                {/* Right Arrow */}
                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#0A0E14]/90 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#00FF94] hover:text-[#0A0E14] transition-all opacity-0 group-hover/carousel:opacity-100"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                )}

                {/* Scrollable Content */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-4 scroll-smooth"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {contents.map((content) => (
                        <div
                            key={content.id}
                            className="flex-none w-[280px] md:w-[320px]"
                            onClick={() => onCardClick?.(content.id)}
                        >
                            <ContentCard
                                content={content}
                                userProgress={userProgress[content.id]}
                                onPlay={() => onCardClick?.(content.id)}
                                onDownload={() => onDownload?.(content.id)}
                                onInfo={() => onCardClick?.(content.id)}
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0A0E14] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0A0E14] to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
