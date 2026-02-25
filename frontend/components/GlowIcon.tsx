'use client';

import { LucideIcon } from 'lucide-react';

interface GlowIconProps {
    icon: LucideIcon;
    color: string;       // hex, e.g. '#4F7EFF'
    size?: 'sm' | 'md' | 'lg';
    pulse?: boolean;     // breathing animation on outer halo
    className?: string;
}

const sizeMap = {
    sm: { outer: 'w-14 h-14', mid: 'w-10 h-10', inner: 'w-7 h-7', iconSize: 'w-4 h-4' },
    md: { outer: 'w-20 h-20', mid: 'w-14 h-14', inner: 'w-10 h-10', iconSize: 'w-6 h-6' },
    lg: { outer: 'w-28 h-28', mid: 'w-20 h-20', inner: 'w-14 h-14', iconSize: 'w-8 h-8' },
};

export default function GlowIcon({ icon: Icon, color, size = 'md', pulse = true, className = '' }: GlowIconProps) {
    const s = sizeMap[size];

    return (
        <div className={`relative flex items-center justify-center ${s.outer} ${className}`}>
            {/* Outer halo — blurred, breathing */}
            <div
                className={`absolute inset-0 rounded-full ${pulse ? 'animate-pulse' : ''}`}
                style={{
                    background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                }}
            />

            {/* Middle ring — crisp border */}
            <div
                className={`absolute ${s.mid} rounded-full border`}
                style={{
                    borderColor: `${color}30`,
                    background: `radial-gradient(circle at 30% 30%, ${color}10, transparent 70%)`,
                }}
            />

            {/* Inner pad — filled, icon lives here */}
            <div
                className={`relative ${s.inner} rounded-2xl flex items-center justify-center border`}
                style={{
                    backgroundColor: `${color}18`,
                    borderColor: `${color}40`,
                    boxShadow: `0 0 20px ${color}20`,
                }}
            >
                {/* SVG gradient definition */}
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={color} />
                            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
                        </linearGradient>
                    </defs>
                </svg>

                <Icon
                    className={s.iconSize}
                    style={{ color: color, filter: `drop-shadow(0 0 6px ${color}60)` }}
                />
            </div>
        </div>
    );
}
