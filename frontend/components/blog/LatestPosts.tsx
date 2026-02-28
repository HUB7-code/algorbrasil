'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

export default function LatestPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                // Fetch from the API
                const res = await fetch('/api/blog/articles');
                if (res.ok) {
                    const data = await res.json();
                    if (data.articles) {
                        setPosts(data.articles.slice(0, 3)); // Only get top 3 latest
                    }
                }
            } catch (error) {
                console.error("Failed to load latest posts", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading || posts.length === 0) return null;

    return (
        <section className="py-24 bg-[#0B0F1E] relative border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-[#4F7EFF]/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-sm font-bold tracking-widest text-[#4F7EFF] uppercase mb-4">ALGOR Insights</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-white font-orbitron">
                            Últimos Artigos
                        </h3>
                    </div>
                    <Link
                        href="/blog"
                        className="px-6 py-2 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 group w-fit"
                    >
                        Ver todos os artigos
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

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
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h4>
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
            </div>
        </section>
    );
}
