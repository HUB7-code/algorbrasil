"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen, TrendingUp } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

// ========================================
// BLOG CLIENT - Framer Motion UI
// ========================================

interface BlogClientProps {
    featuredPost: BlogPost | null;
    posts: BlogPost[];
    categories: string[];
}

// Helper function to format date
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

export default function BlogClient({ featuredPost, posts, categories }: BlogClientProps) {
    return (
        <div className="min-h-screen bg-[#050A10] text-white selection:bg-[#00FF94] selection:text-black">

            {/* HERO SECTION - Editorial Style */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Ambient Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00A3FF]/5 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-[#00FF94]" />
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em]">Insights & Análises</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 tracking-tight">
                            ALGOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">Insights</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
                            Conteúdo técnico e estratégico sobre Governança de IA, Compliance e o futuro da regulação algorítmica no Brasil.
                        </p>
                    </motion.div>

                    {/* Featured Article - Magazine Style */}
                    {featuredPost && (
                        <motion.article
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="group relative"
                        >
                            <Link href={`/blog/${featuredPost.slug}`}>
                                <div className="relative rounded-3xl overflow-hidden bg-[#0A111A] border border-white/10 hover:border-[#00FF94]/30 transition-all duration-500">

                                    {/* Featured Badge */}
                                    <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF94] text-black text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,148,0.4)]">
                                        <TrendingUp className="w-4 h-4" />
                                        Destaque
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-0">
                                        {/* Image Side */}
                                        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF94]/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 z-10" />

                                            {/* Placeholder for cover image */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-[#00FF94]/10 to-[#00A3FF]/10" />

                                            {/* Scanline Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF94]/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 z-10" />
                                        </div>

                                        {/* Content Side */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            {/* Category & Meta */}
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="px-3 py-1 rounded-lg bg-[#00FF94]/10 border border-[#00FF94]/30 text-[#00FF94] text-xs font-bold uppercase tracking-wider">
                                                    {featuredPost.category}
                                                </span>
                                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{featuredPost.readTime}</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 leading-tight group-hover:text-[#00FF94] transition-colors">
                                                {featuredPost.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
                                                {featuredPost.excerpt}
                                            </p>

                                            {/* Author & CTA */}
                                            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00FF94]/30">
                                                        <Image
                                                            src={featuredPost.author.avatar}
                                                            alt={featuredPost.author.name}
                                                            width={48}
                                                            height={48}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-semibold text-sm">{featuredPost.author.name}</p>
                                                        <p className="text-gray-500 text-xs">{featuredPost.author.role}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-[#00FF94] text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                                                    Ler Artigo
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    )}
                </div>
            </section>

            {/* CATEGORY FILTER */}
            <section className="px-6 py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm sticky top-24 z-40">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        <BookOpen className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                href={cat === 'Todos' ? '/blog' : `/blog/category/${cat.toLowerCase()}`}
                                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex-shrink-0 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ARTICLES GRID - Bento Layout */}
            <section className="px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        layout
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {posts.map((post, idx) => (
                            <motion.article
                                key={post.slug}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="h-full bg-[#0A111A]/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#00FF94]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,255,148,0.1)]">

                                        {/* Cover Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-[#00A3FF]/10 to-[#8B5CF6]/10" />
                                            <div className="absolute inset-0 bg-[#00FF94]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Meta */}
                                            <div className="flex items-center gap-4 mb-4 text-gray-500 text-xs">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{formatDate(post.publishedAt)}</span>
                                                </div>
                                                <span>•</span>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-orbitron font-bold mb-3 leading-tight group-hover:text-[#00FF94] transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                                                {post.excerpt}
                                            </p>

                                            {/* Author */}
                                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                                    <Image
                                                        src={post.author.avatar}
                                                        alt={post.author.name}
                                                        width={32}
                                                        height={32}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-gray-400 text-xs font-medium">{post.author.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </motion.div>

                    {/* Empty State */}
                    {posts.length === 0 && (
                        <div className="text-center py-20">
                            <div className="inline-block p-6 rounded-full bg-white/5 mb-6">
                                <BookOpen className="w-12 h-12 text-gray-500" />
                            </div>
                            <p className="text-gray-400 text-lg">Nenhum artigo publicado ainda.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* NEWSLETTER CTA */}
            <section className="px-6 py-20 border-t border-white/10">
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A1A2F] to-[#050A10] border border-[#00FF94]/30 p-12 text-center">
                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-[#00FF94]/5 blur-3xl" />

                        <div className="relative z-10">
                            <div className="inline-block p-4 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30 mb-6">
                                <Sparkles className="w-8 h-8 text-[#00FF94]" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                                Receba Insights Exclusivos
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto font-light">
                                Análises técnicas, atualizações regulatórias e cases de governança de IA direto no seu e-mail. Sem spam, apenas conteúdo de valor.
                            </p>

                            <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                                <input
                                    type="email"
                                    placeholder="seu.email@empresa.com.br"
                                    className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FF94]/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 rounded-xl bg-[#00FF94] text-black font-bold uppercase tracking-wider hover:bg-[#00FF94]/90 transition-all shadow-[0_0_30px_rgba(0,255,148,0.3)] hover:shadow-[0_0_40px_rgba(0,255,148,0.5)]"
                                >
                                    Inscrever
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
