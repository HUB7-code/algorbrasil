'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle, Activity, Lock } from 'lucide-react';
import Link from 'next/link';

const features = [
    'Monitoramento 24/7',
    'Alertas de Desvio de Modelo',
    'RelatÃ³rios Automatizados para Auditoria',
];

const mockModules = [
    { label: 'DiagnÃ³stico', value: 94, color: '#4F7EFF' },
    { label: 'Conformidade', value: 87, color: '#818CF8' },
    { label: 'Riscos', value: 72, color: '#60a5fa' },
    { label: 'Maturidade', value: 91, color: '#a78bfa' },
];

const liveLogs = [
    { time: '23:41:02', event: 'Modelo LGPD-v2 validado', status: 'ok' },
    { time: '23:41:08', event: 'Alerta: desvio >3% em model-007', status: 'warn' },
    { time: '23:41:15', event: 'RelatÃ³rio ISO 42001 gerado', status: 'ok' },
    { time: '23:41:22', event: 'Auditoria agendada â€” 08:00', status: 'info' },
];

// Animated counter hook
function useCounter(target: number, delay = 0) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start: number | null = null;
        const timeout = setTimeout(() => {
            const step = (ts: number) => {
                if (!start) start = ts;
                const pct = Math.min((ts - start) / 1200, 1);
                setCount(Math.round(pct * target));
                if (pct < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [isInView, target, delay]);

    return { ref, count };
}

// Live log ticker
function LiveLogTicker() {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % liveLogs.length), 2200);
        return () => clearInterval(t);
    }, []);
    const log = liveLogs[idx];
    const dot = log.status === 'ok' ? '#00FF94' : log.status === 'warn' ? '#F59E0B' : '#818CF8';
    return (
        <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2 text-[9px] font-mono"
        >
            <span style={{ color: dot }}>â—</span>
            <span className="text-slate-500">{log.time}</span>
            <span className="text-slate-300">{log.event}</span>
        </motion.div>
    );
}

export default function SaasPreview() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const dashboardRef = useRef<HTMLDivElement>(null);
    const isDashboardInView = useInView(dashboardRef, { once: true, margin: '-100px' });
    const trustCounter = useCounter(92, 0.4);

    return (
        <section className="py-28 bg-[#0B0F1E] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-[#4F7EFF]/5 rounded-full blur-[180px]" />
                {/* Dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(79,126,255,0.07)_1px,transparent_1px)] bg-[size:28px_28px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* â”€â”€ LEFT â€” Text â”€â”€ */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4F7EFF]/30 bg-[#4F7EFF]/10 text-[#4F7EFF] text-xs font-bold tracking-widest uppercase mb-6"
                        >
                            <Activity className="w-3.5 h-3.5 animate-pulse" />
                            Plataforma SaaS â€¢ Live
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-inter text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight"
                        >
                            Painel de Controle{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7EFF] to-[#818CF8]">
                                Unificado
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg leading-relaxed mb-8"
                        >
                            Visualize o status de conformidade de todos os seus modelos de IA em um Ãºnico dashboard. MÃ©tricas de viÃ©s, alucinaÃ§Ã£o e privacidade de dados em tempo real.
                        </motion.p>

                        <motion.ul
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4 mb-10"
                        >
                            {features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-white">
                                    <CheckCircle className="w-5 h-5 text-[#00FF94] flex-shrink-0" />
                                    <span className="text-sm font-medium">{f}</span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                href="/register"
                                className="group relative overflow-hidden px-7 py-3.5 bg-[#00FF94] text-black rounded-xl font-bold tracking-wide hover:bg-[#00CC76] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all duration-300 flex items-center gap-2 block"
                            >
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                <span className="relative">Solicitar Acesso Beta</span>
                                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/dashboard"
                                className="px-7 py-3.5 border border-slate-700/50 text-slate-300 rounded-xl font-bold tracking-wide hover:border-[#4F7EFF]/30 hover:text-white transition-all duration-300 block text-center"
                            >
                                Ver plataforma
                            </Link>
                        </motion.div>
                    </div>

                    {/* â”€â”€ RIGHT â€” Animated Dashboard â”€â”€ */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                        ref={dashboardRef}
                    >
                        <div className="absolute -inset-4 bg-[#4F7EFF]/10 rounded-3xl blur-2xl" />

                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { x.set(0); y.set(0); }}
                            className="relative rounded-[2rem] border border-[#4F7EFF]/30 bg-[#0A1A2F]/90 backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(79,126,255,0.15)] group"
                        >
                            {/* Glare */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

                            {/* Base image */}
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                                alt="Dashboard AI Governance"
                                className="object-cover w-full aspect-[4/3] transform group-hover:scale-105 transition-transform duration-700 z-10 relative"
                                style={{ filter: 'saturate(0.7) brightness(0.6)' }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1E]/20 via-transparent to-[#0B0F1E]/80 pointer-events-none z-10" />

                            {/* â”€â”€ Module Score Bars (animated) â”€â”€ */}
                            <div className="absolute top-5 left-5 right-5 z-30 bg-[#0A1A2F]/80 backdrop-blur-lg rounded-xl border border-white/10 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">MÃ³dulos de Conformidade</p>
                                    <Lock className="w-3 h-3 text-[#00FF94]" />
                                </div>
                                <div className="space-y-2.5">
                                    {mockModules.map((m, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-[9px] text-slate-400 w-20 flex-shrink-0">{m.label}</span>
                                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ background: `linear-gradient(to right, ${m.color}80, ${m.color})` }}
                                                    initial={{ width: 0 }}
                                                    animate={isDashboardInView ? { width: `${m.value}%` } : {}}
                                                    transition={{ delay: 0.3 + i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                                />
                                            </div>
                                            <span className="text-[9px] font-bold w-7 text-right" style={{ color: m.color }}>{m.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* â”€â”€ Bottom overlay: Trust Score + Live log â”€â”€ */}
                            <div className="absolute bottom-4 left-4 right-4 z-30 flex gap-3">
                                {/* Trust Score animated counter */}
                                <div
                                    ref={trustCounter.ref as React.RefObject<HTMLDivElement>}
                                    className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex-1"
                                >
                                    <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-0.5">Trust Score</p>
                                    <p className="font-orbitron text-xl font-bold text-white">
                                        {trustCounter.count}<span className="text-sm text-slate-500">%</span>
                                    </p>
                                    <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                                        <motion.div
                                            className="bg-gradient-to-r from-[#4F7EFF] to-[#00FF94] h-full rounded-full"
                                            initial={{ width: 0 }}
                                            animate={isDashboardInView ? { width: '92%' } : {}}
                                            transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                                {/* Live log ticker */}
                                <div className="bg-black/70 backdrop-blur-md border border-[#4F7EFF]/30 rounded-xl p-3.5 flex-1 flex flex-col justify-between overflow-hidden">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                                        <p className="text-[8px] font-bold text-[#00FF94] uppercase tracking-widest">Live Log</p>
                                    </div>
                                    <LiveLogTicker />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

