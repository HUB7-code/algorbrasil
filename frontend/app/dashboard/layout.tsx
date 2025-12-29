"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { OrganizationProvider } from "@/context/OrganizationContext";
import OrganizationSwitcher from "@/components/dashboard/OrganizationSwitcher";

// ========================================
// DASHBOARD LAYOUT - POWER BI PREMIUM
// ========================================

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
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
        <div className="flex h-screen bg-[#0A0E1A] text-white overflow-hidden font-sans selection:bg-[#00FF94] selection:text-[#0A0E1A] relative">

            {/* AMBIENT LIGHTING - Power BI Premium Style */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#00A3FF]/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#00FF94]/5 rounded-full blur-[150px]" />
                <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-[#8B5CF6]/3 rounded-full blur-[120px]" />
            </div>

            {/* Sidebar - Ultra Modern */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-[280px] 
                    bg-[#0A0E1A]/60
                    backdrop-blur-xl
                    border-r border-white/[0.06]
                    transform transition-transform duration-300 ease-in-out
                    flex flex-col
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Sidebar Glow Effect */}
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#00FF94]/5 to-transparent pointer-events-none" />

                {/* Logo Area */}
                <div className="h-32 flex items-center justify-center px-6 relative mt-4 mb-2">
                    <Link href="/dashboard" className="flex flex-col items-center gap-4 group">
                        <div className="relative w-24 h-24 rounded-full border-2 border-[#00FF94]/20 bg-[#0A0E1A] flex items-center justify-center shadow-[0_0_30px_rgba(0,255,148,0.15)] group-hover:border-[#00FF94]/50 group-hover:shadow-[0_0_50px_rgba(0,255,148,0.3)] transition-all duration-500">
                            <div className="absolute inset-0 rounded-full bg-[#00FF94] blur-[30px] opacity-10 group-hover:opacity-30 transition-opacity" />
                            <Image src="/logo-algor.webp" alt="Algor" width={72} height={72} className="object-contain relative z-10 drop-shadow-[0_0_10px_rgba(0,255,148,0.5)]" />
                        </div>
                    </Link>
                </div>

                {/* Organization Switcher - Minimalist */}
                <div className="px-6 mb-6 mt-8">
                    <OrganizationSwitcher />
                </div>

                {/* Primary Action Button - Neon Outline Style */}
                <div className="px-6 mb-8">
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,255,148,0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex items-center justify-center gap-3 w-full h-[48px] rounded-lg bg-[#00FF94]/5 hover:bg-[#00FF94]/10 border border-[#00FF94]/30 hover:border-[#00FF94]/60 text-[#00FF94] font-bold text-xs tracking-widest transition-all overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF94]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="material-symbols-rounded text-lg">play_circle</span>
                        INICIAR CICLO
                    </motion.button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                    {/* Section: Strategy */}
                    <div className="px-4 py-3 mt-2">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] font-mono">
                            Estratégia
                        </span>
                    </div>
                    <NavItem href="/dashboard" icon="shield_with_house" label="Centro de Comando" active={pathname === "/dashboard"} color="#00FF94" />
                    <NavItem href="/dashboard/clients" icon="business_center" label="Meus Clientes" active={pathname.startsWith("/dashboard/clients")} color="#F59E0B" />
                    <NavItem href="/dashboard/roadmap" icon="map" label="Jornada de Adoção" active={pathname.startsWith("/dashboard/roadmap")} color="#00A3FF" />

                    {/* Section: Operations */}
                    <div className="px-4 py-3 mt-4">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] font-mono">
                            Operações
                        </span>
                    </div>
                    <NavItem href="/dashboard/inventory" icon="database" label="Inventário de IA" active={pathname.startsWith("/dashboard/inventory")} color="#00A3FF" />
                    <NavItem href="/dashboard/assessments" icon="fact_check" label="Auditorias" active={pathname === "/dashboard/assessments"} color="#00FF94" badge="4" />
                    <NavItem href="/dashboard/risks" icon="health_and_safety" label="Gestão de Riscos" active={pathname.startsWith("/dashboard/risks")} color="#F59E0B" />
                    <NavItem href="/dashboard/projects" icon="folder_managed" label="Projetos Gov" active={pathname.startsWith("/dashboard/projects")} color="#8B5CF6" />

                    {/* Section: Knowledge */}
                    <div className="px-4 py-3 mt-4">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] font-mono">
                            Conhecimento
                        </span>
                    </div>
                    <NavItem href="/dashboard/courses" icon="school" label="Academia" active={pathname.startsWith("/dashboard/courses")} color="#8B5CF6" />

                    {/* Admin Section */}
                    {user.role === "admin" && (
                        <>
                            <div className="px-4 py-3 mt-4">
                                <span className="text-[9px] font-bold text-[#EF4444]/70 uppercase tracking-[0.2em] font-mono">
                                    Núcleo Admin
                                </span>
                            </div>
                            <NavItem href="/dashboard/leads" icon="group" label="Gestão de Leads" active={pathname.startsWith("/dashboard/leads")} color="#EF4444" />
                            <NavItem href="/dashboard/admin" icon="admin_panel_settings" label="Status do Sistema" active={pathname.startsWith("/dashboard/admin")} color="#EF4444" />
                        </>
                    )}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 mt-auto border-t border-white/[0.04] bg-[#0A0E1A]/80 backdrop-blur-md">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium mb-1">
                        <span className="material-symbols-rounded text-lg">settings</span>
                        Configurações
                    </Link>

                    {/* User Profile Compact */}
                    <div className="flex items-center justify-between px-4 pt-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF94] to-[#00A3FF] p-[1px]">
                                <div className="w-full h-full rounded-full bg-[#0A0E1A] flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">{user.name.charAt(0)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white leading-none mb-1">{user.name}</span>
                                <span className="text-[10px] text-gray-500 leading-none capitalize">{user.role}</span>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition-colors">
                            <span className="material-symbols-rounded text-lg">logout</span>
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen relative overflow-hidden bg-[#0A0E1A]">
                {/* Mobile Header */}
                <header className="h-16 lg:hidden flex items-center justify-between px-4 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-white/[0.04] relative z-20">
                    <div className="flex items-center gap-3">
                        <motion.button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white" whileTap={{ scale: 0.95 }}>
                            <span className="material-symbols-rounded">menu</span>
                        </motion.button>
                        <span className="font-orbitron font-bold text-white">ALGOR</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto relative z-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}

// ========================================
// ULTRA MODERN NAV ITEM
// ========================================
function NavItem({ href, icon, label, active = false, color = "#00FF94", badge }: any) {
    return (
        <Link href={href}>
            <div className={`relative px-4 py-2.5 flex items-center gap-3 group transition-all duration-300 ${active ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'}`}>

                {/* Active Indicator Line */}
                {active && (
                    <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute left-0 top-0 bottom-0 w-[2px] shadow-[0_0_10px]"
                        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                    />
                )}

                {/* Icon */}
                <span
                    className={`material-symbols-rounded text-lg transition-colors duration-300 ${active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}
                    style={{ textShadow: active ? `0 0 10px ${color}` : 'none' }}
                >
                    {icon}
                </span>

                {/* Label */}
                <span className={`text-sm tracking-wide transition-colors duration-300 ${active ? 'text-white font-medium' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {label}
                </span>

                {/* Badge */}
                {badge && (
                    <span
                        className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-sm border"
                        style={{
                            color: active ? color : '#6B7280',
                            borderColor: active ? `${color}40` : 'rgba(255,255,255,0.1)',
                            backgroundColor: active ? `${color}10` : 'transparent'
                        }}
                    >
                        {badge}
                    </span>
                )}
            </div>
        </Link>
    );
}
