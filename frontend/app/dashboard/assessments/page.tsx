"use client";

import { ShieldCheck, Zap, Activity, FileText, ArrowRight, Star, Lock, HelpCircle, Sparkles, TrendingUp, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import AssessmentWizard from "@/components/dashboard/assessments/AssessmentWizard";

// ========================================
// CENTRAL DE AUDITORIA - POWER BI PREMIUM
// ========================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

// Protocol Data
const protocols = [
    {
        id: "iso-42001",
        title: "ISO 42001 Full Scan",
        description: "Diagnóstico completo de governança, riscos e conformidade para certificação internacional.",
        rationale: "Padrão ouro para desbloquear contratos Enterprise e reduzir prêmios de seguro cibernético.",
        icon: ShieldCheck,
        color: "#00FF94",
        badge: "Most Popular",
        badgeColor: "#00FF94",
        cost: 2,
        duration: "~45 min",
        accuracy: 98,
        isAvailable: true
    },
    {
        id: "lia-flash",
        title: "L.I.A. Flash",
        description: "Avaliação de Impacto Algorítmico rápida para novos modelos ou updates menores.",
        rationale: "Exigência do Art. 38 da LGPD sempre que houver tratamento de dados de alto risco.",
        icon: Zap,
        color: "#00A3FF",
        badge: null,
        cost: 1,
        duration: "~15 min",
        accuracy: 92,
        isAvailable: true
    },
    {
        id: "data-clean-room",
        title: "Data Clean Room Check",
        description: "Validação de ambiente seguro para processamento de dados sensíveis.",
        rationale: "Permite cruzar dados com parceiros (Retail Media) sem revelar PII, garantindo anonimização.",
        icon: Lock,
        color: "#8B5CF6",
        badge: "Enterprise",
        badgeColor: "#8B5CF6",
        cost: 5,
        duration: "~2 horas",
        accuracy: 99,
        isAvailable: false
    },
    {
        id: "policy-generator",
        title: "Gerador de Políticas",
        description: "Crie minutas de Governança de IA (PL 2338) personalizadas para sua empresa.",
        rationale: "Gera documentos jurídicos iniciais para Terms of Use e Política de Privacidade de IA.",
        icon: FileText,
        color: "#F59E0B",
        badge: "New Tool",
        badgeColor: "#F59E0B",
        cost: 0,
        duration: "~5 min",
        accuracy: 95,
        isAvailable: true
    }
];

export default function AssessmentsPage() {
    const [showWizard, setShowWizard] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userCredits, setUserCredits] = useState(10);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (searchParams.get('new') === 'true') {
            setShowWizard(true);
        }
    }, [searchParams]);

    const handleProtocolClick = (protocol: typeof protocols[0]) => {
        if (protocol.id === "iso-42001") {
            setShowWizard(true);
        } else if (protocol.id === "policy-generator") {
            router.push("/dashboard/growth?tab=policy");
        } else if (!protocol.isAvailable) {
            alert(`Recurso '${protocol.title}' disponível no plano Enterprise.`);
        } else {
            alert(`Em breve: ${protocol.title}`);
        }
    };

    if (showWizard) {
        return <AssessmentWizard onCancel={() => {
            setShowWizard(false);
            router.replace('/dashboard/assessments');
        }} />;
    }

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen text-white font-sans relative z-10">

            {/* Background Ambient Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-[#00A3FF]/5 rounded-full blur-[120px]" />
                <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-[#8B5CF6]/3 rounded-full blur-[100px]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 relative z-10"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="relative flex h-2.5 w-2.5">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${loading ? 'bg-amber-400' : 'bg-[#00FF94]'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${loading ? 'bg-amber-500' : 'bg-[#00FF94]'}`}></span>
                            </div>
                            <span className="text-[10px] font-mono text-[#00FF94] uppercase tracking-[0.2em] font-bold">
                                {loading ? "CARREGANDO PROTOCOLOS..." : "SCANNER PRONTO"}
                            </span>
                        </div>
                        <h1 className="text-5xl font-serif font-medium text-white mb-2 tracking-tight">
                            Central de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Auditoria</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-light flex items-center gap-2">
                            Selecione o protocolo de validação para sua <span className="text-white font-medium border-b border-[#00FF94]/30 pb-0.5">infraestrutura IA</span>.
                        </p>
                    </div>

                    {/* Credits Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="px-5 py-3 rounded-xl bg-[#0A1A2F]/50 backdrop-blur-md border border-white/10 flex items-center gap-4 shadow-lg group hover:border-[#00FF94]/30 transition-colors cursor-default"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#00FF94]/10 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-[#00FF94]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Créditos</p>
                                <p className="text-lg font-bold text-white font-mono">{userCredits}</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <button className="text-xs font-bold text-[#00FF94] hover:text-white transition-colors uppercase tracking-wider">
                            + Comprar
                        </button>
                    </motion.div>
                </motion.div>

                {/* Protocol Cards Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {protocols.map((protocol, index) => (
                        <ProtocolCard
                            key={protocol.id}
                            protocol={protocol}
                            delay={index * 0.1}
                            userCredits={userCredits}
                            onClick={() => handleProtocolClick(protocol)}
                        />
                    ))}
                </motion.div>

                {/* History Section - Power BI Premium */}
                <motion.div variants={itemVariants} className="mt-16">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <motion.div
                                className="p-3 rounded-xl bg-gradient-to-br from-[#00FF94]/10 to-[#00A3FF]/5 border border-[#00FF94]/20 shadow-[0_0_20px_rgba(0,255,148,0.1)]"
                                animate={{
                                    boxShadow: ["0 0 20px rgba(0,255,148,0.1)", "0 0 30px rgba(0,255,148,0.2)", "0 0 20px rgba(0,255,148,0.1)"]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Activity className="w-6 h-6 text-[#00FF94]" />
                            </motion.div>
                            <div>
                                <h3 className="text-xl font-serif font-medium text-white flex items-center gap-2">
                                    Histórico de Diagnósticos
                                    <span className="px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold bg-white/5 text-gray-500 border border-white/10">
                                        WS-29384-RJ
                                    </span>
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Últimas auditorias executadas neste workspace</p>
                            </div>
                        </div>
                        <motion.button
                            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-[#00FF94] uppercase tracking-wider flex items-center gap-2 bg-white/[0.02] border border-white/5 hover:border-[#00FF94]/30 hover:bg-[#00FF94]/5 transition-all"
                            whileHover={{ scale: 1.02, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Ver Todos <ArrowRight className="w-3 h-3" />
                        </motion.button>
                    </div>

                    {/* Empty State - Premium */}
                    <motion.div
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#131825] via-[#0D1117] to-[#0A0E1A] border border-white/[0.06] p-12 group hover:border-[#00FF94]/20 transition-all duration-500"
                        whileHover={{ scale: 1.005 }}
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,148,0.03)_0%,transparent_50%)]" />
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF94]/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A3FF]/20 to-transparent" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center justify-center text-center">
                            {/* Animated Icon Container */}
                            <motion.div
                                className="relative w-24 h-24 mb-8"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Outer Ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl border border-[#00FF94]/20"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.5, 0.2, 0.5]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                {/* Inner Container */}
                                <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-[#00FF94]/10 via-transparent to-[#00A3FF]/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                                    <FileText className="w-10 h-10 text-gray-500 group-hover:text-[#00FF94] transition-colors duration-500" />
                                </div>
                            </motion.div>

                            <h4 className="text-2xl font-serif font-medium text-white mb-3">
                                Nenhum registro encontrado
                            </h4>
                            <p className="text-gray-400 font-light max-w-md mb-8 leading-relaxed">
                                Execute seu primeiro diagnóstico de conformidade para começar a construir seu histórico de auditorias.
                            </p>

                            <motion.button
                                onClick={() => setShowWizard(true)}
                                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,255,148,0.2)" }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-gradient-to-r from-[#00FF94]/10 to-[#00A3FF]/10 border border-[#00FF94]/30 hover:border-[#00FF94]/50 rounded-xl text-sm font-bold text-white transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(0,255,148,0.1)]"
                            >
                                <ShieldCheck className="w-5 h-5 text-[#00FF94]" />
                                Iniciar Primeiro Diagnóstico
                                <ArrowRight className="w-4 h-4 text-[#00FF94]" />
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Quick Stats - Power BI Premium */}
                <motion.div variants={itemVariants} className="mt-10">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-4 h-4 text-[#00A3FF]" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Métricas do Workspace</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <QuickStat
                            label="Auditorias Realizadas"
                            value="0"
                            icon={<CheckCircle2 className="w-4 h-4" />}
                            color="#00FF94"
                            trend={null}
                        />
                        <QuickStat
                            label="Score Médio"
                            value="—"
                            icon={<TrendingUp className="w-4 h-4" />}
                            color="#00A3FF"
                            trend={null}
                        />
                        <QuickStat
                            label="Não Conformidades"
                            value="0"
                            icon={<AlertTriangle className="w-4 h-4" />}
                            color="#F59E0B"
                            trend={null}
                        />
                        <QuickStat
                            label="Tempo Médio"
                            value="—"
                            icon={<Clock className="w-4 h-4" />}
                            color="#8B5CF6"
                            trend={null}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ========================================
// PROTOCOL CARD - PREMIUM DESIGN
// ========================================
function ProtocolCard({ protocol, delay, userCredits, onClick }: {
    protocol: typeof protocols[0];
    delay: number;
    userCredits: number;
    onClick: () => void;
}) {
    const Icon = protocol.icon;
    const canAfford = userCredits >= protocol.cost;
    const isLocked = !protocol.isAvailable;

    return (
        <motion.div
            variants={itemVariants}
            onClick={onClick}
            className={`
                relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between min-h-[320px]
                bg-gradient-to-br from-[#131825] to-[#0A0E1A]
                border border-white/10 
                group cursor-pointer
                transition-all duration-500
                hover:border-opacity-50
                ${isLocked ? 'opacity-70' : ''}
            `}
            style={{
                ['--accent-color' as any]: protocol.color
            }}
            whileHover={{
                scale: 1.01,
                borderColor: `${protocol.color}50`
            }}
            whileTap={{ scale: 0.99 }}
        >
            {/* Background Glow Effect */}
            <div
                className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ backgroundColor: `${protocol.color}10` }}
            />

            {/* Locked Overlay */}
            {isLocked && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20 rounded-2xl">
                    <div className="flex flex-col items-center gap-2">
                        <Lock className="w-8 h-8 text-gray-400" />
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Enterprise Only</span>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <motion.div
                        className="p-4 rounded-xl border border-white/5"
                        style={{ backgroundColor: `${protocol.color}15` }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Icon className="w-7 h-7" style={{ color: protocol.color }} />
                    </motion.div>

                    {protocol.badge && (
                        <motion.span
                            className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border"
                            style={{
                                borderColor: `${protocol.badgeColor}40`,
                                backgroundColor: `${protocol.badgeColor}10`,
                                color: protocol.badgeColor
                            }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: delay + 0.2 }}
                        >
                            {protocol.badge}
                        </motion.span>
                    )}
                </div>

                {/* Title with Tooltip */}
                <div className="flex items-center gap-2 mb-3">
                    <h3
                        className="text-2xl font-serif font-medium text-white transition-colors duration-300"
                        style={{ ['--hover-color' as any]: protocol.color }}
                    >
                        <span className="group-hover:text-[var(--accent-color)] transition-colors">{protocol.title}</span>
                    </h3>
                    {protocol.rationale && (
                        <div className="relative group/tooltip z-50" onClick={(e) => e.stopPropagation()}>
                            <HelpCircle className="w-4 h-4 text-gray-500 hover:text-[#00FF94] cursor-help transition-colors" />
                            <div className="absolute left-0 bottom-8 w-64 p-4 bg-[#0A1A2F]/95 border border-[#00FF94]/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] text-xs text-gray-300 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity backdrop-blur-xl">
                                <span className="block text-[#00FF94] font-bold uppercase text-[10px] mb-1 tracking-wider">Por que usar?</span>
                                {protocol.rationale}
                            </div>
                        </div>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                    {protocol.description}
                </p>

                {/* Metrics */}
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{protocol.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <TrendingUp className="w-3 h-3" />
                        <span>{protocol.accuracy}% precisão</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex justify-between items-center border-t border-white/5 pt-6 mt-6">
                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 text-sm font-mono ${canAfford ? 'text-white' : 'text-red-400'}`}>
                        <Star className="w-4 h-4" style={{ color: protocol.color }} />
                        <span className="font-bold">{protocol.cost === 0 ? 'Free' : `${protocol.cost} Credits`}</span>
                    </div>
                    {!canAfford && protocol.cost > 0 && (
                        <span className="text-[10px] text-red-400 font-mono uppercase">Créditos insuficientes</span>
                    )}
                </div>

                <motion.button
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg border border-white/10"
                    style={{
                        backgroundColor: isLocked ? '#333' : 'white',
                        color: isLocked ? '#666' : '#0A1A2F'
                    }}
                    whileHover={{
                        scale: 1.1,
                        backgroundColor: protocol.color,
                        boxShadow: `0 0 30px ${protocol.color}40`
                    }}
                >
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </motion.div>
    );
}

// ========================================
// QUICK STAT COMPONENT - POWER BI PREMIUM
// ========================================
function QuickStat({ label, value, icon, color = "#00FF94", trend }: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color?: string;
    trend: string | null;
}) {
    return (
        <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#131825] to-[#0A0E1A] border border-white/[0.06] p-5 group hover:border-opacity-20 transition-all duration-300"
            style={{ ['--stat-color' as any]: color }}
            whileHover={{
                scale: 1.02,
                borderColor: `${color}30`
            }}
        >
            {/* Hover Glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                    background: `radial-gradient(circle at top right, ${color}08 0%, transparent 60%)`
                }}
            />

            {/* Top Line Accent */}
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    background: `linear-gradient(90deg, transparent, ${color}40, transparent)`
                }}
            />

            <div className="relative z-10 flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-400 transition-colors">
                    {label}
                </span>
                <div
                    className="p-2 rounded-lg border border-white/5 transition-all group-hover:scale-110"
                    style={{
                        backgroundColor: `${color}10`,
                        color: color
                    }}
                >
                    {icon}
                </div>
            </div>
            <div className="relative z-10 flex items-end gap-2">
                <span className="text-3xl font-bold text-white font-mono tracking-tight">{value}</span>
                {trend && (
                    <span
                        className="text-xs font-bold mb-1.5"
                        style={{ color }}
                    >
                        {trend}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
