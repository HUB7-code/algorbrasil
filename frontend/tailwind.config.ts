import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: "#0A1A2F", // Deep Navy (Fundo)
                    green: "#00FF94", // Bio-Luminescent Green (CTA)
                    amber: "#FFB000", // Sensor Amber (Alertas)
                    blue: "#00A3FF", // Electric Blue (Tech)
                    copper: "#E67E22", // Treinamentos (Laranja/Cobre)
                    silver: "#BDC3C7", // Estrutura/Metálico
                    glass: "rgba(10, 26, 47, 0.7)", // Vidro Base
                },
                corporate: {
                    blue: "#2C5AA0", // Primária (Corporativo)
                    cyan: "#5DADE2", // Secundária (Destaque sutil)
                    bg: "#F8F9FB",   // Neutra (Fundo)
                    text: "#4A5568", // Neutra (Texto)
                    accent: "#6FDC9F", // Accent (Sucesso/Menta)
                },
                // --- DESIGN SYSTEM: AURORA TECH (SaaS/Dashboard) ---
                aurora: {
                    bg: "#0F172A", // Slate 900 (Fundo Base)
                    "bg-gradient-start": "#0F172A",
                    "bg-gradient-end": "#1E293B",
                    violet: "#6366F1", // Violeta Profundo (Confiança/IA)
                    cyan: "#06B6D4", // Cyan Elétrico (Inovação)
                    pink: "#EC4899", // Rosa Neon (Energia)
                    amber: "#F59E0B", // Âmbar Suave (Alerta)
                    green: "#00FF94", // Neon Green (Marca - ALGOR Life)
                    border: "rgba(148, 163, 184, 0.1)", // Bordas sutis
                    "card-bg": "rgba(15, 23, 42, 0.6)", // Glassmorphism escuro e translúcido
                },
            },
            fontFamily: {
                sans: ["var(--font-manrope)"], // Corpo (Clean Modern)
                serif: ["var(--font-playfair)"], // Títulos (Elegância Institucional)
                display: ["var(--font-orbitron)"], // Headlines (Tech/Sci-Fi)
                orbitron: ["var(--font-orbitron)"], // Explicito
                mono: ["var(--font-jetbrains-mono)"], // Dados (Dev/Tech)
                tech: ["var(--font-jetbrains-mono)"], // Alias para tech details
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "grid-pattern": "linear-gradient(to right, #0A1A2F 1px, transparent 1px), linear-gradient(to bottom, #0A1A2F 1px, transparent 1px)",
                "neon-flow": "linear-gradient(90deg, transparent, #00FF94, transparent)",
            },
            animation: {
                "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "border-beam": "border-beam 4s linear infinite",
                "shimmer": "shimmer 2s linear infinite",
            },
            keyframes: {
                "border-beam": {
                    "0%": { "border-color": "rgba(0, 255, 148, 0.1)" },
                    "50%": { "border-color": "rgba(0, 255, 148, 0.5)" },
                    "100%": { "border-color": "rgba(0, 255, 148, 0.1)" },
                },
                shimmer: {
                    from: { transform: "translateX(-100%)" },
                    to: { transform: "translateX(100%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
