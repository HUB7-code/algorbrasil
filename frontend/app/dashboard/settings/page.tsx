"use client";

import { useState, useEffect } from "react";
import { User, Lock, Bell, CreditCard, Save, Camera, CheckCircle, Shield, AlertTriangle, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing' | 'notifications'>('profile');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<any>({
        full_name: "",
        email: "",
        role: "",
        company: "ALGOR BRASIL" // Placeholder
    });

    // Form States
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Toggle States
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Fetch User Data
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("algor_token");
            if (!token) return;
            try {
                const res = await fetch("/api/v1/users/me", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                    setFullName(data.full_name || "");
                    setEmail(data.email || "");
                }
            } catch (error) {
                console.error("Failed to fetch user settings", error);
            }
        };
        fetchUser();
    }, []);

    const handleSaveProfile = async () => {
        setLoading(true);
        const token = localStorage.getItem("algor_token");
        try {
            const payload: any = { full_name: fullName, email: email };
            if (password && password === confirmPassword) {
                payload.password = password;
            } else if (password && password !== confirmPassword) {
                alert("As senhas não conferem.");
                setLoading(false);
                return;
            }

            const res = await fetch("/api/v1/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Perfil atualizado com sucesso!");
                setPassword("");
                setConfirmPassword("");
            } else {
                alert("Erro ao atualizar perfil.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão.");
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoUpload = () => {
        document.getElementById('photo-upload')?.click();
    };

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const token = localStorage.getItem("algor_token");
        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        try {
            const res = await fetch("/api/v1/users/me/avatar", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });
            if (res.ok) {
                const data = await res.json();
                setUserData({ ...userData, profile_image: data.url });
                alert("Foto atualizada com sucesso!");
            } else {
                alert("Erro ao enviar foto.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 w-full min-h-screen space-y-10 relative text-white font-sans">
            <input type="file" id="photo-upload" className="hidden" accept="image/*" onChange={onFileChange} />

            {/* Header */}
            <div className="border-b border-white/10 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2 tracking-tight">
                    Configurações
                </h1>
                <p className="text-gray-300 font-light text-lg">
                    Gerencie seu perfil, segurança e preferências.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex flex-col gap-2">
                    <SettingsTab
                        icon={<User className="w-4 h-4" />}
                        label="Perfil"
                        active={activeTab === 'profile'}
                        onClick={() => setActiveTab('profile')}
                    />
                    <SettingsTab
                        icon={<Lock className="w-4 h-4" />}
                        label="Segurança"
                        active={activeTab === 'security'}
                        onClick={() => setActiveTab('security')}
                    />
                    <SettingsTab
                        icon={<CreditCard className="w-4 h-4" />}
                        label="Faturamento"
                        active={activeTab === 'billing'}
                        onClick={() => setActiveTab('billing')}
                    />
                    <SettingsTab
                        icon={<Bell className="w-4 h-4" />}
                        label="Notificações"
                        active={activeTab === 'notifications'}
                        onClick={() => setActiveTab('notifications')}
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-6">

                    {/* === PROFILE TAB === */}
                    {activeTab === 'profile' && (
                        <>
                            <div className="glass-panel p-8 rounded-2xl">
                                <h3 className="text-xl font-serif font-medium text-white mb-6">Informações Pessoais</h3>

                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-serif text-white relative group overflow-hidden">
                                        {userData.profile_image ? (
                                            <img src={userData.profile_image} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            userData.full_name ? userData.full_name.charAt(0).toUpperCase() : "U"
                                        )}
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={handlePhotoUpload}>
                                            <Camera className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={handlePhotoUpload} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors mb-2">
                                            Alterar Foto
                                        </button>
                                        <p className="text-xs text-gray-500">JPG, GIF ou PNG. Max 1MB.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nome Completo</label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00FF94]/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00FF94]/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2 relative">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nova Senha</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Deixe em branco para manter"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00FF94]/50 transition-all pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2 relative">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confirmar Senha</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Repita a nova senha"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00FF94]/50 transition-all pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel p-8 rounded-2xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-serif font-medium text-white">API Keys</h3>
                                    <button className="text-xs font-bold text-[#00FF94] uppercase tracking-wider hover:underline" onClick={() => alert("Gerar nova chave: Recurso Enterprise.")}>Gerar Nova Chave</button>
                                </div>
                                <div className="p-4 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between font-mono text-sm text-gray-400">
                                    <span>algor_live_****************829x</span>
                                    <button className="text-white hover:text-[#00A3FF]" onClick={() => navigator.clipboard.writeText("algor_live_xxxxxxxx")}>Copiar</button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={loading}
                                    className="px-8 py-3 bg-[#00FF94] text-[#0A1A2F] font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
                                >
                                    {loading ? "Salvando..." : <><Save className="w-4 h-4" /> Salvar Alterações</>}
                                </button>
                            </div>
                        </>
                    )}

                    {/* === SECURITY TAB === */}
                    {activeTab === 'security' && (
                        <div className="glass-panel p-8 rounded-2xl space-y-8">
                            <h3 className="text-xl font-serif font-medium text-white flex items-center gap-2">
                                <Shield className="w-5 h-5 text-[#00FF94]" /> Segurança da Conta
                            </h3>

                            <div className="p-6 bg-[#00FF94]/5 border border-[#00FF94]/20 rounded-xl flex items-start gap-4">
                                <div className="p-2 bg-[#00FF94]/10 rounded-lg">
                                    <Lock className="w-5 h-5 text-[#00FF94]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">Dois Fatores (2FA)</h4>
                                    <p className="text-xs text-gray-400 mb-4">Adicione uma camada extra de segurança usando Google Authenticator.</p>
                                    <button className="text-xs bg-[#00FF94] text-[#0A1A2F] px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors">
                                        ATIVAR 2FA
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Sessões Ativas</h4>
                                <div className="flex justify-between items-center py-3 border-b border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Windows PC - Chrome</p>
                                            <p className="text-xs text-gray-500">São Paulo, BR • Atual</p>
                                        </div>
                                    </div>
                                    <button className="text-xs text-red-500 hover:text-red-400">Encerrar</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === BILLING TAB === */}
                    {activeTab === 'billing' && (
                        <div className="glass-panel p-12 rounded-2xl text-center space-y-4">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                <CreditCard className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-serif font-medium text-white">Gerenciamento de Assinatura</h3>
                            <p className="text-gray-400 text-sm max-w-md mx-auto">
                                Você está atualmente no plano <strong>Enterprise Beta</strong>. O faturamento será ativado na versão 7.0.
                            </p>
                            <button className="mt-4 px-6 py-2 border border-white/20 rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
                                Ver Histórico de Faturas
                            </button>
                        </div>
                    )}

                    {/* === NOTIFICATIONS TAB === */}
                    {activeTab === 'notifications' && (
                        <div className="glass-panel p-8 rounded-2xl">
                            <h3 className="text-xl font-serif font-medium text-white mb-6">Preferências de Notificação</h3>
                            <div className="space-y-6">
                                <ToggleRow label="Alertas de Segurança" description="Notificar sobre novos logins e alterações de senha." checked />
                                <ToggleRow label="Relatórios Semanais" description="Resumo de auditorias e riscos toda segunda-feira." checked />
                                <ToggleRow label="Novidades da Plataforma" description="Atualizações sobre novos recursos do Algor." checked={false} />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

function SettingsTab({ icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-white/10 text-white border border-white/5 shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
            {icon}
            {label}
        </button>
    )
}

function ToggleRow({ label, description, checked }: any) {
    const [isOn, setIsOn] = useState(checked);
    return (
        <div className="flex items-center justify-between">
            <div>
                <h4 className="text-sm font-bold text-white">{label}</h4>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
            <button
                onClick={() => setIsOn(!isOn)}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${isOn ? 'bg-[#00FF94]' : 'bg-gray-700'}`}
            >
                <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${isOn ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
        </div>
    )
}
