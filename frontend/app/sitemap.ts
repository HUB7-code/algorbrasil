import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://algorbrasil.com.br';
    const lastModified = new Date();

    return [
        // Homepage
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
        },
        // Academy
        {
            url: `${baseUrl}/academy`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        // Blog
        {
            url: `${baseUrl}/blog`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Board (Membros)
        {
            url: `${baseUrl}/board`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Auth
        {
            url: `${baseUrl}/register`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/login`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        // Políticas Legais (LGPD)
        {
            url: `${baseUrl}/policies/privacy`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/policies/terms`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/policies/cookies`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/policies/dpo`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];
}
