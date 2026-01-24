'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ShieldCheck, Lock, Activity, ArrowUpRight, Globe, Mail,
    Linkedin, Twitter, Github, Sparkles, Zap, Award, FileText, Cookie
} from "lucide-react";

// ========================================
// FOOTER - Power BI Premium Dark Mode
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
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
    { name: 'ISO', number: '42001', color: '#00FF94' },
    { name: 'ISO', number: '27001', color: '#00A3FF' },
    { name: 'LGPD', number: 'Ready', color: '#8B5CF6' },
];

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[#0A0E1A] to-[#050810] border-t border-white/5 pt-20 pb-8 relative z-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#00FF94]/3 rounded-full blur-[150px]" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#00A3FF]/3 rounded-full blur-[120px]" />
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
                    <motion.div
                        className="col-span-1 lg:col-span-2"
                        variants={itemVariants}
                    >
                        <Link href="/" className="block mb-6 relative group inline-block">
                            <div className="absolute -inset-4 bg-[#00FF94]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                className="relative"
                            >
                                <Image
                                    src="/logo-algor.webp"
                                    alt="ALGOR BRASIL"
                                    width={120}
                                    height={120}
                                    className="relative w-28 h-28 object-cover rounded-full border border-[#00FF94]/30 shadow-[0_0_30px_rgba(0,255,148,0.2)]"
                                />
                            </motion.div>
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                            <span className="text-white font-medium">Consultoria de Elite</span> em Governança de Inteligência Artificial. Transformando riscos tecnológicos em ativos estratégicos auditáveis.
                        </p>

                        {/* ALGOR UK Badge */}
                        <motion.a
                            href="https://www.algor.uk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#00FF94]/30 transition-all group"
                            whileHover={{ scale: 1.02, x: 4 }}
                        >
                            <Globe className="w-4 h-4 text-[#00FF94]" />
                            <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors">
                                Uma divisão da <span className="text-[#00FF94] font-bold">ALGOR UK</span>
                            </span>
                            <ArrowUpRight className="w-3 h-3 text-[#00FF94] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </motion.a>

                        {/* Verified Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#00FF94]/20 bg-[#00FF94]/5"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#00FF94]/30 rounded-full blur-md" />
                                <Activity className="w-4 h-4 text-[#00FF94] relative animate-pulse" />
                            </div>
                            <span className="font-mono text-[10px] text-[#00FF94] uppercase tracking-widest">
                                Verified ALGOR Infrastructure
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Platform Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-[#00A3FF]" />
                            {footerLinks.platform.title}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.links.map((link, idx) => (
                                <motion.li key={idx} whileHover={{ x: 4 }}>
                                    <Link
                                        href={link.href}
                                        className="font-mono text-xs text-gray-400 hover:text-[#00FF94] transition-colors flex items-center gap-2"
                                    >
                                        {link.label}
                                        {link.badge && (
                                            <span className="px-1.5 py-0.5 rounded text-[8px] bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/30">
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
                            <ShieldCheck className="w-3 h-3 text-[#00FF94]" />
                            {footerLinks.solutions.title}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.solutions.links.map((link, idx) => (
                                <motion.li key={idx} whileHover={{ x: 4 }}>
                                    <Link
                                        href={link.href}
                                        className="font-mono text-xs text-gray-400 hover:text-[#00FF94] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Governance Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Lock className="w-3 h-3 text-[#8B5CF6]" />
                            {footerLinks.governance.title}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.governance.links.map((link, idx) => (
                                <motion.li key={idx} whileHover={{ x: 4 }}>
                                    <Link
                                        href={link.href}
                                        className="font-mono text-xs text-gray-400 hover:text-[#00FF94] transition-colors flex items-center gap-2"
                                    >
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
                    className="pt-8 border-t border-white/5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        {/* Legal Text */}
                        <div className="flex-1">
                            <p className="font-mono text-[10px] text-gray-500 max-w-3xl leading-relaxed">
                                © 2025 Algor Association. Representada juridicamente no Brasil pela{' '}
                                <strong className="text-gray-400">XPER BRASIL GESTAO EM INOVAÇÃO TECNOLÓGICA LTDA</strong>.
                                <br />
                                ALGOR é uma organização profissional associativa com registro no Reino Unido (London).{' '}
                                <a href="mailto:global@algor.uk" className="text-[#00A3FF] hover:underline inline-flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    global@algor.uk
                                </a>
                            </p>
                        </div>

                        {/* Certifications */}
                        <div className="flex items-center gap-3">
                            {certifications.map((cert, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex flex-col items-center group"
                                    whileHover={{ scale: 1.1, y: -4 }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 border transition-all group-hover:shadow-lg"
                                        style={{
                                            borderColor: `${cert.color}30`,
                                            backgroundColor: `${cert.color}10`,
                                            boxShadow: `0 0 20px ${cert.color}20`
                                        }}
                                    >
                                        <span
                                            className="font-mono text-[10px] font-bold"
                                            style={{ color: cert.color }}
                                        >
                                            {cert.name}
                                        </span>
                                    </div>
                                    <span
                                        className="font-mono text-[9px]"
                                        style={{ color: cert.color }}
                                    >
                                        {cert.number}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Decorative Bottom */}
                    <motion.div
                        className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 text-[10px] text-gray-600">
                            <Sparkles className="w-3 h-3 text-[#00FF94]" />
                            <span className="font-mono">Powered by ALGOR AI Governance Engine</span>
                        </div>

                        {/* Decorative Dots */}
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: ['#00FF94', '#00A3FF', '#8B5CF6'][i] }}
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
