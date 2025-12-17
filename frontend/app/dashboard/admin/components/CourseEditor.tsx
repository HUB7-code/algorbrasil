"use client";

import { useState } from "react";

interface Lesson {
    id: string;
    title: string;
    type: string;
    video_id?: string;
    document_url?: string;
    order: number;
}

interface Module {
    id: number;
    title: string;
    order: number;
    lessons: Lesson[];
}

interface CourseData {
    id: string;
    title: string;
    description: string;
    modules: Module[];
}

interface CourseEditorProps {
    course: CourseData;
    onBack: () => void;
    onRefresh: () => void;
}

export default function CourseEditor({ course, onBack, onRefresh }: CourseEditorProps) {
    const [newModuleTitle, setNewModuleTitle] = useState("");
    const [addingLessonToModule, setAddingLessonToModule] = useState<number | null>(null);

    // New Lesson State
    const [lessonTitle, setLessonTitle] = useState("");
    const [lessonId, setLessonId] = useState("");
    const [lessonType, setLessonType] = useState("video");
    const [lessonContent, setLessonContent] = useState(""); // VideoID or URL

    const handleCreateModule = async () => {
        if (!newModuleTitle) return;
        const token = localStorage.getItem("algor_token");
        try {
            const res = await fetch("/api/v1/lms/modules", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({
                    title: newModuleTitle,
                    order: course.modules.length + 1,
                    course_id: course.id
                })
            });
            if (res.ok) {
                setNewModuleTitle("");
                onRefresh(); // Refresh parent to reload structure
            } else {
                alert("Erro ao criar módulo");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleCreateLesson = async (moduleId: number) => {
        if (!lessonId || !lessonTitle) return;
        const token = localStorage.getItem("algor_token");

        const payload: any = {
            id: lessonId,
            module_id: moduleId,
            title: lessonTitle,
            type: lessonType,
            order: 99, // Backend sort or simple append
            duration_min: 10
        };

        if (lessonType === 'video') payload.video_id = lessonContent;
        if (lessonType === 'document') payload.document_url = lessonContent;

        try {
            const res = await fetch("/api/v1/lms/lessons", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setAddingLessonToModule(null);
                setLessonTitle("");
                setLessonId("");
                setLessonContent("");
                onRefresh();
            } else {
                const err = await res.json();
                alert("Erro: " + err.detail);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-rounded">arrow_back</span>
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-white">{course.title}</h2>
                    <p className="text-gray-400 text-sm">Editando estrutura do curso</p>
                </div>
            </div>

            {/* Modules List */}
            <div className="space-y-6">
                {course.modules.length === 0 && (
                    <div className="text-center p-8 border border-dashed border-white/10 rounded-xl">
                        <p className="text-gray-500">Nenhum módulo criado ainda.</p>
                    </div>
                )}

                {course.modules.map((mod) => (
                    <div key={mod.id} className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-brand-blue">{mod.title}</h3>
                            <button
                                onClick={() => setAddingLessonToModule(mod.id === addingLessonToModule ? null : mod.id)}
                                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-rounded text-sm">add</span> Add Aula
                            </button>
                        </div>

                        {/* Lessons */}
                        <div className="space-y-3 pl-4 border-l-2 border-white/5 ml-2">
                            {mod.lessons.map(lesson => (
                                <div key={lesson.id} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5">
                                    <span className="material-symbols-rounded text-gray-500 text-sm">
                                        {lesson.type === 'video' ? 'play_circle' : 'description'}
                                    </span>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-200">{lesson.title}</p>
                                        <p className="text-[10px] text-gray-500 font-mono">{lesson.id}</p>
                                    </div>
                                    <div className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400">
                                        {lesson.type}
                                    </div>
                                </div>
                            ))}
                            {mod.lessons.length === 0 && <p className="text-xs text-gray-600">Nenhuma aula neste módulo.</p>}
                        </div>

                        {/* Add Lesson Form */}
                        {addingLessonToModule === mod.id && (
                            <div className="mt-4 p-4 bg-brand-blue/5 border border-brand-blue/20 rounded-xl animate-in fade-in space-y-3">
                                <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">Nova Aula</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <input placeholder="ID (Slug ex: aula-01)" value={lessonId} onChange={e => setLessonId(e.target.value)} className="bg-black/30 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-blue" />
                                    <input placeholder="Título da Aula" value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} className="bg-black/30 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-blue" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <select value={lessonType} onChange={e => setLessonType(e.target.value)} className="bg-black/30 border border-white/10 rounded p-2 text-xs text-gray-300 outline-none">
                                        <option value="video">Vídeo (YouTube ID)</option>
                                        <option value="document">Documento (URL)</option>
                                    </select>
                                    <input placeholder={lessonType === 'video' ? "Adicione o ID do YouTube" : "Cole a URL do PDF"} value={lessonContent} onChange={e => setLessonContent(e.target.value)} className="bg-black/30 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-blue" />
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button onClick={() => setAddingLessonToModule(null)} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white">Cancelar</button>
                                    <button onClick={() => handleCreateLesson(mod.id)} className="px-3 py-1.5 text-xs bg-brand-blue text-white rounded hover:bg-brand-blue/80">Salvar Aula</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Create Module Section */}
            <div className="p-6 border border-dashed border-white/10 rounded-2xl flex items-center gap-4 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                <input
                    placeholder="Título do Novo Módulo..."
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    className="flex-1 bg-transparent border-none text-lg outline-none text-white placeholder-gray-600"
                />
                <button
                    disabled={!newModuleTitle}
                    onClick={handleCreateModule}
                    className="bg-white/10 hover:bg-brand-green hover:text-black py-2 px-4 rounded-lg font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    + CRIAR MÓDULO
                </button>
            </div>
        </div>
    );
}
