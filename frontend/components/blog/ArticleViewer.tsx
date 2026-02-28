'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ArticleViewer({ post, relatedPosts }: { post: any, relatedPosts: any[] }) {
    if (!post) return null;

    return (
        <article className="min-h-screen bg-[#0B0F1E] font-sans text-white pb-24">

            {/* Hero Image & Title */}
            <div className="relative w-full h-[50vh] min-h-[400px] flex items-end">
                <div className="absolute inset-0 z-0">
                    <img
                        src={post.coverImage || '/blog/default-cover.webp'}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-40 mix-blend-screen"
                        onError={(e) => { e.currentTarget.src = '/hero-bg.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1E] via-[#0B0F1E]/80 to-transparent" />
                </div>

                <div className="max-w-4xl mx-auto px-6 w-full relative z-10 pb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" /> Voltar para o Blog
                    </Link>

                    <div className="mb-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider rounded-full border border-blue-500/30 uppercase">
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-3">
                            <img src={post.author.avatar || '/logo-symbol.png'} alt={post.author.name} className="w-8 h-8 rounded-full border border-white/20" />
                            <div>
                                <p className="text-white font-medium">{post.author.name}</p>
                                <p className="text-xs">{post.author.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                            <span>{post.readTime || '5 min de leitura'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">

                {/* Markdown Content */}
                <div className="prose prose-invert prose-blue max-w-none prose-lg
                    prose-headings:font-orbitron prose-headings:text-white
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
                    prose-h3:text-2xl prose-h3:mt-8
                    prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-blue-400 hover:prose-a:text-blue-300
                    prose-strong:text-white prose-strong:font-bold
                    prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal
                    prose-li:text-gray-300 prose-li:mb-2
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-900/10 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-400
                    prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10
                ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Sidebar Sticky (Share + Tags) */}
                <div className="hidden lg:block relative">
                    <div className="sticky top-32">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Compartilhar</h3>
                        <div className="flex gap-4 mb-10">
                            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-colors text-white" aria-label="Compartilhar" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>

                        {post.tags && post.tags.length > 0 && (
                            <>
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag: string) => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
                <div className="max-w-4xl mx-auto px-6 mt-24 pt-12 border-t border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-8">Artigos Relacionados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedPosts.map((rel: any) => (
                            <Link href={`/blog/${rel.slug}`} key={rel.slug} className="group flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all">
                                <div className="h-32 bg-blue-900/20 overflow-hidden relative">
                                    <img src={rel.coverImage || '/blog/default-cover.webp'} alt={rel.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 mix-blend-screen" />
                                </div>
                                <div className="p-4 flex-grow">
                                    <h4 className="font-bold text-white mb-2 group-hover:text-blue-400 line-clamp-2">{rel.title}</h4>
                                    <p className="text-sm text-gray-400 line-clamp-2">{rel.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}
