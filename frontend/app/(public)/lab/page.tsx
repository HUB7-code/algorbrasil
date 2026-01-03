"use client";

import React, { useState } from 'react';
import AssessmentLab from "@/components/lab/AssessmentLab";
import ShadowScanner from "@/components/lab/ShadowScanner";
import ISOWizard from "@/components/lab/ISOWizard";
import { Activity, EyeOff, ShieldCheck } from 'lucide-react';

export default function LabPage() {
    const [activeTab, setActiveTab] = useState<'xai' | 'shadow' | 'iso'>('xai');

    return (
        <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00A3FF]/10 to-transparent pointer-events-none" />
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#00FF94]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#00A3FF] text-xs font-bold tracking-widest uppercase mb-4">
                        ALGOR FORENSIC UNIT
                    </span>
                    <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-6">
                        Health AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">Laboratório</span>
                    </h1>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center mb-10 gap-4 flex-wrap">
                    <button
                        onClick={() => setActiveTab('xai')}
                        className={`px-6 py-3 rounded-xl border flex items-center gap-2 transition-all font-orbitron text-sm
                            ${activeTab === 'xai'
                                ? 'bg-[#00A3FF]/20 border-[#00A3FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.3)]'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}
                        `}
                    >
                        <Activity className="w-4 h-4" /> XAI Auditor
                    </button>

                    <button
                        onClick={() => setActiveTab('shadow')}
                        className={`px-6 py-3 rounded-xl border flex items-center gap-2 transition-all font-orbitron text-sm
                            ${activeTab === 'shadow'
                                ? 'bg-red-500/20 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}
                        `}
                    >
                        <EyeOff className="w-4 h-4" /> Shadow Simulator
                    </button>

                    <button
                        onClick={() => setActiveTab('iso')}
                        className={`px-6 py-3 rounded-xl border flex items-center gap-2 transition-all font-orbitron text-sm
                            ${activeTab === 'iso'
                                ? 'bg-[#00FF94]/20 border-[#00FF94] text-white shadow-[0_0_20px_rgba(0,255,148,0.3)]'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}
                        `}
                    >
                        <ShieldCheck className="w-4 h-4" /> ISO 42001 Radar
                    </button>
                </div>

                {/* Content Area */}
                <div className="min-h-[600px]">
                    {activeTab === 'xai' && <AssessmentLab />}
                    {activeTab === 'shadow' && <ShadowScanner />}
                    {activeTab === 'iso' && <ISOWizard />}
                </div>
            </div>
        </main>
    );
}
