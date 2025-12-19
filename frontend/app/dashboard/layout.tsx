"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { OrganizationProvider } from "@/context/OrganizationContext";
import OrganizationSwitcher from "@/components/dashboard/OrganizationSwitcher";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <OrganizationProvider>
            <DashboardLayoutContent children={children} />
        </OrganizationProvider>
    );
}

function DashboardLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState<{ name: string, role: string } | null>(null);

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
        <div className="flex h-screen bg-[#0A1A2F] text-white overflow-hidden font-sans selection:bg-[#00FF94] selection:text-[#0A1A2F] relative">

            {/* AMBIENT LIGHTING (Matches Home Page feel) */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00A3FF]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00FF94]/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(true)}
                />
            )}

            {/* Sidebar - Using Glass Panel DNA */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-[280px] border-r border-white/5 bg-[#0A1A2F]/80 backdrop-blur-xl
                    transform transition-transform duration-300 ease-in-out
                    flex flex-col
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center px-6 pl-8 border-b border-white/5">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                            <Image src="/logo-algor.webp" alt="Algor" fill className="object-contain" />
                        </div>
                        <span className="font-sans font-bold text-lg tracking-wide text-white whitespace-nowrap">
                            ALGOR BRASIL
                        </span>
                    </Link>
                </div>

                <div className="pt-6 px-4">
                    <OrganizationSwitcher />
                </div>

                {/* Primary Action Button */}
                <div className="px-4 mb-6 mt-4">
                    <button className="flex items-center justify-center gap-3 w-full h-[48px] rounded-lg bg-[#00FF94] hover:bg-[#00FF94]/90 text-[#0A1A2F] font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(0,255,148,0.2)]">
                        <span className="material-symbols-rounded text-xl">play_circle</span>
                        INICIAR CICLO
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="px-3 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                        Estratégia
                    </div>
                    <NavItem
                        href="/dashboard"
                        icon="shield_with_house"
                        label="Centro de Comando"
                        active={pathname === "/dashboard"}
                    />
                    <NavItem
                        href="/dashboard/roadmap"
                        icon="map"
                        label="Jornada de Adoção"
                        active={pathname.startsWith("/dashboard/roadmap")}
                    />

                    <div className="h-4" />
                    <div className="px-3 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                        Operações
                    </div>
                    <NavItem
                        href="/dashboard/inventory"
                        icon="database"
                        label="Inventário de IA"
                        active={pathname.startsWith("/dashboard/inventory")}
                    />
                    <NavItem
                        href="/dashboard/assessments"
                        icon="fact_check"
                        label="Auditorias"
                        active={pathname === "/dashboard/assessments"}
                    />
                    <NavItem
                        href="/dashboard/risks"
                        icon="health_and_safety"
                        label="Gestão de Riscos"
                        active={pathname.startsWith("/dashboard/risks")}
                    />
                    <NavItem
                        href="/dashboard/projects"
                        icon="folder_managed"
                        label="Projetos Gov"
                        active={pathname.startsWith("/dashboard/projects")}
                    />

                    <div className="h-4" />
                    <div className="px-3 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                        Conhecimento
                    </div>
                    <NavItem
                        href="/dashboard/courses"
                        icon="school"
                        label="Academy"
                        active={pathname.startsWith("/dashboard/courses")}
                    />

                    {user.role === "admin" && (
                        <>
                            <div className="h-4" />
                            <NavItem href="/dashboard/admin" icon="admin_panel_settings" label="Admin System" />
                        </>
                    )}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 mt-auto border-t border-white/5 bg-[#0A1A2F]/50">
                    <NavItem href="/dashboard/settings" icon="settings" label="Configurações" active={pathname === "/dashboard/settings"} />

                    <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                        <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold border border-white/10">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate group-hover:text-[#00FF94] transition-colors">{user?.name}</p>
                            <p className="text-[11px] text-gray-400 truncate capitalize">{user?.role}</p>
                        </div>
                        <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition-colors">
                            <span className="material-symbols-rounded text-lg">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen relative overflow-hidden bg-[#0A1A2F]">
                {/* Mobile Header */}
                <header className="h-16 lg:hidden flex items-center justify-between px-4 bg-[#0A1A2F] border-b border-white/10 relative z-20">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
                            <span className="material-symbols-rounded">menu</span>
                        </button>
                        <span className="font-bold text-lg text-white">ALGOR</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative z-10">
                    {children}
                </main>
            </div>
        </div>
    );
}

// Premium Navigation Item
function NavItem({ href, icon, label, active = false }: { href: string, icon: string, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-200
                ${active
                    ? 'bg-white/10 text-white shadow-sm border border-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } 
            `}
        >
            <span
                className={`material-symbols-rounded text-[20px] transition-colors ${active ? 'text-[#00FF94]' : 'text-gray-500 group-hover:text-white'}`}
                style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400" }}
            >
                {icon}
            </span>
            <span className={active ? 'font-semibold tracking-wide' : 'tracking-wide'}>{label}</span>
        </Link>
    );
}
