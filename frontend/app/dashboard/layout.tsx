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

            {/* Sidebar - Power BI Premium Dark Mode */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-[280px] 
                    bg-gradient-to-b from-[#0A0E1A] via-[#0D1117] to-[#0A0E1A]
                    border-r border-white/[0.06]
                    backdrop-blur-2xl
                    transform transition-transform duration-300 ease-in-out
                    flex flex-col
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Sidebar Glow Effect */}
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#00FF94]/20 via-transparent to-[#00A3FF]/20 pointer-events-none" />

                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-white/[0.04] relative">
                    <Link href="/dashboard" className="flex items-center gap-4 group">
                        <motion.div
                            className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#00FF94]/30 shadow-[0_0_20px_rgba(0,255,148,0.15)] shrink-0"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,148,0.3)" }}
                        >
                            <Image src="/logo-algor.webp" alt="Algor" fill className="object-contain" />
                        </motion.div>
                        <div>
                            <span className="font-orbitron font-bold text-lg tracking-wide text-white whitespace-nowrap flex items-center gap-1">
                                ALGOR <span className="text-[#00FF94]">BRASIL</span>
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Organization Switcher */}
                <div className="pt-5 px-4">
                    <OrganizationSwitcher />
                </div>

                {/* Primary Action Button */}
                <div className="px-4 mb-4 mt-4">
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,255,148,0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-3 w-full h-[48px] rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00CC76] hover:from-[#00FF94] hover:to-[#00FF94] text-[#0A0E1A] font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(0,255,148,0.25)] border border-[#00FF94]/50"
                    >
                        <span className="material-symbols-rounded text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                        INICIAR CICLO
                    </motion.button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                    {/* Section: Strategy */}
                    <div className="px-3 pt-4 pb-2">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] flex items-center gap-2">
                            <div className="w-4 h-px bg-gradient-to-r from-[#00FF94]/50 to-transparent" />
                            Estratégia
                        </span>
                    </div>
                    <NavItem
                        href="/dashboard"
                        icon="shield_with_house"
                        label="Centro de Comando"
                        active={pathname === "/dashboard"}
                        color="#00FF94"
                    />
                    <NavItem
                        href="/dashboard/clients"
                        icon="business_center"
                        label="Meus Clientes"
                        active={pathname.startsWith("/dashboard/clients")}
                        color="#F59E0B"
                    />
                    <NavItem
                        href="/dashboard/roadmap"
                        icon="map"
                        label="Jornada de Adoção"
                        active={pathname.startsWith("/dashboard/roadmap")}
                        color="#00A3FF"
                    />

                    {/* Section: Operations */}
                    <div className="px-3 pt-6 pb-2">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] flex items-center gap-2">
                            <div className="w-4 h-px bg-gradient-to-r from-[#00A3FF]/50 to-transparent" />
                            Operações
                        </span>
                    </div>
                    <NavItem
                        href="/dashboard/inventory"
                        icon="database"
                        label="Inventário de IA"
                        active={pathname.startsWith("/dashboard/inventory")}
                        color="#00A3FF"
                    />
                    <NavItem
                        href="/dashboard/assessments"
                        icon="fact_check"
                        label="Auditorias"
                        active={pathname === "/dashboard/assessments"}
                        color="#00FF94"
                        badge="4"
                    />
                    <NavItem
                        href="/dashboard/risks"
                        icon="health_and_safety"
                        label="Gestão de Riscos"
                        active={pathname.startsWith("/dashboard/risks")}
                        color="#F59E0B"
                    />
                    <NavItem
                        href="/dashboard/projects"
                        icon="folder_managed"
                        label="Projetos Gov"
                        active={pathname.startsWith("/dashboard/projects")}
                        color="#8B5CF6"
                    />

                    {/* Section: Knowledge */}
                    <div className="px-3 pt-6 pb-2">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] flex items-center gap-2">
                            <div className="w-4 h-px bg-gradient-to-r from-[#8B5CF6]/50 to-transparent" />
                            Conhecimento
                        </span>
                    </div>
                    <NavItem
                        href="/dashboard/courses"
                        icon="school"
                        label="Academy"
                        active={pathname.startsWith("/dashboard/courses")}
                        color="#8B5CF6"
                    />

                    {/* Admin Section */}
                    {user.role === "admin" && (
                        <>
                            <div className="px-3 pt-6 pb-2">
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="w-4 h-px bg-gradient-to-r from-[#EF4444]/50 to-transparent" />
                                    Admin
                                </span>
                            </div>
                            <NavItem href="/dashboard/leads" icon="group" label="Gestão de Leads" active={pathname.startsWith("/dashboard/leads")} color="#EF4444" />
                            <NavItem href="/dashboard/admin" icon="admin_panel_settings" label="Admin System" active={pathname.startsWith("/dashboard/admin")} color="#EF4444" />
                        </>
                    )}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 mt-auto border-t border-white/[0.04] bg-gradient-to-t from-[#0A0E1A] to-transparent">
                    <div className="space-y-1 mb-4">
                        <NavItem href="/dashboard/settings" icon="settings" label="Configurações" active={pathname === "/dashboard/settings"} color="#6B7280" />
                        <NavItem href="/dashboard/exclusive" icon="diamond" label="Acervo Premium" active={pathname === "/dashboard/exclusive"} color="#FFD700" badge="PRO" />
                    </div>

                    {/* User Card */}
                    <motion.div
                        className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] cursor-pointer transition-all group relative overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                    >
                        {/* User Card Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF94]/5 via-transparent to-[#00A3FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF94]/20 to-[#00A3FF]/20 text-white flex items-center justify-center text-sm font-bold border border-white/10 shrink-0 relative">
                            <span className="relative z-10">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0 relative z-10">
                            <p className="text-sm font-semibold text-white truncate group-hover:text-[#00FF94] transition-colors">{user?.name}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] text-gray-500 truncate capitalize">{user?.role}</p>
                                {user.role === 'member' || user.role === 'admin' ? (
                                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20">PRO</span>
                                ) : (
                                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-gray-800 text-gray-500 border border-gray-700">FREE</span>
                                )}
                            </div>
                        </div>
                        <motion.button
                            onClick={handleLogout}
                            className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all relative z-10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="material-symbols-rounded text-lg">logout</span>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen relative overflow-hidden">
                {/* Mobile Header */}
                <header className="h-16 lg:hidden flex items-center justify-between px-4 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-white/[0.04] relative z-20">
                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-white rounded-lg hover:bg-white/5 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="material-symbols-rounded">menu</span>
                        </motion.button>
                        <span className="font-bold text-lg text-white">ALGOR</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
                        <span className="text-[10px] font-mono text-[#00FF94] uppercase tracking-wider">Online</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative z-10">
                    {children}
                </main>
            </div>
        </div>
    );
}

// ========================================
// PREMIUM NAVIGATION ITEM
// ========================================
function NavItem({
    href,
    icon,
    label,
    active = false,
    color = "#00FF94",
    badge
}: {
    href: string;
    icon: string;
    label: string;
    active?: boolean;
    color?: string;
    badge?: string;
}) {
    return (
        <Link href={href}>
            <motion.div
                className={`
                    flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden group
                    ${active
                        ? 'bg-white/[0.06] text-white border border-white/[0.08]'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
                    } 
                `}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Active Indicator */}
                {active && (
                    <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                        style={{ backgroundColor: color }}
                        layoutId="activeIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                )}

                {/* Hover Glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                        background: `linear-gradient(90deg, ${color}08 0%, transparent 100%)`
                    }}
                />

                <span
                    className={`material-symbols-rounded text-[20px] transition-all relative z-10 ${active ? '' : 'group-hover:scale-110'}`}
                    style={{
                        color: active ? color : undefined,
                        fontVariationSettings: active ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400"
                    }}
                >
                    {icon}
                </span>
                <span className={`flex-1 relative z-10 ${active ? 'font-semibold tracking-wide' : 'tracking-wide'}`}>
                    {label}
                </span>

                {/* Badge */}
                {badge && (
                    <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-bold border relative z-10"
                        style={{
                            backgroundColor: `${color}15`,
                            borderColor: `${color}30`,
                            color: color
                        }}
                    >
                        {badge}
                    </span>
                )}
            </motion.div>
        </Link>
    );
}
