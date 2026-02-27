import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), {
    ssr: false,
    loading: () => <div className="h-[72px]" />,
});

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen bg-[#0A1A2F]">
            {/* --- PERSISTENT BACKGROUND LAYER --- */}
            {/* Removed conflicting Blobs and duplicate AnimatedWave */}

            <Navbar />

            {/* --- PAGE CONTENT LAYER --- */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
