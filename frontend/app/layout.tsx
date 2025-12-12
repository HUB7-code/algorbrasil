import type { Metadata } from "next";
import { Manrope, Playfair_Display, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// Fontes Elite Design
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
    title: {
        template: '%s | Algor Brasil',
        default: 'Algor Brasil | A Elite da Governança de IA',
    },
    description: "Associação referência em Governança de Inteligência Artificial e Conformidade ISO 42001. Aceleramos a maturidade de IA no Brasil com ética e precisão técnica.",
    keywords: ["Governança de IA", "ISO 42001", "Compliance AI", "Auditoria de Algoritmos", "LGPD", "Inteligência Artificial Brasil"],
    authors: [{ name: "Algor Brasil", url: "https://algorbrasil.example.com" }],
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
        url: 'https://algorbrasil.example.com',
        siteName: 'Algor Brasil',
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg', // Placeholder
                width: 1200,
                height: 630,
                alt: 'Algor Brasil Hero Image',
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
        <html lang="pt-BR">
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body className={`${manrope.variable} ${playfair.variable} ${jetbrainsMono.variable} ${orbitron.variable} font-sans bg-[#0A1A2F] text-white selection:bg-[#00FF94] selection:text-[#0A1A2F]`}>
                {children}
                {/* <Footer /> Footer is now included in page components for custom layout control */}
            </body>
        </html>
    );
}
