"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, X } from 'lucide-react';

const ASSOCIATES_DATA = [
    {
        id: 1,
        nome: "Paulo Carvalho",
        foto: "/images/membro_01_paulo_carvalho.webp",
        cargo: "Presidente ALGOR BRASIL",
        tags: ["Presidência", "Estratégia"],
        bio_curta: "Liderança executiva na condução da estratégia nacional de Governança de IA.",
        link_linkedin: "https://www.linkedin.com/in/paulocarvalho11/"
    },
    {
        id: 2,
        nome: "Orlando Pavani",
        foto: "/images/membro_02_orlando_pavani.webp",
        cargo: "Coordenador Nacional",
        tags: ["Coordenação", "Gestão"],
        bio_curta: "Coordenação de iniciativas nacionais e integração dos núcleos regionais.",
        link_linkedin: "https://www.linkedin.com/in/orlandopavani/"
    },
    {
        id: 3,
        nome: "Jesus Silva",
        foto: "/images/membro_03_jesus_silva.webp",
        cargo: "Gestor Regional - Brasília",
        tags: ["Regional", "Brasília"],
        bio_curta: "Gestão estratégica do núcleo ALGOR no Distrito Federal.",
        link_linkedin: "#"
    },
    {
        id: 4,
        nome: "Gervásio Albuquerque",
        foto: "/images/membro_04_gervasio_albuquerque.png",
        cargo: "Delegado Regional - DF",
        tags: ["Regional", "Representação"],
        bio_curta: "Representação institucional e articulação no Distrito Federal.",
        link_linkedin: "#"
    },
    {
        id: 5,
        nome: "Carlos Coan",
        foto: "/images/membro_05_carlos_coan.webp",
        cargo: "Gestor Regional - São Paulo",
        tags: ["Regional", "São Paulo"],
        bio_curta: "Liderança das iniciativas de governança no estado de São Paulo.",
        link_linkedin: "https://www.linkedin.com/in/carloscoan/"
    },
    {
        id: 6,
        nome: "Evaldo Reinas",
        foto: "/images/membro_06_evaldo_reinas.webp",
        cargo: "Gestor Regional - Paraná",
        tags: ["Regional", "Paraná"],
        bio_curta: "Gestão e fomento da cultura de IA responsável no Paraná.",
        link_linkedin: "https://www.linkedin.com/in/evaldo-reinas-2-54aa37153/"
    },
    {
        id: 7,
        nome: "Fabio Ban",
        foto: "/images/membro_07_fabio_ban.webp",
        cargo: "Delegado Regional - Paraná",
        tags: ["Regional", "Representação"],
        bio_curta: "Atuação como delegado regional para expansão da ALGOR no PR.",
        link_linkedin: "https://www.linkedin.com/in/fabioban/"
    },
    {
        id: 8,
        nome: "José Ricardo",
        foto: "/images/membro_08_jose_ricardo.webp",
        cargo: "Gestor Regional - Rio de Janeiro",
        tags: ["Regional", "Rio de Janeiro"],
        bio_curta: "Liderança executiva do núcleo regional do Rio de Janeiro.",
        link_linkedin: "#"
    },
    {
        id: 9,
        nome: "Jarison Melo",
        foto: "/images/membro_09_jarison_melo.webp",
        cargo: "Gestor Regional - Ceará",
        tags: ["Regional", "Ceará"],
        bio_curta: "Gestão das atividades e membros da ALGOR no estado do Ceará.",
        link_linkedin: "https://www.linkedin.com/in/jarisonmelo-ai-governance/"
    },
    {
        id: 10,
        nome: "Marci Dantas",
        foto: "/images/membro_10_marci_dantas.webp",
        cargo: "Delegada Regional - Fortaleza CE",
        tags: ["Regional", "Ceará"],
        bio_curta: "Representação e liderança delegada na capital cearense.",
        link_linkedin: "https://www.linkedin.com/in/marcidantas-ia-governanca/"
    },
    {
        id: 11,
        nome: "Edísio Nascimento",
        foto: "/images/membro_11_edisio_nascimento.webp",
        cargo: "Gestor Regional - Paraíba",
        tags: ["Regional", "Paraíba"],
        bio_curta: "Fomento à governança de IA e gestão do núcleo Paraíba.",
        link_linkedin: "https://www.linkedin.com/in/edisio-consultor/"
    }
];

const FILTERS = ["Todos", "Jurídico", "Técnico", "Ética", "Gestão", "Compliance"];

export default function AssociatesGalleryPage() {
    const [filter, setFilter] = useState("Todos");
    const [selectedAssociate, setSelectedAssociate] = useState<typeof ASSOCIATES_DATA[0] | null>(null);

    // Filter Logic
    const filteredData = filter === "Todos"
        ? ASSOCIATES_DATA
        : ASSOCIATES_DATA.filter(item => item.tags.includes(filter));

    return (
        <div className="min-h-screen bg-[#050511] text-white pt-52 pb-20 relative overflow-hidden font-sans">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00A3FF]/10 to-transparent pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Nossos Associados
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Conheça a elite da governança de Inteligência Artificial no Brasil.
                        Consultores, auditores e especialistas técnicos prontos para atuar.
                    </p>
                </div>

                {/* --- FILTER BUTTONS --- */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-sm
                                ${filter === f
                                    ? 'bg-[#00A3FF] text-white border-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.4)]'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* --- GALLERY GRID --- */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filteredData.map((associate) => (
                            <motion.div
                                key={associate.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setSelectedAssociate(associate)}
                                className="group relative rounded-2xl p-1 cursor-pointer"
                            >
                                {/* Glassmorphism Card */}
                                <div className="h-full bg-[#12141C]/80 backdrop-blur-xl border border-white/5 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 group-hover:border-[#00A3FF]/50 group-hover:shadow-[0_0_30px_rgba(0,163,255,0.15)] group-hover:-translate-y-1">

                                    {/* Avatar */}
                                    {/* Avatar */}
                                    <div className="w-24 h-24 mb-4 rounded-full p-[3px] bg-gradient-to-br from-[#00A3FF] to-[#00FF94] shadow-lg relative">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-[#050511] relative">
                                            <Image
                                                src={associate.foto}
                                                alt={associate.nome}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00A3FF] transition-colors">{associate.nome}</h3>
                                    <p className="text-sm text-[#00FF94] font-medium mb-3">{associate.cargo}</p>

                                    {/* Social Link on Card */}
                                    <div className="mb-4">
                                        <a
                                            href={associate.link_linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-[#0077B5] text-gray-400 hover:text-white transition-all border border-white/5 hover:border-transparent"
                                            title="LinkedIn Profile"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                                        {associate.tags.map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        Nenhum associado encontrado com este filtro.
                    </div>
                )}
            </div>

            {/* --- MODAL (BACKDROP BLUR) --- */}
            <AnimatePresence>
                {selectedAssociate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAssociate(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            className="relative bg-[#0A1A2F] border border-[#00FF94]/20 rounded-2xl w-full max-w-lg p-8 shadow-2xl overflow-hidden glass-panel"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00A3FF]/20 rounded-full blur-[80px]" />

                            <button
                                onClick={() => setSelectedAssociate(null)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-32 h-32 mb-6 rounded-full p-1 bg-gradient-to-br from-[#00A3FF] to-[#00FF94] shadow-xl relative">
                                    <Image
                                        src={selectedAssociate.foto}
                                        alt={selectedAssociate.nome}
                                        width={128}
                                        height={128}
                                        className="rounded-full bg-[#050511] object-cover border-4 border-[#050511]"
                                    />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedAssociate.nome}</h2>
                                <p className="text-[#00FF94] font-medium text-lg mb-6">{selectedAssociate.cargo}</p>

                                <p className="text-gray-300 leading-relaxed mb-8">
                                    {selectedAssociate.bio_curta}
                                </p>

                                <div className="flex gap-4">
                                    <a
                                        href={selectedAssociate.link_linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-3 rounded-xl bg-[#0077B5] hover:bg-[#006097] text-white font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-[#0077B5]/40"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                        <span>LinkedIn</span>
                                    </a>
                                    <button className="px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors">
                                        Ver Perfil Completo
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
