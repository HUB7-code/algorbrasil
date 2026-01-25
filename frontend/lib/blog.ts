import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// ========================================
// BLOG UTILITIES - Simplified (No MDX Compilation)
// ========================================

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
    slug: string;
    title: string;
    subtitle?: string;
    excerpt: string;
    coverImage: string;
    category: string;
    author: {
        name: string;
        avatar: string;
        role: string;
        bio?: string;
    };
    publishedAt: string;
    updatedAt?: string;
    readTime: string;
    featured?: boolean;
    tags?: string[];
}

export interface BlogPostWithContent extends BlogPost {
    content: string; // Raw markdown content
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(BLOG_CONTENT_DIR)) {
        return [];
    }

    const files = fs.readdirSync(BLOG_CONTENT_DIR);
    return files
        .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
        .map(file => file.replace(/\.(mdx|md)$/, ''));
}

/**
 * Get blog post metadata by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
    try {
        // Try .mdx first, then .md
        let fullPath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);
        }

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Calculate reading time
        const stats = readingTime(content);

        return {
            slug,
            title: data.title,
            subtitle: data.subtitle,
            excerpt: data.excerpt,
            coverImage: data.coverImage,
            category: data.category,
            author: data.author,
            publishedAt: data.publishedAt,
            updatedAt: data.updatedAt,
            readTime: stats.text,
            featured: data.featured || false,
            tags: data.tags || []
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

/**
 * Get all blog posts metadata
 */
export function getAllPosts(): BlogPost[] {
    const slugs = getAllPostSlugs();
    const posts = slugs
        .map(slug => getPostBySlug(slug))
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => {
            // Sort by publishedAt date (newest first)
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });

    return posts;
}

/**
 * Get featured post
 */
export function getFeaturedPost(): BlogPost | null {
    const posts = getAllPosts();
    return posts.find(post => post.featured) || posts[0] || null;
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
    const posts = getAllPosts();
    return posts.filter(post => post.category === category);
}

/**
 * Get related posts (same category, excluding current)
 */
export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
    const currentPost = getPostBySlug(slug);
    if (!currentPost) return [];

    const posts = getAllPosts();
    return posts
        .filter(post =>
            post.slug !== slug &&
            post.category === currentPost.category
        )
        .slice(0, limit);
}

/**
 * Get blog post with raw markdown content
 */
export function getPostWithContent(slug: string): BlogPostWithContent | null {
    try {
        // Try .mdx first, then .md
        let fullPath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);
        }

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content: rawContent } = matter(fileContents);

        // Calculate reading time
        const stats = readingTime(rawContent);

        return {
            slug,
            title: data.title,
            subtitle: data.subtitle,
            excerpt: data.excerpt,
            coverImage: data.coverImage,
            category: data.category,
            author: data.author,
            publishedAt: data.publishedAt,
            updatedAt: data.updatedAt,
            readTime: stats.text,
            featured: data.featured || false,
            tags: data.tags || [],
            content: rawContent // Return raw markdown for now
        };
    } catch (error) {
        console.error(`Error reading content for ${slug}:`, error);
        return null;
    }
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
    const posts = getAllPosts();
    const categories = new Set(posts.map(post => post.category));
    return Array.from(categories).sort();
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}
