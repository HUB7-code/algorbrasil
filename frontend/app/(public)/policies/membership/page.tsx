"use client";

import Link from "next/link";

export default function MembershipPolicyPage() {
    return (
        <main className="min-h-screen w-full bg-[#131314] text-[#E3E3E3] font-sans">
            <div className="max-w-[800px] mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Header Actions */}
                <div className="mb-12">
                    <Link href="/register" className="inline-flex items-center gap-2 text-[#A8C7FA] hover:underline text-sm font-medium mb-8">
                        <span className="material-symbols-rounded">arrow_back</span>
                        Voltar para cadastro
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-normal leading-tight mb-4 text-[#E3E3E3]">Política de Membros</h1>
                    <p className="text-[#C4C7C5] text-lg leading-relaxed">
                        Diretrizes para governança e conduta ética dos associados.
                    </p>
                </div>

                {/* Content Container (Docs Style) */}
                <div className="space-y-12">

                    <LegalSection
                        number="01"
                        title="Premissas Fundamentais"
                        text={
                            <>
                                A associação ao Algor Brasil é restrita a profissionais e organizações comprometidos com a <strong>Ética na Inteligência Artificial</strong> e a conformidade com a norma <strong>ISO/IEC 42001</strong>. Todos os membros devem agir como guardiões da integridade tecnológica.
                            </>
                        }
                    />

                    <LegalSection
                        number="02"
                        title="Categorias de Associação"
                        text="O ecossistema divide-se em duas categorias principais de atuação:"
                    >
                        <ul className="list-disc pl-5 space-y-4 mt-4 text-[#C4C7C5]">
                            <li>
                                <strong className="text-[#E3E3E3] block mb-1">Membros Individuais (Auditores/Consultores)</strong>
                                Profissionais qualificados ou em formação para realizar diagnósticos de conformidade e avaliações de risco algorítmico.
                            </li>
                            <li>
                                <strong className="text-[#E3E3E3] block mb-1">Membros Corporativos</strong>
                                Organizações que buscam auditar seus próprios modelos, treinar suas equipes ou certificar fornecedores sob a tutela do framework Algor.
                            </li>
                        </ul>
                    </LegalSection>

                    <LegalSection
                        number="03"
                        title="Código de Conduta"
                        text="É mandatório o sigilo absoluto sobre dados sensíveis auditados. O uso da plataforma para espionagem industrial, engenharia reversa não autorizada ou qualquer prática 'Black Hat' resultará em expulsão imediata, revogação de credenciais e sanções legais cabíveis."
                    />

                    <LegalSection
                        number="04"
                        title="Certificação Contínua"
                        text="A manutenção do status de membro requer atualização constante. Os membros devem completar os ciclos de reciclagem anual sobre novas regulações (ex: PL 2338, EU AI Act) que serão disponibilizados através da Academia Algor."
                    />

                    {/* Highlight Box */}
                    <div className="rounded-[16px] bg-[#0F5223]/20 border border-[#0F5223] p-8">
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-rounded text-[#6DD58C] text-2xl mt-1">verified</span>
                            <div>
                                <h4 className="text-lg font-medium text-[#C4EED0] mb-2">Compromisso de Integridade</h4>
                                <p className="text-sm text-[#6DD58C]/80 leading-relaxed">
                                    Ao submeter sua solicitação de membresia, você declara sob as penas da lei que as informações fornecidas são verdadeiras
                                    e que não possui conflitos de interesse que impeçam sua atuação imparcial e ética no ecossistema de governança de IA.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-20 pt-8 border-t border-[#444746] text-center text-sm text-[#8E918F]">
                    Departamento de Compliance Algor Brasil • São Paulo, SP
                </div>

            </div>
        </main>
    );
}

function LegalSection({ number, title, text, children }: any) {
    return (
        <section>
            <div className="flex items-baseline gap-4 mb-4">
                <span className="text-sm font-mono text-[#A8C7FA] opacity-50">{number}</span>
                <h3 className="text-2xl font-normal text-[#E3E3E3]">{title}</h3>
            </div>
            <div className="pl-0 md:pl-10">
                <p className="text-[#C4C7C5] leading-8 text-[16px]">
                    {text}
                </p>
                {children}
            </div>
        </section>
    )
}
