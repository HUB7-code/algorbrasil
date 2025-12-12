"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ASSOCIATES_DATA = [
    {
        id: 1,
        nome: "Ana Silva",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        cargo: "Especialista em Viés Algorítmico",
        tags: ["Ética", "Técnico"],
        bio_curta: "Pesquisadora sênior com 10 anos de experiência em detecção de viés em modelos de LLM. Autora de 3 livros sobre Ética em IA.",
        link_linkedin: "https://linkedin.com/in/anasilva-fake"
    },
    {
        id: 2,
        nome: "Dr. Roberto Santos",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
        cargo: "Advogado Digital",
        tags: ["Jurídico", "Compliance"],
        bio_curta: "Mestre em Direito Digital pela USP. Consultor jurídico para implementação da ISO 42001 e adequação à LGPD.",
        link_linkedin: "https://linkedin.com/in/roberto-fake"
    },
    {
        id: 3,
        nome: "Carla Mendes",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla",
        cargo: "Gestora de Projetos de IA",
        tags: ["Gestão", "Estratégia"],
        bio_curta: "Líder de transformação digital focada em governança corporativa. Certificada PMP e Scrum Master.",
        link_linkedin: "https://linkedin.com/in/carla-fake"
    },
    {
        id: 4,
        nome: "Lucas Oliveira",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
        cargo: "Engenheiro de ML Ops",
        tags: ["Técnico", "Gestão"],
        bio_curta: "Especialista em pipelines de CI/CD para Machine Learning. Focado em reprodutibilidade e segurança de modelos.",
        link_linkedin: "https://linkedin.com/in/lucas-fake"
    },
    {
        id: 5,
        nome: "Fernanda Costa",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda",
        cargo: "Auditora Líder ISO",
        tags: ["Compliance", "Auditoria"],
        bio_curta: "Auditora líder credenciada para ISO 42001. Experiência em mais de 50 auditorias de sistemas de gestão.",
        link_linkedin: "https://linkedin.com/in/fernanda-fake"
    },
    {
        id: 6,
        nome: "Ricardo Almeida",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo",
        cargo: "Consultor de Segurança IA",
        tags: ["Técnico", "Segurança"],
        bio_curta: "Especialista em Red Teaming para LLMs e segurança defensiva de modelos generativos.",
        link_linkedin: "https://linkedin.com/in/ricardo-fake"
    },
    {
        id: 7,
        nome: "Juliana Ferreira",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
        cargo: "Pesquisadora de Ética",
        tags: ["Ética", "Pesquisa"],
        bio_curta: "Doutora em Filosofia da Tecnologia, focada no impacto social de agentes autônomos.",
        link_linkedin: "https://linkedin.com/in/juliana-fake"
    },
    {
        id: 8,
        nome: "Marcelo Souza",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcelo",
        cargo: "DPO & Legal Tech",
        tags: ["Jurídico", "Privacidade"],
        bio_curta: "Data Protection Officer com foco em intersecção entre LGPD e AI Act Europeu.",
        link_linkedin: "https://linkedin.com/in/marcelo-fake"
    },
    {
        id: 9,
        nome: "Patrícia Lima",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia",
        cargo: "Analista de Riscos de IA",
        tags: ["Gestão", "Compliance"],
        bio_curta: "Especialista em matrizes de risco e frameworks de governança corporativa para GenAI.",
        link_linkedin: "https://linkedin.com/in/patricia-fake"
    },
    {
        id: 10,
        nome: "Eduardo Rocha",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eduardo",
        cargo: "Arquiteto de Soluções",
        tags: ["Técnico", "Estratégia"],
        bio_curta: "Arquiteto de nuvem especializado em infraestrutura escalável para treinamento de modelos.",
        link_linkedin: "https://linkedin.com/in/eduardo-fake"
    },
    {
        id: 11,
        nome: "Camila Torres",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camila",
        cargo: "Diretora de Inovação",
        tags: ["Gestão", "Estratégia"],
        bio_curta: "Executiva com foco em adoção estratégica de IA generativa em grandes corporações.",
        link_linkedin: "https://linkedin.com/in/camila-fake"
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
        <div className="min-h-screen bg-[#050511] text-white pt-24 pb-20 relative overflow-hidden font-sans">

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
                                    <div className="w-24 h-24 mb-4 rounded-full p-1 bg-gradient-to-br from-[#00A3FF] to-[#00FF94] shadow-lg">
                                        <img
                                            src={associate.foto}
                                            alt={associate.nome}
                                            className="w-full h-full rounded-full bg-[#050511] object-cover border-2 border-[#050511]"
                                        />
                                    </div>

                                    {/* Info */}
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00A3FF] transition-colors">{associate.nome}</h3>
                                    <p className="text-sm text-[#00FF94] font-medium mb-3">{associate.cargo}</p>

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
                            className="relative bg-[#1A1C24] border border-white/10 rounded-2xl w-full max-w-lg p-8 shadow-2xl overflow-hidden"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00A3FF]/20 rounded-full blur-[80px]" />

                            <button
                                onClick={() => setSelectedAssociate(null)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-rounded">close</span>
                            </button>

                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-32 h-32 mb-6 rounded-full p-1 bg-gradient-to-br from-[#00A3FF] to-[#00FF94] shadow-xl">
                                    <img
                                        src={selectedAssociate.foto}
                                        alt={selectedAssociate.nome}
                                        className="w-full h-full rounded-full bg-[#050511] object-cover border-4 border-[#050511]"
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
                                        <span>LinkedIn</span>
                                        <span className="material-symbols-rounded text-sm">open_in_new</span>
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
