import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, Activity, ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#050B14] border-t border-brand-blue/10 pt-16 pb-8 relative z-20">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="block mb-6 relative group inline-block">
                            <div className="absolute -inset-2 bg-brand-green/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <Image
                                src="/logo-algor.webp"
                                alt="ALGOR BRASIL"
                                width={160}
                                height={160}
                                className="relative w-32 h-32 object-cover rounded-full border border-brand-green/30 shadow-[0_0_20px_rgba(0,255,148,0.2)]"
                            />
                        </Link>
                        <p className="font-mono text-xs text-gray-400 leading-relaxed mb-6">
                            Consultoria de Elite em Governança de Inteligência Artificial.
                            <br /><br />
                            Transformando riscos tecnológicos em ativos estratégicos auditáveis.
                        </p>

                        <a
                            href="https://www.algor.uk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-green/30 transition-all group/uk"
                        >
                            <span className="font-mono text-[10px] text-gray-400 group-hover/uk:text-white transition-colors">
                                Uma divisão da <span className="text-brand-green font-bold">ALGOR UK</span>
                            </span>
                            <ArrowUpRight className="w-3 h-3 text-brand-green" />
                        </a>

                        {/* Trust Badge: Enterprise Security */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-blue/20 bg-brand-navy/50">
                            <Activity className="w-3 h-3 text-brand-green" />
                            <span className="font-mono text-[10px] text-brand-green uppercase tracking-wide">
                                Verified ALGOR Infrastructure
                            </span>
                        </div>
                    </div>

                    {/* Links: Platform */}
                    <div>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6">Plataforma</h4>
                        <ul className="space-y-3 font-mono text-xs text-gray-400">
                            <li><Link href="/login" className="hover:text-brand-green transition-colors">Console do Membro</Link></li>
                            <li><Link href="/register?persona=tech" className="hover:text-brand-green transition-colors">API & Webhooks</Link></li>
                            <li><Link href="#" className="hover:text-brand-green transition-colors">Relatório de Transparência</Link></li>
                        </ul>
                    </div>

                    {/* Links: Solutions */}
                    <div>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6">Soluções</h4>
                        <ul className="space-y-3 font-mono text-xs text-gray-400">
                            <li><Link href="/register" className="hover:text-brand-green transition-colors">Fortress Assessment</Link></li>
                            <li><Link href="#" className="hover:text-brand-green transition-colors">Data Clean Rooms</Link></li>
                            <li><Link href="#" className="hover:text-brand-green transition-colors">Auditoria de Viés</Link></li>
                        </ul>
                    </div>

                    {/* Links: Compliance (Meta-Governance) */}
                    <div>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6">Governança</h4>
                        <ul className="space-y-3 font-mono text-xs text-gray-400">
                            <li><Link href="#" className="flex items-center gap-2 hover:text-brand-green transition-colors"><ShieldCheck className="w-3 h-3" /> Portal do Titular (DSR)</Link></li>
                            <li><Link href="#" className="flex items-center gap-2 hover:text-brand-green transition-colors"><Lock className="w-3 h-3" /> Política de IA & Dados</Link></li>
                            <li><Link href="#" className="hover:text-brand-green transition-colors">Status: ISO 42001 Native</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-brand-blue/5 flex flex-col justify-between items-start gap-4">
                    <p className="font-mono text-[10px] text-gray-500 max-w-4xl">
                        © 2025 Algor Association. Representada juridicamente no Brasil pela <strong>XPER BRASIL GESTAO EM INOVAÇÃO TECNOLÓGICA LTDA (CNPJ: 33.173.492/0001-76)</strong>.
                        <br />
                        ALGOR é uma organização profissional associativa com registro no Reino Unido (London). Contato Global: <a href="mailto:global@algor.uk" className="text-brand-blue hover:underline">global@algor.uk</a>
                    </p>

                    {/* ISO Badges Placeholders */}
                    <div className="flex items-center gap-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center mb-1">
                                <span className="font-mono text-[8px] font-bold text-white">ISO</span>
                            </div>
                            <span className="font-mono text-[8px] text-white">42001</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center mb-1">
                                <span className="font-mono text-[8px] font-bold text-white">ISO</span>
                            </div>
                            <span className="font-mono text-[8px] text-white">27001</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
