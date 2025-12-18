import Navbar from "@/components/Navbar";

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
