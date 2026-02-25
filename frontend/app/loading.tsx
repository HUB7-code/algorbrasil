export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#0A1A2F]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-[#4F7EFF]/20 border-t-[#4F7EFF] rounded-full animate-spin" />
                    <div className="absolute inset-2 border-4 border-transparent border-b-[#818CF8] rounded-full animate-spin-reverse" />
                </div>
                <p className="text-[#4F7EFF] font-mono text-xs tracking-[0.2em] animate-pulse">
                    CARREGANDO SISTEMA
                </p>
            </div>
        </div>
    );
}
