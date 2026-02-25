'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ShieldCheck, Lock, Activity, ArrowUpRight, Globe, Mail,
    Sparkles, Zap, Award, FileText, Cookie
} from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const footerLinks = {
    platform: {
        title: 'Portal do Associado',
        links: [
            { label: 'Acesso Exclusivo', href: '/login' },
            { label: 'Ferramentas de Auditoria', href: '/register?tier=professional' },
            { label: 'Relatórios de Impacto', href: '#' },
            { label: 'Rede de Membros', href: '#', badge: 'Novo' },
        ]
    },
    solutions: {
        title: 'Programas',
        links: [
            { label: 'Certificação ISO 42001', href: '/register' },
            { label: 'Mentoria Executiva', href: '#' },
            { label: 'Grupos de Trabalho', href: '#' },
            { label: 'Selos de Conformidade', href: '/scanner' },
        ]
    },
    governance: {
        title: 'Governança & Legal',
        links: [
            { label: 'Portal do Titular (DSR)', href: '/policies/dpo', icon: ShieldCheck },
            { label: 'Política de Privacidade', href: '/policies/privacy', icon: Lock },
            { label: 'Termos de Uso', href: '/policies/terms', icon: FileText },
            { label: 'Política de Cookies', href: '/policies/cookies', icon: Cookie },
            { label: 'ISO 42001 Native', href: '#', icon: Award },
        ]
    }
};

const certifications = [
    { name: 'ISO', number: '42001', color: '#4F7EFF' },
    { name: 'ISO', number: '27001', color: '#818CF8' },
    { name: 'LGPD', number: 'Ready', color: '#60a5fa' },
];

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[#0B0F1E] to-[#080C18] border-t border-slate-700/30 pt-20 pb-8 relative z-20 overflow-hidden">
            {/* Ambient Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-[#4F7EFF]/5 rounded-full blur-[150px]" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[350px] bg-[#818CF8]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Brand Column */}
                    <motion.div className="col-span-1 lg:col-span-2" variants={itemVariants}>

                        {/* Logo inline SVG */}
                        <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
                            <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
                                <circle cx="22" cy="22" r="20" stroke="#4F7EFF" strokeWidth="1.2" opacity="0.7" />
                                <ellipse cx="22" cy="22" rx="20" ry="8" stroke="#4F7EFF" strokeWidth="0.8" opacity="0.5" />
                                <ellipse cx="22" cy="22" rx="20" ry="14" stroke="#4F7EFF" strokeWidth="0.6" opacity="0.4" />
                                <line x1="22" y1="2" x2="22" y2="42" stroke="#4F7EFF" strokeWidth="0.8" opacity="0.5" />
                                <line x1="5" y1="11" x2="39" y2="33" stroke="#4F7EFF" strokeWidth="0.6" opacity="0.4" />
                                <line x1="5" y1="33" x2="39" y2="11" stroke="#4F7EFF" strokeWidth="0.6" opacity="0.4" />
                                <circle cx="22" cy="2" r="1.5" fill="#4F7EFF" />
                                <circle cx="22" cy="42" r="1.5" fill="#4F7EFF" />
                                <circle cx="2" cy="22" r="1.5" fill="#4F7EFF" />
                                <circle cx="42" cy="22" r="1.5" fill="#4F7EFF" />
                                <circle cx="22" cy="22" r="2" fill="#818CF8" />
                            </svg>
                            <div className="flex flex-col leading-none">
                                <span className="font-orbitron text-sm font-bold tracking-widest text-white uppercase">ALGOR BRASIL</span>
                                <span className="text-[9px] text-[#4F7EFF] tracking-[0.2em] uppercase font-medium mt-0.5">AI Governance</span>
                            </div>
                        </Link>

                        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                            <span className="text-white font-medium">Consultoria de Elite</span> em Governança de Inteligência Artificial. Transformando riscos tecnológicos em ativos estratégicos auditáveis.
                        </p>

                        {/* ALGOR UK Badge */}
                        <motion.a
                            href="https://www.algor.uk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl border border-slate-700/50 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#4F7EFF]/30 transition-all group"
                            whileHover={{ scale: 1.02, x: 4 }}
                        >
                            <Globe className="w-4 h-4 text-[#4F7EFF]" />
                            <span className="font-mono text-xs text-slate-400 group-hover:text-white transition-colors">
                                Uma divisão da <span className="text-[#4F7EFF] font-bold">ALGOR UK</span>
                            </span>
                            <ArrowUpRight className="w-3 h-3 text-[#4F7EFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </motion.a>

                        {/* Status Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#4F7EFF]/20 bg-[#4F7EFF]/5"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Activity className="w-4 h-4 text-[#4F7EFF] animate-pulse" />
                            <span className="font-mono text-[10px] text-[#4F7EFF] uppercase tracking-widest">
                                Verified ALGOR Infrastructure
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Platform Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-[#4F7EFF]" />
                            {footerLinks.platform.title}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.links.map((link, idx) => (
                                <motion.li key={idx} whileHover={{ x: 4 }}>
                                    <Link href={link.href} className="font-mono text-xs text-slate-400 hover:text-[#4F7EFF] transition-colors flex items-center gap-2">
                                        {link.label}
                                        {link.badge && (
                                            <span className="px-1.5 py-0.5 rounded text-[8px] bg-[#4F7EFF]/10 text-[#4F7EFF] border border-[#4F7EFF]/30">
                                                {link.badge}
                                            </span>
                                        )}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Solutions Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-[#818CF8]" />
                            {footerLinks.solutions.title}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.solutions.links.map((link, idx) => (
                                <motion.li key={idx} whileHover={{ x: 4 }}>
                                    <Link href={link.href} className="font-mono text-xs text-slate-400 hover:text-[#4F7EFF] transition-colors">
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Governance Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Lock className="w-3 h-3 text-[#818CF8]" />
                            {footerLinks.governance.title}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.governance.links.map((link, idx) => (
                                <motion.li key={idx} whileHover={{ x: 4 }}>
                                    <Link href={link.href} className="font-mono text-xs text-slate-400 hover:text-[#4F7EFF] transition-colors flex items-center gap-2">
                                        {link.icon && <link.icon className="w-3 h-3" />}
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    className="pt-8 border-t border-slate-700/30"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex-1">
                            <p className="font-mono text-[10px] text-slate-500 max-w-3xl leading-relaxed">
                                © 2025 Algor Association. Representada juridicamente no Brasil pela{' '}
                                <strong className="text-slate-400">XPER BRASIL GESTAO EM INOVAÇÃO TECNOLÓGICA LTDA</strong>.
                                <br />
                                ALGOR é uma organização profissional associativa com registro no Reino Unido (London).{' '}
                                <a href="mailto:global@algor.uk" className="text-[#4F7EFF] hover:underline inline-flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    global@algor.uk
                                </a>
                            </p>
                        </div>

                        {/* Certifications */}
                        <div className="flex items-center gap-3">
                            {certifications.map((cert, idx) => (
                                <motion.div key={idx} className="flex flex-col items-center group" whileHover={{ scale: 1.1, y: -4 }}>
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 border transition-all"
                                        style={{
                                            borderColor: `${cert.color}30`,
                                            backgroundColor: `${cert.color}10`,
                                        }}
                                    >
                                        <span className="font-mono text-[10px] font-bold" style={{ color: cert.color }}>
                                            {cert.name}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[9px]" style={{ color: cert.color }}>{cert.number}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Decorative Bottom */}
                    <motion.div
                        className="mt-8 pt-6 border-t border-slate-700/20 flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 text-[10px] text-slate-600">
                            <Sparkles className="w-3 h-3 text-[#4F7EFF]" />
                            <span className="font-mono">Powered by ALGOR AI Governance Engine</span>
                        </div>

                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: ['#4F7EFF', '#818CF8', '#60a5fa'][i] }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
}
