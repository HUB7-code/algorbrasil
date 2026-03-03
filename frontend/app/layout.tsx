import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from "@clerk/localizations";

import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.algorbrasil.com.br'),
    title: {
        template: '%s | Algor Brasil',
        default: 'Algor Brasil | A Elite da Governança de IA',
    },
    description: "Associação referência em Governança de Inteligência Artificial e Conformidade ISO 42001. Aceleramos a maturidade de IA no Brasil com ética e precisão técnica.",
    keywords: ["Governança de IA", "ISO 42001", "Compliance AI", "Auditoria de Algoritmos", "LGPD", "Inteligência Artificial Brasil"],
    authors: [{ name: "Algor Brasil", url: "https://www.algorbrasil.com.br" }],
    creator: "Algor Brasil Technical Team",
    publisher: "Algor Brasil Association",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Algor Brasil | Governança de IA de Elite",
        description: "Liderando a conformidade ética e técnica da IA no Brasil. Junte-se à elite da governança.",
        url: 'https://www.algorbrasil.com.br',
        siteName: 'Algor Brasil',
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: '/og-governance.jpg',
                width: 1200,
                height: 630,
                alt: 'Algor Brasil - Governança de IA de Elite',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Algor Brasil | Governança de IA',
        description: 'Conformidade ISO 42001 e Estratégia de IA. Saiba mais.',
        creator: '@algorbrasil',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider localization={ptBR}>
            <html lang="pt-BR">
                <head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Manrope:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                </head>
                <body className={`font-sans bg-[#0A1A2F] text-white selection:bg-[#4F7EFF] selection:text-[#0A1A2F]`}>
                    {children}
                    <CookieBanner />
                </body>
            </html>
        </ClerkProvider>
    );
}
