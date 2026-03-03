'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Linkedin, Mail, ShieldCheck, Globe, ArrowRight, Award, Zap, Calendar, Lock } from 'lucide-react';
import Image from 'next/image';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { SITE_CONFIG } from '@/config/site';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

type Member = {
    name: string;
    role: string;
    specialty: string;
    specialtyColor: string;
    filterTag: string;
    image: string;
    linkedin: string;
    bio?: string;
    founder?: boolean;
};

const boardMembers: Member[] = [
    {
        name: 'Paulo Carvalho',
        role: 'Presidente & Board Member',
        specialty: 'Estratégia & Algoritmos',
        specialtyColor: '#00FF94',
        filterTag: 'Estratégia',
        image: '/images/membro_01_paulo_carvalho.webp',
        linkedin: 'https://www.linkedin.com/in/paulocarvalho11/',
        bio: 'Líder visionário em Governança de IA, guiando a adoção segura de IA em grandes corporações.',
        founder: true,
    },
    {
        name: 'Orlando Pavani',
        role: 'Coordenador Nacional',
        specialty: 'Gestão Organizacional',
        specialtyColor: '#4F7EFF',
        filterTag: 'Gestão',
        image: '/images/membro_02_orlando_pavani.webp',
        linkedin: 'https://www.linkedin.com/in/orlandopavani/',
        bio: 'Especialista na integração de processos tradicionais com novos workflows impulsionados por IA.',
    },
    {
        name: 'Carlos Coan',
        role: 'Consultor Sênior — SP',
        specialty: 'Engenharia de Risco',
        specialtyColor: '#F59E0B',
        filterTag: 'Risco',
        image: '/images/membro_05_carlos_coan.webp',
        linkedin: 'https://www.linkedin.com/in/carloscoan/',
    },
    {
        name: 'Evaldo Reinas',
        role: 'Consultor Sênior — PR',
        specialty: 'Conformidade Regulatória',
        specialtyColor: '#818CF8',
        filterTag: 'Compliance',
        image: '/images/membro_06_evaldo_reinas.webp',
        linkedin: 'https://www.linkedin.com/in/evaldo-reinas-2-54aa37153/',
    },
    {
        name: 'Fábio Ban',
        role: 'Consultor Sênior — PR',
        specialty: 'Segurança da Informação',
        specialtyColor: '#EF4444',
        filterTag: 'Segurança',
        image: '/images/membro_07_fabio_ban.webp',
        linkedin: 'https://www.linkedin.com/in/fabioban/',
    },
    {
        name: 'Jarison Melo',
        role: 'Consultor Sênior — CE',
        specialty: 'Governança Tech',
        specialtyColor: '#06B6D4',
        filterTag: 'Gestão',
        image: '/images/membro_09_jarison_melo.webp',
        linkedin: 'https://www.linkedin.com/in/jarisonmelo-ai-governance/',
    },
    {
        name: 'Marci Dantas',
        role: 'Consultora Sênior — CE',
        specialty: 'Cultura AI First',
        specialtyColor: '#EC4899',
        filterTag: 'Estratégia',
        image: '/images/membro_10_marci_dantas.webp',
        linkedin: 'https://www.linkedin.com/in/marcidantas-ia-governanca/',
    },
    {
        name: 'Edisio Nascimento',
        role: 'Consultor Sênior — PB',
        specialty: 'Integração de Sistemas',
        specialtyColor: '#A78BFA',
        filterTag: 'Segurança',
        image: '/images/membro_11_edisio_nascimento.webp',
        linkedin: 'https://www.linkedin.com/in/edisio-consultor/',
    },
    {
        name: 'Jesus Silva',
        role: 'Consultor Sênior — DF',
        specialty: 'Políticas Públicas & IA',
        specialtyColor: '#34D399',
        filterTag: 'Compliance',
        image: '/images/membro_03_jesus_silva.webp',
        linkedin: '#',
    },
    {
        name: 'José Ricardo',
        role: 'Consultor Sênior — RJ',
        specialty: 'Auditoria Algorítmica',
        specialtyColor: '#FBBF24',
        filterTag: 'Risco',
        image: '/images/membro_08_jose_ricardo.webp',
        linkedin: '#',
    },
];

const filterTags = ['Todos', 'Estratégia', 'Risco', 'Compliance', 'Segurança', 'Gestão'];

// ─────────────────────────────────────────────
// MEMBER CARD
// ─────────────────────────────────────────────

function MemberCard({ member }: { member: Member }) {
    return (
        <div
            className={`group relative rounded-2xl bg-[#0A1222]/80 backdrop-blur-md border border-white/5
            hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col
            ${member.founder ? 'ring-1 ring-[#00FF94]/20 shadow-[0_0_30px_rgba(0,255,148,0.07)]' : ''}`}
        >
            {/* Hover ring */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-2xl transition-colors duration-500 pointer-events-none z-20" />

            {/* ── PHOTO ── */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#060A10] flex-shrink-0">
                {/* dark top gradient so founder badge is readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1222] via-transparent to-transparent z-10 opacity-70" />
                {/* subtle neon overlay on hover */}
                <div className="absolute inset-0 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ backgroundColor: member.specialtyColor + '14' }} />

                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:saturate-125 grayscale group-hover:grayscale-0"
                />

                {/* ── SPECIALTY LABEL — centered, bottom of photo ── */}
                <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-3">
                    <span
                        className="text-[10px] font-bold uppercase tracking-[0.18em] px-4 py-1 rounded
                        bg-black/70 backdrop-blur-sm"
                        style={{ color: member.specialtyColor, borderBottom: `1px solid ${member.specialtyColor}55` }}
                    >
                        {member.specialty}
                    </span>
                </div>

                {/* Founder badge */}
                {member.founder && (
                    <div className="absolute top-3 right-3 z-20">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00FF94] to-[#4F7EFF] flex items-center justify-center shadow-[0_0_12px_rgba(0,255,148,0.5)]">
                            <Zap className="w-3.5 h-3.5 text-black fill-current" />
                        </div>
                    </div>
                )}
            </div>

            {/* ── DETAILS ── */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-3">
                    <h3 className="text-base font-bold text-white group-hover:text-white/90 transition-colors leading-tight">
                        {member.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">{member.role}</p>
                </div>

                {member.bio && (
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">
                        {member.bio}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex gap-2">
                        <SignedIn>
                            {member.linkedin !== '#' && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#4F7EFF]/20 transition-all"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-3.5 h-3.5" />
                                </a>
                            )}
                            <a href="#" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#00FF94]/20 transition-all" aria-label="Email">
                                <Mail className="w-3.5 h-3.5" />
                            </a>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 hover:border-[#4F7EFF]/40 hover:text-[#4F7EFF] transition-all cursor-pointer" aria-label="Login para ver contato">
                                    <Lock className="w-3 h-3" />
                                    Ver Contato
                                </span>
                            </SignInButton>
                        </SignedOut>
                    </div>

                    <button className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 duration-300">
                        Ver Perfil <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function BoardPage() {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const filtered = activeFilter === 'Todos'
        ? boardMembers
        : boardMembers.filter((m) => m.filterTag === activeFilter);

    return (
        <div className="min-h-screen bg-[#0A0E14] text-white font-sans overflow-hidden">
            <Navbar />

            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#4F7EFF]/5 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 pt-32 pb-24 max-w-[1600px] mx-auto px-6">

                {/* ── HEADER ── */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94] text-xs font-bold tracking-widest uppercase mb-6">
                        <Award className="w-4 h-4" />
                        Força-Tarefa Especializada
                    </div>

                    <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 text-white leading-tight">
                        Nosso Esquadrão de Elite em{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#4F7EFF]">
                            Governança de IA
                        </span>
                    </h1>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg font-light">
                        Reunimos as mentes mais brilhantes em ética, compliance, engenharia de risco e segurança algorítmica. Um grupo dedicado a proteger suas operações Enterprise.
                    </p>
                </div>

                {/* ── STATS ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
                    <div className="group relative p-8 rounded-3xl bg-[#0A1A2F]/80 border border-white/5 hover:border-[#00FF94]/30 transition-all duration-500 overflow-hidden flex items-center gap-6">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF94]/10 rounded-full blur-[50px] pointer-events-none" />
                        <div className="w-16 h-16 rounded-2xl bg-[#00FF94]/10 border border-[#00FF94]/20 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-8 h-8 text-[#00FF94]" />
                        </div>
                        <div>
                            <span className="text-5xl font-orbitron font-bold text-white block">25</span>
                            <span className="text-xs text-[#00FF94] uppercase tracking-widest font-bold">Consultores Seniores Dedicados</span>
                        </div>
                    </div>
                    <div className="group relative p-8 rounded-3xl bg-[#0A1A2F]/80 border border-white/5 hover:border-[#4F7EFF]/30 transition-all duration-500 overflow-hidden flex items-center gap-6">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F7EFF]/10 rounded-full blur-[50px] pointer-events-none" />
                        <div className="w-16 h-16 rounded-2xl bg-[#4F7EFF]/10 border border-[#4F7EFF]/20 flex items-center justify-center shrink-0">
                            <Globe className="w-8 h-8 text-[#4F7EFF]" />
                        </div>
                        <div>
                            <span className="text-5xl font-orbitron font-bold text-white block">250+</span>
                            <span className="text-xs text-[#4F7EFF] uppercase tracking-widest font-bold">Especialistas Associados Globais</span>
                        </div>
                    </div>
                </div>

                {/* ── FILTER TABS ── */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filterTags.map((tag) => {
                        const isActive = tag === activeFilter;
                        return (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border
                                    ${isActive
                                        ? 'bg-[#00FF94] text-black border-[#00FF94] shadow-[0_0_18px_rgba(0,255,148,0.35)]'
                                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>

                {/* ── MEMBER GRID ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
                    {filtered.map((member, idx) => (
                        <MemberCard key={idx} member={member} />
                    ))}
                </div>

                {/* ── SCHEDULING CTA ── */}
                <div className="flex justify-center">
                    <a
                        href={SITE_CONFIG.links.calendly.diagnostic}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl
                        bg-transparent border-2 border-[#00FF94]/60
                        text-white font-bold font-orbitron tracking-widest uppercase text-sm
                        shadow-[0_0_30px_rgba(0,255,148,0.15)] hover:shadow-[0_0_50px_rgba(0,255,148,0.35)]
                        hover:border-[#00FF94] hover:bg-[#00FF94]/5
                        transition-all duration-400"
                    >
                        <Calendar className="w-5 h-5 text-[#00FF94] group-hover:scale-110 transition-transform" />
                        Agendar Diagnóstico com Especialista
                    </a>
                </div>

            </main>

            <Footer />
        </div>
    );
}
