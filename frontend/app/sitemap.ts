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
        // Institucional
        {
            url: `${baseUrl}/institute`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/institute/about`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/institute/policy`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/institute/research`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        // Academy
        {
            url: `${baseUrl}/academy`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Ferramentas
        {
            url: `${baseUrl}/scanner`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/calculadora`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        // Associados e Parceiros
        {
            url: `${baseUrl}/associates`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/partners`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/partners/apply`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        // Soluções
        {
            url: `${baseUrl}/solutions/enterprise`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Governance
        {
            url: `${baseUrl}/governance-policy`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.5,
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
        // Políticas Legais
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
