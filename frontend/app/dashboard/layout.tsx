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

            {/* AMBIENT LIGHTING - Power BI Premium Style (Enhanced) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#00A3FF]/10 rounded-full blur-[180px] mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#00FF94]/5 rounded-full blur-[180px] mix-blend-screen" />
                <div className="absolute top-[30%] left-[40%] w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[150px] animate-pulse-slow" />
            </div>

            {/* Sidebar - Ultra Modern Premium */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-[280px] 
                    bg-gradient-to-b from-[#0A0E1A] via-[#0D121F] to-[#0A0E1A]
                    backdrop-blur-2xl
                    border-r border-[#00FF94]/10
                    transform transition-transform duration-300 ease-in-out
                    flex flex-col
                    shadow-[0_0_50px_rgba(0,0,0,0.5)]
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Sidebar Top Glow */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF94]/50 to-transparent opacity-50" />

                {/* Logo Area */}
                <div className="h-32 flex flex-col items-center justify-center px-6 relative mt-4 mb-2">
                    <Link href="/dashboard" className="flex flex-col items-center gap-4 group">
                        <div className="relative w-20 h-20">
                            {/* Animated Rings */}
                            <div className="absolute inset-0 rounded-full border border-[#00FF94]/30 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 rounded-full border border-[#00A3FF]/30 rotate-45 group-hover:rotate-90 transition-transform duration-700" />

                            <div className="relative z-10 w-full h-full rounded-full bg-[#0A0E1A] flex items-center justify-center shadow-[0_0_30px_rgba(0,255,148,0.15)] group-hover:shadow-[0_0_50px_rgba(0,255,148,0.3)] transition-all duration-500">
                                <Image src="/logo-algor.webp" alt="Algor" width={64} height={64} className="object-contain drop-shadow-[0_0_10px_rgba(0,255,148,0.5)]" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Organization Switcher */}
                <div className="px-6 mb-6 mt-4">
                    <OrganizationSwitcher />
                </div>

                {/* Primary Action Button - Premium */}
                <div className="px-6 mb-8">
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(0,255,148,0.2)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex items-center justify-center gap-3 w-full h-[48px] rounded-xl bg-gradient-to-r from-[#00FF94]/10 to-[#00A3FF]/10 hover:from-[#00FF94]/20 hover:to-[#00A3FF]/20 border border-[#00FF94]/30 hover:border-[#00FF94]/60 transition-all overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="material-symbols-rounded text-[#00FF94] text-xl">play_circle</span>
                        <span className="font-orbitron font-bold text-xs tracking-widest text-white">INICIAR CICLO</span>
                    </motion.button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                    {/* Section: Strategy */}
                    <div className="px-4 py-2 mt-2 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-600" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] font-orbitron">
                            Estratégia
                        </span>
                    </div>
                    <NavItem href="/dashboard" icon="shield_with_house" label="Centro de Comando" active={pathname === "/dashboard"} color="#00FF94" />
                    <NavItem href="/dashboard/clients" icon="business_center" label="Meus Clientes" active={pathname.startsWith("/dashboard/clients")} color="#F59E0B" />
                    <NavItem href="/dashboard/roadmap" icon="map" label="Jornada de Adoção" active={pathname.startsWith("/dashboard/roadmap")} color="#00A3FF" />

                    {/* Section: Operations */}
                    <div className="px-4 py-2 mt-6 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-600" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] font-orbitron">
                            Operações
                        </span>
                    </div>
                    <NavItem href="/dashboard/inventory" icon="database" label="Inventário de IA" active={pathname.startsWith("/dashboard/inventory")} color="#00A3FF" />
                    <NavItem href="/dashboard/assessments" icon="fact_check" label="Auditorias" active={pathname === "/dashboard/assessments"} color="#00FF94" badge="4" />
                    <NavItem href="/dashboard/risks" icon="health_and_safety" label="Gestão de Riscos" active={pathname.startsWith("/dashboard/risks")} color="#F59E0B" />
                    <NavItem href="/dashboard/projects" icon="folder_managed" label="Projetos Gov" active={pathname.startsWith("/dashboard/projects")} color="#8B5CF6" />

                    {/* Section: Knowledge */}
                    <div className="px-4 py-2 mt-6 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-600" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] font-orbitron">
                            Conhecimento
                        </span>
                    </div>
                    <NavItem href="/dashboard/courses" icon="school" label="Academia" active={pathname.startsWith("/dashboard/courses")} color="#8B5CF6" />

                    {/* Admin Section */}
                    {user.role === "admin" && (
                        <>
                            <div className="px-4 py-2 mt-6 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-[#EF4444]" />
                                <span className="text-[10px] font-bold text-[#EF4444]/70 uppercase tracking-[0.2em] font-orbitron">
                                    Núcleo Admin
                                </span>
                            </div>
                            <NavItem href="/dashboard/leads" icon="group" label="Gestão de Leads" active={pathname.startsWith("/dashboard/leads")} color="#EF4444" />
                            <NavItem href="/dashboard/admin" icon="admin_panel_settings" label="Status do Sistema" active={pathname.startsWith("/dashboard/admin")} color="#EF4444" />
                        </>
                    )}
                </nav>

                {/* Bottom Section - User Profile */}
                <div className="p-4 mt-auto border-t border-white/[0.06] bg-[#0A0E1A]/40">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors text-xs font-medium mb-3 group">
                        <span className="material-symbols-rounded text-base group-hover:rotate-90 transition-transform duration-500">settings</span>
                        Configurações
                    </Link>

                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF94] to-[#00A3FF] p-[1.5px]">
                                    <div className="w-full h-full rounded-full bg-[#0B1121] flex items-center justify-center">
                                        {/* Fallback to Initials */}
                                        <span className="font-orbitron font-bold text-white text-xs">{user.name.charAt(0)}</span>
                                    </div>
                                </div>
                                {/* Online Status Dot */}
                                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00FF94] border-2 border-[#0A0E1A]" />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white leading-none mb-1 font-orbitron tracking-tight truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                                <span className="text-[10px] text-gray-400 leading-none uppercase tracking-wider">{user.role}</span>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="text-gray-500 hover:text-[#EF4444] transition-colors p-2 hover:bg-white/5 rounded-lg">
                            <span className="material-symbols-rounded text-xl">logout</span>
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
                        <span className="font-orbitron font-bold text-white tracking-widest">ALGOR</span>
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
