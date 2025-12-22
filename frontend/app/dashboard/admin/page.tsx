"use client";

import React, { useState, useEffect } from "react";
import CourseEditor from "./components/CourseEditor";
import { Users, BookOpen, UserPlus, Trash2, Edit, UploadCloud, Plus, Search, ShieldAlert, CheckCircle } from "lucide-react";

interface AdminUser {
    id: number;
    email: string;
    full_name?: string;
    role: string;
    payment_status?: string;
}

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

    // ... existing state

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

    // --- HANDLERS ---

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
                setInviteLink(data.link); // Assuming backend returns { link: "..." }
            } else {
                alert("Falha ao criar convite.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // LMS Handlers
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
        <div className="p-8 w-full min-h-screen space-y-10 relative text-white font-sans bg-[#0A1A2F]">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2 tracking-tight flex items-center gap-3">
                        Admin System
                        <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase rounded-lg tracking-widest">Superuser</span>
                    </h1>
                    <p className="text-gray-300 font-light text-lg">
                        Controle total da plataforma ALGOR.
                    </p>
                </div>
            </div>

            {/* Content Area */}
            {!selectedCourseForEdit ? (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 border-b border-white/5 overflow-x-auto pb-2">
                        <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users className="w-4 h-4" />} label={`Usuários (${users.length})`} />
                        <TabButton active={activeTab === 'partners'} onClick={() => setActiveTab('partners')} icon={<ShieldAlert className="w-4 h-4" />} label={`Candidaturas (${partnerRequests.filter(r => r.status === 'pending').length})`} />
                        <TabButton active={activeTab === 'lms'} onClick={() => setActiveTab('lms')} icon={<BookOpen className="w-4 h-4" />} label="Conteúdo LMS" />
                        <TabButton active={activeTab === 'invites'} onClick={() => setActiveTab('invites')} icon={<UserPlus className="w-4 h-4" />} label="Invites Enterprise" />
                    </div>

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        // ... existing users table
                        <div className="glass-panel rounded-2xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/5 text-xs uppercase font-bold text-gray-400 tracking-wider">
                                    <tr>
                                        <th className="px-8 py-4">Usuário</th>
                                        <th className="px-8 py-4">Função (Role)</th>
                                        <th className="px-8 py-4">Pagamento</th>
                                        <th className="px-8 py-4 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-4">
                                                <div className="font-medium text-white">{u.full_name || "Guest User"}</div>
                                                <div className="text-xs text-gray-500 font-mono">{u.email}</div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                                    className="bg-[#0A1A2F] border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:border-[#00FF94] outline-none"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="auditor">Auditor</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                            <td className="px-8 py-4">
                                                {u.payment_status === 'Paid' ? (
                                                    <span className="text-[#00FF94] font-bold text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span>
                                                ) : (
                                                    <span className="text-gray-500 text-xs">Free Tier</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <button onClick={() => handleDeleteUser(u.id)} className="text-gray-500 hover:text-red-400 transition-colors p-2 hover:bg-white/5 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* PARTNERS TAB */}
                    {activeTab === 'partners' && (
                        <div className="glass-panel rounded-2xl overflow-hidden">
                            {partnerRequests.length === 0 ? (
                                <div className="p-12 text-center text-gray-500">Nenhuma solicitação encontrada.</div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 border-b border-white/5 text-xs uppercase font-bold text-gray-400 tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Candidato</th>
                                            <th className="px-6 py-4">Perfil</th>
                                            <th className="px-6 py-4">Motivação</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-sm">
                                        {partnerRequests.map((req) => (
                                            <tr key={req.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-white">{req.full_name}</div>
                                                    <div className="text-xs text-gray-400">{req.email}</div>
                                                    <a href={`https://wa.me/${req.whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-xs text-[#00FF94] hover:underline flex items-center gap-1 mt-1">
                                                        <span className="material-symbols-rounded text-[10px]">chat</span> WhatsApp
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-300 mb-1">{req.area}</div>
                                                    {req.linkedin && (
                                                        <a href={req.linkedin} target="_blank" className="text-xs text-blue-400 hover:text-blue-300">Ver LinkedIn ↗</a>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="max-w-xs truncate text-gray-500" title={req.motivation}>{req.motivation}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${req.status === 'approved' ? 'bg-[#00FF94]/10 text-[#00FF94]' :
                                                        req.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                                            'bg-yellow-500/10 text-yellow-500'
                                                        }`}>
                                                        {req.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {req.status === 'pending' && (
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleUpdatePartnerStatus(req.id, 'approved')}
                                                                className="px-3 py-1 bg-[#00FF94]/20 hover:bg-[#00FF94]/30 text-[#00FF94] rounded text-xs font-bold transition-colors"
                                                            >
                                                                Aprovar
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdatePartnerStatus(req.id, 'rejected')}
                                                                className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded text-xs font-bold transition-colors"
                                                            >
                                                                Rejeitar
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {/* LMS TAB */}
                    {activeTab === 'lms' && (
                        <div className="space-y-8">
                            {/* Upload Area */}
                            <div className="glass-panel p-8 rounded-2xl border-dashed border border-white/20 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group cursor-pointer">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-[#00FF94]" />
                                </div>
                                <h3 className="text-white font-medium mb-1">Upload de Materiais</h3>
                                <p className="text-sm text-gray-500">Arraste PDFs ou Vídeos aqui (Max 500MB)</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Create New */}
                                <button onClick={handleCreateCourse} className="h-[200px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-[#00FF94]/10 text-[#00FF94] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-sm text-white">Criar Novo Curso</span>
                                </button>

                                {/* Course Cards */}
                                {courses.map(course => (
                                    <div key={course.id} className="glass-panel p-6 rounded-2xl relative group hover:border-white/20">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00A3FF] bg-[#00A3FF]/10 px-2 py-1 rounded border border-[#00A3FF]/20">{course.type || 'Course'}</span>
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }} className="text-gray-500 hover:text-red-400 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <h3 className="text-lg font-serif font-medium text-white mb-2">{course.title}</h3>
                                        <p className="text-xs text-gray-400 mb-6">ID: {course.id}</p>

                                        <button onClick={() => handleEditCourse(course.id)} className="w-full py-2 rounded-lg bg-white/5 hover:bg-white hover:text-[#0A1A2F] text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                            <Edit className="w-3 h-3" /> Editar Conteúdo
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* INVITES TAB */}
                    {activeTab === 'invites' && (
                        <div className="max-w-xl mx-auto glass-panel p-10 rounded-3xl">
                            <h2 className="text-2xl font-serif font-medium text-white mb-6 text-center">Gerar Acesso Enterprise</h2>
                            <form onSubmit={handleCreateInvite} className="space-y-6">
                                <div>
                                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2">E-mail Corporativo</label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="email"
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-[#00FF94] outline-none transition-colors"
                                            placeholder="client@corp.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-[#00FF94] text-[#0A1A2F] font-bold py-3 rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-[#00FF94]/20">
                                    GERAR LINK DE CONVITE
                                </button>
                            </form>

                            {inviteLink && (
                                <div className="mt-8 p-4 bg-[#00FF94]/10 border border-[#00FF94]/20 rounded-xl animate-in slide-in-from-top-2">
                                    <p className="text-xs text-[#00FF94] font-bold mb-2 uppercase tracking-wider">Link Gerado:</p>
                                    <div className="flex items-center gap-3 bg-black/30 p-3 rounded-lg border border-white/5">
                                        <code className="text-xs text-gray-300 break-all flex-1 font-mono">{inviteLink}</code>
                                        <button onClick={() => navigator.clipboard.writeText(inviteLink)} className="p-2 hover:bg-white/10 rounded text-[#00FF94]">
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    </div>
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
                flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2
                ${active ? 'border-[#00FF94] text-white bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'}
            `}
        >
            {icon}
            {label}
        </button>
    )
}
