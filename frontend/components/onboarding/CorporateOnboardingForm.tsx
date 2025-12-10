
'use client';

import React, { useState } from 'react';
import { Building2, Globe, Database } from 'lucide-react';
import LegalTooltip from '@/components/ui/LegalTooltip';
import ConsentCheckbox from '@/components/ui/ConsentCheckbox';

export default function CorporateOnboardingForm({ onSuccess }: { onSuccess: () => void }) {
    const [formData, setFormData] = useState({
        company_name: '',
        sector: '',
        size_range: '',
        website: ''
    });
    const [consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent) return alert("O consentimento LGPD é obrigatório.");

        setLoading(true);
        // TODO: Connect to backend API /profiles/corporate
        console.log("Submitting Corporate Data:", formData);

        // Simulating API call
        setTimeout(() => {
            setLoading(false);
            onSuccess();
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
            <div className="space-y-4">
                {/* Company Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome da Empresa
                        <LegalTooltip content="Identificação da pessoa jurídica para fins contratuais e de faturamento." />
                    </label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            required
                            className="w-full bg-[#050d18]/50 border border-gray-700 rounded-lg py-3 pl-10 px-4 text-white focus:ring-2 focus:ring-[#00A3FF] focus:border-transparent outline-none transition-all"
                            placeholder="Ex: Tech Solutions Ltda"
                            value={formData.company_name}
                            onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                        />
                    </div>
                </div>

                {/* Sector */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Setor de Atuação
                        <LegalTooltip content="Para benchmarking e análise de riscos setoriais específicos." />
                    </label>
                    <select
                        required
                        className="w-full bg-[#050d18]/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-[#00A3FF] outline-none appearance-none"
                        value={formData.sector}
                        onChange={e => setFormData({ ...formData, sector: e.target.value })}
                    >
                        <option value="" disabled>Selecione um setor...</option>
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Varejo">Varejo</option>
                        <option value="Indústria">Indústria</option>
                        <option value="Serviços">Serviços</option>
                    </select>
                </div>

                {/* Size Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tamanho da Empresa
                        <LegalTooltip content="Para dimensionar o plano de governança adequado." />
                    </label>
                    <select
                        required
                        className="w-full bg-[#050d18]/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-[#00A3FF] outline-none appearance-none"
                        value={formData.size_range}
                        onChange={e => setFormData({ ...formData, size_range: e.target.value })}
                    >
                        <option value="" disabled>Número de colaboradores...</option>
                        <option value="1-50">1-50 (Pequena)</option>
                        <option value="51-200">51-200 (Média)</option>
                        <option value="201-1000">201-1000 (Grande)</option>
                        <option value="1000+">1000+ (Enterprise)</option>
                    </select>
                </div>

                {/* Website */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website Corporativo
                        <LegalTooltip content="Utilizado para verificação de domínio e reputação digital." />
                    </label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="url"
                            className="w-full bg-[#050d18]/50 border border-gray-700 rounded-lg py-3 pl-10 px-4 text-white focus:ring-2 focus:ring-[#00A3FF] focus:border-transparent outline-none transition-all"
                            placeholder="https://suaempresa.com.br"
                            value={formData.website}
                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
                <ConsentCheckbox
                    id="corp-consent"
                    checked={consent}
                    onChange={setConsent}
                    required
                    label="Declaro que estou autorizado a representar esta empresa e aceito a Política de Privacidade B2B."
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00A3FF] to-[#0066FF] hover:from-[#0088CC] hover:to-[#0055DD] text-white font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                ) : (
                    <Database className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Processando Blindagem...' : 'Acessar War Room'}
            </button>
        </form>
    );
}
