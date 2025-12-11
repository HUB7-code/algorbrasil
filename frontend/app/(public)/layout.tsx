import AnimatedWave from "@/components/AnimatedWave";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen bg-[#0A1A2F]">
            {/* --- PERSISTENT BACKGROUND LAYER --- */}
            {/* Background Glows (Blobs) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#00A3FF] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob will-change-transform" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00FF94] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob will-change-transform" style={{ animationDelay: '2s' }} />
            </div>

            {/* Background 3D Neural Network - Positioned to match Hero Header */}
            <div className="fixed top-0 left-0 w-full h-[80vh] z-0 opacity-50 pointer-events-none mask-image-gradient">
                <AnimatedWave />
            </div>

            {/* --- PAGE CONTENT LAYER --- */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
