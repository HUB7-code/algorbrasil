
export default function CookiePolicyPage() {
    return (
        <div className="animate-in fade-in duration-700">
            <h1 className="text-4xl md:text-5xl font-light mb-8 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                Política de Cookies
            </h1>

            <div className="bg-[#0A0E1A] border border-slate-800 rounded-xl p-6 mb-12">
                <p className="text-sm text-slate-400 mb-2"><strong>Última atualização:</strong> 24 de Dezembro de 2025</p>
                <p className="text-sm text-slate-400"><strong>Vigência:</strong> Imediata</p>
            </div>

            <p className="lead text-xl text-slate-300 mb-12">
                Transparência total sobre como usamos cookies para aprimorar sua experiência e garantir a segurança na plataforma <strong>Algor Console</strong>.
            </p>

            <h2>1. O que são Cookies?</h2>
            <p>
                Cookies são pequenos arquivos de texto criptografados salvos no seu dispositivo quando você visita um site. Na ALGOR, eles funcionam como "memórias seguras" que nos permitem:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Manter você logado com segurança (Sessão);</li>
                <li>Lembrar suas preferências de idioma e tema (Funcional);</li>
                <li>Entender como você navega para melhorar o produto (Analytics);</li>
                <li>Detectar atividades suspeitas e prevenir fraudes (Segurança).</li>
            </ul>

            <h2>2. Categorias de Cookies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
                <div className="bg-[#0A0A15] border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-rounded text-6xl">shield_lock</span>
                    </div>
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
                        Estritamente Necessários
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">
                        Indispensáveis para o funcionamento do site. Permitem login, segurança (anti-CSRF), balanceamento de carga e acesso a áreas seguras.
                    </p>
                    <span className="text-xs font-mono text-rose-400 border border-rose-500/30 px-2 py-1 rounded bg-rose-500/10">Não podem ser desligados</span>
                </div>

                <div className="bg-[#0A0A15] border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-rounded text-6xl">analytics</span>
                    </div>
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                        Analíticos (Performance)
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">
                        Coletam dados anônimos sobre visitas, tempo na página e erros. Nos ajudam a melhorar a performance e usabilidade do SaaS.
                    </p>
                    <span className="text-xs font-mono text-blue-400 border border-blue-500/30 px-2 py-1 rounded bg-blue-500/10">Opcionais (Consentimento)</span>
                </div>

                <div className="bg-[#0A0A15] border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-rounded text-6xl">tune</span>
                    </div>
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        Funcionais
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">
                        Lembram suas escolhas (região, tamanho de fonte, organização do dashboard) para uma experiência mais fluida.
                    </p>
                    <span className="text-xs font-mono text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded bg-emerald-500/10">Opcionais</span>
                </div>

                <div className="bg-[#0A0A15] border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-rounded text-6xl">campaign</span>
                    </div>
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
                        Marketing &amp; CRM
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">
                        Rastreiam sua navegação para exibir conteúdo relevante e integrar com nosso CRM (HubSpot) para suporte e vendas.
                    </p>
                    <span className="text-xs font-mono text-purple-400 border border-purple-500/30 px-2 py-1 rounded bg-purple-500/10">Opcionais</span>
                </div>
            </div>

            <h2>3. Tabela de Cookies de Terceiros</h2>
            <p>Abaixo listamos os parceiros confiáveis cujos cookies podem ser utilizados em nossa plataforma:</p>

            <div className="overflow-x-auto not-prose mt-6 mb-12">
                <table className="w-full text-left text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                    <thead className="bg-[#0A0E1A] text-slate-200">
                        <tr>
                            <th className="p-4 border-b border-slate-800">Fornecedor</th>
                            <th className="p-4 border-b border-slate-800">Categoria</th>
                            <th className="p-4 border-b border-slate-800">Finalidade</th>
                            <th className="p-4 border-b border-slate-800">Retenção</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-[#050810]">
                        <tr>
                            <td className="p-4 font-medium text-white">Google Analytics 4</td>
                            <td className="p-4"><span className="text-blue-400">Analítico</span></td>
                            <td className="p-4">Métricas de tráfego e usuários ativos.</td>
                            <td className="p-4">14 meses</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-medium text-white">Mixpanel</td>
                            <td className="p-4"><span className="text-blue-400">Analítico / Produto</span></td>
                            <td className="p-4">Análise detalhada de uso de features (funis).</td>
                            <td className="p-4">12 meses</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-medium text-white">HubSpot</td>
                            <td className="p-4"><span className="text-purple-400">Marketing / CRM</span></td>
                            <td className="p-4">Identificação de leads, chat e histórico.</td>
                            <td className="p-4">6 meses</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-medium text-white">Stripe</td>
                            <td className="p-4"><span className="text-rose-400">Necessário</span></td>
                            <td className="p-4">Prevenção de fraude e processamento de pagamentos.</td>
                            <td className="p-4">Sessão</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-medium text-white">Vercel (Edge)</td>
                            <td className="p-4"><span className="text-rose-400">Necessário</span></td>
                            <td className="p-4">Otimização de entrega de conteúdo e segurança.</td>
                            <td className="p-4">Sessão</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>4. Gerenciamento de Cookies</h2>
            <p>
                Você tem o direito de decidir se aceita ou rejeita cookies (exceto os estritamente necessários).
            </p>
            <div className="bg-[#0A0E1A] p-6 rounded-xl border border-dashed border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="text-white font-medium mb-1">Preferências de Privacidade</h4>
                    <p className="text-slate-400 text-sm">Acesse nosso painel para alterar seus consentimentos a qualquer momento.</p>
                </div>
                <button className="px-5 py-2.5 bg-[#00A3FF]/10 text-[#00A3FF] hover:bg-[#00A3FF]/20 border border-[#00A3FF]/20 rounded-lg text-sm font-medium transition-colors">
                    Gerenciar Cookies
                </button>
            </div>

            <hr className="border-slate-800 my-12" />

            <p className="text-sm text-slate-500">
                <strong>Encarregado (DPO):</strong> dpo@algorbrasil.com.br<br />
                Para mais informações sobre como tratamos seus dados, consulte nossa <a href="/policies/privacy" className="text-[#00A3FF] hover:underline">Política de Privacidade</a>.
            </p>
        </div>
    );
}

// Removendo função CookieType antiga pois agora usamos cards mais elaborados



