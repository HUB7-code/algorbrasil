import { Shield, Users, Activity, Cpu } from "lucide-react";

export default function MembershipBenefits() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <span className="text-[#0B57D0] font-mono text-xs tracking-widest uppercase mb-4 block">
                    Associação de Elite
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1F1F1F] mb-6">
                    Por que se juntar ao ALGOR?
                </h2>
                <p className="font-sans text-[#444746] text-lg max-w-2xl mx-auto">
                    Acesso a ferramentas proprietárias, rede executiva e selo de conformidade reconhecido pelo mercado.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

                {/* Card 1 */}
                <div className="surface-card p-8 group">
                    <div className="w-14 h-14 bg-[#D3E3FD] rounded-2xl flex items-center justify-center mb-6 text-[#0B57D0]">
                        <Shield className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl mb-4 text-[#1F1F1F] font-bold">Autoridade Auditada</h3>
                    <p className="text-[#444746] leading-relaxed">
                        Diferencie-se. Membros recebem o selo <strong className="text-[#1F1F1F]">Verified ALGOR</strong>, sinalizando conformidade ética rigorosa para investidores e clientes.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="surface-card p-8 group">
                    <div className="w-14 h-14 bg-[#C4EED0] rounded-2xl flex items-center justify-center mb-6 text-[#146C2E]">
                        <Users className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl mb-4 text-[#1F1F1F] font-bold">Network C-Level</h3>
                    <p className="text-[#444746] leading-relaxed">
                        Acesso exclusivo a grupos de trabalho com reguladores e líderes de tecnologia. Participe ativamente da definição governamental.
                    </p>
                </div>

                {/* Card 3 - Tech Highlight */}
                <div className="surface-card p-8 group relative overflow-hidden border-[#0B57D0]/30 hover:border-[#0B57D0]">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-[#0B57D0] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Incluso</span>
                    </div>
                    <div className="w-14 h-14 bg-[#0A1A2F] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
                        <Cpu className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl mb-4 text-[#1F1F1F] font-bold">Acesso ao ALGOR OS</h3>
                    <p className="text-[#444746] leading-relaxed">
                        Uso irrestrito da plataforma SaaS para diagnósticos ISO 42001, auditoria algorítmica e gestão de risco contínua.
                    </p>
                </div>

            </div>
        </section>
    );
}
