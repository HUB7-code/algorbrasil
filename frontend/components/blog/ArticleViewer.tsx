"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ShareButtons from '@/components/blog/ShareButtons';
import { BlogPostWithContent } from '@/lib/blog';

// Utility para formatar data sem importar lib server-side
function formatDateClient(dateString: string): string {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    } catch {
        return dateString;
    }
}

interface ArticleViewerProps {
    post: BlogPostWithContent;
    relatedPosts: any[]; // Simplificando tipagem para evitar conflito de import profundo
}

export default function ArticleViewer({ post, relatedPosts }: ArticleViewerProps) {
    if (!post) return null;

    return (
        <div className="min-h-screen bg-[#050A10] text-white selection:bg-[#00FF94] selection:text-black">

            {/* BACK NAVIGATION */}
            <div className="fixed top-32 left-6 z-50 hidden lg:block">
                <Link href="/blog">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00FF94]/30 text-gray-400 hover:text-white transition-all backdrop-blur-sm">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Voltar</span>
                    </button>
                </Link>
            </div>

            {/* SHARE SIDEBAR */}
            <ShareButtons />

            {/* ARTICLE HEADER */}
            <article className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/blog" className="hover:text-[#00FF94] transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-[#00FF94]">{post.category}</span>
                    </div>

                    {/* Category Badge */}
                    <div className="inline-block mb-6">
                        <span className="px-4 py-2 rounded-lg bg-[#00FF94]/10 border border-[#00FF94]/30 text-[#00FF94] text-xs font-bold uppercase tracking-wider">
                            {post.category}
                        </span>
                    </div>

                    {/* Title - Editorial Typography */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold leading-[1.1] mb-6 tracking-tight">
                        {post.title}
                    </h1>

                    {/* Subtitle */}
                    {post.subtitle && (
                        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8 font-light">
                            {post.subtitle}
                        </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#00FF94]/30">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={56}
                                    height={56}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white font-semibold">{post.author.name}</p>
                                <p className="text-gray-500 text-sm">{post.author.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-gray-500 text-sm ml-auto">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDateClient(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-[#0A1A2F] via-[#00FF94]/10 to-[#00A3FF]/10">
                        <Image
                            src={post.coverImage || "/images/grid-pattern.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050A10] to-transparent opacity-60" />
                    </div>

                    {/* Article Content - React Markdown */}
                    <div className="prose-algor">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // Custom components for better styling
                                p: ({ node, ...props }) => <p {...props} />,
                                h2: ({ node, ...props }) => <h2 {...props} />,
                                h3: ({ node, ...props }) => <h3 {...props} />,
                                strong: ({ node, ...props }) => <strong {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote {...props} />,
                                ul: ({ node, ...props }) => <ul {...props} />,
                                ol: ({ node, ...props }) => <ol {...props} />,
                                li: ({ node, ...props }) => <li {...props} />,
                                table: ({ node, ...props }) => <table {...props} />,
                                th: ({ node, ...props }) => <th {...props} />,
                                td: ({ node, ...props }) => <td {...props} />,
                                code: ({ node, inline, ...props }) =>
                                    inline ? <code {...props} /> : <code {...props} />,
                                a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm hover:border-[#00FF94]/30 hover:text-[#00FF94] transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author Bio */}
                    {post.author.bio && (
                        <div className="mt-16 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                            <div className="flex gap-6">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#00FF94]/30 flex-shrink-0">
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sobre o Autor</p>
                                    <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                                    <p className="text-gray-400 leading-relaxed">{post.author.bio}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </article>

            {/* RELATED ARTICLES */}
            {relatedPosts.length > 0 && (
                <section className="py-20 border-t border-white/10 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-orbitron font-bold mb-12">Leia Também</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedPosts.map((article) => (
                                <Link key={article.slug} href={`/blog/${article.slug}`}>
                                    <div className="group p-6 rounded-2xl bg-[#0A111A]/50 border border-white/10 hover:border-[#00FF94]/30 transition-all hover:-translate-y-1">
                                        <span className="text-[#00FF94] text-xs font-bold uppercase tracking-wider">{article.category}</span>
                                        <h3 className="text-xl font-bold mt-3 mb-2 group-hover:text-[#00FF94] transition-colors">{article.title}</h3>
                                        <p className="text-gray-500 text-sm">{article.readTime}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Custom Styles for Article Content */}
            <style jsx global>{`
                .prose-algor {
                    color: #e5e7eb;
                    font-size: 1.125rem;
                    line-height: 1.8;
                    font-weight: 300;
                }

                .prose-algor .lead {
                    font-size: 1.375rem;
                    line-height: 1.7;
                    color: #d1d5db;
                    margin-bottom: 2rem;
                    font-weight: 400;
                }

                .prose-algor p {
                    margin-bottom: 1.5rem;
                }

                .prose-algor h2 {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                }

                .prose-algor h3 {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #ffffff;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                }

                .prose-algor strong {
                    color: #00FF94;
                    font-weight: 600;
                }

                .prose-algor ul, .prose-algor ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }

                .prose-algor li {
                    margin-bottom: 0.75rem;
                    padding-left: 0.5rem;
                }

                .prose-algor ul li::marker {
                    color: #00FF94;
                }

                .prose-algor ol li::marker {
                    color: #00A3FF;
                    font-weight: 600;
                }

                .prose-algor blockquote {
                    border-left: 4px solid #00FF94;
                    padding-left: 1.5rem;
                    margin: 2rem 0;
                    font-style: italic;
                    color: #d1d5db;
                    background: rgba(0, 255, 148, 0.05);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                }

                .prose-algor blockquote p {
                    margin-bottom: 0.5rem;
                }

                .prose-algor table {
                    width: 100%;
                    margin: 2rem 0;
                    border-collapse: collapse;
                    font-size: 0.9rem;
                }

                .prose-algor th {
                    background: rgba(0, 255, 148, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1rem;
                    text-align: left;
                    font-weight: 600;
                    color: #00FF94;
                }

                .prose-algor td {
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1rem;
                }

                .prose-algor a {
                    color: #00A3FF;
                    text-decoration: underline;
                    transition: color 0.2s;
                }

                .prose-algor a:hover {
                    color: #00FF94;
                }

                .prose-algor code {
                    font-family: 'Fira Code', 'Courier New', monospace;
                    font-size: 0.9em;
                    background: rgba(0, 255, 148, 0.1);
                    color: #00FF94;
                    padding: 0.2em 0.4em;
                    border-radius: 0.25rem;
                    font-weight: 500;
                }

                .prose-algor pre {
                    background: rgba(10, 17, 26, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.75rem;
                    padding: 1.5rem;
                    overflow-x: auto;
                    margin: 2rem 0;
                }

                .prose-algor pre code {
                    background: none;
                    padding: 0;
                }
            `}</style>
        </div>
    );
}
