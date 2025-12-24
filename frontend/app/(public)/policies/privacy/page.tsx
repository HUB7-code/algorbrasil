
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="animate-in fade-in duration-700">
            <h1 className="text-4xl md:text-5xl font-light mb-8 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                Política de Privacidade
            </h1>

            <div className="bg-[#0A0E1A] border border-slate-800 rounded-xl p-6 mb-12">
                <p className="text-sm text-slate-400 mb-2"><strong>Última atualização:</strong> 24 de Dezembro de 2025</p>
                <p className="text-sm text-slate-400 mb-2"><strong>Versão:</strong> 1.0.2 (Auditada)</p>
                <p className="text-sm text-slate-400"><strong>Vigência:</strong> Imediata</p>
            </div>

            {/* Índice Clicável */}
            <nav className="mb-16 bg-[#0A0E1A]/50 p-8 rounded-2xl border border-slate-800/50">
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <span className="material-symbols-rounded text-[#00A3FF]">list</span>
                    Índice
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <li><a href="#quem-somos" className="hover:text-[#00A3FF] transition-colors">1. Quem Somos</a></li>
                    <li><a href="#definicoes" className="hover:text-[#00A3FF] transition-colors">2. Definições Importantes</a></li>
                    <li><a href="#dados-coletados" className="hover:text-[#00A3FF] transition-colors">3. Dados que Coletamos</a></li>
                    <li><a href="#como-coletamos" className="hover:text-[#00A3FF] transition-colors">4. Como Coletamos</a></li>
                    <li><a href="#finalidades" className="hover:text-[#00A3FF] transition-colors">5. Finalidades (Uso)</a></li>
                    <li><a href="#base-legal" className="hover:text-[#00A3FF] transition-colors">6. Base Legal</a></li>
                    <li><a href="#compartilhamento" className="hover:text-[#00A3FF] transition-colors">7. Compartilhamento</a></li>
                    <li><a href="#transferencia" className="hover:text-[#00A3FF] transition-colors">8. Transferência Int.</a></li>
                    <li><a href="#retencao" className="hover:text-[#00A3FF] transition-colors">9. Retenção de Dados</a></li>
                    <li><a href="#direitos" className="hover:text-[#00A3FF] transition-colors">10. Seus Direitos</a></li>
                    <li><a href="#seguranca" className="hover:text-[#00A3FF] transition-colors">12. Segurança</a></li>
                    <li><a href="#cookies" className="hover:text-[#00A3FF] transition-colors">13. Cookies</a></li>
                    <li><a href="#menores" className="hover:text-[#00A3FF] transition-colors">14. Menores</a></li>
                    <li><a href="#contato" className="hover:text-[#00A3FF] transition-colors">16. Contato (DPO)</a></li>
                </ul>
            </nav>

            <div className="space-y-16">
                <section id="quem-somos">
                    <h2>1. Quem Somos</h2>
                    <p>
                        A <strong>ALGOR TECNOLOGIA LTDA.</strong>, inscrita no CNPJ sob o nº [A DEFINIR], com sede na Av. Paulista, 1106 - Bela Vista, São Paulo - SP, é uma plataforma de governança e compliance para APIs de Inteligência Artificial.
                    </p>
                    <p>
                        Para os fins desta Política de Privacidade, a ALGOR atua como <strong>Controladora</strong> dos dados pessoais tratados, conforme definição do Art. 5º, inciso VI da LGPD.
                    </p>
                </section>

                <section id="definicoes">
                    <h2>2. Definições Importantes</h2>
                    <p>Para facilitar o entendimento desta política, definimos:</p>
                    <div className="overflow-x-auto not-prose mt-6">
                        <table className="w-full text-left text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                            <thead className="bg-[#0A0E1A] text-slate-200">
                                <tr>
                                    <th className="p-4 border-b border-slate-800 w-1/4">Termo</th>
                                    <th className="p-4 border-b border-slate-800">Significado (LGPD)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-[#050810]">
                                <tr><td className="p-4 font-medium text-white">Dado Pessoal</td><td className="p-4">Informação relacionada a pessoa natural identificada ou identificável (Art. 5º, I)</td></tr>
                                <tr><td className="p-4 font-medium text-white">Titular</td><td className="p-4">Pessoa natural a quem se referem os dados pessoais (Art. 5º, V)</td></tr>
                                <tr><td className="p-4 font-medium text-white">Controlador</td><td className="p-4">Quem toma as decisões sobre o tratamento (ALGOR) (Art. 5º, VI)</td></tr>
                                <tr><td className="p-4 font-medium text-white">Operador</td><td className="p-4">Quem realiza o tratamento em nome do controlador (fornecedores) (Art. 5º, VII)</td></tr>
                                <tr><td className="p-4 font-medium text-white">Anonimização</td><td className="p-4">Processo que torna impossível identificar o titular (Art. 5º, XI)</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="dados-coletados">
                    <h2>3. Dados Pessoais que Coletamos</h2>

                    <h3>3.1 Dados Cadastrais</h3>
                    <div className="overflow-x-auto not-prose my-6">
                        <table className="w-full text-left text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                            <thead className="bg-[#0A0E1A] text-slate-200">
                                <tr>
                                    <th className="p-4 border-b border-slate-800">Dado</th>
                                    <th className="p-4 border-b border-slate-800">Obrigatório?</th>
                                    <th className="p-4 border-b border-slate-800">Base Legal</th>
                                    <th className="p-4 border-b border-slate-800">Finalidade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-[#050810]">
                                <tr>
                                    <td className="p-4 font-medium text-white">Nome completo</td>
                                    <td className="p-4 text-[#00FF94]">Sim</td>
                                    <td className="p-4">Execução de contrato</td>
                                    <td className="p-4">Identificação e gestão da conta</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-white">Email corporativo</td>
                                    <td className="p-4 text-[#00FF94]">Sim</td>
                                    <td className="p-4">Execução de contrato</td>
                                    <td className="p-4">Login, comunicação, suporte</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-white">Cargo/Empresa</td>
                                    <td className="p-4 text-slate-500">Não</td>
                                    <td className="p-4">Legítimo Interesse</td>
                                    <td className="p-4">Personalização da experiência B2B</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="como-coletamos">
                    <h2>4. Como Coletamos Seus Dados</h2>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                        <li><strong>Diretamente de você:</strong> Quando você cria uma conta, preenche formulários ou entra em contato conosco.</li>
                        <li><strong>Automaticamente:</strong> Através de cookies, logs de acesso e metadados de uso da plataforma.</li>
                        <li><strong>De terceiros:</strong> Parceiros de autenticação (ex: Google, GitHub) ou enriquecimento de dados corporativos.</li>
                    </ul>
                </section>

                <section id="finalidades">
                    <h2>5. Para Que Usamos Seus Dados</h2>
                    <div className="overflow-x-auto not-prose mt-6">
                        <table className="w-full text-left text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                            <thead className="bg-[#0A0E1A] text-slate-200">
                                <tr>
                                    <th className="p-4 border-b border-slate-800">Finalidade Específica</th>
                                    <th className="p-4 border-b border-slate-800">Dados Utilizados</th>
                                    <th className="p-4 border-b border-slate-800">Base Legal (Art. 7º)</th>
                                    <th className="p-4 border-b border-slate-800 text-center">Pode Opor-se?</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-[#050810]">
                                <tr>
                                    <td className="p-4 font-medium text-white">Prestação dos Serviços (SaaS e API)</td>
                                    <td className="p-4">Cadastrais, Logs, Inputs de IA</td>
                                    <td className="p-4 text-[#00FF94]">V. Execução de Contrato</td>
                                    <td className="p-4 text-center text-rose-500">Não</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-white">Segurança e Prevenção à Fraude</td>
                                    <td className="p-4">IP, Device ID, Comportamento</td>
                                    <td className="p-4 text-[#00FF94]">IX. Legítimo Interesse</td>
                                    <td className="p-4 text-center text-rose-500">Não</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-white">Marketing e Newsletter</td>
                                    <td className="p-4">Email, Nome</td>
                                    <td className="p-4 text-[#00A3FF]">I. Consentimento</td>
                                    <td className="p-4 text-center text-[#00FF94]">Sim (Opt-out)</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-white">Cumprimento Legal (Marco Civil)</td>
                                    <td className="p-4">IP, Porta Lógica, Data/Hora</td>
                                    <td className="p-4 text-amber-500">II. Obrigação Legal</td>
                                    <td className="p-4 text-center text-rose-500">Não</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="base-legal">
                    <h2>6. Base Legal do Tratamento</h2>
                    <p className="mb-6">
                        A LGPD exige que tenhamos uma base legal para cada tratamento. As principais que utilizamos são:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                        <div className="bg-[#0A0A15] p-6 rounded-xl border border-slate-800 hover:border-[#00FF94]/30 transition-colors group">
                            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#00FF94]"></span> I. Consentimento
                            </h4>
                            <p className="text-sm text-slate-400">
                                Quando você concorda livremente (ex: assinar newsletter). Pode ser revogado a qualquer momento.
                            </p>
                        </div>
                        <div className="bg-[#0A0A15] p-6 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-colors group">
                            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span> II. Obrigação Legal
                            </h4>
                            <p className="text-sm text-slate-400">
                                Quando a lei nos obriga (ex: guardar logs por 6 meses conforme Marco Civil).
                            </p>
                        </div>
                        <div className="bg-[#0A0A15] p-6 rounded-xl border border-slate-800 hover:border-[#00A3FF]/30 transition-colors group">
                            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#00A3FF]"></span> V. Execução de Contrato
                            </h4>
                            <p className="text-sm text-slate-400">
                                Necessário para entregar o serviço que você contratou (ex: processar seu pagamento, liberar acesso).
                            </p>
                        </div>
                        <div className="bg-[#0A0A15] p-6 rounded-xl border border-slate-800 hover:border-purple-500/30 transition-colors group">
                            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span> IX. Legítimo Interesse
                            </h4>
                            <p className="text-sm text-slate-400">
                                Para fins legítimos da empresa, como segurança do sistema e melhoria do produto, sempre respeitando seus direitos.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="compartilhamento">
                    <h2>7. Compartilhamento de Dados</h2>
                    <p>
                        Não vendemos seus dados. Compartilhamos apenas com parceiros essenciais para a operação, sob rígidos contratos de confidencialidade e DPA (Data Processing Agreements).
                    </p>

                    <h3>7.1 Infraestrutura e Cloud</h3>
                    <div className="overflow-x-auto not-prose my-4">
                        <table className="w-full text-left text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                            <thead className="bg-[#0A0E1A] text-slate-200">
                                <tr>
                                    <th className="p-3 border-b border-slate-800">Parceiro</th>
                                    <th className="p-3 border-b border-slate-800">Finalidade</th>
                                    <th className="p-3 border-b border-slate-800">DPA Assinado?</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-[#050810]">
                                <tr><td className="p-3 text-white">AWS (Amazon)</td><td className="p-3">Hospedagem e Banco de Dados</td><td className="p-3 text-[#00FF94]">Sim / Termos Padrão</td></tr>
                                <tr><td className="p-3 text-white">Vercel</td><td className="p-3">Frontend e Edge Network</td><td className="p-3 text-[#00FF94]">Sim</td></tr>
                                <tr><td className="p-3 text-white">Supabase</td><td className="p-3">Autenticação e Database</td><td className="p-3 text-[#00FF94]">Sim</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>7.2 Provedores de IA (Subprocessadores)</h3>
                    <div className="overflow-x-auto not-prose my-4">
                        <table className="w-full text-left text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                            <thead className="bg-[#0A0E1A] text-slate-200">
                                <tr>
                                    <th className="p-3 border-b border-slate-800">Parceiro</th>
                                    <th className="p-3 border-b border-slate-800">Serviço</th>
                                    <th className="p-3 border-b border-slate-800">Localização</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-[#050810]">
                                <tr><td className="p-3 text-white">OpenAI</td><td className="p-3">LLM (GPT-4)</td><td className="p-3">EUA</td></tr>
                                <tr><td className="p-3 text-white">Anthropic</td><td className="p-3">LLM (Claude 3.5)</td><td className="p-3">EUA</td></tr>
                                <tr><td className="p-3 text-white">Microsoft Azure</td><td className="p-3">Azure OpenAI (Enterprise)</td><td className="p-3">EUA / UE</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-[#0A0E1A] border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
                        <p className="text-xs text-amber-500/90 leading-relaxed mb-0">
                            <strong>Atenção:</strong> Ao utilizar nossas ferramentas de Scanner e Chat, os dados inseridos (prompts) são processados por estes fornecedores. Recomendamos não inserir dados pessoais sensíveis ou segredos industriais nos prompts, a menos que configurado o ambiente Enterprise Privado.
                        </p>
                    </div>
                </section>

                <section id="transferencia">
                    <h2>8. Transferência Internacional</h2>
                    <div className="bg-[#0A0A15] border border-slate-800 p-6 rounded-xl">
                        <p className="mb-4">
                            Podemos transferir seus dados pessoais para países fora do Brasil, principalmente para fins de processamento por nossos fornecedores de IA e infraestrutura em nuvem (ex: EUA, UE).
                        </p>
                        <h4 className="text-white font-medium mb-2">Garantias de Proteção (Art. 33 LGPD)</h4>
                        <ul className="list-disc pl-5 space-y-2 text-slate-400">
                            <li>Países com nível de proteção de dados adequado (ex: GDPR na Europa);</li>
                            <li>Cláusulas Contratuais Padrão (SCCs) aprovadas;</li>
                            <li>Normas Corporativas Globais (BCRs).</li>
                        </ul>
                    </div>
                </section>

                <section id="retencao">
                    <h2>9. Tempo de Retenção</h2>
                    <p>
                        Manteremos seus dados apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, inclusive para fins de cumprimento de obrigações legais, contratuais, ou solicitação de autoridades competentes.
                    </p>
                    <div className="overflow-x-auto not-prose my-6">
                        <table className="w-full text-left text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                            <thead className="bg-[#0A0E1A] text-slate-200">
                                <tr>
                                    <th className="p-4 border-b border-slate-800">Tipo de Dado</th>
                                    <th className="p-4 border-b border-slate-800">Prazo de Retenção</th>
                                    <th className="p-4 border-b border-slate-800">Justificativa</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-[#050810]">
                                <tr>
                                    <td className="p-4 text-white">Logs de Acesso (IP, Hora)</td>
                                    <td className="p-4">6 meses</td>
                                    <td className="p-4">Marco Civil da Internet (Art. 15)</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-white">Dados da Conta</td>
                                    <td className="p-4">Vigência + 5 anos</td>
                                    <td className="p-4">Prescrição Cível / Defesa Legal</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-white">Dados Financeiros</td>
                                    <td className="p-4">5 anos</td>
                                    <td className="p-4">Código Tributário Nacional</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="direitos">
                    <h2>10. Seus Direitos (Art. 18 LGPD)</h2>
                    <p>Você tem total controle sobre seus dados. A qualquer momento, você pode solicitar via <a href="/policies/dpo">Canal do DPO</a>:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-[#0A0A15] p-4 rounded-lg border border-slate-800 flex items-start gap-3">
                            <div className="mt-1 text-[#00A3FF] shrink-0"><span className="material-symbols-rounded">visibility</span></div>
                            <div><h4 className="text-white text-sm font-medium">Confirmação e Acesso</h4><p className="text-xs text-slate-400 mt-1">Saber se tratamos seus dados e ter uma cópia deles.</p></div>
                        </div>
                        <div className="bg-[#0A0A15] p-4 rounded-lg border border-slate-800 flex items-start gap-3">
                            <div className="mt-1 text-[#00A3FF] shrink-0"><span className="material-symbols-rounded">edit</span></div>
                            <div><h4 className="text-white text-sm font-medium">Correção</h4><p className="text-xs text-slate-400 mt-1">Corrigir dados incompletos, inexatos ou desatualizados.</p></div>
                        </div>
                        <div className="bg-[#0A0A15] p-4 rounded-lg border border-slate-800 flex items-start gap-3">
                            <div className="mt-1 text-[#00A3FF] shrink-0"><span className="material-symbols-rounded">delete</span></div>
                            <div><h4 className="text-white text-sm font-medium">Eliminação e Anonimização</h4><p className="text-xs text-slate-400 mt-1">Pedir a exclusão de dados desnecessários ou tratados com consentimento.</p></div>
                        </div>
                        <div className="bg-[#0A0A15] p-4 rounded-lg border border-slate-800 flex items-start gap-3">
                            <div className="mt-1 text-[#00A3FF] shrink-0"><span className="material-symbols-rounded">move_up</span></div>
                            <div><h4 className="text-white text-sm font-medium">Portabilidade</h4><p className="text-xs text-slate-400 mt-1">Levar seus dados para outro fornecedor (quando regulamentado).</p></div>
                        </div>
                    </div>
                </section>

                <section id="seguranca">
                    <h2>12. Segurança da Informação</h2>
                    <p>
                        Levamos a segurança dos seus dados <strong>muito a sério</strong>. Implementamos múltiplas camadas de proteção técnica e organizacional.
                    </p>

                    <h3>12.1 Medidas Técnicas</h3>
                    <div className="overflow-x-auto not-prose my-6">
                        <table className="w-full text-left text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                            <thead className="bg-[#0A0E1A] text-slate-200">
                                <tr>
                                    <th className="p-4 border-b border-slate-800">Camada</th>
                                    <th className="p-4 border-b border-slate-800">Tecnologia / Padrão</th>
                                    <th className="p-4 border-b border-slate-800">Aplicação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-[#050810]">
                                <tr><td className="p-4 font-medium text-white">Criptografia em Trânsito</td><td className="p-4 text-[#00FF94]">TLS 1.3</td><td className="p-4">Todas as conexões (HTTPS)</td></tr>
                                <tr><td className="p-4 font-medium text-white">Criptografia em Repouso</td><td className="p-4 text-[#00FF94]">AES-256</td><td className="p-4">Banco de dados e Backups</td></tr>
                                <tr><td className="p-4 font-medium text-white">Hashing de Senhas</td><td className="p-4 text-[#00FF94]">Bcrypt (Cost 12)</td><td className="p-4">Credenciais de Usuário</td></tr>
                                <tr><td className="p-4 font-medium text-white">Proteção de Borda</td><td className="p-4 text-[#00FF94]">WAF & DDoS Mitigation</td><td className="p-4">Cloudflare Enterprise</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                        <div className="bg-[#0A0E1A] p-4 rounded-lg border border-slate-800">
                            <h4 className="text-white font-medium mb-2 flex gap-2"><span className="text-[#00FF94]">✓</span> Controles de Acesso</h4>
                            <p className="text-sm text-slate-400">MFA Obrigatório para admins, Princípio do Menor Privilégio e gestão de chaves via AWS KMS.</p>
                        </div>
                        <div className="bg-[#0A0E1A] p-4 rounded-lg border border-slate-800">
                            <h4 className="text-white font-medium mb-2 flex gap-2"><span className="text-[#00FF94]">✓</span> Desenvolvimento Seguro</h4>
                            <p className="text-sm text-slate-400">Análise estática (SAST), scan de dependências (Snyk) e code review obrigatório.</p>
                        </div>
                    </div>

                    <h3>12.3 Resposta a Incidentes</h3>
                    <p>
                        Mantemos um plano de resposta a incidentes (IRP) testado semestralmente. Em caso de violação relevante que possa acarretar risco ou dano aos titulares, notificaremos a <strong>ANPD</strong> e os afetados em até <strong>72 horas</strong>.
                    </p>
                </section>

                <section id="cookies">
                    <h2>13. Cookies e Tecnologias</h2>
                    <p>
                        Utilizamos cookies para melhorar sua experiência. Detalhes completos estão em nossa <a href="/policies/cookies">Política de Cookies</a> detalhada.
                    </p>
                    <div className="bg-[#0A0A15] border border-slate-800 p-6 rounded-xl mt-4">
                        <h4 className="text-white font-medium mb-3">Resumo dos Tipos de Cookies:</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span><strong>Essenciais:</strong> Login e Segurança (Obrigatórios)</span>
                                <span className="text-xs bg-slate-800 px-2 py-1 rounded">Sessão</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span><strong>Analíticos:</strong> Google Analytics e Mixpanel (Opcionais)</span>
                                <span className="text-xs bg-slate-800 px-2 py-1 rounded">12-24 meses</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span><strong>Marketing:</strong> Pixels de conversão (Opcionais)</span>
                                <span className="text-xs bg-slate-800 px-2 py-1 rounded">3-6 meses</span>
                            </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-slate-800">
                            <a href="/policies/cookies" className="text-[#00A3FF] text-sm font-medium hover:underline">Gerenciar Preferências →</a>
                        </div>
                    </div>
                </section>

                <section id="menores">
                    <h2>14. Dados de Menores</h2>
                    <div className="bg-rose-900/10 border border-rose-500/20 p-6 rounded-xl flex gap-4 items-start">
                        <span className="material-symbols-rounded text-rose-500 text-2xl shrink-0">18_up_rating</span>
                        <div>
                            <h4 className="text-rose-400 font-medium mb-2">Plataforma Exclusiva para Maiores de 18 Anos</h4>
                            <p className="text-rose-200/80 text-sm leading-relaxed">
                                Não coletamos intencionalmente dados de menores de 18 anos. Caso identifiquemos tal coleta, encerraremos a conta imediatamente e excluiremos os dados, conforme Art. 14 da LGPD.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="alteracoes">
                    <h2>15. Alterações nesta Política</h2>
                    <p>
                        Podemos atualizar esta política periodicamente. Em caso de <strong>alterações substanciais</strong> que afetem seus direitos, notificaremos você por e-mail ou via dashboard com 30 dias de antecedência.
                    </p>
                    <p className="text-sm text-slate-500 mt-4">
                        Uso contínuo após as alterações implica na aceitação da nova versão.
                    </p>
                </section>

                <section id="contato" className="pb-12 border-t border-slate-800 mt-16 pt-12">
                    <p className="text-center text-slate-400 mb-6">Em caso de dúvidas sobre esta Política:</p>
                    <div className="flex justify-center">
                        <Link href="/policies/dpo" className="inline-flex items-center gap-2 bg-[#00A3FF] hover:bg-[#0088D4] text-white px-6 py-3 rounded-xl transition-all font-medium">
                            <span className="material-symbols-rounded">support_agent</span>
                            Falar com o DPO
                        </Link>
                    </div>
                </section>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed"></p>
        </div>
    )
}
