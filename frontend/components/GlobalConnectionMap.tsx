'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Coordenadas em % (0-100) baseadas na imagem world_map_tech_base.png
// Ajuste fino visual feito para alinhar com os continentes da imagem
const LOCATIONS = {
    UK: { x: 49, y: 28 },
    BR: { x: 32, y: 70 },
    USA: { x: 20, y: 38 },
    EU: { x: 53, y: 30 }
};

export default function GlobalConnectionMap() {
    return (
        <div className="relative w-full h-[160px] md:h-[200px] overflow-hidden rounded-xl bg-[#0A1A2F] group">
            {/* 1. Base Map Image */}
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                <Image
                    src="/world_map_tech_base.png"
                    alt="Global Network"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                />
            </div>

            {/* 2. SVG Overlay for Connecting Lines */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none" // Stretch to fill container just like object-cover (approx)
            >
                {/* Connection: BR -> UK */}
                <ConnectionLine start={LOCATIONS.BR} end={LOCATIONS.UK} color="#8B5CF6" delay={0.5} />

                {/* Connection: UK -> BR (Return) */}
                <ConnectionLine start={LOCATIONS.UK} end={LOCATIONS.BR} color="#00FF94" delay={2.5} dashed />

                {/* Connection: USA -> BR */}
                <ConnectionLine start={LOCATIONS.USA} end={LOCATIONS.BR} color="#00A3FF" delay={1.5} dashed width={0.5} />
            </svg>

            {/* 3. HTML Nodes (Pulsing Dots) */}
            <MapMarker pos={LOCATIONS.BR} color="#00FF94" label="BRA" delay={0} />
            <MapMarker pos={LOCATIONS.UK} color="#8B5CF6" label="UK" delay={1} />
            <MapMarker pos={LOCATIONS.USA} color="#00A3FF" delay={0.5} size="small" />
        </div>
    );
}

function MapMarker({ pos, color, label, size = 'normal', delay }: { pos: { x: number, y: number }, color: string, label?: string, size?: 'normal' | 'small', delay: number }) {
    const isSmall = size === 'small';
    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        >
            {/* Pulse Ring */}
            <motion.div
                className="absolute rounded-full border border-current opacity-0"
                style={{
                    color: color,
                    width: isSmall ? 12 : 24,
                    height: isSmall ? 12 : 24
                }}
                animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: delay }}
            />

            {/* Center Dot */}
            <div
                className="rounded-full shadow-[0_0_10px_currentColor] z-10"
                style={{
                    backgroundColor: color,
                    color: color,
                    width: isSmall ? 4 : 8,
                    height: isSmall ? 4 : 8
                }}
            />

            {/* Label */}
            {label && (
                <div
                    className="mt-2 text-[8px] md:text-[10px] font-mono font-bold tracking-widest bg-[#0A1A2F]/80 px-1 rounded backdrop-blur-sm border border-white/10"
                    style={{ color: color }}
                >
                    {label}
                </div>
            )}
        </div>
    );
}

function ConnectionLine({ start, end, color, delay, dashed, width = 1 }: { start: { x: number, y: number }, end: { x: number, y: number }, color: string, delay: number, dashed?: boolean, width?: number }) {
    const midX = (start.x + end.x) / 2;
    // Curva para cima se a linha for longa (distância Y)
    const midY = (start.y + end.y) / 2 - 15;

    // SVG path command (Q = Quadratic Bezier)
    const pathD = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;

    return (
        <>
            {/* Background Trace (dimmed) */}
            <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={width}
                strokeOpacity="0.1"
                vectorEffect="non-scaling-stroke"
            />
            {/* Animated Laser Beam */}
            <motion.path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={width === 1 ? 1.5 : 1}
                strokeLinecap="round"
                strokeDasharray={dashed ? "1 2" : "none"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                    pathLength: [0, 0.4, 1],
                    opacity: [0, 1, 0],
                    pathOffset: [0, 0, 0] // Just drawing the line from start to end
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                    repeatDelay: 0.5
                }}
                vectorEffect="non-scaling-stroke"
                filter={`drop-shadow(0 0 2px ${color})`}
            />
        </>
    );
}
