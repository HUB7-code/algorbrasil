import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ========================================
// API: Create Blog Article
// ========================================

export async function POST(request: NextRequest) {
    try {
        // ========================================
        // AUTHENTICATION CHECK
        // ========================================
        const { requireMember } = await import('@/lib/auth');

        let user;
        try {
            user = await requireMember();
        } catch (error) {
            return NextResponse.json(
                { error: 'Acesso restrito a Membros Associados. Faça login para continuar.' },
                { status: 401 }
            );
        }

        // ========================================
        // ARTICLE CREATION
        // ========================================
        const body = await request.json();
        const { title, content, category, tags, coverImage, author } = body;

        // Validate required fields
        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens
            .trim();

        // Create frontmatter
        const frontmatter = {
            title,
            excerpt: content.substring(0, 200) + '...',
            coverImage: coverImage || '/blog/default-cover.webp',
            category,
            author: author || {
                name: 'ALGOR Brasil',
                avatar: '/logo-algor.webp',
                role: 'Equipe Editorial'
            },
            publishedAt: new Date().toISOString().split('T')[0],
            featured: false,
            tags: tags || []
        };

        // Create MDX content
        const mdxContent = matter.stringify(content, frontmatter);

        // Save to file system
        const contentDir = path.join(process.cwd(), 'content', 'blog');

        // Ensure directory exists
        if (!fs.existsSync(contentDir)) {
            fs.mkdirSync(contentDir, { recursive: true });
        }

        const filePath = path.join(contentDir, `${slug}.mdx`);

        // Check if file already exists
        if (fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: 'An article with this title already exists' },
                { status: 409 }
            );
        }

        // Write file
        fs.writeFileSync(filePath, mdxContent, 'utf8');

        // Save cover image if provided (base64)
        if (coverImage && coverImage.startsWith('data:image')) {
            const imageBuffer = Buffer.from(coverImage.split(',')[1], 'base64');
            const imageExt = coverImage.split(';')[0].split('/')[1];
            const imagePath = path.join(process.cwd(), 'public', 'blog', `${slug}.${imageExt}`);

            const blogImagesDir = path.join(process.cwd(), 'public', 'blog');
            if (!fs.existsSync(blogImagesDir)) {
                fs.mkdirSync(blogImagesDir, { recursive: true });
            }

            fs.writeFileSync(imagePath, imageBuffer);

            // Update frontmatter with actual image path
            frontmatter.coverImage = `/blog/${slug}.${imageExt}`;
            const updatedMdxContent = matter.stringify(content, frontmatter);
            fs.writeFileSync(filePath, updatedMdxContent, 'utf8');
        }

        return NextResponse.json({
            success: true,
            slug,
            message: 'Article published successfully'
        });

    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json(
            { error: 'Failed to create article' },
            { status: 500 }
        );
    }
}

// Get all articles (for admin dashboard)
export async function GET() {
    try {
        const contentDir = path.join(process.cwd(), 'content', 'blog');

        if (!fs.existsSync(contentDir)) {
            return NextResponse.json({ articles: [] });
        }

        const files = fs.readdirSync(contentDir);
        const articles = files
            .filter(file => file.endsWith('.mdx'))
            .map(file => {
                const filePath = path.join(contentDir, file);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data } = matter(fileContents);

                return {
                    slug: file.replace('.mdx', ''),
                    publishedAt: data.publishedAt || new Date().toISOString(),
                    ...data
                };
            })
            .sort((a, b) => {
                return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            });

        return NextResponse.json({ articles });

    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}
