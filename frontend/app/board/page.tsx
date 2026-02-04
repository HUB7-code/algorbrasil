import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Linkedin, Mail, Award, Network } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
    title: 'Conselho Diretor | ALGOR Brasil',
    description: 'Conheça os líderes e especialistas que compõem o conselho da ALGOR Brasil Association.',
};

const boardMembers = [
    {
        name: 'Paulo Carvalho',
        role: 'Presidente',
        image: '/images/membro_01_paulo_carvalho.webp',
        linkedin: 'https://www.linkedin.com/in/paulocarvalho11/',
        bio: 'Líder visionário em Governança de IA e Algoritmos.'
    },
    {
        name: 'Orlando Pavani',
        role: 'Coordenador Nacional',
        image: '/images/membro_02_orlando_pavani.webp',
        linkedin: 'https://www.linkedin.com/in/orlandopavani/',
        bio: 'Referência em Gestão e Processos Organizacionais.'
    },
    {
        name: 'Jesus Silva',
        role: 'Gestor Regional - Brasília',
        image: '/images/membro_03_jesus_silva.webp',
        linkedin: '#'
    },
    {
        name: 'Carlos Coan',
        role: 'Gestor Regional - São Paulo',
        image: '/images/membro_05_carlos_coan.webp',
        linkedin: 'https://www.linkedin.com/in/carloscoan/'
    },
    {
        name: 'Evaldo Reinas',
        role: 'Gestor Regional - Paraná',
        image: '/images/membro_06_evaldo_reinas.webp',
        linkedin: 'https://www.linkedin.com/in/evaldo-reinas-2-54aa37153/'
    },
    {
        name: 'Fábio Ban',
        role: 'Delegado Regional - Paraná',
        image: '/images/membro_07_fabio_ban.webp',
        linkedin: 'https://www.linkedin.com/in/fabioban/'
    },
    {
        name: 'José Ricardo',
        role: 'Gestor Regional - Rio de Janeiro',
        image: '/images/membro_08_jose_ricardo.webp',
        linkedin: '#'
    },
    {
        name: 'Jarison Melo',
        role: 'Gestor Regional - Ceará',
        image: '/images/membro_09_jarison_melo.webp',
        linkedin: 'https://www.linkedin.com/in/jarisonmelo-ai-governance/'
    },
    {
        name: 'Marci Dantas',
        role: 'Delegada Regional - Fortaleza CE',
        image: '/images/membro_10_marci_dantas.webp',
        linkedin: 'https://www.linkedin.com/in/marcidantas-ia-governanca/'
    },
    {
        name: 'Edisio Nascimento',
        role: 'Gestor Regional - Paraíba',
        image: '/images/membro_11_edisio_nascimento.webp',
        linkedin: 'https://www.linkedin.com/in/edisio-consultor/'
    }
];

export default function BoardPage() {
    return (
        <div className="min-h-screen bg-[#050A10] text-white selection:bg-[#00FF94] selection:text-[#0A1A2F]">
            <Navbar />

            <main className="pt-32 pb-20">
                {/* Header */}
                <div className="text-center mb-20 px-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[120px] pointer-events-none" />

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00FF94] text-xs font-mono tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
                        <Award className="w-4 h-4" />
                        Liderança Visionária
                    </div>

                    <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
                        Quem <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00A3FF]">Deixa o Legado</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Unimos as mentes mais  brilhantes da regulação, tecnologia e gestão para moldar o futuro da Inteligência Artificial no Brasil.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {boardMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className={`group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-transparent hover:from-[#00FF94]/50 hover:to-[#00A3FF]/50 transition-all duration-500
                            ${member.role === 'Presidente' ? 'lg:col-span-3 lg:w-2/3 lg:mx-auto lg:aspect-[2.5/1]' : ''}
                            `}
                        >
                            <div className={`relative h-full bg-[#0A111A] rounded-[15px] overflow-hidden flex flex-col ${member.role === 'Presidente' ? 'lg:flex-row lg:items-center' : ''}`}>

                                {/* Image Container */}
                                <div className={`relative overflow-hidden ${member.role === 'Presidente' ? 'w-full lg:w-1/2 h-80 lg:h-full' : 'aspect-square w-full'}`}>
                                    <div className="absolute inset-0 bg-[#00FF94]/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF94]/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />
                                </div>

                                {/* Content */}
                                <div className={`p-8 flex flex-col justify-center ${member.role === 'Presidente' ? 'lg:w-1/2' : ''}`}>
                                    <div className="mb-4">
                                        <span className="text-[#00FF94] font-mono text-xs uppercase tracking-widest">{member.role}</span>
                                        <h3 className="text-2xl font-bold font-orbitron text-white mt-1 group-hover:text-[#00FF94] transition-colors">{member.name}</h3>
                                    </div>

                                    {member.bio && (
                                        <p className="text-gray-400 text-sm mb-6 leading-relaxed border-l-2 border-white/10 pl-4">
                                            {member.bio}
                                        </p>
                                    )}

                                    <div className="mt-auto flex gap-4 pt-4 border-t border-white/5">
                                        <a href={member.linkedin} className="text-gray-500 hover:text-[#0077b5] transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                        {member.role === 'Presidente' && (
                                            <div className="ml-auto flex items-center gap-2 text-[#00FF94] text-xs font-bold uppercase tracking-widest">
                                                <Network className="w-4 h-4" /> Founding Member
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
