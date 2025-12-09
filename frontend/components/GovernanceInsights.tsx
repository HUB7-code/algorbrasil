import { FileText, Scale, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GovernanceInsights() {
    return (
        <section className="relative z-10 w-full py-24 px-4 bg-brand-navy">
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                    Inteligência & <span className="text-brand-blue">Regulação</span>
                </h2>
                <p className="font-mono text-sm text-brand-blue/60 max-w-2xl mx-auto">
                    Mantenha-se à frente das mudanças regulatórias. Conteúdo exclusivo curado por nossos especialistas.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Isca 1: PL 2338 */}
                <InsightCard
                    category="Legislação"
                    title="PL 2338/23: O Marco Legal da IA no Brasil"
                    desc="Entenda os impactos da classificação de risco e a responsabilidade civil para empresas que desenvolvem ou utilizam IA."
                    icon={<Scale className="w-5 h-5 text-brand-green" />}
                    delay="delay-0"
                />

                {/* Isca 2: ISO 42001 */}
                <InsightCard
                    category="Normas Técnicas"
                    title="ISO 42001: Implementando o SGIA"
                    desc="Os pilares do Sistema de Gestão de Inteligência Artificial e como preparar sua organização para a certificação internacional."
                    icon={<ShieldAlert className="w-5 h-5 text-brand-amber" />}
                    delay="delay-100"
                />

                {/* Isca 3: Governança Corporativa */}
                <InsightCard
                    category="Estratégia"
                    title="Auditabilidade Algorítmica na Prática"
                    desc="Como documentar decisões de IA para evitar viés (bias) e garantir transparência perante stakeholders e reguladores."
                    icon={<FileText className="w-5 h-5 text-brand-blue" />}
                    delay="delay-200"
                />
            </div>

            <div className="mt-12 text-center">
                <Link href="#" className="inline-flex items-center gap-2 text-sm font-mono text-brand-green hover:underline hover:text-brand-green/80 transition-colors">
                    Ver Biblioteca de Conhecimento <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}

function InsightCard({ category, title, desc, icon, delay }: any) {
    return (
        <div className={`glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-blue/30 transition-all duration-300 group cursor-pointer hover:-translate-y-1 ${delay}`}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider bg-white/5 text-white/60 px-2 py-1 rounded border border-white/5">
                    {category}
                </span>
                {icon}
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-brand-blue transition-colors">
                {title}
            </h3>
            <p className="text-sm text-brand-blue/60 leading-relaxed mb-4">
                {desc}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-white/40 group-hover:text-white transition-colors">
                Ler Artigo Completo <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
}
