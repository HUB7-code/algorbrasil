import React from 'react';
import { getPostWithContent, getRelatedPosts, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ArticleViewer from '@/components/blog/ArticleViewer';

// ========================================
// ARTICLE PAGE - Server Component
// ========================================

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPostWithContent(params.slug);

    if (!post) {
        return {
            title: 'Artigo não encontrado | ALGOR Brasil'
        };
    }

    return {
        title: `${post.title} | ALGOR Insights`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            images: [post.coverImage]
        }
    };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
    const post = getPostWithContent(params.slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(params.slug, 3);

    // Pass data to Client Component for rendering (styled-jsx support)
    return <ArticleViewer post={post} relatedPosts={relatedPosts} />;
}

