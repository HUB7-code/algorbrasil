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
                const res = await fetch('/api/v1/lms/courses', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
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
        <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="mb-8">
                <h1 className="text-[32px] font-normal text-[#E3E3E3]">Formação & Treinamento</h1>
                <p className="text-sm text-[#C4C7C5]">Cursos de capacitação e certificação para auditores internos.</p>
            </div>

            {loading ? (
                <div className="text-[#C4C7C5]">Carregando cursos...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Link href={`/dashboard/classroom/${course.id}`} key={course.id} className="group">
                            <div className="bg-[#1E1F20] border border-[#444746] rounded-[24px] overflow-hidden hover:border-[#A8C7FA] transition-all hover:shadow-lg">
                                {/* Thumbnail Placeholder */}
                                <div className="aspect-video bg-[#28292A] flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <PlayCircle className="w-12 h-12 text-[#A8C7FA] opacity-80 group-hover:scale-110 transition-transform z-10" />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest
                                            ${course.type === 'certification' ? 'bg-[#93000A]/20 text-[#FFDAD6]' : 'bg-[#004A77]/20 text-[#C2E7FF]'}
                                        `}>
                                            {course.type === 'certification' ? 'CERTIFICAÇÃO' : 'WORKSHOP'}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-medium text-[#E3E3E3] mb-2 group-hover:text-[#A8C7FA] transition-colors">
                                        {course.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-xs text-[#C4C7C5] mt-4">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>8h Duração</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Award className="w-4 h-4" />
                                            <span>Emite Certificado</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Seed Card (Only visible if empty or dev, for convenience) */}
                    {courses.length === 0 && (
                        <div className="col-span-full text-center py-10 border border-dashed border-[#444746] rounded-xl text-[#8E918F]">
                            <p>Nenhum curso encontrado.</p>
                            <button
                                onClick={async () => {
                                    const token = localStorage.getItem('algor_token');
                                    await fetch('/api/v1/lms/seed', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
                                    window.location.reload();
                                }}
                                className="mt-4 text-[#A8C7FA] hover:underline"
                            >
                                Gerar Curso de Demonstração (Seed)
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
