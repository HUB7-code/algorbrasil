"use client";

import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Users, BookOpen, UserPlus, Trash2, Edit, UploadCloud, Plus, Search, ShieldAlert, CheckCircle, ArrowRight } from "lucide-react";
import CourseEditor from "./components/CourseEditor";

interface AdminUser {
    id: number;
    email: string;
    full_name?: string;
    role: string;
    payment_status?: string;
}

// Mock Data for Charts (Simulating history for visual impact)
const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 7500 },
];

const userActivityData = [
    { name: 'Mon', active: 120 },
    { name: 'Tue', active: 150 },
    { name: 'Wed', active: 180 },
    { name: 'Thu', active: 220 },
    { name: 'Fri', active: 300 },
    { name: 'Sat', active: 250 },
    { name: 'Sun', active: 190 },
];

export default function AdminDashboard() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'users' | 'lms' | 'invites' | 'partners'>('users');

    // Partner Requests State
    const [partnerRequests, setPartnerRequests] = useState<any[]>([]);

    // Invite State
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteLink, setInviteLink] = useState("");

    // LMS State
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<any | null>(null);

    const fetchAllData = async () => {
        const token = localStorage.getItem("algor_token");
        if (!token) return;
        setLoading(true);

        try {
            // Fetch Users
            const res = await fetch("/api/v1/admin/users", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.status === 403) {
                alert("Acesso negado. Apenas administradores.");
                window.location.href = "/dashboard";
                return;
            }
            if (res.ok) setUsers(await res.json());

            // Fetch Partner Applications
            const resPartners = await fetch("/api/v1/partners/applications", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (resPartners.ok) setPartnerRequests(await resPartners.json());

            // Fetch Courses for LMS Management
            const resCourses = await fetch("/api/v1/lms/courses", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (resCourses.ok) {
                const coursesData = await resCourses.json();
                setCourses(coursesData);
                // If editing, refresh the specific course
                if (selectedCourseForEdit) {
                    const updated = await fetch(`/api/v1/lms/courses/${selectedCourseForEdit.id}`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    if (updated.ok) setSelectedCourseForEdit(await updated.json());
                }
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePartnerStatus = async (appId: number, newStatus: string) => {
        if (!confirm(`Confirmar alteração de status para: ${newStatus}?`)) return;

        const token = localStorage.getItem("algor_token");
        try {
            const res = await fetch(`/api/v1/partners/applications/${appId}/status?new_status=${newStatus}`, {
                method: 'PUT',
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                fetchAllData(); // Refresh list
            }
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const handleUpdateRole = async (userId: number, newRole: string) => {
        const token = localStorage.getItem("algor_token");
        try {
            await fetch(`/api/v1/admin/users/${userId}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar função.");
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!confirm("Tem certeza que deseja remover este usuário?")) return;
        const token = localStorage.getItem("algor_token");
        try {
            await fetch(`/api/v1/admin/users/${userId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            setUsers(users.filter(u => u.id !== userId));
        } catch (error) {
            console.error(error);
            alert("Erro ao deletar usuário.");
        }
    };

    const handleCreateInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("algor_token");
        try {
            const res = await fetch("/api/v1/admin/invites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email: inviteEmail, type: "enterprise" })
            });
            if (res.ok) {
                const data = await res.json();
                setInviteLink(data.link);
            } else {
                alert("Falha ao criar convite.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateCourse = async () => {
        const token = localStorage.getItem("algor_token");
        try {
            const res = await fetch("/api/v1/lms/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title: "Novo Curso Sem Título", description: "Descrição..." })
            });
            if (res.ok) {
                const newCourse = await res.json();
                setCourses([...courses, newCourse]);
                setSelectedCourseForEdit(newCourse);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCourse = async (courseId: number) => {
        if (!confirm("Deletar curso permanentemente?")) return;
        const token = localStorage.getItem("algor_token");
        try {
            await fetch(`/api/v1/lms/courses/${courseId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            setCourses(courses.filter(c => c.id !== courseId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditCourse = async (courseId: number) => {
        const course = courses.find(c => c.id === courseId);
        if (course) setSelectedCourseForEdit(course);
    };

    return (
        <div className="p-8 w-full min-h-screen space-y-8 relative text-white font-sans bg-[#0A0E1A] overflow-x-hidden">
            {/* Ambient Background Glow */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#00A3FF]/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#00FF94]/5 rounded-full blur-[128px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-bold font-orbitron text-white mb-2 tracking-wide flex items-center gap-3">
                        CENTRO DE COMANDO
                        <span className="px-2 py-0.5 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-[10px] font-bold uppercase rounded tracking-widest">Super Admin</span>
                    </h1>
                    <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">
                        Status do Sistema: <span className="text-[#00FF94]">Operacional</span> | Nó: São Paulo (BR-1)
                    </p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchAllData} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                        <span className="material-symbols-rounded text-sm">refresh</span> Atualizar
                    </button>
                    <button className="px-4 py-2 bg-[#00FF94]/10 hover:bg-[#00FF94]/20 border border-[#00FF94]/30 text-[#00FF94] rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,255,148,0.15)]">
                        Gerar Relatório
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {!selectedCourseForEdit ? (
                <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* KPI Grid - High Density */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Usuários Totais"
                            value={users.length}
                            subValue="+12% vs semana anterior"
                            icon="group"
                            chartData={revenueData}
                            color="#00A3FF"
                        />
                        <StatCard
                            title="Assinaturas Ativas"
                            value={users.filter(u => u.payment_status === 'Paid').length}
                            subValue="MRR: R$ 12.450"
                            icon="payments"
                            chartData={revenueData}
                            color="#00FF94"
                        />
                        <StatCard
                            title="Parceiros Pendentes"
                            value={partnerRequests.filter(r => r.status === 'pending').length}
                            subValue="Pipeline: Alto Valor"
                            icon="handshake"
                            chartData={revenueData}
                            color="#F59E0B"
                        />
                        <StatCard
                            title="Carga do Sistema"
                            value="24%"
                            subValue="Sistemas Normais"
                            icon="dns"
                            chartData={userActivityData}
                            color="#8B5CF6"
                        />
                    </div>

                    {/* Main Dashboard Layout (Charts + Lists) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">

                        {/* Chart Area: User Growth */}
                        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0D1117]/80 backdrop-blur-xl border border-white/5 flex flex-col relative overflow-hidden group">
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Crescimento da Plataforma</h3>
                                <div className="flex gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />
                                    <span className="text-[10px] text-gray-500">Novos Usuários</span>
                                </div>
                            </div>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="name" stroke="#4B5563" fontSize={10} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#4B5563" fontSize={10} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0A0E1A', borderColor: '#374151', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#00A3FF" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Side Panel: Quick Actions or Secondary Chart */}
                        <div className="p-6 rounded-2xl bg-[#0D1117]/80 backdrop-blur-xl border border-white/5 flex flex-col relative overflow-hidden">
                            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-6">Atividade de Usuários (Semanal)</h3>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={userActivityData}>
                                        <Bar dataKey="active" radius={[4, 4, 0, 0]}>
                                            {userActivityData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 4 ? '#00FF94' : '#1F2937'} />
                                            ))}
                                        </Bar>
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0A0E1A', border: 'none', borderRadius: '8px' }} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">Pico de Tráfego</span>
                                    <span className="text-xs text-[#00FF94] font-bold">Sexta, 14:00</span>
                                </div>
                                <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                    <div className="bg-[#00FF94] w-[75%] h-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs - Glass Style */}
                    <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl w-fit backdrop-blur-md border border-white/5">
                        <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users className="w-4 h-4" />} label="Usuários" />
                        <TabButton active={activeTab === 'partners'} onClick={() => setActiveTab('partners')} icon={<ShieldAlert className="w-4 h-4" />} label="Parceiros" />
                        <TabButton active={activeTab === 'lms'} onClick={() => setActiveTab('lms')} icon={<BookOpen className="w-4 h-4" />} label="Conteúdo LMS" />
                        <TabButton active={activeTab === 'invites'} onClick={() => setActiveTab('invites')} icon={<UserPlus className="w-4 h-4" />} label="Convites" />
                    </div>

                    {/* Render Active Tab */}
                    {activeTab === 'users' && (
                        <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0D1117]/60 backdrop-blur-md">
                            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0A0E1A]/50">
                                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Base de Usuários</h3>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                                        <input type="text" placeholder="Buscar usuários..." className="pl-8 pr-4 py-1.5 bg-[#0A0E1A] border border-white/10 rounded-lg text-xs text-white focus:border-[#00FF94] outline-none" />
                                    </div>
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-[#0A0E1A] text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Identidade</th>
                                        <th className="px-6 py-4">Função</th>
                                        <th className="px-6 py-4">Assinatura</th>
                                        <th className="px-6 py-4 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF94]/20 to-[#00A3FF]/20 flex items-center justify-center text-[10px] font-bold text-white border border-white/5">
                                                        {u.full_name?.charAt(0) || u.email.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-sm">{u.full_name || "Usuário Convidado"}</div>
                                                        <div className="text-[11px] text-gray-500 font-mono tracking-tight">{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                                    className="bg-[#0A0E1A] border border-white/10 rounded px-2 py-1 text-[11px] font-bold text-white focus:border-[#00FF94] outline-none cursor-pointer hover:border-white/30 transition-colors uppercase tracking-wide"
                                                >
                                                    <option value="user">USER</option>
                                                    <option value="auditor">AUDITOR</option>
                                                    <option value="admin">ADMIN</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                {u.payment_status === 'Paid' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94] text-[10px] font-bold uppercase tracking-wider">
                                                        <CheckCircle className="w-3 h-3" /> Plano Pro
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                                                        Plano Gratuito
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDeleteUser(u.id)} className="text-gray-600 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'partners' && (
                        <div className="glass-panel rounded-2xl overflow-hidden bg-[#0D1117]/60 backdrop-blur-md border border-white/10">
                            <table className="w-full text-left">
                                <thead className="bg-[#0A0E1A] text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Candidato</th>
                                        <th className="px-6 py-4">Perfil</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Decisão</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {partnerRequests.map((req) => (
                                        <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white">{req.full_name}</div>
                                                <div className="text-[11px] text-gray-500 font-mono">{req.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-300 text-xs">{req.area}</div>
                                                <div className="text-[10px] text-gray-600 truncate max-w-[150px]">{req.motivation}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${req.status === 'approved' ? 'bg-[#00FF94]/10 text-[#00FF94]' :
                                                    req.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                                        'bg-[#F59E0B]/10 text-[#F59E0B]'
                                                    }`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {req.status === 'pending' && (
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => handleUpdatePartnerStatus(req.id, 'approved')} className="p-1.5 rounded-md bg-[#00FF94]/10 text-[#00FF94] hover:bg-[#00FF94]/20 border border-[#00FF94]/20"><CheckCircle className="w-4 h-4" /></button>
                                                        <button onClick={() => handleUpdatePartnerStatus(req.id, 'rejected')} className="p-1.5 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'lms' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <button onClick={handleCreateCourse} className="h-[240px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors group bg-[#0A0E1A]/50">
                                    <div className="w-14 h-14 rounded-full bg-[#00FF94]/10 text-[#00FF94] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,255,148,0.1)]">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-sm text-white uppercase tracking-wider">Criar Curso</span>
                                </button>
                                {courses.map(course => (
                                    <div key={course.id} className="p-6 rounded-2xl bg-[#0D1117]/80 border border-white/5 hover:border-[#00FF94]/30 transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#8B5CF6]" />
                                        <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                                        <p className="text-xs text-gray-500 mb-6 line-clamp-2">{course.description || "Sem descrição."}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-[10px] font-mono text-gray-600">ID: {course.id}</span>
                                            <button onClick={() => handleEditCourse(course.id)} className="text-xs font-bold text-[#00A3FF] hover:text-white uppercase tracking-wider flex items-center gap-1">Editar <ArrowRight className="w-3 h-3" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'invites' && (
                        <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-[#0D1117]/80 backdrop-blur-xl border border-white/10 text-center">
                            <div className="w-20 h-20 mx-auto bg-[#00FF94]/10 rounded-full flex items-center justify-center mb-6 border border-[#00FF94]/20 shadow-[0_0_30px_rgba(0,255,148,0.15)]">
                                <UserPlus className="w-8 h-8 text-[#00FF94]" />
                            </div>
                            <h2 className="text-3xl font-bold font-orbitron text-white mb-2">Gerar Acesso Enterprise</h2>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">Crie links de convite para clientes exclusivos. Ignora lista de espera.</p>

                            <form onSubmit={handleCreateInvite} className="space-y-4 max-w-sm mx-auto">
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className="w-full bg-[#0A0E1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00FF94] outline-none text-center font-mono placeholder-gray-600"
                                    placeholder="cliente@enterprise.com"
                                    required
                                />
                                <button type="submit" className="w-full bg-[#00FF94] hover:bg-[#00cc76] text-[#0A0E1A] font-bold py-3 rounded-lg shadow-lg hover:shadow-[#00FF94]/20 transition-all uppercase tracking-widest text-xs">
                                    Gerar Link Seguro
                                </button>
                            </form>
                            {inviteLink && (
                                <div className="mt-8 p-4 bg-[#0A0E1A] border border-[#00FF94]/30 rounded-lg flex items-center gap-3 animate-in slide-in-from-top-2">
                                    <code className="text-xs text-[#00FF94] font-mono flex-1 break-all">{inviteLink}</code>
                                    <button onClick={() => navigator.clipboard.writeText(inviteLink)}><CheckCircle className="w-4 h-4 text-[#00FF94]" /></button>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            ) : (
                <CourseEditor
                    course={selectedCourseForEdit}
                    onBack={() => { setSelectedCourseForEdit(null); fetchAllData(); }}
                    onRefresh={fetchAllData}
                />
            )}
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-lg
                ${active ? 'bg-white/10 text-white shadow-md' : 'text-gray-500 hover:text-white hover:bg-white/5'}
            `}
        >
            {icon}
            {label}
        </button>
    )
}

function StatCard({ title, value, subValue, icon, chartData, color }: any) {
    const iconMap: any = {
        'group': <Users className="w-5 h-5" />,
        'payments': <CheckCircle className="w-5 h-5" />,
        'handshake': <ShieldAlert className="w-5 h-5" />,
        'dns': <BookOpen className="w-5 h-5" /> // fallback
    };

    return (
        <div
            className="p-5 rounded-2xl bg-[#0D1117]/60 backdrop-blur-md border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all"
            style={{ borderColor: `${color}20` }}
        >
            <div className={`absolute top-0 right-0 p-20 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity bg-[${color}] blur-3xl rounded-full translate-x-10 -translate-y-10`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-2.5 rounded-lg border border-white/5 bg-white/5 text-[${color}]`} style={{ color: color, borderColor: `${color}30` }}>
                    {iconMap[icon]}
                </div>
                {chartData && (
                    <div className="h-8 w-16">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white font-mono tracking-tight">{value}</h3>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{title}</p>
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                    <p className="text-[10px] text-gray-500 font-mono">{subValue}</p>
                </div>
            </div>
        </div>
    );
}
