"use client";

import { motion } from "framer-motion";

export default function MaturityRadar() {
    return (
        <div className="relative w-full h-[400px] flex items-center justify-center p-8 glass-panel rounded-2xl border border-brand-green/20 overflow-hidden">
            {/* Background Grid - Polar Coordinates */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-[300px] h-[300px] border border-brand-blue rounded-full absolute" />
                <div className="w-[200px] h-[200px] border border-brand-blue rounded-full absolute" />
                <div className="w-[100px] h-[100px] border border-brand-blue rounded-full absolute" />
                <div className="w-[350px] h-[1px] bg-brand-blue absolute rotate-0" />
                <div className="w-[350px] h-[1px] bg-brand-blue absolute rotate-45" />
                <div className="w-[350px] h-[1px] bg-brand-blue absolute rotate-90" />
                <div className="w-[350px] h-[1px] bg-brand-blue absolute rotate-135" />
            </div>

            {/* Radar Scan Effect */}
            <div className="absolute inset-0 animate-spin-slow-linear origin-center">
                <div className="w-1/2 h-1/2 bg-gradient-to-tl from-brand-green/20 to-transparent absolute top-0 left-0 origin-bottom-right rotate-[-90deg] backdrop-blur-[1px]"
                    style={{ clipPath: "polygon(100% 100%, 0 0, 100% 0)" }}
                />
            </div>

            {/* Data Points (Simulated) */}
            <div className="relative z-10 w-full h-full">
                {/* Level 1 - Ad Hoc */}
                <div className="absolute top-[60%] left-[45%] group cursor-pointer">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                    <div className="absolute top-4 left-4 bg-brand-navy/90 p-2 rounded border border-red-500 text-[10px] w-32 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <strong className="text-red-400">Nível 1: Ad Hoc</strong> <br />
                        Risco invisível.
                    </div>
                </div>

                {/* Level 3 - Structured (Target) */}
                <div className="absolute top-[30%] right-[35%] group cursor-pointer">
                    <div className="w-4 h-4 bg-brand-green rounded-full shadow-[0_0_15px_#00FF94] ring-2 ring-white/20" />
                    <div className="absolute bottom-4 right-4 bg-brand-navy/90 p-2 rounded border border-brand-green text-[10px] w-32 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <strong className="text-brand-green">Nível 3: Estruturado</strong> <br />
                        Conformidade ISO 42001.
                    </div>
                </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 font-mono text-xs text-brand-green/60">
                [LIVE] MONITORAMENTO DE MATURIDADE
            </div>
        </div>
    );
}
