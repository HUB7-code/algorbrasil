"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// Lucide imports removed

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState<{ name: string, role: string } | null>(null);

    // Auth Check
    useEffect(() => {
        const token = localStorage.getItem("algor_token");
        const userData = localStorage.getItem("algor_user");

        if (!token) {
            const currentPath = window.location.pathname;
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
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
                    w-72 bg-[#0A1A2F]/30 border-r border-white/10 backdrop-blur-2xl
                    transform transition-transform duration-300 ease-out
                    flex flex-col shadow-2xl
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center px-6 border-b border-white/5 relative overflow-hidden group">
                    {/* Glow effect under logo */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF94]/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    <Link href="/dashboard" className="flex items-center gap-4 w-full">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-[#00FF94]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A1A2F] to-black border border-white/10 flex items-center justify-center overflow-hidden shadow-lg">
                                <Image src="/logo-algor.webp" alt="Algor Logo" fill className="object-cover" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-orbitron font-bold text-2xl text-white tracking-widest leading-none mb-1 group-hover:text-[#00FF94] transition-colors">
                                ALGOR
                            </span>
                            <span className="text-[10px] text-[#00A3FF] font-mono tracking-[0.2em] uppercase">
                                Console v5.3
                            </span>
                        </div>
                    </Link>
                </div>

                {/* User Info */}
                <div className="p-6">
                    <div className="p-1 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 mb-8">
                        <div className="p-3 rounded-lg bg-[#0A1A2F]/50 backdrop-blur-md flex items-center gap-3 relative overflow-hidden">
                            <div className="w-10 h-10 rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/20 flex items-center justify-center text-[#00A3FF] font-bold text-lg font-orbitron shadow-[0_0_15px_rgba(0,163,255,0.1)]">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-white truncate font-display">{user.name}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse shadow-[0_0_8px_#00FF94]" />
                                    <p className="text-[10px] text-[#00FF94] font-mono uppercase tracking-wider">{user.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1.5">
                        <p className="px-3 text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Principal</p>
                        <NavItem
                            href="/dashboard"
                            icon={<span className="material-symbols-rounded text-3xl">space_dashboard</span>}
                            label="Centro de Comando"
                            active={pathname === "/dashboard"}
                        />
                        <NavItem
                            href="/dashboard/assessments"
                            icon={<span className="material-symbols-rounded text-3xl">fact_check</span>}
                            label="Avaliações IA"
                            active={pathname.startsWith("/dashboard/assessments")}
                        />
                        <NavItem
                            href="/dashboard/risks"
                            icon={<span className="material-symbols-rounded text-3xl">health_and_safety</span>}
                            label="Gestão de Riscos"
                            active={pathname.startsWith("/dashboard/risks")}
                        />

                        {user.role === "admin" && (
                            <>
                                <div className="h-6" />
                                <p className="px-3 text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Administração</p>
                                <NavItem href="/dashboard/admin" icon={<span className="material-symbols-rounded text-xl">admin_panel_settings</span>} label="Painel Administrativo" />
                            </>
                        )}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto p-6 border-t border-white/5 bg-[#02060C]/30">
                    <NavItem href="/dashboard/settings" icon={<span className="material-symbols-rounded text-xl">settings</span>} label="Configurações" />
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 mt-2 text-xs font-mono text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all group"
                    >
                        <span className="material-symbols-rounded text-lg group-hover:-translate-x-1 transition-transform">logout</span>
                        Encerrar Sessão
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#112240] via-[#0A1A2F] to-[#02060C]">
                {/* Header Mobile */}
                <header className="h-16 lg:hidden flex items-center justify-between px-4 border-b border-white/10 bg-[#02060C]/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white/80 hover:text-white p-1">
                            {isSidebarOpen ? <span className="material-symbols-rounded">close</span> : <span className="material-symbols-rounded">menu</span>}
                        </button>
                        <span className="font-orbitron font-bold text-white tracking-widest">ALGOR</span>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-brand-blue/20 scrollbar-track-transparent">
                    {/* Background Ambience (Deep Space & Aurora) */}
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#00FF94]/5 rounded-full blur-[120px] mix-blend-screen" />
                        <div className="absolute inset-0 bg-[url('/grid-noise.png')] opacity-[0.04] mix-blend-overlay" />
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
                relative flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group overflow-hidden
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#02060C]
                ${active
                    ? 'bg-brand-green/5 text-brand-green border border-brand-green/20 shadow-[0_0_15px_rgba(0,255,148,0.1)]'
                    : 'text-brand-blue/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                }
            `}
        >
            {active && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-green shadow-[0_0_10px_#00FF94]" />
            )}

            <span className={`w-10 h-10 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 ${active ? 'text-brand-green' : 'text-current'}`}>
                {icon}
            </span>
            <span className="text-sm font-sans font-semibold tracking-wide">
                {label}
            </span>
        </Link>
    );
}
