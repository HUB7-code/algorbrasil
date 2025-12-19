"use client";

import { User, Lock, Bell, CreditCard, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="p-8 w-full min-h-screen space-y-10 relative text-white font-sans">

            {/* Header */}
            <div className="border-b border-white/10 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2 tracking-tight">
                    Configurações
                </h1>
                <p className="text-gray-300 font-light text-lg">
                    Gerencie seu perfil, segurança e API Keys.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

                {/* Sidebar Navigation (mini) */}
                <div className="w-full lg:w-64 flex flex-col gap-2">
                    <SettingsTab icon={<User className="w-4 h-4" />} label="Perfil" active />
                    <SettingsTab icon={<Lock className="w-4 h-4" />} label="Segurança" />
                    <SettingsTab icon={<CreditCard className="w-4 h-4" />} label="Faturamento" />
                    <SettingsTab icon={<Bell className="w-4 h-4" />} label="Notificações" />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-6">

                    {/* Profile Card */}
                    <div className="glass-panel p-8 rounded-2xl">
                        <h3 className="text-xl font-serif font-medium text-white mb-6">Informações Pessoais</h3>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-serif text-white">
                                EN
                            </div>
                            <div>
                                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors mb-2">
                                    Alterar Foto
                                </button>
                                <p className="text-xs text-gray-500">JPG, GIF ou PNG. Max 1MB.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Nome Completo" defaultValue="Edisio Nascimento" />
                            <InputField label="Email Corporativo" defaultValue="ceo@algor.brasil" />
                            <InputField label="Cargo" defaultValue="Chief Governance Officer" />
                            <InputField label="Empresa" defaultValue="ALGOR BRASIL" disabled />
                        </div>
                    </div>

                    {/* API Keys */}
                    <div className="glass-panel p-8 rounded-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-serif font-medium text-white">API Keys</h3>
                            <button className="text-xs font-bold text-[#00FF94] uppercase tracking-wider hover:underline">Gerar Nova Chave</button>
                        </div>
                        <div className="p-4 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between font-mono text-sm text-gray-400">
                            <span>algor_live_****************829x</span>
                            <button className="text-white hover:text-[#00A3FF]">Copiar</button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="px-8 py-3 bg-[#00FF94] text-[#0A1A2F] font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2 shadow-lg">
                            <Save className="w-4 h-4" /> Salvar Alterações
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

function SettingsTab({ icon, label, active }: any) {
    return (
        <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-white/10 text-white border border-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            {icon}
            {label}
        </button>
    )
}

function InputField({ label, defaultValue, disabled }: any) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
            <input
                type="text"
                defaultValue={defaultValue}
                disabled={disabled}
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00FF94]/50 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
        </div>
    )
}
