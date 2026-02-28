'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogClientProps {
    featuredPost: BlogPost | null;
    posts: BlogPost[];
    categories: string[];
}

export default function BlogClient({ featuredPost, posts, categories }: BlogClientProps) {
    return (
        <main className="min-h-screen bg-[#0B0F1E] pt-28 pb-24 font-sans text-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-6 font-orbitron tracking-wide">
                        ALGOR Insights
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Análises profundas, guias práticos e o melhor conteúdo sobre Governança de Inteligência Artificial, Risco e Compliance no Brasil e no mundo.
                    </p>
                </div>

                {/* Featured Post */}
                {featuredPost && (
                    <div className="mb-20 relative group">
                        <Link href={`/blog/${featuredPost.slug}`}>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-all flex flex-col md:flex-row shadow-2xl">
                                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider rounded-full border border-blue-500/30 uppercase">
                                            {featuredPost.category}
                                        </span>
                                        <span className="text-gray-500 text-sm flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(featuredPost.publishedAt).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-gray-400 text-lg mb-8 line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-10 h-10 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center overflow-hidden">
                                            <img src={featuredPost.author.avatar || '/logo-symbol.png'} alt="Author" className="w-6 h-6 object-contain" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{featuredPost.author.name}</p>
                                            <p className="text-xs text-gray-500">{featuredPost.author.role}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 min-h-[300px] md:min-h-full bg-gradient-to-br from-blue-900/30 to-black relative">
                                    <img
                                        src={featuredPost.coverImage || '/blog/default-cover.webp'}
                                        alt={featuredPost.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 mix-blend-screen"
                                        onError={(e) => { e.currentTarget.src = '/og-governance.jpg'; e.currentTarget.className = "absolute inset-0 w-full h-full object-cover opacity-30" }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1E] via-transparent to-transparent md:bg-gradient-to-l" />
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Categories */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-12 border-b border-white/10 pb-6">
                        {categories.map((cat, idx) => (
                            <button key={idx} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all shadow-xl hover:-translate-y-1">
                            <div className="h-48 relative overflow-hidden bg-blue-900/20">
                                <img
                                    src={post.coverImage || '/blog/default-cover.webp'}
                                    alt={post.title}
                                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 mix-blend-screen"
                                    onError={(e) => { e.currentTarget.src = '/og-governance.jpg'; e.currentTarget.className = "w-full h-full object-cover opacity-20" }}
                                />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-300">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                        Ler Artigo <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && !featuredPost && (
                    <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
                        <p className="text-gray-400 text-lg">Nenhum artigo publicado ainda. Volte me breve!</p>
                    </div>
                )}
            </div>
        </main>
    );
}
