"use client";

import React, { useState, useEffect } from "react";
import CourseEditor from "./components/CourseEditor";

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
    const [activeTab, setActiveTab] = useState<'users' | 'lms' | 'invites'>('users');

    // Invite State
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteLink, setInviteLink] = useState("");

    // LMS State
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<any | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // ... (fetchAllData remains the same)

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

            // Fetch Courses for LMS Management
            const resCourses = await fetch("/api/v1/lms/courses", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (resCourses.ok) {
                const coursesData = await resCourses.json();
                setCourses(coursesData);
                // If editing, refresh the specific course too
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
            setIsRefreshing(false);
        }
    };

    const handleEditCourse = async (courseId: string) => {
        setLoading(true);
        const token = localStorage.getItem("algor_token");
        try {
            const res = await fetch(`/api/v1/lms/courses/${courseId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                setSelectedCourseForEdit(await res.json());
            }
        } catch (e) { console.error(e); }
        setLoading(false);
    }

    const handleCreateInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Implementation for SaaS MVP
        setInviteLink(`https://algor.com.br/register?invite=${btoa(inviteEmail)}`);
    };

    const handleDeleteUser = async (userId: number) => {
        if (!confirm("Banir usuário?")) return;
        // Mock Delete Local
        setUsers(users.filter(u => u.id !== userId));
        // TODO: Backend API Access
    };

    const handleUpdateRole = async (userId: number, newRole: string) => {
        // Mock Update Local
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        // TODO: Backend API Access
    };

    const handleDeleteCourse = async (courseId: string) => {
        if (!confirm("Excluir curso?")) return;
        setCourses(courses.filter(c => c.id !== courseId));
        // TODO: Backend API Access
    };

    const handleCreateCourse = async () => {
        const id = prompt("ID do Curso (slug, ex: novo-curso):");
        if (!id) return;
        const title = prompt("Título do Curso:");
        if (!title) return;

        const token = localStorage.getItem("algor_token");
        try {
            const res = await fetch("/api/v1/lms/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    description: "Descrição pendente...",
                    modules: []
                })
            });
            if (res.ok) {
                fetchAllData();
            } else {
                alert("Erro ao criar curso");
            }
        } catch (e) { console.error(e); }
    };


    useEffect(() => {
        fetchAllData();
    }, []);

    // ... (Keep existing handlers)

    return (
        <div className="min-h-screen bg-[#0A1A2F] text-white font-sans p-8">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white mb-2">Painel de Controle <span className="text-brand-green text-sm px-2 py-1 rounded bg-brand-green/10 border border-brand-green/20 ml-2">SUPERUSER</span></h1>
                        <p className="text-gray-400">Gestão centralizada da plataforma Algor.</p>
                    </div>
                </div>

                {/* Tabs (Hide if editing course) */}
                {!selectedCourseForEdit && (
                    <div className="flex gap-4 border-b border-white/5 pb-1">
                        <button onClick={() => setActiveTab('users')} className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'users' ? 'border-brand-blue text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                            Usuários ({users.length})
                        </button>
                        <button onClick={() => setActiveTab('lms')} className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'lms' ? 'border-brand-blue text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                            Conteúdo LMS
                        </button>
                        <button onClick={() => setActiveTab('invites')} className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'invites' ? 'border-brand-blue text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                            Convites Enterprise
                        </button>
                    </div>
                )}

                {/* Content Area */}
                <div className="min-h-[400px]">
                    {selectedCourseForEdit ? (
                        <CourseEditor
                            course={selectedCourseForEdit}
                            onBack={() => { setSelectedCourseForEdit(null); fetchAllData(); }}
                            onRefresh={fetchAllData}
                        />
                    ) : (
                        <>
                            {activeTab === 'users' && (
                                <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02]">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                                                    <th className="px-8 py-4 font-medium">Usuário</th>
                                                    <th className="px-8 py-4 font-medium">Role</th>
                                                    <th className="px-8 py-4 font-medium">Status Pagamento</th>
                                                    <th className="px-8 py-4 font-medium text-right">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                                                {users.map((u) => (
                                                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                                        <td className="px-8 py-4">
                                                            <div className="font-medium text-white">{u.full_name || "Guest"}</div>
                                                            <div className="text-xs text-gray-500">{u.email}</div>
                                                        </td>
                                                        <td className="px-8 py-4">
                                                            <select
                                                                value={u.role}
                                                                onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                                                className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs text-gray-300 focus:border-brand-blue outline-none"
                                                            >
                                                                <option value="user">User</option>
                                                                <option value="auditor">Auditor</option>
                                                                <option value="admin">Admin</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-8 py-4">
                                                            {u.payment_status === 'Paid' ? <span className="text-brand-green font-bold text-xs">PAGO</span> : <span className="text-gray-600 text-xs">PENDENTE</span>}
                                                        </td>
                                                        <td className="px-8 py-4 text-right">
                                                            <button onClick={() => handleDeleteUser(u.id)} className="text-red-400 hover:text-red-300 text-xs hover:underline">
                                                                Banir
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'lms' && (
                                <div className="space-y-8">
                                    {/* File Uploader */}
                                    <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-gradient-to-r from-blue-900/10 to-transparent">
                                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-wider">Gestor de Arquivos (PDFs/Docs)</h3>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="file"
                                                id="fileUpload"
                                                className="hidden"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    // Validate Size (example 50MB)
                                                    if (file.size > 50 * 1024 * 1024) {
                                                        alert("Arquivo muito grande. Limite 50MB.");
                                                        return;
                                                    }

                                                    const formData = new FormData();
                                                    formData.append("file", file);

                                                    const token = localStorage.getItem("algor_token");

                                                    try {
                                                        alert("Enviando...");
                                                        const res = await fetch("/api/v1/admin/upload", {
                                                            method: "POST",
                                                            headers: { "Authorization": `Bearer ${token}` },
                                                            body: formData
                                                        });
                                                        if (res.ok) {
                                                            const da = await res.json();
                                                            alert(`Upload Sucesso!\nURL: ${da.url}`);
                                                        } else {
                                                            alert("Erro no upload");
                                                        }
                                                    } catch (err) {
                                                        console.error(err);
                                                        alert("Erro de conexão");
                                                    }
                                                }}
                                            />
                                            <label htmlFor="fileUpload" className="cursor-pointer px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 group">
                                                <span className="material-symbols-rounded group-hover:scale-110 transition-transform">cloud_upload</span>
                                                <span>Selecionar Arquivo</span>
                                            </label>
                                            <p className="text-xs text-gray-500">Max: 50MB. Formatos: PDF, DOCX, XLSX.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Create Card */}
                                        <div onClick={handleCreateCourse} className="border border-dashed border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center p-8 text-center hover:bg-white/10 transition-colors cursor-pointer group">
                                            <div className="w-12 h-12 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-rounded">add</span>
                                            </div>
                                            <h3 className="text-white font-medium">Criar Novo Curso</h3>
                                            <p className="text-xs text-gray-500 mt-2">Adicionar módulo de treinamento.</p>
                                        </div>

                                        {courses.map(course => (
                                            <div key={course.id} className="glass-panel p-6 rounded-3xl border border-white/5 relative group hover:border-brand-blue/30 transition-all">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-2 py-1 rounded border border-brand-blue/20">{course.type}</span>
                                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }} className="text-gray-500 hover:text-red-400 transition-colors z-10 relative">
                                                        <span className="material-symbols-rounded text-lg">delete</span>
                                                    </button>
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                                                <p className="text-xs text-gray-400 line-clamp-2 mb-4">Gerenciamento via API ou Dashboard.</p>

                                                <button onClick={() => handleEditCourse(course.id)} className="w-full bg-white/5 hover:bg-brand-blue hover:text-white border border-white/10 rounded-xl py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                                    <span className="material-symbols-rounded text-xs">edit</span>
                                                    Editar Conteúdo
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'invites' && (
                                <div className="max-w-xl mx-auto glass-panel p-8 rounded-3xl border border-white/5">
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-rounded text-brand-blue">person_add</span>
                                        Gerar Acesso Enterprise
                                    </h2>
                                    <form onSubmit={handleCreateInvite} className="space-y-4">
                                        <div>
                                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2">E-mail Corporativo</label>
                                            <input
                                                type="email"
                                                value={inviteEmail}
                                                onChange={(e) => setInviteEmail(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-blue outline-none transition-colors"
                                                placeholder="client@corp.com"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl hover:bg-white hover:text-brand-navy transition-all">
                                            GERAR LINK
                                        </button>
                                    </form>
                                    {inviteLink && (
                                        <div className="mt-6 p-4 bg-brand-green/10 border border-brand-green/20 rounded-xl animate-in slide-in-from-top-2">
                                            <p className="text-xs text-brand-green font-bold mb-2">Convite Pronto:</p>
                                            <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                                                <code className="text-xs text-gray-300 break-all">{inviteLink}</code>
                                                <span className="material-symbols-rounded text-brand-green cursor-pointer hover:scale-110" onClick={() => navigator.clipboard.writeText(inviteLink)}>content_copy</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}
