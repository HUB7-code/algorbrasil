"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlayCircle, Clock, Award } from 'lucide-react';

interface CourseSnippet {
    id: string;
    title: string;
    type: string;
    thumbnail: string | null;
}

export default function CoursesListPage() {
    const [courses, setCourses] = useState<CourseSnippet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('algor_token');
                if (token) {
                    const res = await fetch('/api/v1/lms/courses', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setCourses(data);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">

            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-4">
                <div>
                    <h1 className="text-3xl font-display font-medium text-white tracking-tight">Academia ALGOR</h1>
                    <p className="text-gray-400 mt-2 font-light text-sm">Cursos de alta performance para auditores de IA e ISO 42001.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center p-20 text-brand-blue animate-pulse font-mono text-sm">Carregando módulos de treinamento...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <Link href={`/dashboard/classroom/${course.id}`} key={course.id} className="group">
                            <div className="glass-panel rounded-3xl overflow-hidden hover:border-brand-blue/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,163,255,0.15)] relative hover:-translate-y-2">

                                {/* Thumbnail Area */}
                                <div className="aspect-video bg-black/40 flex items-center justify-center relative overflow-hidden">
                                    {/* Background Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-90" />

                                    {/* Play Button with Pulse */}
                                    <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                                        <div className="absolute inset-0 bg-brand-blue blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                                        <PlayCircle className="w-16 h-16 text-white relative z-10 drop-shadow-lg" strokeWidth={1.5} />
                                    </div>

                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest backdrop-blur-md border shadow-lg
                                            ${course.type === 'certification' ? 'bg-purple-500/20 text-purple-200 border-purple-500/30' : 'bg-brand-blue/20 text-brand-blue border-brand-blue/30'}
                                        `}>
                                            {course.type === 'certification' ? 'CERTIFICAÇÃO OFICIAL' : 'WORKSHOP TÉCNICO'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-display font-medium text-white mb-3 group-hover:text-brand-blue transition-colors leading-tight">
                                        {course.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-light">
                                        Domine os conceitos fundamentais e avançados para auditoria de algoritmos segundo a ISO/IEC 42001.
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-brand-green" />
                                                <span>8h Duração</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Award className="w-3.5 h-3.5 text-brand-amber" />
                                                <span>Certificado</span>
                                            </div>
                                        </div>
                                        <span className="text-brand-blue text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                            Iniciar
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Seed Card */}
                    {courses.length === 0 && (
                        <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center gap-4">
                            <p className="text-gray-500 font-light">Nenhum curso disponível no momento.</p>
                            <button
                                onClick={async () => {
                                    try {
                                        const token = localStorage.getItem('algor_token');
                                        const res = await fetch('/api/v1/lms/seed', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
                                        if (res.ok) {
                                            window.location.reload();
                                        } else {
                                            const err = await res.json();
                                            alert(`Falha ao criar curso: ${res.status} - ${JSON.stringify(err)}`);
                                        }
                                    } catch (e) {
                                        alert("Erro de conexão ao tentar criar curso.");
                                        console.error(e);
                                    }
                                }}
                                className="px-6 py-2 rounded-full bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white transition-all text-sm font-medium border border-brand-blue/20"
                            >
                                Gerar Dados de Demonstração (Seed)
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
