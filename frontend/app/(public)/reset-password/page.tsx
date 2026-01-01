"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success">("idle");
    const [passwords, setPasswords] = useState({ new: "", confirm: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("As senhas não coincidem.");
            return;
        }

        setIsLoading(true);

        // MOCK RESET
        setTimeout(() => {
            setIsLoading(false);
            setStatus("success");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }, 1500);
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#131314] text-[#E3E3E3] font-sans">

            <div className="w-full max-w-[400px] px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col items-center mb-8">
                    {/* Logo Small */}
                    <div className="w-[120px] h-[60px] relative mb-6">
                        <Image src="/logo-algor.webp" alt="Algor" fill sizes="120px" className="object-contain" />
                    </div>

                    <h1 className="text-[28px] font-normal text-center text-[#E3E3E3] mb-2">
                        Nova Senha
                    </h1>
                    <p className="text-sm text-[#C4C7C5] text-center">
                        Defina sua nova credencial de acesso segura.
                    </p>
                </div>

                {status === "success" ? (
                    <div className="p-6 rounded-[16px] bg-[#0F5223] text-[#C4EED0] text-center animate-in zoom-in duration-300">
                        <div className="flex justify-center mb-2">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-medium">Senha Atualizada!</h3>
                        <p className="text-sm mt-1 opacity-80">Você será redirecionado para o login.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group relative">
                            <input
                                type="password"
                                required
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                className="peer w-full h-[56px] px-4 pt-4 bg-[#1E1F20] text-[#E3E3E3] border border-[#8E918F] rounded-[4px] md:rounded-[16px] placeholder-transparent focus:outline-none focus:border-[#A8C7FA] focus:ring-1 focus:ring-[#A8C7FA] transition-all"
                                placeholder="Nova Senha"
                            />
                            <label className="absolute left-4 top-2 text-[#C4C7C5] text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base pointer-events-none">
                                Nova Senha
                            </label>
                        </div>

                        <div className="group relative">
                            <input
                                type="password"
                                required
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                className="peer w-full h-[56px] px-4 pt-4 bg-[#1E1F20] text-[#E3E3E3] border border-[#8E918F] rounded-[4px] md:rounded-[16px] placeholder-transparent focus:outline-none focus:border-[#A8C7FA] focus:ring-1 focus:ring-[#A8C7FA] transition-all"
                                placeholder="Confirmar Senha"
                            />
                            <label className="absolute left-4 top-2 text-[#C4C7C5] text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base pointer-events-none">
                                Confirmar Senha
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-[48px] rounded-full bg-[#A8C7FA] text-[#062E6F] text-sm font-medium hover:bg-[#85B5F8] disabled:opacity-50 transition-all shadow-sm"
                        >
                            {isLoading ? "Atualizando..." : "Definir Nova Senha"}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}
