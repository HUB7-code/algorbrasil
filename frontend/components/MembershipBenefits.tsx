import { Shield, Users, Activity, Cpu } from "lucide-react";

export default function MembershipBenefits() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32 pt-24">
            <div className="grid md:grid-cols-3 gap-6">

                {/* Card 1 */}
                <div className="glass-panel p-8 rounded-xl group transition-all duration-300">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:text-[#00FF94] transition-colors text-white">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl mb-3 text-white">Autoridade Auditada</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Diferencie-se no mercado. Membros recebem o selo <span className="text-white font-medium">Verified ALGOR</span>, sinalizando conformidade com padrões éticos rigorosos.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="glass-panel p-8 rounded-xl group transition-all duration-300">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:text-[#00FF94] transition-colors text-white">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl mb-3 text-white">Network de Elite</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Acesso exclusivo a grupos de trabalho com C-Levels e reguladores. Participe ativamente da definição dos rumos da IA no Brasil.
                    </p>
                </div>

                {/* Card 3 - Tech Highlight */}
                <div className="glass-panel p-8 rounded-xl group relative overflow-hidden transition-all duration-300 hover:border-brand-blue/30">
                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Activity className="w-24 h-24 text-[#00A3FF]" />
                    </div>
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-[#00A3FF]">
                        <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl mb-3 text-white">Acesso ao ALGOR OS</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Uso irrestrito da nossa plataforma SaaS para diagnósticos ISO 42001, auditoria algorítmica e gestão de risco contínua.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-[#00A3FF] text-xs font-mono uppercase tracking-widest">
                        <span className="w-2 h-2 bg-[#00A3FF] rounded-full animate-pulse"></span>
                        Sistema Operacional Incluso
                    </div>
                </div>

            </div>
        </section>
    );
}
