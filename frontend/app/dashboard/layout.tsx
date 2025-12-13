"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

    if (!user) return null;

    return (
        <div className="flex h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B2F4E] via-[#0A1A2F] to-[#050B14] overflow-hidden selection:bg-brand-blue selection:text-white font-sans text-gray-100">
            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(true)}
                />
            )}

            {/* Sidebar (Navigation Drawer) - Glassmorphism */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-[280px] bg-brand-navy/60 backdrop-blur-xl border-r border-white/5
                    transform transition-transform duration-300 ease-in-out
                    flex flex-col
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center px-6 pl-8">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-brand-blue/20 group-hover:shadow-brand-blue/40 transition-all duration-500">
                            <Image src="/logo-algor.webp" alt="Algor" fill className="object-contain" />
                        </div>
                        <span className="font-display font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-blue/80">
                            ALGOR
                        </span>
                    </Link>
                </div>

                {/* FAB / Primary Action */}
                <div className="px-6 mb-8">
                    <button className="flex items-center justify-center gap-3 w-full h-[52px] rounded-xl bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white hover:shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:scale-[1.02] transition-all duration-300 font-medium text-sm border border-white/10">
                        <span className="material-symbols-rounded" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                        Nova Avaliação
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="px-4 py-3 text-[11px] font-bold text-gray-400/60 uppercase tracking-[0.2em]">
                        Principal
                    </div>
                    <NavItem
                        href="/dashboard"
                        icon="space_dashboard"
                        label="Visão Geral"
                        active={pathname === "/dashboard"}
                    />
                    <NavItem
                        href="/dashboard/assessments"
                        icon="fact_check"
                        label="Avaliações IA"
                        active={pathname.startsWith("/dashboard/assessments")}
                    />
                    <NavItem
                        href="/dashboard/risks"
                        icon="health_and_safety"
                        label="Gestão de Riscos"
                        active={pathname.startsWith("/dashboard/risks")}
                    />
                    <NavItem
                        href="/dashboard/courses"
                        icon="school"
                        label="Academia ALGOR"
                        active={pathname.startsWith("/dashboard/courses")}
                    />

                    {user.role === "admin" && (
                        <>
                            <div className="h-6" />
                            <div className="px-4 py-3 text-[11px] font-bold text-gray-400/60 uppercase tracking-[0.2em]">
                                Sistema
                            </div>
                            <NavItem href="/dashboard/admin" icon="admin_panel_settings" label="Administração" />
                        </>
                    )}
                </nav>

                {/* Bottom Section: Profile & Settings */}
                <div className="p-4 mt-auto">
                    <NavItem href="/dashboard/settings" icon="settings" label="Configurações" />
                    <div className="border-t border-white/5 my-3 mx-2" />

                    <div className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-purple-500 text-white flex items-center justify-center text-sm font-bold shadow-inner border border-white/10">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">{user.name}</p>
                            <p className="text-xs text-brand-blue/80 truncate font-mono">{user.role}</p>
                        </div>
                        <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition-colors p-2">
                            <span className="material-symbols-rounded text-xl">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen relative">
                {/* Background Atmosphere Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

                {/* Header Mobile Only */}
                <header className="h-16 lg:hidden flex items-center justify-between px-4 bg-brand-navy/80 backdrop-blur-md border-b border-white/5 relative z-20">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-300">
                            <span className="material-symbols-rounded">menu</span>
                        </button>
                        <span className="font-display font-bold text-lg text-white">ALGOR</span>
                    </div>
                </header>

                {/* Content Container - Elite Glass Pane */}
                <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 p-4 lg:p-8 relative z-10">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

// Elite Navigation Item
function NavItem({ href, icon, label, active = false }: { href: string, icon: string, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden
                ${active
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } 
            `}
        >
            {/* Active Indicator Background */}
            {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-transparent border-l-2 border-brand-blue opacity-100" />
            )}

            <span
                className={`material-symbols-rounded text-[22px] relative z-10 transition-transform duration-300 ${active ? 'text-brand-blue scale-110 drop-shadow-[0_0_8px_rgba(0,163,255,0.5)]' : 'group-hover:text-gray-200'}`}
                style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400" }}
            >
                {icon}
            </span>
            <span className="relative z-10 tracking-wide">{label}</span>
        </Link>
    );
}
