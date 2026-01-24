'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';

export default function IsoBadgeAnimator() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">

            {/* 1. Rotating Outer Ring (Dashed) */}
            <motion.div
                className="absolute w-32 h-32 rounded-full border border-dashed border-[#00A3FF]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute w-28 h-28 rounded-full border border-dotted border-[#00A3FF]/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* 2. Main Badge Container */}
            <motion.div
                className="relative z-10 w-24 h-24"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Shield Shape Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF] to-[#0055FF] opacity-10 blur-xl rounded-full" />

                {/* Glassy Shield */}
                <div className="relative w-full h-full bg-[#0A1A2F]/80 backdrop-blur-md rounded-2xl border border-[#00A3FF]/50 shadow-[0_0_20px_rgba(0,163,255,0.2)] flex items-center justify-center overflow-hidden transform rotate-45 group-hover:rotate-0 transition-all duration-500">

                    {/* Inner Content (Counter-rotated to stay upright) */}
                    <div className="transform -rotate-45 group-hover:rotate-0 transition-all duration-500 flex flex-col items-center justify-center">

                        {/* ISO Text */}
                        <div className="text-[#00A3FF] font-bold font-orbitron text-lg tracking-widest mb-1">ISO</div>
                        <div className="text-white font-bold font-orbitron text-xs opacity-80">42001</div>

                        {/* Animated Checkmark */}
                        <motion.div
                            className="mt-1 relative"
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ShieldCheck className="w-6 h-6 text-[#00FF94]" />
                        </motion.div>
                    </div>

                    {/* Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent z-20 pointer-events-none"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                </div>
            </motion.div>

            {/* 3. Orbiting Particles */}
            {[0, 120, 240].map((deg, i) => (
                <motion.div
                    key={i}
                    className="absolute w-36 h-36"
                    initial={{ rotate: deg }}
                    animate={{ rotate: deg + 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div
                        className="w-2 h-2 bg-[#00A3FF] rounded-full shadow-[0_0_10px_#00A3FF]"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            ))}

            {/* 4. Bottom Glow */}
            <div className="absolute bottom-4 w-20 h-1 bg-[#00A3FF]/50 blur-sm rounded-full animate-pulse" />

        </div>
    );
}
