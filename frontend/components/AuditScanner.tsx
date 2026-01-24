'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Check } from 'lucide-react';

export default function AuditScanner() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">

            {/* Main Container - Floating Laptop */}
            <motion.div
                className="relative w-48 flex flex-col items-center justify-center" // Slightly larger w-48
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >

                {/* 1. Laptop Lid (Display Housing) - GLASSMORPHISM */}
                <div className="relative w-40 h-24 rounded-t-xl rounded-b-[2px] p-[2px] z-10 overflow-hidden">
                    {/* Glass Housing Background */}
                    <div className="absolute inset-0 bg-[#0A1A2F]/60 backdrop-blur-md border border-[#00FF94]/30 rounded-t-xl rounded-b-[2px] shadow-[0_0_20px_rgba(0,255,148,0.1)]" />

                    {/* The Screen (LCD) - Inner Frame */}
                    <div className="relative w-full h-full bg-black/80 rounded-[4px] overflow-hidden flex flex-col mx-auto px-[1px] pt-[1px]">

                        {/* Screen Content Container */}
                        <div className="relative w-full h-full bg-[#03070C]/90 overflow-hidden flex flex-col">

                            {/* Camera Dot */}
                            <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-1 h-1 bg-white/20 rounded-full z-20" />

                            {/* MATRIX RAIN EFFECT - Hydration Safe */}
                            <MatrixRain />

                            {/* Data Graph Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 h-8 flex items-end gap-1 px-2 pb-1 opacity-80 z-10">
                                <div className="w-full h-[1px] bg-[#00FF94]/30 absolute bottom-1" />
                                {[0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 0.7].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 bg-gradient-to-t from-[#00FF94]/80 to-[#00A3FF]/80 rounded-t-[1px]"
                                        initial={{ height: '10%' }}
                                        animate={{ height: `${h * 100}%` }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, repeatType: 'reverse' }}
                                    />
                                ))}
                            </div>

                            {/* LASER SCANNER (Inside Screen) */}
                            <motion.div
                                className="absolute left-0 right-0 h-[2px] bg-[#00FF94] z-20 shadow-[0_0_10px_#00FF94] blur-[0.5px]"
                                animate={{ top: ['0%', '110%'] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#00FF94]/20 to-transparent" />
                            </motion.div>

                        </div>
                    </div>
                </div>

                {/* 2. Laptop Base (Keyboard) - GLASSMORPHISM */}
                <div className="relative w-48 h-3 mt-[-1px] rounded-b-xl z-20 overflow-hidden">
                    {/* Base Glass */}
                    <div className="absolute inset-0 bg-[#0A1A2F]/80 backdrop-blur-md border-b border-x border-[#00FF94]/30 rounded-b-xl" />
                    {/* Metallic Shine */}
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-white/20" />

                    {/* Trackpad */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-black/20 rounded-b-md" />

                    {/* Bottom Glow */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#00FF94]/20 blur-md rounded-full" />
                </div>


                {/* 3. Floating Audit Badge - Enhanced 3D Glass */}
                <motion.div
                    className="absolute -right-6 top-0 z-30"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                >
                    <div className="relative flex items-center justify-center w-10 h-10">
                        {/* Glass Bubble */}
                        <div className="absolute inset-0 bg-[#0A1A2F]/80 backdrop-blur-xl rounded-full border border-[#00FF94] shadow-[0_0_20px_rgba(0,255,148,0.3)]" />

                        {/* Icons */}
                        <div className="relative z-10 flex items-center justify-center">
                            <Search className="w-5 h-5 text-[#00FF94]" strokeWidth={2.5} />
                            <motion.div
                                className="absolute"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Check className="w-3 h-3 text-white shadow-black drop-shadow-md" strokeWidth={4} />
                            </motion.div>
                        </div>

                        {/* Orbiting Dot */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-t-2 border-transparent border-r-2 border-[#00FF94]/50"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}

function MatrixRain() {
    const [mounted, setMounted] = useState(false);

    // Static initial state for server and first render
    // Use a fixed pattern to ensure server/client match before effect runs
    // Or just render nothing initially if acceptable, but a fixed pattern is better for perceived loading.
    // For matrix rain, showing nothing until mounted is acceptable and cleaner.

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="absolute inset-0 flex justify-between px-2 pt-2 opacity-60"></div>;
    }

    return (
        <div className="absolute inset-0 flex justify-between px-2 pt-2 opacity-60">
            {[...Array(8)].map((_, colIndex) => (
                <motion.div
                    key={colIndex}
                    className="flex flex-col gap-0.5 text-[6px] font-mono text-[#00FF94] leading-none"
                    initial={{ y: -50 }}
                    animate={{ y: [0, 100] }}
                    transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                >
                    {[...Array(12)].map((_, charIndex) => (
                        <span key={charIndex} style={{ opacity: 1 - charIndex * 0.1 }}>
                            {Math.random() > 0.5 ? '1' : '0'}
                        </span>
                    ))}
                </motion.div>
            ))}
        </div>
    );
}
