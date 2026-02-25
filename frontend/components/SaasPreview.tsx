'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const features = [
    'Monitoramento 24/7',
    'Alertas de Desvio de Modelo',
    'Relatórios Automatizados para Auditoria',
];

const mockModules = [
    { label: 'Diagnóstico', value: 94, color: '#4F7EFF' },
    { label: 'Conformidade', value: 87, color: '#818CF8' },
    { label: 'Riscos', value: 72, color: '#60a5fa' },
    { label: 'Maturidade', value: 91, color: '#a78bfa' },
];

const liveLogs = [
    { time: '23:41:02', event: 'Modelo LGPD-v2 validado', status: 'ok' },
    { time: '23:41:08', event: 'Alerta: desvio >3% em model-007', status: 'warn' },
    { time: '23:41:15', event: 'Relatório ISO 42001 gerado', status: 'ok' },
    { time: '23:41:22', event: 'Auditoria agendada — 08:00', status: 'info' },
];

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

    return (
        <section className="py-28 bg-[#0B0F1E] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-[#4F7EFF]/5 rounded-full blur-[180px]" />
                {/* Dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(79,126,255,0.07)_1px,transparent_1px)] bg-[size:28px_28px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── LEFT — Text ── */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4F7EFF]/30 bg-[#4F7EFF]/10 text-[#4F7EFF] text-xs font-bold tracking-widest uppercase mb-6"
                        >
                            Plataforma SaaS
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
                            Visualize o status de conformidade de todos os seus modelos de IA em um único dashboard. Métricas de viés, alucinação e privacidade de dados em tempo real.
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
                            <Link href="/register">
                                <button className="group relative overflow-hidden px-7 py-3.5 bg-[#00FF94] text-black rounded-xl font-bold tracking-wide hover:bg-[#00CC76] hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] transition-all duration-300 flex items-center gap-2">
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                    <span className="relative">Solicitar Acesso Beta</span>
                                    <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link href="/dashboard">
                                <button className="px-7 py-3.5 border border-slate-700/50 text-slate-300 rounded-xl font-bold tracking-wide hover:border-[#4F7EFF]/30 hover:text-white transition-all duration-300">
                                    Ver plataforma
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── RIGHT — Mock Dashboard ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-[#4F7EFF]/10 rounded-3xl blur-2xl" />

                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { x.set(0); y.set(0); }}
                            className="relative rounded-2xl border border-slate-700/50 bg-[#0A1A2F]/90 backdrop-blur-sm overflow-hidden shadow-2xl group"
                        >
                            {/* Glare */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Top bar */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/30">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                                    <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                                    <div className="w-2 h-2 rounded-full bg-[#4F7EFF]" />
                                </div>
                                <span className="font-mono text-xs text-slate-500">AI GOV — Risco de Modelo</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                                    <span className="text-[10px] text-[#00FF94] font-mono">Live</span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* KPI row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Trust Score</p>
                                        <p className="font-orbitron text-2xl font-bold text-white">92<span className="text-sm text-slate-500">%</span></p>
                                        <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                            <motion.div initial={{ width: 0 }} whileInView={{ width: '92%' }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-gradient-to-r from-[#4F7EFF] to-[#818CF8] rounded-full" />
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Modelos Ativos</p>
                                        <p className="font-orbitron text-2xl font-bold text-white">14</p>
                                        <p className="text-[10px] text-[#4F7EFF] mt-2">Monitorados</p>
                                    </div>
                                </div>

                                {/* Modules */}
                                <div className="space-y-3">
                                    {mockModules.map((m, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-xs text-slate-400 w-24 flex-shrink-0">{m.label}</span>
                                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${m.value}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: m.color }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-white w-8 text-right">{m.value}%</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Live Logs */}
                                <div className="rounded-xl border border-slate-700/30 bg-black/30 overflow-hidden">
                                    <div className="px-4 py-2 border-b border-slate-700/30 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Live Logs</span>
                                    </div>
                                    <div className="p-3 space-y-1.5 font-mono text-[10px]">
                                        {liveLogs.map((log, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="text-slate-600">{log.time}</span>
                                                <span className={
                                                    log.status === 'ok' ? 'text-[#00FF94]' :
                                                        log.status === 'warn' ? 'text-[#F59E0B]' :
                                                            'text-slate-400'
                                                }>{log.event}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ISO Badge */}
                                <div className="flex items-center gap-2 p-3 rounded-xl border border-[#4F7EFF]/20 bg-[#4F7EFF]/5">
                                    <CheckCircle className="w-4 h-4 text-[#4F7EFF]" />
                                    <span className="text-xs font-bold text-[#4F7EFF]">ISO 42001 Compliance Ativa — Nenhuma não-conformidade</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
