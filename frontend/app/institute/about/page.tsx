import Link from 'next/link';
import { ArrowLeft, Users, Target, Award, BookOpen, Network, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Nossa Metodologia | Instituto ALGOR',
    description: 'Conheça a metodologia científica e a abordagem rigorosa do Instituto ALGOR para Governança de IA.',
};

export default function InstitutoAboutPage() {
    return (
        <div className="min-h-screen bg-[#050A10] text-white selection:bg-[#00FF94] selection:text-[#0A1A2F]">
            <Navbar />

            {/* Hero */}
            <header className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#00FF94]/10 to-transparent rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[length:50px_50px]" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/institute" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FF94] transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-mono uppercase tracking-widest">Voltar ao Instituto</span>
                    </Link>

                    <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Nossa <span className="text-[#00FF94]">Metodologia</span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                        O Instituto ALGOR opera na interseção entre ciência, regulação e prática empresarial,
                        traduzindo complexidade normativa em frameworks acionáveis.
                    </p>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="max-w-4xl mx-auto px-6 pb-20">

                {/* Seção: Missão */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-[#00FF94]/10 flex items-center justify-center">
                            <Target className="w-6 h-6 text-[#00FF94]" />
                        </div>
                        <h2 className="font-orbitron text-2xl font-bold">Missão</h2>
                    </div>
                    <div className="bg-[#0A111A]/80 border border-white/10 rounded-2xl p-8">
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Estabelecer o padrão de excelência em governança de Inteligência Artificial no Brasil,
                            formando a primeira geração de líderes capazes de implementar sistemas de IA auditáveis,
                            éticos e em conformidade com os mais rigorosos standards globais.
                        </p>
                    </div>
                </section>

                {/* Seção: Pilares */}
                <section className="mb-20">
                    <h2 className="font-orbitron text-2xl font-bold mb-8">Pilares de Atuação</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { icon: BookOpen, title: 'Pesquisa Aplicada', desc: 'White papers, estudos de caso e análises comparativas de frameworks globais de IA.' },
                            { icon: Shield, title: 'Normatização', desc: 'Contribuição técnica para legisladores e órgãos reguladores no Brasil.' },
                            { icon: Users, title: 'Formação de Elite', desc: 'Programas de certificação para auditores e implementadores de governança.' },
                            { icon: Network, title: 'Rede de Influência', desc: 'Conexão entre academia, indústria e governo para moldar o futuro da IA.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-[#0A111A]/60 border border-white/10 rounded-xl p-6 hover:border-[#00FF94]/30 transition-all">
                                <item.icon className="w-8 h-8 text-[#00A3FF] mb-4" />
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Seção: Conselho */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                            <Award className="w-6 h-6 text-[#8B5CF6]" />
                        </div>
                        <h2 className="font-orbitron text-2xl font-bold">Conselho Diretor</h2>
                    </div>
                    <div className="bg-gradient-to-br from-[#131B2A] to-[#0A111A] border border-white/10 rounded-2xl p-8">
                        <p className="text-gray-300 leading-relaxed mb-6">
                            O Instituto é governado por um conselho multidisciplinar composto por especialistas em:
                        </p>
                        <ul className="grid md:grid-cols-2 gap-4 text-sm">
                            {[
                                'Direito Digital e Regulação de IA',
                                'Gestão de Riscos Corporativos',
                                'Ética e Filosofia da Tecnologia',
                                'Engenharia de Machine Learning',
                                'Compliance e Auditoria',
                                'Políticas Públicas e Governança',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-400">
                                    <span className="w-2 h-2 rounded-full bg-[#00FF94]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center">
                    <div className="bg-[#0A111A]/80 border border-[#00FF94]/20 rounded-2xl p-10">
                        <h3 className="font-orbitron text-2xl font-bold mb-4">Quer fazer parte?</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Estamos sempre em busca de mentes brilhantes para contribuir com nossa missão.
                        </p>
                        <Link
                            href="/partners/apply"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00FF94] text-[#050A10] font-bold rounded-xl hover:bg-[#00CC76] transition-all"
                        >
                            Candidatar-se ao Conselho
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
