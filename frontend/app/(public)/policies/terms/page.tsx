

export default function TermsPage() {
    return (
        <div className="animate-in fade-in duration-700">
            <h1 className="text-4xl md:text-5xl font-light mb-8 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                Termos de Uso
            </h1>

            <div className="bg-[#0A0E1A] border border-slate-800 rounded-xl p-6 mb-12">
                <p className="text-sm text-slate-400 mb-2"><strong>Última atualização:</strong> 24 de Dezembro de 2025</p>
                <p className="text-sm text-slate-400 mb-2"><strong>Versão:</strong> 2.2 (Enterprise SaaS)</p>
                <p className="text-sm text-slate-400"><strong>Vigência:</strong> Imediata</p>
            </div>

            {/* Índice Clicável */}
            <nav className="mb-16 bg-[#0A0E1A]/50 p-8 rounded-2xl border border-slate-800/50">
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <span className="material-symbols-rounded text-[#00A3FF]">list</span>
                    Índice
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <li><a href="#aceitacao" className="hover:text-[#00A3FF] transition-colors">1. Aceitação dos Termos</a></li>
                    <li><a href="#servicos" className="hover:text-[#00A3FF] transition-colors">2. Descrição dos Serviços</a></li>
                    <li><a href="#acesso" className="hover:text-[#00A3FF] transition-colors">3. Acesso e Responsabilidades</a></li>
                    <li><a href="#propriedade" className="hover:text-[#00A3FF] transition-colors">4. Propriedade Intelectual</a></li>
                    <li><a href="#ia-disclaimer" className="hover:text-[#00A3FF] transition-colors">5. Governança de IA (Disclaimer)</a></li>
                    <li><a href="#pagamentos" className="hover:text-[#00A3FF] transition-colors">6. Planos e Faturamento</a></li>
                    <li><a href="#slas" className="hover:text-[#00A3FF] transition-colors">7. SLAs e Suporte</a></li>
                    <li><a href="#responsabilidade" className="hover:text-[#00A3FF] transition-colors">8. Limitação de Responsabilidade</a></li>
                    <li><a href="#privacidade" className="hover:text-[#00A3FF] transition-colors">9. Privacidade e Dados</a></li>
                    <li><a href="#foro" className="hover:text-[#00A3FF] transition-colors">10. Disposições Finais e Foro</a></li>
                </ul>
            </nav>

            <div className="space-y-16">

                <section id="aceitacao">
                    <h2>1. Aceitação dos Termos</h2>
                    <p>
                        Bem-vindo à <strong>ALGOR BRASIL</strong> (ALGOR TECNOLOGIA LTDA, CNPJ [A DEFINIR]).
                        Ao criar uma conta, acessar ou utilizar nossa plataforma de Governança de IA ("Plataforma", "SaaS", "API"), você concorda expressamente com estes Termos de Uso ("Termos").
                    </p>
                    <p>
                        Se você estiver aceitando estes Termos em nome de uma pessoa jurídica (empresa), você declara e garante que possui plenos poderes para representá-la e obrigá-la a estes Termos.
                    </p>
                </section>

                <section id="servicos">
                    <h2>2. Descrição dos Serviços</h2>
                    <p>
                        A ALGOR fornece soluções de software B2B ("Software-as-a-Service") focadas em governança, risco e conformidade (GRC) para Inteligência Artificial. Nossos serviços incluem:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                        <li><strong>Algor Scanner:</strong> Análise automatizada de vulnerabilidades em LLMs.</li>
                        <li><strong>AI Guardrails:</strong> Filtros de entrada/saída em tempo real para APIs de IA.</li>
                        <li><strong>Trust Hub:</strong> Painel de gestão de evidências e conformidade (ISO 42001, EU AI Act).</li>
                        <li><strong>Consultoria Técnica:</strong> Suporte especializado em implementação de governança.</li>
                    </ul>
                </section>

                <section id="acesso">
                    <h2>3. Acesso e Responsabilidades da Conta</h2>
                    <h3>3.1 Uso Aceitável</h3>
                    <p>Você concorda em NÃO utilizar a Plataforma para:</p>
                    <div className="bg-rose-900/10 border border-rose-500/20 p-6 rounded-xl mt-4 mb-6">
                        <ul className="space-y-2 text-rose-200/80 text-sm">
                            <li className="flex gap-2"><span className="text-rose-500">✖</span> Processar dados ilícitos, discriminatórios ou que violem direitos humanos;</li>
                            <li className="flex gap-2"><span className="text-rose-500">✖</span> Tentar engenharia reversa, decompilar ou copiar o código-fonte da ALGOR;</li>
                            <li className="flex gap-2"><span className="text-rose-500">✖</span> Realizar testes de carga ou penetração sem autorização prévia por escrito;</li>
                            <li className="flex gap-2"><span className="text-rose-500">✖</span> Compartilhar credenciais de acesso (o login é pessoal e intransferível).</li>
                        </ul>
                    </div>
                </section>

                <section id="propriedade">
                    <h2>4. Propriedade Intelectual</h2>
                    <p>
                        <strong>Da ALGOR:</strong> A Plataforma, algoritmos de scoring, metodologias proprietárias, design visual e código-fonte são de propriedade exclusiva da ALGOR. Você recebe uma licença limitada, revogável e não-exclusiva de uso durante a vigência do contrato.
                    </p>
                    <p>
                        <strong>Do Cliente:</strong> Você mantém total propriedade sobre seus Dados (Inputs), Dados de Negócio e os Modelos de IA treinados (Fine-tuning) criados por você. A ALGOR não reivindica propriedade sobre o seu conteúdo.
                    </p>
                </section>

                <section id="ia-disclaimer">
                    <div className="bg-amber-900/10 border border-amber-500/20 p-6 rounded-xl">
                        <h4 className="text-amber-500 font-medium mb-3 flex items-center gap-2">
                            <span className="material-symbols-rounded">warning</span>
                            5. Natureza dos Relatórios de IA (Disclaimer)
                        </h4>
                        <p className="text-amber-200/80 text-sm leading-relaxed mb-4">
                            A ALGOR fornece ferramentas técnicas de suporte à decisão. Nossos relatórios de risco ("Risk Scoring") e diagnósticos de conformidade são baseados em heurísticas e padrões de mercado, mas <strong>NÃO CONSTITUEM ACONSELHAMENTO JURÍDICO FORMAL</strong>.
                        </p>
                        <p className="text-amber-200/80 text-sm leading-relaxed">
                            A decisão final sobre o lançamento ou uso de um sistema de IA, bem como a conformidade legal do mesmo, é de responsabilidade exclusiva do Cliente. Recomendamos sempre a validação dos relatórios por seu departamento jurídico ou DPO.
                        </p>
                    </div>
                </section>

                <section id="pagamentos">
                    <h2>6. Planos e Faturamento</h2>
                    <p>
                        O acesso a funcionalidades é regido pelo plano contratado (Start, Growth ou Enterprise).
                        O não pagamento das faturas pode resultar na suspensão temporária ou no cancelamento definitivo do acesso à Plataforma após notificação de 15 dias.
                    </p>
                </section>

                <section id="slas">
                    <h2>7. SLAs e Níveis de Serviço</h2>
                    <div className="overflow-x-auto not-prose mt-6">
                        <table className="w-full text-left text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                            <thead className="bg-[#0A0E1A] text-slate-200">
                                <tr>
                                    <th className="p-4 border-b border-slate-800">Plano</th>
                                    <th className="p-4 border-b border-slate-800">Disponibilidade (Uptime)</th>
                                    <th className="p-4 border-b border-slate-800">Tempo de Resposta (Suporte)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-[#050810]">
                                <tr><td className="p-4 font-medium text-white">Start / Gratuito</td><td className="p-4">99.0% (Best Effort)</td><td className="p-4">Até 48h úteis (Email)</td></tr>
                                <tr><td className="p-4 font-medium text-white">Growth</td><td className="p-4">99.5%</td><td className="p-4">Até 8h úteis (Email/Chat)</td></tr>
                                <tr><td className="p-4 font-medium text-white">Enterprise</td><td className="p-4">99.9% (SLA Garantido)</td><td className="p-4">Até 4h (Gerente Dedicado)</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="responsabilidade">
                    <h2>8. Limitação de Responsabilidade</h2>
                    <p>
                        Na extensão máxima permitida pela lei brasileira, a ALGOR não será responsável por danos indiretos, lucros cessantes, perda de dados decorrente de falha operacional do Cliente ou interrupções de serviço de terceiros (ex: queda da AWS ou OpenAI).
                    </p>
                    <p>
                        A responsabilidade total acumulada da ALGOR será limitada ao valor total pago pelo Cliente nos 12 (doze) meses anteriores ao evento gerador do dano.
                    </p>
                </section>

                <section id="privacidade">
                    <h2>9. Privacidade e Proteção de Dados</h2>
                    <p>
                        O tratamento de dados pessoais é regido por nossa <a href="/policies/privacy">Política de Privacidade</a>, que é parte integrante destes Termos.
                        Ambas as partes se comprometem a cumprir integralmente a Lei Geral de Proteção de Dados (LGPD).
                    </p>
                    <div className="bg-[#0A0E1A] p-4 rounded-lg border border-slate-800 mt-4 flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Dúvidas sobre dados?</span>
                        <a href="/policies/dpo" className="text-[#00A3FF] text-sm hover:underline font-medium">Acessar Canal do DPO →</a>
                    </div>
                </section>

                <section id="foro">
                    <h2>10. Disposições Finais e Foro</h2>
                    <p>
                        Estes Termos são regidos pelas leis da República Federativa do Brasil.
                        Fica eleito o foro da Comarca de <strong>São Paulo/SP</strong> para dirimir quaisquer controvérsias oriundas destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
                    </p>
                </section>

                <hr className="border-slate-800 my-12" />

                <div className="text-sm text-slate-500 font-mono">
                    <p className="mb-1"><strong>ALGOR TECNOLOGIA LTDA</strong></p>
                    <p className="mb-1">Av. Paulista, 1106 - Bela Vista, São Paulo - SP</p>
                    <p>Contato Legal: <a href="mailto:legal@algor.com.br" className="text-[#00A3FF]">legal@algor.com.br</a></p>
                </div>

            </div>
        </div>
    );
}

