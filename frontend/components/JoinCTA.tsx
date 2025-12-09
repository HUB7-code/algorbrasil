import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function JoinCTA() {
    return (
        <section className="relative z-10 w-full py-24 px-4 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/10 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Pronto para Liderar a <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue">
                        Revolução da Governança?
                    </span>
                </h2>
                <p className="font-sans text-brand-blue/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    Junte-se à ALGOR BRASIL hoje. Acesse ferramentas exclusivas, conecte-se com a elite do mercado e proteja sua organização com inteligência.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link
                        href="/register"
                        className="w-full sm:w-auto px-8 py-4 bg-brand-green text-brand-navy font-bold font-mono rounded-lg hover:bg-white hover:text-brand-navy transition-all duration-300 shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 group"
                    >
                        SOLICITAR FILIAÇÃO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/about"
                        className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-mono font-bold rounded-lg hover:bg-white/10 transition-colors"
                    >
                        SOBRE A ASSOCIAÇÃO
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-brand-blue/60 font-mono">
                    <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-green" /> Processo 100% Digital
                    </span>
                    <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-green" /> Acesso Imediato ao SaaS
                    </span>
                    <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-green" /> Certificado Anual
                    </span>
                </div>
            </div>
        </section>
    );
}
