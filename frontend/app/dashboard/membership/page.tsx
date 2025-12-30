'use client';

import { motion } from "framer-motion";
import { CheckCircle2, Crown, ShieldCheck, Zap, Star, UserCheck } from "lucide-react";
import Link from "next/link";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function MembershipPage() {
    return (
        <div className="p-8 w-full min-h-screen relative text-white bg-[#050810] overflow-hidden flex flex-col items-center justify-center">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#F59E0B]/10 rounded-full blur-[200px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[180px] pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl w-full relative z-10"
            >
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-bold uppercase tracking-widest mb-6">
                        Plano Profissional
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        Associação <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#D97706]">ALGOR</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Eleve sua carreira em Governança de IA. Obtenha certificação, acesso a ferramentas exclusivas e reconhecimento no mercado.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Free Tier Card */}
                    <motion.div
                        variants={itemVariants}
                        className="p-8 rounded-3xl bg-[#0D1117]/50 border border-white/5 opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Comunidade</h3>
                                <p className="text-sm text-gray-400">Acesso Básico</p>
                            </div>
                            <span className="text-2xl font-bold text-gray-500">R$ 0</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-gray-500" />
                                <span>Acesso ao Dashboard Limitado</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-gray-500" />
                                <span>Newsletter Semanal</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 line-through decoration-gray-700">
                                <span className="w-5 h-5" />
                                <span>Ferramentas de Auditoria</span>
                            </li>
                        </ul>
                        <button disabled className="w-full py-4 rounded-xl border border-white/10 text-gray-500 font-bold uppercase tracking-widest text-xs cursor-not-allowed">
                            Plano Atual
                        </button>
                    </motion.div>

                    {/* Premium Tier Card */}
                    <motion.div
                        variants={itemVariants}
                        className="p-8 rounded-3xl bg-gradient-to-br from-[#180F05] to-[#0D1117] border border-[#F59E0B]/50 relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 px-4 py-1 bg-[#F59E0B] text-black text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                            Recomendado
                        </div>

                        <div className="absolute inset-0 bg-[#F59E0B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <Crown className="w-6 h-6 text-[#F59E0B] fill-current" />
                                    Associado
                                </h3>
                                <p className="text-sm text-[#F59E0B]">Acesso Profissional</p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-bold text-white">R$ 97</span>
                                <span className="text-xs text-gray-400 block">/mês</span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-[#F59E0B]/20">
                                    <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                                </div>
                                <span className="font-medium">Scanner ISO 42001 Completo</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-[#F59E0B]/20">
                                    <UserCheck className="w-4 h-4 text-[#F59E0B]" />
                                </div>
                                <span className="font-medium">Selo de Verificação Profissional</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-[#F59E0B]/20">
                                    <Zap className="w-4 h-4 text-[#F59E0B]" />
                                </div>
                                <span className="font-medium">Marketplace de Projetos</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <div className="p-1 rounded-full bg-[#F59E0B]/20">
                                    <Star className="w-4 h-4 text-[#F59E0B]" />
                                </div>
                                <span className="font-medium">Acesso a Treinamentos Premium</span>
                            </li>
                        </ul>

                        <button
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-bold 
                            uppercase tracking-widest text-xs shadow-[0_10px_40px_rgba(245,158,11,0.3)] 
                            hover:scale-[1.02] active:scale-[0.98] transition-all"
                            onClick={() => alert("Integração de pagamento em breve (Stripe)")}
                        >
                            Assinar Agora
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
