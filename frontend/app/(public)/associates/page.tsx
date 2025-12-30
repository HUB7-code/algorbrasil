"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, X, ShieldCheck, Award, MapPin, ChevronRight, Search } from 'lucide-react';

// Dados dos Associados (Mantidos)
const ASSOCIATES_DATA = [
    {
        id: 1,
        nome: "Paulo Carvalho",
        foto: "/images/membro_01_paulo_carvalho.webp",
        cargo: "Presidente ALGOR BRASIL",
        tags: ["Presidência", "Estratégia"],
        nivel: "Executive",
        bio_curta: "Liderança executiva na condução da estratégia nacional de Governança de IA.",
        link_linkedin: "https://www.linkedin.com/in/paulocarvalho11/"
    },
    {
        id: 2,
        nome: "Orlando Pavani",
        foto: "/images/membro_02_orlando_pavani.webp",
        cargo: "Coordenador Nacional",
        tags: ["Coordenação", "Gestão"],
        nivel: "Executive",
        bio_curta: "Coordenação de iniciativas nacionais e integração dos núcleos regionais.",
        link_linkedin: "https://www.linkedin.com/in/orlandopavani/"
    },
    {
        id: 3,
        nome: "Jesus Silva",
        foto: "/images/membro_03_jesus_silva.webp",
        cargo: "Gestor Regional - Brasília",
        tags: ["Regional", "Brasília"],
        nivel: "Regional",
        bio_curta: "Gestão estratégica do núcleo ALGOR no Distrito Federal.",
        link_linkedin: "#"
    },
    {
        id: 4,
        nome: "Gervásio Albuquerque",
        foto: "/images/membro_04_gervasio_albuquerque.png",
        cargo: "Delegado Regional - DF",
        tags: ["Regional", "Representação"],
        nivel: "Regional",
        bio_curta: "Representação institucional e articulação no Distrito Federal.",
        link_linkedin: "#"
    },
    {
        id: 5,
        nome: "Carlos Coan",
        foto: "/images/membro_05_carlos_coan.webp",
        cargo: "Gestor Regional - São Paulo",
        tags: ["Regional", "São Paulo"],
        nivel: "Regional",
        bio_curta: "Liderança das iniciativas de governança no estado de São Paulo.",
        link_linkedin: "https://www.linkedin.com/in/carloscoan/"
    },
    {
        id: 6,
        nome: "Evaldo Reinas",
        foto: "/images/membro_06_evaldo_reinas.webp",
        cargo: "Gestor Regional - Paraná",
        tags: ["Regional", "Paraná"],
        nivel: "Regional",
        bio_curta: "Gestão e fomento da cultura de IA responsável no Paraná.",
        link_linkedin: "https://www.linkedin.com/in/evaldo-reinas-2-54aa37153/"
    },
    {
        id: 7,
        nome: "Fabio Ban",
        foto: "/images/membro_07_fabio_ban.webp",
        cargo: "Delegado Regional - Paraná",
        tags: ["Regional", "Representação"],
        nivel: "Regional",
        bio_curta: "Atuação como delegado regional para expansão da ALGOR no PR.",
        link_linkedin: "https://www.linkedin.com/in/fabioban/"
    },
    {
        id: 8,
        nome: "José Ricardo",
        foto: "/images/membro_08_jose_ricardo.webp",
        cargo: "Gestor Regional - Rio de Janeiro",
        tags: ["Regional", "Rio de Janeiro"],
        nivel: "Regional",
        bio_curta: "Liderança executiva do núcleo regional do Rio de Janeiro.",
        link_linkedin: "#"
    },
    {
        id: 9,
        nome: "Jarison Melo",
        foto: "/images/membro_09_jarison_melo.webp",
        cargo: "Gestor Regional - Ceará",
        tags: ["Regional", "Ceará"],
        nivel: "Regional",
        bio_curta: "Gestão das atividades e membros da ALGOR no estado do Ceará.",
        link_linkedin: "https://www.linkedin.com/in/jarisonmelo-ai-governance/"
    },
    {
        id: 10,
        nome: "Marci Dantas",
        foto: "/images/membro_10_marci_dantas.webp",
        cargo: "Delegada Regional - Fortaleza CE",
        tags: ["Regional", "Ceará"],
        nivel: "Regional",
        bio_curta: "Representação e liderança delegada na capital cearense.",
        link_linkedin: "https://www.linkedin.com/in/marcidantas-ia-governanca/"
    },
    {
        id: 11,
        nome: "Edísio Nascimento",
        foto: "/images/membro_11_edisio_nascimento.webp",
        cargo: "Gestor Regional - Paraíba",
        tags: ["Regional", "Paraíba"],
        nivel: "Regional",
        bio_curta: "Fomento à governança de IA e gestão do núcleo Paraíba.",
        link_linkedin: "https://www.linkedin.com/in/edisio-consultor/"
    }
];

const FILTERS = ["Todos", "Jurídico", "Técnico", "Ética", "Gestão", "Compliance"];

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring", stiffness: 50, damping: 15 }
    }
};

export default function AssociatesGalleryPage() {
    const [filter, setFilter] = useState("Todos");
    const [selectedAssociate, setSelectedAssociate] = useState<typeof ASSOCIATES_DATA[0] | null>(null);

    // Filter Logic
    const filteredData = filter === "Todos"
        ? ASSOCIATES_DATA
        : ASSOCIATES_DATA.filter(item => item.tags.includes(filter));

    return (
        <div className="min-h-screen bg-[#050810] text-white pt-32 pb-20 relative overflow-hidden font-sans selection:bg-[#00FF94] selection:text-black">

            {/* --- AMBIENT BACKGROUND --- */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-[0.03]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6 backdrop-blur-sm">
                        <Award className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Excellence Network</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        Rede de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">Especialistas</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
                        A elite da governança de IA no Brasil. Conecte-se com as mentes que estão moldando o futuro da tecnologia responsável.
                    </p>
                </motion.div>

                {/* --- CONTROLS BAR --- */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-2 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-300
                                    ${filter === f
                                        ? 'bg-gradient-to-r from-[#00A3FF] to-[#0088FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.3)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Search Mockup (Visual Only) */}
                    <div className="relative group w-full md:w-64 hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-[#00FF94] transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar especialista..."
                            className="w-full bg-[#050810]/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00FF94]/50 transition-colors"
                        />
                    </div>
                </div>

                {/* --- GALLERY GRID --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredData.map((associate) => (
                            <motion.div
                                key={associate.id}
                                layout
                                variants={cardVariants}
                                onClick={() => setSelectedAssociate(associate)}
                                className="group relative cursor-pointer"
                            >
                                {/* Glow Effect on Hover */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FF94] to-[#00A3FF] rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition duration-500" />

                                {/* Card Content */}
                                <div className="relative h-full bg-[#0D1117]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-white/20 hover:-translate-y-1">

                                    {/* Decoration Lines */}
                                    <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                    {/* Avatar Container */}
                                    <div className="relative mb-6">
                                        <div className="w-28 h-28 rounded-full p-[2px] bg-gradient-to-b from-[#00A3FF] to-[#00A3FF00] group-hover:from-[#00FF94] group-hover:to-[#00A3FF] transition-all duration-500">
                                            <div className="w-full h-full rounded-full overflow-hidden bg-[#050810] relative">
                                                <Image
                                                    src={associate.foto}
                                                    alt={associate.nome}
                                                    fill
                                                    sizes="112px"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                        </div>
                                        {/* Status Badge */}
                                        <div className="absolute -bottom-1 -right-1 bg-[#050810] rounded-full p-1 border border-[#00FF94]/30">
                                            <ShieldCheck className="w-5 h-5 text-[#00FF94] fill-[#00FF94]/10" />
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <h3
                                        className="text-lg font-bold text-white mb-1 group-hover:text-[#00FF94] transition-colors line-clamp-1"
                                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                                    >
                                        {associate.nome}
                                    </h3>
                                    <p className="text-xs text-[#00A3FF] font-medium mb-4 uppercase tracking-wider line-clamp-1">{associate.cargo}</p>

                                    {/* Divider */}
                                    <div className="w-12 h-[2px] bg-white/5 rounded-full mb-4" />

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                                        {associate.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View Profile Action */}
                                    <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                                        <span>Ver Perfil</span>
                                        <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                            <Search className="w-8 h-8 text-gray-500" />
                        </div>
                        <p className="text-gray-400">Nenhum especialista encontrado com este filtro.</p>
                    </div>
                )}
            </div>

            {/* --- DETAILS MODAL --- */}
            <AnimatePresence>
                {selectedAssociate && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAssociate(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        {/* Modal Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#0B0E14] border border-[#00FF94]/20 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,255,148,0.1)]"
                        >
                            {/* Header BG */}
                            <div className="h-32 bg-gradient-to-r from-[#00A3FF]/20 to-[#00FF94]/20 relative">
                                <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-10" />
                                <button
                                    onClick={() => setSelectedAssociate(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-8 pb-8 -mt-16 relative">
                                {/* Profile Img */}
                                <div className="flex flex-col md:flex-row gap-6 items-end md:items-end mb-6">
                                    <div className="w-32 h-32 rounded-full p-1 bg-[#0B0E14] relative">
                                        <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-[#0B0E14]">
                                            <Image
                                                src={selectedAssociate.foto}
                                                alt={selectedAssociate.nome}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="absolute bottom-1 right-1 bg-[#00FF94] text-black rounded-full p-1.5 border-4 border-[#0B0E14]" title="Verificado">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="flex-1 pb-2">
                                        <h2 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                            {selectedAssociate.nome}
                                        </h2>
                                        <div className="flex items-center gap-2 text-[#00A3FF] font-medium">
                                            <span>{selectedAssociate.cargo}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-500" />
                                            <span className="text-gray-400 text-sm">{selectedAssociate.nivel}</span>
                                        </div>
                                    </div>

                                    <a
                                        href={selectedAssociate.link_linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mb-2 px-6 py-3 rounded-xl bg-[#0077B5] hover:bg-[#006097] text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg hover:shadow-[#0077B5]/40 hover:-translate-y-1"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        Conectar
                                    </a>
                                </div>

                                {/* Bio & Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-8">
                                    <div className="md:col-span-2 space-y-4">
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sobre o Especialista</h4>
                                        <p className="text-gray-300 leading-relaxed text-lg font-light">
                                            {selectedAssociate.bio_curta}
                                        </p>

                                        <div className="pt-4">
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Áreas de Atuação</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedAssociate.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-[#00FF94]/5 border border-[#00FF94]/20 text-[#00FF94] text-xs font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Localização</h4>
                                            <div className="flex items-center gap-2 text-white">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span>Brasil</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Certificações</h4>
                                            <div className="flex items-center gap-2 text-white opacity-60">
                                                <Award className="w-4 h-4 text-[#F59E0B]" />
                                                <span>ISO 42001 Lead Auditor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
