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
                    glass: "rgba(10, 26, 47, 0.7)", // Vidro Base
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)"], // Corpo
                serif: ["var(--font-playfair)"], // Títulos Legais/Elegantes
                display: ["var(--font-playfair)"], // Títulos de Impacto (Mudança Estratégica)
                tech: ["var(--font-orbitron)"], // Detalhes Técnicos (Inteligência Viva)
                mono: ["var(--font-ibm-plex-mono)"], // Dados
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "grid-pattern": "linear-gradient(to right, #0A1A2F 1px, transparent 1px), linear-gradient(to bottom, #0A1A2F 1px, transparent 1px)",
            },
        },
    },
    plugins: [],
};
export default config;
