"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/Button";

export default function SecuritySettingsPage() {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [activationCode, setActivationCode] = useState("");
    const [status, setStatus] = useState<"idle" | "setup" | "success">("idle");

    const startSetup = async () => {
        try {
            const token = localStorage.getItem("algor_token");
            const res = await fetch("/api/v1/auth/2fa/setup", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.detail || "Falha ao gerar QR Code");

            setQrCode(data.qr_code_url);
            setStatus("setup");
        } catch (error: any) {
            console.error("Erro no setup 2FA:", error);
            alert("Erro ao iniciar configuração: " + error.message);
        }
    };

    const activate = async () => {
        const token = localStorage.getItem("algor_token");
        const res = await fetch("/api/v1/auth/2fa/activate", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: activationCode })
        });

        if (res.ok) {
            setStatus("success");
        } else {
            alert("Código incorreto. Tente novamente.");
        }
    };

    return (
        <div className="max-w-[800px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-3xl font-display font-medium text-white mb-6">Segurança da Conta</h1>

            <div className="glass-panel p-8 rounded-3xl">
                <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                        <span className="material-symbols-rounded text-2xl">lock</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-medium text-white">Autenticação de Dois Fatores (2FA)</h2>
                        <p className="text-gray-400 mt-1">Proteja sua conta exigindo um código do Google Authenticator ou Authy ao entrar.</p>
                    </div>
                </div>

                {status === "idle" && (
                    <div className="flex justify-end">
                        <button
                            onClick={startSetup}
                            className="bg-[#00A3FF] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#0082CC] transition-colors shadow-[0_0_15px_rgba(0,163,255,0.3)]"
                        >
                            Configurar Agora
                        </button>
                    </div>
                )}

                {status === "setup" && qrCode && (
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-xl w-fit mx-auto">
                            <img src={qrCode} alt="QR Code" className="w-[200px] h-[200px]" />
                        </div>
                        <div className="text-center text-gray-300 text-sm">
                            1. Abra seu app Autenticador (Google/Microsoft)<br />
                            2. Escaneie o QR Code acima<br />
                            3. Digite o código de 6 dígitos gerado
                        </div>

                        <div className="flex items-center gap-4 justify-center">
                            <input
                                type="text"
                                className="w-[140px] h-12 bg-black/30 border border-white/10 rounded-xl text-center text-2xl font-mono tracking-widest text-white focus:border-brand-blue outline-none"
                                maxLength={6}
                                value={activationCode}
                                onChange={(e) => setActivationCode(e.target.value)}
                            />
                            <Button onClick={activate} className="bg-brand-green text-black font-bold h-12 px-6 rounded-xl hover:bg-brand-green/80">
                                Confirmar e Ativar
                            </Button>
                        </div>
                    </div>
                )}

                {status === "success" && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-rounded text-3xl">check</span>
                        </div>
                        <h3 className="text-xl text-white font-medium">Conta Protegida!</h3>
                        <p className="text-gray-400 mt-2">O 2FA está ativo. Você precisará do código no próximo login.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
