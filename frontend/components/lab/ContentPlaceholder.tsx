// Placeholder Image Component for Algor Lab Content
export default function ContentPlaceholder({
    type,
    title
}: {
    type: 'video' | 'pdf' | 'excel' | 'doc' | 'link';
    title: string;
}) {
    const colors = {
        video: 'from-[#00A3FF] to-[#0080FF]',
        pdf: 'from-[#EF4444] to-[#DC2626]',
        excel: 'from-[#10B981] to-[#059669]',
        doc: 'from-[#8B5CF6] to-[#7C3AED]',
        link: 'from-[#F59E0B] to-[#D97706]'
    };

    const icons = {
        video: '▶',
        pdf: '📄',
        excel: '📊',
        doc: '📝',
        link: '🔗'
    };

    return (
        <div className={`w-full h-full bg-gradient-to-br ${colors[type]} flex flex-col items-center justify-center p-6 text-white`}>
            <div className="text-6xl mb-4 opacity-50">{icons[type]}</div>
            <div className="text-center text-sm font-bold opacity-75 line-clamp-2">{title}</div>
        </div>
    );
}
