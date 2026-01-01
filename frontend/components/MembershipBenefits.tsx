import { Shield, Users, Activity, Cpu } from "lucide-react";

export default function MembershipBenefits() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <span className="text-[#00FF94] font-mono text-xs tracking-widest uppercase mb-4 block">
                    Associação de Elite
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                    Por que se juntar ao ALGOR?
                </h2>
                <p className="font-sans text-gray-400 text-lg max-w-2xl mx-auto">
                    Acesso a ferramentas proprietárias, rede executiva e selo de conformidade reconhecido pelo mercado.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

                {/* Card 1 */}
                <div className="relative p-8 rounded-2xl bg-[#131825]/50 border border-white/10 backdrop-blur-sm group hover:border-[#00FF94]/50 transition-all duration-300">
                    <div className="w-14 h-14 bg-[#00A3FF]/10 rounded-2xl flex items-center justify-center mb-6 text-[#00A3FF] group-hover:scale-110 transition-transform">
                        <Shield className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-xl mb-4 text-white font-bold group-hover:text-[#00FF94] transition-colors">Autoridade Auditada</h3>
                    <p className="text-gray-400 leading-relaxed font-sans">
                        Diferencie-se. Membros recebem o selo <strong className="text-white">Verified ALGOR</strong>, sinalizando conformidade ética rigorosa para investidores e clientes.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="relative p-8 rounded-2xl bg-[#131825]/50 border border-white/10 backdrop-blur-sm group hover:border-[#00FF94]/50 transition-all duration-300">
                    <div className="w-14 h-14 bg-[#00FF94]/10 rounded-2xl flex items-center justify-center mb-6 text-[#00FF94] group-hover:scale-110 transition-transform">
                        <Users className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-xl mb-4 text-white font-bold group-hover:text-[#00FF94] transition-colors">Network C-Level</h3>
                    <p className="text-gray-400 leading-relaxed font-sans">
                        Acesso exclusivo a grupos de trabalho com reguladores e líderes de tecnologia. Participe ativamente da definição governamental.
                    </p>
                </div>

                {/* Card 3 - Tech Highlight */}
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#131825] to-[#0A1A2F] border border-[#00FF94]/20 backdrop-blur-sm group hover:border-[#00FF94] transition-all duration-300 shadow-[0_0_30px_rgba(0,255,148,0.1)]">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-[#00FF94]/20 text-[#00FF94] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border border-[#00FF94]/30">Incluso</span>
                    </div>
                    <div className="w-14 h-14 bg-[#0A1A2F] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg border border-white/5 group-hover:border-[#00FF94]/30 transition-colors">
                        <Cpu className="w-7 h-7 text-[#00FF94]" />
                    </div>
                    <h3 className="font-display text-xl mb-4 text-white font-bold group-hover:text-[#00FF94] transition-colors">Acesso ao ALGOR OS</h3>
                    <p className="text-gray-400 leading-relaxed font-sans">
                        Uso irrestrito da plataforma SaaS para diagnósticos ISO 42001, auditoria algorítmica e gestão de risco contínua.
                    </p>
                </div>

            </div>
        </section>
    );
}
