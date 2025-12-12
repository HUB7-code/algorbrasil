"use client";

import Link from "next/link";

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen w-full bg-[#131314] text-[#E3E3E3] font-sans">
            <div className="max-w-[800px] mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Header Actions */}
                <div className="mb-12">
                    <Link href="/register" className="inline-flex items-center gap-2 text-[#A8C7FA] hover:underline text-sm font-medium mb-8">
                        <span className="material-symbols-rounded">arrow_back</span>
                        Voltar para cadastro
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-normal leading-tight mb-4 text-[#E3E3E3]">Termos de Uso</h1>
                    <p className="text-[#C4C7C5] text-lg leading-relaxed">
                        Última atualização: 11 de Dezembro de 2025
                    </p>
                </div>

                {/* Content Container (Docs Style) */}
                <div className="space-y-12">

                    <LegalSection
                        number="01"
                        title="Aceite dos Termos"
                        text={
                            <>
                                Ao acessar a plataforma <strong>Algor Console</strong>, você concorda expressamente com estes termos.
                                O uso das ferramentas de diagnóstico implica no reconhecimento de que os relatórios gerados são ferramentas de apoio à decisão
                                e não constituem, por si só, certificação legal sem a validação de um auditor humano credenciado.
                            </>
                        }
                    />

                    <LegalSection
                        number="02"
                        title="Proteção de Dados e LGPD"
                        text="Em conformidade com a Lei 13.709/2018 (LGPD), estabelecemos as seguintes diretrizes para o tratamento de dados na plataforma:"
                    >
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-[#C4C7C5]">
                            <li><strong className="text-[#E3E3E3]">Titularidade:</strong> Você mantém a propriedade intelectual sobre os dados brutos inseridos.</li>
                            <li><strong className="text-[#E3E3E3]">Processamento:</strong> A Algor Brasil atua como Operadora e Controladora para benchmarking anonimizado.</li>
                            <li><strong className="text-[#E3E3E3]">Segurança:</strong> Criptografia AES-256 em repouso e TLS 1.3 em trânsito mandatórios.</li>
                        </ul>
                    </LegalSection>

                    <LegalSection
                        number="03"
                        title="Propriedade Intelectual"
                        text="A metodologia de cálculo de risco, os algoritmos de 'Neural Scoring' e a interface do sistema são propriedade exclusiva da Algor Brasil. É estritamente proibida a cópia, redistribuição, engenharia reversa ou sublicenciamento do código-fonte ou das regras de negócio."
                    />

                    <LegalSection
                        number="04"
                        title="Limitação de Responsabilidade"
                        text="A plataforma não garante 'imunidade jurídica' completa contra sanções da ANPD ou processos civis. Nosso objetivo é mitigar riscos técnicos e processuais através das melhores práticas da ISO 42001. A responsabilidade final pela implementação dos controles é da organização usuária."
                    />

                    {/* Highlight Box */}
                    <div className="rounded-[16px] bg-[#004A77]/20 border border-[#004A77] p-8">
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-rounded text-[#A8C7FA] text-2xl mt-1">verified_user</span>
                            <div>
                                <h4 className="text-lg font-medium text-[#D3E3FD] mb-2">Consentimento & Auditoria</h4>
                                <p className="text-sm text-[#A8C7FA]/80 leading-relaxed">
                                    Para fins de auditoria, todas as ações realizadas dentro do Console (criação de projetos, deleção de dados, alteração de scores)
                                    são registradas em logs imutáveis (Audit Trails), acessíveis às autoridades competentes mediante ordem judicial, garantindo a integridade do processo.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-20 pt-8 border-t border-[#444746] text-center text-sm text-[#8E918F]">
                    Departamento Jurídico Algor Brasil • São Paulo, SP
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
