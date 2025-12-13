"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TwoFactorPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const flow = searchParams.get("flow") || "login"; // 'login' or 'reset'

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle Input Change for 6-digit boxes
    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow 1 char
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        const fullCode = code.join("");
        const tempToken = localStorage.getItem("algor_temp_token");

        // Real Backend Verification
        try {
            const res = await fetch("/api/v1/verify-2fa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tempToken}` // Pass temp token if needed by logic, or in body
                },
                body: JSON.stringify({
                    code: fullCode,
                    temp_token: tempToken
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.detail || "Código inválido.");

            // Success: Save Real Token
            localStorage.setItem("algor_token", data.access_token);
            localStorage.setItem("algor_user", JSON.stringify({ role: data.role, name: data.username }));

            // Cleanup temp
            localStorage.removeItem("algor_temp_token");

            if (flow === "reset") {
                router.push("/reset-password");
            } else {
                router.push("/dashboard");
            }

        } catch (error: any) {
            // Mock Fallback (if backend is offline or dev mode)
            console.error("2FA Error:", error);
            if (fullCode === "123456" && !tempToken) {
                // Mock behavior for dev without backend
                localStorage.setItem("algor_token", "mock_real_token");
                router.push("/dashboard");
            } else {
                setMessage(error.message || "Código inválido. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#131314] text-[#E3E3E3] font-sans">
            {/* Header */}
            <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <Link href={flow === 'reset' ? "/forgot-password" : "/login"} className="flex items-center gap-2 text-sm text-[#C4C7C5] hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-[#444746] flex items-center justify-center group-hover:bg-[#5E5E5E] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span>Voltar</span>
                </Link>
            </header>

            <div className="w-full max-w-[400px] px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Icon */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#004A77]/20 flex items-center justify-center mb-6 text-[#A8C7FA]">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h1 className="text-[28px] font-normal text-center text-[#E3E3E3] mb-2">
                        Verificação em 2 Etapas
                    </h1>
                    <p className="text-sm text-[#C4C7C5] text-center max-w-xs">
                        Para sua segurança, digite o código gerado pelo seu aplicativo autenticador.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 6 Digit Inputs */}
                    <div className="flex justify-between gap-2">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-xl font-mono bg-[#1E1F20] text-white border-2 border-[#444746] rounded-[8px] focus:border-[#A8C7FA] focus:ring-4 focus:ring-[#A8C7FA]/20 outline-none transition-all hover:border-[#8E918F]"
                            />
                        ))}
                    </div>

                    {message && (
                        <div className="p-3 rounded bg-[#3C1919] text-[#FFB4AB] text-sm text-center">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || code.join("").length !== 6}
                        className="w-full h-[48px] rounded-full bg-[#A8C7FA] text-[#062E6F] text-sm font-medium hover:bg-[#85B5F8] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        {isLoading ? "Verificando..." : "Confirmar Código"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-[#5E5E5E]">
                        O código muda automaticamente a cada 30 segundos.
                    </p>
                </div>
            </div>
        </main>
    );
}
