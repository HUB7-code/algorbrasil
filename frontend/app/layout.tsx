import type { Metadata } from "next";
import { Inter, Orbitron, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// Fontes Otimizadas
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const ibmPlexMono = IBM_Plex_Mono({
    weight: ['400', '600'],
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono"
});

export const metadata: Metadata = {
    title: "Algor Brasil | Inteligência Viva",
    description: "Governança de IA, Compliance ISO 42001 e Estratégia Corporativa.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.variable} ${orbitron.variable} ${ibmPlexMono.variable} font-sans bg-brand-navy text-white selection:bg-brand-green selection:text-brand-navy`}>
                {children}
                <Footer />
            </body>
        </html>
    );
}
