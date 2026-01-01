'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    Search,
    Sparkles,
    ArrowRight,
    Newspaper,
    Scale,
    ShieldAlert,
    BrainCircuit,
    Cpu,
    Lock,
    ChevronRight
} from 'lucide-react';

// ========================================
// KNOWLEDGE HUB - Power BI Premium Dark Mode
// ========================================

const newsTicker = [
    "PL 2338/23 avança na Comissão de Juristas com novas diretrizes para IA de Alto Risco.",
    "União Europeia oficializa o AI Act: O que muda para empresas brasileiras?",
    "ANPD lança consulta pública sobre Sandbox Regulatório de Inteligência Artificial.",
    "Relatório: 85% das empresas Fortune 500 já utilizam IA Generativa sem governança clara."
];

const glossaryTerms = [
    {
        term: "Alucinação (Hallucination)",
        def: "Fenômeno onde um LLM gera informações factualmente incorretas ou sem sentido, apresentando-as com alta confiança.",
        category: "Risco Técnico"
    },
    {
        term: "Data Poisoning",
        def: "Ataque adversarial onde dados maliciosos são injetados no conjunto de treinamento para comprometer o comportamento do modelo.",
        category: "Segurança"
    },
    {
        term: "FIA (Avaliação de Impacto)",
        def: "Documento exigido pelo PL 2338 para sistemas de alto risco, detalhando medidas de mitigação e governança.",
        category: "Regulatório"
    },
    {
        term: "Shadow AI",
        def: "Uso não autorizado ou não monitorado de ferramentas de IA por funcionários dentro da organização.",
        category: "Governança"
    },
    {
        term: "Model Drift",
        def: "Degradação da performance de um modelo de IA ao longo do tempo devido a mudanças nos dados do mundo real.",
        category: "MLOps"
    },
    {
        term: "Explainability (XAI)",
        def: "Capacidade de compreender e interpretar como um modelo de IA chegou a uma determinada decisão ou previsão.",
        category: "Ética"
    }
];

export default function KnowledgeHubPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTerms = glossaryTerms.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.def.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white selection:bg-[#00FF94] selection:text-[#0A0E1A] overflow-x-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative w-full pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto text-center z-10">
                {/* Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#00A3FF]/10 via-[#00FF94]/5 to-transparent blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94] text-[10px] font-mono tracking-[0.2em] mb-6">
                        <BookOpen className="w-3 h-3" />
                        KNOWLEDGE HUB
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-medium mb-6 leading-tight">
                        A Inteligência da <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00FF94]">
                            Governança de IA
                        </span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Domine o vocabulário, as leis e os riscos da Era da Inteligência Artificial.
                        Conteúdo curado para líderes, consultores e especialistas.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    className="mt-10 max-w-xl mx-auto relative group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF] to-[#00FF94] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative flex items-center bg-[#0A0E1A] border border-white/10 rounded-full px-6 py-4 shadow-2xl">
                        <Search className="w-5 h-5 text-gray-400 mr-4" />
                        <input
                            type="text"
                            placeholder="Pesquise por termos (ex: Alucinação, PL 2338)..."
                            className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 font-light"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </motion.div>
            </section>

            {/* 2. NEWS TICKER */}
            <div className="w-full bg-white/[0.02] border-y border-white/5 py-3 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#00FF94] text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                        <Newspaper className="w-4 h-4" />
                        Radar ALGOR:
                    </div>
                    <div className="relative flex-1 overflow-hidden h-6 mask-ticker">
                        <motion.div
                            className="flex gap-12 absolute whitespace-nowrap text-sm text-gray-400"
                            animate={{ x: [0, -1000] }}
                            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        >
                            {newsTicker.map((news, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]" />
                                    {news}
                                </span>
                            ))}
                            {/* Duplicado para loop infinito suave */}
                            {newsTicker.map((news, i) => (
                                <span key={`dup-${i}`} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]" />
                                    {news}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 3. GLOSSARY SECTION */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-display">Glossário de Governança</h2>
                    <span className="text-xs text-gray-500 font-mono">LIVE UPDATED</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredTerms.map((term, idx) => (
                            <motion.div
                                key={term.term}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-default"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`
                    p-2 rounded-lg bg-opacity-10 
                    ${term.category === 'Risco Técnico' ? 'bg-red-500/10 text-red-400' :
                                            term.category === 'Segurança' ? 'bg-orange-500/10 text-orange-400' :
                                                'bg-[#00FF94]/10 text-[#00FF94]'}
                  `}>
                                        {term.category === 'Risco Técnico' && <BrainCircuit className="w-5 h-5" />}
                                        {term.category === 'Segurança' && <ShieldAlert className="w-5 h-5" />}
                                        {term.category === 'Regulatório' && <Scale className="w-5 h-5" />}
                                        {term.category === 'Governança' && <Lock className="w-5 h-5" />}
                                        {term.category === 'MLOps' && <Cpu className="w-5 h-5" />}
                                    </div>
                                    <span className="px-2 py-1 rounded text-[10px] font-mono uppercase bg-white/5 text-gray-400 border border-white/5">
                                        {term.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00FF94] transition-colors">
                                    {term.term}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {term.def}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredTerms.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <Search className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                        <p>Nenhum termo encontrado para "{searchTerm}"</p>
                    </div>
                )}
            </section>

            {/* 4. CTA SECTION (The Hook) */}
            <section className="relative w-full py-24 mb-20 border-y border-white/5 bg-gradient-to-b from-[#0A0E1A] to-[#131825]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-display mb-6">
                        Quer transformar conhecimento em <br />
                        <span className="text-[#00A3FF]">Carreira?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Este é apenas o começo. Junte-se à Associação ALGOR Brasil para ter acesso a cursos avançados, ferramentas oficiais e certificação.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register?role=student"
                            className="group relative px-8 py-4 bg-[#00FF94] text-[#0A0E1A] font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,148,0.3)]"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-2">
                                Criar Conta Gratuita
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </Link>

                        <Link
                            href="/register"
                            className="px-8 py-4 text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors font-medium"
                        >
                            Ver Planos de Associação
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
