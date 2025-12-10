import type { Metadata } from "next";
import { Manrope, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// Fontes Elite Design
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

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
            <body className={`${manrope.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans bg-[#F3F6FC] text-[#1F1F1F] selection:bg-[#C2E7FF] selection:text-[#001D35]`}>
                {children}
                <Footer />
            </body>
        </html>
    );
}
