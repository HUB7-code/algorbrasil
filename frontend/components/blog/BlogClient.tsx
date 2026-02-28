'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, BookOpen, Search, Rss, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';

interface BlogClientProps {
    featuredPost: BlogPost | null;
    posts: BlogPost[];
    categories: string[];
}

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const stagger = { animate: { transition: { staggerChildren: 0.12 } } };

function PostCard({ post, index }: { post: BlogPost; index: number }) {
    return (
        <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: index * 0.07 }}>
            <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full relative">
                {/* Glow hover efx */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/0 to-cyan-400/0 group-hover:from-blue-500/20 group-hover:to-cyan-400/10 transition-all duration-500 blur-sm" />

                <div className="relative flex flex-col h-full bg-white/[0.03] border border-white/[0.07] group-hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-12px_rgba(79,126,255,0.25)]">
                    {/* Cover */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-950/50 to-slate-900 flex-shrink-0">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mix-blend-screen"
                            onError={(e) => { e.currentTarget.src = '/og-governance.jpg'; }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        {/* Category pill */}
                        <div className="absolute top-4 left-4">
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest uppercase text-blue-300">
                                <Tag className="w-2.5 h-2.5" />
                                {post.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-base font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/[0.06]">
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1 text-blue-500 text-xs font-semibold group-hover:gap-2 transition-all">
                                Ler artigo <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function BlogClient({ featuredPost, posts, categories }: BlogClientProps) {
    const [activeCategory, setActiveCategory] = useState('Todos');

    const filteredPosts = activeCategory === 'Todos'
        ? posts
        : posts.filter(p => p.category === activeCategory);

    return (
        <main className="min-h-screen bg-[#0B0F1E] font-sans text-white">

            {/* ── HERO ── */}
            <section className="relative pt-36 pb-20 overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
                <div className="absolute top-10 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px] pointer-events-none" />

                {/* Grid BG */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'linear-gradient(rgba(79,126,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(79,126,255,.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
                />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div {...fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-widest uppercase mb-8">
                        <Rss className="w-3.5 h-3.5" />
                        ALGOR Insights
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                            Conhecimento
                        </span>
                        <br />
                        <span className="text-white">Estratégico em IA</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Análises profundas, guias práticos e o melhor conteúdo sobre Governança de IA, Compliance e Regulação no Brasil.
                    </motion.p>
                </div>
            </section>

            {/* ── FEATURED POST ── */}
            {featuredPost && (
                <section className="max-w-7xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link href={`/blog/${featuredPost.slug}`} className="group relative block">
                            {/* outer glow */}
                            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/30 via-transparent to-cyan-500/30 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700" />

                            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/[0.04] border border-white/10 group-hover:border-blue-500/30 rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl group-hover:shadow-[0_32px_80px_-16px_rgba(79,126,255,0.3)]">

                                {/* Left: Content */}
                                <div className="p-10 md:p-14 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-black tracking-widest uppercase">
                                            ★ Destaque
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold tracking-widest uppercase">
                                            {featuredPost.category}
                                        </span>
                                    </div>

                                    <h2 className="font-orbitron text-3xl md:text-4xl font-black text-white mb-5 leading-tight group-hover:text-blue-200 transition-colors">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-gray-400 text-base leading-relaxed mb-8 line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={featuredPost.author?.avatar || '/logo-email.png'}
                                                alt={featuredPost.author?.name}
                                                className="w-9 h-9 rounded-full border border-white/20 object-contain bg-blue-900/40 p-1"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-white">{featuredPost.author?.name}</p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(featuredPost.publishedAt).toLocaleDateString('pt-BR')}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                                            Ler artigo <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Cover Image */}
                                <div className="relative min-h-[340px] lg:min-h-auto overflow-hidden bg-gradient-to-br from-blue-950 to-slate-900">
                                    <img
                                        src={featuredPost.coverImage}
                                        alt={featuredPost.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 mix-blend-screen"
                                        onError={(e) => { e.currentTarget.src = '/og-governance.jpg'; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1E] via-transparent to-transparent lg:bg-gradient-to-r" />

                                    {/* Reading time badge */}
                                    <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-xs font-semibold text-gray-300">
                                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                                        {featuredPost.readTime || '5 min'}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </section>
            )}

            {/* ── CATEGORIES FILTER ── */}
            {categories.length > 1 && (
                <section className="max-w-7xl mx-auto px-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-6"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-blue-600 text-white shadow-[0_0_24px_rgba(79,126,255,0.5)]'
                                    : 'bg-white/[0.05] text-gray-500 border border-white/[0.07] hover:bg-white/[0.10] hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </section>
            )}

            {/* ── POSTS GRID ── */}
            <section className="max-w-7xl mx-auto px-6 pb-28">
                {filteredPosts.length > 0 ? (
                    <motion.div
                        variants={stagger}
                        initial="initial"
                        animate="animate"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredPosts.map((post, i) => (
                            <PostCard key={post.slug} post={post} index={i} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="py-24 text-center border border-white/[0.06] rounded-2xl bg-white/[0.02]">
                        <BookOpen className="w-12 h-12 text-blue-500/30 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Nenhum artigo nesta categoria ainda.</p>
                        <button onClick={() => setActiveCategory('Todos')} className="mt-6 text-blue-400 text-sm hover:text-blue-300 transition-colors">
                            Ver todos os artigos →
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
