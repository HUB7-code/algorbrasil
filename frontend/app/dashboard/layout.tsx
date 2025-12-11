"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    FileText,
    ShieldAlert,
    Settings,
    LogOut,
    Menu,
    X,
    Activity,
    BrainCircuit
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState<{ name: string, role: string } | null>(null);

    // Auth Check
    useEffect(() => {
        const token = localStorage.getItem("algor_token");
        const userData = localStorage.getItem("algor_user");

        if (!token) {
            router.push("/login");
            return;
        }

        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("algor_token");
        localStorage.removeItem("algor_user");
        router.push("/login");
    };

    if (!user) return null; // Or a loading spinner

    return (
        <div className="flex h-screen bg-[#050B14] overflow-hidden selection:bg-brand-green selection:text-black">
            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-72 bg-[#02060C]/90 border-r border-white/5 backdrop-blur-md
                    transform transition-transform duration-300 ease-out
                    flex flex-col shadow-2xl
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center px-6 border-b border-white/5 relative overflow-hidden">
                    {/* Glow effect under logo */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-green/50 to-transparent opacity-50" />

                    <Link href="/dashboard" className="flex items-center gap-4 group w-full">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-brand-green/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-navy to-black border border-brand-green/30 flex items-center justify-center">
                                <BrainCircuit className="w-6 h-6 text-brand-green" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-orbitron font-bold text-lg text-white tracking-widest group-hover:text-brand-green transition-colors">
                                ALGOR
                            </span>
                            <span className="text-[10px] text-brand-blue/60 font-mono tracking-[0.2em] uppercase">
                                Console v5.3
                            </span>
                        </div>
                    </Link>
                </div>

                {/* User Info */}
                <div className="p-6">
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-4 mb-8 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                        <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue font-bold text-lg font-orbitron">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate font-display">{user.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                                <p className="text-[10px] text-brand-green font-mono uppercase tracking-wider">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1.5">
                        <p className="px-3 text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Principal</p>
                        <NavItem href="/dashboard" icon={<LayoutDashboard />} label="Centro de Comando" active />
                        <NavItem href="/dashboard/assessments" icon={<FileText />} label="Avaliações IA" />
                        <NavItem href="/dashboard/risks" icon={<ShieldAlert />} label="Gestão de Riscos & Logs" />

                        {user.role === "admin" && (
                            <>
                                <div className="h-4" />
                                <p className="px-3 text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Administração</p>
                                <NavItem href="/dashboard/admin" icon={<Activity />} label="Painel Administrativo" />
                            </>
                        )}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto p-6 border-t border-white/5">
                    <NavItem href="/dashboard/settings" icon={<Settings />} label="Configurações Glandulares" />
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 mt-2 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all group border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Encerrar Sessão
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0A1A2F]">
                {/* Header Mobile */}
                <header className="h-16 lg:hidden flex items-center justify-between px-4 border-b border-white/10 bg-[#02060C]">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white/80 hover:text-white p-1">
                            {isSidebarOpen ? <X /> : <Menu />}
                        </button>
                        <span className="font-orbitron font-bold text-white tracking-widest">ALGOR</span>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-brand-blue/20 scrollbar-track-transparent">
                    {/* Background Ambience */}
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[100px]" />
                        <div className="absolute inset-0 bg-[url('/grid-noise.png')] opacity-[0.03]" />
                    </div>

                    <div className="relative z-10 p-6 lg:p-10 max-w-7xl mx-auto space-y-8 pb-20">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden
                ${active
                    ? 'bg-brand-green/5 text-brand-green border border-brand-green/20 shadow-[0_0_15px_rgba(0,255,148,0.1)]'
                    : 'text-brand-blue/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                }
            `}
        >
            {active && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-green shadow-[0_0_10px_#00FF94]" />
            )}

            <span className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? 'text-brand-green' : 'text-current'}`}>
                {icon}
            </span>
            <span className="text-xs font-mono font-medium tracking-wide">
                {label}
            </span>
        </Link>
    );
}
