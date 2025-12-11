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
    title: "Algor Brasil | A Elite da Governança",
    description: "Associação para Algoritmização e Governança Lógica. Conformidade ISO 42001 e Estratégia de IA.",
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
