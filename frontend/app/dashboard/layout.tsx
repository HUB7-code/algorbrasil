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
        <div className="flex h-screen bg-[#1E1F20] overflow-hidden selection:bg-[#A8C7FA] selection:text-[#062E6F] font-sans">
            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                />
            )}

            {/* Sidebar (Navigation Drawer) */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-[280px] bg-[#1E1F20] text-[#E3E3E3]
                    transform transition-transform duration-300 ease-in-out
                    flex flex-col
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 pl-8">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image src="/logo-algor.webp" alt="Algor" fill className="object-contain" />
                        </div>
                        <span className="font-medium text-lg text-[#E3E3E3]">
                            Algor Console
                        </span>
                    </Link>
                </div>

                {/* FAB / Primary Action (Optional in M3, but useful) */}
                <div className="px-4 mb-6">
                    <button className="flex items-center gap-3 w-full h-[56px] rounded-[16px] bg-[#3E4042] text-[#A8C7FA] hover:bg-[#494B4D] hover:shadow-md transition-all px-4 font-medium text-sm">
                        <span className="material-symbols-rounded" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                        Nova Avaliação
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                    <div className="px-4 py-2 text-xs font-medium text-[#8E918F] uppercase tracking-wider">
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

                    {user.role === "admin" && (
                        <>
                            <div className="h-4" />
                            <div className="px-4 py-2 text-xs font-medium text-[#8E918F] uppercase tracking-wider">
                                Sistema
                            </div>
                            <NavItem href="/dashboard/admin" icon="admin_panel_settings" label="Administração" />
                        </>
                    )}
                </nav>

                {/* Bottom Section: Profile & Settings */}
                <div className="p-3 mt-auto">
                    <NavItem href="/dashboard/settings" icon="settings" label="Configurações" />
                    <div className="border-t border-[#444746] my-2 mx-4" />

                    <div className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-[#131314] cursor-pointer transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-[#A8C7FA] text-[#062E6F] flex items-center justify-center text-sm font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#E3E3E3] truncate">{user.name}</p>
                            <p className="text-xs text-[#C4C7C5] truncate">{user.role}</p>
                        </div>
                        <button onClick={handleLogout} className="text-[#C4C7C5] hover:text-[#FFB4AB]">
                            <span className="material-symbols-rounded text-lg">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area - Google "Surface Container" */}
            <div className="flex-1 flex flex-col h-screen relative bg-[#1E1F20] lg:bg-[#1E1F20]">
                {/* On Desktop, create the 'Paper' effect with rounded corners */}
                <div className="flex-1 bg-[#131314] lg:rounded-tl-[28px] lg:rounded-bl-[28px] overflow-hidden flex flex-col relative shadow-md lg:ml-0 lg:my-0">

                    {/* Header Mobile Only */}
                    <header className="h-16 lg:hidden flex items-center justify-between px-4 bg-[#1E1F20] text-[#E3E3E3]">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
                                <span className="material-symbols-rounded">menu</span>
                            </button>
                            <span className="font-medium">ALGOR</span>
                        </div>
                    </header>

                    {/* Content Scrollable */}
                    <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#444746] p-4 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

// Google Material 3 Navigation Item (Pill Shape)
function NavItem({ href, icon, label, active = false }: { href: string, icon: string, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200
                ${active
                    ? 'bg-[#A8C7FA] text-[#051F49]' // Active State (Secondary Container / On Secondary Container)
                    : 'text-[#C4C7C5] hover:bg-[#1E1F20] hover:text-[#E3E3E3] hover:bg-opacity-50' // Inactive State 
                } 
                ${!active && 'hover:bg-[#444746]/50'}
            `}
        >
            <span
                className={`material-symbols-rounded text-[24px] ${active ? 'font-fill' : ''}`}
                style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
            >
                {icon}
            </span>
            <span>{label}</span>
        </Link>
    );
}
