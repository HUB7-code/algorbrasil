import React from 'react';
import { getAllPosts, getFeaturedPost, getAllCategories } from '@/lib/blog';
import BlogClient from '@/components/blog/BlogClient';

// ========================================
// BLOG PAGE - Server Component (Data Loader)
// ========================================

export const metadata = {
    title: 'ALGOR Insights | Blog de Governança de IA',
    description: 'Conteúdo técnico e estratégico sobre Governança de IA, Compliance e o futuro da regulação algorítmica no Brasil.',
};

export default function BlogPage() {
    // Load data on server
    const featuredPost = getFeaturedPost();
    const allPosts = getAllPosts();
    const categories = ['Todos', ...getAllCategories()];

    // Filter out featured post from regular grid
    const regularPosts = allPosts.filter(post => post.slug !== featuredPost?.slug);

    // Pass data to client component
    return (
        <BlogClient
            featuredPost={featuredPost}
            posts={regularPosts}
            categories={categories}
        />
    );
}
