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
    Activity
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
        <div className="flex h-screen bg-brand-navy overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-30
                    w-64 bg-[#050B14] border-r border-brand-blue/10
                    transform transition-transform duration-300 ease-in-out
                    flex flex-col
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-brand-blue/5">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-brand-green/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <Image
                                src="/logo-algor.jpg"
                                alt="Algor"
                                width={32}
                                height={32}
                                className="relative rounded-full w-8 h-8 border border-brand-green/30"
                            />
                        </div>
                        <span className="font-display font-bold text-white tracking-wide">
                            ALGOR <span className="text-brand-green text-xs align-top">CONSOLE</span>
                        </span>
                    </Link>
                </div>

                {/* User Info */}
                <div className="p-4">
                    <div className="glass-panel p-3 rounded-lg flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded bg-brand-blue/20 flex items-center justify-center text-brand-blue font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">{user.name}</p>
                            <p className="text-[10px] text-brand-green font-mono uppercase tracking-wider">{user.role}</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        <NavItem href="/dashboard" icon={<LayoutDashboard />} label="Visão Geral" active />
                        <NavItem href="/dashboard/assessments" icon={<FileText />} label="Avaliações" />
                        <NavItem href="/dashboard/risks" icon={<ShieldAlert />} label="Gestão de Riscos" />
                        {user.role === "admin" && (
                            <NavItem href="/dashboard/admin" icon={<Activity />} label="Admin Panel" />
                        )}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto p-4 border-t border-brand-blue/5 space-y-1">
                    <NavItem href="/dashboard/settings" icon={<Settings />} label="Configurações" />
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs font-mono text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group"
                    >
                        <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Sair do Sistema
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Header Mobile */}
                <header className="h-16 lg:hidden flex items-center justify-between px-4 border-b border-brand-blue/10 bg-[#050B14]">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2">
                            {isSidebarOpen ? <X /> : <Menu />}
                        </button>
                        <span className="font-display font-bold text-white">ALGOR</span>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto bg-brand-navy p-4 lg:p-8 relative">
                    {/* Bkg Texture */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #002d5c 0%, transparent 50%)' }}
                    />

                    <div className="relative z-10 max-w-6xl mx-auto">
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
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                ${active
                    ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                    : 'text-brand-blue/60 hover:text-white hover:bg-white/5'
                }
            `}
        >
            <span className={`w-4 h-4 transition-transform group-hover:scale-110 ${active ? 'text-brand-green' : ''}`}>
                {icon}
            </span>
            <span className="text-xs font-mono font-medium tracking-wide">
                {label}
            </span>
        </Link>
    );
}
