
export interface CourseMaterial {
    id: string;
    title: string;
    type: 'pdf' | 'xlsx' | 'doc';
    downloadUrl: string;
}

export interface CourseLesson {
    id: string;
    title: string;
    videoUrl: string; // YouTube Embed URL or similar
    duration: number; // minutes
    description: string; // HTML allowed
    completed?: boolean;
    materials?: CourseMaterial[];
}

export interface CourseModule {
    id: string;
    title: string;
    lessons: CourseLesson[];
}

export const iso42001Content: CourseModule[] = [
    {
        id: 'mod_intro',
        title: 'Módulo 1: Introdução à Governança de IA',
        lessons: [
            {
                id: 'aula_magna',
                title: 'Aula Magna: Governança de IA',
                videoUrl: 'https://www.youtube.com/embed/WiVpqOKW6j0',
                duration: 120,
                description: `
                    <div class="space-y-6 text-gray-300 font-manrope">
                        <div class="flex items-center gap-4 text-sm font-mono text-[#00FF94] bg-[#00FF94]/5 p-3 rounded-lg border border-[#00FF94]/20 w-fit">
                            <span>📅 26 de Março, 2025</span>
                            <span>⏰ 19h às 21h</span>
                            <span>🎓 ALGOR ASSOCIATION</span>
                        </div>
                        <p>
                            <strong class="text-white block mb-2">🟢 Abertura Institucional – 1 ano de ALGOR</strong>
                            O evento foi aberto com a celebração do primeiro ano da ALGOR ASSOCIATION...
                        </p>
                         <p>
                            <strong class="text-white block mb-2">📚 Apresentação do Curso</strong>
                            O facilitador apresentou o objetivo da formação: capacitar auditores...
                        </p>
                    </div>
                `,
                materials: [
                    { id: 'm1', title: 'Slides Aula Magna.pdf', type: 'pdf', downloadUrl: '/materials/aula-magna.pdf' }
                ]
            }
        ]
    }
];
