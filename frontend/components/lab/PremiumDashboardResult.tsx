"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Download, Info, TrendingUp, TrendingDown, Shield, AlertTriangle, CheckCircle, Activity, Brain, Layers, FileText, Lightbulb, Zap, Hexagon } from 'lucide-react';

interface PremiumDashboardProps {
    title: string;
    score: number;
    riskLevel: string;
    verdict: string;
    metrics: { label: string; value: string | number; sub?: string; trend?: 'up' | 'down' }[];
    chartData: any[];
    barData: any[];
    type: 'xai' | 'shadow' | 'iso';
}

// PREMIUM TOOLTIP - Holographic Glass Style
const CardTooltip = ({ text, action }: { text: string, action?: string }) => {
    const [show, setShow] = useState(false);

    return (
        <div
            className="absolute top-2 right-2 z-50 text-left"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <button className="w-6 h-6 rounded-full bg-cyan-500/10 hover:bg-cyan-500/30 border border-cyan-500/30 flex items-center justify-center transition-all duration-300 backdrop-blur-sm group mix-blend-plus-lighter">
                <Info className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
            </button>

            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.95 }}
                        className="absolute right-0 top-8 w-80 bg-[#0a0f18]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                        style={{ zIndex: 1000, boxShadow: '0 0 40px rgba(0,240,255,0.1)' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />

                        <div className="p-5 border-b border-white/5 relative z-10">
                            <div className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                                <Info className="w-3 h-3 text-cyan-400" />
                                <span className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Contexto Analítico</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed font-light tracking-wide">{text}</p>
                        </div>
                        {action && (
                            <div className="p-5 bg-gradient-to-r from-orange-500/5 to-transparent relative z-10">
                                <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
                                    <Zap className="w-3 h-3" />
                                    <span>Recomendação Tática</span>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed font-light border-l-2 border-orange-500/30 pl-3">{action}</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ANIMATED NUMBER (CountUp)
const AnimatedValue = ({ value }: { value: number }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let current = 0;
        const step = Math.max(1, value / 60);
        const timer = setInterval(() => {
            current += step;
            if (current >= value) { setDisplay(value); clearInterval(timer); }
            else { setDisplay(Math.floor(current)); }
        }, 20);
        return () => clearInterval(timer);
    }, [value]);
    return <>{display}</>;
};

const CountUp = ({ to }: { to: number }) => {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        const controls = animate(0, to, {
            duration: 2.5,
            onUpdate: (v) => setValue(Math.round(v)),
            ease: "circOut"
        });
        return controls.stop;
    }, [to]);
    return <>{value}</>;
};

// CONFIG DICTIONARY
const CONFIG = {
    'Variáveis Analisadas': {
        meaning: 'Dimensionalidade do espaço de features utilizado pelo modelo. Alta dimensionalidade pode indicar maior capacidade preditiva, mas requer mais dados.',
        action: 'Verifique a correlação entre variáveis (VIF) se o número for > 50.',
    },
    'Métodos de Explicabilidade': {
        meaning: 'Técnicas de XAI (Explainable AI) ativas para auditar decisões. SHAP e LIME garantem conformidade com o Art. 20 da LGPD.',
        action: 'Adicione SHAP Values globais se o score for baixo.',
    },
    'Entropia': {
        meaning: 'Grau de incerteza ou "ruído" nas predições do modelo. Entropia alta sugere baixa confiança estatística.',
        action: 'Realize feature engineering para limpar o dataset se a entropia persistir alta.',
    },
    'Evolução Temporal': {
        meaning: 'Rastreamento histórico da estabilidade do modelo (drift detection).',
        action: 'Qualquer queda abrupta exige retraining imediato.',
    },
    'Distribuição': {
        meaning: 'Importância relativa das features na decisão final (Feature Importance).',
        action: 'Remova features com importância < 0.01 para otimizar inferência.',
    },
};

export default function PremiumDashboardResult({
    title, score, riskLevel, verdict, metrics, chartData, barData, type
}: PremiumDashboardProps) {
    const dashboardRef = useRef<HTMLDivElement>(null);
    const [exporting, setExporting] = useState(false);

    const isGood = riskLevel === 'LOW';
    // Cyberpunk Palettes
    const mainColor = isGood ? '#00FF94' : '#FF0055'; // Neon Green / Neon Red
    const accentColor = isGood ? '#00A3FF' : '#FF9900'; // Electric Blue / Amber

    const donutData = [
        { name: 'Score', value: score },
        { name: 'Gap', value: 100 - score }
    ];

    // --- PDF EXPORT LOGIC (Keep existing logic, simplified for display here) ---
    const handleExportPDF = async () => {
        setExporting(true);
        try {
            const jsPDF = (await import('jspdf')).default;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;
            let y = 0;

            // HELPER: Auto-page break
            const checkPageBreak = (spaceNeeded: number) => {
                if (y + spaceNeeded > pageHeight - margin) {
                    pdf.addPage();
                    y = margin;
                    return true;
                }
                return false;
            };

            // HELPER: Load & Sanitize Image (Fixes WebP/Alpha Artifacts)
            const loadImage = async (url: string): Promise<{ data: string; w: number; h: number } | null> => {
                try {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.crossOrigin = 'Anonymous';
                        img.src = url;
                        img.onload = () => {
                            // Create off-screen canvas to sanitize the image
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            if (ctx) {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(img, 0, 0);
                                // Export as clean PNG
                                const sanitizedData = canvas.toDataURL('image/png');
                                resolve({ data: sanitizedData, w: img.width, h: img.height });
                            } else {
                                resolve(null);
                            }
                        };
                        img.onerror = () => {
                            console.warn(`Failed to load image: ${url}`);
                            resolve(null);
                        };
                    });
                } catch (e) {
                    return null;
                }
            };

            // HELPER: Load Font to Base64
            const loadFont = async (url: string): Promise<string> => {
                try {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            const base64 = (reader.result as string).split(',')[1];
                            resolve(base64);
                        };
                        reader.readAsDataURL(blob);
                    });
                } catch (e) {
                    console.warn(`Failed to load font: ${url}`, e);
                    return '';
                }
            };

            // ========== HEADER (Black Background) ==========
            const drawHeader = async () => {
                // --- ORBITRON FONT INJECTION ---
                const orbitronBase64 = await loadFont('/fonts/Orbitron-Bold.ttf');
                let fontReady = false;
                if (orbitronBase64) {
                    pdf.addFileToVFS('Orbitron.ttf', orbitronBase64);
                    pdf.addFont('Orbitron.ttf', 'Orbitron', 'bold');
                    pdf.addFont('Orbitron.ttf', 'Orbitron', 'normal');
                    fontReady = true;
                }

                // ============================================
                // HEADER V5.1 - 2X LOGO SIZE
                // ============================================

                // 1. TOP BAR (Black) - Branding
                const topBarHeight = 40; // Increased from 22 to 40 to fit 2x Logo
                pdf.setFillColor(0, 0, 0);
                pdf.rect(0, 0, pageWidth, topBarHeight, 'F');

                // Logo Image (Left) - MASSIVE
                let logoObj = await loadImage('/logo-algor.webp');
                if (!logoObj) logoObj = await loadImage('/logo-symbol.png');

                if (logoObj) {
                    try {
                        // Fit in the top bar (height 40mm, padding -> max H 32mm)
                        const maxH = 32;
                        const ratio = logoObj.w / logoObj.h;
                        const drawH = maxH;
                        const drawW = drawH * ratio;
                        // Vertically centered: (40-32)/2 = 4mm top
                        pdf.addImage(logoObj.data, 'PNG', margin, 4, drawW, drawH);

                        // Offset text to right of logo
                        var textStart = margin + drawW + 10;
                    } catch (e) { var textStart = margin; }
                } else { var textStart = margin; }

                // Text: ALGOR (White) BRASIL (Green)
                // Centered vertically relative to the new bar height (approx Y=26)
                if (fontReady) pdf.setFont('Orbitron', 'bold');
                else pdf.setFont('helvetica', 'bold');

                pdf.setFontSize(32); // Increased font size to balance 2x logo
                pdf.setTextColor(255, 255, 255);
                pdf.setCharSpace(1.5);
                pdf.text('ALGOR', textStart, 26);

                const algorWidth = pdf.getTextWidth('ALGOR');

                if (fontReady) pdf.setFont('Orbitron', 'normal');
                pdf.setTextColor(0, 255, 148); // #00FF94 (Bio Green)
                pdf.setCharSpace(1.2);
                pdf.text('BRASIL', textStart + algorWidth + 6, 26);
                pdf.setCharSpace(0);


                // 2. SEPARATOR LINE (Neon Green)
                pdf.setFillColor(0, 255, 148);
                pdf.rect(0, topBarHeight, pageWidth, 0.8, 'F');


                // 3. MAIN HEADER SECTION (Dark Navy Body)
                const headerHeight = 35;
                const headerY = topBarHeight + 0.8; // shifted down
                pdf.setFillColor(10, 22, 40); // Dark Navy #0A1628
                pdf.rect(0, headerY, pageWidth, headerHeight, 'F');

                // subtle grid background
                pdf.setDrawColor(30, 45, 70);
                pdf.setLineWidth(0.1);
                for (let i = 0; i < pageWidth; i += 10) pdf.line(i, headerY, i, headerY + headerHeight);

                // 4. STATUS BOX (Right Side)
                const boxW = 70;
                const boxH = 22;
                const boxX = pageWidth - margin - boxW;
                const boxY = headerY + 6;

                pdf.setDrawColor(0, 163, 255);
                pdf.setLineWidth(0.3);
                pdf.setFillColor(13, 25, 48);
                pdf.roundedRect(boxX, boxY, boxW, boxH, 1, 1, 'FD');

                // Status Label - INCREASED VISIBILITY
                const statusFontSize = 14; // Was 8
                pdf.setFontSize(statusFontSize);
                if (fontReady) pdf.setFont('Orbitron', 'bold');
                else pdf.setFont('helvetica', 'bold');

                // Dynamic Status Text based on Auditor Result
                // If isGood (Score > 70) -> APROVADO / BAIXO RISCO
                // If !isGood -> REPROVADO / ALTO RISCO
                const riskLabel = isGood ? 'STATUS: APROVADO' : 'STATUS: ALTO RISCO';
                const riskColor = isGood ? [0, 255, 148] : [255, 51, 102];
                pdf.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
                pdf.text(riskLabel, boxX + 5, boxY + 8);

                // Metadata - INCREASED READABILITY
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9); // Was 7
                pdf.setTextColor(200, 220, 240);
                const id = Math.random().toString(36).substr(2, 9).toUpperCase();

                // Adjusted spacing for larger text
                pdf.text(`CONTROL ID: ${id}`, boxX + 5, boxY + 14);
                pdf.text(`TIMESTAMP: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`, boxX + 5, boxY + 18.5);


                // TITLE: CERTIFICAÇÃO... (Left Side)
                // Ensure it doesn't overlap Box
                if (fontReady) pdf.setFont('Orbitron', 'bold');
                else pdf.setFont('helvetica', 'bold');

                pdf.setFontSize(16); // Reduced slightly (18->16) to fit better
                pdf.setTextColor(255, 255, 255);

                // Wrap text if needed, or just split lines manually
                pdf.text('CERTIFICAÇÃO DE', margin, headerY + 12);
                pdf.text('INTEGRIDADE ALGORÍTMICA', margin, headerY + 20);

                // Subtitle
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9);
                pdf.setTextColor(173, 186, 204);
                pdf.text('HEALTH LAB | ISO/IEC 42001 & PL 2338', margin, headerY + 28);
            };

            await drawHeader();

            // Adjust starting Y for content to account for taller header
            // TopBar(40) + Separator(0.8) + HeaderSection(35) = 75.8
            y = 85;

            // ========== RESUMO EXECUTIVO (GAUGE STYLE) ==========
            checkPageBreak(70);

            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(10, 26, 47);
            pdf.text('RESUMO EXECUTIVO', margin, y);
            y += 8;

            // Card Background
            pdf.setFillColor(248, 250, 252);
            pdf.setDrawColor(226, 232, 240);
            pdf.setLineWidth(0.5);
            pdf.roundedRect(margin, y, pageWidth - (margin * 2), 55, 3, 3, 'FD');

            // --- GAUGE VISUALIZATION (Simulated) ---
            const centerX = margin + 30;
            const centerY = y + 28;
            const radius = 18;

            // Gauge Background Ring
            pdf.setDrawColor(226, 232, 240);
            pdf.setLineWidth(4);
            pdf.circle(centerX, centerY, radius, 'S');

            // Gauge Progress Ring
            pdf.setDrawColor(isGood ? 0 : 255, isGood ? 255 : 51, isGood ? 135 : 102);
            pdf.circle(centerX, centerY, radius, 'S');

            // Score Centered
            pdf.setFontSize(22);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(15, 23, 42);
            pdf.text(score.toString(), centerX - 6, centerY + 3);

            // Verdict Text
            pdf.setFontSize(18);
            pdf.text(isGood ? 'MODELO AUDITÁVEL' : 'RISCO CRÍTICO', margin + 65, y + 15);

            // PL 2338 SEAL
            pdf.setFillColor(isGood ? 220 : 255, isGood ? 252 : 230, isGood ? 231 : 230); // Bg light green/red
            pdf.setTextColor(isGood ? 22 : 220, isGood ? 101 : 38, isGood ? 52 : 38);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.roundedRect(margin + 65, y + 20, 50, 8, 1, 1, 'F');
            pdf.text(isGood ? 'PL 2338: BAIXO RISCO' : 'PL 2338: ALTO RISCO', margin + 68, y + 25);

            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(51, 65, 85);
            const verdictLines = pdf.splitTextToSize(verdict, pageWidth - margin * 2 - 80);
            pdf.text(verdictLines, margin + 65, y + 35);

            y += 65;

            // ========== CONTEXTO CLÍNICO (SÁUDE) ==========
            checkPageBreak(35);
            pdf.setFillColor(isGood ? 240 : 254, isGood ? 253 : 242, isGood ? 244 : 242); // Light Green or Red tint
            pdf.roundedRect(margin, y, pageWidth - (margin * 2), 25, 2, 2, 'F');

            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(10, 26, 47);
            pdf.text('IMPACTO CLÍNICO ESTIMADO', margin + 5, y + 8);

            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(51, 65, 85);
            const healthText = isGood
                ? "A transparência do modelo permite o 'Double-Check' médico, garantindo que profissionais de saúde possam validar as inferências da IA, reduzindo drasticamente o risco de iatrogenia algorítmica."
                : "A opacidade do modelo impede o 'Double-Check' médico, elevando a probabilidade de eventos adversos não rastreáveis e comprometendo a segurança do paciente conforme RDC/ANVISA.";
            const healthLines = pdf.splitTextToSize(healthText, pageWidth - margin * 2 - 10);
            pdf.text(healthLines, margin + 5, y + 15);
            y += 35;

            // ========== ANÁLISE TÉCNICA (BENTO GRID) ==========
            checkPageBreak(40);
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(10, 26, 47);
            pdf.text('ANÁLISE TÉCNICA', margin, y);
            y += 8;

            // Grid Logic
            let col = 0; // 0 or 1
            const colWidth = (pageWidth - margin * 2 - 10) / 2;
            const cardHeight = 45;
            let rowY = y;

            metrics.forEach((m) => {
                const config = CONFIG[m.label as keyof typeof CONFIG];
                if (!config) return;

                // Check page break
                if (col === 0 && rowY + cardHeight > pageHeight - margin) {
                    pdf.addPage();
                    rowY = margin;
                }

                const x = margin + (col * (colWidth + 10));

                // Card Grid Item
                pdf.setFillColor(255, 255, 255);
                pdf.setDrawColor(226, 232, 240);
                pdf.roundedRect(x, rowY, colWidth, cardHeight, 3, 3, 'FD');

                // Label
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(100, 116, 139);
                pdf.text(m.label.toUpperCase(), x + 5, rowY + 8);

                // Value
                pdf.setFontSize(14);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(15, 23, 42);
                pdf.text(m.value.toString(), x + 5, rowY + 16);

                // Mini Trend/Meaning
                pdf.setFontSize(8);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(148, 163, 184);
                const meaningBrief = pdf.splitTextToSize(config.meaning, colWidth - 10);
                pdf.text(meaningBrief, x + 5, rowY + 24);

                // Update Grid Coords
                col++;
                if (col > 1) {
                    col = 0;
                    rowY += cardHeight + 5;
                }
            });
            // Update main Y to below grid
            y = rowY + (col === 0 ? 0 : cardHeight + 5) + 10;


            // ========== BLINDAGEM REGULATÓRIA (ISO 42001) ==========
            checkPageBreak(60);
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(10, 26, 47);
            pdf.text('MAPEAMENTO DE CONFORMIDADE ISO/IEC 42001', margin, y);
            y += 8;

            // Table Header
            pdf.setFillColor(15, 23, 42);
            pdf.rect(margin, y, pageWidth - margin * 2, 8, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(9);
            pdf.text('CONTROLE', margin + 5, y + 5);
            pdf.text('REQUISITO', margin + 45, y + 5);
            pdf.text('STATUS', margin + 130, y + 5);
            y += 8;

            // Table Rows
            const isoRows = [
                { id: 'A.6.1', req: 'Compreensão da Organização', status: 'CONFORME' },
                { id: 'A.10.2', req: 'Explicabilidade do Sistema', status: isGood ? 'CONFORME' : 'FALHA CRÍTICA' },
                { id: 'A.7.2', req: 'Tratamento de Dados (Data Governance)', status: 'EM ANÁLISE' },
                { id: 'B.5.1', req: 'Avaliação de Impacto Algorítmico', status: isGood ? 'CONFORME' : 'NÃO INICIADO' },
            ];

            isoRows.forEach((row, i) => {
                pdf.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255);
                pdf.rect(margin, y, pageWidth - margin * 2, 8, 'F');

                pdf.setTextColor(51, 65, 85);
                pdf.setFont('helvetica', 'normal');
                pdf.text(row.id, margin + 5, y + 5);
                pdf.text(row.req, margin + 45, y + 5);

                pdf.setFont('helvetica', 'bold');
                const isCritical = row.status === 'FALHA CRÍTICA' || row.status === 'NÃO INICIADO';
                pdf.setTextColor(isCritical ? 220 : 22, isCritical ? 38 : 163, isCritical ? 38 : 74);
                pdf.text(row.status, margin + 130, y + 5);

                y += 8;
            });

            // ========== CONCLUSÃO FINAL E ASSINATURA ==========
            y += 10;
            checkPageBreak(50);
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(10, 26, 47);
            pdf.text('PARECER FINAL', margin, y);
            y += 10;

            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(30, 41, 59);

            const finalConclusion = isGood
                ? 'Em conformidade com a ISO/IEC 42001 e PL 2338/23, este modelo está APTO para operar em ambientes de saúde, com monitoramento ativo de drift conforme Art. 20 da LGPD.'
                : 'Modelo INAPTO para uso clínico. A falta de explicabilidade viola os princípios de Transparência e Não-Discriminação (PL 2338/23). Risco severo de eventos adversos.';

            const finalLines = pdf.splitTextToSize(finalConclusion, pageWidth - margin * 2);
            pdf.text(finalLines, margin, y);

            // ========== FOOTER ==========
            const totalPages = (pdf.internal as any).getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.setTextColor(148, 163, 184); // Light Gray
                // Added distinct padding
                const footerY = pageHeight - 10;
                const lineY = pageHeight - 16; // Moved line UP to increase gap

                pdf.text(`Documento Confidencial • ALGOR HEALTH LAB • Página ${i} de ${totalPages}`, margin, footerY);

                // Optional: Make the line slightly lighter/thinner
                pdf.setDrawColor(226, 232, 240);
                pdf.setLineWidth(0.5);
                pdf.line(margin, lineY, pageWidth - margin, lineY);
            }

            pdf.save(`ALGOR_Health_Audit_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (e) {
            console.error('Erro ao gerar PDF:', e);
            alert('Erro ao gerar o relatório. Tente novamente.');
        } finally {
            setExporting(false);
        }
    };

    // --- ANIMATIONS ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 40, damping: 15 }
        }
    };

    const floatingVariant = {
        animate: {
            y: [0, -6, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            ref={dashboardRef}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full relative rounded-3xl overflow-hidden shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] border border-white/5 bg-[#030712]"
        >
            {/* BACKGROUND LAYERS */}
            {/* 1. Base Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0f172a_0%,_#000000_100%)] z-0" />

            {/* 2. Cyber Grid */}
            <div className="absolute inset-0 z-0 opacity-20 contrast-150 brightness-100 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0 opacity-20" />

            {/* 3. Ambient Glows */}
            <motion.div
                className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-20 pointer-events-none"
                style={{ backgroundColor: isGood ? '#00FF94' : '#FF0055' }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-screen opacity-20 pointer-events-none"
                style={{ backgroundColor: accentColor }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />

            {/* HEADER */}
            <motion.div variants={itemVariants} className="relative z-20 bg-white/5 backdrop-blur-md px-8 py-6 border-b border-white/10 flex items-center justify-between">
                {/* Header Scan Line */}
                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-[1px] w-32 bg-cyan-400 blur-[2px]"
                />

                <div className="flex items-center gap-5">
                    <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center relative group overflow-hidden border border-white/10 ${isGood ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}
                    >
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${isGood ? 'from-emerald-500/20 to-cyan-500/20' : 'from-rose-500/20 to-orange-500/20'}`} />
                        <Shield className={`w-7 h-7 relative z-10 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`} style={{ color: mainColor }} />
                    </motion.div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400">
                                AI Audit Protocol v2.5
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${isGood ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
                                {type.toUpperCase()} LAYER
                            </span>
                        </div>
                        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight">
                            {title}
                        </h1>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,240,255,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExportPDF}
                    disabled={exporting}
                    className="relative group px-6 py-2.5 bg-gradient-to-r from-[#0D1117] to-[#161B26] border border-white/10 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-cyan-400 animate-pulse" />
                        <span className="text-sm font-semibold text-gray-200">{exporting ? 'Gerando Relatório...' : 'Exportar Relatório Completo'}</span>
                    </div>
                </motion.button>
            </motion.div>

            {/* CONTENT GRID */}
            <div className="relative z-10 p-6 grid grid-cols-12 gap-6">

                {/* --- LENS COLUMN: SCORE (Floating 3D) --- */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <motion.div
                        variants={itemVariants}
                        className="flex-1 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-500"
                    >
                        {/* Card Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

                        <div className="relative z-10 text-center">
                            <p className="text-xs font-bold text-cyan-400/80 uppercase tracking-[0.2em] mb-8">Pontuação de Integridade</p>

                            {/* 3D GAUGE CONTAINER */}
                            <div className="relative mx-auto w-[240px] h-[240px] mb-8">
                                {/* Outer Rotating Ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-dashed border-white/10"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                />
                                {/* Inner Rotating Ring (Reverse) */}
                                <motion.div
                                    className="absolute inset-4 rounded-full border border-dotted border-white/5"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Main Chart */}
                                <div className="absolute inset-0 filter drop-shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <defs>
                                                <linearGradient id="scoreMetallic" x1="0" y1="0" x2="1" y2="1">
                                                    <stop offset="0%" stopColor={mainColor} stopOpacity={1} />
                                                    <stop offset="50%" stopColor={isGood ? '#caffef' : '#ffb3c6'} stopOpacity={1} />
                                                    <stop offset="100%" stopColor={mainColor} stopOpacity={1} />
                                                </linearGradient>
                                                <filter id="glow">
                                                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                                                    <feMerge>
                                                        <feMergeNode in="coloredBlur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            <Pie
                                                data={donutData}
                                                cx="50%" cy="50%"
                                                innerRadius={75} outerRadius={90}
                                                startAngle={90} endAngle={-270}
                                                dataKey="value" stroke="none"
                                                cornerRadius={5}
                                                paddingAngle={5}
                                            >
                                                <Cell fill="url(#scoreMetallic)" className="drop-shadow-lg" />
                                                <Cell fill="rgba(255,255,255,0.03)" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Center Value */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, type: 'spring' }}
                                        className="text-7xl font-black tracking-tighter"
                                        style={{
                                            textShadow: `0 0 30px ${mainColor}40`,
                                            color: 'white'
                                        }}
                                    >
                                        <CountUp to={score} />
                                    </motion.div>
                                    <span className={`text-sm font-bold uppercase tracking-widest mt-1 ${isGood ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {score > 90 ? 'Excelente' : score > 70 ? 'Moderado' : 'Crítico'}
                                    </span>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: 'Segurança', value: isGood ? 98 : 45, icon: Shield },
                                    { label: 'Privacidade', value: score, icon: Layers },
                                    { label: 'Equidade', value: isGood ? 89 : 32, icon: Brain },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        variants={floatingVariant}
                                        custom={i} // Stagger
                                        className="bg-white/[0.03] rounded-2xl p-3 border border-white/5 hover:bg-white/[0.06] transition-colors group/stat flex flex-col items-center justify-center text-center"
                                    >
                                        <stat.icon className="w-4 h-4 text-cyan-400 mb-2 opacity-70 group-hover/stat:opacity-100 group-hover/stat:scale-110 transition-all" />
                                        <div className="text-xl font-bold text-white mb-1">{stat.value}%</div>
                                        <div className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Verdict Card */}
                    <motion.div
                        variants={itemVariants}
                        className={`rounded-2xl p-5 border backdrop-blur-md relative overflow-hidden ${isGood ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none ${isGood ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                        <div className="relative z-10 flex gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isGood ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                                {isGood ? <CheckCircle className="w-6 h-6 text-emerald-400" /> : <AlertTriangle className="w-6 h-6 text-rose-400" />}
                            </div>
                            <div>
                                <h3 className={`text-base font-bold mb-1 ${isGood ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {isGood ? 'Auditoria Aprovada' : 'Bloqueio de Conformidade'}
                                </h3>
                                <p className="text-sm text-gray-400 leading-snug">{verdict}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* --- MATRIX COLUMN: METRICS & GRAPHS --- */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">

                    {/* 1. KPIs Staggered Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {metrics.map((m, i) => {
                            const colors = ['#00F0FF', '#9945FF', '#00FF94'];
                            const color = colors[i % 3];
                            const config = CONFIG[m.label as keyof typeof CONFIG];

                            return (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-5 border border-white/5 relative group hover:z-50 transition-all"
                                >
                                    {/* Isolated Background Effects (Clipped) */}
                                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
                                        <div className="absolute inset-0 border border-transparent group-hover:border-cyan-500/30 transition-colors duration-300" />
                                        <div
                                            className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                            style={{ backgroundColor: color }}
                                        />
                                    </div>

                                    {config && <CardTooltip text={config.meaning} action={config.action} />}

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                                <Hexagon className="w-5 h-5" style={{ color: color }} />
                                            </div>
                                            {m.trend && (
                                                <div className={`flex items-center gap-1 text-xs font-bold ${m.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                    {m.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                    <span>+12%</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{m.label}</p>
                                        <div className="text-2xl font-black text-white tracking-tight">
                                            {typeof m.value === 'number' ? <CountUp to={m.value} /> : m.value}
                                        </div>

                                        {/* Micro Sparkline */}
                                        <div className="w-full h-10 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={[{ v: 20 }, { v: 45 }, { v: 30 }, { v: 70 }, { v: 50 }, { v: typeof m.value === 'number' ? m.value : 60 }]}>
                                                    <defs>
                                                        <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                                                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <Area
                                                        type="monotone"
                                                        dataKey="v"
                                                        stroke={color}
                                                        strokeWidth={2}
                                                        fill={`url(#grad-${i})`}
                                                        dot={{ r: 0, fill: color, strokeWidth: 0 }} /* Clean lines */
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* 2. Main Analytics Area */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-6">

                        {/* CHART: Evolution */}
                        <motion.div variants={itemVariants} className="md:col-span-3 bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/5 relative group hover:border-white/10 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-cyan-400" />
                                        Drift e Performance
                                    </h3>
                                    <p className="text-[10px] text-gray-500 mt-1">Análise temporal de estabilidade estocástica</p>
                                </div>
                                {/* Legend */}
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]" />
                                        Atual
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                                        <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_purple]" />
                                        Referência
                                    </div>
                                </div>
                            </div>

                            <div className="h-[220px] w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="areaCyan" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.4} />
                                                <stop offset="80%" stopColor="#00F0FF" stopOpacity={0} />
                                            </linearGradient>
                                            <filter id="neonStroke" height="130%">
                                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 10 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 10 }}
                                        />
                                        <RechartsTooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(10, 15, 25, 0.9)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                                                backdropFilter: 'blur(10px)'
                                            }}
                                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#00F0FF"
                                            strokeWidth={3}
                                            fill="url(#areaCyan)"
                                            filter="url(#neonStroke)"
                                            dot={{ fill: '#0B1121', stroke: '#00F0FF', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 8, strokeWidth: 0, fill: '#fff', stroke: '#00F0FF' }}
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* CHART: Distribution */}
                        <motion.div variants={itemVariants} className="md:col-span-2 bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                                <Layers className="w-4 h-4 text-purple-400" />
                                Contribuição das Variáveis
                            </h3>
                            <p className="text-[10px] text-gray-500 mb-6">Impacto de correlação (Valor SHAP)</p>

                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart layout="vertical" data={barData} barCategoryGap={15}>
                                        <XAxis type="number" hide />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            width={70}
                                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                            {barData.map((_, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={index % 2 === 0 ? '#00F0FF' : '#9945FF'}
                                                    className="opacity-80 hover:opacity-100 transition-opacity"
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>
        </motion.div>
    );
}
