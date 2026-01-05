"use client";

import React from 'react';
import { motion, animate } from 'framer-motion';
import { Shield, Lock, AlertTriangle, Activity, EyeOff, Server, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface ShadowDashboardProps {
    score: number;
    riskLevel: string;
    entities: { type: string; value: string; start: number; end: number }[];
    sanitizedText: string;
    originalText: string;
}

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
};

// --- COUNT UP COMPONENT ---
const CountUp = ({ to }: { to: number }) => {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        const controls = animate(0, to, {
            duration: 2,
            onUpdate: (v) => setValue(Math.round(v)),
            ease: "circOut"
        });
        return controls.stop;
    }, [to]);
    return <>{value}</>;
};

// --- NEON CIRCULAR METRIC (GAUGE) ---
const CircularMetric = ({ value, label, subLabel, color, explanation, icon: Icon, tooltipPos = 'right' }: any) => {
    const size = 220;
    const strokeWidth = 12;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    const safeId = React.useMemo(() => label.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, ''), [label]);

    return (
        <motion.div
            variants={itemVariants}
            className="relative flex flex-col items-center justify-center p-6 bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/5 overflow-visible group hover:border-white/20 transition-all shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] h-[380px] hover:z-50"
            whileHover={{ y: -8, boxShadow: `0 20px 60px -15px ${color}30` }}
        >
            {/* Tooltip trigger */}
            <div className="absolute top-4 right-4 z-50 group/info">
                <div className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-help">
                    <Info className="w-4 h-4 text-cyan-400" />
                </div>

                {/* Smart Tooltip */}
                <div className={`absolute bottom-full mb-3 w-72 p-5 bg-[#0a0f18]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-300 z-[100] pointer-events-none ${tooltipPos === 'left' ? 'left-0' : 'right-0'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none rounded-2xl" />
                    <div className="relative z-10 font-bold text-white text-sm mb-2 flex items-center gap-2 uppercase tracking-wider">
                        <Activity className="w-4 h-4 text-cyan-400" /> {label}
                    </div>
                    <p className="relative z-10 text-xs text-gray-300 leading-relaxed font-light">
                        {explanation}
                    </p>
                </div>
            </div>

            {/* Neon Background Glow */}
            <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)` }}
            />

            {/* Chart Area */}
            <div className="relative flex items-center justify-center mb-8 mt-4" style={{ width: size, height: size }}>
                {/* Orbital Rings Animation */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-dashed border-white/5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-4 rounded-full border border-dotted border-white/5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* SVG Ring */}
                <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl overflow-visible">
                    <defs>
                        <filter id={`glow-${safeId}`} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id={`grad-${safeId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                            <stop offset="100%" stopColor={color} stopOpacity="1" />
                        </linearGradient>
                    </defs>

                    {/* Track */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#1E293B"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeLinecap="round"
                        className="opacity-30"
                    />

                    {/* Progress */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 2.5, ease: "circOut", delay: 0.2 }}
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={`url(#grad-${safeId})`}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                        filter={`url(#glow-${safeId})`}
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none">
                    <Icon className="w-8 h-8 mb-2 opacity-80" style={{ color }} />
                    <span className="text-6xl font-black tracking-tighter drop-shadow-lg text-white flex items-baseline" style={{ textShadow: `0 0 20px ${color}60` }}>
                        <CountUp to={value} /><span className="text-2xl text-gray-400 font-light ml-1">%</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mt-2">{subLabel}</span>
                </div>
            </div>

            {/* Labels */}
            <div className="text-center z-10 w-full relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <h3 className="text-lg font-bold uppercase tracking-widest mt-4 text-white group-hover:text-cyan-200 transition-colors">{label}</h3>
            </div>
        </motion.div>
    );
};

export default function ShadowDashboard({ score, riskLevel, entities, sanitizedText, originalText }: ShadowDashboardProps) {
    const isCritical = score > 50;
    const statusColor = isCritical ? '#FF0055' : '#00FF94'; // Neon Red / Neon Green

    // Data for charts
    const entityTypes = Array.from(new Set(entities.map(e => e.type)));
    const distributionData = entityTypes.map(type => ({
        name: type.replace('_', ' '),
        value: entities.filter(e => e.type === type).length,
    }));

    // Mock Timeline Data
    const waveformData = Array.from({ length: 20 }, (_, i) => ({
        time: i,
        intensity: Math.random() * (isCritical ? 90 : 30) + (isCritical ? 10 : 0)
    }));

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full space-y-8 relative"
        >
            {/* BACKGROUND SHADERS (Consistent with Premium Dashboard) */}
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_transparent_70%)] z-[-1] pointer-events-none opacity-50" />

            {/* 1. HEADER BRANDING */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-2 px-2 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${isCritical ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                        <EyeOff className={`w-6 h-6 ${isCritical ? 'text-red-500' : 'text-green-500'}`} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold font-orbitron tracking-wider text-white">UNIDADE DE INTELIGÊNCIA SHADOW</h2>
                        <p className="text-xs text-gray-500 font-mono flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> SISTEMA ONLINE
                        </p>
                    </div>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                    SCAN_ID: {Math.random().toString(36).substring(2, 9).toUpperCase()}
                </div>
            </motion.div>

            {/* 2. TOP METRICS ROW (Neon Gauges) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CircularMetric
                    value={score}
                    label="Nível de Exposição"
                    subLabel={riskLevel}
                    color={statusColor}
                    icon={Shield}
                    tooltipPos="left"
                    explanation="Métrica que quantifica o risco de identificação de indivíduos (PII) ou dados de saúde (PHI) no texto analisado. Quanto menor, mais seguro."
                />

                {/* VIOLATIONS CENTER CARD (Holographic) */}
                <motion.div
                    variants={itemVariants}
                    className="relative flex flex-col items-center justify-center p-6 bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden shadow-2xl h-[380px] group"
                >
                    {/* Animated Gradient Background */}
                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-b ${isCritical ? 'from-red-500/20 to-transparent' : 'from-green-500/20 to-transparent'} pointer-events-none`} />

                    {/* Central Hologram */}
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            className={`w-32 h-32 rounded-full flex items-center justify-center mb-12 border-2 ${isCritical ? 'border-red-500/30 bg-red-500/5' : 'border-green-500/30 bg-green-500/5'}`}
                            animate={{
                                boxShadow: isCritical ? ['0 0 20px rgba(239,68,68,0)', '0 0 50px rgba(239,68,68,0.3)', '0 0 20px rgba(239,68,68,0)'] : ['0 0 20px rgba(34,197,94,0)', '0 0 50px rgba(34,197,94,0.3)', '0 0 20px rgba(34,197,94,0)'],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <AlertTriangle className={`w-14 h-14 ${isCritical ? 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]'}`} />
                        </motion.div>

                        <span className="text-7xl font-black text-white tracking-widest drop-shadow-2xl absolute top-[150px] pointer-events-none z-20">
                            <CountUp to={entities.length} />
                        </span>

                        <h3 className={`text-xl font-bold uppercase tracking-[0.3em] mt-16 ${isCritical ? 'text-red-400' : 'text-green-400'}`}>Violações</h3>
                        <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Detectadas no Scan</p>
                    </div>
                </motion.div>

                <CircularMetric
                    value={100}
                    label="Ofuscação Ativa"
                    subLabel="DLP Protection"
                    color="#00F0FF" // Neon Cyan
                    icon={Lock}
                    explanation="Status do motor de Data Loss Prevention (DLP). Quando 100%, indica que todas as camadas de proteção e mascaramento de dados estão operantes."
                />
            </div>

            {/* 3. MIDDLE ROW: ANALYTICS */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* LEFT: Distribution (Neon Bars) */}
                <motion.div variants={itemVariants} className="md:col-span-3 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors relative group overflow-hidden">
                    {/* Spotlight */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <h3 className="text-sm text-cyan-400 font-bold uppercase mb-6 flex items-center gap-2 relative z-10">
                        <Server className="w-4 h-4" /> Vetores de Ataque Detectados
                    </h3>
                    <div className="h-48 w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={distributionData} layout="vertical" barSize={12} barCategoryGap={2}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                                    width={100}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1500}>
                                    {distributionData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index % 2 === 0 ? '#00F0FF' : '#9945FF'}
                                            style={{ filter: 'drop-shadow(0 0 4px rgba(0, 240, 255, 0.5))' }}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* RIGHT: Signals (Neon Wave) */}
                <motion.div variants={itemVariants} className="md:col-span-2 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors relative group overflow-hidden">
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <h3 className="text-sm text-purple-400 font-bold uppercase mb-4 flex items-center gap-2 relative z-10">
                        <Activity className="w-4 h-4" /> Entropia de Sinais
                    </h3>
                    <div className="flex-1 h-36 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={waveformData}>
                                <defs>
                                    <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={statusColor} stopOpacity={0.4} />
                                        <stop offset="100%" stopColor={statusColor} stopOpacity={0} />
                                    </linearGradient>
                                    <filter id="neonStrokeWave" height="130%">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="intensity"
                                    stroke={statusColor}
                                    strokeWidth={3}
                                    fill="url(#colorWave)"
                                    filter="url(#neonStrokeWave)"
                                    isAnimationActive={true}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex justify-between items-center text-xs border-t border-white/5 pt-3 relative z-10">
                        <span className="text-gray-500">Intensidade de Risco</span>
                        <div className={`px-2 py-0.5 rounded border ${isCritical ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                            {isCritical ? 'CRÍTICO' : 'NOMINAL'}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* 4. BOTTOM: REDACTED VIEWER (Terminal Style) */}
            {/* 4. BOTTOM: DUAL VIEW (RISK ANALYSIS vs SANITIZED) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT: RISK ANALYSIS (Highlighted) */}
                <motion.div
                    variants={itemVariants}
                    className="bg-[#050910] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col h-full"
                >
                    <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded bg-red-500/10 border border-red-500/30">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                            </div>
                            <span className="text-sm font-bold font-orbitron text-red-100">DETECTED_RISKS.log</span>
                        </div>
                        <span className="text-[10px] font-mono text-red-400 animate-pulse">Scanning Complete</span>
                    </div>

                    <div className="p-6 font-mono text-sm leading-8 text-gray-400 relative flex-1 min-h-[300px] bg-[url('/grid.svg')] bg-center opacity-90 overflow-y-auto max-h-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050910]/30 to-[#050910]/90 pointer-events-none" />

                        <div className="relative z-10 whitespace-pre-wrap">
                            {(() => {
                                const sortedEntities = [...entities].sort((a, b) => a.start - b.start);
                                const elements = [];
                                let lastIndex = 0;

                                sortedEntities.forEach((entity, index) => {
                                    if (entity.start < lastIndex) return; // Skip overlap

                                    // Pre-entity text
                                    elements.push(originalText.substring(lastIndex, entity.start));

                                    // Entity text (Highlighted)
                                    elements.push(
                                        <span key={index} className="inline-block px-1 rounded bg-red-500/30 border-b-2 border-red-500 text-white font-bold mx-0.5" title={entity.type}>
                                            {originalText.substring(entity.start, entity.end)}
                                        </span>
                                    );
                                    lastIndex = entity.end;
                                });
                                // Remaining text
                                elements.push(originalText.substring(lastIndex));

                                return elements;
                            })()}
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT: SANITIZED OUTPUT (Clean) */}
                <motion.div
                    variants={itemVariants}
                    className="bg-[#050910] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col h-full"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

                    <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                                <Lock className="w-4 h-4 text-cyan-400" />
                            </div>
                            <span className="text-sm font-bold font-orbitron text-cyan-100">SECURE_OUTPUT.txt</span>
                        </div>
                        <div className="flex gap-4 text-[10px] font-mono text-gray-500">
                            <span>ENC: AES-256</span>
                            <span className="text-cyan-400">SAFE TO EXPORT</span>
                        </div>
                    </div>

                    <div className="p-6 font-mono text-sm leading-8 text-gray-300 relative flex-1 min-h-[300px] bg-[url('/grid.svg')] bg-center opacity-90 overflow-y-auto max-h-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050910]/30 to-[#050910]/90 pointer-events-none" />

                        <div className="relative z-10 whitespace-pre-wrap">
                            {(() => {
                                const sortedEntities = [...entities].sort((a, b) => a.start - b.start);
                                const elements = [];
                                let lastIndex = 0;

                                sortedEntities.forEach((entity, index) => {
                                    if (entity.start < lastIndex) return; // Skip overlap

                                    // Pre-entity text
                                    elements.push(originalText.substring(lastIndex, entity.start));

                                    // Entity Placeholder (LGPD Compliant)
                                    let placeholder = "[DADO REMOVIDO]";
                                    if (entity.type === 'CPF') placeholder = "[CPF]";
                                    if (entity.type === 'CRM_MEDICO') placeholder = "[CRM]";
                                    if (entity.type === 'CID_10') placeholder = "[CID]";
                                    if (entity.type === 'SENSIBILIDADE') placeholder = "[DADO SENSÍVEL]";
                                    if (entity.type === 'DATA') placeholder = "[DATA]";

                                    elements.push(
                                        <span key={index} className="text-cyan-400 font-bold select-none" title={`LGPD: ${entity.type} Anonimizado`}>
                                            {placeholder}
                                        </span>
                                    );
                                    lastIndex = entity.end;
                                });
                                // Remaining text
                                elements.push(originalText.substring(lastIndex));

                                return elements;
                            })()}
                        </div>
                    </div>
                </motion.div>
            </div>

        </motion.div>
    );
}

